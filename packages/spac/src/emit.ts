import { Kind, type TSchema } from '@sinclair/typebox'
import type { Api } from './api'
import type { RouteNode, GroupNode, SecurityRequirement, ResponseDef } from './types'
import { getSchemaName } from './schema'
import { crc32, objectPath } from './debug'
import type { EmitOptions, EmitDebugResult } from './debug'

// ---------------------------------------------------------------------------
// Schema Helpers
// ---------------------------------------------------------------------------

/** Strip TypeBox internal symbols and return a plain JSON-Schema object. */
function toJsonSchema(schema: TSchema): Record<string, unknown> {
  return JSON.parse(JSON.stringify(schema))
}

/** Check whether an object is a TypeBox schema (has the Kind symbol). */
function isTSchema(obj: unknown): obj is TSchema {
  return typeof obj === 'object' && obj !== null && Kind in obj
}

// ---------------------------------------------------------------------------
// Source map collector
// ---------------------------------------------------------------------------

type SrcCollector = { add(path: string, src: string): void } | undefined

function parseSrc(src: string): { file: string; line: string; col: string } {
  const c1 = src.lastIndexOf(':')
  const c2 = src.lastIndexOf(':', c1 - 1)
  return { file: src.slice(0, c2), line: src.slice(c2 + 1, c1), col: src.slice(c1 + 1) }
}

function createCollector(): { add(path: string, src: string): void; build(): { files: string[]; entries: Record<string, string> } } {
  const raw: [string, string][] = []
  return {
    add(path: string, src: string) { raw.push([path, src]) },
    build() {
      const fileToId = new Map<string, number>()
      const files: string[] = []
      const entries: Record<string, string> = {}
      for (const [path, src] of raw) {
        const { file, line, col } = parseSrc(src)
        let id = fileToId.get(file)
        if (id === undefined) {
          id = files.length
          files.push(file)
          fileToId.set(file, id)
        }
        entries[crc32(path)] = `${id}:${line}:${col}`
      }
      return { files, entries }
    },
  }
}

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------

/**
 * Walk the {@link Api} AST and produce a valid OpenAPI 3.1 document.
 *
 * Pass `{ debug: true }` to get a source map linking spec object paths
 * back to the code locations that defined them.
 *
 * @param api - The Api instance to emit.
 * @param options - Optional emit options.
 * @returns A JSON-serializable OpenAPI 3.1 document, or `{ spec, sourceMap }` when debug is true.
 */
export function emitOpenApi(api: Api): Record<string, unknown>
export function emitOpenApi(api: Api, options: { debug: true }): EmitDebugResult
export function emitOpenApi(api: Api, options?: EmitOptions): Record<string, unknown>
export function emitOpenApi(api: Api, options?: EmitOptions): Record<string, unknown> | EmitDebugResult {
  const debug = options?.debug === true
  const collector = debug ? createCollector() : undefined
  const src: SrcCollector = collector

  const namedSchemas = new Map<string, TSchema>()
  const components: Record<string, unknown> = {}
  const paths: Record<string, Record<string, unknown>> = {}

  // Seed named schemas from explicit api.schema() registrations
  for (const [name, schema] of api._schemas) {
    namedSchemas.set(name, schema)
  }

  // Recursively walk a TypeBox schema, hoisting named sub-schemas to
  // components and replacing them with $ref pointers.
  /** Resolve a schema's body — walk sub-schemas and replace named ones with $ref */
  function resolveSchemaBody(schema: TSchema): Record<string, unknown> {
    const out = toJsonSchema(schema)

    // Walk known composition points and replace named sub-schemas with $ref
    if (schema.items && isTSchema(schema.items)) {
      out.items = resolveSchema(schema.items)
    }

    if (schema.properties && typeof schema.properties === 'object') {
      const resolved: Record<string, unknown> = {}
      for (const [key, val] of Object.entries(schema.properties)) {
        resolved[key] = isTSchema(val) ? resolveSchema(val as TSchema) : val
      }
      out.properties = resolved
    }

    if (schema.additionalProperties && isTSchema(schema.additionalProperties)) {
      out.additionalProperties = resolveSchema(schema.additionalProperties)
    }

    for (const keyword of ['allOf', 'oneOf', 'anyOf'] as const) {
      if (Array.isArray(schema[keyword])) {
        out[keyword] = (schema[keyword] as TSchema[]).map(s =>
          isTSchema(s) ? resolveSchema(s) : s,
        )
      }
    }

    if (schema.not && isTSchema(schema.not)) {
      out.not = resolveSchema(schema.not)
    }

    return out
  }

  function resolveSchema(schema: TSchema): Record<string, unknown> {
    const name = getSchemaName(schema)
    if (name) {
      namedSchemas.set(name, schema)
      return { $ref: `#/components/schemas/${name}` }
    }
    return resolveSchemaBody(schema)
  }

  // ------------------------------------------------------------------
  // Flatten all routes (with inherited group metadata)
  // ------------------------------------------------------------------

  interface FlatRoute {
    route: RouteNode
    inheritedTags: string[]
    inheritedSecurity: SecurityRequirement[]
    inheritedParams: TSchema[]
  }

  const flatRoutes: FlatRoute[] = []

  function walkGroup(
    group: GroupNode,
    parentTags: string[],
    parentSecurity: SecurityRequirement[],
    parentParams: TSchema[],
  ) {
    const groupTags = [...parentTags, ...group.tags]
    const groupSecurity = [...parentSecurity, ...group.security]
    const groupParams = group.params ? [...parentParams, group.params] : parentParams

    for (const route of group.routes) {
      flatRoutes.push({ route, inheritedTags: groupTags, inheritedSecurity: groupSecurity, inheritedParams: groupParams })
    }
    for (const child of group.groups) {
      walkGroup(child, groupTags, groupSecurity, groupParams)
    }
  }

  for (const route of api._routes) {
    flatRoutes.push({ route, inheritedTags: [], inheritedSecurity: [], inheritedParams: [] })
  }
  for (const group of api._groups) {
    walkGroup(group, [], [], [])
  }

  // ------------------------------------------------------------------
  // Build paths
  // ------------------------------------------------------------------

  for (const { route, inheritedTags, inheritedSecurity, inheritedParams } of flatRoutes) {
    const pathKey = route.fullPath
    if (!paths[pathKey]) paths[pathKey] = {}

    const operation: Record<string, unknown> = {}
    const s = route._sources

    // Tags
    const allTags = [...new Set([...inheritedTags, ...route.tags])]
    if (allTags.length) operation.tags = allTags

    // Metadata
    if (route.summary) operation.summary = route.summary
    if (route.description) operation.description = route.description
    if (route.operationId) operation.operationId = route.operationId
    if (route.deprecated) operation.deprecated = true

    // Security
    const allSecurity = [...inheritedSecurity, ...route.security]
    if (allSecurity.length) {
      operation.security = allSecurity.map(s =>
        typeof s === 'string' ? { [s]: [] } : s,
      )
    }

    // Parameters (derived from params / query / headers schemas)
    const parameters: Record<string, unknown>[] = []

    // Inherited group-level path params
    for (const paramSchema of inheritedParams) {
      if (paramSchema.properties) {
        for (const [name, val] of Object.entries(paramSchema.properties)) {
          const schema = isTSchema(val) ? resolveSchema(val as TSchema) : val
          parameters.push({ name, in: 'path', required: true, schema })
        }
      }
    }

    if (route.config.params) {
      const p = route.config.params
      if (p.properties) {
        for (const [name, val] of Object.entries(p.properties)) {
          const schema = isTSchema(val) ? resolveSchema(val as TSchema) : val
          parameters.push({ name, in: 'path', required: true, schema })
        }
      }
    }

    if (route.config.query) {
      const q = route.config.query
      const reqSet = new Set<string>((q as any).required || [])
      if (q.properties) {
        for (const [name, val] of Object.entries(q.properties)) {
          const schema = isTSchema(val) ? resolveSchema(val as TSchema) : val
          const param: Record<string, unknown> = { name, in: 'query', schema }
          if (reqSet.has(name)) param.required = true
          parameters.push(param)
        }
      }
    }

    if (route.config.headers) {
      const h = route.config.headers
      const reqSet = new Set<string>((h as any).required || [])
      if (h.properties) {
        for (const [name, val] of Object.entries(h.properties)) {
          const schema = isTSchema(val) ? resolveSchema(val as TSchema) : val
          const param: Record<string, unknown> = { name, in: 'header', schema }
          if (reqSet.has(name)) param.required = true
          parameters.push(param)
        }
      }
    }

    if (parameters.length) operation.parameters = parameters

    // Request body
    if (route.config.body) {
      operation.requestBody = {
        content: {
          'application/json': { schema: resolveSchema(route.config.body) },
        },
      }
    }

    // Responses
    const responses: Record<string, unknown> = {}

    // Shorthand: response → 200
    if (route.config.response) {
      responses['200'] = {
        description: 'Successful response',
        content: {
          'application/json': { schema: resolveSchema(route.config.response) },
        },
      }
    }

    // Explicit responses map
    if (route.config.responses) {
      for (const [status, def] of Object.entries(route.config.responses)) {
        if (isTSchema(def)) {
          responses[String(status)] = {
            description: '',
            content: {
              'application/json': { schema: resolveSchema(def) },
            },
          }
        } else {
          // ResponseDef
          const rd = def as ResponseDef
          const resp: Record<string, unknown> = { description: rd.description || '' }
          if (rd.schema) {
            resp.content = {
              [rd.contentType || 'application/json']: {
                schema: resolveSchema(rd.schema),
              },
            }
          }
          if (rd.headers) {
            const hdrs: Record<string, unknown> = {}
            for (const [hName, hSchema] of Object.entries(rd.headers)) {
              hdrs[hName] = { schema: toJsonSchema(hSchema) }
            }
            resp.headers = hdrs
          }
          responses[String(status)] = resp
        }
      }
    }

    // Error responses from chaining
    for (const [status, schema] of route.errors) {
      responses[String(status)] = {
        description: '',
        content: {
          'application/json': { schema: resolveSchema(schema) },
        },
      }
    }

    // OpenAPI requires at least a responses object
    if (Object.keys(responses).length) {
      operation.responses = responses
    } else {
      operation.responses = { '200': { description: 'Successful response' } }
    }

    // Per-operation servers
    if (route.servers.length) operation.servers = route.servers

    // Extensions
    for (const [key, value] of Object.entries(route.extensions)) {
      operation[key] = value
    }

    paths[pathKey][route.method] = operation

    // ---- Source map entries for this operation ----
    if (src) {
      const opSrc = s.get('')

      // The operation itself
      if (opSrc) {
        src.add(objectPath('paths', pathKey, route.method), opSrc)

        // Config-derived blocks: params, body, responses from config
        if (operation.parameters) src.add(objectPath('paths', pathKey, route.method, 'parameters'), opSrc)
        if (operation.requestBody) src.add(objectPath('paths', pathKey, route.method, 'requestBody'), opSrc)
        if (route.config.response) src.add(objectPath('paths', pathKey, route.method, 'responses', '200'), opSrc)
        if (route.config.responses) {
          for (const status of Object.keys(route.config.responses)) {
            src.add(objectPath('paths', pathKey, route.method, 'responses', String(status)), opSrc)
          }
        }
      }

      // Error responses from .error() — override config source for same status
      for (const [status] of route.errors) {
        const errSrc = s.get(`error:${status}`)
        if (errSrc) src.add(objectPath('paths', pathKey, route.method, 'responses', String(status)), errSrc)
      }

      // Chain method metadata
      const chainKeys = ['summary', 'description', 'tags', 'operationId', 'deprecated', 'security', 'servers'] as const
      for (const key of chainKeys) {
        const cs = s.get(key)
        if (cs && key in operation) src.add(objectPath('paths', pathKey, route.method, key), cs)
      }

      // Extensions
      for (const [key, cs] of s) {
        if (key.startsWith('ext:')) {
          const extKey = key.slice(4)
          if (extKey in operation) src.add(objectPath('paths', pathKey, route.method, extKey), cs)
        }
      }
    }
  }

  // ------------------------------------------------------------------
  // Assemble the document
  // ------------------------------------------------------------------

  const info: Record<string, unknown> = {
    title: api.name,
    version: api.config.version || '1.0.0',
  }
  if (api.config.description) info.description = api.config.description
  if (api.config.summary) info.summary = api.config.summary
  if (api.config.termsOfService) info.termsOfService = api.config.termsOfService
  if (api.config.contact) info.contact = api.config.contact
  if (api.config.license) info.license = api.config.license

  const doc: Record<string, unknown> = {
    openapi: '3.1.0',
    info,
  }

  if (api._servers.length) doc.servers = api._servers
  if (Object.keys(paths).length) doc.paths = paths

  // Security schemes
  if (Object.keys(api._securitySchemes).length) {
    components.securitySchemes = { ...api._securitySchemes }
  }

  // Named schemas → components.schemas
  // Resolve iteratively since resolveSchemaBody may discover new named schemas
  if (namedSchemas.size) {
    const schemas: Record<string, unknown> = {}
    const resolved = new Set<string>()
    let pending = true
    while (pending) {
      pending = false
      for (const [name, schema] of namedSchemas) {
        if (resolved.has(name)) continue
        resolved.add(name)
        schemas[name] = resolveSchemaBody(schema)
        pending = true
      }
    }
    components.schemas = schemas
  }

  if (Object.keys(components).length) doc.components = components

  // Global security
  if (api._security.length) {
    doc.security = api._security.map(s =>
      typeof s === 'string' ? { [s]: [] } : s,
    )
  }

  // Tags
  if (api._tags.length) {
    doc.tags = api._tags.map(t => {
      const tag: Record<string, unknown> = { name: t.name }
      if (t.description) tag.description = t.description
      if (t.externalDocs) tag.externalDocs = t.externalDocs
      return tag
    })
  }

  // ---- Source map entries for top-level Api sections ----
  if (src) {
    const as = api._sources

    // info
    const infoSrc = as.get('info')
    if (infoSrc) src.add(objectPath('info'), infoSrc)

    // servers
    for (let i = 0; i < api._servers.length; i++) {
      const ss = as.get(`server:${i}`)
      if (ss) src.add(objectPath('servers', i), ss)
    }

    // security schemes
    for (const name of Object.keys(api._securitySchemes)) {
      const ss = as.get(`securityScheme:${name}`)
      if (ss) src.add(objectPath('components', 'securitySchemes', name), ss)
    }

    // named schemas (explicitly registered via api.schema())
    for (const [name] of api._schemas) {
      const ss = as.get(`schema:${name}`)
      if (ss) src.add(objectPath('components', 'schemas', name), ss)
    }

    // global security
    for (let i = 0; i < api._security.length; i++) {
      const ss = as.get(`security:${i}`)
      if (ss) src.add(objectPath('security', i), ss)
    }

    // tags
    for (let i = 0; i < api._tags.length; i++) {
      const ss = as.get(`tag:${i}`)
      if (ss) src.add(objectPath('tags', i), ss)
    }
  }

  if (debug) {
    const { files, entries } = collector!.build()
    return { spec: doc, files, sourceMap: entries }
  }
  return doc
}

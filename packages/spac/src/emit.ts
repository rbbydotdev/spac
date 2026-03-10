import { Kind, type TSchema } from '@sinclair/typebox'
import type { Api } from './api'
import type { RouteNode, GroupNode, SecurityRequirement, ResponseDef } from './types'
import { getSchemaName } from './schema'

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
// Emit
// ---------------------------------------------------------------------------

/**
 * Walk the {@link Api} AST and produce a valid OpenAPI 3.1 document.
 *
 * This function:
 * - Flattens all routes from groups (with inherited tags, security, and params)
 * - Resolves TypeBox schemas to JSON Schema, hoisting named schemas to `components.schemas` as `$ref`
 * - Builds the `paths`, `components`, `servers`, `tags`, and `security` sections
 *
 * Typically called indirectly via {@link Api.emit}.
 *
 * @param api - The Api instance to emit.
 * @returns A JSON-serializable OpenAPI 3.1 document.
 *
 * @example
 * ```ts
 * import { emitOpenApi, Api } from 'spac'
 *
 * const api = new Api('My API')
 * api.get('/health', { response: Type.Object({ status: Type.String() }) })
 *
 * const doc = emitOpenApi(api)
 * // Equivalent to: api.emit()
 * // doc.openapi === '3.1.0'
 * // doc.paths['/health'].get.responses['200'] ...
 * ```
 */
export function emitOpenApi(api: Api): Record<string, unknown> {
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

  return doc
}

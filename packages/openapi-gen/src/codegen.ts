import { schemaToTypebox, createContext, type SchemaContext } from './schema-to-typebox'
import { schemaVarName, toSafeKey } from './names'
import { findCommonPrefix, stripPrefix, extractPathParams } from './organize'
import { collectSchemaRefs, expandSchemaRefs } from './parse'
import type { ParsedOperation, OperationGroup, SchemaSplit } from './types'

// ---------------------------------------------------------------------------
// Build ref map: $ref string → TypeScript variable name
// ---------------------------------------------------------------------------

export function buildRefMap(
  schemaKeys: string[],
  dupes: Map<string, string> = new Map(),
): Map<string, string> {
  const map = new Map<string, string>()
  const usedNames = new Map<string, number>()

  // Map canonical schemas
  for (const key of schemaKeys) {
    if (dupes.has(key)) continue
    const ref = `#/components/schemas/${key}`
    let varName = schemaVarName(key)

    const count = usedNames.get(varName) || 0
    if (count > 0) varName = `${varName}${count + 1}`
    usedNames.set(varName, count + 1)

    map.set(ref, varName)
  }

  // Map duplicate refs → canonical variable name
  for (const [dupeKey, canonicalKey] of dupes) {
    const dupeRef = `#/components/schemas/${dupeKey}`
    const canonicalRef = `#/components/schemas/${canonicalKey}`
    const canonicalVar = map.get(canonicalRef)
    if (canonicalVar) map.set(dupeRef, canonicalVar)
  }

  return map
}

// ---------------------------------------------------------------------------
// Schema splitting: shared vs per-group
// ---------------------------------------------------------------------------

export function splitSchemas(
  groups: OperationGroup[],
  allSchemaKeys: string[],
  spec: any,
  dupes: Map<string, string> = new Map(),
): SchemaSplit {
  const keySet = new Set(allSchemaKeys)

  // For each group, collect all schemas it needs (transitively).
  // Dedup aliases are resolved to their canonical key so counting is accurate.
  const groupSchemas = new Map<string, Set<string>>() // groupSlug → set of schema keys
  for (const group of groups) {
    const refs = new Set<string>()
    for (const op of group.operations) {
      collectSchemaRefs(op.requestBody, refs)
      for (const schema of op.responses.values()) collectSchemaRefs(schema, refs)
      for (const p of [...op.pathParams, ...op.queryParams, ...op.headerParams]) {
        collectSchemaRefs(p.schema, refs)
      }
    }
    // Expand transitively
    const expanded = expandSchemaRefs(refs, spec)
    const keys = new Set<string>()
    for (const ref of expanded) {
      let key = ref.replace('#/components/schemas/', '')
      // Resolve dedup alias to canonical
      if (dupes.has(key)) key = dupes.get(key)!
      if (keySet.has(key)) keys.add(key)
    }
    groupSchemas.set(group.slug, keys)
  }

  // Count how many groups need each schema
  const schemaCounts = new Map<string, number>()
  for (const key of allSchemaKeys) schemaCounts.set(key, 0)
  for (const keys of groupSchemas.values()) {
    for (const key of keys) {
      schemaCounts.set(key, (schemaCounts.get(key) || 0) + 1)
    }
  }

  // Initial split
  const shared: string[] = []
  const perGroup = new Map<string, string[]>()
  for (const group of groups) perGroup.set(group.slug, [])

  for (const key of allSchemaKeys) {
    const count = schemaCounts.get(key) || 0
    if (count > 1) {
      shared.push(key)
    } else if (count === 1) {
      for (const [slug, keys] of groupSchemas) {
        if (keys.has(key)) {
          perGroup.get(slug)!.push(key)
          break
        }
      }
    }
  }

  // Second pass: promote per-group schemas whose deps live in other groups.
  // A local schema that references a schema owned by a different group
  // means both must be promoted to shared. Repeat until stable.
  const schemas = spec.components?.schemas || {}
  const sharedSet = new Set(shared)
  let changed = true
  while (changed) {
    changed = false
    for (const [slug, localKeys] of perGroup) {
      for (let i = localKeys.length - 1; i >= 0; i--) {
        const key = localKeys[i]
        const schema = schemas[key]
        if (!schema) continue
        const refs = new Set<string>()
        collectSchemaRefs(schema, refs)
        for (const ref of refs) {
          const depKey = ref.replace('#/components/schemas/', '')
          if (sharedSet.has(depKey)) continue
          if (localKeys.includes(depKey)) continue
          // depKey is in another group's locals — promote it to shared
          for (const [otherSlug, otherKeys] of perGroup) {
            if (otherSlug === slug) continue
            const idx = otherKeys.indexOf(depKey)
            if (idx !== -1) {
              otherKeys.splice(idx, 1)
              shared.push(depKey)
              sharedSet.add(depKey)
              changed = true
            }
          }
        }
      }
    }
  }

  return { shared, perGroup }
}

// ---------------------------------------------------------------------------
// Topological sort
// ---------------------------------------------------------------------------

function topoSortSchemas(
  schemaKeys: string[],
  spec: any,
  dupes: Map<string, string> = new Map(),
): string[] {
  const schemas = spec.components?.schemas || {}
  const keySet = new Set(schemaKeys)
  const sorted: string[] = []
  const visited = new Set<string>()
  const visiting = new Set<string>()

  function visit(key: string) {
    if (visited.has(key)) return
    if (visiting.has(key)) return
    visiting.add(key)
    const schema = schemas[key]
    if (schema) {
      const refs = new Set<string>()
      collectSchemaRefs(schema, refs)
      for (const ref of refs) {
        let depKey = ref.replace('#/components/schemas/', '')
        // Resolve dedup alias to canonical key
        if (dupes.has(depKey)) depKey = dupes.get(depKey)!
        if (keySet.has(depKey)) visit(depKey)
      }
    }
    visiting.delete(key)
    visited.add(key)
    sorted.push(key)
  }

  for (const key of schemaKeys) visit(key)
  return sorted
}

// ---------------------------------------------------------------------------
// Generate a single schema declaration, handling self-referencing schemas
// ---------------------------------------------------------------------------

function genSchemaDecl(
  key: string,
  schema: any,
  varName: string,
  ctx: SchemaContext,
): { code: string; selfRef: boolean } {
  const ref = `#/components/schemas/${key}`
  ctx.selfRef = ref
  ctx.hasSelfRef = false
  const body = schemaToTypebox(schema, ctx, 0)
  ctx.selfRef = undefined
  if (ctx.hasSelfRef) {
    return {
      code: `export const ${varName} = named(${JSON.stringify(key)}, Type.Recursive(This => ${body}))`,
      selfRef: true,
    }
  }
  return {
    code: `export const ${varName} = named(${JSON.stringify(key)}, ${body})`,
    selfRef: false,
  }
}

// ---------------------------------------------------------------------------
// Generate shared/schemas.ts
// ---------------------------------------------------------------------------

export function genSharedSchemas(
  schemaKeys: string[],
  spec: any,
  refMap: Map<string, string>,
  dupes: Map<string, string> = new Map(),
): string {
  const schemas = spec.components?.schemas || {}
  const sorted = topoSortSchemas(schemaKeys, spec, dupes)
  const ctx = createContext(refMap)

  const lines: string[] = [
    'import { Type } from "@sinclair/typebox"',
    'import { named } from "spac"',
    '',
  ]

  for (const key of sorted) {
    const schema = schemas[key]
    if (!schema) continue
    const varName = refMap.get(`#/components/schemas/${key}`) || schemaVarName(key)
    const { code } = genSchemaDecl(key, schema, varName, ctx)
    lines.push(code)
    lines.push('')
  }

  return lines.join('\n')
}

// ---------------------------------------------------------------------------
// Generate <group>/schemas.ts
// ---------------------------------------------------------------------------

export function genGroupSchemas(
  schemaKeys: string[],
  spec: any,
  refMap: Map<string, string>,
  sharedVarNames: Set<string>,
  dupes: Map<string, string> = new Map(),
): string {
  const schemas = spec.components?.schemas || {}
  const sorted = topoSortSchemas(schemaKeys, spec, dupes)
  const ctx = createContext(refMap)

  // Generate schema code first to discover shared imports
  const schemaCodes: { varName: string; key: string; line: string }[] = []
  for (const key of sorted) {
    const schema = schemas[key]
    if (!schema) continue
    const varName = refMap.get(`#/components/schemas/${key}`) || schemaVarName(key)
    const { code: line } = genSchemaDecl(key, schema, varName, ctx)
    schemaCodes.push({ varName, key, line })
  }

  // Figure out which shared schemas are referenced
  const sharedImports = new Set<string>()
  for (const varName of ctx.usedRefs) {
    if (sharedVarNames.has(varName)) {
      sharedImports.add(varName)
    }
  }

  const lines: string[] = [
    'import { Type } from "@sinclair/typebox"',
    'import { named } from "spac"',
  ]

  if (sharedImports.size > 0) {
    const imports = Array.from(sharedImports).sort()
    lines.push(`import { ${imports.join(', ')} } from "../shared/schemas"`)
  }
  lines.push('')

  for (const { line } of schemaCodes) {
    lines.push(line)
    lines.push('')
  }

  return lines.join('\n')
}

// ---------------------------------------------------------------------------
// Generate <group>/index.ts (endpoint routes)
// ---------------------------------------------------------------------------

export function genEndpointIndex(
  group: OperationGroup,
  refMap: Map<string, string>,
  spec: any,
  sharedVarNames: Set<string>,
  localVarNames: Set<string>,
): string {
  const ctx = createContext(refMap)
  const lines: string[] = []

  // Generate route code first to discover which schemas are used
  const routeCode = genRoutes(group.operations, ctx)

  // Partition used refs into shared vs local
  const sharedImports = new Set<string>()
  const localImports = new Set<string>()
  for (const varName of ctx.usedRefs) {
    if (sharedVarNames.has(varName)) sharedImports.add(varName)
    else if (localVarNames.has(varName)) localImports.add(varName)
  }

  // Imports
  lines.push('import { Type } from "@sinclair/typebox"')
  lines.push('import type { Api } from "spac"')
  if (sharedImports.size > 0) {
    lines.push(`import { ${Array.from(sharedImports).sort().join(', ')} } from "../shared/schemas"`)
  }
  if (localImports.size > 0) {
    lines.push(`import { ${Array.from(localImports).sort().join(', ')} } from "./schemas"`)
  }
  lines.push('')

  // Register function
  lines.push(`export function ${group.registerFn}(api: Api) {`)
  lines.push('')
  lines.push(routeCode)
  lines.push('}')
  lines.push('')

  return lines.join('\n')
}

// ---------------------------------------------------------------------------
// Route generation (shared helpers)
// ---------------------------------------------------------------------------

function genRoutes(operations: ParsedOperation[], ctx: SchemaContext): string {
  const paths = operations.map(op => op.path)
  const prefix = findCommonPrefix(paths)
  const prefixParams = extractPathParams(prefix)

  if (prefix && prefix !== '/' && operations.length > 1) {
    return genGroupedRoutes(operations, prefix, prefixParams, ctx)
  }

  return operations.map(op => genSingleRoute(op, 'api', '', ctx)).join('\n')
}

function genGroupedRoutes(
  operations: ParsedOperation[],
  prefix: string,
  prefixParams: string[],
  ctx: SchemaContext,
): string {
  const lines: string[] = []
  const ind = '  '

  if (prefixParams.length > 0) {
    const paramObj = prefixParams.map(p => `${toSafeKey(p)}: Type.String()`).join(', ')
    lines.push(`${ind}api.group(${JSON.stringify(prefix)}, { params: Type.Object({ ${paramObj} }) }, (g) => {`)
  } else {
    lines.push(`${ind}api.group(${JSON.stringify(prefix)}, (g) => {`)
  }

  for (const op of operations) {
    lines.push(genSingleRoute(op, 'g', prefix, ctx, '    '))
  }

  lines.push(`${ind}})`)
  lines.push('')
  return lines.join('\n')
}

function genSingleRoute(
  op: ParsedOperation,
  builder: string,
  groupPrefix: string,
  ctx: SchemaContext,
  baseIndent: string = '  ',
): string {
  const lines: string[] = []
  const ind = baseIndent
  const ind2 = baseIndent + '  '

  const path = groupPrefix ? stripPrefix(op.path, groupPrefix) : op.path
  const configParts: string[] = []

  // Path params (exclude group-prefix ones)
  const groupPrefixParams = new Set(extractPathParams(groupPrefix))
  const routePathParams = op.pathParams.filter(p => !groupPrefixParams.has(p.name))
  if (routePathParams.length > 0) {
    const paramProps = routePathParams.map(p => {
      const schema = p.schema ? schemaToTypebox(p.schema, ctx, 2) : 'Type.String()'
      return `${toSafeKey(p.name)}: ${schema}`
    })
    configParts.push(`params: Type.Object({ ${paramProps.join(', ')} })`)
  }

  // Query params
  if (op.queryParams.length > 0) {
    const queryProps = op.queryParams.map(p => {
      const schema = p.schema ? schemaToTypebox(p.schema, ctx, 3) : 'Type.String()'
      const inner = p.required ? schema : `Type.Optional(${schema})`
      return `${ind2}    ${toSafeKey(p.name)}: ${inner},`
    })
    configParts.push(`query: Type.Object({\n${queryProps.join('\n')}\n${ind2}  })`)
  }

  // Header params
  if (op.headerParams.length > 0) {
    const headerProps = op.headerParams.map(p => {
      const schema = p.schema ? schemaToTypebox(p.schema, ctx, 3) : 'Type.String()'
      const inner = p.required ? schema : `Type.Optional(${schema})`
      return `${ind2}    ${toSafeKey(p.name)}: ${inner},`
    })
    configParts.push(`headers: Type.Object({\n${headerProps.join('\n')}\n${ind2}  })`)
  }

  // Request body
  if (op.requestBody) {
    configParts.push(`body: ${schemaToTypebox(op.requestBody, ctx, 2)}`)
  }

  // Responses
  const successCodes = ['200', '201', '202', '203', '204']
  const successEntries = Array.from(op.responses.entries()).filter(([c]) => successCodes.includes(c))
  const errorEntries = Array.from(op.responses.entries()).filter(([c]) => !successCodes.includes(c))

  if (successEntries.length === 1 && errorEntries.length === 0) {
    const [, schema] = successEntries[0]
    configParts.push(`response: ${schemaToTypebox(schema, ctx, 2)}`)
  } else if (successEntries.length > 0 || errorEntries.length > 0) {
    const allEntries = [...successEntries, ...errorEntries]
    const respParts = allEntries.map(([code, schema]) => {
      const key = /^\d+$/.test(code) ? code : JSON.stringify(code)
      return `${ind2}    ${key}: ${schemaToTypebox(schema, ctx, 3)},`
    })
    configParts.push(`responses: {\n${respParts.join('\n')}\n${ind2}  }`)
  }

  const configStr = configParts.length > 0
    ? `{\n${configParts.map(p => `${ind2}  ${p},`).join('\n')}\n${ind2}}`
    : '{}'

  lines.push(`${ind}${builder}.${op.method}(${JSON.stringify(path)}, ${configStr})`)

  if (op.summary) lines.push(`${ind}  .summary(${JSON.stringify(op.summary)})`)
  if (op.description) lines.push(`${ind}  .description(${JSON.stringify(op.description)})`)
  if (op.operationId) lines.push(`${ind}  .operationId(${JSON.stringify(op.operationId)})`)
  for (const tag of op.tags) lines.push(`${ind}  .tag(${JSON.stringify(tag)})`)
  if (op.deprecated) lines.push(`${ind}  .deprecated()`)
  if (op.security) {
    for (const sec of op.security) lines.push(`${ind}  .security(${JSON.stringify(sec)})`)
  }
  for (const [key, val] of Object.entries(op.extensions)) {
    lines.push(`${ind}  .extension(${JSON.stringify(key)}, ${JSON.stringify(val)})`)
  }

  lines.push('')
  return lines.join('\n')
}

// ---------------------------------------------------------------------------
// Generate root index.ts
// ---------------------------------------------------------------------------

export function genRootIndex(spec: any, groups: OperationGroup[]): string {
  const lines: string[] = []
  const info = spec.info || {}

  lines.push("import { Api } from 'spac'")
  for (const g of groups) {
    lines.push(`import { ${g.registerFn} } from './${g.slug}'`)
  }
  lines.push('')

  // Api constructor
  const title = info.title || 'API'
  const configParts: string[] = []
  if (info.version) configParts.push(`  version: ${JSON.stringify(info.version)},`)
  if (info.description) configParts.push(`  description: ${JSON.stringify(info.description)},`)
  if (info.license) {
    const licParts: string[] = [`name: ${JSON.stringify(info.license.name)}`]
    if (info.license.url) licParts.push(`url: ${JSON.stringify(info.license.url)}`)
    if (info.license.identifier) licParts.push(`identifier: ${JSON.stringify(info.license.identifier)}`)
    configParts.push(`  license: { ${licParts.join(', ')} },`)
  }
  if (info.contact) {
    const cParts: string[] = []
    if (info.contact.name) cParts.push(`name: ${JSON.stringify(info.contact.name)}`)
    if (info.contact.email) cParts.push(`email: ${JSON.stringify(info.contact.email)}`)
    if (info.contact.url) cParts.push(`url: ${JSON.stringify(info.contact.url)}`)
    if (cParts.length > 0) configParts.push(`  contact: { ${cParts.join(', ')} },`)
  }
  if (info.termsOfService) configParts.push(`  termsOfService: ${JSON.stringify(info.termsOfService)},`)

  if (configParts.length > 0) {
    lines.push(`const api = new Api(${JSON.stringify(title)}, {`)
    lines.push(...configParts)
    lines.push('})')
  } else {
    lines.push(`const api = new Api(${JSON.stringify(title)})`)
  }
  lines.push('')

  // Servers
  for (const server of spec.servers || []) {
    if (server.variables && Object.keys(server.variables).length > 0) {
      lines.push(`api.server(${JSON.stringify(server, null, 2)})`)
    } else {
      const args: string[] = [`url: ${JSON.stringify(server.url)}`]
      if (server.description) args.push(`description: ${JSON.stringify(server.description)}`)
      lines.push(`api.server({ ${args.join(', ')} })`)
    }
  }

  // Security schemes
  const secSchemes = spec.components?.securitySchemes || {}
  for (const [name, scheme] of Object.entries(secSchemes)) {
    lines.push(`api.securityScheme(${JSON.stringify(name)}, ${JSON.stringify(scheme)})`)
  }
  if (Object.keys(secSchemes).length > 0) lines.push('')

  // Global security
  for (const sec of spec.security || []) {
    const entries = Object.entries(sec)
    if (entries.length === 1) {
      const [name, scopes] = entries[0]
      if ((scopes as string[]).length === 0) {
        lines.push(`api.security(${JSON.stringify(name)})`)
      } else {
        lines.push(`api.security(${JSON.stringify(sec)})`)
      }
    } else {
      lines.push(`api.security(${JSON.stringify(sec)})`)
    }
  }
  lines.push('')

  for (const g of groups) lines.push(`${g.registerFn}(api)`)
  lines.push('')
  lines.push('const spec = api.emit()')
  lines.push('console.log(JSON.stringify(spec, null, 2))')
  lines.push('')

  return lines.join('\n')
}

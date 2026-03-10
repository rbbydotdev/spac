import type { ParsedOperation, ParsedParam } from './types'

// ---------------------------------------------------------------------------
// Resolve $ref within a spec
// ---------------------------------------------------------------------------

export function resolveRef(spec: any, ref: string): any {
  if (!ref.startsWith('#/')) return undefined
  const parts = ref.slice(2).split('/')
  let node = spec
  for (const part of parts) {
    node = node?.[part]
    if (node === undefined) return undefined
  }
  return node
}

/**
 * Deeply resolve any $ref that isn't a component schema ref.
 * Schema refs (#/components/schemas/...) are kept as-is — they become variable references.
 * Other refs (parameters, responses, requestBodies) are dereferenced inline.
 */
export function resolveNonSchemaRefs(value: any, spec: any): any {
  if (value === null || value === undefined || typeof value !== 'object') return value
  if (Array.isArray(value)) return value.map(v => resolveNonSchemaRefs(v, spec))

  if (value.$ref && typeof value.$ref === 'string') {
    if (value.$ref.startsWith('#/components/schemas/')) {
      return value // keep schema refs
    }
    const resolved = resolveRef(spec, value.$ref)
    if (resolved) return resolveNonSchemaRefs(resolved, spec)
    return value
  }

  const result: any = {}
  for (const [k, v] of Object.entries(value)) {
    result[k] = resolveNonSchemaRefs(v, spec)
  }
  return result
}

// ---------------------------------------------------------------------------
// Parse spec into operations
// ---------------------------------------------------------------------------

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace']

export function parseOperations(spec: any): ParsedOperation[] {
  const ops: ParsedOperation[] = []
  const paths = spec.paths || {}

  for (const [path, pathItem] of Object.entries(paths)) {
    if (!pathItem || typeof pathItem !== 'object') continue

    // Path-level parameters (shared across all methods)
    const pathLevelParams: any[] = resolveNonSchemaRefs((pathItem as any).parameters || [], spec)

    for (const method of HTTP_METHODS) {
      const operation = (pathItem as any)[method]
      if (!operation) continue

      const resolved = resolveNonSchemaRefs(operation, spec)

      // Merge path-level params with operation params (operation overrides)
      const allParams = mergeParams(pathLevelParams, resolved.parameters || [])

      const pathParams: ParsedParam[] = []
      const queryParams: ParsedParam[] = []
      const headerParams: ParsedParam[] = []

      for (const p of allParams) {
        const param: ParsedParam = {
          name: p.name,
          required: p.required ?? (p.in === 'path'),
          schema: p.schema,
          description: p.description,
        }
        switch (p.in) {
          case 'path': pathParams.push(param); break
          case 'query': queryParams.push(param); break
          case 'header': headerParams.push(param); break
        }
      }

      // Request body
      let requestBody: any = undefined
      if (resolved.requestBody?.content) {
        const content = resolved.requestBody.content
        const jsonBody = content['application/json'] || content['*/*']
        if (jsonBody?.schema) {
          requestBody = jsonBody.schema
        }
      }

      // Responses
      const responses = new Map<string, any>()
      if (resolved.responses) {
        for (const [code, resp] of Object.entries(resolved.responses)) {
          const r = resp as any
          if (r?.content?.['application/json']?.schema) {
            responses.set(code, r.content['application/json'].schema)
          } else if (r?.content?.['*/*']?.schema) {
            responses.set(code, r.content['*/*'].schema)
          }
        }
      }

      // Extensions (x-* fields)
      const extensions: Record<string, unknown> = {}
      for (const [k, v] of Object.entries(resolved)) {
        if (k.startsWith('x-')) extensions[k] = v
      }

      ops.push({
        path,
        method,
        operationId: resolved.operationId,
        summary: resolved.summary,
        description: resolved.description,
        tags: resolved.tags || [],
        deprecated: resolved.deprecated,
        security: resolved.security,
        pathParams,
        queryParams,
        headerParams,
        requestBody,
        responses,
        extensions,
      })
    }
  }

  return ops
}

/** Merge path-level and operation-level params. Operation params override by name+in. */
function mergeParams(pathParams: any[], opParams: any[]): any[] {
  const byKey = new Map<string, any>()
  for (const p of pathParams) {
    byKey.set(`${p.in}:${p.name}`, p)
  }
  for (const p of opParams) {
    byKey.set(`${p.in}:${p.name}`, p)
  }
  return Array.from(byKey.values())
}

// ---------------------------------------------------------------------------
// Collect referenced schemas (transitive)
// ---------------------------------------------------------------------------

/**
 * Walk a JSON Schema tree and collect all $ref targets to component schemas.
 */
export function collectSchemaRefs(schema: any, refs: Set<string>): void {
  if (!schema || typeof schema !== 'object') return
  if (Array.isArray(schema)) {
    schema.forEach(s => collectSchemaRefs(s, refs))
    return
  }
  if (schema.$ref && typeof schema.$ref === 'string' && schema.$ref.startsWith('#/components/schemas/')) {
    refs.add(schema.$ref)
  }
  for (const v of Object.values(schema)) {
    collectSchemaRefs(v, refs)
  }
}

/**
 * Given a set of directly-referenced schemas, expand to include all transitively-referenced schemas.
 */
export function expandSchemaRefs(directRefs: Set<string>, spec: any): Set<string> {
  const all = new Set<string>()
  const queue = Array.from(directRefs)
  while (queue.length > 0) {
    const ref = queue.pop()!
    if (all.has(ref)) continue
    all.add(ref)
    const schema = resolveRef(spec, ref)
    if (schema) {
      const nested = new Set<string>()
      collectSchemaRefs(schema, nested)
      for (const r of nested) {
        if (!all.has(r)) queue.push(r)
      }
    }
  }
  return all
}

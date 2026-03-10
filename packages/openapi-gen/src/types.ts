// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface GenerateOptions {
  /** Parsed OpenAPI 3.x spec */
  spec: any
  /** Override the API title from the spec */
  name?: string
  /**
   * Path prefixes to strip before grouping by first segment.
   * Useful when paths are scoped under a context prefix.
   * e.g. ['/accounts/{account_id}', '/zones/{zone_id}']
   *
   * "/accounts/{account_id}/access/apps" → strips to "/access/apps" → group "access"
   */
  stripPrefixes?: string[]
}

/** A generated file: relative path → content */
export type GeneratedFiles = Map<string, string>

// ---------------------------------------------------------------------------
// Internal: parsed operation
// ---------------------------------------------------------------------------

export interface ParsedOperation {
  path: string
  method: string
  operationId?: string
  summary?: string
  description?: string
  tags: string[]
  deprecated?: boolean
  security?: any[]
  pathParams: ParsedParam[]
  queryParams: ParsedParam[]
  headerParams: ParsedParam[]
  requestBody?: any
  responses: Map<string, any>
  extensions: Record<string, unknown>
}

export interface ParsedParam {
  name: string
  required: boolean
  schema: any
  description?: string
}

// ---------------------------------------------------------------------------
// Internal: operation groups
// ---------------------------------------------------------------------------

export interface OperationGroup {
  /** Display name for the group (used in register function) */
  name: string
  slug: string
  registerFn: string
  operations: ParsedOperation[]
}

// ---------------------------------------------------------------------------
// Internal: schema distribution
// ---------------------------------------------------------------------------

export interface SchemaSplit {
  /** Schema keys that go in shared/schemas.ts (used by 2+ groups) */
  shared: string[]
  /** Group slug → schema keys local to that group */
  perGroup: Map<string, string[]>
}

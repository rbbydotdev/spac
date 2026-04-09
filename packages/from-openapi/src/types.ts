// ---------------------------------------------------------------------------
// Plugin types
// ---------------------------------------------------------------------------

/** Context passed to plugin hooks. */
export interface PluginContext {
  readonly options: Readonly<{
    spec: any;
    stripPrefixes?: string[];
    name?: string;
    specVersion?: string;
    debug?: boolean;
  }>;
  log(message: string): void;
  warn(message: string): void;
}

/** A spac plugin hooks into the code generation pipeline. */
export interface SpacPlugin {
  /** Unique name for this plugin. */
  readonly name: string;

  /**
   * Called after all files are generated, before formatting.
   * Return a new Map to replace, or mutate in place.
   */
  onGenerate?(
    files: Map<string, string>,
    context: PluginContext,
  ): Map<string, string> | void | Promise<Map<string, string> | void>;

  /**
   * Called per-file to format content.
   * First plugin providing this hook handles formatting.
   */
  formatFile?(
    filePath: string,
    content: string,
    context: PluginContext,
  ): string | Promise<string>;

  /**
   * Called per-file after formatting.
   * Return transformed content or void to keep unchanged.
   */
  onFile?(
    filePath: string,
    content: string,
    context: PluginContext,
  ): string | void | Promise<string | void>;

  /**
   * Called after all files are finalized. Read-only.
   */
  onComplete?(
    files: ReadonlyMap<string, string>,
    context: PluginContext,
  ): void | Promise<void>;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface GenerateOptions {
  /** Parsed OpenAPI 3.x spec */
  spec: any;
  /** Override the API title from the spec */
  name?: string;
  /**
   * Path prefixes to strip before grouping by first segment.
   * Useful when paths are scoped under a context prefix.
   * e.g. ['/accounts/{account_id}', '/zones/{zone_id}']
   *
   * "/accounts/{account_id}/access/apps" → strips to "/access/apps" → group "access"
   */
  stripPrefixes?: string[];
  /** Override the OpenAPI spec version (e.g. '3.1'). Defaults to the spec's `openapi` field. */
  specVersion?: string;
  /** Emit `debug: true` in the Api constructor for source map support. */
  debug?: boolean;
  /** Plugins to apply to the generation pipeline. Executed in order. */
  plugins?: SpacPlugin[];
}

/** A generated file: relative path → content */
export type GeneratedFiles = Map<string, string>;

// ---------------------------------------------------------------------------
// Internal: parsed operation
// ---------------------------------------------------------------------------

export interface ParsedOperation {
  path: string;
  method: string;
  operationId?: string;
  summary?: string;
  description?: string;
  tags: string[];
  deprecated?: boolean;
  security?: any[];
  pathParams: ParsedParam[];
  queryParams: ParsedParam[];
  headerParams: ParsedParam[];
  requestBody?: any;
  responses: Map<string, any>;
  /** Links from response objects, keyed by status code → link name → link config */
  links: Map<
    string,
    Record<
      string,
      {
        operationId?: string;
        operationRef?: string;
        parameters?: Record<string, string>;
        requestBody?: string;
        description?: string;
      }
    >
  >;
  extensions: Record<string, unknown>;
}

export interface ParsedParam {
  name: string;
  required: boolean;
  schema: any;
  description?: string;
}

// ---------------------------------------------------------------------------
// Internal: operation groups
// ---------------------------------------------------------------------------

export interface OperationGroup {
  /** Display name for the group (used in register function) */
  name: string;
  slug: string;
  registerFn: string;
  operations: ParsedOperation[];
}

// ---------------------------------------------------------------------------
// Internal: schema distribution
// ---------------------------------------------------------------------------

export interface SchemaSplit {
  /** Schema keys that go in shared/schemas.ts (used by 2+ groups) */
  shared: string[];
  /** Group slug → schema keys local to that group */
  perGroup: Map<string, string[]>;
}

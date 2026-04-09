import type { TSchema, TObject } from "@sinclair/typebox";
import type { RouteBuilder } from "./route";
import type { GroupBuilder } from "./group";
import type { Api } from "./api";
import type { SourceEntry } from "./sourcemap";

// ---------------------------------------------------------------------------
// Spec Version
// ---------------------------------------------------------------------------

/**
 * The OpenAPI specification version this DSL targets.
 * Each entry represents a major.minor boundary — patch versions are handled
 * internally by the library. Future versions (e.g. `'4.0'`) will be added
 * here as they become available.
 *
 * Teams declare the version they support in function signatures:
 * ```ts
 * export function registerPets(api: Api<'3.1'>) { ... }
 * ```
 */
export type SpecVersion = "3.1";

/**
 * Describes the capabilities and output details for a given {@link SpecVersion}.
 * Used internally for feature gating — when a new major.minor version arrives,
 * add an entry here with the appropriate flags.
 */
export interface VersionCapabilities {
  /** The full `openapi` field value emitted in the document (e.g. `'3.1.2'`). */
  readonly fullVersion: string;
  /** The JSON Schema dialect URI for this version. */
  readonly jsonSchemaDialect: string;
  /** Whether this version supports top-level `webhooks`. */
  readonly supportsWebhooks: boolean;
  /** Whether this version supports `$ref` in Path Item Objects. */
  readonly supportsPathItemRef: boolean;
}

/** Maps each {@link SpecVersion} to its capabilities and full version string. */
export const versionCapabilities: Record<SpecVersion, VersionCapabilities> = {
  "3.1": {
    fullVersion: "3.1.2",
    jsonSchemaDialect: "https://json-schema.org/draft/2020-12/schema",
    supportsWebhooks: true,
    supportsPathItemRef: true,
  },
};

/**
 * @internal Maps a {@link SpecVersion} shorthand to its full `openapi` field value.
 * @deprecated Use {@link versionCapabilities} instead. Kept for backward compatibility.
 */
export const specVersionMap: Record<SpecVersion, string> = Object.fromEntries(
  Object.entries(versionCapabilities).map(([k, v]) => [k, v.fullVersion]),
) as Record<SpecVersion, string>;

// ---------------------------------------------------------------------------
// Version Policy (multi-team composition)
// ---------------------------------------------------------------------------

/**
 * Controls how version mismatches between team modules and the central project
 * are handled during composition.
 *
 * - `'strict'` — error on any patch version mismatch (all teams must declare the exact same version)
 * - `'warn'` — log warnings for patch mismatches, error on major.minor mismatch (default)
 * - `'lenient'` — silently accept patch mismatches, error only on major.minor mismatch
 *
 * In all modes, major.minor mismatches (e.g. 3.0 vs 3.1) are always a hard error.
 *
 * @example
 * ```ts
 * const api = new Api('3.1', 'My API', { versionPolicy: 'strict' })
 * ```
 */
export type VersionPolicy = "strict" | "warn" | "lenient";

/**
 * A version declaration from a team module, recorded via {@link Api.assertVersion}.
 * Used to track which teams target which OpenAPI patch versions.
 */
export interface VersionDeclaration {
  /** The full version string declared by the team module (e.g. `'3.1.0'`, `'3.1.2'`). */
  version: string;
  /** Optional label identifying the team or module that made the declaration. */
  label?: string;
}

/**
 * The result of auditing version declarations across all team modules.
 * Available via {@link Api.versionAudit} or in {@link EmitResult.versionAudit}
 * when `audit: true` is passed to {@link Api.emit}.
 *
 * @example
 * ```ts
 * const audit = api.versionAudit()
 * // {
 * //   target: '3.1.2',
 * //   policy: 'warn',
 * //   declarations: [{ version: '3.1.0', label: 'calls' }, ...],
 * //   compatible: true,
 * //   warnings: ['Module "calls" targets 3.1.0 but this project emits 3.1.2'],
 * //   errors: [],
 * // }
 * ```
 */
export interface VersionAudit {
  /** The full version this project emits (e.g. `'3.1.2'`). */
  target: string;
  /** The active version policy. */
  policy: VersionPolicy;
  /** All version declarations collected from team modules. */
  declarations: VersionDeclaration[];
  /** Whether the composition is compatible under the active policy (no errors). */
  compatible: boolean;
  /** Warning messages for patch-level mismatches (populated in `'warn'` mode). */
  warnings: string[];
  /** Error messages for incompatible versions (major.minor mismatch, or patch mismatch in `'strict'` mode). */
  errors: string[];
}

/**
 * A parsed semver-like version with major, minor, and optional patch components.
 * @internal
 */
export interface ParsedVersion {
  major: number;
  minor: number;
  patch: number;
  raw: string;
}

/**
 * Parse an OpenAPI version string (e.g. `'3.1.2'`, `'3.1'`, `'3.1.0'`) into components.
 * Missing patch defaults to `0`.
 *
 * @param version - The version string to parse.
 * @returns The parsed version, or `null` if the string is not a valid version.
 *
 * @example
 * ```ts
 * parseVersion('3.1.2') // { major: 3, minor: 1, patch: 2, raw: '3.1.2' }
 * parseVersion('3.1')   // { major: 3, minor: 1, patch: 0, raw: '3.1' }
 * ```
 */
export function parseVersion(version: string): ParsedVersion | null {
  const match = version.match(/^(\d+)\.(\d+)(?:\.(\d+))?$/);
  if (!match) return null;
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: match[3] !== undefined ? parseInt(match[3], 10) : 0,
    raw: version,
  };
}

/** Result of comparing a declared version against the central target. */
export type VersionComparison =
  | "match"
  | "major-mismatch"
  | "minor-higher"
  | "minor-lower"
  | "patch-higher"
  | "patch-lower";

/**
 * Compare two parsed versions. Returns a comparison result describing
 * the relationship between `declared` and `target`.
 *
 * The result distinguishes the *direction* of minor mismatches because the
 * risk is asymmetric:
 *
 * - **`'minor-lower'`** — the team targets an older minor version than the
 *   central project (e.g. team at 3.1, central at 3.2). This is generally
 *   safe because the team uses a *subset* of features and the output document
 *   is the higher version (a superset).
 * - **`'minor-higher'`** — the team targets a *newer* minor version than the
 *   central project (e.g. team at 3.2, central at 3.1). This is dangerous
 *   because the team may rely on features the output format doesn't support.
 * - **`'major-mismatch'`** — different major versions are always incompatible.
 *
 * @param declared - The version declared by a team module.
 * @param target - The version the central project emits.
 * @returns A {@link VersionComparison} string.
 */
export function compareVersions(
  declared: ParsedVersion,
  target: ParsedVersion,
): VersionComparison {
  if (declared.major !== target.major) {
    return "major-mismatch";
  }
  if (declared.minor !== target.minor) {
    return declared.minor > target.minor ? "minor-higher" : "minor-lower";
  }
  if (declared.patch === target.patch) return "match";
  return declared.patch > target.patch ? "patch-higher" : "patch-lower";
}

// ---------------------------------------------------------------------------
// HTTP
// ---------------------------------------------------------------------------

/**
 * Supported HTTP methods for route definitions.
 *
 * @example
 * ```ts
 * api.get('/pets').response(Type.Array(Pet))
 * api.post('/pets').body(CreatePet).response(Pet)
 * ```
 */
export type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "options"
  | "head"
  | "trace";

/** All supported HTTP methods as an array. */
export const HTTP_METHODS: HttpMethod[] = [
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "options",
  "head",
  "trace",
];

/**
 * HTTP status code for response methods (`.respond()`, `.error()`).
 * Accepts numeric codes (200, 404) or OpenAPI 3.1 wildcard/default strings.
 */
export type StatusCode =
  | number
  | "1XX"
  | "2XX"
  | "3XX"
  | "4XX"
  | "5XX"
  | "default";

// ---------------------------------------------------------------------------
// Path Parameter Extraction
// ---------------------------------------------------------------------------

type ParamFromSegment<S extends string> = S extends `:${infer Param}`
  ? Param
  : S extends `{${infer Param}}`
    ? Param
    : never;

/**
 * Extracts path parameter names from a route path string.
 * Supports both `:param` and `{param}` syntax.
 *
 * @example
 * ```ts
 * type Params = ExtractPathParams<'/pets/:petId/toys/:toyId'>
 * // => 'petId' | 'toyId'
 *
 * type Params2 = ExtractPathParams<'/pets/{petId}'>
 * // => 'petId'
 * ```
 */
export type ExtractPathParams<P extends string> =
  P extends `${infer Segment}/${infer Rest}`
    ? ParamFromSegment<Segment> | ExtractPathParams<Rest>
    : ParamFromSegment<P>;

/**
 * Resolves to `P` when its path params don't overlap with `Excluded`, otherwise `never`.
 * Used internally to prevent route paths from re-declaring group-level path parameters.
 */
export type SafeRoutePath<P extends string, Excluded extends string> =
  Extract<ExtractPathParams<P>, Excluded> extends never ? P : never;

type PathParamsConstraint<
  P extends string,
  Excluded extends string = never,
> = string extends P
  ? { params?: TSchema }
  : Exclude<ExtractPathParams<P>, Excluded> extends never
    ? { params?: never }
    : {
        params: TObject<{
          [K in Exclude<ExtractPathParams<P>, Excluded>]: TSchema;
        }>;
      };

// ---------------------------------------------------------------------------
// Route Config (the object you pass to .get(), .post(), etc.)
// ---------------------------------------------------------------------------

/** @internal */
export interface BaseRouteConfig {
  /** TypeBox schema for path parameters. Required when the path contains `:param` or `{param}` segments. */
  params?: TSchema;
  /** TypeBox schema for query string parameters. Properties marked `Type.Optional()` become non-required in the emitted spec. */
  query?: TSchema;
  /** TypeBox schema for request headers. */
  headers?: TSchema;
  /** TypeBox schema for cookie parameters. */
  cookies?: TSchema;
  /** TypeBox schema for the JSON request body. */
  body?: TSchema;
  /** Description for the request body object. */
  bodyDescription?: string;
  /** Whether the request body is required. */
  bodyRequired?: boolean;
  /** Shorthand for a single `200` response schema. Mutually convenient with {@link responses}. */
  response?: TSchema;
  /**
   * Explicit map of status codes to response schemas or {@link ResponseDef} objects.
   * Use this when you need multiple status codes or custom descriptions/headers.
   *
   * @example
   * ```ts
   * responses: {
   *   201: created(Pet),
   *   204: noContent(),
   *   404: ErrorBody,
   * }
   * ```
   */
  responses?: Record<string | number, TSchema | ResponseDef>;
}

/**
 * @internal Internal configuration stored on route nodes.
 * Not part of the public API — use chaining methods instead.
 */
export type RouteConfig<
  P extends string = string,
  Excluded extends string = never,
> = Omit<BaseRouteConfig, "params"> & PathParamsConstraint<P, Excluded>;

// ---------------------------------------------------------------------------
// Group Config (the options object you pass to .group())
// ---------------------------------------------------------------------------

type GroupParamsConstraint<P extends string> = string extends P
  ? { params?: TSchema }
  : ExtractPathParams<P> extends never
    ? { params?: never }
    : { params: TObject<{ [K in ExtractPathParams<P>]: TSchema }> };

/**
 * Options object for `.group()` calls. When the group prefix contains path parameters,
 * a `params` schema with matching keys is required.
 *
 * @example
 * ```ts
 * // No path params — options object is optional
 * api.group('/pets', g => { ... })
 *
 * // With path params — options object with params is required
 * api.group('/pets/:petId', { params: Type.Object({ petId: Type.String() }) }, g => {
 *   g.get('/toys').response(Type.Array(Toy))
 * })
 * ```
 */
export type GroupConfig<P extends string = string> = GroupParamsConstraint<P>;

/**
 * A response definition with optional metadata beyond just a schema.
 * Used in the `responses` map for custom descriptions, headers, or content types.
 *
 * @example
 * ```ts
 * // With custom headers
 * responses: {
 *   200: {
 *     description: 'A list of pets',
 *     schema: Type.Array(Pet),
 *     headers: { 'X-Total-Count': Type.Integer() },
 *   },
 * }
 *
 * // No body (e.g., 204)
 * responses: {
 *   204: { description: 'No Content' },
 * }
 * ```
 *
 * @see {@link noContent} and {@link created} helpers for common patterns.
 */
/**
 * Configuration for an OpenAPI Example Object.
 *
 * @example
 * ```ts
 * { summary: 'A frog', value: { id: 1, name: 'Frog' } }
 * ```
 */
export interface ExampleConfig {
  /** Short description for the example. */
  summary?: string;
  /** Long description (may contain Markdown). */
  description?: string;
  /** Embedded example value. Mutually exclusive with {@link externalValue}. */
  value?: unknown;
  /** URL pointing to the example. Mutually exclusive with {@link value}. */
  externalValue?: string;
}

/**
 * Enriched header configuration beyond a plain schema.
 *
 * @example
 * ```ts
 * headers: { 'X-Rate-Limit': { schema: Type.Integer(), description: 'Calls per hour', required: true } }
 * ```
 */
export interface HeaderConfig {
  /** TypeBox schema for the header value. */
  schema: TSchema;
  /** Human-readable description. */
  description?: string;
  /** Whether the header is required. */
  required?: boolean;
  /** Whether the header is deprecated. */
  deprecated?: boolean;
}

/**
 * Enriched parameter configuration wrapping a TSchema with OAS parameter options.
 *
 * @example
 * ```ts
 * query: { status: { schema: Type.String(), style: 'form', explode: true } }
 * ```
 */
export interface ParameterConfig {
  /** TypeBox schema for the parameter value. */
  schema: TSchema;
  /** Serialization style (e.g. `'form'`, `'simple'`, `'pipeDelimited'`). */
  style?: string;
  /** Whether arrays/objects generate separate parameters for each value. */
  explode?: boolean;
  /** Whether the value allows reserved characters without percent-encoding. */
  allowReserved?: boolean;
  /** Example value. */
  example?: unknown;
  /** Named examples. */
  examples?: Record<string, ExampleConfig>;
}

/**
 * Encoding configuration for a single property in a multipart request body.
 */
export interface EncodingConfig {
  /** Content-Type for the property (e.g. `'application/xml'`). */
  contentType?: string;
  /** Map of header names to header schemas or {@link HeaderConfig}. */
  headers?: Record<string, TSchema | HeaderConfig>;
  /** Serialization style. */
  style?: string;
  /** Whether arrays/objects generate separate parameters. */
  explode?: boolean;
  /** Whether reserved characters are allowed without encoding. */
  allowReserved?: boolean;
}

export interface ResponseDef {
  /** Human-readable description of this response. */
  description?: string;
  /** TypeBox schema for the response body. Omit for no-body responses (e.g., 204). */
  schema?: TSchema;
  /** Map of header names to TypeBox schemas or enriched {@link HeaderConfig} objects for response headers. */
  headers?: Record<string, TSchema | HeaderConfig>;
  /** MIME type for the response body. Defaults to `'application/json'`. */
  contentType?: string;
  /** A single example value for the response body. */
  example?: unknown;
  /** Named examples for the response body. */
  examples?: Record<string, ExampleConfig>;
  /**
   * Map of link names to {@link LinkConfig} objects. Links describe follow-up
   * operations that can be invoked using values from this response.
   *
   * @example
   * ```ts
   * responses: {
   *   201: {
   *     schema: Pet,
   *     description: 'Created',
   *     links: {
   *       GetPetById: { operationId: 'getPet', parameters: { petId: '$response.body#/id' } },
   *     },
   *   },
   * }
   * ```
   */
  links?: Record<string, LinkConfig>;
  /** @internal Source location captured by helper functions for debug source mapping. */
  _source?: import("./sourcemap").SourceLocation;
}

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------

/**
 * Server configuration for the OpenAPI `servers` array.
 * Can be added at the API level, group level, or per-route.
 *
 * @example
 * ```ts
 * // Simple
 * api.server({ url: 'https://api.example.com/v1', description: 'Production' })
 *
 * // With URL template variables
 * api.server({
 *   url: 'http://localhost:{port}/v1',
 *   description: 'Local development',
 *   variables: {
 *     port: { default: '3000', enum: ['3000', '3001', '8080'] },
 *   },
 * })
 * ```
 */
export interface ServerConfig {
  /** Server URL. May include `{variable}` placeholders resolved by {@link variables}. */
  url: string;
  /** Human-readable description of this server. */
  description?: string;
  /** Map of variable names to their configurations for URL template substitution. */
  variables?: Record<string, ServerVariableConfig>;
}

/**
 * Configuration for a server URL template variable.
 *
 * @example
 * ```ts
 * { default: '3000', enum: ['3000', '3001', '8080'], description: 'Server port' }
 * ```
 */
export interface ServerVariableConfig {
  /** Default value for this variable. */
  default: string;
  /** Allowed values. If provided, `default` must be included. */
  enum?: string[];
  /** Human-readable description of this variable. */
  description?: string;
}

// ---------------------------------------------------------------------------
// Security
// ---------------------------------------------------------------------------

/**
 * A security requirement — either a scheme name (string shorthand) or a map of scheme names
 * to required scopes. String shorthand expands to `{ [name]: [] }` during emission.
 *
 * @example
 * ```ts
 * // String shorthand (no scopes)
 * route.security('bearer')
 *
 * // With OAuth2 scopes
 * route.security({ oauth2: ['read:pets', 'write:pets'] })
 * ```
 */
export type SecurityRequirement = string | Record<string, string[]>;

/**
 * Configuration for a security scheme, registered via {@link Api.securityScheme}.
 * Fields are conditional on the `type` value, matching the OpenAPI Security Scheme Object.
 *
 * @example
 * ```ts
 * // HTTP Bearer
 * api.securityScheme('bearer', { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
 *
 * // API Key
 * api.securityScheme('apiKey', { type: 'apiKey', name: 'X-API-Key', in: 'header' })
 *
 * // OAuth2
 * api.securityScheme('oauth2', {
 *   type: 'oauth2',
 *   flows: {
 *     authorizationCode: {
 *       authorizationUrl: 'https://example.com/oauth/authorize',
 *       tokenUrl: 'https://example.com/oauth/token',
 *       scopes: { 'read:pets': 'Read pets', 'write:pets': 'Modify pets' },
 *     },
 *   },
 * })
 * ```
 */
export interface SecuritySchemeConfig {
  /** The type of the security scheme. */
  type: "apiKey" | "http" | "oauth2" | "openIdConnect" | "mutualTLS";
  /** Human-readable description. */
  description?: string;
  /** The name of the header, query, or cookie parameter. Required for `apiKey`. */
  name?: string;
  /** Location of the API key. Required for `apiKey`. */
  in?: "query" | "header" | "cookie";
  /** HTTP authorization scheme name (e.g., `'bearer'`). Required for `http`. */
  scheme?: string;
  /** Hint for the format of the bearer token (e.g., `'JWT'`). Used with `http` + `bearer`. */
  bearerFormat?: string;
  /** OAuth2 flow configurations. Required for `oauth2`. */
  flows?: OAuthFlowsConfig;
  /** OpenID Connect discovery URL. Required for `openIdConnect`. */
  openIdConnectUrl?: string;
}

/**
 * Container for the four OAuth2 flow types.
 *
 * @example
 * ```ts
 * flows: {
 *   authorizationCode: {
 *     authorizationUrl: 'https://example.com/oauth/authorize',
 *     tokenUrl: 'https://example.com/oauth/token',
 *     scopes: { 'read:pets': 'Read pets' },
 *   },
 * }
 * ```
 */
export interface OAuthFlowsConfig {
  /** Configuration for the OAuth2 implicit flow. */
  implicit?: OAuthFlowConfig;
  /** Configuration for the OAuth2 resource owner password flow. */
  password?: OAuthFlowConfig;
  /** Configuration for the OAuth2 client credentials flow. */
  clientCredentials?: OAuthFlowConfig;
  /** Configuration for the OAuth2 authorization code flow. */
  authorizationCode?: OAuthFlowConfig;
}

/** Configuration for a single OAuth2 flow. Required URLs vary by flow type. */
export interface OAuthFlowConfig {
  /** Authorization URL. Required for `implicit` and `authorizationCode` flows. */
  authorizationUrl?: string;
  /** Token URL. Required for `password`, `clientCredentials`, and `authorizationCode` flows. */
  tokenUrl?: string;
  /** Refresh token URL. Optional for all flows. */
  refreshUrl?: string;
  /** Map of scope names to human-readable descriptions. */
  scopes: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Links (OpenAPI 3.1 Link Object — hypermedia navigation between operations)
// ---------------------------------------------------------------------------

/**
 * Configuration for an OpenAPI Link Object. Links describe a possible
 * follow-up operation from a response — the spec's built-in hypermedia
 * mechanism. Exactly one of `operationId` or `operationRef` should be set.
 *
 * @example
 * ```ts
 * // Navigate from "create pet" → "get pet" using the response body
 * { operationId: 'getPet', parameters: { petId: '$response.body#/id' } }
 *
 * // With an external operation ref
 * { operationRef: '#/paths/~1pets~1{petId}/get', parameters: { petId: '$response.body#/id' } }
 * ```
 */
export interface LinkConfig {
  /** The `operationId` of the target operation. Mutually exclusive with {@link operationRef}. */
  operationId?: string;
  /** A relative or absolute URI reference to a target operation. Mutually exclusive with {@link operationId}. */
  operationRef?: string;
  /** Map of parameter names to runtime expressions or literal values passed to the target operation. */
  parameters?: Record<string, string>;
  /** A runtime expression or literal value to use as the request body of the target operation. */
  requestBody?: string;
  /** Human-readable description of the link. */
  description?: string;
  /** Server override for the target operation. */
  server?: ServerConfig;
}

// ---------------------------------------------------------------------------
// Tags
// ---------------------------------------------------------------------------

/**
 * Tag configuration for the OpenAPI `tags` array. Tags provide metadata for grouping operations.
 *
 * @example
 * ```ts
 * // Simple tag
 * api.tag({ name: 'pets', description: 'Everything about your pets' })
 *
 * // With external docs
 * api.tag({
 *   name: 'store',
 *   description: 'Access to pet store orders',
 *   externalDocs: { url: 'https://example.com/docs/store', description: 'Store guide' },
 * })
 * ```
 */
export interface TagConfig {
  /** Tag name, referenced by route and group `.tag()` calls. */
  name: string;
  /** Human-readable description of this tag. */
  description?: string;
  /** Link to external documentation for this tag. */
  externalDocs?: { url: string; description?: string };
}

// ---------------------------------------------------------------------------
// Internal AST Nodes
// ---------------------------------------------------------------------------

/** @internal Internal representation of a single route in the AST. */
export interface RouteNode {
  method: HttpMethod;
  path: string;
  fullPath: string;
  config: RouteConfig;
  summary?: string;
  description?: string;
  tags: string[];
  operationId?: string;
  deprecated: boolean;
  security: SecurityRequirement[];
  errors: Map<StatusCode, TSchema>;
  /** Chained responses from `.respond()` calls, keyed by status code. */
  responses: Map<StatusCode, TSchema | ResponseDef>;
  /** Chained links from `.link()` calls, keyed by status code → link name → LinkConfig. */
  links: Map<StatusCode, Record<string, LinkConfig>>;
  servers: ServerConfig[];
  extensions: Record<string, unknown>;
  externalDocs?: { url: string; description?: string };
  /** Callbacks registered via `.callback()`. name → { expression, routes }. */
  callbacks: Map<string, { expression: string; routes: RouteNode[] }>;
  /** Chained examples from `.example()` calls, keyed by status code → name → ExampleConfig. */
  examples: Map<StatusCode, Record<string, ExampleConfig>>;
  /** @internal Source mapping entries, populated when `debug: true`. */
  _sources?: SourceEntry[];
}

/** @internal Internal representation of a route group in the AST. */
export interface GroupNode {
  prefix: string;
  params?: TSchema;
  routes: RouteNode[];
  groups: GroupNode[];
  tags: string[];
  security: SecurityRequirement[];
  description?: string;
  servers: ServerConfig[];
  extensions: Record<string, unknown>;
  pathSummary?: string;
  pathDescription?: string;
  /** @internal Source mapping entries, populated when `debug: true`. */
  _sources?: SourceEntry[];
}

// ---------------------------------------------------------------------------
// Group call arguments (conditional rest args for .group())
// ---------------------------------------------------------------------------

/**
 * Conditional argument types for `.group()` calls. When the group prefix contains
 * path parameters, the options object (with `params`) is required as the first argument.
 * Otherwise, you can pass just the callback.
 *
 * @example
 * ```ts
 * // No path params — callback only
 * api.group('/pets', g => { ... })
 *
 * // With path params — options required
 * api.group('/pets/:petId', { params: Type.Object({ petId: Type.String() }) }, g => { ... })
 * ```
 */
export type GroupCallArgs<Prefix extends string, P extends string> =
  ExtractPathParams<P> extends never
    ?
        | [(group: GroupBuilder<`${Prefix}${P}`>) => void]
        | [GroupConfig<P>, (group: GroupBuilder<`${Prefix}${P}`>) => void]
    : [GroupConfig<P>, (group: GroupBuilder<`${Prefix}${P}`>) => void];

// ---------------------------------------------------------------------------
// Macros
// ---------------------------------------------------------------------------

/**
 * A reusable function that configures a {@link RouteBuilder}. Created via {@link macro.route}.
 * Applied to routes with `.use()`.
 *
 * @example
 * ```ts
 * const authed = macro.route(r => r.security('bearer').error(401, ErrorBody))
 * api.get('/pets').response(Type.Array(Pet)).use(authed)
 * ```
 */
export type RouteMacro = (route: RouteBuilder) => void;

/**
 * A reusable function that configures a {@link GroupBuilder}. Created via {@link macro.group}.
 * Applied to groups with `.use()`.
 *
 * @example
 * ```ts
 * const adminSection = macro.group(g => g.tag('Admin').security({ bearer: ['admin'] }))
 * api.group('/admin', g => { g.use(adminSection) })
 * ```
 */
export type GroupMacro = (group: GroupBuilder<any>) => void;

/**
 * A reusable function that configures an {@link Api}. Created via {@link macro.api}.
 * Applied to the API with `.use()`.
 *
 * @example
 * ```ts
 * const withServers = macro.api(a => a.server({ url: 'https://api.example.com' }))
 * api.use(withServers)
 * ```
 */
export type ApiMacro<V extends SpecVersion = SpecVersion> = (
  api: Api<V>,
) => void;

// ---------------------------------------------------------------------------
// Api Config
// ---------------------------------------------------------------------------

/**
 * Configuration for the {@link Api} constructor, mapping to the OpenAPI Info Object.
 *
 * @example
 * ```ts
 * const api = new Api('3.1', 'Pet Store', {
 *   version: '1.0.0',
 *   description: 'A sample pet store API',
 *   contact: { name: 'Support', email: 'help@example.com' },
 *   license: { name: 'MIT' },
 * })
 * ```
 */
export interface ApiConfig {
  /** API version string. Defaults to `'1.0.0'`. */
  version?: string;
  /** API description for the OpenAPI info object. */
  description?: string;
  /** Short summary of the API. */
  summary?: string;
  /** URL to the Terms of Service. */
  termsOfService?: string;
  /** Contact information for the API. */
  contact?: { name?: string; url?: string; email?: string };
  /** License information. `identifier` and `url` are mutually exclusive per the OpenAPI spec. */
  license?: { name: string; identifier?: string; url?: string };
  /** Link to external documentation for the API. */
  externalDocs?: { url: string; description?: string };
  /**
   * Enable debug mode for source mapping. When `true`, builder methods capture
   * call-site locations, enabling the spacview viewer to link OpenAPI output
   * back to the TypeScript source that produced it.
   */
  debug?: boolean;
  /**
   * Controls how version mismatches between team modules and the central project
   * are handled during composition. Team modules declare their target version via
   * {@link Api.assertVersion}, and the policy determines whether mismatches produce
   * errors, warnings, or are silently accepted.
   *
   * - `'strict'` — error on any patch version mismatch
   * - `'warn'` — log warnings for patch mismatches, error on major.minor mismatch (default)
   * - `'lenient'` — silently accept patch mismatches, error only on major.minor mismatch
   *
   * @default 'warn'
   *
   * @example
   * ```ts
   * // Enforce exact version match across all teams
   * const api = new Api('3.1', 'My API', { versionPolicy: 'strict' })
   *
   * // Accept minor drift silently
   * const api = new Api('3.1', 'My API', { versionPolicy: 'lenient' })
   * ```
   */
  versionPolicy?: VersionPolicy;
}

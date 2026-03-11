import type { TSchema, TObject } from '@sinclair/typebox'
import type { RouteBuilder } from './route'
import type { GroupBuilder } from './group'
import type { Api } from './api'

// ---------------------------------------------------------------------------
// HTTP
// ---------------------------------------------------------------------------

/**
 * Supported HTTP methods for route definitions.
 *
 * @example
 * ```ts
 * api.get('/pets', { response: Type.Array(Pet) })
 * api.post('/pets', { body: CreatePet, response: Pet })
 * ```
 */
export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head' | 'trace'

/** All supported HTTP methods as an array. */
export const HTTP_METHODS: HttpMethod[] = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace']

// ---------------------------------------------------------------------------
// Path Parameter Extraction
// ---------------------------------------------------------------------------

type ParamFromSegment<S extends string> =
  S extends `:${infer Param}` ? Param
  : S extends `{${infer Param}}` ? Param
  : never

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
    : ParamFromSegment<P>

/**
 * Resolves to `P` when its path params don't overlap with `Excluded`, otherwise `never`.
 * Used internally to prevent route paths from re-declaring group-level path parameters.
 */
export type SafeRoutePath<P extends string, Excluded extends string> =
  Extract<ExtractPathParams<P>, Excluded> extends never ? P : never

type PathParamsConstraint<P extends string, Excluded extends string = never> =
  string extends P ? { params?: TSchema }
  : Exclude<ExtractPathParams<P>, Excluded> extends never ? { params?: never }
  : { params: TObject<{ [K in Exclude<ExtractPathParams<P>, Excluded>]: TSchema }> }

// ---------------------------------------------------------------------------
// Route Config (the object you pass to .get(), .post(), etc.)
// ---------------------------------------------------------------------------

interface BaseRouteConfig {
  /** TypeBox schema for path parameters. Required when the path contains `:param` or `{param}` segments. */
  params?: TSchema
  /** TypeBox schema for query string parameters. Properties marked `Type.Optional()` become non-required in the emitted spec. */
  query?: TSchema
  /** TypeBox schema for request headers. */
  headers?: TSchema
  /** TypeBox schema for the JSON request body. */
  body?: TSchema
  /** Shorthand for a single `200` response schema. Mutually convenient with {@link responses}. */
  response?: TSchema
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
  responses?: Record<string | number, TSchema | ResponseDef>
}

/**
 * Configuration object passed to HTTP method calls (`.get()`, `.post()`, etc.).
 * Path parameters are type-checked against the path string — if the path contains
 * `:param` segments, a `params` schema with matching keys is required.
 *
 * @example
 * ```ts
 * // Simple response shorthand
 * api.get('/pets', { response: Type.Array(Pet) })
 *
 * // With path params, query, body, and explicit responses
 * api.get('/pets/:petId', {
 *   params: Type.Object({ petId: Type.String() }),
 *   query: Type.Object({ fields: Type.Optional(Type.String()) }),
 *   response: Pet,
 * })
 *
 * // Request body + multiple response codes
 * api.post('/pets', {
 *   body: CreatePet,
 *   responses: {
 *     201: created(Pet),
 *     422: DetailedError,
 *   },
 * })
 * ```
 */
export type RouteConfig<P extends string = string, Excluded extends string = never> =
  Omit<BaseRouteConfig, 'params'> & PathParamsConstraint<P, Excluded>

// ---------------------------------------------------------------------------
// Group Config (the options object you pass to .group())
// ---------------------------------------------------------------------------

type GroupParamsConstraint<P extends string> =
  string extends P ? { params?: TSchema }
  : ExtractPathParams<P> extends never ? { params?: never }
  : { params: TObject<{ [K in ExtractPathParams<P>]: TSchema }> }

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
 *   g.get('/toys', { response: Type.Array(Toy) })
 * })
 * ```
 */
export type GroupConfig<P extends string = string> = GroupParamsConstraint<P>

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
export interface ResponseDef {
  /** Human-readable description of this response. */
  description?: string
  /** TypeBox schema for the response body. Omit for no-body responses (e.g., 204). */
  schema?: TSchema
  /** Map of header names to TypeBox schemas for response headers. */
  headers?: Record<string, TSchema>
  /** MIME type for the response body. Defaults to `'application/json'`. */
  contentType?: string
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
  url: string
  /** Human-readable description of this server. */
  description?: string
  /** Map of variable names to their configurations for URL template substitution. */
  variables?: Record<string, ServerVariableConfig>
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
  default: string
  /** Allowed values. If provided, `default` must be included. */
  enum?: string[]
  /** Human-readable description of this variable. */
  description?: string
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
export type SecurityRequirement = string | Record<string, string[]>

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
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect' | 'mutualTLS'
  /** Human-readable description. */
  description?: string
  /** The name of the header, query, or cookie parameter. Required for `apiKey`. */
  name?: string
  /** Location of the API key. Required for `apiKey`. */
  in?: 'query' | 'header' | 'cookie'
  /** HTTP authorization scheme name (e.g., `'bearer'`). Required for `http`. */
  scheme?: string
  /** Hint for the format of the bearer token (e.g., `'JWT'`). Used with `http` + `bearer`. */
  bearerFormat?: string
  /** OAuth2 flow configurations. Required for `oauth2`. */
  flows?: OAuthFlowsConfig
  /** OpenID Connect discovery URL. Required for `openIdConnect`. */
  openIdConnectUrl?: string
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
  implicit?: OAuthFlowConfig
  /** Configuration for the OAuth2 resource owner password flow. */
  password?: OAuthFlowConfig
  /** Configuration for the OAuth2 client credentials flow. */
  clientCredentials?: OAuthFlowConfig
  /** Configuration for the OAuth2 authorization code flow. */
  authorizationCode?: OAuthFlowConfig
}

/** Configuration for a single OAuth2 flow. Required URLs vary by flow type. */
export interface OAuthFlowConfig {
  /** Authorization URL. Required for `implicit` and `authorizationCode` flows. */
  authorizationUrl?: string
  /** Token URL. Required for `password`, `clientCredentials`, and `authorizationCode` flows. */
  tokenUrl?: string
  /** Refresh token URL. Optional for all flows. */
  refreshUrl?: string
  /** Map of scope names to human-readable descriptions. */
  scopes: Record<string, string>
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
  name: string
  /** Human-readable description of this tag. */
  description?: string
  /** Link to external documentation for this tag. */
  externalDocs?: { url: string; description?: string }
}

// ---------------------------------------------------------------------------
// Internal AST Nodes
// ---------------------------------------------------------------------------

/** @internal Internal representation of a single route in the AST. */
export interface RouteNode {
  method: HttpMethod
  path: string
  fullPath: string
  config: RouteConfig
  summary?: string
  description?: string
  tags: string[]
  operationId?: string
  deprecated: boolean
  security: SecurityRequirement[]
  errors: Map<number, TSchema>
  servers: ServerConfig[]
  extensions: Record<string, unknown>
  /** @internal Call-site metadata for debug source maps. */
  _sources: Map<string, string>
}

/** @internal Internal representation of a route group in the AST. */
export interface GroupNode {
  prefix: string
  params?: TSchema
  routes: RouteNode[]
  groups: GroupNode[]
  tags: string[]
  security: SecurityRequirement[]
  description?: string
  servers: ServerConfig[]
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
    ? [(group: GroupBuilder<`${Prefix}${P}`>) => void]
      | [GroupConfig<P>, (group: GroupBuilder<`${Prefix}${P}`>) => void]
    : [GroupConfig<P>, (group: GroupBuilder<`${Prefix}${P}`>) => void]

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
 * api.get('/pets', { response: Type.Array(Pet) }).use(authed)
 * ```
 */
export type RouteMacro = (route: RouteBuilder) => void

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
export type GroupMacro = (group: GroupBuilder<any>) => void

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
export type ApiMacro = (api: Api) => void

// ---------------------------------------------------------------------------
// Api Config
// ---------------------------------------------------------------------------

/**
 * Configuration for the {@link Api} constructor, mapping to the OpenAPI Info Object.
 *
 * @example
 * ```ts
 * const api = new Api('Pet Store', {
 *   version: '1.0.0',
 *   description: 'A sample pet store API',
 *   contact: { name: 'Support', email: 'help@example.com' },
 *   license: { name: 'MIT' },
 * })
 * ```
 */
export interface ApiConfig {
  /** API version string. Defaults to `'1.0.0'`. */
  version?: string
  /** API description for the OpenAPI info object. */
  description?: string
  /** Short summary of the API. */
  summary?: string
  /** URL to the Terms of Service. */
  termsOfService?: string
  /** Contact information for the API. */
  contact?: { name?: string; url?: string; email?: string }
  /** License information. `identifier` and `url` are mutually exclusive per the OpenAPI spec. */
  license?: { name: string; identifier?: string; url?: string }
}

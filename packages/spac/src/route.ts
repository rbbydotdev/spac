import type { TSchema } from '@sinclair/typebox'
import type {
  RouteConfig,
  RouteNode,
  HttpMethod,
  SecurityRequirement,
  ServerConfig,
  RouteMacro,
} from './types'

/**
 * Fluent builder for configuring a single route's metadata after definition.
 * Returned by HTTP method calls on {@link Api} and {@link GroupBuilder}.
 * All methods return `this` for chaining.
 *
 * @example
 * ```ts
 * api.get('/pets', { response: Type.Array(Pet) })
 *   .summary('List all pets')
 *   .description('Returns a paginated list of pets')
 *   .tag('pets')
 *   .operationId('listPets')
 *
 * api.post('/pets', { body: CreatePet, response: Pet })
 *   .summary('Create a pet')
 *   .security('bearer')
 *   .error(401, ErrorBody)
 *   .error(422, ValidationError)
 * ```
 */
export class RouteBuilder {
  /** @internal */
  readonly _node: RouteNode

  constructor(method: HttpMethod, path: string, fullPath: string, config: RouteConfig) {
    this._node = {
      method,
      path,
      fullPath,
      config,
      tags: [],
      deprecated: false,
      security: [],
      errors: new Map(),
      servers: [],
      extensions: {},
    }
  }

  // -- Metadata chaining ----------------------------------------------------

  /**
   * Set the operation summary (short description shown in docs).
   *
   * @param text - A brief summary of the operation.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/pets', { response: Type.Array(Pet) }).summary('List all pets')
   * ```
   */
  summary(text: string): this {
    this._node.summary = text
    return this
  }

  /**
   * Set the operation description (longer explanation, may contain Markdown).
   *
   * @param text - A detailed description of the operation.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/pets', { response: Type.Array(Pet) })
   *   .description('Returns a paginated list of pets with optional filters.')
   * ```
   */
  description(text: string): this {
    this._node.description = text
    return this
  }

  /**
   * Add a single tag to this operation. Tags group operations in generated documentation.
   *
   * @param name - Tag name. Should match a tag registered via {@link Api.tag}.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/pets', { response: Type.Array(Pet) }).tag('pets')
   * ```
   */
  tag(name: string): this {
    this._node.tags.push(name)
    return this
  }

  /**
   * Add multiple tags to this operation at once.
   *
   * @param names - Tag names.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/pets', { response: Type.Array(Pet) }).tags('pets', 'public')
   * ```
   */
  tags(...names: string[]): this {
    this._node.tags.push(...names)
    return this
  }

  /**
   * Set a unique operation ID. Used by code generators and documentation tools.
   *
   * @param id - A unique string identifying this operation across the entire API.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/pets', { response: Type.Array(Pet) }).operationId('listPets')
   * ```
   */
  operationId(id: string): this {
    this._node.operationId = id
    return this
  }

  /**
   * Mark this operation as deprecated.
   *
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/pets/findByTags', { response: Type.Array(Pet) })
   *   .operationId('findPetsByTags')
   *   .deprecated()
   * ```
   */
  deprecated(): this {
    this._node.deprecated = true
    return this
  }

  // -- Security -------------------------------------------------------------

  /**
   * Add security requirements to this operation. Accepts scheme name strings
   * or scope maps. Multiple calls accumulate requirements.
   *
   * @param schemes - One or more security requirements.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/pets', { response: Type.Array(Pet) })
   *   .security('bearer')
   *   .security({ oauth2: ['read:pets'] })
   * ```
   */
  security(...schemes: SecurityRequirement[]): this {
    this._node.security.push(...schemes)
    return this
  }

  // -- Responses / errors ---------------------------------------------------

  /**
   * Add an error response for a specific HTTP status code.
   * Multiple calls with different status codes accumulate error responses.
   *
   * @param status - HTTP status code (e.g., `404`, `500`).
   * @param schema - TypeBox schema for the error response body.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/pets/:petId', {
   *   params: Type.Object({ petId: Type.String() }),
   *   response: Pet,
   * })
   *   .error(404, ErrorBody)
   *   .error(500, ErrorBody)
   * ```
   */
  error(status: number, schema: TSchema): this {
    this._node.errors.set(status, schema)
    return this
  }

  // -- Servers --------------------------------------------------------------

  /**
   * Add a server override for this specific operation.
   *
   * @param config - Server configuration.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/health', { response: HealthStatus })
   *   .server({ url: 'http://localhost:3000', description: 'Health check only on local' })
   * ```
   */
  server(config: ServerConfig): this {
    this._node.servers.push(config)
    return this
  }

  // -- Extensions -----------------------------------------------------------

  /**
   * Add an OpenAPI specification extension (`x-` prefixed field) to this operation.
   * The `x-` prefix is added automatically if not present.
   *
   * @param name - Extension name (with or without `x-` prefix).
   * @param value - Extension value (any JSON-serializable value).
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/pets', { response: Type.Array(Pet) })
   *   .extension('rate-limit', 100)     // emits as 'x-rate-limit'
   *   .extension('x-internal', true)    // kept as 'x-internal'
   * ```
   */
  extension(name: string, value: unknown): this {
    const key = name.startsWith('x-') ? name : `x-${name}`
    this._node.extensions[key] = value
    return this
  }

  // -- Macros ---------------------------------------------------------------

  /**
   * Apply a route-level macro. Macros are reusable configuration functions
   * created with {@link macro.route} that can set tags, security, errors, etc.
   * Multiple macros can be composed by chaining `.use()` calls.
   *
   * @param macro - The macro function to apply.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * const authed = macro.route(r => r.security('bearer').error(401, ErrorBody))
   * const validated = macro.route(r => r.error(422, ValidationError))
   *
   * api.post('/pets', { body: CreatePet, response: Pet })
   *   .use(authed)
   *   .use(validated)
   * ```
   */
  use(macro: RouteMacro): this {
    macro(this)
    return this
  }
}

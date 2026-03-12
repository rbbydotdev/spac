import type { TSchema } from '@sinclair/typebox'
import type {
  ApiConfig,
  RouteConfig,
  GroupConfig,
  GroupCallArgs,
  RouteNode,
  GroupNode,
  HttpMethod,
  SecurityRequirement,
  ServerConfig,
  TagConfig,
  SecuritySchemeConfig,
  ApiMacro,
} from './types'
import { RouteBuilder } from './route'
import { GroupBuilder } from './group'
import { emitOpenApi } from './emit'
import { captureCallSite } from './debug'
import type { EmitOptions, EmitDebugResult } from './debug'

/**
 * The main entry point for defining an OpenAPI specification.
 * Create an `Api` instance, define routes and groups, configure security/servers/tags,
 * and call {@link emit} to produce a valid OpenAPI 3.1 document.
 *
 * All configuration methods return `this` for chaining.
 *
 * @example
 * ```ts
 * import { Api, named, macro, noContent } from 'spac'
 * import { Type } from '@sinclair/typebox'
 *
 * const Pet = named('Pet', Type.Object({ id: Type.String(), name: Type.String() }))
 *
 * const api = new Api('Petstore', {
 *   version: '1.0.0',
 *   description: 'A sample pet store API',
 * })
 *
 * api.server({ url: 'https://api.petstore.com/v1' })
 * api.securityScheme('bearer', { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
 * api.tag({ name: 'pets', description: 'Pet operations' })
 *
 * api.group('/pets', g => {
 *   g.tag('pets')
 *   g.get('/', { response: Type.Array(Pet) }).summary('List all pets')
 *   g.post('/', { body: Pet, response: Pet }).summary('Create a pet').security('bearer')
 *   g.delete('/:petId', {
 *     params: Type.Object({ petId: Type.String() }),
 *     responses: { 204: noContent() },
 *   }).security('bearer')
 * })
 *
 * const spec = api.emit() // => OpenAPI 3.1 JSON
 * ```
 */
export class Api {
  /** The API title, used as `info.title` in the emitted OpenAPI document. */
  readonly name: string
  /** Configuration options passed to the constructor. */
  readonly config: ApiConfig

  /** @internal */ readonly _groups: GroupNode[] = []
  /** @internal */ readonly _routes: RouteNode[] = []
  /** @internal */ readonly _servers: ServerConfig[] = []
  /** @internal */ readonly _securitySchemes: Record<string, SecuritySchemeConfig> = {}
  /** @internal */ readonly _tags: TagConfig[] = []
  /** @internal */ readonly _schemas: Map<string, TSchema> = new Map()
  /** @internal */ readonly _security: SecurityRequirement[] = []
  /** @internal */ readonly _sources: Map<string, string> = new Map()

  /**
   * Create a new API definition.
   *
   * @param name - The API title (becomes `info.title` in the OpenAPI document).
   * @param config - Optional API metadata (version, description, contact, license, etc.).
   *
   * @example
   * ```ts
   * const api = new Api('My API')
   * const api = new Api('My API', { version: '2.0.0', description: 'My API description' })
   * ```
   */
  constructor(name: string, config: ApiConfig = {}) {
    this.name = name
    this.config = { version: '1.0.0', ...config }
    const site = captureCallSite()
    if (site) this._sources.set('info', site)
  }

  // -- Top-level route helpers ----------------------------------------------

  private _route(method: HttpMethod, path: string, config: RouteConfig): RouteBuilder {
    const builder = new RouteBuilder(method, path, path, config)
    this._routes.push(builder._node)
    return builder
  }

  /**
   * Define a top-level GET route.
   * @param path - URL path (e.g., `'/pets'` or `'/pets/:petId'`).
   * @param config - Route configuration with params, query, body, response, etc.
   * @returns A {@link RouteBuilder} for chaining metadata (summary, tags, security, etc.).
   *
   * @example
   * ```ts
   * api.get('/pets', { response: Type.Array(Pet) })
   *   .summary('List all pets')
   *   .tag('pets')
   *
   * api.get('/pets/:petId', {
   *   params: Type.Object({ petId: Type.String() }),
   *   response: Pet,
   * }).error(404, ErrorBody)
   * ```
   */
  get<P extends string>(path: P, config: RouteConfig<P>): RouteBuilder {
    return this._route('get', path, config as RouteConfig)
  }

  /**
   * Define a top-level POST route.
   * @param path - URL path.
   * @param config - Route configuration.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * api.post('/pets', { body: CreatePet, response: Pet })
   *   .summary('Create a pet')
   *   .security('bearer')
   * ```
   */
  post<P extends string>(path: P, config: RouteConfig<P>): RouteBuilder {
    return this._route('post', path, config as RouteConfig)
  }

  /**
   * Define a top-level PUT route.
   * @param path - URL path.
   * @param config - Route configuration.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * api.put('/pets/:petId', {
   *   params: Type.Object({ petId: Type.String() }),
   *   body: UpdatePet,
   *   response: Pet,
   * })
   * ```
   */
  put<P extends string>(path: P, config: RouteConfig<P>): RouteBuilder {
    return this._route('put', path, config as RouteConfig)
  }

  /**
   * Define a top-level PATCH route.
   * @param path - URL path.
   * @param config - Route configuration.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * api.patch('/pets/:petId', {
   *   params: Type.Object({ petId: Type.String() }),
   *   body: UpdatePet,
   *   response: Pet,
   * })
   * ```
   */
  patch<P extends string>(path: P, config: RouteConfig<P>): RouteBuilder {
    return this._route('patch', path, config as RouteConfig)
  }

  /**
   * Define a top-level DELETE route.
   * @param path - URL path.
   * @param config - Route configuration.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * api.delete('/pets/:petId', {
   *   params: Type.Object({ petId: Type.String() }),
   *   responses: { 204: noContent() },
   * }).security('bearer')
   * ```
   */
  delete<P extends string>(path: P, config: RouteConfig<P>): RouteBuilder {
    return this._route('delete', path, config as RouteConfig)
  }

  /**
   * Define a top-level OPTIONS route.
   * @param path - URL path.
   * @param config - Route configuration.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * api.options('/pets', { responses: { 204: noContent('CORS preflight') } })
   * ```
   */
  options<P extends string>(path: P, config: RouteConfig<P>): RouteBuilder {
    return this._route('options', path, config as RouteConfig)
  }

  /**
   * Define a top-level HEAD route.
   * @param path - URL path.
   * @param config - Route configuration.
   * @returns A {@link RouteBuilder} for chaining metadata.
   */
  head<P extends string>(path: P, config: RouteConfig<P>): RouteBuilder {
    return this._route('head', path, config as RouteConfig)
  }

  /**
   * Define a top-level TRACE route.
   * @param path - URL path.
   * @param config - Route configuration.
   * @returns A {@link RouteBuilder} for chaining metadata.
   */
  trace<P extends string>(path: P, config: RouteConfig<P>): RouteBuilder {
    return this._route('trace', path, config as RouteConfig)
  }

  // -- Groups ---------------------------------------------------------------

  /**
   * Create a route group under a shared path prefix. Routes defined inside the
   * callback inherit the group's prefix, tags, and security settings.
   *
   * Groups can be nested. When the prefix contains path parameters, an options
   * object with a `params` schema is required.
   *
   * @param prefix - The shared path prefix (e.g., `'/pets'`).
   * @param args - Either `(callback)` or `(options, callback)` when the prefix has path params.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * // Simple group
   * api.group('/pets', g => {
   *   g.tag('pets')
   *   g.get('/', { response: Type.Array(Pet) })
   *   g.get('/:petId', { params: Type.Object({ petId: Type.String() }), response: Pet })
   * })
   *
   * // Nested groups
   * api.group('/store', g => {
   *   g.tag('store')
   *   g.get('/inventory', { response: InventoryResponse })
   *   g.group('/admin', admin => {
   *     admin.security('bearer')
   *     admin.get('/stats', { response: StatsResponse })
   *   })
   * })
   * ```
   */
  group<P extends string>(prefix: P, ...args: GroupCallArgs<'', P>): this {
    let options: GroupConfig<P> | undefined
    let cb: (group: GroupBuilder<P>) => void

    if (typeof args[0] === 'function') {
      cb = args[0] as typeof cb
    } else {
      options = args[0] as GroupConfig<P>
      cb = args[1] as typeof cb
    }

    const group = new GroupBuilder<P>(
      prefix,
      options && 'params' in options ? (options as Record<string, TSchema>).params : undefined,
    )
    cb(group)
    this._groups.push(group._node)
    return this
  }

  // -- Top-level configuration ----------------------------------------------

  /**
   * Add a server to the OpenAPI `servers` array.
   *
   * @param config - Server URL, description, and optional URL template variables.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.server({ url: 'https://api.example.com/v1', description: 'Production' })
   * api.server({
   *   url: 'http://localhost:{port}/v1',
   *   variables: { port: { default: '3000', enum: ['3000', '8080'] } },
   * })
   * ```
   */
  server(config: ServerConfig): this {
    this._servers.push(config)
    const site = captureCallSite()
    if (site) this._sources.set(`server:${this._servers.length - 1}`, site)
    return this
  }

  /**
   * Register a security scheme in `components.securitySchemes`.
   * The name is referenced by `.security()` calls on routes, groups, or the API.
   *
   * @param name - Scheme identifier (e.g., `'bearer'`, `'apiKey'`).
   * @param config - Security scheme configuration.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.securityScheme('bearer', { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
   * api.securityScheme('apiKey', { type: 'apiKey', name: 'X-API-Key', in: 'header' })
   * ```
   */
  securityScheme(name: string, config: SecuritySchemeConfig): this {
    this._securitySchemes[name] = config
    const site = captureCallSite()
    if (site) this._sources.set(`securityScheme:${name}`, site)
    return this
  }

  /**
   * Add a tag to the OpenAPI `tags` array. Accepts a string shorthand or a full {@link TagConfig}.
   *
   * @param config - Tag name (string) or full tag configuration object.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.tag('pets')
   * api.tag({ name: 'pets', description: 'Everything about your pets' })
   * api.tag({
   *   name: 'store',
   *   description: 'Pet store orders',
   *   externalDocs: { url: 'https://example.com/docs/store' },
   * })
   * ```
   */
  tag(config: string | TagConfig): this {
    if (typeof config === 'string') {
      this._tags.push({ name: config })
    } else {
      this._tags.push(config)
    }
    const site = captureCallSite()
    if (site) this._sources.set(`tag:${this._tags.length - 1}`, site)
    return this
  }

  /**
   * Register a named schema in `components.schemas`. This is an alternative to using
   * {@link named} — schemas registered here are always included in the emitted document
   * even if not referenced by any route.
   *
   * @param name - Schema name as it appears in `components.schemas`.
   * @param schema - The TypeBox schema.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.schema('Pet', Type.Object({ id: Type.String(), name: Type.String() }))
   * api.schema('Error', errorSchema())
   * ```
   */
  schema(name: string, schema: TSchema): this {
    this._schemas.set(name, schema)
    const site = captureCallSite()
    if (site) this._sources.set(`schema:${name}`, site)
    return this
  }

  /**
   * Set global security requirements. These apply to all operations unless overridden.
   *
   * @param schemes - One or more security requirements (scheme names or scope maps).
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.security('bearer')
   * api.security({ oauth2: ['read:pets'] })
   * ```
   */
  security(...schemes: SecurityRequirement[]): this {
    const startIdx = this._security.length
    this._security.push(...schemes)
    const site = captureCallSite()
    if (site) {
      for (let i = startIdx; i < this._security.length; i++) {
        this._sources.set(`security:${i}`, site)
      }
    }
    return this
  }

  /**
   * Apply an API-level macro. Macros are reusable configuration functions
   * created with {@link macro.api}.
   *
   * @param macro - The macro function to apply.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * const withServers = macro.api(a =>
   *   a.server({ url: 'https://api.example.com' })
   *    .server({ url: 'https://staging.example.com' })
   * )
   * api.use(withServers)
   * ```
   */
  use(macro: ApiMacro): this {
    macro(this)
    return this
  }

  // -- Emission -------------------------------------------------------------

  /**
   * Emit a valid OpenAPI 3.1 document as a JSON-serializable object.
   * Walks the internal AST, resolves schemas (hoisting named schemas to
   * `components.schemas` as `$ref`), and assembles the full document.
   *
   * Pass `{ debug: true }` to get a source map linking spec object paths
   * back to the code locations that defined them.
   *
   * @returns The OpenAPI 3.1 specification, or `{ spec, files, sourceMap }` when debug is true.
   *
   * @example
   * ```ts
   * const spec = api.emit()
   *
   * // With debug source map
   * const debug = api.emit({ debug: true })
   * // debug.files: ["path/to/file.ts", ...]
   * // debug.sourceMap: { [crc32(objectPath)]: "fileId:line:col" }
   * ```
   */
  emit(): Record<string, unknown>
  emit(options: { debug: true }): EmitDebugResult
  emit(options: EmitOptions): Record<string, unknown>
  emit(options?: EmitOptions): Record<string, unknown> | EmitDebugResult {
    return emitOpenApi(this, options)
  }
}

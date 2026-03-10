import type { TSchema } from '@sinclair/typebox'
import type {
  RouteConfig,
  SafeRoutePath,
  GroupConfig,
  GroupCallArgs,
  ExtractPathParams,
  GroupNode,
  HttpMethod,
  SecurityRequirement,
  ServerConfig,
  GroupMacro,
} from './types'
import { RouteBuilder } from './route'

type ExcludedParams<Prefix extends string> = ExtractPathParams<Prefix>

/**
 * Builder for defining routes under a shared path prefix. Created by {@link Api.group}
 * or by nesting via {@link GroupBuilder.group}.
 *
 * Routes defined within a group inherit the group's path prefix, tags, and security settings.
 * Groups can be arbitrarily nested; metadata cascades from parent to child.
 *
 * @typeParam Prefix - The accumulated path prefix (used for type-safe path params).
 *
 * @example
 * ```ts
 * api.group('/pets', g => {
 *   g.tag('pets')
 *   g.security('bearer')
 *
 *   g.get('/', { response: Type.Array(Pet) }).summary('List pets')
 *   g.post('/', { body: CreatePet, response: Pet }).summary('Create a pet')
 *   g.get('/:petId', {
 *     params: Type.Object({ petId: Type.String() }),
 *     response: Pet,
 *   }).error(404, ErrorBody)
 *
 *   // Nested group inherits parent tags + security
 *   g.group('/admin', admin => {
 *     admin.tag('admin')
 *     admin.get('/stats', { response: StatsResponse })
 *   })
 * })
 * ```
 */
export class GroupBuilder<Prefix extends string = string> {
  /** @internal */
  readonly _node: GroupNode

  constructor(prefix: string, params?: TSchema) {
    this._node = {
      prefix,
      params,
      routes: [],
      groups: [],
      tags: [],
      security: [],
      servers: [],
    }
  }

  // -- Route helpers --------------------------------------------------------

  private _route(method: HttpMethod, path: string, config: RouteConfig): RouteBuilder {
    const fullPath = path === '/' ? this._node.prefix : this._node.prefix + path
    const builder = new RouteBuilder(method, path, fullPath, config)
    this._node.routes.push(builder._node)
    return builder
  }

  /**
   * Define a GET route within this group.
   * @param path - Route path relative to the group prefix. Use `'/'` for the prefix itself.
   * @param config - Route configuration with params, query, body, response, etc.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * g.get('/', { response: Type.Array(Pet) }).summary('List pets')
   * g.get('/:petId', {
   *   params: Type.Object({ petId: Type.String() }),
   *   response: Pet,
   * })
   * ```
   */
  get<P extends string>(path: SafeRoutePath<P, ExcludedParams<Prefix>>, config: RouteConfig<P, ExcludedParams<Prefix>>): RouteBuilder {
    return this._route('get', path, config as RouteConfig)
  }

  /**
   * Define a POST route within this group.
   * @param path - Route path relative to the group prefix.
   * @param config - Route configuration.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * g.post('/', { body: CreatePet, responses: { 201: created(Pet) } })
   *   .summary('Create a pet')
   * ```
   */
  post<P extends string>(path: SafeRoutePath<P, ExcludedParams<Prefix>>, config: RouteConfig<P, ExcludedParams<Prefix>>): RouteBuilder {
    return this._route('post', path, config as RouteConfig)
  }

  /**
   * Define a PUT route within this group.
   * @param path - Route path relative to the group prefix.
   * @param config - Route configuration.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * g.put('/:petId', {
   *   params: Type.Object({ petId: Type.String() }),
   *   body: UpdatePet,
   *   response: Pet,
   * })
   * ```
   */
  put<P extends string>(path: SafeRoutePath<P, ExcludedParams<Prefix>>, config: RouteConfig<P, ExcludedParams<Prefix>>): RouteBuilder {
    return this._route('put', path, config as RouteConfig)
  }

  /**
   * Define a PATCH route within this group.
   * @param path - Route path relative to the group prefix.
   * @param config - Route configuration.
   * @returns A {@link RouteBuilder} for chaining metadata.
   */
  patch<P extends string>(path: SafeRoutePath<P, ExcludedParams<Prefix>>, config: RouteConfig<P, ExcludedParams<Prefix>>): RouteBuilder {
    return this._route('patch', path, config as RouteConfig)
  }

  /**
   * Define a DELETE route within this group.
   * @param path - Route path relative to the group prefix.
   * @param config - Route configuration.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * g.delete('/:petId', {
   *   params: Type.Object({ petId: Type.String() }),
   *   responses: { 204: noContent() },
   * }).security('bearer')
   * ```
   */
  delete<P extends string>(path: SafeRoutePath<P, ExcludedParams<Prefix>>, config: RouteConfig<P, ExcludedParams<Prefix>>): RouteBuilder {
    return this._route('delete', path, config as RouteConfig)
  }

  /**
   * Define an OPTIONS route within this group.
   * @param path - Route path relative to the group prefix.
   * @param config - Route configuration.
   * @returns A {@link RouteBuilder} for chaining metadata.
   */
  options<P extends string>(path: SafeRoutePath<P, ExcludedParams<Prefix>>, config: RouteConfig<P, ExcludedParams<Prefix>>): RouteBuilder {
    return this._route('options', path, config as RouteConfig)
  }

  /**
   * Define a HEAD route within this group.
   * @param path - Route path relative to the group prefix.
   * @param config - Route configuration.
   * @returns A {@link RouteBuilder} for chaining metadata.
   */
  head<P extends string>(path: SafeRoutePath<P, ExcludedParams<Prefix>>, config: RouteConfig<P, ExcludedParams<Prefix>>): RouteBuilder {
    return this._route('head', path, config as RouteConfig)
  }

  /**
   * Define a TRACE route within this group.
   * @param path - Route path relative to the group prefix.
   * @param config - Route configuration.
   * @returns A {@link RouteBuilder} for chaining metadata.
   */
  trace<P extends string>(path: SafeRoutePath<P, ExcludedParams<Prefix>>, config: RouteConfig<P, ExcludedParams<Prefix>>): RouteBuilder {
    return this._route('trace', path, config as RouteConfig)
  }

  // -- Nested groups --------------------------------------------------------

  /**
   * Create a nested group under this group's prefix. The child group's prefix is
   * concatenated with the parent's. Tags and security cascade from parent to child.
   *
   * @param prefix - Additional path prefix for the nested group.
   * @param args - Either `(callback)` or `(options, callback)` when the prefix has path params.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.group('/store', g => {
   *   g.tag('store')
   *   g.get('/inventory', { response: InventoryResponse })
   *
   *   g.group('/admin', admin => {
   *     admin.tag('admin')
   *     admin.security({ bearer: ['admin'] })
   *     admin.get('/stats', { response: StatsResponse })
   *     // Route path: /store/admin/stats — inherits 'store' + 'admin' tags
   *   })
   * })
   * ```
   */
  group<P extends string>(prefix: P, ...args: GroupCallArgs<Prefix, P>): this {
    let options: GroupConfig<P> | undefined
    let cb: (group: GroupBuilder<`${Prefix}${P}`>) => void

    if (typeof args[0] === 'function') {
      cb = args[0] as typeof cb
    } else {
      options = args[0] as GroupConfig<P>
      cb = args[1] as typeof cb
    }

    const child = new GroupBuilder<`${Prefix}${P}`>(
      this._node.prefix + prefix,
      options && 'params' in options ? (options as Record<string, TSchema>).params : undefined,
    )
    cb(child)
    this._node.groups.push(child._node)
    return this
  }

  // -- Group-level metadata chaining ----------------------------------------

  /**
   * Add a tag to this group. All routes within the group (and nested groups)
   * inherit this tag.
   *
   * @param name - Tag name.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.group('/pets', g => {
   *   g.tag('pets')           // all routes in this group get the 'pets' tag
   *   g.get('/', { response: Type.Array(Pet) })
   * })
   * ```
   */
  tag(name: string): this {
    this._node.tags.push(name)
    return this
  }

  /**
   * Add security requirements to this group. All routes within the group
   * (and nested groups) inherit these security requirements.
   *
   * @param schemes - One or more security requirements.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.group('/admin', g => {
   *   g.security('bearer')
   *   g.get('/stats', { response: StatsResponse })  // inherits bearer security
   * })
   * ```
   */
  security(...schemes: SecurityRequirement[]): this {
    this._node.security.push(...schemes)
    return this
  }

  /**
   * Set a description for this group (used for documentation purposes).
   *
   * @param text - Group description.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.group('/pets', g => {
   *   g.description('Operations for managing pets')
   *   g.get('/', { response: Type.Array(Pet) })
   * })
   * ```
   */
  description(text: string): this {
    this._node.description = text
    return this
  }

  /**
   * Add a server override for all routes in this group.
   *
   * @param config - Server configuration.
   * @returns `this` for chaining.
   */
  server(config: ServerConfig): this {
    this._node.servers.push(config)
    return this
  }

  // -- Macros ---------------------------------------------------------------

  /**
   * Apply a group-level macro. Macros are reusable configuration functions
   * created with {@link macro.group} that can set tags, security, etc.
   *
   * @param macro - The macro function to apply.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * const adminSection = macro.group(g => g.tag('admin').security({ bearer: ['admin'] }))
   *
   * api.group('/admin', g => {
   *   g.use(adminSection)
   *   g.get('/stats', { response: StatsResponse })
   * })
   * ```
   */
  use(macro: GroupMacro): this {
    macro(this)
    return this
  }
}

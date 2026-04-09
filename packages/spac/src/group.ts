import type { TSchema } from "@sinclair/typebox";
import type {
  GroupConfig,
  GroupCallArgs,
  GroupNode,
  HttpMethod,
  SecurityRequirement,
  ServerConfig,
  GroupMacro,
} from "./types";
import { RouteBuilder } from "./route";
import { captureSource, type SourceEntry } from "./sourcemap";

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
 *   g.get('/').response(Type.Array(Pet)).summary('List pets')
 *   g.post('/').body(CreatePet).response(Pet).summary('Create a pet')
 *   g.get('/:petId')
 *     .params(Type.Object({ petId: Type.String() }))
 *     .response(Pet)
 *     .error(404, ErrorBody)
 *
 *   // Nested group inherits parent tags + security
 *   g.group('/admin', admin => {
 *     admin.tag('admin')
 *     admin.get('/stats').response(StatsResponse)
 *   })
 * })
 * ```
 */
export class GroupBuilder<Prefix extends string = string> {
  /** @internal */
  readonly _node: GroupNode;
  /** @internal */
  private readonly _debug: boolean;

  constructor(prefix: string, params?: TSchema, debug = false) {
    this._debug = debug;
    this._node = {
      prefix,
      params,
      routes: [],
      groups: [],
      tags: [],
      security: [],
      servers: [],
      extensions: {},
    };
    if (debug) {
      this._node._sources = [];
    }
  }

  /** @internal Capture a source entry. `caller` is the method to skip in the stack trace. */
  private _capture(
    kind: SourceEntry["kind"],
    caller: Function,
    detail?: string,
  ): void {
    const source = captureSource(caller);
    if (source) {
      this._node._sources!.push({ source, kind, detail });
    }
  }

  // -- Route helpers --------------------------------------------------------

  private _route(
    method: HttpMethod,
    path: string,
    caller: Function,
  ): RouteBuilder {
    const fullPath =
      path === "/" ? this._node.prefix : this._node.prefix + path;
    const builder = new RouteBuilder(method, path, fullPath, {}, this._debug);
    this._node.routes.push(builder._node);
    if (this._debug) {
      builder._capture("route", caller);
    }
    return builder;
  }

  /**
   * Define a GET route within this group.
   * @param path - Route path relative to the group prefix. Use `'/'` for the prefix itself.
   * @returns A {@link RouteBuilder} for chaining params, query, body, response, etc.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * g.get('/').response(Type.Array(Pet)).summary('List pets')
   * g.get('/:petId')
   *   .params(Type.Object({ petId: Type.String() }))
   *   .response(Pet)
   * ```
   */
  get(path: string): RouteBuilder {
    return this._route("get", path, this.get);
  }

  /**
   * Define a POST route within this group.
   * @param path - Route path relative to the group prefix.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * g.post('/').body(CreatePet).respond(201, created(Pet))
   *   .summary('Create a pet')
   * ```
   */
  post(path: string): RouteBuilder {
    return this._route("post", path, this.post);
  }

  /**
   * Define a PUT route within this group.
   * @param path - Route path relative to the group prefix.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * g.put('/:petId')
   *   .params(Type.Object({ petId: Type.String() }))
   *   .body(UpdatePet)
   *   .response(Pet)
   * ```
   */
  put(path: string): RouteBuilder {
    return this._route("put", path, this.put);
  }

  /**
   * Define a PATCH route within this group.
   * @param path - Route path relative to the group prefix.
   * @returns A {@link RouteBuilder} for chaining metadata.
   */
  patch(path: string): RouteBuilder {
    return this._route("patch", path, this.patch);
  }

  /**
   * Define a DELETE route within this group.
   * @param path - Route path relative to the group prefix.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * g.delete('/:petId')
   *   .params(Type.Object({ petId: Type.String() }))
   *   .respond(204, noContent())
   *   .security('bearer')
   * ```
   */
  delete(path: string): RouteBuilder {
    return this._route("delete", path, this.delete);
  }

  /**
   * Define an OPTIONS route within this group.
   * @param path - Route path relative to the group prefix.
   * @returns A {@link RouteBuilder} for chaining metadata.
   */
  options(path: string): RouteBuilder {
    return this._route("options", path, this.options);
  }

  /**
   * Define a HEAD route within this group.
   * @param path - Route path relative to the group prefix.
   * @returns A {@link RouteBuilder} for chaining metadata.
   */
  head(path: string): RouteBuilder {
    return this._route("head", path, this.head);
  }

  /**
   * Define a TRACE route within this group.
   * @param path - Route path relative to the group prefix.
   * @returns A {@link RouteBuilder} for chaining metadata.
   */
  trace(path: string): RouteBuilder {
    return this._route("trace", path, this.trace);
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
   *   g.get('/inventory').response(InventoryResponse)
   *
   *   g.group('/admin', admin => {
   *     admin.tag('admin')
   *     admin.security({ bearer: ['admin'] })
   *     admin.get('/stats').response(StatsResponse)
   *     // Route path: /store/admin/stats — inherits 'store' + 'admin' tags
   *   })
   * })
   * ```
   */
  group<P extends string>(prefix: P, ...args: GroupCallArgs<Prefix, P>): this {
    let options: GroupConfig<P> | undefined;
    let cb: (group: GroupBuilder<`${Prefix}${P}`>) => void;

    if (typeof args[0] === "function") {
      cb = args[0] as typeof cb;
    } else {
      options = args[0] as GroupConfig<P>;
      cb = args[1] as typeof cb;
    }

    const child = new GroupBuilder<`${Prefix}${P}`>(
      this._node.prefix + prefix,
      options && "params" in options
        ? (options as Record<string, TSchema>).params
        : undefined,
      this._debug,
    );
    if (this._debug) {
      const source = captureSource(this.group);
      if (source) child._node._sources!.push({ source, kind: "group" });
    }
    cb(child);
    this._node.groups.push(child._node);
    return this;
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
   *   g.get('/').response(Type.Array(Pet))
   * })
   * ```
   */
  tag(name: string): this {
    this._node.tags.push(name);
    if (this._debug) this._capture("tag", this.tag, name);
    return this;
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
   *   g.get('/stats').response(StatsResponse)  // inherits bearer security
   * })
   * ```
   */
  security(...schemes: SecurityRequirement[]): this {
    this._node.security.push(...schemes);
    if (this._debug) this._capture("security", this.security);
    return this;
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
   *   g.get('/').response(Type.Array(Pet))
   * })
   * ```
   */
  description(text: string): this {
    this._node.description = text;
    if (this._debug) this._capture("description", this.description);
    return this;
  }

  /**
   * Add a server override for all routes in this group.
   *
   * @param config - Server configuration.
   * @returns `this` for chaining.
   */
  server(config: ServerConfig): this {
    this._node.servers.push(config);
    if (this._debug) this._capture("server", this.server);
    return this;
  }

  // -- Extensions -----------------------------------------------------------

  /**
   * Add an OpenAPI specification extension (`x-` prefixed field) to all path items in this group.
   * The `x-` prefix is added automatically if not present.
   *
   * @param name - Extension name (with or without `x-` prefix).
   * @param value - Extension value (any JSON-serializable value).
   * @returns `this` for chaining.
   */
  extension(name: string, value: unknown): this {
    const key = name.startsWith("x-") ? name : `x-${name}`;
    this._node.extensions[key] = value;
    if (this._debug) this._capture("extension", this.extension, key);
    return this;
  }

  // -- Path item metadata ---------------------------------------------------

  /**
   * Set a summary on the path item for all operations under this group.
   *
   * @param text - Path item summary.
   * @returns `this` for chaining.
   */
  pathSummary(text: string): this {
    this._node.pathSummary = text;
    if (this._debug) this._capture("pathSummary", this.pathSummary);
    return this;
  }

  /**
   * Set a description on the path item for all operations under this group.
   *
   * @param text - Path item description.
   * @returns `this` for chaining.
   */
  pathDescription(text: string): this {
    this._node.pathDescription = text;
    if (this._debug) this._capture("pathDescription", this.pathDescription);
    return this;
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
   *   g.get('/stats').response(StatsResponse)
   * })
   * ```
   */
  use(macro: GroupMacro): this {
    macro(this);
    return this;
  }
}

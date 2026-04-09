import type { TSchema } from "@sinclair/typebox";
import type {
  RouteConfig,
  RouteNode,
  HttpMethod,
  StatusCode,
  ResponseDef,
  ExampleConfig,
  LinkConfig,
  SecurityRequirement,
  ServerConfig,
  RouteMacro,
} from "./types";
import { captureSource, type SourceEntry } from "./sourcemap";
import { GroupBuilder } from "./group";

/**
 * Fluent builder for configuring a single route's metadata after definition.
 * Returned by HTTP method calls on {@link Api} and {@link GroupBuilder}.
 * All methods return `this` for chaining.
 *
 * @example
 * ```ts
 * api.get('/pets').response(Type.Array(Pet))
 *   .summary('List all pets')
 *   .description('Returns a paginated list of pets')
 *   .tag('pets')
 *   .operationId('listPets')
 *
 * api.post('/pets').body(CreatePet).response(Pet)
 *   .summary('Create a pet')
 *   .security('bearer')
 *   .error(401, ErrorBody)
 *   .error(422, ValidationError)
 * ```
 */
export class RouteBuilder {
  /** @internal */
  readonly _node: RouteNode;
  /** @internal */
  private readonly _debug: boolean;

  constructor(
    method: HttpMethod,
    path: string,
    fullPath: string,
    config: RouteConfig,
    debug = false,
  ) {
    this._debug = debug;
    this._node = {
      method,
      path,
      fullPath,
      config,
      tags: [],
      deprecated: false,
      security: [],
      errors: new Map(),
      responses: new Map(),
      links: new Map(),
      servers: [],
      extensions: {},
      callbacks: new Map(),
      examples: new Map(),
    };
    if (debug) {
      this._node._sources = [];
    }
  }

  /** @internal Capture a source entry. `caller` is the method to skip in the stack trace. */
  _capture(kind: SourceEntry["kind"], caller: Function, detail?: string): void {
    const source = captureSource(caller);
    if (source) {
      this._node._sources!.push({ source, kind, detail });
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
   * api.get('/pets').response(Type.Array(Pet)).summary('List all pets')
   * ```
   */
  summary(text: string): this {
    this._node.summary = text;
    if (this._debug) this._capture("summary", this.summary);
    return this;
  }

  /**
   * Set the operation description (longer explanation, may contain Markdown).
   *
   * @param text - A detailed description of the operation.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/pets').response(Type.Array(Pet))
   *   .description('Returns a paginated list of pets with optional filters.')
   * ```
   */
  description(text: string): this {
    this._node.description = text;
    if (this._debug) this._capture("description", this.description);
    return this;
  }

  /**
   * Add a single tag to this operation. Tags group operations in generated documentation.
   *
   * @param name - Tag name. Should match a tag registered via {@link Api.tag}.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/pets').response(Type.Array(Pet)).tag('pets')
   * ```
   */
  tag(name: string): this {
    this._node.tags.push(name);
    if (this._debug) this._capture("tag", this.tag, name);
    return this;
  }

  /**
   * Add multiple tags to this operation at once.
   *
   * @param names - Tag names.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/pets').response(Type.Array(Pet)).tags('pets', 'public')
   * ```
   */
  tags(...names: string[]): this {
    this._node.tags.push(...names);
    if (this._debug) {
      for (const name of names) this._capture("tag", this.tags, name);
    }
    return this;
  }

  /**
   * Set a unique operation ID. Used by code generators and documentation tools.
   *
   * @param id - A unique string identifying this operation across the entire API.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/pets').response(Type.Array(Pet)).operationId('listPets')
   * ```
   */
  operationId(id: string): this {
    this._node.operationId = id;
    if (this._debug) this._capture("operationId", this.operationId);
    return this;
  }

  /**
   * Mark this operation as deprecated.
   *
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/pets/findByTags').response(Type.Array(Pet))
   *   .operationId('findPetsByTags')
   *   .deprecated()
   * ```
   */
  deprecated(): this {
    this._node.deprecated = true;
    if (this._debug) this._capture("deprecated", this.deprecated);
    return this;
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
   * api.get('/pets').response(Type.Array(Pet))
   *   .security('bearer')
   *   .security({ oauth2: ['read:pets'] })
   * ```
   */
  security(...schemes: SecurityRequirement[]): this {
    this._node.security.push(...schemes);
    if (this._debug) this._capture("security", this.security);
    return this;
  }

  // -- Responses / errors ---------------------------------------------------

  /**
   * Add an error response for a specific HTTP status code.
   * Multiple calls with different status codes accumulate error responses.
   *
   * @param status - HTTP status code (e.g., `404`, `500`) or wildcard (`'4XX'`, `'5XX'`).
   * @param schema - TypeBox schema for the error response body.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/pets/:petId')
   *   .params(Type.Object({ petId: Type.String() }))
   *   .response(Pet)
   *   .error(404, ErrorBody)
   *   .error('5XX', ErrorBody)
   * ```
   */
  error(status: StatusCode, schema: TSchema): this {
    this._node.errors.set(status, schema);
    if (this._debug) this._capture("error", this.error, String(status));
    return this;
  }

  // -- Links ----------------------------------------------------------------

  /**
   * Add a hypermedia link to a response. Links describe follow-up operations
   * that can be invoked using values from the response (OpenAPI Link Object).
   *
   * When called with two arguments, the link is attached to the 200 response.
   * When called with three, the first argument specifies the status code.
   *
   * @example
   * ```ts
   * // Attach to 200 (default)
   * api.get('/pets/:petId').response(Pet)
   *   .link('GetOwner', {
   *     operationId: 'getOwner',
   *     parameters: { ownerId: '$response.body#/ownerId' },
   *   })
   *
   * // Attach to a specific status code
   * api.post('/pets').body(CreatePet).respond(201, created(Pet))
   *   .link(201, 'GetPetById', {
   *     operationId: 'getPet',
   *     parameters: { petId: '$response.body#/id' },
   *   })
   * ```
   */
  link(name: string, config: LinkConfig): this;
  link(status: StatusCode, name: string, config: LinkConfig): this;
  link(
    statusOrName: StatusCode | string,
    nameOrConfig: string | LinkConfig,
    maybeConfig?: LinkConfig,
  ): this {
    let status: StatusCode;
    let name: string;
    let config: LinkConfig;
    if (maybeConfig !== undefined) {
      status = statusOrName as StatusCode;
      name = nameOrConfig as string;
      config = maybeConfig;
    } else {
      status = 200;
      name = statusOrName as string;
      config = nameOrConfig as LinkConfig;
    }
    const existing = this._node.links.get(status) || {};
    existing[name] = config;
    this._node.links.set(status, existing);
    if (this._debug) this._capture("link", this.link, name);
    return this;
  }

  // -- Config property chaining (captures per-property source locations) ----

  /**
   * Set the response schema for a specific status code.
   * Each call captures its own source location for precise source mapping.
   *
   * @param status - HTTP status code (e.g., `201`) or wildcard (`'2XX'`, `'default'`).
   * @param schema - TypeBox schema or {@link ResponseDef} for the response body.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * g.post('/login').body(LoginBody)
   *   .respond(200, { description: 'Login successful', schema: LoginResponse })
   *   .respond(401, { description: 'Invalid credentials', schema: Error })
   * ```
   */
  respond(status: StatusCode, schema: TSchema | ResponseDef): this {
    this._node.responses.set(status, schema);
    if (this._debug) this._capture("responses", this.respond, String(status));
    return this;
  }

  /**
   * Set the shorthand 200 response schema.
   * Captures its own source location for precise source mapping.
   *
   * @param schema - TypeBox schema for the 200 response body.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * g.get('/inventory')
   *   .response(InventoryResponse)
   *   .summary('Returns pet inventories by status')
   * ```
   */
  response(schema: TSchema): this {
    this._node.config = { ...this._node.config, response: schema };
    if (this._debug) this._capture("response", this.response);
    return this;
  }

  /**
   * Add a named response example. Attaches to the given status code (defaults to 200).
   * Captures its own source location for precise source mapping.
   *
   * @param name - Example name (key in the OpenAPI `examples` map).
   * @param config - Example configuration with summary, description, and value.
   * @param status - HTTP status code to attach the example to (defaults to 200).
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * g.get('/pets')
   *   .response(Type.Array(Pet))
   *   .example('one-pet', { summary: 'Single pet', value: [{ id: 1, name: 'Fido' }] })
   *   .example('empty', { summary: 'No pets', value: [] })
   * ```
   */
  example(name: string, config: ExampleConfig, status: StatusCode = 200): this {
    const existing = this._node.examples.get(status) ?? {};
    existing[name] = config;
    this._node.examples.set(status, existing);
    if (this._debug)
      this._capture("example", this.example, `${status}.${name}`);
    return this;
  }

  /**
   * Set path parameters schema.
   * Captures its own source location for precise source mapping.
   *
   * @param schema - TypeBox object schema for path parameters.
   * @returns `this` for chaining.
   */
  params(schema: TSchema): this {
    this._node.config = { ...this._node.config, params: schema };
    if (this._debug) this._capture("params", this.params);
    return this;
  }

  /**
   * Set query parameters schema.
   * Captures its own source location for precise source mapping.
   *
   * @param schema - TypeBox object schema for query parameters.
   * @returns `this` for chaining.
   */
  query(schema: TSchema): this {
    this._node.config = { ...this._node.config, query: schema };
    if (this._debug) this._capture("query", this.query);
    return this;
  }

  /**
   * Set request headers schema.
   * Captures its own source location for precise source mapping.
   *
   * @param schema - TypeBox object schema for request headers.
   * @returns `this` for chaining.
   */
  headers(schema: TSchema): this {
    this._node.config = {
      ...this._node.config,
      headers: schema,
    } as RouteConfig;
    if (this._debug) this._capture("headers", this.headers);
    return this;
  }

  /**
   * Set request body schema.
   * Captures its own source location for precise source mapping.
   *
   * @param schema - TypeBox schema for the JSON request body.
   * @returns `this` for chaining.
   */
  body(schema: TSchema): this {
    this._node.config = { ...this._node.config, body: schema } as RouteConfig;
    if (this._debug) this._capture("body", this.body);
    return this;
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
   * api.get('/health').response(HealthStatus)
   *   .server({ url: 'http://localhost:3000', description: 'Health check only on local' })
   * ```
   */
  server(config: ServerConfig): this {
    this._node.servers.push(config);
    if (this._debug) this._capture("server", this.server);
    return this;
  }

  // -- External Docs -------------------------------------------------------

  /**
   * Set external documentation for this operation.
   *
   * @param config - External documentation URL and optional description.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.get('/pets').response(Type.Array(Pet))
   *   .externalDocs({ url: 'https://example.com/docs/list-pets' })
   * ```
   */
  externalDocs(config: { url: string; description?: string }): this {
    this._node.externalDocs = config;
    if (this._debug) this._capture("externalDocs", this.externalDocs);
    return this;
  }

  // -- Request body enrichment ----------------------------------------------

  /**
   * Set the request body description.
   *
   * @param text - Description for the request body.
   * @returns `this` for chaining.
   */
  bodyDescription(text: string): this {
    this._node.config = {
      ...this._node.config,
      bodyDescription: text,
    } as RouteConfig;
    if (this._debug) this._capture("bodyDescription", this.bodyDescription);
    return this;
  }

  /**
   * Mark the request body as required (defaults to `true` when called without argument).
   *
   * @param required - Whether the body is required. Defaults to `true`.
   * @returns `this` for chaining.
   */
  bodyRequired(required = true): this {
    this._node.config = {
      ...this._node.config,
      bodyRequired: required,
    } as RouteConfig;
    if (this._debug) this._capture("bodyRequired", this.bodyRequired);
    return this;
  }

  /**
   * Set cookie parameters schema.
   *
   * @param schema - TypeBox object schema for cookie parameters.
   * @returns `this` for chaining.
   */
  cookies(schema: TSchema): this {
    this._node.config = {
      ...this._node.config,
      cookies: schema,
    } as RouteConfig;
    if (this._debug) this._capture("cookies", this.cookies);
    return this;
  }

  // -- Callbacks ------------------------------------------------------------

  /**
   * Register a callback on this operation. The callback describes an out-of-band
   * request that may be triggered by this operation.
   *
   * @param name - Callback name.
   * @param expression - Runtime expression for the callback URL.
   * @param cb - Builder function to define the callback's path item.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.post('/pets').body(CreatePet).response(Pet)
   *   .callback('onStatusChange', '{$request.body#/callbackUrl}', g => {
   *     g.post('/').body(Type.Object({ status: Type.String() }))
   *   })
   * ```
   */
  callback(
    name: string,
    expression: string,
    cb: (g: GroupBuilder) => void,
  ): this {
    const builder = new GroupBuilder(expression, undefined, this._debug);
    cb(builder);
    this._node.callbacks.set(name, {
      expression,
      routes: builder._node.routes,
    });
    if (this._debug) this._capture("callback", this.callback, name);
    return this;
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
   * api.get('/pets').response(Type.Array(Pet))
   *   .extension('rate-limit', 100)     // emits as 'x-rate-limit'
   *   .extension('x-internal', true)    // kept as 'x-internal'
   * ```
   */
  extension(name: string, value: unknown): this {
    const key = name.startsWith("x-") ? name : `x-${name}`;
    this._node.extensions[key] = value;
    if (this._debug) this._capture("extension", this.extension, key);
    return this;
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
   * api.post('/pets').body(CreatePet).response(Pet)
   *   .use(authed)
   *   .use(validated)
   * ```
   */
  use(macro: RouteMacro): this {
    if (this._debug) {
      const useSite = captureSource(this.use);
      const before = this._node._sources!.length;
      macro(this);
      if (useSite) {
        for (let i = before; i < this._node._sources!.length; i++) {
          this._node._sources![i].source = useSite;
        }
      }
    } else {
      macro(this);
    }
    return this;
  }
}

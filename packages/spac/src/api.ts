import type { TSchema } from "@sinclair/typebox";
import type {
  ApiConfig,
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
  SpecVersion,
  VersionCapabilities,
  VersionPolicy,
  VersionDeclaration,
  VersionAudit,
} from "./types";
import { versionCapabilities, parseVersion, compareVersions } from "./types";
import { RouteBuilder } from "./route";
import { GroupBuilder } from "./group";
import { emitOpenApi, type EmitOptions, type EmitResult } from "./emit";
import { captureSource, type SourceEntry } from "./sourcemap";

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
 * const api = new Api('3.1', 'Petstore', {
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
 *   g.get('/').response(Type.Array(Pet)).summary('List all pets')
 *   g.post('/').body(Pet).response(Pet).summary('Create a pet').security('bearer')
 *   g.delete('/:petId')
 *     .params(Type.Object({ petId: Type.String() }))
 *     .respond(204, noContent())
 *     .security('bearer')
 * })
 *
 * const spec = api.emit() // => OpenAPI 3.1 JSON
 * ```
 */
export class Api<V extends SpecVersion = SpecVersion> {
  /** The OpenAPI specification version (e.g. `'3.1'`). */
  readonly specVersion: V;
  /** Capabilities for the targeted spec version. */
  readonly capabilities: VersionCapabilities;
  /** The API title, used as `info.title` in the emitted OpenAPI document. */
  readonly name: string;
  /** Configuration options passed to the constructor. */
  readonly config: ApiConfig;

  /** @internal */ readonly _groups: GroupNode[] = [];
  /** @internal */ readonly _routes: RouteNode[] = [];
  /** @internal */ readonly _servers: ServerConfig[] = [];
  /** @internal */ readonly _securitySchemes: Record<
    string,
    SecuritySchemeConfig
  > = {};
  /** @internal */ readonly _tags: TagConfig[] = [];
  /** @internal */ readonly _schemas: Map<string, TSchema> = new Map();
  /** @internal */ readonly _security: SecurityRequirement[] = [];
  /** @internal */ readonly _debug: boolean = false;
  /** @internal */ readonly _sources: SourceEntry[] = [];
  /** @internal */ _externalDocs?: { url: string; description?: string };
  /** @internal */ readonly _extensions: Record<string, unknown> = {};
  /** @internal */ readonly _webhooks: Map<string, GroupNode> = new Map();
  /** @internal */ readonly _components: Map<string, Map<string, unknown>> =
    new Map();
  /** @internal */ readonly _versionDeclarations: VersionDeclaration[] = [];
  /** @internal */ readonly _versionPolicy!: VersionPolicy;

  /**
   * Create a new API definition.
   *
   * @param specVersion - The OpenAPI specification version to target (currently only `'3.1'`).
   * @param name - The API title (becomes `info.title` in the OpenAPI document).
   * @param config - Optional API metadata (version, description, contact, license, etc.).
   *
   * @example
   * ```ts
   * const api = new Api('3.1', 'My API')
   * const api = new Api('3.1', 'My API', { version: '2.0.0', description: 'My API description' })
   * ```
   */
  constructor(specVersion: V, name: string, config: ApiConfig = {}) {
    if (!(specVersion in versionCapabilities)) {
      throw new Error(
        `Unsupported OpenAPI spec version: '${specVersion}'. Supported versions: ${Object.keys(versionCapabilities).join(", ")}`,
      );
    }
    this.specVersion = specVersion;
    this.capabilities = versionCapabilities[specVersion];
    this.name = name;
    this.config = { version: "1.0.0", ...config };
    this._debug = config.debug ?? false;
    this._versionPolicy = config.versionPolicy ?? "warn";
    if (this._debug) this._capture("api", this.constructor);
  }

  /** @internal Capture a source entry. `caller` is the method to skip in the stack trace. */
  private _capture(
    kind: SourceEntry["kind"],
    caller: Function,
    detail?: string,
  ): void {
    const source = captureSource(caller);
    if (source) {
      this._sources.push({ source, kind, detail });
    }
  }

  // -- Top-level route helpers ----------------------------------------------

  private _route(
    method: HttpMethod,
    path: string,
    caller: Function,
  ): RouteBuilder {
    const builder = new RouteBuilder(method, path, path, {}, this._debug);
    this._routes.push(builder._node);
    if (this._debug) {
      builder._capture("route", caller);
    }
    return builder;
  }

  /**
   * Define a top-level GET route.
   * @param path - URL path (e.g., `'/pets'` or `'/pets/:petId'`).
   * @param config - Route configuration with params, query, body, response, etc.
   * @returns A {@link RouteBuilder} for chaining metadata (summary, tags, security, etc.).
   *
   * @example
   * ```ts
   * api.get('/pets')
   *   .response(Type.Array(Pet))
   *   .summary('List all pets')
   *   .tag('pets')
   *
   * api.get('/pets/:petId')
   *   .params(Type.Object({ petId: Type.String() }))
   *   .response(Pet)
   *   .error(404, ErrorBody)
   * ```
   */
  get<P extends string>(path: P): RouteBuilder {
    return this._route("get", path, this.get);
  }

  /**
   * Define a top-level POST route.
   * @param path - URL path.
   * @param config - Route configuration.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * api.post('/pets')
   *   .body(CreatePet)
   *   .response(Pet)
   *   .summary('Create a pet')
   *   .security('bearer')
   * ```
   */
  post<P extends string>(path: P): RouteBuilder {
    return this._route("post", path, this.post);
  }

  /**
   * Define a top-level PUT route.
   * @param path - URL path.
   * @param config - Route configuration.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * api.put('/pets/:petId')
   *   .params(Type.Object({ petId: Type.String() }))
   *   .body(UpdatePet)
   *   .response(Pet)
   * ```
   */
  put<P extends string>(path: P): RouteBuilder {
    return this._route("put", path, this.put);
  }

  /**
   * Define a top-level PATCH route.
   * @param path - URL path.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * api.patch('/pets/:petId')
   *   .params(Type.Object({ petId: Type.String() }))
   *   .body(UpdatePet)
   *   .response(Pet)
   * ```
   */
  patch<P extends string>(path: P): RouteBuilder {
    return this._route("patch", path, this.patch);
  }

  /**
   * Define a top-level DELETE route.
   * @param path - URL path.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * api.delete('/pets/:petId')
   *   .params(Type.Object({ petId: Type.String() }))
   *   .respond(204, noContent())
   *   .security('bearer')
   * ```
   */
  delete<P extends string>(path: P): RouteBuilder {
    return this._route("delete", path, this.delete);
  }

  /**
   * Define a top-level OPTIONS route.
   * @param path - URL path.
   * @returns A {@link RouteBuilder} for chaining metadata.
   *
   * @example
   * ```ts
   * api.options('/pets').respond(204, noContent('CORS preflight'))
   * ```
   */
  options<P extends string>(path: P): RouteBuilder {
    return this._route("options", path, this.options);
  }

  /**
   * Define a top-level HEAD route.
   * @param path - URL path.
   * @returns A {@link RouteBuilder} for chaining metadata.
   */
  head<P extends string>(path: P): RouteBuilder {
    return this._route("head", path, this.head);
  }

  /**
   * Define a top-level TRACE route.
   * @param path - URL path.
   * @returns A {@link RouteBuilder} for chaining metadata.
   */
  trace<P extends string>(path: P): RouteBuilder {
    return this._route("trace", path, this.trace);
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
   *   g.get('/').response(Type.Array(Pet))
   *   g.get('/:petId').params(Type.Object({ petId: Type.String() })).response(Pet)
   * })
   *
   * // Nested groups
   * api.group('/store', g => {
   *   g.tag('store')
   *   g.get('/inventory').response(InventoryResponse)
   *   g.group('/admin', admin => {
   *     admin.security('bearer')
   *     admin.get('/stats').response(StatsResponse)
   *   })
   * })
   * ```
   */
  group<P extends string>(prefix: P, ...args: GroupCallArgs<"", P>): this {
    let options: GroupConfig<P> | undefined;
    let cb: (group: GroupBuilder<P>) => void;

    if (typeof args[0] === "function") {
      cb = args[0] as typeof cb;
    } else {
      options = args[0] as GroupConfig<P>;
      cb = args[1] as typeof cb;
    }

    const group = new GroupBuilder<P>(
      prefix,
      options && "params" in options
        ? (options as Record<string, TSchema>).params
        : undefined,
      this._debug,
    );
    if (this._debug) {
      const source = captureSource(this.group);
      if (source) group._node._sources!.push({ source, kind: "group" });
    }
    cb(group);
    this._groups.push(group._node);
    return this;
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
    this._servers.push(config);
    if (this._debug) this._capture("server", this.server);
    return this;
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
    this._securitySchemes[name] = config;
    if (this._debug) this._capture("securityScheme", this.securityScheme, name);
    return this;
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
    const name = typeof config === "string" ? config : config.name;
    if (typeof config === "string") {
      this._tags.push({ name: config });
    } else {
      this._tags.push(config);
    }
    if (this._debug) this._capture("tag", this.tag, name);
    return this;
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
    this._schemas.set(name, schema);
    if (this._debug) this._capture("schema", this.schema, name);
    return this;
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
    this._security.push(...schemes);
    if (this._debug) this._capture("security", this.security);
    return this;
  }

  /**
   * Set external documentation for the entire API.
   *
   * @param config - External documentation URL and optional description.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.externalDocs({ url: 'https://petstore.example.com/docs', description: 'Full API documentation' })
   * ```
   */
  externalDocs(config: { url: string; description?: string }): this {
    this._externalDocs = config;
    if (this._debug) this._capture("externalDocs", this.externalDocs);
    return this;
  }

  /**
   * Add an OpenAPI specification extension (`x-` prefixed field) to the root document.
   * The `x-` prefix is added automatically if not present.
   *
   * @param name - Extension name (with or without `x-` prefix).
   * @param value - Extension value (any JSON-serializable value).
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.extension('x-api-id', 'petstore-v1')
   * ```
   */
  extension(name: string, value: unknown): this {
    const key = name.startsWith("x-") ? name : `x-${name}`;
    this._extensions[key] = value;
    if (this._debug) this._capture("extension", this.extension, key);
    return this;
  }

  /**
   * Register a webhook. Webhooks are top-level path items in the OpenAPI 3.1 spec
   * that describe callbacks initiated by the API provider.
   *
   * @param name - Webhook name.
   * @param cb - Builder function to define the webhook's operations.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.webhook('newPetNotification', g => {
   *   g.post('/').body(PetEvent).response(Type.Object({ received: Type.Boolean() }))
   * })
   * ```
   */
  webhook(name: string, cb: (g: GroupBuilder) => void): this {
    const builder = new GroupBuilder(name, undefined, this._debug);
    cb(builder);
    this._webhooks.set(name, builder._node);
    if (this._debug) this._capture("webhook", this.webhook, name);
    return this;
  }

  /**
   * Register a reusable component in `components.*`.
   *
   * @param type - Component type (e.g., `'responses'`, `'parameters'`, `'headers'`, `'examples'`, `'links'`, `'callbacks'`, `'pathItems'`).
   * @param name - Component name.
   * @param config - Component definition.
   * @returns `this` for chaining.
   *
   * @example
   * ```ts
   * api.component('responses', 'NotFound', { description: 'Resource not found' })
   * api.component('examples', 'PetExample', { summary: 'A pet', value: { id: 1, name: 'Fido' } })
   * ```
   */
  component(type: string, name: string, config: unknown): this {
    if (!this._components.has(type)) {
      this._components.set(type, new Map());
    }
    this._components.get(type)!.set(name, config);
    if (this._debug)
      this._capture("component", this.component, `${type}.${name}`);
    return this;
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
  use(macro: ApiMacro<V>): this {
    macro(this);
    return this;
  }

  // -- Version Policy --------------------------------------------------------

  /**
   * Declare the OpenAPI version a team module was written for.
   * The declared version is checked against this Api's target version
   * according to the active {@link VersionPolicy}.
   *
   * **Major version mismatch** (e.g. `2.0` vs `3.1`): always throws.
   *
   * **Minor version mismatch** — the risk is asymmetric:
   * - **Team lower** (e.g. team at `3.1`, central at `3.2`): generally safe —
   *   the team uses a subset of features and the output is the higher version.
   *   Treated the same as a patch mismatch (policy-dependent).
   * - **Team higher** (e.g. team at `3.2`, central at `3.1`): dangerous —
   *   the team may use features the output format doesn't support. Always throws.
   *
   * **Patch mismatch** (e.g. `3.1.0` vs `3.1.2`):
   * - `'strict'` mode: throws an error.
   * - `'warn'` mode: logs a `console.warn` and records the mismatch.
   * - `'lenient'` mode: silently records the declaration.
   *
   * Call this at the top of each team registration function to declare
   * what version the module's routes were authored against.
   *
   * @param version - The full OpenAPI version string (e.g. `'3.1.0'`, `'3.1.2'`).
   *                  Also accepts major.minor shorthand (`'3.1'`), which is treated as `'3.1.0'`.
   * @param label - Optional label identifying the module (e.g. `'calls'`, `'accounts'`).
   *                Used in warning/error messages and in the {@link VersionAudit}.
   * @returns `this` for chaining.
   * @throws If the version string is invalid, or if the policy demands an error.
   *
   * @example
   * ```ts
   * // In a team module
   * export function registerCalls(api: Api<'3.1'>) {
   *   api.assertVersion('3.1.0', 'calls')
   *   api.group('/calls', g => { ... })
   * }
   *
   * // In the root composition
   * const api = new Api('3.1', 'My API', { versionPolicy: 'strict' })
   * registerCalls(api) // throws if calls targets a different patch
   * ```
   */
  assertVersion(version: string, label?: string): this {
    const declared = parseVersion(version);
    if (!declared) {
      throw new Error(`Invalid version string: '${version}'`);
    }
    const target = parseVersion(this.capabilities.fullVersion)!;

    this._versionDeclarations.push({ version, label });

    const cmp = compareVersions(declared, target);
    const moduleId = label ? `Module "${label}"` : `A module`;

    // Major mismatch — always incompatible
    if (cmp === "major-mismatch") {
      throw new Error(
        `${moduleId} targets OpenAPI ${declared.major}.x but this project targets ${target.major}.x. ` +
          `Major version mismatches are incompatible — the module must be upgraded before composition.`,
      );
    }

    // Minor-higher — team targets a newer minor than central. Dangerous because
    // the team may rely on features the output format doesn't support. Always throws.
    if (cmp === "minor-higher") {
      throw new Error(
        `${moduleId} targets OpenAPI ${declared.major}.${declared.minor} but this project targets ${target.major}.${target.minor}. ` +
          `The module targets a higher minor version — it may use features the output format doesn't support. ` +
          `Upgrade the central project or downgrade the module.`,
      );
    }

    // Minor-lower — team targets an older minor than central. Generally safe
    // because the team uses a subset of features and the output is the higher
    // version (a superset). Handled the same as patch mismatches: policy-dependent.
    if (cmp === "minor-lower") {
      const msg =
        `${moduleId} targets OpenAPI ${declared.major}.${declared.minor} but this project emits ${target.major}.${target.minor}. ` +
        `The module targets an older minor version — this is generally safe but the module may not leverage newer features.`;

      if (this._versionPolicy === "strict") {
        throw new Error(
          `${msg} Version policy is 'strict' — all modules must target the exact same version.`,
        );
      }
      if (this._versionPolicy === "warn") {
        console.warn(`[spac] ${msg}`);
      }
      return this;
    }

    // Patch mismatch — policy-dependent
    if (cmp !== "match") {
      const direction = cmp === "patch-higher" ? "higher" : "lower";
      const msg =
        `${moduleId} targets OpenAPI ${declared.raw} but this project emits ${target.raw} ` +
        `(declared patch is ${direction} than target).`;

      if (this._versionPolicy === "strict") {
        throw new Error(
          `${msg} Version policy is 'strict' — all modules must target the exact same version.`,
        );
      }
      if (this._versionPolicy === "warn") {
        console.warn(`[spac] ${msg}`);
      }
    }

    return this;
  }

  /**
   * Audit all version declarations collected from team modules.
   * Returns a {@link VersionAudit} describing the overall compatibility
   * of the composition.
   *
   * This is useful for CI pipelines or pre-merge checks to determine
   * whether all teams have converged on the same OpenAPI version.
   *
   * @returns A {@link VersionAudit} object.
   *
   * @example
   * ```ts
   * const api = new Api('3.1', 'My API')
   * registerCalls(api)
   * registerAccounts(api)
   *
   * const audit = api.versionAudit()
   * if (!audit.compatible) {
   *   console.error('Version mismatches:', audit.errors)
   *   process.exit(1)
   * }
   * if (audit.warnings.length) {
   *   console.warn('Version warnings:', audit.warnings)
   * }
   * ```
   */
  versionAudit(): VersionAudit {
    const target = parseVersion(this.capabilities.fullVersion)!;
    const warnings: string[] = [];
    const errors: string[] = [];

    for (const decl of this._versionDeclarations) {
      const declared = parseVersion(decl.version);
      if (!declared) {
        errors.push(
          `Invalid version "${decl.version}" declared by ${decl.label || "unknown module"}`,
        );
        continue;
      }
      const cmp = compareVersions(declared, target);
      const moduleId = decl.label ? `Module "${decl.label}"` : "A module";

      if (cmp === "match") continue;

      // Hard errors — always incompatible regardless of policy
      if (cmp === "major-mismatch") {
        errors.push(
          `${moduleId} targets OpenAPI ${declared.major}.x but this project targets ${target.major}.x.`,
        );
        continue;
      }
      if (cmp === "minor-higher") {
        errors.push(
          `${moduleId} targets OpenAPI ${declared.major}.${declared.minor} but this project targets ${target.major}.${target.minor} (module is ahead).`,
        );
        continue;
      }

      // minor-lower: team uses a subset — safe, but policy-dependent
      if (cmp === "minor-lower") {
        const msg = `${moduleId} targets OpenAPI ${declared.major}.${declared.minor} but this project emits ${target.major}.${target.minor} (module is behind, generally safe).`;
        if (this._versionPolicy === "strict") {
          errors.push(msg);
        } else if (this._versionPolicy === "warn") {
          warnings.push(msg);
        }
        continue;
      }

      // patch-higher / patch-lower — policy-dependent
      const direction = cmp === "patch-higher" ? "higher" : "lower";
      const msg = `${moduleId} targets OpenAPI ${declared.raw} but this project emits ${target.raw} (patch is ${direction}).`;
      if (this._versionPolicy === "strict") {
        errors.push(msg);
      } else if (this._versionPolicy === "warn") {
        warnings.push(msg);
      }
    }

    return {
      target: this.capabilities.fullVersion,
      policy: this._versionPolicy,
      declarations: [...this._versionDeclarations],
      compatible: errors.length === 0,
      warnings,
      errors,
    };
  }

  // -- Emission -------------------------------------------------------------

  /**
   * Emit a valid OpenAPI 3.1 document as a JSON-serializable object.
   * Walks the internal AST, resolves schemas (hoisting named schemas to
   * `components.schemas` as `$ref`), and assembles the full document.
   *
   * @returns The OpenAPI 3.1 specification as a plain object.
   *
   * @example
   * ```ts
   * const spec = api.emit()
   * console.log(JSON.stringify(spec, null, 2))
   *
   * // spec.openapi === '3.1.0'
   * // spec.info.title === api.name
   * // spec.paths['/pets'].get.responses['200'] ...
   * ```
   */
  emit(): Record<string, unknown>;
  emit(options: EmitOptions): EmitResult;
  emit(options?: EmitOptions): Record<string, unknown> | EmitResult {
    if (options) return emitOpenApi(this, options);
    return emitOpenApi(this);
  }
}

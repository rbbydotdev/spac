import { Kind, type TSchema } from "@sinclair/typebox";
import { stringify as yamlStringify } from "yaml";
import type { Api } from "./api";
import type {
  RouteNode,
  GroupNode,
  SecurityRequirement,
  ResponseDef,
  LinkConfig,
  HeaderConfig,
  ExampleConfig,
  VersionAudit,
} from "./types";
import { versionCapabilities } from "./types";
import { getSchemaName, getSchemaSource } from "./schema";
import {
  type SourceTable,
  type SourceEntry,
  type SourceEntryKind,
  findSource,
  extractYamlPositions,
  generateSourceMap,
} from "./sourcemap";

// ---------------------------------------------------------------------------
// Schema Helpers
// ---------------------------------------------------------------------------

/** Strip TypeBox internal symbols and return a plain JSON-Schema object. */
function toJsonSchema(schema: TSchema): Record<string, unknown> {
  return JSON.parse(JSON.stringify(schema));
}

/** Check whether an object is a TypeBox schema (has the Kind symbol). */
function isTSchema(obj: unknown): obj is TSchema {
  return typeof obj === "object" && obj !== null && Kind in obj;
}

/** Check whether a header value is an enriched HeaderConfig vs a plain TSchema. */
function isHeaderConfig(obj: unknown): obj is HeaderConfig {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "schema" in obj &&
    !isTSchema(obj)
  );
}

// ---------------------------------------------------------------------------
// Link Helpers
// ---------------------------------------------------------------------------

/** Convert a LinkConfig to its OpenAPI Link Object representation. */
function emitLink(link: LinkConfig): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (link.operationId !== undefined) out.operationId = link.operationId;
  if (link.operationRef !== undefined) out.operationRef = link.operationRef;
  if (link.parameters !== undefined) out.parameters = link.parameters;
  if (link.requestBody !== undefined) out.requestBody = link.requestBody;
  if (link.description !== undefined) out.description = link.description;
  if (link.server !== undefined) out.server = link.server;
  return out;
}

/** Convert a Record<string, LinkConfig> to the emitted links object. */
function emitLinks(links: Record<string, LinkConfig>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [name, link] of Object.entries(links)) {
    out[name] = emitLink(link);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Header Helpers
// ---------------------------------------------------------------------------

/** Emit a single header — handles both plain TSchema and enriched HeaderConfig. */
function emitHeader(
  value: TSchema | HeaderConfig,
  toSchema: (s: TSchema) => Record<string, unknown>,
): Record<string, unknown> {
  if (isHeaderConfig(value)) {
    const out: Record<string, unknown> = { schema: toSchema(value.schema) };
    if (value.description !== undefined) out.description = value.description;
    if (value.required !== undefined) out.required = value.required;
    if (value.deprecated !== undefined) out.deprecated = value.deprecated;
    return out;
  }
  return { schema: toSchema(value) };
}

/** Emit a headers map from a ResponseDef. */
function emitHeaders(
  headers: Record<string, TSchema | HeaderConfig>,
  toSchema: (s: TSchema) => Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(headers)) {
    out[name] = emitHeader(value, toSchema);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Example Helpers
// ---------------------------------------------------------------------------

/** Emit an ExampleConfig to the OpenAPI Example Object format. */
function emitExample(ex: ExampleConfig): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (ex.summary !== undefined) out.summary = ex.summary;
  if (ex.description !== undefined) out.description = ex.description;
  if (ex.value !== undefined) out.value = ex.value;
  if (ex.externalValue !== undefined) out.externalValue = ex.externalValue;
  return out;
}

// ---------------------------------------------------------------------------
// Response Emit Helper
// ---------------------------------------------------------------------------

/** Emit a ResponseDef to an OpenAPI Response Object. */
function emitResponseDef(
  rd: ResponseDef,
  resolveSchema: (s: TSchema) => Record<string, unknown>,
  toSchema: (s: TSchema) => Record<string, unknown>,
): Record<string, unknown> {
  const resp: Record<string, unknown> = { description: rd.description || "" };
  if (rd.schema) {
    const mediaType: Record<string, unknown> = {
      schema: resolveSchema(rd.schema),
    };
    if (rd.example !== undefined) mediaType.example = rd.example;
    if (rd.examples) {
      const exs: Record<string, unknown> = {};
      for (const [name, ex] of Object.entries(rd.examples)) {
        exs[name] = emitExample(ex);
      }
      mediaType.examples = exs;
    }
    resp.content = {
      [rd.contentType || "application/json"]: mediaType,
    };
  }
  if (rd.headers) {
    resp.headers = emitHeaders(rd.headers, toSchema);
  }
  if (rd.links) {
    resp.links = emitLinks(rd.links);
  }
  return resp;
}

// ---------------------------------------------------------------------------
// Emit Options / Result
// ---------------------------------------------------------------------------

export interface EmitOptions {
  /** Serialize the spec to YAML and return the string. */
  yaml?: boolean;
  /** Build and return the source table (JSON-path → SourceEntry). Requires debug mode on the Api. */
  sourceTable?: boolean;
  /** Generate a Source Map V3 mapping YAML lines to source locations. Implies yaml + sourceTable. */
  sourceMap?: boolean;
  /** File name for the generated YAML (used in the source map). Defaults to `'openapi.yaml'`. */
  generatedFile?: string;
  /**
   * Include a {@link VersionAudit} in the emit result.
   * When `true`, collects all version declarations from team modules and evaluates
   * them against the active {@link VersionPolicy}. Useful for CI checks.
   *
   * @example
   * ```ts
   * const result = api.emit({ audit: true })
   * if (!result.versionAudit?.compatible) {
   *   console.error('Incompatible versions:', result.versionAudit.errors)
   * }
   * ```
   */
  audit?: boolean;
}

export interface EmitResult {
  /** The OpenAPI spec as a plain JSON object (always present). */
  doc: Record<string, unknown>;
  /** YAML string. Present when `yaml` or `sourceMap` is true. */
  yaml?: string;
  /** JSON-path → SourceEntry mapping. Present when `sourceTable` or `sourceMap` is true. */
  sourceTable?: SourceTable;
  /** Source Map V3 JSON string. Present when `sourceMap` is true. */
  sourceMap?: string;
  /** Version audit result. Present when `audit: true` is set in {@link EmitOptions}. */
  versionAudit?: VersionAudit;
}

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------

/**
 * Walk the {@link Api} AST and produce a valid OpenAPI 3.1 document.
 *
 * When called without options, returns the spec object directly (backward-compatible).
 * When called with options, returns an {@link EmitResult} with optional YAML, source table,
 * and Source Map V3.
 */
export function emitOpenApi(api: Api): Record<string, unknown>;
export function emitOpenApi(api: Api, options: EmitOptions): EmitResult;
export function emitOpenApi(
  api: Api,
  options?: EmitOptions,
): Record<string, unknown> | EmitResult {
  const wantSourceTable = options?.sourceTable || options?.sourceMap;
  const wantYaml = options?.yaml || options?.sourceMap;
  const wantSourceMap = options?.sourceMap;
  const debug = api._debug;

  const namedSchemas = new Map<string, TSchema>();
  const components: Record<string, unknown> = {};
  const paths: Record<string, Record<string, unknown>> = {};

  // Source table: populated during the walk when debug mode is on
  const st: SourceTable | undefined =
    debug && wantSourceTable ? new Map() : undefined;

  /** Record a source mapping if we have a matching SourceEntry. */
  function record(
    jsonPath: string,
    sources: SourceEntry[] | undefined,
    kind: SourceEntryKind,
    detail?: string,
  ) {
    if (!st) return;
    const entry = findSource(sources, kind, detail);
    if (entry) st.set(jsonPath, entry);
  }

  // ------------------------------------------------------------------
  // Schema resolution (unchanged logic, just extracted for clarity)
  // ------------------------------------------------------------------

  function resolveSchemaBody(schema: TSchema): Record<string, unknown> {
    const out = toJsonSchema(schema);

    if (schema.items && isTSchema(schema.items)) {
      out.items = resolveSchema(schema.items);
    }

    if (schema.properties && typeof schema.properties === "object") {
      const resolved: Record<string, unknown> = {};
      for (const [key, val] of Object.entries(schema.properties)) {
        resolved[key] = isTSchema(val) ? resolveSchema(val as TSchema) : val;
      }
      out.properties = resolved;
    }

    if (schema.additionalProperties && isTSchema(schema.additionalProperties)) {
      out.additionalProperties = resolveSchema(schema.additionalProperties);
    }

    for (const keyword of ["allOf", "oneOf", "anyOf"] as const) {
      if (Array.isArray(schema[keyword])) {
        out[keyword] = (schema[keyword] as TSchema[]).map((s) =>
          isTSchema(s) ? resolveSchema(s) : s,
        );
      }
    }

    if (schema.not && isTSchema(schema.not)) {
      out.not = resolveSchema(schema.not);
    }

    return out;
  }

  function resolveSchema(schema: TSchema): Record<string, unknown> {
    const name = getSchemaName(schema);
    if (name) {
      namedSchemas.set(name, schema);
      return { $ref: `#/components/schemas/${name}` };
    }
    return resolveSchemaBody(schema);
  }

  // Seed named schemas from explicit api.schema() registrations
  for (const [name, schema] of api._schemas) {
    namedSchemas.set(name, schema);
  }

  // ------------------------------------------------------------------
  // Flatten all routes (with inherited group metadata)
  // ------------------------------------------------------------------

  interface FlatRoute {
    route: RouteNode;
    inheritedTags: string[];
    inheritedSecurity: SecurityRequirement[];
    inheritedParams: TSchema[];
    groupExtensions: Record<string, unknown>;
    groupPathSummary?: string;
    groupPathDescription?: string;
  }

  const flatRoutes: FlatRoute[] = [];

  function walkGroup(
    group: GroupNode,
    parentTags: string[],
    parentSecurity: SecurityRequirement[],
    parentParams: TSchema[],
    parentExtensions: Record<string, unknown>,
    parentPrefix: string,
  ) {
    const fullPrefix = parentPrefix + group.prefix;
    const groupTags = [...parentTags, ...group.tags];
    const groupSecurity = [...parentSecurity, ...group.security];
    const groupParams = group.params
      ? [...parentParams, group.params]
      : parentParams;
    const groupExtensions = { ...parentExtensions, ...group.extensions };

    // Record group source in the source table so the viewer can map group definitions
    record(`group.${fullPrefix}`, group._sources, "group");

    for (const route of group.routes) {
      flatRoutes.push({
        route,
        inheritedTags: groupTags,
        inheritedSecurity: groupSecurity,
        inheritedParams: groupParams,
        groupExtensions,
        groupPathSummary: group.pathSummary,
        groupPathDescription: group.pathDescription,
      });
    }
    for (const child of group.groups) {
      walkGroup(
        child,
        groupTags,
        groupSecurity,
        groupParams,
        groupExtensions,
        fullPrefix,
      );
    }
  }

  for (const route of api._routes) {
    flatRoutes.push({
      route,
      inheritedTags: [],
      inheritedSecurity: [],
      inheritedParams: [],
      groupExtensions: {},
    });
  }
  for (const group of api._groups) {
    walkGroup(group, [], [], [], {}, "");
  }

  // ------------------------------------------------------------------
  // Build paths
  // ------------------------------------------------------------------

  for (const {
    route,
    inheritedTags,
    inheritedSecurity,
    inheritedParams,
    groupExtensions,
    groupPathSummary,
    groupPathDescription,
  } of flatRoutes) {
    const pathKey = route.fullPath;
    const firstForPath = !paths[pathKey];
    if (firstForPath) paths[pathKey] = {};

    const operation: Record<string, unknown> = {};
    const opPath = `paths.${pathKey}.${route.method}`;

    // Record the path key itself (first operation wins)
    if (firstForPath) {
      record(`paths.${pathKey}`, route._sources, "route");
    }

    // Group extensions spread on path item (always merge, not just first)
    if (Object.keys(groupExtensions).length) {
      for (const [key, value] of Object.entries(groupExtensions)) {
        if (!(key in paths[pathKey])) {
          paths[pathKey][key] = value;
        }
      }
    }

    // Path item summary/description from group (first group wins)
    if (groupPathSummary && !paths[pathKey].summary) {
      paths[pathKey].summary = groupPathSummary;
    }
    if (groupPathDescription && !paths[pathKey].description) {
      paths[pathKey].description = groupPathDescription;
    }

    // Record the route itself
    record(opPath, route._sources, "route");

    // Tags
    const allTags = [...new Set([...inheritedTags, ...route.tags])];
    if (allTags.length) {
      operation.tags = allTags;
      record(`${opPath}.tags`, route._sources, "tag");
    }

    // Metadata
    if (route.summary) {
      operation.summary = route.summary;
      record(`${opPath}.summary`, route._sources, "summary");
    }
    if (route.description) {
      operation.description = route.description;
      record(`${opPath}.description`, route._sources, "description");
    }
    if (route.operationId) {
      operation.operationId = route.operationId;
      record(`${opPath}.operationId`, route._sources, "operationId");
    }
    if (route.deprecated) {
      operation.deprecated = true;
      record(`${opPath}.deprecated`, route._sources, "deprecated");
    }

    // External docs on operation
    if (route.externalDocs) {
      operation.externalDocs = route.externalDocs;
      record(`${opPath}.externalDocs`, route._sources, "externalDocs");
    }

    // Security
    const allSecurity = [...inheritedSecurity, ...route.security];
    if (allSecurity.length) {
      operation.security = allSecurity.map((s) =>
        typeof s === "string" ? { [s]: [] } : s,
      );
      record(`${opPath}.security`, route._sources, "security");
    }

    // Parameters (derived from params / query / headers / cookies schemas)
    const parameters: Record<string, unknown>[] = [];

    // Helper: emit a parameter with optional description from TypeBox schema
    function emitParam(
      name: string,
      inType: string,
      val: unknown,
      required?: boolean,
    ): Record<string, unknown> {
      const schema = isTSchema(val) ? resolveSchema(val as TSchema) : val;
      const param: Record<string, unknown> = { name, in: inType, schema };
      if (required) param.required = true;
      // Read description from the TypeBox schema metadata
      if (isTSchema(val) && (val as any).description) {
        param.description = (val as any).description;
      }
      return param;
    }

    // Inherited group-level path params
    for (const paramSchema of inheritedParams) {
      if (paramSchema.properties) {
        for (const [name, val] of Object.entries(paramSchema.properties)) {
          parameters.push(emitParam(name, "path", val, true));
        }
      }
    }

    if (route.config.params) {
      const p = route.config.params;
      if (p.properties) {
        for (const [name, val] of Object.entries(p.properties)) {
          parameters.push(emitParam(name, "path", val, true));
        }
      }
      record(`${opPath}.parameters`, route._sources, "params");
    }

    if (route.config.query) {
      const q = route.config.query;
      const reqSet = new Set<string>((q as any).required || []);
      if (q.properties) {
        for (const [name, val] of Object.entries(q.properties)) {
          parameters.push(
            emitParam(name, "query", val, reqSet.has(name) || undefined),
          );
        }
      }
      // If no params entry yet, record query as the parameters source
      if (!route.config.params)
        record(`${opPath}.parameters`, route._sources, "query");
    }

    if (route.config.headers) {
      const h = route.config.headers;
      const reqSet = new Set<string>((h as any).required || []);
      if (h.properties) {
        for (const [name, val] of Object.entries(h.properties)) {
          parameters.push(
            emitParam(name, "header", val, reqSet.has(name) || undefined),
          );
        }
      }
    }

    if (route.config.cookies) {
      const c = route.config.cookies;
      const reqSet = new Set<string>((c as any).required || []);
      if (c.properties) {
        for (const [name, val] of Object.entries(c.properties)) {
          parameters.push(
            emitParam(name, "cookie", val, reqSet.has(name) || undefined),
          );
        }
      }
      record(`${opPath}.parameters`, route._sources, "cookies");
    }

    if (parameters.length) operation.parameters = parameters;

    // Request body
    if (route.config.body) {
      const reqBody: Record<string, unknown> = {
        content: {
          "application/json": { schema: resolveSchema(route.config.body) },
        },
      };
      if (route.config.bodyDescription)
        reqBody.description = route.config.bodyDescription;
      if (route.config.bodyRequired !== undefined)
        reqBody.required = route.config.bodyRequired;
      operation.requestBody = reqBody;
      record(`${opPath}.requestBody`, route._sources, "body");
    }

    // Responses
    const responses: Record<string, unknown> = {};

    // Shorthand: response → 200
    if (route.config.response) {
      responses["200"] = {
        description: "Successful response",
        content: {
          "application/json": { schema: resolveSchema(route.config.response) },
        },
      };
      record(`${opPath}.responses.200`, route._sources, "response");
    }

    // Explicit responses map
    if (route.config.responses) {
      for (const [status, def] of Object.entries(route.config.responses)) {
        if (isTSchema(def)) {
          responses[String(status)] = {
            description: "",
            content: {
              "application/json": { schema: resolveSchema(def) },
            },
          };
        } else {
          responses[String(status)] = emitResponseDef(
            def as ResponseDef,
            resolveSchema,
            toJsonSchema,
          );
        }
        record(`${opPath}.responses.${status}`, route._sources, "responses");
      }
    }

    // Chained responses from .respond() calls
    for (const [status, def] of route.responses) {
      if (isTSchema(def)) {
        responses[String(status)] = {
          description: "",
          content: {
            "application/json": { schema: resolveSchema(def) },
          },
        };
      } else {
        responses[String(status)] = emitResponseDef(
          def as ResponseDef,
          resolveSchema,
          toJsonSchema,
        );
      }
      record(
        `${opPath}.responses.${status}`,
        route._sources,
        "responses",
        String(status),
      );
    }

    // Error responses from chaining
    for (const [status, schema] of route.errors) {
      responses[String(status)] = {
        description: "",
        content: {
          "application/json": { schema: resolveSchema(schema) },
        },
      };
      record(
        `${opPath}.responses.${status}`,
        route._sources,
        "error",
        String(status),
      );
    }

    // Chained links from .link() calls — merge into existing response objects
    for (const [status, linkMap] of route.links) {
      const key = String(status);
      if (!responses[key]) {
        // Create a minimal response object if one doesn't exist for this status
        responses[key] = { description: "" };
      }
      const resp = responses[key] as Record<string, unknown>;
      const existing = (resp.links || {}) as Record<string, unknown>;
      resp.links = { ...existing, ...emitLinks(linkMap) };
      record(`${opPath}.responses.${key}.links`, route._sources, "link");
    }

    // Chained examples from .example() calls — merge into existing response objects
    for (const [status, examplesMap] of route.examples) {
      const key = String(status);
      if (!responses[key]) {
        responses[key] = { description: "" };
      }
      const resp = responses[key] as Record<string, unknown>;
      const content = (resp.content ?? { "application/json": {} }) as Record<
        string,
        Record<string, unknown>
      >;
      const mediaType = content["application/json"] ?? {};
      const existing = (mediaType.examples ?? {}) as Record<string, unknown>;
      for (const [name, ex] of Object.entries(examplesMap)) {
        existing[name] = emitExample(ex);
      }
      mediaType.examples = existing;
      content["application/json"] = mediaType;
      resp.content = content;
      record(`${opPath}.responses.${key}`, route._sources, "example");
    }

    // OpenAPI requires at least a responses object
    if (Object.keys(responses).length) {
      operation.responses = responses;
    } else {
      operation.responses = { "200": { description: "Successful response" } };
    }

    // Callbacks
    if (route.callbacks.size) {
      const callbacks: Record<string, unknown> = {};
      for (const [cbName, cbData] of route.callbacks) {
        const pathItem: Record<string, unknown> = {};
        for (const cbRoute of cbData.routes) {
          const cbOp: Record<string, unknown> = {};
          // Build the callback operation similarly to main routes
          if (cbRoute.config.body) {
            cbOp.requestBody = {
              content: {
                "application/json": {
                  schema: resolveSchema(cbRoute.config.body),
                },
              },
            };
          }
          if (cbRoute.config.response) {
            cbOp.responses = {
              "200": {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: resolveSchema(cbRoute.config.response),
                  },
                },
              },
            };
          } else {
            cbOp.responses = { "200": { description: "Successful response" } };
          }
          if (cbRoute.summary) cbOp.summary = cbRoute.summary;
          if (cbRoute.operationId) cbOp.operationId = cbRoute.operationId;
          pathItem[cbRoute.method] = cbOp;
        }
        callbacks[cbName] = { [cbData.expression]: pathItem };
      }
      operation.callbacks = callbacks;
      record(`${opPath}.callbacks`, route._sources, "callback");
    }

    // Per-operation servers
    if (route.servers.length) {
      operation.servers = route.servers;
      record(`${opPath}.servers`, route._sources, "server");
    }

    // Extensions
    for (const [key, value] of Object.entries(route.extensions)) {
      operation[key] = value;
      record(`${opPath}.${key}`, route._sources, "extension", key);
    }

    paths[pathKey][route.method] = operation;
  }

  // ------------------------------------------------------------------
  // Assemble the document
  // ------------------------------------------------------------------

  const info: Record<string, unknown> = {
    title: api.name,
    version: api.config.version || "1.0.0",
  };
  if (api.config.description) info.description = api.config.description;
  if (api.config.summary) info.summary = api.config.summary;
  if (api.config.termsOfService)
    info.termsOfService = api.config.termsOfService;
  if (api.config.contact) info.contact = api.config.contact;
  if (api.config.license) info.license = api.config.license;

  // Record api-level source entries
  record("info", api._sources, "api");

  const doc: Record<string, unknown> = {
    openapi: versionCapabilities[api.specVersion].fullVersion,
    info,
  };

  // JSON Schema dialect
  doc.jsonSchemaDialect =
    versionCapabilities[api.specVersion].jsonSchemaDialect;

  if (api._servers.length) {
    doc.servers = api._servers;
    record("servers", api._sources, "server");
  }
  if (Object.keys(paths).length) doc.paths = paths;

  // Webhooks
  if (api._webhooks.size) {
    const webhooks: Record<string, unknown> = {};
    for (const [name, groupNode] of api._webhooks) {
      const pathItem: Record<string, unknown> = {};
      for (const route of groupNode.routes) {
        const whOp: Record<string, unknown> = {};
        if (route.config.body) {
          whOp.requestBody = {
            content: {
              "application/json": { schema: resolveSchema(route.config.body) },
            },
          };
        }
        if (route.config.response) {
          whOp.responses = {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: resolveSchema(route.config.response),
                },
              },
            },
          };
        } else {
          whOp.responses = { "200": { description: "Successful response" } };
        }
        if (route.summary) whOp.summary = route.summary;
        if (route.operationId) whOp.operationId = route.operationId;
        pathItem[route.method] = whOp;
      }
      webhooks[name] = pathItem;
      record(`webhooks.${name}`, api._sources, "webhook", name);
    }
    doc.webhooks = webhooks;
  }

  // Security schemes
  if (Object.keys(api._securitySchemes).length) {
    components.securitySchemes = { ...api._securitySchemes };
    for (const name of Object.keys(api._securitySchemes)) {
      record(
        `components.securitySchemes.${name}`,
        api._sources,
        "securityScheme",
        name,
      );
    }
  }

  // Named schemas → components.schemas
  if (namedSchemas.size) {
    const schemas: Record<string, unknown> = {};
    const resolved = new Set<string>();
    let pending = true;
    while (pending) {
      pending = false;
      for (const [name, schema] of namedSchemas) {
        if (resolved.has(name)) continue;
        resolved.add(name);
        schemas[name] = resolveSchemaBody(schema);
        // Prefer an explicit `api.schema()` registration site; otherwise fall
        // back to the `named()` call site captured on the schema itself. Without
        // this fallback, schemas defined via `named()` (the common case) get no
        // source mapping and clicking them in the viewer jumps to the wrong line.
        const jsonPath = `components.schemas.${name}`;
        record(jsonPath, api._sources, "schema", name);
        if (st && !st.has(jsonPath)) {
          const schemaSource = getSchemaSource(schema);
          if (schemaSource) {
            st.set(jsonPath, { source: schemaSource, kind: "schema", detail: name });
          }
        }
        pending = true;
      }
    }
    components.schemas = schemas;
  }

  // Registered components (responses, parameters, headers, examples, links, callbacks, pathItems)
  for (const [type, entries] of api._components) {
    const section: Record<string, unknown> = {};
    for (const [name, config] of entries) {
      section[name] = config;
      record(
        `components.${type}.${name}`,
        api._sources,
        "component",
        `${type}.${name}`,
      );
    }
    components[type] = section;
  }

  if (Object.keys(components).length) doc.components = components;

  // Global security
  if (api._security.length) {
    doc.security = api._security.map((s) =>
      typeof s === "string" ? { [s]: [] } : s,
    );
    record("security", api._sources, "security");
  }

  // Tags
  if (api._tags.length) {
    doc.tags = api._tags.map((t) => {
      const tag: Record<string, unknown> = { name: t.name };
      if (t.description) tag.description = t.description;
      if (t.externalDocs) tag.externalDocs = t.externalDocs;
      return tag;
    });
    record("tags", api._sources, "tag");
  }

  // External docs (api-level)
  if (api._externalDocs) {
    doc.externalDocs = api._externalDocs;
    record("externalDocs", api._sources, "externalDocs");
  }

  // Api-level extensions
  for (const [key, value] of Object.entries(api._extensions)) {
    doc[key] = value;
    record(key, api._sources, "extension", key);
  }

  // ------------------------------------------------------------------
  // Return based on options
  // ------------------------------------------------------------------

  if (!options) return doc;

  const result: EmitResult = { doc };

  if (wantYaml || wantSourceMap) {
    result.yaml = yamlStringify(doc, { lineWidth: 0 });
  }

  if (st) {
    result.sourceTable = st;
  }

  if (wantSourceMap && st && result.yaml) {
    const yamlPositions = extractYamlPositions(result.yaml);
    result.sourceMap = generateSourceMap(
      st,
      yamlPositions,
      options.generatedFile ?? "openapi.yaml",
    );
  }

  if (options.audit) {
    result.versionAudit = api.versionAudit();
  }

  return result;
}

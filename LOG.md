# spac

TypeScript DSL for authoring OpenAPI 3.1+ specs. Uses [TypeBox](https://github.com/sinclairzx81/typebox) for JSON Schema with full type inference — you write TypeScript, not YAML.

**Core idea**: OpenAPI is the *output*, not the authoring experience. Define routes with plain objects, group them with callbacks, chain metadata, and emit a valid OpenAPI document.

```ts
const api = new Api('Petstore')
api.group('/pets', g => {
  g.get('/', { response: Type.Array(Pet) }).tag('pets')
  g.post('/', { body: CreatePet, response: Pet }).tag('pets')
  g.get('/:id', { params: Type.Object({ id: Type.String() }), response: Pet })
})
const spec = api.emit() // → OpenAPI 3.1 JSON
```

**Key traits**: TypeBox schemas directly (no wrapper DSL), named schemas auto-hoist to `components.schemas` as `$ref`, group tag/security inheritance, macro system for reuse, helper functions for common response patterns.

**Stack**: pnpm monorepo, TypeScript ES2022, vitest. Lives in `packages/spac`.

---

⏺ Everything is working. Here's the monorepo structure:

  spac/
  ├── package.json              # root (private, pnpm workspaces)
  ├── pnpm-workspace.yaml       # packages/*
  ├── tsconfig.json             # shared base tsconfig
  ├── .gitignore
  ├── packages/
  │   ├── spac/                 # main library
  │   │   ├── package.json      # vitest, typescript, typebox peer dep
  │   │   ├── tsconfig.json
  │   │   ├── vitest.config.ts
  │   │   └── src/
  │   │       ├── index.ts      # exports Api class
  │   │       └── api.test.ts   # vitest test
  │   └── examples/             # example consumers
  │       ├── package.json      # depends on spac workspace:*
  │       ├── tsconfig.json
  │       └── src/
  │           ├── petstore/     # petstore example
  │           └── cloudflare/   # cloudflare example

  What's set up:
  - pnpm monorepo with workspace linking
  - spac package — bare Api class, @sinclair/typebox as peer dep, vitest for testing
  - examples package — multiple example consumers (petstore, cloudflare) importing from spac via workspace link
  - vitest test harness running and passing (1 test)
  - TypeScript builds cleanly

  Run tests with pnpm --filter spac test or pnpm --filter spac test:watch for watch mode.

---

## Exhaustive OpenAPI 3.1.2 Spec Test Suite

Read through the entire OPEN_API_3.1.2.md spec and created an exhaustive vitest test suite
covering every object defined in sections 4.8.1 through 4.8.30.

### What was created

- `src/validate.ts` — stub validate functions for all 30 OAS objects (each throws "not implemented")
- `src/__tests__/*.test.ts` — 25 test files, one per OAS object, totaling 531 test cases

### Files

```
packages/spac/src/
├── validate.ts                              # 30 validate function stubs
└── __tests__/
    ├── openapi-object.test.ts               # 4.8.1  - openapi/info required, tags unique, extensions
    ├── info-object.test.ts                  # 4.8.2  - title/version required, termsOfService URI
    ├── contact-object.test.ts               # 4.8.3  - all optional, url URI, email format
    ├── license-object.test.ts               # 4.8.4  - name required, identifier/url mutual exclusivity
    ├── server-object.test.ts                # 4.8.5  - url required, no query/fragment, variables
    ├── server-variable-object.test.ts       # 4.8.6  - default required, enum not empty, default in enum
    ├── components-object.test.ts            # 4.8.7  - key regex ^[a-zA-Z0-9.\-_]+$, all 10 sub-maps
    ├── paths-object.test.ts                 # 4.8.8  - paths start with /, no duplicate templates
    ├── path-item-object.test.ts             # 4.8.9  - all 8 HTTP methods, parameters, servers
    ├── operation-object.test.ts             # 4.8.10 - responses required, param uniqueness, security
    ├── external-documentation-object.test.ts# 4.8.11 - url required (URI format)
    ├── parameter-object.test.ts             # 4.8.12 - name/in required, schema/content exclusive,
    │                                        #          path requires required:true, style per location,
    │                                        #          example/examples exclusive
    ├── request-body-object.test.ts          # 4.8.13 - content required, media type ranges
    ├── media-type-object.test.ts            # 4.8.14 - example/examples exclusive, encoding
    ├── encoding-object.test.ts              # 4.8.15 - contentType, headers, style, explode
    ├── responses-object.test.ts             # 4.8.16 - at least one response, wildcards (2XX), default
    ├── response-object.test.ts              # 4.8.17 - description required, headers/content/links
    ├── callback-object.test.ts              # 4.8.18 - runtime expression keys, Path Item values
    ├── example-object.test.ts               # 4.8.19 - value/externalValue mutual exclusivity
    ├── link-object.test.ts                  # 4.8.20 - operationRef/operationId exclusive, parameters
    ├── header-object.test.ts                # 4.8.21 - no name/in/allowEmptyValue/allowReserved,
    │                                        #          style must be "simple", schema/content exclusive
    ├── tag-object.test.ts                   # 4.8.22 - name required
    ├── reference-object.test.ts             # 4.8.23 - $ref required, NO extensions allowed
    ├── schema-object.test.ts                # 4.8.24 - boolean schemas, all types, format, composition,
    │                                        #          enum/const, annotations, discriminator, xml, binary
    ├── discriminator-object.test.ts         # 4.8.25 - propertyName required, mapping
    ├── xml-object.test.ts                   # 4.8.26 - namespace non-relative URI, attribute, wrapped
    ├── security-scheme-object.test.ts       # 4.8.27 - type required, conditional fields per type
    ├── oauth-flows-object.test.ts           # 4.8.28 - all 4 flow types
    ├── oauth-flow-object.test.ts            # 4.8.29 - conditional URLs, scopes required
    └── security-requirement-object.test.ts  # 4.8.30 - string arrays, empty = anonymous
```

### Test approach

Each test file imports a `validate<ObjectName>` function from `src/validate.ts` and tests:
- Required field presence/absence
- Field types (rejects wrong types)
- Mutual exclusivity constraints (e.g. identifier vs url on License)
- Valid enum values (e.g. `in` on Parameter must be path/query/header/cookie)
- Conditional requirements (e.g. path params must have `required: true`)
- Specification extension support (x- fields allowed, unknown fields rejected)
- Full examples from the spec

### Current state

- All 532 validator tests passing
- Run: `pnpm --filter spac test`

---

## DSL Implementation (Core Library)

All core DSL modules implemented and tested. 600/600 tests passing.

### Architecture

```
User code → Api / GroupBuilder / RouteBuilder (AST) → emitOpenApi() → OpenAPI 3.1 JSON
```

- **AST nodes**: `RouteNode` (single endpoint) and `GroupNode` (prefix + routes + nested groups)
- **Building**: object config for route definition, callbacks for grouping, chaining for metadata
- **Emit**: walks AST, flattens routes with inherited group metadata, resolves schemas

### Files added

```
packages/spac/src/
├── types.ts       # All TS interfaces: RouteConfig, RouteNode, GroupNode, macros, ApiConfig
├── schema.ts      # named(name, schema), getSchemaName() — SCHEMA_NAME Symbol annotation
├── route.ts       # RouteBuilder — chaining: summary, description, tag, operationId, deprecated, security, error, server, extension, use
├── group.ts       # GroupBuilder — HTTP methods, nested group(), chaining: tag, security, description, server, use
├── api.ts         # Api class — entry point. HTTP methods, group, server, securityScheme, tag, schema, security, use, emit
├── emit.ts        # emitOpenApi(api) — AST → OpenAPI 3.1 JSON. Recursive schema resolution, $ref hoisting
├── helpers.ts     # json, noContent, created, errorSchema, paginated, envelope
├── macros.ts      # macro.route(fn), macro.group(fn), macro.api(fn)
├── index.ts       # Re-exports everything
└── __tests__/
    └── dsl.test.ts  # 68 tests covering all DSL features
```

### Key design decisions

- **TypeBox schemas used directly** — no custom schema DSL. TypeBox `TSchema` everywhere.
- **Named schemas via Symbol**: `named('Pet', schema)` attaches `SCHEMA_NAME` symbol → emit hoists to `components.schemas` and emits `$ref`.
- **Recursive schema resolution**: `resolveSchema()` walks `items`, `properties`, `additionalProperties`, `allOf/oneOf/anyOf`, `not` to find nested named schemas.
- **Group inheritance**: tags and security cascade from parent groups to child routes during emit.
- **Macros**: thin wrappers — `macro.route(fn)` returns a `RouteMacro` (function that receives `RouteBuilder`), applied via `.use()`.
- **Helpers return `ResponseDef`** objects, not raw schemas — they set `contentType`, `description`, `schema`.
- **Route config**: `{ params, query, headers, body, response, responses }` — `response` is shorthand for 200, `responses` is explicit status map.

### What's NOT yet implemented (from SPEC_LIST.md)

- MDX/doc generation
- Path param validation (runtime)
- Auto-generated operationId
- Resource CRUD helpers (`.resource()`)
- Spec composition / merging
- Webhooks
- External docs on Api
- JSON/YAML file output helpers

---

## `openapi-gen` — OpenAPI → SPAC Code Generator

New package at `packages/openapi-gen`. Takes an OpenAPI 3.x spec (JSON) and generates idiomatic SPAC TypeScript code.

### Pipeline

```
OpenAPI JSON → parse operations → deduplicate schemas → group by path segment
  → split schemas (shared vs per-group) → generate TypeBox + SPAC code → output .ts files
```

### Output structure (directory mode)

```
<out>/
├── index.ts              # Api setup, servers, security schemes, registers all groups, emits
├── shared/schemas.ts     # named() schemas used by 2+ endpoint groups
├── <group>/
│   ├── index.ts          # registerX(api) — routes with .summary/.operationId/.tag/.security/.extension
│   └── schemas.ts        # named() schemas only used by this group
```

Groups are determined by first path segment. The `--strip` option lets you peel off context prefixes before grouping (e.g. `--strip /accounts/{account_id}` turns `/accounts/{account_id}/access/apps` into the `access` group).

### Files

```
packages/openapi-gen/
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── src/
    ├── index.ts              # Main: generate(options) → Map<path, content>
    ├── cli.ts                # CLI entry point for generate / dry-run scripts
    ├── types.ts              # GenerateOptions, ParsedOperation, OperationGroup, SchemaSplit
    ├── names.ts              # toPascalCase, toSlug, toRegisterFn, schemaVarName
    ├── schema-to-typebox.ts  # JSON Schema → TypeBox code strings
    ├── parse.ts              # Parse OpenAPI spec, resolve $refs, extract operations
    ├── organize.ts           # Group operations by first path segment, common prefix detection
    ├── dedup.ts              # Find identical component schemas, pick canonical (shortest name)
    ├── codegen.ts            # Assemble .ts file contents (schemas, routes, root index)
    └── __tests__/
        ├── schema-to-typebox.test.ts  # 40 tests — primitives, objects, arrays, enums, $ref, composition, nullable
        ├── names.test.ts              # 16 tests
        ├── organize.test.ts           # 19 tests
        ├── generate.test.ts           # 8 tests — end-to-end with minimal spec
        ├── cloudflare-smoke.test.ts   # 4 tests — full 322K-line CF spec
        └── missing-imports.test.ts    # 1 test — verifies zero undefined schema refs across all generated files
```

### CLI usage

```sh
# Dry run — prints stats (file count, sizes, largest files, group list)
pnpm --filter openapi-gen dry-run -- <spec.json> [--strip <prefix>]...

# Generate — writes files to output directory
pnpm --filter openapi-gen generate -- <spec.json> --out <dir> [--strip <prefix>]...
```

### Key design decisions

- **Group by path, not tag** — tags are often inconsistent across large specs; first path segment gives cleaner grouping. `--strip` handles nested resource prefixes like `/accounts/{account_id}/...`.
- **Schema deduplication** — large specs (e.g. Cloudflare with 5114 schemas) have many identical schemas under different names. Dedup picks the shortest name as canonical, maps all aliases to the same variable.
- **Schema splitting** — schemas used by 2+ groups go to `shared/schemas.ts`; schemas used by only one group stay in `<group>/schemas.ts`. Dedup aliases are resolved when counting so cross-group references don't break imports.
- **Topological sort** — schemas are emitted in dependency order (referenced schemas first). Cycles are broken gracefully.
- **`Type.Literal(null)` → `Type.Null()`** — null values in `const`/`enum` generate valid TypeBox.
- **Non-schema $ref resolution** — parameter refs, response refs, requestBody refs are dereferenced inline during parsing. Only schema `$ref`s become named variable references.

### Cloudflare example

Generated from `packages/examples/cloudflare/spec.json` (322K lines, 1466 paths, 5114 schemas):

```sh
pnpm --filter openapi-gen generate -- ../examples/cloudflare/spec.json \
  --out ../examples/cloudflare \
  --strip '/accounts/{account_id}' \
  --strip '/zones/{zone_id}'
```

Result: 254 files, 136 groups, ~93K lines, ~5.7 MB. All schema imports verified correct.

### Current state

- 88/88 tests passing
- Run: `pnpm --filter openapi-gen test`

---

## Debug Source Map & Transform

Source mapping system with two complementary approaches, all in the `spac` package:

1. **Runtime call-site capture** (fallback) — captures `new Error().stack` at each DSL method call
2. **Compile-time AST instrumentation** (recommended) — `transform()` injects precise source locations for every config property, chain method, and constructor call

### How it works

**Runtime (fallback)**: Every DSL method captures its call site via `new Error().stack`, skipping spac-internal frames. Used when code is NOT transformed.

**Compile-time (recommended)**: `transform(code, fileName)` runs a TypeScript AST transformer that:
1. Detects imports from `spac` and tracks `Api` instances
2. Injects `__src` metadata into config objects with per-property source positions (params, query, body, response, etc.)
3. Injects `._src(key, [file, line, col])` calls before chain methods (`.summary()`, `.tag()`, etc.)
4. Propagates taint through method chains and group callback parameters

### Files

```
packages/spac/src/
├── types.ts       # SrcLoc, ConfigSrcMeta types
├── debug.ts       # CRC32, call-site capture, VLQ encoding, V3 source map builder,
│                  # JSON serializer with position tracking, objectPath, lookup
├── transform.ts   # TypeScript AST transformer — import tracking, taint propagation,
│                  # config injection, chain wrapping, transform() convenience function
├── emit.ts        # Source map collector, V3 generation during emit
├── api.ts         # _src() method, staged source consumption
├── route.ts       # _src() method, __src config extraction, pre-set source checks
├── group.ts       # _src() method (reserved for future use)
└── __tests__/
    ├── transform.test.ts              # 23 tests — import detection, HTTP methods,
    │                                  # chain methods, Api-level methods, groups
    ├── transform-integration.test.ts  # 7 tests — full transform → emit pipeline,
    │                                  # source map round-trip accuracy
    ├── vlq.test.ts                    # 5 tests — VLQ encoding correctness
    ├── sourcemap.test.ts              # 5 tests — V3 generation
    └── serialize.test.ts              # 7 tests — JSON position tracking
```

`spac-transform` package has been removed — all transform logic lives in `spac` directly.

### Current state

- 736/736 spac tests passing
- Run: `pnpm --filter spac test`

---

## `spacview` — Source Map Viewer

New package at `packages/spacview`. A Vite + React + TypeScript + Tailwind v4 + shadcn/ui + CodeMirror 6 web app that visualizes how spac source code produces the resulting OpenAPI spec.

### How it works

Split-screen layout: **TypeScript source** on the left, **OpenAPI YAML spec** on the right. Click a line in the YAML pane and the app:

1. Highlights the clicked line in the YAML editor
2. Uses `findPathAtOffset` (yaml-path.ts) to determine the object path segments at the click position via the YAML AST `range` offsets
3. Calls `lookup()` from `spac` with those segments — this walks up the path tree until a source map entry is found
4. Scrolls to and highlights the corresponding line in the source editor

### Files

```
packages/spacview/
├── package.json
├── components.json           # shadcn config
├── vite.config.ts
├── tsconfig.json
├── index.html
└── src/
    ├── main.tsx              # React entry
    ├── App.tsx               # Split-screen layout, CodeMirror editors, click-to-navigate
    ├── index.css             # Tailwind v4 + shadcn theme
    ├── lib/
    │   ├── utils.ts          # shadcn cn() helper
    │   ├── yaml-path.ts      # findPathAtOffset — YAML AST offset → object path segments
    │   └── yaml-path.test.ts # 8 tests for findPathAtOffset
    └── components/
        └── ui/
            └── resizable.tsx # shadcn resizable panel component
```

No source-map logic is duplicated here — `lookup`, `crc32`, `objectPath` are imported directly from `spac`.

### Data

Loads petstore example data via Vite imports:
- Source code: `../../examples/petstore/index.ts` (raw import)
- Spec: `../../examples/petstore/spec.json`
- Source map: `../../examples/petstore/sourcemap.json`

Generate these with: `pnpm --filter spac-examples petstore:debug` — this transforms the source through `transform()` for precise per-property source locations, then emits with `debug: true`.

### Current state

- Click-to-navigate working: YAML click → source highlight + scroll
- 8/8 tests passing
- Run: `pnpm --filter spacview dev`
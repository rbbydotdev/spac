# spac

TypeScript DSL for authoring OpenAPI 3.1+ specs. Uses [TypeBox](https://github.com/sinclairzx81/typebox) for JSON Schema with full type inference — you write TypeScript, not YAML.

[![CI](https://github.com/rbbydotdev/spac/actions/workflows/ci.yml/badge.svg)](https://github.com/rbbydotdev/spac/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@spec-spac/spac.svg)](https://www.npmjs.com/package/@spec-spac/spac)
[![TypeScript 5.7+](https://img.shields.io/badge/TypeScript-5.7+-3178c6.svg)](https://www.typescriptlang.org/)

**[Docs](https://rbbydotdev.github.io/spac/)** · **[Playground](https://rbbydotdev.github.io/spac/playground)** · **[Getting Started](https://rbbydotdev.github.io/spac/docs/tutorials/getting-started)** · **[API Reference](https://rbbydotdev.github.io/spac/docs/reference/api)**

### Hover docs in the playground

![Hover tooltip showing .get() method signature and JSDoc in the plantstore example](assets/hover-get-route.png)

### Source mapping — TypeScript to OpenAPI YAML

![Playground showing TypeScript source on the left mapped to generated OpenAPI YAML on the right](assets/overview-breadcrumb.png)

---

```ts
import { Api, named } from '@spec-spac/spac'
import { Type } from '@sinclair/typebox'

const Pet = named('Pet', Type.Object({ id: Type.String(), name: Type.String() }))
const api = new Api('3.1', 'Petstore', { version: '1.0.0' })

api.group('/pets', g => {
  g.get('/').response(Type.Array(Pet)).summary('List all pets')
  g.post('/').body(Pet).response(Pet).summary('Create a pet')
  g.delete('/:id').params(Type.Object({ id: Type.String() })).respond(204)
})

const spec = api.emit() // valid OpenAPI 3.1 JSON
```

Named schemas automatically hoist to `components.schemas` as `$ref`s. Groups inherit tags and security. Macros let you compose reusable route/group patterns.

## Quick start

### 1. Install

```sh
npm install @spec-spac/spac @sinclair/typebox
```

### 2. Define your API

Create `api.ts`:

```ts
import { Api, named } from '@spec-spac/spac'
import { Type } from '@sinclair/typebox'

const User = named('User', Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String({ format: 'email' }),
}))

const api = new Api('3.1', 'My API', { version: '1.0.0' })

api.group('/users', g => {
  g.tag('users')
  g.get('/').response(Type.Array(User)).summary('List users')
  g.get('/:id').params(Type.Object({ id: Type.String() })).response(User)
  g.post('/').body(User).response(User).summary('Create user')
})

console.log(JSON.stringify(api.emit(), null, 2))
```

### 3. Run it

```sh
npx tsx api.ts > openapi.json
```

That's it — `openapi.json` is a valid OpenAPI 3.1 document with `User` hoisted to `components.schemas`.

## Packages

| Package | Install | What it does |
|---|---|---|
| [`@spec-spac/spac`](packages/spac) | `npm i @spec-spac/spac` | Core library — define routes, groups, schemas, emit OpenAPI 3.1 JSON/YAML with source maps |
| [`@spec-spac/from-openapi`](packages/from-openapi) | `npm i -g @spec-spac/from-openapi` | CLI + library — reverse-generate spac TypeScript from an existing OpenAPI spec |
| [`@spec-spac/from-openapi-biome`](packages/from-openapi/plugins/biome) | `npm i @spec-spac/from-openapi-biome` | Biome formatter plugin for the code generator |
| [`@spec-spac/from-openapi-prettier`](packages/from-openapi/plugins/prettier) | `npm i @spec-spac/from-openapi-prettier` | Prettier formatter plugin for the code generator |

## `spac-from-openapi` CLI

Already have an OpenAPI spec? Generate spac TypeScript from it:

```sh
# Preview what will be generated (dry run)
npx @spec-spac/from-openapi petstore.json

# Generate to a directory
npx spac-from-openapi petstore.json --out ./generated

# Strip path prefixes for cleaner grouping
npx spac-from-openapi cloudflare.json --out ./generated \
  --strip '/accounts/{account_id}' \
  --strip '/zones/{zone_id}'
```

| Flag | Description |
|------|-------------|
| `--out <dir>` | Output directory (omit for dry-run) |
| `--strip <prefix>` | Path prefix to strip before grouping (repeatable) |
| `--name <name>` | Override API title |
| `--spec-version <ver>` | Override OpenAPI version |
| `--debug` | Enable source map support in generated code |

Output structure:

```
generated/
  index.ts              — Api setup, imports all groups
  shared/schemas.ts     — Schemas used by 2+ groups
  <group>/index.ts      — Routes for that group
  <group>/schemas.ts    — Schemas local to that group
```

## Core concepts

### Routes and chaining

Every HTTP method returns a builder — all configuration is chained:

```ts
api.get('/users/:id')
  .params(Type.Object({ id: Type.String() }))
  .query(Type.Object({ fields: Type.Optional(Type.String()) }))
  .response(User)
  .error(404, ErrorSchema)
  .summary('Get a user by ID')
  .operationId('getUser')
  .tag('users')
```

### Groups

Groups collect routes under a shared prefix with inherited metadata:

```ts
api.group('/users', g => {
  g.tag('users')
  g.security('bearer')
  g.get('/').response(Type.Array(User))
  g.post('/').body(CreateUser).response(User)
  g.get('/:id').params(Type.Object({ id: Type.String() })).response(User)
})
```

### Named schemas

Wrap any TypeBox schema with `named()` to hoist it to `components.schemas`:

```ts
const Pet = named('Pet', Type.Object({ id: Type.String(), name: Type.String() }))
// Any route referencing Pet emits { "$ref": "#/components/schemas/Pet" }
```

### Response helpers

```ts
import { noContent, created, errorSchema } from '@spec-spac/spac'

api.post('/items')
  .body(CreateItem)
  .respond(201, created(Item))
  .respond(204, noContent())
  .error(400, errorSchema('Bad request'))
```

### Macros

Reusable transforms applied via `.use()`:

```ts
import { macro } from '@spec-spac/spac'

const authenticated = macro.route(r => r.security('bearer'))
const audited = macro.group(g => { g.tag('audited'); g.security('bearer') })

api.group('/admin', g => {
  g.use(audited)
  g.get('/stats').response(Stats).use(authenticated)
})
```

### Source maps

Map every line of emitted YAML back to the TypeScript that produced it:

```ts
const api = new Api('3.1', 'Petstore', { version: '1.0.0', debug: true })
// ... define routes ...

const result = api.emit({ sourceMap: true, generatedFile: 'spec.yaml' })
result.yaml        // YAML string
result.sourceMap   // standard Source Map V3
result.sourceTable // Map<jsonPath, SourceEntry>
```

## API reference

| Method | Description |
|---|---|
| `new Api(specVersion, title, config?)` | Create a new API spec (specVersion: `'3.1'`) |
| `.get/.post/.put/.delete/.patch(path)` | Top-level route (returns builder for chaining) |
| `.group(prefix, callback)` | Group routes under a shared path prefix |
| `.server(config)` | Add a server |
| `.securityScheme(name, config)` | Register a security scheme |
| `.tag(config)` | Register a tag |
| `.security(name)` | Apply global security |
| `.use(macro)` | Apply an API-level macro |
| `.emit()` | Produce the OpenAPI 3.1 JSON document |
| `.emit({ yaml: true })` | Emit as YAML string |
| `.emit({ sourceMap: true })` | Emit YAML + Source Map V3 (requires `debug: true`) |

### RouteBuilder chaining

`.params()` `.query()` `.headers()` `.body()` `.response()` `.respond()` `.error()` `.summary()` `.description()` `.tag()` `.operationId()` `.deprecated()` `.security()` `.server()` `.extension()` `.use()`

## Contributing

### Prerequisites

- Node.js 22+
- [pnpm](https://pnpm.io/) 10+

### Setup

```sh
git clone https://github.com/rbbydotdev/spac.git
cd spac
pnpm install
```

### Monorepo structure

```
packages/
  spac/            — Core library (@spec-spac/spac)
  from-openapi/    — CLI + library for reverse-generating spac from OpenAPI
  playground/      — Interactive playground (Vite + React + CodeMirror)
  website/         — Documentation site (Next.js + Fumadocs)
  theme/           — Shared Shiki syntax themes
  spac-vscode/     — VS Code extension
  examples/        — Example projects (petstore, plantstore, serpapi, etc.)
```

### Build & test

```sh
# Build the core library
pnpm --filter @spec-spac/spac build

# Run core tests
pnpm --filter @spec-spac/spac test

# Build + test the from-openapi package
pnpm --filter @spec-spac/from-openapi build
pnpm --filter @spec-spac/from-openapi test
```

### Running locally

**Docs site** (Next.js):
```sh
pnpm --filter website dev
# → http://localhost:3000
```

**Playground** (Vite):
```sh
# Generate fixtures first (required once, or after changing examples/spac source)
pnpm --filter spac-playground generate

# Start dev server
pnpm --filter spac-playground dev
```

The `generate` step bundles type declarations, builds source maps, and creates example fixtures the playground needs. Re-run it after modifying example specs or the spac package.

### Playground e2e tests

```sh
# Install browser (first time only)
pnpm exec --filter spac-playground playwright install chromium

# Run tests
pnpm --filter spac-playground test:e2e
```

### Formatting

```sh
pnpm format        # auto-fix with Biome
pnpm format:check  # check only (used in CI)
```

## License

MIT

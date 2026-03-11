# spac

TypeScript DSL for authoring OpenAPI 3.1+ specs. Uses [TypeBox](https://github.com/sinclairzx81/typebox) for JSON Schema with full type inference — you write TypeScript, not YAML.

```ts
import { Api, named, json, noContent } from 'spac'
import { Type } from '@sinclair/typebox'

const Pet = named('Pet', Type.Object({ id: Type.String(), name: Type.String() }))

const api = new Api('Petstore', { version: '1.0.0' })

api.group('/pets', g => {
  g.get('/', { response: Type.Array(Pet) }).summary('List all pets')
  g.post('/', { body: Pet, response: Pet }).summary('Create a pet')
  g.delete('/:id', { params: Type.Object({ id: Type.String() }), responses: { 204: noContent() } })
})

const spec = api.emit() // → valid OpenAPI 3.1 JSON
```

Named schemas automatically hoist to `components.schemas` as `$ref`s. Groups inherit tags and security. Macros let you compose reusable route/group patterns.

## Getting started

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) 10+

### Install

```sh
git clone <repo-url> && cd spac
pnpm install
```

### Run tests

```sh
pnpm --filter spac test        # core library (600+ tests)
pnpm --filter openapi-gen test  # code generator (88 tests)
```

## Packages

| Package | Description |
|---|---|
| [`spac`](packages/spac) | Core DSL — define routes, groups, schemas, and emit OpenAPI 3.1 |
| [`openapi-gen`](packages/openapi-gen) | Reverse generator — parse an existing OpenAPI spec and emit idiomatic spac code |
| [`examples`](packages/examples) | Example specs (Petstore, Cloudflare) |

## How-to guides

### Define routes and groups

```ts
const api = new Api('My API')

// Top-level route
api.get('/health', { response: Type.Object({ ok: Type.Boolean() }) })

// Grouped routes — share a path prefix, tags, and security
api.group('/users', g => {
  g.tag('users')
  g.security('bearer')
  g.get('/', { response: Type.Array(User) })
  g.post('/', { body: CreateUser, response: User })
  g.get('/:id', { params: Type.Object({ id: Type.String() }), response: User })
})
```

### Use named schemas for `$ref` hoisting

```ts
const Pet = named('Pet', Type.Object({
  id: Type.String(),
  name: Type.String(),
}))
// Any route referencing Pet will emit { "$ref": "#/components/schemas/Pet" }
```

### Add security, servers, and tags

```ts
api.server({ url: 'https://api.example.com/v1' })
api.securityScheme('bearer', { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
api.tag({ name: 'pets', description: 'Pet operations' })
```

### Create reusable patterns with macros

```ts
const authenticated = macro.route(r => r.security('bearer'))
const audited = macro.group(g => { g.tag('audited'); g.security('bearer') })

api.group('/admin', g => {
  g.use(audited)
  g.get('/stats', { response: Stats }).use(authenticated)
})
```

### Use response helpers

```ts
import { json, noContent, created, errorSchema, paginated, envelope } from 'spac'

api.post('/items', {
  body: CreateItem,
  responses: {
    201: created(Item),
    204: noContent(),
    400: json(errorSchema('Bad request')),
  },
})
```

### Generate spac code from an existing OpenAPI spec

```sh
# Preview what will be generated
pnpm --filter openapi-gen dry-run -- spec.json

# Generate to a directory
pnpm --filter openapi-gen generate -- spec.json --out ./generated

# Strip path prefixes before grouping
pnpm --filter openapi-gen generate -- spec.json --out ./generated \
  --strip '/accounts/{account_id}'
```

## Reference

### Api class

| Method | Description |
|---|---|
| `new Api(title, config?)` | Create a new API spec |
| `.get/.post/.put/.delete/.patch(path, config)` | Top-level route |
| `.group(prefix, callback)` | Group routes under a shared path prefix |
| `.server(config)` | Add a server |
| `.securityScheme(name, config)` | Register a security scheme |
| `.tag(config)` | Register a tag |
| `.security(name)` | Apply global security |
| `.use(macro)` | Apply an API-level macro |
| `.emit()` | Produce the OpenAPI 3.1 JSON document |

### Route config

```ts
{
  params?: TSchema       // path parameters
  query?: TSchema        // query parameters
  headers?: TSchema      // request headers
  body?: TSchema          // request body
  response?: TSchema      // shorthand for 200 response
  responses?: Record<number, ResponseDef>  // explicit status map
}
```

### RouteBuilder chaining

`.summary()` · `.description()` · `.tag()` · `.operationId()` · `.deprecated()` · `.security()` · `.error()` · `.server()` · `.extension()` · `.use()`

## Architecture

```
User code → Api / GroupBuilder / RouteBuilder (AST) → emitOpenApi() → OpenAPI 3.1 JSON
```

The DSL builds an AST of `RouteNode` and `GroupNode` objects. `emitOpenApi()` walks the tree, flattens routes with inherited group metadata, resolves TypeBox schemas (hoisting named schemas to `components.schemas` as `$ref`s), and produces a spec-compliant OpenAPI 3.1 document.

Key design decisions:

- **TypeBox schemas directly** — no wrapper DSL, just `TSchema` everywhere
- **Named schemas via Symbol** — `named('Pet', schema)` attaches a `SCHEMA_NAME` symbol; emit resolves to `$ref`
- **Group inheritance** — tags and security cascade from parent groups to child routes
- **Macros** — thin composable wrappers applied via `.use()` at route, group, or API level

## Project structure

```
spac/
├── packages/
│   ├── spac/              # core library
│   │   └── src/
│   │       ├── api.ts     # Api class entry point
│   │       ├── route.ts   # RouteBuilder
│   │       ├── group.ts   # GroupBuilder
│   │       ├── emit.ts    # AST → OpenAPI 3.1
│   │       ├── schema.ts  # named() and schema resolution
│   │       ├── helpers.ts # json, noContent, created, etc.
│   │       ├── macros.ts  # macro.route, macro.group, macro.api
│   │       └── validate.ts # OAS 3.1 object validators (30 functions, 532 tests)
│   ├── openapi-gen/       # OpenAPI → spac code generator
│   └── examples/          # petstore, cloudflare
├── package.json
└── pnpm-workspace.yaml
```

## License

MIT

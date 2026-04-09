# spac

TypeScript DSL for authoring OpenAPI 3.1+ specs. Uses [TypeBox](https://github.com/sinclairzx81/typebox) for JSON Schema with full type inference — you write TypeScript, not YAML.

## Install

```sh
npm install spac @sinclair/typebox
```

## Quick start

```ts
import { Api, named, json, noContent } from 'spac'
import { Type } from '@sinclair/typebox'

const Pet = named('Pet', Type.Object({ id: Type.String(), name: Type.String() }))

const api = new Api('3.1', 'Petstore', { version: '1.0.0' })

api.group('/pets', g => {
  g.get('/').response(Type.Array(Pet)).summary('List all pets')
  g.post('/').body(Pet).response(Pet).summary('Create a pet')
  g.delete('/:id').params(Type.Object({ id: Type.String() })).respond(204, noContent())
})

const spec = api.emit() // valid OpenAPI 3.1 JSON
```

Named schemas automatically hoist to `components.schemas` as `$ref`s. Groups inherit tags and security. Macros let you compose reusable route/group patterns.

## Features

- **TypeBox schemas directly** — no wrapper DSL, just `TSchema` everywhere
- **Named schemas via Symbol** — `named('Pet', schema)` attaches a name; emit resolves to `$ref`
- **Group inheritance** — tags and security cascade from parent groups to child routes
- **Macros** — composable wrappers applied via `.use()` at route, group, or API level
- **Source mapping** — `debug: true` captures call sites; emit produces Source Map V3 mapping YAML output lines to TypeScript source
- **OAS 3.1 validators** — 30 validation functions covering every OpenAPI 3.1 object type

## Routes and groups

```ts
const api = new Api('3.1', 'My API')

api.get('/health').response(Type.Object({ ok: Type.Boolean() }))

api.group('/users', g => {
  g.tag('users')
  g.security('bearer')
  g.get('/').response(Type.Array(User))
  g.post('/').body(CreateUser).response(User)
  g.get('/:id').params(Type.Object({ id: Type.String() })).response(User)
})
```

## Response helpers

```ts
import { json, noContent, created, errorSchema, paginated, envelope } from 'spac'

api.post('/items')
  .body(CreateItem)
  .respond(201, created(Item))
  .respond(204, noContent())
  .respond(400, json(errorSchema('Bad request')))
```

## Macros

```ts
import { macro } from 'spac'

const authenticated = macro.route(r => r.security('bearer'))
const audited = macro.group(g => { g.tag('audited'); g.security('bearer') })

api.group('/admin', g => {
  g.use(audited)
  g.get('/stats').response(Stats).use(authenticated)
})
```

## Source mapping

```ts
const api = new Api('3.1', 'Petstore', { version: '1.0.0', debug: true })
// ... define routes ...

const result = api.emit({ sourceMap: true, generatedFile: 'spec.yaml' })
result.yaml        // YAML string
result.sourceMap   // standard Source Map V3
result.sourceTable // Map<jsonPath, SourceEntry>
```

## Versioning

`Api` is generic on `SpecVersion`. Currently only `'3.1'` is supported. When OAS 4.0 arrives, add `'4.0'` to the union and incompatible team modules get compile errors:

```ts
export function registerPets(api: Api<'3.1'>) { ... }

const api = new Api('4.0', 'My API')
registerPets(api) // TS error: Api<'4.0'> not assignable to Api<'3.1'>
```

## Related packages

- [`@spac/from-openapi`](../from-openapi) — reverse generator: parse an existing OpenAPI spec and emit idiomatic spac code
- [`spac-playground`](../playground) — split-pane CodeMirror viewer with source map linking
- [`spac-vscode`](../spac-vscode) — VS Code extension for live preview

## License

MIT

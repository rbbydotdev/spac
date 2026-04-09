# @spec-spac/from-openapi

Reverse generator — parse an existing OpenAPI 3.1 spec and emit idiomatic [spac](../spac) TypeScript code.

## Install

```sh
npm install @spec-spac/from-openapi
```

## CLI usage

```sh
# Preview what will be generated (dry-run)
npx spac-from-openapi spec.json

# Generate to a directory
npx spac-from-openapi spec.json --out ./generated

# Strip path prefixes before grouping
npx spac-from-openapi spec.json --out ./generated \
  --strip '/accounts/{account_id}' --strip '/zones/{zone_id}'

# Enable source map support in generated code
npx spac-from-openapi spec.json --out ./generated --debug
```

### Options

| Flag | Description |
|---|---|
| `--out <dir>` | Output directory (omit for dry-run) |
| `--strip <prefix>` | Path prefix to strip before grouping (repeatable) |
| `--name <name>` | Override API title |
| `--spec-version <ver>` | Override OpenAPI version (default: from spec) |
| `--debug` | Emit `debug: true` in Api constructor |

## Programmatic usage

```ts
import { generate } from '@spec-spac/from-openapi'

const result = generate(specJson, {
  stripPrefixes: ['/accounts/{account_id}'],
  debug: true,
})

// result is a map of filename -> generated TypeScript source
for (const [file, source] of Object.entries(result.files)) {
  console.log(file, source.length)
}
```

## Formatter plugins

The generated code can be formatted with either Biome or Prettier via optional adapter packages:

- [`@spec-spac/from-openapi-biome`](./plugins/biome) — Biome formatter
- [`@spec-spac/from-openapi-prettier`](./plugins/prettier) — Prettier formatter

## Related

- [`spac`](../spac) — core DSL library
- [`spac-playground`](../playground) — live viewer for generated specs

## License

MIT

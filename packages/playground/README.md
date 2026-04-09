# spac-playground

Split-pane source viewer: SPAC TypeScript on the left, OpenAPI YAML on the right. Click either side to jump to the corresponding position via Source Map V3.

## Commands

```sh
# Start dev server
pnpm --filter spac-playground dev

# Regenerate cloudflare SPAC code from the OpenAPI spec.
# Rarely needed — only when the spec (examples/cloudflare/spec.json) or openapi-gen changes.
pnpm --filter spac-playground codegen

# Build fixtures (manifests, source maps, declarations) from the example source code.
# Run frequently during development — after changing example source, emit logic, or source map behavior.
pnpm --filter spac-playground generate

# Production build
pnpm --filter spac-playground build
```

## Examples

Example source lives in `scripts/`:

- `petstore.ts` — single-file hand-written example
- `plantstore/` — multi-file hand-written example
- `cloudflare/` — large example generated from `examples/cloudflare/spec.json` via openapi-gen

`generate` reads these, runs `api.emit()` with debug mode, and writes manifests + source files to `public/data/`.

`codegen` regenerates `scripts/cloudflare/` from the spec into a temp dir, then replaces the existing directory.

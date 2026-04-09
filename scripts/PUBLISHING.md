# Publishing to npm

## Quick start

```bash
pnpm publish-pkg <package> <patch|minor|major>
```

## Packages

| Shorthand | npm package |
|-----------|-------------|
| `spac` | `@spec-spac/spac` |
| `from-openapi` | `@spec-spac/from-openapi` |
| `biome` | `@spec-spac/from-openapi-biome` |
| `prettier` | `@spec-spac/from-openapi-prettier` |
| `all` | All four, in dependency order |

## Examples

```bash
pnpm publish-pkg spac patch           # 0.0.2 → 0.0.3
pnpm publish-pkg spac minor           # 0.1.0
pnpm publish-pkg from-openapi patch
pnpm publish-pkg all patch            # bump + publish everything
```

The script builds before publishing, so you don't need to run `build` separately.

## Auth

**Option 1 — npm login (interactive):**

```bash
npm login
```

**Option 2 — API token (non-interactive):**

Generate a token at https://www.npmjs.com/settings/~/tokens and set it:

```bash
export NPM_TOKEN=npm_xxxxxxxxxxxx
```

Add to your shell profile (`~/.zshrc`) to persist across sessions. The publish script picks it up automatically.

## After publishing

The script bumps `package.json` versions but doesn't commit. After publishing:

```bash
git add -A && git commit -m "release: v0.1.0" && git push
```

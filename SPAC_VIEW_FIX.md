# SpacView Click-to-Navigate Fix

## Problem Symptoms

1. **Wrong source lines highlighted** — clicking a YAML line highlights a nonsensical line in the source editor. Root cause: the sourcemap had entries pointing to `.index.transformed.ts` (a temp file created by the transform step). That file has different line numbers than the original `index.ts`, and it gets deleted after the debug build.

2. **No resolved path display** — there used to be a path shown in the header bar so you could see how the YAML object path mapped to a source location. This was missing from the rewrite.

3. **V3 source map semicolons** — the `spec.json.map` V3 source map has many consecutive semicolons `;;;;`. These represent output JSON lines with no source mapping (closing braces, values, etc.). This is normal V3 format, but the map also referenced the temp transformed file as a source, which is wrong.

## Fixes Applied

- **debug.ts**: After emitting with `debug: true`, filter out all sourcemap entries that point to the transformed temp file (file 1). Only keep entries pointing to the original `index.ts` (file 0). The dropped entries were `captureCallSite()` fallbacks from helper functions (`errorSchema()`, `noContent()`, `macro.route()`, etc.) that the AST transform doesn't instrument. These are less precise anyway — `lookup()` walks up to parent paths, so removing them just means those YAML keys fall back to the parent operation's source location.

- **App.tsx**: Added `resolvedPath` and `sourceLine` state. The header now shows the YAML object path and which sourcemap path it resolved to, plus the source line number.

## Exhaustive Mapping Verification Plan

For every clickable section in the YAML output, verify that `lookup(sourcemap, ...segments)` resolves to the correct source line. The YAML structure maps to the spec JSON structure. Key categories:

### Top-level keys
| YAML path | Expected source line | Notes |
|---|---|---|
| `info` | 173 (`new Api("Petstore", {`) | Constructor call |
| `info.title` | 173 | Falls back to `info` |
| `info.description` | 173 | Falls back to `info` |
| `servers` | — | Created by `withServers` macro, may not have entry |
| `servers[0]` | — | Inside macro callback |
| `servers[1]` | — | Inside macro callback |
| `servers[2]` | — | Inside macro callback |

### /health (top-level route, line 587-597)
| YAML path | Expected source line |
|---|---|
| `paths./health.get` | 587 (`api.get("/health", {`) |
| `paths./health.get.summary` | 587 or specific chain call |
| `paths./health.get.operationId` | 587 or specific chain call |
| `paths./health.get.responses.200` | 589 (`response:` property) |
| `paths./health.get.servers` | 587 (falls back to operation) |

### /pets group (lines 257-390)
| YAML path | Expected source line |
|---|---|
| `paths./pets.get` | 261 (`g.get("/", {`) |
| `paths./pets.get.summary` | 261 (falls back) |
| `paths./pets.get.operationId` | 261 (falls back) |
| `paths./pets.get.tags` | 261 (falls back) |
| `paths./pets.get.description` | 261 (falls back) |
| `paths./pets.get.parameters` | 261 (query mapped here) |
| `paths./pets.get.responses.200` | 269 (`response: paginated(Pet)`) |
| `paths./pets/:petId.get` | 276 (`g.get("/:petId", {`) |
| `paths./pets/:petId.get.parameters` | 277 (`params:`) |
| `paths./pets/:petId.get.responses.200` | 278 (`response:`) |
| `paths./pets.post` | 285 (`g.post("/", {`) |
| `paths./pets.post.responses.201` | 286 (`body:` — or 288 for responses) |
| `paths./pets/:petId.put` | 297 (`g.put("/:petId", {`) |
| `paths./pets/:petId.put.parameters` | 299 (`params:`) |
| `paths./pets/:petId.put.responses.200` | 300 (`response:`) |
| `paths./pets/:petId.patch` | 309 (`g.patch("/:petId", {`) |
| `paths./pets/:petId.delete` | 319 (`g.delete("/:petId", {`) |
| `paths./pets/findByStatus.get` | 331 |
| `paths./pets/findByTags.get` | 349 |
| `paths./pets/:petId/image.post` | 360 |
| `paths./pets/:petId.head` | 381 |
| `paths./pets.options` | 600 |

### /store group (lines 396-479)
| YAML path | Expected source line |
|---|---|
| `paths./store/inventory.get` | 400 |
| `paths./store/orders.post` | 408 |
| `paths./store/orders/:orderId.get` | 420 |
| `paths./store/orders/:orderId.delete` | 430 |
| `paths./store/admin/stats.get` | 445 |
| `paths./store/admin/orders.delete` | 464 |

### /users group (lines 485-580)
| YAML path | Expected source line |
|---|---|
| `paths./users.post` | 489 |
| `paths./users/batch.post` | 500 |
| `paths./users/login.post` | 512 |
| `paths./users/logout.post` | 539 |
| `paths./users/:username.get` | 549 |
| `paths./users/:username.put` | 558 |
| `paths./users/:username.delete` | 570 |

### components
| YAML path | Expected source line |
|---|---|
| `components.schemas.Category` | 194 (`api.schema("Category", ...)`) |
| `components.schemas.Tag` | 195 |
| `components.schemas.Pet` | 196 |
| `components.securitySchemes.bearerAuth` | 207 |
| `components.securitySchemes.apiKey` | 214 |
| `components.securitySchemes.oauth2` | 221 |

### tags
| YAML path | Expected source line |
|---|---|
| `tags[0]` (pets) | 241 |
| `tags[1]` (store) | 250 (was 249) |
| `tags[2]` (users) | 250 |
| `tags[3]` (admin) | 251 |

## What Won't Map (expected)

- **Values inside schemas** (property definitions, types, enums) — these are TypeBox schema definitions, not tracked by the source map
- **Inherited group-level tags** — when a route inherits `tags: ["pets"]` from `g.tag("pets")`, the tag in the spec output maps to the group tag call, not the route
- **Macro-injected metadata** — security/error responses added by `authenticated` macro point to the macro definition line, not the `.use(authenticated)` call
- **Helper function internals** — `noContent()`, `errorSchema()`, `paginated()` create response objects; their internal structure isn't source-mapped

## Next Steps

1. Write an exhaustive test in `spacview/src/lib/` that loads the real `sourcemap.json` and verifies every expected mapping from the table above
2. Fix any mappings that resolve to wrong lines
3. Consider whether helpers like `errorSchema()` should accept source location injection from the transform

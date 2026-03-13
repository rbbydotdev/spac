# SpacView UI Problems

## Expected Behavior

1. **Click a line in the YAML pane** → highlights that line in the YAML editor
2. **Source editor scrolls** to the corresponding source line and highlights it
3. **Header bar shows the resolved path** — the YAML object path clicked and what sourcemap entry it resolved to (with `→` showing fallback if it walked up to a parent)
4. **Path walking** — if a YAML key has no direct sourcemap entry (e.g. `headers` within a response), `lookup()` walks up the parent path until it finds an entry. The header should show this: `["paths"]["/users/login"]["post"]["responses"]["200"]["headers"] → ["paths"]["/users/login"]["post"]["responses"]["200"]`

## Reported Problems

### 1. Wrong source lines highlighted
**Symptom**: Clicking a YAML line highlights a nonsensical line in the source editor.
**Root cause**: The sourcemap had entries pointing to `.index.transformed.ts` (a temp file created by the transform step). That file has different line numbers than the original `index.ts` shown in the source editor.
**Fix**: Filter out all sourcemap entries pointing to the temp transformed file in `debug.ts`. Only keep entries pointing to the original source file.
**Status**: Fixed.

### 2. No path display in header
**Symptom**: There used to be a path shown at the top of the viewer so you could see how the YAML object path mapped to a source location. This was missing.
**Fix**: Added `resolvedPath` and `sourceLine` state to App.tsx. The header now shows the YAML path, what it resolved to, and the source line number.
**Status**: Fixed.

### 3. Path resolution not going deep enough for `headers`
**Symptom**: Clicking `headers:` in the YAML for `/users/login POST 200` shows `["paths"]["/users/login"]["post"]["responses"]["200"]` instead of including `["headers"]` in the clicked path.
**Clarification**: The **clicked path** IS correct — `findPathAtOffset` does return `["headers"]` at the right depth. The issue is that the **sourcemap has no entry** for headers within a response definition. So `lookup()` walks up to the parent `200` response. The display shows the **resolved** path, not the clicked path.
**Root cause**: The transform only instruments top-level config properties (`params`, `body`, `response`, `query`, `headers` at config level). Properties nested inside `responses: { 200: { headers: { ... } } }` are not tracked.
**Status**: Display now shows both paths when they differ. Deeper source mapping for nested response properties needs transform + emitter changes.

### 4. Source highlight/scroll sometimes doesn't go to the right place
**Symptom**: Even when the path and line number shown in the header are correct, the code editor doesn't scroll to or highlight the right line.
**Root cause**: The highlight and scroll were dispatched as two separate CodeMirror transactions. The second dispatch could reference stale state.
**Fix**: Combined into a single dispatch with both effects.
**Status**: Fixed.

### 5. Headers / nested response properties not source-mapped
**Symptom**: Clicking deeply nested YAML keys like response headers, response descriptions, individual schema properties always walks up to the parent operation or response level.
**Root cause**: The transform (`transform.ts`) only adds `__src` metadata for top-level config properties. The emitter (`emit.ts`) only creates sourcemap entries for operations, their responses, parameters, and chain methods. Neither tracks properties within individual response definition objects.
**What's needed**:
- **Transform**: Extend `addSrcToConfig` to also descend into `responses` object literal and instrument each response definition's properties (description, schema, headers, etc.)
- **Emitter**: When building the spec output for a response that has source info, add sourcemap entries for `headers`, `description`, etc.
**Status**: Not yet implemented.

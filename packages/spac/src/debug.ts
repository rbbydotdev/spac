// ---------------------------------------------------------------------------
// CRC32 (IEEE polynomial)
// ---------------------------------------------------------------------------

const TABLE = new Uint32Array(256)
for (let i = 0; i < 256; i++) {
  let c = i
  for (let j = 0; j < 8; j++) {
    c = c & 1 ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1)
  }
  TABLE[i] = c >>> 0
}

/** Compute CRC32 of a string, returned as 8-char zero-padded hex. */
export function crc32(str: string): string {
  let crc = 0xFFFFFFFF
  for (let i = 0; i < str.length; i++) {
    crc = (TABLE[(crc ^ str.charCodeAt(i)) & 0xFF] ^ (crc >>> 8)) >>> 0
  }
  return ((crc ^ 0xFFFFFFFF) >>> 0).toString(16).padStart(8, '0')
}

// ---------------------------------------------------------------------------
// Call-site capture
// ---------------------------------------------------------------------------

// SELF_DIRS: directories whose direct files are considered spac-internal.
// Includes both dist/ (compiled) and src/ (when run via tsx or ts-node)
// so call-site capture skips library internals regardless of how spac is loaded.
const SELF_DIRS: string[] = []
try {
  const dir = new URL('.', import.meta.url).pathname
  SELF_DIRS.push(dir)
  // If we're in dist/, also add sibling src/ (and vice versa)
  if (dir.endsWith('/dist/')) SELF_DIRS.push(dir.replace(/\/dist\/$/, '/src/'))
  else if (dir.endsWith('/src/')) SELF_DIRS.push(dir.replace(/\/src\/$/, '/dist/'))
} catch {
  // Fallback for environments without import.meta.url
}

function parseFrame(raw: string): { file: string; line: string; col: string } | undefined {
  // V8: "    at Foo.bar (/path/to/file.ts:10:5)"
  const m1 = raw.match(/\((.+):(\d+):(\d+)\)/)
  if (m1) return { file: m1[1], line: m1[2], col: m1[3] }
  // V8 (no function name): "    at /path/to/file.ts:10:5"
  const m2 = raw.match(/at\s+(.+):(\d+):(\d+)/)
  if (m2) return { file: m2[1], line: m2[2], col: m2[3] }
  return undefined
}

/**
 * Internal frames are files directly in a SELF_DIR (not in subdirectories like __tests__/).
 */
function isInternalFrame(filePath: string): boolean {
  for (const dir of SELF_DIRS) {
    if (!filePath.startsWith(dir)) continue
    const relative = filePath.slice(dir.length)
    if (!relative.includes('/')) return true
  }
  return false
}

/**
 * Capture the first non-spac-internal call site from the current stack.
 * Returns `"file:line:col"`, or undefined if undetermined.
 */
export function captureCallSite(): string | undefined {
  const err = new Error()
  const lines = err.stack?.split('\n')
  if (!lines) return undefined

  for (let i = 1; i < lines.length; i++) {
    const frame = parseFrame(lines[i])
    if (!frame) continue
    if (isInternalFrame(frame.file)) continue
    return `${frame.file}:${frame.line}:${frame.col}`
  }
  return undefined
}

// ---------------------------------------------------------------------------
// Object path helpers
// ---------------------------------------------------------------------------

/** Build a bracket-notation object path: `["paths"]["/pets"]["get"]` */
export function objectPath(...segments: (string | number)[]): string {
  return segments.map(s => `[${JSON.stringify(s)}]`).join('')
}

/**
 * Look up the source location for a spec object path, walking up the tree
 * until a match is found.
 *
 * @returns The source location and the matched path, or undefined.
 *
 * @example
 * ```ts
 * const { spec, sourceMap } = api.emit({ debug: true })
 *
 * // Exact match
 * lookup(sourceMap, 'paths', '/pets', 'get')
 * // => { src: 'src/api.ts:15:3', path: '["paths"]["/pets"]["get"]' }
 *
 * // Walks up — no entry for "parameters", finds the operation
 * lookup(sourceMap, 'paths', '/pets', 'get', 'parameters')
 * // => { src: 'src/api.ts:15:3', path: '["paths"]["/pets"]["get"]' }
 * ```
 */
export function lookup(
  sourceMap: Record<string, string>,
  ...segments: (string | number)[]
): { src: string; path: string } | undefined {
  for (let len = segments.length; len > 0; len--) {
    const path = objectPath(...segments.slice(0, len))
    const key = crc32(path)
    if (key in sourceMap) {
      return { src: sourceMap[key], path }
    }
  }
  return undefined
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Options for {@link emitOpenApi} and {@link Api.emit}. */
export interface EmitOptions {
  /** When true, returns `{ spec, sourceMap }` with CRC32-keyed source locations. */
  debug?: boolean
}

/** Result of emit when `debug: true`. */
export interface EmitDebugResult {
  /** The OpenAPI 3.1 spec. */
  spec: Record<string, unknown>
  /** CRC32(objectPath) → file:line:col */
  sourceMap: Record<string, string>
}

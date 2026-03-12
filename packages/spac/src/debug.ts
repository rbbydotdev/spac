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
 * const debug = api.emit({ debug: true })
 *
 * // Exact match
 * lookup(debug, 'paths', '/pets', 'get')
 * // => { src: 'src/api.ts:15:3', path: '["paths"]["/pets"]["get"]' }
 *
 * // Walks up — no entry for "parameters", finds the operation
 * lookup(debug, 'paths', '/pets', 'get', 'parameters')
 * // => { src: 'src/api.ts:15:3', path: '["paths"]["/pets"]["get"]' }
 * ```
 */
export function lookup(
  debug: { files: string[]; sourceMap: Record<string, string> },
  ...segments: (string | number)[]
): { src: string; path: string } | undefined {
  for (let len = segments.length; len > 0; len--) {
    const path = objectPath(...segments.slice(0, len))
    const key = crc32(path)
    if (key in debug.sourceMap) {
      const raw = debug.sourceMap[key]
      const c1 = raw.indexOf(':')
      const fileId = Number(raw.slice(0, c1))
      const rest = raw.slice(c1 + 1)
      return { src: `${debug.files[fileId]}:${rest}`, path }
    }
  }
  return undefined
}

// ---------------------------------------------------------------------------
// VLQ encoding (for V3 source maps)
// ---------------------------------------------------------------------------

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

export function vlqEncode(value: number): string {
  let vlq = value < 0 ? ((-value) << 1) + 1 : value << 1
  let encoded = ''
  do {
    let digit = vlq & 0b11111
    vlq >>>= 5
    if (vlq > 0) digit |= 0b100000
    encoded += B64[digit]
  } while (vlq > 0)
  return encoded
}

// ---------------------------------------------------------------------------
// V3 source map builder
// ---------------------------------------------------------------------------

export interface V3Mapping {
  outLine: number
  outCol: number
  srcFile: string
  srcLine: number
  srcCol: number
}

export function buildV3SourceMap(
  outputFile: string,
  mappings: V3Mapping[],
): V3SourceMap {
  const fileToIdx = new Map<string, number>()
  const sources: string[] = []

  for (const m of mappings) {
    if (!fileToIdx.has(m.srcFile)) {
      fileToIdx.set(m.srcFile, sources.length)
      sources.push(m.srcFile)
    }
  }

  const byLine = new Map<number, V3Mapping[]>()
  let maxLine = 0
  for (const m of mappings) {
    if (m.outLine > maxLine) maxLine = m.outLine
    let arr = byLine.get(m.outLine)
    if (!arr) { arr = []; byLine.set(m.outLine, arr) }
    arr.push(m)
  }

  const state = { prevSrcFile: 0, prevSrcLine: 0, prevSrcCol: 0 }
  const lines: string[] = []

  for (let line = 0; line <= maxLine; line++) {
    const lineMap = byLine.get(line)
    if (!lineMap || lineMap.length === 0) { lines.push(''); continue }
    lineMap.sort((a, b) => a.outCol - b.outCol)

    const parts: string[] = []
    let prevOutCol = 0

    for (const m of lineMap) {
      const srcIdx = fileToIdx.get(m.srcFile)!
      let seg = vlqEncode(m.outCol - prevOutCol)
      seg += vlqEncode(srcIdx - state.prevSrcFile)
      seg += vlqEncode(m.srcLine - state.prevSrcLine)
      seg += vlqEncode(m.srcCol - state.prevSrcCol)
      parts.push(seg)

      prevOutCol = m.outCol
      state.prevSrcFile = srcIdx
      state.prevSrcLine = m.srcLine
      state.prevSrcCol = m.srcCol
    }

    lines.push(parts.join(','))
  }

  return {
    version: 3,
    file: outputFile,
    sources,
    names: [],
    mappings: lines.join(';'),
  }
}

// ---------------------------------------------------------------------------
// JSON serializer with position tracking
// ---------------------------------------------------------------------------

export interface JsonPositions {
  json: string
  positions: Map<string, { line: number; col: number }>
}

export function serializeJsonWithPositions(value: unknown, indent = 2): JsonPositions {
  const positions = new Map<string, { line: number; col: number }>()
  let line = 0
  let col = 0
  const parts: string[] = []

  function write(s: string) {
    for (const ch of s) {
      if (ch === '\n') { line++; col = 0 } else { col++ }
    }
    parts.push(s)
  }

  function opStr(segments: (string | number)[]): string {
    return segments.map(s => `[${JSON.stringify(s)}]`).join('')
  }

  function writeValue(val: unknown, path: (string | number)[], depth: number) {
    if (val === null) { write('null'); return }
    if (typeof val === 'boolean' || typeof val === 'number') { write(String(val)); return }
    if (typeof val === 'string') { write(JSON.stringify(val)); return }
    if (Array.isArray(val)) {
      if (val.length === 0) { write('[]'); return }
      write('[\n')
      for (let i = 0; i < val.length; i++) {
        const pad = ' '.repeat(indent * (depth + 1))
        write(pad)
        const cp = [...path, i]
        positions.set(opStr(cp), { line, col: col - pad.length })
        writeValue(val[i], cp, depth + 1)
        if (i < val.length - 1) write(',')
        write('\n')
      }
      write(' '.repeat(indent * depth) + ']')
      return
    }
    if (typeof val === 'object') {
      const entries = Object.entries(val as Record<string, unknown>)
      if (entries.length === 0) { write('{}'); return }
      write('{\n')
      for (let i = 0; i < entries.length; i++) {
        const [key, v] = entries[i]
        const pad = ' '.repeat(indent * (depth + 1))
        write(pad)
        const cp = [...path, key]
        positions.set(opStr(cp), { line, col: col - pad.length })
        write(JSON.stringify(key) + ': ')
        writeValue(v, cp, depth + 1)
        if (i < entries.length - 1) write(',')
        write('\n')
      }
      write(' '.repeat(indent * depth) + '}')
      return
    }
    write(JSON.stringify(val))
  }

  positions.set('', { line: 0, col: 0 })
  writeValue(value, [], 0)

  return { json: parts.join(''), positions }
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Options for {@link emitOpenApi} and {@link Api.emit}. */
export interface EmitOptions {
  /** When true, returns `{ spec, sourceMap }` with CRC32-keyed source locations. */
  debug?: boolean
}

/** V3 source map following the standard format with VLQ-encoded mappings. */
export interface V3SourceMap {
  version: 3
  file: string
  sources: string[]
  names: string[]
  mappings: string
}

/** Result of emit when `debug: true`. */
export interface EmitDebugResult {
  /** The OpenAPI 3.1 spec. */
  spec: Record<string, unknown>
  /** Incremental file ID → full file path */
  files: string[]
  /** CRC32(objectPath) → fileId:line:col */
  sourceMap: Record<string, string>
  /** Formatted JSON output — use with v3 for position-based source mapping. */
  json: string
  /** Standard V3 source map mapping positions in `json` to source TypeScript positions. */
  v3: V3SourceMap
}

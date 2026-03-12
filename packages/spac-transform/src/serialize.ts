/**
 * JSON serializer that tracks the output position of every object key.
 * Produces a formatted JSON string and a map of bracket-notation object paths
 * to [line, col] positions in the output.
 */

export interface SerializeResult {
  /** The formatted JSON string */
  json: string
  /** Map of bracket-notation object path → { line (0-based), col (0-based) } */
  positions: Map<string, { line: number; col: number }>
}

/**
 * Serialize a value to formatted JSON while recording output positions
 * for every object key.
 *
 * @param value - The value to serialize
 * @param indent - Number of spaces per indent level (default 2)
 */
export function serializeWithPositions(value: unknown, indent = 2): SerializeResult {
  const positions = new Map<string, { line: number; col: number }>()
  let line = 0
  let col = 0
  const parts: string[] = []

  function write(s: string) {
    for (const ch of s) {
      if (ch === '\n') {
        line++
        col = 0
      } else {
        col++
      }
    }
    parts.push(s)
  }

  function writeValue(val: unknown, pathSegments: (string | number)[], depth: number) {
    if (val === null) {
      write('null')
      return
    }
    if (typeof val === 'boolean' || typeof val === 'number') {
      write(String(val))
      return
    }
    if (typeof val === 'string') {
      write(JSON.stringify(val))
      return
    }
    if (Array.isArray(val)) {
      if (val.length === 0) {
        write('[]')
        return
      }
      write('[\n')
      for (let i = 0; i < val.length; i++) {
        const pad = ' '.repeat(indent * (depth + 1))
        write(pad)
        const childPath = [...pathSegments, i]
        // Record position for array element
        positions.set(objectPath(childPath), { line, col: col - pad.length })
        writeValue(val[i], childPath, depth + 1)
        if (i < val.length - 1) write(',')
        write('\n')
      }
      write(' '.repeat(indent * depth) + ']')
      return
    }
    if (typeof val === 'object') {
      const entries = Object.entries(val as Record<string, unknown>)
      if (entries.length === 0) {
        write('{}')
        return
      }
      write('{\n')
      for (let i = 0; i < entries.length; i++) {
        const [key, v] = entries[i]
        const pad = ' '.repeat(indent * (depth + 1))
        write(pad)
        const childPath = [...pathSegments, key]
        // Record position for this key
        positions.set(objectPath(childPath), { line, col: col - pad.length })
        write(JSON.stringify(key) + ': ')
        writeValue(v, childPath, depth + 1)
        if (i < entries.length - 1) write(',')
        write('\n')
      }
      write(' '.repeat(indent * depth) + '}')
      return
    }
    // Fallback
    write(JSON.stringify(val))
  }

  // Record position for root
  positions.set('', { line: 0, col: 0 })
  writeValue(value, [], 0)

  return { json: parts.join(''), positions }
}

/** Build bracket-notation object path: ["paths"]["/pets"]["get"] */
function objectPath(segments: (string | number)[]): string {
  return segments.map(s => `[${JSON.stringify(s)}]`).join('')
}

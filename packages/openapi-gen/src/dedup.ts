/**
 * Find component schemas with identical JSON content.
 * Returns a map of duplicateKey → canonicalKey.
 * The canonical is the shortest name (ties broken alphabetically).
 */
export function findDuplicateSchemas(spec: any): Map<string, string> {
  const schemas = spec.components?.schemas || {}
  const byHash = new Map<string, string[]>()

  for (const [key, schema] of Object.entries(schemas)) {
    const hash = canonicalJson(schema)
    if (!byHash.has(hash)) byHash.set(hash, [])
    byHash.get(hash)!.push(key)
  }

  const dupes = new Map<string, string>()
  for (const keys of byHash.values()) {
    if (keys.length <= 1) continue
    // Pick shortest name as canonical, then alphabetical
    keys.sort((a, b) => a.length - b.length || a.localeCompare(b))
    const canonical = keys[0]
    for (const key of keys.slice(1)) {
      dupes.set(key, canonical)
    }
  }

  return dupes
}

function canonicalJson(obj: any): string {
  return JSON.stringify(sortKeys(obj))
}

function sortKeys(obj: any): any {
  if (obj === null || obj === undefined || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(sortKeys)
  const sorted: any = {}
  for (const key of Object.keys(obj).sort()) {
    sorted[key] = sortKeys(obj[key])
  }
  return sorted
}

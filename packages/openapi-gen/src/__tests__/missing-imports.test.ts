import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { generate } from '../index'

describe('no missing imports in generated cloudflare code', () => {
  const specPath = resolve(__dirname, '../../../examples/cloudflare/spec.json')
  let spec: any
  try { spec = JSON.parse(readFileSync(specPath, 'utf-8')) } catch {}

  it.skipIf(!spec)('all schema references are imported or defined locally', async () => {
    const files = await generate({
      spec,
      stripPrefixes: ['/accounts/{account_id}', '/zones/{zone_id}'],
    })

    // Collect all exported schema var names from all schemas.ts files
    const allSchemaVars = new Set<string>()
    for (const [path, content] of files) {
      if (!path.endsWith('schemas.ts')) continue
      for (const m of content.matchAll(/export\s+const\s+(\w+)/g)) {
        allSchemaVars.add(m[1])
      }
    }

    const issues: string[] = []

    for (const [path, content] of files) {
      if (path === 'index.ts' || !path.endsWith('.ts')) continue

      // Collect imported + defined names (handle multi-line imports from Biome formatting)
      const available = new Set<string>()
      for (const m of content.matchAll(/import\s+\{([^}]+)\}\s+from/g)) {
        m[1].split(',').forEach(n => available.add(n.trim()))
      }
      for (const m of content.matchAll(/(?:export\s+)?const\s+(\w+)/g)) {
        available.add(m[1])
      }

      // Extract all PascalCase identifiers from code lines (not imports/definitions/strings)
      for (const line of content.split('\n')) {
        const trimmed = line.trimStart()
        if (trimmed.startsWith('import ') || trimmed.startsWith('export const ')) continue

        // Strip string literals to avoid false positives
        const noStrings = line.replace(/"[^"]*"/g, '""').replace(/'[^']*'/g, "''")

        for (const m of noStrings.matchAll(/\b([A-Z][A-Za-z0-9]{2,})\b/g)) {
          const name = m[1]
          if (!allSchemaVars.has(name)) continue // only care about known schema vars
          if (available.has(name)) continue
          issues.push(`${path}: '${name}' used but not imported`)
        }
      }
    }

    const unique = [...new Set(issues)]
    if (unique.length > 0) {
      const sample = unique.slice(0, 30).join('\n')
      expect.fail(`Found ${unique.length} missing imports:\n${sample}`)
    }
  })
})

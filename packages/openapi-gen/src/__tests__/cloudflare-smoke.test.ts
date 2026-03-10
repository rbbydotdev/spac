import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { generate, findDuplicateSchemas } from '../index'

describe('cloudflare spec smoke test', () => {
  const specPath = resolve(__dirname, '../../../examples/cloudflare/spec.json')
  let spec: any

  try {
    spec = JSON.parse(readFileSync(specPath, 'utf-8'))
  } catch {
    // Skip if spec file not available
  }

  const cfPrefixes = ['/accounts/{account_id}', '/zones/{zone_id}', '/organizations/{organization_id}']

  it.skipIf(!spec)('generates without crashing', async () => {
    const files = await generate({ spec, stripPrefixes: cfPrefixes })

    expect(files.has('index.ts')).toBe(true)
    expect(files.has('shared/schemas.ts')).toBe(true)

    // Should have grouped dirs, not 373 separate ones
    const groups = new Set<string>()
    for (const path of files.keys()) {
      const parts = path.split('/')
      if (parts.length > 1 && parts[0] !== 'shared') groups.add(parts[0])
    }
    // With prefix stripping, should be significantly fewer groups
    expect(groups.size).toBeLessThan(200)
    expect(groups.size).toBeGreaterThan(5)
  })

  it.skipIf(!spec)('deduplicates schemas', () => {
    const dupes = findDuplicateSchemas(spec)
    // CF spec should have a meaningful number of duplicates
    expect(dupes.size).toBeGreaterThan(0)
  })

  it.skipIf(!spec)('splits schemas between shared and groups', async () => {
    const files = await generate({ spec, stripPrefixes: cfPrefixes })

    const sharedSchemas = files.get('shared/schemas.ts')!
    expect(sharedSchemas).toContain('export const')

    // Some groups should have their own schemas.ts
    const groupSchemaFiles = Array.from(files.keys()).filter(
      k => k.endsWith('/schemas.ts') && !k.startsWith('shared/')
    )
    expect(groupSchemaFiles.length).toBeGreaterThan(0)
  })

  it.skipIf(!spec)('endpoint files have register functions', async () => {
    const files = await generate({ spec, stripPrefixes: cfPrefixes })
    const endpoints = Array.from(files.entries()).filter(([k]) => k.endsWith('/index.ts'))

    for (const [, content] of endpoints) {
      expect(content).toContain('export function register')
      expect(content).toContain('api: Api')
    }
  })
})

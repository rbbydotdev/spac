import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const specPath = resolve(__dirname, 'spec.json')
const indexPath = resolve(__dirname, 'index.ts')

describe('cloudflare roundtrip', () => {
  const original = JSON.parse(readFileSync(specPath, 'utf8'))
  const emitted = JSON.parse(
    execSync(`npx tsx ${indexPath}`, { cwd: resolve(__dirname, '..'), maxBuffer: 100 * 1024 * 1024 }).toString(),
  )

  it('emitted spec is not larger than original', () => {
    const origLines = JSON.stringify(original, null, 2).split('\n').length
    const emitLines = JSON.stringify(emitted, null, 2).split('\n').length
    const ratio = emitLines / origLines

    console.log(`  original: ${origLines.toLocaleString()} lines`)
    console.log(`  emitted:  ${emitLines.toLocaleString()} lines (${((ratio - 1) * 100).toFixed(1)}%)`)

    expect(ratio).toBeLessThanOrEqual(1.05)
  })

  it('has all original paths', () => {
    const origPaths = Object.keys(original.paths).sort()
    const emitPaths = Object.keys(emitted.paths).sort()
    expect(emitPaths).toEqual(origPaths)
  })

  it('has all operations per path', () => {
    const methods = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace']
    for (const path of Object.keys(original.paths)) {
      const origMethods = methods.filter(m => original.paths[path][m])
      const emitMethods = methods.filter(m => emitted.paths[path]?.[m])
      expect(emitMethods, path).toEqual(origMethods)
    }
  })

  it('preserves operationIds', () => {
    const origOps = new Set<string>()
    const emitOps = new Set<string>()

    for (const pathItem of Object.values(original.paths)) {
      for (const op of Object.values(pathItem as any)) {
        if (op?.operationId) origOps.add(op.operationId)
      }
    }
    for (const pathItem of Object.values(emitted.paths)) {
      for (const op of Object.values(pathItem as any)) {
        if (op?.operationId) emitOps.add(op.operationId)
      }
    }

    expect(emitOps).toEqual(origOps)
  })

  it('uses $ref in component schemas (not inlined)', () => {
    function countRefs(obj: any): number {
      if (!obj || typeof obj !== 'object') return 0
      if (Array.isArray(obj)) return obj.reduce((a, v) => a + countRefs(v), 0)
      let n = obj.$ref ? 1 : 0
      for (const v of Object.values(obj)) n += countRefs(v)
      return n
    }

    const origSchemaRefs = countRefs(original.components?.schemas)
    const emitSchemaRefs = countRefs(emitted.components?.schemas)

    console.log(`  original schema $refs: ${origSchemaRefs}`)
    console.log(`  emitted schema $refs:  ${emitSchemaRefs}`)

    // Should have a meaningful number of $refs, not all inlined
    expect(emitSchemaRefs).toBeGreaterThan(origSchemaRefs * 0.5)
  })
})

import { describe, it, expect } from 'vitest'
import { generateSourceMap } from '../sourcemap.js'

describe('V3 source map generation', () => {
  it('produces valid V3 structure', () => {
    const map = generateSourceMap('spec.json', [
      { outLine: 0, outCol: 0, srcFile: 'src/api.ts', srcLine: 0, srcCol: 0 },
    ])

    expect(map.version).toBe(3)
    expect(map.file).toBe('spec.json')
    expect(map.sources).toEqual(['src/api.ts'])
    expect(map.names).toEqual([])
    expect(typeof map.mappings).toBe('string')
  })

  it('indexes multiple source files', () => {
    const map = generateSourceMap('spec.json', [
      { outLine: 0, outCol: 0, srcFile: 'src/api.ts', srcLine: 0, srcCol: 0 },
      { outLine: 1, outCol: 0, srcFile: 'src/routes.ts', srcLine: 5, srcCol: 0 },
    ])

    expect(map.sources).toEqual(['src/api.ts', 'src/routes.ts'])
  })

  it('produces semicolon-separated lines', () => {
    const map = generateSourceMap('spec.json', [
      { outLine: 0, outCol: 0, srcFile: 'src/api.ts', srcLine: 0, srcCol: 0 },
      { outLine: 2, outCol: 4, srcFile: 'src/api.ts', srcLine: 10, srcCol: 2 },
    ])

    const lines = map.mappings.split(';')
    // Line 0 has a mapping, line 1 is empty, line 2 has a mapping
    expect(lines.length).toBe(3)
    expect(lines[0]).not.toBe('')
    expect(lines[1]).toBe('')
    expect(lines[2]).not.toBe('')
  })

  it('handles empty mappings', () => {
    const map = generateSourceMap('spec.json', [])
    expect(map.mappings).toBe('')
    expect(map.sources).toEqual([])
  })

  it('sorts segments by column within a line', () => {
    const map = generateSourceMap('spec.json', [
      { outLine: 0, outCol: 10, srcFile: 'src/api.ts', srcLine: 5, srcCol: 0 },
      { outLine: 0, outCol: 2, srcFile: 'src/api.ts', srcLine: 3, srcCol: 0 },
    ])

    // Should have comma-separated segments on line 0
    const lines = map.mappings.split(';')
    expect(lines[0]).toContain(',')
  })
})

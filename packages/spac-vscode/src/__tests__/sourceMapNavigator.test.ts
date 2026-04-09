import { describe, it, expect } from 'vitest'
import { SourceMapNavigator } from '../sourceMapNavigator.js'

import { GenMapping, addMapping, toEncodedMap } from '@jridgewell/gen-mapping'

// Builds a source map with known mappings:
// Generated line 1 → fileA.ts line 10
// Generated line 5 → fileA.ts line 20
// Generated line 10 → fileB.ts line 3
// Generated line 15 → fileB.ts line 8
// Generated line 20 → fileA.ts line 30

function buildSourceMap(): string {
  const map = new GenMapping({ file: 'openapi.yaml' })

  // Generated line 1, col 0 → fileA.ts line 10, col 0
  addMapping(map, { generated: { line: 1, column: 0 }, source: 'fileA.ts', original: { line: 10, column: 0 } })
  // Generated line 5, col 0 → fileA.ts line 20, col 0
  addMapping(map, { generated: { line: 5, column: 0 }, source: 'fileA.ts', original: { line: 20, column: 0 } })
  // Generated line 10, col 0 → fileB.ts line 3, col 0
  addMapping(map, { generated: { line: 10, column: 0 }, source: 'fileB.ts', original: { line: 3, column: 0 } })
  // Generated line 15, col 0 → fileB.ts line 8, col 0
  addMapping(map, { generated: { line: 15, column: 0 }, source: 'fileB.ts', original: { line: 8, column: 0 } })
  // Generated line 20, col 0 → fileA.ts line 30, col 0
  addMapping(map, { generated: { line: 20, column: 0 }, source: 'fileA.ts', original: { line: 30, column: 0 } })

  return JSON.stringify(toEncodedMap(map))
}

describe('SourceMapNavigator', () => {
  const sourceMapJson = buildSourceMap()

  describe('yamlToTs', () => {
    it('returns exact match for mapped YAML line', () => {
      const nav = new SourceMapNavigator(sourceMapJson)
      const result = nav.yamlToTs(1)
      expect(result).toEqual({ source: 'fileA.ts', line: 10, exact: true })
    })

    it('returns exact match for another source file', () => {
      const nav = new SourceMapNavigator(sourceMapJson)
      const result = nav.yamlToTs(10)
      expect(result).toEqual({ source: 'fileB.ts', line: 3, exact: true })
    })

    it('returns floor match for unmapped YAML line between mapped lines', () => {
      const nav = new SourceMapNavigator(sourceMapJson)
      // Line 3 is between line 1 and line 5, floor is line 1
      const result = nav.yamlToTs(3)
      expect(result).not.toBeNull()
      expect(result!.source).toBe('fileA.ts')
      expect(result!.line).toBe(10) // maps to the floor (line 1 → fileA.ts:10)
      expect(result!.exact).toBe(false)
    })

    it('returns floor match for line after all mappings', () => {
      const nav = new SourceMapNavigator(sourceMapJson)
      const result = nav.yamlToTs(100)
      expect(result).not.toBeNull()
      expect(result!.source).toBe('fileA.ts')
      expect(result!.line).toBe(30) // floor is line 20 → fileA.ts:30
      expect(result!.exact).toBe(false)
    })
  })

  describe('tsToYaml', () => {
    it('returns exact match for mapped TS line', () => {
      const nav = new SourceMapNavigator(sourceMapJson)
      const result = nav.tsToYaml('fileA.ts', 10)
      expect(result).toEqual({ line: 1, exact: true })
    })

    it('returns exact match for fileB', () => {
      const nav = new SourceMapNavigator(sourceMapJson)
      const result = nav.tsToYaml('fileB.ts', 3)
      expect(result).toEqual({ line: 10, exact: true })
    })

    it('returns floor match for unmapped TS line', () => {
      const nav = new SourceMapNavigator(sourceMapJson)
      // fileA.ts line 15 is between 10 and 20, floor is 10 → yaml line 1
      const result = nav.tsToYaml('fileA.ts', 15)
      expect(result).not.toBeNull()
      expect(result!.line).toBe(1)
      expect(result!.exact).toBe(false)
    })

    it('returns null for unknown source file', () => {
      const nav = new SourceMapNavigator(sourceMapJson)
      const result = nav.tsToYaml('unknown.ts', 10)
      expect(result).toBeNull()
    })
  })

  describe('getSources', () => {
    it('returns all source files', () => {
      const nav = new SourceMapNavigator(sourceMapJson)
      const sources = nav.getSources()
      expect(sources).toContain('fileA.ts')
      expect(sources).toContain('fileB.ts')
      expect(sources).toHaveLength(2)
    })
  })

  describe('rebuild', () => {
    it('replaces old mappings with new ones', () => {
      const nav = new SourceMapNavigator(sourceMapJson)
      expect(nav.yamlToTs(1)?.source).toBe('fileA.ts')

      // Build a new map where line 1 maps to fileC.ts
      const map2 = new GenMapping({ file: 'openapi.yaml' })
      addMapping(map2, { generated: { line: 1, column: 0 }, source: 'fileC.ts', original: { line: 5, column: 0 } })
      nav.rebuild(JSON.stringify(toEncodedMap(map2)))

      expect(nav.yamlToTs(1)?.source).toBe('fileC.ts')
      expect(nav.getSources()).toEqual(['fileC.ts'])
    })
  })
})

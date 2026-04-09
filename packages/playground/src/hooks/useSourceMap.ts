import { useMemo } from 'react'
import { TraceMap, eachMapping } from '@jridgewell/trace-mapping'

export interface SourceMapData {
  version: number
  file: string
  sources: string[]
  sourcesContent?: (string | null)[]
  mappings: string
}

export interface TsPosition {
  source: string
  line: number
  exact: boolean
}

export interface YamlPosition {
  line: number
  exact: boolean
}

/**
 * Precomputes bidirectional line maps from a Source Map V3.
 *
 * Now file-aware: yaml→ts returns `{ source, line, exact }` so the viewer
 * knows which source file to open.  ts→yaml takes a source file param
 * and uses per-source-file maps.
 */
export function useSourceMap(sourceMap: SourceMapData) {
  const { yamlToTsMap, tsToYamlMaps, mappedYamlLines, mappedTsLinesBySource } = useMemo(() => {
    const traceMap = new TraceMap(sourceMap as any)

    // yaml line → { source, line }
    const y2t = new Map<number, { source: string; line: number }>()
    // source file → (ts line → yaml line)
    const t2yBySource = new Map<string, Map<number, number>>()

    eachMapping(traceMap, (m) => {
      if (m.originalLine == null || m.source == null) return

      if (!y2t.has(m.generatedLine)) {
        y2t.set(m.generatedLine, { source: m.source, line: m.originalLine })
      }

      let sourceMap = t2yBySource.get(m.source)
      if (!sourceMap) {
        sourceMap = new Map()
        t2yBySource.set(m.source, sourceMap)
      }
      if (!sourceMap.has(m.originalLine)) {
        sourceMap.set(m.originalLine, m.generatedLine)
      }
    })

    const sortedYaml = Array.from(y2t.keys()).sort((a, b) => a - b)

    const sortedTsBySource = new Map<string, number[]>()
    for (const [source, map] of t2yBySource) {
      sortedTsBySource.set(source, Array.from(map.keys()).sort((a, b) => a - b))
    }

    return {
      yamlToTsMap: y2t,
      tsToYamlMaps: t2yBySource,
      mappedYamlLines: sortedYaml,
      mappedTsLinesBySource: sortedTsBySource,
    }
  }, [sourceMap])

  const yamlToTs = useMemo(() => {
    return (yamlLine: number): TsPosition | null => {
      const exact = yamlToTsMap.get(yamlLine)
      if (exact != null) return { source: exact.source, line: exact.line, exact: true }

      const floor = findFloor(mappedYamlLines, yamlLine)
      if (floor != null) {
        const val = yamlToTsMap.get(floor)!
        return { source: val.source, line: val.line, exact: false }
      }
      return null
    }
  }, [yamlToTsMap, mappedYamlLines])

  const tsToYaml = useMemo(() => {
    return (source: string, tsLine: number): YamlPosition | null => {
      const sourceMap = tsToYamlMaps.get(source)
      if (!sourceMap) return null

      const exact = sourceMap.get(tsLine)
      if (exact != null) return { line: exact, exact: true }

      const sortedLines = mappedTsLinesBySource.get(source)
      if (!sortedLines) return null

      const floor = findFloor(sortedLines, tsLine)
      if (floor != null) {
        return { line: sourceMap.get(floor)!, exact: false }
      }
      return null
    }
  }, [tsToYamlMaps, mappedTsLinesBySource])

  return { yamlToTs, tsToYaml }
}

/**
 * Find the largest value in a sorted array that is <= target.
 * This is the "floor" operation — it ensures we stay within the
 * current document section rather than jumping to the next one.
 */
function findFloor(sorted: number[], target: number): number | null {
  if (sorted.length === 0) return null
  // If target is before all mapped lines, return the first one
  if (target < sorted[0]) return sorted[0]
  let lo = 0
  let hi = sorted.length - 1
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1
    if (sorted[mid] <= target) lo = mid
    else hi = mid - 1
  }
  return sorted[lo]
}

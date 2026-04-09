import { TraceMap, eachMapping } from '@jridgewell/trace-mapping'

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
 * Bidirectional source map navigator.
 * Ported from spacview's useSourceMap hook — same logic, no React dependency.
 */
export class SourceMapNavigator {
  private yamlToTsMap = new Map<number, { source: string; line: number }>()
  private tsToYamlMaps = new Map<string, Map<number, number>>()
  private mappedYamlLines: number[] = []
  private mappedTsLinesBySource = new Map<string, number[]>()

  constructor(sourceMapJson: string) {
    this.rebuild(sourceMapJson)
  }

  rebuild(sourceMapJson: string) {
    const parsed = JSON.parse(sourceMapJson)
    const traceMap = new TraceMap(parsed)

    const y2t = new Map<number, { source: string; line: number }>()
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

    this.yamlToTsMap = y2t
    this.tsToYamlMaps = t2yBySource
    this.mappedYamlLines = Array.from(y2t.keys()).sort((a, b) => a - b)

    this.mappedTsLinesBySource = new Map()
    for (const [source, map] of t2yBySource) {
      this.mappedTsLinesBySource.set(source, Array.from(map.keys()).sort((a, b) => a - b))
    }
  }

  yamlToTs(yamlLine: number): TsPosition | null {
    const exact = this.yamlToTsMap.get(yamlLine)
    if (exact != null) return { source: exact.source, line: exact.line, exact: true }

    const floor = findFloor(this.mappedYamlLines, yamlLine)
    if (floor != null) {
      const val = this.yamlToTsMap.get(floor)!
      return { source: val.source, line: val.line, exact: false }
    }
    return null
  }

  tsToYaml(source: string, tsLine: number): YamlPosition | null {
    const sourceMap = this.tsToYamlMaps.get(source)
    if (!sourceMap) return null

    const exact = sourceMap.get(tsLine)
    if (exact != null) return { line: exact, exact: true }

    const sortedLines = this.mappedTsLinesBySource.get(source)
    if (!sortedLines) return null

    const floor = findFloor(sortedLines, tsLine)
    if (floor != null) {
      return { line: sourceMap.get(floor)!, exact: false }
    }
    return null
  }

  /** Get all source files known to the source map. */
  getSources(): string[] {
    return Array.from(this.tsToYamlMaps.keys())
  }
}

/**
 * Find the largest value in a sorted array that is <= target.
 * If target is before all values, returns the first one.
 */
function findFloor(sorted: number[], target: number): number | null {
  if (sorted.length === 0) return null
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

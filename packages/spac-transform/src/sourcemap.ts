import { encodeSegments } from './vlq.js'

/**
 * A single mapping: output position → source position.
 */
export interface Mapping {
  /** 0-based output line */
  outLine: number
  /** 0-based output column */
  outCol: number
  /** Source file path */
  srcFile: string
  /** 0-based source line */
  srcLine: number
  /** 0-based source column */
  srcCol: number
}

/**
 * V3 source map object.
 */
export interface V3SourceMap {
  version: 3
  file: string
  sources: string[]
  names: string[]
  mappings: string
}

/**
 * Build a V3 source map from a list of mappings.
 */
export function generateSourceMap(
  outputFile: string,
  mappings: Mapping[],
): V3SourceMap {
  // Build file index
  const fileToIdx = new Map<string, number>()
  const sources: string[] = []

  for (const m of mappings) {
    if (!fileToIdx.has(m.srcFile)) {
      fileToIdx.set(m.srcFile, sources.length)
      sources.push(m.srcFile)
    }
  }

  // Group mappings by output line, sort by column
  const byLine = new Map<number, Mapping[]>()
  for (const m of mappings) {
    let arr = byLine.get(m.outLine)
    if (!arr) {
      arr = []
      byLine.set(m.outLine, arr)
    }
    arr.push(m)
  }

  // Find max output line
  let maxLine = 0
  for (const m of mappings) {
    if (m.outLine > maxLine) maxLine = m.outLine
  }

  // Encode
  const state = { prevCol: 0, prevSrcFile: 0, prevSrcLine: 0, prevSrcCol: 0 }
  const lines: string[] = []

  for (let line = 0; line <= maxLine; line++) {
    const lineMap = byLine.get(line)
    if (!lineMap || lineMap.length === 0) {
      lines.push('')
      continue
    }

    lineMap.sort((a, b) => a.outCol - b.outCol)

    const segments: [number, number, number, number][] = lineMap.map(m => [
      m.outCol,
      fileToIdx.get(m.srcFile)!,
      m.srcLine,
      m.srcCol,
    ])

    lines.push(encodeSegments(segments, state))
  }

  return {
    version: 3,
    file: outputFile,
    sources,
    names: [],
    mappings: lines.join(';'),
  }
}

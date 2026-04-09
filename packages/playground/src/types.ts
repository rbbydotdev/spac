import type { SourceMapData } from './hooks/useSourceMap'

export interface SourceTableEntry {
  path: string
  kind: string
  detail?: string
  source: { file: string; line: number; column: number }
}

export interface Manifest {
  files: string[]
  yaml: string
  sourceMap: SourceMapData
  sourceTable: SourceTableEntry[]
}

export interface ExampleIndexEntry {
  name: string
  manifestSize: number
}


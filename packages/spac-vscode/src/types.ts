export interface CompileResult {
  yaml: string
  sourceMap: string
  sourceTable: SerializedSourceEntry[]
}

export interface CompileError {
  message: string
  file?: string
  line?: number
  column?: number
}

export interface CompileResponse {
  ok: true
  result: CompileResult
}

export interface CompileErrorResponse {
  ok: false
  error: string
}

export type WorkerResponse = CompileResponse | CompileErrorResponse

export interface WorkerRequest {
  entryFile: string
}

export interface SerializedSourceEntry {
  path: string
  kind: string
  detail?: string
  source: {
    file: string
    line: number
    column: number
  }
}

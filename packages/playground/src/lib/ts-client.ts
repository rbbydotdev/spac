/**
 * Promise-based client for the TypeScript language service web worker.
 */

import type { WorkerResponse } from '../workers/ts-worker'

export interface QuickInfo {
  displayParts: string
  documentation: string
  tags: { name: string; text: string }[]
  textSpan: { start: number; length: number }
  kind: string
}

export interface DefinitionInfo {
  fileName: string
  textSpan: { start: number; length: number }
  kind: string
  name: string
}

export class TsWorkerClient {
  private worker: Worker
  private pending = new Map<number, { resolve: (v: any) => void; reject: (e: any) => void }>()
  private nextId = 0
  private _ready = false

  constructor() {
    this.worker = new Worker(
      new URL('../workers/ts-worker.ts', import.meta.url),
      { type: 'module' },
    )
    this.worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const { id, result, error } = e.data
      const p = this.pending.get(id)
      if (!p) return
      this.pending.delete(id)
      if (error) p.reject(new Error(error))
      else p.resolve(result)
    }
  }

  get ready() { return this._ready }

  private call<T>(method: string, params: Record<string, unknown>): Promise<T> {
    return new Promise((resolve, reject) => {
      const id = this.nextId++
      this.pending.set(id, { resolve, reject })
      this.worker.postMessage({ id, method, params })
    })
  }

  async init(declarations: Record<string, string>, sourceFiles: Record<string, string>) {
    await this.call('init', { declarations, sourceFiles })
    this._ready = true
  }

  updateFiles(sourceFiles: Record<string, string>) {
    return this.call('updateFiles', { sourceFiles })
  }

  quickInfo(fileName: string, position: number): Promise<QuickInfo | null> {
    return this.call('quickInfo', { fileName, position })
  }

  definition(fileName: string, position: number, projectFiles: string[]): Promise<DefinitionInfo[]> {
    return this.call('definition', { fileName, position, projectFiles })
  }

  dispose() {
    this._ready = false
    this.worker.terminate()
    for (const p of this.pending.values()) {
      p.reject(new Error('Worker terminated'))
    }
    this.pending.clear()
  }
}

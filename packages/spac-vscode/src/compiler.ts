import { fork, type ChildProcess } from 'node:child_process'
import * as path from 'node:path'
import type { CompileResult, WorkerRequest, WorkerResponse } from './types.js'

const TIMEOUT_MS = 15_000

export class Compiler {
  private workerPath: string

  constructor(extensionPath: string) {
    this.workerPath = path.join(extensionPath, 'dist', 'compiler-worker.js')
  }

  async compile(entryFile: string): Promise<CompileResult> {
    return new Promise((resolve, reject) => {
      let child: ChildProcess | null = null
      let settled = false

      const cleanup = () => {
        if (child && !child.killed) {
          child.kill()
        }
      }

      const timer = setTimeout(() => {
        if (!settled) {
          settled = true
          cleanup()
          reject(new Error(`Compilation timed out after ${TIMEOUT_MS}ms`))
        }
      }, TIMEOUT_MS)

      try {
        child = fork(this.workerPath, [], {
          execArgv: ['--import', 'tsx'],
          stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
          cwd: path.dirname(entryFile),
        })
      } catch (err) {
        clearTimeout(timer)
        reject(new Error(`Failed to fork compiler worker: ${err}`))
        return
      }

      child.on('message', (msg: WorkerResponse) => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        cleanup()

        if (msg.ok) {
          resolve(msg.result)
        } else {
          reject(new Error(msg.error))
        }
      })

      child.on('error', (err) => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        cleanup()
        reject(new Error(`Compiler worker error: ${err.message}`))
      })

      child.on('exit', (code) => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        if (code !== 0) {
          reject(new Error(`Compiler worker exited with code ${code}`))
        }
      })

      const request: WorkerRequest = { entryFile }
      child.send(request)
    })
  }
}

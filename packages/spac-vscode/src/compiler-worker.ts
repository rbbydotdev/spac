import type { WorkerRequest, WorkerResponse } from './types.js'

process.on('message', async (msg: WorkerRequest) => {
  try {
    const mod = await import(msg.entryFile)
    const api = mod.api ?? mod.default

    if (!api || typeof api.emit !== 'function') {
      const response: WorkerResponse = {
        ok: false,
        error:
          'No Api instance found. Your entry file must export `api` or a default export with an .emit() method.',
      }
      process.send!(response)
      return
    }

    const result = api.emit({ yaml: true, sourceMap: true, sourceTable: true })

    // Import spac helpers for serialization
    const { prepareSourceMap, serializeSourceTable } = await import('spac')

    const sourceMap = prepareSourceMap(result.sourceMap!, { relativizePaths: false })
    const sourceTable = serializeSourceTable(result.sourceTable!, { relativizePaths: false })

    const response: WorkerResponse = {
      ok: true,
      result: {
        yaml: result.yaml!,
        sourceMap: JSON.stringify(sourceMap),
        sourceTable,
      },
    }
    process.send!(response)
  } catch (err) {
    const response: WorkerResponse = {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    }
    process.send!(response)
  }
})

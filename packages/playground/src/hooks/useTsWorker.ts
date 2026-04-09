import { useRef, useEffect, useState } from 'react'
import { TsWorkerClient } from '../lib/ts-client'
import { baseUrl } from '../lib/base'

/**
 * Manages the TypeScript language service worker lifecycle.
 *
 * - Creates the worker on mount
 * - Fetches declarations.json and initializes the language service
 *   with the project's source files
 * - Returns the client instance (null until ready)
 */
export function useTsWorker(
  /** All file paths in the manifest */
  files: string[],
  /** Current example name (e.g. 'petstore') for fetching source files */
  example: string,
) {
  const clientRef = useRef<TsWorkerClient | null>(null)
  const [ready, setReady] = useState(false)
  const initRef = useRef(false)

  useEffect(() => {
    // Avoid double-init in strict mode
    if (initRef.current) return
    initRef.current = true

    const client = new TsWorkerClient()
    clientRef.current = client

    ;(async () => {
      try {
        // Fetch declarations and source files in parallel
        const [declRes, ...sourceResults] = await Promise.all([
          fetch(`${baseUrl}declarations.json`).then(r => r.json()),
          ...files.map(async (file) => {
            const res = await fetch(`${baseUrl}data/${example}/sources/${file}`)
            if (!res.ok) return { file, content: '' }
            return { file, content: await res.text() }
          }),
        ])

        const declarations = declRes as Record<string, string>
        const sourceFiles: Record<string, string> = {}
        for (const { file, content } of sourceResults) {
          sourceFiles[`/project/${file}`] = content
        }

        await client.init(declarations, sourceFiles)
        setReady(true)
      } catch (err) {
        console.warn('[useTsWorker] Failed to initialize:', err)
      }
    })()

    return () => {
      client.dispose()
      clientRef.current = null
      initRef.current = false
      setReady(false)
    }
  }, [files, example])

  return { client: ready ? clientRef.current : null, ready }
}

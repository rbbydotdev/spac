import { useState, useRef, useCallback } from 'react'
import { baseUrl } from '../lib/base'

export function useFileLoader(example: string) {
  const [activeFile, setActiveFile] = useState<string | null>(null)
  const [activeContent, setActiveContent] = useState<string | null>(null)
  const fileCache = useRef<Map<string, string>>(new Map())

  const fetchFile = useCallback(async (path: string): Promise<string> => {
    const cached = fileCache.current.get(path)
    if (cached != null) return cached
    const res = await fetch(`${baseUrl}data/${example}/sources/${path}`)
    if (!res.ok) throw new Error(`Failed to fetch source: ${path}`)
    const text = await res.text()
    fileCache.current.set(path, text)
    return text
  }, [example])

  const openFile = useCallback(async (path: string): Promise<string> => {
    const content = await fetchFile(path)
    setActiveFile(path)
    setActiveContent(content)
    return content
  }, [fetchFile])

  const prefetch = useCallback((path: string) => {
    fetchFile(path).catch(() => {})
  }, [fetchFile])

  return { activeFile, activeContent, openFile, prefetch }
}

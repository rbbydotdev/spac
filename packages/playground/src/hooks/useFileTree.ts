import { useState, useCallback, useRef, useEffect } from 'react'
import { TreeNode } from '../lib/tree'
import type { FileSystemProvider } from '../lib/fs'

export interface PendingEntry {
  parentPath: string
  isDirectory: boolean
}

export function useFileTree(rootPath: string, fs: FileSystemProvider) {
  const [version, setVersion] = useState(0)
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [pendingEntry, setPendingEntry] = useState<PendingEntry | null>(null)

  // Root node rebuilds when fs changes
  const rootRef = useRef<{ fs: FileSystemProvider; node: TreeNode } | null>(null)
  if (!rootRef.current || rootRef.current.fs !== fs) {
    const name = rootPath.split('/').filter(Boolean).pop() || '/'
    rootRef.current = { fs, node: new TreeNode(name, rootPath, true) }
  }

  const bump = useCallback(() => setVersion(v => v + 1), [])

  // Expand root on mount and whenever fs changes
  useEffect(() => {
    rootRef.current!.node.expand(fs).then(bump)
  }, [fs, bump])

  const toggle = useCallback(async (node: TreeNode) => {
    await node.toggle(fs)
    bump()
  }, [fs, bump])

  const select = useCallback((path: string) => {
    setSelectedPath(path)
  }, [])

  const startNewEntry = useCallback((parentPath: string, isDirectory: boolean) => {
    setPendingEntry({ parentPath, isDirectory })
  }, [])

  const commitNewEntry = useCallback(async (name: string) => {
    if (!pendingEntry || !name.trim()) {
      setPendingEntry(null)
      return
    }
    const parent = rootRef.current!.node.find(pendingEntry.parentPath)
    if (!parent) { setPendingEntry(null); return }
    if (!parent.isLoaded) await parent.expand(fs)
    parent.addChild(name.trim(), pendingEntry.isDirectory)
    if (!parent.isExpanded) await parent.expand(fs)
    setPendingEntry(null)
    bump()
  }, [pendingEntry, fs, bump])

  const cancelNewEntry = useCallback(() => {
    setPendingEntry(null)
  }, [])

  const removeEntry = useCallback((node: TreeNode) => {
    node.remove()
    if (selectedPath === node.path) setSelectedPath(null)
    bump()
  }, [selectedPath, bump])

  const revealPath = useCallback(async (targetPath: string) => {
    await rootRef.current!.node.expandToPath(targetPath, fs)
    bump()
  }, [fs, bump])

  const root = rootRef.current.node
  // Skip root itself — show its children at top level
  const visibleNodes = root.isExpanded ? root.flatten().slice(1) : []

  return {
    root,
    visibleNodes,
    selectedPath,
    pendingEntry,
    toggle,
    select,
    revealPath,
    startNewEntry,
    commitNewEntry,
    cancelNewEntry,
    removeEntry,
    version,
  }
}

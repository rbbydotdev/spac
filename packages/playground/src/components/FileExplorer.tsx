import { useState, useRef, useEffect, useCallback, useImperativeHandle, forwardRef, type KeyboardEvent, type Ref } from 'react'
import {
  Check,
  ChevronRight,
  File,
  FileCode2,
  FileJson,
  FileText,
  Folder,
  FolderOpen,
  // MoreHorizontal,
  FilePlus,
  FolderPlus,
  // Trash2,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { TreeNode } from '@/lib/tree'
import { useFileTree, type PendingEntry } from '@/hooks/useFileTree'
import type { FileSystemProvider } from '@/lib/fs'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
} from '@/components/ui/collapsible'
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
// } from '@/components/ui/dropdown-menu'

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function getIcon(node: TreeNode) {
  if (node.isDirectory) return node.isExpanded ? FolderOpen : Folder
  const ext = node.name.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'ts': case 'tsx': case 'js': case 'jsx': return FileCode2
    case 'json': return FileJson
    case 'md': case 'txt': return FileText
    default: return File
  }
}

function iconColor(node: TreeNode): string {
  if (node.isDirectory) return node.isExpanded
    ? 'text-sky-400'
    : 'text-sky-500/70'
  const ext = node.name.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'ts': case 'tsx': return 'text-blue-400'
    case 'js': case 'jsx': return 'text-yellow-400'
    case 'json': return 'text-amber-400/70'
    case 'md': return 'text-muted-foreground'
    default: return 'text-muted-foreground'
  }
}

// ---------------------------------------------------------------------------
// New entry popup
// ---------------------------------------------------------------------------

function NewEntryPopup({
  isDirectory,
  onCommit,
  onCancel,
}: {
  isDirectory: boolean
  onCommit: (name: string) => void
  onCancel: () => void
}) {
  const ref = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')

  useEffect(() => { ref.current?.focus() }, [])

  const commit = useCallback(() => {
    if (value.trim()) onCommit(value.trim())
    else onCancel()
  }, [value, onCommit, onCancel])

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); commit() }
    if (e.key === 'Escape') { e.preventDefault(); onCancel() }
  }

  const Icon = isDirectory ? FolderPlus : FilePlus

  return (
    <div className="mx-1.5 my-1 animate-in fade-in-0 zoom-in-95 duration-100">
      <div className="rounded-md border bg-popover p-2 shadow-md ring-1 ring-foreground/5">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground mb-1.5">
          <Icon className="size-3.5" />
          <span>{isDirectory ? 'New Folder' : 'New File'}</span>
        </div>
        <div className="flex items-center gap-1">
          <input
            ref={ref}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKey}
            className="flex-1 min-w-0 rounded border border-input bg-background px-2 py-1 text-[13px] text-foreground outline-none ring-ring focus:ring-1 transition-shadow"
            placeholder={isDirectory ? 'folder name…' : 'file name…'}
          />
          <button
            onClick={commit}
            disabled={!value.trim()}
            className="flex size-7 shrink-0 items-center justify-center rounded border border-input bg-background text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-40 disabled:pointer-events-none transition-colors"
            title="Create"
          >
            <Check className="size-3.5" />
          </button>
          <button
            onClick={onCancel}
            className="flex size-7 shrink-0 items-center justify-center rounded border border-input bg-background text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            title="Cancel"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tree item
// ---------------------------------------------------------------------------

function TreeItem({
  node,
  depth,
  selectedPath,
  onToggle,
  onSelect,
  onStartNew,
  onDelete,
  pendingEntry,
  onCommitNew,
  onCancelNew,
}: {
  node: TreeNode
  depth: number
  selectedPath: string | null
  onToggle: (node: TreeNode) => void
  onSelect: (path: string) => void
  onStartNew: (parentPath: string, isDirectory: boolean) => void
  onDelete: (node: TreeNode) => void
  pendingEntry: PendingEntry | null
  onCommitNew: (name: string) => void
  onCancelNew: () => void
}) {
  const Icon = getIcon(node)
  const color = iconColor(node)
  const isSelected = selectedPath === node.path
  const showPending = pendingEntry && pendingEntry.parentPath === node.path

  const handleClick = () => {
    if (node.isDirectory) onToggle(node)
    onSelect(node.path)
  }

  return (
    <>
      <div
        role="treeitem"
        aria-expanded={node.isDirectory ? node.isExpanded : undefined}
        aria-selected={isSelected}
        className={cn(
          'group/item flex items-center gap-1.5 h-7 pr-2 cursor-pointer select-none',
          'rounded-sm transition-colors duration-75',
          'hover:bg-sidebar-accent/60',
          isSelected && 'bg-sidebar-accent text-sidebar-accent-foreground',
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={handleClick}
      >
        {/* Chevron */}
        <span className="flex w-4 shrink-0 items-center justify-center">
          {node.isDirectory && (
            <ChevronRight
              className={cn(
                'size-3.5 text-muted-foreground transition-transform duration-200',
                node.isExpanded && 'rotate-90',
              )}
            />
          )}
        </span>

        {/* Icon */}
        <Icon className={cn('size-4 shrink-0', color)} />

        {/* Name */}
        <span className="flex-1 min-w-0 truncate text-[13px] leading-tight">
          {node.name}
        </span>

        {/* TODO: re-enable when editing is supported
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              'flex size-5 shrink-0 items-center justify-center rounded',
              'opacity-0 group-hover/item:opacity-100 transition-opacity duration-100',
              'hover:bg-sidebar-accent text-muted-foreground hover:text-foreground',
            )}
            onClick={e => e.stopPropagation()}
          >
            <MoreHorizontal className="size-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" sideOffset={4}>
            <DropdownMenuItem onClick={() => {
              const parentPath = node.isDirectory ? node.path : node.parent?.path
              if (parentPath) onStartNew(parentPath, false)
            }}>
              <FilePlus className="size-4" />
              <span>New File</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              const parentPath = node.isDirectory ? node.path : node.parent?.path
              if (parentPath) onStartNew(parentPath, true)
            }}>
              <FolderPlus className="size-4" />
              <span>New Folder</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => onDelete(node)}>
              <Trash2 className="size-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        */}
      </div>

      {/* Children */}
      {node.isDirectory && (
        <Collapsible open={node.isExpanded}>
          <CollapsibleContent className="file-tree-collapsible">
            {/* Pending new entry at the top of this folder's children */}
            {showPending && (
              <NewEntryPopup
                isDirectory={pendingEntry!.isDirectory}
                onCommit={onCommitNew}
                onCancel={onCancelNew}
              />
            )}
            {node.children?.map(child => (
              <TreeItem
                key={child.path}
                node={child}
                depth={depth + 1}
                selectedPath={selectedPath}
                onToggle={onToggle}
                onSelect={onSelect}
                onStartNew={onStartNew}
                onDelete={onDelete}
                pendingEntry={pendingEntry}
                onCommitNew={onCommitNew}
                onCancelNew={onCancelNew}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </>
  )
}

// ---------------------------------------------------------------------------
// FileExplorer (sidebar)
// ---------------------------------------------------------------------------

export interface FileExplorerHandle {
  revealAndScroll(path: string): void
}

interface FileExplorerProps {
  fs: FileSystemProvider
  selectedPath?: string | null
  onFileSelect?: (path: string) => void
}

export const FileExplorer = forwardRef(function FileExplorer(
  { fs, selectedPath: externalSelectedPath, onFileSelect }: FileExplorerProps,
  ref: Ref<FileExplorerHandle>,
) {
  const treeRef = useRef<HTMLDivElement>(null)
  const scrollPendingRef = useRef(false)
  const {
    root,
    selectedPath: internalSelectedPath,
    pendingEntry,
    toggle,
    select: internalSelect,
    revealPath,
    startNewEntry,
    commitNewEntry,
    cancelNewEntry,
    removeEntry,
  } = useFileTree('/', fs)

  // Use external selectedPath if provided, otherwise internal
  const selectedPath = externalSelectedPath !== undefined ? externalSelectedPath : internalSelectedPath

  const select = useCallback((path: string) => {
    internalSelect(path)
    onFileSelect?.(path)
  }, [internalSelect, onFileSelect])

  // Imperative: expand ancestors and scroll to the file after render
  useImperativeHandle(ref, () => ({
    revealAndScroll(path: string) {
      revealPath(path).then(() => {
        scrollPendingRef.current = true
      })
    },
  }))

  // After React re-renders with expanded tree, scroll to the selected item
  useEffect(() => {
    if (!scrollPendingRef.current) return
    scrollPendingRef.current = false
    const el = treeRef.current?.querySelector('[aria-selected="true"]')
    el?.scrollIntoView({ block: 'nearest' })
  })

  // Top-level nodes are root's children (root is auto-expanded)
  const topNodes = root.children ?? []

  return (
    <Sidebar collapsible="offcanvas" className="border-r-0">
      <SidebarHeader className="h-10 flex-row items-center justify-between border-b px-3 py-0">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-sidebar-foreground/60">
          Explorer
        </span>
        {/* TODO: re-enable when editing is supported
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => startNewEntry(root.path, false)}
            className="flex size-5 items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
            title="New File"
          >
            <FilePlus className="size-3.5" />
          </button>
          <button
            onClick={() => startNewEntry(root.path, true)}
            className="flex size-5 items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
            title="New Folder"
          >
            <FolderPlus className="size-3.5" />
          </button>
        </div>
        */}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="p-0 py-1">
          <div ref={treeRef} role="tree" className="text-sidebar-foreground">
            {/* Pending entry at root level */}
            {pendingEntry && pendingEntry.parentPath === root.path && (
              <NewEntryPopup
                isDirectory={pendingEntry.isDirectory}
                onCommit={commitNewEntry}
                onCancel={cancelNewEntry}
              />
            )}
            {topNodes.map(node => (
              <TreeItem
                key={node.path}
                node={node}
                depth={0}
                selectedPath={selectedPath}
                onToggle={toggle}
                onSelect={select}
                onStartNew={startNewEntry}
                onDelete={removeEntry}
                pendingEntry={pendingEntry}
                onCommitNew={commitNewEntry}
                onCancelNew={cancelNewEntry}
              />
            ))}
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
})

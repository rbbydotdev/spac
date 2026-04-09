import { joinPath, type FileSystemProvider } from './fs'

/**
 * In-memory tree node representing a file or directory.
 *
 * The tree is a synchronous data structure — traversal, flattening,
 * and mutations are all synchronous.  The only async operation is
 * `expand()`, which lazily loads children from a `FileSystemProvider`
 * the first time a directory is opened.  After that, children are
 * cached and subsequent expand/collapse cycles are free.
 */
export class TreeNode {
  name: string
  path: string
  isDirectory: boolean
  children: TreeNode[] | null = null
  parent: TreeNode | null = null

  private _expanded = false

  constructor(name: string, path: string, isDirectory: boolean) {
    this.name = name
    this.path = path
    this.isDirectory = isDirectory
  }

  /** Whether this directory is currently expanded AND has loaded children */
  get isExpanded(): boolean {
    return this._expanded && this.children !== null
  }

  /** Whether children have been fetched from the FS at least once */
  get isLoaded(): boolean {
    return this.children !== null
  }

  /** Nesting depth (0 for root) */
  get depth(): number {
    let d = 0
    let n: TreeNode | null = this.parent
    while (n) { d++; n = n.parent }
    return d
  }

  // -- Async FS operations -------------------------------------------------

  /** Load children (if needed) and mark expanded */
  async expand(fs: FileSystemProvider): Promise<void> {
    if (!this.isDirectory) return
    if (!this.isLoaded) {
      const names = await fs.readdir(this.path)
      const children: TreeNode[] = []
      for (const name of names) {
        const childPath = joinPath(this.path, name)
        const stat = await fs.stat(childPath)
        const child = new TreeNode(name, childPath, stat.isDirectory())
        child.parent = this
        children.push(child)
      }
      this.children = children
      this.sort()
    }
    this._expanded = true
  }

  /** Collapse — children stay cached */
  collapse(): void {
    this._expanded = false
  }

  /** Toggle expand/collapse */
  async toggle(fs: FileSystemProvider): Promise<void> {
    if (this._expanded) this.collapse()
    else await this.expand(fs)
  }

  // -- Traversal -----------------------------------------------------------

  /**
   * Depth-first walk.  Return `false` from `fn` to skip a node's children.
   */
  walk(fn: (node: TreeNode) => boolean | void): void {
    const skip = fn(this)
    if (skip === false) return
    if (this.children) {
      for (const child of this.children) child.walk(fn)
    }
  }

  /**
   * Return a flat list of *visible* nodes — expanded directories
   * contribute their children, collapsed ones don't.
   * The root itself is included at index 0.
   */
  flatten(): TreeNode[] {
    const out: TreeNode[] = []
    this.walk(node => {
      out.push(node)
      if (node.isDirectory && !node.isExpanded) return false
    })
    return out
  }

  /** Find a descendant by path */
  find(targetPath: string): TreeNode | null {
    let found: TreeNode | null = null
    this.walk(node => {
      if (node.path === targetPath) { found = node; return false }
    })
    return found
  }

  /**
   * Expand all ancestors along the path to `targetPath` so it becomes visible.
   * Returns the target node if found, or null.
   */
  async expandToPath(targetPath: string, fs: FileSystemProvider): Promise<TreeNode | null> {
    // Build the list of path segments to walk
    // e.g. targetPath="/access/index.ts" → segments=["access","index.ts"]
    const relPath = targetPath.startsWith(this.path)
      ? targetPath.slice(this.path.length).replace(/^\//, '')
      : targetPath.replace(/^\//, '')
    const segments = relPath.split('/').filter(Boolean)

    let current: TreeNode = this
    for (let i = 0; i < segments.length; i++) {
      await current.expand(fs)
      const child = current.children?.find(c => c.name === segments[i])
      if (!child) return null
      current = child
    }
    return current
  }

  // -- Mutations (in-memory only) ------------------------------------------

  /** Add a child entry.  Parent must be a directory. */
  addChild(name: string, isDirectory: boolean): TreeNode {
    if (!this.children) this.children = []
    const child = new TreeNode(name, joinPath(this.path, name), isDirectory)
    child.parent = this
    this.children.push(child)
    this.sort()
    return child
  }

  /** Remove this node from its parent's children list */
  remove(): void {
    if (!this.parent?.children) return
    const idx = this.parent.children.indexOf(this)
    if (idx !== -1) this.parent.children.splice(idx, 1)
    this.parent = null
  }

  /** Sort children: directories first, then case-insensitive alphabetical */
  sort(): void {
    if (!this.children) return
    this.children.sort((a, b) => {
      if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    })
  }
}

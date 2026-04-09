/**
 * Minimal filesystem provider interface.
 *
 * This is intentionally the smallest surface needed for tree indexing.
 * Implementations can back onto Node's `fs`, an in-memory map, an
 * HTTP API, or a browser-based virtual FS — the tree doesn't care.
 */
export interface FileSystemProvider {
  readdir(path: string): Promise<string[]>
  stat(path: string): Promise<{ isDirectory(): boolean }>
}

/** Simple POSIX-style path join for virtual paths */
export function joinPath(...parts: string[]): string {
  return parts
    .join('/')
    .replace(/\/+/g, '/')
    .replace(/\/$/, '') || '/'
}

// ---------------------------------------------------------------------------
// In-memory FS — useful for demos, tests, and until a real backend exists
// ---------------------------------------------------------------------------

interface MemEntry {
  isDir: boolean
  children?: Map<string, MemEntry>
}

export class MemoryFileSystem implements FileSystemProvider {
  private root: MemEntry = { isDir: true, children: new Map() }

  addFile(path: string): this {
    this.ensure(path, false)
    return this
  }

  addDirectory(path: string): this {
    this.ensure(path, true)
    return this
  }

  async readdir(path: string): Promise<string[]> {
    const entry = this.resolve(path)
    if (!entry?.isDir || !entry.children) return []
    return Array.from(entry.children.keys())
  }

  async stat(path: string): Promise<{ isDirectory(): boolean }> {
    const entry = this.resolve(path)
    const isDir = entry?.isDir ?? false
    return { isDirectory: () => isDir }
  }

  // --

  private ensure(path: string, isDir: boolean): void {
    const parts = path.split('/').filter(Boolean)
    let cur = this.root
    for (let i = 0; i < parts.length; i++) {
      if (!cur.children) cur.children = new Map()
      const last = i === parts.length - 1
      if (!cur.children.has(parts[i])) {
        cur.children.set(parts[i], {
          isDir: last ? isDir : true,
          children: last && !isDir ? undefined : new Map(),
        })
      }
      cur = cur.children.get(parts[i])!
    }
  }

  private resolve(path: string): MemEntry | null {
    const parts = path.split('/').filter(Boolean)
    let cur = this.root
    for (const p of parts) {
      if (!cur.children?.has(p)) return null
      cur = cur.children.get(p)!
    }
    return cur
  }
}

/** Build a MemoryFileSystem from a flat list of file paths */
export function createFsFromFileList(files: string[]): MemoryFileSystem {
  const fs = new MemoryFileSystem()
  for (const file of files) {
    fs.addFile('/' + file)
  }
  return fs
}

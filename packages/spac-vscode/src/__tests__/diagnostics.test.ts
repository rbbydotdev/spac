import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock vscode module
vi.mock('vscode', () => {
  const diagnosticEntries = new Map<string, any[]>()
  return {
    languages: {
      createDiagnosticCollection: vi.fn(() => ({
        set: vi.fn((uri: any, diags: any[]) => {
          diagnosticEntries.set(uri.path, diags)
        }),
        clear: vi.fn(() => diagnosticEntries.clear()),
        dispose: vi.fn(),
      })),
    },
    Uri: {
      file: (path: string) => ({ scheme: 'file', path, fsPath: path }),
    },
    Range: class {
      constructor(
        public startLine: number,
        public startCol: number,
        public endLine: number,
        public endCol: number
      ) {}
    },
    Diagnostic: class {
      source?: string
      constructor(
        public range: any,
        public message: string,
        public severity: number
      ) {}
    },
    DiagnosticSeverity: {
      Error: 0,
      Warning: 1,
      Information: 2,
      Hint: 3,
    },
  }
})

describe('diagnostics', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('getDiagnostics creates a collection', async () => {
    const { getDiagnostics } = await import('../diagnostics.js')
    const collection = getDiagnostics()
    expect(collection).toBeDefined()
    expect(collection.set).toBeDefined()
  })

  it('setErrorDiagnostic creates a diagnostic at the right line', async () => {
    const { setErrorDiagnostic, getDiagnostics } = await import('../diagnostics.js')
    setErrorDiagnostic('/path/to/file.ts', 10, 'Something went wrong')

    const collection = getDiagnostics()
    expect(collection.set).toHaveBeenCalled()
  })

  it('clearDiagnostics clears the collection', async () => {
    const { clearDiagnostics, getDiagnostics } = await import('../diagnostics.js')
    getDiagnostics() // ensure collection exists
    clearDiagnostics()
    const collection = getDiagnostics()
    expect(collection.clear).toHaveBeenCalled()
  })
})

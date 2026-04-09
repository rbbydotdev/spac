// @ts-nocheck — Worker is bundled separately by Vite; CJS interop for
// the `typescript` package doesn't satisfy verbatimModuleSyntax.
/**
 * Web Worker running a TypeScript Language Service.
 *
 * Provides hover info (quickInfo) and go-to-definition for read-only
 * source files displayed in the spacview CodeMirror pane.
 */

import ts from 'typescript'

// ── Virtual file system ──

const files = new Map<string, string>()
const fileVersions = new Map<string, number>()

// ── Language Service Host ──

const host: ts.LanguageServiceHost = {
  getScriptFileNames: () => Array.from(files.keys()).filter(f => f.endsWith('.ts') || f.endsWith('.tsx')),
  getScriptVersion: (fileName) => String(fileVersions.get(fileName) ?? 0),
  getScriptSnapshot: (fileName) => {
    const content = files.get(fileName)
    if (content != null) return ts.ScriptSnapshot.fromString(content)
    return undefined
  },
  getCurrentDirectory: () => '/project',
  getDefaultLibFileName: () => '/lib/lib.es5.d.ts',
  getCompilationSettings: () => ({
    target: ts.ScriptTarget.ES2023,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    // Allows TS to resolve the lib reference directives
    lib: ['lib.es5.d.ts', 'lib.es2015.d.ts', 'lib.es2016.d.ts', 'lib.es2017.d.ts',
      'lib.es2018.d.ts', 'lib.es2019.d.ts', 'lib.es2020.d.ts', 'lib.es2021.d.ts',
      'lib.es2022.d.ts', 'lib.es2023.d.ts'],
  }),
  fileExists: (fileName) => files.has(fileName),
  readFile: (fileName) => files.get(fileName),
  readDirectory: () => [],
  directoryExists: (dirName) => {
    for (const key of files.keys()) {
      if (key.startsWith(dirName + '/') || key === dirName) return true
    }
    return false
  },
  getDirectories: () => [],
  resolveModuleNameLiterals: (moduleLiterals, containingFile) => {
    return moduleLiterals.map((literal) => {
      const name = literal.text

      // Resolve bare specifiers (e.g. 'spac', '@sinclair/typebox')
      if (!name.startsWith('.') && !name.startsWith('/')) {
        // Try package.json resolution
        const pkgJsonPath = `/node_modules/${name}/package.json`
        const pkgJson = files.get(pkgJsonPath)
        if (pkgJson) {
          try {
            const pkg = JSON.parse(pkgJson)
            const types = pkg.types || pkg.typings
            if (types) {
              const resolved = `/node_modules/${name}/${types}`
              if (files.has(resolved)) {
                return {
                  resolvedModule: {
                    resolvedFileName: resolved,
                    isExternalLibraryImport: true,
                    extension: ts.Extension.Dts,
                  },
                }
              }
            }
          } catch { /* ignore parse errors */ }
        }

        // Try common patterns
        for (const ext of ['/index.d.ts', '.d.ts', '/index.ts']) {
          const candidate = `/node_modules/${name}${ext}`
          if (files.has(candidate)) {
            return {
              resolvedModule: {
                resolvedFileName: candidate,
                isExternalLibraryImport: true,
                extension: ext.endsWith('.d.ts') ? ts.Extension.Dts : ts.Extension.Ts,
              },
            }
          }
        }
      }

      // Resolve relative imports
      if (name.startsWith('.')) {
        const dir = containingFile.substring(0, containingFile.lastIndexOf('/'))
        const resolved = resolvePath(dir, name)
        // If the containing file is inside node_modules, the resolved file
        // is still part of that library — mark it as external so TS returns
        // the import binding in the project file rather than following the
        // re-export chain into the library's .d.ts files.
        const isExternal = containingFile.startsWith('/node_modules/')
        for (const ext of ['', '.ts', '.tsx', '.d.ts', '/index.ts', '/index.d.ts']) {
          const candidate = resolved + ext
          if (files.has(candidate)) {
            return {
              resolvedModule: {
                resolvedFileName: candidate,
                isExternalLibraryImport: isExternal,
                extension: candidate.endsWith('.d.ts') ? ts.Extension.Dts
                  : candidate.endsWith('.tsx') ? ts.Extension.Tsx : ts.Extension.Ts,
              },
            }
          }
        }
      }

      return { resolvedModule: undefined }
    })
  },
}

function resolvePath(base: string, relative: string): string {
  const parts = base.split('/').filter(Boolean)
  for (const seg of relative.split('/')) {
    if (seg === '..') parts.pop()
    else if (seg !== '.') parts.push(seg)
  }
  return '/' + parts.join('/')
}

let service: ts.LanguageService | null = null

// ── Message handler ──

export interface WorkerRequest {
  id: number
  method: 'init' | 'updateFiles' | 'quickInfo' | 'definition'
  params: any
}

export interface WorkerResponse {
  id: number
  result?: any
  error?: string
}

self.onmessage = async (e: MessageEvent<WorkerRequest>) => {
  const { id, method, params } = e.data

  try {
    switch (method) {
      case 'init': {
        // params.declarations: fetched declarations.json content (path → content)
        // params.sourceFiles: { [virtualPath]: content } for project source files
        // params.projectFiles: string[] — list of project file virtual paths (for filtering definitions)
        const { declarations, sourceFiles } = params as {
          declarations: Record<string, string>
          sourceFiles: Record<string, string>
        }

        // Load declarations into virtual FS
        for (const [path, content] of Object.entries(declarations)) {
          files.set(path, content)
        }

        // Load source files
        for (const [path, content] of Object.entries(sourceFiles)) {
          files.set(path, content)
          fileVersions.set(path, 1)
        }

        // Create language service
        service = ts.createLanguageService(host)

        respond(id, { ready: true, fileCount: files.size })
        break
      }

      case 'updateFiles': {
        // Update source files without recreating the service
        const { sourceFiles } = params as { sourceFiles: Record<string, string> }
        for (const [path, content] of Object.entries(sourceFiles)) {
          files.set(path, content)
          fileVersions.set(path, (fileVersions.get(path) ?? 0) + 1)
        }
        respond(id, { ok: true })
        break
      }

      case 'quickInfo': {
        if (!service) { respond(id, null); break }
        const { fileName, position } = params as { fileName: string; position: number }
        const info = service.getQuickInfoAtPosition(fileName, position)
        if (!info) { respond(id, null); break }

        respond(id, {
          displayParts: info.displayParts?.map(p => p.text).join('') ?? '',
          documentation: info.documentation?.map(p => p.text).join('') ?? '',
          tags: info.tags?.map(t => ({
            name: t.name,
            text: t.text?.map(p => p.text).join('') ?? '',
          })) ?? [],
          textSpan: info.textSpan,
          kind: info.kind,
        })
        break
      }

      case 'definition': {
        if (!service) { respond(id, null); break }
        const { fileName, position, projectFiles } = params as {
          fileName: string
          position: number
          projectFiles: string[]
        }

        const defs = service.getDefinitionAtPosition(fileName, position)
        if (!defs || defs.length === 0) { respond(id, []); break }

        // Filter to project files only (not node_modules, not lib files)
        const projectFileSet = new Set(projectFiles)
        const filtered = defs
          .filter(d => projectFileSet.has(d.fileName))
          .map(d => ({
            fileName: d.fileName,
            textSpan: d.textSpan,
            kind: d.kind,
            name: d.name,
          }))

        respond(id, filtered)
        break
      }

      default:
        respond(id, null, `Unknown method: ${method}`)
    }
  } catch (err) {
    respond(id, null, String(err))
  }
}

function respond(id: number, result?: any, error?: string) {
  const msg: WorkerResponse = { id }
  if (error) msg.error = error
  else msg.result = result
  self.postMessage(msg)
}

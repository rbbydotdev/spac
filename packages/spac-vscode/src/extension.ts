import * as vscode from 'vscode'
import { Compiler } from './compiler.js'
import { OpenApiContentProvider, SCHEME, PREVIEW_URI } from './contentProvider.js'
import { StatusBar } from './statusBar.js'
import { SourceMapNavigator } from './sourceMapNavigator.js'
import { compileAndShow, type CommandDeps } from './commands.js'
import { createFileWatcher } from './fileWatcher.js'
import { clearDiagnostics, disposeDiagnostics } from './diagnostics.js'
import { getEntryFile, getDebounceMs } from './config.js'

let navigator: SourceMapNavigator | null = null
let isLive = true
let suppressNavigation = false
let fileWatcherDisposables: vscode.Disposable[] = []

export async function activate(context: vscode.ExtensionContext) {
  // Only fully activate if the workspace actually uses spac
  const hasSpac = await detectSpac()
  if (!hasSpac) return

  const compiler = new Compiler(context.extensionPath)
  const contentProvider = new OpenApiContentProvider()
  const statusBar = new StatusBar()

  // Register virtual document provider
  context.subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider(SCHEME, contentProvider)
  )
  context.subscriptions.push(contentProvider)
  context.subscriptions.push(statusBar)
  context.subscriptions.push({ dispose: disposeDiagnostics })

  const deps: CommandDeps = {
    compiler,
    contentProvider,
    statusBar,
    get navigator() {
      return navigator
    },
    setNavigator(nav) {
      navigator = nav
    },
    get isLive() {
      return isLive
    },
    setLive(live) {
      isLive = live
    },
  }

  // Commands
  context.subscriptions.push(
    vscode.commands.registerCommand('spac.openPreview', () => compileAndShow(deps))
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('spac.recompile', () => compileAndShow(deps))
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('spac.toggleLive', () => {
      isLive = !isLive
      if (isLive) {
        statusBar.setState('compiled')
        setupFileWatcher(deps, context)
        compileAndShow(deps)
      } else {
        statusBar.setState('paused')
        disposeFileWatcher()
      }
    })
  )

  // Navigation: TS → YAML and YAML → TS
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection((e) => {
      if (suppressNavigation || !navigator) return

      const doc = e.textEditor.document
      const line = e.selections[0].active.line + 1 // 1-based

      if (doc.uri.scheme === SCHEME) {
        // Clicked in YAML → navigate to TS
        const pos = navigator.yamlToTs(line)
        if (pos) navigateToTs(pos.source, pos.line)
      } else if (doc.languageId === 'typescript') {
        // Clicked in TS → navigate to YAML
        const sources = navigator.getSources()
        const relativePath = findMatchingSource(doc.uri.fsPath, sources)
        if (relativePath) {
          const pos = navigator.tsToYaml(relativePath, line)
          if (pos) navigateToYaml(pos.line)
        }
      }
    })
  )

  // Setup file watcher if entry file is configured
  if (getEntryFile()) {
    setupFileWatcher(deps, context)
  }
}

/**
 * Check if the workspace uses spac by looking for it in package.json dependencies.
 */
async function detectSpac(): Promise<boolean> {
  const packageFiles = await vscode.workspace.findFiles('**/package.json', '**/node_modules/**', 5)
  for (const uri of packageFiles) {
    try {
      const raw = await vscode.workspace.fs.readFile(uri)
      const pkg = JSON.parse(Buffer.from(raw).toString('utf-8'))
      const deps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
        ...pkg.peerDependencies,
      }
      if ('spac' in deps) return true
    } catch {
      // skip unreadable files
    }
  }
  return false
}

function setupFileWatcher(deps: CommandDeps, context: vscode.ExtensionContext) {
  disposeFileWatcher()
  const debounceMs = getDebounceMs()
  fileWatcherDisposables = createFileWatcher(() => {
    if (isLive) {
      compileAndShow(deps)
    }
  }, debounceMs)
  context.subscriptions.push(...fileWatcherDisposables)
}

function disposeFileWatcher() {
  for (const d of fileWatcherDisposables) {
    d.dispose()
  }
  fileWatcherDisposables = []
}

async function navigateToTs(source: string, line: number) {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0]
  if (!workspaceFolder) return

  // Source paths from the source map may be absolute or relative
  const uri = source.startsWith('/')
    ? vscode.Uri.file(source)
    : vscode.Uri.joinPath(workspaceFolder.uri, source)

  suppressNavigation = true
  try {
    const doc = await vscode.workspace.openTextDocument(uri)
    const editor = await vscode.window.showTextDocument(doc, {
      viewColumn: vscode.ViewColumn.One,
      preserveFocus: true,
    })
    const range = new vscode.Range(line - 1, 0, line - 1, 0)
    editor.revealRange(range, vscode.TextEditorRevealType.InCenter)
    editor.selection = new vscode.Selection(range.start, range.start)
  } finally {
    setTimeout(() => {
      suppressNavigation = false
    }, 0)
  }
}

function navigateToYaml(line: number) {
  const yamlEditor = vscode.window.visibleTextEditors.find(
    (e) => e.document.uri.scheme === SCHEME
  )
  if (!yamlEditor) return

  suppressNavigation = true
  try {
    const range = new vscode.Range(line - 1, 0, line - 1, 0)
    yamlEditor.revealRange(range, vscode.TextEditorRevealType.InCenter)
    yamlEditor.selection = new vscode.Selection(range.start, range.start)
  } finally {
    setTimeout(() => {
      suppressNavigation = false
    }, 0)
  }
}

/**
 * Match a filesystem path against the source map's source list.
 * Sources in the map may be relative paths or absolute paths.
 */
function findMatchingSource(fsPath: string, sources: string[]): string | null {
  // Try exact match first
  for (const s of sources) {
    if (fsPath === s || fsPath.endsWith(s)) return s
  }
  // Try matching by filename segments
  const segments = fsPath.split('/')
  for (const s of sources) {
    const sourceSegments = s.split('/')
    if (segments.slice(-sourceSegments.length).join('/') === s) return s
  }
  return null
}

export function deactivate() {
  navigator = null
  clearDiagnostics()
}

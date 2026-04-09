import * as vscode from 'vscode'
import { debounce } from './debounce.js'

export function createFileWatcher(
  onRecompile: () => void,
  debounceMs: number
): vscode.Disposable[] {
  const disposables: vscode.Disposable[] = []
  const debouncedRecompile = debounce(onRecompile, debounceMs)
  disposables.push({ dispose: () => debouncedRecompile.dispose() })

  // Watch .ts files on disk
  const watcher = vscode.workspace.createFileSystemWatcher('**/*.ts')
  const triggerIfNotNodeModules = (uri: vscode.Uri) => {
    if (uri.fsPath.includes('node_modules') || uri.fsPath.includes('dist')) return
    debouncedRecompile.trigger()
  }
  disposables.push(watcher.onDidChange(triggerIfNotNodeModules))
  disposables.push(watcher.onDidCreate(triggerIfNotNodeModules))
  disposables.push(watcher.onDidDelete(triggerIfNotNodeModules))
  disposables.push(watcher)

  // Also watch unsaved edits in open editors
  disposables.push(
    vscode.workspace.onDidChangeTextDocument((e) => {
      if (
        e.document.languageId === 'typescript' &&
        !e.document.uri.fsPath.includes('node_modules')
      ) {
        debouncedRecompile.trigger()
      }
    })
  )

  return disposables
}

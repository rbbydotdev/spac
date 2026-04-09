import * as vscode from 'vscode'
import type { Compiler } from './compiler.js'
import type { OpenApiContentProvider } from './contentProvider.js'
import { PREVIEW_URI } from './contentProvider.js'
import type { StatusBar } from './statusBar.js'
import type { SourceMapNavigator } from './sourceMapNavigator.js'
import { getEntryFile } from './config.js'

export interface CommandDeps {
  compiler: Compiler
  contentProvider: OpenApiContentProvider
  statusBar: StatusBar
  navigator: SourceMapNavigator | null
  setNavigator: (nav: SourceMapNavigator) => void
  isLive: boolean
  setLive: (live: boolean) => void
}

export async function compileAndShow(deps: CommandDeps): Promise<void> {
  const { compiler, contentProvider, statusBar } = deps

  const workspaceFolder = vscode.workspace.workspaceFolders?.[0]
  if (!workspaceFolder) {
    vscode.window.showErrorMessage('Spac: No workspace folder open.')
    return
  }

  const entryFileSetting = getEntryFile()
  if (!entryFileSetting) {
    vscode.window.showErrorMessage(
      'Spac: Set "spac.entryFile" in your workspace settings to point to your spac entry file.'
    )
    return
  }

  const entryFile = vscode.Uri.joinPath(workspaceFolder.uri, entryFileSetting).fsPath

  statusBar.setState('compiling')

  try {
    const result = await compiler.compile(entryFile)

    contentProvider.update(result.yaml)

    // Rebuild navigator
    const { SourceMapNavigator: NavClass } = await import('./sourceMapNavigator.js')
    const nav = new NavClass(result.sourceMap)
    deps.setNavigator(nav)

    statusBar.setState('compiled')

    // Open the preview in a side column
    const doc = await vscode.workspace.openTextDocument(PREVIEW_URI)
    await vscode.window.showTextDocument(doc, {
      viewColumn: vscode.ViewColumn.Two,
      preserveFocus: true,
      preview: false,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    statusBar.setState('error', message)
    vscode.window.showErrorMessage(`Spac compilation failed: ${message}`)
  }
}

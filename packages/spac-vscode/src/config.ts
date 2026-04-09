import * as vscode from 'vscode'

export function getEntryFile(): string {
  return vscode.workspace.getConfiguration('spac').get<string>('entryFile', '')
}

export function getDebounceMs(): number {
  return vscode.workspace.getConfiguration('spac').get<number>('debounceMs', 300)
}

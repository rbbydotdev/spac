import * as vscode from 'vscode'

let collection: vscode.DiagnosticCollection | undefined

export function getDiagnostics(): vscode.DiagnosticCollection {
  if (!collection) {
    collection = vscode.languages.createDiagnosticCollection('spac')
  }
  return collection
}

export function clearDiagnostics() {
  collection?.clear()
}

export function setErrorDiagnostic(file: string, line: number, message: string) {
  const uri = vscode.Uri.file(file)
  const range = new vscode.Range(
    Math.max(0, line - 1),
    0,
    Math.max(0, line - 1),
    Number.MAX_SAFE_INTEGER
  )
  const diagnostic = new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Error)
  diagnostic.source = 'spac'
  getDiagnostics().set(uri, [diagnostic])
}

export function disposeDiagnostics() {
  collection?.dispose()
  collection = undefined
}

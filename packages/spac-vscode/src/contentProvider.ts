import * as vscode from 'vscode'

export const SCHEME = 'spac-openapi'
export const PREVIEW_URI = vscode.Uri.parse(`${SCHEME}:/preview/openapi.yaml`)

export class OpenApiContentProvider implements vscode.TextDocumentContentProvider {
  private _onDidChange = new vscode.EventEmitter<vscode.Uri>()
  readonly onDidChange = this._onDidChange.event

  private _content = ''

  update(yaml: string) {
    this._content = yaml
    this._onDidChange.fire(PREVIEW_URI)
  }

  provideTextDocumentContent(): string {
    return this._content
  }

  dispose() {
    this._onDidChange.dispose()
  }
}

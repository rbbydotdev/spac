import * as vscode from 'vscode'

export type StatusBarState = 'idle' | 'compiling' | 'compiled' | 'error' | 'paused'

export class StatusBar {
  private item: vscode.StatusBarItem

  constructor() {
    this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100)
    this.item.command = 'spac.toggleLive'
    this.setState('idle')
    this.item.show()
  }

  setState(state: StatusBarState, detail?: string) {
    switch (state) {
      case 'idle':
        this.item.text = '$(file-code) Spac'
        this.item.tooltip = 'Spac: Ready'
        break
      case 'compiling':
        this.item.text = '$(sync~spin) Spac: Compiling...'
        this.item.tooltip = 'Spac: Compiling OpenAPI spec'
        break
      case 'compiled':
        this.item.text = '$(check) Spac: Live'
        this.item.tooltip = 'Spac: Live — click to pause'
        break
      case 'error':
        this.item.text = `$(error) Spac: Error`
        this.item.tooltip = detail ? `Spac: ${detail}` : 'Spac: Compilation error'
        break
      case 'paused':
        this.item.text = '$(debug-pause) Spac: Paused'
        this.item.tooltip = 'Spac: Paused — click to resume'
        break
    }
  }

  dispose() {
    this.item.dispose()
  }
}

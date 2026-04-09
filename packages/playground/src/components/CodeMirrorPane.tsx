import { useRef, useEffect, useImperativeHandle, forwardRef, type Ref } from 'react'
import { EditorState, type Extension } from '@codemirror/state'
import { EditorView, Decoration, type DecorationSet, keymap } from '@codemirror/view'
import { StateField, StateEffect } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'
import { yaml } from '@codemirror/lang-yaml'
import { basicSetup } from 'codemirror'
import { synthwaveExtensions } from '@spac/theme/codemirror'

// -- Highlight decoration effect & field --

const setHighlight = StateEffect.define<{ from: number; to: number } | null>()

const highlightField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none
  },
  update(deco, tr) {
    for (const e of tr.effects) {
      if (e.is(setHighlight)) {
        if (e.value === null) return Decoration.none
        const mark = Decoration.line({ class: 'cm-highlight-line' })
        return Decoration.set([mark.range(e.value.from)])
      }
    }
    return deco
  },
  provide: f => EditorView.decorations.from(f),
})

// -- Theme --

const highlightTheme = EditorView.baseTheme({
  '.cm-highlight-line': {
    backgroundColor: 'rgba(255, 126, 219, 0.12)',
  },
})

export interface CodeMirrorPaneHandle {
  highlightLine(line: number): void
  clearHighlight(): void
}

interface CodeMirrorPaneProps {
  value: string
  language: 'typescript' | 'yaml'
  onLineClick?: (line: number) => void
  initialHighlightLine?: number
  /** Extra CodeMirror extensions (e.g. TS intellisense) */
  extraExtensions?: Extension[]
}

export const CodeMirrorPane = forwardRef(function CodeMirrorPane(
  { value, language, onLineClick, initialHighlightLine, extraExtensions }: CodeMirrorPaneProps,
  ref: Ref<CodeMirrorPaneHandle>,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  // Use a ref so the click handler always sees the latest callback
  const onLineClickRef = useRef(onLineClick)
  onLineClickRef.current = onLineClick

  useImperativeHandle(ref, () => ({
    highlightLine(line: number) {
      const view = viewRef.current
      if (!view) return
      if (line < 1 || line > view.state.doc.lines) return
      const lineObj = view.state.doc.line(line)
      view.dispatch({
        effects: setHighlight.of({ from: lineObj.from, to: lineObj.to }),
        scrollIntoView: false,
      })
      view.dispatch({
        effects: EditorView.scrollIntoView(lineObj.from, { y: 'center' }),
      })
    },
    clearHighlight() {
      viewRef.current?.dispatch({
        effects: setHighlight.of(null),
      })
    },
  }))

  useEffect(() => {
    if (!containerRef.current) return

    const langExtension = language === 'yaml' ? yaml() : javascript({ typescript: true })

    const clickHandler = EditorView.domEventHandlers({
      click(event: MouseEvent, view: EditorView) {
        if (event.metaKey || event.ctrlKey) return false
        const cb = onLineClickRef.current
        if (!cb) return false
        const pos = view.posAtCoords({ x: event.clientX, y: event.clientY })
        if (pos == null) return false
        const line = view.state.doc.lineAt(pos).number
        cb(line)
        return false
      },
    })

    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        langExtension,
        EditorState.readOnly.of(true),
        highlightField,
        highlightTheme,
        clickHandler,
        ...(extraExtensions ?? []),
        ...synthwaveExtensions,
        EditorView.theme({
          '&': { height: '100%' },
          '.cm-scroller': { overflow: 'auto' },
        }),
        keymap.of([]),
      ],
    })

    const view = new EditorView({
      state,
      parent: containerRef.current,
    })

    viewRef.current = view

    // Apply initial highlight after mount (for post-navigation highlight)
    if (initialHighlightLine != null && initialHighlightLine >= 1 && initialHighlightLine <= view.state.doc.lines) {
      const lineObj = view.state.doc.line(initialHighlightLine)
      view.dispatch({
        effects: setHighlight.of({ from: lineObj.from, to: lineObj.to }),
      })
      view.dispatch({
        effects: EditorView.scrollIntoView(lineObj.from, { y: 'center' }),
      })
    }

    return () => {
      view.destroy()
      viewRef.current = null
    }
    // value and language don't change after mount for our use case
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={containerRef} className="h-full w-full overflow-hidden" />
})

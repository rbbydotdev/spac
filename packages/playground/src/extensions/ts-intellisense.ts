/**
 * CodeMirror extensions for TypeScript intellisense:
 *   - Hover tooltips showing type info + JSDoc (with syntax-highlighted code blocks)
 *   - Cmd/Ctrl+Click to navigate to definition (project files only)
 */

import { hoverTooltip, EditorView, Decoration, type DecorationSet } from '@codemirror/view'
import { StateField, StateEffect } from '@codemirror/state'
import { highlightCode, classHighlighter } from '@lezer/highlight'
import { parser as jsParser } from '@lezer/javascript'
import type { TsWorkerClient } from '../lib/ts-client'

/** A ref-like object so extensions can read the latest client even after mount */
export interface TsClientRef {
  current: TsWorkerClient | null
}

// Lezer TS parser for syntax-highlighting code blocks in tooltips
const tsParser = jsParser.configure({ dialect: 'ts' })

// ── Rich text rendering helpers ──

/**
 * Render inline markdown-like text:
 *   - `code` → <code>
 *   - {@link Foo} → <code> styled as reference
 *   - plain text
 */
function renderInlineText(text: string, container: HTMLElement) {
  // Match: `code`, {@link Name}, or plain text segments
  const re = /`([^`]+)`|\{@link\s+([^}]+)\}/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    // Plain text before this match
    if (m.index > last) {
      container.appendChild(document.createTextNode(text.slice(last, m.index)))
    }
    if (m[1] != null) {
      // Inline code: `foo`
      const code = document.createElement('code')
      code.className = 'cm-ts-inline-code'
      code.textContent = m[1]
      container.appendChild(code)
    } else if (m[2] != null) {
      // {@link Foo}
      const ref = document.createElement('code')
      ref.className = 'cm-ts-inline-code cm-ts-ref'
      ref.textContent = m[2].trim()
      container.appendChild(ref)
    }
    last = m.index + m[0].length
  }
  if (last < text.length) {
    container.appendChild(document.createTextNode(text.slice(last)))
  }
}

/**
 * Syntax-highlight a TypeScript code string using lezer,
 * returning a <code> element with highlighted spans.
 */
function highlightTs(code: string): HTMLElement {
  const el = document.createElement('code')
  const tree = tsParser.parse(code)
  highlightCode(
    code,
    tree,
    classHighlighter,
    // putText: called for each styled segment
    (text: string, classes: string) => {
      if (classes) {
        const span = document.createElement('span')
        span.className = classes
        span.textContent = text
        el.appendChild(span)
      } else {
        el.appendChild(document.createTextNode(text))
      }
    },
    // putBreak: called at line boundaries
    () => {
      el.appendChild(document.createTextNode('\n'))
    },
  )
  return el
}

/**
 * Render an @example tag's text, extracting fenced code blocks
 * and highlighting them, with any surrounding prose rendered as text.
 */
function renderExample(text: string, container: HTMLElement) {
  // Match fenced code blocks: ```lang\n...\n```
  const fenceRe = /```(\w*)\n([\s\S]*?)```/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = fenceRe.exec(text)) !== null) {
    // Prose before the fence
    const before = text.slice(last, m.index).trim()
    if (before) {
      const p = document.createElement('div')
      p.className = 'cm-ts-tooltip-doc'
      renderInlineText(before, p)
      container.appendChild(p)
    }
    // Code block
    const code = m[2].trim()
    const pre = document.createElement('pre')
    pre.className = 'cm-ts-codeblock'
    pre.appendChild(highlightTs(code))
    container.appendChild(pre)
    last = m.index + m[0].length
  }
  // If no fences found, try to highlight the whole text as code
  // (some @example tags omit fences)
  if (last === 0) {
    const trimmed = text.trim()
    if (trimmed) {
      // Heuristic: if it looks like code (contains common TS tokens), highlight it
      if (/[=({;]/.test(trimmed)) {
        const pre = document.createElement('pre')
        pre.className = 'cm-ts-codeblock'
        pre.appendChild(highlightTs(trimmed))
        container.appendChild(pre)
      } else {
        const p = document.createElement('div')
        p.className = 'cm-ts-tooltip-doc'
        renderInlineText(trimmed, p)
        container.appendChild(p)
      }
    }
  } else {
    // Trailing prose after last fence
    const after = text.slice(last).trim()
    if (after) {
      const p = document.createElement('div')
      p.className = 'cm-ts-tooltip-doc'
      renderInlineText(after, p)
      container.appendChild(p)
    }
  }
}

/**
 * Render a @param or @returns tag with structured formatting.
 */
function renderParamTag(tagName: string, text: string, container: HTMLElement) {
  const row = document.createElement('div')
  row.className = 'cm-ts-tooltip-tag'

  const badge = document.createElement('span')
  badge.className = 'cm-ts-tooltip-tag-name'
  badge.textContent = `@${tagName}`
  row.appendChild(badge)

  if (text) {
    // For @param: text is "name - description"
    const dashIdx = text.indexOf(' - ')
    if (tagName === 'param' && dashIdx !== -1) {
      const paramName = text.slice(0, dashIdx).trim()
      const desc = text.slice(dashIdx + 3)

      const nameEl = document.createElement('code')
      nameEl.className = 'cm-ts-param-name'
      nameEl.textContent = paramName
      row.appendChild(document.createTextNode(' '))
      row.appendChild(nameEl)

      const descSpan = document.createElement('span')
      descSpan.className = 'cm-ts-param-desc'
      descSpan.appendChild(document.createTextNode(' \u2014 '))
      renderInlineText(desc, descSpan)
      row.appendChild(descSpan)
    } else {
      const descSpan = document.createElement('span')
      descSpan.appendChild(document.createTextNode(' '))
      renderInlineText(text, descSpan)
      row.appendChild(descSpan)
    }
  }

  container.appendChild(row)
}

// ── Hover tooltip ──

export function tsHoverTooltip(
  clientRef: TsClientRef,
  fileName: string,
) {
  return hoverTooltip(async (_view, pos) => {
    const client = clientRef.current
    if (!client?.ready) return null

    const info = await client.quickInfo(fileName, pos)
    if (!info) return null
    if (!info.displayParts && !info.documentation) return null

    return {
      pos: info.textSpan.start,
      end: info.textSpan.start + info.textSpan.length,
      create() {
        const dom = document.createElement('div')
        dom.className = 'cm-ts-tooltip'

        // ── Type signature ──
        if (info.displayParts) {
          const pre = document.createElement('pre')
          pre.className = 'cm-ts-tooltip-sig'
          pre.appendChild(highlightTs(info.displayParts))
          dom.appendChild(pre)
        }

        // ── Documentation ──
        if (info.documentation) {
          const doc = document.createElement('div')
          doc.className = 'cm-ts-tooltip-doc'
          renderInlineText(info.documentation, doc)
          dom.appendChild(doc)
        }

        // ── Tags ──
        if (info.tags.length > 0) {
          const tagsEl = document.createElement('div')
          tagsEl.className = 'cm-ts-tooltip-tags'

          for (const tag of info.tags) {
            if (tag.name === 'example') {
              // Section header
              const header = document.createElement('div')
              header.className = 'cm-ts-tooltip-tag cm-ts-example-header'
              const badge = document.createElement('span')
              badge.className = 'cm-ts-tooltip-tag-name'
              badge.textContent = '@example'
              header.appendChild(badge)
              tagsEl.appendChild(header)
              // Render the example content with syntax highlighting
              renderExample(tag.text, tagsEl)
            } else {
              renderParamTag(tag.name, tag.text, tagsEl)
            }
          }
          dom.appendChild(tagsEl)
        }

        return { dom }
      },
    }
  }, { hoverTime: 300 })
}

// ── Cmd/Ctrl+Click underline effect ──

// When the user holds Cmd/Ctrl, we underline the token under the cursor
// to indicate it's clickable (like VS Code).
const setUnderline = StateEffect.define<{ from: number; to: number } | null>()

const underlineField = StateField.define<DecorationSet>({
  create() { return Decoration.none },
  update(value, tr) {
    for (const e of tr.effects) {
      if (e.is(setUnderline)) {
        if (!e.value) return Decoration.none
        return Decoration.set([
          Decoration.mark({ class: 'cm-ts-link' }).range(e.value.from, e.value.to),
        ])
      }
    }
    return value
  },
  provide: f => EditorView.decorations.from(f),
})

// ── Goto definition click handler ──

export interface GotoDefinitionTarget {
  /** Virtual file path, e.g. "/project/petstore.ts" */
  fileName: string
  /** Character offset in the file */
  offset: number
}

export function tsGotoDefinition(
  clientRef: TsClientRef,
  fileName: string,
  projectFiles: string[],
  onNavigate: (target: GotoDefinitionTarget) => void,
) {
  const clickHandler = EditorView.domEventHandlers({
    click(event: MouseEvent, view: EditorView) {
      if (!(event.metaKey || event.ctrlKey)) return false
      const client = clientRef.current
      if (!client?.ready) return false

      const pos = view.posAtCoords({ x: event.clientX, y: event.clientY })
      if (pos == null) return false

      event.preventDefault()
      event.stopPropagation()

      client.definition(fileName, pos, projectFiles).then(defs => {
        if (defs.length > 0) {
          onNavigate({
            fileName: defs[0].fileName,
            offset: defs[0].textSpan.start,
          })
        }
      })

      return true
    },

    mousemove(event: MouseEvent, view: EditorView) {
      if (!(event.metaKey || event.ctrlKey)) {
        // Clear underline when modifier released
        if (view.state.field(underlineField).size > 0) {
          view.dispatch({ effects: setUnderline.of(null) })
        }
        return false
      }
      const client = clientRef.current
      if (!client?.ready) return false

      const pos = view.posAtCoords({ x: event.clientX, y: event.clientY })
      if (pos == null) return false

      // Underline the word under cursor
      const word = view.state.wordAt(pos)
      if (word) {
        view.dispatch({ effects: setUnderline.of({ from: word.from, to: word.to }) })
      }
      return false
    },
  })

  const keyHandler = EditorView.domEventHandlers({
    keyup(event: KeyboardEvent, view: EditorView) {
      if (event.key === 'Meta' || event.key === 'Control') {
        const decos = view.state.field(underlineField)
        if (decos.size > 0) {
          view.dispatch({ effects: setUnderline.of(null) })
        }
      }
      return false
    },
  })

  return [underlineField, clickHandler, keyHandler]
}

// ── Theme for tooltips and link underline ──

export const tsIntellisenseTheme = EditorView.baseTheme({
  // ── Link underline ──
  '.cm-ts-link': {
    textDecoration: 'underline',
    cursor: 'pointer',
    color: 'var(--cm-ts-link-color, #2563eb)',
  },
  '&dark .cm-ts-link': {
    color: 'var(--cm-ts-link-color, #60a5fa)',
  },

  // ── Tooltip container ──
  '.cm-tooltip.cm-tooltip-hover': {
    border: 'none',
  },
  '.cm-ts-tooltip': {
    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
    fontSize: '12px',
    lineHeight: '1.5',
    maxWidth: '560px',
    maxHeight: '360px',
    overflow: 'auto',
    padding: '0',
    background: 'var(--cm-ts-tooltip-bg, #fff)',
    border: '1px solid var(--cm-ts-tooltip-border, #e5e7eb)',
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  '&dark .cm-ts-tooltip': {
    background: 'var(--cm-ts-tooltip-bg, #1e1e2e)',
    border: '1px solid var(--cm-ts-tooltip-border, #313244)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },

  // ── Type signature ──
  '.cm-ts-tooltip-sig': {
    margin: '0',
    padding: '6px 10px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontSize: '11.5px',
    color: 'var(--cm-ts-sig-color, #1e293b)',
    background: 'var(--cm-ts-sig-bg, #f8fafc)',
    borderBottom: '1px solid var(--cm-ts-tooltip-border, #e5e7eb)',
    borderRadius: '6px 6px 0 0',
  },
  '&dark .cm-ts-tooltip-sig': {
    color: 'var(--cm-ts-sig-color, #cdd6f4)',
    background: 'var(--cm-ts-sig-bg, #181825)',
    borderBottom: '1px solid var(--cm-ts-tooltip-border, #313244)',
  },

  // ── Documentation prose ──
  '.cm-ts-tooltip-doc': {
    padding: '6px 10px',
    color: 'var(--cm-ts-doc-color, #475569)',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '12px',
  },
  '&dark .cm-ts-tooltip-doc': {
    color: 'var(--cm-ts-doc-color, #a6adc8)',
  },

  // ── Inline code and {@link} ──
  '.cm-ts-inline-code': {
    padding: '1px 4px',
    borderRadius: '3px',
    fontSize: '11px',
    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
    background: 'var(--cm-ts-code-bg, #f1f5f9)',
    color: 'var(--cm-ts-code-color, #0f172a)',
  },
  '&dark .cm-ts-inline-code': {
    background: 'var(--cm-ts-code-bg, #313244)',
    color: 'var(--cm-ts-code-color, #cdd6f4)',
  },
  '.cm-ts-ref': {
    color: 'var(--cm-ts-link-color, #2563eb)',
  },
  '&dark .cm-ts-ref': {
    color: 'var(--cm-ts-link-color, #89b4fa)',
  },

  // ── Tags section ──
  '.cm-ts-tooltip-tags': {
    padding: '4px 10px 6px',
    borderTop: '1px solid var(--cm-ts-tooltip-border, #e5e7eb)',
  },
  '&dark .cm-ts-tooltip-tags': {
    borderTop: '1px solid var(--cm-ts-tooltip-border, #313244)',
  },
  '.cm-ts-tooltip-tag': {
    fontSize: '11.5px',
    color: 'var(--cm-ts-doc-color, #475569)',
    fontFamily: 'system-ui, sans-serif',
    lineHeight: '1.6',
  },
  '&dark .cm-ts-tooltip-tag': {
    color: 'var(--cm-ts-doc-color, #a6adc8)',
  },
  '.cm-ts-tooltip-tag-name': {
    color: 'var(--cm-ts-tag-color, #7c3aed)',
    fontWeight: '600',
    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
    fontSize: '11px',
  },
  '&dark .cm-ts-tooltip-tag-name': {
    color: 'var(--cm-ts-tag-color, #c4b5fd)',
  },

  // ── @param name ──
  '.cm-ts-param-name': {
    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
    fontSize: '11px',
    fontWeight: '600',
    color: 'var(--cm-ts-sig-color, #1e293b)',
    padding: '0 2px',
  },
  '&dark .cm-ts-param-name': {
    color: 'var(--cm-ts-sig-color, #cdd6f4)',
  },
  '.cm-ts-param-desc': {
    color: 'var(--cm-ts-doc-color, #64748b)',
  },
  '&dark .cm-ts-param-desc': {
    color: 'var(--cm-ts-doc-color, #9399b2)',
  },

  // ── @example header ──
  '.cm-ts-example-header': {
    marginTop: '4px',
    marginBottom: '2px',
  },

  // ── Fenced code block ──
  '.cm-ts-codeblock': {
    margin: '4px 0',
    padding: '8px 10px',
    borderRadius: '4px',
    fontSize: '11.5px',
    lineHeight: '1.5',
    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
    background: 'var(--cm-ts-codeblock-bg, #f8fafc)',
    border: '1px solid var(--cm-ts-tooltip-border, #e5e7eb)',
    whiteSpace: 'pre',
    overflowX: 'auto',
  },
  '&dark .cm-ts-codeblock': {
    background: 'var(--cm-ts-codeblock-bg, #11111b)',
    border: '1px solid var(--cm-ts-tooltip-border, #313244)',
  },

  // ── Syntax highlight tokens (lezer classHighlighter) ──
  '.cm-ts-codeblock .tok-keyword, .cm-ts-tooltip-sig .tok-keyword': { color: '#8839ef' },
  '.cm-ts-codeblock .tok-string, .cm-ts-tooltip-sig .tok-string': { color: '#40a02b' },
  '.cm-ts-codeblock .tok-string2, .cm-ts-tooltip-sig .tok-string2': { color: '#40a02b' },
  '.cm-ts-codeblock .tok-number, .cm-ts-tooltip-sig .tok-number': { color: '#fe640b' },
  '.cm-ts-codeblock .tok-bool, .cm-ts-tooltip-sig .tok-bool': { color: '#fe640b' },
  '.cm-ts-codeblock .tok-variableName, .cm-ts-tooltip-sig .tok-variableName': { color: '#4c4f69' },
  '.cm-ts-codeblock .tok-propertyName, .cm-ts-tooltip-sig .tok-propertyName': { color: '#1e66f5' },
  '.cm-ts-codeblock .tok-typeName, .cm-ts-tooltip-sig .tok-typeName': { color: '#df8e1d' },
  '.cm-ts-codeblock .tok-comment, .cm-ts-tooltip-sig .tok-comment': { color: '#9ca0b0', fontStyle: 'italic' },
  '.cm-ts-codeblock .tok-punctuation, .cm-ts-tooltip-sig .tok-punctuation': { color: '#6c6f85' },
  '.cm-ts-codeblock .tok-operator, .cm-ts-tooltip-sig .tok-operator': { color: '#04a5e5' },
  '.cm-ts-codeblock .tok-definition, .cm-ts-tooltip-sig .tok-definition': { color: '#1e66f5' },

  // Dark mode syntax tokens
  '&dark .cm-ts-codeblock .tok-keyword, &dark .cm-ts-tooltip-sig .tok-keyword': { color: '#cba6f7' },
  '&dark .cm-ts-codeblock .tok-string, &dark .cm-ts-tooltip-sig .tok-string': { color: '#a6e3a1' },
  '&dark .cm-ts-codeblock .tok-string2, &dark .cm-ts-tooltip-sig .tok-string2': { color: '#a6e3a1' },
  '&dark .cm-ts-codeblock .tok-number, &dark .cm-ts-tooltip-sig .tok-number': { color: '#fab387' },
  '&dark .cm-ts-codeblock .tok-bool, &dark .cm-ts-tooltip-sig .tok-bool': { color: '#fab387' },
  '&dark .cm-ts-codeblock .tok-variableName, &dark .cm-ts-tooltip-sig .tok-variableName': { color: '#cdd6f4' },
  '&dark .cm-ts-codeblock .tok-propertyName, &dark .cm-ts-tooltip-sig .tok-propertyName': { color: '#89b4fa' },
  '&dark .cm-ts-codeblock .tok-typeName, &dark .cm-ts-tooltip-sig .tok-typeName': { color: '#f9e2af' },
  '&dark .cm-ts-codeblock .tok-comment, &dark .cm-ts-tooltip-sig .tok-comment': { color: '#6c7086', fontStyle: 'italic' },
  '&dark .cm-ts-codeblock .tok-punctuation, &dark .cm-ts-tooltip-sig .tok-punctuation': { color: '#9399b2' },
  '&dark .cm-ts-codeblock .tok-operator, &dark .cm-ts-tooltip-sig .tok-operator': { color: '#89dceb' },
  '&dark .cm-ts-codeblock .tok-definition, &dark .cm-ts-tooltip-sig .tok-definition': { color: '#89b4fa' },
})

// CodeMirror 6 theme derived from colors.ts
// Import `synthwaveExtensions` and add to your editor's extensions array.

import { EditorView } from '@codemirror/view'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'
import * as c from './colors.ts'

export const synthwaveEditorTheme = EditorView.theme(
  {
    '&': {
      backgroundColor: c.bg,
      color: c.text,
    },
    '.cm-content': {
      caretColor: c.coral,
      fontFamily: c.fonts.code,
      fontSize: '13px',
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: c.coral,
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
      backgroundColor: c.selection,
    },
    '.cm-panels': {
      backgroundColor: c.surfaceDeep,
      color: c.text,
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${c.borderMuted}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${c.borderMuted}`,
    },
    '.cm-searchMatch': {
      backgroundColor: `${c.findMatch}55`,
      outline: `1px solid ${c.findMatch}bb`,
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: `${c.findMatch}bb`,
    },
    '.cm-activeLine': {
      backgroundColor: 'transparent',
    },
    '.cm-selectionMatch': {
      backgroundColor: `${c.surfaceHover}88`,
    },
    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      backgroundColor: `${c.surfaceHover}66`,
      outline: `1px solid ${c.border}`,
    },
    '.cm-gutters': {
      backgroundColor: c.bg,
      color: c.textFaint,
      borderRight: 'none',
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'transparent',
      color: '#ffffffcc',
    },
    '.cm-foldPlaceholder': {
      backgroundColor: c.surfaceAlt,
      color: c.textMuted,
      border: 'none',
    },
    '.cm-tooltip': {
      backgroundColor: c.surfaceDeep,
      border: `1px solid ${c.borderMuted}`,
      color: c.text,
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: c.surfaceDeep,
      borderBottomColor: c.surfaceDeep,
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li[aria-selected]': {
        backgroundColor: c.selection,
        color: c.textStrong,
      },
    },
  },
  { dark: true },
)

export const synthwaveHighlightStyle = HighlightStyle.define([
  // Comments
  { tag: tags.comment, color: c.syntax.comment, fontStyle: 'italic' },
  { tag: tags.lineComment, color: c.syntax.comment, fontStyle: 'italic' },
  { tag: tags.blockComment, color: c.syntax.comment, fontStyle: 'italic' },
  { tag: tags.docComment, color: c.syntax.comment, fontStyle: 'italic' },

  // Strings
  { tag: tags.string, color: c.syntax.string },
  { tag: tags.special(tags.string), color: c.syntax.templateExpr },
  { tag: tags.regexp, color: c.syntax.regexp },
  { tag: tags.escape, color: c.syntax.escape },

  // Keywords & operators
  { tag: tags.keyword, color: c.syntax.keyword },
  { tag: tags.controlKeyword, color: c.syntax.keyword },
  { tag: tags.operatorKeyword, color: c.syntax.keyword },
  { tag: tags.definitionKeyword, color: c.syntax.keyword },
  { tag: tags.moduleKeyword, color: c.syntax.importExport },
  { tag: tags.operator, color: c.syntax.operator },

  // Functions
  { tag: tags.function(tags.variableName), color: c.syntax.function },
  { tag: tags.function(tags.propertyName), color: c.syntax.function },

  // Variables
  { tag: tags.variableName, color: c.syntax.variable },
  { tag: tags.definition(tags.variableName), color: c.syntax.variable },
  { tag: tags.local(tags.variableName), color: c.syntax.variable },
  { tag: tags.special(tags.variableName), color: c.syntax.variableLang, fontWeight: 'bold' },
  { tag: tags.self, color: c.syntax.variableLang, fontWeight: 'bold' },

  // Properties
  { tag: tags.propertyName, color: c.syntax.property },
  { tag: tags.definition(tags.propertyName), color: c.syntax.property },

  // Types & tags
  { tag: tags.typeName, color: c.syntax.type },
  { tag: tags.className, color: c.syntax.type },
  { tag: tags.namespace, color: c.syntax.type },
  { tag: tags.tagName, color: c.syntax.tag },
  { tag: tags.attributeName, color: c.syntax.attribute },

  // Constants & numbers
  { tag: tags.number, color: c.syntax.number },
  { tag: tags.integer, color: c.syntax.number },
  { tag: tags.float, color: c.syntax.number },
  { tag: tags.bool, color: c.syntax.constant },
  { tag: tags.null, color: c.syntax.constant },
  { tag: tags.atom, color: c.syntax.constant },

  // Punctuation & brackets
  { tag: tags.punctuation, color: c.syntax.punctuation },
  { tag: tags.paren, color: c.syntax.bracket },
  { tag: tags.squareBracket, color: c.syntax.bracket },
  { tag: tags.brace, color: c.syntax.bracket },
  { tag: tags.angleBracket, color: c.syntax.tagPunct },
  { tag: tags.separator, color: c.syntax.punctuation },
  { tag: tags.derefOperator, color: c.syntax.punctuation },

  // Markup
  { tag: tags.heading, color: c.pink, fontWeight: 'bold' },
  { tag: tags.emphasis, fontStyle: 'italic', color: c.cyanAlt },
  { tag: tags.strong, fontWeight: 'bold', color: c.cyanAlt },
  { tag: tags.link, color: c.coral, textDecoration: 'underline' },
  { tag: tags.url, color: c.coral },

  // Misc
  { tag: tags.labelName, color: c.syntax.tag },
  { tag: tags.inserted, color: c.green },
  { tag: tags.deleted, color: c.red },
  { tag: tags.changed, color: c.purple },
  { tag: tags.invalid, color: c.red },
  { tag: tags.meta, color: c.textMuted },
])

/** Drop-in CodeMirror extension array. Use: `extensions: [...yourExtensions, ...synthwaveExtensions]` */
export const synthwaveExtensions = [
  synthwaveEditorTheme,
  syntaxHighlighting(synthwaveHighlightStyle),
]

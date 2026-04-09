// Generates all derived theme files from colors.ts
// Run: pnpm --filter @spac/theme build

import { writeFileSync } from 'node:fs'
import { colors, light, syntax, syntaxLight, fonts, fontUrls, radius, glowCyan, glowPink, glowYellow } from './colors.ts'

const HEADER = `/* ═══════════════════════════════════════════════════════════
 *  GENERATED — do not edit directly.
 *  Edit colors.ts then run: pnpm --filter @spac/theme build
 * ═══════════════════════════════════════════════════════════ */`

// ── theme.css — CSS custom properties for playground + general use ──

const themeCss = `${HEADER}

${fontUrls.map(u => `@import url('${u}');`).join('\n')}

:root {
  --spac-bg: ${colors.bg};
  --spac-surface: ${colors.surface};
  --spac-surface-alt: ${colors.surfaceAlt};
  --spac-surface-hover: ${colors.surfaceHover};
  --spac-surface-menu: ${colors.surfaceMenu};
  --spac-surface-deep: ${colors.surfaceDeep};
  --spac-surface-tab: ${colors.surfaceTab};
  --spac-text: ${colors.text};
  --spac-text-strong: ${colors.textStrong};
  --spac-text-muted: ${colors.textMuted};
  --spac-text-faint: ${colors.textFaint};
  --spac-text-fainter: ${colors.textFainter};
  --spac-pink: ${colors.pink};
  --spac-cyan: ${colors.cyan};
  --spac-cyan-bright: ${colors.cyanBright};
  --spac-cyan-alt: ${colors.cyanAlt};
  --spac-yellow: ${colors.yellow};
  --spac-green: ${colors.green};
  --spac-orange: ${colors.orange};
  --spac-coral: ${colors.coral};
  --spac-red: ${colors.red};
  --spac-purple: ${colors.purple};
  --spac-lavender: ${colors.lavender};
  --spac-border: ${colors.border};
  --spac-border-subtle: ${colors.borderSubtle};
  --spac-border-muted: ${colors.borderMuted};
  --spac-border-highlight: ${colors.borderHighlight};
  --spac-button: ${colors.button};
  --spac-selection: ${colors.selection};
  --spac-glow-cyan: ${glowCyan};
  --spac-glow-pink: ${glowPink};
  --spac-glow-yellow: ${glowYellow};
  --spac-font-display: ${fonts.display};
  --spac-font-body: ${fonts.body};
  --spac-font-code: ${fonts.code};
  --spac-radius-sm: ${radius.sm};
  --spac-radius-md: ${radius.md};
  --spac-radius-lg: ${radius.lg};
  --spac-radius-xl: ${radius.xl};
  --spac-radius-pill: ${radius.pill};
}
`

// ── fumadocs.css — Fumadocs @theme + .dark overrides ──

const fumadocsCss = `${HEADER}

/* Light mode (default) */
@theme {
  --color-fd-background: ${light.bg};
  --color-fd-foreground: ${light.textStrong};
  --color-fd-muted: ${light.surfaceAlt};
  --color-fd-muted-foreground: ${light.textMuted};
  --color-fd-popover: ${light.surfaceDeep};
  --color-fd-popover-foreground: ${light.textStrong};
  --color-fd-card: ${light.surface};
  --color-fd-card-foreground: ${light.textStrong};
  --color-fd-border: ${light.border};
  --color-fd-primary: ${light.pink};
  --color-fd-primary-foreground: #ffffff;
  --color-fd-secondary: ${light.surfaceAlt};
  --color-fd-secondary-foreground: ${light.text};
  --color-fd-accent: ${light.surfaceHover};
  --color-fd-accent-foreground: ${light.textStrong};
  --color-fd-ring: ${light.cyan};
  --color-fd-overlay: rgba(0, 0, 0, 0.15);
}

/* Dark mode — Synthwave '84 */
.dark {
  --color-fd-background: ${colors.bg};
  --color-fd-foreground: ${colors.textStrong};
  --color-fd-muted: ${colors.surfaceAlt};
  --color-fd-muted-foreground: ${colors.textMuted};
  --color-fd-popover: ${colors.surfaceAlt};
  --color-fd-popover-foreground: ${colors.textStrong};
  --color-fd-card: ${colors.surface};
  --color-fd-card-foreground: ${colors.textStrong};
  --color-fd-border: hsla(250, 20%, 35%, 0.4);
  --color-fd-primary: ${colors.pink};
  --color-fd-primary-foreground: ${colors.surfaceDeep};
  --color-fd-secondary: ${colors.surfaceHover};
  --color-fd-secondary-foreground: ${colors.text};
  --color-fd-accent: ${colors.surfaceHover};
  --color-fd-accent-foreground: ${colors.textStrong};
  --color-fd-ring: ${colors.cyan};
  --color-fd-overlay: rgba(0, 0, 0, 0.4);
}

/* Sidebar dark mode override */
.dark #nd-sidebar {
  --color-fd-muted: ${colors.surface};
  --color-fd-secondary: ${colors.surfaceAlt};
  --color-fd-muted-foreground: ${colors.textMuted};
}

/* Static semantic colors (required by preset.css) */
@theme static {
  --color-fd-info: oklch(62.3% 0.214 259.815);
  --color-fd-warning: oklch(76.9% 0.188 70.08);
  --color-fd-error: oklch(63.7% 0.237 25.331);
  --color-fd-success: oklch(72.3% 0.219 149.579);
  --color-fd-idea: oklch(70.5% 0.209 60.849);
  --color-fd-diff-remove: rgba(200, 10, 100, 0.12);
  --color-fd-diff-remove-symbol: rgb(230, 10, 100);
  --color-fd-diff-add: rgba(14, 180, 100, 0.1);
  --color-fd-diff-add-symbol: rgb(10, 200, 100);
}
`

// ── Shiki themes (JSON for import from source.config.ts) ──

function makeShikiTheme(name: string, type: 'dark' | 'light', fg: string, bg: string, s: typeof syntax) {
  return {
    name,
    type,
    settings: [
      { settings: { foreground: fg, background: bg } },
      { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: s.comment, fontStyle: 'italic' } },
      { scope: ['string', 'string.quoted', 'string.template', 'punctuation.definition.string'], settings: { foreground: s.string } },
      { scope: ['string.template meta.embedded.line'], settings: { foreground: fg } },
      { scope: ['keyword', 'keyword.control', 'keyword.operator', 'keyword.operator.new', 'keyword.operator.expression', 'keyword.operator.logical'], settings: { foreground: s.keyword } },
      { scope: ['keyword.control.export', 'keyword.control.import', 'keyword.control.from', 'keyword.control.as'], settings: { foreground: s.importExport } },
      { scope: ['storage.type', 'storage.modifier'], settings: { foreground: s.keyword } },
      { scope: ['entity.name.function', 'variable.function', 'support.function', 'meta.function-call'], settings: { foreground: s.function } },
      { scope: ['variable', 'entity.name.variable'], settings: { foreground: s.variable } },
      { scope: ['variable.language'], settings: { foreground: s.variableLang, fontStyle: 'bold' } },
      { scope: ['variable.parameter'], settings: { fontStyle: 'italic' } },
      { scope: ['support.variable'], settings: { foreground: s.variable } },
      { scope: ['entity.name.type', 'support.type', 'entity.name.class'], settings: { foreground: s.type } },
      { scope: ['meta.object-literal.key', 'support.type.property-name', 'variable.other.property'], settings: { foreground: s.property } },
      { scope: ['support.type.property-name.css', 'support.type.property-name.json'], settings: { foreground: s.cssProperty } },
      { scope: ['constant', 'constant.numeric', 'constant.language'], settings: { foreground: s.constant } },
      { scope: ['constant.character.escape'], settings: { foreground: s.escape } },
      { scope: ['entity.name.tag'], settings: { foreground: s.tag } },
      { scope: ['punctuation.definition.tag'], settings: { foreground: s.tagPunct } },
      { scope: ['entity.other.attribute-name'], settings: { foreground: s.attribute } },
      { scope: ['punctuation.definition.template-expression.begin', 'punctuation.definition.template-expression.end'], settings: { foreground: s.templateExpr } },
      { scope: ['string.regexp'], settings: { foreground: s.regexp } },
      { scope: ['keyword.operator.assignment'], settings: { foreground: fg + 'ee' } },
      { scope: ['punctuation.separator.key-value'], settings: { foreground: fg } },
      { scope: ['punctuation.section.embedded'], settings: { foreground: s.keyword } },
      { scope: ['markup.heading', 'entity.name.section'], settings: { foreground: s.variable, fontStyle: 'bold' } },
      { scope: ['markup.inline.raw'], settings: { foreground: s.tag } },
      { scope: ['support'], settings: { foreground: s.type } },
      { scope: ['entity.name'], settings: { foreground: s.type } },
      { scope: ['markup.inserted'], settings: { foreground: s.tag } },
      { scope: ['markup.deleted'], settings: { foreground: s.type } },
      { scope: ['keyword.other.unit'], settings: { foreground: s.constant } },
    ],
  }
}

const shikiDark = makeShikiTheme('synthwave-84', 'dark', colors.text, colors.bg, syntax)
const shikiLight = makeShikiTheme('synthwave-84-light', 'light', light.text, light.bg, syntaxLight)

// ── Write all files ──

const dir = new URL('./', import.meta.url)

writeFileSync(new URL('theme.css', dir), themeCss)
console.log('  theme.css')

writeFileSync(new URL('fumadocs.css', dir), fumadocsCss)
console.log('  fumadocs.css')

writeFileSync(new URL('shiki-dark.json', dir), JSON.stringify(shikiDark, null, 2))
console.log('  shiki-dark.json')

writeFileSync(new URL('shiki-light.json', dir), JSON.stringify(shikiLight, null, 2))
console.log('  shiki-light.json')

console.log('Generated all theme files from colors.ts')

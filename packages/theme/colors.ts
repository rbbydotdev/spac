// ╔══════════════════════════════════════════════════════════════╗
// ║  SPAC SYNTHWAVE '84 THEME — SINGLE SOURCE OF TRUTH        ║
// ║                                                            ║
// ║  Change colors here. Both website and playground import    ║
// ║  from this file. After editing, run:                       ║
// ║    pnpm --filter @spac/theme build                         ║
// ║  to regenerate theme.css for Tailwind.                     ║
// ╚══════════════════════════════════════════════════════════════╝

// ── Backgrounds ──────────────────────────────────────────────

export const bg = '#262335'             // page / editor background
export const surface = '#241b2f'        // panels, sidebar, cards
export const surfaceAlt = '#2a2139'     // inputs, widgets, dropdowns
export const surfaceHover = '#34294f'   // hover states, word highlight
export const surfaceMenu = '#463465'    // menus, debug toolbar
export const surfaceDeep = '#171520'    // deepest layer (activity bar, widget bg)
export const surfaceTab = '#232530'     // peek views, breadcrumb picker

// ── Foreground / Text ────────────────────────────────────────

export const text = '#b6b1b1'           // body text, default foreground
export const textStrong = '#ffffff'     // headings, primary foreground
export const textMuted = '#848bbd'      // comments, secondary text
export const textFaint = '#ffffff80'    // status bar, line numbers
export const textFainter = '#ffffff59'  // ignored resources, hints

// ── Accent Colors ────────────────────────────────────────────

export const pink = '#ff7edb'           // primary accent — links, variables, active
export const cyan = '#36f9f6'           // functions, escape chars, interactive
export const cyanBright = '#03edf9'     // terminal cyan, cursor
export const cyanAlt = '#2ee2fa'        // JS decimals, some constants
export const yellow = '#fede5d'         // keywords, operators, attributes
export const green = '#72f1b8'          // tags, import/export, success, warnings
export const orange = '#ff8b39'         // strings
export const coral = '#f97e72'          // constants, numbers, progress bar, cursor
export const red = '#fe4450'            // errors, entity names, destructive
export const purple = '#b893ce'         // git modified, decorative
export const lavender = '#9d8bca'       // scrollbar, muted purple UI

// ── Borders & Chrome ─────────────────────────────────────────

export const border = '#495495'         // editor group borders, bracket match
export const borderSubtle = '#1f212b'   // focus border
export const borderMuted = '#444251'    // indent guides
export const borderHighlight = '#7059AB' // line highlight, active indent guide
export const button = '#614D85'         // button background
export const selection = '#ffffff20'    // selection, active list items
export const activeTab = '#880088'      // active tab bottom border
export const findMatch = '#D18616'      // find match highlight

// ── Glow Effects ─────────────────────────────────────────────

export const glowCyan = '0 0 10px rgba(54, 249, 246, 0.35), 0 0 40px rgba(54, 249, 246, 0.1)'
export const glowPink = '0 0 10px rgba(255, 126, 219, 0.35), 0 0 40px rgba(255, 126, 219, 0.1)'
export const glowYellow = '0 0 10px rgba(254, 222, 93, 0.3), 0 0 40px rgba(254, 222, 93, 0.08)'

// ── Syntax Tokens ────────────────────────────────────────────

export const syntax = {
  comment:       '#848bbd',   // italic
  string:        '#ff8b39',   // orange
  keyword:       '#fede5d',   // yellow, bold
  operator:      '#fede5d',   // yellow
  function:      '#36f9f6',   // cyan
  variable:      '#ff7edb',   // pink
  variableLang:  '#fe4450',   // red, bold (this, self)
  constant:      '#f97e72',   // coral
  number:        '#f97e72',   // coral
  type:          '#fe4450',   // red (entity.name.type)
  tag:           '#72f1b8',   // green (HTML/JSX tags)
  tagPunct:      '#36f9f6',   // cyan (< > /)
  attribute:     '#fede5d',   // yellow
  property:      '#ff7edb',   // pink (object keys)
  escape:        '#36f9f6',   // cyan
  regexp:        '#f97e72',   // coral
  templateExpr:  '#72f1b8',   // green (${})
  punctuation:   '#b6b1b1',   // text color
  importExport:  '#72f1b8',   // green
  cssProperty:   '#72f1b8',   // green
  bracket:       '#b6b1b1',   // text color
} as const

// ── Typography ───────────────────────────────────────────────

export const fonts = {
  display: "'Orbitron', sans-serif",
  body: "'Outfit', sans-serif",
  code: "'Fira Code', 'JetBrains Mono', 'SF Mono', monospace",
} as const

export const fontUrls = [
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap',
]

// ── Spacing & Radius ─────────────────────────────────────────

export const radius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  pill: '9999px',
} as const

// ── Light Mode ───────────────────────────────────────────────
// Synthwave Light — lavender/purple tints, darkened accents for contrast

export const light = {
  bg:              '#f5f0fa',
  surface:         '#ece4f4',
  surfaceAlt:      '#e4dbed',
  surfaceHover:    '#dbd2e6',
  surfaceMenu:     '#d4c9e0',
  surfaceDeep:     '#f9f6fd',
  surfaceTab:      '#ede6f5',
  text:            '#3d3552',
  textStrong:      '#1a1525',
  textMuted:       '#7a7590',
  textFaint:       '#9890a8',
  textFainter:     '#b0a8c0',
  pink:            '#a0389a',
  cyan:            '#0a8a88',
  yellow:          '#8a6d15',
  green:           '#2d8a5e',
  orange:          '#b5571a',
  coral:           '#c4551a',
  red:             '#c62b38',
  purple:          '#7a5baa',
  lavender:        '#8a75b5',
  border:          '#d0c5dd',
  borderSubtle:    '#e0d8ea',
  borderMuted:     '#c8bdd5',
  borderHighlight: '#a090c0',
  button:          '#9a85c0',
  selection:       '#c8bdd540',
} as const

// ── Light Syntax Tokens ──────────────────────────────────────

export const syntaxLight = {
  comment:       '#8a80a8',
  string:        '#b5571a',
  keyword:       '#8a6d15',
  operator:      '#8a6d15',
  function:      '#0a8a88',
  variable:      '#a0389a',
  variableLang:  '#c62b38',
  constant:      '#c4551a',
  number:        '#c4551a',
  type:          '#c62b38',
  tag:           '#2d8a5e',
  tagPunct:      '#0a8a88',
  attribute:     '#8a6d15',
  property:      '#a0389a',
  escape:        '#0a8a88',
  regexp:        '#c4551a',
  templateExpr:  '#2d8a5e',
  punctuation:   '#3d3552',
  importExport:  '#2d8a5e',
  cssProperty:   '#2d8a5e',
  bracket:       '#3d3552',
} as const

// ── Convenience: all dark colors as a flat object ────────────

export const colors = {
  bg, surface, surfaceAlt, surfaceHover, surfaceMenu, surfaceDeep, surfaceTab,
  text, textStrong, textMuted, textFaint, textFainter,
  pink, cyan, cyanBright, cyanAlt, yellow, green, orange, coral, red, purple, lavender,
  border, borderSubtle, borderMuted, borderHighlight, button, selection, activeTab, findMatch,
} as const

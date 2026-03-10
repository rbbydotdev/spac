import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { generate } from './index'

const args = process.argv.slice(2)

function usage() {
  console.log(`Usage: openapi-gen <spec.json> [options]

Options:
  --out <dir>         Output directory (required for generate, omit for dry-run)
  --strip <prefix>    Path prefix to strip before grouping (repeatable)
  --name <name>       Override API title

Without --out, runs in dry-run mode: prints file list and stats.
With --out, writes generated files to the output directory.`)
  process.exit(1)
}

// Parse args
let specPath: string | undefined
let outDir: string | undefined
let name: string | undefined
const stripPrefixes: string[] = []

for (let i = 0; i < args.length; i++) {
  const arg = args[i]
  if (arg === '--') continue
  if (arg === '--out') {
    outDir = args[++i]
  } else if (arg === '--strip') {
    stripPrefixes.push(args[++i])
  } else if (arg === '--name') {
    name = args[++i]
  } else if (arg === '--help' || arg === '-h') {
    usage()
  } else if (!specPath) {
    specPath = arg
  } else {
    console.error(`Unknown argument: ${arg}`)
    usage()
  }
}

if (!specPath) {
  console.error('Error: spec file path required')
  usage()
  process.exit(1)
}

// Load spec
const spec = JSON.parse(readFileSync(resolve(specPath!), 'utf-8'))

// Generate
const t0 = performance.now()
const files = await generate({ spec, stripPrefixes, name })
const elapsed = performance.now() - t0

if (!outDir) {
  // Dry-run mode: print stats
  console.log(`Dry run — ${files.size} files generated in ${elapsed.toFixed(0)}ms\n`)

  let totalLines = 0
  let totalBytes = 0
  const groups: string[] = []

  for (const [path, content] of files) {
    const lines = content.split('\n').length
    const bytes = Buffer.byteLength(content, 'utf-8')
    totalLines += lines
    totalBytes += bytes

    if (path.endsWith('/index.ts') && path !== 'index.ts') {
      groups.push(path.replace('/index.ts', ''))
    }
  }

  console.log(`  Files:       ${files.size}`)
  console.log(`  Groups:      ${groups.length}`)
  console.log(`  Total lines: ${totalLines.toLocaleString()}`)
  console.log(`  Total size:  ${(totalBytes / 1024).toFixed(0)} KB`)
  console.log()

  // File breakdown
  const schemas = Array.from(files.keys()).filter(k => k.endsWith('schemas.ts'))
  const indexes = Array.from(files.keys()).filter(k => k.endsWith('index.ts'))

  console.log(`  Schema files:   ${schemas.length}`)
  console.log(`  Endpoint files: ${indexes.length}`)
  console.log()

  // Largest files
  const bySize = Array.from(files.entries())
    .map(([path, content]) => ({ path, lines: content.split('\n').length }))
    .sort((a, b) => b.lines - a.lines)
    .slice(0, 10)

  console.log('  Largest files:')
  for (const f of bySize) {
    console.log(`    ${f.lines.toString().padStart(6)} lines  ${f.path}`)
  }
  console.log()

  // Group list
  console.log('  Groups:')
  for (const g of groups.sort()) {
    console.log(`    ${g}`)
  }
} else {
  // Write mode
  let written = 0
  for (const [relPath, content] of files) {
    const fullPath = resolve(outDir, relPath)
    mkdirSync(dirname(fullPath), { recursive: true })
    writeFileSync(fullPath, content, 'utf-8')
    written++
  }
  console.log(`Wrote ${written} files to ${outDir} in ${elapsed.toFixed(0)}ms`)
}

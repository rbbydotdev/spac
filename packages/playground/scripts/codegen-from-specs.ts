/**
 * Generates SPAC TypeScript from OpenAPI specs using @spec-spac/from-openapi.
 * This ensures playground examples always use current spac syntax.
 *
 * Usage: tsx scripts/codegen-from-specs.ts
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { generate } from "@spec-spac/from-openapi"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, "../../..")

interface SpecExample {
  name: string
  specPath: string
  outDir: string
  stripPrefixes?: string[]
  specVersion?: string
}

const examples: SpecExample[] = [
  {
    name: "petstore",
    specPath: path.join(__dirname, "../specs/petstore.json"),
    outDir: path.join(__dirname, "petstore"),
  },
  {
    name: "plantstore",
    specPath: path.join(__dirname, "../specs/plantstore.json"),
    outDir: path.join(__dirname, "plantstore"),
  },
  {
    name: "serpapi",
    specPath: path.join(__dirname, "../specs/serpapi.json"),
    outDir: path.join(__dirname, "serpapi"),
  },
  {
    name: "cloudflare",
    specPath: path.join(repoRoot, "packages/examples/cloudflare/spec.json"),
    outDir: path.join(__dirname, "cloudflare"),
    stripPrefixes: ["/accounts/{account_id}", "/zones/{zone_id}"],
    specVersion: "3.1",
  },
]

for (const ex of examples) {
  if (!fs.existsSync(ex.specPath)) {
    console.log(`[${ex.name}] spec not found at ${ex.specPath}, skipping`)
    continue
  }

  const t0 = performance.now()
  const spec = JSON.parse(fs.readFileSync(ex.specPath, "utf8"))
  const files = await generate({
    spec,
    stripPrefixes: ex.stripPrefixes,
    specVersion: ex.specVersion,
    debug: true,
  })
  const elapsed = performance.now() - t0

  // Write generated files
  fs.mkdirSync(ex.outDir, { recursive: true })

  // Clean previous output
  for (const entry of fs.readdirSync(ex.outDir, { withFileTypes: true })) {
    if (entry.name === "node_modules") continue
    const full = path.join(ex.outDir, entry.name)
    fs.rmSync(full, { recursive: true })
  }

  let written = 0
  for (const [relPath, content] of files) {
    let out = content
    // Strip the trailing emit+log that from-openapi adds for CLI usage —
    // the playground imports the api object directly
    if (relPath === "index.ts") {
      out = out.replace(/\nconst spec = api\.emit\(\)\nconsole\.log\(JSON\.stringify\(spec, null, 2\)\)\n?/, "\n")
    }
    const fullPath = path.join(ex.outDir, relPath)
    fs.mkdirSync(path.dirname(fullPath), { recursive: true })
    fs.writeFileSync(fullPath, out, "utf8")
    written++
  }

  console.log(`[${ex.name}] ${written} files in ${elapsed.toFixed(0)}ms`)
}

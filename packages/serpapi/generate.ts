/**
 * SerpAPI SPAC Generator
 *
 * Fetches engine schemas from serpapi/serpapi-mcp GitHub repo,
 * groups them by engine family, and generates SPAC TypeScript files.
 *
 * Usage: tsx generate.ts
 */

import { mkdirSync, writeFileSync, readdirSync, existsSync } from "node:fs"
import { join, basename } from "node:path"

// ── Types ────────────────────────────────────────────────────────────

interface McpParam {
  description?: string
  type: string
  options?: (string | [string, string])[]
  required?: boolean
  group?: string
}

interface McpEngine {
  engine: string
  params: Record<string, McpParam>
  common_params?: Record<string, McpParam>
}

// ── Engine grouping ──────────────────────────────────────────────────

const ENGINE_GROUP_MAP: Record<string, string> = {
  google: "google",
  bing: "bing",
  yahoo: "yahoo",
  yandex: "yandex",
  duckduckgo: "duckduckgo",
  baidu: "baidu",
  naver: "naver",
  amazon: "ecommerce",
  walmart: "ecommerce",
  ebay: "ecommerce",
  home_depot: "ecommerce",
  apple: "apple",
  youtube: "youtube",
  yelp: "social",
  tripadvisor: "social",
  facebook: "social",
  open_table: "social",
}

const GROUP_DISPLAY: Record<string, { tag: string; description: string; registerFn: string }> = {
  google: { tag: "Google", description: "Google search engines — web, images, maps, scholar, trends, and more", registerFn: "registerGoogle" },
  bing: { tag: "Bing", description: "Bing search engines — web, images, news, shopping, and more", registerFn: "registerBing" },
  yahoo: { tag: "Yahoo", description: "Yahoo search engines — web, images, shopping, videos", registerFn: "registerYahoo" },
  yandex: { tag: "Yandex", description: "Yandex search engines — web, images, videos", registerFn: "registerYandex" },
  duckduckgo: { tag: "DuckDuckGo", description: "DuckDuckGo search engines — web, maps, news", registerFn: "registerDuckDuckGo" },
  baidu: { tag: "Baidu", description: "Baidu search engines — web, news", registerFn: "registerBaidu" },
  naver: { tag: "Naver", description: "Naver search engines — web, AI overview", registerFn: "registerNaver" },
  ecommerce: { tag: "E-Commerce", description: "E-commerce search — Amazon, Walmart, eBay, Home Depot", registerFn: "registerEcommerce" },
  apple: { tag: "Apple", description: "Apple App Store — search, product details, reviews", registerFn: "registerApple" },
  youtube: { tag: "YouTube", description: "YouTube search — videos, transcripts, and more", registerFn: "registerYouTube" },
  social: { tag: "Social & Reviews", description: "Social and review platforms — Yelp, TripAdvisor, Facebook, OpenTable", registerFn: "registerSocial" },
}

function getGroup(engine: string): string {
  for (const [prefix, group] of Object.entries(ENGINE_GROUP_MAP)) {
    if (engine === prefix || engine.startsWith(prefix + "_")) return group
  }
  return "other"
}

// ── Response schema overrides ────────────────────────────────────────
// Maps engine name → { variable, importPath } for typed response schemas

const RESPONSE_OVERRIDES: Record<string, { variable: string; importPath: string }> = {
  google: { variable: "GoogleSearchResponse", importPath: "./schemas" },
  google_maps: { variable: "GoogleMapsResponse", importPath: "./schemas" },
  google_images: { variable: "GoogleImagesResponse", importPath: "./schemas" },
  google_images_light: { variable: "GoogleImagesResponse", importPath: "./schemas" },
  google_news: { variable: "GoogleNewsResponse", importPath: "./schemas" },
  google_news_light: { variable: "GoogleNewsResponse", importPath: "./schemas" },
  google_shopping: { variable: "GoogleShoppingResponse", importPath: "./schemas" },
  google_shopping_light: { variable: "GoogleShoppingResponse", importPath: "./schemas" },
  google_local: { variable: "GoogleMapsResponse", importPath: "./schemas" },
}

// ── Example auto-discovery ───────────────────────────────────────────
// Scans {group}/examples/ dirs for JSON files.
// File naming convention: {engine_name}-{description}.json
// e.g., google-search-coffee.json → engine "google", example name "search-coffee"

interface ExampleOverride {
  name: string
  summary: string
  importPath: string
}

function discoverExamples(root: string, groups: Map<string, McpEngine[]>): Record<string, ExampleOverride[]> {
  const overrides: Record<string, ExampleOverride[]> = {}

  for (const [groupSlug, engines] of groups.entries()) {
    const exDir = join(root, groupSlug, "examples")
    if (!existsSync(exDir)) continue

    const files = readdirSync(exDir).filter((f) => f.endsWith(".json")).sort()
    for (const file of files) {
      const name = basename(file, ".json")
      // Match engine name: the file prefix before the first description segment
      // e.g., "google-search-coffee" → try "google", "google-maps-pizza" → try "google_maps"
      const matchedEngine = findMatchingEngine(name, engines)
      if (!matchedEngine) {
        console.log(`  [warn] ${groupSlug}/examples/${file} — no matching engine found, skipping`)
        continue
      }

      const exName = name.replace(new RegExp(`^${matchedEngine.replace(/_/g, "-")}-?`), "") || name
      const summary = `${engineToHumanName(matchedEngine)} example: ${exName.replace(/-/g, " ")}`

      if (!overrides[matchedEngine]) overrides[matchedEngine] = []
      overrides[matchedEngine].push({
        name: exName || name,
        summary,
        importPath: `./examples/${file}`,
      })
    }
  }

  return overrides
}

function findMatchingEngine(fileName: string, engines: McpEngine[]): string | null {
  // Normalize: file uses hyphens, engines use underscores
  const normalized = fileName.replace(/-/g, "_")
  // Sort engines by name length descending so longer names match first (google_maps before google)
  const sorted = [...engines].sort((a, b) => b.engine.length - a.engine.length)
  for (const engine of sorted) {
    if (normalized.startsWith(engine.engine + "_") || normalized === engine.engine) {
      return engine.engine
    }
  }
  return null
}

// ── Parameter type mapping ───────────────────────────────────────────

function escapeStr(s: string | [string, string]): string {
  return JSON.stringify(Array.isArray(s) ? s[0] : s)
}

/** Extract the value from an option that may be a string or [value, label] tuple */
function optionValue(opt: string | [string, string]): string {
  return Array.isArray(opt) ? opt[0] : opt
}

function mcpParamToTypebox(_name: string, param: McpParam): string {
  const desc = param.description?.replace(/\n/g, " ").trim()
  const descOpt = desc ? `{ description: ${escapeStr(desc)} }` : ""

  let inner: string

  switch (param.type) {
    case "select":
      if (param.options && param.options.length > 0 && param.options.length <= 30) {
        const literals = param.options.map((o) => `Type.Literal(${escapeStr(optionValue(o))})`).join(", ")
        if (desc) {
          inner = `Type.Union([${literals}], { description: ${escapeStr(desc)} })`
        } else {
          inner = `Type.Union([${literals}])`
        }
      } else if (param.options && param.options.length > 30) {
        const sample = param.options.slice(0, 10).map(optionValue).join(", ")
        const fullDesc = desc ? `${desc}. Valid values include: ${sample}, and ${param.options.length - 10} more` : `Valid values include: ${sample}, and ${param.options.length - 10} more`
        inner = `Type.String({ description: ${escapeStr(fullDesc)} })`
      } else {
        inner = desc ? `Type.String(${descOpt})` : "Type.String()"
      }
      break

    case "checkbox":
      inner = desc ? `Type.Boolean(${descOpt})` : "Type.Boolean()"
      break

    case "number":
      inner = desc ? `Type.Number(${descOpt})` : "Type.Number()"
      break

    case "integer":
      inner = desc ? `Type.Integer(${descOpt})` : "Type.Integer()"
      break

    case "text":
    case "location":
    default:
      inner = desc ? `Type.String(${descOpt})` : "Type.String()"
      break
  }

  return param.required ? inner : `Type.Optional(${inner})`
}

// ── Fetch engine schemas from GitHub ─────────────────────────────────

async function fetchEngineList(): Promise<string[]> {
  const res = await fetch("https://api.github.com/repos/serpapi/serpapi-mcp/contents/engines", {
    headers: { Accept: "application/vnd.github.v3+json", "User-Agent": "spac-generator" },
  })
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)
  const files = (await res.json()) as Array<{ name: string }>
  return files.filter((f) => f.name.endsWith(".json")).map((f) => f.name.replace(".json", ""))
}

async function fetchEngine(name: string): Promise<McpEngine> {
  const url = `https://raw.githubusercontent.com/serpapi/serpapi-mcp/main/engines/${name}.json`
  const res = await fetch(url, { headers: { "User-Agent": "spac-generator" } })
  if (!res.ok) throw new Error(`Failed to fetch ${name}: ${res.status}`)
  return res.json() as Promise<McpEngine>
}

// ── Code generation ──────────────────────────────────────────────────

function engineToHumanName(engine: string): string {
  return engine
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

function engineToOperationId(engine: string): string {
  const parts = engine.split("_")
  return "search" + parts.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")
}

function generateEngineRoute(engine: McpEngine, indent: string, exampleOverrides: Record<string, ExampleOverride[]>): string {
  const lines: string[] = []
  const queryProps: string[] = []

  // Engine-specific params (skip "engine" since it's implicit in the virtual path)
  for (const [name, param] of Object.entries(engine.params)) {
    if (name === "engine") continue
    queryProps.push(`${indent}    ${safePropKey(name)}: ${mcpParamToTypebox(name, param)},`)
  }

  // Common params (skip engine and api_key which are handled by security/virtual path)
  if (engine.common_params) {
    const SKIP_COMMON = new Set(["engine", "api_key"])
    for (const [name, param] of Object.entries(engine.common_params)) {
      if (SKIP_COMMON.has(name)) continue
      // Don't duplicate if already in engine-specific params
      if (name in engine.params) continue
      queryProps.push(`${indent}    ${safePropKey(name)}: ${mcpParamToTypebox(name, { ...param, required: false })},`)
    }
  }

  const humanName = engineToHumanName(engine.engine)
  const opId = engineToOperationId(engine.engine)
  const tag = GROUP_DISPLAY[getGroup(engine.engine)]?.tag ?? "Other"
  const override = RESPONSE_OVERRIDES[engine.engine]
  const responseExpr = override ? override.variable : `Type.Unknown({ description: "${humanName} search results" })`

  lines.push(`${indent}g.get("/${engine.engine}")`)
  if (queryProps.length > 0) {
    lines.push(`${indent}  .query(Type.Object({`)
    lines.push(...queryProps)
    lines.push(`${indent}  }))`)
  }
  lines.push(`${indent}  .response(${responseExpr})`)
  lines.push(`${indent}  .summary(${escapeStr(humanName)})`)
  lines.push(`${indent}  .description(${escapeStr(`Search via ${humanName}. Real API: GET /search.json?engine=${engine.engine}`)})`)
  lines.push(`${indent}  .operationId(${escapeStr(opId)})`)
  lines.push(`${indent}  .tag(${escapeStr(tag)})`)
  lines.push(`${indent}  .extension("x-serpapi-engine", ${escapeStr(engine.engine)})`)
  lines.push(`${indent}  .extension("x-serpapi-real-path", "/search.json")`)

  // Append .example() calls for engines with example JSON
  const examples = exampleOverrides[engine.engine]
  if (examples) {
    for (const ex of examples) {
      lines.push(`${indent}  .example(${escapeStr(ex.name)}, { summary: ${escapeStr(ex.summary)}, value: ${exampleVarName(engine.engine, ex.name)} })`)
    }
  }

  lines.push("")

  return lines.join("\n")
}

function exampleVarName(engine: string, name: string): string {
  const parts = [...engine.split("_"), ...name.split("-")]
  return parts.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("") + "Example"
}

function safePropKey(key: string): string {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`
}

function generateModuleIndex(groupSlug: string, engines: McpEngine[], exampleOverrides: Record<string, ExampleOverride[]>): string {
  const display = GROUP_DISPLAY[groupSlug] ?? { tag: "Other", registerFn: `register${groupSlug.charAt(0).toUpperCase() + groupSlug.slice(1)}` }

  // Collect schema imports needed for response overrides
  const schemaImports = new Map<string, Set<string>>() // importPath → Set<variable>
  for (const engine of engines) {
    const override = RESPONSE_OVERRIDES[engine.engine]
    if (override) {
      if (!schemaImports.has(override.importPath)) schemaImports.set(override.importPath, new Set())
      schemaImports.get(override.importPath)!.add(override.variable)
    }
  }

  // Collect example JSON imports
  const exampleImports: { varName: string; path: string }[] = []
  for (const engine of engines) {
    const examples = exampleOverrides[engine.engine]
    if (examples) {
      for (const ex of examples) {
        exampleImports.push({ varName: exampleVarName(engine.engine, ex.name), path: ex.importPath })
      }
    }
  }

  const lines: string[] = []
  lines.push(`import { Type } from "@sinclair/typebox"`)
  lines.push(`import type { Api } from "spac"`)
  for (const [path, vars] of schemaImports.entries()) {
    lines.push(`import { ${[...vars].sort().join(", ")} } from ${escapeStr(path)}`)
  }
  for (const { varName, path } of exampleImports) {
    lines.push(`import ${varName} from ${escapeStr(path)}`)
  }
  lines.push("")
  lines.push(`export function ${display.registerFn}(api: Api) {`)
  lines.push(`  api.group("/search", (g) => {`)

  // Sort engines alphabetically for deterministic output
  const sorted = [...engines].sort((a, b) => a.engine.localeCompare(b.engine))
  for (const engine of sorted) {
    lines.push(generateEngineRoute(engine, "    ", exampleOverrides))
  }

  lines.push(`  })`)
  lines.push(`}`)
  lines.push("")

  return lines.join("\n")
}

function generateRootIndex(groups: Map<string, McpEngine[]>): string {
  const lines: string[] = []

  lines.push(`import { Api } from "spac"`)

  // Import modules
  const sortedGroups = [...groups.keys()].sort()
  for (const slug of sortedGroups) {
    const display = GROUP_DISPLAY[slug] ?? { registerFn: `register${slug.charAt(0).toUpperCase() + slug.slice(1)}` }
    lines.push(`import { ${display.registerFn} } from "./${slug}"`)
  }
  lines.push(`import { registerAccount } from "./account"`)
  lines.push("")

  lines.push(`const api = new Api("3.1", "SerpAPI", {`)
  lines.push(`  version: "1.0.0",`)
  lines.push(`  description:`)
  lines.push(`    "Comprehensive OpenAPI specification for SerpAPI — the real-time search engine results API. " +`)
  lines.push(`    "Supports 107+ search engines including Google, Bing, Yahoo, YouTube, Amazon, Walmart, and more. " +`)
  lines.push(`    "All search endpoints use virtual paths (e.g., /search/google) that map to GET /search.json?engine=<engine>. " +`)
  lines.push(`    "See the x-serpapi-engine extension on each operation for the real engine parameter value.",`)
  lines.push(`  contact: { name: "SerpAPI", url: "https://serpapi.com" },`)
  lines.push(`  license: { name: "MIT", url: "https://opensource.org/licenses/MIT" },`)
  lines.push(`})`)
  lines.push("")

  lines.push(`api.server({ url: "https://serpapi.com", description: "SerpAPI Production Server" })`)
  lines.push("")

  // Security schemes
  lines.push(`api.securityScheme("api_key", {`)
  lines.push(`  type: "apiKey",`)
  lines.push(`  name: "api_key",`)
  lines.push(`  in: "query",`)
  lines.push(`  description: "API key passed as a query parameter",`)
  lines.push(`})`)
  lines.push(`api.securityScheme("bearer", {`)
  lines.push(`  type: "http",`)
  lines.push(`  scheme: "bearer",`)
  lines.push(`  description: "Bearer token in the Authorization header",`)
  lines.push(`})`)
  lines.push("")
  lines.push(`api.security("api_key")`)
  lines.push(`api.security("bearer")`)
  lines.push("")

  // Tags
  for (const slug of sortedGroups) {
    const display = GROUP_DISPLAY[slug]
    if (display) {
      lines.push(`api.tag({ name: ${escapeStr(display.tag)}, description: ${escapeStr(display.description)} })`)
    }
  }
  lines.push(`api.tag({ name: "Account", description: "Account management, location lookup, and search archive" })`)
  lines.push("")

  // Register all modules
  for (const slug of sortedGroups) {
    const display = GROUP_DISPLAY[slug] ?? { registerFn: `register${slug.charAt(0).toUpperCase() + slug.slice(1)}` }
    lines.push(`${display.registerFn}(api)`)
  }
  lines.push(`registerAccount(api)`)
  lines.push("")

  lines.push(`const spec = api.emit()`)
  lines.push(`console.log(JSON.stringify(spec, null, 2))`)
  lines.push("")

  return lines.join("\n")
}

function generateAccountIndex(): string {
  return `import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { AccountInfo, LocationResult, SearchArchiveResult, SerpApiError } from "../shared/schemas"
import AccountInfoExample from "./examples/account-info.json"
import LocationsAustinExample from "./examples/locations-austin.json"

export function registerAccount(api: Api) {
  api.get("/account")
    .response(AccountInfo)
    .summary("Account Information")
    .description("Returns account information including current plan, usage statistics, rate limits, and remaining quota. Free — does not count against your search quota.")
    .operationId("getAccount")
    .tag("Account")
    .example("demo-account", { summary: "Big Data Plan account", value: AccountInfoExample })

  api.get("/locations")
    .query(Type.Object({
      q: Type.Optional(Type.String({ description: "Location search query (e.g., 'Austin', 'London, UK')" })),
      limit: Type.Optional(Type.Integer({ description: "Maximum number of results (1-10)", default: 5, minimum: 1, maximum: 10 })),
    }))
    .response(Type.Array(LocationResult))
    .summary("Location Search")
    .description("Find valid location strings for geo-targeted searches. Returns matching locations with Google-encoded UULE values, GPS coordinates, and reach estimates. Free — does not count against your search quota.")
    .operationId("getLocations")
    .tag("Account")
    .example("austin-locations", { summary: "Search for 'Austin'", value: LocationsAustinExample })

  api.get("/searches/{search_id}")
    .params(Type.Object({
      search_id: Type.String({ description: "The unique search identifier returned in search_metadata.id" }),
    }))
    .response(SearchArchiveResult)
    .error(404, SerpApiError)
    .summary("Search Archive")
    .description("Retrieve past search results by their unique ID. Results are stored for 31 days after the original search. The response format matches the original engine's response schema.")
    .operationId("getSearchArchive")
    .tag("Account")
}
`
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  const root = import.meta.dirname ?? "."

  console.log("Fetching engine list from GitHub...")
  const engineNames = await fetchEngineList()
  console.log(`Found ${engineNames.length} engines`)

  console.log("Fetching engine schemas (this may take a moment)...")
  const engines: McpEngine[] = []

  // Fetch in batches of 20 to avoid rate limiting
  for (let i = 0; i < engineNames.length; i += 20) {
    const batch = engineNames.slice(i, i + 20)
    const results = await Promise.all(batch.map(fetchEngine))
    engines.push(...results)
    if (i + 20 < engineNames.length) {
      process.stdout.write(`  ${engines.length}/${engineNames.length} fetched\r`)
    }
  }
  console.log(`  ${engines.length}/${engineNames.length} fetched — done`)

  // Group engines by family
  const groups = new Map<string, McpEngine[]>()
  for (const engine of engines) {
    const group = getGroup(engine.engine)
    if (!groups.has(group)) groups.set(group, [])
    groups.get(group)!.push(engine)
  }

  console.log("\nEngine groups:")
  for (const [slug, members] of [...groups.entries()].sort()) {
    console.log(`  ${slug}: ${members.length} engines`)
  }

  // Auto-discover example JSON files
  const exampleOverrides = discoverExamples(root, groups)
  const exampleCount = Object.values(exampleOverrides).reduce((sum, arr) => sum + arr.length, 0)
  console.log(`\nDiscovered ${exampleCount} example files`)

  // Generate module files
  for (const [slug, members] of groups.entries()) {
    const dir = join(root, slug)
    mkdirSync(dir, { recursive: true })
    const code = generateModuleIndex(slug, members, exampleOverrides)
    writeFileSync(join(dir, "index.ts"), code, "utf-8")
    console.log(`  wrote ${slug}/index.ts (${members.length} engines)`)
  }

  // Generate account module
  const accountDir = join(root, "account")
  mkdirSync(accountDir, { recursive: true })
  writeFileSync(join(accountDir, "index.ts"), generateAccountIndex(), "utf-8")
  console.log("  wrote account/index.ts")

  // Generate root index.ts
  const rootIndex = generateRootIndex(groups)
  writeFileSync(join(root, "index.ts"), rootIndex, "utf-8")
  console.log("  wrote index.ts")

  console.log(`\nGeneration complete! ${engines.length} engines across ${groups.size} modules.`)
  console.log("Run 'tsx index.ts' to emit the OpenAPI spec.")
}

main().catch((err) => {
  console.error("Generation failed:", err)
  process.exit(1)
})

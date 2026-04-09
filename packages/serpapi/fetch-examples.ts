/**
 * SerpAPI Example Response Fetcher
 *
 * Fetches example JSON responses from SerpAPI documentation pages,
 * cleans them up, and saves them as importable JSON files.
 *
 * Usage: tsx fetch-examples.ts
 */

import { mkdirSync, writeFileSync, existsSync } from "node:fs"
import { join } from "node:path"
import { execSync } from "node:child_process"

// ── Engine → doc page mapping ────────────────────────────────────────

interface EngineDocs {
  engine: string
  group: string
  docUrl: string
  exampleName: string
  summary: string
}

const ENGINE_DOCS: EngineDocs[] = [
  // Google family
  { engine: "google", group: "google", docUrl: "https://serpapi.com/search-api", exampleName: "google-search-coffee", summary: "Google search for 'coffee'" },
  { engine: "google_maps", group: "google", docUrl: "https://serpapi.com/google-maps-api", exampleName: "google-maps-pizza", summary: "Google Maps search for 'pizza' in NYC" },
  { engine: "google_images", group: "google", docUrl: "https://serpapi.com/google-images-api", exampleName: "google-images-coffee", summary: "Google Images search for 'coffee'" },
  { engine: "google_news", group: "google", docUrl: "https://serpapi.com/google-news-api", exampleName: "google-news-coffee", summary: "Google News search for 'coffee'" },
  { engine: "google_shopping", group: "google", docUrl: "https://serpapi.com/google-shopping-api", exampleName: "google-shopping-coffee", summary: "Google Shopping search for 'coffee'" },
  { engine: "google_scholar", group: "google", docUrl: "https://serpapi.com/google-scholar-api", exampleName: "google-scholar-biology", summary: "Google Scholar search for 'biology'" },
  { engine: "google_flights", group: "google", docUrl: "https://serpapi.com/google-flights-api", exampleName: "google-flights", summary: "Google Flights search" },
  { engine: "google_jobs", group: "google", docUrl: "https://serpapi.com/google-jobs-api", exampleName: "google-jobs-barista", summary: "Google Jobs search for 'barista'" },
  { engine: "google_finance", group: "google", docUrl: "https://serpapi.com/google-finance-api", exampleName: "google-finance", summary: "Google Finance search" },
  { engine: "google_trends", group: "google", docUrl: "https://serpapi.com/google-trends-api", exampleName: "google-trends-coffee", summary: "Google Trends for 'coffee'" },
  { engine: "google_autocomplete", group: "google", docUrl: "https://serpapi.com/google-autocomplete-api", exampleName: "google-autocomplete-coffee", summary: "Google Autocomplete for 'coffee'" },
  { engine: "google_lens", group: "google", docUrl: "https://serpapi.com/google-lens-search-api", exampleName: "google-lens", summary: "Google Lens search" },
  { engine: "google_hotels", group: "google", docUrl: "https://serpapi.com/google-hotels-api", exampleName: "google-hotels-bali", summary: "Google Hotels search for Bali" },
  { engine: "google_local", group: "google", docUrl: "https://serpapi.com/google-local-api", exampleName: "google-local-coffee", summary: "Google Local search for 'coffee'" },
  { engine: "google_events", group: "google", docUrl: "https://serpapi.com/google-events-api", exampleName: "google-events", summary: "Google Events search" },
  { engine: "google_patents", group: "google", docUrl: "https://serpapi.com/google-patents-api", exampleName: "google-patents-coffee", summary: "Google Patents search for 'coffee'" },
  { engine: "google_videos", group: "google", docUrl: "https://serpapi.com/google-videos-api", exampleName: "google-videos-coffee", summary: "Google Videos search for 'coffee'" },
  { engine: "google_reverse_image", group: "google", docUrl: "https://serpapi.com/google-reverse-image-search-api", exampleName: "google-reverse-image", summary: "Google Reverse Image search" },
  { engine: "google_play", group: "google", docUrl: "https://serpapi.com/google-play-search-api", exampleName: "google-play-weather", summary: "Google Play search for 'weather'" },

  // Bing
  { engine: "bing", group: "bing", docUrl: "https://serpapi.com/bing-search-api", exampleName: "bing-search-coffee", summary: "Bing search for 'Coffee'" },
  { engine: "bing_images", group: "bing", docUrl: "https://serpapi.com/bing-images-api", exampleName: "bing-images-coffee", summary: "Bing Images search for 'coffee'" },
  { engine: "bing_news", group: "bing", docUrl: "https://serpapi.com/bing-news-api", exampleName: "bing-news-coffee", summary: "Bing News search for 'coffee'" },

  // YouTube
  { engine: "youtube", group: "youtube", docUrl: "https://serpapi.com/youtube-search-api", exampleName: "youtube-search-star-wars", summary: "YouTube search for 'star wars'" },
  { engine: "youtube_video", group: "youtube", docUrl: "https://serpapi.com/youtube-video-api", exampleName: "youtube-video", summary: "YouTube video details" },

  // E-commerce
  { engine: "amazon", group: "ecommerce", docUrl: "https://serpapi.com/amazon-search-api", exampleName: "amazon-search-coffee", summary: "Amazon search for 'Coffee'" },
  { engine: "amazon_product", group: "ecommerce", docUrl: "https://serpapi.com/amazon-product-api", exampleName: "amazon-product", summary: "Amazon product details" },
  { engine: "walmart", group: "ecommerce", docUrl: "https://serpapi.com/walmart-search-api", exampleName: "walmart-search-coffee", summary: "Walmart search for 'Coffee'" },
  { engine: "ebay", group: "ecommerce", docUrl: "https://serpapi.com/ebay-search-api", exampleName: "ebay-search-coffee", summary: "eBay search for 'Coffee'" },
  { engine: "home_depot", group: "ecommerce", docUrl: "https://serpapi.com/home-depot-search-api", exampleName: "home-depot-search", summary: "Home Depot search" },

  // Other engines
  { engine: "yahoo", group: "yahoo", docUrl: "https://serpapi.com/yahoo-search-api", exampleName: "yahoo-search-coffee", summary: "Yahoo search for 'Coffee'" },
  { engine: "yandex", group: "yandex", docUrl: "https://serpapi.com/yandex-search-api", exampleName: "yandex-search-coffee", summary: "Yandex search for 'Coffee'" },
  { engine: "duckduckgo", group: "duckduckgo", docUrl: "https://serpapi.com/duckduckgo-search-api", exampleName: "duckduckgo-search-coffee", summary: "DuckDuckGo search for 'Coffee'" },
  { engine: "baidu", group: "baidu", docUrl: "https://serpapi.com/baidu-search-api", exampleName: "baidu-search", summary: "Baidu search" },
  { engine: "naver", group: "naver", docUrl: "https://serpapi.com/naver-search-api", exampleName: "naver-search", summary: "Naver search" },
  { engine: "apple_app_store", group: "apple", docUrl: "https://serpapi.com/apple-app-store-api", exampleName: "apple-app-store", summary: "Apple App Store search" },
  { engine: "yelp", group: "social", docUrl: "https://serpapi.com/yelp-search-api", exampleName: "yelp-search-coffee", summary: "Yelp search for 'coffee'" },
  { engine: "tripadvisor", group: "social", docUrl: "https://serpapi.com/tripadvisor-search-api", exampleName: "tripadvisor-search", summary: "TripAdvisor search" },
]

// ── Markdown → JSON extraction ───────────────────────────────────────

function fetchMarkdown(url: string): string {
  try {
    return execSync(`markit "${url}" -q`, { encoding: "utf-8", timeout: 30_000, maxBuffer: 5 * 1024 * 1024 })
  } catch {
    return ""
  }
}

function extractJsonFromMarkdown(md: string): unknown | null {
  // Strategy 1: Look for JSON code blocks
  const jsonBlockRegex = /```(?:json)?\s*\n(\{[\s\S]*?\})\s*\n```/g
  let match

  while ((match = jsonBlockRegex.exec(md)) !== null) {
    try {
      const parsed = JSON.parse(match[1])
      if (parsed.search_metadata || parsed.search_parameters) return parsed
    } catch {
      continue
    }
  }

  // Strategy 2: Find the LARGEST JSON object in the markdown that looks like a SerpAPI response.
  // SerpAPI docs embed JSON inline without code fences. We use a brace-balancing parser.
  const results: unknown[] = []

  // Find all positions where a JSON object starts with "search_metadata"
  const startPattern = /\{\s*\n\s*"search_metadata"/g
  let startMatch
  while ((startMatch = startPattern.exec(md)) !== null) {
    const start = startMatch.index
    // Balance braces to find the end
    let depth = 0
    let inString = false
    let escaped = false
    let end = -1
    for (let i = start; i < md.length && i < start + 500_000; i++) {
      const ch = md[i]
      if (escaped) { escaped = false; continue }
      if (ch === "\\") { escaped = true; continue }
      if (ch === '"' && !escaped) { inString = !inString; continue }
      if (inString) continue
      if (ch === "{") depth++
      else if (ch === "}") {
        depth--
        if (depth === 0) { end = i + 1; break }
      }
    }
    if (end > start) {
      try {
        const parsed = JSON.parse(md.slice(start, end))
        if (parsed.search_metadata) results.push(parsed)
      } catch {
        // partial/malformed — skip
      }
    }
  }

  // Return the largest (most complete) result
  if (results.length > 0) {
    return results.sort((a, b) => JSON.stringify(b).length - JSON.stringify(a).length)[0]
  }

  return null
}

function trimExample(data: unknown, maxArrayItems = 3): unknown {
  if (data === null || data === undefined) return data
  if (typeof data !== "object") return data

  if (Array.isArray(data)) {
    return data.slice(0, maxArrayItems).map((item) => trimExample(item, maxArrayItems))
  }

  const obj = data as Record<string, unknown>
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    // Skip very long tracking URLs — keep clean/short versions
    if (typeof value === "string" && value.length > 300) {
      if (key.includes("link") || key.includes("url") || key.includes("Link")) {
        // Keep only if it's a clean URL
        if (value.startsWith("http") && !value.includes("aclk") && !value.includes("tracking")) {
          result[key] = value.slice(0, 200) // truncate very long URLs
        }
        continue
      }
      // Keep long descriptions but truncate
      result[key] = (value as string).slice(0, 300)
      continue
    }

    result[key] = trimExample(value, maxArrayItems)
  }

  return result
}

// ── Fetch and process ────────────────────────────────────────────────

async function fetchAndSaveExample(doc: EngineDocs, root: string): Promise<boolean> {
  const dir = join(root, doc.group, "examples")
  const filePath = join(dir, `${doc.exampleName}.json`)

  // Skip if already exists
  if (existsSync(filePath)) {
    console.log(`  [skip] ${doc.engine} — already exists`)
    return true
  }

  try {
    console.log(`  [fetch] ${doc.engine} — ${doc.docUrl}`)
    const md = fetchMarkdown(doc.docUrl)

    if (!md) {
      console.log(`  [warn] ${doc.engine} — markit returned empty`)
      return false
    }

    const json = extractJsonFromMarkdown(md)

    if (!json) {
      console.log(`  [warn] ${doc.engine} — no JSON found in markdown`)
      return false
    }

    const trimmed = trimExample(json)

    mkdirSync(dir, { recursive: true })
    writeFileSync(filePath, JSON.stringify(trimmed, null, 2) + "\n", "utf-8")
    console.log(`  [saved] ${doc.engine} → ${doc.exampleName}.json`)
    return true
  } catch (err) {
    console.log(`  [error] ${doc.engine}: ${(err as Error).message}`)
    return false
  }
}

// ── Generate EXAMPLE_OVERRIDES code ──────────────────────────────────

function generateOverridesCode(docs: EngineDocs[], successfulEngines: Set<string>): string {
  const lines: string[] = []
  lines.push("const EXAMPLE_OVERRIDES: Record<string, ExampleOverride[]> = {")

  let currentGroup = ""
  for (const doc of docs) {
    if (!successfulEngines.has(doc.engine)) continue
    if (doc.group !== currentGroup) {
      if (currentGroup) lines.push("")
      lines.push(`  // ${doc.group.charAt(0).toUpperCase() + doc.group.slice(1)}`)
      currentGroup = doc.group
    }
    lines.push(
      `  ${doc.engine}: [{ name: "${doc.exampleName}", summary: "${doc.summary}", importPath: "./examples/${doc.exampleName}.json" }],`,
    )
  }

  lines.push("}")
  return lines.join("\n")
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  const root = import.meta.dirname ?? "."

  console.log(`Fetching example responses for ${ENGINE_DOCS.length} engines...\n`)

  const successful = new Set<string>()

  // Fetch in batches of 5 to avoid overwhelming the server
  for (let i = 0; i < ENGINE_DOCS.length; i += 5) {
    const batch = ENGINE_DOCS.slice(i, i + 5)
    const results = await Promise.all(batch.map((doc) => fetchAndSaveExample(doc, root)))
    results.forEach((ok, idx) => {
      if (ok) successful.add(batch[idx].engine)
    })
    // Small delay between batches
    if (i + 5 < ENGINE_DOCS.length) {
      await new Promise((r) => setTimeout(r, 500))
    }
  }

  console.log(`\n${successful.size}/${ENGINE_DOCS.length} examples fetched.`)
  console.log("\nGenerated EXAMPLE_OVERRIDES code:\n")
  console.log(generateOverridesCode(ENGINE_DOCS, successful))
}

main().catch((err) => {
  console.error("Fetch failed:", err)
  process.exit(1)
})

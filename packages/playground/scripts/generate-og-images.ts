/**
 * Generate OG images for the playground using Playwright.
 *
 * Produces:
 *   public/og/playground.png        — default OG image
 *   public/og/<example>.png         — per-example OG images
 *
 * Run after `generate` (needs built fixtures) and before `build`.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");
const outDir = path.resolve(publicDir, "og");
const dataDir = path.resolve(publicDir, "data");

const WIDTH = 1200;
const HEIGHT = 630;
const SCALE = 2;

interface ExampleInfo {
  name: string;
  files: number;
  paths: number;
  schemas: number;
  lines: number;
  snippet: string;
}

function getExampleInfo(name: string): ExampleInfo | null {
  const manifestPath = path.join(dataDir, name, "manifest.json");
  if (!fs.existsSync(manifestPath)) return null;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  const files: string[] = manifest.files;
  const yaml: string = manifest.yaml;
  const sourceTable: { kind: string; path: string }[] = manifest.sourceTable;

  const pathCount = new Set(
    sourceTable
      .filter((e) => e.kind === "route")
      .map((e) => e.path.split(".").slice(0, 2).join(".")),
  ).size;
  const schemaCount = sourceTable.filter((e) => e.kind === "schema").length;

  // Get a code snippet from the first non-index source file
  let snippet = "";
  const sourcesDir = path.join(dataDir, name, "sources");
  if (fs.existsSync(sourcesDir)) {
    // Find a good file with route definitions
    const candidates = files.filter(
      (f) => f.endsWith("index.ts") && f !== "index.ts",
    );
    const file = candidates[0] || files[0];
    if (file) {
      const content = fs.readFileSync(path.join(sourcesDir, file), "utf-8");
      // Take lines that show route definitions
      const lines = content.split("\n");
      const start = lines.findIndex(
        (l) =>
          l.includes(".get(") ||
          l.includes(".post(") ||
          l.includes(".group("),
      );
      if (start >= 0) {
        snippet = lines.slice(Math.max(0, start - 1), start + 12).join("\n");
      } else {
        snippet = lines.slice(0, 14).join("\n");
      }
    }
  }

  return {
    name,
    files: files.length,
    paths: pathCount,
    schemas: schemaCount,
    lines: yaml.split("\n").length,
    snippet,
  };
}

function renderOgHtml(info: ExampleInfo | null, isDefault: boolean): string {
  const title = isDefault ? "spac playground" : `${info!.name}`;
  const subtitle = isDefault
    ? "Interactive TypeScript → OpenAPI explorer with hover docs and source maps"
    : `${info!.files} files · ${info!.paths} paths · ${info!.schemas} schemas · ${info!.lines} YAML lines`;
  const snippet = info?.snippet || `import { Api, named } from '@spec-spac/spac'
import { Type } from '@sinclair/typebox'

const api = new Api('3.1', 'Petstore')
api.group('/pets', g => {
  g.get('/')
    .response(Type.Array(Pet))
    .summary('List all pets')
  g.post('/')
    .body(Pet)
    .response(Pet)
})`;

  const escapedSnippet = snippet
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400&family=Onest:wght@400;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    overflow: hidden;
    font-family: 'Onest', sans-serif;
    background: #1a1028;
    background-image: linear-gradient(135deg, #1a1028 0%, #2d1650 50%, #1e0a3a 100%);
    position: relative;
  }
  .glow1 {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(ellipse 50% 40% at 25% 20%, rgba(192,132,252,0.08), transparent);
  }
  .glow2 {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(ellipse 50% 40% at 75% 80%, rgba(244,114,182,0.06), transparent);
  }
  .code-bg {
    position: absolute;
    top: 40px; left: 60px; right: 60px;
    font-family: 'Fira Code', monospace;
    font-size: 14px;
    line-height: 1.6;
    color: rgba(192,132,252,0.1);
    white-space: pre;
    transform: rotate(1.5deg);
    overflow: hidden;
    max-height: 400px;
  }
  .content {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 0 60px 0;
    display: flex;
    flex-direction: column;
    z-index: 2;
  }
  .tag {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #848bbd;
    margin-bottom: 12px;
  }
  .title {
    font-size: 64px;
    font-weight: 700;
    color: #c084fc;
    margin-bottom: 8px;
    line-height: 1.1;
  }
  .subtitle {
    font-size: 20px;
    color: #c4b5d0;
    margin-bottom: 32px;
    line-height: 1.4;
  }
  .pills {
    display: flex;
    gap: 32px;
    padding: 16px 0;
    border-top: 1px solid #2e2244;
  }
  .pill {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #848bbd;
  }
  .pill-icon {
    width: 18px;
    height: 18px;
    color: #c084fc;
  }
  .accent-bar {
    height: 3px;
    background: linear-gradient(90deg, #f472b6, #c084fc, #f472b6);
    margin-top: auto;
  }
</style>
</head>
<body>
  <div class="glow1"></div>
  <div class="glow2"></div>
  <div class="code-bg">${escapedSnippet}</div>
  <div class="content">
    <div class="tag">TypeBox Schemas · Source Maps · Named $refs</div>
    <div class="title">${title}</div>
    <div class="subtitle">${subtitle}</div>
    <div class="pills">
      <div class="pill">
        <svg class="pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        TypeScript DSL
      </div>
      <div class="pill">
        <svg class="pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        Code Generator
      </div>
      <div class="pill">
        <svg class="pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Source Maps
      </div>
      <div class="pill">
        <svg class="pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        Hover Docs
      </div>
    </div>
  </div>
  <div class="accent-bar"></div>
</body>
</html>`;
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: SCALE,
  });

  // Generate default playground OG image
  const page = await context.newPage();
  await page.setContent(renderOgHtml(null, true));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, "playground.png") });
  console.log("  playground.png");

  // Generate per-example OG images
  const examplesPath = path.join(dataDir, "examples.json");
  if (fs.existsSync(examplesPath)) {
    const examples: { name: string }[] = JSON.parse(
      fs.readFileSync(examplesPath, "utf-8"),
    );
    for (const ex of examples) {
      const info = getExampleInfo(ex.name);
      if (!info) continue;
      await page.setContent(renderOgHtml(info, false));
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(outDir, `${ex.name}.png`) });
      console.log(`  ${ex.name}.png`);
    }
  }

  await browser.close();
  console.log(`OG images generated → ${path.relative(process.cwd(), outDir)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

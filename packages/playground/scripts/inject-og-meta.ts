/**
 * Post-build: inject per-example OG meta tags.
 *
 * For each example, creates dist/<example>/index.html with the correct
 * OG image and title so crawlers/link previews show the right card.
 *
 * Also patches the root dist/index.html with the absolute OG image URL.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const dataDir = path.resolve(__dirname, "../public/data");

const isGitHubPages = !!process.env.GITHUB_PAGES;
const siteBase = isGitHubPages
  ? "https://rbbydotdev.github.io/spac/playground"
  : "http://localhost:4173";

const rootHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

// Patch root index.html with absolute OG URL
const patchedRoot = rootHtml.replace(
  /content="\/og\/playground\.png"/g,
  `content="${siteBase}/og/playground.png"`,
);
fs.writeFileSync(path.join(distDir, "index.html"), patchedRoot);
console.log("  patched dist/index.html");

// Generate per-example index.html files
const examplesPath = path.join(dataDir, "examples.json");
if (fs.existsSync(examplesPath)) {
  const examples: { name: string }[] = JSON.parse(
    fs.readFileSync(examplesPath, "utf-8"),
  );

  for (const ex of examples) {
    const ogImage = `${siteBase}/og/${ex.name}.png`;
    const title = `${ex.name} — spac playground`;
    const desc = `Explore the ${ex.name} example in the spac playground`;

    const html = rootHtml
      .replace(
        /<title>.*?<\/title>/,
        `<title>${title}</title>`,
      )
      .replace(
        /content="spac playground"/g,
        `content="${title}"`,
      )
      .replace(
        /content="\/og\/playground\.png"/g,
        `content="${ogImage}"`,
      )
      .replace(
        /content="Interactive TypeScript.*?"/g,
        `content="${desc}"`,
      );

    const exDir = path.join(distDir, ex.name);
    fs.mkdirSync(exDir, { recursive: true });
    fs.writeFileSync(path.join(exDir, "index.html"), html);
    console.log(`  dist/${ex.name}/index.html`);
  }
}

console.log("OG meta injected");

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prepareSourceMap, serializeSourceTable } from "@spec-spac/spac";
import type { Api } from "@spec-spac/spac";
import type { ExampleIndexEntry } from "../src/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, "../public/data");

interface ExampleConfig {
  name: string;
  modulePath: string;
  sourceRoot: string;
}

const configs: ExampleConfig[] = [
  {
    name: "petstore",
    modulePath: "./petstore/index",
    sourceRoot: path.join(__dirname, "petstore"),
  },
  {
    name: "plantstore",
    modulePath: "./plantstore/index",
    sourceRoot: path.join(__dirname, "plantstore"),
  },
  {
    name: "cloudflare",
    modulePath: "./cloudflare/index",
    sourceRoot: path.join(__dirname, "cloudflare"),
  },
  {
    name: "serpapi",
    modulePath: "./serpapi/index",
    sourceRoot: path.join(__dirname, "serpapi"),
  },
];

interface Example {
  name: string;
  api: Api;
  sourceRoot: string;
}

// Dynamic imports so missing examples (e.g. cloudflare without sync) are skipped
const examples: Example[] = [];
for (const cfg of configs) {
  try {
    const mod = await import(cfg.modulePath);
    examples.push({ name: cfg.name, api: mod.api, sourceRoot: cfg.sourceRoot });
  } catch {
    console.log(`[${cfg.name}] not found, skipping (run codegen first)`);
  }
}

const manifestSizes: Record<string, number> = {};

for (const example of examples) {
  generateExample(example);
  const manifestPath = path.join(dataDir, example.name, "manifest.json");
  manifestSizes[example.name] = fs.statSync(manifestPath).size;
}

// Write examples index (includes manifest byte sizes for streaming progress)
const index: ExampleIndexEntry[] = examples.map((e) => ({
  name: e.name,
  manifestSize: manifestSizes[e.name],
}));
fs.writeFileSync(path.join(dataDir, "examples.json"), JSON.stringify(index));
console.log(
  `\nExamples index: ${index.map((e) => `${e.name} (${e.manifestSize}B)`).join(", ")}`,
);

function generateExample({ name, api, sourceRoot }: Example) {
  const outDir = path.join(dataDir, name);
  const sourcesDir = path.join(outDir, "sources");
  fs.mkdirSync(sourcesDir, { recursive: true });

  const result = api.emit({ yaml: true, sourceMap: true, sourceTable: true });

  const rawSourceMap = prepareSourceMap(result.sourceMap!, {
    relativizePaths: false,
  });
  const rawSourceTable = serializeSourceTable(result.sourceTable!, {
    relativizePaths: false,
  });

  const allSourcePaths = rawSourceMap.sources as string[];
  const commonPrefix = findCommonPrefix(allSourcePaths);

  const files = allSourcePaths.map((s) => stripPrefix(s, commonPrefix));
  rawSourceMap.sources = files;
  for (const entry of rawSourceTable) {
    entry.source.file = stripPrefix(entry.source.file, commonPrefix);
  }

  // Discover additional source files (e.g. schemas.ts) not tracked by the source map
  const extraFiles = discoverTsFiles(sourceRoot, commonPrefix).filter(
    (f) => !files.includes(f),
  );
  files.push(...extraFiles);

  const manifest = {
    files,
    yaml: result.yaml!,
    sourceMap: rawSourceMap,
    sourceTable: rawSourceTable,
  };

  fs.writeFileSync(
    path.join(outDir, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );

  for (const file of files) {
    const filePath = path.join(sourcesDir, file);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    const absolutePath = path.join(commonPrefix, file);
    if (fs.existsSync(absolutePath)) {
      fs.copyFileSync(absolutePath, filePath);
    }
  }

  console.log(`[${name}]`);
  console.log(`  Files: ${files.join(", ")}`);
  console.log(`  YAML lines: ${result.yaml!.split("\n").length}`);
  console.log(`  Source table entries: ${rawSourceTable.length}`);
}

function discoverTsFiles(dir: string, commonPrefix: string): string[] {
  const results: string[] = [];
  function walk(current: string) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith(".ts") && !entry.name.endsWith(".d.ts")) {
        results.push(stripPrefix(full, commonPrefix));
      }
    }
  }
  walk(dir);
  return results.sort();
}

function findCommonPrefix(paths: string[]): string {
  if (paths.length === 0) return "";
  if (paths.length === 1) {
    const parts = paths[0].split("/");
    return parts.slice(0, -1).join("/") + "/";
  }
  const parts = paths.map((p) => p.split("/"));
  const minLen = Math.min(...parts.map((p) => p.length));
  let i = 0;
  while (i < minLen - 1 && parts.every((p) => p[i] === parts[0][i])) i++;
  return parts[0].slice(0, i).join("/") + "/";
}

function stripPrefix(s: string, prefix: string): string {
  return s.startsWith(prefix) ? s.slice(prefix.length) : s;
}

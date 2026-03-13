import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "spac";

const outDir = dirname(fileURLToPath(import.meta.url));
const srcPath = join(outDir, "index.ts");

// 1. Read and transform the source with compile-time source locations
const rawSource = readFileSync(srcPath, "utf-8");
const transformed = transform(rawSource, srcPath);
const tmpPath = join(outDir, ".index.transformed.ts");
writeFileSync(tmpPath, transformed);

// 2. Dynamically import the transformed module and emit with debug
const { api } = await import("./.index.transformed.ts");
const debug = api.emit({ debug: true });

// 3. Clean up: remove entries pointing to the temp file (file 1).
//    These are captureCallSite() fallbacks with wrong line numbers.
//    The transform-injected entries (file 0 = original) are the precise ones.
const originalFileId = debug.files.indexOf(srcPath);
const cleanEntries: Record<string, string> = {};
for (const [hash, val] of Object.entries(debug.sourceMap)) {
  const fileId = Number(val.slice(0, val.indexOf(":")));
  if (fileId === originalFileId) {
    cleanEntries[hash] = val;
  }
}

// 4. Write outputs (only original file in files array)
writeFileSync(join(outDir, "spec.json"), JSON.stringify(debug.spec, null, 2));
writeFileSync(
  join(outDir, "sourcemap.json"),
  JSON.stringify({ files: [srcPath], entries: cleanEntries }, null, 2),
);

// Rebuild V3 map excluding transformed file sources
const cleanV3 = { ...debug.v3, sources: [srcPath] };
writeFileSync(join(outDir, "spec.json.map"), JSON.stringify(cleanV3, null, 2));

// 5. Clean up temp file
unlinkSync(tmpPath);

console.log(`Wrote spec.json, sourcemap.json, and spec.json.map to ${outDir}`);

import { readFileSync, writeFileSync } from "node:fs";
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

// 3. Write outputs
writeFileSync(join(outDir, "spec.json"), JSON.stringify(debug.spec, null, 2));
writeFileSync(join(outDir, "sourcemap.json"), JSON.stringify({ files: debug.files, entries: debug.sourceMap }, null, 2));
writeFileSync(join(outDir, "spec.json.map"), JSON.stringify(debug.v3, null, 2));

// 4. Clean up temp file
import { unlinkSync } from "node:fs";
unlinkSync(tmpPath);

console.log(`Wrote spec.json, sourcemap.json, and spec.json.map to ${outDir}`);

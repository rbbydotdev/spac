import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { api } from "./index";

const outDir = dirname(fileURLToPath(import.meta.url));

const debug = api.emit({ debug: true });

writeFileSync(join(outDir, "spec.json"), JSON.stringify(debug.spec, null, 2));
writeFileSync(join(outDir, "sourcemap.json"), JSON.stringify({ files: debug.files, entries: debug.sourceMap }, null, 2));
writeFileSync(join(outDir, "spec.json.map"), JSON.stringify(debug.v3, null, 2));

console.log(`Wrote spec.json, sourcemap.json, and spec.json.map to ${outDir}`);

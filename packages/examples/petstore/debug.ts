import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { lookup } from "spac";
import { api } from "./index";

const outDir = dirname(fileURLToPath(import.meta.url));

const { spec, sourceMap } = api.emit({ debug: true });

writeFileSync(join(outDir, "spec.json"), JSON.stringify(spec, null, 2));
writeFileSync(join(outDir, "sourcemap.json"), JSON.stringify(sourceMap, null, 2));

// Demo: look up a few paths
const demos = [
  ["paths", "/pets", "get"],
  ["paths", "/pets", "get", "summary"],
  ["paths", "/pets/:petId", "delete", "responses", "204"],
  ["components", "securitySchemes", "bearerAuth"],
  ["info"],
  ["tags", 0],
] as const;

console.log("Source map demo:\n");
for (const segments of demos) {
  const result = lookup(sourceMap, ...segments);
  const path = segments.map((s) => `[${JSON.stringify(s)}]`).join("");
  if (result) {
    console.log(`  ${path}`);
    console.log(`    → ${result.src}`);
    console.log(`    (matched: ${result.path})\n`);
  } else {
    console.log(`  ${path}`);
    console.log(`    → (no source)\n`);
  }
}

console.log(`Wrote spec.json and sourcemap.json to ${outDir}`);

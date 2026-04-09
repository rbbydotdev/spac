import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Validates that generated fixtures match the shape the app expects.
 * Runs after `generate` and before `build` to catch contract mismatches early.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, "../public/data");

const warnings: string[] = [];
const errors: string[] = [];

function warn(msg: string) {
  warnings.push(msg);
}
function fail(msg: string) {
  errors.push(msg);
}

// 1. examples.json must exist and be an array of {name: string, manifestSize: number}
const examplesPath = path.join(dataDir, "examples.json");
if (!fs.existsSync(examplesPath)) {
  fail("public/data/examples.json is missing — did generate run?");
} else {
  const raw = JSON.parse(fs.readFileSync(examplesPath, "utf-8"));
  if (!Array.isArray(raw)) {
    fail(`examples.json: expected array, got ${typeof raw}`);
  } else {
    for (const entry of raw) {
      if (typeof entry !== "object" || entry === null) {
        fail(`examples.json: entry is not an object: ${JSON.stringify(entry)}`);
        continue;
      }
      if (typeof entry.name !== "string") {
        fail(
          `examples.json: entry.name must be string, got ${typeof entry.name}: ${JSON.stringify(entry)}`,
        );
      }
      if (typeof entry.manifestSize !== "number") {
        warn(
          `examples.json: entry.manifestSize should be number for "${entry.name}"`,
        );
      }

      // 2. Each example must have a manifest.json with expected keys
      const manifestPath = path.join(dataDir, entry.name, "manifest.json");
      if (!fs.existsSync(manifestPath)) {
        fail(`${entry.name}/manifest.json is missing`);
      } else {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
        for (const key of ["files", "yaml", "sourceMap", "sourceTable"]) {
          if (!(key in manifest)) {
            fail(`${entry.name}/manifest.json: missing required key "${key}"`);
          }
        }
      }
    }
  }
}

// 3. declarations.json must exist
const declPath = path.resolve(__dirname, "../public/declarations.json");
if (!fs.existsSync(declPath)) {
  fail("public/declarations.json is missing — did bundle-declarations run?");
}

// Report
if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  WARN: ${w}`);
}
if (errors.length) {
  console.log(`\n✗ ${errors.length} error(s):`);
  for (const e of errors) console.log(`  ERR:  ${e}`);
  process.exit(1);
} else {
  console.log(`✓ Fixtures validated (${warnings.length} warnings)`);
}

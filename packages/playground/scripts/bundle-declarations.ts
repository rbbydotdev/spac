/**
 * Bundles .d.ts files needed by the TypeScript language service worker.
 *
 * Reads from:
 *   - TypeScript lib files (lib.es5.d.ts through lib.es2023.*.d.ts)
 *   - spac package declarations (packages/spac/dist/*.d.ts)
 *   - @sinclair/typebox type declarations
 *
 * Outputs: public/declarations.json
 *   A flat map of virtual file path → file content.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../../..");
const outPath = path.resolve(__dirname, "../public/declarations.json");

// Resolve TypeScript lib directory
function findTsLibDir(): string {
  // Try resolving from the project
  try {
    const tsPath = require.resolve("typescript", { paths: [root] });
    return path.join(path.dirname(tsPath), "lib");
  } catch {
    // Fallback: search in pnpm store
    const candidates = fs.readdirSync(path.join(root, "node_modules/.pnpm"), {
      withFileTypes: true,
    });
    for (const d of candidates) {
      if (d.isDirectory() && d.name.startsWith("typescript@")) {
        const lib = path.join(
          root,
          "node_modules/.pnpm",
          d.name,
          "node_modules/typescript/lib",
        );
        if (fs.existsSync(path.join(lib, "lib.es5.d.ts"))) return lib;
      }
    }
  }
  throw new Error("Could not find TypeScript lib directory");
}

// Resolve a package directory from pnpm-linked node_modules
function findPackageDir(packageName: string, startDir: string): string {
  let dir = startDir;
  while (dir !== path.dirname(dir)) {
    const candidate = path.join(dir, "node_modules", packageName);
    if (fs.existsSync(candidate)) {
      // Follow symlink if needed
      const resolved = fs.realpathSync(candidate);
      return resolved;
    }
    dir = path.dirname(dir);
  }
  throw new Error(`Could not find package: ${packageName}`);
}

const files: Record<string, string> = {};

// ── TypeScript lib files ──
// Include es5 through es2023 (all sub-libs, no "full" bundles)
const tsLibDir = findTsLibDir();
const libFilePattern = /^lib\.(es5|es20(1[5-9]|2[0-3])(\.\w+)?)\.d\.ts$/;
for (const name of fs.readdirSync(tsLibDir)) {
  if (libFilePattern.test(name) && !name.includes(".full.")) {
    files[`/lib/${name}`] = fs.readFileSync(path.join(tsLibDir, name), "utf-8");
  }
}

// ── spac declarations ──
const spacDistDir = path.resolve(root, "packages/spac/dist");
const spacDtsFiles = fs
  .readdirSync(spacDistDir)
  .filter(
    (f) => f.endsWith(".d.ts") && !f.includes(".test.") && !f.startsWith("__"),
  );
for (const name of spacDtsFiles) {
  files[`/node_modules/@spec-spac/spac/${name}`] = fs.readFileSync(
    path.join(spacDistDir, name),
    "utf-8",
  );
}
// Add a package.json so TS can resolve the module
files["/node_modules/@spec-spac/spac/package.json"] = JSON.stringify({
  name: "@spec-spac/spac",
  types: "./index.d.ts",
});

// ── @sinclair/typebox declarations ──
const typeboxDir = findPackageDir(
  "@sinclair/typebox",
  path.resolve(root, "packages/playground"),
);
const typeboxCjsDir = path.join(typeboxDir, "build/cjs");

function collectDts(dir: string, virtualBase: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const virtual = `${virtualBase}/${entry.name}`;
    if (entry.isDirectory()) {
      collectDts(full, virtual);
    } else if (entry.name.endsWith(".d.ts")) {
      files[virtual] = fs.readFileSync(full, "utf-8");
    }
  }
}

// Only include /type (the schema builder types) — skip /value, /compiler, etc.
collectDts(
  path.join(typeboxCjsDir, "type"),
  "/node_modules/@sinclair/typebox/build/cjs/type",
);
// Include root index.d.ts
const typeboxIndex = path.join(typeboxCjsDir, "index.d.ts");
if (fs.existsSync(typeboxIndex)) {
  files["/node_modules/@sinclair/typebox/build/cjs/index.d.ts"] =
    fs.readFileSync(typeboxIndex, "utf-8");
}
// Add package.json for module resolution
files["/node_modules/@sinclair/typebox/package.json"] = JSON.stringify({
  name: "@sinclair/typebox",
  types: "./build/cjs/index.d.ts",
});

// Write output
fs.writeFileSync(outPath, JSON.stringify(files));
const count = Object.keys(files).length;
const sizeKB = Math.round(Buffer.byteLength(JSON.stringify(files)) / 1024);
console.log(
  `Bundled ${count} declaration files (${sizeKB} KB) → ${path.relative(root, outPath)}`,
);

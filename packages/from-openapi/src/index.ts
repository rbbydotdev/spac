import type { GenerateOptions, GeneratedFiles, PluginContext } from "./types";
import { parseOperations, collectSchemaRefs, expandSchemaRefs } from "./parse";
import { groupByPath } from "./organize";
import { findDuplicateSchemas } from "./dedup";
import {
  buildRefMap,
  splitSchemas,
  genSharedSchemas,
  genGroupSchemas,
  genEndpointIndex,
  genRootIndex,
} from "./codegen";
import { formatTS } from "./format";
import {
  runOnGenerate,
  runFormatFile,
  runOnFile,
  runOnComplete,
} from "./plugin-runner";

export type { GenerateOptions, GeneratedFiles } from "./types";
export type { OperationGroup, SchemaSplit } from "./types";
export type { SpacPlugin, PluginContext } from "./types";

/**
 * Generate SPAC TypeScript code from an OpenAPI 3.x spec.
 *
 * Output structure:
 *   index.ts              — Api setup, imports all groups, emits
 *   shared/schemas.ts     — Schemas used by 2+ endpoint groups
 *   <group>/index.ts      — Routes for that group
 *   <group>/schemas.ts    — Schemas only used by that group (if any)
 *
 * Groups are determined by first path segment (after applying stripPrefixes).
 */
export async function generate(
  options: GenerateOptions,
): Promise<GeneratedFiles> {
  const { spec, stripPrefixes = [] } = options;
  const files: GeneratedFiles = new Map();

  // 1. Parse all operations
  const operations = parseOperations(spec);

  // 2. Deduplicate schemas
  const dupes = findDuplicateSchemas(spec);

  // 3. Collect all referenced schemas (directly + transitively)
  const directRefs = new Set<string>();
  for (const op of operations) {
    collectSchemaRefs(op.requestBody, directRefs);
    for (const schema of op.responses.values())
      collectSchemaRefs(schema, directRefs);
    for (const p of [...op.pathParams, ...op.queryParams, ...op.headerParams]) {
      collectSchemaRefs(p.schema, directRefs);
    }
  }
  const allRefs = expandSchemaRefs(directRefs, spec);

  // 4. Filter to canonical (non-duplicate) schema keys
  const schemaKeys = Array.from(allRefs)
    .map((ref) => ref.replace("#/components/schemas/", ""))
    .filter((key) => !dupes.has(key));

  // 5. Build ref map (includes mappings for duplicate refs → canonical var names)
  const refMap = buildRefMap(schemaKeys, dupes);

  // 6. Group operations by path
  const groups = groupByPath(operations, stripPrefixes);

  // 7. Split schemas: shared vs per-group (pass dupes so aliases count correctly)
  const split = splitSchemas(groups, schemaKeys, spec, dupes);

  // Collect var names for each scope
  const sharedVarNames = new Set<string>();
  for (const key of split.shared) {
    const v = refMap.get(`#/components/schemas/${key}`);
    if (v) sharedVarNames.add(v);
  }

  // 8. Generate shared/schemas.ts (only if there are shared schemas)
  if (split.shared.length > 0) {
    files.set(
      "shared/schemas.ts",
      genSharedSchemas(split.shared, spec, refMap, dupes),
    );
  }

  // 9. Generate each group
  for (const group of groups) {
    const localKeys = split.perGroup.get(group.slug) || [];

    const localVarNames = new Set<string>();
    for (const key of localKeys) {
      const v = refMap.get(`#/components/schemas/${key}`);
      if (v) localVarNames.add(v);
    }

    // Group schemas file (only if this group has local schemas)
    if (localKeys.length > 0) {
      files.set(
        `${group.slug}/schemas.ts`,
        genGroupSchemas(localKeys, spec, refMap, sharedVarNames, dupes),
      );
    }

    // Group endpoint index
    files.set(
      `${group.slug}/index.ts`,
      genEndpointIndex(group, refMap, spec, sharedVarNames, localVarNames, {
        sourceSpecVersion: spec.openapi,
      }),
    );
  }

  // 10. Root index
  files.set(
    "index.ts",
    genRootIndex(spec, groups, {
      specVersion: options.specVersion,
      debug: options.debug,
    }),
  );

  // 11. Run plugin pipeline
  const plugins = options.plugins ?? [];
  const ctx: PluginContext = {
    options,
    log: console.log,
    warn: console.warn,
  };

  // 11a. onGenerate hooks (pre-format)
  let processedFiles = await runOnGenerate(plugins, files, ctx);

  // 11b. Format each file (plugin formatter or built-in Biome fallback)
  const hasPluginFormatter = plugins.some((p) => p.formatFile);
  const fallbackFormat = hasPluginFormatter ? null : await formatTS();

  for (const [path, content] of processedFiles) {
    const formatted = await runFormatFile(plugins, path, content, ctx);
    processedFiles.set(path, formatted ?? fallbackFormat!(content));
  }

  // 11c. onFile hooks (post-format)
  for (const [path, content] of processedFiles) {
    processedFiles.set(path, await runOnFile(plugins, path, content, ctx));
  }

  // 11d. onComplete hooks
  await runOnComplete(plugins, processedFiles, ctx);

  return processedFiles;
}

// Re-exports
export { schemaToTypebox, createContext } from "./schema-to-typebox";
export { parseOperations, resolveRef } from "./parse";
export { groupByPath, findCommonPrefix } from "./organize";
export { buildRefMap, splitSchemas } from "./codegen";
export { findDuplicateSchemas } from "./dedup";

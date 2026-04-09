// ---------------------------------------------------------------------------
// Source Mapping — debug-mode call-site capture for OpenAPI ↔ source linking
// ---------------------------------------------------------------------------

/**
 * A location in the user's source file.
 * Captured at runtime via `Error.captureStackTrace` when debug mode is on.
 */
export interface SourceLocation {
  file: string;
  line: number;
  column: number;
}

/**
 * A single source mapping entry recorded by a builder method.
 *
 * Each DSL call (`.get()`, `.summary()`, `.tag()`, etc.) knows what it contributes
 * to the final OpenAPI output. It records that knowledge here so that `emitOpenApi`
 * can later build a full JSON-path → source-location mapping without needing
 * to analyze the code from the outside.
 *
 * @example
 * ```ts
 * // .summary("List all pets") records:
 * { source: { file: 'petstore.ts', line: 12, column: 5 }, kind: 'summary' }
 *
 * // .get("/").query(...) records multiple entries:
 * { source: { file: 'petstore.ts', line: 10, column: 3 }, kind: 'route' }
 * { source: { file: 'petstore.ts', line: 10, column: 3 }, kind: 'query' }
 * { source: { file: 'petstore.ts', line: 10, column: 3 }, kind: 'response' }
 * ```
 */
export interface SourceEntry {
  /** Where in the user's source this call was made */
  source: SourceLocation;
  /** What kind of OpenAPI output this call contributes to */
  kind: SourceEntryKind;
  /** Additional detail — tag name, error status code, schema name, extension key, etc. */
  detail?: string;
}

export type SourceEntryKind =
  // Route-level
  | "route"
  | "query"
  | "params"
  | "headers"
  | "cookies"
  | "body"
  | "response"
  | "responses"
  | "summary"
  | "description"
  | "operationId"
  | "tag"
  | "security"
  | "error"
  | "link"
  | "server"
  | "extension"
  | "deprecated"
  | "externalDocs"
  | "callback"
  | "example"
  | "bodyDescription"
  | "bodyRequired"
  // Group-level
  | "group"
  | "pathSummary"
  | "pathDescription"
  // Api-level
  | "api"
  | "schema"
  | "securityScheme"
  | "webhook"
  | "component";

// ---------------------------------------------------------------------------
// Capture
// ---------------------------------------------------------------------------

/**
 * Capture the call site of the function that called the caller.
 * Uses `Error.captureStackTrace` (V8) to skip internal frames.
 *
 * @param caller - The function whose caller's location we want.
 *                 Passed to `Error.captureStackTrace` to trim the stack.
 * @returns The parsed source location, or `undefined` if unparseable.
 */
export function captureSource(caller: Function): SourceLocation | undefined {
  const err = {} as { stack: string };
  Error.captureStackTrace(err, caller);
  return parseStack(err.stack);
}

function parseStack(stack: string): SourceLocation | undefined {
  const lines = stack.split("\n");
  for (const line of lines.slice(1)) {
    // V8 format: "    at FunctionName (file:line:column)"
    // or         "    at file:line:column"
    const match =
      line.match(/at .+ \((.+):(\d+):(\d+)\)/) ||
      line.match(/at (.+):(\d+):(\d+)/);
    if (match) {
      return {
        file: match[1],
        line: parseInt(match[2], 10),
        column: parseInt(match[3], 10),
      };
    }
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Source Table
// ---------------------------------------------------------------------------

/** Maps JSON-path keys (e.g. `paths./pets.get.summary`) to SourceEntry. */
export type SourceTable = Map<string, SourceEntry>;

/** Find a source entry by kind and optional detail. */
export function findSource(
  sources: SourceEntry[] | undefined,
  kind: SourceEntryKind,
  detail?: string,
): SourceEntry | undefined {
  if (!sources) return undefined;
  return sources.find(
    (s) => s.kind === kind && (detail === undefined || s.detail === detail),
  );
}

// ---------------------------------------------------------------------------
// YAML Position Extraction
// ---------------------------------------------------------------------------

import { parseDocument, isMap, isSeq, isScalar } from "yaml";

export interface YamlPosition {
  line: number; // 0-based
  column: number; // 0-based
}

/** Build an array of character offsets for each line start. */
function buildLineOffsets(str: string): number[] {
  const offsets = [0];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\n") offsets.push(i + 1);
  }
  return offsets;
}

/** Convert a character offset to a 0-based line and column. */
function offsetToLineCol(
  offsets: number[],
  offset: number,
): { line: number; col: number } {
  let lo = 0;
  let hi = offsets.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (offsets[mid] <= offset) lo = mid;
    else hi = mid - 1;
  }
  return { line: lo, col: offset - offsets[lo] };
}

/**
 * Parse a YAML string and extract the output position (line/column)
 * for each JSON-path key in the document tree.
 */
export function extractYamlPositions(
  yamlString: string,
): Map<string, YamlPosition> {
  const doc = parseDocument(yamlString);
  const positions = new Map<string, YamlPosition>();
  const lineOffsets = buildLineOffsets(yamlString);

  function walk(node: unknown, path: string) {
    if (isMap(node)) {
      for (const pair of node.items) {
        if (isScalar(pair.key)) {
          const key = String(pair.key.value);
          const childPath = path ? `${path}.${key}` : key;
          const range = pair.key.range;
          if (range) {
            const { line, col } = offsetToLineCol(lineOffsets, range[0]);
            positions.set(childPath, { line, column: col });
          }
          walk(pair.value, childPath);
        }
      }
    } else if (isSeq(node)) {
      for (let i = 0; i < node.items.length; i++) {
        walk(node.items[i], `${path}.${i}`);
      }
    }
  }

  walk(doc.contents, "");
  return positions;
}

// ---------------------------------------------------------------------------
// Source Map V3 Generation
// ---------------------------------------------------------------------------

import { GenMapping, addMapping, toEncodedMap } from "@jridgewell/gen-mapping";

/**
 * Generate a Source Map V3 JSON string from a source table and YAML positions.
 *
 * @param sourceTable - JSON-path → SourceEntry mapping (built during emit)
 * @param yamlPositions - JSON-path → YAML line/column (built from the YAML string)
 * @param generatedFile - The file name for the generated YAML output
 * @returns Source Map V3 as a JSON string
 */
export function generateSourceMap(
  sourceTable: SourceTable,
  yamlPositions: Map<string, YamlPosition>,
  generatedFile: string,
): string {
  const map = new GenMapping({ file: generatedFile });

  for (const [jsonPath, sourceEntry] of sourceTable) {
    const yamlPos = yamlPositions.get(jsonPath);
    if (!yamlPos) continue;

    addMapping(map, {
      generated: { line: yamlPos.line + 1, column: yamlPos.column },
      source: sourceEntry.source.file,
      original: {
        line: sourceEntry.source.line,
        column: sourceEntry.source.column - 1,
      },
    });
  }

  return JSON.stringify(toEncodedMap(map));
}

// ---------------------------------------------------------------------------
// Source Map Preparation (for viewers / consumers)
// ---------------------------------------------------------------------------

/** Extract the basename from a file path or file:// URL. */
function sourceBasename(s: string): string {
  return s.split("/").pop() ?? s;
}

export interface PrepareSourceMapOptions {
  /** Relativize source file paths to basenames. Default: true. */
  relativizePaths?: boolean;
  /** Source file contents to embed, in order matching the sources array. */
  sourcesContent?: string[];
}

/**
 * Prepare a raw Source Map V3 JSON string for viewer consumption.
 * Relativizes absolute file paths and optionally embeds source content.
 */
export function prepareSourceMap(
  sourceMapJson: string,
  options?: PrepareSourceMapOptions,
): Record<string, unknown> {
  const map = JSON.parse(sourceMapJson);

  if (options?.relativizePaths !== false) {
    map.sources = map.sources.map((s: string) => sourceBasename(s));
  }

  if (options?.sourcesContent) {
    map.sourcesContent = options.sourcesContent;
  }

  return map;
}

// ---------------------------------------------------------------------------
// Source Table Serialization
// ---------------------------------------------------------------------------

export interface SerializedSourceEntry {
  path: string;
  kind: SourceEntryKind;
  detail?: string;
  source: {
    file: string;
    line: number;
    column: number;
  };
}

/**
 * Serialize a SourceTable Map into a plain JSON-serializable array.
 * Relativizes file paths to basenames by default.
 */
export function serializeSourceTable(
  sourceTable: SourceTable,
  options?: { relativizePaths?: boolean },
): SerializedSourceEntry[] {
  const relativize = options?.relativizePaths !== false;

  return Array.from(sourceTable.entries()).map(([key, entry]) => ({
    path: key,
    kind: entry.kind,
    detail: entry.detail,
    source: {
      file: relativize ? sourceBasename(entry.source.file) : entry.source.file,
      line: entry.source.line,
      column: entry.source.column,
    },
  }));
}

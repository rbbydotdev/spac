import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export interface CommandArg {
  name: string;
  type: "positional" | "string" | "boolean";
  description: string;
  default?: string;
  required?: boolean;
}

export interface CommandMeta {
  name: string;
  description: string;
  args: CommandArg[];
}

/**
 * Parse a citty `defineCommand({ meta, args })` call from TypeScript source.
 */
export function parseDefineCommand(source: string): CommandMeta | null {
  const metaName = extractStringProp(source, "name", "meta");
  const metaDesc = extractStringProp(source, "description", "meta");
  if (!metaName) return null;

  const args = parseArgs(source);
  return { name: metaName, description: metaDesc ?? "", args };
}

/** Extract a string property value from within a named block. */
function extractStringProp(
  source: string,
  prop: string,
  block: string,
): string | null {
  // Find the block (e.g. "meta: {")
  const blockPattern = new RegExp(`${block}\\s*:\\s*\\{`);
  const blockMatch = blockPattern.exec(source);
  if (!blockMatch) return null;

  const blockBody = extractBalancedBlock(
    source,
    blockMatch.index + blockMatch[0].length - 1,
  );
  if (!blockBody) return null;

  // Find "prop: 'value'" or 'prop: "value"'
  const propPattern = new RegExp(`${prop}\\s*:\\s*(?:'([^']*)'|"([^"]*)")`);
  const match = propPattern.exec(blockBody);
  if (!match) return null;
  return match[1] ?? match[2] ?? null;
}

/** Extract balanced braces starting from the `{` at `source[startIdx]`. */
function extractBalancedBlock(source: string, startIdx: number): string | null {
  if (source[startIdx] !== "{") return null;
  let depth = 0;
  for (let i = startIdx; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") {
      depth--;
      if (depth === 0) return source.slice(startIdx, i + 1);
    }
  }
  return null;
}

/** Parse all arg definitions from the `args: { ... }` block. */
function parseArgs(source: string): CommandArg[] {
  const argsMatch = /args\s*:\s*\{/.exec(source);
  if (!argsMatch) return [];

  const argsBlock = extractBalancedBlock(
    source,
    argsMatch.index + argsMatch[0].length - 1,
  );
  if (!argsBlock) return [];

  const results: CommandArg[] = [];
  // Match each arg: "argName: {" or "'arg-name': {"
  const argPattern = /(?:'([^']+)'|"([^"]+)"|(\w+))\s*:\s*\{/g;
  let match: RegExpExecArray | null;

  while ((match = argPattern.exec(argsBlock)) !== null) {
    const argName = match[1] ?? match[2] ?? match[3];
    const blockStart = match.index + match[0].length - 1;
    const argBody = extractBalancedBlock(argsBlock, blockStart);
    if (!argBody) continue;

    const type = extractQuoted(argBody, "type") ?? "string";
    const description = extractQuoted(argBody, "description") ?? "";
    const defaultVal = extractDefault(argBody);
    const required = /required\s*:\s*true/.test(argBody);

    results.push({
      name: argName,
      type: type as CommandArg["type"],
      description,
      default: defaultVal ?? undefined,
      required: type === "positional" ? required : undefined,
    });
  }

  return results;
}

function extractQuoted(body: string, prop: string): string | null {
  const pattern = new RegExp(
    `${prop}\\s*:\\s*(?:'([^']*)'|"([^"]*)"|\`([^\`]*)\`)`,
  );
  const m = pattern.exec(body);
  if (!m) return null;
  return m[1] ?? m[2] ?? m[3] ?? null;
}

function extractDefault(body: string): string | null {
  // default: 'value', default: "value", default: true, default: false, default: 123
  const pattern =
    /default\s*:\s*(?:'([^']*)'|"([^"]*)"|(\d+(?:\.\d+)?|true|false))/;
  const m = pattern.exec(body);
  if (!m) return null;
  return m[1] ?? m[2] ?? m[3] ?? null;
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

function renderUsageLine(parentCommand: string, meta: CommandMeta): string {
  const positional = meta.args.filter((a) => a.type === "positional");
  const flags = meta.args.filter((a) => a.type !== "positional");

  const parts = [parentCommand, meta.name];
  for (const arg of positional) {
    parts.push(arg.required ? `<${arg.name}>` : `[${arg.name}]`);
  }
  if (flags.length > 0) parts.push("[options]");
  return parts.join(" ");
}

function renderFlagsTable(
  meta: CommandMeta,
): Array<{
  type: "tableRow";
  children: Array<{ type: "tableCell"; children: any[] }>;
}> {
  const rows: Array<{
    type: "tableRow";
    children: Array<{ type: "tableCell"; children: any[] }>;
  }> = [];

  // Header row
  rows.push({
    type: "tableRow",
    children: [
      { type: "tableCell", children: [{ type: "text", value: "Flag" }] },
      { type: "tableCell", children: [{ type: "text", value: "Type" }] },
      { type: "tableCell", children: [{ type: "text", value: "Default" }] },
      { type: "tableCell", children: [{ type: "text", value: "Description" }] },
    ],
  });

  for (const arg of meta.args) {
    rows.push({
      type: "tableRow",
      children: [
        {
          type: "tableCell",
          children: [
            {
              type: "inlineCode",
              value: arg.type === "positional" ? arg.name : `--${arg.name}`,
            },
          ],
        },
        {
          type: "tableCell",
          children: [
            {
              type: "text",
              value: arg.type === "positional" ? "positional" : arg.type,
            },
          ],
        },
        {
          type: "tableCell",
          children:
            arg.default != null
              ? [{ type: "inlineCode", value: arg.default }]
              : [{ type: "text", value: "—" }],
        },
        {
          type: "tableCell",
          children: [{ type: "text", value: arg.description }],
        },
      ],
    });
  }

  return rows;
}

// ---------------------------------------------------------------------------
// AST walk
// ---------------------------------------------------------------------------

function walk(
  node: any,
  type: string,
  fn: (node: any, index: number, parent: any) => void,
  index = 0,
  parent: any = null,
): void {
  if (node.type === type && parent != null) {
    fn(node, index, parent);
  }
  if (node.children) {
    for (let i = node.children.length - 1; i >= 0; i--) {
      walk(node.children[i], type, fn, i, node);
    }
  }
}

// ---------------------------------------------------------------------------
// Plugin
// ---------------------------------------------------------------------------

/**
 * Remark plugin that replaces `<CLIUsage path="..." />` elements in MDX
 * with a usage synopsis and flags table extracted from citty `defineCommand` calls.
 *
 * Props:
 *   - `path` (required): relative path to the command .ts file
 *   - `cwd`: if present, resolve `path` relative to VFile.cwd (website package root)
 *   - `command`: parent command prefix (default: `"spac"`)
 */
export function remarkCLIUsage() {
  return (tree: any, file: any) => {
    walk(tree, "mdxJsxFlowElement", (node, index, parent) => {
      if (node.name !== "CLIUsage") return;

      const attrs: Record<string, string> = {};
      for (const attr of node.attributes ?? []) {
        if (attr.type === "mdxJsxAttribute" && typeof attr.value === "string") {
          attrs[attr.name] = attr.value;
        }
      }

      const filePath = attrs.path;
      if (!filePath) return;

      const parentCommand = attrs.command ?? "spac";
      const basePath =
        "cwd" in attrs ? (file.cwd ?? process.cwd()) : process.cwd();
      const resolved = resolve(basePath, filePath);

      let source: string;
      try {
        source = readFileSync(resolved, "utf-8");
      } catch {
        console.warn(`[remark-cli-usage] Could not read file: ${resolved}`);
        return;
      }

      const meta = parseDefineCommand(source);
      if (!meta) {
        console.warn(
          `[remark-cli-usage] No defineCommand found in ${resolved}`,
        );
        return;
      }

      const usageLine = renderUsageLine(parentCommand, meta);
      const tableRows = renderFlagsTable(meta);

      const replacements: any[] = [];

      // Description paragraph
      if (meta.description) {
        replacements.push({
          type: "paragraph",
          children: [{ type: "text", value: meta.description }],
        });
      }

      // Usage code block
      replacements.push({
        type: "code",
        lang: "sh",
        value: usageLine,
      });

      // Flags table (only if there are args)
      if (meta.args.length > 0) {
        replacements.push({
          type: "table",
          align: ["left", "left", "left", "left"],
          children: tableRows,
        });
      }

      parent.children.splice(index, 1, ...replacements);
    });
  };
}

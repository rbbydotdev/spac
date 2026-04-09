import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";

/**
 * Extracts all `@example` code blocks from a JSDoc comment string.
 */
function extractExamples(jsdoc: string): { lang: string; code: string }[] {
  const results: { lang: string; code: string }[] = [];
  const lines = jsdoc.split("\n");

  let inExample = false;
  let inCodeFence = false;
  let lang = "ts";
  let codeLines: string[] = [];

  for (const raw of lines) {
    // Strip leading ` * ` or ` */` from JSDoc lines
    const line = raw.replace(/^\s*\*\s?/, "").replace(/\s*\*\/\s*$/, "");

    if (line.trim().startsWith("@example")) {
      inExample = true;
      continue;
    }

    // A new @tag ends the current @example block
    if (inExample && !inCodeFence && /^\s*@\w/.test(line)) {
      inExample = false;
      continue;
    }

    if (!inExample) continue;

    if (!inCodeFence && line.trim().startsWith("```")) {
      inCodeFence = true;
      lang = line.trim().slice(3).trim() || "ts";
      codeLines = [];
      continue;
    }

    if (inCodeFence && line.trim().startsWith("```")) {
      inCodeFence = false;
      results.push({ lang, code: codeLines.join("\n") });
      continue;
    }

    if (inCodeFence) {
      codeLines.push(line);
    }
  }

  return results;
}

/**
 * Find the JSDoc comment for a named export or a class method.
 *
 * `name` can be:
 *   - `"Api"` — matches the class/type/interface/function/const named Api
 *   - `"RouteBuilder.summary"` — matches the `summary` method inside `RouteBuilder`
 */
function findJSDoc(source: string, name: string): string | null {
  const dotIdx = name.indexOf(".");
  const isMethod = dotIdx !== -1;
  const className = isMethod ? name.slice(0, dotIdx) : null;
  const memberName = isMethod ? name.slice(dotIdx + 1) : null;

  if (isMethod && className && memberName) {
    const classPattern = new RegExp(
      `(?:export\\s+)?class\\s+${esc(className)}[^{]*\\{`,
    );
    const classMatch = classPattern.exec(source);
    if (!classMatch) return null;

    const classStart = classMatch.index + classMatch[0].length;
    const rest = source.slice(classStart);

    // Find the method declaration at the start of a line (with optional indentation/modifiers)
    // This avoids matching inside JSDoc comments or string literals
    const methodDeclPattern = new RegExp(
      `^[ \\t]*(?:(?:readonly|static|async|get|set|private|protected|public)\\s+)*${esc(memberName)}\\s*[(<]`,
      "m",
    );
    const methodDecl = methodDeclPattern.exec(rest);
    if (!methodDecl) return null;

    // Extract the text before the method declaration and find the last JSDoc in it
    const before = rest.slice(0, methodDecl.index);
    const jsdocBlocks = [...before.matchAll(/\/\*\*[\s\S]*?\*\//g)];
    if (jsdocBlocks.length === 0) return null;

    const lastBlock = jsdocBlocks[jsdocBlocks.length - 1];
    // Verify the JSDoc is immediately before the method (only whitespace between)
    const gap = before.slice(lastBlock.index! + lastBlock[0].length);
    if (gap.trim() !== "") return null;

    return lastBlock[0];
  }

  // Find the declaration, then look backwards for the closest JSDoc
  const declPattern = new RegExp(
    `(?:export\\s+)?(?:type|interface|function|const|class)\\s+${esc(name)}[\\s<(:{=]`,
  );
  const declMatch = declPattern.exec(source);
  if (!declMatch) return null;

  const before = source.slice(0, declMatch.index);
  const jsdocBlocks = [...before.matchAll(/\/\*\*[\s\S]*?\*\//g)];
  if (jsdocBlocks.length === 0) return null;

  const lastBlock = jsdocBlocks[jsdocBlocks.length - 1];
  const gap = before.slice(lastBlock.index! + lastBlock[0].length);
  if (gap.trim() !== "") return null;

  return lastBlock[0];
}

function esc(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Walk the AST backwards so splicing doesn't skip nodes. */
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

/**
 * Remark plugin that replaces `<JSDocExample path="..." name="..." />` elements
 * in MDX with fenced code blocks extracted from JSDoc `@example` tags.
 *
 * Props:
 *   - `path` (required): relative path to the TypeScript source file
 *   - `name` (required): export name or `ClassName.methodName`
 *   - `cwd`: if present, resolve `path` relative to the MDX file's directory
 *   - `index`: which @example block to use if there are multiple (default: all)
 */
export { extractExamples, findJSDoc };

export function remarkJSDocExample() {
  return (tree: any, file: any) => {
    walk(tree, "mdxJsxFlowElement", (node, index, parent) => {
      if (node.name !== "JSDocExample") return;

      const attrs: Record<string, string> = {};
      for (const attr of node.attributes ?? []) {
        if (attr.type === "mdxJsxAttribute" && typeof attr.value === "string") {
          attrs[attr.name] = attr.value;
        }
      }

      const filePath = attrs.path;
      const name = attrs.name;
      if (!filePath || !name) return;

      // Resolve path: if `cwd` attr is present, resolve from MDX file dir
      let basePath: string;
      if ("cwd" in attrs) {
        const mdxPath = file.path ?? file.history?.[0];
        basePath = mdxPath ? dirname(mdxPath) : process.cwd();
      } else {
        basePath = process.cwd();
      }

      const resolved = resolve(basePath, filePath);

      let source: string;
      try {
        source = readFileSync(resolved, "utf-8");
      } catch {
        console.warn(`[remark-jsdoc-example] Could not read file: ${resolved}`);
        return;
      }

      const jsdoc = findJSDoc(source, name);
      if (!jsdoc) {
        console.warn(
          `[remark-jsdoc-example] No JSDoc found for "${name}" in ${resolved}`,
        );
        return;
      }

      const examples = extractExamples(jsdoc);
      if (examples.length === 0) {
        console.warn(
          `[remark-jsdoc-example] No @example in JSDoc for "${name}" in ${resolved}`,
        );
        return;
      }

      const idx = attrs.index != null ? Number(attrs.index) : null;
      const selected = idx != null ? [examples[idx]].filter(Boolean) : examples;

      const replacements = selected.map((ex) => ({
        type: "code" as const,
        lang: ex.lang,
        value: ex.code,
      }));

      parent.children.splice(index, 1, ...replacements);
    });
  };
}

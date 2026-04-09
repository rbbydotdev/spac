import { createJiti } from "jiti";
import { fileURLToPath } from "node:url";
import {
  writeFileSync,
  unlinkSync,
  mkdtempSync,
  existsSync,
  rmdirSync,
} from "node:fs";
import { join, dirname } from "node:path";

/**
 * Remark plugin that transforms ```spac code blocks into tabbed examples
 * showing both the spac TypeScript source and the resulting OpenAPI YAML.
 *
 * The code is evaluated at build time via jiti, so the YAML is always in sync.
 *
 * The code MUST export the Api instance as `export default api`.
 */

function findRoot(): string {
  let dir = dirname(fileURLToPath(import.meta.url));
  while (dir !== dirname(dir)) {
    if (existsSync(join(dir, "pnpm-workspace.yaml"))) return dir;
    dir = dirname(dir);
  }
  return process.cwd();
}

const root = findRoot();
const jiti = createJiti(join(root, "packages", "website", "eval.ts"));

function evaluateSpacCode(code: string): string | null {
  const tmp = mkdtempSync(join(root, ".spac-eval-"));
  const entryFile = join(tmp, "entry.ts");

  // Strip `export default` — jiti will handle module.exports
  const cleanCode = code.replace(/export\s+default\s+/, "module.exports = ");
  writeFileSync(entryFile, cleanCode);

  try {
    const mod = jiti(entryFile) as any;
    const api = mod?.default ?? mod;
    if (!api?.emit) {
      console.warn("[remark-spac-example] No Api.emit() found in code");
      return null;
    }
    const result = api.emit({ yaml: true });
    return typeof result === "string" ? result : result.yaml;
  } catch (e: any) {
    console.warn(
      "[remark-spac-example] Failed to evaluate:",
      e.message?.slice(0, 300),
    );
    return null;
  } finally {
    try {
      unlinkSync(entryFile);
    } catch {}
    try {
      rmdirSync(tmp);
    } catch {}
  }
}

function walk(
  node: any,
  type: string,
  fn: (node: any, index: number, parent: any) => void,
  _index = 0,
  parent: any = null,
): void {
  if (node.type === type && parent != null) {
    fn(node, _index, parent);
  }
  if (node.children) {
    for (let i = node.children.length - 1; i >= 0; i--) {
      walk(node.children[i], type, fn, i, node);
    }
  }
}

export function remarkSpacExample() {
  return (tree: any) => {
    walk(tree, "code", (node, index, parent) => {
      if (node.lang !== "spac") return;

      const tsCode = node.value as string;
      const yaml = evaluateSpacCode(tsCode);

      if (!yaml) {
        node.lang = "ts";
        return;
      }

      const tabsNode = {
        type: "mdxJsxFlowElement",
        name: "Tabs",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "items",
            value: {
              type: "mdxJsxAttributeValueExpression",
              value: "['spac', 'OpenAPI YAML']",
              data: {
                estree: {
                  type: "Program",
                  body: [
                    {
                      type: "ExpressionStatement",
                      expression: {
                        type: "ArrayExpression",
                        elements: [
                          { type: "Literal", value: "spac" },
                          { type: "Literal", value: "OpenAPI YAML" },
                        ],
                      },
                    },
                  ],
                  sourceType: "module",
                },
              },
            },
          },
        ],
        children: [
          {
            type: "mdxJsxFlowElement",
            name: "Tab",
            attributes: [
              { type: "mdxJsxAttribute", name: "value", value: "spac" },
            ],
            children: [{ type: "code", lang: "ts", value: tsCode }],
          },
          {
            type: "mdxJsxFlowElement",
            name: "Tab",
            attributes: [
              { type: "mdxJsxAttribute", name: "value", value: "OpenAPI YAML" },
            ],
            children: [{ type: "code", lang: "yaml", value: yaml }],
          },
        ],
      };

      parent.children.splice(index, 1, tabsNode);
    });
  };
}

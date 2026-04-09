import { describe, it, expect } from "vitest";
import { parseDefineCommand } from "../remark-cli-usage";

const emitSource = `
import { defineCommand } from 'citty'
import { writeFileSync } from 'fs'

export default defineCommand({
  meta: {
    name: 'emit',
    description: 'Emit OpenAPI spec from spac TypeScript source',
  },
  args: {
    entry: {
      type: 'positional',
      description: 'Entry file (default: src/api.ts)',
      required: false,
    },
    format: {
      type: 'string',
      description: 'Output format: json or yaml',
      default: 'json',
    },
    out: {
      type: 'string',
      description: 'Output file path (stdout if omitted)',
    },
    'source-map': {
      type: 'boolean',
      description: 'Emit source map alongside output (requires --out)',
      default: false,
    },
    validate: {
      type: 'boolean',
      description: 'Validate the emitted spec against OAS rules',
      default: false,
    },
    pretty: {
      type: 'boolean',
      description: 'Pretty-print JSON output',
      default: true,
    },
    minify: {
      type: 'boolean',
      description: 'Minify JSON output',
      default: false,
    },
  },
  async run({ args }) {
    // ...
  },
})
`;

describe("parseDefineCommand", () => {
  it("extracts meta name and description", () => {
    const result = parseDefineCommand(emitSource);
    expect(result).not.toBeNull();
    expect(result!.name).toBe("emit");
    expect(result!.description).toBe(
      "Emit OpenAPI spec from spac TypeScript source",
    );
  });

  it("extracts all args", () => {
    const result = parseDefineCommand(emitSource)!;
    expect(result.args).toHaveLength(7);
    expect(result.args.map((a) => a.name)).toEqual([
      "entry",
      "format",
      "out",
      "source-map",
      "validate",
      "pretty",
      "minify",
    ]);
  });

  it("parses positional arg", () => {
    const result = parseDefineCommand(emitSource)!;
    const entry = result.args.find((a) => a.name === "entry")!;
    expect(entry.type).toBe("positional");
    expect(entry.description).toBe("Entry file (default: src/api.ts)");
    expect(entry.default).toBeUndefined();
  });

  it("parses string arg with default", () => {
    const result = parseDefineCommand(emitSource)!;
    const format = result.args.find((a) => a.name === "format")!;
    expect(format.type).toBe("string");
    expect(format.description).toBe("Output format: json or yaml");
    expect(format.default).toBe("json");
  });

  it("parses string arg without default", () => {
    const result = parseDefineCommand(emitSource)!;
    const out = result.args.find((a) => a.name === "out")!;
    expect(out.type).toBe("string");
    expect(out.description).toBe("Output file path (stdout if omitted)");
    expect(out.default).toBeUndefined();
  });

  it("parses boolean arg with default", () => {
    const result = parseDefineCommand(emitSource)!;
    const sourceMap = result.args.find((a) => a.name === "source-map")!;
    expect(sourceMap.type).toBe("boolean");
    expect(sourceMap.default).toBe("false");
  });

  it("parses hyphenated arg names", () => {
    const result = parseDefineCommand(emitSource)!;
    const sourceMap = result.args.find((a) => a.name === "source-map");
    expect(sourceMap).toBeDefined();
    const dryRun = parseDefineCommand(`
      export default defineCommand({
        meta: { name: 'import', description: 'Import' },
        args: {
          'dry-run': {
            type: 'boolean',
            description: 'Dry run mode',
            default: false,
          },
        },
        run() {},
      })
    `)!;
    expect(dryRun.args[0].name).toBe("dry-run");
  });

  it("returns null for source without defineCommand", () => {
    expect(parseDefineCommand("const x = 1")).toBeNull();
  });
});

describe("parseDefineCommand with import command", () => {
  const importSource = `
import { defineCommand } from 'citty'
import { generate } from '@spac/from-openapi'

export default defineCommand({
  meta: {
    name: 'import',
    description: 'Convert OpenAPI spec to spac TypeScript',
  },
  args: {
    spec: {
      type: 'positional',
      description: 'Path to OpenAPI JSON or YAML spec',
      required: true,
    },
    out: {
      type: 'string',
      description: 'Output directory (dry-run if omitted)',
      default: './src',
    },
    strip: {
      type: 'string',
      description: 'Path prefix to strip before grouping (repeatable)',
    },
    name: {
      type: 'string',
      description: 'Override API title',
    },
    'spec-version': {
      type: 'string',
      description: "Override OpenAPI spec version (e.g. '3.1')",
    },
    debug: {
      type: 'boolean',
      description: 'Emit debug: true in Api constructor',
      default: false,
    },
    'dry-run': {
      type: 'boolean',
      description: 'Print stats without writing files',
      default: false,
    },
  },
  async run({ args }) {},
})
  `;

  it("extracts import command meta", () => {
    const result = parseDefineCommand(importSource)!;
    expect(result.name).toBe("import");
    expect(result.description).toBe("Convert OpenAPI spec to spac TypeScript");
  });

  it("extracts all 7 args", () => {
    const result = parseDefineCommand(importSource)!;
    expect(result.args).toHaveLength(7);
  });

  it("marks required positional", () => {
    const result = parseDefineCommand(importSource)!;
    const spec = result.args.find((a) => a.name === "spec")!;
    expect(spec.type).toBe("positional");
    expect(spec.required).toBe(true);
  });
});

describe("parseDefineCommand with init command", () => {
  const initSource = `
export default defineCommand({
  meta: {
    name: 'init',
    description: 'Scaffold a new spac project',
  },
  args: {
    dir: {
      type: 'positional',
      description: 'Target directory (default: cwd)',
      required: false,
    },
    template: {
      type: 'string',
      description: 'Template: minimal or petstore',
      default: 'minimal',
    },
    name: {
      type: 'string',
      description: 'API name',
    },
    version: {
      type: 'string',
      description: 'API version',
      default: '0.0.1',
    },
  },
  run({ args }) {},
})
  `;

  it("parses init command", () => {
    const result = parseDefineCommand(initSource)!;
    expect(result.name).toBe("init");
    expect(result.args).toHaveLength(4);
    expect(result.args.find((a) => a.name === "template")!.default).toBe(
      "minimal",
    );
  });
});

describe("parseDefineCommand with minimal command", () => {
  it("handles command with no args", () => {
    const source = `
export default defineCommand({
  meta: { name: 'stats', description: 'Print spec statistics' },
  args: {
    target: {
      type: 'positional',
      description: 'Entry .ts file or spec .json/.yaml file',
      required: false,
    },
  },
  async run({ args }) {},
})
    `;
    const result = parseDefineCommand(source)!;
    expect(result.name).toBe("stats");
    expect(result.args).toHaveLength(1);
  });
});

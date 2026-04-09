import { describe, it, expect } from "vitest";
import { extractExamples, findJSDoc } from "../remark-jsdoc-example";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// ---------------------------------------------------------------------------
// extractExamples
// ---------------------------------------------------------------------------

describe("extractExamples", () => {
  it("extracts a single fenced code block", () => {
    const jsdoc = `/**
     * Does something.
     *
     * @example
     * \`\`\`ts
     * foo()
     * \`\`\`
     */`;
    expect(extractExamples(jsdoc)).toEqual([{ lang: "ts", code: "foo()" }]);
  });

  it("extracts multiple @example blocks", () => {
    const jsdoc = `/**
     * @example
     * \`\`\`ts
     * first()
     * \`\`\`
     *
     * @example
     * \`\`\`ts
     * second()
     * \`\`\`
     */`;
    expect(extractExamples(jsdoc)).toEqual([
      { lang: "ts", code: "first()" },
      { lang: "ts", code: "second()" },
    ]);
  });

  it("extracts multiline code", () => {
    const jsdoc = `/**
     * @example
     * \`\`\`ts
     * const x = 1
     * const y = 2
     * console.log(x + y)
     * \`\`\`
     */`;
    const result = extractExamples(jsdoc);
    expect(result).toHaveLength(1);
    expect(result[0].code).toBe("const x = 1\nconst y = 2\nconsole.log(x + y)");
  });

  it("respects language annotation", () => {
    const jsdoc = `/**
     * @example
     * \`\`\`json
     * { "key": "value" }
     * \`\`\`
     */`;
    expect(extractExamples(jsdoc)).toEqual([
      { lang: "json", code: '{ "key": "value" }' },
    ]);
  });

  it("defaults to ts when no language is specified", () => {
    const jsdoc = `/**
     * @example
     * \`\`\`
     * foo()
     * \`\`\`
     */`;
    expect(extractExamples(jsdoc)[0].lang).toBe("ts");
  });

  it("stops at the next @tag", () => {
    const jsdoc = `/**
     * @example
     * \`\`\`ts
     * foo()
     * \`\`\`
     * @returns something
     */`;
    expect(extractExamples(jsdoc)).toEqual([{ lang: "ts", code: "foo()" }]);
  });

  it("returns empty array for JSDoc with no @example", () => {
    const jsdoc = `/**
     * Just a description.
     * @param x - a number
     */`;
    expect(extractExamples(jsdoc)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// findJSDoc — synthetic sources
// ---------------------------------------------------------------------------

describe("findJSDoc", () => {
  it("finds JSDoc for an exported function", () => {
    const source = `
/** Does stuff. */
export function doStuff() {}
`;
    expect(findJSDoc(source, "doStuff")).toBe("/** Does stuff. */");
  });

  it("finds JSDoc for a non-exported function", () => {
    const source = `
/** Internal. */
function internal() {}
`;
    expect(findJSDoc(source, "internal")).toBe("/** Internal. */");
  });

  it("finds JSDoc for an exported type", () => {
    const source = `
/** My type. */
export type MyType = string
`;
    expect(findJSDoc(source, "MyType")).toBe("/** My type. */");
  });

  it("finds JSDoc for an exported interface", () => {
    const source = `
/** Config options. */
export interface Config {
  debug: boolean
}
`;
    expect(findJSDoc(source, "Config")).toBe("/** Config options. */");
  });

  it("finds JSDoc for an exported class", () => {
    const source = `
/** The API builder. */
export class Api {
  constructor() {}
}
`;
    expect(findJSDoc(source, "Api")).toBe("/** The API builder. */");
  });

  it("finds JSDoc for a class method", () => {
    const source = `
export class Builder {
  /** Sets the name. */
  name(n: string): this { return this }

  /** Sets the tag. */
  tag(t: string): this { return this }
}
`;
    expect(findJSDoc(source, "Builder.name")).toBe("/** Sets the name. */");
    expect(findJSDoc(source, "Builder.tag")).toBe("/** Sets the tag. */");
  });

  it("returns null for non-existent name", () => {
    const source = `export function foo() {}`;
    expect(findJSDoc(source, "bar")).toBeNull();
  });

  it("returns null for non-existent method", () => {
    const source = `export class Foo { bar() {} }`;
    expect(findJSDoc(source, "Foo.baz")).toBeNull();
  });

  it("returns null for non-existent class", () => {
    const source = `export class Foo { bar() {} }`;
    expect(findJSDoc(source, "NotAClass.bar")).toBeNull();
  });

  it("finds JSDoc for an exported const", () => {
    const source = `
/** The version map. */
export const versionMap = {}
`;
    expect(findJSDoc(source, "versionMap")).toBe("/** The version map. */");
  });

  it("handles generic class declarations", () => {
    const source = `
/** Generic builder. */
export class Builder<T extends string> {
  /** Does work. */
  work(x: T): void {}
}
`;
    expect(findJSDoc(source, "Builder")).toBe("/** Generic builder. */");
    expect(findJSDoc(source, "Builder.work")).toBe("/** Does work. */");
  });
});

// ---------------------------------------------------------------------------
// Integration: extractExamples + findJSDoc on real source files
// ---------------------------------------------------------------------------

const spacSrc = resolve(__dirname, "../../../../spac/src");

describe("real source files", () => {
  it("extracts @example from helpers.ts:noContent", () => {
    const source = readFileSync(resolve(spacSrc, "helpers.ts"), "utf-8");
    const jsdoc = findJSDoc(source, "noContent");
    expect(jsdoc).not.toBeNull();
    const examples = extractExamples(jsdoc!);
    expect(examples.length).toBeGreaterThan(0);
    expect(examples[0].lang).toBe("ts");
    expect(examples[0].code).toContain("noContent()");
  });

  it("extracts @example from helpers.ts:paginated", () => {
    const source = readFileSync(resolve(spacSrc, "helpers.ts"), "utf-8");
    const jsdoc = findJSDoc(source, "paginated");
    expect(jsdoc).not.toBeNull();
    const examples = extractExamples(jsdoc!);
    expect(examples.length).toBeGreaterThan(0);
    expect(examples[0].code).toContain("paginated(");
  });

  it("extracts @example from helpers.ts:errorSchema", () => {
    const source = readFileSync(resolve(spacSrc, "helpers.ts"), "utf-8");
    const jsdoc = findJSDoc(source, "errorSchema");
    expect(jsdoc).not.toBeNull();
    const examples = extractExamples(jsdoc!);
    expect(examples.length).toBeGreaterThan(0);
    expect(examples[0].code).toContain("errorSchema()");
  });

  it("extracts @example from route.ts:RouteBuilder.summary", () => {
    const source = readFileSync(resolve(spacSrc, "route.ts"), "utf-8");
    const jsdoc = findJSDoc(source, "RouteBuilder.summary");
    expect(jsdoc).not.toBeNull();
    const examples = extractExamples(jsdoc!);
    expect(examples.length).toBeGreaterThan(0);
    expect(examples[0].code).toContain(".summary(");
  });

  it("extracts @example from route.ts:RouteBuilder.tag", () => {
    const source = readFileSync(resolve(spacSrc, "route.ts"), "utf-8");
    const jsdoc = findJSDoc(source, "RouteBuilder.tag");
    expect(jsdoc).not.toBeNull();
    const examples = extractExamples(jsdoc!);
    expect(examples.length).toBeGreaterThan(0);
    expect(examples[0].code).toContain(".tag(");
  });

  it("extracts @example from api.ts:Api class", () => {
    const source = readFileSync(resolve(spacSrc, "api.ts"), "utf-8");
    const jsdoc = findJSDoc(source, "Api");
    expect(jsdoc).not.toBeNull();
    const examples = extractExamples(jsdoc!);
    expect(examples.length).toBeGreaterThan(0);
    expect(examples[0].code).toContain("new Api(");
  });

  it("extracts @example from group.ts:GroupBuilder", () => {
    const source = readFileSync(resolve(spacSrc, "group.ts"), "utf-8");
    const jsdoc = findJSDoc(source, "GroupBuilder");
    expect(jsdoc).not.toBeNull();
    const examples = extractExamples(jsdoc!);
    expect(examples.length).toBeGreaterThan(0);
  });

  it("extracts @example from types.ts:RouteConfig", () => {
    const source = readFileSync(resolve(spacSrc, "types.ts"), "utf-8");
    const jsdoc = findJSDoc(source, "RouteConfig");
    expect(jsdoc).not.toBeNull();
    const examples = extractExamples(jsdoc!);
    expect(examples.length).toBeGreaterThan(0);
  });

  it("returns null for BaseRouteConfig (no JSDoc on that interface)", () => {
    const source = readFileSync(resolve(spacSrc, "types.ts"), "utf-8");
    expect(findJSDoc(source, "BaseRouteConfig")).toBeNull();
  });
});

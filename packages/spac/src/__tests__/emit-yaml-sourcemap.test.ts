import { describe, it, expect } from "vitest";
import { Type } from "@sinclair/typebox";
import { Api, named } from "../index";
import { TraceMap, originalPositionFor } from "@jridgewell/trace-mapping";
import { extractYamlPositions } from "../sourcemap";

const Pet = named(
  "Pet",
  Type.Object({
    id: Type.Integer(),
    name: Type.String(),
    status: Type.Union([Type.Literal("available"), Type.Literal("sold")]),
  }),
);

function buildPetstore() {
  const api = new Api("3.1", "Petstore", { version: "1.0.0", debug: true });

  api.server({ url: "https://api.petstore.com/v1" });
  api.securityScheme("bearer", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  });
  api.tag({ name: "pets", description: "Pet operations" });

  api.group("/pets", (g) => {
    g.tag("pets");
    g.get("/")
      .query(
        Type.Object({
          status: Type.Optional(Type.String()),
        }),
      )
      .response(Type.Array(Pet))
      .summary("List all pets")
      .description("Returns a list of pets.")
      .operationId("listPets");

    g.post("/")
      .body(Pet)
      .response(Pet)
      .summary("Create a pet")
      .security("bearer");

    g.get("/:petId")
      .params(Type.Object({ petId: Type.String() }))
      .response(Pet)
      .operationId("getPetById")
      .error(404, Type.Object({ message: Type.String() }));
  });

  return api;
}

describe("emit with yaml option", () => {
  it("returns YAML string when yaml: true", () => {
    const api = buildPetstore();
    const result = api.emit({ yaml: true });

    expect(result.yaml).toBeDefined();
    expect(result.yaml).toContain("openapi: 3.1.2");
    expect(result.yaml).toContain("/pets");
    expect(result.yaml).toContain("List all pets");
    expect(result.doc).toBeDefined();
    expect(result.doc.openapi).toBe("3.1.2");
  });

  it("returns doc only when no options (backward compat)", () => {
    const api = buildPetstore();
    const doc = api.emit();

    expect(doc.openapi).toBe("3.1.2");
    expect((doc as any).yaml).toBeUndefined();
  });
});

describe("emit with sourceTable option", () => {
  it("returns source table mapping JSON paths to source entries", () => {
    const api = buildPetstore();
    const result = api.emit({ sourceTable: true });

    expect(result.sourceTable).toBeDefined();
    const st = result.sourceTable!;

    // Route-level entries
    expect(st.has("paths./pets.get")).toBe(true);
    expect(st.has("paths./pets.post")).toBe(true);
    expect(st.has("paths./pets/:petId.get")).toBe(true);

    // Metadata entries
    expect(st.has("paths./pets.get.summary")).toBe(true);
    expect(st.has("paths./pets.get.description")).toBe(true);
    expect(st.has("paths./pets.get.operationId")).toBe(true);
    expect(st.has("paths./pets.post.summary")).toBe(true);

    // Query params
    expect(st.has("paths./pets.get.parameters")).toBe(true);

    // Response
    expect(st.has("paths./pets.get.responses.200")).toBe(true);

    // Error
    expect(st.has("paths./pets/:petId.get.responses.404")).toBe(true);

    // Security
    expect(st.has("paths./pets.post.security")).toBe(true);

    // Api-level
    expect(st.has("info")).toBe(true);
    expect(st.has("servers")).toBe(true);
    expect(st.has("tags")).toBe(true);
    expect(st.has("components.securitySchemes.bearer")).toBe(true);

    // All entries have valid source locations
    for (const [, entry] of st) {
      expect(entry.source.file).toBeTruthy();
      expect(entry.source.line).toBeGreaterThan(0);
    }
  });
});

describe("emit with sourceMap option", () => {
  it("generates a valid Source Map V3", () => {
    const api = buildPetstore();
    const result = api.emit({ sourceMap: true });

    expect(result.sourceMap).toBeDefined();
    expect(result.yaml).toBeDefined();
    expect(result.sourceTable).toBeDefined();

    const sm = JSON.parse(result.sourceMap!);
    expect(sm.version).toBe(3);
    expect(sm.file).toBe("openapi.yaml");
    expect(sm.sources).toBeDefined();
    expect(sm.sources.length).toBeGreaterThan(0);
    expect(sm.mappings).toBeDefined();
    expect(sm.mappings.length).toBeGreaterThan(0);
  });

  it("allows custom generatedFile name", () => {
    const api = buildPetstore();
    const result = api.emit({ sourceMap: true, generatedFile: "spec.yaml" });

    const sm = JSON.parse(result.sourceMap!);
    expect(sm.file).toBe("spec.yaml");
  });

  it("round-trips: YAML position → original source via trace-mapping", () => {
    const api = buildPetstore();
    const result = api.emit({ sourceMap: true });

    const tracer = new TraceMap(result.sourceMap!);
    const yamlPositions = extractYamlPositions(result.yaml!);

    // Look up where "summary" appears in the YAML for /pets GET
    const summaryPos = yamlPositions.get("paths./pets.get.summary");
    expect(summaryPos).toBeDefined();

    // Use the tracer to find the original source location
    const original = originalPositionFor(tracer, {
      line: summaryPos!.line + 1, // trace-mapping uses 1-based lines
      column: summaryPos!.column,
    });

    expect(original.source).toBeTruthy();
    expect(original.line).toBeGreaterThan(0);
    // The source should point to a real file (our test file)
    expect(original.source).toContain(".test.ts");
  });

  it("maps error responses to their .error() call sites", () => {
    const api = buildPetstore();
    const result = api.emit({ sourceMap: true });

    const tracer = new TraceMap(result.sourceMap!);
    const yamlPositions = extractYamlPositions(result.yaml!);

    const errorPos = yamlPositions.get("paths./pets/:petId.get.responses.404");
    expect(errorPos).toBeDefined();

    const original = originalPositionFor(tracer, {
      line: errorPos!.line + 1,
      column: errorPos!.column,
    });

    expect(original.source).toBeTruthy();
    expect(original.line).toBeGreaterThan(0);
  });

  it("maps securitySchemes to their api.securityScheme() call sites", () => {
    const api = buildPetstore();
    const result = api.emit({ sourceMap: true });

    const tracer = new TraceMap(result.sourceMap!);
    const yamlPositions = extractYamlPositions(result.yaml!);

    const schemePos = yamlPositions.get("components.securitySchemes.bearer");
    expect(schemePos).toBeDefined();

    const original = originalPositionFor(tracer, {
      line: schemePos!.line + 1,
      column: schemePos!.column,
    });

    expect(original.source).toBeTruthy();
    expect(original.line).toBeGreaterThan(0);
  });
});

describe("extractYamlPositions", () => {
  it("extracts positions for a simple YAML document", () => {
    const yaml = `openapi: "3.1.2"
info:
  title: Test
  version: "1.0.0"
paths:
  /pets:
    get:
      summary: List pets
`;
    const positions = extractYamlPositions(yaml);

    expect(positions.has("openapi")).toBe(true);
    expect(positions.get("openapi")!.line).toBe(0);

    expect(positions.has("info")).toBe(true);
    expect(positions.has("info.title")).toBe(true);
    expect(positions.has("info.version")).toBe(true);

    expect(positions.has("paths")).toBe(true);
    expect(positions.has("paths./pets")).toBe(true);
    expect(positions.has("paths./pets.get")).toBe(true);
    expect(positions.has("paths./pets.get.summary")).toBe(true);
  });
});

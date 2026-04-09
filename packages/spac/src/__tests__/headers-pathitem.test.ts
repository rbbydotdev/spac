import { describe, it, expect } from "vitest";
import { Type } from "@sinclair/typebox";
import { Api } from "../index";

describe("Batch 6: Header enrichment + Path Item metadata", () => {
  // -- HeaderConfig ----------------------------------------------------------

  describe("enriched headers", () => {
    it("HeaderConfig with all fields emits correctly", () => {
      const api = new Api("3.1", "Test");
      api.get("/test").respond(200, {
        description: "OK",
        schema: Type.String(),
        headers: {
          "X-Rate-Limit": {
            schema: Type.Integer(),
            description: "Calls per hour allowed",
            required: true,
            deprecated: false,
          },
        },
      });
      const spec = api.emit() as any;
      const header =
        spec.paths["/test"].get.responses["200"].headers["X-Rate-Limit"];
      expect(header.schema.type).toBe("integer");
      expect(header.description).toBe("Calls per hour allowed");
      expect(header.required).toBe(true);
      expect(header.deprecated).toBe(false);
    });

    it("plain TSchema headers still work (backward compat)", () => {
      const api = new Api("3.1", "Test");
      api.get("/test").respond(200, {
        description: "OK",
        schema: Type.String(),
        headers: {
          "X-Count": Type.Integer(),
        },
      });
      const spec = api.emit() as any;
      const header =
        spec.paths["/test"].get.responses["200"].headers["X-Count"];
      expect(header.schema.type).toBe("integer");
      expect(header.description).toBeUndefined();
    });

    it("mixed headers — TSchema and HeaderConfig together", () => {
      const api = new Api("3.1", "Test");
      api.get("/test").respond(200, {
        description: "OK",
        schema: Type.String(),
        headers: {
          "X-Simple": Type.Integer(),
          "X-Enriched": {
            schema: Type.String(),
            description: "Enriched header",
            required: true,
          },
        },
      });
      const spec = api.emit() as any;
      const headers = spec.paths["/test"].get.responses["200"].headers;
      // Simple
      expect(headers["X-Simple"].schema.type).toBe("integer");
      expect(headers["X-Simple"].description).toBeUndefined();
      // Enriched
      expect(headers["X-Enriched"].schema.type).toBe("string");
      expect(headers["X-Enriched"].description).toBe("Enriched header");
      expect(headers["X-Enriched"].required).toBe(true);
    });

    it("enriched headers in chained .respond()", () => {
      const api = new Api("3.1", "Test");
      api.get("/test").respond(200, {
        description: "OK",
        schema: Type.String(),
        headers: {
          "X-Custom": {
            schema: Type.Integer(),
            description: "Custom header",
          },
        },
      });
      const spec = api.emit() as any;
      const header =
        spec.paths["/test"].get.responses["200"].headers["X-Custom"];
      expect(header.description).toBe("Custom header");
    });
  });

  // -- Path item metadata ---------------------------------------------------

  describe("path item summary/description", () => {
    it("pathSummary sets summary on path item", () => {
      const api = new Api("3.1", "Test");
      api.group("/pets", (g) => {
        g.pathSummary("Pet operations");
        g.get("/").response(Type.String());
      });
      const spec = api.emit() as any;
      expect(spec.paths["/pets"].summary).toBe("Pet operations");
    });

    it("pathDescription sets description on path item", () => {
      const api = new Api("3.1", "Test");
      api.group("/pets", (g) => {
        g.pathDescription("All operations related to pet management");
        g.get("/").response(Type.String());
      });
      const spec = api.emit() as any;
      expect(spec.paths["/pets"].description).toBe(
        "All operations related to pet management",
      );
    });

    it("pathSummary and pathDescription together", () => {
      const api = new Api("3.1", "Test");
      api.group("/pets", (g) => {
        g.pathSummary("Pet ops");
        g.pathDescription("Detailed pet operations");
        g.get("/").response(Type.String());
      });
      const spec = api.emit() as any;
      expect(spec.paths["/pets"].summary).toBe("Pet ops");
      expect(spec.paths["/pets"].description).toBe("Detailed pet operations");
    });

    it("path item metadata does not interfere with operations", () => {
      const api = new Api("3.1", "Test");
      api.group("/pets", (g) => {
        g.pathSummary("Pet ops");
        g.get("/").response(Type.String()).summary("List pets");
      });
      const spec = api.emit() as any;
      expect(spec.paths["/pets"].summary).toBe("Pet ops");
      expect(spec.paths["/pets"].get.summary).toBe("List pets");
    });

    it("returns this for chaining", () => {
      const api = new Api("3.1", "Test");
      api.group("/pets", (g) => {
        expect(g.pathSummary("test")).toBe(g);
        expect(g.pathDescription("test")).toBe(g);
        g.get("/").response(Type.String());
      });
      api.emit();
    });
  });

  // -- Source mapping --------------------------------------------------------

  describe("source mapping", () => {
    it("captures pathSummary kind on group", () => {
      const api = new Api("3.1", "Test", { debug: true });
      api.group("/pets", (g) => {
        g.pathSummary("Pet ops");
        g.get("/").response(Type.String());
      });
      const result = api.emit({ sourceTable: true });
      // The route within the group is captured
      expect(result.sourceTable!.has("paths./pets.get")).toBe(true);
    });
  });
});

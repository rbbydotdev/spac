import { describe, it, expect } from "vitest";
import { Type } from "@sinclair/typebox";
import { Api, errorSchema } from "../index";

describe("Batch 3: Default response + Extensions on Api/Group", () => {
  // -- Default response -------------------------------------------------------

  describe("default response", () => {
    it('"default" key in responses config → emits responses.default', () => {
      const api = new Api("3.1", "Test");
      api
        .get("/pets/:petId")
        .params(Type.Object({ petId: Type.String() }))
        .response(Type.String())
        .respond("default", {
          description: "Unexpected error",
          schema: errorSchema(),
        });
      const spec = api.emit() as any;
      expect(spec.paths["/pets/:petId"].get.responses.default).toBeDefined();
      expect(spec.paths["/pets/:petId"].get.responses.default.description).toBe(
        "Unexpected error",
      );
    });

    it('.respond("default", ...) → emits correctly', () => {
      const api = new Api("3.1", "Test");
      api
        .get("/pets")
        .response(Type.String())
        .respond("default" as any, {
          description: "Unexpected error",
          schema: errorSchema(),
        });
      const spec = api.emit() as any;
      expect(spec.paths["/pets"].get.responses.default).toBeDefined();
      expect(spec.paths["/pets"].get.responses.default.description).toBe(
        "Unexpected error",
      );
    });

    it('.link("default", ...) attaches to default response', () => {
      const api = new Api("3.1", "Test");
      api
        .get("/pets")
        .response(Type.String())
        .respond("default" as any, { description: "Error" })
        .link("default", "ErrorDocs", { operationId: "getErrorDocs" });
      const spec = api.emit() as any;
      expect(spec.paths["/pets"].get.responses.default.links.ErrorDocs).toEqual(
        {
          operationId: "getErrorDocs",
        },
      );
    });

    it("default coexists with numbered status codes", () => {
      const api = new Api("3.1", "Test");
      api
        .get("/pets")
        .respond(200, { description: "OK", schema: Type.String() })
        .respond("default", { description: "Error", schema: errorSchema() });
      const spec = api.emit() as any;
      expect(spec.paths["/pets"].get.responses["200"]).toBeDefined();
      expect(spec.paths["/pets"].get.responses.default).toBeDefined();
    });
  });

  // -- Api-level extensions ---------------------------------------------------

  describe("api.extension()", () => {
    it("emits on root doc with x- prefix", () => {
      const api = new Api("3.1", "Test");
      api.extension("x-api-id", "abc");
      const spec = api.emit() as any;
      expect(spec["x-api-id"]).toBe("abc");
    });

    it("auto-prepends x- prefix", () => {
      const api = new Api("3.1", "Test");
      api.extension("custom", "val");
      const spec = api.emit() as any;
      expect(spec["x-custom"]).toBe("val");
    });

    it("does not overwrite standard fields", () => {
      const api = new Api("3.1", "Test");
      api.extension("x-extra", "data");
      const spec = api.emit() as any;
      expect(spec.openapi).toBe("3.1.2");
      expect(spec.info.title).toBe("Test");
      expect(spec["x-extra"]).toBe("data");
    });

    it("returns this for chaining", () => {
      const api = new Api("3.1", "Test");
      expect(api.extension("x-test", 1)).toBe(api);
    });
  });

  // -- Group-level extensions -------------------------------------------------

  describe("group.extension()", () => {
    it("emits on path items in group", () => {
      const api = new Api("3.1", "Test");
      api.group("/pets", (g) => {
        g.extension("x-resource", "pet");
        g.get("/").response(Type.String());
      });
      const spec = api.emit() as any;
      expect(spec.paths["/pets"]["x-resource"]).toBe("pet");
    });

    it("auto-prepends x- prefix", () => {
      const api = new Api("3.1", "Test");
      api.group("/pets", (g) => {
        g.extension("group-meta", { custom: true });
        g.get("/").response(Type.String());
      });
      const spec = api.emit() as any;
      expect(spec.paths["/pets"]["x-group-meta"]).toEqual({ custom: true });
    });

    it("nested group extensions", () => {
      const api = new Api("3.1", "Test");
      api.group("/store", (g) => {
        g.extension("x-parent", "store");
        g.group("/admin", (admin) => {
          admin.extension("x-child", "admin");
          admin.get("/stats").response(Type.String());
        });
      });
      const spec = api.emit() as any;
      // Nested group path should have both parent and child extensions
      expect(spec.paths["/store/admin/stats"]["x-parent"]).toBe("store");
      expect(spec.paths["/store/admin/stats"]["x-child"]).toBe("admin");
    });

    it("returns this for chaining", () => {
      const api = new Api("3.1", "Test");
      api.group("/pets", (g) => {
        expect(g.extension("x-test", 1)).toBe(g);
        g.get("/").response(Type.String());
      });
      api.emit();
    });
  });

  // -- Source mapping --------------------------------------------------------

  describe("source mapping", () => {
    it("captures extension kind on Api", () => {
      const api = new Api("3.1", "Test", { debug: true });
      api.extension("x-api-id", "abc");
      const result = api.emit({ sourceTable: true });
      expect(result.sourceTable!.has("x-api-id")).toBe(true);
    });
  });
});

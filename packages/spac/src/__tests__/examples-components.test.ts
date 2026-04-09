import { describe, it, expect } from "vitest";
import { Type } from "@sinclair/typebox";
import { Api } from "../index";

describe("Batch 5: Examples on Parameters/Media Types + Reusable components", () => {
  // -- Response examples ----------------------------------------------------

  describe("response examples", () => {
    it("ResponseDef example emits on media type", () => {
      const api = new Api("3.1", "Test");
      api.get("/pets").respond(200, {
        description: "OK",
        schema: Type.Object({ id: Type.Integer() }),
        example: { id: 1 },
      });
      const spec = api.emit() as any;
      const mediaType =
        spec.paths["/pets"].get.responses["200"].content["application/json"];
      expect(mediaType.example).toEqual({ id: 1 });
    });

    it("ResponseDef examples (named) emits on media type", () => {
      const api = new Api("3.1", "Test");
      api.get("/pets").respond(200, {
        description: "OK",
        schema: Type.Object({ id: Type.Integer(), name: Type.String() }),
        examples: {
          frog: { summary: "A frog", value: { id: 1, name: "Frog" } },
          cat: { summary: "A cat", value: { id: 2, name: "Cat" } },
        },
      });
      const spec = api.emit() as any;
      const mediaType =
        spec.paths["/pets"].get.responses["200"].content["application/json"];
      expect(mediaType.examples.frog).toEqual({
        summary: "A frog",
        value: { id: 1, name: "Frog" },
      });
      expect(mediaType.examples.cat).toEqual({
        summary: "A cat",
        value: { id: 2, name: "Cat" },
      });
    });

    it("example on chained .respond() call", () => {
      const api = new Api("3.1", "Test");
      api.get("/pets").respond(200, {
        description: "OK",
        schema: Type.Object({ id: Type.Integer() }),
        example: { id: 42 },
      });
      const spec = api.emit() as any;
      const mediaType =
        spec.paths["/pets"].get.responses["200"].content["application/json"];
      expect(mediaType.example).toEqual({ id: 42 });
    });
  });

  // -- Reusable components --------------------------------------------------

  describe("api.component()", () => {
    it("registers responses component", () => {
      const api = new Api("3.1", "Test");
      api.component("responses", "NotFound", {
        description: "Resource not found",
      });
      const spec = api.emit() as any;
      expect(spec.components.responses.NotFound).toEqual({
        description: "Resource not found",
      });
    });

    it("registers parameters component", () => {
      const api = new Api("3.1", "Test");
      api.component("parameters", "PageParam", {
        name: "page",
        in: "query",
        schema: { type: "integer", minimum: 1 },
      });
      const spec = api.emit() as any;
      expect(spec.components.parameters.PageParam).toBeDefined();
      expect(spec.components.parameters.PageParam.name).toBe("page");
    });

    it("registers headers component", () => {
      const api = new Api("3.1", "Test");
      api.component("headers", "X-Rate-Limit", {
        schema: { type: "integer" },
        description: "Calls per hour",
      });
      const spec = api.emit() as any;
      expect(spec.components.headers["X-Rate-Limit"]).toBeDefined();
    });

    it("registers links component", () => {
      const api = new Api("3.1", "Test");
      api.component("links", "GetPetById", {
        operationId: "getPet",
        parameters: { petId: "$response.body#/id" },
      });
      const spec = api.emit() as any;
      expect(spec.components.links.GetPetById).toBeDefined();
    });

    it("registers examples component", () => {
      const api = new Api("3.1", "Test");
      api.component("examples", "PetExample", {
        summary: "A pet",
        value: { id: 1, name: "Fido" },
      });
      const spec = api.emit() as any;
      expect(spec.components.examples.PetExample).toEqual({
        summary: "A pet",
        value: { id: 1, name: "Fido" },
      });
    });

    it("existing schemas still work alongside new component types", () => {
      const api = new Api("3.1", "Test");
      api.schema("Pet", Type.Object({ id: Type.Integer() }));
      api.component("responses", "NotFound", { description: "Not found" });
      api.component("examples", "Ex", { value: 1 });
      const spec = api.emit() as any;
      expect(spec.components.schemas.Pet).toBeDefined();
      expect(spec.components.responses.NotFound).toBeDefined();
      expect(spec.components.examples.Ex).toBeDefined();
    });

    it("returns this for chaining", () => {
      const api = new Api("3.1", "Test");
      expect(
        api.component("responses", "NotFound", { description: "Not found" }),
      ).toBe(api);
    });
  });

  // -- Source mapping --------------------------------------------------------

  describe("source mapping", () => {
    it("captures component kind", () => {
      const api = new Api("3.1", "Test", { debug: true });
      api.component("responses", "NotFound", { description: "Not found" });
      const result = api.emit({ sourceTable: true });
      expect(result.sourceTable!.has("components.responses.NotFound")).toBe(
        true,
      );
    });
  });
});

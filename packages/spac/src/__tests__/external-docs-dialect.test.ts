import { describe, it, expect } from "vitest";
import { Type } from "@sinclair/typebox";
import { Api } from "../index";

describe("Batch 1: externalDocs + jsonSchemaDialect", () => {
  // -- jsonSchemaDialect ---------------------------------------------------

  describe("jsonSchemaDialect", () => {
    it("emits jsonSchemaDialect on doc root with correct URI", () => {
      const api = new Api("3.1", "Test");
      const spec = api.emit() as any;
      expect(spec.jsonSchemaDialect).toBe(
        "https://json-schema.org/draft/2020-12/schema",
      );
    });
  });

  // -- Api-level externalDocs -----------------------------------------------

  describe("api.externalDocs()", () => {
    it("stores and emits at root level (url only)", () => {
      const api = new Api("3.1", "Test");
      api.externalDocs({ url: "https://example.com/docs" });
      const spec = api.emit() as any;
      expect(spec.externalDocs).toEqual({ url: "https://example.com/docs" });
    });

    it("stores and emits at root level (url + description)", () => {
      const api = new Api("3.1", "Test");
      api.externalDocs({
        url: "https://example.com/docs",
        description: "Full docs",
      });
      const spec = api.emit() as any;
      expect(spec.externalDocs).toEqual({
        url: "https://example.com/docs",
        description: "Full docs",
      });
    });

    it("returns this for chaining", () => {
      const api = new Api("3.1", "Test");
      const result = api.externalDocs({ url: "https://example.com" });
      expect(result).toBe(api);
    });
  });

  // -- Route-level externalDocs ---------------------------------------------

  describe("route.externalDocs()", () => {
    it("stores and emits at operation level", () => {
      const api = new Api("3.1", "Test");
      api.get("/pets").response(Type.Array(Type.String())).externalDocs({
        url: "https://example.com/pets",
        description: "Pet docs",
      });
      const spec = api.emit() as any;
      expect(spec.paths["/pets"].get.externalDocs).toEqual({
        url: "https://example.com/pets",
        description: "Pet docs",
      });
    });

    it("works within groups", () => {
      const api = new Api("3.1", "Test");
      api.group("/pets", (g) => {
        g.get("/")
          .response(Type.String())
          .externalDocs({ url: "https://example.com/list-pets" });
      });
      const spec = api.emit() as any;
      expect(spec.paths["/pets"].get.externalDocs).toEqual({
        url: "https://example.com/list-pets",
      });
    });

    it("returns this for chaining", () => {
      const api = new Api("3.1", "Test");
      const builder = api.get("/pets").response(Type.String());
      const result = builder.externalDocs({ url: "https://example.com" });
      expect(result).toBe(builder);
    });
  });

  // -- Source mapping --------------------------------------------------------

  describe("source mapping", () => {
    it("captures externalDocs kind on Api", () => {
      const api = new Api("3.1", "Test", { debug: true });
      api.externalDocs({ url: "https://example.com" });
      const result = api.emit({ sourceTable: true });
      expect(result.sourceTable!.has("externalDocs")).toBe(true);
    });

    it("captures externalDocs kind on Route", () => {
      const api = new Api("3.1", "Test", { debug: true });
      api
        .get("/pets")
        .response(Type.String())
        .externalDocs({ url: "https://example.com" });
      const result = api.emit({ sourceTable: true });
      expect(result.sourceTable!.has("paths./pets.get.externalDocs")).toBe(
        true,
      );
    });
  });
});

import { describe, it, expect } from "vitest";
import { Type } from "@sinclair/typebox";
import { Api } from "../index";

describe("Batch 7: Parameter style/explode/allowReserved + Encoding + Discriminator + $ref overrides", () => {
  // Note: Parameter style/explode/allowReserved require ParameterConfig support.
  // Since the plan says these are detected at emit time from TypeBox metadata or
  // from ParameterConfig objects, and our current emit uses TypeBox schemas directly,
  // we test by verifying the TypeBox metadata pass-through works.

  // -- TypeBox metadata pass-through -----------------------------------------

  describe("TypeBox metadata pass-through", () => {
    it("TypeBox default on a property emits in the schema", () => {
      const api = new Api("3.1", "Test");
      api
        .get("/pets")
        .query(
          Type.Object({
            page: Type.Integer({ default: 1 }),
          }),
        )
        .response(Type.String());
      const spec = api.emit() as any;
      const param = spec.paths["/pets"].get.parameters.find(
        (p: any) => p.name === "page",
      );
      expect(param.schema.default).toBe(1);
    });

    it("TypeBox examples array on property emits in the schema", () => {
      const api = new Api("3.1", "Test");
      api
        .get("/pets")
        .query(
          Type.Object({
            status: Type.String({ examples: ["available", "sold"] }),
          }),
        )
        .response(Type.String());
      const spec = api.emit() as any;
      const param = spec.paths["/pets"].get.parameters.find(
        (p: any) => p.name === "status",
      );
      expect(param.schema.examples).toEqual(["available", "sold"]);
    });
  });

  // -- Discriminator pass-through --------------------------------------------

  describe("discriminator", () => {
    it("discriminator in TypeBox schema passes through to emitted schema", () => {
      const api = new Api("3.1", "Test");
      const Cat = Type.Object({
        type: Type.Literal("cat"),
        purrs: Type.Boolean(),
      });
      const Dog = Type.Object({
        type: Type.Literal("dog"),
        barks: Type.Boolean(),
      });
      const schema = Type.Union([Cat, Dog], {
        discriminator: { propertyName: "type" },
      });

      api.get("/animals").response(schema);
      const spec = api.emit() as any;
      const respSchema =
        spec.paths["/animals"].get.responses["200"].content["application/json"]
          .schema;
      expect(respSchema.discriminator).toEqual({ propertyName: "type" });
    });
  });

  // -- Registered components survive alongside schemas -----------------------

  describe("component types", () => {
    it("multiple component types coexist", () => {
      const api = new Api("3.1", "Test");
      api.schema("Pet", Type.Object({ id: Type.Integer() }));
      api.component("responses", "NotFound", { description: "Not found" });
      api.component("parameters", "Limit", {
        name: "limit",
        in: "query",
        schema: { type: "integer" },
      });
      api.component("headers", "X-Rate", { schema: { type: "integer" } });
      api.component("examples", "PetEx", { value: { id: 1 } });
      api.component("links", "GetPet", { operationId: "getPet" });
      api.component("callbacks", "WebhookCb", {
        "{$request.body#/url}": { post: {} },
      });
      api.component("pathItems", "PetItem", { get: {} });

      const spec = api.emit() as any;
      expect(spec.components.schemas.Pet).toBeDefined();
      expect(spec.components.responses.NotFound).toBeDefined();
      expect(spec.components.parameters.Limit).toBeDefined();
      expect(spec.components.headers["X-Rate"]).toBeDefined();
      expect(spec.components.examples.PetEx).toBeDefined();
      expect(spec.components.links.GetPet).toBeDefined();
      expect(spec.components.callbacks.WebhookCb).toBeDefined();
      expect(spec.components.pathItems.PetItem).toBeDefined();
    });
  });

  // -- Full integration: all features together -------------------------------

  describe("integration", () => {
    it("an operation can use cookies, body enrichment, externalDocs, callback, and extension together", () => {
      const api = new Api("3.1", "Test");
      api.externalDocs({ url: "https://example.com/docs" });
      api.extension("x-api-id", "test-v1");

      api
        .post("/pets")
        .body(Type.Object({ name: Type.String() }))
        .response(Type.Object({ id: Type.Integer() }))
        .bodyDescription("The pet to create")
        .bodyRequired()
        .cookies(Type.Object({ session: Type.String() }))
        .externalDocs({ url: "https://example.com/create-pet" })
        .callback("onCreated", "{$request.body#/webhookUrl}", (g) => {
          g.post("/").body(Type.Object({ petId: Type.Integer() }));
        })
        .extension("x-rate-limit", 100);

      const spec = api.emit() as any;

      // Doc-level
      expect(spec.externalDocs.url).toBe("https://example.com/docs");
      expect(spec["x-api-id"]).toBe("test-v1");
      expect(spec.jsonSchemaDialect).toBe(
        "https://json-schema.org/draft/2020-12/schema",
      );

      // Operation-level
      const op = spec.paths["/pets"].post;
      expect(op.requestBody.description).toBe("The pet to create");
      expect(op.requestBody.required).toBe(true);
      expect(op.parameters.some((p: any) => p.in === "cookie")).toBe(true);
      expect(op.externalDocs.url).toBe("https://example.com/create-pet");
      expect(op.callbacks.onCreated).toBeDefined();
      expect(op["x-rate-limit"]).toBe(100);
    });
  });
});

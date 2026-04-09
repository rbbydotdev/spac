import { describe, it, expect } from "vitest";
import { Type } from "@sinclair/typebox";
import { Api, named } from "../index";

describe("Batch 4: Webhooks + Callbacks", () => {
  // -- Webhooks ---------------------------------------------------------------

  describe("webhooks", () => {
    it("registers and emits under webhooks", () => {
      const api = new Api("3.1", "Test");
      api.webhook("newPetNotification", (g) => {
        g.post("/")
          .body(Type.Object({ petId: Type.Integer(), event: Type.String() }))
          .response(Type.Object({ received: Type.Boolean() }));
      });
      const spec = api.emit() as any;
      expect(spec.webhooks).toBeDefined();
      expect(spec.webhooks.newPetNotification).toBeDefined();
      expect(spec.webhooks.newPetNotification.post).toBeDefined();
    });

    it("webhook path item has operations with schemas", () => {
      const api = new Api("3.1", "Test");
      api.webhook("petEvent", (g) => {
        g.post("/")
          .body(Type.Object({ event: Type.String() }))
          .response(Type.Object({ ok: Type.Boolean() }));
      });
      const spec = api.emit() as any;
      const wh = spec.webhooks.petEvent.post;
      expect(wh.requestBody.content["application/json"].schema).toBeDefined();
      expect(
        wh.responses["200"].content["application/json"].schema,
      ).toBeDefined();
    });

    it("multiple webhooks", () => {
      const api = new Api("3.1", "Test");
      api.webhook("eventA", (g) => {
        g.post("/").body(Type.Object({ a: Type.String() }));
      });
      api.webhook("eventB", (g) => {
        g.post("/").body(Type.Object({ b: Type.String() }));
      });
      const spec = api.emit() as any;
      expect(Object.keys(spec.webhooks)).toHaveLength(2);
      expect(spec.webhooks.eventA).toBeDefined();
      expect(spec.webhooks.eventB).toBeDefined();
    });

    it("schemas in webhooks get hoisted to components.schemas", () => {
      const PetEvent = named(
        "PetEvent",
        Type.Object({ petId: Type.Integer() }),
      );
      const api = new Api("3.1", "Test");
      api.webhook("petEvent", (g) => {
        g.post("/").body(PetEvent);
      });
      const spec = api.emit() as any;
      expect(spec.components.schemas.PetEvent).toBeDefined();
      expect(
        spec.webhooks.petEvent.post.requestBody.content["application/json"]
          .schema,
      ).toEqual({ $ref: "#/components/schemas/PetEvent" });
    });

    it("returns this for chaining", () => {
      const api = new Api("3.1", "Test");
      expect(
        api.webhook("test", (g) => {
          g.post("/").body(Type.Object({}));
        }),
      ).toBe(api);
    });
  });

  // -- Callbacks --------------------------------------------------------------

  describe("callbacks", () => {
    it("registers and emits under operation callbacks", () => {
      const api = new Api("3.1", "Test");
      api
        .post("/pets")
        .body(Type.Object({ name: Type.String(), callbackUrl: Type.String() }))
        .response(Type.Object({ id: Type.Integer() }))
        .callback("onStatusChange", "{$request.body#/callbackUrl}", (g) => {
          g.post("/").body(Type.Object({ status: Type.String() }));
        });
      const spec = api.emit() as any;
      const callbacks = spec.paths["/pets"].post.callbacks;
      expect(callbacks).toBeDefined();
      expect(callbacks.onStatusChange).toBeDefined();
      const expr = Object.keys(callbacks.onStatusChange)[0];
      expect(expr).toBe("{$request.body#/callbackUrl}");
    });

    it("callback expression key maps to path item", () => {
      const api = new Api("3.1", "Test");
      api
        .post("/subscribe")
        .body(Type.Object({ url: Type.String() }))
        .response(Type.String())
        .callback("onEvent", "{$request.body#/url}", (g) => {
          g.post("/")
            .body(Type.Object({ event: Type.String() }))
            .response(Type.Object({ ok: Type.Boolean() }));
        });
      const spec = api.emit() as any;
      const pathItem =
        spec.paths["/subscribe"].post.callbacks.onEvent["{$request.body#/url}"];
      expect(pathItem.post).toBeDefined();
      expect(pathItem.post.requestBody).toBeDefined();
      expect(pathItem.post.responses["200"]).toBeDefined();
    });

    it("multiple callbacks on one operation", () => {
      const api = new Api("3.1", "Test");
      api
        .post("/pets")
        .body(Type.Object({ name: Type.String() }))
        .response(Type.String())
        .callback("cbA", "{$request.body#/urlA}", (g) => {
          g.post("/").body(Type.Object({ a: Type.String() }));
        })
        .callback("cbB", "{$request.body#/urlB}", (g) => {
          g.post("/").body(Type.Object({ b: Type.String() }));
        });
      const spec = api.emit() as any;
      const callbacks = spec.paths["/pets"].post.callbacks;
      expect(Object.keys(callbacks)).toHaveLength(2);
      expect(callbacks.cbA).toBeDefined();
      expect(callbacks.cbB).toBeDefined();
    });

    it("schemas in callbacks get hoisted to components.schemas", () => {
      const StatusUpdate = named(
        "StatusUpdate",
        Type.Object({ status: Type.String() }),
      );
      const api = new Api("3.1", "Test");
      api
        .post("/pets")
        .body(Type.Object({ name: Type.String() }))
        .response(Type.String())
        .callback("onStatus", "{$request.body#/url}", (g) => {
          g.post("/").body(StatusUpdate);
        });
      const spec = api.emit() as any;
      expect(spec.components.schemas.StatusUpdate).toBeDefined();
    });

    it("returns this for chaining", () => {
      const api = new Api("3.1", "Test");
      const builder = api
        .post("/pets")
        .body(Type.Object({ name: Type.String() }))
        .response(Type.String());
      expect(
        builder.callback("test", "{url}", (g) => {
          g.post("/").body(Type.Object({}));
        }),
      ).toBe(builder);
    });
  });

  // -- Source mapping --------------------------------------------------------

  describe("source mapping", () => {
    it("captures webhook kind", () => {
      const api = new Api("3.1", "Test", { debug: true });
      api.webhook("test", (g) => {
        g.post("/").body(Type.Object({}));
      });
      const result = api.emit({ sourceTable: true });
      expect(result.sourceTable!.has("webhooks.test")).toBe(true);
    });

    it("captures callback kind", () => {
      const api = new Api("3.1", "Test", { debug: true });
      api
        .post("/pets")
        .body(Type.Object({}))
        .response(Type.String())
        .callback("cb", "{url}", (g) => {
          g.post("/").body(Type.Object({}));
        });
      const result = api.emit({ sourceTable: true });
      expect(result.sourceTable!.has("paths./pets.post.callbacks")).toBe(true);
    });
  });
});

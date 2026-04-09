import { describe, it, expect } from "vitest";
import { Type } from "@sinclair/typebox";
import { Api } from "../index";

describe("Batch 2: Request body enrichment + Cookie params + Parameter descriptions", () => {
  // -- bodyDescription -------------------------------------------------------

  describe("bodyDescription", () => {
    it("in config → emits requestBody.description", () => {
      const api = new Api("3.1", "Test");
      api
        .post("/pets")
        .body(Type.Object({ name: Type.String() }))
        .bodyDescription("Pet to create");
      const spec = api.emit() as any;
      expect(spec.paths["/pets"].post.requestBody.description).toBe(
        "Pet to create",
      );
    });

    it(".bodyDescription() chaining → emits requestBody.description", () => {
      const api = new Api("3.1", "Test");
      api
        .post("/pets")
        .body(Type.Object({ name: Type.String() }))
        .bodyDescription("Pet to create");
      const spec = api.emit() as any;
      expect(spec.paths["/pets"].post.requestBody.description).toBe(
        "Pet to create",
      );
    });

    it("returns this for chaining", () => {
      const api = new Api("3.1", "Test");
      const builder = api
        .post("/pets")
        .body(Type.Object({ name: Type.String() }));
      expect(builder.bodyDescription("test")).toBe(builder);
    });
  });

  // -- bodyRequired ----------------------------------------------------------

  describe("bodyRequired", () => {
    it("in config → emits requestBody.required: true", () => {
      const api = new Api("3.1", "Test");
      api
        .post("/pets")
        .body(Type.Object({ name: Type.String() }))
        .bodyRequired(true);
      const spec = api.emit() as any;
      expect(spec.paths["/pets"].post.requestBody.required).toBe(true);
    });

    it(".bodyRequired() chaining → emits requestBody.required: true", () => {
      const api = new Api("3.1", "Test");
      api
        .post("/pets")
        .body(Type.Object({ name: Type.String() }))
        .bodyRequired();
      const spec = api.emit() as any;
      expect(spec.paths["/pets"].post.requestBody.required).toBe(true);
    });

    it("bodyRequired absent → field not emitted", () => {
      const api = new Api("3.1", "Test");
      api.post("/pets").body(Type.Object({ name: Type.String() }));
      const spec = api.emit() as any;
      expect(spec.paths["/pets"].post.requestBody.required).toBeUndefined();
    });

    it("returns this for chaining", () => {
      const api = new Api("3.1", "Test");
      const builder = api
        .post("/pets")
        .body(Type.Object({ name: Type.String() }));
      expect(builder.bodyRequired()).toBe(builder);
    });
  });

  // -- Cookie parameters -----------------------------------------------------

  describe("cookies", () => {
    it("in config → emits parameters with in: cookie", () => {
      const api = new Api("3.1", "Test");
      api
        .get("/store/inventory")
        .cookies(Type.Object({ session_id: Type.String() }))
        .response(Type.String());
      const spec = api.emit() as any;
      const cookieParams = spec.paths["/store/inventory"].get.parameters.filter(
        (p: any) => p.in === "cookie",
      );
      expect(cookieParams).toHaveLength(1);
      expect(cookieParams[0].name).toBe("session_id");
    });

    it(".cookies() chaining → same", () => {
      const api = new Api("3.1", "Test");
      api
        .get("/store/inventory")
        .response(Type.String())
        .cookies(Type.Object({ session_id: Type.String() }));
      const spec = api.emit() as any;
      const cookieParams = spec.paths["/store/inventory"].get.parameters.filter(
        (p: any) => p.in === "cookie",
      );
      expect(cookieParams).toHaveLength(1);
      expect(cookieParams[0].name).toBe("session_id");
    });

    it("cookie required/optional follows TypeBox required array", () => {
      const api = new Api("3.1", "Test");
      api
        .get("/test")
        .response(Type.String())
        .cookies(
          Type.Object({
            required_cookie: Type.String(),
            optional_cookie: Type.Optional(Type.String()),
          }),
        );
      const spec = api.emit() as any;
      const params = spec.paths["/test"].get.parameters;
      const reqCookie = params.find((p: any) => p.name === "required_cookie");
      const optCookie = params.find((p: any) => p.name === "optional_cookie");
      expect(reqCookie.required).toBe(true);
      expect(optCookie.required).toBeUndefined();
    });

    it("cookie + query + header params coexist on one operation", () => {
      const api = new Api("3.1", "Test");
      api
        .get("/test")
        .query(Type.Object({ q: Type.String() }))
        .headers(Type.Object({ "X-Custom": Type.String() }))
        .response(Type.String())
        .cookies(Type.Object({ sid: Type.String() }));
      const spec = api.emit() as any;
      const params = spec.paths["/test"].get.parameters;
      const types = params.map((p: any) => p.in);
      expect(types).toContain("query");
      expect(types).toContain("header");
      expect(types).toContain("cookie");
    });

    it("returns this for chaining", () => {
      const api = new Api("3.1", "Test");
      const builder = api.get("/test").response(Type.String());
      expect(builder.cookies(Type.Object({ sid: Type.String() }))).toBe(
        builder,
      );
    });
  });

  // -- Parameter descriptions ------------------------------------------------

  describe("parameter descriptions from TypeBox", () => {
    it("TypeBox description on path param → parameter description emitted", () => {
      const api = new Api("3.1", "Test");
      api
        .get("/pets/:petId")
        .params(
          Type.Object({
            petId: Type.Integer({ description: "Unique pet identifier" }),
          }),
        )
        .response(Type.String());
      const spec = api.emit() as any;
      const param = spec.paths["/pets/:petId"].get.parameters.find(
        (p: any) => p.name === "petId",
      );
      expect(param.description).toBe("Unique pet identifier");
    });

    it("TypeBox description on query param → parameter description emitted", () => {
      const api = new Api("3.1", "Test");
      api
        .get("/pets")
        .query(
          Type.Object({
            status: Type.String({ description: "Filter by status" }),
          }),
        )
        .response(Type.String());
      const spec = api.emit() as any;
      const param = spec.paths["/pets"].get.parameters.find(
        (p: any) => p.name === "status",
      );
      expect(param.description).toBe("Filter by status");
    });

    it("TypeBox description on header param → parameter description emitted", () => {
      const api = new Api("3.1", "Test");
      api
        .get("/pets")
        .headers(
          Type.Object({
            "X-Request-Id": Type.String({ description: "Request tracing ID" }),
          }),
        )
        .response(Type.String());
      const spec = api.emit() as any;
      const param = spec.paths["/pets"].get.parameters.find(
        (p: any) => p.name === "X-Request-Id",
      );
      expect(param.description).toBe("Request tracing ID");
    });

    it("TypeBox description on cookie param → parameter description emitted", () => {
      const api = new Api("3.1", "Test");
      api
        .get("/pets")
        .response(Type.String())
        .cookies(
          Type.Object({
            sid: Type.String({ description: "Session ID cookie" }),
          }),
        );
      const spec = api.emit() as any;
      const param = spec.paths["/pets"].get.parameters.find(
        (p: any) => p.name === "sid",
      );
      expect(param.description).toBe("Session ID cookie");
    });
  });

  // -- Works within groups ---------------------------------------------------

  describe("within groups", () => {
    it("cookies work within groups", () => {
      const api = new Api("3.1", "Test");
      api.group("/store", (g) => {
        g.get("/inventory")
          .response(Type.String())
          .cookies(Type.Object({ session_id: Type.String() }));
      });
      const spec = api.emit() as any;
      const params = spec.paths["/store/inventory"].get.parameters;
      expect(
        params.some((p: any) => p.in === "cookie" && p.name === "session_id"),
      ).toBe(true);
    });
  });

  // -- Source mapping --------------------------------------------------------

  describe("source mapping", () => {
    it("captures cookies kind", () => {
      const api = new Api("3.1", "Test", { debug: true });
      api
        .get("/test")
        .response(Type.String())
        .cookies(Type.Object({ sid: Type.String() }));
      const result = api.emit({ sourceTable: true });
      expect(result.sourceTable!.has("paths./test.get.parameters")).toBe(true);
    });
  });
});

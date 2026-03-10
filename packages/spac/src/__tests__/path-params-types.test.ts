import { Type } from "@sinclair/typebox";
import { describe, expect, it } from "vitest";
import { Api, noContent, type ExtractPathParams } from "../index";

// ---------------------------------------------------------------------------
// Compile-time type assertions
// ---------------------------------------------------------------------------

// ExtractPathParams extracts :colon-style params
type ColonSingle = ExtractPathParams<"/orders/:orderId">;
const _c1: ColonSingle = "orderId";

// ExtractPathParams extracts {brace}-style params
type BraceSingle = ExtractPathParams<"/orders/{orderId}">;
const _b1: BraceSingle = "orderId";

// ExtractPathParams extracts multiple params
type Multi = ExtractPathParams<"/users/:userId/posts/:postId">;
const _m1: Multi = "userId";
const _m2: Multi = "postId";

// ExtractPathParams returns never for static paths
type Static = ExtractPathParams<"/health">;
type AssertNever = Static extends never ? true : false;
const _s: AssertNever = true;

// ---------------------------------------------------------------------------
// Directive must be on the line immediately before the error (the params line).
// ---------------------------------------------------------------------------

const api = new Api("TypeTest");

// Wrong param key name (single param)
api.get("/orders/:orderId", {
  // @ts-expect-error — 'Order_Id' does not satisfy 'orderId'
  params: Type.Object({ Order_Id: Type.Integer() }),
});

// Missing params entirely on a parameterized path
// @ts-expect-error — params is required when path has :orderId
api.get("/orders/:orderId", { response: Type.String() });

// Passing params on a static path (no path params)
api.get("/health", {
  // @ts-expect-error — params not allowed on '/health'
  params: Type.Object({ id: Type.String() }),
  response: Type.String(),
});

// Wrong key among multiple params
api.get("/users/:userId/posts/:postId", {
  // @ts-expect-error — 'wrongId' does not satisfy 'userId' | 'postId'
  params: Type.Object({ userId: Type.String(), wrongId: Type.String() }),
});

// Missing one of multiple required params
api.get("/users/:userId/posts/:postId", {
  // @ts-expect-error — missing 'postId'
  params: Type.Object({ userId: Type.String() }),
});

// Wrong param key in a group route
api.group("/orders", (g) => {
  g.delete("/:orderId", {
    // @ts-expect-error — 'badName' does not satisfy 'orderId'
    params: Type.Object({ badName: Type.Integer() }),
  });
});

// Missing params in a group route
api.group("/orders", (g) => {
  // @ts-expect-error — params required when path has :orderId
  g.get("/:orderId", { response: Type.String() });
});

// ---------------------------------------------------------------------------
// Group-level path params — compile-time checks
// ---------------------------------------------------------------------------

// Group with path params REQUIRES options object with params
api.group(
  "/zones/{zone_id}/dns_records",
  { params: Type.Object({ zone_id: Type.String() }) },
  (g) => {
    // Child routes must NOT re-declare zone_id in their path
    g.get(
      // @ts-expect-error — zone_id already declared by group prefix
      "/{zone_id}",
      { response: Type.String() },
    );
  },
);

// Group with path params: child route with a DIFFERENT param is fine
api.group(
  "/zones/{zone_id}/dns_records",
  { params: Type.Object({ zone_id: Type.String() }) },
  (g) => {
    g.get("/{record_id}", {
      params: Type.Object({ record_id: Type.String() }),
      response: Type.String(),
    });
  },
);

// Group with path params: child route with no params is fine
api.group(
  "/zones/{zone_id}/dns_records",
  { params: Type.Object({ zone_id: Type.String() }) },
  (g) => {
    g.get("/", { response: Type.String() });
  },
);

// Group WITHOUT path params in prefix — no options object needed
api.group("/orders", (g) => {
  g.get("/", { response: Type.String() });
});

// Group without path params — options object is optional
api.group("/orders", { params: undefined }, (g) => {
  g.get("/", { response: Type.String() });
});

// ---------------------------------------------------------------------------
// Positive tests — these MUST compile and produce correct runtime output
// ---------------------------------------------------------------------------

describe("Path param type safety", () => {
  it("accepts correct params on a parameterized path", () => {
    const api = new Api("Test");
    api.get("/orders/:orderId", {
      params: Type.Object({ orderId: Type.Integer() }),
      response: Type.String(),
    });
    expect(api._routes).toHaveLength(1);
  });

  it("accepts no params on a static path", () => {
    const api = new Api("Test");
    api.get("/health", { response: Type.String() });
    expect(api._routes).toHaveLength(1);
  });

  it("accepts correct multi-params", () => {
    const api = new Api("Test");
    api.get("/users/:userId/posts/:postId", {
      params: Type.Object({ userId: Type.String(), postId: Type.String() }),
      response: Type.String(),
    });
    expect(api._routes).toHaveLength(1);
  });

  it("accepts correct params in group routes", () => {
    const api = new Api("Test");
    api.group("/orders", (g) => {
      g.delete("/:orderId", {
        params: Type.Object({ orderId: Type.Integer() }),
        responses: { 204: noContent() },
      });
    });
    expect(api._groups[0].routes).toHaveLength(1);
  });

  it("works with {brace} style params", () => {
    const api = new Api("Test");
    api.get("/orders/{orderId}", {
      params: Type.Object({ orderId: Type.Integer() }),
      response: Type.String(),
    });
    expect(api._routes).toHaveLength(1);
  });
});

// ===========================================================================
// Group-level params — runtime tests
// ===========================================================================

describe("Group-level path params", () => {
  it("stores group params on GroupNode", () => {
    const api = new Api("Test");
    const zoneIdSchema = Type.Object({ zone_id: Type.String() });
    api.group(
      "/zones/{zone_id}/dns_records",
      { params: zoneIdSchema },
      (g) => {
        g.get("/", { response: Type.String() });
      },
    );
    expect(api._groups[0].params).toBe(zoneIdSchema);
  });

  it("emits inherited group params on child routes", () => {
    const api = new Api("Test");
    api.group(
      "/zones/{zone_id}/dns_records",
      { params: Type.Object({ zone_id: Type.String() }) },
      (g) => {
        g.get("/", { response: Type.String() });
      },
    );
    const doc = api.emit();
    const op = (doc.paths as Record<string, Record<string, Record<string, unknown>>>)["/zones/{zone_id}/dns_records"].get;
    const params = op.parameters as { name: string; in: string; required: boolean }[];
    expect(params).toHaveLength(1);
    expect(params[0].name).toBe("zone_id");
    expect(params[0].in).toBe("path");
    expect(params[0].required).toBe(true);
  });

  it("merges group params with child route params", () => {
    const api = new Api("Test");
    api.group(
      "/zones/{zone_id}/dns_records",
      { params: Type.Object({ zone_id: Type.String() }) },
      (g) => {
        g.get("/{record_id}", {
          params: Type.Object({ record_id: Type.String() }),
          response: Type.String(),
        });
      },
    );
    const doc = api.emit();
    const op = (doc.paths as Record<string, Record<string, Record<string, unknown>>>)["/zones/{zone_id}/dns_records/{record_id}"].get;
    const params = op.parameters as { name: string }[];
    expect(params).toHaveLength(2);
    const names = params.map((p) => p.name);
    expect(names).toContain("zone_id");
    expect(names).toContain("record_id");
  });

  it("nested groups accumulate params", () => {
    const api = new Api("Test");
    api.group(
      "/accounts/{account_id}",
      { params: Type.Object({ account_id: Type.String() }) },
      (g) => {
        g.group(
          "/zones/{zone_id}",
          { params: Type.Object({ zone_id: Type.String() }) },
          (g2) => {
            g2.get("/", { response: Type.String() });
          },
        );
      },
    );
    const doc = api.emit();
    const op = (doc.paths as Record<string, Record<string, Record<string, unknown>>>)["/accounts/{account_id}/zones/{zone_id}"].get;
    const params = op.parameters as { name: string }[];
    expect(params).toHaveLength(2);
    const names = params.map((p) => p.name);
    expect(names).toContain("account_id");
    expect(names).toContain("zone_id");
  });

  it("group without path params works without options", () => {
    const api = new Api("Test");
    api.group("/pets", (g) => {
      g.get("/", { response: Type.String() });
    });
    expect(api._groups[0].params).toBeUndefined();
    expect(api._groups[0].routes).toHaveLength(1);
  });
});

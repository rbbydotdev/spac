import { describe, it, expect } from "vitest";
import { Type } from "@sinclair/typebox";
import { Api, named } from "../index";

describe("source mapping (debug mode)", () => {
  it("captures source entries on RouteBuilder when debug is true", () => {
    const api = new Api("3.1", "Test", { debug: true });
    api
      .get("/pets")
      .response(Type.Array(Type.String()))
      .summary("List pets")
      .description("Returns all pets")
      .tag("pets")
      .operationId("listPets");

    const route = api._routes[0];
    expect(route._sources).toBeDefined();
    expect(route._sources!.length).toBeGreaterThanOrEqual(4); // route, response, summary, description, tag, operationId

    const kinds = route._sources!.map((s) => s.kind);
    expect(kinds).toContain("route");
    expect(kinds).toContain("response");
    expect(kinds).toContain("summary");
    expect(kinds).toContain("description");
    expect(kinds).toContain("tag");
    expect(kinds).toContain("operationId");

    // Verify source locations have file/line/column
    for (const entry of route._sources!) {
      expect(entry.source.file).toContain("sourcemap.test.ts");
      expect(entry.source.line).toBeGreaterThan(0);
      expect(entry.source.column).toBeGreaterThan(0);
    }

    // Tag should have detail
    const tagEntry = route._sources!.find((s) => s.kind === "tag");
    expect(tagEntry!.detail).toBe("pets");
  });

  it("captures source entries on GroupBuilder when debug is true", () => {
    const api = new Api("3.1", "Test", { debug: true });
    api.group("/pets", (g) => {
      g.tag("pets");
      g.security("bearer");
      g.get("/").response(Type.String());
    });

    const group = api._groups[0];
    expect(group._sources).toBeDefined();

    const kinds = group._sources!.map((s) => s.kind);
    expect(kinds).toContain("group");
    expect(kinds).toContain("tag");
    expect(kinds).toContain("security");

    // The route inside the group should also have sources
    const route = group.routes[0];
    expect(route._sources).toBeDefined();
    expect(route._sources!.some((s) => s.kind === "route")).toBe(true);
  });

  it("captures source entries on Api-level methods", () => {
    const api = new Api("3.1", "Test", { debug: true });
    api.server({ url: "https://api.example.com" });
    api.securityScheme("bearer", { type: "http", scheme: "bearer" });
    api.tag("pets");
    api.security("bearer");

    const kinds = api._sources.map((s) => s.kind);
    expect(kinds).toContain("api");
    expect(kinds).toContain("server");
    expect(kinds).toContain("securityScheme");
    expect(kinds).toContain("tag");
    expect(kinds).toContain("security");

    const schemeEntry = api._sources.find((s) => s.kind === "securityScheme");
    expect(schemeEntry!.detail).toBe("bearer");
  });

  it("does NOT capture source entries when debug is false", () => {
    const api = new Api("3.1", "Test");
    api.get("/pets").response(Type.String()).summary("List pets").tag("pets");

    const route = api._routes[0];
    expect(route._sources).toBeUndefined();
    expect(api._sources).toEqual([]);
  });

  it("captures config fields (query, params, body) from route config", () => {
    const api = new Api("3.1", "Test", { debug: true });
    api
      .get("/pets/:petId")
      .params(Type.Object({ petId: Type.String() }))
      .query(Type.Object({ fields: Type.Optional(Type.String()) }))
      .response(Type.String());

    const route = api._routes[0];
    const kinds = route._sources!.map((s) => s.kind);
    expect(kinds).toContain("route");
    expect(kinds).toContain("params");
    expect(kinds).toContain("query");
    expect(kinds).toContain("response");
  });

  it("captures error entries with status code detail", () => {
    const api = new Api("3.1", "Test", { debug: true });
    api
      .get("/pets")
      .response(Type.String())
      .error(404, Type.Object({ message: Type.String() }))
      .error(500, Type.Object({ message: Type.String() }));

    const route = api._routes[0];
    const errors = route._sources!.filter((s) => s.kind === "error");
    expect(errors).toHaveLength(2);
    expect(errors[0].detail).toBe("404");
    expect(errors[1].detail).toBe("500");
  });

  it("captures extension entries with key detail", () => {
    const api = new Api("3.1", "Test", { debug: true });
    api.get("/pets").response(Type.String()).extension("rate-limit", 100);

    const route = api._routes[0];
    const ext = route._sources!.find((s) => s.kind === "extension");
    expect(ext).toBeDefined();
    expect(ext!.detail).toBe("x-rate-limit");
  });
});

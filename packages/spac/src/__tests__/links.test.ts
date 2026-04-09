import { describe, it, expect } from "vitest";
import { Type } from "@sinclair/typebox";
import { Api, created } from "../index";

describe("links", () => {
  // -----------------------------------------------------------------------
  // Chained .link() on RouteBuilder
  // -----------------------------------------------------------------------

  describe(".link() chaining", () => {
    it("adds a link to the default 200 response", () => {
      const api = new Api("3.1", "Test");
      api
        .get("/pets/{petId}")
        .params(Type.Object({ petId: Type.String() }))
        .response(Type.Object({ id: Type.String(), name: Type.String() }))
        .operationId("getPet")
        .link("GetPetOwner", {
          operationId: "getOwner",
          parameters: { ownerId: "$response.body#/ownerId" },
        });

      const spec = api.emit() as any;
      const resp200 = spec.paths["/pets/{petId}"].get.responses["200"];
      expect(resp200.links).toEqual({
        GetPetOwner: {
          operationId: "getOwner",
          parameters: { ownerId: "$response.body#/ownerId" },
        },
      });
    });

    it("adds a link to a specific status code", () => {
      const api = new Api("3.1", "Test");
      const Pet = Type.Object({ id: Type.String() });
      api
        .post("/pets")
        .body(Type.Object({ name: Type.String() }))
        .respond(201, created(Pet))
        .operationId("createPet")
        .link(201, "GetPetById", {
          operationId: "getPet",
          parameters: { petId: "$response.body#/id" },
        });

      const spec = api.emit() as any;
      const resp201 = spec.paths["/pets"].post.responses["201"];
      expect(resp201.links).toEqual({
        GetPetById: {
          operationId: "getPet",
          parameters: { petId: "$response.body#/id" },
        },
      });
    });

    it("accumulates multiple links on the same response", () => {
      const api = new Api("3.1", "Test");
      api
        .get("/pets/{petId}")
        .params(Type.Object({ petId: Type.String() }))
        .response(Type.Object({ id: Type.String(), ownerId: Type.String() }))
        .operationId("getPet")
        .link("GetPetOwner", {
          operationId: "getOwner",
          parameters: { ownerId: "$response.body#/ownerId" },
        })
        .link("ListPetToys", {
          operationId: "listToys",
          parameters: { petId: "$request.path.petId" },
        });

      const spec = api.emit() as any;
      const links = spec.paths["/pets/{petId}"].get.responses["200"].links;
      expect(Object.keys(links)).toEqual(["GetPetOwner", "ListPetToys"]);
    });

    it("adds links on different status codes", () => {
      const api = new Api("3.1", "Test");
      api
        .post("/pets")
        .body(Type.Object({ name: Type.String() }))
        .respond(201, created(Type.Object({ id: Type.String() })))
        .respond(200, Type.Object({ id: Type.String() }))
        .link(201, "GetCreated", {
          operationId: "getPet",
          parameters: { petId: "$response.body#/id" },
        })
        .link(200, "GetExisting", {
          operationId: "getPet",
          parameters: { petId: "$response.body#/id" },
        });

      const spec = api.emit() as any;
      expect(
        spec.paths["/pets"].post.responses["201"].links.GetCreated,
      ).toBeDefined();
      expect(
        spec.paths["/pets"].post.responses["200"].links.GetExisting,
      ).toBeDefined();
    });

    it("creates a minimal response if linking to a status that has no response defined", () => {
      const api = new Api("3.1", "Test");
      api.get("/ping").link(200, "Self", { operationId: "ping" });

      const spec = api.emit() as any;
      // The 200 response was auto-created by the "no responses" fallback,
      // but since .link() runs before that, the link should be on a minimal object
      expect(spec.paths["/ping"].get.responses["200"].links.Self).toEqual({
        operationId: "ping",
      });
    });
  });

  // -----------------------------------------------------------------------
  // ResponseDef.links (config-based)
  // -----------------------------------------------------------------------

  describe("ResponseDef.links", () => {
    it("emits links from ResponseDef in the responses config", () => {
      const api = new Api("3.1", "Test");
      api
        .post("/pets")
        .body(Type.Object({ name: Type.String() }))
        .respond(201, {
          description: "Created",
          schema: Type.Object({ id: Type.String() }),
          links: {
            GetPetById: {
              operationId: "getPet",
              parameters: { petId: "$response.body#/id" },
            },
          },
        });

      const spec = api.emit() as any;
      const resp201 = spec.paths["/pets"].post.responses["201"];
      expect(resp201.description).toBe("Created");
      expect(resp201.links).toEqual({
        GetPetById: {
          operationId: "getPet",
          parameters: { petId: "$response.body#/id" },
        },
      });
    });

    it("emits links from ResponseDef in chained .respond()", () => {
      const api = new Api("3.1", "Test");
      api
        .post("/pets")
        .body(Type.Object({ name: Type.String() }))
        .respond(201, {
          description: "Created",
          schema: Type.Object({ id: Type.String() }),
          links: {
            GetPetById: {
              operationId: "getPet",
              parameters: { petId: "$response.body#/id" },
            },
          },
        });

      const spec = api.emit() as any;
      expect(spec.paths["/pets"].post.responses["201"].links).toEqual({
        GetPetById: {
          operationId: "getPet",
          parameters: { petId: "$response.body#/id" },
        },
      });
    });
  });

  // -----------------------------------------------------------------------
  // Link fields
  // -----------------------------------------------------------------------

  describe("link fields", () => {
    it("emits operationRef instead of operationId", () => {
      const api = new Api("3.1", "Test");
      api
        .get("/pets")
        .response(Type.Array(Type.Object({ id: Type.String() })))
        .link("GetFirstPet", {
          operationRef: "#/paths/~1pets~1{petId}/get",
          parameters: { petId: "$response.body#/0/id" },
        });

      const spec = api.emit() as any;
      expect(
        spec.paths["/pets"].get.responses["200"].links.GetFirstPet,
      ).toEqual({
        operationRef: "#/paths/~1pets~1{petId}/get",
        parameters: { petId: "$response.body#/0/id" },
      });
    });

    it("emits description on links", () => {
      const api = new Api("3.1", "Test");
      api
        .get("/pets/{petId}")
        .params(Type.Object({ petId: Type.String() }))
        .response(Type.Object({ id: Type.String() }))
        .link("GetPetOwner", {
          operationId: "getOwner",
          parameters: { ownerId: "$response.body#/ownerId" },
          description: "Fetch the owner of this pet",
        });

      const spec = api.emit() as any;
      expect(
        spec.paths["/pets/{petId}"].get.responses["200"].links.GetPetOwner
          .description,
      ).toBe("Fetch the owner of this pet");
    });

    it("emits requestBody on links", () => {
      const api = new Api("3.1", "Test");
      api
        .post("/subscribe")
        .body(Type.Object({ callbackUrl: Type.String() }))
        .response(Type.Object({ id: Type.String() }))
        .link("Unsubscribe", {
          operationId: "unsubscribe",
          requestBody: "$response.body#/id",
        });

      const spec = api.emit() as any;
      expect(
        spec.paths["/subscribe"].post.responses["200"].links.Unsubscribe
          .requestBody,
      ).toBe("$response.body#/id");
    });

    it("emits server on links", () => {
      const api = new Api("3.1", "Test");
      api
        .get("/pets")
        .response(Type.Array(Type.Object({ id: Type.String() })))
        .link("GetFromBackup", {
          operationId: "listPets",
          server: {
            url: "https://backup.example.com",
            description: "Backup server",
          },
        });

      const spec = api.emit() as any;
      expect(
        spec.paths["/pets"].get.responses["200"].links.GetFromBackup.server,
      ).toEqual({
        url: "https://backup.example.com",
        description: "Backup server",
      });
    });
  });

  // -----------------------------------------------------------------------
  // Merging chained .link() with ResponseDef.links
  // -----------------------------------------------------------------------

  describe("merging", () => {
    it("chained .link() merges with ResponseDef.links on the same status", () => {
      const api = new Api("3.1", "Test");
      api
        .post("/pets")
        .body(Type.Object({ name: Type.String() }))
        .respond(201, {
          description: "Created",
          schema: Type.Object({ id: Type.String(), ownerId: Type.String() }),
          links: {
            GetPetById: {
              operationId: "getPet",
              parameters: { petId: "$response.body#/id" },
            },
          },
        })
        .link(201, "GetPetOwner", {
          operationId: "getOwner",
          parameters: { ownerId: "$response.body#/ownerId" },
        });

      const spec = api.emit() as any;
      const links = spec.paths["/pets"].post.responses["201"].links;
      expect(links.GetPetById).toBeDefined();
      expect(links.GetPetOwner).toBeDefined();
    });
  });

  // -----------------------------------------------------------------------
  // Groups
  // -----------------------------------------------------------------------

  describe("within groups", () => {
    it("links work on routes defined inside groups", () => {
      const api = new Api("3.1", "Test");
      api.group("/pets", (g) => {
        g.get("/{petId}")
          .params(Type.Object({ petId: Type.String() }))
          .response(Type.Object({ id: Type.String() }))
          .operationId("getPet")
          .link("ListAllPets", { operationId: "listPets" });
      });

      const spec = api.emit() as any;
      expect(
        spec.paths["/pets/{petId}"].get.responses["200"].links.ListAllPets,
      ).toEqual({
        operationId: "listPets",
      });
    });
  });

  // -----------------------------------------------------------------------
  // Source mapping
  // -----------------------------------------------------------------------

  describe("source mapping", () => {
    it("captures source entries for .link() in debug mode", () => {
      const api = new Api("3.1", "Test", { debug: true });
      const route = api
        .get("/pets")
        .response(Type.Array(Type.Object({ id: Type.String() })))
        .link("GetPet", {
          operationId: "getPet",
          parameters: { petId: "$response.body#/0/id" },
        });

      const sources = route._node._sources!;
      const linkSource = sources.find((s) => s.kind === "link");
      expect(linkSource).toBeDefined();
      expect(linkSource!.detail).toBe("GetPet");
    });
  });
});

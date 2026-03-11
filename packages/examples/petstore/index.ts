import { Type } from "@sinclair/typebox";
import { Api, created, envelope, errorSchema, macro, named, noContent, paginated } from "spac";

// =============================================================================
// Schemas
// =============================================================================

const Category = named(
  "Category",
  Type.Object({
    id: Type.Integer(),
    name: Type.String(),
  }),
);

const Tag = named(
  "Tag",
  Type.Object({
    id: Type.Integer(),
    name: Type.String(),
  }),
);

const Pet = named(
  "Pet",
  Type.Object({
    id: Type.Integer(),
    name: Type.String(),
    status: Type.Union([Type.Literal("available"), Type.Literal("pending"), Type.Literal("sold")]),
    category: Type.Optional(Category),
    tags: Type.Optional(Type.Array(Tag)),
    photoUrls: Type.Array(Type.String({ format: "uri" })),
  }),
);

const CreatePet = named(
  "CreatePet",
  Type.Object({
    name: Type.String({ minLength: 1 }),
    status: Type.Optional(Type.Union([Type.Literal("available"), Type.Literal("pending"), Type.Literal("sold")])),
    categoryId: Type.Optional(Type.Integer()),
    tagIds: Type.Optional(Type.Array(Type.Integer())),
    photoUrls: Type.Array(Type.String({ format: "uri" })),
  }),
);

const UpdatePet = named(
  "UpdatePet",
  Type.Object({
    name: Type.Optional(Type.String({ minLength: 1 })),
    status: Type.Optional(Type.Union([Type.Literal("available"), Type.Literal("pending"), Type.Literal("sold")])),
    categoryId: Type.Optional(Type.Integer()),
    tagIds: Type.Optional(Type.Array(Type.Integer())),
    photoUrls: Type.Optional(Type.Array(Type.String({ format: "uri" }))),
  }),
);

const Order = named(
  "Order",
  Type.Object({
    id: Type.Integer(),
    petId: Type.Integer(),
    quantity: Type.Integer({ minimum: 1 }),
    shipDate: Type.Optional(Type.String({ format: "date-time" })),
    status: Type.Union([Type.Literal("placed"), Type.Literal("approved"), Type.Literal("delivered")]),
    complete: Type.Boolean(),
  }),
);

const CreateOrder = named(
  "CreateOrder",
  Type.Object({
    petId: Type.Integer(),
    quantity: Type.Integer({ minimum: 1 }),
    shipDate: Type.Optional(Type.String({ format: "date-time" })),
  }),
);

const User = named(
  "User",
  Type.Object({
    id: Type.Integer(),
    username: Type.String(),
    firstName: Type.Optional(Type.String()),
    lastName: Type.Optional(Type.String()),
    email: Type.String({ format: "email" }),
    phone: Type.Optional(Type.String()),
    userStatus: Type.Optional(Type.Integer()),
  }),
);

const CreateUser = named(
  "CreateUser",
  Type.Object({
    username: Type.String({ minLength: 3 }),
    firstName: Type.Optional(Type.String()),
    lastName: Type.Optional(Type.String()),
    email: Type.String({ format: "email" }),
    password: Type.String({ minLength: 8 }),
    phone: Type.Optional(Type.String()),
  }),
);

const LoginResponse = named(
  "LoginResponse",
  Type.Object({
    token: Type.String(),
    expiresIn: Type.Integer(),
  }),
);

const InventoryResponse = named(
  "InventoryResponse",
  Type.Object({
    available: Type.Integer(),
    pending: Type.Integer(),
    sold: Type.Integer(),
  }),
);

const Error = errorSchema();

const DetailedError = errorSchema({
  details: Type.Array(
    Type.Object({
      field: Type.String(),
      issue: Type.String(),
    }),
  ),
});

// =============================================================================
// Macros
// =============================================================================

// Route macro: adds auth + standard error responses
const authenticated = macro.route((r) => r.security("bearerAuth").error(401, Error).error(403, Error));

// Route macro: adds validation error
const validated = macro.route((r) => r.error(422, DetailedError));

// Group macro: admin section setup
const adminSection = macro.group((g) => g.tag("admin").security({ bearerAuth: ["admin"] }));

// Api macro: adds common servers
const withServers = macro.api((a) =>
  a
    .server({
      url: "https://petstore.example.com/v1",
      description: "Production",
    })
    .server({
      url: "https://staging-petstore.example.com/v1",
      description: "Staging",
    })
    .server({
      url: "http://localhost:{port}/v1",
      description: "Local development",
      variables: {
        port: {
          default: "3000",
          enum: ["3000", "3001", "8080"],
          description: "Server port",
        },
      },
    }),
);

// =============================================================================
// API Definition
// =============================================================================

const api = new Api("Petstore", {
  version: "1.0.0",
  description:
    "A classic Pet Store API demonstrating all spac features: groups, " +
    "named schemas, security, macros, helpers, extensions, and more.",
  termsOfService: "https://petstore.example.com/terms",
  contact: {
    name: "Pet Store Support",
    url: "https://petstore.example.com/support",
    email: "support@petstore.example.com",
  },
  license: {
    name: "Apache 2.0",
    url: "https://www.apache.org/licenses/LICENSE-2.0",
  },
});

// Apply api-level macro
api.use(withServers);

// Register named schemas
api.schema("Category", Category);
api.schema("Tag", Tag);
api.schema("Pet", Pet);
api.schema("CreatePet", CreatePet);
api.schema("UpdatePet", UpdatePet);
api.schema("Order", Order);
api.schema("CreateOrder", CreateOrder);
api.schema("User", User);
api.schema("CreateUser", CreateUser);
api.schema("LoginResponse", LoginResponse);
api.schema("InventoryResponse", InventoryResponse);

// Security schemes
api.securityScheme("bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
  description: "JWT bearer token",
});

api.securityScheme("apiKey", {
  type: "apiKey",
  name: "X-API-Key",
  in: "header",
  description: "API key for external integrations",
});

api.securityScheme("oauth2", {
  type: "oauth2",
  description: "OAuth2 for third-party apps",
  flows: {
    authorizationCode: {
      authorizationUrl: "https://petstore.example.com/oauth/authorize",
      tokenUrl: "https://petstore.example.com/oauth/token",
      refreshUrl: "https://petstore.example.com/oauth/refresh",
      scopes: {
        "read:pets": "Read pets",
        "write:pets": "Create and update pets",
        "read:orders": "Read orders",
        "write:orders": "Place orders",
        admin: "Full admin access",
      },
    },
  },
});

// Global tags with descriptions
api.tag({
  name: "pets",
  description: "Everything about your pets",
  externalDocs: {
    url: "https://petstore.example.com/docs/pets",
    description: "Pet management guide",
  },
});
api.tag({ name: "store", description: "Access to pet store orders" });
api.tag({ name: "users", description: "Operations about users" });
api.tag({ name: "admin", description: "Admin-only operations" });

// =============================================================================
// Pet Routes
// =============================================================================

api.group("/pets", (g) => {
  g.tag("pets");

  // List pets — paginated, filterable
  g.get("/", {
    query: Type.Object({
      status: Type.Optional(Type.Union([Type.Literal("available"), Type.Literal("pending"), Type.Literal("sold")])),
      category: Type.Optional(Type.String()),
      tags: Type.Optional(Type.Array(Type.String())),
      page: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
      pageSize: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 20 })),
    }),
    response: paginated(Pet),
  })
    .summary("List all pets")
    .description("Returns a paginated list of pets with optional filters.")
    .operationId("listPets");

  // Get single pet
  g.get("/:petId", {
    params: Type.Object({ petId: Type.Integer() }),
    response: envelope(Pet),
  })
    .summary("Get a pet by ID")
    .operationId("getPet")
    .error(404, Error);

  // Create pet (authenticated + validated)
  g.post("/", {
    body: CreatePet,
    responses: {
      201: created(Pet),
    },
  })
    .summary("Add a new pet")
    .operationId("createPet")
    .use(authenticated)
    .use(validated);

  // Update pet
  g.put("/:petId", {
    params: Type.Object({ petId: Type.Integer() }),
    body: UpdatePet,
    response: Pet,
  })
    .summary("Update a pet")
    .operationId("updatePet")
    .use(authenticated)
    .use(validated)
    .error(404, Error);

  // Partial update
  g.patch("/:petId", {
    params: Type.Object({ petId: Type.Integer() }),
    body: UpdatePet,
    response: Pet,
  })
    .summary("Partially update a pet")
    .operationId("patchPet")
    .use(authenticated);

  // Delete pet
  g.delete("/:petId", {
    params: Type.Object({ petId: Type.Integer() }),
    responses: {
      204: noContent(),
    },
  })
    .summary("Delete a pet")
    .operationId("deletePet")
    .use(authenticated)
    .error(404, Error);

  // Find by status (explicit response with custom header)
  g.get("/findByStatus", {
    query: Type.Object({
      status: Type.Union([Type.Literal("available"), Type.Literal("pending"), Type.Literal("sold")]),
    }),
    responses: {
      200: {
        description: "Pets matching the status filter",
        schema: Type.Array(Pet),
        headers: {
          "X-Total-Count": Type.Integer(),
        },
      },
    },
  })
    .summary("Find pets by status")
    .operationId("findPetsByStatus");

  // Find by tags
  g.get("/findByTags", {
    query: Type.Object({
      tags: Type.Array(Type.String()),
    }),
    response: Type.Array(Pet),
  })
    .summary("Find pets by tags")
    .operationId("findPetsByTags")
    .deprecated();

  // Upload image (custom content type)
  g.post("/:petId/image", {
    params: Type.Object({ petId: Type.Integer() }),
    headers: Type.Object({
      "Content-Length": Type.Integer(),
    }),
    responses: {
      200: {
        description: "Upload result",
        schema: Type.Object({
          url: Type.String({ format: "uri" }),
          size: Type.Integer(),
        }),
      },
    },
  })
    .summary("Upload pet image")
    .operationId("uploadPetImage")
    .use(authenticated)
    .extension("x-codegen-request-body-name", "file");

  // Head request (check pet existence)
  g.head("/:petId", {
    params: Type.Object({ petId: Type.Integer() }),
    responses: {
      200: noContent("Pet exists"),
      404: noContent("Pet not found"),
    },
  })
    .summary("Check if pet exists")
    .operationId("petExists");
});

// =============================================================================
// Store Routes
// =============================================================================

api.group("/store", (g) => {
  g.tag("store");

  // Inventory
  g.get("/inventory", {
    response: InventoryResponse,
  })
    .summary("Returns pet inventories by status")
    .operationId("getInventory")
    .security("apiKey");

  // Place order
  g.post("/orders", {
    body: CreateOrder,
    responses: {
      201: created(Order),
    },
  })
    .summary("Place an order for a pet")
    .operationId("placeOrder")
    .use(authenticated)
    .use(validated);

  // Get order
  g.get("/orders/:orderId", {
    params: Type.Object({ orderId: Type.Integer() }),
    response: Order,
  })
    .summary("Find purchase order by ID")
    .operationId("getOrder")
    .use(authenticated)
    .error(404, Error);

  // Delete order
  g.delete("/orders/:orderId", {
    params: Type.Object({ orderId: Type.Integer() }),
    responses: {
      204: noContent(),
    },
  })
    .summary("Delete purchase order by ID")
    .operationId("deleteOrder")
    .use(authenticated)
    .error(404, Error);

  // Nested group: admin store operations
  g.group("/admin", (admin) => {
    admin.use(adminSection);

    admin
      .get("/stats", {
        response: Type.Object({
          totalOrders: Type.Integer(),
          totalRevenue: Type.Number(),
          averageOrderValue: Type.Number(),
          topSellingPets: Type.Array(
            Type.Object({
              petId: Type.Integer(),
              name: Type.String(),
              orderCount: Type.Integer(),
            }),
          ),
        }),
      })
      .summary("Store statistics")
      .operationId("getStoreStats")
      .extension("x-internal", true);

    admin
      .delete("/orders", {
        query: Type.Object({
          before: Type.String({ format: "date-time" }),
        }),
        responses: {
          200: {
            description: "Purge result",
            schema: Type.Object({ deleted: Type.Integer() }),
          },
        },
      })
      .summary("Purge old orders")
      .operationId("purgeOrders");
  });
});

// =============================================================================
// User Routes
// =============================================================================

api.group("/users", (g) => {
  g.tag("users");

  // Register
  g.post("/", {
    body: CreateUser,
    responses: {
      201: created(User),
    },
  })
    .summary("Create a new user")
    .operationId("createUser")
    .use(validated);

  // Batch create
  g.post("/batch", {
    body: Type.Array(CreateUser),
    responses: {
      201: created(Type.Array(User)),
    },
  })
    .summary("Create multiple users")
    .operationId("createUsersFromList")
    .use(authenticated)
    .use(validated);

  // Login
  g.post("/login", {
    body: Type.Object({
      username: Type.String(),
      password: Type.String(),
    }),
    responses: {
      200: {
        description: "Login successful",
        schema: LoginResponse,
        headers: {
          "X-Rate-Limit": Type.Integer({ description: "Calls per hour allowed" }),
          "X-Expires-After": Type.String({
            format: "date-time",
            description: "Token expiration time",
          }),
        },
      },
      401: {
        description: "Invalid credentials",
        schema: Error,
      },
    },
  })
    .summary("Log in a user")
    .operationId("loginUser");

  // Logout
  g.post("/logout", {
    responses: {
      204: noContent("Logged out"),
    },
  })
    .summary("Log out the current user")
    .operationId("logoutUser")
    .use(authenticated);

  // Get user by username
  g.get("/:username", {
    params: Type.Object({ username: Type.String() }),
    response: User,
  })
    .summary("Get user by username")
    .operationId("getUserByName")
    .error(404, Error);

  // Update user
  g.put("/:username", {
    params: Type.Object({ username: Type.String() }),
    body: CreateUser,
    response: User,
  })
    .summary("Update user")
    .operationId("updateUser")
    .use(authenticated)
    .use(validated)
    .error(404, Error);

  // Delete user
  g.delete("/:username", {
    params: Type.Object({ username: Type.String() }),
    responses: {
      204: noContent(),
    },
  })
    .summary("Delete user")
    .operationId("deleteUser")
    .use(authenticated)
    .error(404, Error);
});

// =============================================================================
// Top-level routes (no group)
// =============================================================================

// Health check — no auth, no tags
api
  .get("/health", {
    response: Type.Object({
      status: Type.Literal("ok"),
      uptime: Type.Number(),
      version: Type.String(),
    }),
  })
  .summary("Health check")
  .operationId("healthCheck")
  .server({ url: "http://localhost:3000", description: "Health check only on local" });

// OPTIONS for CORS preflight
api
  .options("/pets", {
    responses: {
      204: noContent("CORS preflight"),
    },
  })
  .summary("CORS preflight for /pets")
  .extension("x-internal", true);

// =============================================================================
// Emit & Output
// =============================================================================

const spec = api.emit();
console.log(JSON.stringify(spec, null, 2));

export { api };

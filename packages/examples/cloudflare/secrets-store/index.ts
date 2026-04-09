import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  SecretsStoreApiResponseCommonFailure,
  SecretsStoreCreatesecretobject,
  SecretsStoreCreatestoreobject,
  SecretsStoreDuplicatesecretobject,
  SecretsStoreIdentifier,
  SecretsStorePatchsecretobject,
  SecretsStoreQuotaResponse,
  SecretsStoreScopes,
  SecretsStoreSecretResponse,
  SecretsStoreSecretsResponseCollection,
  SecretsStoreStoreIdentifier,
  SecretsStoreStoreResponse,
  SecretsStoreStoresResponseCollection,
} from "./schemas"

export function registerSecretsStore(api: Api) {
  api.group("/accounts/{account_id}/secrets_store", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/quota", {
      responses: {
        200: SecretsStoreQuotaResponse,
        "4XX": SecretsStoreApiResponseCommonFailure,
      },
    })
      .summary("View secret usage")
      .description("Lists the number of secrets used in the account.")
      .operationId("secrets-store-quota")
      .tag("Secrets Store")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Secrets Store Write", "Secrets Store Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#com.cloudflare.api.account.secrets-store.secret.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/stores", {
      query: Type.Object({
        direction: Type.Optional(Type.Union([Type.Literal("asc"), Type.Literal("desc")])),
        page: Type.Optional(Type.Integer({ minimum: 0, multipleOf: 1 })),
        per_page: Type.Optional(Type.Integer({ minimum: 0, maximum: 100, multipleOf: 1 })),
        order: Type.Optional(
          Type.Union([
            Type.Literal("name"),
            Type.Literal("comment"),
            Type.Literal("created"),
            Type.Literal("modified"),
            Type.Literal("status"),
          ]),
        ),
      }),
      responses: {
        200: SecretsStoreStoresResponseCollection,
        "4XX": SecretsStoreApiResponseCommonFailure,
      },
    })
      .summary("List account stores")
      .description("Lists all the stores in an account")
      .operationId("secrets-store-list")
      .tag("Secrets Store")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Secrets Store Write", "Secrets Store Read"])
      .extension("x-cfPermissionsRequired", {
        enum: [
          "#com.cloudflare.api.account.secrets-store.secret.list",
          "#com.cloudflare.api.account.secrets-store.secret.read",
        ],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/stores", {
      body: Type.Array(SecretsStoreCreatestoreobject),
      responses: {
        200: SecretsStoreStoresResponseCollection,
        "4XX": SecretsStoreApiResponseCommonFailure,
      },
    })
      .summary("Create a store")
      .description("Creates a store in the account")
      .operationId("secrets-store-create")
      .tag("Secrets Store")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Secrets Store Write"])
      .extension("x-cfPermissionsRequired", {
        enum: [
          "#com.cloudflare.api.account.secrets-store.secret.read",
          "#com.cloudflare.api.account.secrets-store.secret.create",
        ],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/stores/{store_id}", {
      params: Type.Object({ store_id: SecretsStoreStoreIdentifier }),
      responses: {
        200: SecretsStoreStoreResponse,
        "4XX": SecretsStoreApiResponseCommonFailure,
      },
    })
      .summary("Delete a store")
      .description("Deletes a single store")
      .operationId("secrets-store-delete-by-id")
      .tag("Secrets Store")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Secrets Store Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/stores/{store_id}/secrets", {
      params: Type.Object({ store_id: SecretsStoreStoreIdentifier }),
      query: Type.Object({
        direction: Type.Optional(Type.Union([Type.Literal("asc"), Type.Literal("desc")])),
        page: Type.Optional(Type.Integer({ minimum: 0, multipleOf: 1 })),
        per_page: Type.Optional(Type.Integer({ minimum: 0, maximum: 100, multipleOf: 1 })),
        search: Type.Optional(Type.String()),
        order: Type.Optional(
          Type.Union([
            Type.Literal("name"),
            Type.Literal("comment"),
            Type.Literal("created"),
            Type.Literal("modified"),
            Type.Literal("status"),
          ]),
        ),
        scopes: Type.Optional(Type.Array(SecretsStoreScopes)),
      }),
      responses: {
        200: SecretsStoreSecretsResponseCollection,
        "4XX": SecretsStoreApiResponseCommonFailure,
      },
    })
      .summary("List store secrets")
      .description("Lists all store secrets")
      .operationId("secrets-store-secrets-list")
      .tag("Secrets Store")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Secrets Store Write", "Secrets Store Read"])
      .extension("x-cfPermissionsRequired", {
        enum: [
          "#com.cloudflare.api.account.secrets-store.secret.list",
          "#com.cloudflare.api.account.secrets-store.secret.read",
        ],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/stores/{store_id}/secrets", {
      params: Type.Object({ store_id: SecretsStoreStoreIdentifier }),
      body: Type.Array(SecretsStoreCreatesecretobject),
      responses: {
        200: SecretsStoreSecretsResponseCollection,
        "4XX": SecretsStoreApiResponseCommonFailure,
      },
    })
      .summary("Create a secret")
      .description("Creates a secret in the account")
      .operationId("secrets-store-secret-create")
      .tag("Secrets Store")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Secrets Store Write"])
      .extension("x-cfPermissionsRequired", {
        enum: [
          "#com.cloudflare.api.account.secrets-store.secret.read",
          "#com.cloudflare.api.account.secrets-store.secret.create",
        ],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/stores/{store_id}/secrets", {
      params: Type.Object({ store_id: SecretsStoreStoreIdentifier }),
      responses: {
        200: SecretsStoreSecretsResponseCollection,
        "4XX": SecretsStoreApiResponseCommonFailure,
      },
    })
      .summary("Delete secrets")
      .description("Deletes one or more secrets")
      .operationId("secrets-store-delete-bulk")
      .tag("Secrets Store")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Secrets Store Write"])
      .extension("x-cfPermissionsRequired", {
        enum: [
          "#com.cloudflare.api.account.secrets-store.secret.read",
          "#com.cloudflare.api.account.secrets-store.secret.delete",
        ],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/stores/{store_id}/secrets/{secret_id}", {
      params: Type.Object({ store_id: SecretsStoreStoreIdentifier, secret_id: SecretsStoreIdentifier }),
      responses: {
        200: SecretsStoreSecretResponse,
        "4XX": SecretsStoreApiResponseCommonFailure,
      },
    })
      .summary("Get a secret by ID")
      .description("Returns details of a single secret")
      .operationId("secrets-store-get-by-id")
      .tag("Secrets Store")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Secrets Store Write", "Secrets Store Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#com.cloudflare.api.account.secrets-store.secret.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/stores/{store_id}/secrets/{secret_id}", {
      params: Type.Object({ store_id: SecretsStoreStoreIdentifier, secret_id: SecretsStoreIdentifier }),
      body: SecretsStorePatchsecretobject,
      responses: {
        200: SecretsStoreSecretResponse,
        "4XX": SecretsStoreApiResponseCommonFailure,
      },
    })
      .summary("Patch a secret")
      .description("Updates a single secret")
      .operationId("secrets-store-patch-by-id")
      .tag("Secrets Store")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Secrets Store Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#com.cloudflare.api.account.secrets-store.secret.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/stores/{store_id}/secrets/{secret_id}", {
      params: Type.Object({ store_id: SecretsStoreStoreIdentifier, secret_id: SecretsStoreIdentifier }),
      responses: {
        200: SecretsStoreSecretResponse,
        "4XX": SecretsStoreApiResponseCommonFailure,
      },
    })
      .summary("Delete a secret")
      .description("Deletes a single secret")
      .operationId("secrets-store-secret-delete-by-id")
      .tag("Secrets Store")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Secrets Store Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#com.cloudflare.api.account.secrets-store.secret.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/stores/{store_id}/secrets/{secret_id}/duplicate", {
      params: Type.Object({ store_id: SecretsStoreStoreIdentifier, secret_id: SecretsStoreIdentifier }),
      body: SecretsStoreDuplicatesecretobject,
      responses: {
        200: SecretsStoreSecretResponse,
        "4XX": SecretsStoreApiResponseCommonFailure,
      },
    })
      .summary("Duplicate Secret")
      .description("Duplicates the secret, keeping the value")
      .operationId("secrets-store-duplicate-by-id")
      .tag("Secrets Store")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Secrets Store Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#com.cloudflare.api.account.secrets-store.secret.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

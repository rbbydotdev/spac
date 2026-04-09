import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  IamApiResponseCommonFailure,
  IamApiResponseSingleId,
  IamCollectionTokensResponse,
  IamCreatePayload,
  IamPermissionsGroupResponseCollection,
  IamResponseSingleValue,
  IamSingleTokenCreateResponse,
  IamSingleTokenResponse,
  IamTokenBody,
  IamTokenIdentifier,
  IamTokenVerifyResponseSingleSegment,
} from "../shared/schemas"

export function registerTokens(api: Api) {
  api.group("/accounts/{account_id}/tokens", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Maximum number of results per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Direction to order results." }),
        ),
      }),
      responses: {
        200: IamCollectionTokensResponse,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("List Tokens")
      .description("List all Account Owned API tokens created for this account.")
      .operationId("account-api-tokens-list-tokens")
      .tag("Account Owned API Tokens")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Account API Tokens Write", "Account API Tokens Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.token.list"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/", {
      body: IamCreatePayload,
      responses: {
        200: IamSingleTokenCreateResponse,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Create Token")
      .description("Create a new Account Owned API token.")
      .operationId("account-api-tokens-create-token")
      .tag("Account Owned API Tokens")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Account API Tokens Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.token.create"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/permission_groups", {
      query: Type.Object({
        name: Type.Optional(Type.String()),
        scope: Type.Optional(Type.String()),
      }),
      responses: {
        200: IamPermissionsGroupResponseCollection,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("List Permission Groups")
      .description("Find all available permission groups for Account Owned API Tokens")
      .operationId("account-api-tokens-list-permission-groups")
      .tag("Account Owned API Tokens")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Account API Tokens Write", "Account API Tokens Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.token.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/verify", {
      responses: {
        200: IamTokenVerifyResponseSingleSegment,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Verify Token")
      .description("Test whether a token works.")
      .operationId("account-api-tokens-verify-token")
      .tag("Account Owned API Tokens")
      .security({ api_token: [] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{token_id}", {
      params: Type.Object({ token_id: IamTokenIdentifier }),
      responses: {
        200: IamSingleTokenResponse,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Token Details")
      .description("Get information about a specific Account Owned API token.")
      .operationId("account-api-tokens-token-details")
      .tag("Account Owned API Tokens")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Account API Tokens Write", "Account API Tokens Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.token.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/{token_id}", {
      params: Type.Object({ token_id: IamTokenIdentifier }),
      body: IamTokenBody,
      responses: {
        200: IamSingleTokenResponse,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Update Token")
      .description("Update an existing token.")
      .operationId("account-api-tokens-update-token")
      .tag("Account Owned API Tokens")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Account API Tokens Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.token.update"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{token_id}", {
      params: Type.Object({ token_id: IamTokenIdentifier }),
      responses: {
        200: IamApiResponseSingleId,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Delete Token")
      .description("Destroy an Account Owned API token.")
      .operationId("account-api-tokens-delete-token")
      .tag("Account Owned API Tokens")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Account API Tokens Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.token.delete"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/{token_id}/value", {
      params: Type.Object({ token_id: IamTokenIdentifier }),
      body: Type.Unknown(),
      responses: {
        200: IamResponseSingleValue,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Roll Token")
      .description("Roll the Account Owned API token secret.")
      .operationId("account-api-tokens-roll-token")
      .tag("Account Owned API Tokens")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Account API Tokens Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.token.update"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

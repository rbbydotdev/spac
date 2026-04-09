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
  api.assertVersion("3.0.3", "Tokens")

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
    })
      .response(IamCollectionTokensResponse)
      .error("4XX", IamApiResponseCommonFailure)
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
    })
      .response(IamSingleTokenCreateResponse)
      .error("4XX", IamApiResponseCommonFailure)
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
    })
      .response(IamPermissionsGroupResponseCollection)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("List Permission Groups")
      .description("Find all available permission groups for Account Owned API Tokens")
      .operationId("account-api-tokens-list-permission-groups")
      .tag("Account Owned API Tokens")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Account API Tokens Write", "Account API Tokens Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.token.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/verify", {})
      .response(IamTokenVerifyResponseSingleSegment)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Verify Token")
      .description("Test whether a token works.")
      .operationId("account-api-tokens-verify-token")
      .tag("Account Owned API Tokens")
      .security({ api_token: [] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{token_id}", {
      params: Type.Object({ token_id: IamTokenIdentifier }),
    })
      .response(IamSingleTokenResponse)
      .error("4XX", IamApiResponseCommonFailure)
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
    })
      .response(IamSingleTokenResponse)
      .error("4XX", IamApiResponseCommonFailure)
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
    })
      .response(IamApiResponseSingleId)
      .error("4XX", IamApiResponseCommonFailure)
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
    })
      .response(IamResponseSingleValue)
      .error("4XX", IamApiResponseCommonFailure)
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

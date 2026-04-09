import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  BillSubsApiSchemasIdentifier,
  BillSubsApiSubscriptionV2,
  BillSubsApiUserSubscriptionResponseCollection,
  BillSubsApiZoneSubscriptionResponseSingle,
  D1Messages,
  IamResultInfo,
} from "../shared/schemas"

export function registerSubscriptions(api: Api) {
  api.group("/accounts/{account_id}/subscriptions", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      responses: {
        200: BillSubsApiUserSubscriptionResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result_info: Type.Optional(IamResultInfo),
        }),
      },
    })
      .summary("List Subscriptions")
      .description("Lists all of an account's subscriptions.")
      .operationId("account-subscriptions-list-subscriptions")
      .tag("Account Subscriptions")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Billing Write", "Billing Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#billing:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/", {
      body: BillSubsApiSubscriptionV2,
      responses: {
        200: BillSubsApiZoneSubscriptionResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Create Subscription")
      .description("Creates an account subscription.")
      .operationId("account-subscriptions-create-subscription")
      .tag("Account Subscriptions")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Billing Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#billing:read", "#billing:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/{subscription_identifier}", {
      params: Type.Object({ subscription_identifier: BillSubsApiSchemasIdentifier }),
      body: BillSubsApiSubscriptionV2,
      responses: {
        200: BillSubsApiZoneSubscriptionResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Update Subscription")
      .description("Updates an account subscription.")
      .operationId("account-subscriptions-update-subscription")
      .tag("Account Subscriptions")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Billing Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#billing:read", "#billing:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{subscription_identifier}", {
      params: Type.Object({ subscription_identifier: BillSubsApiSchemasIdentifier }),
      responses: {
        200: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Object({
            subscription_id: Type.Optional(BillSubsApiSchemasIdentifier),
          }),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Delete Subscription")
      .description("Deletes an account's subscription.")
      .operationId("account-subscriptions-delete-subscription")
      .tag("Account Subscriptions")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Billing Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#billing:edit"] })
  })
}

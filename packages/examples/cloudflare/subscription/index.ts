import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { BillSubsApiSubscriptionV2, BillSubsApiZoneSubscriptionResponseSingle, D1Messages } from "../shared/schemas"

export function registerSubscription(api: Api) {
  api.group("/zones/{zone_id}/subscription", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
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
      .summary("Zone Subscription Details")
      .description("Lists zone subscription details.")
      .operationId("zone-subscription-zone-subscription-details")
      .tag("Zone Subscription")
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
      .summary("Create Zone Subscription")
      .description("Create a zone subscription, either plan or add-ons.")
      .operationId("zone-subscription-create-zone-subscription")
      .tag("Zone Subscription")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Billing Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#billing:read", "#billing:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/", {
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
      .summary("Update Zone Subscription")
      .description("Updates zone subscriptions, either plan or add-ons.")
      .operationId("zone-subscription-update-zone-subscription")
      .tag("Zone Subscription")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Billing Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#billing:read", "#billing:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

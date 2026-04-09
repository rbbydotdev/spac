import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages, IamResultInfo, PageShieldId } from "../shared/schemas"
import { BillSubsApiAvailableRatePlan } from "./schemas"

export function registerAvailablePlans(api: Api) {
  api.assertVersion("3.0.3", "AvailablePlans")

  api.group("/zones/{zone_id}/available_plans", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Array(BillSubsApiAvailableRatePlan), Type.Null()]),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
          result_info: Type.Optional(IamResultInfo),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result_info: Type.Optional(IamResultInfo),
        }),
      )
      .summary("List Available Plans")
      .description("Lists available plans the zone can subscribe to.")
      .operationId("zone-rate-plan-list-available-plans")
      .tag("Zone Rate Plan")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Billing Write", "Billing Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#billing:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{plan_identifier}", {
      params: Type.Object({ plan_identifier: PageShieldId }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: BillSubsApiAvailableRatePlan,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Available Plan Details")
      .description("Details of the available plan that the zone can subscribe to.")
      .operationId("zone-rate-plan-available-plan-details")
      .tag("Zone Rate Plan")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Billing Write", "Billing Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#billing:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

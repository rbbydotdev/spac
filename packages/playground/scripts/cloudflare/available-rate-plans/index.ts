import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages, IamResultInfo, PageShieldId } from "../shared/schemas"
import { BillSubsApiPlanResponseCollection } from "./schemas"

export function registerAvailableRatePlans(api: Api) {
  api.assertVersion("3.0.3", "AvailableRatePlans")

  api
    .get("/zones/{zone_id}/available_rate_plans", {
      params: Type.Object({ zone_id: PageShieldId }),
    })
    .response(BillSubsApiPlanResponseCollection)
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
    .summary("List Available Rate Plans")
    .description("Lists all rate plans the zone can subscribe to.")
    .operationId("zone-rate-plan-list-available-rate-plans")
    .tag("Zone Rate Plan")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Billing Write", "Billing Read"])
    .extension("x-cfPermissionsRequired", { enum: ["#billing:read"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
}

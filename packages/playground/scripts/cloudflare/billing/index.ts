import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { BillSubsApiBillingResponseSingle, D1Messages, PageShieldId } from "../shared/schemas"

export function registerBilling(api: Api) {
  api.assertVersion("3.0.3", "Billing")

  api
    .get("/accounts/{account_id}/billing/profile", {
      params: Type.Object({ account_id: PageShieldId }),
    })
    .response(BillSubsApiBillingResponseSingle)
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
    .summary("Billing Profile Details")
    .description("Gets the current billing profile for the account.")
    .operationId("account-billing-profile-(-deprecated)-billing-profile-details")
    .tag("Account Billing Profile")
    .deprecated()
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Billing Write", "Billing Read"])
    .extension("x-cfPermissionsRequired", { enum: ["#billing:read"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
}

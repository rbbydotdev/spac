import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"
import { TlsCertificatesAndHostnamesDcvDelegationResponse } from "./schemas"

export function registerDcvDelegation(api: Api) {
  api.assertVersion("3.0.3", "DcvDelegation")

  api
    .get("/zones/{zone_id}/dcv_delegation/uuid", {
      params: Type.Object({ zone_id: DlsIdentifier }),
    })
    .response(TlsCertificatesAndHostnamesDcvDelegationResponse)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("Retrieve the DCV Delegation unique identifier.")
    .description(
      "Retrieve the account and zone specific unique identifier used as part of the CNAME target for DCV Delegation.",
    )
    .operationId("dcv-delegation-uuid-get")
    .tag("DCV Delegation")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
}

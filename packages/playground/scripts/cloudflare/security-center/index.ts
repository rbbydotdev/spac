import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, SecurityCenterApiResponseCommonFailure, SecurityCenterApiResponseSingle } from "../shared/schemas"
import { SecurityCenterSecuritytxt } from "./schemas"

export function registerSecurityCenter(api: Api) {
  api.assertVersion("3.0.3", "SecurityCenter")

  api.group(
    "/zones/{zone_id}/security-center/securitytxt",
    { params: Type.Object({ zone_id: Type.String() }) },
    (g) => {
      g.get("/", {})
        .response(
          Type.Object({
            errors: DlpMessages,
            messages: DlpMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(SecurityCenterSecuritytxt),
          }),
        )
        .error("4XX", SecurityCenterApiResponseCommonFailure)
        .summary("Get security.txt")
        .operationId("get-security-txt")
        .tag("security.txt")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])

      g.put("/", {
        body: SecurityCenterSecuritytxt,
      })
        .response(SecurityCenterApiResponseSingle)
        .error("4XX", SecurityCenterApiResponseCommonFailure)
        .summary("Update security.txt")
        .operationId("update-security-txt")
        .tag("security.txt")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Zone Settings Write"])

      g.delete("/", {})
        .response(SecurityCenterApiResponseSingle)
        .error("4XX", SecurityCenterApiResponseCommonFailure)
        .summary("Delete security.txt")
        .operationId("delete-security-txt")
        .tag("security.txt")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Zone Settings Write"])
    },
  )
}

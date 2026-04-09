import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { EmailSecurityMessage, OrganizationsApiProfile, OrganizationsApiV4errorresponse } from "../shared/schemas"

export function registerProfile(api: Api) {
  api.group("/accounts/{account_id}/profile", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      responses: {
        200: Type.Object({
          errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
          messages: Type.Array(EmailSecurityMessage),
          result: OrganizationsApiProfile,
          success: Type.Union([Type.Literal(true)]),
        }),
        "4XX": OrganizationsApiV4errorresponse,
      },
    })
      .summary("Get account profile")
      .operationId("Accounts_getAccountProfile")
      .tag("Accounts")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Trust and Safety Write",
        "Trust and Safety Read",
        "DNS View Write",
        "DNS View Read",
        "SCIM Provisioning",
        "Load Balancers Account Write",
        "Load Balancers Account Read",
        "Zero Trust: PII Read",
        "DDoS Botnet Feed Write",
        "DDoS Botnet Feed Read",
        "Workers R2 Storage Write",
        "Workers R2 Storage Read",
        "DDoS Protection Write",
        "DDoS Protection Read",
        "Workers Tail Read",
        "Workers KV Storage Write",
        "Workers KV Storage Read",
        "Workers Scripts Write",
        "Workers Scripts Read",
        "Load Balancing: Monitors and Pools Write",
        "Load Balancing: Monitors and Pools Read",
        "Account Firewall Access Rules Write",
        "Account Firewall Access Rules Read",
        "DNS Firewall Write",
        "DNS Firewall Read",
        "Billing Write",
        "Billing Read",
        "Account Settings Write",
        "Account Settings Read",
      ])

    g.put("/", {
      body: OrganizationsApiProfile,
      responses: {
        "4XX": OrganizationsApiV4errorresponse,
      },
    })
      .summary("Modify account profile")
      .operationId("Accounts_modifyAccountProfile")
      .tag("Accounts")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Settings Write"])
  })
}

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { OrganizationsApiV4errorresponse } from "../shared/schemas"

export function registerMove(api: Api) {
  api
    .post("/accounts/{account_id}/move", {
      params: Type.Object({ account_id: Type.String() }),
      body: Type.Object({
        destination_organization_id: Type.String(),
      }),
      responses: {
        "4XX": OrganizationsApiV4errorresponse,
      },
    })
    .summary("Move account")
    .description("Move an account within an organization hierarchy or an account outside an\norganization.")
    .operationId("Accounts_moveAccounts")
    .tag("Accounts")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", null)
}

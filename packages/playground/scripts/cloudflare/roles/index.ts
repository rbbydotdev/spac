import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { IamApiResponseCommonFailure, IamRoleComponentsSchemasIdentifier } from "../shared/schemas"
import { IamCollectionRoleResponse, IamSingleRoleResponse } from "./schemas"

export function registerRoles(api: Api) {
  api.assertVersion("3.0.3", "Roles")

  api.group("/accounts/{account_id}/roles", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Number of roles per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
      }),
    })
      .response(IamCollectionRoleResponse)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("List Roles")
      .description("Get all available roles for an account.")
      .operationId("account-roles-list-roles")
      .tag("Account Roles")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write", "Account Settings Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:read"] })

    g.get("/{role_id}", {
      params: Type.Object({ role_id: IamRoleComponentsSchemasIdentifier }),
    })
      .response(IamSingleRoleResponse)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Role Details")
      .description("Get information about a specific role for an account.")
      .operationId("account-roles-role-details")
      .tag("Account Roles")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write", "Account Settings Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:read"] })
  })
}

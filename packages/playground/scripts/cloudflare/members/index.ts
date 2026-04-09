import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  IamApiResponseCommonFailure,
  IamApiResponseSingleId,
  IamMembershipComponentsSchemasIdentifier,
} from "../shared/schemas"
import {
  IamCollectionMemberResponseWithPolicies,
  IamCreateMemberWithPolicies,
  IamCreateMemberWithRoles,
  IamSingleMemberResponseWithPolicies,
  IamUpdateMemberWithPolicies,
  IamUpdateMemberWithRoles,
} from "./schemas"

export function registerMembers(api: Api) {
  api.assertVersion("3.0.3", "Members")

  api.group("/accounts/{account_id}/members", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        order: Type.Optional(
          Type.Union(
            [
              Type.Literal("user.first_name"),
              Type.Literal("user.last_name"),
              Type.Literal("user.email"),
              Type.Literal("status"),
            ],
            { description: "Field to order results by." },
          ),
        ),
        status: Type.Optional(
          Type.Union([Type.Literal("accepted"), Type.Literal("pending"), Type.Literal("rejected")], {
            description: "A member's status in the account.",
          }),
        ),
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Maximum number of results per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Direction to order results." }),
        ),
      }),
    })
      .response(IamCollectionMemberResponseWithPolicies)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("List Members")
      .description("List all members of an account.")
      .operationId("account-members-list-members")
      .tag("Account Members")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write", "Account Settings Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/", {
      body: Type.Union([IamCreateMemberWithRoles, IamCreateMemberWithPolicies]),
    })
      .response(IamSingleMemberResponseWithPolicies)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Add Member")
      .description("Add a user to the list of members for this account.")
      .operationId("account-members-add-member")
      .tag("Account Members")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{member_id}", {
      params: Type.Object({ member_id: IamMembershipComponentsSchemasIdentifier }),
    })
      .response(IamSingleMemberResponseWithPolicies)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Member Details")
      .description("Get information about a specific member of an account.")
      .operationId("account-members-member-details")
      .tag("Account Members")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write", "Account Settings Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/{member_id}", {
      params: Type.Object({ member_id: IamMembershipComponentsSchemasIdentifier }),
      body: Type.Union([IamUpdateMemberWithRoles, IamUpdateMemberWithPolicies]),
    })
      .response(IamSingleMemberResponseWithPolicies)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Update Member")
      .description("Modify an account member.")
      .operationId("account-members-update-member")
      .tag("Account Members")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{member_id}", {
      params: Type.Object({ member_id: IamMembershipComponentsSchemasIdentifier }),
    })
      .response(IamApiResponseSingleId)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Remove Member")
      .description("Remove a member from an account.")
      .operationId("account-members-remove-member")
      .tag("Account Members")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

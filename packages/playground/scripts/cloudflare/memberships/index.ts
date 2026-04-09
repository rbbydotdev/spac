import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, IamApiResponseCommonFailure, IamMembershipComponentsSchemasIdentifier } from "../shared/schemas"
import {
  IamCollectionMembershipResponse,
  IamCollectionMembershipResponseWithPolicies,
  IamPropertiesName,
  IamSingleMembershipResponseWithPolicies,
} from "./schemas"

export function registerMemberships(api: Api) {
  api.assertVersion("3.0.3", "Memberships")

  api.group("/memberships", (g) => {
    g.get("/", {
      query: Type.Object({
        "account.name": Type.Optional(IamPropertiesName),
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Number of memberships per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal("id"), Type.Literal("account.name"), Type.Literal("status")], {
            description: "Field to order memberships by.",
          }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Direction to order memberships." }),
        ),
        name: Type.Optional(IamPropertiesName),
        status: Type.Optional(
          Type.Union([Type.Literal("accepted"), Type.Literal("pending"), Type.Literal("rejected")], {
            description: "Status of this membership.",
          }),
        ),
      }),
    })
      .response(Type.Union([IamCollectionMembershipResponse, IamCollectionMembershipResponseWithPolicies]))
      .error("4XX", IamApiResponseCommonFailure)
      .summary("List Memberships")
      .description("List memberships of accounts the user can access.")
      .operationId("user'-s-account-memberships-list-memberships")
      .tag("User's Account Memberships")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Memberships Write", "Memberships Read"])

    g.get("/{membership_id}", {
      params: Type.Object({ membership_id: IamMembershipComponentsSchemasIdentifier }),
    })
      .response(IamSingleMembershipResponseWithPolicies)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Membership Details")
      .description("Get a specific membership.")
      .operationId("user'-s-account-memberships-membership-details")
      .tag("User's Account Memberships")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Memberships Write", "Memberships Read"])

    g.put("/{membership_id}", {
      params: Type.Object({ membership_id: IamMembershipComponentsSchemasIdentifier }),
      body: Type.Object({
        status: Type.Union([Type.Literal("accepted"), Type.Literal("rejected")], {
          description: "Whether to accept or reject this account invitation.",
        }),
      }),
    })
      .response(IamSingleMembershipResponseWithPolicies)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Update Membership")
      .description("Accept or reject this account invitation.")
      .operationId("user'-s-account-memberships-update-membership")
      .tag("User's Account Memberships")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Memberships Write"])

    g.delete("/{membership_id}", {
      params: Type.Object({ membership_id: IamMembershipComponentsSchemasIdentifier }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              id: Type.Optional(IamMembershipComponentsSchemasIdentifier),
            }),
          ),
        }),
      )
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Delete Membership")
      .description("Remove the associated member from an account.")
      .operationId("user'-s-account-memberships-delete-membership")
      .tag("User's Account Memberships")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Memberships Write"])
  })
}

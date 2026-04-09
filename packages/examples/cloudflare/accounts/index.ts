import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  EmailSecurityMessage,
  IamAccountIdentifier,
  IamApiResponseCommonFailure,
  IamApiResponseSingleId,
  OrganizationsApiV4errorresponse,
} from "../shared/schemas"
import {
  IamComponentsSchemasAccount,
  IamCreateAccount,
  IamResponseCollectionAccounts,
  IamResponseSingleAccount,
  OrganizationsApiBatchaccountmoveresponse,
} from "./schemas"

export function registerAccounts(api: Api) {
  api.group("/accounts", (g) => {
    g.get("/", {
      query: Type.Object({
        name: Type.Optional(Type.String({ description: "Name of the account." })),
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Maximum number of results per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Direction to order results." }),
        ),
      }),
      responses: {
        200: IamResponseCollectionAccounts,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("List Accounts")
      .description("List all accounts you have ownership or verified access to.")
      .operationId("accounts-list-accounts")
      .tag("Accounts")
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/", {
      body: IamCreateAccount,
      responses: {
        200: IamResponseSingleAccount,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Create an account")
      .description("Create an account (only available for tenant admins at this time)")
      .operationId("account-creation")
      .tag("Accounts")
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: false, free: false, pro: false })

    g.post("/move", {
      body: Type.Object({
        account_ids: Type.Array(Type.String(), { description: "Move these accounts to the destination organization." }),
        destination_organization_id: Type.String({ description: "Move accounts to this organization ID." }),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
          messages: Type.Array(EmailSecurityMessage),
          result: OrganizationsApiBatchaccountmoveresponse,
          success: Type.Union([Type.Literal(true)]),
        }),
        "4XX": OrganizationsApiV4errorresponse,
      },
    })
      .summary("Batch move accounts")
      .description("Batch move a collection of accounts to a specific organization. ⚠️ Not implemented.")
      .operationId("Accounts_batchMoveAccounts")
      .tag("Accounts")
      .security({ api_email: [], api_key: [] })

    g.get("/{account_id}", {
      params: Type.Object({ account_id: IamAccountIdentifier }),
      responses: {
        200: IamResponseSingleAccount,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Account Details")
      .description("Get information about a specific account that you are a member of.")
      .operationId("accounts-account-details")
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
      .extension("x-cfPermissionsRequired", { enum: ["#organization:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/{account_id}", {
      params: Type.Object({ account_id: IamAccountIdentifier }),
      body: IamComponentsSchemasAccount,
      responses: {
        200: IamResponseSingleAccount,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Update Account")
      .description("Update an existing account.")
      .operationId("accounts-update-account")
      .tag("Accounts")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{account_id}", {
      params: Type.Object({ account_id: Type.String({ description: "The account ID of the account to be deleted" }) }),
      responses: {
        200: IamApiResponseSingleId,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Delete a specific account")
      .description(
        "Delete a specific account (only available for tenant admins at this time). This is a permanent operation that will delete any zones or other resources under the account",
      )
      .operationId("account-deletion")
      .tag("Accounts")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: false, free: false, pro: false })
  })
}

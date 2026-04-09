import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  EmailSecurityMessage,
  McnPolicyResult,
  OrganizationsApiAccount,
  OrganizationsApiOrganization,
  OrganizationsApiProfile,
  OrganizationsApiV4errorresponse,
  ResourceSharingApiResponseCommonFailure,
  ResourceSharingOrganizationId,
  ResourceSharingResourceType,
  ResourceSharingShareKind,
  ResourceSharingShareResponseCollection,
  ResourceSharingShareStatus,
  ResourceSharingShareTargetType,
} from "../shared/schemas"
import {
  OrganizationsApiBatchcreatemembersrequest,
  OrganizationsApiCreatememberrequest,
  OrganizationsApiMember,
  OrganizationsApiPagetokenresultinfo,
} from "./schemas"

export function registerOrganizations(api: Api) {
  api.assertVersion("3.0.3", "Organizations")

  api
    .get("/accounts/{account_id}/organizations", {
      params: Type.Object({ account_id: Type.String() }),
    })
    .response(
      Type.Object({
        errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
        messages: Type.Array(EmailSecurityMessage),
        result: Type.Array(OrganizationsApiOrganization),
        success: Type.Union([Type.Literal(true)]),
      }),
    )
    .error("4XX", OrganizationsApiV4errorresponse)
    .summary("List account organizations")
    .description(
      'Retrieve a list of the organizations that "contain" this account or are\nmanaging it.\n\nThe returned list will be in order from "root" to "leaf", where the "leaf"\nwill be the organization that _immediately_ contains the specified\naccount.',
    )
    .operationId("Accounts_listAccountOrganizations")
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

  api
    .post("/organizations", {
      body: OrganizationsApiOrganization,
    })
    .response(
      Type.Object({
        errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
        messages: Type.Array(EmailSecurityMessage),
        result: OrganizationsApiOrganization,
        success: Type.Union([Type.Literal(true)]),
      }),
    )
    .error("4XX", OrganizationsApiV4errorresponse)
    .summary("Create organization")
    .description("Create a new organization for a user.")
    .operationId("Organizations_createUserOrganization")
    .tag("Organizations")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["User Details Write"])

  api
    .get("/organizations/{organization_id}", {
      params: Type.Object({ organization_id: McnPolicyResult }),
    })
    .response(
      Type.Object({
        errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
        messages: Type.Array(EmailSecurityMessage),
        result: OrganizationsApiOrganization,
        success: Type.Union([Type.Literal(true)]),
      }),
    )
    .error("4XX", OrganizationsApiV4errorresponse)
    .summary("Get organization")
    .description("Retrieve the details of a certain organization.")
    .operationId("Organizations_retrieve")
    .tag("Organizations")
    .security({ api_email: [], api_key: [] })

  api
    .put("/organizations/{organization_id}", {
      params: Type.Object({ organization_id: McnPolicyResult }),
      body: OrganizationsApiOrganization,
    })
    .response(
      Type.Object({
        errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
        messages: Type.Array(EmailSecurityMessage),
        result: OrganizationsApiOrganization,
        success: Type.Union([Type.Literal(true)]),
      }),
    )
    .error("4XX", OrganizationsApiV4errorresponse)
    .summary("Modify organization")
    .operationId("Organizations_modify")
    .tag("Organizations")
    .security({ api_email: [], api_key: [] })

  api
    .delete("/organizations/{organization_id}", {
      params: Type.Object({ organization_id: McnPolicyResult }),
    })
    .error("4XX", OrganizationsApiV4errorresponse)
    .summary("Delete organization")
    .description(
      "Delete an organization. The organization MUST be empty before deleting.\nIt must not contain any sub-organizations, accounts, members or users.",
    )
    .operationId("Organizations_delete")
    .tag("Organizations")
    .security({ api_email: [], api_key: [] })

  api
    .get("/organizations/{organization_id}/accounts", {
      params: Type.Object({ organization_id: McnPolicyResult }),
      query: Type.Object({
        account_pubname: Type.Optional(Type.String()),
        "account_pubname.startsWith": Type.Optional(Type.String()),
        "account_pubname.endsWith": Type.Optional(Type.String()),
        "account_pubname.contains": Type.Optional(Type.String()),
        name: Type.Optional(Type.String()),
        "name.startsWith": Type.Optional(Type.String()),
        "name.endsWith": Type.Optional(Type.String()),
        "name.contains": Type.Optional(Type.String()),
        page_token: Type.Optional(Type.String()),
        page_size: Type.Optional(Type.Integer({ minimum: 0, maximum: 1000 })),
      }),
    })
    .response(
      Type.Object({
        errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
        messages: Type.Array(EmailSecurityMessage),
        result: Type.Array(OrganizationsApiAccount),
        result_info: OrganizationsApiPagetokenresultinfo,
        success: Type.Union([Type.Literal(true)]),
      }),
    )
    .error("4XX", OrganizationsApiV4errorresponse)
    .summary("Get organization accounts")
    .description("Retrieve a list of accounts that belong to a specific organization.")
    .operationId("Organizations_getAccounts")
    .tag("Organizations")
    .security({ api_email: [], api_key: [] })

  api
    .get("/organizations/{organization_id}/members", {
      params: Type.Object({ organization_id: McnPolicyResult }),
      query: Type.Object({
        status: Type.Optional(Type.Array(Type.Union([Type.Literal("active"), Type.Literal("canceled")]))),
        "user.email": Type.Optional(Type.String()),
        "user.email.contains": Type.Optional(Type.String()),
        "user.email.startsWith": Type.Optional(Type.String()),
        "user.email.endsWith": Type.Optional(Type.String()),
        page_token: Type.Optional(Type.String()),
        page_size: Type.Optional(Type.Integer({ minimum: 0, maximum: 1000 })),
      }),
    })
    .response(
      Type.Object({
        errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
        messages: Type.Array(EmailSecurityMessage),
        result: Type.Array(OrganizationsApiMember),
        result_info: OrganizationsApiPagetokenresultinfo,
        success: Type.Union([Type.Literal(true)]),
      }),
    )
    .error("4XX", OrganizationsApiV4errorresponse)
    .summary("List organization members")
    .description("List memberships for an Organization.")
    .operationId("Members_list")
    .tag("OrganizationMembers")
    .security({ api_email: [], api_key: [] })

  api
    .post("/organizations/{organization_id}/members", {
      params: Type.Object({ organization_id: McnPolicyResult }),
      body: OrganizationsApiCreatememberrequest,
    })
    .response(
      Type.Object({
        errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
        messages: Type.Array(EmailSecurityMessage),
        result: OrganizationsApiMember,
        success: Type.Union([Type.Literal(true)]),
      }),
    )
    .error("4XX", OrganizationsApiV4errorresponse)
    .summary("Create organization member")
    .description("Create a membership that grants access to a specific Organization.")
    .operationId("Members_create")
    .tag("OrganizationMembers")
    .security({ api_email: [], api_key: [] })

  api
    .delete("/organizations/{organization_id}/members", {
      params: Type.Object({ organization_id: McnPolicyResult }),
    })
    .error("4XX", OrganizationsApiV4errorresponse)
    .summary("Delete organization member")
    .description("Delete a membership to a particular Organization.")
    .operationId("Members_delete")
    .tag("OrganizationMembers")
    .security({ api_email: [], api_key: [] })

  api
    .get("/organizations/{organization_id}/members/{member_id}", {
      params: Type.Object({ organization_id: McnPolicyResult, member_id: McnPolicyResult }),
    })
    .response(
      Type.Object({
        errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
        messages: Type.Array(EmailSecurityMessage),
        result: OrganizationsApiMember,
        success: Type.Union([Type.Literal(true)]),
      }),
    )
    .error("4XX", OrganizationsApiV4errorresponse)
    .summary("Get organization member")
    .description("Retrieve a single membership from an Organization.")
    .operationId("Members_retrieve")
    .tag("OrganizationMembers")
    .security({ api_email: [], api_key: [] })

  api
    .post("/organizations/{organization_id}/members:batchCreate", {
      params: Type.Object({ organization_id: McnPolicyResult }),
      body: OrganizationsApiBatchcreatemembersrequest,
    })
    .response(
      Type.Object({
        errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
        messages: Type.Array(EmailSecurityMessage),
        result: Type.Array(OrganizationsApiMember),
        success: Type.Union([Type.Literal(true)]),
      }),
    )
    .error("4XX", OrganizationsApiV4errorresponse)
    .summary("Batch create organization members")
    .description("Batch create multiple memberships that grant access to a specific Organization.")
    .operationId("Members_batchCreate")
    .tag("OrganizationMembers")
    .security({ api_email: [], api_key: [] })

  api
    .get("/organizations/{organization_id}/profile", {
      params: Type.Object({ organization_id: McnPolicyResult }),
    })
    .response(
      Type.Object({
        errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
        messages: Type.Array(EmailSecurityMessage),
        result: OrganizationsApiProfile,
        success: Type.Union([Type.Literal(true)]),
      }),
    )
    .error("4XX", OrganizationsApiV4errorresponse)
    .summary("Get organization profile")
    .description("Get an organizations profile if it exists.")
    .operationId("Organizations_getProfile")
    .tag("Organizations")
    .security({ api_email: [], api_key: [] })

  api
    .put("/organizations/{organization_id}/profile", {
      params: Type.Object({ organization_id: McnPolicyResult }),
      body: OrganizationsApiProfile,
    })
    .error("4XX", OrganizationsApiV4errorresponse)
    .summary("Modify organization profile")
    .operationId("Organizations_modifyProfile")
    .tag("Organizations")
    .security({ api_email: [], api_key: [] })

  api
    .get("/organizations/{organization_id}/shares", {
      params: Type.Object({ organization_id: ResourceSharingOrganizationId }),
      query: Type.Object({
        status: Type.Optional(ResourceSharingShareStatus),
        kind: Type.Optional(ResourceSharingShareKind),
        target_type: Type.Optional(ResourceSharingShareTargetType),
        resource_types: Type.Optional(Type.Array(ResourceSharingResourceType)),
        order: Type.Optional(Type.Union([Type.Literal("name"), Type.Literal("created")])),
        direction: Type.Optional(Type.Union([Type.Literal("asc"), Type.Literal("desc")])),
        page: Type.Optional(Type.Integer({ minimum: 0, multipleOf: 1 })),
        per_page: Type.Optional(Type.Integer({ minimum: 0, maximum: 100, multipleOf: 1 })),
      }),
    })
    .response(ResourceSharingShareResponseCollection)
    .error("4XX", ResourceSharingApiResponseCommonFailure)
    .error("5XX", ResourceSharingApiResponseCommonFailure)
    .summary("List organization shares")
    .description("Lists all organization shares.")
    .operationId("organization-shares-list")
    .tag("Resource Sharing")
    .security({ api_email: [], api_key: [] })
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })
}

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { EmailSecurityMessage, OrganizationsApiAccount, OrganizationsApiV4errorresponse } from "../shared/schemas"
import { OrganizationsApiInnateentitlements, OrganizationsApiTenant, OrganizationsApiTenantmembership } from "./schemas"

export function registerTenants(api: Api) {
  api.assertVersion("3.0.3", "Tenants")

  api.group("/tenants/{tenant_id}", { params: Type.Object({ tenant_id: Type.String() }) }, (g) => {
    g.get("/", {})
      .response(
        Type.Object({
          errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
          messages: Type.Array(EmailSecurityMessage),
          result: OrganizationsApiTenant,
          success: Type.Union([Type.Literal(true)]),
        }),
      )
      .error("4XX", OrganizationsApiV4errorresponse)
      .summary("Get tenant")
      .description("Retrieves a Tenant by Tenant ID.")
      .operationId("Tenants_retrieveTenant")
      .tag("Tenants")
      .security({ api_email: [], api_key: [] })

    g.get("/account_types", {})
      .response(
        Type.Object({
          errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Array(Type.String()),
          success: Type.Union([Type.Literal(true)]),
        }),
      )
      .error("4XX", OrganizationsApiV4errorresponse)
      .summary("Get tenant account types")
      .description("List of account types available for the Tenant to provision accounts.")
      .operationId("Tenants_validAccountTypes")
      .tag("Tenants")
      .security({ api_email: [], api_key: [] })

    g.get("/accounts", {})
      .response(
        Type.Object({
          errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Array(OrganizationsApiAccount),
          success: Type.Union([Type.Literal(true)]),
        }),
      )
      .error("4XX", OrganizationsApiV4errorresponse)
      .summary("List tenant accounts")
      .description("List of accounts for the Tenant.")
      .operationId("Tenants_listAccounts")
      .tag("Tenants")
      .security({ api_email: [], api_key: [] })

    g.get("/entitlements", {})
      .response(
        Type.Object({
          errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
          messages: Type.Array(EmailSecurityMessage),
          result: OrganizationsApiInnateentitlements,
          success: Type.Union([Type.Literal(true)]),
        }),
      )
      .error("4XX", OrganizationsApiV4errorresponse)
      .summary("List tenant entitlements")
      .description("List of innate entitlements available for the Tenant.")
      .operationId("Tenants_listEntitlements")
      .tag("Tenants")
      .security({ api_email: [], api_key: [] })

    g.get("/memberships", {})
      .response(
        Type.Object({
          errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Array(OrganizationsApiTenantmembership),
          success: Type.Union([Type.Literal(true)]),
        }),
      )
      .error("4XX", OrganizationsApiV4errorresponse)
      .summary("List tenant memberships")
      .description("List of active members (Cloudflare users) for the Tenant.")
      .operationId("Tenants_listMemberships")
      .tag("Tenants")
      .security({ api_email: [], api_key: [] })
  })
}

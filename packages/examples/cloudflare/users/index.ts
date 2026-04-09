import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  EmailSecurityMessage,
  McnPolicyResult,
  OrganizationsApiOrganization,
  OrganizationsApiV4errorresponse,
} from "../shared/schemas"

export function registerUsers(api: Api) {
  api.group("/users", (g) => {
    g.get("/organizations", {
      query: Type.Object({
        id: Type.Optional(Type.Array(McnPolicyResult)),
        name: Type.Optional(Type.String()),
        "name.startsWith": Type.Optional(Type.String()),
        "name.endsWith": Type.Optional(Type.String()),
        "name.contains": Type.Optional(Type.String()),
        "containing.account": Type.Optional(Type.String()),
        "containing.user": Type.Optional(Type.String()),
        "containing.organization": Type.Optional(Type.String()),
        "parent.id": Type.Optional(Type.Union([McnPolicyResult, Type.Union([Type.Literal("null")])])),
        page_token: Type.Optional(Type.String()),
        page_size: Type.Optional(Type.Integer({ minimum: 0, maximum: 1000 })),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Array(OrganizationsApiOrganization),
          success: Type.Union([Type.Literal(true)]),
        }),
        "4XX": OrganizationsApiV4errorresponse,
      },
    })
      .summary("List user organizations")
      .description("Retrieve a list of organizations a particular user has access to.")
      .operationId("User_listUserOrganizations")
      .tag("User")
      .security({ api_email: [], api_key: [] })

    g.get("/tenants", {
      responses: {
        200: Type.Object({
          errors: Type.Array(Type.Unknown(), { maxItems: 0 }),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Array(OrganizationsApiOrganization),
          success: Type.Union([Type.Literal(true)]),
        }),
        "4XX": OrganizationsApiV4errorresponse,
      },
    })
      .summary("List user tenants")
      .description("Retrieves list of tenants the authenticated user / method has access to.")
      .operationId("User_listUserTenants")
      .tag("User")
      .security({ api_email: [], api_key: [] })
  })
}

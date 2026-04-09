import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { McnPolicyResult } from "../shared/schemas"

export const OrganizationsApiCreatesinglemember = named(
  "organizations-api_CreateSingleMember",
  Type.Object({
    status: Type.Optional(Type.Union([Type.Literal("active"), Type.Literal("canceled")])),
    user: Type.Object({
      email: Type.String(),
    }),
  }),
)

export const OrganizationsApiBatchcreatemembersrequest = named(
  "organizations-api_BatchCreateMembersRequest",
  Type.Object({
    members: Type.Array(OrganizationsApiCreatesinglemember),
  }),
)

export const OrganizationsApiCreatememberrequest = named(
  "organizations-api_CreateMemberRequest",
  Type.Object({
    member: OrganizationsApiCreatesinglemember,
  }),
)

export const OrganizationsApiMembersubjectuser = named(
  "organizations-api_MemberSubjectUser",
  Type.Object({
    email: Type.String(),
    id: Type.String(),
    name: Type.String(),
    two_factor_authentication_enabled: Type.Boolean(),
  }),
)

export const OrganizationsApiMember = named(
  "organizations-api_Member",
  Type.Object({
    create_time: Type.String({ format: "date-time" }),
    id: McnPolicyResult,
    meta: Type.Record(Type.String(), Type.Unknown()),
    status: Type.Union([Type.Literal("active"), Type.Literal("canceled")]),
    update_time: Type.String({ format: "date-time" }),
    user: OrganizationsApiMembersubjectuser,
  }),
)

export const OrganizationsApiPagetokenresultinfo = named(
  "organizations-api_PageTokenResultInfo",
  Type.Object({
    next_page_token: Type.Optional(
      Type.String({
        description:
          "Use this opaque token in the next request to retrieve the\nnext page.\n\nParameters used to filter the retrieved list must remain in subsequent\nrequests with a page token.",
      }),
    ),
    total_size: Type.Optional(
      Type.Integer({
        description:
          "Counts the total amount of items in a list with the applied filters. The API omits next_page_token to indicate no more items in a particular list.",
      }),
    ),
  }),
)

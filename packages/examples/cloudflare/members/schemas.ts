import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  DlpMessages,
  IamAccess,
  IamCommonComponentsSchemasIdentifier,
  IamEmail,
  IamFirstName,
  IamLastName,
  IamListMemberPolicy,
  IamMembershipComponentsSchemasIdentifier,
  IamPolicyIdentifier,
  IamResultInfo,
  IamRole,
  IamRoleComponentsSchemasIdentifier,
  IamTwoFactorAuthenticationEnabled,
} from "../shared/schemas"

export const IamMemberPermissionGroup = named(
  "iam_member_permission_group",
  Type.Object(
    {
      id: Type.String({ description: "Identifier of the group.", "x-auditable": true }),
    },
    { description: "A group of permissions." },
  ),
)

export const IamMemberPermissionGroups = named(
  "iam_member_permission_groups",
  Type.Array(IamMemberPermissionGroup, { description: "A set of permission groups that are specified to the policy." }),
)

export const IamMemberResourceGroup = named(
  "iam_member_resource_group",
  Type.Object(
    {
      id: Type.String({ description: "Identifier of the group.", "x-auditable": true }),
    },
    { description: "A group of scoped resources." },
  ),
)

export const IamMemberResourceGroups = named(
  "iam_member_resource_groups",
  Type.Array(IamMemberResourceGroup, { description: "A list of resource groups that the policy applies to." }),
)

export const IamCreateMemberPolicy = named(
  "iam_create_member_policy",
  Type.Object({
    access: IamAccess,
    id: IamPolicyIdentifier,
    permission_groups: IamMemberPermissionGroups,
    resource_groups: IamMemberResourceGroups,
  }),
)

export const IamUpdateMemberWithPolicies = named(
  "iam_update-member-with-policies",
  Type.Object({
    policies: Type.Array(IamCreateMemberPolicy, { description: "Array of policies associated with this member." }),
  }),
)

export const IamUpdateMemberWithRoles = named(
  "iam_update-member-with-roles",
  Type.Object({
    id: Type.Optional(IamMembershipComponentsSchemasIdentifier),
    roles: Type.Optional(Type.Array(IamRole, { description: "Roles assigned to this member." })),
    status: Type.Optional(
      Type.Union([Type.Literal("accepted"), Type.Literal("pending")], {
        description: "A member's status in the account.",
        "x-auditable": true,
      }),
    ),
    user: Type.Optional(
      Type.Object(
        {
          email: IamEmail,
          first_name: Type.Optional(IamFirstName),
          id: Type.Optional(IamCommonComponentsSchemasIdentifier),
          last_name: Type.Optional(IamLastName),
          two_factor_authentication_enabled: Type.Optional(IamTwoFactorAuthenticationEnabled),
        },
        { description: "Details of the user associated to the membership." },
      ),
    ),
  }),
)

export const IamMemberWithPolicies = named(
  "iam_member_with_policies",
  Type.Object({
    email: Type.Optional(IamEmail),
    id: Type.Optional(IamMembershipComponentsSchemasIdentifier),
    policies: Type.Optional(Type.Array(IamListMemberPolicy, { description: "Access policy for the membership" })),
    roles: Type.Optional(Type.Array(IamRole, { description: "Roles assigned to this Member." })),
    status: Type.Optional(
      Type.Union([Type.Literal("accepted"), Type.Literal("pending")], {
        description: "A member's status in the account.",
        "x-auditable": true,
      }),
    ),
    user: Type.Optional(
      Type.Object(
        {
          email: IamEmail,
          first_name: Type.Optional(IamFirstName),
          id: Type.Optional(IamCommonComponentsSchemasIdentifier),
          last_name: Type.Optional(IamLastName),
          two_factor_authentication_enabled: Type.Optional(IamTwoFactorAuthenticationEnabled),
        },
        { description: "Details of the user associated to the membership." },
      ),
    ),
  }),
)

export const IamSingleMemberResponseWithPolicies = named(
  "iam_single_member_response_with_policies",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(IamMemberWithPolicies),
  }),
)

export const IamCreateMemberWithPolicies = named(
  "iam_create-member-with-policies",
  Type.Object({
    email: IamEmail,
    policies: Type.Array(IamCreateMemberPolicy, { description: "Array of policies associated with this member." }),
    status: Type.Optional(Type.Union([Type.Literal("accepted"), Type.Literal("pending")], { "x-auditable": true })),
  }),
)

export const IamCreateMemberWithRoles = named(
  "iam_create-member-with-roles",
  Type.Object({
    email: IamEmail,
    roles: Type.Array(IamRoleComponentsSchemasIdentifier, {
      description: "Array of roles associated with this member.",
    }),
    status: Type.Optional(Type.Union([Type.Literal("accepted"), Type.Literal("pending")], { "x-auditable": true })),
  }),
)

export const IamCollectionMemberResponseWithPolicies = named(
  "iam_collection_member_response_with_policies",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IamResultInfo),
    result: Type.Optional(Type.Array(IamMemberWithPolicies)),
  }),
)

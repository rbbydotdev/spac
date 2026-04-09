import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  DlpMessages,
  IamAccount,
  IamListMemberPolicy,
  IamMembershipComponentsSchemasIdentifier,
  IamPermissions,
  IamResultInfo,
  IamRoleNames,
} from "../shared/schemas"

export const IamSchemasAccount = named("iam_schemas-account", IamAccount)

export const IamApiAccessEnabled = named(
  "iam_api_access_enabled",
  Type.Union([
    Type.Boolean({
      description:
        "Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const IamSchemasStatus = named(
  "iam_schemas-status",
  Type.Union([Type.Literal("accepted"), Type.Literal("pending"), Type.Literal("rejected")], {
    description: "Status of this membership.",
    "x-auditable": true,
  }),
)

export const IamMembershipWithPolicies = named(
  "iam_membership-with-policies",
  Type.Object({
    account: Type.Optional(IamSchemasAccount),
    api_access_enabled: Type.Optional(IamApiAccessEnabled),
    id: Type.Optional(IamMembershipComponentsSchemasIdentifier),
    permissions: Type.Optional(IamPermissions),
    policies: Type.Optional(Type.Array(IamListMemberPolicy, { description: "Access policy for the membership" })),
    roles: Type.Optional(IamRoleNames),
    status: Type.Optional(IamSchemasStatus),
  }),
)

export const IamSingleMembershipResponseWithPolicies = named(
  "iam_single_membership_response_with_policies",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(IamMembershipWithPolicies),
  }),
)

export const IamPropertiesName = named(
  "iam_properties-name",
  Type.String({ description: "Account name", maxLength: 100, "x-auditable": true }),
)

export const IamCollectionMembershipResponseWithPolicies = named(
  "iam_collection_membership_response_with_policies",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IamResultInfo),
    result: Type.Optional(Type.Array(IamMembershipWithPolicies)),
  }),
)

export const IamMembership = named(
  "iam_membership",
  Type.Object({
    account: Type.Optional(IamSchemasAccount),
    api_access_enabled: Type.Optional(IamApiAccessEnabled),
    id: Type.Optional(IamMembershipComponentsSchemasIdentifier),
    permissions: Type.Optional(IamPermissions),
    roles: Type.Optional(IamRoleNames),
    status: Type.Optional(IamSchemasStatus),
  }),
)

export const IamCollectionMembershipResponse = named(
  "iam_collection_membership_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IamResultInfo),
    result: Type.Optional(Type.Array(IamMembership)),
  }),
)

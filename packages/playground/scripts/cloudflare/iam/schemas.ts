import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  DlpMessages,
  IamAccess,
  IamCommonComponentsSchemasIdentifier,
  IamEmail,
  IamPermissionGroups,
  IamPolicyIdentifier,
  IamResourceGroups,
  IamResultInfo,
} from "../shared/schemas"

export const IamUserGroupMemberIdentifier = named(
  "iam_user_group_member_identifier",
  IamCommonComponentsSchemasIdentifier,
)

export const IamUserGroupMember = named(
  "iam_user_group_member",
  Type.Object(
    {
      email: Type.Optional(IamEmail),
      id: Type.String({ description: "Account member identifier.", readOnly: true }),
      status: Type.Optional(
        Type.Union([Type.Literal("accepted"), Type.Literal("pending")], {
          description: "The member's status in the account.",
        }),
      ),
    },
    { description: "Member attached to a User Group." },
  ),
)

export const IamPermissionGroupIdentifier = named(
  "iam_permission_group_identifier",
  IamCommonComponentsSchemasIdentifier,
)

export const IamPermissionGroupIds = named(
  "iam_permission_group_ids",
  Type.Array(
    Type.Object(
      {
        id: IamPermissionGroupIdentifier,
      },
      { description: "A named group of permissions that map to a group of operations against resources." },
    ),
    { description: "A set of permission groups that are specified to the policy.", title: "Permission Group IDs" },
  ),
)

export const IamResourceGroupIdentifier = named("iam_resource_group_identifier", IamCommonComponentsSchemasIdentifier)

export const IamResourceGroupIds = named(
  "iam_resource_group_ids",
  Type.Array(
    Type.Object(
      {
        id: IamResourceGroupIdentifier,
      },
      { description: "A group of scoped resources." },
    ),
    { description: "A set of resource groups that are specified to the policy.", title: "Resource Group IDs" },
  ),
)

export const IamUpdateUserGroupBody = named(
  "iam_update_user_group_body",
  Type.Object({
    name: Type.Optional(Type.String({ description: "Name of the User group." })),
    policies: Type.Optional(
      Type.Array(
        Type.Object({
          id: Type.String({ description: "Policy identifier." }),
          access: IamAccess,
          permission_groups: IamPermissionGroupIds,
          resource_groups: IamResourceGroupIds,
        }),
        { description: "Policies attached to the User group", title: "User Group Policies" },
      ),
    ),
  }),
)

export const IamUserGroupIdentifier = named("iam_user_group_identifier", IamCommonComponentsSchemasIdentifier)

export const IamUserGroup = named(
  "iam_user_group",
  Type.Object(
    {
      created_on: Type.String({
        description: "Timestamp for the creation of the user group",
        format: "date-time",
        readOnly: true,
        "x-auditable": true,
      }),
      id: IamUserGroupIdentifier,
      modified_on: Type.String({
        description: "Last time the user group was modified.",
        format: "date-time",
        readOnly: true,
        "x-auditable": true,
      }),
      name: Type.String({ description: "Name of the user group.", readOnly: true, "x-auditable": true }),
      policies: Type.Optional(
        Type.Array(
          Type.Object(
            {
              access: Type.Optional(IamAccess),
              id: Type.Optional(IamPolicyIdentifier),
              permission_groups: Type.Optional(IamPermissionGroups),
              resource_groups: Type.Optional(IamResourceGroups),
            },
            { description: "Policy" },
          ),
          { description: "Policies attached to the User group", title: "User Group Policies" },
        ),
      ),
    },
    { description: "A group of policies resources." },
  ),
)

export const IamUserGroupPolicyWriteBody = named(
  "iam_user_group_policy_write_body",
  Type.Object({
    access: IamAccess,
    permission_groups: IamPermissionGroupIds,
    resource_groups: IamResourceGroupIds,
  }),
)

export const IamCreateUserGroupBody = named(
  "iam_create_user_group_body",
  Type.Object({
    name: Type.String({ description: "Name of the User group.", "x-auditable": true }),
    policies: Type.Array(IamUserGroupPolicyWriteBody, {
      description: "Policies attached to the User group",
      title: "User Group Policies",
    }),
  }),
)

export const IamUserGroups = named(
  "iam_user_groups",
  Type.Array(IamUserGroup, { description: "A list of user groups for the account.", title: "User Groups" }),
)

export const IamCreateResourceGroupScopeScopeKey = named(
  "iam_create_resource_group_scope_scope_key",
  Type.String({
    description: "This is a combination of pre-defined resource name and identifier (like Account ID etc.)",
  }),
)

export const IamCreateResourceGroupScopeScopeObjectKey = named(
  "iam_create_resource_group_scope_scope_object_key",
  Type.String({ description: "This is a combination of pre-defined resource name and identifier (like Zone ID etc.)" }),
)

export const IamCreateResourceGroupScopeScopeObject = named(
  "iam_create_resource_group_scope_scope_object",
  Type.Object(
    {
      key: IamCreateResourceGroupScopeScopeObjectKey,
    },
    { description: "A scope object represents any resource that can have actions applied against invite." },
  ),
)

export const IamCreateScope = named(
  "iam_create-scope",
  Type.Object(
    {
      key: IamCreateResourceGroupScopeScopeKey,
      objects: Type.Array(IamCreateResourceGroupScopeScopeObject, {
        description: "A list of scope objects for additional context. The number of Scope objects should not be zero.",
      }),
    },
    { description: "A scope is a combination of scope objects which provides additional context." },
  ),
)

export const IamRequestUpdateResourceGroup = named(
  "iam_request_update_resource_group",
  Type.Object({
    name: Type.Optional(Type.String({ description: "Name of the resource group" })),
    scope: Type.Optional(IamCreateScope),
  }),
)

export const IamCreatedResourceGroupResponse = named(
  "iam_created_resource_group_response",
  Type.Object(
    {
      id: Type.Optional(Type.String({ description: "Identifier of the group.", readOnly: true, "x-auditable": true })),
      meta: Type.Optional(Type.Unknown({ description: "Attributes associated to the resource group." })),
      scope: Type.Optional(IamCreateScope),
    },
    { description: "A group of scoped resources." },
  ),
)

export const IamRequestCreateResourceGroup = named(
  "iam_request_create_resource_group",
  Type.Object({
    name: Type.String({ description: "Name of the resource group" }),
    scope: IamCreateScope,
  }),
)

export const IamCollectionResourceGroupsResponse = named(
  "iam_collection_resource_groups_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IamResultInfo),
    result: Type.Optional(IamResourceGroups),
  }),
)

export const IamCollectionPermissionGroupsResponse = named(
  "iam_collection_permission_groups_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IamResultInfo),
    result: Type.Optional(IamPermissionGroups),
  }),
)

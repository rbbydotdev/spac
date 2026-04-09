import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  DlpMessages,
  IamApiResponseCommonFailure,
  IamApiResponseSingleId,
  IamPermissionGroup,
  IamResourceGroup,
  IamResultInfo,
} from "../shared/schemas"
import {
  IamCollectionPermissionGroupsResponse,
  IamCollectionResourceGroupsResponse,
  IamCreateUserGroupBody,
  IamCreatedResourceGroupResponse,
  IamPermissionGroupIdentifier,
  IamRequestCreateResourceGroup,
  IamRequestUpdateResourceGroup,
  IamResourceGroupIdentifier,
  IamUpdateUserGroupBody,
  IamUserGroup,
  IamUserGroupIdentifier,
  IamUserGroupMember,
  IamUserGroupMemberIdentifier,
  IamUserGroups,
} from "./schemas"

export function registerIam(api: Api) {
  api.assertVersion("3.0.3", "Iam")

  api.group("/accounts/{account_id}/iam", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/permission_groups", {
      query: Type.Object({
        id: Type.Optional(
          Type.String({ description: "ID of the permission group to be fetched.", minLength: 32, maxLength: 32 }),
        ),
        name: Type.Optional(Type.String({ description: "Name of the permission group to be fetched." })),
        label: Type.Optional(Type.String({ description: "Label of the permission group to be fetched." })),
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Maximum number of results per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
      }),
    })
      .response(IamCollectionPermissionGroupsResponse)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("List Account Permission Groups")
      .description("List all the permissions groups for an account.")
      .operationId("account-permission-group-list")
      .tag("Account Permission Groups")
      .security({ api_token: [] })
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
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.iam.permission-group.list"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/permission_groups/{permission_group_id}", {
      params: Type.Object({ permission_group_id: IamPermissionGroupIdentifier }),
    })
      .response(IamPermissionGroup)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Permission Group Details")
      .description("Get information about a specific permission group in an account.")
      .operationId("account-permission-group-details")
      .tag("Account Permission Groups")
      .security({ api_token: [] })
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
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.iam.permission-group.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/resource_groups", {
      query: Type.Object({
        id: Type.Optional(IamResourceGroupIdentifier),
        name: Type.Optional(Type.String({ description: "Name of the resource group to be fetched." })),
      }),
    })
      .response(IamCollectionResourceGroupsResponse)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("List Resource Groups")
      .description("List all the resource groups for an account.")
      .operationId("account-resource-group-list")
      .tag("Account Resource Groups")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write", "Account Settings Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.iam.resource-group.list"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/resource_groups", {
      body: IamRequestCreateResourceGroup,
    })
      .response(IamCreatedResourceGroupResponse)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Create Resource Group")
      .description("Create a new Resource Group under the specified account.")
      .operationId("account-resource-group-create")
      .tag("Account Resource Groups")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.iam.resource-group.create"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/resource_groups/{resource_group_id}", {
      params: Type.Object({ resource_group_id: IamResourceGroupIdentifier }),
    })
      .response(IamResourceGroup)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Resource Group Details")
      .description("Get information about a specific resource group in an account.")
      .operationId("account-resource-group-details")
      .tag("Account Resource Groups")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write", "Account Settings Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.iam.resource-group.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/resource_groups/{resource_group_id}", {
      params: Type.Object({ resource_group_id: IamResourceGroupIdentifier }),
      body: IamRequestUpdateResourceGroup,
    })
      .response(IamResourceGroup)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Update Resource Group")
      .description("Modify an existing resource group.")
      .operationId("account-resource-group-update")
      .tag("Account Resource Groups")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.iam.resource-group.update"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/resource_groups/{resource_group_id}", {
      params: Type.Object({ resource_group_id: IamResourceGroupIdentifier }),
    })
      .response(IamApiResponseSingleId)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Remove Resource Group")
      .description("Remove a resource group from an account.")
      .operationId("account-resource-group-delete")
      .tag("Account Resource Groups")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.iam.resource-group.delete"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/user_groups", {
      query: Type.Object({
        id: Type.Optional(IamUserGroupIdentifier),
        name: Type.Optional(Type.String({ description: "Name of the user group to be fetched." })),
        fuzzyName: Type.Optional(
          Type.String({ description: "A string used for searching for user groups containing that substring." }),
        ),
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Maximum number of results per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
        direction: Type.Optional(
          Type.String({
            description:
              'The sort order of returned user groups by name. Default sort order is ascending. To switch to descending, set this parameter to "desc"',
          }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(IamResultInfo),
          result: Type.Optional(IamUserGroups),
        }),
      )
      .error("4XX", IamApiResponseCommonFailure)
      .summary("List User Groups")
      .description("List all the user groups for an account.")
      .operationId("account-user-group-list")
      .tag("Account User Groups")
      .security({ api_email: [], api_key: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write", "Account Settings Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.member.list"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/user_groups", {
      body: IamCreateUserGroupBody,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(IamUserGroup),
        }),
      )
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Create User Group")
      .description("Create a new user group under the specified account.")
      .operationId("account-user-group-create")
      .tag("Account User Groups")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.member.create"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/user_groups/{user_group_id}", {
      params: Type.Object({ user_group_id: IamUserGroupIdentifier }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(IamUserGroup),
        }),
      )
      .error("4XX", IamApiResponseCommonFailure)
      .summary("User Group Details")
      .description("Get information about a specific user group in an account.")
      .operationId("account-user-group-details")
      .tag("Account User Groups")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write", "Account Settings Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.member.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/user_groups/{user_group_id}", {
      params: Type.Object({ user_group_id: IamUserGroupIdentifier }),
      body: IamUpdateUserGroupBody,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(IamUserGroup),
        }),
      )
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Update User Group")
      .description("Modify an existing user group.")
      .operationId("account-user-group-update")
      .tag("Account User Groups")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.member.update"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/user_groups/{user_group_id}", {
      params: Type.Object({ user_group_id: IamUserGroupIdentifier }),
    })
      .response(IamApiResponseSingleId)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Remove User Group")
      .description("Remove a user group from an account.")
      .operationId("account-user-group-delete")
      .tag("Account User Groups")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.member.delete"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/user_groups/{user_group_id}/members", {
      params: Type.Object({ user_group_id: IamUserGroupIdentifier }),
      query: Type.Object({
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Maximum number of results per page.", default: 100, minimum: 1, maximum: 500 }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(IamResultInfo),
          result: Type.Optional(Type.Array(IamUserGroupMember)),
        }),
      )
      .error("4XX", IamApiResponseCommonFailure)
      .summary("List User Group Members")
      .description("List all the members attached to a user group.")
      .operationId("account-user-group-member-list")
      .tag("Account User Groups")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write", "Account Settings Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.member.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/user_groups/{user_group_id}/members", {
      params: Type.Object({ user_group_id: IamUserGroupIdentifier }),
      body: Type.Array(
        Type.Object({
          id: IamUserGroupMemberIdentifier,
        }),
      ),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(IamUserGroupMember),
        }),
      )
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Add User Group Members")
      .description("Add members to a User Group.")
      .operationId("account-user-group-member-create")
      .tag("Account User Groups")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.member.create"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/user_groups/{user_group_id}/members", {
      params: Type.Object({ user_group_id: IamUserGroupIdentifier }),
      body: Type.Array(
        Type.Object({
          id: IamUserGroupMemberIdentifier,
        }),
        { description: "Set/Replace members to a user group.", title: "Update User Group Members" },
      ),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(Type.Array(IamUserGroupMember)),
        }),
      )
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Update User Group Members")
      .description("Replace the set of members attached to a User Group.")
      .operationId("account-user-group-members-update")
      .tag("Account User Groups")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/user_groups/{user_group_id}/members/{member_id}", {
      params: Type.Object({ user_group_id: IamUserGroupIdentifier, member_id: IamUserGroupMemberIdentifier }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(IamUserGroupMember),
        }),
      )
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Remove User Group Member")
      .description("Remove a member from User Group")
      .operationId("account-user-group-member-delete")
      .tag("Account User Groups")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SCIM Provisioning", "Account Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.member.delete"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

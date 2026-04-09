import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  AaaAuditLogsResponseCollection,
  BillSubsApiBillingResponseSingle,
  BillSubsApiSchemasIdentifier,
  BillSubsApiSubscriptionV2,
  BillSubsApiUserSubscriptionResponseCollection,
  D1Messages,
  FirewallConfiguration,
  FirewallNotes,
  FirewallResultInfo,
  FirewallRuleIdentifier,
  FirewallSchemasMode,
  IamApiResponseCommonFailure,
  IamApiResponseSingleId,
  IamCollectionTokensResponse,
  IamCommonComponentsSchemasIdentifier,
  IamCountry,
  IamCreatePayload,
  IamFirstName,
  IamLastName,
  IamPermissionsGroupResponseCollection,
  IamResponseSingleValue,
  IamResultInfo,
  IamSingleTokenCreateResponse,
  IamSingleTokenResponse,
  IamTelephone,
  IamTokenBody,
  IamTokenIdentifier,
  IamTokenVerifyResponseSingleSegment,
  IamZipcode,
  LoadBalancerPool,
  LoadBalancingCheckRegions,
  LoadBalancingEnabled,
  LoadBalancingHealthDetails,
  LoadBalancingIdResponse,
  LoadBalancingIdentifier,
  LoadBalancingLatitude,
  LoadBalancingLoadShedding,
  LoadBalancingLongitude,
  LoadBalancingMinimumOrigins,
  LoadBalancingMonitorEditable,
  LoadBalancingMonitorGroupId,
  LoadBalancingMonitorId,
  LoadBalancingMonitorReferencesResponse,
  LoadBalancingMonitorResponseCollection,
  LoadBalancingMonitorResponseSingle,
  LoadBalancingName,
  LoadBalancingNetworks,
  LoadBalancingNotificationEmail,
  LoadBalancingNotificationFilter,
  LoadBalancingOriginSteering,
  LoadBalancingOrigins,
  LoadBalancingPoolsReferencesResponse,
  LoadBalancingPreviewResponse,
  LoadBalancingPreviewResultResponse,
  LoadBalancingResultInfo,
  LoadBalancingSchemasDescription,
  LoadBalancingSchemasDisabledAt,
  LoadBalancingSchemasIdResponse,
  LoadBalancingSchemasIdentifier,
  LoadBalancingSchemasResponseCollection,
  LoadBalancingSchemasSingleResponse,
  Result,
  UnnamedSchemaRef025497b7e63379c31929636b5186e45c,
} from "../shared/schemas"
import {
  BillSubsApiBillingHistoryCollection,
  BillSubsApiOccurredAt,
  BillSubsApiUserSubscriptionResponseSingle,
  FirewallRuleCollectionResponse,
  FirewallRuleSingleIdResponse,
  FirewallRuleSingleResponse,
  IamCollectionOrganizationResponse,
  IamInviteComponentsSchemasIdentifier,
  IamSchemasCollectionInviteResponse,
  IamSchemasName,
  IamSingleInviteResponse,
  IamSingleUserResponse,
  LoadBalancingComponentsSchemasResponseCollection,
  LoadBalancingOriginHealthy,
  LoadBalancingPoolName,
  LoadBalancingPreviewId,
  LoadBalancingUntil,
} from "./schemas"

export function registerUser(api: Api) {
  api.group("/user", (g) => {
    g.get("/", {
      responses: {
        200: IamSingleUserResponse,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("User Details")
      .operationId("user-user-details")
      .tag("User")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["User Details Write", "User Details Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.user.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/", {
      body: Type.Object({
        country: Type.Optional(IamCountry),
        first_name: Type.Optional(IamFirstName),
        last_name: Type.Optional(IamLastName),
        telephone: Type.Optional(IamTelephone),
        zipcode: Type.Optional(IamZipcode),
      }),
      responses: {
        200: IamSingleUserResponse,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Edit User")
      .description("Edit part of your user details.")
      .operationId("user-edit-user")
      .tag("User")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["User Details Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.user.update"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/audit_logs", {
      query: Type.Object({
        id: Type.Optional(Type.String({ description: "Finds a specific log by its ID." })),
        export: Type.Optional(
          Type.Boolean({ description: "Indicates that this request is an export of logs in CSV format." }),
        ),
        "action.type": Type.Optional(Type.String({ description: "Filters by the action type." })),
        "actor.ip": Type.Optional(
          Type.String({
            description:
              "Filters by the IP address of the request that made the change by specific IP address or valid CIDR Range.",
          }),
        ),
        "actor.email": Type.Optional(
          Type.String({
            description: "Filters by the email address of the actor that made the change.",
            format: "email",
          }),
        ),
        since: Type.Optional(
          Type.Union([
            Type.String({
              description:
                "Limits the returned results to logs newer than the specified date. A `full-date` that conforms to RFC3339.",
              format: "date",
              "x-stainless-variantName": "full_date",
            }),
            Type.String({
              description:
                "Limits the returned results to logs newer than the specified date. A `date-time` that conforms to RFC3339.",
              format: "date-time",
              "x-stainless-variantName": "date_time",
            }),
          ]),
        ),
        before: Type.Optional(
          Type.Union([
            Type.String({
              description:
                "Limits the returned results to logs older than the specified date. A `full-date` that conforms to RFC3339.",
              format: "date",
              "x-stainless-variantName": "full_date",
            }),
            Type.String({
              description:
                "Limits the returned results to logs older than the specified date. A `date-time` that conforms to RFC3339.",
              format: "date-time",
              "x-stainless-variantName": "date_time",
            }),
          ]),
        ),
        "zone.name": Type.Optional(
          Type.String({ description: "Filters by the name of the zone associated to the change." }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("desc"), Type.Literal("asc")], {
            description: "Changes the direction of the chronological sorting.",
          }),
        ),
        per_page: Type.Optional(
          Type.Number({
            description: "Sets the number of results to return per page.",
            default: 100,
            minimum: 1,
            maximum: 1000,
          }),
        ),
        page: Type.Optional(
          Type.Number({ description: "Defines which page of results to return.", default: 1, minimum: 1 }),
        ),
        hide_user_logs: Type.Optional(
          Type.Boolean({ description: "Indicates whether or not to hide user level audit logs.", default: false }),
        ),
      }),
      responses: {
        200: AaaAuditLogsResponseCollection,
        "4XX": Result,
      },
    })
      .summary("Get user audit logs")
      .description(
        "Gets a list of audit logs for a user account. Can be filtered by who made the change, on which zone, and the timeframe of the change.",
      )
      .operationId("audit-logs-get-user-audit-logs")
      .tag("Audit Logs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Settings Write", "Account Settings Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/billing/history", {
      query: Type.Object({
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Number of items per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal("type"), Type.Literal("occurred_at"), Type.Literal("action")], {
            description: "Field to order billing history by.",
          }),
        ),
        occurred_at: Type.Optional(BillSubsApiOccurredAt),
        type: Type.Optional(Type.String({ description: "The billing item type.", maxLength: 30 })),
        action: Type.Optional(Type.String({ description: "The billing item action.", maxLength: 30 })),
      }),
      responses: {
        200: BillSubsApiBillingHistoryCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result_info: Type.Optional(IamResultInfo),
        }),
      },
    })
      .summary("Billing History Details")
      .description("Accesses your billing history object.")
      .operationId("user-billing-history-(-deprecated)-billing-history-details")
      .tag("User Billing History")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Billing Write", "Billing Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#billing:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/billing/profile", {
      responses: {
        200: BillSubsApiBillingResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Billing Profile Details")
      .description("Accesses your billing profile object.")
      .operationId("user-billing-profile-(-deprecated)-billing-profile-details")
      .tag("User Billing Profile")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Billing Write", "Billing Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#billing:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/firewall/access_rules/rules", {
      query: Type.Object({
        mode: Type.Optional(FirewallSchemasMode),
        "configuration.target": Type.Optional(
          Type.Union([Type.Literal("ip"), Type.Literal("ip_range"), Type.Literal("asn"), Type.Literal("country")], {
            description: "Defines the target to search in existing rules.",
          }),
        ),
        "configuration.value": Type.Optional(
          Type.String({
            description:
              "Defines the target value to search for in existing rules: an IP address, an IP address range, or a country code, depending on the provided `configuration.target`.\nNotes: You can search for a single IPv4 address, an IP address range with a subnet of '/16' or '/24', or a two-letter ISO-3166-1 alpha-2 country code.",
          }),
        ),
        notes: Type.Optional(
          Type.String({
            description:
              "Defines the string to search for in the notes of existing IP Access rules.\nNotes: For example, the string 'attack' would match IP Access rules with notes 'Attack 26/02' and 'Attack 27/02'. The search is case insensitive.",
          }),
        ),
        match: Type.Optional(
          Type.Union([Type.Literal("any"), Type.Literal("all")], {
            description:
              "Defines the search requirements. When set to `all`, all the search requirements must match. When set to `any`, only one of the search requirements has to match.",
          }),
        ),
        page: Type.Optional(
          Type.Number({ description: "Defines the requested page within paginated list of results." }),
        ),
        per_page: Type.Optional(Type.Number({ description: "Defines the maximum number of results requested." })),
        order: Type.Optional(
          Type.Union(
            [Type.Literal("configuration.target"), Type.Literal("configuration.value"), Type.Literal("mode")],
            { description: "Defines the field used to sort returned rules." },
          ),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
            description: "Defines the direction used to sort returned rules.",
          }),
        ),
      }),
      responses: {
        200: FirewallRuleCollectionResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
          result_info: Type.Optional(FirewallResultInfo),
        }),
      },
    })
      .summary("List IP Access rules")
      .description("Fetches IP Access rules of the user. You can filter the results using several optional parameters.")
      .operationId("ip-access-rules-for-a-user-list-ip-access-rules")
      .tag("IP Access rules for a user")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Firewall Access Rules Write", "Account Firewall Access Rules Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/firewall/access_rules/rules", {
      body: Type.Object({
        configuration: FirewallConfiguration,
        mode: FirewallSchemasMode,
        notes: Type.Optional(FirewallNotes),
      }),
      responses: {
        200: FirewallRuleSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Create an IP Access rule")
      .description(
        "Creates a new IP Access rule for all zones owned by the current user.\n\nNote: To create an IP Access rule that applies to a specific zone, refer to the [IP Access rules for a zone](#ip-access-rules-for-a-zone) endpoints.",
      )
      .operationId("ip-access-rules-for-a-user-create-an-ip-access-rule")
      .tag("IP Access rules for a user")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Firewall Access Rules Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/firewall/access_rules/rules/{rule_id}", {
      params: Type.Object({ rule_id: FirewallRuleIdentifier }),
      body: Type.Object({
        mode: Type.Optional(FirewallSchemasMode),
        notes: Type.Optional(FirewallNotes),
      }),
      responses: {
        200: FirewallRuleSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Update an IP Access rule")
      .description(
        "Updates an IP Access rule defined at the user level. You can only update the rule action (`mode` parameter) and notes.",
      )
      .operationId("ip-access-rules-for-a-user-update-an-ip-access-rule")
      .tag("IP Access rules for a user")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Firewall Access Rules Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/firewall/access_rules/rules/{rule_id}", {
      params: Type.Object({ rule_id: FirewallRuleIdentifier }),
      responses: {
        200: FirewallRuleSingleIdResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Delete an IP Access rule")
      .description(
        "Deletes an IP Access rule at the user level.\n\nNote: Deleting a user-level rule will affect all zones owned by the user.",
      )
      .operationId("ip-access-rules-for-a-user-delete-an-ip-access-rule")
      .tag("IP Access rules for a user")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Firewall Access Rules Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/invites", {
      responses: {
        200: IamSchemasCollectionInviteResponse,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("List Invitations")
      .description("Lists all invitations associated with my user.")
      .operationId("user'-s-invites-list-invitations")
      .tag("User's Invites")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Memberships Write", "Memberships Read"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/invites/{invite_id}", {
      params: Type.Object({ invite_id: IamInviteComponentsSchemasIdentifier }),
      responses: {
        200: IamSingleInviteResponse,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Invitation Details")
      .description("Gets the details of an invitation.")
      .operationId("user'-s-invites-invitation-details")
      .tag("User's Invites")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Memberships Write", "Memberships Read"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.patch("/invites/{invite_id}", {
      params: Type.Object({ invite_id: IamInviteComponentsSchemasIdentifier }),
      body: Type.Object({
        status: Type.Union([Type.Literal("accepted"), Type.Literal("rejected")], {
          description: "Status of your response to the invitation (rejected or accepted).",
        }),
      }),
      responses: {
        200: IamSingleInviteResponse,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Respond to Invitation")
      .description("Responds to an invitation.")
      .operationId("user'-s-invites-respond-to-invitation")
      .tag("User's Invites")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Memberships Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/load_balancers/monitors", {
      responses: {
        200: LoadBalancingMonitorResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(LoadBalancingResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("List Monitors")
      .description("List configured monitors for a user.")
      .operationId("load-balancer-monitors-list-monitors")
      .tag("Load Balancer Monitors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Load Balancing: Monitors and Pools Write",
        "Load Balancing: Monitors and Pools Read",
      ])

    g.post("/load_balancers/monitors", {
      body: LoadBalancingMonitorEditable,
      responses: {
        200: LoadBalancingMonitorResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Create Monitor")
      .description("Create a configured monitor.")
      .operationId("load-balancer-monitors-create-monitor")
      .tag("Load Balancer Monitors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

    g.get("/load_balancers/monitors/{monitor_id}", {
      params: Type.Object({ monitor_id: LoadBalancingIdentifier }),
      responses: {
        200: LoadBalancingMonitorResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Monitor Details")
      .description("List a single configured monitor for a user.")
      .operationId("load-balancer-monitors-monitor-details")
      .tag("Load Balancer Monitors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Load Balancing: Monitors and Pools Write",
        "Load Balancing: Monitors and Pools Read",
      ])

    g.put("/load_balancers/monitors/{monitor_id}", {
      params: Type.Object({ monitor_id: LoadBalancingIdentifier }),
      body: LoadBalancingMonitorEditable,
      responses: {
        200: LoadBalancingMonitorResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Update Monitor")
      .description("Modify a configured monitor.")
      .operationId("load-balancer-monitors-update-monitor")
      .tag("Load Balancer Monitors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

    g.patch("/load_balancers/monitors/{monitor_id}", {
      params: Type.Object({ monitor_id: LoadBalancingIdentifier }),
      body: LoadBalancingMonitorEditable,
      responses: {
        200: LoadBalancingMonitorResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Patch Monitor")
      .description("Apply changes to an existing monitor, overwriting the supplied properties.")
      .operationId("load-balancer-monitors-patch-monitor")
      .tag("Load Balancer Monitors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

    g.delete("/load_balancers/monitors/{monitor_id}", {
      params: Type.Object({ monitor_id: LoadBalancingIdentifier }),
      responses: {
        200: LoadBalancingIdResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Delete Monitor")
      .description("Delete a configured monitor.")
      .operationId("load-balancer-monitors-delete-monitor")
      .tag("Load Balancer Monitors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

    g.post("/load_balancers/monitors/{monitor_id}/preview", {
      params: Type.Object({ monitor_id: LoadBalancingIdentifier }),
      body: LoadBalancingMonitorEditable,
      responses: {
        200: LoadBalancingPreviewResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: UnnamedSchemaRef025497b7e63379c31929636b5186e45c,
        }),
      },
    })
      .summary("Preview Monitor")
      .description(
        "Preview pools using the specified monitor with provided monitor details. The returned preview_id can be used in the preview endpoint to retrieve the results.",
      )
      .operationId("load-balancer-monitors-preview-monitor")
      .tag("Load Balancer Monitors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/load_balancers/monitors/{monitor_id}/references", {
      params: Type.Object({ monitor_id: LoadBalancingIdentifier }),
      responses: {
        200: LoadBalancingMonitorReferencesResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()], { description: "List of resources that reference a given monitor." }),
        }),
      },
    })
      .summary("List Monitor References")
      .description("Get the list of resources that reference the provided monitor.")
      .operationId("load-balancer-monitors-list-monitor-references")
      .tag("Load Balancer Monitors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Load Balancing: Monitors and Pools Write",
        "Load Balancing: Monitors and Pools Read",
      ])

    g.get("/load_balancers/pools", {
      query: Type.Object({
        monitor: Type.Optional(
          Type.String({
            description: "The ID of the Monitor to use for checking the health of origins within this pool.",
          }),
        ),
      }),
      responses: {
        200: LoadBalancingSchemasResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(LoadBalancingResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("List Pools")
      .description("List configured pools.")
      .operationId("load-balancer-pools-list-pools")
      .tag("Load Balancer Pools")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Load Balancing: Monitors and Pools Write",
        "Load Balancing: Monitors and Pools Read",
      ])

    g.post("/load_balancers/pools", {
      body: Type.Object({
        check_regions: Type.Optional(LoadBalancingCheckRegions),
        description: Type.Optional(LoadBalancingSchemasDescription),
        enabled: Type.Optional(LoadBalancingEnabled),
        latitude: Type.Optional(LoadBalancingLatitude),
        load_shedding: Type.Optional(LoadBalancingLoadShedding),
        longitude: Type.Optional(LoadBalancingLongitude),
        minimum_origins: Type.Optional(LoadBalancingMinimumOrigins),
        monitor: Type.Optional(LoadBalancingMonitorId),
        monitor_group: Type.Optional(LoadBalancingMonitorGroupId),
        name: LoadBalancingName,
        networks: Type.Optional(LoadBalancingNetworks),
        notification_email: Type.Optional(LoadBalancingNotificationEmail),
        notification_filter: Type.Optional(LoadBalancingNotificationFilter),
        origin_steering: Type.Optional(LoadBalancingOriginSteering),
        origins: LoadBalancingOrigins,
      }),
      responses: {
        200: LoadBalancingSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: LoadBalancerPool,
        }),
      },
    })
      .summary("Create Pool")
      .description("Create a new pool.")
      .operationId("load-balancer-pools-create-pool")
      .tag("Load Balancer Pools")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

    g.patch("/load_balancers/pools", {
      body: Type.String(),
      responses: {
        200: LoadBalancingSchemasResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(LoadBalancingResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Patch Pools")
      .description(
        "Apply changes to a number of existing pools, overwriting the supplied properties. Pools are ordered by ascending `name`. Returns the list of affected pools. Supports the standard pagination query parameters, either `limit`/`offset` or `per_page`/`page`.",
      )
      .operationId("load-balancer-pools-patch-pools")
      .tag("Load Balancer Pools")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

    g.get("/load_balancers/pools/{pool_id}", {
      params: Type.Object({ pool_id: LoadBalancingSchemasIdentifier }),
      responses: {
        200: LoadBalancingSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: LoadBalancerPool,
        }),
      },
    })
      .summary("Pool Details")
      .description("Fetch a single configured pool.")
      .operationId("load-balancer-pools-pool-details")
      .tag("Load Balancer Pools")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Load Balancing: Monitors and Pools Write",
        "Load Balancing: Monitors and Pools Read",
      ])

    g.put("/load_balancers/pools/{pool_id}", {
      params: Type.Object({ pool_id: LoadBalancingSchemasIdentifier }),
      body: Type.Object({
        check_regions: Type.Optional(LoadBalancingCheckRegions),
        description: Type.Optional(LoadBalancingSchemasDescription),
        disabled_at: Type.Optional(LoadBalancingSchemasDisabledAt),
        enabled: Type.Optional(LoadBalancingEnabled),
        latitude: Type.Optional(LoadBalancingLatitude),
        load_shedding: Type.Optional(LoadBalancingLoadShedding),
        longitude: Type.Optional(LoadBalancingLongitude),
        minimum_origins: Type.Optional(LoadBalancingMinimumOrigins),
        monitor: Type.Optional(LoadBalancingMonitorId),
        monitor_group: Type.Optional(LoadBalancingMonitorGroupId),
        name: LoadBalancingName,
        networks: Type.Optional(LoadBalancingNetworks),
        notification_email: Type.Optional(LoadBalancingNotificationEmail),
        notification_filter: Type.Optional(LoadBalancingNotificationFilter),
        origin_steering: Type.Optional(LoadBalancingOriginSteering),
        origins: LoadBalancingOrigins,
      }),
      responses: {
        200: LoadBalancingSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: LoadBalancerPool,
        }),
      },
    })
      .summary("Update Pool")
      .description("Modify a configured pool.")
      .operationId("load-balancer-pools-update-pool")
      .tag("Load Balancer Pools")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

    g.patch("/load_balancers/pools/{pool_id}", {
      params: Type.Object({ pool_id: LoadBalancingSchemasIdentifier }),
      body: Type.Object({
        check_regions: Type.Optional(LoadBalancingCheckRegions),
        description: Type.Optional(LoadBalancingSchemasDescription),
        disabled_at: Type.Optional(LoadBalancingSchemasDisabledAt),
        enabled: Type.Optional(LoadBalancingEnabled),
        latitude: Type.Optional(LoadBalancingLatitude),
        load_shedding: Type.Optional(LoadBalancingLoadShedding),
        longitude: Type.Optional(LoadBalancingLongitude),
        minimum_origins: Type.Optional(LoadBalancingMinimumOrigins),
        monitor: Type.Optional(LoadBalancingMonitorId),
        monitor_group: Type.Optional(LoadBalancingMonitorGroupId),
        name: Type.Optional(LoadBalancingName),
        notification_email: Type.Optional(LoadBalancingNotificationEmail),
        notification_filter: Type.Optional(LoadBalancingNotificationFilter),
        origin_steering: Type.Optional(LoadBalancingOriginSteering),
        origins: Type.Optional(LoadBalancingOrigins),
      }),
      responses: {
        200: LoadBalancingSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: LoadBalancerPool,
        }),
      },
    })
      .summary("Patch Pool")
      .description("Apply changes to an existing pool, overwriting the supplied properties.")
      .operationId("load-balancer-pools-patch-pool")
      .tag("Load Balancer Pools")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

    g.delete("/load_balancers/pools/{pool_id}", {
      params: Type.Object({ pool_id: LoadBalancingSchemasIdentifier }),
      responses: {
        200: LoadBalancingSchemasIdResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Delete Pool")
      .description("Delete a configured pool.")
      .operationId("load-balancer-pools-delete-pool")
      .tag("Load Balancer Pools")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

    g.get("/load_balancers/pools/{pool_id}/health", {
      params: Type.Object({ pool_id: LoadBalancingSchemasIdentifier }),
      responses: {
        200: LoadBalancingHealthDetails,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()], {
            description: "A list of regions from which to run health checks. Null means every Cloudflare data center.",
          }),
        }),
      },
    })
      .summary("Pool Health Details")
      .description("Fetch the latest pool health status for a single pool.")
      .operationId("load-balancer-pools-pool-health-details")
      .tag("Load Balancer Pools")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Load Balancing: Monitors and Pools Write",
        "Load Balancing: Monitors and Pools Read",
      ])

    g.post("/load_balancers/pools/{pool_id}/preview", {
      params: Type.Object({ pool_id: LoadBalancingSchemasIdentifier }),
      body: LoadBalancingMonitorEditable,
      responses: {
        200: LoadBalancingPreviewResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: UnnamedSchemaRef025497b7e63379c31929636b5186e45c,
        }),
      },
    })
      .summary("Preview Pool")
      .description(
        "Preview pool health using provided monitor details. The returned preview_id can be used in the preview endpoint to retrieve the results.",
      )
      .operationId("load-balancer-pools-preview-pool")
      .tag("Load Balancer Pools")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/load_balancers/pools/{pool_id}/references", {
      params: Type.Object({ pool_id: LoadBalancingSchemasIdentifier }),
      responses: {
        200: LoadBalancingPoolsReferencesResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()], { description: "List of resources that reference a given pool." }),
        }),
      },
    })
      .summary("List Pool References")
      .description("Get the list of resources that reference the provided pool.")
      .operationId("load-balancer-pools-list-pool-references")
      .tag("Load Balancer Pools")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Load Balancing: Monitors and Pools Write",
        "Load Balancing: Monitors and Pools Read",
      ])

    g.get("/load_balancers/preview/{preview_id}", {
      params: Type.Object({ preview_id: LoadBalancingPreviewId }),
      responses: {
        200: LoadBalancingPreviewResultResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()], { description: "Resulting health data from a preview operation." }),
        }),
      },
    })
      .summary("Preview Result")
      .description("Get the result of a previous preview operation using the provided preview_id.")
      .operationId("load-balancer-monitors-preview-result")
      .tag("Load Balancer Monitors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Load Balancing: Monitors and Pools Write",
        "Load Balancing: Monitors and Pools Read",
      ])

    g.get("/load_balancing_analytics/events", {
      query: Type.Object({
        until: Type.Optional(LoadBalancingUntil),
        pool_name: Type.Optional(LoadBalancingPoolName),
        origin_healthy: Type.Optional(LoadBalancingOriginHealthy),
        pool_id: Type.Optional(LoadBalancingSchemasIdentifier),
        since: Type.Optional(
          Type.String({
            description: "Start date and time of requesting data period in the ISO8601 format.",
            format: "date-time",
          }),
        ),
        origin_name: Type.Optional(Type.String({ description: "The name for the origin to filter." })),
        pool_healthy: Type.Optional(
          Type.Boolean({
            description:
              "If true, filter events where the pool status is healthy. If false, filter events where the pool status is unhealthy.",
            default: true,
          }),
        ),
      }),
      responses: {
        200: LoadBalancingComponentsSchemasResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(LoadBalancingResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("List Healthcheck Events")
      .description("List origin health changes.")
      .operationId("load-balancer-healthcheck-events-list-healthcheck-events")
      .tag("Load Balancer Healthcheck Events")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Load Balancing: Monitors and Pools Write",
        "Load Balancing: Monitors and Pools Read",
      ])

    g.get("/organizations", {
      query: Type.Object({
        name: Type.Optional(IamSchemasName),
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Number of organizations per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal("id"), Type.Literal("name"), Type.Literal("status")], {
            description: "Field to order organizations by.",
          }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Direction to order organizations." }),
        ),
        match: Type.Optional(
          Type.Union([Type.Literal("any"), Type.Literal("all")], {
            description: "Whether to match all search requirements or at least one (any).",
          }),
        ),
        status: Type.Optional(
          Type.Union([Type.Literal("member"), Type.Literal("invited")], {
            description: "Whether the user is a member of the organization or has an inivitation pending.",
          }),
        ),
      }),
      responses: {
        200: IamCollectionOrganizationResponse,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("List Organizations")
      .description("Lists organizations the user is associated with.")
      .operationId("user'-s-organizations-list-organizations")
      .tag("User's Organizations")
      .deprecated()
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Memberships Write", "Memberships Read"])
      .extension("x-cfDeprecation", {
        description:
          "This endpoint and its related APIs are deprecated in favor of the `/accounts` equivalent APIs, which have a broader range of features and are backwards compatible with these API.",
        display: true,
        eol: "2020-02-04",
        id: "org_deprecation",
      })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/organizations/{organization_id}", {
      params: Type.Object({ organization_id: IamCommonComponentsSchemasIdentifier }),
      responses: {
        200: Type.Unknown() /* unresolved: #/components/schemas/iam_single_organization_response */,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Organization Details")
      .description("Gets a specific organization the user is associated with.")
      .operationId("user'-s-organizations-organization-details")
      .tag("User's Organizations")
      .deprecated()
      .security({ api_email: [], api_key: [] })
      .extension("x-cfDeprecation", {
        description:
          "This endpoint and its related APIs are deprecated in favor of the `/accounts` equivalent APIs, which have a broader range of features and are backwards compatible with these API.",
        display: true,
        eol: "2020-02-04",
        id: "org_deprecation",
      })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/organizations/{organization_id}", {
      params: Type.Object({ organization_id: IamCommonComponentsSchemasIdentifier }),
      responses: {
        200: Type.Object({
          id: Type.Optional(IamCommonComponentsSchemasIdentifier),
        }),
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Leave Organization")
      .description("Removes association to an organization.")
      .operationId("user'-s-organizations-leave-organization")
      .tag("User's Organizations")
      .deprecated()
      .security({ api_email: [], api_key: [] })
      .extension("x-cfDeprecation", {
        description:
          "This endpoint and its related APIs are deprecated in favor of the `/accounts` equivalent APIs, which have a broader range of features and are backwards compatible with these API.",
        display: true,
        eol: "2020-02-04",
        id: "org_deprecation",
      })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/subscriptions", {
      responses: {
        200: BillSubsApiUserSubscriptionResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result_info: Type.Optional(IamResultInfo),
        }),
      },
    })
      .summary("Get User Subscriptions")
      .description("Lists all of a user's subscriptions.")
      .operationId("user-subscription-get-user-subscriptions")
      .tag("User Subscription")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Billing Write", "Billing Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#billing:read"] })

    g.put("/subscriptions/{identifier}", {
      params: Type.Object({ identifier: BillSubsApiSchemasIdentifier }),
      body: BillSubsApiSubscriptionV2,
      responses: {
        200: BillSubsApiUserSubscriptionResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Update User Subscription")
      .description("Updates a user's subscriptions.")
      .operationId("user-subscription-update-user-subscription")
      .tag("User Subscription")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Billing Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#billing:read", "#billing:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/subscriptions/{identifier}", {
      params: Type.Object({ identifier: BillSubsApiSchemasIdentifier }),
      responses: {
        200: Type.Object({
          subscription_id: Type.Optional(BillSubsApiSchemasIdentifier),
        }),
        "4XX": Type.Object({
          subscription_id: Type.Optional(BillSubsApiSchemasIdentifier),
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful" }),
        }),
      },
    })
      .summary("Delete User Subscription")
      .description("Deletes a user's subscription.")
      .operationId("user-subscription-delete-user-subscription")
      .tag("User Subscription")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Billing Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#billing:edit"] })

    g.get("/tokens", {
      query: Type.Object({
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Maximum number of results per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Direction to order results." }),
        ),
      }),
      responses: {
        200: IamCollectionTokensResponse,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("List Tokens")
      .description("List all access tokens you created.")
      .operationId("user-api-tokens-list-tokens")
      .tag("User API Tokens")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["API Tokens Write", "API Tokens Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.token.list"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/tokens", {
      body: IamCreatePayload,
      responses: {
        200: IamSingleTokenCreateResponse,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Create Token")
      .description("Create a new access token.")
      .operationId("user-api-tokens-create-token")
      .tag("User API Tokens")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["API Tokens Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.token.create"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/tokens/permission_groups", {
      query: Type.Object({
        name: Type.Optional(Type.String()),
        scope: Type.Optional(Type.String()),
      }),
      responses: {
        200: IamPermissionsGroupResponseCollection,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("List Token Permission Groups")
      .description("Find all available permission groups for API Tokens")
      .operationId("permission-groups-list-permission-groups")
      .tag("User API Tokens")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["API Tokens Write", "API Tokens Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.token.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/tokens/verify", {
      responses: {
        200: IamTokenVerifyResponseSingleSegment,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Verify Token")
      .description("Test whether a token works.")
      .operationId("user-api-tokens-verify-token")
      .tag("User API Tokens")
      .security({ api_token: [] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/tokens/{token_id}", {
      params: Type.Object({ token_id: IamTokenIdentifier }),
      responses: {
        200: IamSingleTokenResponse,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Token Details")
      .description("Get information about a specific token.")
      .operationId("user-api-tokens-token-details")
      .tag("User API Tokens")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["API Tokens Write", "API Tokens Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.token.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/tokens/{token_id}", {
      params: Type.Object({ token_id: IamTokenIdentifier }),
      body: IamTokenBody,
      responses: {
        200: IamSingleTokenResponse,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Update Token")
      .description("Update an existing token.")
      .operationId("user-api-tokens-update-token")
      .tag("User API Tokens")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["API Tokens Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.token.update"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/tokens/{token_id}", {
      params: Type.Object({ token_id: IamTokenIdentifier }),
      responses: {
        200: IamApiResponseSingleId,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Delete Token")
      .description("Destroy a token.")
      .operationId("user-api-tokens-delete-token")
      .tag("User API Tokens")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["API Tokens Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.token.delete"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/tokens/{token_id}/value", {
      params: Type.Object({ token_id: IamTokenIdentifier }),
      body: Type.Unknown(),
      responses: {
        200: IamResponseSingleValue,
        "4XX": IamApiResponseCommonFailure,
      },
    })
      .summary("Roll Token")
      .description("Roll the token secret.")
      .operationId("user-api-tokens-roll-token")
      .tag("User API Tokens")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["API Tokens Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.token.update"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

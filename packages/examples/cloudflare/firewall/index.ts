import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  D1Messages,
  FirewallAction,
  FirewallConfiguration,
  FirewallDescription,
  FirewallFilter,
  FirewallIdentifier,
  FirewallResultInfo,
  FirewallSchemasMode,
} from "../shared/schemas"
import {
  FirewallActionMode,
  FirewallApiResponseCollection,
  FirewallApiResponseSingle,
  FirewallComponentsSchemasIdentifier,
  FirewallComponentsSchemasMode,
  FirewallComponentsUaRuleId,
  FirewallConfigurations,
  FirewallDescriptionSearch,
  FirewallFilterRulesResponseCollection,
  FirewallFilterRulesSingleResponse,
  FirewallFirewallRulesComponentsSchemasId,
  FirewallFirewalluablockComponentsSchemasDescription,
  FirewallFirewalluablockResponseCollection,
  FirewallFirewalluablockResponseSingle,
  FirewallIpRangeSearch,
  FirewallIpSearch,
  FirewallLockdownsComponentsSchemasId,
  FirewallModifiedOn,
  FirewallOverrideResponseCollection,
  FirewallOverrideResponseSingle,
  FirewallOverridesId,
  FirewallPackage,
  FirewallPackageId,
  FirewallPackageResponseCollection,
  FirewallPackageResponseSingle,
  FirewallRewriteAction,
  FirewallRules,
  FirewallSchemasConfiguration,
  FirewallSchemasDescriptionSearch,
  FirewallSchemasPaused,
  FirewallSchemasPriority,
  FirewallSensitivity,
  FirewallUaConfiguration,
  FirewallUriSearch,
  FirewallUrls,
  FirewallZonelockdownResponseCollection,
  FirewallZonelockdownResponseSingle,
  WafManagedRulesAnomalyRule,
  WafManagedRulesComponentsSchemasIdentifier,
  WafManagedRulesIdentifier,
  WafManagedRulesMode,
  WafManagedRulesRuleGroupResponseCollection,
  WafManagedRulesRuleResponseCollection,
  WafManagedRulesRuleResponseSingle,
  WafManagedRulesTraditionalAllowRule,
  WafManagedRulesTraditionalDenyRule,
} from "./schemas"

export function registerFirewall(api: Api) {
  api.group("/zones/{zone_id}/firewall", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/lockdowns", {
      query: Type.Object({
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        description: Type.Optional(FirewallSchemasDescriptionSearch),
        modified_on: Type.Optional(FirewallModifiedOn),
        ip: Type.Optional(FirewallIpSearch),
        priority: Type.Optional(FirewallSchemasPriority),
        uri_search: Type.Optional(FirewallUriSearch),
        ip_range_search: Type.Optional(FirewallIpRangeSearch),
        per_page: Type.Optional(
          Type.Number({
            description:
              "The maximum number of results per page. You can only set the value to `1` or to a multiple of 5 such as `5`, `10`, `15`, or `20`.",
            default: 20,
            minimum: 1,
            maximum: 1000,
          }),
        ),
        created_on: Type.Optional(
          Type.String({ description: "The timestamp of when the rule was created.", format: "date-time" }),
        ),
        description_search: Type.Optional(
          Type.String({ description: "A string to search for in the description of existing rules." }),
        ),
        ip_search: Type.Optional(Type.String({ description: "A single IP address to search for in existing rules." })),
      }),
      responses: {
        200: FirewallZonelockdownResponseCollection,
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
      .summary("List Zone Lockdown rules")
      .description("Fetches Zone Lockdown rules. You can filter the results using several optional parameters.")
      .operationId("zone-lockdown-list-zone-lockdown-rules")
      .tag("Zone Lockdown")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write", "Firewall Services Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.post("/lockdowns", {
      body: Type.Object({
        configurations: FirewallConfigurations,
        description: Type.Optional(FirewallDescription),
        paused: Type.Optional(FirewallSchemasPaused),
        priority: Type.Optional(FirewallSchemasPriority),
        urls: FirewallUrls,
      }),
      responses: {
        200: FirewallZonelockdownResponseSingle,
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
      .summary("Create a Zone Lockdown rule")
      .description("Creates a new Zone Lockdown rule.")
      .operationId("zone-lockdown-create-a-zone-lockdown-rule")
      .tag("Zone Lockdown")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/lockdowns/{lock_downs_id}", {
      params: Type.Object({ lock_downs_id: FirewallLockdownsComponentsSchemasId }),
      responses: {
        200: FirewallZonelockdownResponseSingle,
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
      .summary("Get a Zone Lockdown rule")
      .description("Fetches the details of a Zone Lockdown rule.")
      .operationId("zone-lockdown-get-a-zone-lockdown-rule")
      .tag("Zone Lockdown")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write", "Firewall Services Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.put("/lockdowns/{lock_downs_id}", {
      params: Type.Object({ lock_downs_id: FirewallLockdownsComponentsSchemasId }),
      body: Type.Object({
        configurations: FirewallConfigurations,
        urls: FirewallUrls,
      }),
      responses: {
        200: FirewallZonelockdownResponseSingle,
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
      .summary("Update a Zone Lockdown rule")
      .description("Updates an existing Zone Lockdown rule.")
      .operationId("zone-lockdown-update-a-zone-lockdown-rule")
      .tag("Zone Lockdown")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.delete("/lockdowns/{lock_downs_id}", {
      params: Type.Object({ lock_downs_id: FirewallLockdownsComponentsSchemasId }),
      responses: {
        200: Type.Object({
          result: Type.Optional(
            Type.Object({
              id: Type.Optional(FirewallLockdownsComponentsSchemasId),
            }),
          ),
        }),
        "4XX": Type.Object({
          result: Type.Union([Type.Null()]),
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false)], { description: "Defines whether the API call was successful." }),
        }),
      },
    })
      .summary("Delete a Zone Lockdown rule")
      .description("Deletes an existing Zone Lockdown rule.")
      .operationId("zone-lockdown-delete-a-zone-lockdown-rule")
      .tag("Zone Lockdown")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/rules", {
      query: Type.Object({
        description: Type.Optional(
          Type.String({ description: "A case-insensitive string to find in the description." }),
        ),
        action: Type.Optional(Type.String({ description: "The action to search for. Must be an exact match." })),
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Number of firewall rules per page.", default: 25, minimum: 5, maximum: 100 }),
        ),
        id: Type.Optional(Type.String({ description: "The unique identifier of the firewall rule.", maxLength: 32 })),
        paused: Type.Optional(
          Type.Boolean({ description: "When true, indicates that the firewall rule is currently paused." }),
        ),
      }),
      responses: {
        200: FirewallFilterRulesResponseCollection,
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
      .summary("List firewall rules")
      .description("Fetches firewall rules in a zone. You can filter the results using several optional parameters.")
      .operationId("firewall-rules-list-firewall-rules")
      .tag("Firewall rules")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write", "Firewall Services Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/rules", {
      body: Type.Object({
        action: FirewallAction,
        filter: FirewallFilter,
      }),
      responses: {
        200: FirewallFilterRulesResponseCollection,
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
      .summary("Create firewall rules")
      .description("Create one or more firewall rules.")
      .operationId("firewall-rules-create-firewall-rules")
      .tag("Firewall rules")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/rules", {
      body: Type.Unknown(),
      responses: {
        200: FirewallFilterRulesResponseCollection,
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
      .summary("Update firewall rules")
      .description("Updates one or more existing firewall rules.")
      .operationId("firewall-rules-update-firewall-rules")
      .tag("Firewall rules")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/rules", {
      body: Type.Unknown(),
      responses: {
        200: FirewallFilterRulesResponseCollection,
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
      .summary("Update priority of firewall rules")
      .description("Updates the priority of existing firewall rules.")
      .operationId("firewall-rules-update-priority-of-firewall-rules")
      .tag("Firewall rules")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/rules", {
      responses: {
        200: FirewallFilterRulesResponseCollection,
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
      .summary("Delete firewall rules")
      .description("Deletes existing firewall rules.")
      .operationId("firewall-rules-delete-firewall-rules")
      .tag("Firewall rules")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/rules/{rule_id}", {
      params: Type.Object({ rule_id: FirewallFirewallRulesComponentsSchemasId }),
      responses: {
        200: FirewallFilterRulesSingleResponse,
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
      .summary("Get a firewall rule")
      .description("Fetches the details of a firewall rule.")
      .operationId("firewall-rules-get-a-firewall-rule")
      .tag("Firewall rules")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write", "Firewall Services Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/rules/{rule_id}", {
      params: Type.Object({ rule_id: FirewallFirewallRulesComponentsSchemasId }),
      body: Type.Object({
        action: FirewallAction,
        filter: FirewallFilter,
        id: FirewallComponentsSchemasIdentifier,
      }),
      responses: {
        200: FirewallFilterRulesSingleResponse,
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
      .summary("Update a firewall rule")
      .description("Updates an existing firewall rule.")
      .operationId("firewall-rules-update-a-firewall-rule")
      .tag("Firewall rules")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/rules/{rule_id}", {
      params: Type.Object({ rule_id: FirewallFirewallRulesComponentsSchemasId }),
      body: Type.Object({
        id: FirewallComponentsSchemasIdentifier,
      }),
      responses: {
        200: FirewallFilterRulesResponseCollection,
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
      .summary("Update priority of a firewall rule")
      .description("Updates the priority of an existing firewall rule.")
      .operationId("firewall-rules-update-priority-of-a-firewall-rule")
      .tag("Firewall rules")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/rules/{rule_id}", {
      params: Type.Object({ rule_id: FirewallFirewallRulesComponentsSchemasId }),
      responses: {
        200: FirewallFilterRulesSingleResponse,
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
      .summary("Delete a firewall rule")
      .description("Deletes an existing firewall rule.")
      .operationId("firewall-rules-delete-a-firewall-rule")
      .tag("Firewall rules")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/ua_rules", {
      query: Type.Object({
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        description: Type.Optional(FirewallDescriptionSearch),
        per_page: Type.Optional(
          Type.Number({
            description:
              "The maximum number of results per page. You can only set the value to `1` or to a multiple of 5 such as `5`, `10`, `15`, or `20`.",
            default: 20,
            minimum: 1,
            maximum: 1000,
          }),
        ),
        user_agent: Type.Optional(
          Type.String({ description: "A string to search for in the user agent values of existing rules." }),
        ),
        paused: Type.Optional(Type.Boolean({ description: "When true, indicates that the rule is currently paused." })),
      }),
      responses: {
        200: FirewallFirewalluablockResponseCollection,
        "4XX": Type.Object({
          result: Type.Union([Type.Null()]),
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
          result_info: Type.Optional(FirewallResultInfo),
        }),
      },
    })
      .summary("List User Agent Blocking rules")
      .description(
        "Fetches User Agent Blocking rules in a zone. You can filter the results using several optional parameters.",
      )
      .operationId("user-agent-blocking-rules-list-user-agent-blocking-rules")
      .tag("User Agent Blocking rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write", "Firewall Services Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/ua_rules", {
      body: Type.Object({
        configuration: FirewallUaConfiguration,
        description: Type.Optional(FirewallDescription),
        mode: FirewallSchemasMode,
        paused: Type.Optional(FirewallSchemasPaused),
      }),
      responses: {
        200: FirewallFirewalluablockResponseSingle,
        "4XX": Type.Object({
          result: Type.Union([Type.Null()]),
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Create a User Agent Blocking rule")
      .description("Creates a new User Agent Blocking rule in a zone.")
      .operationId("user-agent-blocking-rules-create-a-user-agent-blocking-rule")
      .tag("User Agent Blocking rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/ua_rules/{ua_rule_id}", {
      params: Type.Object({ ua_rule_id: FirewallComponentsUaRuleId }),
      responses: {
        200: FirewallFirewalluablockResponseSingle,
        "4XX": Type.Object({
          result: Type.Union([Type.Null()]),
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Get a User Agent Blocking rule")
      .description("Fetches the details of a User Agent Blocking rule.")
      .operationId("user-agent-blocking-rules-get-a-user-agent-blocking-rule")
      .tag("User Agent Blocking rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write", "Firewall Services Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/ua_rules/{ua_rule_id}", {
      params: Type.Object({ ua_rule_id: FirewallComponentsUaRuleId }),
      body: Type.Object({
        configuration: FirewallConfiguration,
        description: Type.Optional(FirewallDescription),
        id: FirewallComponentsSchemasIdentifier,
        mode: FirewallSchemasMode,
        paused: Type.Optional(FirewallSchemasPaused),
      }),
      responses: {
        200: FirewallFirewalluablockResponseSingle,
        "4XX": Type.Object({
          result: Type.Union([Type.Null()]),
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Update a User Agent Blocking rule")
      .description("Updates an existing User Agent Blocking rule.")
      .operationId("user-agent-blocking-rules-update-a-user-agent-blocking-rule")
      .tag("User Agent Blocking rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/ua_rules/{ua_rule_id}", {
      params: Type.Object({ ua_rule_id: FirewallComponentsUaRuleId }),
      responses: {
        200: Type.Object({
          result: Type.Object({
            id: Type.Optional(FirewallComponentsUaRuleId),
            configuration: Type.Optional(FirewallSchemasConfiguration),
            description: Type.Optional(FirewallFirewalluablockComponentsSchemasDescription),
            mode: Type.Optional(FirewallComponentsSchemasMode),
            paused: Type.Optional(FirewallSchemasPaused),
          }),
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
        }),
        "4XX": Type.Object({
          result: Type.Union([Type.Null()]),
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Delete a User Agent Blocking rule")
      .description("Deletes an existing User Agent Blocking rule.")
      .operationId("user-agent-blocking-rules-delete-a-user-agent-blocking-rule")
      .tag("User Agent Blocking rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/waf/overrides", {
      query: Type.Object({
        page: Type.Optional(
          Type.Number({ description: "The page number of paginated results.", default: 1, minimum: 1 }),
        ),
        per_page: Type.Optional(
          Type.Number({ description: "The number of WAF overrides per page.", default: 50, minimum: 5, maximum: 100 }),
        ),
      }),
      responses: {
        200: FirewallOverrideResponseCollection,
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
      .summary("List WAF overrides")
      .description(
        "Fetches the URI-based WAF overrides in a zone.\n\n**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).",
      )
      .operationId("waf-overrides-list-waf-overrides")
      .tag("WAF overrides")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/waf/overrides", {
      body: Type.Object({
        urls: FirewallUrls,
      }),
      responses: {
        200: FirewallOverrideResponseSingle,
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
      .summary("Create a WAF override")
      .description(
        "Creates a URI-based WAF override for a zone.\n\n**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).",
      )
      .operationId("waf-overrides-create-a-waf-override")
      .tag("WAF overrides")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/waf/overrides/{overrides_id}", {
      params: Type.Object({ overrides_id: FirewallOverridesId }),
      responses: {
        200: FirewallOverrideResponseSingle,
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
      .summary("Get a WAF override")
      .description(
        "Fetches the details of a URI-based WAF override.\n\n**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).",
      )
      .operationId("waf-overrides-get-a-waf-override")
      .tag("WAF overrides")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/waf/overrides/{overrides_id}", {
      params: Type.Object({ overrides_id: FirewallOverridesId }),
      body: Type.Object({
        id: FirewallIdentifier,
        rewrite_action: FirewallRewriteAction,
        rules: FirewallRules,
        urls: FirewallUrls,
      }),
      responses: {
        200: FirewallOverrideResponseSingle,
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
      .summary("Update WAF override")
      .description(
        "Updates an existing URI-based WAF override.\n\n**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).",
      )
      .operationId("waf-overrides-update-waf-override")
      .tag("WAF overrides")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/waf/overrides/{overrides_id}", {
      params: Type.Object({ overrides_id: FirewallOverridesId }),
      responses: {
        200: Type.Object({
          result: Type.Optional(
            Type.Object({
              id: Type.Optional(FirewallOverridesId),
            }),
          ),
        }),
        "4XX": Type.Object({
          result: Type.Union([Type.Null()]),
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false)], { description: "Defines whether the API call was successful." }),
        }),
      },
    })
      .summary("Delete a WAF override")
      .description(
        "Deletes an existing URI-based WAF override.\n\n**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).",
      )
      .operationId("waf-overrides-delete-a-waf-override")
      .tag("WAF overrides")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/waf/packages", {
      query: Type.Object({
        page: Type.Optional(
          Type.Number({ description: "The page number of paginated results.", default: 1, minimum: 1 }),
        ),
        per_page: Type.Optional(
          Type.Number({ description: "The number of packages per page.", default: 50, minimum: 5, maximum: 100 }),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal("name")], { description: "The field used to sort returned packages." }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
            description: "The direction used to sort returned packages.",
          }),
        ),
        match: Type.Optional(
          Type.Union([Type.Literal("any"), Type.Literal("all")], {
            description:
              "When set to `all`, all the search requirements must match. When set to `any`, only one of the search requirements has to match.",
          }),
        ),
        name: Type.Optional(Type.String({ description: "The name of the WAF package." })),
      }),
      responses: {
        200: FirewallPackageResponseCollection,
        "4XX": Type.Union([
          FirewallApiResponseCollection,
          Type.Object({
            result: Type.Optional(Type.Array(FirewallPackage)),
          }),
        ]),
      },
    })
      .summary("List WAF packages")
      .description(
        "Fetches WAF packages for a zone.\n\n**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).",
      )
      .operationId("waf-packages-list-waf-packages")
      .tag("WAF packages")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write", "Firewall Services Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/waf/packages/{package_id}", {
      params: Type.Object({ package_id: FirewallPackageId }),
      responses: {
        200: FirewallPackageResponseSingle,
        "4XX": Type.Union([
          FirewallApiResponseSingle,
          Type.Object({
            result: Type.Optional(Type.Unknown()),
          }),
        ]),
      },
    })
      .summary("Get a WAF package")
      .description(
        "Fetches the details of a WAF package.\n\n**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).",
      )
      .operationId("waf-packages-get-a-waf-package")
      .tag("WAF packages")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write", "Firewall Services Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.patch("/waf/packages/{package_id}", {
      params: Type.Object({ package_id: FirewallPackageId }),
      body: Type.Object({
        action_mode: Type.Optional(FirewallActionMode),
        sensitivity: Type.Optional(FirewallSensitivity),
      }),
      responses: {
        200: Type.Union([
          FirewallApiResponseSingle,
          Type.Object({
            result: Type.Optional(Type.Unknown()),
          }),
        ]),
        "4XX": Type.Union([
          FirewallApiResponseSingle,
          Type.Object({
            result: Type.Optional(Type.Unknown()),
          }),
        ]),
      },
    })
      .summary("Update a WAF package")
      .description(
        "Updates a WAF package. You can update the sensitivity and the action of an anomaly detection WAF package.\n\n**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).",
      )
      .operationId("waf-packages-update-a-waf-package")
      .tag("WAF packages")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/waf/packages/{package_id}/groups", {
      params: Type.Object({ package_id: WafManagedRulesIdentifier }),
      query: Type.Object({
        mode: Type.Optional(WafManagedRulesMode),
        page: Type.Optional(
          Type.Number({ description: "Defines the page number of paginated results.", default: 1, minimum: 1 }),
        ),
        per_page: Type.Optional(
          Type.Number({
            description: "Defines the number of rule groups per page.",
            default: 50,
            minimum: 5,
            maximum: 100,
          }),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal("mode"), Type.Literal("rules_count")], {
            description: "Defines the field used to sort returned rule groups.",
          }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
            description: "Defines the direction used to sort returned rule groups.",
          }),
        ),
        match: Type.Optional(
          Type.Union([Type.Literal("any"), Type.Literal("all")], {
            description:
              "Defines the condition for search requirements. When set to `all`, all the search requirements must match. When set to `any`, only one of the search requirements has to match.",
          }),
        ),
        name: Type.Optional(Type.String({ description: "Defines the name of the rule group." })),
        rules_count: Type.Optional(
          Type.Number({ description: "Defines the number of rules in the current rule group.", default: 0 }),
        ),
      }),
      responses: {
        200: WafManagedRulesRuleGroupResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
          result_info: Type.Optional(FirewallResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("List WAF rule groups")
      .description(
        "Fetches the WAF rule groups in a WAF package.\n\n**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).",
      )
      .operationId("waf-rule-groups-list-waf-rule-groups")
      .tag("WAF rule groups")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write", "Firewall Services Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/waf/packages/{package_id}/groups/{group_id}", {
      params: Type.Object({ group_id: WafManagedRulesIdentifier, package_id: WafManagedRulesIdentifier }),
      responses: {
        200: WafManagedRulesRuleResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Get a WAF rule group")
      .description(
        "Fetches the details of a WAF rule group.\n\n**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).",
      )
      .operationId("waf-rule-groups-get-a-waf-rule-group")
      .tag("WAF rule groups")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write", "Firewall Services Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.patch("/waf/packages/{package_id}/groups/{group_id}", {
      params: Type.Object({ group_id: WafManagedRulesIdentifier, package_id: WafManagedRulesIdentifier }),
      body: Type.Object({
        mode: Type.Optional(WafManagedRulesMode),
      }),
      responses: {
        200: WafManagedRulesRuleResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Update a WAF rule group")
      .description(
        "Updates a WAF rule group. You can update the state (`mode` parameter) of a rule group.\n\n**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).",
      )
      .operationId("waf-rule-groups-update-a-waf-rule-group")
      .tag("WAF rule groups")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/waf/packages/{package_id}/rules", {
      params: Type.Object({ package_id: WafManagedRulesIdentifier }),
      query: Type.Object({
        mode: Type.Optional(
          Type.Union([Type.Literal("DIS"), Type.Literal("CHL"), Type.Literal("BLK"), Type.Literal("SIM")], {
            description: "Defines the action/mode a rule has been overridden to perform.",
          }),
        ),
        group_id: Type.Optional(WafManagedRulesComponentsSchemasIdentifier),
        page: Type.Optional(
          Type.Number({ description: "Defines the page number of paginated results.", default: 1, minimum: 1 }),
        ),
        per_page: Type.Optional(
          Type.Number({ description: "Defines the number of rules per page.", default: 50, minimum: 5, maximum: 100 }),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal("priority"), Type.Literal("group_id"), Type.Literal("description")], {
            description: "Defines the field used to sort returned rules.",
          }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
            description: "Defines the direction used to sort returned rules.",
          }),
        ),
        match: Type.Optional(
          Type.Union([Type.Literal("any"), Type.Literal("all")], {
            description:
              "Defines the search requirements. When set to `all`, all the search requirements must match. When set to `any`, only one of the search requirements has to match.",
          }),
        ),
        description: Type.Optional(Type.String({ description: "Defines the public description of the WAF rule." })),
        priority: Type.Optional(
          Type.String({
            description: "Defines the order in which the individual WAF rule is executed within its rule group.",
          }),
        ),
      }),
      responses: {
        200: WafManagedRulesRuleResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
          result_info: Type.Optional(FirewallResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("List WAF rules")
      .description(
        "Fetches WAF rules in a WAF package.\n\n**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).",
      )
      .operationId("waf-rules-list-waf-rules")
      .tag("WAF rules")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write", "Firewall Services Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/waf/packages/{package_id}/rules/{rule_id}", {
      params: Type.Object({ rule_id: WafManagedRulesIdentifier, package_id: WafManagedRulesIdentifier }),
      responses: {
        200: WafManagedRulesRuleResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Get a WAF rule")
      .description(
        "Fetches the details of a WAF rule in a WAF package.\n\n**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).",
      )
      .operationId("waf-rules-get-a-waf-rule")
      .tag("WAF rules")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write", "Firewall Services Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.patch("/waf/packages/{package_id}/rules/{rule_id}", {
      params: Type.Object({ rule_id: WafManagedRulesIdentifier, package_id: WafManagedRulesIdentifier }),
      body: Type.Object({
        mode: Type.Optional(
          Type.Union(
            [
              Type.Literal("default"),
              Type.Literal("disable"),
              Type.Literal("simulate"),
              Type.Literal("block"),
              Type.Literal("challenge"),
              Type.Literal("on"),
              Type.Literal("off"),
            ],
            {
              description:
                "Defines the mode/action of the rule when triggered. You must use a value from the `allowed_modes` array of the current rule.",
            },
          ),
        ),
      }),
      responses: {
        200: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
          result: Type.Union([
            WafManagedRulesAnomalyRule,
            WafManagedRulesTraditionalDenyRule,
            WafManagedRulesTraditionalAllowRule,
          ]),
        }),
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
          result: Type.Union([
            WafManagedRulesAnomalyRule,
            WafManagedRulesTraditionalDenyRule,
            WafManagedRulesTraditionalAllowRule,
          ]),
        }),
      },
    })
      .summary("Update a WAF rule")
      .description(
        "Updates a WAF rule. You can only update the mode/action of the rule.\n\n**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).",
      )
      .operationId("waf-rules-update-a-waf-rule")
      .tag("WAF rules")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })
  })
}

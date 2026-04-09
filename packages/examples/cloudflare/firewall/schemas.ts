import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  D1Messages,
  FirewallFilter,
  FirewallFiltersComponentsSchemasId,
  FirewallIdentifier,
  FirewallResultInfo,
} from "../shared/schemas"

export const WafManagedRulesSchemasDescription = named(
  "waf-managed-rules_schemas-description",
  Type.String({ description: "Defines the public description of the WAF rule.", readOnly: true, "x-auditable": true }),
)

export const WafManagedRulesComponentsSchemasIdentifier = named(
  "waf-managed-rules_components-schemas-identifier",
  Type.String({ description: "Defines the unique identifier of the rule group.", maxLength: 32, "x-auditable": true }),
)

export const WafManagedRulesName = named(
  "waf-managed-rules_name",
  Type.String({ description: "Defines the name of the rule group.", readOnly: true, "x-auditable": true }),
)

export const UnnamedSchemaRef532d8b97684c9032dd36bae8acddebf5 = named(
  "unnamed_schema_ref_532d8b97684c9032dd36bae8acddebf5",
  Type.Object(
    {
      id: Type.Optional(WafManagedRulesComponentsSchemasIdentifier),
      name: Type.Optional(WafManagedRulesName),
    },
    { description: "Defines the rule group to which the current WAF rule belongs." },
  ),
)

export const WafManagedRulesRuleComponentsSchemasIdentifier = named(
  "waf-managed-rules_rule_components-schemas-identifier",
  Type.String({
    description: "Defines the unique identifier of the WAF rule.",
    maxLength: 32,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const WafManagedRulesIdentifier = named(
  "waf-managed-rules_identifier",
  Type.String({ description: "Defines the unique identifier of a WAF package.", maxLength: 32, "x-auditable": true }),
)

export const WafManagedRulesPriority = named(
  "waf-managed-rules_priority",
  Type.String({
    description: "Defines the order in which the individual WAF rule is executed within its rule group.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const WafManagedRulesModeAllowTraditional = named(
  "waf-managed-rules_mode_allow_traditional",
  Type.Union([Type.Literal("on"), Type.Literal("off")], {
    description:
      "When set to `on`, the current rule will be used when evaluating the request. Applies to traditional (allow) WAF rules.",
    "x-auditable": true,
  }),
)

export const WafManagedRulesAllowedModesAllowTraditional = named(
  "waf-managed-rules_allowed_modes_allow_traditional",
  Type.Array(WafManagedRulesModeAllowTraditional, {
    description: "Defines the available modes for the current WAF rule.",
    readOnly: true,
  }),
)

export const WafManagedRulesTraditionalAllowRule = named(
  "waf-managed-rules_traditional_allow_rule",
  Type.Object(
    {
      description: WafManagedRulesSchemasDescription,
      group: UnnamedSchemaRef532d8b97684c9032dd36bae8acddebf5,
      id: WafManagedRulesRuleComponentsSchemasIdentifier,
      package_id: WafManagedRulesIdentifier,
      priority: WafManagedRulesPriority,
      allowed_modes: WafManagedRulesAllowedModesAllowTraditional,
      mode: WafManagedRulesModeAllowTraditional,
    },
    {
      description:
        "When triggered, traditional WAF rules cause the firewall to immediately act on the request based on the rule configuration. An 'allow' rule will immediately allow the request and no other rules will be processed.",
    },
  ),
)

export const WafManagedRulesModeDenyTraditional = named(
  "waf-managed-rules_mode_deny_traditional",
  Type.Union(
    [
      Type.Literal("default"),
      Type.Literal("disable"),
      Type.Literal("simulate"),
      Type.Literal("block"),
      Type.Literal("challenge"),
    ],
    {
      description:
        "Defines the action that the current WAF rule will perform when triggered. Applies to traditional (deny) WAF rules.",
      "x-auditable": true,
    },
  ),
)

export const WafManagedRulesAllowedModesDenyTraditional = named(
  "waf-managed-rules_allowed_modes_deny_traditional",
  Type.Array(WafManagedRulesModeDenyTraditional, {
    description: "Defines the list of possible actions of the WAF rule when it is triggered.",
    readOnly: true,
  }),
)

export const WafManagedRulesDefaultMode = named(
  "waf-managed-rules_default_mode",
  Type.Union([Type.Literal("disable"), Type.Literal("simulate"), Type.Literal("block"), Type.Literal("challenge")], {
    description: "Defines the default action/mode of a rule.",
  }),
)

export const WafManagedRulesTraditionalDenyRule = named(
  "waf-managed-rules_traditional_deny_rule",
  Type.Object(
    {
      description: WafManagedRulesSchemasDescription,
      group: UnnamedSchemaRef532d8b97684c9032dd36bae8acddebf5,
      id: WafManagedRulesRuleComponentsSchemasIdentifier,
      package_id: WafManagedRulesIdentifier,
      priority: WafManagedRulesPriority,
      allowed_modes: WafManagedRulesAllowedModesDenyTraditional,
      default_mode: WafManagedRulesDefaultMode,
      mode: WafManagedRulesModeDenyTraditional,
    },
    {
      description:
        "When triggered, traditional WAF rules cause the firewall to immediately act upon the request based on the configuration of the rule. A 'deny' rule will immediately respond to the request based on the configured rule action/mode (for example, 'block') and no other rules will be processed.",
    },
  ),
)

export const WafManagedRulesModeAnomaly = named(
  "waf-managed-rules_mode_anomaly",
  Type.Union([Type.Literal("on"), Type.Literal("off")], {
    description:
      "Defines the mode anomaly. When set to `on`, the current WAF rule will be used when evaluating the request. Applies to anomaly detection WAF rules.",
    "x-auditable": true,
  }),
)

export const WafManagedRulesAllowedModesAnomaly = named(
  "waf-managed-rules_allowed_modes_anomaly",
  Type.Array(WafManagedRulesModeAnomaly, {
    description: "Defines the available modes for the current WAF rule. Applies to anomaly detection WAF rules.",
    readOnly: true,
  }),
)

export const WafManagedRulesAnomalyRule = named(
  "waf-managed-rules_anomaly_rule",
  Type.Object(
    {
      description: WafManagedRulesSchemasDescription,
      group: UnnamedSchemaRef532d8b97684c9032dd36bae8acddebf5,
      id: WafManagedRulesRuleComponentsSchemasIdentifier,
      package_id: WafManagedRulesIdentifier,
      priority: WafManagedRulesPriority,
      allowed_modes: WafManagedRulesAllowedModesAnomaly,
      mode: WafManagedRulesModeAnomaly,
    },
    {
      description:
        "When triggered, anomaly detection WAF rules contribute to an overall threat score that will determine if a request is considered malicious. You can configure the total scoring threshold through the 'sensitivity' property of the WAF package.",
    },
  ),
)

export const WafManagedRulesRuleResponseSingle = named(
  "waf-managed-rules_rule_response_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
    result: Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])]),
  }),
)

export const WafManagedRulesRule = named(
  "waf-managed-rules_rule",
  Type.Union([WafManagedRulesAnomalyRule, WafManagedRulesTraditionalDenyRule, WafManagedRulesTraditionalAllowRule]),
)

export const WafManagedRulesRuleResponseCollection = named(
  "waf-managed-rules_rule_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
    result_info: Type.Optional(FirewallResultInfo),
    result: Type.Array(WafManagedRulesRule),
  }),
)

export const WafManagedRulesMode = named(
  "waf-managed-rules_mode",
  Type.Union([Type.Literal("on"), Type.Literal("off")], {
    description:
      "Defines the state of the rules contained in the rule group. When `on`, the rules in the group are configurable/usable.",
    "x-auditable": true,
  }),
)

export const WafManagedRulesSchemasIdentifier = named(
  "waf-managed-rules_schemas-identifier",
  Type.String({ description: "Defines an identifier of a schema.", maxLength: 32, "x-auditable": true }),
)

export const WafManagedRulesDescription = named(
  "waf-managed-rules_description",
  Type.Union([
    Type.String({
      description: "Defines an informative summary of what the rule group does.",
      readOnly: true,
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const WafManagedRulesModifiedRulesCount = named(
  "waf-managed-rules_modified_rules_count",
  Type.Number({
    description:
      "Defines the number of rules within the group that have been modified from their default configuration.",
    default: 0,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const WafManagedRulesRulesCount = named(
  "waf-managed-rules_rules_count",
  Type.Number({
    description: "Defines the number of rules in the current rule group.",
    default: 0,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const WafManagedRulesAllowedModes = named(
  "waf-managed-rules_allowed_modes",
  Type.Array(WafManagedRulesMode, { description: "Defines the available states for the rule group.", readOnly: true }),
)

export const WafManagedRulesSchemasGroup = named(
  "waf-managed-rules_schemas-group",
  Type.Object({
    description: WafManagedRulesDescription,
    id: WafManagedRulesComponentsSchemasIdentifier,
    modified_rules_count: Type.Optional(WafManagedRulesModifiedRulesCount),
    name: WafManagedRulesName,
    package_id: Type.Optional(WafManagedRulesIdentifier),
    rules_count: WafManagedRulesRulesCount,
    allowed_modes: Type.Optional(WafManagedRulesAllowedModes),
    mode: WafManagedRulesMode,
  }),
)

export const WafManagedRulesRuleGroupResponseCollection = named(
  "waf-managed-rules_rule_group_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
    result_info: Type.Optional(FirewallResultInfo),
    result: Type.Array(WafManagedRulesSchemasGroup),
  }),
)

export const FirewallStatus = named(
  "firewall_status",
  Type.Union([Type.Literal("active")], {
    description: "When set to `active`, indicates that the WAF package will be applied to the zone.",
  }),
)

export const FirewallActionMode = named(
  "firewall_action_mode",
  Type.Union([Type.Literal("simulate"), Type.Literal("block"), Type.Literal("challenge")], {
    description: "The default action performed by the rules in the WAF package.",
  }),
)

export const FirewallSensitivity = named(
  "firewall_sensitivity",
  Type.Union([Type.Literal("high"), Type.Literal("medium"), Type.Literal("low"), Type.Literal("off")], {
    description: "The sensitivity of the WAF package.",
  }),
)

export const FirewallAnomalyPackage = named(
  "firewall_anomaly_package",
  Type.Object({
    description: Type.String({ description: "A summary of the purpose/function of the WAF package.", readOnly: true }),
    detection_mode: Type.Union([Type.Literal("anomaly"), Type.Literal("traditional")], {
      description:
        "When a WAF package uses anomaly detection, each rule is given a score when triggered. If the total score of all triggered rules exceeds the sensitivity defined on the WAF package, the action defined on the package will be taken.",
    }),
    id: FirewallIdentifier,
    name: Type.String({ description: "The name of the WAF package.", readOnly: true }),
    status: Type.Optional(FirewallStatus),
    zone_id: FirewallIdentifier,
    action_mode: Type.Optional(FirewallActionMode),
    sensitivity: Type.Optional(FirewallSensitivity),
  }),
)

export const FirewallPackageId = named(
  "firewall_package_id",
  Type.String({ description: "Defines a package identifier.", maxLength: 32, readOnly: true }),
)

export const FirewallApiResponseSingle = named(
  "firewall_api-response-single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])]),
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const FirewallPackageResponseSingle = named(
  "firewall_package_response_single",
  Type.Union([
    FirewallApiResponseSingle,
    Type.Object({
      result: Type.Optional(Type.Unknown()),
    }),
  ]),
)

export const FirewallSchemasDescription = named(
  "firewall_schemas-description",
  Type.String({ description: "A summary of the purpose/function of the WAF package.", readOnly: true }),
)

export const FirewallDetectionMode = named(
  "firewall_detection_mode",
  Type.Union([Type.Literal("anomaly"), Type.Literal("traditional")], {
    description:
      "The mode that defines how rules within the package are evaluated during the course of a request. When a package uses anomaly detection mode (`anomaly` value), each rule is given a score when triggered. If the total score of all triggered rules exceeds the sensitivity defined in the WAF package, the action configured in the package will be performed. Traditional detection mode (`traditional` value) will decide the action to take when it is triggered by the request. If multiple rules are triggered, the action providing the highest protection will be applied (for example, a 'block' action will win over a 'challenge' action).",
  }),
)

export const FirewallName = named(
  "firewall_name",
  Type.String({ description: "The name of the WAF package.", readOnly: true }),
)

export const FirewallPackageDefinition = named(
  "firewall_package_definition",
  Type.Object({
    description: FirewallSchemasDescription,
    detection_mode: FirewallDetectionMode,
    id: FirewallIdentifier,
    name: FirewallName,
    status: Type.Optional(FirewallStatus),
    zone_id: FirewallIdentifier,
  }),
)

export const FirewallPackage = named(
  "firewall_package",
  Type.Union([FirewallPackageDefinition, FirewallAnomalyPackage]),
)

export const FirewallApiResponseCollection = named(
  "firewall_api-response-collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(Type.Unknown()), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
    result_info: Type.Optional(FirewallResultInfo),
  }),
)

export const FirewallPackageResponseCollection = named(
  "firewall_package_response_collection",
  Type.Union([
    FirewallApiResponseCollection,
    Type.Object({
      result: Type.Optional(Type.Array(FirewallPackage)),
    }),
  ]),
)

export const FirewallWafAction = named(
  "firewall_waf_action",
  Type.Union(
    [
      Type.Literal("challenge"),
      Type.Literal("block"),
      Type.Literal("simulate"),
      Type.Literal("disable"),
      Type.Literal("default"),
    ],
    { description: "The WAF rule action to apply." },
  ),
)

export const FirewallRules = named("firewall_rules", Type.Record(Type.String(), FirewallWafAction))

export const FirewallWafRewriteAction = named(
  "firewall_waf_rewrite_action",
  Type.Union(
    [
      Type.Literal("challenge"),
      Type.Literal("block"),
      Type.Literal("simulate"),
      Type.Literal("disable"),
      Type.Literal("default"),
    ],
    { description: "The WAF rule action to apply.", "x-auditable": true },
  ),
)

export const FirewallRewriteAction = named(
  "firewall_rewrite_action",
  Type.Object(
    {
      block: Type.Optional(FirewallWafRewriteAction),
      challenge: Type.Optional(FirewallWafRewriteAction),
      default: Type.Optional(FirewallWafRewriteAction),
      disable: Type.Optional(FirewallWafRewriteAction),
      simulate: Type.Optional(FirewallWafRewriteAction),
    },
    {
      description:
        "Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object.",
    },
  ),
)

export const FirewallPriority = named(
  "firewall_priority",
  Type.Number({
    description:
      "The relative priority of the current URI-based WAF override when multiple overrides match a single URL. A lower number indicates higher priority. Higher priority overrides may overwrite values set by lower priority overrides.",
    minimum: -1000000000,
    maximum: 1000000000,
    "x-auditable": true,
  }),
)

export const FirewallPaused = named(
  "firewall_paused",
  Type.Boolean({ description: "When true, indicates that the rule is currently paused.", "x-auditable": true }),
)

export const FirewallOverridesId = named(
  "firewall_overrides-id",
  Type.String({
    description: "The unique identifier of the WAF override.",
    maxLength: 32,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const FirewallGroups = named("firewall_groups", Type.Record(Type.String(), Type.Unknown()))

export const FirewallComponentsSchemasDescription = named(
  "firewall_components-schemas-description",
  Type.Union([
    Type.String({
      description: "An informative summary of the current URI-based WAF override.",
      maxLength: 1024,
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const FirewallUrls = named(
  "firewall_urls",
  Type.Array(Type.String({ "x-auditable": true }), {
    description:
      "The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.",
  }),
)

export const FirewallOverride = named(
  "firewall_override",
  Type.Object({
    description: Type.Optional(FirewallComponentsSchemasDescription),
    groups: Type.Optional(FirewallGroups),
    id: Type.Optional(FirewallOverridesId),
    paused: Type.Optional(FirewallPaused),
    priority: Type.Optional(FirewallPriority),
    rewrite_action: Type.Optional(FirewallRewriteAction),
    rules: Type.Optional(FirewallRules),
    urls: Type.Optional(FirewallUrls),
  }),
)

export const FirewallOverrideResponseSingle = named(
  "firewall_override_response_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: FirewallOverride,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const FirewallOverrideResponseCollection = named(
  "firewall_override_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(FirewallOverride), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
    result_info: Type.Optional(FirewallResultInfo),
  }),
)

export const FirewallComponentsSchemasMode = named(
  "firewall_components-schemas-mode",
  Type.Union(
    [Type.Literal("block"), Type.Literal("challenge"), Type.Literal("js_challenge"), Type.Literal("managed_challenge")],
    { description: "The action to apply to a matched request." },
  ),
)

export const FirewallComponentsUaRuleId = named(
  "firewall_components-ua-rule-id",
  Type.String({
    description: "The unique identifier of the User Agent Blocking rule.",
    maxLength: 32,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const FirewallFirewalluablockComponentsSchemasDescription = named(
  "firewall_firewalluablock_components-schemas-description",
  Type.String({ description: "An informative summary of the rule.", maxLength: 1024 }),
)

export const FirewallSchemasConfiguration = named(
  "firewall_schemas-configuration",
  Type.Object(
    {
      target: Type.Optional(
        Type.String({
          description:
            "The configuration target for this rule. You must set the target to `ua` for User Agent Blocking rules.",
        }),
      ),
      value: Type.Optional(
        Type.String({
          description:
            "The exact user agent string to match. This value will be compared to the received `User-Agent` HTTP header value.",
        }),
      ),
    },
    { description: "The configuration object for the current rule." },
  ),
)

export const FirewallSchemasPaused = named(
  "firewall_schemas-paused",
  Type.Boolean({
    description: "When true, indicates that the rule is currently paused.",
    default: false,
    "x-auditable": true,
  }),
)

export const FirewallFirewalluablock = named(
  "firewall_firewalluablock",
  Type.Object({
    configuration: Type.Optional(FirewallSchemasConfiguration),
    description: Type.Optional(FirewallFirewalluablockComponentsSchemasDescription),
    id: Type.Optional(FirewallComponentsUaRuleId),
    mode: Type.Optional(FirewallComponentsSchemasMode),
    paused: Type.Optional(FirewallSchemasPaused),
  }),
)

export const FirewallFirewalluablockResponseSingle = named(
  "firewall_firewalluablock_response_single",
  Type.Object({
    result: FirewallFirewalluablock,
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const FirewallUaConfiguration = named(
  "firewall_ua_configuration",
  Type.Object({
    target: Type.Optional(
      Type.Union([Type.Literal("ua")], {
        description:
          "The configuration target. You must set the target to `ua` when specifying a user agent in the rule.",
      }),
    ),
    value: Type.Optional(Type.String({ description: "the user agent to exactly match", "x-auditable": true })),
  }),
)

export const FirewallDescriptionSearch = named(
  "firewall_description_search",
  Type.String({ description: "A string to search for in the description of existing rules.", "x-auditable": true }),
)

export const FirewallFirewalluablockResponseCollection = named(
  "firewall_firewalluablock_response_collection",
  Type.Object({
    result: Type.Array(FirewallFirewalluablock),
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
    result_info: Type.Optional(FirewallResultInfo),
  }),
)

export const FirewallSchemasAction = named(
  "firewall_schemas-action",
  Type.Union(
    [
      Type.Literal("block"),
      Type.Literal("challenge"),
      Type.Literal("js_challenge"),
      Type.Literal("managed_challenge"),
      Type.Literal("allow"),
      Type.Literal("log"),
      Type.Literal("bypass"),
    ],
    {
      description:
        "The action to apply to a matched request. The `log` action is only available on an Enterprise plan.",
    },
  ),
)

export const FirewallFirewallRulesComponentsSchemasDescription = named(
  "firewall_firewall-rules_components-schemas-description",
  Type.String({ description: "An informative summary of the firewall rule.", maxLength: 500 }),
)

export const FirewallFirewallRulesComponentsSchemasId = named(
  "firewall_firewall-rules_components-schemas-id",
  Type.String({ description: "The unique identifier of the firewall rule.", maxLength: 32 }),
)

export const FirewallComponentsSchemasPaused = named(
  "firewall_components-schemas-paused",
  Type.Boolean({ description: "When true, indicates that the firewall rule is currently paused." }),
)

export const FirewallComponentsSchemasPriority = named(
  "firewall_components-schemas-priority",
  Type.Number({
    description:
      "The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules without a priority.",
    minimum: 0,
    maximum: 2147483647,
  }),
)

export const FirewallProducts = named(
  "firewall_products",
  Type.Array(
    Type.Union(
      [
        Type.Literal("zoneLockdown"),
        Type.Literal("uaBlock"),
        Type.Literal("bic"),
        Type.Literal("hot"),
        Type.Literal("securityLevel"),
        Type.Literal("rateLimit"),
        Type.Literal("waf"),
      ],
      { description: "A list of products to bypass for a request when using the `bypass` action." },
    ),
  ),
)

export const FirewallRef = named(
  "firewall_ref",
  Type.String({ description: "A short reference tag. Allows you to select related firewall rules.", maxLength: 50 }),
)

export const FirewallDeleted = named(
  "firewall_deleted",
  Type.Boolean({ description: "When true, indicates that the firewall rule was deleted." }),
)

export const FirewallDeletedFilter = named(
  "firewall_deleted-filter",
  Type.Object({
    deleted: FirewallDeleted,
    id: FirewallFiltersComponentsSchemasId,
  }),
)

export const FirewallFilterRuleResponse = named(
  "firewall_filter-rule-response",
  Type.Object({
    action: Type.Optional(FirewallSchemasAction),
    description: Type.Optional(FirewallFirewallRulesComponentsSchemasDescription),
    id: Type.Optional(FirewallFirewallRulesComponentsSchemasId),
    paused: Type.Optional(FirewallComponentsSchemasPaused),
    priority: Type.Optional(FirewallComponentsSchemasPriority),
    products: Type.Optional(FirewallProducts),
    ref: Type.Optional(FirewallRef),
    filter: Type.Optional(Type.Union([FirewallFilter, FirewallDeletedFilter])),
  }),
)

export const FirewallComponentsSchemasIdentifier = named(
  "firewall_components-schemas-identifier",
  Type.String({ description: "The unique identifier of the resource.", maxLength: 32, readOnly: true }),
)

export const FirewallFilterRulesSingleResponse = named(
  "firewall_filter-rules-single-response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: FirewallFilterRuleResponse,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const FirewallFilterRulesResponseCollection = named(
  "firewall_filter-rules-response-collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(FirewallFilterRuleResponse), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
    result_info: Type.Optional(FirewallResultInfo),
  }),
)

export const FirewallSchemasUrls = named(
  "firewall_schemas-urls",
  Type.Array(Type.String({ "x-auditable": true }), {
    description:
      "The URLs to include in the rule definition. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.",
  }),
)

export const FirewallLockdownsComponentsSchemasId = named(
  "firewall_lockdowns_components-schemas-id",
  Type.String({ description: "The unique identifier of the Zone Lockdown rule.", maxLength: 32, "x-auditable": true }),
)

export const FirewallLockdownsComponentsSchemasDescription = named(
  "firewall_lockdowns_components-schemas-description",
  Type.String({ description: "An informative summary of the rule.", maxLength: 1024 }),
)

export const FirewallCreatedOn = named(
  "firewall_created_on",
  Type.String({
    description: "The timestamp of when the rule was created.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const FirewallSchemasIpConfiguration = named(
  "firewall_schemas-ip_configuration",
  Type.Object({
    target: Type.Optional(
      Type.Union([Type.Literal("ip")], {
        description:
          "The configuration target. You must set the target to `ip` when specifying an IP address in the Zone Lockdown rule.",
      }),
    ),
    value: Type.Optional(
      Type.String({
        description: "The IP address to match. This address will be compared to the IP address of incoming requests.",
      }),
    ),
  }),
)

export const FirewallSchemasCidrConfiguration = named(
  "firewall_schemas-cidr_configuration",
  Type.Object({
    target: Type.Optional(
      Type.Union([Type.Literal("ip_range")], {
        description:
          "The configuration target. You must set the target to `ip_range` when specifying an IP address range in the Zone Lockdown rule.",
      }),
    ),
    value: Type.Optional(
      Type.String({ description: "The IP address range to match. You can only use prefix lengths `/16` and `/24`." }),
    ),
  }),
)

export const FirewallConfigurations = named(
  "firewall_configurations",
  Type.Array(Type.Union([FirewallSchemasIpConfiguration, FirewallSchemasCidrConfiguration]), {
    description:
      "A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of `ip` or `ip_range` configurations.",
  }),
)

export const FirewallModifiedOn = named(
  "firewall_modified_on",
  Type.String({
    description: "The timestamp of when the rule was last modified.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const FirewallZonelockdown = named(
  "firewall_zonelockdown",
  Type.Object({
    configurations: FirewallConfigurations,
    created_on: FirewallCreatedOn,
    description: FirewallLockdownsComponentsSchemasDescription,
    id: FirewallLockdownsComponentsSchemasId,
    modified_on: FirewallModifiedOn,
    paused: FirewallSchemasPaused,
    urls: FirewallSchemasUrls,
  }),
)

export const FirewallZonelockdownResponseSingle = named(
  "firewall_zonelockdown_response_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: FirewallZonelockdown,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const FirewallIpRangeSearch = named(
  "firewall_ip_range_search",
  Type.String({ description: "A single IP address range to search for in existing rules.", "x-auditable": true }),
)

export const FirewallUriSearch = named(
  "firewall_uri_search",
  Type.String({
    description: "A single URI to search for in the list of URLs of existing rules.",
    "x-auditable": true,
  }),
)

export const FirewallSchemasPriority = named(
  "firewall_schemas-priority",
  Type.Number({
    description:
      "The priority of the rule to control the processing order. A lower number indicates higher priority. If not provided, any rules with a configured priority will be processed before rules without a priority.",
    "x-auditable": true,
  }),
)

export const FirewallIpSearch = named(
  "firewall_ip_search",
  Type.String({ description: "A single IP address to search for in existing rules." }),
)

export const FirewallSchemasDescriptionSearch = named(
  "firewall_schemas-description_search",
  Type.String({ description: "A string to search for in the description of existing rules.", "x-auditable": true }),
)

export const FirewallZonelockdownResponseCollection = named(
  "firewall_zonelockdown_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(FirewallZonelockdown), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
    result_info: Type.Optional(FirewallResultInfo),
  }),
)

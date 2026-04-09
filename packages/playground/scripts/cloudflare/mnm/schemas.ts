import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages, IamResultInfo } from "../shared/schemas"

export const MagicVisibilityMnmMnmVpcFlowsToken = named(
  "magic-visibility-mnm_mnm_vpc_flows_token",
  Type.String({
    description: "Authentication token to be used for VPC Flows export authentication.",
    "x-sensitive": true,
  }),
)

export const MagicVisibilityMnmMnmVpcFlowsSingleResponse = named(
  "magic-visibility-mnm_mnm_vpc_flows_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: MagicVisibilityMnmMnmVpcFlowsToken,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicVisibilityMnmMnmRuleAutomaticAdvertisement = named(
  "magic-visibility-mnm_mnm_rule_automatic_advertisement",
  Type.Union([
    Type.Boolean({
      description:
        "Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const MagicVisibilityMnmMnmRuleAdvertisableResponse = named(
  "magic-visibility-mnm_mnm_rule_advertisable_response",
  Type.Union([
    Type.Object({
      automatic_advertisement: MagicVisibilityMnmMnmRuleAutomaticAdvertisement,
    }),
    Type.Null(),
  ]),
)

export const MagicVisibilityMnmMnmRuleAdvertisementSingleResponse = named(
  "magic-visibility-mnm_mnm_rule_advertisement_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: MagicVisibilityMnmMnmRuleAdvertisableResponse,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicVisibilityMnmRuleIdentifier = named(
  "magic-visibility-mnm_rule_identifier",
  Type.String({ description: "The id of the rule. Must be unique.", "x-auditable": true }),
)

export const MagicVisibilityMnmMnmRuleBandwidthThreshold = named(
  "magic-visibility-mnm_mnm_rule_bandwidth_threshold",
  Type.Number({
    description:
      "The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.",
    minimum: 1,
    "x-auditable": true,
  }),
)

export const MagicVisibilityMnmMnmRuleDuration = named(
  "magic-visibility-mnm_mnm_rule_duration",
  Type.Union(
    [
      Type.Literal("1m"),
      Type.Literal("5m"),
      Type.Literal("10m"),
      Type.Literal("15m"),
      Type.Literal("20m"),
      Type.Literal("30m"),
      Type.Literal("45m"),
      Type.Literal("60m"),
    ],
    {
      description:
        'The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].',
      "x-auditable": true,
    },
  ),
)

export const MagicVisibilityMnmMnmRuleName = named(
  "magic-visibility-mnm_mnm_rule_name",
  Type.String({
    description:
      "The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.",
    "x-auditable": true,
  }),
)

export const MagicVisibilityMnmMnmRulePacketThreshold = named(
  "magic-visibility-mnm_mnm_rule_packet_threshold",
  Type.Number({
    description:
      "The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.",
    minimum: 1,
    "x-auditable": true,
  }),
)

export const MagicVisibilityMnmMnmRulePrefixMatch = named(
  "magic-visibility-mnm_mnm_rule_prefix_match",
  Type.Union([Type.Literal("exact"), Type.Literal("subnet"), Type.Literal("supernet")], {
    description: "Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.",
    "x-auditable": true,
  }),
)

export const MagicVisibilityMnmMnmRuleIpPrefix = named(
  "magic-visibility-mnm_mnm_rule_ip_prefix",
  Type.String({
    description:
      "The IP prefixes that are monitored for this rule. Must be a CIDR range like 203.0.113.0/24. Max 5000 different CIDR ranges.",
    "x-auditable": true,
  }),
)

export const MagicVisibilityMnmMnmRuleIpPrefixes = named(
  "magic-visibility-mnm_mnm_rule_ip_prefixes",
  Type.Array(MagicVisibilityMnmMnmRuleIpPrefix),
)

export const MagicVisibilityMnmMnmRuleType = named(
  "magic-visibility-mnm_mnm_rule_type",
  Type.Union([Type.Literal("threshold"), Type.Literal("zscore"), Type.Literal("advanced_ddos")], {
    description: "MNM rule type.",
    "x-auditable": true,
  }),
)

export const MagicVisibilityMnmMnmRuleZscoreSensitivity = named(
  "magic-visibility-mnm_mnm_rule_zscore_sensitivity",
  Type.Union([Type.Literal("low"), Type.Literal("medium"), Type.Literal("high")], {
    description: "Level of sensitivity set for zscore rules.",
    "x-auditable": true,
  }),
)

export const MagicVisibilityMnmMnmRuleZscoreTarget = named(
  "magic-visibility-mnm_mnm_rule_zscore_target",
  Type.Union([Type.Literal("bits"), Type.Literal("packets")], {
    description: "Target of the zscore rule analysis.",
    "x-auditable": true,
  }),
)

export const UnnamedSchemaRef99ba74ba6027c3c87ca03d4e81cfc16d = named(
  "unnamed_schema_ref_99ba74ba6027c3c87ca03d4e81cfc16d",
  Type.Union([Type.Null()]),
)

export const MagicVisibilityMnmMnmRule = named(
  "magic-visibility-mnm_mnm_rule",
  Type.Union([
    Type.Object({
      automatic_advertisement: MagicVisibilityMnmMnmRuleAutomaticAdvertisement,
      bandwidth_threshold: Type.Optional(MagicVisibilityMnmMnmRuleBandwidthThreshold),
      duration: Type.Optional(MagicVisibilityMnmMnmRuleDuration),
      id: Type.Optional(MagicVisibilityMnmRuleIdentifier),
      name: MagicVisibilityMnmMnmRuleName,
      packet_threshold: Type.Optional(MagicVisibilityMnmMnmRulePacketThreshold),
      prefix_match: Type.Optional(MagicVisibilityMnmMnmRulePrefixMatch),
      prefixes: MagicVisibilityMnmMnmRuleIpPrefixes,
      type: MagicVisibilityMnmMnmRuleType,
      zscore_sensitivity: Type.Optional(MagicVisibilityMnmMnmRuleZscoreSensitivity),
      zscore_target: Type.Optional(MagicVisibilityMnmMnmRuleZscoreTarget),
    }),
    Type.Null(),
  ]),
)

export const MagicVisibilityMnmMnmRulesSingleResponse = named(
  "magic-visibility-mnm_mnm_rules_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: MagicVisibilityMnmMnmRule,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicVisibilityMnmMnmRulesCollectionResponse = named(
  "magic-visibility-mnm_mnm_rules_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(MagicVisibilityMnmMnmRule), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: Type.Optional(IamResultInfo),
  }),
)

export const MagicVisibilityMnmMnmConfigWarpDevice = named(
  "magic-visibility-mnm_mnm_config_warp_device",
  Type.Object(
    {
      id: Type.String({ description: "Unique identifier for the warp device.", "x-auditable": true }),
      name: Type.String({ description: "Name of the warp device.", "x-auditable": true }),
      router_ip: Type.String({
        description:
          "IPv4 CIDR of the router sourcing flow data associated with this warp device. Only /32 addresses are currently supported.",
        "x-auditable": true,
      }),
    },
    { description: "Object representing a warp device with an ID and name." },
  ),
)

export const MagicVisibilityMnmMnmConfigWarpDevices = named(
  "magic-visibility-mnm_mnm_config_warp_devices",
  Type.Array(MagicVisibilityMnmMnmConfigWarpDevice),
)

export const MagicVisibilityMnmMnmConfigRouterIp = named(
  "magic-visibility-mnm_mnm_config_router_ip",
  Type.String({
    description: "IPv4 CIDR of the router sourcing flow data. Only /32 addresses are currently supported.",
    "x-auditable": true,
  }),
)

export const MagicVisibilityMnmMnmConfigRouterIps = named(
  "magic-visibility-mnm_mnm_config_router_ips",
  Type.Array(MagicVisibilityMnmMnmConfigRouterIp),
)

export const MagicVisibilityMnmMnmConfigName = named(
  "magic-visibility-mnm_mnm_config_name",
  Type.String({ description: "The account name.", "x-auditable": true }),
)

export const MagicVisibilityMnmMnmConfigDefaultSampling = named(
  "magic-visibility-mnm_mnm_config_default_sampling",
  Type.Number({
    description:
      "Fallback sampling rate of flow messages being sent in packets per second. This should match the packet sampling rate configured on the router.",
    default: 1,
    minimum: 1,
    "x-auditable": true,
  }),
)

export const MagicVisibilityMnmAccountIdentifier = named(
  "magic-visibility-mnm_account_identifier",
  Type.String({ "x-auditable": true }),
)

export const UnnamedSchemaRef621ca3f6ea9a96427c902b0d14279ff8 = named(
  "unnamed_schema_ref_621ca3f6ea9a96427c902b0d14279ff8",
  Type.Union([Type.Null()]),
)

export const MagicVisibilityMnmMnmConfig = named(
  "magic-visibility-mnm_mnm_config",
  Type.Object({
    default_sampling: MagicVisibilityMnmMnmConfigDefaultSampling,
    name: MagicVisibilityMnmMnmConfigName,
    router_ips: MagicVisibilityMnmMnmConfigRouterIps,
    warp_devices: MagicVisibilityMnmMnmConfigWarpDevices,
  }),
)

export const MagicVisibilityMnmMnmConfigSingleResponse = named(
  "magic-visibility-mnm_mnm_config_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: MagicVisibilityMnmMnmConfig,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

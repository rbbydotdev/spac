import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages } from "../shared/schemas"

export const DosUpdateprotectionstatus = named(
  "dos_UpdateProtectionStatus",
  Type.Object({
    enabled: Type.Boolean({ description: "Enables or disables protection.", "x-auditable": true }),
  }),
)

export const DosProtectionstatus = named(
  "dos_ProtectionStatus",
  Type.Object({
    enabled: Type.Boolean({ "x-auditable": true }),
  }),
)

export const DosProtectionStatusResponse = named(
  "dos_protection-status-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DosProtectionstatus),
  }),
)

export const DosTcpflowprotectionruleupdate = named(
  "dos_TcpFlowProtectionRuleUpdate",
  Type.Object({
    burst_sensitivity: Type.Optional(
      Type.String({
        description: "The new burst sensitivity. Optional. Must be one of 'low', 'medium', 'high'.",
        "x-auditable": true,
      }),
    ),
    mode: Type.Optional(
      Type.String({
        description:
          "The new mode for TCP Flow Protection. Optional. Must be one of 'enabled', 'disabled', 'monitoring'.",
        "x-auditable": true,
      }),
    ),
    rate_sensitivity: Type.Optional(
      Type.String({
        description: "The new rate sensitivity. Optional. Must be one of 'low', 'medium', 'high'.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const DosTcpflowprotectionrule = named(
  "dos_TcpFlowProtectionRule",
  Type.Object({
    burst_sensitivity: Type.String({
      description: "The burst sensitivity. Must be one of 'low', 'medium', 'high'.",
      "x-auditable": true,
    }),
    created_on: Type.String({
      description: "The creation timestamp of the TCP Flow Protection rule.",
      format: "date-time",
      readOnly: true,
      "x-auditable": true,
    }),
    id: Type.String({ description: "The unique ID of the TCP Flow Protection rule.", "x-auditable": true }),
    mode: Type.String({
      description: "The mode for TCP Flow Protection. Must be one of 'enabled', 'disabled', 'monitoring'.",
      "x-auditable": true,
    }),
    modified_on: Type.String({
      description: "The last modification timestamp of the TCP Flow Protection rule.",
      format: "date-time",
      readOnly: true,
      "x-auditable": true,
    }),
    name: Type.String({
      description:
        "The name of the TCP Flow Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.",
      "x-auditable": true,
    }),
    rate_sensitivity: Type.String({
      description: "The rate sensitivity. Must be one of 'low', 'medium', 'high'.",
      "x-auditable": true,
    }),
    scope: Type.String({
      description: "The scope for the TCP Flow Protection rule. Must be one of 'global', 'region', or 'datacenter'.",
      "x-auditable": true,
    }),
  }),
)

export const DosTcpFlowProtectionRuleResponse = named(
  "dos_tcp-flow-protection-rule-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DosTcpflowprotectionrule),
  }),
)

export const DosNewtcpflowprotectionrule = named(
  "dos_NewTcpFlowProtectionRule",
  Type.Object({
    burst_sensitivity: Type.String({
      description: "The burst sensitivity. Must be one of 'low', 'medium', 'high'.",
      "x-auditable": true,
    }),
    mode: Type.String({
      description: "The mode for the TCP Flow Protection. Must be one of 'enabled', 'disabled', 'monitoring'.",
      "x-auditable": true,
    }),
    name: Type.String({
      description:
        "The name of the TCP Flow Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.",
      "x-auditable": true,
    }),
    rate_sensitivity: Type.String({
      description: "The rate sensitivity. Must be one of 'low', 'medium', 'high'.",
      "x-auditable": true,
    }),
    scope: Type.String({ description: "The scope for the TCP Flow Protection rule.", "x-auditable": true }),
  }),
)

export const DosTcpFlowProtectionRuleListResponse = named(
  "dos_tcp-flow-protection-rule-list-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(
      Type.Object({
        count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
        page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
        per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
        total_count: Type.Optional(
          Type.Number({ description: "Total results available without any search parameters." }),
        ),
      }),
    ),
    result: Type.Optional(Type.Array(DosTcpflowprotectionrule)),
  }),
)

export const DosSynprotectionruleupdate = named(
  "dos_SynProtectionRuleUpdate",
  Type.Object({
    burst_sensitivity: Type.Optional(
      Type.String({
        description: "The new burst sensitivity. Optional. Must be one of 'low', 'medium', 'high'.",
        "x-auditable": true,
      }),
    ),
    mitigation_type: Type.Optional(
      Type.String({
        description: "The new mitigation type. Optional. Must be one of 'challenge' or 'retransmit'.",
        "x-auditable": true,
      }),
    ),
    mode: Type.Optional(
      Type.String({
        description: "The new mode for SYN Protection. Optional. Must be one of 'enabled', 'disabled', 'monitoring'.",
        "x-auditable": true,
      }),
    ),
    rate_sensitivity: Type.Optional(
      Type.String({
        description: "The new rate sensitivity. Optional. Must be one of 'low', 'medium', 'high'.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const DosSynprotectionrule = named(
  "dos_SynProtectionRule",
  Type.Object({
    burst_sensitivity: Type.String({
      description: "The burst sensitivity. Must be one of 'low', 'medium', 'high'.",
      "x-auditable": true,
    }),
    created_on: Type.String({
      description: "The creation timestamp of the SYN Protection rule.",
      format: "date-time",
      readOnly: true,
      "x-auditable": true,
    }),
    id: Type.String({ description: "The unique ID of the SYN Protection rule.", "x-auditable": true }),
    mitigation_type: Type.String({
      description: "The type of mitigation for SYN Protection. Must be one of 'challenge' or 'retransmit'.",
      "x-auditable": true,
    }),
    mode: Type.String({
      description: "The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.",
      "x-auditable": true,
    }),
    modified_on: Type.String({
      description: "The last modification timestamp of the SYN Protection rule.",
      format: "date-time",
      readOnly: true,
      "x-auditable": true,
    }),
    name: Type.String({
      description:
        "The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.",
      "x-auditable": true,
    }),
    rate_sensitivity: Type.String({
      description: "The rate sensitivity. Must be one of 'low', 'medium', 'high'.",
      "x-auditable": true,
    }),
    scope: Type.String({
      description: "The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.",
      "x-auditable": true,
    }),
  }),
)

export const DosSynProtectionRuleResponse = named(
  "dos_syn-protection-rule-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DosSynprotectionrule),
  }),
)

export const DosNewsynprotectionrule = named(
  "dos_NewSynProtectionRule",
  Type.Object({
    burst_sensitivity: Type.String({
      description: "The burst sensitivity. Must be one of 'low', 'medium', 'high'.",
      "x-auditable": true,
    }),
    mitigation_type: Type.Optional(
      Type.String({
        description:
          "The type of mitigation. Must be one of 'challenge' or 'retransmit'. Optional. Defaults to 'challenge'.",
        "x-auditable": true,
      }),
    ),
    mode: Type.String({
      description: "The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.",
      "x-auditable": true,
    }),
    name: Type.String({
      description:
        "The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.",
      "x-auditable": true,
    }),
    rate_sensitivity: Type.String({
      description: "The rate sensitivity. Must be one of 'low', 'medium', 'high'.",
      "x-auditable": true,
    }),
    scope: Type.String({
      description: "The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.",
      "x-auditable": true,
    }),
  }),
)

export const DosSynProtectionRuleListResponse = named(
  "dos_syn-protection-rule-list-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(
      Type.Object({
        count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
        page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
        per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
        total_count: Type.Optional(
          Type.Number({ description: "Total results available without any search parameters." }),
        ),
      }),
    ),
    result: Type.Optional(Type.Array(DosSynprotectionrule)),
  }),
)

export const DosExpressionfilterupdate = named(
  "dos_ExpressionFilterUpdate",
  Type.Object({
    expression: Type.Optional(
      Type.String({ description: "The new filter expression. Optional.", "x-auditable": true }),
    ),
    mode: Type.Optional(
      Type.String({
        description: "The new mode for the filter. Optional. Must be one of 'enabled', 'disabled', 'monitoring'.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const DosExpressionfilter = named(
  "dos_ExpressionFilter",
  Type.Object({
    created_on: Type.String({
      description: "The creation timestamp of the expression filter.",
      format: "date-time",
      readOnly: true,
      "x-auditable": true,
    }),
    expression: Type.String({ description: "The filter expression.", "x-auditable": true }),
    id: Type.String({ description: "The unique ID of the expression filter.", "x-auditable": true }),
    mode: Type.String({
      description: "The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.",
      "x-auditable": true,
    }),
    modified_on: Type.String({
      description: "The last modification timestamp of the expression filter.",
      format: "date-time",
      readOnly: true,
      "x-auditable": true,
    }),
  }),
)

export const DosExpressionFilterResponse = named(
  "dos_expression-filter-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DosExpressionfilter),
  }),
)

export const DosNewexpressionfilter = named(
  "dos_NewExpressionFilter",
  Type.Object({
    expression: Type.String({ description: "The filter expression.", "x-auditable": true }),
    mode: Type.String({
      description: "The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.",
      "x-auditable": true,
    }),
  }),
)

export const DosExpressionFilterListResponse = named(
  "dos_expression-filter-list-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(
      Type.Object({
        count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
        page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
        per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
        total_count: Type.Optional(
          Type.Number({ description: "Total results available without any search parameters." }),
        ),
      }),
    ),
    result: Type.Optional(Type.Array(DosExpressionfilter)),
  }),
)

export const DosPrefixupdate = named(
  "dos_PrefixUpdate",
  Type.Object({
    comment: Type.Optional(
      Type.String({ description: "A new comment for the prefix. Optional.", "x-auditable": true }),
    ),
    excluded: Type.Optional(
      Type.Boolean({ description: "Whether to exclude the prefix from protection. Optional.", "x-auditable": true }),
    ),
  }),
)

export const DosPrefix = named(
  "dos_Prefix",
  Type.Object({
    comment: Type.String({ description: "A comment describing the prefix.", "x-auditable": true }),
    created_on: Type.String({
      description: "The creation timestamp of the prefix.",
      format: "date-time",
      readOnly: true,
      "x-auditable": true,
    }),
    excluded: Type.Boolean({ description: "Whether to exclude the prefix from protection.", "x-auditable": true }),
    id: Type.String({ description: "The unique ID of the prefix.", "x-auditable": true }),
    modified_on: Type.String({
      description: "The last modification timestamp of the prefix.",
      format: "date-time",
      readOnly: true,
      "x-auditable": true,
    }),
    prefix: Type.String({ description: "The prefix in CIDR format.", "x-auditable": true }),
  }),
)

export const DosPrefixResponse = named(
  "dos_prefix-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DosPrefix),
  }),
)

export const DosNewprefix = named(
  "dos_NewPrefix",
  Type.Object({
    comment: Type.String({ description: "A comment describing the prefix.", "x-auditable": true }),
    excluded: Type.Boolean({ description: "Whether to exclude the prefix from protection.", "x-auditable": true }),
    prefix: Type.String({ description: "The prefix to add in CIDR format.", "x-auditable": true }),
  }),
)

export const DosPrefixListResponse = named(
  "dos_prefix-list-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(
      Type.Object({
        count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
        page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
        per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
        total_count: Type.Optional(
          Type.Number({ description: "Total results available without any search parameters." }),
        ),
      }),
    ),
    result: Type.Optional(Type.Array(DosPrefix)),
  }),
)

export const DosDnsprotectionruleupdate = named(
  "dos_DnsProtectionRuleUpdate",
  Type.Object({
    burst_sensitivity: Type.Optional(
      Type.String({
        description: "The new burst sensitivity. Optional. Must be one of 'low', 'medium', 'high'.",
        "x-auditable": true,
      }),
    ),
    mode: Type.Optional(
      Type.String({
        description: "The new mode for DNS Protection. Optional. Must be one of 'enabled', 'disabled', 'monitoring'.",
        "x-auditable": true,
      }),
    ),
    profile_sensitivity: Type.Optional(
      Type.String({
        description:
          "The new profile sensitivity. Optional. Recommended setting is 'low'. Must be one of 'low', 'medium', 'high', or 'very_high'.",
        "x-auditable": true,
      }),
    ),
    rate_sensitivity: Type.Optional(
      Type.String({
        description: "The new rate sensitivity. Optional. Must be one of 'low', 'medium', 'high'.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const DosDnsprotectionrule = named(
  "dos_DnsProtectionRule",
  Type.Object({
    burst_sensitivity: Type.String({
      description: "The burst sensitivity. Must be one of 'low', 'medium', 'high'.",
      "x-auditable": true,
    }),
    created_on: Type.String({
      description: "The creation timestamp of the DNS Protection rule.",
      format: "date-time",
      readOnly: true,
      "x-auditable": true,
    }),
    id: Type.String({ description: "The unique ID of the DNS Protection rule.", "x-auditable": true }),
    mode: Type.String({
      description: "The mode for DNS Protection. Must be one of 'enabled', 'disabled', 'monitoring'.",
      "x-auditable": true,
    }),
    modified_on: Type.String({
      description: "The last modification timestamp of the DNS Protection rule.",
      format: "date-time",
      readOnly: true,
      "x-auditable": true,
    }),
    name: Type.String({
      description:
        "The name of the DNS Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.",
      "x-auditable": true,
    }),
    profile_sensitivity: Type.String({
      description:
        "The profile sensitivity. Recommended setting is 'low'. Must be one of 'low', 'medium', 'high', or 'very_high'.",
      "x-auditable": true,
    }),
    rate_sensitivity: Type.String({
      description: "The rate sensitivity. Must be one of 'low', 'medium', 'high'.",
      "x-auditable": true,
    }),
    scope: Type.String({
      description: "The scope for the DNS Protection rule. Must be one of 'global', 'region', or 'datacenter'.",
      "x-auditable": true,
    }),
  }),
)

export const DosDnsProtectionRuleResponse = named(
  "dos_dns-protection-rule-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DosDnsprotectionrule),
  }),
)

export const DosNewdnsprotectionrule = named(
  "dos_NewDnsProtectionRule",
  Type.Object({
    burst_sensitivity: Type.String({
      description: "The burst sensitivity. Must be one of 'low', 'medium', 'high'.",
      "x-auditable": true,
    }),
    mode: Type.String({
      description: "The mode for DNS Protection. Must be one of 'enabled', 'disabled', 'monitoring'.",
      "x-auditable": true,
    }),
    name: Type.String({
      description:
        "The name of the DNS Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.",
      "x-auditable": true,
    }),
    profile_sensitivity: Type.String({
      description:
        "The profile sensitivity. Recommended setting is 'low'. Must be one of 'low', 'medium', 'high', or 'very_high'.",
      "x-auditable": true,
    }),
    rate_sensitivity: Type.String({
      description: "The rate sensitivity. Must be one of 'low', 'medium', 'high'.",
      "x-auditable": true,
    }),
    scope: Type.String({
      description: "The scope for the DNS Protection rule. Must be one of 'global', 'region', or 'datacenter'.",
      "x-auditable": true,
    }),
  }),
)

export const DosDnsProtectionRuleListResponse = named(
  "dos_dns-protection-rule-list-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(
      Type.Object({
        count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
        page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
        per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
        total_count: Type.Optional(
          Type.Number({ description: "Total results available without any search parameters." }),
        ),
      }),
    ),
    result: Type.Optional(Type.Array(DosDnsprotectionrule)),
  }),
)

export const DosInfraprefixupdate = named(
  "dos_InfraPrefixUpdate",
  Type.Object({
    comment: Type.Optional(
      Type.String({ description: "A comment describing the allowlist prefix. Optional.", "x-auditable": true }),
    ),
    enabled: Type.Optional(
      Type.Boolean({
        description: "Whether to enable the allowlist prefix into effect. Optional.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const DosApiResponseCommon = named(
  "dos_api-response-common",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const DosInfraprefix = named(
  "dos_InfraPrefix",
  Type.Object({
    comment: Type.String({ description: "An optional comment describing the allowlist prefix.", "x-auditable": true }),
    created_on: Type.String({
      description: "The creation timestamp of the allowlist prefix.",
      format: "date-time",
      readOnly: true,
      "x-auditable": true,
    }),
    enabled: Type.Boolean({
      description: "Whether to enable the allowlist prefix into effect. Defaults to false.",
      "x-auditable": true,
    }),
    id: Type.String({ description: "The unique ID of the allowlist prefix.", "x-auditable": true }),
    modified_on: Type.String({
      description: "The last modification timestamp of the allowlist prefix.",
      format: "date-time",
      readOnly: true,
      "x-auditable": true,
    }),
    prefix: Type.String({ description: "The allowlist prefix in CIDR format.", "x-auditable": true }),
  }),
)

export const DosInfraPrefixResponse = named(
  "dos_infra-prefix-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DosInfraprefix),
  }),
)

export const DosNewinfraprefix = named(
  "dos_NewInfraPrefix",
  Type.Object({
    comment: Type.String({ description: "An comment describing the allowlist prefix.", "x-auditable": true }),
    enabled: Type.Boolean({ description: "Whether to enable the allowlist prefix into effect.", "x-auditable": true }),
    prefix: Type.String({ description: "The allowlist prefix to add in CIDR format.", "x-auditable": true }),
  }),
)

export const DosInfraPrefixListResponse = named(
  "dos_infra-prefix-list-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(
      Type.Object({
        count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
        page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
        per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
        total_count: Type.Optional(
          Type.Number({ description: "Total results available without any search parameters." }),
        ),
      }),
    ),
    result: Type.Optional(Type.Array(DosInfraprefix)),
  }),
)

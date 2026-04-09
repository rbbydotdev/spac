import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { AaaTimestamp, D1Messages } from "../shared/schemas"

export const RumRuleIdentifier = named(
  "rum_rule_identifier",
  Type.String({ description: "The Web Analytics rule identifier.", "x-auditable": true }),
)

export const RumModifyRulesRequest = named(
  "rum_modify-rules-request",
  Type.Object({
    delete_rules: Type.Optional(
      Type.Array(RumRuleIdentifier, { description: "A list of rule identifiers to delete." }),
    ),
    rules: Type.Optional(
      Type.Array(
        Type.Object({
          host: Type.Optional(Type.String()),
          id: Type.Optional(RumRuleIdentifier),
          inclusive: Type.Optional(Type.Boolean()),
          is_paused: Type.Optional(Type.Boolean()),
          paths: Type.Optional(Type.Array(Type.String())),
        }),
        { description: "A list of rules to create or update." },
      ),
    ),
  }),
)

export const RumRule = named(
  "rum_rule",
  Type.Object({
    created: Type.Optional(AaaTimestamp),
    host: Type.Optional(Type.String({ description: "The hostname the rule will be applied to.", "x-auditable": true })),
    id: Type.Optional(RumRuleIdentifier),
    inclusive: Type.Optional(
      Type.Boolean({
        description: "Whether the rule includes or excludes traffic from being measured.",
        "x-auditable": true,
      }),
    ),
    is_paused: Type.Optional(Type.Boolean({ description: "Whether the rule is paused or not.", "x-auditable": true })),
    paths: Type.Optional(
      Type.Array(Type.String({ "x-auditable": true }), { description: "The paths the rule will be applied to." }),
    ),
    priority: Type.Optional(Type.Number({ "x-auditable": true })),
  }),
)

export const RumRules = named("rum_rules", Type.Array(RumRule, { description: "A list of rules." }))

export const RumRulesetIdentifier = named(
  "rum_ruleset_identifier",
  Type.String({ description: "The Web Analytics ruleset identifier.", "x-auditable": true }),
)

export const RumZoneTag = named(
  "rum_zone_tag",
  Type.String({ description: "The zone identifier.", "x-auditable": true }),
)

export const RumRuleset = named(
  "rum_ruleset",
  Type.Object({
    enabled: Type.Optional(Type.Boolean({ description: "Whether the ruleset is enabled." })),
    id: Type.Optional(RumRulesetIdentifier),
    zone_name: Type.Optional(Type.String()),
    zone_tag: Type.Optional(RumZoneTag),
  }),
)

export const RumRulesResponseCollection = named(
  "rum_rules-response-collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        rules: Type.Optional(RumRules),
        ruleset: Type.Optional(RumRuleset),
      }),
    ),
  }),
)

export const RumRuleIdResponseSingle = named(
  "rum_rule-id-response-single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        id: Type.Optional(RumRuleIdentifier),
      }),
    ),
  }),
)

export const RumRuleResponseSingle = named(
  "rum_rule-response-single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful." }),
    result: Type.Optional(RumRule),
  }),
)

export const RumCreateRuleRequest = named(
  "rum_create-rule-request",
  Type.Object({
    host: Type.Optional(Type.String()),
    inclusive: Type.Optional(
      Type.Boolean({ description: "Whether the rule includes or excludes traffic from being measured." }),
    ),
    is_paused: Type.Optional(Type.Boolean({ description: "Whether the rule is paused or not." })),
    paths: Type.Optional(Type.Array(Type.String())),
  }),
)

export const RumSiteTag = named(
  "rum_site_tag",
  Type.String({ description: "The Web Analytics site identifier.", "x-auditable": true }),
)

export const RumSiteTagResponseSingle = named(
  "rum_site-tag-response-single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        site_tag: Type.Optional(RumSiteTag),
      }),
    ),
  }),
)

export const RumAutoInstall = named(
  "rum_auto_install",
  Type.Boolean({
    description: "If enabled, the JavaScript snippet is automatically injected for orange-clouded sites.",
    "x-auditable": true,
  }),
)

export const RumEnabled = named(
  "rum_enabled",
  Type.Boolean({
    description: "Enables or disables RUM. This option can be used only when auto_install is set to true.",
    "x-auditable": true,
  }),
)

export const RumHost = named(
  "rum_host",
  Type.String({ description: "The hostname to use for gray-clouded sites.", "x-auditable": true }),
)

export const RumLite = named(
  "rum_lite",
  Type.Boolean({
    description: "If enabled, the JavaScript snippet will not be injected for visitors from the EU.",
    "x-auditable": true,
  }),
)

export const RumUpdateSiteRequest = named(
  "rum_update-site-request",
  Type.Object({
    auto_install: Type.Optional(RumAutoInstall),
    enabled: Type.Optional(RumEnabled),
    host: Type.Optional(RumHost),
    lite: Type.Optional(RumLite),
    zone_tag: Type.Optional(RumZoneTag),
  }),
)

export const RumOrderBy = named(
  "rum_order_by",
  Type.Union([Type.Literal("host"), Type.Literal("created")], {
    description: "The property used to sort the list of results.",
  }),
)

export const RumPage = named(
  "rum_page",
  Type.Number({ description: "Current page within the paginated list of results." }),
)

export const RumPerPage = named(
  "rum_per_page",
  Type.Number({ description: "Number of items to return per page of results." }),
)

export const RumSiteToken = named(
  "rum_site_token",
  Type.String({ description: "The Web Analytics site token.", "x-auditable": true }),
)

export const RumSnippet = named(
  "rum_snippet",
  Type.String({ description: "Encoded JavaScript snippet.", "x-auditable": true }),
)

export const RumSite = named(
  "rum_site",
  Type.Object({
    auto_install: Type.Optional(RumAutoInstall),
    created: Type.Optional(AaaTimestamp),
    rules: Type.Optional(RumRules),
    ruleset: Type.Optional(RumRuleset),
    site_tag: Type.Optional(RumSiteTag),
    site_token: Type.Optional(RumSiteToken),
    snippet: Type.Optional(RumSnippet),
  }),
)

export const RumResultInfo = named(
  "rum_result_info",
  Type.Object({
    count: Type.Optional(Type.Integer({ description: "The total number of items on the current page." })),
    page: Type.Optional(Type.Integer({ description: "Current page within the paginated list of results." })),
    per_page: Type.Optional(
      Type.Integer({ description: "The maximum number of items to return per page of results." }),
    ),
    total_count: Type.Optional(Type.Integer({ description: "The total number of items." })),
    total_pages: Type.Optional(Type.Union([Type.Integer({ description: "The total number of pages." }), Type.Null()])),
  }),
)

export const RumSitesResponseCollection = named(
  "rum_sites-response-collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(RumSite)),
    result_info: Type.Optional(RumResultInfo),
  }),
)

export const RumSiteResponseSingle = named(
  "rum_site-response-single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful." }),
    result: Type.Optional(RumSite),
  }),
)

export const RumCreateSiteRequest = named(
  "rum_create-site-request",
  Type.Object({
    auto_install: Type.Optional(RumAutoInstall),
    host: Type.Optional(RumHost),
    zone_tag: Type.Optional(RumZoneTag),
  }),
)

import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  AccessAppPolicyResponse,
  AccessApprovalGroups,
  AccessApprovalRequired,
  AccessBasePolicyReq,
  AccessBasePolicyResp,
  AccessComponentsSchemasSessionDuration,
  AccessCreatedAt,
  AccessIsolationRequired,
  AccessPrecedence,
  AccessPurposeJustificationPrompt,
  AccessPurposeJustificationRequired,
  AccessRule,
  AccessSchemasUuid,
  AccessServiceTokens,
  AccessUuid,
  D1Messages,
  DlpMessages,
  DlsIdentifier,
  DlsTimestamp,
  FirewallConfiguration,
  FirewallEmail,
  FirewallIdentifier,
  FirewallNotes,
  FirewallResultInfo,
  FirewallSchemasIdentifier,
  FirewallSchemasMode,
  UnnamedSchemaRef6a02fe18089d53b52b2cd3949b717919,
  WaitingroomWaitingroom,
} from "../shared/schemas"

export const WaitingroomResponseCollection = named(
  "waitingroom_response_collection",
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
    result: Type.Optional(Type.Array(WaitingroomWaitingroom)),
  }),
)

export const RulesetsRulecategory = named(
  "rulesets_RuleCategory",
  Type.String({ description: "The category of a rule.", minLength: 1, title: "Category" }),
)

export const RulesetsRuleid = named(
  "rulesets_RuleId",
  Type.String({ description: "The unique ID of the rule.", title: "Rule ID" }),
)

export const RulesetsSkipphase = named(
  "rulesets_SkipPhase",
  Type.Union([Type.Literal("current")], {
    description: "A phase to skip the execution of. This option is only compatible with the products option.",
  }),
)

export const RulesetsRulesetphase = named(
  "rulesets_RulesetPhase",
  Type.Union(
    [
      Type.Literal("ddos_l4"),
      Type.Literal("ddos_l7"),
      Type.Literal("http_config_settings"),
      Type.Literal("http_custom_errors"),
      Type.Literal("http_log_custom_fields"),
      Type.Literal("http_ratelimit"),
      Type.Literal("http_request_cache_settings"),
      Type.Literal("http_request_dynamic_redirect"),
      Type.Literal("http_request_firewall_custom"),
      Type.Literal("http_request_firewall_managed"),
      Type.Literal("http_request_late_transform"),
      Type.Literal("http_request_origin"),
      Type.Literal("http_request_redirect"),
      Type.Literal("http_request_sanitize"),
      Type.Literal("http_request_sbfm"),
      Type.Literal("http_request_transform"),
      Type.Literal("http_response_compression"),
      Type.Literal("http_response_firewall_managed"),
      Type.Literal("http_response_headers_transform"),
      Type.Literal("magic_transit"),
      Type.Literal("magic_transit_ids_managed"),
      Type.Literal("magic_transit_managed"),
      Type.Literal("magic_transit_ratelimit"),
    ],
    { description: "The phase of the ruleset." },
  ),
)

export const RulesetsSkipphases = named(
  "rulesets_SkipPhases",
  Type.Array(RulesetsRulesetphase, {
    description: "A list of phases to skip the execution of. This option is incompatible with the rulesets option.",
    minItems: 1,
    uniqueItems: true,
    title: "Phases",
  }),
)

export const RulesetsSkipproducts = named(
  "rulesets_SkipProducts",
  Type.Array(
    Type.Union(
      [
        Type.Literal("bic"),
        Type.Literal("hot"),
        Type.Literal("rateLimit"),
        Type.Literal("securityLevel"),
        Type.Literal("uaBlock"),
        Type.Literal("waf"),
        Type.Literal("zoneLockdown"),
      ],
      { description: "The name of a legacy security product to skip the execution of." },
    ),
    {
      description: "A list of legacy security products to skip the execution of.",
      minItems: 1,
      uniqueItems: true,
      title: "Products",
    },
  ),
)

export const RulesetsSkiprules = named(
  "rulesets_SkipRules",
  Type.Record(
    Type.String(),
    Type.Array(RulesetsRuleid, {
      description: "A list of rule IDs in the ruleset to skip the execution of.",
      minItems: 1,
      uniqueItems: true,
      title: "Rules",
    }),
  ),
)

export const RulesetsSkipruleset = named(
  "rulesets_SkipRuleset",
  Type.Union([Type.Literal("current")], {
    description: "A ruleset to skip the execution of. This option is incompatible with the rulesets option.",
  }),
)

export const RulesetsRulesetid = named(
  "rulesets_RulesetId",
  Type.String({ description: "The unique ID of the ruleset.", title: "Ruleset ID" }),
)

export const RulesetsSkiprulesets = named(
  "rulesets_SkipRulesets",
  Type.Array(RulesetsRulesetid, {
    description:
      "A list of ruleset IDs to skip the execution of. This option is incompatible with the ruleset and phases options.",
    minItems: 1,
    uniqueItems: true,
    title: "Rulesets",
  }),
)

export const RulesetsRulecategories = named(
  "rulesets_RuleCategories",
  Type.Array(RulesetsRulecategory, {
    description: "The categories of the rule.",
    minItems: 1,
    uniqueItems: true,
    readOnly: true,
    title: "Categories",
  }),
)

export const RulesetsRuleenabled = named(
  "rulesets_RuleEnabled",
  Type.Boolean({ description: "Whether the rule should be executed.", title: "Enabled" }),
)

export const RulesetsRuleexposedcredentialcheck = named(
  "rulesets_RuleExposedCredentialCheck",
  Type.Object(
    {
      password_expression: Type.String({
        description: "An expression that selects the password used in the credentials check.",
        minLength: 1,
        title: "Password Expression",
      }),
      username_expression: Type.String({
        description: "An expression that selects the user ID used in the credentials check.",
        minLength: 1,
        title: "Username Expression",
      }),
    },
    { description: "Configuration for exposed credential checking." },
  ),
)

export const RulesetsRulelogging = named(
  "rulesets_RuleLogging",
  Type.Object(
    {
      enabled: Type.Boolean({ description: "Whether to generate a log when the rule matches.", title: "Enabled" }),
    },
    { description: "An object configuring the rule's logging behavior." },
  ),
)

export const UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c = named(
  "unnamed_schema_ref_70f2c6ccd8a405358ac7ef8fc3d6751c",
  RulesetsRulelogging,
)

export const RulesetsRuleratelimit = named(
  "rulesets_RuleRatelimit",
  Type.Object(
    {
      characteristics: Type.Array(
        Type.String({ description: "The characteristic of the request.", minLength: 1, title: "Characteristic" }),
        {
          description: "Characteristics of the request on which the rate limit counter will be incremented.",
          minItems: 1,
          uniqueItems: true,
          title: "Characteristics",
        },
      ),
      counting_expression: Type.Optional(
        Type.String({
          description:
            "An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.",
          minLength: 1,
          title: "Counting Expression",
        }),
      ),
      mitigation_timeout: Type.Optional(
        Type.Integer({
          description:
            "Period of time in seconds after which the action will be disabled following its first execution.",
          title: "Mitigation Timeout",
        }),
      ),
      period: Type.Integer({
        description: "Period in seconds over which the counter is being incremented.",
        minimum: 0,
        title: "Period",
      }),
      requests_per_period: Type.Optional(
        Type.Integer({
          description:
            "The threshold of requests per period after which the action will be executed for the first time.",
          minimum: 1,
          title: "Requests per Period",
        }),
      ),
      requests_to_origin: Type.Optional(
        Type.Boolean({
          description: "Whether counting is only performed when an origin is reached.",
          default: false,
          title: "Requests to Origin",
        }),
      ),
      score_per_period: Type.Optional(
        Type.Integer({
          description: "The score threshold per period for which the action will be executed the first time.",
          title: "Score per Period",
        }),
      ),
      score_response_header_name: Type.Optional(
        Type.String({
          description:
            "A response header name provided by the origin, which contains the score to increment rate limit counter with.",
          minLength: 1,
          title: "Score Response Header Name",
        }),
      ),
    },
    { description: "An object configuring the rule's rate limit behavior." },
  ),
)

export const RulesetsSkiprule = named(
  "rulesets_SkipRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("skip")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(
      Type.Object(
        {
          phase: Type.Optional(RulesetsSkipphase),
          phases: Type.Optional(RulesetsSkipphases),
          products: Type.Optional(RulesetsSkipproducts),
          rules: Type.Optional(RulesetsSkiprules),
          ruleset: Type.Optional(RulesetsSkipruleset),
          rulesets: Type.Optional(RulesetsSkiprulesets),
        },
        { description: "The parameters configuring the rule's action." },
      ),
    ),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(Type.Intersect([RulesetsRuleenabled, Type.Unknown()])),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsSetconfigautominify = named(
  "rulesets_SetConfigAutominify",
  Type.Object(
    {
      css: Type.Optional(Type.Boolean({ description: "Whether to minify CSS files.", default: false, title: "CSS" })),
      html: Type.Optional(
        Type.Boolean({ description: "Whether to minify HTML files.", default: false, title: "HTML" }),
      ),
      js: Type.Optional(
        Type.Boolean({ description: "Whether to minify JavaScript files.", default: false, title: "JavaScript" }),
      ),
    },
    { description: "Which file extensions to minify automatically." },
  ),
)

export const RulesetsSetconfigrule = named(
  "rulesets_SetConfigRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("set_config")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(
      Type.Object(
        {
          automatic_https_rewrites: Type.Optional(
            Type.Boolean({
              description: "Whether to enable Automatic HTTPS Rewrites.",
              title: "Automatic HTTPS Rewrites",
            }),
          ),
          autominify: Type.Optional(RulesetsSetconfigautominify),
          bic: Type.Optional(
            Type.Boolean({
              description: "Whether to enable Browser Integrity Check (BIC).",
              title: "Browser Integrity Check",
            }),
          ),
          disable_apps: Type.Optional(
            Type.Union([Type.Literal(true)], { description: "Whether to disable Cloudflare Apps." }),
          ),
          disable_pay_per_crawl: Type.Optional(
            Type.Union([Type.Literal(true)], { description: "Whether to disable Pay Per Crawl." }),
          ),
          disable_rum: Type.Optional(
            Type.Union([Type.Literal(true)], { description: "Whether to disable Real User Monitoring (RUM)." }),
          ),
          disable_zaraz: Type.Optional(Type.Union([Type.Literal(true)], { description: "Whether to disable Zaraz." })),
          email_obfuscation: Type.Optional(
            Type.Boolean({ description: "Whether to enable Email Obfuscation.", title: "Email Obfuscation" }),
          ),
          fonts: Type.Optional(
            Type.Boolean({ description: "Whether to enable Cloudflare Fonts.", title: "Cloudflare Fonts" }),
          ),
          hotlink_protection: Type.Optional(
            Type.Boolean({ description: "Whether to enable Hotlink Protection.", title: "Hotlink Protection" }),
          ),
          mirage: Type.Optional(Type.Boolean({ description: "Whether to enable Mirage.", title: "Mirage" })),
          opportunistic_encryption: Type.Optional(
            Type.Boolean({
              description: "Whether to enable Opportunistic Encryption.",
              title: "Opportunistic Encryption",
            }),
          ),
          polish: Type.Optional(
            Type.Union([Type.Literal("off"), Type.Literal("lossless"), Type.Literal("lossy"), Type.Literal("webp")], {
              description: "The Polish level to configure.",
            }),
          ),
          rocket_loader: Type.Optional(
            Type.Boolean({ description: "Whether to enable Rocket Loader.", title: "Rocket Loader" }),
          ),
          security_level: Type.Optional(
            Type.Union(
              [
                Type.Literal("off"),
                Type.Literal("essentially_off"),
                Type.Literal("low"),
                Type.Literal("medium"),
                Type.Literal("high"),
                Type.Literal("under_attack"),
              ],
              { description: "The Security Level to configure." },
            ),
          ),
          server_side_excludes: Type.Optional(
            Type.Boolean({ description: "Whether to enable Server-Side Excludes.", title: "Server-Side Excludes" }),
          ),
          ssl: Type.Optional(
            Type.Union(
              [
                Type.Literal("off"),
                Type.Literal("flexible"),
                Type.Literal("full"),
                Type.Literal("strict"),
                Type.Literal("origin_pull"),
              ],
              { description: "The SSL level to configure." },
            ),
          ),
          sxg: Type.Optional(
            Type.Boolean({ description: "Whether to enable Signed Exchanges (SXG).", title: "Signed Exchanges" }),
          ),
        },
        { description: "The parameters configuring the rule's action." },
      ),
    ),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(Type.Intersect([RulesetsRuleenabled, Type.Unknown()])),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsSetcachesettingsadditionalcacheableports = named(
  "rulesets_SetCacheSettingsAdditionalCacheablePorts",
  Type.Array(
    Type.Integer({
      description: "A port to enable caching on.",
      minimum: 1,
      maximum: 65535,
      title: "Additional Cacheable Port",
    }),
    {
      description: "A list of additional ports that caching should be enabled on.",
      minItems: 1,
      uniqueItems: true,
      title: "Additional Cacheable Ports (Enterprise-Only)",
    },
  ),
)

export const RulesetsSetcachesettingsbrowserttl = named(
  "rulesets_SetCacheSettingsBrowserTTL",
  Type.Object(
    {
      default: Type.Optional(
        Type.Integer({
          description: 'The browser TTL (in seconds) if you choose the "override_origin" mode.',
          minimum: 0,
          title: "Default TTL",
        }),
      ),
      mode: Type.Union(
        [
          Type.Literal("respect_origin"),
          Type.Literal("bypass_by_default"),
          Type.Literal("override_origin"),
          Type.Literal("bypass"),
        ],
        { description: "The browser TTL mode." },
      ),
    },
    {
      description:
        "How long client browsers should cache the response. Cloudflare cache purge will not purge content cached on client browsers, so high browser TTLs may lead to stale content.",
    },
  ),
)

export const RulesetsSetcachesettingscache = named(
  "rulesets_SetCacheSettingsCache",
  Type.Boolean({
    description:
      "Whether the request's response from the origin is eligible for caching. Caching itself will still depend on the cache control header and your other caching configurations.",
    title: "Cache",
  }),
)

export const RulesetsSetcachesettingscustomcachekeycookie = named(
  "rulesets_SetCacheSettingsCustomCacheKeyCookie",
  Type.Object(
    {
      check_presence: Type.Optional(
        Type.Array(
          Type.String({
            description: "The name of the cookie to check for the presence of.",
            minLength: 1,
            title: "Cookie Name",
          }),
          {
            description:
              "A list of cookies to check for the presence of. The presence of these cookies is included in the cache key.",
            minItems: 1,
            uniqueItems: true,
            title: "Check Presence",
          },
        ),
      ),
      include: Type.Optional(
        Type.Array(
          Type.String({ description: "The name of the cookie to include.", minLength: 1, title: "Cookie Name" }),
          {
            description: "A list of cookies to include in the cache key.",
            minItems: 1,
            uniqueItems: true,
            title: "Include",
          },
        ),
      ),
    },
    { description: "Which cookies to include in the cache key." },
  ),
)

export const RulesetsSetcachesettingscustomcachekeyheader = named(
  "rulesets_SetCacheSettingsCustomCacheKeyHeader",
  Type.Object(
    {
      check_presence: Type.Optional(
        Type.Array(
          Type.String({
            description: "The name of the header to check for the presence of.",
            minLength: 1,
            title: "Header",
          }),
          {
            description:
              "A list of headers to check for the presence of. The presence of these headers is included in the cache key.",
            minItems: 1,
            uniqueItems: true,
            title: "Check Presence",
          },
        ),
      ),
      contains: Type.Optional(
        Type.Record(
          Type.String(),
          Type.Array(
            Type.String({ description: "The header value to match against.", minLength: 1, title: "Header Value" }),
            {
              description: "A list of values to match the header against.",
              minItems: 1,
              uniqueItems: true,
              title: "Header Values",
            },
          ),
        ),
      ),
      exclude_origin: Type.Optional(
        Type.Boolean({
          description: "Whether to exclude the origin header in the cache key.",
          title: "Exclude Origin",
        }),
      ),
      include: Type.Optional(
        Type.Array(Type.String({ description: "The name of the header to include.", minLength: 1, title: "Header" }), {
          description: "A list of headers to include in the cache key.",
          minItems: 1,
          uniqueItems: true,
          title: "Include",
        }),
      ),
    },
    { description: "Which headers to include in the cache key." },
  ),
)

export const RulesetsSetcachesettingscustomcachekeyhost = named(
  "rulesets_SetCacheSettingsCustomCacheKeyHost",
  Type.Object(
    {
      resolved: Type.Optional(
        Type.Boolean({ description: "Whether to use the resolved host in the cache key.", title: "Use Resolved Host" }),
      ),
    },
    { description: "How to use the host in the cache key." },
  ),
)

export const RulesetsSetcachesettingscustomcachekeyquerystring = named(
  "rulesets_SetCacheSettingsCustomCacheKeyQueryString",
  Type.Object(
    {
      exclude: Type.Optional(
        Type.Object(
          {
            all: Type.Optional(
              Type.Union([Type.Literal(true)], {
                description: "Whether to exclude all query string parameters from the cache key.",
              }),
            ),
            list: Type.Optional(
              Type.Array(
                Type.String({
                  description: "The name of the query string parameter to exclude.",
                  minLength: 1,
                  title: "Parameter Name",
                }),
                {
                  description: "A list of query string parameters to exclude from the cache key.",
                  minItems: 1,
                  uniqueItems: true,
                  title: "Exclude List",
                  "x-stainless-naming": { python: { property_name: "rule_list" } },
                },
              ),
            ),
          },
          { description: "Which query string parameters to exclude from the cache key." },
        ),
      ),
      include: Type.Optional(
        Type.Object(
          {
            all: Type.Optional(
              Type.Union([Type.Literal(true)], {
                description: "Whether to include all query string parameters in the cache key.",
              }),
            ),
            list: Type.Optional(
              Type.Array(
                Type.String({
                  description: "The name of the query string parameter to include.",
                  minLength: 1,
                  title: "Parameter Name",
                }),
                {
                  description: "A list of query string parameters to include in the cache key.",
                  minItems: 1,
                  uniqueItems: true,
                  title: "Include List",
                  "x-stainless-naming": { python: { property_name: "rule_list" } },
                },
              ),
            ),
          },
          { description: "Which query string parameters to include in the cache key." },
        ),
      ),
    },
    { description: "Which query string parameters to include in or exclude from the cache key." },
  ),
)

export const RulesetsSetcachesettingscustomcachekeyuser = named(
  "rulesets_SetCacheSettingsCustomCacheKeyUser",
  Type.Object(
    {
      device_type: Type.Optional(
        Type.Boolean({
          description: "Whether to use the user agent's device type in the cache key.",
          title: "Device Type",
        }),
      ),
      geo: Type.Optional(
        Type.Boolean({ description: "Whether to use the user agents's country in the cache key.", title: "Country" }),
      ),
      lang: Type.Optional(
        Type.Boolean({ description: "Whether to use the user agent's language in the cache key.", title: "Language" }),
      ),
    },
    { description: "How to use characteristics of the request user agent in the cache key." },
  ),
)

export const RulesetsSetcachesettingscustomcachekey = named(
  "rulesets_SetCacheSettingsCustomCacheKey",
  Type.Object(
    {
      cookie: Type.Optional(RulesetsSetcachesettingscustomcachekeycookie),
      header: Type.Optional(RulesetsSetcachesettingscustomcachekeyheader),
      host: Type.Optional(RulesetsSetcachesettingscustomcachekeyhost),
      query_string: Type.Optional(RulesetsSetcachesettingscustomcachekeyquerystring),
      user: Type.Optional(RulesetsSetcachesettingscustomcachekeyuser),
    },
    { description: "Which components of the request are included or excluded from the cache key." },
  ),
)

export const RulesetsSetcachesettingscachekey = named(
  "rulesets_SetCacheSettingsCacheKey",
  Type.Object(
    {
      cache_by_device_type: Type.Optional(
        Type.Boolean({
          description: "Whether to separate cached content based on the visitor's device type.",
          title: "Cache by Device Type",
        }),
      ),
      cache_deception_armor: Type.Optional(
        Type.Boolean({
          description:
            "Whether to protect from web cache deception attacks, while allowing static assets to be cached.",
          title: "Cache Deception Armor",
        }),
      ),
      custom_key: Type.Optional(RulesetsSetcachesettingscustomcachekey),
      ignore_query_strings_order: Type.Optional(
        Type.Boolean({
          description:
            "Whether to treat requests with the same query parameters the same, regardless of the order those query parameters are in.",
          title: "Ignore Query Strings Order",
        }),
      ),
    },
    {
      description:
        "Which components of the request are included in or excluded from the cache key Cloudflare uses to store the response in cache.",
    },
  ),
)

export const RulesetsSetcachesettingscachereserve = named(
  "rulesets_SetCacheSettingsCacheReserve",
  Type.Object(
    {
      eligible: Type.Boolean({
        description:
          "Whether Cache Reserve is enabled. If this is true and a request meets eligibility criteria, Cloudflare will write the resource to Cache Reserve.",
        title: "Eligible",
      }),
      minimum_file_size: Type.Optional(
        Type.Integer({
          description: "The minimum file size eligible for storage in Cache Reserve.",
          minimum: 0,
          title: "Minimum File Size",
        }),
      ),
    },
    {
      description:
        "Settings to determine whether the request's response from origin is eligible for Cache Reserve (requires a Cache Reserve add-on plan).",
    },
  ),
)

export const RulesetsSetcachesettingsstatuscodettl = named(
  "rulesets_SetCacheSettingsStatusCodeTTL",
  Type.Array(
    Type.Object({
      status_code: Type.Optional(
        Type.Integer({
          description: "A single status code to apply the TTL to.",
          minimum: 100,
          maximum: 999,
          title: "Status Code",
        }),
      ),
      status_code_range: Type.Optional(
        Type.Object(
          {
            from: Type.Optional(
              Type.Integer({ description: "The lower bound of the range.", minimum: 100, maximum: 999, title: "From" }),
            ),
            to: Type.Optional(
              Type.Integer({ description: "The upper bound of the range.", minimum: 100, maximum: 999, title: "To" }),
            ),
          },
          { description: "A range of status codes to apply the TTL to." },
        ),
      ),
      value: Type.Integer({
        description:
          'The time to cache the response for (in seconds). A value of 0 is equivalent to setting the cache control header with the value "no-cache". A value of -1 is equivalent to setting the cache control header with the value of "no-store".',
        title: "TTL Value",
      }),
    }),
    {
      description: "A list of TTLs to apply to specific status codes or status code ranges.",
      minItems: 1,
      uniqueItems: true,
      title: "Status Code TTLs",
    },
  ),
)

export const RulesetsSetcachesettingsedgettl = named(
  "rulesets_SetCacheSettingsEdgeTTL",
  Type.Object(
    {
      default: Type.Optional(
        Type.Integer({
          description: 'The edge TTL (in seconds) if you choose the "override_origin" mode.',
          minimum: 0,
          title: "Default TTL",
        }),
      ),
      mode: Type.Union(
        [Type.Literal("respect_origin"), Type.Literal("bypass_by_default"), Type.Literal("override_origin")],
        { description: "The edge TTL mode." },
      ),
      status_code_ttl: Type.Optional(RulesetsSetcachesettingsstatuscodettl),
    },
    { description: "How long the Cloudflare edge network should cache the response." },
  ),
)

export const RulesetsSetcachesettingsorigincachecontrol = named(
  "rulesets_SetCacheSettingsOriginCacheControl",
  Type.Boolean({
    description: "Whether Cloudflare will aim to strictly adhere to RFC 7234.",
    title: "Origin Cache Control (Enterprise-Only)",
  }),
)

export const RulesetsSetcachesettingsoriginerrorpagepassthru = named(
  "rulesets_SetCacheSettingsOriginErrorPagePassthru",
  Type.Boolean({
    description: "Whether to generate Cloudflare error pages for issues from the origin server.",
    title: "Origin Error Page Passthrough",
  }),
)

export const RulesetsSetcachesettingsreadtimeout = named(
  "rulesets_SetCacheSettingsReadTimeout",
  Type.Integer({
    description:
      "A timeout value between two successive read operations to use for your origin server. Historically, the timeout value between two read options from Cloudflare to an origin server is 100 seconds. If you are attempting to reduce HTTP 524 errors because of timeouts from an origin server, try increasing this timeout value.",
    minimum: 100,
    maximum: 6000,
    title: "Read Timeout (Enterprise-Only)",
  }),
)

export const RulesetsSetcachesettingsrespectstrongetags = named(
  "rulesets_SetCacheSettingsRespectStrongEtags",
  Type.Boolean({
    description:
      "Whether Cloudflare should respect strong ETag (entity tag) headers. If false, Cloudflare converts strong ETag headers to weak ETag headers.",
    title: "Respect Strong ETags",
  }),
)

export const RulesetsSetcachesettingsservestale = named(
  "rulesets_SetCacheSettingsServeStale",
  Type.Object(
    {
      disable_stale_while_updating: Type.Optional(
        Type.Boolean({
          description:
            "Whether Cloudflare should disable serving stale content while getting the latest content from the origin.",
          title: "Disable Stale While Updating",
        }),
      ),
    },
    { description: "When to serve stale content from cache." },
  ),
)

export const RulesetsSetcachesettingsrule = named(
  "rulesets_SetCacheSettingsRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("set_cache_settings")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(
      Type.Object(
        {
          additional_cacheable_ports: Type.Optional(RulesetsSetcachesettingsadditionalcacheableports),
          browser_ttl: Type.Optional(RulesetsSetcachesettingsbrowserttl),
          cache: Type.Optional(RulesetsSetcachesettingscache),
          cache_key: Type.Optional(RulesetsSetcachesettingscachekey),
          cache_reserve: Type.Optional(RulesetsSetcachesettingscachereserve),
          edge_ttl: Type.Optional(RulesetsSetcachesettingsedgettl),
          origin_cache_control: Type.Optional(RulesetsSetcachesettingsorigincachecontrol),
          origin_error_page_passthru: Type.Optional(RulesetsSetcachesettingsoriginerrorpagepassthru),
          read_timeout: Type.Optional(RulesetsSetcachesettingsreadtimeout),
          respect_strong_etags: Type.Optional(RulesetsSetcachesettingsrespectstrongetags),
          serve_stale: Type.Optional(RulesetsSetcachesettingsservestale),
        },
        { description: "The parameters configuring the rule's action." },
      ),
    ),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(Type.Intersect([RulesetsRuleenabled, Type.Unknown()])),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsServeerrorcontenttype = named(
  "rulesets_ServeErrorContentType",
  Type.Union(
    [Type.Literal("application/json"), Type.Literal("text/html"), Type.Literal("text/plain"), Type.Literal("text/xml")],
    { description: "The content type header to set with the error response." },
  ),
)

export const RulesetsServeerrorstatuscode = named(
  "rulesets_ServeErrorStatusCode",
  Type.Integer({
    description: "The status code to use for the error.",
    minimum: 400,
    maximum: 999,
    title: "Status Code",
  }),
)

export const RulesetsServeerrorcontent = named(
  "rulesets_ServeErrorContent",
  Type.String({ description: "The response content.", minLength: 1, title: "Content" }),
)

export const RulesetsServeerrorassetname = named(
  "rulesets_ServeErrorAssetName",
  Type.String({
    description: "The name of a custom asset to serve as the error response.",
    minLength: 1,
    title: "Asset Name",
  }),
)

export const RulesetsServeerrorrule = named(
  "rulesets_ServeErrorRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("serve_error")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(
      Type.Union(
        [
          Type.Object({
            content: RulesetsServeerrorcontent,
          }),
          Type.Object({
            asset_name: RulesetsServeerrorassetname,
          }),
        ],
        { description: "The parameters configuring the rule's action." },
      ),
    ),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(Type.Intersect([RulesetsRuleenabled, Type.Unknown()])),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsScoreincrement = named(
  "rulesets_ScoreIncrement",
  Type.Integer({
    description: "A delta to change the score by, which can be either positive or negative.",
    title: "Increment",
  }),
)

export const RulesetsScorerule = named(
  "rulesets_ScoreRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("score")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(
      Type.Object(
        {
          increment: RulesetsScoreincrement,
        },
        { description: "The parameters configuring the rule's action." },
      ),
    ),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(Type.Intersect([RulesetsRuleenabled, Type.Unknown()])),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsRoutehostheader = named(
  "rulesets_RouteHostHeader",
  Type.String({ description: "A value to rewrite the HTTP host header to.", minLength: 1, title: "Host Header" }),
)

export const RulesetsRouteorigin = named(
  "rulesets_RouteOrigin",
  Type.Object(
    {
      host: Type.Optional(Type.String({ description: "A resolved host to route to.", minLength: 1, title: "Host" })),
      port: Type.Optional(
        Type.Integer({ description: "A destination port to route to.", minimum: 1, maximum: 65535, title: "Port" }),
      ),
    },
    { description: "An origin to route to." },
  ),
)

export const RulesetsRoutesni = named(
  "rulesets_RouteSNI",
  Type.Object(
    {
      value: Type.String({ description: "A value to override the SNI to.", minLength: 1, title: "Value" }),
    },
    { description: "A Server Name Indication (SNI) override." },
  ),
)

export const RulesetsRouterule = named(
  "rulesets_RouteRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("route")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(
      Type.Object(
        {
          host_header: Type.Optional(RulesetsRoutehostheader),
          origin: Type.Optional(RulesetsRouteorigin),
          sni: Type.Optional(RulesetsRoutesni),
        },
        { description: "The parameters configuring the rule's action." },
      ),
    ),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(RulesetsRuleenabled),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsRewriteheadervalue = named(
  "rulesets_RewriteHeaderValue",
  Type.String({ description: "A static value for the header.", minLength: 1, title: "Header Value" }),
)

export const RulesetsRewriteheaderexpression = named(
  "rulesets_RewriteHeaderExpression",
  Type.String({
    description: "An expression that evaluates to a value for the header.",
    minLength: 1,
    title: "Header Expression",
  }),
)

export const RulesetsRewriteheaders = named(
  "rulesets_RewriteHeaders",
  Type.Record(
    Type.String(),
    Type.Union([
      Type.Object(
        {
          operation: Type.Union([Type.Literal("add")], { description: "The operation to perform on the header." }),
          value: RulesetsRewriteheadervalue,
        },
        { description: "A header with a static value to add." },
      ),
      Type.Object(
        {
          expression: RulesetsRewriteheaderexpression,
          operation: Type.Union([Type.Literal("add")], { description: "The operation to perform on the header." }),
        },
        { description: "A header with a dynamic value to add." },
      ),
      Type.Object(
        {
          operation: Type.Union([Type.Literal("set")], { description: "The operation to perform on the header." }),
          value: RulesetsRewriteheadervalue,
        },
        { description: "A header with a static value to set." },
      ),
      Type.Object(
        {
          expression: RulesetsRewriteheaderexpression,
          operation: Type.Union([Type.Literal("set")], { description: "The operation to perform on the header." }),
        },
        { description: "A header with a dynamic value to set." },
      ),
      Type.Object(
        {
          operation: Type.Union([Type.Literal("remove")], { description: "The operation to perform on the header." }),
        },
        { description: "A header to remove." },
      ),
    ]),
  ),
)

export const RulesetsRewriteuripath = named(
  "rulesets_RewriteUriPath",
  Type.Object(
    {
      expression: Type.Optional(
        Type.String({
          description: "An expression that evaluates to a value to rewrite the URI path to.",
          minLength: 1,
          title: "Path Expression",
        }),
      ),
      value: Type.Optional(
        Type.String({ description: "A value to rewrite the URI path to.", minLength: 1, title: "Path Value" }),
      ),
    },
    { description: "A URI path rewrite." },
  ),
)

export const RulesetsRewriteuriquery = named(
  "rulesets_RewriteUriQuery",
  Type.Object(
    {
      expression: Type.Optional(
        Type.String({
          description: "An expression that evaluates to a value to rewrite the URI query to.",
          minLength: 1,
          title: "Query Expression",
        }),
      ),
      value: Type.Optional(Type.String({ description: "A value to rewrite the URI query to.", title: "Query Value" })),
    },
    { description: "A URI query rewrite." },
  ),
)

export const RulesetsRewriteuri = named(
  "rulesets_RewriteUri",
  Type.Union([
    Type.Object(
      {
        path: RulesetsRewriteuripath,
      },
      { description: "A URI path rewrite." },
    ),
    Type.Object(
      {
        query: RulesetsRewriteuriquery,
      },
      { description: "A URI query rewrite." },
    ),
  ]),
)

export const RulesetsRewriterule = named(
  "rulesets_RewriteRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("rewrite")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(
      Type.Object(
        {
          headers: Type.Optional(RulesetsRewriteheaders),
          uri: Type.Optional(RulesetsRewriteuri),
        },
        { description: "The parameters configuring the rule's action." },
      ),
    ),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(RulesetsRuleenabled),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsRedirectfromlist = named(
  "rulesets_RedirectFromList",
  Type.Object(
    {
      key: Type.String({
        description: "An expression that evaluates to the list lookup key.",
        minLength: 1,
        title: "Lookup Key",
      }),
      name: Type.String({ description: "The name of the list to match against.", title: "List Name" }),
    },
    { description: "A redirect based on a bulk list lookup." },
  ),
)

export const RulesetsRedirectfromvalue = named(
  "rulesets_RedirectFromValue",
  Type.Object(
    {
      preserve_query_string: Type.Optional(
        Type.Boolean({
          description: "Whether to keep the query string of the original request.",
          default: false,
          title: "Preserve Query String",
        }),
      ),
      status_code: Type.Optional(
        Type.Union([Type.Literal(301), Type.Literal(302), Type.Literal(303), Type.Literal(307), Type.Literal(308)], {
          description: "The status code to use for the redirect.",
        }),
      ),
      target_url: Type.Object(
        {
          expression: Type.Optional(
            Type.String({
              description: "An expression that evaluates to a URL to redirect the request to.",
              minLength: 1,
              title: "Redirect Expression",
            }),
          ),
          value: Type.Optional(
            Type.String({ description: "A URL to redirect the request to.", minLength: 1, title: "Redirect Value" }),
          ),
        },
        { description: "A URL to redirect the request to." },
      ),
    },
    { description: "A redirect based on the request properties." },
  ),
)

export const RulesetsRedirectrule = named(
  "rulesets_RedirectRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("redirect")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(
      Type.Object(
        {
          from_list: Type.Optional(RulesetsRedirectfromlist),
          from_value: Type.Optional(RulesetsRedirectfromvalue),
        },
        { description: "The parameters configuring the rule's action." },
      ),
    ),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(RulesetsRuleenabled),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsManagedchallengerule = named(
  "rulesets_ManagedChallengeRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("managed_challenge")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(Type.Unknown({ description: "The parameters configuring the rule's action." })),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(RulesetsRuleenabled),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsLogcustomfieldcookiefields = named(
  "rulesets_LogCustomFieldCookieFields",
  Type.Array(
    Type.Object(
      {
        name: Type.String({ description: "The name of the cookie.", minLength: 1, title: "Cookie Name" }),
      },
      { description: "The cookie field to log." },
    ),
    { description: "The cookie fields to log.", minItems: 1, title: "Cookie Fields" },
  ),
)

export const RulesetsLogcustomfieldrawresponsefields = named(
  "rulesets_LogCustomFieldRawResponseFields",
  Type.Array(
    Type.Object(
      {
        name: Type.String({ description: "The name of the response header.", minLength: 1, title: "Header Name" }),
        preserve_duplicates: Type.Optional(
          Type.Boolean({
            description: "Whether to log duplicate values of the same header.",
            default: false,
            title: "Preserve Duplicates",
          }),
        ),
      },
      { description: "The raw response field to log." },
    ),
    { description: "The raw response fields to log.", minItems: 1, title: "Raw Response Fields" },
  ),
)

export const RulesetsLogcustomfieldrequestfields = named(
  "rulesets_LogCustomFieldRequestFields",
  Type.Array(
    Type.Object(
      {
        name: Type.String({ description: "The name of the header.", minLength: 1, title: "Header Name" }),
      },
      { description: "The raw request field to log." },
    ),
    { description: "The raw request fields to log.", minItems: 1, title: "Raw Request Fields" },
  ),
)

export const RulesetsLogcustomfieldresponsefields = named(
  "rulesets_LogCustomFieldResponseFields",
  Type.Array(
    Type.Object(
      {
        name: Type.String({ description: "The name of the response header.", minLength: 1, title: "Header Name" }),
        preserve_duplicates: Type.Optional(
          Type.Boolean({
            description: "Whether to log duplicate values of the same header.",
            default: false,
            title: "Preserve Duplicates",
          }),
        ),
      },
      { description: "The transformed response field to log." },
    ),
    { description: "The transformed response fields to log.", minItems: 1, title: "Transformed Response Fields" },
  ),
)

export const RulesetsLogcustomfieldtransformedrequestfields = named(
  "rulesets_LogCustomFieldTransformedRequestFields",
  Type.Array(
    Type.Object(
      {
        name: Type.String({ description: "The name of the header.", minLength: 1, title: "Header Name" }),
      },
      { description: "The transformed request field to log." },
    ),
    { description: "The transformed request fields to log.", minItems: 1, title: "Transformed Request Fields" },
  ),
)

export const RulesetsLogcustomfieldrule = named(
  "rulesets_LogCustomFieldRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("log_custom_field")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(
      Type.Object(
        {
          cookie_fields: Type.Optional(RulesetsLogcustomfieldcookiefields),
          raw_response_fields: Type.Optional(RulesetsLogcustomfieldrawresponsefields),
          request_fields: Type.Optional(RulesetsLogcustomfieldrequestfields),
          response_fields: Type.Optional(RulesetsLogcustomfieldresponsefields),
          transformed_request_fields: Type.Optional(RulesetsLogcustomfieldtransformedrequestfields),
        },
        { description: "The parameters configuring the rule's action." },
      ),
    ),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(RulesetsRuleenabled),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsLogrule = named(
  "rulesets_LogRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("log")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(Type.Unknown({ description: "The parameters configuring the rule's action." })),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(RulesetsRuleenabled),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsJschallengerule = named(
  "rulesets_JsChallengeRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("js_challenge")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(Type.Unknown({ description: "The parameters configuring the rule's action." })),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(RulesetsRuleenabled),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsForceconnectioncloserule = named(
  "rulesets_ForceConnectionCloseRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("force_connection_close")], {
        description: "The action to perform when the rule matches.",
      }),
    ),
    action_parameters: Type.Optional(Type.Unknown({ description: "The parameters configuring the rule's action." })),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(RulesetsRuleenabled),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsExecutematcheddata = named(
  "rulesets_ExecuteMatchedData",
  Type.Object(
    {
      public_key: Type.String({
        description: "The public key to encrypt matched data logs with.",
        minLength: 1,
        title: "Public Key",
      }),
    },
    { description: "The configuration to use for matched data logging." },
  ),
)

export const RulesetsRuleaction = named(
  "rulesets_RuleAction",
  Type.String({ description: "The action to perform when the rule matches.", title: "Action" }),
)

export const RulesetsExecutesensitivitylevel = named(
  "rulesets_ExecuteSensitivityLevel",
  Type.Union([Type.Literal("default"), Type.Literal("medium"), Type.Literal("low"), Type.Literal("eoff")]),
)

export const RulesetsExecutecategoryoverrides = named(
  "rulesets_ExecuteCategoryOverrides",
  Type.Array(
    Type.Object(
      {
        action: Type.Optional(RulesetsRuleaction),
        category: RulesetsRulecategory,
        enabled: Type.Optional(RulesetsRuleenabled),
        sensitivity_level: Type.Optional(RulesetsExecutesensitivitylevel),
      },
      { description: "A category-level override." },
    ),
    {
      description:
        "A list of category-level overrides. This option has the second-highest precedence after rule-level overrides.",
      minItems: 1,
      uniqueItems: true,
      title: "Category Overrides",
    },
  ),
)

export const RulesetsExecuteruleoverrides = named(
  "rulesets_ExecuteRuleOverrides",
  Type.Array(
    Type.Object(
      {
        action: Type.Optional(RulesetsRuleaction),
        enabled: Type.Optional(RulesetsRuleenabled),
        id: RulesetsRuleid,
        score_threshold: Type.Optional(
          Type.Integer({ description: "The score threshold to use for the rule.", title: "Score Threshold" }),
        ),
        sensitivity_level: Type.Optional(RulesetsExecutesensitivitylevel),
      },
      { description: "A rule-level override." },
    ),
    {
      description: "A list of rule-level overrides. This option has the highest precedence.",
      minItems: 1,
      uniqueItems: true,
      title: "Rule Overrides",
    },
  ),
)

export const RulesetsExecuteoverrides = named(
  "rulesets_ExecuteOverrides",
  Type.Object(
    {
      action: Type.Optional(RulesetsRuleaction),
      categories: Type.Optional(RulesetsExecutecategoryoverrides),
      enabled: Type.Optional(RulesetsRuleenabled),
      rules: Type.Optional(RulesetsExecuteruleoverrides),
      sensitivity_level: Type.Optional(RulesetsExecutesensitivitylevel),
    },
    { description: "A set of overrides to apply to the target ruleset." },
  ),
)

export const RulesetsExecuterule = named(
  "rulesets_ExecuteRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("execute")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(
      Type.Object(
        {
          id: RulesetsRulesetid,
          matched_data: Type.Optional(RulesetsExecutematcheddata),
          overrides: Type.Optional(RulesetsExecuteoverrides),
        },
        { description: "The parameters configuring the rule's action." },
      ),
    ),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(RulesetsRuleenabled),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsDdosdynamicrule = named(
  "rulesets_DDoSDynamicRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("ddos_dynamic")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(Type.Unknown({ description: "The parameters configuring the rule's action." })),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(RulesetsRuleenabled),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsCompressresponserule = named(
  "rulesets_CompressResponseRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("compress_response")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(
      Type.Object(
        {
          algorithms: Type.Array(
            Type.Object(
              {
                name: Type.Optional(
                  Type.Union(
                    [
                      Type.Literal("none"),
                      Type.Literal("auto"),
                      Type.Literal("default"),
                      Type.Literal("gzip"),
                      Type.Literal("brotli"),
                      Type.Literal("zstd"),
                    ],
                    { description: "Name of the compression algorithm to enable." },
                  ),
                ),
              },
              { description: "Compression algorithm to enable." },
            ),
            {
              description: "Custom order for compression algorithms.",
              minItems: 1,
              uniqueItems: true,
              title: "Algorithms",
            },
          ),
        },
        { description: "The parameters configuring the rule's action." },
      ),
    ),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(RulesetsRuleenabled),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsChallengerule = named(
  "rulesets_ChallengeRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("challenge")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(Type.Unknown({ description: "The parameters configuring the rule's action." })),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(RulesetsRuleenabled),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsBlockrule = named(
  "rulesets_BlockRule",
  Type.Object({
    action: Type.Optional(
      Type.Union([Type.Literal("block")], { description: "The action to perform when the rule matches." }),
    ),
    action_parameters: Type.Optional(
      Type.Object(
        {
          response: Type.Optional(
            Type.Object(
              {
                content: Type.String({ description: "The content to return.", minLength: 1, title: "Content" }),
                content_type: Type.String({
                  description: "The type of the content to return.",
                  minLength: 1,
                  title: "Content Type",
                }),
                status_code: Type.Integer({
                  description: "The status code to return.",
                  minimum: 400,
                  maximum: 499,
                  title: "Status Code",
                }),
              },
              { description: "The response to show when the block is applied." },
            ),
          ),
        },
        { description: "The parameters configuring the rule's action." },
      ),
    ),
    categories: Type.Optional(RulesetsRulecategories),
    description: Type.Optional(
      Type.String({ description: "An informative description of the rule.", default: "", title: "Description" }),
    ),
    enabled: Type.Optional(RulesetsRuleenabled),
    exposed_credential_check: Type.Optional(RulesetsRuleexposedcredentialcheck),
    expression: Type.Optional(
      Type.String({
        description: "The expression defining which traffic will match the rule.",
        minLength: 1,
        title: "Expression",
      }),
    ),
    id: Type.Optional(RulesetsRuleid),
    last_updated: Type.String({
      description: "The timestamp of when the rule was last modified.",
      format: "date-time",
      readOnly: true,
      title: "Last Updated",
      "x-stainless-skip": ["terraform"],
    }),
    logging: Type.Optional(UnnamedSchemaRef70f2c6ccd8a405358ac7ef8fc3d6751c),
    ratelimit: Type.Optional(RulesetsRuleratelimit),
    ref: Type.Optional(
      Type.String({ description: "The reference of the rule (the rule's ID by default).", minLength: 1, title: "Ref" }),
    ),
    version: Type.String({
      description: "The version of the rule.",
      readOnly: true,
      title: "Version",
      "x-stainless-skip": ["terraform"],
    }),
  }),
)

export const RulesetsRequestrule = named(
  "rulesets_RequestRule",
  Type.Union([
    RulesetsBlockrule,
    RulesetsChallengerule,
    RulesetsCompressresponserule,
    RulesetsDdosdynamicrule,
    RulesetsExecuterule,
    RulesetsForceconnectioncloserule,
    RulesetsJschallengerule,
    RulesetsLogrule,
    RulesetsLogcustomfieldrule,
    RulesetsManagedchallengerule,
    RulesetsRedirectrule,
    RulesetsRewriterule,
    RulesetsRouterule,
    RulesetsScorerule,
    RulesetsServeerrorrule,
    RulesetsSetcachesettingsrule,
    RulesetsSetconfigrule,
    RulesetsSkiprule,
  ]),
)

export const RulesetsResponserule = named("rulesets_ResponseRule", RulesetsRequestrule)

export const RulesetsResponserules = named(
  "rulesets_ResponseRules",
  Type.Array(RulesetsResponserule, { description: "The list of rules in the ruleset.", title: "Rules" }),
)

export const RulesetsRequestrules = named(
  "rulesets_RequestRules",
  Type.Array(RulesetsRequestrule, { description: "The list of rules in the ruleset.", title: "Rules" }),
)

export const RulesetsPerpage = named(
  "rulesets_PerPage",
  Type.Integer({
    description: "The number of rulesets to return per page.",
    minimum: 1,
    maximum: 50,
    title: "Per Page",
  }),
)

export const RulesetsCursor = named(
  "rulesets_Cursor",
  Type.String({ description: "The cursor to use for the next page.", minLength: 1, title: "Cursor" }),
)

export const RulesetsAccountid = named(
  "rulesets_AccountId",
  Type.String({ description: "The unique ID of the account.", title: "Account ID" }),
)

export const RulesetsResultinfo = named(
  "rulesets_ResultInfo",
  Type.Object(
    {
      cursors: Type.Optional(
        Type.Object(
          {
            after: RulesetsCursor,
          },
          { description: "The set of cursors." },
        ),
      ),
    },
    { description: "Information to navigate the results." },
  ),
)

export const RulesetsRulesetkind = named(
  "rulesets_RulesetKind",
  Type.Union([Type.Literal("managed"), Type.Literal("custom"), Type.Literal("root"), Type.Literal("zone")], {
    description: "The kind of the ruleset.",
  }),
)

export const RulesetsRulesetversion = named(
  "rulesets_RulesetVersion",
  Type.String({ description: "The version of the ruleset.", title: "Version" }),
)

export const LogpushDestinationExistsResponse = named(
  "logpush_destination_exists_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Union([
        Type.Object({
          exists: Type.Optional(Type.Boolean({ "x-auditable": true })),
        }),
        Type.Null(),
      ]),
    ),
  }),
)

export const LogpushValidateResponse = named(
  "logpush_validate_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Union([
        Type.Object({
          message: Type.Optional(Type.String({ "x-auditable": true })),
          valid: Type.Optional(Type.Boolean({ "x-auditable": true })),
        }),
        Type.Null(),
      ]),
    ),
  }),
)

export const LogpushValidateOwnership = named(
  "logpush_validate_ownership",
  Type.Union([
    Type.Object({
      valid: Type.Optional(Type.Boolean({ "x-auditable": true })),
    }),
    Type.Null(),
  ]),
)

export const LogpushValidateOwnershipResponse = named(
  "logpush_validate_ownership_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(LogpushValidateOwnership),
  }),
)

export const LogpushGetOwnershipResponse = named(
  "logpush_get_ownership_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Union([
        Type.Object({
          filename: Type.Optional(Type.String({ "x-auditable": true })),
          message: Type.Optional(Type.String({ "x-auditable": true })),
          valid: Type.Optional(Type.Boolean({ "x-auditable": true })),
        }),
        Type.Null(),
      ]),
    ),
  }),
)

export const LogpushId = named(
  "logpush_id",
  Type.Integer({ description: "Unique id of the job.", minimum: 1, "x-auditable": true }),
)

export const LogpushDataset = named(
  "logpush_dataset",
  Type.Union(
    [
      Type.Literal("access_requests"),
      Type.Literal("audit_logs"),
      Type.Literal("audit_logs_v2"),
      Type.Literal("biso_user_actions"),
      Type.Literal("casb_findings"),
      Type.Literal("device_posture_results"),
      Type.Literal("dlp_forensic_copies"),
      Type.Literal("dns_firewall_logs"),
      Type.Literal("dns_logs"),
      Type.Literal("email_security_alerts"),
      Type.Literal("firewall_events"),
      Type.Literal("gateway_dns"),
      Type.Literal("gateway_http"),
      Type.Literal("gateway_network"),
      Type.Literal("http_requests"),
      Type.Literal("magic_ids_detections"),
      Type.Literal("nel_reports"),
      Type.Literal("network_analytics_logs"),
      Type.Literal("page_shield_events"),
      Type.Literal("sinkhole_http_logs"),
      Type.Literal("spectrum_events"),
      Type.Literal("ssh_logs"),
      Type.Literal("workers_trace_events"),
      Type.Literal("zaraz_events"),
      Type.Literal("zero_trust_network_sessions"),
    ],
    {
      description:
        "Name of the dataset. A list of supported datasets can be found on the [Developer Docs](https://developers.cloudflare.com/logs/reference/log-fields/).",
      "x-auditable": true,
    },
  ),
)

export const LogpushDestinationConf = named(
  "logpush_destination_conf",
  Type.String({
    description:
      "Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the destination may be included.",
    format: "uri",
    maxLength: 4096,
  }),
)

export const LogpushEnabled = named(
  "logpush_enabled",
  Type.Boolean({ description: "Flag that indicates if the job is enabled.", default: false, "x-auditable": true }),
)

export const LogpushErrorMessage = named(
  "logpush_error_message",
  Type.Union([
    Type.String({
      description:
        "If not null, the job is currently failing. Failures are usually. repetitive (example: no permissions to write to destination bucket). Only the last failure is recorded. On successful execution of a job the error_message and last_error are set to null.",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const LogpushFrequency = named(
  "logpush_frequency",
  Type.Union([Type.Literal("high"), Type.Literal("low")], {
    description:
      "This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your destination. Setting frequency to high sends your logs in larger quantities of smaller files. Setting frequency to low sends logs in smaller quantities of larger files.",
    "x-auditable": true,
  }),
)

export const LogpushKind = named(
  "logpush_kind",
  Type.Union([Type.Literal(""), Type.Literal("edge")], {
    description:
      "The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const LogpushLastComplete = named(
  "logpush_last_complete",
  Type.Union([
    Type.String({
      description:
        "Records the last time for which logs have been successfully pushed. If the last successful push was for logs range 2018-07-23T10:00:00Z to 2018-07-23T10:01:00Z then the value of this field will be 2018-07-23T10:01:00Z. If the job has never run or has just been enabled and hasn't run yet then the field will be empty.",
      format: "date-time",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const LogpushLastError = named(
  "logpush_last_error",
  Type.Union([
    Type.String({
      description:
        "Records the last time the job failed. If not null, the job is currently. failing. If null, the job has either never failed or has run successfully at least once since last failure. See also the error_message field.",
      format: "date-time",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const LogpushLogpullOptions = named(
  "logpush_logpull_options",
  Type.Union([
    Type.String({
      description:
        "This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp formats. If migrating from the logpull api, copy the url (full url or just the query string) of your call here, and logpush will keep on making this call for you, setting start and end times appropriately.",
      format: "uri-reference",
      maxLength: 4096,
      deprecated: true,
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const LogpushMaxUploadBytes = named(
  "logpush_max_upload_bytes",
  Type.Union([Type.Union([Type.Literal(0)]), Type.Integer({ minimum: 5000000, maximum: 1000000000 })], {
    description:
      "The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.",
    "x-auditable": true,
  }),
)

export const LogpushMaxUploadIntervalSeconds = named(
  "logpush_max_upload_interval_seconds",
  Type.Union([Type.Union([Type.Literal(0)]), Type.Integer({ minimum: 30, maximum: 300 })], {
    description:
      "The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.",
    "x-auditable": true,
  }),
)

export const LogpushMaxUploadRecords = named(
  "logpush_max_upload_records",
  Type.Union([Type.Union([Type.Literal(0)]), Type.Integer({ minimum: 1000, maximum: 1000000 })], {
    description:
      "The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.",
    "x-auditable": true,
  }),
)

export const LogpushName = named(
  "logpush_name",
  Type.Union([
    Type.String({
      description:
        "Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make it easier to identify your job.",
      maxLength: 512,
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const LogpushOutputOptions = named(
  "logpush_output_options",
  Type.Object(
    {
      "CVE-2021-44228": Type.Optional(
        Type.Union([
          Type.Boolean({
            description:
              "If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.",
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      batch_prefix: Type.Optional(
        Type.Union([
          Type.String({ description: "String to be prepended before each batch.", "x-auditable": true }),
          Type.Null(),
        ]),
      ),
      batch_suffix: Type.Optional(
        Type.Union([
          Type.String({ description: "String to be appended after each batch.", "x-auditable": true }),
          Type.Null(),
        ]),
      ),
      field_delimiter: Type.Optional(
        Type.Union([
          Type.String({
            description: "String to join fields. This field be ignored when `record_template` is set.",
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      field_names: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description:
            "List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify all the fields names you are interested in.",
        }),
      ),
      output_type: Type.Optional(
        Type.Union([Type.Literal("ndjson"), Type.Literal("csv")], {
          description:
            "Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output type. Some formatting rules, like string quoting, are different between output types.",
          "x-auditable": true,
        }),
      ),
      record_delimiter: Type.Optional(
        Type.Union([
          Type.String({
            description: "String to be inserted in-between the records as separator.",
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      record_prefix: Type.Optional(
        Type.Union([
          Type.String({ description: "String to be prepended before each record.", "x-auditable": true }),
          Type.Null(),
        ]),
      ),
      record_suffix: Type.Optional(
        Type.Union([
          Type.String({ description: "String to be appended after each record.", "x-auditable": true }),
          Type.Null(),
        ]),
      ),
      record_template: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in `field_names` as well, otherwise they will end up as null. Format as a Go `text/template` without any standard functions, like conditionals, loops, sub-templates, etc.",
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      sample_rate: Type.Optional(
        Type.Union([
          Type.Number({
            description:
              "Floating number to specify sampling rate. Sampling is applied on top of filtering, and regardless of the current `sample_interval` of the data.",
            format: "float",
            minimum: 0,
            maximum: 1,
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      timestamp_format: Type.Optional(
        Type.Union([Type.Literal("unixnano"), Type.Literal("unix"), Type.Literal("rfc3339")], {
          description: "String to specify the format for timestamps, such as `unixnano`, `unix`, or `rfc3339`.",
          "x-auditable": true,
        }),
      ),
    },
    {
      description:
        "The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.",
    },
  ),
)

export const LogpushLogpushJob = named(
  "logpush_logpush_job",
  Type.Union([
    Type.Object({
      dataset: Type.Optional(LogpushDataset),
      destination_conf: Type.Optional(LogpushDestinationConf),
      enabled: Type.Optional(LogpushEnabled),
      error_message: Type.Optional(LogpushErrorMessage),
      frequency: Type.Optional(LogpushFrequency),
      id: Type.Optional(LogpushId),
      kind: Type.Optional(LogpushKind),
      last_complete: Type.Optional(LogpushLastComplete),
      last_error: Type.Optional(LogpushLastError),
      logpull_options: Type.Optional(LogpushLogpullOptions),
      max_upload_bytes: Type.Optional(LogpushMaxUploadBytes),
      max_upload_interval_seconds: Type.Optional(LogpushMaxUploadIntervalSeconds),
      max_upload_records: Type.Optional(LogpushMaxUploadRecords),
      name: Type.Optional(LogpushName),
      output_options: Type.Optional(LogpushOutputOptions),
    }),
    Type.Null(),
  ]),
)

export const LogpushLogpushJobResponseSingle = named(
  "logpush_logpush_job_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(LogpushLogpushJob),
  }),
)

export const LogpushOwnershipChallenge = named(
  "logpush_ownership_challenge",
  Type.String({
    description: "Ownership challenge token to prove destination ownership.",
    maxLength: 4096,
    "x-sensitive": true,
  }),
)

export const LogpushFilter = named(
  "logpush_filter",
  Type.Union([
    Type.String({
      description:
        "The filters to select the events to include and/or remove from your logs. For more information, refer to [Filters](https://developers.cloudflare.com/logs/reference/filters/).",
    }),
    Type.Null(),
  ]),
)

export const LogpushLogpushJobResponseCollection = named(
  "logpush_logpush_job_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(LogpushLogpushJob)),
  }),
)

export const LogpushApiResponseCommonFailure = named(
  "logpush_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const LogpushLogpushFieldResponseCollection = named(
  "logpush_logpush_field_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Unknown()),
  }),
)

export const FirewallApiResponseSingleId = named(
  "firewall_api-response-single-id",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([
      Type.Object({
        id: FirewallIdentifier,
      }),
      Type.Null(),
    ]),
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const FirewallSchemasRule = named(
  "firewall_schemas-rule",
  Type.Object({
    allowed_modes: Type.Array(FirewallSchemasMode, {
      description: "The available actions that a rule can apply to a matched request.",
      readOnly: true,
    }),
    configuration: FirewallConfiguration,
    created_on: Type.Optional(
      Type.String({ description: "The timestamp of when the rule was created.", format: "date-time", readOnly: true }),
    ),
    id: FirewallSchemasIdentifier,
    mode: FirewallSchemasMode,
    modified_on: Type.Optional(
      Type.String({
        description: "The timestamp of when the rule was last modified.",
        format: "date-time",
        readOnly: true,
      }),
    ),
    notes: Type.Optional(FirewallNotes),
    scope: Type.Optional(
      Type.Object(
        {
          email: Type.Optional(FirewallEmail),
          id: Type.Optional(FirewallIdentifier),
          type: Type.Optional(
            Type.Union([Type.Literal("user"), Type.Literal("organization")], {
              description: "Defines the scope of the rule.",
            }),
          ),
        },
        { description: "All zones owned by the user will have the rule applied." },
      ),
    ),
  }),
)

export const FirewallResponseSingle = named(
  "firewall_response_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: FirewallSchemasRule,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const FirewallAccountIdentifier = named(
  "firewall_account_identifier",
  Type.String({ description: "Defines an account identifier.", maxLength: 32 }),
)

export const FirewallResponseCollection = named(
  "firewall_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(FirewallSchemasRule), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
    result_info: Type.Optional(FirewallResultInfo),
  }),
)

export const AccessPreviousClientSecretExpiresAt = named(
  "access_previous_client_secret_expires_at",
  Type.String({
    description:
      "The expiration of the previous `client_secret`. This can be modified at any point after a rotation. For example, you may extend it further into the future if you need more time to update services with the new secret; or move it into the past to immediately invalidate the previous token in case of compromise.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const AccessClientSecretVersion = named(
  "access_client_secret_version",
  Type.Number({
    description:
      "A version number identifying the current `client_secret` associated with the service token. Incrementing it triggers a rotation; the previous secret will still be accepted until the time indicated by `previous_client_secret_expires_at`.",
    default: 1,
    "x-auditable": true,
  }),
)

export const AccessComponentsSchemasResponseCollection = named(
  "access_components-schemas-response_collection",
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
    result: Type.Optional(Type.Array(AccessServiceTokens)),
  }),
)

export const AccessEmptyResponse = named(
  "access_empty_response",
  Type.Object({
    result: Type.Optional(Type.Union([Type.Literal(true), Type.Literal(false)])),
    success: Type.Optional(Type.Union([Type.Literal(true), Type.Literal(false)])),
  }),
)

export const AccessCustomPages = named(
  "access_custom_pages",
  Type.Object({
    forbidden: Type.Optional(
      Type.String({
        description:
          "The uid of the custom page to use when a user is denied access after failing a non-identity rule.",
      }),
    ),
    identity_denied: Type.Optional(
      Type.String({ description: "The uid of the custom page to use when a user is denied access." }),
    ),
  }),
)

export const AccessWarpAuthSessionDuration = named(
  "access_warp_auth_session_duration",
  Type.String({
    description:
      "The amount of time that tokens issued for applications will be valid. Must be in the format `30m` or `2h45m`. Valid time units are: m, h.",
    "x-auditable": true,
  }),
)

export const AccessUserSeatExpirationInactiveTime = named(
  "access_user_seat_expiration_inactive_time",
  Type.String({
    description:
      "The amount of time a user seat is inactive before it expires. When the user seat exceeds the set time of inactivity, the user is removed as an active seat and no longer counts against your Teams seat count.  Minimum value for this setting is 1 month (730h). Must be in the format `300ms` or `2h45m`. Valid time units are: `ns`, `us` (or `µs`), `ms`, `s`, `m`, `h`.",
    "x-auditable": true,
  }),
)

export const AccessUiReadOnlyToggleReason = named(
  "access_ui_read_only_toggle_reason",
  Type.String({ description: "A description of the reason why the UI read only field is being toggled." }),
)

export const AccessSessionDuration = named(
  "access_session_duration",
  Type.String({
    description:
      "The amount of time that tokens issued for applications will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.",
  }),
)

export const AccessName = named(
  "access_name",
  Type.String({ description: "The name of your Zero Trust organization.", "x-auditable": true }),
)

export const AccessLoginDesign = named(
  "access_login_design",
  Type.Object({
    background_color: Type.Optional(Type.String({ description: "The background color on your login page." })),
    footer_text: Type.Optional(Type.String({ description: "The text at the bottom of your login page." })),
    header_text: Type.Optional(Type.String({ description: "The text at the top of your login page." })),
    logo_path: Type.Optional(Type.String({ description: "The URL of the logo on your login page." })),
    text_color: Type.Optional(Type.String({ description: "The text color on your login page." })),
  }),
)

export const AccessIsUiReadOnly = named(
  "access_is_ui_read_only",
  Type.Boolean({
    description:
      "Lock all settings as Read-Only in the Dashboard, regardless of user permission. Updates may only be made via the API or Terraform for this account when enabled.",
    default: false,
    "x-auditable": true,
  }),
)

export const AccessAutoRedirectToIdentity = named(
  "access_auto_redirect_to_identity",
  Type.Boolean({
    description: "When set to `true`, users skip the identity provider selection step during login.",
    default: false,
    "x-auditable": true,
  }),
)

export const AccessAuthDomain = named(
  "access_auth_domain",
  Type.String({ description: "The unique subdomain assigned to your Zero Trust organization.", "x-auditable": true }),
)

export const AccessAllowAuthenticateViaWarp = named(
  "access_allow_authenticate_via_warp",
  Type.Boolean({
    description:
      "When set to true, users can authenticate via WARP for any application in your organization. Application settings will take precedence over this value.",
    default: false,
    "x-auditable": true,
  }),
)

export const AccessOrganizations = named(
  "access_organizations",
  Type.Object({
    allow_authenticate_via_warp: Type.Optional(AccessAllowAuthenticateViaWarp),
    auth_domain: Type.Optional(AccessAuthDomain),
    auto_redirect_to_identity: Type.Optional(AccessAutoRedirectToIdentity),
    created_at: Type.Optional(AccessCreatedAt),
    custom_pages: Type.Optional(AccessCustomPages),
    is_ui_read_only: Type.Optional(AccessIsUiReadOnly),
    login_design: Type.Optional(AccessLoginDesign),
    name: Type.Optional(AccessName),
    session_duration: Type.Optional(AccessSessionDuration),
    ui_read_only_toggle_reason: Type.Optional(AccessUiReadOnlyToggleReason),
    updated_at: Type.Optional(AccessCreatedAt),
    user_seat_expiration_inactive_time: Type.Optional(AccessUserSeatExpirationInactiveTime),
    warp_auth_session_duration: Type.Optional(AccessWarpAuthSessionDuration),
  }),
)

export const AccessSingleResponse = named(
  "access_single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessOrganizations),
  }),
)

export const AccessComponentsSchemasName = named(
  "access_components-schemas-name",
  Type.String({ description: "The name of the identity provider, shown to users on the login page." }),
)

export const ScimConfig = named(
  "scim_config",
  Type.Object(
    {
      enabled: Type.Optional(
        Type.Boolean({
          description: "A flag to enable or disable SCIM for the identity provider.",
          default: false,
          "x-auditable": true,
          "x-stainless-terraform-configurability": "computed_optional",
        }),
      ),
      identity_update_behavior: Type.Optional(
        Type.Union([Type.Literal("automatic"), Type.Literal("reauth"), Type.Literal("no_action")], {
          description:
            'Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user\'s identity and augment it with fields from the SCIM user resource. Use "reauth" to force re-authentication on group membership updates, user identity update will only occur after successful re-authentication. With "reauth" identities will not contain fields from the SCIM user resource. With "no_action" identities will not be changed by SCIM updates in any way and users will not be prompted to reauthenticate.',
          "x-auditable": true,
          "x-stainless-terraform-configurability": "computed_optional",
        }),
      ),
      scim_base_url: Type.Optional(
        Type.String({
          description: "The base URL of Cloudflare's SCIM V2.0 API endpoint.",
          readOnly: true,
          "x-auditable": true,
        }),
      ),
      seat_deprovision: Type.Optional(
        Type.Boolean({
          description:
            "A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user_deprovision is also enabled.",
          default: false,
          "x-auditable": true,
          "x-stainless-terraform-configurability": "computed_optional",
        }),
      ),
      secret: Type.Optional(
        Type.String({
          description:
            "A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose this you will need to refresh it at /access/identity_providers/:idpID/refresh_scim_secret.",
          readOnly: true,
          "x-sensitive": true,
        }),
      ),
      user_deprovision: Type.Optional(
        Type.Boolean({
          description:
            "A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.",
          default: false,
          "x-auditable": true,
          "x-stainless-terraform-configurability": "computed_optional",
        }),
      ),
    },
    {
      description:
        "The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.",
    },
  ),
)

export const AccessIdpType = named(
  "access_idp_type",
  Type.Union(
    [
      Type.Literal("onetimepin"),
      Type.Literal("azureAD"),
      Type.Literal("saml"),
      Type.Literal("centrify"),
      Type.Literal("facebook"),
      Type.Literal("github"),
      Type.Literal("google-apps"),
      Type.Literal("google"),
      Type.Literal("linkedin"),
      Type.Literal("oidc"),
      Type.Literal("okta"),
      Type.Literal("onelogin"),
      Type.Literal("pingone"),
      Type.Literal("yandex"),
    ],
    {
      description:
        "The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).",
    },
  ),
)

export const AccessAzuread = named(
  "access_azureAD",
  Type.Object({
    config: Type.Object(
      {
        client_id: Type.Optional(Type.String({ description: "Your OAuth Client ID" })),
        client_secret: Type.Optional(Type.String({ description: "Your OAuth Client Secret", "x-sensitive": true })),
        claims: Type.Optional(Type.Array(Type.String(), { description: "Custom claims", "x-auditable": true })),
        email_claim_name: Type.Optional(
          Type.String({ description: "The claim name for email in the id_token response.", "x-auditable": true }),
        ),
        conditional_access_enabled: Type.Optional(
          Type.Boolean({
            description: "Should Cloudflare try to load authentication contexts from your account",
            "x-auditable": true,
          }),
        ),
        directory_id: Type.Optional(Type.String({ description: "Your Azure directory uuid", "x-auditable": true })),
        prompt: Type.Optional(
          Type.Union([Type.Literal("login"), Type.Literal("select_account"), Type.Literal("none")], {
            description:
              "Indicates the type of user interaction that is required. prompt=login forces the user to enter their credentials on that request, negating single-sign on. prompt=none is the opposite. It ensures that the user isn't presented with any interactive prompt. If the request can't be completed silently by using single-sign on, the Microsoft identity platform returns an interaction_required error. prompt=select_account interrupts single sign-on providing account selection experience listing all the accounts either in session or any remembered account or an option to choose to use a different account altogether.",
            "x-auditable": true,
          }),
        ),
        support_groups: Type.Optional(
          Type.Boolean({ description: "Should Cloudflare try to load groups from your account", "x-auditable": true }),
        ),
      },
      {
        description:
          "The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).",
      },
    ),
    id: Type.Optional(AccessUuid),
    name: AccessComponentsSchemasName,
    scim_config: Type.Optional(ScimConfig),
    type: AccessIdpType,
  }),
)

export const AccessCentrify = named(
  "access_centrify",
  Type.Object({
    config: Type.Object(
      {
        client_id: Type.Optional(Type.String({ description: "Your OAuth Client ID" })),
        client_secret: Type.Optional(Type.String({ description: "Your OAuth Client Secret", "x-sensitive": true })),
        claims: Type.Optional(Type.Array(Type.String(), { description: "Custom claims", "x-auditable": true })),
        email_claim_name: Type.Optional(
          Type.String({ description: "The claim name for email in the id_token response.", "x-auditable": true }),
        ),
        centrify_account: Type.Optional(Type.String({ description: "Your centrify account url", "x-auditable": true })),
        centrify_app_id: Type.Optional(Type.String({ description: "Your centrify app id", "x-auditable": true })),
      },
      {
        description:
          "The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).",
      },
    ),
    id: Type.Optional(AccessUuid),
    name: AccessComponentsSchemasName,
    scim_config: Type.Optional(ScimConfig),
    type: AccessIdpType,
  }),
)

export const AccessGenericOauthConfig = named(
  "access_generic-oauth-config",
  Type.Object({
    client_id: Type.Optional(Type.String({ description: "Your OAuth Client ID" })),
    client_secret: Type.Optional(Type.String({ description: "Your OAuth Client Secret", "x-sensitive": true })),
  }),
)

export const AccessFacebook = named(
  "access_facebook",
  Type.Object({
    config: AccessGenericOauthConfig,
    id: Type.Optional(AccessUuid),
    name: AccessComponentsSchemasName,
    scim_config: Type.Optional(ScimConfig),
    type: AccessIdpType,
  }),
)

export const AccessGithub = named(
  "access_github",
  Type.Object({
    config: AccessGenericOauthConfig,
    id: Type.Optional(AccessUuid),
    name: AccessComponentsSchemasName,
    scim_config: Type.Optional(ScimConfig),
    type: AccessIdpType,
  }),
)

export const AccessGoogle = named(
  "access_google",
  Type.Object({
    config: Type.Object(
      {
        client_id: Type.Optional(Type.String({ description: "Your OAuth Client ID" })),
        client_secret: Type.Optional(Type.String({ description: "Your OAuth Client Secret", "x-sensitive": true })),
        claims: Type.Optional(Type.Array(Type.String(), { description: "Custom claims", "x-auditable": true })),
        email_claim_name: Type.Optional(
          Type.String({ description: "The claim name for email in the id_token response.", "x-auditable": true }),
        ),
      },
      {
        description:
          "The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).",
      },
    ),
    id: Type.Optional(AccessUuid),
    name: AccessComponentsSchemasName,
    scim_config: Type.Optional(ScimConfig),
    type: AccessIdpType,
  }),
)

export const AccessGoogleApps = named(
  "access_google-apps",
  Type.Object({
    config: Type.Object(
      {
        client_id: Type.Optional(Type.String({ description: "Your OAuth Client ID" })),
        client_secret: Type.Optional(Type.String({ description: "Your OAuth Client Secret", "x-sensitive": true })),
        claims: Type.Optional(Type.Array(Type.String(), { description: "Custom claims", "x-auditable": true })),
        email_claim_name: Type.Optional(
          Type.String({ description: "The claim name for email in the id_token response.", "x-auditable": true }),
        ),
        apps_domain: Type.Optional(Type.String({ description: "Your companies TLD" })),
      },
      {
        description:
          "The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).",
      },
    ),
    id: Type.Optional(AccessUuid),
    name: AccessComponentsSchemasName,
    scim_config: Type.Optional(ScimConfig),
    type: AccessIdpType,
  }),
)

export const AccessLinkedin = named(
  "access_linkedin",
  Type.Object({
    config: AccessGenericOauthConfig,
    id: Type.Optional(AccessUuid),
    name: AccessComponentsSchemasName,
    scim_config: Type.Optional(ScimConfig),
    type: AccessIdpType,
  }),
)

export const AccessOidc = named(
  "access_oidc",
  Type.Object({
    config: Type.Object(
      {
        client_id: Type.Optional(Type.String({ description: "Your OAuth Client ID" })),
        client_secret: Type.Optional(Type.String({ description: "Your OAuth Client Secret", "x-sensitive": true })),
        claims: Type.Optional(Type.Array(Type.String(), { description: "Custom claims", "x-auditable": true })),
        email_claim_name: Type.Optional(
          Type.String({ description: "The claim name for email in the id_token response.", "x-auditable": true }),
        ),
        auth_url: Type.Optional(Type.String({ description: "The authorization_endpoint URL of your IdP" })),
        certs_url: Type.Optional(
          Type.String({ description: "The jwks_uri endpoint of your IdP to allow the IdP keys to sign the tokens" }),
        ),
        pkce_enabled: Type.Optional(Type.Boolean({ description: "Enable Proof Key for Code Exchange (PKCE)" })),
        scopes: Type.Optional(Type.Array(Type.String(), { description: "OAuth scopes" })),
        token_url: Type.Optional(Type.String({ description: "The token_endpoint URL of your IdP" })),
      },
      {
        description:
          "The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).",
      },
    ),
    id: Type.Optional(AccessUuid),
    name: AccessComponentsSchemasName,
    scim_config: Type.Optional(ScimConfig),
    type: AccessIdpType,
  }),
)

export const AccessOkta = named(
  "access_okta",
  Type.Object({
    config: Type.Object(
      {
        client_id: Type.Optional(Type.String({ description: "Your OAuth Client ID" })),
        client_secret: Type.Optional(Type.String({ description: "Your OAuth Client Secret", "x-sensitive": true })),
        claims: Type.Optional(Type.Array(Type.String(), { description: "Custom claims", "x-auditable": true })),
        email_claim_name: Type.Optional(
          Type.String({ description: "The claim name for email in the id_token response.", "x-auditable": true }),
        ),
        authorization_server_id: Type.Optional(Type.String({ description: "Your okta authorization server id" })),
        okta_account: Type.Optional(Type.String({ description: "Your okta account url", "x-auditable": true })),
      },
      {
        description:
          "The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).",
      },
    ),
    id: Type.Optional(AccessUuid),
    name: AccessComponentsSchemasName,
    scim_config: Type.Optional(ScimConfig),
    type: AccessIdpType,
  }),
)

export const AccessOnelogin = named(
  "access_onelogin",
  Type.Object({
    config: Type.Object(
      {
        client_id: Type.Optional(Type.String({ description: "Your OAuth Client ID" })),
        client_secret: Type.Optional(Type.String({ description: "Your OAuth Client Secret", "x-sensitive": true })),
        claims: Type.Optional(Type.Array(Type.String(), { description: "Custom claims", "x-auditable": true })),
        email_claim_name: Type.Optional(
          Type.String({ description: "The claim name for email in the id_token response.", "x-auditable": true }),
        ),
        onelogin_account: Type.Optional(Type.String({ description: "Your OneLogin account url", "x-auditable": true })),
      },
      {
        description:
          "The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).",
      },
    ),
    id: Type.Optional(AccessUuid),
    name: AccessComponentsSchemasName,
    scim_config: Type.Optional(ScimConfig),
    type: AccessIdpType,
  }),
)

export const AccessPingone = named(
  "access_pingone",
  Type.Object({
    config: Type.Object(
      {
        client_id: Type.Optional(Type.String({ description: "Your OAuth Client ID" })),
        client_secret: Type.Optional(Type.String({ description: "Your OAuth Client Secret", "x-sensitive": true })),
        claims: Type.Optional(Type.Array(Type.String(), { description: "Custom claims", "x-auditable": true })),
        email_claim_name: Type.Optional(
          Type.String({ description: "The claim name for email in the id_token response.", "x-auditable": true }),
        ),
        ping_env_id: Type.Optional(
          Type.String({ description: "Your PingOne environment identifier", "x-auditable": true }),
        ),
      },
      {
        description:
          "The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).",
      },
    ),
    id: Type.Optional(AccessUuid),
    name: AccessComponentsSchemasName,
    scim_config: Type.Optional(ScimConfig),
    type: AccessIdpType,
  }),
)

export const AccessSaml = named(
  "access_saml",
  Type.Object({
    config: Type.Object(
      {
        attributes: Type.Optional(
          Type.Array(Type.String(), {
            description:
              "A list of SAML attribute names that will be added to your signed JWT token and can be used in SAML policy rules.",
          }),
        ),
        email_attribute_name: Type.Optional(
          Type.String({ description: "The attribute name for email in the SAML response.", "x-auditable": true }),
        ),
        header_attributes: Type.Optional(
          Type.Array(
            Type.Object({
              attribute_name: Type.Optional(Type.String({ description: "attribute name from the IDP" })),
              header_name: Type.Optional(
                Type.String({ description: "header that will be added on the request to the origin" }),
              ),
            }),
            {
              description:
                "Add a list of attribute names that will be returned in the response header from the Access callback.",
            },
          ),
        ),
        idp_public_certs: Type.Optional(
          Type.Array(Type.String(), {
            description: "X509 certificate to verify the signature in the SAML authentication response",
          }),
        ),
        issuer_url: Type.Optional(Type.String({ description: "IdP Entity ID or Issuer URL", "x-auditable": true })),
        sign_request: Type.Optional(
          Type.Boolean({
            description:
              "Sign the SAML authentication request with Access credentials. To verify the signature, use the public key from the Access certs endpoints.",
            default: false,
          }),
        ),
        sso_target_url: Type.Optional(
          Type.String({ description: "URL to send the SAML authentication requests to", "x-auditable": true }),
        ),
      },
      {
        description:
          "The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).",
      },
    ),
    id: Type.Optional(AccessUuid),
    name: AccessComponentsSchemasName,
    scim_config: Type.Optional(ScimConfig),
    type: AccessIdpType,
  }),
)

export const AccessYandex = named(
  "access_yandex",
  Type.Object({
    config: AccessGenericOauthConfig,
    id: Type.Optional(AccessUuid),
    name: AccessComponentsSchemasName,
    scim_config: Type.Optional(ScimConfig),
    type: AccessIdpType,
  }),
)

export const AccessOnetimepin = named(
  "access_onetimepin",
  Type.Object({
    config: Type.Object(
      {
        redirect_url: Type.Optional(Type.String({ readOnly: true })),
      },
      {
        description:
          "The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).",
      },
    ),
    id: Type.Optional(AccessUuid),
    name: AccessComponentsSchemasName,
    scim_config: Type.Optional(ScimConfig),
    type: AccessIdpType,
  }),
)

export const AccessIdentityProviders = named(
  "access_identity-providers",
  Type.Union([
    AccessAzuread,
    AccessCentrify,
    AccessFacebook,
    AccessGithub,
    AccessGoogle,
    AccessGoogleApps,
    AccessLinkedin,
    AccessOidc,
    AccessOkta,
    AccessOnelogin,
    AccessPingone,
    AccessSaml,
    AccessYandex,
    AccessOnetimepin,
  ]),
)

export const AccessComponentsSchemasSingleResponse = named(
  "access_components-schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessIdentityProviders),
  }),
)

export const AccessResponseCollection = named(
  "access_response_collection",
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
    result: Type.Optional(
      Type.Array(
        Type.Union([
          AccessAzuread,
          AccessCentrify,
          AccessFacebook,
          AccessGithub,
          AccessGoogle,
          AccessGoogleApps,
          AccessLinkedin,
          AccessOidc,
          AccessOkta,
          AccessOnelogin,
          AccessPingone,
          AccessSaml,
          AccessYandex,
        ]),
      ),
    ),
  }),
)

export const AccessExclude = named(
  "access_exclude",
  Type.Array(AccessRule, {
    description:
      "Rules evaluated with a NOT logical operator. To match a policy, a user cannot meet any of the Exclude rules.",
  }),
)

export const AccessInclude = named(
  "access_include",
  Type.Array(AccessRule, {
    description: "Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.",
  }),
)

export const AccessRequire = named(
  "access_require",
  Type.Array(AccessRule, {
    description:
      "Rules evaluated with an AND logical operator. To match a policy, a user must meet all of the Require rules.",
  }),
)

export const AccessGroupsComponentsSchemasName = named(
  "access_groups_components-schemas-name",
  Type.String({ description: "The name of the Access group.", "x-auditable": true }),
)

export const AccessSchemasGroups = named(
  "access_schemas-groups",
  Type.Object({
    created_at: Type.Optional(AccessCreatedAt),
    exclude: Type.Optional(AccessExclude),
    id: Type.Optional(AccessUuid),
    include: Type.Optional(AccessInclude),
    is_default: Type.Optional(AccessRequire),
    name: Type.Optional(AccessGroupsComponentsSchemasName),
    require: Type.Optional(AccessRequire),
    updated_at: Type.Optional(AccessCreatedAt),
  }),
)

export const AccessGroupsComponentsSchemasSingleResponse = named(
  "access_groups_components-schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessSchemasGroups),
  }),
)

export const AccessIsDefault = named(
  "access_is_default",
  Type.Boolean({ description: "Whether this is the default group", "x-auditable": true }),
)

export const AccessSchemasResponseCollection = named(
  "access_schemas-response_collection",
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
    result: Type.Optional(Type.Array(AccessSchemasGroups)),
  }),
)

export const AccessSettings = named(
  "access_settings",
  Type.Object({
    china_network: Type.Boolean({
      description:
        "Request client certificates for this hostname in China. Can only be set to true if this zone is china network enabled.",
      "x-auditable": true,
    }),
    client_certificate_forwarding: Type.Boolean({
      description:
        "Client Certificate Forwarding is a feature that takes the client cert provided by the eyeball to the edge, and forwards it to the origin as a HTTP header to allow logging on the origin.",
      "x-auditable": true,
    }),
    hostname: Type.String({ description: "The hostname that these settings apply to.", "x-auditable": true }),
  }),
)

export const AccessResponseCollectionHostnames = named(
  "access_response_collection_hostnames",
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
    result: Type.Optional(Type.Array(AccessSettings)),
  }),
)

export const AccessAssociatedHostnames = named(
  "access_associated_hostnames",
  Type.Array(Type.String({ description: "A fully-qualified domain name (FQDN).", "x-auditable": true }), {
    description: "The hostnames of the applications that will use this certificate.",
  }),
)

export const AccessFingerprint = named(
  "access_fingerprint",
  Type.String({ description: "The MD5 fingerprint of the certificate." }),
)

export const AccessCertificatesComponentsSchemasName = named(
  "access_certificates_components-schemas-name",
  Type.String({ description: "The name of the certificate.", "x-auditable": true }),
)

export const AccessCertificates = named(
  "access_certificates",
  Type.Object({
    associated_hostnames: Type.Optional(AccessAssociatedHostnames),
    created_at: Type.Optional(AccessCreatedAt),
    expires_on: Type.Optional(DlsTimestamp),
    fingerprint: Type.Optional(AccessFingerprint),
    id: Type.Optional(
      Type.String({ description: "The ID of the application that will use this certificate.", "x-auditable": true }),
    ),
    name: Type.Optional(AccessCertificatesComponentsSchemasName),
    updated_at: Type.Optional(AccessCreatedAt),
  }),
)

export const AccessCertificatesComponentsSchemasSingleResponse = named(
  "access_certificates_components-schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessCertificates),
  }),
)

export const AccessCertificatesComponentsSchemasResponseCollection = named(
  "access_certificates_components-schemas-response_collection",
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
    result: Type.Optional(Type.Array(AccessCertificates)),
  }),
)

export const AccessPolicyCheckResponse = named(
  "access_policy_check_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        app_state: Type.Optional(
          Type.Object({
            app_uid: Type.Optional(AccessUuid),
            aud: Type.Optional(Type.String()),
            hostname: Type.Optional(Type.String()),
            name: Type.Optional(Type.String()),
            policies: Type.Optional(Type.Array(Type.Unknown())),
            status: Type.Optional(Type.String()),
          }),
        ),
        user_identity: Type.Optional(
          Type.Object({
            account_id: Type.Optional(Type.String()),
            device_sessions: Type.Optional(Type.Unknown()),
            email: Type.Optional(Type.String()),
            geo: Type.Optional(UnnamedSchemaRef6a02fe18089d53b52b2cd3949b717919),
            iat: Type.Optional(Type.Integer()),
            id: Type.Optional(Type.String()),
            is_gateway: Type.Optional(Type.Boolean()),
            is_warp: Type.Optional(Type.Boolean()),
            name: Type.Optional(Type.String()),
            user_uuid: Type.Optional(AccessUuid),
            version: Type.Optional(Type.Integer()),
          }),
        ),
      }),
    ),
  }),
)

export const AccessAllowIframe = named(
  "access_allow_iframe",
  Type.Boolean({ description: "Enables loading application content in an iFrame." }),
)

export const AccessSkipInterstitial = named(
  "access_skip_interstitial",
  Type.Boolean({ description: "Enables automatic authentication through cloudflared." }),
)

export const AccessAppSettingsRequest = named(
  "access_app_settings_request",
  Type.Object({
    allow_iframe: Type.Optional(AccessAllowIframe),
    skip_interstitial: Type.Optional(AccessSkipInterstitial),
  }),
)

export const AccessSingleResponseUpdate = named(
  "access_single_response_update",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessAppSettingsRequest),
  }),
)

export const AccessSchemasEmptyResponse = named(
  "access_schemas-empty_response",
  Type.Object({
    result: Type.Optional(Type.Union([Type.Unknown(), Type.Null()])),
    success: Type.Optional(Type.Union([Type.Literal(true), Type.Literal(false)])),
  }),
)

export const AccessAppPoliciesComponentsSchemasSingleResponse = named(
  "access_app-policies_components-schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessAppPolicyResponse),
  }),
)

export const AccessAppPolicyRequest = named(
  "access_app_policy_request",
  Type.Object({
    precedence: Type.Optional(AccessPrecedence),
    approval_groups: Type.Optional(AccessApprovalGroups),
    approval_required: Type.Optional(AccessApprovalRequired),
    isolation_required: Type.Optional(AccessIsolationRequired),
    purpose_justification_prompt: Type.Optional(AccessPurposeJustificationPrompt),
    purpose_justification_required: Type.Optional(AccessPurposeJustificationRequired),
    session_duration: Type.Optional(AccessComponentsSchemasSessionDuration),
  }),
)

export const AccessSchemasId = named(
  "access_schemas-id",
  Type.String({ description: "The ID of the CA.", maxLength: 48, readOnly: true, "x-auditable": true }),
)

export const AccessSchemasIdResponse = named(
  "access_schemas-id_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        id: Type.Optional(AccessSchemasId),
      }),
    ),
  }),
)

export const AccessAud = named(
  "access_aud",
  Type.String({
    description: "The Application Audience (AUD) tag. Identifies the application associated with the CA.",
    maxLength: 64,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const AccessPublicKey = named(
  "access_public_key",
  Type.String({ description: "The public key to add to your SSH server configuration.", readOnly: true }),
)

export const AccessCa = named(
  "access_ca",
  Type.Object({
    aud: Type.Optional(AccessAud),
    id: Type.Optional(AccessSchemasId),
    public_key: Type.Optional(AccessPublicKey),
  }),
)

export const AccessCaComponentsSchemasSingleResponse = named(
  "access_ca_components-schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessCa),
  }),
)

export const AccessAppId = named("access_app_id", Type.Union([DlsIdentifier, AccessUuid]))

export const AccessSchemasAud = named(
  "access_schemas-aud",
  Type.String({ description: "Audience tag.", maxLength: 64, readOnly: true }),
)

export const AccessSchemasAllowAuthenticateViaWarp = named(
  "access_schemas-allow_authenticate_via_warp",
  Type.Boolean({
    description:
      "When set to true, users can authenticate to this application using their WARP session.  When set to false this application will always require direct IdP authentication. This setting always overrides the organization setting for WARP authentication.",
  }),
)

export const AccessAllowedIdps = named(
  "access_allowed_idps",
  Type.Array(Type.String({ description: "The identity providers selected for application." }), {
    description:
      "The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.",
  }),
)

export const AccessAppLauncherVisible = named(
  "access_app_launcher_visible",
  Type.Boolean({ description: "Displays the application in the App Launcher.", default: true }),
)

export const AccessSchemasAutoRedirectToIdentity = named(
  "access_schemas-auto_redirect_to_identity",
  Type.Boolean({
    description:
      "When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.",
    default: false,
  }),
)

export const AccessAllowAllHeaders = named(
  "access_allow_all_headers",
  Type.Boolean({ description: "Allows all HTTP request headers." }),
)

export const AccessAllowAllMethods = named(
  "access_allow_all_methods",
  Type.Boolean({ description: "Allows all HTTP request methods." }),
)

export const AccessAllowAllOrigins = named(
  "access_allow_all_origins",
  Type.Boolean({ description: "Allows all origins." }),
)

export const AccessAllowCredentials = named(
  "access_allow_credentials",
  Type.Boolean({
    description:
      "When set to `true`, includes credentials (cookies, authorization headers, or TLS client certificates) with requests.",
  }),
)

export const AccessAllowedHeaders = named(
  "access_allowed_headers",
  Type.Array(Type.String(), { description: "Allowed HTTP request headers." }),
)

export const AccessAllowedMethods = named(
  "access_allowed_methods",
  Type.Array(
    Type.Union([
      Type.Literal("GET"),
      Type.Literal("POST"),
      Type.Literal("HEAD"),
      Type.Literal("PUT"),
      Type.Literal("DELETE"),
      Type.Literal("CONNECT"),
      Type.Literal("OPTIONS"),
      Type.Literal("TRACE"),
      Type.Literal("PATCH"),
    ]),
    { description: "Allowed HTTP request methods." },
  ),
)

export const AccessAllowedOrigins = named(
  "access_allowed_origins",
  Type.Array(Type.String(), { description: "Allowed origins." }),
)

export const AccessMaxAge = named(
  "access_max_age",
  Type.Number({
    description: "The maximum number of seconds the results of a preflight request can be cached.",
    minimum: -1,
    maximum: 86400,
  }),
)

export const AccessCorsHeaders = named(
  "access_cors_headers",
  Type.Object({
    allow_all_headers: Type.Optional(AccessAllowAllHeaders),
    allow_all_methods: Type.Optional(AccessAllowAllMethods),
    allow_all_origins: Type.Optional(AccessAllowAllOrigins),
    allow_credentials: Type.Optional(AccessAllowCredentials),
    allowed_headers: Type.Optional(AccessAllowedHeaders),
    allowed_methods: Type.Optional(AccessAllowedMethods),
    allowed_origins: Type.Optional(AccessAllowedOrigins),
    max_age: Type.Optional(AccessMaxAge),
  }),
)

export const AccessCustomDenyMessage = named(
  "access_custom_deny_message",
  Type.String({
    description: "The custom error message shown to a user when they are denied access to the application.",
  }),
)

export const AccessCustomDenyUrl = named(
  "access_custom_deny_url",
  Type.String({
    description:
      "The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.",
  }),
)

export const AccessCustomNonIdentityDenyUrl = named(
  "access_custom_non_identity_deny_url",
  Type.String({
    description:
      "The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.",
  }),
)

export const AccessSchemasCustomPages = named(
  "access_schemas-custom_pages",
  Type.Array(Type.String({ description: "The custom pages selected for application." }), {
    description: "The custom pages that will be displayed when applicable for this application",
  }),
)

export const AccessDestinations = named(
  "access_destinations",
  Type.Array(
    Type.Union([
      Type.Object(
        {
          type: Type.Optional(Type.Union([Type.Literal("public")])),
          uri: Type.Optional(
            Type.String({
              description:
                "The URI of the destination. Public destinations' URIs can include a domain and path with [wildcards](https://developers.cloudflare.com/cloudflare-one/policies/access/app-paths/).\n",
            }),
          ),
        },
        {
          description:
            "A public hostname that Access will secure. Public destinations support sub-domain and path. Wildcard '*' can be used in the definition.\n",
        },
      ),
      Type.Object(
        {
          cidr: Type.Optional(
            Type.String({ description: "The CIDR range of the destination. Single IPs will be computed as /32." }),
          ),
          hostname: Type.Optional(
            Type.String({
              description: "The hostname of the destination. Matches a valid SNI served by an HTTPS origin.",
            }),
          ),
          l4_protocol: Type.Optional(
            Type.Union([Type.Literal("tcp"), Type.Literal("udp")], {
              description: "The L4 protocol of the destination. When omitted, both UDP and TCP traffic will match.",
            }),
          ),
          port_range: Type.Optional(
            Type.String({
              description:
                "The port range of the destination. Can be a single port or a range of ports. When omitted, all ports will match.\n",
            }),
          ),
          type: Type.Optional(Type.Union([Type.Literal("private")])),
          vnet_id: Type.Optional(
            Type.String({ description: "The VNET ID to match the destination. When omitted, all VNETs will match." }),
          ),
        },
        { description: "Private destinations are an early access feature and gated behind a feature flag." },
      ),
    ]),
    {
      description:
        "List of destinations secured by Access. This supersedes `self_hosted_domains` to allow for more flexibility in defining different types of domains. If `destinations` are provided, then `self_hosted_domains` will be ignored.\n",
    },
  ),
)

export const AccessDomain = named(
  "access_domain",
  Type.String({
    description:
      "The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.",
  }),
)

export const AccessEnableBindingCookie = named(
  "access_enable_binding_cookie",
  Type.Boolean({
    description:
      "Enables the binding cookie, which increases security against compromised authorization tokens and CSRF attacks.",
    default: false,
  }),
)

export const AccessHttpOnlyCookieAttribute = named(
  "access_http_only_cookie_attribute",
  Type.Boolean({
    description: "Enables the HttpOnly cookie attribute, which increases security against XSS attacks.",
    default: true,
  }),
)

export const AccessLogoUrl = named(
  "access_logo_url",
  Type.String({ description: "The image URL for the logo shown in the App Launcher dashboard." }),
)

export const AccessAppsComponentsSchemasName = named(
  "access_apps_components-schemas-name",
  Type.String({ description: "The name of the application." }),
)

export const AccessOptionsPreflightBypass = named(
  "access_options_preflight_bypass",
  Type.Boolean({
    description:
      "Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.",
  }),
)

export const AccessPathCookieAttribute = named(
  "access_path_cookie_attribute",
  Type.Boolean({
    description:
      "Enables cookie paths to scope an application's JWT to the application path. If disabled, the JWT will scope to the hostname by default",
    default: false,
  }),
)

export const AccessReadServiceTokensFromHeader = named(
  "access_read_service_tokens_from_header",
  Type.String({
    description:
      'Allows matching Access Service Tokens passed HTTP in a single header with this name.\nThis works as an alternative to the (CF-Access-Client-Id, CF-Access-Client-Secret) pair of headers.\nThe header value will be interpreted as a json object similar to: \n  {\n    "cf-access-client-id": "88bf3b6d86161464f6509f7219099e57.access.example.com",\n    "cf-access-client-secret": "bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5"\n  }\n',
  }),
)

export const AccessSameSiteCookieAttribute = named(
  "access_same_site_cookie_attribute",
  Type.String({
    description: "Sets the SameSite cookie setting, which provides increased security against CSRF attacks.",
  }),
)

export const AccessScimConfigAuthenticationHttpBasic = named(
  "access_scim_config_authentication_http_basic",
  Type.Object(
    {
      password: Type.String({ description: "Password used to authenticate with the remote SCIM service." }),
      scheme: Type.Union([Type.Literal("httpbasic")], {
        description: "The authentication scheme to use when making SCIM requests to this application.",
      }),
      user: Type.String({ description: "User name used to authenticate with the remote SCIM service." }),
    },
    {
      description:
        "Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.",
    },
  ),
)

export const AccessScimConfigAuthenticationOauthBearerToken = named(
  "access_scim_config_authentication_oauth_bearer_token",
  Type.Object(
    {
      scheme: Type.Union([Type.Literal("oauthbearertoken")], {
        description: "The authentication scheme to use when making SCIM requests to this application.",
      }),
      token: Type.String({
        description: "Token used to authenticate with the remote SCIM service.",
        "x-sensitive": true,
      }),
    },
    {
      description:
        "Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.",
    },
  ),
)

export const AccessScimConfigAuthenticationOauth2 = named(
  "access_scim_config_authentication_oauth2",
  Type.Object(
    {
      authorization_url: Type.String({
        description: "URL used to generate the auth code used during token generation.",
      }),
      client_id: Type.String({
        description:
          "Client ID used to authenticate when generating a token for authenticating with the remote SCIM service.",
      }),
      client_secret: Type.String({
        description:
          "Secret used to authenticate when generating a token for authenticating with the remove SCIM service.",
        "x-sensitive": true,
      }),
      scheme: Type.Union([Type.Literal("oauth2")], {
        description: "The authentication scheme to use when making SCIM requests to this application.",
      }),
      scopes: Type.Optional(
        Type.Array(Type.String(), {
          description:
            "The authorization scopes to request when generating the token used to authenticate with the remove SCIM service.",
        }),
      ),
      token_url: Type.String({
        description: "URL used to generate the token used to authenticate with the remote SCIM service.",
      }),
    },
    {
      description: "Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.",
    },
  ),
)

export const AccessScimConfigAuthenticationAccessServiceToken = named(
  "access_scim_config_authentication_access_service_token",
  Type.Object(
    {
      client_id: Type.String({
        description: "Client ID of the Access service token used to authenticate with the remote service.",
      }),
      client_secret: Type.String({
        description: "Client secret of the Access service token used to authenticate with the remote service.",
        "x-sensitive": true,
      }),
      scheme: Type.Union([Type.Literal("access_service_token")], {
        description: "The authentication scheme to use when making SCIM requests to this application.",
      }),
    },
    {
      description:
        "Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.",
    },
  ),
)

export const AccessScimConfigSingleAuthentication = named(
  "access_scim_config_single_authentication",
  Type.Union([
    AccessScimConfigAuthenticationHttpBasic,
    AccessScimConfigAuthenticationOauthBearerToken,
    AccessScimConfigAuthenticationOauth2,
    AccessScimConfigAuthenticationAccessServiceToken,
  ]),
)

export const AccessScimConfigMultiAuthentication = named(
  "access_scim_config_multi_authentication",
  Type.Array(AccessScimConfigSingleAuthentication, { description: "Multiple authentication schemes" }),
)

export const AccessScimConfigMapping = named(
  "access_scim_config_mapping",
  Type.Object(
    {
      enabled: Type.Optional(Type.Boolean({ description: "Whether or not this mapping is enabled." })),
      filter: Type.Optional(
        Type.String({
          description:
            "A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned to this application.",
        }),
      ),
      operations: Type.Optional(
        Type.Object(
          {
            create: Type.Optional(
              Type.Boolean({ description: "Whether or not this mapping applies to create (POST) operations." }),
            ),
            delete: Type.Optional(
              Type.Boolean({ description: "Whether or not this mapping applies to DELETE operations." }),
            ),
            update: Type.Optional(
              Type.Boolean({ description: "Whether or not this mapping applies to update (PATCH/PUT) operations." }),
            ),
          },
          { description: "Whether or not this mapping applies to creates, updates, or deletes." },
        ),
      ),
      schema: Type.String({ description: "Which SCIM resource type this mapping applies to." }),
      strictness: Type.Optional(
        Type.Union([Type.Literal("strict"), Type.Literal("passthrough")], {
          description:
            "The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ passes unknown values to the target.",
        }),
      ),
      transform_jsonata: Type.Optional(
        Type.String({
          description:
            "A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.",
        }),
      ),
    },
    {
      description:
        "Transformations and filters applied to resources before they are provisioned in the remote SCIM service.",
    },
  ),
)

export const AccessScimConfig = named(
  "access_scim_config",
  Type.Object(
    {
      authentication: Type.Optional(
        Type.Union([AccessScimConfigSingleAuthentication, AccessScimConfigMultiAuthentication]),
      ),
      deactivate_on_delete: Type.Optional(
        Type.Boolean({
          description:
            "If false, propagates DELETE requests to the target application for SCIM resources. If true, sets 'active' to false on the SCIM resource. Note: Some targets do not support DELETE operations.",
        }),
      ),
      enabled: Type.Optional(
        Type.Boolean({ description: "Whether SCIM provisioning is turned on for this application." }),
      ),
      idp_uid: Type.String({
        description: "The UID of the IdP to use as the source for SCIM resources to provision to this application.",
      }),
      mappings: Type.Optional(
        Type.Array(AccessScimConfigMapping, {
          description:
            "A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to be provisioned.",
        }),
      ),
      remote_uri: Type.String({ description: "The base URI for the application's SCIM-compatible API." }),
    },
    { description: "Configuration for provisioning to this application via SCIM. This is currently in closed beta." },
  ),
)

export const AccessSelfHostedDomains = named(
  "access_self_hosted_domains",
  Type.Array(Type.String({ description: "A domain that Access will secure." }), {
    description:
      "List of public domains that Access will secure. This field is deprecated in favor of `destinations` and will be supported until **November 21, 2025.** If `destinations` are provided, then `self_hosted_domains` will be ignored.\n",
    deprecated: true,
  }),
)

export const AccessServiceAuth401Redirect = named(
  "access_service_auth_401_redirect",
  Type.Boolean({ description: "Returns a 401 status code when the request is blocked by a Service Auth policy." }),
)

export const AccessSchemasSessionDuration = named(
  "access_schemas-session_duration",
  Type.String({
    description:
      "The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.",
    default: "24h",
  }),
)

export const AccessTags = named(
  "access_tags",
  Type.Array(Type.String({ description: "The tag associated with an application." }), {
    description:
      "The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.",
    "x-stainless-collection-type": "set",
  }),
)

export const AccessType = named(
  "access_type",
  Type.Union(
    [
      Type.Literal("self_hosted"),
      Type.Literal("saas"),
      Type.Literal("ssh"),
      Type.Literal("vnc"),
      Type.Literal("app_launcher"),
      Type.Literal("warp"),
      Type.Literal("biso"),
      Type.Literal("bookmark"),
      Type.Literal("dash_sso"),
      Type.Literal("infrastructure"),
      Type.Literal("rdp"),
    ],
    { description: "The application type." },
  ),
)

export const UnnamedSchemaRefC6200e37c458aaa3c42e6e5b999bc419 = named(
  "unnamed_schema_ref_c6200e37c458aaa3c42e6e5b999bc419",
  Type.Union([Type.Literal("id"), Type.Literal("email")], {
    description: "The format of the name identifier sent to the SaaS application.",
  }),
)

export const AccessSamlSaasApp = named(
  "access_saml_saas_app",
  Type.Object({
    auth_type: Type.Optional(
      Type.Union([Type.Literal("saml"), Type.Literal("oidc")], {
        description:
          'Optional identifier indicating the authentication protocol used for the saas app. Required for OIDC. Default if unset is "saml"',
      }),
    ),
    consumer_service_url: Type.Optional(
      Type.String({
        description: "The service provider's endpoint that is responsible for receiving and parsing a SAML assertion.",
      }),
    ),
    created_at: Type.Optional(AccessCreatedAt),
    custom_attributes: Type.Optional(
      Type.Array(
        Type.Object({
          friendly_name: Type.Optional(Type.String({ description: "The SAML FriendlyName of the attribute." })),
          name: Type.Optional(Type.String({ description: "The name of the attribute." })),
          name_format: Type.Optional(
            Type.Union(
              [
                Type.Literal("urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"),
                Type.Literal("urn:oasis:names:tc:SAML:2.0:attrname-format:basic"),
                Type.Literal("urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
              ],
              { description: "A globally unique name for an identity or service provider." },
            ),
          ),
          required: Type.Optional(
            Type.Boolean({ description: "If the attribute is required when building a SAML assertion." }),
          ),
          source: Type.Optional(
            Type.Object({
              name: Type.Optional(Type.String({ description: "The name of the IdP attribute." })),
              name_by_idp: Type.Optional(
                Type.Array(
                  Type.Object({
                    idp_id: Type.Optional(Type.String({ description: "The UID of the IdP." })),
                    source_name: Type.Optional(Type.String({ description: "The name of the IdP provided attribute." })),
                  }),
                  { description: "A mapping from IdP ID to attribute name." },
                ),
              ),
            }),
          ),
        }),
      ),
    ),
    default_relay_state: Type.Optional(
      Type.String({
        description: "The URL that the user will be redirected to after a successful login for IDP initiated logins.",
      }),
    ),
    idp_entity_id: Type.Optional(
      Type.String({
        description: "The unique identifier for your SaaS application.",
        "x-stainless-configurability": "computed_optional",
      }),
    ),
    name_id_format: Type.Optional(UnnamedSchemaRefC6200e37c458aaa3c42e6e5b999bc419),
    name_id_transform_jsonata: Type.Optional(
      Type.String({
        description:
          "A [JSONata](https://jsonata.org/) expression that transforms an application's user identities into a NameID value for its SAML assertion. This expression should evaluate to a singular string. The output of this expression can override the `name_id_format` setting.\n",
      }),
    ),
    public_key: Type.Optional(
      Type.String({
        description: "The Access public certificate that will be used to verify your identity.",
        "x-stainless-configurability": "computed_optional",
      }),
    ),
    saml_attribute_transform_jsonata: Type.Optional(
      Type.String({
        description:
          "A [JSONata] (https://jsonata.org/) expression that transforms an application's user identities into attribute assertions in the SAML response. The expression can transform id, email, name, and groups values. It can also transform fields listed in the saml_attributes or oidc_fields of the identity provider used to authenticate. The output of this expression must be a JSON object.\n",
      }),
    ),
    sp_entity_id: Type.Optional(
      Type.String({ description: "A globally unique name for an identity or service provider." }),
    ),
    sso_endpoint: Type.Optional(
      Type.String({
        description: "The endpoint where your SaaS application will send login requests.",
        "x-stainless-configurability": "computed_optional",
      }),
    ),
    updated_at: Type.Optional(AccessCreatedAt),
  }),
)

export const AccessOidcSaasApp = named(
  "access_oidc_saas_app",
  Type.Object({
    access_token_lifetime: Type.Optional(
      Type.String({
        description:
          "The lifetime of the OIDC Access Token after creation. Valid units are m,h. Must be greater than or equal to 1m and less than or equal to 24h.",
      }),
    ),
    allow_pkce_without_client_secret: Type.Optional(
      Type.Boolean({
        description:
          "If client secret should be required on the token endpoint when authorization_code_with_pkce grant is used.",
      }),
    ),
    app_launcher_url: Type.Optional(
      Type.String({ description: "The URL where this applications tile redirects users" }),
    ),
    auth_type: Type.Optional(
      Type.Union([Type.Literal("saml"), Type.Literal("oidc")], {
        description: "Identifier of the authentication protocol used for the saas app. Required for OIDC.",
      }),
    ),
    client_id: Type.Optional(Type.String({ description: "The application client id" })),
    client_secret: Type.Optional(
      Type.String({
        description: "The application client secret, only returned on POST request.",
        "x-sensitive": true,
      }),
    ),
    created_at: Type.Optional(AccessCreatedAt),
    custom_claims: Type.Optional(
      Type.Array(
        Type.Object({
          name: Type.Optional(Type.String({ description: "The name of the claim." })),
          required: Type.Optional(
            Type.Boolean({ description: "If the claim is required when building an OIDC token." }),
          ),
          scope: Type.Optional(
            Type.Union(
              [Type.Literal("groups"), Type.Literal("profile"), Type.Literal("email"), Type.Literal("openid")],
              { description: "The scope of the claim." },
            ),
          ),
          source: Type.Optional(
            Type.Object({
              name: Type.Optional(Type.String({ description: "The name of the IdP claim." })),
              name_by_idp: Type.Optional(Type.Record(Type.String(), Type.String())),
            }),
          ),
        }),
      ),
    ),
    grant_types: Type.Optional(
      Type.Array(
        Type.Union([
          Type.Literal("authorization_code"),
          Type.Literal("authorization_code_with_pkce"),
          Type.Literal("refresh_tokens"),
          Type.Literal("hybrid"),
          Type.Literal("implicit"),
        ]),
        { description: "The OIDC flows supported by this application" },
      ),
    ),
    group_filter_regex: Type.Optional(
      Type.String({ description: "A regex to filter Cloudflare groups returned in ID token and userinfo endpoint" }),
    ),
    hybrid_and_implicit_options: Type.Optional(
      Type.Object({
        return_access_token_from_authorization_endpoint: Type.Optional(
          Type.Boolean({ description: "If an Access Token should be returned from the OIDC Authorization endpoint" }),
        ),
        return_id_token_from_authorization_endpoint: Type.Optional(
          Type.Boolean({ description: "If an ID Token should be returned from the OIDC Authorization endpoint" }),
        ),
      }),
    ),
    public_key: Type.Optional(
      Type.String({ description: "The Access public certificate that will be used to verify your identity." }),
    ),
    redirect_uris: Type.Optional(
      Type.Array(Type.String(), {
        description: "The permitted URL's for Cloudflare to return Authorization codes and Access/ID tokens",
      }),
    ),
    refresh_token_options: Type.Optional(
      Type.Object({
        lifetime: Type.Optional(
          Type.String({
            description:
              "How long a refresh token will be valid for after creation. Valid units are m,h,d. Must be longer than 1m.",
          }),
        ),
      }),
    ),
    scopes: Type.Optional(
      Type.Array(
        Type.Union([Type.Literal("openid"), Type.Literal("groups"), Type.Literal("email"), Type.Literal("profile")]),
        {
          description:
            'Define the user information shared with access, "offline_access" scope will be automatically enabled if refresh tokens are enabled',
        },
      ),
    ),
    updated_at: Type.Optional(AccessCreatedAt),
  }),
)

export const AccessAppLauncherLogoUrl = named(
  "access_app_launcher_logo_url",
  Type.String({ description: "The image URL of the logo shown in the App Launcher header." }),
)

export const AccessBgColor = named(
  "access_bg_color",
  Type.String({ description: "The background color of the App Launcher page." }),
)

export const AccessFooterLinks = named(
  "access_footer_links",
  Type.Array(
    Type.Object({
      name: Type.String({ description: "The hypertext in the footer link." }),
      url: Type.String({ description: "the hyperlink in the footer link." }),
    }),
    { description: "The links in the App Launcher footer." },
  ),
)

export const AccessHeaderBgColor = named(
  "access_header_bg_color",
  Type.String({ description: "The background color of the App Launcher header." }),
)

export const AccessButtonColor = named(
  "access_button_color",
  Type.String({ description: "The background color of the log in button on the landing page." }),
)

export const AccessButtonTextColor = named(
  "access_button_text_color",
  Type.String({ description: "The color of the text in the log in button on the landing page." }),
)

export const AccessImageUrl = named(
  "access_image_url",
  Type.String({ description: "The URL of the image shown on the landing page." }),
)

export const AccessMessage = named(
  "access_message",
  Type.String({ description: "The message shown on the landing page." }),
)

export const AccessTitle = named(
  "access_title",
  Type.String({ description: "The title shown on the landing page.", default: "Welcome!" }),
)

export const AccessLandingPageDesign = named(
  "access_landing_page_design",
  Type.Object(
    {
      button_color: Type.Optional(AccessButtonColor),
      button_text_color: Type.Optional(AccessButtonTextColor),
      image_url: Type.Optional(AccessImageUrl),
      message: Type.Optional(AccessMessage),
      title: Type.Optional(AccessTitle),
    },
    { description: "The design of the App Launcher landing page shown to users when they log in." },
  ),
)

export const AccessSkipAppLauncherLoginPage = named(
  "access_skip_app_launcher_login_page",
  Type.Boolean({ description: "Determines when to skip the App Launcher landing page.", default: false }),
)

export const AccessPort = named(
  "access_port",
  Type.Integer({
    description:
      "The port that the targets use for the chosen communication protocol. A port cannot be assigned to multiple protocols.",
  }),
)

export const AccessTargetAttributes = named(
  "access_target_attributes",
  Type.Record(Type.String(), Type.Array(Type.String())),
)

export const AccessProtocolInfraApp = named(
  "access_protocol_infra_app",
  Type.Union([Type.Literal("SSH")], {
    description: "The communication protocol your application secures.",
    "x-auditable": true,
  }),
)

export const AccessTargetCriteriaInfraApp = named(
  "access_target_criteria_infra_app",
  Type.Object({
    port: AccessPort,
    target_attributes: AccessTargetAttributes,
    protocol: AccessProtocolInfraApp,
  }),
)

export const AccessAllowEmailAlias = named(
  "access_allow_email_alias",
  Type.Boolean({ description: "Enables using Identity Provider email alias as SSH username.", "x-auditable": true }),
)

export const AccessUsernames = named(
  "access_usernames",
  Type.Array(Type.String({ "x-auditable": true }), {
    description: "Contains the Unix usernames that may be used when connecting over SSH.",
  }),
)

export const AccessConnectionRulesSsh = named(
  "access_connection_rules_ssh",
  Type.Object(
    {
      allow_email_alias: Type.Optional(AccessAllowEmailAlias),
      usernames: AccessUsernames,
    },
    {
      description:
        "The SSH-specific rules that define how users may connect to the targets secured by your application.",
    },
  ),
)

export const AccessConnectionRules = named(
  "access_connection_rules",
  Type.Object(
    {
      ssh: Type.Optional(AccessConnectionRulesSsh),
    },
    { description: "The rules that define how users may connect to the targets secured by your application." },
  ),
)

export const AccessInfraPolicyResp = named("access_infra_policy_resp", Type.Intersect([AccessBasePolicyResp]))

export const AccessProtocolSelfHostedApp = named(
  "access_protocol_self_hosted_app",
  Type.Union([Type.Literal("RDP")], {
    description: "The communication protocol your application secures.",
    "x-auditable": true,
  }),
)

export const AccessTargetCriteriaSelfHostedApp = named(
  "access_target_criteria_self_hosted_app",
  Type.Object({
    port: AccessPort,
    target_attributes: AccessTargetAttributes,
    protocol: AccessProtocolSelfHostedApp,
  }),
)

export const AccessAppResponse = named(
  "access_app_response",
  Type.Union([
    Type.Object({
      aud: Type.Optional(AccessSchemasAud),
      created_at: Type.Optional(AccessCreatedAt),
      id: Type.Optional(AccessUuid),
      updated_at: Type.Optional(AccessCreatedAt),
      allow_authenticate_via_warp: Type.Optional(AccessSchemasAllowAuthenticateViaWarp),
      allow_iframe: Type.Optional(AccessAllowIframe),
      allowed_idps: Type.Optional(AccessAllowedIdps),
      app_launcher_visible: Type.Optional(AccessAppLauncherVisible),
      auto_redirect_to_identity: Type.Optional(AccessSchemasAutoRedirectToIdentity),
      cors_headers: Type.Optional(AccessCorsHeaders),
      custom_deny_message: Type.Optional(AccessCustomDenyMessage),
      custom_deny_url: Type.Optional(AccessCustomDenyUrl),
      custom_non_identity_deny_url: Type.Optional(AccessCustomNonIdentityDenyUrl),
      custom_pages: Type.Optional(AccessSchemasCustomPages),
      destinations: Type.Optional(AccessDestinations),
      domain: AccessDomain,
      enable_binding_cookie: Type.Optional(AccessEnableBindingCookie),
      http_only_cookie_attribute: Type.Optional(AccessHttpOnlyCookieAttribute),
      logo_url: Type.Optional(AccessLogoUrl),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      options_preflight_bypass: Type.Optional(AccessOptionsPreflightBypass),
      path_cookie_attribute: Type.Optional(AccessPathCookieAttribute),
      read_service_tokens_from_header: Type.Optional(AccessReadServiceTokensFromHeader),
      same_site_cookie_attribute: Type.Optional(AccessSameSiteCookieAttribute),
      scim_config: Type.Optional(AccessScimConfig),
      self_hosted_domains: Type.Optional(AccessSelfHostedDomains),
      service_auth_401_redirect: Type.Optional(AccessServiceAuth401Redirect),
      session_duration: Type.Optional(AccessSchemasSessionDuration),
      skip_interstitial: Type.Optional(AccessSkipInterstitial),
      tags: Type.Optional(AccessTags),
      type: AccessType,
      policies: Type.Optional(Type.Array(AccessAppPolicyResponse)),
    }),
    Type.Object({
      aud: Type.Optional(AccessSchemasAud),
      created_at: Type.Optional(AccessCreatedAt),
      id: Type.Optional(AccessUuid),
      updated_at: Type.Optional(AccessCreatedAt),
      allowed_idps: Type.Optional(AccessAllowedIdps),
      app_launcher_visible: Type.Optional(AccessAppLauncherVisible),
      auto_redirect_to_identity: Type.Optional(AccessSchemasAutoRedirectToIdentity),
      custom_pages: Type.Optional(AccessSchemasCustomPages),
      logo_url: Type.Optional(AccessLogoUrl),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      saas_app: Type.Optional(Type.Union([AccessSamlSaasApp, AccessOidcSaasApp])),
      scim_config: Type.Optional(AccessScimConfig),
      tags: Type.Optional(AccessTags),
      type: Type.Optional(AccessType),
      policies: Type.Optional(Type.Array(AccessAppPolicyResponse)),
    }),
    Type.Object({
      aud: Type.Optional(AccessSchemasAud),
      created_at: Type.Optional(AccessCreatedAt),
      id: Type.Optional(AccessUuid),
      updated_at: Type.Optional(AccessCreatedAt),
      allow_authenticate_via_warp: Type.Optional(AccessSchemasAllowAuthenticateViaWarp),
      allow_iframe: Type.Optional(AccessAllowIframe),
      allowed_idps: Type.Optional(AccessAllowedIdps),
      app_launcher_visible: Type.Optional(AccessAppLauncherVisible),
      auto_redirect_to_identity: Type.Optional(AccessSchemasAutoRedirectToIdentity),
      cors_headers: Type.Optional(AccessCorsHeaders),
      custom_deny_message: Type.Optional(AccessCustomDenyMessage),
      custom_deny_url: Type.Optional(AccessCustomDenyUrl),
      custom_non_identity_deny_url: Type.Optional(AccessCustomNonIdentityDenyUrl),
      custom_pages: Type.Optional(AccessSchemasCustomPages),
      destinations: Type.Optional(AccessDestinations),
      domain: AccessDomain,
      enable_binding_cookie: Type.Optional(AccessEnableBindingCookie),
      http_only_cookie_attribute: Type.Optional(AccessHttpOnlyCookieAttribute),
      logo_url: Type.Optional(AccessLogoUrl),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      options_preflight_bypass: Type.Optional(AccessOptionsPreflightBypass),
      path_cookie_attribute: Type.Optional(AccessPathCookieAttribute),
      read_service_tokens_from_header: Type.Optional(AccessReadServiceTokensFromHeader),
      same_site_cookie_attribute: Type.Optional(AccessSameSiteCookieAttribute),
      scim_config: Type.Optional(AccessScimConfig),
      self_hosted_domains: Type.Optional(AccessSelfHostedDomains),
      service_auth_401_redirect: Type.Optional(AccessServiceAuth401Redirect),
      session_duration: Type.Optional(AccessSchemasSessionDuration),
      skip_interstitial: Type.Optional(AccessSkipInterstitial),
      tags: Type.Optional(AccessTags),
      type: Type.Union(
        [
          Type.Literal("self_hosted"),
          Type.Literal("saas"),
          Type.Literal("ssh"),
          Type.Literal("vnc"),
          Type.Literal("app_launcher"),
          Type.Literal("warp"),
          Type.Literal("biso"),
          Type.Literal("bookmark"),
          Type.Literal("dash_sso"),
          Type.Literal("infrastructure"),
          Type.Literal("rdp"),
        ],
        { description: "The application type." },
      ),
      policies: Type.Optional(Type.Array(AccessAppPolicyResponse)),
    }),
    Type.Object({
      aud: Type.Optional(AccessSchemasAud),
      created_at: Type.Optional(AccessCreatedAt),
      id: Type.Optional(AccessUuid),
      updated_at: Type.Optional(AccessCreatedAt),
      allow_authenticate_via_warp: Type.Optional(AccessSchemasAllowAuthenticateViaWarp),
      allow_iframe: Type.Optional(AccessAllowIframe),
      allowed_idps: Type.Optional(AccessAllowedIdps),
      app_launcher_visible: Type.Optional(AccessAppLauncherVisible),
      auto_redirect_to_identity: Type.Optional(AccessSchemasAutoRedirectToIdentity),
      cors_headers: Type.Optional(AccessCorsHeaders),
      custom_deny_message: Type.Optional(AccessCustomDenyMessage),
      custom_deny_url: Type.Optional(AccessCustomDenyUrl),
      custom_non_identity_deny_url: Type.Optional(AccessCustomNonIdentityDenyUrl),
      custom_pages: Type.Optional(AccessSchemasCustomPages),
      destinations: Type.Optional(AccessDestinations),
      domain: AccessDomain,
      enable_binding_cookie: Type.Optional(AccessEnableBindingCookie),
      http_only_cookie_attribute: Type.Optional(AccessHttpOnlyCookieAttribute),
      logo_url: Type.Optional(AccessLogoUrl),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      options_preflight_bypass: Type.Optional(AccessOptionsPreflightBypass),
      path_cookie_attribute: Type.Optional(AccessPathCookieAttribute),
      read_service_tokens_from_header: Type.Optional(AccessReadServiceTokensFromHeader),
      same_site_cookie_attribute: Type.Optional(AccessSameSiteCookieAttribute),
      scim_config: Type.Optional(AccessScimConfig),
      self_hosted_domains: Type.Optional(AccessSelfHostedDomains),
      service_auth_401_redirect: Type.Optional(AccessServiceAuth401Redirect),
      session_duration: Type.Optional(AccessSchemasSessionDuration),
      skip_interstitial: Type.Optional(AccessSkipInterstitial),
      tags: Type.Optional(AccessTags),
      type: Type.Union(
        [
          Type.Literal("self_hosted"),
          Type.Literal("saas"),
          Type.Literal("ssh"),
          Type.Literal("vnc"),
          Type.Literal("app_launcher"),
          Type.Literal("warp"),
          Type.Literal("biso"),
          Type.Literal("bookmark"),
          Type.Literal("dash_sso"),
          Type.Literal("infrastructure"),
          Type.Literal("rdp"),
        ],
        { description: "The application type." },
      ),
      policies: Type.Optional(Type.Array(AccessAppPolicyResponse)),
    }),
    Type.Object({
      aud: Type.Optional(AccessSchemasAud),
      created_at: Type.Optional(AccessCreatedAt),
      id: Type.Optional(AccessUuid),
      updated_at: Type.Optional(AccessCreatedAt),
      allowed_idps: Type.Optional(AccessAllowedIdps),
      auto_redirect_to_identity: Type.Optional(AccessSchemasAutoRedirectToIdentity),
      custom_deny_url: Type.Optional(AccessCustomDenyUrl),
      custom_non_identity_deny_url: Type.Optional(AccessCustomNonIdentityDenyUrl),
      custom_pages: Type.Optional(AccessSchemasCustomPages),
      domain: Type.Optional(AccessDomain),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      session_duration: Type.Optional(AccessSchemasSessionDuration),
      type: Type.Union(
        [
          Type.Literal("self_hosted"),
          Type.Literal("saas"),
          Type.Literal("ssh"),
          Type.Literal("vnc"),
          Type.Literal("app_launcher"),
          Type.Literal("warp"),
          Type.Literal("biso"),
          Type.Literal("bookmark"),
          Type.Literal("dash_sso"),
          Type.Literal("infrastructure"),
          Type.Literal("rdp"),
        ],
        { description: "The application type." },
      ),
      app_launcher_logo_url: Type.Optional(AccessAppLauncherLogoUrl),
      bg_color: Type.Optional(AccessBgColor),
      footer_links: Type.Optional(AccessFooterLinks),
      header_bg_color: Type.Optional(AccessHeaderBgColor),
      landing_page_design: Type.Optional(AccessLandingPageDesign),
      skip_app_launcher_login_page: Type.Optional(AccessSkipAppLauncherLoginPage),
      policies: Type.Optional(Type.Array(AccessAppPolicyResponse)),
    }),
    Type.Object({
      aud: Type.Optional(AccessSchemasAud),
      created_at: Type.Optional(AccessCreatedAt),
      id: Type.Optional(AccessUuid),
      updated_at: Type.Optional(AccessCreatedAt),
      allowed_idps: Type.Optional(AccessAllowedIdps),
      auto_redirect_to_identity: Type.Optional(AccessSchemasAutoRedirectToIdentity),
      custom_deny_url: Type.Optional(AccessCustomDenyUrl),
      custom_non_identity_deny_url: Type.Optional(AccessCustomNonIdentityDenyUrl),
      custom_pages: Type.Optional(AccessSchemasCustomPages),
      domain: Type.Optional(AccessDomain),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      session_duration: Type.Optional(AccessSchemasSessionDuration),
      type: AccessType,
      policies: Type.Optional(Type.Array(AccessAppPolicyResponse)),
    }),
    Type.Object({
      aud: Type.Optional(AccessSchemasAud),
      created_at: Type.Optional(AccessCreatedAt),
      id: Type.Optional(AccessUuid),
      updated_at: Type.Optional(AccessCreatedAt),
      allowed_idps: Type.Optional(AccessAllowedIdps),
      auto_redirect_to_identity: Type.Optional(AccessSchemasAutoRedirectToIdentity),
      custom_deny_url: Type.Optional(AccessCustomDenyUrl),
      custom_non_identity_deny_url: Type.Optional(AccessCustomNonIdentityDenyUrl),
      custom_pages: Type.Optional(AccessSchemasCustomPages),
      domain: Type.Optional(AccessDomain),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      session_duration: Type.Optional(AccessSchemasSessionDuration),
      type: AccessType,
      policies: Type.Optional(Type.Array(AccessAppPolicyResponse)),
    }),
    Type.Object({
      aud: Type.Optional(AccessSchemasAud),
      created_at: Type.Optional(AccessCreatedAt),
      id: Type.Optional(AccessUuid),
      updated_at: Type.Optional(AccessCreatedAt),
      app_launcher_visible: Type.Optional(AccessAppLauncherVisible),
      domain: Type.Optional(Type.String({ description: "The URL or domain of the bookmark." })),
      logo_url: Type.Optional(AccessLogoUrl),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      tags: Type.Optional(AccessTags),
      type: Type.Optional(AccessType),
    }),
    Type.Object({
      aud: Type.Optional(AccessSchemasAud),
      created_at: Type.Optional(AccessCreatedAt),
      id: Type.Optional(AccessUuid),
      updated_at: Type.Optional(AccessCreatedAt),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      type: AccessType,
      target_criteria: Type.Array(AccessTargetCriteriaInfraApp),
      policies: Type.Optional(Type.Array(AccessInfraPolicyResp)),
    }),
    Type.Object({
      aud: Type.Optional(AccessSchemasAud),
      created_at: Type.Optional(AccessCreatedAt),
      id: Type.Optional(AccessUuid),
      updated_at: Type.Optional(AccessCreatedAt),
      target_criteria: Type.Array(AccessTargetCriteriaSelfHostedApp),
      allow_authenticate_via_warp: Type.Optional(AccessSchemasAllowAuthenticateViaWarp),
      allow_iframe: Type.Optional(AccessAllowIframe),
      allowed_idps: Type.Optional(AccessAllowedIdps),
      app_launcher_visible: Type.Optional(AccessAppLauncherVisible),
      auto_redirect_to_identity: Type.Optional(AccessSchemasAutoRedirectToIdentity),
      cors_headers: Type.Optional(AccessCorsHeaders),
      custom_deny_message: Type.Optional(AccessCustomDenyMessage),
      custom_deny_url: Type.Optional(AccessCustomDenyUrl),
      custom_non_identity_deny_url: Type.Optional(AccessCustomNonIdentityDenyUrl),
      custom_pages: Type.Optional(AccessSchemasCustomPages),
      destinations: Type.Optional(AccessDestinations),
      domain: AccessDomain,
      enable_binding_cookie: Type.Optional(AccessEnableBindingCookie),
      http_only_cookie_attribute: Type.Optional(AccessHttpOnlyCookieAttribute),
      logo_url: Type.Optional(AccessLogoUrl),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      options_preflight_bypass: Type.Optional(AccessOptionsPreflightBypass),
      path_cookie_attribute: Type.Optional(AccessPathCookieAttribute),
      read_service_tokens_from_header: Type.Optional(AccessReadServiceTokensFromHeader),
      same_site_cookie_attribute: Type.Optional(AccessSameSiteCookieAttribute),
      scim_config: Type.Optional(AccessScimConfig),
      self_hosted_domains: Type.Optional(AccessSelfHostedDomains),
      service_auth_401_redirect: Type.Optional(AccessServiceAuth401Redirect),
      session_duration: Type.Optional(AccessSchemasSessionDuration),
      skip_interstitial: Type.Optional(AccessSkipInterstitial),
      tags: Type.Optional(AccessTags),
      type: AccessType,
      policies: Type.Optional(Type.Array(AccessAppPolicyResponse)),
    }),
  ]),
)

export const AccessAppsComponentsSchemasSingleResponse = named(
  "access_apps_components-schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessAppResponse),
  }),
)

export const AccessCaComponentsSchemasResponseCollection = named(
  "access_ca_components-schemas-response_collection",
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
    result: Type.Optional(Type.Array(AccessCa)),
  }),
)

export const AccessAppPolicyLink = named(
  "access_app_policy_link",
  Type.Object(
    {
      id: Type.Optional(AccessSchemasUuid),
      precedence: Type.Optional(AccessPrecedence),
    },
    { description: "A JSON that links a reusable policy to an application." },
  ),
)

export const AccessBookmarkProps = named(
  "access_bookmark_props",
  Type.Object({
    app_launcher_visible: Type.Optional(AccessAppLauncherVisible),
    domain: Type.Optional(Type.String({ description: "The URL or domain of the bookmark." })),
    logo_url: Type.Optional(AccessLogoUrl),
    name: Type.Optional(AccessAppsComponentsSchemasName),
    tags: Type.Optional(AccessTags),
    type: Type.Optional(AccessType),
  }),
)

export const AccessInfraPolicyReq = named("access_infra_policy_req", Type.Intersect([AccessBasePolicyReq]))

export const AccessAppRequest = named(
  "access_app_request",
  Type.Union([
    Type.Object({
      allow_authenticate_via_warp: Type.Optional(AccessSchemasAllowAuthenticateViaWarp),
      allow_iframe: Type.Optional(AccessAllowIframe),
      allowed_idps: Type.Optional(AccessAllowedIdps),
      app_launcher_visible: Type.Optional(AccessAppLauncherVisible),
      auto_redirect_to_identity: Type.Optional(AccessSchemasAutoRedirectToIdentity),
      cors_headers: Type.Optional(AccessCorsHeaders),
      custom_deny_message: Type.Optional(AccessCustomDenyMessage),
      custom_deny_url: Type.Optional(AccessCustomDenyUrl),
      custom_non_identity_deny_url: Type.Optional(AccessCustomNonIdentityDenyUrl),
      custom_pages: Type.Optional(AccessSchemasCustomPages),
      destinations: Type.Optional(AccessDestinations),
      domain: AccessDomain,
      enable_binding_cookie: Type.Optional(AccessEnableBindingCookie),
      http_only_cookie_attribute: Type.Optional(AccessHttpOnlyCookieAttribute),
      logo_url: Type.Optional(AccessLogoUrl),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      options_preflight_bypass: Type.Optional(AccessOptionsPreflightBypass),
      path_cookie_attribute: Type.Optional(AccessPathCookieAttribute),
      read_service_tokens_from_header: Type.Optional(AccessReadServiceTokensFromHeader),
      same_site_cookie_attribute: Type.Optional(AccessSameSiteCookieAttribute),
      scim_config: Type.Optional(AccessScimConfig),
      self_hosted_domains: Type.Optional(AccessSelfHostedDomains),
      service_auth_401_redirect: Type.Optional(AccessServiceAuth401Redirect),
      session_duration: Type.Optional(AccessSchemasSessionDuration),
      skip_interstitial: Type.Optional(AccessSkipInterstitial),
      tags: Type.Optional(AccessTags),
      type: AccessType,
      policies: Type.Optional(
        Type.Array(
          Type.Union([
            AccessAppPolicyLink,
            Type.Intersect([
              Type.Unknown({ description: "A policy UID to link to this application." }),
              AccessSchemasUuid,
            ]),
            Type.Intersect([
              Type.Unknown(),
              Type.Object(
                {
                  id: Type.Optional(AccessSchemasUuid),
                },
                {
                  description:
                    "An application-scoped policy JSON. If the policy does not yet exist, it will be created.",
                },
              ),
              AccessAppPolicyRequest,
            ]),
          ]),
          {
            description:
              "The policies that Access applies to the application, in ascending order of precedence. Items can reference existing policies or create new policies exclusive to the application.",
          },
        ),
      ),
    }),
    Type.Object({
      allowed_idps: Type.Optional(AccessAllowedIdps),
      app_launcher_visible: Type.Optional(AccessAppLauncherVisible),
      auto_redirect_to_identity: Type.Optional(AccessSchemasAutoRedirectToIdentity),
      custom_pages: Type.Optional(AccessSchemasCustomPages),
      logo_url: Type.Optional(AccessLogoUrl),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      saas_app: Type.Optional(Type.Union([AccessSamlSaasApp, AccessOidcSaasApp])),
      scim_config: Type.Optional(AccessScimConfig),
      tags: Type.Optional(AccessTags),
      type: Type.Optional(AccessType),
      policies: Type.Optional(
        Type.Array(
          Type.Union([
            AccessAppPolicyLink,
            Type.Intersect([
              Type.Unknown({ description: "A policy UID to link to this application." }),
              AccessSchemasUuid,
            ]),
            Type.Intersect([
              Type.Unknown(),
              Type.Object(
                {
                  id: Type.Optional(AccessSchemasUuid),
                },
                {
                  description:
                    "An application-scoped policy JSON. If the policy does not yet exist, it will be created.",
                },
              ),
              AccessAppPolicyRequest,
            ]),
          ]),
          {
            description:
              "The policies that Access applies to the application, in ascending order of precedence. Items can reference existing policies or create new policies exclusive to the application.",
          },
        ),
      ),
    }),
    Type.Object({
      allow_authenticate_via_warp: Type.Optional(AccessSchemasAllowAuthenticateViaWarp),
      allow_iframe: Type.Optional(AccessAllowIframe),
      allowed_idps: Type.Optional(AccessAllowedIdps),
      app_launcher_visible: Type.Optional(AccessAppLauncherVisible),
      auto_redirect_to_identity: Type.Optional(AccessSchemasAutoRedirectToIdentity),
      cors_headers: Type.Optional(AccessCorsHeaders),
      custom_deny_message: Type.Optional(AccessCustomDenyMessage),
      custom_deny_url: Type.Optional(AccessCustomDenyUrl),
      custom_non_identity_deny_url: Type.Optional(AccessCustomNonIdentityDenyUrl),
      custom_pages: Type.Optional(AccessSchemasCustomPages),
      destinations: Type.Optional(AccessDestinations),
      domain: AccessDomain,
      enable_binding_cookie: Type.Optional(AccessEnableBindingCookie),
      http_only_cookie_attribute: Type.Optional(AccessHttpOnlyCookieAttribute),
      logo_url: Type.Optional(AccessLogoUrl),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      options_preflight_bypass: Type.Optional(AccessOptionsPreflightBypass),
      path_cookie_attribute: Type.Optional(AccessPathCookieAttribute),
      read_service_tokens_from_header: Type.Optional(AccessReadServiceTokensFromHeader),
      same_site_cookie_attribute: Type.Optional(AccessSameSiteCookieAttribute),
      scim_config: Type.Optional(AccessScimConfig),
      self_hosted_domains: Type.Optional(AccessSelfHostedDomains),
      service_auth_401_redirect: Type.Optional(AccessServiceAuth401Redirect),
      session_duration: Type.Optional(AccessSchemasSessionDuration),
      skip_interstitial: Type.Optional(AccessSkipInterstitial),
      tags: Type.Optional(AccessTags),
      type: Type.Union(
        [
          Type.Literal("self_hosted"),
          Type.Literal("saas"),
          Type.Literal("ssh"),
          Type.Literal("vnc"),
          Type.Literal("app_launcher"),
          Type.Literal("warp"),
          Type.Literal("biso"),
          Type.Literal("bookmark"),
          Type.Literal("dash_sso"),
          Type.Literal("infrastructure"),
          Type.Literal("rdp"),
        ],
        { description: "The application type." },
      ),
      policies: Type.Optional(
        Type.Array(
          Type.Union([
            AccessAppPolicyLink,
            Type.Intersect([
              Type.Unknown({ description: "A policy UID to link to this application." }),
              AccessSchemasUuid,
            ]),
            Type.Intersect([
              Type.Unknown(),
              Type.Object(
                {
                  id: Type.Optional(AccessSchemasUuid),
                },
                {
                  description:
                    "An application-scoped policy JSON. If the policy does not yet exist, it will be created.",
                },
              ),
              AccessAppPolicyRequest,
            ]),
          ]),
          {
            description:
              "The policies that Access applies to the application, in ascending order of precedence. Items can reference existing policies or create new policies exclusive to the application.",
          },
        ),
      ),
    }),
    Type.Object({
      allow_authenticate_via_warp: Type.Optional(AccessSchemasAllowAuthenticateViaWarp),
      allow_iframe: Type.Optional(AccessAllowIframe),
      allowed_idps: Type.Optional(AccessAllowedIdps),
      app_launcher_visible: Type.Optional(AccessAppLauncherVisible),
      auto_redirect_to_identity: Type.Optional(AccessSchemasAutoRedirectToIdentity),
      cors_headers: Type.Optional(AccessCorsHeaders),
      custom_deny_message: Type.Optional(AccessCustomDenyMessage),
      custom_deny_url: Type.Optional(AccessCustomDenyUrl),
      custom_non_identity_deny_url: Type.Optional(AccessCustomNonIdentityDenyUrl),
      custom_pages: Type.Optional(AccessSchemasCustomPages),
      destinations: Type.Optional(AccessDestinations),
      domain: AccessDomain,
      enable_binding_cookie: Type.Optional(AccessEnableBindingCookie),
      http_only_cookie_attribute: Type.Optional(AccessHttpOnlyCookieAttribute),
      logo_url: Type.Optional(AccessLogoUrl),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      options_preflight_bypass: Type.Optional(AccessOptionsPreflightBypass),
      path_cookie_attribute: Type.Optional(AccessPathCookieAttribute),
      read_service_tokens_from_header: Type.Optional(AccessReadServiceTokensFromHeader),
      same_site_cookie_attribute: Type.Optional(AccessSameSiteCookieAttribute),
      scim_config: Type.Optional(AccessScimConfig),
      self_hosted_domains: Type.Optional(AccessSelfHostedDomains),
      service_auth_401_redirect: Type.Optional(AccessServiceAuth401Redirect),
      session_duration: Type.Optional(AccessSchemasSessionDuration),
      skip_interstitial: Type.Optional(AccessSkipInterstitial),
      tags: Type.Optional(AccessTags),
      type: Type.Union(
        [
          Type.Literal("self_hosted"),
          Type.Literal("saas"),
          Type.Literal("ssh"),
          Type.Literal("vnc"),
          Type.Literal("app_launcher"),
          Type.Literal("warp"),
          Type.Literal("biso"),
          Type.Literal("bookmark"),
          Type.Literal("dash_sso"),
          Type.Literal("infrastructure"),
          Type.Literal("rdp"),
        ],
        { description: "The application type." },
      ),
      policies: Type.Optional(
        Type.Array(
          Type.Union([
            AccessAppPolicyLink,
            Type.Intersect([
              Type.Unknown({ description: "A policy UID to link to this application." }),
              AccessSchemasUuid,
            ]),
            Type.Intersect([
              Type.Unknown(),
              Type.Object(
                {
                  id: Type.Optional(AccessSchemasUuid),
                },
                {
                  description:
                    "An application-scoped policy JSON. If the policy does not yet exist, it will be created.",
                },
              ),
              AccessAppPolicyRequest,
            ]),
          ]),
          {
            description:
              "The policies that Access applies to the application, in ascending order of precedence. Items can reference existing policies or create new policies exclusive to the application.",
          },
        ),
      ),
    }),
    Type.Object({
      allowed_idps: Type.Optional(AccessAllowedIdps),
      auto_redirect_to_identity: Type.Optional(AccessSchemasAutoRedirectToIdentity),
      custom_deny_url: Type.Optional(AccessCustomDenyUrl),
      custom_non_identity_deny_url: Type.Optional(AccessCustomNonIdentityDenyUrl),
      custom_pages: Type.Optional(AccessSchemasCustomPages),
      domain: Type.Optional(AccessDomain),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      session_duration: Type.Optional(AccessSchemasSessionDuration),
      type: Type.Union(
        [
          Type.Literal("self_hosted"),
          Type.Literal("saas"),
          Type.Literal("ssh"),
          Type.Literal("vnc"),
          Type.Literal("app_launcher"),
          Type.Literal("warp"),
          Type.Literal("biso"),
          Type.Literal("bookmark"),
          Type.Literal("dash_sso"),
          Type.Literal("infrastructure"),
          Type.Literal("rdp"),
        ],
        { description: "The application type." },
      ),
      app_launcher_logo_url: Type.Optional(AccessAppLauncherLogoUrl),
      bg_color: Type.Optional(AccessBgColor),
      footer_links: Type.Optional(AccessFooterLinks),
      header_bg_color: Type.Optional(AccessHeaderBgColor),
      landing_page_design: Type.Optional(AccessLandingPageDesign),
      skip_app_launcher_login_page: Type.Optional(AccessSkipAppLauncherLoginPage),
      policies: Type.Optional(
        Type.Array(
          Type.Union([
            AccessAppPolicyLink,
            Type.Intersect([
              Type.Unknown({ description: "A policy UID to link to this application." }),
              AccessSchemasUuid,
            ]),
            Type.Intersect([
              Type.Unknown(),
              Type.Object(
                {
                  id: Type.Optional(AccessSchemasUuid),
                },
                {
                  description:
                    "An application-scoped policy JSON. If the policy does not yet exist, it will be created.",
                },
              ),
              AccessAppPolicyRequest,
            ]),
          ]),
          {
            description:
              "The policies that Access applies to the application, in ascending order of precedence. Items can reference existing policies or create new policies exclusive to the application.",
          },
        ),
      ),
    }),
    Type.Object({
      allowed_idps: Type.Optional(AccessAllowedIdps),
      auto_redirect_to_identity: Type.Optional(AccessSchemasAutoRedirectToIdentity),
      custom_deny_url: Type.Optional(AccessCustomDenyUrl),
      custom_non_identity_deny_url: Type.Optional(AccessCustomNonIdentityDenyUrl),
      custom_pages: Type.Optional(AccessSchemasCustomPages),
      domain: Type.Optional(AccessDomain),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      session_duration: Type.Optional(AccessSchemasSessionDuration),
      type: AccessType,
      policies: Type.Optional(
        Type.Array(
          Type.Union([
            AccessAppPolicyLink,
            Type.Intersect([
              Type.Unknown({ description: "A policy UID to link to this application." }),
              AccessSchemasUuid,
            ]),
            Type.Intersect([
              Type.Unknown(),
              Type.Object(
                {
                  id: Type.Optional(AccessSchemasUuid),
                },
                {
                  description:
                    "An application-scoped policy JSON. If the policy does not yet exist, it will be created.",
                },
              ),
              AccessAppPolicyRequest,
            ]),
          ]),
          {
            description:
              "The policies that Access applies to the application, in ascending order of precedence. Items can reference existing policies or create new policies exclusive to the application.",
          },
        ),
      ),
    }),
    Type.Object({
      allowed_idps: Type.Optional(AccessAllowedIdps),
      auto_redirect_to_identity: Type.Optional(AccessSchemasAutoRedirectToIdentity),
      custom_deny_url: Type.Optional(AccessCustomDenyUrl),
      custom_non_identity_deny_url: Type.Optional(AccessCustomNonIdentityDenyUrl),
      custom_pages: Type.Optional(AccessSchemasCustomPages),
      domain: Type.Optional(AccessDomain),
      name: Type.Optional(AccessAppsComponentsSchemasName),
      session_duration: Type.Optional(AccessSchemasSessionDuration),
      type: AccessType,
      policies: Type.Optional(
        Type.Array(
          Type.Union([
            AccessAppPolicyLink,
            Type.Intersect([
              Type.Unknown({ description: "A policy UID to link to this application." }),
              AccessSchemasUuid,
            ]),
            Type.Intersect([
              Type.Unknown(),
              Type.Object(
                {
                  id: Type.Optional(AccessSchemasUuid),
                },
                {
                  description:
                    "An application-scoped policy JSON. If the policy does not yet exist, it will be created.",
                },
              ),
              AccessAppPolicyRequest,
            ]),
          ]),
          {
            description:
              "The policies that Access applies to the application, in ascending order of precedence. Items can reference existing policies or create new policies exclusive to the application.",
          },
        ),
      ),
    }),
    AccessBookmarkProps,
    Type.Object({
      name: Type.Optional(AccessAppsComponentsSchemasName),
      type: AccessType,
      target_criteria: Type.Array(AccessTargetCriteriaInfraApp),
      policies: Type.Optional(
        Type.Array(AccessInfraPolicyReq, { description: "The policies that Access applies to the application." }),
      ),
    }),
    Type.Object(
      {
        target_criteria: Type.Array(AccessTargetCriteriaSelfHostedApp),
        allow_authenticate_via_warp: Type.Optional(AccessSchemasAllowAuthenticateViaWarp),
        allow_iframe: Type.Optional(AccessAllowIframe),
        allowed_idps: Type.Optional(AccessAllowedIdps),
        app_launcher_visible: Type.Optional(AccessAppLauncherVisible),
        auto_redirect_to_identity: Type.Optional(AccessSchemasAutoRedirectToIdentity),
        cors_headers: Type.Optional(AccessCorsHeaders),
        custom_deny_message: Type.Optional(AccessCustomDenyMessage),
        custom_deny_url: Type.Optional(AccessCustomDenyUrl),
        custom_non_identity_deny_url: Type.Optional(AccessCustomNonIdentityDenyUrl),
        custom_pages: Type.Optional(AccessSchemasCustomPages),
        destinations: Type.Optional(AccessDestinations),
        domain: AccessDomain,
        enable_binding_cookie: Type.Optional(AccessEnableBindingCookie),
        http_only_cookie_attribute: Type.Optional(AccessHttpOnlyCookieAttribute),
        logo_url: Type.Optional(AccessLogoUrl),
        name: Type.Optional(AccessAppsComponentsSchemasName),
        options_preflight_bypass: Type.Optional(AccessOptionsPreflightBypass),
        path_cookie_attribute: Type.Optional(AccessPathCookieAttribute),
        read_service_tokens_from_header: Type.Optional(AccessReadServiceTokensFromHeader),
        same_site_cookie_attribute: Type.Optional(AccessSameSiteCookieAttribute),
        scim_config: Type.Optional(AccessScimConfig),
        self_hosted_domains: Type.Optional(AccessSelfHostedDomains),
        service_auth_401_redirect: Type.Optional(AccessServiceAuth401Redirect),
        session_duration: Type.Optional(AccessSchemasSessionDuration),
        skip_interstitial: Type.Optional(AccessSkipInterstitial),
        tags: Type.Optional(AccessTags),
        type: AccessType,
        policies: Type.Optional(
          Type.Array(
            Type.Union([
              AccessAppPolicyLink,
              Type.Intersect([
                Type.Unknown({ description: "A policy UID to link to this application." }),
                AccessSchemasUuid,
              ]),
              Type.Intersect([
                Type.Unknown(),
                Type.Object(
                  {
                    id: Type.Optional(AccessSchemasUuid),
                  },
                  {
                    description:
                      "An application-scoped policy JSON. If the policy does not yet exist, it will be created.",
                  },
                ),
                AccessAppPolicyRequest,
              ]),
            ]),
            {
              description:
                "The policies that Access applies to the application, in ascending order of precedence. Items can reference existing policies or create new policies exclusive to the application.",
            },
          ),
        ),
      },
      { description: "Contains the targets secured by the application." },
    ),
  ]),
)

export const AccessAppsComponentsSchemasResponseCollection = named(
  "access_apps_components-schemas-response_collection",
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
    result: Type.Optional(Type.Array(AccessAppResponse)),
  }),
)

export const CustomPagesErrorPageType = named(
  "custom-pages_error_page_type",
  Type.Union(
    [
      Type.Literal("waf_block"),
      Type.Literal("ip_block"),
      Type.Literal("country_challenge"),
      Type.Literal("500_errors"),
      Type.Literal("1000_errors"),
      Type.Literal("managed_challenge"),
      Type.Literal("ratelimit_block"),
    ],
    { description: "Error Page Types", "x-auditable": true },
  ),
)

export const CustomPagesUrl = named(
  "custom-pages_url",
  Type.String({ description: "The URL associated with the custom page.", format: "uri", "x-auditable": true }),
)

export const CustomPagesState = named(
  "custom-pages_state",
  Type.Union([Type.Literal("default"), Type.Literal("customized")], {
    description: "The custom page state.",
    "x-auditable": true,
  }),
)

export const CustomPagesCustomPage = named(
  "custom-pages_custom_page",
  Type.Object({
    created_on: Type.Optional(DlsTimestamp),
    description: Type.Optional(Type.String({ "x-auditable": true })),
    id: Type.Optional(Type.String({ "x-auditable": true })),
    modified_on: Type.Optional(DlsTimestamp),
    preview_target: Type.Optional(Type.String({ "x-auditable": true })),
    required_tokens: Type.Optional(Type.Array(Type.String(), { "x-auditable": true })),
    state: Type.Optional(CustomPagesState),
    url: Type.Optional(CustomPagesUrl),
  }),
)

export const CustomPagesCustomPageResult = named(
  "custom-pages_custom_page_result",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(CustomPagesCustomPage),
  }),
)

export const CustomPagesCustomPageResultList = named(
  "custom-pages_custom_page_result_list",
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
    result: Type.Optional(Type.Array(CustomPagesCustomPage)),
  }),
)

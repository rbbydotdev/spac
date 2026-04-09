import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages } from "../shared/schemas"

export const BotManagementAiBotsProtection = named(
  "bot-management_ai_bots_protection",
  Type.Union([Type.Literal("block"), Type.Literal("disabled"), Type.Literal("only_on_ad_pages")], {
    description:
      "Enable rule to block AI Scrapers and Crawlers. Please note the value `only_on_ad_pages` is currently not available for Enterprise customers.",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementCfRobotsVariant = named(
  "bot-management_cf_robots_variant",
  Type.Union([Type.Literal("off"), Type.Literal("policy_only")], {
    description: "Specifies the Robots Access Control License variant to use.",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementCrawlerProtection = named(
  "bot-management_crawler_protection",
  Type.Union([Type.Literal("enabled"), Type.Literal("disabled")], {
    description: "Enable rule to punish AI Scrapers and Crawlers via a link maze.",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementEnableJs = named(
  "bot-management_enable_js",
  Type.Boolean({
    description:
      "Use lightweight, invisible JavaScript detections to improve Bot Management. [Learn more about JavaScript Detections](https://developers.cloudflare.com/bots/reference/javascript-detections/).",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementIsRobotsTxtManaged = named(
  "bot-management_is_robots_txt_managed",
  Type.Boolean({
    description:
      "Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robots.txt.",
    default: false,
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementUsingLatestModel = named(
  "bot-management_using_latest_model",
  Type.Boolean({
    description: "A read-only field that indicates whether the zone currently is running the latest ML model.\n",
    readOnly: true,
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementFightMode = named(
  "bot-management_fight_mode",
  Type.Boolean({
    description: "Whether to enable Bot Fight Mode.",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementOptimizeWordpressTurnedOn = named(
  "bot-management_optimize_wordpress_turned_on",
  Type.Boolean({
    description: "Indicates that the zone's wordpress optimization for SBFM is turned on.",
    title: "optimize_wordpress",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementSbfmDefinitelyAutomatedTurnedOn = named(
  "bot-management_sbfm_definitely_automated_turned_on",
  Type.String({
    description: "Indicates that the zone's definitely automated requests are being blocked or challenged.",
    title: "sbfm_definitely_automated",
    "x-auditable": true,
  }),
)

export const BotManagementSbfmLikelyAutomatedTurnedOn = named(
  "bot-management_sbfm_likely_automated_turned_on",
  Type.String({
    description: "Indicates that the zone's likely automated requests are being blocked or challenged.",
    title: "sbfm_likely_automated",
    "x-auditable": true,
  }),
)

export const BotManagementSbfmStaticResourceProtectionTurnedOn = named(
  "bot-management_sbfm_static_resource_protection_turned_on",
  Type.String({
    description: "Indicates that the zone's static resource protection is turned on.",
    title: "sbfm_static_resource_protection",
    "x-auditable": true,
  }),
)

export const BotManagementSbfmVerifiedBotsTurnedOn = named(
  "bot-management_sbfm_verified_bots_turned_on",
  Type.String({
    description: "Indicates that the zone's verified bot requests are being blocked.",
    title: "sbfm_verified_bots",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementSuppressSessionScoreTurnedOff = named(
  "bot-management_suppress_session_score_turned_off",
  Type.Boolean({
    description: "Indicates that the zone's session score tracking is disabled.",
    title: "suppress_session_score",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementBotFightModeConfig = named(
  "bot-management_bot_fight_mode_config",
  Type.Object({
    ai_bots_protection: Type.Optional(BotManagementAiBotsProtection),
    cf_robots_variant: Type.Optional(BotManagementCfRobotsVariant),
    crawler_protection: Type.Optional(BotManagementCrawlerProtection),
    enable_js: Type.Optional(BotManagementEnableJs),
    is_robots_txt_managed: Type.Optional(BotManagementIsRobotsTxtManaged),
    using_latest_model: Type.Optional(BotManagementUsingLatestModel),
    fight_mode: Type.Optional(BotManagementFightMode),
    stale_zone_configuration: Type.Optional(
      Type.Object(
        {
          optimize_wordpress: Type.Optional(BotManagementOptimizeWordpressTurnedOn),
          sbfm_definitely_automated: Type.Optional(BotManagementSbfmDefinitelyAutomatedTurnedOn),
          sbfm_likely_automated: Type.Optional(BotManagementSbfmLikelyAutomatedTurnedOn),
          sbfm_static_resource_protection: Type.Optional(BotManagementSbfmStaticResourceProtectionTurnedOn),
          sbfm_verified_bots: Type.Optional(BotManagementSbfmVerifiedBotsTurnedOn),
          suppress_session_score: Type.Optional(BotManagementSuppressSessionScoreTurnedOff),
        },
        {
          description:
            "A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or downgrades.",
        },
      ),
    ),
  }),
)

export const BotManagementOptimizeWordpress = named(
  "bot-management_optimize_wordpress",
  Type.Boolean({
    description: "Whether to optimize Super Bot Fight Mode protections for Wordpress.",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementSbfmDefinitelyAutomated = named(
  "bot-management_sbfm_definitely_automated",
  Type.Union([Type.Literal("allow"), Type.Literal("block"), Type.Literal("managed_challenge")], {
    description: "Super Bot Fight Mode (SBFM) action to take on definitely automated requests.",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementSbfmStaticResourceProtection = named(
  "bot-management_sbfm_static_resource_protection",
  Type.Boolean({
    description:
      "Super Bot Fight Mode (SBFM) to enable static resource protection.\nEnable if static resources on your application need bot protection.\nNote: Static resource protection can also result in legitimate traffic being blocked.\n",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementSbfmVerifiedBots = named(
  "bot-management_sbfm_verified_bots",
  Type.Union([Type.Literal("allow"), Type.Literal("block")], {
    description: "Super Bot Fight Mode (SBFM) action to take on verified bots requests.",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementFightModeTurnedOn = named(
  "bot-management_fight_mode_turned_on",
  Type.Boolean({
    description: "Indicates that the zone's Bot Fight Mode is turned on.",
    title: "fight_mode",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementSbfmDefinitelyConfig = named(
  "bot-management_sbfm_definitely_config",
  Type.Object({
    ai_bots_protection: Type.Optional(BotManagementAiBotsProtection),
    cf_robots_variant: Type.Optional(BotManagementCfRobotsVariant),
    crawler_protection: Type.Optional(BotManagementCrawlerProtection),
    enable_js: Type.Optional(BotManagementEnableJs),
    is_robots_txt_managed: Type.Optional(BotManagementIsRobotsTxtManaged),
    using_latest_model: Type.Optional(BotManagementUsingLatestModel),
    optimize_wordpress: Type.Optional(BotManagementOptimizeWordpress),
    sbfm_definitely_automated: Type.Optional(BotManagementSbfmDefinitelyAutomated),
    sbfm_static_resource_protection: Type.Optional(BotManagementSbfmStaticResourceProtection),
    sbfm_verified_bots: Type.Optional(BotManagementSbfmVerifiedBots),
    stale_zone_configuration: Type.Optional(
      Type.Object(
        {
          fight_mode: Type.Optional(BotManagementFightModeTurnedOn),
          sbfm_likely_automated: Type.Optional(BotManagementSbfmLikelyAutomatedTurnedOn),
        },
        {
          description:
            "A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or downgrades.",
        },
      ),
    ),
  }),
)

export const BotManagementSbfmLikelyAutomated = named(
  "bot-management_sbfm_likely_automated",
  Type.Union([Type.Literal("allow"), Type.Literal("block"), Type.Literal("managed_challenge")], {
    description: "Super Bot Fight Mode (SBFM) action to take on likely automated requests.",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementSbfmLikelyConfig = named(
  "bot-management_sbfm_likely_config",
  Type.Object({
    ai_bots_protection: Type.Optional(BotManagementAiBotsProtection),
    cf_robots_variant: Type.Optional(BotManagementCfRobotsVariant),
    crawler_protection: Type.Optional(BotManagementCrawlerProtection),
    enable_js: Type.Optional(BotManagementEnableJs),
    is_robots_txt_managed: Type.Optional(BotManagementIsRobotsTxtManaged),
    using_latest_model: Type.Optional(BotManagementUsingLatestModel),
    optimize_wordpress: Type.Optional(BotManagementOptimizeWordpress),
    sbfm_definitely_automated: Type.Optional(BotManagementSbfmDefinitelyAutomated),
    sbfm_likely_automated: Type.Optional(BotManagementSbfmLikelyAutomated),
    sbfm_static_resource_protection: Type.Optional(BotManagementSbfmStaticResourceProtection),
    sbfm_verified_bots: Type.Optional(BotManagementSbfmVerifiedBots),
    stale_zone_configuration: Type.Optional(
      Type.Object(
        {
          fight_mode: Type.Optional(BotManagementFightModeTurnedOn),
        },
        {
          description:
            "A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or downgrades.",
        },
      ),
    ),
  }),
)

export const BotManagementAutoUpdateModel = named(
  "bot-management_auto_update_model",
  Type.Boolean({
    description:
      "Automatically update to the newest bot detection models created by Cloudflare as they are released. [Learn more.](https://developers.cloudflare.com/bots/reference/machine-learning-models#model-versions-and-release-notes)",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementBmCookieEnabled = named(
  "bot-management_bm_cookie_enabled",
  Type.Boolean({
    description:
      "Indicates that the bot management cookie can be placed on end user devices accessing the site. Defaults to true",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementSuppressSessionScore = named(
  "bot-management_suppress_session_score",
  Type.Boolean({
    description: "Whether to disable tracking the highest bot score for a session in the Bot Management cookie.",
    default: false,
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const BotManagementBmSubscriptionConfig = named(
  "bot-management_bm_subscription_config",
  Type.Object({
    ai_bots_protection: Type.Optional(BotManagementAiBotsProtection),
    cf_robots_variant: Type.Optional(BotManagementCfRobotsVariant),
    crawler_protection: Type.Optional(BotManagementCrawlerProtection),
    enable_js: Type.Optional(BotManagementEnableJs),
    is_robots_txt_managed: Type.Optional(BotManagementIsRobotsTxtManaged),
    using_latest_model: Type.Optional(BotManagementUsingLatestModel),
    auto_update_model: Type.Optional(BotManagementAutoUpdateModel),
    bm_cookie_enabled: Type.Optional(BotManagementBmCookieEnabled),
    stale_zone_configuration: Type.Optional(
      Type.Object(
        {
          fight_mode: Type.Optional(BotManagementFightModeTurnedOn),
          optimize_wordpress: Type.Optional(BotManagementOptimizeWordpressTurnedOn),
          sbfm_definitely_automated: Type.Optional(BotManagementSbfmDefinitelyAutomatedTurnedOn),
          sbfm_likely_automated: Type.Optional(BotManagementSbfmLikelyAutomatedTurnedOn),
          sbfm_static_resource_protection: Type.Optional(BotManagementSbfmStaticResourceProtectionTurnedOn),
          sbfm_verified_bots: Type.Optional(BotManagementSbfmVerifiedBotsTurnedOn),
        },
        {
          description:
            "A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or downgrades.",
        },
      ),
    ),
    suppress_session_score: Type.Optional(BotManagementSuppressSessionScore),
  }),
)

export const BotManagementConfigSingle = named(
  "bot-management_config_single",
  Type.Union([
    BotManagementBotFightModeConfig,
    BotManagementSbfmDefinitelyConfig,
    BotManagementSbfmLikelyConfig,
    BotManagementBmSubscriptionConfig,
  ]),
)

export const BotManagementBotManagementResponseBody = named(
  "bot-management_bot_management_response_body",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Union([
        BotManagementBotFightModeConfig,
        BotManagementSbfmDefinitelyConfig,
        BotManagementSbfmLikelyConfig,
        BotManagementBmSubscriptionConfig,
      ]),
    ),
  }),
)

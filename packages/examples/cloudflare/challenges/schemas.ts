import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages } from "../shared/schemas"

export const TurnstileInvalidateImmediately = named(
  "turnstile_invalidate_immediately",
  Type.Boolean({
    description:
      "If `invalidate_immediately` is set to `false`, the previous secret will\nremain valid for two hours. Otherwise, the secret is immediately\ninvalidated, and requests using it will be rejected.\n",
    default: false,
    "x-auditable": true,
  }),
)

export const TurnstileSitekey = named(
  "turnstile_sitekey",
  Type.String({ description: "Widget item identifier tag.", maxLength: 32, "x-auditable": true }),
)

export const TurnstileBotFightMode = named(
  "turnstile_bot_fight_mode",
  Type.Boolean({
    description:
      "If bot_fight_mode is set to `true`, Cloudflare issues computationally\nexpensive challenges in response to malicious bots (ENT only).\n",
    "x-auditable": true,
  }),
)

export const TurnstileClearanceLevel = named(
  "turnstile_clearance_level",
  Type.Union(
    [Type.Literal("no_clearance"), Type.Literal("jschallenge"), Type.Literal("managed"), Type.Literal("interactive")],
    {
      description:
        "If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance,\nthis setting can determine the clearance level to be set\n",
      "x-auditable": true,
    },
  ),
)

export const TurnstileCreatedOn = named(
  "turnstile_created_on",
  Type.String({ description: "When the widget was created.", format: "date-time", readOnly: true }),
)

export const TurnstileDomains = named(
  "turnstile_domains",
  Type.Array(
    Type.String({
      description:
        "Hosts as a hostname or IPv4/IPv6 address represented by strings. The\nwidget will only work on these domains, and their subdomains.\n",
      "x-auditable": true,
    }),
  ),
)

export const TurnstileEphemeralId = named(
  "turnstile_ephemeral_id",
  Type.Boolean({ description: "Return the Ephemeral ID in /siteverify (ENT only).\n", "x-auditable": true }),
)

export const TurnstileWidgetMode = named(
  "turnstile_widget_mode",
  Type.Union([Type.Literal("non-interactive"), Type.Literal("invisible"), Type.Literal("managed")], {
    description: "Widget Mode",
    "x-auditable": true,
  }),
)

export const TurnstileModifiedOn = named(
  "turnstile_modified_on",
  Type.String({ description: "When the widget was modified.", format: "date-time", readOnly: true }),
)

export const TurnstileName = named(
  "turnstile_name",
  Type.String({
    description:
      "Human readable widget name. Not unique. Cloudflare suggests that you\nset this to a meaningful string to make it easier to identify your\nwidget, and where it is used.\n",
    minLength: 1,
    maxLength: 254,
    "x-auditable": true,
  }),
)

export const TurnstileOfflabel = named(
  "turnstile_offlabel",
  Type.Boolean({ description: "Do not show any Cloudflare branding on the widget (ENT only).\n", "x-auditable": true }),
)

export const TurnstileRegion = named(
  "turnstile_region",
  Type.Union([Type.Literal("world"), Type.Literal("china")], {
    description: "Region where this widget can be used. This cannot be changed after creation.\n",
    "x-auditable": true,
  }),
)

export const TurnstileSecret = named(
  "turnstile_secret",
  Type.String({ description: "Secret key for this widget.", "x-sensitive": true }),
)

export const TurnstileWidgetDetail = named(
  "turnstile_widget_detail",
  Type.Object(
    {
      bot_fight_mode: TurnstileBotFightMode,
      clearance_level: TurnstileClearanceLevel,
      created_on: TurnstileCreatedOn,
      domains: TurnstileDomains,
      ephemeral_id: TurnstileEphemeralId,
      mode: TurnstileWidgetMode,
      modified_on: TurnstileModifiedOn,
      name: TurnstileName,
      offlabel: TurnstileOfflabel,
      region: TurnstileRegion,
      secret: TurnstileSecret,
      sitekey: TurnstileSitekey,
    },
    { description: "A Turnstile widget's detailed configuration" },
  ),
)

export const TurnstileApiResponseCommonFailure = named(
  "turnstile_api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Unknown(), Type.Null()]),
    success: Type.Boolean({ description: "Whether the API call was successful" }),
  }),
)

export const TurnstileWidgetList = named(
  "turnstile_widget_list",
  Type.Object(
    {
      bot_fight_mode: TurnstileBotFightMode,
      clearance_level: TurnstileClearanceLevel,
      created_on: TurnstileCreatedOn,
      domains: TurnstileDomains,
      ephemeral_id: TurnstileEphemeralId,
      mode: TurnstileWidgetMode,
      modified_on: TurnstileModifiedOn,
      name: TurnstileName,
      offlabel: TurnstileOfflabel,
      region: TurnstileRegion,
      sitekey: TurnstileSitekey,
    },
    { description: "A Turnstile Widgets configuration as it appears in listings" },
  ),
)

export const TurnstileResultInfo = named(
  "turnstile_result_info",
  Type.Object({
    count: Type.Number({ description: "Total number of results for the requested service" }),
    page: Type.Number({ description: "Current page within paginated list of results" }),
    per_page: Type.Number({ description: "Number of results per page of results" }),
    total_count: Type.Number({ description: "Total results available without any search parameters" }),
  }),
)

import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages, FirewallAction, FirewallDescription, FirewallResultInfo } from "../shared/schemas"

export const FirewallRateLimitId = named(
  "firewall_rate_limit_id",
  Type.String({ description: "Defines the unique identifier of the rate limit.", maxLength: 32, readOnly: true }),
)

export const FirewallId = named(
  "firewall_id",
  Type.String({
    description: "The unique identifier of the rate limit.",
    maxLength: 32,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const FirewallDisabled = named(
  "firewall_disabled",
  Type.Boolean({ description: "When true, indicates that the rate limit is currently disabled.", "x-auditable": true }),
)

export const FirewallBypass = named(
  "firewall_bypass",
  Type.Array(
    Type.Object({
      name: Type.Optional(Type.Union([Type.Literal("url")])),
      value: Type.Optional(Type.String({ description: "The URL to bypass." })),
    }),
    {
      description:
        "Criteria specifying when the current rate limit should be bypassed. You can specify that the rate limit should not apply to one or more URLs.",
    },
  ),
)

export const FirewallHeaderName = named(
  "firewall_header_name",
  Type.String({ description: "The name of the response header to match.", "x-auditable": true }),
)

export const FirewallHeaderOp = named(
  "firewall_header_op",
  Type.Union([Type.Literal("eq"), Type.Literal("ne")], {
    description: 'The operator used when matching: `eq` means "equal" and `ne` means "not equal".',
    "x-auditable": true,
  }),
)

export const FirewallHeaderValue = named(
  "firewall_header_value",
  Type.String({ description: "The value of the response header, which must match exactly.", "x-auditable": true }),
)

export const FirewallMethods = named(
  "firewall_methods",
  Type.Array(
    Type.Union(
      [
        Type.Literal("GET"),
        Type.Literal("POST"),
        Type.Literal("PUT"),
        Type.Literal("DELETE"),
        Type.Literal("PATCH"),
        Type.Literal("HEAD"),
        Type.Literal("_ALL_"),
      ],
      { description: "An HTTP method or `_ALL_` to indicate all methods.", "x-auditable": true },
    ),
    {
      description:
        "The HTTP methods to match. You can specify a subset (for example, `['POST','PUT']`) or all methods (`['_ALL_']`). This field is optional when creating a rate limit.",
    },
  ),
)

export const FirewallSchemes = named(
  "firewall_schemes",
  Type.Array(Type.String({ description: "An HTTP scheme or `_ALL_` to indicate all schemes." }), {
    description:
      "The HTTP schemes to match. You can specify one scheme (`['HTTPS']`), both schemes (`['HTTP','HTTPS']`), or all schemes (`['_ALL_']`). This field is optional.",
    "x-auditable": true,
  }),
)

export const FirewallUrl = named(
  "firewall_url",
  Type.String({
    description:
      "The URL pattern to match, composed of a host and a path such as `example.org/path*`. Normalization is applied before the pattern is matched. `*` wildcards are expanded to match applicable traffic. Query strings are not matched. Set the value to `*` to match all traffic to your zone.",
    maxLength: 1024,
    "x-auditable": true,
  }),
)

export const FirewallOriginTraffic = named(
  "firewall_origin_traffic",
  Type.Boolean({
    description:
      'When true, only the uncached traffic served from your origin servers will count towards rate limiting. In this case, any cached traffic served by Cloudflare will not count towards rate limiting. This field is optional.\nNotes: This field is deprecated. Instead, use response headers and set "origin_traffic" to "false" to avoid legacy behaviour interacting with the "response_headers" property.',
    "x-auditable": true,
  }),
)

export const FirewallMatch = named(
  "firewall_match",
  Type.Object(
    {
      headers: Type.Optional(
        Type.Array(
          Type.Object({
            name: Type.Optional(FirewallHeaderName),
            op: Type.Optional(FirewallHeaderOp),
            value: Type.Optional(FirewallHeaderValue),
          }),
        ),
      ),
      request: Type.Optional(
        Type.Object({
          methods: Type.Optional(FirewallMethods),
          schemes: Type.Optional(FirewallSchemes),
          url: Type.Optional(FirewallUrl),
        }),
      ),
      response: Type.Optional(
        Type.Object({
          origin_traffic: Type.Optional(FirewallOriginTraffic),
        }),
      ),
    },
    { description: "Determines which traffic the rate limit counts towards the threshold." },
  ),
)

export const FirewallPeriod = named(
  "firewall_period",
  Type.Number({
    description:
      "The time in seconds (an integer value) to count matching traffic. If the count exceeds the configured threshold within this period, Cloudflare will perform the configured action.",
    minimum: 10,
    maximum: 86400,
    "x-auditable": true,
  }),
)

export const FirewallThreshold = named(
  "firewall_threshold",
  Type.Number({
    description:
      "The threshold that will trigger the configured mitigation action. Configure this value along with the `period` property to establish a threshold per period.",
    minimum: 1,
    "x-auditable": true,
  }),
)

export const FirewallRatelimit = named(
  "firewall_ratelimit",
  Type.Object({
    action: Type.Optional(FirewallAction),
    bypass: Type.Optional(FirewallBypass),
    description: Type.Optional(FirewallDescription),
    disabled: Type.Optional(FirewallDisabled),
    id: Type.Optional(FirewallId),
    match: Type.Optional(FirewallMatch),
    period: Type.Optional(FirewallPeriod),
    threshold: Type.Optional(FirewallThreshold),
  }),
)

export const FirewallRateLimits = named("firewall_rate-limits", FirewallRatelimit)

export const FirewallRatelimitResponseSingle = named(
  "firewall_ratelimit_response_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: FirewallRateLimits,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const FirewallRatelimitResponseCollection = named(
  "firewall_ratelimit_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(FirewallRateLimits), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
    result_info: Type.Optional(FirewallResultInfo),
  }),
)

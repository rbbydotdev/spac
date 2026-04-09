import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const WaitingroomAdditionalRoutes = named(
  "waitingroom_additional_routes",
  Type.Array(
    Type.Object({
      host: Type.Optional(
        Type.String({
          description:
            "The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostname (if using SSL for SaaS) of this zone. Please do not include the scheme (http:// or https://).",
          "x-auditable": true,
        }),
      ),
      path: Type.Optional(
        Type.String({
          description:
            "Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.",
          default: "/",
          "x-auditable": true,
        }),
      ),
    }),
    {
      description:
        "Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. The hostname and path combination must be unique to this and all other waiting rooms.",
    },
  ),
)

export const WaitingroomCookieAttributes = named(
  "waitingroom_cookie_attributes",
  Type.Object(
    {
      samesite: Type.Optional(
        Type.Union([Type.Literal("auto"), Type.Literal("lax"), Type.Literal("none"), Type.Literal("strict")], {
          description:
            "Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use HTTPS** is enabled. Note that when using value `none`, the secure attribute cannot be set to `never`.",
          "x-auditable": true,
        }),
      ),
      secure: Type.Optional(
        Type.Union([Type.Literal("auto"), Type.Literal("always"), Type.Literal("never")], {
          description:
            "Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie header, `never` indicates that the Secure attribute will not be set, and `auto` will set the Secure attribute depending if **Always Use HTTPS** is enabled.",
          "x-auditable": true,
        }),
      ),
    },
    {
      description:
        "Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position.",
    },
  ),
)

export const WaitingroomCookieSuffix = named(
  "waitingroom_cookie_suffix",
  Type.String({
    description:
      "Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is \"abcd\", the cookie name will be `__cf_waitingroom_abcd`. This field is required if using `additional_routes`.",
    "x-auditable": true,
  }),
)

export const AaaTimestamp = named(
  "aaa_timestamp",
  Type.String({ format: "date-time", readOnly: true, "x-auditable": true }),
)

export const WaitingroomCustomPageHtml = named(
  "waitingroom_custom_page_html",
  Type.String({
    description:
      "Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. The template is based on mustache ( https://mustache.github.io/ ). There are several variables that are evaluated by the Cloudflare edge:\n1. {{`waitTimeKnown`}} Acts like a boolean value that indicates the behavior to take when wait time is not available, for instance when queue_all is **true**.\n2. {{`waitTimeFormatted`}} Estimated wait time for the user. For example, five minutes. Alternatively, you can use:\n3. {{`waitTime`}} Number of minutes of estimated wait for a user.\n4. {{`waitTimeHours`}} Number of hours of estimated wait for a user (`Math.floor(waitTime/60)`).\n5. {{`waitTimeHourMinutes`}} Number of minutes above the `waitTimeHours` value (`waitTime%60`).\n6. {{`queueIsFull`}} Changes to **true** when no more people can be added to the queue.\n\nTo view the full list of variables, look at the `cfWaitingRoom` object described under the `json_response_enabled` property in other Waiting Room API calls.",
    default: "",
    "x-auditable": true,
  }),
)

export const WaitingroomDefaultTemplateLanguage = named(
  "waitingroom_default_template_language",
  Type.Union(
    [
      Type.Literal("en-US"),
      Type.Literal("es-ES"),
      Type.Literal("de-DE"),
      Type.Literal("fr-FR"),
      Type.Literal("it-IT"),
      Type.Literal("ja-JP"),
      Type.Literal("ko-KR"),
      Type.Literal("pt-BR"),
      Type.Literal("zh-CN"),
      Type.Literal("zh-TW"),
      Type.Literal("nl-NL"),
      Type.Literal("pl-PL"),
      Type.Literal("id-ID"),
      Type.Literal("tr-TR"),
      Type.Literal("ar-EG"),
      Type.Literal("ru-RU"),
      Type.Literal("fa-IR"),
      Type.Literal("bg-BG"),
      Type.Literal("hr-HR"),
      Type.Literal("cs-CZ"),
      Type.Literal("da-DK"),
      Type.Literal("fi-FI"),
      Type.Literal("lt-LT"),
      Type.Literal("ms-MY"),
      Type.Literal("nb-NO"),
      Type.Literal("ro-RO"),
      Type.Literal("el-GR"),
      Type.Literal("he-IL"),
      Type.Literal("hi-IN"),
      Type.Literal("hu-HU"),
      Type.Literal("sr-BA"),
      Type.Literal("sk-SK"),
      Type.Literal("sl-SI"),
      Type.Literal("sv-SE"),
      Type.Literal("tl-PH"),
      Type.Literal("th-TH"),
      Type.Literal("uk-UA"),
      Type.Literal("vi-VN"),
    ],
    {
      description:
        "The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.",
      "x-auditable": true,
    },
  ),
)

export const WaitingroomDescription = named(
  "waitingroom_description",
  Type.String({
    description: "A note that you can use to add more details about the waiting room.",
    default: "",
    "x-auditable": true,
  }),
)

export const WaitingroomDisableSessionRenewal = named(
  "waitingroom_disable_session_renewal",
  Type.Boolean({
    description:
      "Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, they will have to go through the waiting room again. If `false`, a user's session cookie will be automatically renewed on every request.",
    default: false,
    "x-auditable": true,
  }),
)

export const WaitingroomEnabledOriginCommands = named(
  "waitingroom_enabled_origin_commands",
  Type.Array(Type.Union([Type.Literal("revoke")], { "x-auditable": true }), {
    description: "A list of enabled origin commands.",
  }),
)

export const WaitingroomHost = named(
  "waitingroom_host",
  Type.String({
    description:
      "The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique.",
    "x-auditable": true,
  }),
)

export const WaitingroomWaitingRoomId = named("waitingroom_waiting_room_id", Type.String({ "x-auditable": true }))

export const WaitingroomJsonResponseEnabled = named(
  "waitingroom_json_response_enabled",
  Type.Boolean({
    description:
      'Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on the user\'s status in the waiting room as opposed to the configured static HTML page. This JSON response object has one property `cfWaitingRoom` which is an object containing the following fields:\n1. `inWaitingRoom`: Boolean indicating if the user is in the waiting room (always **true**).\n2. `waitTimeKnown`: Boolean indicating if the current estimated wait times are accurate. If **false**, they are not available.\n3. `waitTime`: Valid only when `waitTimeKnown` is **true**. Integer indicating the current estimated time in minutes the user will wait in the waiting room. When `queueingMethod` is **random**, this is set to `waitTime50Percentile`.\n4. `waitTime25Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 25% of users that gain entry the fastest (25th percentile).\n5. `waitTime50Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 50% of users that gain entry the fastest (50th percentile). In other words, half of the queued users are expected to let into the origin website before `waitTime50Percentile` and half are expected to be let in after it.\n6. `waitTime75Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 75% of users that gain entry the fastest (75th percentile).\n7. `waitTimeFormatted`: String displaying the `waitTime` formatted in English for users. If `waitTimeKnown` is **false**, `waitTimeFormatted` will display **unavailable**.\n8. `queueIsFull`: Boolean indicating if the waiting room\'s queue is currently full and not accepting new users at the moment.\n9. `queueAll`: Boolean indicating if all users will be queued in the waiting room and no one will be let into the origin website.\n10. `lastUpdated`: String displaying the timestamp as an ISO 8601 string of the user\'s last attempt to leave the waiting room and be let into the origin website. The user is able to make another attempt after `refreshIntervalSeconds` past this time. If the user makes a request too soon, it will be ignored and `lastUpdated` will not change.\n11. `refreshIntervalSeconds`: Integer indicating the number of seconds after `lastUpdated` until the user is able to make another attempt to leave the waiting room and be let into the origin website. When the `queueingMethod` is `reject`, there is no specified refresh time —\\_it will always be **zero**.\n12. `queueingMethod`: The queueing method currently used by the waiting room. It is either **fifo**, **random**, **passthrough**, or **reject**.\n13. `isFIFOQueue`: Boolean indicating if the waiting room uses a FIFO (First-In-First-Out) queue.\n14. `isRandomQueue`: Boolean indicating if the waiting room uses a Random queue where users gain access randomly.\n15. `isPassthroughQueue`: Boolean indicating if the waiting room uses a passthrough queue. Keep in mind that when passthrough is enabled, this JSON response will only exist when `queueAll` is **true** or `isEventPrequeueing` is **true** because in all other cases requests will go directly to the origin.\n16. `isRejectQueue`: Boolean indicating if the waiting room uses a reject queue.\n17. `isEventActive`: Boolean indicating if an event is currently occurring. Events are able to change a waiting room\'s behavior during a specified period of time. For additional information, look at the event properties `prequeue_start_time`, `event_start_time`, and `event_end_time` in the documentation for creating waiting room events. Events are considered active between these start and end times, as well as during the prequeueing period if it exists.\n18. `isEventPrequeueing`: Valid only when `isEventActive` is **true**. Boolean indicating if an event is currently prequeueing users before it starts.\n19. `timeUntilEventStart`: Valid only when `isEventPrequeueing` is **true**. Integer indicating the number of minutes until the event starts.\n20. `timeUntilEventStartFormatted`: String displaying the `timeUntilEventStart` formatted in English for users. If `isEventPrequeueing` is **false**, `timeUntilEventStartFormatted` will display **unavailable**.\n21. `timeUntilEventEnd`: Valid only when `isEventActive` is **true**. Integer indicating the number of minutes until the event ends.\n22. `timeUntilEventEndFormatted`: String displaying the `timeUntilEventEnd` formatted in English for users. If `isEventActive` is **false**, `timeUntilEventEndFormatted` will display **unavailable**.\n23. `shuffleAtEventStart`: Valid only when `isEventActive` is **true**. Boolean indicating if the users in the prequeue are shuffled randomly when the event starts.\n24. `turnstile`: Empty when turnstile isn\'t enabled. String displaying an html tag to display the Turnstile widget. Please add the `{{{turnstile}}}` tag to the `custom_html` template to ensure the Turnstile widget appears.\n25. `infiniteQueue`: Boolean indicating whether the response is for a user in the infinite queue.\n\nAn example cURL to a waiting room could be:\n\n\tcurl -X GET "https://example.com/waitingroom" \\\n\t\t-H "Accept: application/json"\n\nIf `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **fifo** and no event is active could be:\n\n\t{\n\t\t"cfWaitingRoom": {\n\t\t\t"inWaitingRoom": true,\n\t\t\t"waitTimeKnown": true,\n\t\t\t"waitTime": 10,\n\t\t\t"waitTime25Percentile": 0,\n\t\t\t"waitTime50Percentile": 0,\n\t\t\t"waitTime75Percentile": 0,\n\t\t\t"waitTimeFormatted": "10 minutes",\n\t\t\t"queueIsFull": false,\n\t\t\t"queueAll": false,\n\t\t\t"lastUpdated": "2020-08-03T23:46:00.000Z",\n\t\t\t"refreshIntervalSeconds": 20,\n\t\t\t"queueingMethod": "fifo",\n\t\t\t"isFIFOQueue": true,\n\t\t\t"isRandomQueue": false,\n\t\t\t"isPassthroughQueue": false,\n\t\t\t"isRejectQueue": false,\n\t\t\t"isEventActive": false,\n\t\t\t"isEventPrequeueing": false,\n\t\t\t"timeUntilEventStart": 0,\n\t\t\t"timeUntilEventStartFormatted": "unavailable",\n\t\t\t"timeUntilEventEnd": 0,\n\t\t\t"timeUntilEventEndFormatted": "unavailable",\n\t\t\t"shuffleAtEventStart": false\n\t\t}\n\t}\n\nIf `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **random** and an event is active could be:\n\n\t{\n\t\t"cfWaitingRoom": {\n\t\t\t"inWaitingRoom": true,\n\t\t\t"waitTimeKnown": true,\n\t\t\t"waitTime": 10,\n\t\t\t"waitTime25Percentile": 5,\n\t\t\t"waitTime50Percentile": 10,\n\t\t\t"waitTime75Percentile": 15,\n\t\t\t"waitTimeFormatted": "5 minutes to 15 minutes",\n\t\t\t"queueIsFull": false,\n\t\t\t"queueAll": false,\n\t\t\t"lastUpdated": "2020-08-03T23:46:00.000Z",\n\t\t\t"refreshIntervalSeconds": 20,\n\t\t\t"queueingMethod": "random",\n\t\t\t"isFIFOQueue": false,\n\t\t\t"isRandomQueue": true,\n\t\t\t"isPassthroughQueue": false,\n\t\t\t"isRejectQueue": false,\n\t\t\t"isEventActive": true,\n\t\t\t"isEventPrequeueing": false,\n\t\t\t"timeUntilEventStart": 0,\n\t\t\t"timeUntilEventStartFormatted": "unavailable",\n\t\t\t"timeUntilEventEnd": 15,\n\t\t\t"timeUntilEventEndFormatted": "15 minutes",\n\t\t\t"shuffleAtEventStart": true\n\t\t}\n\t}',
    default: false,
    "x-auditable": true,
  }),
)

export const WaitingroomName = named(
  "waitingroom_name",
  Type.String({
    description:
      "A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.",
    "x-auditable": true,
  }),
)

export const WaitingroomNewUsersPerMinute = named(
  "waitingroom_new_users_per_minute",
  Type.Integer({
    description:
      "Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little more or little less traffic coming to the route based on the traffic patterns at that time around the world.",
    minimum: 200,
    maximum: 2147483647,
    "x-auditable": true,
  }),
)

export const WaitingroomNextEventPrequeueStartTime = named(
  "waitingroom_next_event_prequeue_start_time",
  Type.Union([
    Type.String({
      description: "An ISO 8601 timestamp that marks when the next event will begin queueing.",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const WaitingroomNextEventStartTime = named(
  "waitingroom_next_event_start_time",
  Type.Union([
    Type.String({
      description: "An ISO 8601 timestamp that marks when the next event will start.",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const WaitingroomPath = named(
  "waitingroom_path",
  Type.String({
    description:
      "Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.",
    default: "/",
    "x-auditable": true,
  }),
)

export const WaitingroomQueueAll = named(
  "waitingroom_queue_all",
  Type.Boolean({
    description:
      "If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailable.",
    default: false,
    "x-auditable": true,
  }),
)

export const WaitingroomQueueingMethod = named(
  "waitingroom_queueing_method",
  Type.Union([Type.Literal("fifo"), Type.Literal("random"), Type.Literal("passthrough"), Type.Literal("reject")], {
    description:
      "Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing method, if `queue_all` is enabled or an event is prequeueing, users in the waiting room will not be accepted to the origin. These users will always see a waiting room page that refreshes automatically. The valid queueing methods are:\n1. `fifo` **(default)**: First-In-First-Out queue where customers gain access in the order they arrived.\n2. `random`: Random queue where customers gain access randomly, regardless of arrival time.\n3. `passthrough`: Users will pass directly through the waiting room and into the origin website. As a result, any configured limits will not be respected while this is enabled. This method can be used as an alternative to disabling a waiting room (with `suspended`) so that analytics are still reported. This can be used if you wish to allow all traffic normally, but want to restrict traffic during a waiting room event, or vice versa.\n4. `reject`: Users will be immediately rejected from the waiting room. As a result, no users will reach the origin website while this is enabled. This can be used if you wish to reject all traffic while performing maintenance, block traffic during a specified period of time (an event), or block traffic while events are not occurring. Consider a waiting room used for vaccine distribution that only allows traffic during sign-up events, and otherwise blocks all traffic. For this case, the waiting room uses `reject`, and its events override this with `fifo`, `random`, or `passthrough`. When this queueing method is enabled and neither `queueAll` is enabled nor an event is prequeueing, the waiting room page **will not refresh automatically**.",
    "x-auditable": true,
  }),
)

export const WaitingroomQueueingStatusCode = named(
  "waitingroom_queueing_status_code",
  Type.Union([Type.Literal(200), Type.Literal(202), Type.Literal(429)], {
    description: "HTTP status code returned to a user while in the queue.",
    "x-auditable": true,
  }),
)

export const WaitingroomSessionDuration = named(
  "waitingroom_session_duration",
  Type.Integer({
    description:
      "Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits the route.",
    default: 5,
    minimum: 1,
    maximum: 30,
    "x-auditable": true,
  }),
)

export const WaitingroomSuspended = named(
  "waitingroom_suspended",
  Type.Boolean({
    description:
      "Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.",
    default: false,
    "x-auditable": true,
  }),
)

export const WaitingroomTotalActiveUsers = named(
  "waitingroom_total_active_users",
  Type.Integer({
    description:
      "Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the total number of active user sessions on the route. It is possible to have a situation where there are more or less active users sessions on the route based on the traffic patterns at that time around the world.",
    minimum: 200,
    maximum: 2147483647,
    "x-auditable": true,
  }),
)

export const WaitingroomTurnstileAction = named(
  "waitingroom_turnstile_action",
  Type.Union([Type.Literal("log"), Type.Literal("infinite_queue")], {
    description:
      "Which action to take when a bot is detected using Turnstile. `log` will\nhave no impact on queueing behavior, simply keeping track of how many\nbots are detected in Waiting Room Analytics. `infinite_queue` will send\nbots to a false queueing state, where they will never reach your\norigin. `infinite_queue` requires Advanced Waiting Room.\n",
    "x-auditable": true,
  }),
)

export const WaitingroomTurnstileMode = named(
  "waitingroom_turnstile_mode",
  Type.Union(
    [
      Type.Literal("off"),
      Type.Literal("invisible"),
      Type.Literal("visible_non_interactive"),
      Type.Literal("visible_managed"),
    ],
    {
      description:
        "Which Turnstile widget type to use for detecting bot traffic. See\n[the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types)\nfor the definitions of these widget types. Set to `off` to disable the\nTurnstile integration entirely. Setting this to anything other than\n`off` or `invisible` requires Advanced Waiting Room.\n",
      "x-auditable": true,
    },
  ),
)

export const WaitingroomWaitingroom = named(
  "waitingroom_waitingroom",
  Type.Object({
    additional_routes: Type.Optional(WaitingroomAdditionalRoutes),
    cookie_attributes: Type.Optional(WaitingroomCookieAttributes),
    cookie_suffix: Type.Optional(WaitingroomCookieSuffix),
    created_on: Type.Optional(AaaTimestamp),
    custom_page_html: Type.Optional(WaitingroomCustomPageHtml),
    default_template_language: Type.Optional(WaitingroomDefaultTemplateLanguage),
    description: Type.Optional(WaitingroomDescription),
    disable_session_renewal: Type.Optional(WaitingroomDisableSessionRenewal),
    enabled_origin_commands: Type.Optional(WaitingroomEnabledOriginCommands),
    host: Type.Optional(WaitingroomHost),
    id: Type.Optional(WaitingroomWaitingRoomId),
    json_response_enabled: Type.Optional(WaitingroomJsonResponseEnabled),
    modified_on: Type.Optional(AaaTimestamp),
    name: Type.Optional(WaitingroomName),
    new_users_per_minute: Type.Optional(WaitingroomNewUsersPerMinute),
    next_event_prequeue_start_time: Type.Optional(WaitingroomNextEventPrequeueStartTime),
    next_event_start_time: Type.Optional(WaitingroomNextEventStartTime),
    path: Type.Optional(WaitingroomPath),
    queue_all: Type.Optional(WaitingroomQueueAll),
    queueing_method: Type.Optional(WaitingroomQueueingMethod),
    queueing_status_code: Type.Optional(WaitingroomQueueingStatusCode),
    session_duration: Type.Optional(WaitingroomSessionDuration),
    suspended: Type.Optional(WaitingroomSuspended),
    total_active_users: Type.Optional(WaitingroomTotalActiveUsers),
    turnstile_action: Type.Optional(WaitingroomTurnstileAction),
    turnstile_mode: Type.Optional(WaitingroomTurnstileMode),
  }),
)

export const FirewallIdentifier = named(
  "firewall_identifier",
  Type.String({ description: "Defines an identifier.", maxLength: 32 }),
)

export const ResponseInfo = named(
  "response_info",
  Type.Object({
    code: Type.Integer({ minimum: 1000 }),
    message: Type.String(),
    documentation_url: Type.Optional(Type.String()),
    source: Type.Optional(
      Type.Object({
        pointer: Type.Optional(Type.String()),
      }),
    ),
  }),
)

export const FirewallEmail = named(
  "firewall_email",
  Type.String({ description: "The contact email address of the user.", maxLength: 90 }),
)

export const FirewallNotes = named(
  "firewall_notes",
  Type.String({
    description: "An informative summary of the rule, typically used as a reminder or explanation.",
    "x-auditable": true,
  }),
)

export const FirewallSchemasIdentifier = named(
  "firewall_schemas-identifier",
  Type.String({
    description: "The unique identifier of the IP Access rule.",
    maxLength: 32,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const FirewallIpConfiguration = named(
  "firewall_ip_configuration",
  Type.Object({
    target: Type.Optional(
      Type.Union([Type.Literal("ip")], {
        description:
          "The configuration target. You must set the target to `ip` when specifying an IP address in the rule.",
      }),
    ),
    value: Type.Optional(
      Type.String({
        description: "The IP address to match. This address will be compared to the IP address of incoming requests.",
      }),
    ),
  }),
)

export const FirewallIpv6Configuration = named(
  "firewall_ipv6_configuration",
  Type.Object({
    target: Type.Optional(
      Type.Union([Type.Literal("ip6")], {
        description:
          "The configuration target. You must set the target to `ip6` when specifying an IPv6 address in the rule.",
      }),
    ),
    value: Type.Optional(Type.String({ description: "The IPv6 address to match." })),
  }),
)

export const FirewallCidrConfiguration = named(
  "firewall_cidr_configuration",
  Type.Object({
    target: Type.Optional(
      Type.Union([Type.Literal("ip_range")], {
        description:
          "The configuration target. You must set the target to `ip_range` when specifying an IP address range in the rule.",
      }),
    ),
    value: Type.Optional(
      Type.String({
        description:
          "The IP address range to match. You can only use prefix lengths `/16` and `/24` for IPv4 ranges, and prefix lengths `/32`, `/48`, and `/64` for IPv6 ranges.",
      }),
    ),
  }),
)

export const FirewallAsnConfiguration = named(
  "firewall_asn_configuration",
  Type.Object({
    target: Type.Optional(
      Type.Union([Type.Literal("asn")], {
        description:
          "The configuration target. You must set the target to `asn` when specifying an Autonomous System Number (ASN) in the rule.",
      }),
    ),
    value: Type.Optional(Type.String({ description: "The AS number to match." })),
  }),
)

export const FirewallCountryConfiguration = named(
  "firewall_country_configuration",
  Type.Object({
    target: Type.Optional(
      Type.Union([Type.Literal("country")], {
        description:
          "The configuration target. You must set the target to `country` when specifying a country code in the rule.",
      }),
    ),
    value: Type.Optional(
      Type.String({
        description:
          "The two-letter ISO-3166-1 alpha-2 code to match. For more information, refer to [IP Access rules: Parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/#country).",
        "x-auditable": true,
      }),
    ),
  }),
)

export const FirewallConfiguration = named(
  "firewall_configuration",
  Type.Union(
    [
      FirewallIpConfiguration,
      FirewallIpv6Configuration,
      FirewallCidrConfiguration,
      FirewallAsnConfiguration,
      FirewallCountryConfiguration,
    ],
    { description: "The rule configuration." },
  ),
)

export const FirewallSchemasMode = named(
  "firewall_schemas-mode",
  Type.Union(
    [
      Type.Literal("block"),
      Type.Literal("challenge"),
      Type.Literal("whitelist"),
      Type.Literal("js_challenge"),
      Type.Literal("managed_challenge"),
    ],
    { description: "The action to apply to a matched request.", "x-auditable": true },
  ),
)

export const FirewallResultInfo = named(
  "firewall_result_info",
  Type.Object({
    count: Type.Optional(
      Type.Number({ description: "Defines the total number of results for the requested service." }),
    ),
    page: Type.Optional(Type.Number({ description: "Defines the current page within paginated list of results." })),
    per_page: Type.Optional(Type.Number({ description: "Defines the number of results per page of results." })),
    total_count: Type.Optional(
      Type.Number({ description: "Defines the total results available without any search parameters." }),
    ),
  }),
)

export const AccessClientId = named(
  "access_client_id",
  Type.String({
    description:
      "The Client ID for the service token. Access will check for this value in the `CF-Access-Client-ID` request header.",
  }),
)

export const DlsTimestamp = named("dls_timestamp", Type.String({ format: "date-time", "x-auditable": true }))

export const AccessCreatedAt = named("access_created_at", DlsTimestamp)

export const AccessDuration = named(
  "access_duration",
  Type.String({
    description:
      "The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).",
    default: "8760h",
    "x-auditable": true,
  }),
)

export const AccessUuid = named(
  "access_uuid",
  Type.String({ description: "UUID.", maxLength: 36, readOnly: true, "x-auditable": true }),
)

export const AccessSchemasName = named(
  "access_schemas-name",
  Type.String({ description: "The name of the service token.", "x-auditable": true }),
)

export const AccessServiceTokens = named(
  "access_service-tokens",
  Type.Object({
    client_id: Type.Optional(AccessClientId),
    created_at: Type.Optional(AccessCreatedAt),
    duration: Type.Optional(AccessDuration),
    expires_at: Type.Optional(DlsTimestamp),
    id: Type.Optional(AccessUuid),
    last_seen_at: Type.Optional(DlsTimestamp),
    name: Type.Optional(AccessSchemasName),
    updated_at: Type.Optional(AccessCreatedAt),
  }),
)

export const AccessAccessGroupRule = named(
  "access_access_group_rule",
  Type.Object(
    {
      group: Type.Object({
        id: Type.String({ description: "The ID of a previously created Access group." }),
      }),
    },
    { description: "Matches an Access group." },
  ),
)

export const AccessAnyValidServiceTokenRule = named(
  "access_any_valid_service_token_rule",
  Type.Object(
    {
      any_valid_service_token: Type.Unknown({
        description: "An empty object which matches on all service tokens.",
        "x-stainless-empty-object": true,
      }),
    },
    { description: "Matches any valid Access Service Token" },
  ),
)

export const AccessAuthContextRule = named(
  "access_auth_context_rule",
  Type.Object(
    {
      auth_context: Type.Object({
        ac_id: Type.String({ description: "The ACID of an Authentication context." }),
        id: Type.String({ description: "The ID of an Authentication context." }),
        identity_provider_id: Type.String({ description: "The ID of your Azure identity provider." }),
      }),
    },
    { description: "Matches an Azure Authentication Context.\nRequires an Azure identity provider." },
  ),
)

export const AccessAuthenticationMethodRule = named(
  "access_authentication_method_rule",
  Type.Object(
    {
      auth_method: Type.Object({
        auth_method: Type.String({
          description: "The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.",
        }),
      }),
    },
    { description: "Enforce different MFA options" },
  ),
)

export const AccessAzureGroupRule = named(
  "access_azure_group_rule",
  Type.Object(
    {
      azureAD: Type.Object({
        id: Type.String({ description: "The ID of an Azure group." }),
        identity_provider_id: Type.String({ description: "The ID of your Azure identity provider." }),
      }),
    },
    { description: "Matches an Azure group.\nRequires an Azure identity provider." },
  ),
)

export const AccessCertificateRule = named(
  "access_certificate_rule",
  Type.Object(
    {
      certificate: Type.Unknown({ "x-stainless-empty-object": true }),
    },
    { description: "Matches any valid client certificate." },
  ),
)

export const AccessCommonNameRule = named(
  "access_common_name_rule",
  Type.Object(
    {
      common_name: Type.Object({
        common_name: Type.String({ description: "The common name to match." }),
      }),
    },
    { description: "Matches a specific common name." },
  ),
)

export const AccessCountryRule = named(
  "access_country_rule",
  Type.Object(
    {
      geo: Type.Object({
        country_code: Type.String({ description: "The country code that should be matched." }),
      }),
    },
    { description: "Matches a specific country" },
  ),
)

export const AccessDevicePostureRule = named(
  "access_device_posture_rule",
  Type.Object(
    {
      device_posture: Type.Object({
        integration_uid: Type.String({ description: "The ID of a device posture integration." }),
      }),
    },
    { description: "Enforces a device posture rule has run successfully" },
  ),
)

export const AccessDomainRule = named(
  "access_domain_rule",
  Type.Object(
    {
      email_domain: Type.Object({
        domain: Type.String({ description: "The email domain to match." }),
      }),
    },
    { description: "Match an entire email domain." },
  ),
)

export const AccessEmailListRule = named(
  "access_email_list_rule",
  Type.Object(
    {
      email_list: Type.Object({
        id: Type.String({ description: "The ID of a previously created email list." }),
      }),
    },
    { description: "Matches an email address from a list." },
  ),
)

export const AccessEmailRule = named(
  "access_email_rule",
  Type.Object(
    {
      email: Type.Object({
        email: Type.String({ description: "The email of the user.", format: "email" }),
      }),
    },
    { description: "Matches a specific email." },
  ),
)

export const AccessEveryoneRule = named(
  "access_everyone_rule",
  Type.Object(
    {
      everyone: Type.Unknown({
        description: "An empty object which matches on all users.",
        "x-stainless-empty-object": true,
      }),
    },
    { description: "Matches everyone." },
  ),
)

export const AccessExternalEvaluationRule = named(
  "access_external_evaluation_rule",
  Type.Object(
    {
      external_evaluation: Type.Object({
        evaluate_url: Type.String({ description: "The API endpoint containing your business logic." }),
        keys_url: Type.String({
          description:
            "The API endpoint containing the key that Access uses to verify that the response came from your API.",
        }),
      }),
    },
    { description: "Create Allow or Block policies which evaluate the user based on custom criteria." },
  ),
)

export const AccessGithubOrganizationRule = named(
  "access_github_organization_rule",
  Type.Object(
    {
      "github-organization": Type.Object({
        identity_provider_id: Type.String({ description: "The ID of your Github identity provider." }),
        name: Type.String({ description: "The name of the organization." }),
        team: Type.Optional(Type.String({ description: "The name of the team" })),
      }),
    },
    { description: "Matches a Github organization.\nRequires a Github identity provider." },
  ),
)

export const AccessGsuiteGroupRule = named(
  "access_gsuite_group_rule",
  Type.Object(
    {
      gsuite: Type.Object({
        email: Type.String({ description: "The email of the Google Workspace group." }),
        identity_provider_id: Type.String({ description: "The ID of your Google Workspace identity provider." }),
      }),
    },
    { description: "Matches a group in Google Workspace.\nRequires a Google Workspace identity provider." },
  ),
)

export const AccessLoginMethodRule = named(
  "access_login_method_rule",
  Type.Object(
    {
      login_method: Type.Object({
        id: Type.String({ description: "The ID of an identity provider." }),
      }),
    },
    { description: "Matches a specific identity provider id." },
  ),
)

export const AccessIpListRule = named(
  "access_ip_list_rule",
  Type.Object(
    {
      ip_list: Type.Object({
        id: Type.String({ description: "The ID of a previously created IP list." }),
      }),
    },
    { description: "Matches an IP address from a list." },
  ),
)

export const AccessIpRule = named(
  "access_ip_rule",
  Type.Object(
    {
      ip: Type.Object({
        ip: Type.String({ description: "An IPv4 or IPv6 CIDR block." }),
      }),
    },
    { description: "Matches an IP address block." },
  ),
)

export const AccessOktaGroupRule = named(
  "access_okta_group_rule",
  Type.Object(
    {
      okta: Type.Object({
        identity_provider_id: Type.String({ description: "The ID of your Okta identity provider." }),
        name: Type.String({ description: "The name of the Okta group." }),
      }),
    },
    { description: "Matches an Okta group.\nRequires an Okta identity provider." },
  ),
)

export const AccessSamlGroupRule = named(
  "access_saml_group_rule",
  Type.Object(
    {
      saml: Type.Object({
        attribute_name: Type.String({ description: "The name of the SAML attribute." }),
        attribute_value: Type.String({ description: "The SAML attribute value to look for." }),
        identity_provider_id: Type.String({ description: "The ID of your SAML identity provider." }),
      }),
    },
    { description: "Matches a SAML group.\nRequires a SAML identity provider." },
  ),
)

export const AccessOidcClaimRule = named(
  "access_oidc_claim_rule",
  Type.Object(
    {
      oidc: Type.Object({
        claim_name: Type.String({ description: "The name of the OIDC claim." }),
        claim_value: Type.String({ description: "The OIDC claim value to look for." }),
        identity_provider_id: Type.String({ description: "The ID of your OIDC identity provider." }),
      }),
    },
    { description: "Matches an OIDC claim.\nRequires an OIDC identity provider." },
  ),
)

export const AccessServiceTokenRule = named(
  "access_service_token_rule",
  Type.Object(
    {
      service_token: Type.Object({
        token_id: Type.String({ description: "The ID of a Service Token." }),
      }),
    },
    { description: "Matches a specific Access Service Token" },
  ),
)

export const AccessLinkedAppTokenRule = named(
  "access_linked_app_token_rule",
  Type.Object(
    {
      linked_app_token: Type.Object({
        app_uid: Type.String({ description: "The ID of an Access OIDC SaaS application" }),
      }),
    },
    {
      description:
        "Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.",
    },
  ),
)

export const AccessRule = named(
  "access_rule",
  Type.Union([
    AccessAccessGroupRule,
    AccessAnyValidServiceTokenRule,
    AccessAuthContextRule,
    AccessAuthenticationMethodRule,
    AccessAzureGroupRule,
    AccessCertificateRule,
    AccessCommonNameRule,
    AccessCountryRule,
    AccessDevicePostureRule,
    AccessDomainRule,
    AccessEmailListRule,
    AccessEmailRule,
    AccessEveryoneRule,
    AccessExternalEvaluationRule,
    AccessGithubOrganizationRule,
    AccessGsuiteGroupRule,
    AccessLoginMethodRule,
    AccessIpListRule,
    AccessIpRule,
    AccessOktaGroupRule,
    AccessSamlGroupRule,
    AccessOidcClaimRule,
    AccessServiceTokenRule,
    AccessLinkedAppTokenRule,
  ]),
)

export const UnnamedSchemaRef6a02fe18089d53b52b2cd3949b717919 = named(
  "unnamed_schema_ref_6a02fe18089d53b52b2cd3949b717919",
  Type.Object({
    country: Type.Optional(Type.String()),
  }),
)

export const AccessDecision = named(
  "access_decision",
  Type.Union([Type.Literal("allow"), Type.Literal("deny"), Type.Literal("non_identity"), Type.Literal("bypass")], {
    description:
      "The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.",
  }),
)

export const AccessSchemasExclude = named(
  "access_schemas-exclude",
  Type.Array(AccessRule, {
    description:
      "Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.",
    "x-stainless-collection-type": "set",
  }),
)

export const AccessSchemasUuid = named(
  "access_schemas-uuid",
  Type.String({ description: "The UUID of the policy", maxLength: 36 }),
)

export const AccessSchemasInclude = named(
  "access_schemas-include",
  Type.Array(AccessRule, {
    description: "Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.",
    "x-stainless-collection-type": "set",
  }),
)

export const AccessPolicyComponentsSchemasName = named(
  "access_policy_components-schemas-name",
  Type.String({ description: "The name of the Access policy." }),
)

export const AccessSchemasRequire = named(
  "access_schemas-require",
  Type.Array(AccessRule, {
    description:
      "Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.",
    "x-stainless-collection-type": "set",
  }),
)

export const AccessBasePolicyResp = named(
  "access_base_policy_resp",
  Type.Object({
    created_at: Type.Optional(DlsTimestamp),
    decision: Type.Optional(AccessDecision),
    exclude: Type.Optional(AccessSchemasExclude),
    id: Type.Optional(AccessSchemasUuid),
    include: Type.Optional(AccessSchemasInclude),
    name: Type.Optional(AccessPolicyComponentsSchemasName),
    require: Type.Optional(AccessSchemasRequire),
    updated_at: Type.Optional(DlsTimestamp),
  }),
)

export const AccessApprovalGroup = named(
  "access_approval_group",
  Type.Object(
    {
      approvals_needed: Type.Number({ description: "The number of approvals needed to obtain access.", minimum: 0 }),
      email_addresses: Type.Optional(
        Type.Array(Type.String(), { description: "A list of emails that can approve the access request." }),
      ),
      email_list_uuid: Type.Optional(Type.String({ description: "The UUID of an re-usable email list." })),
    },
    { description: "A group of email addresses that can approve a temporary authentication request." },
  ),
)

export const AccessApprovalGroups = named(
  "access_approval_groups",
  Type.Array(AccessApprovalGroup, {
    description: "Administrators who can approve a temporary authentication request.",
    "x-stainless-collection-type": "set",
  }),
)

export const AccessApprovalRequired = named(
  "access_approval_required",
  Type.Boolean({
    description: "Requires the user to request access from an administrator at the start of each session.",
  }),
)

export const AccessIsolationRequired = named(
  "access_isolation_required",
  Type.Boolean({
    description:
      "Require this application to be served in an isolated browser for users matching this policy. 'Client Web Isolation' must be on for the account in order to use this feature.",
  }),
)

export const AccessPurposeJustificationPrompt = named(
  "access_purpose_justification_prompt",
  Type.String({ description: "A custom message that will appear on the purpose justification screen." }),
)

export const AccessPurposeJustificationRequired = named(
  "access_purpose_justification_required",
  Type.Boolean({ description: "Require users to enter a justification when they log in to the application." }),
)

export const AccessComponentsSchemasSessionDuration = named(
  "access_components-schemas-session_duration",
  Type.String({
    description:
      "The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.",
    default: "24h",
  }),
)

export const AccessPrecedence = named(
  "access_precedence",
  Type.Integer({
    description: "The order of execution for this policy. Must be unique for each policy within an app.\n",
  }),
)

export const AccessAppPolicyResponse = named("access_app_policy_response", Type.Intersect([AccessBasePolicyResp]))

export const AccessBasePolicyReq = named(
  "access_base_policy_req",
  Type.Object({
    decision: AccessDecision,
    exclude: Type.Optional(AccessSchemasExclude),
    include: AccessSchemasInclude,
    name: AccessPolicyComponentsSchemasName,
    require: Type.Optional(AccessSchemasRequire),
  }),
)

export const Web3Timestamp = named("web3_timestamp", Type.String({ format: "date-time", readOnly: true }))

export const D1Messages = named("d1_messages", Type.Array(ResponseInfo))

export const BillSubsApiCurrency = named(
  "bill-subs-api_currency",
  Type.String({
    description: "The monetary unit in which pricing information is displayed.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const BillSubsApiCurrentPeriodEnd = named(
  "bill-subs-api_current_period_end",
  Type.String({
    description: "The end of the current period and also when the next billing is due.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const BillSubsApiCurrentPeriodStart = named(
  "bill-subs-api_current_period_start",
  Type.String({
    description: "When the current billing period started. May match initial_period_start if this is the first period.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const BillSubsApiFrequency = named(
  "bill-subs-api_frequency",
  Type.Union([Type.Literal("weekly"), Type.Literal("monthly"), Type.Literal("quarterly"), Type.Literal("yearly")], {
    description: "How often the subscription is renewed automatically.",
    "x-auditable": true,
  }),
)

export const BillSubsApiSchemasIdentifier = named(
  "bill-subs-api_schemas-identifier",
  Type.String({ description: "Subscription identifier tag.", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const BillSubsApiPrice = named(
  "bill-subs-api_price",
  Type.Number({
    description: "The price of the subscription that will be billed, in US dollars.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const BillSubsApiRatePlan = named(
  "bill-subs-api_rate_plan",
  Type.Object(
    {
      currency: Type.Optional(
        Type.String({ description: "The currency applied to the rate plan subscription.", "x-auditable": true }),
      ),
      externally_managed: Type.Optional(
        Type.Boolean({
          description: "Whether this rate plan is managed externally from Cloudflare.",
          "x-auditable": true,
        }),
      ),
      id: Type.Optional(
        Type.Union(
          [
            Type.Literal("free"),
            Type.Literal("lite"),
            Type.Literal("pro"),
            Type.Literal("pro_plus"),
            Type.Literal("business"),
            Type.Literal("enterprise"),
            Type.Literal("partners_free"),
            Type.Literal("partners_pro"),
            Type.Literal("partners_business"),
            Type.Literal("partners_enterprise"),
          ],
          { description: "The ID of the rate plan.", "x-auditable": true },
        ),
      ),
      is_contract: Type.Optional(
        Type.Boolean({
          description: "Whether a rate plan is enterprise-based (or newly adopted term contract).",
          "x-auditable": true,
        }),
      ),
      public_name: Type.Optional(Type.String({ description: "The full name of the rate plan.", "x-auditable": true })),
      scope: Type.Optional(
        Type.String({ description: "The scope that this rate plan applies to.", "x-auditable": true }),
      ),
      sets: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "The list of sets this rate plan applies to.",
        }),
      ),
    },
    { description: "The rate plan applied to the subscription." },
  ),
)

export const BillSubsApiState = named(
  "bill-subs-api_state",
  Type.Union(
    [
      Type.Literal("Trial"),
      Type.Literal("Provisioned"),
      Type.Literal("Paid"),
      Type.Literal("AwaitingPayment"),
      Type.Literal("Cancelled"),
      Type.Literal("Failed"),
      Type.Literal("Expired"),
    ],
    { description: "The state that the subscription is in.", "x-auditable": true },
  ),
)

export const BillSubsApiSubscriptionV2 = named(
  "bill-subs-api_subscription-v2",
  Type.Object({
    currency: Type.Optional(BillSubsApiCurrency),
    current_period_end: Type.Optional(BillSubsApiCurrentPeriodEnd),
    current_period_start: Type.Optional(BillSubsApiCurrentPeriodStart),
    frequency: Type.Optional(BillSubsApiFrequency),
    id: Type.Optional(BillSubsApiSchemasIdentifier),
    price: Type.Optional(BillSubsApiPrice),
    rate_plan: Type.Optional(BillSubsApiRatePlan),
    state: Type.Optional(BillSubsApiState),
  }),
)

export const BillSubsApiSubscription = named("bill-subs-api_subscription", BillSubsApiSubscriptionV2)

export const BillSubsApiZoneSubscriptionResponseSingle = named(
  "bill-subs-api_zone_subscription_response_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: BillSubsApiSubscription,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const TlsCertificatesAndHostnamesValidationRecord = named(
  "tls-certificates-and-hostnames_validation_record",
  Type.Object(
    {
      emails: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description:
            "The set of email addresses that the certificate authority (CA) will use to complete domain validation.",
        }),
      ),
      http_body: Type.Optional(
        Type.String({
          description:
            "The content that the certificate authority (CA) will expect to find at the http_url during the domain validation.",
        }),
      ),
      http_url: Type.Optional(Type.String({ description: "The url that will be checked during domain validation." })),
      txt_name: Type.Optional(
        Type.String({
          description:
            "The hostname that the certificate authority (CA) will check for a TXT record during domain validation .",
          "x-auditable": true,
        }),
      ),
      txt_value: Type.Optional(
        Type.String({
          description: "The TXT record that the certificate authority (CA) will check during domain validation.",
        }),
      ),
    },
    { description: "Certificate's required validation record." },
  ),
)

export const SmartshieldType = named(
  "smartshield_type",
  Type.String({
    description:
      "The protocol to use for the health check. Currently supported protocols are 'HTTP', 'HTTPS' and 'TCP'.",
    default: "HTTP",
    "x-auditable": true,
  }),
)

export const SmartshieldTimeout = named(
  "smartshield_timeout",
  Type.Integer({
    description: "The timeout (in seconds) before marking the health check as failed.",
    default: 5,
    "x-auditable": true,
  }),
)

export const SmartshieldTcpConfig = named(
  "smartshield_tcp_config",
  Type.Union([
    Type.Object(
      {
        method: Type.Optional(
          Type.Union([Type.Literal("connection_established")], {
            description: "The TCP connection method to use for the health check.",
            "x-auditable": true,
          }),
        ),
        port: Type.Optional(
          Type.Integer({
            description: "Port number to connect to for the health check. Defaults to 80.",
            default: 80,
            "x-auditable": true,
          }),
        ),
      },
      { description: "Parameters specific to TCP health check." },
    ),
    Type.Null(),
  ]),
)

export const SmartshieldSuspended = named(
  "smartshield_suspended",
  Type.Boolean({
    description: "If suspended, no health checks are sent to the origin.",
    default: false,
    "x-auditable": true,
  }),
)

export const SmartshieldStatus = named(
  "smartshield_status",
  Type.Union([Type.Literal("unknown"), Type.Literal("healthy"), Type.Literal("unhealthy"), Type.Literal("suspended")], {
    description: "The current status of the origin server according to the health check.",
    "x-auditable": true,
  }),
)

export const SmartshieldRetries = named(
  "smartshield_retries",
  Type.Integer({
    description:
      "The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.",
    default: 2,
    "x-auditable": true,
  }),
)

export const SmartshieldName = named(
  "smartshield_name",
  Type.String({
    description:
      "A short name to identify the health check. Only alphanumeric characters, hyphens and underscores are allowed.",
    "x-auditable": true,
  }),
)

export const SmartshieldInterval = named(
  "smartshield_interval",
  Type.Integer({
    description:
      "The interval between each health check. Shorter intervals may give quicker notifications if the origin status changes, but will increase load on the origin as we check from multiple locations.",
    default: 60,
    "x-auditable": true,
  }),
)

export const SmartshieldHttpConfig = named(
  "smartshield_http_config",
  Type.Object(
    {
      allow_insecure: Type.Optional(
        Type.Boolean({
          description: "Do not validate the certificate when the health check uses HTTPS.",
          default: false,
          "x-auditable": true,
        }),
      ),
      expected_body: Type.Optional(
        Type.String({
          description:
            "A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy.",
          "x-auditable": true,
        }),
      ),
      expected_codes: Type.Optional(
        Type.Union([
          Type.Array(Type.String(), {
            description:
              'The expected HTTP response codes (e.g. "200") or code ranges (e.g. "2xx" for all codes starting with 2) of the health check.',
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      follow_redirects: Type.Optional(
        Type.Boolean({
          description: "Follow redirects if the origin returns a 3xx status code.",
          default: false,
          "x-auditable": true,
        }),
      ),
      header: Type.Optional(
        Type.Union([Type.Record(Type.String(), Type.Array(Type.String({ "x-auditable": true }))), Type.Null()]),
      ),
      method: Type.Optional(
        Type.Union([Type.Literal("GET"), Type.Literal("HEAD")], {
          description: "The HTTP method to use for the health check.",
          "x-auditable": true,
        }),
      ),
      path: Type.Optional(
        Type.String({ description: "The endpoint path to health check against.", default: "/", "x-auditable": true }),
      ),
      port: Type.Optional(
        Type.Integer({
          description:
            "Port number to connect to for the health check. Defaults to 80 if type is HTTP or 443 if type is HTTPS.",
          default: 80,
          "x-auditable": true,
        }),
      ),
    },
    { description: "Parameters specific to an HTTP or HTTPS health check." },
  ),
)

export const SmartshieldFailureReason = named(
  "smartshield_failure_reason",
  Type.String({
    description: "The current failure reason if status is unhealthy.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const SmartshieldDescription = named(
  "smartshield_description",
  Type.String({ description: "A human-readable description of the health check.", "x-auditable": true }),
)

export const SmartshieldConsecutiveSuccesses = named(
  "smartshield_consecutive_successes",
  Type.Integer({
    description:
      "The number of consecutive successes required from a health check before changing the health to healthy.",
    default: 1,
    "x-auditable": true,
  }),
)

export const SmartshieldConsecutiveFails = named(
  "smartshield_consecutive_fails",
  Type.Integer({
    description:
      "The number of consecutive fails required from a health check before changing the health to unhealthy.",
    default: 1,
    "x-auditable": true,
  }),
)

export const SmartshieldCheckRegions = named(
  "smartshield_check_regions",
  Type.Union([
    Type.Array(
      Type.Union(
        [
          Type.Literal("WNAM"),
          Type.Literal("ENAM"),
          Type.Literal("WEU"),
          Type.Literal("EEU"),
          Type.Literal("NSAM"),
          Type.Literal("SSAM"),
          Type.Literal("OC"),
          Type.Literal("ME"),
          Type.Literal("NAF"),
          Type.Literal("SAF"),
          Type.Literal("IN"),
          Type.Literal("SEAS"),
          Type.Literal("NEAS"),
          Type.Literal("ALL_REGIONS"),
        ],
        {
          description:
            "WNAM: Western North America, ENAM: Eastern North America, WEU: Western Europe, EEU: Eastern Europe, NSAM: Northern South America, SSAM: Southern South America, OC: Oceania, ME: Middle East, NAF: North Africa, SAF: South Africa, IN: India, SEAS: South East Asia, NEAS: North East Asia, ALL_REGIONS: all regions (BUSINESS and ENTERPRISE customers only).",
        },
      ),
      {
        description:
          "A list of regions from which to run health checks. Null means Cloudflare will pick a default region.",
        "x-auditable": true,
      },
    ),
    Type.Null(),
  ]),
)

export const SmartshieldAddress = named(
  "smartshield_address",
  Type.String({
    description: "The hostname or IP address of the origin server to run health checks on.",
    "x-auditable": true,
  }),
)

export const CacheIdentifier = named("cache_identifier", Type.String({ maxLength: 32 }))

export const CacheResult = named(
  "cache_result",
  Type.Object({
    editable: Type.Boolean({ description: "Whether this setting can be updated or not.", readOnly: true }),
    id: Type.String({ readOnly: true }),
    modified_on: Type.String({
      description: "Last time this setting was modified.",
      format: "date-time",
      readOnly: true,
    }),
    next_scheduled_scan: Type.Optional(
      Type.Union([
        Type.String({
          description: "Next time this zone will be scanned by the Automatic SSL/TLS.",
          format: "date-time",
          readOnly: true,
        }),
        Type.Null(),
      ]),
    ),
    value: Type.Union([Type.Literal("auto"), Type.Literal("custom")], {
      description: "Current setting of the automatic SSL/TLS.",
    }),
  }),
)

export const CacheApiResponseCommonFailure = named(
  "cache_api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: CacheResult,
    success: Type.Boolean({ description: "Indicates the API call's success or failure." }),
  }),
)

export const CacheApiResponseSingleId = named(
  "cache_api-response-single-id",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: CacheResult,
    success: Type.Boolean({ description: "Indicates the API call's success or failure." }),
  }),
)

export const CacheRulesModifiedOn = named(
  "cache-rules_modified_on",
  Type.String({
    description: "The time when the setting was last modified.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const CacheRulesEditable = named(
  "cache-rules_editable",
  Type.Boolean({ description: "Whether the setting is editable.", "x-auditable": true }),
)

export const DosUuid = named("dos_uuid", Type.String({ description: "UUID.", maxLength: 36, "x-auditable": true }))

export const ApiShieldSchemasUuid = named("api-shield_schemas-uuid", DosUuid)

export const ApiShieldSchemasTimestamp = named("api-shield_schemas-timestamp", DlsTimestamp)

export const FirewallDescription = named(
  "firewall_description",
  Type.String({
    description: "An informative summary of the rule. This value is sanitized and any tags will be removed.",
    maxLength: 1024,
    "x-auditable": true,
  }),
)

export const FirewallMode = named(
  "firewall_mode",
  Type.Union(
    [
      Type.Literal("simulate"),
      Type.Literal("ban"),
      Type.Literal("challenge"),
      Type.Literal("js_challenge"),
      Type.Literal("managed_challenge"),
    ],
    { description: "The action to perform.", "x-auditable": true },
  ),
)

export const FirewallBody = named(
  "firewall_body",
  Type.String({
    description: "The response body to return. The value must conform to the configured content type.",
    maxLength: 10240,
  }),
)

export const FirewallContentType = named(
  "firewall_content_type",
  Type.String({
    description:
      "The content type of the body. Must be one of the following: `text/plain`, `text/xml`, or `application/json`.",
    maxLength: 50,
    "x-auditable": true,
  }),
)

export const FirewallCustomResponse = named(
  "firewall_custom_response",
  Type.Object(
    {
      body: Type.Optional(FirewallBody),
      content_type: Type.Optional(FirewallContentType),
    },
    {
      description:
        'A custom content type and reponse to return when the threshold is exceeded. The custom response configured in this object will override the custom error for the zone. This object is optional.\nNotes: If you omit this object, Cloudflare will use the default HTML error page. If "mode" is "challenge", "managed_challenge", or "js_challenge", Cloudflare will use the zone challenge pages and you should not provide the "response" object.',
    },
  ),
)

export const FirewallTimeout = named(
  "firewall_timeout",
  Type.Number({
    description:
      'The time in seconds during which Cloudflare will perform the mitigation action. Must be an integer value greater than or equal to the period.\nNotes: If "mode" is "challenge", "managed_challenge", or "js_challenge", Cloudflare will use the zone\'s Challenge Passage time and you should not provide this value.',
    minimum: 1,
    maximum: 86400,
    "x-auditable": true,
  }),
)

export const FirewallAction = named(
  "firewall_action",
  Type.Object(
    {
      mode: Type.Optional(FirewallMode),
      response: Type.Optional(FirewallCustomResponse),
      timeout: Type.Optional(FirewallTimeout),
    },
    {
      description:
        "The action to perform when the threshold of matched traffic within the configured period is exceeded.",
    },
  ),
)

export const PageShieldId = named(
  "page-shield_id",
  Type.String({ description: "Identifier", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesSignature = named(
  "tls-certificates-and-hostnames_signature",
  Type.String({ description: "The type of hash used for the certificate.", readOnly: true, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesIssuer = named(
  "tls-certificates-and-hostnames_issuer",
  Type.String({
    description: "The certificate authority that issued the certificate.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesPrivateKey = named(
  "tls-certificates-and-hostnames_private_key",
  Type.String({ description: "The zone's private key.", "x-sensitive": true }),
)

export const RulesetsZoneid = named(
  "rulesets_ZoneId",
  Type.String({ description: "The unique ID of the zone.", title: "Zone ID" }),
)

export const RulesetsMessage = named(
  "rulesets_Message",
  Type.Object(
    {
      code: Type.Optional(Type.Integer({ description: "A unique code for this message.", title: "Code" })),
      message: Type.String({ description: "A text description of this message.", minLength: 1, title: "Description" }),
      source: Type.Optional(
        Type.Object(
          {
            pointer: Type.String({
              description: "A JSON pointer to the field that is the source of the message.",
              minLength: 1,
              title: "Pointer",
            }),
          },
          { description: "The source of this message." },
        ),
      ),
    },
    { description: "A message." },
  ),
)

export const RulesetsErrors = named(
  "rulesets_Errors",
  Type.Array(RulesetsMessage, { description: "A list of error messages.", uniqueItems: true, title: "Errors" }),
)

export const RulesetsMessages = named(
  "rulesets_Messages",
  Type.Array(RulesetsMessage, { description: "A list of warning messages.", uniqueItems: true, title: "Messages" }),
)

export const LoadBalancingNetworks = named(
  "load-balancing_networks",
  Type.Array(Type.String({ "x-auditable": true, "x-stainless-terraform-configurability": "computed_optional" }), {
    description: "List of networks where Load Balancer or Pool is enabled.",
  }),
)

export const LoadBalancingTimestamp = named(
  "load-balancing_timestamp",
  Type.String({ readOnly: true, "x-auditable": true }),
)

export const LoadBalancingResultInfo = named(
  "load-balancing_result_info",
  Type.Object({
    count: Type.Optional(Type.Number({ description: "Total number of results on the current page." })),
    page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
    per_page: Type.Optional(Type.Number({ description: "Number of results per page." })),
    total_count: Type.Optional(Type.Number({ description: "Total results available without any search parameters." })),
    total_pages: Type.Optional(Type.Number({ description: "Total number of pages available." })),
  }),
)

export const WafProductApiBundleIdentifier = named(
  "waf-product-api-bundle_identifier",
  Type.String({ description: "Defines an identifier.", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const DlpMessages = named(
  "dlp_messages",
  Type.Array(
    Type.Object({
      code: Type.Integer({ minimum: 1000 }),
      documentation_url: Type.Optional(Type.String()),
      message: Type.String(),
      source: Type.Optional(
        Type.Object({
          pointer: Type.Optional(Type.String()),
        }),
      ),
    }),
  ),
)

export const DlsIdentifier = named(
  "dls_identifier",
  Type.String({ description: "Identifier.", maxLength: 32, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesKeylessResponseSingleId = named(
  "tls-certificates-and-hostnames_keyless_response_single_id",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        id: Type.Optional(DlsIdentifier),
      }),
    ),
  }),
)

export const TlsCertificatesAndHostnamesKeylessPrivateIp = named(
  "tls-certificates-and-hostnames_keyless_private_ip",
  Type.String({ description: "Private IP of the Key Server Host", "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesKeylessVnetId = named(
  "tls-certificates-and-hostnames_keyless_vnet_id",
  Type.String({ description: "Cloudflare Tunnel Virtual Network ID", "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesKeylessTunnel = named(
  "tls-certificates-and-hostnames_keyless_tunnel",
  Type.Object(
    {
      private_ip: TlsCertificatesAndHostnamesKeylessPrivateIp,
      vnet_id: TlsCertificatesAndHostnamesKeylessVnetId,
    },
    { description: "Configuration for using Keyless SSL through a Cloudflare Tunnel" },
  ),
)

export const TlsCertificatesAndHostnamesSchemasStatus = named(
  "tls-certificates-and-hostnames_schemas-status",
  Type.Union([Type.Literal("active"), Type.Literal("deleted")], {
    description: "Status of the Keyless SSL.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesPort = named(
  "tls-certificates-and-hostnames_port",
  Type.Number({
    description: "The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server.",
    default: 24008,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesName = named(
  "tls-certificates-and-hostnames_name",
  Type.String({ description: "The keyless SSL name.", maxLength: 180, readOnly: true, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesSchemasIdentifier = named(
  "tls-certificates-and-hostnames_schemas-identifier",
  Type.String({
    description: "Keyless certificate identifier tag.",
    maxLength: 32,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesHost = named(
  "tls-certificates-and-hostnames_host",
  Type.String({ description: "The keyless SSL name.", format: "hostname", maxLength: 253, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesEnabled = named(
  "tls-certificates-and-hostnames_enabled",
  Type.Boolean({ description: "Whether or not the Keyless SSL is on or off.", readOnly: true, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesBase = named(
  "tls-certificates-and-hostnames_base",
  Type.Object({
    created_on: Type.String({
      description: "When the Keyless SSL was created.",
      format: "date-time",
      readOnly: true,
      "x-auditable": true,
    }),
    enabled: TlsCertificatesAndHostnamesEnabled,
    host: TlsCertificatesAndHostnamesHost,
    id: TlsCertificatesAndHostnamesSchemasIdentifier,
    modified_on: Type.String({
      description: "When the Keyless SSL was last modified.",
      format: "date-time",
      readOnly: true,
      "x-auditable": true,
    }),
    name: TlsCertificatesAndHostnamesName,
    permissions: Type.Array(Type.String({ "x-auditable": true }), {
      description: "Available permissions for the Keyless SSL for the current user requesting the item.",
      readOnly: true,
    }),
    port: TlsCertificatesAndHostnamesPort,
    status: TlsCertificatesAndHostnamesSchemasStatus,
    tunnel: Type.Optional(TlsCertificatesAndHostnamesKeylessTunnel),
  }),
)

export const TlsCertificatesAndHostnamesKeylessCertificate = named(
  "tls-certificates-and-hostnames_keyless-certificate",
  TlsCertificatesAndHostnamesBase,
)

export const ZonesSchemasApiResponseCommonFailure = named(
  "zones_schemas-api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const FirewallFiltersComponentsSchemasId = named(
  "firewall_filters_components-schemas-id",
  Type.String({ description: "The unique identifier of the filter.", minLength: 32, maxLength: 32, readOnly: true }),
)

export const FirewallFiltersComponentsSchemasDescription = named(
  "firewall_filters_components-schemas-description",
  Type.String({ description: "An informative summary of the filter.", maxLength: 500 }),
)

export const FirewallExpression = named(
  "firewall_expression",
  Type.String({
    description:
      "The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/).",
  }),
)

export const FirewallFiltersComponentsSchemasPaused = named(
  "firewall_filters_components-schemas-paused",
  Type.Boolean({ description: "When true, indicates that the filter is currently paused." }),
)

export const FirewallSchemasRef = named(
  "firewall_schemas-ref",
  Type.String({ description: "A short reference tag. Allows you to select related filters.", maxLength: 50 }),
)

export const FirewallFilter = named(
  "firewall_filter",
  Type.Object({
    description: Type.Optional(FirewallFiltersComponentsSchemasDescription),
    expression: Type.Optional(FirewallExpression),
    id: Type.Optional(FirewallFiltersComponentsSchemasId),
    paused: Type.Optional(FirewallFiltersComponentsSchemasPaused),
    ref: Type.Optional(FirewallSchemasRef),
  }),
)

export const DnsRecordsPage = named(
  "dns-records_page",
  Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 }),
)

export const UnnamedSchemaRef16aca57bde2963201c7e6e895436c1c1 = named(
  "unnamed_schema_ref_16aca57bde2963201c7e6e895436c1c1",
  Type.Union([Type.Literal("ubiquitous"), Type.Literal("optimal"), Type.Literal("force")], {
    description:
      "A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.",
    "x-auditable": true,
  }),
)

export const Identifier = named("identifier", Type.Union([Type.Null()]))

export const TlsCertificatesAndHostnamesModifiedOn = named(
  "tls-certificates-and-hostnames_modified_on",
  Type.String({
    description: "When the certificate was last modified.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesUploadedOn = named(
  "tls-certificates-and-hostnames_uploaded_on",
  Type.String({
    description: "When the certificate was uploaded to Cloudflare.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesBundleMethod = named(
  "tls-certificates-and-hostnames_bundle_method",
  UnnamedSchemaRef16aca57bde2963201c7e6e895436c1c1,
)

export const TlsCertificatesAndHostnamesCertificate = named(
  "tls-certificates-and-hostnames_certificate",
  Type.String({ description: "The zone's SSL certificate or certificate and the intermediate(s)." }),
)

export const TlsCertificatesAndHostnamesApiResponseCommonFailure = named(
  "tls-certificates-and-hostnames_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const CacheRulesCacheReserveClearState = named(
  "cache-rules_cache_reserve_clear_state",
  Type.Union([Type.Literal("In-progress"), Type.Literal("Completed")], {
    description: "The current state of the Cache Reserve Clear operation.",
    "x-auditable": true,
  }),
)

export const CacheRulesCacheReserveClearStartTs = named(
  "cache-rules_cache_reserve_clear_start_ts",
  Type.String({
    description: "The time that the latest Cache Reserve Clear operation started.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const CacheRulesCacheReserveClearEndTs = named(
  "cache-rules_cache_reserve_clear_end_ts",
  Type.String({
    description: "The time that the latest Cache Reserve Clear operation completed.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const UnnamedSchemaRef2b5e755404a4bfd7892291ce97c4968d = named(
  "unnamed_schema_ref_2b5e755404a4bfd7892291ce97c4968d",
  Type.Union([Type.Literal("cache_reserve_clear")], { description: "ID of the zone setting.", "x-auditable": true }),
)

export const BillSubsApiSchemasName = named(
  "bill-subs-api_schemas-name",
  Type.String({ description: "The plan name.", maxLength: 80, readOnly: true, "x-auditable": true }),
)

export const BillSubsApiSchemasFrequency = named(
  "bill-subs-api_schemas-frequency",
  Type.Union([Type.Literal("weekly"), Type.Literal("monthly"), Type.Literal("quarterly"), Type.Literal("yearly")], {
    description: "The frequency at which you will be billed for this plan.",
    "x-auditable": true,
  }),
)

export const CacheRulesApiResponseCommonFailure = named(
  "cache-rules_api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const ApiShieldEndpoint = named(
  "api-shield_endpoint",
  Type.String({
    description:
      "The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.",
    format: "uri-template",
    maxLength: 4096,
    "x-auditable": true,
  }),
)

export const ApiShieldHost = named(
  "api-shield_host",
  Type.String({ description: "RFC3986-compliant host.", format: "hostname", maxLength: 255, "x-auditable": true }),
)

export const ApiShieldMethod = named(
  "api-shield_method",
  Type.Union(
    [
      Type.Literal("GET"),
      Type.Literal("POST"),
      Type.Literal("HEAD"),
      Type.Literal("OPTIONS"),
      Type.Literal("PUT"),
      Type.Literal("DELETE"),
      Type.Literal("CONNECT"),
      Type.Literal("PATCH"),
      Type.Literal("TRACE"),
    ],
    { description: "The HTTP method used to access the endpoint.", "x-auditable": true },
  ),
)

export const ApiShieldAuthIdTokens = named(
  "api-shield_auth_id_tokens",
  Type.Integer({
    description: "The total number of auth-ids seen across this calculation.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ApiShieldDataPoints = named(
  "api-shield_data_points",
  Type.Integer({
    description: "The number of data points used for the threshold suggestion calculation.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ApiShieldP50 = named(
  "api-shield_p50",
  Type.Integer({
    description: "The p50 quantile of requests (in period_seconds).",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ApiShieldP90 = named(
  "api-shield_p90",
  Type.Integer({
    description: "The p90 quantile of requests (in period_seconds).",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ApiShieldP99 = named(
  "api-shield_p99",
  Type.Integer({
    description: "The p99 quantile of requests (in period_seconds).",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ApiShieldPeriodSeconds = named(
  "api-shield_period_seconds",
  Type.Integer({
    description: "The period over which this threshold is suggested.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ApiShieldRequests = named(
  "api-shield_requests",
  Type.Integer({
    description: "The estimated number of requests covered by these calculations.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ApiShieldSuggestedThreshold = named(
  "api-shield_suggested_threshold",
  Type.Integer({
    description: "The suggested threshold in requests done by the same auth_id or period_seconds.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ApiShieldOperationFeatureThresholds = named(
  "api-shield_operation_feature_thresholds",
  Type.Object({
    thresholds: Type.Optional(
      Type.Object({
        auth_id_tokens: Type.Optional(ApiShieldAuthIdTokens),
        data_points: Type.Optional(ApiShieldDataPoints),
        last_updated: Type.Optional(DlsTimestamp),
        p50: Type.Optional(ApiShieldP50),
        p90: Type.Optional(ApiShieldP90),
        p99: Type.Optional(ApiShieldP99),
        period_seconds: Type.Optional(ApiShieldPeriodSeconds),
        requests: Type.Optional(ApiShieldRequests),
        suggested_threshold: Type.Optional(ApiShieldSuggestedThreshold),
      }),
    ),
  }),
)

export const ApiShieldParameterSchemasDefinition = named(
  "api-shield_parameter_schemas_definition",
  Type.Object(
    {
      parameters: Type.Optional(
        Type.Array(Type.Unknown(), {
          description: "An array containing the learned parameter schemas.",
          readOnly: true,
        }),
      ),
      responses: Type.Optional(
        Type.Union([
          Type.Unknown({
            description: "An empty response object. This field is required to yield a valid operation schema.",
          }),
          Type.Null(),
        ]),
      ),
    },
    { description: "An operation schema object containing a response." },
  ),
)

export const ApiShieldOperationFeatureParameterSchemas = named(
  "api-shield_operation_feature_parameter_schemas",
  Type.Object({
    parameter_schemas: Type.Object({
      last_updated: Type.Optional(DlsTimestamp),
      parameter_schemas: Type.Optional(ApiShieldParameterSchemasDefinition),
    }),
  }),
)

export const ApiShieldOperationFeatureApiRouting = named(
  "api-shield_operation_feature_api_routing",
  Type.Object({
    api_routing: Type.Optional(
      Type.Object(
        {
          last_updated: Type.Optional(DlsTimestamp),
          route: Type.Optional(Type.String({ description: "Target route.", "x-auditable": true })),
        },
        { description: "API Routing settings on endpoint." },
      ),
    ),
  }),
)

export const ApiShieldConfidenceIntervalsBounds = named(
  "api-shield_confidence_intervals_bounds",
  Type.Object(
    {
      lower: Type.Optional(Type.Number({ description: "Lower bound for percentile estimate", "x-auditable": true })),
      upper: Type.Optional(Type.Number({ description: "Upper bound for percentile estimate", "x-auditable": true })),
    },
    { description: "Upper and lower bound for percentile estimate" },
  ),
)

export const ApiShieldOperationFeatureConfidenceIntervals = named(
  "api-shield_operation_feature_confidence_intervals",
  Type.Object({
    confidence_intervals: Type.Optional(
      Type.Object({
        last_updated: Type.Optional(DlsTimestamp),
        suggested_threshold: Type.Optional(
          Type.Object({
            confidence_intervals: Type.Optional(
              Type.Object({
                p90: Type.Optional(ApiShieldConfidenceIntervalsBounds),
                p95: Type.Optional(ApiShieldConfidenceIntervalsBounds),
                p99: Type.Optional(ApiShieldConfidenceIntervalsBounds),
              }),
            ),
            mean: Type.Optional(Type.Number({ description: "Suggested threshold.", "x-auditable": true })),
          }),
        ),
      }),
    ),
  }),
)

export const ApiShieldOperationFeatureSchemaInfo = named(
  "api-shield_operation_feature_schema_info",
  Type.Object({
    schema_info: Type.Optional(
      Type.Object({
        active_schema: Type.Optional(
          Type.Object(
            {
              created_at: Type.Optional(DlsTimestamp),
              id: Type.Optional(ApiShieldSchemasUuid),
              is_learned: Type.Optional(
                Type.Boolean({ description: "True if schema is Cloudflare-provided.", "x-auditable": true }),
              ),
              name: Type.Optional(Type.String({ description: "Schema file name.", "x-auditable": true })),
            },
            { description: "Schema active on endpoint." },
          ),
        ),
        learned_available: Type.Optional(
          Type.Boolean({
            description: "True if a Cloudflare-provided learned schema is available for this endpoint.",
            "x-auditable": true,
          }),
        ),
        mitigation_action: Type.Optional(
          Type.Union([Type.Literal("none"), Type.Literal("log"), Type.Literal("block")], {
            description: "Action taken on requests failing validation.",
            "x-auditable": true,
          }),
        ),
      }),
    ),
  }),
)

export const ApiShieldOperationFeatures = named(
  "api-shield_operation_features",
  Type.Union([
    ApiShieldOperationFeatureThresholds,
    ApiShieldOperationFeatureParameterSchemas,
    ApiShieldOperationFeatureApiRouting,
    ApiShieldOperationFeatureConfidenceIntervals,
    ApiShieldOperationFeatureSchemaInfo,
  ]),
)

export const ApiShieldOperation = named(
  "api-shield_operation",
  Type.Object({
    endpoint: ApiShieldEndpoint,
    host: ApiShieldHost,
    method: ApiShieldMethod,
    last_updated: ApiShieldSchemasTimestamp,
    operation_id: ApiShieldSchemasUuid,
    features: Type.Optional(ApiShieldOperationFeatures),
  }),
)

export const ApiShieldBasicOperation = named(
  "api-shield_basic_operation",
  Type.Object({
    endpoint: ApiShieldEndpoint,
    host: ApiShieldHost,
    method: ApiShieldMethod,
  }),
)

export const ApiShieldSchemasIdentifier = named("api-shield_schemas-identifier", DlsIdentifier)

export const ApiShieldApiResponseCommonFailure = named(
  "api-shield_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const TlsCertificatesAndHostnamesSchemasExpiresOn = named(
  "tls-certificates-and-hostnames_schemas-expires_on",
  Type.String({
    description: "When the certificate expires.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const IamResultInfo = named(
  "iam_result_info",
  Type.Object({
    count: Type.Optional(Type.Number({ description: "Total number of results for the requested service" })),
    page: Type.Optional(Type.Number({ description: "Current page within paginated list of results" })),
    per_page: Type.Optional(Type.Number({ description: "Number of results per page of results" })),
    total_count: Type.Optional(Type.Number({ description: "Total results available without any search parameters" })),
  }),
)

export const BillSubsApiUserSubscriptionResponseCollection = named(
  "bill-subs-api_user_subscription_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(BillSubsApiSubscription), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: Type.Optional(IamResultInfo),
  }),
)

export const IamCommonComponentsSchemasIdentifier = named(
  "iam_common_components-schemas-identifier",
  Type.String({ description: "Identifier", minLength: 32, maxLength: 32, "x-auditable": true }),
)

export const LoadBalancingSchemasName = named(
  "load-balancing_schemas-name",
  Type.String({ description: "A human-identifiable name for the origin.", "x-auditable": true }),
)

export const LoadBalancingSchemasEnabled = named(
  "load-balancing_schemas-enabled",
  Type.Boolean({
    description:
      "Whether to enable (the default) this origin within the pool. Disabled origins will not receive traffic and are excluded from health checks. The origin will only be disabled for the current pool.",
    default: true,
    "x-auditable": true,
  }),
)

export const LoadBalancingAddress = named(
  "load-balancing_address",
  Type.String({
    description:
      "The IP address (IPv4 or IPv6) of the origin, or its publicly addressable hostname. Hostnames entered here should resolve directly to the origin, and not be a hostname proxied by Cloudflare. To set an internal/reserved address, virtual_network_id must also be set.",
    "x-auditable": true,
  }),
)

export const IamRoleNames = named(
  "iam_role_names",
  Type.Array(Type.String({ maxLength: 120, "x-auditable": true }), {
    description: "List of role names the membership has for this account.",
    readOnly: true,
  }),
)

export const FirewallRuleIdentifier = named(
  "firewall_rule_identifier",
  Type.String({ description: "Unique identifier for a rule.", maxLength: 32 }),
)

export const BillSubsApiComponentsSchemasIdentifier = named(
  "bill-subs-api_components-schemas-identifier",
  Type.String({ description: "Billing item identifier tag.", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const IamZipcode = named(
  "iam_zipcode",
  Type.Union([
    Type.String({ description: "The zipcode or postal code where the user lives.", maxLength: 20 }),
    Type.Null(),
  ]),
)

export const IamTelephone = named(
  "iam_telephone",
  Type.Union([Type.String({ description: "User's telephone number", maxLength: 20 }), Type.Null()]),
)

export const IamLastName = named(
  "iam_last_name",
  Type.Union([Type.String({ description: "User's last name", maxLength: 60, "x-auditable": true }), Type.Null()]),
)

export const IamFirstName = named(
  "iam_first_name",
  Type.Union([Type.String({ description: "User's first name", maxLength: 60, "x-auditable": true }), Type.Null()]),
)

export const IamCountry = named(
  "iam_country",
  Type.Union([Type.String({ description: "The country in which the user lives.", maxLength: 30 }), Type.Null()]),
)

export const IamTwoFactorAuthenticationEnabled = named(
  "iam_two_factor_authentication_enabled",
  Type.Boolean({
    description:
      "Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.",
    default: false,
    readOnly: true,
  }),
)

export const ResourceSharingOrganizationId = named(
  "resource-sharing_organization_id",
  Type.String({ description: "Organization identifier.", maxLength: 32, "x-auditable": true }),
)

export const OrganizationsApiAccount = named(
  "organizations-api_Account",
  Type.Object({
    created_on: Type.String({ format: "date-time", readOnly: true }),
    id: Type.String(),
    name: Type.Union([Type.String(), Type.Null()]),
    settings: Type.Object({
      abuse_contact_email: Type.Union([Type.String(), Type.Null()]),
      access_approval_expiry: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
      api_access_enabled: Type.Union([Type.Boolean(), Type.Null()]),
      default_nameservers: Type.Union([
        Type.String({
          description:
            "Use [DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-an-account-list-dns-settings) instead. Deprecated.",
          deprecated: true,
        }),
        Type.Null(),
      ]),
      enforce_twofactor: Type.Union([Type.Boolean(), Type.Null()]),
      use_account_custom_ns_by_default: Type.Union([
        Type.Boolean({
          description:
            "Use [DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-an-account-list-dns-settings) instead. Deprecated.",
          deprecated: true,
        }),
        Type.Null(),
      ]),
    }),
    type: Type.Union([Type.Literal("standard"), Type.Literal("enterprise")]),
  }),
)

export const IamAccess = named(
  "iam_access",
  Type.Union([Type.Literal("allow"), Type.Literal("deny")], {
    description: "Allow or deny operations against the resources.",
    "x-auditable": true,
  }),
)

export const IamPolicyIdentifier = named(
  "iam_policy_identifier",
  Type.String({
    description: "Policy identifier.",
    readOnly: true,
    "x-auditable": true,
    "x-stainless-terraform-always-send": true,
  }),
)

export const IamPermissionGroup = named(
  "iam_permission_group",
  Type.Object(
    {
      id: Type.String({ description: "Identifier of the permission group.", "x-auditable": true }),
      meta: Type.Optional(
        Type.Object(
          {
            key: Type.Optional(Type.String({ "x-auditable": true })),
            value: Type.Optional(Type.String({ "x-auditable": true })),
          },
          { description: "Attributes associated to the permission group." },
        ),
      ),
      name: Type.Optional(
        Type.String({ description: "Name of the permission group.", readOnly: true, "x-auditable": true }),
      ),
    },
    { description: "A named group of permissions that map to a group of operations against resources." },
  ),
)

export const IamPermissionGroups = named(
  "iam_permission_groups",
  Type.Array(IamPermissionGroup, { description: "A set of permission groups that are specified to the policy." }),
)

export const IamScopeKey = named(
  "iam_scope_key",
  Type.String({
    description: "This is a combination of pre-defined resource name and identifier (like Account ID etc.)",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const IamScopeObjectKey = named(
  "iam_scope_object_key",
  Type.String({
    description: "This is a combination of pre-defined resource name and identifier (like Zone ID etc.)",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const IamScopeObject = named(
  "iam_scope_object",
  Type.Object(
    {
      key: IamScopeObjectKey,
    },
    { description: "A scope object represents any resource that can have actions applied against invite." },
  ),
)

export const IamScope = named(
  "iam_scope",
  Type.Object(
    {
      key: IamScopeKey,
      objects: Type.Array(IamScopeObject, { description: "A list of scope objects for additional context." }),
    },
    { description: "A scope is a combination of scope objects which provides additional context." },
  ),
)

export const IamResourceGroup = named(
  "iam_resource_group",
  Type.Object(
    {
      id: Type.String({ description: "Identifier of the resource group.", readOnly: true, "x-auditable": true }),
      meta: Type.Optional(
        Type.Object(
          {
            key: Type.Optional(Type.String()),
            value: Type.Optional(Type.String()),
          },
          { description: "Attributes associated to the resource group." },
        ),
      ),
      name: Type.Optional(
        Type.String({ description: "Name of the resource group.", readOnly: true, "x-auditable": true }),
      ),
      scope: Type.Array(IamScope, { description: "The scope associated to the resource group" }),
    },
    { description: "A group of scoped resources." },
  ),
)

export const IamResourceGroups = named(
  "iam_resource_groups",
  Type.Array(IamResourceGroup, { description: "A list of resource groups that the policy applies to." }),
)

export const IamListMemberPolicy = named(
  "iam_list_member_policy",
  Type.Object({
    access: Type.Optional(IamAccess),
    id: Type.Optional(IamPolicyIdentifier),
    permission_groups: Type.Optional(IamPermissionGroups),
    resource_groups: Type.Optional(IamResourceGroups),
  }),
)

export const IamGrants = named(
  "iam_grants",
  Type.Object({
    read: Type.Optional(Type.Boolean({ "x-auditable": true })),
    write: Type.Optional(Type.Boolean({ "x-auditable": true })),
  }),
)

export const IamPermissions = named(
  "iam_permissions",
  Type.Object({
    analytics: Type.Optional(IamGrants),
    billing: Type.Optional(IamGrants),
    cache_purge: Type.Optional(IamGrants),
    dns: Type.Optional(IamGrants),
    dns_records: Type.Optional(IamGrants),
    lb: Type.Optional(IamGrants),
    logs: Type.Optional(IamGrants),
    organization: Type.Optional(IamGrants),
    ssl: Type.Optional(IamGrants),
    waf: Type.Optional(IamGrants),
    zone_settings: Type.Optional(IamGrants),
    zones: Type.Optional(IamGrants),
  }),
)

export const IamMembershipComponentsSchemasIdentifier = named(
  "iam_membership_components-schemas-identifier",
  Type.String({ description: "Membership identifier tag.", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const IamAccountType = named(
  "iam_account-type",
  Type.Union([Type.Literal("standard"), Type.Literal("enterprise")]),
)

export const IamAccount = named(
  "iam_account",
  Type.Object({
    created_on: Type.Optional(
      Type.String({
        description: "Timestamp for the creation of the account",
        format: "date-time",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    id: IamCommonComponentsSchemasIdentifier,
    name: Type.String({ description: "Account name", maxLength: 100, "x-auditable": true }),
    settings: Type.Optional(
      Type.Object(
        {
          abuse_contact_email: Type.Optional(
            Type.String({
              description: "Sets an abuse contact email to notify for abuse reports.",
              "x-auditable": true,
            }),
          ),
          enforce_twofactor: Type.Optional(
            Type.Boolean({
              description:
                "Indicates whether membership in this account requires that\nTwo-Factor Authentication is enabled",
              default: false,
              "x-auditable": true,
            }),
          ),
        },
        { description: "Account settings" },
      ),
    ),
    type: IamAccountType,
  }),
)

export const TunnelDeletedAt = named(
  "tunnel_deleted_at",
  Type.String({
    description: "Timestamp of when the resource was deleted. If `null`, the resource has not been deleted.",
    format: "date-time",
    readOnly: true,
  }),
)

export const TunnelCreatedAt = named(
  "tunnel_created_at",
  Type.String({ description: "Timestamp of when the resource was created.", format: "date-time", readOnly: true }),
)

export const IamValue = named(
  "iam_value",
  Type.String({ description: "The token value.", minLength: 40, maxLength: 80, readOnly: true, "x-sensitive": true }),
)

export const IamResponseSingleValue = named(
  "iam_response_single_value",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(IamValue),
  }),
)

export const IamCidrList = named(
  "iam_cidr_list",
  Type.Array(Type.String({ description: "IPv4/IPv6 CIDR.", "x-auditable": true }), {
    description: "List of IPv4/IPv6 CIDR addresses.",
  }),
)

export const IamRequestIp = named(
  "iam_request_ip",
  Type.Object(
    {
      in: Type.Optional(IamCidrList),
      not_in: Type.Optional(IamCidrList),
    },
    { description: "Client IP restrictions." },
  ),
)

export const IamCondition = named(
  "iam_condition",
  Type.Object({
    request_ip: Type.Optional(IamRequestIp),
  }),
)

export const IamExpiresOn = named(
  "iam_expires_on",
  Type.String({
    description: "The expiration time on or after which the JWT MUST NOT be accepted for processing.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const IamTokenIdentifier = named(
  "iam_token_identifier",
  Type.String({ description: "Token identifier tag.", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const IamIssuedOn = named(
  "iam_issued_on",
  Type.String({
    description: "The time on which the token was created.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const IamLastUsedOn = named(
  "iam_last_used_on",
  Type.String({
    description: "Last time the token was used.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const IamModifiedOn = named(
  "iam_modified_on",
  Type.String({
    description: "Last time the token was modified.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const IamName = named(
  "iam_name",
  Type.String({ description: "Token name.", maxLength: 120, "x-auditable": true }),
)

export const IamNotBefore = named(
  "iam_not_before",
  Type.String({
    description: "The time before which the token MUST NOT be accepted for processing.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const IamResourcesTypeObjectString = named(
  "iam_resources_type_object_string",
  Type.Record(Type.String(), Type.String({ description: 'Simple permission string like "*"' })),
)

export const IamResourcesTypeObjectNested = named(
  "iam_resources_type_object_nested",
  Type.Record(Type.String(), Type.Record(Type.String(), Type.String())),
)

export const IamResources = named(
  "iam_resources",
  Type.Union([IamResourcesTypeObjectString, IamResourcesTypeObjectNested], {
    description: "A list of resource names that the policy applies to.",
    "x-auditable": true,
  }),
)

export const IamPolicyWithPermissionGroupsAndResources = named(
  "iam_policy_with_permission_groups_and_resources",
  Type.Object({
    effect: IamAccess,
    id: IamPolicyIdentifier,
    permission_groups: IamPermissionGroups,
    resources: IamResources,
  }),
)

export const IamTokenPolicies = named(
  "iam_token_policies",
  Type.Array(IamPolicyWithPermissionGroupsAndResources, {
    description: "List of access policies assigned to the token.",
  }),
)

export const IamTokenStatus = named(
  "iam_token_status",
  Type.Union([Type.Literal("active"), Type.Literal("disabled"), Type.Literal("expired")], {
    description: "Status of the token.",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const IamTokenBase = named(
  "iam_token_base",
  Type.Object({
    condition: Type.Optional(IamCondition),
    expires_on: Type.Optional(IamExpiresOn),
    id: Type.Optional(IamTokenIdentifier),
    issued_on: Type.Optional(IamIssuedOn),
    last_used_on: Type.Optional(IamLastUsedOn),
    modified_on: Type.Optional(IamModifiedOn),
    name: Type.Optional(IamName),
    not_before: Type.Optional(IamNotBefore),
    policies: Type.Optional(IamTokenPolicies),
    status: Type.Optional(IamTokenStatus),
  }),
)

export const IamTokenBody = named("iam_token_body", IamTokenBase)

export const IamSingleTokenResponse = named(
  "iam_single_token_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(IamTokenBase),
  }),
)

export const IamTokenVerifyResponseSingleSegment = named(
  "iam_token_verify_response_single_segment",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        expires_on: Type.Optional(IamExpiresOn),
        id: IamTokenIdentifier,
        not_before: Type.Optional(IamNotBefore),
        status: IamTokenStatus,
      }),
    ),
  }),
)

export const IamPermissionsGroupResponseCollection = named(
  "iam_permissions_group_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IamResultInfo),
    result: Type.Optional(
      Type.Array(
        Type.Object({
          id: Type.Optional(Type.String({ description: "Public ID.", "x-auditable": true })),
          name: Type.Optional(Type.String({ description: "Permission Group Name", "x-auditable": true })),
          scopes: Type.Optional(
            Type.Array(
              Type.Union(
                [
                  Type.Literal("com.cloudflare.api.account"),
                  Type.Literal("com.cloudflare.api.account.zone"),
                  Type.Literal("com.cloudflare.api.user"),
                  Type.Literal("com.cloudflare.edge.r2.bucket"),
                ],
                { "x-auditable": true },
              ),
              { description: "Resources to which the Permission Group is scoped" },
            ),
          ),
        }),
      ),
    ),
  }),
)

export const IamTokenWithValue = named(
  "iam_token_with_value",
  Type.Object({
    condition: Type.Optional(IamCondition),
    expires_on: Type.Optional(IamExpiresOn),
    id: Type.Optional(IamTokenIdentifier),
    issued_on: Type.Optional(IamIssuedOn),
    last_used_on: Type.Optional(IamLastUsedOn),
    modified_on: Type.Optional(IamModifiedOn),
    name: Type.Optional(IamName),
    not_before: Type.Optional(IamNotBefore),
    policies: Type.Optional(IamTokenPolicies),
    status: Type.Optional(IamTokenStatus),
    value: Type.Optional(IamValue),
  }),
)

export const IamSingleTokenCreateResponse = named(
  "iam_single_token_create_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(IamTokenWithValue),
  }),
)

export const IamCreatePayload = named(
  "iam_create_payload",
  Type.Object({
    condition: Type.Optional(IamCondition),
    expires_on: Type.Optional(IamExpiresOn),
    name: IamName,
    not_before: Type.Optional(IamNotBefore),
    policies: IamTokenPolicies,
  }),
)

export const IamCollectionTokensResponse = named(
  "iam_collection_tokens_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IamResultInfo),
    result: Type.Optional(Type.Array(IamTokenBase)),
  }),
)

export const TunnelIpNetworkEncoded = named(
  "tunnel_ip_network_encoded",
  Type.String({ description: "IP/CIDR range in URL-encoded format" }),
)

export const TunnelIp = named("tunnel_ip", Type.String())

export const TunnelTunnelType = named(
  "tunnel_tunnel_type",
  Type.Union(
    [
      Type.Literal("cfd_tunnel"),
      Type.Literal("warp_connector"),
      Type.Literal("warp"),
      Type.Literal("magic"),
      Type.Literal("ip_sec"),
      Type.Literal("gre"),
      Type.Literal("cni"),
    ],
    { description: "The type of tunnel.", "x-auditable": true },
  ),
)

export const TunnelTunnelName = named(
  "tunnel_tunnel_name",
  Type.String({ description: "A user-friendly name for a tunnel." }),
)

export const TunnelTunnelId = named(
  "tunnel_tunnel_id",
  Type.String({ description: "UUID of the tunnel.", format: "uuid", maxLength: 36, "x-auditable": true }),
)

export const TunnelTunnelTypes = named(
  "tunnel_tunnel_types",
  Type.Array(TunnelTunnelType, { description: "The types of tunnels to filter by, separated by commas." }),
)

export const R2SippyProvider = named("r2_sippy_provider", Type.Union([Type.Literal("r2")], { "x-auditable": true }))

export const ResourceSharingResourceMeta = named(
  "resource-sharing_resource_meta",
  Type.Unknown({ description: "Resource Metadata." }),
)

export const ResourceSharingResourceId = named(
  "resource-sharing_resource_id",
  Type.String({ description: "Share Resource identifier.", maxLength: 32, "x-auditable": true }),
)

export const ResourceSharingCreated = named(
  "resource-sharing_created",
  Type.String({ description: "When the share was created.", format: "date-time", "x-auditable": true }),
)

export const ResourceSharingModified = named(
  "resource-sharing_modified",
  Type.String({ description: "When the share was modified.", format: "date-time", "x-auditable": true }),
)

export const ResourceSharingAccountId = named(
  "resource-sharing_account_id",
  Type.String({ description: "Account identifier.", maxLength: 32, "x-auditable": true }),
)

export const ResourceSharingResourceType = named(
  "resource-sharing_resource_type",
  Type.Union(
    [
      Type.Literal("custom-ruleset"),
      Type.Literal("widget"),
      Type.Literal("gateway-policy"),
      Type.Literal("gateway-destination-ip"),
      Type.Literal("gateway-block-page-settings"),
      Type.Literal("gateway-extended-email-matching"),
    ],
    { description: "Resource Type.", "x-auditable": true },
  ),
)

export const ResourceSharingResourceVersion = named(
  "resource-sharing_resource_version",
  Type.Integer({ description: "Resource Version.", "x-auditable": true }),
)

export const ResourceSharingResourceStatus = named(
  "resource-sharing_resource_status",
  Type.Union([Type.Literal("active"), Type.Literal("deleting"), Type.Literal("deleted")], {
    description: "Resource Status.",
    "x-auditable": true,
  }),
)

export const ResourceSharingShareResourceObject = named(
  "resource-sharing_share_resource_object",
  Type.Object({
    created: ResourceSharingCreated,
    id: ResourceSharingResourceId,
    meta: ResourceSharingResourceMeta,
    modified: ResourceSharingModified,
    resource_account_id: ResourceSharingAccountId,
    resource_id: ResourceSharingResourceId,
    resource_type: ResourceSharingResourceType,
    resource_version: ResourceSharingResourceVersion,
    status: ResourceSharingResourceStatus,
  }),
)

export const EmailSecurityMessage = named("email-security_Message", ResponseInfo)

export const ResourceSharingV4errors = named("resource-sharing_v4errors", Type.Array(EmailSecurityMessage))

export const ResourceSharingResultInfo = named(
  "resource-sharing_result_info",
  Type.Object({
    count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
    page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
    per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
    total_count: Type.Optional(Type.Number({ description: "Total results available without any search parameters." })),
    total_pages: Type.Optional(Type.Number({ description: "Total number of pages using the given per page." })),
  }),
)

export const ResourceSharingShareName = named(
  "resource-sharing_share_name",
  Type.String({ description: "The name of the share.", "x-auditable": true }),
)

export const ResourceSharingShareId = named(
  "resource-sharing_share_id",
  Type.String({ description: "Share identifier tag.", maxLength: 32, "x-auditable": true }),
)

export const ResourceSharingAccountName = named(
  "resource-sharing_account_name",
  Type.String({ description: "The display name of an account.", "x-auditable": true }),
)

export const ResourceSharingShareKind = named(
  "resource-sharing_share_kind",
  Type.Union([Type.Literal("sent"), Type.Literal("received")], { "x-auditable": true }),
)

export const ResourceSharingShareStatus = named(
  "resource-sharing_share_status",
  Type.Union([Type.Literal("active"), Type.Literal("deleting"), Type.Literal("deleted")], { "x-auditable": true }),
)

export const ResourceSharingShareTargetType = named(
  "resource-sharing_share_target_type",
  Type.Union([Type.Literal("account"), Type.Literal("organization")], { "x-auditable": true }),
)

export const ResourceSharingShareObject = named(
  "resource-sharing_share_object",
  Type.Object({
    account_id: ResourceSharingAccountId,
    account_name: ResourceSharingAccountName,
    associated_recipient_count: Type.Optional(
      Type.Integer({
        description:
          "The number of recipients in the 'associated' state. This field is only included when requested via the 'include_recipient_counts' parameter.",
      }),
    ),
    associating_recipient_count: Type.Optional(
      Type.Integer({
        description:
          "The number of recipients in the 'associating' state. This field is only included when requested via the 'include_recipient_counts' parameter.",
      }),
    ),
    created: ResourceSharingCreated,
    disassociated_recipient_count: Type.Optional(
      Type.Integer({
        description:
          "The number of recipients in the 'disassociated' state. This field is only included when requested via the 'include_recipient_counts' parameter.",
      }),
    ),
    disassociating_recipient_count: Type.Optional(
      Type.Integer({
        description:
          "The number of recipients in the 'disassociating' state. This field is only included when requested via the 'include_recipient_counts' parameter.",
      }),
    ),
    id: ResourceSharingShareId,
    kind: Type.Optional(ResourceSharingShareKind),
    modified: ResourceSharingModified,
    name: ResourceSharingShareName,
    organization_id: ResourceSharingOrganizationId,
    resources: Type.Optional(
      Type.Array(ResourceSharingShareResourceObject, {
        description:
          "A list of resources that are part of the share. This field is only included when requested via the 'include_resources' parameter.",
      }),
    ),
    status: ResourceSharingShareStatus,
    target_type: ResourceSharingShareTargetType,
  }),
)

export const ResourceSharingApiResponseCommonFailure = named(
  "resource-sharing_api-response-common-failure",
  Type.Object({
    errors: ResourceSharingV4errors,
    result: Type.Union([Type.Null()]),
    success: Type.Boolean({ description: "Whether the API call was successful.", "x-auditable": true }),
  }),
)

export const ResourceSharingShareResponseCollection = named(
  "resource-sharing_share_response_collection",
  Type.Object({
    errors: ResourceSharingV4errors,
    result: Type.Optional(Type.Union([Type.Array(ResourceSharingShareObject), Type.Null()])),
    success: Type.Boolean({ description: "Whether the API call was successful." }),
    result_info: Type.Optional(ResourceSharingResultInfo),
  }),
)

export const RumApiResponseCommonFailure = named(
  "rum_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const IamRoleComponentsSchemasIdentifier = named(
  "iam_role_components-schemas-identifier",
  Type.String({ description: "Role identifier tag.", maxLength: 32, "x-auditable": true }),
)

export const IamRole = named(
  "iam_role",
  Type.Object({
    description: Type.String({
      description: "Description of role's permissions.",
      readOnly: true,
      "x-auditable": true,
    }),
    id: IamRoleComponentsSchemasIdentifier,
    name: Type.String({ description: "Role name.", maxLength: 120, readOnly: true, "x-auditable": true }),
    permissions: IamPermissions,
  }),
)

export const R2BucketName = named(
  "r2_bucket_name",
  Type.String({ description: "Name of the bucket.", minLength: 3, maxLength: 64, "x-auditable": true }),
)

export const R2Jurisdiction = named(
  "r2_jurisdiction",
  Type.Union([Type.Literal("default"), Type.Literal("eu"), Type.Literal("fedramp")], {
    description: "Jurisdiction where objects in this bucket are guaranteed to be stored.",
    "x-auditable": true,
    "x-stainless-param": "jurisdiction",
  }),
)

export const MqIdentifier = named(
  "mq_identifier",
  Type.String({ description: "A Resource identifier.", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const MqApiV4Message = named("mq_api-v4-message", Type.Array(Type.String({ "x-auditable": true })))

export const MqApiV4Error = named("mq_api-v4-error", Type.Array(ResponseInfo))

export const OrganizationsApiProfile = named(
  "organizations-api_Profile",
  Type.Object({
    business_address: Type.String(),
    business_email: Type.String(),
    business_name: Type.String(),
    business_phone: Type.String(),
    external_metadata: Type.String(),
  }),
)

export const McnPolicyResult = named("mcn_policy_result", Type.String())

export const OrganizationsApiOrganizationflags = named(
  "organizations-api_OrganizationFlags",
  Type.Object(
    {
      account_creation: Type.String(),
      account_deletion: Type.String(),
      account_migration: Type.String(),
      account_mobility: Type.String(),
      sub_org_creation: Type.String(),
    },
    { description: "Organization flags for feature enablement" },
  ),
)

export const OrganizationsApiOrganization = named(
  "organizations-api_Organization",
  Type.Object(
    {
      create_time: Type.String({ format: "date-time", readOnly: true }),
      id: McnPolicyResult,
      meta: Type.Object({
        flags: Type.Optional(OrganizationsApiOrganizationflags),
        managed_by: Type.Optional(Type.String()),
      }),
      name: Type.String(),
      parent: Type.Optional(
        Type.Object({
          id: McnPolicyResult,
          name: Type.String({ readOnly: true }),
        }),
      ),
      profile: Type.Optional(OrganizationsApiProfile),
    },
    { description: "Represents an Organization in the Cloudflare data model" },
  ),
)

export const IamEmail = named(
  "iam_email",
  Type.String({ description: "The contact email address of the user.", maxLength: 90, "x-auditable": true }),
)

export const MagicIdentifier = named("magic_identifier", Type.String({ description: "Identifier", maxLength: 32 }))

export const MagicPrefix = named(
  "magic_prefix",
  Type.String({ description: "IP Prefix in Classless Inter-Domain Routing format.", "x-auditable": true }),
)

export const LoadBalancingOriginHealthData = named(
  "load-balancing_origin_health_data",
  Type.Object(
    {
      failure_reason: Type.Optional(Type.String({ "x-auditable": true })),
      healthy: Type.Optional(Type.Boolean({ "x-auditable": true })),
      response_code: Type.Optional(Type.Number({ "x-auditable": true })),
      rtt: Type.Optional(Type.String({ "x-auditable": true })),
    },
    { description: "The origin ipv4/ipv6 address or domain name mapped to its health data." },
  ),
)

export const LoadBalancingPreviewResult = named(
  "load-balancing_preview_result",
  Type.Record(
    Type.String(),
    Type.Object({
      healthy: Type.Optional(Type.Boolean({ "x-auditable": true })),
      origins: Type.Optional(Type.Array(Type.Record(Type.String(), LoadBalancingOriginHealthData))),
    }),
  ),
)

export const LoadBalancingPreviewResultResponse = named(
  "load-balancing_preview_result_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: LoadBalancingPreviewResult,
  }),
)

export const LoadBalancingPoolsReferencesResponse = named(
  "load-balancing_pools-references-response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Array(
      Type.Object({
        reference_type: Type.Optional(
          Type.Union([Type.Literal("*"), Type.Literal("referral"), Type.Literal("referrer")], { "x-auditable": true }),
        ),
        resource_id: Type.Optional(Type.String({ "x-auditable": true })),
        resource_name: Type.Optional(Type.String({ "x-auditable": true })),
        resource_type: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      { description: "List of resources that reference a given pool." },
    ),
  }),
)

export const LoadBalancingOriginHealth = named(
  "load-balancing_origin-health",
  Type.Object({
    ip: Type.Optional(
      Type.Object({
        failure_reason: Type.Optional(Type.String({ description: "Failure reason.", "x-auditable": true })),
        healthy: Type.Optional(Type.Boolean({ description: "Origin health status.", "x-auditable": true })),
        response_code: Type.Optional(
          Type.Number({ description: "Response code from origin health check.", "x-auditable": true }),
        ),
        rtt: Type.Optional(Type.String({ description: "Origin RTT (Round Trip Time) response.", "x-auditable": true })),
      }),
    ),
  }),
)

export const LoadBalancingHealthDetails = named(
  "load-balancing_health_details",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Object(
      {
        pool_id: Type.Optional(Type.String({ description: "Pool ID.", "x-auditable": true })),
        pop_health: Type.Optional(
          Type.Object(
            {
              healthy: Type.Optional(
                Type.Boolean({ description: "Whether health check in region is healthy.", "x-auditable": true }),
              ),
              origins: Type.Optional(Type.Array(LoadBalancingOriginHealth)),
            },
            { description: "List of regions and associated health status." },
          ),
        ),
      },
      { description: "A list of regions from which to run health checks. Null means every Cloudflare data center." },
    ),
  }),
)

export const LoadBalancingSchemasIdentifier = named(
  "load-balancing_schemas-identifier",
  Type.String({ "x-auditable": true }),
)

export const LoadBalancingSchemasIdResponse = named(
  "load-balancing_schemas-id_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Object({
      id: Type.Optional(LoadBalancingSchemasIdentifier),
    }),
  }),
)

export const LoadBalancingSchemasDisabledAt = named(
  "load-balancing_schemas-disabled_at",
  Type.String({
    description:
      "This field shows up only if the pool is disabled. This field is set with the time the pool was disabled at.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const LoadBalancingCheckRegions = named(
  "load-balancing_check_regions",
  Type.Union([
    Type.Array(
      Type.Union(
        [
          Type.Literal("WNAM"),
          Type.Literal("ENAM"),
          Type.Literal("WEU"),
          Type.Literal("EEU"),
          Type.Literal("NSAM"),
          Type.Literal("SSAM"),
          Type.Literal("OC"),
          Type.Literal("ME"),
          Type.Literal("NAF"),
          Type.Literal("SAF"),
          Type.Literal("SAS"),
          Type.Literal("SEAS"),
          Type.Literal("NEAS"),
          Type.Literal("ALL_REGIONS"),
        ],
        {
          description:
            "WNAM: Western North America, ENAM: Eastern North America, WEU: Western Europe, EEU: Eastern Europe, NSAM: Northern South America, SSAM: Southern South America, OC: Oceania, ME: Middle East, NAF: North Africa, SAF: South Africa, SAS: Southern Asia, SEAS: South East Asia, NEAS: North East Asia, ALL_REGIONS: all regions (ENTERPRISE customers only).",
          "x-auditable": true,
        },
      ),
      { description: "A list of regions from which to run health checks. Null means every Cloudflare data center." },
    ),
    Type.Null(),
  ]),
)

export const LoadBalancingPatchPoolsNotificationEmail = named(
  "load-balancing_patch_pools_notification_email",
  Type.Union([Type.Literal("")], {
    description:
      'The email address to send health status notifications to. This field is now deprecated in favor of Cloudflare Notifications for Load Balancing, so only resetting this field with an empty string `""` is accepted.',
  }),
)

export const LoadBalancingSchemasDescription = named(
  "load-balancing_schemas-description",
  Type.String({ description: "A human-readable description of the pool.", "x-auditable": true }),
)

export const LoadBalancingEnabled = named(
  "load-balancing_enabled",
  Type.Boolean({
    description:
      "Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling a pool will cause any load balancers using it to failover to the next pool (if any).",
    default: true,
    "x-auditable": true,
  }),
)

export const LoadBalancingLatitude = named(
  "load-balancing_latitude",
  Type.Number({
    description:
      "The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set.",
    "x-auditable": true,
  }),
)

export const LoadBalancingLoadShedding = named(
  "load-balancing_load_shedding",
  Type.Object(
    {
      default_percent: Type.Optional(
        Type.Number({
          description:
            "The percent of traffic to shed from the pool, according to the default policy. Applies to new sessions and traffic without session affinity.",
          default: 0,
          minimum: 0,
          maximum: 100,
          "x-auditable": true,
        }),
      ),
      default_policy: Type.Optional(
        Type.Union([Type.Literal("random"), Type.Literal("hash")], {
          description:
            "The default policy to use when load shedding. A random policy randomly sheds a given percent of requests. A hash policy computes a hash over the CF-Connecting-IP address and sheds all requests originating from a percent of IPs.",
          "x-auditable": true,
        }),
      ),
      session_percent: Type.Optional(
        Type.Number({
          description: "The percent of existing sessions to shed from the pool, according to the session policy.",
          default: 0,
          minimum: 0,
          maximum: 100,
          "x-auditable": true,
        }),
      ),
      session_policy: Type.Optional(
        Type.Union([Type.Literal("hash")], {
          description: "Only the hash policy is supported for existing sessions (to avoid exponential decay).",
          "x-auditable": true,
        }),
      ),
    },
    { description: "Configures load shedding policies and percentages for the pool." },
  ),
)

export const LoadBalancingLongitude = named(
  "load-balancing_longitude",
  Type.Number({
    description:
      "The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set.",
    "x-auditable": true,
  }),
)

export const LoadBalancingMinimumOrigins = named(
  "load-balancing_minimum_origins",
  Type.Integer({
    description:
      "The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number, the pool will be marked unhealthy and will failover to the next available pool.",
    default: 1,
    "x-auditable": true,
  }),
)

export const LoadBalancingMonitorId = named(
  "load-balancing_monitor_id",
  Type.String({
    description: "The ID of the Monitor to use for checking the health of origins within this pool.",
    "x-auditable": true,
  }),
)

export const LoadBalancingMonitorGroupId = named(
  "load-balancing_monitor_group_id",
  Type.String({
    description: "The ID of the Monitor Group to use for checking the health of origins within this pool.",
    "x-auditable": true,
  }),
)

export const LoadBalancingName = named(
  "load-balancing_name",
  Type.String({
    description: "A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed.",
    "x-auditable": true,
  }),
)

export const LoadBalancingNotificationEmail = named(
  "load-balancing_notification_email",
  Type.String({
    description:
      "This field is now deprecated. It has been moved to Cloudflare's Centralized Notification service https://developers.cloudflare.com/fundamentals/notifications/. The email address to send health status notifications to. This can be an individual mailbox or a mailing list. Multiple emails can be supplied as a comma delimited list.",
    "x-auditable": true,
  }),
)

export const LoadBalancingFilterOptions = named(
  "load-balancing_filter_options",
  Type.Object(
    {
      disable: Type.Optional(
        Type.Boolean({
          description: "If set true, disable notifications for this type of resource (pool or origin).",
          default: false,
          "x-auditable": true,
        }),
      ),
      healthy: Type.Optional(
        Type.Union([
          Type.Boolean({
            description:
              "If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).",
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
    },
    { description: "Filter options for a particular resource type (pool or origin). Use null to reset." },
  ),
)

export const LoadBalancingNotificationFilter = named(
  "load-balancing_notification_filter",
  Type.Union([
    Type.Object(
      {
        origin: Type.Optional(LoadBalancingFilterOptions),
        pool: Type.Optional(LoadBalancingFilterOptions),
      },
      {
        description:
          "Filter pool and origin health notifications by resource type or health status. Use null to reset.",
      },
    ),
    Type.Null(),
  ]),
)

export const LoadBalancingOriginSteering = named(
  "load-balancing_origin_steering",
  Type.Object(
    {
      policy: Type.Optional(
        Type.Union(
          [
            Type.Literal("random"),
            Type.Literal("hash"),
            Type.Literal("least_outstanding_requests"),
            Type.Literal("least_connections"),
          ],
          {
            description:
              'The type of origin steering policy to use.\n- `"random"`: Select an origin randomly.\n- `"hash"`: Select an origin by computing a hash over the CF-Connecting-IP address.\n- `"least_outstanding_requests"`: Select an origin by taking into consideration origin weights, as well as each origin\'s number of outstanding requests. Origins with more pending requests are weighted proportionately less relative to others.\n- `"least_connections"`: Select an origin by taking into consideration origin weights, as well as each origin\'s number of open connections. Origins with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.',
            "x-auditable": true,
          },
        ),
      ),
    },
    {
      description:
        "Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity.",
    },
  ),
)

export const LoadBalancingDisabledAt = named(
  "load-balancing_disabled_at",
  Type.String({
    description:
      "This field shows up only if the origin is disabled. This field is set with the time the origin was disabled.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const LoadBalancingHost = named(
  "load-balancing_Host",
  Type.Array(Type.String({ "x-auditable": true }), {
    description:
      "The 'Host' header allows to override the hostname set in the HTTP request. Current support is 1 'Host' header override per origin.",
  }),
)

export const LoadBalancingSchemasHeader = named(
  "load-balancing_schemas-header",
  Type.Object(
    {
      Host: Type.Optional(LoadBalancingHost),
    },
    {
      description:
        "The request header is used to pass additional information with an HTTP request. Currently supported header is 'Host'.",
    },
  ),
)

export const LoadBalancingOriginPort = named(
  "load-balancing_origin_port",
  Type.Integer({
    description:
      "The port for upstream connections. A value of 0 means the default port for the protocol will be used.",
    default: 0,
  }),
)

export const LoadBalancingVirtualNetworkId = named(
  "load-balancing_virtual_network_id",
  Type.String({
    description:
      "The virtual network subnet ID the origin belongs in. Virtual network must also belong to the account.",
  }),
)

export const LoadBalancingWeight = named(
  "load-balancing_weight",
  Type.Number({
    description:
      'The weight of this origin relative to other origins in the pool. Based on the configured weight the total traffic is distributed among origins within the pool.\n- `origin_steering.policy="least_outstanding_requests"`: Use weight to scale the origin\'s outstanding requests.\n- `origin_steering.policy="least_connections"`: Use weight to scale the origin\'s open connections.',
    default: 1,
    minimum: 0,
    maximum: 1,
    multipleOf: 0.01,
    "x-auditable": true,
  }),
)

export const LoadBalancingOrigin = named(
  "load-balancing_origin",
  Type.Object({
    address: Type.Optional(LoadBalancingAddress),
    disabled_at: Type.Optional(LoadBalancingDisabledAt),
    enabled: Type.Optional(LoadBalancingSchemasEnabled),
    header: Type.Optional(LoadBalancingSchemasHeader),
    name: Type.Optional(LoadBalancingSchemasName),
    port: Type.Optional(LoadBalancingOriginPort),
    virtual_network_id: Type.Optional(LoadBalancingVirtualNetworkId),
    weight: Type.Optional(LoadBalancingWeight),
  }),
)

export const LoadBalancingOrigins = named(
  "load-balancing_origins",
  Type.Array(LoadBalancingOrigin, {
    description:
      "The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itself is healthy.",
  }),
)

export const LoadBalancerPool = named("load_balancer_pool", Type.Union([Type.Null()]))

export const LoadBalancingPool = named(
  "load-balancing_pool",
  Type.Object({
    check_regions: Type.Optional(LoadBalancingCheckRegions),
    created_on: Type.Optional(LoadBalancingTimestamp),
    description: Type.Optional(LoadBalancingSchemasDescription),
    disabled_at: Type.Optional(LoadBalancingSchemasDisabledAt),
    enabled: Type.Optional(LoadBalancingEnabled),
    id: Type.Optional(LoadBalancingSchemasIdentifier),
    latitude: Type.Optional(LoadBalancingLatitude),
    load_shedding: Type.Optional(LoadBalancingLoadShedding),
    longitude: Type.Optional(LoadBalancingLongitude),
    minimum_origins: Type.Optional(LoadBalancingMinimumOrigins),
    modified_on: Type.Optional(LoadBalancingTimestamp),
    monitor: Type.Optional(LoadBalancingMonitorId),
    monitor_group: Type.Optional(LoadBalancingMonitorGroupId),
    name: Type.Optional(LoadBalancingName),
    networks: Type.Optional(LoadBalancingNetworks),
    notification_email: Type.Optional(LoadBalancingNotificationEmail),
    notification_filter: Type.Optional(LoadBalancingNotificationFilter),
    origin_steering: Type.Optional(LoadBalancingOriginSteering),
    origins: Type.Optional(LoadBalancingOrigins),
  }),
)

export const LoadBalancingSchemasSingleResponse = named(
  "load-balancing_schemas-single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: LoadBalancingPool,
  }),
)

export const LoadBalancingSchemasResponseCollection = named(
  "load-balancing_schemas-response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(LoadBalancingResultInfo),
    result: Type.Array(LoadBalancingPool),
  }),
)

export const LoadBalancingMonitorReferencesResponse = named(
  "load-balancing_monitor-references-response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Array(
      Type.Object({
        reference_type: Type.Optional(
          Type.Union([Type.Literal("*"), Type.Literal("referral"), Type.Literal("referrer")], { "x-auditable": true }),
        ),
        resource_id: Type.Optional(Type.String({ "x-auditable": true })),
        resource_name: Type.Optional(Type.String({ "x-auditable": true })),
        resource_type: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      { description: "List of resources that reference a given monitor." },
    ),
  }),
)

export const LoadBalancingIdentifier = named("load-balancing_identifier", Type.String({ "x-auditable": true }))

export const UnnamedSchemaRef025497b7e63379c31929636b5186e45c = named(
  "unnamed_schema_ref_025497b7e63379c31929636b5186e45c",
  Type.Union([Type.Null()]),
)

export const LoadBalancingPreviewResponse = named(
  "load-balancing_preview_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Object({
      pools: Type.Optional(
        Type.Record(
          Type.String(),
          Type.String({ description: "The pool name associated with the pool ID.", "x-auditable": true }),
        ),
      ),
      preview_id: Type.Optional(LoadBalancingIdentifier),
    }),
  }),
)

export const LoadBalancingIdResponse = named(
  "load-balancing_id_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Object({
      id: Type.Optional(LoadBalancingIdentifier),
    }),
  }),
)

export const LoadBalancingType = named(
  "load-balancing_type",
  Type.Union(
    [
      Type.Literal("http"),
      Type.Literal("https"),
      Type.Literal("tcp"),
      Type.Literal("udp_icmp"),
      Type.Literal("icmp_ping"),
      Type.Literal("smtp"),
    ],
    {
      description:
        "The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS', 'TCP', 'ICMP-PING', 'UDP-ICMP', and 'SMTP'.",
      "x-auditable": true,
    },
  ),
)

export const LoadBalancingProbeZone = named(
  "load-balancing_probe_zone",
  Type.String({
    description:
      "Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors.",
    default: "",
    "x-auditable": true,
  }),
)

export const LoadBalancingPort = named(
  "load-balancing_port",
  Type.Integer({
    description:
      "The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default 80, HTTPS: default 443).",
    "x-auditable": true,
  }),
)

export const LoadBalancingPath = named(
  "load-balancing_path",
  Type.String({
    description:
      "The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors.",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const LoadBalancingMethod = named(
  "load-balancing_method",
  Type.String({
    description:
      "The method to use for the health check. This defaults to 'GET' for HTTP/HTTPS based checks and 'connection_established' for TCP based health checks.",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const LoadBalancingInterval = named(
  "load-balancing_interval",
  Type.Integer({
    description:
      "The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations.",
    default: 60,
    "x-auditable": true,
  }),
)

export const LoadBalancingHeader = named(
  "load-balancing_header",
  Type.Record(Type.String(), Type.Array(Type.String({ "x-auditable": true }))),
)

export const LoadBalancingFollowRedirects = named(
  "load-balancing_follow_redirects",
  Type.Boolean({
    description:
      "Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors.",
    default: false,
    "x-auditable": true,
  }),
)

export const LoadBalancingExpectedCodes = named(
  "load-balancing_expected_codes",
  Type.String({
    description:
      "The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors.",
    default: "",
    "x-auditable": true,
  }),
)

export const LoadBalancingExpectedBody = named(
  "load-balancing_expected_body",
  Type.String({
    description:
      "A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitors.",
    default: "",
    "x-auditable": true,
  }),
)

export const LoadBalancingDescription = named(
  "load-balancing_description",
  Type.String({ description: "Object description.", default: "", "x-auditable": true }),
)

export const LoadBalancingConsecutiveUp = named(
  "load-balancing_consecutive_up",
  Type.Integer({
    description: "To be marked healthy the monitored origin must pass this healthcheck N consecutive times.",
    "x-auditable": true,
  }),
)

export const LoadBalancingConsecutiveDown = named(
  "load-balancing_consecutive_down",
  Type.Integer({
    description: "To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.",
    "x-auditable": true,
  }),
)

export const LoadBalancingAllowInsecure = named(
  "load-balancing_allow_insecure",
  Type.Boolean({
    description:
      "Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.",
    default: false,
    "x-auditable": true,
  }),
)

export const LoadBalancingMonitor = named(
  "load-balancing_monitor",
  Type.Object({
    allow_insecure: Type.Optional(LoadBalancingAllowInsecure),
    consecutive_down: Type.Optional(LoadBalancingConsecutiveDown),
    consecutive_up: Type.Optional(LoadBalancingConsecutiveUp),
    description: Type.Optional(LoadBalancingDescription),
    expected_body: Type.Optional(LoadBalancingExpectedBody),
    expected_codes: Type.Optional(LoadBalancingExpectedCodes),
    follow_redirects: Type.Optional(LoadBalancingFollowRedirects),
    header: Type.Optional(LoadBalancingHeader),
    interval: Type.Optional(LoadBalancingInterval),
    method: Type.Optional(LoadBalancingMethod),
    path: Type.Optional(LoadBalancingPath),
    port: Type.Optional(LoadBalancingPort),
    probe_zone: Type.Optional(LoadBalancingProbeZone),
    retries: Type.Optional(SmartshieldRetries),
    timeout: Type.Optional(SmartshieldTimeout),
    type: Type.Optional(LoadBalancingType),
    created_on: Type.Optional(LoadBalancingTimestamp),
    id: Type.Optional(LoadBalancingIdentifier),
    modified_on: Type.Optional(LoadBalancingTimestamp),
  }),
)

export const LoadBalancingMonitorResponseSingle = named(
  "load-balancing_monitor-response-single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: LoadBalancingMonitor,
  }),
)

export const LoadBalancingMonitorEditable = named(
  "load-balancing_monitor-editable",
  Type.Object({
    allow_insecure: Type.Optional(LoadBalancingAllowInsecure),
    consecutive_down: Type.Optional(LoadBalancingConsecutiveDown),
    consecutive_up: Type.Optional(LoadBalancingConsecutiveUp),
    description: Type.Optional(LoadBalancingDescription),
    expected_body: Type.Optional(LoadBalancingExpectedBody),
    expected_codes: Type.Optional(LoadBalancingExpectedCodes),
    follow_redirects: Type.Optional(LoadBalancingFollowRedirects),
    header: Type.Optional(LoadBalancingHeader),
    interval: Type.Optional(LoadBalancingInterval),
    method: Type.Optional(LoadBalancingMethod),
    path: Type.Optional(LoadBalancingPath),
    port: Type.Optional(LoadBalancingPort),
    probe_zone: Type.Optional(LoadBalancingProbeZone),
    retries: Type.Optional(SmartshieldRetries),
    timeout: Type.Optional(SmartshieldTimeout),
    type: Type.Optional(LoadBalancingType),
  }),
)

export const LoadBalancingMonitorResponseCollection = named(
  "load-balancing_monitor-response-collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(LoadBalancingResultInfo),
    result: Type.Array(LoadBalancingMonitor),
  }),
)

export const IntelResultInfo = named(
  "intel_result_info",
  Type.Object({
    count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
    page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
    per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
    total_count: Type.Optional(Type.Number({ description: "Total results available without any search parameters." })),
  }),
)

export const SecurityCenterApiResponseCommon = named(
  "security-center_api-response-common",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const SecurityCenterApiResponseSingle = named(
  "security-center_api-response-single",
  SecurityCenterApiResponseCommon,
)

export const SecurityCenterValuecountsresponse = named(
  "security-center_valueCountsResponse",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Array(
        Type.Object({
          count: Type.Optional(Type.Integer({ "x-auditable": true })),
          value: Type.Optional(Type.String({ "x-auditable": true })),
        }),
      ),
    ),
  }),
)

export const SecurityCenterSubject = named("security-center_subject", Type.String({ "x-auditable": true }))

export const SecurityCenterSubjects = named("security-center_subjects", Type.Array(SecurityCenterSubject))

export const SecurityCenterSeverityqueryparam = named(
  "security-center_severityQueryParam",
  Type.Array(
    Type.Union([Type.Literal("low"), Type.Literal("moderate"), Type.Literal("critical")], { "x-auditable": true }),
  ),
)

export const SecurityCenterProducts = named(
  "security-center_products",
  Type.Array(Type.String({ "x-auditable": true })),
)

export const SecurityCenterIssuetype = named(
  "security-center_issueType",
  Type.Union(
    [
      Type.Literal("compliance_violation"),
      Type.Literal("email_security"),
      Type.Literal("exposed_infrastructure"),
      Type.Literal("insecure_configuration"),
      Type.Literal("weak_authentication"),
    ],
    { "x-auditable": true },
  ),
)

export const SecurityCenterIssuetypes = named("security-center_issueTypes", Type.Array(SecurityCenterIssuetype))

export const SecurityCenterIssueclass = named("security-center_issueClass", Type.String({ "x-auditable": true }))

export const SecurityCenterIssueclasses = named("security-center_issueClasses", Type.Array(SecurityCenterIssueclass))

export const SecurityCenterDismissed = named("security-center_dismissed", Type.Boolean({ "x-auditable": true }))

export const SecurityCenterPerpage = named(
  "security-center_perPage",
  Type.Integer({ description: "Number of results per page of results", minimum: 1, maximum: 1000 }),
)

export const SecurityCenterPage = named(
  "security-center_page",
  Type.Integer({ description: "Current page within paginated list of results" }),
)

export const SecurityCenterIssue = named(
  "security-center_issue",
  Type.Object({
    dismissed: Type.Optional(Type.Boolean({ "x-auditable": true })),
    id: Type.Optional(Type.String({ "x-auditable": true })),
    issue_class: Type.Optional(SecurityCenterIssueclass),
    issue_type: Type.Optional(SecurityCenterIssuetype),
    payload: Type.Optional(Type.Unknown()),
    resolve_link: Type.Optional(Type.String({ "x-auditable": true })),
    resolve_text: Type.Optional(Type.String({ "x-auditable": true })),
    severity: Type.Optional(
      Type.Union([Type.Literal("Low"), Type.Literal("Moderate"), Type.Literal("Critical")], { "x-auditable": true }),
    ),
    since: Type.Optional(Type.String({ format: "date-time", "x-auditable": true })),
    subject: Type.Optional(SecurityCenterSubject),
    timestamp: Type.Optional(Type.String({ format: "date-time", "x-auditable": true })),
  }),
)

export const SecurityCenterCount = named(
  "security-center_count",
  Type.Integer({ description: "Total number of results", "x-auditable": true }),
)

export const SecurityCenterApiResponseCommonFailure = named(
  "security-center_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const IntelIdentifier = named(
  "intel_identifier",
  Type.String({ description: "Identifier.", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const IntelAsn = named("intel_asn", Type.Integer({ "x-auditable": true }))

export const InfraSortingdirection = named(
  "infra_SortingDirection",
  Type.Union([Type.Literal("asc"), Type.Literal("desc")]),
)

export const MqApiV4Failure = named(
  "mq_api-v4-failure",
  Type.Object({
    errors: Type.Optional(MqApiV4Error),
    messages: Type.Optional(MqApiV4Message),
    success: Type.Optional(
      Type.Union([Type.Literal(false)], {
        description: "Indicates if the API call was successful or not.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const R2Errors = named("r2_errors", Type.Array(ResponseInfo))

export const R2Messages = named("r2_messages", Type.Array(Type.String()))

export const R2V4Response = named(
  "r2_v4_response",
  Type.Object({
    errors: R2Errors,
    messages: R2Messages,
    result: Type.Unknown(),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const R2AccountIdentifier = named(
  "r2_account_identifier",
  Type.String({ description: "Account ID.", maxLength: 32 }),
)

export const R2V4ResponseFailure = named(
  "r2_v4_response_failure",
  Type.Object({
    errors: R2Errors,
    messages: R2Messages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const DnsAnalyticsTimeDelta = named(
  "dns-analytics_time_delta",
  Type.Union(
    [
      Type.Literal("all"),
      Type.Literal("auto"),
      Type.Literal("year"),
      Type.Literal("quarter"),
      Type.Literal("month"),
      Type.Literal("week"),
      Type.Literal("day"),
      Type.Literal("hour"),
      Type.Literal("dekaminute"),
      Type.Literal("minute"),
    ],
    { description: "Unit of time to group data by." },
  ),
)

export const DnsAnalyticsFilters = named(
  "dns-analytics_filters",
  Type.String({ description: "Segmentation filter in 'attribute operator value' format." }),
)

export const DnsAnalyticsLimit = named(
  "dns-analytics_limit",
  Type.Integer({ description: "Limit number of returned metrics.", default: 100000 }),
)

export const DnsAnalyticsSince = named(
  "dns-analytics_since",
  Type.String({
    description: "Start date and time of requesting data period in ISO 8601 format.",
    format: "date-time",
  }),
)

export const DnsAnalyticsUntil = named(
  "dns-analytics_until",
  Type.String({ description: "End date and time of requesting data period in ISO 8601 format.", format: "date-time" }),
)

export const DnsAnalyticsReportBytime = named(
  "dns-analytics_report_bytime",
  Type.Object({
    data: Type.Array(
      Type.Object({
        dimensions: Type.Array(Type.String({ description: "Dimension value." }), {
          description:
            "Array of dimension values, representing the combination of dimension values corresponding to this row.",
        }),
        metrics: Type.Array(
          Type.Array(Type.Number({ description: "Nominal metric value." }), {
            description: "Nominal metric values, broken down by time interval.",
          }),
          {
            description:
              "Array with one item per requested metric. Each item is an array of values, broken down by time interval.",
          },
        ),
      }),
      { description: "Array with one row per combination of dimension values." },
    ),
    data_lag: Type.Number({
      description:
        "Number of seconds between current time and last processed event, in another words how many seconds of data could be missing.",
      minimum: 0,
    }),
    max: Type.Unknown({
      description:
        "Maximum results for each metric (object mapping metric names to values). Currently always an empty object.",
    }),
    min: Type.Unknown({
      description:
        "Minimum results for each metric (object mapping metric names to values). Currently always an empty object.",
    }),
    query: Type.Object({
      dimensions: Type.Array(Type.String({ description: "Dimension name." }), {
        description: "Array of dimension names.",
      }),
      filters: Type.Optional(DnsAnalyticsFilters),
      limit: DnsAnalyticsLimit,
      metrics: Type.Array(Type.String({ description: "Metric name." }), { description: "Array of metric names." }),
      since: DnsAnalyticsSince,
      sort: Type.Optional(
        Type.Array(
          Type.String({ description: "Dimension name (may be prefixed by - (descending) or + (ascending)." }),
          {
            description:
              "Array of dimensions to sort by, where each dimension may be prefixed by - (descending) or + (ascending).",
          },
        ),
      ),
      until: DnsAnalyticsUntil,
      time_delta: DnsAnalyticsTimeDelta,
    }),
    rows: Type.Number({ description: "Total number of rows in the result.", minimum: 0 }),
    totals: Type.Unknown({
      description: "Total results for metrics across all data (object mapping metric names to values).",
    }),
    time_intervals: Type.Array(
      Type.Array(Type.String({ description: "Time value.", format: "date-time" }), {
        description:
          "Array with exactly two items, representing the start and end time (respectively) of this time interval.",
      }),
      {
        description:
          "Array of time intervals in the response data. Each interval is represented as an array containing two values: the start time, and the end time.\n",
      },
    ),
  }),
)

export const DnsAnalyticsSort = named(
  "dns-analytics_sort",
  Type.String({
    description:
      "A comma-separated list of dimensions to sort by, where each dimension may be prefixed by - (descending) or + (ascending).",
  }),
)

export const DnsAnalyticsDimensions = named(
  "dns-analytics_dimensions",
  Type.String({ description: "A comma-separated list of dimensions to group results by." }),
)

export const DnsAnalyticsMetrics = named(
  "dns-analytics_metrics",
  Type.String({ description: "A comma-separated list of metrics to query." }),
)

export const DnsAnalyticsQuery = named(
  "dns-analytics_query",
  Type.Object({
    dimensions: Type.Array(Type.String({ description: "Dimension name." }), {
      description: "Array of dimension names.",
    }),
    filters: Type.Optional(DnsAnalyticsFilters),
    limit: DnsAnalyticsLimit,
    metrics: Type.Array(Type.String({ description: "Metric name." }), { description: "Array of metric names." }),
    since: DnsAnalyticsSince,
    sort: Type.Optional(
      Type.Array(Type.String({ description: "Dimension name (may be prefixed by - (descending) or + (ascending)." }), {
        description:
          "Array of dimensions to sort by, where each dimension may be prefixed by - (descending) or + (ascending).",
      }),
    ),
    until: DnsAnalyticsUntil,
  }),
)

export const DnsAnalyticsReport = named(
  "dns-analytics_report",
  Type.Object({
    data: Type.Array(
      Type.Object({
        dimensions: Type.Array(Type.String({ description: "Dimension value." }), {
          description:
            "Array of dimension values, representing the combination of dimension values corresponding to this row.",
        }),
        metrics: Type.Array(Type.Number({ description: "Nominal metric value." }), {
          description: "Array with one item per requested metric. Each item is a single value.",
        }),
      }),
      { description: "Array with one row per combination of dimension values." },
    ),
    data_lag: Type.Number({
      description:
        "Number of seconds between current time and last processed event, in another words how many seconds of data could be missing.",
      minimum: 0,
    }),
    max: Type.Unknown({
      description:
        "Maximum results for each metric (object mapping metric names to values). Currently always an empty object.",
    }),
    min: Type.Unknown({
      description:
        "Minimum results for each metric (object mapping metric names to values). Currently always an empty object.",
    }),
    query: DnsAnalyticsQuery,
    rows: Type.Number({ description: "Total number of rows in the result.", minimum: 0 }),
    totals: Type.Unknown({
      description: "Total results for metrics across all data (object mapping metric names to values).",
    }),
  }),
)

export const DlpEmpty = named("dlp_Empty", Type.Union([Type.Unknown(), Type.Null()]))

export const DlpApiResponseCommonFailure = named(
  "dlp_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const MagicTransitUuid = named("magic-transit_uuid", Type.String({ description: "UUID.", maxLength: 36 }))

export const TeamsDevicesIdentifier = named("teams-devices_identifier", Type.String())

export const D1AccountIdentifier = named(
  "d1_account-identifier",
  Type.String({ description: "Account identifier tag.", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const InfraAccounttag = named(
  "infra_AccountTag",
  Type.String({ description: "Account identifier", maxLength: 32, title: "account_id" }),
)

export const InfraApiResponseCommonFailure = named(
  "infra_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const TunnelTunnelToken = named(
  "tunnel_tunnel_token",
  Type.String({
    description: "The Tunnel Token is used as a mechanism to authenticate the operation of a tunnel.",
    readOnly: true,
    "x-sensitive": true,
  }),
)

export const TunnelTunnelResponseToken = named(
  "tunnel_tunnel_response_token",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: TunnelTunnelToken,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const TunnelVersion = named(
  "tunnel_version",
  Type.String({ description: "The cloudflared version used to establish this connection." }),
)

export const TunnelConnectionId = named(
  "tunnel_connection_id",
  Type.String({
    description: "UUID of the Cloudflare Tunnel connection.",
    format: "uuid",
    maxLength: 36,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TunnelClientId = named(
  "tunnel_client_id",
  Type.String({
    description: "UUID of the Cloudflare Tunnel connector.",
    format: "uuid",
    maxLength: 36,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TunnelColoName = named(
  "tunnel_colo_name",
  Type.String({ description: "The Cloudflare data center used for this connection." }),
)

export const TunnelIsPendingReconnect = named(
  "tunnel_is_pending_reconnect",
  Type.Boolean({
    description:
      "Cloudflare continues to track connections for several minutes after they disconnect. This is an optimization to improve latency and reliability of reconnecting.  If `true`, the connection has disconnected but is still being tracked. If `false`, the connection is actively serving traffic.",
  }),
)

export const TunnelSchemasConnection = named(
  "tunnel_schemas-connection",
  Type.Object({
    client_id: Type.Optional(TunnelClientId),
    client_version: Type.Optional(TunnelVersion),
    colo_name: Type.Optional(TunnelColoName),
    id: Type.Optional(TunnelConnectionId),
    is_pending_reconnect: Type.Optional(TunnelIsPendingReconnect),
    opened_at: Type.Optional(
      Type.String({ description: "Timestamp of when the connection was established.", format: "date-time" }),
    ),
    origin_ip: Type.Optional(TunnelIp),
    uuid: Type.Optional(TunnelConnectionId),
  }),
)

export const TunnelAccountId = named(
  "tunnel_account_id",
  Type.String({ description: "Cloudflare account ID", maxLength: 32, "x-auditable": true }),
)

export const TunnelConfigSrc = named(
  "tunnel_config_src",
  Type.Union([Type.Literal("local"), Type.Literal("cloudflare")], {
    description:
      "Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `cloudflare`, manage the tunnel on the Zero Trust dashboard.",
  }),
)

export const TunnelConnectionsDeprecated = named(
  "tunnel_connections_deprecated",
  Type.Array(TunnelSchemasConnection, {
    description: "The Cloudflare Tunnel connections between your origin and Cloudflare's edge.",
    deprecated: true,
    "x-stainless-deprecation-message":
      "This field will start returning an empty array. To fetch the connections of a given tunnel, please use the dedicated endpoint `/accounts/{account_id}/{tunnel_type}/{tunnel_id}/connections`",
  }),
)

export const TunnelConnsActiveAt = named(
  "tunnel_conns_active_at",
  Type.String({
    description:
      "Timestamp of when the tunnel established at least one connection to Cloudflare's edge. If `null`, the tunnel is inactive.",
    format: "date-time",
  }),
)

export const TunnelConnsInactiveAt = named(
  "tunnel_conns_inactive_at",
  Type.String({
    description:
      "Timestamp of when the tunnel became inactive (no connections to Cloudflare's edge). If `null`, the tunnel is active.",
    format: "date-time",
  }),
)

export const TunnelMetadata = named(
  "tunnel_metadata",
  Type.Unknown({ description: "Metadata associated with the tunnel." }),
)

export const TunnelRemoteConfig = named(
  "tunnel_remote_config",
  Type.Boolean({
    description:
      "If `true`, the tunnel can be configured remotely from the Zero Trust dashboard. If `false`, the tunnel must be configured locally on the origin machine.",
    deprecated: true,
    "x-auditable": true,
    "x-stainless-deprecation-message": "Use the config_src field instead.",
    "x-stainless-ignore": true,
  }),
)

export const TunnelStatus = named(
  "tunnel_status",
  Type.Union([Type.Literal("inactive"), Type.Literal("degraded"), Type.Literal("healthy"), Type.Literal("down")], {
    description:
      "The status of the tunnel. Valid values are `inactive` (tunnel has never been run), `degraded` (tunnel is active and able to serve traffic but in an unhealthy state), `healthy` (tunnel is active and able to serve traffic), or `down` (tunnel can not serve traffic as it has no connections to the Cloudflare Edge).",
  }),
)

export const TunnelCfdTunnel = named(
  "tunnel_cfd_tunnel",
  Type.Object(
    {
      account_tag: Type.Optional(TunnelAccountId),
      config_src: Type.Optional(TunnelConfigSrc),
      connections: Type.Optional(TunnelConnectionsDeprecated),
      conns_active_at: Type.Optional(TunnelConnsActiveAt),
      conns_inactive_at: Type.Optional(TunnelConnsInactiveAt),
      created_at: Type.Optional(TunnelCreatedAt),
      deleted_at: Type.Optional(TunnelDeletedAt),
      id: Type.Optional(TunnelTunnelId),
      metadata: Type.Optional(TunnelMetadata),
      name: Type.Optional(TunnelTunnelName),
      remote_config: Type.Optional(TunnelRemoteConfig),
      status: Type.Optional(TunnelStatus),
      tun_type: Type.Optional(TunnelTunnelType),
    },
    { description: "A Cloudflare Tunnel that connects your origin to Cloudflare's edge." },
  ),
)

export const TunnelWarpConnectorTunnel = named(
  "tunnel_warp_connector_tunnel",
  Type.Object(
    {
      account_tag: Type.Optional(TunnelAccountId),
      connections: Type.Optional(TunnelConnectionsDeprecated),
      conns_active_at: Type.Optional(TunnelConnsActiveAt),
      conns_inactive_at: Type.Optional(TunnelConnsInactiveAt),
      created_at: Type.Optional(TunnelCreatedAt),
      deleted_at: Type.Optional(TunnelDeletedAt),
      id: Type.Optional(TunnelTunnelId),
      metadata: Type.Optional(TunnelMetadata),
      name: Type.Optional(TunnelTunnelName),
      status: Type.Optional(TunnelStatus),
      tun_type: Type.Optional(TunnelTunnelType),
    },
    { description: "A Warp Connector Tunnel that connects your origin to Cloudflare's edge." },
  ),
)

export const TunnelTunnelResponseSingle = named(
  "tunnel_tunnel-response-single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([TunnelCfdTunnel, TunnelWarpConnectorTunnel]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const TunnelTunnelSecret = named(
  "tunnel_tunnel_secret",
  Type.String({
    description:
      "Sets the password required to run a locally-managed tunnel. Must be at least 32 bytes and encoded as a base64 string.",
    "x-sensitive": true,
  }),
)

export const TunnelPerPage = named(
  "tunnel_per_page",
  Type.Number({ description: "Number of results to display.", minimum: 1, maximum: 1000 }),
)

export const TunnelExistedAt = named(
  "tunnel_existed_at",
  Type.String({
    description:
      "If provided, include only resources that were created (and not deleted) before this time. URL encoded.",
    format: "url-encoded-date-time",
  }),
)

export const TunnelTunnelResponseCollection = named(
  "tunnel_tunnel-response-collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(Type.Union([TunnelCfdTunnel, TunnelWarpConnectorTunnel])), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: Type.Optional(IamResultInfo),
  }),
)

export const CallsAccountIdentifier = named(
  "calls_account_identifier",
  Type.String({ description: "The account identifier tag.", maxLength: 32, "x-auditable": true }),
)

export const BrandProtectionApiError = named(
  "brand-protection-api_Error",
  Type.Object({
    code: Type.Optional(Type.Integer({ description: "Error code" })),
    errors: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    message: Type.Optional(Type.String({ description: "Error message" })),
    status: Type.Optional(Type.String({ description: "Error name" })),
  }),
)

export const DosApiResponseCommonFailure = named(
  "dos_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const BillSubsApiBillingResponseSingle = named(
  "bill-subs-api_billing_response_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      account_type: Type.Optional(Type.String()),
      address: Type.Optional(Type.String()),
      address2: Type.Optional(Type.String()),
      balance: Type.Optional(Type.String()),
      card_expiry_month: Type.Optional(Type.Integer()),
      card_expiry_year: Type.Optional(Type.Integer()),
      card_number: Type.Optional(Type.String()),
      city: Type.Optional(Type.String()),
      company: Type.Optional(Type.String()),
      country: Type.Optional(Type.String()),
      created_on: Type.Optional(Type.String({ format: "date-time", readOnly: true })),
      device_data: Type.Optional(Type.String()),
      edited_on: Type.Optional(Type.String({ format: "date-time" })),
      enterprise_billing_email: Type.Optional(Type.String({ "x-auditable": true })),
      enterprise_primary_email: Type.Optional(Type.String({ "x-auditable": true })),
      first_name: Type.Optional(Type.String()),
      id: Type.Optional(BillSubsApiComponentsSchemasIdentifier),
      is_partner: Type.Optional(Type.Boolean()),
      last_name: Type.Optional(Type.String()),
      next_bill_date: Type.Optional(Type.String({ format: "date-time" })),
      payment_address: Type.Optional(Type.String()),
      payment_address2: Type.Optional(Type.String()),
      payment_city: Type.Optional(Type.String()),
      payment_country: Type.Optional(Type.String()),
      payment_email: Type.Optional(Type.String()),
      payment_first_name: Type.Optional(Type.String()),
      payment_gateway: Type.Optional(Type.String()),
      payment_last_name: Type.Optional(Type.String()),
      payment_nonce: Type.Optional(Type.String()),
      payment_state: Type.Optional(Type.String()),
      payment_zipcode: Type.Optional(Type.String()),
      primary_email: Type.Optional(Type.String({ "x-auditable": true })),
      state: Type.Optional(Type.String()),
      tax_id_type: Type.Optional(Type.String()),
      telephone: Type.Optional(Type.String()),
      use_legacy: Type.Optional(Type.Boolean()),
      validation_code: Type.Optional(Type.String()),
      vat: Type.Optional(Type.String()),
      zipcode: Type.Optional(Type.String()),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const AaaIdentifier = named(
  "aaa_identifier",
  Type.String({ description: "Identifier", maxLength: 32, readOnly: true }),
)

export const AaaAuditLogs = named(
  "aaa_audit-logs",
  Type.Object({
    action: Type.Optional(
      Type.Object({
        result: Type.Optional(
          Type.Boolean({ description: "A boolean that indicates if the action attempted was successful." }),
        ),
        type: Type.Optional(
          Type.String({ description: "A short string that describes the action that was performed." }),
        ),
      }),
    ),
    actor: Type.Optional(
      Type.Object({
        email: Type.Optional(
          Type.String({ description: "The email of the user that performed the action.", format: "email" }),
        ),
        id: Type.Optional(
          Type.String({
            description:
              "The ID of the actor that performed the action. If a user performed the action, this will be their User ID.",
          }),
        ),
        ip: Type.Optional(Type.String({ description: "The IP address of the request that performed the action." })),
        type: Type.Optional(
          Type.Union([Type.Literal("user"), Type.Literal("admin"), Type.Literal("Cloudflare")], {
            description: "The type of actor, whether a User, Cloudflare Admin, or an Automated System.",
          }),
        ),
      }),
    ),
    id: Type.Optional(Type.String({ description: "A string that uniquely identifies the audit log." })),
    interface: Type.Optional(Type.String({ description: "The source of the event." })),
    metadata: Type.Optional(
      Type.Unknown({
        description:
          "An object which can lend more context to the action being logged. This is a flexible value and varies between different actions.",
      }),
    ),
    newValue: Type.Optional(Type.String({ description: "The new value of the resource that was modified." })),
    oldValue: Type.Optional(Type.String({ description: "The value of the resource before it was modified." })),
    owner: Type.Optional(
      Type.Object({
        id: Type.Optional(AaaIdentifier),
      }),
    ),
    resource: Type.Optional(
      Type.Object({
        id: Type.Optional(
          Type.String({ description: "An identifier for the resource that was affected by the action." }),
        ),
        type: Type.Optional(
          Type.String({ description: "A short string that describes the resource that was affected by the action." }),
        ),
      }),
    ),
    when: Type.Optional(
      Type.String({
        description: "A UTC RFC3339 timestamp that specifies when the action being logged occured.",
        format: "date-time",
      }),
    ),
  }),
)

export const AaaApiResponseCommon = named(
  "aaa_api-response-common",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const Result = named(
  "result",
  Type.Union([
    Type.Object({
      errors: Type.Optional(D1Messages),
      messages: Type.Optional(D1Messages),
      result: Type.Optional(Type.Array(AaaAuditLogs)),
      success: Type.Optional(Type.Boolean()),
    }),
    AaaApiResponseCommon,
  ]),
)

export const AaaAuditLogsResponseCollection = named(
  "aaa_audit_logs_response_collection",
  Type.Union([
    Type.Object({
      errors: Type.Optional(D1Messages),
      messages: Type.Optional(D1Messages),
      result: Type.Optional(Type.Array(AaaAuditLogs)),
      success: Type.Optional(Type.Boolean()),
    }),
    AaaApiResponseCommon,
  ]),
)

export const AccessClientSecret = named(
  "access_client_secret",
  Type.String({
    description:
      "The Client Secret for the service token. Access will check for this value in the `CF-Access-Client-Secret` request header.",
    "x-sensitive": true,
  }),
)

export const AccessCreateResponse = named(
  "access_create_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        client_id: Type.Optional(AccessClientId),
        client_secret: Type.Optional(AccessClientSecret),
        created_at: Type.Optional(AccessCreatedAt),
        duration: Type.Optional(AccessDuration),
        id: Type.Optional(Type.String({ description: "The ID of the service token." })),
        name: Type.Optional(AccessSchemasName),
        updated_at: Type.Optional(AccessCreatedAt),
      }),
    ),
  }),
)

export const AccessSchemasSingleResponse = named(
  "access_schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessServiceTokens),
  }),
)

export const AccessIdResponse = named(
  "access_id_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        id: Type.Optional(AccessUuid),
      }),
    ),
  }),
)

export const AccessApiResponseCommonFailure = named(
  "access_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const AccessAppPoliciesComponentsSchemasResponseCollection = named(
  "access_app-policies_components-schemas-response_collection",
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
    result: Type.Optional(Type.Array(AccessAppPolicyResponse)),
  }),
)

export const IamApiResponseSingleId = named(
  "iam_api-response-single-id",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Union([
        Type.Object({
          id: IamCommonComponentsSchemasIdentifier,
        }),
        Type.Null(),
      ]),
    ),
  }),
)

export const IamAccountIdentifier = named("iam_account_identifier", IamCommonComponentsSchemasIdentifier)

export const OrganizationsApiV4errorresponse = named(
  "organizations-api_V4ErrorResponse",
  Type.Object({
    error: Type.Array(EmailSecurityMessage),
    messages: Type.Array(EmailSecurityMessage),
    result: Type.Optional(Type.Unknown()),
    success: Type.Union([Type.Literal(false)]),
  }),
)

export const IamApiResponseCommonFailure = named(
  "iam_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  AaaTimestamp,
  DlpMessages,
  IntelAsn,
  SecurityCenterDismissed,
  WaitingroomAdditionalRoutes,
  WaitingroomCookieAttributes,
  WaitingroomCookieSuffix,
  WaitingroomCustomPageHtml,
  WaitingroomDefaultTemplateLanguage,
  WaitingroomDescription,
  WaitingroomDisableSessionRenewal,
  WaitingroomEnabledOriginCommands,
  WaitingroomHost,
  WaitingroomJsonResponseEnabled,
  WaitingroomName,
  WaitingroomNewUsersPerMinute,
  WaitingroomPath,
  WaitingroomQueueAll,
  WaitingroomQueueingMethod,
  WaitingroomQueueingStatusCode,
  WaitingroomSessionDuration,
  WaitingroomSuspended,
  WaitingroomTotalActiveUsers,
  WaitingroomTurnstileAction,
  WaitingroomTurnstileMode,
  WaitingroomWaitingRoomId,
  WaitingroomWaitingroom,
} from "../shared/schemas"

export const WaitingroomStatus = named(
  "waitingroom_status",
  Type.Union(
    [
      Type.Literal("event_prequeueing"),
      Type.Literal("not_queueing"),
      Type.Literal("queueing"),
      Type.Literal("suspended"),
    ],
    { "x-auditable": true },
  ),
)

export const WaitingroomEventId = named("waitingroom_event_id", Type.String({ "x-auditable": true }))

export const WaitingroomStatusResponse = named(
  "waitingroom_status_response",
  Type.Object({
    result: Type.Object({
      estimated_queued_users: Type.Optional(IntelAsn),
      estimated_total_active_users: Type.Optional(IntelAsn),
      event_id: Type.Optional(WaitingroomEventId),
      max_estimated_time_minutes: Type.Optional(IntelAsn),
      status: Type.Optional(WaitingroomStatus),
    }),
  }),
)

export const WaitingroomRuleId = named(
  "waitingroom_rule_id",
  Type.String({ description: "The ID of the rule.", "x-auditable": true }),
)

export const WaitingroomRuleAction = named(
  "waitingroom_rule_action",
  Type.Union([Type.Literal("bypass_waiting_room")], {
    description: "The action to take when the expression matches.",
    "x-auditable": true,
  }),
)

export const WaitingroomRuleDescription = named(
  "waitingroom_rule_description",
  Type.String({ description: "The description of the rule.", default: "", "x-auditable": true }),
)

export const WaitingroomRuleEnabled = named(
  "waitingroom_rule_enabled",
  Type.Boolean({ description: "When set to true, the rule is enabled.", default: true, "x-auditable": true }),
)

export const WaitingroomRuleExpression = named(
  "waitingroom_rule_expression",
  Type.String({ description: "Criteria defining when there is a match for the current rule.", "x-auditable": true }),
)

export const WaitingroomRulePosition = named(
  "waitingroom_rule_position",
  Type.Union(
    [
      Type.Object({
        index: Type.Optional(
          Type.Integer({
            description:
              "Places the rule in the exact position specified by the integer number <POSITION_NUMBER>. Position numbers start with 1. Existing rules in the ruleset from the specified position number onward are shifted one position (no rule is overwritten).",
            "x-auditable": true,
          }),
        ),
      }),
      Type.Object({
        before: Type.Optional(
          Type.String({
            description:
              'Places the rule before rule <RULE_ID>. Use this argument with an empty rule ID value ("") to set the rule as the first rule in the ruleset.',
            "x-auditable": true,
          }),
        ),
      }),
      Type.Object({
        after: Type.Optional(
          Type.String({
            description:
              'Places the rule after rule <RULE_ID>. Use this argument with an empty rule ID value ("") to set the rule as the last rule in the ruleset.',
            "x-auditable": true,
          }),
        ),
      }),
    ],
    { description: "Reorder the position of a rule" },
  ),
)

export const WaitingroomPatchRule = named(
  "waitingroom_patch_rule",
  Type.Object({
    action: WaitingroomRuleAction,
    description: Type.Optional(WaitingroomRuleDescription),
    enabled: Type.Optional(WaitingroomRuleEnabled),
    expression: WaitingroomRuleExpression,
    position: Type.Optional(WaitingroomRulePosition),
  }),
)

export const WaitingroomCreateRule = named(
  "waitingroom_create_rule",
  Type.Object({
    action: WaitingroomRuleAction,
    description: Type.Optional(WaitingroomRuleDescription),
    enabled: Type.Optional(WaitingroomRuleEnabled),
    expression: WaitingroomRuleExpression,
  }),
)

export const WaitingroomUpdateRules = named("waitingroom_update_rules", Type.Array(WaitingroomCreateRule))

export const WaitingroomRuleVersion = named(
  "waitingroom_rule_version",
  Type.String({ description: "The version of the rule.", "x-auditable": true }),
)

export const WaitingroomRuleResult = named(
  "waitingroom_rule_result",
  Type.Object({
    action: Type.Optional(WaitingroomRuleAction),
    description: Type.Optional(WaitingroomRuleDescription),
    enabled: Type.Optional(WaitingroomRuleEnabled),
    expression: Type.Optional(WaitingroomRuleExpression),
    id: Type.Optional(WaitingroomRuleId),
    last_updated: Type.Optional(AaaTimestamp),
    version: Type.Optional(WaitingroomRuleVersion),
  }),
)

export const UnnamedSchemaRefF1c0ba8f44601f2db2e07b9397b6c430 = named(
  "unnamed_schema_ref_f1c0ba8f44601f2db2e07b9397b6c430",
  Type.Union([Type.Null()]),
)

export const WaitingroomRulesResponseCollection = named(
  "waitingroom_rules_response_collection",
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
    result: Type.Optional(Type.Array(WaitingroomRuleResult)),
  }),
)

export const WaitingroomEventSuspended = named(
  "waitingroom_event_suspended",
  Type.Boolean({
    description:
      "Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration.",
    default: false,
    "x-auditable": true,
  }),
)

export const WaitingroomEventShuffleAtEventStart = named(
  "waitingroom_event_shuffle_at_event_start",
  Type.Boolean({
    description:
      "If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the event prequeue at the same time and you want to shuffle them to ensure fairness. Naturally, it makes the most sense to enable this feature when the `queueing_method` during the event respects ordering such as **fifo**, or else the shuffling may be unnecessary.",
    default: false,
    "x-auditable": true,
  }),
)

export const WaitingroomEventDetailsQueueingMethod = named(
  "waitingroom_event_details_queueing_method",
  Type.String({ "x-auditable": true }),
)

export const WaitingroomEventPrequeueStartTime = named(
  "waitingroom_event_prequeue_start_time",
  Type.Union([
    Type.String({
      description:
        "An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`.",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const WaitingroomEventName = named(
  "waitingroom_event_name",
  Type.String({
    description:
      "A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.",
    "x-auditable": true,
  }),
)

export const WaitingroomEventStartTime = named(
  "waitingroom_event_start_time",
  Type.String({
    description:
      "An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time`.",
    "x-auditable": true,
  }),
)

export const WaitingroomEventEndTime = named(
  "waitingroom_event_end_time",
  Type.String({ description: "An ISO 8601 timestamp that marks the end of the event.", "x-auditable": true }),
)

export const WaitingroomEventDescription = named(
  "waitingroom_event_description",
  Type.String({
    description: "A note that you can use to add more details about the event.",
    default: "",
    "x-auditable": true,
  }),
)

export const WaitingroomEventDetailsCustomPageHtml = named(
  "waitingroom_event_details_custom_page_html",
  Type.String({ "x-auditable": true }),
)

export const WaitingroomEventDetailsResult = named(
  "waitingroom_event_details_result",
  Type.Object({
    created_on: Type.Optional(AaaTimestamp),
    custom_page_html: Type.Optional(WaitingroomEventDetailsCustomPageHtml),
    description: Type.Optional(WaitingroomEventDescription),
    disable_session_renewal: Type.Optional(SecurityCenterDismissed),
    event_end_time: Type.Optional(WaitingroomEventEndTime),
    event_start_time: Type.Optional(WaitingroomEventStartTime),
    id: Type.Optional(WaitingroomEventId),
    modified_on: Type.Optional(AaaTimestamp),
    name: Type.Optional(WaitingroomEventName),
    new_users_per_minute: Type.Optional(IntelAsn),
    prequeue_start_time: Type.Optional(WaitingroomEventPrequeueStartTime),
    queueing_method: Type.Optional(WaitingroomEventDetailsQueueingMethod),
    session_duration: Type.Optional(IntelAsn),
    shuffle_at_event_start: Type.Optional(WaitingroomEventShuffleAtEventStart),
    suspended: Type.Optional(WaitingroomEventSuspended),
    total_active_users: Type.Optional(IntelAsn),
  }),
)

export const WaitingroomEventDetailsResponse = named(
  "waitingroom_event_details_response",
  Type.Object({
    result: WaitingroomEventDetailsResult,
  }),
)

export const WaitingroomEventIdResponse = named(
  "waitingroom_event_id_response",
  Type.Object({
    result: Type.Object({
      id: Type.Optional(WaitingroomEventId),
    }),
  }),
)

export const WaitingroomEventCustomPageHtml = named(
  "waitingroom_event_custom_page_html",
  Type.Union([
    Type.String({
      description:
        "If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it.",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const WaitingroomEventDisableSessionRenewal = named(
  "waitingroom_event_disable_session_renewal",
  Type.Union([
    Type.Boolean({
      description:
        "If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it.",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const WaitingroomEventNewUsersPerMinute = named(
  "waitingroom_event_new_users_per_minute",
  Type.Union([
    Type.Integer({
      description:
        "If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` property is also set.",
      minimum: 200,
      maximum: 2147483647,
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const WaitingroomEventQueueingMethod = named(
  "waitingroom_event_queueing_method",
  Type.Union([
    Type.String({
      description:
        "If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it.",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const WaitingroomEventSessionDuration = named(
  "waitingroom_event_session_duration",
  Type.Union([
    Type.Integer({
      description:
        "If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it.",
      minimum: 1,
      maximum: 30,
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const WaitingroomEventTotalActiveUsers = named(
  "waitingroom_event_total_active_users",
  Type.Union([
    Type.Integer({
      description:
        "If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_minute` property is also set.",
      minimum: 200,
      maximum: 2147483647,
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const WaitingroomEventTurnstileAction = named(
  "waitingroom_event_turnstile_action",
  Type.Union([Type.Literal("log"), Type.Literal("infinite_queue")], {
    description:
      "If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it.",
    "x-auditable": true,
  }),
)

export const WaitingroomEventTurnstileMode = named(
  "waitingroom_event_turnstile_mode",
  Type.Union(
    [
      Type.Literal("off"),
      Type.Literal("invisible"),
      Type.Literal("visible_non_interactive"),
      Type.Literal("visible_managed"),
    ],
    {
      description:
        "If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it.",
      "x-auditable": true,
    },
  ),
)

export const UnnamedSchemaRef229c159575bc68a9c21f5a1615629cf6 = named(
  "unnamed_schema_ref_229c159575bc68a9c21f5a1615629cf6",
  Type.Union([Type.Null()]),
)

export const WaitingroomEventResult = named(
  "waitingroom_event_result",
  Type.Object({
    created_on: Type.Optional(AaaTimestamp),
    custom_page_html: Type.Optional(WaitingroomEventCustomPageHtml),
    description: Type.Optional(WaitingroomEventDescription),
    disable_session_renewal: Type.Optional(WaitingroomEventDisableSessionRenewal),
    event_end_time: Type.Optional(WaitingroomEventEndTime),
    event_start_time: Type.Optional(WaitingroomEventStartTime),
    id: Type.Optional(WaitingroomEventId),
    modified_on: Type.Optional(AaaTimestamp),
    name: Type.Optional(WaitingroomEventName),
    new_users_per_minute: Type.Optional(WaitingroomEventNewUsersPerMinute),
    prequeue_start_time: Type.Optional(WaitingroomEventPrequeueStartTime),
    queueing_method: Type.Optional(WaitingroomEventQueueingMethod),
    session_duration: Type.Optional(WaitingroomEventSessionDuration),
    shuffle_at_event_start: Type.Optional(WaitingroomEventShuffleAtEventStart),
    suspended: Type.Optional(WaitingroomEventSuspended),
    total_active_users: Type.Optional(WaitingroomEventTotalActiveUsers),
    turnstile_action: Type.Optional(WaitingroomEventTurnstileAction),
    turnstile_mode: Type.Optional(WaitingroomEventTurnstileMode),
  }),
)

export const WaitingroomEventResponse = named(
  "waitingroom_event_response",
  Type.Object({
    result: WaitingroomEventResult,
  }),
)

export const WaitingroomQueryEvent = named(
  "waitingroom_query_event",
  Type.Object({
    custom_page_html: Type.Optional(WaitingroomEventCustomPageHtml),
    description: Type.Optional(WaitingroomEventDescription),
    disable_session_renewal: Type.Optional(WaitingroomEventDisableSessionRenewal),
    event_end_time: WaitingroomEventEndTime,
    event_start_time: WaitingroomEventStartTime,
    name: WaitingroomEventName,
    new_users_per_minute: Type.Optional(WaitingroomEventNewUsersPerMinute),
    prequeue_start_time: Type.Optional(WaitingroomEventPrequeueStartTime),
    queueing_method: Type.Optional(WaitingroomEventQueueingMethod),
    session_duration: Type.Optional(WaitingroomEventSessionDuration),
    shuffle_at_event_start: Type.Optional(WaitingroomEventShuffleAtEventStart),
    suspended: Type.Optional(WaitingroomEventSuspended),
    total_active_users: Type.Optional(WaitingroomEventTotalActiveUsers),
    turnstile_action: Type.Optional(WaitingroomEventTurnstileAction),
    turnstile_mode: Type.Optional(WaitingroomEventTurnstileMode),
  }),
)

export const WaitingroomEventResponseCollection = named(
  "waitingroom_event_response_collection",
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
    result: Type.Optional(Type.Array(WaitingroomEventResult)),
  }),
)

export const WaitingroomWaitingRoomIdResponse = named(
  "waitingroom_waiting_room_id_response",
  Type.Object({
    result: Type.Object({
      id: Type.Optional(WaitingroomWaitingRoomId),
    }),
  }),
)

export const WaitingroomSearchEngineCrawlerBypass = named(
  "waitingroom_search_engine_crawler_bypass",
  Type.Boolean({
    description:
      "Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone.\nVerified search engine crawlers will not be tracked or counted by the waiting room system,\nand will not appear in waiting room analytics.\n",
    default: false,
    "x-auditable": true,
  }),
)

export const WaitingroomZoneSettings = named(
  "waitingroom_zone_settings",
  Type.Object({
    search_engine_crawler_bypass: Type.Optional(WaitingroomSearchEngineCrawlerBypass),
  }),
)

export const WaitingRoomSetting = named("waiting_room_setting", Type.Union([Type.Null()]))

export const WaitingroomZoneSettingsResponse = named(
  "waitingroom_zone_settings_response",
  Type.Object({
    result: Type.Object({
      search_engine_crawler_bypass: WaitingroomSearchEngineCrawlerBypass,
    }),
  }),
)

export const WaitingroomPreviewUrl = named(
  "waitingroom_preview_url",
  Type.String({
    description: "URL where the custom waiting room page can temporarily be previewed.",
    "x-auditable": true,
  }),
)

export const WaitingroomPreviewResponse = named(
  "waitingroom_preview_response",
  Type.Object({
    result: Type.Object({
      preview_url: Type.Optional(WaitingroomPreviewUrl),
    }),
  }),
)

export const WaitingroomQueryPreview = named(
  "waitingroom_query_preview",
  Type.Object({
    custom_html: WaitingroomCustomPageHtml,
  }),
)

export const WaitingroomSingleResponse = named(
  "waitingroom_single_response",
  Type.Object({
    result: WaitingroomWaitingroom,
  }),
)

export const WaitingroomQueryWaitingroom = named(
  "waitingroom_query_waitingroom",
  Type.Object({
    additional_routes: Type.Optional(WaitingroomAdditionalRoutes),
    cookie_attributes: Type.Optional(WaitingroomCookieAttributes),
    cookie_suffix: Type.Optional(WaitingroomCookieSuffix),
    custom_page_html: Type.Optional(WaitingroomCustomPageHtml),
    default_template_language: Type.Optional(WaitingroomDefaultTemplateLanguage),
    description: Type.Optional(WaitingroomDescription),
    disable_session_renewal: Type.Optional(WaitingroomDisableSessionRenewal),
    enabled_origin_commands: Type.Optional(WaitingroomEnabledOriginCommands),
    host: WaitingroomHost,
    json_response_enabled: Type.Optional(WaitingroomJsonResponseEnabled),
    name: WaitingroomName,
    new_users_per_minute: WaitingroomNewUsersPerMinute,
    path: Type.Optional(WaitingroomPath),
    queue_all: Type.Optional(WaitingroomQueueAll),
    queueing_method: Type.Optional(WaitingroomQueueingMethod),
    queueing_status_code: Type.Optional(WaitingroomQueueingStatusCode),
    session_duration: Type.Optional(WaitingroomSessionDuration),
    suspended: Type.Optional(WaitingroomSuspended),
    total_active_users: WaitingroomTotalActiveUsers,
    turnstile_action: Type.Optional(WaitingroomTurnstileAction),
    turnstile_mode: Type.Optional(WaitingroomTurnstileMode),
  }),
)

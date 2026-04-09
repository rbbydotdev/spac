import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  AaaTimestamp,
  D1Messages,
  IamResultInfo,
  IntelIdentifier,
  SmartshieldAddress,
  SmartshieldCheckRegions,
  SmartshieldConsecutiveFails,
  SmartshieldConsecutiveSuccesses,
  SmartshieldDescription,
  SmartshieldFailureReason,
  SmartshieldHttpConfig,
  SmartshieldInterval,
  SmartshieldName,
  SmartshieldRetries,
  SmartshieldStatus,
  SmartshieldSuspended,
  SmartshieldTcpConfig,
  SmartshieldTimeout,
  SmartshieldType,
} from "../shared/schemas"

export const SmartshieldSingleHcIdResponse = named(
  "smartshield_single_hc_id_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      id: Type.Optional(IntelIdentifier),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const SmartshieldHealthchecks = named(
  "smartshield_healthchecks",
  Type.Object({
    address: Type.Optional(SmartshieldAddress),
    check_regions: Type.Optional(SmartshieldCheckRegions),
    consecutive_fails: Type.Optional(SmartshieldConsecutiveFails),
    consecutive_successes: Type.Optional(SmartshieldConsecutiveSuccesses),
    created_on: Type.Optional(AaaTimestamp),
    description: Type.Optional(SmartshieldDescription),
    failure_reason: Type.Optional(SmartshieldFailureReason),
    http_config: Type.Optional(SmartshieldHttpConfig),
    id: Type.Optional(IntelIdentifier),
    interval: Type.Optional(SmartshieldInterval),
    modified_on: Type.Optional(AaaTimestamp),
    name: Type.Optional(SmartshieldName),
    retries: Type.Optional(SmartshieldRetries),
    status: Type.Optional(SmartshieldStatus),
    suspended: Type.Optional(SmartshieldSuspended),
    tcp_config: Type.Optional(SmartshieldTcpConfig),
    timeout: Type.Optional(SmartshieldTimeout),
    type: Type.Optional(SmartshieldType),
  }),
)

export const SmartshieldSingleHcResponse = named(
  "smartshield_single_hc_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: SmartshieldHealthchecks,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const SmartshieldQueryHealthcheck = named(
  "smartshield_query_healthcheck",
  Type.Object({
    address: SmartshieldAddress,
    check_regions: Type.Optional(SmartshieldCheckRegions),
    consecutive_fails: Type.Optional(SmartshieldConsecutiveFails),
    consecutive_successes: Type.Optional(SmartshieldConsecutiveSuccesses),
    description: Type.Optional(SmartshieldDescription),
    http_config: Type.Optional(SmartshieldHttpConfig),
    interval: Type.Optional(SmartshieldInterval),
    name: SmartshieldName,
    retries: Type.Optional(SmartshieldRetries),
    suspended: Type.Optional(SmartshieldSuspended),
    tcp_config: Type.Optional(SmartshieldTcpConfig),
    timeout: Type.Optional(SmartshieldTimeout),
    type: Type.Optional(SmartshieldType),
  }),
)

export const SmartshieldResponseCollection = named(
  "smartshield_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(SmartshieldHealthchecks), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IamResultInfo),
  }),
)

export const SmartshieldSmartShieldSettingsPatchResponse = named(
  "smartshield_smart_shield_settings_patch_response",
  Type.Object(
    {
      smart_tiered_cache: Type.Object({
        editable: Type.Optional(Type.Boolean({ description: "Whether the setting is editable." })),
        id: Type.Optional(Type.String({ description: "The id of the Smart Tiered Cache setting." })),
        modified_on: Type.Optional(
          Type.String({ description: "The last time the setting was modified.", readOnly: true }),
        ),
        value: Type.Optional(
          Type.Union([Type.Literal("on"), Type.Literal("off")], {
            description: "Specifies the enablement value of Tiered Cache.",
          }),
        ),
      }),
    },
    { description: "A consolidated object containing settings from multiple APIs for partial updates." },
  ),
)

export const SmartshieldSmartShieldSettingsPatchBody = named(
  "smartshield_smart_shield_settings_patch_body",
  Type.Object(
    {
      cache_reserve: Type.Optional(
        Type.Object({
          value: Type.Optional(
            Type.Union([Type.Literal("on"), Type.Literal("off")], {
              description: "Specifies the enablement value of Cache Reserve.",
            }),
          ),
        }),
      ),
      regional_tiered_cache: Type.Optional(
        Type.Object({
          value: Type.Optional(
            Type.Union([Type.Literal("on"), Type.Literal("off")], {
              description: "Specifies the enablement value of Regional Tiered Cache.",
            }),
          ),
        }),
      ),
      smart_routing: Type.Optional(
        Type.Object({
          value: Type.Optional(
            Type.Union([Type.Literal("on"), Type.Literal("off")], {
              description: "Specifies the enablement value of Smart Routing.",
            }),
          ),
        }),
      ),
      smart_tiered_cache: Type.Optional(
        Type.Object({
          value: Type.Optional(
            Type.Union([Type.Literal("on"), Type.Literal("off")], {
              description: "Specifies the enablement value of Smart Tiered Cache.",
            }),
          ),
        }),
      ),
    },
    { description: "The patch body for Smart Shield." },
  ),
)

export const SmartshieldApiResponseCommonFailure = named(
  "smartshield_api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const SmartshieldSmartShieldSettingsGetResponse = named(
  "smartshield_smart_shield_settings_get_response",
  Type.Object(
    {
      cache_reserve: Type.Object({
        editable: Type.Optional(Type.Boolean({ description: "Whether the setting is editable." })),
        id: Type.Optional(Type.String({ description: "The id of the Cache Reserve setting." })),
        value: Type.Optional(
          Type.Union([Type.Literal("on"), Type.Literal("off")], {
            description: "Specifies the enablement value of Cache Reserve.",
          }),
        ),
      }),
      regional_tiered_cache: Type.Object({
        editable: Type.Optional(Type.Boolean({ description: "Whether the setting is editable." })),
        id: Type.Optional(Type.String({ description: "The id of the Regional Tiered Cache setting." })),
        value: Type.Optional(
          Type.Union([Type.Literal("on"), Type.Literal("off")], {
            description: "Specifies the enablement value of Cache Reserve.",
          }),
        ),
      }),
      smart_routing: Type.Object({
        editable: Type.Optional(Type.Boolean({ description: "Whether the setting is editable." })),
        id: Type.Optional(Type.String({ description: "The id of the Smart Routing setting." })),
        value: Type.Optional(
          Type.Union([Type.Literal("on"), Type.Literal("off")], {
            description: "Specifies the enablement value of Argo Smart Routing.",
          }),
        ),
      }),
      smart_tiered_cache: Type.Object({
        editable: Type.Optional(Type.Boolean({ description: "Whether the setting is editable." })),
        id: Type.Optional(Type.String({ description: "The id of the Smart Tiered Cache setting." })),
        modified_on: Type.Optional(
          Type.String({ description: "The last time the setting was modified.", readOnly: true }),
        ),
        value: Type.Optional(
          Type.Union([Type.Literal("on"), Type.Literal("off")], {
            description: "Specifies the enablement value of Tiered Cache.",
          }),
        ),
      }),
      healthchecks_count: Type.Integer({ description: "The total number of health checks associated with the zone." }),
    },
    { description: "A consolidated object containing settings from multiple APIs for partial updates." },
  ),
)

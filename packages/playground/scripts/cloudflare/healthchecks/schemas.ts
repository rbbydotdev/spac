import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  AaaTimestamp,
  D1Messages,
  IamResultInfo,
  PageShieldId,
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

export const HealthchecksIdResponse = named(
  "healthchecks_id_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      id: Type.Optional(PageShieldId),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const UnnamedSchemaRefAaa560acadcbf1ae1dc619ba1ea5948e = named(
  "unnamed_schema_ref_aaa560acadcbf1ae1dc619ba1ea5948e",
  Type.Union([Type.Null()]),
)

export const HealthchecksHealthchecks = named(
  "healthchecks_healthchecks",
  Type.Object({
    address: Type.Optional(SmartshieldAddress),
    check_regions: Type.Optional(SmartshieldCheckRegions),
    consecutive_fails: Type.Optional(SmartshieldConsecutiveFails),
    consecutive_successes: Type.Optional(SmartshieldConsecutiveSuccesses),
    created_on: Type.Optional(AaaTimestamp),
    description: Type.Optional(SmartshieldDescription),
    failure_reason: Type.Optional(SmartshieldFailureReason),
    http_config: Type.Optional(SmartshieldHttpConfig),
    id: Type.Optional(PageShieldId),
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

export const HealthchecksSingleResponse = named(
  "healthchecks_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: HealthchecksHealthchecks,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const HealthchecksQueryHealthcheck = named(
  "healthchecks_query_healthcheck",
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

export const HealthchecksResponseCollection = named(
  "healthchecks_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(HealthchecksHealthchecks), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IamResultInfo),
  }),
)

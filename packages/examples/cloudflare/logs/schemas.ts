import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages } from "../shared/schemas"

export const LogshareFieldsResponse = named(
  "logshare_fields_response",
  Type.Object({
    key: Type.Optional(Type.String({ "x-auditable": true })),
  }),
)

export const LogshareCount = named(
  "logshare_count",
  Type.Integer({
    description:
      "When `?count=` is provided, the response will contain up to `count` results. Since results are not sorted, you are likely to get different data for repeated requests. `count` must be an integer > 0.",
    minimum: 1,
    "x-auditable": true,
  }),
)

export const LogshareSample = named(
  "logshare_sample",
  Type.Number({
    description:
      "When `?sample=` is provided, a sample of matching records is returned. If `sample=0.1` then 10% of records will be returned. Sampling is random: repeated calls will not only return different records, but likely will also vary slightly in number of returned records. When `?count=` is also specified, `count` is applied to the number of returned records, not the sampled records. So, with `sample=0.05` and `count=7`, when there is a total of 100 records available, approximately five will be returned. When there are 1000 records, seven will be returned. When there are 10,000 records, seven will be returned.",
    minimum: 0,
    maximum: 1,
    "x-auditable": true,
  }),
)

export const LogshareEnd = named(
  "logshare_end",
  Type.Union([Type.String(), Type.Integer()], {
    description:
      "Sets the (exclusive) end of the requested time frame. This can be a unix timestamp (in seconds or nanoseconds), or an absolute timestamp that conforms to RFC 3339. `end` must be at least five minutes earlier than now and must be later than `start`. Difference between `start` and `end` must be not greater than one hour.",
    "x-auditable": true,
  }),
)

export const LogshareStart = named(
  "logshare_start",
  Type.Union([Type.String(), Type.Integer()], {
    description:
      "Sets the (inclusive) beginning of the requested time frame. This can be a unix timestamp (in seconds or nanoseconds), or an absolute timestamp that conforms to RFC 3339. At this point in time, it cannot exceed a time in the past greater than seven days.",
    "x-auditable": true,
  }),
)

export const LogshareTimestamps = named(
  "logshare_timestamps",
  Type.Union([Type.Literal("unix"), Type.Literal("unixnano"), Type.Literal("rfc3339")], {
    description:
      "By default, timestamps in responses are returned as Unix nanosecond integers. The `?timestamps=` argument can be set to change the format in which response timestamps are returned. Possible values are: `unix`, `unixnano`, `rfc3339`. Note that `unix` and `unixnano` return timestamps as integers; `rfc3339` returns timestamps as strings.",
    "x-auditable": true,
  }),
)

export const LogshareFields = named(
  "logshare_fields",
  Type.String({
    description:
      "The `/received` route by default returns a limited set of fields, and allows customers to override the default field set by specifying individual fields. The reasons for this are: 1. Most customers require only a small subset of fields, but that subset varies from customer to customer; 2. Flat schema is much easier to work with downstream (importing into BigTable etc); 3. Performance (time to process, file size). If `?fields=` is not specified, default field set is returned. This default field set may change at any time. When `?fields=` is provided, each record is returned with the specified fields. `fields` must be specified as a comma separated list without any whitespaces, and all fields must exist. The order in which fields are specified does not matter, and the order of fields in the response is not specified.",
    "x-auditable": true,
  }),
)

export const LogshareRayIdentifier = named(
  "logshare_ray_identifier",
  Type.String({ description: "Ray identifier.", maxLength: 16, readOnly: true, "x-auditable": true }),
)

export const LogshareApiResponseCommonFailure = named(
  "logshare_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const LogshareLogsResponseJsonLines = named(
  "logshare_logs_response_json_lines",
  Type.Union([Type.String(), Type.Unknown()]),
)

export const LogcontrolFlag = named(
  "logcontrol_flag",
  Type.Boolean({ description: "The log retention flag for Logpull API.", "x-auditable": true }),
)

export const LogcontrolRetentionFlag = named(
  "logcontrol_retention_flag",
  Type.Union([
    Type.Object({
      flag: Type.Optional(LogcontrolFlag),
    }),
    Type.Null(),
  ]),
)

export const LogcontrolRetentionFlagResponseSingle = named(
  "logcontrol_retention_flag_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(LogcontrolRetentionFlag),
  }),
)

export const LogcontrolAllowOutOfRegionAccess = named(
  "logcontrol_allow_out_of_region_access",
  Type.Boolean({ description: "Allow out of region access", "x-auditable": true }),
)

export const LogcontrolRegions = named(
  "logcontrol_regions",
  Type.String({ description: "Name of the region.", maxLength: 256, "x-auditable": true }),
)

export const LogcontrolCmbConfig = named(
  "logcontrol_cmb_config",
  Type.Union([
    Type.Object({
      allow_out_of_region_access: Type.Optional(LogcontrolAllowOutOfRegionAccess),
      regions: Type.Optional(LogcontrolRegions),
    }),
    Type.Null(),
  ]),
)

export const LogcontrolApiResponseCommonFailure = named(
  "logcontrol_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const LogcontrolCmbConfigResponseSingle = named(
  "logcontrol_cmb_config_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(LogcontrolCmbConfig),
  }),
)

export const AaaSchemasApiResponseCommonFailure = named(
  "aaa_schemas-api-response-common-failure",
  Type.Object({
    errors: Type.Array(
      Type.Object({
        message: Type.String({ description: "A text description of this message." }),
      }),
      { description: "A list of error messages." },
    ),
    messages: Type.Optional(
      Type.Array(
        Type.Object({
          message: Type.Optional(Type.String()),
        }),
      ),
    ),
    success: Type.Union([Type.Literal(false)], { description: "Indicates whether the API call was failed" }),
  }),
)

export const AaaSchemasMessages = named(
  "aaa_schemas-messages",
  Type.Array(
    Type.Object({
      message: Type.String(),
    }),
  ),
)

export const AaaSchemasIdentifier = named(
  "aaa_schemas-identifier",
  Type.String({ description: "A unique identifier for the audit log entry.", maxLength: 32, readOnly: true }),
)

export const AaaAuditLogsV2 = named(
  "aaa_audit-logs-v2",
  Type.Object({
    account: Type.Optional(
      Type.Object(
        {
          id: Type.Optional(Type.String({ description: "A unique identifier for the account." })),
          name: Type.Optional(Type.String({ description: "A string that identifies the account name." })),
        },
        { description: "Contains account related information." },
      ),
    ),
    action: Type.Optional(
      Type.Object(
        {
          description: Type.Optional(Type.String({ description: "A short description of the action performed." })),
          result: Type.Optional(
            Type.String({ description: "The result of the action, indicating success or failure." }),
          ),
          time: Type.Optional(
            Type.String({ description: "A timestamp indicating when the action was logged.", format: "date-time" }),
          ),
          type: Type.Optional(
            Type.String({ description: "A short string that describes the action that was performed." }),
          ),
        },
        { description: "Provides information about the action performed." },
      ),
    ),
    actor: Type.Optional(
      Type.Object(
        {
          context: Type.Optional(
            Type.Union([
              Type.Literal("api_key"),
              Type.Literal("api_token"),
              Type.Literal("dash"),
              Type.Literal("oauth"),
              Type.Literal("origin_ca_key"),
            ]),
          ),
          email: Type.Optional(
            Type.String({ description: "The email of the actor who performed the action.", format: "email" }),
          ),
          id: Type.Optional(
            Type.String({
              description:
                "The ID of the actor who performed the action. If a user performed the action, this will be their User ID.",
            }),
          ),
          ip_address: Type.Optional(
            Type.String({
              description: "The IP address of the request that performed the action.",
              format: "ipv4 | ipv6",
            }),
          ),
          token_id: Type.Optional(
            Type.String({ description: "Filters by the API token ID when the actor context is an api_token." }),
          ),
          token_name: Type.Optional(
            Type.String({ description: "Filters by the API token name when the actor context is an api_token." }),
          ),
          type: Type.Optional(
            Type.Union(
              [Type.Literal("account"), Type.Literal("cloudflare_admin"), Type.Literal("system"), Type.Literal("user")],
              { description: "The type of actor." },
            ),
          ),
        },
        { description: "Provides details about the actor who performed the action." },
      ),
    ),
    id: Type.Optional(AaaSchemasIdentifier),
    raw: Type.Optional(
      Type.Object(
        {
          cf_ray_id: Type.Optional(Type.String({ description: "The Cloudflare Ray ID for the request." })),
          method: Type.Optional(Type.String({ description: "The HTTP method of the request." })),
          status_code: Type.Optional(
            Type.Integer({ description: "The HTTP response status code returned by the API." }),
          ),
          uri: Type.Optional(Type.String({ description: "The URI of the request." })),
          user_agent: Type.Optional(
            Type.String({ description: "The client's user agent string sent with the request." }),
          ),
        },
        { description: "Provides raw information about the request and response." },
      ),
    ),
    resource: Type.Optional(
      Type.Object(
        {
          id: Type.Optional(Type.String({ description: "The unique identifier for the affected resource." })),
          product: Type.Optional(Type.String({ description: "The Cloudflare product associated with the resource." })),
          request: Type.Optional(Type.Unknown()),
          response: Type.Optional(Type.Unknown()),
          scope: Type.Optional(Type.Unknown({ description: "The scope of the resource." })),
          type: Type.Optional(Type.String({ description: "The type of the resource." })),
        },
        { description: "Provides details about the affected resource." },
      ),
    ),
    zone: Type.Optional(
      Type.Object(
        {
          id: Type.Optional(Type.String({ description: "A string that identifies the zone id." })),
          name: Type.Optional(Type.String({ description: "A string that identifies the zone name." })),
        },
        { description: "Provides details about the zone affected by the action." },
      ),
    ),
  }),
)

export const AaaResultInfo = named(
  "aaa_result_info",
  Type.Object(
    {
      count: Type.Optional(Type.String({ description: "The number of records returned in the response." })),
      cursor: Type.Optional(Type.String({ description: "The cursor token used for pagination." })),
    },
    { description: "Provides information about the result of the request, including count and cursor." },
  ),
)

export const AaaAuditLogsV2ResponseCollection = named(
  "aaa_audit-logs-v2-response-collection",
  Type.Object({
    errors: Type.Optional(AaaSchemasMessages),
    result: Type.Optional(Type.Array(AaaAuditLogsV2)),
    result_info: Type.Optional(AaaResultInfo),
    success: Type.Optional(
      Type.Union([Type.Literal(true)], { description: "Indicates whether the API call was successful" }),
    ),
  }),
)

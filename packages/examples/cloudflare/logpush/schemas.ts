import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages } from "../shared/schemas"

export const LogpushSessionId = named(
  "logpush_session_id",
  Type.String({ description: "Unique session id of the job.", "x-auditable": true }),
)

export const LogpushSchemasDestinationConf = named(
  "logpush_schemas-destination_conf",
  Type.String({
    description: "Unique WebSocket address that will receive messages from Cloudflare’s edge.",
    format: "uri",
    maxLength: 4096,
    "x-auditable": true,
  }),
)

export const LogpushFields = named(
  "logpush_fields",
  Type.String({ description: "Comma-separated list of fields.", "x-auditable": true }),
)

export const LogpushSchemasFilter = named(
  "logpush_schemas-filter",
  Type.String({ description: "Filters to drill down into specific events.", "x-auditable": true }),
)

export const LogpushSample = named(
  "logpush_sample",
  Type.Integer({
    description:
      'The sample parameter is the sample rate of the records set by the client: "sample": 1 is 100% of records "sample": 10 is 10% and so on.',
    "x-auditable": true,
  }),
)

export const LogpushInstantLogsJob = named(
  "logpush_instant_logs_job",
  Type.Union([
    Type.Object({
      destination_conf: Type.Optional(LogpushSchemasDestinationConf),
      fields: Type.Optional(LogpushFields),
      filter: Type.Optional(LogpushSchemasFilter),
      sample: Type.Optional(LogpushSample),
      session_id: Type.Optional(LogpushSessionId),
    }),
    Type.Null(),
  ]),
)

export const LogpushInstantLogsJobResponseSingle = named(
  "logpush_instant_logs_job_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(LogpushInstantLogsJob),
  }),
)

export const LogpushInstantLogsJobResponseCollection = named(
  "logpush_instant_logs_job_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(LogpushInstantLogsJob)),
  }),
)

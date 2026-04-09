import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { MqApiV4Error, MqApiV4Message, MqIdentifier } from "../shared/schemas"

export const MqLeaseId = named(
  "mq_lease-id",
  Type.String({
    description:
      'An ID that represents an "in-flight" message that has been pulled from a Queue. You must hold on to this ID and use it to acknowledge this message.',
    "x-auditable": true,
  }),
)

export const MqQueuePullBatch = named(
  "mq_queue-pull-batch",
  Type.Array(
    Type.Object({
      attempts: Type.Optional(Type.Number({ readOnly: true, "x-auditable": true })),
      body: Type.Optional(Type.String({ readOnly: true })),
      id: Type.Optional(Type.String({ readOnly: true, "x-auditable": true })),
      lease_id: Type.Optional(MqLeaseId),
      metadata: Type.Optional(Type.Unknown()),
      timestamp_ms: Type.Optional(Type.Number({ readOnly: true, "x-auditable": true })),
    }),
  ),
)

export const MqVisibilityTimeout = named(
  "mq_visibility-timeout",
  Type.Number({
    description:
      "The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.",
    "x-auditable": true,
  }),
)

export const MqBatchSize = named(
  "mq_batch-size",
  Type.Number({ description: "The maximum number of messages to include in a batch.", "x-auditable": true }),
)

export const MqQueueMessageText = named(
  "mq_queue-message-text",
  Type.Object({
    body: Type.Optional(Type.String()),
    content_type: Type.Optional(Type.Union([Type.Literal("text")], { "x-auditable": true })),
  }),
)

export const MqQueueMessageJson = named(
  "mq_queue-message-json",
  Type.Object({
    body: Type.Optional(Type.Unknown()),
    content_type: Type.Optional(Type.Union([Type.Literal("json")], { "x-auditable": true })),
  }),
)

export const MqQueueMessage = named("mq_queue-message", Type.Union([MqQueueMessageText, MqQueueMessageJson]))

export const MqQueueBatch = named(
  "mq_queue-batch",
  Type.Object({
    delay_seconds: Type.Optional(
      Type.Number({
        description: "The number of seconds to wait for attempting to deliver this batch to consumers",
        "x-auditable": true,
      }),
    ),
    messages: Type.Optional(Type.Array(MqQueueMessage)),
  }),
)

export const MqRetryDelay = named(
  "mq_retry-delay",
  Type.Number({
    description: "The number of seconds to delay before making the message available for another attempt.",
    "x-auditable": true,
  }),
)

export const MqMaxRetries = named(
  "mq_max-retries",
  Type.Number({ description: "The maximum number of retries", "x-auditable": true }),
)

export const MqHttpConsumer = named(
  "mq_http-consumer",
  Type.Object({
    consumer_id: Type.Optional(MqIdentifier),
    created_on: Type.Optional(Type.String({ readOnly: true, "x-auditable": true })),
    queue_id: Type.Optional(MqIdentifier),
    settings: Type.Optional(
      Type.Object({
        batch_size: Type.Optional(MqBatchSize),
        max_retries: Type.Optional(MqMaxRetries),
        retry_delay: Type.Optional(MqRetryDelay),
        visibility_timeout_ms: Type.Optional(MqVisibilityTimeout),
      }),
    ),
    type: Type.Optional(Type.Union([Type.Literal("http_pull")], { "x-auditable": true })),
  }),
)

export const MqScriptName = named(
  "mq_script-name",
  Type.String({ description: "Name of a Worker", "x-auditable": true }),
)

export const MqMaxConcurrency = named(
  "mq_max-concurrency",
  Type.Number({
    description:
      "Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (recommended).",
    "x-auditable": true,
  }),
)

export const MqMaxWaitTime = named(
  "mq_max-wait-time",
  Type.Number({
    description: "The number of milliseconds to wait for a batch to fill up before attempting to deliver it",
    "x-auditable": true,
  }),
)

export const MqWorkerConsumer = named(
  "mq_worker-consumer",
  Type.Object({
    consumer_id: Type.Optional(MqIdentifier),
    created_on: Type.Optional(Type.String({ readOnly: true, "x-auditable": true })),
    queue_id: Type.Optional(MqIdentifier),
    script: Type.Optional(MqScriptName),
    script_name: Type.Optional(MqScriptName),
    settings: Type.Optional(
      Type.Object({
        batch_size: Type.Optional(MqBatchSize),
        max_concurrency: Type.Optional(MqMaxConcurrency),
        max_retries: Type.Optional(MqMaxRetries),
        max_wait_time_ms: Type.Optional(MqMaxWaitTime),
        retry_delay: Type.Optional(MqRetryDelay),
      }),
    ),
    type: Type.Optional(Type.Union([Type.Literal("worker")], { "x-auditable": true })),
  }),
)

export const MqConsumer = named("mq_consumer", Type.Union([MqWorkerConsumer, MqHttpConsumer]))

export const MqApiV4Success = named(
  "mq_api-v4-success",
  Type.Object({
    errors: Type.Optional(MqApiV4Error),
    messages: Type.Optional(MqApiV4Message),
    success: Type.Optional(
      Type.Union([Type.Literal(true)], {
        description: "Indicates if the API call was successful or not.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const MqQueueName = named("mq_queue-name", Type.String({ "x-auditable": true }))

export const MqWorkerProducer = named(
  "mq_worker-producer",
  Type.Object({
    script: Type.Optional(Type.String({ "x-auditable": true })),
    type: Type.Optional(Type.Union([Type.Literal("worker")], { "x-auditable": true })),
  }),
)

export const MqR2Producer = named(
  "mq_r2-producer",
  Type.Object({
    bucket_name: Type.Optional(Type.String({ "x-auditable": true })),
    type: Type.Optional(Type.Union([Type.Literal("r2_bucket")], { "x-auditable": true })),
  }),
)

export const MqProducer = named("mq_producer", Type.Union([MqWorkerProducer, MqR2Producer]))

export const MqQueueSettings = named(
  "mq_queue-settings",
  Type.Object({
    delivery_delay: Type.Optional(
      Type.Number({
        description: "Number of seconds to delay delivery of all messages to consumers.",
        "x-auditable": true,
      }),
    ),
    delivery_paused: Type.Optional(
      Type.Boolean({
        description: "Indicates if message delivery to consumers is currently paused.",
        "x-auditable": true,
      }),
    ),
    message_retention_period: Type.Optional(
      Type.Number({
        description: "Number of seconds after which an unconsumed message will be delayed.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const MqQueue = named(
  "mq_queue",
  Type.Object({
    consumers: Type.Optional(Type.Array(MqConsumer, { readOnly: true })),
    consumers_total_count: Type.Optional(Type.Number({ readOnly: true })),
    created_on: Type.Optional(Type.String({ readOnly: true, "x-auditable": true })),
    modified_on: Type.Optional(Type.String({ readOnly: true, "x-auditable": true })),
    producers: Type.Optional(Type.Array(MqProducer, { readOnly: true })),
    producers_total_count: Type.Optional(Type.Number({ readOnly: true, "x-auditable": true })),
    queue_id: Type.Optional(Type.String({ readOnly: true, "x-auditable": true })),
    queue_name: Type.Optional(MqQueueName),
    settings: Type.Optional(MqQueueSettings),
  }),
)

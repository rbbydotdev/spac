import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { MqApiV4Error, MqApiV4Failure, MqApiV4Message, MqIdentifier } from "../shared/schemas"
import {
  MqApiV4Success,
  MqBatchSize,
  MqConsumer,
  MqHttpConsumer,
  MqLeaseId,
  MqQueue,
  MqQueueBatch,
  MqQueueMessage,
  MqQueueName,
  MqQueuePullBatch,
  MqRetryDelay,
  MqVisibilityTimeout,
  MqWorkerConsumer,
} from "./schemas"

export function registerQueues(api: Api) {
  api.group("/accounts/{account_id}/queues", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(Type.Array(MqQueue)),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Optional(Type.Number({ description: "Total number of queues" })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of queues" })),
              per_page: Type.Optional(Type.Number({ description: "Number of queues per page" })),
              total_count: Type.Optional(
                Type.Number({ description: "Total queues available without any search parameters" }),
              ),
              total_pages: Type.Optional(
                Type.Number({ description: "Total pages available without any search parameters" }),
              ),
            }),
          ),
        }),
        "4XX": MqApiV4Failure,
      },
    })
      .summary("List Queues")
      .description("Returns the queues owned by an account.")
      .operationId("queues-list")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Queues Read", "Workers Scripts Write", "Workers Scripts Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.worker.queue.list"] })

    g.post("/", {
      body: Type.Object({
        queue_name: MqQueueName,
      }),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(MqQueue),
        }),
        "4XX": MqApiV4Failure,
      },
    })
      .summary("Create Queue")
      .description("Create a new queue")
      .operationId("queues-create")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.worker.queue.create"] })

    g.get("/{queue_id}", {
      params: Type.Object({ queue_id: MqIdentifier }),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(MqQueue),
        }),
        "4XX": MqApiV4Failure,
      },
    })
      .summary("Get Queue")
      .description("Get details about a specific queue.")
      .operationId("queues-get")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Queues Read", "Workers Scripts Write", "Workers Scripts Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.worker.queue.read"] })

    g.put("/{queue_id}", {
      params: Type.Object({ queue_id: MqIdentifier }),
      body: MqQueue,
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(MqQueue),
        }),
        "4XX": MqApiV4Failure,
      },
    })
      .summary("Update Queue")
      .description(
        "Updates a Queue. Note that this endpoint does not support partial updates. If successful, the Queue's configuration is overwritten with the supplied configuration.",
      )
      .operationId("queues-update")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.worker.queue.update"] })

    g.patch("/{queue_id}", {
      params: Type.Object({ queue_id: MqIdentifier }),
      body: MqQueue,
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(MqQueue),
        }),
        "4XX": MqApiV4Failure,
      },
    })
      .summary("Update Queue")
      .description("Updates a Queue.")
      .operationId("queues-update-partial")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.worker.queue.update"] })

    g.delete("/{queue_id}", {
      params: Type.Object({ queue_id: MqIdentifier }),
      responses: {
        200: MqApiV4Success,
        "4XX": MqApiV4Failure,
      },
    })
      .summary("Delete Queue")
      .description("Deletes a queue")
      .operationId("queues-delete")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.worker.queue.delete"] })

    g.get("/{queue_id}/consumers", {
      params: Type.Object({ queue_id: MqIdentifier }),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(Type.Array(MqConsumer)),
        }),
        "4XX": MqApiV4Failure,
      },
    })
      .summary("List Queue Consumers")
      .description("Returns the consumers for a Queue")
      .operationId("queues-list-consumers")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Queues Read", "Workers Scripts Write", "Workers Scripts Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.worker.queue.list"] })

    g.post("/{queue_id}/consumers", {
      params: Type.Object({ queue_id: MqIdentifier }),
      body: Type.Union([MqWorkerConsumer, MqHttpConsumer]),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(MqConsumer),
        }),
        "4XX": MqApiV4Failure,
      },
    })
      .summary("Create a Queue Consumer")
      .description("Creates a new consumer for a Queue")
      .operationId("queues-create-consumer")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.worker.queue.create"] })

    g.get("/{queue_id}/consumers/{consumer_id}", {
      params: Type.Object({ consumer_id: MqIdentifier, queue_id: MqIdentifier }),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(MqConsumer),
        }),
        "4XX": MqApiV4Failure,
      },
    })
      .summary("Get Queue Consumer")
      .description("Fetches the consumer for a queue by consumer id")
      .operationId("queues-get-consumer")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Queues Read", "Workers Scripts Write", "Workers Scripts Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.worker.queue.read"] })

    g.put("/{queue_id}/consumers/{consumer_id}", {
      params: Type.Object({ consumer_id: MqIdentifier, queue_id: MqIdentifier }),
      body: Type.Union([MqWorkerConsumer, MqHttpConsumer]),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(MqConsumer),
        }),
        "4XX": MqApiV4Failure,
      },
    })
      .summary("Update Queue Consumer")
      .description("Updates the consumer for a queue, or creates one if it does not exist.")
      .operationId("queues-update-consumer")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.worker.queue.update"] })

    g.delete("/{queue_id}/consumers/{consumer_id}", {
      params: Type.Object({ consumer_id: MqIdentifier, queue_id: MqIdentifier }),
      responses: {
        200: MqApiV4Success,
        "4XX": MqApiV4Failure,
      },
    })
      .summary("Delete Queue Consumer")
      .description("Deletes the consumer for a queue.")
      .operationId("queues-delete-consumer")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.worker.queue.delete"] })

    g.post("/{queue_id}/messages", {
      params: Type.Object({ queue_id: MqIdentifier }),
      body: MqQueueMessage,
      responses: {
        200: MqApiV4Success,
        "4XX": MqApiV4Failure,
      },
    })
      .summary("Push Message")
      .description("Push a message to a Queue")
      .operationId("queues-push-message")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.worker.queue.update"] })

    g.post("/{queue_id}/messages/ack", {
      params: Type.Object({ queue_id: MqIdentifier }),
      body: Type.Object({
        acks: Type.Optional(
          Type.Array(
            Type.Object({
              lease_id: Type.Optional(MqLeaseId),
            }),
          ),
        ),
        retries: Type.Optional(
          Type.Array(
            Type.Object({
              delay_seconds: Type.Optional(MqRetryDelay),
              lease_id: Type.Optional(MqLeaseId),
            }),
          ),
        ),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(
            Type.Object({
              ackCount: Type.Optional(
                Type.Number({ description: "The number of messages that were succesfully acknowledged." }),
              ),
              retryCount: Type.Optional(
                Type.Number({ description: "The number of messages that were succesfully retried." }),
              ),
              warnings: Type.Optional(Type.Array(Type.String())),
            }),
          ),
        }),
        "4XX": MqApiV4Failure,
      },
    })
      .summary("Acknowledge + Retry Queue Messages")
      .description("Acknowledge + Retry messages from a Queue")
      .operationId("queues-ack-messages")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.worker.queue.update"] })

    g.post("/{queue_id}/messages/batch", {
      params: Type.Object({ queue_id: MqIdentifier }),
      body: MqQueueBatch,
      responses: {
        200: MqApiV4Success,
        "4XX": MqApiV4Failure,
      },
    })
      .summary("Push Message Batch")
      .description("Push a batch of message to a Queue")
      .operationId("queues-push-messages")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Workers Scripts Write"])

    g.post("/{queue_id}/messages/pull", {
      params: Type.Object({ queue_id: MqIdentifier }),
      body: Type.Object({
        batch_size: Type.Optional(MqBatchSize),
        visibility_timeout_ms: Type.Optional(MqVisibilityTimeout),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(
            Type.Object({
              message_backlog_count: Type.Optional(
                Type.Number({ description: "The number of unacknowledged messages in the queue" }),
              ),
              messages: Type.Optional(MqQueuePullBatch),
            }),
          ),
        }),
        "4XX": MqApiV4Failure,
      },
    })
      .summary("Pull Queue Messages")
      .description("Pull a batch of messages from a Queue")
      .operationId("queues-pull-messages")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.worker.queue.update"] })

    g.get("/{queue_id}/purge", {
      params: Type.Object({ queue_id: MqIdentifier }),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(
            Type.Object({
              completed: Type.Optional(
                Type.String({
                  description: "Indicates if the last purge operation completed successfully.",
                  readOnly: true,
                  "x-auditable": true,
                }),
              ),
              started_at: Type.Optional(
                Type.String({
                  description: "Timestamp when the last purge operation started.",
                  readOnly: true,
                  "x-auditable": true,
                }),
              ),
            }),
          ),
        }),
        "4XX": MqApiV4Failure,
      },
    })
      .summary("Get Queue Purge Status")
      .description("Get details about a Queue's purge status.")
      .operationId("queues-purge-get")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Queues Read", "Workers Scripts Write", "Workers Scripts Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.worker.queue.read"] })

    g.post("/{queue_id}/purge", {
      params: Type.Object({ queue_id: MqIdentifier }),
      body: Type.Object({
        delete_messages_permanently: Type.Optional(
          Type.Boolean({
            description: "Confimation that all messages will be deleted permanently.",
            "x-auditable": true,
          }),
        ),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(MqQueue),
        }),
        "4XX": MqApiV4Failure,
      },
    })
      .summary("Purge Queue")
      .description("Deletes all messages from the Queue.")
      .operationId("queues-purge")
      .tag("Queue")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Queues Write", "Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.worker.queue.update"] })
  })
}

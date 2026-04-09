import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const R2R2Action = named(
  "r2_r2-action",
  Type.Union(
    [
      Type.Literal("PutObject"),
      Type.Literal("CopyObject"),
      Type.Literal("DeleteObject"),
      Type.Literal("CompleteMultipartUpload"),
      Type.Literal("LifecycleDeletion"),
    ],
    { "x-auditable": true },
  ),
)

export const R2Rule = named(
  "r2_rule",
  Type.Object({
    actions: Type.Array(R2R2Action, {
      description: "Array of R2 object actions that will trigger notifications.",
      uniqueItems: true,
    }),
    description: Type.Optional(
      Type.String({
        description: "A description that can be used to identify the event notification rule after creation.",
        "x-auditable": true,
      }),
    ),
    prefix: Type.Optional(
      Type.String({
        description: "Notifications will be sent only for objects with this prefix.",
        "x-auditable": true,
      }),
    ),
    suffix: Type.Optional(
      Type.String({
        description: "Notifications will be sent only for objects with this suffix.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const R2QueueIdentifier = named(
  "r2_queue_identifier",
  Type.String({ description: "Queue ID.", maxLength: 32, "x-auditable": true }),
)

export const R2QueuesConfig = named(
  "r2_queues-config",
  Type.Object({
    queueId: Type.Optional(Type.String({ description: "Queue ID.", "x-auditable": true })),
    queueName: Type.Optional(Type.String({ description: "Name of the queue.", "x-auditable": true })),
    rules: Type.Optional(
      Type.Array(
        Type.Object({
          actions: Type.Array(R2R2Action, {
            description: "Array of R2 object actions that will trigger notifications.",
            uniqueItems: true,
          }),
          description: Type.Optional(
            Type.String({
              description: "A description that can be used to identify the event notification rule after creation.",
              "x-auditable": true,
            }),
          ),
          prefix: Type.Optional(
            Type.String({
              description: "Notifications will be sent only for objects with this prefix.",
              "x-auditable": true,
            }),
          ),
          suffix: Type.Optional(
            Type.String({
              description: "Notifications will be sent only for objects with this suffix.",
              "x-auditable": true,
            }),
          ),
          createdAt: Type.Optional(
            Type.String({ description: "Timestamp when the rule was created.", "x-auditable": true }),
          ),
          ruleId: Type.Optional(Type.String({ description: "Rule ID.", "x-auditable": true })),
        }),
      ),
    ),
  }),
)

export const R2BucketConfig = named(
  "r2_bucket-config",
  Type.Object({
    bucketName: Type.Optional(Type.String({ description: "Name of the bucket.", "x-auditable": true })),
    queues: Type.Optional(Type.Array(R2QueuesConfig, { description: "List of queues associated with the bucket." })),
  }),
)

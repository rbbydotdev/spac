import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const MqEventSourceImages = named(
  "mq_event-source-images",
  Type.Object({
    type: Type.Optional(Type.Union([Type.Literal("images")], { description: "Type of source", "x-auditable": true })),
  }),
)

export const MqEventSourceKv = named(
  "mq_event-source-kv",
  Type.Object({
    type: Type.Optional(Type.Union([Type.Literal("kv")], { description: "Type of source", "x-auditable": true })),
  }),
)

export const MqEventSourceR2 = named(
  "mq_event-source-r2",
  Type.Object({
    type: Type.Optional(Type.Union([Type.Literal("r2")], { description: "Type of source", "x-auditable": true })),
  }),
)

export const MqEventSourceSuperSlurper = named(
  "mq_event-source-super-slurper",
  Type.Object({
    type: Type.Optional(
      Type.Union([Type.Literal("superSlurper")], { description: "Type of source", "x-auditable": true }),
    ),
  }),
)

export const MqEventSourceVectorize = named(
  "mq_event-source-vectorize",
  Type.Object({
    type: Type.Optional(
      Type.Union([Type.Literal("vectorize")], { description: "Type of source", "x-auditable": true }),
    ),
  }),
)

export const MqEventSourceWorkersAiModel = named(
  "mq_event-source-workers-ai-model",
  Type.Object({
    model_name: Type.Optional(
      Type.String({
        description: "Name of the Workers AI model",
        "x-auditable": true,
        "x-stainless-naming": { python: { property_name: "ai_model_name" } },
      }),
    ),
    type: Type.Optional(
      Type.Union([Type.Literal("workersAi.model")], { description: "Type of source", "x-auditable": true }),
    ),
  }),
)

export const MqEventSourceWorkersBuildsWorker = named(
  "mq_event-source-workers-builds-worker",
  Type.Object({
    type: Type.Optional(
      Type.Union([Type.Literal("workersBuilds.worker")], { description: "Type of source", "x-auditable": true }),
    ),
    worker_name: Type.Optional(Type.String({ description: "Name of the worker", "x-auditable": true })),
  }),
)

export const MqEventSourceWorkflowsWorkflow = named(
  "mq_event-source-workflows-workflow",
  Type.Object({
    type: Type.Optional(
      Type.Union([Type.Literal("workflows.workflow")], { description: "Type of source", "x-auditable": true }),
    ),
    workflow_name: Type.Optional(Type.String({ description: "Name of the workflow", "x-auditable": true })),
  }),
)

export const MqEventSource = named(
  "mq_event-source",
  Type.Union(
    [
      MqEventSourceImages,
      MqEventSourceKv,
      MqEventSourceR2,
      MqEventSourceSuperSlurper,
      MqEventSourceVectorize,
      MqEventSourceWorkersAiModel,
      MqEventSourceWorkersBuildsWorker,
      MqEventSourceWorkflowsWorkflow,
    ],
    { description: "Source configuration for the subscription" },
  ),
)

export const MqEventDestinationQueue = named(
  "mq_event-destination-queue",
  Type.Object({
    queue_id: Type.String({ description: "ID of the target queue", "x-auditable": true }),
    type: Type.Union([Type.Literal("queues.queue")], { description: "Type of destination", "x-auditable": true }),
  }),
)

export const MqEventDestination = named("mq_event-destination", MqEventDestinationQueue)

export const MqEventSubscription = named(
  "mq_event-subscription",
  Type.Object({
    created_at: Type.String({
      description: "When the subscription was created",
      format: "date-time",
      readOnly: true,
      "x-auditable": true,
    }),
    destination: MqEventDestination,
    enabled: Type.Boolean({ description: "Whether the subscription is active", "x-auditable": true }),
    events: Type.Array(Type.String(), {
      description: "List of event types this subscription handles",
      minItems: 1,
      "x-auditable": true,
    }),
    id: Type.String({ description: "Unique identifier for the subscription", "x-auditable": true }),
    modified_at: Type.String({
      description: "When the subscription was last modified",
      format: "date-time",
      readOnly: true,
      "x-auditable": true,
    }),
    name: Type.String({ description: "Name of the subscription", "x-auditable": true }),
    source: MqEventSource,
  }),
)

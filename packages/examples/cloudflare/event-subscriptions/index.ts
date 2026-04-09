import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { MqApiV4Error, MqApiV4Failure, MqApiV4Message, MqIdentifier } from "../shared/schemas"
import { MqEventDestination, MqEventSource, MqEventSubscription } from "./schemas"

export function registerEventSubscriptions(api: Api) {
  api.group(
    "/accounts/{account_id}/event_subscriptions/subscriptions",
    { params: Type.Object({ account_id: Type.String() }) },
    (g) => {
      g.get("/", {
        query: Type.Object({
          page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
          per_page: Type.Optional(Type.Integer({ default: 20, minimum: 1, maximum: 100 })),
          order: Type.Optional(
            Type.Union([
              Type.Literal("created_at"),
              Type.Literal("name"),
              Type.Literal("enabled"),
              Type.Literal("source"),
            ]),
          ),
          direction: Type.Optional(Type.Union([Type.Literal("asc"), Type.Literal("desc")])),
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
            result: Type.Optional(Type.Array(MqEventSubscription)),
            result_info: Type.Optional(
              Type.Object({
                count: Type.Integer({ description: "Number of items in current page" }),
                page: Type.Integer({ description: "Current page number" }),
                per_page: Type.Integer({ description: "Items per page" }),
                total_count: Type.Integer({ description: "Total number of items" }),
                total_pages: Type.Integer({ description: "Total number of pages" }),
              }),
            ),
          }),
          "4XX": MqApiV4Failure,
        },
      })
        .summary("List Event Subscriptions")
        .description("Get a paginated list of event subscriptions with optional sorting and filtering")
        .operationId("subscriptions-list")
        .tag("Queue")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Queues Write",
          "Queues Read",
          "Workers Scripts Write",
          "Workers Scripts Read",
        ])

      g.post("/", {
        body: Type.Object({
          destination: Type.Optional(MqEventDestination),
          enabled: Type.Optional(
            Type.Boolean({ description: "Whether the subscription is active", "x-auditable": true }),
          ),
          events: Type.Optional(
            Type.Array(Type.String(), {
              description: "List of event types this subscription handles",
              minItems: 1,
              "x-auditable": true,
            }),
          ),
          name: Type.Optional(Type.String({ description: "Name of the subscription", "x-auditable": true })),
          source: Type.Optional(MqEventSource),
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
            result: Type.Optional(MqEventSubscription),
          }),
          400: MqApiV4Failure,
          404: MqApiV4Failure,
          405: MqApiV4Failure,
        },
      })
        .summary("Create Event Subscription")
        .description("Create a new event subscription for a queue")
        .operationId("subscriptions-create")
        .tag("Queue")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Queues Write", "Workers Scripts Write"])

      g.patch("/{subscription_id}", {
        params: Type.Object({ subscription_id: MqIdentifier }),
        body: Type.Object({
          destination: Type.Optional(MqEventDestination),
          enabled: Type.Optional(
            Type.Boolean({ description: "Whether the subscription is active", "x-auditable": true }),
          ),
          events: Type.Optional(
            Type.Array(Type.String(), {
              description: "List of event types this subscription handles",
              minItems: 1,
              "x-auditable": true,
            }),
          ),
          name: Type.Optional(Type.String({ description: "Name of the subscription", "x-auditable": true })),
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
            result: Type.Optional(MqEventSubscription),
          }),
          400: MqApiV4Failure,
          404: MqApiV4Failure,
        },
      })
        .summary("Update Event Subscription")
        .description("Update an existing event subscription")
        .operationId("subscriptions-patch")
        .tag("Queue")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Queues Write", "Workers Scripts Write"])

      g.delete("/{subscription_id}", {
        params: Type.Object({ subscription_id: MqIdentifier }),
        response: Type.Object({
          errors: Type.Optional(MqApiV4Error),
          messages: Type.Optional(MqApiV4Message),
          success: Type.Optional(
            Type.Union([Type.Literal(true)], {
              description: "Indicates if the API call was successful or not.",
              "x-auditable": true,
            }),
          ),
          result: Type.Optional(MqEventSubscription),
        }),
      })
        .summary("Delete Event Subscription")
        .description("Delete an existing event subscription")
        .operationId("subscriptions-delete")
        .tag("Queue")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Queues Write", "Workers Scripts Write"])
    },
  )
}

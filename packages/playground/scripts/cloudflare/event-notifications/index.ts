import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { R2Errors, R2Jurisdiction, R2Messages, R2V4Response, R2V4ResponseFailure } from "../shared/schemas"
import { R2BucketConfig, R2QueueIdentifier, R2QueuesConfig, R2Rule } from "./schemas"

export function registerEventNotifications(api: Api) {
  api.assertVersion("3.0.3", "EventNotifications")

  api.group(
    "/accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration",
    { params: Type.Object({ account_id: Type.String(), bucket_name: Type.String() }) },
    (g) => {
      g.get("/", {
        headers: Type.Object({
          "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
        }),
      })
        .response(
          Type.Object({
            errors: R2Errors,
            messages: R2Messages,
            result: R2BucketConfig,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          }),
        )
        .error(404, R2V4ResponseFailure)
        .error("4XX", R2V4ResponseFailure)
        .summary("List Event Notification Rules")
        .description("List all event notification rules for a bucket.")
        .operationId("r2-get-event-notification-configs")
        .tag("R2 Bucket")
        .security({ api_token: [] })
        .extension("x-api-token-group", ["Workers R2 Storage Write", "Workers R2 Storage Read"])

      g.get("/queues/{queue_id}", {
        params: Type.Object({ queue_id: R2QueueIdentifier }),
        headers: Type.Object({
          "cf-r2-jurisdiction": Type.Optional(
            Type.Union([Type.Literal("default"), Type.Literal("eu"), Type.Literal("fedramp")], {
              description: "The bucket jurisdiction.",
              "x-stainless-param": "jurisdiction",
            }),
          ),
        }),
      })
        .response(
          Type.Object({
            errors: R2Errors,
            messages: R2Messages,
            result: R2QueuesConfig,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          }),
        )
        .error(404, R2V4ResponseFailure)
        .error("4XX", R2V4ResponseFailure)
        .summary("Get Event Notification Rule")
        .description("Get a single event notification rule.")
        .operationId("r2-get-event-notification-config")
        .tag("R2 Bucket")
        .security({ api_token: [] })
        .extension("x-api-token-group", ["Workers R2 Storage Write", "Workers R2 Storage Read"])

      g.put("/queues/{queue_id}", {
        params: Type.Object({ queue_id: R2QueueIdentifier }),
        headers: Type.Object({
          "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
        }),
        body: Type.Object({
          rules: Type.Optional(Type.Array(R2Rule, { description: "Array of rules to drive notifications." })),
        }),
      })
        .response(R2V4Response)
        .error("4XX", R2V4ResponseFailure)
        .summary("Create Event Notification Rule")
        .description("Create event notification rule.")
        .operationId("r2-put-event-notification-config")
        .tag("R2 Bucket")
        .security({ api_token: [] })
        .extension("x-api-token-group", ["Workers R2 Storage Write"])

      g.delete("/queues/{queue_id}", {
        params: Type.Object({ queue_id: R2QueueIdentifier }),
        headers: Type.Object({
          "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
        }),
      })
        .response(R2V4Response)
        .error("4XX", R2V4ResponseFailure)
        .summary("Delete Event Notification Rules")
        .description(
          "Delete an event notification rule. **If no body is provided, all rules for specified queue will be deleted**.",
        )
        .operationId("r2-event-notification-delete-config")
        .tag("R2 Bucket")
        .security({ api_token: [] })
        .extension("x-api-token-group", ["Workers R2 Storage Write"])
    },
  )
}

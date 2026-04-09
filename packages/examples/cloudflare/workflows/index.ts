import { Type } from "@sinclair/typebox"
import type { Api } from "spac"

export function registerWorkflows(api: Api) {
  api.group("/accounts/{account_id}/workflows", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        per_page: Type.Optional(Type.Number({ default: 10, minimum: 1, maximum: 100 })),
        page: Type.Optional(Type.Number({ default: 1, minimum: 1 })),
        search: Type.Optional(
          Type.String({ description: "Allows filtering workflows` name.", minLength: 1, maxLength: 64 }),
        ),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          result: Type.Array(
            Type.Object({
              class_name: Type.String(),
              created_on: Type.String({ format: "date-time", readOnly: true }),
              id: Type.String({ format: "uuid" }),
              instances: Type.Object({
                complete: Type.Optional(Type.Number()),
                errored: Type.Optional(Type.Number()),
                paused: Type.Optional(Type.Number()),
                queued: Type.Optional(Type.Number()),
                running: Type.Optional(Type.Number()),
                terminated: Type.Optional(Type.Number()),
                waiting: Type.Optional(Type.Number()),
                waitingForPause: Type.Optional(Type.Number()),
              }),
              modified_on: Type.String({ format: "date-time", readOnly: true }),
              name: Type.String({ minLength: 1, maxLength: 64 }),
              script_name: Type.String(),
              triggered_on: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
            }),
          ),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Number(),
              cursor: Type.Optional(Type.String()),
              page: Type.Optional(Type.Number()),
              per_page: Type.Number(),
              total_count: Type.Number(),
            }),
          ),
          success: Type.Union([Type.Literal(true)]),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
      },
    })
      .summary("List all Workflows")
      .operationId("wor-list-workflows")
      .tag("Workflows")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])
      .extension("x-cfPermissionsRequired", {
        enum: ["com.cloudflare.api.workers.write", "com.cloudflare.api.workers.read"],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{workflow_name}", {
      params: Type.Object({ workflow_name: Type.String({ minLength: 1, maxLength: 64 }) }),
      responses: {
        200: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            class_name: Type.String(),
            created_on: Type.String({ format: "date-time", readOnly: true }),
            id: Type.String({ format: "uuid" }),
            instances: Type.Object({
              complete: Type.Optional(Type.Number()),
              errored: Type.Optional(Type.Number()),
              paused: Type.Optional(Type.Number()),
              queued: Type.Optional(Type.Number()),
              running: Type.Optional(Type.Number()),
              terminated: Type.Optional(Type.Number()),
              waiting: Type.Optional(Type.Number()),
              waitingForPause: Type.Optional(Type.Number()),
            }),
            modified_on: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String({ minLength: 1, maxLength: 64 }),
            script_name: Type.String(),
            triggered_on: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
          }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Number(),
              cursor: Type.Optional(Type.String()),
              page: Type.Optional(Type.Number()),
              per_page: Type.Number(),
              total_count: Type.Number(),
            }),
          ),
          success: Type.Union([Type.Literal(true)]),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
      },
    })
      .summary("Get Workflow details")
      .operationId("wor-get-workflow-details")
      .tag("Workflows")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])
      .extension("x-cfPermissionsRequired", {
        enum: ["com.cloudflare.api.workers.write", "com.cloudflare.api.workers.read"],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/{workflow_name}", {
      params: Type.Object({ workflow_name: Type.String({ minLength: 1, maxLength: 64 }) }),
      body: Type.Object({
        class_name: Type.String({ minLength: 1, maxLength: 255 }),
        script_name: Type.String({ minLength: 1, maxLength: 255 }),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            class_name: Type.String(),
            created_on: Type.String({ format: "date-time", readOnly: true }),
            id: Type.String({ format: "uuid" }),
            is_deleted: Type.Number(),
            modified_on: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String({ minLength: 1, maxLength: 64 }),
            script_name: Type.String(),
            terminator_running: Type.Number(),
            triggered_on: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
            version_id: Type.String({ format: "uuid" }),
          }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Number(),
              cursor: Type.Optional(Type.String()),
              page: Type.Optional(Type.Number()),
              per_page: Type.Number(),
              total_count: Type.Number(),
            }),
          ),
          success: Type.Union([Type.Literal(true)]),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
      },
    })
      .summary("Create/modify Workflow")
      .operationId("wor-create-or-modify-workflow")
      .tag("Workflows")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", {
        enum: ["com.cloudflare.api.workers.write", "com.cloudflare.api.workers.read"],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{workflow_name}", {
      params: Type.Object({ workflow_name: Type.String({ minLength: 1, maxLength: 64 }) }),
      responses: {
        200: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            status: Type.Union([Type.Literal("ok")]),
            success: Type.Union([Type.Boolean(), Type.Null()]),
          }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Number(),
              cursor: Type.Optional(Type.String()),
              page: Type.Optional(Type.Number()),
              per_page: Type.Number(),
              total_count: Type.Number(),
            }),
          ),
          success: Type.Union([Type.Literal(true)]),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
      },
    })
      .summary("Deletes a Workflow")
      .description(
        "Deletes a Workflow. This only deletes the Workflow and does not delete or modify any Worker associated to this Workflow or bounded to it.",
      )
      .operationId("wor-delete-workflow")
      .tag("Workflows")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", {
        enum: ["com.cloudflare.api.workers.write", "com.cloudflare.api.workers.read"],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{workflow_name}/instances", {
      params: Type.Object({ workflow_name: Type.String({ minLength: 1, maxLength: 64 }) }),
      query: Type.Object({
        page: Type.Optional(
          Type.Number({ description: "`page` and `cursor` are mutually exclusive, use one or the other.", minimum: 1 }),
        ),
        per_page: Type.Optional(Type.Number({ default: 50, minimum: 1, maximum: 100 })),
        cursor: Type.Optional(
          Type.String({ description: "`page` and `cursor` are mutually exclusive, use one or the other." }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
            description: "should only be used when `cursor` is used, defines a new direction for the cursor",
          }),
        ),
        status: Type.Optional(
          Type.Union([
            Type.Literal("queued"),
            Type.Literal("running"),
            Type.Literal("paused"),
            Type.Literal("errored"),
            Type.Literal("terminated"),
            Type.Literal("complete"),
            Type.Literal("waitingForPause"),
            Type.Literal("waiting"),
          ]),
        ),
        date_start: Type.Optional(
          Type.String({ description: "Accepts ISO 8601 with no timezone offsets and in UTC.", format: "date-time" }),
        ),
        date_end: Type.Optional(
          Type.String({ description: "Accepts ISO 8601 with no timezone offsets and in UTC.", format: "date-time" }),
        ),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          result: Type.Array(
            Type.Object({
              created_on: Type.String({ format: "date-time", readOnly: true }),
              ended_on: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
              id: Type.String({ minLength: 1, maxLength: 100 }),
              modified_on: Type.String({ format: "date-time", readOnly: true }),
              started_on: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
              status: Type.Union([
                Type.Literal("queued"),
                Type.Literal("running"),
                Type.Literal("paused"),
                Type.Literal("errored"),
                Type.Literal("terminated"),
                Type.Literal("complete"),
                Type.Literal("waitingForPause"),
                Type.Literal("waiting"),
              ]),
              version_id: Type.String({ format: "uuid" }),
              workflow_id: Type.String({ format: "uuid" }),
            }),
          ),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Number(),
              cursor: Type.Optional(Type.String()),
              page: Type.Optional(Type.Number()),
              per_page: Type.Number(),
              total_count: Type.Number(),
            }),
          ),
          success: Type.Union([Type.Literal(true)]),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
      },
    })
      .summary("List of workflow instances")
      .operationId("wor-list-workflow-instances")
      .tag("Workflows")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])
      .extension("x-cfPermissionsRequired", {
        enum: ["com.cloudflare.api.workers.write", "com.cloudflare.api.workers.read"],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/{workflow_name}/instances", {
      params: Type.Object({ workflow_name: Type.String({ minLength: 1, maxLength: 64 }) }),
      body: Type.Object({
        instance_id: Type.Optional(Type.String()),
        instance_retention: Type.Optional(Type.Unknown()),
        params: Type.Optional(Type.Unknown()),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            id: Type.String({ minLength: 1, maxLength: 100 }),
            status: Type.Union([
              Type.Literal("queued"),
              Type.Literal("running"),
              Type.Literal("paused"),
              Type.Literal("errored"),
              Type.Literal("terminated"),
              Type.Literal("complete"),
              Type.Literal("waitingForPause"),
              Type.Literal("waiting"),
            ]),
            version_id: Type.String({ format: "uuid" }),
            workflow_id: Type.String({ format: "uuid" }),
          }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Number(),
              cursor: Type.Optional(Type.String()),
              page: Type.Optional(Type.Number()),
              per_page: Type.Number(),
              total_count: Type.Number(),
            }),
          ),
          success: Type.Union([Type.Literal(true)]),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
      },
    })
      .summary("Create a new workflow instance")
      .operationId("wor-create-new-workflow-instance")
      .tag("Workflows")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", {
        enum: ["com.cloudflare.api.workers.write", "com.cloudflare.api.workers.read"],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/{workflow_name}/instances/batch", {
      params: Type.Object({ workflow_name: Type.String({ minLength: 1, maxLength: 64 }) }),
      body: Type.Array(
        Type.Object({
          instance_id: Type.Optional(Type.String()),
          instance_retention: Type.Optional(Type.Unknown()),
          params: Type.Optional(Type.Unknown()),
        }),
        { minItems: 1, maxItems: 100 },
      ),
      responses: {
        200: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          result: Type.Array(
            Type.Object({
              id: Type.String({ minLength: 1, maxLength: 100 }),
              status: Type.Union([
                Type.Literal("queued"),
                Type.Literal("running"),
                Type.Literal("paused"),
                Type.Literal("errored"),
                Type.Literal("terminated"),
                Type.Literal("complete"),
                Type.Literal("waitingForPause"),
                Type.Literal("waiting"),
              ]),
              version_id: Type.String({ format: "uuid" }),
              workflow_id: Type.String({ format: "uuid" }),
            }),
          ),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Number(),
              cursor: Type.Optional(Type.String()),
              page: Type.Optional(Type.Number()),
              per_page: Type.Number(),
              total_count: Type.Number(),
            }),
          ),
          success: Type.Union([Type.Literal(true)]),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
      },
    })
      .summary("Batch create new Workflow instances")
      .operationId("wor-batch-create-workflow-instance")
      .tag("Workflows")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", {
        enum: ["com.cloudflare.api.workers.write", "com.cloudflare.api.workers.read"],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/{workflow_name}/instances/batch/terminate", {
      params: Type.Object({ workflow_name: Type.String({ minLength: 1, maxLength: 64 }) }),
      body: Type.Array(Type.String(), { minItems: 1, maxItems: 100 }),
      responses: {
        200: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            instancesTerminated: Type.Number(),
            status: Type.Union([Type.Literal("ok"), Type.Literal("already_running")]),
          }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Number(),
              cursor: Type.Optional(Type.String()),
              page: Type.Optional(Type.Number()),
              per_page: Type.Number(),
              total_count: Type.Number(),
            }),
          ),
          success: Type.Union([Type.Literal(true)]),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
      },
    })
      .summary("Batch terminate instances of a workflow")
      .operationId("wor-batch-terminate-workflow-instances")
      .tag("Workflows")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", {
        enum: ["com.cloudflare.api.workers.write", "com.cloudflare.api.workers.read"],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{workflow_name}/instances/terminate", {
      params: Type.Object({ workflow_name: Type.String({ minLength: 1, maxLength: 64 }) }),
      responses: {
        200: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            status: Type.Union([Type.Literal("running"), Type.Literal("not_running")]),
          }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Number(),
              cursor: Type.Optional(Type.String()),
              page: Type.Optional(Type.Number()),
              per_page: Type.Number(),
              total_count: Type.Number(),
            }),
          ),
          success: Type.Union([Type.Literal(true)]),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
      },
    })
      .summary("Get status of the job responsible for terminate all instances of a workflow")
      .operationId("wor-status-terminate-workflow-instances")
      .tag("Workflows")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])
      .extension("x-cfPermissionsRequired", {
        enum: ["com.cloudflare.api.workers.write", "com.cloudflare.api.workers.read"],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{workflow_name}/instances/{instance_id}", {
      params: Type.Object({
        workflow_name: Type.String({ minLength: 1, maxLength: 64 }),
        instance_id: Type.String({ minLength: 1, maxLength: 100 }),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            end: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
            error: Type.Union([
              Type.Object({
                message: Type.String(),
                name: Type.String(),
              }),
              Type.Null(),
            ]),
            output: Type.Union([Type.String(), Type.Number()]),
            params: Type.Unknown(),
            queued: Type.String({ format: "date-time" }),
            start: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
            status: Type.Union([
              Type.Literal("queued"),
              Type.Literal("running"),
              Type.Literal("paused"),
              Type.Literal("errored"),
              Type.Literal("terminated"),
              Type.Literal("complete"),
              Type.Literal("waitingForPause"),
              Type.Literal("waiting"),
            ]),
            steps: Type.Array(
              Type.Union([
                Type.Object({
                  attempts: Type.Array(
                    Type.Object({
                      end: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
                      error: Type.Union([
                        Type.Object({
                          message: Type.String(),
                          name: Type.String(),
                        }),
                        Type.Null(),
                      ]),
                      start: Type.String({ format: "date-time" }),
                      success: Type.Union([Type.Boolean(), Type.Null()]),
                    }),
                  ),
                  config: Type.Object({
                    retries: Type.Object({
                      backoff: Type.Optional(
                        Type.Union([Type.Literal("constant"), Type.Literal("linear"), Type.Literal("exponential")]),
                      ),
                      delay: Type.Union([Type.Unknown(), Type.Number()]),
                      limit: Type.Number(),
                    }),
                    timeout: Type.Union([Type.Unknown(), Type.Number()]),
                  }),
                  end: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
                  name: Type.String(),
                  output: Type.Unknown(),
                  start: Type.String({ format: "date-time" }),
                  success: Type.Union([Type.Boolean(), Type.Null()]),
                  type: Type.Union([Type.Literal("step")]),
                }),
                Type.Object({
                  end: Type.String({ format: "date-time" }),
                  error: Type.Union([
                    Type.Object({
                      message: Type.String(),
                      name: Type.String(),
                    }),
                    Type.Null(),
                  ]),
                  finished: Type.Boolean(),
                  name: Type.String(),
                  start: Type.String({ format: "date-time" }),
                  type: Type.Union([Type.Literal("sleep")]),
                }),
                Type.Object({
                  trigger: Type.Object({
                    source: Type.String(),
                  }),
                  type: Type.Union([Type.Literal("termination")]),
                }),
                Type.Object({
                  end: Type.String({ format: "date-time" }),
                  error: Type.Union([
                    Type.Object({
                      message: Type.String(),
                      name: Type.String(),
                    }),
                    Type.Null(),
                  ]),
                  finished: Type.Boolean(),
                  name: Type.String(),
                  output: Type.Union([Type.Unknown(), Type.String(), Type.Number(), Type.Boolean()]),
                  start: Type.String({ format: "date-time" }),
                  type: Type.Union([Type.Literal("waitForEvent")]),
                }),
              ]),
            ),
            success: Type.Union([Type.Boolean(), Type.Null()]),
            trigger: Type.Object({
              source: Type.Union([
                Type.Literal("unknown"),
                Type.Literal("api"),
                Type.Literal("binding"),
                Type.Literal("event"),
                Type.Literal("cron"),
              ]),
            }),
            versionId: Type.String({ format: "uuid" }),
          }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Number(),
              cursor: Type.Optional(Type.String()),
              page: Type.Optional(Type.Number()),
              per_page: Type.Number(),
              total_count: Type.Number(),
            }),
          ),
          success: Type.Union([Type.Literal(true)]),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
      },
    })
      .summary("Get logs and status from instance")
      .operationId("wor-describe-workflow-instance")
      .tag("Workflows")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])
      .extension("x-cfPermissionsRequired", {
        enum: ["com.cloudflare.api.workers.write", "com.cloudflare.api.workers.read"],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/{workflow_name}/instances/{instance_id}/events/{event_type}", {
      params: Type.Object({
        workflow_name: Type.String({ minLength: 1, maxLength: 64 }),
        instance_id: Type.String({ minLength: 1, maxLength: 100 }),
        event_type: Type.String({ minLength: 1, maxLength: 100 }),
      }),
      body: Type.Unknown(),
      responses: {
        200: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          result: Type.Optional(Type.Unknown()),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Number(),
              cursor: Type.Optional(Type.String()),
              page: Type.Optional(Type.Number()),
              per_page: Type.Number(),
              total_count: Type.Number(),
            }),
          ),
          success: Type.Union([Type.Literal(true)]),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
      },
    })
      .summary("Send event to instance")
      .operationId("wor-send-event-workflow-instance")
      .tag("Workflows")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", {
        enum: ["com.cloudflare.api.workers.write", "com.cloudflare.api.workers.read"],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/{workflow_name}/instances/{instance_id}/status", {
      params: Type.Object({
        workflow_name: Type.String({ minLength: 1, maxLength: 64 }),
        instance_id: Type.String({ minLength: 1, maxLength: 100 }),
      }),
      body: Type.Object({
        status: Type.Union([Type.Literal("resume"), Type.Literal("pause"), Type.Literal("terminate")], {
          description: "Apply action to instance.",
        }),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            status: Type.Union([
              Type.Literal("queued"),
              Type.Literal("running"),
              Type.Literal("paused"),
              Type.Literal("errored"),
              Type.Literal("terminated"),
              Type.Literal("complete"),
              Type.Literal("waitingForPause"),
              Type.Literal("waiting"),
            ]),
            timestamp: Type.String({
              description: "Accepts ISO 8601 with no timezone offsets and in UTC.",
              format: "date-time",
            }),
          }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Number(),
              cursor: Type.Optional(Type.String()),
              page: Type.Optional(Type.Number()),
              per_page: Type.Number(),
              total_count: Type.Number(),
            }),
          ),
          success: Type.Union([Type.Literal(true)]),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
        409: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
      },
    })
      .summary("Change status of instance")
      .operationId("wor-change-status-workflow-instance")
      .tag("Workflows")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers Scripts Write"])
      .extension("x-cfPermissionsRequired", {
        enum: ["com.cloudflare.api.workers.write", "com.cloudflare.api.workers.read"],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{workflow_name}/versions", {
      params: Type.Object({ workflow_name: Type.String({ minLength: 1, maxLength: 64 }) }),
      query: Type.Object({
        per_page: Type.Optional(Type.Number({ default: 50, minimum: 1, maximum: 100 })),
        page: Type.Optional(Type.Number({ default: 1, minimum: 1 })),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          result: Type.Array(
            Type.Object({
              class_name: Type.String(),
              created_on: Type.String({ format: "date-time", readOnly: true }),
              id: Type.String({ format: "uuid" }),
              modified_on: Type.String({ format: "date-time", readOnly: true }),
              workflow_id: Type.String({ format: "uuid" }),
            }),
          ),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Number(),
              cursor: Type.Optional(Type.String()),
              page: Type.Optional(Type.Number()),
              per_page: Type.Number(),
              total_count: Type.Number(),
            }),
          ),
          success: Type.Union([Type.Literal(true)]),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
      },
    })
      .summary("List deployed Workflow versions")
      .operationId("wor-list-workflow-versions")
      .tag("Workflows")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])
      .extension("x-cfPermissionsRequired", {
        enum: ["com.cloudflare.api.workers.write", "com.cloudflare.api.workers.read"],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{workflow_name}/versions/{version_id}", {
      params: Type.Object({
        workflow_name: Type.String({ minLength: 1, maxLength: 64 }),
        version_id: Type.String({ format: "uuid" }),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          result: Type.Object({
            class_name: Type.String(),
            created_on: Type.String({ format: "date-time", readOnly: true }),
            id: Type.String({ format: "uuid" }),
            modified_on: Type.String({ format: "date-time", readOnly: true }),
            workflow_id: Type.String({ format: "uuid" }),
          }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Number(),
              cursor: Type.Optional(Type.String()),
              page: Type.Optional(Type.Number()),
              per_page: Type.Number(),
              total_count: Type.Number(),
            }),
          ),
          success: Type.Union([Type.Literal(true)]),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
        404: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)]),
        }),
      },
    })
      .summary("Get Workflow version details")
      .operationId("wor-describe-workflow-versions")
      .tag("Workflows")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])
      .extension("x-cfPermissionsRequired", {
        enum: ["com.cloudflare.api.workers.write", "com.cloudflare.api.workers.read"],
      })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

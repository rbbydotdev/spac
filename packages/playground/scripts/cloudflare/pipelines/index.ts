import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  CloudflarePipelinesWorkerPipelinesCommonSuccess,
  CloudflarePipelinesWorkersPipelinesBindingSource,
  CloudflarePipelinesWorkersPipelinesHttpSource,
  CloudflarePipelinesWorkersPipelinesPipeline,
} from "./schemas"

export function registerPipelines(api: Api) {
  api.assertVersion("3.0.3", "Pipelines")

  api.group("/accounts/{account_id}/pipelines", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        search: Type.Optional(Type.String({ description: "Specifies the prefix of pipeline name to search." })),
        page: Type.Optional(Type.String({ description: "Specifies which page to retrieve.", default: "1" })),
        per_page: Type.Optional(
          Type.String({ description: "Specifies the number of pipelines per page.", default: "25" }),
        ),
      }),
    })
      .response(
        Type.Object({
          result_info: Type.Object({
            count: Type.Number({ description: "Indicates the number of items on current page." }),
            page: Type.Number({ description: "Indicates the current page number." }),
            per_page: Type.Number({ description: "Indicates the number of items per page." }),
            total_count: Type.Number({ description: "Indicates the total number of items." }),
          }),
          results: Type.Array(CloudflarePipelinesWorkersPipelinesPipeline),
          success: CloudflarePipelinesWorkerPipelinesCommonSuccess,
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          results: Type.Union([Type.Unknown({ "x-stainless-empty-object": true }), Type.Null()]),
          success: CloudflarePipelinesWorkerPipelinesCommonSuccess,
        }),
      )
      .summary("List Pipelines")
      .description("List, filter, and paginate pipelines in an account.")
      .operationId("getV4AccountsByAccount_idPipelines")
      .tag("workers_pipelines_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pipelines Write", "Pipelines Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.post("/", {
      body: Type.Object({
        destination: Type.Object({
          batch: Type.Object({
            max_bytes: Type.Optional(
              Type.Integer({
                description: "Specifies rough maximum size of files.",
                default: 100000000,
                minimum: 1000,
                maximum: 100000000,
              }),
            ),
            max_duration_s: Type.Optional(
              Type.Number({
                description: "Specifies duration to wait to aggregate batches files.",
                default: 300,
                minimum: 0.25,
                maximum: 300,
              }),
            ),
            max_rows: Type.Optional(
              Type.Integer({
                description: "Specifies rough maximum number of rows per file.",
                default: 10000000,
                minimum: 100,
                maximum: 10000000,
              }),
            ),
          }),
          compression: Type.Object({
            type: Type.Optional(
              Type.Union([Type.Literal("none"), Type.Literal("gzip"), Type.Literal("deflate")], {
                description: "Specifies the desired compression algorithm and format.",
              }),
            ),
          }),
          credentials: Type.Object({
            access_key_id: Type.String({ description: "Specifies the R2 Bucket Access Key Id." }),
            endpoint: Type.String({ description: "Specifies the R2 Endpoint." }),
            secret_access_key: Type.String({ description: "Specifies the R2 Bucket Secret Access Key." }),
          }),
          format: Type.Union([Type.Literal("json")], { description: "Specifies the format of data to deliver." }),
          path: Type.Object({
            bucket: Type.String({ description: "Specifies the R2 Bucket to store files." }),
            filename: Type.Optional(
              Type.String({ description: "Specifies the name pattern to for individual data files." }),
            ),
            filepath: Type.Optional(Type.String({ description: "Specifies the name pattern for directory." })),
            prefix: Type.Optional(Type.String({ description: "Specifies the base directory within the bucket." })),
          }),
          type: Type.Union([Type.Literal("r2")], { description: "Specifies the type of destination." }),
        }),
        name: Type.String({ description: "Defines the name of the pipeline.", minLength: 1, maxLength: 128 }),
        source: Type.Array(
          Type.Union([CloudflarePipelinesWorkersPipelinesHttpSource, CloudflarePipelinesWorkersPipelinesBindingSource]),
          { minItems: 1 },
        ),
      }),
    })
      .response(
        Type.Object({
          result: CloudflarePipelinesWorkersPipelinesPipeline,
          success: CloudflarePipelinesWorkerPipelinesCommonSuccess,
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          results: Type.Union([Type.Unknown({ "x-stainless-empty-object": true }), Type.Null()]),
          success: CloudflarePipelinesWorkerPipelinesCommonSuccess,
        }),
      )
      .summary("Create Pipeline")
      .description("Create a new pipeline.")
      .operationId("postV4AccountsByAccount_idPipelines")
      .tag("workers_pipelines_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pipelines Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/{pipeline_name}", {
      params: Type.Object({
        pipeline_name: Type.String({ description: "Defines the name of the pipeline.", minLength: 1, maxLength: 128 }),
      }),
    })
      .response(
        Type.Object({
          result: CloudflarePipelinesWorkersPipelinesPipeline,
          success: CloudflarePipelinesWorkerPipelinesCommonSuccess,
        }),
      )
      .error(
        404,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          results: Type.Union([Type.Unknown({ "x-stainless-empty-object": true }), Type.Null()]),
          success: CloudflarePipelinesWorkerPipelinesCommonSuccess,
        }),
      )
      .summary("Get Pipeline")
      .description("Get configuration of a pipeline.")
      .operationId("getV4AccountsByAccount_idPipelinesByPipeline_name")
      .tag("workers_pipelines_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pipelines Write", "Pipelines Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.put("/{pipeline_name}", {
      params: Type.Object({
        pipeline_name: Type.String({ description: "Defines the name of the pipeline.", minLength: 1, maxLength: 128 }),
      }),
      body: Type.Object({
        destination: Type.Object({
          batch: Type.Object({
            max_bytes: Type.Optional(
              Type.Integer({
                description: "Specifies rough maximum size of files.",
                default: 100000000,
                minimum: 1000,
                maximum: 100000000,
              }),
            ),
            max_duration_s: Type.Optional(
              Type.Number({
                description: "Specifies duration to wait to aggregate batches files.",
                default: 300,
                minimum: 0.25,
                maximum: 300,
              }),
            ),
            max_rows: Type.Optional(
              Type.Integer({
                description: "Specifies rough maximum number of rows per file.",
                default: 10000000,
                minimum: 100,
                maximum: 10000000,
              }),
            ),
          }),
          compression: Type.Object({
            type: Type.Optional(
              Type.Union([Type.Literal("none"), Type.Literal("gzip"), Type.Literal("deflate")], {
                description: "Specifies the desired compression algorithm and format.",
              }),
            ),
          }),
          credentials: Type.Optional(
            Type.Object({
              access_key_id: Type.String({ description: "Specifies the R2 Bucket Access Key Id." }),
              endpoint: Type.String({ description: "Specifies the R2 Endpoint." }),
              secret_access_key: Type.String({ description: "Specifies the R2 Bucket Secret Access Key." }),
            }),
          ),
          format: Type.Union([Type.Literal("json")], { description: "Specifies the format of data to deliver." }),
          path: Type.Object({
            bucket: Type.String({ description: "Specifies the R2 Bucket to store files." }),
            filename: Type.Optional(
              Type.String({ description: "Specifies the name pattern to for individual data files." }),
            ),
            filepath: Type.Optional(Type.String({ description: "Specifies the name pattern for directory." })),
            prefix: Type.Optional(Type.String({ description: "Specifies the base directory within the bucket." })),
          }),
          type: Type.Union([Type.Literal("r2")], { description: "Specifies the type of destination." }),
        }),
        name: Type.String({ description: "Defines the name of the pipeline.", minLength: 1, maxLength: 128 }),
        source: Type.Array(
          Type.Union([CloudflarePipelinesWorkersPipelinesHttpSource, CloudflarePipelinesWorkersPipelinesBindingSource]),
          { minItems: 1 },
        ),
      }),
    })
      .response(
        Type.Object({
          result: CloudflarePipelinesWorkersPipelinesPipeline,
          success: CloudflarePipelinesWorkerPipelinesCommonSuccess,
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          results: Type.Union([Type.Unknown({ "x-stainless-empty-object": true }), Type.Null()]),
          success: CloudflarePipelinesWorkerPipelinesCommonSuccess,
        }),
      )
      .summary("Update Pipeline")
      .description("Update an existing pipeline.")
      .operationId("putV4AccountsByAccount_idPipelinesByPipeline_name")
      .tag("workers_pipelines_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pipelines Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.delete("/{pipeline_name}", {
      params: Type.Object({
        pipeline_name: Type.String({ description: "Defines the name of the pipeline.", minLength: 1, maxLength: 128 }),
      }),
    })
      .summary("Delete Pipeline")
      .description("Delete a pipeline.")
      .operationId("deleteV4AccountsByAccount_idPipelinesByPipeline_name")
      .tag("workers_pipelines_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pipelines Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })
  })
}

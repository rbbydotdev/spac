import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const CloudflarePipelinesWorkersPipelinesBindingSource = named(
  "cloudflare-pipelines_workers_pipelines_binding_source",
  Type.Object({
    format: Type.Union([Type.Literal("json")], { description: "Specifies the format of source data." }),
    type: Type.String(),
  }),
)

export const CloudflarePipelinesWorkersPipelinesHttpSource = named(
  "cloudflare-pipelines_workers_pipelines_http_source",
  Type.Object({
    authentication: Type.Optional(
      Type.Boolean({ description: "Specifies whether authentication is required to send to this pipeline via HTTP." }),
    ),
    cors: Type.Optional(
      Type.Object({
        origins: Type.Optional(
          Type.Array(Type.String(), {
            description: "Specifies allowed origins to allow Cross Origin HTTP Requests.",
            maxItems: 5,
          }),
        ),
      }),
    ),
    format: Type.Union([Type.Literal("json")], { description: "Specifies the format of source data." }),
    type: Type.String(),
  }),
)

export const CloudflarePipelinesWorkersPipelinesAccountId = named(
  "cloudflare-pipelines_workers-pipelines-account-id",
  Type.String({ description: "Specifies the public ID of the account." }),
)

export const CloudflarePipelinesWorkerPipelinesCommonSuccess = named(
  "cloudflare-pipelines_worker-pipelines-common-success",
  Type.Boolean({ description: "Indicates whether the API call was successful." }),
)

export const CloudflarePipelinesWorkersPipelinesPipeline = named(
  "cloudflare-pipelines_workers-pipelines-pipeline",
  Type.Object(
    {
      destination: Type.Object({
        batch: Type.Object({
          max_bytes: Type.Integer({
            description: "Specifies rough maximum size of files.",
            default: 100000000,
            minimum: 1000,
            maximum: 100000000,
          }),
          max_duration_s: Type.Number({
            description: "Specifies duration to wait to aggregate batches files.",
            default: 300,
            minimum: 0.25,
            maximum: 300,
          }),
          max_rows: Type.Integer({
            description: "Specifies rough maximum number of rows per file.",
            default: 10000000,
            minimum: 100,
            maximum: 10000000,
          }),
        }),
        compression: Type.Object({
          type: Type.Union([Type.Literal("none"), Type.Literal("gzip"), Type.Literal("deflate")], {
            description: "Specifies the desired compression algorithm and format.",
          }),
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
      endpoint: Type.String({ description: "Indicates the endpoint URL to send traffic." }),
      id: Type.String({ description: "Specifies the pipeline identifier." }),
      name: Type.String({ description: "Defines the name of the pipeline.", minLength: 1, maxLength: 128 }),
      source: Type.Array(
        Type.Union([CloudflarePipelinesWorkersPipelinesHttpSource, CloudflarePipelinesWorkersPipelinesBindingSource]),
        { minItems: 1 },
      ),
      version: Type.Number({ description: "Indicates the version number of last saved configuration." }),
    },
    { description: "Describes the configuration of a pipeline." },
  ),
)

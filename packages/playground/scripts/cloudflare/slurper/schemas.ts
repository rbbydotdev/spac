import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { MqApiV4Error, MqApiV4Message, R2SippyProvider } from "../shared/schemas"

export const R2SlurperJurisdiction = named(
  "r2-slurper_Jurisdiction",
  Type.Union([Type.Literal("default"), Type.Literal("eu"), Type.Literal("fedramp")]),
)

export const R2SlurperS3likecredsschema = named(
  "r2-slurper_S3LikeCredsSchema",
  Type.Object({
    accessKeyId: Type.Optional(Type.String()),
    secretAccessKey: Type.Optional(Type.String({ "x-sensitive": true })),
  }),
)

export const R2SlurperR2sourceschema = named(
  "r2-slurper_R2SourceSchema",
  Type.Object({
    bucket: Type.Optional(Type.String()),
    jurisdiction: Type.Optional(R2SlurperJurisdiction),
    secret: Type.Optional(R2SlurperS3likecredsschema),
    vendor: Type.Optional(R2SippyProvider),
  }),
)

export const R2SlurperR2targetschema = named("r2-slurper_R2TargetSchema", R2SlurperR2sourceschema)

export const R2SlurperConnectivityresponse = named(
  "r2-slurper_ConnectivityResponse",
  Type.Object({
    connectivityStatus: Type.Optional(Type.Union([Type.Literal("success"), Type.Literal("error")])),
  }),
)

export const R2SlurperS3sourceschema = named(
  "r2-slurper_S3SourceSchema",
  Type.Object({
    bucket: Type.Optional(Type.String()),
    endpoint: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    secret: Type.Optional(R2SlurperS3likecredsschema),
    vendor: Type.Optional(Type.Union([Type.Literal("s3")])),
  }),
)

export const R2SlurperGcslikecredsschema = named(
  "r2-slurper_GCSLikeCredsSchema",
  Type.Object({
    clientEmail: Type.Optional(Type.String()),
    privateKey: Type.Optional(Type.String({ "x-sensitive": true })),
  }),
)

export const R2SlurperGcssourceschema = named(
  "r2-slurper_GCSSourceSchema",
  Type.Object({
    bucket: Type.Optional(Type.String()),
    secret: Type.Optional(R2SlurperGcslikecredsschema),
    vendor: Type.Optional(Type.Union([Type.Literal("gcs")])),
  }),
)

export const R2SlurperSourcejobschema = named(
  "r2-slurper_SourceJobSchema",
  Type.Union([R2SlurperS3sourceschema, R2SlurperGcssourceschema, R2SlurperR2sourceschema]),
)

export const R2SlurperJobstatus = named(
  "r2-slurper_JobStatus",
  Type.Union([Type.Literal("running"), Type.Literal("paused"), Type.Literal("aborted"), Type.Literal("completed")]),
)

export const R2SlurperJobprogressresponse = named(
  "r2-slurper_JobProgressResponse",
  Type.Object({
    createdAt: Type.Optional(Type.String()),
    failedObjects: Type.Optional(Type.Integer()),
    id: Type.Optional(Type.String()),
    objects: Type.Optional(Type.Integer()),
    skippedObjects: Type.Optional(Type.Integer()),
    status: Type.Optional(R2SlurperJobstatus),
    transferredObjects: Type.Optional(Type.Integer()),
  }),
)

export const R2SlurperJoblogresponse = named(
  "r2-slurper_JobLogResponse",
  Type.Object({
    createdAt: Type.Optional(Type.String()),
    job: Type.Optional(Type.String()),
    logType: Type.Optional(
      Type.Union([
        Type.Literal("migrationStart"),
        Type.Literal("migrationComplete"),
        Type.Literal("migrationAbort"),
        Type.Literal("migrationError"),
        Type.Literal("migrationPause"),
        Type.Literal("migrationResume"),
        Type.Literal("migrationErrorFailedContinuation"),
        Type.Literal("importErrorRetryExhaustion"),
        Type.Literal("importSkippedStorageClass"),
        Type.Literal("importSkippedOversized"),
        Type.Literal("importSkippedEmptyObject"),
        Type.Literal("importSkippedUnsupportedContentType"),
        Type.Literal("importSkippedExcludedContentType"),
        Type.Literal("importSkippedInvalidMedia"),
        Type.Literal("importSkippedRequiresRetrieval"),
      ]),
    ),
    message: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    objectKey: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  }),
)

export const R2SlurperCreatejobrequest = named(
  "r2-slurper_CreateJobRequest",
  Type.Object({
    overwrite: Type.Optional(Type.Boolean({ default: true })),
    source: Type.Optional(R2SlurperSourcejobschema),
    target: Type.Optional(R2SlurperR2targetschema),
  }),
)

export const R2SlurperApiV4Failure = named(
  "r2-slurper_api-v4-failure",
  Type.Object({
    errors: Type.Optional(MqApiV4Error),
    messages: Type.Optional(MqApiV4Message),
    success: Type.Optional(
      Type.Union([Type.Literal(false)], {
        description: "Indicates if the API call was successful or not.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const R2SlurperJobresponse = named(
  "r2-slurper_JobResponse",
  Type.Object({
    createdAt: Type.Optional(Type.String()),
    finishedAt: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    id: Type.Optional(Type.String()),
    overwrite: Type.Optional(Type.Boolean()),
    source: Type.Optional(
      Type.Union([
        Type.Object({
          bucket: Type.Optional(Type.String()),
          endpoint: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          pathPrefix: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          vendor: Type.Optional(Type.Union([Type.Literal("s3")])),
        }),
        Type.Object({
          bucket: Type.Optional(Type.String()),
          pathPrefix: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          vendor: Type.Optional(Type.Union([Type.Literal("gcs")])),
        }),
        Type.Object({
          bucket: Type.Optional(Type.String()),
          jurisdiction: Type.Optional(R2SlurperJurisdiction),
          pathPrefix: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          vendor: Type.Optional(R2SippyProvider),
        }),
      ]),
    ),
    status: Type.Optional(R2SlurperJobstatus),
    target: Type.Optional(
      Type.Object({
        bucket: Type.Optional(Type.String()),
        jurisdiction: Type.Optional(R2SlurperJurisdiction),
        vendor: Type.Optional(R2SippyProvider),
      }),
    ),
  }),
)

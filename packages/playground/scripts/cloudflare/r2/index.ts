import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  R2BucketName,
  R2Errors,
  R2Jurisdiction,
  R2Messages,
  R2V4Response,
  R2V4ResponseFailure,
} from "../shared/schemas"
import {
  R2AccountLevelMetrics,
  R2AddCustomDomainRequest,
  R2AddCustomDomainResponse,
  R2Bucket,
  R2BucketLocation,
  R2BucketLockRule,
  R2BucketLockRuleConfig,
  R2CorsRule,
  R2DomainName,
  R2EditCustomDomainRequest,
  R2EditCustomDomainResponse,
  R2EditManagedDomainRequest,
  R2EnableSippyAws,
  R2EnableSippyGcs,
  R2GetCustomDomainResponse,
  R2LifecycleConfig,
  R2LifecycleRule,
  R2ListCustomDomainsResponse,
  R2ManagedDomainResponse,
  R2RemoveCustomDomainResponse,
  R2ResultInfo,
  R2Sippy,
  R2StorageClass,
  R2TempAccessCredsRequest,
  R2TempAccessCredsResponse,
} from "./schemas"

export function registerR2(api: Api) {
  api.assertVersion("3.0.3", "R2")

  api.group("/accounts/{account_id}/r2", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/buckets", {
      query: Type.Object({
        name_contains: Type.Optional(
          Type.String({
            description: "Bucket names to filter by. Only buckets with this phrase in their name will be returned.",
          }),
        ),
        start_after: Type.Optional(
          Type.String({ description: "Bucket name to start searching after. Buckets are ordered lexicographically." }),
        ),
        per_page: Type.Optional(
          Type.Number({
            description: "Maximum number of buckets to return in a single call.",
            default: 20,
            minimum: 1,
            maximum: 1000,
          }),
        ),
        order: Type.Optional(Type.Union([Type.Literal("name")], { description: "Field to order buckets by." })),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Direction to order buckets." }),
        ),
        cursor: Type.Optional(
          Type.String({
            description:
              "Pagination cursor received during the last List Buckets call. R2 buckets are paginated using cursors instead of page numbers.",
          }),
        ),
      }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: Type.Object({
            buckets: Type.Optional(Type.Array(R2Bucket)),
          }),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(R2ResultInfo),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("List Buckets")
      .description("Lists all R2 buckets on your account.")
      .operationId("r2-list-buckets")
      .tag("R2 Bucket")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Workers R2 Storage Write", "Workers R2 Storage Read"])

    g.post("/buckets", {
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
      body: Type.Object({
        locationHint: Type.Optional(R2BucketLocation),
        name: R2BucketName,
        storageClass: Type.Optional(R2StorageClass),
      }),
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: R2Bucket,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Create Bucket")
      .description("Creates a new R2 bucket.")
      .operationId("r2-create-bucket")
      .tag("R2 Bucket")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Workers R2 Storage Write"])

    g.get("/buckets/{bucket_name}", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: R2Bucket,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Get Bucket")
      .description("Gets properties of an existing R2 bucket.")
      .operationId("r2-get-bucket")
      .tag("R2 Bucket")
      .security({ api_token: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.r2.bucket.read"] })

    g.patch("/buckets/{bucket_name}", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
        "cf-r2-storage-class": R2StorageClass,
      }),
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: R2Bucket,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Patch Bucket")
      .description("Updates properties of an existing R2 bucket.")
      .operationId("r2-patch-bucket")
      .tag("R2 Bucket")
      .security({ api_token: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.r2.bucket.write"] })

    g.delete("/buckets/{bucket_name}", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
    })
      .response(R2V4Response)
      .error("4XX", R2V4ResponseFailure)
      .summary("Delete Bucket")
      .description("Deletes an existing R2 bucket.")
      .operationId("r2-delete-bucket")
      .tag("R2 Bucket")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Workers R2 Storage Write"])

    g.get("/buckets/{bucket_name}/cors", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: Type.Object({
            rules: Type.Optional(Type.Array(R2CorsRule)),
          }),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Get Bucket CORS Policy")
      .description("Get the CORS policy for a bucket.")
      .operationId("r2-get-bucket-cors-policy")
      .tag("R2 Bucket")
      .security({ api_token: [] })

    g.put("/buckets/{bucket_name}/cors", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
      body: Type.Object({
        rules: Type.Optional(Type.Array(R2CorsRule)),
      }),
    })
      .response(R2V4Response)
      .error("4XX", R2V4ResponseFailure)
      .summary("Put Bucket CORS Policy")
      .description("Set the CORS policy for a bucket.")
      .operationId("r2-put-bucket-cors-policy")
      .tag("R2 Bucket")
      .security({ api_token: [] })

    g.delete("/buckets/{bucket_name}/cors", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
    })
      .response(R2V4Response)
      .error("4XX", R2V4ResponseFailure)
      .summary("Delete Bucket CORS Policy")
      .description("Delete the CORS policy for a bucket.")
      .operationId("r2-delete-bucket-cors-policy")
      .tag("R2 Bucket")
      .security({ api_token: [] })

    g.get("/buckets/{bucket_name}/domains/custom", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: R2ListCustomDomainsResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("List Custom Domains of Bucket")
      .description("Gets a list of all custom domains registered with an existing R2 bucket.")
      .operationId("r2-list-custom-domains")
      .tag("R2 Bucket")
      .security({ api_token: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.r2.bucket.read"] })

    g.post("/buckets/{bucket_name}/domains/custom", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
      body: R2AddCustomDomainRequest,
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: R2AddCustomDomainResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Attach Custom Domain To Bucket")
      .description("Register a new custom domain for an existing R2 bucket.")
      .operationId("r2-add-custom-domain")
      .tag("R2 Bucket")
      .security({ api_token: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.r2.bucket.write"] })

    g.get("/buckets/{bucket_name}/domains/custom/{domain}", {
      params: Type.Object({ bucket_name: R2BucketName, domain: R2DomainName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: R2GetCustomDomainResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Get Custom Domain Settings")
      .description("Get the configuration for a custom domain on an existing R2 bucket.")
      .operationId("r2-get-custom-domain-settings")
      .tag("R2 Bucket")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Workers R2 Storage Write", "Workers R2 Storage Read"])

    g.put("/buckets/{bucket_name}/domains/custom/{domain}", {
      params: Type.Object({ bucket_name: R2BucketName, domain: R2DomainName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
      body: R2EditCustomDomainRequest,
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: R2EditCustomDomainResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Configure Custom Domain Settings")
      .description("Edit the configuration for a custom domain on an existing R2 bucket.")
      .operationId("r2-edit-custom-domain-settings")
      .tag("R2 Bucket")
      .security({ api_token: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.r2.bucket.write"] })

    g.delete("/buckets/{bucket_name}/domains/custom/{domain}", {
      params: Type.Object({ bucket_name: R2BucketName, domain: R2DomainName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: R2RemoveCustomDomainResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Remove Custom Domain From Bucket")
      .description("Remove custom domain registration from an existing R2 bucket.")
      .operationId("r2-delete-custom-domain")
      .tag("R2 Bucket")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Workers R2 Storage Write"])

    g.get("/buckets/{bucket_name}/domains/managed", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: R2ManagedDomainResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Get r2.dev Domain of Bucket")
      .description("Gets state of public access over the bucket's R2-managed (r2.dev) domain.")
      .operationId("r2-get-bucket-public-policy")
      .tag("R2 Bucket")
      .security({ api_token: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.r2.bucket.read"] })

    g.put("/buckets/{bucket_name}/domains/managed", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
      body: R2EditManagedDomainRequest,
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: R2ManagedDomainResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Update r2.dev Domain of Bucket")
      .description("Updates state of public access over the bucket's R2-managed (r2.dev) domain.")
      .operationId("r2-put-bucket-public-policy")
      .tag("R2 Bucket")
      .security({ api_token: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.r2.bucket.write"] })

    g.get("/buckets/{bucket_name}/lifecycle", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: R2LifecycleConfig,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Get Object Lifecycle Rules")
      .description("Get object lifecycle rules for a bucket.")
      .operationId("r2-get-bucket-lifecycle-configuration")
      .tag("R2 Bucket")
      .security({ api_token: [] })

    g.put("/buckets/{bucket_name}/lifecycle", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
      body: Type.Object({
        rules: Type.Optional(Type.Array(R2LifecycleRule)),
      }),
    })
      .response(R2V4Response)
      .error("4XX", R2V4ResponseFailure)
      .summary("Put Object Lifecycle Rules")
      .description("Set the object lifecycle rules for a bucket.")
      .operationId("r2-put-bucket-lifecycle-configuration")
      .tag("R2 Bucket")
      .security({ api_token: [] })

    g.get("/buckets/{bucket_name}/lock", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: R2BucketLockRuleConfig,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Get Bucket Lock Rules")
      .description("Get lock rules for a bucket.")
      .operationId("r2-get-bucket-lock-configuration")
      .tag("R2 Bucket")
      .security({ api_token: [] })

    g.put("/buckets/{bucket_name}/lock", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
      body: Type.Object({
        rules: Type.Optional(Type.Array(R2BucketLockRule)),
      }),
    })
      .response(R2V4Response)
      .error("4XX", R2V4ResponseFailure)
      .summary("Put Bucket Lock Rules")
      .description("Set lock rules for a bucket.")
      .operationId("r2-put-bucket-lock-configuration")
      .tag("R2 Bucket")
      .security({ api_token: [] })

    g.get("/buckets/{bucket_name}/sippy", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: R2Sippy,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Get Sippy Configuration")
      .description("Gets configuration for Sippy for an existing R2 bucket.")
      .operationId("r2-get-bucket-sippy-config")
      .tag("R2 Bucket")
      .security({ api_token: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.r2.bucket.read"] })

    g.put("/buckets/{bucket_name}/sippy", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
      body: Type.Union([R2EnableSippyAws, R2EnableSippyGcs]),
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: R2Sippy,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Enable Sippy")
      .description("Sets configuration for Sippy for an existing R2 bucket.")
      .operationId("r2-put-bucket-sippy-config")
      .tag("R2 Bucket")
      .security({ api_token: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.r2.bucket.write"] })

    g.delete("/buckets/{bucket_name}/sippy", {
      params: Type.Object({ bucket_name: R2BucketName }),
      headers: Type.Object({
        "cf-r2-jurisdiction": Type.Optional(R2Jurisdiction),
      }),
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: Type.Object({
            enabled: Type.Optional(Type.Union([Type.Literal(false)])),
          }),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Disable Sippy")
      .description("Disables Sippy on this bucket.")
      .operationId("r2-delete-bucket-sippy-config")
      .tag("R2 Bucket")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Workers R2 Storage Write"])

    g.get("/metrics", {})
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: R2AccountLevelMetrics,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Get Account-Level Metrics")
      .description(
        "Get Storage/Object Count Metrics across all buckets in your account. Note that Account-Level Metrics may not immediately reflect the latest data.",
      )
      .operationId("r2-get-account-level-metrics")
      .tag("R2 Account")
      .security({ api_token: [] })
      .extension("x-cfPermissionsRequired", null)

    g.post("/temp-access-credentials", {
      body: R2TempAccessCredsRequest,
    })
      .response(
        Type.Object({
          errors: R2Errors,
          messages: R2Messages,
          result: R2TempAccessCredsResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", R2V4ResponseFailure)
      .summary("Create Temporary Access Credentials")
      .description(
        "Creates temporary access credentials on a bucket that can be optionally scoped to prefixes or objects.",
      )
      .operationId("r2-create-temp-access-credentials")
      .tag("R2 Bucket")
      .security({ api_token: [] })
  })
}

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"
import {
  WorkersAccountIdentifier,
  WorkersAccountSettings,
  WorkersApiResponseCommon,
  WorkersApiResponseCommonFailure,
  WorkersApiResponseNullResult,
  WorkersBindings,
  WorkersCompletedUploadAssetsResponse,
  WorkersCreateAssetsUploadSessionObject,
  WorkersCreateAssetsUploadSessionResponse,
  WorkersCreatedOn,
  WorkersCursor,
  WorkersDeployment,
  WorkersDispatchNamespaceName,
  WorkersDomainIdentifier,
  WorkersDomainResponseCollection,
  WorkersDomainResponseSingle,
  WorkersEnvironment,
  WorkersHostname,
  WorkersModifiedOn,
  WorkersNamespace,
  WorkersNamespaceListResponse,
  WorkersNamespaceScriptDeleteBulkResponse,
  WorkersNamespaceScriptResponse,
  WorkersNamespaceScriptResponseSingle,
  WorkersNamespaceSingleResponse,
  WorkersObject,
  WorkersObservabilityQueryResults,
  WorkersRoute,
  WorkersSchedule,
  WorkersSchemasEnvironment,
  WorkersSchemasId,
  WorkersSchemasScriptName,
  WorkersSchemasService,
  WorkersSchemasSubdomain,
  WorkersScriptAndVersionSettingsItem,
  WorkersScriptAndVersionSettingsResponse,
  WorkersScriptName,
  WorkersScriptResponseCollection,
  WorkersScriptResponseSingle,
  WorkersScriptResponseUploadSingle,
  WorkersScriptSettingsItem,
  WorkersScriptSettingsResponse,
  WorkersSecret,
  WorkersSecretName,
  WorkersSecretNameUrlEncoded,
  WorkersService,
  WorkersSubdomain,
  WorkersTag,
  WorkersTags,
  WorkersTail,
  WorkersTrustedWorkers,
  WorkersUploadAssetsResponse,
  WorkersUsageModel,
  WorkersUsageModelResponse,
  WorkersUserLimits,
  WorkersVersion,
  WorkersVersionIdentifier,
  WorkersVersionsListResponse,
  WorkersVersionsSingleResponse,
  WorkersVersionsUploadResponse,
  WorkersWorker,
  WorkersZoneIdentifier,
  WorkersZoneName,
} from "./schemas"

export function registerWorkers(api: Api) {
  api.assertVersion("3.0.3", "Workers")

  api
    .get("/accounts/{account_id}/workers/account-settings", {
      params: Type.Object({ account_id: DlsIdentifier }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersAccountSettings,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Fetch Worker Account Settings")
    .description("Fetches Worker account settings for an account.")
    .operationId("worker-account-settings-fetch-worker-account-settings")
    .tag("Worker Account Settings")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Trust and Safety Write",
      "Trust and Safety Read",
      "DNS View Write",
      "DNS View Read",
      "SCIM Provisioning",
      "Load Balancers Account Write",
      "Load Balancers Account Read",
      "Zero Trust: PII Read",
      "DDoS Botnet Feed Write",
      "DDoS Botnet Feed Read",
      "Workers R2 Storage Write",
      "Workers R2 Storage Read",
      "DDoS Protection Write",
      "DDoS Protection Read",
      "Workers Tail Read",
      "Workers KV Storage Write",
      "Workers KV Storage Read",
      "Workers Scripts Write",
      "Workers Scripts Read",
      "Load Balancing: Monitors and Pools Write",
      "Load Balancing: Monitors and Pools Read",
      "Account Firewall Access Rules Write",
      "Account Firewall Access Rules Read",
      "DNS Firewall Write",
      "DNS Firewall Read",
      "Billing Write",
      "Billing Read",
      "Account Settings Write",
      "Account Settings Read",
    ])

  api
    .put("/accounts/{account_id}/workers/account-settings", {
      params: Type.Object({ account_id: DlsIdentifier }),
      body: WorkersAccountSettings,
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersAccountSettings,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Create Worker Account Settings")
    .description("Creates Worker account settings for an account.")
    .operationId("worker-account-settings-create-worker-account-settings")
    .tag("Worker Account Settings")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write"])

  api
    .post("/accounts/{account_id}/workers/assets/upload", {
      params: Type.Object({ account_id: DlsIdentifier }),
      query: Type.Object({
        base64: Type.Union([Type.Literal(true)], {
          description: "Whether the file contents are base64-encoded. Must be `true`.",
        }),
      }),
    })
    .respond(201, WorkersCompletedUploadAssetsResponse)
    .respond(202, WorkersUploadAssetsResponse)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Upload Assets")
    .description(
      "Upload assets ahead of creating a Worker version.  To learn more about the direct uploads of assets, see https://developers.cloudflare.com/workers/static-assets/direct-upload/.",
    )
    .operationId("worker-assets-upload")
    .tag("Worker Script")
    .security({ assets_jwt: [] })

  api
    .get("/accounts/{account_id}/workers/dispatch/namespaces", {
      params: Type.Object({ account_id: DlsIdentifier }),
    })
    .response(WorkersNamespaceListResponse)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("List dispatch namespaces")
    .description("Fetch a list of Workers for Platforms namespaces.")
    .operationId("namespace-worker-list")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .post("/accounts/{account_id}/workers/dispatch/namespaces", {
      params: Type.Object({ account_id: DlsIdentifier }),
      body: Type.Object({
        name: Type.Optional(Type.String({ description: "The name of the dispatch namespace.", "x-auditable": true })),
      }),
    })
    .response(WorkersNamespaceSingleResponse)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Create dispatch namespace")
    .description("Create a new Workers for Platforms namespace.")
    .operationId("namespace-worker-create")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}", {
      params: Type.Object({ account_id: DlsIdentifier, dispatch_namespace: WorkersDispatchNamespaceName }),
    })
    .response(WorkersNamespaceSingleResponse)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get dispatch namespace")
    .description("Get a Workers for Platforms namespace.")
    .operationId("namespace-worker-get-namespace")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .put("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}", {
      params: Type.Object({ account_id: DlsIdentifier, dispatch_namespace: WorkersDispatchNamespaceName }),
      body: Type.Object({
        name: Type.Optional(Type.String({ description: "The name of the dispatch namespace.", "x-auditable": true })),
        trusted_workers: Type.Optional(WorkersTrustedWorkers),
      }),
    })
    .response(WorkersNamespaceSingleResponse)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Update dispatch namespace")
    .description("Update a Workers for Platforms namespace.")
    .operationId("namespace-worker-put-namespace")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .patch("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}", {
      params: Type.Object({ account_id: DlsIdentifier, dispatch_namespace: WorkersDispatchNamespaceName }),
      body: Type.Object({
        name: Type.Optional(Type.String({ description: "The name of the dispatch namespace.", "x-auditable": true })),
        trusted_workers: Type.Optional(WorkersTrustedWorkers),
      }),
    })
    .response(WorkersNamespaceSingleResponse)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Patch dispatch namespace")
    .description("Patch a Workers for Platforms namespace. Omitted fields are left unchanged.")
    .operationId("namespace-worker-patch-namespace")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .delete("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}", {
      params: Type.Object({ account_id: DlsIdentifier, dispatch_namespace: WorkersDispatchNamespaceName }),
    })
    .response(WorkersApiResponseNullResult)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Delete dispatch namespace")
    .description("Delete a Workers for Platforms namespace.")
    .operationId("namespace-worker-delete-namespace")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts", {
      params: Type.Object({ account_id: DlsIdentifier, dispatch_namespace: WorkersDispatchNamespaceName }),
      query: Type.Object({
        tags: Type.Optional(Type.String()),
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Array(WorkersNamespaceScriptResponse),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("List Scripts in Namespace")
    .description("Fetch a list of scripts uploaded to a Workers for Platforms namespace.")
    .operationId("namespace-worker-list-scripts")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .delete("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts", {
      params: Type.Object({ account_id: DlsIdentifier, dispatch_namespace: WorkersDispatchNamespaceName }),
      query: Type.Object({
        tags: Type.Optional(Type.String()),
        limit: Type.Optional(Type.Integer()),
      }),
    })
    .response(WorkersNamespaceScriptDeleteBulkResponse)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Delete Scripts in Namespace")
    .description("Delete multiple scripts from a Workers for Platforms namespace based on optional tag filters.")
    .operationId("namespace-worker-delete-scripts")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}", {
      params: Type.Object({
        account_id: DlsIdentifier,
        dispatch_namespace: WorkersDispatchNamespaceName,
        script_name: WorkersScriptName,
      }),
    })
    .response(WorkersNamespaceScriptResponseSingle)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Worker Details")
    .description("Fetch information about a script uploaded to a Workers for Platforms namespace.")
    .operationId("namespace-worker-script-worker-details")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .put("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}", {
      params: Type.Object({
        account_id: DlsIdentifier,
        dispatch_namespace: WorkersDispatchNamespaceName,
        script_name: WorkersScriptName,
      }),
    })
    .response(WorkersScriptResponseUploadSingle)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Upload Worker Module")
    .description(
      "Upload a worker module to a Workers for Platforms namespace. You can find more about the multipart metadata on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/.",
    )
    .operationId("namespace-worker-script-upload-worker-module")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .delete("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}", {
      params: Type.Object({
        account_id: DlsIdentifier,
        dispatch_namespace: WorkersDispatchNamespaceName,
        script_name: WorkersScriptName,
      }),
      query: Type.Object({
        force: Type.Optional(Type.Boolean()),
      }),
    })
    .response(WorkersApiResponseNullResult)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Delete Worker")
    .description(
      "Delete a worker from a Workers for Platforms namespace. This call has no response body on a successful delete.",
    )
    .operationId("namespace-worker-script-delete-worker")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .post(
      "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/assets-upload-session",
      {
        params: Type.Object({
          account_id: DlsIdentifier,
          dispatch_namespace: WorkersDispatchNamespaceName,
          script_name: WorkersScriptName,
        }),
        body: WorkersCreateAssetsUploadSessionObject,
      },
    )
    .response(WorkersCreateAssetsUploadSessionResponse)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Create Assets Upload Session")
    .description(
      "Start uploading a collection of assets for use in a Worker version. To learn more about the direct uploads of assets, see https://developers.cloudflare.com/workers/static-assets/direct-upload/.",
    )
    .operationId("namespace-worker-script-update-create-assets-upload-session")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .get("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/bindings", {
      params: Type.Object({
        account_id: DlsIdentifier,
        dispatch_namespace: WorkersDispatchNamespaceName,
        script_name: WorkersScriptName,
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersBindings,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get Script Bindings")
    .description("Fetch script bindings from a script uploaded to a Workers for Platforms namespace.")
    .operationId("namespace-worker-get-script-bindings")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .get("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/content", {
      params: Type.Object({
        account_id: DlsIdentifier,
        dispatch_namespace: WorkersDispatchNamespaceName,
        script_name: WorkersScriptName,
      }),
    })
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get Script Content")
    .description("Fetch script content from a script uploaded to a Workers for Platforms namespace.")
    .operationId("namespace-worker-get-script-content")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .put("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/content", {
      params: Type.Object({
        account_id: DlsIdentifier,
        dispatch_namespace: WorkersDispatchNamespaceName,
        script_name: WorkersScriptName,
      }),
      headers: Type.Object({
        "CF-WORKER-BODY-PART": Type.Optional(Type.String()),
        "CF-WORKER-MAIN-MODULE-PART": Type.Optional(Type.String()),
      }),
    })
    .response(WorkersScriptResponseSingle)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Put Script Content")
    .description("Put script content for a script uploaded to a Workers for Platforms namespace.")
    .operationId("namespace-worker-put-script-content")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets", {
      params: Type.Object({
        account_id: DlsIdentifier,
        dispatch_namespace: WorkersDispatchNamespaceName,
        script_name: WorkersScriptName,
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Array(WorkersSecret),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("List Script Secrets")
    .description("List secrets bound to a script uploaded to a Workers for Platforms namespace.")
    .operationId("namespace-worker-list-script-secrets")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .put("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets", {
      params: Type.Object({
        account_id: DlsIdentifier,
        dispatch_namespace: WorkersDispatchNamespaceName,
        script_name: WorkersScriptName,
      }),
      body: WorkersSecret,
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersSecret,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Add script secret")
    .description("Add a secret to a script uploaded to a Workers for Platforms namespace.")
    .operationId("namespace-worker-put-script-secrets")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get(
      "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets/{secret_name}",
      {
        params: Type.Object({
          account_id: DlsIdentifier,
          dispatch_namespace: WorkersDispatchNamespaceName,
          script_name: WorkersScriptName,
          secret_name: WorkersSecretName,
        }),
        query: Type.Object({
          url_encoded: Type.Optional(WorkersSecretNameUrlEncoded),
        }),
      },
    )
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersSecret,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get secret binding")
    .description(
      "Get a given secret binding (value omitted) on a script uploaded to a Workers for Platforms namespace.",
    )
    .operationId("namespace-worker-get-script-secrets")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .delete(
      "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets/{secret_name}",
      {
        params: Type.Object({
          account_id: DlsIdentifier,
          dispatch_namespace: WorkersDispatchNamespaceName,
          script_name: WorkersScriptName,
          secret_name: WorkersSecretName,
        }),
        query: Type.Object({
          url_encoded: Type.Optional(WorkersSecretNameUrlEncoded),
        }),
      },
    )
    .response(WorkersApiResponseNullResult)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Delete script secret")
    .description("Remove a secret from a script uploaded to a Workers for Platforms namespace.")
    .operationId("namespace-worker-delete-script-secret")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/settings", {
      params: Type.Object({
        account_id: DlsIdentifier,
        dispatch_namespace: WorkersDispatchNamespaceName,
        script_name: WorkersScriptName,
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Optional(WorkersScriptAndVersionSettingsItem),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get Script Settings")
    .description("Get script settings from a script uploaded to a Workers for Platforms namespace.")
    .operationId("namespace-worker-get-script-settings")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .patch("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/settings", {
      params: Type.Object({
        account_id: DlsIdentifier,
        dispatch_namespace: WorkersDispatchNamespaceName,
        script_name: WorkersScriptName,
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Optional(WorkersScriptAndVersionSettingsItem),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Patch Script Settings")
    .description("Patch script metadata, such as bindings.")
    .operationId("namespace-worker-patch-script-settings")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags", {
      params: Type.Object({
        account_id: DlsIdentifier,
        dispatch_namespace: WorkersDispatchNamespaceName,
        script_name: WorkersScriptName,
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Optional(Type.Array(WorkersTag)),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get Script Tags")
    .description("Fetch tags from a script uploaded to a Workers for Platforms namespace.")
    .operationId("namespace-worker-get-script-tags")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .put("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags", {
      params: Type.Object({
        account_id: DlsIdentifier,
        dispatch_namespace: WorkersDispatchNamespaceName,
        script_name: WorkersScriptName,
      }),
      body: WorkersTags,
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Array(WorkersTag),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Put Script Tags")
    .description("Put script tags for a script uploaded to a Workers for Platforms namespace.")
    .operationId("namespace-worker-put-script-tags")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .put("/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags/{tag}", {
      params: Type.Object({
        account_id: DlsIdentifier,
        dispatch_namespace: WorkersDispatchNamespaceName,
        script_name: WorkersScriptName,
        tag: WorkersTag,
      }),
    })
    .response(WorkersApiResponseNullResult)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Put Script Tag")
    .description("Put a single tag on a script uploaded to a Workers for Platforms namespace.")
    .operationId("namespace-worker-put-script-tag")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .delete(
      "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags/{tag}",
      {
        params: Type.Object({
          account_id: DlsIdentifier,
          dispatch_namespace: WorkersDispatchNamespaceName,
          script_name: WorkersScriptName,
          tag: WorkersTag,
        }),
      },
    )
    .response(WorkersApiResponseNullResult)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Delete Script Tag")
    .description("Delete script tag for a script uploaded to a Workers for Platforms namespace.")
    .operationId("namespace-worker-delete-script-tag")
    .tag("Workers for Platforms")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/domains", {
      params: Type.Object({ account_id: WorkersAccountIdentifier }),
      query: Type.Object({
        zone_name: Type.Optional(WorkersZoneName),
        service: Type.Optional(WorkersSchemasService),
        zone_id: Type.Optional(WorkersZoneIdentifier),
        hostname: Type.Optional(Type.String({ description: "Hostname of the Worker Domain." })),
        environment: Type.Optional(
          Type.String({ description: "Worker environment associated with the zone and hostname." }),
        ),
      }),
    })
    .response(WorkersDomainResponseCollection)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("List Domains")
    .description("Lists all Worker Domains for an account.")
    .operationId("worker-domain-list-domains")
    .tag("Worker Domain")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write", "Workers Scripts Read"])

  api
    .put("/accounts/{account_id}/workers/domains", {
      params: Type.Object({ account_id: WorkersAccountIdentifier }),
      body: Type.Object({
        environment: WorkersSchemasEnvironment,
        hostname: WorkersHostname,
        service: WorkersSchemasService,
        zone_id: WorkersZoneIdentifier,
      }),
    })
    .response(WorkersDomainResponseSingle)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("Attach to Domain")
    .description("Attaches a Worker to a zone and hostname.")
    .operationId("worker-domain-attach-to-domain")
    .tag("Worker Domain")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/domains/{domain_id}", {
      params: Type.Object({ account_id: WorkersAccountIdentifier, domain_id: WorkersDomainIdentifier }),
    })
    .response(WorkersDomainResponseSingle)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("Get a Domain")
    .description("Gets a Worker domain.")
    .operationId("worker-domain-get-a-domain")
    .tag("Worker Domain")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write", "Workers Scripts Read"])

  api
    .delete("/accounts/{account_id}/workers/domains/{domain_id}", {
      params: Type.Object({ account_id: WorkersAccountIdentifier, domain_id: WorkersDomainIdentifier }),
    })
    .summary("Detach from Domain")
    .description("Detaches a Worker from a zone and hostname.")
    .operationId("worker-domain-detach-from-domain")
    .tag("Worker Domain")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/durable_objects/namespaces", {
      params: Type.Object({ account_id: DlsIdentifier }),
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 20, minimum: 1, maximum: 1000 })),
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result_info: Type.Optional(
          Type.Object({
            count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
            page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
            per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
            total_count: Type.Optional(
              Type.Number({ description: "Total results available without any search parameters." }),
            ),
          }),
        ),
        result: Type.Optional(Type.Array(WorkersNamespace)),
      }),
    )
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result_info: Type.Optional(
          Type.Object({
            count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
            page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
            per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
            total_count: Type.Optional(
              Type.Number({ description: "Total results available without any search parameters." }),
            ),
          }),
        ),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("List Namespaces")
    .description("Returns the Durable Object namespaces owned by an account.")
    .operationId("durable-objects-namespace-list-namespaces")
    .tag("Durable Objects Namespace")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write", "Workers Scripts Read"])

  api
    .get("/accounts/{account_id}/workers/durable_objects/namespaces/{id}/objects", {
      params: Type.Object({ account_id: DlsIdentifier, id: WorkersSchemasId }),
      query: Type.Object({
        limit: Type.Optional(
          Type.Number({
            description:
              "The number of objects to return. The cursor attribute may be used to iterate over the next batch of objects if there are more than the limit.",
            default: 1000,
            minimum: 10,
            maximum: 10000,
          }),
        ),
        cursor: Type.Optional(
          Type.String({
            description:
              "Opaque token indicating the position from which to continue when requesting the next set of records. A valid value for the cursor can be obtained from the cursors object in the result_info structure.",
          }),
        ),
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result_info: Type.Optional(
          Type.Object({
            count: Type.Optional(Type.Number({ description: "Total results returned based on your list parameters." })),
            page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
            per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
            total_count: Type.Optional(
              Type.Number({ description: "Total results available without any search parameters." }),
            ),
            cursor: Type.Optional(WorkersCursor),
          }),
        ),
        result: Type.Optional(Type.Array(WorkersObject)),
      }),
    )
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result_info: Type.Optional(
          Type.Object({
            count: Type.Optional(Type.Number({ description: "Total results returned based on your list parameters." })),
            page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
            per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
            total_count: Type.Optional(
              Type.Number({ description: "Total results available without any search parameters." }),
            ),
            cursor: Type.Optional(WorkersCursor),
          }),
        ),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("List Objects")
    .description("Returns the Durable Objects in a given namespace.")
    .operationId("durable-objects-namespace-list-objects")
    .tag("Durable Objects Namespace")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write", "Workers Scripts Read"])

  api
    .post("/accounts/{account_id}/workers/observability/telemetry/keys", {
      params: Type.Object({ account_id: Type.String() }),
      body: Type.Object({
        datasets: Type.Optional(Type.Array(Type.String())),
        filters: Type.Optional(
          Type.Array(
            Type.Object({
              key: Type.String(),
              operation: Type.Union([
                Type.Literal("includes"),
                Type.Literal("not_includes"),
                Type.Literal("starts_with"),
                Type.Literal("regex"),
                Type.Literal("exists"),
                Type.Literal("is_null"),
                Type.Literal("in"),
                Type.Literal("not_in"),
                Type.Literal("eq"),
                Type.Literal("neq"),
                Type.Literal("gt"),
                Type.Literal("gte"),
                Type.Literal("lt"),
                Type.Literal("lte"),
                Type.Literal("="),
                Type.Literal("!="),
                Type.Literal(">"),
                Type.Literal(">="),
                Type.Literal("<"),
                Type.Literal("<="),
                Type.Literal("INCLUDES"),
                Type.Literal("DOES_NOT_INCLUDE"),
                Type.Literal("MATCH_REGEX"),
                Type.Literal("EXISTS"),
                Type.Literal("DOES_NOT_EXIST"),
                Type.Literal("IN"),
                Type.Literal("NOT_IN"),
                Type.Literal("STARTS_WITH"),
              ]),
              type: Type.Union([Type.Literal("string"), Type.Literal("number"), Type.Literal("boolean")]),
              value: Type.Optional(Type.Union([Type.String(), Type.Number(), Type.Boolean()])),
            }),
          ),
        ),
        keyNeedle: Type.Optional(
          Type.Object(
            {
              isRegex: Type.Optional(Type.Boolean()),
              matchCase: Type.Optional(Type.Boolean()),
              value: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
            },
            { description: "Search for a specific substring in the keys." },
          ),
        ),
        limit: Type.Optional(Type.Number()),
        needle: Type.Optional(
          Type.Object(
            {
              isRegex: Type.Optional(Type.Boolean()),
              matchCase: Type.Optional(Type.Boolean()),
              value: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
            },
            { description: "Search for a specific substring in the event." },
          ),
        ),
        timeframe: Type.Optional(
          Type.Object({
            from: Type.Number(),
            to: Type.Number(),
          }),
        ),
      }),
    })
    .response(
      Type.Object({
        errors: Type.Array(
          Type.Object({
            message: Type.String(),
          }),
        ),
        messages: Type.Array(
          Type.Object({
            message: Type.Union([Type.Literal("Successful request")]),
          }),
        ),
        result: Type.Array(
          Type.Object({
            key: Type.String(),
            lastSeenAt: Type.Number(),
            type: Type.Union([Type.Literal("string"), Type.Literal("boolean"), Type.Literal("number")]),
          }),
        ),
        success: Type.Union([Type.Literal(true)]),
      }),
    )
    .error(
      401,
      Type.Object({
        errors: Type.Array(
          Type.Object({
            detail: Type.Optional(Type.String()),
            message: Type.Union([Type.Literal("Unauthorized")]),
          }),
        ),
        messages: Type.Array(
          Type.Object({
            message: Type.String(),
          }),
        ),
        success: Type.Union([Type.Literal(false)]),
      }),
    )
    .error(
      500,
      Type.Object({
        errors: Type.Array(
          Type.Object({
            detail: Type.Optional(Type.String()),
            message: Type.Union([Type.Literal("Internal error")]),
          }),
        ),
        messages: Type.Array(
          Type.Object({
            message: Type.String(),
          }),
        ),
        success: Type.Union([Type.Literal(false)]),
      }),
    )
    .summary("List keys")
    .description("List all the keys in your telemetry events.")
    .operationId("telemetry.keys.list")
    .tag("Keys")
    .extension("x-api-token-group", ["Workers Observability Write"])

  api
    .post("/accounts/{account_id}/workers/observability/telemetry/query", {
      params: Type.Object({ account_id: Type.String() }),
      body: Type.Object({
        chart: Type.Optional(Type.Boolean()),
        compare: Type.Optional(Type.Boolean()),
        dry: Type.Optional(Type.Boolean({ default: false })),
        granularity: Type.Optional(Type.Number()),
        ignoreSeries: Type.Optional(Type.Boolean({ default: false })),
        limit: Type.Optional(Type.Number({ default: 50, maximum: 100 })),
        offset: Type.Optional(Type.String()),
        offsetBy: Type.Optional(Type.Number()),
        offsetDirection: Type.Optional(Type.String()),
        parameters: Type.Optional(
          Type.Object({
            calculations: Type.Optional(
              Type.Array(
                Type.Object({
                  alias: Type.Optional(Type.String()),
                  key: Type.Optional(Type.String()),
                  keyType: Type.Optional(
                    Type.Union([Type.Literal("string"), Type.Literal("number"), Type.Literal("boolean")]),
                  ),
                  operator: Type.Union([
                    Type.Literal("uniq"),
                    Type.Literal("count"),
                    Type.Literal("max"),
                    Type.Literal("min"),
                    Type.Literal("sum"),
                    Type.Literal("avg"),
                    Type.Literal("median"),
                    Type.Literal("p001"),
                    Type.Literal("p01"),
                    Type.Literal("p05"),
                    Type.Literal("p10"),
                    Type.Literal("p25"),
                    Type.Literal("p75"),
                    Type.Literal("p90"),
                    Type.Literal("p95"),
                    Type.Literal("p99"),
                    Type.Literal("p999"),
                    Type.Literal("stddev"),
                    Type.Literal("variance"),
                    Type.Literal("COUNT_DISTINCT"),
                    Type.Literal("COUNT"),
                    Type.Literal("MAX"),
                    Type.Literal("MIN"),
                    Type.Literal("SUM"),
                    Type.Literal("AVG"),
                    Type.Literal("MEDIAN"),
                    Type.Literal("P001"),
                    Type.Literal("P01"),
                    Type.Literal("P05"),
                    Type.Literal("P10"),
                    Type.Literal("P25"),
                    Type.Literal("P75"),
                    Type.Literal("P90"),
                    Type.Literal("P95"),
                    Type.Literal("P99"),
                    Type.Literal("P999"),
                    Type.Literal("STDDEV"),
                    Type.Literal("VARIANCE"),
                  ]),
                }),
                { description: "Create Calculations to compute as part of the query." },
              ),
            ),
            datasets: Type.Optional(
              Type.Array(Type.String(), {
                description: "Set the Datasets to query. Leave it empty to query all the datasets.",
              }),
            ),
            filterCombination: Type.Optional(
              Type.Union([Type.Literal("and"), Type.Literal("or"), Type.Literal("AND"), Type.Literal("OR")], {
                description: "Set a Flag to describe how to combine the filters on the query.",
              }),
            ),
            filters: Type.Optional(
              Type.Array(
                Type.Object({
                  key: Type.String(),
                  operation: Type.Union([
                    Type.Literal("includes"),
                    Type.Literal("not_includes"),
                    Type.Literal("starts_with"),
                    Type.Literal("regex"),
                    Type.Literal("exists"),
                    Type.Literal("is_null"),
                    Type.Literal("in"),
                    Type.Literal("not_in"),
                    Type.Literal("eq"),
                    Type.Literal("neq"),
                    Type.Literal("gt"),
                    Type.Literal("gte"),
                    Type.Literal("lt"),
                    Type.Literal("lte"),
                    Type.Literal("="),
                    Type.Literal("!="),
                    Type.Literal(">"),
                    Type.Literal(">="),
                    Type.Literal("<"),
                    Type.Literal("<="),
                    Type.Literal("INCLUDES"),
                    Type.Literal("DOES_NOT_INCLUDE"),
                    Type.Literal("MATCH_REGEX"),
                    Type.Literal("EXISTS"),
                    Type.Literal("DOES_NOT_EXIST"),
                    Type.Literal("IN"),
                    Type.Literal("NOT_IN"),
                    Type.Literal("STARTS_WITH"),
                  ]),
                  type: Type.Union([Type.Literal("string"), Type.Literal("number"), Type.Literal("boolean")]),
                  value: Type.Optional(Type.Union([Type.String(), Type.Number(), Type.Boolean()])),
                }),
                { description: "Configure the Filters to apply to the query." },
              ),
            ),
            groupBys: Type.Optional(
              Type.Array(
                Type.Object({
                  type: Type.Union([Type.Literal("string"), Type.Literal("number"), Type.Literal("boolean")]),
                  value: Type.String(),
                }),
                { description: "Define how to group the results of the query." },
              ),
            ),
            havings: Type.Optional(
              Type.Array(
                Type.Object({
                  key: Type.String(),
                  operation: Type.Union([
                    Type.Literal("eq"),
                    Type.Literal("neq"),
                    Type.Literal("gt"),
                    Type.Literal("gte"),
                    Type.Literal("lt"),
                    Type.Literal("lte"),
                  ]),
                  value: Type.Number(),
                }),
                { description: "Configure the Having clauses that filter on calculations in the query result." },
              ),
            ),
            limit: Type.Optional(
              Type.Integer({
                description: "Set a limit on the number of results / records returned by the query",
                minimum: 0,
                maximum: 100,
              }),
            ),
            needle: Type.Optional(
              Type.Object(
                {
                  isRegex: Type.Optional(Type.Boolean()),
                  matchCase: Type.Optional(Type.Boolean()),
                  value: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
                },
                { description: "Define an expression to search using full-text search." },
              ),
            ),
            orderBy: Type.Optional(
              Type.Object(
                {
                  order: Type.Optional(
                    Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
                      description: "Set the order of the results",
                    }),
                  ),
                  value: Type.String({ description: "Configure which Calculation to order the results by." }),
                },
                { description: "Configure the order of the results returned by the query." },
              ),
            ),
          }),
        ),
        patternType: Type.Optional(Type.Union([Type.Literal("message"), Type.Literal("error")])),
        queryId: Type.String(),
        timeframe: Type.Object({
          from: Type.Number(),
          to: Type.Number(),
        }),
        view: Type.Optional(
          Type.Union([
            Type.Literal("traces"),
            Type.Literal("events"),
            Type.Literal("calculations"),
            Type.Literal("invocations"),
            Type.Literal("requests"),
            Type.Literal("patterns"),
          ]),
        ),
      }),
    })
    .response(
      Type.Object({
        errors: Type.Array(
          Type.Object({
            message: Type.String(),
          }),
        ),
        messages: Type.Array(
          Type.Object({
            message: Type.Union([Type.Literal("Successful request")]),
          }),
        ),
        result: WorkersObservabilityQueryResults,
        success: Type.Union([Type.Literal(true)]),
      }),
    )
    .error(
      401,
      Type.Object({
        errors: Type.Array(
          Type.Object({
            detail: Type.Optional(Type.String()),
            message: Type.Union([Type.Literal("Unauthorized")]),
          }),
        ),
        messages: Type.Array(
          Type.Object({
            message: Type.String(),
          }),
        ),
        success: Type.Union([Type.Literal(false)]),
      }),
    )
    .error(
      500,
      Type.Object({
        errors: Type.Array(
          Type.Object({
            detail: Type.Optional(Type.String()),
            message: Type.Union([Type.Literal("Internal error")]),
          }),
        ),
        messages: Type.Array(
          Type.Object({
            message: Type.String(),
          }),
        ),
        success: Type.Union([Type.Literal(false)]),
      }),
    )
    .summary("Run a query")
    .description("Runs a temporary or saved query")
    .operationId("telemetry.query")
    .tag("Query run")
    .extension("x-api-token-group", ["Workers Observability Write"])

  api
    .post("/accounts/{account_id}/workers/observability/telemetry/values", {
      params: Type.Object({ account_id: Type.String() }),
      body: Type.Object({
        datasets: Type.Array(Type.String()),
        filters: Type.Optional(
          Type.Array(
            Type.Object({
              key: Type.String(),
              operation: Type.Union([
                Type.Literal("includes"),
                Type.Literal("not_includes"),
                Type.Literal("starts_with"),
                Type.Literal("regex"),
                Type.Literal("exists"),
                Type.Literal("is_null"),
                Type.Literal("in"),
                Type.Literal("not_in"),
                Type.Literal("eq"),
                Type.Literal("neq"),
                Type.Literal("gt"),
                Type.Literal("gte"),
                Type.Literal("lt"),
                Type.Literal("lte"),
                Type.Literal("="),
                Type.Literal("!="),
                Type.Literal(">"),
                Type.Literal(">="),
                Type.Literal("<"),
                Type.Literal("<="),
                Type.Literal("INCLUDES"),
                Type.Literal("DOES_NOT_INCLUDE"),
                Type.Literal("MATCH_REGEX"),
                Type.Literal("EXISTS"),
                Type.Literal("DOES_NOT_EXIST"),
                Type.Literal("IN"),
                Type.Literal("NOT_IN"),
                Type.Literal("STARTS_WITH"),
              ]),
              type: Type.Union([Type.Literal("string"), Type.Literal("number"), Type.Literal("boolean")]),
              value: Type.Optional(Type.Union([Type.String(), Type.Number(), Type.Boolean()])),
            }),
          ),
        ),
        key: Type.String(),
        limit: Type.Optional(Type.Number({ default: 50 })),
        needle: Type.Optional(
          Type.Object(
            {
              isRegex: Type.Optional(Type.Boolean()),
              matchCase: Type.Optional(Type.Boolean()),
              value: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
            },
            { description: "Search for a specific substring in the event." },
          ),
        ),
        timeframe: Type.Object({
          from: Type.Number(),
          to: Type.Number(),
        }),
        type: Type.Union([Type.Literal("string"), Type.Literal("boolean"), Type.Literal("number")]),
      }),
    })
    .response(
      Type.Object({
        errors: Type.Array(
          Type.Object({
            message: Type.String(),
          }),
        ),
        messages: Type.Array(
          Type.Object({
            message: Type.Union([Type.Literal("Successful request")]),
          }),
        ),
        result: Type.Array(
          Type.Object({
            dataset: Type.String(),
            key: Type.String(),
            type: Type.Union([Type.Literal("string"), Type.Literal("boolean"), Type.Literal("number")]),
            value: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
          }),
        ),
        success: Type.Union([Type.Literal(true)]),
      }),
    )
    .error(
      401,
      Type.Object({
        errors: Type.Array(
          Type.Object({
            detail: Type.Optional(Type.String()),
            message: Type.Union([Type.Literal("Unauthorized")]),
          }),
        ),
        messages: Type.Array(
          Type.Object({
            message: Type.String(),
          }),
        ),
        success: Type.Union([Type.Literal(false)]),
      }),
    )
    .error(
      500,
      Type.Object({
        errors: Type.Array(
          Type.Object({
            detail: Type.Optional(Type.String()),
            message: Type.Union([Type.Literal("Internal error")]),
          }),
        ),
        messages: Type.Array(
          Type.Object({
            message: Type.String(),
          }),
        ),
        success: Type.Union([Type.Literal(false)]),
      }),
    )
    .summary("List values")
    .description("List unique values found in your events")
    .operationId("telemetry.values.list")
    .tag("Values")
    .extension("x-api-token-group", ["Workers Observability Write"])

  api
    .get("/accounts/{account_id}/workers/scripts", {
      params: Type.Object({ account_id: DlsIdentifier }),
      query: Type.Object({
        tags: Type.Optional(Type.String()),
      }),
    })
    .response(WorkersScriptResponseCollection)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("List Workers")
    .description("Fetch a list of uploaded workers.")
    .operationId("worker-script-list-workers")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .get("/accounts/{account_id}/workers/scripts-search", {
      params: Type.Object({ account_id: DlsIdentifier }),
      query: Type.Object({
        name: Type.Optional(
          Type.String({ description: "Worker name to search for. Both exact and partial matches are returned." }),
        ),
        id: Type.Optional(
          Type.String({ description: "Worker ID (also called tag) to search for. Only exact matches are returned." }),
        ),
        order_by: Type.Optional(
          Type.Union([Type.Literal("created_on"), Type.Literal("modified_on"), Type.Literal("name")], {
            description: "Property to sort results by. Results are sorted in ascending order.",
          }),
        ),
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 10, minimum: 1, maximum: 100 })),
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result_info: Type.Optional(
          Type.Object({
            count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
            page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
            per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
            total_count: Type.Optional(
              Type.Number({ description: "Total results available without any search parameters." }),
            ),
          }),
        ),
        result: Type.Array(
          Type.Object({
            created_on: WorkersCreatedOn,
            environment_is_default: Type.Optional(
              Type.Boolean({ description: "Whether the environment is the default environment." }),
            ),
            environment_name: Type.Optional(Type.String({ description: "Name of the environment." })),
            modified_on: WorkersModifiedOn,
            script_name: WorkersScriptName,
            script_tag: DlsIdentifier,
            service_name: Type.Optional(Type.String({ description: "Name of the service." })),
          }),
        ),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Search Workers")
    .description("Search for Workers in an account.")
    .operationId("worker-script-search-workers")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .get("/accounts/{account_id}/workers/scripts/{script_name}", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
    })
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Download Worker")
    .description(
      "Fetch raw script content for your worker. Note this is the original script content, not JSON encoded.",
    )
    .operationId("worker-script-download-worker")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .put("/accounts/{account_id}/workers/scripts/{script_name}", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
    })
    .response(WorkersScriptResponseUploadSingle)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Upload Worker Module")
    .description(
      "Upload a worker module. You can find more about the multipart metadata on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/.",
    )
    .operationId("worker-script-upload-worker-module")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .delete("/accounts/{account_id}/workers/scripts/{script_name}", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
      query: Type.Object({
        force: Type.Optional(Type.Boolean()),
      }),
    })
    .response(WorkersApiResponseNullResult)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Delete Worker")
    .description("Delete your worker. This call has no response body on a successful delete.")
    .operationId("worker-script-delete-worker")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .post("/accounts/{account_id}/workers/scripts/{script_name}/assets-upload-session", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
      body: WorkersCreateAssetsUploadSessionObject,
    })
    .response(WorkersCreateAssetsUploadSessionResponse)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("Create Assets Upload Session")
    .description(
      "Start uploading a collection of assets for use in a Worker version. To learn more about the direct uploads of assets, see https://developers.cloudflare.com/workers/static-assets/direct-upload/.",
    )
    .operationId("worker-script-update-create-assets-upload-session")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .put("/accounts/{account_id}/workers/scripts/{script_name}/content", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
      headers: Type.Object({
        "CF-WORKER-BODY-PART": Type.Optional(Type.String()),
        "CF-WORKER-MAIN-MODULE-PART": Type.Optional(Type.String()),
      }),
    })
    .response(WorkersScriptResponseSingle)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Put script content")
    .description("Put script content without touching config or metadata.")
    .operationId("worker-script-put-content")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/scripts/{script_name}/content/v2", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
    })
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get script content")
    .description("Fetch script content only.")
    .operationId("worker-script-get-content")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .get("/accounts/{account_id}/workers/scripts/{script_name}/deployments", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Object({
          deployments: Type.Array(WorkersDeployment),
        }),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("List Deployments")
    .description(
      "List of Worker Deployments. The first deployment in the list is the latest deployment actively serving traffic.",
    )
    .operationId("worker-deployments-list-deployments")
    .tag("Worker Deployments")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .post("/accounts/{account_id}/workers/scripts/{script_name}/deployments", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
      query: Type.Object({
        force: Type.Optional(Type.Boolean()),
      }),
      body: WorkersDeployment,
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersDeployment,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Create Deployment")
    .description(
      "Deployments configure how [Worker Versions](https://developers.cloudflare.com/api/operations/worker-versions-list-versions) are deployed to traffic. A deployment can consist of one or two versions of a Worker.",
    )
    .operationId("worker-deployments-create-deployment")
    .tag("Worker Deployments")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/scripts/{script_name}/deployments/{deployment_id}", {
      params: Type.Object({
        account_id: DlsIdentifier,
        script_name: WorkersScriptName,
        deployment_id: Type.String({ format: "uuid" }),
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersDeployment,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get Deployment")
    .description("Get information about a Worker Deployment.")
    .operationId("worker-deployments-get-deployment")
    .tag("Worker Deployments")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .delete("/accounts/{account_id}/workers/scripts/{script_name}/deployments/{deployment_id}", {
      params: Type.Object({
        account_id: DlsIdentifier,
        script_name: WorkersScriptName,
        deployment_id: Type.String({ format: "uuid" }),
      }),
    })
    .response(WorkersApiResponseCommon)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Delete Deployment")
    .description(
      "Delete a Worker Deployment. The latest deployment, which is actively serving traffic, cannot be deleted. All other deployments can be deleted.",
    )
    .operationId("worker-deployments-delete-deployment")
    .tag("Worker Deployments")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/scripts/{script_name}/schedules", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Object({
          schedules: Type.Array(WorkersSchedule),
        }),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get Cron Triggers")
    .description("Fetches Cron Triggers for a Worker.")
    .operationId("worker-cron-trigger-get-cron-triggers")
    .tag("Worker Cron Trigger")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write", "Workers Scripts Read"])

  api
    .put("/accounts/{account_id}/workers/scripts/{script_name}/schedules", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
      body: Type.Array(WorkersSchedule),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Object({
          schedules: Type.Array(WorkersSchedule),
        }),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Update Cron Triggers")
    .description("Updates Cron Triggers for a Worker.")
    .operationId("worker-cron-trigger-update-cron-triggers")
    .tag("Worker Cron Trigger")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/scripts/{script_name}/script-settings", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
    })
    .response(WorkersScriptSettingsResponse)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get Script Settings")
    .description(
      "Get script-level settings when using [Worker Versions](https://developers.cloudflare.com/api/operations/worker-versions-list-versions). Includes Logpush and Tail Consumers.",
    )
    .operationId("worker-script-settings-get-settings")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .patch("/accounts/{account_id}/workers/scripts/{script_name}/script-settings", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
      body: WorkersScriptSettingsItem,
    })
    .response(WorkersScriptSettingsResponse)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Patch Script Settings")
    .description(
      "Patch script-level settings when using [Worker Versions](https://developers.cloudflare.com/api/operations/worker-versions-list-versions). Including but not limited to Logpush and Tail Consumers.",
    )
    .operationId("worker-script-settings-patch-settings")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/scripts/{script_name}/secrets", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Optional(Type.Array(WorkersSecret)),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("List script secrets")
    .description("List secrets bound to a script.")
    .operationId("worker-list-script-secrets")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .put("/accounts/{account_id}/workers/scripts/{script_name}/secrets", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
      body: WorkersSecret,
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Optional(WorkersSecret),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Add script secret")
    .description("Add a secret to a script.")
    .operationId("worker-put-script-secret")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/scripts/{script_name}/secrets/{secret_name}", {
      params: Type.Object({
        account_id: DlsIdentifier,
        script_name: WorkersScriptName,
        secret_name: WorkersSecretName,
      }),
      query: Type.Object({
        url_encoded: Type.Optional(WorkersSecretNameUrlEncoded),
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Optional(WorkersSecret),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get secret binding")
    .description("Get a given secret binding (value omitted) on a script.")
    .operationId("worker-get-script-secret")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .delete("/accounts/{account_id}/workers/scripts/{script_name}/secrets/{secret_name}", {
      params: Type.Object({
        account_id: DlsIdentifier,
        script_name: WorkersScriptName,
        secret_name: WorkersSecretName,
      }),
      query: Type.Object({
        url_encoded: Type.Optional(WorkersSecretNameUrlEncoded),
      }),
    })
    .response(WorkersApiResponseNullResult)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Delete script secret")
    .description("Remove a secret from a script.")
    .operationId("worker-delete-script-secret")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/scripts/{script_name}/settings", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
    })
    .response(WorkersScriptAndVersionSettingsResponse)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get Settings")
    .description("Get metadata and config, such as bindings or usage model.")
    .operationId("worker-script-get-settings")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .patch("/accounts/{account_id}/workers/scripts/{script_name}/settings", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
    })
    .response(WorkersScriptAndVersionSettingsResponse)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Patch Settings")
    .description("Patch metadata or config, such as bindings or usage model.")
    .operationId("worker-script-patch-settings")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/scripts/{script_name}/subdomain", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersSubdomain,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get Worker subdomain")
    .description("Get if the Worker is available on the workers.dev subdomain.")
    .operationId("worker-script-get-subdomain")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .post("/accounts/{account_id}/workers/scripts/{script_name}/subdomain", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
      body: Type.Object({
        enabled: Type.Boolean({
          description: "Whether the Worker should be available on the workers.dev subdomain.",
          "x-auditable": true,
        }),
        previews_enabled: Type.Optional(
          Type.Boolean({
            description: "Whether the Worker's Preview URLs should be available on the workers.dev subdomain.",
            default: false,
            "x-auditable": true,
          }),
        ),
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersSubdomain,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Post Worker subdomain")
    .description("Enable or disable the Worker on the workers.dev subdomain.")
    .operationId("worker-script-post-subdomain")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .delete("/accounts/{account_id}/workers/scripts/{script_name}/subdomain", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersSubdomain,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Delete Worker subdomain")
    .description("Disable all workers.dev subdomains for a Worker.")
    .operationId("worker-script-delete-subdomain")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/scripts/{script_name}/tails", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersTail,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("List Tails")
    .description("Get list of tails currently deployed on a Worker.")
    .tag("Worker Tail Logs")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write"])

  api
    .post("/accounts/{account_id}/workers/scripts/{script_name}/tails", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersTail,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Start Tail")
    .description("Starts a tail that receives logs and exception from a Worker.")
    .operationId("worker-tail-logs-start-tail")
    .tag("Worker Tail Logs")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write"])

  api
    .delete("/accounts/{account_id}/workers/scripts/{script_name}/tails/{id}", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName, id: DlsIdentifier }),
    })
    .response(WorkersApiResponseCommon)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Delete Tail")
    .description("Deletes a tail from a Worker.")
    .operationId("worker-tail-logs-delete-tail")
    .tag("Worker Tail Logs")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/scripts/{script_name}/usage-model", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
    })
    .response(WorkersUsageModelResponse)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Fetch Usage Model")
    .description("Fetches the Usage Model for a given Worker.")
    .operationId("worker-script-fetch-usage-model")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .put("/accounts/{account_id}/workers/scripts/{script_name}/usage-model", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersScriptName }),
      body: Type.Object({
        usage_model: Type.Optional(WorkersUsageModel),
        user_limits: Type.Optional(WorkersUserLimits),
      }),
    })
    .response(WorkersUsageModelResponse)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Update Usage Model")
    .description("Updates the Usage Model for a given Worker. Requires a Workers Paid subscription.")
    .operationId("worker-script-update-usage-model")
    .tag("Worker Script")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/scripts/{script_name}/versions", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersSchemasScriptName }),
      query: Type.Object({
        deployable: Type.Optional(Type.Boolean({ default: false })),
        page: Type.Optional(Type.Integer({ default: 1 })),
        per_page: Type.Optional(Type.Integer()),
      }),
    })
    .response(WorkersVersionsListResponse)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("List Versions")
    .description("List of Worker Versions. The first version in the list is the latest version.")
    .operationId("worker-versions-list-versions")
    .tag("Worker Versions")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .post("/accounts/{account_id}/workers/scripts/{script_name}/versions", {
      params: Type.Object({ account_id: DlsIdentifier, script_name: WorkersSchemasScriptName }),
    })
    .response(WorkersVersionsUploadResponse)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("Upload Version")
    .description(
      "Upload a Worker Version without deploying to Cloudflare's network. You can find more about the multipart metadata on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/.",
    )
    .operationId("worker-versions-upload-version")
    .tag("Worker Versions")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/scripts/{script_name}/versions/{version_id}", {
      params: Type.Object({
        account_id: DlsIdentifier,
        script_name: WorkersSchemasScriptName,
        version_id: WorkersVersionIdentifier,
      }),
    })
    .response(WorkersVersionsSingleResponse)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("Get Version Detail")
    .operationId("worker-versions-get-version-detail")
    .tag("Worker Versions")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .get("/accounts/{account_id}/workers/services/{service_name}/environments/{environment_name}/content", {
      params: Type.Object({
        account_id: DlsIdentifier,
        service_name: WorkersService,
        environment_name: WorkersEnvironment,
      }),
    })
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get script content")
    .description("Get script content from a worker with an environment.")
    .operationId("worker-environment-get-script-content")
    .tag("Worker Environment")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .put("/accounts/{account_id}/workers/services/{service_name}/environments/{environment_name}/content", {
      params: Type.Object({
        account_id: DlsIdentifier,
        service_name: WorkersService,
        environment_name: WorkersEnvironment,
      }),
      headers: Type.Object({
        "CF-WORKER-BODY-PART": Type.Optional(Type.String()),
        "CF-WORKER-MAIN-MODULE-PART": Type.Optional(Type.String()),
      }),
    })
    .response(WorkersScriptResponseSingle)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Put script content")
    .description("Put script content from a worker with an environment.")
    .operationId("worker-environment-put-script-content")
    .tag("Worker Environment")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/services/{service_name}/environments/{environment_name}/settings", {
      params: Type.Object({
        account_id: DlsIdentifier,
        service_name: WorkersService,
        environment_name: WorkersEnvironment,
      }),
    })
    .response(WorkersScriptSettingsResponse)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get Script Settings")
    .description("Get script settings from a worker with an environment.")
    .operationId("worker-script-environment-get-settings")
    .tag("Worker Environment")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .patch("/accounts/{account_id}/workers/services/{service_name}/environments/{environment_name}/settings", {
      params: Type.Object({
        account_id: DlsIdentifier,
        service_name: WorkersService,
        environment_name: WorkersEnvironment,
      }),
      body: WorkersScriptSettingsResponse,
    })
    .response(WorkersScriptSettingsResponse)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Patch Script Settings")
    .description("Patch script metadata, such as bindings.")
    .operationId("worker-script-environment-patch-settings")
    .tag("Worker Environment")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .get("/accounts/{account_id}/workers/subdomain", {
      params: Type.Object({ account_id: DlsIdentifier }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersSchemasSubdomain,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get Subdomain")
    .description("Returns a Workers subdomain for an account.")
    .operationId("worker-subdomain-get-subdomain")
    .tag("Worker Subdomain")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write", "Workers Scripts Read"])

  api
    .put("/accounts/{account_id}/workers/subdomain", {
      params: Type.Object({ account_id: DlsIdentifier }),
      body: WorkersSchemasSubdomain,
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersSchemasSubdomain,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Create Subdomain")
    .description("Creates a Workers subdomain for an account.")
    .operationId("worker-subdomain-create-subdomain")
    .tag("Worker Subdomain")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .delete("/accounts/{account_id}/workers/subdomain", {
      params: Type.Object({ account_id: DlsIdentifier }),
    })
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Delete Subdomain")
    .description("Deletes a Workers subdomain for an account.")
    .operationId("worker-subdomain-delete-subdomain")
    .tag("Worker Subdomain")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/workers", {
      params: Type.Object({ account_id: DlsIdentifier }),
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 10, minimum: 1, maximum: 100 })),
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result_info: Type.Optional(
          Type.Object({
            count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
            page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
            per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
            total_count: Type.Optional(
              Type.Number({ description: "Total results available without any search parameters." }),
            ),
          }),
        ),
        result: Type.Array(WorkersWorker),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("List Workers")
    .description("List all Workers for an account.")
    .operationId("listWorkers")
    .tag("Workers")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .post("/accounts/{account_id}/workers/workers", {
      params: Type.Object({ account_id: DlsIdentifier }),
      body: WorkersWorker,
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersWorker,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Create Worker")
    .description("Create a new Worker.")
    .operationId("createWorker")
    .tag("Workers")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/workers/{worker_id}", {
      params: Type.Object({
        account_id: DlsIdentifier,
        worker_id: Type.String({ description: "Identifier for the Worker, which can be ID or name." }),
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersWorker,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get Worker")
    .description("Get details about a specific Worker.")
    .operationId("getWorker")
    .tag("Workers")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .put("/accounts/{account_id}/workers/workers/{worker_id}", {
      params: Type.Object({
        account_id: DlsIdentifier,
        worker_id: Type.String({ description: "Identifier for the Worker, which can be ID or name." }),
      }),
      body: WorkersWorker,
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersWorker,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Update Worker")
    .description(
      "Perform a complete replacement of a Worker, where omitted properties are set to their default values. This is the exact same as the Create Worker endpoint, but operates on an existing Worker. To perform a partial update instead, use the Edit Worker endpoint.",
    )
    .operationId("updateWorker")
    .tag("Workers")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .patch("/accounts/{account_id}/workers/workers/{worker_id}", {
      params: Type.Object({
        account_id: DlsIdentifier,
        worker_id: Type.String({ description: "Identifier for the Worker, which can be ID or name." }),
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersWorker,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Edit Worker")
    .description(
      "Perform a partial update on a Worker, where omitted properties are left unchanged from their current values.",
    )
    .operationId("editWorker")
    .tag("Workers")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .delete("/accounts/{account_id}/workers/workers/{worker_id}", {
      params: Type.Object({
        account_id: DlsIdentifier,
        worker_id: Type.String({ description: "Identifier for the Worker, which can be ID or name." }),
      }),
    })
    .response(WorkersApiResponseCommon)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Delete Worker")
    .description("Delete a Worker and all its associated resources (versions, deployments, etc.).")
    .operationId("deleteWorker")
    .tag("Workers")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/workers/{worker_id}/versions", {
      params: Type.Object({
        account_id: DlsIdentifier,
        worker_id: Type.String({ description: "Identifier for the Worker, which can be ID or name." }),
      }),
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 10, minimum: 1, maximum: 100 })),
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result_info: Type.Optional(
          Type.Object({
            count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
            page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
            per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
            total_count: Type.Optional(
              Type.Number({ description: "Total results available without any search parameters." }),
            ),
          }),
        ),
        result: Type.Array(WorkersVersion),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("List Versions")
    .description("List all versions for a Worker.")
    .operationId("listWorkerVersions")
    .tag("Versions")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .post("/accounts/{account_id}/workers/workers/{worker_id}/versions", {
      params: Type.Object({
        account_id: DlsIdentifier,
        worker_id: Type.String({ description: "Identifier for the Worker, which can be ID or name." }),
      }),
      query: Type.Object({
        deploy: Type.Optional(
          Type.Boolean({
            description: "If true, a deployment will be created that sends 100% of traffic to the new version.",
          }),
        ),
      }),
      body: WorkersVersion,
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersVersion,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Create Version")
    .description("Create a new version.")
    .operationId("createWorkerVersion")
    .tag("Versions")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Scripts Write"])

  api
    .get("/accounts/{account_id}/workers/workers/{worker_id}/versions/{version_id}", {
      params: Type.Object({
        account_id: DlsIdentifier,
        worker_id: Type.String({ description: "Identifier for the Worker, which can be ID or name." }),
        version_id: Type.String({
          description:
            'Identifier for the version, which can be ID or the literal "latest" to operate on the most recently created version.',
        }),
      }),
      query: Type.Object({
        include: Type.Optional(
          Type.Union([Type.Literal("modules")], {
            description:
              "Whether to include the `modules` property of the version in the response, which contains code and sourcemap content and may add several megabytes to the response size.",
          }),
        ),
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersVersion,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get Version")
    .description("Get details about a specific version.")
    .operationId("getWorkerVersion")
    .tag("Versions")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Tail Read", "Workers Scripts Write", "Workers Scripts Read"])

  api
    .delete("/accounts/{account_id}/workers/workers/{worker_id}/versions/{version_id}", {
      params: Type.Object({
        account_id: DlsIdentifier,
        worker_id: Type.String({ description: "Identifier for the Worker, which can be ID or name." }),
        version_id: Type.String({
          description:
            'Identifier for the version, which can be ID or the literal "latest" to operate on the most recently created version.',
        }),
      }),
    })
    .response(WorkersApiResponseCommon)
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Delete Version")
    .description("Delete a version.")
    .operationId("deleteWorkerVersion")
    .tag("Versions")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .get("/zones/{zone_id}/workers/routes", {
      params: Type.Object({ zone_id: DlsIdentifier }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Array(WorkersRoute),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("List Routes")
    .description("Returns routes for a zone.")
    .operationId("worker-routes-list-routes")
    .tag("Worker Routes")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Routes Write", "Workers Routes Read"])

  api
    .post("/zones/{zone_id}/workers/routes", {
      params: Type.Object({ zone_id: DlsIdentifier }),
      body: WorkersRoute,
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersRoute,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Create Route")
    .description("Creates a route that maps a URL pattern to a Worker.")
    .operationId("worker-routes-create-route")
    .tag("Worker Routes")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Routes Write"])

  api
    .get("/zones/{zone_id}/workers/routes/{route_id}", {
      params: Type.Object({ route_id: DlsIdentifier, zone_id: DlsIdentifier }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersRoute,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Get Route")
    .description("Returns information about a route, including URL pattern and Worker.")
    .operationId("worker-routes-get-route")
    .tag("Worker Routes")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Routes Write", "Workers Routes Read"])

  api
    .put("/zones/{zone_id}/workers/routes/{route_id}", {
      params: Type.Object({ route_id: DlsIdentifier, zone_id: DlsIdentifier }),
      body: WorkersRoute,
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: WorkersRoute,
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Update Route")
    .description("Updates the URL pattern or Worker associated with a route.")
    .operationId("worker-routes-update-route")
    .tag("Worker Routes")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Routes Write"])

  api
    .delete("/zones/{zone_id}/workers/routes/{route_id}", {
      params: Type.Object({ route_id: DlsIdentifier, zone_id: DlsIdentifier }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Object({
          id: Type.Optional(DlsIdentifier),
        }),
      }),
    )
    .error("4XX", WorkersApiResponseCommonFailure)
    .summary("Delete Route")
    .description("Deletes a route.")
    .operationId("worker-routes-delete-route")
    .tag("Worker Routes")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Workers Routes Write"])
}

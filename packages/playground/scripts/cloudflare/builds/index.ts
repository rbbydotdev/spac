import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  BuildsApiresponse,
  BuildsBuildlogsresponse,
  BuildsBuildresponse,
  BuildsCanceledbuildresponse,
  BuildsConfigautofillresponse,
  BuildsCreatebuildrequest,
  BuildsCreatebuildtokenrequest,
  BuildsCreatetriggerrequest,
  BuildsEnvironmentvariablesrequest,
  BuildsEnvironmentvariablesresponse,
  BuildsErrorresponse,
  BuildsGetaccountlimitresponse,
  BuildsInsertbuildresponse,
  BuildsLatestbuildsresponse,
  BuildsListtokensresponse,
  BuildsPaginationinfo,
  BuildsScmprovidertype,
  BuildsTriggerresponse,
  BuildsUpdatetriggerrequest,
  BuildsUpsertrepoconnectionrequest,
  BuildsUpsertrepoconnectionresponse,
} from "./schemas"

export function registerBuilds(api: Api) {
  api.assertVersion("3.0.3", "Builds")

  api.group("/accounts/{account_id}/builds", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/account/limits", {})
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: BuildsGetaccountlimitresponse,
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .summary("Get account limits")
      .description("Retrieve account limits and usage information")
      .operationId("getAccountLimits")
      .tag("Account")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write", "Workers CI Read"])

    g.get("/builds", {
      query: Type.Object({
        version_ids: Type.String(),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: BuildsLatestbuildsresponse,
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .summary("Get builds by version IDs")
      .description("Retrieve builds for specific version IDs")
      .operationId("getBuildsByVersionIds")
      .tag("Builds")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write", "Workers CI Read"])

    g.get("/builds/latest", {
      query: Type.Object({
        external_script_ids: Type.String(),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: BuildsLatestbuildsresponse,
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .summary("Get latest builds by script IDs")
      .description("Retrieve the most recent builds for multiple worker scripts")
      .operationId("getLatestBuildsByScripts")
      .tag("Builds")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write", "Workers CI Read"])

    g.get("/builds/{build_uuid}", {
      params: Type.Object({ build_uuid: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: BuildsBuildresponse,
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .error(404, BuildsErrorresponse)
      .summary("Get build by UUID")
      .description("Retrieve detailed information about a specific build")
      .operationId("getBuildByUuid")
      .tag("Builds")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write", "Workers CI Read"])

    g.put("/builds/{build_uuid}/cancel", {
      params: Type.Object({ build_uuid: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: BuildsCanceledbuildresponse,
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .error(404, BuildsErrorresponse)
      .summary("Cancel build")
      .description("Cancel a running or queued build")
      .operationId("cancelBuildByUuid")
      .tag("Builds")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write"])

    g.get("/builds/{build_uuid}/logs", {
      params: Type.Object({ build_uuid: Type.String({ format: "uuid" }) }),
      query: Type.Object({
        cursor: Type.Optional(Type.String()),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: BuildsBuildlogsresponse,
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .error(404, BuildsErrorresponse)
      .summary("Get build logs")
      .description("Retrieve logs for a specific build with cursor-based pagination")
      .operationId("getBuildLogs")
      .tag("Builds")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write", "Workers CI Read"])

    g.put("/repos/connections", {
      body: BuildsUpsertrepoconnectionrequest,
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: BuildsUpsertrepoconnectionresponse,
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .summary("Create or update repository connection")
      .description("Upsert a repository connection for CI/CD integration")
      .operationId("upsertRepoConnection")
      .tag("Repository Connections")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write"])

    g.delete("/repos/connections/{repo_connection_uuid}", {
      params: Type.Object({ repo_connection_uuid: Type.String({ format: "uuid" }) }),
    })
      .response(BuildsApiresponse)
      .error(404, BuildsErrorresponse)
      .summary("Delete repository connection")
      .description("Remove a repository connection")
      .operationId("deleteRepoConnection")
      .tag("Repository Connections")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write"])

    g.get("/repos/{provider_type}/{provider_account_id}/{repo_id}/config_autofill", {
      params: Type.Object({
        provider_type: BuildsScmprovidertype,
        provider_account_id: Type.String(),
        repo_id: Type.String(),
      }),
      query: Type.Object({
        branch: Type.String(),
        root_directory: Type.Optional(Type.String()),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: BuildsConfigautofillresponse,
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .summary("Get repository configuration autofill")
      .description("Analyze repository for automatic configuration detection")
      .operationId("getWorkerConfigAutofill")
      .tag("GitHub Integration")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write", "Workers CI Read"])

    g.get("/tokens", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 50, minimum: 1, maximum: 200 })),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Array(BuildsListtokensresponse), Type.Null()]),
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .summary("List build tokens")
      .description("Get all build tokens with pagination")
      .operationId("listBuildTokens")
      .tag("Build Tokens")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write", "Workers CI Read"])

    g.post("/tokens", {
      body: BuildsCreatebuildtokenrequest,
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: BuildsListtokensresponse,
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .summary("Create build token")
      .description("Create a new build authentication token")
      .operationId("createBuildToken")
      .tag("Build Tokens")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write"])

    g.delete("/tokens/{build_token_uuid}", {
      params: Type.Object({ build_token_uuid: Type.String({ format: "uuid" }) }),
    })
      .response(BuildsApiresponse)
      .error(404, BuildsErrorresponse)
      .summary("Delete build token")
      .description("Remove a build authentication token")
      .operationId("deleteBuildToken")
      .tag("Build Tokens")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write"])

    g.post("/triggers", {
      body: BuildsCreatetriggerrequest,
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: BuildsTriggerresponse,
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .summary("Create trigger")
      .description("Create a new CI/CD trigger")
      .operationId("createTrigger")
      .tag("Triggers")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write"])

    g.patch("/triggers/{trigger_uuid}", {
      params: Type.Object({ trigger_uuid: Type.String({ format: "uuid" }) }),
      body: BuildsUpdatetriggerrequest,
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: BuildsTriggerresponse,
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .error(404, BuildsErrorresponse)
      .summary("Update trigger")
      .description("Update an existing CI/CD trigger")
      .operationId("updateTrigger")
      .tag("Triggers")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write"])

    g.delete("/triggers/{trigger_uuid}", {
      params: Type.Object({ trigger_uuid: Type.String({ format: "uuid" }) }),
    })
      .response(BuildsApiresponse)
      .error(404, BuildsErrorresponse)
      .summary("Delete trigger")
      .description("Remove a CI/CD trigger")
      .operationId("deleteTrigger")
      .tag("Triggers")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write"])

    g.post("/triggers/{trigger_uuid}/builds", {
      params: Type.Object({ trigger_uuid: Type.String({ format: "uuid" }) }),
      body: BuildsCreatebuildrequest,
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: BuildsInsertbuildresponse,
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .summary("Create manual build")
      .description("Trigger a manual build for a specific trigger")
      .operationId("createManualBuild")
      .tag("Triggers")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write"])

    g.get("/triggers/{trigger_uuid}/environment_variables", {
      params: Type.Object({ trigger_uuid: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: BuildsEnvironmentvariablesresponse,
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .summary("List environment variables")
      .description("Get all environment variables for a trigger")
      .operationId("listEnvironmentVariables")
      .tag("Environment Variables")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write", "Workers CI Read"])

    g.patch("/triggers/{trigger_uuid}/environment_variables", {
      params: Type.Object({ trigger_uuid: Type.String({ format: "uuid" }) }),
      body: BuildsEnvironmentvariablesrequest,
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: BuildsEnvironmentvariablesresponse,
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .error(404, BuildsErrorresponse)
      .summary("Upsert environment variables")
      .description("Create or update environment variables for a trigger")
      .operationId("upsertEnvironmentVariables")
      .tag("Environment Variables")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write"])

    g.delete("/triggers/{trigger_uuid}/environment_variables/{environment_variable_key}", {
      params: Type.Object({ trigger_uuid: Type.String({ format: "uuid" }), environment_variable_key: Type.String() }),
    })
      .response(BuildsApiresponse)
      .error(404, BuildsErrorresponse)
      .summary("Delete environment variable")
      .description("Remove a specific environment variable from a trigger")
      .operationId("deleteEnvironmentVariable")
      .tag("Environment Variables")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write"])

    g.post("/triggers/{trigger_uuid}/purge_build_cache", {
      params: Type.Object({ trigger_uuid: Type.String({ format: "uuid" }) }),
    })
      .response(BuildsApiresponse)
      .error(404, BuildsErrorresponse)
      .summary("Purge build cache")
      .description("Clear the build cache for a specific trigger")
      .operationId("purgeBuildCache")
      .tag("Triggers")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write"])

    g.get("/workers/{external_script_id}/builds", {
      params: Type.Object({ external_script_id: Type.String() }),
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 50, minimum: 1, maximum: 200 })),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Array(BuildsBuildresponse), Type.Null()]),
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .summary("List builds by script")
      .description("Get all builds for a specific worker script with pagination")
      .operationId("listBuildsByScript")
      .tag("Workers")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write", "Workers CI Read"])

    g.get("/workers/{external_script_id}/triggers", {
      params: Type.Object({ external_script_id: Type.String() }),
    })
      .response(
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Optional(Type.Integer()),
              message: Type.Optional(Type.String()),
            }),
          ),
          messages: Type.Array(Type.String()),
          result: Type.Union([Type.Array(BuildsTriggerresponse), Type.Null()]),
          result_info: Type.Optional(BuildsPaginationinfo),
          success: Type.Boolean(),
        }),
      )
      .summary("List triggers by script")
      .description("Get all triggers for a specific worker script")
      .operationId("listTriggersByScript")
      .tag("Workers")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers CI Write", "Workers CI Read"])
  })
}

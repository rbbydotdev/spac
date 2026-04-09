import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const BuildsEnvironmentvariablesrequest = named(
  "builds_EnvironmentVariablesRequest",
  Type.Record(
    Type.String(),
    Type.Object({
      is_secret: Type.Boolean(),
      value: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    }),
  ),
)

export const BuildsEnvironmentvariablesresponse = named(
  "builds_EnvironmentVariablesResponse",
  Type.Record(
    Type.String(),
    Type.Object({
      created_on: Type.String({ format: "date-time", readOnly: true }),
      is_secret: Type.Boolean(),
      value: Type.Optional(
        Type.Union([Type.String({ description: "Value is null for secret environment variables" }), Type.Null()]),
      ),
    }),
  ),
)

export const BuildsInsertbuildresponse = named(
  "builds_InsertBuildResponse",
  Type.Object({
    build_uuid: Type.Optional(Type.String({ format: "uuid" })),
    created_on: Type.Optional(Type.String({ format: "date-time", readOnly: true })),
  }),
)

export const BuildsBuildseedrepoinputfile = named(
  "builds_BuildSeedRepoInputFile",
  Type.Object({
    content: Type.String(),
    filename: Type.String(),
    isBase64: Type.Optional(Type.Boolean({ default: false })),
    replace: Type.Optional(Type.String({ description: "Text to replace in the file" })),
  }),
)

export const BuildsScmprovidertype = named("builds_SCMProviderType", Type.Union([Type.Literal("github")]))

export const BuildsBuildseedrepoinput = named(
  "builds_BuildSeedRepoInput",
  Type.Object({
    branch: Type.String(),
    files: Type.Optional(Type.Array(BuildsBuildseedrepoinputfile, { maxItems: 2 })),
    owner: Type.String(),
    path: Type.String(),
    provider: BuildsScmprovidertype,
    repository: Type.String(),
  }),
)

export const BuildsCreatebuildrequest = named("builds_CreateBuildRequest", Type.Union([Type.Unknown(), Type.Unknown()]))

export const BuildsUpdatetriggerrequest = named(
  "builds_UpdateTriggerRequest",
  Type.Object({
    branch_excludes: Type.Optional(Type.Array(Type.String())),
    branch_includes: Type.Optional(Type.Array(Type.String())),
    build_caching_enabled: Type.Optional(Type.Boolean({ default: false })),
    build_command: Type.Optional(Type.String()),
    build_token_uuid: Type.Optional(Type.String({ format: "uuid" })),
    deploy_command: Type.Optional(Type.String()),
    path_excludes: Type.Optional(Type.Array(Type.String())),
    path_includes: Type.Optional(Type.Array(Type.String())),
    root_directory: Type.Optional(Type.String()),
    trigger_name: Type.Optional(Type.String()),
  }),
)

export const BuildsUpsertrepoconnectionresponse = named(
  "builds_UpsertRepoConnectionResponse",
  Type.Object({
    created_on: Type.Optional(Type.String({ format: "date-time", readOnly: true })),
    deleted_on: Type.Optional(Type.Union([Type.String({ format: "date-time" }), Type.Null()])),
    modified_on: Type.Optional(Type.String({ format: "date-time", readOnly: true })),
    provider_account_id: Type.Optional(Type.String()),
    provider_account_name: Type.Optional(Type.String()),
    provider_type: Type.Optional(BuildsScmprovidertype),
    repo_connection_uuid: Type.Optional(Type.String({ format: "uuid" })),
    repo_id: Type.Optional(Type.String()),
    repo_name: Type.Optional(Type.String()),
  }),
)

export const BuildsTriggerresponse = named(
  "builds_TriggerResponse",
  Type.Object({
    branch_excludes: Type.Optional(Type.Array(Type.String())),
    branch_includes: Type.Optional(Type.Array(Type.String())),
    build_caching_enabled: Type.Optional(Type.Boolean()),
    build_command: Type.Optional(Type.String()),
    build_token_name: Type.Optional(Type.String()),
    build_token_uuid: Type.Optional(Type.String({ format: "uuid" })),
    created_on: Type.Optional(Type.String({ format: "date-time", readOnly: true })),
    deleted_on: Type.Optional(Type.Union([Type.String({ format: "date-time" }), Type.Null()])),
    deploy_command: Type.Optional(Type.String()),
    external_script_id: Type.Optional(Type.String()),
    modified_on: Type.Optional(Type.String({ format: "date-time", readOnly: true })),
    path_excludes: Type.Optional(Type.Array(Type.String())),
    path_includes: Type.Optional(Type.Array(Type.String())),
    repo_connection: Type.Optional(BuildsUpsertrepoconnectionresponse),
    root_directory: Type.Optional(Type.String()),
    trigger_name: Type.Optional(Type.String()),
    trigger_uuid: Type.Optional(Type.String({ format: "uuid" })),
  }),
)

export const BuildsCreatetriggerrequest = named(
  "builds_CreateTriggerRequest",
  Type.Object({
    branch_excludes: Type.Array(Type.String()),
    branch_includes: Type.Array(Type.String()),
    build_caching_enabled: Type.Optional(Type.Boolean({ default: false })),
    build_command: Type.String(),
    build_token_uuid: Type.String({ format: "uuid" }),
    deploy_command: Type.String(),
    external_script_id: Type.String(),
    path_excludes: Type.Array(Type.String()),
    path_includes: Type.Array(Type.String()),
    repo_connection_uuid: Type.String({ format: "uuid" }),
    root_directory: Type.String(),
    trigger_name: Type.String(),
  }),
)

export const BuildsCreatebuildtokenrequest = named(
  "builds_CreateBuildTokenRequest",
  Type.Object({
    build_token_name: Type.String(),
    build_token_secret: Type.String(),
    cloudflare_token_id: Type.String(),
  }),
)

export const BuildsListtokensresponse = named(
  "builds_ListTokensResponse",
  Type.Object({
    build_token_name: Type.Optional(Type.String()),
    build_token_uuid: Type.Optional(Type.String({ format: "uuid" })),
    cloudflare_token_id: Type.Optional(Type.String()),
    owner_type: Type.Optional(Type.String()),
  }),
)

export const BuildsPackagemanager = named(
  "builds_PackageManager",
  Type.Union([
    Type.Literal("npm"),
    Type.Literal("yarn"),
    Type.Literal("pnpm"),
    Type.Literal("bun"),
    Type.Literal("uv"),
  ]),
)

export const BuildsConfigautofillresponse = named(
  "builds_ConfigAutofillResponse",
  Type.Object({
    config_file: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    default_worker_name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    env_worker_names: Type.Optional(Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()])),
    package_manager: Type.Optional(BuildsPackagemanager),
    scripts: Type.Optional(Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()])),
  }),
)

export const BuildsPaginationinfo = named(
  "builds_PaginationInfo",
  Type.Object({
    count: Type.Optional(Type.Integer()),
    page: Type.Optional(Type.Integer()),
    per_page: Type.Optional(Type.Integer()),
    total_count: Type.Optional(Type.Integer()),
    total_pages: Type.Optional(Type.Integer()),
  }),
)

export const BuildsApiresponse = named(
  "builds_APIResponse",
  Type.Object({
    errors: Type.Array(
      Type.Object({
        code: Type.Optional(Type.Integer()),
        message: Type.Optional(Type.String()),
      }),
    ),
    messages: Type.Array(Type.String()),
    result: Type.Union([Type.Unknown(), Type.Null()]),
    result_info: Type.Optional(BuildsPaginationinfo),
    success: Type.Boolean(),
  }),
)

export const BuildsUpsertrepoconnectionrequest = named(
  "builds_UpsertRepoConnectionRequest",
  Type.Object({
    provider_account_id: Type.String(),
    provider_account_name: Type.String(),
    provider_type: BuildsScmprovidertype,
    repo_id: Type.String(),
    repo_name: Type.String(),
  }),
)

export const BuildsBuildlogsresponse = named(
  "builds_BuildLogsResponse",
  Type.Object({
    cursor: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    lines: Type.Optional(
      Type.Array(
        Type.Array(
          Type.Union([
            Type.Number({ description: "Unix epoch timestamp" }),
            Type.String({ description: "Log message" }),
          ]),
          { minItems: 2, maxItems: 2 },
        ),
      ),
    ),
    truncated: Type.Optional(Type.Boolean()),
  }),
)

export const BuildsBuildoutcome = named(
  "builds_BuildOutcome",
  Type.Union([
    Type.Literal("success"),
    Type.Literal("fail"),
    Type.Literal("skipped"),
    Type.Literal("cancelled"),
    Type.Literal("terminated"),
  ]),
)

export const BuildsCanceledbuildresponse = named(
  "builds_CanceledBuildResponse",
  Type.Object({
    build_outcome: Type.Optional(BuildsBuildoutcome),
    build_uuid: Type.Optional(Type.String({ format: "uuid" })),
    stopped_on: Type.Optional(Type.String({ format: "date-time" })),
  }),
)

export const BuildsErrorresponse = named(
  "builds_ErrorResponse",
  Type.Object({
    errors: Type.Array(
      Type.Object({
        code: Type.Optional(Type.Integer()),
        message: Type.String(),
      }),
    ),
    messages: Type.Array(Type.String()),
    result: Type.Union([Type.Unknown(), Type.Null()]),
    success: Type.Boolean(),
  }),
)

export const BuildsBuildtriggersource = named(
  "builds_BuildTriggerSource",
  Type.Union([Type.Literal("push"), Type.Literal("pull_request"), Type.Literal("manual"), Type.Literal("api")]),
)

export const BuildsBuildtriggermetadataresponse = named(
  "builds_BuildTriggerMetadataResponse",
  Type.Object({
    author: Type.Optional(Type.String()),
    branch: Type.Optional(Type.String()),
    build_command: Type.Optional(Type.String()),
    build_token_name: Type.Optional(Type.String()),
    build_token_uuid: Type.Optional(Type.String({ format: "uuid" })),
    build_trigger_source: Type.Optional(BuildsBuildtriggersource),
    commit_hash: Type.Optional(Type.String()),
    commit_message: Type.Optional(Type.String()),
    deploy_command: Type.Optional(Type.String()),
    environment_variables: Type.Optional(Type.Record(Type.String(), Type.String())),
    provider_account_name: Type.Optional(Type.String()),
    provider_type: Type.Optional(BuildsScmprovidertype),
    repo_name: Type.Optional(Type.String()),
    root_directory: Type.Optional(Type.String()),
  }),
)

export const BuildsBuildstatus = named(
  "builds_BuildStatus",
  Type.Union([Type.Literal("queued"), Type.Literal("initializing"), Type.Literal("running"), Type.Literal("stopped")]),
)

export const BuildsBuildresponse = named(
  "builds_BuildResponse",
  Type.Object({
    build_outcome: Type.Optional(BuildsBuildoutcome),
    build_trigger_metadata: Type.Optional(BuildsBuildtriggermetadataresponse),
    build_uuid: Type.Optional(Type.String({ format: "uuid" })),
    created_on: Type.Optional(Type.String({ format: "date-time", readOnly: true })),
    initializing_on: Type.Optional(Type.Union([Type.String({ format: "date-time" }), Type.Null()])),
    modified_on: Type.Optional(Type.String({ format: "date-time", readOnly: true })),
    pull_request: Type.Optional(
      Type.Union([
        Type.Object({
          created_on: Type.Optional(Type.String({ format: "date-time", readOnly: true })),
          pull_request_url: Type.Optional(Type.String({ format: "uri" })),
        }),
        Type.Null(),
      ]),
    ),
    running_on: Type.Optional(Type.Union([Type.String({ format: "date-time" }), Type.Null()])),
    status: Type.Optional(BuildsBuildstatus),
    stopped_on: Type.Optional(Type.Union([Type.String({ format: "date-time" }), Type.Null()])),
    trigger: Type.Optional(
      Type.Object(
        {
          branch_excludes: Type.Optional(Type.Array(Type.String())),
          branch_includes: Type.Optional(Type.Array(Type.String())),
          build_caching_enabled: Type.Optional(Type.Boolean()),
          build_command: Type.Optional(Type.String()),
          created_on: Type.Optional(Type.String({ format: "date-time", readOnly: true })),
          deleted_on: Type.Optional(Type.Union([Type.String({ format: "date-time" }), Type.Null()])),
          deploy_command: Type.Optional(Type.String()),
          external_script_id: Type.Optional(Type.String()),
          modified_on: Type.Optional(Type.String({ format: "date-time", readOnly: true })),
          path_excludes: Type.Optional(Type.Array(Type.String())),
          path_includes: Type.Optional(Type.Array(Type.String())),
          repo_connection: Type.Optional(BuildsUpsertrepoconnectionresponse),
          root_directory: Type.Optional(Type.String()),
          trigger_name: Type.Optional(Type.String()),
          trigger_uuid: Type.Optional(Type.String({ format: "uuid" })),
        },
        { description: "Trigger information without build_token_uuid" },
      ),
    ),
  }),
)

export const BuildsLatestbuildsresponse = named(
  "builds_LatestBuildsResponse",
  Type.Object({
    builds: Type.Optional(Type.Record(Type.String(), BuildsBuildresponse)),
  }),
)

export const BuildsGetaccountlimitresponse = named(
  "builds_GetAccountLimitResponse",
  Type.Object({
    build_minutes_refresh_on: Type.Optional(
      Type.Union([
        Type.String({ description: "When build minutes will refresh (only for non-paid plans)", format: "date-time" }),
        Type.Null(),
      ]),
    ),
    has_reached_build_minutes_limit: Type.Optional(
      Type.Union([
        Type.Boolean({ description: "Whether build minutes limit has been reached (only for non-paid plans)" }),
        Type.Null(),
      ]),
    ),
  }),
)

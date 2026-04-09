import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages } from "../shared/schemas"

export const PagesDomainName = named(
  "pages_domain_name",
  Type.String({ description: "Name of the domain.", "x-auditable": true }),
)

export const PagesDomainObject = named(
  "pages_domain-object",
  Type.Object({
    certificate_authority: Type.Optional(
      Type.Union([Type.Literal("google"), Type.Literal("lets_encrypt")], { "x-auditable": true }),
    ),
    created_on: Type.Optional(Type.String({ readOnly: true, "x-auditable": true })),
    domain_id: Type.Optional(Type.String({ readOnly: true, "x-auditable": true })),
    id: Type.Optional(Type.String({ readOnly: true, "x-auditable": true })),
    name: Type.Optional(Type.String({ "x-auditable": true })),
    status: Type.Optional(
      Type.Union(
        [
          Type.Literal("initializing"),
          Type.Literal("pending"),
          Type.Literal("active"),
          Type.Literal("deactivated"),
          Type.Literal("blocked"),
          Type.Literal("error"),
        ],
        { "x-auditable": true },
      ),
    ),
    validation_data: Type.Optional(
      Type.Object({
        error_message: Type.Optional(Type.String({ "x-auditable": true })),
        method: Type.Optional(Type.Union([Type.Literal("http"), Type.Literal("txt")], { "x-auditable": true })),
        status: Type.Optional(
          Type.Union(
            [
              Type.Literal("initializing"),
              Type.Literal("pending"),
              Type.Literal("active"),
              Type.Literal("deactivated"),
              Type.Literal("error"),
            ],
            { "x-auditable": true },
          ),
        ),
        txt_name: Type.Optional(Type.String({ "x-auditable": true })),
        txt_value: Type.Optional(Type.String({ "x-auditable": true })),
      }),
    ),
    verification_data: Type.Optional(
      Type.Object({
        error_message: Type.Optional(Type.String({ "x-auditable": true })),
        status: Type.Optional(
          Type.Union([
            Type.Literal("pending"),
            Type.Literal("active"),
            Type.Literal("deactivated"),
            Type.Literal("blocked"),
            Type.Literal("error"),
          ]),
        ),
      }),
    ),
    zone_tag: Type.Optional(Type.String({ readOnly: true, "x-auditable": true })),
  }),
)

export const PagesDomainResponseSingle = named(
  "pages_domain-response-single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(false), Type.Literal(true)], {
      description: "Whether the API call was successful",
    }),
    result: PagesDomainObject,
  }),
)

export const PagesDomainsPost = named(
  "pages_domains-post",
  Type.Object({
    name: Type.Optional(Type.String({ "x-auditable": true })),
  }),
)

export const PagesDomainResponseCollection = named(
  "pages_domain-response-collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(false), Type.Literal(true)], {
      description: "Whether the API call was successful",
    }),
    result_info: Type.Optional(
      Type.Object({
        count: Type.Integer({ description: "The number of items on the current page." }),
        page: Type.Integer({ description: "The page currently being requested." }),
        per_page: Type.Integer({ description: "The number of items per page being returned." }),
        total_count: Type.Integer({ description: "The total count of items." }),
        total_pages: Type.Optional(Type.Integer({ description: "The total count of pages." })),
      }),
    ),
    result: Type.Array(PagesDomainObject),
  }),
)

export const PagesDeploymentResponseLogs = named(
  "pages_deployment-response-logs",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(false), Type.Literal(true)], {
      description: "Whether the API call was successful",
    }),
    result: Type.Object({
      data: Type.Optional(
        Type.Array(
          Type.Object({
            line: Type.Optional(Type.String({ readOnly: true })),
            ts: Type.Optional(Type.String({ readOnly: true })),
          }),
        ),
      ),
      includes_container_logs: Type.Optional(Type.Boolean({ readOnly: true })),
      total: Type.Optional(Type.Integer({ readOnly: true })),
    }),
  }),
)

export const PagesBuildConfig = named(
  "pages_build_config",
  Type.Object(
    {
      build_caching: Type.Optional(
        Type.Union([
          Type.Boolean({ description: "Enable build caching for the project.", "x-auditable": true }),
          Type.Null(),
        ]),
      ),
      build_command: Type.Optional(
        Type.Union([Type.String({ description: "Command used to build project.", "x-auditable": true }), Type.Null()]),
      ),
      destination_dir: Type.Optional(
        Type.Union([Type.String({ description: "Output directory of the build.", "x-auditable": true }), Type.Null()]),
      ),
      root_dir: Type.Optional(
        Type.Union([Type.String({ description: "Directory to run the command.", "x-auditable": true }), Type.Null()]),
      ),
      web_analytics_tag: Type.Optional(
        Type.Union([
          Type.String({ description: "The classifying tag for analytics.", "x-auditable": true }),
          Type.Null(),
        ]),
      ),
      web_analytics_token: Type.Optional(
        Type.Union([Type.String({ description: "The auth token for analytics.", "x-sensitive": true }), Type.Null()]),
      ),
    },
    { description: "Configs for the project build process." },
  ),
)

export const PagesPlainTextEnvVar = named(
  "pages_plain_text_env_var",
  Type.Union([
    Type.Object(
      {
        type: Type.Union([Type.Literal("plain_text")], { "x-auditable": true }),
        value: Type.String({ description: "Environment variable value." }),
      },
      { description: "A plaintext environment variable." },
    ),
    Type.Null(),
  ]),
)

export const PagesSecretTextEnvVar = named(
  "pages_secret_text_env_var",
  Type.Union([
    Type.Object(
      {
        type: Type.Union([Type.Literal("secret_text")], { "x-auditable": true }),
        value: Type.String({ description: "Secret value.", "x-sensitive": true }),
      },
      { description: "An encrypted environment variable." },
    ),
    Type.Null(),
  ]),
)

export const PagesEnvVars = named(
  "pages_env_vars",
  Type.Record(Type.String(), Type.Union([PagesPlainTextEnvVar, PagesSecretTextEnvVar])),
)

export const PagesStage = named(
  "pages_stage",
  Type.Object(
    {
      ended_on: Type.Optional(
        Type.Union([
          Type.String({
            description: "When the stage ended.",
            format: "date-time",
            readOnly: true,
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      name: Type.Optional(
        Type.Union(
          [
            Type.Literal("queued"),
            Type.Literal("initialize"),
            Type.Literal("clone_repo"),
            Type.Literal("build"),
            Type.Literal("deploy"),
          ],
          { description: "The current build stage.", "x-auditable": true },
        ),
      ),
      started_on: Type.Optional(
        Type.Union([
          Type.String({
            description: "When the stage started.",
            format: "date-time",
            readOnly: true,
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      status: Type.Optional(
        Type.Union(
          [
            Type.Literal("success"),
            Type.Literal("idle"),
            Type.Literal("active"),
            Type.Literal("failure"),
            Type.Literal("canceled"),
          ],
          { description: "State of the current stage.", "x-auditable": true },
        ),
      ),
    },
    { description: "The status of the deployment." },
  ),
)

export const PagesSource = named(
  "pages_source",
  Type.Object({
    config: Type.Optional(
      Type.Object({
        deployments_enabled: Type.Optional(Type.Boolean({ "x-auditable": true })),
        owner: Type.Optional(Type.String({ "x-auditable": true })),
        path_excludes: Type.Optional(Type.Array(Type.String({ "x-auditable": true }))),
        path_includes: Type.Optional(Type.Array(Type.String({ "x-auditable": true }))),
        pr_comments_enabled: Type.Optional(Type.Boolean({ "x-auditable": true })),
        preview_branch_excludes: Type.Optional(Type.Array(Type.String({ "x-auditable": true }))),
        preview_branch_includes: Type.Optional(Type.Array(Type.String({ "x-auditable": true }))),
        preview_deployment_setting: Type.Optional(
          Type.Union([Type.Literal("all"), Type.Literal("none"), Type.Literal("custom")], { "x-auditable": true }),
        ),
        production_branch: Type.Optional(Type.String({ "x-auditable": true })),
        production_deployments_enabled: Type.Optional(Type.Boolean({ "x-auditable": true })),
        repo_name: Type.Optional(Type.String({ "x-auditable": true })),
      }),
    ),
    type: Type.Optional(Type.String({ "x-auditable": true })),
  }),
)

export const PagesDeployments = named(
  "pages_deployments",
  Type.Object({
    aliases: Type.Optional(
      Type.Union([
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "A list of alias URLs pointing to this deployment.",
          readOnly: true,
        }),
        Type.Null(),
      ]),
    ),
    build_config: Type.Optional(PagesBuildConfig),
    created_on: Type.Optional(
      Type.String({
        description: "When the deployment was created.",
        format: "date-time",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    deployment_trigger: Type.Optional(
      Type.Object(
        {
          metadata: Type.Optional(
            Type.Object(
              {
                branch: Type.Optional(
                  Type.String({ description: "Where the trigger happened.", readOnly: true, "x-auditable": true }),
                ),
                commit_hash: Type.Optional(
                  Type.String({
                    description: "Hash of the deployment trigger commit.",
                    readOnly: true,
                    "x-auditable": true,
                  }),
                ),
                commit_message: Type.Optional(
                  Type.String({
                    description: "Message of the deployment trigger commit.",
                    readOnly: true,
                    "x-auditable": true,
                  }),
                ),
              },
              { description: "Additional info about the trigger." },
            ),
          ),
          type: Type.Optional(
            Type.Union([Type.Literal("push"), Type.Literal("ad_hoc")], {
              description: "What caused the deployment.",
              "x-auditable": true,
            }),
          ),
        },
        { description: "Info about what caused the deployment." },
      ),
    ),
    env_vars: Type.Optional(PagesEnvVars),
    environment: Type.Optional(
      Type.Union([Type.Literal("preview"), Type.Literal("production")], {
        description: "Type of deploy.",
        "x-auditable": true,
      }),
    ),
    id: Type.Optional(Type.String({ description: "Id of the deployment.", readOnly: true, "x-auditable": true })),
    is_skipped: Type.Optional(
      Type.Boolean({ description: "If the deployment has been skipped.", readOnly: true, "x-auditable": true }),
    ),
    latest_stage: Type.Optional(PagesStage),
    modified_on: Type.Optional(
      Type.String({
        description: "When the deployment was last modified.",
        format: "date-time",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    project_id: Type.Optional(Type.String({ description: "Id of the project.", readOnly: true, "x-auditable": true })),
    project_name: Type.Optional(
      Type.String({ description: "Name of the project.", readOnly: true, "x-auditable": true }),
    ),
    short_id: Type.Optional(
      Type.String({ description: "Short Id (8 character) of the deployment.", readOnly: true, "x-auditable": true }),
    ),
    source: Type.Optional(PagesSource),
    stages: Type.Optional(Type.Array(PagesStage, { description: "List of past stages.", readOnly: true })),
    url: Type.Optional(
      Type.String({ description: "The live URL to view this deployment.", readOnly: true, "x-auditable": true }),
    ),
  }),
)

export const PagesDeploymentNewDeployment = named(
  "pages_deployment-new-deployment",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(false), Type.Literal(true)], {
      description: "Whether the API call was successful",
    }),
    result: PagesDeployments,
  }),
)

export const PagesApiResponseCommonFailure = named(
  "pages_api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Unknown(), Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const PagesDeploymentConfigsValues = named(
  "pages_deployment_configs_values",
  Type.Object({
    ai_bindings: Type.Optional(
      Type.Record(
        Type.String(),
        Type.Union([
          Type.Object(
            {
              project_id: Type.Optional(Type.String({ "x-auditable": true })),
            },
            { description: "AI binding." },
          ),
          Type.Null(),
        ]),
      ),
    ),
    analytics_engine_datasets: Type.Optional(
      Type.Record(
        Type.String(),
        Type.Union([
          Type.Object(
            {
              dataset: Type.Optional(Type.String({ description: "Name of the dataset.", "x-auditable": true })),
            },
            { description: "Analytics Engine binding." },
          ),
          Type.Null(),
        ]),
      ),
    ),
    browsers: Type.Optional(
      Type.Record(
        Type.String(),
        Type.Union([Type.Unknown({ description: "Browser binding.", "x-stainless-empty-object": true }), Type.Null()]),
      ),
    ),
    compatibility_date: Type.Optional(
      Type.String({ description: "Compatibility date used for Pages Functions.", "x-auditable": true }),
    ),
    compatibility_flags: Type.Optional(
      Type.Array(Type.String({ "x-auditable": true }), {
        description: "Compatibility flags used for Pages Functions.",
      }),
    ),
    d1_databases: Type.Optional(
      Type.Record(
        Type.String(),
        Type.Union([
          Type.Object(
            {
              id: Type.Optional(Type.String({ description: "UUID of the D1 database.", "x-auditable": true })),
            },
            { description: "D1 binding." },
          ),
          Type.Null(),
        ]),
      ),
    ),
    durable_object_namespaces: Type.Optional(
      Type.Record(
        Type.String(),
        Type.Union([
          Type.Object(
            {
              namespace_id: Type.Optional(
                Type.String({ description: "ID of the Durable Object namespace.", "x-auditable": true }),
              ),
            },
            { description: "Durable Object binding." },
          ),
          Type.Null(),
        ]),
      ),
    ),
    env_vars: Type.Optional(PagesEnvVars),
    hyperdrive_bindings: Type.Optional(
      Type.Record(
        Type.String(),
        Type.Union([
          Type.Object(
            {
              id: Type.Optional(Type.String({ "x-auditable": true })),
            },
            { description: "Hyperdrive binding." },
          ),
          Type.Null(),
        ]),
      ),
    ),
    kv_namespaces: Type.Optional(
      Type.Record(
        Type.String(),
        Type.Union([
          Type.Object(
            {
              namespace_id: Type.Optional(Type.String({ description: "ID of the KV namespace.", "x-auditable": true })),
            },
            { description: "KV namespace binding." },
          ),
          Type.Null(),
        ]),
      ),
    ),
    mtls_certificates: Type.Optional(
      Type.Record(
        Type.String(),
        Type.Union([
          Type.Object(
            {
              certificate_id: Type.Optional(Type.String({ "x-auditable": true })),
            },
            { description: "mTLS binding." },
          ),
          Type.Null(),
        ]),
      ),
    ),
    placement: Type.Optional(
      Type.Union([
        Type.Object(
          {
            mode: Type.Optional(Type.String({ description: "Placement mode.", "x-auditable": true })),
          },
          { description: "Placement setting used for Pages Functions." },
        ),
        Type.Null(),
      ]),
    ),
    queue_producers: Type.Optional(
      Type.Record(
        Type.String(),
        Type.Union([
          Type.Object(
            {
              name: Type.Optional(Type.String({ description: "Name of the Queue.", "x-auditable": true })),
            },
            { description: "Queue Producer binding." },
          ),
          Type.Null(),
        ]),
      ),
    ),
    r2_buckets: Type.Optional(
      Type.Record(
        Type.String(),
        Type.Object(
          {
            jurisdiction: Type.Optional(
              Type.Union([
                Type.String({ description: "Jurisdiction of the R2 bucket.", "x-auditable": true }),
                Type.Null(),
              ]),
            ),
            name: Type.Optional(Type.String({ description: "Name of the R2 bucket.", "x-auditable": true })),
          },
          { description: "R2 binding." },
        ),
      ),
    ),
    services: Type.Optional(
      Type.Record(
        Type.String(),
        Type.Object(
          {
            entrypoint: Type.Optional(
              Type.Union([
                Type.String({ description: "The entrypoint to bind to.", "x-auditable": true }),
                Type.Null(),
              ]),
            ),
            environment: Type.Optional(Type.String({ description: "The Service environment.", "x-auditable": true })),
            service: Type.Optional(Type.String({ description: "The Service name.", "x-auditable": true })),
          },
          { description: "Service binding." },
        ),
      ),
    ),
    vectorize_bindings: Type.Optional(
      Type.Record(
        Type.String(),
        Type.Union([
          Type.Object(
            {
              index_name: Type.Optional(Type.String({ "x-auditable": true })),
            },
            { description: "Vectorize binding." },
          ),
          Type.Null(),
        ]),
      ),
    ),
  }),
)

export const PagesDeploymentConfigs = named(
  "pages_deployment_configs",
  Type.Object(
    {
      preview: Type.Optional(PagesDeploymentConfigsValues),
      production: Type.Optional(PagesDeploymentConfigsValues),
    },
    { description: "Configs for deployments in a project." },
  ),
)

export const PagesProjectObject = named(
  "pages_project-object",
  Type.Object({
    build_config: Type.Optional(PagesBuildConfig),
    canonical_deployment: Type.Optional(PagesDeployments),
    created_on: Type.Optional(
      Type.String({
        description: "When the project was created.",
        format: "date-time",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    deployment_configs: Type.Optional(PagesDeploymentConfigs),
    domains: Type.Optional(
      Type.Array(Type.String({ "x-auditable": true }), {
        description: "A list of associated custom domains for the project.",
        readOnly: true,
      }),
    ),
    id: Type.Optional(Type.String({ description: "Id of the project.", readOnly: true, "x-auditable": true })),
    latest_deployment: Type.Optional(PagesDeployments),
    name: Type.Optional(Type.String({ description: "Name of the project.", "x-auditable": true })),
    production_branch: Type.Optional(
      Type.String({
        description: "Production branch of the project. Used to identify production deployments.",
        "x-auditable": true,
      }),
    ),
    source: Type.Optional(PagesSource),
    subdomain: Type.Optional(
      Type.String({
        description: "The Cloudflare subdomain associated with the project.",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
  }),
)

export const PagesProjectPatch = named("pages_project-patch", PagesProjectObject)

export const PagesProjectName = named(
  "pages_project_name",
  Type.String({ description: "Name of the project.", "x-auditable": true }),
)

export const PagesProjectResponse = named(
  "pages_project-response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(false), Type.Literal(true)], {
      description: "Whether the API call was successful",
    }),
    result: PagesProjectObject,
  }),
)

export const PagesProjectsResponse = named(
  "pages_projects-response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(false), Type.Literal(true)], {
      description: "Whether the API call was successful",
    }),
    result_info: Type.Optional(
      Type.Object({
        count: Type.Integer({ description: "The number of items on the current page." }),
        page: Type.Integer({ description: "The page currently being requested." }),
        per_page: Type.Integer({ description: "The number of items per page being returned." }),
        total_count: Type.Integer({ description: "The total count of items." }),
        total_pages: Type.Optional(Type.Integer({ description: "The total count of pages." })),
      }),
    ),
    result: Type.Array(PagesDeployments),
  }),
)

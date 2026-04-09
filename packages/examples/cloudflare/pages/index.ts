import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages, PageShieldId } from "../shared/schemas"
import {
  PagesApiResponseCommonFailure,
  PagesDeploymentNewDeployment,
  PagesDeploymentResponseLogs,
  PagesDeployments,
  PagesDomainName,
  PagesDomainObject,
  PagesDomainResponseCollection,
  PagesDomainResponseSingle,
  PagesDomainsPost,
  PagesProjectName,
  PagesProjectObject,
  PagesProjectPatch,
  PagesProjectResponse,
  PagesProjectsResponse,
} from "./schemas"

export function registerPages(api: Api) {
  api.group("/accounts/{account_id}/pages/projects", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      responses: {
        200: PagesProjectsResponse,
        "4XX": Type.Object({
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
          result: Type.Union([Type.Unknown(), Type.Null()]),
        }),
      },
    })
      .summary("Get projects")
      .description("Fetch a list of all user projects.")
      .operationId("pages-project-get-projects")
      .tag("Pages Project")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Read", "Pages Write"])

    g.post("/", {
      body: PagesProjectObject,
      responses: {
        200: PagesProjectResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false), Type.Literal(true)], {
            description: "Whether the API call was successful",
          }),
          result: PagesProjectObject,
        }),
      },
    })
      .summary("Create project")
      .description("Create a new project.")
      .operationId("pages-project-create-project")
      .tag("Pages Project")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Write"])

    g.get("/{project_name}", {
      params: Type.Object({ project_name: PagesProjectName }),
      responses: {
        200: PagesProjectResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false), Type.Literal(true)], {
            description: "Whether the API call was successful",
          }),
          result: PagesProjectObject,
        }),
      },
    })
      .summary("Get project")
      .description("Fetch a project by name.")
      .operationId("pages-project-get-project")
      .tag("Pages Project")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Read", "Pages Write"])

    g.patch("/{project_name}", {
      params: Type.Object({ project_name: PagesProjectName }),
      body: PagesProjectPatch,
      responses: {
        200: PagesProjectResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false), Type.Literal(true)], {
            description: "Whether the API call was successful",
          }),
          result: PagesProjectObject,
        }),
      },
    })
      .summary("Update project")
      .description(
        "Set new attributes for an existing project. Modify environment variables. To delete an environment variable, set the key to null.",
      )
      .operationId("pages-project-update-project")
      .tag("Pages Project")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Write"])

    g.delete("/{project_name}", {
      params: Type.Object({ project_name: PagesProjectName }),
      responses: {
        200: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false), Type.Literal(true)], {
            description: "Whether the API call was successful",
          }),
          result: Type.Union([Type.Unknown(), Type.Null()]),
        }),
        "4XX": PagesApiResponseCommonFailure,
      },
    })
      .summary("Delete project")
      .description("Delete a project by name.")
      .operationId("pages-project-delete-project")
      .tag("Pages Project")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Write"])

    g.get("/{project_name}/deployments", {
      params: Type.Object({ project_name: PagesProjectName }),
      query: Type.Object({
        env: Type.Optional(
          Type.Union([Type.Literal("production"), Type.Literal("preview")], {
            description: "What type of deployments to fetch.",
          }),
        ),
      }),
      responses: {
        200: PagesProjectsResponse,
        "4XX": Type.Object({
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
          result: Type.Union([Type.Unknown(), Type.Null()]),
        }),
      },
    })
      .summary("Get deployments")
      .description("Fetch a list of project deployments.")
      .operationId("pages-deployment-get-deployments")
      .tag("Pages Deployment")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Read", "Pages Write"])

    g.post("/{project_name}/deployments", {
      params: Type.Object({ project_name: PagesProjectName }),
      responses: {
        200: PagesDeploymentNewDeployment,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false), Type.Literal(true)], {
            description: "Whether the API call was successful",
          }),
          result: PagesDeployments,
        }),
      },
    })
      .summary("Create deployment")
      .description(
        "Start a new deployment from production. The repository and account must have already been authorized on the Cloudflare Pages dashboard.",
      )
      .operationId("pages-deployment-create-deployment")
      .tag("Pages Deployment")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Write"])

    g.get("/{project_name}/deployments/{deployment_id}", {
      params: Type.Object({ deployment_id: PageShieldId, project_name: PagesProjectName }),
      responses: {
        200: PagesDeploymentNewDeployment,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false), Type.Literal(true)], {
            description: "Whether the API call was successful",
          }),
          result: PagesDeployments,
        }),
      },
    })
      .summary("Get deployment info")
      .description("Fetch information about a deployment.")
      .operationId("pages-deployment-get-deployment-info")
      .tag("Pages Deployment")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Read", "Pages Write"])

    g.delete("/{project_name}/deployments/{deployment_id}", {
      params: Type.Object({ deployment_id: PageShieldId, project_name: PagesProjectName }),
      responses: {
        200: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false), Type.Literal(true)], {
            description: "Whether the API call was successful",
          }),
          result: Type.Union([Type.Unknown(), Type.Null()]),
        }),
        "4XX": PagesApiResponseCommonFailure,
      },
    })
      .summary("Delete deployment")
      .description("Delete a deployment.")
      .operationId("pages-deployment-delete-deployment")
      .tag("Pages Deployment")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Write"])

    g.get("/{project_name}/deployments/{deployment_id}/history/logs", {
      params: Type.Object({ deployment_id: PageShieldId, project_name: PagesProjectName }),
      responses: {
        200: PagesDeploymentResponseLogs,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false), Type.Literal(true)], {
            description: "Whether the API call was successful",
          }),
          result: Type.Union([
            Type.Object({
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
            Type.Null(),
          ]),
        }),
      },
    })
      .summary("Get deployment logs")
      .description("Fetch deployment logs for a project.")
      .operationId("pages-deployment-get-deployment-logs")
      .tag("Pages Deployment")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Read", "Pages Write"])

    g.post("/{project_name}/deployments/{deployment_id}/retry", {
      params: Type.Object({ deployment_id: PageShieldId, project_name: PagesProjectName }),
      responses: {
        200: PagesDeploymentNewDeployment,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false), Type.Literal(true)], {
            description: "Whether the API call was successful",
          }),
          result: PagesDeployments,
        }),
      },
    })
      .summary("Retry deployment")
      .description("Retry a previous deployment.")
      .operationId("pages-deployment-retry-deployment")
      .tag("Pages Deployment")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Write"])

    g.post("/{project_name}/deployments/{deployment_id}/rollback", {
      params: Type.Object({ deployment_id: PageShieldId, project_name: PagesProjectName }),
      responses: {
        200: PagesDeploymentNewDeployment,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false), Type.Literal(true)], {
            description: "Whether the API call was successful",
          }),
          result: PagesDeployments,
        }),
      },
    })
      .summary("Rollback deployment")
      .description(
        "Rollback the production deployment to a previous deployment. You can only rollback to succesful builds on production.",
      )
      .operationId("pages-deployment-rollback-deployment")
      .tag("Pages Deployment")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Write"])

    g.get("/{project_name}/domains", {
      params: Type.Object({ project_name: PagesProjectName }),
      responses: {
        200: PagesDomainResponseCollection,
        "4XX": Type.Object({
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
          result: Type.Union([Type.Unknown(), Type.Null()]),
        }),
      },
    })
      .summary("Get domains")
      .description("Fetch a list of all domains associated with a Pages project.")
      .operationId("pages-domains-get-domains")
      .tag("Pages Domains")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Read", "Pages Write"])

    g.post("/{project_name}/domains", {
      params: Type.Object({ project_name: PagesProjectName }),
      body: PagesDomainsPost,
      responses: {
        200: PagesDomainResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false), Type.Literal(true)], {
            description: "Whether the API call was successful",
          }),
          result: PagesDomainObject,
        }),
      },
    })
      .summary("Add domain")
      .description("Add a new domain for the Pages project.")
      .operationId("pages-domains-add-domain")
      .tag("Pages Domains")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Write"])

    g.get("/{project_name}/domains/{domain_name}", {
      params: Type.Object({ domain_name: PagesDomainName, project_name: PagesProjectName }),
      responses: {
        200: PagesDomainResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false), Type.Literal(true)], {
            description: "Whether the API call was successful",
          }),
          result: PagesDomainObject,
        }),
      },
    })
      .summary("Get domain")
      .description("Fetch a single domain.")
      .operationId("pages-domains-get-domain")
      .tag("Pages Domains")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Read", "Pages Write"])

    g.patch("/{project_name}/domains/{domain_name}", {
      params: Type.Object({ domain_name: PagesDomainName, project_name: PagesProjectName }),
      responses: {
        200: PagesDomainResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false), Type.Literal(true)], {
            description: "Whether the API call was successful",
          }),
          result: PagesDomainObject,
        }),
      },
    })
      .summary("Patch domain")
      .description("Retry the validation status of a single domain.")
      .operationId("pages-domains-patch-domain")
      .tag("Pages Domains")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Write"])

    g.delete("/{project_name}/domains/{domain_name}", {
      params: Type.Object({ domain_name: PagesDomainName, project_name: PagesProjectName }),
      responses: {
        200: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false), Type.Literal(true)], {
            description: "Whether the API call was successful",
          }),
          result: Type.Union([Type.Unknown(), Type.Null()]),
        }),
        "4xx": PagesApiResponseCommonFailure,
      },
    })
      .summary("Delete domain")
      .description("Delete a Pages project's domain.")
      .operationId("pages-domains-delete-domain")
      .tag("Pages Domains")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Write"])

    g.post("/{project_name}/purge_build_cache", {
      params: Type.Object({ project_name: PagesProjectName }),
      responses: {
        200: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(false), Type.Literal(true)], {
            description: "Whether the API call was successful",
          }),
          result: Type.Union([Type.Unknown(), Type.Null()]),
        }),
        "4XX": PagesApiResponseCommonFailure,
      },
    })
      .summary("Purge build cache")
      .description("Purge all cached build artifacts for a Pages project")
      .operationId("pages-purge-build-cache")
      .tag("Pages Build Cache")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Pages Write"])
  })
}

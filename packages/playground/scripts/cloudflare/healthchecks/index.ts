import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages, IamResultInfo, PageShieldId } from "../shared/schemas"
import {
  HealthchecksIdResponse,
  HealthchecksQueryHealthcheck,
  HealthchecksResponseCollection,
  HealthchecksSingleResponse,
  UnnamedSchemaRefAaa560acadcbf1ae1dc619ba1ea5948e,
} from "./schemas"

export function registerHealthchecks(api: Api) {
  api.assertVersion("3.0.3", "Healthchecks")

  api.group("/zones/{zone_id}/healthchecks", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        page: Type.Optional(Type.Number({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Number({ default: 25, minimum: 5, maximum: 1000 })),
      }),
    })
      .response(HealthchecksResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IamResultInfo),
        }),
      )
      .summary("List Health Checks")
      .description("List configured health checks.")
      .operationId("health-checks-list-health-checks")
      .tag("Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Health Checks Write", "Health Checks Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.post("/", {
      body: HealthchecksQueryHealthcheck,
    })
      .response(HealthchecksSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefAaa560acadcbf1ae1dc619ba1ea5948e,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      )
      .summary("Create Health Check")
      .description("Create a new health check.")
      .operationId("health-checks-create-health-check")
      .tag("Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Health Checks Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.post("/preview", {
      body: HealthchecksQueryHealthcheck,
    })
      .response(HealthchecksSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefAaa560acadcbf1ae1dc619ba1ea5948e,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      )
      .summary("Create Preview Health Check")
      .description("Create a new preview health check.")
      .operationId("health-checks-create-preview-health-check")
      .tag("Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Health Checks Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/preview/{healthcheck_id}", {
      params: Type.Object({ healthcheck_id: PageShieldId }),
    })
      .response(HealthchecksSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefAaa560acadcbf1ae1dc619ba1ea5948e,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      )
      .summary("Health Check Preview Details")
      .description("Fetch a single configured health check preview.")
      .operationId("health-checks-health-check-preview-details")
      .tag("Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Health Checks Write", "Health Checks Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.delete("/preview/{healthcheck_id}", {
      params: Type.Object({ healthcheck_id: PageShieldId }),
    })
      .response(HealthchecksIdResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      )
      .summary("Delete Preview Health Check")
      .description("Delete a health check.")
      .operationId("health-checks-delete-preview-health-check")
      .tag("Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Health Checks Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/{healthcheck_id}", {
      params: Type.Object({ healthcheck_id: PageShieldId }),
    })
      .response(HealthchecksSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefAaa560acadcbf1ae1dc619ba1ea5948e,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      )
      .summary("Health Check Details")
      .description("Fetch a single configured health check.")
      .operationId("health-checks-health-check-details")
      .tag("Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Health Checks Write", "Health Checks Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.put("/{healthcheck_id}", {
      params: Type.Object({ healthcheck_id: PageShieldId }),
      body: HealthchecksQueryHealthcheck,
    })
      .response(HealthchecksSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefAaa560acadcbf1ae1dc619ba1ea5948e,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      )
      .summary("Update Health Check")
      .description("Update a configured health check.")
      .operationId("health-checks-update-health-check")
      .tag("Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Health Checks Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.patch("/{healthcheck_id}", {
      params: Type.Object({ healthcheck_id: PageShieldId }),
      body: HealthchecksQueryHealthcheck,
    })
      .response(HealthchecksSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefAaa560acadcbf1ae1dc619ba1ea5948e,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      )
      .summary("Patch Health Check")
      .description("Patch a configured health check.")
      .operationId("health-checks-patch-health-check")
      .tag("Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Health Checks Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.delete("/{healthcheck_id}", {
      params: Type.Object({ healthcheck_id: PageShieldId }),
    })
      .response(HealthchecksIdResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      )
      .summary("Delete Health Check")
      .description("Delete a health check.")
      .operationId("health-checks-delete-health-check")
      .tag("Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Health Checks Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })
  })
}

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, MagicTransitUuid } from "../shared/schemas"
import {
  MagicTransitApiResponseCommon,
  MagicTransitApiResponseCommonFailure,
  MagicTransitColos,
  MagicTransitEndpointHealthCheck,
  MagicTransitEndpointHealthCheckResponseSingle,
  MagicTransitOptions,
  MagicTransitTargets,
  MagicTransitTracerouteResponseCollection,
} from "./schemas"

export function registerDiagnostics(api: Api) {
  api.assertVersion("3.0.3", "Diagnostics")

  api.group("/accounts/{account_id}/diagnostics", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/endpoint-healthchecks", {})
      .response(MagicTransitEndpointHealthCheckResponseSingle)
      .error("4XX", MagicTransitApiResponseCommonFailure)
      .summary("List Endpoint Health Checks")
      .description("List Endpoint Health Checks.")
      .operationId("diagnostics-endpoint-healthcheck-list")
      .tag("Endpoint Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/endpoint-healthchecks", {
      body: MagicTransitEndpointHealthCheck,
    })
      .respond(201, MagicTransitEndpointHealthCheckResponseSingle)
      .error("4XX", MagicTransitApiResponseCommonFailure)
      .summary("Endpoint Health Check")
      .description("Create Endpoint Health Check.")
      .operationId("diagnostics-endpoint-healthcheck-create")
      .tag("Endpoint Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/endpoint-healthchecks/{id}", {
      params: Type.Object({ id: MagicTransitUuid }),
    })
      .response(MagicTransitEndpointHealthCheckResponseSingle)
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
      .summary("Get Endpoint Health Check")
      .description("Get a single Endpoint Health Check.")
      .operationId("diagnostics-endpoint-healthcheck-get")
      .tag("Endpoint Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/endpoint-healthchecks/{id}", {
      params: Type.Object({ id: MagicTransitUuid }),
      body: MagicTransitEndpointHealthCheck,
    })
      .response(MagicTransitEndpointHealthCheckResponseSingle)
      .error("4XX", MagicTransitApiResponseCommonFailure)
      .summary("Update Endpoint Health Check")
      .description("Update a Endpoint Health Check.")
      .operationId("diagnostics-endpoint-healthcheck-update")
      .tag("Endpoint Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/endpoint-healthchecks/{id}", {
      params: Type.Object({ id: MagicTransitUuid }),
    })
      .response(MagicTransitApiResponseCommon)
      .error("4XX", MagicTransitApiResponseCommonFailure)
      .summary("Delete Endpoint Health Check")
      .description("Delete Endpoint Health Check.")
      .operationId("diagnostics-endpoint-healthcheck-delete")
      .tag("Endpoint Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/traceroute", {
      body: Type.Object({
        colos: Type.Optional(MagicTransitColos),
        options: Type.Optional(MagicTransitOptions),
        targets: MagicTransitTargets,
      }),
    })
      .response(MagicTransitTracerouteResponseCollection)
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
      .summary("Traceroute")
      .description("Run traceroutes from Cloudflare colos.")
      .operationId("diagnostics-traceroute")
      .tag("Diagnostics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })
  })
}

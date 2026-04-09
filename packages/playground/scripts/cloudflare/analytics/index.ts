import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages } from "../shared/schemas"
import { ArgoAnalyticsResponseSingle } from "./schemas"

export function registerAnalytics(api: Api) {
  api.assertVersion("3.0.3", "Analytics")

  api.group("/zones/{zone_id}/analytics/latency", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        bins: Type.Optional(Type.String()),
      }),
    })
      .response(ArgoAnalyticsResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Argo Analytics for a zone")
      .operationId("argo-analytics-for-zone-argo-analytics-for-a-zone")
      .tag("Argo Analytics for Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Analytics Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#analytics:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/colos", {})
      .response(ArgoAnalyticsResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Argo Analytics for a zone at different PoPs")
      .operationId("argo-analytics-for-geolocation-argo-analytics-for-a-zone-at-different-po-ps")
      .tag("Argo Analytics for Geolocation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Analytics Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

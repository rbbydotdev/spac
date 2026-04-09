import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  DlpMessages,
  DnsAnalyticsDimensions,
  DnsAnalyticsFilters,
  DnsAnalyticsLimit,
  DnsAnalyticsMetrics,
  DnsAnalyticsReport,
  DnsAnalyticsReportBytime,
  DnsAnalyticsSince,
  DnsAnalyticsSort,
  DnsAnalyticsTimeDelta,
  DnsAnalyticsUntil,
} from "../shared/schemas"

export function registerDnsAnalytics(api: Api) {
  api.assertVersion("3.0.3", "DnsAnalytics")

  api.group("/zones/{zone_id}/dns_analytics/report", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        metrics: Type.Optional(DnsAnalyticsMetrics),
        dimensions: Type.Optional(DnsAnalyticsDimensions),
        since: Type.Optional(DnsAnalyticsSince),
        until: Type.Optional(DnsAnalyticsUntil),
        limit: Type.Optional(DnsAnalyticsLimit),
        sort: Type.Optional(DnsAnalyticsSort),
        filters: Type.Optional(DnsAnalyticsFilters),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DnsAnalyticsReport),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Table")
      .description(
        "Retrieves a list of summarised aggregate metrics over a given time period.\n\nSee [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/) for detailed information about the available query parameters.",
      )
      .operationId("dns-analytics-table")
      .tag("DNS Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Analytics Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#analytics:read"] })

    g.get("/bytime", {
      query: Type.Object({
        metrics: Type.Optional(DnsAnalyticsMetrics),
        dimensions: Type.Optional(DnsAnalyticsDimensions),
        since: Type.Optional(DnsAnalyticsSince),
        until: Type.Optional(DnsAnalyticsUntil),
        limit: Type.Optional(DnsAnalyticsLimit),
        sort: Type.Optional(DnsAnalyticsSort),
        filters: Type.Optional(DnsAnalyticsFilters),
        time_delta: Type.Optional(DnsAnalyticsTimeDelta),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DnsAnalyticsReportBytime),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("By Time")
      .description(
        "Retrieves a list of aggregate metrics grouped by time interval.\n\nSee [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/) for detailed information about the available query parameters.",
      )
      .operationId("dns-analytics-by-time")
      .tag("DNS Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Analytics Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#analytics:read"] })
  })
}

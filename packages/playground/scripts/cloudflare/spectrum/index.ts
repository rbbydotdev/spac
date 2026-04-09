import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  SpectrumAnalyticsApiResponseCommonFailure,
  SpectrumAnalyticsAppIdParam,
  SpectrumAnalyticsDimensions,
  SpectrumAnalyticsFilters,
  SpectrumAnalyticsMetrics,
  SpectrumAnalyticsQueryResponseAggregate,
  SpectrumAnalyticsQueryResponseSingle,
  SpectrumAnalyticsSince,
  SpectrumAnalyticsSort,
  SpectrumAnalyticsUntil,
  SpectrumConfigApiResponseCommonFailure,
  SpectrumConfigApiResponseSingleId,
  SpectrumConfigAppConfigCollection,
  SpectrumConfigAppConfigSingle,
  SpectrumConfigAppIdentifier,
  SpectrumConfigUpdateAppConfig,
} from "./schemas"

export function registerSpectrum(api: Api) {
  api.assertVersion("3.0.3", "Spectrum")

  api.group("/zones/{zone_id}/spectrum", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/analytics/aggregate/current", {
      query: Type.Object({
        appID: Type.Optional(SpectrumAnalyticsAppIdParam),
        colo_name: Type.Optional(Type.String({ description: "Co-location identifier.", maxLength: 3 })),
      }),
    })
      .response(SpectrumAnalyticsQueryResponseAggregate)
      .error("4xx", SpectrumAnalyticsApiResponseCommonFailure)
      .summary("Get current aggregated analytics")
      .description(
        "Retrieves analytics aggregated from the last minute of usage on Spectrum applications underneath a given zone.",
      )
      .operationId("spectrum-aggregate-analytics-get-current-aggregated-analytics")
      .tag("Spectrum Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Analytics Read"])

    g.get("/analytics/events/bytime", {
      query: Type.Object({
        dimensions: Type.Optional(SpectrumAnalyticsDimensions),
        sort: Type.Optional(SpectrumAnalyticsSort),
        until: Type.Optional(SpectrumAnalyticsUntil),
        metrics: Type.Optional(SpectrumAnalyticsMetrics),
        filters: Type.Optional(SpectrumAnalyticsFilters),
        since: Type.Optional(SpectrumAnalyticsSince),
        time_delta: Type.Union(
          [
            Type.Literal("year"),
            Type.Literal("quarter"),
            Type.Literal("month"),
            Type.Literal("week"),
            Type.Literal("day"),
            Type.Literal("hour"),
            Type.Literal("dekaminute"),
            Type.Literal("minute"),
          ],
          { description: "Used to select time series resolution." },
        ),
      }),
    })
      .response(SpectrumAnalyticsQueryResponseSingle)
      .error("4xx", SpectrumAnalyticsApiResponseCommonFailure)
      .summary("Get analytics by time")
      .description("Retrieves a list of aggregate metrics grouped by time interval.")
      .operationId("spectrum-analytics-(-by-time)-get-analytics-by-time")
      .tag("Spectrum Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Analytics Read"])

    g.get("/analytics/events/summary", {
      query: Type.Object({
        dimensions: Type.Optional(SpectrumAnalyticsDimensions),
        sort: Type.Optional(SpectrumAnalyticsSort),
        until: Type.Optional(SpectrumAnalyticsUntil),
        metrics: Type.Optional(SpectrumAnalyticsMetrics),
        filters: Type.Optional(SpectrumAnalyticsFilters),
        since: Type.Optional(SpectrumAnalyticsSince),
      }),
    })
      .response(SpectrumAnalyticsQueryResponseSingle)
      .error("4xx", SpectrumAnalyticsApiResponseCommonFailure)
      .summary("Get analytics summary")
      .description("Retrieves a list of summarised aggregate metrics over a given time period.")
      .operationId("spectrum-analytics-(-summary)-get-analytics-summary")
      .tag("Spectrum Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Analytics Read"])

    g.get("/apps", {
      query: Type.Object({
        page: Type.Optional(
          Type.Number({
            description:
              "Page number of paginated results. This parameter is required in order to use other pagination parameters. If included in the query, `result_info` will be present in the response.",
            minimum: 1,
          }),
        ),
        per_page: Type.Optional(
          Type.Number({
            description: "Sets the maximum number of results per page.",
            default: 20,
            minimum: 1,
            maximum: 100,
          }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
            description: "Sets the direction by which results are ordered.",
          }),
        ),
        order: Type.Optional(
          Type.Union(
            [
              Type.Literal("protocol"),
              Type.Literal("app_id"),
              Type.Literal("created_on"),
              Type.Literal("modified_on"),
              Type.Literal("dns"),
            ],
            { description: "Application field by which results are ordered." },
          ),
        ),
      }),
    })
      .response(SpectrumConfigAppConfigCollection)
      .error("4XX", SpectrumConfigApiResponseCommonFailure)
      .summary("List Spectrum applications")
      .description("Retrieves a list of currently existing Spectrum applications inside a zone.")
      .operationId("spectrum-applications-list-spectrum-applications")
      .tag("Spectrum Applications")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])

    g.post("/apps", {
      body: SpectrumConfigUpdateAppConfig,
    })
      .response(SpectrumConfigAppConfigSingle)
      .error("4XX", SpectrumConfigApiResponseCommonFailure)
      .summary("Create Spectrum application using a name for the origin")
      .description("Creates a new Spectrum application from a configuration using a name for the origin.")
      .operationId("spectrum-applications-create-spectrum-application-using-a-name-for-the-origin")
      .tag("Spectrum Applications")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write"])

    g.get("/apps/{app_id}", {
      params: Type.Object({ app_id: SpectrumConfigAppIdentifier }),
    })
      .response(SpectrumConfigAppConfigSingle)
      .error("4XX", SpectrumConfigApiResponseCommonFailure)
      .summary("Get Spectrum application configuration")
      .description("Gets the application configuration of a specific application inside a zone.")
      .operationId("spectrum-applications-get-spectrum-application-configuration")
      .tag("Spectrum Applications")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])

    g.put("/apps/{app_id}", {
      params: Type.Object({ app_id: SpectrumConfigAppIdentifier }),
      body: SpectrumConfigUpdateAppConfig,
    })
      .response(SpectrumConfigAppConfigSingle)
      .error("4XX", SpectrumConfigApiResponseCommonFailure)
      .summary("Update Spectrum application configuration using a name for the origin")
      .description("Updates a previously existing application's configuration that uses a name for the origin.")
      .operationId("spectrum-applications-update-spectrum-application-configuration-using-a-name-for-the-origin")
      .tag("Spectrum Applications")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write"])

    g.delete("/apps/{app_id}", {
      params: Type.Object({ app_id: SpectrumConfigAppIdentifier }),
    })
      .response(SpectrumConfigApiResponseSingleId)
      .error("4XX", SpectrumConfigApiResponseCommonFailure)
      .summary("Delete Spectrum application")
      .description("Deletes a previously existing application.")
      .operationId("spectrum-applications-delete-spectrum-application")
      .tag("Spectrum Applications")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write"])
  })
}

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { AaaIdentifier, D1Messages, MagicIdentifier } from "../shared/schemas"
import {
  ZoneAnalyticsApiColoResponse,
  ZoneAnalyticsApiDashboardResponse,
  ZoneAnalyticsApiQueryResponse,
  ZoneAnalyticsApiUntil,
  ZonesApiResponseCommonFailure,
  ZonesApiResponseSingleId,
  ZonesName,
  ZonesPaused,
  ZonesResultInfo,
  ZonesType,
  ZonesVanityNameServers,
  ZonesZone,
} from "./schemas"

export function registerZones(api: Api) {
  api.assertVersion("3.0.3", "Zones")

  api.group("/zones", (g) => {
    g.get("/", {
      query: Type.Object({
        name: Type.Optional(
          Type.String({
            description:
              "A domain name. Optional filter operators can be provided to extend refine the search:\n  * `equal` (default)\n  * `not_equal`\n  * `starts_with`\n  * `ends_with`\n  * `contains`\n  * `starts_with_case_sensitive`\n  * `ends_with_case_sensitive`\n  * `contains_case_sensitive`\n",
            maxLength: 253,
          }),
        ),
        status: Type.Optional(
          Type.Union(
            [Type.Literal("initializing"), Type.Literal("pending"), Type.Literal("active"), Type.Literal("moved")],
            { description: "Specify a zone status to filter by." },
          ),
        ),
        "account.id": Type.Optional(Type.String({ description: "Filter by an account ID." })),
        "account.name": Type.Optional(
          Type.String({
            description:
              "An account Name. Optional filter operators can be provided to extend refine the search:\n  * `equal` (default)\n  * `not_equal`\n  * `starts_with`\n  * `ends_with`\n  * `contains`\n  * `starts_with_case_sensitive`\n  * `ends_with_case_sensitive`\n  * `contains_case_sensitive`\n",
            maxLength: 253,
          }),
        ),
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Number of zones per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
        order: Type.Optional(
          Type.Union(
            [
              Type.Literal("name"),
              Type.Literal("status"),
              Type.Literal("account.id"),
              Type.Literal("account.name"),
              Type.Literal("plan.id"),
            ],
            { description: "Field to order zones by." },
          ),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Direction to order zones." }),
        ),
        match: Type.Optional(
          Type.Union([Type.Literal("any"), Type.Literal("all")], {
            description: "Whether to match all search requirements or at least one (any).",
          }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Boolean({ description: "Whether the API call was successful." }),
          result_info: Type.Optional(ZonesResultInfo),
          result: Type.Optional(Type.Array(ZonesZone)),
        }),
      )
      .error("4XX", ZonesApiResponseCommonFailure)
      .summary("List Zones")
      .description(
        "Lists, searches, sorts, and filters your zones. Listing zones across more than 500 accounts\nis currently not allowed.\n",
      )
      .operationId("zones-get")
      .tag("Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.post("/", {
      body: Type.Object({
        account: Type.Object({
          id: Type.Optional(MagicIdentifier),
        }),
        name: ZonesName,
        type: Type.Optional(ZonesType),
      }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Boolean({ description: "Whether the API call was successful." }),
          result: Type.Optional(ZonesZone),
        }),
      )
      .error("4XX", ZonesApiResponseCommonFailure)
      .summary("Create Zone")
      .operationId("zones-post")
      .tag("Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Zone Edit", "Zone DNS Edit"])

    g.get("/{zone_identifier}/analytics/colos", {
      params: Type.Object({ zone_identifier: AaaIdentifier }),
      query: Type.Object({
        until: Type.Optional(ZoneAnalyticsApiUntil),
        since: Type.Optional(
          Type.Union([Type.String(), Type.Integer()], {
            description:
              "The (inclusive) beginning of the requested time frame. This value can be a negative integer representing the number of minutes in the past relative to time the request is made, or can be an absolute timestamp that conforms to RFC 3339. At this point in time, it cannot exceed a time in the past greater than one year.\n\nRanges that the Cloudflare web application provides will provide the following period length for each point:\n- Last 60 minutes (from -59 to -1): 1 minute resolution\n- Last 7 hours (from -419 to -60): 15 minutes resolution\n- Last 15 hours (from -899 to -420): 30 minutes resolution\n- Last 72 hours (from -4320 to -900): 1 hour resolution\n- Older than 3 days (-525600 to -4320): 1 day resolution.",
          }),
        ),
        continuous: Type.Optional(
          Type.Boolean({
            description:
              "When set to true, the API will move the requested time window backward, until it finds a region with completely aggregated data.\n\nThe API response _may not represent the requested time window_.",
            default: true,
          }),
        ),
      }),
    })
      .response(ZoneAnalyticsApiColoResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()], {
            description:
              "A breakdown of all dashboard analytics data by co-locations. This is limited to Enterprise zones only.",
          }),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          query: Type.Optional(ZoneAnalyticsApiQueryResponse),
        }),
      )
      .summary("Get analytics by Co-locations")
      .description(
        "This view provides a breakdown of analytics data by datacenter. Note: This is available to Enterprise customers only.",
      )
      .operationId("zone-analytics-(-deprecated)-get-analytics-by-co-locations")
      .tag("Zone Analytics (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Analytics Read"])
      .extension("x-cfDeprecation", {
        description:
          "Please use the new GraphQL Analytics API instead: https://developers.cloudflare.com/analytics/graphql-api/. It provides equivalent data and more features, including the ability to select only the metrics you need. Migration guide: https://developers.cloudflare.com/analytics/migration-guides/zone-analytics/.",
        display: true,
        eol: "2021-03-01",
        id: "zone_analytics_deprecation",
      })
      .extension("x-cfPermissionsRequired", { enum: ["#analytics:read"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{zone_identifier}/analytics/dashboard", {
      params: Type.Object({ zone_identifier: AaaIdentifier }),
      query: Type.Object({
        until: Type.Optional(ZoneAnalyticsApiUntil),
        since: Type.Optional(
          Type.Union([Type.String(), Type.Integer()], {
            description:
              "The (inclusive) beginning of the requested time frame. This value can be a negative integer representing the number of minutes in the past relative to time the request is made, or can be an absolute timestamp that conforms to RFC 3339. At this point in time, it cannot exceed a time in the past greater than one year.\n\nRanges that the Cloudflare web application provides will provide the following period length for each point:\n- Last 60 minutes (from -59 to -1): 1 minute resolution\n- Last 7 hours (from -419 to -60): 15 minutes resolution\n- Last 15 hours (from -899 to -420): 30 minutes resolution\n- Last 72 hours (from -4320 to -900): 1 hour resolution\n- Older than 3 days (-525600 to -4320): 1 day resolution.",
          }),
        ),
        continuous: Type.Optional(
          Type.Boolean({
            description:
              "When set to true, the API will move the requested time window backward, until it finds a region with completely aggregated data.\n\nThe API response _may not represent the requested time window_.",
            default: true,
          }),
        ),
      }),
    })
      .response(ZoneAnalyticsApiDashboardResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()], { description: "Totals and timeseries data." }),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          query: Type.Optional(ZoneAnalyticsApiQueryResponse),
        }),
      )
      .summary("Get dashboard")
      .description(
        "The dashboard view provides both totals and timeseries data for the given zone and time period across the entire Cloudflare network.",
      )
      .operationId("zone-analytics-(-deprecated)-get-dashboard")
      .tag("Zone Analytics (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Analytics Read"])
      .extension("x-cfDeprecation", {
        description:
          "Please use the new GraphQL Analytics API instead: https://developers.cloudflare.com/analytics/graphql-api/. It provides equivalent data and more features, including the ability to select only the metrics you need. Migration guide: https://developers.cloudflare.com/analytics/migration-guides/zone-analytics/.",
        display: true,
        eol: "2021-03-01",
        id: "zone_analytics_deprecation",
      })
      .extension("x-cfPermissionsRequired", { enum: ["#analytics:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{zone_id}", {
      params: Type.Object({ zone_id: MagicIdentifier }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Boolean({ description: "Whether the API call was successful." }),
          result: Type.Optional(ZonesZone),
        }),
      )
      .error("4XX", ZonesApiResponseCommonFailure)
      .summary("Zone Details")
      .operationId("zones-0-get")
      .tag("Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Trust and Safety Write",
        "Trust and Safety Read",
        "Zero Trust: PII Read",
        "Zaraz Edit",
        "Zaraz Read",
        "Zaraz Admin",
        "Access: Apps and Policies Revoke",
        "Access: Apps and Policies Write",
        "Access: Apps and Policies Read",
        "Access: Apps and Policies Revoke",
        "Access: Mutual TLS Certificates Write",
        "Access: Organizations, Identity Providers, and Groups Write",
        "Zone Settings Write",
        "Zone Settings Read",
        "Zone Read",
        "DNS Read",
        "Workers Scripts Write",
        "Workers Scripts Read",
        "Zone Write",
        "Workers Routes Write",
        "Workers Routes Read",
        "Stream Write",
        "Stream Read",
        "SSL and Certificates Write",
        "SSL and Certificates Read",
        "Logs Write",
        "Logs Read",
        "Cache Purge",
        "Page Rules Write",
        "Page Rules Read",
        "Load Balancers Write",
        "Load Balancers Read",
        "Firewall Services Write",
        "Firewall Services Read",
        "DNS Write",
        "Apps Write",
        "Analytics Read",
        "Access: Apps and Policies Write",
        "Access: Apps and Policies Read",
      ])
      .extension("x-cfPermissionsRequired", { enum: ["#zone:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/{zone_id}", {
      params: Type.Object({ zone_id: MagicIdentifier }),
      body: Type.Object({
        paused: Type.Optional(ZonesPaused),
        type: Type.Optional(
          Type.Union(
            [Type.Literal("full"), Type.Literal("partial"), Type.Literal("secondary"), Type.Literal("internal")],
            {
              description:
                "A full zone implies that DNS is hosted with Cloudflare. A partial\nzone is typically a partner-hosted zone or a CNAME setup. This\nparameter is only available to Enterprise customers or if it has\nbeen explicitly enabled on a zone.\n",
            },
          ),
        ),
        vanity_name_servers: Type.Optional(ZonesVanityNameServers),
      }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Boolean({ description: "Whether the API call was successful." }),
          result: Type.Optional(ZonesZone),
        }),
      )
      .error("4XX", ZonesApiResponseCommonFailure)
      .summary("Edit Zone")
      .description("Edits a zone. Only one zone property can be changed at a time.")
      .operationId("zones-0-patch")
      .tag("Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{zone_id}", {
      params: Type.Object({ zone_id: MagicIdentifier }),
    })
      .response(ZonesApiResponseSingleId)
      .error("4XX", ZonesApiResponseCommonFailure)
      .summary("Delete Zone")
      .description("Deletes an existing zone.")
      .operationId("zones-0-delete")
      .tag("Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

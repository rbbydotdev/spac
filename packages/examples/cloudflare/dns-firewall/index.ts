import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  DlpMessages,
  DlsIdentifier,
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
import {
  DnsFirewallDnsFirewallClusterPatch,
  DnsFirewallDnsFirewallClusterPost,
  DnsFirewallDnsFirewallResponseCollection,
  DnsFirewallDnsFirewallReverseDnsPatch,
  DnsFirewallDnsFirewallReverseDnsResponse,
  DnsFirewallDnsFirewallSingleResponse,
} from "./schemas"

export function registerDnsFirewall(api: Api) {
  api.group("/accounts/{account_id}/dns_firewall", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        page: Type.Optional(Type.Number({ description: "Page number of paginated results", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Number of clusters per page", default: 20, minimum: 1, maximum: 100 }),
        ),
      }),
      responses: {
        200: DnsFirewallDnsFirewallResponseCollection,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
              per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
              total_count: Type.Optional(
                Type.Number({ description: "Total results available without any search parameters." }),
              ),
            }),
          ),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("List DNS Firewall Clusters")
      .description("List DNS Firewall clusters for an account")
      .operationId("dns-firewall-list-dns-firewall-clusters")
      .tag("DNS Firewall")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Firewall Write", "DNS Firewall Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:read"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/", {
      body: DnsFirewallDnsFirewallClusterPost,
      responses: {
        200: DnsFirewallDnsFirewallSingleResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Create DNS Firewall Cluster")
      .description("Create a DNS Firewall cluster")
      .operationId("dns-firewall-create-dns-firewall-cluster")
      .tag("DNS Firewall")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Firewall Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{dns_firewall_id}", {
      params: Type.Object({ dns_firewall_id: DlsIdentifier }),
      responses: {
        200: DnsFirewallDnsFirewallSingleResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("DNS Firewall Cluster Details")
      .description("Show a single DNS Firewall cluster for an account")
      .operationId("dns-firewall-dns-firewall-cluster-details")
      .tag("DNS Firewall")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Firewall Write", "DNS Firewall Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:read"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.patch("/{dns_firewall_id}", {
      params: Type.Object({ dns_firewall_id: DlsIdentifier }),
      body: DnsFirewallDnsFirewallClusterPatch,
      responses: {
        200: DnsFirewallDnsFirewallSingleResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Update DNS Firewall Cluster")
      .description("Modify the configuration of a DNS Firewall cluster")
      .operationId("dns-firewall-update-dns-firewall-cluster")
      .tag("DNS Firewall")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Firewall Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/{dns_firewall_id}", {
      params: Type.Object({ dns_firewall_id: DlsIdentifier }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              id: Type.Optional(DlsIdentifier),
            }),
          ),
        }),
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Delete DNS Firewall Cluster")
      .description("Delete a DNS Firewall cluster")
      .operationId("dns-firewall-delete-dns-firewall-cluster")
      .tag("DNS Firewall")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Firewall Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{dns_firewall_id}/dns_analytics/report", {
      params: Type.Object({ dns_firewall_id: DlsIdentifier }),
      query: Type.Object({
        metrics: Type.Optional(DnsAnalyticsMetrics),
        dimensions: Type.Optional(DnsAnalyticsDimensions),
        since: Type.Optional(DnsAnalyticsSince),
        until: Type.Optional(DnsAnalyticsUntil),
        limit: Type.Optional(DnsAnalyticsLimit),
        sort: Type.Optional(DnsAnalyticsSort),
        filters: Type.Optional(DnsAnalyticsFilters),
      }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DnsAnalyticsReport),
        }),
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      },
    })
      .summary("Table")
      .description(
        "Retrieves a list of summarised aggregate metrics over a given time period.\n\nSee [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/) for detailed information about the available query parameters.",
      )
      .operationId("dns-firewall-analytics-table")
      .tag("DNS Firewall Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Firewall Write", "DNS Firewall Read"])

    g.get("/{dns_firewall_id}/dns_analytics/report/bytime", {
      params: Type.Object({ dns_firewall_id: DlsIdentifier }),
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
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DnsAnalyticsReportBytime),
        }),
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      },
    })
      .summary("By Time")
      .description(
        "Retrieves a list of aggregate metrics grouped by time interval.\n\nSee [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/) for detailed information about the available query parameters.",
      )
      .operationId("dns-firewall-analytics-by-time")
      .tag("DNS Firewall Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Firewall Write", "DNS Firewall Read"])

    g.get("/{dns_firewall_id}/reverse_dns", {
      params: Type.Object({ dns_firewall_id: DlsIdentifier }),
      responses: {
        200: DnsFirewallDnsFirewallReverseDnsResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Show DNS Firewall Cluster Reverse DNS")
      .description("Show reverse DNS configuration (PTR records) for a DNS Firewall cluster")
      .operationId("dns-firewall-show-dns-firewall-cluster-reverse-dns")
      .tag("DNS Firewall")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Firewall Write", "DNS Firewall Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:read"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.patch("/{dns_firewall_id}/reverse_dns", {
      params: Type.Object({ dns_firewall_id: DlsIdentifier }),
      body: DnsFirewallDnsFirewallReverseDnsPatch,
      responses: {
        200: DnsFirewallDnsFirewallReverseDnsResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Update DNS Firewall Cluster Reverse DNS")
      .description("Update reverse DNS configuration (PTR records) for a DNS Firewall cluster")
      .operationId("dns-firewall-update-dns-firewall-cluster-reverse-dns")
      .tag("DNS Firewall")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Firewall Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })
  })
}

import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, DlsIdentifier, DlsTimestamp } from "../shared/schemas"

export const SpectrumConfigApiResponseSingleId = named(
  "spectrum-config_api-response-single-id",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Union([
        Type.Object({
          id: DlsIdentifier,
        }),
        Type.Null(),
      ]),
    ),
  }),
)

export const SpectrumConfigAppIdentifier = named("spectrum-config_app_identifier", DlsIdentifier)

export const SpectrumConfigCreated = named("spectrum-config_created", DlsTimestamp)

export const SpectrumConfigModified = named("spectrum-config_modified", DlsTimestamp)

export const SpectrumConfigArgoSmartRouting = named(
  "spectrum-config_argo_smart_routing",
  Type.Boolean({
    description:
      'Enables Argo Smart Routing for this application.\nNotes: Only available for TCP applications with traffic_type set to "direct".',
    default: false,
  }),
)

export const SpectrumConfigDnsName = named(
  "spectrum-config_dns_name",
  Type.String({ description: "The name of the DNS record associated with the application.", format: "hostname" }),
)

export const SpectrumConfigDnsType = named(
  "spectrum-config_dns_type",
  Type.Union([Type.Literal("CNAME"), Type.Literal("ADDRESS")], {
    description: "The type of DNS record associated with the application.",
  }),
)

export const SpectrumConfigDns = named(
  "spectrum-config_dns",
  Type.Object(
    {
      name: Type.Optional(SpectrumConfigDnsName),
      type: Type.Optional(SpectrumConfigDnsType),
    },
    { description: "The name and type of DNS record for the Spectrum application." },
  ),
)

export const SpectrumConfigEdgeIps = named(
  "spectrum-config_edge_ips",
  Type.Union(
    [
      Type.Object(
        {
          connectivity: Type.Optional(
            Type.Union([Type.Literal("all"), Type.Literal("ipv4"), Type.Literal("ipv6")], {
              description: "The IP versions supported for inbound connections on Spectrum anycast IPs.",
            }),
          ),
          type: Type.Optional(
            Type.Union([Type.Literal("dynamic")], {
              description:
                "The type of edge IP configuration specified. Dynamically allocated edge IPs use Spectrum anycast IPs in accordance with the connectivity you specify. Only valid with CNAME DNS names.",
            }),
          ),
        },
        { "x-stainless-variantName": "dynamic" },
      ),
      Type.Object(
        {
          ips: Type.Optional(
            Type.Array(Type.String({ description: "Edge anycast IPs." }), {
              description:
                "The array of customer owned IPs we broadcast via anycast for this hostname and application.",
            }),
          ),
          type: Type.Optional(
            Type.Union([Type.Literal("static")], {
              description:
                "The type of edge IP configuration specified. Statically allocated edge IPs use customer IPs in accordance with the ips array you specify. Only valid with ADDRESS DNS names.",
            }),
          ),
        },
        { "x-stainless-variantName": "static" },
      ),
    ],
    { description: "The anycast edge IP configuration for the hostname of this application." },
  ),
)

export const SpectrumConfigIpFirewall = named(
  "spectrum-config_ip_firewall",
  Type.Boolean({
    description: "Enables IP Access Rules for this application.\nNotes: Only available for TCP applications.",
    default: false,
  }),
)

export const SpectrumConfigOriginDirect = named(
  "spectrum-config_origin_direct",
  Type.Array(Type.String({ format: "URI" }), {
    description: "List of origin IP addresses. Array may contain multiple IP addresses for load balancing.",
  }),
)

export const SpectrumConfigOriginDnsName = named(
  "spectrum-config_origin_dns_name",
  Type.String({ description: "The name of the DNS record associated with the origin.", format: "hostname" }),
)

export const SpectrumConfigDnsTtl = named(
  "spectrum-config_dns_ttl",
  Type.Integer({ description: "The TTL of our resolution of your DNS record in seconds.", minimum: 600 }),
)

export const SpectrumConfigOriginDnsType = named(
  "spectrum-config_origin_dns_type",
  Type.Union([Type.Literal(""), Type.Literal("A"), Type.Literal("AAAA"), Type.Literal("SRV")], {
    description:
      'The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.',
  }),
)

export const SpectrumConfigOriginDns = named(
  "spectrum-config_origin_dns",
  Type.Object(
    {
      name: Type.Optional(SpectrumConfigOriginDnsName),
      ttl: Type.Optional(SpectrumConfigDnsTtl),
      type: Type.Optional(SpectrumConfigOriginDnsType),
    },
    { description: "The name and type of DNS record for the Spectrum application." },
  ),
)

export const SpectrumConfigOriginPort = named(
  "spectrum-config_origin_port",
  Type.Union([Type.Integer(), Type.String()], {
    description:
      'The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for example `1000`, or a string to specify a range of origin ports, for example `"1000-2000"`.\nNotes: If specifying a port range, the number of ports in the range must match the number of ports specified in the "protocol" field.',
  }),
)

export const SpectrumConfigProtocol = named(
  "spectrum-config_protocol",
  Type.String({
    description:
      'The port configuration at Cloudflare\'s edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.',
  }),
)

export const SpectrumConfigProxyProtocol = named(
  "spectrum-config_proxy_protocol",
  Type.Union([Type.Literal("off"), Type.Literal("v1"), Type.Literal("v2"), Type.Literal("simple")], {
    description:
      "Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/) for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.",
  }),
)

export const SpectrumConfigTls = named(
  "spectrum-config_tls",
  Type.Union([Type.Literal("off"), Type.Literal("flexible"), Type.Literal("full"), Type.Literal("strict")], {
    description: "The type of TLS termination associated with the application.",
  }),
)

export const SpectrumConfigTrafficType = named(
  "spectrum-config_traffic_type",
  Type.Union([Type.Literal("direct"), Type.Literal("http"), Type.Literal("https")], {
    description:
      'Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the application\'s type is derived from the `protocol`. When set to "http" or "https", Spectrum will apply Cloudflare\'s HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.',
  }),
)

export const SpectrumConfigAppConfig = named(
  "spectrum-config_app_config",
  Type.Object({
    created_on: SpectrumConfigCreated,
    id: SpectrumConfigAppIdentifier,
    modified_on: SpectrumConfigModified,
    argo_smart_routing: Type.Optional(SpectrumConfigArgoSmartRouting),
    dns: SpectrumConfigDns,
    edge_ips: Type.Optional(SpectrumConfigEdgeIps),
    ip_firewall: Type.Optional(SpectrumConfigIpFirewall),
    origin_direct: Type.Optional(SpectrumConfigOriginDirect),
    origin_dns: Type.Optional(SpectrumConfigOriginDns),
    origin_port: Type.Optional(SpectrumConfigOriginPort),
    protocol: SpectrumConfigProtocol,
    proxy_protocol: Type.Optional(SpectrumConfigProxyProtocol),
    tls: Type.Optional(SpectrumConfigTls),
    traffic_type: SpectrumConfigTrafficType,
  }),
)

export const SpectrumConfigPaygoAppConfig = named(
  "spectrum-config_paygo_app_config",
  Type.Object({
    created_on: SpectrumConfigCreated,
    id: SpectrumConfigAppIdentifier,
    modified_on: SpectrumConfigModified,
    dns: SpectrumConfigDns,
    origin_direct: Type.Optional(SpectrumConfigOriginDirect),
    protocol: SpectrumConfigProtocol,
  }),
)

export const SpectrumConfigAppConfigSingle = named(
  "spectrum-config_app_config_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Union([SpectrumConfigAppConfig, SpectrumConfigPaygoAppConfig])),
  }),
)

export const SpectrumConfigUpdateAppConfig = named(
  "spectrum-config_update_app_config",
  Type.Union([SpectrumConfigAppConfig, SpectrumConfigPaygoAppConfig]),
)

export const SpectrumConfigZoneIdentifier = named("spectrum-config_zone_identifier", DlsIdentifier)

export const SpectrumConfigApiResponseCommonFailure = named(
  "spectrum-config_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const SpectrumConfigAppConfigCollection = named(
  "spectrum-config_app_config_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
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
    result: Type.Optional(Type.Union([Type.Array(SpectrumConfigAppConfig), Type.Array(SpectrumConfigPaygoAppConfig)])),
  }),
)

export const SpectrumAnalyticsSince = named("spectrum-analytics_since", DlsTimestamp)

export const SpectrumAnalyticsFilters = named(
  "spectrum-analytics_filters",
  Type.String({
    description:
      "Used to filter rows by one or more dimensions. Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all the expressions. The OR operator is defined using a comma (,) or OR keyword surrounded by whitespace. The AND operator is defined using a semicolon (;) or AND keyword surrounded by whitespace. Note that the semicolon is a reserved character in URLs (rfc1738) and needs to be percent-encoded as %3B. Comparison options are:\n\nOperator                  | Name                            | URL Encoded\n--------------------------|---------------------------------|--------------------------\n==                        | Equals                          | %3D%3D\n!=                        | Does not equals                 | !%3D\n\\>                        | Greater Than                    | %3E\n\\<                        | Less Than                       | %3C\n\\>=                       | Greater than or equal to        | %3E%3D\n\\<=                       | Less than or equal to           | %3C%3D",
  }),
)

export const SpectrumAnalyticsMetrics = named(
  "spectrum-analytics_metrics",
  Type.Array(
    Type.Union([
      Type.Literal("count"),
      Type.Literal("bytesIngress"),
      Type.Literal("bytesEgress"),
      Type.Literal("durationAvg"),
      Type.Literal("durationMedian"),
      Type.Literal("duration90th"),
      Type.Literal("duration99th"),
    ]),
    {
      description:
        "One or more metrics to compute. Options are: \n\nMetric                    | Name                                | Example                  | Unit\n--------------------------|-------------------------------------|--------------------------|--------------------------\ncount                     | Count of total events               | 1000                     | Count\nbytesIngress              | Sum of ingress bytes                | 1000                     | Sum\nbytesEgress               | Sum of egress bytes                 | 1000                     | Sum\ndurationAvg               | Average connection duration         | 1.0                      | Time in milliseconds\ndurationMedian            | Median connection duration          | 1.0                      | Time in milliseconds\nduration90th              | 90th percentile connection duration | 1.0                      | Time in milliseconds\nduration99th              | 99th percentile connection duration | 1.0                      | Time in milliseconds.",
    },
  ),
)

export const SpectrumAnalyticsUntil = named("spectrum-analytics_until", DlsTimestamp)

export const SpectrumAnalyticsSort = named(
  "spectrum-analytics_sort",
  Type.Array(Type.String(), {
    description: "The sort order for the result set; sort fields must be included in `metrics` or `dimensions`.",
  }),
)

export const SpectrumAnalyticsDimensions = named(
  "spectrum-analytics_dimensions",
  Type.Array(
    Type.Union([Type.Literal("event"), Type.Literal("appID"), Type.Literal("coloName"), Type.Literal("ipVersion")]),
    {
      description:
        "Can be used to break down the data by given attributes. Options are: \n\nDimension                 | Name                            | Example\n--------------------------|---------------------------------|--------------------------\nevent                     | Connection Event                | connect, progress, disconnect, originError, clientFiltered\nappID                     | Application ID                  | 40d67c87c6cd4b889a4fd57805225e85\ncoloName                  | Colo Name                       | SFO\nipVersion                 | IP version used by the client   | 4, 6.",
    },
  ),
)

export const SpectrumAnalyticsColumn = named(
  "spectrum-analytics_column",
  Type.Object({
    dimensions: Type.Optional(Type.Array(Type.String())),
    metrics: Type.Optional(Type.Union([Type.Array(Type.Number()), Type.Array(Type.Array(Type.Number()))])),
  }),
)

export const SpectrumAnalyticsStat = named("spectrum-analytics_stat", Type.Record(Type.String(), Type.Number()))

export const SpectrumAnalyticsQuery = named(
  "spectrum-analytics_query",
  Type.Object({
    dimensions: Type.Optional(SpectrumAnalyticsDimensions),
    filters: Type.Optional(SpectrumAnalyticsFilters),
    limit: Type.Optional(Type.Number({ description: "Limit number of returned metrics." })),
    metrics: Type.Optional(SpectrumAnalyticsMetrics),
    since: Type.Optional(SpectrumAnalyticsSince),
    sort: Type.Optional(SpectrumAnalyticsSort),
    until: Type.Optional(SpectrumAnalyticsUntil),
  }),
)

export const SpectrumAnalyticsQueryResponseSingle = named(
  "spectrum-analytics_query-response-single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        data: Type.Array(SpectrumAnalyticsColumn, { description: "List of columns returned by the analytics query." }),
        data_lag: Type.Number({
          description:
            "Number of seconds between current time and last processed event, i.e. how many seconds of data could be missing.",
          minimum: 0,
        }),
        max: SpectrumAnalyticsStat,
        min: SpectrumAnalyticsStat,
        query: SpectrumAnalyticsQuery,
        rows: Type.Number({ description: "Total number of rows in the result.", minimum: 0 }),
        time_intervals: Type.Optional(
          Type.Array(Type.Array(DlsTimestamp), { description: "List of time interval buckets: [start, end]" }),
        ),
        totals: SpectrumAnalyticsStat,
      }),
    ),
  }),
)

export const SpectrumAnalyticsAppIdParam = named(
  "spectrum-analytics_app_id_param",
  Type.String({
    description:
      "Comma-delimited list of Spectrum Application Id(s). If provided, the response will be limited to Spectrum Application Id(s) that match.",
  }),
)

export const SpectrumAnalyticsApiResponseCommonFailure = named(
  "spectrum-analytics_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const SpectrumAnalyticsQueryResponseAggregate = named(
  "spectrum-analytics_query-response-aggregate",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Array(
        Type.Object({
          appID: DlsIdentifier,
          bytesEgress: Type.Number({ description: "Number of bytes sent" }),
          bytesIngress: Type.Number({ description: "Number of bytes received" }),
          connections: Type.Number({ description: "Number of connections" }),
          durationAvg: Type.Number({ description: "Average duration of connections" }),
        }),
      ),
    ),
  }),
)

import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages, MagicIdentifier } from "../shared/schemas"

export const ZonesApiResponseSingleId = named(
  "zones_api-response-single-id",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Union([
        Type.Object({
          id: MagicIdentifier,
        }),
        Type.Null(),
      ]),
    ),
  }),
)

export const ZonesVanityNameServers = named(
  "zones_vanity_name_servers",
  Type.Array(Type.String({ format: "hostname", maxLength: 253 }), {
    description:
      "An array of domains used for custom name servers. This is only\navailable for Business and Enterprise plans.",
  }),
)

export const ZonesPaused = named(
  "zones_paused",
  Type.Boolean({
    description:
      "Indicates whether the zone is only using Cloudflare DNS services. A\ntrue value means the zone will not receive security or performance\nbenefits.\n",
    default: false,
  }),
)

export const ZoneAnalyticsApiBandwidth = named(
  "zone-analytics-api_bandwidth",
  Type.Object(
    {
      all: Type.Optional(Type.Integer({ description: "The total number of bytes served within the time frame." })),
      cached: Type.Optional(
        Type.Integer({ description: "The number of bytes that were cached (and served) by Cloudflare." }),
      ),
      content_type: Type.Optional(
        Type.Unknown({
          description:
            "A variable list of key/value pairs where the key represents the type of content served, and the value is the number in bytes served.",
        }),
      ),
      country: Type.Optional(
        Type.Unknown({
          description:
            "A variable list of key/value pairs where the key is a two-digit country code and the value is the number of bytes served to that country.",
        }),
      ),
      ssl: Type.Optional(
        Type.Object(
          {
            encrypted: Type.Optional(Type.Integer({ description: "The number of bytes served over HTTPS." })),
            unencrypted: Type.Optional(Type.Integer({ description: "The number of bytes served over HTTP." })),
          },
          { description: "A break down of bytes served over HTTPS." },
        ),
      ),
      ssl_protocols: Type.Optional(
        Type.Object(
          {
            TLSv1: Type.Optional(Type.Integer({ description: "The number of requests served over TLS v1.0." })),
            "TLSv1.1": Type.Optional(Type.Integer({ description: "The number of requests served over TLS v1.1." })),
            "TLSv1.2": Type.Optional(Type.Integer({ description: "The number of requests served over TLS v1.2." })),
            "TLSv1.3": Type.Optional(Type.Integer({ description: "The number of requests served over TLS v1.3." })),
            none: Type.Optional(Type.Integer({ description: "The number of requests served over HTTP." })),
          },
          { description: "A breakdown of requests by their SSL protocol." },
        ),
      ),
      uncached: Type.Optional(
        Type.Integer({ description: "The number of bytes that were fetched and served from the origin server." }),
      ),
    },
    { description: "Breakdown of totals for bandwidth in the form of bytes." },
  ),
)

export const ZoneAnalyticsApiPageviews = named(
  "zone-analytics-api_pageviews",
  Type.Object(
    {
      all: Type.Optional(Type.Integer({ description: "The total number of pageviews served within the time range." })),
      search_engine: Type.Optional(
        Type.Unknown({
          description: "A variable list of key/value pairs representing the search engine and number of hits.",
        }),
      ),
    },
    { description: "Breakdown of totals for pageviews." },
  ),
)

export const ZoneAnalyticsApiRequests = named(
  "zone-analytics-api_requests",
  Type.Object(
    {
      all: Type.Optional(Type.Integer({ description: "Total number of requests served." })),
      cached: Type.Optional(Type.Integer({ description: "Total number of cached requests served." })),
      content_type: Type.Optional(
        Type.Unknown({
          description:
            "A variable list of key/value pairs where the key represents the type of content served, and the value is the number of requests.",
        }),
      ),
      country: Type.Optional(
        Type.Unknown({
          description:
            "A variable list of key/value pairs where the key is a two-digit country code and the value is the number of requests served to that country.",
        }),
      ),
      http_status: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
      ssl: Type.Optional(
        Type.Object(
          {
            encrypted: Type.Optional(Type.Integer({ description: "The number of requests served over HTTPS." })),
            unencrypted: Type.Optional(Type.Integer({ description: "The number of requests served over HTTP." })),
          },
          { description: "A break down of requests served over HTTPS." },
        ),
      ),
      ssl_protocols: Type.Optional(
        Type.Object(
          {
            TLSv1: Type.Optional(Type.Integer({ description: "The number of requests served over TLS v1.0." })),
            "TLSv1.1": Type.Optional(Type.Integer({ description: "The number of requests served over TLS v1.1." })),
            "TLSv1.2": Type.Optional(Type.Integer({ description: "The number of requests served over TLS v1.2." })),
            "TLSv1.3": Type.Optional(Type.Integer({ description: "The number of requests served over TLS v1.3." })),
            none: Type.Optional(Type.Integer({ description: "The number of requests served over HTTP." })),
          },
          { description: "A breakdown of requests by their SSL protocol." },
        ),
      ),
      uncached: Type.Optional(Type.Integer({ description: "Total number of requests served from the origin." })),
    },
    { description: "Breakdown of totals for requests." },
  ),
)

export const ZoneAnalyticsApiSince = named(
  "zone-analytics-api_since",
  Type.Union([Type.String(), Type.Integer()], {
    description:
      "The (inclusive) beginning of the requested time frame. This value can be a negative integer representing the number of minutes in the past relative to time the request is made, or can be an absolute timestamp that conforms to RFC 3339. At this point in time, it cannot exceed a time in the past greater than one year.\n\nRanges that the Cloudflare web application provides will provide the following period length for each point:\n- Last 60 minutes (from -59 to -1): 1 minute resolution\n- Last 7 hours (from -419 to -60): 15 minutes resolution\n- Last 15 hours (from -899 to -420): 30 minutes resolution\n- Last 72 hours (from -4320 to -900): 1 hour resolution\n- Older than 3 days (-525600 to -4320): 1 day resolution.",
  }),
)

export const ZoneAnalyticsApiThreats = named(
  "zone-analytics-api_threats",
  Type.Object(
    {
      all: Type.Optional(
        Type.Integer({ description: "The total number of identifiable threats received over the time frame." }),
      ),
      country: Type.Optional(
        Type.Unknown({
          description:
            "A list of key/value pairs where the key is a two-digit country code and the value is the number of malicious requests received from that country.",
        }),
      ),
      type: Type.Optional(
        Type.Unknown({
          description:
            "The list of key/value pairs where the key is a threat category and the value is the number of requests.",
        }),
      ),
    },
    { description: "Breakdown of totals for threats." },
  ),
)

export const ZoneAnalyticsApiUniques = named(
  "zone-analytics-api_uniques",
  Type.Object({
    all: Type.Optional(Type.Integer({ description: "Total number of unique IP addresses within the time range." })),
  }),
)

export const ZoneAnalyticsApiUntil = named(
  "zone-analytics-api_until",
  Type.Union([Type.String(), Type.Integer()], {
    description:
      "The (exclusive) end of the requested time frame. This value can be a negative integer representing the number of minutes in the past relative to time the request is made, or can be an absolute timestamp that conforms to RFC 3339. If omitted, the time of the request is used.",
  }),
)

export const ZoneAnalyticsApiTotals = named(
  "zone-analytics-api_totals",
  Type.Object(
    {
      bandwidth: Type.Optional(ZoneAnalyticsApiBandwidth),
      pageviews: Type.Optional(ZoneAnalyticsApiPageviews),
      requests: Type.Optional(ZoneAnalyticsApiRequests),
      since: Type.Optional(ZoneAnalyticsApiSince),
      threats: Type.Optional(ZoneAnalyticsApiThreats),
      uniques: Type.Optional(ZoneAnalyticsApiUniques),
      until: Type.Optional(ZoneAnalyticsApiUntil),
    },
    { description: "Breakdown of totals by data type." },
  ),
)

export const ZoneAnalyticsApiTimeseries = named(
  "zone-analytics-api_timeseries",
  Type.Array(
    Type.Object({
      bandwidth: Type.Optional(ZoneAnalyticsApiBandwidth),
      pageviews: Type.Optional(ZoneAnalyticsApiPageviews),
      requests: Type.Optional(ZoneAnalyticsApiRequests),
      since: Type.Optional(ZoneAnalyticsApiSince),
      threats: Type.Optional(ZoneAnalyticsApiThreats),
      uniques: Type.Optional(ZoneAnalyticsApiUniques),
      until: Type.Optional(ZoneAnalyticsApiUntil),
    }),
    {
      description:
        "Time deltas containing metadata about each bucket of time. The number of buckets (resolution) is determined by the amount of time between the since and until parameters.",
    },
  ),
)

export const ZoneAnalyticsApiDashboard = named(
  "zone-analytics-api_dashboard",
  Type.Object(
    {
      timeseries: Type.Optional(ZoneAnalyticsApiTimeseries),
      totals: Type.Optional(ZoneAnalyticsApiTotals),
    },
    { description: "Totals and timeseries data." },
  ),
)

export const ZoneAnalyticsApiQueryResponse = named(
  "zone-analytics-api_query_response",
  Type.Object(
    {
      since: Type.Optional(ZoneAnalyticsApiSince),
      time_delta: Type.Optional(
        Type.Integer({
          description:
            "The amount of time (in minutes) that each data point in the timeseries represents. The granularity of the time-series returned (e.g. each bucket in the time series representing 1-minute vs 1-day) is calculated by the API based on the time-range provided to the API.",
        }),
      ),
      until: Type.Optional(ZoneAnalyticsApiUntil),
    },
    { description: "The exact parameters/timestamps the analytics service used to return data." },
  ),
)

export const ZoneAnalyticsApiDashboardResponse = named(
  "zone-analytics-api_dashboard_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: ZoneAnalyticsApiDashboard,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    query: Type.Optional(ZoneAnalyticsApiQueryResponse),
  }),
)

export const ZoneAnalyticsApiBandwidthByColo = named(
  "zone-analytics-api_bandwidth_by_colo",
  Type.Object(
    {
      all: Type.Optional(Type.Integer({ description: "The total number of bytes served within the time frame." })),
      cached: Type.Optional(
        Type.Integer({ description: "The number of bytes that were cached (and served) by Cloudflare." }),
      ),
      uncached: Type.Optional(
        Type.Integer({ description: "The number of bytes that were fetched and served from the origin server." }),
      ),
    },
    { description: "Breakdown of totals for bandwidth in the form of bytes." },
  ),
)

export const ZoneAnalyticsApiRequestsByColo = named(
  "zone-analytics-api_requests_by_colo",
  Type.Object(
    {
      all: Type.Optional(Type.Integer({ description: "Total number of requests served." })),
      cached: Type.Optional(Type.Integer({ description: "Total number of cached requests served." })),
      country: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
      http_status: Type.Optional(
        Type.Unknown({
          description:
            "A variable list of key/value pairs where the key is a HTTP status code and the value is the number of requests with that code served.",
        }),
      ),
      uncached: Type.Optional(Type.Integer({ description: "Total number of requests served from the origin." })),
    },
    { description: "Breakdown of totals for requests." },
  ),
)

export const ZoneAnalyticsApiTotalsByColo = named(
  "zone-analytics-api_totals_by_colo",
  Type.Object(
    {
      bandwidth: Type.Optional(ZoneAnalyticsApiBandwidthByColo),
      requests: Type.Optional(ZoneAnalyticsApiRequestsByColo),
      since: Type.Optional(ZoneAnalyticsApiSince),
      threats: Type.Optional(ZoneAnalyticsApiThreats),
      until: Type.Optional(ZoneAnalyticsApiUntil),
    },
    { description: "Breakdown of totals by data type." },
  ),
)

export const ZoneAnalyticsApiTimeseriesByColo = named(
  "zone-analytics-api_timeseries_by_colo",
  Type.Array(
    Type.Object({
      bandwidth: Type.Optional(ZoneAnalyticsApiBandwidthByColo),
      requests: Type.Optional(ZoneAnalyticsApiRequestsByColo),
      since: Type.Optional(ZoneAnalyticsApiSince),
      threats: Type.Optional(ZoneAnalyticsApiThreats),
      until: Type.Optional(ZoneAnalyticsApiUntil),
    }),
    {
      description:
        "Time deltas containing metadata about each bucket of time. The number of buckets (resolution) is determined by the amount of time between the since and until parameters.",
    },
  ),
)

export const ZoneAnalyticsApiDatacenters = named(
  "zone-analytics-api_datacenters",
  Type.Array(
    Type.Object({
      colo_id: Type.Optional(Type.String({ description: "The airport code identifer for the co-location." })),
      timeseries: Type.Optional(ZoneAnalyticsApiTimeseriesByColo),
      totals: Type.Optional(ZoneAnalyticsApiTotalsByColo),
    }),
    {
      description:
        "A breakdown of all dashboard analytics data by co-locations. This is limited to Enterprise zones only.",
      title: "Analytics data by datacenter",
    },
  ),
)

export const ZoneAnalyticsApiColoResponse = named(
  "zone-analytics-api_colo_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: ZoneAnalyticsApiDatacenters,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    query: Type.Optional(ZoneAnalyticsApiQueryResponse),
  }),
)

export const ZonesType = named(
  "zones_type",
  Type.Union([Type.Literal("full"), Type.Literal("partial"), Type.Literal("secondary"), Type.Literal("internal")], {
    description:
      "A full zone implies that DNS is hosted with Cloudflare. A partial zone is\ntypically a partner-hosted zone or a CNAME setup.\n",
  }),
)

export const ZonesName = named("zones_name", Type.String({ description: "The domain name.", maxLength: 253 }))

export const ZonesApiResponseCommonFailure = named(
  "zones_api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Unknown(), Type.Null()]),
    success: Type.Boolean({ description: "Whether the API call was successful." }),
  }),
)

export const ZonesZone = named(
  "zones_zone",
  Type.Object({
    account: Type.Object(
      {
        id: Type.Optional(MagicIdentifier),
        name: Type.Optional(Type.String({ description: "The name of the account." })),
      },
      { description: "The account the zone belongs to." },
    ),
    activated_on: Type.Union([
      Type.String({
        description: "The last time proof of ownership was detected and the zone was made\nactive.",
        format: "date-time",
        readOnly: true,
      }),
      Type.Null(),
    ]),
    cname_suffix: Type.Optional(
      Type.String({ description: "Allows the customer to use a custom apex.\n*Tenants Only Configuration*." }),
    ),
    created_on: Type.String({ description: "When the zone was created.", format: "date-time", readOnly: true }),
    development_mode: Type.Number({
      description:
        "The interval (in seconds) from when development mode expires\n(positive integer) or last expired (negative integer) for the\ndomain. If development mode has never been enabled, this value is 0.",
      readOnly: true,
    }),
    id: MagicIdentifier,
    meta: Type.Object(
      {
        cdn_only: Type.Optional(Type.Boolean({ description: "The zone is only configured for CDN." })),
        custom_certificate_quota: Type.Optional(
          Type.Integer({ description: "Number of Custom Certificates the zone can have." }),
        ),
        dns_only: Type.Optional(Type.Boolean({ description: "The zone is only configured for DNS." })),
        foundation_dns: Type.Optional(Type.Boolean({ description: "The zone is setup with Foundation DNS." })),
        page_rule_quota: Type.Optional(Type.Integer({ description: "Number of Page Rules a zone can have." })),
        phishing_detected: Type.Optional(Type.Boolean({ description: "The zone has been flagged for phishing." })),
        step: Type.Optional(Type.Integer()),
      },
      { description: "Metadata about the zone." },
    ),
    modified_on: Type.String({ description: "When the zone was last modified.", format: "date-time", readOnly: true }),
    name: Type.String({ description: "The domain name.", maxLength: 253 }),
    name_servers: Type.Array(Type.String({ format: "hostname" }), {
      description: "The name servers Cloudflare assigns to a zone.",
      readOnly: true,
    }),
    original_dnshost: Type.Union([
      Type.String({ description: "DNS host at the time of switching to Cloudflare.", maxLength: 50, readOnly: true }),
      Type.Null(),
    ]),
    original_name_servers: Type.Union([
      Type.Array(Type.String({ format: "hostname" }), {
        description: "Original name servers before moving to Cloudflare.",
        readOnly: true,
      }),
      Type.Null(),
    ]),
    original_registrar: Type.Union([
      Type.String({ description: "Registrar for the domain at the time of switching to Cloudflare.", readOnly: true }),
      Type.Null(),
    ]),
    owner: Type.Object(
      {
        id: Type.Optional(MagicIdentifier),
        name: Type.Optional(Type.String({ description: "Name of the owner." })),
        type: Type.Optional(Type.String({ description: "The type of owner." })),
      },
      { description: "The owner of the zone." },
    ),
    paused: Type.Optional(ZonesPaused),
    permissions: Type.Optional(
      Type.Array(Type.String(), {
        description: "Legacy permissions based on legacy user membership information.",
        deprecated: true,
        "x-stainless-deprecation-message": "This has been replaced by Account memberships.",
      }),
    ),
    plan: Type.Object(
      {
        can_subscribe: Type.Optional(Type.Boolean({ description: "States if the subscription can be activated." })),
        currency: Type.Optional(Type.String({ description: "The denomination of the customer." })),
        externally_managed: Type.Optional(Type.Boolean({ description: "If this Zone is managed by another company." })),
        frequency: Type.Optional(Type.String({ description: "How often the customer is billed." })),
        id: Type.Optional(MagicIdentifier),
        is_subscribed: Type.Optional(Type.Boolean({ description: "States if the subscription active." })),
        legacy_discount: Type.Optional(Type.Boolean({ description: "If the legacy discount applies to this Zone." })),
        legacy_id: Type.Optional(Type.String({ description: "The legacy name of the plan." })),
        name: Type.Optional(Type.String({ description: "Name of the owner." })),
        price: Type.Optional(Type.Number({ description: "How much the customer is paying." })),
      },
      {
        description: "A Zones subscription information.",
        "x-stainless-deprecation-message":
          "Please use the `/zones/{zone_id}/subscription` API\nto update a zone's plan. Changing this value will create/cancel\nassociated subscriptions. To view available plans for this zone,\nsee [Zone Plans](https://developers.cloudflare.com/api/resources/zones/subresources/plans/).",
      },
    ),
    status: Type.Optional(
      Type.Union(
        [Type.Literal("initializing"), Type.Literal("pending"), Type.Literal("active"), Type.Literal("moved")],
        { description: "The zone status on Cloudflare." },
      ),
    ),
    tenant: Type.Optional(
      Type.Object(
        {
          id: Type.Optional(MagicIdentifier),
          name: Type.Optional(Type.String({ description: "The name of the Tenant account." })),
        },
        { description: "The root organizational unit that this zone belongs to (such as a tenant or organization)." },
      ),
    ),
    tenant_unit: Type.Optional(
      Type.Object(
        {
          id: Type.Optional(MagicIdentifier),
        },
        {
          description:
            "The immediate parent organizational unit that this zone belongs to (such as under a tenant or sub-organization).",
        },
      ),
    ),
    type: Type.Optional(ZonesType),
    vanity_name_servers: Type.Optional(
      Type.Array(Type.String({ format: "hostname", maxLength: 253 }), {
        description:
          "An array of domains used for custom name servers. This is only available for Business and Enterprise plans.",
      }),
    ),
    verification_key: Type.Optional(
      Type.String({ description: "Verification key for partial zone setup.", readOnly: true }),
    ),
  }),
)

export const ZonesResultInfo = named(
  "zones_result_info",
  Type.Object({
    count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
    page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
    per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
    total_count: Type.Optional(Type.Number({ description: "Total results available without any search parameters." })),
    total_pages: Type.Optional(Type.Number({ description: "Total number of pages" })),
  }),
)

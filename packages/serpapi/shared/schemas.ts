import { Type } from "@sinclair/typebox"
import { named } from "spac"

// ── Common response schemas ──────────────────────────────────────────

export const SearchMetadata = named(
  "SearchMetadata",
  Type.Object({
    id: Type.String({ description: "Unique search identifier" }),
    status: Type.Union([Type.Literal("Queued"), Type.Literal("Processing"), Type.Literal("Success"), Type.Literal("Error")], {
      description: "Search progression state",
    }),
    json_endpoint: Type.Optional(Type.String({ description: "URL to fetch JSON results", format: "uri" })),
    created_at: Type.Optional(Type.String({ description: "Timestamp when the search was created" })),
    processed_at: Type.Optional(Type.String({ description: "Timestamp when the search was processed" })),
    total_time_taken: Type.Optional(Type.Number({ description: "Total processing time in seconds" })),
    google_url: Type.Optional(Type.String({ description: "Direct URL to the search engine results page", format: "uri" })),
    raw_html_file: Type.Optional(Type.String({ description: "URL to the raw HTML file", format: "uri" })),
  }),
)

export const SearchParameters = named(
  "SearchParameters",
  Type.Object(
    { engine: Type.String({ description: "The search engine used" }) },
    { additionalProperties: true, description: "Echo of the submitted search parameters" },
  ),
)

export const SerpApiError = named(
  "SerpApiError",
  Type.Object({
    error: Type.String({ description: "Error message describing what went wrong" }),
  }),
)

// ── Account schemas ──────────────────────────────────────────────────

export const AccountInfo = named(
  "AccountInfo",
  Type.Object({
    account_id: Type.String({ description: "Unique account identifier" }),
    api_key: Type.String({ description: "Your API key" }),
    account_email: Type.String({ description: "Email associated with the account", format: "email" }),
    plan_id: Type.String({ description: "Plan identifier (e.g., 'bigdata')" }),
    plan_name: Type.String({ description: "Human-readable plan name (e.g., 'Big Data Plan')" }),
    plan_monthly_price: Type.Number({ description: "Monthly subscription cost in USD" }),
    plan_next_renewal_date: Type.Optional(Type.String({ description: "Next billing date (YYYY-MM-DD)", format: "date" })),
    searches_per_month: Type.Integer({ description: "Plan's monthly search allocation" }),
    plan_searches_left: Type.Integer({ description: "Remaining searches from plan quota" }),
    extra_credits: Type.Integer({ description: "Additional purchased credits" }),
    total_searches_left: Type.Integer({ description: "Combined remaining quota (plan + extra credits)" }),
    this_month_usage: Type.Integer({ description: "Number of searches consumed this month" }),
    last_hour_searches: Type.Integer({ description: "Number of queries in the previous hour" }),
    account_rate_limit_per_hour: Type.Integer({ description: "Maximum queries allowed per hour" }),
  }),
)

// ── Location schemas ─────────────────────────────────────────────────

export const LocationResult = named(
  "LocationResult",
  Type.Object({
    id: Type.String({ description: "Location identifier" }),
    name: Type.String({ description: "Location name" }),
    canonical_name: Type.String({ description: "Canonical location name (e.g., 'Austin,Texas,United States')" }),
    country_code: Type.String({ description: "Two-letter country code" }),
    target_type: Type.String({ description: "Location target type (e.g., 'DMA Region', 'City', 'Country')" }),
    reach: Type.Optional(Type.Integer({ description: "Approximate reach of this location" })),
    gps: Type.Optional(Type.Array(Type.Number(), { description: "GPS coordinates [latitude, longitude]" })),
    keys: Type.Optional(
      Type.Object(
        {
          google: Type.Optional(Type.String({ description: "Google-encoded location string" })),
          bing: Type.Optional(Type.String({ description: "Bing-encoded location string" })),
          yandex: Type.Optional(Type.String({ description: "Yandex-encoded location string" })),
          baidu: Type.Optional(Type.String({ description: "Baidu-encoded location string" })),
        },
        { additionalProperties: true, description: "Engine-specific location keys" },
      ),
    ),
  }),
)

// ── Search archive schemas ───────────────────────────────────────────

export const SearchArchiveResult = named(
  "SearchArchiveResult",
  Type.Object(
    {
      search_metadata: SearchMetadata,
      search_parameters: SearchParameters,
    },
    { additionalProperties: true, description: "Archived search results — full response varies by engine" },
  ),
)

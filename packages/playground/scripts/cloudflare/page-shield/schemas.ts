import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages, PageShieldId } from "../shared/schemas"

export const PageShieldCryptominingScore = named(
  "page-shield_cryptomining_score",
  Type.Union([
    Type.Integer({ description: "The cryptomining score of the JavaScript content.", minimum: 1, maximum: 99 }),
    Type.Null(),
  ]),
)

export const PageShieldDataflowScore = named(
  "page-shield_dataflow_score",
  Type.Union([
    Type.Integer({ description: "The dataflow score of the JavaScript content.", minimum: 1, maximum: 99 }),
    Type.Null(),
  ]),
)

export const PageShieldFetchedAt = named(
  "page-shield_fetched_at",
  Type.Union([Type.String({ description: "The timestamp of when the script was last fetched." }), Type.Null()]),
)

export const PageShieldHash = named(
  "page-shield_hash",
  Type.Union([
    Type.String({ description: "The computed hash of the analyzed script.", minLength: 64, maxLength: 64 }),
    Type.Null(),
  ]),
)

export const PageShieldJsIntegrityScore = named(
  "page-shield_js_integrity_score",
  Type.Union([
    Type.Integer({ description: "The integrity score of the JavaScript content.", minimum: 1, maximum: 99 }),
    Type.Null(),
  ]),
)

export const PageShieldMagecartScore = named(
  "page-shield_magecart_score",
  Type.Union([
    Type.Integer({ description: "The magecart score of the JavaScript content.", minimum: 1, maximum: 99 }),
    Type.Null(),
  ]),
)

export const PageShieldMalwareScore = named(
  "page-shield_malware_score",
  Type.Union([
    Type.Integer({ description: "The malware score of the JavaScript content.", minimum: 1, maximum: 99 }),
    Type.Null(),
  ]),
)

export const PageShieldObfuscationScore = named(
  "page-shield_obfuscation_score",
  Type.Union([
    Type.Integer({ description: "The obfuscation score of the JavaScript content.", minimum: 1, maximum: 99 }),
    Type.Null(),
  ]),
)

export const PageShieldVersion = named(
  "page-shield_version",
  Type.Object(
    {
      cryptomining_score: Type.Optional(PageShieldCryptominingScore),
      dataflow_score: Type.Optional(PageShieldDataflowScore),
      fetched_at: Type.Optional(PageShieldFetchedAt),
      hash: Type.Optional(PageShieldHash),
      js_integrity_score: Type.Optional(PageShieldJsIntegrityScore),
      magecart_score: Type.Optional(PageShieldMagecartScore),
      malware_score: Type.Optional(PageShieldMalwareScore),
      obfuscation_score: Type.Optional(PageShieldObfuscationScore),
    },
    { description: "The version of the analyzed script." },
  ),
)

export const PageShieldGetZoneScriptResponse = named(
  "page-shield_get-zone-script-response",
  Type.Object({
    errors: Type.Optional(D1Messages),
    messages: Type.Optional(D1Messages),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result: Type.Object({
      added_at: Type.String({ format: "date-time" }),
      cryptomining_score: Type.Optional(PageShieldCryptominingScore),
      dataflow_score: Type.Optional(PageShieldDataflowScore),
      domain_reported_malicious: Type.Optional(Type.Boolean()),
      fetched_at: Type.Optional(PageShieldFetchedAt),
      first_page_url: Type.Optional(Type.String()),
      first_seen_at: Type.String({ format: "date-time" }),
      hash: Type.Optional(PageShieldHash),
      host: Type.String(),
      id: PageShieldId,
      js_integrity_score: Type.Optional(PageShieldJsIntegrityScore),
      last_seen_at: Type.String({ format: "date-time" }),
      magecart_score: Type.Optional(PageShieldMagecartScore),
      malicious_domain_categories: Type.Optional(Type.Array(Type.String())),
      malicious_url_categories: Type.Optional(Type.Array(Type.String())),
      malware_score: Type.Optional(PageShieldMalwareScore),
      obfuscation_score: Type.Optional(PageShieldObfuscationScore),
      page_urls: Type.Optional(Type.Array(Type.String())),
      url: Type.String(),
      url_contains_cdn_cgi_path: Type.Boolean(),
      url_reported_malicious: Type.Optional(Type.Boolean()),
      versions: Type.Optional(Type.Union([Type.Array(PageShieldVersion), Type.Null()])),
    }),
  }),
)

export const PageShieldResultInfo = named(
  "page-shield_result_info",
  Type.Object({
    count: Type.Number({ description: "Total number of results for the requested service" }),
    page: Type.Number({ description: "Current page within paginated list of results" }),
    per_page: Type.Number({ description: "Number of results per page of results" }),
    total_count: Type.Number({ description: "Total results available without any search parameters" }),
    total_pages: Type.Number({ description: "Total number of pages" }),
  }),
)

export const PageShieldScript = named(
  "page-shield_script",
  Type.Object({
    added_at: Type.String({ format: "date-time" }),
    cryptomining_score: Type.Optional(PageShieldCryptominingScore),
    dataflow_score: Type.Optional(PageShieldDataflowScore),
    domain_reported_malicious: Type.Optional(Type.Boolean()),
    fetched_at: Type.Optional(PageShieldFetchedAt),
    first_page_url: Type.Optional(Type.String()),
    first_seen_at: Type.String({ format: "date-time" }),
    hash: Type.Optional(PageShieldHash),
    host: Type.String(),
    id: PageShieldId,
    js_integrity_score: Type.Optional(PageShieldJsIntegrityScore),
    last_seen_at: Type.String({ format: "date-time" }),
    magecart_score: Type.Optional(PageShieldMagecartScore),
    malicious_domain_categories: Type.Optional(Type.Array(Type.String())),
    malicious_url_categories: Type.Optional(Type.Array(Type.String())),
    malware_score: Type.Optional(PageShieldMalwareScore),
    obfuscation_score: Type.Optional(PageShieldObfuscationScore),
    page_urls: Type.Optional(Type.Array(Type.String())),
    url: Type.String(),
    url_contains_cdn_cgi_path: Type.Boolean(),
    url_reported_malicious: Type.Optional(Type.Boolean()),
  }),
)

export const PageShieldListZoneScriptsResponse = named(
  "page-shield_list-zone-scripts-response",
  Type.Object({
    errors: Type.Optional(D1Messages),
    messages: Type.Optional(D1Messages),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: PageShieldResultInfo,
    result: Type.Array(PageShieldScript),
  }),
)

export const PageShieldPolicyValue = named(
  "page-shield_policy-value",
  Type.String({ description: "The policy which will be applied", "x-auditable": true }),
)

export const PageShieldPolicyExpression = named(
  "page-shield_policy-expression",
  Type.String({
    description:
      "The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax",
    "x-auditable": true,
  }),
)

export const PageShieldPolicyEnabled = named(
  "page-shield_policy-enabled",
  Type.Boolean({ description: "Whether the policy is enabled", "x-auditable": true }),
)

export const PageShieldPolicyDescription = named(
  "page-shield_policy-description",
  Type.String({ description: "A description for the policy", "x-auditable": true }),
)

export const PageShieldPolicyAction = named(
  "page-shield_policy-action",
  Type.Union([Type.Literal("allow"), Type.Literal("log")], {
    description: "The action to take if the expression matches",
    "x-auditable": true,
  }),
)

export const PageShieldPolicyWithId = named(
  "page-shield_policy-with-id",
  Type.Object({
    action: PageShieldPolicyAction,
    description: PageShieldPolicyDescription,
    enabled: PageShieldPolicyEnabled,
    expression: PageShieldPolicyExpression,
    value: PageShieldPolicyValue,
    id: PageShieldId,
  }),
)

export const PageShieldGetZonePolicyResponse = named(
  "page-shield_get-zone-policy-response",
  Type.Object({
    errors: Type.Optional(D1Messages),
    messages: Type.Optional(D1Messages),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result: PageShieldPolicyWithId,
  }),
)

export const PageShieldPolicy = named(
  "page-shield_policy",
  Type.Object({
    action: PageShieldPolicyAction,
    description: PageShieldPolicyDescription,
    enabled: PageShieldPolicyEnabled,
    expression: PageShieldPolicyExpression,
    value: PageShieldPolicyValue,
  }),
)

export const PageShieldListZonePoliciesResponse = named(
  "page-shield_list-zone-policies-response",
  Type.Object({
    errors: Type.Optional(D1Messages),
    messages: Type.Optional(D1Messages),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: PageShieldResultInfo,
    result: Type.Array(PageShieldPolicyWithId),
  }),
)

export const PageShieldCookie = named(
  "page-shield_cookie",
  Type.Object({
    domain_attribute: Type.Optional(Type.String()),
    expires_attribute: Type.Optional(Type.String({ format: "date-time" })),
    first_seen_at: Type.String({ format: "date-time" }),
    host: Type.String(),
    http_only_attribute: Type.Optional(Type.Boolean()),
    id: PageShieldId,
    last_seen_at: Type.String({ format: "date-time" }),
    max_age_attribute: Type.Optional(Type.Integer()),
    name: Type.String(),
    page_urls: Type.Optional(Type.Array(Type.String())),
    path_attribute: Type.Optional(Type.String()),
    same_site_attribute: Type.Optional(Type.Union([Type.Literal("lax"), Type.Literal("strict"), Type.Literal("none")])),
    secure_attribute: Type.Optional(Type.Boolean()),
    type: Type.Union([Type.Literal("first_party"), Type.Literal("unknown")]),
  }),
)

export const PageShieldGetZoneCookieResponse = named(
  "page-shield_get-zone-cookie-response",
  Type.Object({
    errors: Type.Optional(D1Messages),
    messages: Type.Optional(D1Messages),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result: PageShieldCookie,
  }),
)

export const PageShieldListZoneCookiesResponse = named(
  "page-shield_list-zone-cookies-response",
  Type.Object({
    errors: Type.Optional(D1Messages),
    messages: Type.Optional(D1Messages),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: PageShieldResultInfo,
    result: Type.Array(PageShieldCookie),
  }),
)

export const PageShieldConnection = named(
  "page-shield_connection",
  Type.Object({
    added_at: Type.String({ format: "date-time" }),
    domain_reported_malicious: Type.Optional(Type.Boolean()),
    first_page_url: Type.Optional(Type.String()),
    first_seen_at: Type.String({ format: "date-time" }),
    host: Type.String(),
    id: PageShieldId,
    last_seen_at: Type.String({ format: "date-time" }),
    malicious_domain_categories: Type.Optional(Type.Array(Type.String())),
    malicious_url_categories: Type.Optional(Type.Array(Type.String())),
    page_urls: Type.Optional(Type.Array(Type.String())),
    url: Type.String(),
    url_contains_cdn_cgi_path: Type.Boolean(),
    url_reported_malicious: Type.Optional(Type.Boolean()),
  }),
)

export const PageShieldGetZoneConnectionResponse = named(
  "page-shield_get-zone-connection-response",
  Type.Object({
    errors: Type.Optional(D1Messages),
    messages: Type.Optional(D1Messages),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result: PageShieldConnection,
  }),
)

export const PageShieldListZoneConnectionsResponse = named(
  "page-shield_list-zone-connections-response",
  Type.Object({
    errors: Type.Optional(D1Messages),
    messages: Type.Optional(D1Messages),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: PageShieldResultInfo,
    result: Type.Optional(Type.Array(PageShieldConnection)),
  }),
)

export const PageShieldUseConnectionUrlPath = named(
  "page-shield_use_connection_url_path",
  Type.Boolean({
    description: "When true, the paths associated with connections URLs will also be analyzed.",
    "x-auditable": true,
  }),
)

export const PageShieldUseCloudflareReportingEndpoint = named(
  "page-shield_use_cloudflare_reporting_endpoint",
  Type.Boolean({
    description:
      "When true, CSP reports will be sent to https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report",
    "x-auditable": true,
  }),
)

export const PageShieldUpdatedAt = named(
  "page-shield_updated_at",
  Type.String({ description: "The timestamp of when Page Shield was last updated.", "x-auditable": true }),
)

export const PageShieldEnabled = named(
  "page-shield_enabled",
  Type.Boolean({ description: "When true, indicates that Page Shield is enabled.", "x-auditable": true }),
)

export const PageShieldApiResponseCommonFailure = named(
  "page-shield_api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: Type.Optional(D1Messages),
    result: Type.Optional(Type.Union([Type.Null()])),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful" }),
  }),
)

export const PageShieldGetZoneSettingsResponse = named(
  "page-shield_get-zone-settings-response",
  Type.Object({
    enabled: PageShieldEnabled,
    updated_at: PageShieldUpdatedAt,
    use_cloudflare_reporting_endpoint: PageShieldUseCloudflareReportingEndpoint,
    use_connection_url_path: PageShieldUseConnectionUrlPath,
  }),
)

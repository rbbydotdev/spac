import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"

export const DnsSettingsFlattenAllCnames = named(
  "dns-settings_flatten_all_cnames",
  Type.Boolean({
    description:
      "Whether to flatten all CNAME records in the zone. Note that, due to DNS limitations, a CNAME record at the zone apex will always be flattened.",
    "x-auditable": true,
  }),
)

export const DnsSettingsFoundationDns = named(
  "dns-settings_foundation_dns",
  Type.Boolean({
    description: "Whether to enable Foundation DNS Advanced Nameservers on the zone.",
    "x-auditable": true,
  }),
)

export const DnsSettingsInternalDnsBase = named(
  "dns-settings_internal_dns_base",
  Type.Object(
    {
      reference_zone_id: Type.Optional(Type.String({ description: "The ID of the zone to fallback to." })),
    },
    { description: "Settings for this internal zone." },
  ),
)

export const DnsSettingsMultiProvider = named(
  "dns-settings_multi_provider",
  Type.Boolean({
    description:
      "Whether to enable multi-provider DNS, which causes Cloudflare to activate the zone even when non-Cloudflare NS records exist, and to respect NS records at the zone apex during outbound zone transfers.",
    "x-auditable": true,
  }),
)

export const DnsSettingsNsTtl = named(
  "dns-settings_ns_ttl",
  Type.Number({
    description: "The time to live (TTL) of the zone's nameserver (NS) records.",
    minimum: 30,
    maximum: 86400,
    "x-auditable": true,
  }),
)

export const DnsSettingsSecondaryOverrides = named(
  "dns-settings_secondary_overrides",
  Type.Boolean({
    description: "Allows a Secondary DNS zone to use (proxied) override records and CNAME flattening at the zone apex.",
    "x-auditable": true,
  }),
)

export const DnsSettingsSoaBase = named(
  "dns-settings_soa-base",
  Type.Object(
    {
      expire: Type.Optional(
        Type.Number({
          description:
            "Time in seconds of being unable to query the primary server after which secondary servers should stop serving the zone.",
          minimum: 86400,
          maximum: 2419200,
          "x-auditable": true,
        }),
      ),
      min_ttl: Type.Optional(
        Type.Number({
          description: "The time to live (TTL) for negative caching of records within the zone.",
          minimum: 60,
          maximum: 86400,
          "x-auditable": true,
        }),
      ),
      mname: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The primary nameserver, which may be used for outbound zone transfers. If null, a Cloudflare-assigned value will be used.",
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      refresh: Type.Optional(
        Type.Number({
          description:
            "Time in seconds after which secondary servers should re-check the SOA record to see if the zone has been updated.",
          minimum: 600,
          maximum: 86400,
          "x-auditable": true,
        }),
      ),
      retry: Type.Optional(
        Type.Number({
          description:
            "Time in seconds after which secondary servers should retry queries after the primary server was unresponsive.",
          minimum: 600,
          maximum: 86400,
          "x-auditable": true,
        }),
      ),
      rname: Type.Optional(
        Type.String({
          description:
            "The email address of the zone administrator, with the first label representing the local part of the email address.",
          "x-auditable": true,
        }),
      ),
      ttl: Type.Optional(
        Type.Number({
          description: "The time to live (TTL) of the SOA record itself.",
          minimum: 300,
          maximum: 86400,
          "x-auditable": true,
        }),
      ),
    },
    { description: "Components of the zone's SOA record." },
  ),
)

export const DnsSettingsZoneMode = named(
  "dns-settings_zone_mode",
  Type.Union([Type.Literal("standard"), Type.Literal("cdn_only"), Type.Literal("dns_only")], {
    description: "Whether the zone mode is a regular or CDN/DNS only zone.",
    "x-auditable": true,
  }),
)

export const DnsSettingsDnsSettingsZonePatch = named(
  "dns-settings_dns-settings-zone-patch",
  Type.Object({
    flatten_all_cnames: Type.Optional(DnsSettingsFlattenAllCnames),
    foundation_dns: Type.Optional(DnsSettingsFoundationDns),
    internal_dns: Type.Optional(DnsSettingsInternalDnsBase),
    multi_provider: Type.Optional(DnsSettingsMultiProvider),
    ns_ttl: Type.Optional(DnsSettingsNsTtl),
    secondary_overrides: Type.Optional(DnsSettingsSecondaryOverrides),
    soa: Type.Optional(DnsSettingsSoaBase),
    zone_mode: Type.Optional(DnsSettingsZoneMode),
    nameservers: Type.Optional(
      Type.Object(
        {
          ns_set: Type.Optional(
            Type.Integer({
              description: "Configured nameserver set to be used for this zone",
              minimum: 1,
              maximum: 5,
              "x-auditable": true,
            }),
          ),
          type: Type.Optional(
            Type.Union(
              [
                Type.Literal("cloudflare.standard"),
                Type.Literal("custom.account"),
                Type.Literal("custom.tenant"),
                Type.Literal("custom.zone"),
              ],
              { description: "Nameserver type", "x-auditable": true },
            ),
          ),
        },
        { description: "Settings determining the nameservers through which the zone should be available." },
      ),
    ),
  }),
)

export const DnsSettingsDnsSettingsZoneResponse = named(
  "dns-settings_dns-settings-zone-response",
  Type.Object({
    flatten_all_cnames: DnsSettingsFlattenAllCnames,
    foundation_dns: DnsSettingsFoundationDns,
    internal_dns: Type.Object(
      {
        reference_zone_id: Type.Optional(Type.String({ description: "The ID of the zone to fallback to." })),
      },
      { description: "Settings for this internal zone." },
    ),
    multi_provider: DnsSettingsMultiProvider,
    ns_ttl: DnsSettingsNsTtl,
    secondary_overrides: DnsSettingsSecondaryOverrides,
    soa: Type.Object(
      {
        expire: Type.Optional(
          Type.Number({
            description:
              "Time in seconds of being unable to query the primary server after which secondary servers should stop serving the zone.",
            minimum: 86400,
            maximum: 2419200,
            "x-auditable": true,
          }),
        ),
        min_ttl: Type.Optional(
          Type.Number({
            description: "The time to live (TTL) for negative caching of records within the zone.",
            minimum: 60,
            maximum: 86400,
            "x-auditable": true,
          }),
        ),
        mname: Type.Optional(
          Type.Union([
            Type.String({
              description:
                "The primary nameserver, which may be used for outbound zone transfers. If null, a Cloudflare-assigned value will be used.",
              "x-auditable": true,
            }),
            Type.Null(),
          ]),
        ),
        refresh: Type.Optional(
          Type.Number({
            description:
              "Time in seconds after which secondary servers should re-check the SOA record to see if the zone has been updated.",
            minimum: 600,
            maximum: 86400,
            "x-auditable": true,
          }),
        ),
        retry: Type.Optional(
          Type.Number({
            description:
              "Time in seconds after which secondary servers should retry queries after the primary server was unresponsive.",
            minimum: 600,
            maximum: 86400,
            "x-auditable": true,
          }),
        ),
        rname: Type.Optional(
          Type.String({
            description:
              "The email address of the zone administrator, with the first label representing the local part of the email address.",
            "x-auditable": true,
          }),
        ),
        ttl: Type.Optional(
          Type.Number({
            description: "The time to live (TTL) of the SOA record itself.",
            minimum: 300,
            maximum: 86400,
            "x-auditable": true,
          }),
        ),
      },
      { description: "Components of the zone's SOA record." },
    ),
    zone_mode: DnsSettingsZoneMode,
    nameservers: Type.Object(
      {
        ns_set: Type.Optional(
          Type.Integer({
            description: "Configured nameserver set to be used for this zone",
            minimum: 1,
            maximum: 5,
            "x-auditable": true,
          }),
        ),
        type: Type.Union(
          [
            Type.Literal("cloudflare.standard"),
            Type.Literal("custom.account"),
            Type.Literal("custom.tenant"),
            Type.Literal("custom.zone"),
          ],
          { description: "Nameserver type", "x-auditable": true },
        ),
      },
      { description: "Settings determining the nameservers through which the zone should be available." },
    ),
  }),
)

export const DnsSettingsSchemasDnsResponseSingle = named(
  "dns-settings_schemas-dns_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DnsSettingsDnsSettingsZoneResponse),
  }),
)

export const DnsSettingsCreatedTime = named(
  "dns-settings_created_time",
  Type.String({ description: "When the view was created.", format: "date-time", readOnly: true, "x-auditable": true }),
)

export const DnsSettingsModifiedTime = named(
  "dns-settings_modified_time",
  Type.String({
    description: "When the view was last modified.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const DnsSettingsName = named(
  "dns-settings_name",
  Type.String({ description: "The name of the view.", minLength: 1, maxLength: 255, "x-auditable": true }),
)

export const DnsSettingsZones = named(
  "dns-settings_zones",
  Type.Array(Type.String({ description: "The zone ID.", minLength: 32, maxLength: 32, "x-auditable": true }), {
    description: "The list of zones linked to this view.",
    "x-stainless-collection-type": "set",
  }),
)

export const DnsSettingsDnsView = named(
  "dns-settings_dns-view",
  Type.Object({
    created_time: Type.Optional(DnsSettingsCreatedTime),
    modified_time: Type.Optional(DnsSettingsModifiedTime),
    name: Type.Optional(DnsSettingsName),
    zones: Type.Optional(DnsSettingsZones),
  }),
)

export const DnsSettingsDnsViewPatch = named("dns-settings_dns-view-patch", DnsSettingsDnsView)

export const DnsSettingsDnsViewResponse = named(
  "dns-settings_dns-view-response",
  Type.Object({
    created_time: DnsSettingsCreatedTime,
    modified_time: DnsSettingsModifiedTime,
    name: DnsSettingsName,
    zones: DnsSettingsZones,
    id: DlsIdentifier,
  }),
)

export const DnsSettingsDnsViewResponseSingle = named(
  "dns-settings_dns_view_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DnsSettingsDnsViewResponse),
  }),
)

export const DnsSettingsDnsViewPost = named("dns-settings_dns-view-post", DnsSettingsDnsView)

export const DnsSettingsDirection = named(
  "dns-settings_direction",
  Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Direction to order DNS views in." }),
)

export const DnsSettingsOrder = named(
  "dns-settings_order",
  Type.Union([Type.Literal("name"), Type.Literal("created_on"), Type.Literal("modified_on")], {
    description: "Field to order DNS views by.",
  }),
)

export const DnsSettingsPerPage = named(
  "dns-settings_per_page",
  Type.Number({ description: "Number of DNS views per page.", default: 100, minimum: 1, maximum: 5000000 }),
)

export const DnsSettingsMatch = named(
  "dns-settings_match",
  Type.Union([Type.Literal("any"), Type.Literal("all")], {
    description:
      "Whether to match all search requirements or at least one (any). If set to `all`, acts like a logical AND between filters. If set to `any`, acts like a logical OR instead.\n",
  }),
)

export const DnsSettingsDnsViewResponseCollection = named(
  "dns-settings_dns_view_response_collection",
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
    result: Type.Optional(Type.Array(DnsSettingsDnsViewResponse)),
  }),
)

export const DnsSettingsDnsSettingsAccountPatch = named(
  "dns-settings_dns-settings-account-patch",
  Type.Object({
    flatten_all_cnames: Type.Optional(DnsSettingsFlattenAllCnames),
    foundation_dns: Type.Optional(DnsSettingsFoundationDns),
    internal_dns: Type.Optional(DnsSettingsInternalDnsBase),
    multi_provider: Type.Optional(DnsSettingsMultiProvider),
    ns_ttl: Type.Optional(DnsSettingsNsTtl),
    secondary_overrides: Type.Optional(DnsSettingsSecondaryOverrides),
    soa: Type.Optional(DnsSettingsSoaBase),
    zone_mode: Type.Optional(DnsSettingsZoneMode),
    nameservers: Type.Optional(
      Type.Object(
        {
          type: Type.Optional(
            Type.Union(
              [
                Type.Literal("cloudflare.standard"),
                Type.Literal("cloudflare.standard.random"),
                Type.Literal("custom.account"),
                Type.Literal("custom.tenant"),
              ],
              { description: "Nameserver type", "x-auditable": true },
            ),
          ),
        },
        { description: "Settings determining the nameservers through which the zone should be available." },
      ),
    ),
  }),
)

export const DnsSettingsAccountSettingsPatch = named(
  "dns-settings_account_settings_patch",
  Type.Object({
    zone_defaults: Type.Optional(DnsSettingsDnsSettingsAccountPatch),
  }),
)

export const DnsSettingsDnsSettingsAccountResponse = named(
  "dns-settings_dns-settings-account-response",
  Type.Object({
    flatten_all_cnames: DnsSettingsFlattenAllCnames,
    foundation_dns: DnsSettingsFoundationDns,
    internal_dns: Type.Object(
      {
        reference_zone_id: Type.Optional(Type.String({ description: "The ID of the zone to fallback to." })),
      },
      { description: "Settings for this internal zone." },
    ),
    multi_provider: DnsSettingsMultiProvider,
    ns_ttl: DnsSettingsNsTtl,
    secondary_overrides: DnsSettingsSecondaryOverrides,
    soa: Type.Object(
      {
        expire: Type.Optional(
          Type.Number({
            description:
              "Time in seconds of being unable to query the primary server after which secondary servers should stop serving the zone.",
            minimum: 86400,
            maximum: 2419200,
            "x-auditable": true,
          }),
        ),
        min_ttl: Type.Optional(
          Type.Number({
            description: "The time to live (TTL) for negative caching of records within the zone.",
            minimum: 60,
            maximum: 86400,
            "x-auditable": true,
          }),
        ),
        mname: Type.Optional(
          Type.Union([
            Type.String({
              description:
                "The primary nameserver, which may be used for outbound zone transfers. If null, a Cloudflare-assigned value will be used.",
              "x-auditable": true,
            }),
            Type.Null(),
          ]),
        ),
        refresh: Type.Optional(
          Type.Number({
            description:
              "Time in seconds after which secondary servers should re-check the SOA record to see if the zone has been updated.",
            minimum: 600,
            maximum: 86400,
            "x-auditable": true,
          }),
        ),
        retry: Type.Optional(
          Type.Number({
            description:
              "Time in seconds after which secondary servers should retry queries after the primary server was unresponsive.",
            minimum: 600,
            maximum: 86400,
            "x-auditable": true,
          }),
        ),
        rname: Type.Optional(
          Type.String({
            description:
              "The email address of the zone administrator, with the first label representing the local part of the email address.",
            "x-auditable": true,
          }),
        ),
        ttl: Type.Optional(
          Type.Number({
            description: "The time to live (TTL) of the SOA record itself.",
            minimum: 300,
            maximum: 86400,
            "x-auditable": true,
          }),
        ),
      },
      { description: "Components of the zone's SOA record." },
    ),
    zone_mode: DnsSettingsZoneMode,
    nameservers: Type.Object(
      {
        type: Type.Union(
          [
            Type.Literal("cloudflare.standard"),
            Type.Literal("cloudflare.standard.random"),
            Type.Literal("custom.account"),
            Type.Literal("custom.tenant"),
          ],
          { description: "Nameserver type", "x-auditable": true },
        ),
      },
      { description: "Settings determining the nameservers through which the zone should be available." },
    ),
  }),
)

export const DnsSettingsAccountSettings = named(
  "dns-settings_account_settings",
  Type.Object({
    zone_defaults: DnsSettingsDnsSettingsAccountResponse,
  }),
)

export const DnsSettingsDnsResponseSingle = named(
  "dns-settings_dns_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DnsSettingsAccountSettings),
  }),
)

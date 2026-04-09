import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"

export const DnsFirewallDnsFirewallReverseDns = named(
  "dns-firewall_dns-firewall-reverse-dns",
  Type.Object({
    ptr: Type.Optional(Type.Record(Type.String(), Type.String({ description: "PTR record content" }))),
  }),
)

export const DnsFirewallDnsFirewallReverseDnsPatch = named(
  "dns-firewall_dns-firewall-reverse-dns-patch",
  DnsFirewallDnsFirewallReverseDns,
)

export const DnsFirewallDnsFirewallReverseDnsResponse2 = named(
  "dns-firewall_dns-firewall-reverse-dns-response",
  DnsFirewallDnsFirewallReverseDns,
)

export const DnsFirewallDnsFirewallReverseDnsResponse = named(
  "dns-firewall_dns_firewall_reverse_dns_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DnsFirewallDnsFirewallReverseDnsResponse2),
  }),
)

export const DnsFirewallAttackMitigation = named(
  "dns-firewall_attack_mitigation",
  Type.Union([
    Type.Object(
      {
        enabled: Type.Optional(
          Type.Boolean({
            description: "When enabled, automatically mitigate random-prefix attacks to protect upstream DNS servers",
            "x-auditable": true,
          }),
        ),
        only_when_upstream_unhealthy: Type.Optional(
          Type.Boolean({
            description: "Only mitigate attacks when upstream servers seem unhealthy",
            default: true,
            "x-auditable": true,
          }),
        ),
      },
      { description: "Attack mitigation settings" },
    ),
    Type.Null(),
  ]),
)

export const DnsFirewallDeprecateAnyRequests = named(
  "dns-firewall_deprecate_any_requests",
  Type.Boolean({ description: "Whether to refuse to answer queries for the ANY type", "x-auditable": true }),
)

export const DnsFirewallEcsFallback = named(
  "dns-firewall_ecs_fallback",
  Type.Boolean({
    description: "Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent",
    "x-auditable": true,
  }),
)

export const DnsFirewallMaximumCacheTtl = named(
  "dns-firewall_maximum_cache_ttl",
  Type.Number({
    description:
      "By default, Cloudflare attempts to cache responses for as long as\nindicated by the TTL received from upstream nameservers. This setting\nsets an upper bound on this duration. For caching purposes, higher TTLs\nwill be decreased to the maximum value defined by this setting.\n\nThis setting does not affect the TTL value in the DNS response\nCloudflare returns to clients. Cloudflare will always forward the TTL\nvalue received from upstream nameservers.\n",
    default: 900,
    minimum: 30,
    maximum: 36000,
    "x-auditable": true,
  }),
)

export const DnsFirewallMinimumCacheTtl = named(
  "dns-firewall_minimum_cache_ttl",
  Type.Number({
    description:
      "By default, Cloudflare attempts to cache responses for as long as\nindicated by the TTL received from upstream nameservers. This setting\nsets a lower bound on this duration. For caching purposes, lower TTLs\nwill be increased to the minimum value defined by this setting.\n\nThis setting does not affect the TTL value in the DNS response\nCloudflare returns to clients. Cloudflare will always forward the TTL\nvalue received from upstream nameservers.\n\nNote that, even with this setting, there is no guarantee that a\nresponse will be cached for at least the specified duration. Cached\nresponses may be removed earlier for capacity or other operational\nreasons.\n",
    default: 60,
    minimum: 30,
    maximum: 36000,
    "x-auditable": true,
  }),
)

export const DnsFirewallName = named(
  "dns-firewall_name",
  Type.String({ description: "DNS Firewall cluster name", minLength: 1, maxLength: 160, "x-auditable": true }),
)

export const DnsFirewallNegativeCacheTtl = named(
  "dns-firewall_negative_cache_ttl",
  Type.Union([
    Type.Number({
      description:
        "This setting controls how long DNS Firewall should cache negative\nresponses (e.g., NXDOMAIN) from the upstream servers.\n\nThis setting does not affect the TTL value in the DNS response\nCloudflare returns to clients. Cloudflare will always forward the TTL\nvalue received from upstream nameservers.\n",
      minimum: 30,
      maximum: 36000,
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const DnsFirewallRatelimit = named(
  "dns-firewall_ratelimit",
  Type.Union([
    Type.Number({
      description:
        "Ratelimit in queries per second per datacenter (applies to DNS queries sent to the upstream nameservers configured on the cluster)",
      minimum: 100,
      maximum: 1000000000,
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const DnsFirewallRetries = named(
  "dns-firewall_retries",
  Type.Number({
    description:
      "Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)",
    default: 2,
    minimum: 0,
    maximum: 2,
    "x-auditable": true,
  }),
)

export const DnsFirewallUpstreamIps = named(
  "dns-firewall_upstream_ips",
  Type.Array(
    Type.Union([
      Type.String({ description: "Upstream DNS Server IPv4 address", format: "ipv4", "x-auditable": true }),
      Type.String({ description: "Upstream DNS Server IPv6 address", format: "ipv6", "x-auditable": true }),
    ]),
    { "x-stainless-collection-type": "set" },
  ),
)

export const DnsFirewallDnsFirewallCluster = named(
  "dns-firewall_dns-firewall-cluster",
  Type.Object({
    attack_mitigation: Type.Optional(DnsFirewallAttackMitigation),
    deprecate_any_requests: Type.Optional(DnsFirewallDeprecateAnyRequests),
    ecs_fallback: Type.Optional(DnsFirewallEcsFallback),
    maximum_cache_ttl: Type.Optional(DnsFirewallMaximumCacheTtl),
    minimum_cache_ttl: Type.Optional(DnsFirewallMinimumCacheTtl),
    name: Type.Optional(DnsFirewallName),
    negative_cache_ttl: Type.Optional(DnsFirewallNegativeCacheTtl),
    ratelimit: Type.Optional(DnsFirewallRatelimit),
    retries: Type.Optional(DnsFirewallRetries),
    upstream_ips: Type.Optional(DnsFirewallUpstreamIps),
  }),
)

export const DnsFirewallDnsFirewallClusterPatch = named(
  "dns-firewall_dns-firewall-cluster-patch",
  DnsFirewallDnsFirewallCluster,
)

export const DnsFirewallModifiedOn = named(
  "dns-firewall_modified_on",
  Type.String({ description: "Last modification of DNS Firewall cluster", format: "date-time", "x-auditable": true }),
)

export const DnsFirewallDnsFirewallIps = named(
  "dns-firewall_dns_firewall_ips",
  Type.Array(
    Type.Union([
      Type.String({ description: "Cloudflare-assigned DNS IPv4 address", format: "ipv4", "x-auditable": true }),
      Type.String({ description: "Cloudflare-assigned DNS IPv6 address", format: "ipv6", "x-auditable": true }),
    ]),
    { "x-stainless-collection-type": "set" },
  ),
)

export const DnsFirewallDnsFirewallClusterResponse = named(
  "dns-firewall_dns-firewall-cluster-response",
  Type.Object({
    attack_mitigation: Type.Optional(DnsFirewallAttackMitigation),
    deprecate_any_requests: DnsFirewallDeprecateAnyRequests,
    ecs_fallback: DnsFirewallEcsFallback,
    maximum_cache_ttl: DnsFirewallMaximumCacheTtl,
    minimum_cache_ttl: DnsFirewallMinimumCacheTtl,
    name: DnsFirewallName,
    negative_cache_ttl: DnsFirewallNegativeCacheTtl,
    ratelimit: DnsFirewallRatelimit,
    retries: DnsFirewallRetries,
    upstream_ips: DnsFirewallUpstreamIps,
    dns_firewall_ips: DnsFirewallDnsFirewallIps,
    id: DlsIdentifier,
    modified_on: DnsFirewallModifiedOn,
  }),
)

export const DnsFirewallDnsFirewallSingleResponse = named(
  "dns-firewall_dns_firewall_single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DnsFirewallDnsFirewallClusterResponse),
  }),
)

export const DnsFirewallDnsFirewallClusterPost = named(
  "dns-firewall_dns-firewall-cluster-post",
  DnsFirewallDnsFirewallCluster,
)

export const DnsFirewallDnsFirewallResponseCollection = named(
  "dns-firewall_dns_firewall_response_collection",
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
    result: Type.Optional(Type.Array(DnsFirewallDnsFirewallClusterResponse)),
  }),
)

import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages, IamResultInfo, TunnelCreatedAt, TunnelDeletedAt, TunnelTunnelId } from "../shared/schemas"

export const TunnelSubnetType = named(
  "tunnel_subnet_type",
  Type.Union([Type.Literal("cloudflare_source")], { description: "The type of subnet.", "x-auditable": true }),
)

export const TunnelSubnetIsDefaultNetwork = named(
  "tunnel_subnet_is_default_network",
  Type.Boolean({
    description:
      "If `true`, this is the default subnet for the account. There can only be one default subnet per account.",
    "x-auditable": true,
  }),
)

export const TunnelSubnetId = named(
  "tunnel_subnet_id",
  Type.String({ description: "The UUID of the subnet.", format: "uuid", "x-auditable": true }),
)

export const TunnelSubnetComment = named(
  "tunnel_subnet_comment",
  Type.String({ description: "An optional description of the subnet.", "x-auditable": true }),
)

export const TunnelSubnetName = named(
  "tunnel_subnet_name",
  Type.String({ description: "A user-friendly name for the subnet.", "x-auditable": true }),
)

export const TunnelSubnetIpNetwork = named(
  "tunnel_subnet_ip_network",
  Type.String({
    description: "The private IPv4 or IPv6 range defining the subnet, in CIDR notation.",
    "x-auditable": true,
  }),
)

export const TunnelSubnet = named(
  "tunnel_subnet",
  Type.Object({
    comment: Type.Optional(TunnelSubnetComment),
    created_at: Type.Optional(TunnelCreatedAt),
    deleted_at: Type.Optional(TunnelDeletedAt),
    id: Type.Optional(TunnelSubnetId),
    is_default_network: Type.Optional(TunnelSubnetIsDefaultNetwork),
    name: Type.Optional(TunnelSubnetName),
    network: Type.Optional(TunnelSubnetIpNetwork),
    subnet_type: Type.Optional(TunnelSubnetType),
  }),
)

export const TunnelSubnetResponseSingle = named(
  "tunnel_subnet_response_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: TunnelSubnet,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const TunnelAddressFamily = named(
  "tunnel_address_family",
  Type.Union([Type.Literal("v4"), Type.Literal("v6")], {
    description: "IP address family, either `v4` (IPv4) or `v6` (IPv6)",
  }),
)

export const TunnelSubnetQueryComment = named(
  "tunnel_subnet_query_comment",
  Type.String({ description: "If set, only list subnets with the given comment." }),
)

export const TunnelSubnetQueryName = named(
  "tunnel_subnet_query_name",
  Type.String({ description: "If set, only list subnets with the given name" }),
)

export const TunnelSubnetResponseCollection = named(
  "tunnel_subnet_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(TunnelSubnet), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: Type.Optional(IamResultInfo),
  }),
)

export const TunnelSchemasTunnelName = named(
  "tunnel_schemas-tunnel_name",
  Type.String({ description: "A user-friendly name for a tunnel." }),
)

export const TunnelHostnameComment = named(
  "tunnel_hostname_comment",
  Type.String({ description: "An optional description of the hostname route.", "x-auditable": true }),
)

export const TunnelHostname = named(
  "tunnel_hostname",
  Type.String({ description: "The hostname of the route.", "x-auditable": true }),
)

export const TunnelHostnameRouteId = named(
  "tunnel_hostname_route_id",
  Type.String({ description: "The hostname route ID.", format: "uuid", "x-auditable": true }),
)

export const TunnelHostnameRoute = named(
  "tunnel_hostname_route",
  Type.Object({
    comment: Type.Optional(TunnelHostnameComment),
    created_at: Type.Optional(TunnelCreatedAt),
    deleted_at: Type.Optional(TunnelDeletedAt),
    hostname: Type.Optional(TunnelHostname),
    id: Type.Optional(TunnelHostnameRouteId),
    tunnel_id: Type.Optional(TunnelTunnelId),
    tunnel_name: Type.Optional(TunnelSchemasTunnelName),
  }),
)

export const TunnelHostnameRouteResponseSingle = named(
  "tunnel_hostname_route_response_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: TunnelHostnameRoute,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const TunnelHostnameQueryComment = named(
  "tunnel_hostname_query_comment",
  Type.String({ description: "If set, only list hostname routes with the given comment." }),
)

export const TunnelHostnameRouteResponseCollection = named(
  "tunnel_hostname_route_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(TunnelHostnameRoute), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: Type.Optional(IamResultInfo),
  }),
)

export const TunnelOfframpWarpEnabled = named(
  "tunnel_offramp_warp_enabled",
  Type.Boolean({ description: "A flag to enable WARP to WARP traffic.", "x-auditable": true }),
)

export const TunnelIcmpProxyEnabled = named(
  "tunnel_icmp_proxy_enabled",
  Type.Boolean({ description: "A flag to enable the ICMP proxy for the account network.", "x-auditable": true }),
)

export const TunnelApiResponseCommonFailure = named(
  "tunnel_api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful" }),
  }),
)

export const TunnelZeroTrustConnectivitySettingsResponse = named(
  "tunnel_zero_trust_connectivity_settings_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      icmp_proxy_enabled: Type.Optional(TunnelIcmpProxyEnabled),
      offramp_warp_enabled: Type.Optional(TunnelOfframpWarpEnabled),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

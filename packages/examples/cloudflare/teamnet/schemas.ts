import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  D1Messages,
  IamResultInfo,
  TunnelCreatedAt,
  TunnelDeletedAt,
  TunnelTunnelId,
  TunnelTunnelName,
  TunnelTunnelType,
} from "../shared/schemas"

export const TunnelIsDefaultNetwork = named(
  "tunnel_is_default_network",
  Type.Boolean({
    description: "If `true`, this virtual network is the default for the account.",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const TunnelVirtualNetworkComment = named(
  "tunnel_virtual_network_comment",
  Type.String({
    description: "Optional remark describing the virtual network.",
    default: "",
    maxLength: 256,
    "x-auditable": true,
  }),
)

export const TunnelVirtualNetworkId = named(
  "tunnel_virtual_network_id",
  Type.String({ description: "UUID of the virtual network.", format: "uuid", "x-auditable": true }),
)

export const TunnelVirtualNetworkName = named(
  "tunnel_virtual_network_name",
  Type.String({ description: "A user-friendly name for the virtual network.", maxLength: 256, "x-auditable": true }),
)

export const TunnelVirtualNetwork = named(
  "tunnel_virtual-network",
  Type.Object({
    comment: TunnelVirtualNetworkComment,
    created_at: TunnelCreatedAt,
    deleted_at: Type.Optional(TunnelDeletedAt),
    id: TunnelVirtualNetworkId,
    is_default_network: TunnelIsDefaultNetwork,
    name: TunnelVirtualNetworkName,
  }),
)

export const TunnelVnetResponseSingle = named(
  "tunnel_vnet_response_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: TunnelVirtualNetwork,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const TunnelIsDefaultNetworkOptional = named(
  "tunnel_is_default_network_optional",
  Type.Boolean({
    description: "If `true`, this virtual network is the default for the account.",
    default: false,
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const TunnelVnetResponseCollection = named(
  "tunnel_vnet_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(TunnelVirtualNetwork), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: Type.Optional(IamResultInfo),
  }),
)

export const TunnelRouteComment = named(
  "tunnel_route_comment",
  Type.String({
    description: "Optional remark describing the route.",
    default: "",
    maxLength: 100,
    "x-auditable": true,
  }),
)

export const TunnelRouteId = named("tunnel_route_id", Type.String({ description: "UUID of the route.", maxLength: 36 }))

export const TunnelIpNetwork = named(
  "tunnel_ip_network",
  Type.String({
    description: "The private IPv4 or IPv6 range connected by the route, in CIDR notation.",
    "x-auditable": true,
  }),
)

export const TunnelVirtualNetworkIdComputedOptional = named(
  "tunnel_virtual_network_id_computed_optional",
  Type.String({
    description: "UUID of the virtual network.",
    format: "uuid",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const TunnelTeamnet = named(
  "tunnel_teamnet",
  Type.Object({
    comment: Type.Optional(TunnelRouteComment),
    created_at: Type.Optional(TunnelCreatedAt),
    deleted_at: Type.Optional(TunnelDeletedAt),
    id: Type.Optional(TunnelRouteId),
    network: Type.Optional(TunnelIpNetwork),
    tun_type: Type.Optional(TunnelTunnelType),
    tunnel_id: Type.Optional(TunnelTunnelId),
    tunnel_name: Type.Optional(TunnelTunnelName),
    virtual_network_id: Type.Optional(TunnelVirtualNetworkIdComputedOptional),
    virtual_network_name: Type.Optional(TunnelVirtualNetworkName),
  }),
)

export const TunnelTeamnetResponseSingle = named(
  "tunnel_teamnet_response_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: TunnelTeamnet,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const UnnamedSchemaRefC125d35cbb7f93aab989cd19bd764ed6 = named(
  "unnamed_schema_ref_c125d35cbb7f93aab989cd19bd764ed6",
  Type.Union([Type.Null()]),
)

export const TunnelRoute = named(
  "tunnel_route",
  Type.Object({
    comment: Type.Optional(TunnelRouteComment),
    created_at: Type.Optional(TunnelCreatedAt),
    deleted_at: Type.Optional(TunnelDeletedAt),
    id: Type.Optional(TunnelRouteId),
    network: Type.Optional(TunnelIpNetwork),
    tunnel_id: Type.Optional(TunnelTunnelId),
    virtual_network_id: Type.Optional(TunnelVirtualNetworkId),
  }),
)

export const TunnelRouteResponseSingle = named(
  "tunnel_route_response_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: TunnelRoute,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const TunnelTeamnetResponseCollection = named(
  "tunnel_teamnet_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(TunnelTeamnet), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: Type.Optional(IamResultInfo),
  }),
)

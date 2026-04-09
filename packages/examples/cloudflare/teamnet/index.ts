import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  D1Messages,
  DnsRecordsPage,
  IamResultInfo,
  TunnelExistedAt,
  TunnelIp,
  TunnelIpNetworkEncoded,
  TunnelPerPage,
  TunnelTunnelId,
  TunnelTunnelType,
  TunnelTunnelTypes,
} from "../shared/schemas"
import {
  TunnelIpNetwork,
  TunnelIsDefaultNetworkOptional,
  TunnelRouteComment,
  TunnelRouteId,
  TunnelRouteResponseSingle,
  TunnelTeamnetResponseCollection,
  TunnelTeamnetResponseSingle,
  TunnelVirtualNetworkComment,
  TunnelVirtualNetworkId,
  TunnelVirtualNetworkIdComputedOptional,
  TunnelVirtualNetworkName,
  TunnelVnetResponseCollection,
  TunnelVnetResponseSingle,
  UnnamedSchemaRefC125d35cbb7f93aab989cd19bd764ed6,
} from "./schemas"

export function registerTeamnet(api: Api) {
  api.group("/accounts/{account_id}/teamnet", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/routes", {
      query: Type.Object({
        comment: Type.Optional(TunnelRouteComment),
        is_deleted: Type.Optional(
          Type.Boolean({
            description:
              "If `true`, only include deleted routes. If `false`, exclude deleted routes. If empty, all routes will be included.",
          }),
        ),
        network_subset: Type.Optional(TunnelIpNetwork),
        network_superset: Type.Optional(TunnelIpNetwork),
        existed_at: Type.Optional(TunnelExistedAt),
        tunnel_id: Type.Optional(TunnelTunnelId),
        route_id: Type.Optional(TunnelRouteId),
        tun_types: Type.Optional(TunnelTunnelTypes),
        virtual_network_id: Type.Optional(TunnelVirtualNetworkId),
        per_page: Type.Optional(TunnelPerPage),
        page: Type.Optional(DnsRecordsPage),
      }),
      responses: {
        200: TunnelTeamnetResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result_info: Type.Optional(IamResultInfo),
        }),
      },
    })
      .summary("List tunnel routes")
      .description("Lists and filters private network routes in an account.")
      .operationId("tunnel-route-list-tunnel-routes")
      .tag("Tunnel Routing")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Networks Write",
        "Cloudflare One Networks Read",
        "Cloudflare Tunnel Write",
        "Cloudflare Tunnel Read",
      ])

    g.post("/routes", {
      body: Type.Object({
        comment: Type.Optional(TunnelRouteComment),
        network: TunnelIpNetwork,
        tunnel_id: TunnelTunnelId,
        virtual_network_id: Type.Optional(TunnelVirtualNetworkIdComputedOptional),
      }),
      responses: {
        200: TunnelRouteResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefC125d35cbb7f93aab989cd19bd764ed6,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Create a tunnel route")
      .description("Routes a private network through a Cloudflare Tunnel.")
      .operationId("tunnel-route-create-a-tunnel-route")
      .tag("Tunnel Routing")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Networks Write", "Cloudflare Tunnel Write"])

    g.get("/routes/ip/{ip}", {
      params: Type.Object({ ip: TunnelIp }),
      query: Type.Object({
        virtual_network_id: Type.Optional(TunnelVirtualNetworkId),
        default_virtual_network_fallback: Type.Optional(Type.Boolean({ default: true })),
      }),
      responses: {
        200: TunnelTeamnetResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Get tunnel route by IP")
      .description("Fetches routes that contain the given IP address.")
      .operationId("tunnel-route-get-tunnel-route-by-ip")
      .tag("Tunnel Routing")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Networks Write",
        "Cloudflare One Networks Read",
        "Cloudflare Tunnel Write",
        "Cloudflare Tunnel Read",
      ])

    g.post("/routes/network/{ip_network_encoded}", {
      params: Type.Object({ ip_network_encoded: TunnelIpNetworkEncoded }),
      body: Type.Object({
        comment: Type.Optional(TunnelRouteComment),
        tunnel_id: TunnelTunnelId,
        virtual_network_id: Type.Optional(TunnelVirtualNetworkId),
      }),
      responses: {
        200: TunnelRouteResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefC125d35cbb7f93aab989cd19bd764ed6,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Create a tunnel route (CIDR Endpoint)")
      .description(
        "Routes a private network through a Cloudflare Tunnel. The CIDR in `ip_network_encoded` must be written in URL-encoded format.",
      )
      .operationId("tunnel-route-create-a-tunnel-route-with-cidr")
      .tag("Tunnel Routing")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Networks Write", "Cloudflare Tunnel Write"])
      .extension(
        "x-stainless-deprecation-message",
        "This endpoint and its related APIs are deprecated in favor of the equivalent Tunnel Route (without CIDR) APIs.",
      )

    g.patch("/routes/network/{ip_network_encoded}", {
      params: Type.Object({ ip_network_encoded: TunnelIpNetworkEncoded }),
      responses: {
        200: TunnelRouteResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefC125d35cbb7f93aab989cd19bd764ed6,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Update a tunnel route (CIDR Endpoint)")
      .description(
        "Updates an existing private network route in an account. The CIDR in `ip_network_encoded` must be written in URL-encoded format.",
      )
      .operationId("tunnel-route-update-a-tunnel-route-with-cidr")
      .tag("Tunnel Routing")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Networks Write", "Cloudflare Tunnel Write"])
      .extension(
        "x-stainless-deprecation-message",
        "This endpoint and its related APIs are deprecated in favor of the equivalent Tunnel Route (without CIDR) APIs.",
      )

    g.delete("/routes/network/{ip_network_encoded}", {
      params: Type.Object({ ip_network_encoded: TunnelIpNetworkEncoded }),
      query: Type.Object({
        virtual_network_id: Type.Optional(TunnelVirtualNetworkId),
        tun_type: Type.Optional(TunnelTunnelType),
        tunnel_id: Type.Optional(TunnelTunnelId),
      }),
      responses: {
        200: TunnelRouteResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefC125d35cbb7f93aab989cd19bd764ed6,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Delete a tunnel route (CIDR Endpoint)")
      .description(
        "Deletes a private network route from an account. The CIDR in `ip_network_encoded` must be written in URL-encoded format. If no virtual_network_id is provided it will delete the route from the default vnet. If no tun_type is provided it will fetch the type from the tunnel_id or if that is missing it will assume Cloudflare Tunnel as default. If tunnel_id is provided it will delete the route from that tunnel, otherwise it will delete the route based on the vnet and tun_type.\n",
      )
      .operationId("tunnel-route-delete-a-tunnel-route-with-cidr")
      .tag("Tunnel Routing")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Networks Write", "Cloudflare Tunnel Write"])
      .extension(
        "x-stainless-deprecation-message",
        "This endpoint and its related APIs are deprecated in favor of the equivalent Tunnel Route (without CIDR) APIs.",
      )

    g.get("/routes/{route_id}", {
      params: Type.Object({ route_id: TunnelRouteId }),
      responses: {
        200: TunnelRouteResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefC125d35cbb7f93aab989cd19bd764ed6,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Get tunnel route")
      .description("Get a private network route in an account.")
      .operationId("tunnel-route-get-tunnel-route")
      .tag("Tunnel Routing")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.patch("/routes/{route_id}", {
      params: Type.Object({ route_id: TunnelRouteId }),
      body: Type.Object({
        comment: Type.Optional(TunnelRouteComment),
        network: Type.Optional(TunnelIpNetwork),
        tunnel_id: Type.Optional(TunnelTunnelId),
        virtual_network_id: Type.Optional(TunnelVirtualNetworkIdComputedOptional),
      }),
      responses: {
        200: TunnelRouteResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefC125d35cbb7f93aab989cd19bd764ed6,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Update a tunnel route")
      .description(
        "Updates an existing private network route in an account. The fields that are meant to be updated should be provided in the body of the request.",
      )
      .operationId("tunnel-route-update-a-tunnel-route")
      .tag("Tunnel Routing")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Networks Write", "Cloudflare Tunnel Write"])

    g.delete("/routes/{route_id}", {
      params: Type.Object({ route_id: TunnelRouteId }),
      responses: {
        200: TunnelRouteResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefC125d35cbb7f93aab989cd19bd764ed6,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Delete a tunnel route")
      .description("Deletes a private network route from an account.\n")
      .operationId("tunnel-route-delete-a-tunnel-route")
      .tag("Tunnel Routing")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Networks Write", "Cloudflare Tunnel Write"])

    g.get("/virtual_networks", {
      query: Type.Object({
        id: Type.Optional(TunnelVirtualNetworkId),
        name: Type.Optional(TunnelVirtualNetworkName),
        is_default: Type.Optional(
          Type.Boolean({
            description:
              "If `true`, only include the default virtual network. If `false`, exclude the default virtual network. If empty, all virtual networks will be included.",
          }),
        ),
        is_default_network: Type.Optional(
          Type.Boolean({
            description:
              "If `true`, only include the default virtual network. If `false`, exclude the default virtual network. If empty, all virtual networks will be included.",
          }),
        ),
        is_deleted: Type.Optional(
          Type.Boolean({
            description:
              "If `true`, only include deleted virtual networks. If `false`, exclude deleted virtual networks. If empty, all virtual networks will be included.",
          }),
        ),
      }),
      responses: {
        200: TunnelVnetResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result_info: Type.Optional(IamResultInfo),
        }),
      },
    })
      .summary("List virtual networks")
      .description("Lists and filters virtual networks in an account.")
      .operationId("tunnel-virtual-network-list-virtual-networks")
      .tag("Tunnel Virtual Network")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Networks Write",
        "Cloudflare One Networks Read",
        "Cloudflare Tunnel Write",
        "Cloudflare Tunnel Read",
      ])

    g.post("/virtual_networks", {
      body: Type.Object({
        comment: Type.Optional(TunnelVirtualNetworkComment),
        is_default: Type.Optional(
          Type.Boolean({
            description: "If `true`, this virtual network is the default for the account.",
            deprecated: true,
            "x-auditable": true,
            "x-stainless-deprecation-message": "Use the is_default_network property instead.",
            "x-stainless-ignore": true,
          }),
        ),
        is_default_network: Type.Optional(TunnelIsDefaultNetworkOptional),
        name: TunnelVirtualNetworkName,
      }),
      responses: {
        200: TunnelVnetResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Create a virtual network")
      .description("Adds a new virtual network to an account.")
      .operationId("tunnel-virtual-network-create-a-virtual-network")
      .tag("Tunnel Virtual Network")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Networks Write", "Cloudflare Tunnel Write"])

    g.get("/virtual_networks/{virtual_network_id}", {
      params: Type.Object({ virtual_network_id: TunnelVirtualNetworkId }),
      responses: {
        200: TunnelVnetResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Get a virtual network")
      .description("Get a virtual network.")
      .operationId("tunnel-virtual-network-get")
      .tag("Tunnel Virtual Network")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.patch("/virtual_networks/{virtual_network_id}", {
      params: Type.Object({ virtual_network_id: TunnelVirtualNetworkId }),
      body: Type.Object({
        comment: Type.Optional(TunnelVirtualNetworkComment),
        is_default_network: Type.Optional(TunnelIsDefaultNetworkOptional),
        name: Type.Optional(TunnelVirtualNetworkName),
      }),
      responses: {
        200: TunnelVnetResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Update a virtual network")
      .description("Updates an existing virtual network.")
      .operationId("tunnel-virtual-network-update")
      .tag("Tunnel Virtual Network")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Networks Write", "Cloudflare Tunnel Write"])

    g.delete("/virtual_networks/{virtual_network_id}", {
      params: Type.Object({ virtual_network_id: TunnelVirtualNetworkId }),
      responses: {
        200: TunnelVnetResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Delete a virtual network")
      .description("Deletes an existing virtual network.")
      .operationId("tunnel-virtual-network-delete")
      .tag("Tunnel Virtual Network")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Networks Write", "Cloudflare Tunnel Write"])
  })
}

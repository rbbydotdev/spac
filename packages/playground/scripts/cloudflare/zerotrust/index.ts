import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  D1Messages,
  DnsRecordsPage,
  IamResultInfo,
  TunnelExistedAt,
  TunnelIpNetworkEncoded,
  TunnelPerPage,
  TunnelTunnelId,
} from "../shared/schemas"
import {
  TunnelAddressFamily,
  TunnelApiResponseCommonFailure,
  TunnelHostname,
  TunnelHostnameComment,
  TunnelHostnameQueryComment,
  TunnelHostnameRouteId,
  TunnelHostnameRouteResponseCollection,
  TunnelHostnameRouteResponseSingle,
  TunnelIcmpProxyEnabled,
  TunnelOfframpWarpEnabled,
  TunnelSubnetComment,
  TunnelSubnetIpNetwork,
  TunnelSubnetName,
  TunnelSubnetQueryComment,
  TunnelSubnetQueryName,
  TunnelSubnetResponseCollection,
  TunnelSubnetResponseSingle,
  TunnelZeroTrustConnectivitySettingsResponse,
} from "./schemas"

export function registerZerotrust(api: Api) {
  api.assertVersion("3.0.3", "Zerotrust")

  api.group("/accounts/{account_id}/zerotrust", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/connectivity_settings", {})
      .response(TunnelZeroTrustConnectivitySettingsResponse)
      .error("4XX", TunnelApiResponseCommonFailure)
      .summary("Get Zero Trust Connectivity Settings")
      .description("Gets the Zero Trust Connectivity Settings for the given account.")
      .operationId("zero-trust-accounts-get-connectivity-settings")
      .tag("Zero Trust Connectivity Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Report", "Zero Trust Read", "Zero Trust Write"])

    g.patch("/connectivity_settings", {
      body: Type.Object({
        icmp_proxy_enabled: Type.Optional(TunnelIcmpProxyEnabled),
        offramp_warp_enabled: Type.Optional(TunnelOfframpWarpEnabled),
      }),
    })
      .response(TunnelZeroTrustConnectivitySettingsResponse)
      .error("4XX", TunnelApiResponseCommonFailure)
      .summary("Updates the Zero Trust Connectivity Settings")
      .description("Updates the Zero Trust Connectivity Settings for the given account.")
      .operationId("zero-trust-accounts-patch-connectivity-settings")
      .tag("Zero Trust Connectivity Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/routes/hostname", {
      query: Type.Object({
        id: Type.Optional(TunnelHostnameRouteId),
        hostname: Type.Optional(TunnelHostname),
        tunnel_id: Type.Optional(TunnelTunnelId),
        comment: Type.Optional(TunnelHostnameQueryComment),
        existed_at: Type.Optional(TunnelExistedAt),
        is_deleted: Type.Optional(
          Type.Boolean({
            description: "If `true`, only return deleted hostname routes. If `false`, exclude deleted hostname routes.",
            default: false,
          }),
        ),
        per_page: Type.Optional(TunnelPerPage),
        page: Type.Optional(DnsRecordsPage),
      }),
    })
      .response(TunnelHostnameRouteResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result_info: Type.Optional(IamResultInfo),
        }),
      )
      .summary("List hostname routes")
      .description("Lists and filters hostname routes in an account.")
      .operationId("zero-trust-networks-route-hostname-list")
      .tag("Zero Trust Hostname Route")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Networks Write",
        "Cloudflare One Networks Read",
        "Cloudflare Tunnel Write",
        "Cloudflare Tunnel Read",
      ])

    g.post("/routes/hostname", {
      body: Type.Object({
        comment: Type.Optional(TunnelHostnameComment),
        hostname: Type.Optional(TunnelHostname),
        tunnel_id: Type.Optional(TunnelTunnelId),
      }),
    })
      .response(TunnelHostnameRouteResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Create hostname route")
      .description("Create a hostname route.")
      .operationId("zero-trust-networks-route-hostname-create")
      .tag("Zero Trust Hostname Route")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Networks Write", "Cloudflare Tunnel Write"])

    g.get("/routes/hostname/{hostname_route_id}", {
      params: Type.Object({ hostname_route_id: TunnelHostnameRouteId }),
    })
      .response(TunnelHostnameRouteResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Get hostname route")
      .description("Get a hostname route.")
      .operationId("zero-trust-networks-route-hostname-get")
      .tag("Zero Trust Hostname Route")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Networks Write",
        "Cloudflare One Networks Read",
        "Cloudflare Tunnel Write",
        "Cloudflare Tunnel Read",
      ])

    g.patch("/routes/hostname/{hostname_route_id}", {
      params: Type.Object({ hostname_route_id: TunnelHostnameRouteId }),
      body: Type.Object({
        comment: Type.Optional(TunnelHostnameComment),
        hostname: Type.Optional(TunnelHostname),
        tunnel_id: Type.Optional(TunnelTunnelId),
      }),
    })
      .response(TunnelHostnameRouteResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Update hostname route")
      .description("Updates a hostname route.")
      .operationId("zero-trust-networks-route-hostname-update")
      .tag("Zero Trust Hostname Route")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Networks Write", "Cloudflare Tunnel Write"])

    g.delete("/routes/hostname/{hostname_route_id}", {
      params: Type.Object({ hostname_route_id: TunnelHostnameRouteId }),
    })
      .response(TunnelHostnameRouteResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Delete hostname route")
      .description("Delete a hostname route.")
      .operationId("zero-trust-networks-route-hostname-delete")
      .tag("Zero Trust Hostname Route")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Networks Write", "Cloudflare Tunnel Write"])

    g.get("/subnets", {
      query: Type.Object({
        name: Type.Optional(TunnelSubnetQueryName),
        comment: Type.Optional(TunnelSubnetQueryComment),
        network: Type.Optional(TunnelIpNetworkEncoded),
        existed_at: Type.Optional(TunnelExistedAt),
        address_family: Type.Optional(TunnelAddressFamily),
        is_default_network: Type.Optional(
          Type.Boolean({
            description:
              "If `true`, only include default subnets. If `false`, exclude default subnets subnets. If not set, all subnets will be included.",
          }),
        ),
        is_deleted: Type.Optional(
          Type.Boolean({
            description:
              "If `true`, only include deleted subnets. If `false`, exclude deleted subnets. If not set, all subnets will be included.",
          }),
        ),
        sort_order: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
            description:
              "Sort order of the results. `asc` means oldest to newest, `desc` means newest to oldest. If not set, they will not be in any particular order.",
          }),
        ),
        subnet_types: Type.Optional(
          Type.Union([Type.Literal("cloudflare_source"), Type.Literal("warp")], {
            description: "If set, the types of subnets to include, separated by comma.",
          }),
        ),
        per_page: Type.Optional(TunnelPerPage),
        page: Type.Optional(DnsRecordsPage),
      }),
    })
      .response(TunnelSubnetResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result_info: Type.Optional(IamResultInfo),
        }),
      )
      .summary("List Subnets")
      .description("Lists and filters subnets in an account.")
      .operationId("zero-trust-networks-subnets-list")
      .tag("Zero Trust Subnets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Networks Write", "Cloudflare One Networks Read"])

    g.patch("/subnets/cloudflare_source/{address_family}", {
      params: Type.Object({ address_family: TunnelAddressFamily }),
      body: Type.Object({
        comment: Type.Optional(TunnelSubnetComment),
        name: Type.Optional(TunnelSubnetName),
        network: Type.Optional(TunnelSubnetIpNetwork),
      }),
    })
      .response(TunnelSubnetResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Update Cloudflare Source Subnet")
      .description("Updates the Cloudflare Source subnet of the given address family")
      .operationId("zero-trust-networks-subnet-update-cloudflare-source")
      .tag("Zero Trust Subnets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Networks Write"])
  })
}

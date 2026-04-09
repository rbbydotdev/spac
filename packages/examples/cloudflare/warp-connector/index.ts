import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  D1Messages,
  DnsRecordsPage,
  IamResultInfo,
  TunnelCfdTunnel,
  TunnelExistedAt,
  TunnelPerPage,
  TunnelStatus,
  TunnelTunnelId,
  TunnelTunnelName,
  TunnelTunnelResponseCollection,
  TunnelTunnelResponseSingle,
  TunnelTunnelResponseToken,
  TunnelTunnelSecret,
  TunnelWarpConnectorTunnel,
} from "../shared/schemas"

export function registerWarpConnector(api: Api) {
  api.group("/accounts/{account_id}/warp_connector", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        name: Type.Optional(Type.String({ description: "A user-friendly name for the tunnel." })),
        is_deleted: Type.Optional(
          Type.Boolean({
            description:
              "If `true`, only include deleted tunnels. If `false`, exclude deleted tunnels. If empty, all tunnels will be included.",
          }),
        ),
        existed_at: Type.Optional(TunnelExistedAt),
        uuid: Type.Optional(TunnelTunnelId),
        was_active_at: Type.Optional(Type.String({ format: "date-time" })),
        was_inactive_at: Type.Optional(Type.String({ format: "date-time" })),
        include_prefix: Type.Optional(Type.String()),
        exclude_prefix: Type.Optional(Type.String()),
        status: Type.Optional(TunnelStatus),
        per_page: Type.Optional(TunnelPerPage),
        page: Type.Optional(DnsRecordsPage),
      }),
      responses: {
        200: TunnelTunnelResponseCollection,
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
      .summary("List Warp Connector Tunnels")
      .description("Lists and filters Warp Connector Tunnels in an account.")
      .operationId("cloudflare-tunnel-list-warp-connector-tunnels")
      .tag("Cloudflare Tunnel")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Connectors Write",
        "Cloudflare One Connectors Read",
        "Cloudflare One Connector: WARP Write",
        "Cloudflare One Connector: WARP Read",
      ])

    g.post("/", {
      body: Type.Object({
        name: TunnelTunnelName,
      }),
      responses: {
        200: TunnelTunnelResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([TunnelCfdTunnel, TunnelWarpConnectorTunnel]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Create a Warp Connector Tunnel")
      .description("Creates a new Warp Connector Tunnel in an account.")
      .operationId("cloudflare-tunnel-create-a-warp-connector-tunnel")
      .tag("Cloudflare Tunnel")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Connectors Write", "Cloudflare One Connector: WARP Write"])

    g.get("/{tunnel_id}", {
      params: Type.Object({ tunnel_id: TunnelTunnelId }),
      responses: {
        200: TunnelTunnelResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([TunnelCfdTunnel, TunnelWarpConnectorTunnel]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Get a Warp Connector Tunnel")
      .description("Fetches a single Warp Connector Tunnel.")
      .operationId("cloudflare-tunnel-get-a-warp-connector-tunnel")
      .tag("Cloudflare Tunnel")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Connectors Write",
        "Cloudflare One Connectors Read",
        "Cloudflare One Connector: WARP Write",
        "Cloudflare One Connector: WARP Read",
      ])

    g.patch("/{tunnel_id}", {
      params: Type.Object({ tunnel_id: TunnelTunnelId }),
      body: Type.Object({
        name: Type.Optional(TunnelTunnelName),
        tunnel_secret: Type.Optional(TunnelTunnelSecret),
      }),
      responses: {
        200: TunnelTunnelResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([TunnelCfdTunnel, TunnelWarpConnectorTunnel]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Update a Warp Connector Tunnel")
      .description("Updates an existing Warp Connector Tunnel.")
      .operationId("cloudflare-tunnel-update-a-warp-connector-tunnel")
      .tag("Cloudflare Tunnel")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Connectors Write", "Cloudflare One Connector: WARP Write"])

    g.delete("/{tunnel_id}", {
      params: Type.Object({ tunnel_id: TunnelTunnelId }),
      responses: {
        200: TunnelTunnelResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([TunnelCfdTunnel, TunnelWarpConnectorTunnel]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Delete a Warp Connector Tunnel")
      .description("Deletes a Warp Connector Tunnel from an account.")
      .operationId("cloudflare-tunnel-delete-a-warp-connector-tunnel")
      .tag("Cloudflare Tunnel")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare One Connectors Write", "Cloudflare One Connector: WARP Write"])

    g.get("/{tunnel_id}/token", {
      params: Type.Object({ tunnel_id: TunnelTunnelId }),
      responses: {
        200: TunnelTunnelResponseToken,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()], {
            description: "The Tunnel Token is used as a mechanism to authenticate the operation of a tunnel.",
            "x-sensitive": true,
          }),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Get a Warp Connector Tunnel token")
      .description("Gets the token used to associate warp device with a specific Warp Connector tunnel.")
      .operationId("cloudflare-tunnel-get-a-warp-connector-tunnel-token")
      .tag("Cloudflare Tunnel")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Connectors Write",
        "Cloudflare One Connector: cloudflared Write",
        "Cloudflare Tunnel Write",
      ])
  })
}

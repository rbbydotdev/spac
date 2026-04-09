import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  D1Messages,
  DnsRecordsPage,
  IamResultInfo,
  TunnelCfdTunnel,
  TunnelClientId,
  TunnelConfigSrc,
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
import {
  TunnelConfig,
  TunnelConfigurationResponse,
  TunnelEmptyResponse,
  TunnelManagementResources,
  TunnelSchemasApiResponseCommonFailure,
  TunnelSchemasTunnelId,
  TunnelTunnelClientResponse,
  TunnelTunnelConnectionsResponse,
} from "./schemas"

export function registerCfdTunnel(api: Api) {
  api.group("/accounts/{account_id}/cfd_tunnel", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        name: Type.Optional(TunnelTunnelName),
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
      .summary("List Cloudflare Tunnels")
      .description("Lists and filters Cloudflare Tunnels in an account.")
      .operationId("cloudflare-tunnel-list-cloudflare-tunnels")
      .tag("Cloudflare Tunnel")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Connectors Write",
        "Cloudflare One Connectors Read",
        "Cloudflare One Connector: cloudflared Write",
        "Cloudflare One Connector: cloudflared Read",
        "Cloudflare Tunnel Write",
        "Cloudflare Tunnel Read",
      ])

    g.post("/", {
      body: Type.Object({
        config_src: Type.Optional(TunnelConfigSrc),
        name: TunnelTunnelName,
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
      .summary("Create a Cloudflare Tunnel")
      .description("Creates a new Cloudflare Tunnel in an account.")
      .operationId("cloudflare-tunnel-create-a-cloudflare-tunnel")
      .tag("Cloudflare Tunnel")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Connectors Write",
        "Cloudflare One Connector: cloudflared Write",
        "Cloudflare Tunnel Write",
      ])

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
      .summary("Get a Cloudflare Tunnel")
      .description("Fetches a single Cloudflare Tunnel.")
      .operationId("cloudflare-tunnel-get-a-cloudflare-tunnel")
      .tag("Cloudflare Tunnel")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Connectors Write",
        "Cloudflare One Connectors Read",
        "Cloudflare One Connector: cloudflared Write",
        "Cloudflare One Connector: cloudflared Read",
        "Cloudflare Tunnel Write",
        "Cloudflare Tunnel Read",
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
      .summary("Update a Cloudflare Tunnel")
      .description("Updates an existing Cloudflare Tunnel.")
      .operationId("cloudflare-tunnel-update-a-cloudflare-tunnel")
      .tag("Cloudflare Tunnel")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Connectors Write",
        "Cloudflare One Connector: cloudflared Write",
        "Cloudflare Tunnel Write",
      ])

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
      .summary("Delete a Cloudflare Tunnel")
      .description("Deletes a Cloudflare Tunnel from an account.")
      .operationId("cloudflare-tunnel-delete-a-cloudflare-tunnel")
      .tag("Cloudflare Tunnel")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Connectors Write",
        "Cloudflare One Connector: cloudflared Write",
        "Cloudflare Tunnel Write",
      ])

    g.get("/{tunnel_id}/configurations", {
      params: Type.Object({ tunnel_id: TunnelSchemasTunnelId }),
      responses: {
        200: TunnelConfigurationResponse,
        "4XX": TunnelSchemasApiResponseCommonFailure,
      },
    })
      .summary("Get configuration")
      .description("Gets the configuration for a remotely-managed tunnel")
      .operationId("cloudflare-tunnel-configuration-get-configuration")
      .tag("Cloudflare Tunnel Configuration")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Connectors Write",
        "Cloudflare One Connectors Read",
        "Cloudflare One Connector: cloudflared Write",
        "Cloudflare One Connector: cloudflared Read",
        "Cloudflare Tunnel Write",
        "Cloudflare Tunnel Read",
      ])

    g.put("/{tunnel_id}/configurations", {
      params: Type.Object({ tunnel_id: TunnelSchemasTunnelId }),
      body: Type.Object({
        config: Type.Optional(TunnelConfig),
      }),
      responses: {
        200: TunnelConfigurationResponse,
        "4XX": TunnelSchemasApiResponseCommonFailure,
      },
    })
      .summary("Put configuration")
      .description("Adds or updates the configuration for a remotely-managed tunnel.")
      .operationId("cloudflare-tunnel-configuration-put-configuration")
      .tag("Cloudflare Tunnel Configuration")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Connectors Write",
        "Cloudflare One Connector: cloudflared Write",
        "Cloudflare Tunnel Write",
      ])

    g.get("/{tunnel_id}/connections", {
      params: Type.Object({ tunnel_id: TunnelTunnelId }),
      responses: {
        200: TunnelTunnelConnectionsResponse,
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
      .summary("List Cloudflare Tunnel connections")
      .description("Fetches connection details for a Cloudflare Tunnel.")
      .operationId("cloudflare-tunnel-list-cloudflare-tunnel-connections")
      .tag("Cloudflare Tunnel")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Connectors Write",
        "Cloudflare One Connectors Read",
        "Cloudflare One Connector: cloudflared Write",
        "Cloudflare One Connector: cloudflared Read",
        "Cloudflare Tunnel Write",
        "Cloudflare Tunnel Read",
      ])

    g.delete("/{tunnel_id}/connections", {
      params: Type.Object({ tunnel_id: TunnelTunnelId }),
      query: Type.Object({
        client_id: Type.Optional(TunnelClientId),
      }),
      responses: {
        200: TunnelEmptyResponse,
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
      .summary("Clean up Cloudflare Tunnel connections")
      .description(
        "Removes a connection (aka Cloudflare Tunnel Connector) from a Cloudflare Tunnel independently of its current state. If no connector id (client_id) is provided all connectors will be removed. We recommend running this command after rotating tokens.",
      )
      .operationId("cloudflare-tunnel-clean-up-cloudflare-tunnel-connections")
      .tag("Cloudflare Tunnel")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Connectors Write",
        "Cloudflare One Connector: cloudflared Write",
        "Cloudflare Tunnel Write",
      ])

    g.get("/{tunnel_id}/connectors/{connector_id}", {
      params: Type.Object({ tunnel_id: TunnelTunnelId, connector_id: TunnelClientId }),
      responses: {
        200: TunnelTunnelClientResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()], {
            description: "A client (typically cloudflared) that maintains connections to a Cloudflare data center.",
          }),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Get Cloudflare Tunnel connector")
      .description("Fetches connector and connection details for a Cloudflare Tunnel.")
      .operationId("cloudflare-tunnel-get-cloudflare-tunnel-connector")
      .tag("Cloudflare Tunnel")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Connectors Write",
        "Cloudflare One Connectors Read",
        "Cloudflare One Connector: cloudflared Write",
        "Cloudflare One Connector: cloudflared Read",
        "Cloudflare Tunnel Write",
        "Cloudflare Tunnel Read",
      ])

    g.post("/{tunnel_id}/management", {
      params: Type.Object({ tunnel_id: TunnelTunnelId }),
      body: Type.Object({
        resources: Type.Array(TunnelManagementResources),
      }),
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
      .summary("Get a Cloudflare Tunnel management token")
      .description("Gets a management token used to access the management resources (i.e. Streaming Logs) of a tunnel.")
      .operationId("cloudflare-tunnel-get-a-cloudflare-tunnel-management-token")
      .tag("Cloudflare Tunnel")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare One Connectors Write",
        "Cloudflare One Connector: cloudflared Write",
        "Cloudflare Tunnel Write",
      ])

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
      .summary("Get a Cloudflare Tunnel token")
      .description("Gets the token used to associate cloudflared with a specific tunnel.")
      .operationId("cloudflare-tunnel-get-a-cloudflare-tunnel-token")
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

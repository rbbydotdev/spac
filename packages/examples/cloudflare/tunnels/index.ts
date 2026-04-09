import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  D1Messages,
  DnsRecordsPage,
  IamResultInfo,
  TunnelAccountId,
  TunnelExistedAt,
  TunnelPerPage,
  TunnelStatus,
  TunnelTunnelId,
  TunnelTunnelResponseCollection,
  TunnelTunnelTypes,
} from "../shared/schemas"

export function registerTunnels(api: Api) {
  api
    .get("/accounts/{account_id}/tunnels", {
      params: Type.Object({ account_id: TunnelAccountId }),
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
        tun_types: Type.Optional(TunnelTunnelTypes),
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
    .summary("List All Tunnels")
    .description("Lists and filters all types of Tunnels in an account.")
    .operationId("cloudflare-tunnel-list-all-tunnels")
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
}

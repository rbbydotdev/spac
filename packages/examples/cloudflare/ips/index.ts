import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages } from "../shared/schemas"
import { PublicIpIps, PublicIpIpsJdcloud } from "./schemas"

export function registerIps(api: Api) {
  api
    .get("/ips", {
      query: Type.Object({
        networks: Type.Optional(Type.String()),
      }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(Type.Union([PublicIpIps, PublicIpIpsJdcloud])),
        }),
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([PublicIpIps, PublicIpIpsJdcloud]),
        }),
      },
    })
    .summary("Cloudflare/JD Cloud IP Details")
    .description(
      "Get IPs used on the Cloudflare/JD Cloud network, see https://www.cloudflare.com/ips for Cloudflare IPs or https://developers.cloudflare.com/china-network/reference/infrastructure/ for JD Cloud IPs.",
    )
    .operationId("cloudflare-ips-cloudflare-ip-details")
    .tag("Cloudflare IPs")
    .security({})
}

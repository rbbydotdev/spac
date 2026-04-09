import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsTimestamp, DosApiResponseCommonFailure } from "../shared/schemas"
import { DosAsn } from "./schemas"

export function registerBotnetFeed(api: Api) {
  api.assertVersion("3.0.3", "BotnetFeed")

  api.group("/accounts/{account_id}/botnet_feed", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/asn/{asn_id}/day_report", {
      params: Type.Object({ asn_id: DosAsn }),
      query: Type.Object({
        date: Type.Optional(DlsTimestamp),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              cidr: Type.Optional(Type.String()),
              date: Type.Optional(Type.String({ format: "date-time" })),
              offense_count: Type.Optional(Type.Integer()),
            }),
          ),
        }),
      )
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Get daily report")
      .description(
        "Gets all the data the botnet tracking database has for a given ASN registered to user account for given date. If no date is given, it will return results for the previous day.",
      )
      .operationId("botnet-threat-feed-get-day-report")
      .tag("Botnet Threat Feed")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DDoS Botnet Feed Write", "DDoS Botnet Feed Read"])

    g.get("/asn/{asn_id}/full_report", {
      params: Type.Object({ asn_id: DosAsn }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              cidr: Type.Optional(Type.String()),
              date: Type.Optional(Type.String({ format: "date-time" })),
              offense_count: Type.Optional(Type.Integer()),
            }),
          ),
        }),
      )
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Get full report")
      .description(
        "Gets all the data the botnet threat feed tracking database has for a given ASN registered to user account.",
      )
      .operationId("botnet-threat-feed-get-full-report")
      .tag("Botnet Threat Feed")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DDoS Botnet Feed Write", "DDoS Botnet Feed Read"])

    g.get("/configs/asn", {})
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              asn: Type.Optional(Type.Integer()),
            }),
          ),
        }),
      )
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Get list of ASNs")
      .description("Gets a list of all ASNs registered for a user for the DDoS Botnet Feed API.")
      .operationId("botnet-threat-feed-list-asn")
      .tag("Botnet Threat Feed")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DDoS Botnet Feed Write", "DDoS Botnet Feed Read"])

    g.delete("/configs/asn/{asn_id}", {
      params: Type.Object({ asn_id: DosAsn }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              asn: Type.Optional(Type.Integer()),
            }),
          ),
        }),
      )
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Delete an ASN")
      .description("Delete an ASN from botnet threat feed for a given user.")
      .operationId("botnet-threat-feed-delete-asn")
      .tag("Botnet Threat Feed")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DDoS Botnet Feed Write"])
  })
}

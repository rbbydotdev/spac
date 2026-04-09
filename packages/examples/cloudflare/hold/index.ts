import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages, ZonesSchemasApiResponseCommonFailure } from "../shared/schemas"
import { ZoneHold } from "./schemas"

export function registerHold(api: Api) {
  api.group("/zones/{zone_id}/hold", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      responses: {
        200: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: ZoneHold,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
        "4XX": ZonesSchemasApiResponseCommonFailure,
      },
    })
      .summary("Get Zone Hold")
      .description("Retrieve whether the zone is subject to a zone hold, and metadata about the hold.")
      .operationId("zones-0-hold-get")
      .tag("Zone Holds")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Trust and Safety Write",
        "Trust and Safety Read",
        "Zero Trust: PII Read",
        "Zaraz Edit",
        "Zaraz Read",
        "Zaraz Admin",
        "Access: Apps and Policies Revoke",
        "Access: Apps and Policies Write",
        "Access: Apps and Policies Read",
        "Access: Apps and Policies Revoke",
        "Access: Mutual TLS Certificates Write",
        "Access: Organizations, Identity Providers, and Groups Write",
        "Zone Settings Write",
        "Zone Settings Read",
        "Zone Read",
        "DNS Read",
        "Workers Scripts Write",
        "Workers Scripts Read",
        "Zone Write",
        "Workers Routes Write",
        "Workers Routes Read",
        "Stream Write",
        "Stream Read",
        "SSL and Certificates Write",
        "SSL and Certificates Read",
        "Logs Write",
        "Logs Read",
        "Cache Purge",
        "Page Rules Write",
        "Page Rules Read",
        "Load Balancers Write",
        "Load Balancers Read",
        "Firewall Services Write",
        "Firewall Services Read",
        "DNS Write",
        "Apps Write",
        "Analytics Read",
        "Access: Apps and Policies Write",
        "Access: Apps and Policies Read",
      ])

    g.post("/", {
      query: Type.Object({
        include_subdomains: Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: ZoneHold,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
        "4XX": ZonesSchemasApiResponseCommonFailure,
      },
    })
      .summary("Create Zone Hold")
      .description(
        "Enforce a zone hold on the zone, blocking the creation and activation of zones with this zone's hostname.",
      )
      .operationId("zones-0-hold-post")
      .tag("Zone Holds")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Write"])

    g.patch("/", {
      body: Type.Object({
        hold_after: Type.Optional(
          Type.String({
            description:
              "If `hold_after` is provided and future-dated, the hold will be temporarily disabled,\nthen automatically re-enabled by the system at the time specified\nin this RFC3339-formatted timestamp. A past-dated `hold_after` value will have\nno effect on an existing, enabled hold. Providing an empty string will set its value\nto the current time.",
            default: "",
          }),
        ),
        include_subdomains: Type.Optional(
          Type.Boolean({
            description:
              "If `true`, the zone hold will extend to block any subdomain of the given zone, as well\nas SSL4SaaS Custom Hostnames. For example, a zone hold on a zone with the hostname\n'example.com' and include_subdomains=true will block 'example.com',\n'staging.example.com', 'api.staging.example.com', etc.",
            default: false,
          }),
        ),
      }),
      responses: {
        200: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: ZoneHold,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
        "4XX": ZonesSchemasApiResponseCommonFailure,
      },
    })
      .summary("Update Zone Hold")
      .description(
        "Update the `hold_after` and/or `include_subdomains` values on an existing zone hold.\nThe hold is enabled if the `hold_after` date-time value is in the past.",
      )
      .operationId("zones-0-hold-patch")
      .tag("Zone Holds")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Write"])

    g.delete("/", {
      query: Type.Object({
        hold_after: Type.Optional(Type.String()),
      }),
      responses: {
        200: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: ZoneHold,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
        "4XX": ZonesSchemasApiResponseCommonFailure,
      },
    })
      .summary("Remove Zone Hold")
      .description(
        "Stop enforcement of a zone hold on the zone, permanently or temporarily, allowing the\ncreation and activation of zones with this zone's hostname.",
      )
      .operationId("zones-0-hold-delete")
      .tag("Zone Holds")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Write"])
  })
}

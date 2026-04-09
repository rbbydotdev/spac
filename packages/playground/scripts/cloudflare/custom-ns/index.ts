import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"
import {
  DnsCustomNameserversAcnsResponseCollection,
  DnsCustomNameserversAcnsResponseSingle,
  DnsCustomNameserversCustomnsinput,
  DnsCustomNameserversEmptyResponse,
  DnsCustomNameserversGetResponse,
  DnsCustomNameserversIdentifier,
  DnsCustomNameserversNsName,
  DnsCustomNameserversZoneMetadata,
  UnnamedSchemaRef619309774d07ec6904f1e354560d6028,
} from "./schemas"

export function registerCustomNs(api: Api) {
  api.assertVersion("3.0.3", "CustomNs")

  api
    .get("/accounts/{account_id}/custom_ns", {
      params: Type.Object({ account_id: DnsCustomNameserversIdentifier }),
    })
    .response(DnsCustomNameserversAcnsResponseCollection)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result_info: Type.Optional(
          Type.Object({
            count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
            page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
            per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
            total_count: Type.Optional(
              Type.Number({ description: "Total results available without any search parameters." }),
            ),
          }),
        ),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("List Account Custom Nameservers")
    .description("List an account's custom nameservers.")
    .operationId("account-level-custom-nameservers-list-account-custom-nameservers")
    .tag("Account-Level Custom Nameservers")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write", "Account Settings Read"])
    .extension("x-cfPermissionsRequired", { enum: ["#organization:read"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

  api
    .post("/accounts/{account_id}/custom_ns", {
      params: Type.Object({ account_id: DnsCustomNameserversIdentifier }),
      body: DnsCustomNameserversCustomnsinput,
    })
    .response(DnsCustomNameserversAcnsResponseSingle)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()], { description: "A single account custom nameserver." }),
      }),
    )
    .summary("Add Account Custom Nameserver")
    .operationId("account-level-custom-nameservers-add-account-custom-nameserver")
    .tag("Account-Level Custom Nameservers")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write"])
    .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

  api
    .delete("/accounts/{account_id}/custom_ns/{custom_ns_id}", {
      params: Type.Object({ custom_ns_id: DnsCustomNameserversNsName, account_id: DnsCustomNameserversIdentifier }),
    })
    .response(DnsCustomNameserversEmptyResponse)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result_info: Type.Optional(
          Type.Object({
            count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
            page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
            per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
            total_count: Type.Optional(
              Type.Number({ description: "Total results available without any search parameters." }),
            ),
          }),
        ),
        result: UnnamedSchemaRef619309774d07ec6904f1e354560d6028,
      }),
    )
    .summary("Delete Account Custom Nameserver")
    .operationId("account-level-custom-nameservers-delete-account-custom-nameserver")
    .tag("Account-Level Custom Nameservers")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

  api
    .get("/zones/{zone_id}/custom_ns", {
      params: Type.Object({ zone_id: DlsIdentifier }),
    })
    .response(DnsCustomNameserversGetResponse)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result_info: Type.Optional(
          Type.Object({
            count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
            page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
            per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
            total_count: Type.Optional(
              Type.Number({ description: "Total results available without any search parameters." }),
            ),
          }),
        ),
        enabled: Type.Optional(
          Type.Boolean({ description: "Whether zone uses account-level custom nameservers.", "x-auditable": true }),
        ),
        ns_set: Type.Optional(
          Type.Number({
            description: "The number of the name server set to assign to the zone.",
            default: 1,
            minimum: 1,
            maximum: 5,
            "x-auditable": true,
          }),
        ),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("Get Account Custom Nameserver Related Zone Metadata")
    .description(
      "Get metadata for account-level custom nameservers on a zone.\n\nDeprecated in favor of [Show DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-a-zone-list-dns-settings).\n",
    )
    .operationId(
      "account-level-custom-nameservers-usage-for-a-zone-get-account-custom-nameserver-related-zone-metadata",
    )
    .tag("Account-Level Custom Nameservers Usage for a Zone")
    .deprecated()
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
    .extension("x-cfPermissionsRequired", { enum: ["#zone:read"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

  api
    .put("/zones/{zone_id}/custom_ns", {
      params: Type.Object({ zone_id: DlsIdentifier }),
      body: DnsCustomNameserversZoneMetadata,
    })
    .response(DnsCustomNameserversEmptyResponse)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result_info: Type.Optional(
          Type.Object({
            count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
            page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
            per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
            total_count: Type.Optional(
              Type.Number({ description: "Total results available without any search parameters." }),
            ),
          }),
        ),
        result: UnnamedSchemaRef619309774d07ec6904f1e354560d6028,
      }),
    )
    .summary("Set Account Custom Nameserver Related Zone Metadata")
    .description(
      "Set metadata for account-level custom nameservers on a zone.\n\nIf you would like new zones in the account to use account custom nameservers by default, use PUT /accounts/:identifier to set the account setting use_account_custom_ns_by_default to true.\n\nDeprecated in favor of [Update DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-a-zone-update-dns-settings).\n",
    )
    .operationId(
      "account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata",
    )
    .tag("Account-Level Custom Nameservers Usage for a Zone")
    .deprecated()
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Write"])
    .extension("x-cfPermissionsRequired", { enum: ["#zone:edit"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })
}

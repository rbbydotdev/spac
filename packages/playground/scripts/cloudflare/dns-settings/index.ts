import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier, DnsRecordsPage } from "../shared/schemas"
import {
  DnsSettingsAccountSettingsPatch,
  DnsSettingsDirection,
  DnsSettingsDnsResponseSingle,
  DnsSettingsDnsSettingsZonePatch,
  DnsSettingsDnsViewPatch,
  DnsSettingsDnsViewPost,
  DnsSettingsDnsViewResponseCollection,
  DnsSettingsDnsViewResponseSingle,
  DnsSettingsMatch,
  DnsSettingsOrder,
  DnsSettingsPerPage,
  DnsSettingsSchemasDnsResponseSingle,
} from "./schemas"

export function registerDnsSettings(api: Api) {
  api.assertVersion("3.0.3", "DnsSettings")

  api
    .get("/accounts/{account_id}/dns_settings", {
      params: Type.Object({ account_id: DlsIdentifier }),
    })
    .response(DnsSettingsDnsResponseSingle)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("Show DNS Settings")
    .description("Show DNS settings for an account")
    .operationId("dns-settings-for-an-account-list-dns-settings")
    .tag("DNS Settings for an Account")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account DNS Settings Write", "Account DNS Settings Read"])
    .extension("x-cfPermissionsRequired", { enum: ["#dns_records:read"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .patch("/accounts/{account_id}/dns_settings", {
      params: Type.Object({ account_id: DlsIdentifier }),
      body: DnsSettingsAccountSettingsPatch,
    })
    .response(DnsSettingsDnsResponseSingle)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("Update DNS Settings")
    .description("Update DNS settings for an account")
    .operationId("dns-settings-for-an-account-update-dns-settings")
    .tag("DNS Settings for an Account")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account DNS Settings Write"])
    .extension("x-cfPermissionsRequired", { enum: ["#dns_records:read"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .get("/accounts/{account_id}/dns_settings/views", {
      params: Type.Object({ account_id: DlsIdentifier }),
      query: Type.Object({
        name: Type.Optional(
          Type.String({
            description: "Exact value of the DNS view name. This is a convenience alias for `name.exact`.\n",
          }),
        ),
        "name.exact": Type.Optional(Type.String({ description: "Exact value of the DNS view name.\n" })),
        "name.contains": Type.Optional(Type.String({ description: "Substring of the DNS view name.\n" })),
        "name.startswith": Type.Optional(Type.String({ description: "Prefix of the DNS view name.\n" })),
        "name.endswith": Type.Optional(Type.String({ description: "Suffix of the DNS view name.\n" })),
        zone_id: Type.Optional(Type.String({ description: "A zone ID that exists in the zones list for the view.\n" })),
        zone_name: Type.Optional(
          Type.String({ description: "A zone name that exists in the zones list for the view.\n" }),
        ),
        match: Type.Optional(DnsSettingsMatch),
        page: Type.Optional(DnsRecordsPage),
        per_page: Type.Optional(DnsSettingsPerPage),
        order: Type.Optional(DnsSettingsOrder),
        direction: Type.Optional(DnsSettingsDirection),
      }),
    })
    .response(DnsSettingsDnsViewResponseCollection)
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
    .summary("List Internal DNS Views")
    .description("List DNS Internal Views for an Account")
    .operationId("dns-views-for-an-account-list-internal-dns-views")
    .tag("DNS Internal Views for an Account")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["DNS View Write", "DNS View Read"])
    .extension("x-cfPermissionsRequired", { enum: ["#dns.view:list"] })
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .post("/accounts/{account_id}/dns_settings/views", {
      params: Type.Object({ account_id: DlsIdentifier }),
      body: DnsSettingsDnsViewPost,
    })
    .response(DnsSettingsDnsViewResponseSingle)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("Create Internal DNS View")
    .description("Create Internal DNS View for an account")
    .operationId("dns-views-for-an-account-create-internal-dns-views")
    .tag("DNS Internal Views for an Account")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["DNS View Write"])
    .extension("x-cfPermissionsRequired", { enum: ["#dns.view:create"] })
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .get("/accounts/{account_id}/dns_settings/views/{view_id}", {
      params: Type.Object({ account_id: DlsIdentifier, view_id: DlsIdentifier }),
    })
    .response(DnsSettingsDnsViewResponseSingle)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("DNS Internal View Details")
    .description("Get DNS Internal View")
    .operationId("dns-views-for-an-account-get-internal-dns-view")
    .tag("DNS Internal Views for an Account")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["DNS View Write", "DNS View Read"])
    .extension("x-cfPermissionsRequired", { enum: ["#dns.view:read"] })
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .patch("/accounts/{account_id}/dns_settings/views/{view_id}", {
      params: Type.Object({ account_id: DlsIdentifier, view_id: DlsIdentifier }),
      body: DnsSettingsDnsViewPatch,
    })
    .response(DnsSettingsDnsViewResponseSingle)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("Update Internal DNS View")
    .description("Update an existing Internal DNS View")
    .operationId("dns-views-for-an-account-update-internal-dns-view")
    .tag("DNS Internal Views for an Account")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["DNS View Write"])
    .extension("x-cfPermissionsRequired", { enum: ["#dns.view:update"] })
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .delete("/accounts/{account_id}/dns_settings/views/{view_id}", {
      params: Type.Object({ account_id: DlsIdentifier, view_id: DlsIdentifier }),
    })
    .response(
      Type.Object({
        result: Type.Optional(
          Type.Object({
            id: Type.Optional(DlsIdentifier),
          }),
        ),
      }),
    )
    .error(
      "4XX",
      Type.Object({
        result: Type.Union([Type.Null()]),
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
      }),
    )
    .summary("Delete Internal DNS View")
    .description("Delete an existing Internal DNS View")
    .operationId("dns-views-for-an-account-delete-internal-dns-view")
    .tag("DNS Internal Views for an Account")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["DNS View Write"])
    .extension("x-cfPermissionsRequired", { enum: ["#dns.view:delete"] })
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .get("/zones/{zone_id}/dns_settings", {
      params: Type.Object({ zone_id: DlsIdentifier }),
    })
    .response(DnsSettingsSchemasDnsResponseSingle)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("Show DNS Settings")
    .description("Show DNS settings for a zone")
    .operationId("dns-settings-for-a-zone-list-dns-settings")
    .tag("DNS Settings for a Zone")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone DNS Settings Write", "Zone DNS Settings Read", "DNS Read", "DNS Write"])
    .extension("x-cfPermissionsRequired", { enum: ["#dns_records:read"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .patch("/zones/{zone_id}/dns_settings", {
      params: Type.Object({ zone_id: DlsIdentifier }),
      body: DnsSettingsDnsSettingsZonePatch,
    })
    .response(DnsSettingsSchemasDnsResponseSingle)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()]),
      }),
    )
    .summary("Update DNS Settings")
    .description("Update DNS settings for a zone")
    .operationId("dns-settings-for-a-zone-update-dns-settings")
    .tag("DNS Settings for a Zone")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone DNS Settings Write", "DNS Write"])
    .extension("x-cfPermissionsRequired", { enum: ["#dns_records:read"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
}

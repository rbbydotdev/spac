import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages } from "../shared/schemas"
import {
  TlsCertificatesAndHostnamesComponentsSchemasHostname,
  TlsCertificatesAndHostnamesPerHostnameSettingsResponse,
  TlsCertificatesAndHostnamesPerHostnameSettingsResponseCollection,
  TlsCertificatesAndHostnamesPerHostnameSettingsResponseDelete,
  TlsCertificatesAndHostnamesValue,
} from "./schemas"

export function registerHostnames(api: Api) {
  api.assertVersion("3.0.3", "Hostnames")

  api.group(
    "/zones/{zone_id}/hostnames/settings/{setting_id}",
    { params: Type.Object({ zone_id: Type.String(), setting_id: Type.String() }) },
    (g) => {
      g.get("/", {})
        .response(TlsCertificatesAndHostnamesPerHostnameSettingsResponseCollection)
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
                count: Type.Optional(
                  Type.Number({ description: "Total number of results for the requested service." }),
                ),
                page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
                per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
                total_count: Type.Optional(
                  Type.Number({ description: "Total results available without any search parameters." }),
                ),
                total_pages: Type.Optional(Type.Number({ description: "Total pages available of results" })),
              }),
            ),
            result: Type.Union([Type.Null()]),
          }),
        )
        .summary("List TLS setting for hostnames")
        .description("List the requested TLS setting for the hostnames under this zone.")
        .operationId("per-hostname-tls-settings-list")
        .tag("Per-Hostname TLS Settings")
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
        .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.get("/{hostname}", {
        params: Type.Object({ hostname: TlsCertificatesAndHostnamesComponentsSchemasHostname }),
      })
        .response(TlsCertificatesAndHostnamesPerHostnameSettingsResponse)
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
        .summary("Get TLS setting for hostname")
        .description("Get the requested TLS setting for the hostname.")
        .operationId("per-hostname-tls-settings-get")
        .tag("Per-Hostname TLS Settings")
        .security({ api_email: [], api_key: [] })
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.put("/{hostname}", {
        params: Type.Object({ hostname: TlsCertificatesAndHostnamesComponentsSchemasHostname }),
        body: Type.Object({
          value: TlsCertificatesAndHostnamesValue,
        }),
      })
        .response(TlsCertificatesAndHostnamesPerHostnameSettingsResponse)
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
        .summary("Edit TLS setting for hostname")
        .description("Update the tls setting value for the hostname.")
        .operationId("per-hostname-tls-settings-put")
        .tag("Per-Hostname TLS Settings")
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["SSL and Certificates Write"])
        .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.delete("/{hostname}", {
        params: Type.Object({ hostname: TlsCertificatesAndHostnamesComponentsSchemasHostname }),
      })
        .response(TlsCertificatesAndHostnamesPerHostnameSettingsResponseDelete)
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
        .summary("Delete TLS setting for hostname")
        .description("Delete the tls setting value for the hostname.")
        .operationId("per-hostname-tls-settings-delete")
        .tag("Per-Hostname TLS Settings")
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["SSL and Certificates Write"])
        .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
    },
  )
}

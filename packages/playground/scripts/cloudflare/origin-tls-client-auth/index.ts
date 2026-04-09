import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier, TlsCertificatesAndHostnamesPrivateKey } from "../shared/schemas"
import {
  TlsCertificatesAndHostnamesCertificateobject,
  TlsCertificatesAndHostnamesComponentsSchemasCertificateResponseCollection,
  TlsCertificatesAndHostnamesComponentsSchemasCertificateResponseSingle,
  TlsCertificatesAndHostnamesConfig,
  TlsCertificatesAndHostnamesEnabledResponse,
  TlsCertificatesAndHostnamesHostnameAopResponseCollection,
  TlsCertificatesAndHostnamesHostnameAopSingleResponse,
  TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasCertificate,
  TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasCertificateResponseSingle,
  TlsCertificatesAndHostnamesSchemasHostname,
  TlsCertificatesAndHostnamesSchemasPrivateKey,
  TlsCertificatesAndHostnamesZoneAuthenticatedOriginPullComponentsSchemasCertificate,
  TlsCertificatesAndHostnamesZoneAuthenticatedOriginPullComponentsSchemasEnabled,
  UnnamedSchemaRefD182888b36f93a765d9ce5aefa3009e9,
} from "./schemas"

export function registerOriginTlsClientAuth(api: Api) {
  api.assertVersion("3.0.3", "OriginTlsClientAuth")

  api.group("/zones/{zone_id}/origin_tls_client_auth", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {})
      .response(TlsCertificatesAndHostnamesComponentsSchemasCertificateResponseCollection)
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
      .summary("List Certificates")
      .operationId("zone-level-authenticated-origin-pulls-list-certificates")
      .tag("Zone-Level Authenticated Origin Pulls")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/", {
      body: Type.Object({
        certificate: TlsCertificatesAndHostnamesZoneAuthenticatedOriginPullComponentsSchemasCertificate,
        private_key: TlsCertificatesAndHostnamesPrivateKey,
      }),
    })
      .response(TlsCertificatesAndHostnamesComponentsSchemasCertificateResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Intersect([TlsCertificatesAndHostnamesCertificateobject]),
        }),
      )
      .summary("Upload Certificate")
      .description(
        "Upload your own certificate you want Cloudflare to use for edge-to-origin communication to override the shared certificate. Please note that it is important to keep only one certificate active. Also, make sure to enable zone-level authenticated origin pulls by making a PUT call to settings endpoint to see the uploaded certificate in use.",
      )
      .operationId("zone-level-authenticated-origin-pulls-upload-certificate")
      .tag("Zone-Level Authenticated Origin Pulls")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/hostnames", {
      body: Type.Object({
        config: TlsCertificatesAndHostnamesConfig,
      }),
    })
      .response(TlsCertificatesAndHostnamesHostnameAopResponseCollection)
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
      .summary("Enable or Disable a Hostname for Client Authentication")
      .description(
        "Associate a hostname to a certificate and enable, disable or invalidate the association. If disabled, client certificate will not be sent to the hostname even if activated at the zone level. 100 maximum associations on a single certificate are allowed. Note: Use a null value for parameter *enabled* to invalidate the association.",
      )
      .operationId("per-hostname-authenticated-origin-pull-enable-or-disable-a-hostname-for-client-authentication")
      .tag("Per-hostname Authenticated Origin Pull")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/hostnames/certificates", {})
      .response(TlsCertificatesAndHostnamesHostnameAopResponseCollection)
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
      .summary("List Certificates")
      .operationId("per-hostname-authenticated-origin-pull-list-certificates")
      .tag("Per-hostname Authenticated Origin Pull")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/hostnames/certificates", {
      body: Type.Object({
        certificate: TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasCertificate,
        private_key: TlsCertificatesAndHostnamesSchemasPrivateKey,
      }),
    })
      .response(TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasCertificateResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: UnnamedSchemaRefD182888b36f93a765d9ce5aefa3009e9,
        }),
      )
      .summary("Upload a Hostname Client Certificate")
      .description(
        "Upload a certificate to be used for client authentication on a hostname. 10 hostname certificates per zone are allowed.",
      )
      .operationId("per-hostname-authenticated-origin-pull-upload-a-hostname-client-certificate")
      .tag("Per-hostname Authenticated Origin Pull")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/hostnames/certificates/{certificate_id}", {
      params: Type.Object({ certificate_id: DlsIdentifier }),
    })
      .response(TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasCertificateResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: UnnamedSchemaRefD182888b36f93a765d9ce5aefa3009e9,
        }),
      )
      .summary("Get the Hostname Client Certificate")
      .description("Get the certificate by ID to be used for client authentication on a hostname.")
      .operationId("per-hostname-authenticated-origin-pull-get-the-hostname-client-certificate")
      .tag("Per-hostname Authenticated Origin Pull")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/hostnames/certificates/{certificate_id}", {
      params: Type.Object({ certificate_id: DlsIdentifier }),
    })
      .response(TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasCertificateResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: UnnamedSchemaRefD182888b36f93a765d9ce5aefa3009e9,
        }),
      )
      .summary("Delete Hostname Client Certificate")
      .operationId("per-hostname-authenticated-origin-pull-delete-hostname-client-certificate")
      .tag("Per-hostname Authenticated Origin Pull")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/hostnames/{hostname}", {
      params: Type.Object({ hostname: TlsCertificatesAndHostnamesSchemasHostname }),
    })
      .response(TlsCertificatesAndHostnamesHostnameAopSingleResponse)
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
      .summary("Get the Hostname Status for Client Authentication")
      .operationId("per-hostname-authenticated-origin-pull-get-the-hostname-status-for-client-authentication")
      .tag("Per-hostname Authenticated Origin Pull")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/settings", {})
      .response(TlsCertificatesAndHostnamesEnabledResponse)
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
      .summary("Get Enablement Setting for Zone")
      .description("Get whether zone-level authenticated origin pulls is enabled or not. It is false by default.")
      .operationId("zone-level-authenticated-origin-pulls-get-enablement-setting-for-zone")
      .tag("Zone-Level Authenticated Origin Pulls")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/settings", {
      body: Type.Object({
        enabled: TlsCertificatesAndHostnamesZoneAuthenticatedOriginPullComponentsSchemasEnabled,
      }),
    })
      .response(TlsCertificatesAndHostnamesEnabledResponse)
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
      .summary("Set Enablement for Zone")
      .description(
        "Enable or disable zone-level authenticated origin pulls. 'enabled' should be set true either before/after the certificate is uploaded to see the certificate in use.",
      )
      .operationId("zone-level-authenticated-origin-pulls-set-enablement-for-zone")
      .tag("Zone-Level Authenticated Origin Pulls")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{certificate_id}", {
      params: Type.Object({ certificate_id: DlsIdentifier }),
    })
      .response(TlsCertificatesAndHostnamesComponentsSchemasCertificateResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Intersect([TlsCertificatesAndHostnamesCertificateobject]),
        }),
      )
      .summary("Get Certificate Details")
      .operationId("zone-level-authenticated-origin-pulls-get-certificate-details")
      .tag("Zone-Level Authenticated Origin Pulls")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{certificate_id}", {
      params: Type.Object({ certificate_id: DlsIdentifier }),
    })
      .response(TlsCertificatesAndHostnamesComponentsSchemasCertificateResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Intersect([TlsCertificatesAndHostnamesCertificateobject]),
        }),
      )
      .summary("Delete Certificate")
      .operationId("zone-level-authenticated-origin-pulls-delete-certificate")
      .tag("Zone-Level Authenticated Origin Pulls")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

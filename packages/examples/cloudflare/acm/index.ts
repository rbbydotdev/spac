import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier, TlsCertificatesAndHostnamesKeylessResponseSingleId } from "../shared/schemas"
import {
  TlsCertificatesAndHostnamesComponentsSchemasCertificate,
  TlsCertificatesAndHostnamesComponentsSchemasCertificateAuthority,
  TlsCertificatesAndHostnamesComponentsSchemasEnabled,
  TlsCertificatesAndHostnamesCustomTrustStoreResponseCollection,
  TlsCertificatesAndHostnamesCustomTrustStoreResponseSingle,
  TlsCertificatesAndHostnamesTotalTlsSettingsResponse,
} from "./schemas"

export function registerAcm(api: Api) {
  api.group("/zones/{zone_id}/acm", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/custom_trust_store", {
      query: Type.Object({
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Number of records per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
        limit: Type.Optional(Type.Integer({ description: "Limit to the number of records returned." })),
        offset: Type.Optional(Type.Integer({ description: "Offset the results" })),
      }),
      responses: {
        200: TlsCertificatesAndHostnamesCustomTrustStoreResponseCollection,
        "4XX": Type.Object({
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
      },
    })
      .summary("List Custom Origin Trust Store Details")
      .description("Get Custom Origin Trust Store for a Zone.")
      .operationId("custom-origin-trust-store-list-details")
      .tag("Custom Origin Trust Store")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/custom_trust_store", {
      body: Type.Object({
        certificate: TlsCertificatesAndHostnamesComponentsSchemasCertificate,
      }),
      responses: {
        200: TlsCertificatesAndHostnamesCustomTrustStoreResponseSingle,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Upload Custom Origin Trust Store")
      .description("Add Custom Origin Trust Store for a Zone.")
      .operationId("custom-origin-trust-store-create")
      .tag("Custom Origin Trust Store")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read", "#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/custom_trust_store/{custom_origin_trust_store_id}", {
      params: Type.Object({ custom_origin_trust_store_id: DlsIdentifier }),
      responses: {
        200: TlsCertificatesAndHostnamesCustomTrustStoreResponseSingle,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Custom Origin Trust Store Details")
      .operationId("custom-origin-trust-store-details")
      .tag("Custom Origin Trust Store")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/custom_trust_store/{custom_origin_trust_store_id}", {
      params: Type.Object({ custom_origin_trust_store_id: DlsIdentifier }),
      responses: {
        200: TlsCertificatesAndHostnamesKeylessResponseSingleId,
        "4XX": Type.Object(
          {
            errors: DlpMessages,
            messages: DlpMessages,
            result: Type.Union([Type.Null()]),
            success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
          },
          { description: "Identifier.", "x-auditable": true },
        ),
      },
    })
      .summary("Delete Custom Origin Trust Store")
      .operationId("custom-origin-trust-store-delete")
      .tag("Custom Origin Trust Store")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read", "#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/total_tls", {
      responses: {
        200: TlsCertificatesAndHostnamesTotalTlsSettingsResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Total TLS Settings Details")
      .description("Get Total TLS Settings for a Zone.")
      .operationId("total-tls-total-tls-settings-details")
      .tag("Total TLS")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/total_tls", {
      body: Type.Object({
        certificate_authority: Type.Optional(TlsCertificatesAndHostnamesComponentsSchemasCertificateAuthority),
        enabled: TlsCertificatesAndHostnamesComponentsSchemasEnabled,
      }),
      responses: {
        200: TlsCertificatesAndHostnamesTotalTlsSettingsResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Enable or Disable Total TLS")
      .description("Set Total TLS Settings or disable the feature for a Zone.")
      .operationId("total-tls-enable-or-disable-total-tls")
      .tag("Total TLS")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read", "#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  CacheApiResponseCommonFailure,
  CacheApiResponseSingleId,
  DlpMessages,
  DlsIdentifier,
  Identifier,
  TlsCertificatesAndHostnamesBundleMethod,
  TlsCertificatesAndHostnamesCertificate,
  TlsCertificatesAndHostnamesKeylessResponseSingleId,
} from "../shared/schemas"
import {
  TlsCertificatesAndHostnamesAdvancedCertificatePackResponseSingle,
  TlsCertificatesAndHostnamesAdvancedType,
  TlsCertificatesAndHostnamesCertPackUuid,
  TlsCertificatesAndHostnamesCertificateAnalyzeResponse,
  TlsCertificatesAndHostnamesCertificatePackQuotaResponse,
  TlsCertificatesAndHostnamesCertificatePackResponseCollection,
  TlsCertificatesAndHostnamesCloudflareBranding,
  TlsCertificatesAndHostnamesComponentsSchemasValidationMethod,
  TlsCertificatesAndHostnamesSchemasCertificateAuthority,
  TlsCertificatesAndHostnamesSchemasHosts,
  TlsCertificatesAndHostnamesSslUniversalSettingsResponse,
  TlsCertificatesAndHostnamesSslValidationMethodResponseCollection,
  TlsCertificatesAndHostnamesSslVerificationResponseCollection,
  TlsCertificatesAndHostnamesUniversal,
  TlsCertificatesAndHostnamesValidationMethod,
  TlsCertificatesAndHostnamesValidityDays,
} from "./schemas"

export function registerSsl(api: Api) {
  api.group("/zones/{zone_id}/ssl", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.post("/analyze", {
      body: Type.Object({
        bundle_method: Type.Optional(TlsCertificatesAndHostnamesBundleMethod),
        certificate: Type.Optional(TlsCertificatesAndHostnamesCertificate),
      }),
      responses: {
        200: TlsCertificatesAndHostnamesCertificateAnalyzeResponse,
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
      .summary("Analyze Certificate")
      .description("Returns the set of hostnames, the signature algorithm, and the expiration date of the certificate.")
      .operationId("analyze-certificate-analyze-certificate")
      .tag("Analyze Certificate")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Access: Mutual TLS Certificates Write",
        "Access: Mutual TLS Certificates Read",
        "SSL and Certificates Write",
        "SSL and Certificates Read",
      ])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/certificate_packs", {
      query: Type.Object({
        status: Type.Optional(
          Type.Union([Type.Literal("all")], {
            description: "Include Certificate Packs of all statuses, not just active ones.",
          }),
        ),
      }),
      responses: {
        200: TlsCertificatesAndHostnamesCertificatePackResponseCollection,
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
      .summary("List Certificate Packs")
      .description("For a given zone, list all active certificate packs.")
      .operationId("certificate-packs-list-certificate-packs")
      .tag("Certificate Packs")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/certificate_packs/order", {
      body: Type.Object({
        certificate_authority: TlsCertificatesAndHostnamesSchemasCertificateAuthority,
        cloudflare_branding: Type.Optional(TlsCertificatesAndHostnamesCloudflareBranding),
        hosts: TlsCertificatesAndHostnamesSchemasHosts,
        type: TlsCertificatesAndHostnamesAdvancedType,
        validation_method: TlsCertificatesAndHostnamesValidationMethod,
        validity_days: TlsCertificatesAndHostnamesValidityDays,
      }),
      responses: {
        200: TlsCertificatesAndHostnamesAdvancedCertificatePackResponseSingle,
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
      .summary("Order Advanced Certificate Manager Certificate Pack")
      .description("For a given zone, order an advanced certificate pack.")
      .operationId("certificate-packs-order-advanced-certificate-manager-certificate-pack")
      .tag("Certificate Packs")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read", "#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/certificate_packs/quota", {
      responses: {
        200: TlsCertificatesAndHostnamesCertificatePackQuotaResponse,
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
      .summary("Get Certificate Pack Quotas")
      .description("For a given zone, list certificate pack quotas.")
      .operationId("certificate-packs-get-certificate-pack-quotas")
      .tag("Certificate Packs")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/certificate_packs/{certificate_pack_id}", {
      params: Type.Object({ certificate_pack_id: DlsIdentifier }),
      responses: {
        200: TlsCertificatesAndHostnamesCertificateAnalyzeResponse,
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
      .summary("Get Certificate Pack")
      .description("For a given zone, get a certificate pack.")
      .operationId("certificate-packs-get-certificate-pack")
      .tag("Certificate Packs")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/certificate_packs/{certificate_pack_id}", {
      params: Type.Object({ certificate_pack_id: DlsIdentifier }),
      body: Type.Object({
        cloudflare_branding: Type.Optional(TlsCertificatesAndHostnamesCloudflareBranding),
      }),
      responses: {
        200: TlsCertificatesAndHostnamesAdvancedCertificatePackResponseSingle,
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
      .summary("Restart Validation or Update Advanced Certificate Manager Certificate Pack")
      .description(
        "For a given zone, restart validation or add cloudflare branding for an advanced certificate pack.  The former is only a validation operation for a Certificate Pack in a validation_timed_out status.",
      )
      .operationId("certificate-packs-restart-validation-for-advanced-certificate-manager-certificate-pack")
      .tag("Certificate Packs")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read", "#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/certificate_packs/{certificate_pack_id}", {
      params: Type.Object({ certificate_pack_id: DlsIdentifier }),
      responses: {
        200: TlsCertificatesAndHostnamesKeylessResponseSingleId,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Identifier,
        }),
      },
    })
      .summary("Delete Advanced Certificate Manager Certificate Pack")
      .description("For a given zone, delete an advanced certificate pack.")
      .operationId("certificate-packs-delete-advanced-certificate-manager-certificate-pack")
      .tag("Certificate Packs")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read", "#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/recommendation", {
      responses: {
        200: CacheApiResponseSingleId,
        "4XX": CacheApiResponseCommonFailure,
      },
    })
      .summary("SSL/TLS Recommendation")
      .description("Retrieve the SSL/TLS Recommender's recommendation for a zone.")
      .operationId("ssl/-tls-mode-recommendation-ssl/-tls-recommendation")
      .tag("SSL/TLS Mode Recommendation")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Zone Settings Write",
        "Zone Settings Read",
        "SSL and Certificates Write",
        "SSL and Certificates Read",
      ])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
      .extension(
        "x-stainless-deprecation-message",
        "SSL/TLS Recommender has been decommissioned in favor of Automatic SSL/TLS",
      )

    g.get("/universal/settings", {
      responses: {
        200: TlsCertificatesAndHostnamesSslUniversalSettingsResponse,
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
      .summary("Universal SSL Settings Details")
      .description("Get Universal SSL Settings for a Zone.")
      .operationId("universal-ssl-settings-for-a-zone-universal-ssl-settings-details")
      .tag("Universal SSL Settings for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/universal/settings", {
      body: TlsCertificatesAndHostnamesUniversal,
      responses: {
        200: TlsCertificatesAndHostnamesSslUniversalSettingsResponse,
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
      .summary("Edit Universal SSL Settings")
      .description("Patch Universal SSL Settings for a Zone.")
      .operationId("universal-ssl-settings-for-a-zone-edit-universal-ssl-settings")
      .tag("Universal SSL Settings for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read", "#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/verification", {
      query: Type.Object({
        retry: Type.Optional(Type.Union([Type.Literal(true)], { description: "Immediately retry SSL Verification." })),
      }),
      responses: {
        200: TlsCertificatesAndHostnamesSslVerificationResponseCollection,
        "4XX": Type.Object({
          result: Type.Union([Type.Null()]),
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      },
    })
      .summary("SSL Verification Details")
      .description("Get SSL Verification Info for a Zone.")
      .operationId("ssl-verification-ssl-verification-details")
      .tag("SSL Verification")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Access: Mutual TLS Certificates Write",
        "Access: Mutual TLS Certificates Read",
        "SSL and Certificates Write",
        "SSL and Certificates Read",
      ])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/verification/{certificate_pack_id}", {
      params: Type.Object({ certificate_pack_id: TlsCertificatesAndHostnamesCertPackUuid }),
      body: TlsCertificatesAndHostnamesComponentsSchemasValidationMethod,
      responses: {
        200: TlsCertificatesAndHostnamesSslValidationMethodResponseCollection,
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
      .summary("Edit SSL Certificate Pack Validation Method")
      .description(
        "Edit SSL validation method for a certificate pack. A PATCH request will request an immediate validation check on any certificate, and return the updated status. If a validation method is provided, the validation will be immediately attempted using that method.",
      )
      .operationId("ssl-verification-edit-ssl-certificate-pack-validation-method")
      .tag("SSL Verification")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Access: Mutual TLS Certificates Write",
        "Access: Mutual TLS Certificates Read",
        "SSL and Certificates Write",
        "SSL and Certificates Read",
      ])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read", "#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

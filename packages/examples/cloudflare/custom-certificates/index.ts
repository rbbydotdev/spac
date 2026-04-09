import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  DlpMessages,
  DlsIdentifier,
  Identifier,
  TlsCertificatesAndHostnamesBundleMethod,
  TlsCertificatesAndHostnamesCertificate,
  TlsCertificatesAndHostnamesKeylessResponseSingleId,
  TlsCertificatesAndHostnamesPrivateKey,
} from "../shared/schemas"
import {
  TlsCertificatesAndHostnamesCertificateResponseCollection,
  TlsCertificatesAndHostnamesCertificateResponseSingle,
  TlsCertificatesAndHostnamesGeoRestrictions,
  TlsCertificatesAndHostnamesPolicy,
  TlsCertificatesAndHostnamesPriority,
  TlsCertificatesAndHostnamesType,
} from "./schemas"

export function registerCustomCertificates(api: Api) {
  api.group("/zones/{zone_id}/custom_certificates", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Number of zones per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
        match: Type.Optional(
          Type.Union([Type.Literal("any"), Type.Literal("all")], {
            description: "Whether to match all search requirements or at least one (any).",
          }),
        ),
        status: Type.Optional(
          Type.Union(
            [
              Type.Literal("active"),
              Type.Literal("expired"),
              Type.Literal("deleted"),
              Type.Literal("pending"),
              Type.Literal("initializing"),
            ],
            { description: "Status of the zone's custom SSL." },
          ),
        ),
      }),
      responses: {
        200: TlsCertificatesAndHostnamesCertificateResponseCollection,
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
      .summary("List SSL Configurations")
      .description(
        "List, search, and filter all of your custom SSL certificates. The higher priority will break ties across overlapping 'legacy_custom' certificates, but 'legacy_custom' certificates will always supercede 'sni_custom' certificates.",
      )
      .operationId("custom-ssl-for-a-zone-list-ssl-configurations")
      .tag("Custom SSL for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Access: Mutual TLS Certificates Write",
        "Access: Mutual TLS Certificates Read",
        "SSL and Certificates Write",
        "SSL and Certificates Read",
      ])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.post("/", {
      body: Type.Object({
        bundle_method: Type.Optional(TlsCertificatesAndHostnamesBundleMethod),
        certificate: TlsCertificatesAndHostnamesCertificate,
        geo_restrictions: Type.Optional(TlsCertificatesAndHostnamesGeoRestrictions),
        policy: Type.Optional(TlsCertificatesAndHostnamesPolicy),
        private_key: TlsCertificatesAndHostnamesPrivateKey,
        type: Type.Optional(TlsCertificatesAndHostnamesType),
      }),
      responses: {
        200: TlsCertificatesAndHostnamesCertificateResponseSingle,
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
      .summary("Create SSL Configuration")
      .description("Upload a new SSL certificate for a zone.")
      .operationId("custom-ssl-for-a-zone-create-ssl-configuration")
      .tag("Custom SSL for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Mutual TLS Certificates Write", "SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.put("/prioritize", {
      body: Type.Object({
        certificates: Type.Array(
          Type.Object({
            id: Type.Optional(DlsIdentifier),
            priority: Type.Optional(TlsCertificatesAndHostnamesPriority),
          }),
          { description: "Array of ordered certificates." },
        ),
      }),
      responses: {
        200: TlsCertificatesAndHostnamesCertificateResponseCollection,
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
      .summary("Re-prioritize SSL Certificates")
      .description(
        "If a zone has multiple SSL certificates, you can set the order in which they should be used during a request. The higher priority will break ties across overlapping 'legacy_custom' certificates.",
      )
      .operationId("custom-ssl-for-a-zone-re-prioritize-ssl-certificates")
      .tag("Custom SSL for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Mutual TLS Certificates Write", "SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.get("/{custom_certificate_id}", {
      params: Type.Object({ custom_certificate_id: DlsIdentifier }),
      responses: {
        200: TlsCertificatesAndHostnamesCertificateResponseSingle,
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
      .summary("SSL Configuration Details")
      .operationId("custom-ssl-for-a-zone-ssl-configuration-details")
      .tag("Custom SSL for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Access: Mutual TLS Certificates Write",
        "Access: Mutual TLS Certificates Read",
        "SSL and Certificates Write",
        "SSL and Certificates Read",
      ])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.patch("/{custom_certificate_id}", {
      params: Type.Object({ custom_certificate_id: DlsIdentifier }),
      body: Type.Object({
        bundle_method: Type.Optional(TlsCertificatesAndHostnamesBundleMethod),
        certificate: Type.Optional(TlsCertificatesAndHostnamesCertificate),
        geo_restrictions: Type.Optional(TlsCertificatesAndHostnamesGeoRestrictions),
        policy: Type.Optional(TlsCertificatesAndHostnamesPolicy),
        private_key: Type.Optional(TlsCertificatesAndHostnamesPrivateKey),
      }),
      responses: {
        200: TlsCertificatesAndHostnamesCertificateResponseSingle,
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
      .summary("Edit SSL Configuration")
      .description(
        "Upload a new private key and/or PEM/CRT for the SSL certificate. Note: PATCHing a configuration for sni_custom certificates will result in a new resource id being returned, and the previous one being deleted.",
      )
      .operationId("custom-ssl-for-a-zone-edit-ssl-configuration")
      .tag("Custom SSL for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Mutual TLS Certificates Write", "SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.delete("/{custom_certificate_id}", {
      params: Type.Object({ custom_certificate_id: DlsIdentifier }),
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
      .summary("Delete SSL Configuration")
      .description("Remove a SSL certificate from a zone.")
      .operationId("custom-ssl-for-a-zone-delete-ssl-configuration")
      .tag("Custom SSL for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Mutual TLS Certificates Write", "SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })
  })
}

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier, TlsCertificatesAndHostnamesApiResponseCommonFailure } from "../shared/schemas"
import {
  TlsCertificatesAndHostnamesClientCertificateResponseCollection,
  TlsCertificatesAndHostnamesClientCertificateResponseSingle,
  TlsCertificatesAndHostnamesSchemasCsr,
  TlsCertificatesAndHostnamesSchemasValidityDays,
} from "./schemas"

export function registerClientCertificates(api: Api) {
  api.group("/zones/{zone_id}/client_certificates", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        status: Type.Optional(
          Type.Union(
            [
              Type.Literal("all"),
              Type.Literal("active"),
              Type.Literal("pending_reactivation"),
              Type.Literal("pending_revocation"),
              Type.Literal("revoked"),
            ],
            { description: "Client Certitifcate Status to filter results by." },
          ),
        ),
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Number of records per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
        limit: Type.Optional(Type.Integer({ description: "Limit to the number of records returned." })),
        offset: Type.Optional(Type.Integer({ description: "Offset the results" })),
      }),
      responses: {
        200: TlsCertificatesAndHostnamesClientCertificateResponseCollection,
        "4XX": TlsCertificatesAndHostnamesApiResponseCommonFailure,
      },
    })
      .summary("List Client Certificates")
      .description("List all of your Zone's API Shield mTLS Client Certificates by Status and/or using Pagination")
      .operationId("client-certificate-for-a-zone-list-client-certificates")
      .tag("API Shield Client Certificates for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/", {
      body: Type.Object({
        csr: TlsCertificatesAndHostnamesSchemasCsr,
        validity_days: TlsCertificatesAndHostnamesSchemasValidityDays,
      }),
      responses: {
        200: TlsCertificatesAndHostnamesClientCertificateResponseSingle,
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
      .summary("Create Client Certificate")
      .description("Create a new API Shield mTLS Client Certificate")
      .operationId("client-certificate-for-a-zone-create-client-certificate")
      .tag("API Shield Client Certificates for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{client_certificate_id}", {
      params: Type.Object({ client_certificate_id: DlsIdentifier }),
      responses: {
        200: TlsCertificatesAndHostnamesClientCertificateResponseSingle,
        "4XX": TlsCertificatesAndHostnamesApiResponseCommonFailure,
      },
    })
      .summary("Client Certificate Details")
      .description("Get Details for a single mTLS API Shield Client Certificate")
      .operationId("client-certificate-for-a-zone-client-certificate-details")
      .tag("API Shield Client Certificates for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/{client_certificate_id}", {
      params: Type.Object({ client_certificate_id: DlsIdentifier }),
      responses: {
        200: TlsCertificatesAndHostnamesClientCertificateResponseSingle,
        "4XX": TlsCertificatesAndHostnamesApiResponseCommonFailure,
      },
    })
      .summary("Reactivate Client Certificate")
      .description(
        "If a API Shield mTLS Client Certificate is in a pending_revocation state, you may reactivate it with this endpoint.",
      )
      .operationId("client-certificate-for-a-zone-edit-client-certificate")
      .tag("API Shield Client Certificates for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{client_certificate_id}", {
      params: Type.Object({ client_certificate_id: DlsIdentifier }),
      responses: {
        200: TlsCertificatesAndHostnamesClientCertificateResponseSingle,
        "4XX": TlsCertificatesAndHostnamesApiResponseCommonFailure,
      },
    })
      .summary("Revoke Client Certificate")
      .description(
        "Set a API Shield mTLS Client Certificate to pending_revocation status for processing to revoked status.",
      )
      .operationId("client-certificate-for-a-zone-delete-client-certificate")
      .tag("API Shield Client Certificates for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

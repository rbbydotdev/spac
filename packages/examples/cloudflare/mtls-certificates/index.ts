import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"
import {
  TlsCertificatesAndHostnamesAssociationResponseCollection,
  TlsCertificatesAndHostnamesCa,
  TlsCertificatesAndHostnamesCertificateResponseSinglePost,
  TlsCertificatesAndHostnamesComponentsSchemasPrivateKey,
  TlsCertificatesAndHostnamesMtlsManagementComponentsSchemasCertificateResponseCollection,
  TlsCertificatesAndHostnamesMtlsManagementComponentsSchemasCertificateResponseSingle,
  TlsCertificatesAndHostnamesSchemasCertificates,
  TlsCertificatesAndHostnamesSchemasName,
} from "./schemas"

export function registerMtlsCertificates(api: Api) {
  api.group("/accounts/{account_id}/mtls_certificates", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      responses: {
        200: TlsCertificatesAndHostnamesMtlsManagementComponentsSchemasCertificateResponseCollection,
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
              total_pages: Type.Optional(Type.Number({ description: "Total pages available of results" })),
            }),
          ),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("List mTLS certificates")
      .description("Lists all mTLS certificates.")
      .operationId("m-tls-certificate-management-list-m-tls-certificates")
      .tag("mTLS Certificate Management")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account: SSL and Certificates Read", "Account: SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/", {
      body: Type.Object({
        ca: TlsCertificatesAndHostnamesCa,
        certificates: TlsCertificatesAndHostnamesSchemasCertificates,
        name: Type.Optional(TlsCertificatesAndHostnamesSchemasName),
        private_key: Type.Optional(TlsCertificatesAndHostnamesComponentsSchemasPrivateKey),
      }),
      responses: {
        200: TlsCertificatesAndHostnamesCertificateResponseSinglePost,
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
      .summary("Upload mTLS certificate")
      .description("Upload a certificate that you want to use with mTLS-enabled Cloudflare services.")
      .operationId("m-tls-certificate-management-upload-m-tls-certificate")
      .tag("mTLS Certificate Management")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account: SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{mtls_certificate_id}", {
      params: Type.Object({ mtls_certificate_id: DlsIdentifier }),
      responses: {
        200: TlsCertificatesAndHostnamesMtlsManagementComponentsSchemasCertificateResponseSingle,
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
      .summary("Get mTLS certificate")
      .description("Fetches a single mTLS certificate.")
      .operationId("m-tls-certificate-management-get-m-tls-certificate")
      .tag("mTLS Certificate Management")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account: SSL and Certificates Read", "Account: SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{mtls_certificate_id}", {
      params: Type.Object({ mtls_certificate_id: DlsIdentifier }),
      responses: {
        200: TlsCertificatesAndHostnamesMtlsManagementComponentsSchemasCertificateResponseSingle,
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
      .summary("Delete mTLS certificate")
      .description("Deletes the mTLS certificate unless the certificate is in use by one or more Cloudflare services.")
      .operationId("m-tls-certificate-management-delete-m-tls-certificate")
      .tag("mTLS Certificate Management")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account: SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{mtls_certificate_id}/associations", {
      params: Type.Object({ mtls_certificate_id: DlsIdentifier }),
      responses: {
        200: TlsCertificatesAndHostnamesAssociationResponseCollection,
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
      .summary("List mTLS certificate associations")
      .description("Lists all active associations between the certificate and Cloudflare services.")
      .operationId("m-tls-certificate-management-list-m-tls-certificate-associations")
      .tag("mTLS Certificate Management")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account: SSL and Certificates Read", "Account: SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

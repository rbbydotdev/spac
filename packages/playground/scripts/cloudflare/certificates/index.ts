import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"
import {
  TlsCertificatesAndHostnamesCertificateRevokeResponse,
  TlsCertificatesAndHostnamesCsr,
  TlsCertificatesAndHostnamesHostnames,
  TlsCertificatesAndHostnamesRequestType,
  TlsCertificatesAndHostnamesRequestedValidity,
  TlsCertificatesAndHostnamesSchemasCertificateResponseCollection,
  TlsCertificatesAndHostnamesSchemasCertificateResponseSingle,
} from "./schemas"

export function registerCertificates(api: Api) {
  api.assertVersion("3.0.3", "Certificates")

  api.group("/certificates", (g) => {
    g.get("/", {
      query: Type.Object({
        zone_id: DlsIdentifier,
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Number of records per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
        limit: Type.Optional(Type.Integer({ description: "Limit to the number of records returned." })),
        offset: Type.Optional(Type.Integer({ description: "Offset the results" })),
      }),
    })
      .response(TlsCertificatesAndHostnamesSchemasCertificateResponseCollection)
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
      .description(
        "List all existing Origin CA certificates for a given zone. You can use an Origin CA Key as your User Service Key or an API token when calling this endpoint ([see above](#requests)).",
      )
      .operationId("origin-ca-list-certificates")
      .tag("Origin CA")
      .security({ user_service_key: [] })
      .security({ api_token: [] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/", {
      body: Type.Object({
        csr: Type.Optional(TlsCertificatesAndHostnamesCsr),
        hostnames: Type.Optional(TlsCertificatesAndHostnamesHostnames),
        request_type: Type.Optional(TlsCertificatesAndHostnamesRequestType),
        requested_validity: Type.Optional(TlsCertificatesAndHostnamesRequestedValidity),
      }),
    })
      .response(TlsCertificatesAndHostnamesSchemasCertificateResponseSingle)
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
      .summary("Create Certificate")
      .description(
        "Create an Origin CA certificate. You can use an Origin CA Key as your User Service Key or an API token when calling this endpoint ([see above](#requests)).",
      )
      .operationId("origin-ca-create-certificate")
      .tag("Origin CA")
      .security({ user_service_key: [] })
      .security({ api_token: [] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{certificate_id}", {
      params: Type.Object({ certificate_id: DlsIdentifier }),
    })
      .response(TlsCertificatesAndHostnamesSchemasCertificateResponseSingle)
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
      .summary("Get Certificate")
      .description(
        "Get an existing Origin CA certificate by its serial number. You can use an Origin CA Key as your User Service Key or an API token when calling this endpoint ([see above](#requests)).",
      )
      .operationId("origin-ca-get-certificate")
      .tag("Origin CA")
      .security({ user_service_key: [] })
      .security({ api_token: [] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{certificate_id}", {
      params: Type.Object({ certificate_id: DlsIdentifier }),
    })
      .response(TlsCertificatesAndHostnamesCertificateRevokeResponse)
      .error(
        "4XX",
        Type.Object({
          result: Type.Union([Type.Null()]),
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Revoke Certificate")
      .description(
        "Revoke an existing Origin CA certificate by its serial number. You can use an Origin CA Key as your User Service Key or an API token when calling this endpoint ([see above](#requests)).",
      )
      .operationId("origin-ca-revoke-certificate")
      .tag("Origin CA")
      .security({ user_service_key: [] })
      .security({ api_token: [] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

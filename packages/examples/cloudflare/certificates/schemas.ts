import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"

export const TlsCertificatesAndHostnamesRevokedAt = named(
  "tls-certificates-and-hostnames_revoked_at",
  Type.String({
    description: "When the certificate was revoked.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesCertificateRevokeResponse = named(
  "tls-certificates-and-hostnames_certificate_revoke_response",
  Type.Object({
    result: Type.Optional(
      Type.Object({
        id: Type.Optional(DlsIdentifier),
        revoked_at: Type.Optional(TlsCertificatesAndHostnamesRevokedAt),
      }),
    ),
  }),
)

export const TlsCertificatesAndHostnamesComponentsSchemasExpiresOn = named(
  "tls-certificates-and-hostnames_components-schemas-expires_on",
  Type.String({ description: "When the certificate will expire.", readOnly: true, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesCertificatesComponentsSchemasCertificate = named(
  "tls-certificates-and-hostnames_certificates_components-schemas-certificate",
  Type.String({ description: "The Origin CA certificate. Will be newline-encoded.", readOnly: true }),
)

export const TlsCertificatesAndHostnamesCsr = named(
  "tls-certificates-and-hostnames_csr",
  Type.String({ description: "The Certificate Signing Request (CSR). Must be newline-encoded." }),
)

export const TlsCertificatesAndHostnamesHostnames = named(
  "tls-certificates-and-hostnames_hostnames",
  Type.Array(Type.String({ "x-auditable": true }), {
    description: "Array of hostnames or wildcard names (e.g., *.example.com) bound to the certificate.",
  }),
)

export const TlsCertificatesAndHostnamesRequestType = named(
  "tls-certificates-and-hostnames_request_type",
  Type.Union([Type.Literal("origin-rsa"), Type.Literal("origin-ecc"), Type.Literal("keyless-certificate")], {
    description:
      'Signature type desired on certificate ("origin-rsa" (rsa), "origin-ecc" (ecdsa), or "keyless-certificate" (for Keyless SSL servers).',
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesRequestedValidity = named(
  "tls-certificates-and-hostnames_requested_validity",
  Type.Union(
    [
      Type.Literal(7),
      Type.Literal(30),
      Type.Literal(90),
      Type.Literal(365),
      Type.Literal(730),
      Type.Literal(1095),
      Type.Literal(5475),
    ],
    { description: "The number of days for which the certificate should be valid.", "x-auditable": true },
  ),
)

export const TlsCertificatesAndHostnamesCertificates = named(
  "tls-certificates-and-hostnames_certificates",
  Type.Object({
    certificate: Type.Optional(TlsCertificatesAndHostnamesCertificatesComponentsSchemasCertificate),
    csr: TlsCertificatesAndHostnamesCsr,
    expires_on: Type.Optional(TlsCertificatesAndHostnamesComponentsSchemasExpiresOn),
    hostnames: TlsCertificatesAndHostnamesHostnames,
    id: Type.Optional(DlsIdentifier),
    request_type: TlsCertificatesAndHostnamesRequestType,
    requested_validity: TlsCertificatesAndHostnamesRequestedValidity,
  }),
)

export const TlsCertificatesAndHostnamesSchemasCertificateResponseSingle = named(
  "tls-certificates-and-hostnames_schemas-certificate_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(TlsCertificatesAndHostnamesCertificates),
  }),
)

export const TlsCertificatesAndHostnamesSchemasCertificateResponseCollection = named(
  "tls-certificates-and-hostnames_schemas-certificate_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
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
    result: Type.Optional(Type.Array(TlsCertificatesAndHostnamesCertificates)),
  }),
)

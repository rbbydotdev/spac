import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"

export const TlsCertificatesAndHostnamesClientCertificatesComponentsSchemasStatus = named(
  "tls-certificates-and-hostnames_client-certificates_components-schemas-status",
  Type.Union(
    [
      Type.Literal("active"),
      Type.Literal("pending_reactivation"),
      Type.Literal("pending_revocation"),
      Type.Literal("revoked"),
    ],
    {
      description:
        "Client Certificates may be active or revoked, and the pending_reactivation or pending_revocation represent in-progress asynchronous transitions",
      "x-auditable": true,
    },
  ),
)

export const TlsCertificatesAndHostnamesState = named(
  "tls-certificates-and-hostnames_state",
  Type.String({ description: "State, provided by the CSR", readOnly: true, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesSki = named(
  "tls-certificates-and-hostnames_ski",
  Type.String({ description: "Subject Key Identifier", readOnly: true, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesComponentsSchemasSignature = named(
  "tls-certificates-and-hostnames_components-schemas-signature",
  Type.String({
    description: "The type of hash used for the Client Certificate..",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesComponentsSchemasSerialNumber = named(
  "tls-certificates-and-hostnames_components-schemas-serial_number",
  Type.String({
    description: "The serial number on the created Client Certificate.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesOrganizationalUnit = named(
  "tls-certificates-and-hostnames_organizational_unit",
  Type.String({ description: "Organizational Unit, provided by the CSR", readOnly: true, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesOrganization = named(
  "tls-certificates-and-hostnames_organization",
  Type.String({ description: "Organization, provided by the CSR", readOnly: true, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesLocation = named(
  "tls-certificates-and-hostnames_location",
  Type.String({ description: "Location, provided by the CSR", readOnly: true, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesIssuedOn = named(
  "tls-certificates-and-hostnames_issued_on",
  Type.String({
    description: "Date that the Client Certificate was issued by the Certificate Authority",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesFingerprintSha256 = named(
  "tls-certificates-and-hostnames_fingerprint_sha256",
  Type.String({ description: "Unique identifier of the Client Certificate", readOnly: true, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesExpiredOn = named(
  "tls-certificates-and-hostnames_expired_on",
  Type.String({ description: "Date that the Client Certificate expires", readOnly: true, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesCountry = named(
  "tls-certificates-and-hostnames_country",
  Type.String({ description: "Country, provided by the CSR", readOnly: true, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesCommonName = named(
  "tls-certificates-and-hostnames_common_name",
  Type.String({ description: "Common Name of the Client Certificate", readOnly: true, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesClientCertificatesComponentsSchemasCertificateAuthority = named(
  "tls-certificates-and-hostnames_client-certificates_components-schemas-certificate_authority",
  Type.Object(
    {
      id: Type.Optional(Type.String({ "x-auditable": true })),
      name: Type.Optional(Type.String({ "x-auditable": true })),
    },
    { description: "Certificate Authority used to issue the Client Certificate" },
  ),
)

export const TlsCertificatesAndHostnamesClientCertificatesComponentsSchemasCertificate = named(
  "tls-certificates-and-hostnames_client-certificates_components-schemas-certificate",
  Type.String({ description: "The Client Certificate PEM", readOnly: true }),
)

export const TlsCertificatesAndHostnamesSchemasCsr = named(
  "tls-certificates-and-hostnames_schemas-csr",
  Type.String({ description: "The Certificate Signing Request (CSR). Must be newline-encoded.", "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesSchemasValidityDays = named(
  "tls-certificates-and-hostnames_schemas-validity_days",
  Type.Integer({
    description: "The number of days the Client Certificate will be valid after the issued_on date",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesClientCertificate = named(
  "tls-certificates-and-hostnames_client_certificate",
  Type.Object({
    certificate: Type.Optional(TlsCertificatesAndHostnamesClientCertificatesComponentsSchemasCertificate),
    certificate_authority: Type.Optional(
      TlsCertificatesAndHostnamesClientCertificatesComponentsSchemasCertificateAuthority,
    ),
    common_name: Type.Optional(TlsCertificatesAndHostnamesCommonName),
    country: Type.Optional(TlsCertificatesAndHostnamesCountry),
    csr: Type.Optional(TlsCertificatesAndHostnamesSchemasCsr),
    expires_on: Type.Optional(TlsCertificatesAndHostnamesExpiredOn),
    fingerprint_sha256: Type.Optional(TlsCertificatesAndHostnamesFingerprintSha256),
    id: Type.Optional(DlsIdentifier),
    issued_on: Type.Optional(TlsCertificatesAndHostnamesIssuedOn),
    location: Type.Optional(TlsCertificatesAndHostnamesLocation),
    organization: Type.Optional(TlsCertificatesAndHostnamesOrganization),
    organizational_unit: Type.Optional(TlsCertificatesAndHostnamesOrganizationalUnit),
    serial_number: Type.Optional(TlsCertificatesAndHostnamesComponentsSchemasSerialNumber),
    signature: Type.Optional(TlsCertificatesAndHostnamesComponentsSchemasSignature),
    ski: Type.Optional(TlsCertificatesAndHostnamesSki),
    state: Type.Optional(TlsCertificatesAndHostnamesState),
    status: Type.Optional(TlsCertificatesAndHostnamesClientCertificatesComponentsSchemasStatus),
    validity_days: Type.Optional(TlsCertificatesAndHostnamesSchemasValidityDays),
  }),
)

export const TlsCertificatesAndHostnamesClientCertificateResponseSingle = named(
  "tls-certificates-and-hostnames_client_certificate_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(TlsCertificatesAndHostnamesClientCertificate),
  }),
)

export const TlsCertificatesAndHostnamesClientCertificateResponseCollection = named(
  "tls-certificates-and-hostnames_client_certificate_response_collection",
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
    result: Type.Optional(Type.Array(TlsCertificatesAndHostnamesClientCertificate)),
  }),
)

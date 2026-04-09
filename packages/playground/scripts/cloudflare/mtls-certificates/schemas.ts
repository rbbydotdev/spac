import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  DlpMessages,
  DlsIdentifier,
  TlsCertificatesAndHostnamesSchemasExpiresOn,
  TlsCertificatesAndHostnamesSignature,
} from "../shared/schemas"

export const TlsCertificatesAndHostnamesService = named(
  "tls-certificates-and-hostnames_service",
  Type.String({ description: "The service using the certificate.", "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesMtlsManagementComponentsSchemasStatus = named(
  "tls-certificates-and-hostnames_mtls-management_components-schemas-status",
  Type.String({ description: "Certificate deployment status for the given service.", "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesAssociationobject = named(
  "tls-certificates-and-hostnames_associationObject",
  Type.Object({
    service: Type.Optional(TlsCertificatesAndHostnamesService),
    status: Type.Optional(TlsCertificatesAndHostnamesMtlsManagementComponentsSchemasStatus),
  }),
)

export const TlsCertificatesAndHostnamesAssociationResponseCollection = named(
  "tls-certificates-and-hostnames_association_response_collection",
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
    result: Type.Optional(Type.Array(TlsCertificatesAndHostnamesAssociationobject)),
  }),
)

export const TlsCertificatesAndHostnamesCa = named(
  "tls-certificates-and-hostnames_ca",
  Type.Boolean({ description: "Indicates whether the certificate is a CA or leaf certificate.", "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesSchemasCertificates = named(
  "tls-certificates-and-hostnames_schemas-certificates",
  Type.String({ description: "The uploaded root CA certificate." }),
)

export const TlsCertificatesAndHostnamesSchemasIssuer = named(
  "tls-certificates-and-hostnames_schemas-issuer",
  Type.String({
    description: "The certificate authority that issued the certificate.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesSchemasName = named(
  "tls-certificates-and-hostnames_schemas-name",
  Type.String({
    description: "Optional unique name for the certificate. Only used for human readability.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesSchemasSerialNumber = named(
  "tls-certificates-and-hostnames_schemas-serial_number",
  Type.String({ description: "The certificate serial number.", readOnly: true, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesMtlsManagementComponentsSchemasUploadedOn = named(
  "tls-certificates-and-hostnames_mtls-management_components-schemas-uploaded_on",
  Type.String({
    description: "This is the time the certificate was uploaded.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesComponentsSchemasCertificateobject = named(
  "tls-certificates-and-hostnames_components-schemas-certificateObject",
  Type.Object({
    ca: Type.Optional(TlsCertificatesAndHostnamesCa),
    certificates: Type.Optional(TlsCertificatesAndHostnamesSchemasCertificates),
    expires_on: Type.Optional(TlsCertificatesAndHostnamesSchemasExpiresOn),
    id: Type.Optional(DlsIdentifier),
    issuer: Type.Optional(TlsCertificatesAndHostnamesSchemasIssuer),
    name: Type.Optional(TlsCertificatesAndHostnamesSchemasName),
    serial_number: Type.Optional(TlsCertificatesAndHostnamesSchemasSerialNumber),
    signature: Type.Optional(TlsCertificatesAndHostnamesSignature),
    uploaded_on: Type.Optional(TlsCertificatesAndHostnamesMtlsManagementComponentsSchemasUploadedOn),
  }),
)

export const TlsCertificatesAndHostnamesMtlsManagementComponentsSchemasCertificateResponseSingle = named(
  "tls-certificates-and-hostnames_mtls-management_components-schemas-certificate_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(TlsCertificatesAndHostnamesComponentsSchemasCertificateobject),
  }),
)

export const TlsCertificatesAndHostnamesMtlsManagementComponentsSchemasUpdatedAt = named(
  "tls-certificates-and-hostnames_mtls-management_components-schemas-updated_at",
  Type.String({
    description: "This is the time the certificate was updated.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesCertificateobjectpost = named(
  "tls-certificates-and-hostnames_certificateObjectPost",
  Type.Object({
    ca: Type.Optional(TlsCertificatesAndHostnamesCa),
    certificates: Type.Optional(TlsCertificatesAndHostnamesSchemasCertificates),
    expires_on: Type.Optional(TlsCertificatesAndHostnamesSchemasExpiresOn),
    id: Type.Optional(DlsIdentifier),
    issuer: Type.Optional(TlsCertificatesAndHostnamesSchemasIssuer),
    name: Type.Optional(TlsCertificatesAndHostnamesSchemasName),
    serial_number: Type.Optional(TlsCertificatesAndHostnamesSchemasSerialNumber),
    signature: Type.Optional(TlsCertificatesAndHostnamesSignature),
    updated_at: Type.Optional(TlsCertificatesAndHostnamesMtlsManagementComponentsSchemasUpdatedAt),
    uploaded_on: Type.Optional(TlsCertificatesAndHostnamesMtlsManagementComponentsSchemasUploadedOn),
  }),
)

export const TlsCertificatesAndHostnamesCertificateResponseSinglePost = named(
  "tls-certificates-and-hostnames_certificate_response_single_post",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(TlsCertificatesAndHostnamesCertificateobjectpost),
  }),
)

export const TlsCertificatesAndHostnamesComponentsSchemasPrivateKey = named(
  "tls-certificates-and-hostnames_components-schemas-private_key",
  Type.String({
    description:
      "The private key for the certificate. This field is only needed for specific use cases such as using a custom certificate with Zero Trust's block page.",
    "x-sensitive": true,
  }),
)

export const TlsCertificatesAndHostnamesMtlsManagementComponentsSchemasCertificateResponseCollection = named(
  "tls-certificates-and-hostnames_mtls-management_components-schemas-certificate_response_collection",
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
        total_pages: Type.Optional(Type.Number({ description: "Total pages available of results" })),
      }),
    ),
    result: Type.Optional(Type.Array(TlsCertificatesAndHostnamesComponentsSchemasCertificateobject)),
  }),
)

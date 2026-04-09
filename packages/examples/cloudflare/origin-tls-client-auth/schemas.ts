import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  DlpMessages,
  DlsIdentifier,
  TlsCertificatesAndHostnamesIssuer,
  TlsCertificatesAndHostnamesSignature,
} from "../shared/schemas"

export const TlsCertificatesAndHostnamesZoneAuthenticatedOriginPullComponentsSchemasEnabled = named(
  "tls-certificates-and-hostnames_zone-authenticated-origin-pull_components-schemas-enabled",
  Type.Boolean({
    description: "Indicates whether zone-level authenticated origin pulls is enabled.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesEnabledResponse = named(
  "tls-certificates-and-hostnames_enabled_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        enabled: Type.Optional(TlsCertificatesAndHostnamesZoneAuthenticatedOriginPullComponentsSchemasEnabled),
      }),
    ),
  }),
)

export const TlsCertificatesAndHostnamesSerialNumber = named(
  "tls-certificates-and-hostnames_serial_number",
  Type.String({ description: "The serial number on the uploaded certificate.", "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesSchemasHostname = named(
  "tls-certificates-and-hostnames_schemas-hostname",
  Type.String({
    description: "The hostname on the origin for which the client certificate uploaded will be used.",
    maxLength: 255,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasExpiresOn = named(
  "tls-certificates-and-hostnames_hostname-authenticated-origin-pull_components-schemas-expires_on",
  Type.String({
    description: "The date when the certificate expires.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasEnabled = named(
  "tls-certificates-and-hostnames_hostname-authenticated-origin-pull_components-schemas-enabled",
  Type.Union([
    Type.Boolean({
      description:
        "Indicates whether hostname-level authenticated origin pulls is enabled. A null value voids the association.",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const TlsCertificatesAndHostnamesComponentsSchemasCreatedAt = named(
  "tls-certificates-and-hostnames_components-schemas-created_at",
  Type.String({
    description: "The time when the certificate was created.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesComponentsSchemasUploadedOn = named(
  "tls-certificates-and-hostnames_components-schemas-uploaded_on",
  Type.String({ description: "The time when the certificate was uploaded.", format: "date-time", "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesComponentsSchemasUpdatedAt = named(
  "tls-certificates-and-hostnames_components-schemas-updated_at",
  Type.String({
    description: "The time when the certificate was updated.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasStatus = named(
  "tls-certificates-and-hostnames_hostname-authenticated-origin-pull_components-schemas-status",
  Type.Union(
    [
      Type.Literal("initializing"),
      Type.Literal("pending_deployment"),
      Type.Literal("pending_deletion"),
      Type.Literal("active"),
      Type.Literal("deleted"),
      Type.Literal("deployment_timed_out"),
      Type.Literal("deletion_timed_out"),
    ],
    { description: "Status of the certificate or the association.", "x-auditable": true },
  ),
)

export const TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasCertificate = named(
  "tls-certificates-and-hostnames_hostname-authenticated-origin-pull_components-schemas-certificate",
  Type.String({ description: "The hostname certificate." }),
)

export const TlsCertificatesAndHostnamesHostnameCertidObject = named(
  "tls-certificates-and-hostnames_hostname_certid_object",
  Type.Object({
    cert_id: Type.Optional(DlsIdentifier),
    cert_status: Type.Optional(TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasStatus),
    cert_updated_at: Type.Optional(TlsCertificatesAndHostnamesComponentsSchemasUpdatedAt),
    cert_uploaded_on: Type.Optional(TlsCertificatesAndHostnamesComponentsSchemasUploadedOn),
    certificate: Type.Optional(TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasCertificate),
    created_at: Type.Optional(TlsCertificatesAndHostnamesComponentsSchemasCreatedAt),
    enabled: Type.Optional(TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasEnabled),
    expires_on: Type.Optional(TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasExpiresOn),
    hostname: Type.Optional(TlsCertificatesAndHostnamesSchemasHostname),
    issuer: Type.Optional(TlsCertificatesAndHostnamesIssuer),
    serial_number: Type.Optional(TlsCertificatesAndHostnamesSerialNumber),
    signature: Type.Optional(TlsCertificatesAndHostnamesSignature),
    status: Type.Optional(TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasStatus),
    updated_at: Type.Optional(TlsCertificatesAndHostnamesComponentsSchemasUpdatedAt),
  }),
)

export const TlsCertificatesAndHostnamesHostnameAopSingleResponse = named(
  "tls-certificates-and-hostnames_hostname_aop_single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(TlsCertificatesAndHostnamesHostnameCertidObject),
  }),
)

export const UnnamedSchemaRefD182888b36f93a765d9ce5aefa3009e9 = named(
  "unnamed_schema_ref_d182888b36f93a765d9ce5aefa3009e9",
  Type.Union([Type.Null()]),
)

export const TlsCertificatesAndHostnamesSchemasCertificateobject = named(
  "tls-certificates-and-hostnames_schemas-certificateObject",
  Type.Object({
    certificate: Type.Optional(TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasCertificate),
    expires_on: Type.Optional(TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasExpiresOn),
    id: Type.Optional(DlsIdentifier),
    issuer: Type.Optional(TlsCertificatesAndHostnamesIssuer),
    serial_number: Type.Optional(TlsCertificatesAndHostnamesSerialNumber),
    signature: Type.Optional(TlsCertificatesAndHostnamesSignature),
    status: Type.Optional(TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasStatus),
    uploaded_on: Type.Optional(TlsCertificatesAndHostnamesComponentsSchemasUploadedOn),
  }),
)

export const TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasCertificateResponseSingle =
  named(
    "tls-certificates-and-hostnames_hostname-authenticated-origin-pull_components-schemas-certificate_response_single",
    Type.Object({
      errors: DlpMessages,
      messages: DlpMessages,
      success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
      result: Type.Optional(TlsCertificatesAndHostnamesSchemasCertificateobject),
    }),
  )

export const TlsCertificatesAndHostnamesSchemasPrivateKey = named(
  "tls-certificates-and-hostnames_schemas-private_key",
  Type.String({ description: "The hostname certificate's private key.", "x-sensitive": true }),
)

export const TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPull = named(
  "tls-certificates-and-hostnames_hostname-authenticated-origin-pull",
  Type.Intersect([TlsCertificatesAndHostnamesHostnameCertidObject]),
)

export const TlsCertificatesAndHostnamesHostnameAopResponseCollection = named(
  "tls-certificates-and-hostnames_hostname_aop_response_collection",
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
    result: Type.Optional(Type.Array(TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPull)),
  }),
)

export const TlsCertificatesAndHostnamesCertId = named(
  "tls-certificates-and-hostnames_cert_id",
  Type.String({ description: "Certificate identifier tag.", maxLength: 36, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesHostnameCertidInput = named(
  "tls-certificates-and-hostnames_hostname_certid_input",
  Type.Object({
    cert_id: Type.Optional(TlsCertificatesAndHostnamesCertId),
    enabled: Type.Optional(TlsCertificatesAndHostnamesHostnameAuthenticatedOriginPullComponentsSchemasEnabled),
    hostname: Type.Optional(TlsCertificatesAndHostnamesSchemasHostname),
  }),
)

export const TlsCertificatesAndHostnamesConfig = named(
  "tls-certificates-and-hostnames_config",
  Type.Array(TlsCertificatesAndHostnamesHostnameCertidInput),
)

export const TlsCertificatesAndHostnamesZoneAuthenticatedOriginPullComponentsSchemasCertificate = named(
  "tls-certificates-and-hostnames_zone-authenticated-origin-pull_components-schemas-certificate",
  Type.String({ description: "The zone's leaf certificate." }),
)

export const TlsCertificatesAndHostnamesZoneAuthenticatedOriginPullComponentsSchemasExpiresOn = named(
  "tls-certificates-and-hostnames_zone-authenticated-origin-pull_components-schemas-expires_on",
  Type.String({
    description: "When the certificate from the authority expires.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesZoneAuthenticatedOriginPullComponentsSchemasStatus = named(
  "tls-certificates-and-hostnames_zone-authenticated-origin-pull_components-schemas-status",
  Type.Union(
    [
      Type.Literal("initializing"),
      Type.Literal("pending_deployment"),
      Type.Literal("pending_deletion"),
      Type.Literal("active"),
      Type.Literal("deleted"),
      Type.Literal("deployment_timed_out"),
      Type.Literal("deletion_timed_out"),
    ],
    { description: "Status of the certificate activation.", "x-auditable": true },
  ),
)

export const TlsCertificatesAndHostnamesSchemasUploadedOn = named(
  "tls-certificates-and-hostnames_schemas-uploaded_on",
  Type.String({
    description: "This is the time the certificate was uploaded.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesCertificateobject = named(
  "tls-certificates-and-hostnames_certificateObject",
  Type.Object({
    certificate: Type.Optional(TlsCertificatesAndHostnamesZoneAuthenticatedOriginPullComponentsSchemasCertificate),
    expires_on: Type.Optional(TlsCertificatesAndHostnamesZoneAuthenticatedOriginPullComponentsSchemasExpiresOn),
    id: Type.Optional(DlsIdentifier),
    issuer: Type.Optional(TlsCertificatesAndHostnamesIssuer),
    signature: Type.Optional(TlsCertificatesAndHostnamesSignature),
    status: Type.Optional(TlsCertificatesAndHostnamesZoneAuthenticatedOriginPullComponentsSchemasStatus),
    uploaded_on: Type.Optional(TlsCertificatesAndHostnamesSchemasUploadedOn),
  }),
)

export const TlsCertificatesAndHostnamesZoneAuthenticatedOriginPull = named(
  "tls-certificates-and-hostnames_zone-authenticated-origin-pull",
  Type.Intersect([TlsCertificatesAndHostnamesCertificateobject]),
)

export const TlsCertificatesAndHostnamesComponentsSchemasCertificateResponseSingle = named(
  "tls-certificates-and-hostnames_components-schemas-certificate_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(TlsCertificatesAndHostnamesZoneAuthenticatedOriginPull),
  }),
)

export const TlsCertificatesAndHostnamesComponentsSchemasCertificateResponseCollection = named(
  "tls-certificates-and-hostnames_components-schemas-certificate_response_collection",
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
    result: Type.Optional(Type.Array(TlsCertificatesAndHostnamesZoneAuthenticatedOriginPull)),
  }),
)

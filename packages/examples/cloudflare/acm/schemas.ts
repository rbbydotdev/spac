import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  DlpMessages,
  DlsIdentifier,
  TlsCertificatesAndHostnamesIssuer,
  TlsCertificatesAndHostnamesModifiedOn,
  TlsCertificatesAndHostnamesSchemasExpiresOn,
  TlsCertificatesAndHostnamesSignature,
  TlsCertificatesAndHostnamesUploadedOn,
} from "../shared/schemas"

export const TlsCertificatesAndHostnamesValidityPeriod = named(
  "tls-certificates-and-hostnames_validity_period",
  Type.Union([Type.Literal(90)], {
    description: "The validity period in days for the certificates ordered via Total TLS.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesComponentsSchemasEnabled = named(
  "tls-certificates-and-hostnames_components-schemas-enabled",
  Type.Boolean({
    description:
      "If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesComponentsSchemasCertificateAuthority = named(
  "tls-certificates-and-hostnames_components-schemas-certificate_authority",
  Type.Union([Type.Literal("google"), Type.Literal("lets_encrypt"), Type.Literal("ssl_com")], {
    description: "The Certificate Authority that Total TLS certificates will be issued through.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesTotalTlsSettingsResponse = named(
  "tls-certificates-and-hostnames_total_tls_settings_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        certificate_authority: Type.Optional(TlsCertificatesAndHostnamesComponentsSchemasCertificateAuthority),
        enabled: Type.Optional(TlsCertificatesAndHostnamesComponentsSchemasEnabled),
        validity_period: Type.Optional(TlsCertificatesAndHostnamesValidityPeriod),
      }),
    ),
  }),
)

export const TlsCertificatesAndHostnamesCustomTrustStoreComponentsSchemasStatus = named(
  "tls-certificates-and-hostnames_custom-trust-store_components-schemas-status",
  Type.Union(
    [
      Type.Literal("initializing"),
      Type.Literal("pending_deployment"),
      Type.Literal("active"),
      Type.Literal("pending_deletion"),
      Type.Literal("deleted"),
      Type.Literal("expired"),
    ],
    { description: "Status of the zone's custom SSL.", "x-auditable": true },
  ),
)

export const TlsCertificatesAndHostnamesComponentsSchemasCertificate = named(
  "tls-certificates-and-hostnames_components-schemas-certificate",
  Type.String({ description: "The zone's SSL certificate or certificate and the intermediate(s)." }),
)

export const TlsCertificatesAndHostnamesCustomTrustStore = named(
  "tls-certificates-and-hostnames_custom-trust-store",
  Type.Object({
    certificate: TlsCertificatesAndHostnamesComponentsSchemasCertificate,
    expires_on: TlsCertificatesAndHostnamesSchemasExpiresOn,
    id: DlsIdentifier,
    issuer: TlsCertificatesAndHostnamesIssuer,
    signature: TlsCertificatesAndHostnamesSignature,
    status: TlsCertificatesAndHostnamesCustomTrustStoreComponentsSchemasStatus,
    updated_at: TlsCertificatesAndHostnamesModifiedOn,
    uploaded_on: TlsCertificatesAndHostnamesUploadedOn,
  }),
)

export const TlsCertificatesAndHostnamesCustomTrustStoreResponseSingle = named(
  "tls-certificates-and-hostnames_custom_trust_store_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(TlsCertificatesAndHostnamesCustomTrustStore),
  }),
)

export const TlsCertificatesAndHostnamesCustomTrustStoreResponseCollection = named(
  "tls-certificates-and-hostnames_custom_trust_store_response_collection",
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
    result: Type.Optional(Type.Array(TlsCertificatesAndHostnamesCustomTrustStore)),
  }),
)

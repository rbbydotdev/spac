import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  DlpMessages,
  DlsIdentifier,
  TlsCertificatesAndHostnamesBundleMethod,
  TlsCertificatesAndHostnamesIssuer,
  TlsCertificatesAndHostnamesKeylessCertificate,
  TlsCertificatesAndHostnamesModifiedOn,
  TlsCertificatesAndHostnamesSignature,
  TlsCertificatesAndHostnamesUploadedOn,
} from "../shared/schemas"

export const TlsCertificatesAndHostnamesStatus = named(
  "tls-certificates-and-hostnames_status",
  Type.Union(
    [
      Type.Literal("active"),
      Type.Literal("expired"),
      Type.Literal("deleted"),
      Type.Literal("pending"),
      Type.Literal("initializing"),
    ],
    { description: "Status of the zone's custom SSL.", "x-auditable": true },
  ),
)

export const TlsCertificatesAndHostnamesPriority = named(
  "tls-certificates-and-hostnames_priority",
  Type.Number({
    description:
      "The order/priority in which the certificate will be used in a request. The higher priority will break ties across overlapping 'legacy_custom' certificates, but 'legacy_custom' certificates will always supercede 'sni_custom' certificates.",
    default: 0,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesHosts = named(
  "tls-certificates-and-hostnames_hosts",
  Type.Array(
    Type.String({
      description: "The valid hosts for the certificates.",
      maxLength: 253,
      readOnly: true,
      "x-auditable": true,
    }),
  ),
)

export const TlsCertificatesAndHostnamesExpiresOn = named(
  "tls-certificates-and-hostnames_expires_on",
  Type.String({
    description: "When the certificate from the authority expires.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesGeoRestrictions = named(
  "tls-certificates-and-hostnames_geo_restrictions",
  Type.Object(
    {
      label: Type.Optional(
        Type.Union([Type.Literal("us"), Type.Literal("eu"), Type.Literal("highest_security")], { "x-auditable": true }),
      ),
    },
    {
      description:
        "Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency while Keyless SSL is used to complete the handshake with the nearest allowed data center. Options allow distribution to only to U.S. data centers, only to E.U. data centers, or only to highest security data centers. Default distribution is to all Cloudflare datacenters, for optimal performance.",
    },
  ),
)

export const TlsCertificatesAndHostnamesPolicy = named(
  "tls-certificates-and-hostnames_policy",
  Type.String({
    description:
      "Specify the policy that determines the region where your private key will be held locally. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency while Keyless SSL is used to complete the handshake with the nearest allowed data center. Any combination of countries, specified by their two letter country code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) can be chosen, such as 'country: IN', as well as 'region: EU' which refers to the EU region. If there are too few data centers satisfying the policy, it will be rejected.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesCustomCertificate = named(
  "tls-certificates-and-hostnames_custom-certificate",
  Type.Object({
    bundle_method: TlsCertificatesAndHostnamesBundleMethod,
    expires_on: TlsCertificatesAndHostnamesExpiresOn,
    geo_restrictions: Type.Optional(TlsCertificatesAndHostnamesGeoRestrictions),
    hosts: TlsCertificatesAndHostnamesHosts,
    id: DlsIdentifier,
    issuer: TlsCertificatesAndHostnamesIssuer,
    keyless_server: Type.Optional(TlsCertificatesAndHostnamesKeylessCertificate),
    modified_on: TlsCertificatesAndHostnamesModifiedOn,
    policy: Type.Optional(TlsCertificatesAndHostnamesPolicy),
    priority: TlsCertificatesAndHostnamesPriority,
    signature: TlsCertificatesAndHostnamesSignature,
    status: TlsCertificatesAndHostnamesStatus,
    uploaded_on: TlsCertificatesAndHostnamesUploadedOn,
    zone_id: DlsIdentifier,
  }),
)

export const TlsCertificatesAndHostnamesCertificateResponseSingle = named(
  "tls-certificates-and-hostnames_certificate_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(TlsCertificatesAndHostnamesCustomCertificate),
  }),
)

export const TlsCertificatesAndHostnamesType = named(
  "tls-certificates-and-hostnames_type",
  Type.Union([Type.Literal("legacy_custom"), Type.Literal("sni_custom")], {
    description:
      "The type 'legacy_custom' enables support for legacy clients which do not include SNI in the TLS handshake.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesCertificateResponseCollection = named(
  "tls-certificates-and-hostnames_certificate_response_collection",
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
    result: Type.Optional(Type.Array(TlsCertificatesAndHostnamesCustomCertificate)),
  }),
)

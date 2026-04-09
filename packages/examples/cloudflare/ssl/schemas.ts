import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, DlsIdentifier, TlsCertificatesAndHostnamesValidationRecord } from "../shared/schemas"

export const TlsCertificatesAndHostnamesCertPackUuid = named(
  "tls-certificates-and-hostnames_cert_pack_uuid",
  Type.String({ description: "Certificate Pack UUID.", "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesValidationMethodDefinition = named(
  "tls-certificates-and-hostnames_validation_method_definition",
  Type.Union([Type.Literal("http"), Type.Literal("cname"), Type.Literal("txt"), Type.Literal("email")], {
    description: "Desired validation method.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesValidationMethodComponentsSchemasStatus = named(
  "tls-certificates-and-hostnames_validation_method_components-schemas-status",
  Type.String({ description: "Result status.", "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesSslValidationMethodResponseCollection = named(
  "tls-certificates-and-hostnames_ssl_validation_method_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        status: Type.Optional(TlsCertificatesAndHostnamesValidationMethodComponentsSchemasStatus),
        validation_method: Type.Optional(TlsCertificatesAndHostnamesValidationMethodDefinition),
      }),
    ),
  }),
)

export const TlsCertificatesAndHostnamesComponentsSchemasValidationMethod = named(
  "tls-certificates-and-hostnames_components-schemas-validation_method",
  Type.Object({
    validation_method: TlsCertificatesAndHostnamesValidationMethodDefinition,
  }),
)

export const TlsCertificatesAndHostnamesBrandCheck = named(
  "tls-certificates-and-hostnames_brand_check",
  Type.Boolean({ description: "Certificate Authority is manually reviewing the order.", "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesCertificateStatus = named(
  "tls-certificates-and-hostnames_certificate_status",
  Type.Union(
    [
      Type.Literal("initializing"),
      Type.Literal("authorizing"),
      Type.Literal("active"),
      Type.Literal("expired"),
      Type.Literal("issuing"),
      Type.Literal("timing_out"),
      Type.Literal("pending_deployment"),
    ],
    { description: "Current status of certificate.", "x-auditable": true },
  ),
)

export const TlsCertificatesAndHostnamesSchemasSignature = named(
  "tls-certificates-and-hostnames_schemas-signature",
  Type.Union([Type.Literal("ECDSAWithSHA256"), Type.Literal("SHA1WithRSA"), Type.Literal("SHA256WithRSA")], {
    description: "Certificate's signature algorithm.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesSchemasValidationMethod = named(
  "tls-certificates-and-hostnames_schemas-validation_method",
  Type.Union([Type.Literal("http"), Type.Literal("cname"), Type.Literal("txt")], {
    description: "Validation method in use for a certificate pack order.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesVerificationInfo = named(
  "tls-certificates-and-hostnames_verification_info",
  Type.Object(
    {
      record_name: Type.Optional(
        Type.Union(
          [Type.Literal("record_name"), Type.Literal("http_url"), Type.Literal("cname"), Type.Literal("txt_name")],
          { description: "Name of CNAME record.", "x-auditable": true },
        ),
      ),
      record_target: Type.Optional(
        Type.Union(
          [
            Type.Literal("record_value"),
            Type.Literal("http_body"),
            Type.Literal("cname_target"),
            Type.Literal("txt_value"),
          ],
          { description: "Target of CNAME record.", "x-auditable": true },
        ),
      ),
    },
    { description: "Certificate's required verification information." },
  ),
)

export const TlsCertificatesAndHostnamesVerificationStatus = named(
  "tls-certificates-and-hostnames_verification_status",
  Type.Boolean({
    description: "Status of the required verification information, omitted if verification status is unknown.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesVerificationType = named(
  "tls-certificates-and-hostnames_verification_type",
  Type.Union([Type.Literal("cname"), Type.Literal("meta tag")], {
    description: "Method of verification.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesVerification = named(
  "tls-certificates-and-hostnames_verification",
  Type.Object({
    brand_check: Type.Optional(TlsCertificatesAndHostnamesBrandCheck),
    cert_pack_uuid: Type.Optional(TlsCertificatesAndHostnamesCertPackUuid),
    certificate_status: TlsCertificatesAndHostnamesCertificateStatus,
    signature: Type.Optional(TlsCertificatesAndHostnamesSchemasSignature),
    validation_method: Type.Optional(TlsCertificatesAndHostnamesSchemasValidationMethod),
    verification_info: Type.Optional(TlsCertificatesAndHostnamesVerificationInfo),
    verification_status: Type.Optional(TlsCertificatesAndHostnamesVerificationStatus),
    verification_type: Type.Optional(TlsCertificatesAndHostnamesVerificationType),
  }),
)

export const TlsCertificatesAndHostnamesSslVerificationResponseCollection = named(
  "tls-certificates-and-hostnames_ssl_verification_response_collection",
  Type.Object({
    result: Type.Optional(Type.Array(TlsCertificatesAndHostnamesVerification)),
  }),
)

export const TlsCertificatesAndHostnamesSchemasEnabled = named(
  "tls-certificates-and-hostnames_schemas-enabled",
  Type.Boolean({
    description:
      "Disabling Universal SSL removes any currently active Universal SSL certificates for your zone from the edge and prevents any future Universal SSL certificates from being ordered. If there are no advanced certificates or custom certificates uploaded for the domain, visitors will be unable to access the domain over HTTPS.\n\nBy disabling Universal SSL, you understand that the following Cloudflare settings and preferences will result in visitors being unable to visit your domain unless you have uploaded a custom certificate or purchased an advanced certificate.\n\n* HSTS\n* Always Use HTTPS\n* Opportunistic Encryption\n* Onion Routing\n* Any Page Rules redirecting traffic to HTTPS\n\nSimilarly, any HTTP redirect to HTTPS at the origin while the Cloudflare proxy is enabled will result in users being unable to visit your site without a valid certificate at Cloudflare's edge.\n\nIf you do not have a valid custom or advanced certificate at Cloudflare's edge and are unsure if any of the above Cloudflare settings are enabled, or if any HTTP redirects exist at your origin, we advise leaving Universal SSL enabled for your domain.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesUniversal = named(
  "tls-certificates-and-hostnames_universal",
  Type.Object({
    enabled: Type.Optional(TlsCertificatesAndHostnamesSchemasEnabled),
  }),
)

export const TlsCertificatesAndHostnamesSslUniversalSettingsResponse = named(
  "tls-certificates-and-hostnames_ssl_universal_settings_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(TlsCertificatesAndHostnamesUniversal),
  }),
)

export const TlsCertificatesAndHostnamesQuota = named(
  "tls-certificates-and-hostnames_quota",
  Type.Object({
    allocated: Type.Optional(Type.Integer({ description: "Quantity Allocated.", "x-auditable": true })),
    used: Type.Optional(Type.Integer({ description: "Quantity Used.", "x-auditable": true })),
  }),
)

export const TlsCertificatesAndHostnamesCertificatePackQuotaResponse = named(
  "tls-certificates-and-hostnames_certificate_pack_quota_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        advanced: Type.Optional(TlsCertificatesAndHostnamesQuota),
      }),
    ),
  }),
)

export const TlsCertificatesAndHostnamesSchemasType = named(
  "tls-certificates-and-hostnames_schemas-type",
  Type.Union(
    [
      Type.Literal("mh_custom"),
      Type.Literal("managed_hostname"),
      Type.Literal("sni_custom"),
      Type.Literal("universal"),
      Type.Literal("advanced"),
      Type.Literal("total_tls"),
      Type.Literal("keyless"),
      Type.Literal("legacy_custom"),
    ],
    { description: "Type of certificate pack.", "x-auditable": true },
  ),
)

export const TlsCertificatesAndHostnamesCertificatePacksComponentsSchemasStatus = named(
  "tls-certificates-and-hostnames_certificate-packs_components-schemas-status",
  Type.Union(
    [
      Type.Literal("initializing"),
      Type.Literal("pending_validation"),
      Type.Literal("deleted"),
      Type.Literal("pending_issuance"),
      Type.Literal("pending_deployment"),
      Type.Literal("pending_deletion"),
      Type.Literal("pending_expiration"),
      Type.Literal("expired"),
      Type.Literal("active"),
      Type.Literal("initializing_timed_out"),
      Type.Literal("validation_timed_out"),
      Type.Literal("issuance_timed_out"),
      Type.Literal("deployment_timed_out"),
      Type.Literal("deletion_timed_out"),
      Type.Literal("pending_cleanup"),
      Type.Literal("staging_deployment"),
      Type.Literal("staging_active"),
      Type.Literal("deactivating"),
      Type.Literal("inactive"),
      Type.Literal("backup_issued"),
      Type.Literal("holding_deployment"),
    ],
    { description: "Status of certificate pack.", "x-auditable": true },
  ),
)

export const TlsCertificatesAndHostnamesSchemasCertificateAuthority = named(
  "tls-certificates-and-hostnames_schemas-certificate_authority",
  Type.Union([Type.Literal("google"), Type.Literal("lets_encrypt"), Type.Literal("ssl_com")], {
    description:
      "Certificate Authority selected for the order.  For information on any certificate authority specific details or restrictions [see this page for more details.](https://developers.cloudflare.com/ssl/reference/certificate-authorities)",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesCloudflareBranding = named(
  "tls-certificates-and-hostnames_cloudflare_branding",
  Type.Boolean({
    description:
      "Whether or not to add Cloudflare Branding for the order.  This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesSchemasHosts = named(
  "tls-certificates-and-hostnames_schemas-hosts",
  Type.Array(Type.String({ "x-auditable": true }), {
    description:
      "Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may not be empty.",
  }),
)

export const TlsCertificatesAndHostnamesValidationMethod = named(
  "tls-certificates-and-hostnames_validation_method",
  Type.Union([Type.Literal("txt"), Type.Literal("http"), Type.Literal("email")], {
    description: "Validation Method selected for the order.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesValidityDays = named(
  "tls-certificates-and-hostnames_validity_days",
  Type.Union([Type.Literal(14), Type.Literal(30), Type.Literal(90), Type.Literal(365)], {
    description: "Validity Days selected for the order.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesAdvancedCertificatePackResponseSingle = named(
  "tls-certificates-and-hostnames_advanced_certificate_pack_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        certificate_authority: Type.Optional(TlsCertificatesAndHostnamesSchemasCertificateAuthority),
        cloudflare_branding: Type.Optional(TlsCertificatesAndHostnamesCloudflareBranding),
        hosts: Type.Optional(TlsCertificatesAndHostnamesSchemasHosts),
        id: Type.Optional(DlsIdentifier),
        status: Type.Optional(TlsCertificatesAndHostnamesCertificatePacksComponentsSchemasStatus),
        type: Type.Optional(TlsCertificatesAndHostnamesSchemasType),
        validation_errors: Type.Optional(
          Type.Array(
            Type.Object({
              message: Type.Optional(Type.String({ description: "A domain validation error.", "x-auditable": true })),
            }),
            { description: "Domain validation errors that have been received by the certificate authority (CA)." },
          ),
        ),
        validation_method: Type.Optional(TlsCertificatesAndHostnamesValidationMethod),
        validation_records: Type.Optional(
          Type.Array(TlsCertificatesAndHostnamesValidationRecord, {
            description:
              'Certificates\' validation records. Only present when certificate pack is in "pending_validation" status',
          }),
        ),
        validity_days: Type.Optional(TlsCertificatesAndHostnamesValidityDays),
      }),
    ),
  }),
)

export const TlsCertificatesAndHostnamesAdvancedType = named(
  "tls-certificates-and-hostnames_advanced_type",
  Type.Union([Type.Literal("advanced")], { description: "Type of certificate pack.", "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesCertificatePackResponseCollection = named(
  "tls-certificates-and-hostnames_certificate_pack_response_collection",
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
    result: Type.Optional(Type.Array(Type.Unknown())),
  }),
)

export const TlsCertificatesAndHostnamesCertificateAnalyzeResponse = named(
  "tls-certificates-and-hostnames_certificate_analyze_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Unknown()),
  }),
)

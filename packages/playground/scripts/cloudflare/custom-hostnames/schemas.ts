import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  DlpMessages,
  DlsIdentifier,
  TlsCertificatesAndHostnamesValidationRecord,
  UnnamedSchemaRef16aca57bde2963201c7e6e895436c1c1,
} from "../shared/schemas"

export const TlsCertificatesAndHostnamesCustomCertAndKey = named(
  "tls-certificates-and-hostnames_custom_cert_and_key",
  Type.Object({
    custom_certificate: Type.String({ description: "If a custom uploaded certificate is used." }),
    custom_key: Type.String({ description: "The key for a custom uploaded certificate.", "x-sensitive": true }),
  }),
)

export const TlsCertificatesAndHostnamesCustomOriginSni = named(
  "tls-certificates-and-hostnames_custom_origin_sni",
  Type.String({
    description:
      "A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ':request_host_header:' which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesCustomOriginServer = named(
  "tls-certificates-and-hostnames_custom_origin_server",
  Type.String({
    description: "a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesUpdatedAt = named(
  "tls-certificates-and-hostnames_updated_at",
  Type.String({
    description: "This is the time the fallback origin was updated.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesCustomHostnameFallbackOriginComponentsSchemasStatus = named(
  "tls-certificates-and-hostnames_custom-hostname-fallback-origin_components-schemas-status",
  Type.Union(
    [
      Type.Literal("initializing"),
      Type.Literal("pending_deployment"),
      Type.Literal("pending_deletion"),
      Type.Literal("active"),
      Type.Literal("deployment_timed_out"),
      Type.Literal("deletion_timed_out"),
    ],
    { description: "Status of the fallback origin's activation.", "x-auditable": true },
  ),
)

export const TlsCertificatesAndHostnamesOrigin = named(
  "tls-certificates-and-hostnames_origin",
  Type.String({
    description: "Your origin hostname that requests to your custom hostnames will be sent to.",
    maxLength: 255,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesErrors = named(
  "tls-certificates-and-hostnames_errors",
  Type.Array(Type.String({ "x-auditable": true }), {
    description: "These are errors that were encountered while trying to activate a fallback origin.",
  }),
)

export const TlsCertificatesAndHostnamesSchemasCreatedAt = named(
  "tls-certificates-and-hostnames_schemas-created_at",
  Type.String({
    description: "This is the time the fallback origin was created.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesFallbackorigin = named(
  "tls-certificates-and-hostnames_fallbackorigin",
  Type.Object({
    created_at: Type.Optional(TlsCertificatesAndHostnamesSchemasCreatedAt),
    errors: Type.Optional(TlsCertificatesAndHostnamesErrors),
    origin: Type.Optional(TlsCertificatesAndHostnamesOrigin),
    status: Type.Optional(TlsCertificatesAndHostnamesCustomHostnameFallbackOriginComponentsSchemasStatus),
    updated_at: Type.Optional(TlsCertificatesAndHostnamesUpdatedAt),
  }),
)

export const TlsCertificatesAndHostnamesFallbackOriginResponse = named(
  "tls-certificates-and-hostnames_fallback_origin_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(TlsCertificatesAndHostnamesFallbackorigin),
  }),
)

export const TlsCertificatesAndHostnamesCreatedAt = named(
  "tls-certificates-and-hostnames_created_at",
  Type.String({ description: "This is the time the hostname was created.", format: "date-time", "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesCustomMetadata = named(
  "tls-certificates-and-hostnames_custom_metadata",
  Type.Record(Type.String(), Type.String({ "x-auditable": true })),
)

export const TlsCertificatesAndHostnamesHostname = named(
  "tls-certificates-and-hostnames_hostname",
  Type.String({
    description: "The custom hostname that will point to your hostname via CNAME.",
    maxLength: 255,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesOwnershipVerification = named(
  "tls-certificates-and-hostnames_ownership_verification",
  Type.Object(
    {
      name: Type.Optional(Type.String({ description: "DNS Name for record.", "x-auditable": true })),
      type: Type.Optional(Type.Union([Type.Literal("txt")], { description: "DNS Record type.", "x-auditable": true })),
      value: Type.Optional(Type.String({ description: "Content for the record." })),
    },
    { description: "This is a record which can be placed to activate a hostname." },
  ),
)

export const TlsCertificatesAndHostnamesOwnershipVerificationHttp = named(
  "tls-certificates-and-hostnames_ownership_verification_http",
  Type.Object(
    {
      http_body: Type.Optional(Type.String({ description: "Token to be served." })),
      http_url: Type.Optional(
        Type.String({
          description:
            "The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.",
        }),
      ),
    },
    { description: "This presents the token to be served by the given http url to activate a hostname." },
  ),
)

export const TlsCertificatesAndHostnamesCertificateAuthority = named(
  "tls-certificates-and-hostnames_certificate_authority",
  Type.Union(
    [Type.Literal("digicert"), Type.Literal("google"), Type.Literal("lets_encrypt"), Type.Literal("ssl_com")],
    { description: "The Certificate Authority that will issue the certificate", "x-auditable": true },
  ),
)

export const UnnamedSchemaRef78adb375f06c6d462dd92b99e2ecf510 = named(
  "unnamed_schema_ref_78adb375f06c6d462dd92b99e2ecf510",
  Type.Union([Type.Literal("http"), Type.Literal("txt"), Type.Literal("email")], {
    description: "Domain control validation (DCV) method used for this hostname.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesSslsettings = named(
  "tls-certificates-and-hostnames_sslsettings",
  Type.Object(
    {
      ciphers: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.",
          uniqueItems: true,
        }),
      ),
      early_hints: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "Whether or not Early Hints is enabled.",
          "x-auditable": true,
        }),
      ),
      http2: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "Whether or not HTTP2 is enabled.",
          "x-auditable": true,
        }),
      ),
      min_tls_version: Type.Optional(
        Type.Union([Type.Literal("1.0"), Type.Literal("1.1"), Type.Literal("1.2"), Type.Literal("1.3")], {
          description: "The minimum TLS version supported.",
          "x-auditable": true,
        }),
      ),
      tls_1_3: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "Whether or not TLS 1.3 is enabled.",
          "x-auditable": true,
        }),
      ),
    },
    { description: "SSL specific settings." },
  ),
)

export const UnnamedSchemaRef9a9935a9a770967bb604ae41a81e42e1 = named(
  "unnamed_schema_ref_9a9935a9a770967bb604ae41a81e42e1",
  Type.Union([Type.Literal("dv")], {
    description: "Level of validation to be used for this hostname. Domain validation (dv) must be used.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesSsl = named(
  "tls-certificates-and-hostnames_ssl",
  Type.Object(
    {
      bundle_method: Type.Optional(UnnamedSchemaRef16aca57bde2963201c7e6e895436c1c1),
      certificate_authority: Type.Optional(TlsCertificatesAndHostnamesCertificateAuthority),
      custom_certificate: Type.Optional(Type.String({ description: "If a custom uploaded certificate is used." })),
      custom_csr_id: Type.Optional(
        Type.String({ description: "The identifier for the Custom CSR that was used.", "x-auditable": true }),
      ),
      custom_key: Type.Optional(
        Type.String({ description: "The key for a custom uploaded certificate.", "x-sensitive": true }),
      ),
      expires_on: Type.Optional(
        Type.String({
          description: "The time the custom certificate expires on.",
          format: "date-time",
          "x-auditable": true,
        }),
      ),
      hosts: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "A list of Hostnames on a custom uploaded certificate.",
        }),
      ),
      id: Type.Optional(
        Type.String({
          description: "Custom hostname SSL identifier tag.",
          minLength: 36,
          maxLength: 36,
          "x-auditable": true,
        }),
      ),
      issuer: Type.Optional(
        Type.String({ description: "The issuer on a custom uploaded certificate.", "x-auditable": true }),
      ),
      method: Type.Optional(UnnamedSchemaRef78adb375f06c6d462dd92b99e2ecf510),
      serial_number: Type.Optional(
        Type.String({ description: "The serial number on a custom uploaded certificate.", "x-auditable": true }),
      ),
      settings: Type.Optional(TlsCertificatesAndHostnamesSslsettings),
      signature: Type.Optional(
        Type.String({ description: "The signature on a custom uploaded certificate.", "x-auditable": true }),
      ),
      status: Type.Optional(
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
          { description: "Status of the hostname's SSL certificates.", "x-auditable": true },
        ),
      ),
      type: Type.Optional(UnnamedSchemaRef9a9935a9a770967bb604ae41a81e42e1),
      uploaded_on: Type.Optional(
        Type.String({
          description: "The time the custom certificate was uploaded.",
          format: "date-time",
          "x-auditable": true,
        }),
      ),
      validation_errors: Type.Optional(
        Type.Array(
          Type.Object({
            message: Type.Optional(Type.String({ description: "A domain validation error.", "x-auditable": true })),
          }),
          { description: "Domain validation errors that have been received by the certificate authority (CA)." },
        ),
      ),
      validation_records: Type.Optional(Type.Array(TlsCertificatesAndHostnamesValidationRecord)),
      wildcard: Type.Optional(
        Type.Boolean({ description: "Indicates whether the certificate covers a wildcard.", "x-auditable": true }),
      ),
    },
    { description: "SSL properties for the custom hostname." },
  ),
)

export const TlsCertificatesAndHostnamesComponentsSchemasStatus = named(
  "tls-certificates-and-hostnames_components-schemas-status",
  Type.Union(
    [
      Type.Literal("active"),
      Type.Literal("pending"),
      Type.Literal("active_redeploying"),
      Type.Literal("moved"),
      Type.Literal("pending_deletion"),
      Type.Literal("deleted"),
      Type.Literal("pending_blocked"),
      Type.Literal("pending_migration"),
      Type.Literal("pending_provisioned"),
      Type.Literal("test_pending"),
      Type.Literal("test_active"),
      Type.Literal("test_active_apex"),
      Type.Literal("test_blocked"),
      Type.Literal("test_failed"),
      Type.Literal("provisioned"),
      Type.Literal("blocked"),
    ],
    { description: "Status of the hostname's activation.", "x-auditable": true },
  ),
)

export const TlsCertificatesAndHostnamesVerificationErrors = named(
  "tls-certificates-and-hostnames_verification_errors",
  Type.Array(Type.String({ "x-auditable": true }), {
    description: "These are errors that were encountered while trying to activate a hostname.",
  }),
)

export const TlsCertificatesAndHostnamesCustomhostname = named(
  "tls-certificates-and-hostnames_customhostname",
  Type.Object({
    created_at: Type.Optional(TlsCertificatesAndHostnamesCreatedAt),
    custom_metadata: Type.Optional(TlsCertificatesAndHostnamesCustomMetadata),
    custom_origin_server: Type.Optional(TlsCertificatesAndHostnamesCustomOriginServer),
    custom_origin_sni: Type.Optional(TlsCertificatesAndHostnamesCustomOriginSni),
    hostname: Type.Optional(TlsCertificatesAndHostnamesHostname),
    id: Type.Optional(DlsIdentifier),
    ownership_verification: Type.Optional(TlsCertificatesAndHostnamesOwnershipVerification),
    ownership_verification_http: Type.Optional(TlsCertificatesAndHostnamesOwnershipVerificationHttp),
    ssl: Type.Optional(TlsCertificatesAndHostnamesSsl),
    status: Type.Optional(TlsCertificatesAndHostnamesComponentsSchemasStatus),
    verification_errors: Type.Optional(TlsCertificatesAndHostnamesVerificationErrors),
  }),
)

export const UnnamedSchemaRefD2a16d7ee1ad3a888dd5821c918d51fd = named(
  "unnamed_schema_ref_d2a16d7ee1ad3a888dd5821c918d51fd",
  Type.Intersect([TlsCertificatesAndHostnamesCustomhostname]),
)

export const TlsCertificatesAndHostnamesCustomHostname = named(
  "tls-certificates-and-hostnames_custom-hostname",
  Type.Intersect([TlsCertificatesAndHostnamesCustomhostname]),
)

export const TlsCertificatesAndHostnamesCustomHostnameResponseSingle = named(
  "tls-certificates-and-hostnames_custom_hostname_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(TlsCertificatesAndHostnamesCustomHostname),
  }),
)

export const TlsCertificatesAndHostnamesCustomCertBundle = named(
  "tls-certificates-and-hostnames_custom_cert_bundle",
  Type.Array(TlsCertificatesAndHostnamesCustomCertAndKey, {
    description: "Array of custom certificate and key pairs (1 or 2 pairs allowed)",
    minItems: 1,
    maxItems: 2,
  }),
)

export const TlsCertificatesAndHostnamesSslpost = named(
  "tls-certificates-and-hostnames_sslpost",
  Type.Object(
    {
      bundle_method: Type.Optional(UnnamedSchemaRef16aca57bde2963201c7e6e895436c1c1),
      certificate_authority: Type.Optional(TlsCertificatesAndHostnamesCertificateAuthority),
      cloudflare_branding: Type.Optional(
        Type.Boolean({
          description:
            "Whether or not to add Cloudflare Branding for the order.  This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true",
          "x-auditable": true,
        }),
      ),
      custom_cert_bundle: Type.Optional(TlsCertificatesAndHostnamesCustomCertBundle),
      custom_certificate: Type.Optional(
        Type.String({ description: "If a custom uploaded certificate is used.", "x-auditable": true }),
      ),
      custom_key: Type.Optional(
        Type.String({ description: "The key for a custom uploaded certificate.", "x-sensitive": true }),
      ),
      method: Type.Optional(UnnamedSchemaRef78adb375f06c6d462dd92b99e2ecf510),
      settings: Type.Optional(TlsCertificatesAndHostnamesSslsettings),
      type: Type.Optional(UnnamedSchemaRef9a9935a9a770967bb604ae41a81e42e1),
      wildcard: Type.Optional(
        Type.Boolean({ description: "Indicates whether the certificate covers a wildcard.", "x-auditable": true }),
      ),
    },
    { description: "SSL properties used when creating the custom hostname." },
  ),
)

export const TlsCertificatesAndHostnamesHostnamePost = named(
  "tls-certificates-and-hostnames_hostname_post",
  Type.String({
    description: "The custom hostname that will point to your hostname via CNAME.",
    maxLength: 255,
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesCustomHostnameResponseCollection = named(
  "tls-certificates-and-hostnames_custom_hostname_response_collection",
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
    result: Type.Optional(Type.Array(TlsCertificatesAndHostnamesCustomHostname)),
  }),
)

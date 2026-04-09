import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages } from "../shared/schemas"

export const TlsCertificatesAndHostnamesHostnameTlsSettingsComponentsSchemasCreatedAt = named(
  "tls-certificates-and-hostnames_hostname-tls-settings_components-schemas-created_at",
  Type.String({
    description: "This is the time the tls setting was originally created for this hostname.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesComponentsSchemasHostname = named(
  "tls-certificates-and-hostnames_components-schemas-hostname",
  Type.String({ description: "The hostname for which the tls settings are set.", "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesHostnameTlsSettingsComponentsSchemasStatus = named(
  "tls-certificates-and-hostnames_hostname-tls-settings_components-schemas-status",
  Type.String({ description: "Deployment status for the given tls setting.", "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesHostnameTlsSettingsComponentsSchemasUpdatedAt = named(
  "tls-certificates-and-hostnames_hostname-tls-settings_components-schemas-updated_at",
  Type.String({
    description: "This is the time the tls setting was updated.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesValue = named(
  "tls-certificates-and-hostnames_value",
  Type.Union(
    [
      Type.Number({ "x-auditable": true }),
      Type.String({ "x-auditable": true }),
      Type.Array(Type.String({ "x-auditable": true })),
    ],
    { description: "The tls setting value." },
  ),
)

export const TlsCertificatesAndHostnamesSettingobject = named(
  "tls-certificates-and-hostnames_settingObject",
  Type.Object({
    created_at: Type.Optional(TlsCertificatesAndHostnamesHostnameTlsSettingsComponentsSchemasCreatedAt),
    hostname: Type.Optional(TlsCertificatesAndHostnamesComponentsSchemasHostname),
    status: Type.Optional(TlsCertificatesAndHostnamesHostnameTlsSettingsComponentsSchemasStatus),
    updated_at: Type.Optional(TlsCertificatesAndHostnamesHostnameTlsSettingsComponentsSchemasUpdatedAt),
    value: Type.Optional(TlsCertificatesAndHostnamesValue),
  }),
)

export const TlsCertificatesAndHostnamesPerHostnameSettingsResponseDelete = named(
  "tls-certificates-and-hostnames_per_hostname_settings_response_delete",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(TlsCertificatesAndHostnamesSettingobject),
  }),
)

export const TlsCertificatesAndHostnamesPerHostnameSettingsResponse = named(
  "tls-certificates-and-hostnames_per_hostname_settings_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(TlsCertificatesAndHostnamesSettingobject),
  }),
)

export const TlsCertificatesAndHostnamesSettingId = named(
  "tls-certificates-and-hostnames_setting_id",
  Type.Union([Type.Literal("ciphers"), Type.Literal("min_tls_version"), Type.Literal("http2")], {
    description: "The TLS Setting name.",
    "x-auditable": true,
  }),
)

export const TlsCertificatesAndHostnamesPerHostnameSettingsResponseCollection = named(
  "tls-certificates-and-hostnames_per_hostname_settings_response_collection",
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
    result: Type.Optional(
      Type.Array(
        Type.Object({
          created_at: Type.Optional(TlsCertificatesAndHostnamesHostnameTlsSettingsComponentsSchemasCreatedAt),
          hostname: Type.Optional(TlsCertificatesAndHostnamesComponentsSchemasHostname),
          status: Type.Optional(TlsCertificatesAndHostnamesHostnameTlsSettingsComponentsSchemasStatus),
          updated_at: Type.Optional(TlsCertificatesAndHostnamesHostnameTlsSettingsComponentsSchemasUpdatedAt),
          value: Type.Optional(TlsCertificatesAndHostnamesValue),
        }),
      ),
    ),
  }),
)

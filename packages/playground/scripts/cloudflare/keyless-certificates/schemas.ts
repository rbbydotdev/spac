import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  DlpMessages,
  TlsCertificatesAndHostnamesBase,
  TlsCertificatesAndHostnamesKeylessCertificate,
} from "../shared/schemas"

export const TlsCertificatesAndHostnamesEnabledWrite = named(
  "tls-certificates-and-hostnames_enabled_write",
  Type.Boolean({ description: "Whether or not the Keyless SSL is on or off.", deprecated: true, "x-auditable": true }),
)

export const UnnamedSchemaRefA91f0bd72ee433f010eecfdc94ccf298 = named(
  "unnamed_schema_ref_a91f0bd72ee433f010eecfdc94ccf298",
  Type.Union([Type.Null()]),
)

export const TlsCertificatesAndHostnamesKeylessResponseSingle = named(
  "tls-certificates-and-hostnames_keyless_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(TlsCertificatesAndHostnamesBase),
  }),
)

export const TlsCertificatesAndHostnamesNameWrite = named(
  "tls-certificates-and-hostnames_name_write",
  Type.String({ description: "The keyless SSL name.", maxLength: 180, "x-auditable": true }),
)

export const TlsCertificatesAndHostnamesSchemasCertificate = named(
  "tls-certificates-and-hostnames_schemas-certificate",
  Type.String({ description: "The zone's SSL certificate or SSL certificate and intermediate(s)." }),
)

export const TlsCertificatesAndHostnamesKeylessResponseCollection = named(
  "tls-certificates-and-hostnames_keyless_response_collection",
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
    result: Type.Optional(Type.Array(TlsCertificatesAndHostnamesKeylessCertificate)),
  }),
)

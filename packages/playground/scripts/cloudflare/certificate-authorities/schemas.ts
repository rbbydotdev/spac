import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages } from "../shared/schemas"

export const TlsCertificatesAndHostnamesSchemasHostnames = named(
  "tls-certificates-and-hostnames_schemas-hostnames",
  Type.Array(Type.String({ "x-auditable": true })),
)

export const TlsCertificatesAndHostnamesHostnameAssociation = named(
  "tls-certificates-and-hostnames_hostname_association",
  Type.Object({
    hostnames: Type.Optional(TlsCertificatesAndHostnamesSchemasHostnames),
    mtls_certificate_id: Type.Optional(
      Type.String({
        description:
          "The UUID for a certificate that was uploaded to the mTLS Certificate Management endpoint. If no mtls_certificate_id is given, the hostnames will be associated to your active Cloudflare Managed CA.",
        minLength: 36,
        maxLength: 36,
        "x-auditable": true,
      }),
    ),
  }),
)

export const TlsCertificatesAndHostnamesHostnameAssociationsResponse = named(
  "tls-certificates-and-hostnames_hostname_associations_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        hostnames: Type.Optional(TlsCertificatesAndHostnamesSchemasHostnames),
      }),
    ),
  }),
)

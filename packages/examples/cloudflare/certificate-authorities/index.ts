import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { TlsCertificatesAndHostnamesApiResponseCommonFailure } from "../shared/schemas"
import {
  TlsCertificatesAndHostnamesHostnameAssociation,
  TlsCertificatesAndHostnamesHostnameAssociationsResponse,
} from "./schemas"

export function registerCertificateAuthorities(api: Api) {
  api.group(
    "/zones/{zone_id}/certificate_authorities/hostname_associations",
    { params: Type.Object({ zone_id: Type.String() }) },
    (g) => {
      g.get("/", {
        query: Type.Object({
          mtls_certificate_id: Type.Optional(
            Type.String({
              description:
                "The UUID to match against for a certificate that was uploaded to the mTLS Certificate Management endpoint. If no mtls_certificate_id is given, the results will be the hostnames associated to your active Cloudflare Managed CA.",
              minLength: 36,
              maxLength: 36,
            }),
          ),
        }),
        responses: {
          200: TlsCertificatesAndHostnamesHostnameAssociationsResponse,
          "4XX": TlsCertificatesAndHostnamesApiResponseCommonFailure,
        },
      })
        .summary("List Hostname Associations")
        .description("List Hostname Associations")
        .operationId("client-certificate-for-a-zone-list-hostname-associations")
        .tag("API Shield Client Certificates for a Zone")
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.put("/", {
        body: TlsCertificatesAndHostnamesHostnameAssociation,
        responses: {
          200: TlsCertificatesAndHostnamesHostnameAssociationsResponse,
          "4XX": TlsCertificatesAndHostnamesApiResponseCommonFailure,
        },
      })
        .summary("Replace Hostname Associations")
        .description("Replace Hostname Associations")
        .operationId("client-certificate-for-a-zone-put-hostname-associations")
        .tag("API Shield Client Certificates for a Zone")
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["SSL and Certificates Write"])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
    },
  )
}

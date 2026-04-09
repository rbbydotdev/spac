import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"
import {
  TlsCertificatesAndHostnamesCustomCertAndKey,
  TlsCertificatesAndHostnamesCustomHostnameResponseCollection,
  TlsCertificatesAndHostnamesCustomHostnameResponseSingle,
  TlsCertificatesAndHostnamesCustomMetadata,
  TlsCertificatesAndHostnamesCustomOriginServer,
  TlsCertificatesAndHostnamesCustomOriginSni,
  TlsCertificatesAndHostnamesFallbackOriginResponse,
  TlsCertificatesAndHostnamesHostnamePost,
  TlsCertificatesAndHostnamesOrigin,
  TlsCertificatesAndHostnamesSslpost,
  UnnamedSchemaRefD2a16d7ee1ad3a888dd5821c918d51fd,
} from "./schemas"

export function registerCustomHostnames(api: Api) {
  api.assertVersion("3.0.3", "CustomHostnames")

  api.group("/zones/{zone_id}/custom_hostnames", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        hostname: Type.Optional(
          Type.String({
            description:
              "Fully qualified domain name to match against. This parameter cannot be used with the 'id' parameter.",
            maxLength: 255,
          }),
        ),
        id: Type.Optional(
          Type.String({
            description:
              "Hostname ID to match against. This ID was generated and returned during the initial custom_hostname creation. This parameter cannot be used with the 'hostname' parameter.",
            minLength: 36,
            maxLength: 36,
          }),
        ),
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Number of hostnames per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal("ssl"), Type.Literal("ssl_status")], {
            description: "Field to order hostnames by.",
          }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Direction to order hostnames." }),
        ),
        ssl: Type.Optional(
          Type.Union([Type.Literal(0), Type.Literal(1)], {
            description: "Whether to filter hostnames based on if they have SSL enabled.",
          }),
        ),
      }),
    })
      .response(TlsCertificatesAndHostnamesCustomHostnameResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
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
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("List Custom Hostnames")
      .description("List, search, sort, and filter all of your custom hostnames.")
      .operationId("custom-hostname-for-a-zone-list-custom-hostnames")
      .tag("Custom Hostname for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/", {
      body: Type.Object({
        custom_metadata: Type.Optional(TlsCertificatesAndHostnamesCustomMetadata),
        hostname: TlsCertificatesAndHostnamesHostnamePost,
        ssl: TlsCertificatesAndHostnamesSslpost,
      }),
    })
      .response(TlsCertificatesAndHostnamesCustomHostnameResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: UnnamedSchemaRefD2a16d7ee1ad3a888dd5821c918d51fd,
        }),
      )
      .summary("Create Custom Hostname")
      .description(
        "Add a new custom hostname and request that an SSL certificate be issued for it. One of three validation methods—http, txt, email—should be used, with 'http' recommended if the CNAME is already in place (or will be soon). Specifying 'email' will send an email to the WHOIS contacts on file for the base domain plus hostmaster, postmaster, webmaster, admin, administrator. If http is used and the domain is not already pointing to the Managed CNAME host, the PATCH method must be used once it is (to complete validation).  Enable bundling of certificates using the custom_cert_bundle field. The bundling process requires the following condition One certificate in the bundle must use an RSA, and the other must use an ECDSA.",
      )
      .operationId("custom-hostname-for-a-zone-create-custom-hostname")
      .tag("Custom Hostname for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/fallback_origin", {})
      .response(TlsCertificatesAndHostnamesFallbackOriginResponse)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Get Fallback Origin for Custom Hostnames")
      .operationId("custom-hostname-fallback-origin-for-a-zone-get-fallback-origin-for-custom-hostnames")
      .tag("Custom Hostname Fallback Origin for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/fallback_origin", {
      body: Type.Object({
        origin: TlsCertificatesAndHostnamesOrigin,
      }),
    })
      .response(TlsCertificatesAndHostnamesFallbackOriginResponse)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Update Fallback Origin for Custom Hostnames")
      .operationId("custom-hostname-fallback-origin-for-a-zone-update-fallback-origin-for-custom-hostnames")
      .tag("Custom Hostname Fallback Origin for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/fallback_origin", {})
      .response(TlsCertificatesAndHostnamesFallbackOriginResponse)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Delete Fallback Origin for Custom Hostnames")
      .operationId("custom-hostname-fallback-origin-for-a-zone-delete-fallback-origin-for-custom-hostnames")
      .tag("Custom Hostname Fallback Origin for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{custom_hostname_id}", {
      params: Type.Object({ custom_hostname_id: DlsIdentifier }),
    })
      .response(TlsCertificatesAndHostnamesCustomHostnameResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: UnnamedSchemaRefD2a16d7ee1ad3a888dd5821c918d51fd,
        }),
      )
      .summary("Custom Hostname Details")
      .operationId("custom-hostname-for-a-zone-custom-hostname-details")
      .tag("Custom Hostname for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/{custom_hostname_id}", {
      params: Type.Object({ custom_hostname_id: DlsIdentifier }),
      body: Type.Object({
        custom_metadata: Type.Optional(TlsCertificatesAndHostnamesCustomMetadata),
        custom_origin_server: Type.Optional(TlsCertificatesAndHostnamesCustomOriginServer),
        custom_origin_sni: Type.Optional(TlsCertificatesAndHostnamesCustomOriginSni),
        ssl: Type.Optional(TlsCertificatesAndHostnamesSslpost),
      }),
    })
      .response(TlsCertificatesAndHostnamesCustomHostnameResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: UnnamedSchemaRefD2a16d7ee1ad3a888dd5821c918d51fd,
        }),
      )
      .summary("Edit Custom Hostname")
      .description(
        "Modify SSL configuration for a custom hostname. When sent with SSL config that matches existing config, used to indicate that hostname should pass domain control validation (DCV). Can also be used to change validation type, e.g., from 'http' to 'email'. Bundle an existing certificate with another certificate by using the \"custom_cert_bundle\" field. The bundling process supports combining certificates as long as the following condition is met. One certificate must use the RSA algorithm, and the other must use the ECDSA algorithm.",
      )
      .operationId("custom-hostname-for-a-zone-edit-custom-hostname")
      .tag("Custom Hostname for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{custom_hostname_id}", {
      params: Type.Object({ custom_hostname_id: DlsIdentifier }),
    })
      .response(
        Type.Object({
          id: Type.Optional(DlsIdentifier),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          id: Type.Optional(DlsIdentifier),
          errors: DlpMessages,
          messages: DlpMessages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Delete Custom Hostname (and any issued SSL certificates)")
      .operationId("custom-hostname-for-a-zone-delete-custom-hostname-(-and-any-issued-ssl-certificates)")
      .tag("Custom Hostname for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/{custom_hostname_id}/certificate_pack/{certificate_pack_id}/certificates/{certificate_id}", {
      params: Type.Object({
        custom_hostname_id: DlsIdentifier,
        certificate_pack_id: DlsIdentifier,
        certificate_id: DlsIdentifier,
      }),
      body: TlsCertificatesAndHostnamesCustomCertAndKey,
    })
      .respond(202, TlsCertificatesAndHostnamesCustomHostnameResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: UnnamedSchemaRefD2a16d7ee1ad3a888dd5821c918d51fd,
        }),
      )
      .summary("Replace Custom Certificate and Custom Key In Custom Hostname")
      .description(
        "Replace a single custom certificate within a certificate pack that contains two bundled certificates. The replacement must adhere to the following constraints. You can only replace an RSA certificate with another RSA certificate or an ECDSA certificate with another ECDSA certificate.",
      )
      .operationId("custom-hostname-for-a-zone-edit-custom-certificate-custom-hostname")
      .tag("Custom Hostname for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{custom_hostname_id}/certificate_pack/{certificate_pack_id}/certificates/{certificate_id}", {
      params: Type.Object({
        custom_hostname_id: DlsIdentifier,
        certificate_pack_id: DlsIdentifier,
        certificate_id: DlsIdentifier,
      }),
    })
      .respond(
        202,
        Type.Object({
          id: Type.Optional(DlsIdentifier),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          id: Type.Optional(DlsIdentifier),
          errors: DlpMessages,
          messages: DlpMessages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Delete Single Certificate And Key For Custom Hostname")
      .description(
        "Delete a single custom certificate from a certificate pack that contains two bundled certificates. Deletion is subject to the following constraints. You cannot delete a certificate if it is the only remaining certificate in the pack. At least one certificate must remain in the pack.",
      )
      .operationId("custom-hostname-for-a-zone-delete_single_certificate_and_key_in_a_custom_hostname")
      .tag("Custom Hostname for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

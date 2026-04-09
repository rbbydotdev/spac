import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  DlpMessages,
  DlsIdentifier,
  Identifier,
  TlsCertificatesAndHostnamesBundleMethod,
  TlsCertificatesAndHostnamesHost,
  TlsCertificatesAndHostnamesKeylessResponseSingleId,
  TlsCertificatesAndHostnamesKeylessTunnel,
  TlsCertificatesAndHostnamesPort,
} from "../shared/schemas"
import {
  TlsCertificatesAndHostnamesEnabledWrite,
  TlsCertificatesAndHostnamesKeylessResponseCollection,
  TlsCertificatesAndHostnamesKeylessResponseSingle,
  TlsCertificatesAndHostnamesNameWrite,
  TlsCertificatesAndHostnamesSchemasCertificate,
  UnnamedSchemaRefA91f0bd72ee433f010eecfdc94ccf298,
} from "./schemas"

export function registerKeylessCertificates(api: Api) {
  api.group("/zones/{zone_id}/keyless_certificates", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      responses: {
        200: TlsCertificatesAndHostnamesKeylessResponseCollection,
        "4XX": Type.Object({
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
      },
    })
      .summary("List Keyless SSL Configurations")
      .description("List all Keyless SSL configurations for a given zone.")
      .operationId("keyless-ssl-for-a-zone-list-keyless-ssl-configurations")
      .tag("Keyless SSL for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/", {
      body: Type.Object({
        bundle_method: Type.Optional(TlsCertificatesAndHostnamesBundleMethod),
        certificate: TlsCertificatesAndHostnamesSchemasCertificate,
        host: TlsCertificatesAndHostnamesHost,
        name: Type.Optional(TlsCertificatesAndHostnamesNameWrite),
        port: TlsCertificatesAndHostnamesPort,
        tunnel: Type.Optional(TlsCertificatesAndHostnamesKeylessTunnel),
      }),
      responses: {
        200: TlsCertificatesAndHostnamesKeylessResponseSingle,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: UnnamedSchemaRefA91f0bd72ee433f010eecfdc94ccf298,
        }),
      },
    })
      .summary("Create Keyless SSL Configuration")
      .operationId("keyless-ssl-for-a-zone-create-keyless-ssl-configuration")
      .tag("Keyless SSL for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{keyless_certificate_id}", {
      params: Type.Object({ keyless_certificate_id: DlsIdentifier }),
      responses: {
        200: TlsCertificatesAndHostnamesKeylessResponseSingle,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: UnnamedSchemaRefA91f0bd72ee433f010eecfdc94ccf298,
        }),
      },
    })
      .summary("Get Keyless SSL Configuration")
      .description("Get details for one Keyless SSL configuration.")
      .operationId("keyless-ssl-for-a-zone-get-keyless-ssl-configuration")
      .tag("Keyless SSL for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Trust and Safety Write",
        "Trust and Safety Read",
        "Zero Trust: PII Read",
        "Zaraz Edit",
        "Zaraz Read",
        "Zaraz Admin",
        "Access: Apps and Policies Revoke",
        "Access: Apps and Policies Write",
        "Access: Apps and Policies Read",
        "Access: Apps and Policies Revoke",
        "Access: Mutual TLS Certificates Write",
        "Access: Organizations, Identity Providers, and Groups Write",
        "Zone Settings Write",
        "Zone Settings Read",
        "Zone Read",
        "DNS Read",
        "Workers Scripts Write",
        "Workers Scripts Read",
        "Zone Write",
        "Workers Routes Write",
        "Workers Routes Read",
        "Stream Write",
        "Stream Read",
        "SSL and Certificates Write",
        "SSL and Certificates Read",
        "Logs Write",
        "Logs Read",
        "Cache Purge",
        "Page Rules Write",
        "Page Rules Read",
        "Load Balancers Write",
        "Load Balancers Read",
        "Firewall Services Write",
        "Firewall Services Read",
        "DNS Write",
        "Apps Write",
        "Analytics Read",
        "Access: Apps and Policies Write",
        "Access: Apps and Policies Read",
      ])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:read"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.patch("/{keyless_certificate_id}", {
      params: Type.Object({ keyless_certificate_id: DlsIdentifier }),
      body: Type.Object({
        enabled: Type.Optional(TlsCertificatesAndHostnamesEnabledWrite),
        host: Type.Optional(TlsCertificatesAndHostnamesHost),
        name: Type.Optional(TlsCertificatesAndHostnamesNameWrite),
        port: Type.Optional(TlsCertificatesAndHostnamesPort),
        tunnel: Type.Optional(TlsCertificatesAndHostnamesKeylessTunnel),
      }),
      responses: {
        200: TlsCertificatesAndHostnamesKeylessResponseSingle,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: UnnamedSchemaRefA91f0bd72ee433f010eecfdc94ccf298,
        }),
      },
    })
      .summary("Edit Keyless SSL Configuration")
      .description(
        "This will update attributes of a Keyless SSL. Consists of one or more of the following:  host,name,port.",
      )
      .operationId("keyless-ssl-for-a-zone-edit-keyless-ssl-configuration")
      .tag("Keyless SSL for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/{keyless_certificate_id}", {
      params: Type.Object({ keyless_certificate_id: DlsIdentifier }),
      responses: {
        200: TlsCertificatesAndHostnamesKeylessResponseSingleId,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Identifier,
        }),
      },
    })
      .summary("Delete Keyless SSL Configuration")
      .operationId("keyless-ssl-for-a-zone-delete-keyless-ssl-configuration")
      .tag("Keyless SSL for a Zone")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#ssl:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })
  })
}

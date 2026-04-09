import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages } from "../shared/schemas"
import {
  OutgoingStatus,
  SecondaryDnsAccountIdentifier,
  SecondaryDnsAcl,
  SecondaryDnsAclComponentsSchemasName,
  SecondaryDnsComponentsSchemasIdResponse,
  SecondaryDnsComponentsSchemasIdentifier,
  SecondaryDnsComponentsSchemasName,
  SecondaryDnsComponentsSchemasResponseCollection,
  SecondaryDnsComponentsSchemasSingleResponse,
  SecondaryDnsDisableTransferResponse,
  SecondaryDnsDnsSecondarySecondaryZone,
  SecondaryDnsEnableTransferResponse,
  SecondaryDnsForceResponse,
  SecondaryDnsIdResponse,
  SecondaryDnsIdentifier,
  SecondaryDnsIpRange,
  SecondaryDnsPeer,
  SecondaryDnsResponseCollection,
  SecondaryDnsSchemasForceResponse,
  SecondaryDnsSchemasIdResponse,
  SecondaryDnsSchemasIdentifier,
  SecondaryDnsSchemasResponseCollection,
  SecondaryDnsSchemasSingleResponse,
  SecondaryDnsSingleRequestOutgoing,
  SecondaryDnsSingleResponse,
  SecondaryDnsSingleResponseIncoming,
  SecondaryDnsSingleResponseOutgoing,
  SecondaryDnsTsig,
  UnnamedSchemaRef0e152c3e4c55b8a0ca6531578a42c564,
  UnnamedSchemaRef150c555e27f53dbb40cdce4d6644ff0a,
} from "./schemas"

export function registerSecondaryDns(api: Api) {
  api.assertVersion("3.0.3", "SecondaryDns")

  api
    .get("/accounts/{account_id}/secondary_dns/acls", {
      params: Type.Object({ account_id: SecondaryDnsAccountIdentifier }),
    })
    .response(SecondaryDnsComponentsSchemasResponseCollection)
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
    .summary("List ACLs")
    .description("List ACLs.")
    .operationId("secondary-dns-(-acl)-list-ac-ls")
    .tag("Secondary DNS (ACL)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write", "Account Settings Read"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .post("/accounts/{account_id}/secondary_dns/acls", {
      params: Type.Object({ account_id: SecondaryDnsAccountIdentifier }),
      body: Type.Object({
        ip_range: SecondaryDnsIpRange,
        name: SecondaryDnsAclComponentsSchemasName,
      }),
    })
    .response(SecondaryDnsComponentsSchemasSingleResponse)
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
    .summary("Create ACL")
    .description("Create ACL.")
    .operationId("secondary-dns-(-acl)-create-acl")
    .tag("Secondary DNS (ACL)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .get("/accounts/{account_id}/secondary_dns/acls/{acl_id}", {
      params: Type.Object({
        acl_id: SecondaryDnsComponentsSchemasIdentifier,
        account_id: SecondaryDnsAccountIdentifier,
      }),
    })
    .response(SecondaryDnsComponentsSchemasSingleResponse)
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
    .summary("ACL Details")
    .description("Get ACL.")
    .operationId("secondary-dns-(-acl)-acl-details")
    .tag("Secondary DNS (ACL)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write", "Account Settings Read"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .put("/accounts/{account_id}/secondary_dns/acls/{acl_id}", {
      params: Type.Object({
        acl_id: SecondaryDnsComponentsSchemasIdentifier,
        account_id: SecondaryDnsAccountIdentifier,
      }),
      body: SecondaryDnsAcl,
    })
    .response(SecondaryDnsComponentsSchemasSingleResponse)
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
    .summary("Update ACL")
    .description("Modify ACL.")
    .operationId("secondary-dns-(-acl)-update-acl")
    .tag("Secondary DNS (ACL)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .delete("/accounts/{account_id}/secondary_dns/acls/{acl_id}", {
      params: Type.Object({
        acl_id: SecondaryDnsComponentsSchemasIdentifier,
        account_id: SecondaryDnsAccountIdentifier,
      }),
    })
    .response(SecondaryDnsComponentsSchemasIdResponse)
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
    .summary("Delete ACL")
    .description("Delete ACL.")
    .operationId("secondary-dns-(-acl)-delete-acl")
    .tag("Secondary DNS (ACL)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .get("/accounts/{account_id}/secondary_dns/peers", {
      params: Type.Object({ account_id: SecondaryDnsAccountIdentifier }),
    })
    .response(SecondaryDnsSchemasResponseCollection)
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
    .summary("List Peers")
    .description("List Peers.")
    .operationId("secondary-dns-(-peer)-list-peers")
    .tag("Secondary DNS (Peer)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write", "Account Settings Read"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .post("/accounts/{account_id}/secondary_dns/peers", {
      params: Type.Object({ account_id: SecondaryDnsAccountIdentifier }),
      body: Type.Object({
        name: SecondaryDnsComponentsSchemasName,
      }),
    })
    .response(SecondaryDnsSchemasSingleResponse)
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
    .summary("Create Peer")
    .description("Create Peer.")
    .operationId("secondary-dns-(-peer)-create-peer")
    .tag("Secondary DNS (Peer)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .get("/accounts/{account_id}/secondary_dns/peers/{peer_id}", {
      params: Type.Object({
        peer_id: SecondaryDnsComponentsSchemasIdentifier,
        account_id: SecondaryDnsAccountIdentifier,
      }),
    })
    .response(SecondaryDnsSchemasSingleResponse)
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
    .summary("Peer Details")
    .description("Get Peer.")
    .operationId("secondary-dns-(-peer)-peer-details")
    .tag("Secondary DNS (Peer)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write", "Account Settings Read"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .put("/accounts/{account_id}/secondary_dns/peers/{peer_id}", {
      params: Type.Object({
        peer_id: SecondaryDnsComponentsSchemasIdentifier,
        account_id: SecondaryDnsAccountIdentifier,
      }),
      body: SecondaryDnsPeer,
    })
    .response(SecondaryDnsSchemasSingleResponse)
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
    .summary("Update Peer")
    .description("Modify Peer.")
    .operationId("secondary-dns-(-peer)-update-peer")
    .tag("Secondary DNS (Peer)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .delete("/accounts/{account_id}/secondary_dns/peers/{peer_id}", {
      params: Type.Object({
        peer_id: SecondaryDnsComponentsSchemasIdentifier,
        account_id: SecondaryDnsAccountIdentifier,
      }),
    })
    .response(SecondaryDnsComponentsSchemasIdResponse)
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
    .summary("Delete Peer")
    .description("Delete Peer.")
    .operationId("secondary-dns-(-peer)-delete-peer")
    .tag("Secondary DNS (Peer)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .get("/accounts/{account_id}/secondary_dns/tsigs", {
      params: Type.Object({ account_id: SecondaryDnsAccountIdentifier }),
    })
    .response(SecondaryDnsResponseCollection)
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
    .summary("List TSIGs")
    .description("List TSIGs.")
    .operationId("secondary-dns-(-tsig)-list-tsi-gs")
    .tag("Secondary DNS (TSIG)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write", "Account Settings Read"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .post("/accounts/{account_id}/secondary_dns/tsigs", {
      params: Type.Object({ account_id: SecondaryDnsAccountIdentifier }),
      body: SecondaryDnsTsig,
    })
    .response(SecondaryDnsSingleResponse)
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
    .summary("Create TSIG")
    .description("Create TSIG.")
    .operationId("secondary-dns-(-tsig)-create-tsig")
    .tag("Secondary DNS (TSIG)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .get("/accounts/{account_id}/secondary_dns/tsigs/{tsig_id}", {
      params: Type.Object({ tsig_id: SecondaryDnsSchemasIdentifier, account_id: SecondaryDnsAccountIdentifier }),
    })
    .response(SecondaryDnsSingleResponse)
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
    .summary("TSIG Details")
    .description("Get TSIG.")
    .operationId("secondary-dns-(-tsig)-tsig-details")
    .tag("Secondary DNS (TSIG)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write", "Account Settings Read"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .put("/accounts/{account_id}/secondary_dns/tsigs/{tsig_id}", {
      params: Type.Object({ tsig_id: SecondaryDnsSchemasIdentifier, account_id: SecondaryDnsAccountIdentifier }),
      body: SecondaryDnsTsig,
    })
    .response(SecondaryDnsSingleResponse)
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
    .summary("Update TSIG")
    .description("Modify TSIG.")
    .operationId("secondary-dns-(-tsig)-update-tsig")
    .tag("Secondary DNS (TSIG)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .delete("/accounts/{account_id}/secondary_dns/tsigs/{tsig_id}", {
      params: Type.Object({ tsig_id: SecondaryDnsSchemasIdentifier, account_id: SecondaryDnsAccountIdentifier }),
    })
    .response(SecondaryDnsSchemasIdResponse)
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
    .summary("Delete TSIG")
    .description("Delete TSIG.")
    .operationId("secondary-dns-(-tsig)-delete-tsig")
    .tag("Secondary DNS (TSIG)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .post("/zones/{zone_id}/secondary_dns/force_axfr", {
      params: Type.Object({ zone_id: SecondaryDnsIdentifier }),
    })
    .response(SecondaryDnsForceResponse)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()], {
          description: "When force_axfr query parameter is set to true, the response is a simple string.",
          "x-auditable": true,
        }),
      }),
    )
    .summary("Force AXFR")
    .description("Sends AXFR zone transfer request to primary nameserver(s).")
    .operationId("secondary-dns-(-secondary-zone)-force-axfr")
    .tag("Secondary DNS (Secondary Zone)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write", "Zone Write", "DNS Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .get("/zones/{zone_id}/secondary_dns/incoming", {
      params: Type.Object({ zone_id: SecondaryDnsIdentifier }),
    })
    .response(SecondaryDnsSingleResponseIncoming)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: UnnamedSchemaRef150c555e27f53dbb40cdce4d6644ff0a,
      }),
    )
    .summary("Secondary Zone Configuration Details")
    .description("Get secondary zone configuration for incoming zone transfers.")
    .operationId("secondary-dns-(-secondary-zone)-secondary-zone-configuration-details")
    .tag("Secondary DNS (Secondary Zone)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Zone Settings Write",
      "Zone Settings Read",
      "DNS Read",
      "Zone Write",
      "DNS Write",
    ])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .post("/zones/{zone_id}/secondary_dns/incoming", {
      params: Type.Object({ zone_id: SecondaryDnsIdentifier }),
      body: SecondaryDnsDnsSecondarySecondaryZone,
    })
    .response(SecondaryDnsSingleResponseIncoming)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: UnnamedSchemaRef150c555e27f53dbb40cdce4d6644ff0a,
      }),
    )
    .summary("Create Secondary Zone Configuration")
    .description("Create secondary zone configuration for incoming zone transfers.")
    .operationId("secondary-dns-(-secondary-zone)-create-secondary-zone-configuration")
    .tag("Secondary DNS (Secondary Zone)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write", "Zone Write", "DNS Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .put("/zones/{zone_id}/secondary_dns/incoming", {
      params: Type.Object({ zone_id: SecondaryDnsIdentifier }),
      body: SecondaryDnsDnsSecondarySecondaryZone,
    })
    .response(SecondaryDnsSingleResponseIncoming)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: UnnamedSchemaRef150c555e27f53dbb40cdce4d6644ff0a,
      }),
    )
    .summary("Update Secondary Zone Configuration")
    .description("Update secondary zone configuration for incoming zone transfers.")
    .operationId("secondary-dns-(-secondary-zone)-update-secondary-zone-configuration")
    .tag("Secondary DNS (Secondary Zone)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write", "Zone Write", "DNS Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .delete("/zones/{zone_id}/secondary_dns/incoming", {
      params: Type.Object({ zone_id: SecondaryDnsIdentifier }),
    })
    .response(SecondaryDnsIdResponse)
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
    .summary("Delete Secondary Zone Configuration")
    .description("Delete secondary zone configuration for incoming zone transfers.")
    .operationId("secondary-dns-(-secondary-zone)-delete-secondary-zone-configuration")
    .tag("Secondary DNS (Secondary Zone)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write", "Zone Write", "DNS Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .get("/zones/{zone_id}/secondary_dns/outgoing", {
      params: Type.Object({ zone_id: SecondaryDnsIdentifier }),
    })
    .response(SecondaryDnsSingleResponseOutgoing)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: UnnamedSchemaRef0e152c3e4c55b8a0ca6531578a42c564,
      }),
    )
    .summary("Primary Zone Configuration Details")
    .description("Get primary zone configuration for outgoing zone transfers.")
    .operationId("secondary-dns-(-primary-zone)-primary-zone-configuration-details")
    .tag("Secondary DNS (Primary Zone)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Zone Settings Write",
      "Zone Settings Read",
      "DNS Read",
      "Zone Write",
      "DNS Write",
    ])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .post("/zones/{zone_id}/secondary_dns/outgoing", {
      params: Type.Object({ zone_id: SecondaryDnsIdentifier }),
      body: SecondaryDnsSingleRequestOutgoing,
    })
    .response(SecondaryDnsSingleResponseOutgoing)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: UnnamedSchemaRef0e152c3e4c55b8a0ca6531578a42c564,
      }),
    )
    .summary("Create Primary Zone Configuration")
    .description("Create primary zone configuration for outgoing zone transfers.")
    .operationId("secondary-dns-(-primary-zone)-create-primary-zone-configuration")
    .tag("Secondary DNS (Primary Zone)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write", "Zone Write", "DNS Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .put("/zones/{zone_id}/secondary_dns/outgoing", {
      params: Type.Object({ zone_id: SecondaryDnsIdentifier }),
      body: SecondaryDnsSingleRequestOutgoing,
    })
    .response(SecondaryDnsSingleResponseOutgoing)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: UnnamedSchemaRef0e152c3e4c55b8a0ca6531578a42c564,
      }),
    )
    .summary("Update Primary Zone Configuration")
    .description("Update primary zone configuration for outgoing zone transfers.")
    .operationId("secondary-dns-(-primary-zone)-update-primary-zone-configuration")
    .tag("Secondary DNS (Primary Zone)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write", "Zone Write", "DNS Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .delete("/zones/{zone_id}/secondary_dns/outgoing", {
      params: Type.Object({ zone_id: SecondaryDnsIdentifier }),
    })
    .response(SecondaryDnsIdResponse)
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
    .summary("Delete Primary Zone Configuration")
    .description("Delete primary zone configuration for outgoing zone transfers.")
    .operationId("secondary-dns-(-primary-zone)-delete-primary-zone-configuration")
    .tag("Secondary DNS (Primary Zone)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write", "Zone Write", "DNS Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .post("/zones/{zone_id}/secondary_dns/outgoing/disable", {
      params: Type.Object({ zone_id: SecondaryDnsIdentifier }),
    })
    .response(SecondaryDnsDisableTransferResponse)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: OutgoingStatus,
      }),
    )
    .summary("Disable Outgoing Zone Transfers")
    .description("Disable outgoing zone transfers for primary zone and clears IXFR backlog of primary zone.")
    .operationId("secondary-dns-(-primary-zone)-disable-outgoing-zone-transfers")
    .tag("Secondary DNS (Primary Zone)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write", "Zone Write", "DNS Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .post("/zones/{zone_id}/secondary_dns/outgoing/enable", {
      params: Type.Object({ zone_id: SecondaryDnsIdentifier }),
    })
    .response(SecondaryDnsEnableTransferResponse)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: OutgoingStatus,
      }),
    )
    .summary("Enable Outgoing Zone Transfers")
    .description("Enable outgoing zone transfers for primary zone.")
    .operationId("secondary-dns-(-primary-zone)-enable-outgoing-zone-transfers")
    .tag("Secondary DNS (Primary Zone)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write", "Zone Write", "DNS Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .post("/zones/{zone_id}/secondary_dns/outgoing/force_notify", {
      params: Type.Object({ zone_id: SecondaryDnsIdentifier }),
    })
    .response(SecondaryDnsSchemasForceResponse)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: Type.Union([Type.Null()], {
          description: "When force_notify query parameter is set to true, the response is a simple string.",
          "x-auditable": true,
        }),
      }),
    )
    .summary("Force DNS NOTIFY")
    .description("Notifies the secondary nameserver(s) and clears IXFR backlog of primary zone.")
    .operationId("secondary-dns-(-primary-zone)-force-dns-notify")
    .tag("Secondary DNS (Primary Zone)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write", "Zone Write", "DNS Write"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .get("/zones/{zone_id}/secondary_dns/outgoing/status", {
      params: Type.Object({ zone_id: SecondaryDnsIdentifier }),
    })
    .response(SecondaryDnsEnableTransferResponse)
    .error(
      "4XX",
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true), Type.Literal(false)], {
          description: "Whether the API call was successful.",
        }),
        result: OutgoingStatus,
      }),
    )
    .summary("Get Outgoing Zone Transfer Status")
    .description("Get primary zone transfer status.")
    .operationId("secondary-dns-(-primary-zone)-get-outgoing-zone-transfer-status")
    .tag("Secondary DNS (Primary Zone)")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Zone Settings Write",
      "Zone Settings Read",
      "DNS Read",
      "Zone Write",
      "DNS Write",
    ])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })
}

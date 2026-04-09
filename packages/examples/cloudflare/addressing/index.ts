import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier, MagicPrefix } from "../shared/schemas"
import {
  AddressingAccountIdentifier,
  AddressingAddressMapIdentifier,
  AddressingAdvertisedResponse,
  AddressingApiResponseCollection,
  AddressingApiResponseCommon,
  AddressingApiResponseCommonFailure,
  AddressingAsn,
  AddressingBgpPrefixCreate,
  AddressingBgpPrefixIdentifier,
  AddressingBgpPrefixUpdateAdvertisement,
  AddressingComponentsSchemasAdvertised,
  AddressingComponentsSchemasResponseCollection,
  AddressingComponentsSchemasSingleResponse,
  AddressingCreateBindingRequest,
  AddressingDefaultSni,
  AddressingDelegatedAccountIdentifier,
  AddressingDelegationIdentifier,
  AddressingDescription,
  AddressingEnabled,
  AddressingFullResponse,
  AddressingIdResponse,
  AddressingIp,
  AddressingLeasesComponentsSchemasResponseCollection,
  AddressingLoaDocumentIdentifier,
  AddressingLoaUploadResponse,
  AddressingMembershipRequests,
  AddressingPrefixIdentifier,
  AddressingResponseCollection,
  AddressingResponseCollectionBgp,
  AddressingSchemasAccountIdentifier,
  AddressingSchemasDescription,
  AddressingSchemasResponseCollection,
  AddressingSchemasSingleResponse,
  AddressingServiceBinding,
  AddressingServiceBindingIdentifier,
  AddressingServiceIdentifier,
  AddressingServiceName,
  AddressingSingleResponse,
  AddressingSingleResponseBgp,
  AddressingZoneIdentifier,
  DlsApiResponseCommon,
  DlsApiResponseCommonFailure,
  DlsHostname,
  DlsRegionKey,
  DlsRegionalHostnameResponse,
  DlsRouting,
} from "./schemas"

export function registerAddressing(api: Api) {
  api
    .get("/accounts/{account_id}/addressing/address_maps", {
      params: Type.Object({ account_id: AddressingAccountIdentifier }),
      responses: {
        200: AddressingComponentsSchemasResponseCollection,
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
    .summary("List Address Maps")
    .description("List all address maps owned by the account.")
    .operationId("ip-address-management-address-maps-list-address-maps")
    .tag("IP Address Management Address Maps")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Address Maps Write", "Address Maps Read"])

  api
    .post("/accounts/{account_id}/addressing/address_maps", {
      params: Type.Object({ account_id: AddressingAccountIdentifier }),
      body: Type.Object({
        description: Type.Optional(AddressingSchemasDescription),
        enabled: Type.Optional(AddressingEnabled),
        ips: Type.Optional(Type.Array(AddressingIp)),
        memberships: Type.Optional(AddressingMembershipRequests),
      }),
      responses: {
        200: AddressingFullResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Create Address Map")
    .description("Create a new address map under the account.")
    .operationId("ip-address-management-address-maps-create-address-map")
    .tag("IP Address Management Address Maps")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Address Maps Write"])

  api
    .get("/accounts/{account_id}/addressing/address_maps/{address_map_id}", {
      params: Type.Object({ address_map_id: AddressingAddressMapIdentifier, account_id: AddressingAccountIdentifier }),
      responses: {
        200: AddressingFullResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Address Map Details")
    .description("Show a particular address map owned by the account.")
    .operationId("ip-address-management-address-maps-address-map-details")
    .tag("IP Address Management Address Maps")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Address Maps Write", "Address Maps Read"])

  api
    .patch("/accounts/{account_id}/addressing/address_maps/{address_map_id}", {
      params: Type.Object({ address_map_id: AddressingAddressMapIdentifier, account_id: AddressingAccountIdentifier }),
      body: Type.Object({
        default_sni: Type.Optional(AddressingDefaultSni),
        description: Type.Optional(AddressingSchemasDescription),
        enabled: Type.Optional(AddressingEnabled),
      }),
      responses: {
        200: AddressingComponentsSchemasSingleResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Update Address Map")
    .description("Modify properties of an address map owned by the account.")
    .operationId("ip-address-management-address-maps-update-address-map")
    .tag("IP Address Management Address Maps")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Address Maps Write"])

  api
    .delete("/accounts/{account_id}/addressing/address_maps/{address_map_id}", {
      params: Type.Object({ address_map_id: AddressingAddressMapIdentifier, account_id: AddressingAccountIdentifier }),
      responses: {
        200: AddressingApiResponseCollection,
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
    .summary("Delete Address Map")
    .description(
      "Delete a particular address map owned by the account. An Address Map must be disabled before it can be deleted.",
    )
    .operationId("ip-address-management-address-maps-delete-address-map")
    .tag("IP Address Management Address Maps")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Address Maps Write"])

  api
    .put("/accounts/{account_id}/addressing/address_maps/{address_map_id}/accounts/{account_id}", {
      params: Type.Object({ account_id: AddressingAccountIdentifier, address_map_id: AddressingAddressMapIdentifier }),
      responses: {
        200: AddressingApiResponseCollection,
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
    .summary("Add an account membership to an Address Map")
    .description("Add an account as a member of a particular address map.")
    .operationId("ip-address-management-address-maps-add-an-account-membership-to-an-address-map")
    .tag("IP Address Management Address Maps")
    .security({ api_email: [], api_key: [] })

  api
    .delete("/accounts/{account_id}/addressing/address_maps/{address_map_id}/accounts/{account_id}", {
      params: Type.Object({ account_id: AddressingAccountIdentifier, address_map_id: AddressingAddressMapIdentifier }),
      responses: {
        200: AddressingApiResponseCollection,
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
    .summary("Remove an account membership from an Address Map")
    .description("Remove an account as a member of a particular address map.")
    .operationId("ip-address-management-address-maps-remove-an-account-membership-from-an-address-map")
    .tag("IP Address Management Address Maps")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Address Maps Write"])

  api
    .put("/accounts/{account_id}/addressing/address_maps/{address_map_id}/ips/{ip_address}", {
      params: Type.Object({
        ip_address: AddressingIp,
        address_map_id: AddressingAddressMapIdentifier,
        account_id: AddressingAccountIdentifier,
      }),
      responses: {
        200: AddressingApiResponseCollection,
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
    .summary("Add an IP to an Address Map")
    .description("Add an IP from a prefix owned by the account to a particular address map.")
    .operationId("ip-address-management-address-maps-add-an-ip-to-an-address-map")
    .tag("IP Address Management Address Maps")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Address Maps Write"])

  api
    .delete("/accounts/{account_id}/addressing/address_maps/{address_map_id}/ips/{ip_address}", {
      params: Type.Object({
        ip_address: AddressingIp,
        address_map_id: AddressingAddressMapIdentifier,
        account_id: AddressingAccountIdentifier,
      }),
      responses: {
        200: AddressingApiResponseCollection,
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
    .summary("Remove an IP from an Address Map")
    .description("Remove an IP from a particular address map.")
    .operationId("ip-address-management-address-maps-remove-an-ip-from-an-address-map")
    .tag("IP Address Management Address Maps")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Address Maps Write"])

  api
    .put("/accounts/{account_id}/addressing/address_maps/{address_map_id}/zones/{zone_id}", {
      params: Type.Object({
        zone_id: AddressingZoneIdentifier,
        address_map_id: AddressingAddressMapIdentifier,
        account_id: AddressingAccountIdentifier,
      }),
      responses: {
        200: AddressingApiResponseCollection,
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
    .summary("Add a zone membership to an Address Map")
    .description("Add a zone as a member of a particular address map.")
    .operationId("ip-address-management-address-maps-add-a-zone-membership-to-an-address-map")
    .tag("IP Address Management Address Maps")
    .security({ api_email: [], api_key: [] })

  api
    .delete("/accounts/{account_id}/addressing/address_maps/{address_map_id}/zones/{zone_id}", {
      params: Type.Object({
        zone_id: AddressingZoneIdentifier,
        address_map_id: AddressingAddressMapIdentifier,
        account_id: AddressingAccountIdentifier,
      }),
      responses: {
        200: AddressingApiResponseCollection,
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
    .summary("Remove a zone membership from an Address Map")
    .description("Remove a zone as a member of a particular address map.")
    .operationId("ip-address-management-address-maps-remove-a-zone-membership-from-an-address-map")
    .tag("IP Address Management Address Maps")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Address Maps Write"])

  api
    .get("/accounts/{account_id}/addressing/leases", {
      params: Type.Object({ account_id: AddressingSchemasAccountIdentifier }),
      responses: {
        200: AddressingLeasesComponentsSchemasResponseCollection,
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
    .summary("List Leases")
    .description("List all leases owned by the account.")
    .operationId("ip-address-management-list-leases")
    .tag("IP Address Management Leases")
    .security({ api_email: [], api_key: [] })

  api
    .post("/accounts/{account_id}/addressing/loa_documents", {
      params: Type.Object({ account_id: AddressingAccountIdentifier }),
      responses: {
        201: AddressingLoaUploadResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Upload LOA Document")
    .description("Submit LOA document (pdf format) under the account.")
    .operationId("ip-address-management-prefixes-upload-loa-document")
    .tag("IP Address Management Prefixes")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Magic Transit Write"])

  api
    .get("/accounts/{account_id}/addressing/loa_documents/{loa_document_id}/download", {
      params: Type.Object({
        loa_document_id: AddressingLoaDocumentIdentifier,
        account_id: AddressingAccountIdentifier,
      }),
      responses: {
        "4XX": AddressingApiResponseCommonFailure,
      },
    })
    .summary("Download LOA Document")
    .description("Download specified LOA document under the account.")
    .operationId("ip-address-management-prefixes-download-loa-document")
    .tag("IP Address Management Prefixes")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Magic Transit Read", "Magic Transit Write"])

  api
    .get("/accounts/{account_id}/addressing/prefixes", {
      params: Type.Object({ account_id: AddressingAccountIdentifier }),
      responses: {
        200: AddressingResponseCollection,
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
    .summary("List Prefixes")
    .description("List all prefixes owned by the account.")
    .operationId("ip-address-management-prefixes-list-prefixes")
    .tag("IP Address Management Prefixes")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Magic Transit Read",
      "Magic Transit Write",
      "IP Prefixes: Write",
      "IP Prefixes: Read",
      "IP Prefixes: BGP On Demand Write",
      "IP Prefixes: BGP On Demand Read",
    ])

  api
    .post("/accounts/{account_id}/addressing/prefixes", {
      params: Type.Object({ account_id: AddressingAccountIdentifier }),
      body: Type.Object({
        asn: AddressingAsn,
        cidr: MagicPrefix,
        loa_document_id: AddressingLoaDocumentIdentifier,
      }),
      responses: {
        201: AddressingSingleResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Add Prefix")
    .description("Add a new prefix under the account.")
    .operationId("ip-address-management-prefixes-add-prefix")
    .tag("IP Address Management Prefixes")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", null)

  api
    .get("/accounts/{account_id}/addressing/prefixes/{prefix_id}", {
      params: Type.Object({ prefix_id: AddressingPrefixIdentifier, account_id: AddressingAccountIdentifier }),
      responses: {
        200: AddressingSingleResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Prefix Details")
    .description("List a particular prefix owned by the account.")
    .operationId("ip-address-management-prefixes-prefix-details")
    .tag("IP Address Management Prefixes")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Magic Transit Read",
      "Magic Transit Write",
      "IP Prefixes: Write",
      "IP Prefixes: Read",
      "IP Prefixes: BGP On Demand Write",
      "IP Prefixes: BGP On Demand Read",
    ])

  api
    .patch("/accounts/{account_id}/addressing/prefixes/{prefix_id}", {
      params: Type.Object({ prefix_id: AddressingPrefixIdentifier, account_id: AddressingAccountIdentifier }),
      body: Type.Object({
        description: AddressingDescription,
      }),
      responses: {
        200: AddressingSingleResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Update Prefix Description")
    .description("Modify the description for a prefix owned by the account.")
    .operationId("ip-address-management-prefixes-update-prefix-description")
    .tag("IP Address Management Prefixes")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Magic Transit Write", "IP Prefixes: Write"])

  api
    .delete("/accounts/{account_id}/addressing/prefixes/{prefix_id}", {
      params: Type.Object({ prefix_id: AddressingPrefixIdentifier, account_id: AddressingAccountIdentifier }),
      responses: {
        200: AddressingApiResponseCollection,
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
    .summary("Delete Prefix")
    .description("Delete an unapproved prefix owned by the account.")
    .operationId("ip-address-management-prefixes-delete-prefix")
    .tag("IP Address Management Prefixes")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Magic Transit Write"])

  api
    .get("/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes", {
      params: Type.Object({ account_id: AddressingAccountIdentifier, prefix_id: AddressingPrefixIdentifier }),
      responses: {
        200: AddressingResponseCollectionBgp,
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
    .summary("List BGP Prefixes")
    .description(
      "List all BGP Prefixes within the specified IP Prefix. BGP Prefixes are used to control which specific subnets are advertised to the Internet. It is possible to advertise subnets more specific than an IP Prefix by creating more specific BGP Prefixes.",
    )
    .operationId("ip-address-management-prefixes-list-bgp-prefixes")
    .tag("IP Address Management BGP Prefixes")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Magic Transit Read",
      "Magic Transit Write",
      "IP Prefixes: Write",
      "IP Prefixes: Read",
      "IP Prefixes: BGP On Demand Write",
      "IP Prefixes: BGP On Demand Read",
    ])

  api
    .post("/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes", {
      params: Type.Object({ account_id: AddressingAccountIdentifier, prefix_id: AddressingPrefixIdentifier }),
      body: AddressingBgpPrefixCreate,
      responses: {
        200: AddressingSingleResponseBgp,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Create BGP Prefix")
    .description(
      "Create a BGP prefix, controlling the BGP advertisement status of a specific subnet. When created, BGP prefixes are initially withdrawn, and can be advertised with the Update BGP Prefix API.",
    )
    .operationId("ip-address-management-prefixes-create-bgp-prefix")
    .tag("IP Address Management BGP Prefixes")
    .security({ api_email: [], api_key: [] })

  api
    .get("/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes/{bgp_prefix_id}", {
      params: Type.Object({
        account_id: AddressingAccountIdentifier,
        prefix_id: AddressingPrefixIdentifier,
        bgp_prefix_id: AddressingBgpPrefixIdentifier,
      }),
      responses: {
        200: AddressingSingleResponseBgp,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Fetch BGP Prefix")
    .description("Retrieve a single BGP Prefix according to its identifier")
    .operationId("ip-address-management-prefixes-fetch-bgp-prefix")
    .tag("IP Address Management BGP Prefixes")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Magic Transit Read",
      "Magic Transit Write",
      "IP Prefixes: Write",
      "IP Prefixes: Read",
      "IP Prefixes: BGP On Demand Write",
      "IP Prefixes: BGP On Demand Read",
    ])

  api
    .patch("/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes/{bgp_prefix_id}", {
      params: Type.Object({
        account_id: AddressingAccountIdentifier,
        prefix_id: AddressingPrefixIdentifier,
        bgp_prefix_id: AddressingBgpPrefixIdentifier,
      }),
      body: AddressingBgpPrefixUpdateAdvertisement,
      responses: {
        200: AddressingSingleResponseBgp,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Update BGP Prefix")
    .description(
      "Update the properties of a BGP Prefix, such as the on demand advertisement status (advertised or withdrawn).",
    )
    .operationId("ip-address-management-prefixes-update-bgp-prefix")
    .tag("IP Address Management BGP Prefixes")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Magic Transit Write", "IP Prefixes: Write", "IP Prefixes: BGP On Demand Write"])

  api
    .delete("/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes/{bgp_prefix_id}", {
      params: Type.Object({
        account_id: AddressingAccountIdentifier,
        prefix_id: AddressingPrefixIdentifier,
        bgp_prefix_id: AddressingBgpPrefixIdentifier,
      }),
      responses: {
        200: AddressingApiResponseCommon,
        "4XX": AddressingApiResponseCommonFailure,
      },
    })
    .summary("Delete BGP Prefix")
    .description(
      "Delete a BGP Prefix associated with the specified IP Prefix. A BGP Prefix must be withdrawn before it can be deleted.",
    )
    .operationId("ip-address-management-prefixes-delete-bgp-prefix")
    .tag("IP Address Management BGP Prefixes")
    .security({ api_email: [], api_key: [] })

  api
    .get("/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/status", {
      params: Type.Object({ prefix_id: AddressingPrefixIdentifier, account_id: AddressingAccountIdentifier }),
      responses: {
        200: AddressingAdvertisedResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Get Advertisement Status")
    .description(
      "View the current advertisement state for a prefix.\n\n**Deprecated:** Prefer the BGP Prefixes endpoints, which additionally allow for advertising and withdrawing \nsubnets of an IP prefix.\n",
    )
    .operationId("ip-address-management-dynamic-advertisement-get-advertisement-status")
    .tag("IP Address Management Dynamic Advertisement")
    .deprecated()
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Magic Transit Read",
      "Magic Transit Write",
      "IP Prefixes: Write",
      "IP Prefixes: Read",
      "IP Prefixes: BGP On Demand Write",
      "IP Prefixes: BGP On Demand Read",
    ])

  api
    .patch("/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/status", {
      params: Type.Object({ prefix_id: AddressingPrefixIdentifier, account_id: AddressingAccountIdentifier }),
      body: Type.Object({
        advertised: AddressingComponentsSchemasAdvertised,
      }),
      responses: {
        200: AddressingAdvertisedResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Update Prefix Dynamic Advertisement Status")
    .description(
      "Advertise or withdraw the BGP route for a prefix.\n\n**Deprecated:** Prefer the BGP Prefixes endpoints, which additionally allow for advertising and withdrawing \nsubnets of an IP prefix.\n",
    )
    .operationId("ip-address-management-dynamic-advertisement-update-prefix-dynamic-advertisement-status")
    .tag("IP Address Management Dynamic Advertisement")
    .deprecated()
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Magic Transit Write", "IP Prefixes: Write", "IP Prefixes: BGP On Demand Write"])

  api
    .get("/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings", {
      params: Type.Object({ account_id: AddressingAccountIdentifier, prefix_id: AddressingPrefixIdentifier }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(Type.Array(AddressingServiceBinding)),
        }),
        "4XX": AddressingApiResponseCommonFailure,
      },
    })
    .summary("List Service Bindings")
    .description(
      "List the Cloudflare services this prefix is currently bound to. Traffic sent to an address within an IP prefix will be routed to the Cloudflare service of the most-specific Service Binding matching the address.\n**Example:** binding `192.0.2.0/24` to Cloudflare Magic Transit and `192.0.2.1/32` to the Cloudflare CDN would route traffic for `192.0.2.1` to the CDN, and traffic for all other IPs in the prefix to Cloudflare Magic Transit.\n",
    )
    .operationId("ip-address-management-service-bindings-list-service-bindings")
    .tag("IP Address Management Service Bindings")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["IP Prefixes: Write", "IP Prefixes: Read"])

  api
    .post("/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings", {
      params: Type.Object({ account_id: AddressingAccountIdentifier, prefix_id: AddressingPrefixIdentifier }),
      body: AddressingCreateBindingRequest,
      responses: {
        201: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(AddressingServiceBinding),
        }),
        "4XX": AddressingApiResponseCommonFailure,
      },
    })
    .summary("Create Service Binding")
    .description(
      "Creates a new Service Binding, routing traffic to IPs within the given CIDR to a service running on Cloudflare's network.\n**Note:** This API may only be used on prefixes currently configured with a Magic Transit/Cloudflare CDN/Cloudflare Spectrum service binding, and only allows creating upgrade service bindings for the Cloudflare CDN or Cloudflare Spectrum.\n",
    )
    .operationId("ip-address-management-service-bindings-create-service-binding")
    .tag("IP Address Management Service Bindings")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["IP Prefixes: Write"])

  api
    .get("/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings/{binding_id}", {
      params: Type.Object({
        account_id: AddressingAccountIdentifier,
        prefix_id: AddressingPrefixIdentifier,
        binding_id: AddressingServiceBindingIdentifier,
      }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(AddressingServiceBinding),
        }),
        "4XX": AddressingApiResponseCommonFailure,
      },
    })
    .summary("Get Service Binding")
    .description("Fetch a single Service Binding")
    .operationId("ip-address-management-service-bindings-get-service-binding")
    .tag("IP Address Management Service Bindings")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["IP Prefixes: Write", "IP Prefixes: Read"])

  api
    .delete("/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings/{binding_id}", {
      params: Type.Object({
        account_id: AddressingAccountIdentifier,
        prefix_id: AddressingPrefixIdentifier,
        binding_id: AddressingServiceBindingIdentifier,
      }),
      responses: {
        200: AddressingApiResponseCommon,
        "4XX": AddressingApiResponseCommonFailure,
      },
    })
    .summary("Delete Service Binding")
    .description("Delete a Service Binding")
    .operationId("ip-address-management-service-bindings-delete-service-binding")
    .tag("IP Address Management Service Bindings")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["IP Prefixes: Write"])

  api
    .get("/accounts/{account_id}/addressing/prefixes/{prefix_id}/delegations", {
      params: Type.Object({ prefix_id: AddressingPrefixIdentifier, account_id: AddressingAccountIdentifier }),
      responses: {
        200: AddressingSchemasResponseCollection,
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
    .summary("List Prefix Delegations")
    .description("List all delegations for a given account IP prefix.")
    .operationId("ip-address-management-prefix-delegation-list-prefix-delegations")
    .tag("IP Address Management Prefix Delegation")
    .security({ api_email: [], api_key: [] })

  api
    .post("/accounts/{account_id}/addressing/prefixes/{prefix_id}/delegations", {
      params: Type.Object({ prefix_id: AddressingPrefixIdentifier, account_id: AddressingAccountIdentifier }),
      body: Type.Object({
        cidr: MagicPrefix,
        delegated_account_id: AddressingDelegatedAccountIdentifier,
      }),
      responses: {
        200: AddressingSchemasSingleResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Create Prefix Delegation")
    .description("Create a new account delegation for a given IP prefix.")
    .operationId("ip-address-management-prefix-delegation-create-prefix-delegation")
    .tag("IP Address Management Prefix Delegation")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["IP Prefixes: Write"])

  api
    .delete("/accounts/{account_id}/addressing/prefixes/{prefix_id}/delegations/{delegation_id}", {
      params: Type.Object({
        delegation_id: AddressingDelegationIdentifier,
        prefix_id: AddressingPrefixIdentifier,
        account_id: AddressingAccountIdentifier,
      }),
      responses: {
        200: AddressingIdResponse,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Delete Prefix Delegation")
    .description("Delete an account delegation for a given IP prefix.")
    .operationId("ip-address-management-prefix-delegation-delete-prefix-delegation")
    .tag("IP Address Management Prefix Delegation")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["IP Prefixes: Write"])

  api
    .get("/accounts/{account_id}/addressing/regional_hostnames/regions", {
      params: Type.Object({ account_id: DlsIdentifier }),
      responses: {
        200: Type.Object({
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
          result: Type.Optional(
            Type.Array(
              Type.Object({
                key: Type.Optional(DlsRegionKey),
                label: Type.Optional(Type.String({ description: "Human-readable text label for the region" })),
              }),
            ),
          ),
        }),
        "4XX": DlsApiResponseCommonFailure,
      },
    })
    .summary("List Regions")
    .description("List all Regional Services regions available for use by this account.")
    .operationId("dls-account-regional-hostnames-account-list-regions")
    .tag("DLS Regional Services")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["DNS Read", "DNS Write"])

  api
    .get("/accounts/{account_id}/addressing/services", {
      params: Type.Object({ account_id: AddressingAccountIdentifier }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Array(
              Type.Object({
                id: Type.Optional(AddressingServiceIdentifier),
                name: Type.Optional(AddressingServiceName),
              }),
            ),
          ),
        }),
        "4XX": AddressingApiResponseCommonFailure,
      },
    })
    .summary("List Services")
    .description(
      "Bring-Your-Own IP (BYOIP) prefixes onboarded to Cloudflare must be bound to a service running on the Cloudflare network to enable a Cloudflare product on the IP addresses. This endpoint can be used as a reference of available services on the Cloudflare network, and their service IDs.\n",
    )
    .operationId("ip-address-management-service-bindings-list-services")
    .tag("IP Address Management Service Bindings")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["IP Prefixes: Write", "IP Prefixes: Read"])

  api
    .get("/zones/{zone_id}/addressing/regional_hostnames", {
      params: Type.Object({ zone_id: DlsIdentifier }),
      responses: {
        200: Type.Object({
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
          result: Type.Optional(Type.Array(DlsRegionalHostnameResponse)),
        }),
        "4XX": DlsApiResponseCommonFailure,
      },
    })
    .summary("List Regional Hostnames")
    .description("List all Regional Hostnames within a zone.")
    .operationId("dls-account-regional-hostnames-account-list-hostnames")
    .tag("DLS Regional Services")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["DNS Read", "DNS Write"])

  api
    .post("/zones/{zone_id}/addressing/regional_hostnames", {
      params: Type.Object({ zone_id: DlsIdentifier }),
      body: Type.Object({
        hostname: DlsHostname,
        region_key: DlsRegionKey,
        routing: Type.Optional(DlsRouting),
      }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlsRegionalHostnameResponse),
        }),
        "4XX": DlsApiResponseCommonFailure,
      },
    })
    .summary("Create Regional Hostname")
    .description(
      "Create a new Regional Hostname entry. Cloudflare will only use data centers that are physically located within the chosen region to decrypt and service HTTPS traffic. Learn more about [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/get-started/).",
    )
    .operationId("dls-account-regional-hostnames-account-create-hostname")
    .tag("DLS Regional Services")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["DNS Write"])

  api
    .get("/zones/{zone_id}/addressing/regional_hostnames/{hostname}", {
      params: Type.Object({ zone_id: DlsIdentifier, hostname: DlsHostname }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlsRegionalHostnameResponse),
        }),
        "4XX": DlsApiResponseCommonFailure,
      },
    })
    .summary("Fetch Regional Hostname")
    .description("Fetch the configuration for a specific Regional Hostname, within a zone.")
    .operationId("dls-account-regional-hostnames-account-fetch-hostname")
    .tag("DLS Regional Services")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["DNS Read", "DNS Write"])

  api
    .patch("/zones/{zone_id}/addressing/regional_hostnames/{hostname}", {
      params: Type.Object({ zone_id: DlsIdentifier, hostname: DlsHostname }),
      body: Type.Object({
        region_key: DlsRegionKey,
      }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlsRegionalHostnameResponse),
        }),
        "4XX": DlsApiResponseCommonFailure,
      },
    })
    .summary("Update Regional Hostname")
    .description(
      "Update the configuration for a specific Regional Hostname. Only the region_key of a hostname is mutable.",
    )
    .operationId("dls-account-regional-hostnames-account-patch-hostname")
    .tag("DLS Regional Services")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["DNS Write"])

  api
    .delete("/zones/{zone_id}/addressing/regional_hostnames/{hostname}", {
      params: Type.Object({ zone_id: DlsIdentifier, hostname: DlsHostname }),
      responses: {
        200: DlsApiResponseCommon,
        "4XX": DlsApiResponseCommonFailure,
      },
    })
    .summary("Delete Regional Hostname")
    .description("Delete the region configuration for a specific Regional Hostname.")
    .operationId("dls-account-regional-hostnames-account-delete-hostname")
    .tag("DLS Regional Services")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["DNS Write"])
}

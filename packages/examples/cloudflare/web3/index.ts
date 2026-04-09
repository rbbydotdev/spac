import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages } from "../shared/schemas"
import {
  UnnamedSchemaRef2e420942fb77cd2cd2ba3ca7b5f32e1e,
  UnnamedSchemaRef5e618833803e286db9ee7c73727f8b86,
  Web3ApiResponseSingleId,
  Web3CollectionResponse,
  Web3ContentListDetailsResponse,
  Web3ContentListEntryCollectionResponse,
  Web3ContentListEntryCreateRequest,
  Web3ContentListEntrySingleResponse,
  Web3ContentListUpdateRequest,
  Web3CreateRequest,
  Web3Identifier,
  Web3ModifyRequest,
  Web3ResultInfo,
  Web3SingleResponse,
} from "./schemas"

export function registerWeb3(api: Api) {
  api.group("/zones/{zone_id}/web3/hostnames", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      responses: {
        200: Web3CollectionResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(Web3ResultInfo),
        }),
        "5XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(Web3ResultInfo),
        }),
      },
    })
      .summary("List Web3 Hostnames")
      .operationId("web3-hostname-list-web3-hostnames")
      .tag("Web3 Hostname")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Web3 Hostnames Write", "Web3 Hostnames Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/", {
      body: Web3CreateRequest,
      responses: {
        200: Web3SingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(Web3ResultInfo),
        }),
        "5XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef2e420942fb77cd2cd2ba3ca7b5f32e1e,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(
            Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
              description: "Provides the API response.",
            }),
          ),
        }),
      },
    })
      .summary("Create Web3 Hostname")
      .operationId("web3-hostname-create-web3-hostname")
      .tag("Web3 Hostname")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Web3 Hostnames Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{identifier}", {
      params: Type.Object({ identifier: Web3Identifier }),
      responses: {
        200: Web3SingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(Web3ResultInfo),
        }),
        "5XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef2e420942fb77cd2cd2ba3ca7b5f32e1e,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(
            Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
              description: "Provides the API response.",
            }),
          ),
        }),
      },
    })
      .summary("Web3 Hostname Details")
      .operationId("web3-hostname-web3-hostname-details")
      .tag("Web3 Hostname")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Web3 Hostnames Write", "Web3 Hostnames Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/{identifier}", {
      params: Type.Object({ identifier: Web3Identifier }),
      body: Web3ModifyRequest,
      responses: {
        200: Web3SingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(Web3ResultInfo),
        }),
        "5XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef2e420942fb77cd2cd2ba3ca7b5f32e1e,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(
            Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
              description: "Provides the API response.",
            }),
          ),
        }),
      },
    })
      .summary("Edit Web3 Hostname")
      .operationId("web3-hostname-edit-web3-hostname")
      .tag("Web3 Hostname")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Web3 Hostnames Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{identifier}", {
      params: Type.Object({ identifier: Web3Identifier }),
      responses: {
        200: Web3ApiResponseSingleId,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(Web3ResultInfo),
        }),
        "5XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Delete Web3 Hostname")
      .operationId("web3-hostname-delete-web3-hostname")
      .tag("Web3 Hostname")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Web3 Hostnames Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{identifier}/ipfs_universal_path/content_list", {
      params: Type.Object({ identifier: Web3Identifier }),
      responses: {
        200: Web3ContentListDetailsResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(
            Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
              description: "Provides the API response.",
            }),
          ),
        }),
        "5XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(
            Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
              description: "Provides the API response.",
            }),
          ),
        }),
      },
    })
      .summary("IPFS Universal Path Gateway Content List Details")
      .operationId("web3-hostname-ipfs-universal-path-gateway-content-list-details")
      .tag("Web3 Hostname")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Web3 Hostnames Write", "Web3 Hostnames Read"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/{identifier}/ipfs_universal_path/content_list", {
      params: Type.Object({ identifier: Web3Identifier }),
      body: Web3ContentListUpdateRequest,
      responses: {
        200: Web3ContentListDetailsResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(
            Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
              description: "Provides the API response.",
            }),
          ),
        }),
        "5XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(
            Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
              description: "Provides the API response.",
            }),
          ),
        }),
      },
    })
      .summary("Update IPFS Universal Path Gateway Content List")
      .operationId("web3-hostname-update-ipfs-universal-path-gateway-content-list")
      .tag("Web3 Hostname")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Web3 Hostnames Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{identifier}/ipfs_universal_path/content_list/entries", {
      params: Type.Object({ identifier: Web3Identifier }),
      responses: {
        200: Web3ContentListEntryCollectionResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(Web3ResultInfo),
        }),
        "5XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(Web3ResultInfo),
        }),
      },
    })
      .summary("List IPFS Universal Path Gateway Content List Entries")
      .operationId("web3-hostname-list-ipfs-universal-path-gateway-content-list-entries")
      .tag("Web3 Hostname")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Web3 Hostnames Write", "Web3 Hostnames Read"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/{identifier}/ipfs_universal_path/content_list/entries", {
      params: Type.Object({ identifier: Web3Identifier }),
      body: Web3ContentListEntryCreateRequest,
      responses: {
        200: Web3ContentListEntrySingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef5e618833803e286db9ee7c73727f8b86,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(
            Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
              description: "Provides the API response.",
            }),
          ),
        }),
        "5XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef5e618833803e286db9ee7c73727f8b86,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(
            Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
              description: "Provides the API response.",
            }),
          ),
        }),
      },
    })
      .summary("Create IPFS Universal Path Gateway Content List Entry")
      .operationId("web3-hostname-create-ipfs-universal-path-gateway-content-list-entry")
      .tag("Web3 Hostname")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{identifier}/ipfs_universal_path/content_list/entries/{content_list_entry_identifier}", {
      params: Type.Object({ content_list_entry_identifier: Web3Identifier, identifier: Web3Identifier }),
      responses: {
        200: Web3ContentListEntrySingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef5e618833803e286db9ee7c73727f8b86,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(
            Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
              description: "Provides the API response.",
            }),
          ),
        }),
        "5XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef5e618833803e286db9ee7c73727f8b86,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(
            Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
              description: "Provides the API response.",
            }),
          ),
        }),
      },
    })
      .summary("IPFS Universal Path Gateway Content List Entry Details")
      .operationId("web3-hostname-ipfs-universal-path-gateway-content-list-entry-details")
      .tag("Web3 Hostname")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Web3 Hostnames Write", "Web3 Hostnames Read"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/{identifier}/ipfs_universal_path/content_list/entries/{content_list_entry_identifier}", {
      params: Type.Object({ content_list_entry_identifier: Web3Identifier, identifier: Web3Identifier }),
      body: Web3ContentListEntryCreateRequest,
      responses: {
        200: Web3ContentListEntrySingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef5e618833803e286db9ee7c73727f8b86,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(
            Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
              description: "Provides the API response.",
            }),
          ),
        }),
        "5XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef5e618833803e286db9ee7c73727f8b86,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
          result_info: Type.Optional(
            Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
              description: "Provides the API response.",
            }),
          ),
        }),
      },
    })
      .summary("Edit IPFS Universal Path Gateway Content List Entry")
      .operationId("web3-hostname-edit-ipfs-universal-path-gateway-content-list-entry")
      .tag("Web3 Hostname")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Web3 Hostnames Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/{identifier}/ipfs_universal_path/content_list/entries/{content_list_entry_identifier}", {
      params: Type.Object({ content_list_entry_identifier: Web3Identifier, identifier: Web3Identifier }),
      responses: {
        200: Web3ApiResponseSingleId,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
        }),
        "5XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Specifies whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Delete IPFS Universal Path Gateway Content List Entry")
      .operationId("web3-hostname-delete-ipfs-universal-path-gateway-content-list-entry")
      .tag("Web3 Hostname")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Web3 Hostnames Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })
  })
}

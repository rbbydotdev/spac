import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages, Web3Timestamp } from "../shared/schemas"

export const Web3ContentListEntryContent = named(
  "web3_content_list_entry_content",
  Type.String({ description: "Specify the CID or content path of content to block.", maxLength: 500 }),
)

export const Web3ContentListEntryDescription = named(
  "web3_content_list_entry_description",
  Type.String({ description: "Specify an optional description of the content list entry.", maxLength: 500 }),
)

export const Web3Identifier = named(
  "web3_identifier",
  Type.String({ description: "Specify the identifier of the hostname.", maxLength: 32, readOnly: true }),
)

export const Web3ContentListEntryType = named(
  "web3_content_list_entry_type",
  Type.Union([Type.Literal("cid"), Type.Literal("content_path")], {
    description: "Specify the type of content list entry to block.",
  }),
)

export const UnnamedSchemaRef5e618833803e286db9ee7c73727f8b86 = named(
  "unnamed_schema_ref_5e618833803e286db9ee7c73727f8b86",
  Type.Union([Type.Null()], { description: "Specify a content list entry to block." }),
)

export const Web3ContentListEntry = named(
  "web3_content_list_entry",
  Type.Object(
    {
      content: Type.Optional(Web3ContentListEntryContent),
      created_on: Type.Optional(Web3Timestamp),
      description: Type.Optional(Web3ContentListEntryDescription),
      id: Type.Optional(Web3Identifier),
      modified_on: Type.Optional(Web3Timestamp),
      type: Type.Optional(Web3ContentListEntryType),
    },
    { description: "Specify a content list entry to block." },
  ),
)

export const Web3ContentListEntrySingleResponse = named(
  "web3_content_list_entry_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Web3ContentListEntry,
    success: Type.Union([Type.Literal(true)], { description: "Specifies whether the API call was successful." }),
    result_info: Type.Optional(
      Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
        description: "Provides the API response.",
      }),
    ),
  }),
)

export const Web3ContentListEntryCreateRequest = named(
  "web3_content_list_entry_create_request",
  Type.Object({
    content: Web3ContentListEntryContent,
    description: Type.Optional(Web3ContentListEntryDescription),
    type: Web3ContentListEntryType,
  }),
)

export const Web3ContentListEntries = named(
  "web3_content_list_entries",
  Type.Array(Web3ContentListEntry, { description: "Provides content list entries." }),
)

export const Web3ResultInfo = named(
  "web3_result_info",
  Type.Object({
    count: Type.Optional(
      Type.Number({ description: "Specifies the total number of results for the requested service." }),
    ),
    page: Type.Optional(Type.Number({ description: "Specifies the current page within paginated list of results." })),
    per_page: Type.Optional(Type.Number({ description: "Specifies the number of results per page of results." })),
    total_count: Type.Optional(
      Type.Number({ description: "Specifies the total results available without any search parameters." }),
    ),
  }),
)

export const Web3ContentListEntryCollectionResponse = named(
  "web3_content_list_entry_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([
      Type.Object({
        entries: Type.Optional(Web3ContentListEntries),
      }),
      Type.Null(),
    ]),
    success: Type.Union([Type.Literal(true)], { description: "Specifies whether the API call was successful." }),
    result_info: Type.Optional(Web3ResultInfo),
  }),
)

export const Web3ContentListAction = named(
  "web3_content_list_action",
  Type.Union([Type.Literal("block")], { description: "Behavior of the content list." }),
)

export const Web3ContentListUpdateRequest = named(
  "web3_content_list_update_request",
  Type.Object({
    action: Web3ContentListAction,
    entries: Web3ContentListEntries,
  }),
)

export const Web3ContentListDetails = named(
  "web3_content_list_details",
  Type.Object({
    action: Type.Optional(Web3ContentListAction),
  }),
)

export const Web3ContentListDetailsResponse = named(
  "web3_content_list_details_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Web3ContentListDetails,
    success: Type.Union([Type.Literal(true)], { description: "Specifies whether the API call was successful." }),
    result_info: Type.Optional(
      Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
        description: "Provides the API response.",
      }),
    ),
  }),
)

export const Web3ApiResponseSingleId = named(
  "web3_api-response-single-id",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([
      Type.Object({
        id: Web3Identifier,
      }),
      Type.Null(),
    ]),
    success: Type.Union([Type.Literal(true)], { description: "Specifies whether the API call was successful." }),
  }),
)

export const Web3Description = named(
  "web3_description",
  Type.String({ description: "Specify an optional description of the hostname.", maxLength: 500 }),
)

export const Web3Dnslink = named(
  "web3_dnslink",
  Type.String({ description: "Specify the DNSLink value used if the target is ipfs." }),
)

export const Web3ModifyRequest = named(
  "web3_modify_request",
  Type.Object({
    description: Type.Optional(Web3Description),
    dnslink: Type.Optional(Web3Dnslink),
  }),
)

export const Web3Name = named(
  "web3_name",
  Type.String({ description: "Specify the hostname that points to the target gateway via CNAME.", maxLength: 255 }),
)

export const Web3Status = named(
  "web3_status",
  Type.Union([Type.Literal("active"), Type.Literal("pending"), Type.Literal("deleting"), Type.Literal("error")], {
    description: "Specifies the status of the hostname's activation.",
  }),
)

export const Web3Target = named(
  "web3_target",
  Type.Union([Type.Literal("ethereum"), Type.Literal("ipfs"), Type.Literal("ipfs_universal_path")], {
    description: "Specify the target gateway of the hostname.",
  }),
)

export const UnnamedSchemaRef2e420942fb77cd2cd2ba3ca7b5f32e1e = named(
  "unnamed_schema_ref_2e420942fb77cd2cd2ba3ca7b5f32e1e",
  Type.Union([Type.Null()]),
)

export const Web3Web3Hostname = named(
  "web3_web3-hostname",
  Type.Object({
    created_on: Type.Optional(Web3Timestamp),
    description: Type.Optional(Web3Description),
    dnslink: Type.Optional(Web3Dnslink),
    id: Type.Optional(Web3Identifier),
    modified_on: Type.Optional(Web3Timestamp),
    name: Type.Optional(Web3Name),
    status: Type.Optional(Web3Status),
    target: Type.Optional(Web3Target),
  }),
)

export const Web3SingleResponse = named(
  "web3_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Web3Web3Hostname,
    success: Type.Union([Type.Literal(true)], { description: "Specifies whether the API call was successful." }),
    result_info: Type.Optional(
      Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
        description: "Provides the API response.",
      }),
    ),
  }),
)

export const Web3CreateRequest = named(
  "web3_create_request",
  Type.Object({
    description: Type.Optional(Web3Description),
    dnslink: Type.Optional(Web3Dnslink),
    name: Web3Name,
    target: Web3Target,
  }),
)

export const Web3CollectionResponse = named(
  "web3_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(Web3Web3Hostname), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Specifies whether the API call was successful." }),
    result_info: Type.Optional(Web3ResultInfo),
  }),
)

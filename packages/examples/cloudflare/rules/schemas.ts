import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages } from "../shared/schemas"

export const ListsItemAsn = named(
  "lists_item_asn",
  Type.Integer({ description: "Defines a non-negative 32 bit integer.", "x-auditable": true }),
)

export const ListsItemComment = named(
  "lists_item_comment",
  Type.String({ description: "Defines an informative summary of the list item.", "x-auditable": true }),
)

export const ListsCreatedOn = named(
  "lists_created_on",
  Type.String({
    description: "The RFC 3339 timestamp of when the list was created.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ListsItemId = named(
  "lists_item_id",
  Type.String({
    description: "Defines the unique ID of the item in the List.",
    minLength: 32,
    maxLength: 32,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ListsModifiedOn = named(
  "lists_modified_on",
  Type.String({
    description: "The RFC 3339 timestamp of when the list was last modified.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ListsListItemAsnFull = named(
  "lists_list_item_asn_full",
  Type.Object({
    asn: ListsItemAsn,
    comment: Type.Optional(ListsItemComment),
    created_on: ListsCreatedOn,
    id: ListsItemId,
    modified_on: ListsModifiedOn,
  }),
)

export const ListsItemRedirect = named(
  "lists_item_redirect",
  Type.Object(
    {
      include_subdomains: Type.Optional(Type.Boolean({ default: false, "x-auditable": true })),
      preserve_path_suffix: Type.Optional(Type.Boolean({ default: false, "x-auditable": true })),
      preserve_query_string: Type.Optional(Type.Boolean({ default: false, "x-auditable": true })),
      source_url: Type.String({ "x-auditable": true }),
      status_code: Type.Optional(
        Type.Union([Type.Literal(301), Type.Literal(302), Type.Literal(307), Type.Literal(308)], {
          "x-auditable": true,
        }),
      ),
      subpath_matching: Type.Optional(Type.Boolean({ default: false, "x-auditable": true })),
      target_url: Type.String({ "x-auditable": true }),
    },
    { description: "The definition of the redirect." },
  ),
)

export const ListsListItemRedirectFull = named(
  "lists_list_item_redirect_full",
  Type.Object({
    redirect: ListsItemRedirect,
    comment: Type.Optional(ListsItemComment),
    created_on: ListsCreatedOn,
    id: ListsItemId,
    modified_on: ListsModifiedOn,
  }),
)

export const ListsItemHostname = named(
  "lists_item_hostname",
  Type.Object(
    {
      exclude_exact_hostname: Type.Optional(
        Type.Boolean({
          description:
            "Only applies to wildcard hostnames (e.g., *.example.com). When true (default), only subdomains are blocked. When false, both the root domain and subdomains are blocked.",
        }),
      ),
      url_hostname: Type.String({ "x-auditable": true }),
    },
    {
      description:
        "Valid characters for hostnames are ASCII(7) letters from a to z, the digits from 0 to 9, wildcards (*), and the hyphen (-).",
    },
  ),
)

export const ListsListItemHostnameFull = named(
  "lists_list_item_hostname_full",
  Type.Object({
    hostname: ListsItemHostname,
    comment: Type.Optional(ListsItemComment),
    created_on: ListsCreatedOn,
    id: ListsItemId,
    modified_on: ListsModifiedOn,
  }),
)

export const ListsItemIp = named(
  "lists_item_ip",
  Type.String({ description: "An IPv4 address, an IPv4 CIDR, an IPv6 address, or an IPv6 CIDR.", "x-auditable": true }),
)

export const ListsListItemIpFull = named(
  "lists_list_item_ip_full",
  Type.Object({
    ip: ListsItemIp,
    comment: Type.Optional(ListsItemComment),
    created_on: ListsCreatedOn,
    id: ListsItemId,
    modified_on: ListsModifiedOn,
  }),
)

export const ListsItemResponseSingle = named(
  "lists_item-response-single",
  Type.Object({
    result: Type.Union([
      ListsListItemIpFull,
      ListsListItemHostnameFull,
      ListsListItemRedirectFull,
      ListsListItemAsnFull,
    ]),
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const ListsOperationId = named(
  "lists_operation_id",
  Type.String({
    description: "The unique operation ID of the asynchronous action.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const UnnamedSchemaRef46621d4d5b6644caae5c9167b8e28865 = named(
  "unnamed_schema_ref_46621d4d5b6644caae5c9167b8e28865",
  Type.Union([Type.Null()]),
)

export const ListsListsAsyncResponse = named(
  "lists_lists-async-response",
  Type.Object({
    result: Type.Object({
      operation_id: ListsOperationId,
    }),
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const ListsListItemIpComment = named(
  "lists_list_item_ip_comment",
  Type.Object({
    ip: ListsItemIp,
    comment: Type.Optional(ListsItemComment),
  }),
)

export const ListsListItemRedirectComment = named(
  "lists_list_item_redirect_comment",
  Type.Object({
    redirect: ListsItemRedirect,
    comment: Type.Optional(ListsItemComment),
  }),
)

export const ListsListItemHostnameComment = named(
  "lists_list_item_hostname_comment",
  Type.Object({
    hostname: ListsItemHostname,
    comment: Type.Optional(ListsItemComment),
  }),
)

export const ListsListItemAsnComment = named(
  "lists_list_item_asn_comment",
  Type.Object({
    asn: ListsItemAsn,
    comment: Type.Optional(ListsItemComment),
  }),
)

export const ListsItemsUpdateRequestCollection = named(
  "lists_items-update-request-collection",
  Type.Array(
    Type.Union([
      ListsListItemIpComment,
      ListsListItemRedirectComment,
      ListsListItemHostnameComment,
      ListsListItemAsnComment,
    ]),
  ),
)

export const UnnamedSchemaRef34bb6e31800bc0207c083affa12d2775 = named(
  "unnamed_schema_ref_34bb6e31800bc0207c083affa12d2775",
  Type.Object({
    after: Type.Optional(Type.String({ "x-auditable": true })),
    before: Type.Optional(Type.String({ "x-auditable": true })),
  }),
)

export const ListsItem = named(
  "lists_item",
  Type.Union([ListsListItemIpFull, ListsListItemHostnameFull, ListsListItemRedirectFull, ListsListItemAsnFull]),
)

export const ListsItemsListResponseCollection = named(
  "lists_items-list-response-collection",
  Type.Object({
    result: Type.Array(ListsItem),
    result_info: Type.Optional(
      Type.Object({
        cursors: Type.Optional(UnnamedSchemaRef34bb6e31800bc0207c083affa12d2775),
      }),
    ),
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const ListsListId = named(
  "lists_list_id",
  Type.String({
    description: "The unique ID of the list.",
    minLength: 32,
    maxLength: 32,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ListsListDeleteResponseCollection = named(
  "lists_list-delete-response-collection",
  Type.Object({
    result: Type.Object({
      id: ListsListId,
    }),
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const ListsCompleted = named(
  "lists_completed",
  Type.String({
    description: "The RFC 3339 timestamp of when the operation was completed.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ListsBulkOperationFailed = named(
  "lists_bulk_operation_failed",
  Type.Object({
    completed: ListsCompleted,
    error: Type.String({
      description: "A message describing the error when the status is `failed`.",
      readOnly: true,
      "x-auditable": true,
    }),
    id: ListsOperationId,
    status: Type.Union([Type.Literal("failed")], {
      description: "The current status of the asynchronous operation.",
      "x-auditable": true,
    }),
  }),
)

export const ListsBulkOperationCompleted = named(
  "lists_bulk_operation_completed",
  Type.Object({
    completed: ListsCompleted,
    id: ListsOperationId,
    status: Type.Union([Type.Literal("completed")], {
      description: "The current status of the asynchronous operation.",
      "x-auditable": true,
    }),
  }),
)

export const ListsBulkOperationPendingOrRunning = named(
  "lists_bulk_operation_pending_or_running",
  Type.Object({
    id: ListsOperationId,
    status: Type.Union([Type.Literal("pending"), Type.Literal("running")], {
      description: "The current status of the asynchronous operation.",
      "x-auditable": true,
    }),
  }),
)

export const ListsBulkOperationResponseSingle = named(
  "lists_bulk-operation-response-single",
  Type.Object({
    result: Type.Union([ListsBulkOperationPendingOrRunning, ListsBulkOperationCompleted, ListsBulkOperationFailed]),
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const ListsDescription = named(
  "lists_description",
  Type.String({ description: "An informative summary of the list.", maxLength: 500, "x-auditable": true }),
)

export const ListsKind = named(
  "lists_kind",
  Type.Union([Type.Literal("ip"), Type.Literal("redirect"), Type.Literal("hostname"), Type.Literal("asn")], {
    description:
      "The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).",
  }),
)

export const ListsName = named(
  "lists_name",
  Type.String({
    description: "An informative name for the list. Use this name in filter and rule expressions.",
    maxLength: 50,
    "x-auditable": true,
  }),
)

export const ListsNumItems = named(
  "lists_num_items",
  Type.Number({ description: "The number of items in the list.", readOnly: true, "x-auditable": true }),
)

export const ListsNumReferencingFilters = named(
  "lists_num_referencing_filters",
  Type.Number({
    description: "The number of [filters](/api/resources/filters/) referencing the list.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const UnnamedSchemaRefE706d5e8367564544e2991af82ebb07a = named(
  "unnamed_schema_ref_e706d5e8367564544e2991af82ebb07a",
  Type.Union([Type.Null()]),
)

export const ListsListResponseCollection = named(
  "lists_list-response-collection",
  Type.Object({
    result: Type.Object({
      created_on: ListsCreatedOn,
      description: Type.Optional(ListsDescription),
      id: ListsListId,
      kind: ListsKind,
      modified_on: ListsModifiedOn,
      name: ListsName,
      num_items: ListsNumItems,
      num_referencing_filters: ListsNumReferencingFilters,
    }),
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const ListsAccountId = named(
  "lists_account_id",
  Type.String({
    description: "The Account ID for this resource.",
    minLength: 32,
    maxLength: 32,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ListsList = named(
  "lists_list",
  Type.Object({
    created_on: ListsCreatedOn,
    description: Type.Optional(ListsDescription),
    id: ListsListId,
    kind: ListsKind,
    modified_on: ListsModifiedOn,
    name: ListsName,
    num_items: ListsNumItems,
    num_referencing_filters: ListsNumReferencingFilters,
  }),
)

export const ListsListsResponseCollection = named(
  "lists_lists-response-collection",
  Type.Object({
    result: Type.Array(ListsList),
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages } from "../shared/schemas"
import {
  ListsBulkOperationCompleted,
  ListsBulkOperationFailed,
  ListsBulkOperationPendingOrRunning,
  ListsBulkOperationResponseSingle,
  ListsDescription,
  ListsItemId,
  ListsItemResponseSingle,
  ListsItemsListResponseCollection,
  ListsItemsUpdateRequestCollection,
  ListsKind,
  ListsListDeleteResponseCollection,
  ListsListId,
  ListsListItemAsnFull,
  ListsListItemHostnameFull,
  ListsListItemIpFull,
  ListsListItemRedirectFull,
  ListsListResponseCollection,
  ListsListsAsyncResponse,
  ListsListsResponseCollection,
  ListsName,
  ListsOperationId,
  UnnamedSchemaRef34bb6e31800bc0207c083affa12d2775,
  UnnamedSchemaRef46621d4d5b6644caae5c9167b8e28865,
  UnnamedSchemaRefE706d5e8367564544e2991af82ebb07a,
} from "./schemas"

export function registerRules(api: Api) {
  api.group("/accounts/{account_id}/rules/lists", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      responses: {
        200: ListsListsResponseCollection,
        "4XX": Type.Object({
          result: Type.Union([Type.Null()]),
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Get lists")
      .description("Fetches all lists in the account.")
      .operationId("lists-get-lists")
      .tag("Lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Filter Lists Read", "Account Filter Lists Edit"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/", {
      body: Type.Object({
        description: Type.Optional(ListsDescription),
        kind: ListsKind,
        name: ListsName,
      }),
      responses: {
        200: ListsListResponseCollection,
        "4XX": Type.Object({
          result: UnnamedSchemaRefE706d5e8367564544e2991af82ebb07a,
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Create a list")
      .description("Creates a new list of the specified kind.")
      .operationId("lists-create-a-list")
      .tag("Lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Filter Lists Edit"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/bulk_operations/{operation_id}", {
      params: Type.Object({ operation_id: ListsOperationId }),
      responses: {
        200: ListsBulkOperationResponseSingle,
        "4XX": Type.Object({
          result: Type.Union([
            ListsBulkOperationPendingOrRunning,
            ListsBulkOperationCompleted,
            ListsBulkOperationFailed,
          ]),
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Get bulk operation status")
      .description(
        "Gets the current status of an asynchronous operation on a list.\n\nThe `status` property can have one of the following values: `pending`, `running`, `completed`, or `failed`. If the status is `failed`, the `error` property will contain a message describing the error.",
      )
      .operationId("lists-get-bulk-operation-status")
      .tag("Lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Filter Lists Edit", "Account Filter Lists Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{list_id}", {
      params: Type.Object({ list_id: ListsListId }),
      responses: {
        200: ListsListResponseCollection,
        "4XX": Type.Object({
          result: UnnamedSchemaRefE706d5e8367564544e2991af82ebb07a,
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Get a list")
      .description("Fetches the details of a list.")
      .operationId("lists-get-a-list")
      .tag("Lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Filter Lists Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/{list_id}", {
      params: Type.Object({ list_id: ListsListId }),
      body: Type.Object({
        description: Type.Optional(ListsDescription),
      }),
      responses: {
        200: ListsListResponseCollection,
        "4XX": Type.Object({
          result: UnnamedSchemaRefE706d5e8367564544e2991af82ebb07a,
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Update a list")
      .description("Updates the description of a list.")
      .operationId("lists-update-a-list")
      .tag("Lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Filter Lists Edit"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{list_id}", {
      params: Type.Object({ list_id: ListsListId }),
      responses: {
        200: ListsListDeleteResponseCollection,
        "4XX": Type.Object({
          result: Type.Union([Type.Null()]),
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Delete a list")
      .description("Deletes a specific list and all its items.")
      .operationId("lists-delete-a-list")
      .tag("Lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Filter Lists Edit"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{list_id}/items", {
      params: Type.Object({ list_id: ListsListId }),
      query: Type.Object({
        cursor: Type.Optional(
          Type.String({
            description:
              "The pagination cursor. An opaque string token indicating the position from which to continue when requesting the next/previous set of records. Cursor values are provided under `result_info.cursors` in the response. You should make no assumptions about a cursor's content or length.",
          }),
        ),
        per_page: Type.Optional(
          Type.Integer({
            description: "Amount of results to include in each paginated response. A non-negative 32 bit integer.",
            minimum: 1,
            maximum: 500,
          }),
        ),
        search: Type.Optional(
          Type.String({
            description:
              "A search query to filter returned items. Its meaning depends on the list type: IP addresses must start with the provided string, hostnames and bulk redirects must contain the string, and ASNs must match the string exactly.",
          }),
        ),
      }),
      responses: {
        200: ListsItemsListResponseCollection,
        "4XX": Type.Object({
          result: Type.Union([Type.Null()]),
          result_info: Type.Optional(
            Type.Object({
              cursors: Type.Optional(UnnamedSchemaRef34bb6e31800bc0207c083affa12d2775),
            }),
          ),
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Get list items")
      .description("Fetches all the items in the list.")
      .operationId("lists-get-list-items")
      .tag("Lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Filter Lists Edit", "Account Filter Lists Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/{list_id}/items", {
      params: Type.Object({ list_id: ListsListId }),
      body: ListsItemsUpdateRequestCollection,
      responses: {
        200: ListsListsAsyncResponse,
        "4XX": Type.Object({
          result: UnnamedSchemaRef46621d4d5b6644caae5c9167b8e28865,
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Create list items")
      .description(
        "Appends new items to the list.\n\nThis operation is asynchronous. To get current the operation status, invoke the `Get bulk operation status` endpoint with the returned `operation_id`.\n\nThere is a limit of 1 pending bulk operation per account. If an outstanding bulk operation is in progress, the request will be rejected.",
      )
      .operationId("lists-create-list-items")
      .tag("Lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Filter Lists Edit"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/{list_id}/items", {
      params: Type.Object({ list_id: ListsListId }),
      body: ListsItemsUpdateRequestCollection,
      responses: {
        200: ListsListsAsyncResponse,
        "4XX": Type.Object({
          result: UnnamedSchemaRef46621d4d5b6644caae5c9167b8e28865,
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Update all list items")
      .description(
        "Removes all existing items from the list and adds the provided items to the list.\n\nThis operation is asynchronous. To get current the operation status, invoke the `Get bulk operation status` endpoint with the returned `operation_id`.\n\nThere is a limit of 1 pending bulk operation per account. If an outstanding bulk operation is in progress, the request will be rejected.",
      )
      .operationId("lists-update-all-list-items")
      .tag("Lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Filter Lists Edit"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{list_id}/items", {
      params: Type.Object({ list_id: ListsListId }),
      body: Type.Object({
        items: Type.Optional(
          Type.Array(
            Type.Object({
              id: ListsItemId,
            }),
            { minItems: 1 },
          ),
        ),
      }),
      responses: {
        200: ListsListsAsyncResponse,
        "4XX": Type.Object({
          result: UnnamedSchemaRef46621d4d5b6644caae5c9167b8e28865,
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Delete list items")
      .description(
        "Removes one or more items from a list.\n\nThis operation is asynchronous. To get current the operation status, invoke the `Get bulk operation status` endpoint with the returned `operation_id`.\n\nThere is a limit of 1 pending bulk operation per account. If an outstanding bulk operation is in progress, the request will be rejected.",
      )
      .operationId("lists-delete-list-items")
      .tag("Lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Filter Lists Edit"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{list_id}/items/{item_id}", {
      params: Type.Object({ item_id: ListsItemId, list_id: ListsListId }),
      responses: {
        200: ListsItemResponseSingle,
        "4XX": Type.Object({
          result: Type.Union([
            ListsListItemIpFull,
            ListsListItemHostnameFull,
            ListsListItemRedirectFull,
            ListsListItemAsnFull,
          ]),
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Get a list item")
      .description("Fetches a list item in the list.")
      .operationId("lists-get-a-list-item")
      .tag("Lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Filter Lists Edit", "Account Filter Lists Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

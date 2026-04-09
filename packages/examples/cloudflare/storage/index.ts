import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { IntelResultInfo } from "../shared/schemas"
import {
  WorkersKvApiResponseCommonFailure,
  WorkersKvApiResponseCommonNoResult,
  WorkersKvBulkDelete,
  WorkersKvBulkGetResult,
  WorkersKvBulkGetResultWithMetadata,
  WorkersKvBulkResult,
  WorkersKvBulkWrite,
  WorkersKvCreateRenameNamespaceBody,
  WorkersKvCursor,
  WorkersKvExpiration,
  WorkersKvExpirationTtl,
  WorkersKvKey,
  WorkersKvKeyName,
  WorkersKvKeyNameBulk,
  WorkersKvListMetadata,
  WorkersKvMessages,
  WorkersKvNamespace,
  WorkersKvNamespaceIdentifier,
} from "./schemas"

export function registerStorage(api: Api) {
  api.group(
    "/accounts/{account_id}/storage/kv/namespaces",
    { params: Type.Object({ account_id: Type.String() }) },
    (g) => {
      g.get("/", {
        query: Type.Object({
          page: Type.Optional(
            Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 }),
          ),
          per_page: Type.Optional(
            Type.Number({ description: "Maximum number of results per page.", default: 20, minimum: 1, maximum: 1000 }),
          ),
          order: Type.Optional(
            Type.Union([Type.Literal("id"), Type.Literal("title")], { description: "Field to order results by." }),
          ),
          direction: Type.Optional(
            Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Direction to order namespaces." }),
          ),
        }),
        responses: {
          200: Type.Object({
            errors: WorkersKvMessages,
            messages: WorkersKvMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result_info: Type.Optional(IntelResultInfo),
            result: Type.Optional(Type.Array(WorkersKvNamespace)),
          }),
          "4XX": WorkersKvApiResponseCommonFailure,
        },
      })
        .summary("List Namespaces")
        .description("Returns the namespaces owned by an account.")
        .operationId("workers-kv-namespace-list-namespaces")
        .tag("Workers KV Namespace")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Workers KV Storage Write", "Workers KV Storage Read"])

      g.post("/", {
        body: WorkersKvCreateRenameNamespaceBody,
        responses: {
          200: Type.Object({
            errors: WorkersKvMessages,
            messages: WorkersKvMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(WorkersKvNamespace),
          }),
          "4XX": WorkersKvApiResponseCommonFailure,
        },
      })
        .summary("Create a Namespace")
        .description(
          "Creates a namespace under the given title. A `400` is returned if the account already owns a namespace with this title. A namespace must be explicitly deleted to be replaced.",
        )
        .operationId("workers-kv-namespace-create-a-namespace")
        .tag("Workers KV Namespace")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Workers KV Storage Write"])

      g.get("/{namespace_id}", {
        params: Type.Object({ namespace_id: WorkersKvNamespaceIdentifier }),
        responses: {
          200: Type.Object({
            errors: WorkersKvMessages,
            messages: WorkersKvMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(WorkersKvNamespace),
          }),
          "4XX": WorkersKvApiResponseCommonFailure,
        },
      })
        .summary("Get a Namespace")
        .description("Get the namespace corresponding to the given ID.")
        .operationId("workers-kv-namespace-get-a-namespace")
        .tag("Workers KV Namespace")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Workers KV Storage Write", "Workers KV Storage Read"])

      g.put("/{namespace_id}", {
        params: Type.Object({ namespace_id: WorkersKvNamespaceIdentifier }),
        body: WorkersKvCreateRenameNamespaceBody,
        responses: {
          200: Type.Object({
            errors: WorkersKvMessages,
            messages: WorkersKvMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: WorkersKvNamespace,
          }),
          "4XX": WorkersKvApiResponseCommonFailure,
        },
      })
        .summary("Rename a Namespace")
        .description("Modifies a namespace's title.")
        .operationId("workers-kv-namespace-rename-a-namespace")
        .tag("Workers KV Namespace")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Workers KV Storage Write"])

      g.delete("/{namespace_id}", {
        params: Type.Object({ namespace_id: WorkersKvNamespaceIdentifier }),
        responses: {
          200: WorkersKvApiResponseCommonNoResult,
          "4XX": WorkersKvApiResponseCommonFailure,
        },
      })
        .summary("Remove a Namespace")
        .description("Deletes the namespace corresponding to the given ID.")
        .operationId("workers-kv-namespace-remove-a-namespace")
        .tag("Workers KV Namespace")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Workers KV Storage Write"])

      g.put("/{namespace_id}/bulk", {
        params: Type.Object({ namespace_id: WorkersKvNamespaceIdentifier }),
        body: WorkersKvBulkWrite,
        responses: {
          200: Type.Object({
            errors: WorkersKvMessages,
            messages: WorkersKvMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(WorkersKvBulkResult),
          }),
          "4XX": Type.Object({
            errors: WorkersKvMessages,
            messages: WorkersKvMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(WorkersKvBulkResult),
          }),
        },
      })
        .summary("Write multiple key-value pairs")
        .description(
          "Write multiple keys and values at once. Body should be an array of up to 10,000 key-value pairs to be stored, along with optional expiration information. Existing values and expirations will be overwritten. If neither `expiration` nor `expiration_ttl` is specified, the key-value pair will never expire. If both are set, `expiration_ttl` is used and `expiration` is ignored. The entire request size must be 100 megabytes or less.",
        )
        .operationId("workers-kv-namespace-write-multiple-key-value-pairs")
        .tag("Workers KV Namespace")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Workers KV Storage Write"])

      g.delete("/{namespace_id}/bulk", {
        params: Type.Object({ namespace_id: WorkersKvNamespaceIdentifier }),
        responses: {
          200: Type.Object({
            errors: WorkersKvMessages,
            messages: WorkersKvMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(WorkersKvBulkResult),
          }),
          "4XX": Type.Object({
            errors: WorkersKvMessages,
            messages: WorkersKvMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(WorkersKvBulkResult),
          }),
        },
      })
        .summary("Delete multiple key-value pairs")
        .description(
          "Remove multiple KV pairs from the namespace. Body should be an array of up to 10,000 keys to be removed.",
        )
        .operationId("workers-kv-namespace-delete-multiple-key-value-pairs-deprecated")
        .tag("Workers KV Namespace")
        .deprecated()
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Workers KV Storage Write"])

      g.post("/{namespace_id}/bulk/delete", {
        params: Type.Object({ namespace_id: WorkersKvNamespaceIdentifier }),
        body: WorkersKvBulkDelete,
        responses: {
          200: Type.Object({
            errors: WorkersKvMessages,
            messages: WorkersKvMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(WorkersKvBulkResult),
          }),
          "4XX": Type.Object({
            errors: WorkersKvMessages,
            messages: WorkersKvMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(WorkersKvBulkResult),
          }),
        },
      })
        .summary("Delete multiple key-value pairs")
        .description(
          "Remove multiple KV pairs from the namespace. Body should be an array of up to 10,000 keys to be removed.",
        )
        .operationId("workers-kv-namespace-delete-multiple-key-value-pairs")
        .tag("Workers KV Namespace")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Workers KV Storage Write"])

      g.post("/{namespace_id}/bulk/get", {
        params: Type.Object({ namespace_id: WorkersKvNamespaceIdentifier }),
        body: Type.Object({
          keys: Type.Array(WorkersKvKeyNameBulk, {
            description: "Array of keys to retrieve (maximum of 100).",
            maxItems: 100,
          }),
          type: Type.Optional(
            Type.Union([Type.Literal("text"), Type.Literal("json")], {
              description: "Whether to parse JSON values in the response.",
            }),
          ),
          withMetadata: Type.Optional(
            Type.Boolean({ description: "Whether to include metadata in the response.", default: false }),
          ),
        }),
        responses: {
          200: Type.Object({
            errors: WorkersKvMessages,
            messages: WorkersKvMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(
              Type.Union([WorkersKvBulkGetResult, WorkersKvBulkGetResultWithMetadata], {
                "x-stainless-empty-object": true,
              }),
            ),
          }),
          "4XX": WorkersKvApiResponseCommonFailure,
        },
      })
        .summary("Get multiple key-value pairs")
        .description(
          "Retrieve up to 100 KV pairs from the namespace. Keys must contain text-based values. JSON values can optionally be parsed instead of being returned as a string value. Metadata can be included if `withMetadata` is true.",
        )
        .operationId("workers-kv-namespace-get-multiple-key-value-pairs")
        .tag("Workers KV Namespace")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Workers KV Storage Write", "Workers KV Storage Read"])

      g.get("/{namespace_id}/keys", {
        params: Type.Object({ namespace_id: WorkersKvNamespaceIdentifier }),
        query: Type.Object({
          limit: Type.Optional(
            Type.Number({
              description:
                "Limits the number of keys returned in the response. The cursor attribute may be used to iterate over the next batch of keys if there are more than the limit.",
              default: 1000,
              minimum: 10,
              maximum: 1000,
            }),
          ),
          prefix: Type.Optional(
            Type.String({
              description:
                "Filters returned keys by a name prefix. Exact matches and any key names that begin with the prefix will be returned.",
            }),
          ),
          cursor: Type.Optional(
            Type.String({
              description:
                "Opaque token indicating the position from which to continue when requesting the next set of records if the amount of list results was limited by the limit parameter. A valid value for the cursor can be obtained from the `cursors` object in the `result_info` structure.",
            }),
          ),
        }),
        responses: {
          200: Type.Object({
            errors: WorkersKvMessages,
            messages: WorkersKvMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(Type.Array(WorkersKvKey)),
            result_info: Type.Optional(
              Type.Object({
                count: Type.Optional(
                  Type.Number({ description: "Total results returned based on your list parameters." }),
                ),
                cursor: Type.Optional(WorkersKvCursor),
              }),
            ),
          }),
          "4XX": WorkersKvApiResponseCommonFailure,
        },
      })
        .summary("List a Namespace's Keys")
        .description("Lists a namespace's keys.")
        .operationId("workers-kv-namespace-list-a-namespace'-s-keys")
        .tag("Workers KV Namespace")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Workers KV Storage Write", "Workers KV Storage Read"])

      g.get("/{namespace_id}/metadata/{key_name}", {
        params: Type.Object({ key_name: WorkersKvKeyName, namespace_id: WorkersKvNamespaceIdentifier }),
        responses: {
          200: Type.Object({
            errors: WorkersKvMessages,
            messages: WorkersKvMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(WorkersKvListMetadata),
          }),
          "4XX": WorkersKvApiResponseCommonFailure,
        },
      })
        .summary("Read the metadata for a key")
        .description(
          "Returns the metadata associated with the given key in the given namespace. Use URL-encoding to use special characters (for example, `:`, `!`, `%`) in the key name.",
        )
        .operationId("workers-kv-namespace-read-the-metadata-for-a-key")
        .tag("Workers KV Namespace")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Workers KV Storage Write", "Workers KV Storage Read"])

      g.get("/{namespace_id}/values/{key_name}", {
        params: Type.Object({ key_name: WorkersKvKeyName, namespace_id: WorkersKvNamespaceIdentifier }),
        responses: {
          "4XX": WorkersKvApiResponseCommonFailure,
        },
      })
        .summary("Read key-value pair")
        .description(
          "Returns the value associated with the given key in the given namespace. Use URL-encoding to use special characters (for example, `:`, `!`, `%`) in the key name. If the KV-pair is set to expire at some point, the expiration time as measured in seconds since the UNIX epoch will be returned in the `expiration` response header.",
        )
        .operationId("workers-kv-namespace-read-key-value-pair")
        .tag("Workers KV Namespace")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Workers KV Storage Write", "Workers KV Storage Read"])

      g.put("/{namespace_id}/values/{key_name}", {
        params: Type.Object({ key_name: WorkersKvKeyName, namespace_id: WorkersKvNamespaceIdentifier }),
        query: Type.Object({
          expiration: Type.Optional(WorkersKvExpiration),
          expiration_ttl: Type.Optional(WorkersKvExpirationTtl),
        }),
        responses: {
          200: WorkersKvApiResponseCommonNoResult,
          "4XX": WorkersKvApiResponseCommonFailure,
        },
      })
        .summary("Write key-value pair with optional metadata")
        .description(
          "Write a value identified by a key. Use URL-encoding to use special characters (for example, `:`, `!`, `%`) in the key name. Body should be the value to be stored. If JSON metadata to be associated with the key/value pair is needed, use `multipart/form-data` content type for your PUT request (see dropdown below in `REQUEST BODY SCHEMA`). Existing values, expirations, and metadata will be overwritten. If neither `expiration` nor `expiration_ttl` is specified, the key-value pair will never expire. If both are set, `expiration_ttl` is used and `expiration` is ignored.",
        )
        .operationId("workers-kv-namespace-write-key-value-pair-with-metadata")
        .tag("Workers KV Namespace")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Workers KV Storage Write"])

      g.delete("/{namespace_id}/values/{key_name}", {
        params: Type.Object({ key_name: WorkersKvKeyName, namespace_id: WorkersKvNamespaceIdentifier }),
        responses: {
          200: WorkersKvApiResponseCommonNoResult,
          "4XX": WorkersKvApiResponseCommonFailure,
        },
      })
        .summary("Delete key-value pair")
        .description(
          "Remove a KV pair from the namespace. Use URL-encoding to use special characters (for example, `:`, `!`, `%`) in the key name.",
        )
        .operationId("workers-kv-namespace-delete-key-value-pair")
        .tag("Workers KV Namespace")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Workers KV Storage Write"])
    },
  )
}

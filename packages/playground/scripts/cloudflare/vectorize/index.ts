import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages } from "../shared/schemas"
import {
  VectorizeCreateIndexRequest,
  VectorizeCreateIndexResponse,
  VectorizeCreateMetadataIndexRequest,
  VectorizeDeleteMetadataIndexRequest,
  VectorizeIndexDeleteVectorsByIdRequest,
  VectorizeIndexDeleteVectorsByIdResponse,
  VectorizeIndexGetVectorsByIdRequest,
  VectorizeIndexGetVectorsByIdResponse,
  VectorizeIndexInfoResponse,
  VectorizeIndexInsertResponse,
  VectorizeIndexInsertV2Response,
  VectorizeIndexListVectorsResponse,
  VectorizeIndexName,
  VectorizeIndexQueryRequest,
  VectorizeIndexQueryResponse,
  VectorizeIndexQueryV2Request,
  VectorizeIndexQueryV2Response,
  VectorizeListMetadataIndexResponse,
  VectorizeUpdateIndexRequest,
} from "./schemas"

export function registerVectorize(api: Api) {
  api.assertVersion("3.0.3", "Vectorize")

  api.group("/accounts/{account_id}/vectorize", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/indexes", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Array(VectorizeCreateIndexResponse),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("List Vectorize Indexes (Deprecated)")
      .description("Returns a list of Vectorize Indexes")
      .operationId("vectorize-(-deprecated)-list-vectorize-indexes")
      .tag("Vectorize Beta (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write", "Vectorize Read"])
      .extension("x-cfDeprecation", {
        description:
          "This endpoint is deprecated in favor of the GET `/accounts/{account_id}/vectorize/v2/indexes` endpoint.",
        display: true,
        id: "vectorize_list_index_deprecation",
      })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.vectorize.index.list"] })

    g.post("/indexes", {
      body: VectorizeCreateIndexRequest,
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeCreateIndexResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Create Vectorize Index (Deprecated)")
      .description("Creates and returns a new Vectorize Index.")
      .operationId("vectorize-(-deprecated)-create-vectorize-index")
      .tag("Vectorize Beta (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write"])
      .extension("x-cfDeprecation", {
        description:
          "This endpoint is deprecated in favor of the POST `/accounts/{account_id}/vectorize/v2/indexes` endpoint.",
        display: true,
        id: "vectorize_create_index_deprecation",
      })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.vectorize.index.create"] })

    g.get("/indexes/{index_name}", {
      params: Type.Object({ index_name: VectorizeIndexName }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeCreateIndexResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Get Vectorize Index (Deprecated)")
      .description("Returns the specified Vectorize Index.")
      .operationId("vectorize-(-deprecated)-get-vectorize-index")
      .tag("Vectorize Beta (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write", "Vectorize Read"])
      .extension("x-cfDeprecation", {
        description:
          "This endpoint is deprecated in favor of the GET `/accounts/{account_id}/vectorize/v2/indexes/{index_name}` endpoint.",
        display: true,
        id: "vectorize_get_index_deprecation",
      })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.vectorize.index.read"] })

    g.put("/indexes/{index_name}", {
      params: Type.Object({ index_name: VectorizeIndexName }),
      body: VectorizeUpdateIndexRequest,
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeCreateIndexResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Update Vectorize Index (Deprecated)")
      .description("Updates and returns the specified Vectorize Index.")
      .operationId("vectorize-(-deprecated)-update-vectorize-index")
      .tag("Vectorize Beta (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write"])
      .extension("x-cfDeprecation", {
        description: "This endpoint has been deprecated and will soon be removed.",
        display: true,
        id: "vectorize_update_index_deprecation",
      })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.vectorize.index.update"] })

    g.delete("/indexes/{index_name}", {
      params: Type.Object({ index_name: VectorizeIndexName }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Unknown(), Type.String()]),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Delete Vectorize Index (Deprecated)")
      .description("Deletes the specified Vectorize Index.")
      .operationId("vectorize-(-deprecated)-delete-vectorize-index")
      .tag("Vectorize Beta (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write"])
      .extension("x-cfDeprecation", {
        description:
          "This endpoint is deprecated in favor of the DELETE `/accounts/{account_id}/vectorize/v2/indexes/{index_name}` endpoint.",
        display: true,
        id: "vectorize_delete_index_deprecation",
      })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.vectorize.index.delete"] })

    g.post("/indexes/{index_name}/delete-by-ids", {
      params: Type.Object({ index_name: VectorizeIndexName }),
      body: VectorizeIndexDeleteVectorsByIdRequest,
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeIndexDeleteVectorsByIdResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Delete Vectors By Identifier (Deprecated)")
      .description("Delete a set of vectors from an index by their vector identifiers.")
      .operationId("vectorize-(-deprecated)-delete-vectors-by-id")
      .tag("Vectorize Beta (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write"])
      .extension("x-cfDeprecation", {
        description:
          "This endpoint is deprecated in favor of the POST `/accounts/{account_id}/vectorize/v2/indexes/{index_name}/delete_by_ids` endpoint.",
        display: true,
        id: "vectorize_delete_by_ids_deprecation",
      })

    g.post("/indexes/{index_name}/get-by-ids", {
      params: Type.Object({ index_name: VectorizeIndexName }),
      body: VectorizeIndexGetVectorsByIdRequest,
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeIndexGetVectorsByIdResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Get Vectors By Identifier (Deprecated)")
      .description("Get a set of vectors from an index by their vector identifiers.")
      .operationId("vectorize-(-deprecated)-get-vectors-by-id")
      .tag("Vectorize Beta (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write", "Vectorize Read"])
      .extension("x-cfDeprecation", {
        description:
          "This endpoint is deprecated in favor of the POST `/accounts/{account_id}/vectorize/v2/indexes/{index_name}/get_by_ids` endpoint.",
        display: true,
        id: "vectorize_get_by_ids_deprecation",
      })

    g.post("/indexes/{index_name}/insert", {
      params: Type.Object({ index_name: VectorizeIndexName }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeIndexInsertResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Insert Vectors (Deprecated)")
      .description(
        "Inserts vectors into the specified index and returns the count of the vectors successfully inserted.",
      )
      .operationId("vectorize-(-deprecated)-insert-vector")
      .tag("Vectorize Beta (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write"])
      .extension("x-cfDeprecation", {
        description:
          "This endpoint is deprecated in favor of the POST `/accounts/{account_id}/vectorize/v2/indexes/{index_name}/insert` endpoint.",
        display: true,
        id: "vectorize_insert_deprecation",
      })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.vectorize.index.update"] })

    g.post("/indexes/{index_name}/query", {
      params: Type.Object({ index_name: VectorizeIndexName }),
      body: VectorizeIndexQueryRequest,
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeIndexQueryResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Query Vectors (Deprecated)")
      .description("Finds vectors closest to a given vector in an index.")
      .operationId("vectorize-(-deprecated)-query-vector")
      .tag("Vectorize Beta (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write", "Vectorize Read"])
      .extension("x-cfDeprecation", {
        description:
          "This endpoint is deprecated in favor of the POST `/accounts/{account_id}/vectorize/v2/indexes/{index_name}/query` endpoint.",
        display: true,
        id: "vectorize_query_deprecation",
      })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.vectorize.index.read"] })

    g.post("/indexes/{index_name}/upsert", {
      params: Type.Object({ index_name: VectorizeIndexName }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeIndexInsertResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Upsert Vectors (Deprecated)")
      .description(
        "Upserts vectors into the specified index, creating them if they do not exist and returns the count of values and ids successfully inserted.",
      )
      .operationId("vectorize-(-deprecated)-upsert-vector")
      .tag("Vectorize Beta (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write"])
      .extension("x-cfDeprecation", {
        description:
          "This endpoint is deprecated in favor of the POST `/accounts/{account_id}/vectorize/v2/indexes/{index_name}/upsert` endpoint.",
        display: true,
        id: "vectorize_upsert_deprecation",
      })

    g.get("/v2/indexes", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Array(VectorizeCreateIndexResponse),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("List Vectorize Indexes")
      .description("Returns a list of Vectorize Indexes")
      .operationId("vectorize-list-vectorize-indexes")
      .tag("Vectorize")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write", "Vectorize Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.vectorize.index.list"] })

    g.post("/v2/indexes", {
      body: VectorizeCreateIndexRequest,
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeCreateIndexResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Create Vectorize Index")
      .description("Creates and returns a new Vectorize Index.")
      .operationId("vectorize-create-vectorize-index")
      .tag("Vectorize")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.vectorize.index.create"] })

    g.get("/v2/indexes/{index_name}", {
      params: Type.Object({ index_name: VectorizeIndexName }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeCreateIndexResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Get Vectorize Index")
      .description("Returns the specified Vectorize Index.")
      .operationId("vectorize-get-vectorize-index")
      .tag("Vectorize")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write", "Vectorize Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.vectorize.index.read"] })

    g.delete("/v2/indexes/{index_name}", {
      params: Type.Object({ index_name: VectorizeIndexName }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Unknown(), Type.String()]),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Delete Vectorize Index")
      .description("Deletes the specified Vectorize Index.")
      .operationId("vectorize-delete-vectorize-index")
      .tag("Vectorize")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.vectorize.index.delete"] })

    g.post("/v2/indexes/{index_name}/delete_by_ids", {
      params: Type.Object({ index_name: VectorizeIndexName }),
      body: VectorizeIndexDeleteVectorsByIdRequest,
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeIndexInsertV2Response,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Delete Vectors By Identifier")
      .description("Delete a set of vectors from an index by their vector identifiers.")
      .operationId("vectorize-delete-vectors-by-id")
      .tag("Vectorize")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.vectorize.index.delete"] })

    g.post("/v2/indexes/{index_name}/get_by_ids", {
      params: Type.Object({ index_name: VectorizeIndexName }),
      body: VectorizeIndexGetVectorsByIdRequest,
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeIndexGetVectorsByIdResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Get Vectors By Identifier")
      .description("Get a set of vectors from an index by their vector identifiers.")
      .operationId("vectorize-get-vectors-by-id")
      .tag("Vectorize")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write", "Vectorize Read"])

    g.get("/v2/indexes/{index_name}/info", {
      params: Type.Object({ index_name: VectorizeIndexName }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeIndexInfoResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Get Vectorize Index Info")
      .description("Get information about a vectorize index.")
      .operationId("vectorize-index-info")
      .tag("Vectorize")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write", "Vectorize Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.vectorize.index.read"] })

    g.post("/v2/indexes/{index_name}/insert", {
      params: Type.Object({ index_name: VectorizeIndexName }),
      query: Type.Object({
        "unparsable-behavior": Type.Optional(
          Type.Union([Type.Literal("error"), Type.Literal("discard")], {
            description: "Behavior for ndjson parse failures.",
          }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeIndexInsertV2Response,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Insert Vectors")
      .description(
        "Inserts vectors into the specified index and returns a mutation id corresponding to the vectors enqueued for insertion.",
      )
      .operationId("vectorize-insert-vector")
      .tag("Vectorize")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write"])

    g.get("/v2/indexes/{index_name}/list", {
      params: Type.Object({ index_name: VectorizeIndexName }),
      query: Type.Object({
        count: Type.Optional(
          Type.Integer({ description: "Maximum number of vectors to return", default: 100, minimum: 1, maximum: 1000 }),
        ),
        cursor: Type.Optional(Type.String({ description: "Cursor for pagination to get the next page of results" })),
      }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeIndexListVectorsResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("List Vectors")
      .description("Returns a paginated list of vector identifiers from the specified index.")
      .operationId("vectorize-list-vectors")
      .tag("Vectorize")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write", "Vectorize Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.vectorize.index.read"] })

    g.post("/v2/indexes/{index_name}/metadata_index/create", {
      params: Type.Object({ index_name: VectorizeIndexName }),
      body: VectorizeCreateMetadataIndexRequest,
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeIndexInsertV2Response,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Create Metadata Index")
      .description("Enable metadata filtering based on metadata property. Limited to 10 properties.")
      .operationId("vectorize-create-metadata-index")
      .tag("Vectorize")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.vectorize.index.create"] })

    g.post("/v2/indexes/{index_name}/metadata_index/delete", {
      params: Type.Object({ index_name: VectorizeIndexName }),
      body: VectorizeDeleteMetadataIndexRequest,
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeIndexInsertV2Response,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Delete Metadata Index")
      .description("Allow Vectorize to delete the specified metadata index.")
      .operationId("vectorize-delete-metadata-index")
      .tag("Vectorize")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.vectorize.index.delete"] })

    g.get("/v2/indexes/{index_name}/metadata_index/list", {
      params: Type.Object({ index_name: VectorizeIndexName }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeListMetadataIndexResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("List Metadata Indexes")
      .description("List Metadata Indexes for the specified Vectorize Index.")
      .operationId("vectorize-list-metadata-indexes")
      .tag("Vectorize")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write", "Vectorize Read"])

    g.post("/v2/indexes/{index_name}/query", {
      params: Type.Object({ index_name: VectorizeIndexName }),
      body: VectorizeIndexQueryV2Request,
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeIndexQueryV2Response,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Query Vectors")
      .description("Finds vectors closest to a given vector in an index.")
      .operationId("vectorize-query-vector")
      .tag("Vectorize")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write", "Vectorize Read"])

    g.post("/v2/indexes/{index_name}/upsert", {
      params: Type.Object({ index_name: VectorizeIndexName }),
      query: Type.Object({
        "unparsable-behavior": Type.Optional(
          Type.Union([Type.Literal("error"), Type.Literal("discard")], {
            description: "Behavior for ndjson parse failures.",
          }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: VectorizeIndexInsertV2Response,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Upsert Vectors")
      .description(
        "Upserts vectors into the specified index, creating them if they do not exist and returns a mutation id corresponding to the vectors enqueued for upsertion.",
      )
      .operationId("vectorize-upsert-vector")
      .tag("Vectorize")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Vectorize Write"])
  })
}

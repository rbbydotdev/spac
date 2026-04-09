import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const VectorizeMutationUuid = named(
  "vectorize_mutation-uuid",
  Type.String({
    description: "The unique identifier for the async mutation operation containing the changeset.",
    maxLength: 36,
    "x-auditable": true,
  }),
)

export const VectorizeVectorIdentifier = named(
  "vectorize_vector-identifier",
  Type.String({ description: "Identifier for a Vector", maxLength: 64, readOnly: true }),
)

export const VectorizeIndexQueryV2Response = named(
  "vectorize_index-query-v2-response",
  Type.Object({
    count: Type.Optional(Type.Integer({ description: "Specifies the count of vectors returned by the search" })),
    matches: Type.Optional(
      Type.Array(
        Type.Object({
          id: Type.Optional(VectorizeVectorIdentifier),
          metadata: Type.Optional(Type.Union([Type.Unknown(), Type.Null()])),
          namespace: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          score: Type.Optional(
            Type.Number({ description: "The score of the vector according to the index's distance metric" }),
          ),
          values: Type.Optional(Type.Union([Type.Array(Type.Number()), Type.Null()])),
        }),
        { description: "Array of vectors matched by the search" },
      ),
    ),
  }),
)

export const VectorizeIndexQueryV2Request = named(
  "vectorize_index-query-v2-request",
  Type.Object({
    filter: Type.Optional(
      Type.Unknown({ description: "A metadata filter expression used to limit nearest neighbor results." }),
    ),
    returnMetadata: Type.Optional(
      Type.Union([Type.Literal("none"), Type.Literal("indexed"), Type.Literal("all")], {
        description:
          "Whether to return no metadata, indexed metadata or all metadata associated with the closest vectors.",
      }),
    ),
    returnValues: Type.Optional(
      Type.Boolean({
        description: "Whether to return the values associated with the closest vectors.",
        default: false,
      }),
    ),
    topK: Type.Optional(Type.Number({ description: "The number of nearest neighbors to find.", default: 5 })),
    vector: Type.Array(Type.Number(), {
      description: "The search vector that will be used to find the nearest neighbors.",
    }),
  }),
)

export const VectorizeListMetadataIndexResponse = named(
  "vectorize_list-metadata-index-response",
  Type.Object({
    metadataIndexes: Type.Optional(
      Type.Array(
        Type.Object({
          indexType: Type.Optional(
            Type.Union([Type.Literal("string"), Type.Literal("number"), Type.Literal("boolean")], {
              description: "Specifies the type of indexed metadata property.",
              "x-auditable": true,
            }),
          ),
          propertyName: Type.Optional(
            Type.String({ description: "Specifies the indexed metadata property.", "x-auditable": true }),
          ),
        }),
        { description: "Array of indexed metadata properties." },
      ),
    ),
  }),
)

export const VectorizeDeleteMetadataIndexRequest = named(
  "vectorize_delete-metadata-index-request",
  Type.Object({
    propertyName: Type.String({
      description: "Specifies the metadata property for which the index must be deleted.",
      "x-auditable": true,
    }),
  }),
)

export const VectorizeCreateMetadataIndexRequest = named(
  "vectorize_create-metadata-index-request",
  Type.Object({
    indexType: Type.Union([Type.Literal("string"), Type.Literal("number"), Type.Literal("boolean")], {
      description: "Specifies the type of metadata property to index.",
      "x-auditable": true,
    }),
    propertyName: Type.String({ description: "Specifies the metadata property to index.", "x-auditable": true }),
  }),
)

export const VectorizeVectorListItem = named(
  "vectorize_vector-list-item",
  Type.Object({
    id: VectorizeVectorIdentifier,
  }),
)

export const VectorizeIndexListVectorsResponse = named(
  "vectorize_index-list-vectors-response",
  Type.Object({
    count: Type.Integer({ description: "Number of vectors returned in this response" }),
    cursorExpirationTimestamp: Type.Optional(
      Type.Union([
        Type.String({ description: "When the cursor expires as an ISO8601 string", format: "date-time" }),
        Type.Null(),
      ]),
    ),
    isTruncated: Type.Boolean({ description: "Whether there are more vectors available beyond this response" }),
    nextCursor: Type.Optional(
      Type.Union([Type.String({ description: "Cursor for the next page of results" }), Type.Null()]),
    ),
    totalCount: Type.Integer({ description: "Total number of vectors in the index" }),
    vectors: Type.Array(VectorizeVectorListItem, { description: "Array of vector items" }),
  }),
)

export const VectorizeIndexInsertV2Response = named(
  "vectorize_index-insert-v2-response",
  Type.Object({
    mutationId: Type.Optional(VectorizeMutationUuid),
  }),
)

export const VectorizeIndexDimensions = named(
  "vectorize_index-dimensions",
  Type.Integer({
    description: "Specifies the number of dimensions for the index",
    minimum: 1,
    maximum: 1536,
    "x-auditable": true,
  }),
)

export const VectorizeIndexInfoResponse = named(
  "vectorize_index-info-response",
  Type.Object({
    dimensions: Type.Optional(VectorizeIndexDimensions),
    processedUpToDatetime: Type.Optional(
      Type.Union([
        Type.String({
          description: "Specifies the timestamp the last mutation batch was processed as an ISO8601 string.",
          format: "date-time",
          readOnly: true,
          "x-auditable": true,
        }),
        Type.Null(),
      ]),
    ),
    processedUpToMutation: Type.Optional(VectorizeMutationUuid),
    vectorCount: Type.Optional(
      Type.Integer({ description: "Specifies the number of vectors present in the index", "x-auditable": true }),
    ),
  }),
)

export const VectorizeIndexQueryResponse = named(
  "vectorize_index-query-response",
  Type.Object({
    count: Type.Optional(Type.Integer({ description: "Specifies the count of vectors returned by the search" })),
    matches: Type.Optional(
      Type.Array(
        Type.Object({
          id: Type.Optional(VectorizeVectorIdentifier),
          metadata: Type.Optional(Type.Union([Type.Unknown(), Type.Null()])),
          score: Type.Optional(
            Type.Number({ description: "The score of the vector according to the index's distance metric" }),
          ),
          values: Type.Optional(Type.Union([Type.Array(Type.Number()), Type.Null()])),
        }),
        { description: "Array of vectors matched by the search" },
      ),
    ),
  }),
)

export const VectorizeIndexQueryRequest = named(
  "vectorize_index-query-request",
  Type.Object({
    filter: Type.Optional(
      Type.Unknown({ description: "A metadata filter expression used to limit nearest neighbor results." }),
    ),
    returnMetadata: Type.Optional(
      Type.Boolean({
        description: "Whether to return the metadata associated with the closest vectors.",
        default: false,
      }),
    ),
    returnValues: Type.Optional(
      Type.Boolean({
        description: "Whether to return the values associated with the closest vectors.",
        default: false,
      }),
    ),
    topK: Type.Optional(Type.Number({ description: "The number of nearest neighbors to find.", default: 5 })),
    vector: Type.Array(Type.Number(), {
      description: "The search vector that will be used to find the nearest neighbors.",
    }),
  }),
)

export const VectorizeIndexInsertResponse = named(
  "vectorize_index-insert-response",
  Type.Object({
    count: Type.Optional(
      Type.Integer({ description: "Specifies the count of the vectors successfully inserted.", "x-auditable": true }),
    ),
    ids: Type.Optional(
      Type.Array(VectorizeVectorIdentifier, {
        description: "Array of vector identifiers of the vectors successfully inserted.",
      }),
    ),
  }),
)

export const VectorizeIndexGetVectorsByIdResponse = named(
  "vectorize_index-get-vectors-by-id-response",
  Type.Array(
    Type.Object({
      id: Type.Optional(VectorizeVectorIdentifier),
      metadata: Type.Optional(Type.Unknown()),
      namespace: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      values: Type.Optional(Type.Array(Type.Number())),
    }),
    { description: "Array of vectors with matching ids." },
  ),
)

export const VectorizeIndexGetVectorsByIdRequest = named(
  "vectorize_index-get-vectors-by-id-request",
  Type.Object({
    ids: Type.Optional(
      Type.Array(VectorizeVectorIdentifier, {
        description: "A list of vector identifiers to retrieve from the index indicated by the path.",
      }),
    ),
  }),
)

export const VectorizeIndexDeleteVectorsByIdResponse = named(
  "vectorize_index-delete-vectors-by-id-response",
  Type.Object({
    count: Type.Optional(Type.Integer({ description: "The count of the vectors successfully deleted." })),
    ids: Type.Optional(
      Type.Array(VectorizeVectorIdentifier, {
        description: "Array of vector identifiers of the vectors that were successfully processed for deletion.",
      }),
    ),
  }),
)

export const VectorizeIndexDeleteVectorsByIdRequest = named(
  "vectorize_index-delete-vectors-by-id-request",
  Type.Object({
    ids: Type.Optional(
      Type.Array(VectorizeVectorIdentifier, {
        description: "A list of vector identifiers to delete from the index indicated by the path.",
      }),
    ),
  }),
)

export const VectorizeIndexDescription = named(
  "vectorize_index-description",
  Type.String({ description: "Specifies the description of the index.", "x-auditable": true }),
)

export const VectorizeUpdateIndexRequest = named(
  "vectorize_update-index-request",
  Type.Object({
    description: VectorizeIndexDescription,
  }),
)

export const VectorizeIndexName = named("vectorize_index-name", Type.String({ "x-auditable": true }))

export const VectorizeIndexMetric = named(
  "vectorize_index-metric",
  Type.Union([Type.Literal("cosine"), Type.Literal("euclidean"), Type.Literal("dot-product")], {
    description: "Specifies the type of metric to use calculating distance.",
    "x-auditable": true,
  }),
)

export const VectorizeIndexDimensionConfiguration = named(
  "vectorize_index-dimension-configuration",
  Type.Object({
    dimensions: VectorizeIndexDimensions,
    metric: VectorizeIndexMetric,
  }),
)

export const VectorizeIndexPreset = named(
  "vectorize_index-preset",
  Type.Union(
    [
      Type.Literal("@cf/baai/bge-small-en-v1.5"),
      Type.Literal("@cf/baai/bge-base-en-v1.5"),
      Type.Literal("@cf/baai/bge-large-en-v1.5"),
      Type.Literal("openai/text-embedding-ada-002"),
      Type.Literal("cohere/embed-multilingual-v2.0"),
    ],
    { description: "Specifies the preset to use for the index.", "x-auditable": true },
  ),
)

export const VectorizeIndexPresetConfiguration = named(
  "vectorize_index-preset-configuration",
  Type.Object({
    preset: VectorizeIndexPreset,
  }),
)

export const VectorizeIndexConfiguration = named(
  "vectorize_index-configuration",
  Type.Union([VectorizeIndexDimensionConfiguration, VectorizeIndexPresetConfiguration], {
    description: "Specifies the type of configuration to use for the index.",
  }),
)

export const VectorizeCreateIndexRequest = named(
  "vectorize_create-index-request",
  Type.Object({
    config: VectorizeIndexConfiguration,
    description: Type.Optional(VectorizeIndexDescription),
    name: VectorizeIndexName,
  }),
)

export const VectorizeCreateIndexResponse = named(
  "vectorize_create-index-response",
  Type.Object({
    config: Type.Optional(VectorizeIndexDimensionConfiguration),
    created_on: Type.Optional(
      Type.String({
        description: "Specifies the timestamp the resource was created as an ISO8601 string.",
        format: "date-time",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    description: Type.Optional(VectorizeIndexDescription),
    modified_on: Type.Optional(
      Type.String({
        description: "Specifies the timestamp the resource was modified as an ISO8601 string.",
        format: "date-time",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    name: Type.Optional(VectorizeIndexName),
  }),
)

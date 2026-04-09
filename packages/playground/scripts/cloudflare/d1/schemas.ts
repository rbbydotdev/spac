import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages } from "../shared/schemas"

export const D1ServedByRegion = named(
  "d1_served-by-region",
  Type.Union(
    [
      Type.Literal("WNAM"),
      Type.Literal("ENAM"),
      Type.Literal("WEUR"),
      Type.Literal("EEUR"),
      Type.Literal("APAC"),
      Type.Literal("OC"),
    ],
    { description: "Region location hint of the database instance that handled the query.", "x-auditable": true },
  ),
)

export const D1QueryMeta = named(
  "d1_query-meta",
  Type.Object({
    changed_db: Type.Optional(
      Type.Boolean({
        description: "Denotes if the database has been altered in some way, like deleting rows.",
        "x-auditable": true,
      }),
    ),
    changes: Type.Optional(
      Type.Number({
        description:
          "Rough indication of how many rows were modified by the query, as provided by SQLite's `sqlite3_total_changes()`.",
        "x-auditable": true,
      }),
    ),
    duration: Type.Optional(
      Type.Number({
        description:
          "The duration of the SQL query execution inside the database. Does not include any network communication.",
        "x-auditable": true,
      }),
    ),
    last_row_id: Type.Optional(
      Type.Number({
        description:
          "The row ID of the last inserted row in a table with an `INTEGER PRIMARY KEY` as provided by SQLite. Tables created with `WITHOUT ROWID` do not populate this.",
        "x-auditable": true,
      }),
    ),
    rows_read: Type.Optional(
      Type.Number({
        description:
          "Number of rows read during the SQL query execution, including indices (not all rows are necessarily returned).",
        "x-auditable": true,
      }),
    ),
    rows_written: Type.Optional(
      Type.Number({
        description: "Number of rows written during the SQL query execution, including indices.",
        "x-auditable": true,
      }),
    ),
    served_by_primary: Type.Optional(
      Type.Boolean({
        description: "Denotes if the query has been handled by the database primary instance.",
        "x-auditable": true,
      }),
    ),
    served_by_region: Type.Optional(D1ServedByRegion),
    size_after: Type.Optional(
      Type.Number({ description: "Size of the database after the query committed, in bytes.", "x-auditable": true }),
    ),
    timings: Type.Optional(
      Type.Object(
        {
          sql_duration_ms: Type.Optional(
            Type.Number({
              description:
                "The duration of the SQL query execution inside the database. Does not include any network communication.",
              "x-auditable": true,
            }),
          ),
        },
        { description: "Various durations for the query." },
      ),
    ),
  }),
)

export const D1RawResultResponse = named(
  "d1_raw-result-response",
  Type.Object({
    meta: Type.Optional(D1QueryMeta),
    results: Type.Optional(
      Type.Object({
        columns: Type.Optional(Type.Array(Type.String())),
        rows: Type.Optional(Type.Array(Type.Array(Type.Union([Type.Number(), Type.String(), Type.Unknown()])))),
      }),
    ),
    success: Type.Optional(Type.Boolean()),
  }),
)

export const D1QueryResultResponse = named(
  "d1_query-result-response",
  Type.Object({
    meta: Type.Optional(D1QueryMeta),
    results: Type.Optional(Type.Array(Type.Unknown())),
    success: Type.Optional(Type.Boolean()),
  }),
)

export const D1Sql = named(
  "d1_sql",
  Type.String({
    description:
      "Your SQL query. Supports multiple statements, joined by semicolons, which will be executed as a batch.",
  }),
)

export const D1Params = named("d1_params", Type.Array(Type.String()))

export const D1ReadReplicationMode = named(
  "d1_read-replication-mode",
  Type.Union([Type.Literal("auto"), Type.Literal("disabled")], {
    description:
      "The read replication mode for the database. Use 'auto' to create replicas and allow D1 automatically place them around the world, or 'disabled' to not use any database replicas (it can take a few hours for all replicas to be deleted).",
    "x-auditable": true,
  }),
)

export const D1DatabaseUpdatePartialRequestBody = named(
  "d1_database-update-partial-request-body",
  Type.Object({
    read_replication: Type.Optional(
      Type.Object(
        {
          mode: D1ReadReplicationMode,
        },
        { description: "Configuration for D1 read replication." },
      ),
    ),
  }),
)

export const D1DatabaseUpdateRequestBody = named(
  "d1_database-update-request-body",
  Type.Object({
    read_replication: Type.Object(
      {
        mode: D1ReadReplicationMode,
      },
      { description: "Configuration for D1 read replication." },
    ),
  }),
)

export const D1DatabaseIdentifier = named(
  "d1_database-identifier",
  Type.String({ description: "D1 database identifier (UUID).", readOnly: true, "x-auditable": true }),
)

export const D1CreatedAt = named(
  "d1_created-at",
  Type.String({
    description: "Specifies the timestamp the resource was created as an ISO8601 string.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const D1FileSize = named(
  "d1_file-size",
  Type.Number({ description: "The D1 database's size, in bytes.", "x-auditable": true }),
)

export const D1DatabaseName = named(
  "d1_database-name",
  Type.String({ description: "D1 database name.", "x-auditable": true }),
)

export const D1TableCount = named("d1_table-count", Type.Number({ "x-auditable": true }))

export const D1ReadReplicationDetails = named(
  "d1_read-replication-details",
  Type.Object(
    {
      mode: D1ReadReplicationMode,
    },
    { description: "Configuration for D1 read replication." },
  ),
)

export const D1DatabaseVersion = named("d1_database-version", Type.String({ "x-auditable": true }))

export const D1DatabaseDetailsResponse = named(
  "d1_database-details-response",
  Type.Object(
    {
      created_at: Type.Optional(D1CreatedAt),
      file_size: Type.Optional(D1FileSize),
      name: Type.Optional(D1DatabaseName),
      num_tables: Type.Optional(D1TableCount),
      read_replication: Type.Optional(D1ReadReplicationDetails),
      uuid: Type.Optional(D1DatabaseIdentifier),
      version: Type.Optional(D1DatabaseVersion),
    },
    { description: "The details of the D1 database." },
  ),
)

export const D1PrimaryLocationHint = named(
  "d1_primary-location-hint",
  Type.Union(
    [
      Type.Literal("wnam"),
      Type.Literal("enam"),
      Type.Literal("weur"),
      Type.Literal("eeur"),
      Type.Literal("apac"),
      Type.Literal("oc"),
    ],
    {
      description:
        "Specify the region to create the D1 primary, if available. If this option is omitted, the D1 will be created as close as possible to the current user.",
      "x-auditable": true,
    },
  ),
)

export const D1ApiResponseCommonFailure = named(
  "d1_api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful" }),
  }),
)

export const D1DatabaseResponse = named(
  "d1_database-response",
  Type.Object({
    created_at: Type.Optional(D1CreatedAt),
    name: Type.Optional(D1DatabaseName),
    uuid: Type.Optional(D1DatabaseIdentifier),
    version: Type.Optional(D1DatabaseVersion),
  }),
)

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages } from "../shared/schemas"
import {
  D1ApiResponseCommonFailure,
  D1DatabaseDetailsResponse,
  D1DatabaseIdentifier,
  D1DatabaseName,
  D1DatabaseResponse,
  D1DatabaseUpdatePartialRequestBody,
  D1DatabaseUpdateRequestBody,
  D1Params,
  D1PrimaryLocationHint,
  D1QueryMeta,
  D1QueryResultResponse,
  D1RawResultResponse,
  D1Sql,
} from "./schemas"

export function registerD1(api: Api) {
  api.assertVersion("3.0.3", "D1")

  api.group("/accounts/{account_id}/d1/database", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        name: Type.Optional(Type.String({ description: "a database name to search for." })),
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Number of items per page.", default: 1000, minimum: 10, maximum: 10000 }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Array(D1DatabaseResponse),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Optional(Type.Number({ description: "Total number of results for the requested service" })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of results" })),
              per_page: Type.Optional(Type.Number({ description: "Number of results per page of results" })),
              total_count: Type.Optional(
                Type.Number({ description: "Total results available without any search parameters" }),
              ),
            }),
          ),
        }),
      )
      .error("4XX", D1ApiResponseCommonFailure)
      .summary("List D1 Databases")
      .description("Returns a list of D1 databases.")
      .operationId("cloudflare-d1-list-databases")
      .tag("D1")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["D1 Read", "D1 Write"])

    g.post("/", {
      body: Type.Object({
        name: D1DatabaseName,
        primary_location_hint: Type.Optional(D1PrimaryLocationHint),
      }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: D1DatabaseDetailsResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error("4XX", D1ApiResponseCommonFailure)
      .summary("Create D1 Database")
      .description("Returns the created D1 database.")
      .operationId("cloudflare-d1-create-database")
      .tag("D1")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["D1 Write"])

    g.get("/{database_id}", {
      params: Type.Object({ database_id: Type.Union([D1DatabaseIdentifier, D1DatabaseName]) }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: D1DatabaseDetailsResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error("4XX", D1ApiResponseCommonFailure)
      .summary("Get D1 Database")
      .description("Returns the specified D1 database.")
      .operationId("cloudflare-d1-get-database")
      .tag("D1")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["D1 Read", "D1 Write"])

    g.put("/{database_id}", {
      params: Type.Object({ database_id: D1DatabaseIdentifier }),
      body: D1DatabaseUpdateRequestBody,
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: D1DatabaseDetailsResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error("4XX", D1ApiResponseCommonFailure)
      .summary("Update D1 Database")
      .description("Updates the specified D1 database.")
      .operationId("cloudflare-d1-update-database")
      .tag("D1")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["D1 Write"])

    g.patch("/{database_id}", {
      params: Type.Object({ database_id: D1DatabaseIdentifier }),
      body: D1DatabaseUpdatePartialRequestBody,
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: D1DatabaseDetailsResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error("4XX", D1ApiResponseCommonFailure)
      .summary("Update D1 Database partially")
      .description("Updates partially the specified D1 database.")
      .operationId("cloudflare-d1-update-partial-database")
      .tag("D1")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["D1 Write"])

    g.delete("/{database_id}", {
      params: Type.Object({ database_id: D1DatabaseIdentifier }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error("4XX", D1ApiResponseCommonFailure)
      .summary("Delete D1 Database")
      .description("Deletes the specified D1 database.")
      .operationId("cloudflare-d1-delete-database")
      .tag("D1")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["D1 Write"])

    g.post("/{database_id}/export", {
      params: Type.Object({ database_id: D1DatabaseIdentifier }),
      body: Type.Object({
        current_bookmark: Type.Optional(
          Type.String({
            description:
              "To poll an in-progress export, provide the current bookmark (returned by your first polling response)",
            "x-auditable": true,
          }),
        ),
        dump_options: Type.Optional(
          Type.Object({
            no_data: Type.Optional(
              Type.Boolean({
                description: "Export only the table definitions, not their contents",
                "x-auditable": true,
              }),
            ),
            no_schema: Type.Optional(
              Type.Boolean({
                description: "Export only each table's contents, not its definition",
                "x-auditable": true,
              }),
            ),
            tables: Type.Optional(
              Type.Array(Type.String({ "x-auditable": true }), {
                description:
                  "Filter the export to just one or more tables. Passing an empty array is the same as not passing anything and means: export all tables.",
              }),
            ),
          }),
        ),
        output_format: Type.Union([Type.Literal("polling")], {
          description: "Specifies that you will poll this endpoint until the export completes",
          "x-auditable": true,
        }),
      }),
    })
      .respond(
        200,
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Object({
            at_bookmark: Type.Optional(
              Type.String({
                description:
                  "The current time-travel bookmark for your D1, used to poll for updates. Will not change for the duration of the export task.",
                "x-auditable": true,
              }),
            ),
            error: Type.Optional(
              Type.String({
                description: "Only present when status = 'error'. Contains the error message.",
                "x-auditable": true,
              }),
            ),
            messages: Type.Optional(
              Type.Array(Type.String({ "x-auditable": true }), { description: "Logs since the last time you polled" }),
            ),
            result: Type.Optional(
              Type.Object(
                {
                  filename: Type.Optional(
                    Type.String({ description: "The generated SQL filename.", "x-auditable": true }),
                  ),
                  signed_url: Type.Optional(
                    Type.String({ description: "The URL to download the exported SQL. Available for one hour." }),
                  ),
                },
                { description: "Only present when status = 'complete'" },
              ),
            ),
            status: Type.Optional(
              Type.Union([Type.Literal("complete"), Type.Literal("error")], { "x-auditable": true }),
            ),
            success: Type.Optional(Type.Boolean({ "x-auditable": true })),
            type: Type.Optional(Type.Union([Type.Literal("export")], { "x-auditable": true })),
          }),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .respond(
        202,
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Object({
            at_bookmark: Type.Optional(
              Type.String({
                description:
                  "The current time-travel bookmark for your D1, used to poll for updates. Will not change for the duration of the export task.",
                "x-auditable": true,
              }),
            ),
            messages: Type.Optional(
              Type.Array(Type.String({ "x-auditable": true }), { description: "Logs since the last time you polled" }),
            ),
            status: Type.Optional(Type.Union([Type.Literal("active")], { "x-auditable": true })),
            success: Type.Optional(Type.Boolean({ "x-auditable": true })),
            type: Type.Optional(Type.Union([Type.Literal("export")], { "x-auditable": true })),
          }),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error("4XX", D1ApiResponseCommonFailure)
      .summary("Export D1 Database as SQL")
      .description(
        "Returns a URL where the SQL contents of your D1 can be downloaded. Note: this process may take\nsome time for larger DBs, during which your D1 will be unavailable to serve queries. To avoid\nblocking your DB unnecessarily, an in-progress export must be continually polled or will automatically cancel.\n",
      )
      .operationId("cloudflare-d1-export-database")
      .tag("D1")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.post("/{database_id}/import", {
      params: Type.Object({ database_id: D1DatabaseIdentifier }),
      body: Type.Union([
        Type.Object({
          action: Type.Union([Type.Literal("init")], {
            description: "Indicates you have a new SQL file to upload.",
            "x-auditable": true,
          }),
          etag: Type.String({
            description:
              "Required when action is 'init' or 'ingest'. An md5 hash of the file you're uploading. Used to check if it already exists, and validate its contents before ingesting.",
            "x-auditable": true,
          }),
        }),
        Type.Object({
          action: Type.Union([Type.Literal("ingest")], {
            description: "Indicates you've finished uploading to tell the D1 to start consuming it",
            "x-auditable": true,
          }),
          etag: Type.String({
            description:
              "An md5 hash of the file you're uploading. Used to check if it already exists, and validate its contents before ingesting.",
            "x-auditable": true,
          }),
          filename: Type.String({ description: "The filename you have successfully uploaded.", "x-auditable": true }),
        }),
        Type.Object({
          action: Type.Union([Type.Literal("poll")], {
            description: "Indicates you've finished uploading to tell the D1 to start consuming it",
            "x-auditable": true,
          }),
          current_bookmark: Type.String({
            description: "This identifies the currently-running import, checking its status.",
            "x-auditable": true,
          }),
        }),
      ]),
    })
      .respond(
        200,
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Object({
            at_bookmark: Type.Optional(
              Type.String({
                description:
                  "The current time-travel bookmark for your D1, used to poll for updates. Will not change for the duration of the import. Only returned if an import process is currently running or recently finished.",
                "x-auditable": true,
              }),
            ),
            error: Type.Optional(
              Type.String({
                description:
                  "Only present when status = 'error'. Contains the error message that prevented the import from succeeding.",
                "x-auditable": true,
              }),
            ),
            filename: Type.Optional(
              Type.String({
                description:
                  "Derived from the database ID and etag, to use in avoiding repeated uploads. Only returned when for the 'init' action.",
                "x-auditable": true,
              }),
            ),
            messages: Type.Optional(
              Type.Array(Type.String({ "x-auditable": true }), { description: "Logs since the last time you polled" }),
            ),
            result: Type.Optional(
              Type.Object(
                {
                  final_bookmark: Type.Optional(
                    Type.String({
                      description:
                        "The time-travel bookmark if you need restore your D1 to directly after the import succeeded.",
                      "x-auditable": true,
                    }),
                  ),
                  meta: Type.Optional(D1QueryMeta),
                  num_queries: Type.Optional(
                    Type.Number({
                      description: "The total number of queries that were executed during the import.",
                      "x-auditable": true,
                    }),
                  ),
                },
                { description: "Only present when status = 'complete'" },
              ),
            ),
            status: Type.Optional(
              Type.Union([Type.Literal("complete"), Type.Literal("error")], { "x-auditable": true }),
            ),
            success: Type.Optional(Type.Boolean({ "x-auditable": true })),
            type: Type.Optional(Type.Union([Type.Literal("import")], { "x-auditable": true })),
            upload_url: Type.Optional(
              Type.String({
                description: "The R2 presigned URL to use for uploading. Only returned when for the 'init' action.",
              }),
            ),
          }),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .respond(
        202,
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Object({
            at_bookmark: Type.Optional(
              Type.String({
                description:
                  "The current time-travel bookmark for your D1, used to poll for updates. Will not change for the duration of the import.",
                "x-auditable": true,
              }),
            ),
            messages: Type.Optional(
              Type.Array(Type.String({ "x-auditable": true }), { description: "Logs since the last time you polled" }),
            ),
            status: Type.Optional(Type.Union([Type.Literal("active")], { "x-auditable": true })),
            success: Type.Optional(Type.Boolean({ "x-auditable": true })),
            type: Type.Optional(Type.Union([Type.Literal("import")], { "x-auditable": true })),
          }),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error("4XX", D1ApiResponseCommonFailure)
      .summary("Import SQL into your D1 Database")
      .description(
        "Generates a temporary URL for uploading an SQL file to, then instructing the D1 to import it\nand polling it for status updates. Imports block the D1 for their duration.\n",
      )
      .operationId("cloudflare-d1-import-database")
      .tag("D1")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.post("/{database_id}/query", {
      params: Type.Object({ database_id: D1DatabaseIdentifier }),
      body: Type.Object({
        params: Type.Optional(D1Params),
        sql: D1Sql,
      }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Array(D1QueryResultResponse),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error("4XX", D1ApiResponseCommonFailure)
      .summary("Query D1 Database")
      .description("Returns the query result as an object.")
      .operationId("cloudflare-d1-query-database")
      .tag("D1")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["D1 Read", "D1 Write"])

    g.post("/{database_id}/raw", {
      params: Type.Object({ database_id: D1DatabaseIdentifier }),
      body: Type.Object({
        params: Type.Optional(D1Params),
        sql: D1Sql,
      }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Array(D1RawResultResponse),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
        }),
      )
      .error("4XX", D1ApiResponseCommonFailure)
      .summary("Raw D1 Database query")
      .description(
        "Returns the query result rows as arrays rather than objects. This is a performance-optimized version of the /query endpoint.",
      )
      .operationId("cloudflare-d1-raw-database-query")
      .tag("D1")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
  })
}

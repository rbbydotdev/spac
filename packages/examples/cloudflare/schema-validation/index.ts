import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  ApiShieldApiResponseCommonFailure,
  ApiShieldBasicOperation,
  ApiShieldOperation,
  ApiShieldSchemasUuid,
  DlpMessages,
  DosUuid,
} from "../shared/schemas"
import {
  ApiShieldGlobalSettingChangeBase,
  ApiShieldGlobalSettings,
  ApiShieldPerOperationBulkSettings,
  ApiShieldPerOperationSetting,
  ApiShieldPerOperationSettingChangeBase,
  ApiShieldPublicSchemaSuccessResult,
  ApiShieldSchemaHosts,
  ApiShieldSchemasPublicSchema,
} from "./schemas"

export function registerSchemaValidation(api: Api) {
  api.group("/zones/{zone_id}/schema_validation", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/schemas", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 20, minimum: 5, maximum: 50 })),
        omit_source: Type.Optional(Type.Boolean({ default: false })),
        validation_enabled: Type.Optional(
          Type.Boolean({ description: "Flag whether schema is enabled for validation." }),
        ),
      }),
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
          result: Type.Array(ApiShieldSchemasPublicSchema),
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("List all uploaded schemas")
      .operationId("schema-validation-list-schemas-paginated")
      .tag("Schema Validation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])

    g.post("/schemas", {
      body: Type.Object({
        kind: Type.Union([Type.Literal("openapi_v3")], { description: "The kind of the schema" }),
        name: Type.String({ description: "A human-readable name for the schema" }),
        source: Type.String({ description: "The raw schema, e.g., the OpenAPI schema, either as JSON or YAML" }),
        validation_enabled: Type.Boolean({ description: "An indicator if this schema is enabled" }),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Integer({
                description: "A unique error code that describes the kind of issue with the schema",
                minimum: 1000,
              }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String({ description: "A short text explaining the issue with the schema" }),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                  locations: Type.Optional(
                    Type.Array(Type.String(), {
                      description:
                        "A list of JSON path expression(s) that describe the location(s) of the issue within the provided resource. See [https://goessner.net/articles/JsonPath/](https://goessner.net/articles/JsonPath/) for JSONPath specification.",
                    }),
                  ),
                }),
              ),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Integer({
                description: "A unique error code that describes the kind of issue with the schema",
                minimum: 1000,
              }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String({ description: "A short text explaining the issue with the schema" }),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                  locations: Type.Optional(
                    Type.Array(Type.String(), {
                      description:
                        "A list of JSON path expression(s) that describe the location(s) of the issue within the provided resource. See [https://goessner.net/articles/JsonPath/](https://goessner.net/articles/JsonPath/) for JSONPath specification.",
                    }),
                  ),
                }),
              ),
            }),
          ),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: ApiShieldSchemasPublicSchema,
        }),
        "4XX": Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Integer({
                description: "A unique error code that describes the kind of issue with the schema",
                minimum: 1000,
              }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String({ description: "A short text explaining the issue with the schema" }),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                  locations: Type.Optional(
                    Type.Array(Type.String(), {
                      description:
                        "A list of JSON path expression(s) that describe the location(s) of the issue within the provided resource. See [https://goessner.net/articles/JsonPath/](https://goessner.net/articles/JsonPath/) for JSONPath specification.",
                    }),
                  ),
                }),
              ),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Integer({
                description: "A unique error code that describes the kind of issue with the schema",
                minimum: 1000,
              }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String({ description: "A short text explaining the issue with the schema" }),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                  locations: Type.Optional(
                    Type.Array(Type.String(), {
                      description:
                        "A list of JSON path expression(s) that describe the location(s) of the issue within the provided resource. See [https://goessner.net/articles/JsonPath/](https://goessner.net/articles/JsonPath/) for JSONPath specification.",
                    }),
                  ),
                }),
              ),
            }),
          ),
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      },
    })
      .summary("Upload a schema")
      .operationId("schema-validation-create-schema")
      .tag("Schema Validation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])

    g.get("/schemas/hosts", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 20, minimum: 5, maximum: 50 })),
      }),
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
          result: Type.Array(ApiShieldSchemaHosts),
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("List hosts covered by uploaded schemas")
      .operationId("schema-validation-list-schema-hosts")
      .tag("Schema Validation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])

    g.get("/schemas/{schema_id}", {
      params: Type.Object({ schema_id: ApiShieldSchemasUuid }),
      query: Type.Object({
        omit_source: Type.Optional(Type.Boolean({ default: false })),
      }),
      responses: {
        200: ApiShieldPublicSchemaSuccessResult,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Get details of a schema")
      .operationId("schema-validation-get-schema")
      .tag("Schema Validation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])

    g.patch("/schemas/{schema_id}", {
      params: Type.Object({ schema_id: ApiShieldSchemasUuid }),
      body: Type.Object({
        validation_enabled: Type.Optional(
          Type.Boolean({ description: "Flag whether schema is enabled for validation." }),
        ),
      }),
      responses: {
        200: ApiShieldPublicSchemaSuccessResult,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Edit details of a schema to enable validation")
      .operationId("schema-validation-edit-schema")
      .tag("Schema Validation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])

    g.delete("/schemas/{schema_id}", {
      params: Type.Object({ schema_id: ApiShieldSchemasUuid }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Object({
            schema_id: Type.String({
              description: "The ID of the schema that was just deleted",
              format: "uuid",
              "x-auditable": true,
            }),
          }),
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Delete a schema")
      .operationId("schema-validation-delete-schema")
      .tag("Schema Validation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])

    g.get("/schemas/{schema_id}/operations", {
      params: Type.Object({ schema_id: ApiShieldSchemasUuid }),
      query: Type.Object({
        feature: Type.Optional(
          Type.Array(
            Type.Union([Type.Literal("thresholds"), Type.Literal("parameter_schemas"), Type.Literal("schema_info")]),
            { uniqueItems: true },
          ),
        ),
        host: Type.Optional(
          Type.Array(Type.String(), {
            description: "Filter results to only include the specified hosts.",
            uniqueItems: true,
          }),
        ),
        method: Type.Optional(
          Type.Array(Type.String(), {
            description: "Filter results to only include the specified HTTP methods.",
            uniqueItems: true,
          }),
        ),
        endpoint: Type.Optional(
          Type.String({ description: "Filter results to only include endpoints containing this pattern." }),
        ),
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 20, minimum: 5, maximum: 50 })),
        operation_status: Type.Optional(Type.Union([Type.Literal("new"), Type.Literal("existing")])),
      }),
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
          result: Type.Array(Type.Union([ApiShieldOperation, ApiShieldBasicOperation])),
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Retrieve all operations from the schema.")
      .description(
        "Retrieves all operations from the schema. Operations that already exist in API Shield Endpoint Management will be returned as full operations.",
      )
      .operationId("schema-validation-extract-operations-from-schema")
      .tag("Schema Validation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])

    g.get("/settings", {
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: ApiShieldGlobalSettings,
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Get global schema validation settings")
      .operationId("schema-validation-get-settings")
      .tag("Schema Validation Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])

    g.put("/settings", {
      body: ApiShieldGlobalSettingChangeBase,
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: ApiShieldGlobalSettings,
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Update global schema validation settings")
      .operationId("schema-validation-update-settings")
      .tag("Schema Validation Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])

    g.patch("/settings", {
      body: ApiShieldGlobalSettingChangeBase,
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: ApiShieldGlobalSettings,
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Edit global schema validation settings")
      .operationId("schema-validation-edit-settings")
      .tag("Schema Validation Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])

    g.get("/settings/operations", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 20, minimum: 5, maximum: 50 })),
      }),
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
          result: Type.Array(ApiShieldPerOperationSetting),
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("List per-operation schema validation settings")
      .operationId("schema-validation-list-per-operation-settings")
      .tag("Schema Validation Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])

    g.patch("/settings/operations", {
      body: Type.Record(
        Type.String(),
        Type.Object(
          {
            mitigation_action: Type.Optional(
              Type.Union([Type.Literal("none"), Type.Literal("log"), Type.Literal("block"), Type.Null()], {
                description:
                  "Mitigation actions are as follows:\n* `log` - log request when request does not conform to schema * `block` - deny access to the site when request does not conform to schema * `none` - skip running schema validation * null - clears any existing per-operation setting\n",
              }),
            ),
          },
          { description: "Operation ID to mitigation action mappings" },
        ),
      ),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: ApiShieldPerOperationBulkSettings,
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Bulk edit per-operation schema validation settings")
      .operationId("schema-validation-bulk-edit-per-operation-settings")
      .tag("Schema Validation Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])

    g.get("/settings/operations/{operation_id}", {
      params: Type.Object({ operation_id: DosUuid }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: ApiShieldPerOperationSetting,
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Get per-operation schema validation setting")
      .operationId("schema-validation-get-per-operation-setting")
      .tag("Schema Validation Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])

    g.put("/settings/operations/{operation_id}", {
      params: Type.Object({ operation_id: DosUuid }),
      body: ApiShieldPerOperationSettingChangeBase,
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: ApiShieldPerOperationSetting,
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Update per-operation schema validation setting")
      .operationId("schema-validation-update-per-operation-setting")
      .tag("Schema Validation Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])

    g.delete("/settings/operations/{operation_id}", {
      params: Type.Object({ operation_id: DosUuid }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Object({
            operation_id: Type.Optional(ApiShieldSchemasUuid),
          }),
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Delete per-operation schema validation setting")
      .operationId("schema-validation-delete-per-operation-setting")
      .tag("Schema Validation Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])
  })
}

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
  ApiShieldApiDiscoveryOrigin,
  ApiShieldApiDiscoveryPatchMultipleRequest,
  ApiShieldApiDiscoveryState,
  ApiShieldApiDiscoveryStatePatch,
  ApiShieldApiResponseCommon,
  ApiShieldApiResponseSingle,
  ApiShieldConfiguration,
  ApiShieldConfigurationSingleResponse,
  ApiShieldDiscoveryOperation,
  ApiShieldMultipleOperationResponse,
  ApiShieldMultipleOperationResponsePaginated,
  ApiShieldOperationSchemaValidationSettings,
  ApiShieldOperationSchemaValidationSettingsModifyRequest,
  ApiShieldOperationSchemaValidationSettingsMultipleRequest,
  ApiShieldPatchDiscoveriesResponse,
  ApiShieldPatchDiscoveryResponse,
  ApiShieldProperties,
  ApiShieldPublicSchema,
  ApiShieldRequestExpressionTemplatesFallthrough,
  ApiShieldResponseExpressionTemplatesFallthrough,
  ApiShieldResponseUserSchemasHosts,
  ApiShieldSchemaResponseDiscovery,
  ApiShieldSchemaResponseWithThresholds,
  ApiShieldSchemaUploadFailure,
  ApiShieldSchemaUploadResponse,
  ApiShieldSingleOperationResponse,
  ApiShieldValidationEnabled,
  ApiShieldZoneSchemaValidationSettings,
  ApiShieldZoneSchemaValidationSettingsPatch,
  ApiShieldZoneSchemaValidationSettingsPut,
} from "./schemas"

export function registerApiGateway(api: Api) {
  api.group("/zones/{zone_id}/api_gateway", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/configuration", {
      query: Type.Object({
        properties: Type.Optional(ApiShieldProperties),
      }),
      responses: {
        200: ApiShieldConfigurationSingleResponse,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Retrieve information about specific configuration properties")
      .operationId("api-shield-settings-retrieve-information-about-specific-configuration-properties")
      .tag("API Shield Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])

    g.put("/configuration", {
      body: ApiShieldConfiguration,
      responses: {
        200: ApiShieldApiResponseCommon,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Set configuration properties")
      .operationId("api-shield-settings-set-configuration-properties")
      .tag("API Shield Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])

    g.get("/discovery", {
      responses: {
        200: ApiShieldSchemaResponseDiscovery,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Retrieve discovered operations on a zone rendered as OpenAPI schemas")
      .description("Retrieve the most up to date view of discovered operations, rendered as OpenAPI schemas")
      .operationId("api-shield-api-discovery-retrieve-discovered-operations-on-a-zone-as-openapi")
      .tag("API Shield API Discovery")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])

    g.get("/discovery/operations", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 20, minimum: 5, maximum: 50 })),
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
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Direction to order results." }),
        ),
        order: Type.Optional(
          Type.Union(
            [
              Type.Literal("host"),
              Type.Literal("method"),
              Type.Literal("endpoint"),
              Type.Literal("traffic_stats.requests"),
              Type.Literal("traffic_stats.last_updated"),
            ],
            { description: "Field to order by" },
          ),
        ),
        diff: Type.Optional(
          Type.Boolean({
            description:
              "When `true`, only return API Discovery results that are not saved into API Shield Endpoint Management",
          }),
        ),
        origin: Type.Optional(ApiShieldApiDiscoveryOrigin),
        state: Type.Optional(ApiShieldApiDiscoveryState),
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
          result: Type.Array(ApiShieldDiscoveryOperation),
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Retrieve discovered operations on a zone")
      .description("Retrieve the most up to date view of discovered operations")
      .operationId("api-shield-api-discovery-retrieve-discovered-operations-on-a-zone")
      .tag("API Shield API Discovery")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])

    g.patch("/discovery/operations", {
      body: ApiShieldApiDiscoveryPatchMultipleRequest,
      responses: {
        200: ApiShieldPatchDiscoveriesResponse,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Patch discovered operations")
      .description("Update the `state` on one or more discovered operations")
      .operationId("api-shield-api-patch-discovered-operations")
      .tag("API Shield API Discovery")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])

    g.patch("/discovery/operations/{operation_id}", {
      params: Type.Object({ operation_id: ApiShieldSchemasUuid }),
      body: Type.Object({
        state: Type.Optional(ApiShieldApiDiscoveryStatePatch),
      }),
      responses: {
        200: ApiShieldPatchDiscoveryResponse,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Patch discovered operation")
      .description("Update the `state` on a discovered operation")
      .operationId("api-shield-api-patch-discovered-operation")
      .tag("API Shield API Discovery")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])

    g.post("/expression-template/fallthrough", {
      body: ApiShieldRequestExpressionTemplatesFallthrough,
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: ApiShieldResponseExpressionTemplatesFallthrough,
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Generate fallthrough WAF expression template from a set of API hosts")
      .operationId("api-shield-expression-templates-fallthrough")
      .tag("API Shield WAF Expression Templates")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])

    g.get("/operations", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 20, minimum: 5, maximum: 50 })),
        order: Type.Optional(
          Type.Union(
            [Type.Literal("method"), Type.Literal("host"), Type.Literal("endpoint"), Type.Literal("thresholds.$key")],
            {
              description:
                "Field to order by. When requesting a feature, the feature keys are available for ordering as well, e.g., `thresholds.suggested_threshold`.",
            },
          ),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Direction to order results." }),
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
        feature: Type.Optional(
          Type.Array(
            Type.Union([Type.Literal("thresholds"), Type.Literal("parameter_schemas"), Type.Literal("schema_info")]),
            { uniqueItems: true },
          ),
        ),
      }),
      responses: {
        200: ApiShieldMultipleOperationResponsePaginated,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Retrieve information about all operations on a zone")
      .operationId("api-shield-endpoint-management-retrieve-information-about-all-operations-on-a-zone")
      .tag("API Shield Endpoint Management")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])

    g.post("/operations", {
      body: Type.Array(ApiShieldBasicOperation),
      responses: {
        200: ApiShieldMultipleOperationResponse,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Add operations to a zone")
      .description(
        "Add one or more operations to a zone. Endpoints can contain path variables. Host, method, endpoint will be normalized to a canoncial form when creating an operation and must be unique on the zone. Inserting an operation that matches an existing one will return the record of the already existing operation and update its last_updated date.",
      )
      .operationId("api-shield-endpoint-management-add-operations-to-a-zone")
      .tag("API Shield Endpoint Management")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])

    g.delete("/operations", {
      responses: {
        200: ApiShieldApiResponseCommon,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Delete multiple operations")
      .operationId("api-shield-endpoint-management-delete-multiple-operations")
      .tag("API Shield Endpoint Management")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])

    g.post("/operations/item", {
      body: ApiShieldBasicOperation,
      responses: {
        200: ApiShieldSingleOperationResponse,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Add one operation to a zone")
      .description(
        "Add one operation to a zone. Endpoints can contain path variables. Host, method, endpoint will be normalized to a canoncial form when creating an operation and must be unique on the zone. Inserting an operation that matches an existing one will return the record of the already existing operation and update its last_updated date.",
      )
      .operationId("api-shield-endpoint-management-add-operation-to-a-zone")
      .tag("API Shield Endpoint Management")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])

    g.patch("/operations/schema_validation", {
      body: ApiShieldOperationSchemaValidationSettingsMultipleRequest,
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: ApiShieldOperationSchemaValidationSettingsMultipleRequest,
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Update multiple operation-level schema validation settings")
      .description("Updates multiple operation-level schema validation settings on the zone")
      .operationId("api-shield-schema-validation-update-multiple-operation-level-settings")
      .tag("API Shield Schema Validation 2.0")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])
      .extension(
        "x-stainless-deprecation-message",
        "Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.",
      )

    g.get("/operations/{operation_id}", {
      params: Type.Object({ operation_id: DosUuid }),
      query: Type.Object({
        feature: Type.Optional(
          Type.Array(
            Type.Union([Type.Literal("thresholds"), Type.Literal("parameter_schemas"), Type.Literal("schema_info")]),
            { uniqueItems: true },
          ),
        ),
      }),
      responses: {
        200: ApiShieldSingleOperationResponse,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Retrieve information about an operation")
      .operationId("api-shield-endpoint-management-retrieve-information-about-an-operation")
      .tag("API Shield Endpoint Management")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])

    g.delete("/operations/{operation_id}", {
      params: Type.Object({ operation_id: DosUuid }),
      responses: {
        200: ApiShieldApiResponseCommon,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Delete an operation")
      .operationId("api-shield-endpoint-management-delete-an-operation")
      .tag("API Shield Endpoint Management")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])

    g.get("/operations/{operation_id}/schema_validation", {
      params: Type.Object({ operation_id: DosUuid }),
      responses: {
        200: ApiShieldOperationSchemaValidationSettings,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Retrieve operation-level schema validation settings")
      .description("Retrieves operation-level schema validation settings on the zone")
      .operationId("api-shield-schema-validation-retrieve-operation-level-settings")
      .tag("API Shield Schema Validation 2.0")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])
      .extension(
        "x-stainless-deprecation-message",
        "Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.",
      )

    g.put("/operations/{operation_id}/schema_validation", {
      params: Type.Object({ operation_id: DosUuid }),
      body: ApiShieldOperationSchemaValidationSettingsModifyRequest,
      responses: {
        200: ApiShieldOperationSchemaValidationSettings,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Update operation-level schema validation settings")
      .description("Updates operation-level schema validation settings on the zone")
      .operationId("api-shield-schema-validation-update-operation-level-settings")
      .tag("API Shield Schema Validation 2.0")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])
      .extension(
        "x-stainless-deprecation-message",
        "Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.",
      )

    g.get("/schemas", {
      query: Type.Object({
        host: Type.Optional(
          Type.Array(Type.String(), { description: "Receive schema only for the given host(s).", uniqueItems: true }),
        ),
        feature: Type.Optional(
          Type.Array(
            Type.Union([Type.Literal("thresholds"), Type.Literal("parameter_schemas"), Type.Literal("schema_info")]),
            { uniqueItems: true },
          ),
        ),
      }),
      responses: {
        200: ApiShieldSchemaResponseWithThresholds,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Retrieve operations and features as OpenAPI schemas")
      .operationId("api-shield-endpoint-management-retrieve-operations-and-features-as-open-api-schemas")
      .tag("API Shield Endpoint Management")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])

    g.get("/settings/schema_validation", {
      responses: {
        200: ApiShieldZoneSchemaValidationSettings,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Retrieve zone level schema validation settings")
      .description("Retrieves zone level schema validation settings currently set on the zone")
      .operationId("api-shield-schema-validation-retrieve-zone-level-settings")
      .tag("API Shield Schema Validation 2.0")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])
      .extension(
        "x-stainless-deprecation-message",
        "Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.",
      )

    g.put("/settings/schema_validation", {
      body: ApiShieldZoneSchemaValidationSettingsPut,
      responses: {
        200: ApiShieldZoneSchemaValidationSettings,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Update zone level schema validation settings")
      .description("Updates zone level schema validation settings on the zone")
      .operationId("api-shield-schema-validation-update-zone-level-settings")
      .tag("API Shield Schema Validation 2.0")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])
      .extension(
        "x-stainless-deprecation-message",
        "Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.",
      )

    g.patch("/settings/schema_validation", {
      body: ApiShieldZoneSchemaValidationSettingsPatch,
      responses: {
        200: ApiShieldZoneSchemaValidationSettings,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Update zone level schema validation settings")
      .description("Updates zone level schema validation settings on the zone")
      .operationId("api-shield-schema-validation-patch-zone-level-settings")
      .tag("API Shield Schema Validation 2.0")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])
      .extension(
        "x-stainless-deprecation-message",
        "Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.",
      )

    g.get("/user_schemas", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 20, minimum: 5, maximum: 50 })),
        omit_source: Type.Optional(Type.Boolean({ default: false })),
        validation_enabled: Type.Optional(ApiShieldValidationEnabled),
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
          result: Type.Array(ApiShieldPublicSchema),
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Retrieve information about all schemas on a zone")
      .operationId("api-shield-schema-validation-retrieve-information-about-all-schemas")
      .tag("API Shield Schema Validation 2.0")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])
      .extension(
        "x-stainless-deprecation-message",
        "Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.",
      )

    g.post("/user_schemas", {
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: ApiShieldSchemaUploadResponse,
        }),
        "4XX": ApiShieldSchemaUploadFailure,
      },
    })
      .summary("Upload a schema to a zone")
      .operationId("api-shield-schema-validation-post-schema")
      .tag("API Shield Schema Validation 2.0")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])
      .extension(
        "x-stainless-deprecation-message",
        "Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.",
      )

    g.get("/user_schemas/hosts", {
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
          result: Type.Optional(Type.Array(ApiShieldResponseUserSchemasHosts)),
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Retrieve schema hosts in a zone")
      .operationId("api-shield-schema-validation-retrieve-user-schema-hosts")
      .tag("API Shield Schema Validation 2.0")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])
      .extension(
        "x-stainless-deprecation-message",
        "Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.",
      )

    g.get("/user_schemas/{schema_id}", {
      params: Type.Object({ schema_id: Type.String({ format: "uuid", maxLength: 36, readOnly: true }) }),
      query: Type.Object({
        omit_source: Type.Optional(Type.Boolean({ default: false })),
      }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: ApiShieldPublicSchema,
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Retrieve information about a specific schema on a zone")
      .operationId("api-shield-schema-validation-retrieve-information-about-specific-schema")
      .tag("API Shield Schema Validation 2.0")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])
      .extension(
        "x-stainless-deprecation-message",
        "Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.",
      )

    g.patch("/user_schemas/{schema_id}", {
      params: Type.Object({ schema_id: Type.String({ format: "uuid", maxLength: 36, readOnly: true }) }),
      body: Type.Object({
        validation_enabled: Type.Optional(
          Type.Union([Type.Literal(true)], {
            description: "Flag whether schema is enabled for validation.",
            "x-auditable": true,
          }),
        ),
      }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: ApiShieldPublicSchema,
        }),
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Enable validation for a schema")
      .operationId("api-shield-schema-validation-enable-validation-for-a-schema")
      .tag("API Shield Schema Validation 2.0")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])
      .extension(
        "x-stainless-deprecation-message",
        "Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.",
      )

    g.delete("/user_schemas/{schema_id}", {
      params: Type.Object({ schema_id: Type.String({ format: "uuid", maxLength: 36, readOnly: true }) }),
      responses: {
        200: ApiShieldApiResponseSingle,
        "4XX": ApiShieldApiResponseCommonFailure,
      },
    })
      .summary("Delete a schema")
      .operationId("api-shield-schema-delete-a-schema")
      .tag("API Shield Schema Validation 2.0")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account API Gateway", "Domain API Gateway"])
      .extension(
        "x-stainless-deprecation-message",
        "Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.",
      )

    g.get("/user_schemas/{schema_id}/operations", {
      params: Type.Object({ schema_id: Type.String({ format: "uuid", maxLength: 36, readOnly: true }) }),
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
      .summary("Retrieve all operations from a schema.")
      .description(
        "Retrieves all operations from the schema. Operations that already exist in API Shield Endpoint Management will be returned as full operations.",
      )
      .operationId("api-shield-schema-validation-extract-operations-from-schema")
      .tag("API Shield Schema Validation 2.0")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Account API Gateway",
        "Account API Gateway Read",
        "Domain API Gateway",
        "Domain API Gateway Read",
      ])
      .extension(
        "x-stainless-deprecation-message",
        "Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.",
      )
  })
}

import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  ApiShieldEndpoint,
  ApiShieldHost,
  ApiShieldMethod,
  ApiShieldOperation,
  ApiShieldSchemasTimestamp,
  ApiShieldSchemasUuid,
  DlpMessages,
} from "../shared/schemas"

export const ApiShieldApiResponseCommon = named(
  "api-shield_api-response-common",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const ApiShieldApiResponseSingle = named("api-shield_api-response-single", ApiShieldApiResponseCommon)

export const ApiShieldResponseUserSchemasHosts = named(
  "api-shield_response_user_schemas_hosts",
  Type.Object({
    created_at: ApiShieldSchemasTimestamp,
    hosts: Type.Array(Type.String(), { description: "Hosts serving the schema, e.g zone.host.com" }),
    name: Type.String({ description: "Name of the schema", "x-auditable": true }),
    schema_id: ApiShieldSchemasUuid,
  }),
)

export const ApiShieldSchemaUploadLogEvent = named(
  "api-shield_schema_upload_log_event",
  Type.Object({
    code: Type.Integer({ description: "Code that identifies the event that occurred.", "x-auditable": true }),
    locations: Type.Optional(
      Type.Array(
        Type.String({
          description:
            "JSONPath location in the schema where these events were encountered.  See [https://goessner.net/articles/JsonPath/](https://goessner.net/articles/JsonPath/) for JSONPath specification.",
          "x-auditable": true,
        }),
        {
          description:
            "JSONPath location(s) in the schema where these events were encountered.  See [https://goessner.net/articles/JsonPath/](https://goessner.net/articles/JsonPath/) for JSONPath specification.",
        },
      ),
    ),
    message: Type.Optional(
      Type.String({ description: "Diagnostic message that describes the event.", "x-auditable": true }),
    ),
  }),
)

export const ApiShieldSchemaUploadDetailsErrorsCritical = named(
  "api-shield_schema_upload_details_errors_critical",
  Type.Object({
    critical: Type.Optional(
      Type.Array(ApiShieldSchemaUploadLogEvent, {
        description: "Diagnostic critical error events that occurred during processing.",
      }),
    ),
    errors: Type.Optional(
      Type.Array(ApiShieldSchemaUploadLogEvent, {
        description: "Diagnostic error events that occurred during processing.",
      }),
    ),
  }),
)

export const ApiShieldSchemaUploadFailure = named(
  "api-shield_schema_upload_failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
    upload_details: Type.Optional(ApiShieldSchemaUploadDetailsErrorsCritical),
  }),
)

export const ApiShieldKind = named(
  "api-shield_kind",
  Type.Union([Type.Literal("openapi_v3")], { description: "Kind of schema", "x-auditable": true }),
)

export const ApiShieldValidationEnabled = named(
  "api-shield_validation_enabled",
  Type.Boolean({ description: "Flag whether schema is enabled for validation.", "x-auditable": true }),
)

export const ApiShieldPublicSchema = named(
  "api-shield_public_schema",
  Type.Object({
    created_at: ApiShieldSchemasTimestamp,
    kind: ApiShieldKind,
    name: Type.String({ description: "Name of the schema", "x-auditable": true }),
    schema_id: ApiShieldSchemasUuid,
    source: Type.Optional(Type.String({ description: "Source of the schema", "x-auditable": true })),
    validation_enabled: Type.Optional(ApiShieldValidationEnabled),
  }),
)

export const ApiShieldSchemaUploadDetailsWarningsOnly = named(
  "api-shield_schema_upload_details_warnings_only",
  Type.Object({
    warnings: Type.Optional(
      Type.Array(ApiShieldSchemaUploadLogEvent, {
        description:
          "Diagnostic warning events that occurred during processing. These events are non-critical errors found within the schema.",
      }),
    ),
  }),
)

export const ApiShieldSchemaUploadResponse = named(
  "api-shield_schema_upload_response",
  Type.Object({
    schema: ApiShieldPublicSchema,
    upload_details: Type.Optional(ApiShieldSchemaUploadDetailsWarningsOnly),
  }),
)

export const ApiShieldValidationDefaultMitigationActionPatch = named(
  "api-shield_validation_default_mitigation_action_patch",
  Type.Union([Type.Literal("none"), Type.Literal("log"), Type.Literal("block"), Type.Null()], {
    description:
      "The default mitigation action used when there is no mitigation action defined on the operation\nMitigation actions are as follows:\n\n  * `log` - log request when request does not conform to schema\n  * `block` - deny access to the site when request does not conform to schema\n\nA special value of of `none` will skip running schema validation entirely for the request when there is no mitigation action defined on the operation\n\n`null` will have no effect.\n",
    "x-auditable": true,
  }),
)

export const ApiShieldValidationOverrideMitigationActionPatch = named(
  "api-shield_validation_override_mitigation_action_patch",
  Type.Union([Type.Literal("none"), Type.Literal("disable_override"), Type.Null()], {
    description:
      "When set, this overrides both zone level and operation level mitigation actions.\n\n  - `none` will skip running schema validation entirely for the request\n\nTo clear any override, use the special value `disable_override`\n\n`null` will have no effect.\n",
    "x-auditable": true,
  }),
)

export const ApiShieldZoneSchemaValidationSettingsPatch = named(
  "api-shield_zone_schema_validation_settings_patch",
  Type.Object({
    validation_default_mitigation_action: Type.Optional(ApiShieldValidationDefaultMitigationActionPatch),
    validation_override_mitigation_action: Type.Optional(ApiShieldValidationOverrideMitigationActionPatch),
  }),
)

export const ApiShieldValidationDefaultMitigationAction = named(
  "api-shield_validation_default_mitigation_action",
  Type.Union([Type.Literal("none"), Type.Literal("log"), Type.Literal("block")], {
    description:
      "The default mitigation action used when there is no mitigation action defined on the operation\n\nMitigation actions are as follows:\n\n  * `log` - log request when request does not conform to schema\n  * `block` - deny access to the site when request does not conform to schema\n\nA special value of of `none` will skip running schema validation entirely for the request when there is no mitigation action defined on the operation\n",
    "x-auditable": true,
  }),
)

export const ApiShieldValidationOverrideMitigationActionWrite = named(
  "api-shield_validation_override_mitigation_action_write",
  Type.Union([Type.Literal("none"), Type.Literal("disable_override"), Type.Null()], {
    description:
      "When set, this overrides both zone level and operation level mitigation actions.\n\n  - `none` will skip running schema validation entirely for the request\n  - `null` indicates that no override is in place\n\nTo clear any override, use the special value `disable_override` or `null`\n",
    "x-auditable": true,
  }),
)

export const ApiShieldZoneSchemaValidationSettingsPut = named(
  "api-shield_zone_schema_validation_settings_put",
  Type.Object({
    validation_default_mitigation_action: ApiShieldValidationDefaultMitigationAction,
    validation_override_mitigation_action: Type.Optional(ApiShieldValidationOverrideMitigationActionWrite),
  }),
)

export const ApiShieldValidationOverrideMitigationAction = named(
  "api-shield_validation_override_mitigation_action",
  Type.Union([Type.Literal("none"), Type.Null()], {
    description:
      "When set, this overrides both zone level and operation level mitigation actions.\n\n  - `none` will skip running schema validation entirely for the request\n  - `null` indicates that no override is in place\n",
    "x-auditable": true,
  }),
)

export const ApiShieldZoneSchemaValidationSettings = named(
  "api-shield_zone_schema_validation_settings",
  Type.Object({
    validation_default_mitigation_action: Type.Optional(ApiShieldValidationDefaultMitigationAction),
    validation_override_mitigation_action: Type.Optional(ApiShieldValidationOverrideMitigationAction),
  }),
)

export const ApiShieldOpenapi = named(
  "api-shield_openapi",
  Type.Unknown({ description: "A OpenAPI 3.0.0 compliant schema." }),
)

export const ApiShieldSchemaResponseWithThresholds = named(
  "api-shield_schema-response-with-thresholds",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Object({
      schemas: Type.Optional(Type.Array(ApiShieldOpenapi)),
      timestamp: Type.Optional(Type.String({ "x-auditable": true })),
    }),
  }),
)

export const ApiShieldOperationMitigationAction = named(
  "api-shield_operation_mitigation_action",
  Type.Union([Type.Literal("log"), Type.Literal("block"), Type.Literal("none"), Type.Null()], {
    description:
      "When set, this applies a mitigation action to this operation\n\n  - `log` log request when request does not conform to schema for this operation\n  - `block` deny access to the site when request does not conform to schema for this operation\n  - `none` will skip mitigation for this operation\n  - `null` indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied\n",
    "x-auditable": true,
  }),
)

export const ApiShieldOperationSchemaValidationSettingsModifyRequest = named(
  "api-shield_operation_schema_validation_settings_modify_request",
  Type.Object({
    mitigation_action: Type.Optional(ApiShieldOperationMitigationAction),
  }),
)

export const ApiShieldOperationSchemaValidationSettings = named(
  "api-shield_operation_schema_validation_settings",
  Type.Object({
    mitigation_action: Type.Optional(ApiShieldOperationMitigationAction),
    operation_id: Type.Optional(ApiShieldSchemasUuid),
  }),
)

export const ApiShieldOperationSchemaValidationSettingsMultipleRequestEntry = named(
  "api-shield_operation_schema_validation_settings_multiple_request_entry",
  Type.Object(
    {
      mitigation_action: Type.Optional(ApiShieldOperationMitigationAction),
    },
    { description: "Operation ID to mitigation action mappings" },
  ),
)

export const ApiShieldOperationSchemaValidationSettingsMultipleRequest = named(
  "api-shield_operation_schema_validation_settings_multiple_request",
  Type.Record(Type.String(), ApiShieldOperationSchemaValidationSettingsMultipleRequestEntry),
)

export const ApiShieldSingleOperationResponse = named(
  "api-shield_single-operation-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: ApiShieldOperation,
  }),
)

export const ApiShieldMultipleOperationResponse = named(
  "api-shield_multiple-operation-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Array(ApiShieldOperation),
  }),
)

export const ApiShieldMultipleOperationResponsePaginated = named(
  "api-shield_multiple-operation-response-paginated",
  Type.Object({
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
    result: Type.Array(ApiShieldOperation),
  }),
)

export const ApiShieldResponseExpressionTemplatesFallthrough = named(
  "api-shield_response_expression_templates_fallthrough",
  Type.Object({
    expression: Type.String({ description: "WAF Expression for fallthrough", "x-auditable": true }),
    title: Type.String({ description: "Title for the expression", "x-auditable": true }),
  }),
)

export const ApiShieldRequestExpressionTemplatesFallthrough = named(
  "api-shield_request_expression_templates_fallthrough",
  Type.Object({
    hosts: Type.Array(Type.String({ "x-auditable": true }), {
      description: "List of hosts to be targeted in the expression",
    }),
  }),
)

export const ApiShieldApiDiscoveryState = named(
  "api-shield_api_discovery_state",
  Type.Union([Type.Literal("review"), Type.Literal("saved"), Type.Literal("ignored")], {
    description:
      "State of operation in API Discovery\n  * `review` - Operation is not saved into API Shield Endpoint Management\n  * `saved` - Operation is saved into API Shield Endpoint Management\n  * `ignored` - Operation is marked as ignored\n",
    "x-auditable": true,
  }),
)

export const ApiShieldPatchDiscoveryResponse = named(
  "api-shield_patch_discovery_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Object({
      state: Type.Optional(ApiShieldApiDiscoveryState),
    }),
  }),
)

export const ApiShieldApiDiscoveryStatePatch = named(
  "api-shield_api_discovery_state_patch",
  Type.Union([Type.Literal("review"), Type.Literal("ignored")], {
    description:
      "Mark state of operation in API Discovery\n  * `review` - Mark operation as for review\n  * `ignored` - Mark operation as ignored\n",
    "x-auditable": true,
  }),
)

export const ApiShieldApiDiscoveryPatchMultipleRequestEntry = named(
  "api-shield_api_discovery_patch_multiple_request_entry",
  Type.Object(
    {
      state: Type.Optional(ApiShieldApiDiscoveryStatePatch),
    },
    { description: "Mappings of discovered operations (keys) to objects describing their state" },
  ),
)

export const ApiShieldApiDiscoveryPatchMultipleRequest = named(
  "api-shield_api_discovery_patch_multiple_request",
  Type.Record(Type.String(), ApiShieldApiDiscoveryPatchMultipleRequestEntry),
)

export const ApiShieldPatchDiscoveriesResponse = named(
  "api-shield_patch_discoveries_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: ApiShieldApiDiscoveryPatchMultipleRequest,
  }),
)

export const ApiShieldApiDiscoveryOrigin = named(
  "api-shield_api_discovery_origin",
  Type.Union([Type.Literal("ML"), Type.Literal("SessionIdentifier"), Type.Literal("LabelDiscovery")], {
    description:
      "* `ML` - Discovered operation was sourced using ML API Discovery * `SessionIdentifier` - Discovered operation was sourced using Session Identifier API Discovery * `LabelDiscovery` - Discovered operation was identified to have a specific label\n",
    "x-auditable": true,
  }),
)

export const ApiShieldTrafficStats = named(
  "api-shield_traffic_stats",
  Type.Object({
    traffic_stats: Type.Optional(
      Type.Object({
        last_updated: ApiShieldSchemasTimestamp,
        period_seconds: Type.Integer({
          description: "The period in seconds these statistics were computed over",
          readOnly: true,
          "x-auditable": true,
        }),
        requests: Type.Number({
          description: "The average number of requests seen during this period",
          format: "float",
          readOnly: true,
          "x-auditable": true,
        }),
      }),
    ),
  }),
)

export const ApiShieldDiscoveryOperation = named(
  "api-shield_discovery_operation",
  Type.Object({
    features: Type.Optional(ApiShieldTrafficStats),
    id: ApiShieldSchemasUuid,
    last_updated: ApiShieldSchemasTimestamp,
    origin: Type.Array(ApiShieldApiDiscoveryOrigin, {
      description: "API discovery engine(s) that discovered this operation",
    }),
    state: ApiShieldApiDiscoveryState,
    endpoint: ApiShieldEndpoint,
    host: ApiShieldHost,
    method: ApiShieldMethod,
  }),
)

export const ApiShieldSchemaResponseDiscovery = named(
  "api-shield_schema_response_discovery",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Object({
      schemas: Type.Array(ApiShieldOpenapi),
      timestamp: ApiShieldSchemasTimestamp,
    }),
  }),
)

export const ApiShieldAuthIdCharacteristic = named(
  "api-shield_auth_id_characteristic",
  Type.Object(
    {
      name: Type.String({
        description: "The name of the characteristic field, i.e., the header or cookie name.",
        maxLength: 128,
        "x-auditable": true,
      }),
      type: Type.Union([Type.Literal("header"), Type.Literal("cookie")], {
        description: "The type of characteristic.",
        "x-auditable": true,
      }),
    },
    { description: "Auth ID Characteristic" },
  ),
)

export const ApiShieldAuthIdCharacteristicJwtClaim = named(
  "api-shield_auth_id_characteristic_jwt_claim",
  Type.Object(
    {
      name: Type.String({
        description:
          "Claim location expressed as `$(token_config_id):$(json_path)`, where `token_config_id` \nis the ID of the token configuration used in validating the JWT, and `json_path` is a RFC 9535 \nJSONPath (https://goessner.net/articles/JsonPath/, https://www.rfc-editor.org/rfc/rfc9535.html).\nThe JSONPath expression may be in dot or bracket notation, may only specify literal keys\nor array indexes, and must return a singleton value, which will be interpreted as a string.\n",
        maxLength: 128,
        "x-auditable": true,
      }),
      type: Type.Union([Type.Literal("jwt")], { description: "The type of characteristic.", "x-auditable": true }),
    },
    { description: "Auth ID Characteristic extracted from JWT Token Claims" },
  ),
)

export const ApiShieldAuthIdCharacteristics = named(
  "api-shield_auth_id_characteristics",
  Type.Array(Type.Union([ApiShieldAuthIdCharacteristic, ApiShieldAuthIdCharacteristicJwtClaim]), {
    maxItems: 10,
    uniqueItems: true,
  }),
)

export const ApiShieldConfiguration = named(
  "api-shield_configuration",
  Type.Object({
    auth_id_characteristics: ApiShieldAuthIdCharacteristics,
  }),
)

export const ApiShieldProperties = named(
  "api-shield_properties",
  Type.Array(Type.Union([Type.Literal("auth_id_characteristics")], { "x-auditable": true }), {
    description: "Requests information about certain properties.",
    uniqueItems: true,
  }),
)

export const ApiShieldConfigurationSingleResponse = named(
  "api-shield_configuration-single-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: ApiShieldConfiguration,
  }),
)

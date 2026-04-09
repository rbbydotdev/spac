import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { ApiShieldSchemasTimestamp, ApiShieldSchemasUuid, DlpMessages } from "../shared/schemas"

export const ApiShieldPerOperationSettingChangeBase = named(
  "api-shield_per_operation_setting_change_base",
  Type.Object({
    mitigation_action: Type.Optional(
      Type.Union([Type.Literal("log"), Type.Literal("block"), Type.Literal("none"), Type.Null()], {
        description:
          'When set, this applies a mitigation action to this operation\n\n  - `"log"` - log request when request does not conform to schema for this operation\n  - `"block"` - deny access to the site when request does not conform to schema for this operation\n  - `"none"` - will skip mitigation for this operation\n  - `null` - clears any mitigation action\n',
        "x-auditable": true,
      }),
    ),
  }),
)

export const ApiShieldPerOperationSetting = named(
  "api-shield_per_operation_setting",
  Type.Object({
    mitigation_action: Type.Union([Type.Literal("log"), Type.Literal("block"), Type.Literal("none")], {
      description:
        'When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation\n\n  - `"log"` - log request when request does not conform to schema for this operation\n  - `"block"` - deny access to the site when request does not conform to schema for this operation\n  - `"none"` - will skip mitigation for this operation\n',
      "x-auditable": true,
    }),
    operation_id: ApiShieldSchemasUuid,
  }),
)

export const ApiShieldPerOperationBulkSettings = named(
  "api-shield_per_operation_bulk_settings",
  Type.Record(Type.String(), ApiShieldPerOperationSetting),
)

export const ApiShieldGlobalSettingChangeBase = named(
  "api-shield_global_setting_change_base",
  Type.Object({
    validation_default_mitigation_action: Type.Optional(
      Type.Union([Type.Literal("none"), Type.Literal("log"), Type.Literal("block")], {
        description:
          'The default mitigation action used\nMitigation actions are as follows:\n\n  - `"log"` - log request when request does not conform to schema\n  - `"block"` - deny access to the site when request does not conform to schema\n  - `"none"` - skip running schema validation\n',
        "x-auditable": true,
      }),
    ),
    validation_override_mitigation_action: Type.Optional(
      Type.Union([Type.Literal("none"), Type.Null()], {
        description:
          'When set, this overrides both zone level and operation level mitigation actions.\n\n  - `"none"` - skip running schema validation entirely for the request\n  - `null` - clears any existing override\n',
        "x-auditable": true,
      }),
    ),
  }),
)

export const ApiShieldGlobalSettings = named(
  "api-shield_global_settings",
  Type.Object({
    validation_default_mitigation_action: Type.Union(
      [Type.Literal("none"), Type.Literal("log"), Type.Literal("block")],
      {
        description:
          "The default mitigation action used\n\nMitigation actions are as follows:\n\n  - `log` - log request when request does not conform to schema\n  - `block` - deny access to the site when request does not conform to schema\n  - `none` - skip running schema validation\n",
        "x-auditable": true,
      },
    ),
    validation_override_mitigation_action: Type.Optional(
      Type.Union([Type.Literal("none")], {
        description:
          'When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema validation for the whole zone.\n\n  - `"none"` will skip running schema validation entirely for the request\n',
        "x-auditable": true,
      }),
    ),
  }),
)

export const ApiShieldSchemasPublicSchema = named(
  "api-shield_schemas-public_schema",
  Type.Object(
    {
      created_at: ApiShieldSchemasTimestamp,
      kind: Type.Union([Type.Literal("openapi_v3")], { description: "The kind of the schema", "x-auditable": true }),
      name: Type.String({ description: "A human-readable name for the schema", readOnly: true, "x-auditable": true }),
      schema_id: ApiShieldSchemasUuid,
      source: Type.String({
        description: "The raw schema, e.g., the OpenAPI schema, either as JSON or YAML",
        readOnly: true,
        "x-auditable": true,
      }),
      validation_enabled: Type.Optional(
        Type.Boolean({ description: "An indicator if this schema is enabled", "x-auditable": true }),
      ),
    },
    { description: "A schema used in schema validation" },
  ),
)

export const ApiShieldPublicSchemaSuccessResult = named(
  "api-shield_public_schema_success_result",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: ApiShieldSchemasPublicSchema,
  }),
)

export const ApiShieldSchemaHosts = named(
  "api-shield_schema_hosts",
  Type.Object({
    created_at: ApiShieldSchemasTimestamp,
    hosts: Type.Array(Type.String(), {
      description: "Hosts serving the schema, e.g zone.host.com",
      readOnly: true,
      "x-auditable": true,
    }),
    name: Type.String({ description: "Name of the schema", readOnly: true, "x-auditable": true }),
    schema_id: ApiShieldSchemasUuid,
  }),
)

import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages } from "../shared/schemas"

export const CloudConnectorProvider = named(
  "cloud-connector_provider",
  Type.Union(
    [Type.Literal("aws_s3"), Type.Literal("cloudflare_r2"), Type.Literal("gcp_storage"), Type.Literal("azure_storage")],
    { description: "Cloud Provider type", "x-auditable": true },
  ),
)

export const CloudConnectorRule = named(
  "cloud-connector_rule",
  Type.Object({
    description: Type.Optional(Type.String({ "x-auditable": true })),
    enabled: Type.Optional(Type.Boolean({ "x-auditable": true })),
    expression: Type.Optional(Type.String({ "x-auditable": true })),
    id: Type.Optional(Type.String({ "x-auditable": true })),
    parameters: Type.Optional(
      Type.Object(
        {
          host: Type.Optional(Type.String({ description: "Host to perform Cloud Connection to", "x-auditable": true })),
        },
        { description: "Parameters of Cloud Connector Rule" },
      ),
    ),
    provider: Type.Optional(CloudConnectorProvider),
  }),
)

export const CloudConnectorApiResponseCommonFailure = named(
  "cloud-connector_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const CloudConnectorRules = named(
  "cloud-connector_rules",
  Type.Array(CloudConnectorRule, { description: "List of Cloud Connector rules" }),
)

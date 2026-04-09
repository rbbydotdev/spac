import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  BillSubsApiCurrency,
  BillSubsApiSchemasFrequency,
  BillSubsApiSchemasName,
  D1Messages,
  IamResultInfo,
} from "../shared/schemas"

export const BillSubsApiDefault = named(
  "bill-subs-api_default",
  Type.Number({ description: "The default amount allocated.", "x-auditable": true }),
)

export const BillSubsApiComponentsSchemasName = named(
  "bill-subs-api_components-schemas-name",
  Type.Union(
    [
      Type.Literal("zones"),
      Type.Literal("page_rules"),
      Type.Literal("dedicated_certificates"),
      Type.Literal("dedicated_certificates_custom"),
    ],
    { description: "The unique component.", "x-auditable": true },
  ),
)

export const BillSubsApiUnitPrice = named(
  "bill-subs-api_unit_price",
  Type.Number({ description: "The unit price of the addon.", readOnly: true, "x-auditable": true }),
)

export const BillSubsApiComponentValue = named(
  "bill-subs-api_component-value",
  Type.Object({
    default: Type.Optional(BillSubsApiDefault),
    name: Type.Optional(BillSubsApiComponentsSchemasName),
    unit_price: Type.Optional(BillSubsApiUnitPrice),
  }),
)

export const BillSubsApiSchemasComponentValues = named(
  "bill-subs-api_schemas-component_values",
  Type.Array(BillSubsApiComponentValue, { description: "Array of available components values for the plan." }),
)

export const BillSubsApiDuration = named(
  "bill-subs-api_duration",
  Type.Number({ description: "The duration of the plan subscription.", "x-auditable": true }),
)

export const BillSubsApiRatePlanComponentsSchemasIdentifier = named(
  "bill-subs-api_rate-plan_components-schemas-identifier",
  Type.String({ description: "Plan identifier tag.", readOnly: true, "x-auditable": true }),
)

export const BillSubsApiRatePlan2 = named(
  "bill-subs-api_rate-plan",
  Type.Object({
    components: Type.Optional(BillSubsApiSchemasComponentValues),
    currency: Type.Optional(BillSubsApiCurrency),
    duration: Type.Optional(BillSubsApiDuration),
    frequency: Type.Optional(BillSubsApiSchemasFrequency),
    id: Type.Optional(BillSubsApiRatePlanComponentsSchemasIdentifier),
    name: Type.Optional(BillSubsApiSchemasName),
  }),
)

export const BillSubsApiSchemasRatePlan = named("bill-subs-api_schemas-rate-plan", BillSubsApiRatePlan2)

export const BillSubsApiPlanResponseCollection = named(
  "bill-subs-api_plan_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(BillSubsApiSchemasRatePlan), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: Type.Optional(IamResultInfo),
  }),
)

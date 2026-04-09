import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  BillSubsApiCurrency,
  BillSubsApiSchemasFrequency,
  BillSubsApiSchemasName,
  PageShieldId,
} from "../shared/schemas"

export const BillSubsApiSchemasPrice = named(
  "bill-subs-api_schemas-price",
  Type.Number({ description: "The amount you will be billed for this plan.", "x-auditable": true }),
)

export const BillSubsApiLegacyId = named(
  "bill-subs-api_legacy_id",
  Type.String({
    description: "The legacy identifier for this rate plan, if any.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const BillSubsApiLegacyDiscount = named(
  "bill-subs-api_legacy_discount",
  Type.Boolean({
    description: "Indicates whether this plan has a legacy discount applied.",
    default: false,
    "x-auditable": true,
  }),
)

export const BillSubsApiIsSubscribed = named(
  "bill-subs-api_is_subscribed",
  Type.Boolean({
    description: "Indicates whether you are currently subscribed to this plan.",
    default: false,
    "x-auditable": true,
  }),
)

export const BillSubsApiExternallyManaged = named(
  "bill-subs-api_externally_managed",
  Type.Boolean({
    description: "Indicates whether this plan is managed externally.",
    default: false,
    "x-auditable": true,
  }),
)

export const BillSubsApiCanSubscribe = named(
  "bill-subs-api_can_subscribe",
  Type.Boolean({
    description: "Indicates whether you can subscribe to this plan.",
    default: false,
    "x-auditable": true,
  }),
)

export const BillSubsApiAvailableRatePlan = named(
  "bill-subs-api_available-rate-plan",
  Type.Object({
    can_subscribe: Type.Optional(BillSubsApiCanSubscribe),
    currency: Type.Optional(BillSubsApiCurrency),
    externally_managed: Type.Optional(BillSubsApiExternallyManaged),
    frequency: Type.Optional(BillSubsApiSchemasFrequency),
    id: Type.Optional(PageShieldId),
    is_subscribed: Type.Optional(BillSubsApiIsSubscribed),
    legacy_discount: Type.Optional(BillSubsApiLegacyDiscount),
    legacy_id: Type.Optional(BillSubsApiLegacyId),
    name: Type.Optional(BillSubsApiSchemasName),
    price: Type.Optional(BillSubsApiSchemasPrice),
  }),
)

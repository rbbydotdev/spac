import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages, FirewallFilter, FirewallFiltersComponentsSchemasId, FirewallResultInfo } from "../shared/schemas"

export const FirewallFilterDeleteResponseSingle = named(
  "firewall_filter-delete-response-single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      id: FirewallFiltersComponentsSchemasId,
    }),
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const FirewallFilterResponseSingle = named(
  "firewall_filter-response-single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: FirewallFilter,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const FirewallFilterDeleteResponseCollection = named(
  "firewall_filter-delete-response-collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([
      Type.Array(
        Type.Object({
          id: Type.Optional(FirewallFiltersComponentsSchemasId),
        }),
      ),
      Type.Null(),
    ]),
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
    result_info: Type.Optional(FirewallResultInfo),
  }),
)

export const FirewallFilterResponseCollection = named(
  "firewall_filter-response-collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(FirewallFilter), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
    result_info: Type.Optional(FirewallResultInfo),
  }),
)

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  D1Messages,
  FirewallFilter,
  FirewallFiltersComponentsSchemasId,
  FirewallFiltersComponentsSchemasPaused,
  FirewallResultInfo,
} from "../shared/schemas"
import {
  FirewallFilterDeleteResponseCollection,
  FirewallFilterDeleteResponseSingle,
  FirewallFilterResponseCollection,
  FirewallFilterResponseSingle,
} from "./schemas"

export function registerFilters(api: Api) {
  api.group("/zones/{zone_id}/filters", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        paused: Type.Optional(FirewallFiltersComponentsSchemasPaused),
        expression: Type.Optional(Type.String({ description: "A case-insensitive string to find in the expression." })),
        description: Type.Optional(
          Type.String({ description: "A case-insensitive string to find in the description." }),
        ),
        ref: Type.Optional(
          Type.String({ description: "The filter ref (a short reference tag) to search for. Must be an exact match." }),
        ),
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Number of filters per page.", default: 25, minimum: 5, maximum: 100 }),
        ),
        id: Type.Optional(
          Type.String({ description: "The unique identifier of the filter.", minLength: 32, maxLength: 32 }),
        ),
      }),
      responses: {
        200: FirewallFilterResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
          result_info: Type.Optional(FirewallResultInfo),
        }),
      },
    })
      .summary("List filters")
      .description("Fetches filters in a zone. You can filter the results using several optional parameters.")
      .operationId("filters-list-filters")
      .tag("Filters")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write", "Firewall Services Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/", {
      body: Type.Array(FirewallFilter),
      responses: {
        200: FirewallFilterResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
          result_info: Type.Optional(FirewallResultInfo),
        }),
      },
    })
      .summary("Create filters")
      .description("Creates one or more filters.")
      .operationId("filters-create-filters")
      .tag("Filters")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/", {
      body: Type.Array(FirewallFilter),
      responses: {
        200: FirewallFilterResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
          result_info: Type.Optional(FirewallResultInfo),
        }),
      },
    })
      .summary("Update filters")
      .description("Updates one or more existing filters.")
      .operationId("filters-update-filters")
      .tag("Filters")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/", {
      query: Type.Object({
        id: Type.Array(FirewallFiltersComponentsSchemasId),
      }),
      responses: {
        200: FirewallFilterDeleteResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
          result_info: Type.Optional(FirewallResultInfo),
        }),
      },
    })
      .summary("Delete filters")
      .description("Deletes one or more existing filters.")
      .operationId("filters-delete-filters")
      .tag("Filters")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{filter_id}", {
      params: Type.Object({ filter_id: FirewallFiltersComponentsSchemasId }),
      responses: {
        200: FirewallFilterResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Get a filter")
      .description("Fetches the details of a filter.")
      .operationId("filters-get-a-filter")
      .tag("Filters")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write", "Firewall Services Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/{filter_id}", {
      params: Type.Object({ filter_id: FirewallFiltersComponentsSchemasId }),
      body: FirewallFilter,
      responses: {
        200: FirewallFilterResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Update a filter")
      .description("Updates an existing filter.")
      .operationId("filters-update-a-filter")
      .tag("Filters")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{filter_id}", {
      params: Type.Object({ filter_id: FirewallFiltersComponentsSchemasId }),
      responses: {
        200: FirewallFilterDeleteResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Delete a filter")
      .description("Deletes an existing filter.")
      .operationId("filters-delete-a-filter")
      .tag("Filters")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

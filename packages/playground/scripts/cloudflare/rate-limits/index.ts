import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages, FirewallAction, FirewallDescription, FirewallResultInfo } from "../shared/schemas"
import {
  FirewallBypass,
  FirewallDisabled,
  FirewallId,
  FirewallMatch,
  FirewallPeriod,
  FirewallRateLimitId,
  FirewallRatelimitResponseCollection,
  FirewallRatelimitResponseSingle,
  FirewallThreshold,
} from "./schemas"

export function registerRateLimits(api: Api) {
  api.assertVersion("3.0.3", "RateLimits")

  api.group("/zones/{zone_id}/rate_limits", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        page: Type.Optional(
          Type.Number({ description: "Defines the page number of paginated results.", default: 1, minimum: 1 }),
        ),
        per_page: Type.Optional(
          Type.Number({
            description:
              "Defines the maximum number of results per page. You can only set the value to `1` or to a multiple of 5 such as `5`, `10`, `15`, or `20`.",
            default: 20,
            minimum: 1,
            maximum: 1000,
          }),
        ),
      }),
    })
      .response(FirewallRatelimitResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
          result_info: Type.Optional(FirewallResultInfo),
        }),
      )
      .summary("List rate limits")
      .description("Fetches the rate limits for a zone.")
      .operationId("rate-limits-for-a-zone-list-rate-limits")
      .tag("Rate limits for a zone")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write", "Firewall Services Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/", {
      body: Type.Object({
        action: FirewallAction,
        match: FirewallMatch,
        period: FirewallPeriod,
        threshold: FirewallThreshold,
      }),
    })
      .response(FirewallRatelimitResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      )
      .summary("Create a rate limit")
      .description(
        "Creates a new rate limit for a zone. Refer to the object definition for a list of required attributes.",
      )
      .operationId("rate-limits-for-a-zone-create-a-rate-limit")
      .tag("Rate limits for a zone")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{rate_limit_id}", {
      params: Type.Object({ rate_limit_id: FirewallRateLimitId }),
    })
      .response(FirewallRatelimitResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      )
      .summary("Get a rate limit")
      .description("Fetches the details of a rate limit.")
      .operationId("rate-limits-for-a-zone-get-a-rate-limit")
      .tag("Rate limits for a zone")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write", "Firewall Services Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/{rate_limit_id}", {
      params: Type.Object({ rate_limit_id: FirewallRateLimitId }),
      body: Type.Object({
        action: FirewallAction,
        match: FirewallMatch,
        period: FirewallPeriod,
        threshold: FirewallThreshold,
      }),
    })
      .response(FirewallRatelimitResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      )
      .summary("Update a rate limit")
      .description("Updates an existing rate limit.")
      .operationId("rate-limits-for-a-zone-update-a-rate-limit")
      .tag("Rate limits for a zone")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{rate_limit_id}", {
      params: Type.Object({ rate_limit_id: FirewallRateLimitId }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Object({
            action: Type.Optional(FirewallAction),
            bypass: Type.Optional(FirewallBypass),
            description: Type.Optional(FirewallDescription),
            disabled: Type.Optional(FirewallDisabled),
            id: Type.Optional(FirewallId),
            match: Type.Optional(FirewallMatch),
            period: Type.Optional(FirewallPeriod),
            threshold: Type.Optional(FirewallThreshold),
          }),
          success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      )
      .summary("Delete a rate limit")
      .description("Deletes an existing rate limit.")
      .operationId("rate-limits-for-a-zone-delete-a-rate-limit")
      .tag("Rate limits for a zone")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Firewall Services Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

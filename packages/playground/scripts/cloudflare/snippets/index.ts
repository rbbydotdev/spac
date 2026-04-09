import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  SnippetsErrors,
  SnippetsMessages,
  SnippetsPage,
  SnippetsPerpage,
  SnippetsResultinfo,
  SnippetsSnippet,
  SnippetsSnippetname,
  SnippetsSnippetrules,
} from "./schemas"

export function registerSnippets(api: Api) {
  api.assertVersion("3.0.3", "Snippets")

  api.group("/zones/{zone_id}/snippets", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        page: Type.Optional(SnippetsPage),
        per_page: Type.Optional(SnippetsPerpage),
      }),
    })
      .response(
        Type.Object(
          {
            errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
            messages: SnippetsMessages,
            result: Type.Array(SnippetsSnippet, { description: "A list of snippets.", title: "Snippets" }),
            success: Type.Union([Type.Literal(true)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
            result_info: Type.Optional(SnippetsResultinfo),
          },
          { description: "A response object." },
        ),
      )
      .error(
        "4XX",
        Type.Object(
          {
            errors: SnippetsErrors,
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(false)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .error(
        "5XX",
        Type.Object(
          {
            errors: SnippetsErrors,
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(false)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .summary("List zone snippets")
      .description("Fetches all snippets belonging to the zone.")
      .operationId("listZoneSnippets")
      .tag("Zone Snippets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Snippets Write", "Snippets Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/snippet_rules", {})
      .response(
        Type.Object(
          {
            errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
            messages: SnippetsMessages,
            result: SnippetsSnippetrules,
            success: Type.Union([Type.Literal(true)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .error(
        "4XX",
        Type.Object(
          {
            errors: SnippetsErrors,
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(false)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .error(
        "5XX",
        Type.Object(
          {
            errors: SnippetsErrors,
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(false)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .summary("List zone snippet rules")
      .description("Fetches all snippet rules belonging to the zone.")
      .operationId("listZoneSnippetRules")
      .tag("Zone Snippets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Snippets Write", "Snippets Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/snippet_rules", {
      body: Type.Object(
        {
          rules: SnippetsSnippetrules,
        },
        { description: "A snippet rules object." },
      ),
    })
      .response(
        Type.Object(
          {
            errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
            messages: SnippetsMessages,
            result: SnippetsSnippetrules,
            success: Type.Union([Type.Literal(true)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .error(
        "4XX",
        Type.Object(
          {
            errors: SnippetsErrors,
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(false)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .error(
        "5XX",
        Type.Object(
          {
            errors: SnippetsErrors,
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(false)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .summary("Update zone snippet rules")
      .description("Updates all snippet rules belonging to the zone.")
      .operationId("updateZoneSnippetRules")
      .tag("Zone Snippets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Snippets Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/snippet_rules", {})
      .response(
        Type.Object(
          {
            errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
            messages: SnippetsMessages,
            result: SnippetsSnippetrules,
            success: Type.Union([Type.Literal(true)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .error(
        "4XX",
        Type.Object(
          {
            errors: SnippetsErrors,
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(false)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .error(
        "5XX",
        Type.Object(
          {
            errors: SnippetsErrors,
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(false)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .summary("Delete zone snippet rules")
      .description("Deletes all snippet rules belonging to the zone.")
      .operationId("deleteZoneSnippetRules")
      .tag("Zone Snippets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Snippets Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{snippet_name}", {
      params: Type.Object({ snippet_name: SnippetsSnippetname }),
    })
      .response(
        Type.Object(
          {
            errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
            messages: SnippetsMessages,
            result: SnippetsSnippet,
            success: Type.Union([Type.Literal(true)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .error(
        "4XX",
        Type.Object(
          {
            errors: SnippetsErrors,
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(false)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .error(
        "5XX",
        Type.Object(
          {
            errors: SnippetsErrors,
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(false)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .summary("Get a zone snippet")
      .description("Fetches a snippet belonging to the zone.")
      .operationId("getZoneSnippet")
      .tag("Zone Snippets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Snippets Write", "Snippets Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/{snippet_name}", {
      params: Type.Object({ snippet_name: SnippetsSnippetname }),
    })
      .response(
        Type.Object(
          {
            errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
            messages: SnippetsMessages,
            result: SnippetsSnippet,
            success: Type.Union([Type.Literal(true)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .error(
        "4XX",
        Type.Object(
          {
            errors: SnippetsErrors,
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(false)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .error(
        "5XX",
        Type.Object(
          {
            errors: SnippetsErrors,
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(false)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .summary("Update a zone snippet")
      .description("Creates or updates a snippet belonging to the zone.")
      .operationId("updateZoneSnippet")
      .tag("Zone Snippets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Snippets Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{snippet_name}", {
      params: Type.Object({ snippet_name: SnippetsSnippetname }),
    })
      .response(
        Type.Object(
          {
            errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(true)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .error(
        "4XX",
        Type.Object(
          {
            errors: SnippetsErrors,
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(false)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .error(
        "5XX",
        Type.Object(
          {
            errors: SnippetsErrors,
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(false)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .summary("Delete a zone snippet")
      .description("Deletes a snippet belonging to the zone.")
      .operationId("deleteZoneSnippet")
      .tag("Zone Snippets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Snippets Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{snippet_name}/content", {
      params: Type.Object({ snippet_name: SnippetsSnippetname }),
    })
      .error(
        "4XX",
        Type.Object(
          {
            errors: SnippetsErrors,
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(false)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .error(
        "5XX",
        Type.Object(
          {
            errors: SnippetsErrors,
            messages: SnippetsMessages,
            result: Type.Union([Type.Null()], { description: "A result.", "x-auditable": true }),
            success: Type.Union([Type.Literal(false)], {
              description: "Whether the API call was successful.",
              "x-auditable": true,
            }),
          },
          { description: "A response object." },
        ),
      )
      .summary("Get a zone snippet content")
      .description("Fetches the content of a snippet belonging to the zone.")
      .operationId("getZoneSnippetContent")
      .tag("Zone Snippets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Snippets Write", "Snippets Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

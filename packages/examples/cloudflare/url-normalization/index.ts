import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { RulesetsErrors, RulesetsMessages } from "../shared/schemas"
import { RulesetsUrlnormalization } from "./schemas"

export function registerUrlNormalization(api: Api) {
  api.group("/zones/{zone_id}/url_normalization", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      responses: {
        200: Type.Object(
          {
            errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
            messages: RulesetsMessages,
            result: RulesetsUrlnormalization,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          },
          { description: "A response object." },
        ),
        "4XX": Type.Object(
          {
            errors: RulesetsErrors,
            messages: RulesetsMessages,
            result: Type.Union([Type.Null()], { description: "A result." }),
            success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
          },
          { description: "A response object." },
        ),
      },
    })
      .summary("Get URL Normalization settings")
      .description("Fetches the current URL Normalization settings.")
      .operationId("getUrlNormalization")
      .tag("URL Normalization")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Response Compression Write",
        "Response Compression Read",
        "Config Settings Write",
        "Config Settings Read",
        "Dynamic URL Redirects Write",
        "Dynamic URL Redirects Read",
        "Cache Settings Write",
        "Cache Settings Read",
        "Custom Errors Write",
        "Custom Errors Read",
        "Origin Write",
        "Origin Read",
        "Managed headers Write",
        "Managed headers Read",
        "Zone Transform Rules Write",
        "Zone Transform Rules Read",
        "Mass URL Redirects Write",
        "Mass URL Redirects Read",
        "Magic Firewall Write",
        "Magic Firewall Read",
        "L4 DDoS Managed Ruleset Write",
        "L4 DDoS Managed Ruleset Read",
        "HTTP DDoS Managed Ruleset Write",
        "HTTP DDoS Managed Ruleset Read",
        "Sanitize Write",
        "Sanitize Read",
        "Transform Rules Write",
        "Transform Rules Read",
        "Select Configuration Write",
        "Select Configuration Read",
        "Bot Management Write",
        "Bot Management Read",
        "Zone WAF Write",
        "Zone WAF Read",
        "Account WAF Write",
        "Account WAF Read",
        "Account Rulesets Read",
        "Account Rulesets Write",
        "Logs Write",
        "Logs Read",
        "Logs Write",
        "Logs Read",
      ])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/", {
      body: RulesetsUrlnormalization,
      responses: {
        200: Type.Object(
          {
            errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
            messages: RulesetsMessages,
            result: RulesetsUrlnormalization,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          },
          { description: "A response object." },
        ),
        "4XX": Type.Object(
          {
            errors: RulesetsErrors,
            messages: RulesetsMessages,
            result: Type.Union([Type.Null()], { description: "A result." }),
            success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
          },
          { description: "A response object." },
        ),
      },
    })
      .summary("Update URL Normalization settings")
      .description("Updates the URL Normalization settings.")
      .operationId("updateUrlNormalization")
      .tag("URL Normalization")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Response Compression Write",
        "Config Settings Write",
        "Dynamic URL Redirects Write",
        "Cache Settings Write",
        "Custom Errors Write",
        "Origin Write",
        "Managed headers Write",
        "Zone Transform Rules Write",
        "Mass URL Redirects Write",
        "Magic Firewall Write",
        "L4 DDoS Managed Ruleset Write",
        "HTTP DDoS Managed Ruleset Write",
        "Sanitize Write",
        "Transform Rules Write",
        "Select Configuration Write",
        "Bot Management Write",
        "Zone WAF Write",
        "Account WAF Write",
        "Account Rulesets Write",
        "Logs Write",
        "Logs Write",
      ])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/", {
      responses: {
        "4XX": Type.Object(
          {
            errors: RulesetsErrors,
            messages: RulesetsMessages,
            result: Type.Union([Type.Null()], { description: "A result." }),
            success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
          },
          { description: "A response object." },
        ),
      },
    })
      .summary("Delete URL Normalization settings")
      .description("Deletes the URL Normalization settings.")
      .operationId("deleteUrlNormalization")
      .tag("URL Normalization")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Response Compression Write",
        "Config Settings Write",
        "Dynamic URL Redirects Write",
        "Cache Settings Write",
        "Custom Errors Write",
        "Origin Write",
        "Managed headers Write",
        "Zone Transform Rules Write",
        "Mass URL Redirects Write",
        "Magic Firewall Write",
        "L4 DDoS Managed Ruleset Write",
        "HTTP DDoS Managed Ruleset Write",
        "Sanitize Write",
        "Transform Rules Write",
        "Select Configuration Write",
        "Bot Management Write",
        "Zone WAF Write",
        "Account WAF Write",
        "Account Rulesets Write",
        "Logs Write",
        "Logs Write",
      ])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

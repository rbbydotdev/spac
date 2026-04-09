import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  CacheRulesApiResponseCommonFailure,
  CacheRulesEditable,
  CacheRulesModifiedOn,
  D1Messages,
} from "../shared/schemas"
import {
  ArgoConfigApiResponseCommonFailure,
  ArgoConfigApiResponseSingle,
  ArgoConfigPatch,
  CacheRulesPatch,
} from "./schemas"

export function registerArgo(api: Api) {
  api.group("/zones/{zone_id}/argo", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/smart_routing", {
      responses: {
        200: ArgoConfigApiResponseSingle,
        "4XX": ArgoConfigApiResponseCommonFailure,
      },
    })
      .summary("Get Argo Smart Routing setting")
      .description("Retrieves the value of Argo Smart Routing enablement setting.")
      .operationId("argo-smart-routing-get-argo-smart-routing-setting")
      .tag("Argo Smart Routing")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/smart_routing", {
      body: ArgoConfigPatch,
      responses: {
        200: ArgoConfigApiResponseSingle,
        "4XX": ArgoConfigApiResponseCommonFailure,
      },
    })
      .summary("Patch Argo Smart Routing setting")
      .description("Configures the value of the Argo Smart Routing enablement setting.")
      .operationId("argo-smart-routing-patch-argo-smart-routing-setting")
      .tag("Argo Smart Routing")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read", "#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/tiered_caching", {
      responses: {
        200: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              editable: CacheRulesEditable,
              id: Type.Union([Type.Literal("tiered_caching")], {
                description: "The identifier of the caching setting.",
                "x-auditable": true,
              }),
              modified_on: Type.Optional(CacheRulesModifiedOn),
              value: Type.Union([Type.Literal("on"), Type.Literal("off")], {
                description: "Value of the Tiered Cache zone setting.",
                "x-auditable": true,
              }),
            }),
          ),
        }),
        "4XX": CacheRulesApiResponseCommonFailure,
      },
    })
      .summary("Get Tiered Caching setting")
      .description(
        "Tiered Cache works by dividing Cloudflare's data centers into a hierarchy of lower-tiers and upper-tiers. If content is not cached in lower-tier data centers (generally the ones closest to a visitor), the lower-tier must ask an upper-tier to see if it has the content. If the upper-tier does not have the content, only the upper-tier can ask the origin for content. This practice improves bandwidth efficiency by limiting the number of data centers that can ask the origin for content, which reduces origin load and makes websites more cost-effective to operate. Additionally, Tiered Cache concentrates connections to origin servers so they come from a small number of data centers rather than the full set of network locations. This results in fewer open connections using server resources.",
      )
      .operationId("tiered-caching-get-tiered-caching-setting")
      .tag("Tiered Caching")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/tiered_caching", {
      body: CacheRulesPatch,
      responses: {
        200: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              editable: CacheRulesEditable,
              id: Type.Union([Type.Literal("tiered_caching")], {
                description: "The identifier of the caching setting.",
                "x-auditable": true,
              }),
              modified_on: Type.Optional(CacheRulesModifiedOn),
              value: Type.Union([Type.Literal("on"), Type.Literal("off")], {
                description: "Value of the Tiered Cache zone setting.",
                "x-auditable": true,
              }),
            }),
          ),
        }),
        "4XX": CacheRulesApiResponseCommonFailure,
      },
    })
      .summary("Patch Tiered Caching setting")
      .description(
        "Tiered Cache works by dividing Cloudflare's data centers into a hierarchy of lower-tiers and upper-tiers. If content is not cached in lower-tier data centers (generally the ones closest to a visitor), the lower-tier must ask an upper-tier to see if it has the content. If the upper-tier does not have the content, only the upper-tier can ask the origin for content. This practice improves bandwidth efficiency by limiting the number of data centers that can ask the origin for content, which reduces origin load and makes websites more cost-effective to operate. Additionally, Tiered Cache concentrates connections to origin servers so they come from a small number of data centers rather than the full set of network locations. This results in fewer open connections using server resources.",
      )
      .operationId("tiered-caching-patch-tiered-caching-setting")
      .tag("Tiered Caching")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

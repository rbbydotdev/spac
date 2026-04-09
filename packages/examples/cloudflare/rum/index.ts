import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlsIdentifier, RumApiResponseCommonFailure } from "../shared/schemas"
import {
  RumCreateRuleRequest,
  RumCreateSiteRequest,
  RumModifyRulesRequest,
  RumOrderBy,
  RumPage,
  RumPerPage,
  RumRuleIdResponseSingle,
  RumRuleIdentifier,
  RumRuleResponseSingle,
  RumRulesResponseCollection,
  RumRulesetIdentifier,
  RumSiteResponseSingle,
  RumSiteTagResponseSingle,
  RumSitesResponseCollection,
  RumUpdateSiteRequest,
} from "./schemas"

export function registerRum(api: Api) {
  api.group("/accounts/{account_id}/rum", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.post("/site_info", {
      body: RumCreateSiteRequest,
      responses: {
        200: RumSiteResponseSingle,
        "4XX": RumApiResponseCommonFailure,
      },
    })
      .summary("Create a Web Analytics site")
      .description("Creates a new Web Analytics site.")
      .operationId("web-analytics-create-site")
      .tag("Web Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/site_info/list", {
      query: Type.Object({
        per_page: Type.Optional(RumPerPage),
        page: Type.Optional(RumPage),
        order_by: Type.Optional(RumOrderBy),
      }),
      responses: {
        200: RumSitesResponseCollection,
        "4XX": RumApiResponseCommonFailure,
      },
    })
      .summary("List Web Analytics sites")
      .description("Lists all Web Analytics sites of an account.")
      .operationId("web-analytics-list-sites")
      .tag("Web Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Settings Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/site_info/{site_id}", {
      params: Type.Object({ site_id: DlsIdentifier }),
      responses: {
        200: RumSiteResponseSingle,
        "4XX": RumApiResponseCommonFailure,
      },
    })
      .summary("Get a Web Analytics site")
      .description("Retrieves a Web Analytics site.")
      .operationId("web-analytics-get-site")
      .tag("Web Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Settings Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/site_info/{site_id}", {
      params: Type.Object({ site_id: DlsIdentifier }),
      body: RumUpdateSiteRequest,
      responses: {
        200: RumSiteResponseSingle,
        "4XX": RumApiResponseCommonFailure,
      },
    })
      .summary("Update a Web Analytics site")
      .description("Updates an existing Web Analytics site.")
      .operationId("web-analytics-update-site")
      .tag("Web Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/site_info/{site_id}", {
      params: Type.Object({ site_id: DlsIdentifier }),
      responses: {
        200: RumSiteTagResponseSingle,
        "4XX": RumApiResponseCommonFailure,
      },
    })
      .summary("Delete a Web Analytics site")
      .description("Deletes an existing Web Analytics site.")
      .operationId("web-analytics-delete-site")
      .tag("Web Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/v2/{ruleset_id}/rule", {
      params: Type.Object({ ruleset_id: RumRulesetIdentifier }),
      body: RumCreateRuleRequest,
      responses: {
        200: RumRuleResponseSingle,
        "4XX": RumApiResponseCommonFailure,
      },
    })
      .summary("Create a Web Analytics rule")
      .description("Creates a new rule in a Web Analytics ruleset.")
      .operationId("web-analytics-create-rule")
      .tag("Web Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.put("/v2/{ruleset_id}/rule/{rule_id}", {
      params: Type.Object({ ruleset_id: RumRulesetIdentifier, rule_id: RumRuleIdentifier }),
      body: RumCreateRuleRequest,
      responses: {
        200: RumRuleResponseSingle,
        "4XX": RumApiResponseCommonFailure,
      },
    })
      .summary("Update a Web Analytics rule")
      .description("Updates a rule in a Web Analytics ruleset.")
      .operationId("web-analytics-update-rule")
      .tag("Web Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.delete("/v2/{ruleset_id}/rule/{rule_id}", {
      params: Type.Object({ ruleset_id: RumRulesetIdentifier, rule_id: RumRuleIdentifier }),
      responses: {
        200: RumRuleIdResponseSingle,
        "4XX": RumApiResponseCommonFailure,
      },
    })
      .summary("Delete a Web Analytics rule")
      .description("Deletes an existing rule from a Web Analytics ruleset.")
      .operationId("web-analytics-delete-rule")
      .tag("Web Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/v2/{ruleset_id}/rules", {
      params: Type.Object({ ruleset_id: RumRulesetIdentifier }),
      responses: {
        200: RumRulesResponseCollection,
        "4XX": RumApiResponseCommonFailure,
      },
    })
      .summary("List rules in Web Analytics ruleset")
      .description("Lists all the rules in a Web Analytics ruleset.")
      .operationId("web-analytics-list-rules")
      .tag("Web Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/v2/{ruleset_id}/rules", {
      params: Type.Object({ ruleset_id: RumRulesetIdentifier }),
      body: RumModifyRulesRequest,
      responses: {
        200: RumRulesResponseCollection,
        "4XX": RumApiResponseCommonFailure,
      },
    })
      .summary("Update Web Analytics rules")
      .description("Modifies one or more rules in a Web Analytics ruleset with a single request.")
      .operationId("web-analytics-modify-rules")
      .tag("Web Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Account Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })
  })
}

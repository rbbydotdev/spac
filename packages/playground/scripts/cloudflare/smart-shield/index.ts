import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  CacheRulesCacheReserveClearEndTs,
  CacheRulesCacheReserveClearStartTs,
  CacheRulesCacheReserveClearState,
  D1Messages,
  IamResultInfo,
  IntelIdentifier,
  UnnamedSchemaRef2b5e755404a4bfd7892291ce97c4968d,
} from "../shared/schemas"
import {
  SmartshieldApiResponseCommonFailure,
  SmartshieldQueryHealthcheck,
  SmartshieldResponseCollection,
  SmartshieldSingleHcIdResponse,
  SmartshieldSingleHcResponse,
  SmartshieldSmartShieldSettingsGetResponse,
  SmartshieldSmartShieldSettingsPatchBody,
  SmartshieldSmartShieldSettingsPatchResponse,
} from "./schemas"

export function registerSmartShield(api: Api) {
  api.assertVersion("3.0.3", "SmartShield")

  api.group("/zones/{zone_id}/smart_shield", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: SmartshieldSmartShieldSettingsGetResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error(500, SmartshieldApiResponseCommonFailure)
      .error(502, SmartshieldApiResponseCommonFailure)
      .error("4XX", SmartshieldApiResponseCommonFailure)
      .summary("Get Smart Shield Settings")
      .description("Retrieve Smart Shield Settings.")
      .operationId("smart-shield-get-settings")
      .tag("Smart Shield Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read", "Zone Read", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/", {
      body: SmartshieldSmartShieldSettingsPatchBody,
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: SmartshieldSmartShieldSettingsPatchResponse,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error(500, SmartshieldApiResponseCommonFailure)
      .error(502, SmartshieldApiResponseCommonFailure)
      .error("4XX", SmartshieldApiResponseCommonFailure)
      .summary("Patch Smart Shield Settings")
      .description("Set Smart Shield Settings.")
      .operationId("smart-shield-patch-settings")
      .tag("Smart Shield Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read", "#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/cache_reserve_clear", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Object(
            {
              id: UnnamedSchemaRef2b5e755404a4bfd7892291ce97c4968d,
              modified_on: Type.Optional(
                Type.Union([
                  Type.String({
                    description: "Last time this setting was modified.",
                    format: "date-time",
                    readOnly: true,
                    "x-auditable": true,
                  }),
                  Type.Null(),
                ]),
              ),
              end_ts: Type.Optional(CacheRulesCacheReserveClearEndTs),
              start_ts: CacheRulesCacheReserveClearStartTs,
              state: CacheRulesCacheReserveClearState,
            },
            {
              description:
                "You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.",
            },
          ),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", SmartshieldApiResponseCommonFailure)
      .summary("Get Cache Reserve Clear")
      .description(
        "You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.",
      )
      .operationId("smart-shield-settings-get-cache-reserve-clear")
      .tag("Cache Reserve Clear")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read", "Zone Read", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/cache_reserve_clear", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Object(
            {
              id: UnnamedSchemaRef2b5e755404a4bfd7892291ce97c4968d,
              modified_on: Type.Optional(
                Type.Union([
                  Type.String({
                    description: "Last time this setting was modified.",
                    format: "date-time",
                    readOnly: true,
                    "x-auditable": true,
                  }),
                  Type.Null(),
                ]),
              ),
              end_ts: Type.Optional(CacheRulesCacheReserveClearEndTs),
              start_ts: CacheRulesCacheReserveClearStartTs,
              state: CacheRulesCacheReserveClearState,
            },
            {
              description:
                "You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.",
            },
          ),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        }),
      )
      .error("4XX", SmartshieldApiResponseCommonFailure)
      .summary("Start Cache Reserve Clear")
      .description(
        "You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.",
      )
      .operationId("smart-shield-settings-start-cache-reserve-clear")
      .tag("Cache Reserve Clear")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/healthchecks", {
      query: Type.Object({
        page: Type.Optional(Type.Number({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Number({ default: 25, minimum: 5, maximum: 1000 })),
      }),
    })
      .response(SmartshieldResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IamResultInfo),
        }),
      )
      .summary("List Health Checks")
      .description("List configured health checks.")
      .operationId("smart-shield-list-health-checks")
      .tag("Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Health Checks Write", "Health Checks Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.post("/healthchecks", {
      body: SmartshieldQueryHealthcheck,
    })
      .response(SmartshieldSingleHcResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      )
      .summary("Create Health Check")
      .description("Create a new health check.")
      .operationId("smart-shield-create-health-check")
      .tag("Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Health Checks Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/healthchecks/{healthcheck_id}", {
      params: Type.Object({ healthcheck_id: IntelIdentifier }),
    })
      .response(SmartshieldSingleHcResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      )
      .summary("Health Check Details")
      .description("Fetch a single configured health check.")
      .operationId("smart-shield-health-check-details")
      .tag("Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Health Checks Write", "Health Checks Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.put("/healthchecks/{healthcheck_id}", {
      params: Type.Object({ healthcheck_id: IntelIdentifier }),
      body: SmartshieldSingleHcResponse,
    })
      .response(SmartshieldSingleHcResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      )
      .summary("Update Health Check")
      .description("Update a configured health check.")
      .operationId("smart-shield-update-health-check")
      .tag("Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Health Checks Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.patch("/healthchecks/{healthcheck_id}", {
      params: Type.Object({ healthcheck_id: IntelIdentifier }),
      body: SmartshieldQueryHealthcheck,
    })
      .response(SmartshieldSingleHcResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      )
      .summary("Patch Health Check")
      .description("Patch a configured health check.")
      .operationId("smart-shield-patch-health-check")
      .tag("Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Health Checks Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.delete("/healthchecks/{healthcheck_id}", {
      params: Type.Object({ healthcheck_id: IntelIdentifier }),
    })
      .response(SmartshieldSingleHcIdResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      )
      .summary("Delete Health Check")
      .description("Delete a health check.")
      .operationId("smart-shield-delete-health-check")
      .tag("Health Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Health Checks Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })
  })
}

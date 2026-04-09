import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages } from "../shared/schemas"
import {
  BotManagementBmSubscriptionConfig,
  BotManagementBotFightModeConfig,
  BotManagementBotManagementResponseBody,
  BotManagementConfigSingle,
  BotManagementSbfmDefinitelyConfig,
  BotManagementSbfmLikelyConfig,
} from "./schemas"

export function registerBotManagement(api: Api) {
  api.assertVersion("3.0.3", "BotManagement")

  api.group("/zones/{zone_id}/bot_management", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {})
      .response(BotManagementBotManagementResponseBody)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([
            BotManagementBotFightModeConfig,
            BotManagementSbfmDefinitelyConfig,
            BotManagementSbfmLikelyConfig,
            BotManagementBmSubscriptionConfig,
          ]),
        }),
      )
      .summary("Get Zone Bot Management Config")
      .description("Retrieve a zone's Bot Management Config")
      .operationId("bot-management-for-a-zone-get-config")
      .tag("Bot Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Bot Management Write", "Bot Management Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/", {
      body: BotManagementConfigSingle,
    })
      .response(BotManagementBotManagementResponseBody)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([
            BotManagementBotFightModeConfig,
            BotManagementSbfmDefinitelyConfig,
            BotManagementSbfmLikelyConfig,
            BotManagementBmSubscriptionConfig,
          ]),
        }),
      )
      .summary("Update Zone Bot Management Config")
      .description(
        'Updates the Bot Management configuration for a zone.\n\nThis API is used to update:\n- **Bot Fight Mode**\n- **Super Bot Fight Mode**\n- **Bot Management for Enterprise**\n\nSee [Bot Plans](https://developers.cloudflare.com/bots/plans/) for more information on the different plans \n\\\nIf you recently upgraded or downgraded your plan, refer to the following examples to clean up old configurations. \nCopy and paste the example body to remove old zone configurations based on your current plan.\n#### Clean up configuration for Bot Fight Mode plan\n```json\n{\n  "sbfm_likely_automated": "allow", \n  "sbfm_definitely_automated": "allow", \n  "sbfm_verified_bots": "allow", \n  "sbfm_static_resource_protection": false, \n  "optimize_wordpress": false, \n  "suppress_session_score": false\n}\n```\n#### Clean up configuration for SBFM Pro plan\n```json\n{\n  "sbfm_likely_automated": "allow", \n  "fight_mode": false \n}\n```\n#### Clean up configuration for SBFM Biz plan\n```json\n{\n  "fight_mode": false\n}\n```\n#### Clean up configuration for BM Enterprise Subscription plan\nIt is strongly recommended that you ensure you have [custom rules](https://developers.cloudflare.com/waf/custom-rules/) in place to protect your zone before disabling the SBFM rules. Without these protections, your zone is vulnerable to attacks.\n```json\n{\n  "sbfm_likely_automated": "allow", \n  "sbfm_definitely_automated": "allow", \n  "sbfm_verified_bots": "allow", \n  "sbfm_static_resource_protection": false, \n  "optimize_wordpress": false, \n  "fight_mode": false\n}\n```\n',
      )
      .operationId("bot-management-for-a-zone-update-config")
      .tag("Bot Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Bot Management Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

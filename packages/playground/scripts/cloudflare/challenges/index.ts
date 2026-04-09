import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages } from "../shared/schemas"
import {
  TurnstileApiResponseCommonFailure,
  TurnstileBotFightMode,
  TurnstileClearanceLevel,
  TurnstileDomains,
  TurnstileEphemeralId,
  TurnstileInvalidateImmediately,
  TurnstileName,
  TurnstileOfflabel,
  TurnstileRegion,
  TurnstileResultInfo,
  TurnstileSitekey,
  TurnstileWidgetDetail,
  TurnstileWidgetList,
  TurnstileWidgetMode,
} from "./schemas"

export function registerChallenges(api: Api) {
  api.assertVersion("3.0.3", "Challenges")

  api.group(
    "/accounts/{account_id}/challenges/widgets",
    { params: Type.Object({ account_id: Type.String() }) },
    (g) => {
      g.get("/", {
        query: Type.Object({
          page: Type.Optional(
            Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 }),
          ),
          per_page: Type.Optional(
            Type.Number({ description: "Number of items per page.", default: 25, minimum: 5, maximum: 1000 }),
          ),
          order: Type.Optional(
            Type.Union(
              [
                Type.Literal("id"),
                Type.Literal("sitekey"),
                Type.Literal("name"),
                Type.Literal("created_on"),
                Type.Literal("modified_on"),
              ],
              { description: "Field to order widgets by." },
            ),
          ),
          direction: Type.Optional(
            Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Direction to order widgets." }),
          ),
        }),
      })
        .response(
          Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            success: Type.Boolean({ description: "Whether the API call was successful" }),
            result_info: Type.Optional(TurnstileResultInfo),
            result: Type.Optional(Type.Array(TurnstileWidgetList)),
          }),
        )
        .error("4XX", TurnstileApiResponseCommonFailure)
        .summary("List Turnstile Widgets")
        .description("Lists all turnstile widgets of an account.")
        .operationId("accounts-turnstile-widgets-list")
        .tag("Turnstile")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Turnstile Sites Write",
          "Turnstile Sites Read",
          "Account Settings Write",
          "Account Settings Read",
        ])

      g.post("/", {
        query: Type.Object({
          page: Type.Optional(
            Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 }),
          ),
          per_page: Type.Optional(
            Type.Number({ description: "Number of items per page.", default: 25, minimum: 5, maximum: 1000 }),
          ),
          order: Type.Optional(
            Type.Union(
              [
                Type.Literal("id"),
                Type.Literal("sitekey"),
                Type.Literal("name"),
                Type.Literal("created_on"),
                Type.Literal("modified_on"),
              ],
              { description: "Field to order widgets by." },
            ),
          ),
          direction: Type.Optional(
            Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Direction to order widgets." }),
          ),
        }),
        body: Type.Object({
          bot_fight_mode: Type.Optional(TurnstileBotFightMode),
          clearance_level: Type.Optional(TurnstileClearanceLevel),
          domains: TurnstileDomains,
          ephemeral_id: Type.Optional(TurnstileEphemeralId),
          mode: TurnstileWidgetMode,
          name: TurnstileName,
          offlabel: Type.Optional(TurnstileOfflabel),
          region: Type.Optional(TurnstileRegion),
        }),
      })
        .response(
          Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            success: Type.Boolean({ description: "Whether the API call was successful" }),
            result_info: Type.Optional(TurnstileResultInfo),
            result: Type.Optional(TurnstileWidgetDetail),
          }),
        )
        .error("4XX", TurnstileApiResponseCommonFailure)
        .summary("Create a Turnstile Widget")
        .description("Lists challenge widgets.")
        .operationId("accounts-turnstile-widget-create")
        .tag("Turnstile")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Turnstile Sites Write", "Account Settings Write"])

      g.get("/{sitekey}", {
        params: Type.Object({ sitekey: TurnstileSitekey }),
      })
        .response(
          Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            success: Type.Boolean({ description: "Whether the API call was successful" }),
            result: Type.Optional(TurnstileWidgetDetail),
          }),
        )
        .error("4XX", TurnstileApiResponseCommonFailure)
        .summary("Turnstile Widget Details")
        .description("Show a single challenge widget configuration.")
        .operationId("accounts-turnstile-widget-get")
        .tag("Turnstile")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Turnstile Sites Write",
          "Turnstile Sites Read",
          "Account Settings Write",
          "Account Settings Read",
        ])

      g.put("/{sitekey}", {
        params: Type.Object({ sitekey: TurnstileSitekey }),
        body: Type.Object({
          bot_fight_mode: Type.Optional(TurnstileBotFightMode),
          clearance_level: Type.Optional(TurnstileClearanceLevel),
          domains: TurnstileDomains,
          ephemeral_id: Type.Optional(TurnstileEphemeralId),
          mode: TurnstileWidgetMode,
          name: TurnstileName,
          offlabel: Type.Optional(TurnstileOfflabel),
          region: Type.Optional(TurnstileRegion),
        }),
      })
        .response(
          Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            success: Type.Boolean({ description: "Whether the API call was successful" }),
            result: Type.Optional(TurnstileWidgetDetail),
          }),
        )
        .error("4XX", TurnstileApiResponseCommonFailure)
        .summary("Update a Turnstile Widget")
        .description("Update the configuration of a widget.")
        .operationId("accounts-turnstile-widget-update")
        .tag("Turnstile")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Turnstile Sites Write", "Account Settings Write"])

      g.delete("/{sitekey}", {
        params: Type.Object({ sitekey: TurnstileSitekey }),
      })
        .response(
          Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            success: Type.Boolean({ description: "Whether the API call was successful" }),
            result: Type.Optional(TurnstileWidgetDetail),
          }),
        )
        .error("4XX", TurnstileApiResponseCommonFailure)
        .summary("Delete a Turnstile Widget")
        .description("Destroy a Turnstile Widget.")
        .operationId("accounts-turnstile-widget-delete")
        .tag("Turnstile")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Turnstile Sites Write", "Account Settings Write"])

      g.post("/{sitekey}/rotate_secret", {
        params: Type.Object({ sitekey: TurnstileSitekey }),
        body: Type.Object({
          invalidate_immediately: Type.Optional(TurnstileInvalidateImmediately),
        }),
      })
        .response(
          Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            success: Type.Boolean({ description: "Whether the API call was successful" }),
            result: Type.Optional(TurnstileWidgetDetail),
          }),
        )
        .error("4XX", TurnstileApiResponseCommonFailure)
        .summary("Rotate Secret for a Turnstile Widget")
        .description(
          "Generate a new secret key for this widget. If `invalidate_immediately`\nis set to `false`, the previous secret remains valid for 2 hours.\n\nNote that secrets cannot be rotated again during the grace period.\n",
        )
        .operationId("accounts-turnstile-widget-rotate-secret")
        .tag("Turnstile")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Turnstile Sites Write", "Account Settings Write"])
    },
  )
}

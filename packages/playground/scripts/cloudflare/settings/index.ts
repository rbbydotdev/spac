import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  CacheApiResponseCommonFailure,
  CacheApiResponseSingleId,
  CacheRulesApiResponseCommonFailure,
  CacheRulesEditable,
  CacheRulesModifiedOn,
  D1Messages,
  DlpMessages,
  RumApiResponseCommonFailure,
} from "../shared/schemas"
import {
  CacheRulesAegisValue,
  CacheRulesOriginH2MaxStreamsResponseValue,
  CacheRulesOriginH2MaxStreamsValue,
  CacheRulesOriginMaxHttpVersionValue,
  CacheSchemasPatch,
  OriginMaxHttpVersion,
  RumRumSiteResponseSingle,
  RumToggleRumRequest,
  SpeedApiResponseCommonFailure,
  SpeedCloudflareFonts,
  SpeedCloudflareFontsValue,
  SpeedCloudflareSpeedBrainResponse,
  ZarazApiResponseCommonFailure,
  ZarazZarazConfigBody,
  ZarazZarazConfigHistoryResponse,
  ZarazZarazConfigResponse,
  ZarazZarazConfigReturn,
  ZarazZarazHistoryResponse,
  ZarazZarazWorkflow,
  ZarazZarazWorkflowResponse,
  ZonesComponentsSchemasApiResponseCommonFailure,
  ZonesMultipleSettings,
  ZonesSetting,
  ZonesSettingName,
  ZonesZoneSettingsResponseCollection,
  ZonesZoneSettingsSingleRequest,
} from "./schemas"

export function registerSettings(api: Api) {
  api.assertVersion("3.0.3", "Settings")

  api.group("/zones/{zone_id}/settings", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {})
      .response(ZonesZoneSettingsResponseCollection)
      .error("4XX", ZonesComponentsSchemasApiResponseCommonFailure)
      .summary("Get all zone settings")
      .description("Available settings for your user in relation to a zone.")
      .operationId("zone-settings-get-all-zone-settings")
      .tag("Zone Settings")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
      .extension(
        "x-stainless-deprecation-message",
        "This endpoint is deprecated. Zone settings should instead be managed individually.",
      )

    g.patch("/", {
      body: ZonesMultipleSettings,
    })
      .response(ZonesZoneSettingsResponseCollection)
      .error("4XX", ZonesComponentsSchemasApiResponseCommonFailure)
      .summary("Edit multiple zone settings")
      .description("Edit settings for a zone.")
      .operationId("zone-settings-edit-zone-settings-info")
      .tag("Zone Settings")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
      .extension(
        "x-stainless-deprecation-message",
        "This endpoint is deprecated. Zone settings should instead be managed individually.",
      )

    g.get("/aegis", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              editable: CacheRulesEditable,
              id: Type.Union([Type.Literal("aegis")], {
                description: "The identifier of the caching setting.",
                "x-auditable": true,
              }),
              modified_on: Type.Optional(CacheRulesModifiedOn),
              value: Type.Object(
                {
                  enabled: Type.Optional(
                    Type.Boolean({ description: "Whether the feature is enabled or not.", "x-auditable": true }),
                  ),
                  pool_id: Type.Optional(
                    Type.String({
                      description:
                        "Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.",
                      "x-auditable": true,
                    }),
                  ),
                },
                { description: "Value of the zone setting.", "x-auditable": true },
              ),
            }),
          ),
        }),
      )
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Get aegis setting")
      .description(
        "Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.",
      )
      .operationId("zone-cache-settings-get-aegis-setting")
      .tag("Zone Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read", "Zone Read", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.patch("/aegis", {
      body: Type.Object({
        value: CacheRulesAegisValue,
      }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              editable: CacheRulesEditable,
              id: Type.Union([Type.Literal("aegis")], {
                description: "The identifier of the caching setting.",
                "x-auditable": true,
              }),
              modified_on: Type.Optional(CacheRulesModifiedOn),
              value: Type.Object(
                {
                  enabled: Type.Optional(
                    Type.Boolean({ description: "Whether the feature is enabled or not.", "x-auditable": true }),
                  ),
                  pool_id: Type.Optional(
                    Type.String({
                      description:
                        "Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.",
                      "x-auditable": true,
                    }),
                  ),
                },
                { description: "Value of the zone setting.", "x-auditable": true },
              ),
            }),
          ),
        }),
      )
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Change aegis setting")
      .description(
        "Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.",
      )
      .operationId("zone-cache-settings-change-aegis-setting")
      .tag("Zone Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/fonts", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Boolean({ description: "Whether the API call was successful.", "x-auditable": true }),
          result: Type.Optional(SpeedCloudflareFonts),
        }),
      )
      .error("4XX", SpeedApiResponseCommonFailure)
      .summary("Get Cloudflare Fonts setting")
      .description(
        "Enhance your website's font delivery with Cloudflare Fonts. Deliver Google Hosted fonts from your own domain,\nboost performance, and enhance user privacy. Refer to the Cloudflare Fonts documentation for more information.\n",
      )
      .operationId("zone-settings-get-fonts-setting")
      .tag("Zone Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/fonts", {
      body: Type.Object({
        value: SpeedCloudflareFontsValue,
      }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Boolean({ description: "Whether the API call was successful.", "x-auditable": true }),
          result: Type.Optional(SpeedCloudflareFonts),
        }),
      )
      .error("4XX", SpeedApiResponseCommonFailure)
      .summary("Change Cloudflare Fonts setting")
      .description(
        "Enhance your website's font delivery with Cloudflare Fonts. Deliver Google Hosted fonts from your own domain,\nboost performance, and enhance user privacy. Refer to the Cloudflare Fonts documentation for more information.\n",
      )
      .operationId("zone-settings-change-fonts-setting")
      .tag("Zone Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/origin_h2_max_streams", {})
      .response(CacheRulesOriginH2MaxStreamsResponseValue)
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Get Origin H2 Max Streams Setting")
      .description(
        "Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.",
      )
      .operationId("zone-cache-settings-get-origin-h2-max-streams-setting")
      .tag("Zone Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read", "Zone Read", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/origin_h2_max_streams", {
      body: Type.Object({
        value: CacheRulesOriginH2MaxStreamsValue,
      }),
    })
      .response(CacheRulesOriginH2MaxStreamsResponseValue)
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Change Origin H2 Max Streams Setting")
      .description(
        "Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.",
      )
      .operationId("zone-cache-settings-change-origin-h2-max-streams-setting")
      .tag("Zone Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/origin_max_http_version", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(OriginMaxHttpVersion),
        }),
      )
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Get Origin Max HTTP Version Setting")
      .description(
        'Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is "2" for all plan types except Enterprise where it is "1".',
      )
      .operationId("zone-cache-settings-get-origin-max-http-version-setting")
      .tag("Zone Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read", "Zone Read", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/origin_max_http_version", {
      body: Type.Object({
        value: CacheRulesOriginMaxHttpVersionValue,
      }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(OriginMaxHttpVersion),
        }),
      )
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Change Origin Max HTTP Version Setting")
      .description(
        'Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is "2" for all plan types except Enterprise where it is "1".',
      )
      .operationId("zone-cache-settings-change-origin-max-http-version-setting")
      .tag("Zone Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/rum", {})
      .response(RumRumSiteResponseSingle)
      .error("4XX", RumApiResponseCommonFailure)
      .summary("Get RUM status for a zone")
      .description("Retrieves RUM status for a zone.")
      .operationId("web-analytics-get-rum-status")
      .tag("Web Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/rum", {
      body: RumToggleRumRequest,
    })
      .response(RumRumSiteResponseSingle)
      .error("4XX", RumApiResponseCommonFailure)
      .summary("Toggle RUM on/off for a zone")
      .description("Toggles RUM on/off for an existing zone.")
      .operationId("web-analytics-toggle-rum")
      .tag("Web Analytics")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/speed_brain", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Boolean({ description: "Whether the API call was successful.", "x-auditable": true }),
          result: Type.Optional(SpeedCloudflareSpeedBrainResponse),
        }),
      )
      .error("4XX", SpeedApiResponseCommonFailure)
      .summary("Get Cloudflare Speed Brain setting")
      .description(
        "Speed Brain lets compatible browsers speculate on content which can be prefetched or preloaded, making website\nnavigation faster. Refer to the Cloudflare Speed Brain documentation for more information.\n",
      )
      .operationId("zone-settings-get-speed-brain-setting")
      .tag("Zone Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/speed_brain", {
      body: Type.Object({
        value: Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "Whether the feature is enabled or disabled.",
        }),
      }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Boolean({ description: "Whether the API call was successful.", "x-auditable": true }),
          result: Type.Optional(SpeedCloudflareSpeedBrainResponse),
        }),
      )
      .error("4XX", SpeedApiResponseCommonFailure)
      .summary("Change Cloudflare Speed Brain setting")
      .description(
        "Speed Brain lets compatible browsers speculate on content which can be prefetched or preloaded, making website\nnavigation faster. Refer to the Cloudflare Speed Brain documentation for more information.\n",
      )
      .operationId("zone-settings-change-speed-brain-setting")
      .tag("Zone Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/ssl_automatic_mode", {})
      .response(CacheApiResponseSingleId)
      .error("4XX", CacheApiResponseCommonFailure)
      .summary("Get Automatic SSL/TLS enrollment status for the given zone")
      .description(
        "If the system is enabled, the response will include next_scheduled_scan, representing the next time this zone will be scanned and the zone's ssl/tls encryption mode is potentially upgraded by the system. If the system is disabled, next_scheduled_scan will not be present in the response body.",
      )
      .operationId("ssl-detector-automatic-mode-get-enrollment")
      .tag("Automatic SSL/TLS")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Zone Settings Write",
        "Zone Settings Read",
        "SSL and Certificates Write",
        "SSL and Certificates Read",
      ])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/ssl_automatic_mode", {
      body: CacheSchemasPatch,
    })
      .response(CacheApiResponseSingleId)
      .error("4XX", CacheApiResponseCommonFailure)
      .summary("Patch Automatic SSL/TLS Enrollment status for given zone")
      .description(
        'The automatic system is enabled when this endpoint is hit with value in the request body is set to "auto", and disabled when the request body value is set to "custom".',
      )
      .operationId("ssl-detector-automatic-mode-patch-enrollment")
      .tag("Automatic SSL/TLS")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "SSL and Certificates Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read", "#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/zaraz/config", {})
      .response(ZarazZarazConfigResponse)
      .error("4XX", ZarazApiResponseCommonFailure)
      .summary("Get Zaraz configuration")
      .description(
        "Gets latest Zaraz configuration for a zone. It can be preview or published configuration, whichever was the last updated. Secret variables values will not be included.",
      )
      .operationId("get-zones-zone_identifier-zaraz-config")
      .tag("Zaraz")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zaraz Edit", "Zaraz Read", "Zaraz Admin"])

    g.put("/zaraz/config", {
      body: ZarazZarazConfigBody,
    })
      .response(ZarazZarazConfigResponse)
      .error("4XX", ZarazApiResponseCommonFailure)
      .summary("Update Zaraz configuration")
      .description("Updates Zaraz configuration for a zone.")
      .operationId("put-zones-zone_identifier-zaraz-config")
      .tag("Zaraz")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zaraz Edit", "Zaraz Admin"])

    g.get("/zaraz/default", {})
      .response(ZarazZarazConfigResponse)
      .error("4XX", ZarazApiResponseCommonFailure)
      .summary("Get default Zaraz configuration")
      .description("Gets default Zaraz configuration for a zone.")
      .operationId("get-zones-zone_identifier-zaraz-default")
      .tag("Zaraz")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zaraz Edit", "Zaraz Read", "Zaraz Admin"])

    g.get("/zaraz/export", {})
      .response(ZarazZarazConfigReturn)
      .error("4XX", ZarazApiResponseCommonFailure)
      .summary("Export Zaraz configuration")
      .description("Exports full current published Zaraz configuration for a zone, secret variables included.")
      .operationId("get-zones-zone_identifier-zaraz-export")
      .tag("Zaraz")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zaraz Edit", "Zaraz Read", "Zaraz Admin"])

    g.get("/zaraz/history", {
      query: Type.Object({
        offset: Type.Optional(Type.Integer({ minimum: 0 })),
        limit: Type.Optional(Type.Integer({ minimum: 1 })),
        sortField: Type.Optional(
          Type.Union([
            Type.Literal("id"),
            Type.Literal("user_id"),
            Type.Literal("description"),
            Type.Literal("created_at"),
            Type.Literal("updated_at"),
          ]),
        ),
        sortOrder: Type.Optional(Type.Union([Type.Literal("DESC"), Type.Literal("ASC")])),
      }),
    })
      .response(ZarazZarazHistoryResponse)
      .error("4XX", ZarazApiResponseCommonFailure)
      .summary("List Zaraz historical configuration records")
      .description("Lists a history of published Zaraz configuration records for a zone.")
      .operationId("get-zones-zone_identifier-zaraz-history")
      .tag("Zaraz")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zaraz Edit", "Zaraz Read", "Zaraz Admin"])

    g.put("/zaraz/history", {
      body: Type.Integer({ description: "ID of the Zaraz configuration to restore.", minimum: 1 }),
    })
      .response(ZarazZarazConfigResponse)
      .error("4XX", ZarazApiResponseCommonFailure)
      .summary("Restore Zaraz historical configuration by ID")
      .description("Restores a historical published Zaraz configuration by ID for a zone.")
      .operationId("put-zones-zone_identifier-zaraz-history")
      .tag("Zaraz")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zaraz Edit", "Zaraz Admin"])

    g.get("/zaraz/history/configs", {
      query: Type.Object({
        ids: Type.Array(Type.Integer()),
      }),
    })
      .response(ZarazZarazConfigHistoryResponse)
      .error("4XX", ZarazApiResponseCommonFailure)
      .summary("Get Zaraz historical configurations by ID(s)")
      .description("Gets a history of published Zaraz configurations by ID(s) for a zone.")
      .operationId("get-zones-zone_identifier-zaraz-config-history")
      .tag("Zaraz")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zaraz Edit", "Zaraz Read", "Zaraz Admin"])

    g.post("/zaraz/publish", {
      body: Type.String({ description: "Zaraz configuration description." }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Boolean({ description: "Whether the API call was successful", "x-auditable": true }),
          result: Type.String(),
        }),
      )
      .error("4XX", ZarazApiResponseCommonFailure)
      .summary("Publish Zaraz preview configuration")
      .description("Publish current Zaraz preview configuration for a zone.")
      .operationId("post-zones-zone_identifier-zaraz-publish")
      .tag("Zaraz")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zaraz Admin"])
      .extension("x-cfPermissionsRequired", { enum: ["#zaraz:publish"] })

    g.get("/zaraz/workflow", {})
      .response(ZarazZarazWorkflowResponse)
      .error("4XX", ZarazApiResponseCommonFailure)
      .summary("Get Zaraz workflow")
      .description("Gets Zaraz workflow for a zone.")
      .operationId("get-zones-zone_identifier-zaraz-workflow")
      .tag("Zaraz")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zaraz Edit", "Zaraz Read", "Zaraz Admin"])

    g.put("/zaraz/workflow", {
      body: ZarazZarazWorkflow,
    })
      .response(ZarazZarazWorkflowResponse)
      .error("4XX", ZarazApiResponseCommonFailure)
      .summary("Update Zaraz workflow")
      .description("Updates Zaraz workflow for a zone.")
      .operationId("put-zones-zone_identifier-zaraz-workflow")
      .tag("Zaraz")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zaraz Edit", "Zaraz Admin"])

    g.get("/{setting_id}", {
      params: Type.Object({ setting_id: ZonesSettingName }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Boolean({ description: "Whether the API call was successful" }),
          result: Type.Optional(ZonesSetting),
        }),
      )
      .error("4XX", ZonesComponentsSchemasApiResponseCommonFailure)
      .summary("Get zone setting")
      .description("Fetch a single zone setting by name")
      .operationId("zone-settings-get-single-setting")
      .tag("Zone Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.patch("/{setting_id}", {
      params: Type.Object({ setting_id: ZonesSettingName }),
      body: ZonesZoneSettingsSingleRequest,
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Boolean({ description: "Whether the API call was successful" }),
          result: Type.Optional(ZonesSetting),
        }),
      )
      .error("4XX", ZonesComponentsSchemasApiResponseCommonFailure)
      .summary("Edit zone setting")
      .description("Updates a single zone setting by the identifier")
      .operationId("zone-settings-edit-single-setting")
      .tag("Zone Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })
  })
}

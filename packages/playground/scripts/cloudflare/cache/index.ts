import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  CacheRulesApiResponseCommonFailure,
  CacheRulesCacheReserveClearEndTs,
  CacheRulesCacheReserveClearStartTs,
  CacheRulesCacheReserveClearState,
  CacheRulesEditable,
  CacheRulesModifiedOn,
  D1Messages,
  UnnamedSchemaRef2b5e755404a4bfd7892291ce97c4968d,
} from "../shared/schemas"
import {
  CacheReserve,
  CacheRulesCacheReserveValue,
  CacheRulesOriginPostQuantumEncryptionValue,
  CacheRulesRegionalTieredCacheValue,
  CacheRulesSmartTieredCachePatch,
  CacheRulesVariantsValue,
  RegionalTieredCache,
  UnnamedSchemaRef669bfbb16c0913af7077c3c194fbfcd0,
  UnnamedSchemaRef9444735ca60712dbcf8afd832eb5716a,
} from "./schemas"

export function registerCache(api: Api) {
  api.assertVersion("3.0.3", "Cache")

  api.group("/zones/{zone_id}/cache", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/cache_reserve", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              editable: CacheRulesEditable,
              id: CacheReserve,
              modified_on: Type.Optional(CacheRulesModifiedOn),
              value: Type.Union([Type.Literal("on"), Type.Literal("off")], {
                description: "Value of the Cache Reserve zone setting.",
                "x-auditable": true,
              }),
            }),
          ),
        }),
      )
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Get Cache Reserve setting")
      .description(
        "Increase cache lifetimes by automatically storing all cacheable files into Cloudflare's persistent object storage buckets. Requires Cache Reserve subscription. Note: using Tiered Cache with Cache Reserve is highly recommended to reduce Reserve operations costs. See the [developer docs](https://developers.cloudflare.com/cache/about/cache-reserve) for more information.",
      )
      .operationId("zone-cache-settings-get-cache-reserve-setting")
      .tag("Zone Cache Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read", "Zone Read", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/cache_reserve", {
      body: Type.Object({
        value: CacheRulesCacheReserveValue,
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
              id: CacheReserve,
              modified_on: Type.Optional(CacheRulesModifiedOn),
              value: Type.Union([Type.Literal("on"), Type.Literal("off")], {
                description: "Value of the Cache Reserve zone setting.",
                "x-auditable": true,
              }),
            }),
          ),
        }),
      )
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Change Cache Reserve setting")
      .description(
        "Increase cache lifetimes by automatically storing all cacheable files into Cloudflare's persistent object storage buckets. Requires Cache Reserve subscription. Note: using Tiered Cache with Cache Reserve is highly recommended to reduce Reserve operations costs. See the [developer docs](https://developers.cloudflare.com/cache/about/cache-reserve) for more information.",
      )
      .operationId("zone-cache-settings-change-cache-reserve-setting")
      .tag("Zone Cache Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/cache_reserve_clear", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object(
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
          ),
        }),
      )
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Get Cache Reserve Clear")
      .description(
        "You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.",
      )
      .operationId("zone-cache-settings-get-cache-reserve-clear")
      .tag("Zone Cache Settings")
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
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object(
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
          ),
        }),
      )
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Start Cache Reserve Clear")
      .description(
        "You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.",
      )
      .operationId("zone-cache-settings-start-cache-reserve-clear")
      .tag("Zone Cache Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/origin_post_quantum_encryption", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(UnnamedSchemaRef9444735ca60712dbcf8afd832eb5716a),
        }),
      )
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Get Origin Post-Quantum Encryption setting")
      .description(
        "Instructs Cloudflare to use Post-Quantum (PQ) key agreement algorithms when connecting to your origin. Preferred instructs Cloudflare to opportunistically send a Post-Quantum keyshare in the first message to the origin (for fastest connections when the origin supports and prefers PQ), supported means that PQ algorithms are advertised but only used when requested by the origin, and off means that PQ algorithms are not advertised.",
      )
      .operationId("zone-cache-settings-get-origin-post-quantum-encryption-setting")
      .tag("Origin Post-Quantum")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read", "Zone Read", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/origin_post_quantum_encryption", {
      body: Type.Object({
        value: CacheRulesOriginPostQuantumEncryptionValue,
      }),
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(UnnamedSchemaRef9444735ca60712dbcf8afd832eb5716a),
        }),
      )
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Change Origin Post-Quantum Encryption setting")
      .description(
        "Instructs Cloudflare to use Post-Quantum (PQ) key agreement algorithms when connecting to your origin. Preferred instructs Cloudflare to opportunistically send a Post-Quantum keyshare in the first message to the origin (for fastest connections when the origin supports and prefers PQ), supported means that PQ algorithms are advertised but only used when requested by the origin, and off means that PQ algorithms are not advertised.",
      )
      .operationId("zone-cache-settings-change-origin-post-quantum-encryption-setting")
      .tag("Origin Post-Quantum")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/regional_tiered_cache", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              editable: CacheRulesEditable,
              id: RegionalTieredCache,
              modified_on: Type.Optional(CacheRulesModifiedOn),
              value: Type.Union([Type.Literal("on"), Type.Literal("off")], {
                description: "Value of the Regional Tiered Cache zone setting.",
                "x-auditable": true,
              }),
            }),
          ),
        }),
      )
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Get Regional Tiered Cache setting")
      .description(
        "Instructs Cloudflare to check a regional hub data center on the way to your upper tier. This can help improve performance for smart and custom tiered cache topologies.",
      )
      .operationId("zone-cache-settings-get-regional-tiered-cache-setting")
      .tag("Zone Cache Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read", "Zone Read", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.patch("/regional_tiered_cache", {
      body: Type.Object({
        value: CacheRulesRegionalTieredCacheValue,
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
              id: RegionalTieredCache,
              modified_on: Type.Optional(CacheRulesModifiedOn),
              value: Type.Union([Type.Literal("on"), Type.Literal("off")], {
                description: "Value of the Regional Tiered Cache zone setting.",
                "x-auditable": true,
              }),
            }),
          ),
        }),
      )
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Change Regional Tiered Cache setting")
      .description(
        "Instructs Cloudflare to check a regional hub data center on the way to your upper tier. This can help improve performance for smart and custom tiered cache topologies.",
      )
      .operationId("zone-cache-settings-change-regional-tiered-cache-setting")
      .tag("Zone Cache Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/tiered_cache_smart_topology_enable", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              editable: CacheRulesEditable,
              id: Type.Union([Type.Literal("tiered_cache_smart_topology_enable")], {
                description: "The identifier of the caching setting.",
                "x-auditable": true,
              }),
              modified_on: Type.Optional(CacheRulesModifiedOn),
              value: Type.Union([Type.Literal("on"), Type.Literal("off")], {
                description: "Value of the Smart Tiered Cache zone setting.",
                "x-auditable": true,
              }),
            }),
          ),
        }),
      )
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Get Smart Tiered Cache setting")
      .description(
        "Smart Tiered Cache dynamically selects the single closest upper tier for each of your website’s origins with no configuration required, using our in-house performance and routing data. Cloudflare collects latency data for each request to an origin, and uses the latency data to determine how well any upper-tier data center is connected with an origin. As a result, Cloudflare can select the data center with the lowest latency to be the upper-tier for an origin.",
      )
      .operationId("smart-tiered-cache-get-smart-tiered-cache-setting")
      .tag("Smart Tiered Cache")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read", "Zone Read", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/tiered_cache_smart_topology_enable", {
      body: CacheRulesSmartTieredCachePatch,
    })
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              editable: CacheRulesEditable,
              id: Type.Union([Type.Literal("tiered_cache_smart_topology_enable")], {
                description: "The identifier of the caching setting.",
                "x-auditable": true,
              }),
              modified_on: Type.Optional(CacheRulesModifiedOn),
              value: Type.Union([Type.Literal("on"), Type.Literal("off")], {
                description: "Value of the Smart Tiered Cache zone setting.",
                "x-auditable": true,
              }),
            }),
          ),
        }),
      )
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Patch Smart Tiered Cache setting")
      .description(
        "Smart Tiered Cache dynamically selects the single closest upper tier for each of your website’s origins with no configuration required, using our in-house performance and routing data. Cloudflare collects latency data for each request to an origin, and uses the latency data to determine how well any upper-tier data center is connected with an origin. As a result, Cloudflare can select the data center with the lowest latency to be the upper-tier for an origin.",
      )
      .operationId("smart-tiered-cache-patch-smart-tiered-cache-setting")
      .tag("Smart Tiered Cache")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read", "#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/tiered_cache_smart_topology_enable", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              editable: CacheRulesEditable,
              id: Type.Union([Type.Literal("tiered_cache_smart_topology_enable")], {
                description: "The identifier of the caching setting.",
                "x-auditable": true,
              }),
              modified_on: Type.Optional(CacheRulesModifiedOn),
            }),
          ),
        }),
      )
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Delete Smart Tiered Cache setting")
      .description(
        "Smart Tiered Cache dynamically selects the single closest upper tier for each of your website’s origins with no configuration required, using our in-house performance and routing data. Cloudflare collects latency data for each request to an origin, and uses the latency data to determine how well any upper-tier data center is connected with an origin. As a result, Cloudflare can select the data center with the lowest latency to be the upper-tier for an origin.",
      )
      .operationId("smart-tiered-cache-delete-smart-tiered-cache-setting")
      .tag("Smart Tiered Cache")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/variants", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              editable: CacheRulesEditable,
              id: UnnamedSchemaRef669bfbb16c0913af7077c3c194fbfcd0,
              modified_on: Type.Optional(CacheRulesModifiedOn),
              value: Type.Object(
                {
                  avif: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for avif.",
                      uniqueItems: true,
                    }),
                  ),
                  bmp: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for bmp.",
                      uniqueItems: true,
                    }),
                  ),
                  gif: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for gif.",
                      uniqueItems: true,
                    }),
                  ),
                  jp2: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for jp2.",
                      uniqueItems: true,
                    }),
                  ),
                  jpeg: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for jpeg.",
                      uniqueItems: true,
                    }),
                  ),
                  jpg: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for jpg.",
                      uniqueItems: true,
                    }),
                  ),
                  jpg2: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for jpg2.",
                      uniqueItems: true,
                    }),
                  ),
                  png: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for png.",
                      uniqueItems: true,
                    }),
                  ),
                  tif: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for tif.",
                      uniqueItems: true,
                    }),
                  ),
                  tiff: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for tiff.",
                      uniqueItems: true,
                    }),
                  ),
                  webp: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for webp.",
                      uniqueItems: true,
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
      .summary("Get variants setting")
      .description(
        "Variant support enables caching variants of images with certain file extensions in addition to the original. This only applies when the origin server sends the 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but does not serve the variant requested, the response will not be cached. This will be indicated with BYPASS cache status in the response headers.",
      )
      .operationId("zone-cache-settings-get-variants-setting")
      .tag("Zone Cache Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read", "Zone Read", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.patch("/variants", {
      body: Type.Object({
        value: CacheRulesVariantsValue,
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
              id: UnnamedSchemaRef669bfbb16c0913af7077c3c194fbfcd0,
              modified_on: Type.Optional(CacheRulesModifiedOn),
              value: Type.Object(
                {
                  avif: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for avif.",
                      uniqueItems: true,
                    }),
                  ),
                  bmp: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for bmp.",
                      uniqueItems: true,
                    }),
                  ),
                  gif: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for gif.",
                      uniqueItems: true,
                    }),
                  ),
                  jp2: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for jp2.",
                      uniqueItems: true,
                    }),
                  ),
                  jpeg: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for jpeg.",
                      uniqueItems: true,
                    }),
                  ),
                  jpg: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for jpg.",
                      uniqueItems: true,
                    }),
                  ),
                  jpg2: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for jpg2.",
                      uniqueItems: true,
                    }),
                  ),
                  png: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for png.",
                      uniqueItems: true,
                    }),
                  ),
                  tif: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for tif.",
                      uniqueItems: true,
                    }),
                  ),
                  tiff: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for tiff.",
                      uniqueItems: true,
                    }),
                  ),
                  webp: Type.Optional(
                    Type.Array(Type.String({ "x-auditable": true }), {
                      description:
                        "List of strings with the MIME types of all the variants that should be served for webp.",
                      uniqueItems: true,
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
      .summary("Change variants setting")
      .description(
        "Variant support enables caching variants of images with certain file extensions in addition to the original. This only applies when the origin server sends the 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but does not serve the variant requested, the response will not be cached. This will be indicated with BYPASS cache status in the response headers.",
      )
      .operationId("zone-cache-settings-change-variants-setting")
      .tag("Zone Cache Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.delete("/variants", {})
      .response(
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              editable: CacheRulesEditable,
              id: UnnamedSchemaRef669bfbb16c0913af7077c3c194fbfcd0,
              modified_on: Type.Optional(CacheRulesModifiedOn),
            }),
          ),
        }),
      )
      .error("4XX", CacheRulesApiResponseCommonFailure)
      .summary("Delete variants setting")
      .description(
        "Variant support enables caching variants of images with certain file extensions in addition to the original. This only applies when the origin server sends the 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but does not serve the variant requested, the response will not be cached. This will be indicated with BYPASS cache status in the response headers.",
      )
      .operationId("zone-cache-settings-delete-variants-setting")
      .tag("Zone Cache Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })
  })
}

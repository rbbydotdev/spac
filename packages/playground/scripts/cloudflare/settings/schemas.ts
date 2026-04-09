import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { CacheRulesEditable, CacheRulesModifiedOn, D1Messages, DlpMessages } from "../shared/schemas"

export const ZonesSslRecommenderEnabled = named(
  "zones_ssl_recommender_enabled",
  Type.Boolean({ description: "ssl-recommender enrollment setting.", default: false }),
)

export const Zones0rttValue = named(
  "zones_0rtt_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], { description: "Value of the 0-RTT setting." }),
)

export const ZonesAdvancedDdosValue = named(
  "zones_advanced_ddos_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], {
    description: "Value of the zone setting.\nNotes: Defaults to on for Business+ plans",
  }),
)

export const CacheRulesAegisValue = named(
  "cache-rules_aegis_value",
  Type.Object(
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
    { description: "Value of the zone setting." },
  ),
)

export const ZonesAlwaysOnlineValue = named(
  "zones_always_online_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], { description: "Value of the zone setting." }),
)

export const ZonesWafValue = named(
  "zones_waf_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], { description: "Value of the zone setting." }),
)

export const ZonesAutomaticHttpsRewritesValue = named(
  "zones_automatic_https_rewrites_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], {
    description: "Value of the zone setting.\nNotes: Default value depends on the zone's plan level.",
  }),
)

export const ZonesIpv6Value = named(
  "zones_ipv6_value",
  Type.Union([Type.Literal("off"), Type.Literal("on")], { description: "Value of the zone setting." }),
)

export const ZonesBrowserCacheTtlValue = named(
  "zones_browser_cache_ttl_value",
  Type.Integer({
    description:
      "Value of the zone setting in seconds.\nMinimum values by plan:\n- Free: 1 second\n- Pro: 1 second\n- Business: 1 second\n- Enterprise: 1 second\nSetting a TTL of 0 is equivalent to selecting `Respect Existing Headers` and is allowed for all plans.",
    default: 14400,
    minimum: 0,
    maximum: 31536000,
  }),
)

export const ZonesCacheLevelValue = named(
  "zones_cache_level_value",
  Type.Union([Type.Literal("aggressive"), Type.Literal("basic"), Type.Literal("simplified")], {
    description: "Value of the zone setting.",
  }),
)

export const ZonesChallengeTtlValue = named(
  "zones_challenge_ttl_value",
  Type.Union(
    [
      Type.Literal(300),
      Type.Literal(900),
      Type.Literal(1800),
      Type.Literal(2700),
      Type.Literal(3600),
      Type.Literal(7200),
      Type.Literal(10800),
      Type.Literal(14400),
      Type.Literal(28800),
      Type.Literal(57600),
      Type.Literal(86400),
      Type.Literal(604800),
      Type.Literal(2592000),
      Type.Literal(31536000),
    ],
    { description: "Value of the zone setting." },
  ),
)

export const ZonesChinaNetworkEnabledValue = named(
  "zones_china_network_enabled_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], { description: "Value of the zone setting." }),
)

export const ZonesCiphersValue = named(
  "zones_ciphers_value",
  Type.Array(Type.String(), { description: "Value of the zone setting.", uniqueItems: true }),
)

export const ZonesCnameFlatteningValue = named(
  "zones_cname_flattening_value",
  Type.Union([Type.Literal("flatten_at_root"), Type.Literal("flatten_all")], {
    description: "Value of the cname flattening setting.",
    "x-stainless-deprecation-message":
      "This zone setting is deprecated; please use the DNS Settings route instead. More information at https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2025-03-21",
  }),
)

export const ZonesEdgeCacheTtlValue = named(
  "zones_edge_cache_ttl_value",
  Type.Union(
    [
      Type.Literal(30),
      Type.Literal(60),
      Type.Literal(300),
      Type.Literal(1200),
      Type.Literal(1800),
      Type.Literal(3600),
      Type.Literal(7200),
      Type.Literal(10800),
      Type.Literal(14400),
      Type.Literal(18000),
      Type.Literal(28800),
      Type.Literal(43200),
      Type.Literal(57600),
      Type.Literal(72000),
      Type.Literal(86400),
      Type.Literal(172800),
      Type.Literal(259200),
      Type.Literal(345600),
      Type.Literal(432000),
      Type.Literal(518400),
      Type.Literal(604800),
    ],
    {
      description:
        "Value of the zone setting.\nNotes: The minimum TTL available depends on the plan level of the zone. (Enterprise = 30, Business = 1800, Pro = 3600, Free = 7200)",
    },
  ),
)

export const ZonesH2PrioritizationValue = named(
  "zones_h2_prioritization_value",
  Type.Union([Type.Literal("on"), Type.Literal("off"), Type.Literal("custom")], {
    description: "Value of the zone setting.",
  }),
)

export const ZonesHttp2Value = named(
  "zones_http2_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], { description: "Value of the HTTP2 setting." }),
)

export const ZonesHttp3Value = named(
  "zones_http3_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], { description: "Value of the HTTP3 setting." }),
)

export const ZonesImageResizingValue = named(
  "zones_image_resizing_value",
  Type.Union([Type.Literal("on"), Type.Literal("off"), Type.Literal("open")], {
    description: "Whether the feature is enabled, disabled, or enabled in `open proxy` mode.",
  }),
)

export const ZonesMaxUploadValue = named(
  "zones_max_upload_value",
  Type.Union(
    [
      Type.Literal(100),
      Type.Literal(125),
      Type.Literal(150),
      Type.Literal(175),
      Type.Literal(200),
      Type.Literal(225),
      Type.Literal(250),
      Type.Literal(275),
      Type.Literal(300),
      Type.Literal(325),
      Type.Literal(350),
      Type.Literal(375),
      Type.Literal(400),
      Type.Literal(425),
      Type.Literal(450),
      Type.Literal(475),
      Type.Literal(500),
      Type.Literal(1000),
    ],
    {
      description:
        "Value of the zone setting.\nNotes: The size depends on the plan level of the zone. (Enterprise = 500, Business = 200, Pro = 100, Free = 100)",
    },
  ),
)

export const ZonesMinTlsVersionValue = named(
  "zones_min_tls_version_value",
  Type.Union([Type.Literal("1.0"), Type.Literal("1.1"), Type.Literal("1.2"), Type.Literal("1.3")], {
    description: "Value of the zone setting.",
  }),
)

export const ZonesMirageValue = named(
  "zones_mirage_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], {
    description: "Value of the zone setting.",
    "x-stainless-deprecation-message":
      "Mirage is being deprecated. More information at https://developers.cloudflare.com/speed/optimization/images/mirage/",
  }),
)

export const ZonesNelValue = named(
  "zones_nel_value",
  Type.Object(
    {
      enabled: Type.Optional(Type.Boolean({ default: false })),
    },
    { description: "Value of the zone setting." },
  ),
)

export const ZonesOpportunisticOnionValue = named(
  "zones_opportunistic_onion_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], {
    description: "Value of the zone setting.\nNotes: Default value depends on the zone's plan level.",
  }),
)

export const CacheRulesOriginH2MaxStreamsValue = named(
  "cache-rules_origin_h2_max_streams_value",
  Type.Integer({
    description: "Value of the Origin H2 Max Streams Setting.",
    minimum: 1,
    maximum: 1000,
    "x-auditable": true,
  }),
)

export const CacheRulesOriginMaxHttpVersionValue = named(
  "cache-rules_origin_max_http_version_value",
  Type.Union([Type.Literal("2"), Type.Literal("1")], {
    description: "Value of the Origin Max HTTP Version Setting.",
    "x-auditable": true,
  }),
)

export const ZonesPolishValue = named(
  "zones_polish_value",
  Type.Union([Type.Literal("off"), Type.Literal("lossless"), Type.Literal("lossy")], {
    description: "Value of the zone setting.",
  }),
)

export const ZonesPrivacyPassValue = named(
  "zones_privacy_pass_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], {
    description: "Value of the Privacy Pass v1 (deprecated) zone setting",
    "x-stainless-deprecation-message":
      "Privacy Pass v1 was deprecated in 2023. (Announcement - https://blog.cloudflare.com/privacy-pass-standard/) and (API deprecation details - https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2024-03-31)",
  }),
)

export const ZonesProxyReadTimeoutValue = named(
  "zones_proxy_read_timeout_value",
  Type.Number({ description: "Value of the zone setting.\nNotes: Value must be between 1 and 6000", default: 100 }),
)

export const ZonesPseudoIpv4Value = named(
  "zones_pseudo_ipv4_value",
  Type.Union([Type.Literal("off"), Type.Literal("add_header"), Type.Literal("overwrite_header")], {
    description: "Value of the Pseudo IPv4 setting.",
  }),
)

export const ZonesAutomaticPlatformOptimization = named(
  "zones_automatic_platform_optimization",
  Type.Object({
    cache_by_device_type: Type.Boolean({
      description:
        "Indicates whether or not [cache by device type](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/) is enabled.",
    }),
    cf: Type.Boolean({ description: "Indicates whether or not Cloudflare proxy is enabled.", default: false }),
    enabled: Type.Boolean({
      description: "Indicates whether or not Automatic Platform Optimization is enabled.",
      default: false,
    }),
    hostnames: Type.Array(Type.String({ format: "hostname" }), {
      description: "An array of hostnames where Automatic Platform Optimization for WordPress is activated.",
    }),
    wordpress: Type.Boolean({ description: "Indicates whether or not site is powered by WordPress.", default: false }),
    wp_plugin: Type.Boolean({
      description:
        "Indicates whether or not [Cloudflare for WordPress plugin](https://wordpress.org/plugins/cloudflare/) is installed.",
      default: false,
    }),
  }),
)

export const ZonesSecurityHeaderValue = named(
  "zones_security_header_value",
  Type.Object({
    strict_transport_security: Type.Optional(
      Type.Object(
        {
          enabled: Type.Optional(Type.Boolean({ description: "Whether or not strict transport security is enabled." })),
          include_subdomains: Type.Optional(
            Type.Boolean({ description: "Include all subdomains for strict transport security." }),
          ),
          max_age: Type.Optional(Type.Number({ description: "Max age in seconds of the strict transport security." })),
          nosniff: Type.Optional(
            Type.Boolean({ description: "Whether or not to include 'X-Content-Type-Options: nosniff' header." }),
          ),
          preload: Type.Optional(Type.Boolean({ description: "Enable automatic preload of the HSTS configuration." })),
        },
        { description: "Strict Transport Security." },
      ),
    ),
  }),
)

export const ZonesSecurityLevelValue = named(
  "zones_security_level_value",
  Type.Union(
    [
      Type.Literal("off"),
      Type.Literal("essentially_off"),
      Type.Literal("low"),
      Type.Literal("medium"),
      Type.Literal("high"),
      Type.Literal("under_attack"),
    ],
    { description: "Value of the zone setting." },
  ),
)

export const ZonesSslValue = named(
  "zones_ssl_value",
  Type.Union([Type.Literal("off"), Type.Literal("flexible"), Type.Literal("full"), Type.Literal("strict")], {
    description: "Value of the zone setting.\nNotes: Depends on the zone's plan level",
  }),
)

export const ZonesTls13Value = named(
  "zones_tls_1_3_value",
  Type.Union([Type.Literal("on"), Type.Literal("off"), Type.Literal("zrt")], {
    description: "Value of the zone setting.\nNotes: Default value depends on the zone's plan level.",
  }),
)

export const ZonesTlsClientAuthValue = named(
  "zones_tls_client_auth_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], { description: "value of the zone setting." }),
)

export const ZonesSettingValue = named(
  "zones_setting_value",
  Type.Union([
    Zones0rttValue,
    ZonesAdvancedDdosValue,
    CacheRulesAegisValue,
    ZonesAlwaysOnlineValue,
    ZonesWafValue,
    ZonesAutomaticHttpsRewritesValue,
    ZonesIpv6Value,
    ZonesBrowserCacheTtlValue,
    ZonesAlwaysOnlineValue,
    ZonesCacheLevelValue,
    ZonesChallengeTtlValue,
    ZonesChinaNetworkEnabledValue,
    ZonesCiphersValue,
    ZonesCnameFlatteningValue,
    ZonesWafValue,
    ZonesWafValue,
    ZonesEdgeCacheTtlValue,
    ZonesAlwaysOnlineValue,
    ZonesH2PrioritizationValue,
    ZonesWafValue,
    ZonesHttp2Value,
    ZonesHttp3Value,
    ZonesImageResizingValue,
    ZonesAlwaysOnlineValue,
    ZonesIpv6Value,
    ZonesMaxUploadValue,
    ZonesMinTlsVersionValue,
    ZonesMirageValue,
    ZonesNelValue,
    ZonesAutomaticHttpsRewritesValue,
    ZonesOpportunisticOnionValue,
    ZonesAlwaysOnlineValue,
    ZonesWafValue,
    CacheRulesOriginH2MaxStreamsValue,
    CacheRulesOriginMaxHttpVersionValue,
    ZonesPolishValue,
    ZonesWafValue,
    ZonesPrivacyPassValue,
    ZonesProxyReadTimeoutValue,
    ZonesPseudoIpv4Value,
    ZonesWafValue,
    ZonesWafValue,
    ZonesWafValue,
    ZonesAutomaticPlatformOptimization,
    ZonesSecurityHeaderValue,
    ZonesSecurityLevelValue,
    ZonesAlwaysOnlineValue,
    ZonesIpv6Value,
    ZonesWafValue,
    ZonesSslValue,
    ZonesIpv6Value,
    ZonesTls13Value,
    ZonesTlsClientAuthValue,
    ZonesWafValue,
    ZonesWafValue,
    ZonesIpv6Value,
    ZonesIpv6Value,
  ]),
)

export const ZonesZoneSettingsSingleRequest = named(
  "zones_zone_settings_single_request",
  Type.Union([
    Type.Object({
      enabled: Type.Optional(ZonesSslRecommenderEnabled),
    }),
    Type.Object({
      value: Type.Optional(ZonesSettingValue),
    }),
  ]),
)

export const ZonesSettingName = named("zones_setting_name", Type.String({ description: "Setting name" }))

export const Zones0rtt = named(
  "zones_0rtt",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("0rtt")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: Zones0rttValue,
    },
    { description: "0-RTT session resumption enabled for this zone." },
  ),
)

export const ZonesAdvancedDdos = named(
  "zones_advanced_ddos",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("advanced_ddos")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesAdvancedDdosValue,
    },
    {
      description:
        "Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is 'on' in the case of Business and Enterprise zones.",
    },
  ),
)

export const ZonesCacheRulesAegis = named(
  "zones_cache-rules_aegis",
  Type.Object(
    {
      id: Type.Union([Type.Literal("aegis")], { description: "ID of the zone setting.", "x-auditable": true }),
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
      value: Type.Optional(CacheRulesAegisValue),
    },
    {
      description:
        "Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.",
    },
  ),
)

export const ZonesAlwaysOnline = named(
  "zones_always_online",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("always_online")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesAlwaysOnlineValue,
    },
    {
      description:
        "When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive's Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.",
    },
  ),
)

export const ZonesSchemasAlwaysUseHttps = named(
  "zones_schemas-always_use_https",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("always_use_https")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesWafValue,
    },
    {
      description:
        'Reply to all requests for URLs that use "http" with a 301 redirect to the equivalent "https" URL. If you only want to redirect for a subset of requests, consider creating an "Always use HTTPS" page rule.',
    },
  ),
)

export const ZonesSchemasAutomaticHttpsRewrites = named(
  "zones_schemas-automatic_https_rewrites",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("automatic_https_rewrites")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesAutomaticHttpsRewritesValue,
    },
    { description: "Enable the Automatic HTTPS Rewrites feature for this zone." },
  ),
)

export const ZonesBrotli = named(
  "zones_brotli",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("brotli")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesIpv6Value,
    },
    {
      description:
        "When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.",
    },
  ),
)

export const ZonesSchemasBrowserCacheTtl = named(
  "zones_schemas-browser_cache_ttl",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("browser_cache_ttl")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesBrowserCacheTtlValue,
    },
    {
      description:
        "Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors' computers. Cloudflare will honor any larger times specified by your server. (https://support.cloudflare.com/hc/en-us/articles/200168276).",
    },
  ),
)

export const ZonesSchemasBrowserCheck = named(
  "zones_schemas-browser_check",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("browser_check")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesAlwaysOnlineValue,
    },
    {
      description:
        "Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page.  It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (https://support.cloudflare.com/hc/en-us/articles/200170086).",
    },
  ),
)

export const ZonesSchemasCacheLevel = named(
  "zones_schemas-cache_level",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("cache_level")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesCacheLevelValue,
    },
    {
      description:
        "Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (https://support.cloudflare.com/hc/en-us/articles/200168256).",
    },
  ),
)

export const ZonesChallengeTtl = named(
  "zones_challenge_ttl",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("challenge_ttl")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesChallengeTtlValue,
    },
    {
      description:
        "Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).",
    },
  ),
)

export const ZonesChinaNetworkEnabled = named(
  "zones_china_network_enabled",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("china_network_enabled")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesChinaNetworkEnabledValue,
    },
    { description: "Determines whether or not the china network is enabled.\n" },
  ),
)

export const ZonesCiphers = named(
  "zones_ciphers",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("ciphers")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesCiphersValue,
    },
    { description: "An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format." },
  ),
)

export const ZonesCnameFlattening = named(
  "zones_cname_flattening",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("cname_flattening")], { description: "How to flatten the cname destination." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesCnameFlatteningValue,
    },
    {
      description: "Whether or not cname flattening is on.",
      "x-stainless-deprecation-message":
        "This zone setting is deprecated; please use the DNS Settings route instead. More information at https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2025-03-21",
    },
  ),
)

export const ZonesDevelopmentMode = named(
  "zones_development_mode",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("development_mode")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesWafValue,
      time_remaining: Type.Optional(
        Type.Number({
          description:
            "Value of the zone setting.\nNotes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.",
          readOnly: true,
        }),
      ),
    },
    {
      description:
        "Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare's accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.",
    },
  ),
)

export const ZonesEarlyHints = named(
  "zones_early_hints",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("early_hints")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesWafValue,
    },
    {
      description:
        "When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.",
    },
  ),
)

export const ZonesSchemasEdgeCacheTtl = named(
  "zones_schemas-edge_cache_ttl",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("edge_cache_ttl")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesEdgeCacheTtlValue,
    },
    { description: "Time (in seconds) that a resource will be ensured to remain on Cloudflare's cache servers." },
  ),
)

export const ZonesSchemasEmailObfuscation = named(
  "zones_schemas-email_obfuscation",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("email_obfuscation")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesAlwaysOnlineValue,
    },
    {
      description:
        "Encrypt email adresses on your web page from bots, while keeping them visible to humans. (https://support.cloudflare.com/hc/en-us/articles/200170016).",
    },
  ),
)

export const ZonesH2Prioritization = named(
  "zones_h2_prioritization",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("h2_prioritization")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesH2PrioritizationValue,
    },
    {
      description:
        "HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.",
    },
  ),
)

export const ZonesHotlinkProtection = named(
  "zones_hotlink_protection",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("hotlink_protection")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesWafValue,
    },
    {
      description:
        "When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it's not another site requesting them. People will still be able to download and view images from your page, but other sites won't be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).",
    },
  ),
)

export const ZonesHttp2 = named(
  "zones_http2",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("http2")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesHttp2Value,
    },
    { description: "HTTP2 enabled for this zone." },
  ),
)

export const ZonesHttp3 = named(
  "zones_http3",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("http3")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesHttp3Value,
    },
    { description: "HTTP3 enabled for this zone." },
  ),
)

export const ZonesImageResizing = named(
  "zones_image_resizing",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("image_resizing")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesImageResizingValue,
    },
    {
      description:
        "Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare's network. Refer to the [Image Transformations documentation](https://developers.cloudflare.com/images/) for more information.",
    },
  ),
)

export const ZonesSchemasIpGeolocation = named(
  "zones_schemas-ip_geolocation",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("ip_geolocation")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesAlwaysOnlineValue,
    },
    {
      description:
        "Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (https://support.cloudflare.com/hc/en-us/articles/200168236).",
    },
  ),
)

export const ZonesIpv6 = named(
  "zones_ipv6",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("ipv6")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesIpv6Value,
    },
    {
      description:
        "Enable IPv6 on all subdomains that are Cloudflare enabled.  (https://support.cloudflare.com/hc/en-us/articles/200168586).",
    },
  ),
)

export const ZonesMaxUpload = named(
  "zones_max_upload",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("max_upload")], { description: "identifier of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesMaxUploadValue,
    },
    { description: "Maximum size of an allowable upload." },
  ),
)

export const ZonesMinTlsVersion = named(
  "zones_min_tls_version",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("min_tls_version")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesMinTlsVersionValue,
    },
    {
      description:
        "Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.",
    },
  ),
)

export const ZonesSchemasMirage = named(
  "zones_schemas-mirage",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("mirage")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesMirageValue,
    },
    {
      description:
        "Automatically optimize image loading for website visitors on mobile\ndevices. Refer to [our blog post](http://blog.cloudflare.com/mirage2-solving-mobile-speed)\nfor more information.\n",
      "x-stainless-deprecation-message":
        "Mirage is being deprecated. More information at https://developers.cloudflare.com/speed/optimization/images/mirage/",
    },
  ),
)

export const ZonesNel = named(
  "zones_nel",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("nel")], { description: "Zone setting identifier." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesNelValue,
    },
    { description: "Enable Network Error Logging reporting on your zone. (Beta) " },
  ),
)

export const ZonesSchemasOpportunisticEncryption = named(
  "zones_schemas-opportunistic_encryption",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("opportunistic_encryption")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesAutomaticHttpsRewritesValue,
    },
    { description: "Enables the Opportunistic Encryption feature for a zone." },
  ),
)

export const ZonesOpportunisticOnion = named(
  "zones_opportunistic_onion",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("opportunistic_onion")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesOpportunisticOnionValue,
    },
    {
      description:
        "Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.",
    },
  ),
)

export const ZonesOrangeToOrange = named(
  "zones_orange_to_orange",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("orange_to_orange")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesAlwaysOnlineValue,
    },
    { description: "Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare." },
  ),
)

export const ZonesSchemasOriginErrorPagePassThru = named(
  "zones_schemas-origin_error_page_pass_thru",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("origin_error_page_pass_thru")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesWafValue,
    },
    {
      description:
        "Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.",
    },
  ),
)

export const ZonesCacheRulesOriginH2MaxStreams = named(
  "zones_cache-rules_origin_h2_max_streams",
  Type.Object(
    {
      id: Type.Union([Type.Literal("origin_h2_max_streams")], {
        description: "Value of the zone setting.",
        "x-auditable": true,
      }),
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
      value: Type.Optional(CacheRulesOriginH2MaxStreamsValue),
    },
    {
      description:
        "Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.",
    },
  ),
)

export const ZonesCacheRulesOriginMaxHttpVersion = named(
  "zones_cache-rules_origin_max_http_version",
  Type.Object(
    {
      id: Type.Union([Type.Literal("origin_max_http_version")], {
        description: "Value of the zone setting.",
        "x-auditable": true,
      }),
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
      value: Type.Optional(CacheRulesOriginMaxHttpVersionValue),
    },
    {
      description:
        'Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is "2" for all plan types except Enterprise where it is "1".',
    },
  ),
)

export const ZonesSchemasPolish = named(
  "zones_schemas-polish",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("polish")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesPolishValue,
    },
    {
      description:
        "Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.",
    },
  ),
)

export const ZonesPrefetchPreload = named(
  "zones_prefetch_preload",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("prefetch_preload")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesWafValue,
    },
    {
      description:
        "Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.",
    },
  ),
)

export const ZonesPrivacyPass = named(
  "zones_privacy_pass",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("privacy_pass")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesPrivacyPassValue,
    },
    {
      description:
        "Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass).",
      "x-stainless-deprecation-message":
        "Privacy Pass v1 was deprecated in 2023. (Announcement - https://blog.cloudflare.com/privacy-pass-standard/) and (API deprecation details - https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2024-03-31)",
    },
  ),
)

export const ZonesProxyReadTimeout = named(
  "zones_proxy_read_timeout",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("proxy_read_timeout")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesProxyReadTimeoutValue,
    },
    { description: "Maximum time between two read operations from origin." },
  ),
)

export const ZonesPseudoIpv4 = named(
  "zones_pseudo_ipv4",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("pseudo_ipv4")], { description: "Value of the Pseudo IPv4 setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesPseudoIpv4Value,
    },
    { description: "The value set for the Pseudo IPv4 setting." },
  ),
)

export const ZonesReplaceInsecureJs = named(
  "zones_replace_insecure_js",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("replace_insecure_js")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesWafValue,
    },
    {
      description:
        "Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.\n",
    },
  ),
)

export const ZonesSchemasResponseBuffering = named(
  "zones_schemas-response_buffering",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("response_buffering")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesWafValue,
    },
    {
      description:
        "Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.",
    },
  ),
)

export const ZonesSchemasRocketLoader = named(
  "zones_schemas-rocket_loader",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("rocket_loader")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesWafValue,
    },
    {
      description:
        "Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site's Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page's rendering time sometimes measured as Time to First Paint (TTFP), and also the `window.onload` time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to [Understanding Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) for more information.",
    },
  ),
)

export const ZonesSchemasAutomaticPlatformOptimization = named(
  "zones_schemas-automatic_platform_optimization",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("automatic_platform_optimization")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesAutomaticPlatformOptimization,
    },
    {
      description:
        "[Automatic Platform Optimization for WordPress](https://developers.cloudflare.com/automatic-platform-optimization/) serves your WordPress site from Cloudflare's edge network and caches third-party fonts.",
    },
  ),
)

export const ZonesSecurityHeader = named(
  "zones_security_header",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("security_header")], { description: "ID of the zone's security header." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesSecurityHeaderValue,
    },
    { description: "Cloudflare security header for a zone." },
  ),
)

export const ZonesSchemasSecurityLevel = named(
  "zones_schemas-security_level",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("security_level")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesSecurityLevelValue,
    },
    {
      description:
        "Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (https://support.cloudflare.com/hc/en-us/articles/200170056).",
    },
  ),
)

export const ZonesServerSideExclude = named(
  "zones_server_side_exclude",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("server_side_exclude")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesAlwaysOnlineValue,
    },
    {
      description:
        "If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: <!--sse--><!--/sse-->. For example: <!--sse-->  Bad visitors won't see my phone number, 555-555-5555 <!--/sse-->. Note: SSE only will work with HTML. If you have HTML minification enabled, you won't see the SSE tags in your HTML source when it's served through Cloudflare. SSE will still function in this case, as Cloudflare's HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor's computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).",
    },
  ),
)

export const ZonesSha1Support = named(
  "zones_sha1_support",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("sha1_support")], { description: "Zone setting identifier." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesIpv6Value,
    },
    { description: "Allow SHA1 support." },
  ),
)

export const ZonesSchemasSortQueryStringForCache = named(
  "zones_schemas-sort_query_string_for_cache",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("sort_query_string_for_cache")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesWafValue,
    },
    {
      description:
        "Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.",
    },
  ),
)

export const ZonesSchemasSsl = named(
  "zones_schemas-ssl",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("ssl")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesSslValue,
    },
    {
      description:
        "SSL encrypts your visitor's connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server  (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don't need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full:  SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (https://support.cloudflare.com/hc/en-us/articles/200170416).",
    },
  ),
)

export const ZonesSslRecommender = named(
  "zones_ssl_recommender",
  Type.Object(
    {
      enabled: Type.Optional(ZonesSslRecommenderEnabled),
      id: Type.Optional(
        Type.Union([Type.Literal("ssl_recommender")], { description: "Enrollment value for SSL/TLS Recommender." }),
      ),
    },
    {
      description:
        "Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.",
    },
  ),
)

export const ZonesTls12Only = named(
  "zones_tls_1_2_only",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("tls_1_2_only")], { description: "Zone setting identifier." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesIpv6Value,
    },
    { description: "Only allows TLS1.2." },
  ),
)

export const ZonesTls13 = named(
  "zones_tls_1_3",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("tls_1_3")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesTls13Value,
    },
    { description: "Enables Crypto TLS 1.3 feature for a zone." },
  ),
)

export const ZonesTlsClientAuth = named(
  "zones_tls_client_auth",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("tls_client_auth")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesTlsClientAuthValue,
    },
    {
      description:
        "TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).",
    },
  ),
)

export const ZonesTransformations = named(
  "zones_transformations",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("transformations")], {
        description: "ID of the zone setting. Shared between Image Transformations and Video Transformations.",
      }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesImageResizingValue,
    },
    {
      description:
        "Media Transformations provides on-demand resizing, conversion and optimization for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.",
    },
  ),
)

export const ZonesTransformationsAllowedOriginsValue = named(
  "zones_transformations_allowed_origins_value",
  Type.String({
    description:
      "Comma-separated list of allowed origins.\nRefer to the [Image Transformations](https://developers.cloudflare.com/images/transform-images/sources/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.",
  }),
)

export const ZonesTransformationsAllowedOrigins = named(
  "zones_transformations_allowed_origins",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("transformations_allowed_origins")], {
        description: "ID of the zone setting. Shared between Image Transformations and Video Transformations.",
      }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesTransformationsAllowedOriginsValue,
    },
    {
      description:
        "Media Transformations Allowed Origins restricts transformations for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.",
    },
  ),
)

export const ZonesSchemasTrueClientIpHeader = named(
  "zones_schemas-true_client_ip_header",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("true_client_ip_header")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesWafValue,
    },
    {
      description:
        "Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.",
    },
  ),
)

export const ZonesSchemasWaf = named(
  "zones_schemas-waf",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("waf")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesWafValue,
    },
    {
      description:
        "The WAF examines HTTP requests to your website.  It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will 'challenge' the web visitor with a page that asks them to submit a CAPTCHA successfully  to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare's WAF will block any traffic identified as illegitimate before it reaches your origin web server. (https://support.cloudflare.com/hc/en-us/articles/200172016).",
    },
  ),
)

export const ZonesWebp = named(
  "zones_webp",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("webp")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesIpv6Value,
    },
    {
      description:
        "When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.",
    },
  ),
)

export const ZonesWebsockets = named(
  "zones_websockets",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        }),
      ),
      id: Type.Union([Type.Literal("websockets")], { description: "ID of the zone setting." }),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({ description: "last time this setting was modified.", format: "date-time", readOnly: true }),
          Type.Null(),
        ]),
      ),
      value: ZonesIpv6Value,
    },
    {
      description:
        "WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).",
    },
  ),
)

export const ZonesSetting = named(
  "zones_setting",
  Type.Union([
    Zones0rtt,
    ZonesAdvancedDdos,
    ZonesCacheRulesAegis,
    ZonesAlwaysOnline,
    ZonesSchemasAlwaysUseHttps,
    ZonesSchemasAutomaticHttpsRewrites,
    ZonesBrotli,
    ZonesSchemasBrowserCacheTtl,
    ZonesSchemasBrowserCheck,
    ZonesSchemasCacheLevel,
    ZonesChallengeTtl,
    ZonesChinaNetworkEnabled,
    ZonesCiphers,
    ZonesCnameFlattening,
    ZonesDevelopmentMode,
    ZonesEarlyHints,
    ZonesSchemasEdgeCacheTtl,
    ZonesSchemasEmailObfuscation,
    ZonesH2Prioritization,
    ZonesHotlinkProtection,
    ZonesHttp2,
    ZonesHttp3,
    ZonesImageResizing,
    ZonesSchemasIpGeolocation,
    ZonesIpv6,
    ZonesMaxUpload,
    ZonesMinTlsVersion,
    ZonesSchemasMirage,
    ZonesNel,
    ZonesSchemasOpportunisticEncryption,
    ZonesOpportunisticOnion,
    ZonesOrangeToOrange,
    ZonesSchemasOriginErrorPagePassThru,
    ZonesCacheRulesOriginH2MaxStreams,
    ZonesCacheRulesOriginMaxHttpVersion,
    ZonesSchemasPolish,
    ZonesPrefetchPreload,
    ZonesPrivacyPass,
    ZonesProxyReadTimeout,
    ZonesPseudoIpv4,
    ZonesReplaceInsecureJs,
    ZonesSchemasResponseBuffering,
    ZonesSchemasRocketLoader,
    ZonesSchemasAutomaticPlatformOptimization,
    ZonesSecurityHeader,
    ZonesSchemasSecurityLevel,
    ZonesServerSideExclude,
    ZonesSha1Support,
    ZonesSchemasSortQueryStringForCache,
    ZonesSchemasSsl,
    ZonesSslRecommender,
    ZonesTls12Only,
    ZonesTls13,
    ZonesTlsClientAuth,
    ZonesTransformations,
    ZonesTransformationsAllowedOrigins,
    ZonesSchemasTrueClientIpHeader,
    ZonesSchemasWaf,
    ZonesWebp,
    ZonesWebsockets,
  ]),
)

export const ZarazZarazWorkflow = named(
  "zaraz_zaraz-workflow",
  Type.Union([Type.Literal("realtime"), Type.Literal("preview")], {
    description: "Zaraz workflow",
    "x-auditable": true,
  }),
)

export const ZarazZarazWorkflowResponse = named(
  "zaraz_zaraz-workflow-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Boolean({ description: "Whether the API call was successful", "x-auditable": true }),
    result: ZarazZarazWorkflow,
  }),
)

export const UnnamedSchemaRef3caeef70a38a3ad696413c7d97d9c394 = named(
  "unnamed_schema_ref_3caeef70a38a3ad696413c7d97d9c394",
  Type.Object({
    accept_all: Type.Record(Type.String(), Type.String({ "x-auditable": true })),
    confirm_my_choices: Type.Record(Type.String(), Type.String({ "x-auditable": true })),
    reject_all: Type.Record(Type.String(), Type.String({ "x-auditable": true })),
  }),
)

export const ZarazLoadRule = named(
  "zaraz_load-rule",
  Type.Object({
    id: Type.String({ "x-auditable": true }),
    match: Type.String({ "x-auditable": true }),
    op: Type.Union(
      [
        Type.Literal("CONTAINS"),
        Type.Literal("EQUALS"),
        Type.Literal("STARTS_WITH"),
        Type.Literal("ENDS_WITH"),
        Type.Literal("MATCH_REGEX"),
        Type.Literal("NOT_MATCH_REGEX"),
        Type.Literal("GREATER_THAN"),
        Type.Literal("GREATER_THAN_OR_EQUAL"),
        Type.Literal("LESS_THAN"),
        Type.Literal("LESS_THAN_OR_EQUAL"),
      ],
      { "x-auditable": true },
    ),
    value: Type.String({ "x-auditable": true }),
  }),
)

export const ZarazClickListenerRule = named(
  "zaraz_click-listener-rule",
  Type.Object({
    action: Type.Union([Type.Literal("clickListener")], { "x-auditable": true }),
    id: Type.String({ "x-auditable": true }),
    settings: Type.Object({
      selector: Type.String({ "x-auditable": true }),
      type: Type.Union([Type.Literal("xpath"), Type.Literal("css")], { "x-auditable": true }),
      waitForTags: Type.Integer({ minimum: 0, "x-auditable": true }),
    }),
  }),
)

export const ZarazTimerRule = named(
  "zaraz_timer-rule",
  Type.Object({
    action: Type.Union([Type.Literal("timer")], { "x-auditable": true }),
    id: Type.String({ "x-auditable": true }),
    settings: Type.Object({
      interval: Type.Integer({ minimum: 50, "x-auditable": true }),
      limit: Type.Integer({ minimum: 0, "x-auditable": true }),
    }),
  }),
)

export const ZarazFormSubmissionRule = named(
  "zaraz_form-submission-rule",
  Type.Object({
    action: Type.Union([Type.Literal("formSubmission")], { "x-auditable": true }),
    id: Type.String({ "x-auditable": true }),
    settings: Type.Object({
      selector: Type.String({ "x-auditable": true }),
      validate: Type.Boolean({ "x-auditable": true }),
    }),
  }),
)

export const ZarazVariableMatchRule = named(
  "zaraz_variable-match-rule",
  Type.Object({
    action: Type.Union([Type.Literal("variableMatch")], { "x-auditable": true }),
    id: Type.String({ "x-auditable": true }),
    settings: Type.Object({
      match: Type.String({ "x-auditable": true }),
      variable: Type.String({ "x-auditable": true }),
    }),
  }),
)

export const ZarazScrollDepthRule = named(
  "zaraz_scroll-depth-rule",
  Type.Object({
    action: Type.Union([Type.Literal("scrollDepth")], { "x-auditable": true }),
    id: Type.String({ "x-auditable": true }),
    settings: Type.Object({
      positions: Type.String({ "x-auditable": true }),
    }),
  }),
)

export const ZarazElementVisibilityRule = named(
  "zaraz_element-visibility-rule",
  Type.Object({
    action: Type.Union([Type.Literal("elementVisibility")], { "x-auditable": true }),
    id: Type.String({ "x-auditable": true }),
    settings: Type.Object({
      selector: Type.String({ "x-auditable": true }),
    }),
  }),
)

export const ZarazStringVariable = named(
  "zaraz_string_variable",
  Type.Object({
    name: Type.String({ "x-auditable": true }),
    type: Type.Union([Type.Literal("string")], { "x-auditable": true }),
    value: Type.String({ "x-auditable": true }),
  }),
)

export const ZarazSecretVariable = named(
  "zaraz_secret_variable",
  Type.Object({
    name: Type.String({ "x-auditable": true }),
    type: Type.Union([Type.Literal("secret")], { "x-auditable": true }),
    value: Type.String({ "x-auditable": true, "x-sensitive": true }),
  }),
)

export const ZarazWorkerVariable = named(
  "zaraz_worker_variable",
  Type.Object({
    name: Type.String({ "x-auditable": true }),
    type: Type.Union([Type.Literal("worker")], { "x-auditable": true }),
    value: Type.Object({
      escapedWorkerName: Type.String({ "x-auditable": true }),
      workerTag: Type.String({ "x-auditable": true }),
    }),
  }),
)

export const UnnamedSchemaRef18ec213814b31f51e67a753cfb0ec3df = named(
  "unnamed_schema_ref_18ec213814b31f51e67a753cfb0ec3df",
  Type.Object({
    actionType: Type.String({ description: "Tool event type", "x-auditable": true }),
    blockingTriggers: Type.Array(Type.String({ "x-auditable": true }), {
      description: "List of blocking triggers IDs",
    }),
    data: Type.Unknown({ description: "Event payload" }),
    firingTriggers: Type.Array(Type.String({ "x-auditable": true }), {
      description: "List of firing triggers IDs",
      minItems: 1,
    }),
  }),
)

export const ZarazManagedComponent = named(
  "zaraz_managed-component",
  Type.Object({
    blockingTriggers: Type.Array(Type.String({ "x-auditable": true }), { description: "List of blocking trigger IDs" }),
    defaultFields: Type.Record(Type.String(), Type.Union([Type.String(), Type.Boolean()], { "x-auditable": true })),
    defaultPurpose: Type.Optional(Type.String({ description: "Default consent purpose ID", "x-auditable": true })),
    enabled: Type.Boolean({ description: "Whether tool is enabled", "x-auditable": true }),
    name: Type.String({ description: "Tool's name defined by the user", "x-auditable": true }),
    vendorName: Type.Optional(
      Type.String({
        description:
          "Vendor name for TCF compliant consent modal, required for Custom Managed Components and Custom HTML tool with a defaultPurpose assigned",
        "x-auditable": true,
      }),
    ),
    vendorPolicyUrl: Type.Optional(
      Type.String({
        description:
          "Vendor's Privacy Policy URL for TCF compliant consent modal, required for Custom Managed Components and Custom HTML tool with a defaultPurpose assigned",
        "x-auditable": true,
      }),
    ),
    actions: Type.Optional(Type.Record(Type.String(), UnnamedSchemaRef18ec213814b31f51e67a753cfb0ec3df)),
    component: Type.String({ description: "Tool's internal name", "x-auditable": true }),
    neoEvents: Type.Optional(
      Type.Array(UnnamedSchemaRef18ec213814b31f51e67a753cfb0ec3df, {
        description:
          "DEPRECATED - List of actions configured on a tool. Either this or actions field is required. If both are present, actions field will take precedence.",
      }),
    ),
    permissions: Type.Array(Type.String({ "x-auditable": true }), {
      description: "List of permissions granted to the component",
    }),
    settings: Type.Record(Type.String(), Type.Union([Type.String(), Type.Boolean()], { "x-auditable": true })),
    type: Type.Union([Type.Literal("component")]),
  }),
)

export const ZarazCustomManagedComponent = named(
  "zaraz_custom-managed-component",
  Type.Object(
    {
      blockingTriggers: Type.Array(Type.String({ "x-auditable": true }), {
        description: "List of blocking trigger IDs",
      }),
      defaultFields: Type.Record(Type.String(), Type.Union([Type.String(), Type.Boolean()], { "x-auditable": true })),
      defaultPurpose: Type.Optional(Type.String({ description: "Default consent purpose ID", "x-auditable": true })),
      enabled: Type.Boolean({ description: "Whether tool is enabled", "x-auditable": true }),
      name: Type.String({ description: "Tool's name defined by the user", "x-auditable": true }),
      vendorName: Type.Optional(
        Type.String({
          description:
            "Vendor name for TCF compliant consent modal, required for Custom Managed Components and Custom HTML tool with a defaultPurpose assigned",
          "x-auditable": true,
        }),
      ),
      vendorPolicyUrl: Type.Optional(
        Type.String({
          description:
            "Vendor's Privacy Policy URL for TCF compliant consent modal, required for Custom Managed Components and Custom HTML tool with a defaultPurpose assigned",
          "x-auditable": true,
        }),
      ),
      actions: Type.Optional(Type.Record(Type.String(), UnnamedSchemaRef18ec213814b31f51e67a753cfb0ec3df)),
      component: Type.String({ description: "Tool's internal name", "x-auditable": true }),
      neoEvents: Type.Optional(
        Type.Array(UnnamedSchemaRef18ec213814b31f51e67a753cfb0ec3df, {
          description:
            "DEPRECATED - List of actions configured on a tool. Either this or actions field is required. If both are present, actions field will take precedence.",
        }),
      ),
      permissions: Type.Array(Type.String({ "x-auditable": true }), {
        description: "List of permissions granted to the component",
      }),
      settings: Type.Record(Type.String(), Type.Union([Type.String(), Type.Boolean()], { "x-auditable": true })),
      type: Type.Union([Type.Literal("custom-mc")]),
      worker: Type.Object(
        {
          escapedWorkerName: Type.String({ "x-auditable": true }),
          workerTag: Type.String({ "x-auditable": true }),
        },
        { description: "Cloudflare worker that acts as a managed component" },
      ),
    },
    { "x-stainless-variantName": "worker" },
  ),
)

export const ZarazZarazConfigReturn = named(
  "zaraz_zaraz-config-return",
  Type.Object(
    {
      analytics: Type.Optional(
        Type.Object(
          {
            defaultPurpose: Type.Optional(
              Type.String({ description: "Consent purpose assigned to Monitoring.", "x-auditable": true }),
            ),
            enabled: Type.Optional(
              Type.Boolean({ description: "Whether Advanced Monitoring reports are enabled.", "x-auditable": true }),
            ),
            sessionExpTime: Type.Optional(
              Type.Integer({
                description: "Session expiration time (seconds).",
                minimum: 60,
                maximum: 86400,
                "x-auditable": true,
              }),
            ),
          },
          { description: "Cloudflare Monitoring settings." },
        ),
      ),
      consent: Type.Optional(
        Type.Object(
          {
            buttonTextTranslations: Type.Optional(UnnamedSchemaRef3caeef70a38a3ad696413c7d97d9c394),
            companyEmail: Type.Optional(Type.String({ "x-auditable": true })),
            companyName: Type.Optional(Type.String({ "x-auditable": true })),
            companyStreetAddress: Type.Optional(Type.String({ "x-auditable": true })),
            consentModalIntroHTML: Type.Optional(Type.String({ "x-auditable": true })),
            consentModalIntroHTMLWithTranslations: Type.Optional(
              Type.Record(Type.String(), Type.String({ "x-auditable": true })),
            ),
            cookieName: Type.Optional(Type.String({ "x-auditable": true })),
            customCSS: Type.Optional(Type.String({ "x-auditable": true })),
            customIntroDisclaimerDismissed: Type.Optional(Type.Boolean({ "x-auditable": true })),
            defaultLanguage: Type.Optional(Type.String({ "x-auditable": true })),
            enabled: Type.Boolean(),
            hideModal: Type.Optional(Type.Boolean({ "x-auditable": true })),
            purposes: Type.Optional(
              Type.Record(
                Type.String(),
                Type.Object({
                  description: Type.String({ "x-auditable": true }),
                  name: Type.String({ "x-auditable": true }),
                }),
              ),
            ),
            purposesWithTranslations: Type.Optional(
              Type.Record(
                Type.String(),
                Type.Object({
                  description: Type.Record(Type.String(), Type.String({ "x-auditable": true })),
                  name: Type.Record(Type.String(), Type.String({ "x-auditable": true })),
                  order: Type.Integer({ "x-auditable": true }),
                }),
              ),
            ),
            tcfCompliant: Type.Optional(Type.Boolean()),
          },
          { description: "Consent management configuration." },
        ),
      ),
      dataLayer: Type.Boolean({ description: "Data layer compatibility mode enabled.", "x-auditable": true }),
      debugKey: Type.String({ description: "The key for Zaraz debug mode.", "x-auditable": true }),
      historyChange: Type.Optional(
        Type.Boolean({ description: "Single Page Application support enabled.", "x-auditable": true }),
      ),
      settings: Type.Object(
        {
          autoInjectScript: Type.Boolean({
            description: "Automatic injection of Zaraz scripts enabled.",
            "x-auditable": true,
          }),
          contextEnricher: Type.Optional(
            Type.Object(
              {
                escapedWorkerName: Type.String({ "x-auditable": true }),
                workerTag: Type.String({ "x-auditable": true }),
              },
              { description: "Details of the worker that receives and edits Zaraz Context object." },
            ),
          ),
          cookieDomain: Type.Optional(
            Type.String({
              description: "The domain Zaraz will use for writing and reading its cookies.",
              "x-auditable": true,
            }),
          ),
          ecommerce: Type.Optional(Type.Boolean({ description: "Ecommerce API enabled.", "x-auditable": true })),
          eventsApiPath: Type.Optional(
            Type.String({ description: "Custom endpoint for server-side track events.", "x-auditable": true }),
          ),
          hideExternalReferer: Type.Optional(
            Type.Boolean({ description: "Hiding external referrer URL enabled.", "x-auditable": true }),
          ),
          hideIPAddress: Type.Optional(
            Type.Boolean({ description: "Trimming IP address enabled.", "x-auditable": true }),
          ),
          hideQueryParams: Type.Optional(
            Type.Boolean({ description: "Removing URL query params enabled.", "x-auditable": true }),
          ),
          hideUserAgent: Type.Optional(
            Type.Boolean({ description: "Removing sensitive data from User Aagent string enabled." }),
          ),
          initPath: Type.Optional(
            Type.String({ description: "Custom endpoint for Zaraz init script.", "x-auditable": true }),
          ),
          injectIframes: Type.Optional(
            Type.Boolean({ description: "Injection of Zaraz scripts into iframes enabled.", "x-auditable": true }),
          ),
          mcRootPath: Type.Optional(
            Type.String({
              description: "Custom path for Managed Components server functionalities.",
              "x-auditable": true,
            }),
          ),
          scriptPath: Type.Optional(
            Type.String({ description: "Custom endpoint for Zaraz main script.", "x-auditable": true }),
          ),
          trackPath: Type.Optional(
            Type.String({ description: "Custom endpoint for Zaraz tracking requests.", "x-auditable": true }),
          ),
        },
        { description: "General Zaraz settings." },
      ),
      triggers: Type.Record(
        Type.String(),
        Type.Object({
          description: Type.Optional(Type.String({ description: "Trigger description.", "x-auditable": true })),
          excludeRules: Type.Array(
            Type.Union([
              ZarazLoadRule,
              ZarazClickListenerRule,
              ZarazTimerRule,
              ZarazFormSubmissionRule,
              ZarazVariableMatchRule,
              ZarazScrollDepthRule,
              ZarazElementVisibilityRule,
            ]),
            { description: "Rules defining when the trigger is not fired." },
          ),
          loadRules: Type.Array(
            Type.Union([
              ZarazLoadRule,
              ZarazClickListenerRule,
              ZarazTimerRule,
              ZarazFormSubmissionRule,
              ZarazVariableMatchRule,
              ZarazScrollDepthRule,
              ZarazElementVisibilityRule,
            ]),
            { description: "Rules defining when the trigger is fired." },
          ),
          name: Type.String({ description: "Trigger name.", "x-auditable": true }),
          system: Type.Optional(Type.Union([Type.Literal("pageload")], { "x-auditable": true })),
        }),
      ),
      variables: Type.Record(
        Type.String(),
        Type.Union([ZarazStringVariable, ZarazSecretVariable, ZarazWorkerVariable]),
      ),
      zarazVersion: Type.Integer({ description: "Zaraz internal version of the config.", "x-auditable": true }),
      tools: Type.Record(Type.String(), Type.Union([ZarazManagedComponent, ZarazCustomManagedComponent])),
    },
    { description: "Zaraz configuration" },
  ),
)

export const ZarazZarazConfigHistoryResponse = named(
  "zaraz_zaraz-config-history-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Boolean({ description: "Whether the API call was successful", "x-auditable": true }),
    result: Type.Record(
      Type.String(),
      Type.Object({
        createdAt: Type.String({
          description: "Date and time the configuration was created",
          format: "date-time",
          "x-auditable": true,
        }),
        id: Type.Integer({ description: "ID of the configuration", "x-auditable": true }),
        updatedAt: Type.String({
          description: "Date and time the configuration was last updated",
          format: "date-time",
          "x-auditable": true,
        }),
        userId: Type.String({
          description: "Alpha-numeric ID of the account user who published the configuration",
          "x-auditable": true,
        }),
        config: ZarazZarazConfigReturn,
      }),
    ),
  }),
)

export const ZarazZarazHistoryResponse = named(
  "zaraz_zaraz-history-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Boolean({ description: "Whether the API call was successful", "x-auditable": true }),
    result: Type.Array(
      Type.Object({
        createdAt: Type.String({
          description: "Date and time the configuration was created",
          format: "date-time",
          "x-auditable": true,
        }),
        id: Type.Integer({ description: "ID of the configuration", "x-auditable": true }),
        updatedAt: Type.String({
          description: "Date and time the configuration was last updated",
          format: "date-time",
          "x-auditable": true,
        }),
        userId: Type.String({
          description: "Alpha-numeric ID of the account user who published the configuration",
          "x-auditable": true,
        }),
        description: Type.String({
          description: "Configuration description provided by the user who published this configuration",
        }),
      }),
    ),
  }),
)

export const ZarazZarazConfigBody = named(
  "zaraz_zaraz-config-body",
  Type.Object(
    {
      analytics: Type.Optional(
        Type.Object(
          {
            defaultPurpose: Type.Optional(
              Type.String({ description: "Consent purpose assigned to Monitoring.", "x-auditable": true }),
            ),
            enabled: Type.Optional(
              Type.Boolean({ description: "Whether Advanced Monitoring reports are enabled.", "x-auditable": true }),
            ),
            sessionExpTime: Type.Optional(
              Type.Integer({
                description: "Session expiration time (seconds).",
                minimum: 60,
                maximum: 86400,
                "x-auditable": true,
              }),
            ),
          },
          { description: "Cloudflare Monitoring settings." },
        ),
      ),
      consent: Type.Optional(
        Type.Object(
          {
            buttonTextTranslations: Type.Optional(UnnamedSchemaRef3caeef70a38a3ad696413c7d97d9c394),
            companyEmail: Type.Optional(Type.String({ "x-auditable": true })),
            companyName: Type.Optional(Type.String({ "x-auditable": true })),
            companyStreetAddress: Type.Optional(Type.String({ "x-auditable": true })),
            consentModalIntroHTML: Type.Optional(Type.String({ "x-auditable": true })),
            consentModalIntroHTMLWithTranslations: Type.Optional(
              Type.Record(Type.String(), Type.String({ "x-auditable": true })),
            ),
            cookieName: Type.Optional(Type.String({ "x-auditable": true })),
            customCSS: Type.Optional(Type.String({ "x-auditable": true })),
            customIntroDisclaimerDismissed: Type.Optional(Type.Boolean({ "x-auditable": true })),
            defaultLanguage: Type.Optional(Type.String({ "x-auditable": true })),
            enabled: Type.Boolean(),
            hideModal: Type.Optional(Type.Boolean({ "x-auditable": true })),
            purposes: Type.Optional(
              Type.Record(
                Type.String(),
                Type.Object({
                  description: Type.String({ "x-auditable": true }),
                  name: Type.String({ "x-auditable": true }),
                }),
              ),
            ),
            purposesWithTranslations: Type.Optional(
              Type.Record(
                Type.String(),
                Type.Object({
                  description: Type.Record(Type.String(), Type.String({ "x-auditable": true })),
                  name: Type.Record(Type.String(), Type.String({ "x-auditable": true })),
                  order: Type.Integer({ "x-auditable": true }),
                }),
              ),
            ),
            tcfCompliant: Type.Optional(Type.Boolean()),
          },
          { description: "Consent management configuration." },
        ),
      ),
      dataLayer: Type.Boolean({ description: "Data layer compatibility mode enabled.", "x-auditable": true }),
      debugKey: Type.String({ description: "The key for Zaraz debug mode.", "x-auditable": true }),
      historyChange: Type.Optional(
        Type.Boolean({ description: "Single Page Application support enabled.", "x-auditable": true }),
      ),
      settings: Type.Object(
        {
          autoInjectScript: Type.Boolean({
            description: "Automatic injection of Zaraz scripts enabled.",
            "x-auditable": true,
          }),
          contextEnricher: Type.Optional(
            Type.Object(
              {
                escapedWorkerName: Type.String({ "x-auditable": true }),
                workerTag: Type.String({ "x-auditable": true }),
              },
              { description: "Details of the worker that receives and edits Zaraz Context object." },
            ),
          ),
          cookieDomain: Type.Optional(
            Type.String({
              description: "The domain Zaraz will use for writing and reading its cookies.",
              "x-auditable": true,
            }),
          ),
          ecommerce: Type.Optional(Type.Boolean({ description: "Ecommerce API enabled.", "x-auditable": true })),
          eventsApiPath: Type.Optional(
            Type.String({ description: "Custom endpoint for server-side track events.", "x-auditable": true }),
          ),
          hideExternalReferer: Type.Optional(
            Type.Boolean({ description: "Hiding external referrer URL enabled.", "x-auditable": true }),
          ),
          hideIPAddress: Type.Optional(
            Type.Boolean({ description: "Trimming IP address enabled.", "x-auditable": true }),
          ),
          hideQueryParams: Type.Optional(
            Type.Boolean({ description: "Removing URL query params enabled.", "x-auditable": true }),
          ),
          hideUserAgent: Type.Optional(
            Type.Boolean({ description: "Removing sensitive data from User Aagent string enabled." }),
          ),
          initPath: Type.Optional(
            Type.String({ description: "Custom endpoint for Zaraz init script.", "x-auditable": true }),
          ),
          injectIframes: Type.Optional(
            Type.Boolean({ description: "Injection of Zaraz scripts into iframes enabled.", "x-auditable": true }),
          ),
          mcRootPath: Type.Optional(
            Type.String({
              description: "Custom path for Managed Components server functionalities.",
              "x-auditable": true,
            }),
          ),
          scriptPath: Type.Optional(
            Type.String({ description: "Custom endpoint for Zaraz main script.", "x-auditable": true }),
          ),
          trackPath: Type.Optional(
            Type.String({ description: "Custom endpoint for Zaraz tracking requests.", "x-auditable": true }),
          ),
        },
        { description: "General Zaraz settings." },
      ),
      triggers: Type.Record(
        Type.String(),
        Type.Object({
          description: Type.Optional(Type.String({ description: "Trigger description.", "x-auditable": true })),
          excludeRules: Type.Array(
            Type.Union([
              ZarazLoadRule,
              ZarazClickListenerRule,
              ZarazTimerRule,
              ZarazFormSubmissionRule,
              ZarazVariableMatchRule,
              ZarazScrollDepthRule,
              ZarazElementVisibilityRule,
            ]),
            { description: "Rules defining when the trigger is not fired." },
          ),
          loadRules: Type.Array(
            Type.Union([
              ZarazLoadRule,
              ZarazClickListenerRule,
              ZarazTimerRule,
              ZarazFormSubmissionRule,
              ZarazVariableMatchRule,
              ZarazScrollDepthRule,
              ZarazElementVisibilityRule,
            ]),
            { description: "Rules defining when the trigger is fired." },
          ),
          name: Type.String({ description: "Trigger name.", "x-auditable": true }),
          system: Type.Optional(Type.Union([Type.Literal("pageload")], { "x-auditable": true })),
        }),
      ),
      variables: Type.Record(
        Type.String(),
        Type.Union([ZarazStringVariable, ZarazSecretVariable, ZarazWorkerVariable]),
      ),
      zarazVersion: Type.Integer({ description: "Zaraz internal version of the config.", "x-auditable": true }),
      tools: Type.Record(Type.String(), Type.Union([ZarazManagedComponent, ZarazCustomManagedComponent])),
    },
    { description: "Zaraz configuration", "x-stainless-variantName": "trigger_worker" },
  ),
)

export const ZarazApiResponseCommonFailure = named(
  "zaraz_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const ZarazZarazConfigResponse = named(
  "zaraz_zaraz-config-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Boolean({ description: "Whether the API call was successful", "x-auditable": true }),
    result: ZarazZarazConfigReturn,
  }),
)

export const CacheSchemasValue = named(
  "cache_schemas_value",
  Type.Union([Type.Literal("auto"), Type.Literal("custom")], {
    description: "Controls enablement of Automatic SSL/TLS.",
  }),
)

export const CacheSchemasPatch = named(
  "cache_schemas_patch",
  Type.Object(
    {
      value: CacheSchemasValue,
    },
    { description: "Update enablement of Automatic SSL/TLS." },
  ),
)

export const SpeedCloudflareSpeedBrainResponse = named(
  "speed_cloudflare_speed_brain_response",
  Type.Object({
    editable: Type.Optional(
      Type.Union([Type.Literal(true), Type.Literal(false)], {
        description: "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
        "x-auditable": true,
      }),
    ),
    id: Type.Optional(Type.String({ description: "Identifier of the zone setting.", "x-auditable": true })),
    modified_on: Type.Optional(
      Type.Union([
        Type.String({
          description: "last time this setting was modified.",
          format: "date-time",
          readOnly: true,
          "x-auditable": true,
        }),
        Type.Null(),
      ]),
    ),
    value: Type.Optional(
      Type.Union([Type.Literal("on"), Type.Literal("off")], {
        description:
          'Whether the feature is enabled or disabled.\nDefaults to "on" for Free plans, otherwise defaults to "off".\n',
        "x-auditable": true,
      }),
    ),
  }),
)

export const RumToggleRumRequest = named(
  "rum_toggle-rum-request",
  Type.Object({
    value: Type.Optional(Type.String({ description: "Value can either be On or Off." })),
  }),
)

export const RumEditable = named("rum_editable", Type.Boolean())

export const RumId = named("rum_id", Type.String({ "x-auditable": true }))

export const RumValue = named(
  "rum_value",
  Type.String({ description: "Current state of RUM. Returns On, Off, or Manual.", "x-auditable": true }),
)

export const RumRumSite = named(
  "rum_rum_site",
  Type.Object({
    editable: Type.Optional(RumEditable),
    id: Type.Optional(RumId),
    value: Type.Optional(RumValue),
  }),
)

export const RumRumSiteResponseSingle = named(
  "rum_rum-site-response-single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful." }),
    result: Type.Optional(RumRumSite),
  }),
)

export const OriginMaxHttpVersion = named(
  "origin_max_http_version",
  Type.Object({
    editable: CacheRulesEditable,
    id: Type.Union([Type.Literal("origin_max_http_version")], {
      description: "The identifier of the caching setting.",
      "x-auditable": true,
    }),
    modified_on: Type.Optional(CacheRulesModifiedOn),
    value: Type.Union([Type.Literal("2"), Type.Literal("1")], {
      description: "Value of the Origin Max HTTP Version Setting.",
      "x-auditable": true,
    }),
  }),
)

export const CacheRulesOriginH2MaxStreams = named(
  "cache-rules_origin_h2_max_streams",
  Type.Object(
    {
      id: Type.Union([Type.Literal("origin_h2_max_streams")], {
        description: "Value of the zone setting.",
        "x-auditable": true,
      }),
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
      value: Type.Optional(CacheRulesOriginH2MaxStreamsValue),
    },
    {
      description:
        "Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.",
    },
  ),
)

export const CacheRulesOriginH2MaxStreamsResponseValue = named(
  "cache-rules_origin_h2_max_streams_response_value",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(CacheRulesOriginH2MaxStreams),
  }),
)

export const SpeedCloudflareFontsValue = named(
  "speed_cloudflare_fonts_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], {
    description: "Whether the feature is enabled or disabled.",
    "x-auditable": true,
  }),
)

export const SpeedApiResponseCommonFailure = named(
  "speed_api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Unknown(), Type.Null()]),
    success: Type.Boolean({ description: "Whether the API call was successful.", "x-auditable": true }),
  }),
)

export const SpeedCloudflareFonts = named(
  "speed_cloudflare_fonts",
  Type.Object(
    {
      editable: Type.Optional(
        Type.Union([Type.Literal(true), Type.Literal(false)], {
          description:
            "Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).",
          "x-auditable": true,
        }),
      ),
      id: Type.Optional(
        Type.Union([Type.Literal("fonts")], { description: "ID of the zone setting.", "x-auditable": true }),
      ),
      modified_on: Type.Optional(
        Type.Union([
          Type.String({
            description: "last time this setting was modified.",
            format: "date-time",
            readOnly: true,
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "Current value of the zone setting.",
          "x-auditable": true,
        }),
      ),
    },
    {
      description:
        "Enhance your website's font delivery with Cloudflare Fonts. Deliver Google Hosted fonts from your own domain,\nboost performance, and enhance user privacy. Refer to the Cloudflare Fonts documentation for more information.\n",
    },
  ),
)

export const ZonesMultipleSettings = named(
  "zones_multiple_settings",
  Type.Array(
    Type.Union([
      Zones0rtt,
      ZonesAdvancedDdos,
      ZonesCacheRulesAegis,
      ZonesAlwaysOnline,
      ZonesSchemasAlwaysUseHttps,
      ZonesSchemasAutomaticHttpsRewrites,
      ZonesBrotli,
      ZonesSchemasBrowserCacheTtl,
      ZonesSchemasBrowserCheck,
      ZonesSchemasCacheLevel,
      ZonesChallengeTtl,
      ZonesChinaNetworkEnabled,
      ZonesCiphers,
      ZonesCnameFlattening,
      ZonesDevelopmentMode,
      ZonesEarlyHints,
      ZonesSchemasEdgeCacheTtl,
      ZonesSchemasEmailObfuscation,
      ZonesH2Prioritization,
      ZonesHotlinkProtection,
      ZonesHttp2,
      ZonesHttp3,
      ZonesSchemasIpGeolocation,
      ZonesIpv6,
      ZonesMaxUpload,
      ZonesMinTlsVersion,
      ZonesSchemasMirage,
      ZonesNel,
      ZonesSchemasOpportunisticEncryption,
      ZonesOpportunisticOnion,
      ZonesOrangeToOrange,
      ZonesSchemasOriginErrorPagePassThru,
      ZonesCacheRulesOriginH2MaxStreams,
      ZonesCacheRulesOriginMaxHttpVersion,
      ZonesSchemasPolish,
      ZonesPrefetchPreload,
      ZonesPrivacyPass,
      ZonesProxyReadTimeout,
      ZonesPseudoIpv4,
      ZonesReplaceInsecureJs,
      ZonesSchemasResponseBuffering,
      ZonesSchemasRocketLoader,
      ZonesSchemasAutomaticPlatformOptimization,
      ZonesSecurityHeader,
      ZonesSchemasSecurityLevel,
      ZonesServerSideExclude,
      ZonesSha1Support,
      ZonesSchemasSortQueryStringForCache,
      ZonesSchemasSsl,
      ZonesSslRecommender,
      ZonesTls12Only,
      ZonesTls13,
      ZonesTlsClientAuth,
      ZonesSchemasTrueClientIpHeader,
      ZonesSchemasWaf,
      ZonesWebp,
      ZonesWebsockets,
    ]),
  ),
)

export const ZonesComponentsSchemasApiResponseCommonFailure = named(
  "zones_components-schemas-api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Unknown(), Type.Null()]),
    success: Type.Boolean({ description: "Whether the API call was successful" }),
  }),
)

export const ZonesZoneSettingsResponseCollection = named(
  "zones_zone_settings_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful" }),
    result: Type.Optional(
      Type.Array(
        Type.Union([
          Zones0rtt,
          ZonesAdvancedDdos,
          ZonesCacheRulesAegis,
          ZonesAlwaysOnline,
          ZonesSchemasAlwaysUseHttps,
          ZonesSchemasAutomaticHttpsRewrites,
          ZonesBrotli,
          ZonesSchemasBrowserCacheTtl,
          ZonesSchemasBrowserCheck,
          ZonesSchemasCacheLevel,
          ZonesChallengeTtl,
          ZonesCiphers,
          ZonesCnameFlattening,
          ZonesDevelopmentMode,
          ZonesEarlyHints,
          ZonesSchemasEdgeCacheTtl,
          ZonesSchemasEmailObfuscation,
          ZonesH2Prioritization,
          ZonesHotlinkProtection,
          ZonesHttp2,
          ZonesHttp3,
          ZonesImageResizing,
          ZonesSchemasIpGeolocation,
          ZonesIpv6,
          ZonesMaxUpload,
          ZonesMinTlsVersion,
          ZonesSchemasMirage,
          ZonesNel,
          ZonesSchemasOpportunisticEncryption,
          ZonesOpportunisticOnion,
          ZonesOrangeToOrange,
          ZonesSchemasOriginErrorPagePassThru,
          ZonesCacheRulesOriginH2MaxStreams,
          ZonesCacheRulesOriginMaxHttpVersion,
          ZonesSchemasPolish,
          ZonesPrefetchPreload,
          ZonesPrivacyPass,
          ZonesProxyReadTimeout,
          ZonesPseudoIpv4,
          ZonesReplaceInsecureJs,
          ZonesSchemasResponseBuffering,
          ZonesSchemasRocketLoader,
          ZonesSchemasAutomaticPlatformOptimization,
          ZonesSecurityHeader,
          ZonesSchemasSecurityLevel,
          ZonesServerSideExclude,
          ZonesSha1Support,
          ZonesSchemasSortQueryStringForCache,
          ZonesSchemasSsl,
          ZonesSslRecommender,
          ZonesTls12Only,
          ZonesTls13,
          ZonesTlsClientAuth,
          ZonesTransformations,
          ZonesTransformationsAllowedOrigins,
          ZonesSchemasTrueClientIpHeader,
          ZonesSchemasWaf,
          ZonesWebp,
          ZonesWebsockets,
        ]),
      ),
    ),
  }),
)

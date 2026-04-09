import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"

export const ZonesSchemasApiResponseSingleId = named(
  "zones_schemas-api-response-single-id",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Union([
        Type.Object({
          id: DlsIdentifier,
        }),
        Type.Null(),
      ]),
    ),
  }),
)

export const ZonesSettings = named(
  "zones_settings",
  Type.Array(Type.Unknown(), { description: "Settings available for the zone." }),
)

export const ZonesUrlTarget = named(
  "zones_url_target",
  Type.Object(
    {
      constraint: Type.Optional(
        Type.Object(
          {
            operator: Type.Union(
              [
                Type.Literal("matches"),
                Type.Literal("contains"),
                Type.Literal("equals"),
                Type.Literal("not_equal"),
                Type.Literal("not_contain"),
              ],
              {
                description: "The matches operator can use asterisks and pipes as wildcard and 'or' operators.",
                "x-auditable": true,
              },
            ),
            value: Type.String({
              description:
                "The URL pattern to match against the current request. The pattern may contain up to four asterisks ('*') as placeholders.",
              "x-auditable": true,
            }),
          },
          { description: "String constraint." },
        ),
      ),
      target: Type.Optional(
        Type.Union([Type.Literal("url")], {
          description: "A target based on the URL of the request.",
          "x-auditable": true,
        }),
      ),
    },
    { description: "URL target." },
  ),
)

export const ZonesTarget = named("zones_target", ZonesUrlTarget)

export const ZonesTargets = named(
  "zones_targets",
  Type.Array(ZonesTarget, {
    description: "The rule targets to evaluate on each request.",
    "x-stainless-skip": ["terraform"],
  }),
)

export const ZonesStatus = named(
  "zones_status",
  Type.Union([Type.Literal("active"), Type.Literal("disabled")], {
    description: "The status of the Page Rule.",
    "x-auditable": true,
  }),
)

export const ZonesPriority = named(
  "zones_priority",
  Type.Integer({
    description:
      "The priority of the rule, used to define which Page Rule is processed\nover another. A higher number indicates a higher priority. For example,\nif you have a catch-all Page Rule (rule A: `/images/*`) but want a more\nspecific Page Rule to take precedence (rule B: `/images/special/*`),\nspecify a higher priority for rule B so it overrides rule A.\n",
    default: 1,
    "x-auditable": true,
  }),
)

export const ZonesAlwaysUseHttps = named(
  "zones_always_use_https",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("always_use_https")], {
          description: "If enabled, any `http://`` URL is converted to `https://` through a\n301 redirect.\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesAutomaticHttpsRewrites = named(
  "zones_automatic_https_rewrites",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("automatic_https_rewrites")], {
          description: "Turn on or off Automatic HTTPS Rewrites.",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "The status of Automatic HTTPS Rewrites.\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesBrowserCacheTtl = named(
  "zones_browser_cache_ttl",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("browser_cache_ttl")], {
          description: "Control how long resources cached by client browsers remain valid.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Integer({
          description:
            'The number of seconds to cache resources for.\nMinimum values by plan:\n- Free: 7200 seconds (2 hours)\n- Pro: 3600 seconds (1 hour)\n- Business: 1 second\n- Enterprise: 1 second\nSetting this to 0 enables "Respect Existing Headers" and is allowed for all plans.\n',
          minimum: 0,
          maximum: 31536000,
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesBrowserCheck = named(
  "zones_browser_check",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("browser_check")], {
          description:
            "Inspect the visitor's browser for headers commonly associated with\nspammers and certain bots.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "The status of Browser Integrity Check.\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesBypassCacheOnCookie = named(
  "zones_bypass_cache_on_cookie",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("bypass_cache_on_cookie")], {
          description:
            "Bypass cache and fetch resources from the origin server if a regular\nexpression matches against a cookie name present in the request.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.String({
          description:
            "The regular expression to use for matching cookie names in the\nrequest. Refer to [Bypass Cache on Cookie\nsetting](https://developers.cloudflare.com/rules/page-rules/reference/additional-reference/#bypass-cache-on-cookie-setting)\nto learn about limited regular expression support.\n",
          minLength: 1,
          maxLength: 150,
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesCacheByDeviceType = named(
  "zones_cache_by_device_type",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("cache_by_device_type")], {
          description: "Separate cached content based on the visitor's device type.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "The status of Cache By Device Type.\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesCacheDeceptionArmor = named(
  "zones_cache_deception_armor",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("cache_deception_armor")], {
          description:
            "Protect from web cache deception attacks while still allowing static\nassets to be cached. This setting verifies that the URL's extension\nmatches the returned `Content-Type`.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "The status of Cache Deception Armor.\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesCacheKeyFields = named(
  "zones_cache_key_fields",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("cache_key_fields")], {
          description:
            "Control specifically what variables to include when deciding which\nresources to cache. This allows customers to determine what to cache\nbased on something other than just the URL.\n",
        }),
      ),
      value: Type.Optional(
        Type.Object({
          cookie: Type.Optional(
            Type.Object(
              {
                check_presence: Type.Optional(
                  Type.Array(Type.String({ minLength: 1 }), {
                    description:
                      "A list of cookies to check for the presence of, without\nincluding their actual values.\n",
                    minItems: 1,
                    maxItems: 50,
                  }),
                ),
                include: Type.Optional(
                  Type.Array(Type.String({ minLength: 1 }), {
                    description: "A list of cookies to include.\n",
                    minItems: 1,
                    maxItems: 50,
                  }),
                ),
              },
              { description: "Controls which cookies appear in the Cache Key.\n" },
            ),
          ),
          header: Type.Optional(
            Type.Object(
              {
                check_presence: Type.Optional(
                  Type.Array(Type.String({ minLength: 1 }), {
                    description:
                      "A list of headers to check for the presence of, without\nincluding their actual values.\n",
                    minItems: 1,
                    maxItems: 50,
                  }),
                ),
                exclude: Type.Optional(
                  Type.Array(Type.String({ minLength: 1 }), {
                    description: "A list of headers to ignore.\n",
                    minItems: 1,
                    maxItems: 50,
                  }),
                ),
                include: Type.Optional(
                  Type.Array(Type.String({ minLength: 1 }), {
                    description: "A list of headers to include.\n",
                    minItems: 1,
                    maxItems: 50,
                  }),
                ),
              },
              {
                description:
                  "Controls which headers go into the Cache Key. Exactly one of\n`include` or `exclude` is expected.\n",
              },
            ),
          ),
          host: Type.Optional(
            Type.Object(
              {
                resolved: Type.Optional(
                  Type.Boolean({
                    description: "Whether to include the Host header in the HTTP request sent\nto the origin.\n",
                  }),
                ),
              },
              { description: "Determines which host header to include in the Cache Key.\n" },
            ),
          ),
          query_string: Type.Optional(
            Type.Object(
              {
                exclude: Type.Optional(
                  Type.Union([
                    Type.Union([Type.Literal("*")], { description: "Ignore all query string parameters.\n" }),
                    Type.Array(Type.String({ minLength: 1 }), {
                      description: "A list of query string parameters to ignore.\n",
                      minItems: 1,
                      maxItems: 50,
                    }),
                  ]),
                ),
                include: Type.Optional(
                  Type.Union([
                    Type.Union([Type.Literal("*")], { description: "Include all query string parameters.\n" }),
                    Type.Array(Type.String({ minLength: 1 }), {
                      description: "A list of query string parameters to include.\n",
                      minItems: 1,
                      maxItems: 50,
                    }),
                  ]),
                ),
              },
              {
                description:
                  "Controls which URL query string parameters go into the Cache\nKey. Exactly one of `include` or `exclude` is expected.\n",
              },
            ),
          ),
          user: Type.Optional(
            Type.Object(
              {
                device_type: Type.Optional(
                  Type.Boolean({
                    description: "Classifies a request as `mobile`, `desktop`, or `tablet`\nbased on the User Agent.\n",
                  }),
                ),
                geo: Type.Optional(
                  Type.Boolean({ description: "Includes the client's country, derived from the IP address.\n" }),
                ),
                lang: Type.Optional(
                  Type.Boolean({
                    description:
                      "Includes the first language code contained in the\n`Accept-Language` header sent by the client.\n",
                  }),
                ),
              },
              { description: "Feature fields to add features about the end-user (client) into\nthe Cache Key.\n" },
            ),
          ),
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesCacheLevel = named(
  "zones_cache_level",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("cache_level")], {
          description: "Apply custom caching based on the option selected.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union(
          [
            Type.Literal("bypass"),
            Type.Literal("basic"),
            Type.Literal("simplified"),
            Type.Literal("aggressive"),
            Type.Literal("cache_everything"),
          ],
          {
            description:
              "* `bypass`: Cloudflare does not cache.\n* `basic`: Delivers resources from cache when there is no query\n  string.\n* `simplified`: Delivers the same resource to everyone independent\n  of the query string.\n* `aggressive`: Caches all static content that has a query string.\n* `cache_everything`: Treats all content as static and caches all\n  file types beyond the [Cloudflare default cached\n  content](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#default-cached-file-extensions).\n",
            "x-auditable": true,
          },
        ),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesCacheOnCookie = named(
  "zones_cache_on_cookie",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("cache_on_cookie")], {
          description:
            "Apply the Cache Everything option (Cache Level setting) based on a\nregular expression match against a cookie name.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.String({
          description: "The regular expression to use for matching cookie names in the\nrequest.\n",
          minLength: 1,
          maxLength: 150,
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesCacheTtlByStatus = named(
  "zones_cache_ttl_by_status",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("cache_ttl_by_status")], {
          description:
            "Enterprise customers can set cache time-to-live (TTL) based on the\nresponse status from the origin web server. Cache TTL refers to the\nduration of a resource in the Cloudflare network before being\nmarked as stale or discarded from cache. Status codes are returned\nby a resource's origin. Setting cache TTL based on response status\noverrides the default cache behavior (standard caching) for static\nfiles and overrides cache instructions sent by the origin web\nserver. To cache non-static assets, set a Cache Level of Cache\nEverything using a Page Rule. Setting no-store Cache-Control or a\nlow TTL (using `max-age`/`s-maxage`) increases requests to origin\nweb servers and decreases performance.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Record(
          Type.String(),
          Type.Union([
            Type.Union([Type.Literal("no-cache"), Type.Literal("no-store")], {
              description: "`no-store` (equivalent to -1), `no-cache` (equivalent to 0)\n",
            }),
            Type.Integer({
              description: "An integer value that defines the duration an asset is valid in\nseconds.\n",
            }),
          ]),
        ),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesDisableApps = named(
  "zones_disable_apps",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("disable_apps")], {
          description:
            "Turn off all active [Cloudflare Apps](https://developers.cloudflare.com/support/more-dashboard-apps/cloudflare-apps/)\n(deprecated).\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesDisablePerformance = named(
  "zones_disable_performance",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("disable_performance")], {
          description:
            "Turn off\n[Rocket Loader](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/),\n[Mirage](https://developers.cloudflare.com/speed/optimization/images/mirage/), and\n[Polish](https://developers.cloudflare.com/images/polish/).\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesDisableSecurity = named(
  "zones_disable_security",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("disable_security")], {
          description:
            "Turn off\n[Email Obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/),\n[Rate Limiting (previous version, deprecated)](https://developers.cloudflare.com/waf/reference/legacy/old-rate-limiting/),\n[Scrape Shield](https://developers.cloudflare.com/waf/tools/scrape-shield/),\n[URL (Zone) Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/), and\n[WAF managed rules (previous version, deprecated)](https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/).\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesDisableZaraz = named(
  "zones_disable_zaraz",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("disable_zaraz")], {
          description: "Turn off [Zaraz](https://developers.cloudflare.com/zaraz/).\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesEdgeCacheTtl = named(
  "zones_edge_cache_ttl",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("edge_cache_ttl")], {
          description:
            "Specify how long to cache a resource in the Cloudflare global\nnetwork. *Edge Cache TTL* is not visible in response headers.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(Type.Integer({ minimum: 1, maximum: 31536000, "x-auditable": true })),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesEmailObfuscation = named(
  "zones_email_obfuscation",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("email_obfuscation")], {
          description: "Turn on or off **Email Obfuscation**.",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "The status of Email Obfuscation.\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesExplicitCacheControl = named(
  "zones_explicit_cache_control",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("explicit_cache_control")], {
          description:
            "Origin Cache Control is enabled by default for Free, Pro, and\nBusiness domains and disabled by default for Enterprise domains.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "The status of Origin Cache Control.\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesForwardingUrl = named(
  "zones_forwarding_url",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("forwarding_url")], {
          description:
            "Redirects one URL to another using an `HTTP 301/302` redirect. Refer\nto [Wildcard matching and referencing](https://developers.cloudflare.com/rules/page-rules/reference/wildcard-matching/).\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Object({
          status_code: Type.Optional(
            Type.Union([Type.Literal(301), Type.Literal(302)], {
              description:
                "The status code to use for the URL redirect. 301 is a permanent\nredirect. 302 is a temporary redirect.\n",
              "x-auditable": true,
            }),
          ),
          url: Type.Optional(
            Type.String({
              description:
                "The URL to redirect the request to.\nNotes: ${num} refers to the position of '*' in the constraint value.",
              maxLength: 1500,
              "x-auditable": true,
            }),
          ),
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesHostHeaderOverride = named(
  "zones_host_header_override",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("host_header_override")], {
          description: "Apply a specific host header.",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.String({ description: "The hostname to use in the `Host` header", minLength: 1, "x-auditable": true }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesIpGeolocation = named(
  "zones_ip_geolocation",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("ip_geolocation")], {
          description:
            "Cloudflare adds a CF-IPCountry HTTP header containing the country code that corresponds to the visitor.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "The status of adding the IP Geolocation Header.\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesMirage = named(
  "zones_mirage",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("mirage")], {
          description:
            "Cloudflare Mirage reduces bandwidth used by images in mobile browsers.\nIt can accelerate loading of image-heavy websites on very slow mobile connections and HTTP/1.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "The status of Mirage.\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesOpportunisticEncryption = named(
  "zones_opportunistic_encryption",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("opportunistic_encryption")], {
          description:
            "Opportunistic Encryption allows browsers to access HTTP URIs over an encrypted TLS channel.\nIt's not a substitute for HTTPS, but provides additional security for otherwise vulnerable requests.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "The status of Opportunistic Encryption.\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesOriginErrorPagePassThru = named(
  "zones_origin_error_page_pass_thru",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("origin_error_page_pass_thru")], {
          description:
            "Turn on or off Cloudflare error pages generated from issues sent from the origin server. If enabled, this setting triggers error pages issued by the origin.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "The status of Origin Error Page Passthru.\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesPolish = named(
  "zones_polish",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("polish")], {
          description: "Apply options from the Polish feature of the Cloudflare Speed app.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("off"), Type.Literal("lossless"), Type.Literal("lossy")], {
          description: "The level of Polish you want applied to your origin.\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesResolveOverride = named(
  "zones_resolve_override",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("resolve_override")], {
          description: "Change the origin address to the value specified in this setting.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.String({ description: "The origin address you want to override with.\n", "x-auditable": true }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesRespectStrongEtag = named(
  "zones_respect_strong_etag",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("respect_strong_etag")], {
          description:
            "Turn on or off byte-for-byte equivalency checks between the\nCloudflare cache and the origin server.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "The status of Respect Strong ETags\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesResponseBuffering = named(
  "zones_response_buffering",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("response_buffering")], {
          description:
            "Turn on or off whether Cloudflare should wait for an entire file\nfrom the origin server before forwarding it to the site visitor. By\ndefault, Cloudflare sends packets to the client as they arrive from\nthe origin server.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "The status of Response Buffering\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesRocketLoader = named(
  "zones_rocket_loader",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("rocket_loader")], {
          description: "Turn on or off Rocket Loader in the Cloudflare Speed app.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "The status of Rocket Loader\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesSecurityLevel = named(
  "zones_security_level",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("security_level")], {
          description: "Control options for the **Security Level** feature from the **Security** app.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union(
          [
            Type.Literal("off"),
            Type.Literal("essentially_off"),
            Type.Literal("low"),
            Type.Literal("medium"),
            Type.Literal("high"),
            Type.Literal("under_attack"),
          ],
          { "x-auditable": true },
        ),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesSortQueryStringForCache = named(
  "zones_sort_query_string_for_cache",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("sort_query_string_for_cache")], {
          description:
            "Turn on or off the reordering of query strings. When query strings have the same structure, caching improves.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "The status of Query String Sort\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesSsl = named(
  "zones_ssl",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("ssl")], {
          description:
            "Control options for the SSL feature of the Edge Certificates tab in the Cloudflare SSL/TLS app.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union(
          [
            Type.Literal("off"),
            Type.Literal("flexible"),
            Type.Literal("full"),
            Type.Literal("strict"),
            Type.Literal("origin_pull"),
          ],
          {
            description: "The encryption mode that Cloudflare uses to connect to your origin server.\n",
            "x-auditable": true,
          },
        ),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesTrueClientIpHeader = named(
  "zones_true_client_ip_header",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("true_client_ip_header")], {
          description: "Turn on or off the True-Client-IP Header feature of the Cloudflare Network app.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "The status of True Client IP Header.\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesWaf = named(
  "zones_waf",
  Type.Object(
    {
      id: Type.Optional(
        Type.Union([Type.Literal("waf")], {
          description:
            "Turn on or off [WAF managed rules (previous version, deprecated)](https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/).\nYou cannot enable or disable individual WAF managed rules via Page Rules.\n",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")], {
          description: "The status of WAF managed rules (previous version).\n",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-skip": ["terraform"] },
  ),
)

export const ZonesActions = named(
  "zones_actions",
  Type.Array(
    Type.Union([
      ZonesAlwaysUseHttps,
      ZonesAutomaticHttpsRewrites,
      ZonesBrowserCacheTtl,
      ZonesBrowserCheck,
      ZonesBypassCacheOnCookie,
      ZonesCacheByDeviceType,
      ZonesCacheDeceptionArmor,
      ZonesCacheKeyFields,
      ZonesCacheLevel,
      ZonesCacheOnCookie,
      ZonesCacheTtlByStatus,
      ZonesDisableApps,
      ZonesDisablePerformance,
      ZonesDisableSecurity,
      ZonesDisableZaraz,
      ZonesEdgeCacheTtl,
      ZonesEmailObfuscation,
      ZonesExplicitCacheControl,
      ZonesForwardingUrl,
      ZonesHostHeaderOverride,
      ZonesIpGeolocation,
      ZonesMirage,
      ZonesOpportunisticEncryption,
      ZonesOriginErrorPagePassThru,
      ZonesPolish,
      ZonesResolveOverride,
      ZonesRespectStrongEtag,
      ZonesResponseBuffering,
      ZonesRocketLoader,
      ZonesSecurityLevel,
      ZonesSortQueryStringForCache,
      ZonesSsl,
      ZonesTrueClientIpHeader,
      ZonesWaf,
    ]),
    {
      description:
        "The set of actions to perform if the targets of this rule match the\nrequest. Actions can redirect to another URL or override settings, but\nnot both.\n",
      "x-stainless-skip": ["terraform"],
    },
  ),
)

export const ZonesCreatedOn = named(
  "zones_created_on",
  Type.String({
    description: "The timestamp of when the Page Rule was created.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ZonesModifiedOn = named(
  "zones_modified_on",
  Type.String({
    description: "The timestamp of when the Page Rule was last modified.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ZonesPageRule = named(
  "zones_page_rule",
  Type.Object({
    actions: ZonesActions,
    created_on: ZonesCreatedOn,
    id: DlsIdentifier,
    modified_on: ZonesModifiedOn,
    priority: ZonesPriority,
    status: ZonesStatus,
    targets: ZonesTargets,
  }),
)

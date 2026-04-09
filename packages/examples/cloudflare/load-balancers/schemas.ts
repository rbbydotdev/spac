import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  D1Messages,
  LoadBalancingMonitorGroupId,
  LoadBalancingMonitorId,
  LoadBalancingNetworks,
  LoadBalancingResultInfo,
  LoadBalancingTimestamp,
  SecurityCenterSubject,
  WaitingroomWaitingRoomId,
} from "../shared/schemas"

export const LoadBalancingComponentsSchemasIdResponse = named(
  "load-balancing_components-schemas-id_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Object({
      id: Type.Optional(WaitingroomWaitingRoomId),
    }),
  }),
)

export const LoadBalancingComponentsSchemasEnabled = named(
  "load-balancing_components-schemas-enabled",
  Type.Boolean({
    description: "Whether to enable (the default) this load balancer.",
    default: true,
    "x-auditable": true,
  }),
)

export const LoadBalancingAdaptiveRouting = named(
  "load-balancing_adaptive_routing",
  Type.Object(
    {
      failover_across_pools: Type.Optional(
        Type.Boolean({
          description:
            "Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, according to the failover order defined by traffic and origin steering. When set false (the default) zero-downtime failover will only occur between origins within the same pool. See `session_affinity_attributes` for control over when sessions are broken or reassigned.",
          default: false,
          "x-auditable": true,
        }),
      ),
    },
    {
      description:
        "Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.",
    },
  ),
)

export const LoadBalancingCountryPools = named(
  "load-balancing_country_pools",
  Type.Record(
    Type.String(),
    Type.Array(Type.String({ "x-auditable": true }), {
      description: "A `string:[string]` object of key-values. Country code maps to list of pool IDs.",
    }),
  ),
)

export const LoadBalancingDefaultPools = named(
  "load-balancing_default_pools",
  Type.Array(Type.String({ description: "A pool ID." }), {
    description:
      "A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.",
  }),
)

export const LoadBalancingComponentsSchemasDescription = named(
  "load-balancing_components-schemas-description",
  Type.String({ description: "Object description.", "x-auditable": true }),
)

export const LoadBalancingFallbackPool = named(
  "load-balancing_fallback_pool",
  Type.String({
    description: "The pool ID to use when all other pools are detected as unhealthy.",
    "x-auditable": true,
  }),
)

export const LoadBalancingLocationStrategy = named(
  "load-balancing_location_strategy",
  Type.Object(
    {
      mode: Type.Optional(
        Type.Union([Type.Literal("pop"), Type.Literal("resolver_ip")], {
          description:
            'Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.\n- `"pop"`: Use the Cloudflare PoP location.\n- `"resolver_ip"`: Use the DNS resolver GeoIP location. If the GeoIP lookup is unsuccessful, use the Cloudflare PoP location.',
          "x-auditable": true,
        }),
      ),
      prefer_ecs: Type.Optional(
        Type.Union([Type.Literal("always"), Type.Literal("never"), Type.Literal("proximity"), Type.Literal("geo")], {
          description:
            'Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.\n- `"always"`: Always prefer ECS.\n- `"never"`: Never prefer ECS.\n- `"proximity"`: Prefer ECS only when `steering_policy="proximity"`.\n- `"geo"`: Prefer ECS only when `steering_policy="geo"`.',
          "x-auditable": true,
        }),
      ),
    },
    {
      description:
        "Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.",
    },
  ),
)

export const LoadBalancingComponentsSchemasName = named(
  "load-balancing_components-schemas-name",
  Type.String({
    description:
      "The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will not be used.",
    "x-auditable": true,
  }),
)

export const LoadBalancingPopPools = named(
  "load-balancing_pop_pools",
  Type.Record(
    Type.String(),
    Type.Array(Type.String({ "x-auditable": true }), {
      description: "A `string:[string]` object of key-values. PoP code maps to list of pool IDs.",
    }),
  ),
)

export const LoadBalancingProxied = named(
  "load-balancing_proxied",
  Type.Boolean({
    description: "Whether the hostname should be gray clouded (false) or orange clouded (true).",
    default: false,
    "x-auditable": true,
  }),
)

export const LoadBalancingRandomSteering = named(
  "load-balancing_random_steering",
  Type.Object(
    {
      default_weight: Type.Optional(
        Type.Number({
          description:
            "The default weight for pools in the load balancer that are not specified in the pool_weights map.",
          default: 1,
          minimum: 0,
          maximum: 1,
          multipleOf: 0.1,
          "x-auditable": true,
        }),
      ),
      pool_weights: Type.Optional(Type.Record(Type.String(), Type.Number({ "x-auditable": true }))),
    },
    {
      description:
        'Configures pool weights.\n- `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.\n- `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool\'s outstanding requests.\n- `steering_policy="least_connections"`: Use pool weights to scale each pool\'s open connections.',
    },
  ),
)

export const LoadBalancingRegionPools = named(
  "load-balancing_region_pools",
  Type.Record(
    Type.String(),
    Type.Array(Type.String({ "x-auditable": true }), {
      description: "A `string:[string]` object of key-values. Region code maps to list of pool IDs.",
    }),
  ),
)

export const LoadBalancingSessionAffinity = named(
  "load-balancing_session_affinity",
  Type.Union([Type.Literal("none"), Type.Literal("cookie"), Type.Literal("ip_cookie"), Type.Literal("header")], {
    description:
      'Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client\'s ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.',
    "x-auditable": true,
  }),
)

export const LoadBalancingSessionAffinityAttributes = named(
  "load-balancing_session_affinity_attributes",
  Type.Object(
    {
      drain_duration: Type.Optional(
        Type.Number({
          description:
            "Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.",
          "x-auditable": true,
        }),
      ),
      headers: Type.Optional(
        Type.Array(
          Type.String({ description: "An HTTP header name.", minLength: 1, maxLength: 100, "x-auditable": true }),
          {
            description:
              'Configures the names of HTTP headers to base session affinity on when header `session_affinity` is enabled. At least one HTTP header name must be provided. To specify the exact cookies to be used, include an item in the following format: `"cookie:<cookie-name-1>,<cookie-name-2>"` (example) where everything after the colon is a comma-separated list of cookie names. Providing only `"cookie"` will result in all cookies being used. The default max number of HTTP header names that can be provided depends on your plan: 5 for Enterprise, 1 for all other plans.',
            uniqueItems: true,
          },
        ),
      ),
      require_all_headers: Type.Optional(
        Type.Boolean({
          description:
            'When header `session_affinity` is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The supported values are: - `"true"`: Load balancing requests must contain *all* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren\'t created. - `"false"`: Load balancing requests must contain *at least one* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren\'t created.',
          default: false,
          "x-auditable": true,
        }),
      ),
      samesite: Type.Optional(
        Type.Union([Type.Literal("Auto"), Type.Literal("Lax"), Type.Literal("None"), Type.Literal("Strict")], {
          description:
            'Configures the SameSite attribute on session affinity cookie. Value "Auto" will be translated to "Lax" or "None" depending if Always Use HTTPS is enabled. Note: when using value "None", the secure attribute can not be set to "Never".',
          "x-auditable": true,
        }),
      ),
      secure: Type.Optional(
        Type.Union([Type.Literal("Auto"), Type.Literal("Always"), Type.Literal("Never")], {
          description:
            'Configures the Secure attribute on session affinity cookie. Value "Always" indicates the Secure attribute will be set in the Set-Cookie header, "Never" indicates the Secure attribute will not be set, and "Auto" will set the Secure attribute depending if Always Use HTTPS is enabled.',
          "x-auditable": true,
        }),
      ),
      zero_downtime_failover: Type.Optional(
        Type.Union([Type.Literal("none"), Type.Literal("temporary"), Type.Literal("sticky")], {
          description:
            'Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible with Argo, Tiered Cache, and Bandwidth Alliance. The supported values are: - `"none"`: No failover takes place for sessions pinned to the origin (default). - `"temporary"`: Traffic will be sent to another other healthy origin until the originally pinned origin is available; note that this can potentially result in heavy origin flapping. - `"sticky"`: The session affinity cookie is updated and subsequent requests are sent to the new origin. Note: Zero-downtime failover with sticky sessions is currently not supported for session affinity by header.',
          "x-auditable": true,
        }),
      ),
    },
    { description: "Configures attributes for session affinity." },
  ),
)

export const LoadBalancingSessionAffinityTtl = named(
  "load-balancing_session_affinity_ttl",
  Type.Number({
    description:
      'Time, in seconds, until a client\'s session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven\'t been used for the number of seconds specified.',
    "x-auditable": true,
  }),
)

export const LoadBalancingSteeringPolicy = named(
  "load-balancing_steering_policy",
  Type.Union(
    [
      Type.Literal("off"),
      Type.Literal("geo"),
      Type.Literal("random"),
      Type.Literal("dynamic_latency"),
      Type.Literal("proximity"),
      Type.Literal("least_outstanding_requests"),
      Type.Literal("least_connections"),
      Type.Literal(""),
    ],
    {
      description:
        'Steering Policy for this load balancer.\n- `"off"`: Use `default_pools`.\n- `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.\n- `"random"`: Select a pool randomly.\n- `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).\n- `"proximity"`: Use the pools\' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.\n- `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool\'s number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.\n- `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool\'s number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.\n- `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.',
      "x-auditable": true,
    },
  ),
)

export const LoadBalancingTtl = named(
  "load-balancing_ttl",
  Type.Number({
    description:
      "Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.",
    "x-auditable": true,
  }),
)

export const LoadBalancingRules = named(
  "load-balancing_rules",
  Type.Array(
    Type.Object(
      {
        condition: Type.Optional(
          Type.String({
            description:
              "The condition expressions to evaluate. If the condition evaluates to true, the overrides or fixed_response in this rule will be applied. An empty condition is always true. For more details on condition expressions, please see https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-rules/expressions.",
            "x-auditable": true,
          }),
        ),
        disabled: Type.Optional(
          Type.Boolean({
            description: "Disable this specific rule. It will no longer be evaluated by this load balancer.",
            default: false,
            "x-auditable": true,
          }),
        ),
        fixed_response: Type.Optional(
          Type.Object(
            {
              content_type: Type.Optional(
                Type.String({
                  description: "The http 'Content-Type' header to include in the response.",
                  maxLength: 32,
                  "x-auditable": true,
                }),
              ),
              location: Type.Optional(
                Type.String({
                  description: "The http 'Location' header to include in the response.",
                  maxLength: 2048,
                  "x-auditable": true,
                }),
              ),
              message_body: Type.Optional(
                Type.String({ description: "Text to include as the http body.", maxLength: 1024, "x-auditable": true }),
              ),
              status_code: Type.Optional(
                Type.Integer({ description: "The http status code to respond with.", "x-auditable": true }),
              ),
            },
            {
              description:
                "A collection of fields used to directly respond to the eyeball instead of routing to a pool. If a fixed_response is supplied the rule will be marked as terminates.",
            },
          ),
        ),
        name: Type.Optional(
          Type.String({
            description: "Name of this rule. Only used for human readability.",
            maxLength: 200,
            "x-auditable": true,
          }),
        ),
        overrides: Type.Optional(
          Type.Object(
            {
              adaptive_routing: Type.Optional(LoadBalancingAdaptiveRouting),
              country_pools: Type.Optional(LoadBalancingCountryPools),
              default_pools: Type.Optional(LoadBalancingDefaultPools),
              fallback_pool: Type.Optional(LoadBalancingFallbackPool),
              location_strategy: Type.Optional(LoadBalancingLocationStrategy),
              pop_pools: Type.Optional(LoadBalancingPopPools),
              random_steering: Type.Optional(LoadBalancingRandomSteering),
              region_pools: Type.Optional(LoadBalancingRegionPools),
              session_affinity: Type.Optional(LoadBalancingSessionAffinity),
              session_affinity_attributes: Type.Optional(LoadBalancingSessionAffinityAttributes),
              session_affinity_ttl: Type.Optional(LoadBalancingSessionAffinityTtl),
              steering_policy: Type.Optional(LoadBalancingSteeringPolicy),
              ttl: Type.Optional(LoadBalancingTtl),
            },
            {
              description:
                "A collection of overrides to apply to the load balancer when this rule's condition is true. All fields are optional.",
            },
          ),
        ),
        priority: Type.Optional(
          Type.Integer({
            description:
              "The order in which rules should be executed in relation to each other. Lower values are executed first. Values do not need to be sequential. If no value is provided for any rule the array order of the rules field will be used to assign a priority.",
            default: 0,
            minimum: 0,
            "x-auditable": true,
          }),
        ),
        terminates: Type.Optional(
          Type.Boolean({
            description:
              "If this rule's condition is true, this causes rule evaluation to stop after processing this rule.",
            "x-auditable": true,
          }),
        ),
      },
      { description: "A rule object containing conditions and overrides for this load balancer to evaluate." },
    ),
    { description: "BETA Field Not General Access: A list of rules for this load balancer to execute." },
  ),
)

export const LoadBalancingLoadBalancer = named(
  "load-balancing_load-balancer",
  Type.Object({
    adaptive_routing: Type.Optional(LoadBalancingAdaptiveRouting),
    country_pools: Type.Optional(LoadBalancingCountryPools),
    created_on: Type.Optional(LoadBalancingTimestamp),
    default_pools: Type.Optional(LoadBalancingDefaultPools),
    description: Type.Optional(LoadBalancingComponentsSchemasDescription),
    enabled: Type.Optional(LoadBalancingComponentsSchemasEnabled),
    fallback_pool: Type.Optional(LoadBalancingFallbackPool),
    id: Type.Optional(WaitingroomWaitingRoomId),
    location_strategy: Type.Optional(LoadBalancingLocationStrategy),
    modified_on: Type.Optional(LoadBalancingTimestamp),
    name: Type.Optional(LoadBalancingComponentsSchemasName),
    networks: Type.Optional(LoadBalancingNetworks),
    pop_pools: Type.Optional(LoadBalancingPopPools),
    proxied: Type.Optional(LoadBalancingProxied),
    random_steering: Type.Optional(LoadBalancingRandomSteering),
    region_pools: Type.Optional(LoadBalancingRegionPools),
    rules: Type.Optional(LoadBalancingRules),
    session_affinity: Type.Optional(LoadBalancingSessionAffinity),
    session_affinity_attributes: Type.Optional(LoadBalancingSessionAffinityAttributes),
    session_affinity_ttl: Type.Optional(LoadBalancingSessionAffinityTtl),
    steering_policy: Type.Optional(LoadBalancingSteeringPolicy),
    ttl: Type.Optional(LoadBalancingTtl),
    zone_name: Type.Optional(SecurityCenterSubject),
  }),
)

export const LoadBalancingLoadBalancerComponentsSchemasSingleResponse = named(
  "load-balancing_load-balancer_components-schemas-single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: LoadBalancingLoadBalancer,
  }),
)

export const LoadBalancingLoadBalancerComponentsSchemasResponseCollection = named(
  "load-balancing_load-balancer_components-schemas-response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(LoadBalancingResultInfo),
    result: Type.Array(LoadBalancingLoadBalancer),
  }),
)

export const LoadBalancingResourceReference = named(
  "load-balancing_resource_reference",
  Type.Object(
    {
      reference_type: Type.Optional(
        Type.Union([Type.Literal("referral"), Type.Literal("referrer")], {
          description: "When listed as a reference, the type (direction) of the reference.",
          "x-auditable": true,
        }),
      ),
      references: Type.Optional(
        Type.Array(Type.Unknown({ description: "A reference to a load balancer resource." }), {
          description: "A list of references to (referrer) or from (referral) this resource.",
        }),
      ),
      resource_id: Type.Optional(Type.String()),
      resource_name: Type.Optional(
        Type.String({ description: "The human-identifiable name of the resource.", "x-auditable": true }),
      ),
      resource_type: Type.Optional(
        Type.Union([Type.Literal("load_balancer"), Type.Literal("monitor"), Type.Literal("pool")], {
          description: "The type of the resource.",
          "x-auditable": true,
        }),
      ),
    },
    { description: "A reference to a load balancer resource." },
  ),
)

export const LoadBalancingSearch = named(
  "load-balancing_search",
  Type.Object({
    resources: Type.Optional(
      Type.Array(LoadBalancingResourceReference, { description: "A list of resources matching the search query." }),
    ),
  }),
)

export const LoadBalancingRegionCode = named(
  "load-balancing_region_code",
  Type.Union(
    [
      Type.Literal("WNAM"),
      Type.Literal("ENAM"),
      Type.Literal("WEU"),
      Type.Literal("EEU"),
      Type.Literal("NSAM"),
      Type.Literal("SSAM"),
      Type.Literal("OC"),
      Type.Literal("ME"),
      Type.Literal("NAF"),
      Type.Literal("SAF"),
      Type.Literal("SAS"),
      Type.Literal("SEAS"),
      Type.Literal("NEAS"),
    ],
    {
      description:
        "A list of Cloudflare regions. WNAM: Western North America, ENAM: Eastern North America, WEU: Western Europe, EEU: Eastern Europe, NSAM: Northern South America, SSAM: Southern South America, OC: Oceania, ME: Middle East, NAF: North Africa, SAF: South Africa, SAS: Southern Asia, SEAS: South East Asia, NEAS: North East Asia).",
    },
  ),
)

export const LoadBalancingComponentsSchemasSingleResponse = named(
  "load-balancing_components-schemas-single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])], {
      description: "A list of countries and subdivisions mapped to a region.",
    }),
  }),
)

export const LoadBalancingSubdivisionCodeA2 = named(
  "load-balancing_subdivision_code_a2",
  Type.String({ description: "Two-letter subdivision code followed in ISO 3166-2.", "x-auditable": true }),
)

export const LoadBalancingRegionComponentsSchemasResponseCollection = named(
  "load-balancing_region_components-schemas-response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])]),
  }),
)

export const LoadBalancingSchemasPreviewId = named("load-balancing_schemas-preview_id", Type.String())

export const LoadBalancingMonitorGroupMember = named(
  "load-balancing_monitor-group-member",
  Type.Object({
    created_at: Type.Optional(
      Type.String({
        description: "The timestamp of when the monitor was added to the group",
        format: "date-time",
        readOnly: true,
      }),
    ),
    enabled: Type.Boolean({ description: "Whether this monitor is enabled in the group" }),
    monitor_id: LoadBalancingMonitorId,
    monitoring_only: Type.Boolean({
      description: "Whether this monitor is used for monitoring only (does not affect pool health)",
    }),
    must_be_healthy: Type.Boolean({
      description: "Whether this monitor must be healthy for the pool to be considered healthy",
    }),
    updated_at: Type.Optional(
      Type.String({
        description: "The timestamp of when the monitor group member was last updated",
        format: "date-time",
        readOnly: true,
      }),
    ),
  }),
)

export const LoadBalancingMonitorGroup = named(
  "load-balancing_monitor-group",
  Type.Object({
    created_at: Type.Optional(
      Type.String({
        description: "The timestamp of when the monitor group was created",
        format: "date-time",
        readOnly: true,
      }),
    ),
    description: Type.String({ description: "A short description of the monitor group" }),
    id: LoadBalancingMonitorGroupId,
    members: Type.Array(LoadBalancingMonitorGroupMember, { description: "List of monitors in this group" }),
    updated_at: Type.Optional(
      Type.String({
        description: "The timestamp of when the monitor group was last updated",
        format: "date-time",
        readOnly: true,
      }),
    ),
  }),
)

export const LoadBalancingMonitorGroupSingleResponse = named(
  "load-balancing_monitor-group-single-response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: LoadBalancingMonitorGroup,
  }),
)

export const LoadBalancingMonitorGroupResponseCollection = named(
  "load-balancing_monitor-group-response-collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Array(LoadBalancingMonitorGroup),
    result_info: Type.Optional(LoadBalancingResultInfo),
  }),
)

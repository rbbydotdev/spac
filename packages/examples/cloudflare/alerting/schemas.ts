import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { AaaTimestamp, IamResultInfo } from "../shared/schemas"

export const AaaComponentsSchemasMessages = named(
  "aaa_components-schemas-messages",
  Type.Array(
    Type.Object({
      code: Type.Optional(Type.Integer({ minimum: 1000 })),
      message: Type.String(),
    }),
  ),
)

export const AaaApiResponseCollection = named(
  "aaa_api-response-collection",
  Type.Object({
    errors: AaaComponentsSchemasMessages,
    messages: AaaComponentsSchemasMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: Type.Optional(IamResultInfo),
  }),
)

export const AaaPolicyId = named(
  "aaa_policy-id",
  Type.String({ description: "The unique identifier of a notification policy", maxLength: 36, "x-auditable": true }),
)

export const AaaAlertInterval = named(
  "aaa_alert_interval",
  Type.String({
    description:
      "Optional specification of how often to re-alert from the same incident, not support on all alert types.",
    "x-auditable": true,
  }),
)

export const AaaAlertType = named(
  "aaa_alert_type",
  Type.Union(
    [
      Type.Literal("access_custom_certificate_expiration_type"),
      Type.Literal("advanced_ddos_attack_l4_alert"),
      Type.Literal("advanced_ddos_attack_l7_alert"),
      Type.Literal("advanced_http_alert_error"),
      Type.Literal("bgp_hijack_notification"),
      Type.Literal("billing_usage_alert"),
      Type.Literal("block_notification_block_removed"),
      Type.Literal("block_notification_new_block"),
      Type.Literal("block_notification_review_rejected"),
      Type.Literal("bot_traffic_basic_alert"),
      Type.Literal("brand_protection_alert"),
      Type.Literal("brand_protection_digest"),
      Type.Literal("clickhouse_alert_fw_anomaly"),
      Type.Literal("clickhouse_alert_fw_ent_anomaly"),
      Type.Literal("cloudforce_one_request_notification"),
      Type.Literal("custom_analytics"),
      Type.Literal("custom_bot_detection_alert"),
      Type.Literal("custom_ssl_certificate_event_type"),
      Type.Literal("dedicated_ssl_certificate_event_type"),
      Type.Literal("device_connectivity_anomaly_alert"),
      Type.Literal("dos_attack_l4"),
      Type.Literal("dos_attack_l7"),
      Type.Literal("expiring_service_token_alert"),
      Type.Literal("failing_logpush_job_disabled_alert"),
      Type.Literal("fbm_auto_advertisement"),
      Type.Literal("fbm_dosd_attack"),
      Type.Literal("fbm_volumetric_attack"),
      Type.Literal("health_check_status_notification"),
      Type.Literal("hostname_aop_custom_certificate_expiration_type"),
      Type.Literal("http_alert_edge_error"),
      Type.Literal("http_alert_origin_error"),
      Type.Literal("image_notification"),
      Type.Literal("image_resizing_notification"),
      Type.Literal("incident_alert"),
      Type.Literal("load_balancing_health_alert"),
      Type.Literal("load_balancing_pool_enablement_alert"),
      Type.Literal("logo_match_alert"),
      Type.Literal("magic_tunnel_health_check_event"),
      Type.Literal("magic_wan_tunnel_health"),
      Type.Literal("maintenance_event_notification"),
      Type.Literal("mtls_certificate_store_certificate_expiration_type"),
      Type.Literal("pages_event_alert"),
      Type.Literal("radar_notification"),
      Type.Literal("real_origin_monitoring"),
      Type.Literal("scriptmonitor_alert_new_code_change_detections"),
      Type.Literal("scriptmonitor_alert_new_hosts"),
      Type.Literal("scriptmonitor_alert_new_malicious_hosts"),
      Type.Literal("scriptmonitor_alert_new_malicious_scripts"),
      Type.Literal("scriptmonitor_alert_new_malicious_url"),
      Type.Literal("scriptmonitor_alert_new_max_length_resource_url"),
      Type.Literal("scriptmonitor_alert_new_resources"),
      Type.Literal("secondary_dns_all_primaries_failing"),
      Type.Literal("secondary_dns_primaries_failing"),
      Type.Literal("secondary_dns_warning"),
      Type.Literal("secondary_dns_zone_successfully_updated"),
      Type.Literal("secondary_dns_zone_validation_warning"),
      Type.Literal("security_insights_alert"),
      Type.Literal("sentinel_alert"),
      Type.Literal("stream_live_notifications"),
      Type.Literal("synthetic_test_latency_alert"),
      Type.Literal("synthetic_test_low_availability_alert"),
      Type.Literal("traffic_anomalies_alert"),
      Type.Literal("tunnel_health_event"),
      Type.Literal("tunnel_update_event"),
      Type.Literal("universal_ssl_event_type"),
      Type.Literal("web_analytics_metrics_update"),
      Type.Literal("zone_aop_custom_certificate_expiration_type"),
    ],
    {
      description:
        "Refers to which event will trigger a Notification dispatch. You can use the endpoint to get available alert types which then will give you a list of possible values.",
      "x-auditable": true,
    },
  ),
)

export const AaaSchemasDescription = named(
  "aaa_schemas-description",
  Type.String({ description: "Optional description for the Notification policy.", "x-auditable": true }),
)

export const AaaEnabled = named(
  "aaa_enabled",
  Type.Boolean({
    description: "Whether or not the Notification policy is enabled.",
    default: true,
    "x-auditable": true,
  }),
)

export const AaaFilters = named(
  "aaa_filters",
  Type.Object(
    {
      actions: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Usage depends on specific alert type" }),
      ),
      affected_asns: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Used for configuring radar_notification" }),
      ),
      affected_components: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Used for configuring incident_alert" }),
      ),
      affected_locations: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Used for configuring radar_notification" }),
      ),
      airport_code: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "Used for configuring maintenance_event_notification",
        }),
      ),
      alert_trigger_preferences: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Usage depends on specific alert type" }),
      ),
      alert_trigger_preferences_value: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Usage depends on specific alert type" }),
      ),
      enabled: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "Used for configuring load_balancing_pool_enablement_alert",
        }),
      ),
      environment: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Used for configuring pages_event_alert" }),
      ),
      event: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Used for configuring pages_event_alert" }),
      ),
      event_source: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "Used for configuring load_balancing_health_alert",
        }),
      ),
      event_type: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Usage depends on specific alert type" }),
      ),
      group_by: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Usage depends on specific alert type" }),
      ),
      health_check_id: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "Used for configuring health_check_status_notification",
        }),
      ),
      incident_impact: Type.Optional(
        Type.Array(
          Type.Union(
            [
              Type.Literal("INCIDENT_IMPACT_NONE"),
              Type.Literal("INCIDENT_IMPACT_MINOR"),
              Type.Literal("INCIDENT_IMPACT_MAJOR"),
              Type.Literal("INCIDENT_IMPACT_CRITICAL"),
            ],
            { "x-auditable": true },
          ),
          { description: "Used for configuring incident_alert" },
        ),
      ),
      input_id: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "Used for configuring stream_live_notifications",
        }),
      ),
      insight_class: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "Used for configuring security_insights_alert",
        }),
      ),
      limit: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Used for configuring billing_usage_alert" }),
      ),
      logo_tag: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Used for configuring logo_match_alert" }),
      ),
      megabits_per_second: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "Used for configuring advanced_ddos_attack_l4_alert",
        }),
      ),
      new_health: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "Used for configuring load_balancing_health_alert",
        }),
      ),
      new_status: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Used for configuring tunnel_health_event" }),
      ),
      packets_per_second: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "Used for configuring advanced_ddos_attack_l4_alert",
        }),
      ),
      pool_id: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Usage depends on specific alert type" }),
      ),
      pop_names: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Usage depends on specific alert type" }),
      ),
      product: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Used for configuring billing_usage_alert" }),
      ),
      project_id: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Used for configuring pages_event_alert" }),
      ),
      protocol: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "Used for configuring advanced_ddos_attack_l4_alert",
        }),
      ),
      query_tag: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Usage depends on specific alert type" }),
      ),
      requests_per_second: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "Used for configuring advanced_ddos_attack_l7_alert",
        }),
      ),
      selectors: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Usage depends on specific alert type" }),
      ),
      services: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "Used for configuring clickhouse_alert_fw_ent_anomaly",
        }),
      ),
      slo: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Usage depends on specific alert type" }),
      ),
      status: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "Used for configuring health_check_status_notification",
        }),
      ),
      target_hostname: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "Used for configuring advanced_ddos_attack_l7_alert",
        }),
      ),
      target_ip: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "Used for configuring advanced_ddos_attack_l4_alert",
        }),
      ),
      target_zone_name: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "Used for configuring advanced_ddos_attack_l7_alert",
        }),
      ),
      traffic_exclusions: Type.Optional(
        Type.Array(Type.Union([Type.Literal("security_events")], { "x-auditable": true }), {
          description: "Used for configuring traffic_anomalies_alert",
        }),
      ),
      tunnel_id: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Used for configuring tunnel_health_event" }),
      ),
      tunnel_name: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Usage depends on specific alert type" }),
      ),
      where: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Usage depends on specific alert type" }),
      ),
      zones: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), { description: "Usage depends on specific alert type" }),
      ),
    },
    {
      description:
        "Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available for select alert types. See alert type documentation for more details.",
    },
  ),
)

export const AaaUuid = named("aaa_uuid", Type.String({ description: "UUID", maxLength: 36, "x-auditable": true }))

export const AaaMechanisms = named(
  "aaa_mechanisms",
  Type.Object(
    {
      email: Type.Optional(
        Type.Array(
          Type.Object({
            id: Type.Optional(Type.String({ description: "The email address", "x-auditable": true })),
          }),
        ),
      ),
      pagerduty: Type.Optional(
        Type.Array(
          Type.Object({
            id: Type.Optional(AaaUuid),
          }),
        ),
      ),
      webhooks: Type.Optional(
        Type.Array(
          Type.Object({
            id: Type.Optional(AaaUuid),
          }),
        ),
      ),
    },
    {
      description:
        "List of IDs that will be used when dispatching a notification. IDs for email type will be the email address.",
    },
  ),
)

export const AaaSchemasName = named(
  "aaa_schemas-name",
  Type.String({ description: "Name of the policy.", "x-auditable": true }),
)

export const AaaPolicies = named(
  "aaa_policies",
  Type.Object({
    alert_interval: Type.Optional(AaaAlertInterval),
    alert_type: Type.Optional(AaaAlertType),
    created: Type.Optional(AaaTimestamp),
    description: Type.Optional(AaaSchemasDescription),
    enabled: Type.Optional(AaaEnabled),
    filters: Type.Optional(AaaFilters),
    id: Type.Optional(AaaPolicyId),
    mechanisms: Type.Optional(AaaMechanisms),
    modified: Type.Optional(AaaTimestamp),
    name: Type.Optional(AaaSchemasName),
  }),
)

export const AaaSingleResponse = named(
  "aaa_single_response",
  Type.Object({
    errors: AaaComponentsSchemasMessages,
    messages: AaaComponentsSchemasMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result: Type.Optional(AaaPolicies),
  }),
)

export const AaaPoliciesComponentsSchemasResponseCollection = named(
  "aaa_policies_components-schemas-response_collection",
  Type.Object({
    errors: AaaComponentsSchemasMessages,
    messages: AaaComponentsSchemasMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result: Type.Optional(Type.Array(AaaPolicies)),
  }),
)

export const AaaBefore = named(
  "aaa_before",
  Type.String({
    description:
      "Limit the returned results to history records older than the specified date. This must be a timestamp that conforms to RFC3339.",
    format: "date-time",
  }),
)

export const AaaPerPage = named(
  "aaa_per_page",
  Type.Number({ description: "Number of items per page.", default: 25, minimum: 5, maximum: 1000 }),
)

export const AaaAlertBody = named(
  "aaa_alert_body",
  Type.String({ description: "Message body included in the notification sent." }),
)

export const AaaSchemasAlertType = named(
  "aaa_schemas-alert_type",
  Type.String({ description: "Type of notification that has been dispatched." }),
)

export const AaaComponentsSchemasDescription = named(
  "aaa_components-schemas-description",
  Type.String({ description: "Description of the notification policy (if present)." }),
)

export const AaaMechanism = named(
  "aaa_mechanism",
  Type.String({ description: "The mechanism to which the notification has been dispatched.", "x-auditable": true }),
)

export const AaaMechanismType = named(
  "aaa_mechanism_type",
  Type.Union([Type.Literal("email"), Type.Literal("pagerduty"), Type.Literal("webhook")], {
    description:
      "The type of mechanism to which the notification has been dispatched. This can be email/pagerduty/webhook based on the mechanism configured.",
  }),
)

export const AaaSent = named(
  "aaa_sent",
  Type.String({
    description: "Timestamp of when the notification was dispatched in ISO 8601 format.",
    format: "date-time",
  }),
)

export const AaaHistory = named(
  "aaa_history",
  Type.Object({
    alert_body: Type.Optional(AaaAlertBody),
    alert_type: Type.Optional(AaaSchemasAlertType),
    description: Type.Optional(AaaComponentsSchemasDescription),
    id: Type.Optional(AaaUuid),
    mechanism: Type.Optional(AaaMechanism),
    mechanism_type: Type.Optional(AaaMechanismType),
    name: Type.Optional(AaaSchemasName),
    policy_id: Type.Optional(AaaPolicyId),
    sent: Type.Optional(AaaSent),
  }),
)

export const AaaHistoryComponentsSchemasResponseCollection = named(
  "aaa_history_components-schemas-response_collection",
  Type.Object({
    errors: AaaComponentsSchemasMessages,
    messages: AaaComponentsSchemasMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: Type.Optional(IamResultInfo),
    result: Type.Optional(Type.Array(AaaHistory)),
  }),
)

export const AaaWebhookId = named(
  "aaa_webhook-id",
  Type.String({ description: "The unique identifier of a webhook", maxLength: 36, "x-auditable": true }),
)

export const AaaCreatedAt = named(
  "aaa_created_at",
  Type.String({
    description: "Timestamp of when the webhook destination was created.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const AaaLastFailure = named(
  "aaa_last_failure",
  Type.String({
    description: "Timestamp of the last time an attempt to dispatch a notification to this webhook failed.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const AaaLastSuccess = named(
  "aaa_last_success",
  Type.String({
    description:
      "Timestamp of the last time Cloudflare was able to successfully dispatch a notification using this webhook.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const AaaComponentsSchemasName = named(
  "aaa_components-schemas-name",
  Type.String({
    description:
      "The name of the webhook destination. This will be included in the request body when you receive a webhook notification.",
    "x-auditable": true,
  }),
)

export const AaaSecret = named(
  "aaa_secret",
  Type.String({
    description:
      "Optional secret that will be passed in the `cf-webhook-auth` header when dispatching generic webhook notifications or formatted for supported destinations. Secrets are not returned in any API response body.",
    writeOnly: true,
    "x-sensitive": true,
  }),
)

export const AaaComponentsSchemasType = named(
  "aaa_components-schemas-type",
  Type.Union(
    [
      Type.Literal("datadog"),
      Type.Literal("discord"),
      Type.Literal("feishu"),
      Type.Literal("gchat"),
      Type.Literal("generic"),
      Type.Literal("opsgenie"),
      Type.Literal("slack"),
      Type.Literal("splunk"),
    ],
    { description: "Type of webhook endpoint.", "x-auditable": true },
  ),
)

export const AaaUrl = named(
  "aaa_url",
  Type.String({ description: "The POST endpoint to call when dispatching a notification." }),
)

export const AaaWebhooks = named(
  "aaa_webhooks",
  Type.Object({
    created_at: Type.Optional(AaaCreatedAt),
    id: Type.Optional(AaaWebhookId),
    last_failure: Type.Optional(AaaLastFailure),
    last_success: Type.Optional(AaaLastSuccess),
    name: Type.Optional(AaaComponentsSchemasName),
    secret: Type.Optional(AaaSecret),
    type: Type.Optional(AaaComponentsSchemasType),
    url: Type.Optional(AaaUrl),
  }),
)

export const AaaSchemasSingleResponse = named(
  "aaa_schemas-single_response",
  Type.Object({
    errors: AaaComponentsSchemasMessages,
    messages: AaaComponentsSchemasMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result: Type.Optional(AaaWebhooks),
  }),
)

export const AaaWebhooksComponentsSchemasResponseCollection = named(
  "aaa_webhooks_components-schemas-response_collection",
  Type.Object({
    errors: AaaComponentsSchemasMessages,
    messages: AaaComponentsSchemasMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result: Type.Optional(Type.Array(AaaWebhooks)),
  }),
)

export const AaaIntegrationToken = named(
  "aaa_integration-token",
  Type.String({ description: "The token integration key", maxLength: 32, readOnly: true }),
)

export const AaaIdResponse = named(
  "aaa_id_response",
  Type.Object({
    errors: AaaComponentsSchemasMessages,
    messages: AaaComponentsSchemasMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result: Type.Optional(
      Type.Object({
        id: Type.Optional(AaaUuid),
      }),
    ),
  }),
)

export const AaaToken = named(
  "aaa_token",
  Type.String({ description: "token in form of UUID", maxLength: 36, "x-sensitive": true }),
)

export const AaaSensitiveIdResponse = named(
  "aaa_sensitive_id_response",
  Type.Object({
    errors: AaaComponentsSchemasMessages,
    messages: AaaComponentsSchemasMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result: Type.Optional(
      Type.Object({
        id: Type.Optional(AaaToken),
      }),
    ),
  }),
)

export const AaaSchemasApiResponseCommon = named(
  "aaa_schemas-api-response-common",
  Type.Object({
    errors: AaaComponentsSchemasMessages,
    messages: AaaComponentsSchemasMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const AaaName = named(
  "aaa_name",
  Type.String({ description: "The name of the pagerduty service.", "x-auditable": true }),
)

export const AaaPagerduty = named(
  "aaa_pagerduty",
  Type.Object({
    id: Type.Optional(AaaUuid),
    name: Type.Optional(AaaName),
  }),
)

export const AaaComponentsSchemasResponseCollection = named(
  "aaa_components-schemas-response_collection",
  Type.Object({
    errors: AaaComponentsSchemasMessages,
    messages: AaaComponentsSchemasMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result: Type.Optional(Type.Array(AaaPagerduty)),
  }),
)

export const AaaEligible = named(
  "aaa_eligible",
  Type.Boolean({
    description: "Determines whether or not the account is eligible for the delivery mechanism.",
    "x-auditable": true,
  }),
)

export const AaaReady = named(
  "aaa_ready",
  Type.Boolean({
    description:
      "Beta flag. Users can create a policy with a mechanism that is not ready, but we cannot guarantee successful delivery of notifications.",
    "x-auditable": true,
  }),
)

export const AaaSchemasType = named(
  "aaa_schemas-type",
  Type.Union([Type.Literal("email"), Type.Literal("pagerduty"), Type.Literal("webhook")], {
    description: "Determines type of delivery mechanism.",
    "x-auditable": true,
  }),
)

export const AaaEligibility = named(
  "aaa_eligibility",
  Type.Object({
    eligible: Type.Optional(AaaEligible),
    ready: Type.Optional(AaaReady),
    type: Type.Optional(AaaSchemasType),
  }),
)

export const AaaSchemasResponseCollection = named(
  "aaa_schemas-response_collection",
  Type.Object({
    errors: AaaComponentsSchemasMessages,
    messages: AaaComponentsSchemasMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result: Type.Optional(Type.Record(Type.String(), Type.Array(AaaEligibility))),
  }),
)

export const AaaAccountId = named(
  "aaa_account-id",
  Type.String({ description: "The account id", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const AaaComponentsSchemasApiResponseCommonFailure = named(
  "aaa_components-schemas-api-response-common-failure",
  Type.Object({
    errors: AaaComponentsSchemasMessages,
    messages: AaaComponentsSchemasMessages,
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful" }),
  }),
)

export const AaaDescription = named(
  "aaa_description",
  Type.String({ description: "Describes the alert type.", "x-auditable": true }),
)

export const AaaDisplayName = named(
  "aaa_display_name",
  Type.String({ description: "Alert type name.", "x-auditable": true }),
)

export const AaaFilterOptions = named(
  "aaa_filter_options",
  Type.Array(Type.Unknown(), {
    description:
      "Format of additional configuration options (filters) for the alert type. Data type of filters during policy creation: Array of strings.",
  }),
)

export const AaaType = named(
  "aaa_type",
  Type.String({ description: "Use this value when creating and updating a notification policy.", "x-auditable": true }),
)

export const AaaAlertTypes = named(
  "aaa_alert-types",
  Type.Object({
    description: Type.Optional(AaaDescription),
    display_name: Type.Optional(AaaDisplayName),
    filter_options: Type.Optional(AaaFilterOptions),
    type: Type.Optional(AaaType),
  }),
)

export const AaaAlertsResponseCollection = named(
  "aaa_alerts-response_collection",
  Type.Object({
    errors: AaaComponentsSchemasMessages,
    messages: AaaComponentsSchemasMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result: Type.Optional(Type.Record(Type.String(), Type.Array(AaaAlertTypes))),
  }),
)

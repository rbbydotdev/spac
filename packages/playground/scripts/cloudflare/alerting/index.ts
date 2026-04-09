import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { IamResultInfo } from "../shared/schemas"
import {
  AaaAlertInterval,
  AaaAlertType,
  AaaAlertsResponseCollection,
  AaaApiResponseCollection,
  AaaBefore,
  AaaComponentsSchemasApiResponseCommonFailure,
  AaaComponentsSchemasMessages,
  AaaComponentsSchemasName,
  AaaComponentsSchemasResponseCollection,
  AaaEnabled,
  AaaFilters,
  AaaHistory,
  AaaHistoryComponentsSchemasResponseCollection,
  AaaIdResponse,
  AaaIntegrationToken,
  AaaMechanisms,
  AaaPerPage,
  AaaPolicies,
  AaaPoliciesComponentsSchemasResponseCollection,
  AaaPolicyId,
  AaaSchemasApiResponseCommon,
  AaaSchemasDescription,
  AaaSchemasName,
  AaaSchemasResponseCollection,
  AaaSchemasSingleResponse,
  AaaSecret,
  AaaSensitiveIdResponse,
  AaaSingleResponse,
  AaaUrl,
  AaaUuid,
  AaaWebhookId,
  AaaWebhooks,
  AaaWebhooksComponentsSchemasResponseCollection,
} from "./schemas"

export function registerAlerting(api: Api) {
  api.assertVersion("3.0.3", "Alerting")

  api.group("/accounts/{account_id}/alerting/v3", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/available_alerts", {})
      .response(AaaAlertsResponseCollection)
      .error("4XX", AaaComponentsSchemasApiResponseCommonFailure)
      .summary("Get Alert Types")
      .description("Gets a list of all alert types for which an account is eligible.")
      .operationId("notification-alert-types-get-alert-types")
      .tag("Notification Alert Types")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Zero Trust: PII Read",
        "Notifications Write",
        "Notifications Read",
        "Account Settings Write",
        "Account Settings Read",
      ])

    g.get("/destinations/eligible", {})
      .response(AaaSchemasResponseCollection)
      .error("4XX", AaaComponentsSchemasApiResponseCommonFailure)
      .summary("Get delivery mechanism eligibility")
      .description("Get a list of all delivery mechanism types for which an account is eligible.")
      .operationId("notification-mechanism-eligibility-get-delivery-mechanism-eligibility")
      .tag("Notification Mechanism Eligibility")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/destinations/pagerduty", {})
      .response(AaaComponentsSchemasResponseCollection)
      .error("4XX", AaaComponentsSchemasApiResponseCommonFailure)
      .summary("List PagerDuty services")
      .description("Get a list of all configured PagerDuty services.")
      .operationId("notification-destinations-with-pager-duty-list-pager-duty-services")
      .tag("Notification destinations with PagerDuty")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Zero Trust: PII Read",
        "Notifications Write",
        "Notifications Read",
        "Account Settings Write",
        "Account Settings Read",
      ])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.delete("/destinations/pagerduty", {})
      .response(AaaSchemasApiResponseCommon)
      .error("4XX", AaaComponentsSchemasApiResponseCommonFailure)
      .summary("Delete PagerDuty Services")
      .description("Deletes all the PagerDuty Services connected to the account.")
      .operationId("notification-destinations-with-pager-duty-delete-pager-duty-services")
      .tag("Notification destinations with PagerDuty")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Notifications Write", "Account Settings Write"])

    g.post("/destinations/pagerduty/connect", {})
      .respond(201, AaaSensitiveIdResponse)
      .error(
        "4XX",
        Type.Object({
          errors: AaaComponentsSchemasMessages,
          messages: AaaComponentsSchemasMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result: Type.Optional(
            Type.Object({
              id: Type.Optional(AaaUuid),
            }),
          ),
        }),
      )
      .summary("Create PagerDuty integration token")
      .description("Creates a new token for integrating with PagerDuty.")
      .operationId("notification-destinations-with-pager-duty-connect-pager-duty")
      .tag("Notification destinations with PagerDuty")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Notifications Write", "Account Settings Write"])

    g.get("/destinations/pagerduty/connect/{token_id}", {
      params: Type.Object({ token_id: AaaIntegrationToken }),
    })
      .response(AaaIdResponse)
      .error(
        "4XX",
        Type.Object({
          errors: AaaComponentsSchemasMessages,
          messages: AaaComponentsSchemasMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result: Type.Optional(
            Type.Object({
              id: Type.Optional(AaaUuid),
            }),
          ),
        }),
      )
      .summary("Connect PagerDuty")
      .description("Links PagerDuty with the account using the integration token.")
      .operationId("notification-destinations-with-pager-duty-connect-pager-duty-token")
      .tag("Notification destinations with PagerDuty")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Notifications Write", "Account Settings Write"])

    g.get("/destinations/webhooks", {})
      .response(AaaWebhooksComponentsSchemasResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: AaaComponentsSchemasMessages,
          messages: AaaComponentsSchemasMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result: Type.Optional(Type.Array(AaaWebhooks)),
        }),
      )
      .summary("List webhooks")
      .description("Gets a list of all configured webhook destinations.")
      .operationId("notification-webhooks-list-webhooks")
      .tag("Notification webhooks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Zero Trust: PII Read",
        "Notifications Write",
        "Notifications Read",
        "Account Settings Write",
        "Account Settings Read",
      ])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.post("/destinations/webhooks", {
      body: Type.Object({
        name: AaaComponentsSchemasName,
        secret: Type.Optional(AaaSecret),
        url: AaaUrl,
      }),
    })
      .respond(201, AaaIdResponse)
      .error(
        "4XX",
        Type.Object({
          errors: AaaComponentsSchemasMessages,
          messages: AaaComponentsSchemasMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result: Type.Optional(
            Type.Object({
              id: Type.Optional(AaaUuid),
            }),
          ),
        }),
      )
      .summary("Create a webhook")
      .description("Creates a new webhook destination.")
      .operationId("notification-webhooks-create-a-webhook")
      .tag("Notification webhooks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Notifications Write", "Account Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/destinations/webhooks/{webhook_id}", {
      params: Type.Object({ webhook_id: AaaWebhookId }),
    })
      .response(AaaSchemasSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: AaaComponentsSchemasMessages,
          messages: AaaComponentsSchemasMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result: Type.Optional(AaaWebhooks),
        }),
      )
      .summary("Get a webhook")
      .description("Get details for a single webhooks destination.")
      .operationId("notification-webhooks-get-a-webhook")
      .tag("Notification webhooks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Zero Trust: PII Read",
        "Notifications Write",
        "Notifications Read",
        "Account Settings Write",
        "Account Settings Read",
      ])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.put("/destinations/webhooks/{webhook_id}", {
      params: Type.Object({ webhook_id: AaaWebhookId }),
      body: Type.Object({
        name: AaaComponentsSchemasName,
        secret: Type.Optional(AaaSecret),
        url: AaaUrl,
      }),
    })
      .response(AaaIdResponse)
      .error(
        "4XX",
        Type.Object({
          errors: AaaComponentsSchemasMessages,
          messages: AaaComponentsSchemasMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result: Type.Optional(
            Type.Object({
              id: Type.Optional(AaaUuid),
            }),
          ),
        }),
      )
      .summary("Update a webhook")
      .description("Update a webhook destination.")
      .operationId("notification-webhooks-update-a-webhook")
      .tag("Notification webhooks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Notifications Write", "Account Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.delete("/destinations/webhooks/{webhook_id}", {
      params: Type.Object({ webhook_id: AaaWebhookId }),
    })
      .response(AaaSchemasApiResponseCommon)
      .error("4XX", AaaComponentsSchemasApiResponseCommonFailure)
      .summary("Delete a webhook")
      .description("Delete a configured webhook destination.")
      .operationId("notification-webhooks-delete-a-webhook")
      .tag("Notification webhooks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Notifications Write", "Account Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/history", {
      query: Type.Object({
        per_page: Type.Optional(AaaPerPage),
        before: Type.Optional(AaaBefore),
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        since: Type.Optional(
          Type.String({
            description:
              "Limit the returned results to history records newer than the specified date. This must be a timestamp that conforms to RFC3339.",
            format: "date-time",
          }),
        ),
      }),
    })
      .response(AaaHistoryComponentsSchemasResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: AaaComponentsSchemasMessages,
          messages: AaaComponentsSchemasMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result_info: Type.Optional(IamResultInfo),
          result: Type.Optional(Type.Array(AaaHistory)),
        }),
      )
      .summary("List History")
      .description(
        "Gets a list of history records for notifications sent to an account. The records are displayed for last `x` number of days based on the zone plan (free = 30, pro = 30, biz = 30, ent = 90).",
      )
      .operationId("notification-history-list-history")
      .tag("Notification History")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Zero Trust: PII Read",
        "Notifications Write",
        "Notifications Read",
        "Account Settings Write",
        "Account Settings Read",
      ])

    g.get("/policies", {})
      .response(AaaPoliciesComponentsSchemasResponseCollection)
      .error("4XX", AaaComponentsSchemasApiResponseCommonFailure)
      .summary("List Notification policies")
      .description("Get a list of all Notification policies.")
      .operationId("notification-policies-list-notification-policies")
      .tag("Notification policies")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Zero Trust: PII Read",
        "Notifications Write",
        "Notifications Read",
        "Account Settings Write",
        "Account Settings Read",
      ])

    g.post("/policies", {
      body: Type.Object({
        alert_interval: Type.Optional(AaaAlertInterval),
        alert_type: AaaAlertType,
        description: Type.Optional(AaaSchemasDescription),
        enabled: AaaEnabled,
        filters: Type.Optional(AaaFilters),
        mechanisms: AaaMechanisms,
        name: AaaSchemasName,
      }),
    })
      .response(AaaIdResponse)
      .error(
        "4XX",
        Type.Object({
          errors: AaaComponentsSchemasMessages,
          messages: AaaComponentsSchemasMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result: Type.Optional(
            Type.Object({
              id: Type.Optional(AaaUuid),
            }),
          ),
        }),
      )
      .summary("Create a Notification policy")
      .description("Creates a new Notification policy.")
      .operationId("notification-policies-create-a-notification-policy")
      .tag("Notification policies")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Notifications Write", "Account Settings Write"])

    g.get("/policies/{policy_id}", {
      params: Type.Object({ policy_id: AaaPolicyId }),
    })
      .response(AaaSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: AaaComponentsSchemasMessages,
          messages: AaaComponentsSchemasMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result: Type.Optional(AaaPolicies),
        }),
      )
      .summary("Get a Notification policy")
      .description("Get details for a single policy.")
      .operationId("notification-policies-get-a-notification-policy")
      .tag("Notification policies")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Zero Trust: PII Read",
        "Notifications Write",
        "Notifications Read",
        "Account Settings Write",
        "Account Settings Read",
      ])

    g.put("/policies/{policy_id}", {
      params: Type.Object({ policy_id: AaaPolicyId }),
      body: Type.Object({
        alert_interval: Type.Optional(AaaAlertInterval),
        alert_type: Type.Optional(AaaAlertType),
        description: Type.Optional(AaaSchemasDescription),
        enabled: Type.Optional(AaaEnabled),
        filters: Type.Optional(AaaFilters),
        mechanisms: Type.Optional(AaaMechanisms),
        name: Type.Optional(AaaSchemasName),
      }),
    })
      .response(AaaIdResponse)
      .error(
        "4XX",
        Type.Object({
          errors: AaaComponentsSchemasMessages,
          messages: AaaComponentsSchemasMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result: Type.Optional(
            Type.Object({
              id: Type.Optional(AaaUuid),
            }),
          ),
        }),
      )
      .summary("Update a Notification policy")
      .description("Update a Notification policy.")
      .operationId("notification-policies-update-a-notification-policy")
      .tag("Notification policies")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Notifications Write", "Account Settings Write"])

    g.delete("/policies/{policy_id}", {
      params: Type.Object({ policy_id: AaaPolicyId }),
    })
      .response(AaaApiResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: AaaComponentsSchemasMessages,
          messages: AaaComponentsSchemasMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result_info: Type.Optional(IamResultInfo),
        }),
      )
      .summary("Delete a Notification policy")
      .description("Delete a Notification policy.")
      .operationId("notification-policies-delete-a-notification-policy")
      .tag("Notification policies")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Notifications Write", "Account Settings Write"])
  })
}

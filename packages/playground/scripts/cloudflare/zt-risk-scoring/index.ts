import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpApiResponseCommonFailure, DlpEmpty, DlpMessages } from "../shared/schemas"
import {
  DlpBehaviors,
  DlpCreateintegrationbody,
  DlpRiskevents,
  DlpRiskscoreintegration,
  DlpRiskscoreintegrationarray,
  DlpRisksummary,
  DlpUpdatebehaviors,
  DlpUpdateintegrationbody,
} from "./schemas"

export function registerZtRiskScoring(api: Api) {
  api.assertVersion("3.0.3", "ZtRiskScoring")

  api.group("/accounts/{account_id}/zt_risk_scoring", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/behaviors", {})
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpBehaviors),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Get all behaviors and associated configuration")
      .operationId("dlp-risk-score-behaviors-get")
      .tag("Zero Trust Risk Scoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.put("/behaviors", {
      body: DlpUpdatebehaviors,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpUpdatebehaviors),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Update configuration for risk behaviors")
      .operationId("dlp-risk-score-behaviors-put")
      .tag("Zero Trust Risk Scoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/integrations", {})
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpRiskscoreintegrationarray),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("List all risk score integrations for the account.")
      .operationId("dlp-zt-risk-score-integration-list")
      .tag("Zero Trust Risk Scoring Integrations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.post("/integrations", {
      body: DlpCreateintegrationbody,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpRiskscoreintegration),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Create new risk score integration.")
      .operationId("dlp-zt-risk-score-integration-create")
      .tag("Zero Trust Risk Scoring Integrations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/integrations/reference_id/{reference_id}", {
      params: Type.Object({ reference_id: Type.String() }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpRiskscoreintegration),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Get risk score integration by reference id.")
      .operationId("dlp-zt-risk-score-integration-get-by-reference-id")
      .tag("Zero Trust Risk Scoring Integrations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.get("/integrations/{integration_id}", {
      params: Type.Object({ integration_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpRiskscoreintegration),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Get risk score integration by id.")
      .operationId("dlp-zt-risk-score-integration-get")
      .tag("Zero Trust Risk Scoring Integrations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.put("/integrations/{integration_id}", {
      params: Type.Object({ integration_id: Type.String({ format: "uuid" }) }),
      body: DlpUpdateintegrationbody,
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpRiskscoreintegration),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Update a risk score integration.")
      .description("Overwrite the reference_id, tenant_url, and active values with the ones provided.")
      .operationId("dlp-zt-risk-score-integration-update")
      .tag("Zero Trust Risk Scoring Integrations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.delete("/integrations/{integration_id}", {
      params: Type.Object({ integration_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpEmpty),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Delete a risk score integration.")
      .operationId("dlp-zt-risk-score-integration-delete")
      .tag("Zero Trust Risk Scoring Integrations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/summary", {})
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
              per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
              total_count: Type.Optional(
                Type.Number({ description: "Total results available without any search parameters." }),
              ),
            }),
          ),
          result: Type.Optional(DlpRisksummary),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Get risk score info for all users in the account")
      .operationId("dlp-risk-score-summary-get")
      .tag("Zero Trust Risk Scoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust: PII Read"])

    g.get("/{user_id}", {
      params: Type.Object({ user_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
              per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
              total_count: Type.Optional(
                Type.Number({ description: "Total results available without any search parameters." }),
              ),
            }),
          ),
          result: Type.Optional(DlpRiskevents),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Get risk event/score information for a specific user")
      .operationId("dlp-risk-score-summary-get-for-user")
      .tag("Zero Trust Risk Scoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust: PII Read"])

    g.post("/{user_id}/reset", {
      params: Type.Object({ user_id: Type.String({ format: "uuid" }) }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DlpEmpty),
        }),
      )
      .error("4XX", DlpApiResponseCommonFailure)
      .summary("Clear the risk score for a particular user")
      .operationId("dlp-risk-score-reset-post")
      .tag("Zero Trust Risk Scoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])
  })
}

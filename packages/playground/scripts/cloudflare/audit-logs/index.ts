import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { AaaAuditLogsResponseCollection, AaaIdentifier, Result } from "../shared/schemas"

export function registerAuditLogs(api: Api) {
  api.assertVersion("3.0.3", "AuditLogs")

  api
    .get("/accounts/{account_id}/audit_logs", {
      params: Type.Object({ account_id: AaaIdentifier }),
      query: Type.Object({
        id: Type.Optional(Type.String({ description: "Finds a specific log by its ID." })),
        export: Type.Optional(
          Type.Boolean({ description: "Indicates that this request is an export of logs in CSV format." }),
        ),
        "action.type": Type.Optional(Type.String({ description: "Filters by the action type." })),
        "actor.ip": Type.Optional(
          Type.String({
            description:
              "Filters by the IP address of the request that made the change by specific IP address or valid CIDR Range.",
          }),
        ),
        "actor.email": Type.Optional(
          Type.String({
            description: "Filters by the email address of the actor that made the change.",
            format: "email",
          }),
        ),
        since: Type.Optional(
          Type.Union([
            Type.String({
              description:
                "Limits the returned results to logs newer than the specified date. A `full-date` that conforms to RFC3339.",
              format: "date",
              "x-stainless-variantName": "full_date",
            }),
            Type.String({
              description:
                "Limits the returned results to logs newer than the specified date. A `date-time` that conforms to RFC3339.",
              format: "date-time",
              "x-stainless-variantName": "date_time",
            }),
          ]),
        ),
        before: Type.Optional(
          Type.Union([
            Type.String({
              description:
                "Limits the returned results to logs older than the specified date. A `full-date` that conforms to RFC3339.",
              format: "date",
              "x-stainless-variantName": "full_date",
            }),
            Type.String({
              description:
                "Limits the returned results to logs older than the specified date. A `date-time` that conforms to RFC3339.",
              format: "date-time",
              "x-stainless-variantName": "date_time",
            }),
          ]),
        ),
        "zone.name": Type.Optional(
          Type.String({ description: "Filters by the name of the zone associated to the change." }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("desc"), Type.Literal("asc")], {
            description: "Changes the direction of the chronological sorting.",
          }),
        ),
        per_page: Type.Optional(
          Type.Number({
            description: "Sets the number of results to return per page.",
            default: 100,
            minimum: 1,
            maximum: 1000,
          }),
        ),
        page: Type.Optional(
          Type.Number({ description: "Defines which page of results to return.", default: 1, minimum: 1 }),
        ),
        hide_user_logs: Type.Optional(
          Type.Boolean({ description: "Indicates whether or not to hide user level audit logs.", default: false }),
        ),
      }),
    })
    .response(AaaAuditLogsResponseCollection)
    .error("4XX", Result)
    .summary("Get account audit logs")
    .description(
      "Gets a list of audit logs for an account. Can be filtered by who made the change, on which zone, and the timeframe of the change.",
    )
    .operationId("audit-logs-get-account-audit-logs")
    .tag("Audit Logs")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write", "Account Settings Read"])
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
}

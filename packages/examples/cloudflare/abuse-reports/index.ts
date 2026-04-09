import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  AbuseReportsReporttype,
  AbuseReportsSubmiterrorresponse,
  AbuseReportsSubmitreportrequest,
  AbuseReportsSubmitreportresponse,
} from "./schemas"

export function registerAbuseReports(api: Api) {
  api
    .post("/accounts/{account_id}/abuse-reports/{report_type}", {
      params: Type.Object({ account_id: Type.String({ maxLength: 32 }), report_type: AbuseReportsReporttype }),
      body: AbuseReportsSubmitreportrequest,
      responses: {
        200: AbuseReportsSubmitreportresponse,
        400: AbuseReportsSubmiterrorresponse,
        500: AbuseReportsSubmiterrorresponse,
      },
    })
    .summary("Submit the Abuse Report of a particular type")
    .operationId("SubmitAbuseReport")
    .tag("tseng-abuse-complaint-processor_other")
    .security({ api_token: [] })
    .extension("x-api-token-group", ["Trust and Safety Write"])
}

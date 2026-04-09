import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  AbuseReportsReporttype,
  AbuseReportsSubmiterrorresponse,
  AbuseReportsSubmitreportrequest,
  AbuseReportsSubmitreportresponse,
} from "./schemas"

export function registerAbuseReports(api: Api) {
  api.assertVersion("3.0.3", "AbuseReports")

  api
    .post("/accounts/{account_id}/abuse-reports/{report_type}", {
      params: Type.Object({ account_id: Type.String({ maxLength: 32 }), report_type: AbuseReportsReporttype }),
      body: AbuseReportsSubmitreportrequest,
    })
    .response(AbuseReportsSubmitreportresponse)
    .error(400, AbuseReportsSubmiterrorresponse)
    .error(500, AbuseReportsSubmiterrorresponse)
    .summary("Submit the Abuse Report of a particular type")
    .operationId("SubmitAbuseReport")
    .tag("tseng-abuse-complaint-processor_other")
    .security({ api_token: [] })
    .extension("x-api-token-group", ["Trust and Safety Write"])
}

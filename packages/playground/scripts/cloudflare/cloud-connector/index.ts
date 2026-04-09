import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages } from "../shared/schemas"
import { CloudConnectorApiResponseCommonFailure, CloudConnectorRule, CloudConnectorRules } from "./schemas"

export function registerCloudConnector(api: Api) {
  api.assertVersion("3.0.3", "CloudConnector")

  api.group("/zones/{zone_id}/cloud_connector/rules", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {})
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudConnectorRules),
        }),
      )
      .error("4XX", CloudConnectorApiResponseCommonFailure)
      .error("5XX", CloudConnectorApiResponseCommonFailure)
      .summary("Rules")
      .operationId("zone-cloud-connector-rules")
      .tag("Zone Cloud Connector Rules GET")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Connector Read", "Cloud Connector Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/", {
      body: Type.Array(CloudConnectorRule),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(CloudConnectorRules),
        }),
      )
      .error("4XX", CloudConnectorApiResponseCommonFailure)
      .error("5XX", CloudConnectorApiResponseCommonFailure)
      .summary("Put Rules")
      .operationId("zone-cloud-conenctor-rules-put")
      .tag("Zone Cloud Connector Rules PUT")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Connector Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

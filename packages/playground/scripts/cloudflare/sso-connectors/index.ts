import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { IamApiResponseCommonFailure, IamApiResponseSingleId } from "../shared/schemas"
import {
  IamApiResponseSingle,
  IamSsoConnectorCollectionResponse,
  IamSsoConnectorIdentifier,
  IamSsoConnectorResponse,
} from "./schemas"

export function registerSsoConnectors(api: Api) {
  api.assertVersion("3.0.3", "SsoConnectors")

  api.group("/accounts/{account_id}/sso_connectors", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {})
      .response(IamSsoConnectorCollectionResponse)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Get all SSO connectors")
      .operationId("get-all-sso-connectors")
      .tag("SSO")
      .security({ api_token: [] })
      .extension("x-api-token-group", null)
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/", {
      body: Type.Object({
        begin_verification: Type.Optional(
          Type.Boolean({ description: "Begin the verification process after creation", default: true }),
        ),
        email_domain: Type.String({ description: "Email domain of the new SSO connector" }),
      }),
    })
      .response(IamSsoConnectorResponse)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Initialize new SSO connector")
      .operationId("init-new-sso-connector")
      .tag("SSO")
      .security({ api_token: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.sso-connector.create"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{sso_connector_id}", {
      params: Type.Object({ sso_connector_id: IamSsoConnectorIdentifier }),
    })
      .response(IamSsoConnectorResponse)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Get single SSO connector")
      .operationId("get-sso-connector")
      .tag("SSO")
      .security({ api_token: [] })
      .extension("x-api-token-group", null)
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/{sso_connector_id}", {
      params: Type.Object({ sso_connector_id: IamSsoConnectorIdentifier }),
      body: Type.Object({
        enabled: Type.Boolean({ description: "SSO Connector enabled state" }),
      }),
    })
      .response(IamSsoConnectorResponse)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Update SSO connector state")
      .operationId("update-sso-connector-state")
      .tag("SSO")
      .security({ api_token: [] })
      .extension("x-api-token-group", null)
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{sso_connector_id}", {
      params: Type.Object({ sso_connector_id: IamSsoConnectorIdentifier }),
    })
      .response(IamApiResponseSingleId)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Delete SSO connector")
      .operationId("delete-sso-connector")
      .tag("SSO")
      .security({ api_token: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.sso-connector.delete"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/{sso_connector_id}/begin_verification", {
      params: Type.Object({ sso_connector_id: IamSsoConnectorIdentifier }),
    })
      .response(IamApiResponseSingle)
      .error("4XX", IamApiResponseCommonFailure)
      .summary("Begin SSO connector verification")
      .operationId("begin-sso-connector-verification")
      .tag("SSO")
      .security({ api_token: [] })
      .extension("x-api-token-group", null)
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

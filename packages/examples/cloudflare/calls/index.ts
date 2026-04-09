import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  CallsApiResponseCommonFailure,
  CallsAppEditableFields,
  CallsAppResponseCollection,
  CallsAppResponseSingle,
  CallsAppResponseSingleWithSecret,
  CallsIdentifier,
  CallsTurnKeyCollection,
  CallsTurnKeyEditableFields,
  CallsTurnKeyResponseSingle,
  CallsTurnKeySingleWithSecret,
} from "./schemas"

export function registerCalls(api: Api) {
  api.group("/accounts/{account_id}/calls", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/apps", {
      responses: {
        200: CallsAppResponseCollection,
        "4XX": CallsApiResponseCommonFailure,
      },
    })
      .summary("List apps")
      .description("Lists all apps in the Cloudflare account")
      .operationId("calls-apps-list")
      .tag("Calls Apps")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Calls Write", "Calls Read"])

    g.post("/apps", {
      body: CallsAppEditableFields,
      response: CallsAppResponseSingleWithSecret,
    })
      .summary("Create a new app")
      .description(
        "Creates a new Cloudflare calls app. An app is an unique enviroment where each Session can access all Tracks within the app.",
      )
      .operationId("calls-apps-create-a-new-app")
      .tag("Calls Apps")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Calls Write"])

    g.get("/apps/{app_id}", {
      params: Type.Object({ app_id: CallsIdentifier }),
      responses: {
        200: CallsAppResponseSingle,
        "4XX": CallsApiResponseCommonFailure,
      },
    })
      .summary("Retrieve app details")
      .description("Fetches details for a single Calls app.")
      .operationId("calls-apps-retrieve-app-details")
      .tag("Calls Apps")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Calls Write", "Calls Read"])

    g.put("/apps/{app_id}", {
      params: Type.Object({ app_id: CallsIdentifier }),
      body: CallsAppEditableFields,
      responses: {
        200: CallsAppResponseSingle,
        "4XX": CallsApiResponseCommonFailure,
      },
    })
      .summary("Edit app details")
      .description("Edit details for a single app.")
      .operationId("calls-apps-update-app-details")
      .tag("Calls Apps")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Calls Write"])

    g.delete("/apps/{app_id}", {
      params: Type.Object({ app_id: CallsIdentifier }),
      response: CallsAppResponseSingle,
    })
      .summary("Delete app")
      .description("Deletes an app from Cloudflare Calls")
      .operationId("calls-apps-delete-app")
      .tag("Calls Apps")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Calls Write"])

    g.get("/turn_keys", {
      responses: {
        200: CallsTurnKeyCollection,
        "4XX": CallsApiResponseCommonFailure,
      },
    })
      .summary("List TURN Keys")
      .description("Lists all TURN keys in the Cloudflare account")
      .operationId("calls-turn-key-list")
      .tag("Calls TURN Keys")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Calls Write", "Calls Read"])

    g.post("/turn_keys", {
      body: CallsTurnKeyEditableFields,
      response: CallsTurnKeySingleWithSecret,
    })
      .summary("Create a new TURN key")
      .description("Creates a new Cloudflare Calls TURN key.")
      .operationId("calls-turn-key-create")
      .tag("Calls TURN Keys")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Calls Write"])

    g.get("/turn_keys/{key_id}", {
      params: Type.Object({ key_id: CallsIdentifier }),
      responses: {
        200: CallsTurnKeyResponseSingle,
        "4XX": CallsApiResponseCommonFailure,
      },
    })
      .summary("Retrieve TURN key details")
      .description("Fetches details for a single TURN key.")
      .operationId("calls-retrieve-turn-key-details")
      .tag("Calls TURN Keys")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Calls Write", "Calls Read"])

    g.put("/turn_keys/{key_id}", {
      params: Type.Object({ key_id: CallsIdentifier }),
      body: CallsTurnKeyEditableFields,
      responses: {
        200: CallsTurnKeyResponseSingle,
        "4XX": CallsApiResponseCommonFailure,
      },
    })
      .summary("Edit TURN key details")
      .description("Edit details for a single TURN key.")
      .operationId("calls-update-turn-key")
      .tag("Calls TURN Keys")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Calls Write"])

    g.delete("/turn_keys/{key_id}", {
      params: Type.Object({ key_id: CallsIdentifier }),
      response: CallsTurnKeyResponseSingle,
    })
      .summary("Delete TURN key")
      .description("Deletes a TURN key from Cloudflare Calls")
      .operationId("calls-delete-turn-key")
      .tag("Calls TURN Keys")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Calls Write"])
  })
}

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages } from "../shared/schemas"
import {
  LogpushFields,
  LogpushInstantLogsJobResponseCollection,
  LogpushInstantLogsJobResponseSingle,
  LogpushSample,
  LogpushSchemasFilter,
} from "./schemas"

export function registerLogpush(api: Api) {
  api.group("/zones/{zone_id}/logpush/edge/jobs", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      responses: {
        200: LogpushInstantLogsJobResponseCollection,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("List Instant Logs jobs")
      .description("Lists Instant Logs jobs for a zone.")
      .operationId("get-zones-zone_id-logpush-edge-jobs")
      .tag("Instant Logs jobs for a zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Logs Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#logs:read"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/", {
      body: Type.Object({
        fields: Type.Optional(LogpushFields),
        filter: Type.Optional(LogpushSchemasFilter),
        sample: Type.Optional(LogpushSample),
      }),
      responses: {
        200: LogpushInstantLogsJobResponseSingle,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Create Instant Logs job")
      .description("Creates a new Instant Logs job for a zone.")
      .operationId("post-zones-zone_id-logpush-edge-jobs")
      .tag("Instant Logs jobs for a zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Logs Read"])
      .extension("x-cfPermissionsRequired", { enum: ["#logs:read"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })
  })
}

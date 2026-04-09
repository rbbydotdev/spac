import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"
import { RequestTracerApiResponseCommonFailure, RequestTracerTrace } from "./schemas"

export function registerRequestTracer(api: Api) {
  api.assertVersion("3.0.3", "RequestTracer")

  api
    .post("/accounts/{account_id}/request-tracer/trace", {
      params: Type.Object({ account_id: DlsIdentifier }),
      body: Type.Object({
        body: Type.Optional(
          Type.Object({
            base64: Type.Optional(Type.String({ description: "Base64 encoded request body", "x-auditable": true })),
            json: Type.Optional(Type.Unknown({ description: "Arbitrary json as request body" })),
            plain_text: Type.Optional(Type.String({ description: "Request body as plain text", "x-auditable": true })),
          }),
        ),
        context: Type.Optional(
          Type.Object(
            {
              bot_score: Type.Optional(
                Type.Integer({
                  description: "Bot score used for evaluating tracing request processing",
                  "x-auditable": true,
                }),
              ),
              geoloc: Type.Optional(
                Type.Object(
                  {
                    city: Type.Optional(Type.String({ "x-auditable": true })),
                    continent: Type.Optional(Type.String({ "x-auditable": true })),
                    is_eu_country: Type.Optional(Type.Boolean({ "x-auditable": true })),
                    iso_code: Type.Optional(Type.String({ "x-auditable": true })),
                    latitude: Type.Optional(Type.Number({ "x-auditable": true })),
                    longitude: Type.Optional(Type.Number({ "x-auditable": true })),
                    postal_code: Type.Optional(Type.String({ "x-auditable": true })),
                    region_code: Type.Optional(Type.String({ "x-auditable": true })),
                    subdivision_2_iso_code: Type.Optional(Type.String({ "x-auditable": true })),
                    timezone: Type.Optional(Type.String({ "x-auditable": true })),
                  },
                  { description: "Geodata for tracing request" },
                ),
              ),
              skip_challenge: Type.Optional(
                Type.Boolean({
                  description: "Whether to skip any challenges for tracing request (e.g.: captcha)",
                  "x-auditable": true,
                }),
              ),
              threat_score: Type.Optional(
                Type.Integer({
                  description: "Threat score used for evaluating tracing request processing",
                  "x-auditable": true,
                }),
              ),
            },
            { description: "Additional request parameters" },
          ),
        ),
        cookies: Type.Optional(Type.Record(Type.String(), Type.String())),
        headers: Type.Optional(Type.Record(Type.String(), Type.String())),
        method: Type.String({ description: "HTTP Method of tracing request", "x-auditable": true }),
        protocol: Type.Optional(Type.String({ description: "HTTP Protocol of tracing request", "x-auditable": true })),
        skip_response: Type.Optional(
          Type.Boolean({
            description: "Skip sending the request to the Origin server after all rules evaluation",
            "x-auditable": true,
          }),
        ),
        url: Type.String({ description: "URL to which perform tracing request", "x-auditable": true }),
      }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Optional(
          Type.Object(
            {
              status_code: Type.Optional(
                Type.Integer({ description: "HTTP Status code of zone response", "x-auditable": true }),
              ),
              trace: Type.Optional(RequestTracerTrace),
            },
            { description: "Trace result with an origin status code" },
          ),
        ),
      }),
    )
    .error("4XX", RequestTracerApiResponseCommonFailure)
    .summary("Request Trace")
    .operationId("account-request-tracer-request-trace")
    .tag("Account Request Tracer")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Allow Request Tracer Read"])
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
}

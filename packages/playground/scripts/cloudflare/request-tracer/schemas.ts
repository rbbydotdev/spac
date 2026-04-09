import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages } from "../shared/schemas"

export const RequestTracerApiResponseCommonFailure = named(
  "request-tracer_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const RequestTracerTrace = named(
  "request-tracer_trace",
  Type.Recursive((This) =>
    Type.Array(
      Type.Object(
        {
          action: Type.Optional(
            Type.String({
              description: "If step type is rule, then action performed by this rule",
              "x-auditable": true,
            }),
          ),
          action_parameters: Type.Optional(
            Type.Unknown({
              description: "If step type is rule, then action parameters of this rule as JSON",
              "x-auditable": true,
            }),
          ),
          description: Type.Optional(
            Type.String({
              description: "If step type is rule or ruleset, the description of this entity",
              "x-auditable": true,
            }),
          ),
          expression: Type.Optional(
            Type.String({
              description: "If step type is rule, then expression used to match for this rule",
              "x-auditable": true,
            }),
          ),
          kind: Type.Optional(
            Type.String({ description: "If step type is ruleset, then kind of this ruleset", "x-auditable": true }),
          ),
          matched: Type.Optional(
            Type.Boolean({
              description: "Whether tracing step affected tracing request/response",
              "x-auditable": true,
            }),
          ),
          name: Type.Optional(
            Type.String({ description: "If step type is ruleset, then name of this ruleset", "x-auditable": true }),
          ),
          step_name: Type.Optional(Type.String({ description: "Tracing step identifying name", "x-auditable": true })),
          trace: Type.Optional(This),
          type: Type.Optional(Type.String({ description: "Tracing step type", "x-auditable": true })),
        },
        { description: "List of steps acting on request/response" },
      ),
    ),
  ),
)

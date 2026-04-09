import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages } from "../shared/schemas"

export const ArgoAnalyticsResponseSingle = named(
  "argo-analytics_response_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages } from "../shared/schemas"

export const ZoneActivationApiResponseCommonFailure = named(
  "zone-activation_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

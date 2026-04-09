import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages, WafProductApiBundleIdentifier } from "../shared/schemas"

export const WafProductApiBundleApiResponseCommonFailure = named(
  "waf-product-api-bundle_api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Defines whether the API call was successful." }),
  }),
)

export const WafProductApiBundleApiResponseCommon = named(
  "waf-product-api-bundle_api-response-common",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Unknown(),
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const WafProductApiBundleDetectionId = named(
  "waf-product-api-bundle_detection-id",
  WafProductApiBundleIdentifier,
)

export const WafProductApiBundleCustomDetection = named(
  "waf-product-api-bundle_custom-detection",
  Type.Object(
    {
      id: Type.Optional(WafProductApiBundleDetectionId),
      password: Type.Optional(
        Type.String({
          description: "Defines ehe ruleset expression to use in matching the password in a request.",
          "x-auditable": true,
        }),
      ),
      username: Type.Optional(
        Type.String({
          description: "Defines the ruleset expression to use in matching the username in a request.",
          "x-auditable": true,
        }),
      ),
    },
    { description: "Defines a custom set of username/password expressions to match Leaked Credential Checks on." },
  ),
)

export const WafProductApiBundleResponseCustomDetection = named(
  "waf-product-api-bundle_response-custom-detection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: WafProductApiBundleCustomDetection,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const WafProductApiBundleResponseCustomDetectionCollection = named(
  "waf-product-api-bundle_response-custom-detection-collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(WafProductApiBundleCustomDetection), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const WafProductApiBundleStatus = named(
  "waf-product-api-bundle_status",
  Type.Object(
    {
      enabled: Type.Optional(
        Type.Boolean({
          description: "Determines whether or not Leaked Credential Checks are enabled.",
          "x-auditable": true,
        }),
      ),
    },
    { description: "Defines the overall status for Leaked Credential Checks." },
  ),
)

export const WafProductApiBundleResponseStatus = named(
  "waf-product-api-bundle_response-status",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: WafProductApiBundleStatus,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages, WafProductApiBundleIdentifier } from "../shared/schemas"

export const WafProductApiBundleSchemasStatus = named(
  "waf-product-api-bundle_schemas-status",
  Type.Object(
    {
      modified: Type.Optional(
        Type.String({
          description: "Defines the last modification date (ISO 8601) of the Content Scanning status.",
          "x-auditable": true,
        }),
      ),
      value: Type.Optional(
        Type.String({ description: "Defines the status of Content Scanning.", "x-auditable": true }),
      ),
    },
    { description: "Defines the status for Content Scanning." },
  ),
)

export const WafProductApiBundleSchemasResponseStatus = named(
  "waf-product-api-bundle_schemas-response-status",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: WafProductApiBundleSchemasStatus,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const WafProductApiBundleCustomScanId = named(
  "waf-product-api-bundle_custom-scan-id",
  WafProductApiBundleIdentifier,
)

export const WafProductApiBundleCustomScanPayload = named(
  "waf-product-api-bundle_custom-scan-payload",
  Type.String({
    description: "Defines the ruleset expression to use in matching content objects.",
    "x-auditable": true,
  }),
)

export const WafProductApiBundleCustomScan = named(
  "waf-product-api-bundle_custom-scan",
  Type.Object(
    {
      id: Type.Optional(WafProductApiBundleCustomScanId),
      payload: Type.Optional(WafProductApiBundleCustomScanPayload),
    },
    { description: "Defines a custom scan expression to match Content Scanning on." },
  ),
)

export const WafProductApiBundleResponseCustomScanCollection = named(
  "waf-product-api-bundle_response-custom-scan-collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(WafProductApiBundleCustomScan), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const WafProductApiBundleSchemasApiResponseCommonFailure = named(
  "waf-product-api-bundle_schemas-api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const WafProductApiBundleSchemasApiResponseCommon = named(
  "waf-product-api-bundle_schemas-api-response-common",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Unknown(),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

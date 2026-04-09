import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages } from "../shared/schemas"
import {
  WafProductApiBundleApiResponseCommon,
  WafProductApiBundleApiResponseCommonFailure,
  WafProductApiBundleCustomDetection,
  WafProductApiBundleDetectionId,
  WafProductApiBundleResponseCustomDetection,
  WafProductApiBundleResponseCustomDetectionCollection,
  WafProductApiBundleResponseStatus,
  WafProductApiBundleStatus,
} from "./schemas"

export function registerLeakedCredentialChecks(api: Api) {
  api.assertVersion("3.0.3", "LeakedCredentialChecks")

  api.group("/zones/{zone_id}/leaked-credential-checks", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {})
      .response(WafProductApiBundleResponseStatus)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()], {
            description: "Defines the overall status for Leaked Credential Checks.",
          }),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      )
      .summary("Get Leaked Credential Checks Status")
      .description("Retrieves the current status of Leaked Credential Checks.")
      .operationId("waf-product-api-leaked-credentials-get-status")
      .tag("Leaked Credential Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone WAF Write", "Zone WAF Read", "Account WAF Write", "Account WAF Read"])

    g.post("/", {
      body: WafProductApiBundleStatus,
    })
      .response(WafProductApiBundleResponseStatus)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()], {
            description: "Defines the overall status for Leaked Credential Checks.",
          }),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      )
      .summary("Set Leaked Credential Checks Status")
      .description("Updates the current status of Leaked Credential Checks.")
      .operationId("waf-product-api-leaked-credentials-set-status")
      .tag("Leaked Credential Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone WAF Write", "Account WAF Write"])

    g.get("/detections", {})
      .response(WafProductApiBundleResponseCustomDetectionCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      )
      .summary("List Leaked Credential Checks Custom Detections")
      .description("List user-defined detection patterns for Leaked Credential Checks.")
      .operationId("waf-product-api-leaked-credentials-list-detections")
      .tag("Leaked Credential Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone WAF Write", "Zone WAF Read", "Account WAF Write", "Account WAF Read"])

    g.post("/detections", {
      body: WafProductApiBundleCustomDetection,
    })
      .response(WafProductApiBundleResponseCustomDetection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()], {
            description: "Defines a custom set of username/password expressions to match Leaked Credential Checks on.",
          }),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      )
      .summary("Create Leaked Credential Checks Custom Detection")
      .description("Create user-defined detection pattern for Leaked Credential Checks.")
      .operationId("waf-product-api-leaked-credentials-create-detection")
      .tag("Leaked Credential Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone WAF Write", "Account WAF Write"])

    g.put("/detections/{detection_id}", {
      params: Type.Object({ detection_id: WafProductApiBundleDetectionId }),
      body: WafProductApiBundleCustomDetection,
    })
      .response(WafProductApiBundleResponseCustomDetection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()], {
            description: "Defines a custom set of username/password expressions to match Leaked Credential Checks on.",
          }),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Defines whether the API call was successful.",
          }),
        }),
      )
      .summary("Update Leaked Credential Checks Custom Detection")
      .description("Update user-defined detection pattern for Leaked Credential Checks.")
      .operationId("waf-product-api-leaked-credentials-update-detection")
      .tag("Leaked Credential Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone WAF Write", "Account WAF Write"])

    g.delete("/detections/{detection_id}", {
      params: Type.Object({ detection_id: WafProductApiBundleDetectionId }),
    })
      .response(WafProductApiBundleApiResponseCommon)
      .error("4XX", WafProductApiBundleApiResponseCommonFailure)
      .summary("Delete Leaked Credential Checks Custom Detection")
      .description("Remove user-defined detection pattern for Leaked Credential Checks.")
      .operationId("waf-product-api-leaked-credentials-delete-detection")
      .tag("Leaked Credential Checks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone WAF Write", "Account WAF Write"])
  })
}

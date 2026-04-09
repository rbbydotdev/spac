import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages } from "../shared/schemas"
import {
  WafProductApiBundleCustomScanId,
  WafProductApiBundleCustomScanPayload,
  WafProductApiBundleResponseCustomScanCollection,
  WafProductApiBundleSchemasApiResponseCommon,
  WafProductApiBundleSchemasApiResponseCommonFailure,
  WafProductApiBundleSchemasResponseStatus,
} from "./schemas"

export function registerContentUploadScan(api: Api) {
  api.group("/zones/{zone_id}/content-upload-scan", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.post("/disable", {
      responses: {
        200: WafProductApiBundleSchemasApiResponseCommon,
        "4XX": WafProductApiBundleSchemasApiResponseCommonFailure,
      },
    })
      .summary("Disable Content Scanning")
      .description("Disable Content Scanning.")
      .operationId("waf-content-scanning-disable")
      .tag("Content Scanning")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone WAF Write", "Account WAF Write"])

    g.post("/enable", {
      responses: {
        200: WafProductApiBundleSchemasApiResponseCommon,
        "4XX": WafProductApiBundleSchemasApiResponseCommonFailure,
      },
    })
      .summary("Enable Content Scanning")
      .description("Enable Content Scanning.")
      .operationId("waf-content-scanning-enable")
      .tag("Content Scanning")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone WAF Write", "Account WAF Write"])

    g.get("/payloads", {
      responses: {
        200: WafProductApiBundleResponseCustomScanCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("List Existing Custom Scan Expressions")
      .description("Get a list of existing custom scan expressions for Content Scanning.")
      .operationId("waf-content-scanning-list-custom-scan-expressions")
      .tag("Content Scanning")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone WAF Write", "Zone WAF Read", "Account WAF Write", "Account WAF Read"])

    g.post("/payloads", {
      body: Type.Array(
        Type.Object({
          payload: WafProductApiBundleCustomScanPayload,
        }),
      ),
      responses: {
        200: WafProductApiBundleResponseCustomScanCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Add Custom Scan Expressions")
      .description("Add custom scan expressions for Content Scanning.")
      .operationId("waf-content-scanning-add-custom-scan-expressions")
      .tag("Content Scanning")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone WAF Write", "Account WAF Write"])

    g.delete("/payloads/{expression_id}", {
      params: Type.Object({ expression_id: WafProductApiBundleCustomScanId }),
      responses: {
        200: WafProductApiBundleResponseCustomScanCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
      .summary("Delete a Custom Scan Expression")
      .description("Delete a Content Scan Custom Expression.")
      .operationId("waf-content-scanning-delete-custom-scan-expressions")
      .tag("Content Scanning")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone WAF Write", "Account WAF Write"])

    g.get("/settings", {
      responses: {
        200: WafProductApiBundleSchemasResponseStatus,
        "4XX": WafProductApiBundleSchemasApiResponseCommonFailure,
      },
    })
      .summary("Get Content Scanning Status")
      .description("Retrieve the current status of Content Scanning.")
      .operationId("waf-content-scanning-get-status")
      .tag("Content Scanning")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone WAF Write", "Zone WAF Read", "Account WAF Write", "Account WAF Read"])

    g.put("/settings", {
      body: Type.Object({
        value: Type.Union([Type.Literal("enabled"), Type.Literal("disabled")], {
          description: "The status value for Content Scanning.",
        }),
      }),
      responses: {
        200: WafProductApiBundleSchemasResponseStatus,
        "4XX": WafProductApiBundleSchemasApiResponseCommonFailure,
      },
    })
      .summary("Update Content Scanning Status")
      .description("Update the Content Scanning status.")
      .operationId("waf-content-scanning-update-settings")
      .tag("Content Scanning")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone WAF Write", "Account WAF Write"])
  })
}

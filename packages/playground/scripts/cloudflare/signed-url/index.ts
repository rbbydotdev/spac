import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { BrandProtectionApiError } from "../shared/schemas"

export function registerSignedUrl(api: Api) {
  api.assertVersion("3.0.3", "SignedUrl")

  api
    .get("/signed-url", {})
    .error("default", BrandProtectionApiError)
    .summary("Internal route for testing signed URLs")
    .tag("logo_match")
    .security({ api_token: [] })
}

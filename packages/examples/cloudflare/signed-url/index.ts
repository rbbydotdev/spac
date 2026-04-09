import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { BrandProtectionApiError } from "../shared/schemas"

export function registerSignedUrl(api: Api) {
  api
    .get("/signed-url", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
    .summary("Internal route for testing signed URLs")
    .tag("logo_match")
    .security({ api_token: [] })
}

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { BrandProtectionApiError } from "../shared/schemas"

export function registerLive(api: Api) {
  api.assertVersion("3.0.3", "Live")

  api
    .get("/live", {})
    .error("default", BrandProtectionApiError)
    .summary("Run liveness checks")
    .description("Return a success message after running liveness checks")
    .tag("brand_protection")
    .security({ api_token: [] })
}

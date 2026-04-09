import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { BrandProtectionApiError } from "../shared/schemas"

export function registerReady(api: Api) {
  api
    .get("/ready", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
    .summary("Run readiness checks")
    .description("Return a success message after running readiness checks")
    .tag("brand_protection")
    .security({ api_token: [] })
}

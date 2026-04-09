import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { BrandProtectionApiError } from "../shared/schemas"

export function registerInternal(api: Api) {
  api
    .post("/internal/submit", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
    .summary("Internal route for testing URL submissions")
    .tag("brand_protection")
    .security({ api_token: [] })
}

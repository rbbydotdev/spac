import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { BrandProtectionApiError } from "../shared/schemas"
import {
  BrandProtectionApiLogo,
  BrandProtectionApiLogomatch,
  BrandProtectionApiQuery,
  BrandProtectionApiQuerybulk,
  BrandProtectionApiUrlinfo,
  BrandProtectionApiUrlsubmit,
} from "./schemas"

export function registerBrandProtection(api: Api) {
  api.group("/accounts/{account_id}/brand-protection", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/alerts", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Read all alerts on submitted domains")
      .description("Return all alerts on submitted domains")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.patch("/alerts", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Update alerts on submitted domains by ID")
      .description("Return a success message after updating alerts on submitted domains by ID")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.patch("/alerts/clear", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Update verification statuses of tracked URLs to awaiting by ID")
      .description("Return a success message after updating verification statuses of tracked URLs to awaiting by ID")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.patch("/alerts/refute", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Update verification statuses of tracked URLs to disproven by ID")
      .description("Return a success message after updating verification statuses of tracked URLs to disproven by ID")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.patch("/alerts/verify", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Update verification statuses of tracked URLs to confirmed by ID")
      .description("Return a success message after updating verification statuses of tracked URLs to confirmed by ID")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.get("/brands", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Read all brands")
      .description("Return all brands")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.post("/brands", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Create new brands")
      .description("Return new brands")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.delete("/brands", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Delete brands by ID")
      .description("Return a success message after deleting brands by ID")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.get("/brands/patterns", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Read patterns for brands by ID")
      .description("Return patterns for brands based on ID")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.post("/brands/patterns", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Create new patterns for brands by ID")
      .description("Return a success message after creating new patterns for brands by ID")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.delete("/brands/patterns", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Delete patterns for brands by ID")
      .description("Return a success message after deleting patterns for brands by ID")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.patch("/clear", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Update verification statuses of submitted URLs to awaiting by ID")
      .description("Return a success message after updating verification statuses of submitted URLs to awaiting by ID")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.get("/domain-info", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Read submitted domains by ID")
      .description("Return submitted domains based on ID")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/logo-matches", {
      query: Type.Object({
        logo_id: Type.Optional(Type.Array(Type.String())),
        offset: Type.Optional(Type.String()),
        limit: Type.Optional(Type.String()),
      }),
      responses: {
        200: BrandProtectionApiLogomatch,
        422: BrandProtectionApiError,
        default: BrandProtectionApiError,
      },
    })
      .summary("Read matches for logo queries by ID")
      .description("Return matches for logo queries based on ID")
      .tag("logo_match")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/logo-matches/download", {
      query: Type.Object({
        logo_id: Type.Optional(Type.Array(Type.String())),
        offset: Type.Optional(Type.String()),
        limit: Type.Optional(Type.String()),
      }),
      responses: {
        200: BrandProtectionApiLogomatch,
        422: BrandProtectionApiError,
        default: BrandProtectionApiError,
      },
    })
      .summary("Download matches for logo queries by ID")
      .description("Return matches as CSV for logo queries based on ID")
      .tag("logo_match")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/logos", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Read all saved logo queries")
      .description("Return all saved logo queries")
      .tag("logo_match")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.post("/logos", {
      query: Type.Object({
        tag: Type.Optional(Type.String()),
        match_type: Type.Optional(Type.String()),
        threshold: Type.Optional(Type.Number()),
      }),
      responses: {
        201: BrandProtectionApiLogo,
        422: BrandProtectionApiError,
        default: BrandProtectionApiError,
      },
    })
      .summary("Create new saved logo queries from image files")
      .description("Return new saved logo queries created from image files")
      .tag("logo_match")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.get("/logos/{logo_id}", {
      params: Type.Object({ logo_id: Type.String({ minLength: 1 }) }),
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Read saved logo queries by ID")
      .description("Return saved logo queries based on ID")
      .tag("logo_match")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.delete("/logos/{logo_id}", {
      params: Type.Object({ logo_id: Type.String({ minLength: 1 }) }),
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Delete saved logo queries by ID")
      .description("Return a success message after deleting saved logo queries by ID")
      .tag("logo_match")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.get("/matches", {
      query: Type.Object({
        id: Type.Optional(Type.String()),
        offset: Type.Optional(Type.Integer()),
        limit: Type.Optional(Type.Integer()),
        include_domain_id: Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: BrandProtectionApiLogomatch,
        422: BrandProtectionApiError,
        default: BrandProtectionApiError,
      },
    })
      .summary("Read matches for string queries by ID")
      .description("Return matches for string queries based on ID")
      .tag("domain_search")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/matches/download", {
      query: Type.Object({
        id: Type.Optional(Type.String()),
        offset: Type.Optional(Type.Integer()),
        limit: Type.Optional(Type.Integer()),
        include_domain_id: Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: BrandProtectionApiLogomatch,
        422: BrandProtectionApiError,
        default: BrandProtectionApiError,
      },
    })
      .summary("Download matches for string queries by ID")
      .description("Return matches as CSV for string queries based on ID")
      .tag("domain_search")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/queries", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Read string queries by ID")
      .description("Return string queries based on ID")
      .tag("domain_search")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.post("/queries", {
      query: Type.Object({
        id: Type.Optional(Type.String()),
        tag: Type.Optional(Type.String()),
        scan: Type.Optional(Type.Boolean()),
      }),
      body: BrandProtectionApiQuery,
      responses: {
        422: BrandProtectionApiError,
        default: BrandProtectionApiError,
      },
    })
      .summary("Create new saved string queries")
      .description("Return a success message after creating new saved string queries")
      .tag("domain_search")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.patch("/queries", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Update saved string queries by ID")
      .description("Return a success message after updating saved string queries by ID")
      .tag("domain_search")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.delete("/queries", {
      query: Type.Object({
        id: Type.Optional(Type.String()),
        tag: Type.Optional(Type.String()),
        scan: Type.Optional(Type.Boolean()),
      }),
      responses: {
        422: BrandProtectionApiError,
        default: BrandProtectionApiError,
      },
    })
      .summary("Delete saved string queries by ID")
      .description("Return a success message after deleting saved string queries by ID")
      .tag("domain_search")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.post("/queries/bulk", {
      body: BrandProtectionApiQuerybulk,
      responses: {
        422: BrandProtectionApiError,
        default: BrandProtectionApiError,
      },
    })
      .summary("Create new saved string queries in bulk")
      .description("Return a success message after creating new saved string queries in bulk")
      .tag("domain_search")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.get("/recent-submissions", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Read recent URL submissions")
      .description("Return recent URL submissions")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.patch("/refute", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Update verification statuses of submitted URLs to disproven by ID")
      .description("Return a success message after updating verification statuses of submitted URLs to disproven by ID")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.post("/scan-logo", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Create new logo queries from image files")
      .description("Return new logo queries created from image files")
      .tag("logo_match")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.post("/scan-page", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Create new logo queries from URLs")
      .description("Return new logo queries created from URLs")
      .tag("logo_match")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.post("/search", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Create new string queries")
      .description("Return new string queries")
      .tag("domain_search")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.get("/submission-info", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Read URL submissions by ID")
      .description("Return URL submissions based on ID")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.post("/submit", {
      responses: {
        201: BrandProtectionApiUrlsubmit,
        default: BrandProtectionApiError,
      },
    })
      .summary("Create new URL submissions")
      .description("Return new URL submissions")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])

    g.get("/total-queries", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Read the total number of saved string queries")
      .description("Return the total number of saved string queries")
      .tag("domain_search")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/tracked-domains", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Read submitted domains by pattern")
      .description("Return submitted domains based on pattern")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/url-info", {
      responses: {
        200: BrandProtectionApiUrlinfo,
        default: BrandProtectionApiError,
      },
    })
      .summary("Read submitted URLs by ID")
      .description("Return submitted URLs based on ID")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.patch("/verify", {
      responses: {
        default: BrandProtectionApiError,
      },
    })
      .summary("Update verification statuses of submitted URLs to confirmed by ID")
      .description("Return a success message after updating verification statuses of submitted URLs to confirmed by ID")
      .tag("brand_protection")
      .security({ api_token: [] })
      .extension("x-api-token-group", ["Intel Write"])
  })
}

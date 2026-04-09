import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlsTimestamp } from "../shared/schemas"
import {
  ObservatoryApiResponseCommonFailure,
  ObservatoryAvailabilitiesResponse,
  ObservatoryCountResponse,
  ObservatoryCreateScheduleResponse,
  ObservatoryDeviceType,
  ObservatoryPageTestResponseCollection,
  ObservatoryPageTestResponseSingle,
  ObservatoryPagesResponseCollection,
  ObservatoryRegion,
  ObservatoryScheduleResponseSingle,
  ObservatoryTrendResponse,
  ObservatoryUrl,
} from "./schemas"

export function registerSpeedApi(api: Api) {
  api.group("/zones/{zone_id}/speed_api", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/availabilities", {
      responses: {
        200: ObservatoryAvailabilitiesResponse,
        "4XX": ObservatoryApiResponseCommonFailure,
      },
    })
      .summary("Get quota and availability")
      .description("Retrieves quota for all plans, as well as the current zone quota.")
      .operationId("speed-get-availabilities")
      .tag("Observatory")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/pages", {
      responses: {
        200: ObservatoryPagesResponseCollection,
        "4XX": ObservatoryApiResponseCommonFailure,
      },
    })
      .summary("List tested webpages")
      .description("Lists all webpages which have been tested.")
      .operationId("speed-list-pages")
      .tag("Observatory")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/pages/{url}/tests", {
      params: Type.Object({ url: ObservatoryUrl }),
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 20, minimum: 5, maximum: 50 })),
        region: Type.Optional(ObservatoryRegion),
      }),
      responses: {
        200: ObservatoryPageTestResponseCollection,
        "4XX": ObservatoryApiResponseCommonFailure,
      },
    })
      .summary("List page test history")
      .description("Test history (list of tests) for a specific webpage.")
      .operationId("speed-list-test-history")
      .tag("Observatory")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/pages/{url}/tests", {
      params: Type.Object({ url: ObservatoryUrl }),
      body: Type.Object({
        region: Type.Optional(ObservatoryRegion),
      }),
      responses: {
        200: ObservatoryPageTestResponseSingle,
        "4XX": ObservatoryApiResponseCommonFailure,
      },
    })
      .summary("Start page test")
      .description("Starts a test for a specific webpage, in a specific region.")
      .operationId("speed-create-test")
      .tag("Observatory")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/pages/{url}/tests", {
      params: Type.Object({ url: ObservatoryUrl }),
      query: Type.Object({
        region: Type.Optional(ObservatoryRegion),
      }),
      responses: {
        200: ObservatoryCountResponse,
        "4XX": ObservatoryApiResponseCommonFailure,
      },
    })
      .summary("Delete all page tests")
      .description(
        "Deletes all tests for a specific webpage from a specific region. Deleted tests are still counted as part of the quota.",
      )
      .operationId("speed-delete-tests")
      .tag("Observatory")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/pages/{url}/tests/{test_id}", {
      params: Type.Object({ url: ObservatoryUrl, test_id: Type.String() }),
      responses: {
        200: ObservatoryPageTestResponseSingle,
        "4XX": ObservatoryApiResponseCommonFailure,
      },
    })
      .summary("Get a page test result")
      .description("Retrieves the result of a specific test.")
      .operationId("speed-get-test")
      .tag("Observatory")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/pages/{url}/trend", {
      params: Type.Object({ url: ObservatoryUrl }),
      query: Type.Object({
        region: ObservatoryRegion,
        deviceType: ObservatoryDeviceType,
        start: DlsTimestamp,
        end: Type.Optional(DlsTimestamp),
        tz: Type.String(),
        metrics: Type.String(),
      }),
      responses: {
        200: ObservatoryTrendResponse,
        "4XX": ObservatoryApiResponseCommonFailure,
      },
    })
      .summary("List core web vital metrics trend")
      .description("Lists the core web vital metrics trend over time for a specific page.")
      .operationId("speed-list-page-trend")
      .tag("Observatory")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/schedule/{url}", {
      params: Type.Object({ url: ObservatoryUrl }),
      query: Type.Object({
        region: Type.Optional(ObservatoryRegion),
      }),
      responses: {
        200: ObservatoryScheduleResponseSingle,
        "4XX": ObservatoryApiResponseCommonFailure,
      },
    })
      .summary("Get a page test schedule")
      .description("Retrieves the test schedule for a page in a specific region.")
      .operationId("speed-get-scheduled-test")
      .tag("Observatory")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/schedule/{url}", {
      params: Type.Object({ url: ObservatoryUrl }),
      query: Type.Object({
        region: Type.Optional(ObservatoryRegion),
      }),
      responses: {
        200: ObservatoryCreateScheduleResponse,
        "4XX": ObservatoryApiResponseCommonFailure,
      },
    })
      .summary("Create scheduled page test")
      .description("Creates a scheduled test for a page.")
      .operationId("speed-create-scheduled-test")
      .tag("Observatory")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/schedule/{url}", {
      params: Type.Object({ url: ObservatoryUrl }),
      query: Type.Object({
        region: Type.Optional(ObservatoryRegion),
      }),
      responses: {
        200: ObservatoryCountResponse,
        "4XX": ObservatoryApiResponseCommonFailure,
      },
    })
      .summary("Delete scheduled page test")
      .description("Deletes a scheduled test for a page.")
      .operationId("speed-delete-test-schedule")
      .tag("Observatory")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

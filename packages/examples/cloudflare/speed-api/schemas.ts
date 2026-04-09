import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages, DlpMessages, DlsTimestamp, DosUuid } from "../shared/schemas"

export const ObservatoryScheduleFrequency = named(
  "observatory_schedule_frequency",
  Type.Union([Type.Literal("DAILY"), Type.Literal("WEEKLY")], {
    description: "The frequency of the test.",
    "x-auditable": true,
  }),
)

export const ObservatoryRegion = named(
  "observatory_region",
  Type.Union(
    [
      Type.Literal("asia-east1"),
      Type.Literal("asia-northeast1"),
      Type.Literal("asia-northeast2"),
      Type.Literal("asia-south1"),
      Type.Literal("asia-southeast1"),
      Type.Literal("australia-southeast1"),
      Type.Literal("europe-north1"),
      Type.Literal("europe-southwest1"),
      Type.Literal("europe-west1"),
      Type.Literal("europe-west2"),
      Type.Literal("europe-west3"),
      Type.Literal("europe-west4"),
      Type.Literal("europe-west8"),
      Type.Literal("europe-west9"),
      Type.Literal("me-west1"),
      Type.Literal("southamerica-east1"),
      Type.Literal("us-central1"),
      Type.Literal("us-east1"),
      Type.Literal("us-east4"),
      Type.Literal("us-south1"),
      Type.Literal("us-west1"),
    ],
    { description: "A test region.", "x-auditable": true },
  ),
)

export const ObservatoryUrl = named("observatory_url", Type.String({ description: "A URL.", "x-auditable": true }))

export const ObservatorySchedule = named(
  "observatory_schedule",
  Type.Object(
    {
      frequency: Type.Optional(ObservatoryScheduleFrequency),
      region: Type.Optional(ObservatoryRegion),
      url: Type.Optional(ObservatoryUrl),
    },
    { description: "The test schedule." },
  ),
)

export const ObservatoryDeviceType = named(
  "observatory_device_type",
  Type.Union([Type.Literal("DESKTOP"), Type.Literal("MOBILE")], {
    description: "The type of device.",
    "x-auditable": true,
  }),
)

export const ObservatoryLighthouseErrorCode = named(
  "observatory_lighthouse_error_code",
  Type.Union(
    [
      Type.Literal("NOT_REACHABLE"),
      Type.Literal("DNS_FAILURE"),
      Type.Literal("NOT_HTML"),
      Type.Literal("LIGHTHOUSE_TIMEOUT"),
      Type.Literal("UNKNOWN"),
    ],
    { description: "The error code of the Lighthouse result.", "x-auditable": true },
  ),
)

export const ObservatoryLighthouseState = named(
  "observatory_lighthouse_state",
  Type.Union([Type.Literal("RUNNING"), Type.Literal("COMPLETE"), Type.Literal("FAILED")], {
    description: "The state of the Lighthouse report.",
    "x-auditable": true,
  }),
)

export const ObservatoryLighthouseReport = named(
  "observatory_lighthouse_report",
  Type.Object(
    {
      cls: Type.Optional(Type.Number({ description: "Cumulative Layout Shift.", "x-auditable": true })),
      deviceType: Type.Optional(ObservatoryDeviceType),
      error: Type.Optional(
        Type.Object({
          code: Type.Optional(ObservatoryLighthouseErrorCode),
          detail: Type.Optional(Type.String({ description: "Detailed error message.", "x-auditable": true })),
          finalDisplayedUrl: Type.Optional(
            Type.String({ description: "The final URL displayed to the user.", "x-auditable": true }),
          ),
        }),
      ),
      fcp: Type.Optional(Type.Number({ description: "First Contentful Paint.", "x-auditable": true })),
      jsonReportUrl: Type.Optional(
        Type.String({ description: "The URL to the full Lighthouse JSON report.", "x-auditable": true }),
      ),
      lcp: Type.Optional(Type.Number({ description: "Largest Contentful Paint.", "x-auditable": true })),
      performanceScore: Type.Optional(
        Type.Number({ description: "The Lighthouse performance score.", "x-auditable": true }),
      ),
      si: Type.Optional(Type.Number({ description: "Speed Index.", "x-auditable": true })),
      state: Type.Optional(ObservatoryLighthouseState),
      tbt: Type.Optional(Type.Number({ description: "Total Blocking Time.", "x-auditable": true })),
      ttfb: Type.Optional(Type.Number({ description: "Time To First Byte.", "x-auditable": true })),
      tti: Type.Optional(Type.Number({ description: "Time To Interactive.", "x-auditable": true })),
    },
    { description: "The Lighthouse report." },
  ),
)

export const ObservatoryLabeledRegion = named(
  "observatory_labeled_region",
  Type.Object(
    {
      label: Type.Optional(Type.String({ "x-auditable": true })),
      value: Type.Optional(ObservatoryRegion),
    },
    { description: "A test region with a label." },
  ),
)

export const ObservatoryPageTest = named(
  "observatory_page_test",
  Type.Object({
    date: Type.Optional(DlsTimestamp),
    desktopReport: Type.Optional(ObservatoryLighthouseReport),
    id: Type.Optional(DosUuid),
    mobileReport: Type.Optional(ObservatoryLighthouseReport),
    region: Type.Optional(ObservatoryLabeledRegion),
    scheduleFrequency: Type.Optional(ObservatoryScheduleFrequency),
    url: Type.Optional(ObservatoryUrl),
  }),
)

export const ObservatoryCreateScheduleResponse = named(
  "observatory_create-schedule-response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful.", "x-auditable": true }),
    result: Type.Optional(
      Type.Object({
        schedule: Type.Optional(ObservatorySchedule),
        test: Type.Optional(ObservatoryPageTest),
      }),
    ),
  }),
)

export const ObservatoryScheduleResponseSingle = named(
  "observatory_schedule-response-single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful.", "x-auditable": true }),
    result: Type.Optional(ObservatorySchedule),
  }),
)

export const ObservatoryTrend = named(
  "observatory_trend",
  Type.Object({
    cls: Type.Optional(
      Type.Array(Type.Union([Type.Number({ "x-auditable": true }), Type.Null()]), {
        description: "Cumulative Layout Shift trend.",
      }),
    ),
    fcp: Type.Optional(
      Type.Array(Type.Union([Type.Number({ "x-auditable": true }), Type.Null()]), {
        description: "First Contentful Paint trend.",
      }),
    ),
    lcp: Type.Optional(
      Type.Array(Type.Union([Type.Number({ "x-auditable": true }), Type.Null()]), {
        description: "Largest Contentful Paint trend.",
      }),
    ),
    performanceScore: Type.Optional(
      Type.Array(Type.Union([Type.Number({ "x-auditable": true }), Type.Null()]), {
        description: "The Lighthouse score trend.",
      }),
    ),
    si: Type.Optional(
      Type.Array(Type.Union([Type.Number({ "x-auditable": true }), Type.Null()]), {
        description: "Speed Index trend.",
      }),
    ),
    tbt: Type.Optional(
      Type.Array(Type.Union([Type.Number({ "x-auditable": true }), Type.Null()]), {
        description: "Total Blocking Time trend.",
      }),
    ),
    ttfb: Type.Optional(
      Type.Array(Type.Union([Type.Number({ "x-auditable": true }), Type.Null()]), {
        description: "Time To First Byte trend.",
      }),
    ),
    tti: Type.Optional(
      Type.Array(Type.Union([Type.Number({ "x-auditable": true }), Type.Null()]), {
        description: "Time To Interactive trend.",
      }),
    ),
  }),
)

export const ObservatoryTrendResponse = named(
  "observatory_trend-response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful.", "x-auditable": true }),
    result: Type.Optional(ObservatoryTrend),
  }),
)

export const ObservatoryCountResponse = named(
  "observatory_count-response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful.", "x-auditable": true }),
    result: Type.Optional(
      Type.Object({
        count: Type.Optional(
          Type.Number({
            description: "Number of items affected.",
            "x-auditable": true,
            "x-stainless-naming": { terraform: { property_name: "item_count" } },
          }),
        ),
      }),
    ),
  }),
)

export const ObservatoryPageTestResponseSingle = named(
  "observatory_page-test-response-single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful.", "x-auditable": true }),
    result: Type.Optional(ObservatoryPageTest),
  }),
)

export const ObservatoryResultInfo = named(
  "observatory_result_info",
  Type.Object({
    count: Type.Optional(Type.Integer({ "x-auditable": true })),
    page: Type.Optional(Type.Integer({ "x-auditable": true })),
    per_page: Type.Optional(Type.Integer({ "x-auditable": true })),
    total_count: Type.Optional(Type.Integer({ "x-auditable": true })),
  }),
)

export const ObservatoryPageTestResponseCollection = named(
  "observatory_page-test-response-collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful.", "x-auditable": true }),
    result: Type.Optional(Type.Array(ObservatoryPageTest)),
    result_info: Type.Optional(ObservatoryResultInfo),
  }),
)

export const ObservatoryPagesResponseCollection = named(
  "observatory_pages-response-collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful.", "x-auditable": true }),
    result: Type.Optional(
      Type.Array(
        Type.Object({
          region: Type.Optional(ObservatoryLabeledRegion),
          scheduleFrequency: Type.Optional(ObservatoryScheduleFrequency),
          tests: Type.Optional(Type.Array(ObservatoryPageTest)),
          url: Type.Optional(ObservatoryUrl),
        }),
      ),
    ),
  }),
)

export const ObservatoryApiResponseCommonFailure = named(
  "observatory_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const ObservatoryPlanPropertiesInfo = named(
  "observatory_plan-properties-info",
  Type.Object(
    {
      business: Type.Optional(Type.Integer({ "x-auditable": true })),
      enterprise: Type.Optional(Type.Integer({ "x-auditable": true })),
      free: Type.Optional(Type.Integer({ "x-auditable": true })),
      pro: Type.Optional(Type.Integer({ "x-auditable": true })),
    },
    { description: "Counts per account plan." },
  ),
)

export const ObservatoryAvailabilities = named(
  "observatory_availabilities",
  Type.Object({
    quota: Type.Optional(
      Type.Object({
        plan: Type.Optional(Type.String({ description: "Cloudflare plan.", "x-auditable": true })),
        quotasPerPlan: Type.Optional(
          Type.Object(
            {
              value: Type.Optional(ObservatoryPlanPropertiesInfo),
            },
            { description: "The number of tests available per plan." },
          ),
        ),
        remainingSchedules: Type.Optional(
          Type.Number({ description: "The number of remaining schedules available.", "x-auditable": true }),
        ),
        remainingTests: Type.Optional(
          Type.Number({ description: "The number of remaining tests available.", "x-auditable": true }),
        ),
        scheduleQuotasPerPlan: Type.Optional(
          Type.Object(
            {
              value: Type.Optional(ObservatoryPlanPropertiesInfo),
            },
            { description: "The number of schedules available per plan." },
          ),
        ),
      }),
    ),
    regions: Type.Optional(Type.Array(ObservatoryLabeledRegion)),
    regionsPerPlan: Type.Optional(
      Type.Object(
        {
          business: Type.Optional(Type.Array(ObservatoryLabeledRegion)),
          enterprise: Type.Optional(Type.Array(ObservatoryLabeledRegion)),
          free: Type.Optional(Type.Array(ObservatoryLabeledRegion)),
          pro: Type.Optional(Type.Array(ObservatoryLabeledRegion)),
        },
        { description: "Available regions." },
      ),
    ),
  }),
)

export const ObservatoryAvailabilitiesResponse = named(
  "observatory_availabilities-response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Boolean({ description: "Whether the API call was successful.", "x-auditable": true }),
    result: Type.Optional(ObservatoryAvailabilities),
  }),
)

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages } from "../shared/schemas"
import {
  DigitalExperienceMonitoringApiResponseCommonFailure,
  DigitalExperienceMonitoringColo,
  DigitalExperienceMonitoringColosResponse,
  DigitalExperienceMonitoringCommandId,
  DigitalExperienceMonitoringCommandsDevicesResponse,
  DigitalExperienceMonitoringDevice,
  DigitalExperienceMonitoringDeviceDexTestSchemasHttp,
  DigitalExperienceMonitoringDeviceId,
  DigitalExperienceMonitoringDexDeleteResponseCollection,
  DigitalExperienceMonitoringDexResponseCollection,
  DigitalExperienceMonitoringDexSingleResponse,
  DigitalExperienceMonitoringFleetStatusDevicesResponse,
  DigitalExperienceMonitoringFleetStatusLiveResponse,
  DigitalExperienceMonitoringGetCommandsQuotaResponse,
  DigitalExperienceMonitoringGetCommandsResponse,
  DigitalExperienceMonitoringHttpDetailsPercentilesResponse,
  DigitalExperienceMonitoringHttpDetailsResponse,
  DigitalExperienceMonitoringMode,
  DigitalExperienceMonitoringPage,
  DigitalExperienceMonitoringPerPage,
  DigitalExperienceMonitoringPlatform,
  DigitalExperienceMonitoringPostCommandsResponse,
  DigitalExperienceMonitoringSinceMinutes,
  DigitalExperienceMonitoringSortBy,
  DigitalExperienceMonitoringSource,
  DigitalExperienceMonitoringStatus,
  DigitalExperienceMonitoringTestsResponse,
  DigitalExperienceMonitoringTimeNow,
  DigitalExperienceMonitoringTimestamp,
  DigitalExperienceMonitoringTracerouteDetailsPercentilesResponse,
  DigitalExperienceMonitoringTracerouteDetailsResponse,
  DigitalExperienceMonitoringTracerouteTestNetworkPathResponse,
  DigitalExperienceMonitoringTracerouteTestResultNetworkPathResponse,
  DigitalExperienceMonitoringUniqueDevicesResponse,
  DigitalExperienceMonitoringUuid,
  DigitalExperienceMonitoringVersion,
  DigitalExperienceMonitoringWarpEventsResponse,
} from "./schemas"

export function registerDex(api: Api) {
  api.assertVersion("3.0.3", "Dex")

  api.group("/accounts/{account_id}/dex", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/colos", {
      query: Type.Object({
        from: Type.String(),
        to: Type.String(),
        sortBy: Type.Optional(
          Type.Union([Type.Literal("fleet-status-usage"), Type.Literal("application-tests-usage")]),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
              per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
              total_count: Type.Optional(
                Type.Number({ description: "Total results available without any search parameters." }),
              ),
            }),
          ),
          result: Type.Optional(DigitalExperienceMonitoringColosResponse),
        }),
      )
      .error("4XX", DigitalExperienceMonitoringApiResponseCommonFailure)
      .summary("List Cloudflare colos")
      .description(
        "List Cloudflare colos that account's devices were connected to during a time period, sorted by usage starting from the most used colo. Colos without traffic are also returned and sorted alphabetically.",
      )
      .operationId("dex-endpoints-list-colos")
      .tag("DEX Synthetic Application Monitoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.get("/commands", {
      query: Type.Object({
        page: Type.Number(),
        per_page: Type.Number(),
        from: Type.Optional(Type.String({ format: "date-time" })),
        to: Type.Optional(Type.String({ format: "date-time" })),
        device_id: Type.Optional(Type.String()),
        user_email: Type.Optional(Type.String()),
        command_type: Type.Optional(Type.String()),
        status: Type.Optional(
          Type.Union([
            Type.Literal("PENDING_EXEC"),
            Type.Literal("PENDING_UPLOAD"),
            Type.Literal("SUCCESS"),
            Type.Literal("FAILED"),
          ]),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
              per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
              total_count: Type.Optional(
                Type.Number({ description: "Total results available without any search parameters." }),
              ),
            }),
          ),
          result: Type.Optional(DigitalExperienceMonitoringGetCommandsResponse),
        }),
      )
      .error("4XX", DigitalExperienceMonitoringApiResponseCommonFailure)
      .summary("List account commands")
      .description(
        "Retrieves a paginated list of commands issued to devices under the specified account, optionally filtered by time range, device, or other parameters",
      )
      .operationId("get-commands")
      .tag("DEX Remote Commands")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.post("/commands", {
      body: Type.Object({
        commands: Type.Array(
          Type.Object({
            command_args: Type.Optional(
              Type.Object({
                interfaces: Type.Optional(
                  Type.Array(Type.Union([Type.Literal("default"), Type.Literal("tunnel")], { "x-auditable": true }), {
                    description: "List of interfaces to capture packets on",
                  }),
                ),
                "max-file-size-mb": Type.Optional(
                  Type.Number({
                    description:
                      "Maximum file size (in MB) for the capture file. Specifies the maximum file size of the warp-diag zip artifact that can be uploaded. If the zip artifact exceeds the specified max file size, it will NOT be uploaded",
                    default: 5,
                    minimum: 1,
                    "x-auditable": true,
                  }),
                ),
                "packet-size-bytes": Type.Optional(
                  Type.Number({
                    description: "Maximum number of bytes to save for each packet",
                    default: 160,
                    minimum: 1,
                    "x-auditable": true,
                  }),
                ),
                "test-all-routes": Type.Optional(
                  Type.Boolean({
                    description:
                      "Test an IP address from all included or excluded ranges. Tests an IP address from all included or excluded ranges. Essentially the same as running 'route get <ip>'' and collecting the results. This option may increase the time taken to collect the warp-diag",
                    default: true,
                    "x-auditable": true,
                  }),
                ),
                "time-limit-min": Type.Optional(
                  Type.Number({
                    description: "Limit on capture duration (in minutes)",
                    default: 5,
                    minimum: 1,
                    "x-auditable": true,
                  }),
                ),
              }),
            ),
            command_type: Type.Union([Type.Literal("pcap"), Type.Literal("warp-diag")], {
              description: "Type of command to execute on the device",
              "x-auditable": true,
            }),
            device_id: Type.String({ description: "Unique identifier for the device" }),
            user_email: Type.String({ description: "Email tied to the device" }),
          }),
          { description: "List of device-level commands to execute", maxItems: 20 },
        ),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
              per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
              total_count: Type.Optional(
                Type.Number({ description: "Total results available without any search parameters." }),
              ),
            }),
          ),
          result: Type.Optional(DigitalExperienceMonitoringPostCommandsResponse),
        }),
      )
      .error("4XX", DigitalExperienceMonitoringApiResponseCommonFailure)
      .summary("Create account commands")
      .description("Initiate commands for up to 10 devices per account")
      .operationId("post-commands")
      .tag("DEX Remote Commands")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare DEX Write"])

    g.get("/commands/devices", {
      query: Type.Object({
        page: Type.Number({ minimum: 1 }),
        per_page: Type.Number({ minimum: 1, maximum: 50 }),
        search: Type.Optional(Type.String()),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
              per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
              total_count: Type.Optional(
                Type.Number({ description: "Total results available without any search parameters." }),
              ),
            }),
          ),
          result: Type.Optional(DigitalExperienceMonitoringCommandsDevicesResponse),
        }),
      )
      .error("4XX", DigitalExperienceMonitoringApiResponseCommonFailure)
      .summary("List devices eligible for remote captures")
      .description(
        "List devices with WARP client support for remote captures which have been connected in the last 1 hour.",
      )
      .operationId("get-commands-eligible-devices")
      .tag("DEX Remote Commands")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.get("/commands/quota", {})
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
              per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
              total_count: Type.Optional(
                Type.Number({ description: "Total results available without any search parameters." }),
              ),
            }),
          ),
          result: Type.Optional(DigitalExperienceMonitoringGetCommandsQuotaResponse),
        }),
      )
      .error("4XX", DigitalExperienceMonitoringApiResponseCommonFailure)
      .summary("Returns account commands usage, quota, and reset time")
      .description(
        "Retrieves the current quota usage and limits for device commands within a specific account, including the time when the quota will reset",
      )
      .operationId("get-commands-quota")
      .tag("DEX Remote Commands")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.get("/commands/{command_id}/downloads/{filename}", {
      params: Type.Object({ command_id: DigitalExperienceMonitoringCommandId, filename: Type.String() }),
    })
      .error("4XX", DigitalExperienceMonitoringApiResponseCommonFailure)
      .summary("Download command output file")
      .description("Downloads artifacts for an executed command. Bulk downloads are not supported")
      .operationId("get-commands-command-id-downloads-filename")
      .tag("DEX Remote Commands")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.get("/devices/dex_tests", {})
      .response(DigitalExperienceMonitoringDexResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("List Device DEX tests")
      .description("Fetch all DEX tests")
      .operationId("device-dex-test-details")
      .tag("Device DEX Tests")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.post("/devices/dex_tests", {
      body: DigitalExperienceMonitoringDeviceDexTestSchemasHttp,
    })
      .response(DigitalExperienceMonitoringDexSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Create Device DEX test")
      .description("Create a DEX test.")
      .operationId("device-dex-test-create-device-dex-test")
      .tag("Device DEX Tests")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare DEX Write"])

    g.get("/devices/dex_tests/{dex_test_id}", {
      params: Type.Object({
        dex_test_id:
          Type.Unknown() /* unresolved: #/components/schemas/digital-experience-monitoring_schemas-test-id */,
      }),
    })
      .response(DigitalExperienceMonitoringDexSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Get Device DEX test")
      .description("Fetch a single DEX test.")
      .operationId("device-dex-test-get-device-dex-test")
      .tag("Device DEX Tests")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.put("/devices/dex_tests/{dex_test_id}", {
      params: Type.Object({ dex_test_id: DigitalExperienceMonitoringUuid }),
      body: DigitalExperienceMonitoringDeviceDexTestSchemasHttp,
    })
      .response(DigitalExperienceMonitoringDexSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Update Device DEX test")
      .description("Update a DEX test.")
      .operationId("device-dex-test-update-device-dex-test")
      .tag("Device DEX Tests")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare DEX Write"])

    g.delete("/devices/dex_tests/{dex_test_id}", {
      params: Type.Object({ dex_test_id: DigitalExperienceMonitoringUuid }),
    })
      .response(DigitalExperienceMonitoringDexDeleteResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Delete Device DEX test")
      .description("Delete a Device DEX test. Returns the remaining device dex tests for the account.")
      .operationId("device-dex-test-delete-device-dex-test")
      .tag("Device DEX Tests")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare DEX Write"])

    g.get("/devices/{device_id}/fleet-status/live", {
      params: Type.Object({ device_id: DigitalExperienceMonitoringDeviceId }),
      query: Type.Object({
        since_minutes: DigitalExperienceMonitoringSinceMinutes,
        time_now: Type.Optional(DigitalExperienceMonitoringTimeNow),
        colo: Type.Optional(DigitalExperienceMonitoringColo),
      }),
    })
      .response(DigitalExperienceMonitoringDevice)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Get the live status of a latest device")
      .description("Get the live status of a latest device given device_id from the device_state table")
      .operationId("devices-live-status")
      .tag("DEX Synthetic Application Monitoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.get("/fleet-status/devices", {
      query: Type.Object({
        to: DigitalExperienceMonitoringTimestamp,
        from: DigitalExperienceMonitoringTimestamp,
        page: DigitalExperienceMonitoringPage,
        per_page: DigitalExperienceMonitoringPerPage,
        sort_by: Type.Optional(DigitalExperienceMonitoringSortBy),
        colo: Type.Optional(DigitalExperienceMonitoringColo),
        device_id: Type.Optional(DigitalExperienceMonitoringDeviceId),
        mode: Type.Optional(DigitalExperienceMonitoringMode),
        status: Type.Optional(DigitalExperienceMonitoringStatus),
        platform: Type.Optional(DigitalExperienceMonitoringPlatform),
        version: Type.Optional(DigitalExperienceMonitoringVersion),
        source: Type.Optional(DigitalExperienceMonitoringSource),
      }),
    })
      .response(DigitalExperienceMonitoringFleetStatusDevicesResponse)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("List fleet status devices")
      .description("List details for devices using WARP")
      .operationId("dex-fleet-status-devices")
      .tag("DEX Synthetic Application Monitoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.get("/fleet-status/live", {
      query: Type.Object({
        since_minutes: DigitalExperienceMonitoringSinceMinutes,
      }),
    })
      .response(DigitalExperienceMonitoringFleetStatusLiveResponse)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("List fleet status details by dimension")
      .description("List details for live (up to 60 minutes) devices using WARP")
      .operationId("dex-fleet-status-live")
      .tag("DEX Synthetic Application Monitoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.get("/fleet-status/over-time", {
      query: Type.Object({
        to: DigitalExperienceMonitoringTimestamp,
        from: DigitalExperienceMonitoringTimestamp,
        colo: Type.Optional(DigitalExperienceMonitoringColo),
        device_id: Type.Optional(DigitalExperienceMonitoringDeviceId),
      }),
    })
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("List fleet status aggregate details by dimension")
      .description("List details for devices using WARP, up to 7 days")
      .operationId("dex-fleet-status-over-time")
      .tag("DEX Synthetic Application Monitoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.get("/http-tests/{test_id}", {
      params: Type.Object({ test_id: DigitalExperienceMonitoringUuid }),
      query: Type.Object({
        deviceId: Type.Optional(Type.Array(Type.String())),
        from: Type.String(),
        to: Type.String(),
        interval: Type.Union([Type.Literal("minute"), Type.Literal("hour")]),
        colo: Type.Optional(Type.String()),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DigitalExperienceMonitoringHttpDetailsResponse),
        }),
      )
      .error("4XX", DigitalExperienceMonitoringApiResponseCommonFailure)
      .summary("Get details and aggregate metrics for an http test")
      .description(
        "Get test details and aggregate performance metrics for an http test for a given time period between 1 hour and 7 days.",
      )
      .operationId("dex-endpoints-http-test-details")
      .tag("DEX Synthetic Application Monitoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.get("/http-tests/{test_id}/percentiles", {
      params: Type.Object({ test_id: DigitalExperienceMonitoringUuid }),
      query: Type.Object({
        deviceId: Type.Optional(Type.Array(Type.String())),
        from: Type.String(),
        to: Type.String(),
        colo: Type.Optional(Type.String()),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DigitalExperienceMonitoringHttpDetailsPercentilesResponse),
        }),
      )
      .error("4XX", DigitalExperienceMonitoringApiResponseCommonFailure)
      .summary("Get percentiles for an http test")
      .description("Get percentiles for an http test for a given time period between 1 hour and 7 days.")
      .operationId("dex-endpoints-http-test-percentiles")
      .tag("DEX Synthetic Application Monitoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.get("/tests/overview", {
      query: Type.Object({
        colo: Type.Optional(Type.String()),
        testName: Type.Optional(Type.String()),
        deviceId: Type.Optional(Type.Array(Type.String())),
        page: Type.Optional(Type.Number({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Number({ default: 10, minimum: 1, maximum: 50 })),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DigitalExperienceMonitoringTestsResponse),
        }),
      )
      .error("4XX", DigitalExperienceMonitoringApiResponseCommonFailure)
      .summary("List DEX test analytics")
      .description("List DEX tests with overview metrics")
      .operationId("dex-endpoints-list-tests-overview")
      .tag("DEX Synthetic Application Monitoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.get("/tests/unique-devices", {
      query: Type.Object({
        testName: Type.Optional(Type.String()),
        deviceId: Type.Optional(Type.Array(Type.String())),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DigitalExperienceMonitoringUniqueDevicesResponse),
        }),
      )
      .error("4XX", DigitalExperienceMonitoringApiResponseCommonFailure)
      .summary("Get count of devices targeted")
      .description(
        "Returns unique count of devices that have run synthetic application monitoring tests in the past 7 days.",
      )
      .operationId("dex-endpoints-tests-unique-devices")
      .tag("DEX Synthetic Application Monitoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.get("/traceroute-test-results/{test_result_id}/network-path", {
      params: Type.Object({ test_result_id: DigitalExperienceMonitoringUuid }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DigitalExperienceMonitoringTracerouteTestResultNetworkPathResponse),
        }),
      )
      .error("4XX", DigitalExperienceMonitoringApiResponseCommonFailure)
      .summary("Get details for a specific traceroute test run")
      .description("Get a breakdown of hops and performance metrics for a specific traceroute test run")
      .operationId("dex-endpoints-traceroute-test-result-network-path")
      .tag("DEX Synthetic Application Monitoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.get("/traceroute-tests/{test_id}", {
      params: Type.Object({ test_id: DigitalExperienceMonitoringUuid }),
      query: Type.Object({
        deviceId: Type.Optional(Type.Array(Type.String())),
        from: Type.String(),
        to: Type.String(),
        interval: Type.Union([Type.Literal("minute"), Type.Literal("hour")]),
        colo: Type.Optional(Type.String()),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DigitalExperienceMonitoringTracerouteDetailsResponse),
        }),
      )
      .error("4XX", DigitalExperienceMonitoringApiResponseCommonFailure)
      .summary("Get details and aggregate metrics for a traceroute test")
      .description(
        "Get test details and aggregate performance metrics for an traceroute test for a given time period between 1 hour and 7 days.",
      )
      .operationId("dex-endpoints-traceroute-test-details")
      .tag("DEX Synthetic Application Monitoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.get("/traceroute-tests/{test_id}/network-path", {
      params: Type.Object({ test_id: DigitalExperienceMonitoringUuid }),
      query: Type.Object({
        deviceId: Type.String(),
        from: Type.String(),
        to: Type.String(),
        interval: Type.Union([Type.Literal("minute"), Type.Literal("hour")]),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DigitalExperienceMonitoringTracerouteTestNetworkPathResponse),
        }),
      )
      .error("4XX", DigitalExperienceMonitoringApiResponseCommonFailure)
      .summary("Get network path breakdown for a traceroute test")
      .description("Get a breakdown of metrics by hop for individual traceroute test runs")
      .operationId("dex-endpoints-traceroute-test-network-path")
      .tag("DEX Synthetic Application Monitoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.get("/traceroute-tests/{test_id}/percentiles", {
      params: Type.Object({ test_id: DigitalExperienceMonitoringUuid }),
      query: Type.Object({
        deviceId: Type.Optional(Type.Array(Type.String())),
        from: Type.String(),
        to: Type.String(),
        colo: Type.Optional(Type.String()),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(DigitalExperienceMonitoringTracerouteDetailsPercentilesResponse),
        }),
      )
      .error("4XX", DigitalExperienceMonitoringApiResponseCommonFailure)
      .summary("Get percentiles for a traceroute test")
      .description("Get percentiles for a traceroute test for a given time period between 1 hour and 7 days.")
      .operationId("dex-endpoints-traceroute-test-percentiles")
      .tag("DEX Synthetic Application Monitoring")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])

    g.get("/warp-change-events", {
      query: Type.Object({
        page: Type.Number({ minimum: 1 }),
        per_page: Type.Number({ minimum: 1, maximum: 50 }),
        from: Type.String(),
        to: Type.String(),
        type: Type.Optional(Type.Union([Type.Literal("config"), Type.Literal("toggle")])),
        toggle: Type.Optional(Type.Union([Type.Literal("on"), Type.Literal("off")])),
        config_name: Type.Optional(Type.String()),
        account_name: Type.Optional(Type.String()),
        sort_order: Type.Optional(Type.Union([Type.Literal("ASC"), Type.Literal("DESC")])),
      }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
              per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
              total_count: Type.Optional(
                Type.Number({ description: "Total results available without any search parameters." }),
              ),
            }),
          ),
          result: Type.Optional(DigitalExperienceMonitoringWarpEventsResponse),
        }),
      )
      .error("4XX", DigitalExperienceMonitoringApiResponseCommonFailure)
      .summary("List WARP change events.")
      .description("List WARP configuration and enablement toggle change events by device.")
      .operationId("list-warp-change-events")
      .tag("WARP Change Events")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare DEX Write",
        "Cloudflare DEX Read",
        "Zero Trust Report",
        "Zero Trust Read",
      ])
  })
}

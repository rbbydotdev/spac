import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages } from "../shared/schemas"

export const DigitalExperienceMonitoringUuid = named(
  "digital-experience-monitoring_uuid",
  Type.String({ description: "API Resource UUID tag.", maxLength: 36 }),
)

export const DigitalExperienceMonitoringTimestamp = named(
  "digital-experience-monitoring_timestamp",
  Type.String({ description: "Timestamp in ISO format" }),
)

export const DigitalExperienceMonitoringWarpToggleChangeEvent = named(
  "digital-experience-monitoring_warp_toggle_change_event",
  Type.Object({
    account_name: Type.Optional(Type.String({ description: "The account name." })),
    account_tag: Type.Optional(Type.String({ description: "The public account identifier." })),
    device_id: Type.Optional(DigitalExperienceMonitoringUuid),
    device_registration: Type.Optional(DigitalExperienceMonitoringUuid),
    hostname: Type.Optional(Type.String({ description: "The hostname of the machine the event is from" })),
    serial_number: Type.Optional(Type.String({ description: "The serial number of the machine the event is from" })),
    timestamp: Type.Optional(DigitalExperienceMonitoringTimestamp),
    toggle: Type.Optional(
      Type.Union([Type.Literal("on"), Type.Literal("off")], { description: "The state of the WARP toggle." }),
    ),
    user_email: Type.Optional(Type.String({ description: "Email tied to the device" })),
  }),
)

export const DigitalExperienceMonitoringWarpConfigDetails = named(
  "digital-experience-monitoring_warp_config_details",
  Type.Object({
    account_name: Type.Optional(Type.String({ description: "The account name." })),
    account_tag: Type.Optional(DigitalExperienceMonitoringUuid),
    config_name: Type.Optional(Type.String({ description: "The name of the WARP configuration." })),
  }),
)

export const DigitalExperienceMonitoringWarpConfigChangeEvent = named(
  "digital-experience-monitoring_warp_config_change_event",
  Type.Object({
    device_id: Type.Optional(DigitalExperienceMonitoringUuid),
    device_registration: Type.Optional(DigitalExperienceMonitoringUuid),
    from: Type.Optional(DigitalExperienceMonitoringWarpConfigDetails),
    hostname: Type.Optional(Type.String({ description: "The hostname of the machine the event is from" })),
    serial_number: Type.Optional(Type.String({ description: "The serial number of the machine the event is from" })),
    timestamp: Type.Optional(DigitalExperienceMonitoringTimestamp),
    to: Type.Optional(DigitalExperienceMonitoringWarpConfigDetails),
    user_email: Type.Optional(Type.String({ description: "Email tied to the device" })),
  }),
)

export const DigitalExperienceMonitoringWarpEventsResponse = named(
  "digital-experience-monitoring_warp_events_response",
  Type.Array(
    Type.Union([DigitalExperienceMonitoringWarpToggleChangeEvent, DigitalExperienceMonitoringWarpConfigChangeEvent]),
  ),
)

export const DigitalExperienceMonitoringPercentiles = named(
  "digital-experience-monitoring_percentiles",
  Type.Object({
    p50: Type.Optional(Type.Union([Type.Number({ description: "p50 observed in the time period" }), Type.Null()])),
    p90: Type.Optional(Type.Union([Type.Number({ description: "p90 observed in the time period" }), Type.Null()])),
    p95: Type.Optional(Type.Union([Type.Number({ description: "p95 observed in the time period" }), Type.Null()])),
    p99: Type.Optional(Type.Union([Type.Number({ description: "p99 observed in the time period" }), Type.Null()])),
  }),
)

export const DigitalExperienceMonitoringTracerouteDetailsPercentilesResponse = named(
  "digital-experience-monitoring_traceroute_details_percentiles_response",
  Type.Object({
    hopsCount: Type.Optional(DigitalExperienceMonitoringPercentiles),
    packetLossPct: Type.Optional(DigitalExperienceMonitoringPercentiles),
    roundTripTimeMs: Type.Optional(DigitalExperienceMonitoringPercentiles),
  }),
)

export const DigitalExperienceMonitoringTracerouteTestNetworkPathResponse = named(
  "digital-experience-monitoring_traceroute_test_network_path_response",
  Type.Object({
    deviceName: Type.Optional(Type.String()),
    id: DigitalExperienceMonitoringUuid,
    interval: Type.Optional(
      Type.String({ description: "The interval at which the Traceroute synthetic application test is set to run." }),
    ),
    kind: Type.Optional(Type.Union([Type.Literal("traceroute")])),
    name: Type.Optional(Type.String()),
    networkPath: Type.Optional(
      Type.Object({
        sampling: Type.Optional(
          Type.Union([
            Type.Object(
              {
                unit: Type.Union([Type.Literal("hours")]),
                value: Type.Integer(),
              },
              {
                description:
                  "Specifies the sampling applied, if any, to the slots response. When sampled, results shown represent the first test run to the start of each sampling interval.",
              },
            ),
            Type.Null(),
          ]),
        ),
        slots: Type.Array(
          Type.Object({
            clientToAppRttMs: Type.Union([
              Type.Integer({ description: "Round trip time in ms of the client to app mile" }),
              Type.Null(),
            ]),
            clientToCfEgressRttMs: Type.Union([
              Type.Integer({ description: "Round trip time in ms of the client to Cloudflare egress mile" }),
              Type.Null(),
            ]),
            clientToCfIngressRttMs: Type.Union([
              Type.Integer({ description: "Round trip time in ms of the client to Cloudflare ingress mile" }),
              Type.Null(),
            ]),
            clientToIspRttMs: Type.Optional(
              Type.Union([
                Type.Integer({ description: "Round trip time in ms of the client to ISP mile" }),
                Type.Null(),
              ]),
            ),
            id: DigitalExperienceMonitoringUuid,
            timestamp: Type.String(),
          }),
        ),
      }),
    ),
    url: Type.Optional(Type.String({ description: "The host of the Traceroute synthetic application test" })),
  }),
)

export const UnnamedSchemaRefBf9e2abcf1b78a6cab8e6e29e2228a11 = named(
  "unnamed_schema_ref_bf9e2abcf1b78a6cab8e6e29e2228a11",
  Type.Object({
    default: Type.Boolean({ description: "Whether the policy is the default for the account" }),
    id: Type.String(),
    name: Type.String(),
  }),
)

export const DigitalExperienceMonitoringTestStatPctOverTime = named(
  "digital-experience-monitoring_test_stat_pct_over_time",
  Type.Object({
    avg: Type.Optional(
      Type.Union([Type.Number({ description: "average observed in the time period", format: "float" }), Type.Null()]),
    ),
    max: Type.Optional(
      Type.Union([Type.Number({ description: "highest observed in the time period", format: "float" }), Type.Null()]),
    ),
    min: Type.Optional(
      Type.Union([Type.Number({ description: "lowest  observed in the time period", format: "float" }), Type.Null()]),
    ),
    slots: Type.Array(
      Type.Object({
        timestamp: Type.String(),
        value: Type.Number({ format: "float" }),
      }),
    ),
  }),
)

export const DigitalExperienceMonitoringTestStatOverTime = named(
  "digital-experience-monitoring_test_stat_over_time",
  Type.Object({
    avg: Type.Optional(Type.Union([Type.Integer({ description: "average observed in the time period" }), Type.Null()])),
    max: Type.Optional(Type.Union([Type.Integer({ description: "highest observed in the time period" }), Type.Null()])),
    min: Type.Optional(Type.Union([Type.Integer({ description: "lowest observed in the time period" }), Type.Null()])),
    slots: Type.Array(
      Type.Object({
        timestamp: Type.String(),
        value: Type.Integer(),
      }),
    ),
  }),
)

export const DigitalExperienceMonitoringTracerouteDetailsResponse = named(
  "digital-experience-monitoring_traceroute_details_response",
  Type.Object({
    host: Type.String({ description: "The host of the Traceroute synthetic application test" }),
    interval: Type.String({
      description: "The interval at which the Traceroute synthetic application test is set to run.",
    }),
    kind: Type.Union([Type.Literal("traceroute")]),
    name: Type.String({ description: "The name of the Traceroute synthetic application test" }),
    target_policies: Type.Optional(
      Type.Union([Type.Array(UnnamedSchemaRefBf9e2abcf1b78a6cab8e6e29e2228a11), Type.Null()]),
    ),
    targeted: Type.Optional(Type.Boolean()),
    tracerouteStats: Type.Optional(
      Type.Union([
        Type.Object({
          availabilityPct: DigitalExperienceMonitoringTestStatPctOverTime,
          hopsCount: DigitalExperienceMonitoringTestStatOverTime,
          packetLossPct: DigitalExperienceMonitoringTestStatPctOverTime,
          roundTripTimeMs: DigitalExperienceMonitoringTestStatOverTime,
          uniqueDevicesTotal: Type.Integer({
            description: "Count of unique devices that have run this test in the given time period",
          }),
        }),
        Type.Null(),
      ]),
    ),
    tracerouteStatsByColo: Type.Optional(
      Type.Array(
        Type.Object({
          availabilityPct: DigitalExperienceMonitoringTestStatPctOverTime,
          colo: Type.String(),
          hopsCount: DigitalExperienceMonitoringTestStatOverTime,
          packetLossPct: DigitalExperienceMonitoringTestStatPctOverTime,
          roundTripTimeMs: DigitalExperienceMonitoringTestStatOverTime,
          uniqueDevicesTotal: Type.Integer({
            description: "Count of unique devices that have run this test in the given time period",
          }),
        }),
      ),
    ),
  }),
)

export const DigitalExperienceMonitoringTracerouteTestResultNetworkPathResponse = named(
  "digital-experience-monitoring_traceroute_test_result_network_path_response",
  Type.Object({
    deviceName: Type.Optional(
      Type.String({ description: "name of the device associated with this network path response" }),
    ),
    hops: Type.Array(
      Type.Object({
        asn: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
        aso: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        ipAddress: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        location: Type.Optional(
          Type.Object({
            city: Type.Optional(Type.Union([Type.String(), Type.Null()])),
            state: Type.Optional(Type.Union([Type.String(), Type.Null()])),
            zip: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          }),
        ),
        mile: Type.Optional(
          Type.Union([
            Type.Literal("client-to-app"),
            Type.Literal("client-to-cf-egress"),
            Type.Literal("client-to-cf-ingress"),
            Type.Literal("client-to-isp"),
          ]),
        ),
        name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        packetLossPct: Type.Optional(Type.Union([Type.Number({ format: "float" }), Type.Null()])),
        rttMs: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
        ttl: Type.Integer(),
      }),
      { description: "an array of the hops taken by the device to reach the end destination" },
    ),
    resultId: DigitalExperienceMonitoringUuid,
    testId: Type.Optional(DigitalExperienceMonitoringUuid),
    testName: Type.Optional(Type.String({ description: "name of the tracroute test" })),
  }),
)

export const DigitalExperienceMonitoringUniqueDevicesResponse = named(
  "digital-experience-monitoring_unique_devices_response",
  Type.Object({
    uniqueDevicesTotal: Type.Integer({ description: "total number of unique devices" }),
  }),
)

export const DigitalExperienceMonitoringAggregateTimePeriod = named(
  "digital-experience-monitoring_aggregate_time_period",
  Type.Object({
    units: Type.Union([Type.Literal("hours"), Type.Literal("days"), Type.Literal("testRuns")]),
    value: Type.Integer(),
  }),
)

export const DigitalExperienceMonitoringAggregateStat = named(
  "digital-experience-monitoring_aggregate_stat",
  Type.Object({
    avgMs: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    deltaPct: Type.Optional(Type.Union([Type.Number({ format: "float" }), Type.Null()])),
    timePeriod: DigitalExperienceMonitoringAggregateTimePeriod,
  }),
)

export const DigitalExperienceMonitoringAggregateTimeSlot = named(
  "digital-experience-monitoring_aggregate_time_slot",
  Type.Object({
    avgMs: Type.Integer(),
    timestamp: Type.String(),
  }),
)

export const DigitalExperienceMonitoringTimingAggregates = named(
  "digital-experience-monitoring_timing_aggregates",
  Type.Object({
    avgMs: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    history: Type.Array(DigitalExperienceMonitoringAggregateStat),
    overTime: Type.Optional(
      Type.Union([
        Type.Object({
          timePeriod: DigitalExperienceMonitoringAggregateTimePeriod,
          values: Type.Array(DigitalExperienceMonitoringAggregateTimeSlot),
        }),
        Type.Null(),
      ]),
    ),
  }),
)

export const DigitalExperienceMonitoringTestsResponse = named(
  "digital-experience-monitoring_tests_response",
  Type.Object({
    overviewMetrics: Type.Object({
      avgHttpAvailabilityPct: Type.Optional(
        Type.Union([
          Type.Number({
            description: "percentage availability for all HTTP test results in response",
            format: "float",
          }),
          Type.Null(),
        ]),
      ),
      avgTracerouteAvailabilityPct: Type.Optional(
        Type.Union([
          Type.Number({
            description: "percentage availability for all traceroutes results in response",
            format: "float",
          }),
          Type.Null(),
        ]),
      ),
      testsTotal: Type.Integer({ description: "number of  tests." }),
    }),
    tests: Type.Array(
      Type.Object({
        created: Type.String({ description: "date the test was created." }),
        description: Type.String({ description: "the test description defined during configuration" }),
        enabled: Type.Boolean({
          description: "if true, then the test will run on targeted devices. Else, the test will not run.",
        }),
        host: Type.String(),
        httpResults: Type.Optional(
          Type.Union([
            Type.Object({
              resourceFetchTime: DigitalExperienceMonitoringTimingAggregates,
            }),
            Type.Null(),
          ]),
        ),
        httpResultsByColo: Type.Optional(
          Type.Array(
            Type.Object({
              colo: Type.String({ description: "Cloudflare colo" }),
              resourceFetchTime: DigitalExperienceMonitoringTimingAggregates,
            }),
          ),
        ),
        id: DigitalExperienceMonitoringUuid,
        interval: Type.String({ description: "The interval at which the synthetic application test is set to run." }),
        kind: Type.Union([Type.Literal("http"), Type.Literal("traceroute")], {
          description: "test type, http or traceroute",
        }),
        method: Type.Optional(Type.String({ description: "for HTTP, the method to use when running the test" })),
        name: Type.String({ description: "name given to this test" }),
        target_policies: Type.Optional(
          Type.Union([Type.Array(UnnamedSchemaRefBf9e2abcf1b78a6cab8e6e29e2228a11), Type.Null()]),
        ),
        targeted: Type.Optional(Type.Boolean()),
        tracerouteResults: Type.Optional(
          Type.Union([
            Type.Object({
              roundTripTime: DigitalExperienceMonitoringTimingAggregates,
            }),
            Type.Null(),
          ]),
        ),
        tracerouteResultsByColo: Type.Optional(
          Type.Array(
            Type.Object({
              colo: Type.String({ description: "Cloudflare colo" }),
              roundTripTime: DigitalExperienceMonitoringTimingAggregates,
            }),
          ),
        ),
        updated: Type.String(),
      }),
      { description: "array of test results objects." },
    ),
  }),
)

export const DigitalExperienceMonitoringHttpDetailsPercentilesResponse = named(
  "digital-experience-monitoring_http_details_percentiles_response",
  Type.Object({
    dnsResponseTimeMs: Type.Optional(DigitalExperienceMonitoringPercentiles),
    resourceFetchTimeMs: Type.Optional(DigitalExperienceMonitoringPercentiles),
    serverResponseTimeMs: Type.Optional(DigitalExperienceMonitoringPercentiles),
  }),
)

export const DigitalExperienceMonitoringHttpDetailsResponse = named(
  "digital-experience-monitoring_http_details_response",
  Type.Object({
    host: Type.Optional(Type.String({ description: "The url of the HTTP synthetic application test" })),
    httpStats: Type.Optional(
      Type.Union([
        Type.Object({
          availabilityPct: DigitalExperienceMonitoringTestStatPctOverTime,
          dnsResponseTimeMs: DigitalExperienceMonitoringTestStatOverTime,
          httpStatusCode: Type.Array(
            Type.Object({
              status200: Type.Integer(),
              status300: Type.Integer(),
              status400: Type.Integer(),
              status500: Type.Integer(),
              timestamp: Type.String(),
            }),
          ),
          resourceFetchTimeMs: DigitalExperienceMonitoringTestStatOverTime,
          serverResponseTimeMs: DigitalExperienceMonitoringTestStatOverTime,
          uniqueDevicesTotal: Type.Integer({
            description: "Count of unique devices that have run this test in the given time period",
          }),
        }),
        Type.Null(),
      ]),
    ),
    httpStatsByColo: Type.Optional(
      Type.Array(
        Type.Object({
          availabilityPct: DigitalExperienceMonitoringTestStatPctOverTime,
          colo: Type.String(),
          dnsResponseTimeMs: DigitalExperienceMonitoringTestStatOverTime,
          httpStatusCode: Type.Array(
            Type.Object({
              status200: Type.Integer(),
              status300: Type.Integer(),
              status400: Type.Integer(),
              status500: Type.Integer(),
              timestamp: Type.String(),
            }),
          ),
          resourceFetchTimeMs: DigitalExperienceMonitoringTestStatOverTime,
          serverResponseTimeMs: DigitalExperienceMonitoringTestStatOverTime,
          uniqueDevicesTotal: Type.Integer({
            description: "Count of unique devices that have run this test in the given time period",
          }),
        }),
      ),
    ),
    interval: Type.Optional(
      Type.String({ description: "The interval at which the HTTP synthetic application test is set to run." }),
    ),
    kind: Type.Optional(Type.Union([Type.Literal("http")])),
    method: Type.Optional(Type.String({ description: "The HTTP method to use when running the test" })),
    name: Type.Optional(Type.String({ description: "The name of the HTTP synthetic application test" })),
    target_policies: Type.Optional(
      Type.Union([Type.Array(UnnamedSchemaRefBf9e2abcf1b78a6cab8e6e29e2228a11), Type.Null()]),
    ),
    targeted: Type.Optional(Type.Boolean()),
  }),
)

export const DigitalExperienceMonitoringUniquedevicestotal = named(
  "digital-experience-monitoring_uniqueDevicesTotal",
  Type.Number({ description: "Number of unique devices" }),
)

export const DigitalExperienceMonitoringLiveStat = named(
  "digital-experience-monitoring_live_stat",
  Type.Object({
    uniqueDevicesTotal: Type.Optional(DigitalExperienceMonitoringUniquedevicestotal),
    value: Type.Optional(Type.String()),
  }),
)

export const DigitalExperienceMonitoringFleetStatusLiveResponse = named(
  "digital-experience-monitoring_fleet_status_live_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        deviceStats: Type.Optional(
          Type.Object({
            byColo: Type.Optional(Type.Union([Type.Array(DigitalExperienceMonitoringLiveStat), Type.Null()])),
            byMode: Type.Optional(Type.Union([Type.Array(DigitalExperienceMonitoringLiveStat), Type.Null()])),
            byPlatform: Type.Optional(Type.Union([Type.Array(DigitalExperienceMonitoringLiveStat), Type.Null()])),
            byStatus: Type.Optional(Type.Union([Type.Array(DigitalExperienceMonitoringLiveStat), Type.Null()])),
            byVersion: Type.Optional(Type.Union([Type.Array(DigitalExperienceMonitoringLiveStat), Type.Null()])),
            uniqueDevicesTotal: Type.Optional(DigitalExperienceMonitoringUniquedevicestotal),
          }),
        ),
      }),
    ),
  }),
)

export const DigitalExperienceMonitoringSource = named(
  "digital-experience-monitoring_source",
  Type.Union([Type.Literal("last_seen"), Type.Literal("hourly"), Type.Literal("raw")], {
    description: "Specifies fleet status details source",
  }),
)

export const DigitalExperienceMonitoringVersion = named(
  "digital-experience-monitoring_version",
  Type.String({ description: "WARP client version" }),
)

export const DigitalExperienceMonitoringPlatform = named(
  "digital-experience-monitoring_platform",
  Type.String({ description: "Operating system" }),
)

export const DigitalExperienceMonitoringStatus = named(
  "digital-experience-monitoring_status",
  Type.String({ description: "Network status" }),
)

export const DigitalExperienceMonitoringMode = named(
  "digital-experience-monitoring_mode",
  Type.String({ description: "The mode under which the WARP client is run" }),
)

export const DigitalExperienceMonitoringSortBy = named(
  "digital-experience-monitoring_sort_by",
  Type.Union(
    [
      Type.Literal("colo"),
      Type.Literal("device_id"),
      Type.Literal("mode"),
      Type.Literal("platform"),
      Type.Literal("status"),
      Type.Literal("timestamp"),
      Type.Literal("version"),
    ],
    { description: "Dimension to sort results by" },
  ),
)

export const DigitalExperienceMonitoringPerPage = named(
  "digital-experience-monitoring_per_page",
  Type.Number({ description: "Number of items per page", minimum: 1, maximum: 50 }),
)

export const DigitalExperienceMonitoringPage = named(
  "digital-experience-monitoring_page",
  Type.Number({ description: "Page number of paginated results", default: 1, minimum: 1 }),
)

export const DigitalExperienceMonitoringColo = named(
  "digital-experience-monitoring_colo",
  Type.String({ description: "Cloudflare colo" }),
)

export const DigitalExperienceMonitoringCpuPctByApp = named(
  "digital-experience-monitoring_cpu_pct_by_app",
  Type.Array(
    Type.Object({
      cpu_pct: Type.Optional(Type.Number({ format: "float" })),
      name: Type.Optional(Type.String()),
    }),
  ),
)

export const DigitalExperienceMonitoringIpInfo = named(
  "digital-experience-monitoring_ip_info",
  Type.Object({
    address: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    asn: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    aso: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    location: Type.Optional(
      Type.Object({
        city: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        country_iso: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        state_iso: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        zip: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      }),
    ),
    netmask: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    version: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  }),
)

export const DigitalExperienceMonitoringPersonemail = named(
  "digital-experience-monitoring_personEmail",
  Type.String({ description: "User contact email address" }),
)

export const DigitalExperienceMonitoringRamUsedPctByApp = named(
  "digital-experience-monitoring_ram_used_pct_by_app",
  Type.Array(
    Type.Object({
      name: Type.Optional(Type.String()),
      ram_used_pct: Type.Optional(Type.Number({ format: "float" })),
    }),
  ),
)

export const DigitalExperienceMonitoringDevice = named(
  "digital-experience-monitoring_device",
  Type.Object({
    alwaysOn: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    batteryCharging: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    batteryCycles: Type.Optional(Type.Union([Type.Integer({ format: "int64" }), Type.Null()])),
    batteryPct: Type.Optional(Type.Union([Type.Number({ format: "float" }), Type.Null()])),
    colo: DigitalExperienceMonitoringColo,
    connectionType: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    cpuPct: Type.Optional(Type.Union([Type.Number({ format: "float" }), Type.Null()])),
    cpuPctByApp: Type.Optional(Type.Union([Type.Array(DigitalExperienceMonitoringCpuPctByApp), Type.Null()])),
    deviceId: Type.String({ description: "Device identifier (UUID v4)" }),
    deviceIpv4: Type.Optional(DigitalExperienceMonitoringIpInfo),
    deviceIpv6: Type.Optional(DigitalExperienceMonitoringIpInfo),
    deviceName: Type.Optional(Type.String({ description: "Device identifier (human readable)" })),
    diskReadBps: Type.Optional(Type.Union([Type.Integer({ format: "int64" }), Type.Null()])),
    diskUsagePct: Type.Optional(Type.Union([Type.Number({ format: "float" }), Type.Null()])),
    diskWriteBps: Type.Optional(Type.Union([Type.Integer({ format: "int64" }), Type.Null()])),
    dohSubdomain: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    estimatedLossPct: Type.Optional(Type.Union([Type.Number({ format: "float" }), Type.Null()])),
    firewallEnabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    gatewayIpv4: Type.Optional(DigitalExperienceMonitoringIpInfo),
    gatewayIpv6: Type.Optional(DigitalExperienceMonitoringIpInfo),
    handshakeLatencyMs: Type.Optional(Type.Union([Type.Number({ format: "int64" }), Type.Null()])),
    ispIpv4: Type.Optional(DigitalExperienceMonitoringIpInfo),
    ispIpv6: Type.Optional(DigitalExperienceMonitoringIpInfo),
    metal: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    mode: DigitalExperienceMonitoringMode,
    networkRcvdBps: Type.Optional(Type.Union([Type.Integer({ format: "int64" }), Type.Null()])),
    networkSentBps: Type.Optional(Type.Union([Type.Integer({ format: "int64" }), Type.Null()])),
    networkSsid: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    personEmail: Type.Optional(DigitalExperienceMonitoringPersonemail),
    platform: DigitalExperienceMonitoringPlatform,
    ramAvailableKb: Type.Optional(Type.Union([Type.Integer({ format: "int64" }), Type.Null()])),
    ramUsedPct: Type.Optional(Type.Union([Type.Number({ format: "float" }), Type.Null()])),
    ramUsedPctByApp: Type.Optional(Type.Union([Type.Array(DigitalExperienceMonitoringRamUsedPctByApp), Type.Null()])),
    status: DigitalExperienceMonitoringStatus,
    switchLocked: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    timestamp: DigitalExperienceMonitoringTimestamp,
    version: DigitalExperienceMonitoringVersion,
    wifiStrengthDbm: Type.Optional(Type.Union([Type.Integer({ format: "int64" }), Type.Null()])),
  }),
)

export const DigitalExperienceMonitoringFleetStatusDevicesResponse = named(
  "digital-experience-monitoring_fleet_status_devices_response",
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
    result: Type.Optional(Type.Array(DigitalExperienceMonitoringDevice)),
  }),
)

export const DigitalExperienceMonitoringTimeNow = named(
  "digital-experience-monitoring_time_now",
  Type.String({ description: "Current time in ISO format" }),
)

export const DigitalExperienceMonitoringSinceMinutes = named(
  "digital-experience-monitoring_since_minutes",
  Type.Number({ description: "Number of minutes before current time", default: 10, minimum: 1, maximum: 60 }),
)

export const DigitalExperienceMonitoringDeviceId = named(
  "digital-experience-monitoring_device_id",
  Type.String({ description: "Device-specific ID, given as UUID v4" }),
)

export const DigitalExperienceMonitoringDexTargetPolicy = named(
  "digital-experience-monitoring_dex_target_policy",
  Type.Object({
    default: Type.Optional(Type.Boolean({ description: "Whether the DEX rule is the account default" })),
    id: Type.Optional(Type.String({ description: "The id of the DEX rule" })),
    name: Type.Optional(Type.String({ description: "The name of the DEX rule" })),
  }),
)

export const DigitalExperienceMonitoringDeviceDexTestTargetPolicies = named(
  "digital-experience-monitoring_device-dex-test-target-policies",
  Type.Array(DigitalExperienceMonitoringDexTargetPolicy, { description: "DEX rules targeted by this test" }),
)

export const DigitalExperienceMonitoringDeviceDexTestSchemasHttp = named(
  "digital-experience-monitoring_device-dex-test-schemas-http",
  Type.Object({
    data: Type.Unknown() /* unresolved: #/components/schemas/digital-experience-monitoring_device-dex-test-schemas-data */,
    description: Type.Optional(
      Type.Unknown() /* unresolved: #/components/schemas/digital-experience-monitoring_device-dex-test-schemas-description */,
    ),
    enabled:
      Type.Unknown() /* unresolved: #/components/schemas/digital-experience-monitoring_device-dex-test-schemas-enabled */,
    interval:
      Type.Unknown() /* unresolved: #/components/schemas/digital-experience-monitoring_device-dex-test-schemas-interval */,
    name: Type.Unknown() /* unresolved: #/components/schemas/digital-experience-monitoring_device-dex-test-schemas-name */,
    target_policies: Type.Optional(DigitalExperienceMonitoringDeviceDexTestTargetPolicies),
    targeted: Type.Optional(Type.Boolean()),
    test_id: Type.Optional(
      Type.Unknown() /* unresolved: #/components/schemas/digital-experience-monitoring_schemas-test-id */,
    ),
  }),
)

export const DigitalExperienceMonitoringDexDeleteResponseCollection = named(
  "digital-experience-monitoring_dex-delete-response-collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        dex_tests: Type.Optional(Type.Array(DigitalExperienceMonitoringDeviceDexTestSchemasHttp)),
      }),
    ),
  }),
)

export const DigitalExperienceMonitoringDexSingleResponse = named(
  "digital-experience-monitoring_dex-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DigitalExperienceMonitoringDeviceDexTestSchemasHttp),
  }),
)

export const DigitalExperienceMonitoringDexResponseCollection = named(
  "digital-experience-monitoring_dex-response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Union([Type.Array(DigitalExperienceMonitoringDeviceDexTestSchemasHttp), Type.Null()])),
  }),
)

export const DigitalExperienceMonitoringCommandId = named(
  "digital-experience-monitoring_command_id",
  Type.String({ description: "Unique identifier for a command" }),
)

export const DigitalExperienceMonitoringGetCommandsQuotaResponse = named(
  "digital-experience-monitoring_get_commands_quota_response",
  Type.Object({
    quota: Type.Number({ description: "The remaining number of commands that can be initiated for an account" }),
    quota_usage: Type.Number({ description: "The number of commands that have been initiated for an account" }),
    reset_time: Type.String({ description: "The time when the quota resets", format: "date-time" }),
  }),
)

export const DigitalExperienceMonitoringCommandsDevicesResponse = named(
  "digital-experience-monitoring_commands_devices_response",
  Type.Object({
    devices: Type.Optional(
      Type.Array(
        Type.Object({
          deviceId: Type.Optional(Type.String({ description: "Device identifier (UUID v4)" })),
          deviceName: Type.Optional(Type.String({ description: "Device identifier (human readable)" })),
          eligible: Type.Optional(Type.Boolean({ description: "Whether the device is eligible for remote captures" })),
          ineligibleReason: Type.Optional(
            Type.String({ description: "If the device is not eligible, the reason why." }),
          ),
          personEmail: Type.Optional(Type.String({ description: "User contact email address" })),
          platform: Type.Optional(DigitalExperienceMonitoringPlatform),
          status: Type.Optional(DigitalExperienceMonitoringStatus),
          timestamp: Type.Optional(DigitalExperienceMonitoringTimestamp),
          version: Type.Optional(DigitalExperienceMonitoringVersion),
        }),
        { description: "List of eligible devices" },
      ),
    ),
  }),
)

export const DigitalExperienceMonitoringPostCommandsResponse = named(
  "digital-experience-monitoring_post_commands_response",
  Type.Object({
    commands: Type.Optional(
      Type.Array(
        Type.Object({
          args: Type.Optional(
            Type.Record(Type.String(), Type.String({ description: "Command argument value as a string" })),
          ),
          device_id: Type.Optional(
            Type.String({ description: "Identifier for the device associated with the command" }),
          ),
          id: Type.Optional(Type.String({ description: "Unique identifier for the command" })),
          status: Type.Optional(
            Type.Union(
              [
                Type.Literal("PENDING_EXEC"),
                Type.Literal("PENDING_UPLOAD"),
                Type.Literal("SUCCESS"),
                Type.Literal("FAILED"),
              ],
              { description: "Current status of the command" },
            ),
          ),
          type: Type.Optional(Type.String({ description: 'Type of the command (e.g., "pcap" or "warp-diag")' })),
        }),
        { description: "List of created commands" },
      ),
    ),
  }),
)

export const DigitalExperienceMonitoringGetCommandsResponse = named(
  "digital-experience-monitoring_get_commands_response",
  Type.Object({
    commands: Type.Optional(
      Type.Array(
        Type.Object({
          completed_date: Type.Optional(Type.Union([Type.String({ format: "date-time" }), Type.Null()])),
          created_date: Type.Optional(Type.String({ format: "date-time" })),
          device_id: Type.Optional(Type.String()),
          filename: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          id: Type.Optional(Type.String()),
          status: Type.Optional(Type.String()),
          type: Type.Optional(Type.String()),
          user_email: Type.Optional(Type.String()),
        }),
      ),
    ),
  }),
)

export const DigitalExperienceMonitoringAccountIdentifier = named(
  "digital-experience-monitoring_account_identifier",
  Type.String({ maxLength: 32, readOnly: true }),
)

export const DigitalExperienceMonitoringApiResponseCommonFailure = named(
  "digital-experience-monitoring_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const DigitalExperienceMonitoringColosResponse = named(
  "digital-experience-monitoring_colos_response",
  Type.Array(Type.Unknown(), { description: "array of colos." }),
)

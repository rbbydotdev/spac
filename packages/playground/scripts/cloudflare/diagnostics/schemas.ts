import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, MagicTransitUuid } from "../shared/schemas"

export const MagicTransitColoCity = named("magic-transit_colo_city", Type.String({ description: "Source colo city." }))

export const MagicTransitColoName = named("magic-transit_colo_name", Type.String({ description: "Source colo name." }))

export const MagicTransitColo = named(
  "magic-transit_colo",
  Type.Object({
    city: Type.Optional(MagicTransitColoCity),
    name: Type.Optional(MagicTransitColoName),
  }),
)

export const MagicTransitError = named(
  "magic-transit_error",
  Type.Union(
    [
      Type.Literal(""),
      Type.Literal("Could not gather traceroute data: Code 1"),
      Type.Literal("Could not gather traceroute data: Code 2"),
      Type.Literal("Could not gather traceroute data: Code 3"),
      Type.Literal("Could not gather traceroute data: Code 4"),
    ],
    { description: "Errors resulting from collecting traceroute from colo to target." },
  ),
)

export const MagicTransitAsn = named(
  "magic-transit_asn",
  Type.String({ description: "AS number associated with the node object." }),
)

export const MagicTransitIp = named("magic-transit_ip", Type.String({ description: "IP address of the node." }))

export const MagicTransitLabels = named(
  "magic-transit_labels",
  Type.Array(Type.String(), {
    description:
      "Field appears if there is an additional annotation printed when the probe returns. Field also appears when running a GRE+ICMP traceroute to denote which traceroute a node comes from.",
  }),
)

export const MagicTransitMaxRttMs = named(
  "magic-transit_max_rtt_ms",
  Type.Number({ description: "Maximum RTT in ms." }),
)

export const MagicTransitMeanRttMs = named("magic-transit_mean_rtt_ms", Type.Number({ description: "Mean RTT in ms." }))

export const MagicTransitMinRttMs = named(
  "magic-transit_min_rtt_ms",
  Type.Number({ description: "Minimum RTT in ms." }),
)

export const MagicTransitName = named(
  "magic-transit_name",
  Type.String({ description: "Host name of the address, this may be the same as the IP address." }),
)

export const MagicTransitPacketCount = named(
  "magic-transit_packet_count",
  Type.Integer({ description: "Number of packets with a response from this node." }),
)

export const MagicTransitStdDevRttMs = named(
  "magic-transit_std_dev_rtt_ms",
  Type.Number({ description: "Standard deviation of the RTTs in ms." }),
)

export const MagicTransitNodeResult = named(
  "magic-transit_node_result",
  Type.Object({
    asn: Type.Optional(MagicTransitAsn),
    ip: Type.Optional(MagicTransitIp),
    labels: Type.Optional(MagicTransitLabels),
    max_rtt_ms: Type.Optional(MagicTransitMaxRttMs),
    mean_rtt_ms: Type.Optional(MagicTransitMeanRttMs),
    min_rtt_ms: Type.Optional(MagicTransitMinRttMs),
    name: Type.Optional(MagicTransitName),
    packet_count: Type.Optional(MagicTransitPacketCount),
    std_dev_rtt_ms: Type.Optional(MagicTransitStdDevRttMs),
  }),
)

export const MagicTransitPacketsLost = named(
  "magic-transit_packets_lost",
  Type.Integer({ description: "Number of packets where no response was received." }),
)

export const MagicTransitPacketsSent = named(
  "magic-transit_packets_sent",
  Type.Integer({ description: "Number of packets sent with specified TTL." }),
)

export const MagicTransitPacketsTtl = named(
  "magic-transit_packets_ttl",
  Type.Integer({ description: "The time to live (TTL)." }),
)

export const MagicTransitHopResult = named(
  "magic-transit_hop_result",
  Type.Object({
    nodes: Type.Optional(Type.Array(MagicTransitNodeResult, { description: "An array of node objects." })),
    packets_lost: Type.Optional(MagicTransitPacketsLost),
    packets_sent: Type.Optional(MagicTransitPacketsSent),
    packets_ttl: Type.Optional(MagicTransitPacketsTtl),
  }),
)

export const MagicTransitTargetSummary = named(
  "magic-transit_target_summary",
  Type.Unknown({ description: "Aggregated statistics from all hops about the target." }),
)

export const MagicTransitTracerouteTimeMs = named(
  "magic-transit_traceroute_time_ms",
  Type.Integer({ description: "Total time of traceroute in ms." }),
)

export const MagicTransitColoResult = named(
  "magic-transit_colo_result",
  Type.Object({
    colo: Type.Optional(MagicTransitColo),
    error: Type.Optional(MagicTransitError),
    hops: Type.Optional(Type.Array(MagicTransitHopResult)),
    target_summary: Type.Optional(MagicTransitTargetSummary),
    traceroute_time_ms: Type.Optional(MagicTransitTracerouteTimeMs),
  }),
)

export const MagicTransitTarget = named(
  "magic-transit_target",
  Type.String({ description: "The target hostname, IPv6, or IPv6 address." }),
)

export const MagicTransitTargetResult = named(
  "magic-transit_target_result",
  Type.Object({
    colos: Type.Optional(Type.Array(MagicTransitColoResult)),
    target: Type.Optional(MagicTransitTarget),
  }),
)

export const MagicTransitTracerouteResponseCollection = named(
  "magic-transit_traceroute_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(MagicTransitTargetResult)),
  }),
)

export const MagicTransitTargets = named(
  "magic-transit_targets",
  Type.Array(Type.String({ description: "Hosts as a hostname or IPv4/IPv6 address represented by strings." })),
)

export const MagicTransitMaxTtl = named(
  "magic-transit_max_ttl",
  Type.Integer({ description: "Max TTL.", default: 15, minimum: 0, maximum: 64 }),
)

export const MagicTransitPacketType = named(
  "magic-transit_packet_type",
  Type.Union(
    [Type.Literal("icmp"), Type.Literal("tcp"), Type.Literal("udp"), Type.Literal("gre"), Type.Literal("gre+icmp")],
    { description: "Type of packet sent." },
  ),
)

export const MagicTransitPacketsPerTtl = named(
  "magic-transit_packets_per_ttl",
  Type.Integer({ description: "Number of packets sent at each TTL.", default: 3, minimum: 0, maximum: 10 }),
)

export const MagicTransitPort = named(
  "magic-transit_port",
  Type.Integer({
    description:
      "For UDP and TCP, specifies the destination port. For ICMP, specifies the initial ICMP sequence value. Default value 0 will choose the best value to use for each protocol.",
    default: 0,
    minimum: 0,
    maximum: 65535,
  }),
)

export const MagicTransitWaitTime = named(
  "magic-transit_wait_time",
  Type.Integer({
    description: "Set the time (in seconds) to wait for a response to a probe.",
    default: 1,
    minimum: 1,
    maximum: 5,
  }),
)

export const MagicTransitOptions = named(
  "magic-transit_options",
  Type.Object({
    max_ttl: Type.Optional(MagicTransitMaxTtl),
    packet_type: Type.Optional(MagicTransitPacketType),
    packets_per_ttl: Type.Optional(MagicTransitPacketsPerTtl),
    port: Type.Optional(MagicTransitPort),
    wait_time: Type.Optional(MagicTransitWaitTime),
  }),
)

export const MagicTransitColos = named(
  "magic-transit_colos",
  Type.Array(Type.String({ description: "Source colo name." }), {
    description:
      "If no source colo names specified, all colos will be used. China colos are unavailable for traceroutes.",
  }),
)

export const MagicTransitApiResponseCommon = named(
  "magic-transit_api-response-common",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const MagicTransitCheckType = named(
  "magic-transit_check_type",
  Type.Union([Type.Literal("icmp")], { description: "type of check to perform" }),
)

export const MagicTransitEndpointHealthCheck = named(
  "magic-transit_endpoint_health_check",
  Type.Object({
    check_type: MagicTransitCheckType,
    endpoint: Type.String({ description: "the IP address of the host to perform checks against" }),
    name: Type.Optional(Type.String({ description: "Optional name associated with this check" })),
  }),
)

export const MagicTransitApiResponseCommonFailure = named(
  "magic-transit_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const MagicTransitEndpointHealthCheckResponse = named(
  "magic-transit_endpoint_health_check_response",
  Type.Object({
    check_type: MagicTransitCheckType,
    endpoint: Type.String({ description: "the IP address of the host to perform checks against" }),
    name: Type.Optional(Type.String({ description: "Optional name associated with this check" })),
    id: Type.Optional(MagicTransitUuid),
  }),
)

export const MagicTransitEndpointHealthCheckResponseSingle = named(
  "magic-transit_endpoint_health_check_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(MagicTransitEndpointHealthCheckResponse),
  }),
)

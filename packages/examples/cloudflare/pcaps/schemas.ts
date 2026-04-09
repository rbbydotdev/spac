import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages, IntelResultInfo } from "../shared/schemas"

export const MagicVisibilityPcapsPcapsDestinationConf = named(
  "magic-visibility-pcaps_pcaps_destination_conf",
  Type.String({ description: "The full URI for the bucket. This field only applies to `full` packet captures." }),
)

export const MagicVisibilityPcapsPcapsOwnershipChallenge = named(
  "magic-visibility-pcaps_pcaps_ownership_challenge",
  Type.String({ description: "The ownership challenge filename stored in the bucket." }),
)

export const MagicVisibilityPcapsPcapsOwnershipValidateRequest = named(
  "magic-visibility-pcaps_pcaps_ownership_validate_request",
  Type.Object({
    destination_conf: MagicVisibilityPcapsPcapsDestinationConf,
    ownership_challenge: MagicVisibilityPcapsPcapsOwnershipChallenge,
  }),
)

export const MagicVisibilityPcapsPcapsOwnershipResponse = named(
  "magic-visibility-pcaps_pcaps_ownership_response",
  Type.Object({
    destination_conf: MagicVisibilityPcapsPcapsDestinationConf,
    filename: MagicVisibilityPcapsPcapsOwnershipChallenge,
    id: Type.String({
      description: "The bucket ID associated with the packet captures API.",
      minLength: 32,
      maxLength: 32,
    }),
    status: Type.Union([Type.Literal("pending"), Type.Literal("success"), Type.Literal("failed")], {
      description: "The status of the ownership challenge. Can be pending, success or failed.",
    }),
    submitted: Type.String({ description: "The RFC 3339 timestamp when the bucket was added to packet captures API." }),
    validated: Type.Optional(Type.String({ description: "The RFC 3339 timestamp when the bucket was validated." })),
  }),
)

export const MagicVisibilityPcapsPcapsOwnershipSingleResponse = named(
  "magic-visibility-pcaps_pcaps_ownership_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: MagicVisibilityPcapsPcapsOwnershipResponse,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const MagicVisibilityPcapsPcapsOwnershipRequest = named(
  "magic-visibility-pcaps_pcaps_ownership_request",
  Type.Object({
    destination_conf: MagicVisibilityPcapsPcapsDestinationConf,
  }),
)

export const MagicVisibilityPcapsPcapsOwnershipCollection = named(
  "magic-visibility-pcaps_pcaps_ownership_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(MagicVisibilityPcapsPcapsOwnershipResponse), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IntelResultInfo),
  }),
)

export const MagicVisibilityPcapsPcapsFilterV1 = named(
  "magic-visibility-pcaps_pcaps_filter_v1",
  Type.Object(
    {
      destination_address: Type.Optional(
        Type.String({ description: "The destination IP address of the packet.", "x-auditable": true }),
      ),
      destination_port: Type.Optional(
        Type.Number({ description: "The destination port of the packet.", "x-auditable": true }),
      ),
      protocol: Type.Optional(Type.Number({ description: "The protocol number of the packet.", "x-auditable": true })),
      source_address: Type.Optional(
        Type.String({ description: "The source IP address of the packet.", "x-auditable": true }),
      ),
      source_port: Type.Optional(Type.Number({ description: "The source port of the packet.", "x-auditable": true })),
    },
    { description: "The packet capture filter. When this field is empty, all packets are captured." },
  ),
)

export const MagicVisibilityPcapsPcapsId = named(
  "magic-visibility-pcaps_pcaps_id",
  Type.String({ description: "The ID for the packet capture.", minLength: 32, maxLength: 32, "x-auditable": true }),
)

export const MagicVisibilityPcapsPcapsOffsetTime = named(
  "magic-visibility-pcaps_pcaps_offset_time",
  Type.String({
    description:
      "The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const MagicVisibilityPcapsPcapsStatus = named(
  "magic-visibility-pcaps_pcaps_status",
  Type.Union(
    [
      Type.Literal("unknown"),
      Type.Literal("success"),
      Type.Literal("pending"),
      Type.Literal("running"),
      Type.Literal("conversion_pending"),
      Type.Literal("conversion_running"),
      Type.Literal("complete"),
      Type.Literal("failed"),
    ],
    { description: "The status of the packet capture request." },
  ),
)

export const MagicVisibilityPcapsPcapsSubmitted = named(
  "magic-visibility-pcaps_pcaps_submitted",
  Type.String({ description: "The RFC 3339 timestamp when the packet capture was created." }),
)

export const MagicVisibilityPcapsPcapsSystem = named(
  "magic-visibility-pcaps_pcaps_system",
  Type.Union([Type.Literal("magic-transit")], {
    description: "The system used to collect packet captures.",
    "x-auditable": true,
  }),
)

export const MagicVisibilityPcapsPcapsTimeLimitSampled = named(
  "magic-visibility-pcaps_pcaps_time_limit_sampled",
  Type.Number({
    description: "The packet capture duration in seconds.",
    minimum: 1,
    maximum: 300,
    "x-auditable": true,
  }),
)

export const MagicVisibilityPcapsPcapsType = named(
  "magic-visibility-pcaps_pcaps_type",
  Type.Union([Type.Literal("simple"), Type.Literal("full")], {
    description:
      "The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.",
    "x-auditable": true,
  }),
)

export const MagicVisibilityPcapsPcapsResponseSimple = named(
  "magic-visibility-pcaps_pcaps_response_simple",
  Type.Object({
    filter_v1: Type.Optional(MagicVisibilityPcapsPcapsFilterV1),
    id: Type.Optional(MagicVisibilityPcapsPcapsId),
    offset_time: Type.Optional(MagicVisibilityPcapsPcapsOffsetTime),
    status: Type.Optional(MagicVisibilityPcapsPcapsStatus),
    submitted: Type.Optional(MagicVisibilityPcapsPcapsSubmitted),
    system: Type.Optional(MagicVisibilityPcapsPcapsSystem),
    time_limit: Type.Optional(MagicVisibilityPcapsPcapsTimeLimitSampled),
    type: Type.Optional(MagicVisibilityPcapsPcapsType),
  }),
)

export const MagicVisibilityPcapsPcapsByteLimit = named(
  "magic-visibility-pcaps_pcaps_byte_limit",
  Type.Number({
    description: "The maximum number of bytes to capture. This field only applies to `full` packet captures.",
    minimum: 1,
    maximum: 1000000000,
    "x-auditable": true,
  }),
)

export const MagicVisibilityPcapsPcapsColoName = named(
  "magic-visibility-pcaps_pcaps_colo_name",
  Type.String({
    description:
      "The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to `full` packet captures.",
    "x-auditable": true,
  }),
)

export const MagicVisibilityPcapsPcapsErrorMessage = named(
  "magic-visibility-pcaps_pcaps_error_message",
  Type.String({
    description:
      "An error message that describes why the packet capture failed. This field only applies to `full` packet captures.",
  }),
)

export const MagicVisibilityPcapsPcapsPacketsCaptured = named(
  "magic-visibility-pcaps_pcaps_packets_captured",
  Type.Integer({ description: "The number of packets captured." }),
)

export const MagicVisibilityPcapsPcapsStopRequested = named(
  "magic-visibility-pcaps_pcaps_stop_requested",
  Type.String({
    description:
      "The RFC 3339 timestamp when stopping the packet capture was requested. This field only applies to `full` packet captures.",
    format: "date-time",
  }),
)

export const MagicVisibilityPcapsPcapsTimeLimitFull = named(
  "magic-visibility-pcaps_pcaps_time_limit_full",
  Type.Number({
    description: "The packet capture duration in seconds.",
    minimum: 1,
    maximum: 86400,
    "x-auditable": true,
  }),
)

export const MagicVisibilityPcapsPcapsResponseFull = named(
  "magic-visibility-pcaps_pcaps_response_full",
  Type.Object({
    byte_limit: Type.Optional(MagicVisibilityPcapsPcapsByteLimit),
    colo_name: Type.Optional(MagicVisibilityPcapsPcapsColoName),
    destination_conf: Type.Optional(MagicVisibilityPcapsPcapsDestinationConf),
    error_message: Type.Optional(MagicVisibilityPcapsPcapsErrorMessage),
    filter_v1: Type.Optional(MagicVisibilityPcapsPcapsFilterV1),
    id: Type.Optional(MagicVisibilityPcapsPcapsId),
    packets_captured: Type.Optional(MagicVisibilityPcapsPcapsPacketsCaptured),
    status: Type.Optional(MagicVisibilityPcapsPcapsStatus),
    stop_requested: Type.Optional(MagicVisibilityPcapsPcapsStopRequested),
    submitted: Type.Optional(MagicVisibilityPcapsPcapsSubmitted),
    system: Type.Optional(MagicVisibilityPcapsPcapsSystem),
    time_limit: Type.Optional(MagicVisibilityPcapsPcapsTimeLimitFull),
    type: Type.Optional(MagicVisibilityPcapsPcapsType),
  }),
)

export const MagicVisibilityPcapsPcapsSingleResponse = named(
  "magic-visibility-pcaps_pcaps_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([MagicVisibilityPcapsPcapsResponseSimple, MagicVisibilityPcapsPcapsResponseFull]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const MagicVisibilityPcapsPcapsPacketLimit = named(
  "magic-visibility-pcaps_pcaps_packet_limit",
  Type.Number({
    description: "The limit of packets contained in a packet capture.",
    minimum: 1,
    maximum: 10000,
    "x-auditable": true,
  }),
)

export const MagicVisibilityPcapsPcapsRequestSimple = named(
  "magic-visibility-pcaps_pcaps_request_simple",
  Type.Object({
    filter_v1: Type.Optional(MagicVisibilityPcapsPcapsFilterV1),
    offset_time: Type.Optional(MagicVisibilityPcapsPcapsOffsetTime),
    packet_limit: MagicVisibilityPcapsPcapsPacketLimit,
    system: MagicVisibilityPcapsPcapsSystem,
    time_limit: MagicVisibilityPcapsPcapsTimeLimitSampled,
    type: MagicVisibilityPcapsPcapsType,
  }),
)

export const MagicVisibilityPcapsPcapsRequestFull = named(
  "magic-visibility-pcaps_pcaps_request_full",
  Type.Object({
    byte_limit: Type.Optional(MagicVisibilityPcapsPcapsByteLimit),
    colo_name: MagicVisibilityPcapsPcapsColoName,
    destination_conf: MagicVisibilityPcapsPcapsDestinationConf,
    filter_v1: Type.Optional(MagicVisibilityPcapsPcapsFilterV1),
    packet_limit: Type.Optional(MagicVisibilityPcapsPcapsPacketLimit),
    system: MagicVisibilityPcapsPcapsSystem,
    time_limit: MagicVisibilityPcapsPcapsTimeLimitFull,
    type: MagicVisibilityPcapsPcapsType,
  }),
)

export const MagicVisibilityPcapsPcapsRequestPcap = named(
  "magic-visibility-pcaps_pcaps_request_pcap",
  Type.Union([MagicVisibilityPcapsPcapsRequestSimple, MagicVisibilityPcapsPcapsRequestFull]),
)

export const MagicVisibilityPcapsIdentifier = named(
  "magic-visibility-pcaps_identifier",
  Type.String({ description: "Identifier.", maxLength: 32, readOnly: true }),
)

export const MagicVisibilityPcapsApiResponseCommonFailure = named(
  "magic-visibility-pcaps_api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const MagicVisibilityPcapsPcapsCollectionResponse = named(
  "magic-visibility-pcaps_pcaps_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([
      Type.Array(Type.Union([MagicVisibilityPcapsPcapsResponseSimple, MagicVisibilityPcapsPcapsResponseFull])),
      Type.Null(),
    ]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IntelResultInfo),
  }),
)

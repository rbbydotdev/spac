import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages } from "../shared/schemas"

export const SecondaryDnsSchemasForceResult = named(
  "secondary-dns_schemas-force_result",
  Type.String({
    description: "When force_notify query parameter is set to true, the response is a simple string.",
    "x-auditable": true,
  }),
)

export const SecondaryDnsSchemasForceResponse = named(
  "secondary-dns_schemas-force_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(SecondaryDnsSchemasForceResult),
  }),
)

export const SecondaryDnsEnableTransferResult = named(
  "secondary-dns_enable_transfer_result",
  Type.String({ description: "The zone transfer status of a primary zone.", "x-auditable": true }),
)

export const SecondaryDnsEnableTransferResponse = named(
  "secondary-dns_enable_transfer_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(SecondaryDnsEnableTransferResult),
  }),
)

export const OutgoingStatus = named(
  "outgoing_status",
  Type.Union([Type.Null()], { description: "The zone transfer status of a primary zone.", "x-auditable": true }),
)

export const SecondaryDnsDisableTransferResult = named(
  "secondary-dns_disable_transfer_result",
  Type.String({ description: "The zone transfer status of a primary zone.", "x-auditable": true }),
)

export const SecondaryDnsDisableTransferResponse = named(
  "secondary-dns_disable_transfer_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(SecondaryDnsDisableTransferResult),
  }),
)

export const SecondaryDnsIdentifier = named(
  "secondary-dns_identifier",
  Type.String({ readOnly: true, "x-auditable": true }),
)

export const SecondaryDnsName = named(
  "secondary-dns_name",
  Type.String({ description: "Zone name.", "x-auditable": true }),
)

export const SecondaryDnsPeers = named(
  "secondary-dns_peers",
  Type.Array(SecondaryDnsIdentifier, { description: "A list of peer tags.", "x-stainless-collection-type": "set" }),
)

export const SecondaryDnsSingleRequestOutgoing = named(
  "secondary-dns_single_request_outgoing",
  Type.Object({
    id: SecondaryDnsIdentifier,
    name: SecondaryDnsName,
    peers: SecondaryDnsPeers,
  }),
)

export const SecondaryDnsTime = named(
  "secondary-dns_time",
  Type.String({ description: "The time for a specific event.", "x-auditable": true }),
)

export const SecondaryDnsSoaSerial = named(
  "secondary-dns_soa_serial",
  Type.Number({ description: "The serial number of the SOA for the given zone.", "x-auditable": true }),
)

export const UnnamedSchemaRef0e152c3e4c55b8a0ca6531578a42c564 = named(
  "unnamed_schema_ref_0e152c3e4c55b8a0ca6531578a42c564",
  Type.Union([Type.Null()]),
)

export const SecondaryDnsSingleResponseOutgoing = named(
  "secondary-dns_single_response_outgoing",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        checked_time: Type.Optional(SecondaryDnsTime),
        created_time: Type.Optional(SecondaryDnsTime),
        id: Type.Optional(SecondaryDnsIdentifier),
        last_transferred_time: Type.Optional(SecondaryDnsTime),
        name: Type.Optional(SecondaryDnsName),
        peers: Type.Optional(SecondaryDnsPeers),
        soa_serial: Type.Optional(SecondaryDnsSoaSerial),
      }),
    ),
  }),
)

export const SecondaryDnsIdResponse = named(
  "secondary-dns_id_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        id: Type.Optional(SecondaryDnsIdentifier),
      }),
    ),
  }),
)

export const SecondaryDnsAutoRefreshSeconds = named(
  "secondary-dns_auto_refresh_seconds",
  Type.Number({
    description:
      "How often should a secondary zone auto refresh regardless of DNS NOTIFY.\nNot applicable for primary zones.",
    "x-auditable": true,
  }),
)

export const SecondaryDnsDnsSecondarySecondaryZone = named(
  "secondary-dns_dns-secondary-secondary-zone",
  Type.Object({
    auto_refresh_seconds: SecondaryDnsAutoRefreshSeconds,
    id: SecondaryDnsIdentifier,
    name: SecondaryDnsName,
    peers: SecondaryDnsPeers,
  }),
)

export const UnnamedSchemaRef150c555e27f53dbb40cdce4d6644ff0a = named(
  "unnamed_schema_ref_150c555e27f53dbb40cdce4d6644ff0a",
  Type.Union([Type.Null()]),
)

export const SecondaryDnsSingleResponseIncoming = named(
  "secondary-dns_single_response_incoming",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        auto_refresh_seconds: Type.Optional(SecondaryDnsAutoRefreshSeconds),
        checked_time: Type.Optional(SecondaryDnsTime),
        created_time: Type.Optional(SecondaryDnsTime),
        id: Type.Optional(SecondaryDnsIdentifier),
        modified_time: Type.Optional(SecondaryDnsTime),
        name: Type.Optional(SecondaryDnsName),
        peers: Type.Optional(SecondaryDnsPeers),
        soa_serial: Type.Optional(SecondaryDnsSoaSerial),
      }),
    ),
  }),
)

export const SecondaryDnsForceResult = named(
  "secondary-dns_force_result",
  Type.String({
    description: "When force_axfr query parameter is set to true, the response is a simple string.",
    "x-auditable": true,
  }),
)

export const SecondaryDnsForceResponse = named(
  "secondary-dns_force_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(SecondaryDnsForceResult),
  }),
)

export const SecondaryDnsSchemasIdentifier = named(
  "secondary-dns_schemas-identifier",
  Type.String({ readOnly: true, "x-auditable": true }),
)

export const SecondaryDnsSchemasIdResponse = named(
  "secondary-dns_schemas-id_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        id: Type.Optional(SecondaryDnsSchemasIdentifier),
      }),
    ),
  }),
)

export const SecondaryDnsSecret = named(
  "secondary-dns_secret",
  Type.String({ description: "TSIG secret.", "x-sensitive": true }),
)

export const SecondaryDnsSchemasName = named(
  "secondary-dns_schemas-name",
  Type.String({ description: "TSIG key name.", "x-auditable": true }),
)

export const SecondaryDnsAlgo = named(
  "secondary-dns_algo",
  Type.String({ description: "TSIG algorithm.", "x-auditable": true }),
)

export const SecondaryDnsTsig = named(
  "secondary-dns_tsig",
  Type.Object({
    algo: SecondaryDnsAlgo,
    id: SecondaryDnsSchemasIdentifier,
    name: SecondaryDnsSchemasName,
    secret: SecondaryDnsSecret,
  }),
)

export const SecondaryDnsSingleResponse = named(
  "secondary-dns_single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(SecondaryDnsTsig),
  }),
)

export const SecondaryDnsResponseCollection = named(
  "secondary-dns_response_collection",
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
    result: Type.Optional(Type.Array(SecondaryDnsTsig)),
  }),
)

export const SecondaryDnsTsigId = named(
  "secondary-dns_tsig_id",
  Type.String({
    description: "TSIG authentication will be used for zone transfer if configured.",
    "x-auditable": true,
  }),
)

export const SecondaryDnsPort = named(
  "secondary-dns_port",
  Type.Number({
    description: "DNS port of primary or secondary nameserver, depending on what zone this peer is linked to.",
    "x-auditable": true,
  }),
)

export const SecondaryDnsIxfrEnable = named(
  "secondary-dns_ixfr_enable",
  Type.Boolean({
    description: "Enable IXFR transfer protocol, default is AXFR. Only applicable to secondary zones.",
    "x-auditable": true,
  }),
)

export const SecondaryDnsIp = named(
  "secondary-dns_ip",
  Type.String({
    description:
      "IPv4/IPv6 address of primary or secondary nameserver, depending on what zone this peer is linked to. For primary zones this IP defines the IP of the secondary nameserver Cloudflare will NOTIFY upon zone changes. For secondary zones this IP defines the IP of the primary nameserver Cloudflare will send AXFR/IXFR requests to.",
    "x-auditable": true,
  }),
)

export const SecondaryDnsComponentsSchemasIdentifier = named(
  "secondary-dns_components-schemas-identifier",
  Type.String({ readOnly: true, "x-auditable": true }),
)

export const SecondaryDnsComponentsSchemasName = named(
  "secondary-dns_components-schemas-name",
  Type.String({ description: "The name of the peer.", "x-auditable": true }),
)

export const SecondaryDnsPeer = named(
  "secondary-dns_peer",
  Type.Object({
    id: SecondaryDnsComponentsSchemasIdentifier,
    ip: Type.Optional(SecondaryDnsIp),
    ixfr_enable: Type.Optional(SecondaryDnsIxfrEnable),
    name: SecondaryDnsComponentsSchemasName,
    port: Type.Optional(SecondaryDnsPort),
    tsig_id: Type.Optional(SecondaryDnsTsigId),
  }),
)

export const SecondaryDnsSchemasSingleResponse = named(
  "secondary-dns_schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(SecondaryDnsPeer),
  }),
)

export const SecondaryDnsSchemasResponseCollection = named(
  "secondary-dns_schemas-response_collection",
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
    result: Type.Optional(Type.Array(SecondaryDnsPeer)),
  }),
)

export const SecondaryDnsComponentsSchemasIdResponse = named(
  "secondary-dns_components-schemas-id_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        id: Type.Optional(SecondaryDnsComponentsSchemasIdentifier),
      }),
    ),
  }),
)

export const SecondaryDnsIpRange = named(
  "secondary-dns_ip_range",
  Type.String({
    description:
      "Allowed IPv4/IPv6 address range of primary or secondary nameservers. This will be applied for the entire account. The IP range is used to allow additional NOTIFY IPs for secondary zones and IPs Cloudflare allows AXFR/IXFR requests from for primary zones. CIDRs are limited to a maximum of /24 for IPv4 and /64 for IPv6 respectively.",
    "x-auditable": true,
  }),
)

export const SecondaryDnsAclComponentsSchemasName = named(
  "secondary-dns_acl_components-schemas-name",
  Type.String({ description: "The name of the acl.", "x-auditable": true }),
)

export const SecondaryDnsAcl = named(
  "secondary-dns_acl",
  Type.Object({
    id: SecondaryDnsComponentsSchemasIdentifier,
    ip_range: SecondaryDnsIpRange,
    name: SecondaryDnsAclComponentsSchemasName,
  }),
)

export const SecondaryDnsComponentsSchemasSingleResponse = named(
  "secondary-dns_components-schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(SecondaryDnsAcl),
  }),
)

export const SecondaryDnsAccountIdentifier = named(
  "secondary-dns_account_identifier",
  Type.String({ readOnly: true, "x-auditable": true }),
)

export const SecondaryDnsComponentsSchemasResponseCollection = named(
  "secondary-dns_components-schemas-response_collection",
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
    result: Type.Optional(Type.Array(SecondaryDnsAcl)),
  }),
)

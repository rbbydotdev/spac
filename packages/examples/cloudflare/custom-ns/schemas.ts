import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"

export const DnsCustomNameserversZoneMetadata = named(
  "dns-custom-nameservers_zone_metadata",
  Type.Object({
    enabled: Type.Optional(
      Type.Boolean({ description: "Whether zone uses account-level custom nameservers.", "x-auditable": true }),
    ),
    ns_set: Type.Optional(
      Type.Number({
        description: "The number of the name server set to assign to the zone.",
        default: 1,
        minimum: 1,
        maximum: 5,
        "x-auditable": true,
      }),
    ),
  }),
)

export const DnsCustomNameserversGetResponse = named(
  "dns-custom-nameservers_get_response",
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
    enabled: Type.Optional(
      Type.Boolean({ description: "Whether zone uses account-level custom nameservers.", "x-auditable": true }),
    ),
    ns_set: Type.Optional(
      Type.Number({
        description: "The number of the name server set to assign to the zone.",
        default: 1,
        minimum: 1,
        maximum: 5,
        "x-auditable": true,
      }),
    ),
  }),
)

export const UnnamedSchemaRef619309774d07ec6904f1e354560d6028 = named(
  "unnamed_schema_ref_619309774d07ec6904f1e354560d6028",
  Type.Union([Type.Null()]),
)

export const DnsCustomNameserversEmptyResponse = named(
  "dns-custom-nameservers_empty_response",
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
    result: Type.Optional(Type.Array(Type.String({ description: "Unused", "x-auditable": true }), { maxItems: 0 })),
  }),
)

export const DnsCustomNameserversNsSet = named(
  "dns-custom-nameservers_ns_set",
  Type.Number({
    description: "The number of the set that this name server belongs to.",
    default: 1,
    minimum: 1,
    maximum: 5,
    "x-auditable": true,
  }),
)

export const DnsCustomNameserversNsName = named(
  "dns-custom-nameservers_ns_name",
  Type.String({ description: "The FQDN of the name server.", format: "hostname", "x-auditable": true }),
)

export const DnsCustomNameserversCustomns = named(
  "dns-custom-nameservers_CustomNS",
  Type.Object(
    {
      dns_records: Type.Array(
        Type.Object({
          type: Type.Optional(
            Type.Union([Type.Literal("A"), Type.Literal("AAAA")], {
              description: "DNS record type.",
              "x-auditable": true,
            }),
          ),
          value: Type.Optional(
            Type.String({ description: "DNS record contents (an IPv4 or IPv6 address).", "x-auditable": true }),
          ),
        }),
        { description: "A and AAAA records associated with the nameserver.", "x-stainless-collection-type": "set" },
      ),
      ns_name: DnsCustomNameserversNsName,
      ns_set: Type.Optional(DnsCustomNameserversNsSet),
      status: Type.Union([Type.Literal("moved"), Type.Literal("pending"), Type.Literal("verified")], {
        description: "Verification status of the nameserver.",
        "x-auditable": true,
      }),
      zone_tag: DlsIdentifier,
    },
    { description: "A single account custom nameserver." },
  ),
)

export const DnsCustomNameserversAcnsResponseSingle = named(
  "dns-custom-nameservers_acns_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DnsCustomNameserversCustomns),
  }),
)

export const DnsCustomNameserversCustomnsinput = named(
  "dns-custom-nameservers_CustomNSInput",
  Type.Object({
    ns_name: DnsCustomNameserversNsName,
    ns_set: Type.Optional(DnsCustomNameserversNsSet),
  }),
)

export const DnsCustomNameserversIdentifier = named(
  "dns-custom-nameservers_identifier",
  Type.String({ description: "Account identifier tag.", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const DnsCustomNameserversAcnsResponseCollection = named(
  "dns-custom-nameservers_acns_response_collection",
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
    result: Type.Optional(Type.Array(DnsCustomNameserversCustomns)),
  }),
)

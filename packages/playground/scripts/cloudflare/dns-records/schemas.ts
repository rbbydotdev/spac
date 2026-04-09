import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"

export const DnsRecordsComment = named(
  "dns-records_comment",
  Type.String({
    description: "Comments or notes about the DNS record. This field has no effect on DNS responses.",
    "x-auditable": true,
  }),
)

export const DnsRecordsName = named(
  "dns-records_name",
  Type.String({
    description: "Complete DNS record name, including the zone name, in Punycode.",
    minLength: 1,
    maxLength: 255,
    "x-auditable": true,
  }),
)

export const DnsRecordsProxied = named(
  "dns-records_proxied",
  Type.Boolean({
    description: "Whether the record is receiving the performance and security benefits of Cloudflare.",
    default: false,
    "x-auditable": true,
  }),
)

export const DnsRecordsSettings = named(
  "dns-records_settings",
  Type.Object(
    {
      ipv4_only: Type.Optional(
        Type.Boolean({
          description:
            "When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.",
          default: false,
          "x-auditable": true,
        }),
      ),
      ipv6_only: Type.Optional(
        Type.Boolean({
          description:
            "When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.",
          default: false,
          "x-auditable": true,
        }),
      ),
    },
    { description: "Settings for the DNS record." },
  ),
)

export const DnsRecordsTags = named(
  "dns-records_tags",
  Type.Array(
    Type.String({
      description:
        "Individual tag of the form name:value (the name must consist of only letters, numbers, underscores and hyphens)",
      "x-auditable": true,
    }),
    {
      description: "Custom tags for the DNS record. This field has no effect on DNS responses.",
      "x-stainless-collection-type": "set",
    },
  ),
)

export const DnsRecordsTtl = named(
  "dns-records_ttl",
  Type.Union([Type.Number({ minimum: 30, maximum: 86400 }), Type.Union([Type.Literal(1)])], {
    description:
      "Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.",
    "x-auditable": true,
  }),
)

export const DnsRecordsCaarecord = named(
  "dns-records_CAARecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({
        description: "Formatted CAA content. See 'data' to set CAA properties.",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    data: Type.Optional(
      Type.Object(
        {
          flags: Type.Optional(
            Type.Number({ description: "Flags for the CAA record.", minimum: 0, maximum: 255, "x-auditable": true }),
          ),
          tag: Type.Optional(
            Type.String({
              description: "Name of the property controlled by this record (e.g.: issue, issuewild, iodef).",
              "x-auditable": true,
            }),
          ),
          value: Type.Optional(
            Type.String({
              description: "Value of the record. This field's semantics depend on the chosen tag.",
              "x-auditable": true,
            }),
          ),
        },
        { description: "Components of a CAA record." },
      ),
    ),
    type: Type.Union([Type.Literal("CAA")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsCertrecord = named(
  "dns-records_CERTRecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({
        description: "Formatted CERT content. See 'data' to set CERT properties.",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    data: Type.Optional(
      Type.Object(
        {
          algorithm: Type.Optional(
            Type.Number({ description: "Algorithm.", minimum: 0, maximum: 255, "x-auditable": true }),
          ),
          certificate: Type.Optional(Type.String({ description: "Certificate.", "x-auditable": true })),
          key_tag: Type.Optional(
            Type.Number({ description: "Key Tag.", minimum: 0, maximum: 65535, "x-auditable": true }),
          ),
          type: Type.Optional(Type.Number({ description: "Type.", minimum: 0, maximum: 65535, "x-auditable": true })),
        },
        { description: "Components of a CERT record." },
      ),
    ),
    type: Type.Union([Type.Literal("CERT")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsDnskeyrecord = named(
  "dns-records_DNSKEYRecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({
        description: "Formatted DNSKEY content. See 'data' to set DNSKEY properties.",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    data: Type.Optional(
      Type.Object(
        {
          algorithm: Type.Optional(
            Type.Number({ description: "Algorithm.", minimum: 0, maximum: 255, "x-auditable": true }),
          ),
          flags: Type.Optional(Type.Number({ description: "Flags.", minimum: 0, maximum: 65535, "x-auditable": true })),
          protocol: Type.Optional(
            Type.Number({ description: "Protocol.", minimum: 0, maximum: 255, "x-auditable": true }),
          ),
          public_key: Type.Optional(Type.String({ description: "Public Key.", "x-auditable": true })),
        },
        { description: "Components of a DNSKEY record." },
      ),
    ),
    type: Type.Union([Type.Literal("DNSKEY")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsDsrecord = named(
  "dns-records_DSRecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({
        description: "Formatted DS content. See 'data' to set DS properties.",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    data: Type.Optional(
      Type.Object(
        {
          algorithm: Type.Optional(
            Type.Number({ description: "Algorithm.", minimum: 0, maximum: 255, "x-auditable": true }),
          ),
          digest: Type.Optional(Type.String({ description: "Digest.", "x-auditable": true })),
          digest_type: Type.Optional(
            Type.Number({ description: "Digest Type.", minimum: 0, maximum: 255, "x-auditable": true }),
          ),
          key_tag: Type.Optional(
            Type.Number({ description: "Key Tag.", minimum: 0, maximum: 65535, "x-auditable": true }),
          ),
        },
        { description: "Components of a DS record." },
      ),
    ),
    type: Type.Union([Type.Literal("DS")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsHttpsrecord = named(
  "dns-records_HTTPSRecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({
        description: "Formatted HTTPS content. See 'data' to set HTTPS properties.",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    data: Type.Optional(
      Type.Object(
        {
          priority: Type.Optional(
            Type.Number({ description: "Priority.", minimum: 0, maximum: 65535, "x-auditable": true }),
          ),
          target: Type.Optional(Type.String({ description: "Target.", "x-auditable": true })),
          value: Type.Optional(Type.String({ description: "Value.", "x-auditable": true })),
        },
        { description: "Components of a HTTPS record." },
      ),
    ),
    type: Type.Union([Type.Literal("HTTPS")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsLocrecord = named(
  "dns-records_LOCRecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({
        description: "Formatted LOC content. See 'data' to set LOC properties.",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    data: Type.Optional(
      Type.Object(
        {
          altitude: Type.Optional(
            Type.Number({
              description: "Altitude of location in meters.",
              minimum: -100000,
              maximum: 42849672.95,
              "x-auditable": true,
            }),
          ),
          lat_degrees: Type.Optional(
            Type.Number({ description: "Degrees of latitude.", minimum: 0, maximum: 90, "x-auditable": true }),
          ),
          lat_direction: Type.Optional(
            Type.Union([Type.Literal("N"), Type.Literal("S")], {
              description: "Latitude direction.",
              "x-auditable": true,
            }),
          ),
          lat_minutes: Type.Optional(
            Type.Number({ description: "Minutes of latitude.", minimum: 0, maximum: 59, "x-auditable": true }),
          ),
          lat_seconds: Type.Optional(
            Type.Number({ description: "Seconds of latitude.", minimum: 0, maximum: 59.999, "x-auditable": true }),
          ),
          long_degrees: Type.Optional(
            Type.Number({ description: "Degrees of longitude.", minimum: 0, maximum: 180, "x-auditable": true }),
          ),
          long_direction: Type.Optional(
            Type.Union([Type.Literal("E"), Type.Literal("W")], {
              description: "Longitude direction.",
              "x-auditable": true,
            }),
          ),
          long_minutes: Type.Optional(
            Type.Number({ description: "Minutes of longitude.", minimum: 0, maximum: 59, "x-auditable": true }),
          ),
          long_seconds: Type.Optional(
            Type.Number({ description: "Seconds of longitude.", minimum: 0, maximum: 59.999, "x-auditable": true }),
          ),
          precision_horz: Type.Optional(
            Type.Number({
              description: "Horizontal precision of location.",
              minimum: 0,
              maximum: 90000000,
              "x-auditable": true,
            }),
          ),
          precision_vert: Type.Optional(
            Type.Number({
              description: "Vertical precision of location.",
              minimum: 0,
              maximum: 90000000,
              "x-auditable": true,
            }),
          ),
          size: Type.Optional(
            Type.Number({
              description: "Size of location in meters.",
              minimum: 0,
              maximum: 90000000,
              "x-auditable": true,
            }),
          ),
        },
        { description: "Components of a LOC record." },
      ),
    ),
    type: Type.Union([Type.Literal("LOC")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsNaptrrecord = named(
  "dns-records_NAPTRRecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({
        description: "Formatted NAPTR content. See 'data' to set NAPTR properties.",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    data: Type.Optional(
      Type.Object(
        {
          flags: Type.Optional(Type.String({ description: "Flags.", "x-auditable": true })),
          order: Type.Optional(Type.Number({ description: "Order.", minimum: 0, maximum: 65535, "x-auditable": true })),
          preference: Type.Optional(
            Type.Number({ description: "Preference.", minimum: 0, maximum: 65535, "x-auditable": true }),
          ),
          regex: Type.Optional(Type.String({ description: "Regex.", "x-auditable": true })),
          replacement: Type.Optional(Type.String({ description: "Replacement.", "x-auditable": true })),
          service: Type.Optional(Type.String({ description: "Service.", "x-auditable": true })),
        },
        { description: "Components of a NAPTR record." },
      ),
    ),
    type: Type.Union([Type.Literal("NAPTR")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsSmimearecord = named(
  "dns-records_SMIMEARecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({
        description: "Formatted SMIMEA content. See 'data' to set SMIMEA properties.",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    data: Type.Optional(
      Type.Object(
        {
          certificate: Type.Optional(Type.String({ description: "Certificate.", "x-auditable": true })),
          matching_type: Type.Optional(
            Type.Number({ description: "Matching Type.", minimum: 0, maximum: 255, "x-auditable": true }),
          ),
          selector: Type.Optional(
            Type.Number({ description: "Selector.", minimum: 0, maximum: 255, "x-auditable": true }),
          ),
          usage: Type.Optional(Type.Number({ description: "Usage.", minimum: 0, maximum: 255, "x-auditable": true })),
        },
        { description: "Components of a SMIMEA record." },
      ),
    ),
    type: Type.Union([Type.Literal("SMIMEA")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsPriority = named(
  "dns-records_priority",
  Type.Number({
    description:
      "Required for MX, SRV and URI records; unused by other record types. Records with lower priorities are preferred.",
    minimum: 0,
    maximum: 65535,
    "x-auditable": true,
  }),
)

export const DnsRecordsSrvrecord = named(
  "dns-records_SRVRecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({
        description: "Priority, weight, port, and SRV target. See 'data' for setting the individual component values.",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    data: Type.Optional(
      Type.Object(
        {
          port: Type.Optional(
            Type.Number({ description: "The port of the service.", minimum: 0, maximum: 65535, "x-auditable": true }),
          ),
          priority: Type.Optional(DnsRecordsPriority),
          target: Type.Optional(
            Type.String({ description: "A valid hostname.", format: "hostname", "x-auditable": true }),
          ),
          weight: Type.Optional(
            Type.Number({ description: "The record weight.", minimum: 0, maximum: 65535, "x-auditable": true }),
          ),
        },
        { description: "Components of a SRV record." },
      ),
    ),
    type: Type.Union([Type.Literal("SRV")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsSshfprecord = named(
  "dns-records_SSHFPRecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({
        description: "Formatted SSHFP content. See 'data' to set SSHFP properties.",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    data: Type.Optional(
      Type.Object(
        {
          algorithm: Type.Optional(
            Type.Number({ description: "Algorithm.", minimum: 0, maximum: 255, "x-auditable": true }),
          ),
          fingerprint: Type.Optional(Type.String({ description: "Fingerprint.", "x-auditable": true })),
          type: Type.Optional(Type.Number({ description: "Type.", minimum: 0, maximum: 255, "x-auditable": true })),
        },
        { description: "Components of a SSHFP record." },
      ),
    ),
    type: Type.Union([Type.Literal("SSHFP")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsSvcbrecord = named(
  "dns-records_SVCBRecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({
        description: "Formatted SVCB content. See 'data' to set SVCB properties.",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    data: Type.Optional(
      Type.Object(
        {
          priority: Type.Optional(
            Type.Number({ description: "Priority.", minimum: 0, maximum: 65535, "x-auditable": true }),
          ),
          target: Type.Optional(Type.String({ description: "Target.", "x-auditable": true })),
          value: Type.Optional(Type.String({ description: "Value.", "x-auditable": true })),
        },
        { description: "Components of a SVCB record." },
      ),
    ),
    type: Type.Union([Type.Literal("SVCB")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsTlsarecord = named(
  "dns-records_TLSARecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({
        description: "Formatted TLSA content. See 'data' to set TLSA properties.",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    data: Type.Optional(
      Type.Object(
        {
          certificate: Type.Optional(Type.String({ description: "Certificate.", "x-auditable": true })),
          matching_type: Type.Optional(
            Type.Number({ description: "Matching Type.", minimum: 0, maximum: 255, "x-auditable": true }),
          ),
          selector: Type.Optional(
            Type.Number({ description: "Selector.", minimum: 0, maximum: 255, "x-auditable": true }),
          ),
          usage: Type.Optional(Type.Number({ description: "Usage.", minimum: 0, maximum: 255, "x-auditable": true })),
        },
        { description: "Components of a TLSA record." },
      ),
    ),
    type: Type.Union([Type.Literal("TLSA")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsUrirecord = named(
  "dns-records_URIRecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({
        description: "Formatted URI content. See 'data' to set URI properties.",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    data: Type.Optional(
      Type.Object(
        {
          target: Type.Optional(Type.String({ description: "The record content.", "x-auditable": true })),
          weight: Type.Optional(
            Type.Number({ description: "The record weight.", minimum: 0, maximum: 65535, "x-auditable": true }),
          ),
        },
        { description: "Components of a URI record." },
      ),
    ),
    priority: Type.Optional(DnsRecordsPriority),
    type: Type.Union([Type.Literal("URI")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsDnsRecordWithData = named(
  "dns-records_dns-record-with-data",
  Type.Union([
    DnsRecordsCaarecord,
    DnsRecordsCertrecord,
    DnsRecordsDnskeyrecord,
    DnsRecordsDsrecord,
    DnsRecordsHttpsrecord,
    DnsRecordsLocrecord,
    DnsRecordsNaptrrecord,
    DnsRecordsSmimearecord,
    DnsRecordsSrvrecord,
    DnsRecordsSshfprecord,
    DnsRecordsSvcbrecord,
    DnsRecordsTlsarecord,
    DnsRecordsUrirecord,
  ]),
)

export const DnsRecordsArecord = named(
  "dns-records_ARecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(Type.String({ description: "A valid IPv4 address.", format: "ipv4", "x-auditable": true })),
    type: Type.Union([Type.Literal("A")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsAaaarecord = named(
  "dns-records_AAAARecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(Type.String({ description: "A valid IPv6 address.", format: "ipv6", "x-auditable": true })),
    type: Type.Union([Type.Literal("AAAA")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsCnamerecord = named(
  "dns-records_CNAMERecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(
      Type.Object(
        {
          ipv4_only: Type.Optional(
            Type.Boolean({
              description:
                "When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.",
              default: false,
              "x-auditable": true,
            }),
          ),
          ipv6_only: Type.Optional(
            Type.Boolean({
              description:
                "When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.",
              default: false,
              "x-auditable": true,
            }),
          ),
          flatten_cname: Type.Optional(
            Type.Boolean({
              description:
                "If enabled, causes the CNAME record to be resolved externally and the resulting address records (e.g., A and AAAA) to be returned instead of the CNAME record itself. This setting is unavailable for proxied records, since they are always flattened.",
              default: false,
              "x-auditable": true,
            }),
          ),
        },
        { description: "Settings for the DNS record." },
      ),
    ),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({ description: "A valid hostname. Must not match the record's name.", "x-auditable": true }),
    ),
    type: Type.Union([Type.Literal("CNAME")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsMxrecord = named(
  "dns-records_MXRecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({ description: "A valid mail server hostname.", format: "hostname", "x-auditable": true }),
    ),
    priority: Type.Optional(DnsRecordsPriority),
    type: Type.Union([Type.Literal("MX")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsNsrecord = named(
  "dns-records_NSRecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(Type.String({ description: "A valid name server host name.", "x-auditable": true })),
    type: Type.Union([Type.Literal("NS")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsOpenpgpkeyrecord = named(
  "dns-records_OPENPGPKEYRecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({
        description: "A single Base64-encoded OpenPGP Transferable Public Key (RFC 4880 Section 11.1)",
        "x-auditable": true,
      }),
    ),
    type: Type.Union([Type.Literal("OPENPGPKEY")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsPtrrecord = named(
  "dns-records_PTRRecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(Type.String({ description: "Domain name pointing to the address.", "x-auditable": true })),
    type: Type.Union([Type.Literal("PTR")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsTxtrecord = named(
  "dns-records_TXTRecord",
  Type.Object({
    comment: Type.Optional(DnsRecordsComment),
    name: DnsRecordsName,
    proxied: Type.Optional(DnsRecordsProxied),
    settings: Type.Optional(DnsRecordsSettings),
    tags: Type.Optional(DnsRecordsTags),
    ttl: DnsRecordsTtl,
    content: Type.Optional(
      Type.String({
        description:
          'Text content for the record. The content must consist of quoted "character strings" (RFC 1035), each with a length of up to 255 bytes. Strings exceeding this allowed maximum length are automatically split.\n\nLearn more at <https://www.cloudflare.com/learning/dns/dns-records/dns-txt-record/>.',
        "x-auditable": true,
      }),
    ),
    type: Type.Union([Type.Literal("TXT")], { description: "Record type.", "x-auditable": true }),
  }),
)

export const DnsRecordsDnsRecordWithoutData = named(
  "dns-records_dns-record-without-data",
  Type.Union([
    DnsRecordsArecord,
    DnsRecordsAaaarecord,
    DnsRecordsCnamerecord,
    DnsRecordsMxrecord,
    DnsRecordsNsrecord,
    DnsRecordsOpenpgpkeyrecord,
    DnsRecordsPtrrecord,
    DnsRecordsTxtrecord,
  ]),
)

export const DnsRecordsApiResponseCommon = named(
  "dns-records_api-response-common",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const DnsRecordsApiResponseSingle = named("dns-records_api-response-single", DnsRecordsApiResponseCommon)

export const DnsRecordsDnsResponseTriggerScan = named(
  "dns-records_dns_response_trigger_scan",
  DnsRecordsApiResponseSingle,
)

export const DnsRecordsDnsRecordResponse = named(
  "dns-records_dns-record-response",
  Type.Union([DnsRecordsDnsRecordWithoutData, DnsRecordsDnsRecordWithData]),
)

export const DnsRecordsDnsResponseReviewScanObject = named(
  "dns-records_dns-response-review-scan-object",
  Type.Object({
    accepts: Type.Optional(Type.Array(DnsRecordsDnsRecordResponse)),
    rejects: Type.Optional(Type.Array(DlsIdentifier)),
  }),
)

export const DnsRecordsDnsResponseReviewScan = named(
  "dns-records_dns_response_review_scan",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DnsRecordsDnsResponseReviewScanObject),
  }),
)

export const DnsRecordsDnsRecordPost = named(
  "dns-records_dns-record-post",
  Type.Union([DnsRecordsDnsRecordWithoutData, DnsRecordsDnsRecordWithData]),
)

export const DnsRecordsDnsRecordScanBatchAccept = named(
  "dns-records_dns-record-scan-batch-accept",
  DnsRecordsDnsRecordPost,
)

export const DnsRecordsDnsRecordBatchDelete = named(
  "dns-records_dns-record-batch-delete",
  Type.Object({
    id: DlsIdentifier,
  }),
)

export const DnsRecordsDnsRequestReviewScanObject = named(
  "dns-records_dns-request-review-scan-object",
  Type.Object({
    accepts: Type.Optional(Type.Array(DnsRecordsDnsRecordScanBatchAccept)),
    rejects: Type.Optional(Type.Array(DnsRecordsDnsRecordBatchDelete)),
  }),
)

export const DnsRecordsDnsResponseImportScan = named(
  "dns-records_dns_response_import_scan",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        recs_added: Type.Optional(Type.Number({ description: "Number of DNS records added." })),
        total_records_parsed: Type.Optional(Type.Number({ description: "Total number of DNS records parsed." })),
      }),
    ),
  }),
)

export const DnsRecordsApiResponseCommonFailure = named(
  "dns-records_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const DnsRecordsDnsResponseBatchObject = named(
  "dns-records_dns-response-batch-object",
  Type.Object({
    deletes: Type.Optional(Type.Array(DnsRecordsDnsRecordResponse)),
    patches: Type.Optional(Type.Array(DnsRecordsDnsRecordResponse)),
    posts: Type.Optional(Type.Array(DnsRecordsDnsRecordResponse)),
    puts: Type.Optional(Type.Array(DnsRecordsDnsRecordResponse)),
  }),
)

export const DnsRecordsDnsResponseBatch = named(
  "dns-records_dns_response_batch",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DnsRecordsDnsResponseBatchObject),
  }),
)

export const DnsRecordsDnsRecordBatchPatch = named(
  "dns-records_dns-record-batch-patch",
  Type.Intersect([DnsRecordsDnsRecordPost]),
)

export const DnsRecordsDnsRecordBatchPost = named("dns-records_dns-record-batch-post", DnsRecordsDnsRecordPost)

export const DnsRecordsDnsRecordBatchPut = named(
  "dns-records_dns-record-batch-put",
  Type.Intersect([DnsRecordsDnsRecordPost]),
)

export const DnsRecordsDnsRequestBatchObject = named(
  "dns-records_dns-request-batch-object",
  Type.Object({
    deletes: Type.Optional(Type.Array(DnsRecordsDnsRecordBatchDelete)),
    patches: Type.Optional(Type.Array(DnsRecordsDnsRecordBatchPatch)),
    posts: Type.Optional(Type.Array(DnsRecordsDnsRecordBatchPost)),
    puts: Type.Optional(Type.Array(DnsRecordsDnsRecordBatchPut)),
  }),
)

export const DnsRecordsDnsResponseSingle = named(
  "dns-records_dns_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(DnsRecordsDnsRecordResponse),
  }),
)

export const DnsRecordsDirection = named(
  "dns-records_direction",
  Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Direction to order DNS records in." }),
)

export const DnsRecordsOrder = named(
  "dns-records_order",
  Type.Union(
    [Type.Literal("type"), Type.Literal("name"), Type.Literal("content"), Type.Literal("ttl"), Type.Literal("proxied")],
    { description: "Field to order DNS records by." },
  ),
)

export const DnsRecordsPerPage = named(
  "dns-records_per_page",
  Type.Number({ description: "Number of DNS records per page.", default: 100, minimum: 1, maximum: 5000000 }),
)

export const DnsRecordsTagMatch = named(
  "dns-records_tag_match",
  Type.Union([Type.Literal("any"), Type.Literal("all")], {
    description:
      "Whether to match all tag search requirements or at least one (any). If set to `all`, acts like a logical AND between tag filters. If set to `any`, acts like a logical OR instead. Note that the regular `match` parameter is still used to combine the resulting condition with other filters that aren't related to tags.\n",
  }),
)

export const DnsRecordsSearch = named(
  "dns-records_search",
  Type.String({
    description:
      "Allows searching in multiple properties of a DNS record simultaneously. This parameter is intended for human users, not automation. Its exact behavior is intentionally left unspecified and is subject to change in the future. This parameter works independently of the `match` setting. For automated searches, please use the other available parameters.\n",
  }),
)

export const DnsRecordsMatch = named(
  "dns-records_match",
  Type.Union([Type.Literal("any"), Type.Literal("all")], {
    description:
      "Whether to match all search requirements or at least one (any). If set to `all`, acts like a logical AND between filters. If set to `any`, acts like a logical OR instead. Note that the interaction between tag filters is controlled by the `tag-match` parameter instead.\n",
  }),
)

export const DnsRecordsType = named(
  "dns-records_type",
  Type.Union(
    [
      Type.Literal("A"),
      Type.Literal("AAAA"),
      Type.Literal("CAA"),
      Type.Literal("CERT"),
      Type.Literal("CNAME"),
      Type.Literal("DNSKEY"),
      Type.Literal("DS"),
      Type.Literal("HTTPS"),
      Type.Literal("LOC"),
      Type.Literal("MX"),
      Type.Literal("NAPTR"),
      Type.Literal("NS"),
      Type.Literal("OPENPGPKEY"),
      Type.Literal("PTR"),
      Type.Literal("SMIMEA"),
      Type.Literal("SRV"),
      Type.Literal("SSHFP"),
      Type.Literal("SVCB"),
      Type.Literal("TLSA"),
      Type.Literal("TXT"),
      Type.Literal("URI"),
    ],
    { description: "Record type.", "x-auditable": true },
  ),
)

export const DnsRecordsDnsResponseCollection = named(
  "dns-records_dns_response_collection",
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
    result: Type.Optional(Type.Array(DnsRecordsDnsRecordResponse)),
  }),
)

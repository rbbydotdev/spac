import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const NscAccounttag = named("nsc_AccountTag", Type.String({ description: "Customer account tag" }))

export const NscFacilityinfo = named(
  "nsc_FacilityInfo",
  Type.Object({
    address: Type.Array(Type.String()),
    name: Type.String(),
  }),
)

export const NscSlotinfo = named(
  "nsc_SlotInfo",
  Type.Object({
    account: Type.Optional(NscAccounttag),
    facility: NscFacilityinfo,
    id: Type.String({ description: "Slot ID", format: "uuid" }),
    occupied: Type.Boolean({ description: "Whether the slot is occupied or not" }),
    site: Type.String(),
    speed: Type.String(),
  }),
)

export const NscSlotlist = named(
  "nsc_SlotList",
  Type.Object({
    items: Type.Array(NscSlotinfo),
    next: Type.Optional(Type.Union([Type.Integer({ format: "int32" }), Type.Null()])),
  }),
)

export const NscSettingsrequest = named(
  "nsc_SettingsRequest",
  Type.Object({
    default_asn: Type.Optional(Type.Union([Type.Integer({ format: "int32", minimum: 0 }), Type.Null()])),
  }),
)

export const NscSettings = named(
  "nsc_Settings",
  Type.Object({
    default_asn: Type.Integer({ format: "int32", minimum: 0 }),
  }),
)

export const NscStatusinfo = named(
  "nsc_StatusInfo",
  Type.Union([
    Type.Object({
      state: Type.Union([Type.Literal("Pending")]),
    }),
    Type.Object({
      reason: Type.Optional(
        Type.Union([Type.String({ description: "Diagnostic information, if available" }), Type.Null()]),
      ),
      state: Type.Union([Type.Literal("Down")]),
    }),
    Type.Object({
      reason: Type.Optional(
        Type.Union([Type.String({ description: "Diagnostic information, if available" }), Type.Null()]),
      ),
      state: Type.Union([Type.Literal("Unhealthy")]),
    }),
    Type.Object({
      state: Type.Union([Type.Literal("Healthy")]),
    }),
  ]),
)

export const NscCloudflaresite = named("nsc_CloudflareSite", Type.String({ description: "A Cloudflare site name." }))

export const NscInterconnectPhysicalBody = named(
  "nsc_Interconnect_Physical_Body",
  Type.Object({
    account: Type.String(),
    name: Type.String(),
    owner: Type.Optional(Type.String()),
    type: Type.String(),
    facility: NscFacilityinfo,
    site: NscCloudflaresite,
    slot_id: Type.String({ format: "uuid" }),
    speed: Type.String(),
  }),
)

export const NscApibandwidth = named(
  "nsc_ApiBandwidth",
  Type.Union(
    [
      Type.Literal("50M"),
      Type.Literal("100M"),
      Type.Literal("200M"),
      Type.Literal("300M"),
      Type.Literal("400M"),
      Type.Literal("500M"),
      Type.Literal("1G"),
      Type.Literal("2G"),
      Type.Literal("5G"),
      Type.Literal("10G"),
      Type.Literal("20G"),
      Type.Literal("50G"),
    ],
    { description: "Bandwidth structure as visible through the customer-facing API." },
  ),
)

export const NscInterconnectGcppartnerBody = named(
  "nsc_Interconnect_GcpPartner_Body",
  Type.Object({
    account: Type.String(),
    name: Type.String(),
    owner: Type.Optional(Type.String()),
    type: Type.String(),
    region: Type.String(),
    speed: Type.Optional(NscApibandwidth),
  }),
)

export const NscInterconnect = named(
  "nsc_Interconnect",
  Type.Union([NscInterconnectPhysicalBody, NscInterconnectGcppartnerBody]),
)

export const NscInterconnectcreatePhysicalBody = named(
  "nsc_InterconnectCreate_Physical_Body",
  Type.Object({
    account: Type.String(),
    type: Type.String(),
    slot_id: Type.String({ format: "uuid" }),
    speed: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  }),
)

export const NscInterconnectcreateGcppartnerBody = named(
  "nsc_InterconnectCreate_GcpPartner_Body",
  Type.Object({
    account: Type.String(),
    type: Type.String(),
    bandwidth: NscApibandwidth,
    pairing_key: Type.String({ description: "Pairing key provided by GCP" }),
  }),
)

export const NscInterconnectcreate = named(
  "nsc_InterconnectCreate",
  Type.Union([NscInterconnectcreatePhysicalBody, NscInterconnectcreateGcppartnerBody]),
)

export const NscInterconnectlist = named(
  "nsc_InterconnectList",
  Type.Object({
    items: Type.Array(NscInterconnect),
    next: Type.Optional(Type.Union([Type.Integer({ format: "int32" }), Type.Null()])),
  }),
)

export const NscBgpcontrol = named(
  "nsc_BgpControl",
  Type.Object({
    customer_asn: Type.Integer({
      description: "ASN used on the customer end of the BGP session",
      format: "int32",
      minimum: 0,
    }),
    extra_prefixes: Type.Array(Type.String({ format: "A.B.C.D/N" }), {
      description: "Extra set of static prefixes to advertise to the customer's end of the session",
    }),
    md5_key: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "MD5 key to use for session authentication.\n\nNote that *this is not a security measure*. MD5 is not a valid security mechanism, and the\nkey is not treated as a secret value. This is *only* supported for preventing\nmisconfiguration, not for defending against malicious attacks.\n\nThe MD5 key, if set, must be of non-zero length and consist only of the following types of\ncharacter:\n\n* ASCII alphanumerics: `[a-zA-Z0-9]`\n* Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= \\|`\n\nIn other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),\nquotation mark (`\"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed\n(0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of\nthese disallowed characters will be rejected.",
        }),
        Type.Null(),
      ]),
    ),
  }),
)

export const NscMagicsettings = named(
  "nsc_MagicSettings",
  Type.Object({
    conduit_name: Type.String(),
    description: Type.String(),
    mtu: Type.Integer({ format: "int32", minimum: 0 }),
  }),
)

export const NscCni = named(
  "nsc_Cni",
  Type.Object({
    account: NscAccounttag,
    bgp: Type.Optional(NscBgpcontrol),
    cust_ip: Type.String({
      description:
        "Customer end of the point-to-point link\n\nThis should always be inside the same prefix as `p2p_ip`.",
      format: "A.B.C.D/N",
    }),
    id: Type.String({ format: "uuid" }),
    interconnect: Type.String({ description: "Interconnect identifier hosting this CNI" }),
    magic: NscMagicsettings,
    p2p_ip: Type.String({ description: "Cloudflare end of the point-to-point link", format: "A.B.C.D/N" }),
  }),
)

export const NscCnicreate = named(
  "nsc_CniCreate",
  Type.Object({
    account: NscAccounttag,
    bgp: Type.Optional(NscBgpcontrol),
    interconnect: Type.String(),
    magic: NscMagicsettings,
  }),
)

export const NscCnilist = named(
  "nsc_CniList",
  Type.Object({
    items: Type.Array(NscCni),
    next: Type.Optional(Type.Union([Type.Integer({ format: "int32" }), Type.Null()])),
  }),
)

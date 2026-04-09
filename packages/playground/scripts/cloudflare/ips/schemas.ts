import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const PublicIpEtag = named(
  "public-ip_etag",
  Type.String({ description: "A digest of the IP data. Useful for determining if the data has changed." }),
)

export const PublicIpIpv4Cidrs = named(
  "public-ip_ipv4_cidrs",
  Type.Array(Type.String({ description: "IPv4 CIDR." }), { description: "List of Cloudflare IPv4 CIDR addresses." }),
)

export const PublicIpIpv6Cidrs = named(
  "public-ip_ipv6_cidrs",
  Type.Array(Type.String({ description: "IPv6 CIDR." }), { description: "List of Cloudflare IPv6 CIDR addresses." }),
)

export const PublicIpJdcloudCidrs = named(
  "public-ip_jdcloud_cidrs",
  Type.Array(Type.String({ description: "IPv4 or IPv6 CIDR." }), {
    description: "List IPv4 and IPv6 CIDRs, only populated if `?networks=jdcloud` is used.",
  }),
)

export const PublicIpIpsJdcloud = named(
  "public-ip_ips_jdcloud",
  Type.Object({
    etag: Type.Optional(PublicIpEtag),
    ipv4_cidrs: Type.Optional(PublicIpIpv4Cidrs),
    ipv6_cidrs: Type.Optional(PublicIpIpv6Cidrs),
    jdcloud_cidrs: Type.Optional(PublicIpJdcloudCidrs),
  }),
)

export const PublicIpIps = named(
  "public-ip_ips",
  Type.Object({
    etag: Type.Optional(PublicIpEtag),
    ipv4_cidrs: Type.Optional(PublicIpIpv4Cidrs),
    ipv6_cidrs: Type.Optional(PublicIpIpv6Cidrs),
  }),
)

import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const InfraServicehost = named(
  "infra_ServiceHost",
  Type.Object({
    hostname: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    ipv4: Type.Optional(Type.String()),
    ipv6: Type.Optional(Type.String()),
    network: Type.Optional(Type.Unknown()),
    resolver_network: Type.Optional(Type.Unknown()),
  }),
)

export const InfraServicetype = named("infra_ServiceType", Type.Union([Type.Literal("http")]))

import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const InfraTargetid = named(
  "infra_TargetId",
  Type.String({
    description: "Target identifier",
    format: "uuid",
    maxLength: 36,
    title: "target_id",
    "x-auditable": true,
  }),
)

export const InfraIpinfo = named(
  "infra_IPInfo",
  Type.Object(
    {
      ipv4: Type.Optional(
        Type.Object(
          {
            ip_addr: Type.Optional(Type.String({ description: "IP address of the target", "x-auditable": true })),
            virtual_network_id: Type.Optional(
              Type.String({
                description:
                  "(optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.",
                format: "uuid",
                "x-auditable": true,
                "x-stainless-terraform-configurability": "computed_optional",
              }),
            ),
          },
          { description: "The target's IPv4 address" },
        ),
      ),
      ipv6: Type.Optional(
        Type.Object(
          {
            ip_addr: Type.Optional(Type.String({ description: "IP address of the target", "x-auditable": true })),
            virtual_network_id: Type.Optional(
              Type.String({
                description:
                  "(optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.",
                format: "uuid",
                "x-auditable": true,
                "x-stainless-terraform-configurability": "computed_optional",
              }),
            ),
          },
          { description: "The target's IPv6 address" },
        ),
      ),
    },
    { description: "The IPv4/IPv6 address that identifies where to reach a target" },
  ),
)

export const InfraTarget = named(
  "infra_Target",
  Type.Object({
    created_at: Type.String({
      description: "Date and time at which the target was created",
      format: "date-time",
      readOnly: true,
    }),
    hostname: Type.String({ description: "A non-unique field that refers to a target" }),
    id: InfraTargetid,
    ip: InfraIpinfo,
    modified_at: Type.String({
      description: "Date and time at which the target was modified",
      format: "date-time",
      readOnly: true,
    }),
  }),
)

export const InfraTargetarray = named("infra_TargetArray", Type.Array(InfraTarget))

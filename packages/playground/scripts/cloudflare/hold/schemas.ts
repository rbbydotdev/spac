import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const ZoneHold = named(
  "zone_hold",
  Type.Object({
    hold: Type.Optional(Type.Boolean()),
    hold_after: Type.Optional(Type.String()),
    include_subdomains: Type.Optional(Type.String()),
  }),
)

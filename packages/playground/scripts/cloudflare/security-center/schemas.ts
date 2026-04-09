import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const SecurityCenterSecuritytxt = named(
  "security-center_securityTxt",
  Type.Object({
    acknowledgments: Type.Optional(Type.Array(Type.String({ format: "uri", "x-auditable": true }))),
    canonical: Type.Optional(Type.Array(Type.String({ format: "uri", "x-auditable": true }))),
    contact: Type.Optional(Type.Array(Type.String({ format: "uri", "x-auditable": true }))),
    enabled: Type.Optional(Type.Boolean({ "x-auditable": true })),
    encryption: Type.Optional(Type.Array(Type.String({ format: "uri" }))),
    expires: Type.Optional(Type.String({ format: "date-time", "x-auditable": true })),
    hiring: Type.Optional(Type.Array(Type.String({ format: "uri", "x-auditable": true }))),
    policy: Type.Optional(Type.Array(Type.String({ format: "uri", "x-auditable": true }))),
    preferredLanguages: Type.Optional(Type.String({ "x-auditable": true })),
  }),
)

import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const BrandProtectionApiUrlinfo = named(
  "brand-protection-api_URLInfo",
  Type.Object({
    result: Type.Optional(Type.Array(Type.Record(Type.String(), Type.Unknown()))),
  }),
)

export const BrandProtectionApiUrlsubmit = named(
  "brand-protection-api_URLSubmit",
  Type.Object({
    skipped_urls: Type.Optional(Type.Array(Type.Record(Type.String(), Type.Unknown()))),
    submitted_urls: Type.Optional(Type.Array(Type.Record(Type.String(), Type.Unknown()))),
  }),
)

export const BrandProtectionApiQuerybulk = named(
  "brand-protection-api_QueryBulk",
  Type.Object({
    queries: Type.Optional(Type.Array(Type.Record(Type.String(), Type.Unknown()))),
  }),
)

export const BrandProtectionApiQuery = named(
  "brand-protection-api_Query",
  Type.Object({
    max_time: Type.Optional(Type.Union([Type.String({ format: "date-time" }), Type.Null()])),
    min_time: Type.Optional(Type.Union([Type.String({ format: "date-time" }), Type.Null()])),
    scan: Type.Optional(Type.Boolean()),
    string_matches: Type.Optional(Type.Unknown()),
    tag: Type.Optional(Type.String()),
  }),
)

export const BrandProtectionApiLogo = named(
  "brand-protection-api_Logo",
  Type.Object({
    id: Type.Optional(Type.Integer()),
    tag: Type.Optional(Type.String()),
    upload_path: Type.Optional(Type.String()),
  }),
)

export const BrandProtectionApiLogomatch = named(
  "brand-protection-api_LogoMatch",
  Type.Object({
    matches: Type.Optional(Type.Array(Type.Record(Type.String(), Type.Unknown()))),
    total: Type.Optional(Type.Integer()),
  }),
)

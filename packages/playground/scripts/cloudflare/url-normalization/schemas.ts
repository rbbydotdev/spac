import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const RulesetsUrlnormalization = named(
  "rulesets_UrlNormalization",
  Type.Object(
    {
      scope: Type.Union([Type.Literal("incoming"), Type.Literal("both"), Type.Literal("none")], {
        description: "The scope of the URL normalization.",
      }),
      type: Type.Union([Type.Literal("cloudflare"), Type.Literal("rfc3986")], {
        description: "The type of URL normalization performed by Cloudflare.",
      }),
    },
    { description: "A URL Normalization object." },
  ),
)

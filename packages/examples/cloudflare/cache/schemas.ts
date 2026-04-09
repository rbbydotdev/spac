import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { CacheRulesEditable, CacheRulesModifiedOn } from "../shared/schemas"

export const CacheRulesVariantsValue = named(
  "cache-rules_variants_value",
  Type.Object(
    {
      avif: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "List of strings with the MIME types of all the variants that should be served for avif.",
          uniqueItems: true,
        }),
      ),
      bmp: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "List of strings with the MIME types of all the variants that should be served for bmp.",
          uniqueItems: true,
        }),
      ),
      gif: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "List of strings with the MIME types of all the variants that should be served for gif.",
          uniqueItems: true,
        }),
      ),
      jp2: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "List of strings with the MIME types of all the variants that should be served for jp2.",
          uniqueItems: true,
        }),
      ),
      jpeg: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "List of strings with the MIME types of all the variants that should be served for jpeg.",
          uniqueItems: true,
        }),
      ),
      jpg: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "List of strings with the MIME types of all the variants that should be served for jpg.",
          uniqueItems: true,
        }),
      ),
      jpg2: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "List of strings with the MIME types of all the variants that should be served for jpg2.",
          uniqueItems: true,
        }),
      ),
      png: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "List of strings with the MIME types of all the variants that should be served for png.",
          uniqueItems: true,
        }),
      ),
      tif: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "List of strings with the MIME types of all the variants that should be served for tif.",
          uniqueItems: true,
        }),
      ),
      tiff: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "List of strings with the MIME types of all the variants that should be served for tiff.",
          uniqueItems: true,
        }),
      ),
      webp: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "List of strings with the MIME types of all the variants that should be served for webp.",
          uniqueItems: true,
        }),
      ),
    },
    { description: "Value of the zone setting." },
  ),
)

export const UnnamedSchemaRef669bfbb16c0913af7077c3c194fbfcd0 = named(
  "unnamed_schema_ref_669bfbb16c0913af7077c3c194fbfcd0",
  Type.Union([Type.Literal("variants")], {
    description: "The identifier of the caching setting.",
    "x-auditable": true,
  }),
)

export const CacheRulesSmartTieredCachePatch = named(
  "cache-rules_smart_tiered_cache_patch",
  Type.Object(
    {
      value: Type.Union([Type.Literal("on"), Type.Literal("off")], {
        description: "Enable or disable the Smart Tiered Cache.",
        "x-auditable": true,
      }),
    },
    { description: "Update enablement of Smart Tiered Cache." },
  ),
)

export const CacheRulesRegionalTieredCacheValue = named(
  "cache-rules_regional_tiered_cache_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], {
    description: "Value of the Regional Tiered Cache zone setting.",
    "x-auditable": true,
  }),
)

export const RegionalTieredCache = named(
  "regional_tiered_cache",
  Type.Union([Type.Literal("tc_regional")], {
    description: "The identifier of the caching setting.",
    "x-auditable": true,
  }),
)

export const CacheRulesOriginPostQuantumEncryptionValue = named(
  "cache-rules_origin_post_quantum_encryption_value",
  Type.Union([Type.Literal("preferred"), Type.Literal("supported"), Type.Literal("off")], {
    description: "Value of the Origin Post Quantum Encryption Setting.",
    "x-auditable": true,
  }),
)

export const UnnamedSchemaRef9444735ca60712dbcf8afd832eb5716a = named(
  "unnamed_schema_ref_9444735ca60712dbcf8afd832eb5716a",
  Type.Object({
    editable: CacheRulesEditable,
    id: Type.Union([Type.Literal("origin_pqe")], {
      description: "The identifier of the caching setting.",
      "x-auditable": true,
    }),
    modified_on: Type.Optional(CacheRulesModifiedOn),
    value: Type.Union([Type.Literal("preferred"), Type.Literal("supported"), Type.Literal("off")], {
      description: "Value of the Origin Post Quantum Encryption Setting.",
      "x-auditable": true,
    }),
  }),
)

export const CacheRulesCacheReserveValue = named(
  "cache-rules_cache_reserve_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], {
    description: "Value of the Cache Reserve zone setting.",
    "x-auditable": true,
  }),
)

export const CacheReserve = named(
  "cache_reserve",
  Type.Union([Type.Literal("cache_reserve")], {
    description: "The identifier of the caching setting.",
    "x-auditable": true,
  }),
)

import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { CacheIdentifier, D1Messages } from "../shared/schemas"

export const CachePurgeApiResponseSingleId = named(
  "cache-purge_api-response-single-id",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Optional(
      Type.Union([
        Type.Object({
          id: CacheIdentifier,
        }),
        Type.Null(),
      ]),
    ),
    success: Type.Boolean({ description: "Indicates the API call's success or failure." }),
  }),
)

export const CachePurgeSinglefilewithurlandheaders = named(
  "cache-purge_SingleFileWithUrlAndHeaders",
  Type.Object({
    files: Type.Optional(
      Type.Array(
        Type.Object({
          headers: Type.Optional(Type.Record(Type.String(), Type.String({ "x-auditable": true }))),
          url: Type.Optional(Type.String({ "x-auditable": true })),
        }),
        {
          description:
            "For more information on purging files with URL and headers, please refer to [purge by single-file documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/).",
        },
      ),
    ),
  }),
)

export const CachePurgeSinglefile = named(
  "cache-purge_SingleFile",
  Type.Object({
    files: Type.Optional(
      Type.Array(Type.String({ "x-auditable": true }), {
        description:
          "For more information on purging files, please refer to [purge by single-file documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/).",
      }),
    ),
  }),
)

export const CachePurgeEverything = named(
  "cache-purge_Everything",
  Type.Object({
    purge_everything: Type.Optional(
      Type.Boolean({
        description:
          "For more information, please refer to [purge everything documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-everything/).",
        "x-auditable": true,
      }),
    ),
  }),
)

export const CachePurgeFlexpurgebyprefixes = named(
  "cache-purge_FlexPurgeByPrefixes",
  Type.Object({
    prefixes: Type.Optional(
      Type.Array(Type.String({ "x-auditable": true }), {
        description:
          "For more information on purging by prefixes, please refer to [purge by prefix documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge_by_prefix/).",
      }),
    ),
  }),
)

export const CachePurgeFlexpurgebyhostnames = named(
  "cache-purge_FlexPurgeByHostnames",
  Type.Object({
    hosts: Type.Optional(
      Type.Array(Type.String({ "x-auditable": true }), {
        description:
          "For more information purging by hostnames, please refer to [purge by hostname documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-hostname/).",
      }),
    ),
  }),
)

export const CachePurgeFlexpurgebytags = named(
  "cache-purge_FlexPurgeByTags",
  Type.Object({
    tags: Type.Optional(
      Type.Array(Type.String({ "x-auditable": true }), {
        description:
          "For more information on cache tags and purging by tags, please refer to [purge by cache-tags documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/).",
      }),
    ),
  }),
)

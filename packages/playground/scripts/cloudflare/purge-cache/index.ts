import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { CacheIdentifier, D1Messages } from "../shared/schemas"
import {
  CachePurgeApiResponseSingleId,
  CachePurgeEverything,
  CachePurgeFlexpurgebyhostnames,
  CachePurgeFlexpurgebyprefixes,
  CachePurgeFlexpurgebytags,
  CachePurgeSinglefile,
  CachePurgeSinglefilewithurlandheaders,
} from "./schemas"

export function registerPurgeCache(api: Api) {
  api.assertVersion("3.0.3", "PurgeCache")

  api
    .post("/zones/{zone_id}/purge_cache", {
      params: Type.Object({ zone_id: CacheIdentifier }),
      body: Type.Union([
        CachePurgeFlexpurgebytags,
        CachePurgeFlexpurgebyhostnames,
        CachePurgeFlexpurgebyprefixes,
        CachePurgeEverything,
        CachePurgeSinglefile,
        CachePurgeSinglefilewithurlandheaders,
      ]),
    })
    .response(CachePurgeApiResponseSingleId)
    .error(
      "4XX",
      Type.Object({
        errors: D1Messages,
        messages: D1Messages,
        result: Type.Union([
          Type.Object({
            id: CacheIdentifier,
          }),
          Type.Null(),
        ]),
        success: Type.Boolean({ description: "Indicates the API call's success or failure." }),
      }),
    )
    .summary("Purge Cached Content")
    .description(
      '### Purge All Cached Content\nRemoves ALL files from Cloudflare\'s cache. All tiers can purge everything.\n```\n{"purge_everything": true}\n```\n\n### Purge Cached Content by URL\nGranularly removes one or more files from Cloudflare\'s cache by specifying URLs. All tiers can purge by URL.\n\nTo purge files with custom cache keys, include the headers used to compute the cache key as in the example. If you have a device type or geo in your cache key, you will need to include the CF-Device-Type or CF-IPCountry headers. If you have lang in your cache key, you will need to include the Accept-Language header.\n\n**NB:** When including the Origin header, be sure to include the **scheme** and **hostname**. The port number can be omitted if it is the default port (80 for http, 443 for https), but must be included otherwise.\n\nSingle file purge example with files:\n```\n{"files": ["http://www.example.com/css/styles.css", "http://www.example.com/js/index.js"]}\n```\nSingle file purge example with url and header pairs:\n```\n{"files": [{url: "http://www.example.com/cat_picture.jpg", headers: { "CF-IPCountry": "US", "CF-Device-Type": "desktop", "Accept-Language": "zh-CN" }}, {url: "http://www.example.com/dog_picture.jpg", headers: { "CF-IPCountry": "EU", "CF-Device-Type": "mobile", "Accept-Language": "en-US" }}]}\n```\n\n### Purge Cached Content by Tag, Host or Prefix\nGranularly removes one or more files from Cloudflare\'s cache either by specifying the host, the associated Cache-Tag, or a Prefix.\n\nFlex purge with tags:\n```\n{"tags": ["a-cache-tag", "another-cache-tag"]}\n```\nFlex purge with hosts:\n```\n{"hosts": ["www.example.com", "images.example.com"]}\n```\nFlex purge with prefixes:\n```\n{"prefixes": ["www.example.com/foo", "images.example.com/bar/baz"]}\n```\n\n### Availability and limits\nplease refer to [purge cache availability and limits documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/#availability-and-limits).\n',
    )
    .operationId("zone-purge")
    .tag("Zone")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Cache Purge"])
    .extension("x-cfPermissionsRequired", { enum: ["#cache_purge:edit"] })
}

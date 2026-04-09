import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import BaiduSearchCoffeeExample from "./examples/baidu-search-coffee.json"

export function registerBaidu(api: Api) {
  api.group("/search", (g) => {
    g.get("/baidu")
      .query(Type.Object({
        q: Type.String({ description: "Parameter defines the search query, including all Baidu search operators. (e.g., `inurl:`, `site:`, `intitle:`, etc.)." }),
        ct: Type.Optional(Type.Union([Type.Literal("1"), Type.Literal("2"), Type.Literal("3")], { description: "Parameter defines which language to restrict results. Available options: `1` - All languages `2` - Simplified Chinese `3` - Traditional Chinese" })),
        pn: Type.Optional(Type.Number({ description: "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `10` is the 2nd page of results, `20` is the 3rd page of results, etc.)." })),
        rn: Type.Optional(Type.Number({ description: "Parameter defines the maximum number of results to return, limited to 50. (e.g., `10` (default) returns 10 results, `30` returns 30 results, and `50` returns 50 results). This parameter is only available for **desktop and tablet** searches." })),
        gpc: Type.Optional(Type.String({ description: "Parameter defines the time period for results. (e.g., `stf=1767797961,1768402761|stftype=1` only returns results from the past 7 days. First integer within the parameter,`1767797961` is Unix Timestamp for 7 days ago. Second integer,`1768402761` is Unix Timestamp for now.)." })),
        q5: Type.Optional(Type.String({ description: "Similar to using `inurl:` or `intitle:`. (e.g., `1` to search by page title, `2` to search by web address.)." })),
        q6: Type.Optional(Type.String({ description: "Similar to using `site:`. (e.g., `q6=serpapi.com` to search for results only from the domain `serpapi.com`)." })),
        bs: Type.Optional(Type.String({ description: "Defines the previous search query." })),
        oq: Type.Optional(Type.String({ description: "Defines the original search query when navigated from a related search." })),
        f: Type.Optional(Type.String({ description: "Defines the originating search type. (e.g., `8` is a normal search, `3` is from the suggestion list, and `1` is a related search." })),
        device: Type.Optional(Type.String({ description: "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Baidu results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Baidu search results" }))
      .summary("Baidu")
      .description("Search via Baidu. Real API: GET /search.json?engine=baidu")
      .operationId("searchBaidu")
      .tag("Baidu")
      .extension("x-serpapi-engine", "baidu")
      .extension("x-serpapi-real-path", "/search.json")
      .example("search-coffee", { summary: "Baidu example: search coffee", value: BaiduSearchCoffeeExample })

    g.get("/baidu_news")
      .query(Type.Object({
        q: Type.String({ description: "Parameter defines the search query, including all Baidu search operators. (e.g., `inurl:`, `site:`, `intitle:`, etc.)." }),
        ct: Type.Optional(Type.Union([Type.Literal("1"), Type.Literal("2"), Type.Literal("3")], { description: "Parameter defines which language to restrict results. Available options: `1` - All Languages. `2` - Simplified Chinese `3` - Traditional Chinese." })),
        pn: Type.Optional(Type.Number({ description: "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `10` is the 2nd page of results, `20` is the 3rd page of results, etc.)." })),
        rn: Type.Optional(Type.Number({ description: "Parameter defines the maximum number of results to return, limited to 50. (e.g., `10` (default) returns 10 results, `30` returns 30 results, and `50` returns 50 results)." })),
        rtt: Type.Optional(Type.Union([Type.Literal("1"), Type.Literal("4")], { description: "Parameter defines the sort type for results. Available options: `1` - Sort by attraction (default) `4` - Sort by time" })),
        medium: Type.Optional(Type.Union([Type.Literal("0"), Type.Literal("1"), Type.Literal("2")], { description: "Parameter defines medium filtering for results. Available options: `0` - No filtering `1` - Show results from medium sites `2` - Show results from Baijiahao (baijiahao.baidu.com)" })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Baidu News results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Baidu News search results" }))
      .summary("Baidu News")
      .description("Search via Baidu News. Real API: GET /search.json?engine=baidu_news")
      .operationId("searchBaiduNews")
      .tag("Baidu")
      .extension("x-serpapi-engine", "baidu_news")
      .extension("x-serpapi-real-path", "/search.json")

  })
}

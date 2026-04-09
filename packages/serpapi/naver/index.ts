import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import NaverSearchParisExample from "./examples/naver-search-paris.json"

export function registerNaver(api: Api) {
  api.group("/search", (g) => {
    g.get("/naver")
      .query(Type.Object({
        query: Type.String({ description: "Parameter defines the search query. You can use anything that you would use in a regular Naver search. (e.g., `'query'`, `NOT`, `OR`, `site:`, `filetype:`, `near:`, `ip:`, `loc:`, `feed:` etc.)." }),
        start: Type.Optional(Type.String({ description: "Parameter controls the offset of the organic results. This parameter defaults to 1 (except for the `web`). (e.g. The formula for all searches except the web is `start = (page number * 10) - 9` e.g. Page number 3 `(3 * 10) - 9 = 21`) The formula for the web will be `start = (page number * 15) - 29` e.g. Page number 3 `(3 * 15) - 29 = 16`." })),
        page: Type.Optional(Type.String({ description: "The page parameter does the `start` parameter math for you! Just define the page number you want. Pagination starts from 1." })),
        num: Type.Optional(Type.Number({ description: "Parameter defines the maximum number of results to return. `50` (default) returns 50 results. Maximum number of results to return is `100`. Parameter can only be used with Naver Images API." })),
        where: Type.Optional(Type.Union([Type.Literal("nexearch"), Type.Literal("web"), Type.Literal("news"), Type.Literal("video"), Type.Literal("image")], { description: "Parameter defines the Search type. This parameter defaults to `nexearch`. Available options: `nexearch`: regular Naver Search, `web`: Naver Web Organic Results, `video`: Naver Video Results, `news`: Naver News Results, `image`: Naver Images API." })),
        sort_by: Type.Optional(Type.Union([Type.Literal("r"), Type.Literal("dd"), Type.Literal("0"), Type.Literal("1"), Type.Literal("2")], { description: "Parameter defines how the search results are sorted. This parameter defaults to `0` for Naver News Results, and `r` for other search types. For Naver News Results: `0`: Relevance (default), `1`: Latest, `2`: Oldest (only supported for news). For other search types: `r`: Relevance (default), `dd`: Latest." })),
        period: Type.Optional(Type.String({ description: "Parameter defines the time period for search results. This parameter defaults to `all`. Available options: `all`: search without time restrictions (default), `1h`: 1 hour, `1d`: 1 day, `1w`: 1 week, `1m`: 1 month, `3m`: 3 months, `6m`: 6 months, `1y`: 1 year, Custom date range in the format `fromYYYYMMDDtoYYYYMMDD` (e.g., `from20250801to20250830`). Additional options for Naver News Results only: `2h`: 2 hours, `3h`: 3 hours, `4h`: 4 hours, `5h`: 5 hours, `6h`: 6 hours." })),
        device: Type.Optional(Type.String({ description: "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Naver results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Naver search results" }))
      .summary("Naver")
      .description("Search via Naver. Real API: GET /search.json?engine=naver")
      .operationId("searchNaver")
      .tag("Naver")
      .extension("x-serpapi-engine", "naver")
      .extension("x-serpapi-real-path", "/search.json")
      .example("search-paris", { summary: "Naver example: search paris", value: NaverSearchParisExample })

    g.get("/naver_ai_overview")
      .query(Type.Object({
        query: Type.String({ description: "Parameter defines the query you want to search." }),
        device: Type.Optional(Type.String({ description: "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Naver Ai Overview results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Naver Ai Overview search results" }))
      .summary("Naver Ai Overview")
      .description("Search via Naver Ai Overview. Real API: GET /search.json?engine=naver_ai_overview")
      .operationId("searchNaverAiOverview")
      .tag("Naver")
      .extension("x-serpapi-engine", "naver_ai_overview")
      .extension("x-serpapi-real-path", "/search.json")

  })
}

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import DuckduckgoSearchAppleExample from "./examples/duckduckgo-search-apple.json"

export function registerDuckDuckGo(api: Api) {
  api.group("/search", (g) => {
    g.get("/duckduckgo")
      .query(Type.Object({
        q: Type.String({ description: "Parameter defines the query you want to search. You can use anything that you would use in a regular DuckDuckGo search. (e.g., `inurl:`, `site:`, `intitle:`, etc.) Parameter length can not exceed 500 characters." }),
        kl: Type.Optional(Type.String({ description: "Parameter defines the region to use for the DuckDuckGo search. Region code examples: `us-en` for the United States, `uk-en` for United Kingdom, or `fr-fr` for France. Head to the DuckDuckGo regions for a full list of supported regions.. Valid values include: ar-es, au-en, at-de, be-fr, be-nl, br-pt, bg-bg, ca-en, ca-fr, ct-ca, and 54 more" })),
        safe: Type.Optional(Type.Union([Type.Literal("1"), Type.Literal("-1"), Type.Literal("-2")], { description: "Parameter defines the level of filtering for adult content. It can be set to `1` (Strict), `-1` (Moderate - default), or `-2` (Off)." })),
        df: Type.Optional(Type.String({ description: "Parameter defines results filtered by date. It can be set to:" })),
        start: Type.Optional(Type.Number({ description: "Parameter defines the result offset. It skips the given number of results. When offset is not being used (initial search request, start parameter is set to 0 or left blank), up to 35 `organic_results` can be returned. When offset is being used (start parameter is greater than 0), up to 50 `organic_results` can be returned. DuckDuckGo may return duplicated results or a variable number of results. This is more likely to happen with higher start and m parameters." })),
        m: Type.Optional(Type.Number({ description: "Parameter defines the maximum number of results to return. Default value:`50` Min. value:`1` Max. value:`50` When offset is not being used (initial search request, start parameter is set to 0 or left blank), up to 35 `organic_results` can be returned. DuckDuckGo may return duplicated results or a variable number of results. This is more likely to happen with higher start and m parameters." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the DuckDuckGo results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Duckduckgo search results" }))
      .summary("Duckduckgo")
      .description("Search via Duckduckgo. Real API: GET /search.json?engine=duckduckgo")
      .operationId("searchDuckduckgo")
      .tag("DuckDuckGo")
      .extension("x-serpapi-engine", "duckduckgo")
      .extension("x-serpapi-real-path", "/search.json")
      .example("search-apple", { summary: "Duckduckgo example: search apple", value: DuckduckgoSearchAppleExample })

    g.get("/duckduckgo_light")
      .query(Type.Object({
        q: Type.String({ description: "Parameter defines the query you want to search. You can use anything that you would use in a regular DuckDuckGo search. (e.g., `inurl:`, `site:`, `intitle:`, etc.) Parameter length can not exceed 500 characters." }),
        kl: Type.Optional(Type.String({ description: "Parameter defines the region to use for the DuckDuckGo search. Region code examples: `us-en` for the United States, `uk-en` for United Kingdom, or `fr-fr` for France. Head to the DuckDuckGo regions for a full list of supported regions.. Valid values include: ar-es, au-en, at-de, be-fr, be-nl, br-pt, bg-bg, ca-en, ca-fr, ct-ca, and 54 more" })),
        df: Type.Optional(Type.String({ description: "Parameter defines results filtered by date. It can be set to:" })),
        next_page_token: Type.Optional(Type.String({ description: "Parameter defines the next page token. It is used for retrieving the next page results. `15` results are returned per page." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the DuckDuckGo Light results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Duckduckgo Light search results" }))
      .summary("Duckduckgo Light")
      .description("Search via Duckduckgo Light. Real API: GET /search.json?engine=duckduckgo_light")
      .operationId("searchDuckduckgoLight")
      .tag("DuckDuckGo")
      .extension("x-serpapi-engine", "duckduckgo_light")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/duckduckgo_maps")
      .query(Type.Object({
        q: Type.String({ description: "Parameter defines the query you want to search. You can use anything that you would use in a regular DuckDuckGo Maps search." }),
        bbox: Type.Optional(Type.String({ description: "Parameter defines an area where you want your q (query) to be applied. The value consists of latitude/longitude pair. The first pair marks the top left corner and the second pair marks the bottom right corner of the map area box. It has to be constructed in the next sequence: `latitude_tl` + `,` + `longitude_tl` + `,` + `latitude_br` + `,` + `longitude_br` This will form a string that looks like this: e.g. `30.341552964181687,-97.87405344947078,30.16321730812698,-97.50702877159034` DuckDuckGo Maps uses bbox parameter as the default way to pass GPS coordinates. When unsure what the value should be, visit DuckDuckGo Maps, search for a query in a desired location, and copy a value from the URL. Parameter can't be used with lat and lon parameters." })),
        lat: Type.Optional(Type.Number({ description: "Defines a GPS latitude for the search origin. Parameter is required when using lon parameter." })),
        lon: Type.Optional(Type.Number({ description: "Defines a GPS longitude for the search origin. Parameter is required when using lat parameter." })),
        strict_bbox: Type.Optional(Type.Union([Type.Literal("0"), Type.Literal("1")], { description: "Parameter defines whether you strictly want your search to follow the bbox coordinates. It can be set to `1` (strict - default), or `0` (off)." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the DuckDuckGo Maps results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Duckduckgo Maps search results" }))
      .summary("Duckduckgo Maps")
      .description("Search via Duckduckgo Maps. Real API: GET /search.json?engine=duckduckgo_maps")
      .operationId("searchDuckduckgoMaps")
      .tag("DuckDuckGo")
      .extension("x-serpapi-engine", "duckduckgo_maps")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/duckduckgo_news")
      .query(Type.Object({
        q: Type.String({ description: "Parameter defines the query you want to search. You can use anything that you would use in a regular DuckDuckGo News search. (e.g., `inurl:`, `site:`, `intitle:`, etc.) Parameter length can not exceed 500 characters." }),
        kl: Type.Optional(Type.String({ description: "Parameter defines the region to use for the DuckDuckGo News search. Region code examples: `us-en` for the United States, `uk-en` for United Kingdom, or `fr-fr` for France. Head to the DuckDuckGo regions for a full list of supported regions.. Valid values include: ar-es, au-en, at-de, be-fr, be-nl, br-pt, bg-bg, ca-en, ca-fr, ct-ca, and 54 more" })),
        safe: Type.Optional(Type.Union([Type.Literal("1"), Type.Literal("-1"), Type.Literal("-2")], { description: "Parameter defines the level of filtering for adult content. It can be set to `1` (Strict), `-1` (Moderate - default), or `-2` (Off)." })),
        df: Type.Optional(Type.String({ description: "Parameter defines results filtered by date. It can be set to:" })),
        start: Type.Optional(Type.Number({ description: "Parameter defines the result offset. It skips the given number of results. When offset is not being used (initial search request, start parameter is set to 0 or left blank), up to 75 `news_results` can be returned. When offset is being used (start parameter is greater than 0), up to 100 `news_results` can be returned. DuckDuckGo may return duplicated results or a variable number of results. This is more likely to happen with higher start and m parameters." })),
        m: Type.Optional(Type.Number({ description: "Parameter defines the maximum number of results to return. Default value:`100` Min. value:`1` Max. value:`100` When offset is not being used (initial search request, start parameter is set to 0 or left blank), up to 75 `news_results` can be returned. DuckDuckGo may return duplicated results or a variable number of results. This is more likely to happen with higher start and m parameters." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the DuckDuckGo News results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Duckduckgo News search results" }))
      .summary("Duckduckgo News")
      .description("Search via Duckduckgo News. Real API: GET /search.json?engine=duckduckgo_news")
      .operationId("searchDuckduckgoNews")
      .tag("DuckDuckGo")
      .extension("x-serpapi-engine", "duckduckgo_news")
      .extension("x-serpapi-real-path", "/search.json")

  })
}

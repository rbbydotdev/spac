import { Type } from "@sinclair/typebox"
import type { Api } from "spac"

export function registerApple(api: Api) {
  api.group("/search", (g) => {
    g.get("/apple_app_store")
      .query(Type.Object({
        term: Type.String({ description: "Parameter defines the query you want to search. You can use any search term that you would use in a regular App Store search. (e.g. `Coffee`)" }),
        country: Type.Optional(Type.String({ description: "Parameter defines the country to use for the search. It's a two-letter country code. (e.g., `us` (default) for the United States, `uk` for United Kingdom, or `fr` for France). Head to the Apple Regions for a full list of supported Apple Regions. Valid values include: al, dz, ao, ai, ag, ar, am, au, at, az, and 145 more" })),
        lang: Type.Optional(Type.String({ description: "Parameter defines the language to use for the search. It's a four-letter country code. (e.g., `en-us` (default) for the English, `fr-fr` for French, or `uk-ua` for Ukrainian). Head to the Apple Languages for a full list of supported Apple Languages. Valid values include: pt-br, it-it, hi-in, ca-es, es-es, zh-tw, th-th, da-dk, fi-fi, en-gb, and 29 more" })),
        num: Type.Optional(Type.Number({ description: "Parameter defines the number of results you want to get per each page. It defaults to `10`. Maximum number of results you can get per page is `200`. Any number greater than maximum number will default to `200`." })),
        disallow_explicit: Type.Optional(Type.Boolean({ description: "Parameter defines the filter for disallowing explicit apps. It defaults to `false`." })),
        property: Type.Optional(Type.Union([Type.Literal("developer")], { description: "Parameter allows to search the property of an app. `developer` allows searching the developer title of an app ( e.g., property=`developer` and term=`Coffee` gives apps with \"Coffee\" in their developer's name. (Ex: `Coffee Inc.`)" })),
        category_id: Type.Optional(Type.String({ description: "Parameter allows to only show app results for a specific category, or genre. E.g. category\\_id=`6014` will only return apps that have \"Games\" as at least one of their categories, or genres. Head to the Apple Categories for a full list of supported Apple Categories/Genres.. Valid values include: 6018, 6000, 6026, 6017, 6016, 6015, 6023, 6014, 7001, 7002, and 31 more" })),
        device: Type.Optional(Type.String({ description: "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Apple App Store results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Apple App Store search results" }))
      .summary("Apple App Store")
      .description("Search via Apple App Store. Real API: GET /search.json?engine=apple_app_store")
      .operationId("searchAppleAppStore")
      .tag("Apple")
      .extension("x-serpapi-engine", "apple_app_store")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/apple_product")
      .query(Type.Object({
        product_id: Type.String({ description: "Parameter defines the product id you want to search. You can use the specific id of a product that you would like to get the product page of." }),
        type: Type.Optional(Type.Union([Type.Literal("app")], { description: "Parameter defines the type of Apple Product to get the product page of. It defaults to `app`." })),
        country: Type.Optional(Type.String({ description: "Parameter defines the country to use for the search. It's a two-letter country code. (e.g., `us` (default) for the United States, `uk` for United Kingdom, or `fr` for France). Head to the Apple Regions for a full list of supported Apple Regions.. Valid values include: al, dz, ao, ai, ag, ar, am, au, at, az, and 145 more" })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Apple Product results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Apple Product search results" }))
      .summary("Apple Product")
      .description("Search via Apple Product. Real API: GET /search.json?engine=apple_product")
      .operationId("searchAppleProduct")
      .tag("Apple")
      .extension("x-serpapi-engine", "apple_product")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/apple_reviews")
      .query(Type.Object({
        product_id: Type.String({ description: "Parameter defines the ID of a product you want to get the reviews for. You can find the ID of a product from App Store API json results, You can also get it from the URL of the app. For example `product_id` of \"https://apps.apple.com/us/app/the-great-coffee-app/id534220544\", is the long numerical value that comes after \"id\", 534220544 (default)." }),
        country: Type.Optional(Type.String({ description: "Parameter defines the country to use for the search. It's a two-letter country code. (e.g., `us` (default) for the United States, `uk` for United Kingdom, or `fr` for France). Head to the Apple Regions for a full list of supported Apple Regions.. Valid values include: al, dz, ao, ai, ag, ar, am, au, at, az, and 145 more" })),
        page: Type.Optional(Type.Number({ description: "Parameter is used to get the items on a specific page. (e.g., 1 (default) is the first page of results, 2 is the 2nd page of results, 3 is the 3rd page of results, etc.)." })),
        sort: Type.Optional(Type.Union([Type.Literal("mostrecent"), Type.Literal("mosthelpful"), Type.Literal("mostfavorable"), Type.Literal("mostcritical")], { description: "Parameter is used for sorting reviews for the iOS App Store (iPhone and iPad). It can be set to:" })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Apple Reviews results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Apple Reviews search results" }))
      .summary("Apple Reviews")
      .description("Search via Apple Reviews. Real API: GET /search.json?engine=apple_reviews")
      .operationId("searchAppleReviews")
      .tag("Apple")
      .extension("x-serpapi-engine", "apple_reviews")
      .extension("x-serpapi-real-path", "/search.json")

  })
}

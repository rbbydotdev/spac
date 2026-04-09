import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import YelpSearchCoffeeExample from "./examples/yelp-search-coffee.json"

export function registerSocial(api: Api) {
  api.group("/search", (g) => {
    g.get("/facebook_profile")
      .query(Type.Object({
        profile_id: Type.String({ description: "Parameter defines the Facebook profile ID. You can find it in the URL of the profile page. For example, in `https://www.facebook.com/Meta`, the profile ID is `Meta`; in `https://facebook.com/profile.php?id=100080376596424`, the profile ID is `100080376596424`." }),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Facebook Profile results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Facebook Profile search results" }))
      .summary("Facebook Profile")
      .description("Search via Facebook Profile. Real API: GET /search.json?engine=facebook_profile")
      .operationId("searchFacebookProfile")
      .tag("Social & Reviews")
      .extension("x-serpapi-engine", "facebook_profile")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/open_table_reviews")
      .query(Type.Object({
        place_id: Type.String({ description: "Parameter defines the OpenTable ID of a restaurant. This identifier can be found in the URL of the restaurant's page, immediately following `/r/`. For example, in the URL `https://www.opentable.com/r/central-park-boathouse-new-york-2`, the ID is `central-park-boathouse-new-york-2`." }),
        open_table_domain: Type.Optional(Type.Union([Type.Literal("opentable.com"), Type.Literal("opentable.jp"), Type.Literal("opentable.de"), Type.Literal("opentable.es"), Type.Literal("opentable.ca"), Type.Literal("opentable.hk"), Type.Literal("opentable.ie"), Type.Literal("opentable.sg"), Type.Literal("opentable.nl"), Type.Literal("opentable.com.mx"), Type.Literal("opentable.co.uk"), Type.Literal("opentable.com.au"), Type.Literal("opentable.ae"), Type.Literal("opentable.co.th"), Type.Literal("opentable.it"), Type.Literal("opentable.com.tw"), Type.Literal("opentable.fr")], { description: "Parameter defines the OpenTable domain to use. It defaults to `www.opentable.com`. Head to the OpenTable domains page for a full list of supported OpenTable domains." })),
        page: Type.Optional(Type.Number({ description: "Parameter defines the page number. `1` (default) is the first page of 10 results, `2` is the 2nd page, etc." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the OpenTable Reviews results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Open Table Reviews search results" }))
      .summary("Open Table Reviews")
      .description("Search via Open Table Reviews. Real API: GET /search.json?engine=open_table_reviews")
      .operationId("searchOpenTableReviews")
      .tag("Social & Reviews")
      .extension("x-serpapi-engine", "open_table_reviews")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/tripadvisor")
      .query(Type.Object({
        q: Type.String({ description: "Parameter defines the query you want to search. You can use anything that you would use in a regular Tripadvisor search." }),
        lat: Type.Optional(Type.Number({ description: "Defines a GPS latitude for the search origin." })),
        lon: Type.Optional(Type.Number({ description: "Defines a GPS longitude for the search origin." })),
        tripadvisor_domain: Type.Optional(Type.String({ description: "Parameter defines the Tripadvisor domain to use. It defaults to `tripadvisor.com`. Head to the Tripadvisor domains page for a full list of supported Tripadvisor domains.. Valid values include: www.tripadvisor.com, www.tripadvisor.ca, fr.tripadvisor.ca, www.tripadvisor.com.br, www.tripadvisor.com.mx, www.tripadvisor.com.ar, www.tripadvisor.cl, www.tripadvisor.co, www.tripadvisor.com.pe, www.tripadvisor.com.ve, and 39 more" })),
        ssrc: Type.Optional(Type.Union([Type.Literal("a"), Type.Literal("r"), Type.Literal("A"), Type.Literal("h"), Type.Literal("g"), Type.Literal("v"), Type.Literal("f")], { description: "This parameter specifies the search filter you want to use for the Tripadvisor search. Available options: `a` - All Results `r` - Restaurants `A` - Things to Do `h` - Hotels `g` - Destinations `v` - Vacation Rentals `f` - Forums NOTE: Tripadvisor has discontinued support for Vacation Rentals. As a result, using `ssrc=v` may return incomplete results or no results at all." })),
        offset: Type.Optional(Type.Number({ description: "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `30` is the 2nd page of results, `60` is the 3rd page of results, etc.)." })),
        limit: Type.Optional(Type.Number({ description: "Parameter defines the maximum number of results to return. (e.g., `30` (default) returns 30 results, `60` returns 60 results, and `100` returns 100 results)." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Tripadvisor results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Tripadvisor search results" }))
      .summary("Tripadvisor")
      .description("Search via Tripadvisor. Real API: GET /search.json?engine=tripadvisor")
      .operationId("searchTripadvisor")
      .tag("Social & Reviews")
      .extension("x-serpapi-engine", "tripadvisor")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/tripadvisor_place")
      .query(Type.Object({
        place_id: Type.String({ description: "Parameter defines the Tripadvisor place ID. To extract the ID of a place, you can use our Tripadvisor Search API. NOTE: Tripadvisor has discontinued support for Vacation Rentals. As a result, requesting details for a Vacation Rental `place_id` may return incomplete incomplete data or no data at all." }),
        tripadvisor_domain: Type.Optional(Type.String({ description: "Parameter defines the Tripadvisor domain to use. It defaults to `tripadvisor.com`. Head to the Tripadvisor domains page for a full list of supported Tripadvisor domains.. Valid values include: www.tripadvisor.com, www.tripadvisor.ca, fr.tripadvisor.ca, www.tripadvisor.com.br, www.tripadvisor.com.mx, www.tripadvisor.com.ar, www.tripadvisor.cl, www.tripadvisor.co, www.tripadvisor.com.pe, www.tripadvisor.com.ve, and 39 more" })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Tripadvisor Place results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Tripadvisor Place search results" }))
      .summary("Tripadvisor Place")
      .description("Search via Tripadvisor Place. Real API: GET /search.json?engine=tripadvisor_place")
      .operationId("searchTripadvisorPlace")
      .tag("Social & Reviews")
      .extension("x-serpapi-engine", "tripadvisor_place")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/yelp")
      .query(Type.Object({
        find_desc: Type.Optional(Type.String({ description: "Parameter defines the query you want to search. You can use anything that you would use in a regular Yelp search." })),
        find_loc: Type.String({ description: "Parameter defines from where you want the search to originate. You can use any location you would use in a regular Yelp search. Following location formats are acceptable: - 706 Mission St, San Francisco, CA - San Francisco, CA - San Francisco, CA 94103 - 94103" }),
        l: Type.Optional(Type.String({ description: "Parameter defines the distance (map radius) or neighborhoods you want to search in. You can use our JSON endpoint to fetch values for either of them. Values for distance are accessible through `filters.distance` (e.g. value for 'Bird's-eye View' is `g:-97.86003112792969,30.21635515266855,-97.65541076660156,30.394199462058317`). You can also specify neighborhoods to search in. Values for neighborhoods are accessible through `filters.neighborhoods`. The value for a single neighborhood is formed in the next order: `filters.neighborhoods.value` + `filters.neighborhoods.list[0].value` (e.g. `p:TX:Austin::Downtown`). You can also set value for multiple neighborhoods: `filters.neighborhoods.value` + `[filters.neighborhoods.list[0].value,filters.neighborhoods.list[1].value]` (e.g. `p:TX:Austin::[Downtown,East_Austin]`). Distance and neighborhoods values can't be used together." })),
        yelp_domain: Type.Optional(Type.String({ description: "Parameter defines the Yelp domain to use. It defaults to `yelp.com`. Head to the Yelp domains for a full list of supported Yelp domains.. Valid values include: ms.yelp.my, www.yelp.cz, www.yelp.dk, www.yelp.de, www.yelp.at, de.yelp.ch, www.yelp.com.au, en.yelp.be, www.yelp.ca, en.yelp.com.hk, and 31 more" })),
        cflt: Type.Optional(Type.String({ description: "Parameter is used to define a category. It can be used alongside find\\_desc parameter to refine the search." })),
        sortby: Type.Optional(Type.Union([Type.Literal("recommended"), Type.Literal("rating"), Type.Literal("review_count")], { description: "Parameter is used for sorting results. Available options: `recommended` - Recommended (default) `rating` - Highest Rated `review_count` - Most Reviewed" })),
        attrs: Type.Optional(Type.String({ description: "Parameter is used for refining results. You can add more filters like 'price', 'features', etc. to your search. You can use our JSON endpoint to fetch values. Values for filters are accessible through `filters` (e.g. value for filtering results by 'No Smoking' is `Smoking.no`). You can also use multiple values: `filters.features[0].value,filters.features[1].value` (e.g. `GoodForKids,DogsAllowed`)" })),
        start: Type.Optional(Type.Number({ description: "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `10` is the 2nd page of results, `20` is the 3rd page of results, etc.)." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Yelp results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Yelp search results" }))
      .summary("Yelp")
      .description("Search via Yelp. Real API: GET /search.json?engine=yelp")
      .operationId("searchYelp")
      .tag("Social & Reviews")
      .extension("x-serpapi-engine", "yelp")
      .extension("x-serpapi-real-path", "/search.json")
      .example("search-coffee", { summary: "Yelp example: search coffee", value: YelpSearchCoffeeExample })

    g.get("/yelp_place")
      .query(Type.Object({
        place_id: Type.Optional(Type.String({ description: "Parameter defines the Yelp ID of a place. Each place has two unique IDs (e.g. `ED7A7vDdg8yLNKJTSVHHmg` and `arabica-brooklyn`) and you can use either of them as a value of the place\\_id. To extract the IDs of a place you can use our Yelp Search API." })),
        yelp_domain: Type.Optional(Type.String({ description: "Parameter defines the Yelp domain to use. It defaults to `yelp.com`. Head to the Yelp domains for a full list of supported Yelp domains.. Valid values include: ms.yelp.my, www.yelp.cz, www.yelp.dk, www.yelp.de, www.yelp.at, de.yelp.ch, www.yelp.com.au, en.yelp.be, www.yelp.ca, en.yelp.com.hk, and 31 more" })),
        business_alert: Type.Optional(Type.Boolean({ description: "Set parameter to `true` to include business alert information when available. It defaults to `false`." })),
        full_menu: Type.Optional(Type.Boolean({ description: "Set parameter to `true` to scrape business full menu when available. It defaults to `false`. When the parameter full\\_menu is set to `true`, but the business queried doesn't have a full menu page, then `place_results` will be returned instead of `full_menu_results`. This information will also be returned in `search_information` and `error` keys in the json response." })),
        menu_name: Type.Optional(Type.String({ description: "Parameter defines the name of which Full Menu to scrape when more than one Full Menu is available. It can only be used in combination with full\\_menu parameter." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Yelp Place results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Yelp Place search results" }))
      .summary("Yelp Place")
      .description("Search via Yelp Place. Real API: GET /search.json?engine=yelp_place")
      .operationId("searchYelpPlace")
      .tag("Social & Reviews")
      .extension("x-serpapi-engine", "yelp_place")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/yelp_reviews")
      .query(Type.Object({
        place_id: Type.String({ description: "Parameter defines the Yelp ID of a place. Each place has two unique IDs (e.g. `ED7A7vDdg8yLNKJTSVHHmg` and `arabica-brooklyn`). Only the first ID type is supported (e.g. `ED7A7vDdg8yLNKJTSVHHmg`). To extract the ID of a place, you can use our Yelp Search API." }),
        yelp_domain: Type.Optional(Type.String({ description: "Parameter defines the Yelp domain to use. It defaults to `yelp.com`. Head to the Yelp domains for a full list of supported Yelp domains.. Valid values include: ms.yelp.my, www.yelp.cz, www.yelp.dk, www.yelp.de, www.yelp.at, de.yelp.ch, www.yelp.com.au, en.yelp.be, www.yelp.ca, en.yelp.com.hk, and 31 more" })),
        hl: Type.Optional(Type.Union([Type.Literal("ms"), Type.Literal("cs"), Type.Literal("da"), Type.Literal("de"), Type.Literal("en"), Type.Literal("es"), Type.Literal("fil"), Type.Literal("fr"), Type.Literal("it"), Type.Literal("nl"), Type.Literal("nb"), Type.Literal("pl"), Type.Literal("pt"), Type.Literal("fi"), Type.Literal("sv"), Type.Literal("tr"), Type.Literal("ja"), Type.Literal("zh")], { description: "Parameter defines the language to use for sorting Yelp Reviews. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French) Head to the Yelp Reviews languages for a full list of supported Yelp Reviews languages." })),
        q: Type.Optional(Type.String({ description: "Parameter defines the query you want to use to search through Yelp Reviews." })),
        sortby: Type.Optional(Type.Union([Type.Literal("relevance_desc"), Type.Literal("date_desc"), Type.Literal("date_asc"), Type.Literal("rating_desc"), Type.Literal("rating_asc"), Type.Literal("elites_desc")], { description: "Parameter is used for sorting results. Available options: `relevance_desc` - Yelp Sort (default) `date_desc` - Newest First `date_asc` - Oldest Rated `rating_desc` - Highest Rated `rating_asc` - Lowest Rated `elites_desc` - Elites" })),
        rating: Type.Optional(Type.String({ description: "Parameter filters out the results by rating. Possible values are `5`, `4`, `3`, `2`, and `1`. All results are included by default. To only show results with the five star rating, the value should be set to `5` To include results with multiple ratings, the value should for example be set to `5,4,3` (each rating separated by comma `,`)." })),
        not_recommended: Type.Optional(Type.Boolean({ description: "Parameter fetches reviews that are not recommended by Yelp. It can be set to `true` to only show not recommended reviews, or `false` to show recommended reviews. By default, only **recommended** reviews are shown." })),
        start: Type.Optional(Type.Number({ description: "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `49` is the 2nd page of results, `98` is the 3rd page of results, etc.)." })),
        num: Type.Optional(Type.Number({ description: "Parameter defines the maximum number of results to return. `49` (default) returns 49 results. Maximum number of results to return is `49`." })),
        not_recommended_start: Type.Optional(Type.Number({ description: "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `10` is the 2nd page of results, `20` is the 3rd page of results, etc.). The not\\_recommended\\_start parameter can only be used with the not\\_recommended parameter set to `true`." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Yelp Reviews results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Yelp Reviews search results" }))
      .summary("Yelp Reviews")
      .description("Search via Yelp Reviews. Real API: GET /search.json?engine=yelp_reviews")
      .operationId("searchYelpReviews")
      .tag("Social & Reviews")
      .extension("x-serpapi-engine", "yelp_reviews")
      .extension("x-serpapi-real-path", "/search.json")

  })
}

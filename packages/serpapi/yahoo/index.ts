import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import YahooSearchCoffeeExample from "./examples/yahoo-search-coffee.json"

export function registerYahoo(api: Api) {
  api.group("/search", (g) => {
    g.get("/yahoo")
      .query(Type.Object({
        p: Type.String({ description: "Parameter defines the search query. You can use anything that you would use in a regular Yahoo! search." }),
        yahoo_domain: Type.Optional(Type.String({ description: "Parameter defines the Yahoo! domain to use. It defaults to `search.yahoo.com`. If specified domain is allowed, it will be prepended to the domain (e.g., `fr.search.yahoo.com`). You can check a full list of supported Yahoo! domains.. Valid values include: espanol, be, fr, br, ca, espanol, espanol, de, es, espanol, and 30 more" })),
        vc: Type.Optional(Type.String({ description: "Parameter defines the country to use for the Yahoo! search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Yahoo! countries for a full list of supported Yahoo! countries.. Valid values include: al, dz, ar, am, au, at, az, bh, be, bo, and 84 more" })),
        vl: Type.Optional(Type.String({ description: "Parameter defines language to limit the search to. It uses `lang_{two-letter language code}` to specify languages. (e.g., `vl=lang_fr` will only search French). `fl` will be set to `1` if this parameter is used. You can check a full list of supported Yahoo! languages.. Valid values include: lang_ar, lang_bg, lang_zh_chs, lang_zh_cht, lang_hr, lang_cs, lang_da, lang_nl, lang_en, lang_et, and 22 more" })),
        b: Type.Optional(Type.Number({ description: "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `1` (default) is the first page of results, `11` is the 2nd page of results, `21` is the 3rd page of results, etc.)." })),
        vm: Type.Optional(Type.Union([Type.Literal("r"), Type.Literal("i"), Type.Literal("p")], { description: "Parameter defines the level of filtering for adult content. Strict: `r`, Moderate: `i`, Off: `p`" })),
        vs: Type.Optional(Type.String({ description: "Filter results by top-level domains separated by ','. (e.g., `.com,.org`)" })),
        vf: Type.Optional(Type.Union([Type.Literal("html"), Type.Literal("pdf"), Type.Literal("xls"), Type.Literal("ppt"), Type.Literal("doc"), Type.Literal("txt")], { description: "`all formats` or specific file format like `pdf` or `txt`. You can check a full list of supported Yahoo! file formats." })),
        fr2: Type.Optional(Type.String({ description: "Parameter is responsible for rendering positions and expansions for some elements (e.g., `p:s,v:w,m:trendingdomain_center` to expand Related Trending Searches)." })),
        d: Type.Optional(Type.String({ description: "Parameter specifies the destination for related topics. By including a unique identifier for the destination page, this parameter directs users to specific content related to their search query, providing them with more targeted results. (e.g. `{\"dn\":\"topic\",\"ykid\":\"71698d3e-6ef0-4fcd-8551-1ffe56058857\",\"pos\":\"0\",\"oq\":\"Coffee\",\"rq\":\"Drinking\"}`)" })),
        device: Type.Optional(Type.String({ description: "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Yahoo results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Yahoo search results" }))
      .summary("Yahoo")
      .description("Search via Yahoo. Real API: GET /search.json?engine=yahoo")
      .operationId("searchYahoo")
      .tag("Yahoo")
      .extension("x-serpapi-engine", "yahoo")
      .extension("x-serpapi-real-path", "/search.json")
      .example("search-coffee", { summary: "Yahoo example: search coffee", value: YahooSearchCoffeeExample })

    g.get("/yahoo_images")
      .query(Type.Object({
        p: Type.String({ description: "Parameter defines the search query. You can use anything that you would use in a regular Yahoo! Images search." }),
        yahoo_domain: Type.Optional(Type.String({ description: "Parameter defines the Yahoo! domain to use. It defaults to `search.yahoo.com`. If specified domain is allowed, it will be prepended to the domain (e.g., `fr.search.yahoo.com`). You can check a full list of supported Yahoo! domains.. Valid values include: espanol, be, fr, br, ca, espanol, espanol, de, es, espanol, and 30 more" })),
        imgsz: Type.Optional(Type.Union([Type.Literal("small"), Type.Literal("medium"), Type.Literal("large"), Type.Literal("wallpaper")], { description: "Parameter is used for filtering images by size. It can be set to: `small` - Small `medium` - Medium `large` - Large `wallpaper` - Extra Large" })),
        imgc: Type.Optional(Type.Union([Type.Literal("color"), Type.Literal("bw"), Type.Literal("red"), Type.Literal("orange"), Type.Literal("yellow"), Type.Literal("green"), Type.Literal("teal"), Type.Literal("blue"), Type.Literal("purple"), Type.Literal("pink"), Type.Literal("brown"), Type.Literal("black"), Type.Literal("gray"), Type.Literal("white")], { description: "Parameter is used for filtering images by color. It can be set to: `color` - Color Only `bw` - Black & white `red` - Red color `orange` - Orange color `yellow` - Yellow color `green` - Green color `teal` - Teal color `blue` - Blue color `purple` - Purple color `pink` - Pink color `brown` - Brown color `black` - Black color `gray` - Gray color `white` - White color" })),
        imgty: Type.Optional(Type.Union([Type.Literal("photo"), Type.Literal("clipart"), Type.Literal("linedrawing"), Type.Literal("gif"), Type.Literal("transparent")], { description: "Parameter is used for filtering images by image type. It can be set to: `photo` - Photo `clipart` - Clipart `linedrawing` - Line Drawing `gif` - Animated GIF `transparent` - Transparent" })),
        imga: Type.Optional(Type.Union([Type.Literal("square"), Type.Literal("wide"), Type.Literal("tall")], { description: "Parameter is used for filtering images by layout. It can be set to: `square` - Square `wide` - Wide `tall` - Tall" })),
        imgf: Type.Optional(Type.Union([Type.Literal("face"), Type.Literal("portrait"), Type.Literal("nonportrait")], { description: "Parameter is used for filtering images by people. It can be set to: `face` - Faces Only `portrait` - Head & Shoulders `nonportrait` - No People" })),
        imgt: Type.Optional(Type.Union([Type.Literal("day"), Type.Literal("week"), Type.Literal("month"), Type.Literal("year")], { description: "Parameter is used for filtering images by time. It can be set to: `day` - Past 24 hours `week` - Past week `month` - Past month `year` - Past year" })),
        imgl: Type.Optional(Type.Union([Type.Literal("cc"), Type.Literal("pd"), Type.Literal("fsu"), Type.Literal("fsuc"), Type.Literal("fmsu"), Type.Literal("fmsuc")], { description: "Parameter is used for filtering images by usage rights. It can be set to: `cc` - All Creative Commons `pd` - Public Domain `fsu` - Free to share and use `fsuc` - Free to share and use commercially `fmsu` - Free to modify, share and use `fmsuc` - Free to modify, share, and use commercially" })),
        b: Type.Optional(Type.Number({ description: "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `1` (default) starts from the first result, `61` starts from the 61st result, `121` starts from the 121st result, etc.)." })),
        device: Type.Optional(Type.String({ description: "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Yahoo Images results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Yahoo Images search results" }))
      .summary("Yahoo Images")
      .description("Search via Yahoo Images. Real API: GET /search.json?engine=yahoo_images")
      .operationId("searchYahooImages")
      .tag("Yahoo")
      .extension("x-serpapi-engine", "yahoo_images")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/yahoo_shopping")
      .query(Type.Object({
        p: Type.String({ description: "Parameter defines the search query. You can use anything that you would use in a regular Yahoo! shopping search." }),
        min_price: Type.Optional(Type.String({ description: "Lower bound of price range query." })),
        max_price: Type.Optional(Type.String({ description: "Upper bound of price range query." })),
        sort_by: Type.Optional(Type.Union([Type.Literal("price"), Type.Literal("relevancy"), Type.Literal("popularity"), Type.Literal("discountPercentage")], { description: "Parameter is used for sorting and refining results. Available options: `price` - the costliest items first. `relevancy` - the most relevant items first. `popularity` - the most popular items first. `discountPercentage` - the highest discounted items (by percentage) first." })),
        order_by: Type.Optional(Type.Union([Type.Literal("ASC"), Type.Literal("DESC")], { description: "Parameter used to sort the query results in a top to bottom style or vice-versa. Available options: `ASC` and `DESC`." })),
        category_attr_values: Type.Optional(Type.String({ description: "Gender and Age Range filters on Yahoo! Shopping Search separated by comma (`,`). (e.g. `gender_female,age_adult` is 'female' and 'adult', etc.). Can be obtained from `filters.gender` and `filters.age-range` in API response." })),
        merchants: Type.Optional(Type.String({ description: "Merchants ID separated by comma (`,`). Merchant IDs can be obtained from `filters.stores` in API response. (e.g. `3719d8d4-5edd-4817-998a-91f3229e7323,` is 'Walmart', etc.)" })),
        start: Type.Optional(Type.String({ description: "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `1` (default) is the first page of results, `60` is the 2nd page of results, `120` is the 3rd page of results, etc.)." })),
        limit: Type.Optional(Type.String({ description: "Parameter defines the maximum number of results to return. (e.g., `10` (default) returns 10 results, `40` returns 40 results, and `100` returns 100 results)." })),
        page: Type.Optional(Type.String({ description: "The page parameter does the `start` parameter math for you! Just define the page number you want. Pagination starts from 1." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Yahoo Shopping results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Yahoo Shopping search results" }))
      .summary("Yahoo Shopping")
      .description("Search via Yahoo Shopping. Real API: GET /search.json?engine=yahoo_shopping")
      .operationId("searchYahooShopping")
      .tag("Yahoo")
      .extension("x-serpapi-engine", "yahoo_shopping")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/yahoo_videos")
      .query(Type.Object({
        p: Type.String({ description: "Parameter defines the search query. You can use anything that you would use in a regular Yahoo! Videos search." }),
        yahoo_domain: Type.Optional(Type.String({ description: "Parameter defines the Yahoo! domain to use. It defaults to `search.yahoo.com`. If specified domain is allowed, it will be prepended to the domain (e.g., `fr.search.yahoo.com`). You can check a full list of supported Yahoo! domains.. Valid values include: espanol, be, fr, br, ca, espanol, espanol, de, es, espanol, and 30 more" })),
        durs: Type.Optional(Type.Union([Type.Literal("short"), Type.Literal("medium"), Type.Literal("long")], { description: "Parameter is used for filtering videos by length. It can be set to: `short` - Short (less than 5 minutes) `medium` - Medium (5-20 minutes) `long` - Long (more than 20 minutes)" })),
        vage: Type.Optional(Type.Union([Type.Literal("day"), Type.Literal("week"), Type.Literal("month"), Type.Literal("year")], { description: "Parameter is used for filtering videos by date. It can be set to: `day` - Past 24 hours `week` - Past week `month` - Past month `year` - Past year" })),
        vres: Type.Optional(Type.Union([Type.Literal("360p"), Type.Literal("480p"), Type.Literal("720p"), Type.Literal("1080p")], { description: "Parameter is used for filtering videos by resolution. It can be set to: `360p` - 360p or higher `480p` - 480p or higher `720p` - 720p or higher `1080p` - 1080p or higher" })),
        vsite: Type.Optional(Type.Union([Type.Literal("youtube"), Type.Literal("dailymotion"), Type.Literal("vimeo"), Type.Literal("mtv"), Type.Literal("cbsnews"), Type.Literal("foxnews"), Type.Literal("cnn"), Type.Literal("msn")], { description: "Parameter is used for filtering videos by source. It can be set to: `youtube` - YouTube `dailymotion` - Dailymotion `vimeo` - Vimeo `mtv` - MTV `cbsnews` - CBS `foxnews` - Fox `cnn` - CNN `msn` - MSN" })),
        b: Type.Optional(Type.Number({ description: "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `1` (default) starts from the first result, `61` starts from the 61st result, `121` starts from the 121st result, etc.)." })),
        device: Type.Optional(Type.String({ description: "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Yahoo Videos results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Yahoo Videos search results" }))
      .summary("Yahoo Videos")
      .description("Search via Yahoo Videos. Real API: GET /search.json?engine=yahoo_videos")
      .operationId("searchYahooVideos")
      .tag("Yahoo")
      .extension("x-serpapi-engine", "yahoo_videos")
      .extension("x-serpapi-real-path", "/search.json")

  })
}

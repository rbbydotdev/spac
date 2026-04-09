import { Type } from "@sinclair/typebox"
import type { Api } from "spac"

export function registerYandex(api: Api) {
  api.group("/search", (g) => {
    g.get("/yandex")
      .query(Type.Object({
        text: Type.String({ description: "Parameter defines the search query. You can use anything that you would use in a regular Yandex search." }),
        yandex_domain: Type.Optional(Type.Union([Type.Literal("yandex.com"), Type.Literal("yandex.ru"), Type.Literal("yandex.by"), Type.Literal("yandex.kz"), Type.Literal("yandex.uz"), Type.Literal("yandex.com.tr")], { description: "Parameter defines the Yandex domain to use. It defaults to `yandex.com`. Head to the Yandex domains for a full list of supported Yandex domains. A default lr is used for each yandex\\_domain. Example: `84`(US) for `yandex.com` A default lang parameter `en`(English) is used for `yandex.com`" })),
        lang: Type.Optional(Type.Union([Type.Literal("ru"), Type.Literal("en"), Type.Literal("be"), Type.Literal("kk"), Type.Literal("tr"), Type.Literal("uk")], { description: "Parameter defines the language to use for the Yandex search. Head to the Yandex languages for a full list of supported Yandex languages. It defaults to `en` when yandex\\_domain is `yandex.com`." })),
        lr: Type.Optional(Type.String({ description: "Parameter defines country or region ID to limit the search results to. Head to the Yandex locations for a full list of supported Yandex locations. If parameter is not set - the matching location of selected `yandex_domain` is used, e.g. `84` for `yandex.com`.. Valid values include: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, and 990 more" })),
        family_mode: Type.Optional(Type.Union([Type.Literal("0"), Type.Literal("1"), Type.Literal("2")], { description: "Parameter enables or disables Family Mode (safe search). It can be set to: - Off(`0`) - Moderate(`1`) - Strict(`2`). It defaults to Moderate(`1`)." })),
        fix_typo: Type.Optional(Type.Union([Type.Literal("false"), Type.Literal("true")], { description: "Parameter enables or disables automatic spelling correction. It can be set to: `true` - `false`. It defaults to `true`." })),
        groups_on_page: Type.Optional(Type.Number({ description: "Parameter defines the maximum number of groups displayed on a single results page. It defaults to `20`." })),
        p: Type.Optional(Type.Number({ description: "Parameter defines page number. Pagination starts from 0." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Yandex results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Yandex search results" }))
      .summary("Yandex")
      .description("Search via Yandex. Real API: GET /search.json?engine=yandex")
      .operationId("searchYandex")
      .tag("Yandex")
      .extension("x-serpapi-engine", "yandex")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/yandex_images")
      .query(Type.Object({
        text: Type.String({ description: "Parameter defines the search query. You can use anything that you would use in a regular Yandex Images search. It can be optional if the url parameter is being used." }),
        yandex_domain: Type.Optional(Type.Union([Type.Literal("yandex.com"), Type.Literal("yandex.ru"), Type.Literal("yandex.by"), Type.Literal("yandex.kz"), Type.Literal("yandex.uz"), Type.Literal("yandex.com.tr")], { description: "Parameter defines the Yandex Images domain to use. It defaults to `yandex.com`. Head to the Yandex domains for a full list of supported Yandex domains." })),
        width: Type.Optional(Type.Number({ description: "Parameter defines the width of an image. It can only be used in combination with height parameter." })),
        height: Type.Optional(Type.Number({ description: "Parameter defines the height of an image. It can only be used in combination with width parameter." })),
        file_type: Type.Optional(Type.Union([Type.Literal("jpg"), Type.Literal("png"), Type.Literal("gifan")], { description: "Parameter is used for filtering images by file type. It can be set to: `jpg` - JPG file extension `png` - PNG file extension `gifan` - GIF file extension" })),
        color: Type.Optional(Type.Union([Type.Literal("color"), Type.Literal("gray"), Type.Literal("red"), Type.Literal("orange"), Type.Literal("yellow"), Type.Literal("cyan"), Type.Literal("green"), Type.Literal("blue"), Type.Literal("violet"), Type.Literal("white"), Type.Literal("black")], { description: "Parameter is used for filtering images by color. It can be set to: `color` - Color images only `gray` - Black and white `red` - Red color `orange` - Orange color `yellow` - Yellow color `cyan` - Cyan color `green` - Green color `blue` - Blue color `violet` - Violet color `white` - White color `black` - Black color" })),
        orientation: Type.Optional(Type.Union([Type.Literal("horizontal"), Type.Literal("vertical"), Type.Literal("square")], { description: "Parameter is used for filtering images by orientation. It can be set to: `horizontal` - Horizontal `vertical` - Vertical `square` - Square" })),
        image_type: Type.Optional(Type.Union([Type.Literal("photo"), Type.Literal("clipart"), Type.Literal("lineart"), Type.Literal("face"), Type.Literal("demotivator")], { description: "Parameter is used for filtering images by image type. It can be set to: `photo` - Photograph `clipart` - White background `lineart` - Drawings and sketches `demotivator` - Demotivator `face` - People" })),
        site: Type.Optional(Type.String({ description: "Parameter is used for filtering images by their source. Example value: `www.shutterstock.com`." })),
        recent: Type.Optional(Type.Boolean({ description: "Parameter is used for showing images that appeared in the last 7 days." })),
        url: Type.Optional(Type.String({ description: "Parameter defines the URL for an image to perform the reverse image search." })),
        crop: Type.Optional(Type.String({ description: "Parameter is used to crop the image and perform the reverse search on the cropped part of the image. E.g. `0.04;0.46;0.27;0.84`. These coordinates are formatted in the next order: `left edge;top edge;right edge;bottom edge`. The minimum and maximum for each coordinate are `0` and `1`, respectively." })),
        crop_id: Type.Optional(Type.Number({ description: "Parameter is used to filter results by a specific section of an image. Parameter will only work with images uploaded by Yandex (e.g. `https://avatars.mds.yandex.net/rest-of-the-image-url`). crop and crop\\_id parameters should not be used together." })),
        tab: Type.Optional(Type.Union([Type.Literal("about"), Type.Literal("similar")], { description: "Parameter defines the specific tab for the reverse image search. Yandex defaults to the 'About the image' tab. It can be set to: `about` - 'About the image' tab results `similar` - 'Similar images' tab results." })),
        p: Type.Optional(Type.Number({ description: "Parameter defines the page number. Pagination starts from `0`, and it can return up to 30 results." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Yandex Images results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Yandex Images search results" }))
      .summary("Yandex Images")
      .description("Search via Yandex Images. Real API: GET /search.json?engine=yandex_images")
      .operationId("searchYandexImages")
      .tag("Yandex")
      .extension("x-serpapi-engine", "yandex_images")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/yandex_videos")
      .query(Type.Object({
        text: Type.String({ description: "Parameter defines the search query. You can use anything that you would use in a regular Yandex Videos search." }),
        yandex_domain: Type.Optional(Type.Union([Type.Literal("yandex.com"), Type.Literal("yandex.ru"), Type.Literal("yandex.by"), Type.Literal("yandex.kz"), Type.Literal("yandex.uz"), Type.Literal("yandex.com.tr")], { description: "Parameter defines the Yandex Videos domain to use. It defaults to `yandex.com`. Head to the Yandex domains for a full list of supported Yandex domains." })),
        duration: Type.Optional(Type.Union([Type.Literal("short"), Type.Literal("medium"), Type.Literal("long")], { description: "Parameter is used for filtering videos by duration. It can be set to: `short` - Less than 10 minutes `medium` - 10-65 minutes `long` - More than 65 minutes" })),
        hd: Type.Optional(Type.Boolean({ description: "Parameter is used for filtering videos by quality." })),
        within: Type.Optional(Type.Union([Type.Literal("0"), Type.Literal("9"), Type.Literal("7"), Type.Literal("77"), Type.Literal("1"), Type.Literal("2")], { description: "Parameter is used to limit the search results to specific time period. It defaults to `all time`" })),
        p: Type.Optional(Type.Number({ description: "Parameter defines the page number. Pagination starts from `0`, and it can return up to 30 results." })),
        device: Type.Optional(Type.String({ description: "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Yandex Videos results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Yandex Videos search results" }))
      .summary("Yandex Videos")
      .description("Search via Yandex Videos. Real API: GET /search.json?engine=yandex_videos")
      .operationId("searchYandexVideos")
      .tag("Yandex")
      .extension("x-serpapi-engine", "yandex_videos")
      .extension("x-serpapi-real-path", "/search.json")

  })
}

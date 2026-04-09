import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import YoutubeSearchStarWarsExample from "./examples/youtube-search-star-wars.json"

export function registerYouTube(api: Api) {
  api.group("/search", (g) => {
    g.get("/youtube")
      .query(Type.Object({
        search_query: Type.String({ description: "Parameter defines the search query. You can use anything that you would use in a regular YouTube search." }),
        gl: Type.Optional(Type.String({ description: "Parameter defines the country to use for the Google search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more" })),
        hl: Type.Optional(Type.String({ description: "Parameter defines the language to use for the Youtube search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more" })),
        sp: Type.Optional(Type.String({ description: "Parameter can be used for pagination. Youtube uses continuous pagination and the next page token can be found in the SerpApi JSON response serpapi\\_pagination -> next\\_page\\_token and pagination -> next\\_page\\_token fields. Parameter can also be used to filter the search results: by Upload date, you need to set the sp parameter to `CAI%3D` by 4K, you need to set the sp parameter to `EgJwAQ%3D%3D` ... It can also be used for forcing the exact search query spelling by setting the sp value to `QgIIAQ%3D%3D`. If you are interested in passing other filters, you can visit the YouTube website, set filters you want and simply copy sp value from their URL to SerpApi URL." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the YouTube results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Youtube search results" }))
      .summary("Youtube")
      .description("Search via Youtube. Real API: GET /search.json?engine=youtube")
      .operationId("searchYoutube")
      .tag("YouTube")
      .extension("x-serpapi-engine", "youtube")
      .extension("x-serpapi-real-path", "/search.json")
      .example("search-star-wars", { summary: "Youtube example: search star wars", value: YoutubeSearchStarWarsExample })

    g.get("/youtube_video")
      .query(Type.Object({
        v: Type.Optional(Type.String({ description: "Parameter defines the Video ID." })),
        gl: Type.Optional(Type.String({ description: "Parameter defines the country to use for the Youtube video. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more" })),
        hl: Type.Optional(Type.String({ description: "Parameter defines the language to use for the Youtube video. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more" })),
        next_page_token: Type.Optional(Type.String({ description: "Parameter defines the next page token. It is used for retrieving the next page results for related videos, comments or replies. It should be one of - `related_videos_next_page_token` - `comments_next_page_token` - `comments_sorting_token.token` - `replies_next_page_token` from the search results." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the YouTube Video results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Youtube Video search results" }))
      .summary("Youtube Video")
      .description("Search via Youtube Video. Real API: GET /search.json?engine=youtube_video")
      .operationId("searchYoutubeVideo")
      .tag("YouTube")
      .extension("x-serpapi-engine", "youtube_video")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/youtube_video_transcript")
      .query(Type.Object({
        v: Type.String({ description: "Parameter defines the Video ID, it can be found in the URL of the video as `youtu.be/video_id` or `youtube.com/watch?v=video_id`" }),
        language_code: Type.Optional(Type.String({ description: "Parameter defines the language to use for the YouTube video transcript. It accepts a language code, which may be a two-letter or extended code (e.g., `en` for English, `es-ES` for Spanish (Spain), or `zh-Hans` for Simplified Chinese). If no language is provided, the default language will be English (`en`). If the requested language code is not available for the video, the first available language for the transcript will be used instead. Head to the YouTube Video Transcript Languages page for a full list of supported YouTube Video Transcript languages.. Valid values include: ab, aa, af, ak, sq, ase, am, ar, arc, hy, and 202 more" })),
        title: Type.Optional(Type.String({ description: "Parameter is used to get the specific transcript using the transcript title, e.g. `Twitch Chat - Simple`." })),
        type: Type.Optional(Type.Union([Type.Literal("asr")], { description: "Parameter is used to get the transcript type. E.g: `asr` for automatic speech recognition (auto-generated) transcript." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the YouTube Video Transcript results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Youtube Video Transcript search results" }))
      .summary("Youtube Video Transcript")
      .description("Search via Youtube Video Transcript. Real API: GET /search.json?engine=youtube_video_transcript")
      .operationId("searchYoutubeVideoTranscript")
      .tag("YouTube")
      .extension("x-serpapi-engine", "youtube_video_transcript")
      .extension("x-serpapi-real-path", "/search.json")

  })
}

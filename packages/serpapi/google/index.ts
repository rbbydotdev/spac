import { Type } from "@sinclair/typebox";
import type { Api } from "spac";
import GoogleAutocompleteCoffeeExample from "./examples/google-autocomplete-coffee.json";
import GoogleEventsAustinExample from "./examples/google-events-austin.json";
import GoogleFinanceGooglExample from "./examples/google-finance-googl.json";
import GoogleFlightsPekAusExample from "./examples/google-flights-pek-aus.json";
import GoogleHotelsBaliExample from "./examples/google-hotels-bali.json";
import GoogleImagesCoffeeExample from "./examples/google-images-coffee.json";
import GoogleJobsBaristaExample from "./examples/google-jobs-barista.json";
import GoogleLocalCoffeeExample from "./examples/google-local-coffee.json";
import GoogleMapsPizzaExample from "./examples/google-maps-pizza.json";
import GoogleNewsPizzaExample from "./examples/google-news-pizza.json";
import GooglePatentsCoffeeExample from "./examples/google-patents-coffee.json";
import GoogleScholarBiologyExample from "./examples/google-scholar-biology.json";
import GoogleSearchCoffeeExample from "./examples/google-search-coffee.json";
import GoogleShoppingOfficeChairExample from "./examples/google-shopping-office-chair.json";
import GoogleTrendsCoffeeExample from "./examples/google-trends-coffee.json";
import {
  GoogleImagesResponse,
  GoogleMapsResponse,
  GoogleNewsResponse,
  GoogleSearchResponse,
  GoogleShoppingResponse,
} from "./schemas";

export function registerGoogle(api: Api) {
  api.group("/search", (g) => {
    g.get("/google")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. You can use anything that you would use in a regular Google search. e.g. `inurl:`, `site:`, `intitle:`. We also support advanced search query parameters such as as\\_dt and as\\_eq. See the full list of supported advanced search query parameters.",
          }),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy. When only the location parameter is set, Google may still take into account the proxy’s country, which can influence some results. For more consistent country-specific filtering, use the gl parameter alongside location.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          ludocid: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google CID (customer identifier) of a place. This parameter can be found in Google Search API and Google Local API local results under the name of place\\_id, as well as in Google Maps API local results under the name of data\\_cid. You can also acquire it using Google's CID converter.",
            }),
          ),
          lsig: Type.Optional(
            Type.String({
              description:
                "Parameter that you might have to use to force the knowledge graph map view to show up. You can find the lsig ID by using our Local Pack API or Google Local API. lsig ID is also available via a redirect Google uses within Google My Business.",
            }),
          ),
          kgmid: Type.Optional(
            Type.String({
              description:
                "Parameter defines the id (`KGMID`) of the Google Knowledge Graph listing you want to scrape. Also known as Google Knowledge Graph ID. Searches with kgmid parameter will return results for the originally encrypted search parameters. For some searches, kgmid may override all other parameters except start parameter.",
            }),
          ),
          si: Type.Optional(
            Type.String({
              description:
                "Parameter defines the cached search parameters of the Google Search you want to scrape. Searches with si parameter will return results for the originally encrypted search parameters. For some searches, si may override all other parameters except startsi can be used to scrape Google Knowledge Graph Tabs.",
            }),
          ),
          ibp: Type.Optional(
            Type.String({
              description:
                "Parameter is responsible for rendering layouts and expansions for some elements (e.g., `gwp;0,7` to expand searches with `ludocid` for expanded knowledge graph).",
            }),
          ),
          uds: Type.Optional(
            Type.String({
              description:
                "Parameter enables to filter search. It's a string provided by Google as a filter. `uds` values are provided under the section: `filters` with `uds`, `q` and `serpapi_link` values provided for each filter.",
            }),
          ),
          google_domain: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google domain to use. It defaults to `google.com`. Head to the Google domains page for a full list of supported Google domains.. Valid values include: google.com, google.ad, google.ae, google.com.af, google.com.ag, google.com.ai, google.al, google.am, google.co.ao, google.com.ar, and 175 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France). Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          cr: Type.Optional(
            Type.String({
              description:
                "Parameter defines one or multiple countries to limit the search to. It uses `country{two-letter upper-case country code}` to specify countries and `|` as a delimiter. (e.g., `countryFR|countryDE` will only search French and German pages). Head to the Google cr countries page for a full list of supported countries.",
            }),
          ),
          lr: Type.Optional(
            Type.String({
              description:
                "Parameter defines one or multiple languages to limit the search to. It uses `lang_{two-letter language code}` to specify languages and `|` as a delimiter. (e.g., `lang_fr|lang_de` will only search French and German pages). Head to the Google lr languages page for a full list of supported languages.",
            }),
          ),
          as_dt: Type.Optional(
            Type.String({
              description:
                "Parameter controls whether to include or exclude results from the site named in the as\\_sitesearch parameter.",
            }),
          ),
          as_epq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a phrase that all documents in the search results must contain. You can also use the phrase search query term to search for a phrase.",
            }),
          ),
          as_eq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a word or phrase that should not appear in any documents in the search results. You can also use the exclude query term to ensure that a particular word or phrase will not appear in the documents in a set of search results.",
            }),
          ),
          as_lq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should contain a link to a particular URL. You can also use the link: query term for this type of query.",
            }),
          ),
          as_nlo: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the starting value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_nhi: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the ending value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_oq: Type.Optional(
            Type.String({
              description:
                "Parameter provides additional search terms to check for in a document, where each document in the search results must contain at least one of the additional search terms. You can also use the Boolean OR query term for this type of query.",
            }),
          ),
          as_q: Type.Optional(
            Type.String({
              description:
                "Parameter provides search terms to check for in a document. This parameter is also commonly used to allow users to specify additional terms to search for within a set of search results.",
            }),
          ),
          as_qdr: Type.Optional(
            Type.String({
              description:
                "Parameter requests search results from a specified time period (quick date range). The following values are supported: `d[number]`: requests results from the specified number of past days. Example for the past 10 days: `as_qdr=d10` `w[number]`: requests results from the specified number of past weeks. `m[number]`: requests results from the specified number of past months. `y[number]`: requests results from the specified number of past years. Example for the past year: `as_qdr=y`",
            }),
          ),
          as_rq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should be pages that are related to the specified URL. The parameter value should be a URL. You can also use the related: query term for this type of query.",
            }),
          ),
          as_sitesearch: Type.Optional(
            Type.String({
              description:
                "Parameter allows you to specify that all search results should be pages from a given site. By setting the as\\_dt parameter, you can also use it to exclude pages from a given site from your search results.",
            }),
          ),
          tbs: Type.Optional(
            Type.String({
              description:
                "(to be searched) parameter defines advanced search parameters that aren't possible in the regular query field. (e.g., advanced search for patents, dates, news, videos, images, apps, or text contents).",
            }),
          ),
          safe: Type.Optional(
            Type.Union([Type.Literal("active"), Type.Literal("off")], {
              description:
                "Parameter defines the level of filtering for adult content. It can be set to `active` or `off`, by default Google will blur explicit content.",
            }),
          ),
          nfpr: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines the exclusion of results from an auto-corrected query when the original query is spelled wrong. It can be set to `1` to exclude these results, or `0` to include them (default). Note that this parameter may not prevent Google from returning results for an auto-corrected query if no other results are available.",
            }),
          ),
          filter: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines if the filters for 'Similar Results' and 'Omitted Results' are on or off. It can be set to `1` (default) to enable these filters, or `0` to disable these filters.",
            }),
          ),
          tbm: Type.Optional(
            Type.Union(
              [
                Type.Literal("isch"),
                Type.Literal("lcl"),
                Type.Literal("nws"),
                Type.Literal("shop"),
                Type.Literal("vid"),
                Type.Literal("pts"),
              ],
              {
                description:
                  "(to be matched) parameter defines the type of search you want to do. It can be set to: `(no tbm parameter)`: regular Google Search, `isch`: Google Images API, `lcl` - Google Local API `vid`: Google Videos API, `nws`: Google News API, `shop`: Google Shopping API, `pts`: Google Patents API, or any other Google service.",
              },
            ),
          ),
          start: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `10` is the 2nd page of results, `20` is the 3rd page of results, etc.).",
            }),
          ),
          device: Type.Optional(
            Type.String({
              description:
                "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(GoogleSearchResponse)
      .summary("Google")
      .description("Search via Google. Real API: GET /search.json?engine=google")
      .operationId("searchGoogle")
      .tag("Google")
      .extension("x-serpapi-engine", "google")
      .extension("x-serpapi-real-path", "/search.json")
      .example("search-coffee", { summary: "Google example: search coffee", value: GoogleSearchCoffeeExample });

    g.get("/google_about_this_result")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the URL of a website which results you what to show. Value should be formatted in the next order: `About URL` (e.g. `About https://www.starbucks.com/`)",
          }),
          google_domain: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google domain to use. It defaults to `google.com`. Head to the Google domains page for a full list of supported Google domains.. Valid values include: google.com, google.ad, google.ae, google.com.af, google.com.ag, google.com.ai, google.al, google.am, google.co.ao, google.com.ar, and 175 more",
            }),
          ),
          ilps: Type.Optional(
            Type.String({ description: "Parameter defines unique ID of a website which results you what to show." }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google About This Result results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google About This Result search results" }))
      .summary("Google About This Result")
      .description("Search via Google About This Result. Real API: GET /search.json?engine=google_about_this_result")
      .operationId("searchGoogleAboutThisResult")
      .tag("Google")
      .extension("x-serpapi-engine", "google_about_this_result")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_ads_transparency_center")
      .query(
        Type.Object({
          advertiser_id: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google Advertiser ID. It can be found in the Ads Transparency Center advertiser URL. For example, the advertiser ID for the URL `https://adstransparency.google.com/advertiser/AR17828074650563772417` is `AR17828074650563772417`(Tesla Inc). It accepts either a single ID or multiple IDs separated by commas (`,`). Example, Single ID: `AR17828074650563772417` Multiple IDs: `AR17828074650563772417,AR03911981557522366465,...` Alternatively, text can be used for free-text search.",
            }),
          ),
          text: Type.Optional(
            Type.String({
              description:
                "Parameter defines the text you want to search, typically related to a domain search within the context of Google Ads. You can use anything that you would normally use in a standard Google Ads Transparency Center search. It can be used as an alternative to advertiser\\_id. The advertiser\\_id can be optional when text is present.",
            }),
          ),
          platform: Type.Optional(
            Type.Union(
              [
                Type.Literal("PLAY"),
                Type.Literal("MAPS"),
                Type.Literal("SEARCH"),
                Type.Literal("SHOPPING"),
                Type.Literal("YOUTUBE"),
              ],
              {
                description:
                  "Parameter defines the target platform where ads are displayed. When not set, it will return results from all platforms (default). Available options: `PLAY` - Google Play `MAPS` - Google Maps `SEARCH` - Google Search `SHOPPING` - Google Shopping `YOUTUBE` - YouTube.",
              },
            ),
          ),
          political_ads: Type.Optional(
            Type.Boolean({
              description:
                "The parameter determine if the advertiser promotes political advertisement. Political advertisement is a different category than regular advertisements, and will not appear on the results unless this parameter is set to `true`. If this parameter is set to `true`, only political advertisements will appear on the results. By default it is `false`. This parameter can only be used alongside with the `region` parameter.",
            }),
          ),
          region: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. By default it search results from anywhere. Head to the Google Ads Transparency Center Regions for a full list of supported regions.",
            }),
          ),
          start_date: Type.Optional(
            Type.String({
              description:
                "Parameter defines the start date for which you want the search results to begin. The format for this field is `YYYYMMDD`. Example: `20221201`",
            }),
          ),
          end_date: Type.Optional(
            Type.String({
              description:
                "Parameter defines the end date for which you want the search results to conclude. The format for this field is `YYYYMMDD`. Example: `20221231` To set the date for **Today / Single Day**, you should set end\\_date as start\\_date + `1 day`.",
            }),
          ),
          creative_format: Type.Optional(
            Type.String({
              description:
                "Parameter defines the format you want to filter by. Only search results with a similar format will be returned. Available options: `text` - Text `image` - Image `video` - Video",
            }),
          ),
          num: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the maximum number of results to return. (e.g., `40` (default) returns `40` results and `100` returns `100` results).",
            }),
          ),
          next_page_token: Type.Optional(
            Type.String({
              description: "Parameter defines the next page token. It is used for retrieving the next page results.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Ads Transparency Center results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Ads Transparency Center search results" }))
      .summary("Google Ads Transparency Center")
      .description(
        "Search via Google Ads Transparency Center. Real API: GET /search.json?engine=google_ads_transparency_center",
      )
      .operationId("searchGoogleAdsTransparencyCenter")
      .tag("Google")
      .extension("x-serpapi-engine", "google_ads_transparency_center")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_ads_transparency_center_ad_details")
      .query(
        Type.Object({
          advertiser_id: Type.String({
            description:
              "Parameter defines the Google Advertiser ID. It can be found in the Ads Transparency Center advertiser URL. For example, the advertiser ID for the URL `https://adstransparency.google.com/advertiser/AR17828074650563772417` is `AR17828074650563772417`(Tesla Inc).",
          }),
          creative_id: Type.String({
            description:
              "Parameter defines the Google Creative ID. It can be found in the Ads Transparency Center creative URL. For example, the creative ID for the URL `https://adstransparency.google.com/advertiser/AR17828074650563772417/creative/CR07110512387970564097` is `CR07110512387970564097`.",
          }),
          region: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. By default it finds results from anywhere. Head to the Google Ads Transparency Center Regions for a full list of supported regions.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Ads Transparency Center Ad Details results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Ads Transparency Center Ad Details search results" }))
      .summary("Google Ads Transparency Center Ad Details")
      .description(
        "Search via Google Ads Transparency Center Ad Details. Real API: GET /search.json?engine=google_ads_transparency_center_ad_details",
      )
      .operationId("searchGoogleAdsTransparencyCenterAdDetails")
      .tag("Google")
      .extension("x-serpapi-engine", "google_ads_transparency_center_ad_details")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_ai_mode")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. You can use anything that you would use in a regular Google AI Mode search. Google AI Mode may support multiple languages (including **English**), though not all are available yet.",
          }),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France). Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          subsequent_request_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the token used to continue a Google AI Mode conversation. Pass this token to send a follow-up question that includes the prior exchange as context (multi-turn). The token is returned by SerpApi from your previous request using our Google AI Mode API. When using this token, include a new q for your follow-up prompt. For consistent behavior, reuse the same localization settings (gl, hl, and location) you used to obtain the token.",
            }),
          ),
          device: Type.Optional(
            Type.String({
              description:
                "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Ai Mode results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Ai Mode search results" }))
      .summary("Google Ai Mode")
      .description("Search via Google Ai Mode. Real API: GET /search.json?engine=google_ai_mode")
      .operationId("searchGoogleAiMode")
      .tag("Google")
      .extension("x-serpapi-engine", "google_ai_mode")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_ai_overview")
      .query(
        Type.Object({
          page_token: Type.String({
            description:
              "Parameter defines the token to fetch the AI Overview from. Use `ai_overview.page_token` from the AI Overview Results section of our Google Search API — see the extra request example. `ai_overview.page_token` **expires within 1 minute** of the search and should be used immediately.",
          }),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google AI Overview results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Ai Overview search results" }))
      .summary("Google Ai Overview")
      .description("Search via Google Ai Overview. Real API: GET /search.json?engine=google_ai_overview")
      .operationId("searchGoogleAiOverview")
      .tag("Google")
      .extension("x-serpapi-engine", "google_ai_overview")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_autocomplete")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the search query. A query that would be used to provide completion options.",
          }),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Autocomplete search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          cp: Type.Optional(
            Type.String({
              description:
                "Cursor pointer defines the position of cursor for the query provided, position starts from 0 which is a case where cursor is placed before the query `|query`. If not provided acts as cursor is placed in the end of query `query|`.",
            }),
          ),
          client: Type.Optional(
            Type.Union(
              [
                Type.Literal("chrome"),
                Type.Literal("chrome-omni"),
                Type.Literal("gws-wiz"),
                Type.Literal("safari"),
                Type.Literal("firefox"),
                Type.Literal("psy-ab"),
                Type.Literal("toolbar"),
                Type.Literal("youtube"),
                Type.Literal("gws-wiz-local"),
              ],
              { description: "Parameter used to define client for autocomplete. List of supported clients." },
            ),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Autocomplete results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Autocomplete search results" }))
      .summary("Google Autocomplete")
      .description("Search via Google Autocomplete. Real API: GET /search.json?engine=google_autocomplete")
      .operationId("searchGoogleAutocomplete")
      .tag("Google")
      .extension("x-serpapi-engine", "google_autocomplete")
      .extension("x-serpapi-real-path", "/search.json")
      .example("coffee", { summary: "Google Autocomplete example: coffee", value: GoogleAutocompleteCoffeeExample });

    g.get("/google_events")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. To search for events in a specific location, just include the location inside your search query (e.g. `Events in Austin, TX`).",
          }),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Events search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France). Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Events search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          start: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `10` is the 2nd page of results, `20` is the 3rd page of results, etc.).",
            }),
          ),
          htichips: Type.Optional(
            Type.String({
              description:
                "Parameter allows the use of different filters. `date:today` - Today's Events `date:tomorrow` - Tomorrow's Events `date:week` - This Week's Events `date:today` - Today's Weekend's Events `date:next_week` - Next Week's Events `date:month` - This Month's Events `date:next_month` - Next Month's Events `event_type:Virtual-Event` - Online Events You can also mix different kinds of filters by separating them with a comma. `event_type:Virtual-Event,date:today` Today's Online Events",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Events results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Events search results" }))
      .summary("Google Events")
      .description("Search via Google Events. Real API: GET /search.json?engine=google_events")
      .operationId("searchGoogleEvents")
      .tag("Google")
      .extension("x-serpapi-engine", "google_events")
      .extension("x-serpapi-real-path", "/search.json")
      .example("austin", { summary: "Google Events example: austin", value: GoogleEventsAustinExample });

    g.get("/google_finance")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. It can be a stock, index, mutual fund, currency or futures.",
          }),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Finance search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          window: Type.Optional(
            Type.String({
              description:
                "Parameter is used for setting time range for the graph. It can be set to: `1D` - 1 Day(default) `5D` - 5 Days `1M` - 1 Month `6M` - 6 Months `YTD` - Year to Date `1Y` - 1 Year `5Y` - 5 Years `MAX` - Maximum",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Finance results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Finance search results" }))
      .summary("Google Finance")
      .description("Search via Google Finance. Real API: GET /search.json?engine=google_finance")
      .operationId("searchGoogleFinance")
      .tag("Google")
      .extension("x-serpapi-engine", "google_finance")
      .extension("x-serpapi-real-path", "/search.json")
      .example("googl", { summary: "Google Finance example: googl", value: GoogleFinanceGooglExample });

    g.get("/google_finance_markets")
      .query(
        Type.Object({
          trend: Type.Union(
            [
              Type.Literal("indexes"),
              Type.Literal("most-active"),
              Type.Literal("gainers"),
              Type.Literal("losers"),
              Type.Literal("climate-leaders"),
              Type.Literal("cryptocurrencies"),
              Type.Literal("currencies"),
            ],
            {
              description:
                "Parameter is used for retrieving different market trends. Available options: `indexes` - Market indexes `most-active` - Most active `gainers` - Gainers `losers` - Losers `climate-leaders` - Climate leaders `cryptocurrencies` - Crypto `currencies` - Currencies",
            },
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Finance Markets search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Finance Markets search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France). Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          index_market: Type.Optional(
            Type.Union(
              [Type.Literal("americas"), Type.Literal("europe-middle-east-africa"), Type.Literal("asia-pacific")],
              {
                description:
                  "Parameter is used for expanding market indexes by region and retrieving more results. Available options: `americas` - Americas `europe-middle-east-africa` - Europe, Middle East, and Africa `asia-pacific` - Asia Pacific Parameter can be used only when trend parameter is set to: `indexes`.",
              },
            ),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Finance Markets results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Finance Markets search results" }))
      .summary("Google Finance Markets")
      .description("Search via Google Finance Markets. Real API: GET /search.json?engine=google_finance_markets")
      .operationId("searchGoogleFinanceMarkets")
      .tag("Google")
      .extension("x-serpapi-engine", "google_finance_markets")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_flights")
      .query(
        Type.Object({
          departure_id: Type.Optional(
            Type.String({
              description:
                'Parameter defines the departure airport code or location kgmid. An airport code is an uppercase 3-letter code. You can search for it on Google Flights or IATA. For example, `CDG` is Paris Charles de Gaulle Airport and `AUS` is Austin-Bergstrom International Airport. A location kgmid is a string that starts with `/m/`. You can search for a location on Wikidata and use its "Freebase ID" as the location kgmid. For example, `/m/0vzm` is the location kgmid for Austin, TX. You can specify multiple departure airports by separating them with a comma. For example, `CDG,ORY,/m/04jpl`.',
            }),
          ),
          arrival_id: Type.Optional(
            Type.String({
              description:
                'Parameter defines the arrival airport code or location kgmid. An airport code is an uppercase 3-letter code. You can search for it on Google Flights or IATA. For example, `CDG` is Paris Charles de Gaulle Airport and `AUS` is Austin-Bergstrom International Airport. A location kgmid is a string that starts with `/m/`. You can search for a location on Wikidata and use its "Freebase ID" as the location kgmid. For example, `/m/0vzm` is the location kgmid for Austin, TX. You can specify multiple arrival airports by separating them with a comma. For example, `CDG,ORY,/m/04jpl`.',
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Flights search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Flights search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          currency: Type.Optional(
            Type.String({
              description:
                "Parameter defines the currency of the returned prices. Default to `USD`. Head to the Google Travel Currencies page for a full list of supported currency codes.. Valid values include: ALL, DZD, ARS, AMD, AWG, AUD, AZN, BSD, BHD, BYN, and 61 more",
            }),
          ),
          type: Type.Optional(
            Type.Union([Type.Literal("1"), Type.Literal("2"), Type.Literal("3")], {
              description:
                "Parameter defines the type of the flights. Available options: `1` - Round trip (default) `2` - One way `3` - Multi-city When this parameter is set to `3`, use multi\\_city\\_json to set the flight information. To obtain the returning flight information for Round Trip `(1)`, you need to make another request using a departure\\_token.",
            }),
          ),
          outbound_date: Type.Optional(
            Type.String({
              description: "Parameter defines the outbound date. The format is YYYY-MM-DD. e.g. `2026-01-15`",
            }),
          ),
          return_date: Type.Optional(
            Type.String({
              description:
                "Parameter defines the return date. The format is YYYY-MM-DD. e.g. `2026-01-21` Parameter is required if type parameter is set to: `1` (Round trip)",
            }),
          ),
          travel_class: Type.Optional(
            Type.Union([Type.Literal(1), Type.Literal(2), Type.Literal(3), Type.Literal(4)], {
              description:
                "Parameter defines the travel class. Available options: `1` - Economy (default) `2` - Premium economy `3` - Business `4` - First",
            }),
          ),
          multi_city_json: Type.Optional(
            Type.String({
              description:
                'Parameter defines the flight information for multi-city flights. It\'s a JSON string containing multiple flight information objects. Each object should contain the following fields: `departure_id` - The departure airport code or location kgmid. The format is the same as the main departure\\_id parameter. `arrival_id` - The arrival airport code or location kgmid. The format is the same as the main arrival\\_id parameter. `date` - Flight date. The format is the same as the outbound\\_date parameter. `times` - Time range for the flight. The format is the same as the outbound\\_times parameter. This parameter is optional. Example: `[{"departure_id":"CDG","arrival_id":"NRT","date":"2026-01-21"},{"departure_id":"NRT","arrival_id":"LAX,SEA","date":"2026-01-28"},{"departure_id":"LAX,SEA","arrival_id":"AUS","date":"2026-02-04","times":"8,18,9,23"}]` The example is a multi-city flight from `CDG` to `NRT` on `2026-01-21`, then from `NRT` to `LAX` or `SEA` on `2026-01-28`, and finally from `LAX` or `SEA` to `AUS` on `2026-02-04`. The last flight has a departure time range from 8:00 AM to 7:00 PM and an arrival time range from 9:00 AM to 12:00 AM (Midnight).',
            }),
          ),
          show_hidden: Type.Optional(
            Type.Boolean({ description: "Set to `true` to include the hidden flight results. Default to `false`." }),
          ),
          exclude_basic: Type.Optional(
            Type.Boolean({
              description:
                "Set to `true` to exclude basic results. Resulting fares will have free seat selection and carry on bags. Default to `false`. As of now, this filter only works for domestic flights in the US. Parameter can only be used when gl is`us` and travel\\_class is`1`",
            }),
          ),
          deep_search: Type.Optional(
            Type.Boolean({
              description:
                "Set to `true` to enable deep search, which may yield better results but with a longer response time. Deep search results are identical to those found on Google Flights pages in the browser. By default, this option is set to `false` for performance reasons.",
            }),
          ),
          adults: Type.Optional(Type.Number({ description: "Parameter defines the number of adults. Default to 1." })),
          children: Type.Optional(
            Type.Number({ description: "Parameter defines the number of children. Default to 0." }),
          ),
          infants_in_seat: Type.Optional(
            Type.Number({ description: "Parameter defines the number of infants in seat. Default to 0." }),
          ),
          infants_on_lap: Type.Optional(
            Type.Number({ description: "Parameter defines the number of infants on lap. Default to 0." }),
          ),
          sort_by: Type.Optional(
            Type.Union(
              [
                Type.Literal("1"),
                Type.Literal("2"),
                Type.Literal("3"),
                Type.Literal("4"),
                Type.Literal("5"),
                Type.Literal("6"),
              ],
              {
                description:
                  "Parameter defines the sorting order of the results. Available options: `1` - Top flights (default) `2` - Price `3` - Departure time `4` - Arrival time `5` - Duration `6` - Emissions",
              },
            ),
          ),
          stops: Type.Optional(
            Type.Union([Type.Literal(0), Type.Literal(1), Type.Literal(2), Type.Literal(3)], {
              description:
                "Parameter defines the number of stops during the flight. Available options: `0` - Any number of stops (default) `1` - Nonstop only `2` - 1 stop or fewer `3` - 2 stops or fewer",
            }),
          ),
          exclude_airlines: Type.Optional(
            Type.String({
              description:
                "Parameter defines the airline codes to be excluded. Split multiple airlines with comma. It can't be used together with `include_airlines`. Each airline code should be a 2-character IATA code consisting of either two uppercase letters or one uppercase letter and one digit. You can search for airline codes on IATA. For example, `UA` is United Airlines. Additionally, alliances can be also included here: `STAR_ALLIANCE` - Star Alliance `SKYTEAM` - SkyTeam `ONEWORLD` - Oneworld exclude\\_airlines and include\\_airlines parameters can't be used together.",
            }),
          ),
          include_airlines: Type.Optional(
            Type.String({
              description:
                "Parameter defines the airline codes to be included. Split multiple airlines with comma. It can't be used together with `exclude_airlines`. Each airline code should be a 2-character IATA code consisting of either two uppercase letters or one uppercase letter and one digit. You can search for airline codes on IATA. For example, `UA` is United Airlines. Additionally, alliances can be also included here: `STAR_ALLIANCE` - Star Alliance `SKYTEAM` - SkyTeam `ONEWORLD` - Oneworld exclude\\_airlines and include\\_airlines parameters can't be used together.",
            }),
          ),
          bags: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the number of carry-on bags. Default to `0`. Parameter should not exceed the total number of passengers with carry-on bag allowance (adults, children and infants\\_in\\_seat).",
            }),
          ),
          max_price: Type.Optional(
            Type.Number({ description: "Parameter defines the maximum ticket price. Default to unlimited." }),
          ),
          outbound_times: Type.Optional(
            Type.String({
              description:
                "Parameter defines the outbound times range. It's a string containing two (for departure only) or four (for departure and arrival) comma-separated numbers. Each number represents the beginning of an hour. For example: `4,18`: 4:00 AM - 7:00 PM departure `0,18`: 12:00 AM - 7:00 PM departure `19,23`: 7:00 PM - 12:00 AM departure `4,18,3,19`: 4:00 AM - 7:00 PM departure, 3:00 AM - 8:00 PM arrival `0,23,3,19`: unrestricted departure, 3:00 AM - 8:00 PM arrival",
            }),
          ),
          return_times: Type.Optional(
            Type.String({
              description:
                "Parameter defines the return times range. It's a string containing two (for departure only) or four (for departure and arrival) comma-separated numbers. Each number represents the beginning of an hour. For example: `4,18`: 4:00 AM - 7:00 PM departure `0,18`: 12:00 AM - 7:00 PM departure `19,23`: 7:00 PM - 12:00 AM departure `4,18,3,19`: 4:00 AM - 7:00 PM departure, 3:00 AM - 8:00 PM arrival `0,23,3,19`: unrestricted departure, 3:00 AM - 8:00 PM arrival Parameter should only be used when type parameter is set to: `1` (Round trip)",
            }),
          ),
          emissions: Type.Optional(
            Type.Union([Type.Literal(1)], {
              description:
                "Parameter defines the emission level of the flight. Available options: `1` - Less emissions only",
            }),
          ),
          layover_duration: Type.Optional(
            Type.String({
              description:
                "Parameter defines the layover duration, in minutes. It's a string containing two comma-separated numbers. For example, specify `90,330` for 1 hr 30 min - 5 hr 30 min.",
            }),
          ),
          exclude_conns: Type.Optional(
            Type.String({
              description:
                "Parameter defines the connecting airport codes to be excluded. An airport ID is an uppercase 3-letter code. You can search for it on Google Flights or IATA. For example, `CDG` is Paris Charles de Gaulle Airport and `AUS` is Austin-Bergstrom International Airport. You can also combine multiple Airports by joining them with a comma (`value` + `,` + `value`; eg: `CDG,AUS`).",
            }),
          ),
          max_duration: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the maximum flight duration, in minutes. For example, specify `1500` for 25 hours.",
            }),
          ),
          departure_token: Type.Optional(
            Type.String({
              description:
                "Parameter is used to select the flight and get returning flights (for Round trip) or flights for the next leg of itinerary (for Multi-city). Find this token in the departure flight results. It cannot be used together with booking\\_token.",
            }),
          ),
          booking_token: Type.Optional(
            Type.String({
              description:
                'Parameter is used to get booking options for the selected flights. Find this token in the flight results. It cannot be used together with departure\\_token. When using this token, parameters related to date and parameters inside "Advanced Filters" section won\'t affect the result.',
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Flights results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Flights search results" }))
      .summary("Google Flights")
      .description("Search via Google Flights. Real API: GET /search.json?engine=google_flights")
      .operationId("searchGoogleFlights")
      .tag("Google")
      .extension("x-serpapi-engine", "google_flights")
      .extension("x-serpapi-real-path", "/search.json")
      .example("pek-aus", { summary: "Google Flights example: pek aus", value: GoogleFlightsPekAusExample });

    g.get("/google_flights_autocomplete")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the search query. A query that would be used to provide completion options.",
          }),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Flights Autocomplete search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Flights Autocomplete search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          exclude_regions: Type.Optional(
            Type.Boolean({
              description:
                "Set to `true` to exclude region-level locations from suggestions. Regions include countries, sub-national regions, and multi-country areas (e.g. South Korea, South East England, South East Asia). Default to `false`.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Flights Autocomplete results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Flights Autocomplete search results" }))
      .summary("Google Flights Autocomplete")
      .description(
        "Search via Google Flights Autocomplete. Real API: GET /search.json?engine=google_flights_autocomplete",
      )
      .operationId("searchGoogleFlightsAutocomplete")
      .tag("Google")
      .extension("x-serpapi-engine", "google_flights_autocomplete")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_forums")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. To search for events in a specific location, just include the location inside your search query (e.g. `Events in Austin, TX`).",
          }),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Forums search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France). Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Forums search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          start: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `10` is the 2nd page of results, `20` is the 3rd page of results, etc.).",
            }),
          ),
          nfpr: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines the exclusion of results from an auto-corrected query when the original query is spelled wrong. It can be set to `1` to exclude these results, or `0` to include them (default). Note that this parameter may not prevent Google from returning results for an auto-corrected query if no other results are available.",
            }),
          ),
          filter: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines if the filters for 'Similar Results' and 'Omitted Results' are on or off. It can be set to `1` (default) to enable these filters, or `0` to disable these filters.",
            }),
          ),
          device: Type.Optional(
            Type.String({
              description:
                "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Forums results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Forums search results" }))
      .summary("Google Forums")
      .description("Search via Google Forums. Real API: GET /search.json?engine=google_forums")
      .operationId("searchGoogleForums")
      .tag("Google")
      .extension("x-serpapi-engine", "google_forums")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_hotels")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the search query. You can use anything that you would use in a regular Google Hotels search.",
          }),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Hotels search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Hotels search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          currency: Type.Optional(
            Type.String({
              description:
                "Parameter defines the currency of the returned prices. Default to `USD`. Head to the Google Travel Currencies page for a full list of supported currency codes.. Valid values include: ALL, DZD, ARS, AMD, AWG, AUD, AZN, BSD, BHD, BYN, and 61 more",
            }),
          ),
          check_in_date: Type.String({
            description: "Parameter defines the check-in date. The format is **YYYY-MM-DD**. e.g. `2026-01-15`",
          }),
          check_out_date: Type.String({
            description: "Parameter defines the check-out date. The format is **YYYY-MM-DD**. e.g. `2026-01-16`",
          }),
          adults: Type.Optional(
            Type.Number({ description: "Parameter defines the number of adults. Default to `2`." }),
          ),
          children: Type.Optional(
            Type.Number({ description: "Parameter defines the number of children. Default to `0`." }),
          ),
          children_ages: Type.Optional(
            Type.String({
              description:
                "Parameter defines the ages of children. The age range is from `1` to `17`, with children who haven't reached 1 year old being considered as `1`. Example for single child only: `5` Example for multiple children (separated by comma `,`): `5,8,10`",
            }),
          ),
          sort_by: Type.Optional(
            Type.Union([Type.Literal("3"), Type.Literal("8"), Type.Literal("13")], {
              description:
                "Parameter is used for sorting the results. Default is sort by `Relevance`. Available options: `3` - Lowest price `8` - Highest rating `13` - Most reviewed",
            }),
          ),
          min_price: Type.Optional(Type.Number({ description: "Parameter defines the lower bound of price range." })),
          max_price: Type.Optional(Type.Number({ description: "Parameter defines the upper bound of price range." })),
          property_types: Type.Optional(
            Type.String({
              description:
                "Parameter defines to include only certain type of property in the results. Head to the Google Hotels Property Types page for a full list of supported **Hotels** property types. For Vacation Rentals, please refer to the Google Vacation Rentals Property Types page for a full list of supported **Vacation Rentals** property types. Example for single property type only: `17` Example for multiple property types (separated by comma `,`): `17,12,18`",
            }),
          ),
          amenities: Type.Optional(
            Type.String({
              description:
                "Parameter defines to include only results that offer specified amenities. Head to the Google Hotels Amenities page for a full list of supported **Hotels** amenities. For Vacation Rentals, please refer to the Google Vacation Rentals Amenities page for a full list of supported **Vacation Rentals** amenities. Example for single amenity only: `35` Example for multiple amenities (separated by comma `,`): `35,9,19`",
            }),
          ),
          rating: Type.Optional(
            Type.Union([Type.Literal("7"), Type.Literal("8"), Type.Literal("9")], {
              description:
                "Parameter is used for filtering the results to certain rating. Available options: `7` - 3.5+ `8` - 4.0+ `9` - 4.5+",
            }),
          ),
          brands: Type.Optional(
            Type.String({
              description:
                "Parameter defines the brands where you want your search to be concentrated. ID values are accessible inside `brands` array, located in our JSON output (e.g. `brands[0].id`). Example for single brand only: `33` Example for multiple brands (separated by comma `,`): `33,67,101`",
            }),
          ),
          hotel_class: Type.Optional(
            Type.String({
              description:
                "Parameter defines to include only certain hotel class in the results. Available options: `2` - 2-star `3` - 3-star `4` - 4-star `5` - 5-star Example for single hotel class only: `2` Example for multiple hotel class (separated by comma `,`): `2,3,4`",
            }),
          ),
          free_cancellation: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines to show results that offer free cancellation. This parameter isn't available for Vacation Rentals.",
            }),
          ),
          special_offers: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines to show results that have special offers. This parameter isn't available for Vacation Rentals.",
            }),
          ),
          eco_certified: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines to show results that are eco certified. This parameter isn't available for Vacation Rentals.",
            }),
          ),
          vacation_rentals: Type.Optional(
            Type.Boolean({
              description: "Parameter defines to search for Vacation Rentals results. Default search is for Hotels.",
            }),
          ),
          bedrooms: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the minimum number of bedrooms. Default to `0`. This parameter only available for Vacation Rentals.",
            }),
          ),
          bathrooms: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the minimum number of bathrooms. Default to `0`. This parameter only available for Vacation Rentals.",
            }),
          ),
          next_page_token: Type.Optional(
            Type.String({
              description: "Parameter defines the next page token. It is used for retrieving the next page results.",
            }),
          ),
          property_token: Type.Optional(
            Type.String({
              description:
                "Parameter is used to get property details which consists of name, address, phone, prices, nearby places, and etc. You can find property\\_token from Google Hotels Properties API.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Hotels results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Hotels search results" }))
      .summary("Google Hotels")
      .description("Search via Google Hotels. Real API: GET /search.json?engine=google_hotels")
      .operationId("searchGoogleHotels")
      .tag("Google")
      .extension("x-serpapi-engine", "google_hotels")
      .extension("x-serpapi-real-path", "/search.json")
      .example("bali", { summary: "Google Hotels example: bali", value: GoogleHotelsBaliExample });

    g.get("/google_hotels_autocomplete")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the search query. A query that would be used to provide completion options.",
          }),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Hotels Autocomplete search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Hotels Autocomplete search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          currency: Type.Optional(
            Type.String({
              description:
                "Parameter defines the currency used in `serpapi_google_hotels_link`. Default value is `USD`. Head to the Google Travel Currencies page for a full list of supported currency codes.. Valid values include: ALL, DZD, ARS, AMD, AWG, AUD, AZN, BSD, BHD, BYN, and 61 more",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Hotels Autocomplete results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Hotels Autocomplete search results" }))
      .summary("Google Hotels Autocomplete")
      .description(
        "Search via Google Hotels Autocomplete. Real API: GET /search.json?engine=google_hotels_autocomplete",
      )
      .operationId("searchGoogleHotelsAutocomplete")
      .tag("Google")
      .extension("x-serpapi-engine", "google_hotels_autocomplete")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_hotels_reviews")
      .query(
        Type.Object({
          property_token: Type.String({
            description:
              "Parameter defines the sepcific property. You can find property\\_token from Google Hotels Properties API.",
          }),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Hotels search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          category_token: Type.Optional(
            Type.String({
              description:
                "Parameter is used to get reviews filtered by a specific category. You can find category\\_token from Google Hotels API under reviews\\_breakdown.",
            }),
          ),
          sort_by: Type.Optional(
            Type.Union([Type.Literal("1"), Type.Literal("2"), Type.Literal("3"), Type.Literal("4")], {
              description:
                "Parameter defines the sorting order of the reviews. Available options: `1` - Most helpful (Default) `2` - Most recent `3` - Highest score `4` - Lowest score",
            }),
          ),
          source_number: Type.Optional(
            Type.Number({
              description:
                "Parameter filter the reviews based on their originating source. Standard options (always availbable): `0` - All reviews (Default) `-1` - Google For property-specific source numbers, refer to the other\\_reviews field in Google Hotels Property Details API. Available sources vary by property.",
            }),
          ),
          next_page_token: Type.Optional(
            Type.String({
              description: "Parameter defines the next page token. It is used for retrieving the next page results.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Hotels results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Hotels Reviews search results" }))
      .summary("Google Hotels Reviews")
      .description("Search via Google Hotels Reviews. Real API: GET /search.json?engine=google_hotels_reviews")
      .operationId("searchGoogleHotelsReviews")
      .tag("Google")
      .extension("x-serpapi-engine", "google_hotels_reviews")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_images")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. You can use anything that you would use in a regular Google Images search. e.g. `inurl:`, `site:`, `intitle:`.",
          }),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          google_domain: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google domain to use. It defaults to `google.com`. Head to the Google domains for a full list of supported Google domains.. Valid values include: google.com, google.ad, google.ae, google.com.af, google.com.ag, google.com.ai, google.al, google.am, google.co.ao, google.com.ar, and 175 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Images search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google countries for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Images search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French) Head to the Google languages for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          cr: Type.Optional(
            Type.String({
              description:
                "Parameter defines one or multiple countries to limit the search to. It uses `country{two-letter upper-case country code}` to specify countries and `|` as a delimiter. (e.g., `countryFR|countryDE` will only search French and German pages). Head to the Google cr countries page for a full list of supported countries.",
            }),
          ),
          as_dt: Type.Optional(
            Type.String({
              description:
                "Parameter controls whether to include or exclude results from the site named in the as\\_sitesearch parameter.",
            }),
          ),
          as_epq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a phrase that all documents in the search results must contain. You can also use the phrase search query term to search for a phrase.",
            }),
          ),
          as_eq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a word or phrase that should not appear in any documents in the search results. You can also use the exclude query term to ensure that a particular word or phrase will not appear in the documents in a set of search results.",
            }),
          ),
          as_lq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should contain a link to a particular URL. You can also use the link: query term for this type of query.",
            }),
          ),
          as_nlo: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the starting value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_nhi: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the ending value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_oq: Type.Optional(
            Type.String({
              description:
                "Parameter provides additional search terms to check for in a document, where each document in the search results must contain at least one of the additional search terms. You can also use the Boolean OR query term for this type of query.",
            }),
          ),
          as_q: Type.Optional(
            Type.String({
              description:
                "Parameter provides search terms to check for in a document. This parameter is also commonly used to allow users to specify additional terms to search for within a set of search results.",
            }),
          ),
          as_qdr: Type.Optional(
            Type.String({
              description:
                "Parameter requests search results from a specified time period (quick date range). The following values are supported: `d[number]`: requests results from the specified number of past days. Example for the past 10 days: `as_qdr=d10` `w[number]`: requests results from the specified number of past weeks. `m[number]`: requests results from the specified number of past months. `y[number]`: requests results from the specified number of past years. Example for the past year: `as_qdr=y`",
            }),
          ),
          as_rq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should be pages that are related to the specified URL. The parameter value should be a URL. You can also use the related: query term for this type of query.",
            }),
          ),
          as_sitesearch: Type.Optional(
            Type.String({
              description:
                "Parameter allows you to specify that all search results should be pages from a given site. By setting the as\\_dt parameter, you can also use it to exclude pages from a given site from your search results.",
            }),
          ),
          period_unit: Type.Optional(
            Type.Union(
              [
                Type.Literal("s"),
                Type.Literal("n"),
                Type.Literal("h"),
                Type.Literal("d"),
                Type.Literal("w"),
                Type.Literal("m"),
                Type.Literal("y"),
              ],
              {
                description:
                  "Parameter defines the time period unit to search for the recent images, e.g. from past minute, hour, day etc. Options: `s` - Second `n` - Minute `h` - Hour `d` - Day `w` - Week `m` - Month `y` - Year This parameter can't be used with `start_date`/`end_date` parameters. This parameter overrides `qdr` component of `tbs` parameter.",
              },
            ),
          ),
          period_value: Type.Optional(
            Type.Number({
              description:
                "Parameter defines an optional time period value that can be used with `period_unit` to describe time periods like `15 seconds`, `42 hours`, `178 days` etc. Default value: `1` Value range: `1..2147483647`",
            }),
          ),
          start_date: Type.Optional(
            Type.String({
              description:
                "Parameter defines the start date of time period you want to limit the image search to. Format: `YYYYMMDD` Example: `20241201` This parameter can't be used with `period_unit`/`period_value` parameters. `start_date` with blank `end_date` produces date range `FROM start_date TO today`. This parameter overrides `cdr` and `cd_min` components of `tbs` parameter.",
            }),
          ),
          end_date: Type.Optional(
            Type.String({
              description:
                "Parameter defines the end date of time period you want to limit the image search to. Format: `YYYYMMDD` Example: `20241231` This parameter can't be used with `period_unit`/`period_value` parameters. `end_date` with blank `start_date` produces date range `BEFORE end_date`. This parameter overrides `cdr` and `cd_max` components of `tbs` parameter.",
            }),
          ),
          chips: Type.Optional(
            Type.String({
              description:
                "Parameter enables to filter image search. It's a string provided by Google as suggested search, like: red apple. Chips are provided under the section: `suggested_searches` when `ijn = 0`. Both `chips` and `serpapi_link` values are provided for each suggested search.",
            }),
          ),
          tbs: Type.Optional(
            Type.String({
              description:
                "(to be searched) parameter defines advanced search parameters that aren't possible in the regular query field.",
            }),
          ),
          imgar: Type.Optional(
            Type.Union([Type.Literal("s"), Type.Literal("t"), Type.Literal("w"), Type.Literal("xw")], {
              description:
                "Parameter defines the set aspect ratio of images. Options: `s` - Square `t` - Tall `w` - Wide `xw` - Panoramic",
            }),
          ),
          imgsz: Type.Optional(
            Type.Union(
              [
                Type.Literal("l"),
                Type.Literal("m"),
                Type.Literal("i"),
                Type.Literal("qsvga"),
                Type.Literal("vga"),
                Type.Literal("svga"),
                Type.Literal("xga"),
                Type.Literal("2mp"),
                Type.Literal("4mp"),
                Type.Literal("6mp"),
                Type.Literal("8mp"),
                Type.Literal("10mp"),
                Type.Literal("12mp"),
                Type.Literal("15mp"),
                Type.Literal("20mp"),
                Type.Literal("40mp"),
                Type.Literal("70mp"),
              ],
              {
                description:
                  "Parameter defines the size of images. Options: `l` - Large `m` - Medium `i` - Icon `qsvga` - Larger than 400×300 `vga` - Larger than 640×480 `svga` - Larger than 800×600 `xga` - Larger than 1024×768 `2mp` - Larger than 2 MP `4mp` - Larger than 4 MP `6mp` - Larger than 6 MP `8mp` - Larger than 8 MP `10mp` - Larger than 10 MP `12mp` - Larger than 12 MP `15mp` - Larger than 15 MP `20mp` - Larger than 20 MP `40mp` - Larger than 40 MP `70mp` - Larger than 70 MP",
              },
            ),
          ),
          image_color: Type.Optional(
            Type.Union(
              [
                Type.Literal("bw"),
                Type.Literal("trans"),
                Type.Literal("red"),
                Type.Literal("orange"),
                Type.Literal("yellow"),
                Type.Literal("green"),
                Type.Literal("teal"),
                Type.Literal("blue"),
                Type.Literal("purple"),
                Type.Literal("pink"),
                Type.Literal("white"),
                Type.Literal("gray"),
                Type.Literal("black"),
                Type.Literal("brown"),
              ],
              {
                description:
                  "Parameter defines the color of images. Options: `bw` - Black and white `trans` - Transparent `red` - Red `orange` - Orange `yellow` - Yellow `green` - Green `teal` - Teal `blue` - Blue `purple` - Purple `pink` - Pink `white` - White `gray` - Gray `black` - Black `brown` - Brown This parameter overrides `ic` and `isc` components of `tbs` parameter",
              },
            ),
          ),
          image_type: Type.Optional(
            Type.Union(
              [
                Type.Literal("face"),
                Type.Literal("photo"),
                Type.Literal("clipart"),
                Type.Literal("lineart"),
                Type.Literal("animated"),
              ],
              {
                description:
                  "Parameter defines the type of images. Options: `face` - Face `photo` - Photo `clipart` - Clip art `lineart` - Line drawing `animated` - Animated This parameter overrides `itp` component of `tbs` parameter",
              },
            ),
          ),
          licenses: Type.Optional(
            Type.Union(
              [
                Type.Literal("f"),
                Type.Literal("fc"),
                Type.Literal("fm"),
                Type.Literal("fmc"),
                Type.Literal("cl"),
                Type.Literal("ol"),
              ],
              {
                description:
                  "Parameter defines the scope of licenses of images. Options: `f` - Free to use or share `fc` - Free to use or share, even commercially `fm` - Free to use, share or modify `fmc` - Free to use, share or modify, even commercially `cl` - Creative Commons licenses `ol` - Commercial and other licenses This parameter overrides `sur` component of `tbs` parameter",
              },
            ),
          ),
          safe: Type.Optional(
            Type.Union([Type.Literal("active"), Type.Literal("off")], {
              description:
                "Parameter defines the level of filtering for adult content. It can be set to `active` or `off`, by default Google will blur explicit content.",
            }),
          ),
          nfpr: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines the exclusion of results from an auto-corrected query when the original query is spelled wrong. It can be set to `1` to exclude these results, or `0` to include them (default). Note that this parameter may not prevent Google from returning results for an auto-corrected query if no other results are available.",
            }),
          ),
          filter: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines if the filters for 'Similar Results' and 'Omitted Results' are on or off. It can be set to `1` (default) to enable these filters, or `0` to disable these filters.",
            }),
          ),
          ijn: Type.Optional(
            Type.Number({ description: "Parameter defines the page number. Min. value:`0` Max. value:`99`" }),
          ),
          device: Type.Optional(
            Type.String({
              description:
                "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Images results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(GoogleImagesResponse)
      .summary("Google Images")
      .description("Search via Google Images. Real API: GET /search.json?engine=google_images")
      .operationId("searchGoogleImages")
      .tag("Google")
      .extension("x-serpapi-engine", "google_images")
      .extension("x-serpapi-real-path", "/search.json")
      .example("coffee", { summary: "Google Images example: coffee", value: GoogleImagesCoffeeExample });

    g.get("/google_images_light")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. You can use anything that you would use in a regular Google Images Light search. e.g. `inurl:`, `site:`, `intitle:`.",
          }),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          google_domain: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google domain to use. It defaults to `google.com`. Head to the Google domains for a full list of supported Google domains.. Valid values include: google.com, google.ad, google.ae, google.com.af, google.com.ag, google.com.ai, google.al, google.am, google.co.ao, google.com.ar, and 175 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Images Light search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google countries for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Images Light search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French) Head to the Google languages for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          cr: Type.Optional(
            Type.String({
              description:
                "Parameter defines one or multiple countries to limit the search to. It uses `country{two-letter upper-case country code}` to specify countries and `|` as a delimiter. (e.g., `countryFR|countryDE` will only search French and German pages). Head to the Google cr countries page for a full list of supported countries.",
            }),
          ),
          as_dt: Type.Optional(
            Type.String({
              description:
                "Parameter controls whether to include or exclude results from the site named in the as\\_sitesearch parameter.",
            }),
          ),
          as_epq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a phrase that all documents in the search results must contain. You can also use the phrase search query term to search for a phrase.",
            }),
          ),
          as_eq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a word or phrase that should not appear in any documents in the search results. You can also use the exclude query term to ensure that a particular word or phrase will not appear in the documents in a set of search results.",
            }),
          ),
          as_lq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should contain a link to a particular URL. You can also use the link: query term for this type of query.",
            }),
          ),
          as_nlo: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the starting value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_nhi: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the ending value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_oq: Type.Optional(
            Type.String({
              description:
                "Parameter provides additional search terms to check for in a document, where each document in the search results must contain at least one of the additional search terms. You can also use the Boolean OR query term for this type of query.",
            }),
          ),
          as_q: Type.Optional(
            Type.String({
              description:
                "Parameter provides search terms to check for in a document. This parameter is also commonly used to allow users to specify additional terms to search for within a set of search results.",
            }),
          ),
          as_qdr: Type.Optional(
            Type.String({
              description:
                "Parameter requests search results from a specified time period (quick date range). The following values are supported: `d[number]`: requests results from the specified number of past days. Example for the past 10 days: `as_qdr=d10` `w[number]`: requests results from the specified number of past weeks. `m[number]`: requests results from the specified number of past months. `y[number]`: requests results from the specified number of past years. Example for the past year: `as_qdr=y`",
            }),
          ),
          as_rq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should be pages that are related to the specified URL. The parameter value should be a URL. You can also use the related: query term for this type of query.",
            }),
          ),
          as_sitesearch: Type.Optional(
            Type.String({
              description:
                "Parameter allows you to specify that all search results should be pages from a given site. By setting the as\\_dt parameter, you can also use it to exclude pages from a given site from your search results.",
            }),
          ),
          period_unit: Type.Optional(
            Type.Union(
              [
                Type.Literal("s"),
                Type.Literal("n"),
                Type.Literal("h"),
                Type.Literal("d"),
                Type.Literal("w"),
                Type.Literal("m"),
                Type.Literal("y"),
              ],
              {
                description:
                  "Parameter defines the time period unit to search for the recent images, e.g. from past minute, hour, day etc. Options: `s` - Second `n` - Minute `h` - Hour `d` - Day `w` - Week `m` - Month `y` - Year This parameter can't be used with `start_date`/`end_date` parameters. This parameter overrides `qdr` component of `tbs` parameter.",
              },
            ),
          ),
          period_value: Type.Optional(
            Type.Number({
              description:
                "Parameter defines an optional time period value that can be used with `period_unit` to describe time periods like `15 seconds`, `42 hours`, `178 days` etc. Default value: `1` Value range: `1..2147483647`",
            }),
          ),
          start_date: Type.Optional(
            Type.String({
              description:
                "Parameter defines the start date of time period you want to limit the image search to. Format: `YYYYMMDD` Example: `20241201` This parameter can't be used with `period_unit`/`period_value` parameters. `start_date` with blank `end_date` produces date range `FROM start_date TO today`. This parameter overrides `cdr` and `cd_min` components of `tbs` parameter.",
            }),
          ),
          end_date: Type.Optional(
            Type.String({
              description:
                "Parameter defines the end date of time period you want to limit the image search to. Format: `YYYYMMDD` Example: `20241231` This parameter can't be used with `period_unit`/`period_value` parameters. `end_date` with blank `start_date` produces date range `BEFORE end_date`. This parameter overrides `cdr` and `cd_max` components of `tbs` parameter.",
            }),
          ),
          tbs: Type.Optional(
            Type.String({
              description:
                "(to be searched) parameter defines advanced search parameters that aren't possible in the regular query field.",
            }),
          ),
          imgar: Type.Optional(
            Type.Union([Type.Literal("s"), Type.Literal("t"), Type.Literal("w"), Type.Literal("xw")], {
              description:
                "Parameter defines the set aspect ratio of images. Options: `s` - Square `t` - Tall `w` - Wide `xw` - Panoramic",
            }),
          ),
          imgsz: Type.Optional(
            Type.Union(
              [
                Type.Literal("l"),
                Type.Literal("m"),
                Type.Literal("i"),
                Type.Literal("qsvga"),
                Type.Literal("vga"),
                Type.Literal("svga"),
                Type.Literal("xga"),
                Type.Literal("2mp"),
                Type.Literal("4mp"),
                Type.Literal("6mp"),
                Type.Literal("8mp"),
                Type.Literal("10mp"),
                Type.Literal("12mp"),
                Type.Literal("15mp"),
                Type.Literal("20mp"),
                Type.Literal("40mp"),
                Type.Literal("70mp"),
              ],
              {
                description:
                  "Parameter defines the size of images. Options: `l` - Large `m` - Medium `i` - Icon `qsvga` - Larger than 400×300 `vga` - Larger than 640×480 `svga` - Larger than 800×600 `xga` - Larger than 1024×768 `2mp` - Larger than 2 MP `4mp` - Larger than 4 MP `6mp` - Larger than 6 MP `8mp` - Larger than 8 MP `10mp` - Larger than 10 MP `12mp` - Larger than 12 MP `15mp` - Larger than 15 MP `20mp` - Larger than 20 MP `40mp` - Larger than 40 MP `70mp` - Larger than 70 MP",
              },
            ),
          ),
          image_color: Type.Optional(
            Type.Union(
              [
                Type.Literal("bw"),
                Type.Literal("trans"),
                Type.Literal("red"),
                Type.Literal("orange"),
                Type.Literal("yellow"),
                Type.Literal("green"),
                Type.Literal("teal"),
                Type.Literal("blue"),
                Type.Literal("purple"),
                Type.Literal("pink"),
                Type.Literal("white"),
                Type.Literal("gray"),
                Type.Literal("black"),
                Type.Literal("brown"),
              ],
              {
                description:
                  "Parameter defines the color of images. Options: `bw` - Black and white `trans` - Transparent `red` - Red `orange` - Orange `yellow` - Yellow `green` - Green `teal` - Teal `blue` - Blue `purple` - Purple `pink` - Pink `white` - White `gray` - Gray `black` - Black `brown` - Brown This parameter overrides `ic` and `isc` components of `tbs` parameter",
              },
            ),
          ),
          image_type: Type.Optional(
            Type.Union(
              [
                Type.Literal("face"),
                Type.Literal("photo"),
                Type.Literal("clipart"),
                Type.Literal("lineart"),
                Type.Literal("animated"),
              ],
              {
                description:
                  "Parameter defines the type of images. Options: `face` - Face `photo` - Photo `clipart` - Clip art `lineart` - Line drawing `animated` - Animated This parameter overrides `itp` component of `tbs` parameter",
              },
            ),
          ),
          licenses: Type.Optional(
            Type.Union(
              [
                Type.Literal("f"),
                Type.Literal("fc"),
                Type.Literal("fm"),
                Type.Literal("fmc"),
                Type.Literal("cl"),
                Type.Literal("ol"),
              ],
              {
                description:
                  "Parameter defines the scope of licenses of images. Options: `f` - Free to use or share `fc` - Free to use or share, even commercially `fm` - Free to use, share or modify `fmc` - Free to use, share or modify, even commercially `cl` - Creative Commons licenses `ol` - Commercial and other licenses This parameter overrides `sur` component of `tbs` parameter",
              },
            ),
          ),
          safe: Type.Optional(
            Type.Union([Type.Literal("active"), Type.Literal("off")], {
              description:
                "Parameter defines the level of filtering for adult content. It can be set to `active` or `off`, by default Google will blur explicit content.",
            }),
          ),
          nfpr: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines the exclusion of results from an auto-corrected query when the original query is spelled wrong. It can be set to `1` to exclude these results, or `0` to include them (default). Note that this parameter may not prevent Google from returning results for an auto-corrected query if no other results are available.",
            }),
          ),
          filter: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines if the filters for 'Similar Results' and 'Omitted Results' are on or off. It can be set to `1` (default) to enable these filters, or `0` to disable these filters.",
            }),
          ),
          start: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the result offset. It skips the given number of results. Min. value:`0` Max. value:`999`",
            }),
          ),
          device: Type.Optional(
            Type.String({
              description:
                "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Images Light results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(GoogleImagesResponse)
      .summary("Google Images Light")
      .description("Search via Google Images Light. Real API: GET /search.json?engine=google_images_light")
      .operationId("searchGoogleImagesLight")
      .tag("Google")
      .extension("x-serpapi-engine", "google_images_light")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_images_related_content")
      .query(
        Type.Object({
          related_content_id: Type.String({
            description:
              "Parameter defines the unique ID for retrieving the Related Content of an image. You can acquire the ID by using our Google Images API.",
          }),
          q: Type.Optional(
            Type.String({
              description:
                "Parameter defines the search query. To get the most precise results it is recommended to use the same query you used in the original Google Images search.",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Images search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French) Head to the Google languages for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Images search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France). Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Images Related Content results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Images Related Content search results" }))
      .summary("Google Images Related Content")
      .description(
        "Search via Google Images Related Content. Real API: GET /search.json?engine=google_images_related_content",
      )
      .operationId("searchGoogleImagesRelatedContent")
      .tag("Google")
      .extension("x-serpapi-engine", "google_images_related_content")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_immersive_product")
      .query(
        Type.Object({
          page_token: Type.String({
            description: "Parameter defines the token needed to show more product info in Google immersive popup.",
          }),
          more_stores: Type.Optional(
            Type.Boolean({
              description:
                "Parameter for fetching more stores results in single search. It can be set to `1` or `true`. By default, a search returns `3 to 5` stores. When the more\\_stores parameter is **enabled**, up to `13` stores will be returned, or the maximum available, depending on the product.",
            }),
          ),
          next_page_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the next page token. It is used for retrieving the next page of results for stores. The token is returned as `stores_next_page_token` from the search results.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Immersive Product results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Immersive Product search results" }))
      .summary("Google Immersive Product")
      .description("Search via Google Immersive Product. Real API: GET /search.json?engine=google_immersive_product")
      .operationId("searchGoogleImmersiveProduct")
      .tag("Google")
      .extension("x-serpapi-engine", "google_immersive_product")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_jobs")
      .query(
        Type.Object({
          q: Type.String({ description: "Parameter defines the query you want to search." }),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          google_domain: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google domain to use. It defaults to `google.com`. Head to the Google domains page for a full list of supported Google domains.. Valid values include: google.com, google.ad, google.ae, google.com.af, google.com.ag, google.com.ai, google.al, google.am, google.co.ao, google.com.ar, and 175 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Jobs search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          next_page_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the next page token. It is used for retrieving the next page of results. Up to `10` results are returned per page. The next page token can be found in the SerpApi JSON response: `serpapi_pagination -> next_page_token` Usage of start parameter (results offset) has been discontinued by Google.",
            }),
          ),
          chips: Type.Optional(
            Type.String({
              description:
                "Parameter defines additional query conditions. Top of a job search page contains elements called chips, its values are extracted in order to be passed to chips parameter. E.g. `city:Owg_06VPwoli_nfhBo8LyA==` will return results for New York. This parameter has been deprecated by Google.",
            }),
          ),
          lrad: Type.Optional(
            Type.Number({ description: "Defines search radius in kilometers. Does not strictly limit the radius." }),
          ),
          ltype: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will filter the results by work from home. This parameter has been deprecated by Google.",
            }),
          ),
          uds: Type.Optional(
            Type.String({
              description:
                "Parameter enables to filter search. It's a string provided by Google as a filter. `uds` values are provided under the section: `filters` with `uds`, `q` and `serpapi_link` values provided for each filter.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Jobs results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Jobs search results" }))
      .summary("Google Jobs")
      .description("Search via Google Jobs. Real API: GET /search.json?engine=google_jobs")
      .operationId("searchGoogleJobs")
      .tag("Google")
      .extension("x-serpapi-engine", "google_jobs")
      .extension("x-serpapi-real-path", "/search.json")
      .example("barista", { summary: "Google Jobs example: barista", value: GoogleJobsBaristaExample });

    g.get("/google_jobs_listing")
      .query(
        Type.Object({
          q: Type.String({
            description: "Parameter defines the `job_id` string which can be obtained from Google Jobs API.",
          }),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Jobs Listing results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Jobs Listing search results" }))
      .summary("Google Jobs Listing")
      .description("Search via Google Jobs Listing. Real API: GET /search.json?engine=google_jobs_listing")
      .operationId("searchGoogleJobsListing")
      .tag("Google")
      .extension("x-serpapi-engine", "google_jobs_listing")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_lens")
      .query(
        Type.Object({
          url: Type.String({ description: "Parameter defines the URL of an image to perform the Google Lens search." }),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Lens search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          country: Type.Optional(
            Type.String({
              description:
                "Parameter defines the specific country location to use for the Google Lens search. It's a two-letter country code. (e.g., `us` for United States, `fr` for France, or `de` for Germany). Head to the Google Lens countries page for a full list of supported Google Lens countries.. Valid values include: ae, af, ag, ai, al, am, ao, ar, at, au, and 146 more",
            }),
          ),
          type: Type.Union(
            [
              Type.Literal("all"),
              Type.Literal("about_this_image"),
              Type.Literal("products"),
              Type.Literal("exact_matches"),
              Type.Literal("visual_matches"),
            ],
            {
              description:
                "Parameter defines the type of search to perform. By default, the search type is `all`. Available options: `all` - All `about_this_image` - About This Image `products` - Products `exact_matches` - Exact Matches `visual_matches` - Visual Matches.",
            },
          ),
          q: Type.Optional(
            Type.String({
              description:
                "Parameter defines the search query to use along in the Google Lens search. It is only applicable when type is set to `all`, `visual_matches`, or `products`.",
            }),
          ),
          safe: Type.Optional(
            Type.Union([Type.Literal("active"), Type.Literal("off")], {
              description:
                "Parameter defines the level of filtering for adult content. It can be set to `active` or `off`, by default Google will blur explicit content.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Lens results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Lens search results" }))
      .summary("Google Lens")
      .description("Search via Google Lens. Real API: GET /search.json?engine=google_lens")
      .operationId("searchGoogleLens")
      .tag("Google")
      .extension("x-serpapi-engine", "google_lens")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_light")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. You can use anything that you would use in a regular Google search. e.g. `inurl:`, `site:`, `intitle:`. We also support advanced search query parameters such as as\\_dt and as\\_eq. See the full list of supported advanced search query parameters.",
          }),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          google_domain: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google domain to use. It defaults to `google.com`. Head to the Google domains page for a full list of supported Google domains.. Valid values include: google.com, google.ad, google.ae, google.com.af, google.com.ag, google.com.ai, google.al, google.am, google.co.ao, google.com.ar, and 175 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France). Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          lr: Type.Optional(
            Type.String({
              description:
                "Parameter defines one or multiple languages to limit the search to. It uses `lang_{two-letter language code}` to specify languages and `|` as a delimiter. (e.g., `lang_fr|lang_de` will only search French and German pages). Head to the Google lr languages page for a full list of supported languages.",
            }),
          ),
          as_dt: Type.Optional(
            Type.String({
              description:
                "Parameter controls whether to include or exclude results from the site named in the as\\_sitesearch parameter.",
            }),
          ),
          as_epq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a phrase that all documents in the search results must contain. You can also use the phrase search query term to search for a phrase.",
            }),
          ),
          as_eq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a word or phrase that should not appear in any documents in the search results. You can also use the exclude query term to ensure that a particular word or phrase will not appear in the documents in a set of search results.",
            }),
          ),
          as_lq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should contain a link to a particular URL. You can also use the link: query term for this type of query.",
            }),
          ),
          as_nlo: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the starting value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_nhi: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the ending value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_oq: Type.Optional(
            Type.String({
              description:
                "Parameter provides additional search terms to check for in a document, where each document in the search results must contain at least one of the additional search terms. You can also use the Boolean OR query term for this type of query.",
            }),
          ),
          as_q: Type.Optional(
            Type.String({
              description:
                "Parameter provides search terms to check for in a document. This parameter is also commonly used to allow users to specify additional terms to search for within a set of search results.",
            }),
          ),
          as_qdr: Type.Optional(
            Type.String({
              description:
                "Parameter requests search results from a specified time period (quick date range). The following values are supported: `d[number]`: requests results from the specified number of past days. Example for the past 10 days: `as_qdr=d10` `w[number]`: requests results from the specified number of past weeks. `m[number]`: requests results from the specified number of past months. `y[number]`: requests results from the specified number of past years. Example for the past year: `as_qdr=y`",
            }),
          ),
          as_rq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should be pages that are related to the specified URL. The parameter value should be a URL. You can also use the related: query term for this type of query.",
            }),
          ),
          as_sitesearch: Type.Optional(
            Type.String({
              description:
                "Parameter allows you to specify that all search results should be pages from a given site. By setting the as\\_dt parameter, you can also use it to exclude pages from a given site from your search results.",
            }),
          ),
          safe: Type.Optional(
            Type.Union([Type.Literal("active"), Type.Literal("off")], {
              description:
                "Parameter defines the level of filtering for adult content. It can be set to `active` or `off`, by default Google will blur explicit content.",
            }),
          ),
          nfpr: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines the exclusion of results from an auto-corrected query when the original query is spelled wrong. It can be set to `1` to exclude these results, or `0` to include them (default). Note that this parameter may not prevent Google from returning results for an auto-corrected query if no other results are available.",
            }),
          ),
          filter: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines if the filters for 'Similar Results' and 'Omitted Results' are on or off. It can be set to `1` (default) to enable these filters, or `0` to disable these filters.",
            }),
          ),
          start: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `10` is the 2nd page of results, `20` is the 3rd page of results, etc.).",
            }),
          ),
          device: Type.Optional(
            Type.String({
              description:
                "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Light results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Light search results" }))
      .summary("Google Light")
      .description("Search via Google Light. Real API: GET /search.json?engine=google_light")
      .operationId("searchGoogleLight")
      .tag("Google")
      .extension("x-serpapi-engine", "google_light")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_local")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. You can use anything that you would use in a regular Google Local search.",
          }),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          google_domain: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google domain to use. It defaults to `google.com`. Head to the Google domains for a full list of supported Google domains.. Valid values include: google.com, google.ad, google.ae, google.com.af, google.com.ag, google.com.ai, google.al, google.am, google.co.ao, google.com.ar, and 175 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Local search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google countries for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Local search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French) Head to the Google languages for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          ludocid: Type.Optional(
            Type.String({
              description:
                'Parameter defines the Google CID (customer identifier) of a place. This parameter can be found in Google Local API and Google Search API local results under the name of place\\_id, as well as in Google Maps API local results under the name of data\\_cid. You can also acquire it using Google\'s CID converter. Example CID for "New York, NY, USA": `14414772292044717666`.',
            }),
          ),
          tbs: Type.Optional(
            Type.String({
              description:
                "(to be searched) parameter defines advanced search parameters that aren't possible in the regular query field.",
            }),
          ),
          start: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the result offset. It skips the given number of results. It's used for pagination. On desktop, parameter only accepts multiples of `20` (e.g. `20` for the second page results, `40` for the third page results, etc.). On mobile, parameter only accepts multiples of `10` (e.g. `10` for the second page results, `20` for the third page results, etc.).",
            }),
          ),
          device: Type.Optional(
            Type.String({
              description:
                "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Local results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(GoogleMapsResponse)
      .summary("Google Local")
      .description("Search via Google Local. Real API: GET /search.json?engine=google_local")
      .operationId("searchGoogleLocal")
      .tag("Google")
      .extension("x-serpapi-engine", "google_local")
      .extension("x-serpapi-real-path", "/search.json")
      .example("coffee", { summary: "Google Local example: coffee", value: GoogleLocalCoffeeExample });

    g.get("/google_local_services")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the service you want to search for. Head to the Google local services queries page for a full list of supported Google local services queries.. Valid values include: acupuncturist, allergist, animal_shelter, appliance_repair, architect, audiologist, auto_body_shop, auto_repair_shop, bankruptcy_lawyer, barber_shop, and 99 more",
          }),
          data_cid: Type.Number({
            description:
              "Parameter defines the Google CID (customer identifier) of a place. This parameter can be found in Google Maps API local results, as well as in Google Search API and Google Local API local results under the name of place\\_id. You can also acquire it using Google's CID converter. Example CID for \"New York, NY, USA\": `14414772292044717666` Using data\\_cid for specific business locations or streets may produce inconsistent results due to limitations on Google's side; we recommend using the city or district level instead. Google Local Services API returns empty results for places outside of the USA. Parameter should not be confused with cid as they are different parameters.",
          }),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Local Services search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          job_type: Type.Optional(
            Type.String({
              description:
                'Parameter defines the type of a job, or a subcategory of a service you have searched for. For example, if you search for "electrician", you can be more specific by adding a job\\_type (e.g. `job_type=restore_power`). Head to the Google local services job types page for a full list of supported Google local services job types.. Valid values include: acupressure, acupuncture, cupping, gua_sha, heat_therapy, herbal_therapy, infrared_therapy, moxibustion, acupuncturist_other, qigong, and 1214 more',
            }),
          ),
          cid: Type.Optional(
            Type.Number({
              description:
                "Parameter defines a unique ID of a place. The ID is available in our Google Local Services API JSON response. Parameter is required when accessing a specific business and should be used with bid and pid parameters. Parameter should not be confused with data\\_cid which corresponds to Google CID (customer identifier) of a place.",
            }),
          ),
          bid: Type.Optional(
            Type.Number({
              description:
                "Parameter defines a unique ID of a place. The ID is available in our Google Local Services API JSON response. Parameter is required when accessing a specific business and should be used with cid and pid parameters.",
            }),
          ),
          pid: Type.Optional(
            Type.Number({
              description:
                "Parameter defines a unique ID of a place. The ID is available in our Google Local Services API JSON response. Parameter is required when accessing a specific business and should be used with cid and bid parameters.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Local Services results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Local Services search results" }))
      .summary("Google Local Services")
      .description("Search via Google Local Services. Real API: GET /search.json?engine=google_local_services")
      .operationId("searchGoogleLocalServices")
      .tag("Google")
      .extension("x-serpapi-engine", "google_local_services")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_maps")
      .query(
        Type.Object({
          q: Type.Optional(
            Type.String({
              description:
                "Parameter defines the query you want to search. You can use anything that you would use in a regular Google Maps search. The parameter is only required if type is set to `search`.",
            }),
          ),
          ll: Type.Optional(
            Type.String({
              description:
                "Parameter defines the GPS coordinates for the search origin. Its value must match the following format: `@` + `latitude` + `,` + `longitude` + `,` + `zoom/map_height` This will form a string that looks like: `@40.7455096,-74.0083012,14z` or `@43.8521864,11.2168835,10410m`. The minimum `zoom` value is `3z` (the map is completely zoomed out). The maximum effective `zoom` value depends on the location, ranging from `18z` to `23z`. Some locations may support even higher `zoom` values, so we allow values up to `30z`. Alternatively, you can specify `map_height` in meters. The minimum value is `1m`. The maximum value is `15028132m`, which roughly equals `3z` on the equator. Parameter is applied only when type is set to `search`. Parameter can't be used with ll, lat, lon, z, or m parameters. Results are not guaranteed to be within the requested geographic location.",
            }),
          ),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines the location, whose GPS coordinates are used for the search origin. At the end, coordinates are encoded as part of the ll parameter. Parameter should be used with z or m parameter. Parameter can't be used with ll, lat or lon parameters.",
            }),
          ),
          lat: Type.Optional(
            Type.Number({
              description:
                "Parameter defines a GPS latitude for the search origin. At the end, it is encoded as part of the ll parameter. Parameter is required when using lon parameter. Parameter should be used with z or m parameter. Parameter can't be used with ll or location parameters.",
            }),
          ),
          lon: Type.Optional(
            Type.Number({
              description:
                "Parameter defines a GPS longitude for the search origin. At the end, it is encoded as part of the ll parameter. Parameter is required when using lat parameter. Parameter should be used with z or m parameter. Parameter can't be used with ll or location parameters.",
            }),
          ),
          z: Type.Optional(
            Type.Number({
              description:
                "Parameter defines a map zoom level. The minimum value is `3` (the map is completely zoomed out). The maximum effective value depends on the location, ranging from `18` to `23`. Some locations may support even higher values, so we allow values up to `30`. At the end, it is encoded as part of the ll parameter. Either z or m is required when using location or lat/lon parameters.",
            }),
          ),
          m: Type.Optional(
            Type.Number({
              description:
                "Parameter defines a map height in meters. The minimum value is `1`. The maximum value is `15028132`, which roughly equals `3z` on the equator. At the end, it is encoded as part of the ll parameter. Either m or z is required when using location or lat/lon parameters.",
            }),
          ),
          nearby: Type.Optional(
            Type.Boolean({
              description:
                "Parameter forces to return search results closer to the specified location. Parameter is highly recommended when q parameter includes `near me` keywords. Parameter is not recommended when q parameter includes location. Parameter should be used with ll, location, or lat/lon parameters.",
            }),
          ),
          google_domain: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google domain to use. It defaults to `google.com`. Head to the Google domains page for a full list of supported Google domains.. Valid values include: google.com, google.ad, google.ae, google.com.af, google.com.ag, google.com.ai, google.al, google.am, google.co.ao, google.com.ar, and 175 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Maps search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google Maps languages page for a full list of supported Google Maps languages.. Valid values include: af, sq, am, ar, hy, az, eu, be, bn, bs, and 71 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Maps search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France). Head to the Google countries page for a full list of supported Google countries. Parameter only affects Place Results API.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          data: Type.Optional(
            Type.String({
              description:
                "This parameter is deprecated, please use place\\_id or data\\_cid instead. Parameter can be used to filter the search results. You can visit Google Maps website, set filters you want and simply copy the data value from their URL to SerpApi URL. One of the uses of the parameter is to search for a specific place; therefore, it is required if the type is set to `place`. To use the data parameter to search for a specific place, it needs to be constructed in the following sequence: `!4m5!3m4!1s` + `data_id` + `!8m2!3d` + `latitude` + `!4d` + `longitude` This will form a string that looks like this: `!4m5!3m4!1s0x89c259b7abdd4769:0xc385876db174521a!8m2!3d40.750231!4d-74.004019`. You can find the `data_id` using our Google Maps API.",
            }),
          ),
          place_id: Type.Optional(
            Type.String({
              description:
                "Parameter defines the unique reference to a place in Google Maps. Place IDs are available for most locations, including businesses, landmarks, parks, and intersections. You can find the place\\_id using our Google Maps API. You can read more about Place IDs here. place\\_id can be used without any other optional parameter. place\\_id and data\\_cid can't be used together. Parameter should not be confused with place\\_id in Google Search API and Google Local API which are the same as data\\_cid in Google Maps API.",
            }),
          ),
          data_cid: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google CID (customer identifier) of a place. This parameter can be found in Google Maps API local results, as well as in Google Search API and Google Local API local results under the name of place\\_id. You can also acquire it using Google's CID converter. data\\_cid can be used without any other optional parameter. data\\_cid and place\\_id can't be used together.",
            }),
          ),
          type: Type.Union([Type.Literal("search"), Type.Literal("place")], {
            description:
              "Parameter defines the type of search you want to make. It can be set to: `search` - returns a list of results for the set q parameter, `place` - returns results for a specific place when data parameter is set Parameter is not required when using place\\_id or data\\_cid.",
          }),
          start: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `20` is the 2nd page of results, `40` is the 3rd page of results, etc.). We recommend starting with `0` and increasing by `20` for the next page. There is no hard limit on the maximum offset number, but we recommend a maximum of `100` (page six) which is the same behavior as with the Google Maps web app. More than that, the result might be duplicated or irrelevant.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Maps results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(GoogleMapsResponse)
      .summary("Google Maps")
      .description("Search via Google Maps. Real API: GET /search.json?engine=google_maps")
      .operationId("searchGoogleMaps")
      .tag("Google")
      .extension("x-serpapi-engine", "google_maps")
      .extension("x-serpapi-real-path", "/search.json")
      .example("pizza", { summary: "Google Maps example: pizza", value: GoogleMapsPizzaExample });

    g.get("/google_maps_autocomplete")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the search query. A query that would be used to provide completion options.",
          }),
          ll: Type.String({
            description:
              "Parameter defines the GPS coordinates of the location where you want the search to originate from. Its value must match the following format: `@` + `latitude` + `,` + `longitude` + `,` + `zoom/map_height` This will form a string that looks like this: e.g. `@40.7455096,-74.0083012,14z` or `@43.8521864,11.2168835,10410m`. The `zoom` attribute ranges from `3z`, map completely zoomed out - to `21z`, map completely zoomed in. Alternatively, you can specify `map_height` in meters (e.g., `10410m`).",
          }),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Maps Autocomplete search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Maps Autocomplete search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          cp: Type.Optional(
            Type.String({
              description:
                "Cursor pointer defines the position of cursor for the query provided, position starts from 0 which is a case where cursor is placed before the query `|query`. If not provided acts as cursor is placed in the end of query `query|`.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Maps Autocomplete results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Maps Autocomplete search results" }))
      .summary("Google Maps Autocomplete")
      .description("Search via Google Maps Autocomplete. Real API: GET /search.json?engine=google_maps_autocomplete")
      .operationId("searchGoogleMapsAutocomplete")
      .tag("Google")
      .extension("x-serpapi-engine", "google_maps_autocomplete")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_maps_contributor_reviews")
      .query(
        Type.Object({
          contributor_id: Type.String({
            description:
              "Parameter defines the Google Maps Contributor ID. It's a series of digits which can be found in the contributor reviews URL. For example, the contributor ID for the URL `https://www.google.com/maps/contrib/110382514725174877672/reviews` is `110382514725174877672`. It can also be found by using our Google Maps Place Results API and Google Maps Reviews API.",
          }),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Maps Contributor Reviews search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France). Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Maps Contributor Reviews search. It's a two-letter language code, for example, `en` for English (default), `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          next_page_token: Type.Optional(
            Type.String({
              description: "Parameter defines the next page token. It is used for retrieving the next page results.",
            }),
          ),
          num: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the maximum number of results to return. (e.g., `10` (default) returns 10 results, and `200` returns 200 results). This parameter should not be larger than `200`.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Maps Contributor Reviews results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Maps Contributor Reviews search results" }))
      .summary("Google Maps Contributor Reviews")
      .description(
        "Search via Google Maps Contributor Reviews. Real API: GET /search.json?engine=google_maps_contributor_reviews",
      )
      .operationId("searchGoogleMapsContributorReviews")
      .tag("Google")
      .extension("x-serpapi-engine", "google_maps_contributor_reviews")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_maps_directions")
      .query(
        Type.Object({
          start_addr: Type.Optional(
            Type.String({
              description:
                "Parameter defines the address of the starting point for the direction you want to search. You can use anything that you would use in a regular Google Maps Directions search. Alternatively, you can use start\\_data\\_id or start\\_coords.",
            }),
          ),
          end_addr: Type.Optional(
            Type.String({
              description:
                "Parameter defines the address of the ending point for the direction you want to search. You can use anything that you would use in a regular Google Maps Directions search. Alternatively, you can use end\\_data\\_id or end\\_coords.",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Maps Directions search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          travel_mode: Type.Optional(
            Type.Union(
              [
                Type.Literal("6"),
                Type.Literal("0"),
                Type.Literal("9"),
                Type.Literal("3"),
                Type.Literal("2"),
                Type.Literal("1"),
                Type.Literal("4"),
              ],
              {
                description:
                  "Parameter defines the travel mode. Available options: `6` - Best (Default) `0` - Driving `9` - Two-wheeler `3` - Transit `2` - Walking `1` - Cycling `4` - Flight",
              },
            ),
          ),
          start_data_id: Type.Optional(
            Type.String({
              description:
                "Parameter defines the data ID of the starting point for the direction you want to search. Find the data ID of a place using our Google Maps API. Alternatively, you can use start\\_addr or start\\_coords.",
            }),
          ),
          end_data_id: Type.Optional(
            Type.String({
              description:
                "Parameter defines the data ID of the ending point for the direction you want to search. Find the data ID of a place using our Google Maps API. Alternatively, you can use end\\_addr or end\\_coords.",
            }),
          ),
          start_coords: Type.Optional(
            Type.String({
              description:
                "Parameter defines the GPS coordinates of the starting point for the direction you want to search. The format is `latitude,longitude`. E.g. `30.197471099,-97.66635289`. Alternatively, you can use start\\_addr or start\\_data\\_id.",
            }),
          ),
          end_coords: Type.Optional(
            Type.String({
              description:
                "Parameter defines the GPS coordinates of the ending point for the direction you want to search. The format is `latitude,longitude`. E.g. `30.197471099,-97.66635289`. Alternatively, you can use end\\_addr or end\\_data\\_id.",
            }),
          ),
          distance_unit: Type.Optional(
            Type.Union([Type.Literal("1"), Type.Literal("0")], {
              description: "Parameter defines the displayed distance unit. Available options: `1` - miles `0` - km",
            }),
          ),
          avoid: Type.Optional(
            Type.String({
              description:
                "Parameter defines avoid options. Available options: `highways` - Highways `tolls` - Tolls `ferries` - Ferries You can also combine multiple options by joining them with a comma (e.g.: `highways,tolls`).",
            }),
          ),
          prefer: Type.Optional(
            Type.String({
              description:
                "Parameter defines preferred transit options. Available options: `bus` - Bus `subway` - Subway `train` - Train `tram_light_rail` - Tram and light rail You can also combine multiple options by joining them with a comma (e.g.: `subway,train`). Parameter works only if travel\\_mode parameter is set to: `3` (Transit)",
            }),
          ),
          route: Type.Optional(
            Type.Union([Type.Literal("2"), Type.Literal("3"), Type.Literal("4")], {
              description:
                "Parameter defines route options. Available options: `2` - Fewer transfers `3` - Less walking `4` - Wheelchair accessible Parameter works only if travel\\_mode parameter is set to: `3` (Transit)",
            }),
          ),
          time: Type.Optional(
            Type.String({
              description:
                "Parameter defines the time to travel. Available options: `depart_at:xxxxxx` - Specifies the departure time, where `xxxxxx` is the timestamp. E.g. `depart_at:1698229538` specifies the departure time to 2023-10-25 10:25:38 GMT+0000 `arrive_by:xxxxxx` - Specifies the arrival time, where `xxxxxx` is the timestamp. E.g. `arrive_by:1698229538` specifies the arrival time to 2023-10-25 10:25:38 GMT+0000 `last_available` - Takes the last available transit. This option works only if travel\\_mode parameter is set to: `3` (Transit)",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Maps Directions results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Maps Directions search results" }))
      .summary("Google Maps Directions")
      .description("Search via Google Maps Directions. Real API: GET /search.json?engine=google_maps_directions")
      .operationId("searchGoogleMapsDirections")
      .tag("Google")
      .extension("x-serpapi-engine", "google_maps_directions")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_maps_photo_meta")
      .query(
        Type.Object({
          data_id: Type.String({
            description:
              "Parameter defines the Google Maps Photos' data ID. Find the data ID of a photo using our Google Maps Photos API.",
          }),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Maps Photo Meta results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Maps Photo Meta search results" }))
      .summary("Google Maps Photo Meta")
      .description("Search via Google Maps Photo Meta. Real API: GET /search.json?engine=google_maps_photo_meta")
      .operationId("searchGoogleMapsPhotoMeta")
      .tag("Google")
      .extension("x-serpapi-engine", "google_maps_photo_meta")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_maps_photos")
      .query(
        Type.Object({
          data_id: Type.String({
            description:
              "Parameter defines the Google Maps data ID. Find the data ID of a place using our Google Maps API.",
          }),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Maps Photos search. It's a two-letter language code, for example, `en` for English (default), `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          category_id: Type.Optional(
            Type.String({
              description:
                "Parameter defines the ID of a category. You can find the value of an ID inside the `categories` array, using our Google Maps Photos API. The number, and the type of categories can vary between places.",
            }),
          ),
          next_page_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the next page token. It is used for retrieving the next page results. `20` results are returned per page.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Maps Photos results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Maps Photos search results" }))
      .summary("Google Maps Photos")
      .description("Search via Google Maps Photos. Real API: GET /search.json?engine=google_maps_photos")
      .operationId("searchGoogleMapsPhotos")
      .tag("Google")
      .extension("x-serpapi-engine", "google_maps_photos")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_maps_posts")
      .query(
        Type.Object({
          data_id: Type.String({
            description:
              "Parameter defines the Google Maps data ID. Find the data ID of a place using our Google Maps API.",
          }),
          next_page_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the next page token. It is used for retrieving the next page results. `10` results are returned per page.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Maps Posts results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Maps Posts search results" }))
      .summary("Google Maps Posts")
      .description("Search via Google Maps Posts. Real API: GET /search.json?engine=google_maps_posts")
      .operationId("searchGoogleMapsPosts")
      .tag("Google")
      .extension("x-serpapi-engine", "google_maps_posts")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_maps_reviews")
      .query(
        Type.Object({
          data_id: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google Maps data ID. Find the data ID by using our Google Maps API. Either data\\_id or place\\_id should be set.",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Maps Reviews search. It's a two-letter language code, for example, `en` for English (default), `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          place_id: Type.Optional(
            Type.String({
              description:
                "Parameter defines the unique reference to a place on a Google Map. Place IDs are available for most locations, including businesses, landmarks, parks, and intersections. You can find the place\\_id using our Google Maps API. You can read more about Place IDs here. Either data\\_id or place\\_id should be set.",
            }),
          ),
          sort_by: Type.Optional(
            Type.Union(
              [
                Type.Literal("qualityScore"),
                Type.Literal("newestFirst"),
                Type.Literal("ratingHigh"),
                Type.Literal("ratingLow"),
              ],
              {
                description:
                  "Parameter is used for sorting and refining results. Available options: `qualityScore` - the most relevant reviews (default). `newestFirst` - the most recent reviews. `ratingHigh` - the highest rating reviews. `ratingLow` - the lowest rating reviews.",
              },
            ),
          ),
          topic_id: Type.Optional(
            Type.String({
              description:
                "Parameter defines the ID of the topic you want to use for filtering reviews. You can access IDs inside our structured JSON response. topic\\_id and query parameters can't be used together.",
            }),
          ),
          query: Type.Optional(
            Type.String({
              description:
                "Parameter defines a text query you want to use for filtering reviews. query and topic\\_id parameters can't be used together.",
            }),
          ),
          num: Type.Optional(
            Type.String({
              description:
                "Parameter defines the maximum number of results to return. It ranges from `1` to `20`. It defaults to `10`. Parameter cannot be used on the initial page when neither next\\_page\\_token, topic\\_id, nor query is set. It always returns `8` results.",
            }),
          ),
          next_page_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the next page token. It is used for retrieving the next page results. Usage of start parameter (results offset) has been discontinued by Google.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Maps Reviews results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Maps Reviews search results" }))
      .summary("Google Maps Reviews")
      .description("Search via Google Maps Reviews. Real API: GET /search.json?engine=google_maps_reviews")
      .operationId("searchGoogleMapsReviews")
      .tag("Google")
      .extension("x-serpapi-engine", "google_maps_reviews")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_news")
      .query(
        Type.Object({
          q: Type.Optional(
            Type.String({
              description:
                "Parameter defines the query you want to search. You can use anything that you would use in a regular Google News search. e.g. `site:`, `when:`. Parameter can't be used together with any of the Advanced Parameters.",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google News search. It's a two-letter country code. (e.g., `us` for the United States (default), `uk` for United Kingdom, or `fr` for France). Head to the Google countries page for a full list of supported Google News countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google News search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          topic_token: Type.Optional(
            Type.String({
              description:
                'Parameter defines the Google News topic token. It is used for accessing the news results for a specific topic (e.g., "World", "Business", "Technology"). The token can be found in our JSON response or the URL of the Google News page (in the URL, it is a string of characters preceded by `/topics/`). Parameter can be used together with section\\_token.',
            }),
          ),
          kgmid: Type.Optional(
            Type.String({
              description:
                'Parameter defines the Knowledge Graph ID (`KGMID`) of a topic or location for Google News results. It is a string that starts with `/m/` or `/g/`. You can look up entities on Wikidata and use their "Freebase ID" as the kgmid. For example, `/m/0vzm` is the kgmid for Austin, TX, and `/m/02mjmr` is the kgmid for Barack Obama. Parameter can only be used alone.',
            }),
          ),
          publication_token: Type.Optional(
            Type.String({
              description:
                'Parameter defines the Google News publication token. It is used for accessing the news results from a specific publisher (e.g., "CNN", "BBC", "The Guardian"). The token can be found in our JSON response or the URL of the Google News page (in the URL, it is a string of characters preceded by `/publications/`). Parameter can be used together with section\\_token.',
            }),
          ),
          section_token: Type.Optional(
            Type.String({
              description:
                'Parameter defines the Google News section token. It is used for accessing the sub-section of a specific topic. (e.g., "Business -> Economy"). The token can be found in our JSON response or the URL of the Google News page (in the URL, it is a string of characters preceded by `/sections/`) Parameter can be used together with topic\\_token, publication\\_token, and so.',
            }),
          ),
          story_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google News story token. It is used for accessing the news results with full coverage of a specific story. The token can be found in our JSON response or the URL of the Google News page (in the URL, it is a string of characters preceded by `/stories/`) Parameter can be used together with so.",
            }),
          ),
          so: Type.Optional(
            Type.Union([Type.Literal("0"), Type.Literal("1")], {
              description:
                "Parameter defines the sorting method. Results can be sorted by relevance or by date. By default, the results are sorted by relevance. List of supported values are: `0` - Relevance `1` - Date Parameter can be used together with story\\_token and section\\_token.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google News results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(GoogleNewsResponse)
      .summary("Google News")
      .description("Search via Google News. Real API: GET /search.json?engine=google_news")
      .operationId("searchGoogleNews")
      .tag("Google")
      .extension("x-serpapi-engine", "google_news")
      .extension("x-serpapi-real-path", "/search.json")
      .example("pizza", { summary: "Google News example: pizza", value: GoogleNewsPizzaExample });

    g.get("/google_news_light")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. You can use anything that you would use in a regular Google search. e.g. `inurl:`, `site:`, `intitle:`. We also support advanced search query parameters such as as\\_dt and as\\_eq. See the full list of supported advanced search query parameters.",
          }),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          google_domain: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google domain to use. It defaults to `google.com`. Head to the Google domains page for a full list of supported Google domains.. Valid values include: google.com, google.ad, google.ae, google.com.af, google.com.ag, google.com.ai, google.al, google.am, google.co.ao, google.com.ar, and 175 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France). Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          lr: Type.Optional(
            Type.String({
              description:
                "Parameter defines one or multiple languages to limit the search to. It uses `lang_{two-letter language code}` to specify languages and `|` as a delimiter. (e.g., `lang_fr|lang_de` will only search French and German pages). Head to the Google lr languages page for a full list of supported languages.",
            }),
          ),
          as_dt: Type.Optional(
            Type.String({
              description:
                "Parameter controls whether to include or exclude results from the site named in the as\\_sitesearch parameter.",
            }),
          ),
          as_epq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a phrase that all documents in the search results must contain. You can also use the phrase search query term to search for a phrase.",
            }),
          ),
          as_eq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a word or phrase that should not appear in any documents in the search results. You can also use the exclude query term to ensure that a particular word or phrase will not appear in the documents in a set of search results.",
            }),
          ),
          as_lq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should contain a link to a particular URL. You can also use the link: query term for this type of query.",
            }),
          ),
          as_nlo: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the starting value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_nhi: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the ending value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_oq: Type.Optional(
            Type.String({
              description:
                "Parameter provides additional search terms to check for in a document, where each document in the search results must contain at least one of the additional search terms. You can also use the Boolean OR query term for this type of query.",
            }),
          ),
          as_q: Type.Optional(
            Type.String({
              description:
                "Parameter provides search terms to check for in a document. This parameter is also commonly used to allow users to specify additional terms to search for within a set of search results.",
            }),
          ),
          as_qdr: Type.Optional(
            Type.String({
              description:
                "Parameter requests search results from a specified time period (quick date range). The following values are supported: `d[number]`: requests results from the specified number of past days. Example for the past 10 days: `as_qdr=d10` `w[number]`: requests results from the specified number of past weeks. `m[number]`: requests results from the specified number of past months. `y[number]`: requests results from the specified number of past years. Example for the past year: `as_qdr=y`",
            }),
          ),
          as_rq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should be pages that are related to the specified URL. The parameter value should be a URL. You can also use the related: query term for this type of query.",
            }),
          ),
          as_sitesearch: Type.Optional(
            Type.String({
              description:
                "Parameter allows you to specify that all search results should be pages from a given site. By setting the as\\_dt parameter, you can also use it to exclude pages from a given site from your search results.",
            }),
          ),
          safe: Type.Optional(
            Type.Union([Type.Literal("active"), Type.Literal("off")], {
              description:
                "Parameter defines the level of filtering for adult content. It can be set to `active` or `off`, by default Google will blur explicit content.",
            }),
          ),
          nfpr: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines the exclusion of results from an auto-corrected query when the original query is spelled wrong. It can be set to `1` to exclude these results, or `0` to include them (default). Note that this parameter may not prevent Google from returning results for an auto-corrected query if no other results are available.",
            }),
          ),
          filter: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines if the filters for 'Similar Results' and 'Omitted Results' are on or off. It can be set to `1` (default) to enable these filters, or `0` to disable these filters.",
            }),
          ),
          start: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `10` is the 2nd page of results, `20` is the 3rd page of results, etc.).",
            }),
          ),
          device: Type.Optional(
            Type.String({
              description:
                "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google News Light results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(GoogleNewsResponse)
      .summary("Google News Light")
      .description("Search via Google News Light. Real API: GET /search.json?engine=google_news_light")
      .operationId("searchGoogleNewsLight")
      .tag("Google")
      .extension("x-serpapi-engine", "google_news_light")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_patents")
      .query(
        Type.Object({
          q: Type.Optional(
            Type.String({
              description:
                "Parameter defines the query you want to search. You can split multiple search terms with semicolon `;`. For advanced search syntax, please refer to About Google Patents. Example for single search term: `(Coffee) OR (Tea)` Example for multiple search terms (separated by semicolon `;`): `(Coffee) OR (Tea);(A47J)`",
            }),
          ),
          page: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the page number. It's used for pagination. (e.g., `1` (default) is the first page of results, `2` is the 2nd page of results, etc.).",
            }),
          ),
          num: Type.Optional(
            Type.Number({
              description: "Parameter controls the number of results per page. Minimum: `10`, Maximum: `100`.",
            }),
          ),
          sort: Type.Optional(
            Type.Union([Type.Literal("new"), Type.Literal("old")], {
              description:
                "Parameter defines the sorting method. By default, the results are sorted by Relevance. List of supported values are: `new` - Newest `old` - Oldest Patent results are sorted by `filing_date` while scholar results are sorted by `publication_date` for `new` and `old` values.",
            }),
          ),
          clustered: Type.Optional(
            Type.Union([Type.Literal("true")], {
              description:
                "Parameter defines how the results should be grouped. List of supported values are: `true` - Classification",
            }),
          ),
          dups: Type.Optional(
            Type.Union([Type.Literal("language")], {
              description:
                "Parameter defines the method of deduplication. Either Family (default) or Publication. List of supported values are: `language` - Publication",
            }),
          ),
          patents: Type.Optional(
            Type.Boolean({
              description: "Parameter controls whether or not to include Google Patents results. (Defaults to true)",
            }),
          ),
          scholar: Type.Optional(
            Type.Boolean({
              description: "Parameter controls whether or not to include Google Scholar results. (Defaults to false)",
            }),
          ),
          before: Type.Optional(
            Type.String({
              description:
                "Parameter defines the maximum date of the results. The format of this field is `type:YYYYMMDD`. `type` can be one of `priority`, `filing`, and `publication`. Example: - `priority:20221231` - `publication:20230101`",
            }),
          ),
          after: Type.Optional(
            Type.String({
              description:
                "Parameter defines the minimum date of the results. The format of this field is `type:YYYYMMDD`. `type` can be one of `priority`, `filing`, and `publication`. Example: - `priority:20221231` - `publication:20230101`",
            }),
          ),
          inventor: Type.Optional(
            Type.String({
              description: "Parameter defines the inventors of the patents. Split multiple inventors with `,` (comma)",
            }),
          ),
          assignee: Type.Optional(
            Type.String({
              description: "Parameter defines the assignees of the patents. Split multiple assignees with `,` (comma)",
            }),
          ),
          country: Type.Optional(
            Type.String({
              description:
                "Parameter filters patent results by countries. Split multiple country codes with `,` (comma). List of supported country codes. Example:`WO,US`.",
            }),
          ),
          language: Type.Optional(
            Type.String({
              description:
                "Parameter filters patent results by languages. Split multiple languages with `,` (comma). List of supported values are: `ENGLISH`, `GERMAN`, `CHINESE`, `FRENCH`, `SPANISH`, `ARABIC`, `JAPANESE`, `KOREAN`, `PORTUGUESE`, `RUSSIAN`, `ITALIAN`, `DUTCH`, `SWEDISH`, `FINNISH`, `NORWEGIAN`, `DANISH`. Example:`ENGLISH,GERMAN`.",
            }),
          ),
          status: Type.Optional(
            Type.Union([Type.Literal("GRANT"), Type.Literal("APPLICATION")], {
              description:
                "Parameter filters patent results by status. List of supported values are: `GRANT` - Grant `APPLICATION` - Application",
            }),
          ),
          type: Type.Optional(
            Type.Union([Type.Literal("PATENT"), Type.Literal("DESIGN")], {
              description:
                "Parameter filters patent results by type. List of supported values are: `PATENT` - Patent `DESIGN` - Design",
            }),
          ),
          litigation: Type.Optional(
            Type.Union([Type.Literal("YES"), Type.Literal("NO")], {
              description:
                "Parameter filters patent results by litigation status. List of supported values are: `YES` - Has Related Litigation `NO` - No Known Litigation",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Patents results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Patents search results" }))
      .summary("Google Patents")
      .description("Search via Google Patents. Real API: GET /search.json?engine=google_patents")
      .operationId("searchGooglePatents")
      .tag("Google")
      .extension("x-serpapi-engine", "google_patents")
      .extension("x-serpapi-real-path", "/search.json")
      .example("coffee", { summary: "Google Patents example: coffee", value: GooglePatentsCoffeeExample });

    g.get("/google_patents_details")
      .query(
        Type.Object({
          patent_id: Type.String({
            description:
              "Parameter defines the ID of the patent you want to retrieve. You can get it from the results of our Google Patents API. It can be: - A patent ID: `patent//`, the country code can be omitted (e.g. `patent/US11734097B1/en` or `patent/US11734097B1`) - A scholar ID: `scholar/` (e.g. `scholar/6497879044063343659`)",
          }),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Patents Details results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Patents Details search results" }))
      .summary("Google Patents Details")
      .description("Search via Google Patents Details. Real API: GET /search.json?engine=google_patents_details")
      .operationId("searchGooglePatentsDetails")
      .tag("Google")
      .extension("x-serpapi-engine", "google_patents_details")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_play")
      .query(
        Type.Object({
          q: Type.Optional(
            Type.String({ description: "Parameter defines the query you want to search in Google Play Apps Store." }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Play search. It's a two-letter country code. (e.g., `us` (default) for the United States, `uk` for United Kingdom, or `fr` for France). You can find the full list of Google Play country availability here: Google Play Countries. Afterwards, head to the Google countries page page for a two-letter country code.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Play search. It's a two-letter language code. (e.g., `en` (default) for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          apps_category: Type.Optional(
            Type.String({
              description:
                "Parameter defines the apps store category. Head to the Google Play store Apps Categories for a full list of supported Google Play Apps store categories.. Valid values include: ART_AND_DESIGN, AUTO_AND_VEHICLES, BEAUTY, BOOKS_AND_REFERENCE, BUSINESS, COMICS, COMMUNICATION, DATING, EDUCATION, ENTERTAINMENT, and 25 more",
            }),
          ),
          store_device: Type.Optional(
            Type.Union(
              [
                Type.Literal("phone"),
                Type.Literal("tablet"),
                Type.Literal("tv"),
                Type.Literal("chromebook"),
                Type.Literal("watch"),
                Type.Literal("car"),
              ],
              {
                description:
                  "Parameter defines the device for sorting results. This parameter cannot be used with apps\\_category or q parameters. Available options: `phone` - Phone device (default) `tablet` - Tablet device `tv` - TV device `chromebook` - Chromebook device `watch` - Watch device `car` - Car device",
              },
            ),
          ),
          age: Type.Optional(
            Type.Union([Type.Literal("AGE_RANGE1"), Type.Literal("AGE_RANGE2"), Type.Literal("AGE_RANGE3")], {
              description:
                "Parameter defines age subcategory. age works, and should only be used with `apps_category=FAMILY`(Kids Apps) It can be set to: `AGE_RANGE1` - Ages up to 5 `AGE_RANGE2` - Ages 6-8 `AGE_RANGE3` - Ages 9-12 The default value for age is: - All ages up to 12",
            }),
          ),
          next_page_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the next page token. It is used for retrieving the next page results. It shouldn't be used with the section\\_page\\_token, see\\_more\\_token, and chart parameters.",
            }),
          ),
          section_page_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the section page token used for retrieving the pagination results from individual sections. This parameter is a safer version of see\\_more\\_token, and is found in every row you can paginate into. It shouldn't be used with the next\\_page\\_token, see\\_more\\_token, and chart parameters",
            }),
          ),
          chart: Type.Optional(
            Type.String({
              description:
                "Parameter is used for showing top charts. It can return up to `50` results. Each store contains different charts which require different values for retrieving results. To get the value of a specific chart you can use our Google Play Apps Store API JSON output: `chart_options[index].value` (e.g. `chart=topselling_free`). It shouldn't be used with the section\\_page\\_token, see\\_more\\_token, and next\\_page\\_token parameters",
            }),
          ),
          see_more_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the see more token used for retrieving the pagination results from individual sections It is usually found in next page results. It shouldn't be used with the section\\_page\\_token, next\\_page\\_token, and chart, parameters",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Play results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Play search results" }))
      .summary("Google Play")
      .description("Search via Google Play. Real API: GET /search.json?engine=google_play")
      .operationId("searchGooglePlay")
      .tag("Google")
      .extension("x-serpapi-engine", "google_play")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_play_books")
      .query(
        Type.Object({
          q: Type.Optional(
            Type.String({ description: "Parameter defines the query you want to search in Google Play Books Store." }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Play search. It's a two-letter country code. (e.g., `us` (default) for the United States, `uk` for United Kingdom, or `fr` for France). You can find the full list of Google Play country availability here: Google Play Countries. Afterwards, head to the Google countries page page for a two-letter country code.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Play search. It's a two-letter language code. (e.g., `en` (default) for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          books_category: Type.Optional(
            Type.String({
              description:
                "Parameter defines the books store category. Head to the Google Play store Books Categories for a full list of supported Google Play Books store categories.. Valid values include: coll_1665, subj_Art___Humor.AH_Art, subj_Art___Humor.AH_Drama, subj_Art___Humor.AH_Humor, subj_Art___Humor.AH_Music, subj_Art___Humor.AH_Performing_Arts, coll_1204, subj_Biography___Autobiography.General, subj_Biography___Autobiography.Adventurers___Explorers, subj_Biography___Autobiography.Business, and 444 more",
            }),
          ),
          price: Type.Optional(
            Type.Union([Type.Literal("1"), Type.Literal("2")], {
              description:
                "Parameter is used for sorting items by price. It should be used only in combination with the q parameter. It can be set to: `1` - Free `2` - Paid",
            }),
          ),
          age: Type.Optional(
            Type.Union([Type.Literal("AGE_RANGE1"), Type.Literal("AGE_RANGE2"), Type.Literal("AGE_RANGE3")], {
              description:
                "Parameter defines age subcategory. age works, and should only be used with `books_category=coll_1689` (Children's books) It can be set to: `AGE_RANGE1` - Ages up to 5 `AGE_RANGE2` - Ages 6-8 `AGE_RANGE3` - Ages 9-12 The default value for age is: - All ages up to 12",
            }),
          ),
          next_page_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the next page token. It is used for retrieving the next page results. It shouldn't be used with the section\\_page\\_token, see\\_more\\_token, and chart parameters.",
            }),
          ),
          section_page_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the section page token used for retrieving the pagination results from individual sections. This parameter is a safer version of see\\_more\\_token, and is found in every row you can paginate into. It shouldn't be used with the next\\_page\\_token, see\\_more\\_token, and chart parameters",
            }),
          ),
          chart: Type.Optional(
            Type.String({
              description:
                "Parameter is used for showing top charts. It can return up to `50` results. Each store contains different charts which require different values for retrieving results. To get the value of a specific chart you can use our Google Play Books Store API JSON output: `chart_options[index].value` (e.g. `chart=topselling_free`). It shouldn't be used with the section\\_page\\_token, see\\_more\\_token, and next\\_page\\_token parameters",
            }),
          ),
          see_more_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the see more token used for retrieving the pagination results from individual sections It is usually found in next page results. It shouldn't be used with the section\\_page\\_token, next\\_page\\_token, and chart, parameters",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Play Books results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Play Books search results" }))
      .summary("Google Play Books")
      .description("Search via Google Play Books. Real API: GET /search.json?engine=google_play_books")
      .operationId("searchGooglePlayBooks")
      .tag("Google")
      .extension("x-serpapi-engine", "google_play_books")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_play_games")
      .query(
        Type.Object({
          q: Type.Optional(
            Type.String({ description: "Parameter defines the query you want to search in Google Play Games Store." }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Play search. It's a two-letter country code. (e.g., `us` (default) for the United States, `uk` for United Kingdom, or `fr` for France). You can find the full list of Google Play country availability here: Google Play Countries. Afterwards, head to the Google countries page page for a two-letter country code.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Play search. It's a two-letter language code. (e.g., `en` (default) for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          games_category: Type.Optional(
            Type.Union(
              [
                Type.Literal("GAME"),
                Type.Literal("GAME_ACTION"),
                Type.Literal("GAME_ADVENTURE"),
                Type.Literal("GAME_ARCADE"),
                Type.Literal("GAME_BOARD"),
                Type.Literal("GAME_CARD"),
                Type.Literal("GAME_CASINO"),
                Type.Literal("GAME_CASUAL"),
                Type.Literal("GAME_EDUCATIONAL"),
                Type.Literal("GAME_MUSIC"),
                Type.Literal("GAME_PUZZLE"),
                Type.Literal("GAME_RACING"),
                Type.Literal("GAME_ROLE_PLAYING"),
                Type.Literal("GAME_SIMULATION"),
                Type.Literal("GAME_SPORTS"),
                Type.Literal("GAME_STRATEGY"),
                Type.Literal("GAME_TRIVIA"),
                Type.Literal("GAME_WORD"),
              ],
              {
                description:
                  "Parameter defines the games store category. Head to the Google Play store Games Categories for a full list of supported Google Play Games store categories.",
              },
            ),
          ),
          store_device: Type.Optional(
            Type.Union(
              [
                Type.Literal("phone"),
                Type.Literal("windows"),
                Type.Literal("tablet"),
                Type.Literal("tv"),
                Type.Literal("chromebook"),
                Type.Literal("watch"),
              ],
              {
                description:
                  "Parameter defines the device for sorting results. This parameter cannot be used with games\\_category or q parameters. Available options: `phone` - Phone device (default) `windows` - Windows device `tablet` - Tablet device `tv` - TV device `chromebook` - Chromebook device `watch` - Watch device",
              },
            ),
          ),
          next_page_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the next page token. It is used for retrieving the next page results. It shouldn't be used with the section\\_page\\_token, see\\_more\\_token, and chart parameters.",
            }),
          ),
          section_page_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the section page token used for retrieving the pagination results from individual sections. This parameter is a safer version of see\\_more\\_token, and is found in every row you can paginate into. It shouldn't be used with the next\\_page\\_token, see\\_more\\_token, and chart parameters",
            }),
          ),
          chart: Type.Optional(
            Type.String({
              description:
                "Parameter is used for showing top charts. It can return up to `50` results. Each store contains different charts which require different values for retrieving results. To get the value of a specific chart you can use our Google Play Games Store API JSON output: `chart_options[index].value` (e.g. `chart=topselling_free`). It shouldn't be used with the section\\_page\\_token, see\\_more\\_token, and next\\_page\\_token parameters",
            }),
          ),
          see_more_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the see more token used for retrieving the pagination results from individual sections It is usually found in next page results. It shouldn't be used with the section\\_page\\_token, next\\_page\\_token, and chart, parameters",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Play Games results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Play Games search results" }))
      .summary("Google Play Games")
      .description("Search via Google Play Games. Real API: GET /search.json?engine=google_play_games")
      .operationId("searchGooglePlayGames")
      .tag("Google")
      .extension("x-serpapi-engine", "google_play_games")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_play_movies")
      .query(
        Type.Object({
          q: Type.Optional(
            Type.String({ description: "Parameter defines the query you want to search in Google Play Movies Store." }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Play search. It's a two-letter country code. (e.g., `us` (default) for the United States, `uk` for United Kingdom, or `fr` for France). You can find the full list of Google Play country availability here: Google Play Countries. Afterwards, head to the Google countries page for a two-letter country code.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Play search. It's a two-letter language code. (e.g., `en` (default) for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          movies_category: Type.Optional(
            Type.String({
              description:
                "Parameter defines the movies store category. Head to the Google Play store Movies Categories for a full list of supported Google Play Books store categories.. Valid values include: MOVIE, 1, 2, 40, 3, 4, 5, 7, 6, 8, and 31 more",
            }),
          ),
          age: Type.Optional(
            Type.Union([Type.Literal("AGE_RANGE1"), Type.Literal("AGE_RANGE2"), Type.Literal("AGE_RANGE3")], {
              description:
                "Parameter defines age subcategory. age works, and should only be used with `movies_category=FAMILY` (Family Movies) It can be set to: `AGE_RANGE1` - Ages up to 5 `AGE_RANGE2` - Ages 6-8 `AGE_RANGE3` - Ages 9-12 The default value for age is: - All ages up to 12",
            }),
          ),
          next_page_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the next page token. It is used for retrieving the next page results. It shouldn't be used with the section\\_page\\_token, see\\_more\\_token, and chart parameters.",
            }),
          ),
          section_page_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the section page token used for retrieving the pagination results from individual sections. This parameter is a safer version of see\\_more\\_token, and is found in every row you can paginate into. It shouldn't be used with the next\\_page\\_token, see\\_more\\_token, and chart parameters",
            }),
          ),
          chart: Type.Optional(
            Type.String({
              description:
                "Parameter is used for showing top charts. It can return up to `50` results. Each store contains different charts which require different values for retrieving results. To get the value of a specific chart you can use our Google Play Movies Store API JSON output: `chart_options[index].value` (e.g. `chart=topselling_free`). It shouldn't be used with the section\\_page\\_token, see\\_more\\_token, and next\\_page\\_token parameters",
            }),
          ),
          see_more_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the see more token used for retrieving the pagination results from individual sections It is usually found in next page results. It shouldn't be used with the section\\_page\\_token, next\\_page\\_token, and chart, parameters",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Play Movies results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Play Movies search results" }))
      .summary("Google Play Movies")
      .description("Search via Google Play Movies. Real API: GET /search.json?engine=google_play_movies")
      .operationId("searchGooglePlayMovies")
      .tag("Google")
      .extension("x-serpapi-engine", "google_play_movies")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_play_product")
      .query(
        Type.Object({
          product_id: Type.String({
            description: "Parameter defines the ID of a product you want to get the results for.",
          }),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Play search. It's a two-letter country code. (e.g., `us` (default) for the United States, `uk` for United Kingdom, or `fr` for France). You can find the full list of Google Play country availability here: Google Play Countries. Afterwards, head to the Google countries page page for a two-letter country code.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Play search. It's a two-letter language code. (e.g., `en` (default) for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          store: Type.Union(
            [
              Type.Literal("apps"),
              Type.Literal("movies"),
              Type.Literal("tv"),
              Type.Literal("books"),
              Type.Literal("audiobooks"),
            ],
            {
              description:
                "Parameter defines the type of Google Play store. There are five types in total: `apps` (default), `movies`, `tv`, `books` and `audiobooks` store.",
            },
          ),
          season_id: Type.Optional(
            Type.String({
              description:
                "Parameter defines the ID of a season you want to get the results for. It should be used only when store parameter is set to `tv`. e.g. `store=tv`.",
            }),
          ),
          all_reviews: Type.Optional(
            Type.Boolean({
              description:
                "Parameter is used for retrieving all reviews of a product. It can be set to `true` or `false` (default).",
            }),
          ),
          platform: Type.Optional(
            Type.Union(
              [
                Type.Literal("phone"),
                Type.Literal("tablet"),
                Type.Literal("watch"),
                Type.Literal("chromebook"),
                Type.Literal("tv"),
                Type.Literal("car"),
              ],
              {
                description:
                  "Parameter is used for filtering reviews by platform. It can be set to: `phone`: Phone (default), `tablet`: Tablet, `watch`: Watch, `chromebook`: Chromebook, `tv`: TV. It should be used only when all\\_reviews parameter is set to `true`.",
              },
            ),
          ),
          rating: Type.Optional(
            Type.Union(
              [Type.Literal("1"), Type.Literal("2"), Type.Literal("3"), Type.Literal("4"), Type.Literal("5")],
              {
                description:
                  "Parameter is used for filtering reviews by rating. It can be set to: `1`: 1-star, `2`: 2-star, `3`: 3-star, `4`: 4-star, `5`: 5-star. It should be used only when all\\_reviews parameter is set to `true`.",
              },
            ),
          ),
          sort_by: Type.Optional(
            Type.Union([Type.Literal("1"), Type.Literal("2"), Type.Literal("3")], {
              description:
                "Parameter is used for sorting reviews by relevance. It can be set to: `1`: Most relevant (default), `2`: Newest, `3`: Rating. It should be used only when all\\_reviews parameter is set to `true`.",
            }),
          ),
          num: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the maximum number of reviews to return. (e.g., `40` (default) returns 40 reviews, `80` returns 80 reviews, and `100` returns 100 reviews). Maximum number of reviews you can return per search is `199`. It should be used only when all\\_reviews parameter is set to `true`.",
            }),
          ),
          next_page_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the next page token. It is used for retrieving the next page results. It should be used only when all\\_reviews parameter is set to `true`.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Play Product results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Play Product search results" }))
      .summary("Google Play Product")
      .description("Search via Google Play Product. Real API: GET /search.json?engine=google_play_product")
      .operationId("searchGooglePlayProduct")
      .tag("Google")
      .extension("x-serpapi-engine", "google_play_product")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_related_questions")
      .query(
        Type.Object({
          next_page_token: Type.String({
            description:
              "Parameter defines the token needed to show the additional related questions that Google generates when a specific question gets clicked. This token can be found in the Related Questions block returned in a regular Google Search API response.",
          }),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Related Questions results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Related Questions search results" }))
      .summary("Google Related Questions")
      .description("Search via Google Related Questions. Real API: GET /search.json?engine=google_related_questions")
      .operationId("searchGoogleRelatedQuestions")
      .tag("Google")
      .extension("x-serpapi-engine", "google_related_questions")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_reverse_image")
      .query(
        Type.Object({
          q: Type.Optional(
            Type.String({
              description:
                "Parameter defines the query you want to search. You can also include location in a query as location parameter doesn't work for this kind of search.",
            }),
          ),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          google_domain: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google domain to use. It defaults to `google.com`. Head to the Google domains page for a full list of supported Google domains.. Valid values include: google.com, google.ad, google.ae, google.com.af, google.com.ag, google.com.ai, google.al, google.am, google.co.ao, google.com.ar, and 175 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Reverse Image search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          lr: Type.Optional(
            Type.String({
              description:
                "Parameter defines one or multiple languages to limit the search to. It uses `lang_{two-letter language code}` to specify languages and `|` as a delimiter. (e.g., `lang_fr|lang_de` will only search French and German pages).",
            }),
          ),
          start: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `10` is the 2nd page of results, `20` is the 3rd page of results, etc.).",
            }),
          ),
          image_url: Type.String({ description: "Parameter defines URL for an image to perform reverse search." }),
          safe: Type.Optional(
            Type.Union([Type.Literal("active"), Type.Literal("off")], {
              description:
                "Parameter defines the level of filtering for adult content. It can be set to `active` or `off`, by default Google will blur explicit content.",
            }),
          ),
          tbs: Type.Optional(
            Type.String({
              description:
                "(to be searched) parameter defines advanced search parameters that aren't possible in the regular query field. (e.g., advanced search for dates, size, etc.).",
            }),
          ),
          device: Type.Optional(
            Type.String({
              description:
                "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Reverse Image results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Reverse Image search results" }))
      .summary("Google Reverse Image")
      .description("Search via Google Reverse Image. Real API: GET /search.json?engine=google_reverse_image")
      .operationId("searchGoogleReverseImage")
      .tag("Google")
      .extension("x-serpapi-engine", "google_reverse_image")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_scholar")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. You can also use helpers in your query such as: `author:`, or `source:`. Usage of `cites` parameter makes `q` optional. Usage of `cites` together with `q` triggers search within citing articles. Usage of `cluster` together with `q` and `cites` parameters is prohibited. Use `cluster` parameter only.",
          }),
          cites: Type.Optional(
            Type.String({
              description:
                "Parameter defines unique ID for an article to trigger Cited By searches. Usage of `cites` will bring up a list of citing documents in Google Scholar. Example value: `cites=1275980731835430123`. Usage of `cites` and `q` parameters triggers search within citing articles.",
            }),
          ),
          as_ylo: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the year from which you want the results to be included. (e.g. if you set as\\_ylo parameter to the year `2018`, the results before that year will be omitted.). This parameter can be combined with the as\\_yhi parameter.",
            }),
          ),
          as_yhi: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the year until which you want the results to be included. (e.g. if you set as\\_yhi parameter to the year `2018`, the results after that year will be omitted.). This parameter can be combined with the as\\_ylo parameter.",
            }),
          ),
          scisbd: Type.Optional(
            Type.Union([Type.Literal(1), Type.Literal(2)], {
              description:
                "Parameter defines articles added in the last year, sorted by date. It can be set to `1` to include only abstracts, or `2` to include everything. The default value is `0` which means that the articles are sorted by relevance.",
            }),
          ),
          cluster: Type.Optional(
            Type.String({
              description:
                "Parameter defines unique ID for an article to trigger All Versions searches. Example value: `cluster=1275980731835430123`. Usage of `cluster` together with `q` and `cites` parameters is prohibited. Use `cluster` parameter only.",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Scholar search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          lr: Type.Optional(
            Type.String({
              description:
                "Parameter defines one or multiple languages to limit the search to. It uses `lang_{two-letter language code}` to specify languages and `|` as a delimiter. (e.g., `lang_fr|lang_de` will only search French and German pages). Head to the Google lr languages for a full list of supported languages.",
            }),
          ),
          start: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `10` is the 2nd page of results, `20` is the 3rd page of results, etc.).",
            }),
          ),
          num: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the maximum number of results to return, ranging from `1` to `20`, with a default of `10`.",
            }),
          ),
          as_sdt: Type.Optional(
            Type.String({
              description:
                "Parameter can be used either as a search type or a filter. **As a Filter** (only works when searching articles): `0` - exclude patents (default). `7` - include patents. **As a Search Type**: `4` - Select case law (US courts only). This will select all the State and Federal courts. e.g. `as_sdt=4` - Selects case law (all courts) To select specific courts, see the full list of supported Google Scholar courts. e.g. `as_sdt=4,33,192` - `4` is the required value and should always be in the first position, `33` selects all New York courts and `192` selects Tax Court. Values have to be separated by comma (`,`)",
            }),
          ),
          safe: Type.Optional(
            Type.Union([Type.Literal("active"), Type.Literal("off")], {
              description:
                "Parameter defines the level of filtering for adult content. It can be set to `active` or `off`, by default Google will blur explicit content.",
            }),
          ),
          filter: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines if the filters for 'Similar Results' and 'Omitted Results' are on or off. It can be set to `1` (default) to enable these filters, or `0` to disable these filters.",
            }),
          ),
          as_vis: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines whether you would like to include citations or not. It can be set to `1` to exclude these results, or `0` (default) to include them.",
            }),
          ),
          as_rr: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines whether you would like to show only review articles or not (these articles consist of topic reviews, or discuss the works or authors you have searched for). It can be set to `1` to enable this filter, or `0` (default) to show all results.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Scholar results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Scholar search results" }))
      .summary("Google Scholar")
      .description("Search via Google Scholar. Real API: GET /search.json?engine=google_scholar")
      .operationId("searchGoogleScholar")
      .tag("Google")
      .extension("x-serpapi-engine", "google_scholar")
      .extension("x-serpapi-real-path", "/search.json")
      .example("biology", { summary: "Google Scholar example: biology", value: GoogleScholarBiologyExample });

    g.get("/google_scholar_author")
      .query(
        Type.Object({
          author_id: Type.String({
            description:
              "Parameter defines the ID of an author. You can find the ID either by using our Google Scholar Profiles API or by going to the Google Scholar user profile page and getting it from there (e.g., `https://scholar.google.com/citations?user={author_id}`).",
          }),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Scholar Author search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          view_op: Type.Optional(
            Type.Union([Type.Literal("view_citation"), Type.Literal("list_colleagues")], {
              description:
                "Parameter is used for viewing specific parts of a page. It has two options: `view_citation` - Select to view citations. citation\\_id is required. `list_colleagues` - Select to view all co-authors",
            }),
          ),
          sort: Type.Optional(
            Type.Union([Type.Literal("title"), Type.Literal("pubdate")], {
              description:
                'Parameter is used for sorting and refining articles. Available options: `title` - Sorts articles by "Title". `pubdate` - Sorts articles by publish "date". By default, articles are sorted by the number of citations.',
            }),
          ),
          citation_id: Type.Optional(
            Type.String({
              description:
                "Parameter is used for retrieving individual article citation. It is a required parameter when `view_op=view_citation` is selected. You can access IDs inside our structured JSON response.",
            }),
          ),
          start: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `20` is the 2nd page of results, `40` is the 3rd page of results, etc.).",
            }),
          ),
          num: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the number of results to return. (e.g., `20` (default) returns 20 results, `40` returns 40 results, etc.). Maximum number of results to return is `100`.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Scholar Author results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Scholar Author search results" }))
      .summary("Google Scholar Author")
      .description("Search via Google Scholar Author. Real API: GET /search.json?engine=google_scholar_author")
      .operationId("searchGoogleScholarAuthor")
      .tag("Google")
      .extension("x-serpapi-engine", "google_scholar_author")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_scholar_cite")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the ID of an individual Google Scholar organic search result. You can find the ID inside the `result_id` by using our Google Scholar API.",
          }),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Scholar Cite. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Scholar Cite results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Scholar Cite search results" }))
      .summary("Google Scholar Cite")
      .description("Search via Google Scholar Cite. Real API: GET /search.json?engine=google_scholar_cite")
      .operationId("searchGoogleScholarCite")
      .tag("Google")
      .extension("x-serpapi-engine", "google_scholar_cite")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_shopping")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. You can use anything that you would use in a regular Google Shopping search.",
          }),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          google_domain: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google domain to use. It defaults to `google.com`. Head to the Google domains for a full list of supported Google domains.. Valid values include: google.com, google.ad, google.ae, google.com.af, google.com.ag, google.com.ai, google.al, google.am, google.co.ao, google.com.ar, and 175 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google Shopping countries for a full list of supported Google Shopping countries.. Valid values include: ai, ar, aw, au, at, be, bm, br, io, ca, and 64 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Shopping search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French) Head to the Google languages for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          as_dt: Type.Optional(
            Type.String({
              description:
                "Parameter controls whether to include or exclude results from the site named in the as\\_sitesearch parameter.",
            }),
          ),
          as_epq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a phrase that all documents in the search results must contain. You can also use the phrase search query term to search for a phrase.",
            }),
          ),
          as_eq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a word or phrase that should not appear in any documents in the search results. You can also use the exclude query term to ensure that a particular word or phrase will not appear in the documents in a set of search results.",
            }),
          ),
          as_lq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should contain a link to a particular URL. You can also use the link: query term for this type of query.",
            }),
          ),
          as_nlo: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the starting value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_nhi: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the ending value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_oq: Type.Optional(
            Type.String({
              description:
                "Parameter provides additional search terms to check for in a document, where each document in the search results must contain at least one of the additional search terms. You can also use the Boolean OR query term for this type of query.",
            }),
          ),
          as_q: Type.Optional(
            Type.String({
              description:
                "Parameter provides search terms to check for in a document. This parameter is also commonly used to allow users to specify additional terms to search for within a set of search results.",
            }),
          ),
          as_qdr: Type.Optional(
            Type.String({
              description:
                "Parameter requests search results from a specified time period (quick date range). The following values are supported: `d[number]`: requests results from the specified number of past days. Example for the past 10 days: `as_qdr=d10` `w[number]`: requests results from the specified number of past weeks. `m[number]`: requests results from the specified number of past months. `y[number]`: requests results from the specified number of past years. Example for the past year: `as_qdr=y`",
            }),
          ),
          as_rq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should be pages that are related to the specified URL. The parameter value should be a URL. You can also use the related: query term for this type of query.",
            }),
          ),
          as_sitesearch: Type.Optional(
            Type.String({
              description:
                "Parameter allows you to specify that all search results should be pages from a given site. By setting the as\\_dt parameter, you can also use it to exclude pages from a given site from your search results.",
            }),
          ),
          shoprs: Type.Optional(
            Type.String({
              description:
                "The parameter defines the token that includes metadata about query and search filter(s). Providing q parameter alongside the shoprs is **not** required. To apply multiple filters join them with `||` separator, e.g. `shoprs_1||shoprs_2||shoprs_3`.",
            }),
          ),
          min_price: Type.Optional(
            Type.Number({
              description:
                "Lower bound of price range query. This parameter overrides corresponding filter embedded into shoprs parameter.",
            }),
          ),
          max_price: Type.Optional(
            Type.Number({
              description:
                "Upper bound of price range query. This parameter overrides corresponding filter embedded into shoprs parameter.",
            }),
          ),
          sort_by: Type.Optional(
            Type.Union([Type.Literal("1"), Type.Literal("2")], {
              description:
                "Parameter defines the sorting order of the results. Available options: `1` - Price: low to high `2` - Price: high to low This parameter overrides corresponding filter embedded into shoprs parameter.",
            }),
          ),
          free_shipping: Type.Optional(
            Type.Boolean({
              description:
                "Show only products with free shipping. This parameter overrides corresponding filter embedded into shoprs parameter.",
            }),
          ),
          on_sale: Type.Optional(
            Type.Boolean({
              description:
                "Show only products that are on sale. This parameter overrides corresponding filter embedded into shoprs parameter.",
            }),
          ),
          small_business: Type.Optional(
            Type.Boolean({
              description:
                "Show only products from small business. This parameter overrides corresponding filter embedded into shoprs parameter.",
            }),
          ),
          start: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `60` is the 2nd page of results, `120` is the 3rd page of results, etc.). For the new layout, the parameter is not recommended. To easily retrieve paginated results accurately, it is advisable to follow the link provided in `serpapi_pagination.next`.",
            }),
          ),
          device: Type.Optional(
            Type.String({
              description:
                "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Shopping results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(GoogleShoppingResponse)
      .summary("Google Shopping")
      .description("Search via Google Shopping. Real API: GET /search.json?engine=google_shopping")
      .operationId("searchGoogleShopping")
      .tag("Google")
      .extension("x-serpapi-engine", "google_shopping")
      .extension("x-serpapi-real-path", "/search.json")
      .example("office-chair", {
        summary: "Google Shopping example: office chair",
        value: GoogleShoppingOfficeChairExample,
      });

    g.get("/google_shopping_filters")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. You can use anything that you would use in a regular Google Shopping search.",
          }),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          google_domain: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google domain to use. It defaults to `google.com`. Head to the Google domains for a full list of supported Google domains.. Valid values include: google.com, google.ad, google.ae, google.com.af, google.com.ag, google.com.ai, google.al, google.am, google.co.ao, google.com.ar, and 175 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google countries for a full list of supported Google countries.. Valid values include: ai, ar, aw, au, at, be, bm, br, io, ca, and 64 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Shopping search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French) Head to the Google languages for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          shoprs: Type.Optional(
            Type.String({
              description: "The parameter defines the token that includes metadata about query and search filter(s).",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Shopping Filters results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Shopping Filters search results" }))
      .summary("Google Shopping Filters")
      .description("Search via Google Shopping Filters. Real API: GET /search.json?engine=google_shopping_filters")
      .operationId("searchGoogleShoppingFilters")
      .tag("Google")
      .extension("x-serpapi-engine", "google_shopping_filters")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_shopping_light")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. You can use anything that you would use in a regular Google Shopping search.",
          }),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          google_domain: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google domain to use. It defaults to `google.com`. Head to the Google domains for a full list of supported Google domains.. Valid values include: google.com, google.ad, google.ae, google.com.af, google.com.ag, google.com.ai, google.al, google.am, google.co.ao, google.com.ar, and 175 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google Shopping countries for a full list of supported Google countries.. Valid values include: ai, ar, aw, au, at, be, bm, br, io, ca, and 64 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Shopping search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French) Head to the Google languages for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          shoprs: Type.Optional(
            Type.String({
              description:
                "The parameter defines the token that includes metadata about query and search filter(s). Providing q parameter alongside the shoprs is **not** required. To apply multiple filters join them with `||` separator, e.g. `shoprs_1||shoprs_2||shoprs_3`. Values for this parameter are not available through the Google Shopping Light API. You can use our Google Shopping API to retrieve the values, or you can visit the Google Shopping website directly, set filters you want and simply copy shoprs value from their URL to SerpApi URL.",
            }),
          ),
          min_price: Type.Optional(
            Type.Number({
              description:
                "Lower bound of price range query. This parameter overrides corresponding filter embedded into shoprs parameter.",
            }),
          ),
          max_price: Type.Optional(
            Type.Number({
              description:
                "Upper bound of price range query. This parameter overrides corresponding filter embedded into shoprs parameter.",
            }),
          ),
          sort_by: Type.Optional(
            Type.Union([Type.Literal("1"), Type.Literal("2")], {
              description:
                "Parameter defines the sorting order of the results. Available options: `1` - Price: low to high `2` - Price: high to low This parameter overrides corresponding filter embedded into shoprs parameter.",
            }),
          ),
          free_shipping: Type.Optional(
            Type.Boolean({
              description:
                "Show only products with free shipping. This parameter overrides corresponding filter embedded into shoprs parameter.",
            }),
          ),
          on_sale: Type.Optional(
            Type.Boolean({
              description:
                "Show only products that are on sale. This parameter overrides corresponding filter embedded into shoprs parameter.",
            }),
          ),
          small_business: Type.Optional(
            Type.Boolean({
              description:
                "Show only products from small business. This parameter overrides corresponding filter embedded into shoprs parameter.",
            }),
          ),
          start: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `10` is the 2nd page of results, `20` is the 3rd page of results, etc.).",
            }),
          ),
          device: Type.Optional(
            Type.String({
              description:
                "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Shopping Light results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(GoogleShoppingResponse)
      .summary("Google Shopping Light")
      .description("Search via Google Shopping Light. Real API: GET /search.json?engine=google_shopping_light")
      .operationId("searchGoogleShoppingLight")
      .tag("Google")
      .extension("x-serpapi-engine", "google_shopping_light")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_short_videos")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. You can use anything that you would use in a regular Google Short Videos search. e.g. `inurl:`, `site:`, `intitle:`. We also support advanced search query parameters such as as\\_dt and as\\_eq. See the full list of supported advanced search query parameters.",
          }),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          google_domain: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google domain to use. It defaults to `google.com`. Head to the Google domains page for a full list of supported Google domains.. Valid values include: google.com, google.ad, google.ae, google.com.af, google.com.ag, google.com.ai, google.al, google.am, google.co.ao, google.com.ar, and 175 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France). Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          lr: Type.Optional(
            Type.String({
              description:
                "Parameter defines one or multiple languages to limit the search to. It uses `lang_{two-letter language code}` to specify languages and `|` as a delimiter. (e.g., `lang_fr|lang_de` will only search French and German pages). Head to the Google lr languages page for a full list of supported languages.",
            }),
          ),
          as_dt: Type.Optional(
            Type.String({
              description:
                "Parameter controls whether to include or exclude results from the site named in the as\\_sitesearch parameter.",
            }),
          ),
          as_epq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a phrase that all documents in the search results must contain. You can also use the phrase search query term to search for a phrase.",
            }),
          ),
          as_eq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a word or phrase that should not appear in any documents in the search results. You can also use the exclude query term to ensure that a particular word or phrase will not appear in the documents in a set of search results.",
            }),
          ),
          as_lq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should contain a link to a particular URL. You can also use the link: query term for this type of query.",
            }),
          ),
          as_nlo: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the starting value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_nhi: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the ending value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_oq: Type.Optional(
            Type.String({
              description:
                "Parameter provides additional search terms to check for in a document, where each document in the search results must contain at least one of the additional search terms. You can also use the Boolean OR query term for this type of query.",
            }),
          ),
          as_q: Type.Optional(
            Type.String({
              description:
                "Parameter provides search terms to check for in a document. This parameter is also commonly used to allow users to specify additional terms to search for within a set of search results.",
            }),
          ),
          as_qdr: Type.Optional(
            Type.String({
              description:
                "Parameter requests search results from a specified time period (quick date range). The following values are supported: `d[number]`: requests results from the specified number of past days. Example for the past 10 days: `as_qdr=d10` `w[number]`: requests results from the specified number of past weeks. `m[number]`: requests results from the specified number of past months. `y[number]`: requests results from the specified number of past years. Example for the past year: `as_qdr=y`",
            }),
          ),
          as_rq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should be pages that are related to the specified URL. The parameter value should be a URL. You can also use the related: query term for this type of query.",
            }),
          ),
          as_sitesearch: Type.Optional(
            Type.String({
              description:
                "Parameter allows you to specify that all search results should be pages from a given site. By setting the as\\_dt parameter, you can also use it to exclude pages from a given site from your search results.",
            }),
          ),
          tbs: Type.Optional(
            Type.String({
              description:
                "(to be searched) parameter defines advanced search parameters that aren't possible in the regular query field. (e.g., advanced search for patents, dates, news, videos, images, apps, or text contents).",
            }),
          ),
          safe: Type.Optional(
            Type.Union([Type.Literal("active"), Type.Literal("off")], {
              description:
                "Parameter defines the level of filtering for adult content. It can be set to `active` or `off`, by default Google will blur explicit content.",
            }),
          ),
          nfpr: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines the exclusion of results from an auto-corrected query when the original query is spelled wrong. It can be set to `1` to exclude these results, or `0` to include them (default). Note that this parameter may not prevent Google from returning results for an auto-corrected query if no other results are available.",
            }),
          ),
          filter: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines if the filters for 'Similar Results' and 'Omitted Results' are on or off. It can be set to `1` (default) to enable these filters, or `0` to disable these filters.",
            }),
          ),
          start: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `12` (desktop) or `8` (mobile) is the 2nd page of results, etc.).",
            }),
          ),
          device: Type.Optional(
            Type.String({
              description:
                "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Short Videos results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Short Videos search results" }))
      .summary("Google Short Videos")
      .description("Search via Google Short Videos. Real API: GET /search.json?engine=google_short_videos")
      .operationId("searchGoogleShortVideos")
      .tag("Google")
      .extension("x-serpapi-engine", "google_short_videos")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_travel_explore")
      .query(
        Type.Object({
          departure_id: Type.Optional(
            Type.String({
              description:
                'Parameter defines the departure airport code or city location kgmid. An airport code is an uppercase 3-letter code. You can search for it on Google Flights or IATA. For example, `CDG` is Paris Charles de Gaulle Airport and `AUS` is Austin-Bergstrom International Airport. A location kgmid is a string that starts with `/m/`. You can search for a location on Wikidata and use its "Freebase ID" as the location kgmid. For example, `/m/0vzm` is the location kgmid for Austin, TX. You can specify multiple departure airports by separating them with a comma. For example, `CDG,ORY,/m/04jpl`.',
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google Travel Explore search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France) Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Travel Explore search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          currency: Type.Optional(
            Type.String({
              description:
                "Parameter defines the currency of the returned prices. Default to `USD`. Head to the Google Travel Currencies page for a full list of supported currency codes.. Valid values include: ALL, DZD, ARS, AMD, AWG, AUD, AZN, BSD, BHD, BYN, and 61 more",
            }),
          ),
          arrival_area_id: Type.Optional(
            Type.String({
              description:
                'Parameter defines the arrival region or country as a location kgmid. A location kgmid is a string that starts with `/m/`. You can search for a region or country on Wikidata and use its "Freebase ID" as the location kgmid. For example, `/m/02j9z` is the location kgmid for Europe, and `/m/0f8l9c` is the location kgmid for France. This parameter is used when exploring flights to broader areas (regions or countries) rather than specific cities or airports.',
            }),
          ),
          arrival_id: Type.Optional(
            Type.String({
              description:
                'Parameter defines the arrival airport code or city location kgmid. An airport code is an uppercase 3-letter code. You can search for it on Google Flights or IATA. For example, `CDG` is Paris Charles de Gaulle Airport and `AUS` is Austin-Bergstrom International Airport. A location kgmid is a string that starts with `/m/`. You can search for a location on Wikidata and use its "Freebase ID" as the location kgmid. For example, `/m/0vzm` is the location kgmid for Austin, TX.',
            }),
          ),
          type: Type.Optional(
            Type.Union([Type.Literal("1"), Type.Literal("2")], {
              description:
                "Parameter defines the type of the flights. Available options: `1` - Round trip (default) `2` - One way When this parameter is set to `3`, use multi\\_city\\_json to set the flight information.",
            }),
          ),
          outbound_date: Type.Optional(
            Type.String({
              description: "Parameter defines the outbound date. The format is YYYY-MM-DD. e.g. `2026-01-15`",
            }),
          ),
          return_date: Type.Optional(
            Type.String({
              description:
                "Parameter defines the return date. The format is YYYY-MM-DD. e.g. `2026-01-21` Parameter is required if type parameter is set to: `1` (Round trip)",
            }),
          ),
          month: Type.Optional(
            Type.String({
              description:
                "Parameter defines the month of the trip with flexible travel dates. The value must be a number from `1` to `12`, where `1` = January, `2` = February, …, `12` = December. `0` (default) means all months within the next 6 months are considered. Only the next 6 months from the current date are available for selection.",
            }),
          ),
          travel_duration: Type.Optional(
            Type.Union([Type.Literal(1), Type.Literal(2), Type.Literal(3)], {
              description:
                "Parameter defines the duration of the trip with flexible travel dates. Available options: `1` - Weekend `2` - 1 week (default) `3` - 2 weeks",
            }),
          ),
          travel_class: Type.Optional(
            Type.Union([Type.Literal(1), Type.Literal(2), Type.Literal(3), Type.Literal(4)], {
              description:
                "Parameter defines the travel class. Available options: `1` - Economy (default) `2` - Premium economy `3` - Business `4` - First",
            }),
          ),
          adults: Type.Optional(Type.Number({ description: "Parameter defines the number of adults. Default to 1." })),
          children: Type.Optional(
            Type.Number({ description: "Parameter defines the number of children. Default to 0." }),
          ),
          infants_in_seat: Type.Optional(
            Type.Number({ description: "Parameter defines the number of infants in seat. Default to 0." }),
          ),
          infants_on_lap: Type.Optional(
            Type.Number({ description: "Parameter defines the number of infants on lap. Default to 0." }),
          ),
          stops: Type.Optional(
            Type.Union([Type.Literal(0), Type.Literal(1), Type.Literal(2), Type.Literal(3)], {
              description:
                "Parameter defines the number of stops during the flight. Available options: `0` - Any number of stops (default) `1` - Nonstop only `2` - 1 stop or fewer `3` - 2 stops or fewer",
            }),
          ),
          travel_mode: Type.Optional(
            Type.Union([Type.Literal("0"), Type.Literal("1")], {
              description:
                "Parameter defines the travel mode. Available options: `0` - All (default) `1` - Flight only travel\\_mode and interest parameters can't be used together.",
            }),
          ),
          interest: Type.Optional(
            Type.Union(
              [
                Type.Literal("0"),
                Type.Literal("/g/11bc58l13w"),
                Type.Literal("/m/0b3yr"),
                Type.Literal("/m/09cmq"),
                Type.Literal("/m/03g3w"),
                Type.Literal("/m/071k0"),
              ],
              {
                description:
                  "Parameter defines the interest of the destination. Available options: `0` - Popular (default) `/g/11bc58l13w` - Outdoors `/m/0b3yr` - Beaches `/m/09cmq` - Museum `/m/03g3w` - History `/m/071k0` - Skiing travel\\_mode and interest parameters can't be used together.",
              },
            ),
          ),
          include_airlines: Type.Optional(
            Type.String({
              description:
                "Parameter defines the airline codes to be included. Split multiple airlines with comma. Each airline code should be a 2-character IATA code consisting of either two uppercase letters or one uppercase letter and one digit. You can search for airline codes on IATA. For example, `UA` is United Airlines. Additionally, alliances can be also included here: `STAR_ALLIANCE` - Star Alliance `SKYTEAM` - SkyTeam `ONEWORLD` - Oneworld",
            }),
          ),
          bags: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the number of carry-on bags. Default to `0`. Parameter should not exceed the total number of passengers with carry-on bag allowance (adults, children and infants\\_in\\_seat).",
            }),
          ),
          max_price: Type.Optional(
            Type.Number({ description: "Parameter defines the maximum ticket price. Default to unlimited." }),
          ),
          max_duration: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the maximum flight duration, in minutes. For example, specify `1500` for 25 hours.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Travel Explore results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Travel Explore search results" }))
      .summary("Google Travel Explore")
      .description("Search via Google Travel Explore. Real API: GET /search.json?engine=google_travel_explore")
      .operationId("searchGoogleTravelExplore")
      .tag("Google")
      .extension("x-serpapi-engine", "google_travel_explore")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_trends")
      .query(
        Type.Object({
          q: Type.String({
            description:
              'Parameter defines the query or queries you want to search. You can use anything that you would use in a regular Google Trends search. The maximum number of queries per search is `5` (this only applies to "Interest over time" and "Compared breakdown by region" data\\_type, other types of data will only accept `1` query per search). When passing multiple queries you need to use a comma (`,`) to separate them (e.g. `coffee,pizza,dark chocolate,/m/027lnzs,bread`). Query can be a "Search term" (e.g. `World Cup`, `Eminem`, `iPhone`, etc.) or a "Topic" (e.g. `/m/0663v`, `/m/027lnzs`, `/g/11mw8j71m4`, etc.). Queries that are "Topics" are encoded. To retrieve these values you can use our Google Trends Autocomplete API. Maximum length for each query is 100 characters.',
          }),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Trends search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          geo: Type.Optional(
            Type.String({
              description:
                "Parameter defines the location from where you want the search to originate. It defaults to `Worldwide` (activated when the value of geo parameter is not set or empty). Head to the Google Trends Locations for a full list of supported Google Trends locations.. Valid values include: , AF, AF-BDS, AF-BDG, AF-BGL, AF-BAL, AF-BAM, AF-DAY, AF-FRA, AF-FYB, and 3581 more",
            }),
          ),
          region: Type.Optional(
            Type.Union([Type.Literal("COUNTRY"), Type.Literal("REGION"), Type.Literal("DMA"), Type.Literal("CITY")], {
              description:
                'Parameter is used for getting more specific results when using "Compared breakdown by region" and "Interest by region" data\\_type charts. Other data\\_type charts do not accept region parameter. The default value depends on the geo location that is set. Available options: `COUNTRY` - Country `REGION` - Subregion `DMA` - Metro `CITY` - City Not all region options will return results for every geo location.',
            }),
          ),
          data_type: Type.Optional(
            Type.Union(
              [
                Type.Literal("TIMESERIES"),
                Type.Literal("GEO_MAP"),
                Type.Literal("GEO_MAP_0"),
                Type.Literal("RELATED_TOPICS"),
                Type.Literal("RELATED_QUERIES"),
              ],
              {
                description:
                  "Parameter defines the type of search you want to do. Available options: `TIMESERIES` - Interest over time (default) - Accepts both single and multiple queries per search. `GEO_MAP` - Compared breakdown by region - Accepts only multiple queries per search. `GEO_MAP_0` - Interest by region - Accepts only single query per search. `RELATED_TOPICS` - Related topics - Accepts only single query per search. `RELATED_QUERIES` - Related queries - Accepts only single query per search.",
              },
            ),
          ),
          tz: Type.Optional(
            Type.Number({
              description:
                "Parameter is used to define a time zone offset. The default value is set to `420` (Pacific Day Time(PDT): -07:00). Value is shown in minutes and can span from `-1439` to `1439`. tz can be calculated using the time difference between UTC +0 and desired timezone. Examples: `420` - PDT `600` - Pacific/Tahiti `-540` - Asia/Tokyo `-480` - Canada/Pacific. To make sure the value is correct, please refer to the time zone database and your programming language UTC offset calculation. You may visit the documentation to get more information.",
            }),
          ),
          cat: Type.Optional(
            Type.String({
              description:
                "Parameter is used to define a search category. The default value is 0 (All categories). You can find or download all supported values in the Google Trends Categories list. Note that these are different from the categories supported for Google Trends Trending Now. Valid values include: 0, 3, 5, 7, 8, 11, 12, 13, 14, 16, and 1123 more",
            }),
          ),
          gprop: Type.Optional(
            Type.Union(
              [
                Type.Literal(""),
                Type.Literal("images"),
                Type.Literal("news"),
                Type.Literal("froogle"),
                Type.Literal("youtube"),
              ],
              {
                description:
                  "Parameter is used for sorting results by property. The default property is set to `Web Search` (activated when the value of gprop parameter is not set or empty). Other available options: `images` - Image Search `news` - News Search `froogle` - Google Shopping `youtube` - YouTube Search",
              },
            ),
          ),
          date: Type.Optional(
            Type.String({
              description:
                "Parameter is used to define a date. Available options: `now 1-H` - Past hour `now 4-H` - Past 4 hours `now 1-d` - Past day `now 7-d` - Past 7 days `today 1-m` - Past 30 days `today 3-m` - Past 90 days `today 12-m` - Past 12 months `today 5-y` - Past 5 years `all` - 2004 - present You can also pass custom values: Dates from 2004 to present: `yyyy-mm-dd yyyy-mm-dd` (e.g. `2021-10-15 2022-05-25`) Dates with hours within a week range: `yyyy-mm-ddThh yyyy-mm-ddThh` (e.g. `2022-05-19T10 2022-05-24T22`). Hours will be calculated depending on the tz (time zone) parameter.",
            }),
          ),
          csv: Type.Optional(
            Type.Boolean({
              description:
                "Parameter is used for retrieving the CSV results. Set the parameter to `true` to retrieve CSV results as an array.",
            }),
          ),
          include_low_search_volume: Type.Optional(
            Type.Boolean({
              description:
                "Parameter is used for including low search volume regions in the results. Set the parameter to `true` to include low search volume regions in the results. This parameter is ignored if data\\_type is not set to `GEO_MAP` or `GEO_MAP_0`.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Trends results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Trends search results" }))
      .summary("Google Trends")
      .description("Search via Google Trends. Real API: GET /search.json?engine=google_trends")
      .operationId("searchGoogleTrends")
      .tag("Google")
      .extension("x-serpapi-engine", "google_trends")
      .extension("x-serpapi-real-path", "/search.json")
      .example("coffee", { summary: "Google Trends example: coffee", value: GoogleTrendsCoffeeExample });

    g.get("/google_trends_autocomplete")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. You can use anything that you would use in a regular Google Trends search. The query is used to retrieve suggested searches.",
          }),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Trends Autocomplete search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Trends Autocomplete results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Trends Autocomplete search results" }))
      .summary("Google Trends Autocomplete")
      .description(
        "Search via Google Trends Autocomplete. Real API: GET /search.json?engine=google_trends_autocomplete",
      )
      .operationId("searchGoogleTrendsAutocomplete")
      .tag("Google")
      .extension("x-serpapi-engine", "google_trends_autocomplete")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_trends_news")
      .query(
        Type.Object({
          page_token: Type.String({
            description:
              "Parameter defines the token to fetch the news of trending searches. Use `news_page_token` from our Google Trends Trending Now API — see the example.",
          }),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Trends News results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Trends News search results" }))
      .summary("Google Trends News")
      .description("Search via Google Trends News. Real API: GET /search.json?engine=google_trends_news")
      .operationId("searchGoogleTrendsNews")
      .tag("Google")
      .extension("x-serpapi-engine", "google_trends_news")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_trends_trending_now")
      .query(
        Type.Object({
          geo: Type.String({
            description:
              "Parameter defines the location from where you want the search to originate. It defaults to `US` (activated when the value of geo parameter is not set or empty). Head to the Google Trends Trending Now Locations for a full list of supported locations.. Valid values include: AL, DZ, AO, AR, AR-C, AR-B, AR-K, AR-H, AR-U, AR-X, and 1434 more",
          }),
          hours: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the number of past hours to retrieve the results for. It defaults to `24` (Past 24 hours). The predefined value from Google are the following: -`4` (Past 4 hours) -`24` (Past 24 hours) -`48` (Past 48 hours) -`168` (Past 7 days).",
            }),
          ),
          category_id: Type.Optional(
            Type.Union(
              [
                Type.Literal("1"),
                Type.Literal("2"),
                Type.Literal("3"),
                Type.Literal("20"),
                Type.Literal("4"),
                Type.Literal("5"),
                Type.Literal("6"),
                Type.Literal("7"),
                Type.Literal("8"),
                Type.Literal("9"),
                Type.Literal("10"),
                Type.Literal("11"),
                Type.Literal("13"),
                Type.Literal("14"),
                Type.Literal("15"),
                Type.Literal("16"),
                Type.Literal("17"),
                Type.Literal("18"),
                Type.Literal("19"),
              ],
              {
                description:
                  'Parameter allows results to be filtered by a specific category. E.g. category\\_id:`18` will return only results from the "Technology" category. Head to the Google Trends Trending Now Categories for the full list of supported categories.',
              },
            ),
          ),
          only_active: Type.Optional(
            Type.Boolean({ description: "Parameter filters results to only include those that are currently active." }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google Trends Trending Now search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          frequency: Type.Union([Type.Literal("daily"), Type.Literal("realtime")], {
            description:
              "Parameter is used for retrieving different trends frequency. It defaults to `daily`. Available options: `daily` - Daily `realtime` - Realtime",
          }),
          date: Type.Optional(
            Type.String({
              description:
                "Parameter defines the date of the results you want to retrieve. It defaults to the current day. The date format is `yyyymmdd` (e.g., `20231015`).",
            }),
          ),
          cat: Type.Optional(
            Type.Union(
              [
                Type.Literal("all"),
                Type.Literal("b"),
                Type.Literal("e"),
                Type.Literal("m"),
                Type.Literal("t"),
                Type.Literal("s"),
                Type.Literal("h"),
              ],
              {
                description:
                  "Parameter defines the category of the results you want to retrieve. Available options: `all` - All categories (default). `b` - Business. `e` - Entertainment. `m` - Health. `t` - Sci/Tech. `s` - Sports. `h` - Top stories. Parameter can only be used when frequency is set to `realtime`.",
              },
            ),
          ),
          next_page_token: Type.Optional(
            Type.String({
              description:
                "Parameter defines the next page token, which is used for retrieving the next page of results. When querying the API, the first response will provide access to all available pages. However, it's important to note that Google realtime search trends do not follow conventional pagination practices. Not to worry, though, as we have abstracted this complexity for you. Here's the caveat: only the first page will contain pagination information. Subsequent requests for the next page will not display pagination details.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Trends Trending Now results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Trends Trending Now search results" }))
      .summary("Google Trends Trending Now")
      .description(
        "Search via Google Trends Trending Now. Real API: GET /search.json?engine=google_trends_trending_now",
      )
      .operationId("searchGoogleTrendsTrendingNow")
      .tag("Google")
      .extension("x-serpapi-engine", "google_trends_trending_now")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_videos")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. You can use anything that you would use in a regular Google Videos search. e.g. `inurl:`, `site:`, `intitle:`. We also support advanced search query parameters such as as\\_dt and as\\_eq. See the full list of supported advanced search query parameters.",
          }),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          google_domain: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google domain to use. It defaults to `google.com`. Head to the Google domains page for a full list of supported Google domains.. Valid values include: google.com, google.ad, google.ae, google.com.af, google.com.ag, google.com.ai, google.al, google.am, google.co.ao, google.com.ar, and 175 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France). Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          lr: Type.Optional(
            Type.String({
              description:
                "Parameter defines one or multiple languages to limit the search to. It uses `lang_{two-letter language code}` to specify languages and `|` as a delimiter. (e.g., `lang_fr|lang_de` will only search French and German pages). Head to the Google lr languages page for a full list of supported languages.",
            }),
          ),
          as_dt: Type.Optional(
            Type.String({
              description:
                "Parameter controls whether to include or exclude results from the site named in the as\\_sitesearch parameter.",
            }),
          ),
          as_epq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a phrase that all documents in the search results must contain. You can also use the phrase search query term to search for a phrase.",
            }),
          ),
          as_eq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a word or phrase that should not appear in any documents in the search results. You can also use the exclude query term to ensure that a particular word or phrase will not appear in the documents in a set of search results.",
            }),
          ),
          as_lq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should contain a link to a particular URL. You can also use the link: query term for this type of query.",
            }),
          ),
          as_nlo: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the starting value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_nhi: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the ending value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_oq: Type.Optional(
            Type.String({
              description:
                "Parameter provides additional search terms to check for in a document, where each document in the search results must contain at least one of the additional search terms. You can also use the Boolean OR query term for this type of query.",
            }),
          ),
          as_q: Type.Optional(
            Type.String({
              description:
                "Parameter provides search terms to check for in a document. This parameter is also commonly used to allow users to specify additional terms to search for within a set of search results.",
            }),
          ),
          as_qdr: Type.Optional(
            Type.String({
              description:
                "Parameter requests search results from a specified time period (quick date range). The following values are supported: `d[number]`: requests results from the specified number of past days. Example for the past 10 days: `as_qdr=d10` `w[number]`: requests results from the specified number of past weeks. `m[number]`: requests results from the specified number of past months. `y[number]`: requests results from the specified number of past years. Example for the past year: `as_qdr=y`",
            }),
          ),
          as_rq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should be pages that are related to the specified URL. The parameter value should be a URL. You can also use the related: query term for this type of query.",
            }),
          ),
          as_sitesearch: Type.Optional(
            Type.String({
              description:
                "Parameter allows you to specify that all search results should be pages from a given site. By setting the as\\_dt parameter, you can also use it to exclude pages from a given site from your search results.",
            }),
          ),
          tbs: Type.Optional(
            Type.String({
              description:
                "(to be searched) parameter defines advanced search parameters that aren't possible in the regular query field. (e.g., advanced search for patents, dates, news, videos, images, apps, or text contents).",
            }),
          ),
          safe: Type.Optional(
            Type.Union([Type.Literal("active"), Type.Literal("off")], {
              description:
                "Parameter defines the level of filtering for adult content. It can be set to `active` or `off`, by default Google will blur explicit content.",
            }),
          ),
          nfpr: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines the exclusion of results from an auto-corrected query when the original query is spelled wrong. It can be set to `1` to exclude these results, or `0` to include them (default). Note that this parameter may not prevent Google from returning results for an auto-corrected query if no other results are available.",
            }),
          ),
          filter: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines if the filters for 'Similar Results' and 'Omitted Results' are on or off. It can be set to `1` (default) to enable these filters, or `0` to disable these filters.",
            }),
          ),
          start: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `10` is the 2nd page of results, `20` is the 3rd page of results, etc.).",
            }),
          ),
          device: Type.Optional(
            Type.String({
              description:
                "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Videos results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Videos search results" }))
      .summary("Google Videos")
      .description("Search via Google Videos. Real API: GET /search.json?engine=google_videos")
      .operationId("searchGoogleVideos")
      .tag("Google")
      .extension("x-serpapi-engine", "google_videos")
      .extension("x-serpapi-real-path", "/search.json");

    g.get("/google_videos_light")
      .query(
        Type.Object({
          q: Type.String({
            description:
              "Parameter defines the query you want to search. You can use anything that you would use in a regular Google Videos search. e.g. `inurl:`, `site:`, `intitle:`. We also support advanced search query parameters such as as\\_dt and as\\_eq. See the full list of supported advanced search query parameters.",
          }),
          location: Type.Optional(
            Type.String({
              description:
                "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control. The location and uule parameters can't be used together. It is recommended to specify location at the city level in order to simulate a real user’s search. If location is omitted, the search may take on the location of the proxy.",
            }),
          ),
          uule: Type.Optional(
            Type.String({
              description:
                "Parameter is the Google encoded location you want to use for the search. uule and location parameters can't be used together.",
            }),
          ),
          google_domain: Type.Optional(
            Type.String({
              description:
                "Parameter defines the Google domain to use. It defaults to `google.com`. Head to the Google domains page for a full list of supported Google domains.. Valid values include: google.com, google.ad, google.ae, google.com.af, google.com.ag, google.com.ai, google.al, google.am, google.co.ao, google.com.ar, and 175 more",
            }),
          ),
          gl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the country to use for the Google search. It's a two-letter country code. (e.g., `us` for the United States, `uk` for United Kingdom, or `fr` for France). Head to the Google countries page for a full list of supported Google countries.. Valid values include: af, al, dz, as, ad, ao, ai, aq, ag, ar, and 234 more",
            }),
          ),
          hl: Type.Optional(
            Type.String({
              description:
                "Parameter defines the language to use for the Google search. It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French). Head to the Google languages page for a full list of supported Google languages.. Valid values include: af, ak, sq, ws, am, ar, hy, az, eu, be, and 147 more",
            }),
          ),
          lr: Type.Optional(
            Type.String({
              description:
                "Parameter defines one or multiple languages to limit the search to. It uses `lang_{two-letter language code}` to specify languages and `|` as a delimiter. (e.g., `lang_fr|lang_de` will only search French and German pages). Head to the Google lr languages page for a full list of supported languages.",
            }),
          ),
          as_dt: Type.Optional(
            Type.String({
              description:
                "Parameter controls whether to include or exclude results from the site named in the as\\_sitesearch parameter.",
            }),
          ),
          as_epq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a phrase that all documents in the search results must contain. You can also use the phrase search query term to search for a phrase.",
            }),
          ),
          as_eq: Type.Optional(
            Type.String({
              description:
                "Parameter identifies a word or phrase that should not appear in any documents in the search results. You can also use the exclude query term to ensure that a particular word or phrase will not appear in the documents in a set of search results.",
            }),
          ),
          as_lq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should contain a link to a particular URL. You can also use the link: query term for this type of query.",
            }),
          ),
          as_nlo: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the starting value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_nhi: Type.Optional(
            Type.String({
              description:
                "Parameter specifies the ending value for a search range. Use as\\_nlo and as\\_nhi to append an inclusive search range.",
            }),
          ),
          as_oq: Type.Optional(
            Type.String({
              description:
                "Parameter provides additional search terms to check for in a document, where each document in the search results must contain at least one of the additional search terms. You can also use the Boolean OR query term for this type of query.",
            }),
          ),
          as_q: Type.Optional(
            Type.String({
              description:
                "Parameter provides search terms to check for in a document. This parameter is also commonly used to allow users to specify additional terms to search for within a set of search results.",
            }),
          ),
          as_qdr: Type.Optional(
            Type.String({
              description:
                "Parameter requests search results from a specified time period (quick date range). The following values are supported: `d[number]`: requests results from the specified number of past days. Example for the past 10 days: `as_qdr=d10` `w[number]`: requests results from the specified number of past weeks. `m[number]`: requests results from the specified number of past months. `y[number]`: requests results from the specified number of past years. Example for the past year: `as_qdr=y`",
            }),
          ),
          as_rq: Type.Optional(
            Type.String({
              description:
                "Parameter specifies that all search results should be pages that are related to the specified URL. The parameter value should be a URL. You can also use the related: query term for this type of query.",
            }),
          ),
          as_sitesearch: Type.Optional(
            Type.String({
              description:
                "Parameter allows you to specify that all search results should be pages from a given site. By setting the as\\_dt parameter, you can also use it to exclude pages from a given site from your search results.",
            }),
          ),
          tbs: Type.Optional(
            Type.String({
              description:
                "(to be searched) parameter defines advanced search parameters that aren't possible in the regular query field. (e.g., advanced search for video duration, upload date, video quality, video source, etc.).",
            }),
          ),
          safe: Type.Optional(
            Type.Union([Type.Literal("active"), Type.Literal("off")], {
              description:
                "Parameter defines the level of filtering for adult content. It can be set to `active` or `off`, by default Google will blur explicit content.",
            }),
          ),
          nfpr: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines the exclusion of results from an auto-corrected query when the original query is spelled wrong. It can be set to `1` to exclude these results, or `0` to include them (default). Note that this parameter may not prevent Google from returning results for an auto-corrected query if no other results are available.",
            }),
          ),
          filter: Type.Optional(
            Type.Boolean({
              description:
                "Parameter defines if the filters for 'Similar Results' and 'Omitted Results' are on or off. It can be set to `1` (default) to enable these filters, or `0` to disable these filters.",
            }),
          ),
          start: Type.Optional(
            Type.Number({
              description:
                "Parameter defines the result offset. It skips the given number of results. It's used for pagination. (e.g., `0` (default) is the first page of results, `10` is the 2nd page of results, `20` is the 3rd page of results, etc.).",
            }),
          ),
          device: Type.Optional(
            Type.String({
              description:
                "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser.",
            }),
          ),
          no_cache: Type.Optional(
            Type.Boolean({
              description:
                "Parameter will force SerpApi to fetch the Google Videos Light results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together.",
            }),
          ),
          async: Type.Optional(
            Type.String({
              description:
                "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled.",
            }),
          ),
          zero_trace: Type.Optional(
            Type.String({
              description:
                "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult.",
            }),
          ),
          output: Type.Optional(
            Type.String({
              description:
                "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved.",
            }),
          ),
          json_restrictor: Type.Optional(
            Type.String({
              description:
                "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details.",
            }),
          ),
        }),
      )
      .response(Type.Unknown({ description: "Google Videos Light search results" }))
      .summary("Google Videos Light")
      .description("Search via Google Videos Light. Real API: GET /search.json?engine=google_videos_light")
      .operationId("searchGoogleVideosLight")
      .tag("Google")
      .extension("x-serpapi-engine", "google_videos_light")
      .extension("x-serpapi-real-path", "/search.json");
  });
}

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import AmazonSearchCoffeeExample from "./examples/amazon-search-coffee.json"
import EbaySearchCoffeeExample from "./examples/ebay-search-coffee.json"
import WalmartSearchCoffeeMakerExample from "./examples/walmart-search-coffee-maker.json"
import WalmartSearchCoffeeExample from "./examples/walmart-search-coffee.json"

export function registerEcommerce(api: Api) {
  api.group("/search", (g) => {
    g.get("/amazon")
      .query(Type.Object({
        k: Type.Optional(Type.String({ description: "Parameter defines the query you want to search. You can use anything that you would use in a regular Amazon search." })),
        amazon_domain: Type.Optional(Type.Union([Type.Literal("amazon.com.au"), Type.Literal("amazon.com.be"), Type.Literal("amazon.com.br"), Type.Literal("amazon.ca"), Type.Literal("amazon.cn"), Type.Literal("amazon.eg"), Type.Literal("amazon.fr"), Type.Literal("amazon.de"), Type.Literal("amazon.in"), Type.Literal("amazon.it"), Type.Literal("amazon.co.jp"), Type.Literal("amazon.nl"), Type.Literal("amazon.pl"), Type.Literal("amazon.sa"), Type.Literal("amazon.sg"), Type.Literal("amazon.es"), Type.Literal("amazon.se"), Type.Literal("amazon.com.tr"), Type.Literal("amazon.ae"), Type.Literal("amazon.co.uk"), Type.Literal("amazon.com"), Type.Literal("amazon.com.mx")], { description: "Parameter defines the Amazon domain to use. It defaults to `amazon.com`. Head to Amazon domains for a full list of supported Amazon domains." })),
        language: Type.Optional(Type.String({ description: "Parameter defines the language to use for the Amazon search. It's a locale name represented as \\_. (e.g., on amazon.com `en_US` for English, `es_US` for Spanish, or on amazon.co.jp `ja_JP` for Japanese). Head to Amazon languages for a full list of supported Amazon languages.. Valid values include: amazon.com.au|en_AU, amazon.com.be|nl_BE, amazon.com.be|fr_BE, amazon.com.be|en_GB, amazon.com.br|pt_BR, amazon.ca|en_CA, amazon.ca|fr_CA, amazon.cn|zh_CN, amazon.eg|ar_AE, amazon.eg|en_AE, and 40 more" })),
        delivery_zip: Type.Optional(Type.String({ description: "ZIP Postal code. To filter the shipping products by a selected area." })),
        shipping_location: Type.Optional(Type.String({ description: "Shipping country. To filter the shipping products by a selected country.. Valid values include: AU, CA, CN, JP, MX, SG, GB, AF, AX, AL, and 228 more" })),
        s: Type.Optional(Type.Union([Type.Literal("relevanceblender"), Type.Literal("price-asc-rank"), Type.Literal("price-desc-rank"), Type.Literal("review-rank"), Type.Literal("date-desc-rank"), Type.Literal("exact-aware-popularity-rank")], { description: "Parameter is used for sorting results. Available options: `relevanceblender` - Featured (default) `price-asc-rank` - Price: Low to High `price-desc-rank` - Price: High to Low `review-rank` - Avg. Customer Review `date-desc-rank` - Newest Arrivals `exact-aware-popularity-rank` - Best Sellers" })),
        node: Type.Optional(Type.String({ description: "Parameter specifies the category for Amazon search results. You can find the appropriate node value by browsing Amazon’s website and accessing a specific category. The node ID is typically included in the URL after the format `node=[NODE ID]`. For example, on Amazon.com, the node for Smart Home is `6563140011`, and on Amazon.co.uk, the node for Fashion is `11961407031`. Use this node value to filter search results by category." })),
        rh: Type.Optional(Type.String({ description: "Parameter defines items filtering based on their attributes. The structure is a list of `key:value` pairs separated by `,`. For example `n:16318031,p_n_cpf_eligible:21512497011,p_72:1248897011` to filter for products in **Coffee** department (`n:16318031`) that are **Climate Pledge Friendly** (`p_n_cpf_eligible:21512497011`) and rated **4 Stars & Up** (`p_72:1248897011`)." })),
        dc: Type.Optional(Type.Boolean({ description: "Activate spelling fix. `true` (default) includes spelling fix, `false` searches without spelling fix." })),
        page: Type.Optional(Type.Number({ description: "Parameter defines the page number. It's used for pagination. (e.g., `1` (default) is the first page of results, `2` is the 2nd page of results, `3` is the 3rd page of results, etc.)." })),
        device: Type.Optional(Type.String({ description: "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Amazon results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Amazon search results" }))
      .summary("Amazon")
      .description("Search via Amazon. Real API: GET /search.json?engine=amazon")
      .operationId("searchAmazon")
      .tag("E-Commerce")
      .extension("x-serpapi-engine", "amazon")
      .extension("x-serpapi-real-path", "/search.json")
      .example("search-coffee", { summary: "Amazon example: search coffee", value: AmazonSearchCoffeeExample })

    g.get("/amazon_product")
      .query(Type.Object({
        asin: Type.Optional(Type.String({ description: "Parameter defines the Amazon Standard Identification Number (ASIN) of the product you want to retrieve. This is a unique identifier assigned to each product on Amazon." })),
        amazon_domain: Type.Optional(Type.Union([Type.Literal("amazon.com.au"), Type.Literal("amazon.com.be"), Type.Literal("amazon.com.br"), Type.Literal("amazon.ca"), Type.Literal("amazon.cn"), Type.Literal("amazon.eg"), Type.Literal("amazon.fr"), Type.Literal("amazon.de"), Type.Literal("amazon.in"), Type.Literal("amazon.it"), Type.Literal("amazon.co.jp"), Type.Literal("amazon.nl"), Type.Literal("amazon.pl"), Type.Literal("amazon.sa"), Type.Literal("amazon.sg"), Type.Literal("amazon.es"), Type.Literal("amazon.se"), Type.Literal("amazon.com.tr"), Type.Literal("amazon.ae"), Type.Literal("amazon.co.uk"), Type.Literal("amazon.com"), Type.Literal("amazon.com.mx")], { description: "Parameter defines the Amazon domain to use. It defaults to `amazon.com`. Head to Amazon domains for a full list of supported Amazon domains." })),
        language: Type.Optional(Type.String({ description: "Parameter defines the language to use for the Amazon search. It's a locale name represented as \\_. (e.g., on amazon.com `en_US` for English, `es_US` for Spanish, or on amazon.co.jp `ja_JP` for Japanese). Head to Amazon languages for a full list of supported Amazon languages.. Valid values include: amazon.com.au|en_AU, amazon.com.be|nl_BE, amazon.com.be|fr_BE, amazon.com.be|en_GB, amazon.com.br|pt_BR, amazon.ca|en_CA, amazon.ca|fr_CA, amazon.cn|zh_CN, amazon.eg|ar_AE, amazon.eg|en_AE, and 40 more" })),
        delivery_zip: Type.Optional(Type.String({ description: "ZIP Postal code. To filter the shipping products by a selected area." })),
        shipping_location: Type.Optional(Type.String({ description: "Shipping country. To filter the shipping products by a selected country.. Valid values include: AU, CA, CN, JP, MX, SG, GB, AF, AX, AL, and 228 more" })),
        other_sellers: Type.Optional(Type.Boolean({ description: "Include results from other sellers." })),
        device: Type.Optional(Type.String({ description: "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Amazon Product results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Amazon Product search results" }))
      .summary("Amazon Product")
      .description("Search via Amazon Product. Real API: GET /search.json?engine=amazon_product")
      .operationId("searchAmazonProduct")
      .tag("E-Commerce")
      .extension("x-serpapi-engine", "amazon_product")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/ebay")
      .query(Type.Object({
        _nkw: Type.String({ description: "Parameter defines the search query. You can use anything that you would use in a regular eBay search. \\_nkw parameter is optional when category\\_id parameter is specified." }),
        ebay_domain: Type.Optional(Type.Union([Type.Literal("ebay.com.au"), Type.Literal("ebay.at"), Type.Literal("ebay.ca"), Type.Literal("ebay.fr"), Type.Literal("ebay.de"), Type.Literal("ebay.com.hk"), Type.Literal("ebay.ie"), Type.Literal("ebay.it"), Type.Literal("ebay.com.my"), Type.Literal("ebay.nl"), Type.Literal("ebay.ph"), Type.Literal("ebay.pl"), Type.Literal("ebay.com.sg"), Type.Literal("ebay.es"), Type.Literal("ebay.ch"), Type.Literal("ebay.co.uk"), Type.Literal("ebay.com")], { description: "Parameter defines the eBay domain to use. It defaults to `ebay.com`. Head to the eBay domains for a full list of supported eBay domains." })),
        _salic: Type.Optional(Type.String({ description: "Parameter defines the location based on country. Head to the eBay location options for a full list of supported countries.. Valid values include: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, and 212 more" })),
        _pgn: Type.Optional(Type.Number({ description: "Parameter defines the page number. It's used for pagination. (e.g., `1` (default) is the first page of results, `2` is the 2nd page of results, `3` is the 3rd page of results, etc.)." })),
        _ipg: Type.Optional(Type.Union([Type.Literal(50), Type.Literal(25), Type.Literal(100), Type.Literal(200)], { description: "Parameter defines the maximum number of results to return. There are total of four options: `25`, `50` (default), `100` and `200` results." })),
        _blrs: Type.Optional(Type.Boolean({ description: "Parameter defines the exclusion of results from an auto-corrected query when the original query is spelled wrong. The recommended value for this parameter is `spell_auto_correct`. Omit `_blrs` if you want the search to include results for an auto-corrected query. Note that this parameter may not prevent eBay from returning results for an auto-corrected query if no other results are available." })),
        show_only: Type.Optional(Type.String({ description: "Parameter defines the list of filters you can apply to the results. Available options **(case-sensitive)**: `Complete` - Completed items `Sold` - Sold items `FR` - Free returns `RPA` - Returns accepted `AS` - Authorized seller `Savings` - Deals and savings `SaleItems` - Sale items `Lots` - Listed as lots `Charity` - Benefits charity `AV` - Authenticity Guarantee `FS` - Free shipping `LPickup` - Local pickup You can also combine multiple filter values by joining them with a comma (`value` + `,` + `value`; eg: `Sold,FS`)." })),
        buying_format: Type.Optional(Type.Union([Type.Literal("Auction"), Type.Literal("BIN"), Type.Literal("BO")], { description: "Parameter defines the buying format you can apply to the results. Available options **(case-sensitive)**: `Auction` - Auction `BIN` - Buy It Now `BO` - Accepts Offers" })),
        _udlo: Type.Optional(Type.Number({ description: "Parameter defines the lowest price of items that should be included in the results (e.g. `10` will only return items that have higher price than `10`)." })),
        _udhi: Type.Optional(Type.Number({ description: "Parameter defines the highest price of items that should be included in the results (e.g. `20` will only return items that have lower price than `20`)." })),
        _sop: Type.Optional(Type.Union([Type.Literal("12"), Type.Literal("1"), Type.Literal("10"), Type.Literal("15"), Type.Literal("16"), Type.Literal("7"), Type.Literal("3"), Type.Literal("2"), Type.Literal("18"), Type.Literal("19")], { description: "Parameter defines results sorted by different options in the eBay. The default option is 'Best Match'. Head to the eBay sort options for a full list of supported sort options." })),
        _dmd: Type.Optional(Type.Union([Type.Literal("1"), Type.Literal("2")], { description: "Parameter defines the visual layout for displaying results. The available options are 'Grid' and 'List'." })),
        category_id: Type.Optional(Type.String({ description: "Parameter defines the ID of a category where you want your search to be concentrated. ID values are accessible inside `categories` array, located in our JSON output (e.g. `categories[1].id`). You can search using category\\_id parameter without specifying \\_nkw parameter." })),
        _stpos: Type.Optional(Type.String({ description: "Parameter defines the ZIP or Postal code. You can use it to filter the shipping products by a selected area." })),
        LH_ItemCondition: Type.Optional(Type.String({ description: "Parameter defines one or multiple product conditions to limit the search to. Condition is represented via numeric ID, e.g. `1000` for `New`. Multiple IDs should be joined with `|` delimiter, e.g. `1000|3000`. List of supported IDs can be found on eBay documentation page. There is also undocumented ID `10` for `Not Specified` condition." })),
        LH_PrefLoc: Type.Optional(Type.Union([Type.Literal("1"), Type.Literal("3"), Type.Literal("2")], { description: "Parameter defines the preferred location. The available options are 'Domestic', 'Regional', and 'Worldwide'." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Ebay results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Ebay search results" }))
      .summary("Ebay")
      .description("Search via Ebay. Real API: GET /search.json?engine=ebay")
      .operationId("searchEbay")
      .tag("E-Commerce")
      .extension("x-serpapi-engine", "ebay")
      .extension("x-serpapi-real-path", "/search.json")
      .example("search-coffee", { summary: "Ebay example: search coffee", value: EbaySearchCoffeeExample })

    g.get("/ebay_product")
      .query(Type.Object({
        product_id: Type.String({ description: "Parameter defines an ID of the product to get results for. Normally, it can be found in product link from search results: `https://www.ebay.com/itm/{product_id}`" }),
        ebay_domain: Type.Optional(Type.Union([Type.Literal("ebay.com.au"), Type.Literal("ebay.at"), Type.Literal("ebay.ca"), Type.Literal("ebay.fr"), Type.Literal("ebay.de"), Type.Literal("ebay.com.hk"), Type.Literal("ebay.ie"), Type.Literal("ebay.it"), Type.Literal("ebay.com.my"), Type.Literal("ebay.nl"), Type.Literal("ebay.ph"), Type.Literal("ebay.pl"), Type.Literal("ebay.com.sg"), Type.Literal("ebay.es"), Type.Literal("ebay.ch"), Type.Literal("ebay.co.uk"), Type.Literal("ebay.com")], { description: "Parameter defines the eBay domain to use. It defaults to `ebay.com`. Head to the eBay domains for a full list of supported domains." })),
        locale: Type.Optional(Type.String({ description: "Parameter defines from where you want the search to originate from. Head to the eBay locales for a full list of supported locales.. Valid values include: US, CA, GB, AF, AL, DZ, AS, AD, AO, AI, and 214 more" })),
        lang: Type.Optional(Type.Union([Type.Literal("en-us")], { description: "Parameter defines the language to use for the search. Normally, it defaults to `en-US`, but some locales use localized interface (Japan, Argentina etc.) so override might be helpful. This parameter available only for `United States` eBay domain and only when `locale` is set." })),
        shipping_country: Type.Optional(Type.String({ description: "Parameter defines the shipping country to use for shipping data calculation. Head to the eBay shipping countries for a full list of supported countries.. Valid values include: US, CA, GB, AF, AL, DZ, AS, AD, AO, AI, and 214 more" })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Ebay Product results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Ebay Product search results" }))
      .summary("Ebay Product")
      .description("Search via Ebay Product. Real API: GET /search.json?engine=ebay_product")
      .operationId("searchEbayProduct")
      .tag("E-Commerce")
      .extension("x-serpapi-engine", "ebay_product")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/home_depot")
      .query(Type.Object({
        q: Type.String({ description: "Parameter defines the search query. You can use anything that you would use in a regular The Home Depot search." }),
        country: Type.Optional(Type.Union([Type.Literal("us"), Type.Literal("ca")], { description: "Parameter defines the country to use for the Home Depot search. Only United States(`us`), and Canada(`ca`) are supported." })),
        hd_sort: Type.Optional(Type.Union([Type.Literal("top_sellers"), Type.Literal("price_low_to_high"), Type.Literal("price_high_to_low"), Type.Literal("top_rated"), Type.Literal("best_match")], { description: "Parameter defines results sorted by different options in Home Depot US. It can be set to:" })),
        hd_filter_tokens: Type.Optional(Type.String({ description: "Used to pass filter tokens divided by comma. Filter tokens can be obtained from API response" })),
        delivery_zip: Type.Optional(Type.String({ description: "ZIP Postal code. To filter the shipping products by a selected area." })),
        store_id: Type.Optional(Type.String({ description: "Store ID to filter the products by the specific store only. See all Home Depot stores" })),
        store: Type.Optional(Type.String({ description: "Store ID to filter the products by the specific store only in Home Depot Canada. The default store is Gatineau (`7140`). See all Home Depot Canada stores" })),
        sort: Type.Optional(Type.Union([Type.Literal("price-asc"), Type.Literal("price-desc"), Type.Literal("reviewAvgRating"), Type.Literal("relevance")], { description: "Parameter defines results sorted by different options in Home Depot Canada. It can be set to:" })),
        filter: Type.Optional(Type.String({ description: "Used to pass filter tokens divided by dash (-) in Home Depot Canada. Filter tokens can be obtained from API response" })),
        lowerbound: Type.Optional(Type.Number({ description: "Defines lower bound for price in USD." })),
        upperbound: Type.Optional(Type.Number({ description: "Defines upper bound for price in USD." })),
        minmax: Type.Optional(Type.String({ description: "Defines lower and upper bound for price in CAD. Parameter is only used in the Home Depot Canada. Example: `price:[100 TO 500]`(Between $100 to $500) Example: `price:[100 TO *]`(Minimum $100) Example: `price:[0 TO 500]`(Maximum $500) Example: `price:%5B100%20TO%20500%5D`(Encoded version, Between $100 to $500)" })),
        nao: Type.Optional(Type.String({ description: "Defines offset for products result. A single page contains 24 products. First page offset is 0, second -> 24, third -> 48 and so on." })),
        page: Type.Optional(Type.Number({ description: "Value is used to get the items on a specific page. (e.g., `1` (default) is the first page of results, `2` is the 2nd page of results, `3` is the 3rd page of results, etc.). This parameter is common for both US and CA searches." })),
        ps: Type.Optional(Type.Number({ description: "Determines the number of items per page. There are scenarios where The Home Depot overrides the ps value. By default, The Home Depot returns `24` results. The maximum number of results it can return is `48`." })),
        pagesize: Type.Optional(Type.String({ description: "Determines the number of items per page in the Home Depot Canada. By default, the Home Depot Canada returns `40` (maximum allowed value) results." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Home Depot results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Home Depot search results" }))
      .summary("Home Depot")
      .description("Search via Home Depot. Real API: GET /search.json?engine=home_depot")
      .operationId("searchHomeDepot")
      .tag("E-Commerce")
      .extension("x-serpapi-engine", "home_depot")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/home_depot_product")
      .query(Type.Object({
        product_id: Type.String({ description: "The Home Depot identifier of a product. Only Product IDs gathered from the Home Depot US are supported." }),
        delivery_zip: Type.Optional(Type.String({ description: "ZIP Postal code. To filter the shipping products by a selected area." })),
        store_id: Type.Optional(Type.String({ description: "Store ID to filter the products by the specific store only." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Home Depot Product results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Home Depot Product search results" }))
      .summary("Home Depot Product")
      .description("Search via Home Depot Product. Real API: GET /search.json?engine=home_depot_product")
      .operationId("searchHomeDepotProduct")
      .tag("E-Commerce")
      .extension("x-serpapi-engine", "home_depot_product")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/home_depot_product_reviews")
      .query(Type.Object({
        product_id: Type.String({ description: "The Home Depot identifier of a product. Only Product IDs gathered from the Home Depot US are supported." }),
        term: Type.Optional(Type.String({ description: "Parameter defines the term you want to search, only reviews with matching term will be returned." })),
        rating: Type.Optional(Type.String({ description: "Parameter defines to include only results with specified ratings. Example for single rating only: `5` Example for multiple ratings (separated by comma `,`): `5,3,2`" })),
        sort_by: Type.Optional(Type.Union([Type.Literal("photoreview"), Type.Literal("mosthelpfull"), Type.Literal("oldest"), Type.Literal("newest"), Type.Literal("highestrating"), Type.Literal("lowestrating")], { description: "Parameter is used for sorting reviews. By default the reviews are sorted by `newest`. Available options: `photoreview` - Photo Reviews `mosthelpfull` - Most Helpful `oldest` - Oldest `newest` - Newest `highestrating` - Highest rating `lowestrating` - Lowest rating" })),
        verified_purchases: Type.Optional(Type.Boolean({ description: "Parameter defines whether to include reviews from verified purchases." })),
        start: Type.Optional(Type.String({ description: "Parameter controls the offset of the reviews. This parameter defaults to `1`. If the pagesize is `100`, you have to specify start as `101` to get the 2nd page results, and the 3rd page is `201`, and so on." })),
        pagesize: Type.Optional(Type.String({ description: "Parameter determines the number of items per page. By default, `100` (maximum allowed value) results are returned." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Home Depot Product Reviews results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Home Depot Product Reviews search results" }))
      .summary("Home Depot Product Reviews")
      .description("Search via Home Depot Product Reviews. Real API: GET /search.json?engine=home_depot_product_reviews")
      .operationId("searchHomeDepotProductReviews")
      .tag("E-Commerce")
      .extension("x-serpapi-engine", "home_depot_product_reviews")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/walmart")
      .query(Type.Object({
        query: Type.String({ description: "Parameter defines the search query. You can use anything that you would use in a regular Walmart search. Either a `query` or a `cat_id` parameter is required." }),
        sort: Type.Optional(Type.Union([Type.Literal("price_low"), Type.Literal("price_high"), Type.Literal("best_seller"), Type.Literal("best_match"), Type.Literal("rating_high")], { description: "Parameter defines sorting. (e.g. `price_low`, `price_high`, `best_seller`, `best_match`, `rating_high`, `new`)" })),
        soft_sort: Type.Optional(Type.Boolean({ description: "Parameter enables sort by relevance. Walmart is by default showing results sorted by relevance and using the `sort` option. Set to `false` to disable sort by Relevance." })),
        cat_id: Type.Optional(Type.String({ description: "Category on Walmart Search. (e.g. `0` (default) is all departments, `976759_976787` is 'Cookies', etc.). Either a `query` or a `cat_id` parameter is required." })),
        facet: Type.Optional(Type.String({ description: "Parameter defines items filtering based on their attributes. The structure is a list of `key:value` pairs separated by `||`. The key and value are separated by `:`" })),
        store_id: Type.Optional(Type.String({ description: "Store ID to filter the products by the specific store only. Head to the Walmart Stores Locations for a full list of supported stores. It's possible for the product pricing to differ between stores." })),
        min_price: Type.Optional(Type.Number({ description: "Lower bound of price range query." })),
        max_price: Type.Optional(Type.Number({ description: "Upper bound of price range query." })),
        spelling: Type.Optional(Type.Boolean({ description: "Activate spelling fix. `true` (default) includes spelling fix, `false` searches without spelling fix." })),
        nd_en: Type.Optional(Type.Boolean({ description: "Show results with NextDay delivery only. Set to `true` to enable or `false` (default) to disable" })),
        page: Type.Optional(Type.Number({ description: "Value is used to get the items on a specific page. (e.g., `1` (default) is the first page of results, `2` is the 2nd page of results, `3` is the 3rd page of results, etc.). Maximum page value is `100`." })),
        device: Type.Optional(Type.String({ description: "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Walmart results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
        include_filters: Type.Optional(Type.Boolean({ description: "Include `filters` to the JSON response. Set to `true` to enable or `false` to disable (default)." })),
      }))
      .response(Type.Unknown({ description: "Walmart search results" }))
      .summary("Walmart")
      .description("Search via Walmart. Real API: GET /search.json?engine=walmart")
      .operationId("searchWalmart")
      .tag("E-Commerce")
      .extension("x-serpapi-engine", "walmart")
      .extension("x-serpapi-real-path", "/search.json")
      .example("search-coffee-maker", { summary: "Walmart example: search coffee maker", value: WalmartSearchCoffeeMakerExample })
      .example("search-coffee", { summary: "Walmart example: search coffee", value: WalmartSearchCoffeeExample })

    g.get("/walmart_product")
      .query(Type.Object({
        product_id: Type.String({ description: "Parameter defines the product to get results for. Normally found from shopping results for supported products (e.g., `https://www.walmart.com/ip/{product_id}`). You can pass `product_id` and `us_item_id`. Responses from Walmart.com are faster when `product_id` is used." }),
        store_id: Type.Optional(Type.String({ description: "Store ID to filter the products by the specific store only. Head to the Walmart Stores Locations for a full list of supported stores. It's possible for the product pricing to differ between stores." })),
        device: Type.Optional(Type.String({ description: "Parameter defines the device to use to get the results. It can be set to `desktop` (default) to use a regular browser, `tablet` to use a tablet browser (currently using iPads), or `mobile` to use a mobile browser." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Walmart Product results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Walmart Product search results" }))
      .summary("Walmart Product")
      .description("Search via Walmart Product. Real API: GET /search.json?engine=walmart_product")
      .operationId("searchWalmartProduct")
      .tag("E-Commerce")
      .extension("x-serpapi-engine", "walmart_product")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/walmart_product_reviews")
      .query(Type.Object({
        product_id: Type.String({ description: "Parameter defines the unique product identifier to get reviews of a specific product. You need to pass the `us_item_id`. It can be found from either Organic Results API or Product API results." }),
        rating: Type.Optional(Type.Union([Type.Literal("1"), Type.Literal("2"), Type.Literal("3"), Type.Literal("4"), Type.Literal("5")], { description: "Parameter is used for filtering reviews by rating. It can be set to: `1`: 1-star, `2`: 2-star, `3`: 3-star, `4`: 4-star, `5`: 5-star." })),
        sort: Type.Optional(Type.Union([Type.Literal("relevancy"), Type.Literal("helpful"), Type.Literal("submission-desc"), Type.Literal("submission-asc"), Type.Literal("rating-desc"), Type.Literal("rating-asc")], { description: "Parameter is used for sorting reviews. It can be set to: `relevancy`, `helpful`, `submission-desc`, `submission-asc`, `rating-desc`, `rating-asc`" })),
        page: Type.Optional(Type.Number({ description: "Value is used to get the reviews on a specific page. (e.g., `1` (default) is the first page of results, `2` is the 2nd page of results, `3` is the 3rd page of results, etc.)." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Walmart Product Reviews results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Walmart Product Reviews search results" }))
      .summary("Walmart Product Reviews")
      .description("Search via Walmart Product Reviews. Real API: GET /search.json?engine=walmart_product_reviews")
      .operationId("searchWalmartProductReviews")
      .tag("E-Commerce")
      .extension("x-serpapi-engine", "walmart_product_reviews")
      .extension("x-serpapi-real-path", "/search.json")

    g.get("/walmart_product_sellers")
      .query(Type.Object({
        product_id: Type.String({ description: "Parameter defines the unique product identifier to get more seller options of a specific product. You need to pass the `us_item_id`. It can be found from either Organic Results API or Product API results." }),
        store_id: Type.Optional(Type.String({ description: "Store ID to filter the products by the specific store only. Head to the Walmart Stores Locations for a full list of supported stores. It's possible for the product pricing to differ between stores." })),
        no_cache: Type.Optional(Type.Boolean({ description: "Parameter will force SerpApi to fetch the Walmart Product Sellers results even if a cached version is already present. A cache is served only if the query and all parameters are exactly the same. Cache expires after 1h. Cached searches are free, and are not counted towards your searches per month. It can be set to `false` (default) to allow results from the cache, or `true` to disallow results from the cache. no\\_cache and async parameters should not be used together." })),
        async: Type.Optional(Type.String({ description: "Parameter defines the way you want to submit your search to SerpApi. It can be set to `false` (default) to open an HTTP connection and keep it open until you got your search results, or `true` to just submit your search to SerpApi and retrieve them later. In this case, you'll need to use our Searches Archive API to retrieve your results. async and no\\_cache parameters should not be used together. async should not be used on accounts with Ludicrous Speed enabled." })),
        zero_trace: Type.Optional(Type.String({ description: "Enterprise only. Parameter enables ZeroTrace mode. It can be set to `false` (default) or `true`. Enable this mode to skip storing search parameters, search files, and search metadata on our servers. This may make debugging more difficult." })),
        output: Type.Optional(Type.String({ description: "Parameter defines the final output you want. It can be set to json (default) to get a structured `JSON` of the results, or `html` to get the raw html retrieved." })),
        json_restrictor: Type.Optional(Type.String({ description: "Parameter defines the fields you want to restrict in the outputs for smaller, faster responses. See JSON Restrictor for more details." })),
      }))
      .response(Type.Unknown({ description: "Walmart Product Sellers search results" }))
      .summary("Walmart Product Sellers")
      .description("Search via Walmart Product Sellers. Real API: GET /search.json?engine=walmart_product_sellers")
      .operationId("searchWalmartProductSellers")
      .tag("E-Commerce")
      .extension("x-serpapi-engine", "walmart_product_sellers")
      .extension("x-serpapi-real-path", "/search.json")

  })
}

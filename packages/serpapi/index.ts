import { Api } from "spac"
import { registerApple } from "./apple"
import { registerBaidu } from "./baidu"
import { registerBing } from "./bing"
import { registerDuckDuckGo } from "./duckduckgo"
import { registerEcommerce } from "./ecommerce"
import { registerGoogle } from "./google"
import { registerNaver } from "./naver"
import { registerSocial } from "./social"
import { registerYahoo } from "./yahoo"
import { registerYandex } from "./yandex"
import { registerYouTube } from "./youtube"
import { registerAccount } from "./account"

const api = new Api("3.1", "SerpAPI", {
  version: "1.0.0",
  description:
    "Comprehensive OpenAPI specification for SerpAPI — the real-time search engine results API. " +
    "Supports 107+ search engines including Google, Bing, Yahoo, YouTube, Amazon, Walmart, and more. " +
    "All search endpoints use virtual paths (e.g., /search/google) that map to GET /search.json?engine=<engine>. " +
    "See the x-serpapi-engine extension on each operation for the real engine parameter value.",
  contact: { name: "SerpAPI", url: "https://serpapi.com" },
  license: { name: "MIT", url: "https://opensource.org/licenses/MIT" },
})

api.server({ url: "https://serpapi.com", description: "SerpAPI Production Server" })

api.securityScheme("api_key", {
  type: "apiKey",
  name: "api_key",
  in: "query",
  description: "API key passed as a query parameter",
})
api.securityScheme("bearer", {
  type: "http",
  scheme: "bearer",
  description: "Bearer token in the Authorization header",
})

api.security("api_key")
api.security("bearer")

api.tag({ name: "Apple", description: "Apple App Store — search, product details, reviews" })
api.tag({ name: "Baidu", description: "Baidu search engines — web, news" })
api.tag({ name: "Bing", description: "Bing search engines — web, images, news, shopping, and more" })
api.tag({ name: "DuckDuckGo", description: "DuckDuckGo search engines — web, maps, news" })
api.tag({ name: "E-Commerce", description: "E-commerce search — Amazon, Walmart, eBay, Home Depot" })
api.tag({ name: "Google", description: "Google search engines — web, images, maps, scholar, trends, and more" })
api.tag({ name: "Naver", description: "Naver search engines — web, AI overview" })
api.tag({ name: "Social & Reviews", description: "Social and review platforms — Yelp, TripAdvisor, Facebook, OpenTable" })
api.tag({ name: "Yahoo", description: "Yahoo search engines — web, images, shopping, videos" })
api.tag({ name: "Yandex", description: "Yandex search engines — web, images, videos" })
api.tag({ name: "YouTube", description: "YouTube search — videos, transcripts, and more" })
api.tag({ name: "Account", description: "Account management, location lookup, and search archive" })

registerApple(api)
registerBaidu(api)
registerBing(api)
registerDuckDuckGo(api)
registerEcommerce(api)
registerGoogle(api)
registerNaver(api)
registerSocial(api)
registerYahoo(api)
registerYandex(api)
registerYouTube(api)
registerAccount(api)

const spec = api.emit()
console.log(JSON.stringify(spec, null, 2))

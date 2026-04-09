import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { AccountInfo, LocationResult, SearchArchiveResult, SerpApiError } from "../shared/schemas"
import AccountInfoExample from "./examples/account-info.json"
import LocationsAustinExample from "./examples/locations-austin.json"

export function registerAccount(api: Api) {
  api.get("/account")
    .response(AccountInfo)
    .summary("Account Information")
    .description("Returns account information including current plan, usage statistics, rate limits, and remaining quota. Free — does not count against your search quota.")
    .operationId("getAccount")
    .tag("Account")
    .example("demo-account", { summary: "Big Data Plan account", value: AccountInfoExample })

  api.get("/locations")
    .query(Type.Object({
      q: Type.Optional(Type.String({ description: "Location search query (e.g., 'Austin', 'London, UK')" })),
      limit: Type.Optional(Type.Integer({ description: "Maximum number of results (1-10)", default: 5, minimum: 1, maximum: 10 })),
    }))
    .response(Type.Array(LocationResult))
    .summary("Location Search")
    .description("Find valid location strings for geo-targeted searches. Returns matching locations with Google-encoded UULE values, GPS coordinates, and reach estimates. Free — does not count against your search quota.")
    .operationId("getLocations")
    .tag("Account")
    .example("austin-locations", { summary: "Search for 'Austin'", value: LocationsAustinExample })

  api.get("/searches/{search_id}")
    .params(Type.Object({
      search_id: Type.String({ description: "The unique search identifier returned in search_metadata.id" }),
    }))
    .response(SearchArchiveResult)
    .error(404, SerpApiError)
    .summary("Search Archive")
    .description("Retrieve past search results by their unique ID. Results are stored for 31 days after the original search. The response format matches the original engine's response schema.")
    .operationId("getSearchArchive")
    .tag("Account")
}

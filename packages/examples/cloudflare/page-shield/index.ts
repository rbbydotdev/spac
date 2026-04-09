import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages, PageShieldId } from "../shared/schemas"
import {
  PageShieldApiResponseCommonFailure,
  PageShieldEnabled,
  PageShieldGetZoneConnectionResponse,
  PageShieldGetZoneCookieResponse,
  PageShieldGetZonePolicyResponse,
  PageShieldGetZoneScriptResponse,
  PageShieldGetZoneSettingsResponse,
  PageShieldListZoneConnectionsResponse,
  PageShieldListZoneCookiesResponse,
  PageShieldListZonePoliciesResponse,
  PageShieldListZoneScriptsResponse,
  PageShieldPolicy,
  PageShieldPolicyAction,
  PageShieldPolicyDescription,
  PageShieldPolicyEnabled,
  PageShieldPolicyExpression,
  PageShieldPolicyValue,
  PageShieldUseCloudflareReportingEndpoint,
  PageShieldUseConnectionUrlPath,
} from "./schemas"

export function registerPageShield(api: Api) {
  api.group("/zones/{zone_id}/page_shield", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      responses: {
        200: Type.Object({
          errors: Type.Optional(D1Messages),
          messages: Type.Optional(D1Messages),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
          result: Type.Optional(PageShieldGetZoneSettingsResponse),
        }),
        "4XX": PageShieldApiResponseCommonFailure,
      },
    })
      .summary("Get Page Shield settings")
      .description("Fetches the Page Shield settings.")
      .operationId("page-shield-get-settings")
      .tag("Page Shield")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Page Shield",
        "Domain Page Shield Read",
        "Domain Page Shield",
        "Page Shield Read",
        "Zone Settings Write",
        "Zone Settings Read",
      ])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.put("/", {
      body: Type.Object({
        enabled: Type.Optional(PageShieldEnabled),
        use_cloudflare_reporting_endpoint: Type.Optional(PageShieldUseCloudflareReportingEndpoint),
        use_connection_url_path: Type.Optional(PageShieldUseConnectionUrlPath),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Optional(D1Messages),
          messages: Type.Optional(D1Messages),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
          result: Type.Optional(PageShieldGetZoneSettingsResponse),
        }),
        "4XX": PageShieldApiResponseCommonFailure,
      },
    })
      .summary("Update Page Shield settings")
      .description("Updates Page Shield settings.")
      .operationId("page-shield-update-settings")
      .tag("Page Shield")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Page Shield", "Domain Page Shield", "Zone Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/connections", {
      query: Type.Object({
        exclude_urls: Type.Optional(
          Type.String({
            description: "Excludes connections whose URL contains one of the URL-encoded URLs separated by commas.\n",
          }),
        ),
        urls: Type.Optional(
          Type.String({
            description: "Includes connections whose URL contain one or more URL-encoded URLs separated by commas.\n",
          }),
        ),
        hosts: Type.Optional(
          Type.String({
            description:
              "Includes connections that match one or more URL-encoded hostnames separated by commas.\n\nWildcards are supported at the start and end of each hostname to support starts with, ends with\nand contains. If no wildcards are used, results will be filtered by exact match\n",
          }),
        ),
        page: Type.Optional(
          Type.String({
            description:
              'The current page number of the paginated results.\n\nWe additionally support a special value "all". When "all" is used, the API will return all the connections\nwith the applied filters in a single page. This feature is best-effort and it may only work for zones with\na low number of connections\n',
          }),
        ),
        per_page: Type.Optional(
          Type.Number({ description: "The number of results per page.", minimum: 1, maximum: 100 }),
        ),
        order_by: Type.Optional(
          Type.Union([Type.Literal("first_seen_at"), Type.Literal("last_seen_at")], {
            description: "The field used to sort returned connections.",
          }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
            description: "The direction used to sort returned connections.",
          }),
        ),
        prioritize_malicious: Type.Optional(
          Type.Boolean({ description: "When true, malicious connections appear first in the returned connections." }),
        ),
        exclude_cdn_cgi: Type.Optional(
          Type.Boolean({
            description:
              "When true, excludes connections seen in a `/cdn-cgi` path from the returned connections. The default value is true.",
          }),
        ),
        status: Type.Optional(
          Type.String({
            description:
              "Filters the returned connections using a comma-separated list of connection statuses. Accepted values: `active`, `infrequent`, and `inactive`. The default value is `active`.",
          }),
        ),
        page_url: Type.Optional(
          Type.String({
            description:
              "Includes connections that match one or more page URLs (separated by commas) where they were last seen\n\nWildcards are supported at the start and end of each page URL to support starts with, ends with\nand contains. If no wildcards are used, results will be filtered by exact match\n",
          }),
        ),
        export: Type.Optional(
          Type.Union([Type.Literal("csv")], {
            description: "Export the list of connections as a file, limited to 50000 entries.",
          }),
        ),
      }),
      responses: {
        200: PageShieldListZoneConnectionsResponse,
        "4XX": PageShieldApiResponseCommonFailure,
      },
    })
      .summary("List Page Shield connections")
      .description("Lists all connections detected by Page Shield.")
      .operationId("page-shield-list-connections")
      .tag("Page Shield")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Page Shield",
        "Domain Page Shield Read",
        "Domain Page Shield",
        "Page Shield Read",
        "Zone Settings Write",
        "Zone Settings Read",
      ])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.get("/connections/{connection_id}", {
      params: Type.Object({ connection_id: PageShieldId }),
      responses: {
        200: PageShieldGetZoneConnectionResponse,
        "4XX": PageShieldApiResponseCommonFailure,
      },
    })
      .summary("Get a Page Shield connection")
      .description("Fetches a connection detected by Page Shield by connection ID.")
      .operationId("page-shield-get-connection")
      .tag("Page Shield")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Page Shield",
        "Domain Page Shield Read",
        "Domain Page Shield",
        "Page Shield Read",
        "Zone Settings Write",
        "Zone Settings Read",
      ])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.get("/cookies", {
      query: Type.Object({
        hosts: Type.Optional(
          Type.String({
            description:
              "Includes cookies that match one or more URL-encoded hostnames separated by commas.\n\nWildcards are supported at the start and end of each hostname to support starts with, ends with\nand contains. If no wildcards are used, results will be filtered by exact match\n",
          }),
        ),
        page: Type.Optional(
          Type.String({
            description:
              'The current page number of the paginated results.\n\nWe additionally support a special value "all". When "all" is used, the API will return all the cookies\nwith the applied filters in a single page. This feature is best-effort and it may only work for zones with \na low number of cookies\n',
          }),
        ),
        per_page: Type.Optional(
          Type.Number({ description: "The number of results per page.", minimum: 1, maximum: 100 }),
        ),
        order_by: Type.Optional(
          Type.Union([Type.Literal("first_seen_at"), Type.Literal("last_seen_at")], {
            description: "The field used to sort returned cookies.",
          }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
            description: "The direction used to sort returned cookies.'",
          }),
        ),
        page_url: Type.Optional(
          Type.String({
            description:
              "Includes connections that match one or more page URLs (separated by commas) where they were last seen\n\nWildcards are supported at the start and end of each page URL to support starts with, ends with\nand contains. If no wildcards are used, results will be filtered by exact match\n",
          }),
        ),
        export: Type.Optional(
          Type.Union([Type.Literal("csv")], {
            description: "Export the list of cookies as a file, limited to 50000 entries.",
          }),
        ),
        name: Type.Optional(
          Type.String({
            description:
              "Filters the returned cookies that match the specified name.\nWildcards are supported at the start and end to support starts with, ends with\nand contains. e.g. session*\n",
            maxLength: 1024,
          }),
        ),
        secure: Type.Optional(Type.Boolean({ description: "Filters the returned cookies that are set with Secure" })),
        http_only: Type.Optional(
          Type.Boolean({ description: "Filters the returned cookies that are set with HttpOnly" }),
        ),
        same_site: Type.Optional(
          Type.Union([Type.Literal("lax"), Type.Literal("strict"), Type.Literal("none")], {
            description: "Filters the returned cookies that match the specified same_site attribute",
          }),
        ),
        type: Type.Optional(
          Type.Union([Type.Literal("first_party"), Type.Literal("unknown")], {
            description: "Filters the returned cookies that match the specified type attribute",
          }),
        ),
        path: Type.Optional(
          Type.String({
            description: "Filters the returned cookies that match the specified path attribute",
            maxLength: 1024,
          }),
        ),
        domain: Type.Optional(
          Type.String({
            description: "Filters the returned cookies that match the specified domain attribute",
            maxLength: 1024,
          }),
        ),
      }),
      responses: {
        200: PageShieldListZoneCookiesResponse,
        "4XX": PageShieldApiResponseCommonFailure,
      },
    })
      .summary("List Page Shield Cookies")
      .description("Lists all cookies collected by Page Shield.")
      .operationId("page-shield-list-cookies")
      .tag("Page Shield")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Page Shield",
        "Domain Page Shield Read",
        "Domain Page Shield",
        "Page Shield Read",
        "Zone Settings Write",
        "Zone Settings Read",
      ])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.get("/cookies/{cookie_id}", {
      params: Type.Object({ cookie_id: PageShieldId }),
      responses: {
        200: PageShieldGetZoneCookieResponse,
        "4XX": PageShieldApiResponseCommonFailure,
      },
    })
      .summary("Get a Page Shield cookie")
      .description("Fetches a cookie collected by Page Shield by cookie ID.")
      .operationId("page-shield-get-cookie")
      .tag("Page Shield")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Page Shield",
        "Domain Page Shield Read",
        "Domain Page Shield",
        "Page Shield Read",
        "Zone Settings Write",
        "Zone Settings Read",
      ])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.get("/policies", {
      responses: {
        200: PageShieldListZonePoliciesResponse,
        "4XX": PageShieldApiResponseCommonFailure,
      },
    })
      .summary("List Page Shield policies")
      .description("Lists all Page Shield policies.")
      .operationId("page-shield-list-policies")
      .tag("Page Shield")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Page Shield",
        "Domain Page Shield Read",
        "Domain Page Shield",
        "Page Shield Read",
        "Zone Settings Write",
        "Zone Settings Read",
      ])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.post("/policies", {
      body: PageShieldPolicy,
      responses: {
        200: PageShieldGetZonePolicyResponse,
        "4XX": PageShieldApiResponseCommonFailure,
      },
    })
      .summary("Create a Page Shield policy")
      .description("Create a Page Shield policy.")
      .operationId("page-shield-create-policy")
      .tag("Page Shield")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Page Shield", "Domain Page Shield", "Zone Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/policies/{policy_id}", {
      params: Type.Object({ policy_id: PageShieldId }),
      responses: {
        200: PageShieldGetZonePolicyResponse,
        "4XX": PageShieldApiResponseCommonFailure,
      },
    })
      .summary("Get a Page Shield policy")
      .description("Fetches a Page Shield policy by ID.")
      .operationId("page-shield-get-policy")
      .tag("Page Shield")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Page Shield",
        "Domain Page Shield Read",
        "Domain Page Shield",
        "Page Shield Read",
        "Zone Settings Write",
        "Zone Settings Read",
      ])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.put("/policies/{policy_id}", {
      params: Type.Object({ policy_id: PageShieldId }),
      body: Type.Object({
        action: Type.Optional(PageShieldPolicyAction),
        description: Type.Optional(PageShieldPolicyDescription),
        enabled: Type.Optional(PageShieldPolicyEnabled),
        expression: Type.Optional(PageShieldPolicyExpression),
        value: Type.Optional(PageShieldPolicyValue),
      }),
      responses: {
        200: PageShieldGetZonePolicyResponse,
        "4XX": PageShieldApiResponseCommonFailure,
      },
    })
      .summary("Update a Page Shield policy")
      .description("Update a Page Shield policy by ID.")
      .operationId("page-shield-update-policy")
      .tag("Page Shield")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Page Shield", "Domain Page Shield", "Zone Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.delete("/policies/{policy_id}", {
      params: Type.Object({ policy_id: PageShieldId }),
      responses: {
        "4XX": PageShieldApiResponseCommonFailure,
      },
    })
      .summary("Delete a Page Shield policy")
      .description("Delete a Page Shield policy by ID.")
      .operationId("page-shield-delete-policy")
      .tag("Page Shield")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Page Shield", "Domain Page Shield", "Zone Settings Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/scripts", {
      query: Type.Object({
        exclude_urls: Type.Optional(
          Type.String({
            description: "Excludes scripts whose URL contains one of the URL-encoded URLs separated by commas.\n",
          }),
        ),
        urls: Type.Optional(
          Type.String({
            description: "Includes scripts whose URL contain one or more URL-encoded URLs separated by commas.\n",
          }),
        ),
        hosts: Type.Optional(
          Type.String({
            description:
              "Includes scripts that match one or more URL-encoded hostnames separated by commas.\n\nWildcards are supported at the start and end of each hostname to support starts with, ends with\nand contains. If no wildcards are used, results will be filtered by exact match\n",
          }),
        ),
        page: Type.Optional(
          Type.String({
            description:
              'The current page number of the paginated results.\n\nWe additionally support a special value "all". When "all" is used, the API will return all the scripts\nwith the applied filters in a single page. This feature is best-effort and it may only work for zones with \na low number of scripts\n',
          }),
        ),
        per_page: Type.Optional(
          Type.Number({ description: "The number of results per page.", minimum: 1, maximum: 100 }),
        ),
        order_by: Type.Optional(
          Type.Union([Type.Literal("first_seen_at"), Type.Literal("last_seen_at")], {
            description: "The field used to sort returned scripts.",
          }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
            description: "The direction used to sort returned scripts.",
          }),
        ),
        prioritize_malicious: Type.Optional(
          Type.Boolean({ description: "When true, malicious scripts appear first in the returned scripts." }),
        ),
        exclude_cdn_cgi: Type.Optional(
          Type.Boolean({
            description:
              "When true, excludes scripts seen in a `/cdn-cgi` path from the returned scripts. The default value is true.",
            default: true,
          }),
        ),
        exclude_duplicates: Type.Optional(
          Type.Boolean({
            description:
              "When true, excludes duplicate scripts. We consider a script duplicate of another if their javascript\ncontent matches and they share the same url host and zone hostname. In such case, we return the most\nrecent script for the URL host and zone hostname combination.\n",
            default: true,
          }),
        ),
        status: Type.Optional(
          Type.String({
            description:
              "Filters the returned scripts using a comma-separated list of scripts statuses. Accepted values: `active`, `infrequent`, and `inactive`. The default value is `active`.",
          }),
        ),
        page_url: Type.Optional(
          Type.String({
            description:
              "Includes scripts that match one or more page URLs (separated by commas) where they were last seen\n\nWildcards are supported at the start and end of each page URL to support starts with, ends with\nand contains. If no wildcards are used, results will be filtered by exact match\n",
          }),
        ),
        export: Type.Optional(
          Type.Union([Type.Literal("csv")], {
            description: "Export the list of scripts as a file, limited to 50000 entries.",
          }),
        ),
      }),
      responses: {
        200: PageShieldListZoneScriptsResponse,
        "4XX": PageShieldApiResponseCommonFailure,
      },
    })
      .summary("List Page Shield scripts")
      .description("Lists all scripts detected by Page Shield.")
      .operationId("page-shield-list-scripts")
      .tag("Page Shield")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Page Shield",
        "Domain Page Shield Read",
        "Domain Page Shield",
        "Page Shield Read",
        "Zone Settings Write",
        "Zone Settings Read",
      ])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

    g.get("/scripts/{script_id}", {
      params: Type.Object({ script_id: PageShieldId }),
      responses: {
        200: PageShieldGetZoneScriptResponse,
        "4XX": PageShieldApiResponseCommonFailure,
      },
    })
      .summary("Get a Page Shield script")
      .description("Fetches a script detected by Page Shield by script ID.")
      .operationId("page-shield-get-script")
      .tag("Page Shield")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Page Shield",
        "Domain Page Shield Read",
        "Domain Page Shield",
        "Page Shield Read",
        "Zone Settings Write",
        "Zone Settings Read",
      ])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })
  })
}

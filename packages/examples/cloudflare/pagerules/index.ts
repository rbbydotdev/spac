import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier, ZonesSchemasApiResponseCommonFailure } from "../shared/schemas"
import {
  ZonesActions,
  ZonesPageRule,
  ZonesPriority,
  ZonesSchemasApiResponseSingleId,
  ZonesSettings,
  ZonesStatus,
  ZonesTargets,
} from "./schemas"

export function registerPagerules(api: Api) {
  api.group("/zones/{zone_id}/pagerules", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        order: Type.Optional(
          Type.Union([Type.Literal("status"), Type.Literal("priority")], {
            description: "The field used to sort returned Page Rules.",
          }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
            description: "The direction used to sort returned Page Rules.",
          }),
        ),
        match: Type.Optional(
          Type.Union([Type.Literal("any"), Type.Literal("all")], {
            description:
              "When set to `all`, all the search requirements must match. When set to `any`, only one of the search requirements has to match.",
          }),
        ),
        status: Type.Optional(
          Type.Union([Type.Literal("active"), Type.Literal("disabled")], {
            description: "The status of the Page Rule.",
          }),
        ),
      }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(Type.Array(ZonesPageRule)),
        }),
        "4XX": ZonesSchemasApiResponseCommonFailure,
      },
    })
      .summary("List Page Rules")
      .description("Fetches Page Rules in a zone.")
      .operationId("page-rules-list-page-rules")
      .tag("Page Rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Read", "Zone Write", "Page Rules Write", "Page Rules Read"])

    g.post("/", {
      body: Type.Object({
        actions: ZonesActions,
        priority: Type.Optional(ZonesPriority),
        status: Type.Optional(ZonesStatus),
        targets: ZonesTargets,
      }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(ZonesPageRule),
        }),
        "4XX": ZonesSchemasApiResponseCommonFailure,
      },
    })
      .summary("Create a Page Rule")
      .description("Creates a new Page Rule.")
      .operationId("page-rules-create-a-page-rule")
      .tag("Page Rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Write", "Page Rules Write"])

    g.get("/settings", {
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(ZonesSettings),
        }),
        "4XX": ZonesSchemasApiResponseCommonFailure,
      },
    })
      .summary("List available Page Rules settings")
      .description("Returns a list of settings (and their details) that Page Rules can apply to matching requests.")
      .operationId("available-page-rules-settings-list-available-page-rules-settings")
      .tag("Available Page Rules settings")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Read", "Zone Write", "Page Rules Write", "Page Rules Read"])

    g.get("/{pagerule_id}", {
      params: Type.Object({ pagerule_id: DlsIdentifier }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(ZonesPageRule),
        }),
        "4XX": ZonesSchemasApiResponseCommonFailure,
      },
    })
      .summary("Get a Page Rule")
      .description("Fetches the details of a Page Rule.")
      .operationId("page-rules-get-a-page-rule")
      .tag("Page Rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Trust and Safety Write",
        "Trust and Safety Read",
        "Zero Trust: PII Read",
        "Zaraz Edit",
        "Zaraz Read",
        "Zaraz Admin",
        "Access: Apps and Policies Revoke",
        "Access: Apps and Policies Write",
        "Access: Apps and Policies Read",
        "Access: Apps and Policies Revoke",
        "Access: Mutual TLS Certificates Write",
        "Access: Organizations, Identity Providers, and Groups Write",
        "Zone Settings Write",
        "Zone Settings Read",
        "Zone Read",
        "DNS Read",
        "Workers Scripts Write",
        "Workers Scripts Read",
        "Zone Write",
        "Workers Routes Write",
        "Workers Routes Read",
        "Stream Write",
        "Stream Read",
        "SSL and Certificates Write",
        "SSL and Certificates Read",
        "Logs Write",
        "Logs Read",
        "Cache Purge",
        "Page Rules Write",
        "Page Rules Read",
        "Load Balancers Write",
        "Load Balancers Read",
        "Firewall Services Write",
        "Firewall Services Read",
        "DNS Write",
        "Apps Write",
        "Analytics Read",
        "Access: Apps and Policies Write",
        "Access: Apps and Policies Read",
      ])

    g.put("/{pagerule_id}", {
      params: Type.Object({ pagerule_id: DlsIdentifier }),
      body: Type.Object({
        actions: ZonesActions,
        priority: Type.Optional(ZonesPriority),
        status: Type.Optional(ZonesStatus),
        targets: ZonesTargets,
      }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(ZonesPageRule),
        }),
        "4XX": ZonesSchemasApiResponseCommonFailure,
      },
    })
      .summary("Update a Page Rule")
      .description(
        "Replaces the configuration of an existing Page Rule. The configuration of the updated Page Rule will exactly match the data passed in the API request.",
      )
      .operationId("page-rules-update-a-page-rule")
      .tag("Page Rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Write", "Page Rules Write"])

    g.patch("/{pagerule_id}", {
      params: Type.Object({ pagerule_id: DlsIdentifier }),
      body: Type.Object({
        actions: Type.Optional(ZonesActions),
        priority: Type.Optional(ZonesPriority),
        status: Type.Optional(ZonesStatus),
        targets: Type.Optional(ZonesTargets),
      }),
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(ZonesPageRule),
        }),
        "4XX": ZonesSchemasApiResponseCommonFailure,
      },
    })
      .summary("Edit a Page Rule")
      .description("Updates one or more fields of an existing Page Rule.")
      .operationId("page-rules-edit-a-page-rule")
      .tag("Page Rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Write", "Page Rules Write"])

    g.delete("/{pagerule_id}", {
      params: Type.Object({ pagerule_id: DlsIdentifier }),
      responses: {
        200: ZonesSchemasApiResponseSingleId,
        "4XX": ZonesSchemasApiResponseCommonFailure,
      },
    })
      .summary("Delete a Page Rule")
      .description("Deletes an existing Page Rule.")
      .operationId("page-rules-delete-a-page-rule")
      .tag("Page Rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zone Write", "Page Rules Write"])
  })
}

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"
import {
  AaaAuditLogsV2ResponseCollection,
  AaaSchemasApiResponseCommonFailure,
  LogcontrolApiResponseCommonFailure,
  LogcontrolCmbConfig,
  LogcontrolCmbConfigResponseSingle,
  LogcontrolRetentionFlag,
  LogcontrolRetentionFlagResponseSingle,
  LogshareApiResponseCommonFailure,
  LogshareCount,
  LogshareEnd,
  LogshareFields,
  LogshareFieldsResponse,
  LogshareLogsResponseJsonLines,
  LogshareRayIdentifier,
  LogshareSample,
  LogshareStart,
  LogshareTimestamps,
} from "./schemas"

export function registerLogs(api: Api) {
  api.assertVersion("3.0.3", "Logs")

  api
    .get("/accounts/{account_id}/logs/audit", {
      params: Type.Object({ account_id: Type.String({ description: "The unique id that identifies the account." }) }),
      query: Type.Object({
        account_name: Type.Optional(Type.Array(Type.String(), { description: "Filters by the account name." })),
        action_result: Type.Optional(
          Type.Array(Type.Union([Type.Literal("success"), Type.Literal("failure")]), {
            description: "Filters by whether the action was successful or not.",
          }),
        ),
        action_type: Type.Optional(
          Type.Array(
            Type.Union([Type.Literal("create"), Type.Literal("delete"), Type.Literal("view"), Type.Literal("update")]),
            { description: "Filters by the action type." },
          ),
        ),
        actor_context: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal("api_key"),
              Type.Literal("api_token"),
              Type.Literal("dash"),
              Type.Literal("oauth"),
              Type.Literal("origin_ca_key"),
            ]),
            { description: "Filters by the actor context." },
          ),
        ),
        actor_email: Type.Optional(
          Type.Array(Type.String({ format: "email" }), { description: "Filters by the actor's email address." }),
        ),
        actor_id: Type.Optional(
          Type.Array(Type.String(), {
            description: "Filters by the actor ID. This can be either the Account ID or User ID.",
          }),
        ),
        actor_ip_address: Type.Optional(
          Type.Array(Type.String(), { description: "The IP address where the action was initiated." }),
        ),
        actor_token_id: Type.Optional(
          Type.Array(Type.String(), {
            description: "Filters by the API token ID when the actor context is an api_token or oauth.",
          }),
        ),
        actor_token_name: Type.Optional(
          Type.Array(Type.String(), {
            description: "Filters by the API token name when the actor context is an api_token or oauth.",
          }),
        ),
        actor_type: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal("account"),
              Type.Literal("cloudflare_admin"),
              Type.Literal("system"),
              Type.Literal("user"),
            ]),
            { description: "Filters by the actor type." },
          ),
        ),
        audit_log_id: Type.Optional(Type.Array(Type.String(), { description: "Finds a specific log by its ID." })),
        raw_cf_ray_id: Type.Optional(Type.Array(Type.String(), { description: "Filters by the response CF Ray ID." })),
        raw_method: Type.Optional(Type.Array(Type.String(), { description: "The HTTP method for the API call." })),
        raw_status_code: Type.Optional(
          Type.Array(Type.Integer(), { description: "The response status code that was returned." }),
        ),
        raw_uri: Type.Optional(Type.Array(Type.String(), { description: "Filters by the request URI." })),
        resource_id: Type.Optional(Type.Array(Type.String(), { description: "Filters by the resource ID." })),
        resource_product: Type.Optional(
          Type.Array(Type.String(), {
            description: "Filters audit logs by the Cloudflare product associated with the changed resource.",
          }),
        ),
        resource_type: Type.Optional(
          Type.Array(Type.String(), {
            description: "Filters audit logs based on the unique type of resource changed by the action.",
          }),
        ),
        resource_scope: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal("accounts"),
              Type.Literal("user"),
              Type.Literal("zones"),
              Type.Literal("memberships"),
            ]),
            {
              description:
                "Filters by the resource scope, specifying whether the resource is associated with an user, an account, or a zone.",
            },
          ),
        ),
        zone_id: Type.Optional(Type.Array(Type.String(), { description: "Filters by the zone ID." })),
        zone_name: Type.Optional(
          Type.Array(Type.String(), { description: "Filters by the zone name associated with the change." }),
        ),
        "account_name.not": Type.Optional(
          Type.Array(Type.String(), { description: "Filters out audit logs by the account name." }),
        ),
        "action_result.not": Type.Optional(
          Type.Array(Type.Union([Type.Literal("success"), Type.Literal("failure")]), {
            description: "Filters out audit logs by whether the action was successful or not.",
          }),
        ),
        "action_type.not": Type.Optional(
          Type.Array(
            Type.Union([Type.Literal("create"), Type.Literal("delete"), Type.Literal("view"), Type.Literal("update")]),
            { description: "Filters out audit logs by the action type." },
          ),
        ),
        "actor_context.not": Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal("api_key"),
              Type.Literal("api_token"),
              Type.Literal("dash"),
              Type.Literal("oauth"),
              Type.Literal("origin_ca_key"),
            ]),
            { description: "Filters out audit logs by the actor context." },
          ),
        ),
        "actor_email.not": Type.Optional(
          Type.Array(Type.String({ format: "email" }), {
            description: "Filters out audit logs by the actor's email address.",
          }),
        ),
        "actor_id.not": Type.Optional(
          Type.Array(Type.String(), {
            description: "Filters out audit logs by the actor ID. This can be either the Account ID or User ID.",
          }),
        ),
        "actor_ip_address.not": Type.Optional(
          Type.Array(Type.String(), {
            description: "Filters out audit logs IP address where the action was initiated.",
          }),
        ),
        "actor_token_id.not": Type.Optional(
          Type.Array(Type.String(), {
            description: "Filters out audit logs by the API token ID when the actor context is an api_token or oauth.",
          }),
        ),
        "actor_token_name.not": Type.Optional(
          Type.Array(Type.String(), {
            description:
              "Filters out audit logs by the API token name when the actor context is an api_token or oauth.",
          }),
        ),
        "actor_type.not": Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal("account"),
              Type.Literal("cloudflare_admin"),
              Type.Literal("system"),
              Type.Literal("user"),
            ]),
            { description: "Filters out audit logs by the actor type." },
          ),
        ),
        "audit_log_id.not": Type.Optional(
          Type.Array(Type.String(), { description: "Filters out audit logs by their IDs." }),
        ),
        "raw_cf_ray_id.not": Type.Optional(
          Type.Array(Type.String(), { description: "Filters out audit logs by the response CF Ray ID." }),
        ),
        "raw_method.not": Type.Optional(
          Type.Array(Type.String(), { description: "Filters out audit logs by the HTTP method for the API call." }),
        ),
        "raw_status_code.not": Type.Optional(
          Type.Array(Type.Integer(), {
            description: "Filters out audit logs by the response status code that was returned.",
          }),
        ),
        "raw_uri.not": Type.Optional(
          Type.Array(Type.String(), { description: "Filters out audit logs by the request URI." }),
        ),
        "resource_id.not": Type.Optional(
          Type.Array(Type.String(), { description: "Filters out audit logs by the resource ID." }),
        ),
        "resource_product.not": Type.Optional(
          Type.Array(Type.String(), {
            description: "Filters out audit logs by the Cloudflare product associated with the changed resource.",
          }),
        ),
        "resource_type.not": Type.Optional(
          Type.Array(Type.String(), {
            description: "Filters out audit logs based on the unique type of resource changed by the action.",
          }),
        ),
        "resource_scope.not": Type.Optional(
          Type.Array(Type.Union([Type.Literal("accounts"), Type.Literal("user"), Type.Literal("zones")]), {
            description:
              "Filters out audit logs by the resource scope, specifying whether the resource is associated with an user, an account, or a zone.",
          }),
        ),
        "zone_id.not": Type.Optional(
          Type.Array(Type.String(), { description: "Filters out audit logs by the zone ID." }),
        ),
        "zone_name.not": Type.Optional(
          Type.Array(Type.String(), {
            description: "Filters out audit logs by the zone name associated with the change.",
          }),
        ),
        since: Type.String({ format: "date" }),
        before: Type.String({ format: "date" }),
        direction: Type.Optional(
          Type.Union([Type.Literal("desc"), Type.Literal("asc")], { description: "Sets sorting order." }),
        ),
        limit: Type.Optional(
          Type.Number({
            description:
              "The number limits the objects to return. The cursor attribute may be used to iterate over the next batch of objects if there are more than the limit.",
            default: 100,
            minimum: 1,
            maximum: 1000,
          }),
        ),
        cursor: Type.Optional(
          Type.String({
            description:
              "The cursor is an opaque token used to paginate through large sets of records. It indicates the position from which to continue when requesting the next set of records. A valid cursor value can be obtained from the cursor object in the result_info structure of a previous response.",
          }),
        ),
      }),
    })
    .response(AaaAuditLogsV2ResponseCollection)
    .error("4XX", AaaSchemasApiResponseCommonFailure)
    .summary("Get account audit logs (Version 2, Beta release)")
    .description(
      "Gets a list of audit logs for an account. <br />  <br /> This is the beta release of Audit Logs Version 2. Since this is a beta version, there may be gaps or missing entries in the available audit logs. Be aware of the following limitations.  <br /> <ul> <li>Audit logs are available only for the past 30 days. <br /></li> <li>Error handling is not yet implemented.  <br /> </li> </ul>",
    )
    .operationId("audit-logs-v2-get-account-audit-logs")
    .tag("Audit Logs")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write", "Account Settings Read"])
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .get("/accounts/{account_id}/logs/control/cmb/config", {
      params: Type.Object({ account_id: DlsIdentifier }),
    })
    .response(LogcontrolCmbConfigResponseSingle)
    .error("4XX", LogcontrolApiResponseCommonFailure)
    .summary("Get CMB config")
    .description("Gets CMB config.")
    .operationId("get-accounts-account_id-logs-control-cmb-config")
    .tag("Logcontrol CMB config for an account")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Logs Write", "Logs Read"])
    .extension("x-cfPermissionsRequired", { enum: ["#logs:read", "#analytics:read"] })

  api
    .post("/accounts/{account_id}/logs/control/cmb/config", {
      params: Type.Object({ account_id: DlsIdentifier }),
      body: LogcontrolCmbConfig,
    })
    .response(LogcontrolCmbConfigResponseSingle)
    .error("4XX", LogcontrolApiResponseCommonFailure)
    .summary("Update CMB config")
    .description("Updates CMB config.")
    .operationId("post-accounts-account_id-logs-control-cmb-config")
    .tag("Logcontrol CMB config for an account")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Logs Write"])
    .extension("x-cfPermissionsRequired", { enum: ["#logs:edit"] })

  api
    .delete("/accounts/{account_id}/logs/control/cmb/config", {
      params: Type.Object({ account_id: DlsIdentifier }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Optional(Type.Union([Type.Null()])),
      }),
    )
    .error("4XX", LogcontrolApiResponseCommonFailure)
    .summary("Delete CMB config")
    .description("Deletes CMB config.")
    .operationId("delete-accounts-account_id-logs-control-cmb-config")
    .tag("Logcontrol CMB config for an account")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Logs Write"])
    .extension("x-cfPermissionsRequired", { enum: ["#logs:edit"] })

  api
    .get("/zones/{zone_id}/logs/control/retention/flag", {
      params: Type.Object({ zone_id: DlsIdentifier }),
    })
    .response(LogcontrolRetentionFlagResponseSingle)
    .error("4XX", LogcontrolApiResponseCommonFailure)
    .summary("Get log retention flag")
    .description("Gets log retention flag for Logpull API.")
    .operationId("get-zones-zone_id-logs-control-retention-flag")
    .tag("Logs Received")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Logs Write", "Logs Read"])
    .extension("x-cfPermissionsRequired", { enum: ["#logs:read", "#analytics:read"] })
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .post("/zones/{zone_id}/logs/control/retention/flag", {
      params: Type.Object({ zone_id: DlsIdentifier }),
      body: LogcontrolRetentionFlag,
    })
    .response(LogcontrolRetentionFlagResponseSingle)
    .error("4XX", LogcontrolApiResponseCommonFailure)
    .summary("Update log retention flag")
    .description("Updates log retention flag for Logpull API.")
    .operationId("post-zones-zone_id-logs-control-retention-flag")
    .tag("Logs Received")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Logs Write"])
    .extension("x-cfPermissionsRequired", { enum: ["#logs:edit"] })
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .get("/zones/{zone_id}/logs/rayids/{ray_id}", {
      params: Type.Object({ zone_id: DlsIdentifier, ray_id: LogshareRayIdentifier }),
      query: Type.Object({
        fields: Type.Optional(LogshareFields),
        timestamps: Type.Optional(LogshareTimestamps),
      }),
    })
    .response(LogshareLogsResponseJsonLines)
    .error("4XX", LogshareApiResponseCommonFailure)
    .summary("Get logs RayIDs")
    .description(
      "The `/rayids` api route allows lookups by specific rayid. The rayids route will return zero, one, or more records (ray ids are not unique).",
    )
    .operationId("get-zones-zone_id-logs-rayids-ray_id")
    .tag("Logs Received")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Logs Write", "Logs Read"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .get("/zones/{zone_id}/logs/received", {
      params: Type.Object({ zone_id: DlsIdentifier }),
      query: Type.Object({
        start: Type.Optional(LogshareStart),
        end: LogshareEnd,
        fields: Type.Optional(LogshareFields),
        sample: Type.Optional(LogshareSample),
        count: Type.Optional(LogshareCount),
        timestamps: Type.Optional(LogshareTimestamps),
      }),
    })
    .response(LogshareLogsResponseJsonLines)
    .error("4XX", LogshareApiResponseCommonFailure)
    .summary("Get logs received")
    .description(
      'The `/received` api route allows customers to retrieve their edge HTTP logs. The basic access pattern is "give me all the logs for zone Z for minute M", where the minute M refers to the time records were received at Cloudflare\'s central data center. `start` is inclusive, and `end` is exclusive. Because of that, to get all data, at minutely cadence, starting at 10AM, the proper values are: `start=2018-05-20T10:00:00Z&end=2018-05-20T10:01:00Z`, then `start=2018-05-20T10:01:00Z&end=2018-05-20T10:02:00Z` and so on; the overlap will be handled properly.',
    )
    .operationId("get-zones-zone_id-logs-received")
    .tag("Logs Received")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Logs Write", "Logs Read"])
    .extension("x-cfPermissionsRequired", { enum: ["#logs:read"] })
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

  api
    .get("/zones/{zone_id}/logs/received/fields", {
      params: Type.Object({ zone_id: DlsIdentifier }),
    })
    .response(LogshareFieldsResponse)
    .error("4XX", LogshareApiResponseCommonFailure)
    .summary("List fields")
    .description(
      "Lists all fields available. The response is json object with key-value pairs, where keys are field names, and values are descriptions.",
    )
    .operationId("get-zones-zone_id-logs-received-fields")
    .tag("Logs Received")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Logs Write", "Logs Read"])
    .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })
}

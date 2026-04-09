import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, InfraApiResponseCommonFailure, InfraSortingdirection } from "../shared/schemas"
import { InfraIpinfo, InfraTarget, InfraTargetarray, InfraTargetid } from "./schemas"

export function registerInfrastructure(api: Api) {
  api.assertVersion("3.0.3", "Infrastructure")

  api.group(
    "/accounts/{account_id}/infrastructure/targets",
    { params: Type.Object({ account_id: Type.String() }) },
    (g) => {
      g.get("/", {
        query: Type.Object({
          hostname: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          hostname_contains: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          virtual_network_id: Type.Optional(Type.Union([Type.String({ format: "uuid" }), Type.Null()])),
          ip_v4: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          ip_v6: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          created_before: Type.Optional(Type.Union([Type.String({ format: "date-time" }), Type.Null()])),
          created_after: Type.Optional(Type.Union([Type.String({ format: "date-time" }), Type.Null()])),
          modified_before: Type.Optional(Type.Union([Type.String({ format: "date-time" }), Type.Null()])),
          modified_after: Type.Optional(Type.Union([Type.String({ format: "date-time" }), Type.Null()])),
          ips: Type.Optional(Type.Array(Type.String())),
          target_ids: Type.Optional(Type.Array(Type.String({ format: "uuid" }))),
          ip_like: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          ipv4_start: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          ipv4_end: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          ipv6_start: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          ipv6_end: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          page: Type.Optional(Type.Integer({ format: "int32", default: 1, minimum: 1 })),
          per_page: Type.Optional(Type.Integer({ format: "int32", default: 1000, minimum: 1, maximum: 1000 })),
          order: Type.Optional(Type.Union([Type.Literal("hostname"), Type.Literal("created_at")])),
          direction: Type.Optional(InfraSortingdirection),
        }),
      })
        .response(
          Type.Object({
            errors: DlpMessages,
            messages: DlpMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result_info: Type.Optional(
              Type.Object({
                count: Type.Optional(
                  Type.Number({ description: "Total number of results for the requested service." }),
                ),
                page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
                per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
                total_count: Type.Optional(
                  Type.Number({ description: "Total results available without any search parameters." }),
                ),
              }),
            ),
            result: Type.Optional(InfraTargetarray),
          }),
        )
        .error("4XX", InfraApiResponseCommonFailure)
        .summary("List all targets")
        .description("Lists and sorts an account’s targets. Filters are optional and are ANDed\ntogether.")
        .operationId("infra-targets-list")
        .tag("Infrastructure Access Targets")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.post("/", {
        body: Type.Object({
          hostname: Type.String({
            description:
              "A non-unique field that refers to a target. Case insensitive, maximum\nlength of 255 characters, supports the use of special characters dash\nand period, does not support spaces, and must start and end with an\nalphanumeric character.",
            "x-auditable": true,
          }),
          ip: InfraIpinfo,
        }),
      })
        .response(
          Type.Object({
            errors: DlpMessages,
            messages: DlpMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(InfraTarget),
          }),
        )
        .error("4XX", InfraApiResponseCommonFailure)
        .summary("Create new target")
        .operationId("infra-targets-post")
        .tag("Infrastructure Access Targets")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.put("/batch", {
        body: Type.Array(
          Type.Object({
            hostname: Type.String({
              description:
                "A non-unique field that refers to a target. Case insensitive, maximum\nlength of 255 characters, supports the use of special characters dash\nand period, does not support spaces, and must start and end with an\nalphanumeric character.",
              "x-auditable": true,
            }),
            ip: InfraIpinfo,
          }),
        ),
      })
        .response(
          Type.Object({
            errors: DlpMessages,
            messages: DlpMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(InfraTargetarray),
          }),
        )
        .error("4XX", InfraApiResponseCommonFailure)
        .summary("Create new targets")
        .description("Adds one or more targets.")
        .operationId("infra-targets-put-batch")
        .tag("Infrastructure Access Targets")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.delete("/batch", {})
        .error("4XX", InfraApiResponseCommonFailure)
        .summary("Delete targets (Deprecated)")
        .description("Removes one or more targets.")
        .operationId("infra-targets-delete-batch")
        .tag("Infrastructure Access Targets")
        .deprecated()
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.post("/batch_delete", {
        body: Type.Object({
          target_ids: Type.Array(InfraTargetid, { description: "List of target IDs to bulk delete" }),
        }),
      })
        .error("4XX", InfraApiResponseCommonFailure)
        .summary("Delete targets")
        .description("Removes one or more targets.")
        .operationId("infra-targets-delete-batch-post")
        .tag("Infrastructure Access Targets")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.get("/{target_id}", {
        params: Type.Object({ target_id: InfraTargetid }),
      })
        .response(
          Type.Object({
            errors: DlpMessages,
            messages: DlpMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(InfraTarget),
          }),
        )
        .error("4XX", InfraApiResponseCommonFailure)
        .summary("Get target")
        .operationId("infra-targets-get")
        .tag("Infrastructure Access Targets")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.put("/{target_id}", {
        params: Type.Object({ target_id: InfraTargetid }),
        body: Type.Object({
          hostname: Type.String({
            description:
              "A non-unique field that refers to a target. Case insensitive, maximum\nlength of 255 characters, supports the use of special characters dash\nand period, does not support spaces, and must start and end with an\nalphanumeric character.",
            "x-auditable": true,
          }),
          ip: InfraIpinfo,
        }),
      })
        .response(
          Type.Object({
            errors: DlpMessages,
            messages: DlpMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(InfraTarget),
          }),
        )
        .error("4XX", InfraApiResponseCommonFailure)
        .summary("Update target")
        .operationId("infra-targets-put")
        .tag("Infrastructure Access Targets")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.delete("/{target_id}", {
        params: Type.Object({ target_id: InfraTargetid }),
      })
        .error("4XX", InfraApiResponseCommonFailure)
        .summary("Delete target")
        .operationId("infra-targets-delete")
        .tag("Infrastructure Access Targets")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
    },
  )
}

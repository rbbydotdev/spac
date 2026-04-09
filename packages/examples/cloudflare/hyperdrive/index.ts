import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages, FirewallResultInfo } from "../shared/schemas"
import {
  HyperdriveApiResponseCommonFailure,
  HyperdriveHyperdriveConfig,
  HyperdriveHyperdriveConfigPatch,
  HyperdriveHyperdriveConfigResponse,
  HyperdriveIdentifier,
} from "./schemas"

export function registerHyperdrive(api: Api) {
  api.group(
    "/accounts/{account_id}/hyperdrive/configs",
    { params: Type.Object({ account_id: Type.String() }) },
    (g) => {
      g.get("/", {
        responses: {
          200: Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            result: Type.Array(HyperdriveHyperdriveConfigResponse),
            success: Type.Union([Type.Literal(true)], { description: "Return the status of the API call success." }),
            result_info: Type.Optional(FirewallResultInfo),
          }),
          "4XX": HyperdriveApiResponseCommonFailure,
        },
      })
        .summary("List Hyperdrives")
        .description("Returns a list of Hyperdrives.")
        .operationId("list-hyperdrive")
        .tag("Hyperdrive")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Hyperdrive Write", "Hyperdrive Read"])
        .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.hyperdrive.database.list"] })

      g.post("/", {
        body: HyperdriveHyperdriveConfig,
        responses: {
          200: Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            result: HyperdriveHyperdriveConfigResponse,
            success: Type.Union([Type.Literal(true)], { description: "Return the status of the API call success." }),
          }),
          "4XX": HyperdriveApiResponseCommonFailure,
        },
      })
        .summary("Create Hyperdrive")
        .description("Creates and returns a new Hyperdrive configuration.")
        .operationId("create-hyperdrive")
        .tag("Hyperdrive")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Hyperdrive Write"])
        .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.hyperdrive.database.create"] })

      g.get("/{hyperdrive_id}", {
        params: Type.Object({ hyperdrive_id: HyperdriveIdentifier }),
        responses: {
          200: Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            result: HyperdriveHyperdriveConfigResponse,
            success: Type.Union([Type.Literal(true)], { description: "Return the status of the API call success." }),
          }),
          "4XX": HyperdriveApiResponseCommonFailure,
        },
      })
        .summary("Get Hyperdrive")
        .description("Returns the specified Hyperdrive configuration.")
        .operationId("get-hyperdrive")
        .tag("Hyperdrive")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Hyperdrive Write", "Hyperdrive Read"])
        .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.hyperdrive.database.read"] })

      g.put("/{hyperdrive_id}", {
        params: Type.Object({ hyperdrive_id: HyperdriveIdentifier }),
        body: HyperdriveHyperdriveConfig,
        responses: {
          200: Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            result: HyperdriveHyperdriveConfigResponse,
            success: Type.Union([Type.Literal(true)], { description: "Return the status of the API call success." }),
          }),
          "4XX": HyperdriveApiResponseCommonFailure,
        },
      })
        .summary("Update Hyperdrive")
        .description("Updates and returns the specified Hyperdrive configuration.")
        .operationId("update-hyperdrive")
        .tag("Hyperdrive")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Hyperdrive Write"])
        .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.hyperdrive.database.update"] })

      g.patch("/{hyperdrive_id}", {
        params: Type.Object({ hyperdrive_id: HyperdriveIdentifier }),
        body: HyperdriveHyperdriveConfigPatch,
        responses: {
          200: Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            result: HyperdriveHyperdriveConfigResponse,
            success: Type.Union([Type.Literal(true)], { description: "Return the status of the API call success." }),
          }),
          "4XX": HyperdriveApiResponseCommonFailure,
        },
      })
        .summary("Patch Hyperdrive")
        .description(
          "Patches and returns the specified Hyperdrive configuration. Custom caching settings are not kept if caching is disabled.",
        )
        .operationId("patch-hyperdrive")
        .tag("Hyperdrive")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Hyperdrive Write"])
        .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.hyperdrive.database.update"] })

      g.delete("/{hyperdrive_id}", {
        params: Type.Object({ hyperdrive_id: HyperdriveIdentifier }),
        responses: {
          200: Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            result: Type.Union([Type.Unknown(), Type.Null()]),
            success: Type.Union([Type.Literal(true)], { description: "Return the status of the API call success." }),
          }),
          "4XX": HyperdriveApiResponseCommonFailure,
        },
      })
        .summary("Delete Hyperdrive")
        .description("Deletes the specified Hyperdrive.")
        .operationId("delete-hyperdrive")
        .tag("Hyperdrive")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Hyperdrive Write"])
        .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.edge.hyperdrive.database.delete"] })
    },
  )
}

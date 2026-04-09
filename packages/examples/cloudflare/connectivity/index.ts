import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { InfraApiResponseCommonFailure } from "../shared/schemas"
import { InfraServicehost, InfraServicetype } from "./schemas"

export function registerConnectivity(api: Api) {
  api.group(
    "/accounts/{account_id}/connectivity/directory/services",
    { params: Type.Object({ account_id: Type.String() }) },
    (g) => {
      g.get("/", {
        query: Type.Object({
          type: Type.Optional(InfraServicetype),
          page: Type.Optional(Type.Integer({ format: "int32", default: 1, minimum: 1 })),
          per_page: Type.Optional(Type.Integer({ format: "int32", default: 1000, minimum: 1, maximum: 1000 })),
        }),
        responses: {
          "4XX": InfraApiResponseCommonFailure,
        },
      })
        .summary("List connectivity services")
        .operationId("iris-connectivity-services-list")
        .tag("Iris Connectivity Services")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.post("/", {
        body: Type.Object({
          http_port: Type.Optional(Type.Union([Type.Integer({ format: "int32", minimum: 1 }), Type.Null()])),
          https_port: Type.Optional(Type.Union([Type.Integer({ format: "int32", minimum: 1 }), Type.Null()])),
          name: Type.String(),
          type: Type.Union([Type.Literal("http")]),
          host: InfraServicehost,
        }),
        responses: {
          "4XX": InfraApiResponseCommonFailure,
        },
      })
        .summary("Create connectivity service")
        .operationId("iris-connectivity-services-post")
        .tag("Iris Connectivity Services")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.get("/{service_id}", {
        params: Type.Object({ service_id: Type.String({ format: "uuid" }) }),
        responses: {
          "4XX": InfraApiResponseCommonFailure,
        },
      })
        .summary("Get connectivity service")
        .operationId("iris-connectivity-services-get")
        .tag("Iris Connectivity Services")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.put("/{service_id}", {
        params: Type.Object({ service_id: Type.String({ format: "uuid" }) }),
        body: Type.Object({
          http_port: Type.Optional(Type.Union([Type.Integer({ format: "int32", minimum: 1 }), Type.Null()])),
          https_port: Type.Optional(Type.Union([Type.Integer({ format: "int32", minimum: 1 }), Type.Null()])),
          name: Type.String(),
          type: Type.Union([Type.Literal("http")]),
          host: InfraServicehost,
        }),
        responses: {
          "4XX": InfraApiResponseCommonFailure,
        },
      })
        .summary("Update connectivity service")
        .operationId("iris-connectivity-services-put")
        .tag("Iris Connectivity Services")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.delete("/{service_id}", {
        params: Type.Object({ service_id: Type.String({ format: "uuid" }) }),
        responses: {
          "4XX": InfraApiResponseCommonFailure,
        },
      })
        .summary("Delete connectivity service")
        .operationId("iris-connectivity-services-delete")
        .tag("Iris Connectivity Services")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
    },
  )
}

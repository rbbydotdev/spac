import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages, IamResultInfo } from "../shared/schemas"
import {
  RegistrarApiDomainName,
  RegistrarApiDomainResponseCollection,
  RegistrarApiDomainUpdateProperties,
} from "./schemas"

export function registerRegistrar(api: Api) {
  api.group("/accounts/{account_id}/registrar/domains", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      responses: {
        200: RegistrarApiDomainResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result_info: Type.Optional(IamResultInfo),
        }),
      },
    })
      .summary("List domains")
      .description("List domains handled by Registrar.")
      .operationId("registrar-domains-list-domains")
      .tag("Registrar Domains")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)

    g.get("/{domain_name}", {
      params: Type.Object({ domain_name: RegistrarApiDomainName }),
      responses: {
        200: Type.Unknown() /* unresolved: #/components/schemas/registrar-api_domain_response_single */,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Get domain")
      .description("Show individual domain.")
      .operationId("registrar-domains-get-domain")
      .tag("Registrar Domains")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)

    g.put("/{domain_name}", {
      params: Type.Object({ domain_name: RegistrarApiDomainName }),
      body: RegistrarApiDomainUpdateProperties,
      responses: {
        200: Type.Unknown() /* unresolved: #/components/schemas/registrar-api_domain_response_single */,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Update domain")
      .description("Update individual domain.")
      .operationId("registrar-domains-update-domain")
      .tag("Registrar Domains")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)
  })
}

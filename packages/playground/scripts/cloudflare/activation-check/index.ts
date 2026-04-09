import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"
import { ZoneActivationApiResponseCommonFailure } from "./schemas"

export function registerActivationCheck(api: Api) {
  api.assertVersion("3.0.3", "ActivationCheck")

  api
    .put("/zones/{zone_id}/activation_check", {
      params: Type.Object({ zone_id: DlsIdentifier }),
    })
    .response(
      Type.Object({
        errors: DlpMessages,
        messages: DlpMessages,
        success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
        result: Type.Optional(
          Type.Object({
            id: Type.Optional(DlsIdentifier),
          }),
        ),
      }),
    )
    .error("4XX", ZoneActivationApiResponseCommonFailure)
    .summary("Rerun the Activation Check")
    .description(
      "Triggeres a new activation check for a PENDING Zone. This can be\ntriggered every 5 min for paygo/ent customers, every hour for FREE\nZones.",
    )
    .operationId("put-zones-zone_id-activation_check")
    .tag("Zone")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Write"])
}

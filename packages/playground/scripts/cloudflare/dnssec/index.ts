import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages } from "../shared/schemas"
import {
  DnssecDeleteDnssecResponseSingle,
  DnssecDnssecMultiSigner,
  DnssecDnssecPresigned,
  DnssecDnssecResponseSingle,
  DnssecDnssecUseNsec3,
} from "./schemas"

export function registerDnssec(api: Api) {
  api.assertVersion("3.0.3", "Dnssec")

  api.group("/zones/{zone_id}/dnssec", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {})
      .response(DnssecDnssecResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("DNSSEC Details")
      .description("Details about DNSSEC status and configuration.")
      .operationId("dnssec-dnssec-details")
      .tag("DNSSEC")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Read", "DNS Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/", {
      body: Type.Object({
        dnssec_multi_signer: Type.Optional(DnssecDnssecMultiSigner),
        dnssec_presigned: Type.Optional(DnssecDnssecPresigned),
        dnssec_use_nsec3: Type.Optional(DnssecDnssecUseNsec3),
        status: Type.Optional(
          Type.Union([Type.Literal("active"), Type.Literal("disabled")], {
            description: "Status of DNSSEC, based on user-desired state and presence of necessary records.",
          }),
        ),
      }),
    })
      .response(DnssecDnssecResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Edit DNSSEC Status")
      .description("Enable or disable DNSSEC.")
      .operationId("dnssec-edit-dnssec-status")
      .tag("DNSSEC")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/", {})
      .response(DnssecDeleteDnssecResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Delete DNSSEC records")
      .description("Delete DNSSEC.")
      .operationId("dnssec-delete-dnssec-records")
      .tag("DNSSEC")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#zone_settings:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

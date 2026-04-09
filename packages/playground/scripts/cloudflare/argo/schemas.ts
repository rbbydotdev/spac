import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages } from "../shared/schemas"

export const CacheRulesValue = named(
  "cache-rules_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], {
    description: "Enables Tiered Caching.",
    "x-auditable": true,
  }),
)

export const CacheRulesPatch = named(
  "cache-rules_patch",
  Type.Object(
    {
      value: CacheRulesValue,
    },
    { description: "Update enablement of Tiered Caching." },
  ),
)

export const ArgoConfigSettingValue = named(
  "argo-config_setting_value",
  Type.Union([Type.Literal("on"), Type.Literal("off")], {
    description: "Specifies the enablement value of Argo Smart Routing.",
    "x-auditable": true,
  }),
)

export const ArgoConfigPatch = named(
  "argo-config_patch",
  Type.Object(
    {
      value: ArgoConfigSettingValue,
    },
    { description: "Configures the enablement of Argo Smart Routing." },
  ),
)

export const ArgoConfigIdentifier = named(
  "argo-config_identifier",
  Type.String({ description: "Specifies the zone associated with the API call.", maxLength: 32, readOnly: true }),
)

export const ArgoConfigApiResponseCommonFailure = named(
  "argo-config_api_response_common_failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Describes a failed API response." }),
  }),
)

export const ArgoConfigEditable = named(
  "argo-config_editable",
  Type.Boolean({ description: "Specifies if the setting is editable.", "x-auditable": true }),
)

export const ArgoConfigSettingId = named(
  "argo-config_setting_id",
  Type.String({ description: "Specifies the identifier of the Argo Smart Routing setting.", "x-auditable": true }),
)

export const ArgoConfigModifiedOn = named(
  "argo-config_modified_on",
  Type.String({
    description: "Specifies the time when the setting was last modified.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const ArgoConfigResultObject = named(
  "argo-config_result_object",
  Type.Object({
    editable: ArgoConfigEditable,
    id: ArgoConfigSettingId,
    modified_on: Type.Optional(ArgoConfigModifiedOn),
    value: ArgoConfigSettingValue,
  }),
)

export const ArgoConfigApiResponseSingle = named(
  "argo-config_api_response_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: ArgoConfigResultObject,
    success: Type.Union([Type.Literal(true)], { description: "Describes a successful API response." }),
  }),
)

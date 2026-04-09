import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const DlpRisklevel = named(
  "dlp_RiskLevel",
  Type.Union([Type.Literal("low"), Type.Literal("medium"), Type.Literal("high")]),
)

export const DlpRiskevent = named(
  "dlp_RiskEvent",
  Type.Object({
    event_details: Type.Optional(Type.Unknown()),
    id: Type.String(),
    name: Type.String(),
    risk_level: DlpRisklevel,
    timestamp: Type.String({ format: "date-time" }),
  }),
)

export const DlpRiskevents = named(
  "dlp_RiskEvents",
  Type.Object({
    email: Type.String(),
    events: Type.Array(DlpRiskevent),
    last_reset_time: Type.Optional(Type.Union([Type.String({ format: "date-time" }), Type.Null()])),
    name: Type.String(),
    risk_level: Type.Optional(DlpRisklevel),
  }),
)

export const DlpUserriskinfo = named(
  "dlp_UserRiskInfo",
  Type.Object({
    email: Type.String(),
    event_count: Type.Integer({ minimum: 0 }),
    last_event: Type.String({ format: "date-time" }),
    max_risk_level: DlpRisklevel,
    name: Type.String(),
    user_id: Type.String({ format: "uuid" }),
  }),
)

export const DlpRisksummary = named(
  "dlp_RiskSummary",
  Type.Object({
    users: Type.Array(DlpUserriskinfo),
  }),
)

export const DlpUpdateintegrationbody = named(
  "dlp_UpdateIntegrationBody",
  Type.Object({
    active: Type.Boolean({
      description:
        "Whether this integration is enabled. If disabled, no risk changes will be exported to the third-party.",
    }),
    reference_id: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "A reference id that can be supplied by the client. Currently this should be set to the Access-Okta IDP ID (a UUIDv4).\nhttps://developers.cloudflare.com/api/operations/access-identity-providers-get-an-access-identity-provider",
        }),
        Type.Null(),
      ]),
    ),
    tenant_url: Type.String({
      description: 'The base url of the tenant, e.g. "https://tenant.okta.com".',
      format: "uri",
    }),
  }),
)

export const DlpRiskscoreintegrationtype = named("dlp_RiskScoreIntegrationType", Type.Union([Type.Literal("Okta")]))

export const DlpRiskscoreintegration = named(
  "dlp_RiskScoreIntegration",
  Type.Object({
    account_tag: Type.String({ description: "The Cloudflare account tag." }),
    active: Type.Boolean({
      description: "Whether this integration is enabled and should export changes in risk score.",
    }),
    created_at: Type.String({
      description: "When the integration was created in RFC3339 format.",
      format: "date-time",
      readOnly: true,
    }),
    id: Type.String({ description: "The id of the integration, a UUIDv4.", format: "uuid" }),
    integration_type: DlpRiskscoreintegrationtype,
    reference_id: Type.String({
      description:
        "A reference ID defined by the client.\nShould be set to the Access-Okta IDP integration ID.\nUseful when the risk-score integration needs to be associated with a secondary asset and recalled using that ID.",
    }),
    tenant_url: Type.String({ description: 'The base URL for the tenant. E.g. "https://tenant.okta.com".' }),
    well_known_url: Type.String({
      description:
        'The URL for the Shared Signals Framework configuration, e.g. "/.well-known/sse-configuration/{integration_uuid}/". https://openid.net/specs/openid-sse-framework-1_0.html#rfc.section.6.2.1.',
    }),
  }),
)

export const DlpCreateintegrationbody = named(
  "dlp_CreateIntegrationBody",
  Type.Object({
    integration_type: DlpRiskscoreintegrationtype,
    reference_id: Type.Optional(
      Type.Union([
        Type.String({
          description:
            "A reference id that can be supplied by the client. Currently this should be set to the Access-Okta IDP ID (a UUIDv4).\nhttps://developers.cloudflare.com/api/operations/access-identity-providers-get-an-access-identity-provider",
        }),
        Type.Null(),
      ]),
    ),
    tenant_url: Type.String({
      description: 'The base url of the tenant, e.g. "https://tenant.okta.com".',
      format: "uri",
    }),
  }),
)

export const DlpRiskscoreintegrationarray = named("dlp_RiskScoreIntegrationArray", Type.Array(DlpRiskscoreintegration))

export const DlpUpdatebehavior = named(
  "dlp_UpdateBehavior",
  Type.Object({
    enabled: Type.Boolean(),
    risk_level: DlpRisklevel,
  }),
)

export const DlpUpdatebehaviors = named(
  "dlp_UpdateBehaviors",
  Type.Object({
    behaviors: Type.Record(Type.String(), DlpUpdatebehavior),
  }),
)

export const DlpBehavior = named(
  "dlp_Behavior",
  Type.Object({
    description: Type.String(),
    enabled: Type.Boolean(),
    name: Type.String(),
    risk_level: DlpRisklevel,
  }),
)

export const DlpBehaviors = named(
  "dlp_Behaviors",
  Type.Object({
    behaviors: Type.Record(Type.String(), DlpBehavior),
  }),
)

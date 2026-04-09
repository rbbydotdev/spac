import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  BillSubsApiComponentsSchemasIdentifier,
  BillSubsApiCurrency,
  D1Messages,
  DlpMessages,
  FirewallConfiguration,
  FirewallNotes,
  FirewallResultInfo,
  FirewallSchemasIdentifier,
  FirewallSchemasMode,
  IamCommonComponentsSchemasIdentifier,
  IamCountry,
  IamFirstName,
  IamLastName,
  IamResultInfo,
  IamRoleNames,
  IamTelephone,
  IamTwoFactorAuthenticationEnabled,
  IamZipcode,
  LoadBalancingAddress,
  LoadBalancingResultInfo,
  LoadBalancingSchemasEnabled,
  LoadBalancingSchemasName,
} from "../shared/schemas"

export const BillSubsApiUserSubscriptionResponseSingle = named(
  "bill-subs-api_user_subscription_response_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Union([Type.Unknown(), Type.Null()]), Type.Union([Type.String(), Type.Null()])]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const IamSchemasName = named(
  "iam_schemas-name",
  Type.String({ description: "Organization name.", maxLength: 100, "x-auditable": true }),
)

export const IamSchemasPermissions = named(
  "iam_schemas-permissions",
  Type.Array(Type.String({ maxLength: 160, "x-auditable": true }), {
    description: "Access permissions for this User.",
    readOnly: true,
  }),
)

export const IamComponentsSchemasStatus = named(
  "iam_components-schemas-status",
  Type.Union([Type.Literal("member"), Type.Literal("invited")], {
    description: "Whether the user is a member of the organization or has an invitation pending.",
    "x-auditable": true,
  }),
)

export const IamOrganization = named(
  "iam_organization",
  Type.Object({
    id: Type.Optional(IamCommonComponentsSchemasIdentifier),
    name: Type.Optional(IamSchemasName),
    permissions: Type.Optional(IamSchemasPermissions),
    roles: Type.Optional(
      Type.Array(Type.String({ maxLength: 120, "x-auditable": true }), {
        description: "List of roles that a user has within an organization.",
        readOnly: true,
      }),
    ),
    status: Type.Optional(IamComponentsSchemasStatus),
  }),
)

export const IamCollectionOrganizationResponse = named(
  "iam_collection_organization_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IamResultInfo),
    result: Type.Optional(Type.Array(IamOrganization)),
  }),
)

export const LoadBalancingOriginHealthy = named(
  "load-balancing_origin_healthy",
  Type.Boolean({
    description:
      "If true, filter events where the origin status is healthy. If false, filter events where the origin status is unhealthy.",
    default: true,
    "x-auditable": true,
  }),
)

export const LoadBalancingPoolName = named(
  "load-balancing_pool_name",
  Type.String({ description: "The name for the pool to filter.", "x-auditable": true }),
)

export const LoadBalancingUntil = named(
  "load-balancing_until",
  Type.String({
    description: "End date and time of requesting data period in the ISO8601 format.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const LoadBalancingOriginChanged = named(
  "load-balancing_origin-changed",
  Type.Boolean({ description: "Whether the origin has changed health status.", "x-auditable": true }),
)

export const LoadBalancingOriginFailureReason = named(
  "load-balancing_origin-failure-reason",
  Type.String({ description: "Failure reason for un-healthy origin health check.", "x-auditable": true }),
)

export const LoadBalancingOriginHealthy2 = named(
  "load-balancing_origin-healthy",
  Type.Boolean({ description: "Whether the origin is reported as healthy.", "x-auditable": true }),
)

export const LoadBalancingOriginIp = named(
  "load-balancing_origin-ip",
  Type.String({ description: "The IP address (IPv4 or IPv6) of the origin.", "x-auditable": true }),
)

export const LoadBalancingOriginAnalytics = named(
  "load-balancing_origin-analytics",
  Type.Object({
    address: Type.Optional(LoadBalancingAddress),
    changed: Type.Optional(LoadBalancingOriginChanged),
    enabled: Type.Optional(LoadBalancingSchemasEnabled),
    failure_reason: Type.Optional(LoadBalancingOriginFailureReason),
    healthy: Type.Optional(LoadBalancingOriginHealthy2),
    ip: Type.Optional(LoadBalancingOriginIp),
    name: Type.Optional(LoadBalancingSchemasName),
  }),
)

export const LoadBalancingAnalytics = named(
  "load-balancing_analytics",
  Type.Object({
    id: Type.Optional(Type.Integer({ default: 1 })),
    origins: Type.Optional(Type.Array(LoadBalancingOriginAnalytics)),
    pool: Type.Optional(Type.Unknown()),
    timestamp: Type.Optional(Type.String({ format: "date-time" })),
  }),
)

export const LoadBalancingComponentsSchemasResponseCollection = named(
  "load-balancing_components-schemas-response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(LoadBalancingResultInfo),
    result: Type.Array(LoadBalancingAnalytics),
  }),
)

export const LoadBalancingPreviewId = named("load-balancing_preview_id", Type.String())

export const IamInviteComponentsSchemasIdentifier = named(
  "iam_invite_components-schemas-identifier",
  Type.String({ description: "Invite identifier tag.", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const IamSchemasExpiresOn = named(
  "iam_schemas-expires_on",
  Type.String({
    description: "When the invite is no longer active.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const IamInvitedBy = named(
  "iam_invited_by",
  Type.String({
    description: "The email address of the user who created the invite.",
    maxLength: 90,
    "x-auditable": true,
  }),
)

export const IamInvitedMemberEmail = named(
  "iam_invited_member_email",
  Type.String({
    description: "Email address of the user to add to the organization.",
    maxLength: 90,
    "x-auditable": true,
  }),
)

export const IamInvitedOn = named(
  "iam_invited_on",
  Type.String({ description: "When the invite was sent.", format: "date-time", readOnly: true, "x-auditable": true }),
)

export const IamUserInvite = named(
  "iam_user_invite",
  Type.Object({
    expires_on: Type.Optional(IamSchemasExpiresOn),
    id: Type.Optional(IamInviteComponentsSchemasIdentifier),
    invited_by: Type.Optional(IamInvitedBy),
    invited_member_email: Type.Optional(IamInvitedMemberEmail),
    invited_member_id: Type.Union([
      Type.String({
        description: "ID of the user to add to the organization.",
        maxLength: 32,
        readOnly: true,
        "x-auditable": true,
      }),
      Type.Null(),
    ]),
    invited_on: Type.Optional(IamInvitedOn),
    organization_id: Type.String({
      description: "ID of the organization the user will be added to.",
      maxLength: 32,
      readOnly: true,
      "x-auditable": true,
    }),
    organization_is_enforcing_twofactor: Type.Optional(Type.Boolean({ "x-auditable": true })),
    organization_name: Type.Optional(
      Type.String({ description: "Organization name.", maxLength: 100, readOnly: true, "x-auditable": true }),
    ),
    roles: Type.Optional(IamRoleNames),
    status: Type.Optional(
      Type.Union(
        [Type.Literal("pending"), Type.Literal("accepted"), Type.Literal("rejected"), Type.Literal("expired")],
        { description: "Current status of the invitation.", "x-auditable": true },
      ),
    ),
  }),
)

export const IamSingleInviteResponse = named(
  "iam_single_invite_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(IamUserInvite),
  }),
)

export const IamSchemasCollectionInviteResponse = named(
  "iam_schemas-collection_invite_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IamResultInfo),
    result: Type.Optional(Type.Array(IamUserInvite)),
  }),
)

export const FirewallRuleSingleIdResponse = named(
  "firewall_rule_single_id_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      id: Type.Optional(FirewallSchemasIdentifier),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const FirewallRule = named(
  "firewall_rule",
  Type.Object({
    allowed_modes: Type.Array(FirewallSchemasMode, {
      description: "The available actions that a rule can apply to a matched request.",
      readOnly: true,
    }),
    configuration: FirewallConfiguration,
    created_on: Type.Optional(
      Type.String({ description: "The timestamp of when the rule was created.", format: "date-time", readOnly: true }),
    ),
    id: FirewallSchemasIdentifier,
    mode: FirewallSchemasMode,
    modified_on: Type.Optional(
      Type.String({
        description: "The timestamp of when the rule was last modified.",
        format: "date-time",
        readOnly: true,
      }),
    ),
    notes: Type.Optional(FirewallNotes),
  }),
)

export const FirewallRuleSingleResponse = named(
  "firewall_rule_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: FirewallRule,
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
  }),
)

export const FirewallRuleCollectionResponse = named(
  "firewall_rule_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(FirewallRule), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Defines whether the API call was successful." }),
    result_info: Type.Optional(FirewallResultInfo),
  }),
)

export const BillSubsApiOccurredAt = named(
  "bill-subs-api_occurred_at",
  Type.String({ description: "When the billing item was created.", format: "date-time", "x-auditable": true }),
)

export const BillSubsApiAction = named(
  "bill-subs-api_action",
  Type.String({ description: "The billing item action.", maxLength: 30, readOnly: true, "x-auditable": true }),
)

export const BillSubsApiAmount = named(
  "bill-subs-api_amount",
  Type.Number({ description: "The amount associated with this billing item.", readOnly: true, "x-auditable": true }),
)

export const BillSubsApiDescription = named(
  "bill-subs-api_description",
  Type.String({ description: "The billing item description.", maxLength: 255, readOnly: true, "x-auditable": true }),
)

export const BillSubsApiType = named(
  "bill-subs-api_type",
  Type.String({ description: "The billing item type.", maxLength: 30, readOnly: true, "x-auditable": true }),
)

export const BillSubsApiSchemasZone = named(
  "bill-subs-api_schemas-zone",
  Type.Object({
    name: Type.Optional(Type.String({ readOnly: true, "x-auditable": true })),
  }),
)

export const BillSubsApiBillingHistory = named(
  "bill-subs-api_billing-history",
  Type.Object({
    action: BillSubsApiAction,
    amount: BillSubsApiAmount,
    currency: BillSubsApiCurrency,
    description: BillSubsApiDescription,
    id: BillSubsApiComponentsSchemasIdentifier,
    occurred_at: BillSubsApiOccurredAt,
    type: BillSubsApiType,
    zone: BillSubsApiSchemasZone,
  }),
)

export const BillSubsApiBillingHistoryCollection = named(
  "bill-subs-api_billing_history_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(BillSubsApiBillingHistory), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
    result_info: Type.Optional(IamResultInfo),
  }),
)

export const IamTwoFactorAuthenticationLocked = named(
  "iam_two_factor_authentication_locked",
  Type.Boolean({
    description:
      "Indicates whether two-factor authentication is required by one of the accounts that the user is a member of.",
    default: false,
    readOnly: true,
  }),
)

export const IamSingleUserResponse = named(
  "iam_single_user_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        betas: Type.Optional(
          Type.Array(Type.String({ description: "User feature flag" }), {
            description: "Lists the betas that the user is participating in.",
            readOnly: true,
          }),
        ),
        country: Type.Optional(IamCountry),
        first_name: Type.Optional(IamFirstName),
        has_business_zones: Type.Optional(
          Type.Boolean({
            description: "Indicates whether user has any business zones",
            default: false,
            readOnly: true,
          }),
        ),
        has_enterprise_zones: Type.Optional(
          Type.Boolean({
            description: "Indicates whether user has any enterprise zones",
            default: false,
            readOnly: true,
          }),
        ),
        has_pro_zones: Type.Optional(
          Type.Boolean({ description: "Indicates whether user has any pro zones", default: false, readOnly: true }),
        ),
        id: Type.Optional(Type.String({ description: "Identifier of the user.", readOnly: true })),
        last_name: Type.Optional(IamLastName),
        organizations: Type.Optional(Type.Array(IamOrganization)),
        suspended: Type.Optional(
          Type.Boolean({ description: "Indicates whether user has been suspended", default: false, readOnly: true }),
        ),
        telephone: Type.Optional(IamTelephone),
        two_factor_authentication_enabled: Type.Optional(IamTwoFactorAuthenticationEnabled),
        two_factor_authentication_locked: Type.Optional(IamTwoFactorAuthenticationLocked),
        zipcode: Type.Optional(IamZipcode),
      }),
    ),
  }),
)

import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, IamEmail } from "../shared/schemas"

export const EmailRulePriority = named(
  "email_rule_priority",
  Type.Number({ description: "Priority of the routing rule.", default: 0, minimum: 0, "x-auditable": true }),
)

export const EmailRuleName = named(
  "email_rule_name",
  Type.String({ description: "Routing rule name.", maxLength: 256, "x-auditable": true }),
)

export const EmailRuleMatcher = named(
  "email_rule_matcher",
  Type.Object(
    {
      field: Type.Optional(
        Type.Union([Type.Literal("to")], { description: "Field for type matcher.", "x-auditable": true }),
      ),
      type: Type.Union([Type.Literal("all"), Type.Literal("literal")], {
        description: "Type of matcher.",
        "x-auditable": true,
      }),
      value: Type.Optional(Type.String({ description: "Value for matcher.", maxLength: 90, "x-auditable": true })),
    },
    { description: "Matching pattern to forward your actions." },
  ),
)

export const EmailRuleMatchers = named(
  "email_rule_matchers",
  Type.Array(EmailRuleMatcher, { description: "Matching patterns to forward to your actions." }),
)

export const EmailRuleEnabled = named(
  "email_rule_enabled",
  Type.Union([Type.Literal(true), Type.Literal(false)], { description: "Routing rule status.", "x-auditable": true }),
)

export const EmailRuleAction = named(
  "email_rule_action",
  Type.Object(
    {
      type: Type.Union([Type.Literal("drop"), Type.Literal("forward"), Type.Literal("worker")], {
        description: "Type of supported action.",
        "x-auditable": true,
      }),
      value: Type.Optional(
        Type.Array(Type.String({ description: "Value for action.", maxLength: 90, "x-auditable": true })),
      ),
    },
    { description: "Actions pattern." },
  ),
)

export const EmailRuleActions = named(
  "email_rule_actions",
  Type.Array(EmailRuleAction, { description: "List actions patterns." }),
)

export const EmailRuleIdentifier = named(
  "email_rule_identifier",
  Type.String({ description: "Routing rule identifier.", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const EmailRuleCatchallAction = named(
  "email_rule_catchall-action",
  Type.Object(
    {
      type: Type.Union([Type.Literal("drop"), Type.Literal("forward"), Type.Literal("worker")], {
        description: "Type of action for catch-all rule.",
        "x-auditable": true,
      }),
      value: Type.Optional(
        Type.Array(Type.String({ description: "Input value for action.", maxLength: 90, "x-auditable": true })),
      ),
    },
    { description: "Action for the catch-all routing rule." },
  ),
)

export const EmailRuleCatchallActions = named(
  "email_rule_catchall-actions",
  Type.Array(EmailRuleCatchallAction, { description: "List actions for the catch-all routing rule." }),
)

export const EmailRuleCatchallMatcher = named(
  "email_rule_catchall-matcher",
  Type.Object(
    {
      type: Type.Union([Type.Literal("all")], {
        description: "Type of matcher. Default is 'all'.",
        "x-auditable": true,
      }),
    },
    { description: "Matcher for catch-all routing rule." },
  ),
)

export const EmailRuleCatchallMatchers = named(
  "email_rule_catchall-matchers",
  Type.Array(EmailRuleCatchallMatcher, { description: "List of matchers for the catch-all routing rule." }),
)

export const EmailUpdateCatchAllRuleProperties = named(
  "email_update_catch_all_rule_properties",
  Type.Object({
    actions: EmailRuleCatchallActions,
    enabled: Type.Optional(EmailRuleEnabled),
    matchers: EmailRuleCatchallMatchers,
    name: Type.Optional(EmailRuleName),
  }),
)

export const EmailRuleTag = named(
  "email_rule_tag",
  Type.String({
    description: "Routing rule tag. (Deprecated, replaced by routing rule identifier)",
    maxLength: 32,
    readOnly: true,
    deprecated: true,
  }),
)

export const EmailCatchAllRule = named(
  "email_catch_all_rule",
  Type.Object({
    actions: Type.Optional(EmailRuleCatchallActions),
    enabled: Type.Optional(EmailRuleEnabled),
    id: Type.Optional(EmailRuleIdentifier),
    matchers: Type.Optional(EmailRuleCatchallMatchers),
    name: Type.Optional(EmailRuleName),
    tag: Type.Optional(EmailRuleTag),
  }),
)

export const EmailCatchAllRuleResponseSingle = named(
  "email_catch_all_rule_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(EmailCatchAllRule),
  }),
)

export const EmailRuleProperties = named(
  "email_rule_properties",
  Type.Object({
    actions: Type.Optional(EmailRuleActions),
    enabled: Type.Optional(EmailRuleEnabled),
    id: Type.Optional(EmailRuleIdentifier),
    matchers: Type.Optional(EmailRuleMatchers),
    name: Type.Optional(EmailRuleName),
    priority: Type.Optional(EmailRulePriority),
    tag: Type.Optional(EmailRuleTag),
  }),
)

export const EmailRules = named("email_rules", EmailRuleProperties)

export const EmailRuleResponseSingle = named(
  "email_rule_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(EmailRules),
  }),
)

export const EmailCreateRuleProperties = named(
  "email_create_rule_properties",
  Type.Object({
    actions: EmailRuleActions,
    enabled: Type.Optional(EmailRuleEnabled),
    matchers: EmailRuleMatchers,
    name: Type.Optional(EmailRuleName),
    priority: Type.Optional(EmailRulePriority),
  }),
)

export const EmailRulesResponseCollection = named(
  "email_rules_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(
      Type.Object({
        count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
        page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
        per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
        total_count: Type.Optional(
          Type.Number({ description: "Total results available without any search parameters." }),
        ),
      }),
    ),
    result: Type.Optional(Type.Array(EmailRules)),
  }),
)

export const EmailApiResponseCommon = named(
  "email_api-response-common",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const EmailApiResponseSingle = named("email_api-response-single", EmailApiResponseCommon)

export const EmailEmailSettingName = named(
  "email_email_setting_name",
  Type.String({ description: "Domain of your zone.", "x-auditable": true }),
)

export const EmailEmailSettingDnsRequestBody = named(
  "email_email_setting_dns_request_body",
  Type.Union([
    Type.Object({
      name: Type.Optional(EmailEmailSettingName),
    }),
    Type.Null(),
  ]),
)

export const EmailDnsRecord = named(
  "email_dns_record",
  Type.Object(
    {
      content: Type.Optional(Type.String({ description: "DNS record content." })),
      name: Type.Optional(
        Type.String({ description: "DNS record name (or @ for the zone apex).", maxLength: 255, "x-auditable": true }),
      ),
      priority: Type.Optional(
        Type.Number({
          description:
            "Required for MX, SRV and URI records. Unused by other record types. Records with lower priorities are preferred.",
          minimum: 0,
          maximum: 65535,
          "x-auditable": true,
        }),
      ),
      ttl: Type.Optional(
        Type.Union([Type.Number({ minimum: 1, maximum: 86400 }), Type.Union([Type.Literal(1)])], {
          description:
            "Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for 'automatic'.",
          "x-auditable": true,
        }),
      ),
      type: Type.Optional(
        Type.Union(
          [
            Type.Literal("A"),
            Type.Literal("AAAA"),
            Type.Literal("CNAME"),
            Type.Literal("HTTPS"),
            Type.Literal("TXT"),
            Type.Literal("SRV"),
            Type.Literal("LOC"),
            Type.Literal("MX"),
            Type.Literal("NS"),
            Type.Literal("CERT"),
            Type.Literal("DNSKEY"),
            Type.Literal("DS"),
            Type.Literal("NAPTR"),
            Type.Literal("SMIMEA"),
            Type.Literal("SSHFP"),
            Type.Literal("SVCB"),
            Type.Literal("TLSA"),
            Type.Literal("URI"),
          ],
          { description: "DNS record type.", "x-auditable": true },
        ),
      ),
    },
    { description: "List of records needed to enable an Email Routing zone." },
  ),
)

export const EmailDnsSettingsResponseCollection = named(
  "email_dns_settings_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(
      Type.Object({
        count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
        page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
        per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
        total_count: Type.Optional(
          Type.Number({ description: "Total results available without any search parameters." }),
        ),
      }),
    ),
    result: Type.Optional(Type.Array(EmailDnsRecord)),
  }),
)

export const EmailEmailRoutingGetResponseDnsError = named(
  "email_email_routing_get_response_dns_error",
  Type.Object({
    code: Type.Optional(Type.String()),
    missing: Type.Optional(EmailDnsRecord),
  }),
)

export const EmailEmailRoutingGetResponseDnsErrors = named(
  "email_email_routing_get_response_dns_errors",
  Type.Array(EmailEmailRoutingGetResponseDnsError),
)

export const EmailEmailRoutingDnsQueryResponse = named(
  "email_email_routing_dns_query_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(
      Type.Object({
        count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
        page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
        per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
        total_count: Type.Optional(
          Type.Number({ description: "Total results available without any search parameters." }),
        ),
      }),
    ),
    result: Type.Optional(
      Type.Object({
        errors: Type.Optional(EmailEmailRoutingGetResponseDnsErrors),
        record: Type.Optional(Type.Array(EmailDnsRecord)),
      }),
    ),
  }),
)

export const EmailEmailSettingCreated = named(
  "email_email_setting_created",
  Type.String({
    description: "The date and time the settings have been created.",
    format: "date-time",
    readOnly: true,
  }),
)

export const EmailEmailSettingEnabled = named(
  "email_email_setting_enabled",
  Type.Union([Type.Literal(true), Type.Literal(false)], {
    description: "State of the zone settings for Email Routing.",
    "x-auditable": true,
  }),
)

export const EmailEmailSettingIdentifier = named(
  "email_email_setting_identifier",
  Type.String({
    description: "Email Routing settings identifier.",
    maxLength: 32,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const EmailEmailSettingModified = named(
  "email_email_setting_modified",
  Type.String({
    description: "The date and time the settings have been modified.",
    format: "date-time",
    readOnly: true,
  }),
)

export const EmailEmailSettingSkipWizard = named(
  "email_email_setting_skip-wizard",
  Type.Union([Type.Literal(true), Type.Literal(false)], {
    description: "Flag to check if the user skipped the configuration wizard.",
  }),
)

export const EmailEmailSettingStatus = named(
  "email_email_setting_status",
  Type.Union(
    [
      Type.Literal("ready"),
      Type.Literal("unconfigured"),
      Type.Literal("misconfigured"),
      Type.Literal("misconfigured/locked"),
      Type.Literal("unlocked"),
    ],
    { description: "Show the state of your account, and the type or configuration error." },
  ),
)

export const EmailEmailSettingTag = named(
  "email_email_setting_tag",
  Type.String({
    description: "Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier)",
    maxLength: 32,
    readOnly: true,
    deprecated: true,
  }),
)

export const EmailEmailSettingsProperties = named(
  "email_email_settings_properties",
  Type.Object({
    created: Type.Optional(EmailEmailSettingCreated),
    enabled: EmailEmailSettingEnabled,
    id: EmailEmailSettingIdentifier,
    modified: Type.Optional(EmailEmailSettingModified),
    name: EmailEmailSettingName,
    skip_wizard: Type.Optional(EmailEmailSettingSkipWizard),
    status: Type.Optional(EmailEmailSettingStatus),
    tag: Type.Optional(EmailEmailSettingTag),
  }),
)

export const EmailSettings = named("email_settings", EmailEmailSettingsProperties)

export const EmailEmailSettingsResponseSingle = named(
  "email_email_settings_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(EmailSettings),
  }),
)

export const EmailDestinationAddressIdentifier = named(
  "email_destination_address_identifier",
  Type.String({ description: "Destination address identifier.", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const EmailCreated = named(
  "email_created",
  Type.String({
    description: "The date and time the destination address has been created.",
    format: "date-time",
    readOnly: true,
  }),
)

export const EmailModified = named(
  "email_modified",
  Type.String({
    description: "The date and time the destination address was last modified.",
    format: "date-time",
    readOnly: true,
  }),
)

export const EmailDestinationAddressTag = named(
  "email_destination_address_tag",
  Type.String({
    description: "Destination address tag. (Deprecated, replaced by destination address identifier)",
    maxLength: 32,
    readOnly: true,
    deprecated: true,
  }),
)

export const EmailVerified = named(
  "email_verified",
  Type.String({
    description: "The date and time the destination address has been verified. Null means not verified yet.",
    format: "date-time",
    readOnly: true,
  }),
)

export const EmailDestinationAddressProperties = named(
  "email_destination_address_properties",
  Type.Object({
    created: Type.Optional(EmailCreated),
    email: Type.Optional(IamEmail),
    id: Type.Optional(EmailDestinationAddressIdentifier),
    modified: Type.Optional(EmailModified),
    tag: Type.Optional(EmailDestinationAddressTag),
    verified: Type.Optional(EmailVerified),
  }),
)

export const EmailAddresses = named("email_addresses", EmailDestinationAddressProperties)

export const EmailDestinationAddressResponseSingle = named(
  "email_destination_address_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(EmailAddresses),
  }),
)

export const EmailCreateDestinationAddressProperties = named(
  "email_create_destination_address_properties",
  Type.Object({
    email: IamEmail,
  }),
)

export const EmailDestinationAddressesResponseCollection = named(
  "email_destination_addresses_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(
      Type.Object({
        count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
        page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
        per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
        total_count: Type.Optional(
          Type.Number({ description: "Total results available without any search parameters." }),
        ),
      }),
    ),
    result: Type.Optional(Type.Array(EmailAddresses)),
  }),
)

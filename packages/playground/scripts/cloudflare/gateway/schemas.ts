import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages, Web3Timestamp } from "../shared/schemas"

export const ZeroTrustGatewayWarningStatus = named(
  "zero-trust-gateway_warning_status",
  Type.Union([
    Type.String({ description: "Indicate a warning for a misconfigured rule, if any.", readOnly: true }),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayVersion = named(
  "zero-trust-gateway_version",
  Type.Integer({
    description: "Indicate the version number of the rule(read-only).",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ZeroTrustGatewaySourceAccount = named(
  "zero-trust-gateway_source_account",
  Type.String({
    description: "Provide the account tag of the account that created the rule.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ZeroTrustGatewaySharable = named(
  "zero-trust-gateway_sharable",
  Type.Boolean({
    description: "Indicate that this rule is sharable via the Orgs API.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ZeroTrustGatewayReadOnly = named(
  "zero-trust-gateway_read_only",
  Type.Boolean({
    description: "Indicate that this rule is shared via the Orgs API and read only.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ZeroTrustGatewayDeletedAt = named(
  "zero-trust-gateway_deleted_at",
  Type.Union([
    Type.String({ description: "Indicate the date of deletion, if any.", format: "date-time", readOnly: true }),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayAction = named(
  "zero-trust-gateway_action",
  Type.Union(
    [
      Type.Literal("on"),
      Type.Literal("off"),
      Type.Literal("allow"),
      Type.Literal("block"),
      Type.Literal("scan"),
      Type.Literal("noscan"),
      Type.Literal("safesearch"),
      Type.Literal("ytrestricted"),
      Type.Literal("isolate"),
      Type.Literal("noisolate"),
      Type.Literal("override"),
      Type.Literal("l4_override"),
      Type.Literal("egress"),
      Type.Literal("resolve"),
      Type.Literal("quarantine"),
      Type.Literal("redirect"),
    ],
    {
      description:
        "Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.",
      "x-auditable": true,
    },
  ),
)

export const ZeroTrustGatewaySchemasDescription = named(
  "zero-trust-gateway_schemas-description",
  Type.String({ description: "Specify the rule description.", "x-auditable": true }),
)

export const ZeroTrustGatewayDevicePosture = named(
  "zero-trust-gateway_device_posture",
  Type.String({
    description:
      "Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.",
    default: "",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const ZeroTrustGatewayEnabled = named(
  "zero-trust-gateway_enabled",
  Type.Boolean({ description: "Specify whether the rule is enabled.", default: false, "x-auditable": true }),
)

export const ZeroTrustGatewayTimestamp = named("zero-trust-gateway_timestamp", Type.String({ format: "date-time" }))

export const ZeroTrustGatewayExpiration = named(
  "zero-trust-gateway_expiration",
  Type.Union([
    Type.Object(
      {
        duration: Type.Optional(
          Type.Integer({
            description:
              "Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.",
            minimum: 5,
            "x-auditable": true,
          }),
        ),
        expired: Type.Optional(
          Type.Boolean({
            description: "Indicates whether the policy is expired.",
            readOnly: true,
            "x-auditable": true,
          }),
        ),
        expires_at: ZeroTrustGatewayTimestamp,
      },
      {
        description:
          "Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any. This  does not apply to HTTP or network policies. Settable only for `dns` rules.",
        "x-stainless-terraform-configurability": "computed_optional",
      },
    ),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayFilters = named(
  "zero-trust-gateway_filters",
  Type.Array(
    Type.Union(
      [
        Type.Literal("http"),
        Type.Literal("dns"),
        Type.Literal("l4"),
        Type.Literal("egress"),
        Type.Literal("dns_resolver"),
      ],
      { description: "Specify the protocol or layer to use.", "x-auditable": true },
    ),
    { description: "Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions." },
  ),
)

export const ZeroTrustGatewaySchemasUuid = named(
  "zero-trust-gateway_schemas-uuid",
  Type.String({ description: "Identify the API resource with a UUID.", maxLength: 36, "x-auditable": true }),
)

export const ZeroTrustGatewayIdentity = named(
  "zero-trust-gateway_identity",
  Type.String({
    description:
      "Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.",
    default: "",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const ZeroTrustGatewayComponentsSchemasName = named(
  "zero-trust-gateway_components-schemas-name",
  Type.String({ description: "Specify the rule name.", "x-auditable": true }),
)

export const ZeroTrustGatewayPrecedence = named(
  "zero-trust-gateway_precedence",
  Type.Integer({
    description:
      "Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order of this value. Refer to [Order of enforcement](http://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/#manage-precedence-with-terraform) to manage precedence via Terraform.",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const ZeroTrustGatewayDnsResolverSettingsV4 = named(
  "zero-trust-gateway_dns_resolver_settings_v4",
  Type.Object(
    {
      ip: Type.String({ description: "Specify the IPv4 address of the upstream resolver.", "x-auditable": true }),
      port: Type.Optional(
        Type.Integer({
          description: "Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.",
          "x-auditable": true,
        }),
      ),
      route_through_private_network: Type.Optional(
        Type.Boolean({
          description:
            "Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.",
          "x-auditable": true,
        }),
      ),
      vnet_id: Type.Optional(
        Type.String({
          description:
            "Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-terraform-configurability": "computed_optional" },
  ),
)

export const ZeroTrustGatewayDnsResolverSettingsV6 = named(
  "zero-trust-gateway_dns_resolver_settings_v6",
  Type.Object(
    {
      ip: Type.String({ description: "Specify the IPv6 address of the upstream resolver.", "x-auditable": true }),
      port: Type.Optional(
        Type.Integer({
          description: "Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.",
          "x-auditable": true,
        }),
      ),
      route_through_private_network: Type.Optional(
        Type.Boolean({
          description:
            "Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.",
          "x-auditable": true,
        }),
      ),
      vnet_id: Type.Optional(
        Type.String({
          description:
            "Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.",
          "x-auditable": true,
        }),
      ),
    },
    { "x-stainless-terraform-configurability": "computed_optional" },
  ),
)

export const ZeroTrustGatewayRuleSettings = named(
  "zero-trust-gateway_rule-settings",
  Type.Object(
    {
      add_headers: Type.Optional(
        Type.Union([Type.Record(Type.String(), Type.Array(Type.String(), { "x-auditable": true })), Type.Null()]),
      ),
      allow_child_bypass: Type.Optional(
        Type.Union([
          Type.Boolean({
            description:
              "Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.",
            "x-auditable": true,
            "x-stainless-terraform-configurability": "computed_optional",
          }),
          Type.Null(),
        ]),
      ),
      audit_ssh: Type.Optional(
        Type.Union([
          Type.Object(
            {
              command_logging: Type.Optional(
                Type.Boolean({ description: "Enable SSH command logging.", "x-auditable": true }),
              ),
            },
            {
              description:
                "Define the settings for the Audit SSH action. Settable only for `l4` rules with `audit_ssh` action.",
              "x-stainless-terraform-configurability": "optional",
            },
          ),
          Type.Null(),
        ]),
      ),
      biso_admin_controls: Type.Optional(
        Type.Object(
          {
            copy: Type.Optional(
              Type.Union([Type.Literal("enabled"), Type.Literal("disabled"), Type.Literal("remote_only")], {
                description:
                  'Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this field is absent, copying remains enabled. Applies only when version == "v2".',
                "x-auditable": true,
              }),
            ),
            dcp: Type.Optional(
              Type.Boolean({
                description: 'Set to false to enable copy-pasting. Only applies when `version == "v1"`.',
                "x-auditable": true,
              }),
            ),
            dd: Type.Optional(
              Type.Boolean({
                description: 'Set to false to enable downloading. Only applies when `version == "v1"`.',
                "x-auditable": true,
              }),
            ),
            dk: Type.Optional(
              Type.Boolean({
                description: 'Set to false to enable keyboard usage. Only applies when `version == "v1"`.',
                "x-auditable": true,
              }),
            ),
            download: Type.Optional(
              Type.Union([Type.Literal("enabled"), Type.Literal("disabled"), Type.Literal("remote_only")], {
                description:
                  'Configure download behavior. When set to remote_only, users can view downloads but cannot save them. Applies only when version == "v2".',
                "x-auditable": true,
              }),
            ),
            dp: Type.Optional(
              Type.Boolean({
                description: 'Set to false to enable printing. Only applies when `version == "v1"`.',
                "x-auditable": true,
              }),
            ),
            du: Type.Optional(
              Type.Boolean({
                description: 'Set to false to enable uploading. Only applies when `version == "v1"`.',
                "x-auditable": true,
              }),
            ),
            keyboard: Type.Optional(
              Type.Union([Type.Literal("enabled"), Type.Literal("disabled")], {
                description:
                  'Configure keyboard usage behavior. If this field is absent, keyboard usage remains enabled. Applies only when version == "v2".',
                "x-auditable": true,
              }),
            ),
            paste: Type.Optional(
              Type.Union([Type.Literal("enabled"), Type.Literal("disabled"), Type.Literal("remote_only")], {
                description:
                  'Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is absent, pasting remains enabled. Applies only when version == "v2".',
                "x-auditable": true,
              }),
            ),
            printing: Type.Optional(
              Type.Union([Type.Literal("enabled"), Type.Literal("disabled")], {
                description:
                  'Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".',
                "x-auditable": true,
              }),
            ),
            upload: Type.Optional(
              Type.Union([Type.Literal("enabled"), Type.Literal("disabled")], {
                description:
                  'Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".',
                "x-auditable": true,
              }),
            ),
            version: Type.Optional(
              Type.Union([Type.Literal("v1"), Type.Literal("v2")], {
                description: "Indicate which version of the browser isolation controls should apply.",
                "x-auditable": true,
              }),
            ),
          },
          {
            description:
              "Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.",
            "x-stainless-terraform-configurability": "optional",
          },
        ),
      ),
      block_page: Type.Optional(
        Type.Union([
          Type.Object(
            {
              include_context: Type.Optional(
                Type.Boolean({
                  description: "Specify whether to pass the context information as query parameters.",
                  "x-auditable": true,
                }),
              ),
              target_uri: Type.String({
                description: "Specify the URI to which the user is redirected.",
                format: "uri",
                "x-auditable": true,
              }),
            },
            {
              description:
                "Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `block`.",
              "x-stainless-terraform-configurability": "optional",
            },
          ),
          Type.Null(),
        ]),
      ),
      block_page_enabled: Type.Optional(
        Type.Boolean({
          description: "Enable the custom block page. Settable only for `dns` rules with action `block`.",
          "x-auditable": true,
          "x-stainless-terraform-configurability": "computed_optional",
        }),
      ),
      block_reason: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules when the action set to `block`.",
            "x-auditable": true,
            "x-stainless-terraform-configurability": "computed_optional",
          }),
          Type.Null(),
        ]),
      ),
      bypass_parent_rule: Type.Optional(
        Type.Union([
          Type.Boolean({
            description:
              "Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.",
            "x-auditable": true,
            "x-stainless-terraform-configurability": "optional",
          }),
          Type.Null(),
        ]),
      ),
      check_session: Type.Optional(
        Type.Union([
          Type.Object(
            {
              duration: Type.Optional(
                Type.String({
                  description:
                    "Sets the required session freshness threshold. The API returns a normalized version of this value.",
                  "x-auditable": true,
                }),
              ),
              enforce: Type.Optional(Type.Boolean({ description: "Enable session enforcement.", "x-auditable": true })),
            },
            {
              description:
                "Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.",
              "x-stainless-terraform-configurability": "optional",
            },
          ),
          Type.Null(),
        ]),
      ),
      dns_resolvers: Type.Optional(
        Type.Union([
          Type.Object(
            {
              ipv4: Type.Optional(Type.Array(ZeroTrustGatewayDnsResolverSettingsV4)),
              ipv6: Type.Optional(Type.Array(ZeroTrustGatewayDnsResolverSettingsV6)),
            },
            {
              description:
                "Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_internally' settings. DNS queries get routed to the address closest to their origin. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.",
              "x-stainless-terraform-configurability": "optional",
            },
          ),
          Type.Null(),
        ]),
      ),
      egress: Type.Optional(
        Type.Union([
          Type.Object(
            {
              ipv4: Type.Optional(
                Type.String({ description: "Specify the IPv4 address to use for egress.", "x-auditable": true }),
              ),
              ipv4_fallback: Type.Optional(
                Type.String({
                  description:
                    "Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.",
                  "x-auditable": true,
                }),
              ),
              ipv6: Type.Optional(
                Type.String({ description: "Specify the IPv6 range to use for egress.", "x-auditable": true }),
              ),
            },
            {
              description:
                "Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate local egress via WARP IPs. Settable only for `egress` rules.",
              "x-stainless-terraform-configurability": "optional",
            },
          ),
          Type.Null(),
        ]),
      ),
      ignore_cname_category_matches: Type.Optional(
        Type.Boolean({
          description:
            "Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in the response. Settable only for `dns` and `dns_resolver` rules.",
          "x-auditable": true,
          "x-stainless-terraform-configurability": "computed_optional",
        }),
      ),
      insecure_disable_dnssec_validation: Type.Optional(
        Type.Boolean({
          description:
            "Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.",
          "x-auditable": true,
          "x-stainless-terraform-configurability": "computed_optional",
        }),
      ),
      ip_categories: Type.Optional(
        Type.Boolean({
          description:
            "Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for `dns` and `dns_resolver` rules.",
          "x-auditable": true,
          "x-stainless-terraform-configurability": "computed_optional",
        }),
      ),
      ip_indicator_feeds: Type.Optional(
        Type.Boolean({
          description:
            "Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for `dns` and `dns_resolver` rules.",
          "x-auditable": true,
          "x-stainless-terraform-configurability": "computed_optional",
        }),
      ),
      l4override: Type.Optional(
        Type.Union([
          Type.Object(
            {
              ip: Type.Optional(Type.String({ description: "Defines the IPv4 or IPv6 address.", "x-auditable": true })),
              port: Type.Optional(
                Type.Integer({
                  description: "Defines a port number to use for TCP/UDP overrides.",
                  "x-auditable": true,
                }),
              ),
            },
            {
              description:
                "Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.",
              "x-stainless-terraform-configurability": "optional",
            },
          ),
          Type.Null(),
        ]),
      ),
      notification_settings: Type.Optional(
        Type.Union([
          Type.Object(
            {
              enabled: Type.Optional(Type.Boolean({ description: "Enable notification.", "x-auditable": true })),
              include_context: Type.Optional(
                Type.Boolean({
                  description: "Indicates whether to pass the context information as query parameters.",
                  "x-auditable": true,
                }),
              ),
              msg: Type.Optional(
                Type.String({ description: "Customize the message shown in the notification.", "x-auditable": true }),
              ),
              support_url: Type.Optional(
                Type.String({
                  description:
                    "Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.",
                  "x-auditable": true,
                }),
              ),
            },
            {
              description:
                "Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `block`.",
              "x-stainless-terraform-configurability": "optional",
            },
          ),
          Type.Null(),
        ]),
      ),
      override_host: Type.Optional(
        Type.String({
          description:
            "Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.",
          "x-auditable": true,
          "x-stainless-terraform-configurability": "computed_optional",
        }),
      ),
      override_ips: Type.Optional(
        Type.Union([
          Type.Array(Type.String({ description: "Defines the IPv4 or IPv6 address.", "x-auditable": true }), {
            description:
              "Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.",
            "x-stainless-terraform-configurability": "computed_optional",
          }),
          Type.Null(),
        ]),
      ),
      payload_log: Type.Optional(
        Type.Union([
          Type.Object(
            {
              enabled: Type.Optional(
                Type.Boolean({ description: "Enable DLP payload logging for this rule.", "x-auditable": true }),
              ),
            },
            {
              description: "Configure DLP payload logging. Settable only for `http` rules.",
              "x-stainless-terraform-configurability": "optional",
            },
          ),
          Type.Null(),
        ]),
      ),
      quarantine: Type.Optional(
        Type.Union([
          Type.Object(
            {
              file_types: Type.Optional(
                Type.Array(
                  Type.Union(
                    [
                      Type.Literal("exe"),
                      Type.Literal("pdf"),
                      Type.Literal("doc"),
                      Type.Literal("docm"),
                      Type.Literal("docx"),
                      Type.Literal("rtf"),
                      Type.Literal("ppt"),
                      Type.Literal("pptx"),
                      Type.Literal("xls"),
                      Type.Literal("xlsm"),
                      Type.Literal("xlsx"),
                      Type.Literal("zip"),
                      Type.Literal("rar"),
                    ],
                    { "x-auditable": true },
                  ),
                  { description: "Specify the types of files to sandbox." },
                ),
              ),
            },
            {
              description: "Configure settings that apply to quarantine rules. Settable only for `http` rules.",
              "x-stainless-terraform-configurability": "optional",
            },
          ),
          Type.Null(),
        ]),
      ),
      redirect: Type.Optional(
        Type.Union([
          Type.Object(
            {
              include_context: Type.Optional(
                Type.Boolean({
                  description: "Specify whether to pass the context information as query parameters.",
                  "x-auditable": true,
                }),
              ),
              preserve_path_and_query: Type.Optional(
                Type.Boolean({
                  description:
                    "Specify whether to append the path and query parameters from the original request to target_uri.",
                  "x-auditable": true,
                }),
              ),
              target_uri: Type.String({
                description: "Specify the URI to which the user is redirected.",
                format: "uri",
                "x-auditable": true,
              }),
            },
            {
              description:
                "Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.",
              "x-stainless-terraform-configurability": "optional",
            },
          ),
          Type.Null(),
        ]),
      ),
      resolve_dns_internally: Type.Optional(
        Type.Union([
          Type.Object(
            {
              fallback: Type.Optional(
                Type.Union([Type.Literal("none"), Type.Literal("public_dns")], {
                  description:
                    "Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CNAME records for 'A' or 'AAAA' queries.",
                  "x-auditable": true,
                }),
              ),
              view_id: Type.Optional(
                Type.String({
                  description: "Specify the internal DNS view identifier to pass to the internal DNS service.",
                  "x-auditable": true,
                }),
              ),
            },
            {
              description:
                "Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is specified or 'resolve_dns_through_cloudflare' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.",
              "x-stainless-terraform-configurability": "optional",
            },
          ),
          Type.Null(),
        ]),
      ),
      resolve_dns_through_cloudflare: Type.Optional(
        Type.Union([
          Type.Boolean({
            description:
              "Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'resolve_dns_internally' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.",
            "x-auditable": true,
            "x-stainless-terraform-configurability": "computed_optional",
          }),
          Type.Null(),
        ]),
      ),
      untrusted_cert: Type.Optional(
        Type.Union([
          Type.Object(
            {
              action: Type.Optional(
                Type.Union([Type.Literal("pass_through"), Type.Literal("block"), Type.Literal("error")], {
                  description:
                    "Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.",
                  "x-auditable": true,
                }),
              ),
            },
            {
              description:
                "Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `allow`.",
              "x-stainless-terraform-configurability": "optional",
            },
          ),
          Type.Null(),
        ]),
      ),
    },
    {
      description:
        "Set settings related to this rule. Each setting is only valid for specific rule types and can only be used with the appropriate selectors. If Terraform drift is observed in these setting values, verify that the setting is supported for the given rule type and that the API response reflects the requested value. If the API response returns sanitized or modified values that differ from the request, use the API-provided values in Terraform to ensure consistency.",
      "x-stainless-terraform-configurability": "computed_optional",
    },
  ),
)

export const ZeroTrustGatewaySchedule = named(
  "zero-trust-gateway_schedule",
  Type.Union([
    Type.Object(
      {
        fri: Type.Optional(
          Type.String({
            description:
              "Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Fridays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.",
            "x-auditable": true,
          }),
        ),
        mon: Type.Optional(
          Type.String({
            description:
              "Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits). If this parameter omitted, the rule is deactivated on Mondays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.",
            "x-auditable": true,
          }),
        ),
        sat: Type.Optional(
          Type.String({
            description:
              "Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Saturdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.",
            "x-auditable": true,
          }),
        ),
        sun: Type.Optional(
          Type.String({
            description:
              "Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Sundays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.",
            "x-auditable": true,
          }),
        ),
        thu: Type.Optional(
          Type.String({
            description:
              "Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Thursdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.",
            "x-auditable": true,
          }),
        ),
        time_zone: Type.Optional(
          Type.String({
            description:
              "Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) is provided, Gateway always uses the current time for that time zone. When this parameter is omitted, Gateway uses the time zone determined from the user's IP address. Colo time zone is used when the user's IP address does not resolve to a location.",
            "x-auditable": true,
          }),
        ),
        tue: Type.Optional(
          Type.String({
            description:
              "Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Tuesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.",
            "x-auditable": true,
          }),
        ),
        wed: Type.Optional(
          Type.String({
            description:
              "Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Wednesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.",
            "x-auditable": true,
          }),
        ),
      },
      {
        description:
          "Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.",
        "x-stainless-terraform-configurability": "computed_optional",
      },
    ),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayTraffic = named(
  "zero-trust-gateway_traffic",
  Type.String({
    description:
      "Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.",
    default: "",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const ZeroTrustGatewayRules = named(
  "zero-trust-gateway_rules",
  Type.Object({
    action: ZeroTrustGatewayAction,
    created_at: Type.Optional(Web3Timestamp),
    deleted_at: Type.Optional(ZeroTrustGatewayDeletedAt),
    description: Type.Optional(ZeroTrustGatewaySchemasDescription),
    device_posture: Type.Optional(ZeroTrustGatewayDevicePosture),
    enabled: ZeroTrustGatewayEnabled,
    expiration: Type.Optional(ZeroTrustGatewayExpiration),
    filters: ZeroTrustGatewayFilters,
    id: Type.Optional(ZeroTrustGatewaySchemasUuid),
    identity: Type.Optional(ZeroTrustGatewayIdentity),
    name: ZeroTrustGatewayComponentsSchemasName,
    precedence: ZeroTrustGatewayPrecedence,
    read_only: Type.Optional(ZeroTrustGatewayReadOnly),
    rule_settings: Type.Optional(ZeroTrustGatewayRuleSettings),
    schedule: Type.Optional(ZeroTrustGatewaySchedule),
    sharable: Type.Optional(ZeroTrustGatewaySharable),
    source_account: Type.Optional(ZeroTrustGatewaySourceAccount),
    traffic: ZeroTrustGatewayTraffic,
    updated_at: Type.Optional(Web3Timestamp),
    version: Type.Optional(ZeroTrustGatewayVersion),
    warning_status: Type.Optional(ZeroTrustGatewayWarningStatus),
  }),
)

export const ZeroTrustGatewayComponentsSchemasSingleResponse = named(
  "zero-trust-gateway_components-schemas-single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result: Type.Optional(ZeroTrustGatewayRules),
  }),
)

export const ZeroTrustGatewayResultInfo = named(
  "zero-trust-gateway_result_info",
  Type.Object({
    count: Type.Optional(
      Type.Number({ description: "Indicate the total number of results for the requested service." }),
    ),
    page: Type.Optional(Type.Number({ description: "Indicate the current page within a paginated list of results." })),
    per_page: Type.Optional(Type.Number({ description: "Indicate the number of results per page." })),
    total_count: Type.Optional(
      Type.Number({ description: "Indicate the total results available without any search parameters." }),
    ),
  }),
)

export const ZeroTrustGatewayRulesComponentsSchemasResponseCollection = named(
  "zero-trust-gateway_rules_components-schemas-response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result_info: Type.Optional(ZeroTrustGatewayResultInfo),
    result: Type.Optional(Type.Array(ZeroTrustGatewayRules)),
  }),
)

export const ZeroTrustGatewayComponentsSchemasUuid = named(
  "zero-trust-gateway_components-schemas-uuid",
  Type.String({ "x-auditable": true }),
)

export const ZeroTrustGatewayIps = named(
  "zero-trust-gateway_ips",
  Type.Array(
    Type.String({
      description: "Specify an IPv4 or IPv6 CIDR. Limit IPv6 to a maximum of /109 and IPv4 to a maximum of /25.",
      "x-auditable": true,
    }),
    { description: "Specify the list of CIDRs to restrict ingress connections." },
  ),
)

export const ZeroTrustGatewayProxyEndpointsComponentsSchemasName = named(
  "zero-trust-gateway_proxy-endpoints_components-schemas-name",
  Type.String({ description: "Specify the name of the proxy endpoint.", "x-auditable": true }),
)

export const ZeroTrustGatewaySchemasSubdomain = named(
  "zero-trust-gateway_schemas-subdomain",
  Type.String({
    description: "Specify the subdomain to use as the destination in the proxy client.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ZeroTrustGatewayProxyEndpoints = named(
  "zero-trust-gateway_proxy-endpoints",
  Type.Object({
    created_at: Type.Optional(Web3Timestamp),
    id: Type.Optional(ZeroTrustGatewayComponentsSchemasUuid),
    ips: Type.Optional(ZeroTrustGatewayIps),
    name: Type.Optional(ZeroTrustGatewayProxyEndpointsComponentsSchemasName),
    subdomain: Type.Optional(ZeroTrustGatewaySchemasSubdomain),
    updated_at: Type.Optional(Web3Timestamp),
  }),
)

export const ZeroTrustGatewayProxyEndpointsComponentsSchemasResponseCollection = named(
  "zero-trust-gateway_proxy-endpoints_components-schemas-response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result_info: Type.Optional(ZeroTrustGatewayResultInfo),
    result: Type.Optional(Type.Array(ZeroTrustGatewayProxyEndpoints)),
  }),
)

export const UnnamedSchemaRef4753ee81779d0e57189420079abab61e = named(
  "unnamed_schema_ref_4753ee81779d0e57189420079abab61e",
  Type.Union([Type.Null()]),
)

export const ZeroTrustGatewayProxyEndpointsComponentsSchemasSingleResponse = named(
  "zero-trust-gateway_proxy-endpoints_components-schemas-single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result: Type.Optional(ZeroTrustGatewayProxyEndpoints),
  }),
)

export const ZeroTrustGatewayAccountLogOptions = named(
  "zero-trust-gateway_account-log-options",
  Type.Object({
    log_all: Type.Optional(
      Type.Boolean({
        description: "Specify whether to log all requests to this service.",
        default: false,
        "x-auditable": true,
      }),
    ),
    log_blocks: Type.Optional(
      Type.Boolean({
        description: "Specify whether to log only blocking requests to this service.",
        default: false,
        "x-auditable": true,
      }),
    ),
  }),
)

export const UnnamedSchemaRefE86eeb84b7e922c35cfb0031a6309f7b = named(
  "unnamed_schema_ref_e86eeb84b7e922c35cfb0031a6309f7b",
  Type.Object(
    {
      dns: Type.Optional(ZeroTrustGatewayAccountLogOptions),
      http: Type.Optional(ZeroTrustGatewayAccountLogOptions),
      l4: Type.Optional(ZeroTrustGatewayAccountLogOptions),
    },
    { description: "Configure logging settings for each rule type." },
  ),
)

export const ZeroTrustGatewayGatewayAccountLoggingSettings = named(
  "zero-trust-gateway_gateway-account-logging-settings",
  Type.Object({
    redact_pii: Type.Optional(
      Type.Boolean({
        description:
          "Indicate whether to redact personally identifiable information from activity logging (PII fields include source IP, user email, user ID, device ID, URL, referrer, and user agent).",
        default: false,
        "x-auditable": true,
      }),
    ),
    settings_by_rule_type: Type.Optional(UnnamedSchemaRefE86eeb84b7e922c35cfb0031a6309f7b),
  }),
)

export const ZeroTrustGatewayGatewayAccountLoggingSettingsResponse = named(
  "zero-trust-gateway_gateway-account-logging-settings-response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result: Type.Optional(ZeroTrustGatewayGatewayAccountLoggingSettings),
  }),
)

export const ZeroTrustGatewayClientDefault = named(
  "zero-trust-gateway_client-default",
  Type.Boolean({
    description: "Indicate whether this location is the default location.",
    default: false,
    "x-auditable": true,
  }),
)

export const ZeroTrustGatewayDnsDestinationIpsIdRead = named(
  "zero-trust-gateway_dns-destination-ips-id-read",
  Type.String({
    description: "Indicate the identifier of the pair of IPv4 addresses assigned to this location.",
    default: "0e4a32c6-6fb8-4858-9296-98f51631e8e6",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const ZeroTrustGatewayDnsDestinationIpv6BlockId = named(
  "zero-trust-gateway_dns_destination_ipv6_block_id",
  Type.Union([
    Type.String({
      description:
        "Specify the UUID of the IPv6 block brought to the gateway so that this location's IPv6 address is allocated from the Bring Your Own IPv6 (BYOIPv6) block rather than the standard Cloudflare IPv6 block.",
      "x-auditable": true,
      "x-stainless-terraform-configurability": "computed_optional",
    }),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewaySubdomain = named(
  "zero-trust-gateway_subdomain",
  Type.String({
    description:
      "Specify the DNS over HTTPS domain that receives DNS requests. Gateway automatically generates this value.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ZeroTrustGatewayEcsSupport = named(
  "zero-trust-gateway_ecs-support",
  Type.Boolean({
    description: "Indicate whether the location must resolve EDNS queries.",
    default: false,
    "x-auditable": true,
  }),
)

export const ZeroTrustGatewayIpNetwork = named(
  "zero-trust-gateway_ip_network",
  Type.Object({
    network: Type.String({ description: "Specify the IP address or IP CIDR.", "x-auditable": true }),
  }),
)

export const ZeroTrustGatewayIpNetworks = named(
  "zero-trust-gateway_ip_networks",
  Type.Union([
    Type.Array(ZeroTrustGatewayIpNetwork, {
      description:
        "Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.",
      "x-stainless-terraform-configurability": "computed_optional",
    }),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayDohEndpoint = named(
  "zero-trust-gateway_doh_endpoint",
  Type.Object({
    enabled: Type.Optional(
      Type.Boolean({
        description: "Indicate whether the DOH endpoint is enabled for this location.",
        "x-auditable": true,
        "x-stainless-terraform-configurability": "computed_optional",
      }),
    ),
    networks: Type.Optional(ZeroTrustGatewayIpNetworks),
    require_token: Type.Optional(
      Type.Boolean({
        description: "Specify whether the DOH endpoint requires user identity authentication.",
        "x-auditable": true,
        "x-stainless-terraform-configurability": "computed_optional",
      }),
    ),
  }),
)

export const ZeroTrustGatewayDotEndpoint = named(
  "zero-trust-gateway_dot_endpoint",
  Type.Object({
    enabled: Type.Optional(
      Type.Boolean({
        description: "Indicate whether the DOT endpoint is enabled for this location.",
        "x-auditable": true,
        "x-stainless-terraform-configurability": "computed_optional",
      }),
    ),
    networks: Type.Optional(ZeroTrustGatewayIpNetworks),
  }),
)

export const ZeroTrustGatewayIpv4Endpoint = named(
  "zero-trust-gateway_ipv4_endpoint",
  Type.Object({
    enabled: Type.Optional(
      Type.Boolean({
        description: "Indicate whether the IPv4 endpoint is enabled for this location.",
        "x-auditable": true,
        "x-stainless-terraform-configurability": "computed_optional",
      }),
    ),
  }),
)

export const ZeroTrustGatewayIpv6Network = named(
  "zero-trust-gateway_ipv6_network",
  Type.Object({
    network: Type.String({ description: "Specify the IPv6 address or IPv6 CIDR.", "x-auditable": true }),
  }),
)

export const ZeroTrustGatewayIpv6Networks = named(
  "zero-trust-gateway_ipv6_networks",
  Type.Union([
    Type.Array(ZeroTrustGatewayIpv6Network, {
      description:
        "Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.",
      "x-stainless-terraform-configurability": "computed_optional",
    }),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayIpv6Endpoint = named(
  "zero-trust-gateway_ipv6_endpoint",
  Type.Object({
    enabled: Type.Optional(
      Type.Boolean({
        description: "Indicate whether the IPV6 endpoint is enabled for this location.",
        "x-auditable": true,
        "x-stainless-terraform-configurability": "computed_optional",
      }),
    ),
    networks: Type.Optional(ZeroTrustGatewayIpv6Networks),
  }),
)

export const ZeroTrustGatewayEndpoints = named(
  "zero-trust-gateway_endpoints",
  Type.Union([
    Type.Object(
      {
        doh: ZeroTrustGatewayDohEndpoint,
        dot: ZeroTrustGatewayDotEndpoint,
        ipv4: ZeroTrustGatewayIpv4Endpoint,
        ipv6: ZeroTrustGatewayIpv6Endpoint,
      },
      {
        description: "Configure the destination endpoints for this location.",
        "x-stainless-terraform-configurability": "optional",
      },
    ),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayIp = named(
  "zero-trust-gateway_ip",
  Type.String({
    description:
      "Defines the automatically generated IPv6 destination IP assigned to this location. Gateway counts all DNS requests sent to this IP as requests under this location.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ZeroTrustGatewaySchemasName = named(
  "zero-trust-gateway_schemas-name",
  Type.String({ description: "Specify the location name.", "x-auditable": true }),
)

export const ZeroTrustGatewayIpv4Network = named(
  "zero-trust-gateway_ipv4_network",
  Type.Object({
    network: Type.String({
      description: "Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.",
      "x-auditable": true,
    }),
  }),
)

export const ZeroTrustGatewayIpv4Networks = named(
  "zero-trust-gateway_ipv4_networks",
  Type.Union([
    Type.Array(ZeroTrustGatewayIpv4Network, {
      description:
        "Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv4 endpoint is enabled for this location.",
      "x-stainless-terraform-configurability": "computed_optional",
    }),
    Type.Null(),
  ]),
)

export const UnnamedSchemaRef1b37523fdb0ae5806cd8e062492aab66 = named(
  "unnamed_schema_ref_1b37523fdb0ae5806cd8e062492aab66",
  Type.Union([Type.Null()]),
)

export const ZeroTrustGatewayLocations = named(
  "zero-trust-gateway_locations",
  Type.Object({
    client_default: Type.Optional(ZeroTrustGatewayClientDefault),
    created_at: Type.Optional(Web3Timestamp),
    dns_destination_ips_id: Type.Optional(ZeroTrustGatewayDnsDestinationIpsIdRead),
    dns_destination_ipv6_block_id: Type.Optional(ZeroTrustGatewayDnsDestinationIpv6BlockId),
    doh_subdomain: Type.Optional(ZeroTrustGatewaySubdomain),
    ecs_support: Type.Optional(ZeroTrustGatewayEcsSupport),
    endpoints: Type.Optional(ZeroTrustGatewayEndpoints),
    id: Type.Optional(ZeroTrustGatewayComponentsSchemasUuid),
    ip: Type.Optional(ZeroTrustGatewayIp),
    ipv4_destination: Type.Optional(
      Type.String({
        description:
          "Show the primary destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.",
        readOnly: true,
      }),
    ),
    ipv4_destination_backup: Type.Optional(
      Type.String({
        description:
          "Show the backup destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.",
        readOnly: true,
      }),
    ),
    name: Type.Optional(ZeroTrustGatewaySchemasName),
    networks: Type.Optional(ZeroTrustGatewayIpv4Networks),
    updated_at: Type.Optional(Web3Timestamp),
  }),
)

export const ZeroTrustGatewaySchemasSingleResponse = named(
  "zero-trust-gateway_schemas-single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result: Type.Optional(ZeroTrustGatewayLocations),
  }),
)

export const ZeroTrustGatewayDnsDestinationIpsIdWrite = named(
  "zero-trust-gateway_dns-destination-ips-id-write",
  Type.String({
    description:
      "Specify the identifier of the pair of IPv4 addresses assigned to this location. When creating a location, if this field is absent or set to null, the pair of shared IPv4 addresses (0e4a32c6-6fb8-4858-9296-98f51631e8e6) is auto-assigned. When updating a location, if this field is absent or set to null, the pre-assigned pair remains unchanged.",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const ZeroTrustGatewayComponentsSchemasResponseCollection = named(
  "zero-trust-gateway_components-schemas-response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result_info: Type.Optional(ZeroTrustGatewayResultInfo),
    result: Type.Optional(Type.Array(ZeroTrustGatewayLocations)),
  }),
)

export const ZeroTrustGatewayDescriptionItem = named(
  "zero-trust-gateway_description_item",
  Type.String({ description: "Provide the list item description (optional)." }),
)

export const ZeroTrustGatewayValue = named(
  "zero-trust-gateway_value",
  Type.String({ description: "Specify the item value.", "x-auditable": true }),
)

export const ZeroTrustGatewayItems = named(
  "zero-trust-gateway_items",
  Type.Array(
    Type.Object({
      created_at: Type.Optional(Web3Timestamp),
      description: Type.Optional(ZeroTrustGatewayDescriptionItem),
      value: Type.Optional(ZeroTrustGatewayValue),
    }),
    { description: "Provide the list items.", "x-stainless-collection-type": "set" },
  ),
)

export const ZeroTrustGatewayListItemResponseCollection = named(
  "zero-trust-gateway_list_item_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result_info: Type.Optional(
      Type.Object({
        count: Type.Optional(
          Type.Number({ description: "Shows the total results returned based on your search parameters." }),
        ),
        page: Type.Optional(Type.Number({ description: "Show the current page within paginated list of results." })),
        per_page: Type.Optional(Type.Number({ description: "Show the number of results per page of results." })),
        total_count: Type.Optional(
          Type.Number({ description: "Show the total results available without any search parameters." }),
        ),
      }),
    ),
    result: Type.Optional(Type.Array(ZeroTrustGatewayItems)),
  }),
)

export const ZeroTrustGatewayEmptyResponse = named(
  "zero-trust-gateway_empty_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result: Type.Optional(Type.Unknown()),
  }),
)

export const ZeroTrustGatewayCount = named(
  "zero-trust-gateway_count",
  Type.Number({ description: "Indicate the number of items in the list.", readOnly: true }),
)

export const ZeroTrustGatewayDescription = named(
  "zero-trust-gateway_description",
  Type.String({
    description: "Provide the list description.",
    "x-auditable": true,
    "x-stainless-terraform-configurability": "computed_optional",
  }),
)

export const ZeroTrustGatewayName = named(
  "zero-trust-gateway_name",
  Type.String({ description: "Specify the list name.", "x-auditable": true }),
)

export const ZeroTrustGatewaySchemasType = named(
  "zero-trust-gateway_schemas-type",
  Type.Union(
    [Type.Literal("SERIAL"), Type.Literal("URL"), Type.Literal("DOMAIN"), Type.Literal("EMAIL"), Type.Literal("IP")],
    { description: "Specify the list type.", "x-auditable": true },
  ),
)

export const ZeroTrustGatewayLists = named(
  "zero-trust-gateway_lists",
  Type.Object({
    count: Type.Optional(ZeroTrustGatewayCount),
    created_at: Type.Optional(Web3Timestamp),
    description: Type.Optional(ZeroTrustGatewayDescription),
    id: Type.Optional(ZeroTrustGatewaySchemasUuid),
    items: Type.Optional(ZeroTrustGatewayItems),
    name: Type.Optional(ZeroTrustGatewayName),
    type: Type.Optional(ZeroTrustGatewaySchemasType),
    updated_at: Type.Optional(Web3Timestamp),
  }),
)

export const ZeroTrustGatewayListSingleResponse = named(
  "zero-trust-gateway_list_single_response",
  Type.Object(
    {
      errors: D1Messages,
      messages: D1Messages,
      success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
      result: Type.Optional(ZeroTrustGatewayLists),
    },
    { "x-auditable": true },
  ),
)

export const ZeroTrustGatewaySingleResponseWithListItems = named(
  "zero-trust-gateway_single_response_with_list_items",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        created_at: Type.Optional(Web3Timestamp),
        description: Type.Optional(ZeroTrustGatewayDescription),
        id: Type.Optional(ZeroTrustGatewaySchemasUuid),
        items: Type.Optional(ZeroTrustGatewayItems),
        name: Type.Optional(ZeroTrustGatewayName),
        type: Type.Optional(ZeroTrustGatewaySchemasType),
        updated_at: Type.Optional(Web3Timestamp),
      }),
    ),
  }),
)

export const ZeroTrustGatewayItemsInput = named(
  "zero-trust-gateway_items-input",
  Type.Array(
    Type.Object({
      description: Type.Optional(ZeroTrustGatewayDescriptionItem),
      value: Type.Optional(ZeroTrustGatewayValue),
    }),
    { description: "Add items to the list.", "x-stainless-collection-type": "set" },
  ),
)

export const ZeroTrustGatewaySchemasResponseCollection = named(
  "zero-trust-gateway_schemas-response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result_info: Type.Optional(ZeroTrustGatewayResultInfo),
    result: Type.Optional(Type.Array(ZeroTrustGatewayLists)),
  }),
)

export const ZeroTrustGatewayCustomCertificateSettings = named(
  "zero-trust-gateway_custom-certificate-settings",
  Type.Object(
    {
      binding_status: Type.Optional(
        Type.String({ description: "Indicate the internal certificate status.", readOnly: true, "x-auditable": true }),
      ),
      enabled: Type.Union([
        Type.Boolean({
          description: "Specify whether to enable a custom certificate authority for signing Gateway traffic.",
          "x-auditable": true,
        }),
        Type.Null(),
      ]),
      id: Type.Optional(
        Type.String({
          description: "Specify the UUID of the certificate (ID from MTLS certificate store).",
          "x-auditable": true,
        }),
      ),
      updated_at: Type.Optional(Type.String({ format: "date-time", readOnly: true })),
    },
    {
      description:
        "Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.",
      "x-stainless-terraform-configurability": "optional",
    },
  ),
)

export const ZeroTrustGatewayActivityLogSettings = named(
  "zero-trust-gateway_activity-log-settings",
  Type.Object(
    {
      enabled: Type.Optional(
        Type.Union([
          Type.Boolean({ description: "Specify whether to log activity.", "x-auditable": true }),
          Type.Null(),
        ]),
      ),
    },
    { description: "Specify activity log settings.", "x-stainless-terraform-configurability": "optional" },
  ),
)

export const ZeroTrustGatewayEnabledDownloadPhase = named(
  "zero-trust-gateway_enabled_download_phase",
  Type.Union([
    Type.Boolean({
      description: "Specify whether to enable anti-virus scanning on downloads.",
      "x-auditable": true,
      "x-stainless-terraform-configurability": "computed_optional",
    }),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayEnabledUploadPhase = named(
  "zero-trust-gateway_enabled_upload_phase",
  Type.Union([
    Type.Boolean({
      description: "Specify whether to enable anti-virus scanning on uploads.",
      "x-auditable": true,
      "x-stainless-terraform-configurability": "computed_optional",
    }),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayFailClosed = named(
  "zero-trust-gateway_fail_closed",
  Type.Union([
    Type.Boolean({
      description: "Specify whether to block requests for unscannable files.",
      "x-auditable": true,
      "x-stainless-terraform-configurability": "computed_optional",
    }),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayNotificationSettings = named(
  "zero-trust-gateway_notification_settings",
  Type.Union([
    Type.Object(
      {
        enabled: Type.Optional(
          Type.Boolean({ description: "Specify whether to enable notifications.", "x-auditable": true }),
        ),
        include_context: Type.Optional(
          Type.Boolean({
            description: "Specify whether to include context information as query parameters.",
            "x-auditable": true,
          }),
        ),
        msg: Type.Optional(
          Type.String({ description: "Specify the message to show in the notification.", "x-auditable": true }),
        ),
        support_url: Type.Optional(
          Type.String({
            description:
              "Specify a URL that directs users to more information. If unset, the notification opens a block page.",
            "x-auditable": true,
          }),
        ),
      },
      {
        description: "Configure the message the user's device shows during an antivirus scan.",
        "x-stainless-terraform-configurability": "computed_optional",
      },
    ),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayAntiVirusSettings = named(
  "zero-trust-gateway_anti-virus-settings",
  Type.Union([
    Type.Object(
      {
        enabled_download_phase: Type.Optional(ZeroTrustGatewayEnabledDownloadPhase),
        enabled_upload_phase: Type.Optional(ZeroTrustGatewayEnabledUploadPhase),
        fail_closed: Type.Optional(ZeroTrustGatewayFailClosed),
        notification_settings: Type.Optional(ZeroTrustGatewayNotificationSettings),
      },
      { description: "Specify anti-virus settings.", "x-stainless-terraform-configurability": "optional" },
    ),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayBlockPageSettings = named(
  "zero-trust-gateway_block-page-settings",
  Type.Object(
    {
      background_color: Type.Optional(
        Type.String({
          description:
            "Specify the block page background color in `#rrggbb` format when the mode is customized_block_page.",
          "x-auditable": true,
        }),
      ),
      enabled: Type.Optional(
        Type.Union([
          Type.Boolean({ description: "Specify whether to enable the custom block page.", "x-auditable": true }),
          Type.Null(),
        ]),
      ),
      footer_text: Type.Optional(
        Type.String({
          description: "Specify the block page footer text when the mode is customized_block_page.",
          "x-auditable": true,
        }),
      ),
      header_text: Type.Optional(
        Type.String({
          description: "Specify the block page header text when the mode is customized_block_page.",
          "x-auditable": true,
        }),
      ),
      include_context: Type.Optional(
        Type.Boolean({
          description:
            "Specify whether to append context to target_uri as query parameters. This applies only when the mode is redirect_uri.",
          "x-auditable": true,
        }),
      ),
      logo_path: Type.Optional(
        Type.String({
          description: "Specify the full URL to the logo file when the mode is customized_block_page.",
          "x-auditable": true,
        }),
      ),
      mailto_address: Type.Optional(
        Type.String({
          description: "Specify the admin email for users to contact when the mode is customized_block_page.",
          "x-auditable": true,
        }),
      ),
      mailto_subject: Type.Optional(
        Type.String({
          description:
            "Specify the subject line for emails created from the block page when the mode is customized_block_page.",
          "x-auditable": true,
        }),
      ),
      mode: Type.Optional(
        Type.Union([Type.Literal(""), Type.Literal("customized_block_page"), Type.Literal("redirect_uri")], {
          description:
            "Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.",
          "x-auditable": true,
          "x-stainless-terraform-configurability": "optional",
        }),
      ),
      name: Type.Optional(
        Type.String({
          description: "Specify the block page title when the mode is customized_block_page.",
          "x-auditable": true,
        }),
      ),
      read_only: Type.Optional(
        Type.Union([
          Type.Boolean({
            description:
              "Indicate that this setting was shared via the Orgs API and read only for the current account.",
            readOnly: true,
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      source_account: Type.Optional(
        Type.Union([
          Type.String({
            description: "Indicate the account tag of the account that shared this setting.",
            readOnly: true,
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      suppress_footer: Type.Optional(
        Type.Boolean({
          description:
            "Specify whether to suppress detailed information at the bottom of the block page when the mode is customized_block_page.",
        }),
      ),
      target_uri: Type.Optional(
        Type.String({
          description: "Specify the URI to redirect users to when the mode is redirect_uri.",
          format: "uri",
          "x-auditable": true,
        }),
      ),
      version: Type.Optional(
        Type.Union([
          Type.Integer({
            description: "Indicate the version number of the setting.",
            readOnly: true,
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
    },
    { description: "Specify block page layout settings.", "x-stainless-terraform-configurability": "optional" },
  ),
)

export const ZeroTrustGatewayBodyScanningSettings = named(
  "zero-trust-gateway_body-scanning-settings",
  Type.Union([
    Type.Object(
      {
        inspection_mode: Type.Optional(
          Type.Union([Type.Literal("deep"), Type.Literal("shallow")], {
            description: "Specify the inspection mode as either `deep` or `shallow`.",
            "x-auditable": true,
          }),
        ),
      },
      { description: "Specify the DLP inspection mode.", "x-stainless-terraform-configurability": "optional" },
    ),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayBrowserIsolationSettings = named(
  "zero-trust-gateway_browser-isolation-settings",
  Type.Union([
    Type.Object(
      {
        non_identity_enabled: Type.Optional(
          Type.Boolean({
            description: "Specify whether to enable non-identity onramp support for Browser Isolation.",
            "x-auditable": true,
          }),
        ),
        url_browser_isolation_enabled: Type.Optional(
          Type.Boolean({ description: "Specify whether to enable Clientless Browser Isolation.", "x-auditable": true }),
        ),
      },
      {
        description: "Specify Clientless Browser Isolation settings.",
        "x-stainless-terraform-configurability": "optional",
      },
    ),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayCertificateSettings = named(
  "zero-trust-gateway_certificate-settings",
  Type.Union([
    Type.Object(
      {
        id: Type.String({
          description:
            "Specify the UUID of the certificate used for interception. Ensure the certificate is available at the edge(previously called 'active'). A nil UUID directs Cloudflare to use the Root CA.",
          "x-auditable": true,
        }),
      },
      {
        description:
          "Specify certificate settings for Gateway TLS interception. If unset, the Cloudflare Root CA handles interception.",
        "x-stainless-terraform-configurability": "optional",
      },
    ),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayExtendedEmailMatching = named(
  "zero-trust-gateway_extended-email-matching",
  Type.Object(
    {
      enabled: Type.Optional(
        Type.Union([
          Type.Boolean({
            description:
              "Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.",
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      read_only: Type.Optional(
        Type.Boolean({
          description: "Indicate that this setting was shared via the Orgs API and read only for the current account.",
          readOnly: true,
          "x-auditable": true,
          "x-stainless-terraform-configurability": "optional",
        }),
      ),
      source_account: Type.Optional(
        Type.String({
          description: "Indicate the account tag of the account that shared this setting.",
          readOnly: true,
          "x-auditable": true,
          "x-stainless-terraform-configurability": "optional",
        }),
      ),
      version: Type.Optional(
        Type.Integer({
          description: "Indicate the version number of the setting.",
          readOnly: true,
          "x-auditable": true,
          "x-stainless-terraform-configurability": "optional",
        }),
      ),
    },
    {
      description:
        "Specify user email settings for the firewall policies. When this is enabled, we standardize the email addresses in the identity part of the rule, so that they match the extended email variants in the firewall policies. When this setting is turned off, the email addresses in the identity part of the rule will be matched exactly as provided. If your email has `.` or `+` modifiers, you should enable this setting.",
      "x-stainless-terraform-configurability": "optional",
    },
  ),
)

export const ZeroTrustGatewayFipsSettings = named(
  "zero-trust-gateway_fips-settings",
  Type.Union([
    Type.Object(
      {
        tls: Type.Optional(
          Type.Boolean({
            description: "Enforce cipher suites and TLS versions compliant with FIPS 140-2.",
            "x-auditable": true,
          }),
        ),
      },
      { description: "Specify FIPS settings.", "x-stainless-terraform-configurability": "optional" },
    ),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayHostSelectorSettings = named(
  "zero-trust-gateway_host-selector-settings",
  Type.Object(
    {
      enabled: Type.Optional(
        Type.Union([
          Type.Boolean({
            description: "Specify whether to enable filtering via hosts for egress policies.",
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
    },
    { description: "Enable host selection in egress policies.", "x-stainless-terraform-configurability": "optional" },
  ),
)

export const ZeroTrustGatewayInspectionSettings = named(
  "zero-trust-gateway_inspection-settings",
  Type.Union([
    Type.Object(
      {
        mode: Type.Optional(
          Type.Union([Type.Literal("static"), Type.Literal("dynamic")], {
            description:
              "Define the proxy inspection mode.   1. static: Gateway applies static inspection to HTTP on TCP(80). With TLS decryption on, Gateway inspects HTTPS traffic on TCP(443) and UDP(443).   2. dynamic: Gateway applies protocol detection to inspect HTTP and HTTPS traffic on any port. TLS decryption must remain on to inspect HTTPS traffic.",
            "x-auditable": true,
          }),
        ),
      },
      { description: "Define the proxy inspection mode.", "x-stainless-terraform-configurability": "optional" },
    ),
    Type.Null(),
  ]),
)

export const ZeroTrustGatewayProtocolDetection = named(
  "zero-trust-gateway_protocol-detection",
  Type.Object(
    {
      enabled: Type.Optional(
        Type.Union([
          Type.Boolean({
            description: "Specify whether to detect protocols from the initial bytes of client traffic.",
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
    },
    {
      description: "Specify whether to detect protocols from the initial bytes of client traffic.",
      "x-stainless-terraform-configurability": "optional",
    },
  ),
)

export const ZeroTrustGatewaySandbox = named(
  "zero-trust-gateway_sandbox",
  Type.Object(
    {
      enabled: Type.Optional(
        Type.Union([
          Type.Boolean({ description: "Specify whether to enable the sandbox.", "x-auditable": true }),
          Type.Null(),
        ]),
      ),
      fallback_action: Type.Optional(
        Type.Union([Type.Literal("allow"), Type.Literal("block")], {
          description: "Specify the action to take when the system cannot scan the file.",
          "x-auditable": true,
        }),
      ),
    },
    { description: "Specify whether to enable the sandbox.", "x-stainless-terraform-configurability": "optional" },
  ),
)

export const ZeroTrustGatewayTlsSettings = named(
  "zero-trust-gateway_tls-settings",
  Type.Union([
    Type.Object(
      {
        enabled: Type.Optional(
          Type.Boolean({ description: "Specify whether to inspect encrypted HTTP traffic.", "x-auditable": true }),
        ),
      },
      {
        description: "Specify whether to inspect encrypted HTTP traffic.",
        "x-stainless-terraform-configurability": "optional",
      },
    ),
    Type.Null(),
  ]),
)

export const UnnamedSchemaRef055aaf3918bf29f81c09d394a864182e = named(
  "unnamed_schema_ref_055aaf3918bf29f81c09d394a864182e",
  Type.Object(
    {
      activity_log: Type.Optional(ZeroTrustGatewayActivityLogSettings),
      antivirus: Type.Optional(ZeroTrustGatewayAntiVirusSettings),
      block_page: Type.Optional(ZeroTrustGatewayBlockPageSettings),
      body_scanning: Type.Optional(ZeroTrustGatewayBodyScanningSettings),
      browser_isolation: Type.Optional(ZeroTrustGatewayBrowserIsolationSettings),
      certificate: Type.Optional(ZeroTrustGatewayCertificateSettings),
      custom_certificate: Type.Optional(ZeroTrustGatewayCustomCertificateSettings),
      extended_email_matching: Type.Optional(ZeroTrustGatewayExtendedEmailMatching),
      fips: Type.Optional(ZeroTrustGatewayFipsSettings),
      host_selector: Type.Optional(ZeroTrustGatewayHostSelectorSettings),
      inspection: Type.Optional(ZeroTrustGatewayInspectionSettings),
      protocol_detection: Type.Optional(ZeroTrustGatewayProtocolDetection),
      sandbox: Type.Optional(ZeroTrustGatewaySandbox),
      tls_decrypt: Type.Optional(ZeroTrustGatewayTlsSettings),
    },
    { description: "Specify account settings." },
  ),
)

export const ZeroTrustGatewayGatewayAccountSettings = named(
  "zero-trust-gateway_gateway-account-settings",
  Type.Object(
    {
      settings: Type.Optional(UnnamedSchemaRef055aaf3918bf29f81c09d394a864182e),
    },
    { description: "Specify account settings." },
  ),
)

export const ZeroTrustGatewayGatewayAccountConfig = named(
  "zero-trust-gateway_gateway_account_config",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result: Type.Optional(
      Type.Object(
        {
          settings: Type.Optional(UnnamedSchemaRef055aaf3918bf29f81c09d394a864182e),
          created_at: Type.Optional(Web3Timestamp),
          updated_at: Type.Optional(Web3Timestamp),
        },
        { description: "Specify account settings." },
      ),
    ),
  }),
)

export const ZeroTrustGatewayType = named(
  "zero-trust-gateway_type",
  Type.Union([Type.Literal("custom"), Type.Literal("gateway_managed")], {
    description: "Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.",
    "x-auditable": true,
  }),
)

export const ZeroTrustGatewayUuid = named(
  "zero-trust-gateway_uuid",
  Type.String({ description: "Identify the certificate with a UUID.", maxLength: 36, "x-auditable": true }),
)

export const ZeroTrustGatewayBindingStatus = named(
  "zero-trust-gateway_binding_status",
  Type.Union(
    [
      Type.Literal("pending_deployment"),
      Type.Literal("available"),
      Type.Literal("pending_deletion"),
      Type.Literal("inactive"),
    ],
    {
      description:
        "Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.",
      "x-auditable": true,
    },
  ),
)

export const ZeroTrustGatewayCertificates = named(
  "zero-trust-gateway_certificates",
  Type.Object({
    binding_status: Type.Optional(ZeroTrustGatewayBindingStatus),
    certificate: Type.Optional(Type.String({ description: "Provide the CA certificate (read-only).", readOnly: true })),
    created_at: Type.Optional(Web3Timestamp),
    expires_on: Type.Optional(Web3Timestamp),
    fingerprint: Type.Optional(
      Type.String({
        description: "Provide the SHA256 fingerprint of the certificate (read-only).",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    id: Type.Optional(ZeroTrustGatewayUuid),
    in_use: Type.Optional(
      Type.Boolean({
        description:
          "Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).",
        readOnly: true,
        "x-stainless-terraform-configurability": "computed",
      }),
    ),
    issuer_org: Type.Optional(
      Type.String({
        description: "Indicate the organization that issued the certificate (read-only).",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    issuer_raw: Type.Optional(
      Type.String({
        description: "Provide the entire issuer field of the certificate (read-only).",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    type: Type.Optional(ZeroTrustGatewayType),
    updated_at: Type.Optional(Web3Timestamp),
    uploaded_on: Type.Optional(Web3Timestamp),
  }),
)

export const ZeroTrustGatewaySingleResponse = named(
  "zero-trust-gateway_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result: Type.Optional(ZeroTrustGatewayCertificates),
  }),
)

export const ZeroTrustGatewayGenerateCertRequest = named(
  "zero-trust-gateway_generate-cert-request",
  Type.Object({
    validity_period_days: Type.Optional(
      Type.Integer({
        description:
          "Sets the certificate validity period in days (range: 1-10,950 days / ~30 years). Defaults to 1,825 days (5 years). **Important**: This field is only settable during the certificate creation.  Certificates becomes immutable after creation - use the `/activate` and `/deactivate` endpoints to manage certificate lifecycle.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const ZeroTrustGatewayResponseCollection = named(
  "zero-trust-gateway_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result_info: Type.Optional(ZeroTrustGatewayResultInfo),
    result: Type.Optional(Type.Array(ZeroTrustGatewayCertificates)),
  }),
)

export const ZeroTrustGatewayBeta = named(
  "zero-trust-gateway_beta",
  Type.Boolean({ description: "Indicate whether the category is in beta and subject to change.", "x-auditable": true }),
)

export const ZeroTrustGatewayClass = named(
  "zero-trust-gateway_class",
  Type.Union(
    [
      Type.Literal("free"),
      Type.Literal("premium"),
      Type.Literal("blocked"),
      Type.Literal("removalPending"),
      Type.Literal("noBlock"),
    ],
    {
      description:
        "Specify which account types can create policies for this category. `blocked` Blocks unconditionally for all accounts. `removalPending` Allows removal from policies but disables addition. `noBlock` Prevents blocking.",
      "x-auditable": true,
    },
  ),
)

export const ZeroTrustGatewayComponentsSchemasDescription = named(
  "zero-trust-gateway_components-schemas-description",
  Type.String({ description: "Provide a short summary of domains in the category.", "x-auditable": true }),
)

export const ZeroTrustGatewayId = named(
  "zero-trust-gateway_id",
  Type.Integer({ description: "Identify this category. Only one category per ID.", "x-auditable": true }),
)

export const ZeroTrustGatewayCategoriesComponentsSchemasName = named(
  "zero-trust-gateway_categories_components-schemas-name",
  Type.String({ description: "Specify the category name." }),
)

export const ZeroTrustGatewaySubcategory = named(
  "zero-trust-gateway_subcategory",
  Type.Object({
    beta: Type.Optional(ZeroTrustGatewayBeta),
    class: Type.Optional(ZeroTrustGatewayClass),
    description: Type.Optional(ZeroTrustGatewayComponentsSchemasDescription),
    id: Type.Optional(ZeroTrustGatewayId),
    name: Type.Optional(ZeroTrustGatewayCategoriesComponentsSchemasName),
  }),
)

export const ZeroTrustGatewayCategories = named(
  "zero-trust-gateway_categories",
  Type.Object({
    beta: Type.Optional(ZeroTrustGatewayBeta),
    class: Type.Optional(ZeroTrustGatewayClass),
    description: Type.Optional(ZeroTrustGatewayComponentsSchemasDescription),
    id: Type.Optional(ZeroTrustGatewayId),
    name: Type.Optional(ZeroTrustGatewayCategoriesComponentsSchemasName),
    subcategories: Type.Optional(
      Type.Array(ZeroTrustGatewaySubcategory, { description: "Provide all subcategories for this category." }),
    ),
  }),
)

export const ZeroTrustGatewayCategoriesComponentsSchemasResponseCollection = named(
  "zero-trust-gateway_categories_components-schemas-response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result_info: Type.Optional(ZeroTrustGatewayResultInfo),
    result: Type.Optional(Type.Array(ZeroTrustGatewayCategories)),
  }),
)

export const ZeroTrustGatewayAuditSshSettingsComponentsSchemasUuid = named(
  "zero-trust-gateway_audit_ssh_settings_components-schemas-uuid",
  Type.String({ description: "Identify the seed ID.", maxLength: 36, "x-auditable": true }),
)

export const ZeroTrustGatewayPublicKey = named(
  "zero-trust-gateway_public_key",
  Type.String({
    description:
      "Provide the Base64-encoded HPKE public key that encrypts SSH session logs. See https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-infrastructure-access/#enable-ssh-command-logging.",
    "x-auditable": true,
  }),
)

export const ZeroTrustGatewaySettings = named(
  "zero-trust-gateway_settings",
  Type.Object({
    created_at: Type.Optional(Web3Timestamp),
    public_key: Type.Optional(ZeroTrustGatewayPublicKey),
    seed_id: Type.Optional(ZeroTrustGatewayAuditSshSettingsComponentsSchemasUuid),
    updated_at: Type.Optional(Web3Timestamp),
  }),
)

export const ZeroTrustGatewayAuditSshSettingsComponentsSchemasSingleResponse = named(
  "zero-trust-gateway_audit_ssh_settings_components-schemas-single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result: Type.Optional(ZeroTrustGatewaySettings),
  }),
)

export const ZeroTrustGatewayUnapprovedApps = named(
  "zero-trust-gateway_unapproved_apps",
  Type.Array(Type.Integer(), {
    description: 'Defines the list of "unapproved" app ids.',
    "x-stainless-collection-type": "set",
  }),
)

export const ZeroTrustGatewayInReviewApps = named(
  "zero-trust-gateway_in_review_apps",
  Type.Array(Type.Integer(), {
    description: 'Defines the list of "in review" app ids.',
    "x-stainless-collection-type": "set",
  }),
)

export const ZeroTrustGatewayApprovedApps = named(
  "zero-trust-gateway_approved_apps",
  Type.Array(Type.Integer(), {
    description: 'Defines the list of "approved" app ids.',
    "x-stainless-collection-type": "set",
  }),
)

export const ZeroTrustGatewayAppReviewResponseContent = named(
  "zero-trust-gateway_app_review_response_content",
  Type.Object({
    result: Type.Optional(
      Type.Object({
        approved_apps: Type.Optional(ZeroTrustGatewayApprovedApps),
        created_at: Type.Optional(Web3Timestamp),
        in_review_apps: Type.Optional(ZeroTrustGatewayInReviewApps),
        unapproved_apps: Type.Optional(ZeroTrustGatewayUnapprovedApps),
        updated_at: Type.Optional(Web3Timestamp),
      }),
    ),
  }),
)

export const ZeroTrustGatewayAppReviewResponse = named(
  "zero-trust-gateway_app_review_response",
  Type.Object(
    {
      errors: D1Messages,
      messages: D1Messages,
      success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
      result: Type.Optional(Type.Unknown()),
    },
    { "x-auditable": true },
  ),
)

export const ZeroTrustGatewayComponentsSchemasIdentifier = named(
  "zero-trust-gateway_components-schemas-identifier",
  Type.String({ description: "Provide the identifier string.", maxLength: 32, "x-auditable": true }),
)

export const ZeroTrustGatewayAppTypeId = named(
  "zero-trust-gateway_app_type_id",
  Type.Integer({
    description:
      "Identify the type of this application. Multiple applications can share the same type. Refers to the `id` of a returned application type.",
    "x-auditable": true,
  }),
)

export const ZeroTrustGatewayAppId = named(
  "zero-trust-gateway_app_id",
  Type.Integer({ description: "Identify this application. Only one application per ID.", "x-auditable": true }),
)

export const ZeroTrustGatewayAppTypesComponentsSchemasName = named(
  "zero-trust-gateway_app-types_components-schemas-name",
  Type.String({ description: "Specify the name of the application or application type.", "x-auditable": true }),
)

export const ZeroTrustGatewayApplication = named(
  "zero-trust-gateway_application",
  Type.Object({
    application_type_id: Type.Optional(ZeroTrustGatewayAppTypeId),
    created_at: Type.Optional(ZeroTrustGatewayTimestamp),
    id: Type.Optional(ZeroTrustGatewayAppId),
    name: Type.Optional(ZeroTrustGatewayAppTypesComponentsSchemasName),
  }),
)

export const ZeroTrustGatewayApplicationType = named(
  "zero-trust-gateway_application_type",
  Type.Object({
    created_at: Type.Optional(ZeroTrustGatewayTimestamp),
    description: Type.Optional(Type.String({ description: "Provide a short summary of applications with this type." })),
    id: Type.Optional(ZeroTrustGatewayAppTypeId),
    name: Type.Optional(ZeroTrustGatewayAppTypesComponentsSchemasName),
  }),
)

export const ZeroTrustGatewayAppTypes = named(
  "zero-trust-gateway_app-types",
  Type.Union([ZeroTrustGatewayApplication, ZeroTrustGatewayApplicationType]),
)

export const ZeroTrustGatewayAppTypesComponentsSchemasResponseCollection = named(
  "zero-trust-gateway_app-types_components-schemas-response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result_info: Type.Optional(ZeroTrustGatewayResultInfo),
    result: Type.Optional(Type.Array(ZeroTrustGatewayAppTypes)),
  }),
)

export const ZeroTrustGatewayProviderName = named(
  "zero-trust-gateway_provider_name",
  Type.String({ description: "Specify the provider name (usually Cloudflare)." }),
)

export const ZeroTrustGatewayCfAccountId = named(
  "zero-trust-gateway_cf_account_id",
  Type.String({ description: "Specify the Cloudflare account ID.", maxLength: 32 }),
)

export const ZeroTrustGatewayGatewayTag = named(
  "zero-trust-gateway_gateway_tag",
  Type.String({ description: "Specify the gateway internal ID.", maxLength: 32 }),
)

export const ZeroTrustGatewayGatewayAccount = named(
  "zero-trust-gateway_gateway_account",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    success: Type.Union([Type.Literal(true)], { description: "Indicate whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        gateway_tag: Type.Optional(ZeroTrustGatewayGatewayTag),
        id: Type.Optional(ZeroTrustGatewayCfAccountId),
        provider_name: Type.Optional(ZeroTrustGatewayProviderName),
      }),
    ),
  }),
)

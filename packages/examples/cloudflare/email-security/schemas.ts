import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const EmailSecurityDispositionlabel = named(
  "email-security_DispositionLabel",
  Type.Union([
    Type.Literal("MALICIOUS"),
    Type.Literal("MALICIOUS-BEC"),
    Type.Literal("SUSPICIOUS"),
    Type.Literal("SPOOF"),
    Type.Literal("SPAM"),
    Type.Literal("BULK"),
    Type.Literal("ENCRYPTED"),
    Type.Literal("EXTERNAL"),
    Type.Literal("UNKNOWN"),
    Type.Literal("NONE"),
  ]),
)

export const EmailSecuritySubmission = named(
  "email-security_Submission",
  Type.Object({
    original_disposition: Type.Optional(EmailSecurityDispositionlabel),
    original_edf_hash: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    outcome: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    outcome_disposition: Type.Optional(EmailSecurityDispositionlabel),
    requested_by: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    requested_disposition: Type.Optional(EmailSecurityDispositionlabel),
    requested_ts: Type.String({ format: "date-time" }),
    status: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    subject: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    submission_id: Type.String(),
    type: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  }),
)

export const EmailSecurityTrusteddomainid = named(
  "email-security_TrustedDomainId",
  Type.Integer({ description: "The unique identifier for the trusted domain.", format: "int32", title: "identifier" }),
)

export const EmailSecurityCreatetrusteddomain = named(
  "email-security_CreateTrustedDomain",
  Type.Object({
    comments: Type.Optional(Type.Union([Type.String({ maxLength: 1024, "x-auditable": true }), Type.Null()])),
    is_recent: Type.Boolean({
      description:
        "Select to prevent recently registered domains from triggering a\nSuspicious or Malicious disposition.",
      "x-auditable": true,
    }),
    is_regex: Type.Boolean({ "x-auditable": true }),
    is_similarity: Type.Boolean({
      description:
        "Select for partner or other approved domains that have similar\nspelling to your connected domains. Prevents listed domains from\ntriggering a Spoof disposition.",
      "x-auditable": true,
    }),
    pattern: Type.String({ minLength: 1, maxLength: 1024, "x-auditable": true }),
  }),
)

export const EmailSecurityTrusteddomain = named(
  "email-security_TrustedDomain",
  Type.Object({
    comments: Type.Optional(Type.Union([Type.String({ maxLength: 1024, "x-auditable": true }), Type.Null()])),
    is_recent: Type.Boolean({
      description:
        "Select to prevent recently registered domains from triggering a\nSuspicious or Malicious disposition.",
      "x-auditable": true,
    }),
    is_regex: Type.Boolean({ "x-auditable": true }),
    is_similarity: Type.Boolean({
      description:
        "Select for partner or other approved domains that have similar\nspelling to your connected domains. Prevents listed domains from\ntriggering a Spoof disposition.",
      "x-auditable": true,
    }),
    pattern: Type.String({ minLength: 1, maxLength: 1024, "x-auditable": true }),
    created_at: Type.String({ format: "date-time", readOnly: true, "x-auditable": true }),
    id: Type.Integer({
      description: "The unique identifier for the trusted domain.",
      format: "int32",
      title: "identifier",
    }),
    last_modified: Type.String({ format: "date-time", "x-auditable": true }),
  }),
)

export const EmailSecurityCreatedisplayname = named(
  "email-security_CreateDisplayName",
  Type.Object({
    email: Type.String({ "x-auditable": true }),
    is_email_regex: Type.Boolean({ "x-auditable": true }),
    name: Type.String({ maxLength: 1024, "x-auditable": true }),
  }),
)

export const EmailSecurityDisplayname = named(
  "email-security_DisplayName",
  Type.Object({
    email: Type.String({ "x-auditable": true }),
    is_email_regex: Type.Boolean({ "x-auditable": true }),
    name: Type.String({ maxLength: 1024, "x-auditable": true }),
    comments: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    created_at: Type.String({ format: "date-time", readOnly: true }),
    directory_id: Type.Optional(Type.Union([Type.Integer({ format: "int64" }), Type.Null()])),
    directory_node_id: Type.Optional(Type.Union([Type.Integer({ format: "int64" }), Type.Null()])),
    external_directory_node_id: Type.Optional(Type.Union([Type.String({ deprecated: true }), Type.Null()])),
    id: Type.Integer({ format: "int32", title: "identifier" }),
    last_modified: Type.String({ format: "date-time" }),
    provenance: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  }),
)

export const EmailSecurityScannablefolder = named(
  "email-security_ScannableFolder",
  Type.Union([Type.Literal("AllItems"), Type.Literal("Inbox")]),
)

export const EmailSecurityDeliverymode = named(
  "email-security_DeliveryMode",
  Type.Union([
    Type.Literal("DIRECT"),
    Type.Literal("BCC"),
    Type.Literal("JOURNAL"),
    Type.Literal("API"),
    Type.Literal("RETRO_SCAN"),
  ]),
)

export const EmailSecurityDomain = named(
  "email-security_Domain",
  Type.Object({
    allowed_delivery_modes: Type.Array(EmailSecurityDeliverymode),
    authorization: Type.Optional(
      Type.Object({
        authorized: Type.Boolean(),
        status_message: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        timestamp: Type.String({ format: "date-time" }),
      }),
    ),
    created_at: Type.String({ format: "date-time", readOnly: true }),
    dmarc_status: Type.Optional(Type.Union([Type.Literal("none"), Type.Literal("good"), Type.Literal("invalid")])),
    domain: Type.String(),
    drop_dispositions: Type.Array(EmailSecurityDispositionlabel),
    emails_processed: Type.Optional(
      Type.Union([
        Type.Object({
          timestamp: Type.String({ format: "date-time" }),
          total_emails_processed: Type.Integer({ format: "int32", minimum: 0 }),
          total_emails_processed_previous: Type.Integer({ format: "int32", minimum: 0 }),
        }),
        Type.Null(),
      ]),
    ),
    folder: Type.Optional(EmailSecurityScannablefolder),
    id: Type.Integer({ description: "The unique identifier for the domain.", format: "int32" }),
    inbox_provider: Type.Optional(Type.Union([Type.Literal("Microsoft"), Type.Literal("Google")])),
    integration_id: Type.Optional(Type.Union([Type.String({ format: "uuid" }), Type.Null()])),
    ip_restrictions: Type.Array(Type.String()),
    last_modified: Type.String({ format: "date-time" }),
    lookback_hops: Type.Integer({ format: "int32" }),
    o365_tenant_id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    regions: Type.Array(
      Type.Union([
        Type.Literal("GLOBAL"),
        Type.Literal("AU"),
        Type.Literal("DE"),
        Type.Literal("IN"),
        Type.Literal("US"),
      ]),
    ),
    require_tls_inbound: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    require_tls_outbound: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    spf_status: Type.Optional(
      Type.Union([
        Type.Literal("none"),
        Type.Literal("good"),
        Type.Literal("neutral"),
        Type.Literal("open"),
        Type.Literal("invalid"),
      ]),
    ),
    transport: Type.String(),
  }),
)

export const EmailSecurityPatterntype = named(
  "email-security_PatternType",
  Type.Union([Type.Literal("EMAIL"), Type.Literal("DOMAIN"), Type.Literal("IP"), Type.Literal("UNKNOWN")]),
)

export const EmailSecurityUpdateblockedsender = named(
  "email-security_UpdateBlockedSender",
  Type.Object({
    comments: Type.Optional(Type.Union([Type.String({ "x-auditable": true }), Type.Null()])),
    is_regex: Type.Optional(Type.Union([Type.Boolean({ "x-auditable": true }), Type.Null()])),
    pattern: Type.Optional(Type.Union([Type.String({ minLength: 1, "x-auditable": true }), Type.Null()])),
    pattern_type: Type.Optional(EmailSecurityPatterntype),
  }),
)

export const EmailSecurityBlockedsenderid = named(
  "email-security_BlockedSenderId",
  Type.Integer({ description: "The unique identifier for the allow policy.", format: "int32", title: "identifier" }),
)

export const EmailSecurityCreateblockedsender = named(
  "email-security_CreateBlockedSender",
  Type.Object({
    comments: Type.Optional(Type.Union([Type.String({ maxLength: 1024, "x-auditable": true }), Type.Null()])),
    is_regex: Type.Boolean({ "x-auditable": true }),
    pattern: Type.String({ minLength: 1, maxLength: 1024, "x-auditable": true }),
    pattern_type: EmailSecurityPatterntype,
  }),
)

export const EmailSecurityBlockedsender = named(
  "email-security_BlockedSender",
  Type.Object({
    comments: Type.Optional(Type.Union([Type.String({ maxLength: 1024, "x-auditable": true }), Type.Null()])),
    is_regex: Type.Boolean({ "x-auditable": true }),
    pattern: Type.String({ minLength: 1, maxLength: 1024, "x-auditable": true }),
    pattern_type: EmailSecurityPatterntype,
    created_at: Type.String({ format: "date-time", readOnly: true, "x-auditable": true }),
    id: EmailSecurityBlockedsenderid,
    last_modified: Type.String({ format: "date-time", "x-auditable": true }),
  }),
)

export const EmailSecurityUpdateallowpolicy = named(
  "email-security_UpdateAllowPolicy",
  Type.Object({
    comments: Type.Optional(Type.Union([Type.String({ maxLength: 1024, "x-auditable": true }), Type.Null()])),
    is_acceptable_sender: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            "Messages from this sender will be exempted from Spam, Spoof and Bulk dispositions.\nNote: This will not exempt messages with Malicious or Suspicious dispositions.",
          "x-auditable": true,
        }),
        Type.Null(),
      ]),
    ),
    is_exempt_recipient: Type.Optional(
      Type.Union([
        Type.Boolean({ description: "Messages to this recipient will bypass all detections.", "x-auditable": true }),
        Type.Null(),
      ]),
    ),
    is_regex: Type.Optional(Type.Union([Type.Boolean({ "x-auditable": true }), Type.Null()])),
    is_trusted_sender: Type.Optional(
      Type.Union([
        Type.Boolean({
          description: "Messages from this sender will bypass all detections and link following.",
          "x-auditable": true,
        }),
        Type.Null(),
      ]),
    ),
    pattern: Type.Optional(
      Type.Union([Type.String({ minLength: 1, maxLength: 1024, "x-auditable": true }), Type.Null()]),
    ),
    pattern_type: Type.Optional(EmailSecurityPatterntype),
    verify_sender: Type.Optional(
      Type.Union([
        Type.Boolean({
          description:
            "Enforce DMARC, SPF or DKIM authentication.\nWhen on, Email Security only honors policies that pass authentication.",
          "x-auditable": true,
        }),
        Type.Null(),
      ]),
    ),
  }),
)

export const EmailSecurityAllowpolicyid = named(
  "email-security_AllowPolicyId",
  Type.Integer({ description: "The unique identifier for the allow policy.", format: "int32", title: "identifier" }),
)

export const EmailSecurityCreateallowpolicy = named(
  "email-security_CreateAllowPolicy",
  Type.Object({
    comments: Type.Optional(Type.Union([Type.String({ maxLength: 1024, "x-auditable": true }), Type.Null()])),
    is_acceptable_sender: Type.Boolean({
      description:
        "Messages from this sender will be exempted from Spam, Spoof and Bulk dispositions.\nNote: This will not exempt messages with Malicious or Suspicious dispositions.",
      "x-auditable": true,
    }),
    is_exempt_recipient: Type.Boolean({
      description: "Messages to this recipient will bypass all detections.",
      "x-auditable": true,
    }),
    is_recipient: Type.Optional(Type.Boolean({ deprecated: true, "x-auditable": true })),
    is_regex: Type.Boolean({ "x-auditable": true }),
    is_sender: Type.Optional(Type.Boolean({ deprecated: true, "x-auditable": true })),
    is_spoof: Type.Optional(Type.Boolean({ deprecated: true, "x-auditable": true })),
    is_trusted_sender: Type.Boolean({
      description: "Messages from this sender will bypass all detections and link following.",
      "x-auditable": true,
    }),
    pattern: Type.String({ minLength: 1, maxLength: 1024, "x-auditable": true }),
    pattern_type: EmailSecurityPatterntype,
    verify_sender: Type.Boolean({
      description:
        "Enforce DMARC, SPF or DKIM authentication.\nWhen on, Email Security only honors policies that pass authentication.",
      "x-auditable": true,
    }),
  }),
)

export const EmailSecurityAllowpolicy = named(
  "email-security_AllowPolicy",
  Type.Object({
    comments: Type.Optional(Type.Union([Type.String({ maxLength: 1024, "x-auditable": true }), Type.Null()])),
    is_acceptable_sender: Type.Boolean({
      description:
        "Messages from this sender will be exempted from Spam, Spoof and Bulk dispositions.\nNote: This will not exempt messages with Malicious or Suspicious dispositions.",
      "x-auditable": true,
    }),
    is_exempt_recipient: Type.Boolean({
      description: "Messages to this recipient will bypass all detections.",
      "x-auditable": true,
    }),
    is_recipient: Type.Optional(Type.Boolean({ deprecated: true, "x-auditable": true })),
    is_regex: Type.Boolean({ "x-auditable": true }),
    is_sender: Type.Optional(Type.Boolean({ deprecated: true, "x-auditable": true })),
    is_spoof: Type.Optional(Type.Boolean({ deprecated: true, "x-auditable": true })),
    is_trusted_sender: Type.Boolean({
      description: "Messages from this sender will bypass all detections and link following.",
      "x-auditable": true,
    }),
    pattern: Type.String({ minLength: 1, maxLength: 1024, "x-auditable": true }),
    pattern_type: EmailSecurityPatterntype,
    verify_sender: Type.Boolean({
      description:
        "Enforce DMARC, SPF or DKIM authentication.\nWhen on, Email Security only honors policies that pass authentication.",
      "x-auditable": true,
    }),
    created_at: Type.String({ format: "date-time", readOnly: true, "x-auditable": true }),
    id: EmailSecurityAllowpolicyid,
    last_modified: Type.String({ format: "date-time", "x-auditable": true }),
  }),
)

export const EmailSecurityTraceline = named(
  "email-security_TraceLine",
  Type.Object({
    lineno: Type.Integer({ format: "int64" }),
    message: Type.String(),
    ts: Type.String({ format: "date-time" }),
  }),
)

export const EmailSecurityThreatcategory = named(
  "email-security_ThreatCategory",
  Type.Object({
    description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    id: Type.Integer({ format: "int64" }),
    name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  }),
)

export const EmailSecurityLink = named(
  "email-security_Link",
  Type.Object({
    href: Type.String(),
    text: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  }),
)

export const EmailSecurityMessageheader = named(
  "email-security_MessageHeader",
  Type.Object({
    name: Type.String(),
    value: Type.String(),
  }),
)

export const EmailSecurityAttachment = named(
  "email-security_Attachment",
  Type.Object({
    content_type: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    detection: Type.Optional(EmailSecurityDispositionlabel),
    encrypted: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    size: Type.Integer({ minimum: 0 }),
  }),
)

export const EmailSecurityValidationstatus = named(
  "email-security_ValidationStatus",
  Type.Union([
    Type.Literal("pass"),
    Type.Literal("neutral"),
    Type.Literal("fail"),
    Type.Literal("error"),
    Type.Literal("none"),
  ]),
)

export const EmailSecurityMessagedeliverymode = named(
  "email-security_MessageDeliveryMode",
  Type.Union([
    Type.Literal("DIRECT"),
    Type.Literal("BCC"),
    Type.Literal("JOURNAL"),
    Type.Literal("REVIEW_SUBMISSION"),
    Type.Literal("DMARC_UNVERIFIED"),
    Type.Literal("DMARC_FAILURE_REPORT"),
    Type.Literal("DMARC_AGGREGATE_REPORT"),
    Type.Literal("THREAT_INTEL_SUBMISSION"),
    Type.Literal("SIMULATION_SUBMISSION"),
    Type.Literal("API"),
    Type.Literal("RETRO_SCAN"),
  ]),
)

export const EmailSecurityPostfixid = named(
  "email-security_PostfixId",
  Type.String({ description: "The identifier of the message.", title: "postfix_id" }),
)

export const EmailSecurityReleaseresponse = named(
  "email-security_ReleaseResponse",
  Type.Object({
    delivered: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
    failed: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
    undelivered: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
    postfix_id: EmailSecurityPostfixid,
  }),
)

export const EmailSecurityRetractionresponseitem = named(
  "email-security_RetractionResponseItem",
  Type.Object({
    completed_timestamp: Type.String({ format: "date-time" }),
    destination: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    item_count: Type.Integer({ format: "int32" }),
    message_id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    operation: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    recipient: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    status: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  }),
)

export const EmailSecurityAccountid = named(
  "email-security_AccountId",
  Type.String({ description: "Account Identifier", minLength: 32, maxLength: 32, readOnly: true, title: "account_id" }),
)

export const EmailSecurityResultinfo = named(
  "email-security_ResultInfo",
  Type.Object({
    count: Type.Integer({ description: "Total number of results for the requested service", format: "int32" }),
    page: Type.Integer({ description: "Current page within paginated list of results", format: "int32" }),
    per_page: Type.Integer({ description: "Number of results per page of results", format: "int32" }),
    total_count: Type.Integer({
      description: "Total results available without any search parameters",
      format: "int32",
    }),
  }),
)

export const EmailSecurityMailsearchmessage = named(
  "email-security_MailsearchMessage",
  Type.Object({
    action_log: Type.Unknown(),
    alert_id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    client_recipients: Type.Array(Type.String()),
    delivery_mode: Type.Optional(EmailSecurityMessagedeliverymode),
    detection_reasons: Type.Array(Type.String()),
    edf_hash: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    final_disposition: Type.Optional(EmailSecurityDispositionlabel),
    findings: Type.Optional(
      Type.Array(
        Type.Object({
          detail: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
          value: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        }),
      ),
    ),
    from: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    from_name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    htmltext_structure_hash: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    is_phish_submission: Type.Boolean(),
    is_quarantined: Type.Boolean(),
    message_id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    postfix_id: EmailSecurityPostfixid,
    properties: Type.Object({
      allowlisted_pattern: Type.Optional(Type.String()),
      allowlisted_pattern_type: Type.Optional(
        Type.Union([
          Type.Literal("quarantine_release"),
          Type.Literal("acceptable_sender"),
          Type.Literal("allowed_sender"),
          Type.Literal("allowed_recipient"),
          Type.Literal("domain_similarity"),
          Type.Literal("domain_recency"),
          Type.Literal("managed_acceptable_sender"),
        ]),
      ),
      blocklisted_message: Type.Optional(Type.Boolean()),
      blocklisted_pattern: Type.Optional(Type.String()),
      whitelisted_pattern_type: Type.Optional(
        Type.Union([
          Type.Literal("quarantine_release"),
          Type.Literal("acceptable_sender"),
          Type.Literal("allowed_sender"),
          Type.Literal("allowed_recipient"),
          Type.Literal("domain_similarity"),
          Type.Literal("domain_recency"),
          Type.Literal("managed_acceptable_sender"),
        ]),
      ),
    }),
    sent_date: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    subject: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    threat_categories: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
    to: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
    to_name: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
    ts: Type.String(),
    validation: Type.Optional(
      Type.Object({
        comment: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        dkim: Type.Optional(EmailSecurityValidationstatus),
        dmarc: Type.Optional(EmailSecurityValidationstatus),
        spf: Type.Optional(EmailSecurityValidationstatus),
      }),
    ),
    id: Type.String({ "x-auditable": true }),
  }),
)

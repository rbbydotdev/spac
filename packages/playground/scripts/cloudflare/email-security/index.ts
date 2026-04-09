import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { EmailSecurityMessage, InfraSortingdirection } from "../shared/schemas"
import {
  EmailSecurityAllowpolicy,
  EmailSecurityAllowpolicyid,
  EmailSecurityAttachment,
  EmailSecurityBlockedsender,
  EmailSecurityBlockedsenderid,
  EmailSecurityCreateallowpolicy,
  EmailSecurityCreateblockedsender,
  EmailSecurityCreatedisplayname,
  EmailSecurityCreatetrusteddomain,
  EmailSecurityDeliverymode,
  EmailSecurityDisplayname,
  EmailSecurityDispositionlabel,
  EmailSecurityDomain,
  EmailSecurityLink,
  EmailSecurityMailsearchmessage,
  EmailSecurityMessagedeliverymode,
  EmailSecurityMessageheader,
  EmailSecurityPatterntype,
  EmailSecurityPostfixid,
  EmailSecurityReleaseresponse,
  EmailSecurityResultinfo,
  EmailSecurityRetractionresponseitem,
  EmailSecurityScannablefolder,
  EmailSecuritySubmission,
  EmailSecurityThreatcategory,
  EmailSecurityTraceline,
  EmailSecurityTrusteddomain,
  EmailSecurityTrusteddomainid,
  EmailSecurityUpdateallowpolicy,
  EmailSecurityUpdateblockedsender,
  EmailSecurityValidationstatus,
} from "./schemas"

export function registerEmailSecurity(api: Api) {
  api.assertVersion("3.0.3", "EmailSecurity")

  api.group("/accounts/{account_id}/email-security", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/investigate", {
      query: Type.Object({
        start: Type.Optional(Type.String({ format: "date-time" })),
        end: Type.Optional(Type.String({ format: "date-time" })),
        query: Type.Optional(Type.String()),
        detections_only: Type.Optional(Type.Boolean({ default: true })),
        action_log: Type.Optional(Type.Boolean({ default: true })),
        final_disposition: Type.Optional(
          Type.Union([
            Type.Literal("MALICIOUS"),
            Type.Literal("SUSPICIOUS"),
            Type.Literal("SPOOF"),
            Type.Literal("SPAM"),
            Type.Literal("BULK"),
            Type.Literal("NONE"),
          ]),
        ),
        metric: Type.Optional(Type.String()),
        message_action: Type.Optional(
          Type.Union([Type.Literal("PREVIEW"), Type.Literal("QUARANTINE_RELEASED"), Type.Literal("MOVED")]),
        ),
        recipient: Type.Optional(Type.String()),
        sender: Type.Optional(Type.String()),
        alert_id: Type.Optional(Type.String()),
        domain: Type.Optional(Type.String()),
        message_id: Type.Optional(Type.String()),
        subject: Type.Optional(Type.String()),
        page: Type.Optional(Type.Integer({ format: "int32", default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ format: "int32", default: 20, minimum: 1 })),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Array(EmailSecurityMailsearchmessage),
          result_info: EmailSecurityResultinfo,
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Search email messages")
      .description("Returns information for each email that matches the search parameter(s).")
      .operationId("email_security_investigate")
      .tag("Email Security")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write", "Cloud Email Security: Read"])

    g.post("/investigate/move", {
      body: Type.Object({
        destination: Type.Union([
          Type.Literal("Inbox"),
          Type.Literal("JunkEmail"),
          Type.Literal("DeletedItems"),
          Type.Literal("RecoverableItemsDeletions"),
          Type.Literal("RecoverableItemsPurges"),
        ]),
        postfix_ids: Type.Array(EmailSecurityPostfixid),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Array(EmailSecurityRetractionresponseitem),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Move multiple messages")
      .operationId("email_security_post_bulk_message_move")
      .tag("Email Security")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.post("/investigate/preview", {
      body: Type.Object({
        postfix_id: EmailSecurityPostfixid,
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            screenshot: Type.String({ description: "A base64 encoded PNG image of the email." }),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Preview for non-detection messages")
      .operationId("email_security_post_preview")
      .tag("Email Security")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.post("/investigate/release", {
      body: Type.Array(EmailSecurityPostfixid, {
        description: "A list of messages identfied by their `postfix_id`s that should be released.",
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Array(EmailSecurityReleaseresponse),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Release messages from quarantine")
      .operationId("email_security_post_release")
      .tag("Email Security")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.get("/investigate/{postfix_id}", {
      params: Type.Object({
        postfix_id: Type.String({ description: "The identifier of the message.", title: "postfix_id" }),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
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
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Get message details")
      .operationId("email_security_get_message")
      .tag("Email Security")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write", "Cloud Email Security: Read"])

    g.get("/investigate/{postfix_id}/detections", {
      params: Type.Object({
        postfix_id: Type.String({ description: "The identifier of the message.", title: "postfix_id" }),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            action: Type.String(),
            attachments: Type.Array(EmailSecurityAttachment),
            final_disposition: Type.Optional(EmailSecurityDispositionlabel),
            headers: Type.Array(EmailSecurityMessageheader),
            links: Type.Array(EmailSecurityLink),
            sender_info: Type.Object({
              as_name: Type.Optional(
                Type.Union([Type.String({ description: "The name of the autonomous system." }), Type.Null()]),
              ),
              as_number: Type.Optional(
                Type.Union([
                  Type.Integer({ description: "The number of the autonomous system.", format: "int64" }),
                  Type.Null(),
                ]),
              ),
              geo: Type.Optional(Type.Union([Type.String(), Type.Null()])),
              ip: Type.Optional(Type.Union([Type.String(), Type.Null()])),
              pld: Type.Optional(Type.Union([Type.String(), Type.Null()])),
            }),
            threat_categories: Type.Array(EmailSecurityThreatcategory),
            validation: Type.Object({
              comment: Type.Optional(Type.Union([Type.String(), Type.Null()])),
              dkim: Type.Optional(EmailSecurityValidationstatus),
              dmarc: Type.Optional(EmailSecurityValidationstatus),
              spf: Type.Optional(EmailSecurityValidationstatus),
            }),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Get message detection details")
      .description(
        "Returns detection details such as threat categories and sender information for non-benign messages.",
      )
      .operationId("email_security_get_message_detections")
      .tag("Email Security")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write", "Cloud Email Security: Read"])

    g.post("/investigate/{postfix_id}/move", {
      params: Type.Object({
        postfix_id: Type.String({ description: "The identifier of the message.", title: "postfix_id" }),
      }),
      body: Type.Object({
        destination: Type.Union([
          Type.Literal("Inbox"),
          Type.Literal("JunkEmail"),
          Type.Literal("DeletedItems"),
          Type.Literal("RecoverableItemsDeletions"),
          Type.Literal("RecoverableItemsPurges"),
        ]),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Array(EmailSecurityRetractionresponseitem),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Move a message")
      .operationId("email_security_post_message_move")
      .tag("Email Security")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.get("/investigate/{postfix_id}/preview", {
      params: Type.Object({
        postfix_id: Type.String({ description: "The identifier of the message.", title: "postfix_id" }),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            screenshot: Type.String({ description: "A base64 encoded PNG image of the email." }),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Get email preview")
      .description("Returns a preview of the message body as a base64 encoded PNG image for non-benign messages.")
      .operationId("email_security_get_message_preview")
      .tag("Email Security")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write", "Cloud Email Security: Read"])

    g.get("/investigate/{postfix_id}/raw", {
      params: Type.Object({
        postfix_id: Type.String({ description: "The identifier of the message.", title: "postfix_id" }),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            raw: Type.String({ description: "A UTF-8 encoded eml file of the email." }),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Get raw email content")
      .description("Returns the raw eml of any non-benign message.")
      .operationId("email_security_get_message_raw")
      .tag("Email Security")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write", "Cloud Email Security: Read"])

    g.post("/investigate/{postfix_id}/reclassify", {
      params: Type.Object({
        postfix_id: Type.String({ description: "The identifier of the message.", title: "postfix_id" }),
      }),
      body: Type.Object({
        eml_content: Type.Optional(Type.String({ description: "Base64 encoded content of the EML file" })),
        escalated_submission_id: Type.Optional(Type.String({ "x-auditable": true })),
        expected_disposition: Type.Union([
          Type.Literal("NONE"),
          Type.Literal("BULK"),
          Type.Literal("MALICIOUS"),
          Type.Literal("SPAM"),
          Type.Literal("SPOOF"),
          Type.Literal("SUSPICIOUS"),
        ]),
      }),
    })
      .respond(
        202,
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Unknown(),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Change email classfication")
      .operationId("email_security_post_reclassify")
      .tag("Email Security")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.get("/investigate/{postfix_id}/trace", {
      params: Type.Object({
        postfix_id: Type.String({ description: "The identifier of the message.", title: "postfix_id" }),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            inbound: Type.Object({
              lines: Type.Optional(Type.Union([Type.Array(EmailSecurityTraceline), Type.Null()])),
              pending: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
            }),
            outbound: Type.Object({
              lines: Type.Optional(Type.Union([Type.Array(EmailSecurityTraceline), Type.Null()])),
              pending: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
            }),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Get email trace")
      .operationId("email_security_get_message_trace")
      .tag("Email Security")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write", "Cloud Email Security: Read"])

    g.get("/settings/allow_policies", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ format: "int32", default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ format: "int32", default: 20, minimum: 1 })),
        order: Type.Optional(Type.Union([Type.Literal("pattern"), Type.Literal("created_at")])),
        direction: Type.Optional(InfraSortingdirection),
        search: Type.Optional(Type.String()),
        is_sender: Type.Optional(Type.Boolean()),
        is_trusted_sender: Type.Optional(Type.Boolean()),
        is_recipient: Type.Optional(Type.Boolean()),
        is_exempt_recipient: Type.Optional(Type.Boolean()),
        is_spoof: Type.Optional(Type.Boolean()),
        is_acceptable_sender: Type.Optional(Type.Boolean()),
        verify_sender: Type.Optional(Type.Boolean()),
        pattern_type: Type.Optional(EmailSecurityPatterntype),
        pattern: Type.Optional(Type.String()),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Array(EmailSecurityAllowpolicy),
          result_info: EmailSecurityResultinfo,
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("List email allow policies")
      .description("Lists, searches, and sorts an account’s email allow policies.")
      .operationId("email_security_list_allow_policies")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write", "Cloud Email Security: Read"])

    g.post("/settings/allow_policies", {
      body: EmailSecurityCreateallowpolicy,
    })
      .respond(
        201,
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
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
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Create an email allow policy")
      .operationId("email_security_create_allow_policy")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.post("/settings/allow_policies/batch", {
      body: Type.Object({
        deletes: Type.Array(
          Type.Object({
            id: Type.Integer({
              description: "The unique identifier for the allow policy.",
              format: "int32",
              title: "identifier",
            }),
          }),
        ),
        patches: Type.Array(
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
                Type.Boolean({
                  description: "Messages to this recipient will bypass all detections.",
                  "x-auditable": true,
                }),
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
            id: EmailSecurityAllowpolicyid,
          }),
        ),
        posts: Type.Array(EmailSecurityCreateallowpolicy),
        puts: Type.Array(
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
            id: EmailSecurityAllowpolicyid,
          }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            deletes: Type.Array(
              Type.Object({
                id: Type.Integer({
                  description: "The unique identifier for the allow policy.",
                  format: "int32",
                  title: "identifier",
                }),
              }),
            ),
            patches: Type.Array(EmailSecurityAllowpolicy),
            posts: Type.Array(EmailSecurityAllowpolicy),
            puts: Type.Array(EmailSecurityAllowpolicy),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Batch Allow Policies")
      .description("Send a Batch of Allow Policies API calls to be executed together.")
      .operationId("email_security_batch_allow_policies")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.get("/settings/allow_policies/{policy_id}", {
      params: Type.Object({ policy_id: EmailSecurityAllowpolicyid }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
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
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Get an email allow policy")
      .operationId("email_security_get_allow_policy")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write", "Cloud Email Security: Read"])

    g.patch("/settings/allow_policies/{policy_id}", {
      params: Type.Object({ policy_id: EmailSecurityAllowpolicyid }),
      body: EmailSecurityUpdateallowpolicy,
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
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
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Update an email allow policy")
      .operationId("email_security_update_allow_policy")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.delete("/settings/allow_policies/{policy_id}", {
      params: Type.Object({ policy_id: EmailSecurityAllowpolicyid }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            id: Type.Integer({
              description: "The unique identifier for the allow policy.",
              format: "int32",
              title: "identifier",
            }),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Delete an email allow policy")
      .operationId("email_security_delete_allow_policy")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.get("/settings/block_senders", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ format: "int32", default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ format: "int32", default: 20, minimum: 1 })),
        order: Type.Optional(Type.Union([Type.Literal("pattern"), Type.Literal("created_at")])),
        direction: Type.Optional(InfraSortingdirection),
        search: Type.Optional(Type.String()),
        pattern_type: Type.Optional(EmailSecurityPatterntype),
        pattern: Type.Optional(Type.String()),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Array(EmailSecurityBlockedsender),
          result_info: EmailSecurityResultinfo,
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("List blocked email senders")
      .operationId("email_security_list_blocked_senders")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write", "Cloud Email Security: Read"])

    g.post("/settings/block_senders", {
      body: EmailSecurityCreateblockedsender,
    })
      .respond(
        201,
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            comments: Type.Optional(Type.Union([Type.String({ maxLength: 1024, "x-auditable": true }), Type.Null()])),
            is_regex: Type.Boolean({ "x-auditable": true }),
            pattern: Type.String({ minLength: 1, maxLength: 1024, "x-auditable": true }),
            pattern_type: EmailSecurityPatterntype,
            created_at: Type.String({ format: "date-time", readOnly: true, "x-auditable": true }),
            id: EmailSecurityBlockedsenderid,
            last_modified: Type.String({ format: "date-time", "x-auditable": true }),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Create a blocked email sender")
      .operationId("email_security_create_blocked_sender")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.post("/settings/block_senders/batch", {
      body: Type.Object({
        deletes: Type.Array(
          Type.Object({
            id: Type.Integer({
              description: "The unique identifier for the allow policy.",
              format: "int32",
              title: "identifier",
            }),
          }),
        ),
        patches: Type.Array(
          Type.Object({
            comments: Type.Optional(Type.Union([Type.String({ "x-auditable": true }), Type.Null()])),
            is_regex: Type.Optional(Type.Union([Type.Boolean({ "x-auditable": true }), Type.Null()])),
            pattern: Type.Optional(Type.Union([Type.String({ minLength: 1, "x-auditable": true }), Type.Null()])),
            pattern_type: Type.Optional(EmailSecurityPatterntype),
            id: EmailSecurityBlockedsenderid,
          }),
        ),
        posts: Type.Array(EmailSecurityCreateblockedsender),
        puts: Type.Array(
          Type.Object({
            comments: Type.Optional(Type.Union([Type.String({ maxLength: 1024, "x-auditable": true }), Type.Null()])),
            is_regex: Type.Boolean({ "x-auditable": true }),
            pattern: Type.String({ minLength: 1, maxLength: 1024, "x-auditable": true }),
            pattern_type: EmailSecurityPatterntype,
            id: EmailSecurityBlockedsenderid,
          }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            deletes: Type.Array(
              Type.Object({
                id: Type.Integer({
                  description: "The unique identifier for the allow policy.",
                  format: "int32",
                  title: "identifier",
                }),
              }),
            ),
            patches: Type.Array(EmailSecurityBlockedsender),
            posts: Type.Array(EmailSecurityBlockedsender),
            puts: Type.Array(EmailSecurityBlockedsender),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Batch Block Senders")
      .description("Send a Batch of Block Senders API calls to be executed together.")
      .operationId("email_security_batch_blocked_senders")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.get("/settings/block_senders/{pattern_id}", {
      params: Type.Object({ pattern_id: EmailSecurityBlockedsenderid }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            comments: Type.Optional(Type.Union([Type.String({ maxLength: 1024, "x-auditable": true }), Type.Null()])),
            is_regex: Type.Boolean({ "x-auditable": true }),
            pattern: Type.String({ minLength: 1, maxLength: 1024, "x-auditable": true }),
            pattern_type: EmailSecurityPatterntype,
            created_at: Type.String({ format: "date-time", readOnly: true, "x-auditable": true }),
            id: EmailSecurityBlockedsenderid,
            last_modified: Type.String({ format: "date-time", "x-auditable": true }),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Get a blocked email sender")
      .operationId("email_security_get_blocked_sender")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write", "Cloud Email Security: Read"])

    g.patch("/settings/block_senders/{pattern_id}", {
      params: Type.Object({ pattern_id: EmailSecurityBlockedsenderid }),
      body: EmailSecurityUpdateblockedsender,
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            comments: Type.Optional(Type.Union([Type.String({ maxLength: 1024, "x-auditable": true }), Type.Null()])),
            is_regex: Type.Boolean({ "x-auditable": true }),
            pattern: Type.String({ minLength: 1, maxLength: 1024, "x-auditable": true }),
            pattern_type: EmailSecurityPatterntype,
            created_at: Type.String({ format: "date-time", readOnly: true, "x-auditable": true }),
            id: EmailSecurityBlockedsenderid,
            last_modified: Type.String({ format: "date-time", "x-auditable": true }),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Update a blocked email sender")
      .operationId("email_security_update_blocked_sender")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.delete("/settings/block_senders/{pattern_id}", {
      params: Type.Object({ pattern_id: EmailSecurityBlockedsenderid }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            id: Type.Integer({
              description: "The unique identifier for the allow policy.",
              format: "int32",
              title: "identifier",
            }),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Delete a blocked email sender")
      .operationId("email_security_delete_blocked_sender")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.get("/settings/domains", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ format: "int32", default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ format: "int32", default: 20, minimum: 1 })),
        order: Type.Optional(Type.Union([Type.Literal("domain"), Type.Literal("created_at")])),
        direction: Type.Optional(InfraSortingdirection),
        search: Type.Optional(Type.String()),
        allowed_delivery_mode: Type.Optional(EmailSecurityDeliverymode),
        domain: Type.Optional(Type.Array(Type.String())),
        active_delivery_mode: Type.Optional(EmailSecurityDeliverymode),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Array(EmailSecurityDomain),
          result_info: EmailSecurityResultinfo,
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("List protected email domains")
      .description("Lists, searches, and sorts an account’s email domains.")
      .operationId("email_security_list_domains")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write", "Cloud Email Security: Read"])

    g.delete("/settings/domains", {})
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Array(
            Type.Object({
              id: Type.Integer({ description: "The unique identifier for the domain.", format: "int32" }),
            }),
            { minItems: 1 },
          ),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Unprotect multiple email domains")
      .operationId("email_security_delete_domains")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.get("/settings/domains/{domain_id}", {
      params: Type.Object({
        domain_id: Type.Integer({ description: "The unique identifier for the domain.", format: "int32" }),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            allowed_delivery_modes: Type.Array(EmailSecurityDeliverymode),
            authorization: Type.Optional(
              Type.Object({
                authorized: Type.Boolean(),
                status_message: Type.Optional(Type.Union([Type.String(), Type.Null()])),
                timestamp: Type.String({ format: "date-time" }),
              }),
            ),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            dmarc_status: Type.Optional(
              Type.Union([Type.Literal("none"), Type.Literal("good"), Type.Literal("invalid")]),
            ),
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
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Get an email domain")
      .operationId("email_security_get_domain")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write", "Cloud Email Security: Read"])

    g.patch("/settings/domains/{domain_id}", {
      params: Type.Object({
        domain_id: Type.Integer({ description: "The unique identifier for the domain.", format: "int32" }),
      }),
      body: Type.Object({
        allowed_delivery_modes: Type.Optional(Type.Array(EmailSecurityDeliverymode)),
        domain: Type.Optional(Type.String({ "x-auditable": true })),
        drop_dispositions: Type.Optional(Type.Array(EmailSecurityDispositionlabel)),
        folder: Type.Optional(EmailSecurityScannablefolder),
        integration_id: Type.Optional(Type.String({ format: "uuid", "x-auditable": true })),
        ip_restrictions: Type.Array(Type.String({ "x-auditable": true })),
        lookback_hops: Type.Optional(Type.Integer({ format: "int32", minimum: 1, maximum: 20, "x-auditable": true })),
        regions: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal("GLOBAL"),
              Type.Literal("AU"),
              Type.Literal("DE"),
              Type.Literal("IN"),
              Type.Literal("US"),
            ]),
          ),
        ),
        require_tls_inbound: Type.Optional(Type.Boolean({ "x-auditable": true })),
        require_tls_outbound: Type.Optional(Type.Boolean({ "x-auditable": true })),
        transport: Type.Optional(Type.String({ "x-auditable": true })),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            allowed_delivery_modes: Type.Array(EmailSecurityDeliverymode),
            authorization: Type.Optional(
              Type.Object({
                authorized: Type.Boolean(),
                status_message: Type.Optional(Type.Union([Type.String(), Type.Null()])),
                timestamp: Type.String({ format: "date-time" }),
              }),
            ),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            dmarc_status: Type.Optional(
              Type.Union([Type.Literal("none"), Type.Literal("good"), Type.Literal("invalid")]),
            ),
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
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Update an email domain")
      .operationId("email_security_update_domain")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.delete("/settings/domains/{domain_id}", {
      params: Type.Object({
        domain_id: Type.Integer({ description: "The unique identifier for the domain.", format: "int32" }),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            id: Type.Integer({ description: "The unique identifier for the domain.", format: "int32" }),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Unprotect an email domain")
      .operationId("email_security_delete_domain")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.get("/settings/impersonation_registry", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ format: "int32", default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ format: "int32", default: 20, minimum: 1 })),
        order: Type.Optional(Type.Union([Type.Literal("name"), Type.Literal("email"), Type.Literal("created_at")])),
        direction: Type.Optional(InfraSortingdirection),
        search: Type.Optional(Type.String()),
        provenance: Type.Optional(
          Type.Union([
            Type.Literal("A1S_INTERNAL"),
            Type.Literal("SNOOPY-CASB_OFFICE_365"),
            Type.Literal("SNOOPY-OFFICE_365"),
            Type.Literal("SNOOPY-GOOGLE_DIRECTORY"),
          ]),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Array(EmailSecurityDisplayname),
          result_info: EmailSecurityResultinfo,
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("List entries in impersonation registry")
      .description("Lists, searches, and sorts entries in the impersonation registry.")
      .operationId("email_security_list_display_names")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write", "Cloud Email Security: Read"])

    g.post("/settings/impersonation_registry", {
      body: EmailSecurityCreatedisplayname,
    })
      .respond(
        201,
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
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
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Create an entry in impersonation registry")
      .operationId("email_security_create_display_name")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.get("/settings/impersonation_registry/{display_name_id}", {
      params: Type.Object({ display_name_id: Type.Integer({ format: "int32", title: "identifier" }) }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
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
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Get an entry in impersonation registry")
      .operationId("email_security_get_display_name")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write", "Cloud Email Security: Read"])

    g.patch("/settings/impersonation_registry/{display_name_id}", {
      params: Type.Object({ display_name_id: Type.Integer({ format: "int32", title: "identifier" }) }),
      body: Type.Object({
        email: Type.Optional(Type.Union([Type.String({ "x-auditable": true }), Type.Null()])),
        is_email_regex: Type.Optional(Type.Union([Type.Boolean({ "x-auditable": true }), Type.Null()])),
        name: Type.Optional(Type.Union([Type.String({ maxLength: 1024, "x-auditable": true }), Type.Null()])),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
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
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Update an entry in impersonation registry")
      .operationId("email_security_update_display_name")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.delete("/settings/impersonation_registry/{display_name_id}", {
      params: Type.Object({ display_name_id: Type.Integer({ format: "int32", title: "identifier" }) }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            id: Type.Integer({ format: "int32", title: "identifier" }),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Delete an entry from impersonation registry")
      .operationId("email_security_delete_display_name")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.post("/settings/sending_domain_restrictions/batch", {
      body: Type.Object({
        deletes: Type.Array(
          Type.Object({
            id: Type.Integer({ format: "int32", title: "identifier" }),
          }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            deletes: Type.Array(
              Type.Object({
                id: Type.Integer({ format: "int32", title: "identifier" }),
              }),
            ),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Batch Sending Domain Restrictions")
      .description("Send a Batch of `sending_domain_restrictions` API calls to be executed together.")
      .operationId("email_security_batch_sending_domain_restrictions")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.get("/settings/trusted_domains", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ format: "int32", default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ format: "int32", default: 20, minimum: 1 })),
        order: Type.Optional(Type.Union([Type.Literal("pattern"), Type.Literal("created_at")])),
        direction: Type.Optional(InfraSortingdirection),
        search: Type.Optional(Type.String()),
        is_recent: Type.Optional(Type.Boolean()),
        is_similarity: Type.Optional(Type.Boolean()),
        pattern: Type.Optional(Type.String()),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Array(EmailSecurityTrusteddomain),
          result_info: EmailSecurityResultinfo,
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("List trusted email domains")
      .description("Lists, searches, and sorts an account’s trusted email domains.")
      .operationId("email_security_list_trusted_domains")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write", "Cloud Email Security: Read"])

    g.post("/settings/trusted_domains", {
      body: Type.Union([EmailSecurityCreatetrusteddomain, Type.Array(EmailSecurityCreatetrusteddomain)]),
    })
      .respond(
        201,
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Union([EmailSecurityTrusteddomain, Type.Array(EmailSecurityTrusteddomain)]),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Create a trusted email domain")
      .operationId("email_security_create_trusted_domain")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.post("/settings/trusted_domains/batch", {
      body: Type.Object({
        deletes: Type.Array(
          Type.Object({
            id: Type.Integer({
              description: "The unique identifier for the trusted domain.",
              format: "int32",
              title: "identifier",
            }),
          }),
        ),
        patches: Type.Array(
          Type.Object({
            comments: Type.Optional(Type.String({ maxLength: 1024, "x-auditable": true })),
            is_recent: Type.Optional(
              Type.Boolean({
                description:
                  "Select to prevent recently registered domains from triggering a\nSuspicious or Malicious disposition.",
                "x-auditable": true,
              }),
            ),
            is_regex: Type.Optional(Type.Boolean({ "x-auditable": true })),
            is_similarity: Type.Optional(
              Type.Boolean({
                description:
                  "Select for partner or other approved domains that have similar\nspelling to your connected domains. Prevents listed domains from\ntriggering a Spoof disposition.",
                "x-auditable": true,
              }),
            ),
            pattern: Type.Optional(Type.String({ minLength: 1, maxLength: 1024, "x-auditable": true })),
            id: EmailSecurityTrusteddomainid,
          }),
        ),
        posts: Type.Array(EmailSecurityCreatetrusteddomain),
        puts: Type.Array(
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
            id: EmailSecurityTrusteddomainid,
          }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            deletes: Type.Array(
              Type.Object({
                id: Type.Integer({
                  description: "The unique identifier for the trusted domain.",
                  format: "int32",
                  title: "identifier",
                }),
              }),
            ),
            patches: Type.Array(EmailSecurityTrusteddomain),
            posts: Type.Array(EmailSecurityTrusteddomain),
            puts: Type.Array(EmailSecurityTrusteddomain),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Batch Trusted Domains")
      .description("Send a Batch of Trusted Domains API calls to be executed together.")
      .operationId("email_security_batch_trusted_domains")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.get("/settings/trusted_domains/{trusted_domain_id}", {
      params: Type.Object({ trusted_domain_id: EmailSecurityTrusteddomainid }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
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
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Get a trusted email domain")
      .operationId("email_security_get_trusted_domain")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write", "Cloud Email Security: Read"])

    g.patch("/settings/trusted_domains/{trusted_domain_id}", {
      params: Type.Object({ trusted_domain_id: EmailSecurityTrusteddomainid }),
      body: Type.Object({
        comments: Type.Optional(Type.String({ maxLength: 1024, "x-auditable": true })),
        is_recent: Type.Optional(
          Type.Boolean({
            description:
              "Select to prevent recently registered domains from triggering a\nSuspicious or Malicious disposition.",
            "x-auditable": true,
          }),
        ),
        is_regex: Type.Optional(Type.Boolean({ "x-auditable": true })),
        is_similarity: Type.Optional(
          Type.Boolean({
            description:
              "Select for partner or other approved domains that have similar\nspelling to your connected domains. Prevents listed domains from\ntriggering a Spoof disposition.",
            "x-auditable": true,
          }),
        ),
        pattern: Type.Optional(Type.String({ minLength: 1, maxLength: 1024, "x-auditable": true })),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
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
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Update a trusted email domain")
      .operationId("email_security_update_trusted_domain")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.delete("/settings/trusted_domains/{trusted_domain_id}", {
      params: Type.Object({ trusted_domain_id: EmailSecurityTrusteddomainid }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Object({
            id: Type.Integer({
              description: "The unique identifier for the trusted domain.",
              format: "int32",
              title: "identifier",
            }),
          }),
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Delete a trusted email domain")
      .operationId("email_security_delete_trusted_domain")
      .tag("Email Security Settings")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloud Email Security: Write"])

    g.get("/submissions", {
      query: Type.Object({
        start: Type.Optional(Type.String({ format: "date-time" })),
        end: Type.Optional(Type.String({ format: "date-time" })),
        type: Type.Optional(Type.Union([Type.Literal("TEAM"), Type.Literal("USER")])),
        submission_id: Type.Optional(Type.String()),
        original_disposition: Type.Optional(
          Type.Union([
            Type.Literal("MALICIOUS"),
            Type.Literal("SUSPICIOUS"),
            Type.Literal("SPOOF"),
            Type.Literal("SPAM"),
            Type.Literal("BULK"),
            Type.Literal("NONE"),
          ]),
        ),
        requested_disposition: Type.Optional(
          Type.Union([
            Type.Literal("MALICIOUS"),
            Type.Literal("SUSPICIOUS"),
            Type.Literal("SPOOF"),
            Type.Literal("SPAM"),
            Type.Literal("BULK"),
            Type.Literal("NONE"),
          ]),
        ),
        outcome_disposition: Type.Optional(
          Type.Union([
            Type.Literal("MALICIOUS"),
            Type.Literal("SUSPICIOUS"),
            Type.Literal("SPOOF"),
            Type.Literal("SPAM"),
            Type.Literal("BULK"),
            Type.Literal("NONE"),
          ]),
        ),
        status: Type.Optional(Type.String()),
        query: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        page: Type.Optional(Type.Integer({ format: "int32", default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ format: "int32", default: 20, minimum: 1 })),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          success: Type.Boolean(),
          result: Type.Array(EmailSecuritySubmission),
          result_info: EmailSecurityResultinfo,
        }),
      )
      .error(
        "4XX",
        Type.Object({
          errors: Type.Array(EmailSecurityMessage),
          messages: Type.Array(EmailSecurityMessage),
          result: Type.Union([Type.Unknown(), Type.Null()]),
          success: Type.Boolean(),
        }),
      )
      .summary("Get reclassify submissions")
      .description("This endpoint returns information for submissions to made to reclassify emails.")
      .operationId("email_security_submissions")
      .tag("Email Security")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)
  })
}

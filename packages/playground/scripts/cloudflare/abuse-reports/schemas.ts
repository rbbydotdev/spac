import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const AbuseReportsReporttype = named(
  "abuse-reports_ReportType",
  Type.String({ description: "The abuse report type." }),
)

export const AbuseReportsBadacterror = named(
  "abuse-reports_BadActError",
  Type.String({ description: "Report has invalid type" }),
)

export const AbuseReportsMaxipserror = named(
  "abuse-reports_MaxIPsError",
  Type.String({ description: "Provided value has invalid size" }),
)

export const AbuseReportsBadportsprotocolerror = named(
  "abuse-reports_BadPortsProtocolError",
  Type.String({ description: "Invalid Port and Protocol passed to api" }),
)

export const AbuseReportsBadcommentserror = named(
  "abuse-reports_BadCommentsError",
  Type.String({ description: "Comment maximum length of 2000 characters exceeded" }),
)

export const AbuseReportsBademailerror = named(
  "abuse-reports_BadEmailError",
  Type.String({ description: "Provided email was invalid" }),
)

export const AbuseReportsBadiperror = named(
  "abuse-reports_BadIPError",
  Type.String({ description: "Invalid IP passed to api" }),
)

export const AbuseReportsBadjusterror = named(
  "abuse-reports_BadJustError",
  Type.String({
    description: "Please provide a more detailed description of the infringement between 1 and 5000 characters",
  }),
)

export const AbuseReportsBadnameerror = named(
  "abuse-reports_BadNameError",
  Type.String({ description: "Missing a required field" }),
)

export const AbuseReportsBadurlserror = named(
  "abuse-reports_BadUrlsError",
  Type.String({
    description:
      "Invalid URL (http://example.com/) Invalid URL Scheme (http or https) Missing hostname in url Missing a required field Could not determine encoding of field\n",
  }),
)

export const AbuseReportsDberror = named(
  "abuse-reports_DBError",
  Type.String({
    description:
      "Failed while reading from database Failed while writing to the database This service error will trigger an alert for Cloudflare engineers to investigate the cause resolve it.\n",
  }),
)

export const AbuseReportsDedupeerror = named(
  "abuse-reports_DedupeError",
  Type.String({ description: "You have already submitted this URL in the last 7 days" }),
)

export const AbuseReportsDiffemailerror = named(
  "abuse-reports_DiffEmailError",
  Type.String({ description: "Provided emails did not match" }),
)

export const AbuseReportsEmailerror = named(
  "abuse-reports_EmailError",
  Type.String({ description: "Failed to send confirmation email" }),
)

export const AbuseReportsInternalerror = named(
  "abuse-reports_InternalError",
  Type.String({ description: "Failed to translate email" }),
)

export const AbuseReportsInvalidnotifyerror = named(
  "abuse-reports_InvalidNotifyError",
  Type.String({ description: "Invalid value for notification preference" }),
)

export const AbuseReportsMustnotifyerror = named(
  "abuse-reports_MustNotifyError",
  Type.String({ description: "Please pick one party to notify about this report" }),
)

export const AbuseReportsNoagreeerror = named(
  "abuse-reports_NoAgreeError",
  Type.String({
    description:
      "Must acknowledge that you are bound by 512(f), that you have a good faith belief about the material, and that you have the authority to act",
  }),
)

export const AbuseReportsNooriginalworkerror = named(
  "abuse-reports_NoOriginalWorkError",
  Type.String({ description: "Original Work section must be between 1 and 2000 characters" }),
)

export const AbuseReportsNosigerror = named(
  "abuse-reports_NoSigError",
  Type.String({ description: "Signature must match your name" }),
)

export const AbuseReportsUnexpectedacterror = named(
  "abuse-reports_UnexpectedActError",
  Type.String({ description: "Report has the wrong type" }),
)

export const AbuseReportsUnknownerror = named(
  "abuse-reports_UnknownError",
  Type.String({ description: "An unexpected error occurred" }),
)

export const AbuseReportsUrlnotorangeerror = named(
  "abuse-reports_UrlNotOrangeError",
  Type.String({ description: "A URL contains a domain that is not active on Cloudflare" }),
)

export const AbuseReportsUrlnotvaliderror = named(
  "abuse-reports_UrlNotvalidError",
  Type.String({
    description:
      "You have entered URLs that contain more than 1 unique hostname. A single report may only include 1 unique hostname (i.e, www.example.com). To report URLs related to another hostname (i.e. other.example.com) you'll need to file a separate report.",
  }),
)

export const AbuseReportsErrorcode = named(
  "abuse-reports_ErrorCode",
  Type.Union([
    AbuseReportsBadacterror,
    AbuseReportsMaxipserror,
    AbuseReportsMaxipserror,
    AbuseReportsMaxipserror,
    AbuseReportsMaxipserror,
    AbuseReportsBadportsprotocolerror,
    AbuseReportsMaxipserror,
    AbuseReportsMaxipserror,
    AbuseReportsMaxipserror,
    AbuseReportsBadcommentserror,
    AbuseReportsBademailerror,
    AbuseReportsBadiperror,
    AbuseReportsBadjusterror,
    AbuseReportsBadnameerror,
    AbuseReportsBadurlserror,
    AbuseReportsDberror,
    AbuseReportsDedupeerror,
    AbuseReportsDiffemailerror,
    AbuseReportsEmailerror,
    AbuseReportsInternalerror,
    AbuseReportsInvalidnotifyerror,
    AbuseReportsMustnotifyerror,
    AbuseReportsNoagreeerror,
    AbuseReportsNooriginalworkerror,
    AbuseReportsNosigerror,
    AbuseReportsUnexpectedacterror,
    AbuseReportsUnknownerror,
    AbuseReportsUrlnotorangeerror,
    AbuseReportsUrlnotvaliderror,
  ]),
)

export const AbuseReportsSubmiterrorresponse = named(
  "abuse-reports_SubmitErrorResponse",
  Type.Object({
    error_code: AbuseReportsErrorcode,
    msg: Type.String({ description: "The error message for the error" }),
    request: Type.Object({
      act: AbuseReportsReporttype,
    }),
    result: Type.String({ description: "The result should be 'error' for successful response" }),
  }),
)

export const AbuseReportsSubmitreportresponse = named(
  "abuse-reports_SubmitReportResponse",
  Type.Object({
    abuse_rand: Type.String({ description: "The identifier for the submitted abuse report." }),
    request: Type.Object({
      act: AbuseReportsReporttype,
    }),
    result: Type.String({ description: "The result should be 'success' for successful response" }),
  }),
)

export const AbuseReportsDmcareport = named(
  "abuse-reports_DMCAReport",
  Type.Object({
    act: Type.Union([Type.Literal("abuse_dmca")], { description: "The abuse report type." }),
    comments: Type.Optional(
      Type.String({
        description: "Any additional comments about the infringement not exceeding 2000 characters",
        minLength: 1,
        maxLength: 2000,
      }),
    ),
    company: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
        minLength: 1,
        maxLength: 100,
      }),
    ),
    email: Type.String({
      description:
        "A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
    }),
    email2: Type.String({ description: "Should match the value provided in `email`" }),
    name: Type.String({
      description:
        "Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
      minLength: 1,
      maxLength: 255,
    }),
    reported_country: Type.Optional(
      Type.String({ description: "Text containing 2 characters", minLength: 2, maxLength: 2 }),
    ),
    reported_user_agent: Type.Optional(
      Type.String({ description: "Text not exceeding 255 characters", minLength: 1, maxLength: 255 }),
    ),
    tele: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
        minLength: 1,
        maxLength: 20,
      }),
    ),
    title: Type.Optional(
      Type.String({ description: "Text not exceeding 255 characters", minLength: 1, maxLength: 255 }),
    ),
    urls: Type.String({
      description:
        "A list of valid URLs separated by ‘\\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
    }),
    address1: Type.String({
      description:
        "Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
      minLength: 1,
      maxLength: 100,
    }),
    agent_name: Type.String({
      description:
        "The name of the copyright holder. Text not exceeding 60 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
      minLength: 1,
      maxLength: 60,
    }),
    agree: Type.Union([Type.Literal(1)], {
      description: "Can be `0` for false or `1` for true. Must be value: 1 for DMCA reports",
    }),
    city: Type.String({
      description:
        "Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
      minLength: 1,
      maxLength: 255,
    }),
    country: Type.String({
      description:
        "Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).\n",
      minLength: 1,
      maxLength: 255,
    }),
    host_notification: Type.Union([Type.Literal("send")], {
      description:
        "Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.\n",
    }),
    original_work: Type.String({
      description:
        "Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).\n",
      minLength: 1,
      maxLength: 255,
    }),
    owner_notification: Type.Union([Type.Literal("send")], {
      description:
        "Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.\n",
    }),
    signature: Type.String({
      description:
        "Required for DMCA reports, should be same as Name. An affirmation that all information in the report is true and accurate while agreeing to the policies of Cloudflare's abuse reports",
    }),
    state: Type.String({
      description:
        "Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
      minLength: 1,
      maxLength: 255,
    }),
  }),
)

export const AbuseReportsTrademarkreport = named(
  "abuse-reports_TrademarkReport",
  Type.Object({
    act: Type.Union([Type.Literal("abuse_trademark")], { description: "The abuse report type." }),
    comments: Type.Optional(
      Type.String({
        description: "Any additional comments about the infringement not exceeding 2000 characters",
        minLength: 1,
        maxLength: 2000,
      }),
    ),
    company: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
        minLength: 1,
        maxLength: 100,
      }),
    ),
    email: Type.String({
      description:
        "A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
    }),
    email2: Type.String({ description: "Should match the value provided in `email`" }),
    name: Type.String({
      description:
        "Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
      minLength: 1,
      maxLength: 255,
    }),
    reported_country: Type.Optional(
      Type.String({ description: "Text containing 2 characters", minLength: 2, maxLength: 2 }),
    ),
    reported_user_agent: Type.Optional(
      Type.String({ description: "Text not exceeding 255 characters", minLength: 1, maxLength: 255 }),
    ),
    tele: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
        minLength: 1,
        maxLength: 20,
      }),
    ),
    title: Type.Optional(
      Type.String({ description: "Text not exceeding 255 characters", minLength: 1, maxLength: 255 }),
    ),
    urls: Type.String({
      description:
        "A list of valid URLs separated by ‘\\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
    }),
    host_notification: Type.Union([Type.Literal("send")], {
      description:
        "Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.\n",
    }),
    justification: Type.String({
      description:
        "A detailed description of the infringement, including any necessary access details and the exact steps needed to view the content, not exceeding 5000 characters.\n",
      minLength: 1,
      maxLength: 5000,
    }),
    owner_notification: Type.Union([Type.Literal("send")], {
      description:
        "Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.\n",
    }),
    trademark_number: Type.String({ description: "Text not exceeding 1000 characters", minLength: 1, maxLength: 1000 }),
    trademark_office: Type.String({ description: "Text not exceeding 1000 characters", minLength: 1, maxLength: 1000 }),
    trademark_symbol: Type.String({ description: "Text not exceeding 1000 characters", minLength: 1, maxLength: 1000 }),
  }),
)

export const AbuseReportsGeneralreport = named(
  "abuse-reports_GeneralReport",
  Type.Object({
    act: Type.Union([Type.Literal("abuse_general")], { description: "The abuse report type." }),
    comments: Type.Optional(
      Type.String({
        description: "Any additional comments about the infringement not exceeding 2000 characters",
        minLength: 1,
        maxLength: 2000,
      }),
    ),
    company: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
        minLength: 1,
        maxLength: 100,
      }),
    ),
    email: Type.String({
      description:
        "A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
    }),
    email2: Type.String({ description: "Should match the value provided in `email`" }),
    name: Type.String({
      description:
        "Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
      minLength: 1,
      maxLength: 255,
    }),
    reported_country: Type.Optional(
      Type.String({ description: "Text containing 2 characters", minLength: 2, maxLength: 2 }),
    ),
    reported_user_agent: Type.Optional(
      Type.String({ description: "Text not exceeding 255 characters", minLength: 1, maxLength: 255 }),
    ),
    tele: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
        minLength: 1,
        maxLength: 20,
      }),
    ),
    title: Type.Optional(
      Type.String({ description: "Text not exceeding 255 characters", minLength: 1, maxLength: 255 }),
    ),
    urls: Type.String({
      description:
        "A list of valid URLs separated by ‘\\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
    }),
    destination_ips: Type.Optional(
      Type.String({
        description:
          "A list of IP addresses separated by ‘\\n’ (new line character). The list of destination IPs should not exceed 30 IP addresses. Each one of the IP addresses ought to be unique.",
      }),
    ),
    host_notification: Type.Union([Type.Literal("send"), Type.Literal("send-anon")], {
      description:
        "Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.\n",
    }),
    justification: Type.String({
      description:
        "A detailed description of the infringement, including any necessary access details and the exact steps needed to view the content, not exceeding 5000 characters.\n",
      minLength: 1,
      maxLength: 5000,
    }),
    owner_notification: Type.Union([Type.Literal("send"), Type.Literal("send-anon"), Type.Literal("none")], {
      description:
        "Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.\n",
    }),
    ports_protocols: Type.Optional(
      Type.String({
        description:
          "A comma separated list of ports and protocols e.g. 80/TCP, 22/UDP. The total size of the field should not exceed 2000 characters. Each individual port/protocol should not exceed 100 characters. The list should not have more than 30 unique ports and protocols.",
      }),
    ),
    source_ips: Type.Optional(
      Type.String({
        description:
          "A list of IP addresses separated by ‘\\n’ (new line character). The list of source IPs should not exceed 30 IP addresses. Each one of the IP addresses ought to be unique.",
      }),
    ),
  }),
)

export const AbuseReportsPhishingreport = named(
  "abuse-reports_PhishingReport",
  Type.Object({
    act: Type.Union([Type.Literal("abuse_phishing")], { description: "The abuse report type." }),
    comments: Type.Optional(
      Type.String({
        description: "Any additional comments about the infringement not exceeding 2000 characters",
        minLength: 1,
        maxLength: 2000,
      }),
    ),
    company: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
        minLength: 1,
        maxLength: 100,
      }),
    ),
    email: Type.String({
      description:
        "A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
    }),
    email2: Type.String({ description: "Should match the value provided in `email`" }),
    name: Type.String({
      description:
        "Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
      minLength: 1,
      maxLength: 255,
    }),
    reported_country: Type.Optional(
      Type.String({ description: "Text containing 2 characters", minLength: 2, maxLength: 2 }),
    ),
    reported_user_agent: Type.Optional(
      Type.String({ description: "Text not exceeding 255 characters", minLength: 1, maxLength: 255 }),
    ),
    tele: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
        minLength: 1,
        maxLength: 20,
      }),
    ),
    title: Type.Optional(
      Type.String({ description: "Text not exceeding 255 characters", minLength: 1, maxLength: 255 }),
    ),
    urls: Type.String({
      description:
        "A list of valid URLs separated by ‘\\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
    }),
    host_notification: Type.Union([Type.Literal("send"), Type.Literal("send-anon")], {
      description:
        "Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.\n",
    }),
    justification: Type.String({
      description:
        "A detailed description of the infringement, including any necessary access details and the exact steps needed to view the content, not exceeding 5000 characters.\n",
      minLength: 20,
      maxLength: 5000,
    }),
    original_work: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).\n",
        minLength: 1,
        maxLength: 255,
      }),
    ),
    owner_notification: Type.Union([Type.Literal("send"), Type.Literal("send-anon")], {
      description:
        "Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.\n",
    }),
  }),
)

export const AbuseReportsCsamreport = named(
  "abuse-reports_CSAMReport",
  Type.Object({
    act: Type.Union([Type.Literal("abuse_children")], { description: "The abuse report type." }),
    comments: Type.Optional(
      Type.String({
        description: "Any additional comments about the infringement not exceeding 2000 characters",
        minLength: 1,
        maxLength: 2000,
      }),
    ),
    company: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
        minLength: 1,
        maxLength: 100,
      }),
    ),
    email: Type.String({
      description:
        "A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
    }),
    email2: Type.String({ description: "Should match the value provided in `email`" }),
    name: Type.String({
      description:
        "Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
      minLength: 1,
      maxLength: 255,
    }),
    reported_country: Type.Optional(
      Type.String({ description: "Text containing 2 characters", minLength: 2, maxLength: 2 }),
    ),
    reported_user_agent: Type.Optional(
      Type.String({ description: "Text not exceeding 255 characters", minLength: 1, maxLength: 255 }),
    ),
    tele: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
        minLength: 1,
        maxLength: 20,
      }),
    ),
    title: Type.Optional(
      Type.String({ description: "Text not exceeding 255 characters", minLength: 1, maxLength: 255 }),
    ),
    urls: Type.String({
      description:
        "A list of valid URLs separated by ‘\\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
    }),
    country: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).\n",
        minLength: 1,
        maxLength: 255,
      }),
    ),
    host_notification: Type.Union([Type.Literal("send"), Type.Literal("send-anon")], {
      description:
        "Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.\n",
    }),
    justification: Type.String({
      description:
        "A detailed description of the infringement, including any necessary access details and the exact steps needed to view the content, not exceeding 5000 characters.\n",
      minLength: 1,
      maxLength: 5000,
    }),
    ncmec_notification: Type.Union([Type.Literal("send"), Type.Literal("send-anon")], {
      description:
        "Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.\n",
    }),
    owner_notification: Type.Union([Type.Literal("send"), Type.Literal("send-anon"), Type.Literal("none")], {
      description:
        "Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.\n",
    }),
  }),
)

export const AbuseReportsThreatreport = named(
  "abuse-reports_ThreatReport",
  Type.Object({
    act: Type.Union([Type.Literal("abuse_threat")], { description: "The abuse report type." }),
    comments: Type.Optional(
      Type.String({
        description: "Any additional comments about the infringement not exceeding 2000 characters",
        minLength: 1,
        maxLength: 2000,
      }),
    ),
    company: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
        minLength: 1,
        maxLength: 100,
      }),
    ),
    email: Type.String({
      description:
        "A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
    }),
    email2: Type.String({ description: "Should match the value provided in `email`" }),
    name: Type.String({
      description:
        "Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
      minLength: 1,
      maxLength: 255,
    }),
    reported_country: Type.Optional(
      Type.String({ description: "Text containing 2 characters", minLength: 2, maxLength: 2 }),
    ),
    reported_user_agent: Type.Optional(
      Type.String({ description: "Text not exceeding 255 characters", minLength: 1, maxLength: 255 }),
    ),
    tele: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
        minLength: 1,
        maxLength: 20,
      }),
    ),
    title: Type.Optional(
      Type.String({ description: "Text not exceeding 255 characters", minLength: 1, maxLength: 255 }),
    ),
    urls: Type.String({
      description:
        "A list of valid URLs separated by ‘\\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
    }),
    host_notification: Type.Union([Type.Literal("send"), Type.Literal("send-anon")], {
      description:
        "Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.\n",
    }),
    justification: Type.String({
      description:
        "A detailed description of the infringement, including any necessary access details and the exact steps needed to view the content, not exceeding 5000 characters.\n",
      minLength: 1,
      maxLength: 5000,
    }),
    owner_notification: Type.Union([Type.Literal("send"), Type.Literal("send-anon")], {
      description:
        "Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.\n",
    }),
  }),
)

export const AbuseReportsRegistrarwhoisreport = named(
  "abuse-reports_RegistrarWhoisReport",
  Type.Object({
    act: Type.Union([Type.Literal("abuse_registrar_whois")], { description: "The abuse report type." }),
    comments: Type.Optional(
      Type.String({
        description: "Any additional comments about the infringement not exceeding 2000 characters",
        minLength: 1,
        maxLength: 2000,
      }),
    ),
    company: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
        minLength: 1,
        maxLength: 100,
      }),
    ),
    email: Type.String({
      description:
        "A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
    }),
    email2: Type.String({ description: "Should match the value provided in `email`" }),
    name: Type.String({
      description:
        "Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
      minLength: 1,
      maxLength: 255,
    }),
    reported_country: Type.Optional(
      Type.String({ description: "Text containing 2 characters", minLength: 2, maxLength: 2 }),
    ),
    reported_user_agent: Type.Optional(
      Type.String({ description: "Text not exceeding 255 characters", minLength: 1, maxLength: 255 }),
    ),
    tele: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
        minLength: 1,
        maxLength: 20,
      }),
    ),
    title: Type.Optional(
      Type.String({ description: "Text not exceeding 255 characters", minLength: 1, maxLength: 255 }),
    ),
    urls: Type.String({
      description:
        "A list of valid URLs separated by ‘\\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
    }),
    owner_notification: Type.Union([Type.Literal("send"), Type.Literal("send-anon"), Type.Literal("none")], {
      description:
        "Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.\n",
    }),
  }),
)

export const AbuseReportsNcseireport = named(
  "abuse-reports_NCSEIReport",
  Type.Object({
    act: Type.Union([Type.Literal("abuse_ncsei")], { description: "The abuse report type." }),
    comments: Type.Optional(
      Type.String({
        description: "Any additional comments about the infringement not exceeding 2000 characters",
        minLength: 1,
        maxLength: 2000,
      }),
    ),
    company: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
        minLength: 1,
        maxLength: 100,
      }),
    ),
    email: Type.String({
      description:
        "A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
    }),
    email2: Type.String({ description: "Should match the value provided in `email`" }),
    name: Type.String({
      description:
        "Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
      minLength: 1,
      maxLength: 255,
    }),
    reported_country: Type.Optional(
      Type.String({ description: "Text containing 2 characters", minLength: 2, maxLength: 2 }),
    ),
    reported_user_agent: Type.Optional(
      Type.String({ description: "Text not exceeding 255 characters", minLength: 1, maxLength: 255 }),
    ),
    tele: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
        minLength: 1,
        maxLength: 20,
      }),
    ),
    title: Type.Optional(
      Type.String({ description: "Text not exceeding 255 characters", minLength: 1, maxLength: 255 }),
    ),
    urls: Type.String({
      description:
        "A list of valid URLs separated by ‘\\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).",
    }),
    country: Type.Optional(
      Type.String({
        description:
          "Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).\n",
        minLength: 1,
        maxLength: 255,
      }),
    ),
    host_notification: Type.Union([Type.Literal("send"), Type.Literal("send-anon")], {
      description:
        "Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.\n",
    }),
    ncsei_subject_representation: Type.Boolean({
      description: "If the submitter is the target of NCSEI in the URLs of the abuse report.",
    }),
    owner_notification: Type.Union([Type.Literal("send"), Type.Literal("send-anon"), Type.Literal("none")], {
      description:
        "Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.\n",
    }),
  }),
)

export const AbuseReportsSubmitreportrequest = named(
  "abuse-reports_SubmitReportRequest",
  Type.Union([
    AbuseReportsDmcareport,
    AbuseReportsTrademarkreport,
    AbuseReportsGeneralreport,
    AbuseReportsPhishingreport,
    AbuseReportsCsamreport,
    AbuseReportsThreatreport,
    AbuseReportsRegistrarwhoisreport,
    AbuseReportsNcseireport,
  ]),
)

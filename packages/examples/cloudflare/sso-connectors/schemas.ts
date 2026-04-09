import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, IamCommonComponentsSchemasIdentifier, IamResultInfo } from "../shared/schemas"

export const IamApiResponseCommon = named(
  "iam_api-response-common",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const IamApiResponseSingle = named("iam_api-response-single", IamApiResponseCommon)

export const IamSsoConnectorIdentifier = named("iam_sso_connector_identifier", IamCommonComponentsSchemasIdentifier)

export const IamDnsVerificationCode = named(
  "iam_dns_verification_code",
  Type.String({
    description:
      "DNS verification code. Add this entire string to the DNS TXT record of the email domain to validate ownership.",
  }),
)

export const IamSsoConnectorVerificationInfo = named(
  "iam_sso_connector_verification_info",
  Type.Object({
    code: Type.Optional(IamDnsVerificationCode),
    status: Type.Optional(
      Type.Union(
        [Type.Literal("awaiting"), Type.Literal("pending"), Type.Literal("failed"), Type.Literal("verified")],
        { description: "The status of the verification code from the verification process." },
      ),
    ),
  }),
)

export const IamSsoConnector = named(
  "iam_sso_connector",
  Type.Object({
    created_on: Type.Optional(
      Type.String({
        description: "Timestamp for the creation of the SSO connector",
        format: "date-time",
        readOnly: true,
      }),
    ),
    email_domain: Type.Optional(Type.String()),
    enabled: Type.Optional(Type.Boolean()),
    id: Type.Optional(IamSsoConnectorIdentifier),
    updated_on: Type.Optional(
      Type.String({ description: "Timestamp for the last update of the SSO connector", format: "date-time" }),
    ),
    verification: Type.Optional(IamSsoConnectorVerificationInfo),
  }),
)

export const IamSsoConnectorResponse = named(
  "iam_sso_connector_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(IamSsoConnector),
  }),
)

export const IamSsoConnectorCollectionResponse = named(
  "iam_sso_connector_collection_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IamResultInfo),
    result: Type.Optional(Type.Array(IamSsoConnector)),
  }),
)

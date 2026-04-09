import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, IamAccount, IamAccountType, IamResultInfo } from "../shared/schemas"

export const IamComponentsSchemasAccount = named("iam_components-schemas-account", IamAccount)

export const OrganizationsApiBatchaccountmoveresponse = named(
  "organizations-api_BatchAccountMoveResponse",
  Type.Object({
    statuses: Type.Object({
      message: Type.Optional(Type.String()),
      moved: Type.Boolean(),
      tag: Type.String(),
    }),
  }),
)

export const IamResponseSingleAccount = named(
  "iam_response_single_account",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(IamAccount),
  }),
)

export const IamCreateAccount = named(
  "iam_create-account",
  Type.Object({
    name: Type.String({ description: "Account name" }),
    type: Type.Optional(IamAccountType),
    unit: Type.Optional(
      Type.Object(
        {
          id: Type.Optional(Type.String({ description: "Tenant unit ID", "x-auditable": true })),
        },
        {
          description:
            "information related to the tenant unit, and optionally, an id of the unit to create the account on. see https://developers.cloudflare.com/tenant/how-to/manage-accounts/",
        },
      ),
    ),
  }),
)

export const IamResponseCollectionAccounts = named(
  "iam_response_collection_accounts",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IamResultInfo),
    result: Type.Optional(Type.Array(IamAccount)),
  }),
)

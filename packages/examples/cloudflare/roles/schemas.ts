import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, IamResultInfo, IamRole } from "../shared/schemas"

export const IamSingleRoleResponse = named(
  "iam_single_role_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(IamRole),
  }),
)

export const IamCollectionRoleResponse = named(
  "iam_collection_role_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IamResultInfo),
    result: Type.Optional(Type.Array(IamRole)),
  }),
)

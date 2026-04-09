import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages } from "../shared/schemas"

export const CallsCreated = named(
  "calls_created",
  Type.String({ description: "The date and time the item was created.", format: "date-time" }),
)

export const CallsModified = named(
  "calls_modified",
  Type.String({ description: "The date and time the item was last modified.", format: "date-time" }),
)

export const CallsName = named(
  "calls_name",
  Type.String({
    description: "A short description of Calls app, not shown to end users.",
    default: "",
    "x-auditable": true,
  }),
)

export const CallsIdentifier = named(
  "calls_identifier",
  Type.String({
    description: "A Cloudflare-generated unique identifier for a item.",
    minLength: 32,
    maxLength: 32,
    "x-auditable": true,
  }),
)

export const CallsApp = named(
  "calls_app",
  Type.Object({
    created: Type.Optional(CallsCreated),
    modified: Type.Optional(CallsModified),
    name: Type.Optional(CallsName),
    uid: Type.Optional(CallsIdentifier),
  }),
)

export const CallsTurnKeyResponseSingle = named(
  "calls_turn_key_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(CallsApp),
  }),
)

export const CallsSecret = named(
  "calls_secret",
  Type.String({ description: "Bearer token", minLength: 64, maxLength: 64, "x-sensitive": true }),
)

export const CallsTurnKeyName = named(
  "calls_turn_key_name",
  Type.String({
    description: "A short description of a TURN key, not shown to end users.",
    default: "",
    "x-auditable": true,
  }),
)

export const CallsTurnKeyWithKey = named(
  "calls_turn_key_with_key",
  Type.Object({
    created: Type.Optional(CallsCreated),
    key: Type.Optional(CallsSecret),
    modified: Type.Optional(CallsModified),
    name: Type.Optional(CallsTurnKeyName),
    uid: Type.Optional(CallsIdentifier),
  }),
)

export const CallsTurnKeySingleWithSecret = named(
  "calls_turn_key_single_with_secret",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(CallsTurnKeyWithKey),
  }),
)

export const CallsTurnKeyEditableFields = named(
  "calls_turn_key_editable_fields",
  Type.Object({
    name: Type.Optional(CallsTurnKeyName),
  }),
)

export const CallsTurnKeyCollection = named(
  "calls_turn_key_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(CallsApp)),
  }),
)

export const CallsAppResponseSingle = named(
  "calls_app_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(CallsApp),
  }),
)

export const CallsAppWithSecret = named(
  "calls_app_with_secret",
  Type.Object({
    created: Type.Optional(CallsCreated),
    modified: Type.Optional(CallsModified),
    name: Type.Optional(CallsName),
    secret: Type.Optional(CallsSecret),
    uid: Type.Optional(CallsIdentifier),
  }),
)

export const CallsAppResponseSingleWithSecret = named(
  "calls_app_response_single_with_secret",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(CallsAppWithSecret),
  }),
)

export const CallsAppEditableFields = named(
  "calls_app_editable_fields",
  Type.Object({
    name: Type.Optional(CallsName),
  }),
)

export const CallsApiResponseCommonFailure = named(
  "calls_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const CallsAppResponseCollection = named(
  "calls_app_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(CallsApp)),
  }),
)

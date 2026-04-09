import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages } from "../shared/schemas"

export const SecretsStoreComment = named(
  "secrets-store_comment",
  Type.String({ description: "Freeform text describing the secret", "x-auditable": true }),
)

export const SecretsStoreSecretName = named(
  "secrets-store_secret_name",
  Type.String({ description: "The name of the secret" }),
)

export const SecretsStoreScopes = named(
  "secrets-store_scopes",
  Type.Array(Type.String(), { description: "The list of services that can use this secret." }),
)

export const SecretsStoreDuplicatesecretobject = named(
  "secrets-store_duplicateSecretObject",
  Type.Object({
    comment: Type.Optional(SecretsStoreComment),
    name: SecretsStoreSecretName,
    scopes: SecretsStoreScopes,
  }),
)

export const SecretsStorePatchsecretobject = named(
  "secrets-store_patchSecretObject",
  Type.Object({
    comment: Type.Optional(SecretsStoreComment),
    scopes: Type.Optional(SecretsStoreScopes),
  }),
)

export const SecretsStoreIdentifier = named(
  "secrets-store_identifier",
  Type.String({ description: "Secret identifier tag.", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const SecretsStoreCreated = named(
  "secrets-store_created",
  Type.String({ description: "Whenthe secret was created.", format: "date-time", readOnly: true, "x-auditable": true }),
)

export const SecretsStoreModified = named(
  "secrets-store_modified",
  Type.String({
    description: "When the secret was modified.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const SecretsStoreSecretstatus = named(
  "secrets-store_SecretStatus",
  Type.Union([Type.Literal("pending"), Type.Literal("active"), Type.Literal("deleted")], { "x-auditable": true }),
)

export const SecretsStoreStoreIdentifier = named(
  "secrets-store_store_identifier",
  Type.String({ description: "Store Identifier", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const SecretsStoreSecretobject = named(
  "secrets-store_secretObject",
  Type.Object({
    comment: Type.Optional(SecretsStoreComment),
    created: SecretsStoreCreated,
    id: SecretsStoreIdentifier,
    modified: SecretsStoreModified,
    name: SecretsStoreSecretName,
    status: SecretsStoreSecretstatus,
    store_id: SecretsStoreStoreIdentifier,
  }),
)

export const SecretsStoreSecretResponse = named(
  "secrets-store_secret_response",
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
    result: Type.Optional(SecretsStoreSecretobject),
  }),
)

export const SecretsStoreValue = named(
  "secrets-store_value",
  Type.String({
    description:
      "The value of the secret. Note that this is 'write only' - no API reponse will provide this value, it is only used to create/modify secrets.",
    writeOnly: true,
    "x-sensitive": true,
  }),
)

export const SecretsStoreCreatesecretobject = named(
  "secrets-store_createSecretObject",
  Type.Object({
    comment: Type.Optional(SecretsStoreComment),
    name: SecretsStoreSecretName,
    scopes: SecretsStoreScopes,
    value: SecretsStoreValue,
  }),
)

export const SecretsStoreSecretsResponseCollection = named(
  "secrets-store_secrets_response_collection",
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
    result: Type.Optional(Type.Array(SecretsStoreSecretobject)),
  }),
)

export const SecretsStoreStoreName = named(
  "secrets-store_store_name",
  Type.String({ description: "The name of the store" }),
)

export const SecretsStoreStoreobject = named(
  "secrets-store_storeObject",
  Type.Object({
    created: SecretsStoreCreated,
    id: SecretsStoreStoreIdentifier,
    modified: SecretsStoreModified,
    name: SecretsStoreStoreName,
  }),
)

export const SecretsStoreStoreResponse = named(
  "secrets-store_store_response",
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
    result: Type.Optional(SecretsStoreStoreobject),
  }),
)

export const SecretsStoreCreatestoreobject = named(
  "secrets-store_createStoreObject",
  Type.Object({
    name: SecretsStoreStoreName,
  }),
)

export const SecretsStoreStoresResponseCollection = named(
  "secrets-store_stores_response_collection",
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
    result: Type.Optional(Type.Array(SecretsStoreStoreobject)),
  }),
)

export const SecretsStoreAccountIdentifier = named(
  "secrets-store_account_identifier",
  Type.String({ description: "Account Identifier", maxLength: 32, readOnly: true }),
)

export const SecretsStoreApiResponseCommonFailure = named(
  "secrets-store_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const SecretsStoreQuota = named(
  "secrets-store_quota",
  Type.Number({ description: "The number of secrets the account is entitlted to use", "x-auditable": true }),
)

export const SecretsStoreUsage = named(
  "secrets-store_usage",
  Type.Number({ description: "The number of secrets the account is currently using", "x-auditable": true }),
)

export const SecretsStoreUsagequotaobject = named(
  "secrets-store_usageQuotaObject",
  Type.Object({
    quota: SecretsStoreQuota,
    usage: SecretsStoreUsage,
  }),
)

export const SecretsStoreSecretsusageobject = named(
  "secrets-store_secretsUsageObject",
  Type.Object({
    secrets: SecretsStoreUsagequotaobject,
  }),
)

export const SecretsStoreQuotaResponse = named(
  "secrets-store_quota_response",
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
    result: Type.Optional(SecretsStoreSecretsusageobject),
  }),
)

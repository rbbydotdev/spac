import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { ResponseInfo } from "../shared/schemas"

export const WorkersKvExpirationTtl = named(
  "workers-kv_expiration_ttl",
  Type.Number({ description: "Expires the key after a number of seconds. Must be at least 60.", minimum: 60 }),
)

export const WorkersKvExpiration = named(
  "workers-kv_expiration",
  Type.Number({
    description: "Expires the key at a certain time, measured in number of seconds since the UNIX epoch.",
  }),
)

export const WorkersKvKeyName = named(
  "workers-kv_key_name",
  Type.String({
    description:
      "A key's name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid. Use percent-encoding to define key names as part of a URL.",
    maxLength: 512,
  }),
)

export const WorkersKvAny = named("workers-kv_any", Type.Unknown())

export const WorkersKvListMetadata = named("workers-kv_list_metadata", WorkersKvAny)

export const WorkersKvCursor = named(
  "workers-kv_cursor",
  Type.String({
    description:
      "Opaque token indicating the position from which to continue when requesting the next set of records if the amount of list results was limited by the limit parameter. A valid value for the cursor can be obtained from the cursors object in the result_info structure.",
  }),
)

export const WorkersKvKey = named(
  "workers-kv_key",
  Type.Object(
    {
      expiration: Type.Optional(
        Type.Number({
          description:
            "The time, measured in number of seconds since the UNIX epoch, at which the key will expire. This property is omitted for keys that will not expire.",
        }),
      ),
      metadata: Type.Optional(WorkersKvListMetadata),
      name: WorkersKvKeyName,
    },
    { description: "A name for a value. A value stored under a given key may be retrieved via the same key." },
  ),
)

export const WorkersKvBulkGetResultWithMetadata = named(
  "workers-kv_bulk-get-result-with-metadata",
  Type.Object({
    values: Type.Optional(
      Type.Record(
        Type.String(),
        Type.Union([
          Type.Object({
            expiration: Type.Optional(WorkersKvExpiration),
            metadata: WorkersKvAny,
            value: WorkersKvAny,
          }),
          Type.Null(),
        ]),
      ),
    ),
  }),
)

export const WorkersKvBulkGetResult = named(
  "workers-kv_bulk-get-result",
  Type.Object({
    values: Type.Optional(
      Type.Record(
        Type.String(),
        Type.Union([Type.String(), Type.Number(), Type.Boolean(), Type.Record(Type.String(), Type.Unknown())], {
          description: "The value associated with the key.",
        }),
      ),
    ),
  }),
)

export const WorkersKvKeyNameBulk = named(
  "workers-kv_key_name_bulk",
  Type.String({
    description: "A key's name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid.",
    maxLength: 512,
  }),
)

export const WorkersKvBulkDelete = named("workers-kv_bulk_delete", Type.Array(WorkersKvKeyNameBulk))

export const WorkersKvBulkResult = named(
  "workers-kv_bulk-result",
  Type.Object({
    successful_key_count: Type.Optional(Type.Number({ description: "Number of keys successfully updated." })),
    unsuccessful_keys: Type.Optional(
      Type.Array(Type.String(), {
        description: "Name of the keys that failed to be fully updated. They should be retried.",
      }),
    ),
  }),
)

export const WorkersKvBulkWrite = named(
  "workers-kv_bulk_write",
  Type.Array(
    Type.Object({
      base64: Type.Optional(
        Type.Boolean({
          description:
            "Indicates whether or not the server should base64 decode the value before storing it. Useful for writing values that wouldn't otherwise be valid JSON strings, such as images.",
          default: false,
        }),
      ),
      expiration: Type.Optional(WorkersKvExpiration),
      expiration_ttl: Type.Optional(WorkersKvExpirationTtl),
      key: WorkersKvKeyNameBulk,
      metadata: Type.Optional(WorkersKvListMetadata),
      value: Type.String({
        description: "A UTF-8 encoded string to be stored, up to 25 MiB in length.",
        maxLength: 26214400,
      }),
    }),
  ),
)

export const WorkersKvMessages = named("workers-kv_messages", Type.Array(ResponseInfo, { uniqueItems: true }))

export const WorkersKvApiResponseCommonNoResult = named(
  "workers-kv_api-response-common-no-result",
  Type.Object({
    errors: WorkersKvMessages,
    messages: WorkersKvMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Union([Type.Unknown({ "x-stainless-empty-object": true }), Type.Null()])),
  }),
)

export const WorkersKvNamespaceIdentifier = named(
  "workers-kv_namespace_identifier",
  Type.String({ description: "Namespace identifier tag.", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const WorkersKvNamespaceTitle = named(
  "workers-kv_namespace_title",
  Type.String({ description: "A human-readable string name for a Namespace.", maxLength: 512, "x-auditable": true }),
)

export const WorkersKvCreateRenameNamespaceBody = named(
  "workers-kv_create_rename_namespace_body",
  Type.Object({
    title: WorkersKvNamespaceTitle,
  }),
)

export const WorkersKvApiResponseCommonFailure = named(
  "workers-kv_api-response-common-failure",
  Type.Object({
    errors: WorkersKvMessages,
    messages: WorkersKvMessages,
    result: Type.Union([Type.Unknown({ "x-stainless-empty-object": true }), Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const WorkersKvNamespace = named(
  "workers-kv_namespace",
  Type.Object({
    id: WorkersKvNamespaceIdentifier,
    supports_url_encoding: Type.Optional(
      Type.Boolean({
        description:
          'True if keys written on the URL will be URL-decoded before storing. For example, if set to "true", a key written on the URL as "%3F" will be stored as "?".',
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    title: WorkersKvNamespaceTitle,
  }),
)

import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const UnnamedSchemaRef67c73d4742566cab0909f71b1822e88c = named(
  "unnamed_schema_ref_67c73d4742566cab0909f71b1822e88c",
  Type.Object({
    FAIL: Type.Array(Type.String({ description: "A numeric string." })),
    NONE: Type.Array(Type.String({ description: "A numeric string." })),
    PASS: Type.Array(Type.String({ description: "A numeric string." })),
  }),
)

export const UnnamedSchemaRef853c157ad369010995e35be614e0343f = named(
  "unnamed_schema_ref_853c157ad369010995e35be614e0343f",
  Type.Object({
    FAIL: Type.String({ description: "A numeric string." }),
    NONE: Type.String({ description: "A numeric string." }),
    PASS: Type.String({ description: "A numeric string." }),
  }),
)

export const UnnamedSchemaRef4124a22436f90127c7fa2c4543219752 = named(
  "unnamed_schema_ref_4124a22436f90127c7fa2c4543219752",
  Type.Object({
    clientASN: Type.Integer(),
    clientASName: Type.String(),
    value: Type.String({ description: "A numeric string." }),
  }),
)

export const UnnamedSchemaRefC5858f1f916a921846e0b6159af470a7 = named(
  "unnamed_schema_ref_c5858f1f916a921846e0b6159af470a7",
  Type.Object({
    data_time: Type.String(),
    query_time: Type.String(),
    total_peers: Type.Integer(),
  }),
)

export const UnnamedSchemaRef9002274ed7cb7f3dc567421e31529a3a = named(
  "unnamed_schema_ref_9002274ed7cb7f3dc567421e31529a3a",
  Type.Object({
    IPv4: Type.Array(Type.String({ description: "A numeric string." })),
    IPv6: Type.Array(Type.String({ description: "A numeric string." })),
    timestamps: Type.Array(Type.String({ format: "date-time" })),
  }),
)

export const UnnamedSchemaRef73de8b634bb48667e28a6c6c56080c51 = named(
  "unnamed_schema_ref_73de8b634bb48667e28a6c6c56080c51",
  Type.Object({
    error: Type.String(),
  }),
)

export const UnnamedSchemaRef8b383e904d9fb02521257ef9cc77d297 = named(
  "unnamed_schema_ref_8b383e904d9fb02521257ef9cc77d297",
  Type.Object({
    IPv4: Type.String({ description: "A numeric string." }),
    IPv6: Type.String({ description: "A numeric string." }),
  }),
)

export const UnnamedSchemaRef83a14d589e799bc901b9ccc870251d09 = named(
  "unnamed_schema_ref_83a14d589e799bc901b9ccc870251d09",
  Type.Object({
    clientCountryAlpha2: Type.String(),
    clientCountryName: Type.String(),
    value: Type.String({ description: "A numeric string." }),
  }),
)

export const UnnamedSchemaRef16e559c45a31db5480e21fbe904b2e42 = named(
  "unnamed_schema_ref_16e559c45a31db5480e21fbe904b2e42",
  Type.Object({
    code: Type.String(),
    name: Type.String(),
  }),
)

export const UnnamedSchemaRef7826220e105d84352ba1108d9ed88e55 = named(
  "unnamed_schema_ref_7826220e105d84352ba1108d9ed88e55",
  Type.Object({
    timestamps: Type.Array(Type.String({ format: "date-time" })),
  }),
)

export const UnnamedSchemaRef75bae70cf28e6bcef364b9840db3bdeb = named(
  "unnamed_schema_ref_75bae70cf28e6bcef364b9840db3bdeb",
  Type.Object({
    timestamps: Type.Array(Type.String({ format: "date-time" })),
    values: Type.Array(Type.String({ description: "A numeric string." })),
  }),
)

export const UnnamedSchemaRefBaac9d7da12de53e99142f8ecd3982e5 = named(
  "unnamed_schema_ref_baac9d7da12de53e99142f8ecd3982e5",
  Type.Object({
    endTime: Type.String({ description: "Adjusted end of date range.", format: "date-time" }),
    startTime: Type.String({ description: "Adjusted start of date range.", format: "date-time" }),
  }),
)

export const UnnamedSchemaRefB5f3bd1840490bc487ffef84567807b1 = named(
  "unnamed_schema_ref_b5f3bd1840490bc487ffef84567807b1",
  Type.Object(
    {
      dataSource: Type.String(),
      description: Type.String(),
      endDate: Type.String({ format: "date-time" }),
      eventType: Type.String(),
      isInstantaneous: Type.Boolean({ description: "Whether event is a single point in time or a time range." }),
      linkedUrl: Type.String({ format: "uri" }),
      startDate: Type.String({ format: "date-time" }),
    },
    { description: "Annotation associated with the result (e.g. outage or other type of event)." },
  ),
)

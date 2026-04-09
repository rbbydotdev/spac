import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages } from "../shared/schemas"

export const HyperdriveHyperdriveCachingCommon = named(
  "hyperdrive_hyperdrive-caching-common",
  Type.Object({
    disabled: Type.Optional(
      Type.Boolean({
        description: "Set to true to disable caching of SQL responses. Default is false.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const HyperdriveHyperdriveCachingDisabled = named(
  "hyperdrive_hyperdrive-caching-disabled",
  HyperdriveHyperdriveCachingCommon,
)

export const HyperdriveHyperdriveCachingEnabled = named(
  "hyperdrive_hyperdrive-caching-enabled",
  Type.Object({
    disabled: Type.Optional(
      Type.Boolean({
        description: "Set to true to disable caching of SQL responses. Default is false.",
        "x-auditable": true,
      }),
    ),
    max_age: Type.Optional(
      Type.Integer({
        description:
          "Specify the maximum duration items should persist in the cache. Not returned if set to the default (60).",
        "x-auditable": true,
      }),
    ),
    stale_while_revalidate: Type.Optional(
      Type.Integer({
        description:
          "Specify the number of seconds the cache may serve a stale response. Omitted if set to the default (15).",
        "x-auditable": true,
      }),
    ),
  }),
)

export const HyperdriveHyperdriveCaching = named(
  "hyperdrive_hyperdrive-caching",
  Type.Union([HyperdriveHyperdriveCachingDisabled, HyperdriveHyperdriveCachingEnabled]),
)

export const HyperdriveHyperdriveMtls = named(
  "hyperdrive_hyperdrive-mtls",
  Type.Object({
    ca_certificate_id: Type.Optional(
      Type.String({ description: "Define CA certificate ID obtained after uploading CA cert." }),
    ),
    mtls_certificate_id: Type.Optional(
      Type.String({ description: "Define mTLS certificate ID obtained after uploading client cert." }),
    ),
    sslmode: Type.Optional(
      Type.String({ description: "Set SSL mode to 'require', 'verify-ca', or 'verify-full' to verify the CA." }),
    ),
  }),
)

export const HyperdriveHyperdriveName = named("hyperdrive_hyperdrive-name", Type.String({ "x-auditable": true }))

export const HyperdriveHyperdriveScheme = named(
  "hyperdrive_hyperdrive-scheme",
  Type.Union([Type.Literal("postgres"), Type.Literal("postgresql"), Type.Literal("mysql")], {
    description: "Specifies the URL scheme used to connect to your origin database.",
    "x-auditable": true,
  }),
)

export const HyperdriveHyperdriveDatabase = named(
  "hyperdrive_hyperdrive-database",
  Type.Object({
    database: Type.Optional(Type.String({ description: "Set the name of your origin database.", "x-auditable": true })),
    password: Type.Optional(
      Type.String({
        description:
          "Set the password needed to access your origin database. The API never returns this write-only value.",
        writeOnly: true,
        "x-sensitive": true,
      }),
    ),
    scheme: Type.Optional(HyperdriveHyperdriveScheme),
    user: Type.Optional(Type.String({ description: "Set the user of your origin database.", "x-auditable": true })),
  }),
)

export const HyperdriveInternetOrigin = named(
  "hyperdrive_internet-origin",
  Type.Object({
    host: Type.String({
      description: "Defines the host (hostname or IP) of your origin database.",
      "x-auditable": true,
    }),
    port: Type.Integer({
      description: "Defines the port (default: 5432 for Postgres) of your origin database.",
      "x-auditable": true,
    }),
  }),
)

export const HyperdriveOverAccessOrigin = named(
  "hyperdrive_over-access-origin",
  Type.Object({
    access_client_id: Type.String({
      description: "Defines the Client ID of the Access token to use when connecting to the origin database.",
      "x-auditable": true,
    }),
    access_client_secret: Type.String({
      description:
        "Defines the Client Secret of the Access Token to use when connecting to the origin database. The API never returns this write-only value.",
      writeOnly: true,
      "x-sensitive": true,
    }),
    host: Type.String({
      description: "Defines the host (hostname or IP) of your origin database.",
      "x-auditable": true,
    }),
  }),
)

export const HyperdriveHyperdriveOriginConnectionLimit = named(
  "hyperdrive_hyperdrive-origin-connection-limit",
  Type.Integer({
    description: "The (soft) maximum number of connections the Hyperdrive is allowed to make to the origin database.",
    minimum: 5,
    maximum: 100,
    "x-auditable": true,
  }),
)

export const HyperdriveHyperdriveConfigPatch = named(
  "hyperdrive_hyperdrive-config-patch",
  Type.Object({
    caching: Type.Optional(HyperdriveHyperdriveCaching),
    mtls: Type.Optional(HyperdriveHyperdriveMtls),
    name: Type.Optional(HyperdriveHyperdriveName),
    origin: Type.Optional(
      Type.Union([HyperdriveHyperdriveDatabase, Type.Union([HyperdriveInternetOrigin, HyperdriveOverAccessOrigin])]),
    ),
    origin_connection_limit: Type.Optional(HyperdriveHyperdriveOriginConnectionLimit),
  }),
)

export const HyperdriveIdentifier = named(
  "hyperdrive_identifier",
  Type.String({
    description: "Define configurations using a unique string identifier.",
    maxLength: 32,
    readOnly: true,
    "x-auditable": true,
  }),
)

export const HyperdriveHyperdriveConfig = named(
  "hyperdrive_hyperdrive-config",
  Type.Object({
    caching: Type.Optional(HyperdriveHyperdriveCaching),
    created_on: Type.Optional(
      Type.String({
        description: "Defines the creation time of the Hyperdrive configuration.",
        format: "date-time",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    id: HyperdriveIdentifier,
    modified_on: Type.Optional(
      Type.String({
        description: "Defines the last modified time of the Hyperdrive configuration.",
        format: "date-time",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    mtls: Type.Optional(HyperdriveHyperdriveMtls),
    name: HyperdriveHyperdriveName,
    origin: Type.Union([
      Type.Object({
        database: Type.String({ description: "Set the name of your origin database.", "x-auditable": true }),
        password: Type.String({
          description:
            "Set the password needed to access your origin database. The API never returns this write-only value.",
          writeOnly: true,
          "x-sensitive": true,
        }),
        scheme: HyperdriveHyperdriveScheme,
        user: Type.String({ description: "Set the user of your origin database.", "x-auditable": true }),
        host: Type.String({
          description: "Defines the host (hostname or IP) of your origin database.",
          "x-auditable": true,
        }),
        port: Type.Integer({
          description: "Defines the port (default: 5432 for Postgres) of your origin database.",
          "x-auditable": true,
        }),
      }),
      Type.Object({
        database: Type.String({ description: "Set the name of your origin database.", "x-auditable": true }),
        password: Type.String({
          description:
            "Set the password needed to access your origin database. The API never returns this write-only value.",
          writeOnly: true,
          "x-sensitive": true,
        }),
        scheme: HyperdriveHyperdriveScheme,
        user: Type.String({ description: "Set the user of your origin database.", "x-auditable": true }),
        access_client_id: Type.String({
          description: "Defines the Client ID of the Access token to use when connecting to the origin database.",
          "x-auditable": true,
        }),
        access_client_secret: Type.String({
          description:
            "Defines the Client Secret of the Access Token to use when connecting to the origin database. The API never returns this write-only value.",
          writeOnly: true,
          "x-sensitive": true,
        }),
        host: Type.String({
          description: "Defines the host (hostname or IP) of your origin database.",
          "x-auditable": true,
        }),
      }),
    ]),
    origin_connection_limit: Type.Optional(HyperdriveHyperdriveOriginConnectionLimit),
  }),
)

export const HyperdriveApiResponseCommonFailure = named(
  "hyperdrive_api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Return the status of the API call success." }),
  }),
)

export const HyperdriveHyperdriveConfigResponse = named(
  "hyperdrive_hyperdrive-config-response",
  HyperdriveHyperdriveConfig,
)

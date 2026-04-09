import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"

export const WorkersRoute = named(
  "workers_route",
  Type.Object({
    id: DlsIdentifier,
    pattern: Type.String({
      description:
        "Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).",
      "x-auditable": true,
    }),
    script: Type.Optional(
      Type.String({ description: "Name of the script to run if the route matches.", "x-auditable": true }),
    ),
  }),
)

export const WorkersBindingName = named(
  "workers_binding_name",
  Type.String({ description: "A JavaScript variable name for the binding.", "x-auditable": true }),
)

export const WorkersBindingKindAi = named(
  "workers_binding_kind_ai",
  Type.Object({
    name: WorkersBindingName,
    type: Type.Union([Type.Literal("ai")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindAnalyticsEngine = named(
  "workers_binding_kind_analytics_engine",
  Type.Object({
    dataset: Type.String({ description: "The name of the dataset to bind to.", "x-auditable": true }),
    name: WorkersBindingName,
    type: Type.Union([Type.Literal("analytics_engine")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindAssets = named(
  "workers_binding_kind_assets",
  Type.Object({
    name: WorkersBindingName,
    type: Type.Union([Type.Literal("assets")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindBrowser = named(
  "workers_binding_kind_browser",
  Type.Object({
    name: WorkersBindingName,
    type: Type.Union([Type.Literal("browser")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindD1 = named(
  "workers_binding_kind_d1",
  Type.Object({
    id: Type.String({ description: "Identifier of the D1 database to bind to.", "x-auditable": true }),
    name: WorkersBindingName,
    type: Type.Union([Type.Literal("d1")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindDataBlob = named(
  "workers_binding_kind_data_blob",
  Type.Object({
    name: WorkersBindingName,
    part: Type.String({
      description:
        "The name of the file containing the data content. Only accepted for `service worker syntax` Workers.",
      "x-auditable": true,
    }),
    type: Type.Union([Type.Literal("data_blob")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindDispatchNamespace = named(
  "workers_binding_kind_dispatch_namespace",
  Type.Object({
    name: WorkersBindingName,
    namespace: Type.String({ description: "Namespace to bind to.", "x-auditable": true }),
    outbound: Type.Optional(
      Type.Object(
        {
          params: Type.Optional(
            Type.Array(Type.String({ "x-auditable": true }), {
              description: "Pass information from the Dispatch Worker to the Outbound Worker through the parameters.",
            }),
          ),
          worker: Type.Optional(
            Type.Object(
              {
                environment: Type.Optional(
                  Type.String({ description: "Environment of the outbound worker.", "x-auditable": true }),
                ),
                service: Type.Optional(
                  Type.String({ description: "Name of the outbound worker.", "x-auditable": true }),
                ),
              },
              { description: "Outbound worker." },
            ),
          ),
        },
        { description: "Outbound worker." },
      ),
    ),
    type: Type.Union([Type.Literal("dispatch_namespace")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersNamespaceIdentifier = named(
  "workers_namespace_identifier",
  Type.String({ description: "Namespace identifier tag.", maxLength: 32, "x-auditable": true }),
)

export const WorkersBindingKindDurableObjectNamespace = named(
  "workers_binding_kind_durable_object_namespace",
  Type.Object({
    class_name: Type.Optional(
      Type.String({
        description: "The exported class name of the Durable Object.",
        "x-auditable": true,
        "x-stainless-terraform-configurability": "computed_optional",
      }),
    ),
    environment: Type.Optional(
      Type.String({ description: "The environment of the script_name to bind to.", "x-auditable": true }),
    ),
    name: WorkersBindingName,
    namespace_id: Type.Optional(WorkersNamespaceIdentifier),
    script_name: Type.Optional(
      Type.String({
        description: "The script where the Durable Object is defined, if it is external to this Worker.",
        "x-auditable": true,
        "x-stainless-terraform-configurability": "computed_optional",
      }),
    ),
    type: Type.Union([Type.Literal("durable_object_namespace")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindHyperdrive = named(
  "workers_binding_kind_hyperdrive",
  Type.Object({
    id: Type.String({ description: "Identifier of the Hyperdrive connection to bind to.", "x-auditable": true }),
    name: WorkersBindingName,
    type: Type.Union([Type.Literal("hyperdrive")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindInherit = named(
  "workers_binding_kind_inherit",
  Type.Object({
    name: Type.String({ description: "The name of the inherited binding.", "x-auditable": true }),
    old_name: Type.Optional(
      Type.String({
        description:
          "The old name of the inherited binding. If set, the binding will be renamed from `old_name` to `name` in the new version. If not set, the binding will keep the same name between versions.",
        "x-auditable": true,
      }),
    ),
    type: Type.Union([Type.Literal("inherit")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
    version_id: Type.Optional(
      Type.String({
        description:
          'Identifier for the version to inherit the binding from, which can be the version ID or the literal "latest" to inherit from the latest version. Defaults to inheriting the binding from the latest version.',
        default: "latest",
        "x-auditable": true,
      }),
    ),
  }),
)

export const WorkersBindingKindImages = named(
  "workers_binding_kind_images",
  Type.Object({
    name: WorkersBindingName,
    type: Type.Union([Type.Literal("images")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindJson = named(
  "workers_binding_kind_json",
  Type.Object({
    json: Type.String({ description: "JSON data to use." }),
    name: WorkersBindingName,
    type: Type.Union([Type.Literal("json")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindKvNamespace = named(
  "workers_binding_kind_kv_namespace",
  Type.Object({
    name: WorkersBindingName,
    namespace_id: WorkersNamespaceIdentifier,
    type: Type.Union([Type.Literal("kv_namespace")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindMtlsCertificate = named(
  "workers_binding_kind_mtls_certificate",
  Type.Object({
    certificate_id: Type.String({ description: "Identifier of the certificate to bind to.", "x-auditable": true }),
    name: WorkersBindingName,
    type: Type.Union([Type.Literal("mtls_certificate")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindPlainText = named(
  "workers_binding_kind_plain_text",
  Type.Object({
    name: WorkersBindingName,
    text: Type.String({ description: "The text value to use.", "x-auditable": true }),
    type: Type.Union([Type.Literal("plain_text")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindPipelines = named(
  "workers_binding_kind_pipelines",
  Type.Object({
    name: WorkersBindingName,
    pipeline: Type.String({ description: "Name of the Pipeline to bind to.", "x-auditable": true }),
    type: Type.Union([Type.Literal("pipelines")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindQueue = named(
  "workers_binding_kind_queue",
  Type.Object({
    name: WorkersBindingName,
    queue_name: Type.String({ description: "Name of the Queue to bind to." }),
    type: Type.Union([Type.Literal("queue")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindR2Bucket = named(
  "workers_binding_kind_r2_bucket",
  Type.Object({
    bucket_name: Type.String({ description: "R2 bucket to bind to.", "x-auditable": true }),
    jurisdiction: Type.Optional(
      Type.Union([Type.Literal("eu"), Type.Literal("fedramp")], {
        description:
          "The [jurisdiction](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) of the R2 bucket.",
        "x-auditable": true,
      }),
    ),
    name: WorkersBindingName,
    type: Type.Union([Type.Literal("r2_bucket")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindSecretText = named(
  "workers_binding_kind_secret_text",
  Type.Object({
    name: WorkersBindingName,
    text: Type.String({ description: "The secret value to use.", writeOnly: true, "x-sensitive": true }),
    type: Type.Union([Type.Literal("secret_text")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindSendEmail = named(
  "workers_binding_kind_send_email",
  Type.Object({
    allowed_destination_addresses: Type.Optional(
      Type.Array(Type.String({ format: "email" }), {
        description: "List of allowed destination addresses.",
        "x-auditable": true,
      }),
    ),
    allowed_sender_addresses: Type.Optional(
      Type.Array(Type.String({ format: "email" }), {
        description: "List of allowed sender addresses.",
        "x-auditable": true,
      }),
    ),
    destination_address: Type.Optional(
      Type.String({ description: "Destination address for the email.", format: "email", "x-auditable": true }),
    ),
    name: WorkersBindingName,
    type: Type.Union([Type.Literal("send_email")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindService = named(
  "workers_binding_kind_service",
  Type.Object({
    environment: Type.Optional(
      Type.String({
        description: "Optional environment if the Worker utilizes one.",
        default: "production",
        "x-auditable": true,
      }),
    ),
    name: WorkersBindingName,
    service: Type.String({ description: "Name of Worker to bind to.", "x-auditable": true }),
    type: Type.Union([Type.Literal("service")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindTailConsumer = named(
  "workers_binding_kind_tail_consumer",
  Type.Object({
    name: WorkersBindingName,
    service: Type.String({ description: "Name of Tail Worker to bind to.", "x-auditable": true }),
    type: Type.Union([Type.Literal("tail_consumer")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindTextBlob = named(
  "workers_binding_kind_text_blob",
  Type.Object({
    name: WorkersBindingName,
    part: Type.String({
      description:
        "The name of the file containing the text content. Only accepted for `service worker syntax` Workers.",
      "x-auditable": true,
    }),
    type: Type.Union([Type.Literal("text_blob")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindVectorize = named(
  "workers_binding_kind_vectorize",
  Type.Object({
    index_name: Type.String({ description: "Name of the Vectorize index to bind to.", "x-auditable": true }),
    name: WorkersBindingName,
    type: Type.Union([Type.Literal("vectorize")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindVersionMetadata = named(
  "workers_binding_kind_version_metadata",
  Type.Object({
    name: WorkersBindingName,
    type: Type.Union([Type.Literal("version_metadata")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindSecretsStoreSecret = named(
  "workers_binding_kind_secrets_store_secret",
  Type.Object({
    name: WorkersBindingName,
    secret_name: Type.String({ description: "Name of the secret in the store.", "x-auditable": true }),
    store_id: Type.String({ description: "ID of the store containing the secret.", "x-auditable": true }),
    type: Type.Union([Type.Literal("secrets_store_secret")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingKindSecretKey = named(
  "workers_binding_kind_secret_key",
  Type.Object({
    algorithm: Type.Unknown({
      description:
        "Algorithm-specific key parameters. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#algorithm).",
      "x-auditable": true,
    }),
    format: Type.Union([Type.Literal("raw"), Type.Literal("pkcs8"), Type.Literal("spki"), Type.Literal("jwk")], {
      description:
        "Data format of the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#format).",
      "x-auditable": true,
    }),
    key_base64: Type.Optional(
      Type.String({
        description: 'Base64-encoded key data. Required if `format` is "raw", "pkcs8", or "spki".',
        writeOnly: true,
        "x-sensitive": true,
      }),
    ),
    key_jwk: Type.Optional(
      Type.Unknown({
        description:
          'Key data in [JSON Web Key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#json_web_key) format. Required if `format` is "jwk".',
        "x-sensitive": true,
      }),
    ),
    name: WorkersBindingName,
    type: Type.Union([Type.Literal("secret_key")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
    usages: Type.Array(
      Type.Union([
        Type.Literal("encrypt"),
        Type.Literal("decrypt"),
        Type.Literal("sign"),
        Type.Literal("verify"),
        Type.Literal("deriveKey"),
        Type.Literal("deriveBits"),
        Type.Literal("wrapKey"),
        Type.Literal("unwrapKey"),
      ]),
      {
        description:
          "Allowed operations with the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyUsages).",
        "x-auditable": true,
        "x-stainless-collection-type": "set",
      },
    ),
  }),
)

export const WorkersBindingKindWorkflow = named(
  "workers_binding_kind_workflow",
  Type.Object({
    class_name: Type.Optional(
      Type.String({
        description: "Class name of the Workflow. Should only be provided if the Workflow belongs to this script.",
      }),
    ),
    name: WorkersBindingName,
    script_name: Type.Optional(
      Type.String({
        description: "Script name that contains the Workflow. If not provided, defaults to this script name.",
        "x-auditable": true,
      }),
    ),
    type: Type.Union([Type.Literal("workflow")], { description: "The kind of resource that the binding provides." }),
    workflow_name: Type.String({ description: "Name of the Workflow to bind to." }),
  }),
)

export const WorkersBindingKindWasmModule = named(
  "workers_binding_kind_wasm_module",
  Type.Object({
    name: WorkersBindingName,
    part: Type.String({
      description:
        "The name of the file containing the WebAssembly module content. Only accepted for `service worker syntax` Workers.",
      "x-auditable": true,
    }),
    type: Type.Union([Type.Literal("wasm_module")], {
      description: "The kind of resource that the binding provides.",
      "x-auditable": true,
    }),
  }),
)

export const WorkersBindingItem = named(
  "workers_binding_item",
  Type.Union(
    [
      WorkersBindingKindAi,
      WorkersBindingKindAnalyticsEngine,
      WorkersBindingKindAssets,
      WorkersBindingKindBrowser,
      WorkersBindingKindD1,
      WorkersBindingKindDataBlob,
      WorkersBindingKindDispatchNamespace,
      WorkersBindingKindDurableObjectNamespace,
      WorkersBindingKindHyperdrive,
      WorkersBindingKindInherit,
      WorkersBindingKindImages,
      WorkersBindingKindJson,
      WorkersBindingKindKvNamespace,
      WorkersBindingKindMtlsCertificate,
      WorkersBindingKindPlainText,
      WorkersBindingKindPipelines,
      WorkersBindingKindQueue,
      WorkersBindingKindR2Bucket,
      WorkersBindingKindSecretText,
      WorkersBindingKindSendEmail,
      WorkersBindingKindService,
      WorkersBindingKindTailConsumer,
      WorkersBindingKindTextBlob,
      WorkersBindingKindVectorize,
      WorkersBindingKindVersionMetadata,
      WorkersBindingKindSecretsStoreSecret,
      WorkersBindingKindSecretKey,
      WorkersBindingKindWorkflow,
      WorkersBindingKindWasmModule,
    ],
    { description: "A binding to allow the Worker to communicate with resources." },
  ),
)

export const WorkersBindings = named(
  "workers_bindings",
  Type.Array(WorkersBindingItem, {
    description:
      "List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings.",
  }),
)

export const WorkersCompatibilityDate = named(
  "workers_compatibility_date",
  Type.String({
    description:
      "Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.",
    "x-auditable": true,
  }),
)

export const WorkersCompatibilityFlag = named(
  "workers_compatibility_flag",
  Type.String({
    description: "Flag that enables or disables a specific feature in the Workers runtime.",
    "x-auditable": true,
  }),
)

export const WorkersCompatibilityFlags = named(
  "workers_compatibility_flags",
  Type.Array(WorkersCompatibilityFlag, {
    description:
      "Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`.",
    "x-stainless-collection-type": "set",
  }),
)

export const WorkersSingleStepMigrations = named(
  "workers_single_step_migrations",
  Type.Object(
    {
      new_tag: Type.Optional(
        Type.String({ description: "Tag to set as the latest migration tag.", writeOnly: true, "x-auditable": true }),
      ),
      old_tag: Type.Optional(
        Type.String({
          description:
            "Tag used to verify against the latest migration tag for this Worker. If they don't match, the upload is rejected.",
          writeOnly: true,
          "x-auditable": true,
        }),
      ),
      deleted_classes: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "A list of classes to delete Durable Object namespaces from.",
          writeOnly: true,
        }),
      ),
      new_classes: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "A list of classes to create Durable Object namespaces from.",
          writeOnly: true,
        }),
      ),
      new_sqlite_classes: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "A list of classes to create Durable Object namespaces with SQLite from.",
          writeOnly: true,
        }),
      ),
      renamed_classes: Type.Optional(
        Type.Array(
          Type.Object({
            from: Type.Optional(Type.String({ writeOnly: true, "x-auditable": true })),
            to: Type.Optional(Type.String({ writeOnly: true, "x-auditable": true })),
          }),
          { description: "A list of classes with Durable Object namespaces that were renamed.", writeOnly: true },
        ),
      ),
      transferred_classes: Type.Optional(
        Type.Array(
          Type.Object({
            from: Type.Optional(Type.String({ writeOnly: true, "x-auditable": true })),
            from_script: Type.Optional(Type.String({ writeOnly: true, "x-auditable": true })),
            to: Type.Optional(Type.String({ writeOnly: true, "x-auditable": true })),
          }),
          {
            description:
              "A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.",
            writeOnly: true,
          },
        ),
      ),
    },
    { description: "A single set of migrations to apply." },
  ),
)

export const WorkersMigrationStep = named(
  "workers_migration_step",
  Type.Object({
    deleted_classes: Type.Optional(
      Type.Array(Type.String({ "x-auditable": true }), {
        description: "A list of classes to delete Durable Object namespaces from.",
        writeOnly: true,
      }),
    ),
    new_classes: Type.Optional(
      Type.Array(Type.String({ "x-auditable": true }), {
        description: "A list of classes to create Durable Object namespaces from.",
        writeOnly: true,
      }),
    ),
    new_sqlite_classes: Type.Optional(
      Type.Array(Type.String({ "x-auditable": true }), {
        description: "A list of classes to create Durable Object namespaces with SQLite from.",
        writeOnly: true,
      }),
    ),
    renamed_classes: Type.Optional(
      Type.Array(
        Type.Object({
          from: Type.Optional(Type.String({ writeOnly: true, "x-auditable": true })),
          to: Type.Optional(Type.String({ writeOnly: true, "x-auditable": true })),
        }),
        { description: "A list of classes with Durable Object namespaces that were renamed.", writeOnly: true },
      ),
    ),
    transferred_classes: Type.Optional(
      Type.Array(
        Type.Object({
          from: Type.Optional(Type.String({ writeOnly: true, "x-auditable": true })),
          from_script: Type.Optional(Type.String({ writeOnly: true, "x-auditable": true })),
          to: Type.Optional(Type.String({ writeOnly: true, "x-auditable": true })),
        }),
        {
          description:
            "A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.",
          writeOnly: true,
        },
      ),
    ),
  }),
)

export const WorkersMultipleStepMigrations = named(
  "workers_multiple_step_migrations",
  Type.Object({
    new_tag: Type.Optional(
      Type.String({ description: "Tag to set as the latest migration tag.", writeOnly: true, "x-auditable": true }),
    ),
    old_tag: Type.Optional(
      Type.String({
        description:
          "Tag used to verify against the latest migration tag for this Worker. If they don't match, the upload is rejected.",
        writeOnly: true,
        "x-auditable": true,
      }),
    ),
    steps: Type.Optional(
      Type.Array(WorkersMigrationStep, { description: "Migrations to apply in order.", writeOnly: true }),
    ),
  }),
)

export const WorkersVersion = named(
  "workers_Version",
  Type.Object({
    annotations: Type.Optional(
      Type.Object(
        {
          "workers/message": Type.Optional(
            Type.String({ description: "Human-readable message about the version.", maxLength: 100 }),
          ),
          "workers/tag": Type.Optional(
            Type.String({ description: "User-provided identifier for the version.", maxLength: 25 }),
          ),
          "workers/triggered_by": Type.Optional(
            Type.String({ description: "Operation that triggered the creation of the version.", readOnly: true }),
          ),
        },
        { description: "Metadata about the version." },
      ),
    ),
    assets: Type.Optional(
      Type.Object(
        {
          config: Type.Optional(
            Type.Object(
              {
                html_handling: Type.Optional(
                  Type.Union(
                    [
                      Type.Literal("auto-trailing-slash"),
                      Type.Literal("force-trailing-slash"),
                      Type.Literal("drop-trailing-slash"),
                      Type.Literal("none"),
                    ],
                    { description: "Determines the redirects and rewrites of requests for HTML content." },
                  ),
                ),
                not_found_handling: Type.Optional(
                  Type.Union(
                    [Type.Literal("none"), Type.Literal("404-page"), Type.Literal("single-page-application")],
                    {
                      description:
                        "Determines the response when a request does not match a static asset, and there is no Worker script.",
                    },
                  ),
                ),
                run_worker_first: Type.Optional(
                  Type.Union([
                    Type.Array(Type.String(), {
                      description:
                        "Contains a list path rules to control routing to either the Worker or assets. Glob (*) and negative (!) rules are supported. Rules must start with either '/' or '!/'. At least one non-negative rule must be provided, and negative rules have higher precedence than non-negative rules.",
                    }),
                    Type.Boolean({
                      description:
                        'Enables routing to always invoke the Worker script ahead of all requests. When true, this is equivalent to `["/*"]` in the string array version of this field.',
                    }),
                  ]),
                ),
              },
              { description: "Configuration for assets within a Worker." },
            ),
          ),
          jwt: Type.Optional(
            Type.String({
              description: "Token provided upon successful upload of all files from a registered manifest.",
              "x-sensitive": true,
            }),
          ),
        },
        {
          description:
            "Configuration for assets within a Worker.\n\n[`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and\n[`_redirects`](https://developers.cloudflare.com/workers/static-assets/redirects/) files should be\nincluded as modules named `_headers` and `_redirects` with content type `text/plain`.\n",
        },
      ),
    ),
    bindings: Type.Optional(WorkersBindings),
    compatibility_date: Type.Optional(WorkersCompatibilityDate),
    compatibility_flags: Type.Optional(WorkersCompatibilityFlags),
    created_on: Type.String({ description: "When the version was created.", format: "date-time", readOnly: true }),
    id: Type.String({ description: "Version identifier.", format: "uuid", readOnly: true }),
    limits: Type.Optional(
      Type.Object(
        {
          cpu_ms: Type.Integer({ description: "CPU time limit in milliseconds." }),
        },
        {
          description: "Resource limits enforced at runtime.",
          "x-stainless-terraform-configurability": "computed_optional",
        },
      ),
    ),
    main_module: Type.Optional(
      Type.String({
        description:
          "The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler).",
      }),
    ),
    migrations: Type.Optional(
      Type.Union([WorkersSingleStepMigrations, WorkersMultipleStepMigrations], {
        description:
          "Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed.",
      }),
    ),
    modules: Type.Optional(
      Type.Array(
        Type.Object({
          content_base64: Type.String({ description: "The base64-encoded module content.", format: "byte" }),
          content_type: Type.String({ description: "The content type of the module." }),
          name: Type.String({ description: "The name of the module." }),
        }),
        {
          description:
            "Code, sourcemaps, and other content used at runtime.\n\nThis includes [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and\n[`_redirects`](https://developers.cloudflare.com/workers/static-assets/redirects/) files used to configure \n[Static Assets](https://developers.cloudflare.com/workers/static-assets/). `_headers` and `_redirects` files should be \nincluded as modules named `_headers` and `_redirects` with content type `text/plain`.\n",
          "x-stainless-collection-type": "set",
        },
      ),
    ),
    number: Type.Integer({ description: "The integer version number, starting from one.", readOnly: true }),
    placement: Type.Optional(
      Type.Object(
        {
          mode: Type.Optional(Type.Union([Type.Literal("smart")], { description: "Placement mode for the version." })),
        },
        { description: "Placement settings for the version." },
      ),
    ),
    source: Type.Optional(Type.String({ description: "The client used to create the version.", readOnly: true })),
    usage_model: Type.Optional(
      Type.Union([Type.Literal("standard"), Type.Literal("bundled"), Type.Literal("unbound")], {
        description: "Usage model for the version.",
      }),
    ),
  }),
)

export const WorkersWorker = named(
  "workers_Worker",
  Type.Object({
    created_on: Type.String({ description: "When the Worker was created.", format: "date-time", readOnly: true }),
    id: Type.String({ description: "Immutable ID of the Worker.", readOnly: true }),
    logpush: Type.Boolean({ description: "Whether logpush is enabled for the Worker.", default: false }),
    name: Type.String({ description: "Name of the Worker." }),
    observability: Type.Object(
      {
        enabled: Type.Optional(
          Type.Boolean({ description: "Whether observability is enabled for the Worker.", default: false }),
        ),
        head_sampling_rate: Type.Optional(
          Type.Number({
            description: "The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).",
            default: 1,
          }),
        ),
        logs: Type.Optional(
          Type.Object(
            {
              enabled: Type.Optional(
                Type.Boolean({ description: "Whether logs are enabled for the Worker.", default: false }),
              ),
              head_sampling_rate: Type.Optional(
                Type.Number({
                  description: "The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).",
                  default: 1,
                }),
              ),
              invocation_logs: Type.Optional(
                Type.Boolean({
                  description:
                    "Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.",
                  default: true,
                }),
              ),
            },
            { description: "Log settings for the Worker." },
          ),
        ),
      },
      { description: "Observability settings for the Worker." },
    ),
    subdomain: Type.Object(
      {
        enabled: Type.Optional(
          Type.Boolean({
            description: "Whether the *.workers.dev subdomain is enabled for the Worker.",
            default: false,
          }),
        ),
        previews_enabled: Type.Optional(
          Type.Boolean({
            description:
              "Whether [preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) are enabled for the Worker.",
            default: false,
          }),
        ),
      },
      { description: "Subdomain settings for the Worker." },
    ),
    tags: Type.Array(Type.String({ maxLength: 1024 }), {
      description: "Tags associated with the Worker.",
      maxItems: 8,
      "x-stainless-collection-type": "set",
    }),
    tail_consumers: Type.Array(
      Type.Object({
        name: Type.String({ description: "Name of the consumer Worker." }),
      }),
      { description: "Other Workers that should consume logs from the Worker.", "x-stainless-collection-type": "set" },
    ),
    updated_on: Type.String({
      description: "When the Worker was most recently updated.",
      format: "date-time",
      readOnly: true,
    }),
  }),
)

export const WorkersSchemasSubdomain = named(
  "workers_schemas-subdomain",
  Type.Object({
    subdomain: Type.String(),
  }),
)

export const WorkersEnvironment = named(
  "workers_environment",
  Type.String({ description: "Optional environment if the Worker utilizes one.", "x-auditable": true }),
)

export const WorkersService = named(
  "workers_service",
  Type.String({ description: "Name of Worker to bind to.", "x-auditable": true }),
)

export const WorkersVersionIdentifier = named(
  "workers_version_identifier",
  Type.String({ maxLength: 36, readOnly: true }),
)

export const WorkersVersionItemFull = named(
  "workers_version-item-full",
  Type.Object({
    id: Type.Optional(Type.String({ readOnly: true })),
    metadata: Type.Optional(
      Type.Object({
        author_email: Type.Optional(Type.String({ readOnly: true })),
        author_id: Type.Optional(Type.String({ readOnly: true })),
        created_on: Type.Optional(Type.String({ readOnly: true })),
        hasPreview: Type.Optional(Type.Boolean({ readOnly: true })),
        modified_on: Type.Optional(Type.String({ readOnly: true })),
        source: Type.Optional(
          Type.Union([
            Type.Literal("unknown"),
            Type.Literal("api"),
            Type.Literal("wrangler"),
            Type.Literal("terraform"),
            Type.Literal("dash"),
            Type.Literal("dash_template"),
            Type.Literal("integration"),
            Type.Literal("quick_editor"),
            Type.Literal("playground"),
            Type.Literal("workersci"),
          ]),
        ),
      }),
    ),
    number: Type.Optional(Type.Number({ readOnly: true })),
    resources: Type.Object({
      bindings: Type.Optional(WorkersBindings),
      script: Type.Optional(
        Type.Object({
          etag: Type.Optional(Type.String({ readOnly: true })),
          handlers: Type.Optional(
            Type.Array(Type.String({ readOnly: true }), { readOnly: true, "x-stainless-collection-type": "set" }),
          ),
          last_deployed_from: Type.Optional(Type.String({ readOnly: true })),
          named_handlers: Type.Optional(
            Type.Array(
              Type.Object({
                handlers: Type.Optional(
                  Type.Array(Type.String({ readOnly: true }), { readOnly: true, "x-stainless-collection-type": "set" }),
                ),
                name: Type.Optional(Type.String({ readOnly: true })),
              }),
              { readOnly: true, "x-stainless-collection-type": "set" },
            ),
          ),
        }),
      ),
      script_runtime: Type.Optional(
        Type.Object({
          compatibility_date: Type.Optional(Type.String({ readOnly: true })),
          compatibility_flags: Type.Optional(
            Type.Array(Type.String({ readOnly: true }), { readOnly: true, "x-stainless-collection-type": "set" }),
          ),
          limits: Type.Optional(
            Type.Object({
              cpu_ms: Type.Optional(Type.Integer({ readOnly: true })),
            }),
          ),
          migration_tag: Type.Optional(Type.String({ readOnly: true })),
          usage_model: Type.Optional(
            Type.Union([Type.Literal("bundled"), Type.Literal("unbound"), Type.Literal("standard")]),
          ),
        }),
      ),
    }),
  }),
)

export const WorkersVersionsSingleResponse = named(
  "workers_versions-single-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: WorkersVersionItemFull,
  }),
)

export const WorkersVersionItemUploaded = named(
  "workers_version-item-uploaded",
  Type.Object({
    id: Type.Optional(Type.String({ readOnly: true })),
    metadata: Type.Optional(
      Type.Object({
        author_email: Type.Optional(Type.String({ readOnly: true })),
        author_id: Type.Optional(Type.String({ readOnly: true })),
        created_on: Type.Optional(Type.String({ readOnly: true })),
        hasPreview: Type.Optional(Type.Boolean({ readOnly: true })),
        modified_on: Type.Optional(Type.String({ readOnly: true })),
        source: Type.Optional(
          Type.Union([
            Type.Literal("unknown"),
            Type.Literal("api"),
            Type.Literal("wrangler"),
            Type.Literal("terraform"),
            Type.Literal("dash"),
            Type.Literal("dash_template"),
            Type.Literal("integration"),
            Type.Literal("quick_editor"),
            Type.Literal("playground"),
            Type.Literal("workersci"),
          ]),
        ),
      }),
    ),
    number: Type.Optional(Type.Number({ readOnly: true })),
    resources: Type.Object({
      bindings: Type.Optional(Type.Intersect([WorkersBindings, Type.Unknown()])),
      script: Type.Optional(
        Type.Object({
          etag: Type.Optional(Type.String({ readOnly: true })),
          handlers: Type.Optional(
            Type.Array(Type.String({ readOnly: true }), { readOnly: true, "x-stainless-collection-type": "set" }),
          ),
          last_deployed_from: Type.Optional(Type.String({ readOnly: true })),
          named_handlers: Type.Optional(
            Type.Array(
              Type.Object({
                handlers: Type.Optional(
                  Type.Array(Type.String({ readOnly: true }), { readOnly: true, "x-stainless-collection-type": "set" }),
                ),
                name: Type.Optional(Type.String({ readOnly: true })),
              }),
              { readOnly: true, "x-stainless-collection-type": "set" },
            ),
          ),
        }),
      ),
      script_runtime: Type.Optional(
        Type.Object({
          compatibility_date: Type.Optional(Type.String({ readOnly: true })),
          compatibility_flags: Type.Optional(
            Type.Array(Type.String({ readOnly: true }), { readOnly: true, "x-stainless-collection-type": "set" }),
          ),
          limits: Type.Optional(
            Type.Object({
              cpu_ms: Type.Optional(Type.Integer({ readOnly: true })),
            }),
          ),
          migration_tag: Type.Optional(Type.String({ readOnly: true })),
          usage_model: Type.Optional(
            Type.Union([Type.Literal("bundled"), Type.Literal("unbound"), Type.Literal("standard")]),
          ),
        }),
      ),
    }),
    startup_time_ms: Type.Optional(Type.Integer()),
  }),
)

export const WorkersVersionsUploadResponse = named(
  "workers_versions-upload-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: WorkersVersionItemUploaded,
  }),
)

export const WorkersSchemasScriptName = named(
  "workers_schemas-script_name",
  Type.String({ description: "Name of the script." }),
)

export const WorkersVersionItemShort = named(
  "workers_version-item-short",
  Type.Object({
    id: Type.Optional(Type.String({ readOnly: true })),
    metadata: Type.Optional(
      Type.Object({
        author_email: Type.Optional(Type.String({ readOnly: true })),
        author_id: Type.Optional(Type.String({ readOnly: true })),
        created_on: Type.Optional(Type.String({ readOnly: true })),
        hasPreview: Type.Optional(Type.Boolean({ readOnly: true })),
        modified_on: Type.Optional(Type.String({ readOnly: true })),
        source: Type.Optional(
          Type.Union([
            Type.Literal("unknown"),
            Type.Literal("api"),
            Type.Literal("wrangler"),
            Type.Literal("terraform"),
            Type.Literal("dash"),
            Type.Literal("dash_template"),
            Type.Literal("integration"),
            Type.Literal("quick_editor"),
            Type.Literal("playground"),
            Type.Literal("workersci"),
          ]),
        ),
      }),
    ),
    number: Type.Optional(Type.Number({ readOnly: true })),
  }),
)

export const WorkersVersionsListResponse = named(
  "workers_versions-list-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Object({
      items: Type.Optional(Type.Array(WorkersVersionItemShort)),
    }),
  }),
)

export const WorkersUserLimits = named(
  "workers_user_limits",
  Type.Object(
    {
      cpu_ms: Type.Optional(
        Type.Union([
          Type.Integer({ description: "The amount of CPU time this Worker can use in milliseconds." }),
          Type.Null(),
        ]),
      ),
    },
    { description: "User-defined resource limits for Workers with standard usage model." },
  ),
)

export const WorkersUsageModel = named(
  "workers_usage_model",
  Type.Union([Type.Literal("standard"), Type.Literal("bundled"), Type.Literal("unbound")], {
    description: "Usage model for the Worker invocations.",
    "x-auditable": true,
  }),
)

export const WorkersUsageModelResponse = named(
  "workers_usage-model-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Object({
      usage_model: Type.Optional(WorkersUsageModel),
      user_limits: Type.Optional(WorkersUserLimits),
    }),
  }),
)

export const WorkersTail = named(
  "workers_tail",
  Type.Object({
    expires_at: Type.String({ readOnly: true }),
    id: DlsIdentifier,
    url: Type.String({ readOnly: true }),
  }),
)

export const WorkersSubdomain = named(
  "workers_subdomain",
  Type.Object({
    enabled: Type.Boolean({
      description: "Whether the Worker is available on the workers.dev subdomain.",
      default: false,
      "x-auditable": true,
    }),
    previews_enabled: Type.Boolean({
      description: "Whether the Worker's Preview URLs are available on the workers.dev subdomain.",
      default: false,
      "x-auditable": true,
    }),
  }),
)

export const WorkersLimits = named(
  "workers_limits",
  Type.Object(
    {
      cpu_ms: Type.Optional(
        Type.Integer({
          description: "The amount of CPU time this Worker can use in milliseconds.",
          "x-auditable": true,
        }),
      ),
    },
    { description: "Limits to apply for this Worker." },
  ),
)

export const WorkersLogpush = named(
  "workers_logpush",
  Type.Boolean({ description: "Whether Logpush is turned on for the Worker.", default: false, "x-auditable": true }),
)

export const WorkersObservability = named(
  "workers_observability",
  Type.Object(
    {
      enabled: Type.Boolean({ description: "Whether observability is enabled for the Worker.", "x-auditable": true }),
      head_sampling_rate: Type.Optional(
        Type.Union([
          Type.Number({
            description: "The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.",
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      logs: Type.Optional(
        Type.Object(
          {
            destinations: Type.Optional(
              Type.Array(Type.String(), {
                description: "A list of destinations where logs will be exported to.",
                "x-auditable": true,
              }),
            ),
            enabled: Type.Boolean({ description: "Whether logs are enabled for the Worker.", "x-auditable": true }),
            head_sampling_rate: Type.Optional(
              Type.Union([
                Type.Number({
                  description: "The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.",
                  "x-auditable": true,
                }),
                Type.Null(),
              ]),
            ),
            invocation_logs: Type.Boolean({
              description:
                "Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.",
              "x-auditable": true,
            }),
            persist: Type.Optional(
              Type.Boolean({
                description: "Whether log persistence is enabled for the Worker.",
                default: true,
                "x-auditable": true,
              }),
            ),
          },
          { description: "Log settings for the Worker." },
        ),
      ),
    },
    { description: "Observability settings for the Worker." },
  ),
)

export const WorkersPlacementMode = named(
  "workers_placement_mode",
  Type.Union([Type.Literal("smart")], {
    description: "Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).",
    "x-auditable": true,
  }),
)

export const WorkersPlacementInfoNoStatus = named(
  "workers_placement_info_no_status",
  Type.Object(
    {
      mode: Type.Optional(WorkersPlacementMode),
    },
    {
      description:
        "Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).",
    },
  ),
)

export const WorkersTag = named("workers_tag", Type.String({ maxLength: 1024 }))

export const WorkersTailConsumersScript = named(
  "workers_tail_consumers_script",
  Type.Object(
    {
      environment: Type.Optional(
        Type.String({ description: "Optional environment if the Worker utilizes one.", "x-auditable": true }),
      ),
      namespace: Type.Optional(
        Type.String({ description: "Optional dispatch namespace the script belongs to.", "x-auditable": true }),
      ),
      service: Type.String({ description: "Name of Worker that is to be the consumer.", "x-auditable": true }),
    },
    { description: "A reference to a script that will consume logs from the attached Worker." },
  ),
)

export const WorkersScriptAndVersionSettingsItem = named(
  "workers_script-and-version-settings-item",
  Type.Object({
    bindings: Type.Optional(
      Type.Array(WorkersBindingItem, {
        description:
          "List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings.",
      }),
    ),
    compatibility_date: Type.Optional(WorkersCompatibilityDate),
    compatibility_flags: Type.Optional(
      Type.Array(WorkersCompatibilityFlag, {
        description:
          "Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`.",
        "x-stainless-collection-type": "set",
      }),
    ),
    limits: Type.Optional(WorkersLimits),
    logpush: Type.Optional(WorkersLogpush),
    migrations: Type.Optional(
      Type.Union([WorkersSingleStepMigrations, WorkersMultipleStepMigrations], {
        description: "Migrations to apply for Durable Objects associated with this Worker.\n",
      }),
    ),
    observability: Type.Optional(WorkersObservability),
    placement: Type.Optional(WorkersPlacementInfoNoStatus),
    tags: Type.Optional(
      Type.Array(WorkersTag, {
        description: "Tags associated with the Worker.",
        maxItems: 10,
        "x-auditable": true,
        "x-stainless-collection-type": "set",
      }),
    ),
    tail_consumers: Type.Optional(
      Type.Array(WorkersTailConsumersScript, {
        description: "List of Workers that will consume logs from the attached Worker.",
        "x-stainless-collection-type": "set",
      }),
    ),
    usage_model: Type.Optional(WorkersUsageModel),
  }),
)

export const WorkersScriptAndVersionSettingsResponse = named(
  "workers_script-and-version-settings-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: WorkersScriptAndVersionSettingsItem,
  }),
)

export const WorkersScriptSettingsItem = named(
  "workers_script-settings-item",
  Type.Object({
    logpush: Type.Optional(WorkersLogpush),
    observability: Type.Optional(WorkersObservability),
    tags: Type.Optional(
      Type.Array(WorkersTag, {
        description: "Tags associated with the Worker.",
        maxItems: 10,
        "x-auditable": true,
        "x-stainless-collection-type": "set",
      }),
    ),
    tail_consumers: Type.Optional(
      Type.Union([
        Type.Array(WorkersTailConsumersScript, {
          description: "List of Workers that will consume logs from the attached Worker.",
          "x-stainless-collection-type": "set",
        }),
        Type.Null(),
      ]),
    ),
  }),
)

export const WorkersScriptSettingsResponse = named(
  "workers_script-settings-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: WorkersScriptSettingsItem,
  }),
)

export const WorkersSchedule = named(
  "workers_schedule",
  Type.Object({
    created_on: Type.Optional(Type.String({ readOnly: true, "x-auditable": true })),
    cron: Type.String({ "x-auditable": true }),
    modified_on: Type.Optional(Type.String({ readOnly: true })),
  }),
)

export const WorkersApiResponseCommon = named(
  "workers_api-response-common",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const WorkersDeployment = named(
  "workers_deployment",
  Type.Object({
    annotations: Type.Optional(
      Type.Object({
        "workers/message": Type.Optional(
          Type.String({
            description: "Human-readable message about the deployment. Truncated to 100 bytes.",
            maxLength: 100,
            "x-auditable": true,
          }),
        ),
        "workers/triggered_by": Type.Optional(
          Type.String({ description: "Operation that triggered the creation of the deployment.", readOnly: true }),
        ),
      }),
    ),
    author_email: Type.Optional(Type.String({ format: "email", readOnly: true, "x-auditable": true })),
    created_on: Type.String({ format: "date-time", readOnly: true, "x-auditable": true }),
    id: Type.String({ format: "uuid", readOnly: true, "x-auditable": true }),
    source: Type.String({ readOnly: true, "x-auditable": true }),
    strategy: Type.Union([Type.Literal("percentage")], { "x-auditable": true }),
    versions: Type.Array(
      Type.Object({
        percentage: Type.Number({ minimum: 0.01, maximum: 100, "x-auditable": true }),
        version_id: Type.String({ format: "uuid", "x-auditable": true }),
      }),
      { "x-auditable": true },
    ),
  }),
)

export const WorkersModifiedOn = named(
  "workers_modified_on",
  Type.String({
    description: "When the script was last modified.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const WorkersCreatedOn = named(
  "workers_created_on",
  Type.String({
    description: "When the script was created.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const WorkersEtag = named(
  "workers_etag",
  Type.String({
    description: "Hashed script content, can be used in a If-None-Match header when updating.",
    readOnly: true,
  }),
)

export const WorkersHasAssets = named(
  "workers_has_assets",
  Type.Boolean({ description: "Whether a Worker contains assets.", "x-auditable": true }),
)

export const WorkersHasModules = named(
  "workers_has_modules",
  Type.Boolean({ description: "Whether a Worker contains modules.", "x-auditable": true }),
)

export const WorkersPlacementStatus = named(
  "workers_placement_status",
  Type.Union(
    [Type.Literal("SUCCESS"), Type.Literal("UNSUPPORTED_APPLICATION"), Type.Literal("INSUFFICIENT_INVOCATIONS")],
    {
      description:
        "Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).",
      "x-auditable": true,
    },
  ),
)

export const WorkersPlacementInfo = named(
  "workers_placement_info",
  Type.Object(
    {
      last_analyzed_at: Type.Optional(
        Type.String({
          description:
            "The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).",
          format: "date-time",
          readOnly: true,
        }),
      ),
      mode: Type.Optional(WorkersPlacementMode),
      status: Type.Optional(WorkersPlacementStatus),
    },
    {
      description:
        "Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).",
    },
  ),
)

export const WorkersTailConsumers = named(
  "workers_tail_consumers",
  Type.Array(WorkersTailConsumersScript, {
    description: "List of Workers that will consume logs from the attached Worker.",
    "x-stainless-collection-type": "set",
  }),
)

export const WorkersScriptResponse = named(
  "workers_script-response",
  Type.Object({
    compatibility_date: Type.Optional(WorkersCompatibilityDate),
    compatibility_flags: Type.Optional(WorkersCompatibilityFlags),
    created_on: Type.Optional(WorkersCreatedOn),
    etag: Type.Optional(WorkersEtag),
    handlers: Type.Optional(
      Type.Array(Type.String(), { description: "The names of handlers exported as part of the default export." }),
    ),
    has_assets: Type.Optional(WorkersHasAssets),
    has_modules: Type.Optional(WorkersHasModules),
    id: Type.Optional(
      Type.String({
        description: "The id of the script in the Workers system. Usually the script name.",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    last_deployed_from: Type.Optional(
      Type.String({ description: "The client most recently used to deploy this Worker." }),
    ),
    logpush: Type.Optional(WorkersLogpush),
    migration_tag: Type.Optional(
      Type.String({
        description: "The tag of the Durable Object migration that was most recently applied for this Worker.",
      }),
    ),
    modified_on: Type.Optional(WorkersModifiedOn),
    named_handlers: Type.Optional(
      Type.Array(
        Type.Object({
          handlers: Type.Optional(
            Type.Array(Type.String(), { description: "The names of handlers exported as part of the named export." }),
          ),
          name: Type.Optional(Type.String({ description: "The name of the export." })),
        }),
        { description: "Named exports, such as Durable Object class implementations and named entrypoints." },
      ),
    ),
    placement: Type.Optional(WorkersPlacementInfo),
    placement_mode: Type.Optional(WorkersPlacementMode),
    placement_status: Type.Optional(WorkersPlacementStatus),
    tail_consumers: Type.Optional(WorkersTailConsumers),
    usage_model: Type.Optional(WorkersUsageModel),
  }),
)

export const WorkersScriptResponseCollection = named(
  "workers_script-response-collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Array(WorkersScriptResponse),
  }),
)

export const WorkersObservabilityTelemetryEvent = named(
  "workers-observability_telemetry_event",
  Type.Object(
    {
      $metadata: Type.Object({
        account: Type.Optional(Type.String()),
        cloudService: Type.Optional(Type.String()),
        coldStart: Type.Optional(Type.Integer({ minimum: 0, exclusiveMinimum: true })),
        cost: Type.Optional(Type.Integer({ minimum: 0, exclusiveMinimum: true })),
        duration: Type.Optional(Type.Integer({ minimum: 0, exclusiveMinimum: true })),
        endTime: Type.Optional(Type.Integer({ minimum: 0 })),
        error: Type.Optional(Type.String()),
        errorTemplate: Type.Optional(Type.String()),
        fingerprint: Type.Optional(Type.String()),
        id: Type.String(),
        level: Type.Optional(Type.String()),
        message: Type.Optional(Type.String()),
        messageTemplate: Type.Optional(Type.String()),
        metricName: Type.Optional(Type.String()),
        origin: Type.Optional(Type.String()),
        parentSpanId: Type.Optional(Type.String()),
        provider: Type.Optional(Type.String()),
        region: Type.Optional(Type.String()),
        requestId: Type.Optional(Type.String()),
        service: Type.Optional(Type.String()),
        spanId: Type.Optional(Type.String()),
        spanName: Type.Optional(Type.String()),
        stackId: Type.Optional(Type.String()),
        startTime: Type.Optional(Type.Integer({ minimum: 0 })),
        statusCode: Type.Optional(Type.Integer({ minimum: 0, exclusiveMinimum: true })),
        traceDuration: Type.Optional(Type.Integer({ minimum: 0, exclusiveMinimum: true })),
        traceId: Type.Optional(Type.String()),
        trigger: Type.Optional(Type.String()),
        type: Type.Optional(Type.String()),
        url: Type.Optional(Type.String()),
      }),
      $workers: Type.Optional(
        Type.Union(
          [
            Type.Object({
              entrypoint: Type.Optional(Type.String()),
              event: Type.Optional(
                Type.Record(
                  Type.String(),
                  Type.Union([
                    Type.String(),
                    Type.Number(),
                    Type.Boolean(),
                    Type.Record(
                      Type.String(),
                      Type.Union([
                        Type.String(),
                        Type.Number(),
                        Type.Boolean(),
                        Type.Record(
                          Type.String(),
                          Type.Union([
                            Type.Array(Type.Union([Type.String(), Type.Number(), Type.Boolean()])),
                            Type.String(),
                            Type.Number(),
                            Type.Boolean(),
                          ]),
                        ),
                      ]),
                    ),
                  ]),
                ),
              ),
              eventType: Type.Union([
                Type.Literal("fetch"),
                Type.Literal("scheduled"),
                Type.Literal("alarm"),
                Type.Literal("cron"),
                Type.Literal("queue"),
                Type.Literal("email"),
                Type.Literal("tail"),
                Type.Literal("rpc"),
                Type.Literal("websocket"),
                Type.Literal("unknown"),
              ]),
              executionModel: Type.Optional(Type.Union([Type.Literal("durableObject"), Type.Literal("stateless")])),
              outcome: Type.String(),
              requestId: Type.String(),
              scriptName: Type.String(),
              scriptVersion: Type.Optional(
                Type.Object({
                  id: Type.Optional(Type.String()),
                  message: Type.Optional(Type.String()),
                  tag: Type.Optional(Type.String()),
                }),
              ),
              truncated: Type.Optional(Type.Boolean()),
            }),
            Type.Object({
              cpuTimeMs: Type.Number(),
              diagnosticsChannelEvents: Type.Optional(
                Type.Array(
                  Type.Object({
                    channel: Type.String(),
                    message: Type.String(),
                    timestamp: Type.Number(),
                  }),
                ),
              ),
              dispatchNamespace: Type.Optional(Type.String()),
              entrypoint: Type.Optional(Type.String()),
              event: Type.Optional(
                Type.Record(Type.String(), Type.Union([Type.String(), Type.Number(), Type.Boolean()])),
              ),
              eventType: Type.Union([
                Type.Literal("fetch"),
                Type.Literal("scheduled"),
                Type.Literal("alarm"),
                Type.Literal("cron"),
                Type.Literal("queue"),
                Type.Literal("email"),
                Type.Literal("tail"),
                Type.Literal("rpc"),
                Type.Literal("websocket"),
                Type.Literal("unknown"),
              ]),
              executionModel: Type.Optional(Type.Union([Type.Literal("durableObject"), Type.Literal("stateless")])),
              outcome: Type.String(),
              requestId: Type.String(),
              scriptName: Type.String(),
              scriptVersion: Type.Optional(
                Type.Object({
                  id: Type.Optional(Type.String()),
                  message: Type.Optional(Type.String()),
                  tag: Type.Optional(Type.String()),
                }),
              ),
              truncated: Type.Optional(Type.Boolean()),
              wallTimeMs: Type.Number(),
            }),
          ],
          {
            description:
              "Cloudflare Workers event information enriches your logs so you can easily identify and debug issues.",
          },
        ),
      ),
      dataset: Type.String(),
      source: Type.Union([Type.String(), Type.Unknown()]),
      timestamp: Type.Integer({ minimum: 0 }),
    },
    { description: "The data structure of a telemetry event" },
  ),
)

export const WorkersObservabilityQuery = named(
  "workers-observability_query",
  Type.Object({
    created: Type.String(),
    description: Type.Union([Type.String({ maxLength: 1000 }), Type.Null()]),
    environmentId: Type.String({ description: "ID of your environment", minLength: 1, maxLength: 64 }),
    generated: Type.Union([Type.Boolean({ description: "Flag for alerts automatically created" }), Type.Null()]),
    id: Type.String({ description: "ID of the query", minLength: 1, maxLength: 64 }),
    name: Type.Union([Type.String({ description: "Query name" }), Type.Null()]),
    parameters: Type.Object({
      calculations: Type.Optional(
        Type.Array(
          Type.Object({
            alias: Type.Optional(Type.String()),
            key: Type.Optional(Type.String()),
            keyType: Type.Optional(
              Type.Union([Type.Literal("string"), Type.Literal("number"), Type.Literal("boolean")]),
            ),
            operator: Type.Union([
              Type.Literal("uniq"),
              Type.Literal("count"),
              Type.Literal("max"),
              Type.Literal("min"),
              Type.Literal("sum"),
              Type.Literal("avg"),
              Type.Literal("median"),
              Type.Literal("p001"),
              Type.Literal("p01"),
              Type.Literal("p05"),
              Type.Literal("p10"),
              Type.Literal("p25"),
              Type.Literal("p75"),
              Type.Literal("p90"),
              Type.Literal("p95"),
              Type.Literal("p99"),
              Type.Literal("p999"),
              Type.Literal("stddev"),
              Type.Literal("variance"),
              Type.Literal("COUNT_DISTINCT"),
              Type.Literal("COUNT"),
              Type.Literal("MAX"),
              Type.Literal("MIN"),
              Type.Literal("SUM"),
              Type.Literal("AVG"),
              Type.Literal("MEDIAN"),
              Type.Literal("P001"),
              Type.Literal("P01"),
              Type.Literal("P05"),
              Type.Literal("P10"),
              Type.Literal("P25"),
              Type.Literal("P75"),
              Type.Literal("P90"),
              Type.Literal("P95"),
              Type.Literal("P99"),
              Type.Literal("P999"),
              Type.Literal("STDDEV"),
              Type.Literal("VARIANCE"),
            ]),
          }),
          { description: "Create Calculations to compute as part of the query." },
        ),
      ),
      datasets: Type.Optional(
        Type.Array(Type.String(), {
          description: "Set the Datasets to query. Leave it empty to query all the datasets.",
        }),
      ),
      filterCombination: Type.Optional(
        Type.Union([Type.Literal("and"), Type.Literal("or"), Type.Literal("AND"), Type.Literal("OR")], {
          description: "Set a Flag to describe how to combine the filters on the query.",
        }),
      ),
      filters: Type.Optional(
        Type.Array(
          Type.Object({
            key: Type.String(),
            operation: Type.Union([
              Type.Literal("includes"),
              Type.Literal("not_includes"),
              Type.Literal("starts_with"),
              Type.Literal("regex"),
              Type.Literal("exists"),
              Type.Literal("is_null"),
              Type.Literal("in"),
              Type.Literal("not_in"),
              Type.Literal("eq"),
              Type.Literal("neq"),
              Type.Literal("gt"),
              Type.Literal("gte"),
              Type.Literal("lt"),
              Type.Literal("lte"),
              Type.Literal("="),
              Type.Literal("!="),
              Type.Literal(">"),
              Type.Literal(">="),
              Type.Literal("<"),
              Type.Literal("<="),
              Type.Literal("INCLUDES"),
              Type.Literal("DOES_NOT_INCLUDE"),
              Type.Literal("MATCH_REGEX"),
              Type.Literal("EXISTS"),
              Type.Literal("DOES_NOT_EXIST"),
              Type.Literal("IN"),
              Type.Literal("NOT_IN"),
              Type.Literal("STARTS_WITH"),
            ]),
            type: Type.Union([Type.Literal("string"), Type.Literal("number"), Type.Literal("boolean")]),
            value: Type.Optional(Type.Union([Type.String(), Type.Number(), Type.Boolean()])),
          }),
          { description: "Configure the Filters to apply to the query." },
        ),
      ),
      groupBys: Type.Optional(
        Type.Array(
          Type.Object({
            type: Type.Union([Type.Literal("string"), Type.Literal("number"), Type.Literal("boolean")]),
            value: Type.String(),
          }),
          { description: "Define how to group the results of the query." },
        ),
      ),
      havings: Type.Optional(
        Type.Array(
          Type.Object({
            key: Type.String(),
            operation: Type.Union([
              Type.Literal("eq"),
              Type.Literal("neq"),
              Type.Literal("gt"),
              Type.Literal("gte"),
              Type.Literal("lt"),
              Type.Literal("lte"),
            ]),
            value: Type.Number(),
          }),
          { description: "Configure the Having clauses that filter on calculations in the query result." },
        ),
      ),
      limit: Type.Optional(
        Type.Integer({
          description: "Set a limit on the number of results / records returned by the query",
          minimum: 0,
          maximum: 100,
        }),
      ),
      needle: Type.Optional(
        Type.Object(
          {
            isRegex: Type.Optional(Type.Boolean()),
            matchCase: Type.Optional(Type.Boolean()),
            value: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
          },
          { description: "Define an expression to search using full-text search." },
        ),
      ),
      orderBy: Type.Optional(
        Type.Object(
          {
            order: Type.Optional(
              Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Set the order of the results" }),
            ),
            value: Type.String({ description: "Configure which Calculation to order the results by." }),
          },
          { description: "Configure the order of the results returned by the query." },
        ),
      ),
    }),
    updated: Type.String(),
    userId: Type.String(),
    workspaceId: Type.String({ description: "ID of your workspace", minLength: 1, maxLength: 64 }),
  }),
)

export const WorkersObservabilityQueryRun = named(
  "workers-observability_query_run",
  Type.Object(
    {
      accountId: Type.String(),
      created: Type.Optional(Type.String()),
      dry: Type.Boolean(),
      environmentId: Type.String({ deprecated: true }),
      granularity: Type.Number(),
      id: Type.String(),
      query: WorkersObservabilityQuery,
      statistics: Type.Optional(
        Type.Object({
          bytes_read: Type.Number({ description: "Number of uncompressed bytes read from the table." }),
          elapsed: Type.Number({ description: "Time in seconds for the query to run." }),
          rows_read: Type.Number({ description: "Number of rows scanned from the table." }),
        }),
      ),
      status: Type.Union([Type.Literal("STARTED"), Type.Literal("COMPLETED")]),
      timeframe: Type.Object({
        from: Type.Number({
          description: "Set the start time for your query using UNIX time in milliseconds.",
          minimum: 0,
          exclusiveMinimum: true,
        }),
        to: Type.Number({
          description: "Set the end time for your query using UNIX time in milliseconds.",
          minimum: 0,
          exclusiveMinimum: true,
        }),
      }),
      updated: Type.Optional(Type.String()),
      userId: Type.String(),
      workspaceId: Type.String({ deprecated: true }),
    },
    { description: "A Workers Observability Query Object" },
  ),
)

export const WorkersObservabilityPerformanceInformation = named(
  "workers-observability_performance_information",
  Type.Object(
    {
      bytes_read: Type.Number({ description: "Number of uncompressed bytes read from the table." }),
      elapsed: Type.Number({ description: "Time in seconds for the query to run." }),
      rows_read: Type.Number({ description: "Number of rows scanned from the table." }),
    },
    {
      description:
        "The statistics object contains information about query performance from the database, it does not include any network latency",
    },
  ),
)

export const WorkersObservabilityQueryResults = named(
  "workers-observability_query_results",
  Type.Object({
    calculations: Type.Optional(
      Type.Array(
        Type.Object({
          aggregates: Type.Array(
            Type.Object({
              count: Type.Number(),
              groups: Type.Optional(
                Type.Array(
                  Type.Object({
                    key: Type.String(),
                    value: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
                  }),
                ),
              ),
              interval: Type.Number(),
              sampleInterval: Type.Number(),
              value: Type.Number(),
            }),
          ),
          alias: Type.Optional(Type.String()),
          calculation: Type.String(),
          series: Type.Array(
            Type.Object({
              data: Type.Array(
                Type.Object({
                  count: Type.Number(),
                  firstSeen: Type.String(),
                  groups: Type.Optional(
                    Type.Array(
                      Type.Object({
                        key: Type.String(),
                        value: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
                      }),
                    ),
                  ),
                  interval: Type.Number(),
                  lastSeen: Type.String(),
                  sampleInterval: Type.Number(),
                  value: Type.Number(),
                }),
              ),
              time: Type.String(),
            }),
          ),
        }),
      ),
    ),
    compare: Type.Optional(
      Type.Array(
        Type.Object({
          aggregates: Type.Array(
            Type.Object({
              count: Type.Number(),
              groups: Type.Optional(
                Type.Array(
                  Type.Object({
                    key: Type.String(),
                    value: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
                  }),
                ),
              ),
              interval: Type.Number(),
              sampleInterval: Type.Number(),
              value: Type.Number(),
            }),
          ),
          alias: Type.Optional(Type.String()),
          calculation: Type.String(),
          series: Type.Array(
            Type.Object({
              data: Type.Array(
                Type.Object({
                  count: Type.Number(),
                  firstSeen: Type.String(),
                  groups: Type.Optional(
                    Type.Array(
                      Type.Object({
                        key: Type.String(),
                        value: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
                      }),
                    ),
                  ),
                  interval: Type.Number(),
                  lastSeen: Type.String(),
                  sampleInterval: Type.Number(),
                  value: Type.Number(),
                }),
              ),
              time: Type.String(),
            }),
          ),
        }),
      ),
    ),
    events: Type.Optional(
      Type.Object({
        count: Type.Optional(Type.Number()),
        events: Type.Optional(Type.Array(WorkersObservabilityTelemetryEvent)),
        fields: Type.Optional(
          Type.Array(
            Type.Object({
              key: Type.String(),
              type: Type.String(),
            }),
          ),
        ),
        series: Type.Optional(
          Type.Array(
            Type.Object({
              data: Type.Array(
                Type.Object({
                  aggregates: Type.Object({
                    _count: Type.Integer({ minimum: 0, exclusiveMinimum: true, deprecated: true }),
                    _firstSeen: Type.String({ deprecated: true }),
                    _interval: Type.Integer({ minimum: 0, exclusiveMinimum: true, deprecated: true }),
                    _lastSeen: Type.String({ deprecated: true }),
                    bin: Type.Optional(Type.Unknown()),
                  }),
                  count: Type.Number(),
                  errors: Type.Optional(Type.Number()),
                  groups: Type.Optional(
                    Type.Record(Type.String(), Type.Union([Type.String(), Type.Number(), Type.Boolean()])),
                  ),
                  interval: Type.Number(),
                  sampleInterval: Type.Number(),
                }),
              ),
              time: Type.String(),
            }),
          ),
        ),
      }),
    ),
    invocations: Type.Optional(Type.Record(Type.String(), Type.Array(WorkersObservabilityTelemetryEvent))),
    patterns: Type.Optional(
      Type.Array(
        Type.Object({
          count: Type.Number(),
          pattern: Type.String(),
          series: Type.Array(
            Type.Object({
              data: Type.Object({
                count: Type.Number(),
                groups: Type.Optional(
                  Type.Array(
                    Type.Object({
                      key: Type.String(),
                      value: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
                    }),
                  ),
                ),
                interval: Type.Number(),
                sampleInterval: Type.Number(),
                value: Type.Number(),
              }),
              time: Type.String(),
            }),
          ),
          service: Type.String(),
        }),
      ),
    ),
    run: WorkersObservabilityQueryRun,
    statistics: WorkersObservabilityPerformanceInformation,
  }),
)

export const WorkersSchemasId = named("workers_schemas-id", Type.String({ description: "ID of the namespace." }))

export const WorkersObject = named(
  "workers_object",
  Type.Object({
    hasStoredData: Type.Optional(
      Type.Boolean({ description: "Whether the Durable Object has stored data.", readOnly: true }),
    ),
    id: Type.Optional(Type.String({ description: "ID of the Durable Object.", readOnly: true })),
  }),
)

export const WorkersCursor = named(
  "workers_cursor",
  Type.String({
    description:
      "Opaque token indicating the position from which to continue when requesting the next set of records. A valid value for the cursor can be obtained from the cursors object in the result_info structure.",
  }),
)

export const WorkersNamespace = named(
  "workers_namespace",
  Type.Object({
    class: Type.Optional(Type.String()),
    id: Type.Optional(Type.String({ readOnly: true })),
    name: Type.Optional(Type.String()),
    script: Type.Optional(Type.String()),
    use_sqlite: Type.Optional(Type.Boolean()),
  }),
)

export const WorkersDomainIdentifier = named(
  "workers_domain_identifier",
  Type.String({ description: "Identifer of the Worker Domain.", "x-auditable": true }),
)

export const WorkersSchemasEnvironment = named(
  "workers_schemas-environment",
  Type.String({ description: "Worker environment associated with the zone and hostname.", "x-auditable": true }),
)

export const WorkersHostname = named(
  "workers_hostname",
  Type.String({ description: "Hostname of the Worker Domain.", "x-auditable": true }),
)

export const WorkersSchemasService = named(
  "workers_schemas-service",
  Type.String({ description: "Worker service associated with the zone and hostname.", "x-auditable": true }),
)

export const WorkersZoneIdentifier = named(
  "workers_zone_identifier",
  Type.String({ description: "Identifier of the zone.", "x-auditable": true }),
)

export const WorkersZoneName = named(
  "workers_zone_name",
  Type.String({ description: "Name of the zone.", "x-auditable": true }),
)

export const WorkersDomain = named(
  "workers_domain",
  Type.Object({
    environment: Type.Optional(WorkersSchemasEnvironment),
    hostname: Type.Optional(WorkersHostname),
    id: Type.Optional(WorkersDomainIdentifier),
    service: Type.Optional(WorkersSchemasService),
    zone_id: Type.Optional(WorkersZoneIdentifier),
    zone_name: Type.Optional(WorkersZoneName),
  }),
)

export const WorkersDomainResponseSingle = named(
  "workers_domain-response-single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(WorkersDomain),
  }),
)

export const WorkersAccountIdentifier = named(
  "workers_account_identifier",
  Type.String({ description: "Identifer of the account.", "x-auditable": true }),
)

export const WorkersDomainResponseCollection = named(
  "workers_domain-response-collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(WorkersDomain)),
  }),
)

export const WorkersTags = named(
  "workers_tags",
  Type.Array(WorkersTag, {
    description: "Tags associated with the Worker.",
    maxItems: 10,
    "x-auditable": true,
    "x-stainless-collection-type": "set",
  }),
)

export const WorkersSecretNameUrlEncoded = named(
  "workers_secret_name_url_encoded",
  Type.Boolean({
    description: "Flag that indicates whether the secret name is URL encoded.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const WorkersSecretName = named(
  "workers_secret_name",
  Type.String({
    description: "A JavaScript variable name for the secret binding.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const WorkersSecret = named(
  "workers_secret",
  Type.Union([WorkersBindingKindSecretText, WorkersBindingKindSecretKey], {
    description: "A secret value accessible through a binding.",
  }),
)

export const WorkersScriptResponseSingle = named(
  "workers_script-response-single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: WorkersScriptResponse,
  }),
)

export const WorkersCreateAssetsUploadSessionResponse = named(
  "workers_create-assets-upload-session-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        buckets: Type.Optional(
          Type.Array(
            Type.Array(Type.String({ description: "The file hash to include in this bucket." }), {
              description: "The set of assets to include in each request while uploading.",
              "x-stainless-collection-type": "set",
            }),
            { description: "The requests to make to upload assets.", "x-stainless-collection-type": "set" },
          ),
        ),
        jwt: Type.Optional(
          Type.String({ description: "A JWT to use as authentication for uploading assets.", "x-sensitive": true }),
        ),
      }),
    ),
  }),
)

export const WorkersManifestValue = named(
  "workers_manifest-value",
  Type.Object({
    hash: Type.String({ description: "The hash of the file." }),
    size: Type.Integer({ description: "The size of the file in bytes." }),
  }),
)

export const WorkersCreateAssetsUploadSessionObject = named(
  "workers_create-assets-upload-session-object",
  Type.Object({
    manifest: Type.Record(Type.String(), WorkersManifestValue),
  }),
)

export const WorkersScriptResponseUpload = named(
  "workers_script-response-upload",
  Type.Object({
    compatibility_date: Type.Optional(WorkersCompatibilityDate),
    compatibility_flags: Type.Optional(WorkersCompatibilityFlags),
    created_on: Type.Optional(WorkersCreatedOn),
    etag: Type.Optional(WorkersEtag),
    handlers: Type.Optional(
      Type.Array(Type.String(), { description: "The names of handlers exported as part of the default export." }),
    ),
    has_assets: Type.Optional(WorkersHasAssets),
    has_modules: Type.Optional(WorkersHasModules),
    id: Type.Optional(
      Type.String({
        description: "The id of the script in the Workers system. Usually the script name.",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    last_deployed_from: Type.Optional(
      Type.String({ description: "The client most recently used to deploy this Worker." }),
    ),
    logpush: Type.Optional(WorkersLogpush),
    migration_tag: Type.Optional(
      Type.String({
        description: "The tag of the Durable Object migration that was most recently applied for this Worker.",
      }),
    ),
    modified_on: Type.Optional(WorkersModifiedOn),
    named_handlers: Type.Optional(
      Type.Array(
        Type.Object({
          handlers: Type.Optional(
            Type.Array(Type.String(), { description: "The names of handlers exported as part of the named export." }),
          ),
          name: Type.Optional(Type.String({ description: "The name of the export." })),
        }),
        { description: "Named exports, such as Durable Object class implementations and named entrypoints." },
      ),
    ),
    placement: Type.Optional(WorkersPlacementInfo),
    placement_mode: Type.Optional(Type.Intersect([WorkersPlacementMode, Type.String({ deprecated: true })])),
    placement_status: Type.Optional(Type.Intersect([WorkersPlacementStatus, Type.String({ deprecated: true })])),
    tail_consumers: Type.Optional(WorkersTailConsumers),
    usage_model: Type.Optional(WorkersUsageModel),
    startup_time_ms: Type.Integer({ "x-auditable": true }),
  }),
)

export const WorkersScriptResponseUploadSingle = named(
  "workers_script-response-upload-single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: WorkersScriptResponseUpload,
  }),
)

export const WorkersScriptName = named(
  "workers_script_name",
  Type.String({ description: "Name of the script, used in URLs and route configuration.", "x-auditable": true }),
)

export const WorkersDispatchNamespaceName = named(
  "workers_dispatch_namespace_name",
  Type.String({ description: "Name of the Workers for Platforms dispatch namespace.", "x-auditable": true }),
)

export const WorkersNamespaceScriptResponse = named(
  "workers_namespace-script-response",
  Type.Object(
    {
      created_on: Type.Optional(WorkersCreatedOn),
      dispatch_namespace: Type.Optional(WorkersDispatchNamespaceName),
      modified_on: Type.Optional(WorkersModifiedOn),
      script: Type.Optional(WorkersScriptResponse),
    },
    { description: "Details about a worker uploaded to a Workers for Platforms namespace." },
  ),
)

export const WorkersNamespaceScriptResponseSingle = named(
  "workers_namespace-script-response-single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: WorkersNamespaceScriptResponse,
  }),
)

export const WorkersUuid = named(
  "workers_uuid",
  Type.String({ description: "API Resource UUID tag.", maxLength: 36, "x-auditable": true }),
)

export const WorkersNamespaceScriptDeleteBulkResponse = named(
  "workers_namespace-script-delete-bulk-response",
  Type.Object(
    {
      deleted: Type.Optional(
        Type.Array(
          Type.Object({
            id: Type.Optional(WorkersUuid),
          }),
        ),
      ),
      deleted_count: Type.Optional(Type.Integer()),
      has_more: Type.Optional(Type.Boolean()),
    },
    { description: "Detail about bulk deletion of scripts in a namespace." },
  ),
)

export const WorkersApiResponseNullResult = named(
  "workers_api-response-null-result",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Union([Type.Null()])),
  }),
)

export const WorkersTrustedWorkers = named(
  "workers_trusted_workers",
  Type.Boolean({
    description:
      'Whether the Workers in the namespace are executed in a "trusted" manner. When a Worker is trusted, it has access to the shared caches for the zone in the Cache API, and has access to the `request.cf` object on incoming Requests. When a Worker is untrusted, caches are not shared across the zone, and `request.cf` is undefined. By default, Workers in a namespace are "untrusted".',
    default: false,
    "x-auditable": true,
  }),
)

export const WorkersScriptCount = named(
  "workers_script_count",
  Type.Integer({ description: "The current number of scripts in this Dispatch Namespace." }),
)

export const WorkersNamespaceResponse = named(
  "workers_namespace-response",
  Type.Object({
    created_by: Type.Optional(DlsIdentifier),
    created_on: Type.Optional(WorkersCreatedOn),
    modified_by: Type.Optional(DlsIdentifier),
    modified_on: Type.Optional(WorkersModifiedOn),
    namespace_id: Type.Optional(WorkersUuid),
    namespace_name: Type.Optional(WorkersDispatchNamespaceName),
    script_count: Type.Optional(WorkersScriptCount),
    trusted_workers: Type.Optional(WorkersTrustedWorkers),
  }),
)

export const WorkersNamespaceSingleResponse = named(
  "workers_namespace-single-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(WorkersNamespaceResponse),
  }),
)

export const WorkersNamespaceListResponse = named(
  "workers_namespace-list-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(WorkersNamespaceResponse)),
  }),
)

export const WorkersUploadAssetsResponse = named(
  "workers_upload-assets-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Unknown()),
  }),
)

export const WorkersCompletedUploadAssetsResponse = named(
  "workers_completed-upload-assets-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        jwt: Type.Optional(
          Type.String({
            description: 'A "completion" JWT which can be redeemed when creating a Worker version.',
            "x-sensitive": true,
          }),
        ),
      }),
    ),
  }),
)

export const WorkersApiResponseCommonFailure = named(
  "workers_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const WorkersAccountSettings = named(
  "workers_account-settings",
  Type.Object({
    default_usage_model: Type.Optional(Type.String({ "x-auditable": true })),
    green_compute: Type.Optional(Type.Boolean({ "x-auditable": true })),
  }),
)

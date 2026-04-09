import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { R2BucketName, R2Jurisdiction, R2SippyProvider } from "../shared/schemas"

export const R2TempAccessCredsResponse = named(
  "r2_temp_access_creds_response",
  Type.Object({
    accessKeyId: Type.Optional(Type.String({ description: "ID for new access key." })),
    secretAccessKey: Type.Optional(Type.String({ description: "Secret access key.", "x-sensitive": true })),
    sessionToken: Type.Optional(Type.String({ description: "Security token.", "x-sensitive": true })),
  }),
)

export const R2TempAccessCredsRequest = named(
  "r2_temp_access_creds_request",
  Type.Object({
    bucket: Type.String({ description: "Name of the R2 bucket.", "x-auditable": true }),
    objects: Type.Optional(
      Type.Array(Type.String({ "x-auditable": true }), {
        description: "Optional object paths to scope the credentials to.",
      }),
    ),
    parentAccessKeyId: Type.String({ description: "The parent access key id to use for signing." }),
    permission: Type.Union(
      [
        Type.Literal("admin-read-write"),
        Type.Literal("admin-read-only"),
        Type.Literal("object-read-write"),
        Type.Literal("object-read-only"),
      ],
      { description: "Permissions allowed on the credentials.", "x-auditable": true },
    ),
    prefixes: Type.Optional(
      Type.Array(Type.String({ "x-auditable": true }), {
        description: "Optional prefix paths to scope the credentials to.",
      }),
    ),
    ttlSeconds: Type.Number({
      description: "How long the credentials will live for in seconds.",
      default: 900,
      maximum: 604800,
      "x-auditable": true,
    }),
  }),
)

export const R2ObjectSizeMetrics = named(
  "r2_object_size_metrics",
  Type.Object(
    {
      metadataSize: Type.Optional(Type.Number({ description: "Amount of." })),
      objects: Type.Optional(Type.Number({ description: "Number of objects stored." })),
      payloadSize: Type.Optional(Type.Number({ description: "Amount of storage used by object data." })),
    },
    { description: "Metrics on number of objects/amount of storage used." },
  ),
)

export const R2ClassBasedMetrics = named(
  "r2_class_based_metrics",
  Type.Object(
    {
      published: Type.Optional(R2ObjectSizeMetrics),
      uploaded: Type.Optional(R2ObjectSizeMetrics),
    },
    { description: "Metrics based on what state they are in(uploaded or published)." },
  ),
)

export const R2AccountLevelMetrics = named(
  "r2_account_level_metrics",
  Type.Object(
    {
      infrequentAccess: Type.Optional(R2ClassBasedMetrics),
      standard: Type.Optional(R2ClassBasedMetrics),
    },
    { description: "Metrics based on the class they belong to." },
  ),
)

export const R2EnableSippyGcs = named(
  "r2_enable_sippy_gcs",
  Type.Object({
    destination: Type.Optional(
      Type.Object(
        {
          accessKeyId: Type.Optional(
            Type.String({
              description:
                'ID of a Cloudflare API token.\nThis is the value labelled "Access Key ID" when creating an API.\ntoken from the [R2 dashboard](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).\n\nSippy will use this token when writing objects to R2, so it is\nbest to scope this token to the bucket you\'re enabling Sippy for.\n',
            }),
          ),
          provider: Type.Optional(R2SippyProvider),
          secretAccessKey: Type.Optional(
            Type.String({
              description:
                'Value of a Cloudflare API token.\nThis is the value labelled "Secret Access Key" when creating an API.\ntoken from the [R2 dashboard](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).\n\nSippy will use this token when writing objects to R2, so it is\nbest to scope this token to the bucket you\'re enabling Sippy for.\n',
              "x-sensitive": true,
            }),
          ),
        },
        { description: "R2 bucket to copy objects to." },
      ),
    ),
    source: Type.Optional(
      Type.Object(
        {
          bucket: Type.Optional(Type.String({ description: "Name of the GCS bucket.", "x-auditable": true })),
          clientEmail: Type.Optional(
            Type.String({ description: "Client email of an IAM credential (ideally scoped to a single GCS bucket)." }),
          ),
          privateKey: Type.Optional(
            Type.String({
              description: "Private Key of an IAM credential (ideally scoped to a single GCS bucket).",
              "x-sensitive": true,
            }),
          ),
          provider: Type.Optional(Type.Union([Type.Literal("gcs")])),
        },
        { description: "GCS bucket to copy objects from." },
      ),
    ),
  }),
)

export const R2EnableSippyAws = named(
  "r2_enable_sippy_aws",
  Type.Object({
    destination: Type.Optional(
      Type.Object(
        {
          accessKeyId: Type.Optional(
            Type.String({
              description:
                'ID of a Cloudflare API token.\nThis is the value labelled "Access Key ID" when creating an API.\ntoken from the [R2 dashboard](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).\n\nSippy will use this token when writing objects to R2, so it is\nbest to scope this token to the bucket you\'re enabling Sippy for.\n',
            }),
          ),
          provider: Type.Optional(R2SippyProvider),
          secretAccessKey: Type.Optional(
            Type.String({
              description:
                'Value of a Cloudflare API token.\nThis is the value labelled "Secret Access Key" when creating an API.\ntoken from the [R2 dashboard](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).\n\nSippy will use this token when writing objects to R2, so it is\nbest to scope this token to the bucket you\'re enabling Sippy for.\n',
              "x-sensitive": true,
            }),
          ),
        },
        { description: "R2 bucket to copy objects to." },
      ),
    ),
    source: Type.Optional(
      Type.Object(
        {
          accessKeyId: Type.Optional(
            Type.String({ description: "Access Key ID of an IAM credential (ideally scoped to a single S3 bucket)." }),
          ),
          bucket: Type.Optional(Type.String({ description: "Name of the AWS S3 bucket.", "x-auditable": true })),
          provider: Type.Optional(Type.Union([Type.Literal("aws")], { "x-auditable": true })),
          region: Type.Optional(
            Type.String({ description: "Name of the AWS availability zone.", "x-auditable": true }),
          ),
          secretAccessKey: Type.Optional(
            Type.String({
              description: "Secret Access Key of an IAM credential (ideally scoped to a single S3 bucket).",
              "x-sensitive": true,
            }),
          ),
        },
        { description: "AWS S3 bucket to copy objects from." },
      ),
    ),
  }),
)

export const R2Sippy = named(
  "r2_sippy",
  Type.Object({
    destination: Type.Optional(
      Type.Object(
        {
          accessKeyId: Type.Optional(
            Type.String({ description: "ID of the Cloudflare API token used when writing objects to this\nbucket.\n" }),
          ),
          account: Type.Optional(Type.String({ "x-auditable": true })),
          bucket: Type.Optional(
            Type.String({ description: "Name of the bucket on the provider.", "x-auditable": true }),
          ),
          provider: Type.Optional(R2SippyProvider),
        },
        { description: "Details about the configured destination bucket." },
      ),
    ),
    enabled: Type.Optional(Type.Boolean({ description: "State of Sippy for this bucket.", "x-auditable": true })),
    source: Type.Optional(
      Type.Object(
        {
          bucket: Type.Optional(
            Type.String({ description: "Name of the bucket on the provider.", "x-auditable": true }),
          ),
          provider: Type.Optional(Type.Union([Type.Literal("aws"), Type.Literal("gcs")], { "x-auditable": true })),
          region: Type.Optional(
            Type.Union([
              Type.String({ description: "Region where the bucket resides (AWS only).", "x-auditable": true }),
              Type.Null(),
            ]),
          ),
        },
        { description: "Details about the configured source bucket." },
      ),
    ),
  }),
)

export const R2LockRuleAgeCondition = named(
  "r2_lock-rule-age-condition",
  Type.Object(
    {
      maxAgeSeconds: Type.Integer({ "x-auditable": true }),
      type: Type.Union([Type.Literal("Age")], { "x-auditable": true }),
    },
    { description: "Condition to apply a lock rule to an object for how long in seconds." },
  ),
)

export const R2LockRuleDateCondition = named(
  "r2_lock-rule-date-condition",
  Type.Object(
    {
      date: Type.String({ format: "date", "x-auditable": true }),
      type: Type.Union([Type.Literal("Date")], { "x-auditable": true }),
    },
    { description: "Condition to apply a lock rule to an object until a specific date." },
  ),
)

export const R2LockRuleIndefiniteCondition = named(
  "r2_lock-rule-indefinite-condition",
  Type.Object(
    {
      type: Type.Union([Type.Literal("Indefinite")], { "x-auditable": true }),
    },
    { description: "Condition to apply a lock rule indefinitely." },
  ),
)

export const R2BucketLockRule = named(
  "r2_bucket-lock-rule",
  Type.Object({
    condition: Type.Union([R2LockRuleAgeCondition, R2LockRuleDateCondition, R2LockRuleIndefiniteCondition]),
    enabled: Type.Boolean({ description: "Whether or not this rule is in effect.", "x-auditable": true }),
    id: Type.String({ description: "Unique identifier for this rule.", "x-auditable": true }),
    prefix: Type.Optional(
      Type.String({
        description:
          "Rule will only apply to objects/uploads in the bucket that start with the given prefix, an empty prefix can be provided to scope rule to all objects/uploads.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const R2BucketLockRuleConfig = named(
  "r2_bucket-lock-rule-config",
  Type.Object({
    rules: Type.Optional(Type.Array(R2BucketLockRule)),
  }),
)

export const R2LifecycleAgeCondition = named(
  "r2_lifecycle-age-condition",
  Type.Object(
    {
      maxAge: Type.Integer({ "x-auditable": true }),
      type: Type.Union([Type.Literal("Age")], { "x-auditable": true }),
    },
    { description: "Condition for lifecycle transitions to apply after an object reaches an age in seconds." },
  ),
)

export const R2LifecycleDateCondition = named(
  "r2_lifecycle-date-condition",
  Type.Object(
    {
      date: Type.String({ format: "date", "x-auditable": true }),
      type: Type.Union([Type.Literal("Date")], { "x-auditable": true }),
    },
    { description: "Condition for lifecycle transitions to apply on a specific date." },
  ),
)

export const R2LifecycleStorageTransition = named(
  "r2_lifecycle-storage-transition",
  Type.Object({
    condition: Type.Union([R2LifecycleAgeCondition, R2LifecycleDateCondition]),
    storageClass: Type.Union([Type.Literal("InfrequentAccess")], { "x-auditable": true }),
  }),
)

export const R2LifecycleRule = named(
  "r2_lifecycle-rule",
  Type.Object({
    abortMultipartUploadsTransition: Type.Optional(
      Type.Object(
        {
          condition: Type.Optional(R2LifecycleAgeCondition),
        },
        { description: "Transition to abort ongoing multipart uploads." },
      ),
    ),
    conditions: Type.Object(
      {
        prefix: Type.String({
          description:
            "Transitions will only apply to objects/uploads in the bucket that start with the given prefix, an empty prefix can be provided to scope rule to all objects/uploads.",
          "x-auditable": true,
        }),
      },
      { description: "Conditions that apply to all transitions of this rule." },
    ),
    deleteObjectsTransition: Type.Optional(
      Type.Object(
        {
          condition: Type.Optional(Type.Union([R2LifecycleAgeCondition, R2LifecycleDateCondition])),
        },
        { description: "Transition to delete objects." },
      ),
    ),
    enabled: Type.Boolean({ description: "Whether or not this rule is in effect.", "x-auditable": true }),
    id: Type.String({ description: "Unique identifier for this rule.", "x-auditable": true }),
    storageClassTransitions: Type.Optional(
      Type.Array(R2LifecycleStorageTransition, { description: "Transitions to change the storage class of objects." }),
    ),
  }),
)

export const R2LifecycleConfig = named(
  "r2_lifecycle-config",
  Type.Object({
    rules: Type.Optional(Type.Array(R2LifecycleRule)),
  }),
)

export const R2EditManagedDomainRequest = named(
  "r2_edit_managed_domain_request",
  Type.Object({
    enabled: Type.Boolean({
      description: "Whether to enable public bucket access at the r2.dev domain.",
      "x-auditable": true,
    }),
  }),
)

export const R2ManagedDomainResponse = named(
  "r2_managed_domain_response",
  Type.Object({
    bucketId: Type.String({ description: "Bucket ID.", maxLength: 32, "x-auditable": true }),
    domain: Type.String({ description: "Domain name of the bucket's r2.dev domain.", "x-auditable": true }),
    enabled: Type.Boolean({
      description: "Whether this bucket is publicly accessible at the r2.dev domain.",
      "x-auditable": true,
    }),
  }),
)

export const R2RemoveCustomDomainResponse = named(
  "r2_remove_custom_domain_response",
  Type.Object({
    domain: Type.String({ description: "Name of the removed custom domain.", "x-auditable": true }),
  }),
)

export const R2EditCustomDomainResponse = named(
  "r2_edit_custom_domain_response",
  Type.Object({
    ciphers: Type.Optional(
      Type.Array(Type.String(), {
        description: "An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.",
        "x-auditable": true,
      }),
    ),
    domain: Type.String({ description: "Domain name of the affected custom domain.", "x-auditable": true }),
    enabled: Type.Optional(
      Type.Boolean({
        description: "Whether this bucket is publicly accessible at the specified custom domain.",
        "x-auditable": true,
      }),
    ),
    minTLS: Type.Optional(
      Type.Union([Type.Literal("1.0"), Type.Literal("1.1"), Type.Literal("1.2"), Type.Literal("1.3")], {
        description:
          "Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const R2EditCustomDomainRequest = named(
  "r2_edit_custom_domain_request",
  Type.Object({
    ciphers: Type.Optional(
      Type.Array(Type.String(), {
        description: "An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.",
        "x-auditable": true,
      }),
    ),
    enabled: Type.Optional(
      Type.Boolean({
        description: "Whether to enable public bucket access at the specified custom domain.",
        "x-auditable": true,
      }),
    ),
    minTLS: Type.Optional(
      Type.Union([Type.Literal("1.0"), Type.Literal("1.1"), Type.Literal("1.2"), Type.Literal("1.3")], {
        description:
          "Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to previous value.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const R2DomainName = named(
  "r2_domain_name",
  Type.String({ description: "Name of the custom domain.", "x-auditable": true }),
)

export const R2GetCustomDomainResponse = named(
  "r2_get_custom_domain_response",
  Type.Object({
    ciphers: Type.Optional(
      Type.Array(Type.String(), {
        description: "An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.",
        "x-auditable": true,
      }),
    ),
    domain: Type.String({ description: "Domain name of the custom domain to be added.", "x-auditable": true }),
    enabled: Type.Boolean({
      description: "Whether this bucket is publicly accessible at the specified custom domain.",
      "x-auditable": true,
    }),
    minTLS: Type.Optional(
      Type.Union([Type.Literal("1.0"), Type.Literal("1.1"), Type.Literal("1.2"), Type.Literal("1.3")], {
        description:
          "Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.",
        "x-auditable": true,
      }),
    ),
    status: Type.Object({
      ownership: Type.Union(
        [
          Type.Literal("pending"),
          Type.Literal("active"),
          Type.Literal("deactivated"),
          Type.Literal("blocked"),
          Type.Literal("error"),
          Type.Literal("unknown"),
        ],
        { description: "Ownership status of the domain.", "x-auditable": true },
      ),
      ssl: Type.Union(
        [
          Type.Literal("initializing"),
          Type.Literal("pending"),
          Type.Literal("active"),
          Type.Literal("deactivated"),
          Type.Literal("error"),
          Type.Literal("unknown"),
        ],
        { description: "SSL certificate status.", "x-auditable": true },
      ),
    }),
    zoneId: Type.Optional(
      Type.String({ description: "Zone ID of the custom domain resides in.", "x-auditable": true }),
    ),
    zoneName: Type.Optional(
      Type.String({ description: "Zone that the custom domain resides in.", "x-auditable": true }),
    ),
  }),
)

export const R2AddCustomDomainResponse = named(
  "r2_add_custom_domain_response",
  Type.Object({
    ciphers: Type.Optional(
      Type.Array(Type.String(), {
        description: "An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.",
        "x-auditable": true,
      }),
    ),
    domain: Type.String({ description: "Domain name of the affected custom domain.", "x-auditable": true }),
    enabled: Type.Boolean({
      description: "Whether this bucket is publicly accessible at the specified custom domain.",
    }),
    minTLS: Type.Optional(
      Type.Union([Type.Literal("1.0"), Type.Literal("1.1"), Type.Literal("1.2"), Type.Literal("1.3")], {
        description:
          "Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const R2AddCustomDomainRequest = named(
  "r2_add_custom_domain_request",
  Type.Object({
    ciphers: Type.Optional(
      Type.Array(Type.String(), {
        description: "An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.",
        "x-auditable": true,
      }),
    ),
    domain: Type.String({ description: "Name of the custom domain to be added.", "x-auditable": true }),
    enabled: Type.Boolean({
      description:
        "Whether to enable public bucket access at the custom domain. If undefined, the domain will be enabled.",
      "x-auditable": true,
    }),
    minTLS: Type.Optional(
      Type.Union([Type.Literal("1.0"), Type.Literal("1.1"), Type.Literal("1.2"), Type.Literal("1.3")], {
        description:
          "Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.",
        "x-auditable": true,
      }),
    ),
    zoneId: Type.String({ description: "Zone ID of the custom domain.", "x-auditable": true }),
  }),
)

export const R2ListCustomDomainsResponse = named(
  "r2_list_custom_domains_response",
  Type.Object({
    domains: Type.Array(
      Type.Object({
        ciphers: Type.Optional(
          Type.Array(Type.String(), {
            description: "An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.",
            "x-auditable": true,
          }),
        ),
        domain: Type.String({ description: "Domain name of the custom domain to be added.", "x-auditable": true }),
        enabled: Type.Boolean({
          description: "Whether this bucket is publicly accessible at the specified custom domain.",
          "x-auditable": true,
        }),
        minTLS: Type.Optional(
          Type.Union([Type.Literal("1.0"), Type.Literal("1.1"), Type.Literal("1.2"), Type.Literal("1.3")], {
            description:
              "Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.",
            "x-auditable": true,
          }),
        ),
        status: Type.Object({
          ownership: Type.Union(
            [
              Type.Literal("pending"),
              Type.Literal("active"),
              Type.Literal("deactivated"),
              Type.Literal("blocked"),
              Type.Literal("error"),
              Type.Literal("unknown"),
            ],
            { description: "Ownership status of the domain.", "x-auditable": true },
          ),
          ssl: Type.Union(
            [
              Type.Literal("initializing"),
              Type.Literal("pending"),
              Type.Literal("active"),
              Type.Literal("deactivated"),
              Type.Literal("error"),
              Type.Literal("unknown"),
            ],
            { description: "SSL certificate status.", "x-auditable": true },
          ),
        }),
        zoneId: Type.Optional(
          Type.String({ description: "Zone ID of the custom domain resides in.", "x-auditable": true }),
        ),
        zoneName: Type.Optional(
          Type.String({ description: "Zone that the custom domain resides in.", "x-auditable": true }),
        ),
      }),
    ),
  }),
)

export const R2CorsRule = named(
  "r2_cors-rule",
  Type.Object({
    allowed: Type.Object(
      {
        headers: Type.Optional(
          Type.Array(Type.String({ "x-auditable": true }), {
            description:
              "Specifies the value for the Access-Control-Allow-Headers header R2 sets when requesting objects in this bucket from a browser. Cross-origin requests that include custom headers (e.g. x-user-id) should specify these headers as AllowedHeaders.",
          }),
        ),
        methods: Type.Array(
          Type.Union(
            [
              Type.Literal("GET"),
              Type.Literal("PUT"),
              Type.Literal("POST"),
              Type.Literal("DELETE"),
              Type.Literal("HEAD"),
            ],
            { "x-auditable": true },
          ),
          {
            description:
              "Specifies the value for the Access-Control-Allow-Methods header R2 sets when requesting objects in a bucket from a browser.",
          },
        ),
        origins: Type.Array(Type.String({ "x-auditable": true }), {
          description:
            "Specifies the value for the Access-Control-Allow-Origin header R2 sets when requesting objects in a bucket from a browser.",
        }),
      },
      { description: "Object specifying allowed origins, methods and headers for this CORS rule." },
    ),
    exposeHeaders: Type.Optional(
      Type.Array(Type.String({ "x-auditable": true }), {
        description:
          "Specifies the headers that can be exposed back, and accessed by, the JavaScript making the cross-origin request. If you need to access headers beyond the safelisted response headers, such as Content-Encoding or cf-cache-status, you must specify it here.",
      }),
    ),
    id: Type.Optional(Type.String({ description: "Identifier for this rule.", "x-auditable": true })),
    maxAgeSeconds: Type.Optional(
      Type.Number({
        description:
          "Specifies the amount of time (in seconds) browsers are allowed to cache CORS preflight responses. Browsers may limit this to 2 hours or less, even if the maximum value (86400) is specified.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const R2StorageClass = named(
  "r2_storage_class",
  Type.Union([Type.Literal("Standard"), Type.Literal("InfrequentAccess")], {
    description: "Storage class for newly uploaded objects, unless specified otherwise.",
    "x-auditable": true,
  }),
)

export const R2BucketLocation = named(
  "r2_bucket_location",
  Type.Union(
    [
      Type.Literal("apac"),
      Type.Literal("eeur"),
      Type.Literal("enam"),
      Type.Literal("weur"),
      Type.Literal("wnam"),
      Type.Literal("oc"),
    ],
    {
      description: "Location of the bucket.",
      "x-auditable": true,
      "x-stainless-terraform-configurability": "computed_optional",
    },
  ),
)

export const R2ResultInfo = named(
  "r2_result_info",
  Type.Object({
    cursor: Type.Optional(
      Type.String({ description: "A continuation token that should be used to fetch the next page of results." }),
    ),
    per_page: Type.Optional(Type.Number({ description: "Maximum number of results on this page." })),
  }),
)

export const R2Bucket = named(
  "r2_bucket",
  Type.Object(
    {
      creation_date: Type.Optional(Type.String({ description: "Creation timestamp." })),
      jurisdiction: Type.Optional(R2Jurisdiction),
      location: Type.Optional(R2BucketLocation),
      name: Type.Optional(R2BucketName),
      storage_class: Type.Optional(R2StorageClass),
    },
    { description: "A single R2 bucket." },
  ),
)

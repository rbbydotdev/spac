import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages, DlpMessages, IntelAsn, IntelResultInfo } from "../shared/schemas"

export const CloudforceOneWhoisIdentifier = named(
  "cloudforce-one-whois_identifier",
  Type.String({ description: "Use to uniquely identify or reference the resource.", maxLength: 32, readOnly: true }),
)

export const CloudforceOneWhoisDomainName = named("cloudforce-one-whois_domain_name", Type.String())

export const CloudforceOneWhoisWhois = named(
  "cloudforce-one-whois_whois",
  Type.Object({
    administrative_city: Type.Optional(Type.String()),
    administrative_country: Type.Optional(Type.String()),
    administrative_email: Type.Optional(Type.String()),
    administrative_fax: Type.Optional(Type.String()),
    administrative_fax_ext: Type.Optional(Type.String()),
    administrative_id: Type.Optional(Type.String()),
    administrative_name: Type.Optional(Type.String()),
    administrative_org: Type.Optional(Type.String()),
    administrative_phone: Type.Optional(Type.String()),
    administrative_phone_ext: Type.Optional(Type.String()),
    administrative_postal_code: Type.Optional(Type.String()),
    administrative_province: Type.Optional(Type.String()),
    administrative_referral_url: Type.Optional(Type.String()),
    administrative_street: Type.Optional(Type.String()),
    billing_city: Type.Optional(Type.String()),
    billing_country: Type.Optional(Type.String()),
    billing_email: Type.Optional(Type.String()),
    billing_fax: Type.Optional(Type.String()),
    billing_fax_ext: Type.Optional(Type.String()),
    billing_id: Type.Optional(Type.String()),
    billing_name: Type.Optional(Type.String()),
    billing_org: Type.Optional(Type.String()),
    billing_phone: Type.Optional(Type.String()),
    billing_phone_ext: Type.Optional(Type.String()),
    billing_postal_code: Type.Optional(Type.String()),
    billing_province: Type.Optional(Type.String()),
    billing_referral_url: Type.Optional(Type.String()),
    billing_street: Type.Optional(Type.String()),
    created_date: Type.Optional(Type.String({ format: "date-time" })),
    created_date_raw: Type.Optional(Type.String()),
    dnssec: Type.Boolean(),
    domain: CloudforceOneWhoisDomainName,
    expiration_date: Type.Optional(Type.String({ format: "date-time" })),
    expiration_date_raw: Type.Optional(Type.String()),
    extension: Type.String(),
    found: Type.Boolean(),
    id: Type.Optional(Type.String()),
    nameservers: Type.Array(Type.String()),
    punycode: Type.String(),
    registrant: Type.String(),
    registrant_city: Type.Optional(Type.String()),
    registrant_country: Type.Optional(Type.String()),
    registrant_email: Type.Optional(Type.String()),
    registrant_fax: Type.Optional(Type.String()),
    registrant_fax_ext: Type.Optional(Type.String()),
    registrant_id: Type.Optional(Type.String()),
    registrant_name: Type.Optional(Type.String()),
    registrant_org: Type.Optional(Type.String()),
    registrant_phone: Type.Optional(Type.String()),
    registrant_phone_ext: Type.Optional(Type.String()),
    registrant_postal_code: Type.Optional(Type.String()),
    registrant_province: Type.Optional(Type.String()),
    registrant_referral_url: Type.Optional(Type.String()),
    registrant_street: Type.Optional(Type.String()),
    registrar: Type.String(),
    registrar_city: Type.Optional(Type.String()),
    registrar_country: Type.Optional(Type.String()),
    registrar_email: Type.Optional(Type.String()),
    registrar_fax: Type.Optional(Type.String()),
    registrar_fax_ext: Type.Optional(Type.String()),
    registrar_id: Type.Optional(Type.String()),
    registrar_name: Type.Optional(Type.String()),
    registrar_org: Type.Optional(Type.String()),
    registrar_phone: Type.Optional(Type.String()),
    registrar_phone_ext: Type.Optional(Type.String()),
    registrar_postal_code: Type.Optional(Type.String()),
    registrar_province: Type.Optional(Type.String()),
    registrar_referral_url: Type.Optional(Type.String()),
    registrar_street: Type.Optional(Type.String()),
    status: Type.Optional(Type.Array(Type.String())),
    technical_city: Type.Optional(Type.String()),
    technical_country: Type.Optional(Type.String()),
    technical_email: Type.Optional(Type.String()),
    technical_fax: Type.Optional(Type.String()),
    technical_fax_ext: Type.Optional(Type.String()),
    technical_id: Type.Optional(Type.String()),
    technical_name: Type.Optional(Type.String()),
    technical_org: Type.Optional(Type.String()),
    technical_phone: Type.Optional(Type.String()),
    technical_phone_ext: Type.Optional(Type.String()),
    technical_postal_code: Type.Optional(Type.String()),
    technical_province: Type.Optional(Type.String()),
    technical_referral_url: Type.Optional(Type.String()),
    technical_street: Type.Optional(Type.String()),
    updated_date: Type.Optional(Type.String({ format: "date-time" })),
    updated_date_raw: Type.Optional(Type.String()),
    whois_server: Type.Optional(Type.String()),
  }),
)

export const CloudforceOneWhoisSchemasSingleResponse = named(
  "cloudforce-one-whois_schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], {
      description: "Returns a boolean for the success/failure of the API call.",
    }),
    result: Type.Optional(CloudforceOneWhoisWhois),
  }),
)

export const IntelSinkholesId = named(
  "intel-sinkholes_id",
  Type.Integer({ description: "The unique identifier for the sinkhole" }),
)

export const IntelSinkholesName = named(
  "intel-sinkholes_name",
  Type.String({ description: "The name of the sinkhole" }),
)

export const IntelSinkholesSinkholeItem = named(
  "intel-sinkholes_sinkhole_item",
  Type.Object({
    account_tag: Type.Optional(Type.String({ description: "The account tag that owns this sinkhole" })),
    created_on: Type.Optional(
      Type.String({
        description: "The date and time when the sinkhole was created",
        format: "date-time",
        readOnly: true,
      }),
    ),
    id: Type.Optional(IntelSinkholesId),
    modified_on: Type.Optional(
      Type.String({
        description: "The date and time when the sinkhole was last modified",
        format: "date-time",
        readOnly: true,
      }),
    ),
    name: Type.Optional(IntelSinkholesName),
    r2_bucket: Type.Optional(Type.String({ description: "The name of the R2 bucket to store results" })),
    r2_id: Type.Optional(Type.String({ description: "The id of the R2 instance" })),
  }),
)

export const IntelSinkholesGetSinkholesResponse = named(
  "intel-sinkholes_get_sinkholes_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(IntelSinkholesSinkholeItem)),
  }),
)

export const IntelSchemasApiResponseCommon = named(
  "intel_schemas-api-response-common",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const IntelApiResponseSingle = named("intel_api-response-single", IntelSchemasApiResponseCommon)

export const IntelMiscategorization = named(
  "intel_miscategorization",
  Type.Object({
    content_adds: Type.Optional(
      Type.Array(Type.Integer({ "x-auditable": true }), { description: "Content category IDs to add." }),
    ),
    content_removes: Type.Optional(
      Type.Array(Type.Integer({ "x-auditable": true }), { description: "Content category IDs to remove." }),
    ),
    indicator_type: Type.Optional(
      Type.Union([Type.Literal("domain"), Type.Literal("ipv4"), Type.Literal("ipv6"), Type.Literal("url")], {
        "x-auditable": true,
      }),
    ),
    ip: Type.Optional(
      Type.Union([
        Type.String({ description: "Provide only if indicator_type is `ipv4` or `ipv6`.", "x-auditable": true }),
        Type.Null(),
      ]),
    ),
    security_adds: Type.Optional(
      Type.Array(Type.Integer({ "x-auditable": true }), { description: "Security category IDs to add." }),
    ),
    security_removes: Type.Optional(
      Type.Array(Type.Integer({ "x-auditable": true }), { description: "Security category IDs to remove." }),
    ),
    url: Type.Optional(
      Type.String({
        description:
          "Provide only if indicator_type is `domain` or `url`. Example if indicator_type is `domain`: `example.com`. Example if indicator_type is `url`: `https://example.com/news/`.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const IntelIpList = named(
  "intel_ip-list",
  Type.Object({
    description: Type.Optional(Type.String({ "x-auditable": true })),
    id: Type.Optional(Type.Integer({ "x-auditable": true })),
    name: Type.Optional(Type.String({ "x-auditable": true })),
  }),
)

export const IntelComponentsSchemasResponse = named(
  "intel_components-schemas-response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(IntelIpList), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IntelResultInfo),
  }),
)

export const IntelIpv4 = named("intel_ipv4", Type.String({ format: "ipv4", "x-auditable": true }))

export const IntelIpv6 = named("intel_ipv6", Type.String({ format: "ipv6", "x-auditable": true }))

export const IntelIp = named("intel_ip", Type.Union([IntelIpv4, IntelIpv6], { "x-auditable": true }))

export const IntelSchemasIp = named(
  "intel_schemas-ip",
  Type.Object({
    belongs_to_ref: Type.Optional(
      Type.Object(
        {
          country: Type.Optional(Type.String({ "x-auditable": true })),
          description: Type.Optional(Type.String({ "x-auditable": true })),
          id: Type.Optional(Type.String({ "x-auditable": true })),
          type: Type.Optional(
            Type.Union([Type.Literal("hosting_provider"), Type.Literal("isp"), Type.Literal("organization")], {
              description: "Infrastructure type of this ASN.",
              "x-auditable": true,
            }),
          ),
          value: Type.Optional(Type.String({ "x-auditable": true })),
        },
        { description: "Specifies a reference to the autonomous systems (AS) that the IP address belongs to." },
      ),
    ),
    ip: Type.Optional(IntelIp),
    risk_types: Type.Optional(
      Type.Array(
        Type.Object({
          id: Type.Optional(Type.Number()),
          name: Type.Optional(Type.String({ "x-auditable": true })),
          super_category_id: Type.Optional(Type.Number()),
        }),
      ),
    ),
  }),
)

export const IntelSchemasResponse = named(
  "intel_schemas-response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(IntelSchemasIp), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IntelResultInfo),
  }),
)

export const CustomIndicatorFeedsUpdateFeed = named(
  "custom-indicator-feeds_update_feed",
  Type.Object({
    file_id: Type.Optional(Type.Integer({ description: "Feed id", "x-auditable": true })),
    filename: Type.Optional(
      Type.String({ description: "Name of the file unified in our system", "x-auditable": true }),
    ),
    status: Type.Optional(
      Type.String({ description: "Current status of upload, should be unified", "x-auditable": true }),
    ),
  }),
)

export const CustomIndicatorFeedsUpdateFeedResponse = named(
  "custom-indicator-feeds_update_feed_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(CustomIndicatorFeedsUpdateFeed),
  }),
)

export const CustomIndicatorFeedsApiResponseCommonFailure = named(
  "custom-indicator-feeds_api_response_common_failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful" }),
  }),
)

export const CustomIndicatorFeedsDescription = named(
  "custom-indicator-feeds_description",
  Type.String({ description: "The description of the example test", "x-auditable": true }),
)

export const CustomIndicatorFeedsId = named(
  "custom-indicator-feeds_id",
  Type.Integer({ description: "The unique identifier for the indicator feed", "x-auditable": true }),
)

export const CustomIndicatorFeedsIsAttributable = named(
  "custom-indicator-feeds_is_attributable",
  Type.Boolean({ description: "Whether the indicator feed can be attributed to a provider", "x-auditable": true }),
)

export const CustomIndicatorFeedsIsDownloadable = named(
  "custom-indicator-feeds_is_downloadable",
  Type.Boolean({ description: "Whether the indicator feed can be downloaded", "x-auditable": true }),
)

export const CustomIndicatorFeedsIsPublic = named(
  "custom-indicator-feeds_is_public",
  Type.Boolean({ description: "Whether the indicator feed is exposed to customers", "x-auditable": true }),
)

export const CustomIndicatorFeedsName = named(
  "custom-indicator-feeds_name",
  Type.String({ description: "The name of the indicator feed", "x-auditable": true }),
)

export const CustomIndicatorFeedsIndicatorFeedItem = named(
  "custom-indicator-feeds_indicator_feed_item",
  Type.Object({
    created_on: Type.Optional(
      Type.String({
        description: "The date and time when the data entry was created",
        format: "date-time",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    description: Type.Optional(CustomIndicatorFeedsDescription),
    id: Type.Optional(CustomIndicatorFeedsId),
    is_attributable: Type.Optional(CustomIndicatorFeedsIsAttributable),
    is_downloadable: Type.Optional(CustomIndicatorFeedsIsDownloadable),
    is_public: Type.Optional(CustomIndicatorFeedsIsPublic),
    modified_on: Type.Optional(
      Type.String({
        description: "The date and time when the data entry was last modified",
        format: "date-time",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    name: Type.Optional(CustomIndicatorFeedsName),
  }),
)

export const CustomIndicatorFeedsUpdatePublicFieldRequest = named(
  "custom-indicator-feeds_update_public_field_request",
  Type.Object({
    description: Type.Optional(Type.String({ description: "The new description of the feed", "x-auditable": true })),
    is_attributable: Type.Optional(
      Type.Boolean({ description: "The new is_attributable value of the feed", "x-auditable": true }),
    ),
    is_downloadable: Type.Optional(
      Type.Boolean({ description: "The new is_downloadable value of the feed", "x-auditable": true }),
    ),
    is_public: Type.Optional(Type.Boolean({ description: "The new is_public value of the feed", "x-auditable": true })),
    name: Type.Optional(Type.String({ description: "The new name of the feed", "x-auditable": true })),
  }),
)

export const CustomIndicatorFeedsFeedId = named(
  "custom-indicator-feeds_feed_id",
  Type.Integer({ description: "Indicator feed ID", "x-auditable": true }),
)

export const CustomIndicatorFeedsProviderName = named(
  "custom-indicator-feeds_provider_name",
  Type.String({ description: "The provider of the indicator feed", "x-auditable": true }),
)

export const CustomIndicatorFeedsProviderId = named(
  "custom-indicator-feeds_provider_id",
  Type.String({ description: "The unique identifier for the provider", "x-auditable": true }),
)

export const CustomIndicatorFeedsIndicatorFeedMetadata = named(
  "custom-indicator-feeds_indicator_feed_metadata",
  Type.Object({
    created_on: Type.Optional(
      Type.String({
        description: "The date and time when the data entry was created",
        format: "date-time",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    description: Type.Optional(CustomIndicatorFeedsDescription),
    id: Type.Optional(CustomIndicatorFeedsId),
    is_attributable: Type.Optional(CustomIndicatorFeedsIsAttributable),
    is_downloadable: Type.Optional(CustomIndicatorFeedsIsDownloadable),
    is_public: Type.Optional(CustomIndicatorFeedsIsPublic),
    latest_upload_status: Type.Optional(
      Type.Union(
        [
          Type.Literal("Mirroring"),
          Type.Literal("Unifying"),
          Type.Literal("Loading"),
          Type.Literal("Provisioning"),
          Type.Literal("Complete"),
          Type.Literal("Error"),
        ],
        { description: "Status of the latest snapshot uploaded", "x-auditable": true },
      ),
    ),
    modified_on: Type.Optional(
      Type.String({
        description: "The date and time when the data entry was last modified",
        format: "date-time",
        readOnly: true,
        "x-auditable": true,
      }),
    ),
    name: Type.Optional(CustomIndicatorFeedsName),
    provider_id: Type.Optional(CustomIndicatorFeedsProviderId),
    provider_name: Type.Optional(CustomIndicatorFeedsProviderName),
  }),
)

export const CustomIndicatorFeedsIndicatorFeedMetadataResponse = named(
  "custom-indicator-feeds_indicator_feed_metadata_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(CustomIndicatorFeedsIndicatorFeedMetadata),
  }),
)

export const CustomIndicatorFeedsPermissionListItem = named(
  "custom-indicator-feeds_permission_list_item",
  Type.Object({
    description: Type.Optional(CustomIndicatorFeedsDescription),
    id: Type.Optional(CustomIndicatorFeedsId),
    is_attributable: Type.Optional(CustomIndicatorFeedsIsAttributable),
    is_downloadable: Type.Optional(CustomIndicatorFeedsIsDownloadable),
    is_public: Type.Optional(CustomIndicatorFeedsIsPublic),
    name: Type.Optional(CustomIndicatorFeedsName),
  }),
)

export const CustomIndicatorFeedsPermissionListItemResponse = named(
  "custom-indicator-feeds_permission_list_item_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(CustomIndicatorFeedsPermissionListItem)),
  }),
)

export const CustomIndicatorFeedsPermissionsUpdate = named(
  "custom-indicator-feeds_permissions_update",
  Type.Object({
    success: Type.Optional(Type.Boolean({ description: "Whether the update succeeded or not", "x-auditable": true })),
  }),
)

export const CustomIndicatorFeedsPermissionsResponse = named(
  "custom-indicator-feeds_permissions_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(CustomIndicatorFeedsPermissionsUpdate),
  }),
)

export const CustomIndicatorFeedsPermissionsRequest = named(
  "custom-indicator-feeds_permissions_request",
  Type.Object({
    account_tag: Type.Optional(
      Type.String({
        description: "The Cloudflare account tag of the account to change permissions on",
        "x-auditable": true,
      }),
    ),
    feed_id: Type.Optional(
      Type.Integer({ description: "The ID of the feed to add/remove permissions on", "x-auditable": true }),
    ),
  }),
)

export const CustomIndicatorFeedsCreateFeedResponse = named(
  "custom-indicator-feeds_create_feed_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(CustomIndicatorFeedsIndicatorFeedItem),
  }),
)

export const CustomIndicatorFeedsCreateFeed = named(
  "custom-indicator-feeds_create_feed",
  Type.Object({
    description: Type.Optional(CustomIndicatorFeedsDescription),
    name: Type.Optional(CustomIndicatorFeedsName),
  }),
)

export const CustomIndicatorFeedsIndicatorFeedResponse = named(
  "custom-indicator-feeds_indicator_feed_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(CustomIndicatorFeedsIndicatorFeedItem)),
  }),
)

export const IntelAdditionalInformation = named(
  "intel_additional_information",
  Type.Object(
    {
      suspected_malware_family: Type.Optional(
        Type.String({ description: "Suspected DGA malware family.", "x-auditable": true }),
      ),
    },
    { description: "Additional information related to the host name." },
  ),
)

export const IntelApplication = named(
  "intel_application",
  Type.Object(
    {
      id: Type.Optional(Type.Integer({ "x-auditable": true })),
      name: Type.Optional(Type.String({ "x-auditable": true })),
    },
    { description: "Application that the hostname belongs to." },
  ),
)

export const IntelContentCategories = named(
  "intel_content_categories",
  Type.Array(
    Type.Object(
      {
        id: Type.Optional(Type.Integer({ "x-auditable": true })),
        name: Type.Optional(Type.String({ "x-auditable": true })),
        super_category_id: Type.Optional(Type.Integer({ "x-auditable": true })),
      },
      { description: "Current content categories." },
    ),
  ),
)

export const IntelDomainName = named("intel_domain_name", Type.String({ "x-auditable": true }))

export const IntelCategoryWithSuperCategoryId = named(
  "intel_category_with_super_category_id",
  Type.Object({
    id: Type.Optional(Type.Integer({ "x-auditable": true })),
    name: Type.Optional(Type.String({ "x-auditable": true })),
    super_category_id: Type.Optional(Type.Integer({ "x-auditable": true })),
  }),
)

export const IntelCategoriesWithSuperCategoryIdsExampleEmpty = named(
  "intel_categories_with_super_category_ids_example_empty",
  Type.Array(IntelCategoryWithSuperCategoryId),
)

export const IntelRiskTypes = named("intel_risk_types", IntelCategoriesWithSuperCategoryIdsExampleEmpty)

export const IntelInheritedFrom = named(
  "intel_inherited_from",
  Type.String({
    description:
      "Domain from which `inherited_content_categories` and `inherited_risk_types` are inherited, if applicable.",
    "x-auditable": true,
  }),
)

export const IntelPopularityRank = named(
  "intel_popularity_rank",
  Type.Integer({
    description:
      "Global Cloudflare 100k ranking for the last 30 days, if available for the hostname. The top ranked domain is 1, the lowest ranked domain is 100,000.",
    "x-auditable": true,
  }),
)

export const IntelRiskScore = named(
  "intel_risk_score",
  Type.Number({ description: "Hostname risk score, which is a value between 0 (lowest risk) to 1 (highest risk)." }),
)

export const IntelCollectionResponse = named(
  "intel_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([
      Type.Array(
        Type.Object({
          additional_information: Type.Optional(IntelAdditionalInformation),
          application: Type.Optional(IntelApplication),
          content_categories: Type.Optional(IntelContentCategories),
          domain: Type.Optional(IntelDomainName),
          inherited_content_categories: Type.Optional(IntelRiskTypes),
          inherited_from: Type.Optional(IntelInheritedFrom),
          inherited_risk_types: Type.Optional(IntelRiskTypes),
          popularity_rank: Type.Optional(IntelPopularityRank),
          risk_score: Type.Optional(IntelRiskScore),
          risk_types: Type.Optional(IntelRiskTypes),
        }),
      ),
      Type.Null(),
    ]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IntelResultInfo),
  }),
)

export const IntelDomainHistory = named(
  "intel_domain-history",
  Type.Object({
    categorizations: Type.Optional(
      Type.Array(
        Type.Object({
          categories: Type.Optional(
            Type.Array(
              Type.Object({
                id: Type.Optional(Type.Integer()),
                name: Type.Optional(Type.String()),
              }),
            ),
          ),
          end: Type.Optional(Type.String({ format: "date", "x-auditable": true })),
          start: Type.Optional(Type.String({ format: "date", "x-auditable": true })),
        }),
      ),
    ),
    domain: Type.Optional(IntelDomainName),
  }),
)

export const IntelResponse = named(
  "intel_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(IntelDomainHistory), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IntelResultInfo),
  }),
)

export const IntelStixIdentifier = named(
  "intel_stix_identifier",
  Type.String({
    description:
      "STIX 2.1 identifier: https://docs.oasis-open.org/cti/stix/v2.1/cs02/stix-v2.1-cs02.html#_64yvzeku5a5c.",
    "x-auditable": true,
  }),
)

export const IntelResolvesToRef = named(
  "intel_resolves_to_ref",
  Type.Object({
    id: Type.Optional(IntelStixIdentifier),
    value: Type.Optional(Type.String({ description: "IP address or domain name.", "x-auditable": true })),
  }),
)

export const IntelResolvesToRefs = named(
  "intel_resolves_to_refs",
  Type.Array(IntelResolvesToRef, {
    description:
      "Specifies a list of references to one or more IP addresses or domain names that the domain name currently resolves to.",
  }),
)

export const IntelDomain = named(
  "intel_domain",
  Type.Object({
    additional_information: Type.Optional(IntelAdditionalInformation),
    application: Type.Optional(IntelApplication),
    content_categories: Type.Optional(IntelContentCategories),
    domain: Type.Optional(IntelDomainName),
    inherited_content_categories: Type.Optional(IntelRiskTypes),
    inherited_from: Type.Optional(IntelInheritedFrom),
    inherited_risk_types: Type.Optional(IntelRiskTypes),
    popularity_rank: Type.Optional(IntelPopularityRank),
    resolves_to_refs: Type.Optional(IntelResolvesToRefs),
    risk_score: Type.Optional(IntelRiskScore),
    risk_types: Type.Optional(IntelRiskTypes),
  }),
)

export const IntelSingleResponse = named(
  "intel_single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(IntelDomain),
  }),
)

export const IntelStartEndParams = named(
  "intel_start_end_params",
  Type.Object({
    end: Type.Optional(
      Type.String({ description: "Defaults to the current date.", format: "date", "x-auditable": true }),
    ),
    start: Type.Optional(
      Type.String({
        description: "Defaults to 30 days before the end parameter value.",
        format: "date",
        "x-auditable": true,
      }),
    ),
  }),
)

export const IntelPassiveDnsByIp = named(
  "intel_passive-dns-by-ip",
  Type.Object({
    count: Type.Optional(Type.Number({ description: "Total results returned based on your search parameters." })),
    page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
    per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
    reverse_records: Type.Optional(
      Type.Array(
        Type.Object({
          first_seen: Type.Optional(
            Type.String({
              description: "First seen date of the DNS record during the time period.",
              format: "date",
              "x-auditable": true,
            }),
          ),
          hostname: Type.Optional(
            Type.String({ description: "Hostname that the IP was observed resolving to.", "x-auditable": true }),
          ),
          last_seen: Type.Optional(
            Type.String({
              description: "Last seen date of the DNS record during the time period.",
              format: "date",
              "x-auditable": true,
            }),
          ),
        }),
        { description: "Reverse DNS look-ups observed during the time period." },
      ),
    ),
  }),
)

export const IntelComponentsSchemasSingleResponse = named(
  "intel_components-schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IntelResultInfo),
    result: Type.Optional(IntelPassiveDnsByIp),
  }),
)

export const IntelPerPage = named(
  "intel_per_page",
  Type.Number({ description: "Number of results per page of results." }),
)

export const IntelPage = named(
  "intel_page",
  Type.Number({ description: "Current page within paginated list of results." }),
)

export const IntelCount = named(
  "intel_count",
  Type.Number({ description: "Total results returned based on your search parameters." }),
)

export const IntelAsnComponentsSchemasResponse = named(
  "intel_asn_components-schemas-response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(IntelAsn),
  }),
)

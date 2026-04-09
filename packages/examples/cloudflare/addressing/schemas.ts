import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, DlsTimestamp, MagicPrefix } from "../shared/schemas"

export const DlsApiResponseCommon = named(
  "dls_api-response-common",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const DlsRouting = named(
  "dls_routing",
  Type.String({
    description: "Configure which routing method to use for the regional hostname",
    default: "dns",
    "x-auditable": true,
  }),
)

export const DlsHostname = named(
  "dls_hostname",
  Type.String({
    description:
      "DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g `*.example.com`",
    "x-auditable": true,
  }),
)

export const DlsRegionKey = named(
  "dls_region_key",
  Type.String({ description: "Identifying key for the region", "x-auditable": true }),
)

export const DlsRegionalHostnameResponse = named(
  "dls_regional_hostname_response",
  Type.Object({
    created_on: DlsTimestamp,
    hostname: DlsHostname,
    region_key: DlsRegionKey,
    routing: Type.Optional(DlsRouting),
  }),
)

export const AddressingServiceName = named(
  "addressing_service_name",
  Type.String({ description: "Name of a service running on the Cloudflare network", "x-auditable": true }),
)

export const AddressingServiceIdentifier = named(
  "addressing_service_identifier",
  Type.String({
    description:
      "Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the\n**List Services** endpoint.\n",
    maxLength: 32,
    "x-auditable": true,
  }),
)

export const DlsApiResponseCommonFailure = named(
  "dls_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const AddressingDelegationIdentifier = named(
  "addressing_delegation_identifier",
  Type.String({ description: "Identifier of a Delegation.", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const AddressingIdResponse = named(
  "addressing_id_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        id: Type.Optional(AddressingDelegationIdentifier),
      }),
    ),
  }),
)

export const AddressingDelegatedAccountIdentifier = named(
  "addressing_delegated_account_identifier",
  Type.String({
    description: "Account identifier for the account to which prefix is being delegated.",
    maxLength: 32,
    "x-auditable": true,
  }),
)

export const AddressingPrefixIdentifier = named(
  "addressing_prefix_identifier",
  Type.String({ description: "Identifier of an IP Prefix.", maxLength: 32, "x-auditable": true }),
)

export const AddressingIpamDelegations = named(
  "addressing_ipam-delegations",
  Type.Object({
    cidr: Type.Optional(MagicPrefix),
    created_at: Type.Optional(DlsTimestamp),
    delegated_account_id: Type.Optional(AddressingDelegatedAccountIdentifier),
    id: Type.Optional(AddressingDelegationIdentifier),
    modified_at: Type.Optional(DlsTimestamp),
    parent_prefix_id: Type.Optional(AddressingPrefixIdentifier),
  }),
)

export const AddressingSchemasSingleResponse = named(
  "addressing_schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AddressingIpamDelegations),
  }),
)

export const AddressingSchemasResponseCollection = named(
  "addressing_schemas-response_collection",
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
    result: Type.Optional(Type.Array(AddressingIpamDelegations)),
  }),
)

export const AddressingServiceBindingIdentifier = named(
  "addressing_service_binding_identifier",
  Type.String({ description: "Identifier of a Service Binding.", maxLength: 32, "x-auditable": true }),
)

export const AddressingCreateBindingRequest = named(
  "addressing_create_binding_request",
  Type.Object({
    cidr: Type.Optional(MagicPrefix),
    service_id: Type.Optional(AddressingServiceIdentifier),
  }),
)

export const AddressingProvisioning = named(
  "addressing_provisioning",
  Type.Object(
    {
      state: Type.Optional(
        Type.Union([Type.Literal("provisioning"), Type.Literal("active")], {
          description:
            "When a binding has been deployed to a majority of Cloudflare datacenters, the binding will become active and can be used with its associated service.\n",
          "x-auditable": true,
        }),
      ),
    },
    { description: "Status of a Service Binding's deployment to the Cloudflare network" },
  ),
)

export const AddressingServiceBinding = named(
  "addressing_service_binding",
  Type.Object({
    cidr: Type.Optional(MagicPrefix),
    id: Type.Optional(AddressingServiceBindingIdentifier),
    provisioning: Type.Optional(AddressingProvisioning),
    service_id: Type.Optional(AddressingServiceIdentifier),
    service_name: Type.Optional(AddressingServiceName),
  }),
)

export const AddressingModifiedAtNullable = named(
  "addressing_modified_at_nullable",
  Type.Union([
    Type.String({
      description:
        "Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.",
      format: "date-time",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const AddressingComponentsSchemasAdvertised = named(
  "addressing_components-schemas-advertised",
  Type.Boolean({
    description:
      "Advertisement status of the prefix. If `true`, the BGP route for the prefix is advertised to the Internet. If \n`false`, the BGP route is withdrawn.\n",
    "x-auditable": true,
  }),
)

export const AddressingAdvertisedResponse = named(
  "addressing_advertised_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        advertised: Type.Optional(AddressingComponentsSchemasAdvertised),
        advertised_modified_at: Type.Optional(AddressingModifiedAtNullable),
      }),
    ),
  }),
)

export const AddressingApiResponseCommon = named(
  "addressing_api-response-common",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const AddressingAsnPrependCount = named(
  "addressing_asn_prepend_count",
  Type.Integer({
    description: "Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute",
    default: 0,
    minimum: 0,
    maximum: 3,
    "x-auditable": true,
  }),
)

export const AddressingAutoAdvertiseWithdraw = named(
  "addressing_auto_advertise_withdraw",
  Type.Boolean({
    description:
      "Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.",
    default: false,
    "x-auditable": true,
  }),
)

export const AddressingBgpPrefixUpdateAdvertisement = named(
  "addressing_bgp_prefix_update_advertisement",
  Type.Object({
    asn_prepend_count: Type.Optional(AddressingAsnPrependCount),
    auto_advertise_withdraw: Type.Optional(AddressingAutoAdvertiseWithdraw),
    on_demand: Type.Optional(
      Type.Object({
        advertised: Type.Optional(Type.Boolean()),
      }),
    ),
  }),
)

export const AddressingSchemasAdvertised = named(
  "addressing_schemas-advertised",
  Type.Union([
    Type.Boolean({
      description:
        "Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const AddressingSchemasOnDemandEnabled = named(
  "addressing_schemas-on_demand_enabled",
  Type.Boolean({
    description: "Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.",
    "x-auditable": true,
  }),
)

export const AddressingSchemasOnDemandLocked = named(
  "addressing_schemas-on_demand_locked",
  Type.Boolean({
    description: "Whether advertisement status of the prefix is locked, meaning it cannot be changed.",
    "x-auditable": true,
  }),
)

export const AddressingBgpOnDemand = named(
  "addressing_bgp_on_demand",
  Type.Object({
    advertised: Type.Optional(AddressingSchemasAdvertised),
    advertised_modified_at: Type.Optional(AddressingModifiedAtNullable),
    on_demand_enabled: Type.Optional(AddressingSchemasOnDemandEnabled),
    on_demand_locked: Type.Optional(AddressingSchemasOnDemandLocked),
  }),
)

export const AddressingBgpPrefixIdentifier = named(
  "addressing_bgp_prefix_identifier",
  Type.String({ description: "Identifier of BGP Prefix.", maxLength: 32, "x-auditable": true }),
)

export const AddressingBgpSignalingEnabled = named(
  "addressing_bgp_signaling_enabled",
  Type.Boolean({
    description:
      "Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal",
    "x-auditable": true,
  }),
)

export const AddressingBgpSignalingModifiedAt = named(
  "addressing_bgp_signaling_modified_at",
  Type.Union([
    Type.String({
      description:
        "Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.",
      format: "date-time",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const AddressingBgpSignalOpts = named(
  "addressing_bgp_signal_opts",
  Type.Object({
    enabled: Type.Optional(AddressingBgpSignalingEnabled),
    modified_at: Type.Optional(AddressingBgpSignalingModifiedAt),
  }),
)

export const AddressingAsn = named(
  "addressing_asn",
  Type.Union([
    Type.Integer({
      description: "Autonomous System Number (ASN) the prefix will be advertised under.",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const AddressingIpamBgpPrefixes = named(
  "addressing_ipam-bgp-prefixes",
  Type.Object({
    asn: Type.Optional(AddressingAsn),
    asn_prepend_count: Type.Optional(AddressingAsnPrependCount),
    auto_advertise_withdraw: Type.Optional(AddressingAutoAdvertiseWithdraw),
    bgp_signal_opts: Type.Optional(AddressingBgpSignalOpts),
    cidr: Type.Optional(MagicPrefix),
    created_at: Type.Optional(DlsTimestamp),
    id: Type.Optional(AddressingBgpPrefixIdentifier),
    modified_at: Type.Optional(DlsTimestamp),
    on_demand: Type.Optional(AddressingBgpOnDemand),
  }),
)

export const AddressingSingleResponseBgp = named(
  "addressing_single_response_bgp",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AddressingIpamBgpPrefixes),
  }),
)

export const AddressingBgpPrefixCreate = named(
  "addressing_bgp_prefix_create",
  Type.Object({
    cidr: Type.Optional(MagicPrefix),
  }),
)

export const AddressingResponseCollectionBgp = named(
  "addressing_response_collection_bgp",
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
    result: Type.Optional(Type.Array(AddressingIpamBgpPrefixes)),
  }),
)

export const AddressingOnDemandLocked = named(
  "addressing_on_demand_locked",
  Type.Boolean({
    description: "Whether advertisement status of the prefix is locked, meaning it cannot be changed.",
    deprecated: true,
    "x-auditable": true,
    "x-stainless-deprecation-message":
      "Prefer the [BGP Prefixes API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/) instead, which allows for advertising multiple BGP routes within a single IP Prefix.",
  }),
)

export const AddressingOnDemandEnabled = named(
  "addressing_on_demand_enabled",
  Type.Boolean({
    description: "Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.",
    deprecated: true,
    "x-auditable": true,
    "x-stainless-deprecation-message":
      "Prefer the [BGP Prefixes API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/) instead, which allows for advertising multiple BGP routes within a single IP Prefix.",
  }),
)

export const AddressingDescription = named(
  "addressing_description",
  Type.String({ description: "Description of the prefix.", maxLength: 1000, "x-auditable": true }),
)

export const AddressingApproved = named(
  "addressing_approved",
  Type.String({ description: "Approval state of the prefix (P = pending, V = active).", "x-auditable": true }),
)

export const AddressingAdvertisedModifiedAtNullable = named(
  "addressing_advertised_modified_at_nullable",
  Type.Union([
    Type.String({
      description:
        "Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.",
      format: "date-time",
      deprecated: true,
      "x-auditable": true,
      "x-stainless-deprecation-message":
        "Prefer the [BGP Prefixes API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/) instead, which allows for advertising multiple BGP routes within a single IP Prefix.",
    }),
    Type.Null(),
  ]),
)

export const AddressingAdvertised = named(
  "addressing_advertised",
  Type.Union([
    Type.Boolean({
      description:
        "Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.",
      deprecated: true,
      "x-auditable": true,
      "x-stainless-deprecation-message":
        "Prefer the [BGP Prefixes API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/) instead, which allows for advertising multiple BGP routes within a single IP Prefix.",
    }),
    Type.Null(),
  ]),
)

export const AddressingAccountIdentifier = named(
  "addressing_account_identifier",
  Type.String({ description: "Identifier of a Cloudflare account.", maxLength: 32, "x-auditable": true }),
)

export const AddressingLoaDocumentIdentifier = named(
  "addressing_loa_document_identifier",
  Type.Union([
    Type.String({ description: "Identifier for the uploaded LOA document.", maxLength: 32, "x-auditable": true }),
    Type.Null(),
  ]),
)

export const AddressingIpamPrefixes = named(
  "addressing_ipam-prefixes",
  Type.Object({
    account_id: Type.Optional(AddressingAccountIdentifier),
    advertised: Type.Optional(AddressingAdvertised),
    advertised_modified_at: Type.Optional(AddressingAdvertisedModifiedAtNullable),
    approved: Type.Optional(AddressingApproved),
    asn: Type.Optional(AddressingAsn),
    cidr: Type.Optional(MagicPrefix),
    created_at: Type.Optional(DlsTimestamp),
    description: Type.Optional(AddressingDescription),
    id: Type.Optional(AddressingPrefixIdentifier),
    loa_document_id: Type.Optional(AddressingLoaDocumentIdentifier),
    modified_at: Type.Optional(DlsTimestamp),
    on_demand_enabled: Type.Optional(AddressingOnDemandEnabled),
    on_demand_locked: Type.Optional(AddressingOnDemandLocked),
  }),
)

export const AddressingSingleResponse = named(
  "addressing_single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AddressingIpamPrefixes),
  }),
)

export const AddressingResponseCollection = named(
  "addressing_response_collection",
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
    result: Type.Optional(Type.Array(AddressingIpamPrefixes)),
  }),
)

export const AddressingApiResponseCommonFailure = named(
  "addressing_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const AddressingVerifiedAt = named(
  "addressing_verified_at",
  Type.Union([
    Type.String({
      description: "Timestamp of the moment the LOA was marked as validated.",
      format: "date-time",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const AddressingVerified = named(
  "addressing_verified",
  Type.Boolean({ description: "Whether the LOA has been verified by Cloudflare staff.", "x-auditable": true }),
)

export const AddressingSizeBytes = named(
  "addressing_size_bytes",
  Type.Integer({ description: "File size of the uploaded LOA document.", "x-auditable": true }),
)

export const AddressingFilename = named(
  "addressing_filename",
  Type.String({
    description: "Name of LOA document. Max file size 10MB, and supported filetype is pdf.",
    "x-auditable": true,
  }),
)

export const AddressingLoaUploadResponse = named(
  "addressing_loa_upload_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        account_id: Type.Optional(AddressingAccountIdentifier),
        created: Type.Optional(DlsTimestamp),
        filename: Type.Optional(AddressingFilename),
        id: Type.Optional(AddressingLoaDocumentIdentifier),
        size_bytes: Type.Optional(AddressingSizeBytes),
        verified: Type.Optional(AddressingVerified),
        verified_at: Type.Optional(AddressingVerifiedAt),
      }),
    ),
  }),
)

export const AddressingSchemasAccountIdentifier = named(
  "addressing_schemas-account_identifier",
  Type.String({ description: "Identifier of a Cloudflare account.", maxLength: 32 }),
)

export const AddressingSchemasCidr = named(
  "addressing_schemas-cidr",
  Type.String({ description: "IP Prefix in Classless Inter-Domain Routing format." }),
)

export const AddressingCreatedAt = named(
  "addressing_created_at",
  Type.String({ description: "Timestamp of the moment the object was created.", format: "date-time" }),
)

export const AddressingLeaseId = named("addressing_lease_id", Type.String({ description: "Identifier for the lease" }))

export const AddressingModifiedAt = named(
  "addressing_modified_at",
  Type.String({ description: "Timestamp of the moment the object was modified.", format: "date-time" }),
)

export const AddressingLeaseOwnerId = named(
  "addressing_lease_owner_id",
  Type.String({ description: "Cloudflare account ID of the account owning the lease." }),
)

export const AddressingLease = named(
  "addressing_lease",
  Type.Object({
    active_from: Type.Optional(
      Type.String({ description: "Timestamp of the moment the lease was created.\n", format: "date-time" }),
    ),
    cidrs: Type.Optional(Type.Array(AddressingSchemasCidr, { description: "CIDRs attached to the lease" })),
    created_at: Type.Optional(AddressingCreatedAt),
    id: Type.Optional(AddressingLeaseId),
    modified_at: Type.Optional(AddressingModifiedAt),
    owner_id: Type.Optional(AddressingLeaseOwnerId),
    purpose: Type.Optional(Type.String({ description: "Describes the purpose of the addresses." })),
  }),
)

export const AddressingLeasesComponentsSchemasResponseCollection = named(
  "addressing_leases_components-schemas-response_collection",
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
    result: Type.Optional(Type.Array(AddressingLease)),
  }),
)

export const AddressingZoneIdentifier = named(
  "addressing_zone_identifier",
  Type.String({ description: "Identifier of a zone.", maxLength: 32, "x-auditable": true }),
)

export const AddressingApiResponseCollection = named(
  "addressing_api-response-collection",
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
  }),
)

export const AddressingCanDelete = named(
  "addressing_can_delete",
  Type.Boolean({
    description:
      "If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const AddressingCanModifyIps = named(
  "addressing_can_modify_ips",
  Type.Boolean({
    description:
      "If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const AddressingDefaultSni = named(
  "addressing_default_sni",
  Type.Union([
    Type.String({
      description:
        "If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it will respond with the default SNI on those IPs. The default SNI can be any valid zone or subdomain owned by the account.",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const AddressingSchemasDescription = named(
  "addressing_schemas-description",
  Type.Union([
    Type.String({
      description: "An optional description field which may be used to describe the types of IPs or zones on the map.",
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const AddressingEnabled = named(
  "addressing_enabled",
  Type.Union([
    Type.Boolean({
      description:
        "Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.",
      default: false,
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const AddressingAddressMapIdentifier = named(
  "addressing_address_map_identifier",
  Type.String({ description: "Identifier of an Address Map.", maxLength: 32, "x-auditable": true }),
)

export const AddressingAddressMaps = named(
  "addressing_address-maps",
  Type.Object({
    can_delete: Type.Optional(AddressingCanDelete),
    can_modify_ips: Type.Optional(AddressingCanModifyIps),
    created_at: Type.Optional(DlsTimestamp),
    default_sni: Type.Optional(AddressingDefaultSni),
    description: Type.Optional(AddressingSchemasDescription),
    enabled: Type.Optional(AddressingEnabled),
    id: Type.Optional(AddressingAddressMapIdentifier),
    modified_at: Type.Optional(DlsTimestamp),
  }),
)

export const AddressingComponentsSchemasSingleResponse = named(
  "addressing_components-schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AddressingAddressMaps),
  }),
)

export const AddressingSchemasCanDelete = named(
  "addressing_schemas-can_delete",
  Type.Boolean({
    description: "Controls whether the membership can be deleted via the API or not.",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const AddressingIdentifier = named(
  "addressing_identifier",
  Type.String({
    description: "The identifier for the membership (eg. a zone or account tag).",
    maxLength: 32,
    "x-auditable": true,
  }),
)

export const AddressingKind = named(
  "addressing_kind",
  Type.Union([Type.Literal("zone"), Type.Literal("account")], {
    description: "The type of the membership.",
    "x-auditable": true,
  }),
)

export const AddressingAddressMapsMembership = named(
  "addressing_address-maps-membership",
  Type.Object({
    can_delete: Type.Optional(AddressingSchemasCanDelete),
    created_at: Type.Optional(DlsTimestamp),
    identifier: Type.Optional(AddressingIdentifier),
    kind: Type.Optional(AddressingKind),
  }),
)

export const AddressingMemberships = named(
  "addressing_memberships",
  Type.Array(AddressingAddressMapsMembership, {
    description:
      "Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership.",
  }),
)

export const AddressingIp = named(
  "addressing_ip",
  Type.String({ description: "An IPv4 or IPv6 address.", "x-auditable": true }),
)

export const AddressingAddressMapsIp = named(
  "addressing_address-maps-ip",
  Type.Object({
    created_at: Type.Optional(DlsTimestamp),
    ip: Type.Optional(AddressingIp),
  }),
)

export const AddressingIps = named(
  "addressing_ips",
  Type.Array(AddressingAddressMapsIp, {
    description: "The set of IPs on the Address Map.",
    "x-stainless-naming": { node: { model_name: "ips_array" } },
  }),
)

export const AddressingFullResponse = named(
  "addressing_full_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        can_delete: Type.Optional(AddressingCanDelete),
        can_modify_ips: Type.Optional(AddressingCanModifyIps),
        created_at: Type.Optional(DlsTimestamp),
        default_sni: Type.Optional(AddressingDefaultSni),
        description: Type.Optional(AddressingSchemasDescription),
        enabled: Type.Optional(AddressingEnabled),
        id: Type.Optional(AddressingAddressMapIdentifier),
        modified_at: Type.Optional(DlsTimestamp),
        ips: Type.Optional(AddressingIps),
        memberships: Type.Optional(AddressingMemberships),
      }),
    ),
  }),
)

export const AddressingAddressMapsMembershipRequest = named(
  "addressing_address-maps-membership-request",
  Type.Object({
    identifier: Type.Optional(AddressingIdentifier),
    kind: Type.Optional(AddressingKind),
  }),
)

export const AddressingMembershipRequests = named(
  "addressing_membership_requests",
  Type.Array(AddressingAddressMapsMembershipRequest, {
    description:
      "Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership.",
  }),
)

export const AddressingComponentsSchemasResponseCollection = named(
  "addressing_components-schemas-response_collection",
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
    result: Type.Optional(Type.Array(AddressingAddressMaps)),
  }),
)

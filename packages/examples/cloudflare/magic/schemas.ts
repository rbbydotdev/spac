import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages, DlpEmpty, MagicIdentifier, MagicPrefix, McnPolicyResult } from "../shared/schemas"

export const MagicPort = named("magic_port", Type.Integer())

export const MagicCidr = named(
  "magic_cidr",
  Type.String({ description: "A valid CIDR notation representing an IP range." }),
)

export const MagicIpAddress = named("magic_ip-address", Type.String({ description: "A valid IPv4 address." }))

export const MagicWanStaticAddressing = named(
  "magic_wan_static_addressing",
  Type.Object(
    {
      address: MagicCidr,
      gateway_address: MagicIpAddress,
      secondary_address: Type.Optional(MagicCidr),
    },
    {
      description: "(optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.",
    },
  ),
)

export const MagicVlanTag = named(
  "magic_vlan_tag",
  Type.Integer({ description: "VLAN ID. Use zero for untagged.", "x-auditable": true }),
)

export const MagicWan = named(
  "magic_wan",
  Type.Object({
    health_check_rate: Type.Optional(
      Type.Union([Type.Literal("low"), Type.Literal("mid"), Type.Literal("high")], {
        description: "Magic WAN health check rate for tunnels created on this link. The default value is `mid`.",
      }),
    ),
    id: Type.Optional(MagicIdentifier),
    name: Type.Optional(Type.String()),
    physport: Type.Optional(MagicPort),
    priority: Type.Optional(Type.Integer({ description: "Priority of WAN for traffic loadbalancing." })),
    site_id: Type.Optional(MagicIdentifier),
    static_addressing: Type.Optional(MagicWanStaticAddressing),
    vlan_tag: Type.Optional(MagicVlanTag),
  }),
)

export const MagicWanUpdateRequest = named(
  "magic_wan_update_request",
  Type.Object({
    name: Type.Optional(Type.String()),
    physport: Type.Optional(MagicPort),
    priority: Type.Optional(Type.Integer()),
    static_addressing: Type.Optional(MagicWanStaticAddressing),
    vlan_tag: Type.Optional(MagicVlanTag),
  }),
)

export const MagicWanSingleResponse = named(
  "magic_wan_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: MagicWan,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicWansAddSingleRequest = named(
  "magic_wans_add_single_request",
  Type.Object({
    name: Type.Optional(Type.String()),
    physport: MagicPort,
    priority: Type.Optional(Type.Integer()),
    static_addressing: Type.Optional(MagicWanStaticAddressing),
    vlan_tag: Type.Optional(MagicVlanTag),
  }),
)

export const MagicWansCollectionResponse = named(
  "magic_wans_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Array(MagicWan),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicNat = named(
  "magic_nat",
  Type.Object({
    static_prefix: Type.Optional(MagicCidr),
  }),
)

export const MagicRoutedSubnet = named(
  "magic_routed_subnet",
  Type.Object({
    nat: Type.Optional(MagicNat),
    next_hop: MagicIpAddress,
    prefix: MagicCidr,
  }),
)

export const MagicLanDhcpRelay = named(
  "magic_lan_dhcp_relay",
  Type.Object({
    server_addresses: Type.Optional(Type.Array(MagicIpAddress, { description: "List of DHCP server IPs." })),
  }),
)

export const MagicLanDhcpServer = named(
  "magic_lan_dhcp_server",
  Type.Object({
    dhcp_pool_end: Type.Optional(MagicIpAddress),
    dhcp_pool_start: Type.Optional(MagicIpAddress),
    dns_server: Type.Optional(MagicIpAddress),
    dns_servers: Type.Optional(Type.Array(MagicIpAddress)),
    reservations: Type.Optional(
      Type.Record(Type.String(), Type.String({ description: "IP address associated with the MAC address" })),
    ),
  }),
)

export const MagicLanStaticAddressing = named(
  "magic_lan_static_addressing",
  Type.Object(
    {
      address: MagicCidr,
      dhcp_relay: Type.Optional(MagicLanDhcpRelay),
      dhcp_server: Type.Optional(MagicLanDhcpServer),
      secondary_address: Type.Optional(MagicCidr),
      virtual_address: Type.Optional(MagicCidr),
    },
    {
      description:
        "If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.",
    },
  ),
)

export const MagicLan = named(
  "magic_lan",
  Type.Object({
    ha_link: Type.Optional(
      Type.Boolean({
        description:
          "mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.",
      }),
    ),
    id: Type.Optional(MagicIdentifier),
    name: Type.Optional(Type.String()),
    nat: Type.Optional(MagicNat),
    physport: Type.Optional(MagicPort),
    routed_subnets: Type.Optional(Type.Array(MagicRoutedSubnet)),
    site_id: Type.Optional(MagicIdentifier),
    static_addressing: Type.Optional(MagicLanStaticAddressing),
    vlan_tag: Type.Optional(MagicVlanTag),
  }),
)

export const MagicLanUpdateRequest = named(
  "magic_lan_update_request",
  Type.Object({
    name: Type.Optional(Type.String()),
    nat: Type.Optional(MagicNat),
    physport: Type.Optional(MagicPort),
    routed_subnets: Type.Optional(Type.Array(MagicRoutedSubnet)),
    static_addressing: Type.Optional(MagicLanStaticAddressing),
    vlan_tag: Type.Optional(MagicVlanTag),
  }),
)

export const MagicLanSingleResponse = named(
  "magic_lan_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: MagicLan,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicLansAddSingleRequest = named(
  "magic_lans_add_single_request",
  Type.Object({
    ha_link: Type.Optional(
      Type.Boolean({
        description:
          "mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.",
      }),
    ),
    name: Type.Optional(Type.String()),
    nat: Type.Optional(MagicNat),
    physport: MagicPort,
    routed_subnets: Type.Optional(Type.Array(MagicRoutedSubnet)),
    static_addressing: Type.Optional(MagicLanStaticAddressing),
    vlan_tag: Type.Optional(MagicVlanTag),
  }),
)

export const MagicLansCollectionResponse = named(
  "magic_lans_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Array(MagicLan),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicAccountAppId = named("magic_account_app_id", Type.String({ description: "Magic account app ID." }))

export const MagicAppBreakout = named(
  "magic_app_breakout",
  Type.Boolean({
    description: "Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.",
  }),
)

export const MagicManagedAppId = named("magic_managed_app_id", Type.String({ description: "Managed app ID." }))

export const MagicAppPriority = named(
  "magic_app_priority",
  Type.Integer({
    description:
      "Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)",
    minimum: 0,
    maximum: 1,
  }),
)

export const MagicAppConfigUpdateRequest = named(
  "magic_app_config_update_request",
  Type.Object({
    account_app_id: Type.Optional(MagicAccountAppId),
    breakout: Type.Optional(MagicAppBreakout),
    managed_app_id: Type.Optional(MagicManagedAppId),
    priority: Type.Optional(MagicAppPriority),
  }),
)

export const MagicAppConfig = named(
  "magic_app_config",
  Type.Union(
    [
      Type.Object({
        account_app_id: MagicAccountAppId,
      }),
      Type.Object({
        managed_app_id: MagicManagedAppId,
      }),
    ],
    { description: "Traffic decision configuration for an app." },
  ),
)

export const MagicAppConfigSingleResponse = named(
  "magic_app_config_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: MagicAppConfig,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicAppConfigAddSingleRequest = named(
  "magic_app_config_add_single_request",
  Type.Union([
    Type.Object({
      account_app_id: MagicAccountAppId,
    }),
    Type.Object({
      managed_app_id: MagicManagedAppId,
    }),
  ]),
)

export const MagicAppConfigsCollectionResponse = named(
  "magic_app_configs_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(MagicAppConfig), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicForwardLocally = named(
  "magic_forward_locally",
  Type.Boolean({
    description:
      'The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.',
  }),
)

export const MagicAclPortRange = named(
  "magic_acl-port-range",
  Type.String({ description: "A valid port range value." }),
)

export const MagicAclSubnet = named("magic_acl-subnet", Type.Union([MagicIpAddress, MagicCidr]))

export const MagicLanAclConfiguration = named(
  "magic_lan-acl-configuration",
  Type.Object({
    lan_id: Type.String({ description: "The identifier for the LAN you want to create an ACL policy with." }),
    lan_name: Type.Optional(Type.String({ description: "The name of the LAN based on the provided lan_id." })),
    port_ranges: Type.Optional(
      Type.Array(MagicAclPortRange, {
        description:
          "Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.",
      }),
    ),
    ports: Type.Optional(
      Type.Array(MagicPort, {
        description:
          "Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.",
      }),
    ),
    subnets: Type.Optional(
      Type.Array(MagicAclSubnet, {
        description:
          "Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.",
      }),
    ),
  }),
)

export const UnnamedSchemaRef87fa9e5fe9f6b8d607be1df57340d916 = named(
  "unnamed_schema_ref_87fa9e5fe9f6b8d607be1df57340d916",
  Type.Union([Type.Literal("tcp"), Type.Literal("udp"), Type.Literal("icmp")], {
    description:
      "Array of allowed communication protocols between configured LANs. If no protocols are provided, all protocols are allowed.",
  }),
)

export const MagicUnidirectional = named(
  "magic_unidirectional",
  Type.Boolean({
    description:
      'The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.',
  }),
)

export const MagicAcl = named(
  "magic_acl",
  Type.Object(
    {
      description: Type.Optional(Type.String({ description: "Description for the ACL." })),
      forward_locally: Type.Optional(MagicForwardLocally),
      id: Type.Optional(MagicIdentifier),
      lan_1: Type.Optional(MagicLanAclConfiguration),
      lan_2: Type.Optional(MagicLanAclConfiguration),
      name: Type.Optional(Type.String({ description: "The name of the ACL." })),
      protocols: Type.Optional(Type.Array(UnnamedSchemaRef87fa9e5fe9f6b8d607be1df57340d916)),
      unidirectional: Type.Optional(MagicUnidirectional),
    },
    { description: "Bidirectional ACL policy for network traffic within a site." },
  ),
)

export const MagicAclUpdateRequest = named(
  "magic_acl_update_request",
  Type.Object({
    description: Type.Optional(Type.String({ description: "Description for the ACL." })),
    forward_locally: Type.Optional(MagicForwardLocally),
    lan_1: Type.Optional(MagicLanAclConfiguration),
    lan_2: Type.Optional(MagicLanAclConfiguration),
    name: Type.Optional(Type.String({ description: "The name of the ACL." })),
    protocols: Type.Optional(Type.Array(UnnamedSchemaRef87fa9e5fe9f6b8d607be1df57340d916)),
    unidirectional: Type.Optional(MagicUnidirectional),
  }),
)

export const MagicAclSingleResponse = named(
  "magic_acl_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: MagicAcl,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicAclsAddSingleRequest = named(
  "magic_acls_add_single_request",
  Type.Object(
    {
      description: Type.Optional(Type.String({ description: "Description for the ACL." })),
      forward_locally: Type.Optional(MagicForwardLocally),
      lan_1: MagicLanAclConfiguration,
      lan_2: MagicLanAclConfiguration,
      name: Type.String({ description: "The name of the ACL." }),
      protocols: Type.Optional(Type.Array(UnnamedSchemaRef87fa9e5fe9f6b8d607be1df57340d916)),
      unidirectional: Type.Optional(MagicUnidirectional),
    },
    { description: "Bidirectional ACL policy for local network traffic within a site." },
  ),
)

export const MagicAclsCollectionResponse = named(
  "magic_acls_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Array(MagicAcl),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicConnectorId = named(
  "magic_connector-id",
  Type.String({ description: "Magic Connector identifier tag.", "x-auditable": true }),
)

export const MagicSiteLocation = named(
  "magic_site-location",
  Type.Object(
    {
      lat: Type.Optional(Type.String({ description: "Latitude", "x-auditable": true })),
      lon: Type.Optional(Type.String({ description: "Longitude", "x-auditable": true })),
    },
    { description: "Location of site in latitude and longitude." },
  ),
)

export const MagicSiteName = named(
  "magic_site-name",
  Type.String({ description: "The name of the site.", "x-auditable": true }),
)

export const MagicSecondaryConnectorId = named(
  "magic_secondary-connector-id",
  Type.String({
    description: "Magic Connector identifier tag. Used when high availability mode is on.",
    "x-auditable": true,
  }),
)

export const MagicSite = named(
  "magic_site",
  Type.Object({
    connector_id: Type.Optional(MagicConnectorId),
    description: Type.Optional(Type.String()),
    ha_mode: Type.Optional(
      Type.Boolean({
        description:
          "Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.",
      }),
    ),
    id: Type.Optional(MagicIdentifier),
    location: Type.Optional(MagicSiteLocation),
    name: Type.Optional(MagicSiteName),
    secondary_connector_id: Type.Optional(MagicSecondaryConnectorId),
  }),
)

export const MagicSiteUpdateRequest = named(
  "magic_site_update_request",
  Type.Object({
    connector_id: Type.Optional(MagicConnectorId),
    description: Type.Optional(Type.String()),
    location: Type.Optional(MagicSiteLocation),
    name: Type.Optional(MagicSiteName),
    secondary_connector_id: Type.Optional(MagicSecondaryConnectorId),
  }),
)

export const MagicSiteSingleResponse = named(
  "magic_site_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: MagicSite,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicSitesAddSingleRequest = named(
  "magic_sites_add_single_request",
  Type.Object({
    connector_id: Type.Optional(MagicConnectorId),
    description: Type.Optional(Type.String()),
    ha_mode: Type.Optional(
      Type.Boolean({
        description:
          "Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.",
      }),
    ),
    location: Type.Optional(MagicSiteLocation),
    name: MagicSiteName,
    secondary_connector_id: Type.Optional(MagicSecondaryConnectorId),
  }),
)

export const MagicSitesCollectionResponse = named(
  "magic_sites_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Array(MagicSite),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicCreatedOn = named(
  "magic_created_on",
  Type.String({ description: "When the route was created.", format: "date-time", readOnly: true, "x-auditable": true }),
)

export const MagicDescription = named(
  "magic_description",
  Type.String({ description: "An optional human provided description of the static route.", "x-auditable": true }),
)

export const MagicModifiedOn = named(
  "magic_modified_on",
  Type.String({
    description: "When the route was last modified.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const MagicNexthop = named(
  "magic_nexthop",
  Type.String({ description: "The next-hop IP Address for the static route.", "x-auditable": true }),
)

export const MagicPriority = named(
  "magic_priority",
  Type.Integer({ description: "Priority of the static route.", "x-auditable": true }),
)

export const MagicColoName = named(
  "magic_colo_name",
  Type.String({ description: "Scope colo name.", "x-auditable": true }),
)

export const MagicColoNames = named(
  "magic_colo_names",
  Type.Array(MagicColoName, { description: "List of colo names for the ECMP scope." }),
)

export const MagicColoRegion = named(
  "magic_colo_region",
  Type.String({ description: "Scope colo region.", "x-auditable": true }),
)

export const MagicColoRegions = named(
  "magic_colo_regions",
  Type.Array(MagicColoRegion, { description: "List of colo regions for the ECMP scope.", "x-auditable": true }),
)

export const MagicScope = named(
  "magic_scope",
  Type.Object(
    {
      colo_names: Type.Optional(MagicColoNames),
      colo_regions: Type.Optional(MagicColoRegions),
    },
    { description: "Used only for ECMP routes." },
  ),
)

export const MagicWeight = named(
  "magic_weight",
  Type.Integer({ description: "Optional weight of the ECMP scope - if provided.", "x-auditable": true }),
)

export const MagicRoute = named(
  "magic_route",
  Type.Object({
    created_on: Type.Optional(MagicCreatedOn),
    description: Type.Optional(MagicDescription),
    id: MagicIdentifier,
    modified_on: Type.Optional(MagicModifiedOn),
    nexthop: MagicNexthop,
    prefix: MagicPrefix,
    priority: MagicPriority,
    scope: Type.Optional(MagicScope),
    weight: Type.Optional(MagicWeight),
  }),
)

export const MagicRouteDeletedResponse = named(
  "magic_route_deleted_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      deleted: Type.Optional(Type.Boolean()),
      deleted_route: Type.Optional(MagicRoute),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicRouteModifiedResponse = named(
  "magic_route_modified_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      modified: Type.Optional(Type.Boolean()),
      modified_route: Type.Optional(MagicRoute),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicCreateRouteRequest = named(
  "magic_create_route_request",
  Type.Object({
    description: Type.Optional(MagicDescription),
    nexthop: MagicNexthop,
    prefix: MagicPrefix,
    priority: MagicPriority,
    scope: Type.Optional(MagicScope),
    weight: Type.Optional(MagicWeight),
  }),
)

export const MagicRouteUpdateRequest = named("magic_route_update_request", MagicCreateRouteRequest)

export const MagicRouteSingleResponse = named(
  "magic_route_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      route: Type.Optional(MagicRoute),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicMultipleRouteDeleteResponse = named(
  "magic_multiple_route_delete_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      deleted: Type.Optional(Type.Boolean()),
      deleted_routes: Type.Optional(Type.Array(MagicRoute)),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicMultipleRouteModifiedResponse = named(
  "magic_multiple_route_modified_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      modified: Type.Optional(Type.Boolean()),
      modified_routes: Type.Optional(Type.Array(MagicRoute)),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicRouteUpdateSingleRequest = named(
  "magic_route_update_single_request",
  Type.Object({
    id: MagicIdentifier,
    description: Type.Optional(MagicDescription),
    nexthop: MagicNexthop,
    prefix: MagicPrefix,
    priority: MagicPriority,
    scope: Type.Optional(MagicScope),
    weight: Type.Optional(MagicWeight),
  }),
)

export const MagicRouteUpdateManyRequest = named(
  "magic_route_update_many_request",
  Type.Object({
    routes: Type.Array(MagicRouteUpdateSingleRequest),
  }),
)

export const MagicCreateRouteResponse = named(
  "magic_create_route_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: MagicRoute,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicRoutesCollectionResponse = named(
  "magic_routes_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      routes: Type.Optional(Type.Array(MagicRoute)),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicPsk = named(
  "magic_psk",
  Type.String({ description: "A randomly generated or provided string for use in the IPsec tunnel." }),
)

export const MagicSchemasModifiedOn = named(
  "magic_schemas-modified_on",
  Type.String({
    description: "The date and time the tunnel was last modified.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const MagicPskMetadata = named(
  "magic_psk_metadata",
  Type.Object(
    {
      last_generated_on: Type.Optional(MagicSchemasModifiedOn),
    },
    { description: "The PSK metadata that includes when the PSK was generated." },
  ),
)

export const MagicPskGenerationResponse = named(
  "magic_psk_generation_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      ipsec_tunnel_id: Type.Optional(MagicIdentifier),
      psk: Type.Optional(MagicPsk),
      psk_metadata: Type.Optional(MagicPskMetadata),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicAllowNullCipher = named(
  "magic_allow_null_cipher",
  Type.Boolean({
    description: "When `true`, the tunnel can use a null-cipher (`ENCR_NULL`) in the ESP tunnel (Phase 2).",
  }),
)

export const MagicAutomaticReturnRouting = named(
  "magic_automatic_return_routing",
  Type.Boolean({
    description: "True if automatic stateful return routing should be enabled for a tunnel, false otherwise.",
    default: false,
    "x-auditable": true,
  }),
)

export const MagicBgpConfig = named(
  "magic_bgp_config",
  Type.Object({
    customer_asn: Type.Integer({
      description: "ASN used on the customer end of the BGP session",
      format: "int32",
      minimum: 0,
    }),
    extra_prefixes: Type.Optional(
      Type.Array(Type.String({ format: "cidr" }), {
        description:
          "Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.",
      }),
    ),
    md5_key: Type.Optional(
      Type.String({
        description:
          "MD5 key to use for session authentication.\n\nNote that *this is not a security measure*. MD5 is not a valid security mechanism, and the\nkey is not treated as a secret value. This is *only* supported for preventing\nmisconfiguration, not for defending against malicious attacks.\n\nThe MD5 key, if set, must be of non-zero length and consist only of the following types of\ncharacter:\n\n* ASCII alphanumerics: `[a-zA-Z0-9]`\n* Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= \\|`\n\nIn other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),\nquotation mark (`\"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed\n(0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of\nthese disallowed characters will be rejected.",
      }),
    ),
  }),
)

export const MagicBgpStatusWithState = named(
  "magic_bgp_status_with_state",
  Type.Object({
    bgp_state: Type.Optional(Type.String()),
    cf_speaker_ip: Type.Optional(Type.String({ format: "ipv4" })),
    cf_speaker_port: Type.Optional(Type.Integer({ minimum: 1, maximum: 65535 })),
    customer_speaker_ip: Type.Optional(Type.String({ format: "ipv4" })),
    customer_speaker_port: Type.Optional(Type.Integer({ minimum: 1, maximum: 65535 })),
    state: Type.Union([Type.Literal("BGP_DOWN"), Type.Literal("BGP_UP"), Type.Literal("BGP_ESTABLISHING")]),
    tcp_established: Type.Boolean(),
    updated_at: Type.String({ format: "date-time", readOnly: true }),
  }),
)

export const MagicCloudflareIpsecEndpoint = named(
  "magic_cloudflare_ipsec_endpoint",
  Type.String({ description: "The IP address assigned to the Cloudflare side of the IPsec tunnel." }),
)

export const MagicSchemasCreatedOn = named(
  "magic_schemas-created_on",
  Type.String({
    description: "The date and time the tunnel was created.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const MagicCustomRemoteIdentities = named(
  "magic_custom_remote_identities",
  Type.Object({
    fqdn_id: Type.Optional(
      Type.String({
        description:
          "A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The\ngenerated IKE IDs can still be used even if this custom value is specified.\n\nMust be of the form `<custom label>.<account ID>.custom.ipsec.cloudflare.com`.\n\nThis custom ID does not need to be unique. Two IPsec tunnels may have the same custom \nfqdn_id. However, if another IPsec tunnel has the same value then the two tunnels \ncannot have the same cloudflare_endpoint.",
      }),
    ),
  }),
)

export const MagicCustomerIpsecEndpoint = named(
  "magic_customer_ipsec_endpoint",
  Type.String({
    description:
      "The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.",
  }),
)

export const MagicComponentsSchemasDescription = named(
  "magic_components-schemas-description",
  Type.String({ description: "An optional description forthe IPsec tunnel." }),
)

export const UnnamedSchemaRefEebdc868ce7f7ae92e23438caa84e7b5 = named(
  "unnamed_schema_ref_eebdc868ce7f7ae92e23438caa84e7b5",
  Type.Union([Type.Literal("low"), Type.Literal("mid"), Type.Literal("high")], {
    description: "How frequent the health check is run. The default value is `mid`.",
    "x-auditable": true,
  }),
)

export const MagicHealthCheckTarget = named(
  "magic_health_check_target",
  Type.Object(
    {
      effective: Type.Optional(
        Type.String({
          description:
            "The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.",
          readOnly: true,
          "x-auditable": true,
        }),
      ),
      saved: Type.Optional(
        Type.String({
          description:
            "The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.",
          "x-auditable": true,
        }),
      ),
    },
    {
      description:
        "The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.",
    },
  ),
)

export const MagicHealthCheckType = named(
  "magic_health_check_type",
  Type.Union([Type.Literal("reply"), Type.Literal("request")], {
    description: "The type of healthcheck to run, reply or request. The default value is `reply`.",
    "x-auditable": true,
  }),
)

export const MagicTunnelHealthCheck = named(
  "magic_tunnel_health_check",
  Type.Object({
    enabled: Type.Optional(
      Type.Boolean({
        description: "Determines whether to run healthchecks for a tunnel.",
        default: true,
        "x-auditable": true,
      }),
    ),
    rate: Type.Optional(UnnamedSchemaRefEebdc868ce7f7ae92e23438caa84e7b5),
    target: Type.Optional(
      Type.Union([MagicHealthCheckTarget, Type.String()], {
        description:
          "The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.",
      }),
    ),
    type: Type.Optional(MagicHealthCheckType),
    direction: Type.Optional(
      Type.Union([Type.Literal("unidirectional"), Type.Literal("bidirectional")], {
        description:
          "The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.",
      }),
    ),
  }),
)

export const MagicSchemasIdentifier = named(
  "magic_schemas-identifier",
  Type.String({ description: "Identifier", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const MagicInterfaceAddress = named(
  "magic_interface_address",
  Type.String({
    description:
      "A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.",
    "x-auditable": true,
  }),
)

export const MagicInterfaceAddress6 = named(
  "magic_interface_address6",
  Type.String({
    description:
      "A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127",
    "x-auditable": true,
  }),
)

export const MagicIpsecTunnelName = named(
  "magic_ipsec_tunnel_name",
  Type.String({ description: "The name of the IPsec tunnel. The name cannot share a name with other tunnels." }),
)

export const MagicReplayProtection = named(
  "magic_replay_protection",
  Type.Boolean({
    description: "If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.",
    default: false,
  }),
)

export const MagicIpsecTunnel = named(
  "magic_ipsec-tunnel",
  Type.Object({
    allow_null_cipher: Type.Optional(MagicAllowNullCipher),
    automatic_return_routing: Type.Optional(MagicAutomaticReturnRouting),
    bgp: Type.Optional(MagicBgpConfig),
    bgp_status: Type.Optional(MagicBgpStatusWithState),
    cloudflare_endpoint: MagicCloudflareIpsecEndpoint,
    created_on: Type.Optional(MagicSchemasCreatedOn),
    custom_remote_identities: Type.Optional(MagicCustomRemoteIdentities),
    customer_endpoint: Type.Optional(MagicCustomerIpsecEndpoint),
    description: Type.Optional(MagicComponentsSchemasDescription),
    health_check: Type.Optional(MagicTunnelHealthCheck),
    id: MagicSchemasIdentifier,
    interface_address: MagicInterfaceAddress,
    interface_address6: Type.Optional(MagicInterfaceAddress6),
    modified_on: Type.Optional(MagicSchemasModifiedOn),
    name: MagicIpsecTunnelName,
    psk_metadata: Type.Optional(MagicPskMetadata),
    replay_protection: Type.Optional(MagicReplayProtection),
  }),
)

export const MagicSchemasTunnelDeletedResponse = named(
  "magic_schemas-tunnel_deleted_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      deleted: Type.Optional(Type.Boolean()),
      deleted_ipsec_tunnel: Type.Optional(MagicIpsecTunnel),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicSchemasTunnelModifiedResponse = named(
  "magic_schemas-tunnel_modified_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      modified: Type.Optional(Type.Boolean()),
      modified_ipsec_tunnel: Type.Optional(MagicIpsecTunnel),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicIpsecTunnelAddSingleRequest = named(
  "magic_ipsec_tunnel_add_single_request",
  Type.Object({
    automatic_return_routing: Type.Optional(MagicAutomaticReturnRouting),
    bgp: Type.Optional(MagicBgpConfig),
    cloudflare_endpoint: MagicCloudflareIpsecEndpoint,
    customer_endpoint: Type.Optional(MagicCustomerIpsecEndpoint),
    description: Type.Optional(MagicComponentsSchemasDescription),
    health_check: Type.Optional(MagicTunnelHealthCheck),
    interface_address: MagicInterfaceAddress,
    interface_address6: Type.Optional(MagicInterfaceAddress6),
    name: MagicIpsecTunnelName,
    psk: Type.Optional(MagicPsk),
    replay_protection: Type.Optional(MagicReplayProtection),
  }),
)

export const MagicSchemasTunnelSingleResponse = named(
  "magic_schemas-tunnel_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      ipsec_tunnel: Type.Optional(MagicIpsecTunnel),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicSchemasModifiedTunnelsCollectionResponse = named(
  "magic_schemas-modified_tunnels_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      modified: Type.Optional(Type.Boolean()),
      modified_ipsec_tunnels: Type.Optional(Type.Array(MagicIpsecTunnel)),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicSchemasCreateIpsecTunnelResponse = named(
  "magic_schemas-create_ipsec_tunnel_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: MagicIpsecTunnel,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicIpsecTunnelAddRequest = named("magic_ipsec_tunnel_add_request", MagicIpsecTunnelAddSingleRequest)

export const MagicSchemasTunnelsCollectionResponse = named(
  "magic_schemas-tunnels_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      ipsec_tunnels: Type.Optional(Type.Array(MagicIpsecTunnel)),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicCloudflareGreEndpoint = named(
  "magic_cloudflare_gre_endpoint",
  Type.String({
    description: "The IP address assigned to the Cloudflare side of the GRE tunnel.",
    "x-auditable": true,
  }),
)

export const MagicCustomerGreEndpoint = named(
  "magic_customer_gre_endpoint",
  Type.String({ description: "The IP address assigned to the customer side of the GRE tunnel.", "x-auditable": true }),
)

export const MagicSchemasDescription = named(
  "magic_schemas-description",
  Type.String({ description: "An optional description of the GRE tunnel.", "x-auditable": true }),
)

export const MagicMtu = named(
  "magic_mtu",
  Type.Integer({
    description: "Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.",
    default: 1476,
    "x-auditable": true,
  }),
)

export const MagicGreTunnelName = named(
  "magic_gre_tunnel_name",
  Type.String({
    description:
      "The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.",
    "x-auditable": true,
  }),
)

export const MagicTtl = named(
  "magic_ttl",
  Type.Integer({
    description: "Time To Live (TTL) in number of hops of the GRE tunnel.",
    default: 64,
    "x-auditable": true,
  }),
)

export const MagicGreTunnel = named(
  "magic_gre-tunnel",
  Type.Object({
    automatic_return_routing: Type.Optional(MagicAutomaticReturnRouting),
    bgp: Type.Optional(MagicBgpConfig),
    bgp_status: Type.Optional(MagicBgpStatusWithState),
    cloudflare_gre_endpoint: MagicCloudflareGreEndpoint,
    created_on: Type.Optional(MagicSchemasCreatedOn),
    customer_gre_endpoint: MagicCustomerGreEndpoint,
    description: Type.Optional(MagicSchemasDescription),
    health_check: Type.Optional(MagicTunnelHealthCheck),
    id: MagicSchemasIdentifier,
    interface_address: MagicInterfaceAddress,
    interface_address6: Type.Optional(MagicInterfaceAddress6),
    modified_on: Type.Optional(MagicSchemasModifiedOn),
    mtu: Type.Optional(MagicMtu),
    name: MagicGreTunnelName,
    ttl: Type.Optional(MagicTtl),
  }),
)

export const MagicTunnelDeletedResponse = named(
  "magic_tunnel_deleted_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      deleted: Type.Optional(Type.Boolean()),
      deleted_gre_tunnel: Type.Optional(MagicGreTunnel),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicTunnelModifiedResponse = named(
  "magic_tunnel_modified_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      modified: Type.Optional(Type.Boolean()),
      modified_gre_tunnel: Type.Optional(MagicGreTunnel),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicGreTunnelAddSingleRequest = named(
  "magic_gre_tunnel_add_single_request",
  Type.Object({
    automatic_return_routing: Type.Optional(MagicAutomaticReturnRouting),
    cloudflare_gre_endpoint: MagicCloudflareGreEndpoint,
    customer_gre_endpoint: MagicCustomerGreEndpoint,
    description: Type.Optional(MagicSchemasDescription),
    health_check: Type.Optional(MagicTunnelHealthCheck),
    interface_address: MagicInterfaceAddress,
    interface_address6: Type.Optional(MagicInterfaceAddress6),
    mtu: Type.Optional(MagicMtu),
    name: MagicGreTunnelName,
    ttl: Type.Optional(MagicTtl),
  }),
)

export const MagicGreTunnelUpdateRequest = named("magic_gre_tunnel_update_request", MagicGreTunnelAddSingleRequest)

export const MagicTunnelSingleResponse = named(
  "magic_tunnel_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      gre_tunnel: Type.Optional(MagicGreTunnel),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicModifiedTunnelsCollectionResponse = named(
  "magic_modified_tunnels_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      modified: Type.Optional(Type.Boolean()),
      modified_gre_tunnels: Type.Optional(Type.Array(MagicGreTunnel)),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicCreateGreTunnelResponse = named(
  "magic_create_gre_tunnel_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: MagicGreTunnel,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicCreateGreTunnelRequest = named(
  "magic_create_gre_tunnel_request",
  Type.Object({
    automatic_return_routing: Type.Optional(MagicAutomaticReturnRouting),
    bgp: Type.Optional(MagicBgpConfig),
    cloudflare_gre_endpoint: MagicCloudflareGreEndpoint,
    customer_gre_endpoint: MagicCustomerGreEndpoint,
    description: Type.Optional(MagicSchemasDescription),
    health_check: Type.Optional(MagicTunnelHealthCheck),
    interface_address: MagicInterfaceAddress,
    interface_address6: Type.Optional(MagicInterfaceAddress6),
    mtu: Type.Optional(MagicMtu),
    name: MagicGreTunnelName,
    ttl: Type.Optional(MagicTtl),
  }),
)

export const MagicTunnelsCollectionResponse = named(
  "magic_tunnels_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      gre_tunnels: Type.Optional(Type.Array(MagicGreTunnel)),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MconnSnapshotDhcpLease = named(
  "mconn_snapshot_dhcp_lease",
  Type.Object(
    {
      client_id: Type.String({ description: "Client ID of the device the IP Address was leased to" }),
      connector_id: Type.Optional(Type.String({ description: "Connector identifier" })),
      expiry_time: Type.Number({ description: "Expiry time of the DHCP lease (seconds since the Unix epoch)" }),
      hostname: Type.String({ description: "Hostname of the device the IP Address was leased to" }),
      interface_name: Type.String({ description: "Name of the network interface" }),
      ip_address: Type.String({ description: "IP Address that was leased" }),
      mac_address: Type.String({ description: "MAC Address of the device the IP Address was leased to" }),
    },
    { description: "Snapshot DHCP lease" },
  ),
)

export const MconnSnapshotDisk = named(
  "mconn_snapshot_disk",
  Type.Object(
    {
      connector_id: Type.Optional(Type.String({ description: "Connector identifier" })),
      discards: Type.Optional(Type.Number({ description: "Discards completed successfully" })),
      discards_merged: Type.Optional(Type.Number({ description: "Discards merged" })),
      flushes: Type.Optional(Type.Number({ description: "Flushes completed successfully" })),
      in_progress: Type.Number({ description: "I/Os currently in progress" }),
      major: Type.Number({ description: "Device major number" }),
      merged: Type.Number({ description: "Reads merged" }),
      minor: Type.Number({ description: "Device minor number" }),
      name: Type.String({ description: "Device name" }),
      reads: Type.Number({ description: "Reads completed successfully" }),
      sectors_discarded: Type.Optional(Type.Number({ description: "Sectors discarded" })),
      sectors_read: Type.Number({ description: "Sectors read successfully" }),
      sectors_written: Type.Number({ description: "Sectors written successfully" }),
      time_discarding_ms: Type.Optional(Type.Number({ description: "Time spent discarding (milliseconds)" })),
      time_flushing_ms: Type.Optional(Type.Number({ description: "Time spent flushing (milliseconds)" })),
      time_in_progress_ms: Type.Number({ description: "Time spent doing I/Os (milliseconds)" }),
      time_reading_ms: Type.Number({ description: "Time spent reading (milliseconds)" }),
      time_writing_ms: Type.Number({ description: "Time spent writing (milliseconds)" }),
      weighted_time_in_progress_ms: Type.Number({ description: "Weighted time spent doing I/Os (milliseconds)" }),
      writes: Type.Number({ description: "Writes completed" }),
      writes_merged: Type.Number({ description: "Writes merged" }),
    },
    { description: "Snapshot Disk" },
  ),
)

export const MconnSnapshotInterfaceAddress = named(
  "mconn_snapshot_interface_address",
  Type.Object(
    {
      connector_id: Type.Optional(Type.String({ description: "Connector identifier" })),
      interface_name: Type.String({ description: "Name of the network interface" }),
      ip_address: Type.String({ description: "IP address of the network interface" }),
    },
    { description: "Snapshot Interface Address" },
  ),
)

export const MconnSnapshotInterface = named(
  "mconn_snapshot_interface",
  Type.Object(
    {
      connector_id: Type.Optional(Type.String({ description: "Connector identifier" })),
      ip_addresses: Type.Optional(Type.Array(MconnSnapshotInterfaceAddress)),
      name: Type.String({ description: "Name of the network interface" }),
      operstate: Type.String({ description: "UP/DOWN state of the network interface" }),
      speed: Type.Optional(Type.Number({ description: "Speed of the network interface (bits per second)" })),
    },
    { description: "Snapshot Interface" },
  ),
)

export const MconnSnapshotMount = named(
  "mconn_snapshot_mount",
  Type.Object(
    {
      available_bytes: Type.Optional(Type.Number({ description: "Available disk size (bytes)" })),
      connector_id: Type.Optional(Type.String({ description: "Connector identifier" })),
      file_system: Type.String({ description: "File system on disk (EXT4, NTFS, etc.)" }),
      is_read_only: Type.Optional(Type.Boolean({ description: "Determines whether the disk is read-only" })),
      is_removable: Type.Optional(Type.Boolean({ description: "Determines whether the disk is removable" })),
      kind: Type.String({ description: "Kind of disk (HDD, SSD, etc.)" }),
      mount_point: Type.String({ description: "Path where disk is mounted" }),
      name: Type.String({ description: "Name of the disk mount" }),
      total_bytes: Type.Optional(Type.Number({ description: "Total disk size (bytes)" })),
    },
    { description: "Snapshot Mount" },
  ),
)

export const MconnSnapshotNetdev = named(
  "mconn_snapshot_netdev",
  Type.Object(
    {
      connector_id: Type.Optional(Type.String({ description: "Connector identifier" })),
      name: Type.String({ description: "Name of the network device" }),
      recv_bytes: Type.Number({ description: "Total bytes received" }),
      recv_compressed: Type.Number({ description: "Compressed packets received" }),
      recv_drop: Type.Number({ description: "Packets dropped" }),
      recv_errs: Type.Number({ description: "Bad packets received" }),
      recv_fifo: Type.Number({ description: "FIFO overruns" }),
      recv_frame: Type.Number({ description: "Frame alignment errors" }),
      recv_multicast: Type.Number({ description: "Multicast packets received" }),
      recv_packets: Type.Number({ description: "Total packets received" }),
      sent_bytes: Type.Number({ description: "Total bytes transmitted" }),
      sent_carrier: Type.Number({ description: "Number of packets not sent due to carrier errors" }),
      sent_colls: Type.Number({ description: "Number of collisions" }),
      sent_compressed: Type.Number({ description: "Number of compressed packets transmitted" }),
      sent_drop: Type.Number({ description: "Number of packets dropped during transmission" }),
      sent_errs: Type.Number({ description: "Number of transmission errors" }),
      sent_fifo: Type.Number({ description: "FIFO overruns" }),
      sent_packets: Type.Number({ description: "Total packets transmitted" }),
    },
    { description: "Snapshot Netdev" },
  ),
)

export const MconnSnapshotThermal = named(
  "mconn_snapshot_thermal",
  Type.Object(
    {
      connector_id: Type.Optional(Type.String({ description: "Connector identifier" })),
      critical_celcius: Type.Optional(
        Type.Number({ description: "Critical failure temperature of the component (degrees Celsius)" }),
      ),
      current_celcius: Type.Optional(
        Type.Number({ description: "Current temperature of the component (degrees Celsius)" }),
      ),
      label: Type.String({ description: "Sensor identifier for the component" }),
      max_celcius: Type.Optional(
        Type.Number({ description: "Maximum temperature of the component (degrees Celsius)" }),
      ),
    },
    { description: "Snapshot Thermal" },
  ),
)

export const MconnSnapshotTunnel = named(
  "mconn_snapshot_tunnel",
  Type.Object(
    {
      connector_id: Type.Optional(Type.String({ description: "Connector identifier" })),
      health_state: Type.String({ description: "Name of tunnel health state (unknown, healthy, degraded, down)" }),
      health_value: Type.Number({
        description: "Numeric value associated with tunnel state (0 = unknown, 1 = healthy, 2 = degraded, 3 = down)",
      }),
      interface_name: Type.String({ description: "The tunnel interface name (i.e. xfrm1, xfrm3.99, etc.)" }),
      tunnel_id: Type.String({ description: "Tunnel identifier" }),
    },
    { description: "Snapshot Tunnels" },
  ),
)

export const MconnSnapshot = named(
  "mconn_snapshot",
  Type.Object(
    {
      count_reclaim_failures: Type.Number({ description: "Count of failures to reclaim space" }),
      count_reclaimed_paths: Type.Number({ description: "Count of reclaimed paths" }),
      count_record_failed: Type.Number({ description: "Count of failed snapshot recordings" }),
      count_transmit_failures: Type.Number({ description: "Count of failed snapshot transmissions" }),
      cpu_count: Type.Optional(Type.Number({ description: "Count of processors/cores" })),
      cpu_pressure_10s: Type.Optional(
        Type.Number({ description: "Percentage of time over a 10 second window that tasks were stalled" }),
      ),
      cpu_pressure_300s: Type.Optional(
        Type.Number({ description: "Percentage of time over a 5 minute window that tasks were stalled" }),
      ),
      cpu_pressure_60s: Type.Optional(
        Type.Number({ description: "Percentage of time over a 1 minute window that tasks were stalled" }),
      ),
      cpu_pressure_total_us: Type.Optional(Type.Number({ description: "Total stall time (microseconds)" })),
      cpu_time_guest_ms: Type.Optional(
        Type.Number({ description: "Time spent running a virtual CPU or guest OS (milliseconds)" }),
      ),
      cpu_time_guest_nice_ms: Type.Optional(
        Type.Number({ description: "Time spent running a niced guest (milliseconds)" }),
      ),
      cpu_time_idle_ms: Type.Optional(Type.Number({ description: "Time spent in idle state (milliseconds)" })),
      cpu_time_iowait_ms: Type.Optional(
        Type.Number({ description: "Time spent wait for I/O to complete (milliseconds)" }),
      ),
      cpu_time_irq_ms: Type.Optional(Type.Number({ description: "Time spent servicing interrupts (milliseconds)" })),
      cpu_time_nice_ms: Type.Optional(
        Type.Number({ description: "Time spent in low-priority user mode (milliseconds)" }),
      ),
      cpu_time_softirq_ms: Type.Optional(Type.Number({ description: "Time spent servicing softirqs (milliseconds)" })),
      cpu_time_steal_ms: Type.Optional(Type.Number({ description: "Time stolen (milliseconds)" })),
      cpu_time_system_ms: Type.Optional(Type.Number({ description: "Time spent in system mode (milliseconds)" })),
      cpu_time_user_ms: Type.Optional(Type.Number({ description: "Time spent in user mode (milliseconds)" })),
      dhcp_leases: Type.Optional(Type.Array(MconnSnapshotDhcpLease)),
      disks: Type.Optional(Type.Array(MconnSnapshotDisk)),
      ha_state: Type.Optional(Type.String({ description: "Name of high availability state" })),
      ha_value: Type.Optional(
        Type.Number({
          description:
            "Numeric value associated with high availability state (0 = disabled, 1 = active, 2 = standby, 3 = stopped, 4 = fault)",
        }),
      ),
      interfaces: Type.Optional(Type.Array(MconnSnapshotInterface)),
      io_pressure_full_10s: Type.Optional(
        Type.Number({ description: "Percentage of time over a 10 second window that all tasks were stalled" }),
      ),
      io_pressure_full_300s: Type.Optional(
        Type.Number({ description: "Percentage of time over a 5 minute window that all tasks were stalled" }),
      ),
      io_pressure_full_60s: Type.Optional(
        Type.Number({ description: "Percentage of time over a 1 minute window that all tasks were stalled" }),
      ),
      io_pressure_full_total_us: Type.Optional(Type.Number({ description: "Total stall time (microseconds)" })),
      io_pressure_some_10s: Type.Optional(
        Type.Number({ description: "Percentage of time over a 10 second window that some tasks were stalled" }),
      ),
      io_pressure_some_300s: Type.Optional(
        Type.Number({ description: "Percentage of time over a 3 minute window that some tasks were stalled" }),
      ),
      io_pressure_some_60s: Type.Optional(
        Type.Number({ description: "Percentage of time over a 1 minute window that some tasks were stalled" }),
      ),
      io_pressure_some_total_us: Type.Optional(Type.Number({ description: "Total stall time (microseconds)" })),
      kernel_btime: Type.Optional(Type.Number({ description: "Boot time (seconds since Unix epoch)" })),
      kernel_ctxt: Type.Optional(Type.Number({ description: "Number of context switches that the system underwent" })),
      kernel_processes: Type.Optional(Type.Number({ description: "Number of forks since boot" })),
      kernel_processes_blocked: Type.Optional(
        Type.Number({ description: "Number of processes blocked waiting for I/O" }),
      ),
      kernel_processes_running: Type.Optional(Type.Number({ description: "Number of processes in runnable state" })),
      load_average_15m: Type.Optional(Type.Number({ description: "The fifteen-minute load average" })),
      load_average_1m: Type.Optional(Type.Number({ description: "The one-minute load average" })),
      load_average_5m: Type.Optional(Type.Number({ description: "The five-minute load average" })),
      load_average_cur: Type.Optional(
        Type.Number({ description: "Number of currently runnable kernel scheduling entities" }),
      ),
      load_average_max: Type.Optional(
        Type.Number({ description: "Number of kernel scheduling entities that currently exist on the system" }),
      ),
      memory_active_bytes: Type.Optional(Type.Number({ description: "Memory that has been used more recently" })),
      memory_anon_hugepages_bytes: Type.Optional(
        Type.Number({ description: "Non-file backed huge pages mapped into user-space page tables" }),
      ),
      memory_anon_pages_bytes: Type.Optional(
        Type.Number({ description: "Non-file backed pages mapped into user-space page tables" }),
      ),
      memory_available_bytes: Type.Optional(
        Type.Number({ description: "Estimate of how much memory is available for starting new applications" }),
      ),
      memory_bounce_bytes: Type.Optional(Type.Number({ description: "Memory used for block device bounce buffers" })),
      memory_buffers_bytes: Type.Optional(
        Type.Number({ description: "Relatively temporary storage for raw disk blocks" }),
      ),
      memory_cached_bytes: Type.Optional(Type.Number({ description: "In-memory cache for files read from the disk" })),
      memory_cma_free_bytes: Type.Optional(
        Type.Number({ description: "Free CMA (Contiguous Memory Allocator) pages" }),
      ),
      memory_cma_total_bytes: Type.Optional(
        Type.Number({ description: "Total CMA (Contiguous Memory Allocator) pages" }),
      ),
      memory_commit_limit_bytes: Type.Optional(
        Type.Number({ description: "Total amount of memory currently available to be allocated on the system" }),
      ),
      memory_committed_as_bytes: Type.Optional(
        Type.Number({ description: "Amount of memory presently allocated on the system" }),
      ),
      memory_dirty_bytes: Type.Optional(
        Type.Number({ description: "Memory which is waiting to get written back to the disk" }),
      ),
      memory_free_bytes: Type.Optional(Type.Number({ description: "The sum of LowFree and HighFree" })),
      memory_high_free_bytes: Type.Optional(Type.Number({ description: "Amount of free highmem" })),
      memory_high_total_bytes: Type.Optional(Type.Number({ description: "Total amount of highmem" })),
      memory_hugepages_free: Type.Optional(
        Type.Number({ description: "The number of huge pages in the pool that are not yet allocated" }),
      ),
      memory_hugepages_rsvd: Type.Optional(
        Type.Number({
          description: "Number of huge pages for which a commitment has been made, but no allocation has yet been made",
        }),
      ),
      memory_hugepages_surp: Type.Optional(
        Type.Number({ description: "Number of huge pages in the pool above the threshold" }),
      ),
      memory_hugepages_total: Type.Optional(Type.Number({ description: "The size of the pool of huge pages" })),
      memory_hugepagesize_bytes: Type.Optional(Type.Number({ description: "The size of huge pages" })),
      memory_inactive_bytes: Type.Optional(Type.Number({ description: "Memory which has been less recently used" })),
      memory_k_reclaimable_bytes: Type.Optional(
        Type.Number({
          description: "Kernel allocations that the kernel will attempt to reclaim under memory pressure",
        }),
      ),
      memory_kernel_stack_bytes: Type.Optional(
        Type.Number({ description: "Amount of memory allocated to kernel stacks" }),
      ),
      memory_low_free_bytes: Type.Optional(Type.Number({ description: "Amount of free lowmem" })),
      memory_low_total_bytes: Type.Optional(Type.Number({ description: "Total amount of lowmem" })),
      memory_mapped_bytes: Type.Optional(Type.Number({ description: "Files which have been mapped into memory" })),
      memory_page_tables_bytes: Type.Optional(
        Type.Number({ description: "Amount of memory dedicated to the lowest level of page tables" }),
      ),
      memory_per_cpu_bytes: Type.Optional(
        Type.Number({ description: "Memory allocated to the per-cpu alloctor used to back per-cpu allocations" }),
      ),
      memory_pressure_full_10s: Type.Optional(
        Type.Number({ description: "Percentage of time over a 10 second window that all tasks were stalled" }),
      ),
      memory_pressure_full_300s: Type.Optional(
        Type.Number({ description: "Percentage of time over a 5 minute window that all tasks were stalled" }),
      ),
      memory_pressure_full_60s: Type.Optional(
        Type.Number({ description: "Percentage of time over a 1 minute window that all tasks were stalled" }),
      ),
      memory_pressure_full_total_us: Type.Optional(Type.Number({ description: "Total stall time (microseconds)" })),
      memory_pressure_some_10s: Type.Optional(
        Type.Number({ description: "Percentage of time over a 10 second window that some tasks were stalled" }),
      ),
      memory_pressure_some_300s: Type.Optional(
        Type.Number({ description: "Percentage of time over a 5 minute window that some tasks were stalled" }),
      ),
      memory_pressure_some_60s: Type.Optional(
        Type.Number({ description: "Percentage of time over a 1 minute window that some tasks were stalled" }),
      ),
      memory_pressure_some_total_us: Type.Optional(Type.Number({ description: "Total stall time (microseconds)" })),
      memory_s_reclaimable_bytes: Type.Optional(
        Type.Number({ description: "Part of slab that can be reclaimed on memory pressure" }),
      ),
      memory_s_unreclaim_bytes: Type.Optional(
        Type.Number({ description: "Part of slab that cannot be reclaimed on memory pressure" }),
      ),
      memory_secondary_page_tables_bytes: Type.Optional(
        Type.Number({ description: "Amount of memory dedicated to the lowest level of page tables" }),
      ),
      memory_shmem_bytes: Type.Optional(Type.Number({ description: "Amount of memory consumed by tmpfs" })),
      memory_shmem_hugepages_bytes: Type.Optional(
        Type.Number({ description: "Memory used by shmem and tmpfs, allocated with huge pages" }),
      ),
      memory_shmem_pmd_mapped_bytes: Type.Optional(
        Type.Number({ description: "Shared memory mapped into user space with huge pages" }),
      ),
      memory_slab_bytes: Type.Optional(Type.Number({ description: "In-kernel data structures cache" })),
      memory_swap_cached_bytes: Type.Optional(
        Type.Number({ description: "Memory swapped out and back in while still in swap file" }),
      ),
      memory_swap_free_bytes: Type.Optional(
        Type.Number({ description: "Amount of swap space that is currently unused" }),
      ),
      memory_swap_total_bytes: Type.Optional(Type.Number({ description: "Total amount of swap space available" })),
      memory_total_bytes: Type.Optional(Type.Number({ description: "Total usable RAM" })),
      memory_vmalloc_chunk_bytes: Type.Optional(
        Type.Number({ description: "Largest contiguous block of vmalloc area which is free" }),
      ),
      memory_vmalloc_total_bytes: Type.Optional(Type.Number({ description: "Total size of vmalloc memory area" })),
      memory_vmalloc_used_bytes: Type.Optional(Type.Number({ description: "Amount of vmalloc area which is used" })),
      memory_writeback_bytes: Type.Optional(
        Type.Number({ description: "Memory which is actively being written back to the disk" }),
      ),
      memory_writeback_tmp_bytes: Type.Optional(
        Type.Number({ description: "Memory used by FUSE for temporary writeback buffers" }),
      ),
      memory_z_swap_bytes: Type.Optional(
        Type.Number({ description: "Memory consumed by the zswap backend, compressed" }),
      ),
      memory_z_swapped_bytes: Type.Optional(
        Type.Number({ description: "Amount of anonymous memory stored in zswap, uncompressed" }),
      ),
      mounts: Type.Optional(Type.Array(MconnSnapshotMount)),
      netdevs: Type.Optional(Type.Array(MconnSnapshotNetdev)),
      snmp_icmp_in_addr_mask_reps: Type.Optional(
        Type.Number({ description: "Number of ICMP Address Mask Reply messages received" }),
      ),
      snmp_icmp_in_addr_masks: Type.Optional(
        Type.Number({ description: "Number of ICMP Address Mask Request messages received" }),
      ),
      snmp_icmp_in_csum_errors: Type.Optional(
        Type.Number({ description: "Number of ICMP messages received with bad checksums" }),
      ),
      snmp_icmp_in_dest_unreachs: Type.Optional(
        Type.Number({ description: "Number of ICMP Destination Unreachable messages received" }),
      ),
      snmp_icmp_in_echo_reps: Type.Optional(
        Type.Number({ description: "Number of ICMP Echo Reply messages received" }),
      ),
      snmp_icmp_in_echos: Type.Optional(
        Type.Number({ description: "Number of ICMP Echo (request) messages received" }),
      ),
      snmp_icmp_in_errors: Type.Optional(
        Type.Number({ description: "Number of ICMP messages received with ICMP-specific errors" }),
      ),
      snmp_icmp_in_msgs: Type.Optional(Type.Number({ description: "Number of ICMP messages received" })),
      snmp_icmp_in_parm_probs: Type.Optional(
        Type.Number({ description: "Number of ICMP Parameter Problem messages received" }),
      ),
      snmp_icmp_in_redirects: Type.Optional(Type.Number({ description: "Number of ICMP Redirect messages received" })),
      snmp_icmp_in_src_quenchs: Type.Optional(
        Type.Number({ description: "Number of ICMP Source Quench messages received" }),
      ),
      snmp_icmp_in_time_excds: Type.Optional(
        Type.Number({ description: "Number of ICMP Time Exceeded messages received" }),
      ),
      snmp_icmp_in_timestamp_reps: Type.Optional(
        Type.Number({ description: "Number of ICMP Address Mask Request messages received" }),
      ),
      snmp_icmp_in_timestamps: Type.Optional(
        Type.Number({ description: "Number of ICMP Timestamp (request) messages received" }),
      ),
      snmp_icmp_out_addr_mask_reps: Type.Optional(
        Type.Number({ description: "Number of ICMP Address Mask Reply messages sent" }),
      ),
      snmp_icmp_out_addr_masks: Type.Optional(
        Type.Number({ description: "Number of ICMP Address Mask Request messages sent" }),
      ),
      snmp_icmp_out_dest_unreachs: Type.Optional(
        Type.Number({ description: "Number of ICMP Destination Unreachable messages sent" }),
      ),
      snmp_icmp_out_echo_reps: Type.Optional(Type.Number({ description: "Number of ICMP Echo Reply messages sent" })),
      snmp_icmp_out_echos: Type.Optional(Type.Number({ description: "Number of ICMP Echo (request) messages sent" })),
      snmp_icmp_out_errors: Type.Optional(
        Type.Number({
          description: "Number of ICMP messages which this entity did not send due to ICMP-specific errors",
        }),
      ),
      snmp_icmp_out_msgs: Type.Optional(Type.Number({ description: "Number of ICMP messages attempted to send" })),
      snmp_icmp_out_parm_probs: Type.Optional(
        Type.Number({ description: "Number of ICMP Parameter Problem messages sent" }),
      ),
      snmp_icmp_out_redirects: Type.Optional(Type.Number({ description: "Number of ICMP Redirect messages sent" })),
      snmp_icmp_out_src_quenchs: Type.Optional(
        Type.Number({ description: "Number of ICMP Source Quench messages sent" }),
      ),
      snmp_icmp_out_time_excds: Type.Optional(
        Type.Number({ description: "Number of ICMP Time Exceeded messages sent" }),
      ),
      snmp_icmp_out_timestamp_reps: Type.Optional(
        Type.Number({ description: "Number of ICMP Timestamp Reply messages sent" }),
      ),
      snmp_icmp_out_timestamps: Type.Optional(
        Type.Number({ description: "Number of ICMP Timestamp (request) messages sent" }),
      ),
      snmp_ip_default_ttl: Type.Optional(
        Type.Number({ description: "Default value of the Time-To-Live field of the IP header" }),
      ),
      snmp_ip_forw_datagrams: Type.Optional(
        Type.Number({ description: "Number of datagrams forwarded to their final destination" }),
      ),
      snmp_ip_forwarding_enabled: Type.Optional(Type.Boolean({ description: "Set when acting as an IP gateway" })),
      snmp_ip_frag_creates: Type.Optional(
        Type.Number({ description: "Number of datagrams generated by fragmentation" }),
      ),
      snmp_ip_frag_fails: Type.Optional(
        Type.Number({ description: "Number of datagrams discarded because fragmentation failed" }),
      ),
      snmp_ip_frag_oks: Type.Optional(Type.Number({ description: "Number of datagrams successfully fragmented" })),
      snmp_ip_in_addr_errors: Type.Optional(
        Type.Number({ description: "Number of input datagrams discarded due to errors in the IP address" }),
      ),
      snmp_ip_in_delivers: Type.Optional(
        Type.Number({ description: "Number of input datagrams successfully delivered to IP user-protocols" }),
      ),
      snmp_ip_in_discards: Type.Optional(Type.Number({ description: "Number of input datagrams otherwise discarded" })),
      snmp_ip_in_hdr_errors: Type.Optional(
        Type.Number({ description: "Number of input datagrams discarded due to errors in the IP header" }),
      ),
      snmp_ip_in_receives: Type.Optional(
        Type.Number({ description: "Number of input datagrams received from interfaces" }),
      ),
      snmp_ip_in_unknown_protos: Type.Optional(
        Type.Number({ description: "Number of input datagrams discarded due unknown or unsupported protocol" }),
      ),
      snmp_ip_out_discards: Type.Optional(
        Type.Number({ description: "Number of output datagrams otherwise discarded" }),
      ),
      snmp_ip_out_no_routes: Type.Optional(
        Type.Number({ description: "Number of output datagrams discarded because no route matched" }),
      ),
      snmp_ip_out_requests: Type.Optional(
        Type.Number({ description: "Number of datagrams supplied for transmission" }),
      ),
      snmp_ip_reasm_fails: Type.Optional(
        Type.Number({ description: "Number of failures detected by the reassembly algorithm" }),
      ),
      snmp_ip_reasm_oks: Type.Optional(Type.Number({ description: "Number of datagrams successfully reassembled" })),
      snmp_ip_reasm_reqds: Type.Optional(
        Type.Number({ description: "Number of fragments received which needed to be reassembled" }),
      ),
      snmp_ip_reasm_timeout: Type.Optional(
        Type.Number({ description: "Number of seconds fragments are held while awaiting reassembly" }),
      ),
      snmp_tcp_active_opens: Type.Optional(
        Type.Number({ description: "Number of times TCP transitions to SYN-SENT from CLOSED" }),
      ),
      snmp_tcp_attempt_fails: Type.Optional(
        Type.Number({
          description:
            "Number of times TCP transitions to CLOSED from SYN-SENT or SYN-RCVD, plus transitions to LISTEN from SYN-RCVD",
        }),
      ),
      snmp_tcp_curr_estab: Type.Optional(
        Type.Number({ description: "Number of TCP connections in ESTABLISHED or CLOSE-WAIT" }),
      ),
      snmp_tcp_estab_resets: Type.Optional(
        Type.Number({ description: "Number of times TCP transitions to CLOSED from ESTABLISHED or CLOSE-WAIT" }),
      ),
      snmp_tcp_in_csum_errors: Type.Optional(
        Type.Number({ description: "Number of TCP segments received with checksum errors" }),
      ),
      snmp_tcp_in_errs: Type.Optional(Type.Number({ description: "Number of TCP segments received in error" })),
      snmp_tcp_in_segs: Type.Optional(Type.Number({ description: "Number of TCP segments received" })),
      snmp_tcp_max_conn: Type.Optional(Type.Number({ description: "Limit on the total number of TCP connections" })),
      snmp_tcp_out_rsts: Type.Optional(Type.Number({ description: "Number of TCP segments sent with RST flag" })),
      snmp_tcp_out_segs: Type.Optional(Type.Number({ description: "Number of TCP segments sent" })),
      snmp_tcp_passive_opens: Type.Optional(
        Type.Number({ description: "Number of times TCP transitions to SYN-RCVD from LISTEN" }),
      ),
      snmp_tcp_retrans_segs: Type.Optional(Type.Number({ description: "Number of TCP segments retransmitted" })),
      snmp_tcp_rto_max: Type.Optional(
        Type.Number({
          description: "Maximum value permitted by a TCP implementation for the retransmission timeout (milliseconds)",
        }),
      ),
      snmp_tcp_rto_min: Type.Optional(
        Type.Number({
          description: "Minimum value permitted by a TCP implementation for the retransmission timeout (milliseconds)",
        }),
      ),
      snmp_udp_in_datagrams: Type.Optional(
        Type.Number({ description: "Number of UDP datagrams delivered to UDP applications" }),
      ),
      snmp_udp_in_errors: Type.Optional(
        Type.Number({
          description:
            "Number of UDP datagrams failed to be delivered for reasons other than lack of application at the destination port",
        }),
      ),
      snmp_udp_no_ports: Type.Optional(
        Type.Number({
          description: "Number of UDP datagrams received for which there was not application at the destination port",
        }),
      ),
      snmp_udp_out_datagrams: Type.Optional(Type.Number({ description: "Number of UDP datagrams sent" })),
      system_boot_time_s: Type.Optional(
        Type.Number({ description: "Boottime of the system (seconds since the Unix epoch)" }),
      ),
      t: Type.Number({ description: "Time the Snapshot was recorded (seconds since the Unix epoch)" }),
      thermals: Type.Optional(Type.Array(MconnSnapshotThermal)),
      tunnels: Type.Optional(Type.Array(MconnSnapshotTunnel)),
      uptime_idle_ms: Type.Optional(Type.Number({ description: "Sum of how much time each core has spent idle" })),
      uptime_total_ms: Type.Optional(
        Type.Number({ description: "Uptime of the system, including time spent in suspend" }),
      ),
      v: Type.String({ description: "Version" }),
    },
    { description: "Snapshot" },
  ),
)

export const MconnCodedMessage = named(
  "mconn_coded_message",
  Type.Object({
    code: Type.Number(),
    message: Type.String(),
  }),
)

export const MconnCustomerSnapshotsGetLatestSuccess = named(
  "mconn_customer_snapshots_get_latest_success",
  Type.Object({
    errors: Type.Optional(Type.Array(MconnCodedMessage)),
    messages: Type.Optional(Type.Array(MconnCodedMessage)),
    success: Type.Boolean(),
    result: Type.Unknown() /* unresolved: #/components/schemas/mconn_customer_snapshots_get_latest_result */,
  }),
)

export const MconnCustomerSnapshotsGetSuccess = named(
  "mconn_customer_snapshots_get_success",
  Type.Object({
    errors: Type.Optional(Type.Array(MconnCodedMessage)),
    messages: Type.Optional(Type.Array(MconnCodedMessage)),
    success: Type.Boolean(),
    result: Type.Unknown() /* unresolved: #/components/schemas/mconn_customer_snapshots_get_result */,
  }),
)

export const MconnSnapshotMetadata = named(
  "mconn_snapshot_metadata",
  Type.Object({
    a: Type.Number({ description: "Time the Snapshot was collected (seconds since the Unix epoch)" }),
    t: Type.Number({ description: "Time the Snapshot was recorded (seconds since the Unix epoch)" }),
  }),
)

export const MconnEvent = named(
  "mconn_event",
  Type.Union([
    Type.Object({
      k: Type.Union([Type.Literal("Init")], { description: "Initialized process" }),
    }),
    Type.Object({
      k: Type.Union([Type.Literal("Leave")], { description: "Stopped process" }),
    }),
    Type.Object({
      k: Type.Union([Type.Literal("StartAttestation")], { description: "Started attestation" }),
    }),
    Type.Object({
      k: Type.Union([Type.Literal("FinishAttestationSuccess")], { description: "Finished attestation" }),
    }),
    Type.Object({
      k: Type.Union([Type.Literal("FinishAttestationFailure")], { description: "Failed attestation" }),
    }),
    Type.Object({
      k: Type.Union([Type.Literal("StartRotateCryptKey")], { description: "Started crypt key rotation" }),
    }),
    Type.Object({
      k: Type.Union([Type.Literal("FinishRotateCryptKeySuccess")], { description: "Finished crypt key rotation" }),
    }),
    Type.Object({
      k: Type.Union([Type.Literal("FinishRotateCryptKeyFailure")], { description: "Failed crypt key rotation" }),
    }),
    Type.Object({
      k: Type.Union([Type.Literal("StartRotatePki")], { description: "Started PKI rotation" }),
    }),
    Type.Object({
      k: Type.Union([Type.Literal("FinishRotatePkiSuccess")], { description: "Finished PKI rotation" }),
    }),
    Type.Object({
      k: Type.Union([Type.Literal("FinishRotatePkiFailure")], { description: "Failed PKI rotation" }),
    }),
    Type.Object({
      k: Type.Union([Type.Literal("StartUpgrade")], { description: "Started upgrade" }),
      url: Type.String({ description: "Location of upgrade bundle" }),
    }),
    Type.Object({
      k: Type.Union([Type.Literal("FinishUpgradeSuccess")], { description: "Finished upgrade" }),
    }),
    Type.Object({
      k: Type.Union([Type.Literal("FinishUpgradeFailure")], { description: "Failed upgrade" }),
    }),
    Type.Object({
      k: Type.Union([Type.Literal("Reconcile")], { description: "Reconciled" }),
    }),
    Type.Object({
      k: Type.Union([Type.Literal("ConfigureCloudflaredTunnel")], { description: "Configured Cloudflared tunnel" }),
    }),
  ]),
)

export const MconnRecordedEvent = named(
  "mconn_recorded_event",
  Type.Object(
    {
      e: MconnEvent,
      n: Type.Number({ description: "Sequence number, used to order events with the same timestamp" }),
      t: Type.Number({ description: "Time the Event was recorded (seconds since the Unix epoch)" }),
    },
    { description: "Recorded Event" },
  ),
)

export const MconnCustomerEventsGetLatestSuccess = named(
  "mconn_customer_events_get_latest_success",
  Type.Object({
    errors: Type.Optional(Type.Array(MconnCodedMessage)),
    messages: Type.Optional(Type.Array(MconnCodedMessage)),
    success: Type.Boolean(),
    result: Type.Unknown() /* unresolved: #/components/schemas/mconn_customer_events_get_latest_result */,
  }),
)

export const MconnEnvelope = named(
  "mconn_envelope",
  Type.Object({
    errors: Type.Optional(Type.Array(MconnCodedMessage)),
    messages: Type.Optional(Type.Array(MconnCodedMessage)),
    success: Type.Boolean(),
  }),
)

export const MconnCustomerEventsGetSuccess = named(
  "mconn_customer_events_get_success",
  Type.Object({
    errors: Type.Optional(Type.Array(MconnCodedMessage)),
    messages: Type.Optional(Type.Array(MconnCodedMessage)),
    success: Type.Boolean(),
    result: Type.Unknown() /* unresolved: #/components/schemas/mconn_customer_events_get_result */,
  }),
)

export const MconnEventMetadata = named(
  "mconn_event_metadata",
  Type.Object({
    a: Type.Number({ description: "Time the Event was collected (seconds since the Unix epoch)" }),
    k: Type.String({ description: "Kind" }),
    n: Type.Number({ description: "Sequence number, used to order events with the same timestamp" }),
    t: Type.Number({ description: "Time the Event was recorded (seconds since the Unix epoch)" }),
  }),
)

export const MconnUuid = named("mconn_uuid", Type.String({ "x-auditable": true }))

export const MconnCustomerDevice = named(
  "mconn_customer_device",
  Type.Object({
    id: MconnUuid,
    serial_number: Type.Optional(Type.String({ "x-auditable": true })),
  }),
)

export const MconnCustomerConnector = named(
  "mconn_customer_connector",
  Type.Object({
    activated: Type.Boolean({ "x-auditable": true, "x-stainless-terraform-configurability": "computed_optional" }),
    device: Type.Optional(MconnCustomerDevice),
    id: MconnUuid,
    interrupt_window_duration_hours: Type.Number({
      "x-auditable": true,
      "x-stainless-terraform-configurability": "computed_optional",
    }),
    interrupt_window_hour_of_day: Type.Number({
      "x-auditable": true,
      "x-stainless-terraform-configurability": "computed_optional",
    }),
    last_heartbeat: Type.Optional(Type.String({ "x-auditable": true })),
    last_seen_version: Type.Optional(Type.String({ "x-auditable": true })),
    last_updated: Type.String({ "x-auditable": true }),
    notes: Type.String({ "x-auditable": true, "x-stainless-terraform-configurability": "computed_optional" }),
    timezone: Type.String({ "x-auditable": true, "x-stainless-terraform-configurability": "computed_optional" }),
  }),
)

export const MconnCustomerConnectorFields = named(
  "mconn_customer_connector_fields",
  Type.Object({
    activated: Type.Optional(
      Type.Boolean({ "x-auditable": true, "x-stainless-terraform-configurability": "computed_optional" }),
    ),
    interrupt_window_duration_hours: Type.Optional(
      Type.Number({ "x-auditable": true, "x-stainless-terraform-configurability": "computed_optional" }),
    ),
    interrupt_window_hour_of_day: Type.Optional(
      Type.Number({ "x-auditable": true, "x-stainless-terraform-configurability": "computed_optional" }),
    ),
    notes: Type.Optional(
      Type.String({ "x-auditable": true, "x-stainless-terraform-configurability": "computed_optional" }),
    ),
    timezone: Type.Optional(
      Type.String({ "x-auditable": true, "x-stainless-terraform-configurability": "computed_optional" }),
    ),
  }),
)

export const MconnCustomerConnectorUpdateRequest = named(
  "mconn_customer_connector_update_request",
  MconnCustomerConnectorFields,
)

export const MconnCustomerConnectorFetchResponse = named(
  "mconn_customer_connector_fetch_response",
  Type.Object({
    messages: Type.Array(MconnCodedMessage),
    success: Type.Boolean(),
    errors: Type.Array(MconnCodedMessage),
    result: MconnCustomerConnector,
  }),
)

export const MconnCustomerDeviceIdentifier = named(
  "mconn_customer_device_identifier",
  Type.Object({
    id: Type.Optional(
      Type.String({ "x-auditable": true, "x-stainless-terraform-configurability": "computed_optional" }),
    ),
    serial_number: Type.Optional(
      Type.String({ "x-auditable": true, "x-stainless-terraform-configurability": "computed_optional" }),
    ),
  }),
)

export const MconnCustomerConnectorCreateRequest = named(
  "mconn_customer_connector_create_request",
  Type.Object({
    device: MconnCustomerDeviceIdentifier,
    activated: Type.Optional(
      Type.Boolean({ "x-auditable": true, "x-stainless-terraform-configurability": "computed_optional" }),
    ),
    interrupt_window_duration_hours: Type.Optional(
      Type.Number({ "x-auditable": true, "x-stainless-terraform-configurability": "computed_optional" }),
    ),
    interrupt_window_hour_of_day: Type.Optional(
      Type.Number({ "x-auditable": true, "x-stainless-terraform-configurability": "computed_optional" }),
    ),
    notes: Type.Optional(
      Type.String({ "x-auditable": true, "x-stainless-terraform-configurability": "computed_optional" }),
    ),
    timezone: Type.Optional(
      Type.String({ "x-auditable": true, "x-stainless-terraform-configurability": "computed_optional" }),
    ),
  }),
)

export const MconnAccountId = named(
  "mconn_account_id",
  Type.String({ description: "Account identifier", maxLength: 32, readOnly: true }),
)

export const MconnBadResponse = named(
  "mconn_bad_response",
  Type.Object({
    messages: Type.Array(MconnCodedMessage),
    success: Type.Boolean(),
    errors: Type.Array(MconnCodedMessage),
    result: DlpEmpty,
  }),
)

export const MconnCustomerConnectorListResponse = named(
  "mconn_customer_connector_list_response",
  Type.Object({
    messages: Type.Array(MconnCodedMessage),
    success: Type.Boolean(),
    errors: Type.Array(MconnCodedMessage),
    result: Type.Array(MconnCustomerConnector),
  }),
)

export const McnErrorMeta = named(
  "mcn_error_meta",
  Type.Object({
    l10n_key: Type.Optional(Type.String({ "x-auditable": true })),
    loggable_error: Type.Optional(Type.String()),
    template_data: Type.Optional(Type.Unknown()),
    trace_id: Type.Optional(Type.String({ "x-auditable": true })),
  }),
)

export const McnErrorSource = named(
  "mcn_error_source",
  Type.Object({
    parameter: Type.Optional(Type.String({ "x-auditable": true })),
    parameter_value_index: Type.Optional(Type.Integer({ "x-auditable": true })),
    pointer: Type.Optional(Type.String({ "x-auditable": true })),
  }),
)

export const McnError = named(
  "mcn_error",
  Type.Object({
    code: Type.Union(
      [
        Type.Literal(1001),
        Type.Literal(1002),
        Type.Literal(1003),
        Type.Literal(1004),
        Type.Literal(1005),
        Type.Literal(1006),
        Type.Literal(1007),
        Type.Literal(1008),
        Type.Literal(1009),
        Type.Literal(1010),
        Type.Literal(1011),
        Type.Literal(1012),
        Type.Literal(1013),
        Type.Literal(1014),
        Type.Literal(1015),
        Type.Literal(1016),
        Type.Literal(1017),
        Type.Literal(2001),
        Type.Literal(2002),
        Type.Literal(2003),
        Type.Literal(2004),
        Type.Literal(2005),
        Type.Literal(2006),
        Type.Literal(2007),
        Type.Literal(2008),
        Type.Literal(2009),
        Type.Literal(2010),
        Type.Literal(2011),
        Type.Literal(2012),
        Type.Literal(2013),
        Type.Literal(2014),
        Type.Literal(2015),
        Type.Literal(2016),
        Type.Literal(2017),
        Type.Literal(2018),
        Type.Literal(2019),
        Type.Literal(2020),
        Type.Literal(2021),
        Type.Literal(2022),
        Type.Literal(3001),
        Type.Literal(3002),
        Type.Literal(3003),
        Type.Literal(3004),
        Type.Literal(3005),
        Type.Literal(3006),
        Type.Literal(3007),
        Type.Literal(4001),
        Type.Literal(4002),
        Type.Literal(4003),
        Type.Literal(4004),
        Type.Literal(4005),
        Type.Literal(4006),
        Type.Literal(4007),
        Type.Literal(4008),
        Type.Literal(4009),
        Type.Literal(4010),
        Type.Literal(4011),
        Type.Literal(4012),
        Type.Literal(4013),
        Type.Literal(4014),
        Type.Literal(4015),
        Type.Literal(4016),
        Type.Literal(4017),
        Type.Literal(4018),
        Type.Literal(4019),
        Type.Literal(4020),
        Type.Literal(4021),
        Type.Literal(4022),
        Type.Literal(4023),
        Type.Literal(5001),
        Type.Literal(5002),
        Type.Literal(5003),
        Type.Literal(5004),
        Type.Literal(102000),
        Type.Literal(102001),
        Type.Literal(102002),
        Type.Literal(102003),
        Type.Literal(102004),
        Type.Literal(102005),
        Type.Literal(102006),
        Type.Literal(102007),
        Type.Literal(102008),
        Type.Literal(102009),
        Type.Literal(102010),
        Type.Literal(102011),
        Type.Literal(102012),
        Type.Literal(102013),
        Type.Literal(102014),
        Type.Literal(102015),
        Type.Literal(102016),
        Type.Literal(102017),
        Type.Literal(102018),
        Type.Literal(102019),
        Type.Literal(102020),
        Type.Literal(102021),
        Type.Literal(102022),
        Type.Literal(102023),
        Type.Literal(102024),
        Type.Literal(102025),
        Type.Literal(102026),
        Type.Literal(102027),
        Type.Literal(102028),
        Type.Literal(102029),
        Type.Literal(102030),
        Type.Literal(102031),
        Type.Literal(102032),
        Type.Literal(102033),
        Type.Literal(102034),
        Type.Literal(102035),
        Type.Literal(102036),
        Type.Literal(102037),
        Type.Literal(102038),
        Type.Literal(102039),
        Type.Literal(102040),
        Type.Literal(102041),
        Type.Literal(102042),
        Type.Literal(102043),
        Type.Literal(102044),
        Type.Literal(102045),
        Type.Literal(102046),
        Type.Literal(102047),
        Type.Literal(102048),
        Type.Literal(102049),
        Type.Literal(102050),
        Type.Literal(102051),
        Type.Literal(102052),
        Type.Literal(102053),
        Type.Literal(102054),
        Type.Literal(102055),
        Type.Literal(102056),
        Type.Literal(102057),
        Type.Literal(102058),
        Type.Literal(102059),
        Type.Literal(102060),
        Type.Literal(102061),
        Type.Literal(102062),
        Type.Literal(102063),
        Type.Literal(102064),
        Type.Literal(102065),
        Type.Literal(102066),
        Type.Literal(103001),
        Type.Literal(103002),
        Type.Literal(103003),
        Type.Literal(103004),
        Type.Literal(103005),
        Type.Literal(103006),
        Type.Literal(103007),
        Type.Literal(103008),
      ],
      { "x-auditable": true },
    ),
    documentation_url: Type.Optional(Type.String()),
    message: Type.String(),
    meta: Type.Optional(McnErrorMeta),
    source: Type.Optional(McnErrorSource),
  }),
)

export const McnCloudType = named(
  "mcn_cloud_type",
  Type.Union([Type.Literal("AWS"), Type.Literal("AZURE"), Type.Literal("GOOGLE"), Type.Literal("CLOUDFLARE")], {
    "x-auditable": true,
  }),
)

export const McnOnrampId = named("mcn_onramp_id", Type.String({ format: "uuid", "x-auditable": true }))

export const McnCloudPlatformClient = named(
  "mcn_cloud_platform_client",
  Type.Object({
    client_type: Type.Union([Type.Literal("MAGIC_WAN_CLOUD_ONRAMP")], { "x-auditable": true }),
    id: McnOnrampId,
    name: Type.String({ "x-auditable": true }),
  }),
)

export const McnCost = named(
  "mcn_cost",
  Type.Object({
    currency: Type.String({ "x-auditable": true }),
    monthly_cost: Type.Number({ format: "double" }),
  }),
)

export const McnObservation = named(
  "mcn_observation",
  Type.Object({
    first_observed_at: Type.String({ "x-auditable": true }),
    last_observed_at: Type.String({ "x-auditable": true }),
    provider_id: McnOnrampId,
    resource_id: McnOnrampId,
  }),
)

export const McnResourceType = named(
  "mcn_resource_type",
  Type.Union(
    [
      Type.Literal("aws_customer_gateway"),
      Type.Literal("aws_egress_only_internet_gateway"),
      Type.Literal("aws_internet_gateway"),
      Type.Literal("aws_instance"),
      Type.Literal("aws_network_interface"),
      Type.Literal("aws_route"),
      Type.Literal("aws_route_table"),
      Type.Literal("aws_route_table_association"),
      Type.Literal("aws_subnet"),
      Type.Literal("aws_vpc"),
      Type.Literal("aws_vpc_ipv4_cidr_block_association"),
      Type.Literal("aws_vpn_connection"),
      Type.Literal("aws_vpn_connection_route"),
      Type.Literal("aws_vpn_gateway"),
      Type.Literal("aws_security_group"),
      Type.Literal("aws_vpc_security_group_ingress_rule"),
      Type.Literal("aws_vpc_security_group_egress_rule"),
      Type.Literal("aws_ec2_managed_prefix_list"),
      Type.Literal("aws_ec2_transit_gateway"),
      Type.Literal("aws_ec2_transit_gateway_prefix_list_reference"),
      Type.Literal("aws_ec2_transit_gateway_vpc_attachment"),
      Type.Literal("azurerm_application_security_group"),
      Type.Literal("azurerm_lb"),
      Type.Literal("azurerm_lb_backend_address_pool"),
      Type.Literal("azurerm_lb_nat_pool"),
      Type.Literal("azurerm_lb_nat_rule"),
      Type.Literal("azurerm_lb_rule"),
      Type.Literal("azurerm_local_network_gateway"),
      Type.Literal("azurerm_network_interface"),
      Type.Literal("azurerm_network_interface_application_security_group_association"),
      Type.Literal("azurerm_network_interface_backend_address_pool_association"),
      Type.Literal("azurerm_network_interface_security_group_association"),
      Type.Literal("azurerm_network_security_group"),
      Type.Literal("azurerm_public_ip"),
      Type.Literal("azurerm_route"),
      Type.Literal("azurerm_route_table"),
      Type.Literal("azurerm_subnet"),
      Type.Literal("azurerm_subnet_route_table_association"),
      Type.Literal("azurerm_virtual_machine"),
      Type.Literal("azurerm_virtual_network_gateway_connection"),
      Type.Literal("azurerm_virtual_network"),
      Type.Literal("azurerm_virtual_network_gateway"),
      Type.Literal("google_compute_network"),
      Type.Literal("google_compute_subnetwork"),
      Type.Literal("google_compute_vpn_gateway"),
      Type.Literal("google_compute_vpn_tunnel"),
      Type.Literal("google_compute_route"),
      Type.Literal("google_compute_address"),
      Type.Literal("google_compute_global_address"),
      Type.Literal("google_compute_router"),
      Type.Literal("google_compute_interconnect_attachment"),
      Type.Literal("google_compute_ha_vpn_gateway"),
      Type.Literal("google_compute_forwarding_rule"),
      Type.Literal("google_compute_network_firewall_policy"),
      Type.Literal("google_compute_network_firewall_policy_rule"),
      Type.Literal("cloudflare_static_route"),
      Type.Literal("cloudflare_ipsec_tunnel"),
    ],
    { "x-auditable": true },
  ),
)

export const McnStringItem = named(
  "mcn_string_item",
  Type.Object({
    item_type: Type.String(),
    string: Type.String(),
  }),
)

export const McnYamlItem = named(
  "mcn_yaml_item",
  Type.Object({
    item_type: Type.String(),
    yaml: Type.String(),
  }),
)

export const McnYamlDiff = named(
  "mcn_yaml_diff",
  Type.Object({
    diff: Type.String(),
    left_description: Type.String(),
    left_yaml: Type.String(),
    right_description: Type.String(),
    right_yaml: Type.String(),
  }),
)

export const McnYamlDiffItem = named(
  "mcn_yaml_diff_item",
  Type.Object({
    item_type: Type.String(),
    yaml_diff: McnYamlDiff,
  }),
)

export const McnResourcePreview = named(
  "mcn_resource_preview",
  Type.Object({
    cloud_type: McnCloudType,
    detail: Type.String(),
    id: McnOnrampId,
    name: Type.String(),
    resource_type: McnResourceType,
    title: Type.String(),
  }),
)

export const McnResourcePreviewItem = named(
  "mcn_resource_preview_item",
  Type.Object({
    item_type: Type.String({ "x-auditable": true }),
    resource_preview: McnResourcePreview,
  }),
)

export const McnListItem = named(
  "mcn_list_item",
  Type.Object({
    item_type: Type.String(),
    list: Type.Array(Type.Union([McnStringItem, McnResourcePreviewItem]), {
      "x-stainless-naming": { python: { property_name: "rule_list" } },
    }),
  }),
)

export const McnResourceDetailsSectionItem = named(
  "mcn_resource_details_section_item",
  Type.Object({
    helpText: Type.Optional(Type.String()),
    name: Type.Optional(Type.String()),
    value: Type.Optional(
      Type.Union([McnStringItem, McnYamlItem, McnYamlDiffItem, McnResourcePreviewItem, McnListItem]),
    ),
  }),
)

export const McnResourceDetailsSection = named(
  "mcn_resource_details_section",
  Type.Object({
    help_text: Type.Optional(Type.String()),
    hidden_items: Type.Array(McnResourceDetailsSectionItem),
    name: Type.String(),
    visible_items: Type.Array(McnResourceDetailsSectionItem),
  }),
)

export const McnResourceDetails = named(
  "mcn_resource_details",
  Type.Object({
    account_id: MconnUuid,
    cloud_type: McnCloudType,
    config: Type.Record(Type.String(), Type.Unknown()),
    deployment_provider: McnOnrampId,
    id: McnOnrampId,
    managed: Type.Boolean({ "x-auditable": true }),
    managed_by: Type.Optional(Type.Array(McnCloudPlatformClient)),
    monthly_cost_estimate: McnCost,
    name: Type.String(),
    native_id: Type.String(),
    observations: Type.Record(Type.String(), McnObservation),
    provider_ids: Type.Array(McnOnrampId),
    provider_names_by_id: Type.Record(Type.String(), Type.String()),
    region: Type.String({ "x-auditable": true }),
    resource_group: Type.String({ "x-auditable": true }),
    resource_type: McnResourceType,
    sections: Type.Array(McnResourceDetailsSection),
    state: Type.Record(Type.String(), Type.Unknown()),
    tags: Type.Record(Type.String(), Type.String()),
    updated_at: Type.String({ readOnly: true }),
    url: Type.String(),
  }),
)

export const McnReadAccountResourceResponse = named(
  "mcn_read_account_resource_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
    result: McnResourceDetails,
  }),
)

export const McnResourcesCatalogPolicyPreviewResponse = named(
  "mcn_resources_catalog_policy_preview_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
    result: McnPolicyResult,
  }),
)

export const McnResourcesCatalogPolicyPreviewRequest = named(
  "mcn_resources_catalog_policy_preview_request",
  Type.Object({
    policy: Type.String(),
  }),
)

export const McnResultInfo = named(
  "mcn_result_info",
  Type.Object({
    count: Type.Integer({ description: "The number of items in the current result set." }),
    page: Type.Integer({ description: "The current page (starts from zero)." }),
    per_page: Type.Integer({ description: "The maximum numnber of items per page." }),
    total_count: Type.Integer({ description: "The total number of items in the entire result set." }),
    total_pages: Type.Optional(Type.Integer({ description: "The number of total pages in the entire result set." })),
  }),
)

export const McnReadAccountResourcesResponse = named(
  "mcn_read_account_resources_response",
  Type.Object({
    messages: Type.Array(McnError),
    result_info: Type.Optional(McnResultInfo),
    success: Type.Boolean(),
    errors: Type.Array(McnError),
    result: Type.Array(McnResourceDetails),
  }),
)

export const McnAwsTrustPolicy = named(
  "mcn_aws_trust_policy",
  Type.Object({
    aws_trust_policy: Type.String(),
    item_type: Type.String({ "x-auditable": true }),
  }),
)

export const McnAzureSetup = named(
  "mcn_azure_setup",
  Type.Object({
    azure_consent_url: Type.String(),
    integration_identity_tag: Type.String({ "x-auditable": true }),
    item_type: Type.String({ "x-auditable": true }),
    tag_cli_command: Type.String(),
  }),
)

export const McnGcpSetup = named(
  "mcn_gcp_setup",
  Type.Object({
    integration_identity_tag: Type.String({ "x-auditable": true }),
    item_type: Type.String({ "x-auditable": true }),
    tag_cli_command: Type.String(),
  }),
)

export const McnProviderInitialSetupResponse = named(
  "mcn_provider_initial_setup_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
    result: Type.Union([McnAwsTrustPolicy, McnAzureSetup, McnGcpSetup]),
  }),
)

export const McnDeletedProvider = named(
  "mcn_deleted_provider",
  Type.Object({
    id: McnOnrampId,
  }),
)

export const McnDeleteProviderResponse = named(
  "mcn_delete_provider_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
    result: McnDeletedProvider,
  }),
)

export const McnProviderLifecycleState = named(
  "mcn_provider_lifecycle_state",
  Type.Union([Type.Literal("ACTIVE"), Type.Literal("PENDING_SETUP"), Type.Literal("RETIRED")], { "x-auditable": true }),
)

export const McnProviderDiscoveryStatus = named(
  "mcn_provider_discovery_status",
  Type.Union(
    [
      Type.Literal("UNSPECIFIED"),
      Type.Literal("PENDING"),
      Type.Literal("DISCOVERING"),
      Type.Literal("FAILED"),
      Type.Literal("SUCCEEDED"),
    ],
    { "x-auditable": true },
  ),
)

export const McnProviderDiscoveryProgress = named(
  "mcn_provider_discovery_progress",
  Type.Object({
    done: Type.Integer({ "x-auditable": true }),
    total: Type.Integer({ "x-auditable": true }),
    unit: Type.String({ "x-auditable": true }),
  }),
)

export const McnProviderStatus = named(
  "mcn_provider_status",
  Type.Object({
    credentials_good_since: Type.Optional(Type.String({ "x-auditable": true })),
    credentials_missing_since: Type.Optional(Type.String({ "x-auditable": true })),
    credentials_rejected_since: Type.Optional(Type.String({ "x-auditable": true })),
    discovery_message: Type.Optional(Type.String({ "x-auditable": true })),
    discovery_message_v2: Type.Optional(Type.String({ "x-auditable": true })),
    discovery_progress: McnProviderDiscoveryProgress,
    discovery_progress_v2: McnProviderDiscoveryProgress,
    in_use_by: Type.Optional(Type.Array(McnCloudPlatformClient)),
    last_discovery_completed_at: Type.Optional(Type.String({ "x-auditable": true })),
    last_discovery_completed_at_v2: Type.Optional(Type.String({ "x-auditable": true })),
    last_discovery_started_at: Type.Optional(Type.String({ "x-auditable": true })),
    last_discovery_started_at_v2: Type.Optional(Type.String({ "x-auditable": true })),
    last_discovery_status: McnProviderDiscoveryStatus,
    last_discovery_status_v2: McnProviderDiscoveryStatus,
    last_updated: Type.Optional(Type.String({ "x-auditable": true })),
    regions: Type.Array(Type.String({ "x-auditable": true })),
  }),
)

export const McnProvider = named(
  "mcn_provider",
  Type.Object({
    aws_arn: Type.Optional(Type.String({ "x-auditable": true })),
    azure_subscription_id: Type.Optional(Type.String({ "x-auditable": true })),
    azure_tenant_id: Type.Optional(Type.String({ "x-auditable": true })),
    cloud_type: McnCloudType,
    description: Type.Optional(Type.String()),
    friendly_name: Type.String(),
    gcp_project_id: Type.Optional(Type.String({ "x-auditable": true })),
    gcp_service_account_email: Type.Optional(Type.String({ "x-auditable": true })),
    id: McnOnrampId,
    last_updated: Type.String({ "x-auditable": true }),
    lifecycle_state: McnProviderLifecycleState,
    state: McnProviderDiscoveryStatus,
    state_v2: McnProviderDiscoveryStatus,
    status: Type.Optional(McnProviderStatus),
  }),
)

export const McnUpdateProviderRequest = named(
  "mcn_update_provider_request",
  Type.Object({
    aws_arn: Type.Optional(Type.String({ "x-auditable": true })),
    azure_subscription_id: Type.Optional(Type.String({ "x-auditable": true })),
    azure_tenant_id: Type.Optional(Type.String({ "x-auditable": true })),
    description: Type.Optional(Type.String({ "x-auditable": true })),
    friendly_name: Type.Optional(Type.String({ "x-auditable": true })),
    gcp_project_id: Type.Optional(Type.String({ "x-auditable": true })),
    gcp_service_account_email: Type.Optional(Type.String({ "x-auditable": true })),
  }),
)

export const McnCreateProviderResponse = named(
  "mcn_create_provider_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
    result: McnProvider,
  }),
)

export const McnCreateProviderRequest = named(
  "mcn_create_provider_request",
  Type.Object({
    cloud_type: McnCloudType,
    description: Type.Optional(Type.String({ "x-auditable": true })),
    friendly_name: Type.String({ "x-auditable": true }),
  }),
)

export const McnReadAccountProvidersResponse = named(
  "mcn_read_account_providers_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
    result: Type.Array(McnProvider),
  }),
)

export const McnGoodResponse = named(
  "mcn_good_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
  }),
)

export const McnDeletedOnramp = named(
  "mcn_deleted_onramp",
  Type.Object({
    id: McnOnrampId,
  }),
)

export const McnDeleteOnrampResponse = named(
  "mcn_delete_onramp_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
    result: McnDeletedOnramp,
  }),
)

export const McnOnrampCloudType = named(
  "mcn_onramp_cloud_type",
  Type.Union([Type.Literal("AWS"), Type.Literal("AZURE"), Type.Literal("GOOGLE")], { "x-auditable": true }),
)

export const McnCostDiff = named(
  "mcn_cost_diff",
  Type.Object({
    currency: Type.String({ "x-auditable": true }),
    current_monthly_cost: Type.Number({ format: "double" }),
    diff: Type.Number({ format: "double" }),
    proposed_monthly_cost: Type.Number({ format: "double" }),
  }),
)

export const McnPlannedAction = named(
  "mcn_planned_action",
  Type.Union(
    [
      Type.Literal("no_op"),
      Type.Literal("create"),
      Type.Literal("update"),
      Type.Literal("replace"),
      Type.Literal("destroy"),
    ],
    { "x-auditable": true },
  ),
)

export const McnResourceDiff = named(
  "mcn_resource_diff",
  Type.Object({
    diff: McnYamlDiff,
    keys_require_replace: Type.Array(Type.String()),
    monthly_cost_estimate_diff: McnCostDiff,
    planned_action: McnPlannedAction,
    resource: McnResourcePreview,
  }),
)

export const McnPlanProgress = named(
  "mcn_plan_progress",
  Type.Object({
    done: Type.Integer({ "x-auditable": true }),
    total: Type.Integer({ "x-auditable": true }),
  }),
)

export const McnOnrampLifecycleState = named(
  "mcn_onramp_lifecycle_state",
  Type.Union(
    [
      Type.Literal("OnrampNeedsApply"),
      Type.Literal("OnrampPendingPlan"),
      Type.Literal("OnrampPlanning"),
      Type.Literal("OnrampPlanFailed"),
      Type.Literal("OnrampPendingApproval"),
      Type.Literal("OnrampPendingApply"),
      Type.Literal("OnrampApplying"),
      Type.Literal("OnrampApplyFailed"),
      Type.Literal("OnrampActive"),
      Type.Literal("OnrampPendingDestroy"),
      Type.Literal("OnrampDestroying"),
      Type.Literal("OnrampDestroyFailed"),
    ],
    { "x-auditable": true },
  ),
)

export const McnOnrampStatus = named(
  "mcn_onramp_status",
  Type.Object({
    apply_progress: McnPlanProgress,
    lifecycle_errors: Type.Optional(Type.Record(Type.String(), McnError)),
    lifecycle_state: McnOnrampLifecycleState,
    plan_progress: McnPlanProgress,
    routes: Type.Array(McnOnrampId),
    tunnels: Type.Array(McnOnrampId),
  }),
)

export const McnOnrampType = named(
  "mcn_onramp_type",
  Type.Union([Type.Literal("OnrampTypeSingle"), Type.Literal("OnrampTypeHub")], { "x-auditable": true }),
)

export const McnOnramp = named(
  "mcn_onramp",
  Type.Object({
    attached_hubs: Type.Optional(Type.Array(McnOnrampId)),
    attached_vpcs: Type.Optional(Type.Array(McnOnrampId)),
    cloud_type: McnOnrampCloudType,
    description: Type.Optional(Type.String({ "x-auditable": true })),
    hub: Type.Optional(McnOnrampId),
    id: McnOnrampId,
    install_routes_in_cloud: Type.Boolean({ "x-auditable": true }),
    install_routes_in_magic_wan: Type.Boolean({ "x-auditable": true }),
    last_applied_at: Type.Optional(Type.String({ "x-auditable": true })),
    last_exported_at: Type.Optional(Type.String({ "x-auditable": true })),
    last_planned_at: Type.Optional(Type.String({ "x-auditable": true })),
    manage_hub_to_hub_attachments: Type.Optional(Type.Boolean({ "x-auditable": true })),
    manage_vpc_to_hub_attachments: Type.Optional(Type.Boolean({ "x-auditable": true })),
    name: Type.String({ "x-auditable": true }),
    planned_monthly_cost_estimate: Type.Optional(McnCostDiff),
    planned_resources: Type.Optional(Type.Array(McnResourceDiff)),
    planned_resources_unavailable: Type.Optional(Type.Boolean({ "x-auditable": true })),
    post_apply_monthly_cost_estimate: Type.Optional(McnCost),
    post_apply_resources: Type.Optional(Type.Record(Type.String(), McnResourceDetails)),
    post_apply_resources_unavailable: Type.Optional(Type.Boolean({ "x-auditable": true })),
    region: Type.Optional(Type.String({ "x-auditable": true })),
    status: Type.Optional(McnOnrampStatus),
    type: McnOnrampType,
    updated_at: Type.String({ readOnly: true }),
    vpc: Type.Optional(McnOnrampId),
    vpcs_by_id: Type.Optional(Type.Record(Type.String(), McnResourceDetails)),
    vpcs_by_id_unavailable: Type.Optional(
      Type.Array(McnOnrampId, { description: "The list of vpc IDs for which resource details failed to generate." }),
    ),
  }),
)

export const McnUpdateOnrampRequest = named(
  "mcn_update_onramp_request",
  Type.Object({
    attached_hubs: Type.Optional(Type.Array(McnOnrampId)),
    attached_vpcs: Type.Optional(Type.Array(McnOnrampId)),
    description: Type.Optional(Type.String()),
    install_routes_in_cloud: Type.Optional(Type.Boolean({ "x-auditable": true })),
    install_routes_in_magic_wan: Type.Optional(Type.Boolean()),
    manage_hub_to_hub_attachments: Type.Optional(Type.Boolean()),
    manage_vpc_to_hub_attachments: Type.Optional(Type.Boolean()),
    name: Type.Optional(Type.String()),
    vpc: Type.Optional(McnOnrampId),
  }),
)

export const McnGetOnrampResponse = named(
  "mcn_get_onramp_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
    result: McnOnramp,
  }),
)

export const McnCidrPrefix = named(
  "mcn_cidr_prefix",
  Type.String({ description: "An IP address prefix in CIDR format.", "x-auditable": true }),
)

export const McnMagicWanAddressSpace = named(
  "mcn_magic_wan_address_space",
  Type.Object({
    prefixes: Type.Array(McnCidrPrefix),
  }),
)

export const McnGetMagicWanAddressSpaceResponse = named(
  "mcn_get_magic_wan_address_space_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
    result: McnMagicWanAddressSpace,
  }),
)

export const McnCreateOnrampRequest = named(
  "mcn_create_onramp_request",
  Type.Object({
    adopted_hub_id: Type.Optional(McnOnrampId),
    attached_hubs: Type.Optional(Type.Array(McnOnrampId)),
    attached_vpcs: Type.Optional(Type.Array(McnOnrampId)),
    cloud_type: McnOnrampCloudType,
    description: Type.Optional(Type.String()),
    hub_provider_id: Type.Optional(McnOnrampId),
    install_routes_in_cloud: Type.Boolean({ "x-auditable": true }),
    install_routes_in_magic_wan: Type.Boolean({ "x-auditable": true }),
    manage_hub_to_hub_attachments: Type.Optional(Type.Boolean({ "x-auditable": true })),
    manage_vpc_to_hub_attachments: Type.Optional(Type.Boolean({ "x-auditable": true })),
    name: Type.String(),
    region: Type.Optional(Type.String({ "x-auditable": true })),
    type: McnOnrampType,
    vpc: Type.Optional(McnOnrampId),
  }),
)

export const McnListOnrampsResponse = named(
  "mcn_list_onramps_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
    result: Type.Array(McnOnramp),
  }),
)

export const McnRefreshCatalogSyncResponse = named(
  "mcn_refresh_catalog_sync_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
    result: McnPolicyResult,
  }),
)

export const McnCatalogSyncId = named("mcn_catalog_sync_id", Type.String({ format: "uuid" }))

export const McnDeletedCatalogSync = named(
  "mcn_deleted_catalog_sync",
  Type.Object({
    id: McnCatalogSyncId,
  }),
)

export const McnDeleteCatalogSyncResponse = named(
  "mcn_delete_catalog_sync_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
    result: McnDeletedCatalogSync,
  }),
)

export const McnCatalogSyncDestinationType = named(
  "mcn_catalog_sync_destination_type",
  Type.Union([Type.Literal("NONE"), Type.Literal("ZERO_TRUST_LIST")], { "x-auditable": true }),
)

export const McnCatalogSyncUpdateMode = named(
  "mcn_catalog_sync_update_mode",
  Type.Union([Type.Literal("AUTO"), Type.Literal("MANUAL")], { "x-auditable": true }),
)

export const McnCatalogSync = named(
  "mcn_catalog_sync",
  Type.Object({
    description: Type.String(),
    destination_id: McnOnrampId,
    destination_type: McnCatalogSyncDestinationType,
    errors: Type.Optional(Type.Record(Type.String(), McnError)),
    id: McnCatalogSyncId,
    includes_discoveries_until: Type.Optional(Type.String()),
    last_attempted_update_at: Type.Optional(Type.String()),
    last_successful_update_at: Type.Optional(Type.String()),
    last_user_update_at: Type.String(),
    name: Type.String(),
    policy: Type.String(),
    update_mode: McnCatalogSyncUpdateMode,
  }),
)

export const McnUpdateCatalogSyncRequest = named(
  "mcn_update_catalog_sync_request",
  Type.Object({
    description: Type.Optional(Type.String()),
    name: Type.Optional(Type.String()),
    policy: Type.Optional(Type.String()),
    update_mode: Type.Optional(McnCatalogSyncUpdateMode),
  }),
)

export const McnCatalogSyncsPrebuiltPolicy = named(
  "mcn_catalog_syncs_prebuilt_policy",
  Type.Object({
    applicable_destinations: Type.Array(McnCatalogSyncDestinationType),
    policy_description: Type.String(),
    policy_name: Type.String(),
    policy_string: Type.String(),
  }),
)

export const McnCatalogSyncsPrebuiltPoliciesResponse = named(
  "mcn_catalog_syncs_prebuilt_policies_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
    result: Type.Array(McnCatalogSyncsPrebuiltPolicy),
  }),
)

export const McnCreateCatalogSyncResponse = named(
  "mcn_create_catalog_sync_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
    result: McnCatalogSync,
  }),
)

export const McnCreateCatalogSyncRequest = named(
  "mcn_create_catalog_sync_request",
  Type.Object({
    description: Type.Optional(Type.String()),
    destination_type: McnCatalogSyncDestinationType,
    name: Type.String(),
    policy: Type.Optional(Type.String()),
    update_mode: McnCatalogSyncUpdateMode,
  }),
)

export const McnBadResponse = named(
  "mcn_bad_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
    result: Type.Union([Type.Null()]),
  }),
)

export const McnReadAccountCatalogSyncsResponse = named(
  "mcn_read_account_catalog_syncs_response",
  Type.Object({
    messages: Type.Array(McnError),
    success: Type.Boolean({ "x-auditable": true }),
    errors: Type.Array(McnError),
    result: Type.Array(McnCatalogSync),
  }),
)

export const MagicComponentsSchemasName = named(
  "magic_components-schemas-name",
  Type.String({ description: "The name of the interconnect. The name cannot share a name with other tunnels." }),
)

export const MagicInterconnectComponentsSchemasDescription = named(
  "magic_interconnect_components-schemas-description",
  Type.String({ description: "An optional description of the interconnect." }),
)

export const MagicGre = named(
  "magic_gre",
  Type.Object(
    {
      cloudflare_endpoint: Type.Optional(
        Type.String({
          description:
            "The IP address assigned to the Cloudflare side of the GRE tunnel created as part of the Interconnect.",
        }),
      ),
    },
    { description: "The configuration specific to GRE interconnects." },
  ),
)

export const MagicHealthCheckBase = named(
  "magic_health_check_base",
  Type.Object({
    enabled: Type.Optional(
      Type.Boolean({
        description: "Determines whether to run healthchecks for a tunnel.",
        default: true,
        "x-auditable": true,
      }),
    ),
    rate: Type.Optional(UnnamedSchemaRefEebdc868ce7f7ae92e23438caa84e7b5),
    target: Type.Optional(
      Type.Union([MagicHealthCheckTarget, Type.String()], {
        description:
          "The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.",
      }),
    ),
    type: Type.Optional(MagicHealthCheckType),
  }),
)

export const MagicInterconnectHealthCheck = named("magic_interconnect_health_check", MagicHealthCheckBase)

export const MagicSchemasMtu = named(
  "magic_schemas-mtu",
  Type.Integer({
    description: "The Maximum Transmission Unit (MTU) in bytes for the interconnect. The minimum value is 576.",
    default: 1476,
  }),
)

export const MagicInterconnect = named(
  "magic_interconnect",
  Type.Object({
    automatic_return_routing: Type.Optional(MagicAutomaticReturnRouting),
    colo_name: Type.Optional(MagicComponentsSchemasName),
    created_on: Type.Optional(MagicSchemasCreatedOn),
    description: Type.Optional(MagicInterconnectComponentsSchemasDescription),
    gre: Type.Optional(MagicGre),
    health_check: Type.Optional(MagicInterconnectHealthCheck),
    id: Type.Optional(MagicSchemasIdentifier),
    interface_address: Type.Optional(MagicInterfaceAddress),
    interface_address6: Type.Optional(MagicInterfaceAddress6),
    modified_on: Type.Optional(MagicSchemasModifiedOn),
    mtu: Type.Optional(MagicSchemasMtu),
    name: Type.Optional(MagicComponentsSchemasName),
  }),
)

export const MagicComponentsSchemasTunnelModifiedResponse = named(
  "magic_components-schemas-tunnel_modified_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      modified: Type.Optional(Type.Boolean()),
      modified_interconnect: Type.Optional(MagicInterconnect),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicInterconnectTunnelUpdateRequest = named(
  "magic_interconnect_tunnel_update_request",
  Type.Object({
    automatic_return_routing: Type.Optional(MagicAutomaticReturnRouting),
    description: Type.Optional(MagicInterconnectComponentsSchemasDescription),
    gre: Type.Optional(MagicGre),
    health_check: Type.Optional(MagicInterconnectHealthCheck),
    interface_address: Type.Optional(MagicInterfaceAddress),
    interface_address6: Type.Optional(MagicInterfaceAddress6),
    mtu: Type.Optional(MagicSchemasMtu),
  }),
)

export const MagicComponentsSchemasTunnelSingleResponse = named(
  "magic_components-schemas-tunnel_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      interconnect: Type.Optional(MagicInterconnect),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicComponentsSchemasModifiedTunnelsCollectionResponse = named(
  "magic_components-schemas-modified_tunnels_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      modified: Type.Optional(Type.Boolean()),
      modified_interconnects: Type.Optional(Type.Array(MagicInterconnect)),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicComponentsSchemasTunnelsCollectionResponse = named(
  "magic_components-schemas-tunnels_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      interconnects: Type.Optional(Type.Array(MagicInterconnect)),
    }),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicAppHostnames = named(
  "magic_app_hostnames",
  Type.Array(Type.String(), { description: "FQDNs to associate with traffic decisions." }),
)

export const MagicAppSubnets = named(
  "magic_app_subnets",
  Type.Array(MagicCidr, {
    description: "IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)",
  }),
)

export const MagicAppName = named("magic_app_name", Type.String({ description: "Display name for the app." }))

export const MagicAppType = named("magic_app_type", Type.String({ description: "Category of the app." }))

export const MagicAppUpdateRequest = named(
  "magic_app_update_request",
  Type.Union([Type.Unknown(), Type.Unknown(), Type.Unknown(), Type.Unknown()]),
)

export const MagicAccountApp = named(
  "magic_account_app",
  Type.Object(
    {
      account_app_id: MagicAccountAppId,
      hostnames: Type.Optional(MagicAppHostnames),
      ip_subnets: Type.Optional(MagicAppSubnets),
      name: Type.Optional(MagicAppName),
      type: Type.Optional(MagicAppType),
    },
    { description: "Custom app defined for an account." },
  ),
)

export const MagicAppSingleResponse = named(
  "magic_app_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: MagicAccountApp,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicAppAddSingleRequest = named(
  "magic_app_add_single_request",
  Type.Union([Type.Unknown(), Type.Unknown()]),
)

export const MagicApiResponseCommonFailure = named(
  "magic_api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful" }),
  }),
)

export const MagicManagedApp = named(
  "magic_managed_app",
  Type.Object(
    {
      hostnames: Type.Optional(MagicAppHostnames),
      ip_subnets: Type.Optional(MagicAppSubnets),
      managed_app_id: MagicManagedAppId,
      name: Type.Optional(MagicAppName),
      type: Type.Optional(MagicAppType),
    },
    { description: "Managed app defined by Cloudflare." },
  ),
)

export const MagicApp = named(
  "magic_app",
  Type.Union([MagicAccountApp, MagicManagedApp], {
    description: "Collection of Hostnames and/or IP Subnets to associate with traffic decisions.",
  }),
)

export const MagicAppsCollectionResponse = named(
  "magic_apps_collection_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(MagicApp), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful" }),
  }),
)

import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { AccessUuid, D1Messages, IamEmail, IntelResultInfo, TeamsDevicesIdentifier } from "../shared/schemas"

export const TeamsDevicesDevicesPolicyCertificates = named(
  "teams-devices_devices_policy_certificates",
  Type.Object({
    enabled: Type.Boolean({
      description: "The current status of the device policy certificate provisioning feature for WARP clients.",
    }),
  }),
)

export const TeamsDevicesDevicesPolicyCertificatesSingle = named(
  "teams-devices_devices_policy_certificates_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: TeamsDevicesDevicesPolicyCertificates,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const TeamsDevicesDisableForTime = named(
  "teams-devices_disable_for_time",
  Type.Object({
    "1": Type.Optional(
      Type.String({
        description: "Override code that is valid for 1 hour.",
        "x-stainless-naming": { python: { property_name: "one" }, go: { property_name: "One" } },
      }),
    ),
    "3": Type.Optional(
      Type.String({
        description: "Override code that is valid for 3 hours.",
        "x-stainless-naming": { python: { property_name: "three" }, go: { property_name: "Three" } },
      }),
    ),
    "6": Type.Optional(
      Type.String({
        description: "Override code that is valid for 6 hours.",
        "x-stainless-naming": { python: { property_name: "six" }, go: { property_name: "Six" } },
      }),
    ),
    "12": Type.Optional(
      Type.String({
        description: "Override code that is valid for 12 hour2.",
        "x-stainless-naming": { python: { property_name: "twelve" }, go: { property_name: "Twelve" } },
      }),
    ),
    "24": Type.Optional(
      Type.String({
        description: "Override code that is valid for 24 hour.2.",
        "x-stainless-naming": { python: { property_name: "twenty_four" }, go: { property_name: "TwentyFour" } },
      }),
    ),
  }),
)

export const TeamsDevicesOverrideCodesResponse = named(
  "teams-devices_override_codes_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(Type.Unknown()), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IntelResultInfo),
  }),
)

export const TeamsDevicesVersion = named(
  "teams-devices_version",
  Type.String({ description: "The WARP client version." }),
)

export const TeamsDevicesUser = named(
  "teams-devices_user",
  Type.Object({
    email: Type.Optional(IamEmail),
    id: Type.Optional(AccessUuid),
    name: Type.Optional(Type.String({ description: "The enrolled device user's name." })),
  }),
)

export const TeamsDevicesUpdated = named(
  "teams-devices_updated",
  Type.String({ description: "When the device was updated.", format: "date-time", "x-auditable": true }),
)

export const TeamsDevicesTunnelType = named(
  "teams-devices_tunnel_type",
  Type.String({ description: "Type of the tunnel connection used.", "x-auditable": true }),
)

export const TeamsDevicesSerialNumber = named(
  "teams-devices_serial_number",
  Type.String({ description: "The device serial number." }),
)

export const TeamsDevicesOsVersion = named(
  "teams-devices_os_version",
  Type.String({ description: "The operating system version." }),
)

export const TeamsDevicesSchemasName = named(
  "teams-devices_schemas-name",
  Type.String({ description: "The device name." }),
)

export const TeamsDevicesModel = named("teams-devices_model", Type.String({ description: "The device model name." }))

export const TeamsDevicesMacAddress = named(
  "teams-devices_mac_address",
  Type.String({ description: "The device mac address.", "x-auditable": true }),
)

export const TeamsDevicesLastSeen = named(
  "teams-devices_last_seen",
  Type.String({
    description: "When the device last connected to Cloudflare services.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const TeamsDevicesKeyType = named(
  "teams-devices_key_type",
  Type.String({ description: "Type of the key.", "x-auditable": true }),
)

export const TeamsDevicesKey = named("teams-devices_key", Type.String({ description: "The device's public key." }))

export const TeamsDevicesIp = named(
  "teams-devices_ip",
  Type.String({ description: "IPv4 or IPv6 address.", "x-auditable": true }),
)

export const TeamsDevicesRegistrationId = named(
  "teams-devices_registration_id",
  Type.String({
    description:
      "Registration ID. Equal to Device ID except for accounts which enabled [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/).",
    maxLength: 36,
    "x-auditable": true,
  }),
)

export const TeamsDevicesGatewayDeviceId = named("teams-devices_gateway_device_id", Type.String({ deprecated: true }))

export const TeamsDevicesDeviceType = named("teams-devices_device_type", Type.String({ "x-auditable": true }))

export const TeamsDevicesDeleted = named(
  "teams-devices_deleted",
  Type.Boolean({ description: "True if the device was deleted." }),
)

export const TeamsDevicesCreated = named(
  "teams-devices_created",
  Type.String({ description: "When the device was created.", format: "date-time", "x-auditable": true }),
)

export const TeamsDevicesAccount = named(
  "teams-devices_account",
  Type.Object({
    account_type: Type.Optional(Type.String({ deprecated: true })),
    id: Type.Optional(Type.String({ deprecated: true })),
    name: Type.Optional(Type.String({ description: "The name of the enrolled account.", "x-auditable": true })),
  }),
)

export const TeamsDevicesDevice = named(
  "teams-devices_device",
  Type.Object({
    account: Type.Optional(TeamsDevicesAccount),
    created: Type.Optional(TeamsDevicesCreated),
    deleted: Type.Optional(TeamsDevicesDeleted),
    device_type: Type.Optional(TeamsDevicesDeviceType),
    gateway_device_id: Type.Optional(TeamsDevicesGatewayDeviceId),
    id: Type.Optional(TeamsDevicesRegistrationId),
    ip: Type.Optional(TeamsDevicesIp),
    key: Type.Optional(TeamsDevicesKey),
    key_type: Type.Optional(TeamsDevicesKeyType),
    last_seen: Type.Optional(TeamsDevicesLastSeen),
    mac_address: Type.Optional(TeamsDevicesMacAddress),
    model: Type.Optional(TeamsDevicesModel),
    name: Type.Optional(TeamsDevicesSchemasName),
    os_version: Type.Optional(TeamsDevicesOsVersion),
    serial_number: Type.Optional(TeamsDevicesSerialNumber),
    tunnel_type: Type.Optional(TeamsDevicesTunnelType),
    updated: Type.Optional(TeamsDevicesUpdated),
    user: Type.Optional(TeamsDevicesUser),
    version: Type.Optional(TeamsDevicesVersion),
  }),
)

export const TeamsDevicesDeviceResponse = named(
  "teams-devices_device_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: TeamsDevicesDevice,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const TeamsDevicesUnrevokeDevicesRequest = named(
  "teams-devices_unrevoke_devices_request",
  Type.Array(TeamsDevicesRegistrationId, { description: "A list of Registration IDs to unrevoke." }),
)

export const TeamsDevicesZeroTrustAccountDeviceSettings = named(
  "teams-devices_zero-trust-account-device-settings",
  Type.Object({
    disable_for_time: Type.Optional(
      Type.Number({
        description: "Sets the time limit, in seconds, that a user can use an override code to bypass WARP.",
      }),
    ),
    gateway_proxy_enabled: Type.Optional(Type.Boolean({ description: "Enable gateway proxy filtering on TCP." })),
    gateway_udp_proxy_enabled: Type.Optional(Type.Boolean({ description: "Enable gateway proxy filtering on UDP." })),
    root_certificate_installation_enabled: Type.Optional(
      Type.Boolean({ description: "Enable installation of cloudflare managed root certificate." }),
    ),
    use_zt_virtual_ip: Type.Optional(Type.Boolean({ description: "Enable using CGNAT virtual IPv4." })),
  }),
)

export const TeamsDevicesZeroTrustAccountDeviceSettingsResponse = named(
  "teams-devices_zero-trust-account-device-settings-response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: TeamsDevicesZeroTrustAccountDeviceSettings,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const TeamsDevicesApiResponseSingle = named(
  "teams-devices_api-response-single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Unknown(), Type.String()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const TeamsDevicesRevokeDevicesRequest = named(
  "teams-devices_revoke_devices_request",
  Type.Array(TeamsDevicesRegistrationId, { description: "A list of Registration IDs to revoke." }),
)

export const TeamsDevicesDisconnect = named(
  "teams-devices_disconnect",
  Type.Boolean({
    description: "Disconnects all devices on the account using Global WARP override.",
    "x-auditable": true,
  }),
)

export const TeamsDevicesJustification = named(
  "teams-devices_justification",
  Type.String({
    description: "Reasoning for setting the Global WARP override state. This will be surfaced in the audit log.",
    "x-auditable": true,
  }),
)

export const TeamsDevicesGlobalWarpOverrideRequest = named(
  "teams-devices_global_warp_override_request",
  Type.Object({
    disconnect: TeamsDevicesDisconnect,
    justification: Type.Optional(TeamsDevicesJustification),
  }),
)

export const TeamsDevicesApiResponseCommonFailure = named(
  "teams-devices_api-response-common-failure",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const TeamsDevicesTimestamp = named(
  "teams-devices_timestamp",
  Type.String({
    description: "When the Global WARP override state was updated.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const TeamsDevicesGlobalWarpOverride = named(
  "teams-devices_global_warp_override",
  Type.Object({
    disconnect: Type.Optional(TeamsDevicesDisconnect),
    timestamp: Type.Optional(TeamsDevicesTimestamp),
  }),
)

export const TeamsDevicesGlobalWarpOverrideResponse = named(
  "teams-devices_global_warp_override_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: TeamsDevicesGlobalWarpOverride,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const TeamsDevicesOverrideCodes = named(
  "teams-devices_override_codes",
  Type.Object({
    disable_for_time: Type.Optional(Type.Record(Type.String(), Type.String())),
  }),
)

export const TeamsDevicesRegistrationDeviceDetails = named(
  "teams-devices_registration_device_details",
  Type.Object(
    {
      client_version: Type.Optional(Type.String({ description: "Version of the WARP client.", "x-auditable": true })),
      id: Type.String({ description: "The ID of the device.", "x-auditable": true }),
      name: Type.String({ description: "The name of the device.", "x-auditable": true }),
    },
    { description: "Device details embedded inside of a registration." },
  ),
)

export const TeamsDevicesPolicySummary = named(
  "teams-devices_policy_summary",
  Type.Object(
    {
      default: Type.Boolean({
        description: "Whether the device settings profile is the default profile for the account.",
      }),
      deleted: Type.Boolean({ description: "Whether the device settings profile was deleted." }),
      id: Type.String({ description: "The ID of the device settings profile." }),
      name: Type.String({ description: "The name of the device settings profile." }),
      updated_at: Type.String({
        description: "The RFC3339 timestamp of when the device settings profile last changed for the registration.",
        readOnly: true,
      }),
    },
    { description: "The device settings profile assigned to this registration." },
  ),
)

export const TeamsDevicesRegistration = named(
  "teams-devices_registration",
  Type.Object(
    {
      created_at: Type.String({
        description: "The RFC3339 timestamp when the registration was created.",
        readOnly: true,
        "x-auditable": true,
      }),
      deleted_at: Type.Optional(
        Type.Union([
          Type.String({
            description: "The RFC3339 timestamp when the registration was deleted.",
            readOnly: true,
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      device: TeamsDevicesRegistrationDeviceDetails,
      id: Type.String({ description: "The ID of the registration.", "x-auditable": true }),
      key: Type.String({
        description: "The public key used to connect to the Cloudflare network.",
        "x-auditable": true,
      }),
      key_type: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "The type of encryption key used by the WARP client for the active key. Currently 'curve25519' for WireGuard and 'secp256r1' for MASQUE.",
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      last_seen_at: Type.String({
        description: "The RFC3339 timestamp when the registration was last seen.",
        "x-auditable": true,
      }),
      policy: Type.Optional(TeamsDevicesPolicySummary),
      revoked_at: Type.Optional(
        Type.Union([
          Type.String({ description: "The RFC3339 timestamp when the registration was revoked.", "x-auditable": true }),
          Type.Null(),
        ]),
      ),
      tunnel_type: Type.Optional(
        Type.Union([
          Type.String({ description: "Type of the tunnel - wireguard or masque.", "x-auditable": true }),
          Type.Null(),
        ]),
      ),
      updated_at: Type.String({
        description: "The RFC3339 timestamp when the registration was last updated.",
        readOnly: true,
        "x-auditable": true,
      }),
      user: Type.Optional(TeamsDevicesUser),
    },
    {
      description:
        "A WARP configuration tied to a single user. Multiple registrations can be created from a single WARP device.",
    },
  ),
)

export const TeamsDevicesUuid = named(
  "teams-devices_uuid",
  Type.String({ description: "API UUID.", maxLength: 36, "x-auditable": true }),
)

export const TeamsDevicesIdResponse = named(
  "teams-devices_id_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([
      Type.Object({
        id: Type.Optional(TeamsDevicesUuid),
      }),
      Type.Null(),
    ]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const TeamsDevicesWorkspaceOneConfigResponse = named(
  "teams-devices_workspace_one_config_response",
  Type.Object(
    {
      api_url: Type.String({ description: "The Workspace One API URL provided in the Workspace One Admin Dashboard." }),
      auth_url: Type.String({ description: "The Workspace One Authorization URL depending on your region." }),
      client_id: Type.String({
        description: "The Workspace One client ID provided in the Workspace One Admin Dashboard.",
      }),
    },
    { description: "The Workspace One Config Response." },
  ),
)

export const TeamsDevicesConfigResponse = named("teams-devices_config_response", TeamsDevicesWorkspaceOneConfigResponse)

export const TeamsDevicesInterval = named(
  "teams-devices_interval",
  Type.String({
    description:
      "The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).",
    "x-auditable": true,
  }),
)

export const TeamsDevicesComponentsSchemasName = named(
  "teams-devices_components-schemas-name",
  Type.String({ description: "The name of the device posture integration.", "x-auditable": true }),
)

export const TeamsDevicesSchemasType = named(
  "teams-devices_schemas-type",
  Type.Union(
    [
      Type.Literal("workspace_one"),
      Type.Literal("crowdstrike_s2s"),
      Type.Literal("uptycs"),
      Type.Literal("intune"),
      Type.Literal("kolide"),
      Type.Literal("tanium_s2s"),
      Type.Literal("sentinelone_s2s"),
      Type.Literal("custom_s2s"),
    ],
    { description: "The type of device posture integration.", "x-auditable": true },
  ),
)

export const UnnamedSchemaRefB84b377dfc9454d455b646d4bc9ab507 = named(
  "unnamed_schema_ref_b84b377dfc9454d455b646d4bc9ab507",
  Type.Union([Type.Null()]),
)

export const TeamsDevicesDevicePostureIntegrations = named(
  "teams-devices_device-posture-integrations",
  Type.Object({
    config: Type.Optional(TeamsDevicesConfigResponse),
    id: Type.Optional(TeamsDevicesUuid),
    interval: Type.Optional(TeamsDevicesInterval),
    name: Type.Optional(TeamsDevicesComponentsSchemasName),
    type: Type.Optional(TeamsDevicesSchemasType),
  }),
)

export const TeamsDevicesSchemasSingleResponse = named(
  "teams-devices_schemas-single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: TeamsDevicesDevicePostureIntegrations,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const TeamsDevicesWorkspaceOneConfigRequest = named(
  "teams-devices_workspace_one_config_request",
  Type.Object({
    api_url: Type.String({ description: "The Workspace One API URL provided in the Workspace One Admin Dashboard." }),
    auth_url: Type.String({ description: "The Workspace One Authorization URL depending on your region." }),
    client_id: Type.String({
      description: "The Workspace One client ID provided in the Workspace One Admin Dashboard.",
    }),
    client_secret: Type.String({
      description: "The Workspace One client secret provided in the Workspace One Admin Dashboard.",
      "x-sensitive": true,
    }),
  }),
)

export const TeamsDevicesCrowdstrikeConfigRequest = named(
  "teams-devices_crowdstrike_config_request",
  Type.Object({
    api_url: Type.String({ description: "The Crowdstrike API URL.", "x-auditable": true }),
    client_id: Type.String({ description: "The Crowdstrike client ID." }),
    client_secret: Type.String({ description: "The Crowdstrike client secret.", "x-sensitive": true }),
    customer_id: Type.String({ description: "The Crowdstrike customer ID.", "x-auditable": true }),
  }),
)

export const TeamsDevicesUptycsConfigRequest = named(
  "teams-devices_uptycs_config_request",
  Type.Object({
    api_url: Type.String({ description: "The Uptycs API URL.", "x-auditable": true }),
    client_key: Type.String({ description: "The Uptycs client secret." }),
    client_secret: Type.String({ description: "The Uptycs client secret.", "x-sensitive": true }),
    customer_id: Type.String({ description: "The Uptycs customer ID." }),
  }),
)

export const TeamsDevicesIntuneConfigRequest = named(
  "teams-devices_intune_config_request",
  Type.Object({
    client_id: Type.String({ description: "The Intune client ID." }),
    client_secret: Type.String({ description: "The Intune client secret.", "x-sensitive": true }),
    customer_id: Type.String({ description: "The Intune customer ID." }),
  }),
)

export const TeamsDevicesKolideConfigRequest = named(
  "teams-devices_kolide_config_request",
  Type.Object({
    client_id: Type.String({ description: "The Kolide client ID." }),
    client_secret: Type.String({ description: "The Kolide client secret.", "x-sensitive": true }),
  }),
)

export const TeamsDevicesTaniumConfigRequest = named(
  "teams-devices_tanium_config_request",
  Type.Object({
    access_client_id: Type.Optional(
      Type.String({
        description:
          "If present, this id will be passed in the `CF-Access-Client-ID` header when hitting the `api_url`.",
      }),
    ),
    access_client_secret: Type.Optional(
      Type.String({
        description:
          "If present, this secret will be passed in the `CF-Access-Client-Secret` header when hitting the `api_url`.",
        "x-sensitive": true,
      }),
    ),
    api_url: Type.String({ description: "The Tanium API URL.", "x-auditable": true }),
    client_secret: Type.String({ description: "The Tanium client secret.", "x-sensitive": true }),
  }),
)

export const TeamsDevicesSentineloneS2sConfigRequest = named(
  "teams-devices_sentinelone_s2s_config_request",
  Type.Object({
    api_url: Type.String({ description: "The SentinelOne S2S API URL." }),
    client_secret: Type.String({ description: "The SentinelOne S2S client secret.", "x-sensitive": true }),
  }),
)

export const TeamsDevicesCustomS2sConfigRequest = named(
  "teams-devices_custom_s2s_config_request",
  Type.Object({
    access_client_id: Type.String({
      description: "This id will be passed in the `CF-Access-Client-ID` header when hitting the `api_url`.",
    }),
    access_client_secret: Type.String({
      description: "This secret will be passed in the `CF-Access-Client-Secret` header when hitting the `api_url`.",
      "x-sensitive": true,
    }),
    api_url: Type.String({ description: "The Custom Device Posture Integration  API URL.", "x-auditable": true }),
  }),
)

export const TeamsDevicesConfigRequest = named(
  "teams-devices_config_request",
  Type.Union(
    [
      TeamsDevicesWorkspaceOneConfigRequest,
      TeamsDevicesCrowdstrikeConfigRequest,
      TeamsDevicesUptycsConfigRequest,
      TeamsDevicesIntuneConfigRequest,
      TeamsDevicesKolideConfigRequest,
      TeamsDevicesTaniumConfigRequest,
      TeamsDevicesSentineloneS2sConfigRequest,
      TeamsDevicesCustomS2sConfigRequest,
    ],
    { description: "The configuration object containing third-party integration information." },
  ),
)

export const TeamsDevicesSchemasResponseCollection = named(
  "teams-devices_schemas-response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(TeamsDevicesDevicePostureIntegrations), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IntelResultInfo),
  }),
)

export const TeamsDevicesDescription = named(
  "teams-devices_description",
  Type.String({ description: "The description of the device posture rule.", default: "", "x-auditable": true }),
)

export const TeamsDevicesExpiration = named(
  "teams-devices_expiration",
  Type.String({
    description:
      "Sets the expiration time for a posture check result. If empty, the result remains valid until it is overwritten by new data from the WARP client.",
  }),
)

export const UnnamedSchemaRef41885dd46b9e0294254c49305a273681 = named(
  "unnamed_schema_ref_41885dd46b9e0294254c49305a273681",
  Type.Union([Type.Literal("windows"), Type.Literal("linux"), Type.Literal("mac")], {
    description: "Operating system.",
    "x-auditable": true,
  }),
)

export const TeamsDevicesFileInputRequest = named(
  "teams-devices_file_input_request",
  Type.Object({
    exists: Type.Optional(Type.Boolean({ description: "Whether or not file exists.", "x-auditable": true })),
    operating_system: UnnamedSchemaRef41885dd46b9e0294254c49305a273681,
    path: Type.String({ description: "File path.", "x-auditable": true }),
    sha256: Type.Optional(Type.String({ description: "SHA-256." })),
    thumbprint: Type.Optional(Type.String({ description: "Signing certificate thumbprint." })),
  }),
)

export const TeamsDevicesUniqueClientIdInputRequest = named(
  "teams-devices_unique_client_id_input_request",
  Type.Object({
    id: Type.String({ description: "List ID.", "x-auditable": true }),
    operating_system: Type.Union([Type.Literal("android"), Type.Literal("ios"), Type.Literal("chromeos")], {
      description: "Operating System.",
      "x-auditable": true,
    }),
  }),
)

export const TeamsDevicesDomainJoinedInputRequest = named(
  "teams-devices_domain_joined_input_request",
  Type.Object({
    domain: Type.Optional(Type.String({ description: "Domain.", "x-auditable": true })),
    operating_system: Type.Union([Type.Literal("windows")], { description: "Operating System.", "x-auditable": true }),
  }),
)

export const UnnamedSchemaRef34ef0ad73a63c3f76ed170adca181930 = named(
  "unnamed_schema_ref_34ef0ad73a63c3f76ed170adca181930",
  Type.Union([Type.Literal("<"), Type.Literal("<="), Type.Literal(">"), Type.Literal(">="), Type.Literal("==")], {
    description: "Operator.",
  }),
)

export const TeamsDevicesOsVersionInputRequest = named(
  "teams-devices_os_version_input_request",
  Type.Object({
    operating_system: Type.Union([Type.Literal("windows")], { description: "Operating System.", "x-auditable": true }),
    operator: UnnamedSchemaRef34ef0ad73a63c3f76ed170adca181930,
    os_distro_name: Type.Optional(
      Type.String({ description: "Operating System Distribution Name (linux only).", "x-auditable": true }),
    ),
    os_distro_revision: Type.Optional(
      Type.String({ description: "Version of OS Distribution (linux only).", "x-auditable": true }),
    ),
    os_version_extra: Type.Optional(
      Type.String({
        description:
          "Additional version data. For Mac or iOS, the Product Version Extra. For Linux, the kernel release version. (Mac, iOS, and Linux only).",
        "x-auditable": true,
      }),
    ),
    version: Type.String({ description: "Version of OS.", "x-auditable": true }),
  }),
)

export const TeamsDevicesFirewallInputRequest = named(
  "teams-devices_firewall_input_request",
  Type.Object({
    enabled: Type.Boolean({ description: "Enabled.", "x-auditable": true }),
    operating_system: Type.Union([Type.Literal("windows"), Type.Literal("mac")], {
      description: "Operating System.",
      "x-auditable": true,
    }),
  }),
)

export const TeamsDevicesSentineloneInputRequest = named(
  "teams-devices_sentinelone_input_request",
  Type.Object({
    operating_system: UnnamedSchemaRef41885dd46b9e0294254c49305a273681,
    path: Type.String({ description: "File path.", "x-auditable": true }),
    sha256: Type.Optional(Type.String({ description: "SHA-256.", "x-auditable": true })),
    thumbprint: Type.Optional(Type.String({ description: "Signing certificate thumbprint.", "x-auditable": true })),
  }),
)

export const TeamsDevicesCarbonblackInputRequest = named(
  "teams-devices_carbonblack_input_request",
  Type.Object({
    operating_system: UnnamedSchemaRef41885dd46b9e0294254c49305a273681,
    path: Type.String({ description: "File path.", "x-auditable": true }),
    sha256: Type.Optional(Type.String({ description: "SHA-256.", "x-auditable": true })),
    thumbprint: Type.Optional(Type.String({ description: "Signing certificate thumbprint.", "x-auditable": true })),
  }),
)

export const TeamsDevicesAccessSerialNumberListInputRequest = named(
  "teams-devices_access_serial_number_list_input_request",
  Type.Object({
    id: Type.String({ description: "UUID of Access List.", maxLength: 36, "x-auditable": true }),
  }),
)

export const TeamsDevicesCheckdisks = named(
  "teams-devices_checkDisks",
  Type.Array(Type.String(), { description: "List of volume names to be checked for encryption." }),
)

export const TeamsDevicesRequireall = named(
  "teams-devices_requireAll",
  Type.Boolean({ description: "Whether to check all disks for encryption.", "x-auditable": true }),
)

export const TeamsDevicesDiskEncryptionInputRequest = named(
  "teams-devices_disk_encryption_input_request",
  Type.Object({
    checkDisks: Type.Optional(TeamsDevicesCheckdisks),
    requireAll: Type.Optional(TeamsDevicesRequireall),
  }),
)

export const TeamsDevicesApplicationInputRequest = named(
  "teams-devices_application_input_request",
  Type.Object({
    operating_system: UnnamedSchemaRef41885dd46b9e0294254c49305a273681,
    path: Type.String({ description: "Path for the application.", "x-auditable": true }),
    sha256: Type.Optional(Type.String({ description: "SHA-256.", "x-auditable": true })),
    thumbprint: Type.Optional(Type.String({ description: "Signing certificate thumbprint.", "x-auditable": true })),
  }),
)

export const TeamsDevicesClientCertificateInputRequest = named(
  "teams-devices_client_certificate_input_request",
  Type.Object({
    certificate_id: Type.String({ description: "UUID of Cloudflare managed certificate.", maxLength: 36 }),
    cn: Type.String({ description: "Common Name that is protected by the certificate." }),
  }),
)

export const TeamsDevicesExtendedKeyUsageEnum = named(
  "teams-devices_extended_key_usage_enum",
  Type.Union([Type.Literal("clientAuth"), Type.Literal("emailProtection")], { "x-auditable": true }),
)

export const TeamsDevicesPaths = named(
  "teams-devices_paths",
  Type.Array(Type.String(), { description: "List of paths to check for client certificate on linux." }),
)

export const TeamsDevicesTrustStoresEnum = named(
  "teams-devices_trust_stores_enum",
  Type.Union([Type.Literal("system"), Type.Literal("user")], { "x-auditable": true }),
)

export const TeamsDevicesTrustStores = named(
  "teams-devices_trust_stores",
  Type.Array(TeamsDevicesTrustStoresEnum, { description: "List of trust stores to check for client certificate." }),
)

export const TeamsDevicesClientCertificateV2InputRequest = named(
  "teams-devices_client_certificate_v2_input_request",
  Type.Object({
    certificate_id: Type.String({ description: "UUID of Cloudflare managed certificate.", maxLength: 36 }),
    check_private_key: Type.Boolean({
      description:
        "Confirm the certificate was not imported from another device. We recommend keeping this enabled unless the certificate was deployed without a private key.",
    }),
    cn: Type.Optional(
      Type.String({
        description:
          "Certificate Common Name. This may include one or more variables in the ${ } notation. Only ${serial_number} and ${hostname} are valid variables.",
      }),
    ),
    extended_key_usage: Type.Optional(
      Type.Array(TeamsDevicesExtendedKeyUsageEnum, {
        description: "List of values indicating purposes for which the certificate public key can be used.",
      }),
    ),
    locations: Type.Optional(
      Type.Object({
        paths: Type.Optional(TeamsDevicesPaths),
        trust_stores: Type.Optional(TeamsDevicesTrustStores),
      }),
    ),
    operating_system: UnnamedSchemaRef41885dd46b9e0294254c49305a273681,
    subject_alternative_names: Type.Optional(
      Type.Array(Type.String(), { description: "List of certificate Subject Alternative Names." }),
    ),
  }),
)

export const TeamsDevicesWorkspaceOneInputRequest = named(
  "teams-devices_workspace_one_input_request",
  Type.Object({
    compliance_status: Type.Union([Type.Literal("compliant"), Type.Literal("noncompliant"), Type.Literal("unknown")], {
      description: "Compliance Status.",
      "x-auditable": true,
    }),
    connection_id: Type.String({ description: "Posture Integration ID.", "x-auditable": true }),
  }),
)

export const TeamsDevicesCrowdstrikeInputRequest = named(
  "teams-devices_crowdstrike_input_request",
  Type.Object({
    connection_id: Type.String({ description: "Posture Integration ID.", "x-auditable": true }),
    last_seen: Type.Optional(
      Type.String({
        description: "For more details on last seen, please refer to the Crowdstrike documentation.",
        "x-auditable": true,
      }),
    ),
    operator: Type.Optional(UnnamedSchemaRef34ef0ad73a63c3f76ed170adca181930),
    os: Type.Optional(Type.String({ description: "Os Version.", "x-auditable": true })),
    overall: Type.Optional(Type.String({ description: "Overall.", "x-auditable": true })),
    sensor_config: Type.Optional(Type.String({ description: "SensorConfig.", "x-auditable": true })),
    state: Type.Optional(
      Type.Union([Type.Literal("online"), Type.Literal("offline"), Type.Literal("unknown")], {
        description: "For more details on state, please refer to the Crowdstrike documentation.",
        "x-auditable": true,
      }),
    ),
    version: Type.Optional(Type.String({ description: "Version.", "x-auditable": true })),
    versionOperator: Type.Optional(
      Type.Union([Type.Literal("<"), Type.Literal("<="), Type.Literal(">"), Type.Literal(">="), Type.Literal("==")], {
        description: "Version Operator.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const TeamsDevicesIntuneInputRequest = named(
  "teams-devices_intune_input_request",
  Type.Object({
    compliance_status: Type.Union(
      [
        Type.Literal("compliant"),
        Type.Literal("noncompliant"),
        Type.Literal("unknown"),
        Type.Literal("notapplicable"),
        Type.Literal("ingraceperiod"),
        Type.Literal("error"),
      ],
      { description: "Compliance Status.", "x-auditable": true },
    ),
    connection_id: Type.String({ description: "Posture Integration ID.", "x-auditable": true }),
  }),
)

export const TeamsDevicesKolideInputRequest = named(
  "teams-devices_kolide_input_request",
  Type.Object({
    connection_id: Type.String({ description: "Posture Integration ID.", "x-auditable": true }),
    countOperator: Type.Union(
      [Type.Literal("<"), Type.Literal("<="), Type.Literal(">"), Type.Literal(">="), Type.Literal("==")],
      { description: "Count Operator.", "x-auditable": true },
    ),
    issue_count: Type.String({ description: "The Number of Issues.", "x-auditable": true }),
  }),
)

export const TeamsDevicesTaniumInputRequest = named(
  "teams-devices_tanium_input_request",
  Type.Object({
    connection_id: Type.String({ description: "Posture Integration ID.", "x-auditable": true }),
    eid_last_seen: Type.Optional(
      Type.String({
        description: "For more details on eid last seen, refer to the Tanium documentation.",
        "x-auditable": true,
      }),
    ),
    operator: Type.Optional(
      Type.Union([Type.Literal("<"), Type.Literal("<="), Type.Literal(">"), Type.Literal(">="), Type.Literal("==")], {
        description: "Operator to evaluate risk_level or eid_last_seen.",
        "x-auditable": true,
      }),
    ),
    risk_level: Type.Optional(
      Type.Union([Type.Literal("low"), Type.Literal("medium"), Type.Literal("high"), Type.Literal("critical")], {
        description: "For more details on risk level, refer to the Tanium documentation.",
        "x-auditable": true,
      }),
    ),
    scoreOperator: Type.Optional(
      Type.Union([Type.Literal("<"), Type.Literal("<="), Type.Literal(">"), Type.Literal(">="), Type.Literal("==")], {
        description: "Score Operator.",
        "x-auditable": true,
      }),
    ),
    total_score: Type.Optional(
      Type.Number({
        description: "For more details on total score, refer to the Tanium documentation.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const TeamsDevicesSentineloneS2sInputRequest = named(
  "teams-devices_sentinelone_s2s_input_request",
  Type.Object({
    active_threats: Type.Optional(Type.Number({ description: "The Number of active threats." })),
    connection_id: Type.String({ description: "Posture Integration ID." }),
    infected: Type.Optional(Type.Boolean({ description: "Whether device is infected." })),
    is_active: Type.Optional(Type.Boolean({ description: "Whether device is active." })),
    network_status: Type.Optional(
      Type.Union(
        [
          Type.Literal("connected"),
          Type.Literal("disconnected"),
          Type.Literal("disconnecting"),
          Type.Literal("connecting"),
        ],
        { description: "Network status of device." },
      ),
    ),
    operational_state: Type.Optional(
      Type.Union(
        [
          Type.Literal("na"),
          Type.Literal("partially_disabled"),
          Type.Literal("auto_fully_disabled"),
          Type.Literal("fully_disabled"),
          Type.Literal("auto_partially_disabled"),
          Type.Literal("disabled_error"),
          Type.Literal("db_corruption"),
        ],
        { description: "Agent operational state." },
      ),
    ),
    operator: Type.Optional(UnnamedSchemaRef34ef0ad73a63c3f76ed170adca181930),
  }),
)

export const TeamsDevicesCustomS2sInputRequest = named(
  "teams-devices_custom_s2s_input_request",
  Type.Object({
    connection_id: Type.String({ description: "Posture Integration ID." }),
    operator: UnnamedSchemaRef34ef0ad73a63c3f76ed170adca181930,
    score: Type.Number({
      description: "A value between 0-100 assigned to devices set by the 3rd party posture provider.",
    }),
  }),
)

export const TeamsDevicesInput = named(
  "teams-devices_input",
  Type.Union(
    [
      TeamsDevicesFileInputRequest,
      TeamsDevicesUniqueClientIdInputRequest,
      TeamsDevicesDomainJoinedInputRequest,
      TeamsDevicesOsVersionInputRequest,
      TeamsDevicesFirewallInputRequest,
      TeamsDevicesSentineloneInputRequest,
      TeamsDevicesCarbonblackInputRequest,
      TeamsDevicesAccessSerialNumberListInputRequest,
      TeamsDevicesDiskEncryptionInputRequest,
      TeamsDevicesApplicationInputRequest,
      TeamsDevicesClientCertificateInputRequest,
      TeamsDevicesClientCertificateV2InputRequest,
      TeamsDevicesWorkspaceOneInputRequest,
      TeamsDevicesCrowdstrikeInputRequest,
      TeamsDevicesIntuneInputRequest,
      TeamsDevicesKolideInputRequest,
      TeamsDevicesTaniumInputRequest,
      TeamsDevicesSentineloneS2sInputRequest,
      TeamsDevicesCustomS2sInputRequest,
    ],
    { description: "The value to be checked against." },
  ),
)

export const TeamsDevicesPlatform = named(
  "teams-devices_platform",
  Type.Union(
    [
      Type.Literal("windows"),
      Type.Literal("mac"),
      Type.Literal("linux"),
      Type.Literal("android"),
      Type.Literal("ios"),
      Type.Literal("chromeos"),
    ],
    { "x-auditable": true },
  ),
)

export const TeamsDevicesMatchItem = named(
  "teams-devices_match_item",
  Type.Object({
    platform: Type.Optional(TeamsDevicesPlatform),
  }),
)

export const TeamsDevicesMatch = named(
  "teams-devices_match",
  Type.Array(TeamsDevicesMatchItem, { description: "The conditions that the client must match to run the rule." }),
)

export const TeamsDevicesName = named(
  "teams-devices_name",
  Type.String({ description: "The name of the device posture rule.", "x-auditable": true }),
)

export const TeamsDevicesSchedule = named(
  "teams-devices_schedule",
  Type.String({
    description:
      "Polling frequency for the WARP client posture check. Default: `5m` (poll every five minutes). Minimum: `1m`.",
    "x-auditable": true,
  }),
)

export const TeamsDevicesType = named(
  "teams-devices_type",
  Type.Union(
    [
      Type.Literal("file"),
      Type.Literal("application"),
      Type.Literal("tanium"),
      Type.Literal("gateway"),
      Type.Literal("warp"),
      Type.Literal("disk_encryption"),
      Type.Literal("serial_number"),
      Type.Literal("sentinelone"),
      Type.Literal("carbonblack"),
      Type.Literal("firewall"),
      Type.Literal("os_version"),
      Type.Literal("domain_joined"),
      Type.Literal("client_certificate"),
      Type.Literal("client_certificate_v2"),
      Type.Literal("unique_client_id"),
      Type.Literal("kolide"),
      Type.Literal("tanium_s2s"),
      Type.Literal("crowdstrike_s2s"),
      Type.Literal("intune"),
      Type.Literal("workspace_one"),
      Type.Literal("sentinelone_s2s"),
      Type.Literal("custom_s2s"),
    ],
    { description: "The type of device posture rule.", "x-auditable": true },
  ),
)

export const UnnamedSchemaRef9e35ef84511131488ae286ce78ac4b27 = named(
  "unnamed_schema_ref_9e35ef84511131488ae286ce78ac4b27",
  Type.Union([Type.Null()]),
)

export const TeamsDevicesDevicePostureRules = named(
  "teams-devices_device-posture-rules",
  Type.Object({
    description: Type.Optional(TeamsDevicesDescription),
    expiration: Type.Optional(TeamsDevicesExpiration),
    id: Type.Optional(TeamsDevicesUuid),
    input: Type.Optional(TeamsDevicesInput),
    match: Type.Optional(TeamsDevicesMatch),
    name: Type.Optional(TeamsDevicesName),
    schedule: Type.Optional(TeamsDevicesSchedule),
    type: Type.Optional(TeamsDevicesType),
  }),
)

export const TeamsDevicesSingleResponse = named(
  "teams-devices_single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: TeamsDevicesDevicePostureRules,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const TeamsDevicesResponseCollection = named(
  "teams-devices_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(TeamsDevicesDevicePostureRules), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IntelResultInfo),
  }),
)

export const TeamsDevicesSchemasUuid = named(
  "teams-devices_schemas-uuid",
  Type.String({ maxLength: 36, "x-auditable": true }),
)

export const TeamsDevicesIncludeSplitTunnelAddress = named(
  "teams-devices_include_split_tunnel_address",
  Type.String({
    description:
      "The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.",
  }),
)

export const TeamsDevicesIncludeSplitTunnelDescription = named(
  "teams-devices_include_split_tunnel_description",
  Type.String({ description: "A description of the Split Tunnel item, displayed in the client UI.", maxLength: 100 }),
)

export const TeamsDevicesIncludeSplitTunnelWithAddress = named(
  "teams-devices_include_split_tunnel_with_address",
  Type.Object({
    address: TeamsDevicesIncludeSplitTunnelAddress,
    description: Type.Optional(TeamsDevicesIncludeSplitTunnelDescription),
  }),
)

export const TeamsDevicesIncludeSplitTunnelHost = named(
  "teams-devices_include_split_tunnel_host",
  Type.String({
    description: "The domain name to include in the tunnel. If `host` is present, `address` must not be present.",
  }),
)

export const TeamsDevicesIncludeSplitTunnelWithHost = named(
  "teams-devices_include_split_tunnel_with_host",
  Type.Object({
    description: Type.Optional(TeamsDevicesIncludeSplitTunnelDescription),
    host: TeamsDevicesIncludeSplitTunnelHost,
  }),
)

export const TeamsDevicesSplitTunnelInclude = named(
  "teams-devices_split_tunnel_include",
  Type.Union([TeamsDevicesIncludeSplitTunnelWithAddress, TeamsDevicesIncludeSplitTunnelWithHost]),
)

export const UnnamedSchemaRef5e0c6134a624678286f4a424b001870a = named(
  "unnamed_schema_ref_5e0c6134a624678286f4a424b001870a",
  Type.Union([Type.Null()]),
)

export const TeamsDevicesSplitTunnelIncludeResponseCollection = named(
  "teams-devices_split_tunnel_include_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(TeamsDevicesSplitTunnelInclude), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IntelResultInfo),
  }),
)

export const TeamsDevicesFallbackDomain = named(
  "teams-devices_fallback_domain",
  Type.Object({
    description: Type.Optional(
      Type.String({
        description: "A description of the fallback domain, displayed in the client UI.",
        maxLength: 100,
        "x-auditable": true,
      }),
    ),
    dns_server: Type.Optional(
      Type.Array(TeamsDevicesIp, { description: "A list of IP addresses to handle domain resolution." }),
    ),
    suffix: Type.String({ description: "The domain suffix to match when resolving locally.", "x-auditable": true }),
  }),
)

export const UnnamedSchemaRef1fbf91ecd61792c751fead58dc8005e6 = named(
  "unnamed_schema_ref_1fbf91ecd61792c751fead58dc8005e6",
  Type.Union([Type.Null()]),
)

export const TeamsDevicesFallbackDomainResponseCollection = named(
  "teams-devices_fallback_domain_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(TeamsDevicesFallbackDomain), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IntelResultInfo),
  }),
)

export const TeamsDevicesSplitTunnelAddress = named(
  "teams-devices_split_tunnel_address",
  Type.String({
    description:
      "The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.",
  }),
)

export const TeamsDevicesSplitTunnelDescription = named(
  "teams-devices_split_tunnel_description",
  Type.String({ description: "A description of the Split Tunnel item, displayed in the client UI.", maxLength: 100 }),
)

export const TeamsDevicesExcludeSplitTunnelWithAddress = named(
  "teams-devices_exclude_split_tunnel_with_address",
  Type.Object({
    address: TeamsDevicesSplitTunnelAddress,
    description: Type.Optional(TeamsDevicesSplitTunnelDescription),
  }),
)

export const TeamsDevicesSplitTunnelHost = named(
  "teams-devices_split_tunnel_host",
  Type.String({
    description: "The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.",
  }),
)

export const TeamsDevicesExcludeSplitTunnelWithHost = named(
  "teams-devices_exclude_split_tunnel_with_host",
  Type.Object({
    description: Type.Optional(TeamsDevicesSplitTunnelDescription),
    host: TeamsDevicesSplitTunnelHost,
  }),
)

export const TeamsDevicesSplitTunnel = named(
  "teams-devices_split_tunnel",
  Type.Union([TeamsDevicesExcludeSplitTunnelWithAddress, TeamsDevicesExcludeSplitTunnelWithHost]),
)

export const UnnamedSchemaRef0462afe1a32ee90b1999d4277af59fa8 = named(
  "unnamed_schema_ref_0462afe1a32ee90b1999d4277af59fa8",
  Type.Union([Type.Null()]),
)

export const TeamsDevicesSplitTunnelResponseCollection = named(
  "teams-devices_split_tunnel_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(TeamsDevicesSplitTunnel), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IntelResultInfo),
  }),
)

export const TeamsDevicesAllowModeSwitch = named(
  "teams-devices_allow_mode_switch",
  Type.Boolean({ description: "Whether to allow the user to switch WARP between modes.", default: false }),
)

export const TeamsDevicesAllowUpdates = named(
  "teams-devices_allow_updates",
  Type.Boolean({
    description: "Whether to receive update notifications when a new version of the client is available.",
    default: false,
  }),
)

export const TeamsDevicesAllowedToLeave = named(
  "teams-devices_allowed_to_leave",
  Type.Boolean({ description: "Whether to allow devices to leave the organization.", default: true }),
)

export const TeamsDevicesAutoConnect = named(
  "teams-devices_auto_connect",
  Type.Number({ description: "The amount of time in seconds to reconnect after having been disabled.", default: 0 }),
)

export const TeamsDevicesCaptivePortal = named(
  "teams-devices_captive_portal",
  Type.Number({ description: "Turn on the captive portal after the specified amount of time.", default: 180 }),
)

export const TeamsDevicesDefault = named(
  "teams-devices_default",
  Type.Boolean({ description: "Whether the policy is the default policy for an account." }),
)

export const TeamsDevicesSchemasDescription = named(
  "teams-devices_schemas-description",
  Type.String({ description: "A description of the policy.", maxLength: 500 }),
)

export const TeamsDevicesDisableAutoFallback = named(
  "teams-devices_disable_auto_fallback",
  Type.Boolean({
    description:
      "If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to `true`.",
    default: false,
    "x-auditable": true,
  }),
)

export const TeamsDevicesExclude = named(
  "teams-devices_exclude",
  Type.Array(TeamsDevicesSplitTunnel, { description: "List of routes excluded in the WARP client's tunnel." }),
)

export const TeamsDevicesExcludeOfficeIps = named(
  "teams-devices_exclude_office_ips",
  Type.Boolean({ description: "Whether to add Microsoft IPs to Split Tunnel exclusions.", default: false }),
)

export const TeamsDevicesFallbackDomains = named(
  "teams-devices_fallback_domains",
  Type.Array(TeamsDevicesFallbackDomain),
)

export const TeamsDevicesInclude = named(
  "teams-devices_include",
  Type.Array(TeamsDevicesSplitTunnelInclude, { description: "List of routes included in the WARP client's tunnel." }),
)

export const TeamsDevicesLanAllowMinutes = named(
  "teams-devices_lan_allow_minutes",
  Type.Number({
    description:
      "The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.",
  }),
)

export const TeamsDevicesLanAllowSubnetSize = named(
  "teams-devices_lan_allow_subnet_size",
  Type.Number({
    description:
      "The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.",
  }),
)

export const TeamsDevicesSchemasMatch = named(
  "teams-devices_schemas-match",
  Type.String({
    description:
      'The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".',
    maxLength: 500,
  }),
)

export const TeamsDevicesPrecedence = named(
  "teams-devices_precedence",
  Type.Number({
    description:
      "The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.",
  }),
)

export const TeamsDevicesRegisterInterfaceIpWithDns = named(
  "teams-devices_register_interface_ip_with_dns",
  Type.Boolean({
    description:
      "Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.",
    default: true,
  }),
)

export const TeamsDevicesSccmVpnBoundarySupport = named(
  "teams-devices_sccm_vpn_boundary_support",
  Type.Boolean({
    description:
      "Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).",
    default: false,
  }),
)

export const TeamsDevicesServiceModeV2 = named(
  "teams-devices_service_mode_v2",
  Type.Object({
    mode: Type.Optional(Type.String({ description: "The mode to run the WARP client under.", "x-auditable": true })),
    port: Type.Optional(
      Type.Number({ description: "The port number when used with proxy mode.", "x-auditable": true }),
    ),
  }),
)

export const TeamsDevicesSupportUrl = named(
  "teams-devices_support_url",
  Type.String({ description: "The URL to launch when the Send Feedback button is clicked.", default: "" }),
)

export const TeamsDevicesSwitchLocked = named(
  "teams-devices_switch_locked",
  Type.Boolean({
    description: "Whether to allow the user to turn off the WARP switch and disconnect the client.",
    default: false,
  }),
)

export const TeamsDevicesTargetDexTest = named(
  "teams-devices_target_dex_test",
  Type.Object({
    id: Type.Optional(Type.String({ description: "The id of the DEX test targeting this policy." })),
    name: Type.Optional(Type.String({ description: "The name of the DEX test targeting this policy." })),
  }),
)

export const TeamsDevicesTunnelProtocol = named(
  "teams-devices_tunnel_protocol",
  Type.String({ description: "Determines which tunnel protocol to use.", default: "" }),
)

export const UnnamedSchemaRefF636ff9f2cb41ff4b715cf8ed8515581 = named(
  "unnamed_schema_ref_f636ff9f2cb41ff4b715cf8ed8515581",
  Type.Union([Type.Null()]),
)

export const TeamsDevicesDeviceSettingsPolicy = named(
  "teams-devices_device_settings_policy",
  Type.Object({
    allow_mode_switch: Type.Optional(TeamsDevicesAllowModeSwitch),
    allow_updates: Type.Optional(TeamsDevicesAllowUpdates),
    allowed_to_leave: Type.Optional(TeamsDevicesAllowedToLeave),
    auto_connect: Type.Optional(TeamsDevicesAutoConnect),
    captive_portal: Type.Optional(TeamsDevicesCaptivePortal),
    default: Type.Optional(TeamsDevicesDefault),
    description: Type.Optional(TeamsDevicesSchemasDescription),
    disable_auto_fallback: Type.Optional(TeamsDevicesDisableAutoFallback),
    enabled: Type.Optional(Type.Boolean({ description: "Whether the policy will be applied to matching devices." })),
    exclude: Type.Optional(TeamsDevicesExclude),
    exclude_office_ips: Type.Optional(TeamsDevicesExcludeOfficeIps),
    fallback_domains: Type.Optional(TeamsDevicesFallbackDomains),
    gateway_unique_id: Type.Optional(TeamsDevicesIdentifier),
    include: Type.Optional(TeamsDevicesInclude),
    lan_allow_minutes: Type.Optional(TeamsDevicesLanAllowMinutes),
    lan_allow_subnet_size: Type.Optional(TeamsDevicesLanAllowSubnetSize),
    match: Type.Optional(TeamsDevicesSchemasMatch),
    name: Type.Optional(Type.String({ description: "The name of the device settings profile.", maxLength: 100 })),
    policy_id: Type.Optional(TeamsDevicesSchemasUuid),
    precedence: Type.Optional(TeamsDevicesPrecedence),
    register_interface_ip_with_dns: Type.Optional(TeamsDevicesRegisterInterfaceIpWithDns),
    sccm_vpn_boundary_support: Type.Optional(TeamsDevicesSccmVpnBoundarySupport),
    service_mode_v2: Type.Optional(TeamsDevicesServiceModeV2),
    support_url: Type.Optional(TeamsDevicesSupportUrl),
    switch_locked: Type.Optional(TeamsDevicesSwitchLocked),
    target_tests: Type.Optional(Type.Array(TeamsDevicesTargetDexTest)),
    tunnel_protocol: Type.Optional(TeamsDevicesTunnelProtocol),
  }),
)

export const TeamsDevicesDeviceSettingsResponse = named(
  "teams-devices_device_settings_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: TeamsDevicesDeviceSettingsPolicy,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const TeamsDevicesIncludeRequest = named(
  "teams-devices_include_request",
  Type.Array(TeamsDevicesSplitTunnelInclude, {
    description:
      "List of routes included in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.",
  }),
)

export const TeamsDevicesExcludeRequest = named(
  "teams-devices_exclude_request",
  Type.Array(TeamsDevicesSplitTunnel, {
    description:
      "List of routes excluded in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.",
  }),
)

export const TeamsDevicesDefaultDeviceSettingsPolicy = named(
  "teams-devices_default_device_settings_policy",
  Type.Object({
    allow_mode_switch: Type.Optional(TeamsDevicesAllowModeSwitch),
    allow_updates: Type.Optional(TeamsDevicesAllowUpdates),
    allowed_to_leave: Type.Optional(TeamsDevicesAllowedToLeave),
    auto_connect: Type.Optional(TeamsDevicesAutoConnect),
    captive_portal: Type.Optional(TeamsDevicesCaptivePortal),
    default: Type.Optional(Type.Boolean({ description: "Whether the policy will be applied to matching devices." })),
    disable_auto_fallback: Type.Optional(TeamsDevicesDisableAutoFallback),
    enabled: Type.Optional(Type.Boolean({ description: "Whether the policy will be applied to matching devices." })),
    exclude: Type.Optional(TeamsDevicesExclude),
    exclude_office_ips: Type.Optional(TeamsDevicesExcludeOfficeIps),
    fallback_domains: Type.Optional(TeamsDevicesFallbackDomains),
    gateway_unique_id: Type.Optional(TeamsDevicesIdentifier),
    include: Type.Optional(TeamsDevicesInclude),
    register_interface_ip_with_dns: Type.Optional(TeamsDevicesRegisterInterfaceIpWithDns),
    sccm_vpn_boundary_support: Type.Optional(TeamsDevicesSccmVpnBoundarySupport),
    service_mode_v2: Type.Optional(TeamsDevicesServiceModeV2),
    support_url: Type.Optional(TeamsDevicesSupportUrl),
    switch_locked: Type.Optional(TeamsDevicesSwitchLocked),
    tunnel_protocol: Type.Optional(TeamsDevicesTunnelProtocol),
  }),
)

export const TeamsDevicesDefaultDeviceSettingsResponse = named(
  "teams-devices_default_device_settings_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: TeamsDevicesDefaultDeviceSettingsPolicy,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const TeamsDevicesDeviceSettingsResponseCollection = named(
  "teams-devices_device_settings_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(TeamsDevicesDeviceSettingsPolicy), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IntelResultInfo),
  }),
)

export const TeamsDevicesCursorResultInfo = named(
  "teams-devices_cursor_result_info",
  Type.Object(
    {
      count: Type.Integer({ description: "Number of records in the response." }),
      cursor: Type.String({ description: "Opaque token to request the next set of records." }),
      per_page: Type.Integer({ description: "The limit for the number of records in the response." }),
      total_count: Type.Optional(
        Type.Union([Type.Integer({ description: "Total number of records available." }), Type.Null()]),
      ),
    },
    { description: "V4 public API Pagination/Cursor info." },
  ),
)

export const TeamsDevicesRegistrationDetails = named(
  "teams-devices_registration_details",
  Type.Object(
    {
      policy: Type.Optional(TeamsDevicesPolicySummary),
    },
    { description: "The summary of a registration." },
  ),
)

export const TeamsDevicesPhysicalDevice = named(
  "teams-devices_physical_device",
  Type.Object(
    {
      active_registrations: Type.Integer({
        description:
          "The number of active registrations for the device. Active registrations are those which haven't been revoked or deleted.",
        "x-auditable": true,
      }),
      client_version: Type.Optional(
        Type.Union([Type.String({ description: "Version of the WARP client.", "x-auditable": true }), Type.Null()]),
      ),
      created_at: Type.String({
        description: "The RFC3339 timestamp when the device was created.",
        readOnly: true,
        "x-auditable": true,
      }),
      deleted_at: Type.Optional(
        Type.Union([
          Type.String({
            description: "The RFC3339 timestamp when the device was deleted.",
            readOnly: true,
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      device_type: Type.Optional(
        Type.Union([Type.String({ description: "The device operating system.", "x-auditable": true }), Type.Null()]),
      ),
      hardware_id: Type.Optional(
        Type.Union([
          Type.String({
            description: "A string that uniquely identifies the hardware or virtual machine (VM).",
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      id: Type.String({ description: "The unique ID of the device.", "x-auditable": true }),
      last_seen_at: Type.Union([
        Type.String({ description: "The RFC3339 timestamp when the device was last seen.", "x-auditable": true }),
        Type.Null(),
      ]),
      last_seen_registration: Type.Optional(TeamsDevicesRegistrationDetails),
      last_seen_user: Type.Optional(TeamsDevicesUser),
      mac_address: Type.Optional(
        Type.Union([Type.String({ description: "The device MAC address.", "x-auditable": true }), Type.Null()]),
      ),
      manufacturer: Type.Optional(
        Type.Union([Type.String({ description: "The device manufacturer.", "x-auditable": true }), Type.Null()]),
      ),
      model: Type.Optional(
        Type.Union([Type.String({ description: "The model name of the device.", "x-auditable": true }), Type.Null()]),
      ),
      name: Type.String({ description: "The name of the device.", "x-auditable": true }),
      os_version: Type.Optional(
        Type.Union([
          Type.String({ description: "The device operating system version number.", "x-auditable": true }),
          Type.Null(),
        ]),
      ),
      os_version_extra: Type.Optional(
        Type.Union([
          Type.String({
            description:
              "Additional operating system version data. For macOS or iOS, the Product Version Extra. For Linux, the kernel release version.",
            "x-auditable": true,
          }),
          Type.Null(),
        ]),
      ),
      public_ip: Type.Optional(
        Type.Union([
          Type.String({ description: "The public IP address of the WARP client.", "x-auditable": true }),
          Type.Null(),
        ]),
      ),
      serial_number: Type.Optional(
        Type.Union([Type.String({ description: "The device serial number.", "x-auditable": true }), Type.Null()]),
      ),
      updated_at: Type.String({
        description: "The RFC3339 timestamp when the device was last updated.",
        readOnly: true,
        "x-auditable": true,
      }),
    },
    { description: "A WARP Device." },
  ),
)

export const TeamsDevicesV4ResponseMessage = named(
  "teams-devices_v4_response_message",
  Type.Object(
    {
      code: Type.Integer(),
      message: Type.String(),
    },
    {
      description: "A message which can be returned in either the 'errors' or 'messages' fields in a v4 API response.",
    },
  ),
)

export const TeamsDevicesTlsConfigResponse = named(
  "teams-devices_tls_config_response",
  Type.Object(
    {
      sha256: Type.Optional(
        Type.String({
          description:
            "The SHA-256 hash of the TLS certificate presented by the host found at tls_sockaddr. If absent, regular certificate verification (trusted roots, valid timestamp, etc) will be used to validate the certificate.",
        }),
      ),
      tls_sockaddr: Type.String({
        description:
          'A network address of the form "host:port" that the WARP client will use to detect the presence of a TLS host.',
        "x-auditable": true,
      }),
    },
    { description: "The Managed Network TLS Config Response." },
  ),
)

export const TeamsDevicesSchemasConfigResponse = named(
  "teams-devices_schemas-config_response",
  TeamsDevicesTlsConfigResponse,
)

export const TeamsDevicesDeviceManagedNetworksComponentsSchemasName = named(
  "teams-devices_device-managed-networks_components-schemas-name",
  Type.String({
    description: "The name of the device managed network. This name must be unique.",
    "x-auditable": true,
  }),
)

export const TeamsDevicesComponentsSchemasType = named(
  "teams-devices_components-schemas-type",
  Type.Union([Type.Literal("tls")], { description: "The type of device managed network.", "x-auditable": true }),
)

export const UnnamedSchemaRefD2b048663faf5e0cd5c90501b71171de = named(
  "unnamed_schema_ref_d2b048663faf5e0cd5c90501b71171de",
  Type.Union([Type.Null()]),
)

export const TeamsDevicesDeviceManagedNetworks = named(
  "teams-devices_device-managed-networks",
  Type.Object({
    config: Type.Optional(TeamsDevicesSchemasConfigResponse),
    name: Type.Optional(TeamsDevicesDeviceManagedNetworksComponentsSchemasName),
    network_id: Type.Optional(TeamsDevicesUuid),
    type: Type.Optional(TeamsDevicesComponentsSchemasType),
  }),
)

export const TeamsDevicesComponentsSchemasSingleResponse = named(
  "teams-devices_components-schemas-single_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: TeamsDevicesDeviceManagedNetworks,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const TeamsDevicesTlsConfigRequest = named(
  "teams-devices_tls_config_request",
  Type.Object({
    sha256: Type.Optional(
      Type.String({
        description:
          "The SHA-256 hash of the TLS certificate presented by the host found at tls_sockaddr. If absent, regular certificate verification (trusted roots, valid timestamp, etc) will be used to validate the certificate.",
      }),
    ),
    tls_sockaddr: Type.String({
      description:
        'A network address of the form "host:port" that the WARP client will use to detect the presence of a TLS host.',
    }),
  }),
)

export const TeamsDevicesSchemasConfigRequest = named(
  "teams-devices_schemas-config_request",
  TeamsDevicesTlsConfigRequest,
)

export const TeamsDevicesComponentsSchemasResponseCollection = named(
  "teams-devices_components-schemas-response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(TeamsDevicesDeviceManagedNetworks), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IntelResultInfo),
  }),
)

export const TeamsDevicesManufacturer = named(
  "teams-devices_manufacturer",
  Type.String({ description: "The device manufacturer name." }),
)

export const TeamsDevicesOsDistroName = named(
  "teams-devices_os_distro_name",
  Type.String({ description: "The Linux distro name.", "x-auditable": true }),
)

export const TeamsDevicesOsDistroRevision = named(
  "teams-devices_os_distro_revision",
  Type.String({ description: "The Linux distro revision.", "x-auditable": true }),
)

export const TeamsDevicesOsVersionExtra = named(
  "teams-devices_os_version_extra",
  Type.String({ description: "The operating system version extra parameter." }),
)

export const TeamsDevicesRevokedAt = named(
  "teams-devices_revoked_at",
  Type.String({ description: "When the device was revoked.", format: "date-time", "x-auditable": true }),
)

export const TeamsDevicesDevices = named(
  "teams-devices_devices",
  Type.Object({
    created: Type.Optional(TeamsDevicesCreated),
    deleted: Type.Optional(TeamsDevicesDeleted),
    device_type: Type.Optional(TeamsDevicesPlatform),
    id: Type.Optional(TeamsDevicesRegistrationId),
    ip: Type.Optional(TeamsDevicesIp),
    key: Type.Optional(TeamsDevicesKey),
    last_seen: Type.Optional(TeamsDevicesLastSeen),
    mac_address: Type.Optional(TeamsDevicesMacAddress),
    manufacturer: Type.Optional(TeamsDevicesManufacturer),
    model: Type.Optional(TeamsDevicesModel),
    name: Type.Optional(TeamsDevicesSchemasName),
    os_distro_name: Type.Optional(TeamsDevicesOsDistroName),
    os_distro_revision: Type.Optional(TeamsDevicesOsDistroRevision),
    os_version: Type.Optional(TeamsDevicesOsVersion),
    os_version_extra: Type.Optional(TeamsDevicesOsVersionExtra),
    revoked_at: Type.Optional(TeamsDevicesRevokedAt),
    serial_number: Type.Optional(TeamsDevicesSerialNumber),
    updated: Type.Optional(TeamsDevicesUpdated),
    user: Type.Optional(TeamsDevicesUser),
    version: Type.Optional(TeamsDevicesVersion),
  }),
)

export const TeamsDevicesDevicesResponse = named(
  "teams-devices_devices_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Array(TeamsDevicesDevices), Type.Null()]),
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result_info: Type.Optional(IntelResultInfo),
  }),
)

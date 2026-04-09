import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages, DlpEmpty, IntelResultInfo, TeamsDevicesIdentifier } from "../shared/schemas"
import {
  TeamsDevicesAllowModeSwitch,
  TeamsDevicesAllowUpdates,
  TeamsDevicesAllowedToLeave,
  TeamsDevicesApiResponseCommonFailure,
  TeamsDevicesApiResponseSingle,
  TeamsDevicesAutoConnect,
  TeamsDevicesCaptivePortal,
  TeamsDevicesComponentsSchemasName,
  TeamsDevicesComponentsSchemasResponseCollection,
  TeamsDevicesComponentsSchemasSingleResponse,
  TeamsDevicesComponentsSchemasType,
  TeamsDevicesConfigRequest,
  TeamsDevicesCursorResultInfo,
  TeamsDevicesDefaultDeviceSettingsResponse,
  TeamsDevicesDescription,
  TeamsDevicesDeviceManagedNetworksComponentsSchemasName,
  TeamsDevicesDeviceResponse,
  TeamsDevicesDeviceSettingsResponse,
  TeamsDevicesDeviceSettingsResponseCollection,
  TeamsDevicesDevicesPolicyCertificates,
  TeamsDevicesDevicesPolicyCertificatesSingle,
  TeamsDevicesDevicesResponse,
  TeamsDevicesDisableAutoFallback,
  TeamsDevicesExcludeOfficeIps,
  TeamsDevicesExcludeRequest,
  TeamsDevicesExpiration,
  TeamsDevicesFallbackDomain,
  TeamsDevicesFallbackDomainResponseCollection,
  TeamsDevicesGlobalWarpOverrideRequest,
  TeamsDevicesGlobalWarpOverrideResponse,
  TeamsDevicesIdResponse,
  TeamsDevicesIncludeRequest,
  TeamsDevicesInput,
  TeamsDevicesInterval,
  TeamsDevicesLanAllowMinutes,
  TeamsDevicesLanAllowSubnetSize,
  TeamsDevicesMatch,
  TeamsDevicesName,
  TeamsDevicesOverrideCodes,
  TeamsDevicesOverrideCodesResponse,
  TeamsDevicesPhysicalDevice,
  TeamsDevicesPrecedence,
  TeamsDevicesRegisterInterfaceIpWithDns,
  TeamsDevicesRegistration,
  TeamsDevicesRegistrationId,
  TeamsDevicesResponseCollection,
  TeamsDevicesRevokeDevicesRequest,
  TeamsDevicesSccmVpnBoundarySupport,
  TeamsDevicesSchedule,
  TeamsDevicesSchemasConfigRequest,
  TeamsDevicesSchemasDescription,
  TeamsDevicesSchemasMatch,
  TeamsDevicesSchemasResponseCollection,
  TeamsDevicesSchemasSingleResponse,
  TeamsDevicesSchemasType,
  TeamsDevicesSchemasUuid,
  TeamsDevicesServiceModeV2,
  TeamsDevicesSingleResponse,
  TeamsDevicesSplitTunnel,
  TeamsDevicesSplitTunnelInclude,
  TeamsDevicesSplitTunnelIncludeResponseCollection,
  TeamsDevicesSplitTunnelResponseCollection,
  TeamsDevicesSupportUrl,
  TeamsDevicesSwitchLocked,
  TeamsDevicesTunnelProtocol,
  TeamsDevicesType,
  TeamsDevicesUnrevokeDevicesRequest,
  TeamsDevicesUuid,
  TeamsDevicesV4ResponseMessage,
  TeamsDevicesZeroTrustAccountDeviceSettings,
  TeamsDevicesZeroTrustAccountDeviceSettingsResponse,
  UnnamedSchemaRef0462afe1a32ee90b1999d4277af59fa8,
  UnnamedSchemaRef1fbf91ecd61792c751fead58dc8005e6,
  UnnamedSchemaRef5e0c6134a624678286f4a424b001870a,
  UnnamedSchemaRef9e35ef84511131488ae286ce78ac4b27,
  UnnamedSchemaRefB84b377dfc9454d455b646d4bc9ab507,
  UnnamedSchemaRefD2b048663faf5e0cd5c90501b71171de,
  UnnamedSchemaRefF636ff9f2cb41ff4b715cf8ed8515581,
} from "./schemas"

export function registerDevices(api: Api) {
  api
    .get("/accounts/{account_id}/devices", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesDevicesResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("List devices (deprecated)")
    .description(
      "List WARP devices. Not supported when [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/) is enabled for the account.\n\n**Deprecated**: please use one of the following endpoints instead:\n- GET /accounts/{account_id}/devices/physical-devices\n- GET /accounts/{account_id}/devices/registrations\n",
    )
    .operationId("devices-list-devices")
    .tag("Devices")
    .deprecated()
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .get("/accounts/{account_id}/devices/networks", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesComponentsSchemasResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("List your device managed networks")
    .description("Fetches a list of managed networks for an account.")
    .operationId("device-managed-networks-list-device-managed-networks")
    .tag("Device Managed Networks")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .post("/accounts/{account_id}/devices/networks", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      body: Type.Object({
        config: TeamsDevicesSchemasConfigRequest,
        name: TeamsDevicesDeviceManagedNetworksComponentsSchemasName,
        type: TeamsDevicesComponentsSchemasType,
      }),
      responses: {
        200: TeamsDevicesComponentsSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefD2b048663faf5e0cd5c90501b71171de,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Create a device managed network")
    .description("Creates a new device managed network.")
    .operationId("device-managed-networks-create-device-managed-network")
    .tag("Device Managed Networks")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/networks/{network_id}", {
      params: Type.Object({ network_id: TeamsDevicesUuid, account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesComponentsSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefD2b048663faf5e0cd5c90501b71171de,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Get device managed network details")
    .description("Fetches details for a single managed network.")
    .operationId("device-managed-networks-device-managed-network-details")
    .tag("Device Managed Networks")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .put("/accounts/{account_id}/devices/networks/{network_id}", {
      params: Type.Object({ network_id: TeamsDevicesUuid, account_id: TeamsDevicesIdentifier }),
      body: Type.Object({
        config: Type.Optional(TeamsDevicesSchemasConfigRequest),
        name: Type.Optional(TeamsDevicesDeviceManagedNetworksComponentsSchemasName),
        type: Type.Optional(TeamsDevicesComponentsSchemasType),
      }),
      responses: {
        200: TeamsDevicesComponentsSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefD2b048663faf5e0cd5c90501b71171de,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Update a device managed network")
    .description("Updates a configured device managed network.")
    .operationId("device-managed-networks-update-device-managed-network")
    .tag("Device Managed Networks")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .delete("/accounts/{account_id}/devices/networks/{network_id}", {
      params: Type.Object({ network_id: TeamsDevicesUuid, account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesComponentsSchemasResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("Delete a device managed network")
    .description(
      "Deletes a device managed network and fetches a list of the remaining device managed networks for an account.",
    )
    .operationId("device-managed-networks-delete-device-managed-network")
    .tag("Device Managed Networks")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/physical-devices", {
      params: Type.Object({ account_id: Type.String() }),
      query: Type.Object({
        cursor: Type.Optional(Type.String()),
        sort_by: Type.Optional(
          Type.Union([
            Type.Literal("name"),
            Type.Literal("id"),
            Type.Literal("client_version"),
            Type.Literal("last_seen_user.email"),
            Type.Literal("last_seen_at"),
            Type.Literal("active_registrations"),
            Type.Literal("created_at"),
          ]),
        ),
        sort_order: Type.Optional(Type.Union([Type.Literal("asc"), Type.Literal("desc")])),
        "last_seen_user.email": Type.Optional(Type.String()),
        seen_after: Type.Optional(Type.String()),
        seen_before: Type.Optional(Type.String()),
        per_page: Type.Optional(Type.Integer({ format: "uint64" })),
        search: Type.Optional(Type.String()),
        active_registrations: Type.Optional(
          Type.Union([Type.Literal("include"), Type.Literal("only"), Type.Literal("exclude")]),
        ),
        id: Type.Optional(Type.Array(Type.String())),
        include: Type.Optional(Type.String()),
      }),
      response: Type.Object({
        errors: Type.Array(TeamsDevicesV4ResponseMessage),
        messages: Type.Array(TeamsDevicesV4ResponseMessage),
        result: Type.Array(TeamsDevicesPhysicalDevice),
        result_info: Type.Optional(TeamsDevicesCursorResultInfo),
        success: Type.Boolean({ description: "Whether the API call was successful." }),
      }),
    })
    .summary("List devices")
    .description("Lists WARP devices.")
    .operationId("list-devices")
    .tag("Physical Devices")
    .security({ api_token: [] })

  api
    .get("/accounts/{account_id}/devices/physical-devices/{device_id}", {
      params: Type.Object({ device_id: Type.String(), account_id: Type.String() }),
      query: Type.Object({
        include: Type.Optional(Type.String()),
      }),
      response: Type.Object({
        errors: Type.Array(TeamsDevicesV4ResponseMessage),
        messages: Type.Array(TeamsDevicesV4ResponseMessage),
        result: TeamsDevicesPhysicalDevice,
        success: Type.Boolean({ description: "Whether the API call was successful." }),
      }),
    })
    .summary("Get device")
    .description("Fetches a single WARP device.")
    .operationId("get-device")
    .tag("Physical Devices")
    .security({ api_token: [] })

  api
    .delete("/accounts/{account_id}/devices/physical-devices/{device_id}", {
      params: Type.Object({ device_id: Type.String(), account_id: Type.String() }),
      response: Type.Object({
        errors: Type.Array(TeamsDevicesV4ResponseMessage),
        messages: Type.Array(TeamsDevicesV4ResponseMessage),
        result: Type.Optional(DlpEmpty),
        success: Type.Boolean({ description: "Whether the API call was successful." }),
      }),
    })
    .summary("Delete device")
    .description("Deletes a WARP device.")
    .operationId("delete-device")
    .tag("Physical Devices")
    .security({ api_token: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .post("/accounts/{account_id}/devices/physical-devices/{device_id}/revoke", {
      params: Type.Object({ account_id: Type.String(), device_id: Type.String() }),
      response: Type.Object({
        errors: Type.Array(TeamsDevicesV4ResponseMessage),
        messages: Type.Array(TeamsDevicesV4ResponseMessage),
        result: Type.Optional(DlpEmpty),
        success: Type.Boolean({ description: "Whether the API call was successful." }),
      }),
    })
    .summary("Revoke device registrations")
    .description("Revokes all WARP registrations associated with the specified device.")
    .operationId("revoke-device")
    .tag("Physical Devices")
    .security({ api_token: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/policies", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesDeviceSettingsResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("List device settings profiles")
    .description("Fetches a list of the device settings profiles for an account.")
    .operationId("devices-list-device-settings-policies")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .get("/accounts/{account_id}/devices/policy", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesDefaultDeviceSettingsResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Get the default device settings profile")
    .description("Fetches the default device settings profile for an account.")
    .operationId("devices-get-default-device-settings-policy")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .post("/accounts/{account_id}/devices/policy", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      body: Type.Object({
        allow_mode_switch: Type.Optional(TeamsDevicesAllowModeSwitch),
        allow_updates: Type.Optional(TeamsDevicesAllowUpdates),
        allowed_to_leave: Type.Optional(TeamsDevicesAllowedToLeave),
        auto_connect: Type.Optional(TeamsDevicesAutoConnect),
        captive_portal: Type.Optional(TeamsDevicesCaptivePortal),
        description: Type.Optional(TeamsDevicesSchemasDescription),
        disable_auto_fallback: Type.Optional(TeamsDevicesDisableAutoFallback),
        enabled: Type.Optional(
          Type.Boolean({ description: "Whether the policy will be applied to matching devices." }),
        ),
        exclude: Type.Optional(TeamsDevicesExcludeRequest),
        exclude_office_ips: Type.Optional(TeamsDevicesExcludeOfficeIps),
        include: Type.Optional(TeamsDevicesIncludeRequest),
        lan_allow_minutes: Type.Optional(TeamsDevicesLanAllowMinutes),
        lan_allow_subnet_size: Type.Optional(TeamsDevicesLanAllowSubnetSize),
        match: TeamsDevicesSchemasMatch,
        name: Type.String({ description: "The name of the device settings profile.", maxLength: 100 }),
        precedence: TeamsDevicesPrecedence,
        register_interface_ip_with_dns: Type.Optional(TeamsDevicesRegisterInterfaceIpWithDns),
        sccm_vpn_boundary_support: Type.Optional(TeamsDevicesSccmVpnBoundarySupport),
        service_mode_v2: Type.Optional(TeamsDevicesServiceModeV2),
        support_url: Type.Optional(TeamsDevicesSupportUrl),
        switch_locked: Type.Optional(TeamsDevicesSwitchLocked),
        tunnel_protocol: Type.Optional(TeamsDevicesTunnelProtocol),
      }),
      responses: {
        200: TeamsDevicesDeviceSettingsResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefF636ff9f2cb41ff4b715cf8ed8515581,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Create a device settings profile")
    .description("Creates a device settings profile to be applied to certain devices matching the criteria.")
    .operationId("devices-create-device-settings-policy")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .patch("/accounts/{account_id}/devices/policy", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      body: Type.Object({
        allow_mode_switch: Type.Optional(TeamsDevicesAllowModeSwitch),
        allow_updates: Type.Optional(TeamsDevicesAllowUpdates),
        allowed_to_leave: Type.Optional(TeamsDevicesAllowedToLeave),
        auto_connect: Type.Optional(TeamsDevicesAutoConnect),
        captive_portal: Type.Optional(TeamsDevicesCaptivePortal),
        disable_auto_fallback: Type.Optional(TeamsDevicesDisableAutoFallback),
        exclude: Type.Optional(TeamsDevicesExcludeRequest),
        exclude_office_ips: Type.Optional(TeamsDevicesExcludeOfficeIps),
        include: Type.Optional(TeamsDevicesIncludeRequest),
        lan_allow_minutes: Type.Optional(TeamsDevicesLanAllowMinutes),
        lan_allow_subnet_size: Type.Optional(TeamsDevicesLanAllowSubnetSize),
        register_interface_ip_with_dns: Type.Optional(TeamsDevicesRegisterInterfaceIpWithDns),
        sccm_vpn_boundary_support: Type.Optional(TeamsDevicesSccmVpnBoundarySupport),
        service_mode_v2: Type.Optional(TeamsDevicesServiceModeV2),
        support_url: Type.Optional(TeamsDevicesSupportUrl),
        switch_locked: Type.Optional(TeamsDevicesSwitchLocked),
        tunnel_protocol: Type.Optional(TeamsDevicesTunnelProtocol),
      }),
      responses: {
        200: TeamsDevicesDefaultDeviceSettingsResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Update the default device settings profile")
    .description("Updates the default device settings profile for an account.")
    .operationId("devices-update-default-device-settings-policy")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/policy/exclude", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesSplitTunnelResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef0462afe1a32ee90b1999d4277af59fa8,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("Get the Split Tunnel exclude list")
    .description("Fetches the list of routes excluded from the WARP client's tunnel.")
    .operationId("devices-get-split-tunnel-exclude-list")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .put("/accounts/{account_id}/devices/policy/exclude", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      body: Type.Array(TeamsDevicesSplitTunnel),
      responses: {
        200: TeamsDevicesSplitTunnelResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef0462afe1a32ee90b1999d4277af59fa8,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("Set the Split Tunnel exclude list")
    .description("Sets the list of routes excluded from the WARP client's tunnel.")
    .operationId("devices-set-split-tunnel-exclude-list")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/policy/fallback_domains", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesFallbackDomainResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef1fbf91ecd61792c751fead58dc8005e6,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("Get your Local Domain Fallback list")
    .description(
      "Fetches a list of domains to bypass Gateway DNS resolution. These domains will use the specified local DNS resolver instead.",
    )
    .operationId("devices-get-local-domain-fallback-list")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .put("/accounts/{account_id}/devices/policy/fallback_domains", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      body: Type.Array(TeamsDevicesFallbackDomain),
      responses: {
        200: TeamsDevicesFallbackDomainResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef1fbf91ecd61792c751fead58dc8005e6,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("Set your Local Domain Fallback list")
    .description(
      "Sets the list of domains to bypass Gateway DNS resolution. These domains will use the specified local DNS resolver instead.",
    )
    .operationId("devices-set-local-domain-fallback-list")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/policy/include", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesSplitTunnelIncludeResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef5e0c6134a624678286f4a424b001870a,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("Get the Split Tunnel include list")
    .description("Fetches the list of routes included in the WARP client's tunnel.")
    .operationId("devices-get-split-tunnel-include-list")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .put("/accounts/{account_id}/devices/policy/include", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      body: Type.Array(TeamsDevicesSplitTunnelInclude),
      responses: {
        200: TeamsDevicesSplitTunnelIncludeResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef5e0c6134a624678286f4a424b001870a,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("Set the Split Tunnel include list")
    .description("Sets the list of routes included in the WARP client's tunnel.")
    .operationId("devices-set-split-tunnel-include-list")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/policy/{policy_id}", {
      params: Type.Object({ policy_id: TeamsDevicesSchemasUuid, account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesDeviceSettingsResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefF636ff9f2cb41ff4b715cf8ed8515581,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Get device settings profile by ID")
    .description("Fetches a device settings profile by ID.")
    .operationId("devices-get-device-settings-policy-by-id")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .patch("/accounts/{account_id}/devices/policy/{policy_id}", {
      params: Type.Object({ policy_id: TeamsDevicesSchemasUuid, account_id: TeamsDevicesIdentifier }),
      body: Type.Object({
        allow_mode_switch: Type.Optional(TeamsDevicesAllowModeSwitch),
        allow_updates: Type.Optional(TeamsDevicesAllowUpdates),
        allowed_to_leave: Type.Optional(TeamsDevicesAllowedToLeave),
        auto_connect: Type.Optional(TeamsDevicesAutoConnect),
        captive_portal: Type.Optional(TeamsDevicesCaptivePortal),
        description: Type.Optional(TeamsDevicesSchemasDescription),
        disable_auto_fallback: Type.Optional(TeamsDevicesDisableAutoFallback),
        enabled: Type.Optional(
          Type.Boolean({ description: "Whether the policy will be applied to matching devices." }),
        ),
        exclude: Type.Optional(TeamsDevicesExcludeRequest),
        exclude_office_ips: Type.Optional(TeamsDevicesExcludeOfficeIps),
        include: Type.Optional(TeamsDevicesIncludeRequest),
        lan_allow_minutes: Type.Optional(TeamsDevicesLanAllowMinutes),
        lan_allow_subnet_size: Type.Optional(TeamsDevicesLanAllowSubnetSize),
        match: Type.Optional(TeamsDevicesSchemasMatch),
        name: Type.Optional(Type.String({ description: "The name of the device settings profile.", maxLength: 100 })),
        precedence: Type.Optional(TeamsDevicesPrecedence),
        register_interface_ip_with_dns: Type.Optional(TeamsDevicesRegisterInterfaceIpWithDns),
        sccm_vpn_boundary_support: Type.Optional(TeamsDevicesSccmVpnBoundarySupport),
        service_mode_v2: Type.Optional(TeamsDevicesServiceModeV2),
        support_url: Type.Optional(TeamsDevicesSupportUrl),
        switch_locked: Type.Optional(TeamsDevicesSwitchLocked),
        tunnel_protocol: Type.Optional(TeamsDevicesTunnelProtocol),
      }),
      responses: {
        200: TeamsDevicesDeviceSettingsResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefF636ff9f2cb41ff4b715cf8ed8515581,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Update a device settings profile")
    .description("Updates a configured device settings profile.")
    .operationId("devices-update-device-settings-policy")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .delete("/accounts/{account_id}/devices/policy/{policy_id}", {
      params: Type.Object({ policy_id: TeamsDevicesSchemasUuid, account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesDeviceSettingsResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("Delete a device settings profile")
    .description("Deletes a device settings profile and fetches a list of the remaining profiles for an account.")
    .operationId("devices-delete-device-settings-policy")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/policy/{policy_id}/exclude", {
      params: Type.Object({ policy_id: TeamsDevicesSchemasUuid, account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesSplitTunnelResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef0462afe1a32ee90b1999d4277af59fa8,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("Get the Split Tunnel exclude list for a device settings profile")
    .description(
      "Fetches the list of routes excluded from the WARP client's tunnel for a specific device settings profile.",
    )
    .operationId("devices-get-split-tunnel-exclude-list-for-a-device-settings-policy")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .put("/accounts/{account_id}/devices/policy/{policy_id}/exclude", {
      params: Type.Object({ policy_id: TeamsDevicesSchemasUuid, account_id: TeamsDevicesIdentifier }),
      body: Type.Array(TeamsDevicesSplitTunnel),
      responses: {
        200: TeamsDevicesSplitTunnelResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef0462afe1a32ee90b1999d4277af59fa8,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("Set the Split Tunnel exclude list for a device settings profile")
    .description(
      "Sets the list of routes excluded from the WARP client's tunnel for a specific device settings profile.",
    )
    .operationId("devices-set-split-tunnel-exclude-list-for-a-device-settings-policy")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/policy/{policy_id}/fallback_domains", {
      params: Type.Object({ policy_id: TeamsDevicesSchemasUuid, account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesFallbackDomainResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef1fbf91ecd61792c751fead58dc8005e6,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("Get the Local Domain Fallback list for a device settings profile")
    .description(
      "Fetches the list of domains to bypass Gateway DNS resolution from a specified device settings profile. These domains will use the specified local DNS resolver instead.",
    )
    .operationId("devices-get-local-domain-fallback-list-for-a-device-settings-policy")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .put("/accounts/{account_id}/devices/policy/{policy_id}/fallback_domains", {
      params: Type.Object({ policy_id: TeamsDevicesSchemasUuid, account_id: TeamsDevicesIdentifier }),
      body: Type.Array(TeamsDevicesFallbackDomain),
      responses: {
        200: TeamsDevicesFallbackDomainResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef1fbf91ecd61792c751fead58dc8005e6,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("Set the Local Domain Fallback list for a device settings profile")
    .description(
      "Sets the list of domains to bypass Gateway DNS resolution. These domains will use the specified local DNS resolver instead. This will only apply to the specified device settings profile.",
    )
    .operationId("devices-set-local-domain-fallback-list-for-a-device-settings-policy")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/policy/{policy_id}/include", {
      params: Type.Object({ policy_id: TeamsDevicesSchemasUuid, account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesSplitTunnelIncludeResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef5e0c6134a624678286f4a424b001870a,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("Get the Split Tunnel include list for a device settings profile")
    .description(
      "Fetches the list of routes included in the WARP client's tunnel for a specific device settings profile.",
    )
    .operationId("devices-get-split-tunnel-include-list-for-a-device-settings-policy")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .put("/accounts/{account_id}/devices/policy/{policy_id}/include", {
      params: Type.Object({ policy_id: TeamsDevicesSchemasUuid, account_id: TeamsDevicesIdentifier }),
      body: Type.Array(TeamsDevicesSplitTunnelInclude),
      responses: {
        200: TeamsDevicesSplitTunnelIncludeResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef5e0c6134a624678286f4a424b001870a,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("Set the Split Tunnel include list for a device settings profile")
    .description("Sets the list of routes included in the WARP client's tunnel for a specific device settings profile.")
    .operationId("devices-set-split-tunnel-include-list-for-a-device-settings-policy")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/posture", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("List device posture rules")
    .description("Fetches device posture rules for a Zero Trust account.")
    .operationId("device-posture-rules-list-device-posture-rules")
    .tag("Device posture rules")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .post("/accounts/{account_id}/devices/posture", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      body: Type.Object({
        description: Type.Optional(TeamsDevicesDescription),
        expiration: Type.Optional(TeamsDevicesExpiration),
        input: Type.Optional(TeamsDevicesInput),
        match: Type.Optional(TeamsDevicesMatch),
        name: TeamsDevicesName,
        schedule: Type.Optional(TeamsDevicesSchedule),
        type: TeamsDevicesType,
      }),
      responses: {
        200: TeamsDevicesSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef9e35ef84511131488ae286ce78ac4b27,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Create a device posture rule")
    .description("Creates a new device posture rule.")
    .operationId("device-posture-rules-create-device-posture-rule")
    .tag("Device posture rules")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/posture/integration", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesSchemasResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("List your device posture integrations")
    .description("Fetches the list of device posture integrations for an account.")
    .operationId("device-posture-integrations-list-device-posture-integrations")
    .tag("Device Posture Integrations")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .post("/accounts/{account_id}/devices/posture/integration", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      body: Type.Object({
        config: TeamsDevicesConfigRequest,
        interval: TeamsDevicesInterval,
        name: TeamsDevicesComponentsSchemasName,
        type: TeamsDevicesSchemasType,
      }),
      responses: {
        200: TeamsDevicesSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefB84b377dfc9454d455b646d4bc9ab507,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Create a device posture integration")
    .description("Create a new device posture integration.")
    .operationId("device-posture-integrations-create-device-posture-integration")
    .tag("Device Posture Integrations")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/posture/integration/{integration_id}", {
      params: Type.Object({ integration_id: TeamsDevicesUuid, account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefB84b377dfc9454d455b646d4bc9ab507,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Get device posture integration details")
    .description("Fetches details for a single device posture integration.")
    .operationId("device-posture-integrations-device-posture-integration-details")
    .tag("Device Posture Integrations")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .patch("/accounts/{account_id}/devices/posture/integration/{integration_id}", {
      params: Type.Object({ integration_id: TeamsDevicesUuid, account_id: TeamsDevicesIdentifier }),
      body: Type.Object({
        config: Type.Optional(TeamsDevicesConfigRequest),
        interval: Type.Optional(TeamsDevicesInterval),
        name: Type.Optional(TeamsDevicesComponentsSchemasName),
        type: Type.Optional(TeamsDevicesSchemasType),
      }),
      responses: {
        200: TeamsDevicesSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefB84b377dfc9454d455b646d4bc9ab507,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Update a device posture integration")
    .description("Updates a configured device posture integration.")
    .operationId("device-posture-integrations-update-device-posture-integration")
    .tag("Device Posture Integrations")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .delete("/accounts/{account_id}/devices/posture/integration/{integration_id}", {
      params: Type.Object({ integration_id: TeamsDevicesUuid, account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesApiResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Delete a device posture integration")
    .description("Delete a configured device posture integration.")
    .operationId("device-posture-integrations-delete-device-posture-integration")
    .tag("Device Posture Integrations")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/posture/{rule_id}", {
      params: Type.Object({ rule_id: TeamsDevicesUuid, account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef9e35ef84511131488ae286ce78ac4b27,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Get device posture rule details")
    .description("Fetches a single device posture rule.")
    .operationId("device-posture-rules-device-posture-rules-details")
    .tag("Device posture rules")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .put("/accounts/{account_id}/devices/posture/{rule_id}", {
      params: Type.Object({ rule_id: TeamsDevicesUuid, account_id: TeamsDevicesIdentifier }),
      body: Type.Object({
        description: Type.Optional(TeamsDevicesDescription),
        expiration: Type.Optional(TeamsDevicesExpiration),
        input: Type.Optional(TeamsDevicesInput),
        match: Type.Optional(TeamsDevicesMatch),
        name: TeamsDevicesName,
        schedule: Type.Optional(TeamsDevicesSchedule),
        type: TeamsDevicesType,
      }),
      responses: {
        200: TeamsDevicesSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef9e35ef84511131488ae286ce78ac4b27,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Update a device posture rule")
    .description("Updates a device posture rule.")
    .operationId("device-posture-rules-update-device-posture-rule")
    .tag("Device posture rules")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .delete("/accounts/{account_id}/devices/posture/{rule_id}", {
      params: Type.Object({ rule_id: TeamsDevicesUuid, account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesIdResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Delete a device posture rule")
    .description("Deletes a device posture rule.")
    .operationId("device-posture-rules-delete-device-posture-rule")
    .tag("Device posture rules")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/registrations", {
      params: Type.Object({ account_id: Type.String() }),
      query: Type.Object({
        "user.id": Type.Optional(Type.Array(Type.String())),
        seen_after: Type.Optional(Type.String()),
        seen_before: Type.Optional(Type.String()),
        status: Type.Optional(Type.Union([Type.Literal("active"), Type.Literal("all"), Type.Literal("revoked")])),
        per_page: Type.Optional(Type.Integer({ format: "uint64" })),
        search: Type.Optional(Type.String()),
        sort_by: Type.Optional(
          Type.Union([
            Type.Literal("id"),
            Type.Literal("user.name"),
            Type.Literal("user.email"),
            Type.Literal("last_seen_at"),
            Type.Literal("created_at"),
          ]),
        ),
        sort_order: Type.Optional(Type.Union([Type.Literal("asc"), Type.Literal("desc")])),
        cursor: Type.Optional(Type.String()),
        id: Type.Optional(Type.Array(Type.String())),
        "device.id": Type.Optional(Type.String()),
        include: Type.Optional(Type.String()),
      }),
      response: Type.Object({
        errors: Type.Array(TeamsDevicesV4ResponseMessage),
        messages: Type.Array(TeamsDevicesV4ResponseMessage),
        result: Type.Array(TeamsDevicesRegistration),
        result_info: Type.Optional(TeamsDevicesCursorResultInfo),
        success: Type.Boolean({ description: "Whether the API call was successful." }),
      }),
    })
    .summary("List registrations")
    .description("Lists WARP registrations.")
    .operationId("list-registrations")
    .tag("Registrations")
    .security({ api_token: [] })

  api
    .delete("/accounts/{account_id}/devices/registrations", {
      params: Type.Object({ account_id: Type.String() }),
      query: Type.Object({
        id: Type.Array(Type.String()),
      }),
      response: Type.Object({
        errors: Type.Array(TeamsDevicesV4ResponseMessage),
        messages: Type.Array(TeamsDevicesV4ResponseMessage),
        result: DlpEmpty,
        result_info: Type.Optional(TeamsDevicesCursorResultInfo),
        success: Type.Boolean({ description: "Whether the API call was successful." }),
      }),
    })
    .summary("Delete registrations")
    .description("Deletes a list of WARP registrations.")
    .operationId("delete-registrations")
    .tag("Physical Devices")
    .security({ api_token: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .post("/accounts/{account_id}/devices/registrations/revoke", {
      params: Type.Object({ account_id: Type.String() }),
      query: Type.Object({
        id: Type.Array(Type.String()),
      }),
      response: Type.Object({
        errors: Type.Array(TeamsDevicesV4ResponseMessage),
        messages: Type.Array(TeamsDevicesV4ResponseMessage),
        result: DlpEmpty,
        result_info: Type.Optional(TeamsDevicesCursorResultInfo),
        success: Type.Boolean({ description: "Whether the API call was successful." }),
      }),
    })
    .summary("Revoke registrations")
    .description("Revokes a list of WARP registrations.")
    .operationId("revoke-registrations")
    .tag("Registrations")
    .security({ api_token: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .post("/accounts/{account_id}/devices/registrations/unrevoke", {
      params: Type.Object({ account_id: Type.String() }),
      query: Type.Object({
        id: Type.Array(Type.String()),
      }),
      response: Type.Object({
        errors: Type.Array(TeamsDevicesV4ResponseMessage),
        messages: Type.Array(TeamsDevicesV4ResponseMessage),
        result: DlpEmpty,
        result_info: Type.Optional(TeamsDevicesCursorResultInfo),
        success: Type.Boolean({ description: "Whether the API call was successful." }),
      }),
    })
    .summary("Unrevoke registrations")
    .description("Unrevokes a list of WARP registrations.")
    .operationId("unrevoke-registrations")
    .tag("Registrations")
    .security({ api_token: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/registrations/{registration_id}", {
      params: Type.Object({ registration_id: Type.String(), account_id: Type.String() }),
      query: Type.Object({
        include: Type.Optional(Type.String()),
      }),
      response: Type.Object({
        errors: Type.Array(TeamsDevicesV4ResponseMessage),
        messages: Type.Array(TeamsDevicesV4ResponseMessage),
        result: TeamsDevicesRegistration,
        success: Type.Boolean({ description: "Whether the API call was successful." }),
      }),
    })
    .summary("Get registration")
    .description("Fetches a single WARP registration.")
    .operationId("get-registration")
    .tag("Registrations")
    .security({ api_token: [] })

  api
    .delete("/accounts/{account_id}/devices/registrations/{registration_id}", {
      params: Type.Object({ registration_id: Type.String(), account_id: Type.String() }),
      response: Type.Object({
        errors: Type.Array(TeamsDevicesV4ResponseMessage),
        messages: Type.Array(TeamsDevicesV4ResponseMessage),
        result: Type.Optional(DlpEmpty),
        success: Type.Boolean({ description: "Whether the API call was successful." }),
      }),
    })
    .summary("Delete registration")
    .description("Deletes a WARP registration.")
    .operationId("delete-registration")
    .tag("Registrations")
    .security({ api_token: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/registrations/{registration_id}/override_codes", {
      params: Type.Object({ account_id: Type.String(), registration_id: Type.String() }),
      response: Type.Object({
        errors: Type.Array(TeamsDevicesV4ResponseMessage),
        messages: Type.Array(TeamsDevicesV4ResponseMessage),
        result: TeamsDevicesOverrideCodes,
        success: Type.Boolean({ description: "Whether the API call was successful." }),
      }),
    })
    .summary("Get override codes")
    .description(
      "Fetches one-time use admin override codes for a registration. This relies on the **Admin Override** setting being enabled in your device configuration.",
    )
    .operationId("get-registration-override-codes")
    .tag("warp-teams-device-api_other")
    .security({ api_token: [] })
    .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/resilience/disconnect", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesGlobalWarpOverrideResponse,
        "4XX": TeamsDevicesApiResponseCommonFailure,
      },
    })
    .summary("Retrieve Global WARP override state")
    .description("Fetch the Global WARP override state.")
    .operationId("devices-resilience-retrieve-global-warp-override")
    .tag("Devices Resilience")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Zero Trust Resilience Read",
      "Zero Trust Resilience Write",
      "Zero Trust Read",
      "Zero Trust Write",
    ])

  api
    .post("/accounts/{account_id}/devices/resilience/disconnect", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      body: TeamsDevicesGlobalWarpOverrideRequest,
      responses: {
        200: TeamsDevicesGlobalWarpOverrideResponse,
        "4XX": TeamsDevicesApiResponseCommonFailure,
      },
    })
    .summary("Set Global WARP override state")
    .description("Sets the Global WARP override state.")
    .operationId("devices-resilience-set-global-warp-override")
    .tag("Devices Resilience")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Resilience Write"])

  api
    .post("/accounts/{account_id}/devices/revoke", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      body: TeamsDevicesRevokeDevicesRequest,
      responses: {
        200: TeamsDevicesApiResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Revoke devices (deprecated)")
    .description(
      "Revokes a list of devices. Not supported when [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/) is enabled.\n\n**Deprecated**: please use POST /accounts/{account_id}/devices/registrations/revoke instead.\n",
    )
    .operationId("devices-revoke-devices")
    .tag("Devices")
    .deprecated()
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/settings", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesZeroTrustAccountDeviceSettingsResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Get device settings for a Zero Trust account")
    .description("Describes the current device settings for a Zero Trust account.")
    .operationId("zero-trust-accounts-get-device-settings-for-zero-trust-account")
    .tag("Zero Trust accounts")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .put("/accounts/{account_id}/devices/settings", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      body: TeamsDevicesZeroTrustAccountDeviceSettings,
      responses: {
        200: TeamsDevicesZeroTrustAccountDeviceSettingsResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Update device settings for a Zero Trust account")
    .description("Updates the current device settings for a Zero Trust account.")
    .operationId("zero-trust-accounts-update-device-settings-for-the-zero-trust-account")
    .tag("Zero Trust accounts")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .patch("/accounts/{account_id}/devices/settings", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      body: TeamsDevicesZeroTrustAccountDeviceSettings,
      responses: {
        200: TeamsDevicesZeroTrustAccountDeviceSettingsResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Patch device settings for a Zero Trust account")
    .description("Patches the current device settings for a Zero Trust account.")
    .operationId("zero-trust-accounts-patch-device-settings-for-the-zero-trust-account")
    .tag("Zero Trust accounts")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .delete("/accounts/{account_id}/devices/settings", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesZeroTrustAccountDeviceSettingsResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Reset device settings for a Zero Trust account with defaults. This turns off all proxying.")
    .description("Resets the current device settings for a Zero Trust account.")
    .operationId("zero-trust-accounts-delete-device-settings-for-zero-trust-account")
    .tag("Zero Trust accounts")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .post("/accounts/{account_id}/devices/unrevoke", {
      params: Type.Object({ account_id: TeamsDevicesIdentifier }),
      body: TeamsDevicesUnrevokeDevicesRequest,
      responses: {
        200: TeamsDevicesApiResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Unrevoke devices (deprecated)")
    .description(
      "Unrevokes a list of devices. Not supported when [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/) is enabled.\n\n**Deprecated**: please use POST /accounts/{account_id}/devices/registrations/unrevoke instead.\n",
    )
    .operationId("devices-unrevoke-devices")
    .tag("Devices")
    .deprecated()
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Write"])

  api
    .get("/accounts/{account_id}/devices/{device_id}", {
      params: Type.Object({ device_id: TeamsDevicesRegistrationId, account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesDeviceResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Get device (deprecated)")
    .description(
      "Fetches a single WARP device. Not supported when [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/) is enabled for the account.\n\n**Deprecated**: please use one of the following endpoints instead:\n- GET /accounts/{account_id}/devices/physical-devices/{device_id}\n- GET /accounts/{account_id}/devices/registrations/{registration_id}\n",
    )
    .operationId("devices-device-details")
    .tag("Devices")
    .deprecated()
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .get("/accounts/{account_id}/devices/{device_id}/override_codes", {
      params: Type.Object({ device_id: TeamsDevicesRegistrationId, account_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesOverrideCodesResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
    .summary("Get override codes (deprecated)\n")
    .description(
      "Fetches a one-time use admin override code for a device. This relies on the **Admin Override** setting being enabled in your device configuration. Not supported when [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/) is enabled for the account.\n**Deprecated:** please use GET /accounts/{account_id}/devices/registrations/{registration_id}/override_codes instead.\n",
    )
    .operationId("devices-list-admin-override-code-for-device")
    .tag("Devices")
    .deprecated()
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

  api
    .get("/zones/{zone_id}/devices/policy/certificates", {
      params: Type.Object({ zone_id: TeamsDevicesIdentifier }),
      responses: {
        200: TeamsDevicesDevicesPolicyCertificatesSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Get device certificate provisioning status")
    .description("Fetches device certificate provisioning.")
    .operationId("devices-get-policy-certificates")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["SSL and Certificates Write", "SSL and Certificates Read"])

  api
    .patch("/zones/{zone_id}/devices/policy/certificates", {
      params: Type.Object({ zone_id: TeamsDevicesIdentifier }),
      body: TeamsDevicesDevicesPolicyCertificates,
      responses: {
        200: TeamsDevicesDevicesPolicyCertificatesSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
        }),
      },
    })
    .summary("Update device certificate provisioning status")
    .description(
      "Enable Zero Trust Clients to provision a certificate, containing a x509 subject, and referenced by Access device posture policies when the client visits MTLS protected domains. This facilitates device posture without a WARP session.",
    )
    .operationId("devices-update-policy-certificates")
    .tag("Devices")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["SSL and Certificates Write"])
}

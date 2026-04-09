import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages, MagicIdentifier } from "../shared/schemas"
import {
  MagicAclSingleResponse,
  MagicAclUpdateRequest,
  MagicAclsAddSingleRequest,
  MagicAclsCollectionResponse,
  MagicApiResponseCommonFailure,
  MagicAppAddSingleRequest,
  MagicAppConfigAddSingleRequest,
  MagicAppConfigSingleResponse,
  MagicAppConfigUpdateRequest,
  MagicAppConfigsCollectionResponse,
  MagicAppSingleResponse,
  MagicAppUpdateRequest,
  MagicAppsCollectionResponse,
  MagicComponentsSchemasModifiedTunnelsCollectionResponse,
  MagicComponentsSchemasTunnelModifiedResponse,
  MagicComponentsSchemasTunnelSingleResponse,
  MagicComponentsSchemasTunnelsCollectionResponse,
  MagicCreateGreTunnelRequest,
  MagicCreateGreTunnelResponse,
  MagicCreateRouteRequest,
  MagicCreateRouteResponse,
  MagicGreTunnelUpdateRequest,
  MagicInterconnectTunnelUpdateRequest,
  MagicIpsecTunnelAddRequest,
  MagicIpsecTunnelAddSingleRequest,
  MagicLanSingleResponse,
  MagicLanUpdateRequest,
  MagicLansAddSingleRequest,
  MagicLansCollectionResponse,
  MagicModifiedTunnelsCollectionResponse,
  MagicMultipleRouteDeleteResponse,
  MagicMultipleRouteModifiedResponse,
  MagicPskGenerationResponse,
  MagicRouteDeletedResponse,
  MagicRouteModifiedResponse,
  MagicRouteSingleResponse,
  MagicRouteUpdateManyRequest,
  MagicRouteUpdateRequest,
  MagicRoutesCollectionResponse,
  MagicSchemasCreateIpsecTunnelResponse,
  MagicSchemasModifiedTunnelsCollectionResponse,
  MagicSchemasTunnelDeletedResponse,
  MagicSchemasTunnelModifiedResponse,
  MagicSchemasTunnelSingleResponse,
  MagicSchemasTunnelsCollectionResponse,
  MagicSiteSingleResponse,
  MagicSiteUpdateRequest,
  MagicSitesAddSingleRequest,
  MagicSitesCollectionResponse,
  MagicTunnelDeletedResponse,
  MagicTunnelModifiedResponse,
  MagicTunnelSingleResponse,
  MagicTunnelsCollectionResponse,
  MagicWanSingleResponse,
  MagicWanUpdateRequest,
  MagicWansAddSingleRequest,
  MagicWansCollectionResponse,
  McnBadResponse,
  McnCatalogSyncDestinationType,
  McnCatalogSyncId,
  McnCatalogSyncsPrebuiltPoliciesResponse,
  McnCreateCatalogSyncRequest,
  McnCreateCatalogSyncResponse,
  McnCreateOnrampRequest,
  McnCreateProviderRequest,
  McnCreateProviderResponse,
  McnDeleteCatalogSyncResponse,
  McnDeleteOnrampResponse,
  McnDeleteProviderResponse,
  McnGetMagicWanAddressSpaceResponse,
  McnGetOnrampResponse,
  McnGoodResponse,
  McnListOnrampsResponse,
  McnMagicWanAddressSpace,
  McnOnrampId,
  McnProviderInitialSetupResponse,
  McnReadAccountCatalogSyncsResponse,
  McnReadAccountProvidersResponse,
  McnReadAccountResourceResponse,
  McnReadAccountResourcesResponse,
  McnRefreshCatalogSyncResponse,
  McnResourceType,
  McnResourcesCatalogPolicyPreviewRequest,
  McnResourcesCatalogPolicyPreviewResponse,
  McnUpdateCatalogSyncRequest,
  McnUpdateOnrampRequest,
  McnUpdateProviderRequest,
  MconnBadResponse,
  MconnCustomerConnectorCreateRequest,
  MconnCustomerConnectorFetchResponse,
  MconnCustomerConnectorListResponse,
  MconnCustomerConnectorUpdateRequest,
  MconnCustomerEventsGetLatestSuccess,
  MconnCustomerEventsGetSuccess,
  MconnCustomerSnapshotsGetLatestSuccess,
  MconnCustomerSnapshotsGetSuccess,
  MconnEnvelope,
  MconnUuid,
} from "./schemas"

export function registerMagic(api: Api) {
  api.group("/accounts/{account_id}/magic", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/apps", {
      responses: {
        200: MagicAppsCollectionResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("List Apps")
      .description("Lists Apps associated with an account.")
      .operationId("magic-account-apps-list-apps")
      .tag("Magic Account Apps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/apps", {
      body: MagicAppAddSingleRequest,
      responses: {
        201: MagicAppSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Create a new App")
      .description("Creates a new App for an account")
      .operationId("magic-account-apps-add-app")
      .tag("Magic Account Apps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/apps/{account_app_id}", {
      params: Type.Object({ account_app_id: MagicIdentifier }),
      body: MagicAppUpdateRequest,
      responses: {
        200: MagicAppSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Update an App")
      .description("Updates an Account App")
      .operationId("magic-account-apps-update-app")
      .tag("Magic Account Apps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.patch("/apps/{account_app_id}", {
      params: Type.Object({ account_app_id: MagicIdentifier }),
      body: MagicAppUpdateRequest,
      responses: {
        200: MagicAppSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Update an App")
      .description("Updates an Account App")
      .operationId("magic-account-apps-patch-app")
      .tag("Magic Account Apps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/apps/{account_app_id}", {
      params: Type.Object({ account_app_id: MagicIdentifier }),
      responses: {
        200: MagicAppSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Delete Account App")
      .description("Deletes specific Account App.")
      .operationId("magic-account-apps-delete-app")
      .tag("Magic Account Apps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/cf_interconnects", {
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: MagicComponentsSchemasTunnelsCollectionResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("List interconnects")
      .description("Lists interconnects associated with an account.")
      .operationId("magic-interconnects-list-interconnects")
      .tag("Magic Interconnects")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/cf_interconnects", {
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      body: Type.Unknown(),
      responses: {
        200: MagicComponentsSchemasModifiedTunnelsCollectionResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Update multiple interconnects")
      .description(
        "Updates multiple interconnects associated with an account. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.",
      )
      .operationId("magic-interconnects-update-multiple-interconnects")
      .tag("Magic Interconnects")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/cf_interconnects/{cf_interconnect_id}", {
      params: Type.Object({ cf_interconnect_id: MagicIdentifier }),
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: MagicComponentsSchemasTunnelSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("List interconnect Details")
      .description("Lists details for a specific interconnect.")
      .operationId("magic-interconnects-list-interconnect-details")
      .tag("Magic Interconnects")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/cf_interconnects/{cf_interconnect_id}", {
      params: Type.Object({ cf_interconnect_id: MagicIdentifier }),
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      body: MagicInterconnectTunnelUpdateRequest,
      responses: {
        200: MagicComponentsSchemasTunnelModifiedResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Update interconnect")
      .description(
        "Updates a specific interconnect associated with an account. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.",
      )
      .operationId("magic-interconnects-update-interconnect")
      .tag("Magic Interconnects")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/cloud/catalog-syncs", {
      responses: {
        200: McnReadAccountCatalogSyncsResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("List Catalog Syncs")
      .description("List Catalog Syncs (Closed Beta).")
      .operationId("catalog-syncs-list")
      .tag("Catalog Sync")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])

    g.post("/cloud/catalog-syncs", {
      headers: Type.Object({
        forwarded: Type.Optional(Type.String()),
      }),
      body: McnCreateCatalogSyncRequest,
      responses: {
        201: McnCreateCatalogSyncResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        409: McnBadResponse,
        422: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Create Catalog Sync")
      .description("Create a new Catalog Sync (Closed Beta).")
      .operationId("catalog-syncs-create")
      .tag("Catalog Sync")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.get("/cloud/catalog-syncs/prebuilt-policies", {
      query: Type.Object({
        destination_type: Type.Optional(McnCatalogSyncDestinationType),
      }),
      responses: {
        200: McnCatalogSyncsPrebuiltPoliciesResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("List Prebuilt Policies")
      .description("List prebuilt catalog sync policies (Closed Beta).")
      .operationId("catalog-syncs-prebuilt-policies-list")
      .tag("Catalog Sync")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])

    g.get("/cloud/catalog-syncs/{sync_id}", {
      params: Type.Object({ sync_id: McnCatalogSyncId }),
      responses: {
        200: McnCreateCatalogSyncResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Read Catalog Sync")
      .description("Read a Catalog Sync (Closed Beta).")
      .operationId("catalog-syncs-read")
      .tag("Catalog Sync")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])

    g.put("/cloud/catalog-syncs/{sync_id}", {
      params: Type.Object({ sync_id: McnCatalogSyncId }),
      body: McnUpdateCatalogSyncRequest,
      responses: {
        200: McnCreateCatalogSyncResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        409: McnBadResponse,
        422: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Update Catalog Sync")
      .description("Update a Catalog Sync (Closed Beta).")
      .operationId("catalog-syncs-update")
      .tag("Catalog Sync")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.patch("/cloud/catalog-syncs/{sync_id}", {
      params: Type.Object({ sync_id: McnCatalogSyncId }),
      body: McnUpdateCatalogSyncRequest,
      responses: {
        200: McnCreateCatalogSyncResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        409: McnBadResponse,
        422: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Patch Catalog Sync")
      .description("Update a Catalog Sync (Closed Beta).")
      .operationId("catalog-syncs-patch")
      .tag("Catalog Sync")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.delete("/cloud/catalog-syncs/{sync_id}", {
      params: Type.Object({ sync_id: McnCatalogSyncId }),
      query: Type.Object({
        delete_destination: Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: McnDeleteCatalogSyncResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        409: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Delete Catalog Sync")
      .description("Delete a Catalog Sync (Closed Beta).")
      .operationId("catalog-syncs-delete")
      .tag("Catalog Sync")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.post("/cloud/catalog-syncs/{sync_id}/refresh", {
      params: Type.Object({ sync_id: McnCatalogSyncId }),
      responses: {
        200: McnRefreshCatalogSyncResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        409: McnBadResponse,
        422: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Run Catalog Sync")
      .description(
        "Refresh a Catalog Sync's destination by running the sync policy against latest resource catalog (Closed Beta).",
      )
      .operationId("catalog-syncs-refresh")
      .tag("Catalog Sync")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.get("/cloud/onramps", {
      query: Type.Object({
        order_by: Type.Optional(Type.String()),
        desc: Type.Optional(Type.Boolean()),
        status: Type.Optional(Type.Boolean()),
        vpcs: Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: McnListOnrampsResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("List On-ramps")
      .description("List On-ramps (Closed Beta).")
      .operationId("onramps-list")
      .tag("On-ramps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])

    g.post("/cloud/onramps", {
      headers: Type.Object({
        forwarded: Type.Optional(Type.String()),
      }),
      body: McnCreateOnrampRequest,
      responses: {
        201: McnGetOnrampResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        409: McnBadResponse,
        422: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Create On-ramp")
      .description("Create a new On-ramp (Closed Beta).")
      .operationId("onramps-create")
      .tag("On-ramps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.get("/cloud/onramps/magic_wan_address_space", {
      responses: {
        200: McnGetMagicWanAddressSpaceResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Read Magic WAN Address Space")
      .description("Read the Magic WAN Address Space (Closed Beta).")
      .operationId("onramps-mwan-addr-space-read")
      .tag("On-ramps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])

    g.put("/cloud/onramps/magic_wan_address_space", {
      body: McnMagicWanAddressSpace,
      responses: {
        200: McnGetMagicWanAddressSpaceResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        422: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Update Magic WAN Address Space")
      .description("Update the Magic WAN Address Space (Closed Beta).")
      .operationId("onramps-mwan-addr-space-update")
      .tag("On-ramps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.patch("/cloud/onramps/magic_wan_address_space", {
      body: McnMagicWanAddressSpace,
      responses: {
        200: McnGetMagicWanAddressSpaceResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        422: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Patch Magic WAN Address Space")
      .description("Update the Magic WAN Address Space (Closed Beta).")
      .operationId("onramps-mwan-addr-space-patch")
      .tag("On-ramps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.get("/cloud/onramps/{onramp_id}", {
      params: Type.Object({ onramp_id: McnOnrampId }),
      query: Type.Object({
        status: Type.Optional(Type.Boolean()),
        vpcs: Type.Optional(Type.Boolean()),
        post_apply_resources: Type.Optional(Type.Boolean()),
        planned_resources: Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: McnGetOnrampResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Read On-ramp")
      .description("Read an On-ramp (Closed Beta).")
      .operationId("onramps-read")
      .tag("On-ramps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])

    g.put("/cloud/onramps/{onramp_id}", {
      params: Type.Object({ onramp_id: McnOnrampId }),
      body: McnUpdateOnrampRequest,
      responses: {
        200: McnGetOnrampResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        409: McnBadResponse,
        422: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Update On-ramp")
      .description("Update an On-ramp (Closed Beta).")
      .operationId("onramps-update")
      .tag("On-ramps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.patch("/cloud/onramps/{onramp_id}", {
      params: Type.Object({ onramp_id: McnOnrampId }),
      body: McnUpdateOnrampRequest,
      responses: {
        200: McnGetOnrampResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        409: McnBadResponse,
        422: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Patch On-ramp")
      .description("Update an On-ramp (Closed Beta).")
      .operationId("onramps-patch")
      .tag("On-ramps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.delete("/cloud/onramps/{onramp_id}", {
      params: Type.Object({ onramp_id: McnOnrampId }),
      query: Type.Object({
        destroy: Type.Optional(Type.Boolean()),
        force: Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: McnDeleteOnrampResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        409: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Delete On-ramp")
      .description("Delete an On-ramp (Closed Beta).")
      .operationId("onramps-delete")
      .tag("On-ramps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.post("/cloud/onramps/{onramp_id}/apply", {
      params: Type.Object({ onramp_id: McnOnrampId }),
      responses: {
        202: McnGoodResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        409: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Apply On-ramp")
      .description("Apply an On-ramp (Closed Beta).")
      .operationId("onramps-apply")
      .tag("On-ramps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.post("/cloud/onramps/{onramp_id}/export", {
      params: Type.Object({ onramp_id: McnOnrampId }),
      responses: {
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        409: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Export as Terraform")
      .description("Export an On-ramp to terraform ready file(s) (Closed Beta).")
      .operationId("onramps-export")
      .tag("On-ramps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.post("/cloud/onramps/{onramp_id}/plan", {
      params: Type.Object({ onramp_id: McnOnrampId }),
      responses: {
        202: McnGoodResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        409: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Plan On-ramp")
      .description("Plan an On-ramp (Closed Beta).")
      .operationId("onramps-plan")
      .tag("On-ramps")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.get("/cloud/providers", {
      query: Type.Object({
        status: Type.Optional(Type.Boolean()),
        order_by: Type.Optional(Type.String()),
        desc: Type.Optional(Type.Boolean()),
        cloudflare: Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: McnReadAccountProvidersResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("List Cloud Integrations")
      .description("List Cloud Integrations (Closed Beta).")
      .operationId("providers-list")
      .tag("Cloud Integrations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])

    g.post("/cloud/providers", {
      headers: Type.Object({
        forwarded: Type.Optional(Type.String()),
      }),
      body: McnCreateProviderRequest,
      responses: {
        201: McnCreateProviderResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        409: McnBadResponse,
        422: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Create Cloud Integration")
      .description("Create a new Cloud Integration (Closed Beta).")
      .operationId("providers-create")
      .tag("Cloud Integrations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.post("/cloud/providers/discover", {
      responses: {
        202: McnGoodResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        409: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Run Discovery for All Integrations")
      .description("Run discovery for all Cloud Integrations in an account (Closed Beta).")
      .operationId("providers-discover-all")
      .tag("Cloud Integrations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.get("/cloud/providers/{provider_id}", {
      params: Type.Object({ provider_id: McnOnrampId }),
      query: Type.Object({
        status: Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: McnCreateProviderResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Read Cloud Integration")
      .description("Read a Cloud Integration (Closed Beta).")
      .operationId("providers-read")
      .tag("Cloud Integrations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])

    g.put("/cloud/providers/{provider_id}", {
      params: Type.Object({ provider_id: McnOnrampId }),
      body: McnUpdateProviderRequest,
      responses: {
        200: McnCreateProviderResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        409: McnBadResponse,
        422: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Update Cloud Integration")
      .description("Update a Cloud Integration (Closed Beta).")
      .operationId("providers-update")
      .tag("Cloud Integrations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.patch("/cloud/providers/{provider_id}", {
      params: Type.Object({ provider_id: McnOnrampId }),
      body: McnUpdateProviderRequest,
      responses: {
        200: McnCreateProviderResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        409: McnBadResponse,
        422: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Patch Cloud Integration")
      .description("Update a Cloud Integration (Closed Beta).")
      .operationId("providers-patch")
      .tag("Cloud Integrations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.delete("/cloud/providers/{provider_id}", {
      params: Type.Object({ provider_id: McnOnrampId }),
      responses: {
        200: McnDeleteProviderResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Delete Cloud Integration")
      .description("Delete a Cloud Integration (Closed Beta).")
      .operationId("providers-delete")
      .tag("Cloud Integrations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])

    g.post("/cloud/providers/{provider_id}/discover", {
      params: Type.Object({ provider_id: McnOnrampId }),
      query: Type.Object({
        v2: Type.Optional(Type.Boolean()),
      }),
      responses: {
        202: McnGoodResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        409: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Run Discovery")
      .description("Run discovery for a Cloud Integration (Closed Beta).")
      .operationId("providers-discover")
      .tag("Cloud Integrations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/cloud/providers/{provider_id}/initial_setup", {
      params: Type.Object({ provider_id: McnOnrampId }),
      responses: {
        200: McnProviderInitialSetupResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Get Cloud Integration Setup Config")
      .description("Get initial configuration to complete Cloud Integration setup (Closed Beta).")
      .operationId("providers-initial-setup")
      .tag("Cloud Integrations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])

    g.get("/cloud/resources", {
      query: Type.Object({
        provider_id: Type.Optional(Type.String()),
        resource_type: Type.Optional(Type.Array(McnResourceType)),
        resource_id: Type.Optional(Type.Array(McnOnrampId)),
        region: Type.Optional(Type.String()),
        resource_group: Type.Optional(Type.String()),
        managed: Type.Optional(Type.Boolean()),
        search: Type.Optional(Type.Array(Type.String())),
        order_by: Type.Optional(Type.String()),
        desc: Type.Optional(Type.Boolean()),
        per_page: Type.Optional(Type.Integer({ minimum: 1 })),
        page: Type.Optional(Type.Integer({ minimum: 1 })),
        cloudflare: Type.Optional(Type.Boolean()),
        v2: Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: McnReadAccountResourcesResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("List Resources")
      .description("List resources in the Resource Catalog (Closed Beta).")
      .operationId("resources-catalog-list")
      .tag("Resources")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])

    g.get("/cloud/resources/export", {
      query: Type.Object({
        provider_id: Type.Optional(Type.String()),
        resource_type: Type.Optional(Type.Array(McnResourceType)),
        resource_id: Type.Optional(Type.Array(McnOnrampId)),
        region: Type.Optional(Type.String()),
        resource_group: Type.Optional(Type.String()),
        search: Type.Optional(Type.Array(Type.String())),
        order_by: Type.Optional(Type.String()),
        desc: Type.Optional(Type.Boolean()),
        v2: Type.Optional(Type.Boolean()),
      }),
      responses: {
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Export Resources")
      .description("Export resources in the Resource Catalog as a JSON file (Closed Beta).")
      .operationId("resources-catalog-export")
      .tag("Resources")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])

    g.post("/cloud/resources/policy-preview", {
      body: McnResourcesCatalogPolicyPreviewRequest,
      responses: {
        200: McnResourcesCatalogPolicyPreviewResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        422: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Preview Rego Query")
      .description("Preview Rego query result against the latest resource catalog (Closed Beta).")
      .operationId("resources-catalog-policy-preview")
      .tag("Resources")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/cloud/resources/{resource_id}", {
      params: Type.Object({ resource_id: McnOnrampId }),
      query: Type.Object({
        v2: Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: McnReadAccountResourceResponse,
        400: McnBadResponse,
        401: McnBadResponse,
        403: McnBadResponse,
        404: McnBadResponse,
        500: McnBadResponse,
      },
    })
      .summary("Read Resource")
      .description("Read an resource from the Resource Catalog (Closed Beta).")
      .operationId("resources-catalog-read")
      .tag("Resources")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])

    g.get("/connectors", {
      responses: {
        200: MconnCustomerConnectorListResponse,
        400: MconnBadResponse,
        401: MconnBadResponse,
        403: MconnBadResponse,
        500: MconnBadResponse,
      },
    })
      .summary("List Connectors")
      .operationId("mconn-connector-list")
      .tag("Magic Connectors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/connectors", {
      body: MconnCustomerConnectorCreateRequest,
      responses: {
        200: MconnCustomerConnectorFetchResponse,
        400: MconnBadResponse,
        401: MconnBadResponse,
        403: MconnBadResponse,
        404: MconnBadResponse,
        500: MconnBadResponse,
      },
    })
      .summary("Add a connector to your account")
      .operationId("mconn-connector-create")
      .tag("Magic Connectors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/connectors/{connector_id}", {
      params: Type.Object({ connector_id: MconnUuid }),
      responses: {
        200: MconnCustomerConnectorFetchResponse,
        400: MconnBadResponse,
        401: MconnBadResponse,
        403: MconnBadResponse,
        404: MconnBadResponse,
        500: MconnBadResponse,
      },
    })
      .summary("Fetch Connector")
      .operationId("mconn-connector-fetch")
      .tag("Magic Connectors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/connectors/{connector_id}", {
      params: Type.Object({ connector_id: MconnUuid }),
      body: MconnCustomerConnectorUpdateRequest,
      responses: {
        200: MconnCustomerConnectorFetchResponse,
        400: MconnBadResponse,
        401: MconnBadResponse,
        403: MconnBadResponse,
        404: MconnBadResponse,
        500: MconnBadResponse,
      },
    })
      .summary("Replace Connector")
      .operationId("mconn-connector-replace")
      .tag("Magic Connectors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.patch("/connectors/{connector_id}", {
      params: Type.Object({ connector_id: MconnUuid }),
      body: MconnCustomerConnectorUpdateRequest,
      responses: {
        200: MconnCustomerConnectorFetchResponse,
        400: MconnBadResponse,
        401: MconnBadResponse,
        403: MconnBadResponse,
        404: MconnBadResponse,
        500: MconnBadResponse,
      },
    })
      .summary("Edit Connector to update specific properties")
      .operationId("mconn-connector-update")
      .tag("Magic Connectors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/connectors/{connector_id}", {
      params: Type.Object({ connector_id: MconnUuid }),
      responses: {
        200: MconnCustomerConnectorFetchResponse,
        400: MconnBadResponse,
        401: MconnBadResponse,
        403: MconnBadResponse,
        404: MconnBadResponse,
        500: MconnBadResponse,
      },
    })
      .summary("Remove a connector from your account")
      .operationId("mconn-connector-delete")
      .tag("Magic Connectors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/connectors/{connector_id}/telemetry/events", {
      params: Type.Object({ connector_id: Type.String() }),
      query: Type.Object({
        from: Type.Number(),
        to: Type.Number(),
        limit: Type.Optional(Type.Number()),
        cursor: Type.Optional(Type.String()),
        k: Type.Optional(Type.String()),
      }),
      responses: {
        200: MconnCustomerEventsGetSuccess,
        400: MconnEnvelope,
        401: MconnEnvelope,
        403: MconnEnvelope,
        429: MconnEnvelope,
        500: MconnEnvelope,
      },
    })
      .summary("List Events")
      .operationId("mconn-connector-telemetry-events-list")
      .tag("Magic Connectors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/connectors/{connector_id}/telemetry/events/latest", {
      params: Type.Object({ connector_id: Type.String() }),
      responses: {
        200: MconnCustomerEventsGetLatestSuccess,
        400: MconnEnvelope,
        401: MconnEnvelope,
        403: MconnEnvelope,
        404: MconnEnvelope,
        429: MconnEnvelope,
        500: MconnEnvelope,
      },
    })
      .summary("Get latest Events")
      .operationId("mconn-connector-telemetry-events-listLatest")
      .tag("Magic Connectors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/connectors/{connector_id}/telemetry/events/{event_t}.{event_n}", {
      params: Type.Object({ connector_id: Type.String(), event_t: Type.Number(), event_n: Type.Number() }),
      responses: {
        200: Type.Unknown() /* unresolved: #/components/schemas/mconn_customer_event_get_success */,
        400: MconnEnvelope,
        401: MconnEnvelope,
        403: MconnEnvelope,
        404: MconnEnvelope,
        429: MconnEnvelope,
        500: MconnEnvelope,
      },
    })
      .summary("Get Event")
      .operationId("mconn-connector-telemetry-events-get")
      .tag("Magic Connectors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/connectors/{connector_id}/telemetry/snapshots", {
      params: Type.Object({ connector_id: Type.String() }),
      query: Type.Object({
        from: Type.Number(),
        to: Type.Number(),
        limit: Type.Optional(Type.Number()),
        cursor: Type.Optional(Type.String()),
      }),
      responses: {
        200: MconnCustomerSnapshotsGetSuccess,
        400: MconnEnvelope,
        401: MconnEnvelope,
        403: MconnEnvelope,
        429: MconnEnvelope,
        500: MconnEnvelope,
      },
    })
      .summary("List Snapshots")
      .operationId("mconn-connector-telemetry-snapshots-list")
      .tag("Magic Connectors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/connectors/{connector_id}/telemetry/snapshots/latest", {
      params: Type.Object({ connector_id: Type.String() }),
      responses: {
        200: MconnCustomerSnapshotsGetLatestSuccess,
        400: MconnEnvelope,
        401: MconnEnvelope,
        403: MconnEnvelope,
        404: MconnEnvelope,
        429: MconnEnvelope,
        500: MconnEnvelope,
      },
    })
      .summary("Get latest Snapshots")
      .operationId("mconn-connector-telemetry-snapshots-listLatest")
      .tag("Magic Connectors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/connectors/{connector_id}/telemetry/snapshots/{snapshot_t}", {
      params: Type.Object({ connector_id: Type.String(), snapshot_t: Type.Number() }),
      responses: {
        200: Type.Unknown() /* unresolved: #/components/schemas/mconn_customer_snapshot_get_success */,
        400: MconnEnvelope,
        401: MconnEnvelope,
        403: MconnEnvelope,
        404: MconnEnvelope,
        429: MconnEnvelope,
        500: MconnEnvelope,
      },
    })
      .summary("Get Snapshot")
      .operationId("mconn-connector-telemetry-snapshots-get")
      .tag("Magic Connectors")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic WAN Read"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/gre_tunnels", {
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: MagicTunnelsCollectionResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("List GRE tunnels")
      .description("Lists GRE tunnels associated with an account.")
      .operationId("magic-gre-tunnels-list-gre-tunnels")
      .tag("Magic GRE tunnels")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/gre_tunnels", {
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      body: MagicCreateGreTunnelRequest,
      responses: {
        200: MagicCreateGreTunnelResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Create a GRE tunnel")
      .description(
        "Creates a new GRE tunnel. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.",
      )
      .operationId("magic-gre-tunnels-create-gre-tunnels")
      .tag("Magic GRE tunnels")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/gre_tunnels", {
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      body: Type.Unknown(),
      responses: {
        200: MagicModifiedTunnelsCollectionResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Update multiple GRE tunnels")
      .description(
        "Updates multiple GRE tunnels. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.",
      )
      .operationId("magic-gre-tunnels-update-multiple-gre-tunnels")
      .tag("Magic GRE tunnels")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/gre_tunnels/{gre_tunnel_id}", {
      params: Type.Object({ gre_tunnel_id: MagicIdentifier }),
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: MagicTunnelSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("List GRE Tunnel Details")
      .description("Lists informtion for a specific GRE tunnel.")
      .operationId("magic-gre-tunnels-list-gre-tunnel-details")
      .tag("Magic GRE tunnels")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/gre_tunnels/{gre_tunnel_id}", {
      params: Type.Object({ gre_tunnel_id: MagicIdentifier }),
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      body: MagicGreTunnelUpdateRequest,
      responses: {
        200: MagicTunnelModifiedResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Update GRE Tunnel")
      .description(
        "Updates a specific GRE tunnel. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.",
      )
      .operationId("magic-gre-tunnels-update-gre-tunnel")
      .tag("Magic GRE tunnels")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/gre_tunnels/{gre_tunnel_id}", {
      params: Type.Object({ gre_tunnel_id: MagicIdentifier }),
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: MagicTunnelDeletedResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Delete GRE Tunnel")
      .description(
        "Disables and removes a specific static GRE tunnel. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.",
      )
      .operationId("magic-gre-tunnels-delete-gre-tunnel")
      .tag("Magic GRE tunnels")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/ipsec_tunnels", {
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: MagicSchemasTunnelsCollectionResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("List IPsec tunnels")
      .description("Lists IPsec tunnels associated with an account.")
      .operationId("magic-ipsec-tunnels-list-ipsec-tunnels")
      .tag("Magic IPsec tunnels")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/ipsec_tunnels", {
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      body: MagicIpsecTunnelAddRequest,
      responses: {
        200: MagicSchemasCreateIpsecTunnelResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Create an IPsec tunnel")
      .description(
        "Creates a new IPsec tunnel associated with an account. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.",
      )
      .operationId("magic-ipsec-tunnels-create-ipsec-tunnels")
      .tag("Magic IPsec tunnels")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/ipsec_tunnels", {
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      body: Type.Unknown(),
      responses: {
        200: MagicSchemasModifiedTunnelsCollectionResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Update multiple IPsec tunnels")
      .description(
        "Update multiple IPsec tunnels associated with an account. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.",
      )
      .operationId("magic-ipsec-tunnels-update-multiple-ipsec-tunnels")
      .tag("Magic IPsec tunnels")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/ipsec_tunnels/{ipsec_tunnel_id}", {
      params: Type.Object({ ipsec_tunnel_id: MagicIdentifier }),
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: MagicSchemasTunnelSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("List IPsec tunnel details")
      .description("Lists details for a specific IPsec tunnel.")
      .operationId("magic-ipsec-tunnels-list-ipsec-tunnel-details")
      .tag("Magic IPsec tunnels")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/ipsec_tunnels/{ipsec_tunnel_id}", {
      params: Type.Object({ ipsec_tunnel_id: MagicIdentifier }),
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      body: MagicIpsecTunnelAddSingleRequest,
      responses: {
        200: MagicSchemasTunnelModifiedResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Update IPsec Tunnel")
      .description(
        "Updates a specific IPsec tunnel associated with an account. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.",
      )
      .operationId("magic-ipsec-tunnels-update-ipsec-tunnel")
      .tag("Magic IPsec tunnels")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/ipsec_tunnels/{ipsec_tunnel_id}", {
      params: Type.Object({ ipsec_tunnel_id: MagicIdentifier }),
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: MagicSchemasTunnelDeletedResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Delete IPsec Tunnel")
      .description(
        "Disables and removes a specific static IPsec Tunnel associated with an account. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.",
      )
      .operationId("magic-ipsec-tunnels-delete-ipsec-tunnel")
      .tag("Magic IPsec tunnels")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/ipsec_tunnels/{ipsec_tunnel_id}/psk_generate", {
      params: Type.Object({ ipsec_tunnel_id: MagicIdentifier }),
      responses: {
        200: MagicPskGenerationResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Generate Pre Shared Key (PSK) for IPsec tunnels")
      .description(
        "Generates a Pre Shared Key for a specific IPsec tunnel used in the IKE session. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes. After a PSK is generated, the PSK is immediately persisted to Cloudflare's edge and cannot be retrieved later. Note the PSK in a safe place.",
      )
      .operationId("magic-ipsec-tunnels-generate-pre-shared-key-(-psk)-for-ipsec-tunnels")
      .tag("Magic IPsec tunnels")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/routes", {
      responses: {
        200: MagicRoutesCollectionResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("List Routes")
      .description("List all Magic static routes.")
      .operationId("magic-static-routes-list-routes")
      .tag("Magic Static Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/routes", {
      body: MagicCreateRouteRequest,
      responses: {
        200: MagicCreateRouteResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Create a Route")
      .description(
        "Creates a new Magic static route. Use `?validate_only=true` as an optional query parameter to run validation only without persisting changes.",
      )
      .operationId("magic-static-routes-create-routes")
      .tag("Magic Static Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/routes", {
      body: MagicRouteUpdateManyRequest,
      responses: {
        200: MagicMultipleRouteModifiedResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Update Many Routes")
      .description(
        "Update multiple Magic static routes. Use `?validate_only=true` as an optional query parameter to run validation only without persisting changes. Only fields for a route that need to be changed need be provided.",
      )
      .operationId("magic-static-routes-update-many-routes")
      .tag("Magic Static Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/routes", {
      responses: {
        200: MagicMultipleRouteDeleteResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Delete Many Routes")
      .description("Delete multiple Magic static routes.")
      .operationId("magic-static-routes-delete-many-routes")
      .tag("Magic Static Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/routes/{route_id}", {
      params: Type.Object({ route_id: MagicIdentifier }),
      responses: {
        200: MagicRouteSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Route Details")
      .description("Get a specific Magic static route.")
      .operationId("magic-static-routes-route-details")
      .tag("Magic Static Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:read"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/routes/{route_id}", {
      params: Type.Object({ route_id: MagicIdentifier }),
      body: MagicRouteUpdateRequest,
      responses: {
        200: MagicRouteModifiedResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Update Route")
      .description(
        "Update a specific Magic static route. Use `?validate_only=true` as an optional query parameter to run validation only without persisting changes.",
      )
      .operationId("magic-static-routes-update-route")
      .tag("Magic Static Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/routes/{route_id}", {
      params: Type.Object({ route_id: MagicIdentifier }),
      responses: {
        200: MagicRouteDeletedResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      },
    })
      .summary("Delete Route")
      .description("Disable and remove a specific Magic static route.")
      .operationId("magic-static-routes-delete-route")
      .tag("Magic Static Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/sites", {
      query: Type.Object({
        connectorid: Type.Optional(MagicIdentifier),
      }),
      responses: {
        200: MagicSitesCollectionResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("List Sites")
      .description(
        "Lists Sites associated with an account. Use connectorid query param to return sites where connectorid matches either site.ConnectorID or site.SecondaryConnectorID.",
      )
      .operationId("magic-sites-list-sites")
      .tag("Magic Sites")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/sites", {
      body: MagicSitesAddSingleRequest,
      responses: {
        200: MagicSiteSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Create a new Site")
      .description("Creates a new Site")
      .operationId("magic-sites-create-site")
      .tag("Magic Sites")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/sites/{site_id}", {
      params: Type.Object({ site_id: MagicIdentifier }),
      headers: Type.Object({
        "x-magic-new-hc-target": Type.Optional(Type.Boolean()),
      }),
      responses: {
        200: MagicSiteSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Site Details")
      .description("Get a specific Site.")
      .operationId("magic-sites-site-details")
      .tag("Magic Sites")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:read"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/sites/{site_id}", {
      params: Type.Object({ site_id: MagicIdentifier }),
      body: MagicSiteUpdateRequest,
      responses: {
        200: MagicSiteSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Update Site")
      .description("Update a specific Site.")
      .operationId("magic-sites-update-site")
      .tag("Magic Sites")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.patch("/sites/{site_id}", {
      params: Type.Object({ site_id: MagicIdentifier }),
      body: MagicSiteUpdateRequest,
      responses: {
        200: MagicSiteSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Patch Site")
      .description("Patch a specific Site.")
      .operationId("magic-sites-patch-site")
      .tag("Magic Sites")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/sites/{site_id}", {
      params: Type.Object({ site_id: MagicIdentifier }),
      responses: {
        200: MagicSiteSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Delete Site")
      .description("Remove a specific Site.")
      .operationId("magic-sites-delete-site")
      .tag("Magic Sites")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/sites/{site_id}/acls", {
      params: Type.Object({ site_id: MagicIdentifier }),
      responses: {
        200: MagicAclsCollectionResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("List Site ACLs")
      .description("Lists Site ACLs associated with an account.")
      .operationId("magic-site-acls-list-acls")
      .tag("Magic Site ACLs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/sites/{site_id}/acls", {
      params: Type.Object({ site_id: MagicIdentifier }),
      body: MagicAclsAddSingleRequest,
      responses: {
        200: MagicAclSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Create a new Site ACL")
      .description("Creates a new Site ACL.")
      .operationId("magic-site-acls-create-acl")
      .tag("Magic Site ACLs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/sites/{site_id}/acls/{acl_id}", {
      params: Type.Object({ site_id: MagicIdentifier, acl_id: MagicIdentifier }),
      responses: {
        200: MagicAclSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Site ACL Details")
      .description("Get a specific Site ACL.")
      .operationId("magic-site-acls-acl-details")
      .tag("Magic Site ACLs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:read"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/sites/{site_id}/acls/{acl_id}", {
      params: Type.Object({ site_id: MagicIdentifier, acl_id: MagicIdentifier }),
      body: MagicAclUpdateRequest,
      responses: {
        200: MagicAclSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Update Site ACL")
      .description("Update a specific Site ACL.")
      .operationId("magic-site-acls-update-acl")
      .tag("Magic Site ACLs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.patch("/sites/{site_id}/acls/{acl_id}", {
      params: Type.Object({ site_id: MagicIdentifier, acl_id: MagicIdentifier }),
      body: MagicAclUpdateRequest,
      responses: {
        200: MagicAclSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Patch Site ACL")
      .description("Patch a specific Site ACL.")
      .operationId("magic-site-acls-patch-acl")
      .tag("Magic Site ACLs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/sites/{site_id}/acls/{acl_id}", {
      params: Type.Object({ site_id: MagicIdentifier, acl_id: MagicIdentifier }),
      responses: {
        200: MagicAclSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Delete Site ACL")
      .description("Remove a specific Site ACL.")
      .operationId("magic-site-acls-delete-acl")
      .tag("Magic Site ACLs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/sites/{site_id}/app_configs", {
      params: Type.Object({ site_id: MagicIdentifier }),
      responses: {
        200: MagicAppConfigsCollectionResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("List App Configs")
      .description("Lists App Configs associated with a site.")
      .operationId("magic-site-app-configs-list-app-configs")
      .tag("Magic Site App Configs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/sites/{site_id}/app_configs", {
      params: Type.Object({ site_id: MagicIdentifier }),
      body: MagicAppConfigAddSingleRequest,
      responses: {
        201: MagicAppConfigSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Create a new App Config")
      .description("Creates a new App Config for a site")
      .operationId("magic-site-app-configs-add-app-config")
      .tag("Magic Site App Configs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/sites/{site_id}/app_configs/{app_config_id}", {
      params: Type.Object({ site_id: MagicIdentifier, app_config_id: MagicIdentifier }),
      body: MagicAppConfigUpdateRequest,
      responses: {
        200: MagicAppConfigSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Update an App Config")
      .description("Updates an App Config for a site")
      .operationId("magic-site-app-configs-update-app-config")
      .tag("Magic Site App Configs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.patch("/sites/{site_id}/app_configs/{app_config_id}", {
      params: Type.Object({ site_id: MagicIdentifier, app_config_id: MagicIdentifier }),
      body: MagicAppConfigUpdateRequest,
      responses: {
        200: MagicAppConfigSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Update an App Config")
      .description("Updates an App Config for a site")
      .operationId("magic-site-app-configs-patch-app-config")
      .tag("Magic Site App Configs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/sites/{site_id}/app_configs/{app_config_id}", {
      params: Type.Object({ site_id: MagicIdentifier, app_config_id: MagicIdentifier }),
      responses: {
        200: MagicAppConfigSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Delete App Config")
      .description("Deletes specific App Config associated with a site.")
      .operationId("magic-site-app-configs-delete-app-config")
      .tag("Magic Site App Configs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/sites/{site_id}/lans", {
      params: Type.Object({ site_id: MagicIdentifier }),
      responses: {
        200: MagicLansCollectionResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("List Site LANs")
      .description("Lists Site LANs associated with an account.")
      .operationId("magic-site-lans-list-lans")
      .tag("Magic Site LANs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/sites/{site_id}/lans", {
      params: Type.Object({ site_id: MagicIdentifier }),
      body: MagicLansAddSingleRequest,
      responses: {
        200: MagicLansCollectionResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Create a new Site LAN")
      .description(
        "Creates a new Site LAN. If the site is in high availability mode, static_addressing is required along with secondary and virtual address.",
      )
      .operationId("magic-site-lans-create-lan")
      .tag("Magic Site LANs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/sites/{site_id}/lans/{lan_id}", {
      params: Type.Object({ site_id: MagicIdentifier, lan_id: MagicIdentifier }),
      responses: {
        200: MagicLanSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Site LAN Details")
      .description("Get a specific Site LAN.")
      .operationId("magic-site-lans-lan-details")
      .tag("Magic Site LANs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:read"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/sites/{site_id}/lans/{lan_id}", {
      params: Type.Object({ site_id: MagicIdentifier, lan_id: MagicIdentifier }),
      body: MagicLanUpdateRequest,
      responses: {
        200: MagicLanSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Update Site LAN")
      .description("Update a specific Site LAN.")
      .operationId("magic-site-lans-update-lan")
      .tag("Magic Site LANs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.patch("/sites/{site_id}/lans/{lan_id}", {
      params: Type.Object({ site_id: MagicIdentifier, lan_id: MagicIdentifier }),
      body: MagicLanUpdateRequest,
      responses: {
        200: MagicLanSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Patch Site LAN")
      .description("Patch a specific Site LAN.")
      .operationId("magic-site-lans-patch-lan")
      .tag("Magic Site LANs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/sites/{site_id}/lans/{lan_id}", {
      params: Type.Object({ site_id: MagicIdentifier, lan_id: MagicIdentifier }),
      responses: {
        200: MagicLanSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Delete Site LAN")
      .description("Remove a specific Site LAN.")
      .operationId("magic-site-lans-delete-lan")
      .tag("Magic Site LANs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/sites/{site_id}/wans", {
      params: Type.Object({ site_id: MagicIdentifier }),
      responses: {
        200: MagicWansCollectionResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("List Site WANs")
      .description("Lists Site WANs associated with an account.")
      .operationId("magic-site-wans-list-wans")
      .tag("Magic Site WANs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/sites/{site_id}/wans", {
      params: Type.Object({ site_id: MagicIdentifier }),
      body: MagicWansAddSingleRequest,
      responses: {
        200: MagicWansCollectionResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Create a new Site WAN")
      .description("Creates a new Site WAN.")
      .operationId("magic-site-wans-create-wan")
      .tag("Magic Site WANs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/sites/{site_id}/wans/{wan_id}", {
      params: Type.Object({ site_id: MagicIdentifier, wan_id: MagicIdentifier }),
      responses: {
        200: MagicWanSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Site WAN Details")
      .description("Get a specific Site WAN.")
      .operationId("magic-site-wans-wan-details")
      .tag("Magic Site WANs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic WAN Write",
        "Magic WAN Read",
        "Magic Transit Read",
        "Magic Transit Write",
      ])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:read"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/sites/{site_id}/wans/{wan_id}", {
      params: Type.Object({ site_id: MagicIdentifier, wan_id: MagicIdentifier }),
      body: MagicWanUpdateRequest,
      responses: {
        200: MagicWanSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Update Site WAN")
      .description("Update a specific Site WAN.")
      .operationId("magic-site-wans-update-wan")
      .tag("Magic Site WANs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.patch("/sites/{site_id}/wans/{wan_id}", {
      params: Type.Object({ site_id: MagicIdentifier, wan_id: MagicIdentifier }),
      body: MagicWanUpdateRequest,
      responses: {
        200: MagicWanSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Patch Site WAN")
      .description("Patch a specific Site WAN.")
      .operationId("magic-site-wans-patch-wan")
      .tag("Magic Site WANs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/sites/{site_id}/wans/{wan_id}", {
      params: Type.Object({ site_id: MagicIdentifier, wan_id: MagicIdentifier }),
      responses: {
        200: MagicWanSingleResponse,
        "4XX": MagicApiResponseCommonFailure,
      },
    })
      .summary("Delete Site WAN")
      .description("Remove a specific Site WAN.")
      .operationId("magic-site-wans-delete-wan")
      .tag("Magic Site WANs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic WAN Write", "Magic Transit Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#organization:edit"] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })
  })
}

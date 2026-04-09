import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  D1Messages,
  IntelIdentifier,
  LoadBalancerPool,
  LoadBalancingCheckRegions,
  LoadBalancingEnabled,
  LoadBalancingHealthDetails,
  LoadBalancingIdResponse,
  LoadBalancingIdentifier,
  LoadBalancingLatitude,
  LoadBalancingLoadShedding,
  LoadBalancingLongitude,
  LoadBalancingMinimumOrigins,
  LoadBalancingMonitorEditable,
  LoadBalancingMonitorGroupId,
  LoadBalancingMonitorId,
  LoadBalancingMonitorReferencesResponse,
  LoadBalancingMonitorResponseCollection,
  LoadBalancingMonitorResponseSingle,
  LoadBalancingName,
  LoadBalancingNetworks,
  LoadBalancingNotificationEmail,
  LoadBalancingNotificationFilter,
  LoadBalancingOriginSteering,
  LoadBalancingOrigins,
  LoadBalancingPoolsReferencesResponse,
  LoadBalancingPreviewResponse,
  LoadBalancingPreviewResultResponse,
  LoadBalancingResultInfo,
  LoadBalancingSchemasDescription,
  LoadBalancingSchemasDisabledAt,
  LoadBalancingSchemasIdResponse,
  LoadBalancingSchemasIdentifier,
  LoadBalancingSchemasResponseCollection,
  LoadBalancingSchemasSingleResponse,
  UnnamedSchemaRef025497b7e63379c31929636b5186e45c,
  WaitingroomWaitingRoomId,
} from "../shared/schemas"
import {
  LoadBalancingAdaptiveRouting,
  LoadBalancingComponentsSchemasDescription,
  LoadBalancingComponentsSchemasEnabled,
  LoadBalancingComponentsSchemasIdResponse,
  LoadBalancingComponentsSchemasName,
  LoadBalancingComponentsSchemasSingleResponse,
  LoadBalancingCountryPools,
  LoadBalancingDefaultPools,
  LoadBalancingFallbackPool,
  LoadBalancingLoadBalancerComponentsSchemasResponseCollection,
  LoadBalancingLoadBalancerComponentsSchemasSingleResponse,
  LoadBalancingLocationStrategy,
  LoadBalancingMonitorGroup,
  LoadBalancingMonitorGroupResponseCollection,
  LoadBalancingMonitorGroupSingleResponse,
  LoadBalancingPopPools,
  LoadBalancingProxied,
  LoadBalancingRandomSteering,
  LoadBalancingRegionCode,
  LoadBalancingRegionComponentsSchemasResponseCollection,
  LoadBalancingRegionPools,
  LoadBalancingRules,
  LoadBalancingSchemasPreviewId,
  LoadBalancingSearch,
  LoadBalancingSessionAffinity,
  LoadBalancingSessionAffinityAttributes,
  LoadBalancingSessionAffinityTtl,
  LoadBalancingSteeringPolicy,
  LoadBalancingSubdivisionCodeA2,
  LoadBalancingTtl,
} from "./schemas"

export function registerLoadBalancers(api: Api) {
  api
    .get("/accounts/{account_id}/load_balancers/monitor_groups", {
      params: Type.Object({ account_id: IntelIdentifier }),
      responses: {
        200: LoadBalancingMonitorGroupResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
          result_info: Type.Optional(LoadBalancingResultInfo),
        }),
      },
    })
    .summary("List Monitor Groups")
    .description("List configured monitor groups.")
    .operationId("account-load-balancer-monitor-groups-list-monitor-groups")
    .tag("Account Load Balancer Monitor Groups")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .post("/accounts/{account_id}/load_balancers/monitor_groups", {
      params: Type.Object({ account_id: IntelIdentifier }),
      body: LoadBalancingMonitorGroup,
      responses: {
        200: LoadBalancingMonitorGroupSingleResponse,
        412: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Create Monitor Group")
    .description("Create a new monitor group.")
    .operationId("account-load-balancer-monitor-groups-create-monitor-group")
    .tag("Account Load Balancer Monitor Groups")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .get("/accounts/{account_id}/load_balancers/monitor_groups/{monitor_group_id}", {
      params: Type.Object({ monitor_group_id: LoadBalancingSchemasIdentifier, account_id: IntelIdentifier }),
      responses: {
        200: LoadBalancingMonitorGroupSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Monitor Group Details")
    .description("Fetch a single configured monitor group.")
    .operationId("account-load-balancer-monitor-groups-monitor-group-details")
    .tag("Account Load Balancer Monitor Groups")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .put("/accounts/{account_id}/load_balancers/monitor_groups/{monitor_group_id}", {
      params: Type.Object({ monitor_group_id: LoadBalancingSchemasIdentifier, account_id: IntelIdentifier }),
      body: LoadBalancingMonitorGroup,
      responses: {
        200: LoadBalancingMonitorGroupSingleResponse,
        412: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Update Monitor Group")
    .description("Modify a configured monitor group.")
    .operationId("account-load-balancer-monitor-groups-update-monitor-group")
    .tag("Account Load Balancer Monitor Groups")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .patch("/accounts/{account_id}/load_balancers/monitor_groups/{monitor_group_id}", {
      params: Type.Object({ monitor_group_id: LoadBalancingSchemasIdentifier, account_id: IntelIdentifier }),
      body: LoadBalancingMonitorGroup,
      responses: {
        200: LoadBalancingMonitorGroupSingleResponse,
        412: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Patch Monitor Group")
    .description("Apply changes to an existing monitor group, overwriting the supplied properties.")
    .operationId("account-load-balancer-monitor-groups-patch-monitor-group")
    .tag("Account Load Balancer Monitor Groups")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .delete("/accounts/{account_id}/load_balancers/monitor_groups/{monitor_group_id}", {
      params: Type.Object({ monitor_group_id: LoadBalancingSchemasIdentifier, account_id: IntelIdentifier }),
      responses: {
        200: LoadBalancingMonitorGroupSingleResponse,
        412: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Delete Monitor Group")
    .description("Delete a configured monitor group.")
    .operationId("account-load-balancer-monitor-groups-delete-monitor-group")
    .tag("Account Load Balancer Monitor Groups")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .get("/accounts/{account_id}/load_balancers/monitors", {
      params: Type.Object({ account_id: IntelIdentifier }),
      responses: {
        200: LoadBalancingMonitorResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(LoadBalancingResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("List Monitors")
    .description("List configured monitors for an account.")
    .operationId("account-load-balancer-monitors-list-monitors")
    .tag("Account Load Balancer Monitors")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Load Balancing: Monitors and Pools Write",
      "Load Balancing: Monitors and Pools Read",
    ])

  api
    .post("/accounts/{account_id}/load_balancers/monitors", {
      params: Type.Object({ account_id: IntelIdentifier }),
      body: LoadBalancingMonitorEditable,
      responses: {
        200: LoadBalancingMonitorResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Create Monitor")
    .description("Create a configured monitor.")
    .operationId("account-load-balancer-monitors-create-monitor")
    .tag("Account Load Balancer Monitors")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

  api
    .get("/accounts/{account_id}/load_balancers/monitors/{monitor_id}", {
      params: Type.Object({ monitor_id: LoadBalancingIdentifier, account_id: IntelIdentifier }),
      responses: {
        200: LoadBalancingMonitorResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Monitor Details")
    .description("List a single configured monitor for an account.")
    .operationId("account-load-balancer-monitors-monitor-details")
    .tag("Account Load Balancer Monitors")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Load Balancing: Monitors and Pools Write",
      "Load Balancing: Monitors and Pools Read",
    ])

  api
    .put("/accounts/{account_id}/load_balancers/monitors/{monitor_id}", {
      params: Type.Object({ monitor_id: LoadBalancingIdentifier, account_id: IntelIdentifier }),
      body: LoadBalancingMonitorEditable,
      responses: {
        200: LoadBalancingMonitorResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Update Monitor")
    .description("Modify a configured monitor.")
    .operationId("account-load-balancer-monitors-update-monitor")
    .tag("Account Load Balancer Monitors")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

  api
    .patch("/accounts/{account_id}/load_balancers/monitors/{monitor_id}", {
      params: Type.Object({ monitor_id: LoadBalancingIdentifier, account_id: IntelIdentifier }),
      body: LoadBalancingMonitorEditable,
      responses: {
        200: LoadBalancingMonitorResponseSingle,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Patch Monitor")
    .description("Apply changes to an existing monitor, overwriting the supplied properties.")
    .operationId("account-load-balancer-monitors-patch-monitor")
    .tag("Account Load Balancer Monitors")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

  api
    .delete("/accounts/{account_id}/load_balancers/monitors/{monitor_id}", {
      params: Type.Object({ monitor_id: LoadBalancingIdentifier, account_id: IntelIdentifier }),
      responses: {
        200: LoadBalancingIdResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Delete Monitor")
    .description("Delete a configured monitor.")
    .operationId("account-load-balancer-monitors-delete-monitor")
    .tag("Account Load Balancer Monitors")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

  api
    .post("/accounts/{account_id}/load_balancers/monitors/{monitor_id}/preview", {
      params: Type.Object({ monitor_id: LoadBalancingIdentifier, account_id: IntelIdentifier }),
      body: LoadBalancingMonitorEditable,
      responses: {
        200: LoadBalancingPreviewResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: UnnamedSchemaRef025497b7e63379c31929636b5186e45c,
        }),
      },
    })
    .summary("Preview Monitor")
    .description(
      "Preview pools using the specified monitor with provided monitor details. The returned preview_id can be used in the preview endpoint to retrieve the results.",
    )
    .operationId("account-load-balancer-monitors-preview-monitor")
    .tag("Account Load Balancer Monitors")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .get("/accounts/{account_id}/load_balancers/monitors/{monitor_id}/references", {
      params: Type.Object({ monitor_id: LoadBalancingIdentifier, account_id: IntelIdentifier }),
      responses: {
        200: LoadBalancingMonitorReferencesResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()], { description: "List of resources that reference a given monitor." }),
        }),
      },
    })
    .summary("List Monitor References")
    .description("Get the list of resources that reference the provided monitor.")
    .operationId("account-load-balancer-monitors-list-monitor-references")
    .tag("Account Load Balancer Monitors")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Load Balancing: Monitors and Pools Write",
      "Load Balancing: Monitors and Pools Read",
    ])

  api
    .get("/accounts/{account_id}/load_balancers/pools", {
      params: Type.Object({ account_id: IntelIdentifier }),
      query: Type.Object({
        monitor: Type.Optional(
          Type.String({
            description: "The ID of the Monitor to use for checking the health of origins within this pool.",
          }),
        ),
      }),
      responses: {
        200: LoadBalancingSchemasResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(LoadBalancingResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("List Pools")
    .description("List configured pools.")
    .operationId("account-load-balancer-pools-list-pools")
    .tag("Account Load Balancer Pools")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Load Balancing: Monitors and Pools Write",
      "Load Balancing: Monitors and Pools Read",
    ])

  api
    .post("/accounts/{account_id}/load_balancers/pools", {
      params: Type.Object({ account_id: IntelIdentifier }),
      body: Type.Object({
        description: Type.Optional(LoadBalancingSchemasDescription),
        enabled: Type.Optional(LoadBalancingEnabled),
        latitude: Type.Optional(LoadBalancingLatitude),
        load_shedding: Type.Optional(LoadBalancingLoadShedding),
        longitude: Type.Optional(LoadBalancingLongitude),
        minimum_origins: Type.Optional(LoadBalancingMinimumOrigins),
        monitor: Type.Optional(LoadBalancingMonitorId),
        monitor_group: Type.Optional(LoadBalancingMonitorGroupId),
        name: LoadBalancingName,
        notification_email: Type.Optional(LoadBalancingNotificationEmail),
        notification_filter: Type.Optional(LoadBalancingNotificationFilter),
        origin_steering: Type.Optional(LoadBalancingOriginSteering),
        origins: LoadBalancingOrigins,
      }),
      responses: {
        200: LoadBalancingSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: LoadBalancerPool,
        }),
      },
    })
    .summary("Create Pool")
    .description("Create a new pool.")
    .operationId("account-load-balancer-pools-create-pool")
    .tag("Account Load Balancer Pools")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

  api
    .patch("/accounts/{account_id}/load_balancers/pools", {
      params: Type.Object({ account_id: IntelIdentifier }),
      body: Type.String(),
      responses: {
        200: LoadBalancingSchemasResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(LoadBalancingResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Patch Pools")
    .description(
      "Apply changes to a number of existing pools, overwriting the supplied properties. Pools are ordered by ascending `name`. Returns the list of affected pools. Supports the standard pagination query parameters, either `limit`/`offset` or `per_page`/`page`.",
    )
    .operationId("account-load-balancer-pools-patch-pools")
    .tag("Account Load Balancer Pools")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

  api
    .get("/accounts/{account_id}/load_balancers/pools/{pool_id}", {
      params: Type.Object({ pool_id: LoadBalancingSchemasIdentifier, account_id: IntelIdentifier }),
      responses: {
        200: LoadBalancingSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: LoadBalancerPool,
        }),
      },
    })
    .summary("Pool Details")
    .description("Fetch a single configured pool.")
    .operationId("account-load-balancer-pools-pool-details")
    .tag("Account Load Balancer Pools")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Load Balancing: Monitors and Pools Write",
      "Load Balancing: Monitors and Pools Read",
    ])

  api
    .put("/accounts/{account_id}/load_balancers/pools/{pool_id}", {
      params: Type.Object({ pool_id: LoadBalancingSchemasIdentifier, account_id: IntelIdentifier }),
      body: Type.Object({
        check_regions: Type.Optional(LoadBalancingCheckRegions),
        description: Type.Optional(LoadBalancingSchemasDescription),
        disabled_at: Type.Optional(LoadBalancingSchemasDisabledAt),
        enabled: Type.Optional(LoadBalancingEnabled),
        latitude: Type.Optional(LoadBalancingLatitude),
        load_shedding: Type.Optional(LoadBalancingLoadShedding),
        longitude: Type.Optional(LoadBalancingLongitude),
        minimum_origins: Type.Optional(LoadBalancingMinimumOrigins),
        monitor: Type.Optional(LoadBalancingMonitorId),
        monitor_group: Type.Optional(LoadBalancingMonitorGroupId),
        name: LoadBalancingName,
        notification_email: Type.Optional(LoadBalancingNotificationEmail),
        notification_filter: Type.Optional(LoadBalancingNotificationFilter),
        origin_steering: Type.Optional(LoadBalancingOriginSteering),
        origins: LoadBalancingOrigins,
      }),
      responses: {
        200: LoadBalancingSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: LoadBalancerPool,
        }),
      },
    })
    .summary("Update Pool")
    .description("Modify a configured pool.")
    .operationId("account-load-balancer-pools-update-pool")
    .tag("Account Load Balancer Pools")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

  api
    .patch("/accounts/{account_id}/load_balancers/pools/{pool_id}", {
      params: Type.Object({ pool_id: LoadBalancingSchemasIdentifier, account_id: IntelIdentifier }),
      body: Type.Object({
        check_regions: Type.Optional(LoadBalancingCheckRegions),
        description: Type.Optional(LoadBalancingSchemasDescription),
        disabled_at: Type.Optional(LoadBalancingSchemasDisabledAt),
        enabled: Type.Optional(LoadBalancingEnabled),
        latitude: Type.Optional(LoadBalancingLatitude),
        load_shedding: Type.Optional(LoadBalancingLoadShedding),
        longitude: Type.Optional(LoadBalancingLongitude),
        minimum_origins: Type.Optional(LoadBalancingMinimumOrigins),
        monitor: Type.Optional(LoadBalancingMonitorId),
        monitor_group: Type.Optional(LoadBalancingMonitorGroupId),
        name: Type.Optional(LoadBalancingName),
        notification_email: Type.Optional(LoadBalancingNotificationEmail),
        notification_filter: Type.Optional(LoadBalancingNotificationFilter),
        origin_steering: Type.Optional(LoadBalancingOriginSteering),
        origins: Type.Optional(LoadBalancingOrigins),
      }),
      responses: {
        200: LoadBalancingSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: LoadBalancerPool,
        }),
      },
    })
    .summary("Patch Pool")
    .description("Apply changes to an existing pool, overwriting the supplied properties.")
    .operationId("account-load-balancer-pools-patch-pool")
    .tag("Account Load Balancer Pools")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

  api
    .delete("/accounts/{account_id}/load_balancers/pools/{pool_id}", {
      params: Type.Object({ pool_id: LoadBalancingSchemasIdentifier, account_id: IntelIdentifier }),
      responses: {
        200: LoadBalancingSchemasIdResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Delete Pool")
    .description("Delete a configured pool.")
    .operationId("account-load-balancer-pools-delete-pool")
    .tag("Account Load Balancer Pools")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Load Balancing: Monitors and Pools Write"])

  api
    .get("/accounts/{account_id}/load_balancers/pools/{pool_id}/health", {
      params: Type.Object({ pool_id: LoadBalancingSchemasIdentifier, account_id: IntelIdentifier }),
      responses: {
        200: LoadBalancingHealthDetails,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()], {
            description: "A list of regions from which to run health checks. Null means every Cloudflare data center.",
          }),
        }),
      },
    })
    .summary("Pool Health Details")
    .description("Fetch the latest pool health status for a single pool.")
    .operationId("account-load-balancer-pools-pool-health-details")
    .tag("Account Load Balancer Pools")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Load Balancing: Monitors and Pools Write",
      "Load Balancing: Monitors and Pools Read",
    ])

  api
    .post("/accounts/{account_id}/load_balancers/pools/{pool_id}/preview", {
      params: Type.Object({ pool_id: LoadBalancingSchemasIdentifier, account_id: IntelIdentifier }),
      body: LoadBalancingMonitorEditable,
      responses: {
        200: LoadBalancingPreviewResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: UnnamedSchemaRef025497b7e63379c31929636b5186e45c,
        }),
      },
    })
    .summary("Preview Pool")
    .description(
      "Preview pool health using provided monitor details. The returned preview_id can be used in the preview endpoint to retrieve the results.",
    )
    .operationId("account-load-balancer-pools-preview-pool")
    .tag("Account Load Balancer Pools")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })

  api
    .get("/accounts/{account_id}/load_balancers/pools/{pool_id}/references", {
      params: Type.Object({ pool_id: LoadBalancingSchemasIdentifier, account_id: IntelIdentifier }),
      responses: {
        200: LoadBalancingPoolsReferencesResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()], { description: "List of resources that reference a given pool." }),
        }),
      },
    })
    .summary("List Pool References")
    .description("Get the list of resources that reference the provided pool.")
    .operationId("account-load-balancer-pools-list-pool-references")
    .tag("Account Load Balancer Pools")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Load Balancing: Monitors and Pools Write",
      "Load Balancing: Monitors and Pools Read",
    ])

  api
    .get("/accounts/{account_id}/load_balancers/preview/{preview_id}", {
      params: Type.Object({ preview_id: LoadBalancingSchemasPreviewId, account_id: IntelIdentifier }),
      responses: {
        200: LoadBalancingPreviewResultResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()], { description: "Resulting health data from a preview operation." }),
        }),
      },
    })
    .summary("Preview Result")
    .description("Get the result of a previous preview operation using the provided preview_id.")
    .operationId("account-load-balancer-monitors-preview-result")
    .tag("Account Load Balancer Monitors")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Load Balancing: Monitors and Pools Write",
      "Load Balancing: Monitors and Pools Read",
    ])

  api
    .get("/accounts/{account_id}/load_balancers/regions", {
      params: Type.Object({ account_id: IntelIdentifier }),
      query: Type.Object({
        subdivision_code: Type.Optional(LoadBalancingSubdivisionCodeA2),
        subdivision_code_a2: Type.Optional(LoadBalancingSubdivisionCodeA2),
        country_code_a2: Type.Optional(
          Type.String({ description: "Two-letter alpha-2 country code followed in ISO 3166-1." }),
        ),
      }),
      responses: {
        200: LoadBalancingRegionComponentsSchemasResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("List Regions")
    .description("List all region mappings.")
    .operationId("load-balancer-regions-list-regions")
    .tag("Load Balancer Regions")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Load Balancing: Monitors and Pools Write",
      "Load Balancing: Monitors and Pools Read",
    ])

  api
    .get("/accounts/{account_id}/load_balancers/regions/{region_id}", {
      params: Type.Object({ region_id: LoadBalancingRegionCode, account_id: IntelIdentifier }),
      responses: {
        200: LoadBalancingComponentsSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()], {
            description: "A list of countries and subdivisions mapped to a region.",
          }),
        }),
      },
    })
    .summary("Get Region")
    .description("Get a single region mapping.")
    .operationId("load-balancer-regions-get-region")
    .tag("Load Balancer Regions")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Load Balancing: Monitors and Pools Write",
      "Load Balancing: Monitors and Pools Read",
    ])

  api
    .get("/accounts/{account_id}/load_balancers/search", {
      params: Type.Object({ account_id: IntelIdentifier }),
      query: Type.Object({
        query: Type.Optional(Type.String({ description: "Search query term.", default: "" })),
        references: Type.Optional(
          Type.Union([Type.Literal(""), Type.Literal("*"), Type.Literal("referral"), Type.Literal("referrer")], {
            description:
              'The type of references to include. "*" to include both referral and referrer references. "" to not include any reference information.',
          }),
        ),
        page: Type.Optional(Type.Number({ minimum: 1 })),
        per_page: Type.Optional(Type.Number({ default: 25, minimum: 1, maximum: 1000 })),
      }),
      responses: {
        200: Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(LoadBalancingResultInfo),
          result: LoadBalancingSearch,
        }),
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(LoadBalancingResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Search Resources")
    .description("Search for Load Balancing resources.")
    .operationId("account-load-balancer-search-search-resources")
    .tag("Account Load Balancer Search")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Load Balancing: Monitors and Pools Write",
      "Load Balancing: Monitors and Pools Read",
    ])

  api
    .get("/zones/{zone_id}/load_balancers", {
      params: Type.Object({ zone_id: WaitingroomWaitingRoomId }),
      responses: {
        200: LoadBalancingLoadBalancerComponentsSchemasResponseCollection,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(LoadBalancingResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("List Load Balancers")
    .description("List configured load balancers.")
    .operationId("load-balancers-list-load-balancers")
    .tag("Load Balancers")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Load Balancers Write", "Load Balancers Read"])

  api
    .post("/zones/{zone_id}/load_balancers", {
      params: Type.Object({ zone_id: WaitingroomWaitingRoomId }),
      body: Type.Object({
        adaptive_routing: Type.Optional(LoadBalancingAdaptiveRouting),
        country_pools: Type.Optional(LoadBalancingCountryPools),
        default_pools: LoadBalancingDefaultPools,
        description: Type.Optional(LoadBalancingComponentsSchemasDescription),
        fallback_pool: LoadBalancingFallbackPool,
        location_strategy: Type.Optional(LoadBalancingLocationStrategy),
        name: LoadBalancingComponentsSchemasName,
        networks: Type.Optional(LoadBalancingNetworks),
        pop_pools: Type.Optional(LoadBalancingPopPools),
        proxied: Type.Optional(LoadBalancingProxied),
        random_steering: Type.Optional(LoadBalancingRandomSteering),
        region_pools: Type.Optional(LoadBalancingRegionPools),
        rules: Type.Optional(LoadBalancingRules),
        session_affinity: Type.Optional(LoadBalancingSessionAffinity),
        session_affinity_attributes: Type.Optional(LoadBalancingSessionAffinityAttributes),
        session_affinity_ttl: Type.Optional(LoadBalancingSessionAffinityTtl),
        steering_policy: Type.Optional(LoadBalancingSteeringPolicy),
        ttl: Type.Optional(LoadBalancingTtl),
      }),
      responses: {
        200: LoadBalancingLoadBalancerComponentsSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Create Load Balancer")
    .description("Create a new load balancer.")
    .operationId("load-balancers-create-load-balancer")
    .tag("Load Balancers")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Load Balancers Write"])

  api
    .get("/zones/{zone_id}/load_balancers/{load_balancer_id}", {
      params: Type.Object({ zone_id: WaitingroomWaitingRoomId, load_balancer_id: WaitingroomWaitingRoomId }),
      responses: {
        200: LoadBalancingLoadBalancerComponentsSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Load Balancer Details")
    .description("Fetch a single configured load balancer.")
    .operationId("load-balancers-load-balancer-details")
    .tag("Load Balancers")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Load Balancers Write", "Load Balancers Read"])

  api
    .put("/zones/{zone_id}/load_balancers/{load_balancer_id}", {
      params: Type.Object({ zone_id: WaitingroomWaitingRoomId, load_balancer_id: WaitingroomWaitingRoomId }),
      body: Type.Object({
        adaptive_routing: Type.Optional(LoadBalancingAdaptiveRouting),
        country_pools: Type.Optional(LoadBalancingCountryPools),
        default_pools: LoadBalancingDefaultPools,
        description: Type.Optional(LoadBalancingComponentsSchemasDescription),
        enabled: Type.Optional(LoadBalancingComponentsSchemasEnabled),
        fallback_pool: LoadBalancingFallbackPool,
        location_strategy: Type.Optional(LoadBalancingLocationStrategy),
        name: LoadBalancingComponentsSchemasName,
        networks: Type.Optional(LoadBalancingNetworks),
        pop_pools: Type.Optional(LoadBalancingPopPools),
        proxied: Type.Optional(LoadBalancingProxied),
        random_steering: Type.Optional(LoadBalancingRandomSteering),
        region_pools: Type.Optional(LoadBalancingRegionPools),
        rules: Type.Optional(LoadBalancingRules),
        session_affinity: Type.Optional(LoadBalancingSessionAffinity),
        session_affinity_attributes: Type.Optional(LoadBalancingSessionAffinityAttributes),
        session_affinity_ttl: Type.Optional(LoadBalancingSessionAffinityTtl),
        steering_policy: Type.Optional(LoadBalancingSteeringPolicy),
        ttl: Type.Optional(LoadBalancingTtl),
      }),
      responses: {
        200: LoadBalancingLoadBalancerComponentsSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Update Load Balancer")
    .description("Update a configured load balancer.")
    .operationId("load-balancers-update-load-balancer")
    .tag("Load Balancers")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Load Balancers Write"])

  api
    .patch("/zones/{zone_id}/load_balancers/{load_balancer_id}", {
      params: Type.Object({ zone_id: WaitingroomWaitingRoomId, load_balancer_id: WaitingroomWaitingRoomId }),
      body: Type.Object({
        adaptive_routing: Type.Optional(LoadBalancingAdaptiveRouting),
        country_pools: Type.Optional(LoadBalancingCountryPools),
        default_pools: Type.Optional(LoadBalancingDefaultPools),
        description: Type.Optional(LoadBalancingComponentsSchemasDescription),
        enabled: Type.Optional(LoadBalancingComponentsSchemasEnabled),
        fallback_pool: Type.Optional(LoadBalancingFallbackPool),
        location_strategy: Type.Optional(LoadBalancingLocationStrategy),
        name: Type.Optional(LoadBalancingComponentsSchemasName),
        pop_pools: Type.Optional(LoadBalancingPopPools),
        proxied: Type.Optional(LoadBalancingProxied),
        random_steering: Type.Optional(LoadBalancingRandomSteering),
        region_pools: Type.Optional(LoadBalancingRegionPools),
        rules: Type.Optional(LoadBalancingRules),
        session_affinity: Type.Optional(LoadBalancingSessionAffinity),
        session_affinity_attributes: Type.Optional(LoadBalancingSessionAffinityAttributes),
        session_affinity_ttl: Type.Optional(LoadBalancingSessionAffinityTtl),
        steering_policy: Type.Optional(LoadBalancingSteeringPolicy),
        ttl: Type.Optional(LoadBalancingTtl),
      }),
      responses: {
        200: LoadBalancingLoadBalancerComponentsSchemasSingleResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Patch Load Balancer")
    .description("Apply changes to an existing load balancer, overwriting the supplied properties.")
    .operationId("load-balancers-patch-load-balancer")
    .tag("Load Balancers")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Load Balancers Write"])

  api
    .delete("/zones/{zone_id}/load_balancers/{load_balancer_id}", {
      params: Type.Object({ zone_id: WaitingroomWaitingRoomId, load_balancer_id: WaitingroomWaitingRoomId }),
      responses: {
        200: LoadBalancingComponentsSchemasIdResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
    .summary("Delete Load Balancer")
    .description("Delete a configured load balancer.")
    .operationId("load-balancers-delete-load-balancer")
    .tag("Load Balancers")
    .security({ api_token: [] })
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Load Balancers Write"])
}

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages, IamResultInfo } from "../shared/schemas"
import {
  MagicVisibilityMnmMnmConfigDefaultSampling,
  MagicVisibilityMnmMnmConfigName,
  MagicVisibilityMnmMnmConfigRouterIps,
  MagicVisibilityMnmMnmConfigSingleResponse,
  MagicVisibilityMnmMnmConfigWarpDevices,
  MagicVisibilityMnmMnmRuleAdvertisementSingleResponse,
  MagicVisibilityMnmMnmRuleAutomaticAdvertisement,
  MagicVisibilityMnmMnmRuleBandwidthThreshold,
  MagicVisibilityMnmMnmRuleDuration,
  MagicVisibilityMnmMnmRuleIpPrefixes,
  MagicVisibilityMnmMnmRuleName,
  MagicVisibilityMnmMnmRulePacketThreshold,
  MagicVisibilityMnmMnmRulesCollectionResponse,
  MagicVisibilityMnmMnmRulesSingleResponse,
  MagicVisibilityMnmMnmVpcFlowsSingleResponse,
  MagicVisibilityMnmRuleIdentifier,
  UnnamedSchemaRef621ca3f6ea9a96427c902b0d14279ff8,
  UnnamedSchemaRef99ba74ba6027c3c87ca03d4e81cfc16d,
} from "./schemas"

export function registerMnm(api: Api) {
  api.assertVersion("3.0.3", "Mnm")

  api.group("/accounts/{account_id}/mnm", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/config", {})
      .response(MagicVisibilityMnmMnmConfigSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef621ca3f6ea9a96427c902b0d14279ff8,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("List account configuration")
      .description("Lists default sampling, router IPs and warp devices for account.")
      .operationId("magic-network-monitoring-configuration-list-account-configuration")
      .tag("Magic Network Monitoring Configuration")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic Network Monitoring Admin",
        "Magic Network Monitoring Config Write",
        "Magic Network Monitoring Config Read",
      ])

    g.post("/config", {
      body: Type.Object({
        default_sampling: MagicVisibilityMnmMnmConfigDefaultSampling,
        name: MagicVisibilityMnmMnmConfigName,
        router_ips: Type.Optional(MagicVisibilityMnmMnmConfigRouterIps),
        warp_devices: Type.Optional(MagicVisibilityMnmMnmConfigWarpDevices),
      }),
    })
      .response(MagicVisibilityMnmMnmConfigSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef621ca3f6ea9a96427c902b0d14279ff8,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Create account configuration")
      .description("Create a new network monitoring configuration.")
      .operationId("magic-network-monitoring-configuration-create-account-configuration")
      .tag("Magic Network Monitoring Configuration")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Network Monitoring Admin"])

    g.put("/config", {
      body: Type.Object({
        default_sampling: MagicVisibilityMnmMnmConfigDefaultSampling,
        name: MagicVisibilityMnmMnmConfigName,
        router_ips: Type.Optional(MagicVisibilityMnmMnmConfigRouterIps),
        warp_devices: Type.Optional(MagicVisibilityMnmMnmConfigWarpDevices),
      }),
    })
      .response(MagicVisibilityMnmMnmConfigSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef621ca3f6ea9a96427c902b0d14279ff8,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Update an entire account configuration")
      .description(
        "Update an existing network monitoring configuration, requires the entire configuration to be updated at once.",
      )
      .operationId("magic-network-monitoring-configuration-update-an-entire-account-configuration")
      .tag("Magic Network Monitoring Configuration")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Network Monitoring Admin", "Magic Network Monitoring Config Write"])

    g.patch("/config", {
      body: Type.Object({
        default_sampling: Type.Optional(MagicVisibilityMnmMnmConfigDefaultSampling),
        name: Type.Optional(MagicVisibilityMnmMnmConfigName),
        router_ips: Type.Optional(MagicVisibilityMnmMnmConfigRouterIps),
        warp_devices: Type.Optional(MagicVisibilityMnmMnmConfigWarpDevices),
      }),
    })
      .response(MagicVisibilityMnmMnmConfigSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef621ca3f6ea9a96427c902b0d14279ff8,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Update account configuration fields")
      .description("Update fields in an existing network monitoring configuration.")
      .operationId("magic-network-monitoring-configuration-update-account-configuration-fields")
      .tag("Magic Network Monitoring Configuration")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Network Monitoring Admin", "Magic Network Monitoring Config Write"])

    g.delete("/config", {})
      .response(MagicVisibilityMnmMnmConfigSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef621ca3f6ea9a96427c902b0d14279ff8,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Delete account configuration")
      .description("Delete an existing network monitoring configuration.")
      .operationId("magic-network-monitoring-configuration-delete-account-configuration")
      .tag("Magic Network Monitoring Configuration")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Network Monitoring Admin"])

    g.get("/config/full", {})
      .response(MagicVisibilityMnmMnmConfigSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef621ca3f6ea9a96427c902b0d14279ff8,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("List rules and account configuration")
      .description("Lists default sampling, router IPs, warp devices, and rules for account.")
      .operationId("magic-network-monitoring-configuration-list-rules-and-account-configuration")
      .tag("Magic Network Monitoring Configuration")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic Network Monitoring Admin",
        "Magic Network Monitoring Config Write",
        "Magic Network Monitoring Config Read",
      ])

    g.get("/rules", {})
      .response(MagicVisibilityMnmMnmRulesCollectionResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
          result_info: Type.Optional(IamResultInfo),
        }),
      )
      .summary("List rules")
      .description("Lists network monitoring rules for account.")
      .operationId("magic-network-monitoring-rules-list-rules")
      .tag("Magic Network Monitoring Rules")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic Network Monitoring Admin",
        "Magic Network Monitoring Config Write",
        "Magic Network Monitoring Config Read",
      ])

    g.post("/rules", {
      body: Type.Object({
        automatic_advertisement: Type.Optional(MagicVisibilityMnmMnmRuleAutomaticAdvertisement),
        bandwidth: Type.Optional(MagicVisibilityMnmMnmRuleBandwidthThreshold),
        duration: MagicVisibilityMnmMnmRuleDuration,
        name: MagicVisibilityMnmMnmRuleName,
        packet_threshold: Type.Optional(MagicVisibilityMnmMnmRulePacketThreshold),
        prefixes: Type.Optional(MagicVisibilityMnmMnmRuleIpPrefixes),
      }),
    })
      .response(MagicVisibilityMnmMnmRulesSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef99ba74ba6027c3c87ca03d4e81cfc16d,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Create rules")
      .description(
        "Create network monitoring rules for account. Currently only supports creating a single rule per API request.",
      )
      .operationId("magic-network-monitoring-rules-create-rules")
      .tag("Magic Network Monitoring Rules")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Network Monitoring Admin"])

    g.put("/rules", {
      body: Type.Object({
        automatic_advertisement: Type.Optional(MagicVisibilityMnmMnmRuleAutomaticAdvertisement),
        bandwidth: Type.Optional(MagicVisibilityMnmMnmRuleBandwidthThreshold),
        duration: MagicVisibilityMnmMnmRuleDuration,
        id: Type.Optional(MagicVisibilityMnmRuleIdentifier),
        name: MagicVisibilityMnmMnmRuleName,
        packet_threshold: Type.Optional(MagicVisibilityMnmMnmRulePacketThreshold),
        prefixes: Type.Optional(MagicVisibilityMnmMnmRuleIpPrefixes),
      }),
    })
      .response(MagicVisibilityMnmMnmRulesSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef99ba74ba6027c3c87ca03d4e81cfc16d,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Update rules")
      .description("Update network monitoring rules for account.")
      .operationId("magic-network-monitoring-rules-update-rules")
      .tag("Magic Network Monitoring Rules")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Network Monitoring Admin", "Magic Network Monitoring Config Write"])

    g.get("/rules/{rule_id}", {
      params: Type.Object({ rule_id: MagicVisibilityMnmRuleIdentifier }),
    })
      .response(MagicVisibilityMnmMnmRulesSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef99ba74ba6027c3c87ca03d4e81cfc16d,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Get rule")
      .description("List a single network monitoring rule for account.")
      .operationId("magic-network-monitoring-rules-get-rule")
      .tag("Magic Network Monitoring Rules")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Magic Network Monitoring Admin",
        "Magic Network Monitoring Config Write",
        "Magic Network Monitoring Config Read",
      ])

    g.patch("/rules/{rule_id}", {
      params: Type.Object({ rule_id: MagicVisibilityMnmRuleIdentifier }),
      body: Type.Object({
        automatic_advertisement: Type.Optional(MagicVisibilityMnmMnmRuleAutomaticAdvertisement),
        bandwidth: Type.Optional(MagicVisibilityMnmMnmRuleBandwidthThreshold),
        duration: Type.Optional(MagicVisibilityMnmMnmRuleDuration),
        name: Type.Optional(MagicVisibilityMnmMnmRuleName),
        packet_threshold: Type.Optional(MagicVisibilityMnmMnmRulePacketThreshold),
        prefixes: Type.Optional(MagicVisibilityMnmMnmRuleIpPrefixes),
      }),
    })
      .response(MagicVisibilityMnmMnmRulesSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef99ba74ba6027c3c87ca03d4e81cfc16d,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Update rule")
      .description("Update a network monitoring rule for account.")
      .operationId("magic-network-monitoring-rules-update-rule")
      .tag("Magic Network Monitoring Rules")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Network Monitoring Admin", "Magic Network Monitoring Config Write"])

    g.delete("/rules/{rule_id}", {
      params: Type.Object({ rule_id: MagicVisibilityMnmRuleIdentifier }),
    })
      .response(MagicVisibilityMnmMnmRulesSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef99ba74ba6027c3c87ca03d4e81cfc16d,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Delete rule")
      .description("Delete a network monitoring rule for account.")
      .operationId("magic-network-monitoring-rules-delete-rule")
      .tag("Magic Network Monitoring Rules")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Network Monitoring Admin"])

    g.patch("/rules/{rule_id}/advertisement", {
      params: Type.Object({ rule_id: MagicVisibilityMnmRuleIdentifier }),
    })
      .response(MagicVisibilityMnmMnmRuleAdvertisementSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Update advertisement for rule")
      .description("Update advertisement for rule.")
      .operationId("magic-network-monitoring-rules-update-advertisement-for-rule")
      .tag("Magic Network Monitoring Rules")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Network Monitoring Admin", "Magic Network Monitoring Config Write"])

    g.post("/vpc-flows/token", {})
      .response(MagicVisibilityMnmMnmVpcFlowsSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()], {
            description: "Authentication token to be used for VPC Flows export authentication.",
            "x-sensitive": true,
          }),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
          }),
        }),
      )
      .summary("Generate authentication token for VPC flow logs export.")
      .description("Generate authentication token for VPC flow logs export.")
      .operationId("magic-network-monitoring-vpc-flows-generate-authentication-token")
      .tag("Magic Network Monitoring VPC Flow logs")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Magic Network Monitoring Admin"])
  })
}

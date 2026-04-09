import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DosApiResponseCommonFailure, DosUuid } from "../shared/schemas"
import {
  DosApiResponseCommon,
  DosDnsProtectionRuleListResponse,
  DosDnsProtectionRuleResponse,
  DosDnsprotectionruleupdate,
  DosExpressionFilterListResponse,
  DosExpressionFilterResponse,
  DosExpressionfilterupdate,
  DosInfraPrefixListResponse,
  DosInfraPrefixResponse,
  DosInfraprefixupdate,
  DosNewdnsprotectionrule,
  DosNewexpressionfilter,
  DosNewinfraprefix,
  DosNewprefix,
  DosNewsynprotectionrule,
  DosNewtcpflowprotectionrule,
  DosPrefixListResponse,
  DosPrefixResponse,
  DosPrefixupdate,
  DosProtectionStatusResponse,
  DosSynProtectionRuleListResponse,
  DosSynProtectionRuleResponse,
  DosSynprotectionruleupdate,
  DosTcpFlowProtectionRuleListResponse,
  DosTcpFlowProtectionRuleResponse,
  DosTcpflowprotectionruleupdate,
  DosUpdateprotectionstatus,
} from "./schemas"

export function registerConfigs(api: Api) {
  api.assertVersion("3.0.3", "Configs")

  api.group("/accounts/{account_id}/configs", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/allowlist", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ format: "int64", "x-auditable": true })),
        per_page: Type.Optional(Type.Integer({ format: "int64", "x-auditable": true })),
        order: Type.Optional(Type.String()),
        direction: Type.Optional(Type.String({ "x-auditable": true })),
      }),
    })
      .response(DosInfraPrefixListResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("List all allowlist prefixes.")
      .description("List all allowlist prefixes for an account.")
      .operationId("listAllowlistPrefixesForAccount")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.post("/allowlist", {
      body: DosNewinfraprefix,
    })
      .response(DosInfraPrefixResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Create allowlist prefix.")
      .description("Create an allowlist prefix for an account.")
      .operationId("createAllowlistedPrefix")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/allowlist", {})
      .response(DosApiResponseCommon)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Delete all allowlist prefixes.")
      .description("Delete all allowlist prefixes for an account.")
      .operationId("deleteAllowlistPrefixesForAccount")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/allowlist/{prefix_id}", {
      params: Type.Object({ prefix_id: DosUuid }),
    })
      .response(DosInfraPrefixResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Get allowlist prefix.")
      .description("Get an allowlist prefix specified by the given UUID.")
      .operationId("getAllowlistPrefix")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.patch("/allowlist/{prefix_id}", {
      params: Type.Object({ prefix_id: DosUuid }),
      body: DosInfraprefixupdate,
    })
      .response(DosInfraPrefixResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Update allowlist prefix.")
      .description("Update an allowlist prefix specified by the given UUID.")
      .operationId("updateAllowlistPrefix")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/allowlist/{prefix_id}", {
      params: Type.Object({ prefix_id: DosUuid }),
    })
      .response(DosApiResponseCommon)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Delete allowlist prefix.")
      .description("Delete the allowlist prefix for an account given a UUID.")
      .operationId("deleteAllowlistPrefix")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/dns_protection/rules", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ format: "int64", "x-auditable": true })),
        per_page: Type.Optional(Type.Integer({ format: "int64", "x-auditable": true })),
        order: Type.Optional(Type.String({ "x-auditable": true })),
        direction: Type.Optional(Type.String({ "x-auditable": true })),
      }),
    })
      .response(DosDnsProtectionRuleListResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("List all DNS Protection rules.")
      .description("List all DNS Protection rules for an account.")
      .operationId("listDnsProtectionRulesForAccount")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.post("/dns_protection/rules", {
      body: DosNewdnsprotectionrule,
    })
      .response(DosDnsProtectionRuleResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Create DNS Protection rule.")
      .description("Create a DNS Protection rule for an account.")
      .operationId("createDnsProtectionRule")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/dns_protection/rules", {})
      .response(DosApiResponseCommon)
      .summary("Delete all DNS Protection rules.")
      .description("Delete all DNS Protection rules for an account.")
      .operationId("deleteDnsProtectionRulesForAccount")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/dns_protection/rules/{rule_id}", {
      params: Type.Object({ rule_id: DosUuid }),
    })
      .response(DosDnsProtectionRuleResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Get DNS Protection rule.")
      .description("Get a DNS Protection rule specified by the given UUID.")
      .operationId("getDnsProtectionRule")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.patch("/dns_protection/rules/{rule_id}", {
      params: Type.Object({ rule_id: DosUuid }),
      body: DosDnsprotectionruleupdate,
    })
      .response(DosDnsProtectionRuleResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Update DNS Protection rule.")
      .description("Update a DNS Protection rule specified by the given UUID.")
      .operationId("updateDnsProtectionRule")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/dns_protection/rules/{rule_id}", {
      params: Type.Object({ rule_id: DosUuid }),
    })
      .response(DosApiResponseCommon)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Delete DNS Protection rule.")
      .description("Delete a DNS Protection rule specified by the given UUID.")
      .operationId("deleteDnsProtectionRule")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/prefixes", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ format: "int64", "x-auditable": true })),
        per_page: Type.Optional(Type.Integer({ format: "int64", "x-auditable": true })),
        order: Type.Optional(Type.String({ "x-auditable": true })),
        direction: Type.Optional(Type.String({ "x-auditable": true })),
      }),
    })
      .response(DosPrefixListResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("List all prefixes.")
      .description("List all prefixes for an account.")
      .operationId("listPrefixesForAccount")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.post("/prefixes", {
      body: DosNewprefix,
    })
      .response(DosPrefixResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Create prefix.")
      .description("Create a prefix for an account.")
      .operationId("createPrefix")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/prefixes", {})
      .response(DosApiResponseCommon)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Delete all prefixes.")
      .description("Delete all prefixes for an account.")
      .operationId("deletePrefixesForAccount")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.post("/prefixes/bulk", {
      body: Type.Array(DosNewprefix),
    })
      .response(DosPrefixListResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Create multiple prefixes.")
      .description("Create multiple prefixes for an account.")
      .operationId("bulkCreatePrefixes")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/prefixes/{prefix_id}", {
      params: Type.Object({ prefix_id: DosUuid }),
    })
      .response(DosPrefixResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Get prefix.")
      .description("Get a prefix specified by the given UUID.")
      .operationId("getPrefix")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.patch("/prefixes/{prefix_id}", {
      params: Type.Object({ prefix_id: DosUuid }),
      body: DosPrefixupdate,
    })
      .response(DosPrefixResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Update prefix.")
      .description("Update a prefix specified by the given UUID.")
      .operationId("updatePrefix")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/prefixes/{prefix_id}", {
      params: Type.Object({ prefix_id: DosUuid }),
    })
      .response(DosApiResponseCommon)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Delete prefix.")
      .description("Delete the prefix for an account given a UUID.")
      .operationId("deletePrefix")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/syn_protection/filters", {
      query: Type.Object({
        mode: Type.Optional(Type.String({ "x-auditable": true })),
        page: Type.Optional(Type.Integer({ format: "int64", "x-auditable": true })),
        per_page: Type.Optional(Type.Integer({ format: "int64", "x-auditable": true })),
        order: Type.Optional(Type.String({ "x-auditable": true })),
        direction: Type.Optional(Type.String({ "x-auditable": true })),
      }),
    })
      .response(DosExpressionFilterListResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("List all SYN Protection filters.")
      .description("List all SYN Protection filters for an account.")
      .operationId("listSynProtectionFiltersForAccount")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.post("/syn_protection/filters", {
      body: DosNewexpressionfilter,
    })
      .response(DosExpressionFilterResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Create a SYN Protection filter.")
      .description("Create a SYN Protection filter for an account.")
      .operationId("createSynProtectionFilter")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/syn_protection/filters", {})
      .response(DosApiResponseCommon)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Delete all SYN Protection filters.")
      .description("Delete all SYN Protection filters for an account.")
      .operationId("deleteSynProtectionFiltersForAccount")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/syn_protection/filters/{filter_id}", {
      params: Type.Object({ filter_id: DosUuid }),
    })
      .response(DosExpressionFilterResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Get SYN Protection filter.")
      .description("Get a SYN Protection filter specified by the given UUID.")
      .operationId("getSynProtectionFilter")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.patch("/syn_protection/filters/{filter_id}", {
      params: Type.Object({ filter_id: DosUuid }),
      body: DosExpressionfilterupdate,
    })
      .response(DosExpressionFilterResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Update SYN Protection filter.")
      .description("Update a SYN Protection filter specified by the given UUID.")
      .operationId("updateSynProtectionFilter")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/syn_protection/filters/{filter_id}", {
      params: Type.Object({ filter_id: DosUuid }),
    })
      .response(DosApiResponseCommon)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Delete SYN Protection filter.")
      .description("Delete a SYN Protection filter specified by the given UUID.")
      .operationId("deleteSynProtectionFilter")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/syn_protection/rules", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ format: "int64", "x-auditable": true })),
        per_page: Type.Optional(Type.Integer({ format: "int64", "x-auditable": true })),
        order: Type.Optional(Type.String({ "x-auditable": true })),
        direction: Type.Optional(Type.String({ "x-auditable": true })),
      }),
    })
      .response(DosSynProtectionRuleListResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("List all SYN Protection rules.")
      .description("List all SYN Protection rules for an account.")
      .operationId("listSynProtectionRulesForAccount")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.post("/syn_protection/rules", {
      body: DosNewsynprotectionrule,
    })
      .response(DosSynProtectionRuleResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Create SYN Protection rule.")
      .description("Create a SYN Protection rule for an account.")
      .operationId("createSynProtectionRule")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/syn_protection/rules", {})
      .response(DosApiResponseCommon)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Delete all SYN Protection rules.")
      .description("Delete all SYN Protection rules for an account.")
      .operationId("deleteSynProtectionRulesForAccount")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/syn_protection/rules/{rule_id}", {
      params: Type.Object({ rule_id: DosUuid }),
    })
      .response(DosSynProtectionRuleResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Get SYN Protection rule.")
      .description("Get a SYN Protection rule specified by the given UUID.")
      .operationId("getSynProtectionRule")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.patch("/syn_protection/rules/{rule_id}", {
      params: Type.Object({ rule_id: DosUuid }),
      body: DosSynprotectionruleupdate,
    })
      .response(DosSynProtectionRuleResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Update SYN Protection rule.")
      .description("Update a SYN Protection rule specified by the given UUID.")
      .operationId("updateSynProtectionRule")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/syn_protection/rules/{rule_id}", {
      params: Type.Object({ rule_id: DosUuid }),
    })
      .response(DosApiResponseCommon)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Delete SYN Protection rule.")
      .description("Delete a SYN Protection rule specified by the given UUID.")
      .operationId("deleteSynProtectionRule")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/tcp_flow_protection/filters", {
      query: Type.Object({
        mode: Type.Optional(Type.String({ "x-auditable": true })),
        page: Type.Optional(Type.Integer({ format: "int64", "x-auditable": true })),
        per_page: Type.Optional(Type.Integer({ format: "int64", "x-auditable": true })),
        order: Type.Optional(Type.String({ "x-auditable": true })),
        direction: Type.Optional(Type.String({ "x-auditable": true })),
      }),
    })
      .response(DosExpressionFilterListResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("List all TCP Flow Protection filters.")
      .description("List all TCP Flow Protection filters for an account.")
      .operationId("listTcpFlowProtectionFiltersForAccount")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.post("/tcp_flow_protection/filters", {
      body: DosNewexpressionfilter,
    })
      .response(DosExpressionFilterResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Create a TCP Flow Protection filter.")
      .description("Create a TCP Flow Protection filter for an account.")
      .operationId("createTcpFlowProtectionFilter")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/tcp_flow_protection/filters", {})
      .response(DosApiResponseCommon)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Delete all TCP Flow Protection filters.")
      .description("Delete all TCP Flow Protection filters for an account.")
      .operationId("deleteTcpFlowProtectionFiltersForAccount")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/tcp_flow_protection/filters/{filter_id}", {
      params: Type.Object({ filter_id: DosUuid }),
    })
      .response(DosExpressionFilterResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Get TCP Flow Protection filter.")
      .description("Get a TCP Flow Protection filter specified by the given UUID.")
      .operationId("getTcpFlowProtectionFilter")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.patch("/tcp_flow_protection/filters/{filter_id}", {
      params: Type.Object({ filter_id: DosUuid }),
      body: DosExpressionfilterupdate,
    })
      .response(DosExpressionFilterResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Update TCP Flow Protection filter.")
      .description("Update a TCP Flow Protection filter specified by the given UUID.")
      .operationId("updateTcpFlowProtectionFilter")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/tcp_flow_protection/filters/{filter_id}", {
      params: Type.Object({ filter_id: DosUuid }),
    })
      .response(DosApiResponseCommon)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Delete TCP Flow Protection filter.")
      .description("Delete a TCP Flow Protection filter specified by the given UUID.")
      .operationId("deleteTcpFlowProtectionFilter")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/tcp_flow_protection/rules", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ format: "int64", "x-auditable": true })),
        per_page: Type.Optional(Type.Integer({ format: "int64", "x-auditable": true })),
        order: Type.Optional(Type.String({ "x-auditable": true })),
        direction: Type.Optional(Type.String({ "x-auditable": true })),
      }),
    })
      .response(DosTcpFlowProtectionRuleListResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("List all TCP Flow Protection rules.")
      .description("List all TCP Flow Protection rules for an account.")
      .operationId("listTcpFlowProtectionRulesForAccount")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.post("/tcp_flow_protection/rules", {
      body: DosNewtcpflowprotectionrule,
    })
      .response(DosTcpFlowProtectionRuleResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Create TCP Flow Protection rule.")
      .description("Create a TCP Flow Protection rule for an account.")
      .operationId("createTcpFlowProtectionRule")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/tcp_flow_protection/rules", {})
      .response(DosApiResponseCommon)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Delete all TCP Flow Protection rules.")
      .description("Delete all TCP Flow Protection rules for an account.")
      .operationId("deleteTcpFlowProtectionRulesForAccount")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/tcp_flow_protection/rules/{rule_id}", {
      params: Type.Object({ rule_id: DosUuid }),
    })
      .response(DosTcpFlowProtectionRuleResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Get TCP Flow Protection rule.")
      .description("Get a TCP Flow Protection rule specified by the given UUID.")
      .operationId("getTcpFlowProtectionRule")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.patch("/tcp_flow_protection/rules/{rule_id}", {
      params: Type.Object({ rule_id: DosUuid }),
      body: DosTcpflowprotectionruleupdate,
    })
      .response(DosTcpFlowProtectionRuleResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Update TCP Flow Protection rule.")
      .description("Update a TCP Flow Protection rule specified by the given UUID.")
      .operationId("updateTcpFlowProtectionRule")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/tcp_flow_protection/rules/{rule_id}", {
      params: Type.Object({ rule_id: DosUuid }),
    })
      .response(DosApiResponseCommon)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Delete TCP Flow Protection rule.")
      .description("Delete a TCP Flow Protection rule specified by the given UUID.")
      .operationId("deleteTcpFlowProtectionRule")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/tcp_protection_status", {})
      .response(DosProtectionStatusResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Get protection status.")
      .description("Get the protection status of the account.")
      .operationId("getProtectionStatus")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.patch("/tcp_protection_status", {
      body: DosUpdateprotectionstatus,
    })
      .response(DosProtectionStatusResponse)
      .error("4XX", DosApiResponseCommonFailure)
      .summary("Update protection status.")
      .description("Update the protection status of the account.")
      .operationId("updateProtectionStatus")
      .tag("flowtrackd-api_other")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
  })
}

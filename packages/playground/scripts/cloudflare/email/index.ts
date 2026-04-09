import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlsIdentifier } from "../shared/schemas"
import {
  EmailApiResponseSingle,
  EmailCatchAllRuleResponseSingle,
  EmailCreateDestinationAddressProperties,
  EmailCreateRuleProperties,
  EmailDestinationAddressIdentifier,
  EmailDestinationAddressResponseSingle,
  EmailDestinationAddressesResponseCollection,
  EmailDnsSettingsResponseCollection,
  EmailEmailRoutingDnsQueryResponse,
  EmailEmailSettingDnsRequestBody,
  EmailEmailSettingName,
  EmailEmailSettingsResponseSingle,
  EmailRuleIdentifier,
  EmailRuleResponseSingle,
  EmailRulesResponseCollection,
  EmailUpdateCatchAllRuleProperties,
} from "./schemas"

export function registerEmail(api: Api) {
  api.assertVersion("3.0.3", "Email")

  api
    .get("/accounts/{account_id}/email/routing/addresses", {
      params: Type.Object({ account_id: DlsIdentifier }),
      query: Type.Object({
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Maximum number of results per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
        direction: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
            description: "Sorts results in an ascending or descending order.",
          }),
        ),
        verified: Type.Optional(
          Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Filter by verified destination addresses.",
          }),
        ),
      }),
    })
    .response(EmailDestinationAddressesResponseCollection)
    .summary("List destination addresses")
    .description("Lists existing destination addresses.")
    .operationId("email-routing-destination-addresses-list-destination-addresses")
    .tag("Email Routing destination addresses")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Email Routing Addresses Write", "Email Routing Addresses Read"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.email.routing.address.list"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .post("/accounts/{account_id}/email/routing/addresses", {
      params: Type.Object({ account_id: DlsIdentifier }),
      body: EmailCreateDestinationAddressProperties,
    })
    .response(EmailDestinationAddressResponseSingle)
    .summary("Create a destination address")
    .description(
      "Create a destination address to forward your emails to. Destination addresses need to be verified before they can be used.",
    )
    .operationId("email-routing-destination-addresses-create-a-destination-address")
    .tag("Email Routing destination addresses")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Email Routing Addresses Write"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.email.routing.address.create"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .get("/accounts/{account_id}/email/routing/addresses/{destination_address_identifier}", {
      params: Type.Object({
        destination_address_identifier: EmailDestinationAddressIdentifier,
        account_id: DlsIdentifier,
      }),
    })
    .response(EmailDestinationAddressResponseSingle)
    .summary("Get a destination address")
    .description("Gets information for a specific destination email already created.")
    .operationId("email-routing-destination-addresses-get-a-destination-address")
    .tag("Email Routing destination addresses")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Email Routing Addresses Write", "Email Routing Addresses Read"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.email.routing.address.read"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .delete("/accounts/{account_id}/email/routing/addresses/{destination_address_identifier}", {
      params: Type.Object({
        destination_address_identifier: EmailDestinationAddressIdentifier,
        account_id: DlsIdentifier,
      }),
    })
    .response(EmailDestinationAddressResponseSingle)
    .summary("Delete destination address")
    .description("Deletes a specific destination address.")
    .operationId("email-routing-destination-addresses-delete-destination-address")
    .tag("Email Routing destination addresses")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Email Routing Addresses Write"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.email.routing.address.delete"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .get("/zones/{zone_id}/email/routing", {
      params: Type.Object({ zone_id: DlsIdentifier }),
    })
    .response(EmailEmailSettingsResponseSingle)
    .summary("Get Email Routing settings")
    .description("Get information about the settings for your Email Routing zone.")
    .operationId("email-routing-settings-get-email-routing-settings")
    .tag("Email Routing settings")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.zone.email.routing.config.read"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .post("/zones/{zone_id}/email/routing/disable", {
      params: Type.Object({ zone_id: DlsIdentifier }),
    })
    .response(EmailEmailSettingsResponseSingle)
    .summary("Disable Email Routing")
    .description(
      "Disable your Email Routing zone. Also removes additional MX records previously required for Email Routing to work.",
    )
    .operationId("email-routing-settings-disable-email-routing")
    .tag("Email Routing settings")
    .deprecated()
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.zone.email.routing.config.update"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .get("/zones/{zone_id}/email/routing/dns", {
      params: Type.Object({ zone_id: DlsIdentifier }),
      query: Type.Object({
        subdomain: Type.Optional(EmailEmailSettingName),
      }),
    })
    .response(Type.Union([EmailEmailRoutingDnsQueryResponse, EmailDnsSettingsResponseCollection]))
    .summary("Email Routing - DNS settings")
    .description("Show the DNS records needed to configure your Email Routing zone.")
    .operationId("email-routing-settings-email-routing-dns-settings")
    .tag("Email Routing settings")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.zone.email.routing.config.read"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .post("/zones/{zone_id}/email/routing/dns", {
      params: Type.Object({ zone_id: DlsIdentifier }),
      body: EmailEmailSettingDnsRequestBody,
    })
    .response(EmailEmailSettingsResponseSingle)
    .summary("Enable Email Routing")
    .description("Enable you Email Routing zone. Add and lock the necessary MX and SPF records.")
    .operationId("email-routing-settings-enable-email-routing-dns")
    .tag("Email Routing settings")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.zone.email.routing.config.update"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .patch("/zones/{zone_id}/email/routing/dns", {
      params: Type.Object({ zone_id: DlsIdentifier }),
      body: EmailEmailSettingDnsRequestBody,
    })
    .response(EmailEmailSettingsResponseSingle)
    .summary("Unlock Email Routing")
    .description("Unlock MX Records previously locked by Email Routing.")
    .operationId("email-routing-settings-unlock-email-routing-dns")
    .tag("Email Routing settings")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.zone.email.routing.config.update"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .delete("/zones/{zone_id}/email/routing/dns", {
      params: Type.Object({ zone_id: DlsIdentifier }),
    })
    .response(Type.Union([EmailApiResponseSingle, EmailDnsSettingsResponseCollection]))
    .summary("Disable Email Routing")
    .description(
      "Disable your Email Routing zone. Also removes additional MX records previously required for Email Routing to work.",
    )
    .operationId("email-routing-settings-disable-email-routing-dns")
    .tag("Email Routing settings")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write"])
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .post("/zones/{zone_id}/email/routing/enable", {
      params: Type.Object({ zone_id: DlsIdentifier }),
    })
    .response(EmailEmailSettingsResponseSingle)
    .summary("Enable Email Routing")
    .description("Enable you Email Routing zone. Add and lock the necessary MX and SPF records.")
    .operationId("email-routing-settings-enable-email-routing")
    .tag("Email Routing settings")
    .deprecated()
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.zone.email.routing.config.update"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .get("/zones/{zone_id}/email/routing/rules", {
      params: Type.Object({ zone_id: DlsIdentifier }),
      query: Type.Object({
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Maximum number of results per page.", default: 20, minimum: 5, maximum: 50 }),
        ),
        enabled: Type.Optional(
          Type.Union([Type.Literal(true), Type.Literal(false)], { description: "Filter by enabled routing rules." }),
        ),
      }),
    })
    .response(EmailRulesResponseCollection)
    .summary("List routing rules")
    .description("Lists existing routing rules.")
    .operationId("email-routing-routing-rules-list-routing-rules")
    .tag("Email Routing routing rules")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Email Routing Rules Write", "Email Routing Rules Read"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.zone.email.routing.rule.list"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .post("/zones/{zone_id}/email/routing/rules", {
      params: Type.Object({ zone_id: DlsIdentifier }),
      body: EmailCreateRuleProperties,
    })
    .response(EmailRuleResponseSingle)
    .summary("Create routing rule")
    .description(
      "Rules consist of a set of criteria for matching emails (such as an email being sent to a specific custom email address) plus a set of actions to take on the email (like forwarding it to a specific destination address).",
    )
    .operationId("email-routing-routing-rules-create-routing-rule")
    .tag("Email Routing routing rules")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Email Routing Rules Write"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.zone.email.routing.rule.create"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .get("/zones/{zone_id}/email/routing/rules/catch_all", {
      params: Type.Object({ zone_id: DlsIdentifier }),
    })
    .response(EmailCatchAllRuleResponseSingle)
    .summary("Get catch-all rule")
    .description("Get information on the default catch-all routing rule.")
    .operationId("email-routing-routing-rules-get-catch-all-rule")
    .tag("Email Routing routing rules")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Email Routing Rules Write", "Email Routing Rules Read"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.zone.email.routing.rule.read"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .put("/zones/{zone_id}/email/routing/rules/catch_all", {
      params: Type.Object({ zone_id: DlsIdentifier }),
      body: EmailUpdateCatchAllRuleProperties,
    })
    .response(EmailCatchAllRuleResponseSingle)
    .summary("Update catch-all rule")
    .description(
      "Enable or disable catch-all routing rule, or change action to forward to specific destination address.",
    )
    .operationId("email-routing-routing-rules-update-catch-all-rule")
    .tag("Email Routing routing rules")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Email Routing Rules Write"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.zone.email.routing.rule.update"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .get("/zones/{zone_id}/email/routing/rules/{rule_identifier}", {
      params: Type.Object({ rule_identifier: EmailRuleIdentifier, zone_id: DlsIdentifier }),
    })
    .response(EmailRuleResponseSingle)
    .summary("Get routing rule")
    .description("Get information for a specific routing rule already created.")
    .operationId("email-routing-routing-rules-get-routing-rule")
    .tag("Email Routing routing rules")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Email Routing Rules Write", "Email Routing Rules Read"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.zone.email.routing.rule.read"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .put("/zones/{zone_id}/email/routing/rules/{rule_identifier}", {
      params: Type.Object({ rule_identifier: EmailRuleIdentifier, zone_id: DlsIdentifier }),
      body: EmailCreateRuleProperties,
    })
    .response(EmailRuleResponseSingle)
    .summary("Update routing rule")
    .description("Update actions and matches, or enable/disable specific routing rules.")
    .operationId("email-routing-routing-rules-update-routing-rule")
    .tag("Email Routing routing rules")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Email Routing Rules Write"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.zone.email.routing.rule.update"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

  api
    .delete("/zones/{zone_id}/email/routing/rules/{rule_identifier}", {
      params: Type.Object({ rule_identifier: EmailRuleIdentifier, zone_id: DlsIdentifier }),
    })
    .response(EmailRuleResponseSingle)
    .summary("Delete routing rule")
    .description("Delete a specific routing rule.")
    .operationId("email-routing-routing-rules-delete-routing-rule")
    .tag("Email Routing routing rules")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Email Routing Rules Write"])
    .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.zone.email.routing.rule.delete"] })
    .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
}

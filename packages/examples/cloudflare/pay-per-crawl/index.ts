import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  PayPerCrawlApierrorresponse,
  PayPerCrawlApinoresultresponse,
  PayPerCrawlCreatestripeconfigresponse,
  PayPerCrawlDaricconfig,
  PayPerCrawlGetconfigresponse,
  PayPerCrawlGetstripeconfigresponse,
  PayPerCrawlQueryzonescanbeenabledresponse,
  PayPerCrawlZonescanbeenabledpayload,
} from "./schemas"

export function registerPayPerCrawl(api: Api) {
  api
    .get("/accounts/{account_id}/pay-per-crawl/crawler/stripe", {
      params: Type.Object({ account_id: Type.String() }),
      responses: {
        200: PayPerCrawlGetstripeconfigresponse,
        400: PayPerCrawlApierrorresponse,
      },
    })
    .summary("Gets the stripe config for a crawler")
    .description("Gets the stripe config for a crawler.")
    .operationId("pay-per-crawl.crawlerGetStripeConfig")
    .tag("ppc_stripe")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Trust and Safety Write",
      "Trust and Safety Read",
      "DNS View Write",
      "DNS View Read",
      "SCIM Provisioning",
      "Load Balancers Account Write",
      "Load Balancers Account Read",
      "Zero Trust: PII Read",
      "DDoS Botnet Feed Write",
      "DDoS Botnet Feed Read",
      "Workers R2 Storage Write",
      "Workers R2 Storage Read",
      "DDoS Protection Write",
      "DDoS Protection Read",
      "Workers Tail Read",
      "Workers KV Storage Write",
      "Workers KV Storage Read",
      "Workers Scripts Write",
      "Workers Scripts Read",
      "Load Balancing: Monitors and Pools Write",
      "Load Balancing: Monitors and Pools Read",
      "Account Firewall Access Rules Write",
      "Account Firewall Access Rules Read",
      "DNS Firewall Write",
      "DNS Firewall Read",
      "Billing Write",
      "Billing Read",
      "Account Settings Write",
      "Account Settings Read",
    ])

  api
    .post("/accounts/{account_id}/pay-per-crawl/crawler/stripe", {
      params: Type.Object({ account_id: Type.String() }),
      responses: {
        200: PayPerCrawlCreatestripeconfigresponse,
        400: PayPerCrawlApierrorresponse,
      },
    })
    .summary("Creates the stripe config for a crawler")
    .description("Creates the stripe config for a crawler.")
    .operationId("pay-per-crawl.crawlerCreateStripeConfig")
    .tag("ppc_stripe")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write"])

  api
    .delete("/accounts/{account_id}/pay-per-crawl/crawler/stripe", {
      params: Type.Object({ account_id: Type.String() }),
      responses: {
        200: PayPerCrawlApinoresultresponse,
        400: PayPerCrawlApierrorresponse,
      },
    })
    .summary("Deletes the stripe config for a crawler")
    .description("Deletes the stripe config for a crawler.")
    .operationId("pay-per-crawl.crawlerDeleteStripeConfig")
    .tag("ppc_stripe")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write"])

  api
    .get("/accounts/{account_id}/pay-per-crawl/publisher/stripe", {
      params: Type.Object({ account_id: Type.String() }),
      responses: {
        200: PayPerCrawlGetstripeconfigresponse,
        400: PayPerCrawlApierrorresponse,
      },
    })
    .summary("Gets the stripe config for a publisher")
    .description("Gets the stripe config for a publisher.")
    .operationId("pay-per-crawl.publisherGetStripeConfig")
    .tag("ppc_stripe")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Trust and Safety Write",
      "Trust and Safety Read",
      "DNS View Write",
      "DNS View Read",
      "SCIM Provisioning",
      "Load Balancers Account Write",
      "Load Balancers Account Read",
      "Zero Trust: PII Read",
      "DDoS Botnet Feed Write",
      "DDoS Botnet Feed Read",
      "Workers R2 Storage Write",
      "Workers R2 Storage Read",
      "DDoS Protection Write",
      "DDoS Protection Read",
      "Workers Tail Read",
      "Workers KV Storage Write",
      "Workers KV Storage Read",
      "Workers Scripts Write",
      "Workers Scripts Read",
      "Load Balancing: Monitors and Pools Write",
      "Load Balancing: Monitors and Pools Read",
      "Account Firewall Access Rules Write",
      "Account Firewall Access Rules Read",
      "DNS Firewall Write",
      "DNS Firewall Read",
      "Billing Write",
      "Billing Read",
      "Account Settings Write",
      "Account Settings Read",
    ])

  api
    .post("/accounts/{account_id}/pay-per-crawl/publisher/stripe", {
      params: Type.Object({ account_id: Type.String() }),
      responses: {
        200: PayPerCrawlCreatestripeconfigresponse,
        400: PayPerCrawlApierrorresponse,
      },
    })
    .summary("Creates the stripe config for a publisher")
    .description("Creates the stripe config for a publisher.")
    .operationId("pay-per-crawl.publisherCreateStripeConfig")
    .tag("ppc_stripe")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write"])

  api
    .delete("/accounts/{account_id}/pay-per-crawl/publisher/stripe", {
      params: Type.Object({ account_id: Type.String() }),
      responses: {
        200: PayPerCrawlApinoresultresponse,
        400: PayPerCrawlApierrorresponse,
      },
    })
    .summary("Deletes the stripe config for a publisher")
    .description("Deletes the stripe config for a publisher.")
    .operationId("pay-per-crawl.publisherDeleteStripeConfig")
    .tag("ppc_stripe")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write"])

  api
    .patch("/accounts/{account_id}/pay-per-crawl/zones_can_be_enabled", {
      params: Type.Object({ account_id: Type.String() }),
      body: PayPerCrawlZonescanbeenabledpayload,
      responses: {
        200: PayPerCrawlApinoresultresponse,
        400: PayPerCrawlApierrorresponse,
      },
    })
    .summary("Set can_be_enabled setting on zones")
    .description("Allows an account admin to set the can_be_enabled setting on a list of zones.")
    .operationId("pay-per-crawl.setZonesCanBeEnabled")
    .tag("ppc_config")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Account Settings Write"])

  api
    .post("/accounts/{account_id}/pay-per-crawl/zones_can_be_enabled/query", {
      params: Type.Object({ account_id: Type.String() }),
      body: PayPerCrawlZonescanbeenabledpayload,
      responses: {
        200: PayPerCrawlQueryzonescanbeenabledresponse,
        400: PayPerCrawlApierrorresponse,
      },
    })
    .summary("Gets the can_be_enabled zone setting")
    .description(
      "Provided a list of pay-per-crawl configured zones this method will return whether they can enable PPC or not.",
    )
    .operationId("pay-per-crawl.queryZonesCanBeEnabled")
    .tag("ppc_config")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", [
      "Trust and Safety Write",
      "Trust and Safety Read",
      "DNS View Write",
      "DNS View Read",
      "SCIM Provisioning",
      "Load Balancers Account Write",
      "Load Balancers Account Read",
      "Zero Trust: PII Read",
      "DDoS Botnet Feed Write",
      "DDoS Botnet Feed Read",
      "Workers R2 Storage Write",
      "Workers R2 Storage Read",
      "DDoS Protection Write",
      "DDoS Protection Read",
      "Workers Tail Read",
      "Workers KV Storage Write",
      "Workers KV Storage Read",
      "Workers Scripts Write",
      "Workers Scripts Read",
      "Load Balancing: Monitors and Pools Write",
      "Load Balancing: Monitors and Pools Read",
      "Account Firewall Access Rules Write",
      "Account Firewall Access Rules Read",
      "DNS Firewall Write",
      "DNS Firewall Read",
      "Billing Write",
      "Billing Read",
      "Account Settings Write",
      "Account Settings Read",
    ])

  api
    .get("/zones/{zone_id}/pay-per-crawl/configuration", {
      params: Type.Object({ zone_id: Type.String() }),
      responses: {
        200: PayPerCrawlGetconfigresponse,
        400: PayPerCrawlApierrorresponse,
      },
    })
    .summary("Get the pay-per-crawl config")
    .description("Gets the pay-per-crawl config for a zone including the bot configuration.")
    .operationId("pay-per-crawl.getConfig")
    .tag("ppc_config")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write", "Zone Settings Read"])

  api
    .post("/zones/{zone_id}/pay-per-crawl/configuration", {
      params: Type.Object({ zone_id: Type.String() }),
      body: PayPerCrawlDaricconfig,
      responses: {
        200: PayPerCrawlGetconfigresponse,
        400: PayPerCrawlApierrorresponse,
      },
    })
    .summary("Creates pay-per-crawl config for a zone")
    .description("Creates the pay-per-crawl config for a zone.")
    .operationId("pay-per-crawl.createConfig")
    .tag("ppc_config")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write"])

  api
    .patch("/zones/{zone_id}/pay-per-crawl/configuration", {
      params: Type.Object({ zone_id: Type.String() }),
      body: PayPerCrawlDaricconfig,
      responses: {
        200: PayPerCrawlGetconfigresponse,
        400: PayPerCrawlApierrorresponse,
      },
    })
    .summary("Changes pay-per-crawl config for a zone")
    .description("Changes the pay-per-crawl config for a zone.")
    .operationId("pay-per-crawl.patchConfig")
    .tag("ppc_config")
    .security({ api_email: [], api_key: [] })
    .extension("x-api-token-group", ["Zone Settings Write"])
}

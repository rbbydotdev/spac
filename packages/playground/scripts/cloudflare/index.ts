import { Api } from "spac"
import { registerAbuseReports } from "./abuse-reports"
import { registerAccess } from "./access"
import { registerAccounts } from "./accounts"
import { registerAccountsOrZones } from "./accounts-or-zones"
import { registerAcm } from "./acm"
import { registerActivationCheck } from "./activation-check"
import { registerAddressing } from "./addressing"
import { registerAi } from "./ai"
import { registerAiGateway } from "./ai-gateway"
import { registerAlerting } from "./alerting"
import { registerAnalytics } from "./analytics"
import { registerApiGateway } from "./api-gateway"
import { registerArgo } from "./argo"
import { registerAuditLogs } from "./audit-logs"
import { registerAutorag } from "./autorag"
import { registerAvailablePlans } from "./available-plans"
import { registerAvailableRatePlans } from "./available-rate-plans"
import { registerBilling } from "./billing"
import { registerBotManagement } from "./bot-management"
import { registerBotnetFeed } from "./botnet-feed"
import { registerBrandProtection } from "./brand-protection"
import { registerBrowserRendering } from "./browser-rendering"
import { registerBuilds } from "./builds"
import { registerCache } from "./cache"
import { registerCalls } from "./calls"
import { registerCertificateAuthorities } from "./certificate-authorities"
import { registerCertificates } from "./certificates"
import { registerCfdTunnel } from "./cfd-tunnel"
import { registerChallenges } from "./challenges"
import { registerClientCertificates } from "./client-certificates"
import { registerCloudConnector } from "./cloud-connector"
import { registerCloudforceOne } from "./cloudforce-one"
import { registerCni } from "./cni"
import { registerConfigs } from "./configs"
import { registerConnectivity } from "./connectivity"
import { registerContentUploadScan } from "./content-upload-scan"
import { registerCustomCertificates } from "./custom-certificates"
import { registerCustomHostnames } from "./custom-hostnames"
import { registerCustomNs } from "./custom-ns"
import { registerD1 } from "./d1"
import { registerDcvDelegation } from "./dcv-delegation"
import { registerDevices } from "./devices"
import { registerDex } from "./dex"
import { registerDiagnostics } from "./diagnostics"
import { registerDlp } from "./dlp"
import { registerDnsAnalytics } from "./dns-analytics"
import { registerDnsFirewall } from "./dns-firewall"
import { registerDnsRecords } from "./dns-records"
import { registerDnsSettings } from "./dns-settings"
import { registerDnssec } from "./dnssec"
import { registerEmail } from "./email"
import { registerEmailSecurity } from "./email-security"
import { registerEventNotifications } from "./event-notifications"
import { registerEventSubscriptions } from "./event-subscriptions"
import { registerFilters } from "./filters"
import { registerFirewall } from "./firewall"
import { registerGateway } from "./gateway"
import { registerHealthchecks } from "./healthchecks"
import { registerHold } from "./hold"
import { registerHostnames } from "./hostnames"
import { registerHyperdrive } from "./hyperdrive"
import { registerIam } from "./iam"
import { registerImages } from "./images"
import { registerInfrastructure } from "./infrastructure"
import { registerIntel } from "./intel"
import { registerInternal } from "./internal"
import { registerIps } from "./ips"
import { registerKeylessCertificates } from "./keyless-certificates"
import { registerLeakedCredentialChecks } from "./leaked-credential-checks"
import { registerLive } from "./live"
import { registerLoadBalancers } from "./load-balancers"
import { registerLogpush } from "./logpush"
import { registerLogs } from "./logs"
import { registerMagic } from "./magic"
import { registerManagedHeaders } from "./managed-headers"
import { registerMembers } from "./members"
import { registerMemberships } from "./memberships"
import { registerMnm } from "./mnm"
import { registerMove } from "./move"
import { registerMtlsCertificates } from "./mtls-certificates"
import { registerOrganizations } from "./organizations"
import { registerOriginTlsClientAuth } from "./origin-tls-client-auth"
import { registerPageShield } from "./page-shield"
import { registerPagerules } from "./pagerules"
import { registerPages } from "./pages"
import { registerPayPerCrawl } from "./pay-per-crawl"
import { registerPcaps } from "./pcaps"
import { registerPipelines } from "./pipelines"
import { registerProfile } from "./profile"
import { registerPurgeCache } from "./purge-cache"
import { registerQueues } from "./queues"
import { registerR2 } from "./r2"
import { registerRadar } from "./radar"
import { registerRateLimits } from "./rate-limits"
import { registerReady } from "./ready"
import { registerRealtimekit } from "./realtimekit"
import { registerRegistrar } from "./registrar"
import { registerRequestTracer } from "./request-tracer"
import { registerRoles } from "./roles"
import { registerRules } from "./rules"
import { registerRum } from "./rum"
import { registerSchemaValidation } from "./schema-validation"
import { registerSecondaryDns } from "./secondary-dns"
import { registerSecretsStore } from "./secrets-store"
import { registerSecurityCenter } from "./security-center"
import { registerSettings } from "./settings"
import { registerShares } from "./shares"
import { registerSignedUrl } from "./signed-url"
import { registerSlurper } from "./slurper"
import { registerSmartShield } from "./smart-shield"
import { registerSnippets } from "./snippets"
import { registerSpectrum } from "./spectrum"
import { registerSpeedApi } from "./speed-api"
import { registerSsl } from "./ssl"
import { registerSsoConnectors } from "./sso-connectors"
import { registerStorage } from "./storage"
import { registerStream } from "./stream"
import { registerSubscription } from "./subscription"
import { registerSubscriptions } from "./subscriptions"
import { registerTeamnet } from "./teamnet"
import { registerTenants } from "./tenants"
import { registerTokens } from "./tokens"
import { registerTunnels } from "./tunnels"
import { registerUrlNormalization } from "./url-normalization"
import { registerUrlscanner } from "./urlscanner"
import { registerUser } from "./user"
import { registerUsers } from "./users"
import { registerVectorize } from "./vectorize"
import { registerWaitingRooms } from "./waiting-rooms"
import { registerWarpConnector } from "./warp-connector"
import { registerWeb3 } from "./web3"
import { registerWorkers } from "./workers"
import { registerWorkflows } from "./workflows"
import { registerZerotrust } from "./zerotrust"
import { registerZones } from "./zones"
import { registerZtRiskScoring } from "./zt-risk-scoring"

export const api = new Api("3.1", "Cloudflare API", {
  debug: true,
  version: "4.0.0",
  description:
    "Welcome to Cloudflare's API documentation site. We are experimenting with an updated version of our API documentation - check out [developers.cloudflare.com/api-next/](https://developers.cloudflare.com/api-next/) to test out the new experience.\n\nTo get started using Cloudflare's products and services via the API, refer to [how to interact with Cloudflare](https://developers.cloudflare.com/fundamentals/basic-tasks/interact-with-cloudflare/), which covers using tools like [Terraform](https://developers.cloudflare.com/terraform/#cloudflare-terraform) and the [official SDKs](https://developers.cloudflare.com/fundamentals/api/reference/sdks/) to maintain your Cloudflare resources.\n\nUsing the Cloudflare API requires authentication so that Cloudflare knows who is making requests and what permissions you have. Create an API token to grant access to the API to perform actions. You can also authenticate with [API keys](https://developers.cloudflare.com/fundamentals/api/get-started/keys/), but these keys have [several limitations](https://developers.cloudflare.com/fundamentals/api/get-started/keys/#limitations) that make them less secure than API tokens. Whenever possible, use API tokens to interact with the Cloudflare API.\n\nTo create an API token, from the Cloudflare dashboard, go to My Profile > API Tokens and select Create Token. For more information on how to create and troubleshoot API tokens, refer to\nour [API fundamentals](https://developers.cloudflare.com/fundamentals/api/).\n\nFor information regarding rate limits, refer to our [API Rate Limits](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/platform/limits/#api-rate-limits).\n\nTotally new to Cloudflare? [Start here](https://developers.cloudflare.com/fundamentals/get-started/).",
  license: { name: "BSD-3-Clause", url: "https://opensource.org/licenses/BSD-3-Clause" },
})

api.server({ url: "https://api.cloudflare.com/client/v4", description: "Client API" })
api.securityScheme("api_email", {
  in: "header",
  name: "X-Auth-Email",
  type: "apiKey",
  description:
    "The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.",
})
api.securityScheme("api_key", {
  in: "header",
  name: "X-Auth-Key",
  type: "apiKey",
  description:
    "The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.",
})
api.securityScheme("api_token", {
  scheme: "bearer",
  type: "http",
  description:
    "The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).",
})
api.securityScheme("user_service_key", {
  in: "header",
  name: "X-Auth-User-Service-Key",
  type: "apiKey",
  description:
    "Used when interacting with the Origin CA certificates API. [View/change your key](https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys/#viewchange-your-origin-ca-keys).",
})

api.security({ api_email: [], api_key: [] })
api.security("api_token")
api.security("user_service_key")

registerAbuseReports(api)
registerAccess(api)
registerAccounts(api)
registerAccountsOrZones(api)
registerAcm(api)
registerActivationCheck(api)
registerAddressing(api)
registerAi(api)
registerAiGateway(api)
registerAlerting(api)
registerAnalytics(api)
registerApiGateway(api)
registerArgo(api)
registerAuditLogs(api)
registerAutorag(api)
registerAvailablePlans(api)
registerAvailableRatePlans(api)
registerBilling(api)
registerBotManagement(api)
registerBotnetFeed(api)
registerBrandProtection(api)
registerBrowserRendering(api)
registerBuilds(api)
registerCache(api)
registerCalls(api)
registerCertificateAuthorities(api)
registerCertificates(api)
registerCfdTunnel(api)
registerChallenges(api)
registerClientCertificates(api)
registerCloudConnector(api)
registerCloudforceOne(api)
registerCni(api)
registerConfigs(api)
registerConnectivity(api)
registerContentUploadScan(api)
registerCustomCertificates(api)
registerCustomHostnames(api)
registerCustomNs(api)
registerD1(api)
registerDcvDelegation(api)
registerDevices(api)
registerDex(api)
registerDiagnostics(api)
registerDlp(api)
registerDnsAnalytics(api)
registerDnsFirewall(api)
registerDnsRecords(api)
registerDnsSettings(api)
registerDnssec(api)
registerEmail(api)
registerEmailSecurity(api)
registerEventNotifications(api)
registerEventSubscriptions(api)
registerFilters(api)
registerFirewall(api)
registerGateway(api)
registerHealthchecks(api)
registerHold(api)
registerHostnames(api)
registerHyperdrive(api)
registerIam(api)
registerImages(api)
registerInfrastructure(api)
registerIntel(api)
registerInternal(api)
registerIps(api)
registerKeylessCertificates(api)
registerLeakedCredentialChecks(api)
registerLive(api)
registerLoadBalancers(api)
registerLogpush(api)
registerLogs(api)
registerMagic(api)
registerManagedHeaders(api)
registerMembers(api)
registerMemberships(api)
registerMnm(api)
registerMove(api)
registerMtlsCertificates(api)
registerOrganizations(api)
registerOriginTlsClientAuth(api)
registerPageShield(api)
registerPagerules(api)
registerPages(api)
registerPayPerCrawl(api)
registerPcaps(api)
registerPipelines(api)
registerProfile(api)
registerPurgeCache(api)
registerQueues(api)
registerR2(api)
registerRadar(api)
registerRateLimits(api)
registerReady(api)
registerRealtimekit(api)
registerRegistrar(api)
registerRequestTracer(api)
registerRoles(api)
registerRules(api)
registerRum(api)
registerSchemaValidation(api)
registerSecondaryDns(api)
registerSecretsStore(api)
registerSecurityCenter(api)
registerSettings(api)
registerShares(api)
registerSignedUrl(api)
registerSlurper(api)
registerSmartShield(api)
registerSnippets(api)
registerSpectrum(api)
registerSpeedApi(api)
registerSsl(api)
registerSsoConnectors(api)
registerStorage(api)
registerStream(api)
registerSubscription(api)
registerSubscriptions(api)
registerTeamnet(api)
registerTenants(api)
registerTokens(api)
registerTunnels(api)
registerUrlNormalization(api)
registerUrlscanner(api)
registerUser(api)
registerUsers(api)
registerVectorize(api)
registerWaitingRooms(api)
registerWarpConnector(api)
registerWeb3(api)
registerWorkers(api)
registerWorkflows(api)
registerZerotrust(api)
registerZones(api)
registerZtRiskScoring(api)

const spec = api.emit()
console.log(JSON.stringify(spec, null, 2))

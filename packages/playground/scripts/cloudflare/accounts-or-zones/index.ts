import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  AccessApiResponseCommonFailure,
  AccessAppPoliciesComponentsSchemasResponseCollection,
  AccessCreateResponse,
  AccessDuration,
  AccessIdResponse,
  AccessSchemasName,
  AccessSchemasSingleResponse,
  AccessUuid,
  D1Messages,
  DlpMessages,
  FirewallConfiguration,
  FirewallNotes,
  FirewallResultInfo,
  FirewallRuleIdentifier,
  FirewallSchemasMode,
  RulesetsErrors,
  RulesetsMessages,
  SecurityCenterApiResponseCommonFailure,
  SecurityCenterApiResponseSingle,
  SecurityCenterCount,
  SecurityCenterDismissed,
  SecurityCenterIssue,
  SecurityCenterIssueclasses,
  SecurityCenterIssuetypes,
  SecurityCenterPage,
  SecurityCenterPerpage,
  SecurityCenterProducts,
  SecurityCenterSeverityqueryparam,
  SecurityCenterSubjects,
  SecurityCenterValuecountsresponse,
} from "../shared/schemas"
import {
  AccessAllowAuthenticateViaWarp,
  AccessAppId,
  AccessAppPoliciesComponentsSchemasSingleResponse,
  AccessAppPolicyRequest,
  AccessAppRequest,
  AccessAppResponse,
  AccessAppSettingsRequest,
  AccessAppsComponentsSchemasResponseCollection,
  AccessAppsComponentsSchemasSingleResponse,
  AccessAssociatedHostnames,
  AccessAuthDomain,
  AccessAutoRedirectToIdentity,
  AccessCaComponentsSchemasResponseCollection,
  AccessCaComponentsSchemasSingleResponse,
  AccessCertificatesComponentsSchemasName,
  AccessCertificatesComponentsSchemasResponseCollection,
  AccessCertificatesComponentsSchemasSingleResponse,
  AccessClientSecretVersion,
  AccessComponentsSchemasResponseCollection,
  AccessComponentsSchemasSingleResponse,
  AccessCustomPages,
  AccessEmptyResponse,
  AccessExclude,
  AccessGroupsComponentsSchemasName,
  AccessGroupsComponentsSchemasSingleResponse,
  AccessIdentityProviders,
  AccessInclude,
  AccessIsDefault,
  AccessIsUiReadOnly,
  AccessLoginDesign,
  AccessName,
  AccessPolicyCheckResponse,
  AccessPreviousClientSecretExpiresAt,
  AccessRequire,
  AccessResponseCollection,
  AccessResponseCollectionHostnames,
  AccessSchemasEmptyResponse,
  AccessSchemasIdResponse,
  AccessSchemasResponseCollection,
  AccessSessionDuration,
  AccessSettings,
  AccessSingleResponse,
  AccessSingleResponseUpdate,
  AccessUiReadOnlyToggleReason,
  AccessUserSeatExpirationInactiveTime,
  AccessWarpAuthSessionDuration,
  CustomPagesCustomPageResult,
  CustomPagesCustomPageResultList,
  CustomPagesErrorPageType,
  CustomPagesState,
  CustomPagesUrl,
  FirewallApiResponseSingleId,
  FirewallResponseCollection,
  FirewallResponseSingle,
  FirewallSchemasRule,
  LogpushApiResponseCommonFailure,
  LogpushDataset,
  LogpushDestinationConf,
  LogpushDestinationExistsResponse,
  LogpushEnabled,
  LogpushFilter,
  LogpushFrequency,
  LogpushGetOwnershipResponse,
  LogpushId,
  LogpushKind,
  LogpushLogpullOptions,
  LogpushLogpushFieldResponseCollection,
  LogpushLogpushJobResponseCollection,
  LogpushLogpushJobResponseSingle,
  LogpushMaxUploadBytes,
  LogpushMaxUploadIntervalSeconds,
  LogpushMaxUploadRecords,
  LogpushName,
  LogpushOutputOptions,
  LogpushOwnershipChallenge,
  LogpushValidateOwnershipResponse,
  LogpushValidateResponse,
  RulesetsBlockrule,
  RulesetsChallengerule,
  RulesetsCompressresponserule,
  RulesetsCursor,
  RulesetsDdosdynamicrule,
  RulesetsExecuterule,
  RulesetsForceconnectioncloserule,
  RulesetsJschallengerule,
  RulesetsLogcustomfieldrule,
  RulesetsLogrule,
  RulesetsManagedchallengerule,
  RulesetsPerpage,
  RulesetsRedirectrule,
  RulesetsRequestrules,
  RulesetsResponserules,
  RulesetsResultinfo,
  RulesetsRewriterule,
  RulesetsRouterule,
  RulesetsRulecategory,
  RulesetsRuleid,
  RulesetsRulesetid,
  RulesetsRulesetkind,
  RulesetsRulesetphase,
  RulesetsRulesetversion,
  RulesetsScorerule,
  RulesetsServeerrorrule,
  RulesetsSetcachesettingsrule,
  RulesetsSetconfigrule,
  RulesetsSkiprule,
  WaitingroomResponseCollection,
} from "./schemas"

export function registerAccountsOrZones(api: Api) {
  api.assertVersion("3.0.3", "AccountsOrZones")

  api.group(
    "/{accounts_or_zones}/{account_or_zone_id}",
    { params: Type.Object({ accounts_or_zones: Type.String(), account_or_zone_id: Type.String() }) },
    (g) => {
      g.get("/custom_pages", {})
        .response(CustomPagesCustomPageResultList)
        .error(
          "4xx",
          Type.Object({
            errors: DlpMessages,
            messages: DlpMessages,
            success: Type.Union([Type.Literal(true), Type.Literal(false)], {
              description: "Whether the API call was successful.",
            }),
            result_info: Type.Optional(
              Type.Object({
                count: Type.Optional(
                  Type.Number({ description: "Total number of results for the requested service." }),
                ),
                page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
                per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
                total_count: Type.Optional(
                  Type.Number({ description: "Total results available without any search parameters." }),
                ),
              }),
            ),
            result: Type.Union([Type.Null()]),
          }),
        )
        .summary("List custom pages")
        .description("Fetches all the custom pages.")
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Zero Trust: PII Read",
          "Account Custom Pages Write",
          "Account Custom Pages Read",
          "Account Settings Write",
          "Account Settings Read",
        ])
        .extension("x-cfPermissionsRequired", { enum: ["#organization:read"] })
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

      g.get("/custom_pages/{identifier}", {
        params: Type.Object({ identifier: CustomPagesErrorPageType }),
      })
        .response(CustomPagesCustomPageResult)
        .error(
          "4xx",
          Type.Object({
            errors: DlpMessages,
            messages: DlpMessages,
            success: Type.Union([Type.Literal(true), Type.Literal(false)], {
              description: "Whether the API call was successful.",
            }),
            result: Type.Union([Type.Null()]),
          }),
        )
        .summary("Get a custom page")
        .description("Fetches the details of a custom page.")
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Zero Trust: PII Read",
          "Account Custom Pages Write",
          "Account Custom Pages Read",
          "Account Settings Write",
          "Account Settings Read",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

      g.put("/custom_pages/{identifier}", {
        params: Type.Object({ identifier: CustomPagesErrorPageType }),
        body: Type.Object({
          state: CustomPagesState,
          url: CustomPagesUrl,
        }),
      })
        .response(CustomPagesCustomPageResult)
        .error(
          "4xx",
          Type.Object({
            errors: DlpMessages,
            messages: DlpMessages,
            success: Type.Union([Type.Literal(true), Type.Literal(false)], {
              description: "Whether the API call was successful.",
            }),
            result: Type.Union([Type.Null()]),
          }),
        )
        .summary("Update a custom page")
        .description("Updates the configuration of an existing custom page.")
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Account Custom Pages Write", "Account Settings Write"])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: true })

      g.get("/access/apps", {
        query: Type.Object({
          name: Type.Optional(Type.String({ description: "The name of the app." })),
          domain: Type.Optional(Type.String({ description: "The domain of the app." })),
          aud: Type.Optional(Type.String({ description: "The aud of the app." })),
          exact: Type.Optional(
            Type.Boolean({
              description: "True for only exact string matches against passed name/domain query parameters.",
            }),
          ),
          search: Type.Optional(Type.String({ description: "Search for apps by other listed query parameters." })),
          page: Type.Optional(Type.Integer({ description: "Page number of results.", default: 1 })),
          per_page: Type.Optional(Type.Integer({ description: "Number of results per page.", default: 1000 })),
        }),
      })
        .response(AccessAppsComponentsSchemasResponseCollection)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("List Access applications")
        .description("Lists all Access applications in an account or zone.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Access: Apps and Policies Revoke",
          "Access: Apps and Policies Write",
          "Access: Apps and Policies Read",
        ])

      g.post("/access/apps", {
        body: AccessAppRequest,
      })
        .respond(
          201,
          Type.Object({
            errors: DlpMessages,
            messages: DlpMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(AccessAppResponse),
          }),
        )
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Add an Access application")
        .description("Adds a new application to Access.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Apps and Policies Write"])

      g.get("/access/apps/ca", {
        query: Type.Object({
          page: Type.Optional(Type.Integer({ description: "Page number of results.", default: 1 })),
          per_page: Type.Optional(Type.Integer({ description: "Number of results per page.", default: 100 })),
        }),
      })
        .response(AccessCaComponentsSchemasResponseCollection)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("List short-lived certificate CAs")
        .description("Lists short-lived certificate CAs and their public keys.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Apps and Policies Write", "Access: Apps and Policies Read"])

      g.get("/access/apps/{app_id}", {
        params: Type.Object({ app_id: AccessAppId }),
      })
        .response(AccessAppsComponentsSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Get an Access application")
        .description("Fetches information about an Access application.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Apps and Policies Write", "Access: Apps and Policies Read"])

      g.put("/access/apps/{app_id}", {
        params: Type.Object({ app_id: AccessAppId }),
        body: AccessAppRequest,
      })
        .response(
          Type.Object({
            errors: DlpMessages,
            messages: DlpMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(AccessAppResponse),
          }),
        )
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Update an Access application")
        .description("Updates an Access application.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Apps and Policies Write"])

      g.delete("/access/apps/{app_id}", {
        params: Type.Object({ app_id: AccessAppId }),
      })
        .respond(202, AccessIdResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Delete an Access application")
        .description("Deletes an application from Access.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Apps and Policies Write"])

      g.get("/access/apps/{app_id}/ca", {
        params: Type.Object({ app_id: AccessUuid }),
      })
        .response(AccessCaComponentsSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Get a short-lived certificate CA")
        .description("Fetches a short-lived certificate CA and its public key.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Apps and Policies Write", "Access: Apps and Policies Read"])

      g.post("/access/apps/{app_id}/ca", {
        params: Type.Object({ app_id: AccessUuid }),
      })
        .response(AccessCaComponentsSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Create a short-lived certificate CA")
        .description("Generates a new short-lived certificate CA and public key.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Apps and Policies Write"])

      g.delete("/access/apps/{app_id}/ca", {
        params: Type.Object({ app_id: AccessUuid }),
      })
        .respond(202, AccessSchemasIdResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Delete a short-lived certificate CA")
        .description("Deletes a short-lived certificate CA.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Apps and Policies Write"])

      g.get("/access/apps/{app_id}/policies", {
        params: Type.Object({ app_id: AccessUuid }),
        query: Type.Object({
          page: Type.Optional(Type.Integer({ description: "Page number of results.", default: 1 })),
          per_page: Type.Optional(Type.Integer({ description: "Number of results per page.", default: 200 })),
        }),
      })
        .response(AccessAppPoliciesComponentsSchemasResponseCollection)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("List Access application policies")
        .description(
          "Lists Access policies configured for an application. Returns both exclusively scoped and reusable policies used by the application.",
        )
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Apps and Policies Write", "Access: Apps and Policies Read"])

      g.post("/access/apps/{app_id}/policies", {
        params: Type.Object({ app_id: AccessUuid }),
        body: AccessAppPolicyRequest,
      })
        .respond(201, AccessAppPoliciesComponentsSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Create an Access application policy")
        .description(
          "Creates a policy applying exclusive to a single application that defines the users or groups who can reach it. We recommend creating a reusable policy instead and subsequently referencing its ID in the application's 'policies' array.",
        )
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Apps and Policies Write"])

      g.get("/access/apps/{app_id}/policies/{policy_id}", {
        params: Type.Object({ app_id: AccessUuid, policy_id: AccessUuid }),
      })
        .response(AccessAppPoliciesComponentsSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Get an Access application policy")
        .description(
          "Fetches a single Access policy configured for an application. Returns both exclusively owned and reusable policies used by the application.",
        )
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Apps and Policies Write", "Access: Apps and Policies Read"])

      g.put("/access/apps/{app_id}/policies/{policy_id}", {
        params: Type.Object({ app_id: AccessUuid, policy_id: AccessUuid }),
        body: AccessAppPolicyRequest,
      })
        .response(AccessAppPoliciesComponentsSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Update an Access application policy")
        .description(
          "Updates an Access policy specific to an application. To update a reusable policy, use the /account or zones/{account or zone_id}/policies/{uid} endpoint.",
        )
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Apps and Policies Write"])

      g.delete("/access/apps/{app_id}/policies/{policy_id}", {
        params: Type.Object({ app_id: AccessUuid, policy_id: AccessUuid }),
      })
        .respond(202, AccessIdResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Delete an Access application policy")
        .description(
          "Deletes an Access policy specific to an application. To delete a reusable policy, use the /account or zones/{account or zone_id}/policies/{uid} endpoint.",
        )
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Apps and Policies Write"])

      g.post("/access/apps/{app_id}/revoke_tokens", {
        params: Type.Object({ app_id: AccessAppId }),
      })
        .respond(202, AccessSchemasEmptyResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Revoke application tokens")
        .description("Revokes all tokens issued for an application.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Apps and Policies Revoke", "Access: Apps and Policies Write"])

      g.put("/access/apps/{app_id}/settings", {
        params: Type.Object({ app_id: AccessAppId }),
        body: AccessAppSettingsRequest,
      })
        .respond(202, AccessSingleResponseUpdate)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Update Access application settings")
        .description("Updates Access application settings.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Apps and Policies Write"])

      g.patch("/access/apps/{app_id}/settings", {
        params: Type.Object({ app_id: AccessAppId }),
        body: AccessAppSettingsRequest,
      })
        .respond(202, AccessSingleResponseUpdate)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Update Access application settings")
        .description("Updates Access application settings.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.get("/access/apps/{app_id}/user_policy_checks", {
        params: Type.Object({ app_id: AccessAppId }),
      })
        .response(AccessPolicyCheckResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Test Access policies")
        .description("Tests if a specific user has permission to access an application.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Apps and Policies Write", "Access: Apps and Policies Read"])

      g.get("/access/certificates", {
        query: Type.Object({
          page: Type.Optional(Type.Integer({ description: "Page number of results.", default: 1 })),
          per_page: Type.Optional(Type.Integer({ description: "Number of results per page.", default: 50 })),
        }),
      })
        .response(AccessCertificatesComponentsSchemasResponseCollection)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("List mTLS certificates")
        .description("Lists all mTLS root certificates.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Access: Mutual TLS Certificates Write",
          "Access: Mutual TLS Certificates Read",
        ])

      g.post("/access/certificates", {
        body: Type.Object({
          associated_hostnames: Type.Optional(AccessAssociatedHostnames),
          certificate: Type.String({ description: "The certificate content." }),
          name: AccessCertificatesComponentsSchemasName,
        }),
      })
        .respond(201, AccessCertificatesComponentsSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Add an mTLS certificate")
        .description("Adds a new mTLS root certificate to Access.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Mutual TLS Certificates Write"])

      g.get("/access/certificates/settings", {})
        .response(AccessResponseCollectionHostnames)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("List all mTLS hostname settings")
        .description("List all mTLS hostname settings for this account or zone.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Access: Mutual TLS Certificates Write",
          "Access: Mutual TLS Certificates Read",
        ])

      g.put("/access/certificates/settings", {
        body: Type.Object({
          settings: Type.Array(AccessSettings),
        }),
      })
        .respond(202, AccessResponseCollectionHostnames)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Update an mTLS certificate's hostname settings")
        .description("Updates an mTLS certificate's hostname settings.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Mutual TLS Certificates Write"])

      g.get("/access/certificates/{certificate_id}", {
        params: Type.Object({ certificate_id: AccessUuid }),
      })
        .response(AccessCertificatesComponentsSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Get an mTLS certificate")
        .description("Fetches a single mTLS certificate.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Access: Mutual TLS Certificates Write",
          "Access: Mutual TLS Certificates Read",
        ])

      g.put("/access/certificates/{certificate_id}", {
        params: Type.Object({ certificate_id: AccessUuid }),
        body: Type.Object({
          associated_hostnames: AccessAssociatedHostnames,
          name: Type.Optional(AccessCertificatesComponentsSchemasName),
        }),
      })
        .response(AccessCertificatesComponentsSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Update an mTLS certificate")
        .description("Updates a configured mTLS certificate.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Mutual TLS Certificates Write"])

      g.delete("/access/certificates/{certificate_id}", {
        params: Type.Object({ certificate_id: AccessUuid }),
      })
        .response(AccessIdResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Delete an mTLS certificate")
        .description("Deletes an mTLS certificate.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Mutual TLS Certificates Write"])

      g.get("/access/groups", {
        query: Type.Object({
          name: Type.Optional(Type.String({ description: "The name of the group." })),
          search: Type.Optional(Type.String({ description: "Search for groups by other listed query parameters." })),
          page: Type.Optional(Type.Integer({ description: "Page number of results.", default: 1 })),
          per_page: Type.Optional(Type.Integer({ description: "Number of results per page.", default: 1000 })),
        }),
      })
        .response(AccessSchemasResponseCollection)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("List Access groups")
        .description("Lists all Access groups.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Access: Organizations, Identity Providers, and Groups Write",
          "Access: Organizations, Identity Providers, and Groups Read",
        ])

      g.post("/access/groups", {
        body: Type.Object({
          exclude: Type.Optional(AccessExclude),
          include: AccessInclude,
          is_default: Type.Optional(AccessIsDefault),
          name: AccessGroupsComponentsSchemasName,
          require: Type.Optional(AccessRequire),
        }),
      })
        .respond(201, AccessGroupsComponentsSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Create an Access group")
        .description("Creates a new Access group.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Organizations, Identity Providers, and Groups Write"])

      g.get("/access/groups/{group_id}", {
        params: Type.Object({ group_id: AccessUuid }),
      })
        .response(AccessGroupsComponentsSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Get an Access group")
        .description("Fetches a single Access group.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Access: Organizations, Identity Providers, and Groups Write",
          "Access: Organizations, Identity Providers, and Groups Read",
        ])

      g.put("/access/groups/{group_id}", {
        params: Type.Object({ group_id: AccessUuid }),
        body: Type.Object({
          exclude: Type.Optional(AccessExclude),
          include: AccessInclude,
          is_default: Type.Optional(AccessIsDefault),
          name: AccessGroupsComponentsSchemasName,
          require: Type.Optional(AccessRequire),
        }),
      })
        .response(AccessGroupsComponentsSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Update an Access group")
        .description("Updates a configured Access group.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Organizations, Identity Providers, and Groups Write"])

      g.delete("/access/groups/{group_id}", {
        params: Type.Object({ group_id: AccessUuid }),
      })
        .respond(202, AccessIdResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Delete an Access group")
        .description("Deletes an Access group.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Organizations, Identity Providers, and Groups Write"])

      g.get("/access/identity_providers", {
        query: Type.Object({
          scim_enabled: Type.Optional(
            Type.String({
              description:
                "Indicates to Access to only retrieve identity providers that have the System for Cross-Domain Identity Management (SCIM) enabled.",
            }),
          ),
          page: Type.Optional(Type.Integer({ description: "Page number of results.", default: 1 })),
          per_page: Type.Optional(Type.Integer({ description: "Number of results per page.", default: 200 })),
        }),
      })
        .response(AccessResponseCollection)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("List Access identity providers")
        .description("Lists all configured identity providers.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Access: Organizations, Identity Providers, and Groups Write",
          "Access: Organizations, Identity Providers, and Groups Read",
        ])

      g.post("/access/identity_providers", {
        body: AccessIdentityProviders,
      })
        .respond(201, AccessComponentsSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Add an Access identity provider")
        .description("Adds a new identity provider to Access.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Organizations, Identity Providers, and Groups Write"])

      g.get("/access/identity_providers/{identity_provider_id}", {
        params: Type.Object({ identity_provider_id: AccessUuid }),
      })
        .response(AccessComponentsSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Get an Access identity provider")
        .description("Fetches a configured identity provider.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Access: Organizations, Identity Providers, and Groups Write",
          "Access: Organizations, Identity Providers, and Groups Read",
        ])

      g.put("/access/identity_providers/{identity_provider_id}", {
        params: Type.Object({ identity_provider_id: AccessUuid }),
        body: AccessIdentityProviders,
      })
        .response(AccessComponentsSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Update an Access identity provider")
        .description("Updates a configured identity provider.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Organizations, Identity Providers, and Groups Write"])

      g.delete("/access/identity_providers/{identity_provider_id}", {
        params: Type.Object({ identity_provider_id: AccessUuid }),
      })
        .respond(202, AccessIdResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Delete an Access identity provider")
        .description("Deletes an identity provider from Access.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Organizations, Identity Providers, and Groups Write"])

      g.get("/access/organizations", {})
        .response(AccessSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Get your Zero Trust organization")
        .description("Returns the configuration for your Zero Trust organization.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Access: Organizations, Identity Providers, and Groups Revoke",
          "Access: Organizations, Identity Providers, and Groups Write",
          "Access: Organizations, Identity Providers, and Groups Read",
        ])

      g.post("/access/organizations", {
        body: Type.Object({
          allow_authenticate_via_warp: Type.Optional(AccessAllowAuthenticateViaWarp),
          auth_domain: AccessAuthDomain,
          auto_redirect_to_identity: Type.Optional(AccessAutoRedirectToIdentity),
          is_ui_read_only: Type.Optional(AccessIsUiReadOnly),
          login_design: Type.Optional(AccessLoginDesign),
          name: AccessName,
          session_duration: Type.Optional(AccessSessionDuration),
          ui_read_only_toggle_reason: Type.Optional(AccessUiReadOnlyToggleReason),
          user_seat_expiration_inactive_time: Type.Optional(AccessUserSeatExpirationInactiveTime),
          warp_auth_session_duration: Type.Optional(AccessWarpAuthSessionDuration),
        }),
      })
        .respond(201, AccessSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Create your Zero Trust organization")
        .description("Sets up a Zero Trust organization for your account or zone.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Organizations, Identity Providers, and Groups Write"])

      g.put("/access/organizations", {
        body: Type.Object({
          allow_authenticate_via_warp: Type.Optional(AccessAllowAuthenticateViaWarp),
          auth_domain: Type.Optional(AccessAuthDomain),
          auto_redirect_to_identity: Type.Optional(AccessAutoRedirectToIdentity),
          custom_pages: Type.Optional(AccessCustomPages),
          is_ui_read_only: Type.Optional(AccessIsUiReadOnly),
          login_design: Type.Optional(AccessLoginDesign),
          name: Type.Optional(AccessName),
          session_duration: Type.Optional(AccessSessionDuration),
          ui_read_only_toggle_reason: Type.Optional(AccessUiReadOnlyToggleReason),
          user_seat_expiration_inactive_time: Type.Optional(AccessUserSeatExpirationInactiveTime),
          warp_auth_session_duration: Type.Optional(AccessWarpAuthSessionDuration),
        }),
      })
        .response(AccessSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Update your Zero Trust organization")
        .description("Updates the configuration for your Zero Trust organization.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Organizations, Identity Providers, and Groups Write"])

      g.post("/access/organizations/revoke_user", {
        query: Type.Object({
          devices: Type.Optional(Type.Boolean()),
        }),
        body: Type.Object({
          devices: Type.Optional(
            Type.Boolean({ description: "When set to `true`, all devices associated with the user will be revoked." }),
          ),
          email: Type.String({ description: "The email of the user to revoke." }),
          user_uid: Type.Optional(Type.String({ description: "The uuid of the user to revoke." })),
          warp_session_reauth: Type.Optional(
            Type.Boolean({
              description:
                "When set to `true`, the user will be required to re-authenticate to WARP for all Gateway policies that enforce a WARP client session duration. When `false`, the user’s WARP session will remain active",
            }),
          ),
        }),
      })
        .response(AccessEmptyResponse)
        .error("4xx", AccessApiResponseCommonFailure)
        .summary("Revoke all Access tokens for a user")
        .description("Revokes a user's access across all applications.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Organizations, Identity Providers, and Groups Write"])

      g.get("/access/service_tokens", {
        query: Type.Object({
          name: Type.Optional(Type.String({ description: "The name of the service token." })),
          search: Type.Optional(
            Type.String({ description: "Search for service tokens by other listed query parameters." }),
          ),
          page: Type.Optional(Type.Integer({ description: "Page number of results.", default: 1 })),
          per_page: Type.Optional(Type.Integer({ description: "Number of results per page.", default: 1000 })),
        }),
      })
        .response(AccessComponentsSchemasResponseCollection)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("List service tokens")
        .description("Lists all service tokens.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Service Tokens Write", "Access: Service Tokens Read"])

      g.post("/access/service_tokens", {
        body: Type.Object({
          client_secret_version: Type.Optional(AccessClientSecretVersion),
          duration: Type.Optional(AccessDuration),
          name: AccessSchemasName,
          previous_client_secret_expires_at: Type.Optional(AccessPreviousClientSecretExpiresAt),
        }),
      })
        .respond(201, AccessCreateResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Create a service token")
        .description(
          "Generates a new service token. **Note:** This is the only time you can get the Client Secret. If you lose the Client Secret, you will have to rotate the Client Secret or create a new service token.",
        )
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Service Tokens Write"])

      g.get("/access/service_tokens/{service_token_id}", {
        params: Type.Object({ service_token_id: AccessUuid }),
      })
        .response(AccessSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Get a service token")
        .description("Fetches a single service token.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Service Tokens Write", "Access: Service Tokens Read"])

      g.put("/access/service_tokens/{service_token_id}", {
        params: Type.Object({ service_token_id: AccessUuid }),
        body: Type.Object({
          client_secret_version: Type.Optional(AccessClientSecretVersion),
          duration: Type.Optional(AccessDuration),
          name: Type.Optional(AccessSchemasName),
          previous_client_secret_expires_at: Type.Optional(AccessPreviousClientSecretExpiresAt),
        }),
      })
        .response(AccessSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Update a service token")
        .description("Updates a configured service token.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Service Tokens Write"])

      g.delete("/access/service_tokens/{service_token_id}", {
        params: Type.Object({ service_token_id: AccessUuid }),
      })
        .response(AccessSchemasSingleResponse)
        .error("4XX", AccessApiResponseCommonFailure)
        .summary("Delete a service token")
        .description("Deletes a service token.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Access: Service Tokens Write"])

      g.get("/firewall/access_rules/rules", {
        query: Type.Object({
          mode: Type.Optional(FirewallSchemasMode),
          "configuration.target": Type.Optional(
            Type.Union([Type.Literal("ip"), Type.Literal("ip_range"), Type.Literal("asn"), Type.Literal("country")], {
              description: "Defines the target to search in existing rules.",
            }),
          ),
          "configuration.value": Type.Optional(
            Type.String({
              description:
                "Defines the target value to search for in existing rules: an IP address, an IP address range, or a country code, depending on the provided `configuration.target`.\nNotes: You can search for a single IPv4 address, an IP address range with a subnet of '/16' or '/24', or a two-letter ISO-3166-1 alpha-2 country code.",
            }),
          ),
          notes: Type.Optional(
            Type.String({
              description:
                "Defines the string to search for in the notes of existing IP Access rules.\nNotes: For example, the string 'attack' would match IP Access rules with notes 'Attack 26/02' and 'Attack 27/02'. The search is case insensitive.",
            }),
          ),
          match: Type.Optional(
            Type.Union([Type.Literal("any"), Type.Literal("all")], {
              description:
                "Defines the search requirements. When set to `all`, all the search requirements must match. When set to `any`, only one of the search requirements has to match.",
            }),
          ),
          page: Type.Optional(
            Type.Number({ description: "Defines the requested page within paginated list of results." }),
          ),
          per_page: Type.Optional(Type.Number({ description: "Defines the maximum number of results requested." })),
          order: Type.Optional(
            Type.Union(
              [Type.Literal("configuration.target"), Type.Literal("configuration.value"), Type.Literal("mode")],
              { description: "Defines the field used to sort returned rules." },
            ),
          ),
          direction: Type.Optional(
            Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
              description: "Defines the direction used to sort returned rules.",
            }),
          ),
        }),
      })
        .response(FirewallResponseCollection)
        .error(
          "4XX",
          Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            result: Type.Union([Type.Null()]),
            success: Type.Union([Type.Literal(true), Type.Literal(false)], {
              description: "Defines whether the API call was successful.",
            }),
            result_info: Type.Optional(FirewallResultInfo),
          }),
        )
        .summary("List IP Access rules")
        .description(
          "Fetches IP Access rules of an account or zone. These rules apply to all the zones in the account or zone. You can filter the results using several optional parameters.",
        )
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Account Firewall Access Rules Write", "Account Firewall Access Rules Read"])
        .extension("x-cfPermissionsRequired", { enum: ["#waf:read"] })
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.post("/firewall/access_rules/rules", {
        body: Type.Object({
          configuration: FirewallConfiguration,
          mode: FirewallSchemasMode,
          notes: Type.Optional(FirewallNotes),
        }),
      })
        .response(FirewallResponseSingle)
        .error(
          "4XX",
          Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            result: Type.Union([Type.Null()]),
            success: Type.Union([Type.Literal(true), Type.Literal(false)], {
              description: "Defines whether the API call was successful.",
            }),
          }),
        )
        .summary("Create an IP Access rule")
        .description(
          "Creates a new IP Access rule for an account or zone. The rule will apply to all zones in the account or zone.\n\nNote: To create an IP Access rule that applies to a single zone, refer to the [IP Access rules for a zone](#ip-access-rules-for-a-zone) endpoints.",
        )
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Account Firewall Access Rules Write"])
        .extension("x-cfPermissionsRequired", { enum: ["#waf:edit"] })
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.get("/firewall/access_rules/rules/{rule_id}", {
        params: Type.Object({ rule_id: FirewallRuleIdentifier }),
      })
        .response(FirewallResponseSingle)
        .error(
          "4XX",
          Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            result: Type.Union([Type.Null()]),
            success: Type.Union([Type.Literal(true), Type.Literal(false)], {
              description: "Defines whether the API call was successful.",
            }),
          }),
        )
        .summary("Get an IP Access rule")
        .description("Fetches the details of an IP Access rule defined.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Account Firewall Access Rules Write", "Account Firewall Access Rules Read"])
        .extension("x-cfPermissionsRequired", { enum: ["#waf:read"] })
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.patch("/firewall/access_rules/rules/{rule_id}", {
        params: Type.Object({ rule_id: FirewallRuleIdentifier }),
        body: FirewallSchemasRule,
      })
        .response(FirewallResponseSingle)
        .error(
          "4XX",
          Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            result: Type.Union([Type.Null()]),
            success: Type.Union([Type.Literal(true), Type.Literal(false)], {
              description: "Defines whether the API call was successful.",
            }),
          }),
        )
        .summary("Update an IP Access rule")
        .description(
          "Updates an IP Access rule defined.\n\nNote: This operation will affect all zones in the account or zone.",
        )
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Account Firewall Access Rules Write"])
        .extension("x-cfPermissionsRequired", { enum: ["#waf:edit"] })
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.delete("/firewall/access_rules/rules/{rule_id}", {
        params: Type.Object({ rule_id: FirewallRuleIdentifier }),
      })
        .response(FirewallApiResponseSingleId)
        .error(
          "4XX",
          Type.Object({
            errors: D1Messages,
            messages: D1Messages,
            result: Type.Union([Type.Null()]),
            success: Type.Union([Type.Literal(true), Type.Literal(false)], {
              description: "Defines whether the API call was successful.",
            }),
          }),
        )
        .summary("Delete an IP Access rule")
        .description(
          "Deletes an existing IP Access rule defined.\n\nNote: This operation will affect all zones in the account or zone.",
        )
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Account Firewall Access Rules Write"])
        .extension("x-cfPermissionsRequired", { enum: ["#waf:edit"] })
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.get("/logpush/datasets/{dataset_id}/fields", {
        params: Type.Object({ dataset_id: LogpushDataset }),
      })
        .response(LogpushLogpushFieldResponseCollection)
        .error("4XX", LogpushApiResponseCommonFailure)
        .summary("List fields")
        .description(
          "Lists all fields available for a dataset. The response result is. an object with key-value pairs, where keys are field names, and values are descriptions.",
        )
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Logs Read"])
        .extension("x-cfPermissionsRequired", { enum: ["#logs:read"] })
        .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

      g.get("/logpush/datasets/{dataset_id}/jobs", {
        params: Type.Object({ dataset_id: LogpushDataset }),
      })
        .response(LogpushLogpushJobResponseCollection)
        .error("4XX", LogpushApiResponseCommonFailure)
        .summary("List Logpush jobs for a dataset")
        .description("Lists Logpush jobs for an account or zone for a dataset.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Logs Write"])
        .extension("x-cfPermissionsRequired", { enum: ["#logs:edit"] })
        .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

      g.get("/logpush/jobs", {})
        .response(LogpushLogpushJobResponseCollection)
        .error("4XX", LogpushApiResponseCommonFailure)
        .summary("List Logpush jobs")
        .description("Lists Logpush jobs for an account or zone.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Logs Write"])
        .extension("x-cfPermissionsRequired", { enum: ["#logs:edit"] })
        .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

      g.post("/logpush/jobs", {
        body: Type.Object({
          dataset: Type.Optional(LogpushDataset),
          destination_conf: LogpushDestinationConf,
          enabled: Type.Optional(LogpushEnabled),
          filter: Type.Optional(LogpushFilter),
          frequency: Type.Optional(LogpushFrequency),
          kind: Type.Optional(LogpushKind),
          logpull_options: Type.Optional(LogpushLogpullOptions),
          max_upload_bytes: Type.Optional(LogpushMaxUploadBytes),
          max_upload_interval_seconds: Type.Optional(LogpushMaxUploadIntervalSeconds),
          max_upload_records: Type.Optional(LogpushMaxUploadRecords),
          name: Type.Optional(LogpushName),
          output_options: Type.Optional(LogpushOutputOptions),
          ownership_challenge: Type.Optional(LogpushOwnershipChallenge),
        }),
      })
        .response(LogpushLogpushJobResponseSingle)
        .error("4XX", LogpushApiResponseCommonFailure)
        .summary("Create Logpush job")
        .description("Creates a new Logpush job for an account or zone.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Logs Write"])
        .extension("x-cfPermissionsRequired", { enum: ["#logs:edit"] })
        .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

      g.get("/logpush/jobs/{job_id}", {
        params: Type.Object({ job_id: LogpushId }),
      })
        .response(LogpushLogpushJobResponseSingle)
        .error("4XX", LogpushApiResponseCommonFailure)
        .summary("Get Logpush job details")
        .description("Gets the details of a Logpush job.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Logs Write"])
        .extension("x-cfPermissionsRequired", { enum: ["#logs:edit"] })
        .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

      g.put("/logpush/jobs/{job_id}", {
        params: Type.Object({ job_id: LogpushId }),
        body: Type.Object({
          destination_conf: Type.Optional(LogpushDestinationConf),
          enabled: Type.Optional(LogpushEnabled),
          filter: Type.Optional(LogpushFilter),
          frequency: Type.Optional(LogpushFrequency),
          kind: Type.Optional(LogpushKind),
          logpull_options: Type.Optional(LogpushLogpullOptions),
          max_upload_bytes: Type.Optional(LogpushMaxUploadBytes),
          max_upload_interval_seconds: Type.Optional(LogpushMaxUploadIntervalSeconds),
          max_upload_records: Type.Optional(LogpushMaxUploadRecords),
          name: Type.Optional(LogpushName),
          output_options: Type.Optional(LogpushOutputOptions),
          ownership_challenge: Type.Optional(LogpushOwnershipChallenge),
        }),
      })
        .response(LogpushLogpushJobResponseSingle)
        .error("4XX", LogpushApiResponseCommonFailure)
        .summary("Update Logpush job")
        .description("Updates a Logpush job.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Logs Write"])
        .extension("x-cfPermissionsRequired", { enum: ["#logs:edit"] })
        .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

      g.delete("/logpush/jobs/{job_id}", {
        params: Type.Object({ job_id: LogpushId }),
      })
        .response(
          Type.Object({
            errors: DlpMessages,
            messages: DlpMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(
              Type.Object({
                id: Type.Optional(LogpushId),
              }),
            ),
          }),
        )
        .error("4XX", LogpushApiResponseCommonFailure)
        .summary("Delete Logpush job")
        .description("Deletes a Logpush job.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Logs Write"])
        .extension("x-cfPermissionsRequired", { enum: ["#logs:edit"] })
        .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

      g.post("/logpush/ownership", {
        body: Type.Object({
          destination_conf: LogpushDestinationConf,
        }),
      })
        .response(LogpushGetOwnershipResponse)
        .error("4XX", LogpushApiResponseCommonFailure)
        .summary("Get ownership challenge")
        .description("Gets a new ownership challenge sent to your destination.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Logs Write"])
        .extension("x-cfPermissionsRequired", { enum: ["#logs:edit"] })
        .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

      g.post("/logpush/ownership/validate", {
        body: Type.Object({
          destination_conf: LogpushDestinationConf,
          ownership_challenge: LogpushOwnershipChallenge,
        }),
      })
        .response(LogpushValidateOwnershipResponse)
        .error("4XX", LogpushApiResponseCommonFailure)
        .summary("Validate ownership challenge")
        .description("Validates ownership challenge of the destination.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Logs Write"])
        .extension("x-cfPermissionsRequired", { enum: ["#logs:edit"] })
        .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

      g.post("/logpush/validate/destination", {
        body: Type.Object({
          destination_conf: LogpushDestinationConf,
        }),
      })
        .response(LogpushValidateResponse)
        .error("4XX", LogpushApiResponseCommonFailure)
        .summary("Validate destination")
        .description("Validates destination.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Logs Write"])
        .extension("x-cfPermissionsRequired", { enum: ["#logs:edit"] })
        .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

      g.post("/logpush/validate/destination/exists", {
        body: Type.Object({
          destination_conf: LogpushDestinationConf,
        }),
      })
        .response(LogpushDestinationExistsResponse)
        .error("4XX", LogpushApiResponseCommonFailure)
        .summary("Check destination exists")
        .description("Checks if there is an existing job with a destination.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Logs Write"])
        .extension("x-cfPermissionsRequired", { enum: ["#logs:edit"] })
        .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

      g.post("/logpush/validate/origin", {
        body: Type.Object({
          logpull_options: LogpushLogpullOptions,
        }),
      })
        .response(LogpushValidateResponse)
        .error("4XX", LogpushApiResponseCommonFailure)
        .summary("Validate origin")
        .description("Validates logpull origin with logpull_options.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Logs Write"])
        .extension("x-cfPermissionsRequired", { enum: ["#logs:edit"] })
        .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

      g.get("/rulesets", {
        query: Type.Object({
          cursor: Type.Optional(RulesetsCursor),
          per_page: Type.Optional(RulesetsPerpage),
        }),
      })
        .response(
          Type.Object(
            {
              errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
              messages: RulesetsMessages,
              result: Type.Array(
                Type.Object(
                  {
                    description: Type.Optional(
                      Type.String({
                        description: "An informative description of the ruleset.",
                        default: "",
                        title: "Description",
                      }),
                    ),
                    id: RulesetsRulesetid,
                    last_updated: Type.String({
                      description: "The timestamp of when the ruleset was last modified.",
                      format: "date-time",
                      readOnly: true,
                      title: "Last Updated",
                    }),
                    name: Type.String({
                      description: "The human-readable name of the ruleset.",
                      minLength: 1,
                      title: "Name",
                    }),
                    version: RulesetsRulesetversion,
                    kind: RulesetsRulesetkind,
                    phase: RulesetsRulesetphase,
                  },
                  { description: "A ruleset object." },
                ),
                {
                  description:
                    "A list of rulesets. The returned information will not include the rules in each ruleset.",
                  title: "Rulesets",
                },
              ),
              success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
              result_info: Type.Optional(RulesetsResultinfo),
            },
            { description: "A response object." },
          ),
        )
        .error(
          "4XX",
          Type.Object(
            {
              errors: RulesetsErrors,
              messages: RulesetsMessages,
              result: Type.Union([Type.Null()], { description: "A result." }),
              success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .summary("List account or zone rulesets")
        .description("Fetches all rulesets.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Mass URL Redirects Write",
          "Mass URL Redirects Read",
          "Magic Firewall Write",
          "Magic Firewall Read",
          "L4 DDoS Managed Ruleset Write",
          "L4 DDoS Managed Ruleset Read",
          "Transform Rules Write",
          "Transform Rules Read",
          "Select Configuration Write",
          "Select Configuration Read",
          "Account WAF Write",
          "Account WAF Read",
          "Account Rulesets Read",
          "Account Rulesets Write",
          "Logs Write",
          "Logs Read",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.post("/rulesets", {
        body: Type.Object(
          {
            description: Type.Optional(
              Type.String({
                description: "An informative description of the ruleset.",
                default: "",
                title: "Description",
              }),
            ),
            id: RulesetsRulesetid,
            last_updated: Type.String({
              description: "The timestamp of when the ruleset was last modified.",
              format: "date-time",
              readOnly: true,
              title: "Last Updated",
            }),
            name: Type.String({ description: "The human-readable name of the ruleset.", minLength: 1, title: "Name" }),
            version: RulesetsRulesetversion,
            kind: RulesetsRulesetkind,
            phase: RulesetsRulesetphase,
            rules: Type.Optional(RulesetsRequestrules),
          },
          { description: "A ruleset object." },
        ),
      })
        .response(
          Type.Object(
            {
              errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
              messages: RulesetsMessages,
              result: Type.Object(
                {
                  description: Type.Optional(
                    Type.String({
                      description: "An informative description of the ruleset.",
                      default: "",
                      title: "Description",
                    }),
                  ),
                  id: RulesetsRulesetid,
                  last_updated: Type.String({
                    description: "The timestamp of when the ruleset was last modified.",
                    format: "date-time",
                    readOnly: true,
                    title: "Last Updated",
                  }),
                  name: Type.String({
                    description: "The human-readable name of the ruleset.",
                    minLength: 1,
                    title: "Name",
                  }),
                  version: RulesetsRulesetversion,
                  kind: RulesetsRulesetkind,
                  phase: RulesetsRulesetphase,
                  rules: RulesetsResponserules,
                },
                { description: "A ruleset object." },
              ),
              success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .error(
          "4XX",
          Type.Object(
            {
              errors: RulesetsErrors,
              messages: RulesetsMessages,
              result: Type.Union([Type.Null()], { description: "A result." }),
              success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .summary("Create an account or zone ruleset")
        .description("Creates a ruleset.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Mass URL Redirects Write",
          "Magic Firewall Write",
          "L4 DDoS Managed Ruleset Write",
          "Transform Rules Write",
          "Select Configuration Write",
          "Account WAF Write",
          "Account Rulesets Write",
          "Logs Write",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.get("/rulesets/phases/{ruleset_phase}/entrypoint", {
        params: Type.Object({ ruleset_phase: RulesetsRulesetphase }),
      })
        .response(
          Type.Object(
            {
              errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
              messages: RulesetsMessages,
              result: Type.Object(
                {
                  description: Type.Optional(
                    Type.String({
                      description: "An informative description of the ruleset.",
                      default: "",
                      title: "Description",
                    }),
                  ),
                  id: RulesetsRulesetid,
                  last_updated: Type.String({
                    description: "The timestamp of when the ruleset was last modified.",
                    format: "date-time",
                    readOnly: true,
                    title: "Last Updated",
                  }),
                  name: Type.String({
                    description: "The human-readable name of the ruleset.",
                    minLength: 1,
                    title: "Name",
                  }),
                  version: RulesetsRulesetversion,
                  kind: RulesetsRulesetkind,
                  phase: RulesetsRulesetphase,
                  rules: RulesetsResponserules,
                },
                { description: "A ruleset object." },
              ),
              success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .error(
          "4XX",
          Type.Object(
            {
              errors: RulesetsErrors,
              messages: RulesetsMessages,
              result: Type.Union([Type.Null()], { description: "A result." }),
              success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .summary("Get an account or zone entry point ruleset")
        .description("Fetches the latest version of the account or zone entry point ruleset for a given phase.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Mass URL Redirects Write",
          "Mass URL Redirects Read",
          "Magic Firewall Write",
          "Magic Firewall Read",
          "L4 DDoS Managed Ruleset Write",
          "L4 DDoS Managed Ruleset Read",
          "Transform Rules Write",
          "Transform Rules Read",
          "Select Configuration Write",
          "Select Configuration Read",
          "Account WAF Write",
          "Account WAF Read",
          "Account Rulesets Read",
          "Account Rulesets Write",
          "Logs Write",
          "Logs Read",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.put("/rulesets/phases/{ruleset_phase}/entrypoint", {
        params: Type.Object({ ruleset_phase: RulesetsRulesetphase }),
        body: Type.Object(
          {
            description: Type.Optional(
              Type.String({
                description: "An informative description of the ruleset.",
                default: "",
                title: "Description",
              }),
            ),
            id: RulesetsRulesetid,
            last_updated: Type.String({
              description: "The timestamp of when the ruleset was last modified.",
              format: "date-time",
              readOnly: true,
              title: "Last Updated",
            }),
            name: Type.Optional(
              Type.String({ description: "The human-readable name of the ruleset.", minLength: 1, title: "Name" }),
            ),
            version: RulesetsRulesetversion,
            rules: Type.Optional(RulesetsRequestrules),
          },
          { description: "A ruleset object." },
        ),
      })
        .response(
          Type.Object(
            {
              errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
              messages: RulesetsMessages,
              result: Type.Object(
                {
                  description: Type.Optional(
                    Type.String({
                      description: "An informative description of the ruleset.",
                      default: "",
                      title: "Description",
                    }),
                  ),
                  id: RulesetsRulesetid,
                  last_updated: Type.String({
                    description: "The timestamp of when the ruleset was last modified.",
                    format: "date-time",
                    readOnly: true,
                    title: "Last Updated",
                  }),
                  name: Type.String({
                    description: "The human-readable name of the ruleset.",
                    minLength: 1,
                    title: "Name",
                  }),
                  version: RulesetsRulesetversion,
                  kind: RulesetsRulesetkind,
                  phase: RulesetsRulesetphase,
                  rules: RulesetsResponserules,
                },
                { description: "A ruleset object." },
              ),
              success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .error(
          "4XX",
          Type.Object(
            {
              errors: RulesetsErrors,
              messages: RulesetsMessages,
              result: Type.Union([Type.Null()], { description: "A result." }),
              success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .summary("Update an account or zone entry point ruleset")
        .description("Updates an account or zone entry point ruleset, creating a new version.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Mass URL Redirects Write",
          "Magic Firewall Write",
          "L4 DDoS Managed Ruleset Write",
          "Transform Rules Write",
          "Select Configuration Write",
          "Account WAF Write",
          "Account Rulesets Write",
          "Logs Write",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.get("/rulesets/phases/{ruleset_phase}/entrypoint/versions", {
        params: Type.Object({ ruleset_phase: RulesetsRulesetphase }),
      })
        .response(
          Type.Object(
            {
              errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
              messages: RulesetsMessages,
              result: Type.Array(
                Type.Object(
                  {
                    description: Type.Optional(
                      Type.String({
                        description: "An informative description of the ruleset.",
                        default: "",
                        title: "Description",
                      }),
                    ),
                    id: RulesetsRulesetid,
                    last_updated: Type.String({
                      description: "The timestamp of when the ruleset was last modified.",
                      format: "date-time",
                      readOnly: true,
                      title: "Last Updated",
                    }),
                    name: Type.String({
                      description: "The human-readable name of the ruleset.",
                      minLength: 1,
                      title: "Name",
                    }),
                    version: RulesetsRulesetversion,
                    kind: RulesetsRulesetkind,
                    phase: RulesetsRulesetphase,
                  },
                  { description: "A ruleset object." },
                ),
                {
                  description:
                    "A list of rulesets. The returned information will not include the rules in each ruleset.",
                  title: "Rulesets",
                },
              ),
              success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
              result_info: Type.Optional(RulesetsResultinfo),
            },
            { description: "A response object." },
          ),
        )
        .error(
          "4XX",
          Type.Object(
            {
              errors: RulesetsErrors,
              messages: RulesetsMessages,
              result: Type.Union([Type.Null()], { description: "A result." }),
              success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .summary("List an account or zone entry point ruleset's versions")
        .description("Fetches the versions of an account or zone entry point ruleset.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Mass URL Redirects Write",
          "Mass URL Redirects Read",
          "Magic Firewall Write",
          "Magic Firewall Read",
          "L4 DDoS Managed Ruleset Write",
          "L4 DDoS Managed Ruleset Read",
          "Transform Rules Write",
          "Transform Rules Read",
          "Select Configuration Write",
          "Select Configuration Read",
          "Account WAF Write",
          "Account WAF Read",
          "Account Rulesets Read",
          "Account Rulesets Write",
          "Logs Write",
          "Logs Read",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.get("/rulesets/phases/{ruleset_phase}/entrypoint/versions/{ruleset_version}", {
        params: Type.Object({ ruleset_version: RulesetsRulesetversion, ruleset_phase: RulesetsRulesetphase }),
      })
        .response(
          Type.Object(
            {
              errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
              messages: RulesetsMessages,
              result: Type.Object(
                {
                  description: Type.Optional(
                    Type.String({
                      description: "An informative description of the ruleset.",
                      default: "",
                      title: "Description",
                    }),
                  ),
                  id: RulesetsRulesetid,
                  last_updated: Type.String({
                    description: "The timestamp of when the ruleset was last modified.",
                    format: "date-time",
                    readOnly: true,
                    title: "Last Updated",
                  }),
                  name: Type.String({
                    description: "The human-readable name of the ruleset.",
                    minLength: 1,
                    title: "Name",
                  }),
                  version: RulesetsRulesetversion,
                  kind: RulesetsRulesetkind,
                  phase: RulesetsRulesetphase,
                  rules: RulesetsResponserules,
                },
                { description: "A ruleset object." },
              ),
              success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .error(
          "4XX",
          Type.Object(
            {
              errors: RulesetsErrors,
              messages: RulesetsMessages,
              result: Type.Union([Type.Null()], { description: "A result." }),
              success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .summary("Get an account or zone entry point ruleset version")
        .description("Fetches a specific version of an account or zone entry point ruleset.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Mass URL Redirects Write",
          "Mass URL Redirects Read",
          "Magic Firewall Write",
          "Magic Firewall Read",
          "L4 DDoS Managed Ruleset Write",
          "L4 DDoS Managed Ruleset Read",
          "Transform Rules Write",
          "Transform Rules Read",
          "Select Configuration Write",
          "Select Configuration Read",
          "Account WAF Write",
          "Account WAF Read",
          "Account Rulesets Read",
          "Account Rulesets Write",
          "Logs Write",
          "Logs Read",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.get("/rulesets/{ruleset_id}", {
        params: Type.Object({ ruleset_id: RulesetsRulesetid }),
      })
        .response(
          Type.Object(
            {
              errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
              messages: RulesetsMessages,
              result: Type.Object(
                {
                  description: Type.Optional(
                    Type.String({
                      description: "An informative description of the ruleset.",
                      default: "",
                      title: "Description",
                    }),
                  ),
                  id: RulesetsRulesetid,
                  last_updated: Type.String({
                    description: "The timestamp of when the ruleset was last modified.",
                    format: "date-time",
                    readOnly: true,
                    title: "Last Updated",
                  }),
                  name: Type.String({
                    description: "The human-readable name of the ruleset.",
                    minLength: 1,
                    title: "Name",
                  }),
                  version: RulesetsRulesetversion,
                  kind: RulesetsRulesetkind,
                  phase: RulesetsRulesetphase,
                  rules: RulesetsResponserules,
                },
                { description: "A ruleset object." },
              ),
              success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .error(
          "4XX",
          Type.Object(
            {
              errors: RulesetsErrors,
              messages: RulesetsMessages,
              result: Type.Union([Type.Null()], { description: "A result." }),
              success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .summary("Get an account or zone ruleset")
        .description("Fetches the latest version of an account or zone ruleset.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Mass URL Redirects Write",
          "Mass URL Redirects Read",
          "Magic Firewall Write",
          "Magic Firewall Read",
          "L4 DDoS Managed Ruleset Write",
          "L4 DDoS Managed Ruleset Read",
          "Transform Rules Write",
          "Transform Rules Read",
          "Select Configuration Write",
          "Select Configuration Read",
          "Account WAF Write",
          "Account WAF Read",
          "Account Rulesets Read",
          "Account Rulesets Write",
          "Logs Write",
          "Logs Read",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.put("/rulesets/{ruleset_id}", {
        params: Type.Object({ ruleset_id: RulesetsRulesetid }),
        body: Type.Object(
          {
            description: Type.Optional(
              Type.String({
                description: "An informative description of the ruleset.",
                default: "",
                title: "Description",
              }),
            ),
            id: RulesetsRulesetid,
            last_updated: Type.String({
              description: "The timestamp of when the ruleset was last modified.",
              format: "date-time",
              readOnly: true,
              title: "Last Updated",
            }),
            name: Type.Optional(
              Type.String({ description: "The human-readable name of the ruleset.", minLength: 1, title: "Name" }),
            ),
            version: RulesetsRulesetversion,
            kind: Type.Optional(RulesetsRulesetkind),
            phase: Type.Optional(RulesetsRulesetphase),
            rules: Type.Optional(RulesetsRequestrules),
          },
          { description: "A ruleset object." },
        ),
      })
        .response(
          Type.Object(
            {
              errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
              messages: RulesetsMessages,
              result: Type.Object(
                {
                  description: Type.Optional(
                    Type.String({
                      description: "An informative description of the ruleset.",
                      default: "",
                      title: "Description",
                    }),
                  ),
                  id: RulesetsRulesetid,
                  last_updated: Type.String({
                    description: "The timestamp of when the ruleset was last modified.",
                    format: "date-time",
                    readOnly: true,
                    title: "Last Updated",
                  }),
                  name: Type.String({
                    description: "The human-readable name of the ruleset.",
                    minLength: 1,
                    title: "Name",
                  }),
                  version: RulesetsRulesetversion,
                  kind: RulesetsRulesetkind,
                  phase: RulesetsRulesetphase,
                  rules: RulesetsResponserules,
                },
                { description: "A ruleset object." },
              ),
              success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .error(
          "4XX",
          Type.Object(
            {
              errors: RulesetsErrors,
              messages: RulesetsMessages,
              result: Type.Union([Type.Null()], { description: "A result." }),
              success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .summary("Update an account or zone ruleset")
        .description("Updates an account or zone ruleset, creating a new version.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Mass URL Redirects Write",
          "Magic Firewall Write",
          "L4 DDoS Managed Ruleset Write",
          "Transform Rules Write",
          "Select Configuration Write",
          "Account WAF Write",
          "Account Rulesets Write",
          "Logs Write",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.delete("/rulesets/{ruleset_id}", {
        params: Type.Object({ ruleset_id: RulesetsRulesetid }),
      })
        .error(
          "4XX",
          Type.Object(
            {
              errors: RulesetsErrors,
              messages: RulesetsMessages,
              result: Type.Union([Type.Null()], { description: "A result." }),
              success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .summary("Delete an account or zone ruleset")
        .description("Deletes all versions of an existing account or zone ruleset.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Mass URL Redirects Write",
          "Magic Firewall Write",
          "L4 DDoS Managed Ruleset Write",
          "Transform Rules Write",
          "Select Configuration Write",
          "Account WAF Write",
          "Account Rulesets Write",
          "Logs Write",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.post("/rulesets/{ruleset_id}/rules", {
        params: Type.Object({ ruleset_id: RulesetsRulesetid }),
        body: Type.Union([
          RulesetsBlockrule,
          RulesetsChallengerule,
          RulesetsCompressresponserule,
          RulesetsDdosdynamicrule,
          RulesetsExecuterule,
          RulesetsForceconnectioncloserule,
          RulesetsJschallengerule,
          RulesetsLogrule,
          RulesetsLogcustomfieldrule,
          RulesetsManagedchallengerule,
          RulesetsRedirectrule,
          RulesetsRewriterule,
          RulesetsRouterule,
          RulesetsScorerule,
          RulesetsServeerrorrule,
          RulesetsSetcachesettingsrule,
          RulesetsSetconfigrule,
          RulesetsSkiprule,
        ]),
      })
        .response(
          Type.Object(
            {
              errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
              messages: RulesetsMessages,
              result: Type.Object(
                {
                  description: Type.Optional(
                    Type.String({
                      description: "An informative description of the ruleset.",
                      default: "",
                      title: "Description",
                    }),
                  ),
                  id: RulesetsRulesetid,
                  last_updated: Type.String({
                    description: "The timestamp of when the ruleset was last modified.",
                    format: "date-time",
                    readOnly: true,
                    title: "Last Updated",
                  }),
                  name: Type.String({
                    description: "The human-readable name of the ruleset.",
                    minLength: 1,
                    title: "Name",
                  }),
                  version: RulesetsRulesetversion,
                  kind: RulesetsRulesetkind,
                  phase: RulesetsRulesetphase,
                  rules: RulesetsResponserules,
                },
                { description: "A ruleset object." },
              ),
              success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .error(
          "4XX",
          Type.Object(
            {
              errors: RulesetsErrors,
              messages: RulesetsMessages,
              result: Type.Union([Type.Null()], { description: "A result." }),
              success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .summary("Create an account or zone ruleset rule")
        .description(
          "Adds a new rule to an account or zone ruleset. The rule will be added to the end of the existing list of rules in the ruleset by default.",
        )
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Mass URL Redirects Write",
          "Magic Firewall Write",
          "L4 DDoS Managed Ruleset Write",
          "Transform Rules Write",
          "Select Configuration Write",
          "Account WAF Write",
          "Account Rulesets Write",
          "Logs Write",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.patch("/rulesets/{ruleset_id}/rules/{rule_id}", {
        params: Type.Object({ rule_id: RulesetsRuleid, ruleset_id: RulesetsRulesetid }),
        body: Type.Union([
          RulesetsBlockrule,
          RulesetsChallengerule,
          RulesetsCompressresponserule,
          RulesetsDdosdynamicrule,
          RulesetsExecuterule,
          RulesetsForceconnectioncloserule,
          RulesetsJschallengerule,
          RulesetsLogrule,
          RulesetsLogcustomfieldrule,
          RulesetsManagedchallengerule,
          RulesetsRedirectrule,
          RulesetsRewriterule,
          RulesetsRouterule,
          RulesetsScorerule,
          RulesetsServeerrorrule,
          RulesetsSetcachesettingsrule,
          RulesetsSetconfigrule,
          RulesetsSkiprule,
        ]),
      })
        .response(
          Type.Object(
            {
              errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
              messages: RulesetsMessages,
              result: Type.Object(
                {
                  description: Type.Optional(
                    Type.String({
                      description: "An informative description of the ruleset.",
                      default: "",
                      title: "Description",
                    }),
                  ),
                  id: RulesetsRulesetid,
                  last_updated: Type.String({
                    description: "The timestamp of when the ruleset was last modified.",
                    format: "date-time",
                    readOnly: true,
                    title: "Last Updated",
                  }),
                  name: Type.String({
                    description: "The human-readable name of the ruleset.",
                    minLength: 1,
                    title: "Name",
                  }),
                  version: RulesetsRulesetversion,
                  kind: RulesetsRulesetkind,
                  phase: RulesetsRulesetphase,
                  rules: RulesetsResponserules,
                },
                { description: "A ruleset object." },
              ),
              success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .error(
          "4XX",
          Type.Object(
            {
              errors: RulesetsErrors,
              messages: RulesetsMessages,
              result: Type.Union([Type.Null()], { description: "A result." }),
              success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .summary("Update an account or zone ruleset rule")
        .description("Updates an existing rule in an account or zone ruleset.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Mass URL Redirects Write",
          "Magic Firewall Write",
          "L4 DDoS Managed Ruleset Write",
          "Transform Rules Write",
          "Select Configuration Write",
          "Account WAF Write",
          "Account Rulesets Write",
          "Logs Write",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.delete("/rulesets/{ruleset_id}/rules/{rule_id}", {
        params: Type.Object({ rule_id: RulesetsRuleid, ruleset_id: RulesetsRulesetid }),
      })
        .response(
          Type.Object(
            {
              errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
              messages: RulesetsMessages,
              result: Type.Object(
                {
                  description: Type.Optional(
                    Type.String({
                      description: "An informative description of the ruleset.",
                      default: "",
                      title: "Description",
                    }),
                  ),
                  id: RulesetsRulesetid,
                  last_updated: Type.String({
                    description: "The timestamp of when the ruleset was last modified.",
                    format: "date-time",
                    readOnly: true,
                    title: "Last Updated",
                  }),
                  name: Type.String({
                    description: "The human-readable name of the ruleset.",
                    minLength: 1,
                    title: "Name",
                  }),
                  version: RulesetsRulesetversion,
                  kind: RulesetsRulesetkind,
                  phase: RulesetsRulesetphase,
                  rules: RulesetsResponserules,
                },
                { description: "A ruleset object." },
              ),
              success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .error(
          "4XX",
          Type.Object(
            {
              errors: RulesetsErrors,
              messages: RulesetsMessages,
              result: Type.Union([Type.Null()], { description: "A result." }),
              success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .summary("Delete an account or zone ruleset rule")
        .description("Deletes an existing rule from an account or zone ruleset.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Mass URL Redirects Write",
          "Magic Firewall Write",
          "L4 DDoS Managed Ruleset Write",
          "Transform Rules Write",
          "Select Configuration Write",
          "Account WAF Write",
          "Account Rulesets Write",
          "Logs Write",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.get("/rulesets/{ruleset_id}/versions", {
        params: Type.Object({ ruleset_id: RulesetsRulesetid }),
      })
        .response(
          Type.Object(
            {
              errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
              messages: RulesetsMessages,
              result: Type.Array(
                Type.Object(
                  {
                    description: Type.Optional(
                      Type.String({
                        description: "An informative description of the ruleset.",
                        default: "",
                        title: "Description",
                      }),
                    ),
                    id: RulesetsRulesetid,
                    last_updated: Type.String({
                      description: "The timestamp of when the ruleset was last modified.",
                      format: "date-time",
                      readOnly: true,
                      title: "Last Updated",
                    }),
                    name: Type.String({
                      description: "The human-readable name of the ruleset.",
                      minLength: 1,
                      title: "Name",
                    }),
                    version: RulesetsRulesetversion,
                    kind: RulesetsRulesetkind,
                    phase: RulesetsRulesetphase,
                  },
                  { description: "A ruleset object." },
                ),
                {
                  description:
                    "A list of rulesets. The returned information will not include the rules in each ruleset.",
                  title: "Rulesets",
                },
              ),
              success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
              result_info: Type.Optional(RulesetsResultinfo),
            },
            { description: "A response object." },
          ),
        )
        .error(
          "4XX",
          Type.Object(
            {
              errors: RulesetsErrors,
              messages: RulesetsMessages,
              result: Type.Union([Type.Null()], { description: "A result." }),
              success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .summary("List an account or zone ruleset's versions")
        .description("Fetches the versions of an account or zone ruleset.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Mass URL Redirects Write",
          "Mass URL Redirects Read",
          "Magic Firewall Write",
          "Magic Firewall Read",
          "L4 DDoS Managed Ruleset Write",
          "L4 DDoS Managed Ruleset Read",
          "Transform Rules Write",
          "Transform Rules Read",
          "Select Configuration Write",
          "Select Configuration Read",
          "Account WAF Write",
          "Account WAF Read",
          "Account Rulesets Read",
          "Account Rulesets Write",
          "Logs Write",
          "Logs Read",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.get("/rulesets/{ruleset_id}/versions/{ruleset_version}", {
        params: Type.Object({ ruleset_version: RulesetsRulesetversion, ruleset_id: RulesetsRulesetid }),
      })
        .response(
          Type.Object(
            {
              errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
              messages: RulesetsMessages,
              result: Type.Object(
                {
                  description: Type.Optional(
                    Type.String({
                      description: "An informative description of the ruleset.",
                      default: "",
                      title: "Description",
                    }),
                  ),
                  id: RulesetsRulesetid,
                  last_updated: Type.String({
                    description: "The timestamp of when the ruleset was last modified.",
                    format: "date-time",
                    readOnly: true,
                    title: "Last Updated",
                  }),
                  name: Type.String({
                    description: "The human-readable name of the ruleset.",
                    minLength: 1,
                    title: "Name",
                  }),
                  version: RulesetsRulesetversion,
                  kind: RulesetsRulesetkind,
                  phase: RulesetsRulesetphase,
                  rules: RulesetsResponserules,
                },
                { description: "A ruleset object." },
              ),
              success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .error(
          "4XX",
          Type.Object(
            {
              errors: RulesetsErrors,
              messages: RulesetsMessages,
              result: Type.Union([Type.Null()], { description: "A result." }),
              success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .summary("Get an account or zone ruleset version")
        .description("Fetches a specific version of an account or zone ruleset.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Mass URL Redirects Write",
          "Mass URL Redirects Read",
          "Magic Firewall Write",
          "Magic Firewall Read",
          "L4 DDoS Managed Ruleset Write",
          "L4 DDoS Managed Ruleset Read",
          "Transform Rules Write",
          "Transform Rules Read",
          "Select Configuration Write",
          "Select Configuration Read",
          "Account WAF Write",
          "Account WAF Read",
          "Account Rulesets Read",
          "Account Rulesets Write",
          "Logs Write",
          "Logs Read",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.delete("/rulesets/{ruleset_id}/versions/{ruleset_version}", {
        params: Type.Object({ ruleset_version: RulesetsRulesetversion, ruleset_id: RulesetsRulesetid }),
      })
        .error(
          "4XX",
          Type.Object(
            {
              errors: RulesetsErrors,
              messages: RulesetsMessages,
              result: Type.Union([Type.Null()], { description: "A result." }),
              success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .summary("Delete an account or zone ruleset version")
        .description("Deletes an existing version of an account or zone ruleset.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Mass URL Redirects Write",
          "Magic Firewall Write",
          "L4 DDoS Managed Ruleset Write",
          "Transform Rules Write",
          "Select Configuration Write",
          "Account WAF Write",
          "Account Rulesets Write",
          "Logs Write",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.get("/rulesets/{ruleset_id}/versions/{ruleset_version}/by_tag/{rule_tag}", {
        params: Type.Object({
          rule_tag: RulesetsRulecategory,
          ruleset_version: RulesetsRulesetversion,
          ruleset_id: RulesetsRulesetid,
        }),
      })
        .response(
          Type.Object(
            {
              errors: Type.Union([Type.Unsafe({ const: [] })], { description: "A list of error messages." }),
              messages: RulesetsMessages,
              result: Type.Object(
                {
                  description: Type.Optional(
                    Type.String({
                      description: "An informative description of the ruleset.",
                      default: "",
                      title: "Description",
                    }),
                  ),
                  id: RulesetsRulesetid,
                  last_updated: Type.String({
                    description: "The timestamp of when the ruleset was last modified.",
                    format: "date-time",
                    readOnly: true,
                    title: "Last Updated",
                  }),
                  name: Type.String({
                    description: "The human-readable name of the ruleset.",
                    minLength: 1,
                    title: "Name",
                  }),
                  version: RulesetsRulesetversion,
                  kind: RulesetsRulesetkind,
                  phase: RulesetsRulesetphase,
                  rules: RulesetsResponserules,
                },
                { description: "A ruleset object." },
              ),
              success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .error(
          "4XX",
          Type.Object(
            {
              errors: RulesetsErrors,
              messages: RulesetsMessages,
              result: Type.Union([Type.Null()], { description: "A result." }),
              success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
            },
            { description: "A response object." },
          ),
        )
        .summary("List an account or zone ruleset version's rules by tag")
        .description("Fetches the rules of a managed account or zone ruleset version for a given tag.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", [
          "Mass URL Redirects Write",
          "Mass URL Redirects Read",
          "Magic Firewall Write",
          "Magic Firewall Read",
          "L4 DDoS Managed Ruleset Write",
          "L4 DDoS Managed Ruleset Read",
          "Transform Rules Write",
          "Transform Rules Read",
          "Select Configuration Write",
          "Select Configuration Read",
          "Account WAF Write",
          "Account WAF Read",
          "Account Rulesets Read",
          "Account Rulesets Write",
          "Logs Write",
          "Logs Read",
        ])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.get("/security-center/insights", {
        query: Type.Object({
          dismissed: Type.Optional(SecurityCenterDismissed),
          issue_class: Type.Optional(SecurityCenterIssueclasses),
          issue_type: Type.Optional(SecurityCenterIssuetypes),
          product: Type.Optional(SecurityCenterProducts),
          severity: Type.Optional(SecurityCenterSeverityqueryparam),
          subject: Type.Optional(SecurityCenterSubjects),
          "issue_class~neq": Type.Optional(SecurityCenterIssueclasses),
          "issue_type~neq": Type.Optional(SecurityCenterIssuetypes),
          "product~neq": Type.Optional(SecurityCenterProducts),
          "severity~neq": Type.Optional(SecurityCenterSeverityqueryparam),
          "subject~neq": Type.Optional(SecurityCenterSubjects),
          page: Type.Optional(SecurityCenterPage),
          per_page: Type.Optional(SecurityCenterPerpage),
        }),
      })
        .response(
          Type.Object({
            errors: DlpMessages,
            messages: DlpMessages,
            success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
            result: Type.Optional(
              Type.Object({
                count: Type.Optional(SecurityCenterCount),
                issues: Type.Optional(Type.Array(SecurityCenterIssue)),
                page: Type.Optional(SecurityCenterPage),
                per_page: Type.Optional(SecurityCenterPerpage),
              }),
            ),
          }),
        )
        .error("4XX", SecurityCenterApiResponseCommonFailure)
        .summary("Get Security Center Insights")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.get("/security-center/insights/class", {
        query: Type.Object({
          dismissed: Type.Optional(SecurityCenterDismissed),
          issue_class: Type.Optional(SecurityCenterIssueclasses),
          issue_type: Type.Optional(SecurityCenterIssuetypes),
          product: Type.Optional(SecurityCenterProducts),
          severity: Type.Optional(SecurityCenterSeverityqueryparam),
          subject: Type.Optional(SecurityCenterSubjects),
          "issue_class~neq": Type.Optional(SecurityCenterIssueclasses),
          "issue_type~neq": Type.Optional(SecurityCenterIssuetypes),
          "product~neq": Type.Optional(SecurityCenterProducts),
          "severity~neq": Type.Optional(SecurityCenterSeverityqueryparam),
          "subject~neq": Type.Optional(SecurityCenterSubjects),
        }),
      })
        .response(SecurityCenterValuecountsresponse)
        .error("4XX", SecurityCenterApiResponseCommonFailure)
        .summary("Get Security Center Insight Counts by Class")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.get("/security-center/insights/severity", {
        query: Type.Object({
          dismissed: Type.Optional(SecurityCenterDismissed),
          issue_class: Type.Optional(SecurityCenterIssueclasses),
          issue_type: Type.Optional(SecurityCenterIssuetypes),
          product: Type.Optional(SecurityCenterProducts),
          severity: Type.Optional(SecurityCenterSeverityqueryparam),
          subject: Type.Optional(SecurityCenterSubjects),
          "issue_class~neq": Type.Optional(SecurityCenterIssueclasses),
          "issue_type~neq": Type.Optional(SecurityCenterIssuetypes),
          "product~neq": Type.Optional(SecurityCenterProducts),
          "severity~neq": Type.Optional(SecurityCenterSeverityqueryparam),
          "subject~neq": Type.Optional(SecurityCenterSubjects),
        }),
      })
        .response(SecurityCenterValuecountsresponse)
        .error("4XX", SecurityCenterApiResponseCommonFailure)
        .summary("Get Security Center Insight Counts by Severity")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.get("/security-center/insights/type", {
        query: Type.Object({
          dismissed: Type.Optional(SecurityCenterDismissed),
          issue_class: Type.Optional(SecurityCenterIssueclasses),
          issue_type: Type.Optional(SecurityCenterIssuetypes),
          product: Type.Optional(SecurityCenterProducts),
          severity: Type.Optional(SecurityCenterSeverityqueryparam),
          subject: Type.Optional(SecurityCenterSubjects),
          "issue_class~neq": Type.Optional(SecurityCenterIssueclasses),
          "issue_type~neq": Type.Optional(SecurityCenterIssuetypes),
          "product~neq": Type.Optional(SecurityCenterProducts),
          "severity~neq": Type.Optional(SecurityCenterSeverityqueryparam),
          "subject~neq": Type.Optional(SecurityCenterSubjects),
        }),
      })
        .response(SecurityCenterValuecountsresponse)
        .error("4XX", SecurityCenterApiResponseCommonFailure)
        .summary("Get Security Center Insight Counts by Type")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.put("/security-center/insights/{issue_id}/dismiss", {
        params: Type.Object({ issue_id: Type.String() }),
        body: Type.Object({
          dismiss: Type.Optional(Type.Boolean({ default: true, "x-auditable": true })),
        }),
      })
        .response(SecurityCenterApiResponseSingle)
        .error("4XX", SecurityCenterApiResponseCommonFailure)
        .summary("Archive Security Center Insight")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })

      g.get("/waiting_rooms", {
        query: Type.Object({
          page: Type.Optional(Type.Number({ default: 1, minimum: 1 })),
          per_page: Type.Optional(Type.Number({ default: 25, minimum: 5, maximum: 1000 })),
        }),
      })
        .response(WaitingroomResponseCollection)
        .error(
          "4XX",
          Type.Object({
            errors: DlpMessages,
            messages: DlpMessages,
            success: Type.Union([Type.Literal(true), Type.Literal(false)], {
              description: "Whether the API call was successful.",
            }),
            result_info: Type.Optional(
              Type.Object({
                count: Type.Optional(
                  Type.Number({ description: "Total number of results for the requested service." }),
                ),
                page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
                per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
                total_count: Type.Optional(
                  Type.Number({ description: "Total results available without any search parameters." }),
                ),
              }),
            ),
            result: Type.Union([Type.Null()]),
          }),
        )
        .summary("List waiting rooms for account or zone")
        .description("Lists waiting rooms for account or zone.")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Account Waiting Rooms Read"])
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })
    },
  )
}

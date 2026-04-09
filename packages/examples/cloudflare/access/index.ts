import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  AccessApiResponseCommonFailure,
  AccessAppPoliciesComponentsSchemasResponseCollection,
  AccessClientId,
  AccessCreateResponse,
  AccessCreatedAt,
  AccessDuration,
  AccessIdResponse,
  AccessSchemasName,
  AccessSchemasSingleResponse,
  AccessSchemasUuid,
  AccessUuid,
  DlpMessages,
  DlsTimestamp,
} from "../shared/schemas"
import {
  AccessAccessRequestsComponentsSchemasResponseCollection,
  AccessActiveSessionResponse,
  AccessActiveSessionsResponse,
  AccessBookmarksComponentsSchemasResponseCollection,
  AccessBookmarksComponentsSchemasSingleResponse,
  AccessCfResourceId,
  AccessCustomPage,
  AccessCustomPagesComponentsSchemasResponseCollection,
  AccessCustomPagesComponentsSchemasSingleResponse,
  AccessDirection,
  AccessDohJwtDuration,
  AccessEmail,
  AccessFailedLoginResponse,
  AccessGatewayCaComponentsSchemasResponseCollection,
  AccessGatewayCaComponentsSchemasSingleResponse,
  AccessGroupsName,
  AccessId,
  AccessIdpId,
  AccessIdpResourceId,
  AccessKeyRotationIntervalDays,
  AccessKeysComponentsSchemasSingleResponse,
  AccessLastSeenIdentityResponse,
  AccessLimit,
  AccessNameResponse,
  AccessNonce,
  AccessPolicyInitReq,
  AccessPolicyInitResp,
  AccessPolicyReq,
  AccessPolicyTestId,
  AccessPolicyUpdateResp,
  AccessPolicyUsersResp,
  AccessRequestMethod,
  AccessRequestsIdpResourceId,
  AccessRequestsStatus,
  AccessResourceType,
  AccessResourceUserEmail,
  AccessReusablePoliciesComponentsSchemasIdResponse,
  AccessReusablePoliciesComponentsSchemasResponseCollection,
  AccessReusablePoliciesComponentsSchemasSingleResponse,
  AccessScimGroupsResponse,
  AccessScimUpdateLogsResponse,
  AccessScimUsersResponse,
  AccessSeatsComponentsSchemasResponseCollection,
  AccessSeatsDefinition,
  AccessSince,
  AccessSingleResponseWithoutHtml,
  AccessTagWithoutAppCount,
  AccessTagsComponentsSchemasName,
  AccessTagsComponentsSchemasResponseCollection,
  AccessTagsComponentsSchemasSingleResponse,
  AccessUntil,
  AccessUsername,
  AccessUsersCfResourceId,
  AccessUsersComponentsSchemasResponseCollection,
  AccessUsersIdpResourceId,
  AccessUsersName,
} from "./schemas"

export function registerAccess(api: Api) {
  api.group("/accounts/{account_id}/access", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.put("/apps/{app_id}/policies/{policy_id}/make_reusable", {
      params: Type.Object({ app_id: AccessUuid, policy_id: AccessUuid }),
      responses: {
        200: AccessAppPoliciesComponentsSchemasResponseCollection,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Convert an Access application policy to a reusable policy")
      .description(
        "Converts an application-scoped policy to a reusable policy. The policy will no longer be exclusively scoped to the application. Further updates to the policy should go through the /accounts/{account_id}/policies/{uid} endpoint.",
      )
      .operationId("access-policies-convert-reusable")
      .tag("Access application-scoped policies")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Apps and Policies Write"])

    g.get("/bookmarks", {
      responses: {
        200: AccessBookmarksComponentsSchemasResponseCollection,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("List Bookmark applications")
      .description("Lists Bookmark applications.")
      .operationId("access-bookmark-applications-(-deprecated)-list-bookmark-applications")
      .tag("Access Bookmark applications (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Access: Apps and Policies Revoke",
        "Access: Apps and Policies Write",
        "Access: Apps and Policies Read",
      ])
      .extension("x-cfDeprecation", {
        description: "This endpoint is deprecated in favor of using a specialized Access Application App Type.",
        display: true,
        eol: "2023-03-19",
        id: "bookmarks_deprecation",
      })

    g.get("/bookmarks/{bookmark_id}", {
      params: Type.Object({ bookmark_id: AccessUuid }),
      responses: {
        200: AccessBookmarksComponentsSchemasSingleResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Get a Bookmark application")
      .description("Fetches a single Bookmark application.")
      .operationId("access-bookmark-applications-(-deprecated)-get-a-bookmark-application")
      .tag("Access Bookmark applications (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Apps and Policies Write", "Access: Apps and Policies Read"])
      .extension("x-cfDeprecation", {
        description: "This endpoint is deprecated in favor of using a specialized Access Application App Type.",
        display: true,
        eol: "2023-03-19",
        id: "bookmarks_deprecation",
      })

    g.post("/bookmarks/{bookmark_id}", {
      params: Type.Object({ bookmark_id: AccessUuid }),
      responses: {
        200: AccessBookmarksComponentsSchemasSingleResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Create a Bookmark application")
      .description("Create a new Bookmark application.")
      .operationId("access-bookmark-applications-(-deprecated)-create-a-bookmark-application")
      .tag("Access Bookmark applications (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfDeprecation", {
        description: "This endpoint is deprecated in favor of using a specialized Access Application App Type.",
        display: true,
        eol: "2023-03-19",
        id: "bookmarks_deprecation",
      })

    g.put("/bookmarks/{bookmark_id}", {
      params: Type.Object({ bookmark_id: AccessUuid }),
      responses: {
        200: AccessBookmarksComponentsSchemasSingleResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Update a Bookmark application")
      .description("Updates a configured Bookmark application.")
      .operationId("access-bookmark-applications-(-deprecated)-update-a-bookmark-application")
      .tag("Access Bookmark applications (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Apps and Policies Write"])
      .extension("x-cfDeprecation", {
        description: "This endpoint is deprecated in favor of using a specialized Access Application App Type.",
        display: true,
        eol: "2023-03-19",
        id: "bookmarks_deprecation",
      })

    g.delete("/bookmarks/{bookmark_id}", {
      params: Type.Object({ bookmark_id: AccessUuid }),
      responses: {
        200: AccessIdResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Delete a Bookmark application")
      .description("Deletes a Bookmark application.")
      .operationId("access-bookmark-applications-(-deprecated)-delete-a-bookmark-application")
      .tag("Access Bookmark applications (Deprecated)")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Apps and Policies Write"])
      .extension("x-cfDeprecation", {
        description: "This endpoint is deprecated in favor of using a specialized Access Application App Type.",
        display: true,
        eol: "2023-03-19",
        id: "bookmarks_deprecation",
      })

    g.get("/custom_pages", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ description: "Page number of results.", default: 1 })),
        per_page: Type.Optional(Type.Integer({ description: "Number of results per page.", default: 50 })),
      }),
      responses: {
        200: AccessCustomPagesComponentsSchemasResponseCollection,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("List custom pages")
      .description("List custom pages")
      .operationId("access-custom-pages-list-custom-pages")
      .tag("Access custom pages")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Custom Pages Write", "Access: Custom Pages Read"])

    g.post("/custom_pages", {
      body: AccessCustomPage,
      responses: {
        201: AccessSingleResponseWithoutHtml,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Create a custom page")
      .description("Create a custom page")
      .operationId("access-custom-pages-create-a-custom-page")
      .tag("Access custom pages")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Custom Pages Write"])

    g.get("/custom_pages/{custom_page_id}", {
      params: Type.Object({ custom_page_id: AccessUuid }),
      responses: {
        200: AccessCustomPagesComponentsSchemasSingleResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Get a custom page")
      .description("Fetches a custom page and also returns its HTML.")
      .operationId("access-custom-pages-get-a-custom-page")
      .tag("Access custom pages")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Custom Pages Write", "Access: Custom Pages Read"])

    g.put("/custom_pages/{custom_page_id}", {
      params: Type.Object({ custom_page_id: AccessUuid }),
      body: AccessCustomPage,
      responses: {
        200: AccessSingleResponseWithoutHtml,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Update a custom page")
      .description("Update a custom page")
      .operationId("access-custom-pages-update-a-custom-page")
      .tag("Access custom pages")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Custom Pages Write"])

    g.delete("/custom_pages/{custom_page_id}", {
      params: Type.Object({ custom_page_id: AccessUuid }),
      responses: {
        202: AccessIdResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Delete a custom page")
      .description("Delete a custom page")
      .operationId("access-custom-pages-delete-a-custom-page")
      .tag("Access custom pages")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Custom Pages Write"])

    g.get("/gateway_ca", {
      responses: {
        200: AccessGatewayCaComponentsSchemasResponseCollection,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("List SSH Certificate Authorities (CA)")
      .description("Lists SSH Certificate Authorities (CA).")
      .operationId("access-gateway-ca-list-SSH-ca")
      .tag("Gateway CA")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: SSH Auditing Write", "Access: SSH Auditing Read"])

    g.post("/gateway_ca", {
      responses: {
        201: AccessGatewayCaComponentsSchemasSingleResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Add a new SSH Certificate Authority (CA)")
      .description("Adds a new SSH Certificate Authority (CA).")
      .operationId("access-gateway-ca-add-an-SSH-ca")
      .tag("Gateway CA")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: SSH Auditing Write"])

    g.delete("/gateway_ca/{certificate_id}", {
      params: Type.Object({ certificate_id: AccessUuid }),
      responses: {
        200: AccessIdResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Delete an SSH Certificate Authority (CA)")
      .description("Deletes an SSH Certificate Authority.")
      .operationId("access-gateway-ca-delete-an-SSH-ca")
      .tag("Gateway CA")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: SSH Auditing Write"])

    g.get("/identity_providers/{identity_provider_id}/scim/groups", {
      params: Type.Object({ identity_provider_id: AccessUuid }),
      query: Type.Object({
        cf_resource_id: Type.Optional(AccessCfResourceId),
        idp_resource_id: Type.Optional(AccessIdpResourceId),
        name: Type.Optional(AccessGroupsName),
        page: Type.Optional(Type.Integer({ description: "Page number of results.", default: 1 })),
        per_page: Type.Optional(Type.Integer({ description: "Number of results per page.", default: 100 })),
      }),
      responses: {
        200: AccessScimGroupsResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("List SCIM Group resources")
      .description(
        "Lists SCIM Group resources synced to Cloudflare via the System for Cross-domain Identity Management (SCIM).",
      )
      .operationId("access-identity-providers-list-scim-group-resources")
      .tag("Access identity providers")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Access: Organizations, Identity Providers, and Groups Write",
        "Access: Organizations, Identity Providers, and Groups Read",
      ])

    g.get("/identity_providers/{identity_provider_id}/scim/users", {
      params: Type.Object({ identity_provider_id: AccessUuid }),
      query: Type.Object({
        cf_resource_id: Type.Optional(AccessUsersCfResourceId),
        idp_resource_id: Type.Optional(AccessUsersIdpResourceId),
        username: Type.Optional(AccessUsername),
        email: Type.Optional(AccessEmail),
        name: Type.Optional(AccessUsersName),
        page: Type.Optional(Type.Integer({ description: "Page number of results.", default: 1 })),
        per_page: Type.Optional(Type.Integer({ description: "Number of results per page.", default: 100 })),
      }),
      responses: {
        200: AccessScimUsersResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("List SCIM User resources")
      .description(
        "Lists SCIM User resources synced to Cloudflare via the System for Cross-domain Identity Management (SCIM).",
      )
      .operationId("access-identity-providers-list-scim-user-resources")
      .tag("Access identity providers")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Access: Organizations, Identity Providers, and Groups Write",
        "Access: Organizations, Identity Providers, and Groups Read",
      ])

    g.get("/keys", {
      responses: {
        200: AccessKeysComponentsSchemasSingleResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Get the Access key configuration")
      .description("Gets the Access key rotation settings for an account.")
      .operationId("access-key-configuration-get-the-access-key-configuration")
      .tag("Access key configuration")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Access: Organizations, Identity Providers, and Groups Write",
        "Access: Organizations, Identity Providers, and Groups Read",
      ])

    g.put("/keys", {
      body: Type.Object({
        key_rotation_interval_days: AccessKeyRotationIntervalDays,
      }),
      responses: {
        200: AccessKeysComponentsSchemasSingleResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Update the Access key configuration")
      .description("Updates the Access key rotation settings for an account.")
      .operationId("access-key-configuration-update-the-access-key-configuration")
      .tag("Access key configuration")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Organizations, Identity Providers, and Groups Write"])

    g.post("/keys/rotate", {
      responses: {
        200: AccessKeysComponentsSchemasSingleResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Rotate Access keys")
      .description("Perfoms a key rotation for an account.")
      .operationId("access-key-configuration-rotate-access-keys")
      .tag("Access key configuration")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Organizations, Identity Providers, and Groups Write"])

    g.get("/logs/access_requests", {
      query: Type.Object({
        limit: Type.Optional(Type.Integer({ default: 25 })),
        direction: Type.Optional(Type.Union([Type.Literal("desc"), Type.Literal("asc")])),
        since: Type.Optional(Type.String({ format: "date-time" })),
        until: Type.Optional(Type.String({ format: "date-time" })),
        page: Type.Optional(Type.Integer({ description: "Page number of results.", default: 1 })),
        per_page: Type.Optional(Type.Integer({ description: "Number of results per page.", default: 25 })),
      }),
      responses: {
        200: AccessAccessRequestsComponentsSchemasResponseCollection,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Get Access authentication logs")
      .description("Gets a list of Access authentication audit logs for an account.")
      .operationId("access-authentication-logs-get-access-authentication-logs")
      .tag("Access authentication logs")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Audit Logs Read"])

    g.get("/logs/scim/updates", {
      query: Type.Object({
        limit: Type.Optional(AccessLimit),
        direction: Type.Optional(AccessDirection),
        since: Type.Optional(AccessSince),
        until: Type.Optional(AccessUntil),
        idp_id: AccessIdpId,
        status: Type.Optional(AccessRequestsStatus),
        resource_type: Type.Optional(AccessResourceType),
        request_method: Type.Optional(AccessRequestMethod),
        resource_user_email: Type.Optional(AccessResourceUserEmail),
        resource_group_name: Type.Optional(AccessGroupsName),
        cf_resource_id: Type.Optional(AccessId),
        idp_resource_id: Type.Optional(AccessRequestsIdpResourceId),
        page: Type.Optional(Type.Integer({ description: "Page number of results.", default: 1 })),
        per_page: Type.Optional(Type.Integer({ description: "Number of results per page.", default: 20 })),
      }),
      responses: {
        200: AccessScimUpdateLogsResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("List Access SCIM update logs")
      .description(
        "Lists Access SCIM update logs that maintain a record of updates made to User and Group resources synced to Cloudflare via the System for Cross-domain Identity Management (SCIM).",
      )
      .operationId("access-scim-update-logs-list-access-scim-update-logs")
      .tag("Access SCIM update logs")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: SCIM logs read"])

    g.get("/organizations/doh", {
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              client_id: Type.Optional(AccessClientId),
              created_at: Type.Optional(AccessCreatedAt),
              duration: Type.Optional(AccessDuration),
              expires_at: Type.Optional(DlsTimestamp),
              id: Type.Optional(AccessUuid),
              last_seen_at: Type.Optional(DlsTimestamp),
              name: Type.Optional(AccessSchemasName),
              updated_at: Type.Optional(AccessCreatedAt),
              doh_jwt_duration: Type.Optional(
                Type.String({
                  description:
                    "The duration the DoH JWT is valid for. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.  Note that the maximum duration for this setting is the same as the key rotation period on the account.",
                }),
              ),
            }),
          ),
        }),
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Get your Zero Trust organization DoH settings")
      .description("Returns the DoH settings for your Zero Trust organization.")
      .operationId("zero-trust-organization-get-your-zero-trust-organization-doh-settings")
      .tag("Zero Trust organization")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Access: Organizations, Identity Providers, and Groups Revoke",
        "Access: Organizations, Identity Providers, and Groups Write",
        "Access: Organizations, Identity Providers, and Groups Read",
      ])

    g.put("/organizations/doh", {
      body: Type.Object({
        doh_jwt_duration: Type.Optional(AccessDohJwtDuration),
        service_token_id: Type.Optional(
          Type.String({ description: "The uuid of the service token you want to use for DoH authentication" }),
        ),
      }),
      responses: {
        201: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(
            Type.Object({
              client_id: Type.Optional(AccessClientId),
              created_at: Type.Optional(AccessCreatedAt),
              duration: Type.Optional(AccessDuration),
              expires_at: Type.Optional(DlsTimestamp),
              id: Type.Optional(AccessUuid),
              last_seen_at: Type.Optional(DlsTimestamp),
              name: Type.Optional(AccessSchemasName),
              updated_at: Type.Optional(AccessCreatedAt),
              doh_jwt_duration: Type.Optional(AccessDohJwtDuration),
            }),
          ),
        }),
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Update your Zero Trust organization DoH settings")
      .description("Updates the DoH settings for your Zero Trust organization.")
      .operationId("zero-trust-organization-update-your-zero-trust-organization-doh-settings")
      .tag("Zero Trust organization")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Organizations, Identity Providers, and Groups Write"])

    g.get("/policies", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ description: "Page number of results.", default: 1 })),
        per_page: Type.Optional(Type.Integer({ description: "Number of results per page.", default: 100 })),
      }),
      responses: {
        200: AccessReusablePoliciesComponentsSchemasResponseCollection,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("List Access reusable policies")
      .description("Lists Access reusable policies.")
      .operationId("access-policies-list-access-reusable-policies")
      .tag("Access reusable policies")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Apps and Policies Write", "Access: Apps and Policies Read"])

    g.post("/policies", {
      body: AccessPolicyReq,
      responses: {
        201: AccessReusablePoliciesComponentsSchemasSingleResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Create an Access reusable policy")
      .description("Creates a new Access reusable policy.")
      .operationId("access-policies-create-an-access-reusable-policy")
      .tag("Access reusable policies")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Apps and Policies Write"])

    g.get("/policies/{policy_id}", {
      params: Type.Object({ policy_id: AccessSchemasUuid }),
      responses: {
        200: AccessReusablePoliciesComponentsSchemasSingleResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Get an Access reusable policy")
      .description("Fetches a single Access reusable policy.")
      .operationId("access-policies-get-an-access-reusable-policy")
      .tag("Access reusable policies")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Apps and Policies Write", "Access: Apps and Policies Read"])

    g.put("/policies/{policy_id}", {
      params: Type.Object({ policy_id: AccessSchemasUuid }),
      body: AccessPolicyReq,
      responses: {
        200: AccessReusablePoliciesComponentsSchemasSingleResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Update an Access reusable policy")
      .description("Updates a Access reusable policy.")
      .operationId("access-policies-update-an-access-reusable-policy")
      .tag("Access reusable policies")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Apps and Policies Write"])

    g.delete("/policies/{policy_id}", {
      params: Type.Object({ policy_id: AccessSchemasUuid }),
      responses: {
        202: AccessReusablePoliciesComponentsSchemasIdResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Delete an Access reusable policy")
      .description("Deletes an Access reusable policy.")
      .operationId("access-policies-delete-an-access-reusable-policy")
      .tag("Access reusable policies")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Apps and Policies Write"])

    g.post("/policy-tests", {
      body: AccessPolicyInitReq,
      responses: {
        200: AccessPolicyInitResp,
        400: AccessApiResponseCommonFailure,
      },
    })
      .summary("Start Access policy test")
      .description("Starts an Access policy test.")
      .operationId("access-policy-tests")
      .tag("Access policy tester")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Policy Test Write"])

    g.get("/policy-tests/{policy_test_id}", {
      params: Type.Object({ policy_test_id: AccessPolicyTestId }),
      responses: {
        200: AccessPolicyUpdateResp,
        400: AccessApiResponseCommonFailure,
      },
    })
      .summary("Get the current status of a given Access policy test")
      .description("Fetches the current status of a given Access policy test.")
      .operationId("access-policy-tests-get-an-update")
      .tag("Access policy tester")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Policy Test Write", "Access: Policy Test Read"])

    g.get("/policy-tests/{policy_test_id}/users", {
      params: Type.Object({ policy_test_id: AccessPolicyTestId }),
      query: Type.Object({
        page: Type.Optional(Type.Integer({ description: "Page number of results.", default: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 25 })),
        status: Type.Optional(Type.Union([Type.Literal("success"), Type.Literal("fail"), Type.Literal("error")])),
      }),
      responses: {
        200: AccessPolicyUsersResp,
        400: AccessApiResponseCommonFailure,
      },
    })
      .summary("Get an Access policy test users page")
      .description("Fetches a single page of user results from an Access policy test.")
      .operationId("access-policy-tests-get-a-user-page")
      .tag("Access policy tester")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Policy Test Write", "Access: Policy Test Read"])

    g.patch("/seats", {
      body: AccessSeatsDefinition,
      responses: {
        200: AccessSeatsComponentsSchemasResponseCollection,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Update a user seat")
      .description("Removes a user from a Zero Trust seat when both `access_seat` and `gateway_seat` are set to false.")
      .operationId("zero-trust-seats-update-a-user-seat")
      .tag("Zero Trust seats")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust: Seats Write"])

    g.post("/service_tokens/{service_token_id}/refresh", {
      params: Type.Object({ service_token_id: AccessUuid }),
      responses: {
        200: AccessSchemasSingleResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Refresh a service token")
      .description("Refreshes the expiration of a service token.")
      .operationId("access-service-tokens-refresh-a-service-token")
      .tag("Access service tokens")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Service Tokens Write"])

    g.post("/service_tokens/{service_token_id}/rotate", {
      params: Type.Object({ service_token_id: AccessUuid }),
      body: Type.Object({
        previous_client_secret_expires_at: Type.Optional(
          Type.String({
            description:
              "The expiration of the previous `client_secret`. If not provided, it defaults to the current timestamp in order to immediately expire the previous secret.",
            format: "date-time",
            "x-auditable": true,
          }),
        ),
      }),
      responses: {
        200: AccessCreateResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Rotate a service token")
      .description("Generates a new Client Secret for a service token and revokes the old one.")
      .operationId("access-service-tokens-rotate-a-service-token")
      .tag("Access service tokens")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/tags", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ description: "Page number of results.", default: 1 })),
        per_page: Type.Optional(Type.Integer({ description: "Number of results per page.", default: 50 })),
      }),
      responses: {
        200: AccessTagsComponentsSchemasResponseCollection,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("List tags")
      .description("List tags")
      .operationId("access-tags-list-tags")
      .tag("Access tags")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Access: Apps and Policies Revoke",
        "Access: Apps and Policies Write",
        "Access: Apps and Policies Read",
      ])

    g.post("/tags", {
      body: Type.Object({
        name: Type.Optional(AccessTagsComponentsSchemasName),
      }),
      responses: {
        201: AccessTagsComponentsSchemasSingleResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Create a tag")
      .description("Create a tag")
      .operationId("access-tags-create-tag")
      .tag("Access tags")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Apps and Policies Write"])

    g.get("/tags/{tag_name}", {
      params: Type.Object({ tag_name: AccessTagsComponentsSchemasName }),
      responses: {
        200: AccessTagsComponentsSchemasSingleResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Get a tag")
      .description("Get a tag")
      .operationId("access-tags-get-a-tag")
      .tag("Access tags")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Apps and Policies Write", "Access: Apps and Policies Read"])

    g.put("/tags/{tag_name}", {
      params: Type.Object({ tag_name: AccessTagsComponentsSchemasName }),
      body: AccessTagWithoutAppCount,
      responses: {
        200: AccessTagsComponentsSchemasSingleResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Update a tag")
      .description("Update a tag")
      .operationId("access-tags-update-a-tag")
      .tag("Access tags")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Apps and Policies Write"])

    g.delete("/tags/{tag_name}", {
      params: Type.Object({ tag_name: AccessTagsComponentsSchemasName }),
      responses: {
        202: AccessNameResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Delete a tag")
      .description("Delete a tag")
      .operationId("access-tags-delete-a-tag")
      .tag("Access tags")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Apps and Policies Write"])

    g.get("/users", {
      query: Type.Object({
        name: Type.Optional(Type.String({ description: "The name of the user." })),
        email: Type.Optional(Type.String({ description: "The email of the user." })),
        search: Type.Optional(Type.String({ description: "Search for users by other listed query parameters." })),
        page: Type.Optional(Type.Integer({ description: "Page number of results.", default: 1 })),
        per_page: Type.Optional(Type.Integer({ description: "Number of results per page.", default: 1000 })),
      }),
      responses: {
        200: AccessUsersComponentsSchemasResponseCollection,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Get users")
      .description("Gets a list of users for an account.")
      .operationId("zero-trust-users-get-users")
      .tag("Zero Trust users")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Audit Logs Read"])

    g.get("/users/{user_id}/active_sessions", {
      params: Type.Object({ user_id: AccessUuid }),
      responses: {
        200: AccessActiveSessionsResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Get active sessions")
      .description("Get active sessions for a single user.")
      .operationId("zero-trust-users-get-active-sessions")
      .tag("Zero Trust users")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Audit Logs Read"])

    g.get("/users/{user_id}/active_sessions/{nonce}", {
      params: Type.Object({ user_id: AccessUuid, nonce: AccessNonce }),
      responses: {
        200: AccessActiveSessionResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Get single active session")
      .description("Get an active session for a single user.")
      .operationId("zero-trust-users-get-active-session")
      .tag("Zero Trust users")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Audit Logs Read"])

    g.get("/users/{user_id}/failed_logins", {
      params: Type.Object({ user_id: AccessUuid }),
      responses: {
        200: AccessFailedLoginResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Get failed logins")
      .description("Get all failed login attempts for a single user.")
      .operationId("zero-trust-users-get-failed-logins")
      .tag("Zero Trust users")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Audit Logs Read"])

    g.get("/users/{user_id}/last_seen_identity", {
      params: Type.Object({ user_id: AccessUuid }),
      responses: {
        200: AccessLastSeenIdentityResponse,
        "4XX": AccessApiResponseCommonFailure,
      },
    })
      .summary("Get last seen identity")
      .description("Get last seen identity for a single user.")
      .operationId("zero-trust-users-get-last-seen-identity")
      .tag("Zero Trust users")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Access: Audit Logs Read"])
  })
}

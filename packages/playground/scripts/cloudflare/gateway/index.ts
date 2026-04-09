import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages } from "../shared/schemas"
import {
  UnnamedSchemaRef1b37523fdb0ae5806cd8e062492aab66,
  UnnamedSchemaRef4753ee81779d0e57189420079abab61e,
  ZeroTrustGatewayAction,
  ZeroTrustGatewayAppReviewResponse,
  ZeroTrustGatewayAppTypesComponentsSchemasResponseCollection,
  ZeroTrustGatewayApprovedApps,
  ZeroTrustGatewayAuditSshSettingsComponentsSchemasSingleResponse,
  ZeroTrustGatewayCategoriesComponentsSchemasResponseCollection,
  ZeroTrustGatewayClientDefault,
  ZeroTrustGatewayComponentsSchemasName,
  ZeroTrustGatewayComponentsSchemasResponseCollection,
  ZeroTrustGatewayComponentsSchemasSingleResponse,
  ZeroTrustGatewayComponentsSchemasUuid,
  ZeroTrustGatewayCustomCertificateSettings,
  ZeroTrustGatewayDescription,
  ZeroTrustGatewayDevicePosture,
  ZeroTrustGatewayDnsDestinationIpsIdWrite,
  ZeroTrustGatewayEcsSupport,
  ZeroTrustGatewayEmptyResponse,
  ZeroTrustGatewayEnabled,
  ZeroTrustGatewayEndpoints,
  ZeroTrustGatewayExpiration,
  ZeroTrustGatewayFilters,
  ZeroTrustGatewayGatewayAccount,
  ZeroTrustGatewayGatewayAccountConfig,
  ZeroTrustGatewayGatewayAccountLoggingSettings,
  ZeroTrustGatewayGatewayAccountLoggingSettingsResponse,
  ZeroTrustGatewayGatewayAccountSettings,
  ZeroTrustGatewayGenerateCertRequest,
  ZeroTrustGatewayIdentity,
  ZeroTrustGatewayInReviewApps,
  ZeroTrustGatewayIps,
  ZeroTrustGatewayIpv4Networks,
  ZeroTrustGatewayItemsInput,
  ZeroTrustGatewayListItemResponseCollection,
  ZeroTrustGatewayListSingleResponse,
  ZeroTrustGatewayName,
  ZeroTrustGatewayPrecedence,
  ZeroTrustGatewayProxyEndpointsComponentsSchemasName,
  ZeroTrustGatewayProxyEndpointsComponentsSchemasResponseCollection,
  ZeroTrustGatewayProxyEndpointsComponentsSchemasSingleResponse,
  ZeroTrustGatewayPublicKey,
  ZeroTrustGatewayResponseCollection,
  ZeroTrustGatewayResultInfo,
  ZeroTrustGatewayRuleSettings,
  ZeroTrustGatewayRulesComponentsSchemasResponseCollection,
  ZeroTrustGatewaySchedule,
  ZeroTrustGatewaySchemasDescription,
  ZeroTrustGatewaySchemasName,
  ZeroTrustGatewaySchemasResponseCollection,
  ZeroTrustGatewaySchemasSingleResponse,
  ZeroTrustGatewaySchemasType,
  ZeroTrustGatewaySchemasUuid,
  ZeroTrustGatewaySingleResponse,
  ZeroTrustGatewaySingleResponseWithListItems,
  ZeroTrustGatewayTraffic,
  ZeroTrustGatewayUnapprovedApps,
  ZeroTrustGatewayUuid,
  ZeroTrustGatewayValue,
} from "./schemas"

export function registerGateway(api: Api) {
  api.assertVersion("3.0.3", "Gateway")

  api.group("/accounts/{account_id}/gateway", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {})
      .response(ZeroTrustGatewayGatewayAccount)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Get Zero Trust account information")
      .description("Retrieve information about the current Zero Trust account.")
      .operationId("zero-trust-accounts-get-zero-trust-account-information")
      .tag("Zero Trust accounts")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.post("/", {})
      .response(ZeroTrustGatewayGatewayAccount)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Create Zero Trust account")
      .description("Create a Zero Trust account for an existing Cloudflare account.")
      .operationId("zero-trust-accounts-create-zero-trust-account")
      .tag("Zero Trust accounts")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/app_types", {})
      .response(ZeroTrustGatewayAppTypesComponentsSchemasResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result_info: Type.Optional(ZeroTrustGatewayResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("List application and application type mappings")
      .description("List all application and application type mappings.")
      .operationId(
        "zero-trust-gateway-application-and-application-type-mappings-list-application-and-application-type-mappings",
      )
      .tag("Zero Trust Gateway application and application type mappings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.get("/apps/review_status", {})
      .response(ZeroTrustGatewayAppReviewResponse)
      .error(
        "4XX",
        Type.Object(
          {
            errors: D1Messages,
            messages: D1Messages,
            success: Type.Union([Type.Literal(true), Type.Literal(false)], {
              description: "Indicate whether the API call was successful.",
            }),
            result: Type.Union([Type.Null()]),
          },
          { "x-auditable": true },
        ),
      )
      .summary("Shows the current apps review status.")
      .description("Shows the current apps review status.")
      .operationId("zero-trust-app-review-list")
      .tag("Zero Trust App Review")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.put("/apps/review_status", {
      body: Type.Object({
        approved_apps: ZeroTrustGatewayApprovedApps,
        in_review_apps: ZeroTrustGatewayInReviewApps,
        unapproved_apps: ZeroTrustGatewayUnapprovedApps,
      }),
    })
      .response(ZeroTrustGatewayAppReviewResponse)
      .error(
        "4XX",
        Type.Object(
          {
            errors: D1Messages,
            messages: D1Messages,
            success: Type.Union([Type.Literal(true), Type.Literal(false)], {
              description: "Indicate whether the API call was successful.",
            }),
            result: Type.Union([Type.Null()]),
          },
          { "x-auditable": true },
        ),
      )
      .summary("Update Zero Trust Application Review")
      .description("Updates a configured Zero Trust apps review list.")
      .operationId("zero-trust-app-review-update")
      .tag("Zero Trust App Review")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/audit_ssh_settings", {})
      .response(ZeroTrustGatewayAuditSshSettingsComponentsSchemasSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Get Zero Trust SSH settings")
      .description("Retrieve all Zero Trust Audit SSH and SSH with Access for Infrastructure settings for an account.")
      .operationId("zero-trust-get-audit-ssh-settings")
      .tag("Zero Trust SSH Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.put("/audit_ssh_settings", {
      body: Type.Object({
        public_key: ZeroTrustGatewayPublicKey,
      }),
    })
      .response(ZeroTrustGatewayAuditSshSettingsComponentsSchemasSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Update Zero Trust SSH settings")
      .description("Update Zero Trust Audit SSH and SSH with Access for Infrastructure settings for an account.")
      .operationId("zero-trust-update-audit-ssh-settings")
      .tag("Zero Trust SSH Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.post("/audit_ssh_settings/rotate_seed", {})
      .response(ZeroTrustGatewayAuditSshSettingsComponentsSchemasSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Rotate Zero Trust SSH account seed")
      .description(
        "Rotate the SSH account seed that generates the host key identity when connecting through the Cloudflare SSH Proxy.",
      )
      .operationId("zero-trust-rotate-ssh-account-seed")
      .tag("Zero Trust SSH Settings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/categories", {})
      .response(ZeroTrustGatewayCategoriesComponentsSchemasResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result_info: Type.Optional(ZeroTrustGatewayResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("List categories")
      .description("List all categories.")
      .operationId("zero-trust-gateway-categories-list-categories")
      .tag("Zero Trust Gateway categories")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.get("/certificates", {})
      .response(ZeroTrustGatewayResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result_info: Type.Optional(ZeroTrustGatewayResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("List Zero Trust certificates")
      .description("List all Zero Trust certificates for an account.")
      .operationId("zero-trust-certificates-list-zero-trust-certificates")
      .tag("Zero Trust certificates")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.post("/certificates", {
      body: ZeroTrustGatewayGenerateCertRequest,
    })
      .response(ZeroTrustGatewaySingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Create Zero Trust certificate")
      .description("Create a new Zero Trust certificate.")
      .operationId("zero-trust-certificates-create-zero-trust-certificate")
      .tag("Zero Trust certificates")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/certificates/{certificate_id}", {
      params: Type.Object({ certificate_id: ZeroTrustGatewayUuid }),
    })
      .response(ZeroTrustGatewaySingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Get Zero Trust certificate details")
      .description("Get a single Zero Trust certificate.")
      .operationId("zero-trust-certificates-zero-trust-certificate-details")
      .tag("Zero Trust certificates")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.delete("/certificates/{certificate_id}", {
      params: Type.Object({ certificate_id: ZeroTrustGatewayUuid }),
    })
      .response(ZeroTrustGatewaySingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Delete Zero Trust certificate")
      .description(
        "Delete a gateway-managed Zero Trust certificate. You must deactivate the certificate from the edge (inactive) before deleting it.",
      )
      .operationId("zero-trust-certificates-delete-zero-trust-certificate")
      .tag("Zero Trust certificates")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.post("/certificates/{certificate_id}/activate", {
      params: Type.Object({ certificate_id: ZeroTrustGatewayUuid }),
    })
      .respond(202, ZeroTrustGatewaySingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Activate a Zero Trust certificate")
      .description("Bind a single Zero Trust certificate to the edge.")
      .operationId("zero-trust-certificates-activate-zero-trust-certificate")
      .tag("Zero Trust certificates")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.post("/certificates/{certificate_id}/deactivate", {
      params: Type.Object({ certificate_id: ZeroTrustGatewayUuid }),
    })
      .respond(201, ZeroTrustGatewaySingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Deactivate a Zero Trust certificate")
      .description("Unbind a single Zero Trust certificate from the edge.")
      .operationId("zero-trust-certificates-deactivate-zero-trust-certificate")
      .tag("Zero Trust certificates")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/configuration", {})
      .response(ZeroTrustGatewayGatewayAccountConfig)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()], { description: "Specify account settings." }),
        }),
      )
      .summary("Get Zero Trust account configuration")
      .description("Retrieve the current Zero Trust account configuration.")
      .operationId("zero-trust-accounts-get-zero-trust-account-configuration")
      .tag("Zero Trust accounts")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.put("/configuration", {
      body: ZeroTrustGatewayGatewayAccountSettings,
    })
      .response(ZeroTrustGatewayGatewayAccountConfig)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()], { description: "Specify account settings." }),
        }),
      )
      .summary("Update Zero Trust account configuration")
      .description("Update the current Zero Trust account configuration.")
      .operationId("zero-trust-accounts-update-zero-trust-account-configuration.")
      .tag("Zero Trust accounts")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.patch("/configuration", {
      body: ZeroTrustGatewayGatewayAccountSettings,
    })
      .response(ZeroTrustGatewayGatewayAccountConfig)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()], { description: "Specify account settings." }),
        }),
      )
      .summary("Patch Zero Trust account configuration")
      .description(
        "Update (PATCH) a single subcollection of settings such as `antivirus`, `tls_decrypt`, `activity_log`, `block_page`, `browser_isolation`, `fips`, `body_scanning`, or `certificate` without updating the entire configuration object. This endpoint returns an error if any settings collection lacks proper configuration.",
      )
      .operationId("zero-trust-accounts-patch-zero-trust-account-configuration")
      .tag("Zero Trust accounts")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/configuration/custom_certificate", {})
      .response(ZeroTrustGatewayCustomCertificateSettings)
      .error(
        "4XX",
        Type.Object(
          {
            binding_status: Type.Optional(
              Type.String({
                description: "Indicate the internal certificate status.",
                readOnly: true,
                "x-auditable": true,
              }),
            ),
            enabled: Type.Union([
              Type.Boolean({
                description: "Specify whether to enable a custom certificate authority for signing Gateway traffic.",
                "x-auditable": true,
              }),
              Type.Null(),
            ]),
            id: Type.Optional(
              Type.String({
                description: "Specify the UUID of the certificate (ID from MTLS certificate store).",
                "x-auditable": true,
              }),
            ),
            updated_at: Type.Optional(Type.String({ format: "date-time", readOnly: true })),
            errors: D1Messages,
            messages: D1Messages,
            result: Type.Union([Type.Null()]),
            success: Type.Union([Type.Literal(false)], {
              description: "Indicate whether the API call was successful.",
            }),
          },
          {
            description:
              "Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.",
            "x-stainless-terraform-configurability": "optional",
          },
        ),
      )
      .summary("Get Zero Trust certificate configuration")
      .description("Retrieve the current Zero Trust certificate configuration.")
      .operationId("zero-trust-accounts-get-zero-trust-certificate-configuration")
      .tag("Zero Trust accounts")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.get("/lists", {
      query: Type.Object({
        type: Type.Optional(ZeroTrustGatewaySchemasType),
      }),
    })
      .response(ZeroTrustGatewaySchemasResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result_info: Type.Optional(ZeroTrustGatewayResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("List Zero Trust lists")
      .description("Fetch all Zero Trust lists for an account.")
      .operationId("zero-trust-lists-list-zero-trust-lists")
      .tag("Zero Trust lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.post("/lists", {
      body: Type.Object({
        description: Type.Optional(ZeroTrustGatewayDescription),
        items: Type.Optional(ZeroTrustGatewayItemsInput),
        name: ZeroTrustGatewayName,
        type: ZeroTrustGatewaySchemasType,
      }),
    })
      .response(ZeroTrustGatewaySingleResponseWithListItems)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Create Zero Trust list")
      .description("Creates a new Zero Trust list.")
      .operationId("zero-trust-lists-create-zero-trust-list")
      .tag("Zero Trust lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/lists/{list_id}", {
      params: Type.Object({ list_id: ZeroTrustGatewaySchemasUuid }),
    })
      .response(ZeroTrustGatewayListSingleResponse)
      .error(
        "4XX",
        Type.Object(
          {
            errors: D1Messages,
            messages: D1Messages,
            success: Type.Union([Type.Literal(true), Type.Literal(false)], {
              description: "Indicate whether the API call was successful.",
            }),
            result: Type.Union([Type.Null()]),
          },
          { "x-auditable": true },
        ),
      )
      .summary("Get Zero Trust list details")
      .description("Fetch a single Zero Trust list.")
      .operationId("zero-trust-lists-zero-trust-list-details")
      .tag("Zero Trust lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.put("/lists/{list_id}", {
      params: Type.Object({ list_id: ZeroTrustGatewaySchemasUuid }),
      body: Type.Object({
        description: Type.Optional(ZeroTrustGatewayDescription),
        items: Type.Optional(ZeroTrustGatewayItemsInput),
        name: ZeroTrustGatewayName,
      }),
    })
      .response(ZeroTrustGatewayListSingleResponse)
      .error(
        "4XX",
        Type.Object(
          {
            errors: D1Messages,
            messages: D1Messages,
            success: Type.Union([Type.Literal(true), Type.Literal(false)], {
              description: "Indicate whether the API call was successful.",
            }),
            result: Type.Union([Type.Null()]),
          },
          { "x-auditable": true },
        ),
      )
      .summary("Update Zero Trust list")
      .description(
        "Updates a configured Zero Trust list. Skips updating list items if not included in the payload. A non empty list items will overwrite the existing list.",
      )
      .operationId("zero-trust-lists-update-zero-trust-list")
      .tag("Zero Trust lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.patch("/lists/{list_id}", {
      params: Type.Object({ list_id: ZeroTrustGatewaySchemasUuid }),
      body: Type.Object({
        append: Type.Optional(ZeroTrustGatewayItemsInput),
        remove: Type.Optional(
          Type.Array(ZeroTrustGatewayValue, { description: "Lists of item values you want to remove." }),
        ),
      }),
    })
      .response(ZeroTrustGatewayListSingleResponse)
      .error(
        "4XX",
        Type.Object(
          {
            errors: D1Messages,
            messages: D1Messages,
            success: Type.Union([Type.Literal(true), Type.Literal(false)], {
              description: "Indicate whether the API call was successful.",
            }),
            result: Type.Union([Type.Null()]),
          },
          { "x-auditable": true },
        ),
      )
      .summary("Patch Zero Trust list.")
      .description("Appends or removes an item from a configured Zero Trust list.")
      .operationId("zero-trust-lists-patch-zero-trust-list")
      .tag("Zero Trust lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.delete("/lists/{list_id}", {
      params: Type.Object({ list_id: ZeroTrustGatewaySchemasUuid }),
    })
      .response(ZeroTrustGatewayEmptyResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Delete Zero Trust list")
      .description("Deletes a Zero Trust list.")
      .operationId("zero-trust-lists-delete-zero-trust-list")
      .tag("Zero Trust lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/lists/{list_id}/items", {
      params: Type.Object({ list_id: ZeroTrustGatewaySchemasUuid }),
    })
      .response(ZeroTrustGatewayListItemResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Optional(
                Type.Number({ description: "Shows the total results returned based on your search parameters." }),
              ),
              page: Type.Optional(
                Type.Number({ description: "Show the current page within paginated list of results." }),
              ),
              per_page: Type.Optional(Type.Number({ description: "Show the number of results per page of results." })),
              total_count: Type.Optional(
                Type.Number({ description: "Show the total results available without any search parameters." }),
              ),
            }),
          ),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Get Zero Trust list items")
      .description("Fetch all items in a single Zero Trust list.")
      .operationId("zero-trust-lists-zero-trust-list-items")
      .tag("Zero Trust lists")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.get("/locations", {})
      .response(ZeroTrustGatewayComponentsSchemasResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result_info: Type.Optional(ZeroTrustGatewayResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("List Zero Trust Gateway locations")
      .description("List Zero Trust Gateway locations for an account.")
      .operationId("zero-trust-gateway-locations-list-zero-trust-gateway-locations")
      .tag("Zero Trust Gateway locations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare Zero Trust Secure DNS Locations Write",
        "Zero Trust Read",
        "Zero Trust Write",
      ])

    g.post("/locations", {
      body: Type.Object({
        client_default: Type.Optional(ZeroTrustGatewayClientDefault),
        dns_destination_ips_id: Type.Optional(ZeroTrustGatewayDnsDestinationIpsIdWrite),
        ecs_support: Type.Optional(ZeroTrustGatewayEcsSupport),
        endpoints: Type.Optional(ZeroTrustGatewayEndpoints),
        name: ZeroTrustGatewaySchemasName,
        networks: Type.Optional(ZeroTrustGatewayIpv4Networks),
      }),
    })
      .response(ZeroTrustGatewaySchemasSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: UnnamedSchemaRef1b37523fdb0ae5806cd8e062492aab66,
        }),
      )
      .summary("Create a Zero Trust Gateway location")
      .description("Create a new Zero Trust Gateway location.")
      .operationId("zero-trust-gateway-locations-create-zero-trust-gateway-location")
      .tag("Zero Trust Gateway locations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare Zero Trust Secure DNS Locations Write", "Zero Trust Write"])

    g.get("/locations/{location_id}", {
      params: Type.Object({ location_id: ZeroTrustGatewayComponentsSchemasUuid }),
    })
      .response(ZeroTrustGatewaySchemasSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: UnnamedSchemaRef1b37523fdb0ae5806cd8e062492aab66,
        }),
      )
      .summary("Get Zero Trust Gateway location details")
      .description("Get a single Zero Trust Gateway location.")
      .operationId("zero-trust-gateway-locations-zero-trust-gateway-location-details")
      .tag("Zero Trust Gateway locations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", [
        "Cloudflare Zero Trust Secure DNS Locations Write",
        "Zero Trust Read",
        "Zero Trust Write",
      ])

    g.put("/locations/{location_id}", {
      params: Type.Object({ location_id: ZeroTrustGatewayComponentsSchemasUuid }),
      body: Type.Object({
        client_default: Type.Optional(ZeroTrustGatewayClientDefault),
        dns_destination_ips_id: Type.Optional(ZeroTrustGatewayDnsDestinationIpsIdWrite),
        ecs_support: Type.Optional(ZeroTrustGatewayEcsSupport),
        endpoints: Type.Optional(ZeroTrustGatewayEndpoints),
        name: ZeroTrustGatewaySchemasName,
        networks: Type.Optional(ZeroTrustGatewayIpv4Networks),
      }),
    })
      .response(ZeroTrustGatewaySchemasSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: UnnamedSchemaRef1b37523fdb0ae5806cd8e062492aab66,
        }),
      )
      .summary("Update a Zero Trust Gateway location")
      .description("Update a configured Zero Trust Gateway location.")
      .operationId("zero-trust-gateway-locations-update-zero-trust-gateway-location")
      .tag("Zero Trust Gateway locations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare Zero Trust Secure DNS Locations Write", "Zero Trust Write"])

    g.delete("/locations/{location_id}", {
      params: Type.Object({ location_id: ZeroTrustGatewayComponentsSchemasUuid }),
    })
      .response(ZeroTrustGatewayEmptyResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Delete a Zero Trust Gateway location")
      .description("Delete a configured Zero Trust Gateway location.")
      .operationId("zero-trust-gateway-locations-delete-zero-trust-gateway-location")
      .tag("Zero Trust Gateway locations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Cloudflare Zero Trust Secure DNS Locations Write", "Zero Trust Write"])

    g.get("/logging", {})
      .response(ZeroTrustGatewayGatewayAccountLoggingSettingsResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Get logging settings for the Zero Trust account")
      .description("Retrieve the current logging settings for the Zero Trust account.")
      .operationId("zero-trust-accounts-get-logging-settings-for-the-zero-trust-account")
      .tag("Zero Trust accounts")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.put("/logging", {
      body: ZeroTrustGatewayGatewayAccountLoggingSettings,
    })
      .response(ZeroTrustGatewayGatewayAccountLoggingSettingsResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Update Zero Trust account logging settings")
      .description("Update logging settings for the current Zero Trust account.")
      .operationId("zero-trust-accounts-update-logging-settings-for-the-zero-trust-account")
      .tag("Zero Trust accounts")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/proxy_endpoints", {})
      .response(ZeroTrustGatewayProxyEndpointsComponentsSchemasSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: UnnamedSchemaRef4753ee81779d0e57189420079abab61e,
        }),
      )
      .summary("List proxy endpoints")
      .description("List all Zero Trust Gateway proxy endpoints for an account.")
      .operationId("zero-trust-gateway-proxy-endpoints-list-proxy-endpoints")
      .tag("Zero Trust Gateway proxy endpoints")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.post("/proxy_endpoints", {
      body: Type.Object({
        ips: ZeroTrustGatewayIps,
        name: ZeroTrustGatewayProxyEndpointsComponentsSchemasName,
      }),
    })
      .response(ZeroTrustGatewayProxyEndpointsComponentsSchemasSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: UnnamedSchemaRef4753ee81779d0e57189420079abab61e,
        }),
      )
      .summary("Create a proxy endpoint")
      .description("Create a new Zero Trust Gateway proxy endpoint.")
      .operationId("zero-trust-gateway-proxy-endpoints-create-proxy-endpoint")
      .tag("Zero Trust Gateway proxy endpoints")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/proxy_endpoints/{proxy_endpoint_id}", {
      params: Type.Object({ proxy_endpoint_id: ZeroTrustGatewayComponentsSchemasUuid }),
    })
      .response(ZeroTrustGatewayProxyEndpointsComponentsSchemasResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result_info: Type.Optional(ZeroTrustGatewayResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Get a proxy endpoint")
      .description("Get a single Zero Trust Gateway proxy endpoint.")
      .operationId("zero-trust-gateway-proxy-endpoints-proxy-endpoint-details")
      .tag("Zero Trust Gateway proxy endpoints")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.patch("/proxy_endpoints/{proxy_endpoint_id}", {
      params: Type.Object({ proxy_endpoint_id: ZeroTrustGatewayComponentsSchemasUuid }),
      body: Type.Object({
        ips: Type.Optional(ZeroTrustGatewayIps),
        name: Type.Optional(ZeroTrustGatewayProxyEndpointsComponentsSchemasName),
      }),
    })
      .response(ZeroTrustGatewayProxyEndpointsComponentsSchemasSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: UnnamedSchemaRef4753ee81779d0e57189420079abab61e,
        }),
      )
      .summary("Update a proxy endpoint")
      .description("Update a configured Zero Trust Gateway proxy endpoint.")
      .operationId("zero-trust-gateway-proxy-endpoints-update-proxy-endpoint")
      .tag("Zero Trust Gateway proxy endpoints")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.delete("/proxy_endpoints/{proxy_endpoint_id}", {
      params: Type.Object({ proxy_endpoint_id: ZeroTrustGatewayComponentsSchemasUuid }),
    })
      .response(ZeroTrustGatewayEmptyResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Delete a proxy endpoint")
      .description("Delete a configured Zero Trust Gateway proxy endpoint.")
      .operationId("zero-trust-gateway-proxy-endpoints-delete-proxy-endpoint")
      .tag("Zero Trust Gateway proxy endpoints")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/rules", {})
      .response(ZeroTrustGatewayRulesComponentsSchemasResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result_info: Type.Optional(ZeroTrustGatewayResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("List Zero Trust Gateway rules")
      .description("List Zero Trust Gateway rules for an account.")
      .operationId("zero-trust-gateway-rules-list-zero-trust-gateway-rules")
      .tag("Zero Trust Gateway rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.post("/rules", {
      body: Type.Object({
        action: ZeroTrustGatewayAction,
        description: Type.Optional(ZeroTrustGatewaySchemasDescription),
        device_posture: Type.Optional(ZeroTrustGatewayDevicePosture),
        enabled: Type.Optional(ZeroTrustGatewayEnabled),
        expiration: Type.Optional(ZeroTrustGatewayExpiration),
        filters: Type.Optional(ZeroTrustGatewayFilters),
        identity: Type.Optional(ZeroTrustGatewayIdentity),
        name: ZeroTrustGatewayComponentsSchemasName,
        precedence: Type.Optional(ZeroTrustGatewayPrecedence),
        rule_settings: Type.Optional(ZeroTrustGatewayRuleSettings),
        schedule: Type.Optional(ZeroTrustGatewaySchedule),
        traffic: Type.Optional(ZeroTrustGatewayTraffic),
      }),
    })
      .response(ZeroTrustGatewayComponentsSchemasSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Create a Zero Trust Gateway rule")
      .description("Create a new Zero Trust Gateway rule.")
      .operationId("zero-trust-gateway-rules-create-zero-trust-gateway-rule")
      .tag("Zero Trust Gateway rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.get("/rules/tenant", {})
      .response(ZeroTrustGatewayRulesComponentsSchemasResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result_info: Type.Optional(ZeroTrustGatewayResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("List Zero Trust Gateway rules inherited from the parent account")
      .description("List Zero Trust Gateway rules for the parent account of an account in the MSP configuration.")
      .operationId("zero-trust-gateway-rules-list-zero-trust-gateway-rules-tenant")
      .tag("Zero Trust Gateway rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.get("/rules/{rule_id}", {
      params: Type.Object({ rule_id: ZeroTrustGatewaySchemasUuid }),
    })
      .response(ZeroTrustGatewayComponentsSchemasSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Get Zero Trust Gateway rule details.")
      .description("Get a single Zero Trust Gateway rule.")
      .operationId("zero-trust-gateway-rules-zero-trust-gateway-rule-details")
      .tag("Zero Trust Gateway rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Read", "Zero Trust Write"])

    g.put("/rules/{rule_id}", {
      params: Type.Object({ rule_id: ZeroTrustGatewaySchemasUuid }),
      body: Type.Object({
        action: ZeroTrustGatewayAction,
        description: Type.Optional(ZeroTrustGatewaySchemasDescription),
        device_posture: Type.Optional(ZeroTrustGatewayDevicePosture),
        enabled: Type.Optional(ZeroTrustGatewayEnabled),
        expiration: Type.Optional(ZeroTrustGatewayExpiration),
        filters: Type.Optional(ZeroTrustGatewayFilters),
        identity: Type.Optional(ZeroTrustGatewayIdentity),
        name: ZeroTrustGatewayComponentsSchemasName,
        precedence: Type.Optional(ZeroTrustGatewayPrecedence),
        rule_settings: Type.Optional(ZeroTrustGatewayRuleSettings),
        schedule: Type.Optional(ZeroTrustGatewaySchedule),
        traffic: Type.Optional(ZeroTrustGatewayTraffic),
      }),
    })
      .response(ZeroTrustGatewayComponentsSchemasSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Update a Zero Trust Gateway rule")
      .description("Update a configured Zero Trust Gateway rule.")
      .operationId("zero-trust-gateway-rules-update-zero-trust-gateway-rule")
      .tag("Zero Trust Gateway rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.delete("/rules/{rule_id}", {
      params: Type.Object({ rule_id: ZeroTrustGatewaySchemasUuid }),
    })
      .response(ZeroTrustGatewayEmptyResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Delete a Zero Trust Gateway rule")
      .description("Delete a Zero Trust Gateway rule.")
      .operationId("zero-trust-gateway-rules-delete-zero-trust-gateway-rule")
      .tag("Zero Trust Gateway rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])

    g.post("/rules/{rule_id}/reset_expiration", {
      params: Type.Object({ rule_id: ZeroTrustGatewaySchemasUuid }),
    })
      .response(ZeroTrustGatewayComponentsSchemasSingleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Indicate whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      )
      .summary("Reset the expiration of a Zero Trust Gateway Rule")
      .description(
        "Resets the expiration of a Zero Trust Gateway Rule if its duration elapsed and it has a default duration. The Zero Trust Gateway Rule must have values  for both `expiration.expires_at` and `expiration.duration`.",
      )
      .operationId("zero-trust-gateway-rules-reset-expiration-zero-trust-gateway-rule")
      .tag("Zero Trust Gateway rules")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Zero Trust Write"])
  })
}

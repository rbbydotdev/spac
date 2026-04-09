import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  D1Messages,
  DlpMessages,
  IntelAsn,
  IntelResultInfo,
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
  CloudforceOneWhoisSchemasSingleResponse,
  CustomIndicatorFeedsApiResponseCommonFailure,
  CustomIndicatorFeedsCreateFeed,
  CustomIndicatorFeedsCreateFeedResponse,
  CustomIndicatorFeedsFeedId,
  CustomIndicatorFeedsIndicatorFeedMetadataResponse,
  CustomIndicatorFeedsIndicatorFeedResponse,
  CustomIndicatorFeedsPermissionListItemResponse,
  CustomIndicatorFeedsPermissionsRequest,
  CustomIndicatorFeedsPermissionsResponse,
  CustomIndicatorFeedsUpdateFeedResponse,
  CustomIndicatorFeedsUpdatePublicFieldRequest,
  IntelApiResponseSingle,
  IntelAsnComponentsSchemasResponse,
  IntelCollectionResponse,
  IntelComponentsSchemasResponse,
  IntelComponentsSchemasSingleResponse,
  IntelCount,
  IntelMiscategorization,
  IntelPage,
  IntelPerPage,
  IntelResponse,
  IntelSchemasResponse,
  IntelSingleResponse,
  IntelSinkholesGetSinkholesResponse,
  IntelStartEndParams,
} from "./schemas"

export function registerIntel(api: Api) {
  api.group("/accounts/{account_id}/intel", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/asn/{asn}", {
      params: Type.Object({ asn: IntelAsn }),
      responses: {
        200: IntelAsnComponentsSchemasResponse,
        "4XX": Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Union([Type.Null()], { "x-auditable": true }),
        }),
      },
    })
      .summary("Get ASN Overview.")
      .description("Gets an overview of the Autonomous System Number (ASN) and a list of subnets for it.")
      .operationId("asn-intelligence-get-asn-overview")
      .tag("ASN Intelligence")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/asn/{asn}/subnets", {
      params: Type.Object({ asn: IntelAsn }),
      responses: {
        200: Type.Object({
          asn: Type.Optional(IntelAsn),
          count: Type.Optional(IntelCount),
          ip_count_total: Type.Optional(Type.Integer()),
          page: Type.Optional(IntelPage),
          per_page: Type.Optional(IntelPerPage),
          subnets: Type.Optional(Type.Array(Type.String())),
        }),
        "4XX": Type.Object({
          asn: Type.Optional(IntelAsn),
          count: Type.Optional(IntelCount),
          ip_count_total: Type.Optional(Type.Integer()),
          page: Type.Optional(IntelPage),
          per_page: Type.Optional(IntelPerPage),
          subnets: Type.Optional(Type.Array(Type.String())),
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Boolean({ description: "Whether the API call was successful." }),
        }),
      },
    })
      .summary("Get ASN Subnets")
      .description("Get ASN Subnets.")
      .operationId("asn-intelligence-get-asn-subnets")
      .tag("ASN Intelligence")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/attack-surface-report/issue-types", {
      responses: {
        200: Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(Type.Array(Type.String())),
        }),
        "4XX": SecurityCenterApiResponseCommonFailure,
      },
    })
      .summary("Get Security Center Issues Types")
      .operationId("get-security-center-issue-types")
      .tag("Security Center Insights")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)

    g.get("/attack-surface-report/issues", {
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
      responses: {
        200: Type.Object({
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
        "4XX": SecurityCenterApiResponseCommonFailure,
      },
    })
      .summary("Get Security Center Issues")
      .operationId("get-security-center-issues")
      .tag("Security Center Insights")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)

    g.get("/attack-surface-report/issues/class", {
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
      responses: {
        200: SecurityCenterValuecountsresponse,
        "4XX": SecurityCenterApiResponseCommonFailure,
      },
    })
      .summary("Get Security Center Issue Counts by Class")
      .operationId("get-security-center-issue-counts-by-class")
      .tag("Security Center Insights")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/attack-surface-report/issues/severity", {
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
      responses: {
        200: SecurityCenterValuecountsresponse,
        "4XX": SecurityCenterApiResponseCommonFailure,
      },
    })
      .summary("Get Security Center Issue Counts by Severity")
      .operationId("get-security-center-issue-counts-by-severity")
      .tag("Security Center Insights")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)

    g.get("/attack-surface-report/issues/type", {
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
      responses: {
        200: SecurityCenterValuecountsresponse,
        "4XX": SecurityCenterApiResponseCommonFailure,
      },
    })
      .summary("Get Security Center Issue Counts by Type")
      .operationId("get-security-center-issue-counts-by-type")
      .tag("Security Center Insights")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)

    g.put("/attack-surface-report/{issue_id}/dismiss", {
      params: Type.Object({ issue_id: Type.String() }),
      body: Type.Object({
        dismiss: Type.Optional(Type.Boolean({ default: true, "x-auditable": true })),
      }),
      responses: {
        200: SecurityCenterApiResponseSingle,
        "4XX": SecurityCenterApiResponseCommonFailure,
      },
    })
      .summary("Archive Security Center Insight")
      .operationId("archive-security-center-insight-deprecated")
      .tag("Security Center Insights")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)

    g.get("/dns", {
      query: Type.Object({
        start_end_params: Type.Optional(IntelStartEndParams),
        ipv4: Type.Optional(Type.String()),
        page: Type.Optional(Type.Number({ description: "Requested page within paginated list of results." })),
        per_page: Type.Optional(Type.Number({ description: "Maximum number of results requested." })),
      }),
      responses: {
        200: IntelComponentsSchemasSingleResponse,
        "4XX": Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(IntelResultInfo),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Get Passive DNS by IP")
      .description("Gets a list of all the domains that have resolved to a specific IP address.")
      .operationId("passive-dns-by-ip-get-passive-dns-by-ip")
      .tag("Passive DNS by IP")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/domain", {
      query: Type.Object({
        domain: Type.Optional(Type.String()),
      }),
      responses: {
        200: IntelSingleResponse,
        "4XX": Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Get Domain Details")
      .description("Gets security details and statistics about a domain.")
      .operationId("domain-intelligence-get-domain-details")
      .tag("Domain Intelligence")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/domain-history", {
      query: Type.Object({
        domain: Type.Optional(Type.String()),
      }),
      responses: {
        200: IntelResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
      .summary("Get Domain History")
      .description(
        "Gets historical security threat and content categories currently and previously assigned to a domain.",
      )
      .operationId("domain-history-get-domain-history")
      .tag("Domain History")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/domain/bulk", {
      query: Type.Object({
        domain: Type.Optional(Type.Array(Type.String())),
      }),
      responses: {
        200: IntelCollectionResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
      .summary("Get Multiple Domain Details")
      .description("Same as summary.")
      .operationId("domain-intelligence-get-multiple-domain-details")
      .tag("Domain Intelligence")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/indicator-feeds", {
      responses: {
        200: CustomIndicatorFeedsIndicatorFeedResponse,
        "4XX": Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Get indicator feeds owned by this account")
      .operationId("custom-indicator-feeds-get-indicator-feeds")
      .tag("Custom Indicator Feeds")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.post("/indicator-feeds", {
      body: CustomIndicatorFeedsCreateFeed,
      responses: {
        200: CustomIndicatorFeedsCreateFeedResponse,
        "4XX": Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Create new indicator feed")
      .operationId("custom-indicator-feeds-create-indicator-feeds")
      .tag("Custom Indicator Feeds")
      .security({ api_email: [], api_key: [] })

    g.put("/indicator-feeds/permissions/add", {
      body: CustomIndicatorFeedsPermissionsRequest,
      responses: {
        200: CustomIndicatorFeedsPermissionsResponse,
        "4XX": Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Grant permission to indicator feed")
      .operationId("custom-indicator-feeds-add-permission")
      .tag("Custom Indicator Feeds")
      .security({ api_email: [], api_key: [] })

    g.put("/indicator-feeds/permissions/remove", {
      body: CustomIndicatorFeedsPermissionsRequest,
      responses: {
        200: CustomIndicatorFeedsPermissionsResponse,
        "4XX": Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Revoke permission to indicator feed")
      .operationId("custom-indicator-feeds-remove-permission")
      .tag("Custom Indicator Feeds")
      .security({ api_email: [], api_key: [] })

    g.get("/indicator-feeds/permissions/view", {
      responses: {
        200: CustomIndicatorFeedsPermissionListItemResponse,
        "4XX": Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("List indicator feed permissions")
      .operationId("custom-indicator-feeds-view-permissions")
      .tag("Custom Indicator Feeds")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/indicator-feeds/{feed_id}", {
      params: Type.Object({ feed_id: CustomIndicatorFeedsFeedId }),
      responses: {
        200: CustomIndicatorFeedsIndicatorFeedMetadataResponse,
        "4XX": Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Get indicator feed metadata")
      .operationId("custom-indicator-feeds-get-indicator-feed-metadata")
      .tag("Custom Indicator Feeds")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.put("/indicator-feeds/{feed_id}", {
      params: Type.Object({ feed_id: CustomIndicatorFeedsFeedId }),
      body: CustomIndicatorFeedsUpdatePublicFieldRequest,
      responses: {
        200: CustomIndicatorFeedsCreateFeedResponse,
        "4XX": Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Update indicator feed metadata")
      .operationId("custom-indicator-feeds-update-indicator-feed-metadata")
      .tag("Custom Indicator Feeds")
      .security({ api_email: [], api_key: [] })

    g.get("/indicator-feeds/{feed_id}/data", {
      params: Type.Object({ feed_id: CustomIndicatorFeedsFeedId }),
      responses: {
        "4XX": CustomIndicatorFeedsApiResponseCommonFailure,
      },
    })
      .summary("Get indicator feed data")
      .operationId("custom-indicator-feeds-get-indicator-feed-data")
      .tag("Custom Indicator Feeds")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/indicator-feeds/{feed_id}/download", {
      params: Type.Object({ feed_id: CustomIndicatorFeedsFeedId }),
      responses: {
        200: CustomIndicatorFeedsUpdateFeedResponse,
        "4XX": CustomIndicatorFeedsApiResponseCommonFailure,
      },
    })
      .summary("Download indicator feed data")
      .operationId("custom-indicator-feeds-download-indicator-feed-data")
      .tag("Custom Indicator Feeds")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.put("/indicator-feeds/{feed_id}/snapshot", {
      params: Type.Object({ feed_id: CustomIndicatorFeedsFeedId }),
      responses: {
        200: CustomIndicatorFeedsUpdateFeedResponse,
        "4XX": CustomIndicatorFeedsApiResponseCommonFailure,
      },
    })
      .summary("Update indicator feed data")
      .operationId("custom-indicator-feeds-update-indicator-feed-data")
      .tag("Custom Indicator Feeds")
      .security({ api_email: [], api_key: [] })

    g.get("/ip", {
      query: Type.Object({
        ipv4: Type.Optional(Type.String()),
        ipv6: Type.Optional(Type.String()),
      }),
      responses: {
        200: IntelSchemasResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
      .summary("Get IP Overview")
      .description(
        "Gets the geolocation, ASN, infrastructure type of the ASN, and any security threat categories of an IP address. **Must provide ip query parameters.** For example, `/intel/ip?ipv4=1.1.1.1` or `/intel/ip?ipv6=2001:db8::1`.",
      )
      .operationId("ip-intelligence-get-ip-overview")
      .tag("IP Intelligence")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/ip-list", {
      responses: {
        200: IntelComponentsSchemasResponse,
        "4XX": Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result_info: Type.Optional(IntelResultInfo),
        }),
      },
    })
      .summary("Get IP Lists")
      .description("Get IP Lists.")
      .operationId("ip-list-get-ip-lists")
      .tag("IP List")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.post("/miscategorization", {
      body: IntelMiscategorization,
      responses: {
        200: IntelApiResponseSingle,
        "4XX": Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Create Miscategorization")
      .description("Allows you to submit requests to change a domain’s category.")
      .operationId("miscategorization-create-miscategorization")
      .tag("Miscategorization")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/sinkholes", {
      response: IntelSinkholesGetSinkholesResponse,
    })
      .summary("List sinkholes owned by this account")
      .operationId("sinkhole-config-get-sinkholes")
      .tag("Sinkhole Config")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])

    g.get("/whois", {
      query: Type.Object({
        domain: Type.Optional(Type.String()),
      }),
      responses: {
        200: CloudforceOneWhoisSchemasSingleResponse,
        "4XX": Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          messages: Type.Array(
            Type.Object({
              code: Type.Integer({ minimum: 1000 }),
              documentation_url: Type.Optional(Type.String()),
              message: Type.String(),
              source: Type.Optional(
                Type.Object({
                  pointer: Type.Optional(Type.String()),
                }),
              ),
            }),
          ),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Returns a boolean for the success/failure of the API call.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Get WHOIS Record")
      .operationId("whois-record-get-whois-record")
      .tag("WHOIS Record")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Intel Write", "Intel Read"])
  })
}

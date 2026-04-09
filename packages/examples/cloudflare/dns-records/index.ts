import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier, DnsRecordsPage } from "../shared/schemas"
import {
  DnsRecordsApiResponseCommonFailure,
  DnsRecordsDirection,
  DnsRecordsDnsRecordPost,
  DnsRecordsDnsRecordWithData,
  DnsRecordsDnsRecordWithoutData,
  DnsRecordsDnsRequestBatchObject,
  DnsRecordsDnsRequestReviewScanObject,
  DnsRecordsDnsResponseBatch,
  DnsRecordsDnsResponseCollection,
  DnsRecordsDnsResponseImportScan,
  DnsRecordsDnsResponseReviewScan,
  DnsRecordsDnsResponseSingle,
  DnsRecordsDnsResponseTriggerScan,
  DnsRecordsMatch,
  DnsRecordsOrder,
  DnsRecordsPerPage,
  DnsRecordsProxied,
  DnsRecordsSearch,
  DnsRecordsTagMatch,
  DnsRecordsType,
} from "./schemas"

export function registerDnsRecords(api: Api) {
  api.group("/zones/{zone_id}/dns_records", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        name: Type.Optional(
          Type.String({
            description: "Exact value of the DNS record name. This is a convenience alias for `name.exact`.\n",
          }),
        ),
        "name.exact": Type.Optional(
          Type.String({ description: "Exact value of the DNS record name. Name filters are case-insensitive.\n" }),
        ),
        "name.contains": Type.Optional(
          Type.String({ description: "Substring of the DNS record name. Name filters are case-insensitive.\n" }),
        ),
        "name.startswith": Type.Optional(
          Type.String({ description: "Prefix of the DNS record name. Name filters are case-insensitive.\n" }),
        ),
        "name.endswith": Type.Optional(
          Type.String({ description: "Suffix of the DNS record name. Name filters are case-insensitive.\n" }),
        ),
        type: Type.Optional(DnsRecordsType),
        content: Type.Optional(
          Type.String({
            description: "Exact value of the DNS record content. This is a convenience alias for `content.exact`.\n",
          }),
        ),
        "content.exact": Type.Optional(
          Type.String({
            description: "Exact value of the DNS record content. Content filters are case-insensitive.\n",
          }),
        ),
        "content.contains": Type.Optional(
          Type.String({ description: "Substring of the DNS record content. Content filters are case-insensitive.\n" }),
        ),
        "content.startswith": Type.Optional(
          Type.String({ description: "Prefix of the DNS record content. Content filters are case-insensitive.\n" }),
        ),
        "content.endswith": Type.Optional(
          Type.String({ description: "Suffix of the DNS record content. Content filters are case-insensitive.\n" }),
        ),
        proxied: Type.Optional(DnsRecordsProxied),
        match: Type.Optional(DnsRecordsMatch),
        comment: Type.Optional(
          Type.String({
            description: "Exact value of the DNS record comment. This is a convenience alias for `comment.exact`.\n",
          }),
        ),
        "comment.present": Type.Optional(
          Type.String({ description: "If this parameter is present, only records *with* a comment are returned.\n" }),
        ),
        "comment.absent": Type.Optional(
          Type.String({
            description: "If this parameter is present, only records *without* a comment are returned.\n",
          }),
        ),
        "comment.exact": Type.Optional(
          Type.String({
            description: "Exact value of the DNS record comment. Comment filters are case-insensitive.\n",
          }),
        ),
        "comment.contains": Type.Optional(
          Type.String({ description: "Substring of the DNS record comment. Comment filters are case-insensitive.\n" }),
        ),
        "comment.startswith": Type.Optional(
          Type.String({ description: "Prefix of the DNS record comment. Comment filters are case-insensitive.\n" }),
        ),
        "comment.endswith": Type.Optional(
          Type.String({ description: "Suffix of the DNS record comment. Comment filters are case-insensitive.\n" }),
        ),
        tag: Type.Optional(
          Type.String({
            description:
              "Condition on the DNS record tag.\n\nParameter values can be of the form `<tag-name>:<tag-value>` to search for an exact `name:value` pair, or just `<tag-name>` to search for records with a specific tag name regardless of its value.\n\nThis is a convenience shorthand for the more powerful `tag.<predicate>` parameters.\nExamples:\n- `tag=important` is equivalent to `tag.present=important`\n- `tag=team:DNS` is equivalent to `tag.exact=team:DNS`\n",
          }),
        ),
        "tag.present": Type.Optional(
          Type.String({
            description: "Name of a tag which must be present on the DNS record. Tag filters are case-insensitive.\n",
          }),
        ),
        "tag.absent": Type.Optional(
          Type.String({
            description:
              "Name of a tag which must *not* be present on the DNS record. Tag filters are case-insensitive.\n",
          }),
        ),
        "tag.exact": Type.Optional(
          Type.String({
            description:
              "A tag and value, of the form `<tag-name>:<tag-value>`. The API will only return DNS records that have a tag named `<tag-name>` whose value is `<tag-value>`. Tag filters are case-insensitive.\n",
          }),
        ),
        "tag.contains": Type.Optional(
          Type.String({
            description:
              "A tag and value, of the form `<tag-name>:<tag-value>`. The API will only return DNS records that have a tag named `<tag-name>` whose value contains `<tag-value>`. Tag filters are case-insensitive.\n",
          }),
        ),
        "tag.startswith": Type.Optional(
          Type.String({
            description:
              "A tag and value, of the form `<tag-name>:<tag-value>`. The API will only return DNS records that have a tag named `<tag-name>` whose value starts with `<tag-value>`. Tag filters are case-insensitive.\n",
          }),
        ),
        "tag.endswith": Type.Optional(
          Type.String({
            description:
              "A tag and value, of the form `<tag-name>:<tag-value>`. The API will only return DNS records that have a tag named `<tag-name>` whose value ends with `<tag-value>`. Tag filters are case-insensitive.\n",
          }),
        ),
        search: Type.Optional(DnsRecordsSearch),
        tag_match: Type.Optional(DnsRecordsTagMatch),
        page: Type.Optional(DnsRecordsPage),
        per_page: Type.Optional(DnsRecordsPerPage),
        order: Type.Optional(DnsRecordsOrder),
        direction: Type.Optional(DnsRecordsDirection),
      }),
      responses: {
        200: DnsRecordsDnsResponseCollection,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result_info: Type.Optional(
            Type.Object({
              count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
              per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
              total_count: Type.Optional(
                Type.Number({ description: "Total results available without any search parameters." }),
              ),
            }),
          ),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("List DNS Records")
      .description("List, search, sort, and filter a zones' DNS records.")
      .operationId("dns-records-for-a-zone-list-dns-records")
      .tag("DNS Records for a Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Read", "DNS Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/", {
      body: DnsRecordsDnsRecordPost,
      responses: {
        200: DnsRecordsDnsResponseSingle,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([DnsRecordsDnsRecordWithoutData, DnsRecordsDnsRecordWithData]),
        }),
      },
    })
      .summary("Create DNS Record")
      .description(
        "Create a new DNS record for a zone.\n\nNotes:\n- A/AAAA records cannot exist on the same name as CNAME records.\n- NS records cannot exist on the same name as any other record type.\n- Domain names are always represented in Punycode, even if Unicode\n  characters were used when creating the record.\n",
      )
      .operationId("dns-records-for-a-zone-create-dns-record")
      .tag("DNS Records for a Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/batch", {
      body: DnsRecordsDnsRequestBatchObject,
      responses: {
        200: DnsRecordsDnsResponseBatch,
        "4XX": DnsRecordsApiResponseCommonFailure,
      },
    })
      .summary("Batch DNS Records")
      .description(
        'Send a Batch of DNS Record API calls to be executed together.\n\nNotes:\n- Although Cloudflare will execute the batched operations in a single database transaction, Cloudflare\'s distributed KV store must treat each record change as a single key-value pair. This means that the propagation of changes is not atomic. See [the documentation](https://developers.cloudflare.com/dns/manage-dns-records/how-to/batch-record-changes/ "Batch DNS records") for more information.\n- The operations you specify within the /batch request body are always executed in the following order:\n\n    - Deletes\n    - Patches\n    - Puts\n    - Posts\n',
      )
      .operationId("dns-records-for-a-zone-batch-dns-records")
      .tag("DNS Records for a Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:batch"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/export", {
      responses: {
        "4XX": DnsRecordsApiResponseCommonFailure,
      },
    })
      .summary("Export DNS Records")
      .description(
        'You can export your [BIND config](https://en.wikipedia.org/wiki/Zone_file "Zone file") through this endpoint.\n\nSee [the documentation](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/ "Import and export records") for more information.',
      )
      .operationId("dns-records-for-a-zone-export-dns-records")
      .tag("DNS Records for a Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Read", "DNS Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/import", {
      responses: {
        200: DnsRecordsDnsResponseImportScan,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Import DNS Records")
      .description(
        'You can upload your [BIND config](https://en.wikipedia.org/wiki/Zone_file "Zone file") through this endpoint. It assumes that cURL is called from a location with bind_config.txt (valid BIND config) present.\n\nSee [the documentation](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/ "Import and export records") for more information.',
      )
      .operationId("dns-records-for-a-zone-import-dns-records")
      .tag("DNS Records for a Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/scan", {
      responses: {
        200: DnsRecordsDnsResponseImportScan,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Scan DNS Records")
      .description(
        "Scan for common DNS records on your domain and automatically add them to your zone. Useful if you haven't updated your nameservers yet.",
      )
      .operationId("dns-records-for-a-zone-scan-dns-records")
      .tag("DNS Records for a Zone")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
      .extension(
        "x-stainless-deprecation-message",
        "This endpoint is deprecated in favor of a new asynchronous version. Please use the [/scan/trigger](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/scan/trigger) and [/scan/review](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/scan/review) endpoints instead.\n",
      )

    g.get("/scan/review", {
      responses: {
        200: DnsRecordsDnsResponseCollection,
        "4XX": DnsRecordsApiResponseCommonFailure,
      },
    })
      .summary("List Scanned DNS Records")
      .description(
        "Retrieves the list of DNS records discovered up to this point by the asynchronous scan. These records are temporary until explicitly accepted or rejected via `POST /scan/review`. Additional records may be discovered by the scan later.\n",
      )
      .operationId("dns-records-for-a-zone-review-dns-scan")
      .tag("DNS Records for a Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Read", "DNS Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/scan/review", {
      body: DnsRecordsDnsRequestReviewScanObject,
      responses: {
        200: DnsRecordsDnsResponseReviewScan,
        "4XX": DnsRecordsApiResponseCommonFailure,
      },
    })
      .summary("Review Scanned DNS Records")
      .description(
        "Accept or reject DNS records found by the DNS records scan. Accepted records will be permanently added to the zone, while rejected records will be permanently deleted.\n",
      )
      .operationId("dns-records-for-a-zone-apply-dns-scan-results")
      .tag("DNS Records for a Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/scan/trigger", {
      responses: {
        200: DnsRecordsDnsResponseTriggerScan,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([Type.Null()]),
        }),
      },
    })
      .summary("Trigger DNS Record Scan")
      .description(
        "Initiates an asynchronous scan for common DNS records on your domain. Note that this **does not** automatically add records to your zone. The scan runs in the background, and results can be reviewed later using the `/scan/review` endpoints. Useful if you haven't updated your nameservers yet.",
      )
      .operationId("dns-records-for-a-zone-trigger-dns-scan")
      .tag("DNS Records for a Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/{dns_record_id}", {
      params: Type.Object({ dns_record_id: DlsIdentifier }),
      responses: {
        200: DnsRecordsDnsResponseSingle,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([DnsRecordsDnsRecordWithoutData, DnsRecordsDnsRecordWithData]),
        }),
      },
    })
      .summary("DNS Record Details")
      .operationId("dns-records-for-a-zone-dns-record-details")
      .tag("DNS Records for a Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Read", "DNS Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/{dns_record_id}", {
      params: Type.Object({ dns_record_id: DlsIdentifier }),
      body: DnsRecordsDnsRecordPost,
      responses: {
        200: DnsRecordsDnsResponseSingle,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([DnsRecordsDnsRecordWithoutData, DnsRecordsDnsRecordWithData]),
        }),
      },
    })
      .summary("Overwrite DNS Record")
      .description(
        "Overwrite an existing DNS record.\n\nNotes:\n- A/AAAA records cannot exist on the same name as CNAME records.\n- NS records cannot exist on the same name as any other record type.\n- Domain names are always represented in Punycode, even if Unicode\n  characters were used when creating the record.\n",
      )
      .operationId("dns-records-for-a-zone-update-dns-record")
      .tag("DNS Records for a Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/{dns_record_id}", {
      params: Type.Object({ dns_record_id: DlsIdentifier }),
      body: DnsRecordsDnsRecordPost,
      responses: {
        200: DnsRecordsDnsResponseSingle,
        "4XX": Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful.",
          }),
          result: Type.Union([DnsRecordsDnsRecordWithoutData, DnsRecordsDnsRecordWithData]),
        }),
      },
    })
      .summary("Update DNS Record")
      .description(
        "Update an existing DNS record.\n\nNotes:\n- A/AAAA records cannot exist on the same name as CNAME records.\n- NS records cannot exist on the same name as any other record type.\n- Domain names are always represented in Punycode, even if Unicode\n  characters were used when creating the record.\n",
      )
      .operationId("dns-records-for-a-zone-patch-dns-record")
      .tag("DNS Records for a Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/{dns_record_id}", {
      params: Type.Object({ dns_record_id: DlsIdentifier }),
      responses: {
        200: Type.Object({
          result: Type.Optional(
            Type.Object({
              id: Type.Optional(DlsIdentifier),
            }),
          ),
        }),
        "4XX": Type.Object({
          result: Type.Union([Type.Null()]),
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      },
    })
      .summary("Delete DNS Record")
      .operationId("dns-records-for-a-zone-delete-dns-record")
      .tag("DNS Records for a Zone")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["DNS Write"])
      .extension("x-cfPermissionsRequired", { enum: ["#dns_records:edit"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

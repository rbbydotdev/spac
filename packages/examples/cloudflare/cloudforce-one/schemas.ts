import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, MagicTransitUuid } from "../shared/schemas"

export const CloudforceOnePortScanApiPort = named(
  "cloudforce-one-port-scan-api_port",
  Type.Object({
    number: Type.Optional(Type.Number()),
    proto: Type.Optional(Type.String()),
    status: Type.Optional(Type.String()),
  }),
)

export const CloudforceOnePortScanApiPorts = named(
  "cloudforce-one-port-scan-api_ports",
  Type.Array(
    Type.String({
      description:
        'Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443"]). "default" scans the 100 most commonly open ports.',
    }),
    {
      description:
        'Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443"]). "default" scans the 100 most commonly open ports.',
      title: "Port List",
    },
  ),
)

export const CloudforceOnePortScanApiIps = named(
  "cloudforce-one-port-scan-api_ips",
  Type.Array(
    Type.String({
      description:
        "Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.",
    }),
    {
      description:
        "Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.",
      title: "IP List",
    },
  ),
)

export const CloudforceOnePortScanApiFrequency = named(
  "cloudforce-one-port-scan-api_frequency",
  Type.Number({ description: "Defines the number of days between each scan (0 = One-off scan).", title: "Frequency" }),
)

export const CloudforceOnePortScanApiApiResponseCommonFailure = named(
  "cloudforce-one-port-scan-api_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const CloudforceOnePortScanApiScanConfig = named(
  "cloudforce-one-port-scan-api_scan-config",
  Type.Object({
    account_id: Type.String(),
    frequency: CloudforceOnePortScanApiFrequency,
    id: Type.String({ description: "Defines the Config ID." }),
    ips: CloudforceOnePortScanApiIps,
    ports: CloudforceOnePortScanApiPorts,
  }),
)

export const CloudforceOneRequestsMessageContent = named(
  "cloudforce-one-requests_message-content",
  Type.String({ description: "Content of message.", "x-auditable": true }),
)

export const CloudforceOneRequestsRequestMessageEdit = named(
  "cloudforce-one-requests_request-message-edit",
  Type.Object({
    content: Type.Optional(CloudforceOneRequestsMessageContent),
  }),
)

export const CloudforceOneRequestsTime = named(
  "cloudforce-one-requests_time",
  Type.String({ format: "date-time", "x-auditable": true }),
)

export const CloudforceOneRequestsRequestMessageItem = named(
  "cloudforce-one-requests_request-message-item",
  Type.Object({
    author: Type.String({ description: "Author of message.", "x-auditable": true }),
    content: CloudforceOneRequestsMessageContent,
    created: Type.Optional(CloudforceOneRequestsTime),
    id: Type.Integer({ description: "Message ID.", "x-auditable": true }),
    is_follow_on_request: Type.Boolean({
      description: "Whether the message is a follow-on request.",
      "x-auditable": true,
    }),
    updated: CloudforceOneRequestsTime,
  }),
)

export const CloudforceOneRequestsRequestMessageList = named(
  "cloudforce-one-requests_request-message-list",
  Type.Object({
    after: Type.Optional(CloudforceOneRequestsTime),
    before: Type.Optional(CloudforceOneRequestsTime),
    page: Type.Integer({ description: "Page number of results." }),
    per_page: Type.Integer({ description: "Number of results per page." }),
    sort_by: Type.Optional(Type.String({ description: "Field to sort results by." })),
    sort_order: Type.Optional(
      Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Sort order (asc or desc)." }),
    ),
  }),
)

export const CloudforceOneRequestsAssetContent = named(
  "cloudforce-one-requests_asset-content",
  Type.String({ description: "Asset file to upload." }),
)

export const CloudforceOneRequestsRequestAssetEdit = named(
  "cloudforce-one-requests_request-asset-edit",
  Type.Object({
    source: Type.Optional(CloudforceOneRequestsAssetContent),
  }),
)

export const CloudforceOneRequestsRequestAssetItem = named(
  "cloudforce-one-requests_request-asset-item",
  Type.Object({
    created: Type.Optional(CloudforceOneRequestsTime),
    description: Type.Optional(Type.String({ description: "Asset description.", "x-auditable": true })),
    file_type: Type.Optional(Type.String({ description: "Asset file type.", "x-auditable": true })),
    id: Type.Integer({ description: "Asset ID.", "x-auditable": true }),
    name: Type.String({ description: "Asset name.", "x-auditable": true }),
  }),
)

export const CloudforceOneRequestsRequestAssetList = named(
  "cloudforce-one-requests_request-asset-list",
  Type.Object({
    page: Type.Integer({ description: "Page number of results." }),
    per_page: Type.Integer({ description: "Number of results per page." }),
  }),
)

export const CloudforceOneRequestsRequestTypes = named(
  "cloudforce-one-requests_request-types",
  Type.Array(Type.String({ description: "Request Types.", "x-auditable": true }), { title: "Request Types" }),
)

export const CloudforceOneRequestsApiResponseCommon = named(
  "cloudforce-one-requests_api-response-common",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const CloudforceOneRequestsQuota = named(
  "cloudforce-one-requests_quota",
  Type.Object({
    anniversary_date: Type.Optional(CloudforceOneRequestsTime),
    quarter_anniversary_date: Type.Optional(CloudforceOneRequestsTime),
    quota: Type.Optional(Type.Integer({ description: "Tokens for the quarter.", "x-auditable": true })),
    remaining: Type.Optional(Type.Integer({ description: "Tokens remaining for the quarter.", "x-auditable": true })),
  }),
)

export const CloudforceOneRequestsLabels = named(
  "cloudforce-one-requests_labels",
  Type.Array(Type.String(), { description: "List of labels.", title: "Labels", "x-auditable": true }),
)

export const CloudforceOneRequestsTlp = named(
  "cloudforce-one-requests_tlp",
  Type.Union(
    [
      Type.Literal("clear"),
      Type.Literal("amber"),
      Type.Literal("amber-strict"),
      Type.Literal("green"),
      Type.Literal("red"),
    ],
    { description: "The CISA defined Traffic Light Protocol (TLP).", "x-auditable": true },
  ),
)

export const CloudforceOneRequestsPriorityEdit = named(
  "cloudforce-one-requests_priority-edit",
  Type.Object({
    labels: CloudforceOneRequestsLabels,
    priority: Type.Integer({ description: "Priority.", "x-auditable": true }),
    requirement: Type.String({ description: "Requirement.", "x-auditable": true }),
    tlp: CloudforceOneRequestsTlp,
  }),
)

export const CloudforceOneRequestsPriorityItem = named(
  "cloudforce-one-requests_priority-item",
  Type.Object({
    created: CloudforceOneRequestsTime,
    id: MagicTransitUuid,
    labels: CloudforceOneRequestsLabels,
    priority: Type.Integer({ description: "Priority.", "x-auditable": true }),
    requirement: Type.String({ description: "Requirement.", "x-auditable": true }),
    tlp: CloudforceOneRequestsTlp,
    updated: CloudforceOneRequestsTime,
  }),
)

export const CloudforceOneRequestsPriorityList = named(
  "cloudforce-one-requests_priority-list",
  Type.Object({
    page: Type.Integer({ description: "Page number of results." }),
    per_page: Type.Integer({ description: "Number of results per page." }),
  }),
)

export const CloudforceOneRequestsRequestContent = named(
  "cloudforce-one-requests_request-content",
  Type.String({ description: "Request content." }),
)

export const CloudforceOneRequestsRequestReadableId = named(
  "cloudforce-one-requests_request-readable-id",
  Type.String({ description: "Readable Request ID.", title: "Request Readable ID", "x-auditable": true }),
)

export const CloudforceOneRequestsRequestType = named(
  "cloudforce-one-requests_request-type",
  Type.String({ description: "Requested information from request.", "x-auditable": true }),
)

export const CloudforceOneRequestsRequestStatus = named(
  "cloudforce-one-requests_request-status",
  Type.Union(
    [
      Type.Literal("open"),
      Type.Literal("accepted"),
      Type.Literal("reported"),
      Type.Literal("approved"),
      Type.Literal("completed"),
      Type.Literal("declined"),
    ],
    { description: "Request Status.", "x-auditable": true },
  ),
)

export const CloudforceOneRequestsRequestSummary = named(
  "cloudforce-one-requests_request-summary",
  Type.String({ description: "Brief description of the request.", "x-auditable": true }),
)

export const CloudforceOneRequestsRequestItem = named(
  "cloudforce-one-requests_request-item",
  Type.Object({
    completed: Type.Optional(CloudforceOneRequestsTime),
    content: CloudforceOneRequestsRequestContent,
    created: CloudforceOneRequestsTime,
    id: MagicTransitUuid,
    message_tokens: Type.Optional(
      Type.Integer({ description: "Tokens for the request messages.", "x-auditable": true }),
    ),
    priority: CloudforceOneRequestsTime,
    readable_id: Type.Optional(CloudforceOneRequestsRequestReadableId),
    request: CloudforceOneRequestsRequestType,
    status: Type.Optional(CloudforceOneRequestsRequestStatus),
    summary: CloudforceOneRequestsRequestSummary,
    tlp: CloudforceOneRequestsTlp,
    tokens: Type.Optional(Type.Integer({ description: "Tokens for the request.", "x-auditable": true })),
    updated: CloudforceOneRequestsTime,
  }),
)

export const CloudforceOneRequestsRequestEdit = named(
  "cloudforce-one-requests_request-edit",
  Type.Object({
    content: Type.Optional(CloudforceOneRequestsRequestContent),
    priority: Type.Optional(Type.String({ description: "Priority for analyzing the request.", "x-auditable": true })),
    request_type: Type.Optional(CloudforceOneRequestsRequestType),
    summary: Type.Optional(CloudforceOneRequestsRequestSummary),
    tlp: Type.Optional(CloudforceOneRequestsTlp),
  }),
)

export const CloudforceOneRequestsPriority = named(
  "cloudforce-one-requests_priority",
  Type.Union([Type.Literal("routine"), Type.Literal("high"), Type.Literal("urgent")], { "x-auditable": true }),
)

export const CloudforceOneRequestsRequestConstants = named(
  "cloudforce-one-requests_request-constants",
  Type.Object({
    priority: Type.Optional(Type.Array(CloudforceOneRequestsPriority)),
    status: Type.Optional(Type.Array(CloudforceOneRequestsRequestStatus)),
    tlp: Type.Optional(Type.Array(CloudforceOneRequestsTlp)),
  }),
)

export const CloudforceOneRequestsIdentifier = named(
  "cloudforce-one-requests_identifier",
  Type.String({ description: "Identifier.", maxLength: 32 }),
)

export const CloudforceOneRequestsApiResponseCommonFailure = named(
  "cloudforce-one-requests_api-response-common-failure",
  Type.Object({
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
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
  }),
)

export const CloudforceOneRequestsRequestListItem = named(
  "cloudforce-one-requests_request-list-item",
  Type.Object({
    completed: Type.Optional(CloudforceOneRequestsTime),
    created: CloudforceOneRequestsTime,
    id: MagicTransitUuid,
    message_tokens: Type.Optional(
      Type.Integer({ description: "Tokens for the request messages.", "x-auditable": true }),
    ),
    priority: CloudforceOneRequestsPriority,
    readable_id: Type.Optional(CloudforceOneRequestsRequestReadableId),
    request: CloudforceOneRequestsRequestType,
    status: Type.Optional(CloudforceOneRequestsRequestStatus),
    summary: CloudforceOneRequestsRequestSummary,
    tlp: CloudforceOneRequestsTlp,
    tokens: Type.Optional(Type.Integer({ description: "Tokens for the request.", "x-auditable": true })),
    updated: CloudforceOneRequestsTime,
  }),
)

export const CloudforceOneRequestsRequestList = named(
  "cloudforce-one-requests_request-list",
  Type.Object({
    completed_after: Type.Optional(CloudforceOneRequestsTime),
    completed_before: Type.Optional(CloudforceOneRequestsTime),
    created_after: Type.Optional(CloudforceOneRequestsTime),
    created_before: Type.Optional(CloudforceOneRequestsTime),
    page: Type.Integer({ description: "Page number of results." }),
    per_page: Type.Integer({ description: "Number of results per page." }),
    request_type: Type.Optional(CloudforceOneRequestsRequestType),
    sort_by: Type.Optional(Type.String({ description: "Field to sort results by." })),
    sort_order: Type.Optional(
      Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Sort order (asc or desc)." }),
    ),
    status: Type.Optional(CloudforceOneRequestsRequestStatus),
  }),
)

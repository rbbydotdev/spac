import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  AccessBasePolicyReq,
  AccessBasePolicyResp,
  AccessCreatedAt,
  AccessSchemasUuid,
  AccessUuid,
  DlpMessages,
  DlsIdentifier,
  DlsTimestamp,
  UnnamedSchemaRef6a02fe18089d53b52b2cd3949b717919,
} from "../shared/schemas"

export const AccessDevicePostureCheck = named(
  "access_device_posture_check",
  Type.Object({
    exists: Type.Optional(Type.Boolean({ "x-auditable": true })),
    path: Type.Optional(Type.String({ "x-auditable": true })),
  }),
)

export const AccessSchemasDevicePostureRule = named(
  "access_schemas-device_posture_rule",
  Type.Object({
    check: Type.Optional(AccessDevicePostureCheck),
    data: Type.Optional(Type.Unknown()),
    description: Type.Optional(Type.String({ "x-auditable": true })),
    error: Type.Optional(Type.String()),
    id: Type.Optional(Type.String({ "x-auditable": true })),
    rule_name: Type.Optional(Type.String({ "x-auditable": true })),
    success: Type.Optional(Type.Boolean({ "x-auditable": true })),
    timestamp: Type.Optional(Type.String({ "x-auditable": true })),
    type: Type.Optional(Type.String({ "x-auditable": true })),
  }),
)

export const AccessDeviceSession = named(
  "access_device_session",
  Type.Object({
    last_authenticated: Type.Optional(Type.Number({ "x-auditable": true })),
  }),
)

export const AccessStringKeyMapDeviceSession = named(
  "access_string_key_map_device_session",
  Type.Record(Type.String(), AccessDeviceSession),
)

export const AccessGeo = named("access_geo", UnnamedSchemaRef6a02fe18089d53b52b2cd3949b717919)

export const AccessIdentity = named(
  "access_identity",
  Type.Object({
    account_id: Type.Optional(Type.String({ "x-auditable": true })),
    auth_status: Type.Optional(Type.String({ "x-auditable": true })),
    common_name: Type.Optional(Type.String()),
    devicePosture: Type.Optional(Type.Record(Type.String(), AccessSchemasDevicePostureRule)),
    device_id: Type.Optional(Type.String()),
    device_sessions: Type.Optional(AccessStringKeyMapDeviceSession),
    email: Type.Optional(Type.String()),
    geo: Type.Optional(AccessGeo),
    iat: Type.Optional(Type.Number()),
    idp: Type.Optional(
      Type.Object({
        id: Type.Optional(Type.String()),
        type: Type.Optional(Type.String()),
      }),
    ),
    ip: Type.Optional(Type.String()),
    is_gateway: Type.Optional(Type.Boolean()),
    is_warp: Type.Optional(Type.Boolean()),
    mtls_auth: Type.Optional(
      Type.Object({
        auth_status: Type.Optional(Type.String()),
        cert_issuer_dn: Type.Optional(Type.String()),
        cert_issuer_ski: Type.Optional(Type.String()),
        cert_presented: Type.Optional(Type.Boolean()),
        cert_serial: Type.Optional(Type.String()),
      }),
    ),
    service_token_id: Type.Optional(Type.String()),
    service_token_status: Type.Optional(Type.Boolean()),
    user_uuid: Type.Optional(Type.String()),
    version: Type.Optional(Type.Number()),
  }),
)

export const AccessLastSeenIdentityResponse = named(
  "access_last_seen_identity_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessIdentity),
  }),
)

export const AccessFailedLoginResponse = named(
  "access_failed_login_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
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
    result: Type.Optional(
      Type.Array(
        Type.Object({
          expiration: Type.Optional(Type.Integer()),
          metadata: Type.Optional(Type.Unknown()),
        }),
      ),
    ),
  }),
)

export const AccessNonce = named("access_nonce", Type.String())

export const AccessActiveSessionResponse = named(
  "access_active_session_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        account_id: Type.Optional(Type.String({ "x-auditable": true })),
        auth_status: Type.Optional(Type.String({ "x-auditable": true })),
        common_name: Type.Optional(Type.String()),
        devicePosture: Type.Optional(Type.Record(Type.String(), AccessSchemasDevicePostureRule)),
        device_id: Type.Optional(Type.String()),
        device_sessions: Type.Optional(AccessStringKeyMapDeviceSession),
        email: Type.Optional(Type.String()),
        geo: Type.Optional(AccessGeo),
        iat: Type.Optional(Type.Number()),
        idp: Type.Optional(
          Type.Object({
            id: Type.Optional(Type.String()),
            type: Type.Optional(Type.String()),
          }),
        ),
        ip: Type.Optional(Type.String()),
        is_gateway: Type.Optional(Type.Boolean()),
        is_warp: Type.Optional(Type.Boolean()),
        mtls_auth: Type.Optional(
          Type.Object({
            auth_status: Type.Optional(Type.String()),
            cert_issuer_dn: Type.Optional(Type.String()),
            cert_issuer_ski: Type.Optional(Type.String()),
            cert_presented: Type.Optional(Type.Boolean()),
            cert_serial: Type.Optional(Type.String()),
          }),
        ),
        service_token_id: Type.Optional(Type.String()),
        service_token_status: Type.Optional(Type.Boolean()),
        user_uuid: Type.Optional(Type.String()),
        version: Type.Optional(Type.Number()),
        isActive: Type.Optional(Type.Boolean()),
      }),
    ),
  }),
)

export const AccessActiveSessionsResponse = named(
  "access_active_sessions_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
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
    result: Type.Optional(
      Type.Array(
        Type.Object({
          expiration: Type.Optional(Type.Integer()),
          metadata: Type.Optional(
            Type.Object({
              apps: Type.Optional(
                Type.Record(
                  Type.String(),
                  Type.Object({
                    hostname: Type.Optional(Type.String()),
                    name: Type.Optional(Type.String()),
                    type: Type.Optional(Type.String()),
                    uid: Type.Optional(Type.String()),
                  }),
                ),
              ),
              expires: Type.Optional(Type.Integer()),
              iat: Type.Optional(Type.Integer()),
              nonce: Type.Optional(Type.String()),
              ttl: Type.Optional(Type.Integer()),
            }),
          ),
          name: Type.Optional(Type.String()),
        }),
      ),
    ),
  }),
)

export const AccessSchemasAccessSeat = named(
  "access_schemas-access_seat",
  Type.Boolean({ description: "True if the user has authenticated with Cloudflare Access." }),
)

export const AccessActiveDeviceCount = named(
  "access_active_device_count",
  Type.Number({ description: "The number of active devices registered to the user." }),
)

export const AccessSchemasEmail = named(
  "access_schemas-email",
  Type.String({ description: "The email of the user.", format: "email" }),
)

export const AccessSchemasGatewaySeat = named(
  "access_schemas-gateway_seat",
  Type.Boolean({ description: "True if the user has logged into the WARP client." }),
)

export const AccessLastSuccessfulLogin = named(
  "access_last_successful_login",
  Type.String({ description: "The time at which the user last successfully logged in.", format: "date-time" }),
)

export const AccessUsersComponentsSchemasName = named(
  "access_users_components-schemas-name",
  Type.String({ description: "The name of the user." }),
)

export const AccessSchemasSeatUid = named(
  "access_schemas-seat_uid",
  Type.String({ description: "The unique API identifier for the Zero Trust seat." }),
)

export const AccessUid = named("access_uid", Type.String({ description: "The unique API identifier for the user." }))

export const AccessSchemasUsers = named(
  "access_schemas-users",
  Type.Object({
    access_seat: Type.Optional(AccessSchemasAccessSeat),
    active_device_count: Type.Optional(AccessActiveDeviceCount),
    created_at: Type.Optional(DlsTimestamp),
    email: Type.Optional(AccessSchemasEmail),
    gateway_seat: Type.Optional(AccessSchemasGatewaySeat),
    id: Type.Optional(AccessUuid),
    last_successful_login: Type.Optional(AccessLastSuccessfulLogin),
    name: Type.Optional(AccessUsersComponentsSchemasName),
    seat_uid: Type.Optional(AccessSchemasSeatUid),
    uid: Type.Optional(AccessUid),
    updated_at: Type.Optional(DlsTimestamp),
  }),
)

export const AccessUsersComponentsSchemasResponseCollection = named(
  "access_users_components-schemas-response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
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
    result: Type.Optional(Type.Array(AccessSchemasUsers)),
  }),
)

export const AccessTagsComponentsSchemasName = named(
  "access_tags_components-schemas-name",
  Type.String({ description: "The name of the tag" }),
)

export const AccessNameResponse = named(
  "access_name_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        name: Type.Optional(AccessTagsComponentsSchemasName),
      }),
    ),
  }),
)

export const AccessTagWithoutAppCount = named(
  "access_tag_without_app_count",
  Type.Object(
    {
      created_at: Type.Optional(AccessCreatedAt),
      name: AccessTagsComponentsSchemasName,
      updated_at: Type.Optional(AccessCreatedAt),
    },
    { description: "A tag" },
  ),
)

export const AccessTag = named(
  "access_tag",
  Type.Object(
    {
      app_count: Type.Optional(
        Type.Integer({
          description: "The number of applications that have this tag",
          "x-auditable": true,
          "x-stainless-skip": true,
        }),
      ),
      created_at: Type.Optional(AccessCreatedAt),
      name: AccessTagsComponentsSchemasName,
      updated_at: Type.Optional(AccessCreatedAt),
    },
    { description: "A tag" },
  ),
)

export const AccessTagsComponentsSchemasSingleResponse = named(
  "access_tags_components-schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessTag),
  }),
)

export const AccessTagsComponentsSchemasResponseCollection = named(
  "access_tags_components-schemas-response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
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
    result: Type.Optional(Type.Array(AccessTag)),
  }),
)

export const AccessSchemasIdentifier = named("access_schemas-identifier", DlsIdentifier)

export const AccessAccessSeat = named(
  "access_access_seat",
  Type.Boolean({ description: "True if the seat is part of Access.", "x-auditable": true }),
)

export const AccessGatewaySeat = named(
  "access_gateway_seat",
  Type.Boolean({ description: "True if the seat is part of Gateway.", "x-auditable": true }),
)

export const AccessSeatUid = named(
  "access_seat_uid",
  Type.String({
    description: "The unique API identifier for the Zero Trust seat.",
    maxLength: 36,
    "x-auditable": true,
  }),
)

export const AccessSeats = named(
  "access_seats",
  Type.Object({
    access_seat: Type.Optional(AccessAccessSeat),
    created_at: Type.Optional(DlsTimestamp),
    gateway_seat: Type.Optional(AccessGatewaySeat),
    seat_uid: Type.Optional(AccessSeatUid),
    updated_at: Type.Optional(DlsTimestamp),
  }),
)

export const AccessSeatsComponentsSchemasResponseCollection = named(
  "access_seats_components-schemas-response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
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
    result: Type.Optional(Type.Array(AccessSeats)),
  }),
)

export const AccessSeat = named(
  "access_seat",
  Type.Object({
    access_seat: AccessAccessSeat,
    gateway_seat: AccessGatewaySeat,
    seat_uid: AccessSeatUid,
  }),
)

export const AccessSeatsDefinition = named("access_seats_definition", Type.Array(AccessSeat))

export const AccessUserResult = named(
  "access_user_result",
  Type.Union([Type.Literal("approved"), Type.Literal("blocked"), Type.Literal("error")], {
    description: "Policy evaluation result for an individual user.",
    "x-auditable": true,
  }),
)

export const AccessPolicyUsers = named(
  "access_policy_users",
  Type.Object({
    email: Type.Optional(AccessSchemasEmail),
    id: Type.Optional(AccessUuid),
    name: Type.Optional(AccessUsersComponentsSchemasName),
    status: Type.Optional(AccessUserResult),
  }),
)

export const AccessPolicyUsersResp = named(
  "access_policy_users_resp",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(AccessPolicyUsers, { description: "Page of processed users." })),
  }),
)

export const AccessPolicyTestId = named(
  "access_policy_test_id",
  Type.String({ description: "The UUID of the policy test.", maxLength: 64, "x-auditable": true }),
)

export const AccessPercentApproved = named(
  "access_percent_approved",
  Type.Integer({
    description: "The percentage of (processed) users approved based on policy evaluation results.",
    "x-auditable": true,
  }),
)

export const AccessPercentBlocked = named(
  "access_percent_blocked",
  Type.Integer({
    description: "The percentage of (processed) users blocked based on policy evaluation results.",
    "x-auditable": true,
  }),
)

export const AccessPercentErrored = named(
  "access_percent_errored",
  Type.Integer({
    description: "The percentage of (processed) users errored based on policy evaluation results.",
    "x-auditable": true,
  }),
)

export const AccessPercentUsersProcessed = named(
  "access_percent_users_processed",
  Type.Integer({ description: "The percentage of users processed so far (of the entire user base)." }),
)

export const AccessUpdateStatus = named(
  "access_update_status",
  Type.Union(
    [Type.Literal("blocked"), Type.Literal("processing"), Type.Literal("exceeded time"), Type.Literal("complete")],
    { description: "The status of the policy test.", "x-auditable": true },
  ),
)

export const AccessTotalUsers = named(
  "access_total_users",
  Type.Integer({ description: "The total number of users in the user base.", "x-auditable": true }),
)

export const AccessUsersApproved = named(
  "access_users_approved",
  Type.Integer({
    description: "The number of (processed) users approved based on policy evaluation results.",
    "x-auditable": true,
  }),
)

export const AccessUsersBlocked = named(
  "access_users_blocked",
  Type.Integer({
    description: "The number of (processed) users blocked based on policy evaluation results.",
    "x-auditable": true,
  }),
)

export const AccessUsersErrored = named(
  "access_users_errored",
  Type.Integer({ description: "The number of (processed) users errored based on policy evaluation results." }),
)

export const AccessPolicyUpdateResp = named(
  "access_policy_update_resp",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        id: Type.Optional(AccessPolicyTestId),
        percent_approved: Type.Optional(AccessPercentApproved),
        percent_blocked: Type.Optional(AccessPercentBlocked),
        percent_errored: Type.Optional(AccessPercentErrored),
        percent_users_processed: Type.Optional(AccessPercentUsersProcessed),
        status: Type.Optional(AccessUpdateStatus),
        total_users: Type.Optional(AccessTotalUsers),
        users_approved: Type.Optional(AccessUsersApproved),
        users_blocked: Type.Optional(AccessUsersBlocked),
        users_errored: Type.Optional(AccessUsersErrored),
      }),
    ),
  }),
)

export const AccessStatus = named(
  "access_status",
  Type.Union([Type.Literal("success")], { description: "The status of the policy test request.", "x-auditable": true }),
)

export const AccessPolicyInitResp = named(
  "access_policy_init_resp",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        id: Type.Optional(AccessPolicyTestId),
        status: Type.Optional(AccessStatus),
      }),
    ),
  }),
)

export const AccessPolicyReq = named("access_policy_req", Type.Intersect([AccessBasePolicyReq]))

export const AccessPolicyInitReq = named(
  "access_policy_init_req",
  Type.Object({
    policies: Type.Optional(
      Type.Array(
        Type.Union([AccessPolicyReq, Type.String({ description: "The UUID of the reusable policy you wish to test" })]),
      ),
    ),
  }),
)

export const AccessReusablePoliciesComponentsSchemasIdResponse = named(
  "access_reusable-policies_components-schemas-id_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        id: Type.Optional(AccessSchemasUuid),
      }),
    ),
  }),
)

export const AccessAppCount = named(
  "access_app_count",
  Type.Integer({ description: "Number of access applications currently using this policy.", "x-auditable": true }),
)

export const AccessReusablePolicyResp = named("access_reusable_policy_resp", Type.Intersect([AccessBasePolicyResp]))

export const AccessReusablePoliciesComponentsSchemasSingleResponse = named(
  "access_reusable-policies_components-schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessReusablePolicyResp),
  }),
)

export const AccessReusablePoliciesComponentsSchemasResponseCollection = named(
  "access_reusable-policies_components-schemas-response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
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
    result: Type.Optional(Type.Array(AccessReusablePolicyResp)),
  }),
)

export const AccessDohJwtDuration = named(
  "access_doh_jwt_duration",
  Type.String({
    description:
      "The duration the DoH JWT is valid for. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.  Note that the maximum duration for this setting is the same as the key rotation period on the account. Default expiration is 24h",
    "x-auditable": true,
  }),
)

export const AccessRequestsIdpResourceId = named(
  "access_requests-idp_resource_id",
  Type.String({ description: "The IdP-generated Id of the SCIM resource." }),
)

export const AccessResourceUserEmail = named(
  "access_resource_user_email",
  Type.String({ description: "The email address of the SCIM User resource.", format: "email" }),
)

export const AccessRequestMethod = named(
  "access_request_method",
  Type.Array(Type.Union([Type.Literal("DELETE"), Type.Literal("PATCH"), Type.Literal("POST"), Type.Literal("PUT")]), {
    description: "The request method of the SCIM request.",
  }),
)

export const AccessResourceType = named(
  "access_resource_type",
  Type.Array(Type.Union([Type.Literal("USER"), Type.Literal("GROUP")]), {
    description: "The resource type of the SCIM request.",
  }),
)

export const AccessRequestsStatus = named(
  "access_requests-status",
  Type.Array(Type.Union([Type.Literal("FAILURE"), Type.Literal("SUCCESS")]), {
    description: "The status of the SCIM request.",
  }),
)

export const AccessIdpId = named(
  "access_idp_id",
  Type.Array(Type.String(), { description: "The unique Id of the IdP that has SCIM enabled." }),
)

export const AccessUntil = named(
  "access_until",
  Type.String({ description: "the timestamp of the most-recent update log.", format: "date-time" }),
)

export const AccessSince = named(
  "access_since",
  Type.String({ description: "the timestamp of the earliest update log.", format: "date-time" }),
)

export const AccessDirection = named(
  "access_direction",
  Type.Union([Type.Literal("desc"), Type.Literal("asc")], {
    description: "The chronological order used to sort the logs.",
  }),
)

export const AccessLimit = named(
  "access_limit",
  Type.Integer({ description: "The maximum number of update logs to retrieve.", default: 20 }),
)

export const AccessResponses = named(
  "access_responses",
  Type.Object({
    cf_resource_id: Type.Optional(
      Type.String({ description: "The unique Cloudflare-generated Id of the SCIM resource." }),
    ),
    error_description: Type.Optional(
      Type.String({
        description: "The error message which is generated when the status of the SCIM request is 'FAILURE'.",
      }),
    ),
    idp_id: Type.Optional(Type.String({ description: "The unique Id of the IdP that has SCIM enabled." })),
    idp_resource_id: Type.Optional(Type.String({ description: "The IdP-generated Id of the SCIM resource." })),
    logged_at: Type.Optional(DlsTimestamp),
    request_body: Type.Optional(Type.String({ description: "The JSON-encoded string body of the SCIM request." })),
    request_method: Type.Optional(Type.String({ description: "The request method of the SCIM request." })),
    resource_group_name: Type.Optional(
      Type.String({ description: "The display name of the SCIM Group resource if it exists." }),
    ),
    resource_type: Type.Optional(Type.String({ description: "The resource type of the SCIM request." })),
    resource_user_email: Type.Optional(
      Type.String({ description: "The email address of the SCIM User resource if it exists.", format: "email" }),
    ),
    status: Type.Optional(Type.String({ description: "The status of the SCIM request." })),
  }),
)

export const AccessScimUpdateLogsResponse = named(
  "access_scim_update_logs_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
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
    result: Type.Optional(Type.Array(AccessResponses)),
  }),
)

export const AccessAction = named(
  "access_action",
  Type.String({ description: "The event that occurred, such as a login attempt." }),
)

export const AccessAllowed = named(
  "access_allowed",
  Type.Boolean({ description: "The result of the authentication event.", default: false }),
)

export const AccessAppDomain = named(
  "access_app_domain",
  Type.String({ description: "The URL of the Access application." }),
)

export const AccessAppUid = named(
  "access_app_uid",
  Type.String({ description: "The unique identifier for the Access application." }),
)

export const AccessConnection = named(
  "access_connection",
  Type.String({ description: "The IdP used to authenticate." }),
)

export const AccessIp = named("access_ip", Type.String({ description: "The IP address of the authenticating user." }))

export const AccessRayId = named(
  "access_ray_id",
  Type.String({ description: "The unique identifier for the request to Cloudflare.", maxLength: 16 }),
)

export const AccessComponentsSchemasEmail = named(
  "access_components-schemas-email",
  Type.String({ description: "The email address of the authenticating user.", format: "email" }),
)

export const AccessAccessRequests = named(
  "access_access-requests",
  Type.Object({
    action: Type.Optional(AccessAction),
    allowed: Type.Optional(AccessAllowed),
    app_domain: Type.Optional(AccessAppDomain),
    app_uid: Type.Optional(AccessAppUid),
    connection: Type.Optional(AccessConnection),
    created_at: Type.Optional(DlsTimestamp),
    ip_address: Type.Optional(AccessIp),
    ray_id: Type.Optional(AccessRayId),
    user_email: Type.Optional(AccessComponentsSchemasEmail),
  }),
)

export const AccessAccessRequestsComponentsSchemasResponseCollection = named(
  "access_access-requests_components-schemas-response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(AccessAccessRequests)),
  }),
)

export const AccessKeyRotationIntervalDays = named(
  "access_key_rotation_interval_days",
  Type.Number({
    description: "The number of days between key rotations.",
    minimum: 21,
    maximum: 365,
    "x-auditable": true,
  }),
)

export const AccessDaysUntilNextRotation = named(
  "access_days_until_next_rotation",
  Type.Number({ description: "The number of days until the next key rotation.", readOnly: true, "x-auditable": true }),
)

export const AccessLastKeyRotationAt = named(
  "access_last_key_rotation_at",
  Type.String({ description: "The timestamp of the previous key rotation.", format: "date-time", "x-auditable": true }),
)

export const AccessKeyConfig = named(
  "access_key_config",
  Type.Object({
    days_until_next_rotation: Type.Optional(AccessDaysUntilNextRotation),
    key_rotation_interval_days: Type.Optional(AccessKeyRotationIntervalDays),
    last_key_rotation_at: Type.Optional(AccessLastKeyRotationAt),
  }),
)

export const AccessKeysComponentsSchemasSingleResponse = named(
  "access_keys_components-schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessKeyConfig),
  }),
)

export const AccessUsersName = named(
  "access_users-name",
  Type.String({ description: "The name of the SCIM User resource." }),
)

export const AccessEmail = named(
  "access_email",
  Type.String({ description: "The email address of the SCIM User resource." }),
)

export const AccessUsername = named(
  "access_username",
  Type.String({ description: "The username of the SCIM User resource." }),
)

export const AccessUsersIdpResourceId = named(
  "access_users-idp_resource_id",
  Type.String({ description: 'The IdP-generated Id of the SCIM User resource; also known as the "external Id".' }),
)

export const AccessUsersCfResourceId = named(
  "access_users-cf_resource_id",
  Type.String({ description: 'The unique Cloudflare-generated Id of the SCIM User resource; also known as the "Id".' }),
)

export const AccessId = named(
  "access_id",
  Type.String({ description: "The unique Cloudflare-generated Id of the SCIM resource." }),
)

export const AccessMeta = named(
  "access_meta",
  Type.Object(
    {
      created: Type.Optional(
        Type.String({ description: "The timestamp of when the SCIM resource was created.", format: "date-time" }),
      ),
      lastModified: Type.Optional(
        Type.String({ description: "The timestamp of when the SCIM resource was last modified.", format: "date-time" }),
      ),
    },
    { description: "The metadata of the SCIM resource." },
  ),
)

export const AccessUsers = named(
  "access_users",
  Type.Object({
    active: Type.Optional(Type.Boolean({ description: "Determines the status of the SCIM User resource." })),
    displayName: Type.Optional(Type.String({ description: "The name of the SCIM User resource." })),
    emails: Type.Optional(
      Type.Array(
        Type.Object({
          primary: Type.Optional(
            Type.Boolean({
              description: "Indicates if the email address is the primary email belonging to the SCIM User resource.",
            }),
          ),
          type: Type.Optional(Type.String({ description: "Indicates the type of the email address." })),
          value: Type.Optional(
            Type.String({ description: "The email address of the SCIM User resource.", format: "email" }),
          ),
        }),
      ),
    ),
    externalId: Type.Optional(Type.String({ description: "The IdP-generated Id of the SCIM resource." })),
    id: Type.Optional(AccessId),
    meta: Type.Optional(AccessMeta),
    schemas: Type.Optional(
      Type.Array(Type.String(), {
        description: "The list of URIs which indicate the attributes contained within a SCIM resource.",
      }),
    ),
  }),
)

export const AccessScimUsersResponse = named(
  "access_scim_users_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
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
    result: Type.Optional(Type.Array(AccessUsers)),
  }),
)

export const AccessGroupsName = named(
  "access_groups-name",
  Type.String({ description: "The display name of the SCIM Group resource." }),
)

export const AccessIdpResourceId = named(
  "access_idp_resource_id",
  Type.String({ description: 'The IdP-generated Id of the SCIM Group resource; also known as the "external Id".' }),
)

export const AccessCfResourceId = named(
  "access_cf_resource_id",
  Type.String({
    description: 'The unique Cloudflare-generated Id of the SCIM Group resource; also known as the "Id".',
  }),
)

export const AccessExternalid = named(
  "access_externalId",
  Type.String({ description: "The IdP-generated Id of the SCIM resource." }),
)

export const AccessGroups = named(
  "access_groups",
  Type.Object({
    displayName: Type.Optional(Type.String({ description: "The display name of the SCIM Group resource." })),
    externalId: Type.Optional(AccessExternalid),
    id: Type.Optional(AccessId),
    meta: Type.Optional(AccessMeta),
    schemas: Type.Optional(
      Type.Array(Type.String(), {
        description: "The list of URIs which indicate the attributes contained within a SCIM resource.",
      }),
    ),
  }),
)

export const AccessScimGroupsResponse = named(
  "access_scim_groups_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
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
    result: Type.Optional(Type.Array(AccessGroups)),
  }),
)

export const AccessSchemasCertificates = named(
  "access_schemas-certificates",
  Type.Object({
    id: Type.Optional(Type.String({ description: "The key ID of this certificate.", "x-auditable": true })),
    public_key: Type.Optional(Type.String({ description: "The public key of this certificate." })),
  }),
)

export const AccessGatewayCaComponentsSchemasSingleResponse = named(
  "access_gateway_ca_components-schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessSchemasCertificates),
  }),
)

export const AccessGatewayCaComponentsSchemasResponseCollection = named(
  "access_gateway_ca_components-schemas-response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
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
    result: Type.Optional(Type.Array(AccessSchemasCertificates)),
  }),
)

export const AccessSchemasAppCount = named(
  "access_schemas-app_count",
  Type.Integer({
    description: "Number of apps the custom page is assigned to.",
    "x-auditable": true,
    "x-stainless-skip": true,
  }),
)

export const AccessCustomPagesComponentsSchemasName = named(
  "access_custom-pages_components-schemas-name",
  Type.String({ description: "Custom page name.", "x-auditable": true }),
)

export const AccessSchemasType = named(
  "access_schemas-type",
  Type.Union([Type.Literal("identity_denied"), Type.Literal("forbidden")], {
    description: "Custom page type.",
    "x-auditable": true,
  }),
)

export const AccessCustomPage = named(
  "access_custom_page",
  Type.Object({
    app_count: Type.Optional(AccessSchemasAppCount),
    created_at: Type.Optional(AccessCreatedAt),
    custom_html: Type.String({ description: "Custom page HTML.", "x-auditable": true }),
    name: AccessCustomPagesComponentsSchemasName,
    type: AccessSchemasType,
    uid: Type.Optional(AccessUuid),
    updated_at: Type.Optional(AccessCreatedAt),
  }),
)

export const AccessCustomPagesComponentsSchemasSingleResponse = named(
  "access_custom-pages_components-schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessCustomPage),
  }),
)

export const AccessCustomPageWithoutHtml = named(
  "access_custom_page_without_html",
  Type.Object({
    app_count: Type.Optional(AccessSchemasAppCount),
    created_at: Type.Optional(AccessCreatedAt),
    name: AccessCustomPagesComponentsSchemasName,
    type: AccessSchemasType,
    uid: Type.Optional(AccessUuid),
    updated_at: Type.Optional(AccessCreatedAt),
  }),
)

export const AccessSingleResponseWithoutHtml = named(
  "access_single_response_without_html",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessCustomPageWithoutHtml),
  }),
)

export const AccessCustomPagesComponentsSchemasResponseCollection = named(
  "access_custom-pages_components-schemas-response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
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
    result: Type.Optional(Type.Array(AccessCustomPageWithoutHtml)),
  }),
)

export const AccessSchemasAppLauncherVisible = named(
  "access_schemas-app_launcher_visible",
  Type.Boolean({ description: "Displays the application in the App Launcher.", "x-auditable": true }),
)

export const AccessSchemasDomain = named(
  "access_schemas-domain",
  Type.String({ description: "The domain of the Bookmark application.", "x-auditable": true }),
)

export const AccessSchemasLogoUrl = named(
  "access_schemas-logo_url",
  Type.String({ description: "The image URL for the logo shown in the App Launcher dashboard.", "x-auditable": true }),
)

export const AccessBookmarksComponentsSchemasName = named(
  "access_bookmarks_components-schemas-name",
  Type.String({ description: "The name of the Bookmark application.", "x-auditable": true }),
)

export const AccessBookmarks = named(
  "access_bookmarks",
  Type.Object({
    app_launcher_visible: Type.Optional(AccessSchemasAppLauncherVisible),
    created_at: Type.Optional(AccessCreatedAt),
    domain: Type.Optional(AccessSchemasDomain),
    id: Type.Optional(Type.String({ description: "The unique identifier for the Bookmark application." })),
    logo_url: Type.Optional(AccessSchemasLogoUrl),
    name: Type.Optional(AccessBookmarksComponentsSchemasName),
    updated_at: Type.Optional(AccessCreatedAt),
  }),
)

export const AccessBookmarksComponentsSchemasSingleResponse = named(
  "access_bookmarks_components-schemas-single_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(AccessBookmarks),
  }),
)

export const AccessBookmarksComponentsSchemasResponseCollection = named(
  "access_bookmarks_components-schemas-response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
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
    result: Type.Optional(Type.Array(AccessBookmarks)),
  }),
)

import { Type } from "@sinclair/typebox"
import { named } from "spac"
import {
  ResourceSharingAccountId,
  ResourceSharingCreated,
  ResourceSharingModified,
  ResourceSharingOrganizationId,
  ResourceSharingResourceId,
  ResourceSharingResourceMeta,
  ResourceSharingResourceType,
  ResourceSharingResourceVersion,
  ResourceSharingResultInfo,
  ResourceSharingShareName,
  ResourceSharingShareObject,
  ResourceSharingShareResourceObject,
  ResourceSharingV4errors,
} from "../shared/schemas"

export const ResourceSharingUpdateShareResourceRequest = named(
  "resource-sharing_update_share_resource_request",
  Type.Object({
    meta: ResourceSharingResourceMeta,
  }),
)

export const ResourceSharingShareResourceResponseSingle = named(
  "resource-sharing_share_resource_response_single",
  Type.Object({
    errors: ResourceSharingV4errors,
    result: Type.Optional(ResourceSharingShareResourceObject),
    success: Type.Boolean({ description: "Whether the API call was successful." }),
  }),
)

export const ResourceSharingCreateShareResourceRequest = named(
  "resource-sharing_create_share_resource_request",
  Type.Object({
    meta: ResourceSharingResourceMeta,
    resource_account_id: ResourceSharingAccountId,
    resource_id: ResourceSharingResourceId,
    resource_type: ResourceSharingResourceType,
  }),
)

export const ResourceSharingShareResourceResponseCollection = named(
  "resource-sharing_share_resource_response_collection",
  Type.Object({
    errors: ResourceSharingV4errors,
    result: Type.Optional(Type.Union([Type.Array(ResourceSharingShareResourceObject), Type.Null()])),
    success: Type.Boolean({ description: "Whether the API call was successful." }),
    result_info: Type.Optional(ResourceSharingResultInfo),
  }),
)

export const ResourceSharingRecipientId = named(
  "resource-sharing_recipient_id",
  Type.String({ description: "Share Recipient identifier tag.", maxLength: 32, "x-auditable": true }),
)

export const ResourceSharingCreateShareRecipientRequest = named(
  "resource-sharing_create_share_recipient_request",
  Type.Object(
    {
      account_id: Type.Optional(ResourceSharingAccountId),
      organization_id: Type.Optional(ResourceSharingOrganizationId),
    },
    { description: "Account or organization ID must be provided." },
  ),
)

export const ResourceSharingUpdateShareRecipientsRequest = named(
  "resource-sharing_update_share_recipients_request",
  Type.Array(ResourceSharingCreateShareRecipientRequest),
)

export const ResourceSharingRecipientAssociationStatus = named(
  "resource-sharing_recipient_association_status",
  Type.Union(
    [
      Type.Literal("associating"),
      Type.Literal("associated"),
      Type.Literal("disassociating"),
      Type.Literal("disassociated"),
    ],
    { description: "Share Recipient association status.", "x-auditable": true },
  ),
)

export const ResourceSharingRecipientResourceError = named(
  "resource-sharing_recipient_resource_error",
  Type.String({ description: "Share Recipient error message.", "x-auditable": true }),
)

export const ResourceSharingShareRecipientResourceObject = named(
  "resource-sharing_share_recipient_resource_object",
  Type.Object({
    error: ResourceSharingRecipientResourceError,
    resource_id: ResourceSharingResourceId,
    resource_version: ResourceSharingResourceVersion,
  }),
)

export const ResourceSharingRecipientStatusMessage = named(
  "resource-sharing_recipient_status_message",
  Type.String({ description: "Share Recipient status message.", "x-auditable": true }),
)

export const ResourceSharingShareRecipientObject = named(
  "resource-sharing_share_recipient_object",
  Type.Object({
    account_id: ResourceSharingAccountId,
    association_status: ResourceSharingRecipientAssociationStatus,
    created: ResourceSharingCreated,
    id: ResourceSharingRecipientId,
    modified: ResourceSharingModified,
    resources: Type.Optional(Type.Array(ResourceSharingShareRecipientResourceObject)),
    status_message: ResourceSharingRecipientStatusMessage,
  }),
)

export const ResourceSharingShareRecipientResponseSingle = named(
  "resource-sharing_share_recipient_response_single",
  Type.Object({
    errors: ResourceSharingV4errors,
    result: Type.Optional(ResourceSharingShareRecipientObject),
    success: Type.Boolean({ description: "Whether the API call was successful." }),
  }),
)

export const ResourceSharingShareRecipientResponseCollection = named(
  "resource-sharing_share_recipient_response_collection",
  Type.Object({
    errors: ResourceSharingV4errors,
    result: Type.Optional(Type.Union([Type.Array(ResourceSharingShareRecipientObject), Type.Null()])),
    success: Type.Boolean({ description: "Whether the API call was successful." }),
    result_info: Type.Optional(ResourceSharingResultInfo),
  }),
)

export const ResourceSharingUpdateShareRequest = named(
  "resource-sharing_update_share_request",
  Type.Object({
    name: ResourceSharingShareName,
  }),
)

export const ResourceSharingShareResponseSingle = named(
  "resource-sharing_share_response_single",
  Type.Object({
    errors: ResourceSharingV4errors,
    result: Type.Optional(ResourceSharingShareObject),
    success: Type.Boolean({ description: "Whether the API call was successful." }),
  }),
)

export const ResourceSharingCreateShareRequest = named(
  "resource-sharing_create_share_request",
  Type.Object({
    name: ResourceSharingShareName,
    recipients: Type.Array(ResourceSharingCreateShareRecipientRequest),
    resources: Type.Array(ResourceSharingCreateShareResourceRequest),
  }),
)

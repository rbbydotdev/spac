import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  ResourceSharingApiResponseCommonFailure,
  ResourceSharingResourceId,
  ResourceSharingResourceStatus,
  ResourceSharingResourceType,
  ResourceSharingShareId,
  ResourceSharingShareKind,
  ResourceSharingShareResponseCollection,
  ResourceSharingShareStatus,
  ResourceSharingShareTargetType,
} from "../shared/schemas"
import {
  ResourceSharingCreateShareRecipientRequest,
  ResourceSharingCreateShareRequest,
  ResourceSharingCreateShareResourceRequest,
  ResourceSharingRecipientId,
  ResourceSharingShareRecipientResponseCollection,
  ResourceSharingShareRecipientResponseSingle,
  ResourceSharingShareResourceResponseCollection,
  ResourceSharingShareResourceResponseSingle,
  ResourceSharingShareResponseSingle,
  ResourceSharingUpdateShareRecipientsRequest,
  ResourceSharingUpdateShareRequest,
  ResourceSharingUpdateShareResourceRequest,
} from "./schemas"

export function registerShares(api: Api) {
  api.assertVersion("3.0.3", "Shares")

  api.group("/accounts/{account_id}/shares", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        status: Type.Optional(ResourceSharingShareStatus),
        kind: Type.Optional(ResourceSharingShareKind),
        target_type: Type.Optional(ResourceSharingShareTargetType),
        resource_types: Type.Optional(Type.Array(ResourceSharingResourceType)),
        order: Type.Optional(Type.Union([Type.Literal("name"), Type.Literal("created")])),
        direction: Type.Optional(Type.Union([Type.Literal("asc"), Type.Literal("desc")])),
        page: Type.Optional(Type.Integer({ minimum: 0, multipleOf: 1 })),
        per_page: Type.Optional(Type.Integer({ minimum: 0, maximum: 100, multipleOf: 1 })),
        include_resources: Type.Optional(Type.Boolean()),
        include_recipient_counts: Type.Optional(Type.Boolean()),
      }),
    })
      .response(ResourceSharingShareResponseCollection)
      .error("4XX", ResourceSharingApiResponseCommonFailure)
      .error("5XX", ResourceSharingApiResponseCommonFailure)
      .summary("List account shares")
      .description("Lists all account shares.")
      .operationId("shares-list")
      .tag("Resource Sharing")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/", {
      body: ResourceSharingCreateShareRequest,
    })
      .respond(201, ResourceSharingShareResponseSingle)
      .error("4XX", ResourceSharingApiResponseCommonFailure)
      .error("5XX", ResourceSharingApiResponseCommonFailure)
      .summary("Create a new share")
      .operationId("share-create")
      .tag("Resource Sharing")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{share_id}", {
      params: Type.Object({ share_id: ResourceSharingShareId }),
      query: Type.Object({
        include_resources: Type.Optional(Type.Boolean()),
        include_recipient_counts: Type.Optional(Type.Boolean()),
      }),
    })
      .response(ResourceSharingShareResponseSingle)
      .error("4XX", ResourceSharingApiResponseCommonFailure)
      .error("5XX", ResourceSharingApiResponseCommonFailure)
      .summary("Get account share by ID")
      .description("Fetches share by ID.")
      .operationId("shares-get-by-id")
      .tag("Resource Sharing")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/{share_id}", {
      params: Type.Object({ share_id: ResourceSharingShareId }),
      body: ResourceSharingUpdateShareRequest,
    })
      .response(ResourceSharingShareResponseSingle)
      .error("4XX", ResourceSharingApiResponseCommonFailure)
      .error("5XX", ResourceSharingApiResponseCommonFailure)
      .summary("Update a share")
      .description("Updating is not immediate, an updated share object with a new status will be returned.")
      .operationId("share-update")
      .tag("Resource Sharing")
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/{share_id}", {
      params: Type.Object({ share_id: ResourceSharingShareId }),
    })
      .response(ResourceSharingShareResponseSingle)
      .error("4XX", ResourceSharingApiResponseCommonFailure)
      .error("5XX", ResourceSharingApiResponseCommonFailure)
      .summary("Delete a share")
      .description("Deletion is not immediate, an updated share object with a new status will be returned.")
      .operationId("share-delete")
      .tag("Resource Sharing")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{share_id}/recipients", {
      params: Type.Object({ share_id: ResourceSharingShareId }),
      query: Type.Object({
        include_resources: Type.Optional(Type.Boolean()),
        page: Type.Optional(Type.Integer({ minimum: 0, multipleOf: 1 })),
        per_page: Type.Optional(Type.Integer({ minimum: 0, maximum: 100, multipleOf: 1 })),
      }),
    })
      .response(ResourceSharingShareRecipientResponseCollection)
      .error("4XX", ResourceSharingApiResponseCommonFailure)
      .error("5XX", ResourceSharingApiResponseCommonFailure)
      .summary("List share recipients by share ID")
      .description("List share recipients by share ID.")
      .operationId("share-recipients-list")
      .tag("Resource Sharing")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/{share_id}/recipients", {
      params: Type.Object({ share_id: ResourceSharingShareId }),
      body: ResourceSharingCreateShareRecipientRequest,
    })
      .respond(201, ResourceSharingShareRecipientResponseSingle)
      .error("4XX", ResourceSharingApiResponseCommonFailure)
      .error("5XX", ResourceSharingApiResponseCommonFailure)
      .summary("Create a new share recipient")
      .operationId("share-recipient-create")
      .tag("Resource Sharing")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/{share_id}/recipients", {
      params: Type.Object({ share_id: ResourceSharingShareId }),
      body: ResourceSharingUpdateShareRecipientsRequest,
    })
      .error("4XX", ResourceSharingApiResponseCommonFailure)
      .error("5XX", ResourceSharingApiResponseCommonFailure)
      .summary("Update a share's recipients")
      .description(
        "Changes a share's recipients to match the given list. Returns an error if the share targets an organization.",
      )
      .operationId("share-recipients-update")
      .tag("Resource Sharing")
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{share_id}/recipients/{recipient_id}", {
      params: Type.Object({ share_id: ResourceSharingShareId, recipient_id: ResourceSharingRecipientId }),
      query: Type.Object({
        include_resources: Type.Optional(Type.Boolean()),
      }),
    })
      .response(ResourceSharingShareRecipientResponseSingle)
      .error("4XX", ResourceSharingApiResponseCommonFailure)
      .error("5XX", ResourceSharingApiResponseCommonFailure)
      .summary("Get share recipient by ID")
      .description("Get share recipient by ID.")
      .operationId("share-recipients-get-by-id")
      .tag("Resource Sharing")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/{share_id}/recipients/{recipient_id}", {
      params: Type.Object({ share_id: ResourceSharingShareId, recipient_id: ResourceSharingRecipientId }),
    })
      .response(ResourceSharingShareRecipientResponseSingle)
      .error("4XX", ResourceSharingApiResponseCommonFailure)
      .error("5XX", ResourceSharingApiResponseCommonFailure)
      .summary("Delete a share recipient")
      .description("Deletion is not immediate, an updated share recipient object with a new status will be returned.")
      .operationId("share-recipient-delete")
      .tag("Resource Sharing")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{share_id}/resources", {
      params: Type.Object({ share_id: ResourceSharingShareId }),
      query: Type.Object({
        status: Type.Optional(ResourceSharingResourceStatus),
        resource_type: Type.Optional(ResourceSharingResourceType),
        page: Type.Optional(Type.Integer({ minimum: 0, multipleOf: 1 })),
        per_page: Type.Optional(Type.Integer({ minimum: 0, maximum: 100, multipleOf: 1 })),
      }),
    })
      .response(ResourceSharingShareResourceResponseCollection)
      .error("4XX", ResourceSharingApiResponseCommonFailure)
      .error("5XX", ResourceSharingApiResponseCommonFailure)
      .summary("List share resources by share ID")
      .description("List share resources by share ID.")
      .operationId("share-resources-list")
      .tag("Resource Sharing")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/{share_id}/resources", {
      params: Type.Object({ share_id: ResourceSharingShareId }),
      body: ResourceSharingCreateShareResourceRequest,
    })
      .respond(201, ResourceSharingShareResourceResponseSingle)
      .error("4XX", ResourceSharingApiResponseCommonFailure)
      .error("5XX", ResourceSharingApiResponseCommonFailure)
      .summary("Create a new share resource")
      .operationId("share-resource-create")
      .tag("Resource Sharing")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{share_id}/resources/{resource_id}", {
      params: Type.Object({ share_id: ResourceSharingShareId, resource_id: ResourceSharingResourceId }),
    })
      .response(ResourceSharingShareResourceResponseSingle)
      .error("4XX", ResourceSharingApiResponseCommonFailure)
      .error("5XX", ResourceSharingApiResponseCommonFailure)
      .summary("Get share resource by ID")
      .description("Get share resource by ID.")
      .operationId("share-resources-get-by-id")
      .tag("Resource Sharing")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/{share_id}/resources/{resource_id}", {
      params: Type.Object({ share_id: ResourceSharingShareId, resource_id: ResourceSharingResourceId }),
      body: ResourceSharingUpdateShareResourceRequest,
    })
      .response(ResourceSharingShareResourceResponseSingle)
      .error("4XX", ResourceSharingApiResponseCommonFailure)
      .error("5XX", ResourceSharingApiResponseCommonFailure)
      .summary("Update a share resource")
      .description("Update is not immediate, an updated share resource object with a new status will be returned.")
      .operationId("share-resource-update")
      .tag("Resource Sharing")
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/{share_id}/resources/{resource_id}", {
      params: Type.Object({ share_id: ResourceSharingShareId, resource_id: ResourceSharingResourceId }),
    })
      .response(ResourceSharingShareResourceResponseSingle)
      .error("4XX", ResourceSharingApiResponseCommonFailure)
      .error("5XX", ResourceSharingApiResponseCommonFailure)
      .summary("Delete a share resource")
      .description("Deletion is not immediate, an updated share resource object with a new status will be returned.")
      .operationId("share-resource-delete")
      .tag("Resource Sharing")
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", null)
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })
  })
}

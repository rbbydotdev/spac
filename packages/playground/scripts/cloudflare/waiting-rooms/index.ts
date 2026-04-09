import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, WaitingroomWaitingRoomId } from "../shared/schemas"
import {
  UnnamedSchemaRef229c159575bc68a9c21f5a1615629cf6,
  UnnamedSchemaRefF1c0ba8f44601f2db2e07b9397b6c430,
  WaitingRoomSetting,
  WaitingroomCreateRule,
  WaitingroomEventDetailsResponse,
  WaitingroomEventId,
  WaitingroomEventIdResponse,
  WaitingroomEventResponse,
  WaitingroomEventResponseCollection,
  WaitingroomPatchRule,
  WaitingroomPreviewResponse,
  WaitingroomQueryEvent,
  WaitingroomQueryPreview,
  WaitingroomQueryWaitingroom,
  WaitingroomRuleId,
  WaitingroomRulesResponseCollection,
  WaitingroomSingleResponse,
  WaitingroomStatusResponse,
  WaitingroomUpdateRules,
  WaitingroomWaitingRoomIdResponse,
  WaitingroomZoneSettings,
  WaitingroomZoneSettingsResponse,
} from "./schemas"

export function registerWaitingRooms(api: Api) {
  api.assertVersion("3.0.3", "WaitingRooms")

  api.group("/zones/{zone_id}/waiting_rooms", { params: Type.Object({ zone_id: Type.String() }) }, (g) => {
    g.post("/", {
      body: WaitingroomQueryWaitingroom,
    })
      .response(WaitingroomSingleResponse)
      .error(
        "4XX",
        Type.Object({
          result: Type.Union([Type.Null()]),
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Create waiting room")
      .description("Creates a new waiting room.")
      .operationId("waiting-room-create-waiting-room")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.post("/preview", {
      body: WaitingroomQueryPreview,
    })
      .response(WaitingroomPreviewResponse)
      .error(
        "4XX",
        Type.Object({
          result: Type.Union([Type.Null()]),
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Create a custom waiting room page preview")
      .description(
        'Creates a waiting room page preview. Upload a custom waiting room page for preview. You will receive a preview URL in the form `http://waitingrooms.dev/preview/<uuid>`. You can use the following query parameters to change the state of the preview:\n1. `force_queue`: Boolean indicating if all users will be queued in the waiting room and no one will be let into the origin website (also known as queueAll).\n2. `queue_is_full`: Boolean indicating if the waiting room\'s queue is currently full and not accepting new users at the moment.\n3. `queueing_method`: The queueing method currently used by the waiting room.\n\t- **fifo** indicates a FIFO queue.\n\t- **random** indicates a Random queue.\n\t- **passthrough** indicates a Passthrough queue. Keep in mind that the waiting room page will only be displayed if `force_queue=true` or `event=prequeueing` — for other cases the request will pass through to the origin. For our preview, this will be a fake origin website returning \\"Welcome\\". \n\t- **reject** indicates a Reject queue.\n4. `event`: Used to preview a waiting room event.\n\t- **none** indicates no event is occurring.\n\t- **prequeueing** indicates that an event is prequeueing (between `prequeue_start_time` and `event_start_time`).\n\t- **started** indicates that an event has started (between `event_start_time` and `event_end_time`).\n5. `shuffle_at_event_start`: Boolean indicating if the event will shuffle users in the prequeue when it starts. This can only be set to **true** if an event is active (`event` is not **none**).\n\nFor example, you can make a request to `http://waitingrooms.dev/preview/<uuid>?force_queue=false&queue_is_full=false&queueing_method=random&event=started&shuffle_at_event_start=true`\n6. `waitTime`: Non-zero, positive integer indicating the estimated wait time in minutes. The default value is 10 minutes.\n\nFor example, you can make a request to `http://waitingrooms.dev/preview/<uuid>?waitTime=50` to configure the estimated wait time as 50 minutes.',
      )
      .operationId("waiting-room-create-a-custom-waiting-room-page-preview")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/settings", {})
      .response(WaitingroomZoneSettingsResponse)
      .error(
        "4XX",
        Type.Object({
          result: WaitingRoomSetting,
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Get zone-level Waiting Room settings")
      .operationId("waiting-room-get-zone-settings")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Read", "Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.put("/settings", {
      body: WaitingroomZoneSettings,
    })
      .response(WaitingroomZoneSettingsResponse)
      .error(
        "4XX",
        Type.Object({
          result: WaitingRoomSetting,
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Update zone-level Waiting Room settings")
      .operationId("waiting-room-update-zone-settings")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.patch("/settings", {
      body: WaitingroomZoneSettings,
    })
      .response(WaitingroomZoneSettingsResponse)
      .error(
        "4XX",
        Type.Object({
          result: WaitingRoomSetting,
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Patch zone-level Waiting Room settings")
      .operationId("waiting-room-patch-zone-settings")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.get("/{waiting_room_id}", {
      params: Type.Object({ waiting_room_id: WaitingroomWaitingRoomId }),
    })
      .response(WaitingroomSingleResponse)
      .error(
        "4XX",
        Type.Object({
          result: Type.Union([Type.Null()]),
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Waiting room details")
      .description("Fetches a single configured waiting room.")
      .operationId("waiting-room-waiting-room-details")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Read", "Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.put("/{waiting_room_id}", {
      params: Type.Object({ waiting_room_id: WaitingroomWaitingRoomId }),
      body: WaitingroomQueryWaitingroom,
    })
      .response(WaitingroomSingleResponse)
      .error(
        "4XX",
        Type.Object({
          result: Type.Union([Type.Null()]),
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Update waiting room")
      .description("Updates a configured waiting room.")
      .operationId("waiting-room-update-waiting-room")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.patch("/{waiting_room_id}", {
      params: Type.Object({ waiting_room_id: WaitingroomWaitingRoomId }),
      body: WaitingroomQueryWaitingroom,
    })
      .response(WaitingroomSingleResponse)
      .error(
        "4XX",
        Type.Object({
          result: Type.Union([Type.Null()]),
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Patch waiting room")
      .description("Patches a configured waiting room.")
      .operationId("waiting-room-patch-waiting-room")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.delete("/{waiting_room_id}", {
      params: Type.Object({ waiting_room_id: WaitingroomWaitingRoomId }),
    })
      .response(WaitingroomWaitingRoomIdResponse)
      .error(
        "4XX",
        Type.Object({
          result: Type.Union([Type.Null()]),
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Delete waiting room")
      .description("Deletes a waiting room.")
      .operationId("waiting-room-delete-waiting-room")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })

    g.get("/{waiting_room_id}/events", {
      params: Type.Object({ waiting_room_id: WaitingroomWaitingRoomId }),
      query: Type.Object({
        page: Type.Optional(Type.Number({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Number({ default: 25, minimum: 5, maximum: 1000 })),
      }),
    })
      .response(WaitingroomEventResponseCollection)
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
      )
      .summary("List events")
      .description("Lists events for a waiting room.")
      .operationId("waiting-room-list-events")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Read", "Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/{waiting_room_id}/events", {
      params: Type.Object({ waiting_room_id: WaitingroomWaitingRoomId }),
      body: WaitingroomQueryEvent,
    })
      .response(WaitingroomEventResponse)
      .error(
        "4XX",
        Type.Object({
          result: UnnamedSchemaRef229c159575bc68a9c21f5a1615629cf6,
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Create event")
      .description(
        "Only available for the Waiting Room Advanced subscription. Creates an event for a waiting room. An event takes place during a specified period of time, temporarily changing the behavior of a waiting room. While the event is active, some of the properties in the event's configuration may either override or inherit from the waiting room's configuration. Note that events cannot overlap with each other, so only one event can be active at a time.",
      )
      .operationId("waiting-room-create-event")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{waiting_room_id}/events/{event_id}", {
      params: Type.Object({ event_id: WaitingroomEventId, waiting_room_id: WaitingroomWaitingRoomId }),
    })
      .response(WaitingroomEventResponse)
      .error(
        "4XX",
        Type.Object({
          result: UnnamedSchemaRef229c159575bc68a9c21f5a1615629cf6,
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Event details")
      .description("Fetches a single configured event for a waiting room.")
      .operationId("waiting-room-event-details")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Read", "Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/{waiting_room_id}/events/{event_id}", {
      params: Type.Object({ event_id: WaitingroomEventId, waiting_room_id: WaitingroomWaitingRoomId }),
      body: WaitingroomQueryEvent,
    })
      .response(WaitingroomEventResponse)
      .error(
        "4XX",
        Type.Object({
          result: UnnamedSchemaRef229c159575bc68a9c21f5a1615629cf6,
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Update event")
      .description("Updates a configured event for a waiting room.")
      .operationId("waiting-room-update-event")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.patch("/{waiting_room_id}/events/{event_id}", {
      params: Type.Object({ event_id: WaitingroomEventId, waiting_room_id: WaitingroomWaitingRoomId }),
      body: WaitingroomQueryEvent,
    })
      .response(WaitingroomEventResponse)
      .error(
        "4XX",
        Type.Object({
          result: UnnamedSchemaRef229c159575bc68a9c21f5a1615629cf6,
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Patch event")
      .description("Patches a configured event for a waiting room.")
      .operationId("waiting-room-patch-event")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/{waiting_room_id}/events/{event_id}", {
      params: Type.Object({ event_id: WaitingroomEventId, waiting_room_id: WaitingroomWaitingRoomId }),
    })
      .response(WaitingroomEventIdResponse)
      .error(
        "4XX",
        Type.Object({
          result: Type.Union([Type.Null()]),
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Delete event")
      .description("Deletes an event for a waiting room.")
      .operationId("waiting-room-delete-event")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{waiting_room_id}/events/{event_id}/details", {
      params: Type.Object({ event_id: WaitingroomEventId, waiting_room_id: WaitingroomWaitingRoomId }),
    })
      .response(WaitingroomEventDetailsResponse)
      .error(
        "4XX",
        Type.Object({
          result: Type.Union([Type.Null()]),
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Preview active event details")
      .description(
        "Previews an event's configuration as if it was active. Inherited fields from the waiting room will be displayed with their current values.",
      )
      .operationId("waiting-room-preview-active-event-details")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Read", "Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{waiting_room_id}/rules", {
      params: Type.Object({ waiting_room_id: WaitingroomWaitingRoomId }),
    })
      .response(WaitingroomRulesResponseCollection)
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
              count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
              per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
              total_count: Type.Optional(
                Type.Number({ description: "Total results available without any search parameters." }),
              ),
            }),
          ),
          result: UnnamedSchemaRefF1c0ba8f44601f2db2e07b9397b6c430,
        }),
      )
      .summary("List Waiting Room Rules")
      .description("Lists rules for a waiting room.")
      .operationId("waiting-room-list-waiting-room-rules")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Read", "Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.post("/{waiting_room_id}/rules", {
      params: Type.Object({ waiting_room_id: WaitingroomWaitingRoomId }),
      body: WaitingroomCreateRule,
    })
      .response(WaitingroomRulesResponseCollection)
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
              count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
              per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
              total_count: Type.Optional(
                Type.Number({ description: "Total results available without any search parameters." }),
              ),
            }),
          ),
          result: UnnamedSchemaRefF1c0ba8f44601f2db2e07b9397b6c430,
        }),
      )
      .summary("Create Waiting Room Rule")
      .description("Only available for the Waiting Room Advanced subscription. Creates a rule for a waiting room.")
      .operationId("waiting-room-create-waiting-room-rule")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.put("/{waiting_room_id}/rules", {
      params: Type.Object({ waiting_room_id: WaitingroomWaitingRoomId }),
      body: WaitingroomUpdateRules,
    })
      .response(WaitingroomRulesResponseCollection)
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
              count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
              per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
              total_count: Type.Optional(
                Type.Number({ description: "Total results available without any search parameters." }),
              ),
            }),
          ),
          result: UnnamedSchemaRefF1c0ba8f44601f2db2e07b9397b6c430,
        }),
      )
      .summary("Replace Waiting Room Rules")
      .description("Only available for the Waiting Room Advanced subscription. Replaces all rules for a waiting room.")
      .operationId("waiting-room-replace-waiting-room-rules")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.patch("/{waiting_room_id}/rules/{rule_id}", {
      params: Type.Object({ rule_id: WaitingroomRuleId, waiting_room_id: WaitingroomWaitingRoomId }),
      body: WaitingroomPatchRule,
    })
      .response(WaitingroomRulesResponseCollection)
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
              count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
              per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
              total_count: Type.Optional(
                Type.Number({ description: "Total results available without any search parameters." }),
              ),
            }),
          ),
          result: UnnamedSchemaRefF1c0ba8f44601f2db2e07b9397b6c430,
        }),
      )
      .summary("Patch Waiting Room Rule")
      .description("Patches a rule for a waiting room.")
      .operationId("waiting-room-patch-waiting-room-rule")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.delete("/{waiting_room_id}/rules/{rule_id}", {
      params: Type.Object({ rule_id: WaitingroomRuleId, waiting_room_id: WaitingroomWaitingRoomId }),
    })
      .response(WaitingroomRulesResponseCollection)
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
              count: Type.Optional(Type.Number({ description: "Total number of results for the requested service." })),
              page: Type.Optional(Type.Number({ description: "Current page within paginated list of results." })),
              per_page: Type.Optional(Type.Number({ description: "Number of results per page of results." })),
              total_count: Type.Optional(
                Type.Number({ description: "Total results available without any search parameters." }),
              ),
            }),
          ),
          result: UnnamedSchemaRefF1c0ba8f44601f2db2e07b9397b6c430,
        }),
      )
      .summary("Delete Waiting Room Rule")
      .description("Deletes a rule for a waiting room.")
      .operationId("waiting-room-delete-waiting-room-rule")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: false, enterprise: true, free: false, pro: false })

    g.get("/{waiting_room_id}/status", {
      params: Type.Object({ waiting_room_id: WaitingroomWaitingRoomId }),
    })
      .response(WaitingroomStatusResponse)
      .error(
        "4XX",
        Type.Object({
          result: Type.Union([Type.Null()]),
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
        }),
      )
      .summary("Get waiting room status")
      .description(
        "Fetches the status of a configured waiting room. Response fields include:\n1. `status`: String indicating the status of the waiting room. The possible status are:\n\t- **not_queueing** indicates that the configured thresholds have not been met and all users are going through to the origin.\n\t- **queueing** indicates that the thresholds have been met and some users are held in the waiting room.\n\t- **event_prequeueing** indicates that an event is active and is currently prequeueing users before it starts.\n\t- **suspended** indicates that the room is suspended.\n2. `event_id`: String of the current event's `id` if an event is active, otherwise an empty string.\n3. `estimated_queued_users`: Integer of the estimated number of users currently waiting in the queue.\n4. `estimated_total_active_users`: Integer of the estimated number of users currently active on the origin.\n5. `max_estimated_time_minutes`: Integer of the maximum estimated time currently presented to the users.",
      )
      .operationId("waiting-room-get-waiting-room-status")
      .tag("Waiting Room")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Waiting Rooms Read", "Waiting Rooms Write"])
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: false, pro: false })
  })
}

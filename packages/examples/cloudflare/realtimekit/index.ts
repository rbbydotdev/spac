import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import {
  RealtimekitActivesession,
  RealtimekitAiconfig,
  RealtimekitAudioconfig,
  RealtimekitChatmessage,
  RealtimekitErrorresponse,
  RealtimekitGenericerrorresponse,
  RealtimekitInteractiveconfig,
  RealtimekitLivestreambase,
  RealtimekitLivestreamingconfig,
  RealtimekitMeeting,
  RealtimekitOrganizationlistsuccessresponse,
  RealtimekitOrganizationrequest,
  RealtimekitOrganizationsuccessresponse,
  RealtimekitParticipant,
  RealtimekitParticipantslist,
  RealtimekitPatchorganizationrequest,
  RealtimekitPatchwebhookrequest,
  RealtimekitPoll,
  RealtimekitPreset,
  RealtimekitPresetlistitem,
  RealtimekitRealtimekitbucketconfig,
  RealtimekitRecording,
  RealtimekitRecordingconfig,
  RealtimekitSessionparticipant,
  RealtimekitStartreason,
  RealtimekitStopreason,
  RealtimekitStorageconfig,
  RealtimekitSuccess,
  RealtimekitTrackconfiglayer,
  RealtimekitTranscript,
  RealtimekitTranscriptsummary,
  RealtimekitUpdatepreset,
  RealtimekitVideoconfig,
  RealtimekitWebhookrequest,
  RealtimekitWebhookslistsuccessresponse,
  RealtimekitWebhooksuccessresponse,
} from "./schemas"

export function registerRealtimekit(api: Api) {
  api.group("/accounts/{account_id}/realtimekit", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/analytics/daywise", {
      query: Type.Object({
        start_date: Type.Optional(Type.String()),
        end_date: Type.Optional(Type.String()),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            recording_stats: Type.Optional(
              Type.Object(
                {
                  day_stats: Type.Optional(
                    Type.Array(
                      Type.Object({
                        day: Type.Optional(Type.String()),
                        total_recording_minutes: Type.Optional(
                          Type.Integer({ description: "Total recording minutes for a specific day" }),
                        ),
                        total_recordings: Type.Optional(
                          Type.Integer({ description: "Total number of recordings for a specific day" }),
                        ),
                      }),
                      { description: "Day wise recording stats" },
                    ),
                  ),
                  recording_count: Type.Optional(
                    Type.Integer({ description: "Total number of recordings during the range specified" }),
                  ),
                  recording_minutes_consumed: Type.Optional(
                    Type.Number({ description: "Total recording minutes during the range specified" }),
                  ),
                },
                { description: "Recording statistics of an organization during the range specified" },
              ),
            ),
            session_stats: Type.Optional(
              Type.Object(
                {
                  day_stats: Type.Optional(
                    Type.Array(
                      Type.Object({
                        day: Type.Optional(Type.String()),
                        total_session_minutes: Type.Optional(
                          Type.Number({ description: "Total session minutes for a specific day" }),
                        ),
                        total_sessions: Type.Optional(
                          Type.Integer({ description: "Total number of sessions for a specific day" }),
                        ),
                      }),
                      { description: "Day wise session stats" },
                    ),
                  ),
                  sessions_count: Type.Optional(
                    Type.Integer({ description: "Total number of sessions during the range specified" }),
                  ),
                  sessions_minutes_consumed: Type.Optional(
                    Type.Number({ description: "Total session minutes during the range specified" }),
                  ),
                },
                { description: "Session statistics of an organization during the range specified" },
              ),
            ),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch day-wise session and recording analytics data for an organization")
      .description(
        "Returns day-wise session and recording analytics data of an organization for the specified time range start_date to end_date. If start_date and end_date are not provided, the default time range is set from 30 days ago to the current date.",
      )
      .operationId("get-org-analytics")
      .tag("Analytics")
      .tag("Organizations")
      .security({ api_token: [] })

    g.get("/analytics/livestreams/daywise", {
      query: Type.Object({
        start_time: Type.Optional(Type.String({ format: "date-time" })),
        end_time: Type.Optional(Type.String({ format: "date-time" })),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            count: Type.Optional(Type.String({ description: "Count of total livestreams." })),
            date: Type.Optional(Type.String({ description: "The livestream timestamp, provided in ISO format." })),
            total_ingest_seconds: Type.Optional(
              Type.String({
                description: "Total time duration for which the input was given or the meeting was streamed.",
              }),
            ),
            total_viewer_seconds: Type.Optional(
              Type.String({ description: "Total view time for which the viewers watched the stream." }),
            ),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch day-wise analytics data for your livestreams")
      .description("Returns day-wise livestream analytics data for the specified time range.")
      .operationId("get-livestream-analytics-daywise")
      .tag("Live streams")
      .tag("LivestreamAnalytics")
      .security({ api_token: [] })

    g.get("/analytics/livestreams/overall", {
      query: Type.Object({
        start_time: Type.Optional(Type.String({ format: "date-time" })),
        end_time: Type.Optional(Type.String({ format: "date-time" })),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            count: Type.Optional(Type.Integer({ description: "Count of total livestreams." })),
            total_ingest_seconds: Type.Optional(
              Type.Integer({
                description: "Total time duration for which the input was given or the meeting was streamed.",
              }),
            ),
            total_viewer_seconds: Type.Optional(
              Type.Integer({ description: "Total view time for which the viewers watched the stream." }),
            ),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch complete analytics data for your livestreams")
      .description("Returns livestream analytics for the specified time range.")
      .operationId("get-livestream-analytics-complete")
      .tag("Live streams")
      .tag("LivestreamAnalytics")
      .security({ api_token: [] })

    g.get("/livestreams", {
      query: Type.Object({
        exclude_meetings: Type.Optional(Type.Boolean({ default: false })),
        per_page: Type.Optional(Type.Integer()),
        page_no: Type.Optional(Type.Integer()),
        status: Type.Optional(
          Type.Union([Type.Literal("LIVE"), Type.Literal("IDLE"), Type.Literal("ERRORED"), Type.Literal("INVOKED")]),
        ),
        start_time: Type.Optional(Type.String({ format: "date-time" })),
        end_time: Type.Optional(Type.String({ format: "date-time" })),
        sort_order: Type.Optional(Type.Union([Type.Literal("ASC"), Type.Literal("DSC")])),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            created_at: Type.Optional(
              Type.String({
                description: "Timestamp the object was created at. The time is returned in ISO format.",
                format: "date-time",
                readOnly: true,
              }),
            ),
            disabled: Type.Optional(Type.String({ description: "Specifies if the livestream was disabled." })),
            id: Type.Optional(Type.String({ description: "The ID of the livestream.", format: "uuid" })),
            ingest_server: Type.Optional(
              Type.String({ description: "The server URL to which the RTMP encoder sends the video and audio data." }),
            ),
            meeting_id: Type.Optional(Type.String({ description: "ID of the meeting." })),
            name: Type.Optional(Type.String({ description: "Name of the livestream." })),
            paging: Type.Optional(
              Type.Object({
                end_offset: Type.Optional(Type.Integer()),
                start_offset: Type.Optional(Type.Integer()),
                total_count: Type.Optional(Type.Integer()),
              }),
            ),
            playback_url: Type.Optional(
              Type.String({ description: "The web address that viewers can use to watch the livestream." }),
            ),
            status: Type.Optional(
              Type.Union([
                Type.Literal("LIVE"),
                Type.Literal("IDLE"),
                Type.Literal("ERRORED"),
                Type.Literal("INVOKED"),
              ]),
            ),
            stream_key: Type.Optional(Type.String({ description: "Unique key for accessing each livestream." })),
            updated_at: Type.Optional(
              Type.String({
                description: "Timestamp the object was updated at. The time is returned in ISO format.",
                format: "date-time",
                readOnly: true,
              }),
            ),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch all livestreams")
      .description(
        "Returns details of livestreams associated with the given organization ID. It includes livestreams created by your organization and RealtimeKit meetings that are livestreamed by your organization. If you only want details of livestreams created by your organization and not RealtimeKit meetings, you can use the `exclude_meetings` query parameter.",
      )
      .operationId("fetch_all_livestreams")
      .tag("Live streams")
      .security({ api_token: [] })

    g.post("/livestreams", {
      body: Type.Object({
        name: Type.Optional(Type.Union([Type.String({ description: "Name of the livestream" }), Type.Null()])),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            disabled: Type.Optional(Type.Boolean({ description: "Specifies if the livestream was disabled." })),
            id: Type.Optional(Type.String({ description: "The livestream ID." })),
            ingest_server: Type.Optional(
              Type.String({
                description: "The server URL to which the RTMP encoder should send the video and audio data.",
              }),
            ),
            meeting_id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
            name: Type.Optional(Type.String()),
            playback_url: Type.Optional(
              Type.String({ description: "The web address that viewers can use to watch the livestream." }),
            ),
            status: Type.Optional(
              Type.Union([
                Type.Literal("LIVE"),
                Type.Literal("IDLE"),
                Type.Literal("ERRORED"),
                Type.Literal("INVOKED"),
              ]),
            ),
            stream_key: Type.Optional(Type.String({ description: "Unique key for accessing each livestream." })),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Create an independent livestream")
      .description(
        "Creates a livestream for the given organization ID and returns ingest server, stream key, and playback URL. You can pass custom input to the ingest server and stream key, and freely distribute the content using the playback URL on any player that supports HLS/LHLS.",
      )
      .tag("Live streams")
      .security({ api_token: [] })

    g.get("/livestreams/sessions/{livestream-session-id}", {
      params: Type.Object({ "livestream-session-id": Type.String() }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            created_at: Type.Optional(
              Type.String({
                description: "Timestamp the object was created at. The time is returned in ISO format.",
                format: "date-time",
                readOnly: true,
              }),
            ),
            err_message: Type.Optional(
              Type.String({ description: "The server URL to which the RTMP encoder sends the video and audio data." }),
            ),
            id: Type.Optional(Type.String({ description: "The livestream ID." })),
            ingest_seconds: Type.Optional(Type.Integer({ description: "Name of the livestream." })),
            livestream_id: Type.Optional(Type.String()),
            started_time: Type.Optional(Type.String({ description: "Unique key for accessing each livestream." })),
            stopped_time: Type.Optional(
              Type.String({ description: "The web address that viewers can use to watch the livestream." }),
            ),
            updated_at: Type.Optional(
              Type.String({
                description: "Timestamp the object was updated at. The time is returned in ISO format.",
                readOnly: true,
              }),
            ),
            viewer_seconds: Type.Optional(Type.Integer({ description: "Specifies if the livestream was disabled." })),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch livestream session details using livestream session ID")
      .description(
        "Returns livestream session details for the given livestream session ID. Retrieve the `livestream_session_id`using the `Fetch livestream session details using a session ID` API.",
      )
      .operationId("get-v2-livestreams-livestream-session-id")
      .tag("Live streams")
      .security({ api_token: [] })

    g.get("/livestreams/{livestream_id}", {
      params: Type.Object({ livestream_id: Type.String() }),
      query: Type.Object({
        page_no: Type.Optional(Type.Integer()),
        per_page: Type.Optional(Type.Integer()),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            livestream: Type.Optional(
              Type.Object({
                created_at: Type.Optional(
                  Type.String({
                    description: "Timestamp the object was created at. The time is returned in ISO format.",
                    readOnly: true,
                  }),
                ),
                disabled: Type.Optional(Type.String({ description: "Specifies if the livestream was disabled." })),
                id: Type.Optional(Type.String({ description: "ID of the livestream." })),
                ingest_server: Type.Optional(
                  Type.String({
                    description: "The server URL to which the RTMP encoder sends the video and audio data.",
                  }),
                ),
                meeting_id: Type.Optional(Type.String({ description: "The ID of the meeting." })),
                name: Type.Optional(Type.String({ description: "Name of the livestream." })),
                playback_url: Type.Optional(
                  Type.String({ description: "The web address that viewers can use to watch the livestream." }),
                ),
                status: Type.Optional(
                  Type.Union([
                    Type.Literal("LIVE"),
                    Type.Literal("IDLE"),
                    Type.Literal("ERRORED"),
                    Type.Literal("INVOKED"),
                  ]),
                ),
                stream_key: Type.Optional(Type.String({ description: "Unique key for accessing each livestream." })),
                updated_at: Type.Optional(
                  Type.String({
                    description: "Timestamp the object was updated at. The time is returned in ISO format.",
                    readOnly: true,
                  }),
                ),
              }),
            ),
            paging: Type.Optional(
              Type.Object({
                end_offset: Type.Optional(Type.Integer()),
                start_offset: Type.Optional(Type.Integer()),
                total_count: Type.Optional(Type.Integer()),
              }),
            ),
            session: Type.Optional(
              Type.Object({
                created_at: Type.Optional(
                  Type.String({
                    description: "Timestamp the object was created at. The time is returned in ISO format.",
                    format: "date-time",
                    readOnly: true,
                  }),
                ),
                err_message: Type.Optional(Type.String()),
                id: Type.Optional(Type.String({ description: "ID of the session." })),
                ingest_seconds: Type.Optional(
                  Type.Number({
                    description: "The time duration for which the input was given or the meeting was streamed.",
                  }),
                ),
                invoked_time: Type.Optional(
                  Type.String({
                    description: "Timestamp the object was invoked. The time is returned in ISO format.",
                    format: "date-time",
                  }),
                ),
                livestream_id: Type.Optional(Type.String()),
                started_time: Type.Optional(
                  Type.String({
                    description: "Timestamp the object was started. The time is returned in ISO format.",
                    format: "date-time",
                  }),
                ),
                stopped_time: Type.Optional(
                  Type.String({
                    description: "Timestamp the object was stopped. The time is returned in ISO format.",
                    format: "date-time",
                  }),
                ),
                updated_at: Type.Optional(
                  Type.String({
                    description: "Timestamp the object was updated at. The time is returned in ISO format.",
                    format: "date-time",
                    readOnly: true,
                  }),
                ),
                viewer_seconds: Type.Optional(
                  Type.Number({ description: "The total view time for which the viewers watched the stream." }),
                ),
              }),
            ),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch livestream details using livestream ID")
      .description(
        "Returns details of a livestream with sessions for the given livestream ID. Retreive the livestream ID using the `Start livestreaming a meeting` API.",
      )
      .operationId("get-v2-livestream-session-livestream-id")
      .tag("Live streams")
      .security({ api_token: [] })

    g.get("/livestreams/{livestream_id}/active-livestream-session", {
      params: Type.Object({ livestream_id: Type.String() }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            livestream: Type.Optional(
              Type.Object({
                created_at: Type.Optional(
                  Type.String({
                    description: "Timestamp the object was created at. The time is returned in ISO format.",
                    format: "date-time",
                    readOnly: true,
                  }),
                ),
                disabled: Type.Optional(Type.String({ description: "Specifies if the livestream was disabled." })),
                id: Type.Optional(Type.String()),
                ingest_server: Type.Optional(
                  Type.String({
                    description: "The server URL to which the RTMP encoder sends the video and audio data.",
                  }),
                ),
                meeting_id: Type.Optional(Type.String({ description: "ID of the meeting." })),
                name: Type.Optional(Type.String({ description: "Name of the livestream." })),
                playback_url: Type.Optional(
                  Type.String({ description: "The web address that viewers can use to watch the livestream." }),
                ),
                status: Type.Optional(
                  Type.Union([
                    Type.Literal("LIVE"),
                    Type.Literal("IDLE"),
                    Type.Literal("ERRORED"),
                    Type.Literal("INVOKED"),
                  ]),
                ),
                stream_key: Type.Optional(Type.String({ description: "Unique key for accessing each livestream." })),
                updated_at: Type.Optional(
                  Type.String({
                    description: "Timestamp the object was updated at. The time is returned in ISO format.",
                    format: "date-time",
                    readOnly: true,
                  }),
                ),
              }),
            ),
            session: Type.Optional(
              Type.Object({
                created_at: Type.Optional(
                  Type.String({
                    description: "Timestamp the object was created at. The time is returned in ISO format.",
                    format: "date-time",
                    readOnly: true,
                  }),
                ),
                err_message: Type.Optional(Type.String()),
                id: Type.Optional(Type.String()),
                ingest_seconds: Type.Optional(
                  Type.String({
                    description: "The time duration for which the input was given or the meeting was streamed.",
                  }),
                ),
                invoked_time: Type.Optional(
                  Type.String({
                    description: "Timestamp the object was invoked. The time is returned in ISO format.",
                    format: "date-time",
                  }),
                ),
                livestream_id: Type.Optional(Type.String()),
                started_time: Type.Optional(
                  Type.String({
                    description: "Timestamp the object was started. The time is returned in ISO format.",
                    format: "date-time",
                  }),
                ),
                stopped_time: Type.Optional(
                  Type.String({
                    description: "Timestamp the object was stopped. The time is returned in ISO format.",
                    format: "date-time",
                  }),
                ),
                updated_at: Type.Optional(
                  Type.String({
                    description: "Timestamp the object was updated at. The time is returned in ISO format.",
                    format: "date-time",
                    readOnly: true,
                  }),
                ),
                viewer_seconds: Type.Optional(
                  Type.String({ description: "The total view time for which the viewers watched the stream." }),
                ),
              }),
            ),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch active livestream session details")
      .description(
        "Returns details of all active livestreams for the given livestream ID. Retreive the livestream ID using the `Start livestreaming a meeting` API.",
      )
      .operationId("get-v2-active-livestream-session-details")
      .tag("Live streams")
      .security({ api_token: [] })

    g.put("/livestreams/{livestream_id}/disable", {
      params: Type.Object({ livestream_id: Type.String() }),
      response: Type.Object({
        LivestreamBase: Type.Optional(RealtimekitLivestreambase),
        success: Type.Optional(RealtimekitSuccess),
      }),
    })
      .summary("Disable a livestream")
      .description(
        "Disables a livestream for the given livestream ID. Retreive the livestream ID using the `Start livestreaming a meeting` API.",
      )
      .operationId("disable-livestream")
      .tag("Live streams")
      .security({ api_token: [] })

    g.put("/livestreams/{livestream_id}/enable", {
      params: Type.Object({ livestream_id: Type.String() }),
      response: Type.Object({
        data: Type.Optional(RealtimekitLivestreambase),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Enable a livestream")
      .description(
        "Enables a livestream for the given livestream ID. Retreive the livestream ID using the `Start livestreaming a meeting` API.",
      )
      .operationId("enable-livestream")
      .tag("Live streams")
      .security({ api_token: [] })

    g.post("/livestreams/{livestream_id}/reset-stream-key", {
      params: Type.Object({ livestream_id: Type.String() }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            created_at: Type.Optional(
              Type.String({
                description: "Timestamp the object was created at. The time is returned in ISO format.",
                format: "date-time",
                readOnly: true,
              }),
            ),
            disabled: Type.Optional(Type.String({ description: "Specifies if the livestream was disabled." })),
            id: Type.Optional(Type.String({ description: "The ID of the livestream." })),
            ingest_server: Type.Optional(
              Type.String({ description: "The server URL to which the RTMP encoder sends the video and audio data." }),
            ),
            meeting_id: Type.Optional(Type.String({ description: "The ID of the meeting." })),
            name: Type.Optional(Type.String({ description: "Name of the livestream." })),
            playback_url: Type.Optional(
              Type.String({ description: "The web address that viewers can use to watch the livestream." }),
            ),
            status: Type.Optional(
              Type.Union([
                Type.Literal("LIVE"),
                Type.Literal("IDLE"),
                Type.Literal("ERRORED"),
                Type.Literal("INVOKED"),
              ]),
            ),
            stream_key: Type.Optional(Type.String({ description: "Unique key for accessing each livestream." })),
            updated_at: Type.Optional(
              Type.String({
                description: "Timestamp the object was updated at. The time is returned in ISO format.",
                format: "date-time",
                readOnly: true,
              }),
            ),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Reset a livestream's stream key")
      .description(
        "Resets the stream key for the given livestream ID. Retreive the livestream ID using the `Start livestreaming a meeting` API.",
      )
      .operationId("reset-stream-key")
      .tag("Live streams")
      .security({ api_token: [] })

    g.get("/meetings", {
      query: Type.Object({
        page_no: Type.Optional(Type.Number({ minimum: 0 })),
        per_page: Type.Optional(Type.Number({ minimum: 0 })),
        start_time: Type.Optional(Type.String({ format: "date-time" })),
        end_time: Type.Optional(Type.String({ format: "date-time" })),
        search: Type.Optional(Type.String()),
      }),
      response: Type.Object({
        data: Type.Array(RealtimekitMeeting),
        paging: Type.Object({
          end_offset: Type.Number(),
          start_offset: Type.Number(),
          total_count: Type.Number({ minimum: 0 }),
        }),
        success: Type.Boolean(),
      }),
    })
      .summary("Fetch all meetings for an organization")
      .description("Returns all meetings for the given organization ID.")
      .operationId("get_all_meetings")
      .tag("Meetings")
      .security({ api_token: [] })

    g.post("/meetings", {
      body: Type.Object({
        ai_config: Type.Optional(RealtimekitAiconfig),
        live_stream_on_start: Type.Optional(
          Type.Union([
            Type.Boolean({
              description: "Specifies if the meeting should start getting livestreamed on start.",
              default: false,
            }),
            Type.Null(),
          ]),
        ),
        persist_chat: Type.Optional(
          Type.Boolean({
            description:
              "If a meeting is set to persist_chat, meeting chat would remain for a week within the meeting space.",
            default: false,
          }),
        ),
        preferred_region: Type.Optional(
          Type.Union(
            [
              Type.Literal("ap-south-1"),
              Type.Literal("ap-southeast-1"),
              Type.Literal("us-east-1"),
              Type.Literal("eu-central-1"),
              Type.Null(),
            ],
            { description: "The region in which this meeting should be created." },
          ),
        ),
        record_on_start: Type.Optional(
          Type.Union([
            Type.Boolean({
              description:
                "Specifies if the meeting should start getting recorded as soon as someone joins the meeting.",
              default: false,
            }),
            Type.Null(),
          ]),
        ),
        recording_config: Type.Optional(RealtimekitRecordingconfig),
        session_keep_alive_time_in_secs: Type.Optional(
          Type.Number({
            description:
              "Time in seconds, for which a session remains active, after the last participant has left the meeting.",
            default: 60,
            minimum: 60,
            maximum: 600,
          }),
        ),
        summarize_on_end: Type.Optional(
          Type.Boolean({
            description:
              "Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.",
            default: false,
          }),
        ),
        title: Type.Optional(Type.Union([Type.String({ description: "Title of the meeting" }), Type.Null()])),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object(
            {
              created_at: Type.String({
                description: "Timestamp the object was created at. The time is returned in ISO format.",
                format: "date-time",
                readOnly: true,
              }),
              id: Type.String({ description: "ID of the meeting.", format: "uuid", readOnly: true }),
              live_stream_on_start: Type.Optional(
                Type.Boolean({ description: "Specifies if the meeting should start getting livestreamed on start." }),
              ),
              persist_chat: Type.Optional(
                Type.Boolean({ description: "Specifies if Chat within a meeting should persist for a week." }),
              ),
              preferred_region: Type.Optional(
                Type.Union(
                  [
                    Type.Literal("ap-south-1"),
                    Type.Literal("ap-southeast-1"),
                    Type.Literal("us-east-1"),
                    Type.Literal("eu-central-1"),
                    Type.Null(),
                  ],
                  { description: "The region in which this meeting should be created." },
                ),
              ),
              record_on_start: Type.Optional(
                Type.Boolean({
                  description:
                    "Specifies if the meeting should start getting recorded as soon as someone joins the meeting.",
                }),
              ),
              session_keep_alive_time_in_secs: Type.Optional(
                Type.Number({
                  description:
                    "Time in seconds, for which a session remains active, after the last participant has left the meeting.",
                  default: 60,
                  minimum: 60,
                  maximum: 600,
                }),
              ),
              status: Type.Optional(
                Type.Union([Type.Literal("ACTIVE"), Type.Literal("INACTIVE")], {
                  description:
                    "Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.",
                }),
              ),
              summarize_on_end: Type.Optional(
                Type.Boolean({
                  description:
                    "Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.",
                }),
              ),
              title: Type.Optional(Type.String({ description: "Title of the meeting." })),
              updated_at: Type.String({
                description: "Timestamp the object was updated at. The time is returned in ISO format.",
                format: "date-time",
                readOnly: true,
              }),
              recording_config: Type.Optional(RealtimekitRecordingconfig),
              ai_config: Type.Optional(RealtimekitAiconfig),
            },
            { description: "Data returned by the operation" },
          ),
        ),
        success: Type.Boolean({ description: "Success status of the operation", default: true }),
      }),
    })
      .summary("Create a meeting")
      .description("Create a meeting for the given organization ID.")
      .operationId("create_meeting")
      .tag("Meetings")
      .security({ api_token: [] })

    g.get("/meetings/{meeting_id}", {
      params: Type.Object({ meeting_id: Type.String({ format: "uuid" }) }),
      query: Type.Object({
        name: Type.Optional(Type.String()),
      }),
      responses: {
        200: Type.Object({
          data: Type.Optional(
            Type.Object(
              {
                created_at: Type.String({
                  description: "Timestamp the object was created at. The time is returned in ISO format.",
                  format: "date-time",
                  readOnly: true,
                }),
                id: Type.String({ description: "ID of the meeting.", format: "uuid", readOnly: true }),
                live_stream_on_start: Type.Optional(
                  Type.Boolean({ description: "Specifies if the meeting should start getting livestreamed on start." }),
                ),
                persist_chat: Type.Optional(
                  Type.Boolean({ description: "Specifies if Chat within a meeting should persist for a week." }),
                ),
                preferred_region: Type.Optional(
                  Type.Union(
                    [
                      Type.Literal("ap-south-1"),
                      Type.Literal("ap-southeast-1"),
                      Type.Literal("us-east-1"),
                      Type.Literal("eu-central-1"),
                      Type.Null(),
                    ],
                    { description: "The region in which this meeting should be created." },
                  ),
                ),
                record_on_start: Type.Optional(
                  Type.Boolean({
                    description:
                      "Specifies if the meeting should start getting recorded as soon as someone joins the meeting.",
                  }),
                ),
                session_keep_alive_time_in_secs: Type.Optional(
                  Type.Number({
                    description:
                      "Time in seconds, for which a session remains active, after the last participant has left the meeting.",
                    default: 60,
                    minimum: 60,
                    maximum: 600,
                  }),
                ),
                status: Type.Optional(
                  Type.Union([Type.Literal("ACTIVE"), Type.Literal("INACTIVE")], {
                    description:
                      "Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.",
                  }),
                ),
                summarize_on_end: Type.Optional(
                  Type.Boolean({
                    description:
                      "Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.",
                  }),
                ),
                title: Type.Optional(Type.String({ description: "Title of the meeting." })),
                updated_at: Type.String({
                  description: "Timestamp the object was updated at. The time is returned in ISO format.",
                  format: "date-time",
                  readOnly: true,
                }),
                recording_config: Type.Optional(RealtimekitRecordingconfig),
                ai_config: Type.Optional(RealtimekitAiconfig),
              },
              { description: "Data returned by the operation" },
            ),
          ),
          success: Type.Boolean({ description: "Success status of the operation", default: true }),
        }),
        500: RealtimekitGenericerrorresponse,
      },
    })
      .summary("Fetch a meeting for an organization")
      .description("Returns a meeting details in an organization for the given meeting ID.")
      .operationId("get_meeting")
      .tag("Meetings")
      .security({ api_token: [] })

    g.put("/meetings/{meeting_id}", {
      params: Type.Object({ meeting_id: Type.String({ format: "uuid" }) }),
      body: Type.Object({
        ai_config: Type.Optional(RealtimekitAiconfig),
        live_stream_on_start: Type.Optional(
          Type.Union([
            Type.Boolean({
              description: "Specifies if the meeting should start getting livestreamed on start.",
              default: false,
            }),
            Type.Null(),
          ]),
        ),
        persist_chat: Type.Optional(
          Type.Boolean({
            description:
              "If a meeting is set to persist_chat, meeting chat would remain for a week within the meeting space.",
            default: false,
          }),
        ),
        preferred_region: Type.Optional(
          Type.Union(
            [
              Type.Literal("ap-south-1"),
              Type.Literal("ap-southeast-1"),
              Type.Literal("us-east-1"),
              Type.Literal("eu-central-1"),
              Type.Null(),
            ],
            { description: "The region in which this meeting should be created." },
          ),
        ),
        record_on_start: Type.Optional(
          Type.Union([
            Type.Boolean({
              description:
                "Specifies if the meeting should start getting recorded as soon as someone joins the meeting.",
              default: false,
            }),
            Type.Null(),
          ]),
        ),
        recording_config: Type.Optional(RealtimekitRecordingconfig),
        session_keep_alive_time_in_secs: Type.Optional(
          Type.Number({
            description:
              "Time in seconds, for which a session remains active, after the last participant has left the meeting.",
            default: 60,
            minimum: 60,
            maximum: 600,
          }),
        ),
        summarize_on_end: Type.Optional(
          Type.Boolean({
            description:
              "Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.",
            default: false,
          }),
        ),
        title: Type.Optional(Type.Union([Type.String({ description: "Title of the meeting" }), Type.Null()])),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object(
            {
              created_at: Type.String({
                description: "Timestamp the object was created at. The time is returned in ISO format.",
                format: "date-time",
                readOnly: true,
              }),
              id: Type.String({ description: "ID of the meeting.", format: "uuid", readOnly: true }),
              live_stream_on_start: Type.Optional(
                Type.Boolean({ description: "Specifies if the meeting should start getting livestreamed on start." }),
              ),
              persist_chat: Type.Optional(
                Type.Boolean({ description: "Specifies if Chat within a meeting should persist for a week." }),
              ),
              preferred_region: Type.Optional(
                Type.Union(
                  [
                    Type.Literal("ap-south-1"),
                    Type.Literal("ap-southeast-1"),
                    Type.Literal("us-east-1"),
                    Type.Literal("eu-central-1"),
                    Type.Null(),
                  ],
                  { description: "The region in which this meeting should be created." },
                ),
              ),
              record_on_start: Type.Optional(
                Type.Boolean({
                  description:
                    "Specifies if the meeting should start getting recorded as soon as someone joins the meeting.",
                }),
              ),
              session_keep_alive_time_in_secs: Type.Optional(
                Type.Number({
                  description:
                    "Time in seconds, for which a session remains active, after the last participant has left the meeting.",
                  default: 60,
                  minimum: 60,
                  maximum: 600,
                }),
              ),
              status: Type.Optional(
                Type.Union([Type.Literal("ACTIVE"), Type.Literal("INACTIVE")], {
                  description:
                    "Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.",
                }),
              ),
              summarize_on_end: Type.Optional(
                Type.Boolean({
                  description:
                    "Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.",
                }),
              ),
              title: Type.Optional(Type.String({ description: "Title of the meeting." })),
              updated_at: Type.String({
                description: "Timestamp the object was updated at. The time is returned in ISO format.",
                format: "date-time",
                readOnly: true,
              }),
              recording_config: Type.Optional(RealtimekitRecordingconfig),
              ai_config: Type.Optional(RealtimekitAiconfig),
            },
            { description: "Data returned by the operation" },
          ),
        ),
        success: Type.Boolean({ description: "Success status of the operation", default: true }),
      }),
    })
      .summary("Replace a meeting")
      .description("Replaces all the details for the given meeting ID.")
      .operationId("replace_meeting")
      .tag("Meetings")
      .security({ api_token: [] })

    g.patch("/meetings/{meeting_id}", {
      params: Type.Object({ meeting_id: Type.String({ format: "uuid" }) }),
      body: Type.Object({
        ai_config: Type.Optional(RealtimekitAiconfig),
        live_stream_on_start: Type.Optional(
          Type.Boolean({
            description: "Specifies if the meeting should start getting livestreamed on start.",
            default: false,
          }),
        ),
        persist_chat: Type.Optional(
          Type.Boolean({
            description:
              "If a meeting is updated to persist_chat, meeting chat would remain for a week within the meeting space.",
            default: false,
          }),
        ),
        preferred_region: Type.Optional(
          Type.Union(
            [
              Type.Literal("ap-south-1"),
              Type.Literal("ap-southeast-1"),
              Type.Literal("us-east-1"),
              Type.Literal("eu-central-1"),
            ],
            { description: "The region in which this meeting should be created." },
          ),
        ),
        record_on_start: Type.Optional(
          Type.Boolean({
            description: "Specifies if the meeting should start getting recorded as soon as someone joins the meeting.",
            default: false,
          }),
        ),
        session_keep_alive_time_in_secs: Type.Optional(
          Type.Number({
            description:
              "Time in seconds, for which a session remains active, after the last participant has left the meeting.",
            default: 60,
            minimum: 60,
            maximum: 600,
          }),
        ),
        status: Type.Optional(
          Type.Union([Type.Literal("ACTIVE"), Type.Literal("INACTIVE")], {
            description:
              "Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.",
          }),
        ),
        summarize_on_end: Type.Optional(
          Type.Boolean({
            description:
              "Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.",
            default: false,
          }),
        ),
        title: Type.Optional(Type.String({ description: "Title of the meeting" })),
      }),
      responses: {
        200: Type.Object({
          data: Type.Optional(
            Type.Object(
              {
                created_at: Type.String({
                  description: "Timestamp the object was created at. The time is returned in ISO format.",
                  format: "date-time",
                  readOnly: true,
                }),
                id: Type.String({ description: "ID of the meeting.", format: "uuid", readOnly: true }),
                live_stream_on_start: Type.Optional(
                  Type.Boolean({ description: "Specifies if the meeting should start getting livestreamed on start." }),
                ),
                persist_chat: Type.Optional(
                  Type.Boolean({ description: "Specifies if Chat within a meeting should persist for a week." }),
                ),
                preferred_region: Type.Optional(
                  Type.Union(
                    [
                      Type.Literal("ap-south-1"),
                      Type.Literal("ap-southeast-1"),
                      Type.Literal("us-east-1"),
                      Type.Literal("eu-central-1"),
                      Type.Null(),
                    ],
                    { description: "The region in which this meeting should be created." },
                  ),
                ),
                record_on_start: Type.Optional(
                  Type.Boolean({
                    description:
                      "Specifies if the meeting should start getting recorded as soon as someone joins the meeting.",
                  }),
                ),
                session_keep_alive_time_in_secs: Type.Optional(
                  Type.Number({
                    description:
                      "Time in seconds, for which a session remains active, after the last participant has left the meeting.",
                    default: 60,
                    minimum: 60,
                    maximum: 600,
                  }),
                ),
                status: Type.Optional(
                  Type.Union([Type.Literal("ACTIVE"), Type.Literal("INACTIVE")], {
                    description:
                      "Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.",
                  }),
                ),
                summarize_on_end: Type.Optional(
                  Type.Boolean({
                    description:
                      "Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.",
                  }),
                ),
                title: Type.Optional(Type.String({ description: "Title of the meeting." })),
                updated_at: Type.String({
                  description: "Timestamp the object was updated at. The time is returned in ISO format.",
                  format: "date-time",
                  readOnly: true,
                }),
                recording_config: Type.Optional(RealtimekitRecordingconfig),
                ai_config: Type.Optional(RealtimekitAiconfig),
              },
              { description: "Data returned by the operation" },
            ),
          ),
          success: Type.Boolean({ description: "Success status of the operation", default: true }),
        }),
        500: RealtimekitGenericerrorresponse,
      },
    })
      .summary("Update a meeting")
      .description("Updates a meeting in an organization for the given meeting ID.")
      .operationId("update_meeting")
      .tag("Meetings")
      .security({ api_token: [] })

    g.get("/meetings/{meeting_id}/active-livestream", {
      params: Type.Object({ meeting_id: Type.String({ format: "uuid" }) }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            created_at: Type.Optional(
              Type.String({
                description: "Timestamp the object was created at. The time is returned in ISO format.",
                format: "date-time",
                readOnly: true,
              }),
            ),
            disabled: Type.Optional(Type.String({ description: "Specifies if the livestream was disabled." })),
            id: Type.Optional(Type.String({ description: "The livestream ID." })),
            ingest_server: Type.Optional(
              Type.String({ description: "The server URL to which the RTMP encoder sends the video and audio data." }),
            ),
            meeting_id: Type.Optional(Type.String()),
            name: Type.Optional(Type.Union([Type.String({ description: "Name of the livestream." }), Type.Null()])),
            playback_url: Type.Optional(
              Type.String({ description: "The web address that viewers can use to watch the livestream." }),
            ),
            status: Type.Optional(
              Type.Union([
                Type.Literal("LIVE"),
                Type.Literal("IDLE"),
                Type.Literal("ERRORED"),
                Type.Literal("INVOKED"),
              ]),
            ),
            stream_key: Type.Optional(Type.String({ description: "Unique key for accessing each livestream." })),
            updated_at: Type.Optional(
              Type.String({
                description: "Timestamp the object was updated at. The time is returned in ISO format.",
                format: "date-time",
                readOnly: true,
              }),
            ),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch active livestreams for a meeting")
      .description("Returns details of all active livestreams for the given meeting ID.")
      .operationId("get-v2-meetings-meetingId-active-livestream")
      .tag("Live streams")
      .security({ api_token: [] })

    g.post("/meetings/{meeting_id}/active-livestream/stop", {
      params: Type.Object({ meeting_id: Type.String({ format: "uuid" }) }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            message: Type.Optional(Type.String()),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Stop livestreaming a meeting")
      .description(
        "Stops the active livestream of a meeting associated with the given meeting ID. Retreive the meeting ID using the `Create a meeting` API.",
      )
      .operationId("stop_livestreaming")
      .tag("Live streams")
      .security({ api_token: [] })

    g.get("/meetings/{meeting_id}/active-session", {
      params: Type.Object({ meeting_id: Type.String() }),
      responses: {
        200: Type.Object({
          data: Type.Optional(RealtimekitActivesession),
          success: Type.Optional(Type.Boolean()),
        }),
        404: RealtimekitGenericerrorresponse,
      },
    })
      .summary("Fetch details of an active session")
      .description("Returns details of an ongoing active session for the given meeting ID.")
      .operationId("GetActiveSession")
      .tag("Active session")
      .security({ api_token: [] })

    g.post("/meetings/{meeting_id}/active-session/kick", {
      params: Type.Object({ meeting_id: Type.String() }),
      body: Type.Object({
        custom_participant_ids: Type.Optional(Type.Array(Type.String())),
        participant_ids: Type.Optional(Type.Array(Type.String())),
      }),
      responses: {
        200: Type.Object({
          data: Type.Optional(
            Type.Object({
              action: Type.Optional(Type.String()),
              participants: Type.Optional(Type.Array(RealtimekitSessionparticipant)),
            }),
          ),
          success: Type.Optional(Type.Boolean()),
        }),
        404: RealtimekitGenericerrorresponse,
      },
    })
      .summary("Kick participants from an active session")
      .description("Kicks one or more participants from an active session using user ID or custom participant ID.")
      .operationId("KickPartcipants")
      .tag("Active session")
      .security({ api_token: [] })

    g.post("/meetings/{meeting_id}/active-session/kick-all", {
      params: Type.Object({ meeting_id: Type.String() }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            action: Type.Optional(Type.String()),
            kicked_participants_count: Type.Optional(Type.Number()),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Kick all participants")
      .description("Kicks all participants from an active session for the given meeting ID.")
      .operationId("KickAllParticipants")
      .tag("Active session")
      .security({ api_token: [] })

    g.post("/meetings/{meeting_id}/active-session/mute", {
      params: Type.Object({ meeting_id: Type.String() }),
      body: Type.Object({
        custom_participant_ids: Type.Optional(Type.Array(Type.String())),
        participant_ids: Type.Optional(Type.Array(Type.String())),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            action: Type.Optional(Type.String()),
            participants: Type.Optional(Type.Array(RealtimekitSessionparticipant)),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Mute participants of an active session")
      .description("Mutes one or more participants from an active session using user ID or custom participant ID.")
      .operationId("MuteParticipants")
      .tag("Active session")
      .security({ api_token: [] })

    g.post("/meetings/{meeting_id}/active-session/mute-all", {
      params: Type.Object({ meeting_id: Type.String() }),
      body: Type.Object({
        allow_unmute: Type.Optional(
          Type.Boolean({
            description: "if false, participants won't be able to unmute themselves after they are muted",
          }),
        ),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            action: Type.Optional(Type.String()),
            muted_participants_count: Type.Optional(Type.Number()),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Mute all participants")
      .description("Mutes all participants of an active session for the given meeting ID.")
      .operationId("MuteAllParticipants")
      .tag("Active session")
      .security({ api_token: [] })

    g.post("/meetings/{meeting_id}/active-session/poll", {
      params: Type.Object({ meeting_id: Type.String() }),
      body: Type.Object({
        anonymous: Type.Optional(Type.Boolean({ description: "if voters on a poll are anonymous" })),
        hide_votes: Type.Optional(
          Type.Boolean({ description: "if votes on an option are visible before a person votes" }),
        ),
        options: Type.Optional(Type.Array(Type.String(), { description: "Different options for the question" })),
        question: Type.Optional(Type.String({ description: "Question of the poll" })),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            action: Type.Optional(Type.String()),
            poll: Type.Optional(RealtimekitPoll),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Create a poll")
      .description("Creates a new poll in an active session for the given meeting ID.")
      .operationId("CreatePoll")
      .tag("Active session")
      .security({ api_token: [] })

    g.get("/meetings/{meeting_id}/livestream", {
      params: Type.Object({ meeting_id: Type.String({ format: "uuid" }) }),
      query: Type.Object({
        page_no: Type.Optional(Type.Integer()),
        per_page: Type.Optional(Type.Integer()),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            livestreams: Type.Optional(
              Type.Array(
                Type.Object({
                  created_at: Type.Optional(
                    Type.String({
                      description:
                        "The timestamp at which the livestream was created. The time is returned in ISO format.",
                      format: "date-time",
                      readOnly: true,
                    }),
                  ),
                  disabled: Type.Optional(Type.Boolean({ description: "Specifies if the livestream was disabled." })),
                  id: Type.Optional(Type.String({ description: "The livestream ID." })),
                  ingest_server: Type.Optional(
                    Type.String({
                      description: "The server URL to which the RTMP encoder sends the video and audio data.",
                    }),
                  ),
                  meeting_id: Type.Optional(
                    Type.String({ description: "The ID of the meeting that was livestreamed." }),
                  ),
                  name: Type.Optional(
                    Type.Union([Type.String({ description: "Name of the livestream." }), Type.Null()]),
                  ),
                  playback_url: Type.Optional(
                    Type.String({ description: "The web address that viewers can use to watch the livestream." }),
                  ),
                  status: Type.Optional(
                    Type.Union([
                      Type.Literal("LIVE"),
                      Type.Literal("INVOKED"),
                      Type.Literal("ERRORED"),
                      Type.Literal("IDLE"),
                    ]),
                  ),
                  stream_key: Type.Optional(Type.String({ description: "Unique key for accessing each livestream." })),
                  updated_at: Type.Optional(
                    Type.String({
                      description:
                        "The timestamp at which the livestream was updated. The time is returned in ISO format.",
                      format: "date-time",
                      readOnly: true,
                    }),
                  ),
                }),
              ),
            ),
            paging: Type.Optional(
              Type.Object({
                end_offset: Type.Optional(Type.Integer()),
                start_offset: Type.Optional(Type.Integer()),
                total_count: Type.Optional(Type.Integer()),
              }),
            ),
            sessions: Type.Optional(
              Type.Object({
                created_at: Type.Optional(
                  Type.String({
                    description:
                      "The timestamp at which the livestream was created. The time is returned in ISO format.",
                    format: "date-time",
                    readOnly: true,
                  }),
                ),
                err_message: Type.Optional(Type.String()),
                id: Type.Optional(Type.String({ description: "The ID of the livestream session." })),
                ingest_seconds: Type.Optional(
                  Type.String({
                    description: "The time duration for which the input was given or the meeting was streamed.",
                  }),
                ),
                invoked_time: Type.Optional(
                  Type.String({ description: "The time at which the livestream was invoked.", format: "date-time" }),
                ),
                livestream_id: Type.Optional(Type.String({ description: "The ID of the livestream." })),
                started_time: Type.Optional(
                  Type.String({ description: "The time at which the livestream was started.", format: "date-time" }),
                ),
                stopped_time: Type.Optional(
                  Type.String({ description: "The time at which the livestream was stopped.", format: "date-time" }),
                ),
                updated_at: Type.Optional(
                  Type.String({
                    description:
                      "The timestamp at which the livestream was updated. The time is returned in ISO format.",
                    format: "date-time",
                    readOnly: true,
                  }),
                ),
              }),
            ),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch livestream session details for a meeting")
      .description(
        "Returns livestream session details for the given meeting ID. Retreive the meeting ID using the `Create a meeting` API.",
      )
      .operationId("livestream-session-details")
      .tag("Live streams")
      .security({ api_token: [] })

    g.post("/meetings/{meeting_id}/livestreams", {
      params: Type.Object({ meeting_id: Type.String({ format: "uuid" }) }),
      body: Type.Object({
        name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        video_config: Type.Optional(
          Type.Object({
            height: Type.Optional(Type.Integer({ description: "Height of the livestreaming video in pixels" })),
            width: Type.Optional(Type.Integer({ description: "Width of the livestreaming video in pixels" })),
          }),
        ),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            id: Type.Optional(Type.String({ description: "The livestream ID." })),
            ingest_server: Type.Optional(
              Type.String({ description: "The server URL to which the RTMP encoder sends the video and audio data." }),
            ),
            playback_url: Type.Optional(
              Type.String({ description: "The web address that viewers can use to watch the livestream." }),
            ),
            status: Type.Optional(
              Type.Union([
                Type.Literal("LIVE"),
                Type.Literal("IDLE"),
                Type.Literal("ERRORED"),
                Type.Literal("INVOKED"),
              ]),
            ),
            stream_key: Type.Optional(Type.String({ description: "Unique key for accessing each livestream." })),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Start livestreaming a meeting")
      .description(
        "Starts livestream of a meeting associated with the given meeting ID. Retreive the meeting ID using the `Create a meeting` API.",
      )
      .operationId("start-livestreaming")
      .tag("Live streams")
      .security({ api_token: [] })

    g.get("/meetings/{meeting_id}/participants", {
      params: Type.Object({ meeting_id: Type.String({ format: "uuid" }) }),
      query: Type.Object({
        page_no: Type.Optional(Type.Number({ minimum: 0 })),
        per_page: Type.Optional(Type.Number({ minimum: 0 })),
      }),
      responses: {
        200: Type.Object({
          data: Type.Array(RealtimekitParticipant),
          paging: Type.Object({
            end_offset: Type.Number(),
            start_offset: Type.Number(),
            total_count: Type.Number({ minimum: 0 }),
          }),
          success: Type.Boolean(),
        }),
        500: RealtimekitGenericerrorresponse,
      },
    })
      .summary("Fetch all participants of a meeting")
      .description("Returns all participants detail for the given meeting ID.")
      .operationId("get_meeting_participants")
      .tag("Meetings")
      .security({ api_token: [] })

    g.post("/meetings/{meeting_id}/participants", {
      params: Type.Object({ meeting_id: Type.String({ format: "uuid" }) }),
      body: Type.Object({
        custom_participant_id: Type.String({
          description:
            "A unique participant ID. You must specify a unique ID for the participant, for example, UUID, email address, and so on. ",
        }),
        name: Type.Optional(
          Type.Union([Type.String({ description: "(Optional) Name of the participant. " }), Type.Null()]),
        ),
        picture: Type.Optional(
          Type.Union([
            Type.String({
              description: "(Optional) A URL to a picture to be used for the participant. ",
              format: "uri",
            }),
            Type.Null(),
          ]),
        ),
        preset_name: Type.String({
          description: "Name of the preset to apply to this participant.",
          default: "group_call_host",
        }),
      }),
      responses: {
        201: Type.Object({
          data: Type.Optional(
            Type.Object(
              {
                created_at: Type.String({
                  description: "When this object was created. The time is returned in ISO format.",
                  format: "date-time",
                  readOnly: true,
                }),
                custom_participant_id: Type.String({ description: "A unique participant ID generated by the client." }),
                id: Type.String({ description: "ID of the participant.", format: "uuid" }),
                name: Type.Optional(
                  Type.Union([Type.String({ description: "Name of the participant." }), Type.Null()]),
                ),
                picture: Type.Optional(
                  Type.Union([
                    Type.String({ description: "URL to a picture of the participant.", format: "uri" }),
                    Type.Null(),
                  ]),
                ),
                preset_name: Type.String({ description: "Preset applied to the participant." }),
                updated_at: Type.String({
                  description: "When this object was updated. The time is returned in ISO format.",
                  format: "date-time",
                  readOnly: true,
                }),
                token: Type.String({
                  description:
                    "The participant's auth token that can be used for joining a meeting from the client side.",
                }),
              },
              { description: "Represents a participant." },
            ),
          ),
          success: Type.Boolean({ description: "Success status of the operation", default: true }),
        }),
        500: RealtimekitGenericerrorresponse,
      },
    })
      .summary("Add a participant")
      .description("Adds a participant to the given meeting ID.")
      .operationId("add_participant")
      .tag("Meetings")
      .security({ api_token: [] })

    g.get("/meetings/{meeting_id}/participants/{participant_id}", {
      params: Type.Object({ meeting_id: Type.String({ format: "uuid" }), participant_id: Type.String() }),
      responses: {
        200: Type.Object({
          data: RealtimekitParticipant,
          success: Type.Boolean({ description: "Success status of the operation", default: true }),
        }),
        500: RealtimekitGenericerrorresponse,
      },
    })
      .summary("Fetch a participant's detail")
      .description("Returns a participant details for the given meeting and participant ID.")
      .operationId("get_meeting_participant")
      .tag("Meetings")
      .security({ api_token: [] })

    g.patch("/meetings/{meeting_id}/participants/{participant_id}", {
      params: Type.Object({ meeting_id: Type.String({ format: "uuid" }), participant_id: Type.String() }),
      body: Type.Object({
        name: Type.Optional(
          Type.Union([Type.String({ description: "(Optional) Name of the participant." }), Type.Null()]),
        ),
        picture: Type.Optional(
          Type.Union([
            Type.String({
              description: "(Optional) A URL to a picture to be used for the participant.",
              format: "uri",
            }),
            Type.Null(),
          ]),
        ),
        preset_name: Type.Optional(
          Type.Union([
            Type.String({ description: "(Optional) Name of the preset to apply to this participant." }),
            Type.Null(),
          ]),
        ),
      }),
      responses: {
        200: Type.Object({
          data: Type.Optional(
            Type.Object(
              {
                created_at: Type.String({
                  description: "When this object was created. The time is returned in ISO format.",
                  format: "date-time",
                  readOnly: true,
                }),
                custom_participant_id: Type.String({ description: "A unique participant ID generated by the client." }),
                id: Type.String({ description: "ID of the participant.", format: "uuid" }),
                name: Type.Optional(
                  Type.Union([Type.String({ description: "Name of the participant." }), Type.Null()]),
                ),
                picture: Type.Optional(
                  Type.Union([
                    Type.String({ description: "URL to a picture of the participant.", format: "uri" }),
                    Type.Null(),
                  ]),
                ),
                preset_name: Type.String({ description: "Preset applied to the participant." }),
                updated_at: Type.String({
                  description: "When this object was updated. The time is returned in ISO format.",
                  format: "date-time",
                  readOnly: true,
                }),
                token: Type.String({
                  description:
                    "The participant's auth token that can be used for joining a meeting from the client side.",
                }),
              },
              { description: "Represents a participant." },
            ),
          ),
          success: Type.Boolean({ description: "Success status of the operation", default: true }),
        }),
        500: RealtimekitGenericerrorresponse,
      },
    })
      .summary("Edit a participant's detail")
      .description("Updates a participant's details for the given meeting and participant ID.")
      .operationId("edit_participant")
      .tag("Meetings")
      .security({ api_token: [] })

    g.delete("/meetings/{meeting_id}/participants/{participant_id}", {
      params: Type.Object({ meeting_id: Type.String({ format: "uuid" }), participant_id: Type.String() }),
      responses: {
        200: Type.Object({
          data: Type.Optional(
            Type.Object(
              {
                created_at: Type.String({
                  description: "Timestamp this object was created at. The time is returned in ISO format.",
                  format: "date-time",
                  readOnly: true,
                }),
                custom_participant_id: Type.String({ description: "A unique participant ID generated by the client." }),
                preset_id: Type.String({
                  description: "ID of the preset applied to this participant.",
                  format: "uuid",
                }),
                updated_at: Type.String({
                  description: "Timestamp this object was updated at. The time is returned in ISO format.",
                  format: "date-time",
                  readOnly: true,
                }),
              },
              { description: "Data returned by the operation" },
            ),
          ),
          success: Type.Boolean({ description: "Success status of the operation", default: true }),
        }),
        500: RealtimekitGenericerrorresponse,
      },
    })
      .summary("Delete a participant")
      .description("Deletes a participant for the given meeting and participant ID.")
      .operationId("delete_meeting_participant")
      .tag("Meetings")
      .security({ api_token: [] })

    g.post("/meetings/{meeting_id}/participants/{participant_id}/token", {
      params: Type.Object({ meeting_id: Type.String({ format: "uuid" }), participant_id: Type.String() }),
      responses: {
        200: Type.Object({
          data: Type.Object(
            {
              token: Type.String({ description: "Regenerated participant's authentication token." }),
            },
            { description: "Data returned by the operation" },
          ),
          success: Type.Boolean({ description: "Success status of the operation", default: true }),
        }),
        500: RealtimekitGenericerrorresponse,
      },
    })
      .summary("Refresh participant's authentication token")
      .description("Regenerates participant's authentication token for the given meeting and participant ID.")
      .operationId("regenerate_token")
      .tag("Meetings")
      .security({ api_token: [] })

    g.get("/orgs", {
      query: Type.Object({
        per_page: Type.Optional(Type.Integer({ minimum: 1 })),
        page_no: Type.Optional(Type.Integer({ minimum: 1 })),
      }),
      responses: {
        200: RealtimekitOrganizationlistsuccessresponse,
        400: RealtimekitErrorresponse,
        401: RealtimekitErrorresponse,
      },
    })
      .summary("Fetch organization details of all users")
      .description("Returns organization details of all the users.")
      .operationId("getAllOrgs")
      .tag("Organizations")
      .security({ api_token: [] })

    g.post("/orgs", {
      body: RealtimekitOrganizationrequest,
      responses: {
        201: RealtimekitOrganizationsuccessresponse,
        400: RealtimekitErrorresponse,
        401: RealtimekitErrorresponse,
        409: RealtimekitErrorresponse,
      },
    })
      .summary("Create an organization")
      .description("Creates an organization. The authenticated user becomes the owner of the organization.")
      .operationId("createOrg")
      .tag("Organizations")
      .security({ api_token: [] })

    g.get("/orgs/{org_id}", {
      params: Type.Object({ org_id: Type.String() }),
      responses: {
        200: RealtimekitOrganizationsuccessresponse,
        400: RealtimekitErrorresponse,
        401: RealtimekitErrorresponse,
      },
    })
      .summary("Fetch details of an organization")
      .description(
        "Returns organization details for the given organization ID. The user must be the organization's owner.",
      )
      .operationId("getOrg")
      .tag("Organizations")
      .security({ api_token: [] })

    g.patch("/orgs/{org_id}", {
      params: Type.Object({ org_id: Type.String() }),
      body: RealtimekitPatchorganizationrequest,
      responses: {
        200: RealtimekitOrganizationsuccessresponse,
        400: RealtimekitErrorresponse,
        401: RealtimekitErrorresponse,
      },
    })
      .summary("Edit details of an organization")
      .description(
        "Edits organization details for the given organization ID. The user must be the organization's owner.",
      )
      .operationId("editOrg")
      .tag("Organizations")
      .security({ api_token: [] })

    g.get("/presets", {
      query: Type.Object({
        per_page: Type.Optional(Type.Number({ minimum: 0 })),
        page_no: Type.Optional(Type.Number({ minimum: 0 })),
      }),
      response: Type.Object({
        data: Type.Array(RealtimekitPresetlistitem),
        paging: Type.Object({
          end_offset: Type.Number(),
          start_offset: Type.Number(),
          total_count: Type.Number({ minimum: 0 }),
        }),
        success: Type.Boolean(),
      }),
    })
      .summary("Fetch all presets")
      .description("Fetches all the presets belonging to an organization.")
      .operationId("get-presets")
      .tag("Presets")
      .security({ api_token: [] })

    g.post("/presets", {
      body: RealtimekitPreset,
      response: Type.Object({
        data: Type.Object(
          {
            id: Type.String({ description: "ID of the preset", format: "uuid" }),
            config: Type.Object({
              max_screenshare_count: Type.Integer({
                description: "Maximum number of screen shares that can be active at a given time",
              }),
              max_video_streams: Type.Object(
                {
                  desktop: Type.Integer({ description: "Maximum number of video streams visible on desktop devices" }),
                  mobile: Type.Integer({ description: "Maximum number of streams visible on mobile devices" }),
                },
                { description: "Maximum number of streams that are visible on a device" },
              ),
              media: Type.Object(
                {
                  audio: Type.Optional(
                    Type.Object(
                      {
                        enable_high_bitrate: Type.Optional(
                          Type.Boolean({ description: "Enable High Quality Audio for your meetings", default: false }),
                        ),
                        enable_stereo: Type.Optional(
                          Type.Boolean({ description: "Enable Stereo for your meetings", default: false }),
                        ),
                      },
                      { description: "Control options for Audio quality." },
                    ),
                  ),
                  screenshare: Type.Object(
                    {
                      frame_rate: Type.Integer({ description: "Frame rate of screen share" }),
                      quality: Type.Union([Type.Literal("hd"), Type.Literal("vga"), Type.Literal("qvga")], {
                        description: "Quality of screen share ",
                      }),
                    },
                    { description: "Configuration options for participant screen shares" },
                  ),
                  video: Type.Object(
                    {
                      frame_rate: Type.Integer({ description: "Frame rate of participants' video", maximum: 30 }),
                      quality: Type.Union([Type.Literal("hd"), Type.Literal("vga"), Type.Literal("qvga")], {
                        description: "Video quality of participants",
                      }),
                    },
                    { description: "Configuration options for participant videos" },
                  ),
                },
                { description: "Media configuration options. eg: Video quality" },
              ),
              view_type: Type.Union([Type.Literal("GROUP_CALL"), Type.Literal("WEBINAR"), Type.Literal("AUDIO_ROOM")], {
                description: "Type of the meeting",
              }),
            }),
            name: Type.String({ description: "Name of the preset" }),
            permissions: Type.Optional(
              Type.Object({
                accept_waiting_requests: Type.Boolean({
                  description: "Whether this participant can accept waiting requests",
                }),
                can_accept_production_requests: Type.Boolean(),
                can_change_participant_permissions: Type.Boolean(),
                can_edit_display_name: Type.Boolean(),
                can_livestream: Type.Boolean(),
                can_record: Type.Boolean(),
                can_spotlight: Type.Boolean(),
                chat: Type.Object(
                  {
                    private: Type.Object({
                      can_receive: Type.Boolean(),
                      can_send: Type.Boolean(),
                      files: Type.Boolean(),
                      text: Type.Boolean(),
                    }),
                    public: Type.Object({
                      can_send: Type.Boolean({ description: "Can send messages in general" }),
                      files: Type.Boolean({ description: "Can send file messages" }),
                      text: Type.Boolean({ description: "Can send text messages" }),
                    }),
                  },
                  { description: "Chat permissions" },
                ),
                connected_meetings: Type.Object({
                  can_alter_connected_meetings: Type.Boolean(),
                  can_switch_connected_meetings: Type.Boolean(),
                  can_switch_to_parent_meeting: Type.Boolean(),
                }),
                disable_participant_audio: Type.Boolean(),
                disable_participant_screensharing: Type.Boolean(),
                disable_participant_video: Type.Boolean(),
                hidden_participant: Type.Boolean({
                  description: "Whether this participant is visible to others or not",
                }),
                is_recorder: Type.Optional(Type.Boolean({ default: false })),
                kick_participant: Type.Boolean(),
                media: Type.Object(
                  {
                    audio: Type.Object(
                      {
                        can_produce: Type.Union(
                          [Type.Literal("ALLOWED"), Type.Literal("NOT_ALLOWED"), Type.Literal("CAN_REQUEST")],
                          { description: "Can produce audio" },
                        ),
                      },
                      { description: "Audio permissions" },
                    ),
                    screenshare: Type.Object(
                      {
                        can_produce: Type.Union(
                          [Type.Literal("ALLOWED"), Type.Literal("NOT_ALLOWED"), Type.Literal("CAN_REQUEST")],
                          { description: "Can produce screen share video" },
                        ),
                      },
                      { description: "Screenshare permissions" },
                    ),
                    video: Type.Object(
                      {
                        can_produce: Type.Union(
                          [Type.Literal("ALLOWED"), Type.Literal("NOT_ALLOWED"), Type.Literal("CAN_REQUEST")],
                          { description: "Can produce video" },
                        ),
                      },
                      { description: "Video permissions" },
                    ),
                  },
                  { description: "Media permissions" },
                ),
                pin_participant: Type.Boolean(),
                plugins: Type.Object(
                  {
                    can_close: Type.Boolean({ description: "Can close plugins that are already open" }),
                    can_edit_config: Type.Boolean({ description: "Can edit plugin config" }),
                    can_start: Type.Boolean({ description: "Can start plugins" }),
                    config: Type.Union([
                      Type.String({ format: "uuid" }),
                      Type.Object({
                        access_control: Type.Union([Type.Literal("FULL_ACCESS"), Type.Literal("VIEW_ONLY")]),
                        handles_view_only: Type.Boolean(),
                      }),
                    ]),
                  },
                  { description: "Plugin permissions" },
                ),
                polls: Type.Object(
                  {
                    can_create: Type.Boolean({ description: "Can create polls" }),
                    can_view: Type.Boolean({ description: "Can view polls" }),
                    can_vote: Type.Boolean({ description: "Can vote on polls" }),
                  },
                  { description: "Poll permissions" },
                ),
                recorder_type: Type.Union(
                  [Type.Literal("RECORDER"), Type.Literal("LIVESTREAMER"), Type.Literal("NONE")],
                  { description: "Type of the recording peer" },
                ),
                show_participant_list: Type.Boolean(),
                waiting_room_type: Type.Union(
                  [Type.Literal("SKIP"), Type.Literal("ON_PRIVILEGED_USER_ENTRY"), Type.Literal("SKIP_ON_ACCEPT")],
                  { description: "Waiting room type" },
                ),
              }),
            ),
            ui: Type.Object({
              config_diff: Type.Optional(Type.Unknown()),
              design_tokens: Type.Object({
                border_radius: Type.Union([Type.Literal("rounded")]),
                border_width: Type.Union([Type.Literal("thin")]),
                colors: Type.Object({
                  background: Type.Object({
                    "600": Type.String({ default: "#222222" }),
                    "700": Type.String({ default: "#1f1f1f" }),
                    "800": Type.String({ default: "#1b1b1b" }),
                    "900": Type.String({ default: "#181818" }),
                    "1000": Type.String({ default: "#141414" }),
                  }),
                  brand: Type.Object({
                    "300": Type.String({ default: "#844d1c" }),
                    "400": Type.String({ default: "#9d5b22" }),
                    "500": Type.String({ default: "#b56927" }),
                    "600": Type.String({ default: "#d37c30" }),
                    "700": Type.String({ default: "#d9904f" }),
                  }),
                  danger: Type.String({ default: "#FF2D2D" }),
                  success: Type.String({ default: "#62A504" }),
                  text: Type.String({ default: "#EEEEEE" }),
                  text_on_brand: Type.String({ default: "#EEEEEE" }),
                  video_bg: Type.String({ default: "#191919" }),
                  warning: Type.String({ default: "#FFCD07" }),
                }),
                logo: Type.String(),
                spacing_base: Type.Number({ default: 4 }),
                theme: Type.Union([Type.Literal("dark")]),
              }),
            }),
          },
          { description: "Data returned by the operation" },
        ),
        success: Type.Boolean({ description: "Success status of the operation", default: true }),
      }),
    })
      .summary("Create a preset")
      .description("Creates a preset belonging to the current organization")
      .operationId("post-presets")
      .tag("Presets")
      .security({ api_token: [] })

    g.get("/presets/{preset_id}", {
      params: Type.Object({ preset_id: Type.String() }),
      response: Type.Object({
        data: Type.Object(
          {
            id: Type.String({ description: "ID of the preset", format: "uuid" }),
            config: Type.Object({
              max_screenshare_count: Type.Integer({
                description: "Maximum number of screen shares that can be active at a given time",
              }),
              max_video_streams: Type.Object(
                {
                  desktop: Type.Integer({ description: "Maximum number of video streams visible on desktop devices" }),
                  mobile: Type.Integer({ description: "Maximum number of streams visible on mobile devices" }),
                },
                { description: "Maximum number of streams that are visible on a device" },
              ),
              media: Type.Object(
                {
                  audio: Type.Optional(
                    Type.Object(
                      {
                        enable_high_bitrate: Type.Optional(
                          Type.Boolean({ description: "Enable High Quality Audio for your meetings", default: false }),
                        ),
                        enable_stereo: Type.Optional(
                          Type.Boolean({ description: "Enable Stereo for your meetings", default: false }),
                        ),
                      },
                      { description: "Control options for Audio quality." },
                    ),
                  ),
                  screenshare: Type.Object(
                    {
                      frame_rate: Type.Integer({ description: "Frame rate of screen share" }),
                      quality: Type.Union([Type.Literal("hd"), Type.Literal("vga"), Type.Literal("qvga")], {
                        description: "Quality of screen share ",
                      }),
                    },
                    { description: "Configuration options for participant screen shares" },
                  ),
                  video: Type.Object(
                    {
                      frame_rate: Type.Integer({ description: "Frame rate of participants' video", maximum: 30 }),
                      quality: Type.Union([Type.Literal("hd"), Type.Literal("vga"), Type.Literal("qvga")], {
                        description: "Video quality of participants",
                      }),
                    },
                    { description: "Configuration options for participant videos" },
                  ),
                },
                { description: "Media configuration options. eg: Video quality" },
              ),
              view_type: Type.Union([Type.Literal("GROUP_CALL"), Type.Literal("WEBINAR"), Type.Literal("AUDIO_ROOM")], {
                description: "Type of the meeting",
              }),
            }),
            name: Type.String({ description: "Name of the preset" }),
            permissions: Type.Optional(
              Type.Object({
                accept_waiting_requests: Type.Boolean({
                  description: "Whether this participant can accept waiting requests",
                }),
                can_accept_production_requests: Type.Boolean(),
                can_change_participant_permissions: Type.Boolean(),
                can_edit_display_name: Type.Boolean(),
                can_livestream: Type.Boolean(),
                can_record: Type.Boolean(),
                can_spotlight: Type.Boolean(),
                chat: Type.Object(
                  {
                    private: Type.Object({
                      can_receive: Type.Boolean(),
                      can_send: Type.Boolean(),
                      files: Type.Boolean(),
                      text: Type.Boolean(),
                    }),
                    public: Type.Object({
                      can_send: Type.Boolean({ description: "Can send messages in general" }),
                      files: Type.Boolean({ description: "Can send file messages" }),
                      text: Type.Boolean({ description: "Can send text messages" }),
                    }),
                  },
                  { description: "Chat permissions" },
                ),
                connected_meetings: Type.Object({
                  can_alter_connected_meetings: Type.Boolean(),
                  can_switch_connected_meetings: Type.Boolean(),
                  can_switch_to_parent_meeting: Type.Boolean(),
                }),
                disable_participant_audio: Type.Boolean(),
                disable_participant_screensharing: Type.Boolean(),
                disable_participant_video: Type.Boolean(),
                hidden_participant: Type.Boolean({
                  description: "Whether this participant is visible to others or not",
                }),
                is_recorder: Type.Optional(Type.Boolean({ default: false })),
                kick_participant: Type.Boolean(),
                media: Type.Object(
                  {
                    audio: Type.Object(
                      {
                        can_produce: Type.Union(
                          [Type.Literal("ALLOWED"), Type.Literal("NOT_ALLOWED"), Type.Literal("CAN_REQUEST")],
                          { description: "Can produce audio" },
                        ),
                      },
                      { description: "Audio permissions" },
                    ),
                    screenshare: Type.Object(
                      {
                        can_produce: Type.Union(
                          [Type.Literal("ALLOWED"), Type.Literal("NOT_ALLOWED"), Type.Literal("CAN_REQUEST")],
                          { description: "Can produce screen share video" },
                        ),
                      },
                      { description: "Screenshare permissions" },
                    ),
                    video: Type.Object(
                      {
                        can_produce: Type.Union(
                          [Type.Literal("ALLOWED"), Type.Literal("NOT_ALLOWED"), Type.Literal("CAN_REQUEST")],
                          { description: "Can produce video" },
                        ),
                      },
                      { description: "Video permissions" },
                    ),
                  },
                  { description: "Media permissions" },
                ),
                pin_participant: Type.Boolean(),
                plugins: Type.Object(
                  {
                    can_close: Type.Boolean({ description: "Can close plugins that are already open" }),
                    can_edit_config: Type.Boolean({ description: "Can edit plugin config" }),
                    can_start: Type.Boolean({ description: "Can start plugins" }),
                    config: Type.Union([
                      Type.String({ format: "uuid" }),
                      Type.Object({
                        access_control: Type.Union([Type.Literal("FULL_ACCESS"), Type.Literal("VIEW_ONLY")]),
                        handles_view_only: Type.Boolean(),
                      }),
                    ]),
                  },
                  { description: "Plugin permissions" },
                ),
                polls: Type.Object(
                  {
                    can_create: Type.Boolean({ description: "Can create polls" }),
                    can_view: Type.Boolean({ description: "Can view polls" }),
                    can_vote: Type.Boolean({ description: "Can vote on polls" }),
                  },
                  { description: "Poll permissions" },
                ),
                recorder_type: Type.Union(
                  [Type.Literal("RECORDER"), Type.Literal("LIVESTREAMER"), Type.Literal("NONE")],
                  { description: "Type of the recording peer" },
                ),
                show_participant_list: Type.Boolean(),
                waiting_room_type: Type.Union(
                  [Type.Literal("SKIP"), Type.Literal("ON_PRIVILEGED_USER_ENTRY"), Type.Literal("SKIP_ON_ACCEPT")],
                  { description: "Waiting room type" },
                ),
              }),
            ),
            ui: Type.Object({
              config_diff: Type.Optional(Type.Unknown()),
              design_tokens: Type.Object({
                border_radius: Type.Union([Type.Literal("rounded")]),
                border_width: Type.Union([Type.Literal("thin")]),
                colors: Type.Object({
                  background: Type.Object({
                    "600": Type.String({ default: "#222222" }),
                    "700": Type.String({ default: "#1f1f1f" }),
                    "800": Type.String({ default: "#1b1b1b" }),
                    "900": Type.String({ default: "#181818" }),
                    "1000": Type.String({ default: "#141414" }),
                  }),
                  brand: Type.Object({
                    "300": Type.String({ default: "#844d1c" }),
                    "400": Type.String({ default: "#9d5b22" }),
                    "500": Type.String({ default: "#b56927" }),
                    "600": Type.String({ default: "#d37c30" }),
                    "700": Type.String({ default: "#d9904f" }),
                  }),
                  danger: Type.String({ default: "#FF2D2D" }),
                  success: Type.String({ default: "#62A504" }),
                  text: Type.String({ default: "#EEEEEE" }),
                  text_on_brand: Type.String({ default: "#EEEEEE" }),
                  video_bg: Type.String({ default: "#191919" }),
                  warning: Type.String({ default: "#FFCD07" }),
                }),
                logo: Type.String(),
                spacing_base: Type.Number({ default: 4 }),
                theme: Type.Union([Type.Literal("dark")]),
              }),
            }),
          },
          { description: "Data returned by the operation" },
        ),
        success: Type.Boolean({ description: "Success status of the operation", default: true }),
      }),
    })
      .summary("Fetch details of a preset")
      .description("Fetches details of a preset using the provided preset ID")
      .operationId("get-presets-preset_id")
      .tag("Presets")
      .security({ api_token: [] })

    g.patch("/presets/{preset_id}", {
      params: Type.Object({ preset_id: Type.String() }),
      body: RealtimekitUpdatepreset,
      response: Type.Object({
        data: Type.Object(
          {
            id: Type.String({ description: "ID of the preset", format: "uuid" }),
            config: Type.Object({
              max_screenshare_count: Type.Integer({
                description: "Maximum number of screen shares that can be active at a given time",
              }),
              max_video_streams: Type.Object(
                {
                  desktop: Type.Integer({ description: "Maximum number of video streams visible on desktop devices" }),
                  mobile: Type.Integer({ description: "Maximum number of streams visible on mobile devices" }),
                },
                { description: "Maximum number of streams that are visible on a device" },
              ),
              media: Type.Object(
                {
                  audio: Type.Optional(
                    Type.Object(
                      {
                        enable_high_bitrate: Type.Optional(
                          Type.Boolean({ description: "Enable High Quality Audio for your meetings", default: false }),
                        ),
                        enable_stereo: Type.Optional(
                          Type.Boolean({ description: "Enable Stereo for your meetings", default: false }),
                        ),
                      },
                      { description: "Control options for Audio quality." },
                    ),
                  ),
                  screenshare: Type.Object(
                    {
                      frame_rate: Type.Integer({ description: "Frame rate of screen share" }),
                      quality: Type.Union([Type.Literal("hd"), Type.Literal("vga"), Type.Literal("qvga")], {
                        description: "Quality of screen share ",
                      }),
                    },
                    { description: "Configuration options for participant screen shares" },
                  ),
                  video: Type.Object(
                    {
                      frame_rate: Type.Integer({ description: "Frame rate of participants' video", maximum: 30 }),
                      quality: Type.Union([Type.Literal("hd"), Type.Literal("vga"), Type.Literal("qvga")], {
                        description: "Video quality of participants",
                      }),
                    },
                    { description: "Configuration options for participant videos" },
                  ),
                },
                { description: "Media configuration options. eg: Video quality" },
              ),
              view_type: Type.Union([Type.Literal("GROUP_CALL"), Type.Literal("WEBINAR"), Type.Literal("AUDIO_ROOM")], {
                description: "Type of the meeting",
              }),
            }),
            name: Type.String({ description: "Name of the preset" }),
            permissions: Type.Optional(
              Type.Object({
                accept_waiting_requests: Type.Boolean({
                  description: "Whether this participant can accept waiting requests",
                }),
                can_accept_production_requests: Type.Boolean(),
                can_change_participant_permissions: Type.Boolean(),
                can_edit_display_name: Type.Boolean(),
                can_livestream: Type.Boolean(),
                can_record: Type.Boolean(),
                can_spotlight: Type.Boolean(),
                chat: Type.Object(
                  {
                    private: Type.Object({
                      can_receive: Type.Boolean(),
                      can_send: Type.Boolean(),
                      files: Type.Boolean(),
                      text: Type.Boolean(),
                    }),
                    public: Type.Object({
                      can_send: Type.Boolean({ description: "Can send messages in general" }),
                      files: Type.Boolean({ description: "Can send file messages" }),
                      text: Type.Boolean({ description: "Can send text messages" }),
                    }),
                  },
                  { description: "Chat permissions" },
                ),
                connected_meetings: Type.Object({
                  can_alter_connected_meetings: Type.Boolean(),
                  can_switch_connected_meetings: Type.Boolean(),
                  can_switch_to_parent_meeting: Type.Boolean(),
                }),
                disable_participant_audio: Type.Boolean(),
                disable_participant_screensharing: Type.Boolean(),
                disable_participant_video: Type.Boolean(),
                hidden_participant: Type.Boolean({
                  description: "Whether this participant is visible to others or not",
                }),
                is_recorder: Type.Optional(Type.Boolean({ default: false })),
                kick_participant: Type.Boolean(),
                media: Type.Object(
                  {
                    audio: Type.Object(
                      {
                        can_produce: Type.Union(
                          [Type.Literal("ALLOWED"), Type.Literal("NOT_ALLOWED"), Type.Literal("CAN_REQUEST")],
                          { description: "Can produce audio" },
                        ),
                      },
                      { description: "Audio permissions" },
                    ),
                    screenshare: Type.Object(
                      {
                        can_produce: Type.Union(
                          [Type.Literal("ALLOWED"), Type.Literal("NOT_ALLOWED"), Type.Literal("CAN_REQUEST")],
                          { description: "Can produce screen share video" },
                        ),
                      },
                      { description: "Screenshare permissions" },
                    ),
                    video: Type.Object(
                      {
                        can_produce: Type.Union(
                          [Type.Literal("ALLOWED"), Type.Literal("NOT_ALLOWED"), Type.Literal("CAN_REQUEST")],
                          { description: "Can produce video" },
                        ),
                      },
                      { description: "Video permissions" },
                    ),
                  },
                  { description: "Media permissions" },
                ),
                pin_participant: Type.Boolean(),
                plugins: Type.Object(
                  {
                    can_close: Type.Boolean({ description: "Can close plugins that are already open" }),
                    can_edit_config: Type.Boolean({ description: "Can edit plugin config" }),
                    can_start: Type.Boolean({ description: "Can start plugins" }),
                    config: Type.Union([
                      Type.String({ format: "uuid" }),
                      Type.Object({
                        access_control: Type.Union([Type.Literal("FULL_ACCESS"), Type.Literal("VIEW_ONLY")]),
                        handles_view_only: Type.Boolean(),
                      }),
                    ]),
                  },
                  { description: "Plugin permissions" },
                ),
                polls: Type.Object(
                  {
                    can_create: Type.Boolean({ description: "Can create polls" }),
                    can_view: Type.Boolean({ description: "Can view polls" }),
                    can_vote: Type.Boolean({ description: "Can vote on polls" }),
                  },
                  { description: "Poll permissions" },
                ),
                recorder_type: Type.Union(
                  [Type.Literal("RECORDER"), Type.Literal("LIVESTREAMER"), Type.Literal("NONE")],
                  { description: "Type of the recording peer" },
                ),
                show_participant_list: Type.Boolean(),
                waiting_room_type: Type.Union(
                  [Type.Literal("SKIP"), Type.Literal("ON_PRIVILEGED_USER_ENTRY"), Type.Literal("SKIP_ON_ACCEPT")],
                  { description: "Waiting room type" },
                ),
              }),
            ),
            ui: Type.Object({
              config_diff: Type.Optional(Type.Unknown()),
              design_tokens: Type.Object({
                border_radius: Type.Union([Type.Literal("rounded")]),
                border_width: Type.Union([Type.Literal("thin")]),
                colors: Type.Object({
                  background: Type.Object({
                    "600": Type.String({ default: "#222222" }),
                    "700": Type.String({ default: "#1f1f1f" }),
                    "800": Type.String({ default: "#1b1b1b" }),
                    "900": Type.String({ default: "#181818" }),
                    "1000": Type.String({ default: "#141414" }),
                  }),
                  brand: Type.Object({
                    "300": Type.String({ default: "#844d1c" }),
                    "400": Type.String({ default: "#9d5b22" }),
                    "500": Type.String({ default: "#b56927" }),
                    "600": Type.String({ default: "#d37c30" }),
                    "700": Type.String({ default: "#d9904f" }),
                  }),
                  danger: Type.String({ default: "#FF2D2D" }),
                  success: Type.String({ default: "#62A504" }),
                  text: Type.String({ default: "#EEEEEE" }),
                  text_on_brand: Type.String({ default: "#EEEEEE" }),
                  video_bg: Type.String({ default: "#191919" }),
                  warning: Type.String({ default: "#FFCD07" }),
                }),
                logo: Type.String(),
                spacing_base: Type.Number({ default: 4 }),
                theme: Type.Union([Type.Literal("dark")]),
              }),
            }),
          },
          { description: "Data returned by the operation" },
        ),
        success: Type.Boolean({ description: "Success status of the operation", default: true }),
      }),
    })
      .summary("Update a preset")
      .description("Update a preset by the provided preset ID")
      .operationId("patch-presets-preset_id")
      .tag("Presets")
      .security({ api_token: [] })

    g.delete("/presets/{preset_id}", {
      params: Type.Object({ preset_id: Type.String() }),
      response: Type.Object({
        data: Type.Object(
          {
            id: Type.String({ description: "ID of the preset", format: "uuid" }),
            config: Type.Object({
              max_screenshare_count: Type.Integer({
                description: "Maximum number of screen shares that can be active at a given time",
              }),
              max_video_streams: Type.Object(
                {
                  desktop: Type.Integer({ description: "Maximum number of video streams visible on desktop devices" }),
                  mobile: Type.Integer({ description: "Maximum number of streams visible on mobile devices" }),
                },
                { description: "Maximum number of streams that are visible on a device" },
              ),
              media: Type.Object(
                {
                  audio: Type.Optional(
                    Type.Object(
                      {
                        enable_high_bitrate: Type.Optional(
                          Type.Boolean({ description: "Enable High Quality Audio for your meetings", default: false }),
                        ),
                        enable_stereo: Type.Optional(
                          Type.Boolean({ description: "Enable Stereo for your meetings", default: false }),
                        ),
                      },
                      { description: "Control options for Audio quality." },
                    ),
                  ),
                  screenshare: Type.Object(
                    {
                      frame_rate: Type.Integer({ description: "Frame rate of screen share" }),
                      quality: Type.Union([Type.Literal("hd"), Type.Literal("vga"), Type.Literal("qvga")], {
                        description: "Quality of screen share ",
                      }),
                    },
                    { description: "Configuration options for participant screen shares" },
                  ),
                  video: Type.Object(
                    {
                      frame_rate: Type.Integer({ description: "Frame rate of participants' video", maximum: 30 }),
                      quality: Type.Union([Type.Literal("hd"), Type.Literal("vga"), Type.Literal("qvga")], {
                        description: "Video quality of participants",
                      }),
                    },
                    { description: "Configuration options for participant videos" },
                  ),
                },
                { description: "Media configuration options. eg: Video quality" },
              ),
              view_type: Type.Union([Type.Literal("GROUP_CALL"), Type.Literal("WEBINAR"), Type.Literal("AUDIO_ROOM")], {
                description: "Type of the meeting",
              }),
            }),
            name: Type.String({ description: "Name of the preset" }),
            permissions: Type.Optional(
              Type.Object({
                accept_waiting_requests: Type.Boolean({
                  description: "Whether this participant can accept waiting requests",
                }),
                can_accept_production_requests: Type.Boolean(),
                can_change_participant_permissions: Type.Boolean(),
                can_edit_display_name: Type.Boolean(),
                can_livestream: Type.Boolean(),
                can_record: Type.Boolean(),
                can_spotlight: Type.Boolean(),
                chat: Type.Object(
                  {
                    private: Type.Object({
                      can_receive: Type.Boolean(),
                      can_send: Type.Boolean(),
                      files: Type.Boolean(),
                      text: Type.Boolean(),
                    }),
                    public: Type.Object({
                      can_send: Type.Boolean({ description: "Can send messages in general" }),
                      files: Type.Boolean({ description: "Can send file messages" }),
                      text: Type.Boolean({ description: "Can send text messages" }),
                    }),
                  },
                  { description: "Chat permissions" },
                ),
                connected_meetings: Type.Object({
                  can_alter_connected_meetings: Type.Boolean(),
                  can_switch_connected_meetings: Type.Boolean(),
                  can_switch_to_parent_meeting: Type.Boolean(),
                }),
                disable_participant_audio: Type.Boolean(),
                disable_participant_screensharing: Type.Boolean(),
                disable_participant_video: Type.Boolean(),
                hidden_participant: Type.Boolean({
                  description: "Whether this participant is visible to others or not",
                }),
                is_recorder: Type.Optional(Type.Boolean({ default: false })),
                kick_participant: Type.Boolean(),
                media: Type.Object(
                  {
                    audio: Type.Object(
                      {
                        can_produce: Type.Union(
                          [Type.Literal("ALLOWED"), Type.Literal("NOT_ALLOWED"), Type.Literal("CAN_REQUEST")],
                          { description: "Can produce audio" },
                        ),
                      },
                      { description: "Audio permissions" },
                    ),
                    screenshare: Type.Object(
                      {
                        can_produce: Type.Union(
                          [Type.Literal("ALLOWED"), Type.Literal("NOT_ALLOWED"), Type.Literal("CAN_REQUEST")],
                          { description: "Can produce screen share video" },
                        ),
                      },
                      { description: "Screenshare permissions" },
                    ),
                    video: Type.Object(
                      {
                        can_produce: Type.Union(
                          [Type.Literal("ALLOWED"), Type.Literal("NOT_ALLOWED"), Type.Literal("CAN_REQUEST")],
                          { description: "Can produce video" },
                        ),
                      },
                      { description: "Video permissions" },
                    ),
                  },
                  { description: "Media permissions" },
                ),
                pin_participant: Type.Boolean(),
                plugins: Type.Object(
                  {
                    can_close: Type.Boolean({ description: "Can close plugins that are already open" }),
                    can_edit_config: Type.Boolean({ description: "Can edit plugin config" }),
                    can_start: Type.Boolean({ description: "Can start plugins" }),
                    config: Type.Union([
                      Type.String({ format: "uuid" }),
                      Type.Object({
                        access_control: Type.Union([Type.Literal("FULL_ACCESS"), Type.Literal("VIEW_ONLY")]),
                        handles_view_only: Type.Boolean(),
                      }),
                    ]),
                  },
                  { description: "Plugin permissions" },
                ),
                polls: Type.Object(
                  {
                    can_create: Type.Boolean({ description: "Can create polls" }),
                    can_view: Type.Boolean({ description: "Can view polls" }),
                    can_vote: Type.Boolean({ description: "Can vote on polls" }),
                  },
                  { description: "Poll permissions" },
                ),
                recorder_type: Type.Union(
                  [Type.Literal("RECORDER"), Type.Literal("LIVESTREAMER"), Type.Literal("NONE")],
                  { description: "Type of the recording peer" },
                ),
                show_participant_list: Type.Boolean(),
                waiting_room_type: Type.Union(
                  [Type.Literal("SKIP"), Type.Literal("ON_PRIVILEGED_USER_ENTRY"), Type.Literal("SKIP_ON_ACCEPT")],
                  { description: "Waiting room type" },
                ),
              }),
            ),
            ui: Type.Object({
              config_diff: Type.Optional(Type.Unknown()),
              design_tokens: Type.Object({
                border_radius: Type.Union([Type.Literal("rounded")]),
                border_width: Type.Union([Type.Literal("thin")]),
                colors: Type.Object({
                  background: Type.Object({
                    "600": Type.String({ default: "#222222" }),
                    "700": Type.String({ default: "#1f1f1f" }),
                    "800": Type.String({ default: "#1b1b1b" }),
                    "900": Type.String({ default: "#181818" }),
                    "1000": Type.String({ default: "#141414" }),
                  }),
                  brand: Type.Object({
                    "300": Type.String({ default: "#844d1c" }),
                    "400": Type.String({ default: "#9d5b22" }),
                    "500": Type.String({ default: "#b56927" }),
                    "600": Type.String({ default: "#d37c30" }),
                    "700": Type.String({ default: "#d9904f" }),
                  }),
                  danger: Type.String({ default: "#FF2D2D" }),
                  success: Type.String({ default: "#62A504" }),
                  text: Type.String({ default: "#EEEEEE" }),
                  text_on_brand: Type.String({ default: "#EEEEEE" }),
                  video_bg: Type.String({ default: "#191919" }),
                  warning: Type.String({ default: "#FFCD07" }),
                }),
                logo: Type.String(),
                spacing_base: Type.Number({ default: 4 }),
                theme: Type.Union([Type.Literal("dark")]),
              }),
            }),
          },
          { description: "Data returned by the operation" },
        ),
        success: Type.Boolean({ description: "Success status of the operation", default: true }),
      }),
    })
      .summary("Delete a preset")
      .description("Deletes a preset using the provided preset ID")
      .operationId("delete-presets-preset_id")
      .tag("Presets")
      .security({ api_token: [] })

    g.get("/recordings", {
      query: Type.Object({
        meeting_id: Type.Optional(Type.String({ format: "uuid" })),
        page_no: Type.Optional(Type.Number({ minimum: 0 })),
        per_page: Type.Optional(Type.Number({ minimum: 0 })),
        expired: Type.Optional(Type.Boolean()),
        search: Type.Optional(Type.String()),
        sort_by: Type.Optional(Type.Union([Type.Literal("invokedTime")])),
        sort_order: Type.Optional(Type.Union([Type.Literal("ASC"), Type.Literal("DESC")])),
        start_time: Type.Optional(Type.String({ format: "date-time" })),
        end_time: Type.Optional(Type.String({ format: "date-time" })),
        status: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal("INVOKED"),
              Type.Literal("RECORDING"),
              Type.Literal("UPLOADING"),
              Type.Literal("UPLOADED"),
            ]),
          ),
        ),
      }),
      response: Type.Object({
        data: Type.Array(
          Type.Object({
            audio_download_url: Type.Union([
              Type.String({
                description: "If the audio_config is passed, the URL for downloading the audio recording is returned.",
                format: "uri",
                readOnly: true,
              }),
              Type.Null(),
            ]),
            download_url: Type.Union([
              Type.String({ description: "URL where the recording can be downloaded.", format: "uri", readOnly: true }),
              Type.Null(),
            ]),
            download_url_expiry: Type.Union([
              Type.String({
                description: "Timestamp when the download URL expires.",
                format: "date-time",
                readOnly: true,
              }),
              Type.Null(),
            ]),
            file_size: Type.Union([
              Type.Number({ description: "File size of the recording, in bytes.", readOnly: true }),
              Type.Null(),
            ]),
            id: Type.String({ description: "ID of the recording", format: "uuid", readOnly: true }),
            invoked_time: Type.String({
              description: "Timestamp when this recording was invoked.",
              format: "date-time",
            }),
            output_file_name: Type.String({ description: "File name of the recording." }),
            recording_duration: Type.Optional(Type.Integer({ description: "Total recording time in seconds." })),
            session_id: Type.Union([
              Type.String({
                description: "ID of the meeting session this recording is for.",
                format: "uuid",
                readOnly: true,
              }),
              Type.Null(),
            ]),
            started_time: Type.Union([
              Type.String({
                description:
                  "Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.",
                format: "date-time",
              }),
              Type.Null(),
            ]),
            status: Type.Union(
              [
                Type.Literal("INVOKED"),
                Type.Literal("RECORDING"),
                Type.Literal("UPLOADING"),
                Type.Literal("UPLOADED"),
                Type.Literal("ERRORED"),
                Type.Literal("PAUSED"),
              ],
              { description: "Current status of the recording." },
            ),
            stopped_time: Type.Union([
              Type.String({
                description:
                  "Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.",
                format: "date-time",
              }),
              Type.Null(),
            ]),
            storage_config: Type.Optional(RealtimekitStorageconfig),
            meeting: Type.Optional(RealtimekitMeeting),
          }),
        ),
        paging: Type.Object({
          end_offset: Type.Number(),
          start_offset: Type.Number(),
          total_count: Type.Number({ minimum: 0 }),
        }),
        success: Type.Boolean(),
      }),
    })
      .summary("Fetch all recordings for an organization")
      .description(
        "Returns all recordings for an organization. If the `meeting_id` parameter is passed, returns all recordings for the given meeting ID.",
      )
      .operationId("get_all_recordings")
      .tag("Recordings")
      .security({ api_token: [] })

    g.post("/recordings", {
      body: Type.Object({
        allow_multiple_recordings: Type.Optional(
          Type.Boolean({
            description:
              "By default, a meeting allows only one recording to run at a time. Enabling the `allow_multiple_recordings` parameter to true allows you to initiate multiple recordings concurrently in the same meeting. This allows you to record separate videos of the same meeting with different configurations, such as portrait mode or landscape mode.",
            default: false,
          }),
        ),
        audio_config: Type.Optional(RealtimekitAudioconfig),
        file_name_prefix: Type.Optional(Type.String({ description: "Update the recording file name." })),
        interactive_config: Type.Optional(RealtimekitInteractiveconfig),
        max_seconds: Type.Optional(
          Type.Integer({
            description:
              "Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.",
            minimum: 60,
            maximum: 86400,
          }),
        ),
        meeting_id: Type.Optional(Type.String({ description: "ID of the meeting to record.", format: "uuid" })),
        realtimekit_bucket_config: Type.Optional(RealtimekitRealtimekitbucketconfig),
        rtmp_out_config: Type.Optional(RealtimekitLivestreamingconfig),
        storage_config: Type.Optional(RealtimekitStorageconfig),
        url: Type.Optional(Type.String({ description: "Pass a custom url to record arbitary screen", format: "uri" })),
        video_config: Type.Optional(RealtimekitVideoconfig),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object(
            {
              audio_download_url: Type.Union([
                Type.String({
                  description:
                    "If the audio_config is passed, the URL for downloading the audio recording is returned.",
                  format: "uri",
                  readOnly: true,
                }),
                Type.Null(),
              ]),
              download_url: Type.Union([
                Type.String({
                  description: "URL where the recording can be downloaded.",
                  format: "uri",
                  readOnly: true,
                }),
                Type.Null(),
              ]),
              download_url_expiry: Type.Union([
                Type.String({
                  description: "Timestamp when the download URL expires.",
                  format: "date-time",
                  readOnly: true,
                }),
                Type.Null(),
              ]),
              file_size: Type.Union([
                Type.Number({ description: "File size of the recording, in bytes.", readOnly: true }),
                Type.Null(),
              ]),
              id: Type.String({ description: "ID of the recording", format: "uuid", readOnly: true }),
              invoked_time: Type.String({
                description: "Timestamp when this recording was invoked.",
                format: "date-time",
              }),
              output_file_name: Type.String({ description: "File name of the recording." }),
              recording_duration: Type.Optional(Type.Integer({ description: "Total recording time in seconds." })),
              session_id: Type.Union([
                Type.String({
                  description: "ID of the meeting session this recording is for.",
                  format: "uuid",
                  readOnly: true,
                }),
                Type.Null(),
              ]),
              started_time: Type.Union([
                Type.String({
                  description:
                    "Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.",
                  format: "date-time",
                }),
                Type.Null(),
              ]),
              status: Type.Union(
                [
                  Type.Literal("INVOKED"),
                  Type.Literal("RECORDING"),
                  Type.Literal("UPLOADING"),
                  Type.Literal("UPLOADED"),
                  Type.Literal("ERRORED"),
                  Type.Literal("PAUSED"),
                ],
                { description: "Current status of the recording." },
              ),
              stopped_time: Type.Union([
                Type.String({
                  description:
                    "Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.",
                  format: "date-time",
                }),
                Type.Null(),
              ]),
              start_reason: Type.Optional(RealtimekitStartreason),
              stop_reason: Type.Optional(RealtimekitStopreason),
              storage_config: Type.Optional(RealtimekitStorageconfig),
            },
            { description: "Data returned by the operation" },
          ),
        ),
        success: Type.Boolean({ description: "Success status of the operation", default: true }),
      }),
    })
      .summary("Start recording a meeting")
      .description(
        "Starts recording a meeting. The meeting can be started by an organization admin directly, or a participant with permissions to start a recording, based on the type of authorization used.",
      )
      .operationId("start_recording")
      .tag("Recordings")
      .security({ api_token: [] })

    g.get("/recordings/active-recording/{meeting_id}", {
      params: Type.Object({ meeting_id: Type.String() }),
      responses: {
        200: Type.Object({
          data: RealtimekitRecording,
          success: Type.Boolean({ description: "Success status of the operation", default: true }),
        }),
        404: RealtimekitGenericerrorresponse,
      },
    })
      .summary("Fetch active recording")
      .description("Returns the active recording details for the given meeting ID.")
      .operationId("get_active_recording")
      .tag("Recordings")
      .security({ api_token: [] })

    g.post("/recordings/track", {
      body: Type.Object({
        layers: Type.Record(Type.String(), RealtimekitTrackconfiglayer),
        max_seconds: Type.Optional(
          Type.Number({ description: "Maximum seconds this recording should be active for (beta)" }),
        ),
        meeting_id: Type.Optional(Type.String({ description: "ID of the meeting to record." })),
      }),
    })
      .summary("Start recording audio and video tracks")
      .description(
        'Starts a track recording in a meeting. Track recordings consist of "layers". Layers are used to map audio/video tracks in a meeting to output destinations. More information about track recordings is available in the [Track Recordings Guide Page](https://docs.realtime.cloudflare.com/guides/capabilities/recording/recording-overview).',
      )
      .operationId("startTrackRecordingForAMeeting")
      .tag("Recordings")
      .security({ api_token: [] })

    g.get("/recordings/{recording_id}", {
      params: Type.Object({ recording_id: Type.String() }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object(
            {
              audio_download_url: Type.Union([
                Type.String({
                  description:
                    "If the audio_config is passed, the URL for downloading the audio recording is returned.",
                  format: "uri",
                  readOnly: true,
                }),
                Type.Null(),
              ]),
              download_url: Type.Union([
                Type.String({
                  description: "URL where the recording can be downloaded.",
                  format: "uri",
                  readOnly: true,
                }),
                Type.Null(),
              ]),
              download_url_expiry: Type.Union([
                Type.String({
                  description: "Timestamp when the download URL expires.",
                  format: "date-time",
                  readOnly: true,
                }),
                Type.Null(),
              ]),
              file_size: Type.Union([
                Type.Number({ description: "File size of the recording, in bytes.", readOnly: true }),
                Type.Null(),
              ]),
              id: Type.String({ description: "ID of the recording", format: "uuid", readOnly: true }),
              invoked_time: Type.String({
                description: "Timestamp when this recording was invoked.",
                format: "date-time",
              }),
              output_file_name: Type.String({ description: "File name of the recording." }),
              recording_duration: Type.Optional(Type.Integer({ description: "Total recording time in seconds." })),
              session_id: Type.Union([
                Type.String({
                  description: "ID of the meeting session this recording is for.",
                  format: "uuid",
                  readOnly: true,
                }),
                Type.Null(),
              ]),
              started_time: Type.Union([
                Type.String({
                  description:
                    "Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.",
                  format: "date-time",
                }),
                Type.Null(),
              ]),
              status: Type.Union(
                [
                  Type.Literal("INVOKED"),
                  Type.Literal("RECORDING"),
                  Type.Literal("UPLOADING"),
                  Type.Literal("UPLOADED"),
                  Type.Literal("ERRORED"),
                  Type.Literal("PAUSED"),
                ],
                { description: "Current status of the recording." },
              ),
              stopped_time: Type.Union([
                Type.String({
                  description:
                    "Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.",
                  format: "date-time",
                }),
                Type.Null(),
              ]),
              start_reason: Type.Optional(RealtimekitStartreason),
              stop_reason: Type.Optional(RealtimekitStopreason),
              storage_config: Type.Optional(RealtimekitStorageconfig),
            },
            { description: "Data returned by the operation" },
          ),
        ),
        success: Type.Boolean({ description: "Success status of the operation", default: true }),
      }),
    })
      .summary("Fetch details of a recording")
      .description("Returns details of a recording for the given recording ID.")
      .operationId("get_one_recording")
      .tag("Recordings")
      .security({ api_token: [] })

    g.put("/recordings/{recording_id}", {
      params: Type.Object({ recording_id: Type.String() }),
      body: Type.Object({
        action: Type.Union([Type.Literal("stop"), Type.Literal("pause"), Type.Literal("resume")]),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object(
            {
              audio_download_url: Type.Union([
                Type.String({
                  description:
                    "If the audio_config is passed, the URL for downloading the audio recording is returned.",
                  format: "uri",
                  readOnly: true,
                }),
                Type.Null(),
              ]),
              download_url: Type.Union([
                Type.String({
                  description: "URL where the recording can be downloaded.",
                  format: "uri",
                  readOnly: true,
                }),
                Type.Null(),
              ]),
              download_url_expiry: Type.Union([
                Type.String({
                  description: "Timestamp when the download URL expires.",
                  format: "date-time",
                  readOnly: true,
                }),
                Type.Null(),
              ]),
              file_size: Type.Union([
                Type.Number({ description: "File size of the recording, in bytes.", readOnly: true }),
                Type.Null(),
              ]),
              id: Type.String({ description: "ID of the recording", format: "uuid", readOnly: true }),
              invoked_time: Type.String({
                description: "Timestamp when this recording was invoked.",
                format: "date-time",
              }),
              output_file_name: Type.String({ description: "File name of the recording." }),
              recording_duration: Type.Optional(Type.Integer({ description: "Total recording time in seconds." })),
              session_id: Type.Union([
                Type.String({
                  description: "ID of the meeting session this recording is for.",
                  format: "uuid",
                  readOnly: true,
                }),
                Type.Null(),
              ]),
              started_time: Type.Union([
                Type.String({
                  description:
                    "Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.",
                  format: "date-time",
                }),
                Type.Null(),
              ]),
              status: Type.Union(
                [
                  Type.Literal("INVOKED"),
                  Type.Literal("RECORDING"),
                  Type.Literal("UPLOADING"),
                  Type.Literal("UPLOADED"),
                  Type.Literal("ERRORED"),
                  Type.Literal("PAUSED"),
                ],
                { description: "Current status of the recording." },
              ),
              stopped_time: Type.Union([
                Type.String({
                  description:
                    "Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.",
                  format: "date-time",
                }),
                Type.Null(),
              ]),
              start_reason: Type.Optional(RealtimekitStartreason),
              stop_reason: Type.Optional(RealtimekitStopreason),
              storage_config: Type.Optional(RealtimekitStorageconfig),
            },
            { description: "Data returned by the operation" },
          ),
        ),
        success: Type.Boolean({ description: "Success status of the operation", default: true }),
      }),
    })
      .summary("Pause/Resume/Stop recording")
      .description("Pause/Resume/Stop a given recording ID.")
      .operationId("pause_resume_stop_recording")
      .tag("Recordings")
      .security({ api_token: [] })

    g.get("/sessions", {
      query: Type.Object({
        page_no: Type.Optional(Type.Number({ minimum: 0 })),
        per_page: Type.Optional(Type.Number({ minimum: 0 })),
        sort_by: Type.Optional(Type.Union([Type.Literal("minutesConsumed"), Type.Literal("createdAt")])),
        sort_order: Type.Optional(Type.Union([Type.Literal("ASC"), Type.Literal("DESC")])),
        start_time: Type.Optional(Type.String({ format: "date-time" })),
        end_time: Type.Optional(Type.String({ format: "date-time" })),
        participants: Type.Optional(Type.String()),
        status: Type.Optional(Type.Union([Type.Literal("LIVE"), Type.Literal("ENDED")])),
        search: Type.Optional(Type.String()),
        associated_id: Type.Optional(Type.String()),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            sessions: Type.Optional(Type.Array(RealtimekitActivesession)),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch all sessions of an organization")
      .description("Returns details of all sessions of an organization.")
      .operationId("GetSessions")
      .tag("Sessions")
      .security({ api_token: [] })

    g.get("/sessions/peer-report/{peer_id}", {
      params: Type.Object({ peer_id: Type.String() }),
      query: Type.Object({
        filters: Type.Optional(
          Type.Union([
            Type.Literal("device_info"),
            Type.Literal("ip_information"),
            Type.Literal("precall_network_information"),
            Type.Literal("events"),
            Type.Literal("quality_stats"),
          ]),
        ),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            participant: Type.Optional(
              Type.Object({
                created_at: Type.Optional(Type.String({ readOnly: true })),
                custom_participant_id: Type.Optional(Type.String()),
                display_name: Type.Optional(Type.String()),
                duration: Type.Optional(Type.Number()),
                id: Type.Optional(Type.String()),
                joined_at: Type.Optional(Type.String()),
                left_at: Type.Optional(Type.String()),
                peer_report: Type.Optional(
                  Type.Object({
                    metadata: Type.Optional(
                      Type.Object({
                        audio_devices_updates: Type.Optional(Type.Array(Type.Unknown())),
                        browser_metadata: Type.Optional(
                          Type.Object({
                            browser: Type.Optional(Type.String()),
                            browser_version: Type.Optional(Type.String()),
                            engine: Type.Optional(Type.String()),
                            user_agent: Type.Optional(Type.String()),
                            webgl_support: Type.Optional(Type.String()),
                          }),
                        ),
                        candidate_pairs: Type.Optional(
                          Type.Object({
                            consuming_transport: Type.Optional(Type.Array(Type.Unknown())),
                            producing_transport: Type.Optional(
                              Type.Array(
                                Type.Object({
                                  available_outgoing_bitrate: Type.Optional(Type.Integer()),
                                  bytes_discarded_on_send: Type.Optional(Type.Integer()),
                                  bytes_received: Type.Optional(Type.Integer()),
                                  bytes_sent: Type.Optional(Type.Integer()),
                                  current_round_trip_time: Type.Optional(Type.Number()),
                                  last_packet_received_timestamp: Type.Optional(Type.Integer()),
                                  last_packet_sent_timestamp: Type.Optional(Type.Integer()),
                                  local_candidate_address: Type.Optional(Type.String()),
                                  local_candidate_id: Type.Optional(Type.String()),
                                  local_candidate_network_type: Type.Optional(Type.String()),
                                  local_candidate_port: Type.Optional(Type.Integer()),
                                  local_candidate_protocol: Type.Optional(Type.String()),
                                  local_candidate_related_address: Type.Optional(Type.String()),
                                  local_candidate_related_port: Type.Optional(Type.Integer()),
                                  local_candidate_type: Type.Optional(Type.String()),
                                  nominated: Type.Optional(Type.Boolean()),
                                  packets_discarded_on_send: Type.Optional(Type.Integer()),
                                  packets_received: Type.Optional(Type.Integer()),
                                  packets_sent: Type.Optional(Type.Integer()),
                                  remote_candidate_address: Type.Optional(Type.String()),
                                  remote_candidate_id: Type.Optional(Type.String()),
                                  remote_candidate_port: Type.Optional(Type.Integer()),
                                  remote_candidate_protocol: Type.Optional(Type.String()),
                                  remote_candidate_type: Type.Optional(Type.String()),
                                  total_round_trip_time: Type.Optional(Type.Number()),
                                }),
                              ),
                            ),
                          }),
                        ),
                        device_info: Type.Optional(
                          Type.Object({
                            cpus: Type.Optional(Type.Integer()),
                            is_mobile: Type.Optional(Type.Boolean()),
                            os: Type.Optional(Type.String()),
                            os_version: Type.Optional(Type.String()),
                          }),
                        ),
                        events: Type.Optional(
                          Type.Array(
                            Type.Object({
                              name: Type.Optional(Type.String()),
                              timestamp: Type.Optional(Type.String()),
                            }),
                          ),
                        ),
                        ip_information: Type.Optional(
                          Type.Object({
                            asn: Type.Optional(
                              Type.Object({
                                asn: Type.Optional(Type.String()),
                              }),
                            ),
                            city: Type.Optional(Type.String()),
                            country: Type.Optional(Type.String()),
                            ipv4: Type.Optional(Type.String()),
                            region: Type.Optional(Type.String()),
                            timezone: Type.Optional(Type.String()),
                          }),
                        ),
                        pc_metadata: Type.Optional(
                          Type.Array(
                            Type.Object({
                              effective_network_type: Type.Optional(Type.String()),
                              reflexive_connectivity: Type.Optional(Type.Boolean()),
                              relay_connectivity: Type.Optional(Type.Boolean()),
                              timestamp: Type.Optional(Type.String()),
                              turn_connectivity: Type.Optional(Type.Boolean()),
                            }),
                          ),
                        ),
                        room_view_type: Type.Optional(Type.String()),
                        sdk_name: Type.Optional(Type.String()),
                        sdk_version: Type.Optional(Type.String()),
                        selected_device_updates: Type.Optional(Type.Array(Type.Unknown())),
                        speaker_devices_updates: Type.Optional(Type.Array(Type.Unknown())),
                        video_devices_updates: Type.Optional(Type.Array(Type.Unknown())),
                      }),
                    ),
                    quality: Type.Optional(
                      Type.Object({
                        audio_consumer: Type.Optional(Type.Array(Type.Unknown())),
                        audio_consumer_cumulative: Type.Optional(Type.Unknown()),
                        audio_producer: Type.Optional(
                          Type.Array(
                            Type.Object({
                              bytes_sent: Type.Optional(Type.Integer()),
                              jitter: Type.Optional(Type.Integer()),
                              mid: Type.Optional(Type.String()),
                              mos_quality: Type.Optional(Type.Integer()),
                              packets_lost: Type.Optional(Type.Integer()),
                              packets_sent: Type.Optional(Type.Integer()),
                              producer_id: Type.Optional(Type.String()),
                              rtt: Type.Optional(Type.Number()),
                              ssrc: Type.Optional(Type.Integer()),
                              timestamp: Type.Optional(Type.String()),
                            }),
                          ),
                        ),
                        audio_producer_cumulative: Type.Optional(
                          Type.Object({
                            packet_loss: Type.Optional(
                              Type.Object({
                                "10_or_greater_event_fraction": Type.Optional(Type.Integer()),
                                "25_or_greater_event_fraction": Type.Optional(Type.Integer()),
                                "50_or_greater_event_fraction": Type.Optional(Type.Integer()),
                                "5_or_greater_event_fraction": Type.Optional(Type.Integer()),
                                avg: Type.Optional(Type.Integer()),
                              }),
                            ),
                            quality_mos: Type.Optional(
                              Type.Object({
                                avg: Type.Optional(Type.Integer()),
                                p50: Type.Optional(Type.Integer()),
                                p75: Type.Optional(Type.Integer()),
                                p90: Type.Optional(Type.Integer()),
                              }),
                            ),
                            rtt: Type.Optional(
                              Type.Object({
                                "100ms_or_greater_event_fraction": Type.Optional(Type.Number()),
                                "250ms_or_greater_event_fraction": Type.Optional(Type.Number()),
                                "500ms_or_greater_event_fraction": Type.Optional(Type.Number()),
                                avg: Type.Optional(Type.Number()),
                              }),
                            ),
                          }),
                        ),
                        screenshare_audio_consumer: Type.Optional(Type.Array(Type.Unknown())),
                        screenshare_audio_consumer_cumulative: Type.Optional(Type.Unknown()),
                        screenshare_audio_producer: Type.Optional(Type.Array(Type.Unknown())),
                        screenshare_audio_producer_cumulative: Type.Optional(Type.Unknown()),
                        screenshare_video_consumer: Type.Optional(Type.Array(Type.Unknown())),
                        screenshare_video_consumer_cumulative: Type.Optional(Type.Unknown()),
                        screenshare_video_producer: Type.Optional(Type.Array(Type.Unknown())),
                        screenshare_video_producer_cumulative: Type.Optional(Type.Unknown()),
                        video_consumer: Type.Optional(Type.Array(Type.Unknown())),
                        video_consumer_cumulative: Type.Optional(Type.Unknown()),
                        video_producer: Type.Optional(Type.Array(Type.Unknown())),
                        video_producer_cumulative: Type.Optional(Type.Unknown()),
                      }),
                    ),
                  }),
                ),
                peer_stats: Type.Optional(
                  Type.Object({
                    device_info: Type.Optional(
                      Type.Object({
                        browser: Type.Optional(Type.String()),
                        browser_version: Type.Optional(Type.String()),
                        cpus: Type.Optional(Type.Integer()),
                        engine: Type.Optional(Type.String()),
                        is_mobile: Type.Optional(Type.Boolean()),
                        os: Type.Optional(Type.String()),
                        os_version: Type.Optional(Type.String()),
                        sdk_name: Type.Optional(Type.String()),
                        sdk_version: Type.Optional(Type.String()),
                        user_agent: Type.Optional(Type.String()),
                        webgl_support: Type.Optional(Type.String()),
                      }),
                    ),
                    events: Type.Optional(
                      Type.Array(
                        Type.Object({
                          metadata: Type.Optional(
                            Type.Object({
                              connection_info: Type.Optional(
                                Type.Object({
                                  backend_r_t_t: Type.Optional(Type.Number()),
                                  connectivity: Type.Optional(
                                    Type.Object({
                                      host: Type.Optional(Type.Boolean()),
                                      reflexive: Type.Optional(Type.Boolean()),
                                      relay: Type.Optional(Type.Boolean()),
                                    }),
                                  ),
                                  effective_network_type: Type.Optional(Type.String()),
                                  fractional_loss: Type.Optional(Type.Integer()),
                                  ip_details: Type.Optional(
                                    Type.Object({
                                      asn: Type.Optional(
                                        Type.Object({
                                          asn: Type.Optional(Type.String()),
                                        }),
                                      ),
                                      city: Type.Optional(Type.String()),
                                      country: Type.Optional(Type.String()),
                                      ip: Type.Optional(Type.String()),
                                      loc: Type.Optional(Type.String()),
                                      postal: Type.Optional(Type.String()),
                                      region: Type.Optional(Type.String()),
                                      timezone: Type.Optional(Type.String()),
                                    }),
                                  ),
                                  jitter: Type.Optional(Type.Integer()),
                                  location: Type.Optional(
                                    Type.Object({
                                      coords: Type.Optional(
                                        Type.Object({
                                          latitude: Type.Optional(Type.Number()),
                                          longitude: Type.Optional(Type.Number()),
                                        }),
                                      ),
                                    }),
                                  ),
                                  r_t_t: Type.Optional(Type.Number()),
                                  throughput: Type.Optional(Type.Integer()),
                                  turn_connectivity: Type.Optional(Type.Boolean()),
                                }),
                              ),
                            }),
                          ),
                          timestamp: Type.Optional(Type.String()),
                          type: Type.Optional(Type.String()),
                        }),
                      ),
                    ),
                    ip_information: Type.Optional(
                      Type.Object({
                        asn: Type.Optional(
                          Type.Object({
                            asn: Type.Optional(Type.String()),
                          }),
                        ),
                        city: Type.Optional(Type.String()),
                        country: Type.Optional(Type.String()),
                        ip_location: Type.Optional(Type.String()),
                        ipv4: Type.Optional(Type.String()),
                        org: Type.Optional(Type.String()),
                        region: Type.Optional(Type.String()),
                        timezone: Type.Optional(Type.String()),
                      }),
                    ),
                    precall_network_information: Type.Optional(
                      Type.Object({
                        backend_rtt: Type.Optional(Type.Number()),
                        effective_networktype: Type.Optional(Type.String()),
                        fractional_loss: Type.Optional(Type.Integer()),
                        jitter: Type.Optional(Type.Integer()),
                        reflexive_connectivity: Type.Optional(Type.Boolean()),
                        relay_connectivity: Type.Optional(Type.Boolean()),
                        rtt: Type.Optional(Type.Number()),
                        throughput: Type.Optional(Type.Integer()),
                        turn_connectivity: Type.Optional(Type.Boolean()),
                      }),
                    ),
                  }),
                ),
                quality_stats: Type.Optional(
                  Type.Object({
                    audio_bandwidth: Type.Optional(Type.Integer()),
                    audio_stats: Type.Optional(Type.Array(Type.Unknown())),
                    average_quality: Type.Optional(Type.Integer()),
                    end: Type.Optional(Type.Union([Type.String(), Type.Null()])),
                    first_audio_packet_received: Type.Optional(Type.String()),
                    first_video_packet_received: Type.Optional(Type.String()),
                    last_audio_packet_received: Type.Optional(Type.String()),
                    last_video_packet_received: Type.Optional(Type.String()),
                    peer_ids: Type.Optional(Type.Array(Type.String())),
                    start: Type.Optional(Type.Union([Type.String(), Type.Null()])),
                    total_audio_packets: Type.Optional(Type.Integer()),
                    total_audio_packets_lost: Type.Optional(Type.Integer()),
                    total_video_packets: Type.Optional(Type.Integer()),
                    total_video_packets_lost: Type.Optional(Type.Integer()),
                    video_bandwidth: Type.Optional(Type.Integer()),
                    video_stats: Type.Optional(Type.Array(Type.Unknown())),
                  }),
                ),
                role: Type.Optional(Type.String()),
                updated_at: Type.Optional(Type.String({ readOnly: true })),
                user_id: Type.Optional(Type.String()),
              }),
            ),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch details of peer")
      .description("Returns details of the given peer ID along with call statistics for the given session ID.")
      .operationId("GetParticipantDataFromPeerId")
      .tag("Sessions")
      .security({ api_token: [] })

    g.get("/sessions/{session_id}", {
      params: Type.Object({ session_id: Type.String() }),
      query: Type.Object({
        include_breakout_rooms: Type.Optional(Type.Boolean({ default: false })),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            session: Type.Optional(RealtimekitActivesession),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch details of a session")
      .description("Returns data of the given session ID including recording details.")
      .operationId("GetSessionDetails")
      .tag("Sessions")
      .security({ api_token: [] })

    g.get("/sessions/{session_id}/chat", {
      params: Type.Object({ session_id: Type.String() }),
      response: Type.Object({
        data: Type.Optional(RealtimekitChatmessage),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch all chat messages of a session")
      .description("Returns a URL to download all chat messages of the session ID in CSV format.\n")
      .operationId("GetSessionChat")
      .tag("Sessions")
      .security({ api_token: [] })

    g.get("/sessions/{session_id}/livestream-sessions", {
      params: Type.Object({ session_id: Type.String() }),
      query: Type.Object({
        per_page: Type.Optional(Type.Number()),
        page_no: Type.Optional(Type.Number()),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            created_at: Type.Optional(
              Type.String({
                description: "Timestamp the object was created at. The time is returned in ISO format.",
                format: "date-time",
                readOnly: true,
              }),
            ),
            err_message: Type.Optional(
              Type.Union([
                Type.Literal("LIVE"),
                Type.Literal("IDLE"),
                Type.Literal("ERRORED"),
                Type.Literal("INVOKED"),
              ]),
            ),
            id: Type.Optional(Type.String({ description: "The livestream session ID." })),
            ingest_seconds: Type.Optional(
              Type.Number({
                description: "The time duration for which the input was given or the meeting was streamed.",
              }),
            ),
            invoked_time: Type.Optional(
              Type.Union([Type.String({ description: "Name of the livestream." }), Type.Null()]),
            ),
            livestream_id: Type.Optional(Type.String({ description: "The ID of the livestream." })),
            paging: Type.Optional(
              Type.Object({
                end_offset: Type.Optional(Type.Number()),
                start_offset: Type.Optional(Type.Number()),
                total_count: Type.Optional(Type.Number()),
              }),
            ),
            stopped_time: Type.Optional(
              Type.String({ description: "Specifies if the livestream was disabled.", format: "date-time" }),
            ),
            updated_at: Type.Optional(
              Type.String({
                description: "Timestamp the object was updated at. The time is returned in ISO format.",
                format: "date-time",
                readOnly: true,
              }),
            ),
            viewer_seconds: Type.Optional(
              Type.Number({ description: "The total view time for which the viewers watched the stream." }),
            ),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch livestream session details using a session ID")
      .description(
        "Returns livestream session details for the given session ID. Retreive the session ID using the `Fetch all sessions of an organization` API.",
      )
      .operationId("get-v2-livestreamsession-session-meetingId-active-livestream")
      .tag("Live streams")
      .security({ api_token: [] })

    g.get("/sessions/{session_id}/participants", {
      params: Type.Object({ session_id: Type.String() }),
      query: Type.Object({
        search: Type.Optional(Type.String()),
        page_no: Type.Optional(Type.Number({ minimum: 0 })),
        per_page: Type.Optional(Type.Number({ minimum: 0 })),
        sort_order: Type.Optional(Type.Union([Type.Literal("ASC"), Type.Literal("DESC")])),
        sort_by: Type.Optional(Type.Union([Type.Literal("joinedAt"), Type.Literal("duration")])),
        include_peer_events: Type.Optional(Type.Boolean({ default: false })),
        view: Type.Optional(Type.Union([Type.Literal("raw"), Type.Literal("consolidated")])),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            participants: Type.Optional(Type.Array(RealtimekitParticipantslist)),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch participants list of a session")
      .description("Returns a list of participants for the given session ID.")
      .operationId("GetSessionParticipants")
      .tag("Sessions")
      .security({ api_token: [] })

    g.get("/sessions/{session_id}/participants/{participant_id}", {
      params: Type.Object({ participant_id: Type.String(), session_id: Type.String() }),
      query: Type.Object({
        filters: Type.Optional(
          Type.Union([
            Type.Literal("device_info"),
            Type.Literal("ip_information"),
            Type.Literal("precall_network_information"),
            Type.Literal("events"),
            Type.Literal("quality_stats"),
          ]),
        ),
        include_peer_events: Type.Optional(Type.Boolean({ default: false })),
      }),
      response: Type.Object({
        data: Type.Optional(
          Type.Object({
            participant: Type.Optional(
              Type.Object({
                created_at: Type.Optional(
                  Type.String({ description: "timestamp when this participant was created.", readOnly: true }),
                ),
                custom_participant_id: Type.Optional(
                  Type.String({ description: "ID passed by client to create this participant." }),
                ),
                display_name: Type.Optional(
                  Type.String({ description: "Display name of participant when joining the session." }),
                ),
                duration: Type.Optional(
                  Type.Number({ description: "number of minutes for which the participant was in the session." }),
                ),
                id: Type.Optional(
                  Type.String({ description: "Participant ID. This maps to the corresponding peerId." }),
                ),
                joined_at: Type.Optional(
                  Type.String({ description: "timestamp at which participant joined the session." }),
                ),
                left_at: Type.Optional(
                  Type.String({ description: "timestamp at which participant left the session." }),
                ),
                preset_name: Type.Optional(
                  Type.String({ description: "Name of the preset associated with the participant." }),
                ),
                updated_at: Type.Optional(
                  Type.String({
                    description: "timestamp when this participant's data was last updated.",
                    readOnly: true,
                  }),
                ),
                user_id: Type.Optional(Type.String({ description: "User id for this participant." })),
                peer_stats: Type.Optional(
                  Type.Object({
                    config: Type.Optional(Type.String()),
                    device_info: Type.Optional(
                      Type.Object({
                        browser: Type.Optional(Type.String()),
                        browser_version: Type.Optional(Type.String()),
                        cpus: Type.Optional(Type.Number()),
                        engine: Type.Optional(Type.String()),
                        is_mobile: Type.Optional(Type.Boolean()),
                        memory: Type.Optional(Type.Number()),
                        os: Type.Optional(Type.String()),
                        os_version: Type.Optional(Type.String()),
                        sdk_name: Type.Optional(Type.String()),
                        sdk_version: Type.Optional(Type.String()),
                        user_agent: Type.Optional(Type.String()),
                        webgl_support: Type.Optional(Type.String()),
                      }),
                    ),
                    events: Type.Optional(
                      Type.Array(
                        Type.Object({
                          timestamp: Type.Optional(Type.String()),
                          type: Type.Optional(Type.String()),
                        }),
                      ),
                    ),
                    ip_information: Type.Optional(
                      Type.Object({
                        city: Type.Optional(Type.String()),
                        country: Type.Optional(Type.String()),
                        ip_location: Type.Optional(Type.String()),
                        ipv4: Type.Optional(Type.String()),
                        org: Type.Optional(Type.String()),
                        portal: Type.Optional(Type.String()),
                        region: Type.Optional(Type.String()),
                        timezone: Type.Optional(Type.String()),
                      }),
                    ),
                    precall_network_information: Type.Optional(
                      Type.Object({
                        backend_rtt: Type.Optional(Type.Number()),
                        effective_networktype: Type.Optional(Type.String()),
                        fractional_loss: Type.Optional(Type.Number()),
                        jitter: Type.Optional(Type.Number()),
                        reflexive_connectivity: Type.Optional(Type.Boolean()),
                        relay_connectivity: Type.Optional(Type.Boolean()),
                        rtt: Type.Optional(Type.Number()),
                        throughtput: Type.Optional(Type.Number()),
                        turn_connectivity: Type.Optional(Type.Boolean()),
                      }),
                    ),
                    status: Type.Optional(Type.String()),
                  }),
                ),
                quality_stats: Type.Optional(
                  Type.Array(
                    Type.Object({
                      audio_bandwidth: Type.Optional(Type.Number()),
                      audio_packet_loss: Type.Optional(Type.Number()),
                      audio_stats: Type.Optional(
                        Type.Array(
                          Type.Object({
                            concealment_events: Type.Optional(Type.Number()),
                            jitter: Type.Optional(Type.Number()),
                            packets_lost: Type.Optional(Type.Number()),
                            quality: Type.Optional(Type.Number()),
                            timestamp: Type.Optional(Type.String()),
                          }),
                        ),
                      ),
                      average_quality: Type.Optional(Type.Number()),
                      end: Type.Optional(Type.String()),
                      peer_id: Type.Optional(Type.String()),
                      start: Type.Optional(Type.String()),
                      video_bandwidth: Type.Optional(Type.Number()),
                      video_packet_loss: Type.Optional(Type.Number()),
                      video_stats: Type.Optional(
                        Type.Array(
                          Type.Object({
                            frame_height: Type.Optional(Type.Number()),
                            frame_width: Type.Optional(Type.Number()),
                            frames_dropped: Type.Optional(Type.Number()),
                            frames_per_second: Type.Optional(Type.Number()),
                            jitter: Type.Optional(Type.Number()),
                            packets_lost: Type.Optional(Type.Number()),
                            quality: Type.Optional(Type.Number()),
                            timestamp: Type.Optional(Type.String()),
                          }),
                        ),
                      ),
                    }),
                  ),
                ),
              }),
            ),
          }),
        ),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch details of a participant")
      .description("Returns details of the given participant ID along with call statistics for the given session ID.")
      .operationId("GetParticipantDetails")
      .tag("Sessions")
      .security({ api_token: [] })

    g.get("/sessions/{session_id}/summary", {
      params: Type.Object({ session_id: Type.String() }),
      response: Type.Object({
        data: Type.Optional(RealtimekitTranscriptsummary),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch summary of transcripts for a session")
      .description("Returns a Summary URL to download the Summary of Transcripts for the session ID as plain text.")
      .operationId("GetSessionSummary")
      .tag("Sessions")
      .security({ api_token: [] })

    g.post("/sessions/{session_id}/summary", {
      params: Type.Object({ session_id: Type.String() }),
      responses: {
        "2XX": Type.Object({
          data: Type.Optional(
            Type.Object({
              message: Type.Optional(Type.String()),
              success: Type.Optional(Type.Boolean()),
            }),
          ),
          success: Type.Optional(Type.Boolean()),
        }),
      },
    })
      .summary("Generate summary of Transcripts for the session")
      .description("Trigger Summary generation of Transcripts for the session ID.")
      .operationId("post-sessions-session_id-summary")
      .tag("Sessions")
      .security({ api_token: [] })

    g.get("/sessions/{session_id}/transcript", {
      params: Type.Object({ session_id: Type.String() }),
      response: Type.Object({
        data: Type.Optional(RealtimekitTranscript),
        success: Type.Optional(Type.Boolean()),
      }),
    })
      .summary("Fetch the complete transcript for a session")
      .description("Returns a URL to download the transcript for the session ID in CSV format.")
      .operationId("GetSessionTranscript")
      .tag("Sessions")
      .security({ api_token: [] })

    g.get("/webhooks", {
      response: RealtimekitWebhookslistsuccessresponse,
    })
      .summary("Fetch all webhooks details")
      .description("Returns details of all webhooks for an organization.")
      .operationId("getAllWebhooks")
      .tag("Webhooks")
      .security({ api_token: [] })

    g.post("/webhooks", {
      body: RealtimekitWebhookrequest,
      responses: {
        201: RealtimekitWebhooksuccessresponse,
        400: RealtimekitErrorresponse,
      },
    })
      .summary("Add a webhook")
      .description("Adds a new webhook to an organization.")
      .operationId("addWebhook")
      .tag("Webhooks")
      .security({ api_token: [] })

    g.get("/webhooks/{webhook_id}", {
      params: Type.Object({ webhook_id: Type.String() }),
      responses: {
        200: RealtimekitWebhooksuccessresponse,
        400: RealtimekitErrorresponse,
      },
    })
      .summary("Fetch details of a webhook")
      .description("Returns webhook details for the given webhook ID.")
      .operationId("getWebhook")
      .tag("Webhooks")
      .security({ api_token: [] })

    g.put("/webhooks/{webhook_id}", {
      params: Type.Object({ webhook_id: Type.String() }),
      body: RealtimekitWebhookrequest,
      responses: {
        200: RealtimekitWebhooksuccessresponse,
        400: RealtimekitErrorresponse,
      },
    })
      .summary("Replace a webhook")
      .description("Replace all details for the given webhook ID.")
      .operationId("replaceWebhook")
      .tag("Webhooks")
      .security({ api_token: [] })

    g.patch("/webhooks/{webhook_id}", {
      params: Type.Object({ webhook_id: Type.String() }),
      body: RealtimekitPatchwebhookrequest,
      responses: {
        200: RealtimekitWebhooksuccessresponse,
        400: RealtimekitErrorresponse,
      },
    })
      .summary("Edit a webhook")
      .description("Edits the webhook details for the given webhook ID.")
      .operationId("editWebhook")
      .tag("Webhooks")
      .security({ api_token: [] })

    g.delete("/webhooks/{webhook_id}", {
      params: Type.Object({ webhook_id: Type.String() }),
      responses: {
        200: RealtimekitWebhooksuccessresponse,
        400: RealtimekitErrorresponse,
      },
    })
      .summary("Delete a webhook")
      .description("Removes a webhook for the given webhook ID.")
      .operationId("deleteWebhook")
      .tag("Webhooks")
      .security({ api_token: [] })
  })
}

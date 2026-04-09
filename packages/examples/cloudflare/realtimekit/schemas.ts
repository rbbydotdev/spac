import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const RealtimekitPatchwebhookrequest = named(
  "realtimekit_PatchWebhookRequest",
  Type.Object({
    enabled: Type.Optional(Type.Boolean({ default: true })),
    events: Type.Optional(
      Type.Array(
        Type.Union([
          Type.Literal("meeting.started"),
          Type.Literal("meeting.ended"),
          Type.Literal("meeting.participantJoined"),
          Type.Literal("meeting.participantLeft"),
          Type.Literal("recording.statusUpdate"),
          Type.Literal("livestreaming.statusUpdate"),
          Type.Literal("meeting.chatSynced"),
          Type.Literal("meeting.transcript"),
          Type.Literal("meeting.summary"),
        ]),
        { description: "Events that the webhook will get triggered by" },
      ),
    ),
    name: Type.Optional(Type.String({ description: "Name of the webhook" })),
    url: Type.Optional(Type.String({ description: "URL the webhook will send events to", format: "uri" })),
  }),
)

export const RealtimekitWebhook = named(
  "realtimekit_Webhook",
  Type.Object({
    created_at: Type.String({
      description: "Timestamp when this webhook was created",
      format: "date-time",
      readOnly: true,
    }),
    enabled: Type.Boolean({ description: "Set to true if the webhook is active" }),
    events: Type.Array(
      Type.Union([
        Type.Literal("meeting.started"),
        Type.Literal("meeting.ended"),
        Type.Literal("meeting.participantJoined"),
        Type.Literal("meeting.participantLeft"),
        Type.Literal("meeting.chatSynced"),
        Type.Literal("recording.statusUpdate"),
        Type.Literal("livestreaming.statusUpdate"),
        Type.Literal("meeting.transcript"),
        Type.Literal("meeting.summary"),
      ]),
      { description: "Events this webhook will send updates for" },
    ),
    id: Type.String({ description: "ID of the webhook", format: "uuid", readOnly: true }),
    name: Type.String({ description: "Name of the webhook" }),
    updated_at: Type.String({
      description: "Timestamp when this webhook was updated",
      format: "date-time",
      readOnly: true,
    }),
    url: Type.String({ description: "URL the webhook will send events to", format: "uri" }),
  }),
)

export const RealtimekitWebhooksuccessresponse = named(
  "realtimekit_WebhookSuccessResponse",
  Type.Object({
    data: RealtimekitWebhook,
    success: Type.Boolean(),
  }),
)

export const RealtimekitWebhookrequest = named(
  "realtimekit_WebhookRequest",
  Type.Object({
    enabled: Type.Optional(
      Type.Boolean({ description: "Set whether or not the webhook should be active when created", default: true }),
    ),
    events: Type.Array(
      Type.Union([
        Type.Literal("meeting.started"),
        Type.Literal("meeting.ended"),
        Type.Literal("meeting.participantJoined"),
        Type.Literal("meeting.participantLeft"),
        Type.Literal("meeting.chatSynced"),
        Type.Literal("recording.statusUpdate"),
        Type.Literal("livestreaming.statusUpdate"),
        Type.Literal("meeting.transcript"),
        Type.Literal("meeting.summary"),
      ]),
      { description: "Events that this webhook will get triggered by" },
    ),
    name: Type.String({ description: "Name of the webhook" }),
    url: Type.String({ description: "URL this webhook will send events to", format: "uri" }),
  }),
)

export const RealtimekitWebhookslistsuccessresponse = named(
  "realtimekit_WebhooksListSuccessResponse",
  Type.Object({
    data: Type.Array(RealtimekitWebhook),
    success: Type.Boolean(),
  }),
)

export const RealtimekitTranscript = named(
  "realtimekit_Transcript",
  Type.Object({
    sessionId: Type.String(),
    transcript_download_url: Type.String({ description: "URL where the transcript can be downloaded" }),
    transcript_download_url_expiry: Type.String({ description: "Time when the download URL will expire" }),
  }),
)

export const RealtimekitTranscriptsummary = named(
  "realtimekit_TranscriptSummary",
  Type.Object({
    sessionId: Type.String(),
    summaryDownloadUrl: Type.String({ description: "URL where the summary of transcripts can be downloaded" }),
    summaryDownloadUrlExpiry: Type.String({
      description: "Time of Expiry before when you need to download the csv file.",
    }),
  }),
)

export const RealtimekitParticipantslist = named(
  "realtimekit_ParticipantsList",
  Type.Object({
    created_at: Type.Optional(
      Type.String({ description: "timestamp when this participant was created.", readOnly: true }),
    ),
    custom_participant_id: Type.Optional(
      Type.String({ description: "ID passed by client to create this participant." }),
    ),
    display_name: Type.Optional(Type.String({ description: "Display name of participant when joining the session." })),
    duration: Type.Optional(
      Type.Number({ description: "number of minutes for which the participant was in the session." }),
    ),
    id: Type.Optional(Type.String({ description: "Participant ID. This maps to the corresponding peerId." })),
    joined_at: Type.Optional(Type.String({ description: "timestamp at which participant joined the session." })),
    left_at: Type.Optional(Type.String({ description: "timestamp at which participant left the session." })),
    preset_name: Type.Optional(Type.String({ description: "Name of the preset associated with the participant." })),
    updated_at: Type.Optional(
      Type.String({ description: "timestamp when this participant's data was last updated.", readOnly: true }),
    ),
    user_id: Type.Optional(Type.String({ description: "User id for this participant." })),
  }),
)

export const RealtimekitChatmessage = named(
  "realtimekit_ChatMessage",
  Type.Object({
    chat_download_url: Type.String({ description: "URL where the chat logs can be downloaded" }),
    chat_download_url_expiry: Type.String({ description: "Time when the download URL will expire" }),
  }),
)

export const RealtimekitStorageconfig = named(
  "realtimekit_StorageConfig",
  Type.Union([
    Type.Object({
      access_key: Type.Optional(
        Type.String({
          description:
            "Access key of the storage medium. Access key is not required for the `gcs` storage media type.\n\nNote that this field is not readable by clients, only writeable.",
          writeOnly: true,
        }),
      ),
      auth_method: Type.Optional(
        Type.Union([Type.Literal("KEY"), Type.Literal("PASSWORD")], {
          description: 'Authentication method used for "sftp" type storage medium\n',
        }),
      ),
      bucket: Type.Optional(Type.String({ description: "Name of the storage medium's bucket." })),
      host: Type.Optional(Type.String({ description: "SSH destination server host for SFTP type storage medium" })),
      password: Type.Optional(
        Type.String({
          description:
            'SSH destination server password for SFTP type storage medium when auth_method is "PASSWORD". If auth_method is "KEY", this specifies the password for the ssh private key.',
        }),
      ),
      path: Type.Optional(
        Type.String({ description: "Path relative to the bucket root at which the recording will be placed." }),
      ),
      port: Type.Optional(Type.Number({ description: "SSH destination server port for SFTP type storage medium" })),
      private_key: Type.Optional(
        Type.String({
          description:
            'Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is "KEY"',
        }),
      ),
      region: Type.Optional(Type.String({ description: "Region of the storage medium." })),
      secret: Type.Optional(
        Type.String({
          description:
            "Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.",
        }),
      ),
      type: Type.Union(
        [
          Type.Literal("aws"),
          Type.Literal("azure"),
          Type.Literal("digitalocean"),
          Type.Literal("gcs"),
          Type.Literal("sftp"),
        ],
        { description: "Type of storage media." },
      ),
      username: Type.Optional(
        Type.String({ description: "SSH destination server username for SFTP type storage medium" }),
      ),
    }),
    Type.Null(),
  ]),
)

export const RealtimekitTracklayeroutput = named(
  "realtimekit_TrackLayerOutput",
  Type.Object({
    storage_config: Type.Optional(RealtimekitStorageconfig),
    type: Type.Optional(
      Type.Union([Type.Literal("REALTIMEKIT_BUCKET"), Type.Literal("STORAGE_CONFIG")], {
        description: "The type of output destination this layer is being exported to.",
      }),
    ),
  }),
)

export const RealtimekitTrackconfiglayer = named(
  "realtimekit_TrackConfigLayer",
  Type.Object({
    file_name_prefix: Type.Optional(
      Type.String({ description: "A file name prefix to apply for files generated from this layer" }),
    ),
    outputs: Type.Optional(Type.Array(RealtimekitTracklayeroutput)),
  }),
)

export const RealtimekitRecording = named(
  "realtimekit_Recording",
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
      Type.String({ description: "Timestamp when the download URL expires.", format: "date-time", readOnly: true }),
      Type.Null(),
    ]),
    file_size: Type.Union([
      Type.Number({ description: "File size of the recording, in bytes.", readOnly: true }),
      Type.Null(),
    ]),
    id: Type.String({ description: "ID of the recording", format: "uuid", readOnly: true }),
    invoked_time: Type.String({ description: "Timestamp when this recording was invoked.", format: "date-time" }),
    output_file_name: Type.String({ description: "File name of the recording." }),
    recording_duration: Type.Optional(Type.Integer({ description: "Total recording time in seconds." })),
    session_id: Type.Union([
      Type.String({ description: "ID of the meeting session this recording is for.", format: "uuid", readOnly: true }),
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
  }),
)

export const RealtimekitStopreason = named(
  "realtimekit_stopReason",
  Type.Object({
    caller: Type.Optional(
      Type.Object({
        name: Type.Optional(Type.String({ description: "Name of the user who stopped the recording." })),
        type: Type.Optional(
          Type.Union([Type.Literal("ORGANIZATION"), Type.Literal("USER")], {
            description:
              "The type can be an organization or a user. If the type is `user`, then only the `user_Id` and `name` are returned.",
          }),
        ),
        user_Id: Type.Optional(
          Type.String({ description: "The user ID of the person who stopped the recording.", format: "uuid" }),
        ),
      }),
    ),
    reason: Type.Optional(
      Type.Union([Type.Literal("API_CALL"), Type.Literal("INTERNAL_ERROR"), Type.Literal("ALL_PEERS_LEFT")], {
        description: "Specifies the reason why the recording stopped.",
      }),
    ),
  }),
)

export const RealtimekitStartreason = named(
  "realtimekit_startReason",
  Type.Object({
    caller: Type.Optional(
      Type.Object({
        name: Type.Optional(Type.String({ description: "Name of the user who started the recording." })),
        type: Type.Optional(
          Type.Union([Type.Literal("ORGANIZATION"), Type.Literal("USER")], {
            description:
              "The type can be an organization or a user. If the type is `user`, then only the `user_Id` and `name` are returned.",
          }),
        ),
        user_Id: Type.Optional(
          Type.String({ description: "The user ID of the person who started the recording.", format: "uuid" }),
        ),
      }),
    ),
    reason: Type.Optional(
      Type.Union([Type.Literal("API_CALL"), Type.Literal("RECORD_ON_START")], {
        description:
          'Specifies if the recording was started using the "Start a Recording"API or using the parameter RECORD_ON_START in the "Create a meeting" API. \n\nIf the recording is initiated using the "RECORD_ON_START" parameter, the user details will not be populated.',
      }),
    ),
  }),
)

export const RealtimekitVideoconfig = named(
  "realtimekit_VideoConfig",
  Type.Object({
    codec: Type.Optional(
      Type.Union([Type.Literal("H264"), Type.Literal("VP8")], {
        description: "Codec using which the recording will be encoded.",
      }),
    ),
    export_file: Type.Optional(
      Type.Boolean({ description: "Controls whether to export video file seperately", default: true }),
    ),
    height: Type.Optional(
      Type.Integer({ description: "Height of the recording video in pixels", default: 720, minimum: 1, maximum: 1920 }),
    ),
    watermark: Type.Optional(
      Type.Object(
        {
          position: Type.Optional(
            Type.Union(
              [
                Type.Literal("left top"),
                Type.Literal("right top"),
                Type.Literal("left bottom"),
                Type.Literal("right bottom"),
              ],
              { description: "Position of the watermark" },
            ),
          ),
          size: Type.Optional(
            Type.Object(
              {
                height: Type.Optional(Type.Integer({ description: "Height of the watermark in px", minimum: 1 })),
                width: Type.Optional(Type.Integer({ description: "Width of the watermark in px", minimum: 1 })),
              },
              { description: "Size of the watermark" },
            ),
          ),
          url: Type.Optional(Type.String({ description: "URL of the watermark image", format: "uri" })),
        },
        { description: "Watermark to be added to the recording" },
      ),
    ),
    width: Type.Optional(
      Type.Integer({ description: "Width of the recording video in pixels", default: 1280, minimum: 1, maximum: 1920 }),
    ),
  }),
)

export const RealtimekitLivestreamingconfig = named(
  "realtimekit_LivestreamingConfig",
  Type.Object({
    rtmp_url: Type.Optional(Type.String({ description: "RTMP URL to stream to", format: "uri" })),
  }),
)

export const RealtimekitRealtimekitbucketconfig = named(
  "realtimekit_realtimekitBucketConfig",
  Type.Object({
    enabled: Type.Boolean({
      description:
        "Controls whether recordings are uploaded to RealtimeKit's bucket. If set to false, `download_url`, `audio_download_url`, `download_url_expiry` won't be generated for a recording.",
    }),
  }),
)

export const RealtimekitInteractiveconfig = named(
  "realtimekit_InteractiveConfig",
  Type.Object(
    {
      type: Type.Optional(
        Type.Union([Type.Literal("ID3")], { description: "The metadata is presented in the form of ID3 tags." }),
      ),
    },
    {
      description:
        "Allows you to add timed metadata to your recordings, which are digital markers inserted into a video file to provide contextual information at specific points in the content range. The ID3 tags containing this information are available to clients on the playback timeline in HLS format. The output files are generated in a compressed .tar format.",
    },
  ),
)

export const RealtimekitAudioconfig = named(
  "realtimekit_AudioConfig",
  Type.Object(
    {
      channel: Type.Optional(
        Type.Union([Type.Literal("mono"), Type.Literal("stereo")], {
          description: "Audio signal pathway within an audio file that carries a specific sound source.",
        }),
      ),
      codec: Type.Optional(
        Type.Union([Type.Literal("MP3"), Type.Literal("AAC")], {
          description:
            "Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, the codec in the audioConfig is automatically set to vorbis.",
        }),
      ),
      export_file: Type.Optional(
        Type.Boolean({ description: "Controls whether to export audio file seperately", default: true }),
      ),
    },
    { description: "Object containing configuration regarding the audio that is being recorded." },
  ),
)

export const RealtimekitUpdatepreset = named(
  "realtimekit_UpdatePreset",
  Type.Object({
    config: Type.Optional(
      Type.Object({
        max_screenshare_count: Type.Optional(
          Type.Integer({ description: "Maximum number of screen shares that can be active at a given time" }),
        ),
        max_video_streams: Type.Optional(
          Type.Object(
            {
              desktop: Type.Optional(
                Type.Integer({ description: "Maximum number of video streams visible on desktop devices" }),
              ),
              mobile: Type.Optional(
                Type.Integer({ description: "Maximum number of streams visible on mobile devices" }),
              ),
            },
            { description: "Maximum number of streams that are visible on a device" },
          ),
        ),
        media: Type.Optional(
          Type.Object(
            {
              screenshare: Type.Optional(
                Type.Object(
                  {
                    frame_rate: Type.Optional(Type.Integer({ description: "Frame rate of screen share" })),
                    quality: Type.Optional(
                      Type.Union([Type.Literal("hd"), Type.Literal("vga"), Type.Literal("qvga")], {
                        description: "Quality of screen share ",
                      }),
                    ),
                  },
                  { description: "Configuration options for participant screen shares" },
                ),
              ),
              video: Type.Optional(
                Type.Object(
                  {
                    frame_rate: Type.Optional(
                      Type.Integer({ description: "Frame rate of participants' video", maximum: 30 }),
                    ),
                    quality: Type.Optional(
                      Type.Union([Type.Literal("hd"), Type.Literal("vga"), Type.Literal("qvga")], {
                        description: "Video quality of participants",
                      }),
                    ),
                  },
                  { description: "Configuration options for participant videos" },
                ),
              ),
            },
            { description: "Media configuration options. eg: Video quality" },
          ),
        ),
        view_type: Type.Optional(
          Type.Union([Type.Literal("GROUP_CALL"), Type.Literal("WEBINAR"), Type.Literal("AUDIO_ROOM")], {
            description: "Type of the meeting",
          }),
        ),
      }),
    ),
    name: Type.Optional(Type.String({ description: "Name of the preset" })),
    permissions: Type.Optional(
      Type.Object({
        accept_waiting_requests: Type.Optional(
          Type.Boolean({ description: "Whether this participant can accept waiting requests" }),
        ),
        can_accept_production_requests: Type.Optional(Type.Boolean()),
        can_change_participant_permissions: Type.Optional(Type.Boolean()),
        can_edit_display_name: Type.Optional(Type.Boolean()),
        can_livestream: Type.Optional(Type.Boolean()),
        can_record: Type.Optional(Type.Boolean()),
        can_spotlight: Type.Optional(Type.Boolean()),
        chat: Type.Optional(
          Type.Object(
            {
              private: Type.Optional(
                Type.Object({
                  can_receive: Type.Optional(Type.Boolean()),
                  can_send: Type.Optional(Type.Boolean()),
                  files: Type.Optional(Type.Boolean()),
                  text: Type.Optional(Type.Boolean()),
                }),
              ),
              public: Type.Optional(
                Type.Object({
                  can_send: Type.Optional(Type.Boolean({ description: "Can send messages in general" })),
                  files: Type.Optional(Type.Boolean({ description: "Can send file messages" })),
                  text: Type.Optional(Type.Boolean({ description: "Can send text messages" })),
                }),
              ),
            },
            { description: "Chat permissions" },
          ),
        ),
        connected_meetings: Type.Optional(
          Type.Object({
            can_alter_connected_meetings: Type.Optional(Type.Boolean()),
            can_switch_connected_meetings: Type.Optional(Type.Boolean()),
            can_switch_to_parent_meeting: Type.Optional(Type.Boolean()),
          }),
        ),
        disable_participant_audio: Type.Optional(Type.Boolean()),
        disable_participant_screensharing: Type.Optional(Type.Boolean()),
        disable_participant_video: Type.Optional(Type.Boolean()),
        hidden_participant: Type.Optional(
          Type.Boolean({ description: "Whether this participant is visible to others or not" }),
        ),
        is_recorder: Type.Optional(Type.Boolean({ default: false })),
        kick_participant: Type.Optional(Type.Boolean()),
        media: Type.Optional(
          Type.Object(
            {
              audio: Type.Optional(
                Type.Object(
                  {
                    can_produce: Type.Optional(
                      Type.Union([Type.Literal("ALLOWED"), Type.Literal("NOT_ALLOWED"), Type.Literal("CAN_REQUEST")], {
                        description: "Can produce audio",
                      }),
                    ),
                  },
                  { description: "Audio permissions" },
                ),
              ),
              screenshare: Type.Optional(
                Type.Object(
                  {
                    can_produce: Type.Optional(
                      Type.Union([Type.Literal("ALLOWED"), Type.Literal("NOT_ALLOWED"), Type.Literal("CAN_REQUEST")], {
                        description: "Can produce screen share video",
                      }),
                    ),
                  },
                  { description: "Screenshare permissions" },
                ),
              ),
              video: Type.Optional(
                Type.Object(
                  {
                    can_produce: Type.Optional(
                      Type.Union([Type.Literal("ALLOWED"), Type.Literal("NOT_ALLOWED"), Type.Literal("CAN_REQUEST")], {
                        description: "Can produce video",
                      }),
                    ),
                  },
                  { description: "Video permissions" },
                ),
              ),
            },
            { description: "Media permissions" },
          ),
        ),
        pin_participant: Type.Optional(Type.Boolean()),
        plugins: Type.Optional(
          Type.Object(
            {
              can_close: Type.Optional(Type.Boolean({ description: "Can close plugins that are already open" })),
              can_edit_config: Type.Optional(Type.Boolean({ description: "Can edit plugin config" })),
              can_start: Type.Optional(Type.Boolean({ description: "Can start plugins" })),
              config: Type.Optional(
                Type.Union([
                  Type.String({ format: "uuid" }),
                  Type.Object({
                    access_control: Type.Optional(Type.Union([Type.Literal("FULL_ACCESS"), Type.Literal("VIEW_ONLY")])),
                    handles_view_only: Type.Optional(Type.Boolean()),
                  }),
                ]),
              ),
            },
            { description: "Plugin permissions" },
          ),
        ),
        polls: Type.Optional(
          Type.Object(
            {
              can_create: Type.Optional(Type.Boolean({ description: "Can create polls" })),
              can_view: Type.Optional(Type.Boolean({ description: "Can view polls" })),
              can_vote: Type.Optional(Type.Boolean({ description: "Can vote on polls" })),
            },
            { description: "Poll permissions" },
          ),
        ),
        recorder_type: Type.Optional(
          Type.Union([Type.Literal("RECORDER"), Type.Literal("LIVESTREAMER"), Type.Literal("NONE")], {
            description: "Type of the recording peer",
          }),
        ),
        show_participant_list: Type.Optional(Type.Boolean()),
        waiting_room_type: Type.Optional(
          Type.Union([Type.Literal("SKIP"), Type.Literal("ON_PRIVILEGED_USER_ENTRY"), Type.Literal("SKIP_ON_ACCEPT")], {
            description: "Waiting room type",
          }),
        ),
      }),
    ),
    ui: Type.Optional(
      Type.Object({
        config_diff: Type.Optional(Type.Unknown()),
        design_tokens: Type.Optional(
          Type.Object({
            border_radius: Type.Optional(Type.Union([Type.Literal("rounded")])),
            border_width: Type.Optional(Type.Union([Type.Literal("thin")])),
            colors: Type.Optional(
              Type.Object({
                background: Type.Optional(
                  Type.Object({
                    "600": Type.Optional(Type.String({ default: "#222222" })),
                    "700": Type.Optional(Type.String({ default: "#1f1f1f" })),
                    "800": Type.Optional(Type.String({ default: "#1b1b1b" })),
                    "900": Type.Optional(Type.String({ default: "#181818" })),
                    "1000": Type.Optional(Type.String({ default: "#141414" })),
                  }),
                ),
                brand: Type.Optional(
                  Type.Object({
                    "300": Type.Optional(Type.String({ default: "#844d1c" })),
                    "400": Type.Optional(Type.String({ default: "#9d5b22" })),
                    "500": Type.Optional(Type.String({ default: "#b56927" })),
                    "600": Type.Optional(Type.String({ default: "#d37c30" })),
                    "700": Type.Optional(Type.String({ default: "#d9904f" })),
                  }),
                ),
                danger: Type.Optional(Type.String({ default: "#FF2D2D" })),
                success: Type.Optional(Type.String({ default: "#62A504" })),
                text: Type.Optional(Type.String({ default: "#EEEEEE" })),
                text_on_brand: Type.Optional(Type.String({ default: "#EEEEEE" })),
                video_bg: Type.Optional(Type.String({ default: "#191919" })),
                warning: Type.Optional(Type.String({ default: "#FFCD07" })),
              }),
            ),
            logo: Type.Optional(Type.String()),
            spacing_base: Type.Optional(Type.Number({ default: 4 })),
            theme: Type.Optional(Type.Union([Type.Literal("dark")])),
          }),
        ),
      }),
    ),
  }),
)

export const RealtimekitPreset = named(
  "realtimekit_Preset",
  Type.Object({
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
        accept_waiting_requests: Type.Boolean({ description: "Whether this participant can accept waiting requests" }),
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
        hidden_participant: Type.Boolean({ description: "Whether this participant is visible to others or not" }),
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
        recorder_type: Type.Union([Type.Literal("RECORDER"), Type.Literal("LIVESTREAMER"), Type.Literal("NONE")], {
          description: "Type of the recording peer",
        }),
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
  }),
)

export const RealtimekitPresetlistitem = named(
  "realtimekit_PresetListItem",
  Type.Object(
    {
      created_at: Type.Optional(
        Type.String({ description: "Timestamp this preset was created at", format: "date-time", readOnly: true }),
      ),
      id: Type.Optional(Type.String({ description: "ID of the preset", format: "uuid" })),
      name: Type.Optional(Type.String({ description: "Name of the preset" })),
      updated_at: Type.Optional(
        Type.String({ description: "Timestamp this preset was last updated", format: "date-time", readOnly: true }),
      ),
    },
    { description: "Returned by Get All Presets route" },
  ),
)

export const RealtimekitPatchorganizationrequest = named(
  "realtimekit_PatchOrganizationRequest",
  Type.Object({
    contact: Type.Optional(Type.String()),
    feature_flags: Type.Optional(Type.Array(Type.String())),
    name: Type.Optional(Type.String({ description: "Must be a unique organization name" })),
    preferred_region: Type.Optional(
      Type.Union([
        Type.Literal("ap-south-1"),
        Type.Literal("ap-southeast-1"),
        Type.Literal("us-east-1"),
        Type.Literal("eu-central-1"),
      ]),
    ),
    website: Type.Optional(Type.String({ format: "uri" })),
  }),
)

export const RealtimekitOrganizationdata = named(
  "realtimekit_OrganizationData",
  Type.Object({
    apikey: Type.String(),
    contact: Type.String(),
    created_at: Type.String({ format: "date-time", readOnly: true }),
    feature_flags: Type.Array(Type.String()),
    id: Type.String({ description: "ID of the organization", format: "uuid" }),
    name: Type.String({ description: "Must be a unique organization name" }),
    preferred_region: Type.String(),
    updated_at: Type.String({ format: "date-time", readOnly: true }),
    website: Type.String({ format: "uri" }),
  }),
)

export const RealtimekitOrganizationsuccessresponse = named(
  "realtimekit_OrganizationSuccessResponse",
  Type.Object({
    data: RealtimekitOrganizationdata,
    success: Type.Boolean(),
  }),
)

export const RealtimekitOrganizationrequest = named(
  "realtimekit_OrganizationRequest",
  Type.Object({
    contact: Type.String(),
    feature_flags: Type.Optional(Type.Array(Type.String())),
    name: Type.String({ description: "Must be a unique organization name" }),
    preferred_region: Type.Optional(
      Type.Union([
        Type.Literal("ap-south-1"),
        Type.Literal("ap-southeast-1"),
        Type.Literal("us-east-1"),
        Type.Literal("eu-central-1"),
      ]),
    ),
    website: Type.String({ format: "uri" }),
  }),
)

export const RealtimekitErrorresponse = named(
  "realtimekit_ErrorResponse",
  Type.Object({
    error: Type.Object(
      {
        code: Type.Number({ description: "Error code" }),
        message: Type.String({ description: "Error message" }),
      },
      { description: "Object containing details of the error that occurred" },
    ),
    success: Type.Boolean({ description: "Whether the operation succeeded or not" }),
  }),
)

export const RealtimekitOrganizationlistsuccessresponse = named(
  "realtimekit_OrganizationListSuccessResponse",
  Type.Object({
    data: Type.Array(RealtimekitOrganizationdata),
    paging: Type.Object({
      end_offset: Type.Number(),
      start_offset: Type.Number(),
      total_count: Type.Number(),
    }),
    success: Type.Boolean(),
  }),
)

export const RealtimekitParticipant = named(
  "realtimekit_Participant",
  Type.Object(
    {
      created_at: Type.String({
        description: "When this object was created. The time is returned in ISO format.",
        format: "date-time",
        readOnly: true,
      }),
      custom_participant_id: Type.String({ description: "A unique participant ID generated by the client." }),
      id: Type.String({ description: "ID of the participant.", format: "uuid" }),
      name: Type.Optional(Type.Union([Type.String({ description: "Name of the participant." }), Type.Null()])),
      picture: Type.Optional(
        Type.Union([Type.String({ description: "URL to a picture of the participant.", format: "uri" }), Type.Null()]),
      ),
      preset_name: Type.String({ description: "Preset applied to the participant." }),
      updated_at: Type.String({
        description: "When this object was updated. The time is returned in ISO format.",
        format: "date-time",
        readOnly: true,
      }),
    },
    { description: "Represents a participant." },
  ),
)

export const RealtimekitPoll = named(
  "realtimekit_Poll",
  Type.Object({
    anonymous: Type.Optional(Type.Boolean()),
    created_by: Type.Optional(Type.String()),
    hide_votes: Type.Optional(Type.Boolean()),
    id: Type.String({ description: "ID of the poll", readOnly: true }),
    options: Type.Array(
      Type.Object({
        count: Type.Number(),
        text: Type.String({ description: "Text of the answer option" }),
        votes: Type.Array(
          Type.Object({
            id: Type.String(),
            name: Type.String(),
          }),
        ),
      }),
      { description: "Answer options" },
    ),
    question: Type.String({ description: "Question asked by the poll" }),
    voted: Type.Optional(Type.Array(Type.String())),
  }),
)

export const RealtimekitSessionparticipant = named(
  "realtimekit_SessionParticipant",
  Type.Object({
    created_at: Type.String({ readOnly: true }),
    email: Type.Optional(Type.String({ description: "Email of the session participant." })),
    id: Type.String({ description: "ID of the session participant" }),
    name: Type.Optional(Type.String({ description: "Name of the session participant." })),
    picture: Type.Optional(Type.String({ description: "A URL pointing to a picture of the participant." })),
    updated_at: Type.String({ readOnly: true }),
  }),
)

export const RealtimekitActivesession = named(
  "realtimekit_ActiveSession",
  Type.Recursive((This) =>
    Type.Object({
      associated_id: Type.String({
        description:
          "ID of the meeting this session is associated with. In the case of V2 meetings, it is always a UUID. In V1 meetings, it is a room name of the form `abcdef-ghijkl`",
      }),
      breakout_rooms: Type.Optional(Type.Array(This, { readOnly: true })),
      created_at: Type.String({ description: "timestamp when session created", readOnly: true }),
      ended_at: Type.Optional(Type.String({ description: "timestamp when session ended" })),
      id: Type.String({ description: "ID of the session", readOnly: true }),
      live_participants: Type.Number({ description: "number of participants currently in the session" }),
      max_concurrent_participants: Type.Number({
        description: "number of maximum participants that were in the session",
      }),
      meeting_display_name: Type.String({ description: "Title of the meeting this session belongs to" }),
      meta: Type.Optional(Type.Unknown({ description: "Any meta data about session." })),
      minutes_consumed: Type.Number({ description: "number of minutes consumed since the session started" }),
      organization_id: Type.String({ description: "Organization id that hosted this session" }),
      started_at: Type.String({ description: "timestamp when session started" }),
      status: Type.Union([Type.Literal("LIVE"), Type.Literal("ENDED")], { description: "current status of session" }),
      type: Type.Union([Type.Literal("meeting"), Type.Literal("livestream"), Type.Literal("participant")], {
        description: "type of session",
      }),
      updated_at: Type.String({ description: "timestamp when session was last updated", readOnly: true }),
    }),
  ),
)

export const RealtimekitGenericerrorresponse = named(
  "realtimekit_GenericErrorResponse",
  Type.Object({
    error: Type.Object({
      code: Type.Number({ description: "HTTP status code of the error." }),
      message: Type.String({ description: "Error message describing what went wrong." }),
    }),
    success: Type.Boolean({ description: "Success status of the request.", default: false }),
  }),
)

export const RealtimekitRecordingconfig = named(
  "realtimekit_RecordingConfig",
  Type.Object(
    {
      audio_config: Type.Optional(RealtimekitAudioconfig),
      file_name_prefix: Type.Optional(
        Type.String({ description: "Adds a prefix to the beginning of the file name of the recording." }),
      ),
      live_streaming_config: Type.Optional(RealtimekitLivestreamingconfig),
      max_seconds: Type.Optional(
        Type.Number({
          description:
            "Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.",
          minimum: 60,
          maximum: 86400,
        }),
      ),
      realtimekit_bucket_config: Type.Optional(RealtimekitRealtimekitbucketconfig),
      storage_config: Type.Optional(RealtimekitStorageconfig),
      video_config: Type.Optional(RealtimekitVideoconfig),
    },
    {
      description:
        "Recording Configurations to be used for this meeting. This level of configs takes higher preference over organization level configs on the RealtimeKit developer portal.\n",
    },
  ),
)

export const RealtimekitSummarizationconfig = named(
  "realtimekit_SummarizationConfig",
  Type.Object(
    {
      summary_type: Type.Optional(
        Type.Union(
          [
            Type.Literal("general"),
            Type.Literal("team_meeting"),
            Type.Literal("sales_call"),
            Type.Literal("client_check_in"),
            Type.Literal("interview"),
            Type.Literal("daily_standup"),
            Type.Literal("one_on_one_meeting"),
            Type.Literal("lecture"),
            Type.Literal("code_review"),
          ],
          { description: "Defines the style of the summary, such as general, team meeting, or sales call." },
        ),
      ),
      text_format: Type.Optional(
        Type.Union([Type.Literal("plain_text"), Type.Literal("markdown")], {
          description: "Determines the text format of the summary, such as plain text or markdown.",
        }),
      ),
      word_limit: Type.Optional(
        Type.Integer({
          description: "Sets the maximum number of words in the meeting summary.",
          default: 500,
          minimum: 150,
          maximum: 1000,
        }),
      ),
    },
    { description: "Summary Config" },
  ),
)

export const RealtimekitTranscriptionconfig = named(
  "realtimekit_TranscriptionConfig",
  Type.Object(
    {
      keywords: Type.Optional(
        Type.Array(Type.String(), {
          description: "Adds specific terms to improve accurate detection during transcription.",
        }),
      ),
      language: Type.Optional(
        Type.Union(
          [
            Type.Literal("en-US"),
            Type.Literal("en-IN"),
            Type.Literal("de"),
            Type.Literal("hi"),
            Type.Literal("sv"),
            Type.Literal("ru"),
            Type.Literal("pl"),
            Type.Literal("el"),
            Type.Literal("fr"),
            Type.Literal("nl"),
          ],
          { description: "Specifies the language code for transcription to ensure accurate results." },
        ),
      ),
      profanity_filter: Type.Optional(
        Type.Boolean({ description: "Control the inclusion of offensive language in transcriptions.", default: false }),
      ),
    },
    { description: "Transcription Configurations" },
  ),
)

export const RealtimekitAiconfig = named(
  "realtimekit_AIConfig",
  Type.Object(
    {
      summarization: Type.Optional(RealtimekitSummarizationconfig),
      transcription: Type.Optional(RealtimekitTranscriptionconfig),
    },
    { description: "The AI Config allows you to customize the behavior of meeting transcriptions and summaries" },
  ),
)

export const RealtimekitMeeting = named(
  "realtimekit_Meeting",
  Type.Object({
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
        description: "Specifies if the meeting should start getting recorded as soon as someone joins the meeting.",
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
  }),
)

export const RealtimekitSuccess = named("realtimekit_success", Type.Boolean())

export const RealtimekitLivestreambase = named(
  "realtimekit_LivestreamBase",
  Type.Object({
    created_at: Type.Optional(
      Type.String({
        description: "The timestamp at which the livestream was created. The time is returned in ISO format.",
        format: "date-time",
        readOnly: true,
      }),
    ),
    disabled: Type.Optional(Type.Boolean({ description: "Specifies if the livestream was disabled." })),
    id: Type.Optional(Type.String({ description: "The livestream ID." })),
    ingest_server: Type.Optional(
      Type.String({ description: "The server URL to which the RTMP encoder sends the video and audio data." }),
    ),
    meeting_id: Type.Optional(Type.Union([Type.String({ description: "ID of the meeting." }), Type.Null()])),
    name: Type.Optional(Type.Union([Type.String({ description: "Name of the livestream." }), Type.Null()])),
    org_id: Type.Optional(Type.String()),
    playback_url: Type.Optional(
      Type.String({ description: "The web address that viewers can use to watch the livestream." }),
    ),
    status: Type.Optional(
      Type.Union([Type.Literal("LIVE"), Type.Literal("IDLE"), Type.Literal("ERRORED"), Type.Literal("INVOKED")], {
        description: "The status of the livestream.",
      }),
    ),
    stream_key: Type.Optional(Type.String({ description: "Unique key for accessing each livestream." })),
    updated_at: Type.Optional(
      Type.String({
        description: "The timestamp at which the livestream was updated. The time is returned in ISO format.",
        format: "date-time",
        readOnly: true,
      }),
    ),
  }),
)

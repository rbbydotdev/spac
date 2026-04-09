import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"

export const StreamSignedTokenResponse = named(
  "stream_signed_token_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        token: Type.Optional(
          Type.String({ description: "The signed token used with the signed URLs feature.", "x-sensitive": true }),
        ),
      }),
    ),
  }),
)

export const StreamAccessrules = named(
  "stream_accessRules",
  Type.Object(
    {
      action: Type.Optional(
        Type.Union([Type.Literal("allow"), Type.Literal("block")], {
          description:
            "The action to take when a request matches a rule. If the action is `block`, the signed token blocks views for viewers matching the rule.",
          "x-auditable": true,
        }),
      ),
      country: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "An array of 2-letter country codes in ISO 3166-1 Alpha-2 format used to match requests.",
        }),
      ),
      ip: Type.Optional(
        Type.Array(Type.String({ "x-auditable": true }), {
          description: "An array of IPv4 or IPV6 addresses or CIDRs used to match requests.",
        }),
      ),
      type: Type.Optional(
        Type.Union([Type.Literal("any"), Type.Literal("ip.src"), Type.Literal("ip.geoip.country")], {
          description:
            "Lists available rule types to match for requests. An `any` type matches all requests and can be used as a wildcard to apply default actions after other rules.",
          "x-auditable": true,
        }),
      ),
    },
    {
      description:
        "Defines rules for fine-grained control over content than signed URL tokens alone. Access rules primarily make tokens conditionally valid based on user information. Access Rules are specified on token payloads as the `accessRules` property containing an array of Rule objects.",
    },
  ),
)

export const StreamSignedTokenRequest = named(
  "stream_signed_token_request",
  Type.Object({
    accessRules: Type.Optional(
      Type.Array(StreamAccessrules, {
        description:
          "The optional list of access rule constraints on the token. Access can be blocked or allowed based on an IP, IP range, or by country. Access rules are evaluated from first to last. If a rule matches, the associated action is applied and no further rules are evaluated.",
      }),
    ),
    downloadable: Type.Optional(
      Type.Boolean({
        description:
          "The optional boolean value that enables using signed tokens to access MP4 download links for a video.",
        default: false,
        "x-auditable": true,
      }),
    ),
    exp: Type.Optional(
      Type.Integer({
        description:
          "The optional unix epoch timestamp that specficies the time after a token is not accepted. The maximum time specification is 24 hours from issuing time. If this field is not set, the default is one hour after issuing.",
      }),
    ),
    id: Type.Optional(
      Type.String({
        description: "The optional ID of a Stream signing key. If present, the `pem` field is also required.",
        "x-auditable": true,
      }),
    ),
    nbf: Type.Optional(
      Type.Integer({
        description:
          "The optional unix epoch timestamp that specifies the time before a the token is not accepted. If this field is not set, the default is one hour before issuing.",
        "x-auditable": true,
      }),
    ),
    pem: Type.Optional(
      Type.String({
        description:
          "The optional base64 encoded private key in PEM format associated with a Stream signing key. If present, the `id` field is also required.",
        "x-sensitive": true,
      }),
    ),
  }),
)

export const StreamDownloadType = named(
  "stream_download_type",
  Type.String({
    description: "The type of downloads available are: `default`, `audio`.",
    default: "default",
    "x-auditable": true,
  }),
)

export const StreamDownloadsResponse = named(
  "stream_downloads_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Unknown()),
  }),
)

export const StreamLanguage = named(
  "stream_language",
  Type.String({ description: "The language tag in BCP 47 format.", "x-auditable": true }),
)

export const StreamGeneratedCaption = named(
  "stream_generated_caption",
  Type.Boolean({ description: "Whether the caption was generated via AI.", "x-auditable": true }),
)

export const StreamLabel = named(
  "stream_label",
  Type.String({ description: "The language label displayed in the native language to users.", "x-auditable": true }),
)

export const StreamCaptionStatus = named(
  "stream_caption_status",
  Type.Union([Type.Literal("ready"), Type.Literal("inprogress"), Type.Literal("error")], {
    description: "The status of a generated caption.",
    "x-auditable": true,
  }),
)

export const StreamCaptions = named(
  "stream_captions",
  Type.Object({
    generated: Type.Optional(StreamGeneratedCaption),
    label: Type.Optional(StreamLabel),
    language: Type.Optional(StreamLanguage),
    status: Type.Optional(StreamCaptionStatus),
  }),
)

export const StreamLanguageResponseSingle = named(
  "stream_language_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(StreamCaptions),
  }),
)

export const StreamLanguageResponseCollection = named(
  "stream_language_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(StreamCaptions)),
  }),
)

export const StreamAudioIdentifier = named(
  "stream_audio_identifier",
  Type.String({
    description: "The unique identifier for an additional audio track.",
    maxLength: 32,
    "x-auditable": true,
  }),
)

export const StreamAudioDefault = named(
  "stream_audio_default",
  Type.Boolean({
    description: "Denotes whether the audio track will be played by default in a player.",
    default: false,
    "x-auditable": true,
  }),
)

export const StreamAudioLabel = named(
  "stream_audio_label",
  Type.String({
    description: "A string to uniquely identify the track amongst other audio track labels for the specified video.",
    "x-auditable": true,
  }),
)

export const StreamEditaudiotrack = named(
  "stream_editAudioTrack",
  Type.Object({
    default: Type.Optional(StreamAudioDefault),
    label: Type.Optional(StreamAudioLabel),
  }),
)

export const StreamAudioState = named(
  "stream_audio_state",
  Type.Union([Type.Literal("queued"), Type.Literal("ready"), Type.Literal("error")], {
    description: "Specifies the processing status of the video.",
    "x-auditable": true,
  }),
)

export const StreamIdentifier = named(
  "stream_identifier",
  Type.String({
    description: "A Cloudflare-generated unique identifier for a media item.",
    maxLength: 32,
    "x-auditable": true,
  }),
)

export const StreamAdditionalaudio = named(
  "stream_additionalAudio",
  Type.Object({
    default: Type.Optional(StreamAudioDefault),
    label: Type.Optional(StreamAudioLabel),
    status: Type.Optional(StreamAudioState),
    uid: Type.Optional(StreamIdentifier),
  }),
)

export const StreamAddaudiotrackresponse = named(
  "stream_addAudioTrackResponse",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(StreamAdditionalaudio),
  }),
)

export const StreamCopyaudiotrack = named(
  "stream_copyAudioTrack",
  Type.Object({
    label: StreamAudioLabel,
    url: Type.Optional(
      Type.String({
        description:
          "An audio track URL. The server must be publicly routable and support `HTTP HEAD` requests and `HTTP GET` range requests. The server should respond to `HTTP HEAD` requests with a `content-range` header that includes the size of the file.",
        format: "uri",
        "x-auditable": true,
      }),
    ),
  }),
)

export const StreamListaudiotrackresponse = named(
  "stream_listAudioTrackResponse",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(StreamAdditionalaudio)),
  }),
)

export const StreamAllowedorigins = named(
  "stream_allowedOrigins",
  Type.Array(Type.String({ "x-auditable": true }), {
    description:
      "Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.",
  }),
)

export const StreamCreator = named(
  "stream_creator",
  Type.String({ description: "A user-defined identifier for the media creator.", maxLength: 64, "x-auditable": true }),
)

export const StreamMaxdurationseconds = named(
  "stream_maxDurationSeconds",
  Type.Integer({
    description:
      "The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during processing. A value of `-1` means the value is unknown.",
    minimum: 1,
    maximum: 36000,
    "x-auditable": true,
  }),
)

export const StreamMediaMetadata = named(
  "stream_media_metadata",
  Type.Unknown({
    description: "A user modifiable key-value store used to reference other systems of record for managing videos.",
  }),
)

export const StreamRequiresignedurls = named(
  "stream_requireSignedURLs",
  Type.Boolean({
    description:
      "Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video.",
    default: false,
    "x-auditable": true,
  }),
)

export const StreamScheduleddeletion = named(
  "stream_scheduledDeletion",
  Type.String({
    description:
      "Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const StreamThumbnailtimestamppct = named(
  "stream_thumbnailTimestampPct",
  Type.Number({
    description:
      "The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video.  If this value is not set, the default thumbnail image is taken from 0s of the video.",
    default: 0,
    minimum: 0,
    maximum: 1,
    "x-auditable": true,
  }),
)

export const StreamOnetimeuploadexpiry = named(
  "stream_oneTimeUploadExpiry",
  Type.String({
    description: "The date and time when the video upload URL is no longer valid for direct user uploads.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const StreamVideoUpdate = named(
  "stream_video_update",
  Type.Object({
    allowedOrigins: Type.Optional(StreamAllowedorigins),
    creator: Type.Optional(StreamCreator),
    maxDurationSeconds: Type.Optional(StreamMaxdurationseconds),
    meta: Type.Optional(StreamMediaMetadata),
    requireSignedURLs: Type.Optional(StreamRequiresignedurls),
    scheduledDeletion: Type.Optional(StreamScheduleddeletion),
    thumbnailTimestampPct: Type.Optional(StreamThumbnailtimestamppct),
    uploadExpiry: Type.Optional(StreamOnetimeuploadexpiry),
  }),
)

export const StreamNotificationurl = named(
  "stream_notificationUrl",
  Type.String({ description: "The URL where webhooks will be sent.", format: "uri", "x-auditable": true }),
)

export const StreamWebhookRequest = named(
  "stream_webhook_request",
  Type.Object({
    notificationUrl: StreamNotificationurl,
  }),
)

export const StreamWatermarkIdentifier = named(
  "stream_watermark_identifier",
  Type.String({ description: "The unique identifier for a watermark profile.", maxLength: 32, "x-auditable": true }),
)

export const StreamWatermarkCreated = named(
  "stream_watermark_created",
  Type.String({
    description: "The date and a time a watermark profile was created.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const StreamDownloadedfrom = named(
  "stream_downloadedFrom",
  Type.String({
    description:
      "The source URL for a downloaded image. If the watermark profile was created via direct upload, this field is null.",
    "x-auditable": true,
  }),
)

export const StreamHeight = named(
  "stream_height",
  Type.Integer({ description: "The height of the image in pixels.", "x-auditable": true }),
)

export const StreamName = named(
  "stream_name",
  Type.String({ description: "A short description of the watermark profile.", default: "", "x-auditable": true }),
)

export const StreamOpacity = named(
  "stream_opacity",
  Type.Number({
    description:
      "The translucency of the image. A value of `0.0` makes the image completely transparent, and `1.0` makes the image completely opaque. Note that if the image is already semi-transparent, setting this to `1.0` will not make the image completely opaque.",
    default: 1,
    minimum: 0,
    maximum: 1,
    "x-auditable": true,
  }),
)

export const StreamPadding = named(
  "stream_padding",
  Type.Number({
    description:
      "The whitespace between the adjacent edges (determined by position) of the video and the image. `0.0` indicates no padding, and `1.0` indicates a fully padded video width or length, as determined by the algorithm.",
    default: 0.05,
    minimum: 0,
    maximum: 1,
    "x-auditable": true,
  }),
)

export const StreamPosition = named(
  "stream_position",
  Type.String({
    description:
      "The location of the image. Valid positions are: `upperRight`, `upperLeft`, `lowerLeft`, `lowerRight`, and `center`. Note that `center` ignores the `padding` parameter.",
    default: "upperRight",
    "x-auditable": true,
  }),
)

export const StreamScale = named(
  "stream_scale",
  Type.Number({
    description:
      "The size of the image relative to the overall size of the video. This parameter will adapt to horizontal and vertical videos automatically. `0.0` indicates no scaling (use the size of the image as-is), and `1.0 `fills the entire video.",
    default: 0.15,
    minimum: 0,
    maximum: 1,
    "x-auditable": true,
  }),
)

export const StreamWatermarkSize = named(
  "stream_watermark_size",
  Type.Number({ description: "The size of the image in bytes.", "x-auditable": true }),
)

export const StreamWidth = named(
  "stream_width",
  Type.Integer({ description: "The width of the image in pixels.", "x-auditable": true }),
)

export const StreamWatermarks = named(
  "stream_watermarks",
  Type.Object({
    created: Type.Optional(StreamWatermarkCreated),
    downloadedFrom: Type.Optional(StreamDownloadedfrom),
    height: Type.Optional(StreamHeight),
    name: Type.Optional(StreamName),
    opacity: Type.Optional(StreamOpacity),
    padding: Type.Optional(StreamPadding),
    position: Type.Optional(StreamPosition),
    scale: Type.Optional(StreamScale),
    size: Type.Optional(StreamWatermarkSize),
    uid: Type.Optional(StreamWatermarkIdentifier),
    width: Type.Optional(StreamWidth),
  }),
)

export const StreamWatermarkResponseSingle = named(
  "stream_watermark_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(StreamWatermarks),
  }),
)

export const StreamWatermarkResponseCollection = named(
  "stream_watermark_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(StreamWatermarks)),
  }),
)

export const StreamStorageUseResponse = named(
  "stream_storage_use_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        creator: Type.Optional(StreamCreator),
        totalStorageMinutes: Type.Optional(
          Type.Integer({ description: "The total minutes of video content stored in the account." }),
        ),
        totalStorageMinutesLimit: Type.Optional(
          Type.Integer({ description: "The storage capacity alloted for the account." }),
        ),
        videoCount: Type.Optional(
          Type.Integer({ description: "The total count of videos associated with the account." }),
        ),
      }),
    ),
  }),
)

export const StreamOutputIdentifier = named(
  "stream_output_identifier",
  Type.String({ description: "A unique identifier for the output.", maxLength: 32, "x-auditable": true }),
)

export const StreamOutputEnabled = named(
  "stream_output_enabled",
  Type.Boolean({
    description:
      "When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.",
    default: true,
    "x-auditable": true,
  }),
)

export const StreamUpdateOutputRequest = named(
  "stream_update_output_request",
  Type.Object({
    enabled: StreamOutputEnabled,
  }),
)

export const StreamOutputStreamkey = named(
  "stream_output_streamKey",
  Type.String({ description: "The streamKey used to authenticate against an output's target.", "x-sensitive": true }),
)

export const StreamOutputUrl = named(
  "stream_output_url",
  Type.String({ description: "The URL an output uses to restream.", "x-sensitive": true }),
)

export const StreamOutput = named(
  "stream_output",
  Type.Object({
    enabled: Type.Optional(StreamOutputEnabled),
    streamKey: Type.Optional(StreamOutputStreamkey),
    uid: Type.Optional(StreamOutputIdentifier),
    url: Type.Optional(StreamOutputUrl),
  }),
)

export const StreamOutputResponseSingle = named(
  "stream_output_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(StreamOutput),
  }),
)

export const StreamCreateOutputRequest = named(
  "stream_create_output_request",
  Type.Object({
    enabled: Type.Optional(StreamOutputEnabled),
    streamKey: StreamOutputStreamkey,
    url: StreamOutputUrl,
  }),
)

export const StreamOutputResponseCollection = named(
  "stream_output_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(StreamOutput)),
  }),
)

export const StreamLiveInputRecordingAllowedorigins = named(
  "stream_live_input_recording_allowedOrigins",
  Type.Array(Type.String({ "x-auditable": true }), {
    description:
      "Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdomains. An empty array allows videos to be viewed on any origin.",
  }),
)

export const StreamLiveInputRecordingHideliveviewercount = named(
  "stream_live_input_recording_hideLiveViewerCount",
  Type.Boolean({
    description: "Disables reporting the number of live viewers when this property is set to `true`.",
    default: false,
    "x-auditable": true,
  }),
)

export const StreamLiveInputRecordingMode = named(
  "stream_live_input_recording_mode",
  Type.Union([Type.Literal("off"), Type.Literal("automatic")], {
    description:
      "Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a recording and transition to on-demand after Stream Live stops receiving input.",
    "x-auditable": true,
  }),
)

export const StreamLiveInputRecordingRequiresignedurls = named(
  "stream_live_input_recording_requireSignedURLs",
  Type.Boolean({
    description:
      "Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of the livestream with the live input.",
    default: false,
    "x-auditable": true,
  }),
)

export const StreamLiveInputRecordingTimeoutseconds = named(
  "stream_live_input_recording_timeoutSeconds",
  Type.Integer({
    description:
      "Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand. `0` is recommended for most use cases and indicates the platform default should be used.",
    default: 0,
    "x-auditable": true,
  }),
)

export const StreamLiveInputRecordingSettings = named(
  "stream_live_input_recording_settings",
  Type.Object(
    {
      allowedOrigins: Type.Optional(StreamLiveInputRecordingAllowedorigins),
      hideLiveViewerCount: Type.Optional(StreamLiveInputRecordingHideliveviewercount),
      mode: Type.Optional(StreamLiveInputRecordingMode),
      requireSignedURLs: Type.Optional(StreamLiveInputRecordingRequiresignedurls),
      timeoutSeconds: Type.Optional(StreamLiveInputRecordingTimeoutseconds),
    },
    {
      description:
        "Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live video and transition to on-demand after a condition is satisfied.",
    },
  ),
)

export const StreamLiveInputMetadata = named(
  "stream_live_input_metadata",
  Type.Unknown({
    description:
      "A user modifiable key-value store used to reference other systems of record for managing live inputs.",
  }),
)

export const StreamLiveInputRecordingDeletion = named(
  "stream_live_input_recording_deletion",
  Type.Number({
    description:
      "Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.",
    minimum: 30,
    "x-auditable": true,
  }),
)

export const StreamLiveInputDefaultCreator = named(
  "stream_live_input_default_creator",
  Type.String({ description: "Sets the creator ID asssociated with this live input.", "x-auditable": true }),
)

export const StreamLiveInputIdentifier = named(
  "stream_live_input_identifier",
  Type.String({ description: "A unique identifier for a live input.", maxLength: 32, "x-auditable": true }),
)

export const StreamLiveInputCreated = named(
  "stream_live_input_created",
  Type.String({
    description: "The date and time the live input was created.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const StreamLiveInputModified = named(
  "stream_live_input_modified",
  Type.String({
    description: "The date and time the live input was last modified.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const StreamInputRtmpsStreamKey = named(
  "stream_input_rtmps_stream_key",
  Type.String({ description: "The secret key to use when streaming via RTMPS to a live input.", "x-sensitive": true }),
)

export const StreamInputRtmpsUrl = named(
  "stream_input_rtmps_url",
  Type.String({
    description: "The RTMPS URL you provide to the broadcaster, which they stream live video to.",
    "x-sensitive": true,
  }),
)

export const StreamInputRtmps = named(
  "stream_input_rtmps",
  Type.Object(
    {
      streamKey: Type.Optional(StreamInputRtmpsStreamKey),
      url: Type.Optional(StreamInputRtmpsUrl),
    },
    { description: "Details for streaming to an live input using RTMPS." },
  ),
)

export const StreamPlaybackRtmpsStreamKey = named(
  "stream_playback_rtmps_stream_key",
  Type.String({ description: "The secret key to use for playback via RTMPS.", "x-sensitive": true }),
)

export const StreamPlaybackRtmpsUrl = named(
  "stream_playback_rtmps_url",
  Type.String({ description: "The URL used to play live video over RTMPS.", "x-sensitive": true }),
)

export const StreamPlaybackRtmps = named(
  "stream_playback_rtmps",
  Type.Object(
    {
      streamKey: Type.Optional(StreamPlaybackRtmpsStreamKey),
      url: Type.Optional(StreamPlaybackRtmpsUrl),
    },
    { description: "Details for playback from an live input using RTMPS." },
  ),
)

export const StreamInputSrtStreamPassphrase = named(
  "stream_input_srt_stream_passphrase",
  Type.String({ description: "The secret key to use when streaming via SRT to a live input.", "x-sensitive": true }),
)

export const StreamInputSrtStreamId = named(
  "stream_input_srt_stream_id",
  Type.String({ description: "The identifier of the live input to use when streaming via SRT.", "x-auditable": true }),
)

export const StreamInputSrtUrl = named(
  "stream_input_srt_url",
  Type.String({
    description: "The SRT URL you provide to the broadcaster, which they stream live video to.",
    "x-sensitive": true,
  }),
)

export const StreamInputSrt = named(
  "stream_input_srt",
  Type.Object(
    {
      passphrase: Type.Optional(StreamInputSrtStreamPassphrase),
      streamId: Type.Optional(StreamInputSrtStreamId),
      url: Type.Optional(StreamInputSrtUrl),
    },
    { description: "Details for streaming to a live input using SRT." },
  ),
)

export const StreamPlaybackSrtStreamPassphrase = named(
  "stream_playback_srt_stream_passphrase",
  Type.String({ description: "The secret key to use for playback via SRT.", "x-sensitive": true }),
)

export const StreamPlaybackSrtStreamId = named(
  "stream_playback_srt_stream_id",
  Type.String({ description: "The identifier of the live input to use for playback via SRT.", "x-auditable": true }),
)

export const StreamPlaybackSrtUrl = named(
  "stream_playback_srt_url",
  Type.String({ description: "The URL used to play live video over SRT.", "x-sensitive": true }),
)

export const StreamPlaybackSrt = named(
  "stream_playback_srt",
  Type.Object(
    {
      passphrase: Type.Optional(StreamPlaybackSrtStreamPassphrase),
      streamId: Type.Optional(StreamPlaybackSrtStreamId),
      url: Type.Optional(StreamPlaybackSrtUrl),
    },
    { description: "Details for playback from an live input using SRT." },
  ),
)

export const StreamLiveInputStatus = named(
  "stream_live_input_status",
  Type.Union(
    [
      Type.Null(),
      Type.Literal("connected"),
      Type.Literal("reconnected"),
      Type.Literal("reconnecting"),
      Type.Literal("client_disconnect"),
      Type.Literal("ttl_exceeded"),
      Type.Literal("failed_to_connect"),
      Type.Literal("failed_to_reconnect"),
      Type.Literal("new_configuration_accepted"),
    ],
    { description: "The connection status of a live input.", "x-auditable": true },
  ),
)

export const StreamInputWebrtcUrl = named(
  "stream_input_webrtc_url",
  Type.String({
    description: "The WebRTC URL you provide to the broadcaster, which they stream live video to.",
    "x-sensitive": true,
  }),
)

export const StreamInputWebrtc = named(
  "stream_input_webrtc",
  Type.Object(
    {
      url: Type.Optional(StreamInputWebrtcUrl),
    },
    { description: "Details for streaming to a live input using WebRTC." },
  ),
)

export const StreamPlaybackWebrtcUrl = named(
  "stream_playback_webrtc_url",
  Type.String({ description: "The URL used to play live video over WebRTC.", "x-sensitive": true }),
)

export const StreamPlaybackWebrtc = named(
  "stream_playback_webrtc",
  Type.Object(
    {
      url: Type.Optional(StreamPlaybackWebrtcUrl),
    },
    { description: "Details for playback from a live input using WebRTC." },
  ),
)

export const StreamLiveInput = named(
  "stream_live_input",
  Type.Object(
    {
      created: Type.Optional(StreamLiveInputCreated),
      deleteRecordingAfterDays: Type.Optional(StreamLiveInputRecordingDeletion),
      meta: Type.Optional(StreamLiveInputMetadata),
      modified: Type.Optional(StreamLiveInputModified),
      recording: Type.Optional(StreamLiveInputRecordingSettings),
      rtmps: Type.Optional(StreamInputRtmps),
      rtmpsPlayback: Type.Optional(StreamPlaybackRtmps),
      srt: Type.Optional(StreamInputSrt),
      srtPlayback: Type.Optional(StreamPlaybackSrt),
      status: Type.Optional(StreamLiveInputStatus),
      uid: Type.Optional(StreamLiveInputIdentifier),
      webRTC: Type.Optional(StreamInputWebrtc),
      webRTCPlayback: Type.Optional(StreamPlaybackWebrtc),
    },
    { description: "Details about a live input." },
  ),
)

export const StreamLiveInputResponseSingle = named(
  "stream_live_input_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(StreamLiveInput),
  }),
)

export const StreamCreateInputRequest = named(
  "stream_create_input_request",
  Type.Object({
    defaultCreator: Type.Optional(StreamLiveInputDefaultCreator),
    deleteRecordingAfterDays: Type.Optional(StreamLiveInputRecordingDeletion),
    meta: Type.Optional(StreamLiveInputMetadata),
    recording: Type.Optional(StreamLiveInputRecordingSettings),
  }),
)

export const StreamLiveInputObjectWithoutUrl = named(
  "stream_live_input_object_without_url",
  Type.Object({
    created: Type.Optional(StreamLiveInputCreated),
    deleteRecordingAfterDays: Type.Optional(StreamLiveInputRecordingDeletion),
    meta: Type.Optional(StreamLiveInputMetadata),
    modified: Type.Optional(StreamLiveInputModified),
    uid: Type.Optional(StreamLiveInputIdentifier),
  }),
)

export const StreamLiveInputResponseCollection = named(
  "stream_live_input_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        liveInputs: Type.Optional(Type.Array(StreamLiveInputObjectWithoutUrl)),
        range: Type.Optional(
          Type.Integer({ description: "The total number of remaining live inputs based on cursor position." }),
        ),
        total: Type.Optional(
          Type.Integer({ description: "The total number of live inputs that match the provided filters." }),
        ),
      }),
    ),
  }),
)

export const StreamDeletedResponse = named(
  "stream_deleted_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.String()),
  }),
)

export const StreamSigningKeyCreated = named(
  "stream_signing_key_created",
  Type.String({
    description: "The date and time a signing key was created.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const StreamJwk = named(
  "stream_jwk",
  Type.String({ description: "The signing key in JWK format.", "x-sensitive": true }),
)

export const StreamPem = named(
  "stream_pem",
  Type.String({ description: "The signing key in PEM format.", "x-sensitive": true }),
)

export const StreamKeys = named(
  "stream_keys",
  Type.Object({
    created: Type.Optional(StreamSigningKeyCreated),
    id: Type.Optional(DlsIdentifier),
    jwk: Type.Optional(StreamJwk),
    pem: Type.Optional(StreamPem),
  }),
)

export const StreamKeyGenerationResponse = named(
  "stream_key_generation_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(StreamKeys),
  }),
)

export const StreamKeyResponseCollection = named(
  "stream_key_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Array(
        Type.Object({
          created: Type.Optional(StreamSigningKeyCreated),
          id: Type.Optional(DlsIdentifier),
        }),
      ),
    ),
  }),
)

export const StreamDirectUploadResponse = named(
  "stream_direct_upload_response",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(
      Type.Object({
        scheduledDeletion: Type.Optional(StreamScheduleddeletion),
        uid: Type.Optional(StreamIdentifier),
        uploadURL: Type.Optional(
          Type.String({
            description:
              "The URL an unauthenticated upload can use for a single `HTTP POST multipart/form-data` request.",
          }),
        ),
        watermark: Type.Optional(StreamWatermarks),
      }),
    ),
  }),
)

export const StreamWatermarkatupload = named(
  "stream_watermarkAtUpload",
  Type.Object({
    uid: Type.Optional(
      Type.String({
        description: "The unique identifier for the watermark profile.",
        maxLength: 32,
        "x-auditable": true,
      }),
    ),
  }),
)

export const StreamDirectUploadRequest = named(
  "stream_direct_upload_request",
  Type.Object({
    allowedOrigins: Type.Optional(StreamAllowedorigins),
    creator: Type.Optional(StreamCreator),
    expiry: Type.Optional(
      Type.String({
        description: "The date and time after upload when videos will not be accepted.",
        format: "date-time",
        "x-auditable": true,
      }),
    ),
    maxDurationSeconds: StreamMaxdurationseconds,
    meta: Type.Optional(StreamMediaMetadata),
    requireSignedURLs: Type.Optional(StreamRequiresignedurls),
    scheduledDeletion: Type.Optional(StreamScheduleddeletion),
    thumbnailTimestampPct: Type.Optional(StreamThumbnailtimestamppct),
    watermark: Type.Optional(StreamWatermarkatupload),
  }),
)

export const StreamCreated = named(
  "stream_created",
  Type.String({
    description: "The date and time the media item was created.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const StreamDuration = named(
  "stream_duration",
  Type.Number({
    description:
      "The duration of the video in seconds. A value of `-1` means the duration is unknown. The duration becomes available after the upload and before the video is ready.",
    "x-auditable": true,
  }),
)

export const StreamInput = named(
  "stream_input",
  Type.Object({
    height: Type.Optional(
      Type.Integer({
        description:
          "The video height in pixels. A value of `-1` means the height is unknown. The value becomes available after the upload and before the video is ready.",
        "x-auditable": true,
      }),
    ),
    width: Type.Optional(
      Type.Integer({
        description:
          "The video width in pixels. A value of `-1` means the width is unknown. The value becomes available after the upload and before the video is ready.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const StreamLiveinput = named(
  "stream_liveInput",
  Type.String({
    description: "The live input ID used to upload a video with Stream Live.",
    maxLength: 32,
    "x-auditable": true,
  }),
)

export const StreamModified = named(
  "stream_modified",
  Type.String({
    description: "The date and time the media item was last modified.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const StreamPlayback = named(
  "stream_playback",
  Type.Object({
    dash: Type.Optional(
      Type.String({ description: "DASH Media Presentation Description for the video.", "x-auditable": true }),
    ),
    hls: Type.Optional(Type.String({ description: "The HLS manifest for the video.", "x-auditable": true })),
  }),
)

export const StreamPreview = named(
  "stream_preview",
  Type.String({
    description: "The video's preview page URI. This field is omitted until encoding is complete.",
    format: "uri",
    "x-auditable": true,
  }),
)

export const StreamReadytostream = named(
  "stream_readyToStream",
  Type.Boolean({
    description:
      "Indicates whether the video is playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.",
    "x-auditable": true,
  }),
)

export const StreamReadytostreamat = named(
  "stream_readyToStreamAt",
  Type.String({
    description:
      "Indicates the time at which the video became playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const StreamSize = named(
  "stream_size",
  Type.Number({ description: "The size of the media item in bytes.", "x-auditable": true }),
)

export const StreamErrorreasoncode = named(
  "stream_errorReasonCode",
  Type.String({
    description:
      "Specifies why the video failed to encode. This field is empty if the video is not in an `error` state. Preferred for programmatic use.",
    "x-auditable": true,
  }),
)

export const StreamErrorreasontext = named(
  "stream_errorReasonText",
  Type.String({
    description:
      "Specifies why the video failed to encode using a human readable error message in English. This field is empty if the video is not in an `error` state.",
    "x-auditable": true,
  }),
)

export const StreamPctcomplete = named(
  "stream_pctComplete",
  Type.String({
    description: "Indicates the size of the entire upload in bytes. The value must be a non-negative integer.",
    "x-auditable": true,
  }),
)

export const StreamMediaState = named(
  "stream_media_state",
  Type.Union(
    [
      Type.Literal("pendingupload"),
      Type.Literal("downloading"),
      Type.Literal("queued"),
      Type.Literal("inprogress"),
      Type.Literal("ready"),
      Type.Literal("error"),
      Type.Literal("live-inprogress"),
    ],
    { description: "Specifies the processing status for all quality levels for a video.", "x-auditable": true },
  ),
)

export const StreamMediaStatus = named(
  "stream_media_status",
  Type.Object(
    {
      errorReasonCode: Type.Optional(StreamErrorreasoncode),
      errorReasonText: Type.Optional(StreamErrorreasontext),
      pctComplete: Type.Optional(StreamPctcomplete),
      state: Type.Optional(StreamMediaState),
    },
    {
      description:
        "Specifies a detailed status for a video. If the `state` is `inprogress` or `error`, the `step` field returns `encoding` or `manifest`. If the `state` is `inprogress`, `pctComplete` returns a number between 0 and 100 to indicate the approximate percent of completion. If the `state` is `error`, `errorReasonCode` and `errorReasonText` provide additional details.",
    },
  ),
)

export const StreamThumbnailUrl = named(
  "stream_thumbnail_url",
  Type.String({
    description: "The media item's thumbnail URI. This field is omitted until encoding is complete.",
    format: "uri",
    "x-auditable": true,
  }),
)

export const StreamUploaded = named(
  "stream_uploaded",
  Type.String({
    description: "The date and time the media item was uploaded.",
    format: "date-time",
    "x-auditable": true,
  }),
)

export const StreamVideos = named(
  "stream_videos",
  Type.Object({
    allowedOrigins: Type.Optional(StreamAllowedorigins),
    created: Type.Optional(StreamCreated),
    creator: Type.Optional(StreamCreator),
    duration: Type.Optional(StreamDuration),
    input: Type.Optional(StreamInput),
    liveInput: Type.Optional(StreamLiveinput),
    maxDurationSeconds: Type.Optional(StreamMaxdurationseconds),
    meta: Type.Optional(StreamMediaMetadata),
    modified: Type.Optional(StreamModified),
    playback: Type.Optional(StreamPlayback),
    preview: Type.Optional(StreamPreview),
    readyToStream: Type.Optional(StreamReadytostream),
    readyToStreamAt: Type.Optional(StreamReadytostreamat),
    requireSignedURLs: Type.Optional(StreamRequiresignedurls),
    scheduledDeletion: Type.Optional(StreamScheduleddeletion),
    size: Type.Optional(StreamSize),
    status: Type.Optional(StreamMediaStatus),
    thumbnail: Type.Optional(StreamThumbnailUrl),
    thumbnailTimestampPct: Type.Optional(StreamThumbnailtimestamppct),
    uid: Type.Optional(StreamIdentifier),
    uploadExpiry: Type.Optional(StreamOnetimeuploadexpiry),
    uploaded: Type.Optional(StreamUploaded),
    watermark: Type.Optional(StreamWatermarks),
  }),
)

export const StreamVideoResponseSingle = named(
  "stream_video_response_single",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(StreamVideos),
  }),
)

export const StreamVideoCopyRequest = named(
  "stream_video_copy_request",
  Type.Object({
    allowedOrigins: Type.Optional(StreamAllowedorigins),
    creator: Type.Optional(StreamCreator),
    meta: Type.Optional(StreamMediaMetadata),
    requireSignedURLs: Type.Optional(StreamRequiresignedurls),
    scheduledDeletion: Type.Optional(StreamScheduleddeletion),
    thumbnailTimestampPct: Type.Optional(StreamThumbnailtimestamppct),
    url: Type.String({
      description:
        "A video's URL. The server must be publicly routable and support `HTTP HEAD` requests and `HTTP GET` range requests. The server should respond to `HTTP HEAD` requests with a `content-range` header that includes the size of the file.",
      format: "uri",
    }),
    watermark: Type.Optional(StreamWatermarkatupload),
  }),
)

export const StreamClippedFromVideoUid = named(
  "stream_clipped_from_video_uid",
  Type.String({ description: "The unique video identifier (UID).", maxLength: 32, "x-auditable": true }),
)

export const StreamClippingCreated = named(
  "stream_clipping_created",
  Type.String({ description: "The date and time the clip was created.", format: "date-time" }),
)

export const StreamEndTimeSeconds = named(
  "stream_end_time_seconds",
  Type.Integer({ description: "Specifies the end time for the video clip in seconds.", "x-auditable": true }),
)

export const StreamStartTimeSeconds = named(
  "stream_start_time_seconds",
  Type.Integer({ description: "Specifies the start time for the video clip in seconds.", "x-auditable": true }),
)

export const StreamClipping = named(
  "stream_clipping",
  Type.Object({
    allowedOrigins: Type.Optional(StreamAllowedorigins),
    clippedFromVideoUID: Type.Optional(StreamClippedFromVideoUid),
    created: Type.Optional(StreamClippingCreated),
    creator: Type.Optional(StreamCreator),
    endTimeSeconds: Type.Optional(StreamEndTimeSeconds),
    maxDurationSeconds: Type.Optional(StreamMaxdurationseconds),
    meta: Type.Optional(StreamMediaMetadata),
    modified: Type.Optional(StreamLiveInputModified),
    playback: Type.Optional(StreamPlayback),
    preview: Type.Optional(StreamPreview),
    requireSignedURLs: Type.Optional(StreamRequiresignedurls),
    startTimeSeconds: Type.Optional(StreamStartTimeSeconds),
    status: Type.Optional(StreamMediaState),
    thumbnailTimestampPct: Type.Optional(StreamThumbnailtimestamppct),
    watermark: Type.Optional(StreamWatermarkatupload),
  }),
)

export const StreamClipresponsesingle = named(
  "stream_clipResponseSingle",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(StreamClipping),
  }),
)

export const StreamVideoclipstandard = named(
  "stream_videoClipStandard",
  Type.Object({
    allowedOrigins: Type.Optional(StreamAllowedorigins),
    clippedFromVideoUID: StreamClippedFromVideoUid,
    creator: Type.Optional(StreamCreator),
    endTimeSeconds: StreamEndTimeSeconds,
    maxDurationSeconds: Type.Optional(StreamMaxdurationseconds),
    requireSignedURLs: Type.Optional(StreamRequiresignedurls),
    startTimeSeconds: StreamStartTimeSeconds,
    thumbnailTimestampPct: Type.Optional(StreamThumbnailtimestamppct),
    watermark: Type.Optional(StreamWatermarkatupload),
  }),
)

export const StreamUploadMetadata = named(
  "stream_upload_metadata",
  Type.String({
    description:
      "Comma-separated key-value pairs following the TUS protocol specification. Values are Base-64 encoded.\nSupported keys: `name`, `requiresignedurls`, `allowedorigins`, `thumbnailtimestamppct`, `watermark`, `scheduleddeletion`, `maxdurationseconds`.",
    "x-auditable": true,
  }),
)

export const StreamUploadLength = named(
  "stream_upload_length",
  Type.Integer({
    description: "Indicates the size of the entire upload in bytes. The value must be a non-negative integer.",
    minimum: 0,
    "x-auditable": true,
  }),
)

export const StreamTusResumable = named(
  "stream_tus_resumable",
  Type.Union([Type.Literal("1.0.0")], {
    description:
      "Specifies the TUS protocol version. This value must be included in every upload request.\nNotes: The only supported version of TUS protocol is 1.0.0.",
    "x-auditable": true,
  }),
)

export const StreamDirectUser = named(
  "stream_direct_user",
  Type.Boolean({
    description:
      "Provisions a URL to let your end users upload videos directly to Cloudflare Stream without exposing your API token to clients.",
    default: false,
    "x-auditable": true,
  }),
)

export const StreamIncludeCounts = named(
  "stream_include_counts",
  Type.Boolean({
    description: "Includes the total number of videos associated with the submitted query parameters.",
    default: false,
  }),
)

export const StreamEnd = named(
  "stream_end",
  Type.String({ description: "Lists videos created before the specified date.", format: "date-time" }),
)

export const StreamStart = named(
  "stream_start",
  Type.String({ description: "Lists videos created after the specified date.", format: "date-time" }),
)

export const StreamSearch = named(
  "stream_search",
  Type.String({
    description:
      "Provides a partial word match of the `name` key in the `meta` field. Slow for medium to large video libraries. May be unavailable for very large libraries.",
    "x-auditable": true,
  }),
)

export const StreamVideoName = named(
  "stream_video_name",
  Type.String({
    description: "Provides a fast, exact string match on the `name` key in the `meta` field.",
    "x-auditable": true,
  }),
)

export const StreamAsc = named(
  "stream_asc",
  Type.Boolean({ description: "Lists videos in ascending order of creation.", default: false }),
)

export const StreamType = named(
  "stream_type",
  Type.String({ description: "Specifies whether the video is `vod` or `live`.", "x-auditable": true }),
)

export const StreamApiResponseCommonFailure = named(
  "stream_api-response-common-failure",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    result: Type.Union([Type.Null()]),
    success: Type.Union([Type.Literal(false)], { description: "Whether the API call was successful." }),
  }),
)

export const StreamVideoResponseCollection = named(
  "stream_video_response_collection",
  Type.Object({
    errors: DlpMessages,
    messages: DlpMessages,
    success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
    result: Type.Optional(Type.Array(StreamVideos)),
    range: Type.Optional(
      Type.Integer({ description: "The total number of remaining videos based on cursor position." }),
    ),
    total: Type.Optional(Type.Integer({ description: "The total number of videos that match the provided filters." })),
  }),
)

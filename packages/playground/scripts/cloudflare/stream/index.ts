import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { DlpMessages, DlsIdentifier } from "../shared/schemas"
import {
  StreamAddaudiotrackresponse,
  StreamApiResponseCommonFailure,
  StreamAsc,
  StreamAudioIdentifier,
  StreamClipresponsesingle,
  StreamCopyaudiotrack,
  StreamCreateInputRequest,
  StreamCreateOutputRequest,
  StreamCreator,
  StreamDeletedResponse,
  StreamDirectUploadRequest,
  StreamDirectUploadResponse,
  StreamDirectUser,
  StreamDownloadType,
  StreamDownloadsResponse,
  StreamEditaudiotrack,
  StreamEnd,
  StreamIdentifier,
  StreamIncludeCounts,
  StreamKeyGenerationResponse,
  StreamKeyResponseCollection,
  StreamLanguage,
  StreamLanguageResponseCollection,
  StreamLanguageResponseSingle,
  StreamListaudiotrackresponse,
  StreamLiveInputIdentifier,
  StreamLiveInputResponseCollection,
  StreamLiveInputResponseSingle,
  StreamMediaState,
  StreamOutputIdentifier,
  StreamOutputResponseCollection,
  StreamOutputResponseSingle,
  StreamSearch,
  StreamSignedTokenRequest,
  StreamSignedTokenResponse,
  StreamStart,
  StreamStorageUseResponse,
  StreamTusResumable,
  StreamType,
  StreamUpdateOutputRequest,
  StreamUploadLength,
  StreamUploadMetadata,
  StreamVideoCopyRequest,
  StreamVideoName,
  StreamVideoResponseCollection,
  StreamVideoResponseSingle,
  StreamVideoUpdate,
  StreamVideoclipstandard,
  StreamWatermarkIdentifier,
  StreamWatermarkResponseCollection,
  StreamWatermarkResponseSingle,
  StreamWebhookRequest,
} from "./schemas"

export function registerStream(api: Api) {
  api.assertVersion("3.0.3", "Stream")

  api.group("/accounts/{account_id}/stream", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/", {
      query: Type.Object({
        status: Type.Optional(StreamMediaState),
        creator: Type.Optional(StreamCreator),
        type: Type.Optional(StreamType),
        asc: Type.Optional(StreamAsc),
        video_name: Type.Optional(StreamVideoName),
        search: Type.Optional(StreamSearch),
        start: Type.Optional(StreamStart),
        end: Type.Optional(StreamEnd),
        include_counts: Type.Optional(StreamIncludeCounts),
      }),
    })
      .response(StreamVideoResponseCollection)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("List videos")
      .description(
        "Lists up to 1000 videos from a single request. For a specific range, refer to the optional parameters.",
      )
      .operationId("stream-videos-list-videos")
      .tag("Stream Videos")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write", "Stream Read"])

    g.post("/", {
      query: Type.Object({
        direct_user: Type.Optional(StreamDirectUser),
      }),
      headers: Type.Object({
        "Tus-Resumable": StreamTusResumable,
        "Upload-Creator": Type.Optional(StreamCreator),
        "Upload-Length": StreamUploadLength,
        "Upload-Metadata": Type.Optional(StreamUploadMetadata),
      }),
    })
      .summary("Initiate video uploads using TUS")
      .description(
        "Initiates a video upload using the TUS protocol. On success, the server responds with a status code 201 (created) and includes a `location` header to indicate where the content should be uploaded. Refer to https://tus.io for protocol details.",
      )
      .operationId("stream-videos-initiate-video-uploads-using-tus")
      .tag("Stream Videos")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.post("/clip", {
      body: StreamVideoclipstandard,
    })
      .response(StreamClipresponsesingle)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Clip videos given a start and end time")
      .description("Clips a video based on the specified start and end times provided in seconds.")
      .operationId("stream-video-clipping-clip-videos-given-a-start-and-end-time")
      .tag("Stream Video Clipping")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.post("/copy", {
      headers: Type.Object({
        "Upload-Creator": Type.Optional(StreamCreator),
      }),
      body: StreamVideoCopyRequest,
    })
      .response(StreamVideoResponseSingle)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Upload videos from a URL")
      .description("Uploads a video to Stream from a provided URL.")
      .operationId("stream-videos-upload-videos-from-a-url")
      .tag("Stream Videos")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.post("/direct_upload", {
      headers: Type.Object({
        "Upload-Creator": Type.Optional(StreamCreator),
      }),
      body: StreamDirectUploadRequest,
    })
      .response(StreamDirectUploadResponse)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Upload videos via direct upload URLs")
      .description("Creates a direct upload that allows video uploads without an API key.")
      .operationId("stream-videos-upload-videos-via-direct-upload-ur-ls")
      .tag("Stream Videos")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.get("/keys", {})
      .response(StreamKeyResponseCollection)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("List signing keys")
      .description("Lists the video ID and creation date and time when a signing key was created.")
      .operationId("stream-signing-keys-list-signing-keys")
      .tag("Stream Signing Keys")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write", "Stream Read"])

    g.post("/keys", {})
      .response(StreamKeyGenerationResponse)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Create signing keys")
      .description(
        "Creates an RSA private key in PEM and JWK formats. Key files are only displayed once after creation. Keys are created, used, and deleted independently of videos, and every key can sign any video.",
      )
      .operationId("stream-signing-keys-create-signing-keys")
      .tag("Stream Signing Keys")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.delete("/keys/{identifier}", {
      params: Type.Object({ identifier: DlsIdentifier }),
    })
      .response(StreamDeletedResponse)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Delete signing keys")
      .description("Deletes signing keys and revokes all signed URLs generated with the key.")
      .operationId("stream-signing-keys-delete-signing-keys")
      .tag("Stream Signing Keys")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.get("/live_inputs", {
      query: Type.Object({
        include_counts: Type.Optional(StreamIncludeCounts),
      }),
    })
      .response(StreamLiveInputResponseCollection)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("List live inputs")
      .description(
        "Lists the live inputs created for an account. To get the credentials needed to stream to a specific live input, request a single live input.",
      )
      .operationId("stream-live-inputs-list-live-inputs")
      .tag("Stream Live Inputs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write", "Stream Read"])

    g.post("/live_inputs", {
      body: StreamCreateInputRequest,
    })
      .response(StreamLiveInputResponseSingle)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Create a live input")
      .description(
        "Creates a live input, and returns credentials that you or your users can use to stream live video to Cloudflare Stream.",
      )
      .operationId("stream-live-inputs-create-a-live-input")
      .tag("Stream Live Inputs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.get("/live_inputs/{live_input_identifier}", {
      params: Type.Object({ live_input_identifier: StreamLiveInputIdentifier }),
    })
      .response(StreamLiveInputResponseSingle)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Retrieve a live input")
      .description("Retrieves details of an existing live input.")
      .operationId("stream-live-inputs-retrieve-a-live-input")
      .tag("Stream Live Inputs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write", "Stream Read"])

    g.put("/live_inputs/{live_input_identifier}", {
      params: Type.Object({ live_input_identifier: StreamLiveInputIdentifier }),
      body: StreamCreateInputRequest,
    })
      .response(StreamLiveInputResponseSingle)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Update a live input")
      .description("Updates a specified live input.")
      .operationId("stream-live-inputs-update-a-live-input")
      .tag("Stream Live Inputs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.delete("/live_inputs/{live_input_identifier}", {
      params: Type.Object({ live_input_identifier: StreamLiveInputIdentifier }),
    })
      .summary("Delete a live input")
      .description(
        "Prevents a live input from being streamed to and makes the live input inaccessible to any future API calls.",
      )
      .operationId("stream-live-inputs-delete-a-live-input")
      .tag("Stream Live Inputs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.get("/live_inputs/{live_input_identifier}/outputs", {
      params: Type.Object({ live_input_identifier: StreamLiveInputIdentifier }),
    })
      .response(StreamOutputResponseCollection)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("List all outputs associated with a specified live input")
      .description("Retrieves all outputs associated with a specified live input.")
      .operationId("stream-live-inputs-list-all-outputs-associated-with-a-specified-live-input")
      .tag("Stream Live Inputs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write", "Stream Read"])

    g.post("/live_inputs/{live_input_identifier}/outputs", {
      params: Type.Object({ live_input_identifier: StreamLiveInputIdentifier }),
      body: StreamCreateOutputRequest,
    })
      .response(StreamOutputResponseSingle)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Create a new output, connected to a live input")
      .description(
        "Creates a new output that can be used to simulcast or restream live video to other RTMP or SRT destinations. Outputs are always linked to a specific live input — one live input can have many outputs.",
      )
      .operationId("stream-live-inputs-create-a-new-output,-connected-to-a-live-input")
      .tag("Stream Live Inputs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.put("/live_inputs/{live_input_identifier}/outputs/{output_identifier}", {
      params: Type.Object({
        output_identifier: StreamOutputIdentifier,
        live_input_identifier: StreamLiveInputIdentifier,
      }),
      body: StreamUpdateOutputRequest,
    })
      .response(StreamOutputResponseSingle)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Update an output")
      .description("Updates the state of an output.")
      .operationId("stream-live-inputs-update-an-output")
      .tag("Stream Live Inputs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.delete("/live_inputs/{live_input_identifier}/outputs/{output_identifier}", {
      params: Type.Object({
        output_identifier: StreamOutputIdentifier,
        live_input_identifier: StreamLiveInputIdentifier,
      }),
    })
      .summary("Delete an output")
      .description("Deletes an output and removes it from the associated live input.")
      .operationId("stream-live-inputs-delete-an-output")
      .tag("Stream Live Inputs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.get("/storage-usage", {
      query: Type.Object({
        creator: Type.Optional(StreamCreator),
      }),
    })
      .response(StreamStorageUseResponse)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Storage use")
      .description("Returns information about an account's storage use.")
      .operationId("stream-videos-storage-usage")
      .tag("Stream Videos")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write", "Stream Read"])

    g.get("/watermarks", {})
      .response(StreamWatermarkResponseCollection)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("List watermark profiles")
      .description("Lists all watermark profiles for an account.")
      .operationId("stream-watermark-profile-list-watermark-profiles")
      .tag("Stream Watermark Profile")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write", "Stream Read"])

    g.post("/watermarks", {})
      .response(StreamWatermarkResponseSingle)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Create watermark profiles via basic upload")
      .description("Creates watermark profiles using a single `HTTP POST multipart/form-data` request.")
      .operationId("stream-watermark-profile-create-watermark-profiles-via-basic-upload")
      .tag("Stream Watermark Profile")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.get("/watermarks/{identifier}", {
      params: Type.Object({ identifier: StreamWatermarkIdentifier }),
    })
      .response(StreamWatermarkResponseSingle)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Watermark profile details")
      .description("Retrieves details for a single watermark profile.")
      .operationId("stream-watermark-profile-watermark-profile-details")
      .tag("Stream Watermark Profile")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write", "Stream Read"])

    g.delete("/watermarks/{identifier}", {
      params: Type.Object({ identifier: StreamWatermarkIdentifier }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(Type.String({ "x-auditable": true })),
        }),
      )
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Delete watermark profiles")
      .description("Deletes a watermark profile.")
      .operationId("stream-watermark-profile-delete-watermark-profiles")
      .tag("Stream Watermark Profile")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.get("/webhook", {})
      .response(StreamDownloadsResponse)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("View webhooks")
      .description("Retrieves a list of webhooks.")
      .operationId("stream-webhook-view-webhooks")
      .tag("Stream Webhook")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write", "Stream Read"])

    g.put("/webhook", {
      body: StreamWebhookRequest,
    })
      .response(StreamDownloadsResponse)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Create webhooks")
      .description("Creates a webhook notification.")
      .operationId("stream-webhook-create-webhooks")
      .tag("Stream Webhook")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.delete("/webhook", {})
      .response(StreamDeletedResponse)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Delete webhooks")
      .description("Deletes a webhook.")
      .operationId("stream-webhook-delete-webhooks")
      .tag("Stream Webhook")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.get("/{identifier}", {
      params: Type.Object({ identifier: StreamIdentifier }),
    })
      .response(StreamVideoResponseSingle)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Retrieve video details")
      .description("Fetches details for a single video.")
      .operationId("stream-videos-retrieve-video-details")
      .tag("Stream Videos")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write", "Stream Read"])

    g.post("/{identifier}", {
      params: Type.Object({ identifier: StreamIdentifier }),
      body: StreamVideoUpdate,
    })
      .response(StreamVideoResponseSingle)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Edit video details")
      .description("Edit details for a single video.")
      .operationId("stream-videos-update-video-details")
      .tag("Stream Videos")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/{identifier}", {
      params: Type.Object({ identifier: StreamIdentifier }),
    })
      .summary("Delete video")
      .description("Deletes a video and its copies from Cloudflare Stream.")
      .operationId("stream-videos-delete-video")
      .tag("Stream Videos")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.get("/{identifier}/audio", {
      params: Type.Object({ identifier: StreamIdentifier }),
    })
      .response(StreamListaudiotrackresponse)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("List additional audio tracks on a video")
      .description(
        "Lists additional audio tracks on a video. Note this API will not return information for audio attached to the video upload.",
      )
      .operationId("list-audio-tracks")
      .tag("Stream Audio Tracks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write", "Stream Read"])

    g.post("/{identifier}/audio/copy", {
      params: Type.Object({ identifier: StreamIdentifier }),
      body: StreamCopyaudiotrack,
    })
      .response(StreamAddaudiotrackresponse)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Add audio tracks to a video")
      .description("Adds an additional audio track to a video using the provided audio track URL.")
      .operationId("add-audio-track")
      .tag("Stream Audio Tracks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.patch("/{identifier}/audio/{audio_identifier}", {
      params: Type.Object({ identifier: StreamIdentifier, audio_identifier: StreamAudioIdentifier }),
      body: StreamEditaudiotrack,
    })
      .response(StreamAddaudiotrackresponse)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Edit additional audio tracks on a video")
      .description(
        "Edits additional audio tracks on a video. Editing the default status of an audio track to `true` will mark all other audio tracks on the video default status to `false`.",
      )
      .operationId("edit-audio-tracks")
      .tag("Stream Audio Tracks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.delete("/{identifier}/audio/{audio_identifier}", {
      params: Type.Object({ identifier: StreamIdentifier, audio_identifier: StreamAudioIdentifier }),
    })
      .response(StreamDeletedResponse)
      .error("4XX", StreamDeletedResponse)
      .summary("Delete additional audio tracks on a video")
      .description(
        "Deletes additional audio tracks on a video. Deleting a default audio track is not allowed. You must assign another audio track as default prior to deletion.",
      )
      .operationId("delete-audio-tracks")
      .tag("Stream Audio Tracks")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.get("/{identifier}/captions", {
      params: Type.Object({ identifier: StreamIdentifier }),
    })
      .response(StreamLanguageResponseCollection)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("List captions or subtitles")
      .description("Lists the available captions or subtitles for a specific video.")
      .operationId("stream-subtitles/-captions-list-captions-or-subtitles")
      .tag("Stream Subtitles/Captions")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write", "Stream Read"])

    g.get("/{identifier}/captions/{language}", {
      params: Type.Object({ language: StreamLanguage, identifier: StreamIdentifier }),
    })
      .response(StreamLanguageResponseSingle)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("List captions or subtitles for a provided language")
      .description("Lists the captions or subtitles for provided language.")
      .operationId("stream-subtitles/-captions-get-caption-or-subtitle-for-language")
      .tag("Stream Subtitles/Captions")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write", "Stream Read"])

    g.put("/{identifier}/captions/{language}", {
      params: Type.Object({ language: StreamLanguage, identifier: StreamIdentifier }),
    })
      .response(StreamLanguageResponseSingle)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Upload captions or subtitles")
      .description(
        "Uploads the caption or subtitle file to the endpoint for a specific BCP47 language. One caption or subtitle file per language is allowed.",
      )
      .operationId("stream-subtitles/-captions-upload-captions-or-subtitles")
      .tag("Stream Subtitles/Captions")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.delete("/{identifier}/captions/{language}", {
      params: Type.Object({ language: StreamLanguage, identifier: StreamIdentifier }),
    })
      .response(
        Type.Object({
          errors: DlpMessages,
          messages: DlpMessages,
          success: Type.Union([Type.Literal(true)], { description: "Whether the API call was successful." }),
          result: Type.Optional(Type.String({ "x-auditable": true })),
        }),
      )
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Delete captions or subtitles")
      .description("Removes the captions or subtitles from a video.")
      .operationId("stream-subtitles/-captions-delete-captions-or-subtitles")
      .tag("Stream Subtitles/Captions")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.post("/{identifier}/captions/{language}/generate", {
      params: Type.Object({ language: StreamLanguage, identifier: StreamIdentifier }),
    })
      .response(StreamLanguageResponseSingle)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Generate captions or subtitles for a provided language via AI")
      .description("Generate captions or subtitles for provided language via AI.")
      .operationId("stream-subtitles/-captions-generate-caption-or-subtitle-for-language")
      .tag("Stream Subtitles/Captions")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/{identifier}/captions/{language}/vtt", {
      params: Type.Object({ language: StreamLanguage, identifier: StreamIdentifier }),
    })
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Return WebVTT captions for a provided language")
      .description("Return WebVTT captions for a provided language.")
      .operationId("stream-subtitles/-captions-get-vtt-caption-or-subtitle")
      .tag("Stream Subtitles/Captions")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write", "Stream Read"])

    g.get("/{identifier}/downloads", {
      params: Type.Object({ identifier: StreamIdentifier }),
    })
      .response(StreamDownloadsResponse)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("List downloads")
      .description("Lists the downloads created for a video.")
      .operationId("stream-m-p-4-downloads-list-downloads")
      .tag("Stream MP4 Downloads")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write", "Stream Read"])

    g.post("/{identifier}/downloads", {
      params: Type.Object({ identifier: StreamIdentifier }),
    })
      .response(StreamDownloadsResponse)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Create downloads")
      .description(
        "Creates a download for a video when a video is ready to view. Use `/downloads/{download_type}` instead for type-specific downloads.",
      )
      .operationId("stream-m-p-4-downloads-create-downloads")
      .tag("Stream MP4 Downloads")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/{identifier}/downloads", {
      params: Type.Object({ identifier: StreamIdentifier }),
    })
      .response(StreamDeletedResponse)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Delete downloads")
      .description(
        "Delete the downloads for a video. Use `/downloads/{download_type}` instead for type-specific downloads.",
      )
      .operationId("stream-m-p-4-downloads-delete-downloads")
      .tag("Stream MP4 Downloads")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.post("/{identifier}/downloads/{download_type}", {
      params: Type.Object({ identifier: StreamIdentifier, download_type: StreamDownloadType }),
    })
      .response(StreamDownloadsResponse)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Create download")
      .description(
        "Creates a download for a video of specified type. For backwards-compatibility, POST requests to /downloads will enable the default download.",
      )
      .operationId("stream-downloads-create-type-specific-downloads")
      .tag("Stream MP4 Downloads")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/{identifier}/downloads/{download_type}", {
      params: Type.Object({ identifier: StreamIdentifier, download_type: StreamDownloadType }),
    })
      .response(StreamDeletedResponse)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Delete download")
      .description(
        "Delete specific type of download. For backwards-compatibility, DELETE requests to /downloads will delete the default download.",
      )
      .operationId("stream-downloads-delete-type-specific-downloads")
      .tag("Stream MP4 Downloads")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write"])

    g.get("/{identifier}/embed", {
      params: Type.Object({ identifier: StreamIdentifier }),
    })
      .response(Type.String())
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Retrieve embed Code HTML")
      .description(
        "Fetches an HTML code snippet to embed a video in a web page delivered through Cloudflare. On success, returns an HTML fragment for use on web pages to display a video. On failure, returns a JSON response body.",
      )
      .operationId("stream-videos-retreieve-embed-code-html")
      .tag("Stream Videos")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Stream Write", "Stream Read"])

    g.post("/{identifier}/token", {
      params: Type.Object({ identifier: StreamIdentifier }),
      body: StreamSignedTokenRequest,
    })
      .response(StreamSignedTokenResponse)
      .error("4XX", StreamApiResponseCommonFailure)
      .summary("Create signed URL tokens for videos")
      .description(
        "Creates a signed URL token for a video. If a body is not provided in the request, a token is created with default values.",
      )
      .operationId("stream-videos-create-signed-url-tokens-for-videos")
      .tag("Stream Videos")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
  })
}

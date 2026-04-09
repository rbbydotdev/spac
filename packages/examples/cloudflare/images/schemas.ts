import { Type } from "@sinclair/typebox"
import { named } from "spac"
import { D1Messages } from "../shared/schemas"

export const ImagesImageDirectUploadResponseV2 = named(
  "images_image_direct_upload_response_v2",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      id: Type.Optional(
        Type.String({ description: "Image unique identifier.", maxLength: 32, readOnly: true, "x-auditable": true }),
      ),
      uploadURL: Type.Optional(
        Type.String({
          description:
            "The URL the unauthenticated upload can be performed to using a single HTTP POST (multipart/form-data) request.",
          "x-auditable": true,
        }),
      ),
    }),
    success: Type.Union([Type.Literal(true)], {
      description: "Whether the API call was successful",
      "x-auditable": true,
    }),
  }),
)

export const ImagesImagesListContinuationToken = named(
  "images_images_list_continuation_token",
  Type.Union([
    Type.String({
      description:
        "Continuation token to fetch next page. Passed as a query param when requesting List V2 api endpoint.",
      maxLength: 32,
      readOnly: true,
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const ImagesImageCreator = named(
  "images_image_creator",
  Type.Union([
    Type.String({
      description: "Can set the creator field with an internal user ID.",
      maxLength: 1024,
      "x-auditable": true,
    }),
    Type.Null(),
  ]),
)

export const ImagesImageFilename = named(
  "images_image_filename",
  Type.String({ description: "Image file name.", maxLength: 255, readOnly: true, "x-auditable": true }),
)

export const ImagesImageIdentifier = named(
  "images_image_identifier",
  Type.String({ description: "Image unique identifier.", maxLength: 32, readOnly: true, "x-auditable": true }),
)

export const ImagesImageMetadata = named(
  "images_image_metadata",
  Type.Unknown({
    description:
      "User modifiable key-value store. Can be used for keeping references to another system of record for managing images. Metadata must not exceed 1024 bytes.",
  }),
)

export const ImagesImageRequiresignedurls = named(
  "images_image_requireSignedURLs",
  Type.Boolean({
    description:
      "Indicates whether the image can be a accessed only using it's UID. If set to true, a signed token needs to be generated with a signing key to view the image.",
    default: false,
    "x-auditable": true,
  }),
)

export const ImagesImageUploaded = named(
  "images_image_uploaded",
  Type.String({
    description: "When the media item was uploaded.",
    format: "date-time",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ImagesImageThumbnailUrl = named(
  "images_image_thumbnail_url",
  Type.String({
    description: "URI to thumbnail variant for an image.",
    format: "uri",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ImagesImageHeroUrl = named(
  "images_image_hero_url",
  Type.String({ description: "URI to hero variant for an image.", format: "uri", readOnly: true, "x-auditable": true }),
)

export const ImagesImageOriginalUrl = named(
  "images_image_original_url",
  Type.String({
    description: "URI to original variant for an image.",
    format: "uri",
    readOnly: true,
    "x-auditable": true,
  }),
)

export const ImagesImageVariants = named(
  "images_image_variants",
  Type.Array(Type.Union([ImagesImageThumbnailUrl, ImagesImageHeroUrl, ImagesImageOriginalUrl]), {
    description: "Object specifying available variants for an image.",
    readOnly: true,
  }),
)

export const ImagesImage = named(
  "images_image",
  Type.Object({
    creator: Type.Optional(ImagesImageCreator),
    filename: Type.Optional(ImagesImageFilename),
    id: Type.Optional(ImagesImageIdentifier),
    meta: Type.Optional(ImagesImageMetadata),
    requireSignedURLs: Type.Optional(ImagesImageRequiresignedurls),
    uploaded: Type.Optional(ImagesImageUploaded),
    variants: Type.Optional(ImagesImageVariants),
  }),
)

export const ImagesImagesListResponseV2 = named(
  "images_images_list_response_v2",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      continuation_token: Type.Optional(ImagesImagesListContinuationToken),
      images: Type.Optional(Type.Array(ImagesImage)),
    }),
    success: Type.Union([Type.Literal(true)], {
      description: "Whether the API call was successful",
      "x-auditable": true,
    }),
  }),
)

export const ImagesImagePatchRequest = named(
  "images_image_patch_request",
  Type.Object({
    creator: Type.Optional(Type.String({ description: "Can set the creator field with an internal user ID." })),
    metadata: Type.Optional(
      Type.Unknown({
        description:
          "User modifiable key-value store. Can be used for keeping references to another system of record for managing images. No change if not specified.",
      }),
    ),
    requireSignedURLs: Type.Optional(
      Type.Boolean({
        description:
          "Indicates whether the image can be accessed using only its UID. If set to `true`, a signed token needs to be generated with a signing key to view the image. Returns a new UID on a change. No change if not specified.",
        "x-auditable": true,
      }),
    ),
  }),
)

export const ImagesDeletedResponse = named(
  "images_deleted_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Union([Type.Unknown(), Type.String()]),
    success: Type.Union([Type.Literal(true)], {
      description: "Whether the API call was successful",
      "x-auditable": true,
    }),
  }),
)

export const ImagesImageVariantNeverrequiresignedurls = named(
  "images_image_variant_neverRequireSignedURLs",
  Type.Boolean({
    description:
      "Indicates whether the variant can access an image without a signature, regardless of image access control.",
    default: false,
    "x-auditable": true,
  }),
)

export const ImagesImageVariantFit = named(
  "images_image_variant_fit",
  Type.Union(
    [
      Type.Literal("scale-down"),
      Type.Literal("contain"),
      Type.Literal("cover"),
      Type.Literal("crop"),
      Type.Literal("pad"),
    ],
    {
      description: "The fit property describes how the width and height dimensions should be interpreted.",
      "x-auditable": true,
    },
  ),
)

export const ImagesImageVariantHeight = named(
  "images_image_variant_height",
  Type.Number({ description: "Maximum height in image pixels.", minimum: 1, "x-auditable": true }),
)

export const ImagesImageVariantSchemasMetadata = named(
  "images_image_variant_schemas_metadata",
  Type.Union([Type.Literal("keep"), Type.Literal("copyright"), Type.Literal("none")], {
    description: "What EXIF data should be preserved in the output image.",
    "x-auditable": true,
  }),
)

export const ImagesImageVariantWidth = named(
  "images_image_variant_width",
  Type.Number({ description: "Maximum width in image pixels.", minimum: 1, "x-auditable": true }),
)

export const ImagesImageVariantOptions = named(
  "images_image_variant_options",
  Type.Object(
    {
      fit: ImagesImageVariantFit,
      height: ImagesImageVariantHeight,
      metadata: ImagesImageVariantSchemasMetadata,
      width: ImagesImageVariantWidth,
    },
    { description: "Allows you to define image resizing sizes for different use cases." },
  ),
)

export const ImagesImageVariantPatchRequest = named(
  "images_image_variant_patch_request",
  Type.Object({
    neverRequireSignedURLs: Type.Optional(ImagesImageVariantNeverrequiresignedurls),
    options: ImagesImageVariantOptions,
  }),
)

export const ImagesImageVariantIdentifier = named(
  "images_image_variant_identifier",
  Type.String({ maxLength: 99, "x-auditable": true }),
)

export const ImagesImageVariantDefinition = named(
  "images_image_variant_definition",
  Type.Object({
    id: ImagesImageVariantIdentifier,
    neverRequireSignedURLs: Type.Optional(ImagesImageVariantNeverrequiresignedurls),
    options: ImagesImageVariantOptions,
  }),
)

export const UnnamedSchemaRefD02195de7dadf27801875f36cddfa3a3 = named(
  "unnamed_schema_ref_d02195de7dadf27801875f36cddfa3a3",
  Type.Union([Type.Null()]),
)

export const ImagesImageVariantResponse = named(
  "images_image_variant_response",
  Type.Object({
    variant: Type.Optional(ImagesImageVariantDefinition),
  }),
)

export const ImagesImageVariantSimpleResponse = named(
  "images_image_variant_simple_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: ImagesImageVariantResponse,
    success: Type.Union([Type.Literal(true)], {
      description: "Whether the API call was successful",
      "x-auditable": true,
    }),
  }),
)

export const ImagesImageVariantPublicRequest = named(
  "images_image_variant_public_request",
  Type.Object({
    hero: Type.Optional(
      Type.Object({
        id: ImagesImageVariantIdentifier,
        neverRequireSignedURLs: Type.Optional(ImagesImageVariantNeverrequiresignedurls),
        options: ImagesImageVariantOptions,
      }),
    ),
  }),
)

export const ImagesImageVariantsResponse = named(
  "images_image_variants_response",
  Type.Object({
    variants: Type.Optional(ImagesImageVariantPublicRequest),
  }),
)

export const ImagesImageVariantListResponse = named(
  "images_image_variant_list_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: ImagesImageVariantsResponse,
    success: Type.Union([Type.Literal(true)], {
      description: "Whether the API call was successful",
      "x-auditable": true,
    }),
  }),
)

export const ImagesImagesStatsAllowed = named(
  "images_images_stats_allowed",
  Type.Number({ description: "Cloudflare Images allowed usage.", readOnly: true, "x-auditable": true }),
)

export const ImagesImagesStatsCurrent = named(
  "images_images_stats_current",
  Type.Number({ description: "Cloudflare Images current usage.", readOnly: true, "x-auditable": true }),
)

export const ImagesImagesStatsCount = named(
  "images_images_stats_count",
  Type.Object({
    allowed: Type.Optional(ImagesImagesStatsAllowed),
    current: Type.Optional(ImagesImagesStatsCurrent),
  }),
)

export const ImagesImagesStats = named(
  "images_images_stats",
  Type.Object({
    count: Type.Optional(ImagesImagesStatsCount),
  }),
)

export const ImagesImagesStatsResponse = named(
  "images_images_stats_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: ImagesImagesStats,
    success: Type.Union([Type.Literal(true)], {
      description: "Whether the API call was successful",
      "x-auditable": true,
    }),
  }),
)

export const ImagesSigningKeyIdentifier = named(
  "images_signing_key_identifier",
  Type.String({ maxLength: 20, "x-auditable": true }),
)

export const ImagesImageKeyName = named(
  "images_image_key_name",
  Type.String({ description: "Key name.", readOnly: true, "x-auditable": true }),
)

export const ImagesImageKeyValue = named(
  "images_image_key_value",
  Type.String({ description: "Key value.", readOnly: true, "x-auditable": true }),
)

export const ImagesImageKeys = named(
  "images_image_keys",
  Type.Object({
    name: Type.Optional(ImagesImageKeyName),
    value: Type.Optional(ImagesImageKeyValue),
  }),
)

export const UnnamedSchemaRef918e794287a67b5e85126e00cf2d9a95 = named(
  "unnamed_schema_ref_918e794287a67b5e85126e00cf2d9a95",
  Type.Union([Type.Null()]),
)

export const ImagesImageKeysResponse = named(
  "images_image_keys_response",
  Type.Object({
    keys: Type.Optional(Type.Array(ImagesImageKeys)),
  }),
)

export const ImagesImageKeyResponseCollection = named(
  "images_image_key_response_collection",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: ImagesImageKeysResponse,
    success: Type.Union([Type.Literal(true)], {
      description: "Whether the API call was successful",
      "x-auditable": true,
    }),
  }),
)

export const UnnamedSchemaRefE8461c343d70f42d35d6d68f1a58d05a = named(
  "unnamed_schema_ref_e8461c343d70f42d35d6d68f1a58d05a",
  Type.Union([Type.Null()]),
)

export const ImagesImageResponseSingle = named(
  "images_image_response_single",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: ImagesImage,
    success: Type.Union([Type.Literal(true)], {
      description: "Whether the API call was successful",
      "x-auditable": true,
    }),
  }),
)

export const ImagesImagesListResponse = named(
  "images_images_list_response",
  Type.Object({
    errors: D1Messages,
    messages: D1Messages,
    result: Type.Object({
      images: Type.Optional(Type.Array(ImagesImage)),
    }),
    success: Type.Union([Type.Literal(true)], {
      description: "Whether the API call was successful",
      "x-auditable": true,
    }),
  }),
)

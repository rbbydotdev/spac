import { Type } from "@sinclair/typebox"
import type { Api } from "spac"
import { D1Messages } from "../shared/schemas"
import {
  ImagesDeletedResponse,
  ImagesImageDirectUploadResponseV2,
  ImagesImageIdentifier,
  ImagesImageKeyResponseCollection,
  ImagesImagePatchRequest,
  ImagesImageResponseSingle,
  ImagesImageVariantDefinition,
  ImagesImageVariantIdentifier,
  ImagesImageVariantListResponse,
  ImagesImageVariantPatchRequest,
  ImagesImageVariantSimpleResponse,
  ImagesImagesListResponse,
  ImagesImagesListResponseV2,
  ImagesImagesStatsResponse,
  ImagesSigningKeyIdentifier,
  UnnamedSchemaRef918e794287a67b5e85126e00cf2d9a95,
  UnnamedSchemaRefD02195de7dadf27801875f36cddfa3a3,
  UnnamedSchemaRefE8461c343d70f42d35d6d68f1a58d05a,
} from "./schemas"

export function registerImages(api: Api) {
  api.assertVersion("3.0.3", "Images")

  api.group("/accounts/{account_id}/images", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/v1", {
      query: Type.Object({
        page: Type.Optional(Type.Number({ description: "Page number of paginated results.", default: 1, minimum: 1 })),
        per_page: Type.Optional(
          Type.Number({ description: "Number of items per page.", default: 1000, minimum: 10, maximum: 10000 }),
        ),
        creator: Type.Optional(
          Type.Union([
            Type.String({
              description:
                'Internal user ID set within the creator field. Setting to empty string "" will return images where creator field is not set',
            }),
            Type.Null(),
          ]),
        ),
      }),
    })
      .response(ImagesImagesListResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("List images")
      .description(
        "List up to 100 images with one request. Use the optional parameters below to get a specific range of images.",
      )
      .operationId("cloudflare-images-list-images")
      .tag("Cloudflare Images")
      .deprecated()
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Images Read", "Images Write"])

    g.post("/v1", {})
      .response(ImagesImageResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefE8461c343d70f42d35d6d68f1a58d05a,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("Upload an image")
      .description(
        "Upload an image with up to 10 Megabytes using a single HTTP POST (multipart/form-data) request.\nAn image can be uploaded by sending an image file or passing an accessible to an API url.\n",
      )
      .operationId("cloudflare-images-upload-an-image-via-url")
      .tag("Cloudflare Images")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Images Write"])

    g.get("/v1/keys", {})
      .response(ImagesImageKeyResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef918e794287a67b5e85126e00cf2d9a95,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("List Signing Keys")
      .description("Lists your signing keys. These can be found on your Cloudflare Images dashboard.")
      .operationId("cloudflare-images-keys-list-signing-keys")
      .tag("Cloudflare Images Keys")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Images Read", "Images Write"])

    g.put("/v1/keys/{signing_key_name}", {
      params: Type.Object({ signing_key_name: ImagesSigningKeyIdentifier }),
    })
      .response(ImagesImageKeyResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef918e794287a67b5e85126e00cf2d9a95,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("Create a new Signing Key")
      .description("Create a new signing key with specified name. Returns all keys available.")
      .operationId("cloudflare-images-keys-add-signing-key")
      .tag("Cloudflare Images Keys")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.delete("/v1/keys/{signing_key_name}", {
      params: Type.Object({ signing_key_name: ImagesSigningKeyIdentifier }),
    })
      .response(ImagesImageKeyResponseCollection)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRef918e794287a67b5e85126e00cf2d9a95,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("Delete Signing Key")
      .description(
        "Delete signing key with specified name. Returns all keys available.\nWhen last key is removed, a new default signing key will be generated.\n",
      )
      .operationId("cloudflare-images-keys-delete-signing-key")
      .tag("Cloudflare Images Keys")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })

    g.get("/v1/stats", {})
      .response(ImagesImagesStatsResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("Images usage statistics")
      .description(
        "Fetch image statistics details for Cloudflare Images. The returned statistics detail storage usage, including the current image count vs this account's allowance.",
      )
      .operationId("cloudflare-images-images-usage-statistics")
      .tag("Cloudflare Images")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Images Read", "Images Write"])

    g.get("/v1/variants", {})
      .response(ImagesImageVariantListResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("List variants")
      .description("Lists existing variants.")
      .operationId("cloudflare-images-variants-list-variants")
      .tag("Cloudflare Images Variants")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Images Read", "Images Write"])

    g.post("/v1/variants", {
      body: ImagesImageVariantDefinition,
    })
      .response(ImagesImageVariantSimpleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefD02195de7dadf27801875f36cddfa3a3,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("Create a variant")
      .description("Specify variants that allow you to resize images for different use cases.")
      .operationId("cloudflare-images-variants-create-a-variant")
      .tag("Cloudflare Images Variants")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Images Write"])

    g.get("/v1/variants/{variant_id}", {
      params: Type.Object({ variant_id: ImagesImageVariantIdentifier }),
    })
      .response(ImagesImageVariantSimpleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefD02195de7dadf27801875f36cddfa3a3,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("Variant details")
      .description("Fetch details for a single variant.")
      .operationId("cloudflare-images-variants-variant-details")
      .tag("Cloudflare Images Variants")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Images Read", "Images Write"])

    g.patch("/v1/variants/{variant_id}", {
      params: Type.Object({ variant_id: ImagesImageVariantIdentifier }),
      body: ImagesImageVariantPatchRequest,
    })
      .response(ImagesImageVariantSimpleResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefD02195de7dadf27801875f36cddfa3a3,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("Update a variant")
      .description("Updating a variant purges the cache for all images associated with the variant.")
      .operationId("cloudflare-images-variants-update-a-variant")
      .tag("Cloudflare Images Variants")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Images Write"])

    g.delete("/v1/variants/{variant_id}", {
      params: Type.Object({ variant_id: ImagesImageVariantIdentifier }),
    })
      .response(ImagesDeletedResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("Delete a variant")
      .description("Deleting a variant purges the cache for all images associated with the variant.")
      .operationId("cloudflare-images-variants-delete-a-variant")
      .tag("Cloudflare Images Variants")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Images Write"])

    g.get("/v1/{image_id}", {
      params: Type.Object({ image_id: ImagesImageIdentifier }),
    })
      .response(ImagesImageResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefE8461c343d70f42d35d6d68f1a58d05a,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("Image details")
      .description("Fetch details for a single image.")
      .operationId("cloudflare-images-image-details")
      .tag("Cloudflare Images")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Images Read", "Images Write"])

    g.patch("/v1/{image_id}", {
      params: Type.Object({ image_id: ImagesImageIdentifier }),
      body: ImagesImagePatchRequest,
    })
      .response(ImagesImageResponseSingle)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: UnnamedSchemaRefE8461c343d70f42d35d6d68f1a58d05a,
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("Update image")
      .description(
        "Update image access control. On access control change, all copies of the image are purged from cache.",
      )
      .operationId("cloudflare-images-update-image")
      .tag("Cloudflare Images")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Images Write"])

    g.delete("/v1/{image_id}", {
      params: Type.Object({ image_id: ImagesImageIdentifier }),
    })
      .response(ImagesDeletedResponse)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("Delete image")
      .description(
        "Delete an image on Cloudflare Images. On success, all copies of the image are deleted and purged from cache.",
      )
      .operationId("cloudflare-images-delete-image")
      .tag("Cloudflare Images")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Images Write"])

    g.get("/v1/{image_id}/blob", {
      params: Type.Object({ image_id: ImagesImageIdentifier }),
    })
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("Base image")
      .description(
        "Fetch base image. For most images this will be the originally uploaded file. For larger images it can be a near-lossless version of the original.",
      )
      .operationId("cloudflare-images-base-image")
      .tag("Cloudflare Images")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Images Read", "Images Write"])

    g.get("/v2", {
      query: Type.Object({
        continuation_token: Type.Optional(
          Type.Union([
            Type.String({
              description: "Continuation token for a next page. List images V2 returns continuation_token",
            }),
            Type.Null(),
          ]),
        ),
        per_page: Type.Optional(
          Type.Number({ description: "Number of items per page.", default: 1000, minimum: 10, maximum: 10000 }),
        ),
        sort_order: Type.Optional(
          Type.Union([Type.Literal("asc"), Type.Literal("desc")], { description: "Sorting order by upload time." }),
        ),
        creator: Type.Optional(
          Type.Union([
            Type.String({
              description:
                'Internal user ID set within the creator field. Setting to empty string "" will return images where creator field is not set',
            }),
            Type.Null(),
          ]),
        ),
      }),
    })
      .response(ImagesImagesListResponseV2)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("List images V2")
      .description(
        "List up to 10000 images with one request. Use the optional parameters below to get a specific range of images.\nEndpoint returns continuation_token if more images are present.\n",
      )
      .operationId("cloudflare-images-list-images-v2")
      .tag("Cloudflare Images")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Images Read", "Images Write"])

    g.post("/v2/direct_upload", {})
      .response(ImagesImageDirectUploadResponseV2)
      .error(
        "4XX",
        Type.Object({
          errors: D1Messages,
          messages: D1Messages,
          result: Type.Union([Type.Null()]),
          success: Type.Union([Type.Literal(true), Type.Literal(false)], {
            description: "Whether the API call was successful",
            "x-auditable": true,
          }),
        }),
      )
      .summary("Create authenticated direct upload URL V2")
      .description(
        "Direct uploads allow users to upload images without API keys. A common use case are web apps, client-side applications, or mobile devices where users upload content directly to Cloudflare Images. This method creates a draft record for a future image. It returns an upload URL and an image identifier. To verify if the image itself has been uploaded, send an image details request (accounts/:account_identifier/images/v1/:identifier), and check that the `draft: true` property is not present.",
      )
      .operationId("cloudflare-images-create-authenticated-direct-upload-url-v-2")
      .tag("Cloudflare Images")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Images Write"])
  })
}

import { Type } from "@sinclair/typebox"
import type { Api } from "spac"

export function registerAi(api: Api) {
  api.group("/accounts/{account_id}/ai", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/authors/search", {
      responses: {
        200: Type.Object({
          errors: Type.Array(Type.Unknown()),
          messages: Type.Array(Type.String()),
          result: Type.Array(Type.Unknown()),
          success: Type.Boolean(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Author Search")
      .operationId("workers-ai-search-author")
      .tag("Workers AI")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/finetunes", {
      responses: {
        200: Type.Object({
          result: Type.Object({
            created_at: Type.String({ format: "date-time", readOnly: true }),
            description: Type.Optional(Type.String()),
            id: Type.String({ format: "uuid", "x-auditable": true }),
            model: Type.String({ "x-auditable": true }),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String({ "x-auditable": true }),
          }),
          success: Type.Boolean(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("List Finetunes")
      .operationId("workers-ai-list-finetunes")
      .tag("Workers AI Finetune")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/finetunes", {
      body: Type.Object({
        description: Type.Optional(Type.String()),
        model: Type.String({ "x-auditable": true }),
        name: Type.String({ "x-auditable": true }),
        public: Type.Optional(Type.Boolean({ default: false, "x-auditable": true })),
      }),
      responses: {
        200: Type.Object({
          result: Type.Object({
            created_at: Type.String({ format: "date-time", readOnly: true }),
            description: Type.Optional(Type.String()),
            id: Type.String({ format: "uuid", "x-auditable": true }),
            model: Type.String({ "x-auditable": true }),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String({ "x-auditable": true }),
            public: Type.Boolean({ "x-auditable": true }),
          }),
          success: Type.Boolean(),
        }),
        400: Type.Object({
          errors: Type.Array(Type.Unknown()),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Create a new Finetune")
      .operationId("workers-ai-create-finetune")
      .tag("Workers AI Finetune")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/finetunes/public", {
      query: Type.Object({
        limit: Type.Optional(Type.Number({ description: "Pagination Limit" })),
        offset: Type.Optional(Type.Number({ description: "Pagination Offset" })),
        orderBy: Type.Optional(Type.String({ description: "Order By Column Name" })),
      }),
      responses: {
        200: Type.Object({
          result: Type.Array(
            Type.Object({
              created_at: Type.String({ format: "date-time", readOnly: true }),
              description: Type.Optional(Type.String()),
              id: Type.String({ format: "uuid", "x-auditable": true }),
              model: Type.String({ "x-auditable": true }),
              modified_at: Type.String({ format: "date-time", readOnly: true }),
              name: Type.String({ "x-auditable": true }),
              public: Type.Boolean({ "x-auditable": true }),
            }),
          ),
          success: Type.Boolean(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("List Public Finetunes")
      .operationId("workers-ai-list-public-finetunes")
      .tag("Workers AI Finetune")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/finetunes/{finetune_id}/finetune-assets", {
      params: Type.Object({ finetune_id: Type.String() }),
      responses: {
        200: Type.Object({
          success: Type.Boolean(),
        }),
        400: Type.Object({
          errors: Type.Array(Type.Unknown()),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Upload a Finetune Asset")
      .operationId("workers-ai-upload-finetune-asset")
      .tag("Workers AI Finetune")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/models/schema", {
      query: Type.Object({
        model: Type.String({ description: "Model Name" }),
      }),
      responses: {
        200: Type.Object({
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Get Model Schema")
      .operationId("workers-ai-get-model-schema")
      .tag("Workers AI")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/models/search", {
      query: Type.Object({
        per_page: Type.Optional(Type.Integer()),
        page: Type.Optional(Type.Integer()),
        task: Type.Optional(Type.String({ description: "Filter by Task Name" })),
        author: Type.Optional(Type.String({ description: "Filter by Author" })),
        source: Type.Optional(Type.Number({ description: "Filter by Source Id" })),
        hide_experimental: Type.Optional(Type.Boolean({ description: "Filter to hide experimental models" })),
        search: Type.Optional(Type.String({ description: "Search" })),
      }),
      responses: {
        200: Type.Object({
          errors: Type.Array(Type.Unknown()),
          messages: Type.Array(Type.String()),
          result: Type.Array(Type.Unknown()),
          success: Type.Boolean(),
        }),
        404: Type.Object({
          errors: Type.Array(Type.Unknown()),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Model Search")
      .operationId("workers-ai-search-model")
      .tag("Workers AI")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/baai/bge-base-en-v1.5", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          pooling: Type.Optional(
            Type.Union([Type.Literal("mean"), Type.Literal("cls")], {
              description:
                "The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.",
            }),
          ),
          text: Type.Union([
            Type.String({ description: "The text to embed", minLength: 1 }),
            Type.Array(Type.String({ description: "The text to embed", minLength: 1 }), {
              description: "Batch of text values to embed",
              maxItems: 100,
            }),
          ]),
        }),
        Type.Object({
          requests: Type.Array(
            Type.Object({
              pooling: Type.Optional(
                Type.Union([Type.Literal("mean"), Type.Literal("cls")], {
                  description:
                    "The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.",
                }),
              ),
              text: Type.Union([
                Type.String({ description: "The text to embed", minLength: 1 }),
                Type.Array(Type.String({ description: "The text to embed", minLength: 1 }), {
                  description: "Batch of text values to embed",
                  maxItems: 100,
                }),
              ]),
            }),
            { description: "Batch of the embeddings requests to run using async-queue" },
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/baai/bge-base-en-v1.5 model.")
      .operationId("workers-ai-post-run-cf-baai-bge-base-en-v1-5")
      .tag("Workers AI Text Embeddings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/baai/bge-large-en-v1.5", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          pooling: Type.Optional(
            Type.Union([Type.Literal("mean"), Type.Literal("cls")], {
              description:
                "The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.",
            }),
          ),
          text: Type.Union([
            Type.String({ description: "The text to embed", minLength: 1 }),
            Type.Array(Type.String({ description: "The text to embed", minLength: 1 }), {
              description: "Batch of text values to embed",
              maxItems: 100,
            }),
          ]),
        }),
        Type.Object({
          requests: Type.Array(
            Type.Object({
              pooling: Type.Optional(
                Type.Union([Type.Literal("mean"), Type.Literal("cls")], {
                  description:
                    "The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.",
                }),
              ),
              text: Type.Union([
                Type.String({ description: "The text to embed", minLength: 1 }),
                Type.Array(Type.String({ description: "The text to embed", minLength: 1 }), {
                  description: "Batch of text values to embed",
                  maxItems: 100,
                }),
              ]),
            }),
            { description: "Batch of the embeddings requests to run using async-queue" },
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/baai/bge-large-en-v1.5 model.")
      .operationId("workers-ai-post-run-cf-baai-bge-large-en-v1-5")
      .tag("Workers AI Text Embeddings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/baai/bge-m3", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          contexts: Type.Array(
            Type.Object({
              text: Type.Optional(Type.String({ description: "One of the provided context content", minLength: 1 })),
            }),
            {
              description:
                "List of provided contexts. Note that the index in this array is important, as the response will refer to it.",
            },
          ),
          query: Type.Optional(
            Type.String({
              description:
                "A query you wish to perform against the provided contexts. If no query is provided the model with respond with embeddings for contexts",
              minLength: 1,
            }),
          ),
          truncate_inputs: Type.Optional(
            Type.Boolean({
              description:
                "When provided with too long context should the model error out or truncate the context to fit?",
              default: false,
            }),
          ),
        }),
        Type.Object({
          text: Type.Union([
            Type.String({ description: "The text to embed", minLength: 1 }),
            Type.Array(Type.String({ description: "The text to embed", minLength: 1 }), {
              description: "Batch of text values to embed",
              maxItems: 100,
            }),
          ]),
          truncate_inputs: Type.Optional(
            Type.Boolean({
              description:
                "When provided with too long context should the model error out or truncate the context to fit?",
              default: false,
            }),
          ),
        }),
        Type.Object({
          requests: Type.Array(
            Type.Union([
              Type.Object({
                contexts: Type.Array(
                  Type.Object({
                    text: Type.Optional(
                      Type.String({ description: "One of the provided context content", minLength: 1 }),
                    ),
                  }),
                  {
                    description:
                      "List of provided contexts. Note that the index in this array is important, as the response will refer to it.",
                  },
                ),
                query: Type.Optional(
                  Type.String({
                    description:
                      "A query you wish to perform against the provided contexts. If no query is provided the model with respond with embeddings for contexts",
                    minLength: 1,
                  }),
                ),
                truncate_inputs: Type.Optional(
                  Type.Boolean({
                    description:
                      "When provided with too long context should the model error out or truncate the context to fit?",
                    default: false,
                  }),
                ),
              }),
              Type.Object({
                text: Type.Union([
                  Type.String({ description: "The text to embed", minLength: 1 }),
                  Type.Array(Type.String({ description: "The text to embed", minLength: 1 }), {
                    description: "Batch of text values to embed",
                    maxItems: 100,
                  }),
                ]),
                truncate_inputs: Type.Optional(
                  Type.Boolean({
                    description:
                      "When provided with too long context should the model error out or truncate the context to fit?",
                    default: false,
                  }),
                ),
              }),
            ]),
            { description: "Batch of the embeddings requests to run using async-queue" },
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/baai/bge-m3 model.")
      .operationId("workers-ai-post-run-cf-baai-bge-m3")
      .tag("Workers AI Text Embeddings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/baai/bge-reranker-base", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        contexts: Type.Array(
          Type.Object({
            text: Type.Optional(Type.String({ description: "One of the provided context content", minLength: 1 })),
          }),
          {
            description:
              "List of provided contexts. Note that the index in this array is important, as the response will refer to it.",
          },
        ),
        query: Type.String({ description: "A query you wish to perform against the provided contexts.", minLength: 1 }),
        top_k: Type.Optional(
          Type.Integer({ description: "Number of returned results starting with the best score.", minimum: 1 }),
        ),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/baai/bge-reranker-base model.")
      .operationId("workers-ai-post-run-cf-baai-bge-reranker-base")
      .tag("Workers AI Text Classification")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/baai/bge-small-en-v1.5", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          pooling: Type.Optional(
            Type.Union([Type.Literal("mean"), Type.Literal("cls")], {
              description:
                "The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.",
            }),
          ),
          text: Type.Union([
            Type.String({ description: "The text to embed", minLength: 1 }),
            Type.Array(Type.String({ description: "The text to embed", minLength: 1 }), {
              description: "Batch of text values to embed",
              maxItems: 100,
            }),
          ]),
        }),
        Type.Object({
          requests: Type.Array(
            Type.Object({
              pooling: Type.Optional(
                Type.Union([Type.Literal("mean"), Type.Literal("cls")], {
                  description:
                    "The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.",
                }),
              ),
              text: Type.Union([
                Type.String({ description: "The text to embed", minLength: 1 }),
                Type.Array(Type.String({ description: "The text to embed", minLength: 1 }), {
                  description: "Batch of text values to embed",
                  maxItems: 100,
                }),
              ]),
            }),
            { description: "Batch of the embeddings requests to run using async-queue" },
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/baai/bge-small-en-v1.5 model.")
      .operationId("workers-ai-post-run-cf-baai-bge-small-en-v1-5")
      .tag("Workers AI Text Embeddings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/black-forest-labs/flux-1-schnell", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        prompt: Type.String({
          description: "A text description of the image you want to generate.",
          minLength: 1,
          maxLength: 2048,
        }),
        steps: Type.Optional(
          Type.Integer({
            description: "The number of diffusion steps; higher values can improve quality but take longer.",
            default: 4,
            maximum: 8,
          }),
        ),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/black-forest-labs/flux-1-schnell model.")
      .operationId("workers-ai-post-run-cf-black-forest-labs-flux-1-schnell")
      .tag("Workers AI Text To Image")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/bytedance/stable-diffusion-xl-lightning", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        guidance: Type.Optional(
          Type.Number({
            description:
              "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt",
            default: 7.5,
          }),
        ),
        height: Type.Optional(
          Type.Integer({ description: "The height of the generated image in pixels", minimum: 256, maximum: 2048 }),
        ),
        image: Type.Optional(
          Type.Array(Type.Number({ description: "A value between 0 and 255" }), {
            description:
              "For use with img2img tasks. An array of integers that represent the image data constrained to 8-bit unsigned integer values",
          }),
        ),
        image_b64: Type.Optional(
          Type.String({ description: "For use with img2img tasks. A base64-encoded string of the input image" }),
        ),
        mask: Type.Optional(
          Type.Array(Type.Number({ description: "A value between 0 and 255" }), {
            description:
              "An array representing An array of integers that represent mask image data for inpainting constrained to 8-bit unsigned integer values",
          }),
        ),
        negative_prompt: Type.Optional(
          Type.String({ description: "Text describing elements to avoid in the generated image" }),
        ),
        num_steps: Type.Optional(
          Type.Integer({
            description: "The number of diffusion steps; higher values can improve quality but take longer",
            default: 20,
            maximum: 20,
          }),
        ),
        prompt: Type.String({ description: "A text description of the image you want to generate", minLength: 1 }),
        seed: Type.Optional(Type.Integer({ description: "Random seed for reproducibility of the image generation" })),
        strength: Type.Optional(
          Type.Number({
            description:
              "A value between 0 and 1 indicating how strongly to apply the transformation during img2img tasks; lower values make the output closer to the input image",
            default: 1,
          }),
        ),
        width: Type.Optional(
          Type.Integer({ description: "The width of the generated image in pixels", minimum: 256, maximum: 2048 }),
        ),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/bytedance/stable-diffusion-xl-lightning model.")
      .operationId("workers-ai-post-run-cf-bytedance-stable-diffusion-xl-lightning")
      .tag("Workers AI Text To Image")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/run/@cf/deepgram/aura", {
      responses: {
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Open Websocket connection with @cf/deepgram/aura model.")
      .operationId("workers-ai-post-websocket-run-cf-deepgram-aura")
      .tag("Workers AI Text To Speech")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/run/@cf/deepgram/aura-1", {
      responses: {
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Open Websocket connection with @cf/deepgram/aura-1 model.")
      .operationId("workers-ai-post-websocket-run-cf-deepgram-aura-1")
      .tag("Workers AI Text To Speech")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/deepgram/aura-1", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        bit_rate: Type.Optional(
          Type.Number({
            description:
              "The bitrate of the audio in bits per second. Choose from predefined ranges or specific values based on the encoding type.",
          }),
        ),
        container: Type.Optional(
          Type.Union([Type.Literal("none"), Type.Literal("wav"), Type.Literal("ogg")], {
            description:
              "Container specifies the file format wrapper for the output audio. The available options depend on the encoding type..",
          }),
        ),
        encoding: Type.Optional(
          Type.Union(
            [
              Type.Literal("linear16"),
              Type.Literal("flac"),
              Type.Literal("mulaw"),
              Type.Literal("alaw"),
              Type.Literal("mp3"),
              Type.Literal("opus"),
              Type.Literal("aac"),
            ],
            { description: "Encoding of the output audio." },
          ),
        ),
        sample_rate: Type.Optional(
          Type.Number({
            description:
              "Sample Rate specifies the sample rate for the output audio. Based on the encoding, different sample rates are supported. For some encodings, the sample rate is not configurable",
          }),
        ),
        speaker: Type.Optional(
          Type.Union(
            [
              Type.Literal("angus"),
              Type.Literal("asteria"),
              Type.Literal("arcas"),
              Type.Literal("orion"),
              Type.Literal("orpheus"),
              Type.Literal("athena"),
              Type.Literal("luna"),
              Type.Literal("zeus"),
              Type.Literal("perseus"),
              Type.Literal("helios"),
              Type.Literal("hera"),
              Type.Literal("stella"),
            ],
            { description: "Speaker used to produce the audio." },
          ),
        ),
        text: Type.String({ description: "The text content to be converted to speech" }),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/deepgram/aura-1 model.")
      .operationId("workers-ai-post-run-cf-deepgram-aura-1")
      .tag("Workers AI Text To Speech")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/run/@cf/deepgram/aura-1-internal", {
      responses: {
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Open Websocket connection with @cf/deepgram/aura-1-internal model.")
      .operationId("workers-ai-post-websocket-run-cf-deepgram-aura-1-internal")
      .tag("Workers AI Text To Speech")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/run/@cf/deepgram/aura-2", {
      responses: {
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Open Websocket connection with @cf/deepgram/aura-2 model.")
      .operationId("workers-ai-post-websocket-run-cf-deepgram-aura-2")
      .tag("Workers AI Text To Speech")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/run/@cf/deepgram/nova-3", {
      responses: {
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Open Websocket connection with @cf/deepgram/nova-3 model.")
      .operationId("workers-ai-post-websocket-run-cf-deepgram-nova-3")
      .tag("Workers AI Automatic Speech Recognition")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/deepgram/nova-3", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        audio: Type.Object({
          body: Type.Unknown(),
          contentType: Type.String(),
        }),
        channels: Type.Optional(Type.Number({ description: "The number of channels in the submitted audio" })),
        custom_intent: Type.Optional(
          Type.String({
            description: "Custom intents you want the model to detect within your input audio if present",
          }),
        ),
        custom_intent_mode: Type.Optional(
          Type.Union([Type.Literal("extended"), Type.Literal("strict")], {
            description:
              "Sets how the model will interpret intents submitted to the custom_intent param. When strict, the model will only return intents submitted using the custom_intent param. When extended, the model will return its own detected intents in addition those submitted using the custom_intents param",
          }),
        ),
        custom_topic: Type.Optional(
          Type.String({
            description:
              "Custom topics you want the model to detect within your input audio or text if present Submit up to 100",
          }),
        ),
        custom_topic_mode: Type.Optional(
          Type.Union([Type.Literal("extended"), Type.Literal("strict")], {
            description:
              "Sets how the model will interpret strings submitted to the custom_topic param. When strict, the model will only return topics submitted using the custom_topic param. When extended, the model will return its own detected topics in addition to those submitted using the custom_topic param.",
          }),
        ),
        detect_entities: Type.Optional(
          Type.Boolean({ description: "Identifies and extracts key entities from content in submitted audio" }),
        ),
        detect_language: Type.Optional(
          Type.Boolean({ description: "Identifies the dominant language spoken in submitted audio" }),
        ),
        diarize: Type.Optional(
          Type.Boolean({
            description:
              "Recognize speaker changes. Each word in the transcript will be assigned a speaker number starting at 0",
          }),
        ),
        dictation: Type.Optional(
          Type.Boolean({ description: "Identify and extract key entities from content in submitted audio" }),
        ),
        encoding: Type.Optional(
          Type.Union(
            [
              Type.Literal("linear16"),
              Type.Literal("flac"),
              Type.Literal("mulaw"),
              Type.Literal("amr-nb"),
              Type.Literal("amr-wb"),
              Type.Literal("opus"),
              Type.Literal("speex"),
              Type.Literal("g729"),
            ],
            { description: "Specify the expected encoding of your submitted audio" },
          ),
        ),
        endpointing: Type.Optional(
          Type.String({
            description:
              "Indicates how long model will wait to detect whether a speaker has finished speaking or pauses for a significant period of time. When set to a value, the streaming endpoint immediately finalizes the transcription for the processed time range and returns the transcript with a speech_final parameter set to true. Can also be set to false to disable endpointing",
          }),
        ),
        extra: Type.Optional(
          Type.String({
            description:
              "Arbitrary key-value pairs that are attached to the API response for usage in downstream processing",
          }),
        ),
        filler_words: Type.Optional(
          Type.Boolean({
            description: "Filler Words can help transcribe interruptions in your audio, like 'uh' and 'um'",
          }),
        ),
        interim_results: Type.Optional(
          Type.Boolean({
            description:
              "Specifies whether the streaming endpoint should provide ongoing transcription updates as more audio is received. When set to true, the endpoint sends continuous updates, meaning transcription results may evolve over time. Note: Supported only for webosockets.",
          }),
        ),
        keyterm: Type.Optional(
          Type.String({ description: "Key term prompting can boost or suppress specialized terminology and brands." }),
        ),
        keywords: Type.Optional(
          Type.String({ description: "Keywords can boost or suppress specialized terminology and brands." }),
        ),
        language: Type.Optional(
          Type.String({
            description:
              "The BCP-47 language tag that hints at the primary spoken language. Depending on the Model and API endpoint you choose only certain languages are available.",
          }),
        ),
        measurements: Type.Optional(
          Type.Boolean({ description: "Spoken measurements will be converted to their corresponding abbreviations." }),
        ),
        mip_opt_out: Type.Optional(
          Type.Boolean({
            description:
              "Opts out requests from the Deepgram Model Improvement Program. Refer to our Docs for pricing impacts before setting this to true. https://dpgr.am/deepgram-mip.",
          }),
        ),
        mode: Type.Optional(
          Type.Union([Type.Literal("general"), Type.Literal("medical"), Type.Literal("finance")], {
            description:
              "Mode of operation for the model representing broad area of topic that will be talked about in the supplied audio",
          }),
        ),
        multichannel: Type.Optional(Type.Boolean({ description: "Transcribe each audio channel independently." })),
        numerals: Type.Optional(
          Type.Boolean({ description: "Numerals converts numbers from written format to numerical format." }),
        ),
        paragraphs: Type.Optional(
          Type.Boolean({ description: "Splits audio into paragraphs to improve transcript readability." }),
        ),
        profanity_filter: Type.Optional(
          Type.Boolean({
            description:
              "Profanity Filter looks for recognized profanity and converts it to the nearest recognized non-profane word or removes it from the transcript completely.",
          }),
        ),
        punctuate: Type.Optional(
          Type.Boolean({ description: "Add punctuation and capitalization to the transcript." }),
        ),
        redact: Type.Optional(
          Type.String({ description: "Redaction removes sensitive information from your transcripts." }),
        ),
        replace: Type.Optional(
          Type.String({ description: "Search for terms or phrases in submitted audio and replaces them." }),
        ),
        search: Type.Optional(Type.String({ description: "Search for terms or phrases in submitted audio." })),
        sentiment: Type.Optional(
          Type.Boolean({ description: "Recognizes the sentiment throughout a transcript or text." }),
        ),
        smart_format: Type.Optional(
          Type.Boolean({
            description:
              "Apply formatting to transcript output. When set to true, additional formatting will be applied to transcripts to improve readability.",
          }),
        ),
        topics: Type.Optional(Type.Boolean({ description: "Detect topics throughout a transcript or text." })),
        utt_split: Type.Optional(
          Type.Number({ description: "Seconds to wait before detecting a pause between words in submitted audio." }),
        ),
        utterance_end_ms: Type.Optional(
          Type.Boolean({
            description:
              "Indicates how long model will wait to send an UtteranceEnd message after a word has been transcribed. Use with interim_results. Note: Supported only for webosockets.",
          }),
        ),
        utterances: Type.Optional(Type.Boolean({ description: "Segments speech into meaningful semantic units." })),
        vad_events: Type.Optional(
          Type.Boolean({
            description:
              "Indicates that speech has started. You'll begin receiving Speech Started messages upon speech starting. Note: Supported only for webosockets.",
          }),
        ),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/deepgram/nova-3 model.")
      .operationId("workers-ai-post-run-cf-deepgram-nova-3")
      .tag("Workers AI Automatic Speech Recognition")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/run/@cf/deepgram/nova-3-internal", {
      responses: {
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Open Websocket connection with @cf/deepgram/nova-3-internal model.")
      .operationId("workers-ai-post-websocket-run-cf-deepgram-nova-3-internal")
      .tag("Workers AI Automatic Speech Recognition")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/deepseek-ai/deepseek-math-7b-instruct", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/deepseek-ai/deepseek-math-7b-instruct model.")
      .operationId("workers-ai-post-run-cf-deepseek-ai-deepseek-math-7b-instruct")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/deepseek-ai/deepseek-r1-distill-qwen-32b model.")
      .operationId("workers-ai-post-run-cf-deepseek-ai-deepseek-r1-distill-qwen-32b")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/defog/sqlcoder-7b-2", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/defog/sqlcoder-7b-2 model.")
      .operationId("workers-ai-post-run-cf-defog-sqlcoder-7b-2")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/facebook/bart-large-cnn", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        input_text: Type.String({ description: "The text that you want the model to summarize", minLength: 1 }),
        max_length: Type.Optional(
          Type.Integer({ description: "The maximum length of the generated summary in tokens", default: 1024 }),
        ),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/facebook/bart-large-cnn model.")
      .operationId("workers-ai-post-run-cf-facebook-bart-large-cnn")
      .tag("Workers AI Summarization")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/fblgit/una-cybertron-7b-v2-bf16", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/fblgit/una-cybertron-7b-v2-bf16 model.")
      .operationId("workers-ai-post-run-cf-fblgit-una-cybertron-7b-v2-bf16")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/google/embeddinggemma-300m", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        text: Type.Union([
          Type.String({ description: "The text to embed", minLength: 1 }),
          Type.Array(Type.String({ description: "The text to embed", minLength: 1 }), {
            description: "Batch of text values to embed",
            maxItems: 100,
          }),
        ]),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/google/embeddinggemma-300m model.")
      .operationId("workers-ai-post-run-cf-google-embeddinggemma-300m")
      .tag("Workers AI Text Embeddings")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/google/gemma-2b-it-lora", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/google/gemma-2b-it-lora model.")
      .operationId("workers-ai-post-run-cf-google-gemma-2b-it-lora")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/google/gemma-3-12b-it", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          guided_json: Type.Optional(
            Type.Unknown({ description: "JSON schema that should be fufilled for the response." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0,
              maximum: 2,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          guided_json: Type.Optional(
            Type.Unknown({ description: "JSON schema that should be fufilled for the response." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.Optional(
                Type.Union([
                  Type.String({ description: "The content of the message as a string." }),
                  Type.Array(
                    Type.Object({
                      image_url: Type.Optional(
                        Type.Object({
                          url: Type.Optional(
                            Type.String({
                              description:
                                "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted",
                            }),
                          ),
                        }),
                      ),
                      text: Type.Optional(Type.String()),
                      type: Type.Optional(Type.String({ description: "Type of the content provided" })),
                    }),
                  ),
                  Type.Object({
                    image_url: Type.Optional(
                      Type.Object({
                        url: Type.Optional(
                          Type.String({
                            description:
                              "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted",
                          }),
                        ),
                      }),
                    ),
                    text: Type.Optional(Type.String()),
                    type: Type.Optional(Type.String({ description: "Type of the content provided" })),
                  }),
                ]),
              ),
              role: Type.Optional(
                Type.String({
                  description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
                }),
              ),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0,
              maximum: 2,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/google/gemma-3-12b-it model.")
      .operationId("workers-ai-post-run-cf-google-gemma-3-12b-it")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/google/gemma-7b-it-lora", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/google/gemma-7b-it-lora model.")
      .operationId("workers-ai-post-run-cf-google-gemma-7b-it-lora")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/huggingface/distilbert-sst-2-int8", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        text: Type.String({ description: "The text that you want to classify", minLength: 1 }),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/huggingface/distilbert-sst-2-int8 model.")
      .operationId("workers-ai-post-run-cf-huggingface-distilbert-sst-2-int8")
      .tag("Workers AI Text Classification")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/leonardo/lucid-origin", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        guidance: Type.Optional(
          Type.Number({
            description:
              "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt",
            default: 4.5,
            minimum: 0,
            maximum: 10,
          }),
        ),
        height: Type.Optional(
          Type.Integer({
            description: "The height of the generated image in pixels",
            default: 1120,
            minimum: 0,
            maximum: 2500,
          }),
        ),
        num_steps: Type.Optional(
          Type.Integer({
            description: "The number of diffusion steps; higher values can improve quality but take longer",
            minimum: 1,
            maximum: 40,
          }),
        ),
        prompt: Type.String({ description: "A text description of the image you want to generate.", minLength: 1 }),
        seed: Type.Optional(
          Type.Integer({ description: "Random seed for reproducibility of the image generation", minimum: 0 }),
        ),
        steps: Type.Optional(
          Type.Integer({
            description: "The number of diffusion steps; higher values can improve quality but take longer",
            minimum: 1,
            maximum: 40,
          }),
        ),
        width: Type.Optional(
          Type.Integer({
            description: "The width of the generated image in pixels",
            default: 1120,
            minimum: 0,
            maximum: 2500,
          }),
        ),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/leonardo/lucid-origin model.")
      .operationId("workers-ai-post-run-cf-leonardo-lucid-origin")
      .tag("Workers AI Text To Image")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/leonardo/phoenix-1.0", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        guidance: Type.Optional(
          Type.Number({
            description:
              "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt",
            default: 2,
            minimum: 2,
            maximum: 10,
          }),
        ),
        height: Type.Optional(
          Type.Integer({
            description: "The height of the generated image in pixels",
            default: 1024,
            minimum: 0,
            maximum: 2048,
          }),
        ),
        negative_prompt: Type.Optional(
          Type.String({ description: "Specify what to exclude from the generated images", minLength: 1 }),
        ),
        num_steps: Type.Optional(
          Type.Integer({
            description: "The number of diffusion steps; higher values can improve quality but take longer",
            default: 25,
            minimum: 1,
            maximum: 50,
          }),
        ),
        prompt: Type.String({ description: "A text description of the image you want to generate.", minLength: 1 }),
        seed: Type.Optional(
          Type.Integer({ description: "Random seed for reproducibility of the image generation", minimum: 0 }),
        ),
        width: Type.Optional(
          Type.Integer({
            description: "The width of the generated image in pixels",
            default: 1024,
            minimum: 0,
            maximum: 2048,
          }),
        ),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/leonardo/phoenix-1.0 model.")
      .operationId("workers-ai-post-run-cf-leonardo-phoenix-1-0")
      .tag("Workers AI Text To Image")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/lykon/dreamshaper-8-lcm", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        guidance: Type.Optional(
          Type.Number({
            description:
              "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt",
            default: 7.5,
          }),
        ),
        height: Type.Optional(
          Type.Integer({ description: "The height of the generated image in pixels", minimum: 256, maximum: 2048 }),
        ),
        image: Type.Optional(
          Type.Array(Type.Number({ description: "A value between 0 and 255" }), {
            description:
              "For use with img2img tasks. An array of integers that represent the image data constrained to 8-bit unsigned integer values",
          }),
        ),
        image_b64: Type.Optional(
          Type.String({ description: "For use with img2img tasks. A base64-encoded string of the input image" }),
        ),
        mask: Type.Optional(
          Type.Array(Type.Number({ description: "A value between 0 and 255" }), {
            description:
              "An array representing An array of integers that represent mask image data for inpainting constrained to 8-bit unsigned integer values",
          }),
        ),
        negative_prompt: Type.Optional(
          Type.String({ description: "Text describing elements to avoid in the generated image" }),
        ),
        num_steps: Type.Optional(
          Type.Integer({
            description: "The number of diffusion steps; higher values can improve quality but take longer",
            default: 20,
            maximum: 20,
          }),
        ),
        prompt: Type.String({ description: "A text description of the image you want to generate", minLength: 1 }),
        seed: Type.Optional(Type.Integer({ description: "Random seed for reproducibility of the image generation" })),
        strength: Type.Optional(
          Type.Number({
            description:
              "A value between 0 and 1 indicating how strongly to apply the transformation during img2img tasks; lower values make the output closer to the input image",
            default: 1,
          }),
        ),
        width: Type.Optional(
          Type.Integer({ description: "The width of the generated image in pixels", minimum: 256, maximum: 2048 }),
        ),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/lykon/dreamshaper-8-lcm model.")
      .operationId("workers-ai-post-run-cf-lykon-dreamshaper-8-lcm")
      .tag("Workers AI Text To Image")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta-llama/llama-2-7b-chat-hf-lora", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta-llama/llama-2-7b-chat-hf-lora model.")
      .operationId("workers-ai-post-run-cf-meta-llama-llama-2-7b-chat-hf-lora")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/llama-2-7b-chat-fp16", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/llama-2-7b-chat-fp16 model.")
      .operationId("workers-ai-post-run-cf-meta-llama-2-7b-chat-fp16")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/llama-2-7b-chat-int8", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/llama-2-7b-chat-int8 model.")
      .operationId("workers-ai-post-run-cf-meta-llama-2-7b-chat-int8")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/llama-3-8b-instruct", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/llama-3-8b-instruct model.")
      .operationId("workers-ai-post-run-cf-meta-llama-3-8b-instruct")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/llama-3-8b-instruct-awq", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/llama-3-8b-instruct-awq model.")
      .operationId("workers-ai-post-run-cf-meta-llama-3-8b-instruct-awq")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/llama-3.1-70b-instruct", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/llama-3.1-70b-instruct model.")
      .operationId("workers-ai-post-run-cf-meta-llama-3-1-70b-instruct")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/llama-3.1-70b-instruct-preview", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/llama-3.1-70b-instruct-preview model.")
      .operationId("workers-ai-post-run-cf-meta-llama-3-1-70b-instruct-preview")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/llama-3.1-70b-preview", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/llama-3.1-70b-preview model.")
      .operationId("workers-ai-post-run-cf-meta-llama-3-1-70b-preview")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/llama-3.1-8b-instruct-awq", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/llama-3.1-8b-instruct-awq model.")
      .operationId("workers-ai-post-run-cf-meta-llama-3-1-8b-instruct-awq")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/llama-3.1-8b-instruct-fast", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/llama-3.1-8b-instruct-fast model.")
      .operationId("workers-ai-post-run-cf-meta-llama-3-1-8b-instruct-fast")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/llama-3.1-8b-instruct-fp8", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/llama-3.1-8b-instruct-fp8 model.")
      .operationId("workers-ai-post-run-cf-meta-llama-3-1-8b-instruct-fp8")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/llama-3.1-8b-preview", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/llama-3.1-8b-preview model.")
      .operationId("workers-ai-post-run-cf-meta-llama-3-1-8b-preview")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/llama-3.2-11b-vision-instruct", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          image: Type.Optional(
            Type.Union([
              Type.Array(Type.Number({ description: "A value between 0 and 255" }), {
                description:
                  "An array of integers that represent the image data constrained to 8-bit unsigned integer values.  Deprecated, use image as a part of messages now.",
              }),
              Type.String({
                description:
                  "Binary string representing the image contents.  Deprecated, use image as a part of messages now.",
                format: "binary",
              }),
            ]),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
            maxLength: 131072,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0,
              maximum: 2,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          image: Type.Optional(
            Type.Union([
              Type.Array(Type.Number({ description: "A value between 0 and 255" }), {
                description:
                  "An array of integers that represent the image data constrained to 8-bit unsigned integer values. Deprecated, use image as a part of messages now.",
              }),
              Type.String({
                description:
                  "Binary string representing the image contents. Deprecated, use image as a part of messages now.",
                format: "binary",
              }),
            ]),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.Optional(
                Type.Union([
                  Type.String({ description: "The content of the message as a string." }),
                  Type.Array(
                    Type.Object({
                      image_url: Type.Optional(
                        Type.Object({
                          url: Type.Optional(
                            Type.String({
                              description:
                                "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted",
                            }),
                          ),
                        }),
                      ),
                      text: Type.Optional(Type.String()),
                      type: Type.Optional(Type.String({ description: "Type of the content provided" })),
                    }),
                  ),
                  Type.Object({
                    image_url: Type.Optional(
                      Type.Object({
                        url: Type.Optional(
                          Type.String({
                            description:
                              "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted",
                          }),
                        ),
                      }),
                    ),
                    text: Type.Optional(Type.String()),
                    type: Type.Optional(Type.String({ description: "Type of the content provided" })),
                  }),
                ]),
              ),
              role: Type.Optional(
                Type.String({
                  description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
                }),
              ),
              tool_call_id: Type.Optional(
                Type.String({
                  description:
                    "The tool call id. Must be supplied for tool calls for Mistral-3. If you don't know what to put here you can fall back to 000000001",
                }),
              ),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({ description: "If true, the response will be streamed back incrementally.", default: false }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0,
              maximum: 2,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/llama-3.2-11b-vision-instruct model.")
      .operationId("workers-ai-post-run-cf-meta-llama-3-2-11b-vision-instruct")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/llama-3.2-1b-instruct", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/llama-3.2-1b-instruct model.")
      .operationId("workers-ai-post-run-cf-meta-llama-3-2-1b-instruct")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/llama-3.2-3b-instruct", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/llama-3.2-3b-instruct model.")
      .operationId("workers-ai-post-run-cf-meta-llama-3-2-3b-instruct")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/llama-4-scout-17b-16e-instruct", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          guided_json: Type.Optional(
            Type.Unknown({ description: "JSON schema that should be fulfilled for the response." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.15,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0,
              maximum: 2,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          guided_json: Type.Optional(
            Type.Unknown({ description: "JSON schema that should be fufilled for the response." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.Optional(
                Type.Union([
                  Type.String({ description: "The content of the message as a string." }),
                  Type.Array(
                    Type.Object({
                      image_url: Type.Optional(
                        Type.Object({
                          url: Type.Optional(
                            Type.String({
                              description:
                                "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted",
                            }),
                          ),
                        }),
                      ),
                      text: Type.Optional(Type.String()),
                      type: Type.Optional(Type.String({ description: "Type of the content provided" })),
                    }),
                  ),
                  Type.Object({
                    image_url: Type.Optional(
                      Type.Object({
                        url: Type.Optional(
                          Type.String({
                            description:
                              "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted",
                          }),
                        ),
                      }),
                    ),
                    text: Type.Optional(Type.String()),
                    type: Type.Optional(Type.String({ description: "Type of the content provided" })),
                  }),
                ]),
              ),
              role: Type.Optional(
                Type.String({
                  description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
                }),
              ),
              tool_call_id: Type.Optional(
                Type.String({
                  description: "The tool call id. If you don't know what to put here you can fall back to 000000001",
                }),
              ),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.15,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0,
              maximum: 2,
            }),
          ),
        }),
        Type.Object({
          requests: Type.Array(
            Type.Union([
              Type.Object({
                frequency_penalty: Type.Optional(
                  Type.Number({
                    description: "Decreases the likelihood of the model repeating the same lines verbatim.",
                    minimum: 0,
                    maximum: 2,
                  }),
                ),
                guided_json: Type.Optional(
                  Type.Unknown({ description: "JSON schema that should be fulfilled for the response." }),
                ),
                max_tokens: Type.Optional(
                  Type.Integer({
                    description: "The maximum number of tokens to generate in the response.",
                    default: 256,
                  }),
                ),
                presence_penalty: Type.Optional(
                  Type.Number({
                    description: "Increases the likelihood of the model introducing new topics.",
                    minimum: 0,
                    maximum: 2,
                  }),
                ),
                prompt: Type.String({
                  description: "The input text prompt for the model to generate a response.",
                  minLength: 1,
                }),
                raw: Type.Optional(
                  Type.Boolean({
                    description:
                      "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
                    default: false,
                  }),
                ),
                repetition_penalty: Type.Optional(
                  Type.Number({
                    description: "Penalty for repeated tokens; higher values discourage repetition.",
                    minimum: 0,
                    maximum: 2,
                  }),
                ),
                response_format: Type.Optional(
                  Type.Object({
                    json_schema: Type.Optional(Type.Unknown()),
                    type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
                  }),
                ),
                seed: Type.Optional(
                  Type.Integer({
                    description: "Random seed for reproducibility of the generation.",
                    minimum: 1,
                    maximum: 9999999999,
                  }),
                ),
                stream: Type.Optional(
                  Type.Boolean({
                    description:
                      "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
                    default: false,
                  }),
                ),
                temperature: Type.Optional(
                  Type.Number({
                    description: "Controls the randomness of the output; higher values produce more random results.",
                    default: 0.15,
                    minimum: 0,
                    maximum: 5,
                  }),
                ),
                top_k: Type.Optional(
                  Type.Integer({
                    description:
                      "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
                    minimum: 1,
                    maximum: 50,
                  }),
                ),
                top_p: Type.Optional(
                  Type.Number({
                    description:
                      "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
                    minimum: 0,
                    maximum: 2,
                  }),
                ),
              }),
              Type.Object({
                frequency_penalty: Type.Optional(
                  Type.Number({
                    description: "Decreases the likelihood of the model repeating the same lines verbatim.",
                    minimum: 0,
                    maximum: 2,
                  }),
                ),
                functions: Type.Optional(
                  Type.Array(
                    Type.Object({
                      code: Type.String(),
                      name: Type.String(),
                    }),
                  ),
                ),
                guided_json: Type.Optional(
                  Type.Unknown({ description: "JSON schema that should be fufilled for the response." }),
                ),
                max_tokens: Type.Optional(
                  Type.Integer({
                    description: "The maximum number of tokens to generate in the response.",
                    default: 256,
                  }),
                ),
                messages: Type.Array(
                  Type.Object({
                    content: Type.Optional(
                      Type.Union([
                        Type.String({ description: "The content of the message as a string." }),
                        Type.Array(
                          Type.Object({
                            image_url: Type.Optional(
                              Type.Object({
                                url: Type.Optional(
                                  Type.String({
                                    description:
                                      "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted",
                                  }),
                                ),
                              }),
                            ),
                            text: Type.Optional(Type.String()),
                            type: Type.Optional(Type.String({ description: "Type of the content provided" })),
                          }),
                        ),
                        Type.Object({
                          image_url: Type.Optional(
                            Type.Object({
                              url: Type.Optional(
                                Type.String({
                                  description:
                                    "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted",
                                }),
                              ),
                            }),
                          ),
                          text: Type.Optional(Type.String()),
                          type: Type.Optional(Type.String({ description: "Type of the content provided" })),
                        }),
                      ]),
                    ),
                    role: Type.Optional(
                      Type.String({
                        description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
                      }),
                    ),
                    tool_call_id: Type.Optional(
                      Type.String({
                        description:
                          "The tool call id. If you don't know what to put here you can fall back to 000000001",
                      }),
                    ),
                  }),
                  { description: "An array of message objects representing the conversation history." },
                ),
                presence_penalty: Type.Optional(
                  Type.Number({
                    description: "Increases the likelihood of the model introducing new topics.",
                    minimum: 0,
                    maximum: 2,
                  }),
                ),
                raw: Type.Optional(
                  Type.Boolean({
                    description:
                      "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
                    default: false,
                  }),
                ),
                repetition_penalty: Type.Optional(
                  Type.Number({
                    description: "Penalty for repeated tokens; higher values discourage repetition.",
                    minimum: 0,
                    maximum: 2,
                  }),
                ),
                response_format: Type.Optional(
                  Type.Object({
                    json_schema: Type.Optional(Type.Unknown()),
                    type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
                  }),
                ),
                seed: Type.Optional(
                  Type.Integer({
                    description: "Random seed for reproducibility of the generation.",
                    minimum: 1,
                    maximum: 9999999999,
                  }),
                ),
                stream: Type.Optional(
                  Type.Boolean({
                    description:
                      "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
                    default: false,
                  }),
                ),
                temperature: Type.Optional(
                  Type.Number({
                    description: "Controls the randomness of the output; higher values produce more random results.",
                    default: 0.15,
                    minimum: 0,
                    maximum: 5,
                  }),
                ),
                tools: Type.Optional(
                  Type.Array(
                    Type.Union([
                      Type.Object({
                        description: Type.String({ description: "A brief description of what the tool does." }),
                        name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                        parameters: Type.Object(
                          {
                            properties: Type.Record(
                              Type.String(),
                              Type.Object({
                                description: Type.String({ description: "A description of the expected parameter." }),
                                type: Type.String({ description: "The data type of the parameter." }),
                              }),
                            ),
                            required: Type.Optional(
                              Type.Array(Type.String(), { description: "List of required parameter names." }),
                            ),
                            type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                          },
                          { description: "Schema defining the parameters accepted by the tool." },
                        ),
                      }),
                      Type.Object({
                        function: Type.Object(
                          {
                            description: Type.String({ description: "A brief description of what the function does." }),
                            name: Type.String({ description: "The name of the function." }),
                            parameters: Type.Object(
                              {
                                properties: Type.Record(
                                  Type.String(),
                                  Type.Object({
                                    description: Type.String({
                                      description: "A description of the expected parameter.",
                                    }),
                                    type: Type.String({ description: "The data type of the parameter." }),
                                  }),
                                ),
                                required: Type.Optional(
                                  Type.Array(Type.String(), { description: "List of required parameter names." }),
                                ),
                                type: Type.String({
                                  description: "The type of the parameters object (usually 'object').",
                                }),
                              },
                              { description: "Schema defining the parameters accepted by the function." },
                            ),
                          },
                          { description: "Details of the function tool." },
                        ),
                        type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                      }),
                    ]),
                    { description: "A list of tools available for the assistant to use." },
                  ),
                ),
                top_k: Type.Optional(
                  Type.Integer({
                    description:
                      "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
                    minimum: 1,
                    maximum: 50,
                  }),
                ),
                top_p: Type.Optional(
                  Type.Number({
                    description:
                      "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
                    minimum: 0,
                    maximum: 2,
                  }),
                ),
              }),
            ]),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/llama-4-scout-17b-16e-instruct model.")
      .operationId("workers-ai-post-run-cf-meta-llama-4-scout-17b-16e-instruct")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/llama-guard-3-8b", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        max_tokens: Type.Optional(
          Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
        ),
        messages: Type.Array(
          Type.Object({
            content: Type.String({ description: "The content of the message as a string." }),
            role: Type.Union([Type.Literal("user"), Type.Literal("assistant")], {
              description: "The role of the message sender must alternate between 'user' and 'assistant'.",
            }),
          }),
          { description: "An array of message objects representing the conversation history." },
        ),
        response_format: Type.Optional(
          Type.Object(
            {
              type: Type.Optional(
                Type.String({ description: "Set to json_object to process and output generated text as JSON." }),
              ),
            },
            { description: "Dictate the output format of the generated response." },
          ),
        ),
        temperature: Type.Optional(
          Type.Number({
            description: "Controls the randomness of the output; higher values produce more random results.",
            default: 0.6,
            minimum: 0,
            maximum: 5,
          }),
        ),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/llama-guard-3-8b model.")
      .operationId("workers-ai-post-run-cf-meta-llama-guard-3-8b")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/meta/m2m100-1.2b", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          source_lang: Type.Optional(
            Type.String({
              description:
                "The language code of the source text (e.g., 'en' for English). Defaults to 'en' if not specified",
              default: "en",
            }),
          ),
          target_lang: Type.String({
            description: "The language code to translate the text into (e.g., 'es' for Spanish)",
          }),
          text: Type.String({ description: "The text to be translated", minLength: 1 }),
        }),
        Type.Object({
          requests: Type.Array(
            Type.Object({
              source_lang: Type.Optional(
                Type.String({
                  description:
                    "The language code of the source text (e.g., 'en' for English). Defaults to 'en' if not specified",
                  default: "en",
                }),
              ),
              target_lang: Type.String({
                description: "The language code to translate the text into (e.g., 'es' for Spanish)",
              }),
              text: Type.String({ description: "The text to be translated", minLength: 1 }),
            }),
            { description: "Batch of the embeddings requests to run using async-queue" },
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/meta/m2m100-1.2b model.")
      .operationId("workers-ai-post-run-cf-meta-m2m100-1-2b")
      .tag("Workers AI Translation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/microsoft/phi-2", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/microsoft/phi-2 model.")
      .operationId("workers-ai-post-run-cf-microsoft-phi-2")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/mistral/mistral-7b-instruct-v0.1", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/mistral/mistral-7b-instruct-v0.1 model.")
      .operationId("workers-ai-post-run-cf-mistral-mistral-7b-instruct-v0-1")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/mistral/mistral-7b-instruct-v0.2-lora", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/mistral/mistral-7b-instruct-v0.2-lora model.")
      .operationId("workers-ai-post-run-cf-mistral-mistral-7b-instruct-v0-2-lora")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/mistralai/mistral-small-3.1-24b-instruct", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          guided_json: Type.Optional(
            Type.Unknown({ description: "JSON schema that should be fulfilled for the response." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.15,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0,
              maximum: 2,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          guided_json: Type.Optional(
            Type.Unknown({ description: "JSON schema that should be fufilled for the response." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.Optional(
                Type.Union([
                  Type.String({ description: "The content of the message as a string." }),
                  Type.Array(
                    Type.Object({
                      image_url: Type.Optional(
                        Type.Object({
                          url: Type.Optional(
                            Type.String({
                              description:
                                "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted",
                            }),
                          ),
                        }),
                      ),
                      text: Type.Optional(Type.String()),
                      type: Type.Optional(Type.String({ description: "Type of the content provided" })),
                    }),
                  ),
                  Type.Object({
                    image_url: Type.Optional(
                      Type.Object({
                        url: Type.Optional(
                          Type.String({
                            description:
                              "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted",
                          }),
                        ),
                      }),
                    ),
                    text: Type.Optional(Type.String()),
                    type: Type.Optional(Type.String({ description: "Type of the content provided" })),
                  }),
                ]),
              ),
              role: Type.Optional(
                Type.String({
                  description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
                }),
              ),
              tool_call_id: Type.Optional(
                Type.String({
                  description:
                    "The tool call id. Must be supplied for tool calls for Mistral-3. If you don't know what to put here you can fall back to 000000001",
                }),
              ),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.15,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0,
              maximum: 2,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/mistralai/mistral-small-3.1-24b-instruct model.")
      .operationId("workers-ai-post-run-cf-mistralai-mistral-small-3-1-24b-instruct")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/myshell-ai/melotts", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        lang: Type.Optional(
          Type.String({
            description:
              "The speech language (e.g., 'en' for English, 'fr' for French). Defaults to 'en' if not specified",
            default: "en",
          }),
        ),
        prompt: Type.String({ description: "A text description of the audio you want to generate", minLength: 1 }),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/myshell-ai/melotts model.")
      .operationId("workers-ai-post-run-cf-myshell-ai-melotts")
      .tag("Workers AI Text To Speech")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/openai/gpt-oss-120b", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          input: Type.Union([Type.String(), Type.Array(Type.Unknown())], {
            description:
              "Responses API Input messages. Refer to OpenAI Responses API docs to learn more about supported content types",
          }),
          reasoning: Type.Optional(
            Type.Object({
              effort: Type.Optional(
                Type.Union([Type.Literal("low"), Type.Literal("medium"), Type.Literal("high")], {
                  description:
                    "Constrains effort on reasoning for reasoning models. Currently supported values are low, medium, and high. Reducing reasoning effort can result in faster responses and fewer tokens used on reasoning in a response.",
                }),
              ),
              summary: Type.Optional(
                Type.Union([Type.Literal("auto"), Type.Literal("concise"), Type.Literal("detailed")], {
                  description:
                    "A summary of the reasoning performed by the model. This can be useful for debugging and understanding the model's reasoning process. One of auto, concise, or detailed.",
                }),
              ),
            }),
          ),
        }),
        Type.Object({
          requests: Type.Array(
            Type.Object({
              input: Type.Union([Type.String(), Type.Array(Type.Unknown())], {
                description:
                  "Responses API Input messages. Refer to OpenAI Responses API docs to learn more about supported content types",
              }),
              reasoning: Type.Optional(
                Type.Object({
                  effort: Type.Optional(
                    Type.Union([Type.Literal("low"), Type.Literal("medium"), Type.Literal("high")], {
                      description:
                        "Constrains effort on reasoning for reasoning models. Currently supported values are low, medium, and high. Reducing reasoning effort can result in faster responses and fewer tokens used on reasoning in a response.",
                    }),
                  ),
                  summary: Type.Optional(
                    Type.Union([Type.Literal("auto"), Type.Literal("concise"), Type.Literal("detailed")], {
                      description:
                        "A summary of the reasoning performed by the model. This can be useful for debugging and understanding the model's reasoning process. One of auto, concise, or detailed.",
                    }),
                  ),
                }),
              ),
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/openai/gpt-oss-120b model.")
      .operationId("workers-ai-post-run-cf-openai-gpt-oss-120b")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/openai/gpt-oss-20b", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          input: Type.Union([Type.String(), Type.Array(Type.Unknown())], {
            description:
              "Responses API Input messages. Refer to OpenAI Responses API docs to learn more about supported content types",
          }),
          reasoning: Type.Optional(
            Type.Object({
              effort: Type.Optional(
                Type.Union([Type.Literal("low"), Type.Literal("medium"), Type.Literal("high")], {
                  description:
                    "Constrains effort on reasoning for reasoning models. Currently supported values are low, medium, and high. Reducing reasoning effort can result in faster responses and fewer tokens used on reasoning in a response.",
                }),
              ),
              summary: Type.Optional(
                Type.Union([Type.Literal("auto"), Type.Literal("concise"), Type.Literal("detailed")], {
                  description:
                    "A summary of the reasoning performed by the model. This can be useful for debugging and understanding the model's reasoning process. One of auto, concise, or detailed.",
                }),
              ),
            }),
          ),
        }),
        Type.Object({
          requests: Type.Array(
            Type.Object({
              input: Type.Union([Type.String(), Type.Array(Type.Unknown())], {
                description:
                  "Responses API Input messages. Refer to OpenAI Responses API docs to learn more about supported content types",
              }),
              reasoning: Type.Optional(
                Type.Object({
                  effort: Type.Optional(
                    Type.Union([Type.Literal("low"), Type.Literal("medium"), Type.Literal("high")], {
                      description:
                        "Constrains effort on reasoning for reasoning models. Currently supported values are low, medium, and high. Reducing reasoning effort can result in faster responses and fewer tokens used on reasoning in a response.",
                    }),
                  ),
                  summary: Type.Optional(
                    Type.Union([Type.Literal("auto"), Type.Literal("concise"), Type.Literal("detailed")], {
                      description:
                        "A summary of the reasoning performed by the model. This can be useful for debugging and understanding the model's reasoning process. One of auto, concise, or detailed.",
                    }),
                  ),
                }),
              ),
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/openai/gpt-oss-20b model.")
      .operationId("workers-ai-post-run-cf-openai-gpt-oss-20b")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/openai/whisper", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/openai/whisper model.")
      .operationId("workers-ai-post-run-cf-openai-whisper")
      .tag("Workers AI Automatic Speech Recognition")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/openai/whisper-large-v3-turbo", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        audio: Type.String({ description: "Base64 encoded value of the audio data." }),
        initial_prompt: Type.Optional(
          Type.String({
            description: "A text prompt to help provide context to the model on the contents of the audio.",
          }),
        ),
        language: Type.Optional(
          Type.String({ description: "The language of the audio being transcribed or translated." }),
        ),
        prefix: Type.Optional(
          Type.String({
            description:
              "The prefix it appended the the beginning of the output of the transcription and can guide the transcription result.",
          }),
        ),
        task: Type.Optional(
          Type.String({ description: "Supported tasks are 'translate' or 'transcribe'.", default: "transcribe" }),
        ),
        vad_filter: Type.Optional(
          Type.Boolean({ description: "Preprocess the audio with a voice activity detection model.", default: false }),
        ),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/openai/whisper-large-v3-turbo model.")
      .operationId("workers-ai-post-run-cf-openai-whisper-large-v3-turbo")
      .tag("Workers AI Automatic Speech Recognition")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/openai/whisper-tiny-en", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/openai/whisper-tiny-en model.")
      .operationId("workers-ai-post-run-cf-openai-whisper-tiny-en")
      .tag("Workers AI Automatic Speech Recognition")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/openchat/openchat-3.5-0106", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/openchat/openchat-3.5-0106 model.")
      .operationId("workers-ai-post-run-cf-openchat-openchat-3-5-0106")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/run/@cf/pipecat-ai/smart-turn-v2", {
      responses: {
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Open Websocket connection with @cf/pipecat-ai/smart-turn-v2 model.")
      .operationId("workers-ai-post-websocket-run-cf-pipecat-ai-smart-turn-v2")
      .tag("Workers AI Dumb Pipe")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/qwen/qwen1.5-0.5b-chat", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/qwen/qwen1.5-0.5b-chat model.")
      .operationId("workers-ai-post-run-cf-qwen-qwen1-5-0-5b-chat")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/qwen/qwen1.5-1.8b-chat", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/qwen/qwen1.5-1.8b-chat model.")
      .operationId("workers-ai-post-run-cf-qwen-qwen1-5-1-8b-chat")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/qwen/qwen1.5-14b-chat-awq", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/qwen/qwen1.5-14b-chat-awq model.")
      .operationId("workers-ai-post-run-cf-qwen-qwen1-5-14b-chat-awq")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/qwen/qwen1.5-7b-chat-awq", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/qwen/qwen1.5-7b-chat-awq model.")
      .operationId("workers-ai-post-run-cf-qwen-qwen1-5-7b-chat-awq")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/qwen/qwen2.5-coder-32b-instruct", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0,
              maximum: 2,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0,
              maximum: 2,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/qwen/qwen2.5-coder-32b-instruct model.")
      .operationId("workers-ai-post-run-cf-qwen-qwen2-5-coder-32b-instruct")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/qwen/qwq-32b", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          guided_json: Type.Optional(
            Type.Unknown({ description: "JSON schema that should be fulfilled for the response." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.15,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0,
              maximum: 2,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          guided_json: Type.Optional(
            Type.Unknown({ description: "JSON schema that should be fufilled for the response." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.Optional(
                Type.Union([
                  Type.String({ description: "The content of the message as a string." }),
                  Type.Array(
                    Type.Object({
                      image_url: Type.Optional(
                        Type.Object({
                          url: Type.Optional(
                            Type.String({
                              description:
                                "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted",
                            }),
                          ),
                        }),
                      ),
                      text: Type.Optional(Type.String()),
                      type: Type.Optional(Type.String({ description: "Type of the content provided" })),
                    }),
                  ),
                  Type.Object({
                    image_url: Type.Optional(
                      Type.Object({
                        url: Type.Optional(
                          Type.String({
                            description:
                              "image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted",
                          }),
                        ),
                      }),
                    ),
                    text: Type.Optional(Type.String()),
                    type: Type.Optional(Type.String({ description: "Type of the content provided" })),
                  }),
                ]),
              ),
              role: Type.Optional(
                Type.String({
                  description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
                }),
              ),
              tool_call_id: Type.Optional(
                Type.String({
                  description:
                    "The tool call id. Must be supplied for tool calls for Mistral-3. If you don't know what to put here you can fall back to 000000001",
                }),
              ),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.15,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0,
              maximum: 2,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/qwen/qwq-32b model.")
      .operationId("workers-ai-post-run-cf-qwen-qwq-32b")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/runwayml/stable-diffusion-v1-5-img2img", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        guidance: Type.Optional(
          Type.Number({
            description:
              "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt",
            default: 7.5,
          }),
        ),
        height: Type.Optional(
          Type.Integer({ description: "The height of the generated image in pixels", minimum: 256, maximum: 2048 }),
        ),
        image: Type.Optional(
          Type.Array(Type.Number({ description: "A value between 0 and 255" }), {
            description:
              "For use with img2img tasks. An array of integers that represent the image data constrained to 8-bit unsigned integer values",
          }),
        ),
        image_b64: Type.Optional(
          Type.String({ description: "For use with img2img tasks. A base64-encoded string of the input image" }),
        ),
        mask: Type.Optional(
          Type.Array(Type.Number({ description: "A value between 0 and 255" }), {
            description:
              "An array representing An array of integers that represent mask image data for inpainting constrained to 8-bit unsigned integer values",
          }),
        ),
        negative_prompt: Type.Optional(
          Type.String({ description: "Text describing elements to avoid in the generated image" }),
        ),
        num_steps: Type.Optional(
          Type.Integer({
            description: "The number of diffusion steps; higher values can improve quality but take longer",
            default: 20,
            maximum: 20,
          }),
        ),
        prompt: Type.String({ description: "A text description of the image you want to generate", minLength: 1 }),
        seed: Type.Optional(Type.Integer({ description: "Random seed for reproducibility of the image generation" })),
        strength: Type.Optional(
          Type.Number({
            description:
              "A value between 0 and 1 indicating how strongly to apply the transformation during img2img tasks; lower values make the output closer to the input image",
            default: 1,
          }),
        ),
        width: Type.Optional(
          Type.Integer({ description: "The width of the generated image in pixels", minimum: 256, maximum: 2048 }),
        ),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/runwayml/stable-diffusion-v1-5-img2img model.")
      .operationId("workers-ai-post-run-cf-runwayml-stable-diffusion-v1-5-img2img")
      .tag("Workers AI Text To Image")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/runwayml/stable-diffusion-v1-5-inpainting", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        guidance: Type.Optional(
          Type.Number({
            description:
              "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt",
            default: 7.5,
          }),
        ),
        height: Type.Optional(
          Type.Integer({ description: "The height of the generated image in pixels", minimum: 256, maximum: 2048 }),
        ),
        image: Type.Optional(
          Type.Array(Type.Number({ description: "A value between 0 and 255" }), {
            description:
              "For use with img2img tasks. An array of integers that represent the image data constrained to 8-bit unsigned integer values",
          }),
        ),
        image_b64: Type.Optional(
          Type.String({ description: "For use with img2img tasks. A base64-encoded string of the input image" }),
        ),
        mask: Type.Optional(
          Type.Array(Type.Number({ description: "A value between 0 and 255" }), {
            description:
              "An array representing An array of integers that represent mask image data for inpainting constrained to 8-bit unsigned integer values",
          }),
        ),
        negative_prompt: Type.Optional(
          Type.String({ description: "Text describing elements to avoid in the generated image" }),
        ),
        num_steps: Type.Optional(
          Type.Integer({
            description: "The number of diffusion steps; higher values can improve quality but take longer",
            default: 20,
            maximum: 20,
          }),
        ),
        prompt: Type.String({ description: "A text description of the image you want to generate", minLength: 1 }),
        seed: Type.Optional(Type.Integer({ description: "Random seed for reproducibility of the image generation" })),
        strength: Type.Optional(
          Type.Number({
            description:
              "A value between 0 and 1 indicating how strongly to apply the transformation during img2img tasks; lower values make the output closer to the input image",
            default: 1,
          }),
        ),
        width: Type.Optional(
          Type.Integer({ description: "The width of the generated image in pixels", minimum: 256, maximum: 2048 }),
        ),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/runwayml/stable-diffusion-v1-5-inpainting model.")
      .operationId("workers-ai-post-run-cf-runwayml-stable-diffusion-v1-5-inpainting")
      .tag("Workers AI Text To Image")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/stabilityai/stable-diffusion-xl-base-1.0", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Object({
        guidance: Type.Optional(
          Type.Number({
            description:
              "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt",
            default: 7.5,
          }),
        ),
        height: Type.Optional(
          Type.Integer({ description: "The height of the generated image in pixels", minimum: 256, maximum: 2048 }),
        ),
        image: Type.Optional(
          Type.Array(Type.Number({ description: "A value between 0 and 255" }), {
            description:
              "For use with img2img tasks. An array of integers that represent the image data constrained to 8-bit unsigned integer values",
          }),
        ),
        image_b64: Type.Optional(
          Type.String({ description: "For use with img2img tasks. A base64-encoded string of the input image" }),
        ),
        mask: Type.Optional(
          Type.Array(Type.Number({ description: "A value between 0 and 255" }), {
            description:
              "An array representing An array of integers that represent mask image data for inpainting constrained to 8-bit unsigned integer values",
          }),
        ),
        negative_prompt: Type.Optional(
          Type.String({ description: "Text describing elements to avoid in the generated image" }),
        ),
        num_steps: Type.Optional(
          Type.Integer({
            description: "The number of diffusion steps; higher values can improve quality but take longer",
            default: 20,
            maximum: 20,
          }),
        ),
        prompt: Type.String({ description: "A text description of the image you want to generate", minLength: 1 }),
        seed: Type.Optional(Type.Integer({ description: "Random seed for reproducibility of the image generation" })),
        strength: Type.Optional(
          Type.Number({
            description:
              "A value between 0 and 1 indicating how strongly to apply the transformation during img2img tasks; lower values make the output closer to the input image",
            default: 1,
          }),
        ),
        width: Type.Optional(
          Type.Integer({ description: "The width of the generated image in pixels", minimum: 256, maximum: 2048 }),
        ),
      }),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/stabilityai/stable-diffusion-xl-base-1.0 model.")
      .operationId("workers-ai-post-run-cf-stabilityai-stable-diffusion-xl-base-1-0")
      .tag("Workers AI Text To Image")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/run/@cf/sven/test-pipe-http", {
      responses: {
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Open Websocket connection with @cf/sven/test-pipe-http model.")
      .operationId("workers-ai-post-websocket-run-cf-sven-test-pipe-http")
      .tag("Workers AI Dumb Pipe")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/thebloke/discolm-german-7b-v1-awq", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/thebloke/discolm-german-7b-v1-awq model.")
      .operationId("workers-ai-post-run-cf-thebloke-discolm-german-7b-v1-awq")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/tiiuae/falcon-7b-instruct", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/tiiuae/falcon-7b-instruct model.")
      .operationId("workers-ai-post-run-cf-tiiuae-falcon-7b-instruct")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@cf/tinyllama/tinyllama-1.1b-chat-v1.0", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @cf/tinyllama/tinyllama-1.1b-chat-v1.0 model.")
      .operationId("workers-ai-post-run-cf-tinyllama-tinyllama-1-1b-chat-v1-0")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@hf/google/gemma-7b-it", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @hf/google/gemma-7b-it model.")
      .operationId("workers-ai-post-run-hf-google-gemma-7b-it")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@hf/meta-llama/meta-llama-3-8b-instruct", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @hf/meta-llama/meta-llama-3-8b-instruct model.")
      .operationId("workers-ai-post-run-hf-meta-llama-meta-llama-3-8b-instruct")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@hf/mistral/mistral-7b-instruct-v0.2", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @hf/mistral/mistral-7b-instruct-v0.2 model.")
      .operationId("workers-ai-post-run-hf-mistral-mistral-7b-instruct-v0-2")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@hf/mistralai/mistral-7b-instruct-v0.2", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @hf/mistralai/mistral-7b-instruct-v0.2 model.")
      .operationId("workers-ai-post-run-hf-mistralai-mistral-7b-instruct-v0-2")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@hf/nexusflow/starling-lm-7b-beta", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @hf/nexusflow/starling-lm-7b-beta model.")
      .operationId("workers-ai-post-run-hf-nexusflow-starling-lm-7b-beta")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@hf/nousresearch/hermes-2-pro-mistral-7b", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @hf/nousresearch/hermes-2-pro-mistral-7b model.")
      .operationId("workers-ai-post-run-hf-nousresearch-hermes-2-pro-mistral-7b")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@hf/thebloke/deepseek-coder-6.7b-base-awq", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @hf/thebloke/deepseek-coder-6.7b-base-awq model.")
      .operationId("workers-ai-post-run-hf-thebloke-deepseek-coder-6-7b-base-awq")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@hf/thebloke/deepseek-coder-6.7b-instruct-awq", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @hf/thebloke/deepseek-coder-6.7b-instruct-awq model.")
      .operationId("workers-ai-post-run-hf-thebloke-deepseek-coder-6-7b-instruct-awq")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@hf/thebloke/llama-2-13b-chat-awq", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @hf/thebloke/llama-2-13b-chat-awq model.")
      .operationId("workers-ai-post-run-hf-thebloke-llama-2-13b-chat-awq")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@hf/thebloke/llamaguard-7b-awq", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @hf/thebloke/llamaguard-7b-awq model.")
      .operationId("workers-ai-post-run-hf-thebloke-llamaguard-7b-awq")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@hf/thebloke/mistral-7b-instruct-v0.1-awq", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @hf/thebloke/mistral-7b-instruct-v0.1-awq model.")
      .operationId("workers-ai-post-run-hf-thebloke-mistral-7b-instruct-v0-1-awq")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@hf/thebloke/neural-chat-7b-v3-1-awq", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @hf/thebloke/neural-chat-7b-v3-1-awq model.")
      .operationId("workers-ai-post-run-hf-thebloke-neural-chat-7b-v3-1-awq")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@hf/thebloke/openhermes-2.5-mistral-7b-awq", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @hf/thebloke/openhermes-2.5-mistral-7b-awq model.")
      .operationId("workers-ai-post-run-hf-thebloke-openhermes-2-5-mistral-7b-awq")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/@hf/thebloke/zephyr-7b-beta-awq", {
      query: Type.Object({
        queueRequest: Type.Optional(Type.String({ "x-auditable": true })),
      }),
      body: Type.Union([
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          lora: Type.Optional(
            Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          prompt: Type.String({
            description: "The input text prompt for the model to generate a response.",
            minLength: 1,
          }),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({
              description: "Decreases the likelihood of the model repeating the same lines verbatim.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          functions: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.String(),
                name: Type.String(),
              }),
            ),
          ),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
          ),
          messages: Type.Array(
            Type.Object({
              content: Type.String({ description: "The content of the message as a string." }),
              role: Type.String({
                description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
              }),
            }),
            { description: "An array of message objects representing the conversation history." },
          ),
          presence_penalty: Type.Optional(
            Type.Number({
              description: "Increases the likelihood of the model introducing new topics.",
              minimum: -2,
              maximum: 2,
            }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({
              description: "Penalty for repeated tokens; higher values discourage repetition.",
              minimum: 0,
              maximum: 2,
            }),
          ),
          response_format: Type.Optional(
            Type.Object({
              json_schema: Type.Optional(Type.Unknown()),
              type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
            }),
          ),
          seed: Type.Optional(
            Type.Integer({
              description: "Random seed for reproducibility of the generation.",
              minimum: 1,
              maximum: 9999999999,
            }),
          ),
          stream: Type.Optional(
            Type.Boolean({
              description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
              default: false,
            }),
          ),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
              default: 0.6,
              minimum: 0,
              maximum: 5,
            }),
          ),
          tools: Type.Optional(
            Type.Array(
              Type.Union([
                Type.Object({
                  description: Type.String({ description: "A brief description of what the tool does." }),
                  name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                  parameters: Type.Object(
                    {
                      properties: Type.Record(
                        Type.String(),
                        Type.Object({
                          description: Type.String({ description: "A description of the expected parameter." }),
                          type: Type.String({ description: "The data type of the parameter." }),
                        }),
                      ),
                      required: Type.Optional(
                        Type.Array(Type.String(), { description: "List of required parameter names." }),
                      ),
                      type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                    },
                    { description: "Schema defining the parameters accepted by the tool." },
                  ),
                }),
                Type.Object({
                  function: Type.Object(
                    {
                      description: Type.String({ description: "A brief description of what the function does." }),
                      name: Type.String({ description: "The name of the function." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the function." },
                      ),
                    },
                    { description: "Details of the function tool." },
                  ),
                  type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                }),
              ]),
              { description: "A list of tools available for the assistant to use." },
            ),
          ),
          top_k: Type.Optional(
            Type.Integer({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              minimum: 1,
              maximum: 50,
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              minimum: 0.001,
              maximum: 1,
            }),
          ),
        }),
      ]),
      responses: {
        200: Type.Unknown(),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.String(),
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute @hf/thebloke/zephyr-7b-beta-awq model.")
      .operationId("workers-ai-post-run-hf-thebloke-zephyr-7b-beta-awq")
      .tag("Workers AI Text Generation")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/run/{model_name}", {
      params: Type.Object({ model_name: Type.String() }),
      body: Type.Union([
        Type.Object({
          text: Type.String({ description: "The text that you want to classify", minLength: 1 }),
        }),
        Type.Object({
          guidance: Type.Optional(
            Type.Number({
              description:
                "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt",
              default: 7.5,
            }),
          ),
          height: Type.Optional(
            Type.Integer({ description: "The height of the generated image in pixels", minimum: 256, maximum: 2048 }),
          ),
          image: Type.Optional(
            Type.Array(Type.Number({ description: "A value between 0 and 255" }), {
              description:
                "For use with img2img tasks. An array of integers that represent the image data constrained to 8-bit unsigned integer values",
            }),
          ),
          image_b64: Type.Optional(
            Type.String({ description: "For use with img2img tasks. A base64-encoded string of the input image" }),
          ),
          mask: Type.Optional(
            Type.Array(Type.Number({ description: "A value between 0 and 255" }), {
              description:
                "An array representing An array of integers that represent mask image data for inpainting constrained to 8-bit unsigned integer values",
            }),
          ),
          negative_prompt: Type.Optional(
            Type.String({ description: "Text describing elements to avoid in the generated image" }),
          ),
          num_steps: Type.Optional(
            Type.Integer({
              description: "The number of diffusion steps; higher values can improve quality but take longer",
              default: 20,
              maximum: 20,
            }),
          ),
          prompt: Type.String({ description: "A text description of the image you want to generate", minLength: 1 }),
          seed: Type.Optional(Type.Integer({ description: "Random seed for reproducibility of the image generation" })),
          strength: Type.Optional(
            Type.Number({
              description:
                "A value between 0 and 1 indicating how strongly to apply the transformation during img2img tasks; lower values make the output closer to the input image",
              default: 1,
            }),
          ),
          width: Type.Optional(
            Type.Integer({ description: "The width of the generated image in pixels", minimum: 256, maximum: 2048 }),
          ),
        }),
        Type.Object({
          lang: Type.Optional(
            Type.String({
              description:
                "The speech language (e.g., 'en' for English, 'fr' for French). Defaults to 'en' if not specified",
              default: "en",
            }),
          ),
          prompt: Type.String({ description: "A text description of the audio you want to generate", minLength: 1 }),
        }),
        Type.Object({
          text: Type.Union([
            Type.String({ description: "The text to embed", minLength: 1 }),
            Type.Array(Type.String({ description: "The text to embed", minLength: 1 }), {
              description: "Batch of text values to embed",
              maxItems: 100,
            }),
          ]),
        }),
        Type.Object({
          audio: Type.Array(Type.Number({ description: "A value between 0 and 255" }), {
            description:
              "An array of integers that represent the audio data constrained to 8-bit unsigned integer values",
          }),
          source_lang: Type.Optional(Type.String({ description: "The language of the recorded audio" })),
          target_lang: Type.Optional(
            Type.String({
              description: "The language to translate the transcription into. Currently only English is supported.",
            }),
          ),
        }),
        Type.Object(
          {
            image: Type.Array(Type.Number({ description: "A value between 0 and 255 (unsigned 8bit)" }), {
              description:
                "An array of integers that represent the image data constrained to 8-bit unsigned integer values",
            }),
          },
          { "x-stainless-variantName": "image_classification" },
        ),
        Type.Object(
          {
            image: Type.Optional(
              Type.Array(Type.Number({ description: "A value between 0 and 255 (unsigned 8bit)" }), {
                description:
                  "An array of integers that represent the image data constrained to 8-bit unsigned integer values",
              }),
            ),
          },
          { "x-stainless-variantName": "object_detection" },
        ),
        Type.Union([
          Type.Object({
            frequency_penalty: Type.Optional(
              Type.Number({
                description: "Decreases the likelihood of the model repeating the same lines verbatim.",
                minimum: -2,
                maximum: 2,
              }),
            ),
            lora: Type.Optional(
              Type.String({ description: "Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model." }),
            ),
            max_tokens: Type.Optional(
              Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 256 }),
            ),
            presence_penalty: Type.Optional(
              Type.Number({
                description: "Increases the likelihood of the model introducing new topics.",
                minimum: -2,
                maximum: 2,
              }),
            ),
            prompt: Type.String({
              description: "The input text prompt for the model to generate a response.",
              minLength: 1,
            }),
            raw: Type.Optional(
              Type.Boolean({
                description:
                  "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
                default: false,
              }),
            ),
            repetition_penalty: Type.Optional(
              Type.Number({
                description: "Penalty for repeated tokens; higher values discourage repetition.",
                minimum: 0,
                maximum: 2,
              }),
            ),
            response_format: Type.Optional(
              Type.Object({
                json_schema: Type.Optional(Type.Unknown()),
                type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
              }),
            ),
            seed: Type.Optional(
              Type.Integer({
                description: "Random seed for reproducibility of the generation.",
                minimum: 1,
                maximum: 9999999999,
              }),
            ),
            stream: Type.Optional(
              Type.Boolean({
                description: "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
                default: false,
              }),
            ),
            temperature: Type.Optional(
              Type.Number({
                description: "Controls the randomness of the output; higher values produce more random results.",
                default: 0.6,
                minimum: 0,
                maximum: 5,
              }),
            ),
            top_k: Type.Optional(
              Type.Integer({
                description:
                  "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
                minimum: 1,
                maximum: 50,
              }),
            ),
            top_p: Type.Optional(
              Type.Number({
                description:
                  "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
                minimum: 0.001,
                maximum: 1,
              }),
            ),
          }),
          Type.Object(
            {
              frequency_penalty: Type.Optional(
                Type.Number({
                  description: "Decreases the likelihood of the model repeating the same lines verbatim.",
                  minimum: -2,
                  maximum: 2,
                }),
              ),
              functions: Type.Optional(
                Type.Array(
                  Type.Object({
                    code: Type.String(),
                    name: Type.String(),
                  }),
                ),
              ),
              max_tokens: Type.Optional(
                Type.Integer({
                  description: "The maximum number of tokens to generate in the response.",
                  default: 256,
                }),
              ),
              messages: Type.Array(
                Type.Object({
                  content: Type.String({ description: "The content of the message as a string." }),
                  role: Type.String({
                    description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
                  }),
                }),
                { description: "An array of message objects representing the conversation history." },
              ),
              presence_penalty: Type.Optional(
                Type.Number({
                  description: "Increases the likelihood of the model introducing new topics.",
                  minimum: -2,
                  maximum: 2,
                }),
              ),
              raw: Type.Optional(
                Type.Boolean({
                  description:
                    "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
                  default: false,
                }),
              ),
              repetition_penalty: Type.Optional(
                Type.Number({
                  description: "Penalty for repeated tokens; higher values discourage repetition.",
                  minimum: 0,
                  maximum: 2,
                }),
              ),
              response_format: Type.Optional(
                Type.Object({
                  json_schema: Type.Optional(Type.Unknown()),
                  type: Type.Optional(Type.Union([Type.Literal("json_object"), Type.Literal("json_schema")])),
                }),
              ),
              seed: Type.Optional(
                Type.Integer({
                  description: "Random seed for reproducibility of the generation.",
                  minimum: 1,
                  maximum: 9999999999,
                }),
              ),
              stream: Type.Optional(
                Type.Boolean({
                  description:
                    "If true, the response will be streamed back incrementally using SSE, Server Sent Events.",
                  default: false,
                }),
              ),
              temperature: Type.Optional(
                Type.Number({
                  description: "Controls the randomness of the output; higher values produce more random results.",
                  default: 0.6,
                  minimum: 0,
                  maximum: 5,
                }),
              ),
              tools: Type.Optional(
                Type.Array(
                  Type.Union([
                    Type.Object({
                      description: Type.String({ description: "A brief description of what the tool does." }),
                      name: Type.String({ description: "The name of the tool. More descriptive the better." }),
                      parameters: Type.Object(
                        {
                          properties: Type.Record(
                            Type.String(),
                            Type.Object({
                              description: Type.String({ description: "A description of the expected parameter." }),
                              type: Type.String({ description: "The data type of the parameter." }),
                            }),
                          ),
                          required: Type.Optional(
                            Type.Array(Type.String(), { description: "List of required parameter names." }),
                          ),
                          type: Type.String({ description: "The type of the parameters object (usually 'object')." }),
                        },
                        { description: "Schema defining the parameters accepted by the tool." },
                      ),
                    }),
                    Type.Object(
                      {
                        function: Type.Object(
                          {
                            description: Type.String({ description: "A brief description of what the function does." }),
                            name: Type.String({ description: "The name of the function." }),
                            parameters: Type.Object(
                              {
                                properties: Type.Record(
                                  Type.String(),
                                  Type.Object({
                                    description: Type.String({
                                      description: "A description of the expected parameter.",
                                    }),
                                    type: Type.String({ description: "The data type of the parameter." }),
                                  }),
                                ),
                                required: Type.Optional(
                                  Type.Array(Type.String(), { description: "List of required parameter names." }),
                                ),
                                type: Type.String({
                                  description: "The type of the parameters object (usually 'object').",
                                }),
                              },
                              { description: "Schema defining the parameters accepted by the function." },
                            ),
                          },
                          { description: "Details of the function tool." },
                        ),
                        type: Type.String({ description: "Specifies the type of tool (e.g., 'function')." }),
                      },
                      { "x-stainless-variantName": "function" },
                    ),
                  ]),
                  { description: "A list of tools available for the assistant to use." },
                ),
              ),
              top_k: Type.Optional(
                Type.Integer({
                  description:
                    "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
                  minimum: 1,
                  maximum: 50,
                }),
              ),
              top_p: Type.Optional(
                Type.Number({
                  description:
                    "Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
                  minimum: 0.001,
                  maximum: 1,
                }),
              ),
            },
            { "x-stainless-variantName": "text_generation" },
          ),
        ]),
        Type.Object({
          source_lang: Type.Optional(
            Type.String({
              description:
                "The language code of the source text (e.g., 'en' for English). Defaults to 'en' if not specified",
              default: "en",
            }),
          ),
          target_lang: Type.String({
            description: "The language code to translate the text into (e.g., 'es' for Spanish)",
          }),
          text: Type.String({ description: "The text to be translated", minLength: 1 }),
        }),
        Type.Object({
          input_text: Type.String({ description: "The text that you want the model to summarize", minLength: 1 }),
          max_length: Type.Optional(
            Type.Integer({ description: "The maximum length of the generated summary in tokens", default: 1024 }),
          ),
        }),
        Type.Object({
          frequency_penalty: Type.Optional(
            Type.Number({ description: "Decreases the likelihood of the model repeating the same lines verbatim." }),
          ),
          image: Type.Array(Type.Number({ description: "A value between 0 and 255" }), {
            description:
              "An array of integers that represent the image data constrained to 8-bit unsigned integer values",
          }),
          max_tokens: Type.Optional(
            Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 512 }),
          ),
          presence_penalty: Type.Optional(
            Type.Number({ description: "Increases the likelihood of the model introducing new topics." }),
          ),
          prompt: Type.Optional(
            Type.String({ description: "The input text prompt for the model to generate a response." }),
          ),
          raw: Type.Optional(
            Type.Boolean({
              description:
                "If true, a chat template is not applied and you must adhere to the specific model's expected formatting.",
              default: false,
            }),
          ),
          repetition_penalty: Type.Optional(
            Type.Number({ description: "Penalty for repeated tokens; higher values discourage repetition." }),
          ),
          seed: Type.Optional(Type.Number({ description: "Random seed for reproducibility of the generation." })),
          temperature: Type.Optional(
            Type.Number({
              description: "Controls the randomness of the output; higher values produce more random results.",
            }),
          ),
          top_k: Type.Optional(
            Type.Number({
              description:
                "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
            }),
          ),
          top_p: Type.Optional(
            Type.Number({
              description:
                "Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
            }),
          ),
        }),
        Type.Union([
          Type.Object({
            frequency_penalty: Type.Optional(
              Type.Number({ description: "Decreases the likelihood of the model repeating the same lines verbatim." }),
            ),
            ignore_eos: Type.Optional(
              Type.Boolean({
                description:
                  "Whether to ignore the EOS token and continue generating tokens after the EOS token is generated.",
              }),
            ),
            image: Type.String({ description: "Image in base64 encoded format." }),
            max_tokens: Type.Optional(
              Type.Integer({ description: "The maximum number of tokens to generate in the response.", default: 512 }),
            ),
            presence_penalty: Type.Optional(
              Type.Number({ description: "Increases the likelihood of the model introducing new topics." }),
            ),
            prompt: Type.String({
              description: "The input text prompt for the model to generate a response.",
              minLength: 1,
            }),
            repetition_penalty: Type.Optional(
              Type.Number({ description: "Penalty for repeated tokens; higher values discourage repetition." }),
            ),
            seed: Type.Optional(Type.Number({ description: "Random seed for reproducibility of the generation." })),
            temperature: Type.Optional(
              Type.Number({
                description: "Controls the randomness of the output; higher values produce more random results.",
              }),
            ),
            top_k: Type.Optional(
              Type.Number({
                description:
                  "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
              }),
            ),
            top_p: Type.Optional(
              Type.Number({
                description:
                  "Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
              }),
            ),
          }),
          Type.Object(
            {
              frequency_penalty: Type.Optional(
                Type.Number({
                  description: "Decreases the likelihood of the model repeating the same lines verbatim.",
                }),
              ),
              ignore_eos: Type.Optional(
                Type.Boolean({
                  description:
                    "Whether to ignore the EOS token and continue generating tokens after the EOS token is generated.",
                }),
              ),
              image: Type.String({ description: "Image in base64 encoded format." }),
              max_tokens: Type.Optional(
                Type.Integer({
                  description: "The maximum number of tokens to generate in the response.",
                  default: 512,
                }),
              ),
              messages: Type.Array(
                Type.Object({
                  content: Type.String({ description: "The content of the message as a string." }),
                  role: Type.String({
                    description: "The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').",
                  }),
                }),
                { description: "An array of message objects representing the conversation history." },
              ),
              presence_penalty: Type.Optional(
                Type.Number({ description: "Increases the likelihood of the model introducing new topics." }),
              ),
              repetition_penalty: Type.Optional(
                Type.Number({ description: "Penalty for repeated tokens; higher values discourage repetition." }),
              ),
              seed: Type.Optional(Type.Number({ description: "Random seed for reproducibility of the generation." })),
              temperature: Type.Optional(
                Type.Number({
                  description: "Controls the randomness of the output; higher values produce more random results.",
                }),
              ),
              top_k: Type.Optional(
                Type.Number({
                  description:
                    "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.",
                }),
              ),
              top_p: Type.Optional(
                Type.Number({
                  description:
                    "Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.",
                }),
              ),
            },
            { "x-stainless-variantName": "image_text_to_text" },
          ),
        ]),
        Type.Object({
          image: Type.Optional(Type.String({ description: "Image in base64 encoded format.", minLength: 1 })),
          text: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
        }),
      ]),
      responses: {
        200: Type.Object({
          result: Type.Optional(
            Type.Union([
              Type.Array(
                Type.Object({
                  label: Type.Optional(
                    Type.String({
                      description: "The classification label assigned to the text (e.g., 'POSITIVE' or 'NEGATIVE')",
                    }),
                  ),
                  score: Type.Optional(
                    Type.Number({
                      description:
                        "Confidence score indicating the likelihood that the text belongs to the specified label",
                    }),
                  ),
                }),
                { description: "An array of classification results for the input text", title: "Text Classification" },
              ),
              Type.String({
                description: "The generated image in PNG format",
                format: "binary",
                title: "Text To Image",
              }),
              Type.Union([
                Type.Object({
                  audio: Type.Optional(
                    Type.String({ description: "The generated audio in MP3 format, base64-encoded" }),
                  ),
                }),
                Type.String({ description: "The generated audio in MP3 format", format: "binary" }),
              ]),
              Type.Object({
                data: Type.Optional(
                  Type.Array(
                    Type.Array(Type.Number(), {
                      description: "Floating point embedding representation shaped by the embedding model",
                    }),
                    { description: "Embeddings of the requested text values" },
                  ),
                ),
                shape: Type.Optional(Type.Array(Type.Number())),
              }),
              Type.Object({
                text: Type.String({ description: "The transcription" }),
                vtt: Type.Optional(Type.String()),
                word_count: Type.Optional(Type.Number()),
                words: Type.Optional(
                  Type.Array(
                    Type.Object({
                      end: Type.Optional(Type.Number({ description: "The ending second when the word completes" })),
                      start: Type.Optional(
                        Type.Number({ description: "The second this word begins in the recording" }),
                      ),
                      word: Type.Optional(Type.String()),
                    }),
                  ),
                ),
              }),
              Type.Array(
                Type.Object({
                  label: Type.Optional(
                    Type.String({
                      description: "The predicted category or class for the input image based on analysis",
                    }),
                  ),
                  score: Type.Optional(
                    Type.Number({
                      description:
                        "A confidence value, between 0 and 1, indicating how certain the model is about the predicted label",
                    }),
                  ),
                }),
                { title: "Image Classification" },
              ),
              Type.Array(
                Type.Object({
                  box: Type.Optional(
                    Type.Object(
                      {
                        xmax: Type.Optional(
                          Type.Number({
                            description: "The x-coordinate of the bottom-right corner of the bounding box",
                          }),
                        ),
                        xmin: Type.Optional(
                          Type.Number({ description: "The x-coordinate of the top-left corner of the bounding box" }),
                        ),
                        ymax: Type.Optional(
                          Type.Number({
                            description: "The y-coordinate of the bottom-right corner of the bounding box",
                          }),
                        ),
                        ymin: Type.Optional(
                          Type.Number({ description: "The y-coordinate of the top-left corner of the bounding box" }),
                        ),
                      },
                      { description: "Coordinates defining the bounding box around the detected object" },
                    ),
                  ),
                  label: Type.Optional(Type.String({ description: "The class label or name of the detected object" })),
                  score: Type.Optional(
                    Type.Number({
                      description: "Confidence score indicating the likelihood that the detection is correct",
                    }),
                  ),
                }),
                { description: "An array of detected objects within the input image", title: "Object Detection" },
              ),
              Type.Union([
                Type.Object({
                  response: Type.String({ description: "The generated text response from the model" }),
                  tool_calls: Type.Optional(
                    Type.Array(
                      Type.Object({
                        arguments: Type.Optional(
                          Type.Unknown({ description: "The arguments passed to be passed to the tool call request" }),
                        ),
                        name: Type.Optional(Type.String({ description: "The name of the tool to be called" })),
                      }),
                      { description: "An array of tool calls requests made during the response generation" },
                    ),
                  ),
                  usage: Type.Optional(
                    Type.Object(
                      {
                        completion_tokens: Type.Optional(
                          Type.Number({ description: "Total number of tokens in output", default: 0 }),
                        ),
                        prompt_tokens: Type.Optional(
                          Type.Number({ description: "Total number of tokens in input", default: 0 }),
                        ),
                        total_tokens: Type.Optional(
                          Type.Number({ description: "Total number of input and output tokens", default: 0 }),
                        ),
                      },
                      { description: "Usage statistics for the inference request" },
                    ),
                  ),
                }),
                Type.String({ format: "binary" }),
              ]),
              Type.Object({
                translated_text: Type.Optional(
                  Type.String({ description: "The translated text in the target language" }),
                ),
              }),
              Type.Object({
                summary: Type.Optional(Type.String({ description: "The summarized version of the input text" })),
              }),
              Type.Object({
                description: Type.Optional(Type.String()),
              }),
              Type.Object({
                description: Type.Optional(Type.String()),
              }),
              Type.Object({
                data: Type.Optional(Type.Array(Type.Array(Type.Number()))),
                shape: Type.Optional(Type.Array(Type.Number())),
              }),
            ]),
          ),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Execute AI model")
      .description(
        "This endpoint provides users with the capability to run specific AI models on-demand.\n\nBy submitting the required input data, users can receive real-time predictions or results generated by the chosen AI\nmodel. The endpoint supports various AI model types, ensuring flexibility and adaptability for diverse use cases.\n\nModel specific inputs available in [Cloudflare Docs](https://developers.cloudflare.com/workers-ai/models/).",
      )
      .operationId("workers-ai-post-run-model")
      .tag("Workers AI")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/tasks/search", {
      responses: {
        200: Type.Object({
          errors: Type.Array(Type.Unknown()),
          messages: Type.Array(Type.String()),
          result: Type.Array(Type.Unknown()),
          success: Type.Boolean({ "x-auditable": true }),
        }),
        404: Type.Object({
          errors: Type.Array(Type.Unknown()),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Task Search")
      .operationId("workers-ai-search-task")
      .tag("Workers AI")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/tomarkdown", {
      responses: {
        200: Type.Object({
          result: Type.Array(
            Type.Object({
              data: Type.String({ "x-auditable": true }),
              format: Type.String({ "x-auditable": true }),
              mimeType: Type.String({ "x-auditable": true }),
              name: Type.String({ "x-auditable": true }),
              tokens: Type.String({ "x-auditable": true }),
            }),
          ),
          success: Type.Boolean(),
        }),
        400: Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      },
    })
      .summary("Convert Files into Markdown")
      .operationId("workers-ai-post-to-markdown")
      .tag("Workers AI")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Workers AI Write", "Workers AI Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.ai"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

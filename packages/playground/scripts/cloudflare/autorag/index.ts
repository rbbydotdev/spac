import { Type } from "@sinclair/typebox"
import type { Api } from "spac"

export function registerAutorag(api: Api) {
  api.assertVersion("3.0.3", "Autorag")

  api.group(
    "/accounts/{account_id}/autorag/rags/{id}",
    { params: Type.Object({ account_id: Type.String(), id: Type.String() }) },
    (g) => {
      g.post("/ai-search", {
        body: Type.Object({
          filters: Type.Optional(
            Type.Union([
              Type.Object({
                key: Type.String(),
                type: Type.Union([
                  Type.Literal("eq"),
                  Type.Literal("ne"),
                  Type.Literal("gt"),
                  Type.Literal("gte"),
                  Type.Literal("lt"),
                  Type.Literal("lte"),
                ]),
                value: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
              }),
              Type.Object({
                filters: Type.Array(
                  Type.Object({
                    key: Type.String(),
                    type: Type.Union([
                      Type.Literal("eq"),
                      Type.Literal("ne"),
                      Type.Literal("gt"),
                      Type.Literal("gte"),
                      Type.Literal("lt"),
                      Type.Literal("lte"),
                    ]),
                    value: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
                  }),
                ),
                type: Type.Union([Type.Literal("and"), Type.Literal("or")]),
              }),
            ]),
          ),
          max_num_results: Type.Optional(Type.Integer({ default: 50, minimum: 1, maximum: 50 })),
          model: Type.Optional(
            Type.Union([
              Type.Union([
                Type.Literal("@cf/meta/llama-3.3-70b-instruct-fp8-fast"),
                Type.Literal("@cf/meta/llama-3.3-70b-instruct-fp8-fast"),
                Type.Literal("@cf/meta/llama-3.1-8b-instruct-fast"),
                Type.Literal("@cf/meta/llama-3.1-8b-instruct-fp8"),
                Type.Literal("@cf/meta/llama-4-scout-17b-16e-instruct"),
                Type.Literal("@cf/qwen/qwen3-30b-a3b-fp8"),
                Type.Literal("@cf/moonshotai/kimi-k2-instruct"),
                Type.Literal("anthropic/claude-3-7-sonnet"),
                Type.Literal("anthropic/claude-sonnet-4"),
                Type.Literal("anthropic/claude-opus-4"),
                Type.Literal("anthropic/claude-3-5-haiku"),
                Type.Literal("cerebras/qwen-3-235b-a22b-instruct"),
                Type.Literal("cerebras/qwen-3-235b-a22b-thinking"),
                Type.Literal("cerebras/llama-3.3-70b"),
                Type.Literal("cerebras/llama-4-maverick-17b-128e-instruct"),
                Type.Literal("cerebras/llama-4-scout-17b-16e-instruct"),
                Type.Literal("cerebras/gpt-oss-120b"),
                Type.Literal("google-ai-studio/gemini-2.5-flash"),
                Type.Literal("google-ai-studio/gemini-2.5-pro"),
                Type.Literal("grok/grok-4"),
                Type.Literal("groq/llama-3.3-70b-versatile"),
                Type.Literal("groq/llama-3.1-8b-instant"),
                Type.Literal("openai/gpt-5"),
                Type.Literal("openai/gpt-5-mini"),
                Type.Literal("openai/gpt-5-nano"),
              ]),
              Type.Union([Type.Literal("")]),
            ]),
          ),
          query: Type.String(),
          ranking_options: Type.Optional(
            Type.Object({
              ranker: Type.Optional(Type.String()),
              score_threshold: Type.Optional(Type.Number({ default: 0.4, minimum: 0, maximum: 1 })),
            }),
          ),
          rewrite_query: Type.Optional(Type.Boolean({ default: false })),
          stream: Type.Optional(Type.Boolean({ default: false })),
          system_prompt: Type.Optional(Type.String()),
        }),
      })
        .response(
          Type.Object({
            result: Type.Object({
              data: Type.Optional(
                Type.Array(
                  Type.Object({
                    attributes: Type.Optional(Type.Unknown()),
                    content: Type.Optional(
                      Type.Array(
                        Type.Object({
                          text: Type.Optional(Type.String()),
                          type: Type.Optional(Type.String()),
                        }),
                      ),
                    ),
                    file_id: Type.Optional(Type.String()),
                    filename: Type.Optional(Type.String()),
                    score: Type.Number(),
                  }),
                ),
              ),
              has_more: Type.Optional(Type.Boolean({ default: false })),
              next_page: Type.Optional(Type.Union([Type.String(), Type.Null()])),
              object: Type.Optional(Type.String()),
              response: Type.String(),
              search_query: Type.String(),
            }),
            success: Type.Boolean(),
          }),
        )
        .error(
          404,
          Type.Object({
            errors: Type.Array(
              Type.Object({
                code: Type.Number(),
                message: Type.String(),
              }),
            ),
            success: Type.Union([Type.Literal(false)]),
          }),
        )
        .summary("AI Search")
        .operationId("autorag-config-ai-search")
        .tag("AutoRAG RAG Search")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Auto Rag Write"])
        .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.rag"] })
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.get("/jobs", {
        query: Type.Object({
          page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
          per_page: Type.Optional(Type.Integer({ default: 20, minimum: 0, maximum: 50 })),
        }),
      })
        .response(
          Type.Object({
            result: Type.Array(
              Type.Object({
                end_reason: Type.Optional(Type.String()),
                ended_at: Type.Optional(Type.String()),
                id: Type.String(),
                last_seen_at: Type.Optional(Type.String()),
                source: Type.Union([Type.Literal("user"), Type.Literal("schedule")]),
                started_at: Type.Optional(Type.String()),
              }),
            ),
            result_info: Type.Object({
              count: Type.Integer(),
              page: Type.Integer(),
              per_page: Type.Integer(),
              total_count: Type.Integer(),
            }),
            success: Type.Boolean(),
          }),
        )
        .error(
          404,
          Type.Object({
            errors: Type.Array(
              Type.Object({
                code: Type.Number(),
                message: Type.String(),
              }),
            ),
            success: Type.Union([Type.Literal(false)]),
          }),
        )
        .error(
          503,
          Type.Object({
            errors: Type.Array(
              Type.Object({
                code: Type.Number(),
                message: Type.String(),
              }),
            ),
            success: Type.Union([Type.Literal(false)]),
          }),
        )
        .summary("List Jobs")
        .operationId("autorag-config-list-jobs")
        .tag("AutoRAG Jobs")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Auto Rag Write", "Auto Rag Read"])
        .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.rag"] })
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.get("/jobs/{job_id}", {
        params: Type.Object({ job_id: Type.String() }),
      })
        .response(
          Type.Object({
            result: Type.Object({
              end_reason: Type.Optional(Type.String()),
              ended_at: Type.Optional(Type.String()),
              id: Type.String(),
              last_seen_at: Type.Optional(Type.String()),
              source: Type.Union([Type.Literal("user"), Type.Literal("schedule")]),
              started_at: Type.Optional(Type.String()),
            }),
            success: Type.Boolean(),
          }),
        )
        .error(
          404,
          Type.Object({
            errors: Type.Array(
              Type.Object({
                code: Type.Number(),
                message: Type.String(),
              }),
            ),
            success: Type.Union([Type.Literal(false)]),
          }),
        )
        .error(
          503,
          Type.Object({
            errors: Type.Array(
              Type.Object({
                code: Type.Number(),
                message: Type.String(),
              }),
            ),
            success: Type.Union([Type.Literal(false)]),
          }),
        )
        .summary("Get a Job Details")
        .operationId("autorag-config-get-job")
        .tag("AutoRAG Jobs")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Auto Rag Write", "Auto Rag Read"])
        .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.rag"] })
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.get("/jobs/{job_id}/logs", {
        params: Type.Object({ job_id: Type.String() }),
        query: Type.Object({
          page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
          per_page: Type.Optional(Type.Integer({ default: 20, minimum: 0, maximum: 500 })),
        }),
      })
        .response(
          Type.Object({
            result: Type.Array(
              Type.Object({
                created_at: Type.Number({ readOnly: true }),
                id: Type.Integer(),
                message: Type.String(),
                message_type: Type.Integer(),
              }),
            ),
            result_info: Type.Object({
              count: Type.Integer(),
              page: Type.Integer(),
              per_page: Type.Integer(),
              total_count: Type.Integer(),
            }),
            success: Type.Boolean(),
          }),
        )
        .error(
          404,
          Type.Object({
            errors: Type.Array(
              Type.Object({
                code: Type.Number(),
                message: Type.String(),
              }),
            ),
            success: Type.Union([Type.Literal(false)]),
          }),
        )
        .error(
          503,
          Type.Object({
            errors: Type.Array(
              Type.Object({
                code: Type.Number(),
                message: Type.String(),
              }),
            ),
            success: Type.Union([Type.Literal(false)]),
          }),
        )
        .summary("List Job Logs")
        .operationId("autorag-config-list-job-logs")
        .tag("AutoRAG Jobs")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Auto Rag Write", "Auto Rag Read"])
        .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.rag"] })
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.post("/search", {
        body: Type.Object({
          filters: Type.Optional(
            Type.Union([
              Type.Object({
                key: Type.String(),
                type: Type.Union([
                  Type.Literal("eq"),
                  Type.Literal("ne"),
                  Type.Literal("gt"),
                  Type.Literal("gte"),
                  Type.Literal("lt"),
                  Type.Literal("lte"),
                ]),
                value: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
              }),
              Type.Object({
                filters: Type.Array(
                  Type.Object({
                    key: Type.String(),
                    type: Type.Union([
                      Type.Literal("eq"),
                      Type.Literal("ne"),
                      Type.Literal("gt"),
                      Type.Literal("gte"),
                      Type.Literal("lt"),
                      Type.Literal("lte"),
                    ]),
                    value: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
                  }),
                ),
                type: Type.Union([Type.Literal("and"), Type.Literal("or")]),
              }),
            ]),
          ),
          max_num_results: Type.Optional(Type.Integer({ default: 10, minimum: 1, maximum: 50 })),
          query: Type.String(),
          ranking_options: Type.Optional(
            Type.Object({
              ranker: Type.Optional(Type.String()),
              score_threshold: Type.Optional(Type.Number({ default: 0.4, minimum: 0, maximum: 1 })),
            }),
          ),
          rewrite_query: Type.Optional(Type.Boolean({ default: false })),
        }),
      })
        .response(
          Type.Object({
            result: Type.Object({
              data: Type.Optional(
                Type.Array(
                  Type.Object({
                    attributes: Type.Optional(Type.Unknown()),
                    content: Type.Optional(
                      Type.Array(
                        Type.Object({
                          text: Type.Optional(Type.String()),
                          type: Type.Optional(Type.String()),
                        }),
                      ),
                    ),
                    file_id: Type.Optional(Type.String()),
                    filename: Type.Optional(Type.String()),
                    score: Type.Number(),
                  }),
                ),
              ),
              has_more: Type.Optional(Type.Boolean({ default: false })),
              next_page: Type.Optional(Type.Union([Type.String(), Type.Null()])),
              object: Type.Optional(Type.String()),
              search_query: Type.String(),
            }),
            success: Type.Boolean(),
          }),
        )
        .error(
          404,
          Type.Object({
            errors: Type.Array(
              Type.Object({
                code: Type.Number(),
                message: Type.String(),
              }),
            ),
            success: Type.Union([Type.Literal(false)]),
          }),
        )
        .summary("Search")
        .operationId("autorag-config-search")
        .tag("AutoRAG RAG Search")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Auto Rag Write"])
        .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.rag"] })
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

      g.patch("/sync", {})
        .response(
          Type.Object({
            result: Type.Object({
              job_id: Type.String(),
            }),
            success: Type.Boolean(),
          }),
        )
        .error(
          400,
          Type.Object({
            errors: Type.Array(
              Type.Object({
                code: Type.Number(),
                message: Type.String(),
              }),
            ),
            success: Type.Union([Type.Literal(false)]),
          }),
        )
        .error(
          404,
          Type.Object({
            errors: Type.Array(
              Type.Object({
                code: Type.Number(),
                message: Type.String(),
              }),
            ),
            success: Type.Union([Type.Literal(false)]),
          }),
        )
        .error(
          429,
          Type.Object({
            errors: Type.Array(
              Type.Object({
                code: Type.Number(),
                message: Type.String(),
              }),
            ),
            success: Type.Union([Type.Literal(false)]),
          }),
        )
        .error(
          503,
          Type.Object({
            errors: Type.Array(
              Type.Object({
                code: Type.Number(),
                message: Type.String(),
              }),
            ),
            success: Type.Union([Type.Literal(false)]),
          }),
        )
        .summary("Sync")
        .operationId("autorag-config-sync")
        .tag("AutoRAG RAG")
        .security({ api_token: [] })
        .security({ api_email: [], api_key: [] })
        .extension("x-api-token-group", ["Auto Rag Write"])
        .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.rag"] })
        .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
    },
  )
}

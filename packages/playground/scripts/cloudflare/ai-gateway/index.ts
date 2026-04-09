import { Type } from "@sinclair/typebox"
import type { Api } from "spac"

export function registerAiGateway(api: Api) {
  api.assertVersion("3.0.3", "AiGateway")

  api.group("/accounts/{account_id}/ai-gateway", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.get("/evaluation-types", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 20, minimum: 5, maximum: 50 })),
        order_by: Type.Optional(Type.String({ default: "mandatory" })),
        order_by_direction: Type.Optional(Type.Union([Type.Literal("asc"), Type.Literal("desc")])),
      }),
    })
      .response(
        Type.Object({
          result: Type.Array(
            Type.Object({
              created_at: Type.String({ format: "date-time", readOnly: true }),
              description: Type.String(),
              enable: Type.Boolean(),
              id: Type.String(),
              mandatory: Type.Boolean(),
              modified_at: Type.String({ format: "date-time", readOnly: true }),
              name: Type.String(),
              type: Type.String(),
            }),
          ),
          result_info: Type.Object({
            count: Type.Number(),
            page: Type.Number(),
            per_page: Type.Number(),
            total_count: Type.Number(),
          }),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("List Evaluators")
      .operationId("aig-config-list-evaluators")
      .tag("AI Gateway Evaluations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways", {
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 20, minimum: 1, maximum: 100 })),
        search: Type.Optional(Type.String({ description: "Search by id" })),
      }),
    })
      .response(
        Type.Object({
          result: Type.Array(
            Type.Object({
              account_id: Type.String(),
              account_tag: Type.String(),
              authentication: Type.Optional(Type.Boolean({ "x-auditable": true })),
              cache_invalidate_on_update: Type.Boolean({ "x-auditable": true }),
              cache_ttl: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
              collect_logs: Type.Boolean({ "x-auditable": true }),
              created_at: Type.String({ format: "date-time", readOnly: true }),
              dlp: Type.Optional(
                Type.Union([
                  Type.Object({
                    action: Type.Union([Type.Literal("BLOCK"), Type.Literal("FLAG")]),
                    enabled: Type.Boolean(),
                    profiles: Type.Array(Type.String()),
                  }),
                  Type.Object({
                    enabled: Type.Boolean(),
                    policies: Type.Array(
                      Type.Object({
                        action: Type.Union([Type.Literal("FLAG"), Type.Literal("BLOCK")]),
                        check: Type.Array(Type.Union([Type.Literal("REQUEST"), Type.Literal("RESPONSE")])),
                        enabled: Type.Boolean(),
                        id: Type.String(),
                        profiles: Type.Array(Type.String()),
                      }),
                    ),
                  }),
                ]),
              ),
              id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
              internal_id: Type.String({ format: "uuid" }),
              log_management: Type.Optional(
                Type.Union([Type.Integer({ minimum: 10000, maximum: 10000000, "x-auditable": true }), Type.Null()]),
              ),
              log_management_strategy: Type.Optional(
                Type.Union([Type.Literal("STOP_INSERTING"), Type.Literal("DELETE_OLDEST")], { "x-auditable": true }),
              ),
              logpush: Type.Optional(Type.Boolean({ "x-auditable": true })),
              logpush_public_key: Type.Optional(
                Type.Union([Type.String({ minLength: 16, maxLength: 1024, "x-auditable": true }), Type.Null()]),
              ),
              modified_at: Type.String({ format: "date-time", readOnly: true }),
              otel: Type.Optional(
                Type.Union([
                  Type.Array(
                    Type.Object({
                      authorization: Type.String(),
                      headers: Type.Record(Type.String(), Type.String()),
                      url: Type.String(),
                    }),
                    { "x-auditable": true },
                  ),
                  Type.Null(),
                ]),
              ),
              rate_limiting_interval: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
              rate_limiting_limit: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
              rate_limiting_technique: Type.Union([Type.Literal("fixed"), Type.Literal("sliding")], {
                "x-auditable": true,
              }),
              store_id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
              stripe: Type.Optional(
                Type.Union([
                  Type.Object(
                    {
                      authorization: Type.String(),
                      usage_events: Type.Array(
                        Type.Object({
                          payload: Type.String(),
                        }),
                      ),
                    },
                    { "x-auditable": true },
                  ),
                  Type.Null(),
                ]),
              ),
            }),
          ),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("List Gateways")
      .operationId("aig-config-list-gateway")
      .tag("AI Gateway Gateways")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/gateways", {
      body: Type.Object({
        authentication: Type.Optional(Type.Boolean({ "x-auditable": true })),
        cache_invalidate_on_update: Type.Boolean({ "x-auditable": true }),
        cache_ttl: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
        collect_logs: Type.Boolean({ "x-auditable": true }),
        id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
        log_management: Type.Optional(
          Type.Union([Type.Integer({ minimum: 10000, maximum: 10000000, "x-auditable": true }), Type.Null()]),
        ),
        log_management_strategy: Type.Optional(
          Type.Union([Type.Literal("STOP_INSERTING"), Type.Literal("DELETE_OLDEST")], { "x-auditable": true }),
        ),
        logpush: Type.Optional(Type.Boolean({ "x-auditable": true })),
        logpush_public_key: Type.Optional(
          Type.Union([Type.String({ minLength: 16, maxLength: 1024, "x-auditable": true }), Type.Null()]),
        ),
        rate_limiting_interval: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
        rate_limiting_limit: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
        rate_limiting_technique: Type.Union([Type.Literal("fixed"), Type.Literal("sliding")], { "x-auditable": true }),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_id: Type.String(),
            account_tag: Type.String(),
            authentication: Type.Optional(Type.Boolean({ "x-auditable": true })),
            cache_invalidate_on_update: Type.Boolean({ "x-auditable": true }),
            cache_ttl: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
            collect_logs: Type.Boolean({ "x-auditable": true }),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            dlp: Type.Optional(
              Type.Union([
                Type.Object({
                  action: Type.Union([Type.Literal("BLOCK"), Type.Literal("FLAG")]),
                  enabled: Type.Boolean(),
                  profiles: Type.Array(Type.String()),
                }),
                Type.Object({
                  enabled: Type.Boolean(),
                  policies: Type.Array(
                    Type.Object({
                      action: Type.Union([Type.Literal("FLAG"), Type.Literal("BLOCK")]),
                      check: Type.Array(Type.Union([Type.Literal("REQUEST"), Type.Literal("RESPONSE")])),
                      enabled: Type.Boolean(),
                      id: Type.String(),
                      profiles: Type.Array(Type.String()),
                    }),
                  ),
                }),
              ]),
            ),
            id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
            internal_id: Type.String({ format: "uuid" }),
            log_management: Type.Optional(
              Type.Union([Type.Integer({ minimum: 10000, maximum: 10000000, "x-auditable": true }), Type.Null()]),
            ),
            log_management_strategy: Type.Optional(
              Type.Union([Type.Literal("STOP_INSERTING"), Type.Literal("DELETE_OLDEST")], { "x-auditable": true }),
            ),
            logpush: Type.Optional(Type.Boolean({ "x-auditable": true })),
            logpush_public_key: Type.Optional(
              Type.Union([Type.String({ minLength: 16, maxLength: 1024, "x-auditable": true }), Type.Null()]),
            ),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            otel: Type.Optional(
              Type.Union([
                Type.Array(
                  Type.Object({
                    authorization: Type.String(),
                    headers: Type.Record(Type.String(), Type.String()),
                    url: Type.String(),
                  }),
                  { "x-auditable": true },
                ),
                Type.Null(),
              ]),
            ),
            rate_limiting_interval: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
            rate_limiting_limit: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
            rate_limiting_technique: Type.Union([Type.Literal("fixed"), Type.Literal("sliding")], {
              "x-auditable": true,
            }),
            store_id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
            stripe: Type.Optional(
              Type.Union([
                Type.Object(
                  {
                    authorization: Type.String(),
                    usage_events: Type.Array(
                      Type.Object({
                        payload: Type.String(),
                      }),
                    ),
                  },
                  { "x-auditable": true },
                ),
                Type.Null(),
              ]),
            ),
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
              path: Type.Array(Type.String()),
            }),
          ),
          success: Type.Boolean(),
        }),
      )
      .summary("Create a new Gateway")
      .operationId("aig-config-create-gateway")
      .tag("AI Gateway Gateways")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways/{gateway_id}/datasets", {
      params: Type.Object({
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
      }),
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 20, minimum: 1, maximum: 100 })),
        name: Type.Optional(Type.String({ "x-auditable": true })),
        enable: Type.Optional(Type.Boolean({ "x-auditable": true })),
        search: Type.Optional(Type.String({ description: "Search by id, name, filters" })),
      }),
    })
      .response(
        Type.Object({
          result: Type.Array(
            Type.Object({
              account_id: Type.String(),
              account_tag: Type.String(),
              created_at: Type.String({ format: "date-time", readOnly: true }),
              enable: Type.Boolean({ "x-auditable": true }),
              filters: Type.Array(
                Type.Object({
                  key: Type.Union(
                    [
                      Type.Literal("created_at"),
                      Type.Literal("request_content_type"),
                      Type.Literal("response_content_type"),
                      Type.Literal("success"),
                      Type.Literal("cached"),
                      Type.Literal("provider"),
                      Type.Literal("model"),
                      Type.Literal("cost"),
                      Type.Literal("tokens"),
                      Type.Literal("tokens_in"),
                      Type.Literal("tokens_out"),
                      Type.Literal("duration"),
                      Type.Literal("feedback"),
                    ],
                    { "x-auditable": true },
                  ),
                  operator: Type.Union(
                    [Type.Literal("eq"), Type.Literal("contains"), Type.Literal("lt"), Type.Literal("gt")],
                    { "x-auditable": true },
                  ),
                  value: Type.Array(Type.Union([Type.String(), Type.Number(), Type.Boolean()]), {
                    "x-auditable": true,
                  }),
                }),
              ),
              gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
              id: Type.String({ "x-auditable": true }),
              modified_at: Type.String({ format: "date-time", readOnly: true }),
              name: Type.String({ "x-auditable": true }),
            }),
          ),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("List Datasets")
      .operationId("aig-config-list-dataset")
      .tag("AI Gateway Datasets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/gateways/{gateway_id}/datasets", {
      params: Type.Object({
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
      }),
      body: Type.Object({
        enable: Type.Boolean({ "x-auditable": true }),
        filters: Type.Array(
          Type.Object({
            key: Type.Union(
              [
                Type.Literal("created_at"),
                Type.Literal("request_content_type"),
                Type.Literal("response_content_type"),
                Type.Literal("success"),
                Type.Literal("cached"),
                Type.Literal("provider"),
                Type.Literal("model"),
                Type.Literal("cost"),
                Type.Literal("tokens"),
                Type.Literal("tokens_in"),
                Type.Literal("tokens_out"),
                Type.Literal("duration"),
                Type.Literal("feedback"),
              ],
              { "x-auditable": true },
            ),
            operator: Type.Union(
              [Type.Literal("eq"), Type.Literal("contains"), Type.Literal("lt"), Type.Literal("gt")],
              { "x-auditable": true },
            ),
            value: Type.Array(Type.Union([Type.String(), Type.Number(), Type.Boolean()]), { "x-auditable": true }),
          }),
        ),
        name: Type.String({ "x-auditable": true }),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_id: Type.String(),
            account_tag: Type.String(),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            enable: Type.Boolean({ "x-auditable": true }),
            filters: Type.Array(
              Type.Object({
                key: Type.Union(
                  [
                    Type.Literal("created_at"),
                    Type.Literal("request_content_type"),
                    Type.Literal("response_content_type"),
                    Type.Literal("success"),
                    Type.Literal("cached"),
                    Type.Literal("provider"),
                    Type.Literal("model"),
                    Type.Literal("cost"),
                    Type.Literal("tokens"),
                    Type.Literal("tokens_in"),
                    Type.Literal("tokens_out"),
                    Type.Literal("duration"),
                    Type.Literal("feedback"),
                  ],
                  { "x-auditable": true },
                ),
                operator: Type.Union(
                  [Type.Literal("eq"), Type.Literal("contains"), Type.Literal("lt"), Type.Literal("gt")],
                  { "x-auditable": true },
                ),
                value: Type.Array(Type.Union([Type.String(), Type.Number(), Type.Boolean()]), { "x-auditable": true }),
              }),
            ),
            gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
            id: Type.String({ "x-auditable": true }),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String({ "x-auditable": true }),
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
              path: Type.Array(Type.String()),
            }),
          ),
          success: Type.Boolean(),
        }),
      )
      .summary("Create a new Dataset")
      .operationId("aig-config-create-dataset")
      .tag("AI Gateway Datasets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways/{gateway_id}/datasets/{id}", {
      params: Type.Object({
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
        id: Type.String({ "x-auditable": true }),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_id: Type.String(),
            account_tag: Type.String(),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            enable: Type.Boolean({ "x-auditable": true }),
            filters: Type.Array(
              Type.Object({
                key: Type.Union(
                  [
                    Type.Literal("created_at"),
                    Type.Literal("request_content_type"),
                    Type.Literal("response_content_type"),
                    Type.Literal("success"),
                    Type.Literal("cached"),
                    Type.Literal("provider"),
                    Type.Literal("model"),
                    Type.Literal("cost"),
                    Type.Literal("tokens"),
                    Type.Literal("tokens_in"),
                    Type.Literal("tokens_out"),
                    Type.Literal("duration"),
                    Type.Literal("feedback"),
                  ],
                  { "x-auditable": true },
                ),
                operator: Type.Union(
                  [Type.Literal("eq"), Type.Literal("contains"), Type.Literal("lt"), Type.Literal("gt")],
                  { "x-auditable": true },
                ),
                value: Type.Array(Type.Union([Type.String(), Type.Number(), Type.Boolean()]), { "x-auditable": true }),
              }),
            ),
            gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
            id: Type.String({ "x-auditable": true }),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String({ "x-auditable": true }),
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
          success: Type.Boolean(),
        }),
      )
      .summary("Fetch a Dataset")
      .operationId("aig-config-fetch-dataset")
      .tag("AI Gateway Datasets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/gateways/{gateway_id}/datasets/{id}", {
      params: Type.Object({
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
        id: Type.String({ "x-auditable": true }),
      }),
      body: Type.Object({
        enable: Type.Boolean({ "x-auditable": true }),
        filters: Type.Array(
          Type.Object({
            key: Type.Union(
              [
                Type.Literal("created_at"),
                Type.Literal("request_content_type"),
                Type.Literal("response_content_type"),
                Type.Literal("success"),
                Type.Literal("cached"),
                Type.Literal("provider"),
                Type.Literal("model"),
                Type.Literal("cost"),
                Type.Literal("tokens"),
                Type.Literal("tokens_in"),
                Type.Literal("tokens_out"),
                Type.Literal("duration"),
                Type.Literal("feedback"),
              ],
              { "x-auditable": true },
            ),
            operator: Type.Union(
              [Type.Literal("eq"), Type.Literal("contains"), Type.Literal("lt"), Type.Literal("gt")],
              { "x-auditable": true },
            ),
            value: Type.Array(Type.Union([Type.String(), Type.Number(), Type.Boolean()]), { "x-auditable": true }),
          }),
        ),
        name: Type.String({ "x-auditable": true }),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_id: Type.String(),
            account_tag: Type.String(),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            enable: Type.Boolean({ "x-auditable": true }),
            filters: Type.Array(
              Type.Object({
                key: Type.Union(
                  [
                    Type.Literal("created_at"),
                    Type.Literal("request_content_type"),
                    Type.Literal("response_content_type"),
                    Type.Literal("success"),
                    Type.Literal("cached"),
                    Type.Literal("provider"),
                    Type.Literal("model"),
                    Type.Literal("cost"),
                    Type.Literal("tokens"),
                    Type.Literal("tokens_in"),
                    Type.Literal("tokens_out"),
                    Type.Literal("duration"),
                    Type.Literal("feedback"),
                  ],
                  { "x-auditable": true },
                ),
                operator: Type.Union(
                  [Type.Literal("eq"), Type.Literal("contains"), Type.Literal("lt"), Type.Literal("gt")],
                  { "x-auditable": true },
                ),
                value: Type.Array(Type.Union([Type.String(), Type.Number(), Type.Boolean()]), { "x-auditable": true }),
              }),
            ),
            gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
            id: Type.String({ "x-auditable": true }),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String({ "x-auditable": true }),
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
              path: Type.Array(Type.String()),
            }),
          ),
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
          success: Type.Boolean(),
        }),
      )
      .summary("Update a Dataset")
      .operationId("aig-config-update-dataset")
      .tag("AI Gateway Datasets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/gateways/{gateway_id}/datasets/{id}", {
      params: Type.Object({
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
        id: Type.String({ "x-auditable": true }),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_id: Type.String(),
            account_tag: Type.String(),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            enable: Type.Boolean({ "x-auditable": true }),
            filters: Type.Array(
              Type.Object({
                key: Type.Union(
                  [
                    Type.Literal("created_at"),
                    Type.Literal("request_content_type"),
                    Type.Literal("response_content_type"),
                    Type.Literal("success"),
                    Type.Literal("cached"),
                    Type.Literal("provider"),
                    Type.Literal("model"),
                    Type.Literal("cost"),
                    Type.Literal("tokens"),
                    Type.Literal("tokens_in"),
                    Type.Literal("tokens_out"),
                    Type.Literal("duration"),
                    Type.Literal("feedback"),
                  ],
                  { "x-auditable": true },
                ),
                operator: Type.Union(
                  [Type.Literal("eq"), Type.Literal("contains"), Type.Literal("lt"), Type.Literal("gt")],
                  { "x-auditable": true },
                ),
                value: Type.Array(Type.Union([Type.String(), Type.Number(), Type.Boolean()]), { "x-auditable": true }),
              }),
            ),
            gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
            id: Type.String({ "x-auditable": true }),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String({ "x-auditable": true }),
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
          success: Type.Boolean(),
        }),
      )
      .summary("Delete a Dataset")
      .operationId("aig-config-delete-dataset")
      .tag("AI Gateway Datasets")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways/{gateway_id}/evaluations", {
      params: Type.Object({
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
      }),
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 20, minimum: 1, maximum: 100 })),
        name: Type.Optional(Type.String({ "x-auditable": true })),
        processed: Type.Optional(Type.Boolean({ "x-auditable": true })),
        search: Type.Optional(Type.String({ description: "Search by id, name" })),
      }),
    })
      .response(
        Type.Object({
          result: Type.Array(
            Type.Object({
              account_id: Type.String(),
              account_tag: Type.String(),
              created_at: Type.String({ format: "date-time", readOnly: true }),
              datasets: Type.Array(
                Type.Object({
                  account_id: Type.String(),
                  account_tag: Type.String(),
                  created_at: Type.String({ format: "date-time", readOnly: true }),
                  enable: Type.Boolean({ "x-auditable": true }),
                  filters: Type.Array(
                    Type.Object({
                      key: Type.Union(
                        [
                          Type.Literal("created_at"),
                          Type.Literal("request_content_type"),
                          Type.Literal("response_content_type"),
                          Type.Literal("success"),
                          Type.Literal("cached"),
                          Type.Literal("provider"),
                          Type.Literal("model"),
                          Type.Literal("cost"),
                          Type.Literal("tokens"),
                          Type.Literal("tokens_in"),
                          Type.Literal("tokens_out"),
                          Type.Literal("duration"),
                          Type.Literal("feedback"),
                        ],
                        { "x-auditable": true },
                      ),
                      operator: Type.Union(
                        [Type.Literal("eq"), Type.Literal("contains"), Type.Literal("lt"), Type.Literal("gt")],
                        { "x-auditable": true },
                      ),
                      value: Type.Array(Type.Union([Type.String(), Type.Number(), Type.Boolean()]), {
                        "x-auditable": true,
                      }),
                    }),
                  ),
                  gateway_id: Type.String({
                    description: "gateway id",
                    minLength: 1,
                    maxLength: 64,
                    "x-auditable": true,
                  }),
                  id: Type.String({ "x-auditable": true }),
                  modified_at: Type.String({ format: "date-time", readOnly: true }),
                  name: Type.String({ "x-auditable": true }),
                }),
              ),
              gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
              id: Type.String({ "x-auditable": true }),
              modified_at: Type.String({ format: "date-time", readOnly: true }),
              name: Type.String({ "x-auditable": true }),
              processed: Type.Boolean({ "x-auditable": true }),
              results: Type.Array(
                Type.Object({
                  created_at: Type.String({ format: "date-time", readOnly: true }),
                  evaluation_id: Type.String(),
                  evaluation_type_id: Type.String(),
                  id: Type.String(),
                  modified_at: Type.String({ format: "date-time", readOnly: true }),
                  result: Type.String(),
                  status: Type.Number(),
                  status_description: Type.String(),
                  total_logs: Type.Number(),
                }),
              ),
              total_logs: Type.Number({ "x-auditable": true }),
            }),
          ),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("List Evaluations")
      .operationId("aig-config-list-evaluations")
      .tag("AI Gateway Evaluations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/gateways/{gateway_id}/evaluations", {
      params: Type.Object({
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
      }),
      body: Type.Object({
        dataset_ids: Type.Array(Type.String(), { minItems: 1, maxItems: 5 }),
        evaluation_type_ids: Type.Array(Type.String()),
        name: Type.String({ "x-auditable": true }),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_id: Type.String(),
            account_tag: Type.String(),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            datasets: Type.Array(
              Type.Object({
                account_id: Type.String(),
                account_tag: Type.String(),
                created_at: Type.String({ format: "date-time", readOnly: true }),
                enable: Type.Boolean({ "x-auditable": true }),
                filters: Type.Array(
                  Type.Object({
                    key: Type.Union(
                      [
                        Type.Literal("created_at"),
                        Type.Literal("request_content_type"),
                        Type.Literal("response_content_type"),
                        Type.Literal("success"),
                        Type.Literal("cached"),
                        Type.Literal("provider"),
                        Type.Literal("model"),
                        Type.Literal("cost"),
                        Type.Literal("tokens"),
                        Type.Literal("tokens_in"),
                        Type.Literal("tokens_out"),
                        Type.Literal("duration"),
                        Type.Literal("feedback"),
                      ],
                      { "x-auditable": true },
                    ),
                    operator: Type.Union(
                      [Type.Literal("eq"), Type.Literal("contains"), Type.Literal("lt"), Type.Literal("gt")],
                      { "x-auditable": true },
                    ),
                    value: Type.Array(Type.Union([Type.String(), Type.Number(), Type.Boolean()]), {
                      "x-auditable": true,
                    }),
                  }),
                ),
                gateway_id: Type.String({
                  description: "gateway id",
                  minLength: 1,
                  maxLength: 64,
                  "x-auditable": true,
                }),
                id: Type.String({ "x-auditable": true }),
                modified_at: Type.String({ format: "date-time", readOnly: true }),
                name: Type.String({ "x-auditable": true }),
              }),
            ),
            gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
            id: Type.String({ "x-auditable": true }),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String({ "x-auditable": true }),
            processed: Type.Boolean({ "x-auditable": true }),
            results: Type.Array(
              Type.Object({
                created_at: Type.String({ format: "date-time", readOnly: true }),
                evaluation_id: Type.String(),
                evaluation_type_id: Type.String(),
                id: Type.String(),
                modified_at: Type.String({ format: "date-time", readOnly: true }),
                result: Type.String(),
                status: Type.Number(),
                status_description: Type.String(),
                total_logs: Type.Number(),
              }),
            ),
            total_logs: Type.Number({ "x-auditable": true }),
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
              path: Type.Array(Type.String()),
            }),
          ),
          success: Type.Boolean(),
        }),
      )
      .summary("Create a new Evaluation")
      .operationId("aig-config-create-evaluations")
      .tag("AI Gateway Evaluations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways/{gateway_id}/evaluations/{id}", {
      params: Type.Object({
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
        id: Type.String({ "x-auditable": true }),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_id: Type.String(),
            account_tag: Type.String(),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            datasets: Type.Array(
              Type.Object({
                account_id: Type.String(),
                account_tag: Type.String(),
                created_at: Type.String({ format: "date-time", readOnly: true }),
                enable: Type.Boolean({ "x-auditable": true }),
                filters: Type.Array(
                  Type.Object({
                    key: Type.Union(
                      [
                        Type.Literal("created_at"),
                        Type.Literal("request_content_type"),
                        Type.Literal("response_content_type"),
                        Type.Literal("success"),
                        Type.Literal("cached"),
                        Type.Literal("provider"),
                        Type.Literal("model"),
                        Type.Literal("cost"),
                        Type.Literal("tokens"),
                        Type.Literal("tokens_in"),
                        Type.Literal("tokens_out"),
                        Type.Literal("duration"),
                        Type.Literal("feedback"),
                      ],
                      { "x-auditable": true },
                    ),
                    operator: Type.Union(
                      [Type.Literal("eq"), Type.Literal("contains"), Type.Literal("lt"), Type.Literal("gt")],
                      { "x-auditable": true },
                    ),
                    value: Type.Array(Type.Union([Type.String(), Type.Number(), Type.Boolean()]), {
                      "x-auditable": true,
                    }),
                  }),
                ),
                gateway_id: Type.String({
                  description: "gateway id",
                  minLength: 1,
                  maxLength: 64,
                  "x-auditable": true,
                }),
                id: Type.String({ "x-auditable": true }),
                modified_at: Type.String({ format: "date-time", readOnly: true }),
                name: Type.String({ "x-auditable": true }),
              }),
            ),
            gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
            id: Type.String({ "x-auditable": true }),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String({ "x-auditable": true }),
            processed: Type.Boolean({ "x-auditable": true }),
            results: Type.Array(
              Type.Object({
                created_at: Type.String({ format: "date-time", readOnly: true }),
                evaluation_id: Type.String(),
                evaluation_type_id: Type.String(),
                id: Type.String(),
                modified_at: Type.String({ format: "date-time", readOnly: true }),
                result: Type.String(),
                status: Type.Number(),
                status_description: Type.String(),
                total_logs: Type.Number(),
              }),
            ),
            total_logs: Type.Number({ "x-auditable": true }),
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
          success: Type.Boolean(),
        }),
      )
      .summary("Fetch a Evaluation")
      .operationId("aig-config-fetch-evaluations")
      .tag("AI Gateway Evaluations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/gateways/{gateway_id}/evaluations/{id}", {
      params: Type.Object({
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
        id: Type.String({ "x-auditable": true }),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_id: Type.String(),
            account_tag: Type.String(),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            datasets: Type.Array(
              Type.Object({
                account_id: Type.String(),
                account_tag: Type.String(),
                created_at: Type.String({ format: "date-time", readOnly: true }),
                enable: Type.Boolean({ "x-auditable": true }),
                filters: Type.Array(
                  Type.Object({
                    key: Type.Union(
                      [
                        Type.Literal("created_at"),
                        Type.Literal("request_content_type"),
                        Type.Literal("response_content_type"),
                        Type.Literal("success"),
                        Type.Literal("cached"),
                        Type.Literal("provider"),
                        Type.Literal("model"),
                        Type.Literal("cost"),
                        Type.Literal("tokens"),
                        Type.Literal("tokens_in"),
                        Type.Literal("tokens_out"),
                        Type.Literal("duration"),
                        Type.Literal("feedback"),
                      ],
                      { "x-auditable": true },
                    ),
                    operator: Type.Union(
                      [Type.Literal("eq"), Type.Literal("contains"), Type.Literal("lt"), Type.Literal("gt")],
                      { "x-auditable": true },
                    ),
                    value: Type.Array(Type.Union([Type.String(), Type.Number(), Type.Boolean()]), {
                      "x-auditable": true,
                    }),
                  }),
                ),
                gateway_id: Type.String({
                  description: "gateway id",
                  minLength: 1,
                  maxLength: 64,
                  "x-auditable": true,
                }),
                id: Type.String({ "x-auditable": true }),
                modified_at: Type.String({ format: "date-time", readOnly: true }),
                name: Type.String({ "x-auditable": true }),
              }),
            ),
            gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
            id: Type.String({ "x-auditable": true }),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String({ "x-auditable": true }),
            processed: Type.Boolean({ "x-auditable": true }),
            results: Type.Array(
              Type.Object({
                created_at: Type.String({ format: "date-time", readOnly: true }),
                evaluation_id: Type.String(),
                evaluation_type_id: Type.String(),
                id: Type.String(),
                modified_at: Type.String({ format: "date-time", readOnly: true }),
                result: Type.String(),
                status: Type.Number(),
                status_description: Type.String(),
                total_logs: Type.Number(),
              }),
            ),
            total_logs: Type.Number({ "x-auditable": true }),
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
          success: Type.Boolean(),
        }),
      )
      .summary("Delete a Evaluation")
      .operationId("aig-config-delete-evaluations")
      .tag("AI Gateway Evaluations")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways/{gateway_id}/logs", {
      params: Type.Object({
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
      }),
      query: Type.Object({
        search: Type.Optional(Type.String()),
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 20, minimum: 1, maximum: 50 })),
        order_by: Type.Optional(
          Type.Union([
            Type.Literal("created_at"),
            Type.Literal("provider"),
            Type.Literal("model"),
            Type.Literal("model_type"),
            Type.Literal("success"),
            Type.Literal("cached"),
          ]),
        ),
        order_by_direction: Type.Optional(Type.Union([Type.Literal("asc"), Type.Literal("desc")])),
        filters: Type.Optional(
          Type.Array(
            Type.Object({
              key: Type.Union([
                Type.Literal("id"),
                Type.Literal("created_at"),
                Type.Literal("request_content_type"),
                Type.Literal("response_content_type"),
                Type.Literal("request_type"),
                Type.Literal("success"),
                Type.Literal("cached"),
                Type.Literal("provider"),
                Type.Literal("model"),
                Type.Literal("model_type"),
                Type.Literal("cost"),
                Type.Literal("tokens"),
                Type.Literal("tokens_in"),
                Type.Literal("tokens_out"),
                Type.Literal("duration"),
                Type.Literal("feedback"),
                Type.Literal("event_id"),
                Type.Literal("metadata.key"),
                Type.Literal("metadata.value"),
                Type.Literal("prompts.prompt_id"),
                Type.Literal("prompts.version_id"),
                Type.Literal("authentication"),
                Type.Literal("wholesale"),
                Type.Literal("compatibilityMode"),
                Type.Literal("dlp_action"),
              ]),
              operator: Type.Union([
                Type.Literal("eq"),
                Type.Literal("neq"),
                Type.Literal("contains"),
                Type.Literal("lt"),
                Type.Literal("gt"),
              ]),
              value: Type.Array(Type.Union([Type.Union([Type.String(), Type.Null()]), Type.Number(), Type.Boolean()])),
            }),
          ),
        ),
        meta_info: Type.Optional(Type.Boolean()),
        direction: Type.Optional(Type.Union([Type.Literal("asc"), Type.Literal("desc")])),
        start_date: Type.Optional(Type.String({ format: "date-time", deprecated: true })),
        end_date: Type.Optional(Type.String({ format: "date-time", deprecated: true })),
        min_cost: Type.Optional(Type.Number({ deprecated: true })),
        max_cost: Type.Optional(Type.Number({ deprecated: true })),
        min_tokens_in: Type.Optional(Type.Number({ deprecated: true })),
        max_tokens_in: Type.Optional(Type.Number({ deprecated: true })),
        min_tokens_out: Type.Optional(Type.Number({ deprecated: true })),
        max_tokens_out: Type.Optional(Type.Number({ deprecated: true })),
        min_total_tokens: Type.Optional(Type.Number({ deprecated: true })),
        max_total_tokens: Type.Optional(Type.Number({ deprecated: true })),
        min_duration: Type.Optional(Type.Number({ deprecated: true })),
        max_duration: Type.Optional(Type.Number({ deprecated: true })),
        feedback: Type.Optional(Type.Union([Type.Union([Type.Literal(0)]), Type.Union([Type.Literal(1)])])),
        success: Type.Optional(Type.Boolean({ deprecated: true })),
        cached: Type.Optional(Type.Boolean({ deprecated: true })),
        model: Type.Optional(Type.String({ deprecated: true })),
        model_type: Type.Optional(Type.String({ deprecated: true })),
        provider: Type.Optional(Type.String({ deprecated: true })),
        request_content_type: Type.Optional(Type.String({ deprecated: true })),
        response_content_type: Type.Optional(Type.String({ deprecated: true })),
      }),
    })
      .response(
        Type.Object({
          result: Type.Array(
            Type.Object({
              cached: Type.Boolean(),
              cost: Type.Optional(Type.Number()),
              created_at: Type.String({ format: "date-time", readOnly: true }),
              custom_cost: Type.Optional(Type.Boolean()),
              duration: Type.Integer(),
              id: Type.String(),
              metadata: Type.Optional(Type.String()),
              model: Type.String(),
              model_type: Type.Optional(
                Type.String({ "x-stainless-naming": { python: { property_name: "ai_model_type" } } }),
              ),
              path: Type.String(),
              provider: Type.String(),
              request_content_type: Type.Optional(Type.String()),
              request_type: Type.Optional(Type.String()),
              response_content_type: Type.Optional(Type.String()),
              status_code: Type.Optional(Type.Integer()),
              step: Type.Optional(Type.Integer()),
              success: Type.Boolean(),
              tokens_in: Type.Union([Type.Integer(), Type.Null()]),
              tokens_out: Type.Union([Type.Integer(), Type.Null()]),
            }),
          ),
          result_info: Type.Object({
            count: Type.Optional(Type.Number()),
            max_cost: Type.Optional(Type.Number()),
            max_duration: Type.Optional(Type.Number()),
            max_tokens_in: Type.Optional(Type.Number()),
            max_tokens_out: Type.Optional(Type.Number()),
            max_total_tokens: Type.Optional(Type.Number()),
            min_cost: Type.Optional(Type.Number()),
            min_duration: Type.Optional(Type.Number()),
            min_tokens_in: Type.Optional(Type.Number()),
            min_tokens_out: Type.Optional(Type.Number()),
            min_total_tokens: Type.Optional(Type.Number()),
            page: Type.Optional(Type.Number()),
            per_page: Type.Optional(Type.Number()),
            total_count: Type.Optional(Type.Number()),
          }),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("List Gateway Logs")
      .operationId("aig-config-list-gateway-logs")
      .tag("AI Gateway Logs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/gateways/{gateway_id}/logs", {
      params: Type.Object({
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
      }),
      query: Type.Object({
        order_by: Type.Optional(
          Type.Union([
            Type.Literal("created_at"),
            Type.Literal("provider"),
            Type.Literal("model"),
            Type.Literal("model_type"),
            Type.Literal("success"),
            Type.Literal("cached"),
            Type.Literal("cost"),
            Type.Literal("tokens_in"),
            Type.Literal("tokens_out"),
            Type.Literal("duration"),
            Type.Literal("feedback"),
          ]),
        ),
        order_by_direction: Type.Optional(Type.Union([Type.Literal("asc"), Type.Literal("desc")])),
        filters: Type.Optional(
          Type.Array(
            Type.Object({
              key: Type.Union([
                Type.Literal("id"),
                Type.Literal("created_at"),
                Type.Literal("request_content_type"),
                Type.Literal("response_content_type"),
                Type.Literal("request_type"),
                Type.Literal("success"),
                Type.Literal("cached"),
                Type.Literal("provider"),
                Type.Literal("model"),
                Type.Literal("model_type"),
                Type.Literal("cost"),
                Type.Literal("tokens"),
                Type.Literal("tokens_in"),
                Type.Literal("tokens_out"),
                Type.Literal("duration"),
                Type.Literal("feedback"),
                Type.Literal("event_id"),
                Type.Literal("metadata.key"),
                Type.Literal("metadata.value"),
                Type.Literal("prompts.prompt_id"),
                Type.Literal("prompts.version_id"),
                Type.Literal("authentication"),
                Type.Literal("wholesale"),
                Type.Literal("compatibilityMode"),
                Type.Literal("dlp_action"),
              ]),
              operator: Type.Union([
                Type.Literal("eq"),
                Type.Literal("neq"),
                Type.Literal("contains"),
                Type.Literal("lt"),
                Type.Literal("gt"),
              ]),
              value: Type.Array(Type.Union([Type.Union([Type.String(), Type.Null()]), Type.Number(), Type.Boolean()])),
            }),
          ),
        ),
        limit: Type.Optional(Type.Integer({ default: 10000, minimum: 1, maximum: 10000 })),
      }),
    })
      .response(
        Type.Object({
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("Delete Gateway Logs")
      .operationId("aig-config-delete-gateway-logs")
      .tag("AI Gateway Logs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways/{gateway_id}/logs/{id}", {
      params: Type.Object({
        id: Type.String(),
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            cached: Type.Boolean(),
            cost: Type.Optional(Type.Number()),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            custom_cost: Type.Optional(Type.Boolean()),
            duration: Type.Integer(),
            id: Type.String(),
            metadata: Type.Optional(Type.String()),
            model: Type.String(),
            model_type: Type.Optional(
              Type.String({ "x-stainless-naming": { python: { property_name: "ai_model_type" } } }),
            ),
            path: Type.String(),
            provider: Type.String(),
            request_content_type: Type.Optional(Type.String()),
            request_head: Type.Optional(Type.String()),
            request_head_complete: Type.Optional(Type.Boolean()),
            request_size: Type.Optional(Type.Integer()),
            request_type: Type.Optional(Type.String()),
            response_content_type: Type.Optional(Type.String()),
            response_head: Type.Optional(Type.String()),
            response_head_complete: Type.Optional(Type.Boolean()),
            response_size: Type.Optional(Type.Integer()),
            status_code: Type.Optional(Type.Integer()),
            step: Type.Optional(Type.Integer()),
            success: Type.Boolean(),
            tokens_in: Type.Union([Type.Integer(), Type.Null()]),
            tokens_out: Type.Union([Type.Integer(), Type.Null()]),
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
          success: Type.Boolean(),
        }),
      )
      .summary("Get Gateway Log Detail")
      .operationId("aig-config-get-gateway-log-detail")
      .tag("AI Gateway Logs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/gateways/{gateway_id}/logs/{id}", {
      params: Type.Object({
        id: Type.String(),
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
      }),
      body: Type.Object({
        feedback: Type.Optional(Type.Union([Type.Number({ minimum: -1, maximum: 1 }), Type.Null()])),
        metadata: Type.Optional(
          Type.Union([
            Type.Record(Type.String(), Type.Union([Type.String(), Type.Number(), Type.Boolean()])),
            Type.Null(),
          ]),
        ),
        score: Type.Optional(Type.Union([Type.Number({ minimum: 0, maximum: 100 }), Type.Null()])),
      }),
    })
      .response(
        Type.Object({
          result: Type.Unknown(),
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
          success: Type.Boolean(),
        }),
      )
      .summary("Patch Gateway Log")
      .operationId("aig-config-patch-gateway-log")
      .tag("AI Gateway Logs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways/{gateway_id}/logs/{id}/request", {
      params: Type.Object({
        id: Type.String(),
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
      }),
    })
      .response(Type.Unknown())
      .error(
        404,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          success: Type.Boolean(),
        }),
      )
      .summary("Get Gateway Log Request")
      .operationId("aig-config-get-gateway-log-request")
      .tag("AI Gateway Logs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways/{gateway_id}/logs/{id}/response", {
      params: Type.Object({
        id: Type.String(),
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
      }),
    })
      .response(Type.Unknown())
      .error(
        404,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              code: Type.Number(),
              message: Type.String(),
            }),
          ),
          success: Type.Boolean(),
        }),
      )
      .summary("Get Gateway Log Response")
      .operationId("aig-config-get-gateway-log-response")
      .tag("AI Gateway Logs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways/{gateway_id}/provider_configs", {
      params: Type.Object({
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
      }),
      query: Type.Object({
        page: Type.Optional(Type.Integer({ default: 1, minimum: 1 })),
        per_page: Type.Optional(Type.Integer({ default: 20, minimum: 1, maximum: 100 })),
      }),
    })
      .response(
        Type.Object({
          result: Type.Array(
            Type.Object({
              account_id: Type.String(),
              account_tag: Type.String(),
              alias: Type.String(),
              default_config: Type.Boolean(),
              gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
              id: Type.String(),
              modified_at: Type.String({ format: "date-time", readOnly: true }),
              provider_slug: Type.String(),
              rate_limit: Type.Optional(Type.Number()),
              rate_limit_period: Type.Optional(Type.Number({ default: 60 })),
              secret_id: Type.String(),
              secret_preview: Type.String(),
            }),
          ),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("List Provider Configs")
      .operationId("aig-config-list-providers")
      .tag("AI Gateway Provider Configs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/gateways/{gateway_id}/provider_configs", {
      params: Type.Object({
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
      }),
      body: Type.Object({
        alias: Type.String(),
        default_config: Type.Boolean(),
        provider_slug: Type.String(),
        rate_limit: Type.Optional(Type.Number()),
        rate_limit_period: Type.Optional(Type.Number({ default: 60 })),
        secret: Type.String(),
        secret_id: Type.String(),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_id: Type.String(),
            account_tag: Type.String(),
            alias: Type.String(),
            default_config: Type.Boolean(),
            gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
            id: Type.String(),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            provider_slug: Type.String(),
            rate_limit: Type.Optional(Type.Number()),
            rate_limit_period: Type.Optional(Type.Number({ default: 60 })),
            secret_id: Type.String(),
            secret_preview: Type.String(),
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
              path: Type.Array(Type.String()),
            }),
          ),
          success: Type.Boolean(),
        }),
      )
      .summary("Create a new Provider Configs")
      .operationId("aig-config-create-providers")
      .tag("AI Gateway Provider Configs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Secrets Store Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/gateways/{gateway_id}/provider_configs/{id}", {
      params: Type.Object({
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
        id: Type.String(),
      }),
      body: Type.Object({
        secret: Type.String(),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_id: Type.String(),
            account_tag: Type.String(),
            alias: Type.String(),
            default_config: Type.Boolean(),
            gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
            id: Type.String(),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            provider_slug: Type.String(),
            rate_limit: Type.Optional(Type.Number()),
            rate_limit_period: Type.Optional(Type.Number({ default: 60 })),
            secret_id: Type.String(),
            secret_preview: Type.String(),
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
              path: Type.Array(Type.String()),
            }),
          ),
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
          success: Type.Boolean(),
        }),
      )
      .summary("Update a Provider Configs")
      .operationId("aig-config-update-providers")
      .tag("AI Gateway Provider Configs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Secrets Store Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/gateways/{gateway_id}/provider_configs/{id}", {
      params: Type.Object({
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
        id: Type.String(),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_id: Type.String(),
            account_tag: Type.String(),
            alias: Type.String(),
            default_config: Type.Boolean(),
            gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
            id: Type.String(),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            provider_slug: Type.String(),
            rate_limit: Type.Optional(Type.Number()),
            rate_limit_period: Type.Optional(Type.Number({ default: 60 })),
            secret_id: Type.String(),
            secret_preview: Type.String(),
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
          success: Type.Boolean(),
        }),
      )
      .summary("Delete a Provider Configs")
      .operationId("aig-config-delete-providers")
      .tag("AI Gateway Provider Configs")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Secrets Store Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways/{gateway_id}/routes", {
      params: Type.Object({ gateway_id: Type.String() }),
    })
      .response(
        Type.Object({
          data: Type.Object({
            order_by: Type.String(),
            order_by_direction: Type.String(),
            page: Type.Number(),
            per_page: Type.Number(),
            routes: Type.Array(
              Type.Object({
                account_tag: Type.String(),
                created_at: Type.String({ format: "date-time", readOnly: true }),
                deployment: Type.Object({
                  comment: Type.Optional(Type.Union([Type.String(), Type.Null()])),
                  created_at: Type.String({ readOnly: true }),
                  deployment_id: Type.String(),
                  version_id: Type.String(),
                }),
                elements: Type.Array(
                  Type.Union([
                    Type.Object({
                      id: Type.String(),
                      outputs: Type.Object({
                        next: Type.Object({
                          elementId: Type.String(),
                        }),
                      }),
                      type: Type.Union([Type.Literal("start")]),
                    }),
                    Type.Object({
                      id: Type.String(),
                      outputs: Type.Object({
                        false: Type.Object({
                          elementId: Type.String(),
                        }),
                        true: Type.Object({
                          elementId: Type.String(),
                        }),
                      }),
                      properties: Type.Object({
                        conditions: Type.Optional(Type.Unknown()),
                      }),
                      type: Type.Union([Type.Literal("conditional")]),
                    }),
                    Type.Object({
                      id: Type.String(),
                      outputs: Type.Record(
                        Type.String(),
                        Type.Object({
                          elementId: Type.String(),
                        }),
                      ),
                      type: Type.Union([Type.Literal("percentage")]),
                    }),
                    Type.Object({
                      id: Type.String(),
                      outputs: Type.Object({
                        fallback: Type.Object({
                          elementId: Type.String(),
                        }),
                        success: Type.Object({
                          elementId: Type.String(),
                        }),
                      }),
                      properties: Type.Object({
                        key: Type.String(),
                        limit: Type.Number(),
                        limitType: Type.Union([Type.Literal("count"), Type.Literal("cost")]),
                        window: Type.Number(),
                      }),
                      type: Type.Union([Type.Literal("rate")]),
                    }),
                    Type.Object({
                      id: Type.String(),
                      outputs: Type.Object({
                        fallback: Type.Object({
                          elementId: Type.String(),
                        }),
                        success: Type.Object({
                          elementId: Type.String(),
                        }),
                      }),
                      properties: Type.Object({
                        model: Type.String(),
                        provider: Type.String(),
                        retries: Type.Number(),
                        timeout: Type.Number(),
                      }),
                      type: Type.Union([Type.Literal("model")]),
                    }),
                    Type.Object({
                      id: Type.String(),
                      outputs: Type.Record(
                        Type.String(),
                        Type.Object({
                          elementId: Type.String(),
                        }),
                      ),
                      type: Type.Union([Type.Literal("end")]),
                    }),
                  ]),
                ),
                gateway_id: Type.String(),
                id: Type.String(),
                modified_at: Type.String({ format: "date-time", readOnly: true }),
                name: Type.String(),
                version: Type.Object({
                  active: Type.Union([Type.Literal("true"), Type.Literal("false")]),
                  comment: Type.Optional(Type.Union([Type.String(), Type.Null()])),
                  created_at: Type.String({ readOnly: true }),
                  data: Type.String(),
                  version_id: Type.String(),
                }),
              }),
            ),
          }),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("List all AI Gateway Dynamic Routes.")
      .description("List all AI Gateway Dynamic Routes.")
      .operationId("aig-config-list-gateway-dynamic-routes")
      .tag("AI Gateway Dynamic Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/gateways/{gateway_id}/routes", {
      params: Type.Object({ gateway_id: Type.String() }),
      body: Type.Object({
        elements: Type.Array(
          Type.Union([
            Type.Object({
              id: Type.String(),
              outputs: Type.Object({
                next: Type.Object({
                  elementId: Type.String(),
                }),
              }),
              type: Type.Union([Type.Literal("start")]),
            }),
            Type.Object({
              id: Type.String(),
              outputs: Type.Object({
                false: Type.Object({
                  elementId: Type.String(),
                }),
                true: Type.Object({
                  elementId: Type.String(),
                }),
              }),
              properties: Type.Object({
                conditions: Type.Optional(Type.Unknown()),
              }),
              type: Type.Union([Type.Literal("conditional")]),
            }),
            Type.Object({
              id: Type.String(),
              outputs: Type.Record(
                Type.String(),
                Type.Object({
                  elementId: Type.String(),
                }),
              ),
              type: Type.Union([Type.Literal("percentage")]),
            }),
            Type.Object({
              id: Type.String(),
              outputs: Type.Object({
                fallback: Type.Object({
                  elementId: Type.String(),
                }),
                success: Type.Object({
                  elementId: Type.String(),
                }),
              }),
              properties: Type.Object({
                key: Type.String(),
                limit: Type.Number(),
                limitType: Type.Union([Type.Literal("count"), Type.Literal("cost")]),
                window: Type.Number(),
              }),
              type: Type.Union([Type.Literal("rate")]),
            }),
            Type.Object({
              id: Type.String(),
              outputs: Type.Object({
                fallback: Type.Object({
                  elementId: Type.String(),
                }),
                success: Type.Object({
                  elementId: Type.String(),
                }),
              }),
              properties: Type.Object({
                model: Type.String(),
                provider: Type.String(),
                retries: Type.Number(),
                timeout: Type.Number(),
              }),
              type: Type.Union([Type.Literal("model")]),
            }),
            Type.Object({
              id: Type.String(),
              outputs: Type.Record(
                Type.String(),
                Type.Object({
                  elementId: Type.String(),
                }),
              ),
              type: Type.Union([Type.Literal("end")]),
            }),
          ]),
        ),
        name: Type.String(),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_tag: Type.String(),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            deployment: Type.Object({
              comment: Type.Optional(Type.Union([Type.String(), Type.Null()])),
              created_at: Type.String({ readOnly: true }),
              deployment_id: Type.String(),
              version_id: Type.String(),
            }),
            elements: Type.Array(
              Type.Union([
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    next: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  type: Type.Union([Type.Literal("start")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    false: Type.Object({
                      elementId: Type.String(),
                    }),
                    true: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    conditions: Type.Optional(Type.Unknown()),
                  }),
                  type: Type.Union([Type.Literal("conditional")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Record(
                    Type.String(),
                    Type.Object({
                      elementId: Type.String(),
                    }),
                  ),
                  type: Type.Union([Type.Literal("percentage")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    fallback: Type.Object({
                      elementId: Type.String(),
                    }),
                    success: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    key: Type.String(),
                    limit: Type.Number(),
                    limitType: Type.Union([Type.Literal("count"), Type.Literal("cost")]),
                    window: Type.Number(),
                  }),
                  type: Type.Union([Type.Literal("rate")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    fallback: Type.Object({
                      elementId: Type.String(),
                    }),
                    success: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    model: Type.String(),
                    provider: Type.String(),
                    retries: Type.Number(),
                    timeout: Type.Number(),
                  }),
                  type: Type.Union([Type.Literal("model")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Record(
                    Type.String(),
                    Type.Object({
                      elementId: Type.String(),
                    }),
                  ),
                  type: Type.Union([Type.Literal("end")]),
                }),
              ]),
            ),
            gateway_id: Type.String(),
            id: Type.String(),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String(),
            version: Type.Object({
              active: Type.Union([Type.Literal("true"), Type.Literal("false")]),
              comment: Type.Optional(Type.Union([Type.String(), Type.Null()])),
              created_at: Type.String({ readOnly: true }),
              data: Type.String(),
              version_id: Type.String(),
            }),
          }),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("Create a new AI Gateway Dynamic Route.")
      .description("Create a new AI Gateway Dynamic Route.")
      .operationId("aig-config-post-gateway-dynamic-route")
      .tag("AI Gateway Dynamic Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways/{gateway_id}/routes/{id}", {
      params: Type.Object({ gateway_id: Type.String(), id: Type.String() }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_tag: Type.String(),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            deployment: Type.Object({
              comment: Type.Optional(Type.Union([Type.String(), Type.Null()])),
              created_at: Type.String({ readOnly: true }),
              deployment_id: Type.String(),
              version_id: Type.String(),
            }),
            elements: Type.Array(
              Type.Union([
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    next: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  type: Type.Union([Type.Literal("start")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    false: Type.Object({
                      elementId: Type.String(),
                    }),
                    true: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    conditions: Type.Optional(Type.Unknown()),
                  }),
                  type: Type.Union([Type.Literal("conditional")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Record(
                    Type.String(),
                    Type.Object({
                      elementId: Type.String(),
                    }),
                  ),
                  type: Type.Union([Type.Literal("percentage")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    fallback: Type.Object({
                      elementId: Type.String(),
                    }),
                    success: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    key: Type.String(),
                    limit: Type.Number(),
                    limitType: Type.Union([Type.Literal("count"), Type.Literal("cost")]),
                    window: Type.Number(),
                  }),
                  type: Type.Union([Type.Literal("rate")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    fallback: Type.Object({
                      elementId: Type.String(),
                    }),
                    success: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    model: Type.String(),
                    provider: Type.String(),
                    retries: Type.Number(),
                    timeout: Type.Number(),
                  }),
                  type: Type.Union([Type.Literal("model")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Record(
                    Type.String(),
                    Type.Object({
                      elementId: Type.String(),
                    }),
                  ),
                  type: Type.Union([Type.Literal("end")]),
                }),
              ]),
            ),
            gateway_id: Type.String(),
            id: Type.String(),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String(),
            version: Type.Object({
              active: Type.Union([Type.Literal("true"), Type.Literal("false")]),
              comment: Type.Optional(Type.Union([Type.String(), Type.Null()])),
              created_at: Type.String({ readOnly: true }),
              data: Type.String(),
              version_id: Type.String(),
            }),
          }),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("Get an AI Gateway Dynamic Route.")
      .description("Get an AI Gateway Dynamic Route.")
      .operationId("aig-config-get-gateway-dynamic-route")
      .tag("AI Gateway Dynamic Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.patch("/gateways/{gateway_id}/routes/{id}", {
      params: Type.Object({ gateway_id: Type.String(), id: Type.String() }),
      body: Type.Object({
        name: Type.String(),
      }),
    })
      .response(
        Type.Object({
          route: Type.Object({
            account_tag: Type.String(),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            deployment: Type.Object({
              comment: Type.Optional(Type.Union([Type.String(), Type.Null()])),
              created_at: Type.String({ readOnly: true }),
              deployment_id: Type.String(),
              version_id: Type.String(),
            }),
            elements: Type.Array(
              Type.Union([
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    next: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  type: Type.Union([Type.Literal("start")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    false: Type.Object({
                      elementId: Type.String(),
                    }),
                    true: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    conditions: Type.Optional(Type.Unknown()),
                  }),
                  type: Type.Union([Type.Literal("conditional")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Record(
                    Type.String(),
                    Type.Object({
                      elementId: Type.String(),
                    }),
                  ),
                  type: Type.Union([Type.Literal("percentage")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    fallback: Type.Object({
                      elementId: Type.String(),
                    }),
                    success: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    key: Type.String(),
                    limit: Type.Number(),
                    limitType: Type.Union([Type.Literal("count"), Type.Literal("cost")]),
                    window: Type.Number(),
                  }),
                  type: Type.Union([Type.Literal("rate")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    fallback: Type.Object({
                      elementId: Type.String(),
                    }),
                    success: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    model: Type.String(),
                    provider: Type.String(),
                    retries: Type.Number(),
                    timeout: Type.Number(),
                  }),
                  type: Type.Union([Type.Literal("model")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Record(
                    Type.String(),
                    Type.Object({
                      elementId: Type.String(),
                    }),
                  ),
                  type: Type.Union([Type.Literal("end")]),
                }),
              ]),
            ),
            gateway_id: Type.String(),
            id: Type.String(),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String(),
            version: Type.Object({
              active: Type.Union([Type.Literal("true"), Type.Literal("false")]),
              comment: Type.Optional(Type.Union([Type.String(), Type.Null()])),
              created_at: Type.String({ readOnly: true }),
              data: Type.String(),
              version_id: Type.String(),
            }),
          }),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          route: Type.Object({
            account_tag: Type.String(),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            elements: Type.Array(
              Type.Union([
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    next: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  type: Type.Union([Type.Literal("start")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    false: Type.Object({
                      elementId: Type.String(),
                    }),
                    true: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    conditions: Type.Optional(Type.Unknown()),
                  }),
                  type: Type.Union([Type.Literal("conditional")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Record(
                    Type.String(),
                    Type.Object({
                      elementId: Type.String(),
                    }),
                  ),
                  type: Type.Union([Type.Literal("percentage")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    fallback: Type.Object({
                      elementId: Type.String(),
                    }),
                    success: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    key: Type.String(),
                    limit: Type.Number(),
                    limitType: Type.Union([Type.Literal("count"), Type.Literal("cost")]),
                    window: Type.Number(),
                  }),
                  type: Type.Union([Type.Literal("rate")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    fallback: Type.Object({
                      elementId: Type.String(),
                    }),
                    success: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    model: Type.String(),
                    provider: Type.String(),
                    retries: Type.Number(),
                    timeout: Type.Number(),
                  }),
                  type: Type.Union([Type.Literal("model")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Record(
                    Type.String(),
                    Type.Object({
                      elementId: Type.String(),
                    }),
                  ),
                  type: Type.Union([Type.Literal("end")]),
                }),
              ]),
            ),
            gateway_id: Type.String(),
            id: Type.String(),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String(),
          }),
          success: Type.Boolean(),
        }),
      )
      .summary("Update an AI Gateway Dynamic Route.")
      .description("Update an AI Gateway Dynamic Route.")
      .operationId("aig-config-update-gateway-dynamic-route")
      .tag("AI Gateway Dynamic Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/gateways/{gateway_id}/routes/{id}", {
      params: Type.Object({ gateway_id: Type.String(), id: Type.String() }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_tag: Type.String(),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            elements: Type.Array(
              Type.Union([
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    next: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  type: Type.Union([Type.Literal("start")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    false: Type.Object({
                      elementId: Type.String(),
                    }),
                    true: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    conditions: Type.Optional(Type.Unknown()),
                  }),
                  type: Type.Union([Type.Literal("conditional")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Record(
                    Type.String(),
                    Type.Object({
                      elementId: Type.String(),
                    }),
                  ),
                  type: Type.Union([Type.Literal("percentage")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    fallback: Type.Object({
                      elementId: Type.String(),
                    }),
                    success: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    key: Type.String(),
                    limit: Type.Number(),
                    limitType: Type.Union([Type.Literal("count"), Type.Literal("cost")]),
                    window: Type.Number(),
                  }),
                  type: Type.Union([Type.Literal("rate")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    fallback: Type.Object({
                      elementId: Type.String(),
                    }),
                    success: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    model: Type.String(),
                    provider: Type.String(),
                    retries: Type.Number(),
                    timeout: Type.Number(),
                  }),
                  type: Type.Union([Type.Literal("model")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Record(
                    Type.String(),
                    Type.Object({
                      elementId: Type.String(),
                    }),
                  ),
                  type: Type.Union([Type.Literal("end")]),
                }),
              ]),
            ),
            gateway_id: Type.String(),
            id: Type.String(),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String(),
          }),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("Delete an AI Gateway Dynamic Route.")
      .description("Delete an AI Gateway Dynamic Route.")
      .operationId("aig-config-delete-gateway-dynamic-route")
      .tag("AI Gateway Dynamic Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways/{gateway_id}/routes/{id}/deployments", {
      params: Type.Object({ gateway_id: Type.String(), id: Type.String() }),
    })
      .response(
        Type.Object({
          data: Type.Object({
            deployments: Type.Array(
              Type.Object({
                comment: Type.Optional(Type.Union([Type.String(), Type.Null()])),
                created_at: Type.String({ readOnly: true }),
                deployment_id: Type.String(),
                version_id: Type.String(),
              }),
            ),
            order_by: Type.String(),
            order_by_direction: Type.String(),
            page: Type.Number(),
            per_page: Type.Number(),
          }),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("List all AI Gateway Dynamic Route Deployments.")
      .description("List all AI Gateway Dynamic Route Deployments.")
      .operationId("aig-config-list-gateway-dynamic-route-deployments")
      .tag("AI Gateway Dynamic Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/gateways/{gateway_id}/routes/{id}/deployments", {
      params: Type.Object({ gateway_id: Type.String(), id: Type.String() }),
      body: Type.Object({
        comment: Type.String(),
        version_id: Type.String(),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_tag: Type.String(),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            elements: Type.Array(
              Type.Union([
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    next: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  type: Type.Union([Type.Literal("start")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    false: Type.Object({
                      elementId: Type.String(),
                    }),
                    true: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    conditions: Type.Optional(Type.Unknown()),
                  }),
                  type: Type.Union([Type.Literal("conditional")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Record(
                    Type.String(),
                    Type.Object({
                      elementId: Type.String(),
                    }),
                  ),
                  type: Type.Union([Type.Literal("percentage")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    fallback: Type.Object({
                      elementId: Type.String(),
                    }),
                    success: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    key: Type.String(),
                    limit: Type.Number(),
                    limitType: Type.Union([Type.Literal("count"), Type.Literal("cost")]),
                    window: Type.Number(),
                  }),
                  type: Type.Union([Type.Literal("rate")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    fallback: Type.Object({
                      elementId: Type.String(),
                    }),
                    success: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    model: Type.String(),
                    provider: Type.String(),
                    retries: Type.Number(),
                    timeout: Type.Number(),
                  }),
                  type: Type.Union([Type.Literal("model")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Record(
                    Type.String(),
                    Type.Object({
                      elementId: Type.String(),
                    }),
                  ),
                  type: Type.Union([Type.Literal("end")]),
                }),
              ]),
            ),
            gateway_id: Type.String(),
            id: Type.String(),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String(),
          }),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("Create a new AI Gateway Dynamic Route Deployment.")
      .description("Create a new AI Gateway Dynamic Route Deployment.")
      .operationId("aig-config-post-gateway-dynamic-route-deployment")
      .tag("AI Gateway Dynamic Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways/{gateway_id}/routes/{id}/versions", {
      params: Type.Object({ gateway_id: Type.String(), id: Type.String() }),
    })
      .response(
        Type.Object({
          data: Type.Object({
            order_by: Type.String(),
            order_by_direction: Type.String(),
            page: Type.Number(),
            per_page: Type.Number(),
            versions: Type.Array(
              Type.Object({
                active: Type.Union([Type.Literal("true"), Type.Literal("false")]),
                comment: Type.Optional(Type.Union([Type.String(), Type.Null()])),
                created_at: Type.String({ readOnly: true }),
                data: Type.String(),
                version_id: Type.String(),
              }),
            ),
          }),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("List all AI Gateway Dynamic Route Versions.")
      .description("List all AI Gateway Dynamic Route Versions.")
      .operationId("aig-config-list-gateway-dynamic-route-versions")
      .tag("AI Gateway Dynamic Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/gateways/{gateway_id}/routes/{id}/versions", {
      params: Type.Object({ gateway_id: Type.String(), id: Type.String() }),
      body: Type.Object({
        comment: Type.String(),
        elements: Type.Array(
          Type.Union([
            Type.Object({
              id: Type.String(),
              outputs: Type.Object({
                next: Type.Object({
                  elementId: Type.String(),
                }),
              }),
              type: Type.Union([Type.Literal("start")]),
            }),
            Type.Object({
              id: Type.String(),
              outputs: Type.Object({
                false: Type.Object({
                  elementId: Type.String(),
                }),
                true: Type.Object({
                  elementId: Type.String(),
                }),
              }),
              properties: Type.Object({
                conditions: Type.Optional(Type.Unknown()),
              }),
              type: Type.Union([Type.Literal("conditional")]),
            }),
            Type.Object({
              id: Type.String(),
              outputs: Type.Record(
                Type.String(),
                Type.Object({
                  elementId: Type.String(),
                }),
              ),
              type: Type.Union([Type.Literal("percentage")]),
            }),
            Type.Object({
              id: Type.String(),
              outputs: Type.Object({
                fallback: Type.Object({
                  elementId: Type.String(),
                }),
                success: Type.Object({
                  elementId: Type.String(),
                }),
              }),
              properties: Type.Object({
                key: Type.String(),
                limit: Type.Number(),
                limitType: Type.Union([Type.Literal("count"), Type.Literal("cost")]),
                window: Type.Number(),
              }),
              type: Type.Union([Type.Literal("rate")]),
            }),
            Type.Object({
              id: Type.String(),
              outputs: Type.Object({
                fallback: Type.Object({
                  elementId: Type.String(),
                }),
                success: Type.Object({
                  elementId: Type.String(),
                }),
              }),
              properties: Type.Object({
                model: Type.String(),
                provider: Type.String(),
                retries: Type.Number(),
                timeout: Type.Number(),
              }),
              type: Type.Union([Type.Literal("model")]),
            }),
            Type.Object({
              id: Type.String(),
              outputs: Type.Record(
                Type.String(),
                Type.Object({
                  elementId: Type.String(),
                }),
              ),
              type: Type.Union([Type.Literal("end")]),
            }),
          ]),
        ),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_tag: Type.String(),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            elements: Type.Array(
              Type.Union([
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    next: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  type: Type.Union([Type.Literal("start")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    false: Type.Object({
                      elementId: Type.String(),
                    }),
                    true: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    conditions: Type.Optional(Type.Unknown()),
                  }),
                  type: Type.Union([Type.Literal("conditional")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Record(
                    Type.String(),
                    Type.Object({
                      elementId: Type.String(),
                    }),
                  ),
                  type: Type.Union([Type.Literal("percentage")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    fallback: Type.Object({
                      elementId: Type.String(),
                    }),
                    success: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    key: Type.String(),
                    limit: Type.Number(),
                    limitType: Type.Union([Type.Literal("count"), Type.Literal("cost")]),
                    window: Type.Number(),
                  }),
                  type: Type.Union([Type.Literal("rate")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    fallback: Type.Object({
                      elementId: Type.String(),
                    }),
                    success: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    model: Type.String(),
                    provider: Type.String(),
                    retries: Type.Number(),
                    timeout: Type.Number(),
                  }),
                  type: Type.Union([Type.Literal("model")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Record(
                    Type.String(),
                    Type.Object({
                      elementId: Type.String(),
                    }),
                  ),
                  type: Type.Union([Type.Literal("end")]),
                }),
              ]),
            ),
            gateway_id: Type.String(),
            id: Type.String(),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String(),
          }),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("Create a new AI Gateway Dynamic Route Version.")
      .description("Create a new AI Gateway Dynamic Route Version.")
      .operationId("aig-config-post-gateway-dynamic-route-version")
      .tag("AI Gateway Dynamic Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways/{gateway_id}/routes/{id}/versions/{version_id}", {
      params: Type.Object({ gateway_id: Type.String(), id: Type.String(), version_id: Type.String() }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_tag: Type.String(),
            active: Type.Union([Type.Literal("true"), Type.Literal("false")]),
            comment: Type.Optional(Type.Union([Type.String(), Type.Null()])),
            created_at: Type.String({ readOnly: true }),
            data: Type.String(),
            elements: Type.Array(
              Type.Union([
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    next: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  type: Type.Union([Type.Literal("start")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    false: Type.Object({
                      elementId: Type.String(),
                    }),
                    true: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    conditions: Type.Optional(Type.Unknown()),
                  }),
                  type: Type.Union([Type.Literal("conditional")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Record(
                    Type.String(),
                    Type.Object({
                      elementId: Type.String(),
                    }),
                  ),
                  type: Type.Union([Type.Literal("percentage")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    fallback: Type.Object({
                      elementId: Type.String(),
                    }),
                    success: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    key: Type.String(),
                    limit: Type.Number(),
                    limitType: Type.Union([Type.Literal("count"), Type.Literal("cost")]),
                    window: Type.Number(),
                  }),
                  type: Type.Union([Type.Literal("rate")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Object({
                    fallback: Type.Object({
                      elementId: Type.String(),
                    }),
                    success: Type.Object({
                      elementId: Type.String(),
                    }),
                  }),
                  properties: Type.Object({
                    model: Type.String(),
                    provider: Type.String(),
                    retries: Type.Number(),
                    timeout: Type.Number(),
                  }),
                  type: Type.Union([Type.Literal("model")]),
                }),
                Type.Object({
                  id: Type.String(),
                  outputs: Type.Record(
                    Type.String(),
                    Type.Object({
                      elementId: Type.String(),
                    }),
                  ),
                  type: Type.Union([Type.Literal("end")]),
                }),
              ]),
            ),
            gateway_id: Type.String(),
            id: Type.String(),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            name: Type.String(),
            version_id: Type.String(),
          }),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("Get an AI Gateway Dynamic Route Version.")
      .description("Get an AI Gateway Dynamic Route Version.")
      .operationId("aig-config-get-gateway-dynamic-route-version")
      .tag("AI Gateway Dynamic Routes")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways/{gateway_id}/url/{provider}", {
      params: Type.Object({
        gateway_id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
        provider: Type.String(),
      }),
    })
      .response(
        Type.Object({
          result: Type.String(),
          success: Type.Boolean(),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Array(
            Type.Object({
              message: Type.String(),
            }),
          ),
          result: Type.Unknown(),
          success: Type.Boolean(),
        }),
      )
      .summary("Get Gateway URL")
      .operationId("aig-config-get-gateway-url")
      .tag("AI Gateway Gateways")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.get("/gateways/{id}", {
      params: Type.Object({
        id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_id: Type.String(),
            account_tag: Type.String(),
            authentication: Type.Optional(Type.Boolean({ "x-auditable": true })),
            cache_invalidate_on_update: Type.Boolean({ "x-auditable": true }),
            cache_ttl: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
            collect_logs: Type.Boolean({ "x-auditable": true }),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            dlp: Type.Optional(
              Type.Union([
                Type.Object({
                  action: Type.Union([Type.Literal("BLOCK"), Type.Literal("FLAG")]),
                  enabled: Type.Boolean(),
                  profiles: Type.Array(Type.String()),
                }),
                Type.Object({
                  enabled: Type.Boolean(),
                  policies: Type.Array(
                    Type.Object({
                      action: Type.Union([Type.Literal("FLAG"), Type.Literal("BLOCK")]),
                      check: Type.Array(Type.Union([Type.Literal("REQUEST"), Type.Literal("RESPONSE")])),
                      enabled: Type.Boolean(),
                      id: Type.String(),
                      profiles: Type.Array(Type.String()),
                    }),
                  ),
                }),
              ]),
            ),
            id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
            internal_id: Type.String({ format: "uuid" }),
            log_management: Type.Optional(
              Type.Union([Type.Integer({ minimum: 10000, maximum: 10000000, "x-auditable": true }), Type.Null()]),
            ),
            log_management_strategy: Type.Optional(
              Type.Union([Type.Literal("STOP_INSERTING"), Type.Literal("DELETE_OLDEST")], { "x-auditable": true }),
            ),
            logpush: Type.Optional(Type.Boolean({ "x-auditable": true })),
            logpush_public_key: Type.Optional(
              Type.Union([Type.String({ minLength: 16, maxLength: 1024, "x-auditable": true }), Type.Null()]),
            ),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            otel: Type.Optional(
              Type.Union([
                Type.Array(
                  Type.Object({
                    authorization: Type.String(),
                    headers: Type.Record(Type.String(), Type.String()),
                    url: Type.String(),
                  }),
                  { "x-auditable": true },
                ),
                Type.Null(),
              ]),
            ),
            rate_limiting_interval: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
            rate_limiting_limit: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
            rate_limiting_technique: Type.Union([Type.Literal("fixed"), Type.Literal("sliding")], {
              "x-auditable": true,
            }),
            store_id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
            stripe: Type.Optional(
              Type.Union([
                Type.Object(
                  {
                    authorization: Type.String(),
                    usage_events: Type.Array(
                      Type.Object({
                        payload: Type.String(),
                      }),
                    ),
                  },
                  { "x-auditable": true },
                ),
                Type.Null(),
              ]),
            ),
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
          success: Type.Boolean(),
        }),
      )
      .summary("Fetch a Gateway")
      .operationId("aig-config-fetch-gateway")
      .tag("AI Gateway Gateways")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write", "AI Gateway Read"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.put("/gateways/{id}", {
      params: Type.Object({
        id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
      }),
      body: Type.Object({
        authentication: Type.Optional(Type.Boolean({ "x-auditable": true })),
        cache_invalidate_on_update: Type.Boolean({ "x-auditable": true }),
        cache_ttl: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
        collect_logs: Type.Boolean({ "x-auditable": true }),
        dlp: Type.Optional(
          Type.Union([
            Type.Object({
              action: Type.Union([Type.Literal("BLOCK"), Type.Literal("FLAG")]),
              enabled: Type.Boolean(),
              profiles: Type.Array(Type.String()),
            }),
            Type.Object({
              enabled: Type.Boolean(),
              policies: Type.Array(
                Type.Object({
                  action: Type.Union([Type.Literal("FLAG"), Type.Literal("BLOCK")]),
                  check: Type.Array(Type.Union([Type.Literal("REQUEST"), Type.Literal("RESPONSE")])),
                  enabled: Type.Boolean(),
                  id: Type.String(),
                  profiles: Type.Array(Type.String()),
                }),
              ),
            }),
          ]),
        ),
        log_management: Type.Optional(
          Type.Union([Type.Integer({ minimum: 10000, maximum: 10000000, "x-auditable": true }), Type.Null()]),
        ),
        log_management_strategy: Type.Optional(
          Type.Union([Type.Literal("STOP_INSERTING"), Type.Literal("DELETE_OLDEST")], { "x-auditable": true }),
        ),
        logpush: Type.Optional(Type.Boolean({ "x-auditable": true })),
        logpush_public_key: Type.Optional(
          Type.Union([Type.String({ minLength: 16, maxLength: 1024, "x-auditable": true }), Type.Null()]),
        ),
        otel: Type.Optional(
          Type.Union([
            Type.Array(
              Type.Object({
                authorization: Type.String(),
                headers: Type.Record(Type.String(), Type.String()),
                url: Type.String(),
              }),
              { "x-auditable": true },
            ),
            Type.Null(),
          ]),
        ),
        rate_limiting_interval: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
        rate_limiting_limit: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
        rate_limiting_technique: Type.Union([Type.Literal("fixed"), Type.Literal("sliding")], { "x-auditable": true }),
        store_id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        stripe: Type.Optional(
          Type.Union([
            Type.Object(
              {
                authorization: Type.String(),
                usage_events: Type.Array(
                  Type.Object({
                    payload: Type.String(),
                  }),
                ),
              },
              { "x-auditable": true },
            ),
            Type.Null(),
          ]),
        ),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_id: Type.String(),
            account_tag: Type.String(),
            authentication: Type.Optional(Type.Boolean({ "x-auditable": true })),
            cache_invalidate_on_update: Type.Boolean({ "x-auditable": true }),
            cache_ttl: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
            collect_logs: Type.Boolean({ "x-auditable": true }),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            dlp: Type.Optional(
              Type.Union([
                Type.Object({
                  action: Type.Union([Type.Literal("BLOCK"), Type.Literal("FLAG")]),
                  enabled: Type.Boolean(),
                  profiles: Type.Array(Type.String()),
                }),
                Type.Object({
                  enabled: Type.Boolean(),
                  policies: Type.Array(
                    Type.Object({
                      action: Type.Union([Type.Literal("FLAG"), Type.Literal("BLOCK")]),
                      check: Type.Array(Type.Union([Type.Literal("REQUEST"), Type.Literal("RESPONSE")])),
                      enabled: Type.Boolean(),
                      id: Type.String(),
                      profiles: Type.Array(Type.String()),
                    }),
                  ),
                }),
              ]),
            ),
            id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
            internal_id: Type.String({ format: "uuid" }),
            log_management: Type.Optional(
              Type.Union([Type.Integer({ minimum: 10000, maximum: 10000000, "x-auditable": true }), Type.Null()]),
            ),
            log_management_strategy: Type.Optional(
              Type.Union([Type.Literal("STOP_INSERTING"), Type.Literal("DELETE_OLDEST")], { "x-auditable": true }),
            ),
            logpush: Type.Optional(Type.Boolean({ "x-auditable": true })),
            logpush_public_key: Type.Optional(
              Type.Union([Type.String({ minLength: 16, maxLength: 1024, "x-auditable": true }), Type.Null()]),
            ),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            otel: Type.Optional(
              Type.Union([
                Type.Array(
                  Type.Object({
                    authorization: Type.String(),
                    headers: Type.Record(Type.String(), Type.String()),
                    url: Type.String(),
                  }),
                  { "x-auditable": true },
                ),
                Type.Null(),
              ]),
            ),
            rate_limiting_interval: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
            rate_limiting_limit: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
            rate_limiting_technique: Type.Union([Type.Literal("fixed"), Type.Literal("sliding")], {
              "x-auditable": true,
            }),
            store_id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
            stripe: Type.Optional(
              Type.Union([
                Type.Object(
                  {
                    authorization: Type.String(),
                    usage_events: Type.Array(
                      Type.Object({
                        payload: Type.String(),
                      }),
                    ),
                  },
                  { "x-auditable": true },
                ),
                Type.Null(),
              ]),
            ),
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
              path: Type.Array(Type.String()),
            }),
          ),
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
          success: Type.Boolean(),
        }),
      )
      .summary("Update a Gateway")
      .operationId("aig-config-update-gateway")
      .tag("AI Gateway Gateways")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.delete("/gateways/{id}", {
      params: Type.Object({
        id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
      }),
    })
      .response(
        Type.Object({
          result: Type.Object({
            account_id: Type.String(),
            account_tag: Type.String(),
            authentication: Type.Optional(Type.Boolean({ "x-auditable": true })),
            cache_invalidate_on_update: Type.Boolean({ "x-auditable": true }),
            cache_ttl: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
            collect_logs: Type.Boolean({ "x-auditable": true }),
            created_at: Type.String({ format: "date-time", readOnly: true }),
            dlp: Type.Optional(
              Type.Union([
                Type.Object({
                  action: Type.Union([Type.Literal("BLOCK"), Type.Literal("FLAG")]),
                  enabled: Type.Boolean(),
                  profiles: Type.Array(Type.String()),
                }),
                Type.Object({
                  enabled: Type.Boolean(),
                  policies: Type.Array(
                    Type.Object({
                      action: Type.Union([Type.Literal("FLAG"), Type.Literal("BLOCK")]),
                      check: Type.Array(Type.Union([Type.Literal("REQUEST"), Type.Literal("RESPONSE")])),
                      enabled: Type.Boolean(),
                      id: Type.String(),
                      profiles: Type.Array(Type.String()),
                    }),
                  ),
                }),
              ]),
            ),
            id: Type.String({ description: "gateway id", minLength: 1, maxLength: 64, "x-auditable": true }),
            internal_id: Type.String({ format: "uuid" }),
            log_management: Type.Optional(
              Type.Union([Type.Integer({ minimum: 10000, maximum: 10000000, "x-auditable": true }), Type.Null()]),
            ),
            log_management_strategy: Type.Optional(
              Type.Union([Type.Literal("STOP_INSERTING"), Type.Literal("DELETE_OLDEST")], { "x-auditable": true }),
            ),
            logpush: Type.Optional(Type.Boolean({ "x-auditable": true })),
            logpush_public_key: Type.Optional(
              Type.Union([Type.String({ minLength: 16, maxLength: 1024, "x-auditable": true }), Type.Null()]),
            ),
            modified_at: Type.String({ format: "date-time", readOnly: true }),
            otel: Type.Optional(
              Type.Union([
                Type.Array(
                  Type.Object({
                    authorization: Type.String(),
                    headers: Type.Record(Type.String(), Type.String()),
                    url: Type.String(),
                  }),
                  { "x-auditable": true },
                ),
                Type.Null(),
              ]),
            ),
            rate_limiting_interval: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
            rate_limiting_limit: Type.Union([Type.Integer({ minimum: 0, "x-auditable": true }), Type.Null()]),
            rate_limiting_technique: Type.Union([Type.Literal("fixed"), Type.Literal("sliding")], {
              "x-auditable": true,
            }),
            store_id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
            stripe: Type.Optional(
              Type.Union([
                Type.Object(
                  {
                    authorization: Type.String(),
                    usage_events: Type.Array(
                      Type.Object({
                        payload: Type.String(),
                      }),
                    ),
                  },
                  { "x-auditable": true },
                ),
                Type.Null(),
              ]),
            ),
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
          success: Type.Boolean(),
        }),
      )
      .summary("Delete a Gateway")
      .operationId("aig-config-delete-gateway")
      .tag("AI Gateway Gateways")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["AI Gateway Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.aig"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}

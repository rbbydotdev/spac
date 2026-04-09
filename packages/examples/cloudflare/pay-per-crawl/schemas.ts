import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const PayPerCrawlBotaccessmode = named(
  "pay-per-crawl_BotAccessMode",
  Type.Union([Type.Literal("charge"), Type.Literal("bypass")]),
)

export const PayPerCrawlDaricconfig = named(
  "pay-per-crawl_DaricConfig",
  Type.Object({
    bot_overrides: Type.Optional(Type.Record(Type.String(), PayPerCrawlBotaccessmode)),
    enabled: Type.Optional(Type.Boolean()),
    price_usd_microcents: Type.Optional(Type.Integer()),
  }),
)

export const PayPerCrawlSource = named(
  "pay-per-crawl_Source",
  Type.Object({
    parameter: Type.Optional(
      Type.String({ description: "Parameter is a string indicating which URI query parameter caused the error." }),
    ),
    parameter_value_index: Type.Optional(
      Type.Integer({
        description:
          "ParameterPosition indicates position of parameter value which caused the error,\nfor cases when there are multiple values for the same parameter.",
      }),
    ),
    pointer: Type.Optional(
      Type.Array(Type.String(), {
        description:
          'Pointer is a JSON Pointer [RFC6901] to the associated entity in the request document\ne.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute.',
      }),
    ),
  }),
)

export const PayPerCrawlMsg = named(
  "pay-per-crawl_Msg",
  Type.Recursive((This) =>
    Type.Object({
      code: Type.Optional(Type.Integer()),
      documentation_url: Type.Optional(Type.String()),
      error_chain: Type.Optional(Type.Array(This)),
      message: Type.Optional(Type.String()),
      meta: Type.Optional(
        Type.Unknown({
          description:
            "Meta object containing non-standard meta-information about the error.\nThis field must be an object or null!",
        }),
      ),
      source: Type.Optional(PayPerCrawlSource),
    }),
  ),
)

export const PayPerCrawlResultinfo = named(
  "pay-per-crawl_ResultInfo",
  Type.Object({
    count: Type.Optional(Type.Integer()),
    page: Type.Optional(Type.Integer()),
    per_page: Type.Optional(Type.Integer()),
    total_count: Type.Optional(Type.Integer()),
    total_pages: Type.Optional(
      Type.Integer({
        description:
          "TotalPages is a pointer so that if TotalPages == 0 we return that there\nare indeed 0 pages. omitempty would have removed the field otherwise.\nThis is important as a customer may be relying on always reading this\nproperty and it should not be absent just because it is 0, only absent\nif a value is never provided.",
      }),
    ),
  }),
)

export const PayPerCrawlGetconfigresponse = named(
  "pay-per-crawl_getConfigResponse",
  Type.Object({
    errors: Type.Optional(Type.Array(PayPerCrawlMsg)),
    messages: Type.Optional(Type.Array(PayPerCrawlMsg)),
    result: Type.Optional(PayPerCrawlDaricconfig),
    result_info: Type.Optional(PayPerCrawlResultinfo),
    success: Type.Optional(Type.Boolean()),
  }),
)

export const PayPerCrawlDariczonecanbeenabled = named(
  "pay-per-crawl_DaricZoneCanBeEnabled",
  Type.Object({
    can_be_enabled: Type.Optional(Type.Boolean()),
    id: Type.Optional(Type.String()),
  }),
)

export const PayPerCrawlZonescanbeenabledpayload = named(
  "pay-per-crawl_ZonesCanBeEnabledPayload",
  Type.Object({
    zones: Type.Optional(Type.Array(PayPerCrawlDariczonecanbeenabled)),
  }),
)

export const PayPerCrawlQueryzonescanbeenabledresponse = named(
  "pay-per-crawl_queryZonesCanBeEnabledResponse",
  Type.Object({
    errors: Type.Optional(Type.Array(PayPerCrawlMsg)),
    messages: Type.Optional(Type.Array(PayPerCrawlMsg)),
    result: Type.Optional(PayPerCrawlZonescanbeenabledpayload),
    result_info: Type.Optional(PayPerCrawlResultinfo),
    success: Type.Optional(Type.Boolean()),
  }),
)

export const PayPerCrawlApinoresultresponse = named(
  "pay-per-crawl_apiNoResultResponse",
  Type.Object({
    errors: Type.Optional(Type.Array(PayPerCrawlMsg)),
    messages: Type.Optional(Type.Array(PayPerCrawlMsg)),
    result_info: Type.Optional(PayPerCrawlResultinfo),
    success: Type.Optional(Type.Boolean()),
  }),
)

export const PayPerCrawlStripeconnectresp = named(
  "pay-per-crawl_StripeConnectResp",
  Type.Object({
    url: Type.Optional(Type.String()),
  }),
)

export const PayPerCrawlCreatestripeconfigresponse = named(
  "pay-per-crawl_createStripeConfigResponse",
  Type.Object({
    errors: Type.Optional(Type.Array(PayPerCrawlMsg)),
    messages: Type.Optional(Type.Array(PayPerCrawlMsg)),
    result: Type.Optional(PayPerCrawlStripeconnectresp),
    result_info: Type.Optional(PayPerCrawlResultinfo),
    success: Type.Optional(Type.Boolean()),
  }),
)

export const PayPerCrawlErrorsource = named(
  "pay-per-crawl_ErrorSource",
  Type.Object({
    pointer: Type.Optional(Type.String()),
  }),
)

export const PayPerCrawlResterror = named(
  "pay-per-crawl_RESTError",
  Type.Object({
    code: Type.Optional(Type.Integer()),
    documentation_url: Type.Optional(Type.String()),
    error: Type.Optional(Type.String()),
    source: Type.Optional(PayPerCrawlErrorsource),
  }),
)

export const PayPerCrawlApierrorresponse = named(
  "pay-per-crawl_apiErrorResponse",
  Type.Object({
    errors: Type.Optional(Type.Array(PayPerCrawlResterror)),
    result: Type.Optional(Type.Unknown()),
    success: Type.Optional(Type.Boolean()),
  }),
)

export const PayPerCrawlStripeconnection = named(
  "pay-per-crawl_StripeConnection",
  Type.Object({
    connect_status: Type.Optional(Type.String()),
    stripe_account_id: Type.Optional(Type.String()),
  }),
)

export const PayPerCrawlGetstripeconfigresponse = named(
  "pay-per-crawl_getStripeConfigResponse",
  Type.Object({
    errors: Type.Optional(Type.Array(PayPerCrawlMsg)),
    messages: Type.Optional(Type.Array(PayPerCrawlMsg)),
    result: Type.Optional(PayPerCrawlStripeconnection),
    result_info: Type.Optional(PayPerCrawlResultinfo),
    success: Type.Optional(Type.Boolean()),
  }),
)

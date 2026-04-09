import { Type } from "@sinclair/typebox"
import type { Api } from "spac"

export function registerBrowserRendering(api: Api) {
  api.assertVersion("3.0.3", "BrowserRendering")

  api.group("/accounts/{account_id}/browser-rendering", { params: Type.Object({ account_id: Type.String() }) }, (g) => {
    g.post("/content", {
      query: Type.Object({
        cacheTTL: Type.Optional(
          Type.Number({ description: "Cache TTL default is 5s. Set to 0 to disable.", default: 5, maximum: 86400 }),
        ),
      }),
      body: Type.Object({
        actionTimeout: Type.Optional(
          Type.Number({
            description:
              "The maximum duration allowed for the browser action to complete after the page has loaded (such as taking screenshots, extracting content, or generating PDFs). If this time limit is exceeded, the action stops and returns a timeout error.",
            maximum: 300000,
          }),
        ),
        addScriptTag: Type.Optional(
          Type.Array(
            Type.Object({
              content: Type.Optional(Type.String()),
              id: Type.Optional(Type.String()),
              type: Type.Optional(Type.String()),
              url: Type.Optional(Type.String()),
            }),
            { description: "Adds a `<script>` tag into the page with the desired URL or content." },
          ),
        ),
        addStyleTag: Type.Optional(
          Type.Array(
            Type.Object({
              content: Type.Optional(Type.String()),
              url: Type.Optional(Type.String()),
            }),
            {
              description:
                'Adds a `<link rel="stylesheet">` tag into the page with the desired URL or a `<style type="text/css">` tag with the content.',
            },
          ),
        ),
        allowRequestPattern: Type.Optional(
          Type.Array(Type.String(), {
            description: "Only allow requests that match the provided regex patterns, eg. '/^.*\\.(css)'.",
          }),
        ),
        allowResourceTypes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Union([Type.Literal("document")]),
              Type.Union([Type.Literal("stylesheet")]),
              Type.Union([Type.Literal("image")]),
              Type.Union([Type.Literal("media")]),
              Type.Union([Type.Literal("font")]),
              Type.Union([Type.Literal("script")]),
              Type.Union([Type.Literal("texttrack")]),
              Type.Union([Type.Literal("xhr")]),
              Type.Union([Type.Literal("fetch")]),
              Type.Union([Type.Literal("prefetch")]),
              Type.Union([Type.Literal("eventsource")]),
              Type.Union([Type.Literal("websocket")]),
              Type.Union([Type.Literal("manifest")]),
              Type.Union([Type.Literal("signedexchange")]),
              Type.Union([Type.Literal("ping")]),
              Type.Union([Type.Literal("cspviolationreport")]),
              Type.Union([Type.Literal("preflight")]),
              Type.Union([Type.Literal("other")]),
            ]),
            { description: "Only allow requests that match the provided resource types, eg. 'image' or 'script'." },
          ),
        ),
        authenticate: Type.Optional(
          Type.Object(
            {
              password: Type.String({ minLength: 1, "x-sensitive": true }),
              username: Type.String({ minLength: 1 }),
            },
            { description: "Provide credentials for HTTP authentication." },
          ),
        ),
        bestAttempt: Type.Optional(
          Type.Boolean({ description: "Attempt to proceed when 'awaited' events fail or timeout." }),
        ),
        cookies: Type.Optional(
          Type.Array(
            Type.Object({
              domain: Type.Optional(Type.String()),
              expires: Type.Optional(Type.Number()),
              httpOnly: Type.Optional(Type.Boolean()),
              name: Type.String(),
              partitionKey: Type.Optional(Type.String()),
              path: Type.Optional(Type.String()),
              priority: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Low")]),
                  Type.Union([Type.Literal("Medium")]),
                  Type.Union([Type.Literal("High")]),
                ]),
              ),
              sameParty: Type.Optional(Type.Boolean()),
              sameSite: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Strict")]),
                  Type.Union([Type.Literal("Lax")]),
                  Type.Union([Type.Literal("None")]),
                ]),
              ),
              secure: Type.Optional(Type.Boolean()),
              sourcePort: Type.Optional(Type.Number()),
              sourceScheme: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Unset")]),
                  Type.Union([Type.Literal("NonSecure")]),
                  Type.Union([Type.Literal("Secure")]),
                ]),
              ),
              url: Type.Optional(Type.String()),
              value: Type.String(),
            }),
            { description: "Check [options](https://pptr.dev/api/puppeteer.page.setcookie)." },
          ),
        ),
        emulateMediaType: Type.Optional(Type.String()),
        gotoOptions: Type.Optional(
          Type.Object(
            {
              referer: Type.Optional(Type.String()),
              referrerPolicy: Type.Optional(Type.String()),
              timeout: Type.Optional(Type.Number({ default: 30000, maximum: 60000 })),
              waitUntil: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("load")]),
                  Type.Union([Type.Literal("domcontentloaded")]),
                  Type.Union([Type.Literal("networkidle0")]),
                  Type.Union([Type.Literal("networkidle2")]),
                  Type.Array(
                    Type.Union([
                      Type.Union([Type.Literal("load")]),
                      Type.Union([Type.Literal("domcontentloaded")]),
                      Type.Union([Type.Literal("networkidle0")]),
                      Type.Union([Type.Literal("networkidle2")]),
                    ]),
                  ),
                ]),
              ),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.gotooptions)." },
          ),
        ),
        html: Type.Optional(
          Type.String({
            description:
              "Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.",
            minLength: 1,
          }),
        ),
        rejectRequestPattern: Type.Optional(
          Type.Array(Type.String(), {
            description: "Block undesired requests that match the provided regex patterns, eg. '/^.*\\.(css)'.",
          }),
        ),
        rejectResourceTypes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Union([Type.Literal("document")]),
              Type.Union([Type.Literal("stylesheet")]),
              Type.Union([Type.Literal("image")]),
              Type.Union([Type.Literal("media")]),
              Type.Union([Type.Literal("font")]),
              Type.Union([Type.Literal("script")]),
              Type.Union([Type.Literal("texttrack")]),
              Type.Union([Type.Literal("xhr")]),
              Type.Union([Type.Literal("fetch")]),
              Type.Union([Type.Literal("prefetch")]),
              Type.Union([Type.Literal("eventsource")]),
              Type.Union([Type.Literal("websocket")]),
              Type.Union([Type.Literal("manifest")]),
              Type.Union([Type.Literal("signedexchange")]),
              Type.Union([Type.Literal("ping")]),
              Type.Union([Type.Literal("cspviolationreport")]),
              Type.Union([Type.Literal("preflight")]),
              Type.Union([Type.Literal("other")]),
            ]),
            {
              description: "Block undesired requests that match the provided resource types, eg. 'image' or 'script'.",
            },
          ),
        ),
        setExtraHTTPHeaders: Type.Optional(Type.Record(Type.String(), Type.String())),
        setJavaScriptEnabled: Type.Optional(Type.Boolean()),
        url: Type.Optional(
          Type.String({ description: "URL to navigate to, eg. `https://example.com`.", format: "uri" }),
        ),
        userAgent: Type.Optional(
          Type.String({
            default:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
          }),
        ),
        viewport: Type.Optional(
          Type.Object(
            {
              deviceScaleFactor: Type.Optional(Type.Number()),
              hasTouch: Type.Optional(Type.Boolean()),
              height: Type.Number(),
              isLandscape: Type.Optional(Type.Boolean()),
              isMobile: Type.Optional(Type.Boolean()),
              width: Type.Number(),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.page.setviewport)." },
          ),
        ),
        waitForSelector: Type.Optional(
          Type.Object(
            {
              hidden: Type.Optional(Type.Union([Type.Literal(true)])),
              selector: Type.String(),
              timeout: Type.Optional(Type.Number({ maximum: 60000 })),
              visible: Type.Optional(Type.Union([Type.Literal(true)])),
            },
            {
              description:
                "Wait for the selector to appear in page. Check [options](https://pptr.dev/api/puppeteer.page.waitforselector).",
            },
          ),
        ),
        waitForTimeout: Type.Optional(
          Type.Number({ description: "Waits for a specified timeout before continuing.", maximum: 60000 }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          meta: Type.Object({
            status: Type.Number(),
            title: Type.String(),
          }),
          result: Type.Optional(Type.String({ description: "HTML content" })),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        422,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        500,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .summary("Get HTML content.")
      .description(
        "Fetches rendered HTML content from provided URL or HTML. Check available options like `gotoOptions` and `waitFor*` to control page load behaviour.",
      )
      .operationId("brapi-post_Content")
      .tag("brapi")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Browser Rendering Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.brapi.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/json", {
      query: Type.Object({
        cacheTTL: Type.Optional(
          Type.Number({ description: "Cache TTL default is 5s. Set to 0 to disable.", default: 5, maximum: 86400 }),
        ),
      }),
      body: Type.Object({
        actionTimeout: Type.Optional(
          Type.Number({
            description:
              "The maximum duration allowed for the browser action to complete after the page has loaded (such as taking screenshots, extracting content, or generating PDFs). If this time limit is exceeded, the action stops and returns a timeout error.",
            maximum: 300000,
          }),
        ),
        addScriptTag: Type.Optional(
          Type.Array(
            Type.Object({
              content: Type.Optional(Type.String()),
              id: Type.Optional(Type.String()),
              type: Type.Optional(Type.String()),
              url: Type.Optional(Type.String()),
            }),
            { description: "Adds a `<script>` tag into the page with the desired URL or content." },
          ),
        ),
        addStyleTag: Type.Optional(
          Type.Array(
            Type.Object({
              content: Type.Optional(Type.String()),
              url: Type.Optional(Type.String()),
            }),
            {
              description:
                'Adds a `<link rel="stylesheet">` tag into the page with the desired URL or a `<style type="text/css">` tag with the content.',
            },
          ),
        ),
        allowRequestPattern: Type.Optional(
          Type.Array(Type.String(), {
            description: "Only allow requests that match the provided regex patterns, eg. '/^.*\\.(css)'.",
          }),
        ),
        allowResourceTypes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Union([Type.Literal("document")]),
              Type.Union([Type.Literal("stylesheet")]),
              Type.Union([Type.Literal("image")]),
              Type.Union([Type.Literal("media")]),
              Type.Union([Type.Literal("font")]),
              Type.Union([Type.Literal("script")]),
              Type.Union([Type.Literal("texttrack")]),
              Type.Union([Type.Literal("xhr")]),
              Type.Union([Type.Literal("fetch")]),
              Type.Union([Type.Literal("prefetch")]),
              Type.Union([Type.Literal("eventsource")]),
              Type.Union([Type.Literal("websocket")]),
              Type.Union([Type.Literal("manifest")]),
              Type.Union([Type.Literal("signedexchange")]),
              Type.Union([Type.Literal("ping")]),
              Type.Union([Type.Literal("cspviolationreport")]),
              Type.Union([Type.Literal("preflight")]),
              Type.Union([Type.Literal("other")]),
            ]),
            { description: "Only allow requests that match the provided resource types, eg. 'image' or 'script'." },
          ),
        ),
        authenticate: Type.Optional(
          Type.Object(
            {
              password: Type.String({ minLength: 1, "x-sensitive": true }),
              username: Type.String({ minLength: 1 }),
            },
            { description: "Provide credentials for HTTP authentication." },
          ),
        ),
        bestAttempt: Type.Optional(
          Type.Boolean({ description: "Attempt to proceed when 'awaited' events fail or timeout." }),
        ),
        cookies: Type.Optional(
          Type.Array(
            Type.Object({
              domain: Type.Optional(Type.String()),
              expires: Type.Optional(Type.Number()),
              httpOnly: Type.Optional(Type.Boolean()),
              name: Type.String(),
              partitionKey: Type.Optional(Type.String()),
              path: Type.Optional(Type.String()),
              priority: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Low")]),
                  Type.Union([Type.Literal("Medium")]),
                  Type.Union([Type.Literal("High")]),
                ]),
              ),
              sameParty: Type.Optional(Type.Boolean()),
              sameSite: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Strict")]),
                  Type.Union([Type.Literal("Lax")]),
                  Type.Union([Type.Literal("None")]),
                ]),
              ),
              secure: Type.Optional(Type.Boolean()),
              sourcePort: Type.Optional(Type.Number()),
              sourceScheme: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Unset")]),
                  Type.Union([Type.Literal("NonSecure")]),
                  Type.Union([Type.Literal("Secure")]),
                ]),
              ),
              url: Type.Optional(Type.String()),
              value: Type.String(),
            }),
            { description: "Check [options](https://pptr.dev/api/puppeteer.page.setcookie)." },
          ),
        ),
        custom_ai: Type.Optional(
          Type.Array(
            Type.Object({
              authorization: Type.String({ description: "Authorization token for the AI model: `Bearer <token>`." }),
              model: Type.String({
                description:
                  "AI model to use for the request. Must be formed as `<provider>/<model_name>`, e.g. `workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast`",
              }),
            }),
            {
              description:
                "Optional list of custom AI models to use for the request. The models will be tried in the order provided, and in case a model returns an error, the next one will be used as fallback.",
            },
          ),
        ),
        emulateMediaType: Type.Optional(Type.String()),
        gotoOptions: Type.Optional(
          Type.Object(
            {
              referer: Type.Optional(Type.String()),
              referrerPolicy: Type.Optional(Type.String()),
              timeout: Type.Optional(Type.Number({ default: 30000, maximum: 60000 })),
              waitUntil: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("load")]),
                  Type.Union([Type.Literal("domcontentloaded")]),
                  Type.Union([Type.Literal("networkidle0")]),
                  Type.Union([Type.Literal("networkidle2")]),
                  Type.Array(
                    Type.Union([
                      Type.Union([Type.Literal("load")]),
                      Type.Union([Type.Literal("domcontentloaded")]),
                      Type.Union([Type.Literal("networkidle0")]),
                      Type.Union([Type.Literal("networkidle2")]),
                    ]),
                  ),
                ]),
              ),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.gotooptions)." },
          ),
        ),
        html: Type.Optional(
          Type.String({
            description:
              "Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.",
            minLength: 1,
          }),
        ),
        prompt: Type.Optional(Type.String()),
        rejectRequestPattern: Type.Optional(
          Type.Array(Type.String(), {
            description: "Block undesired requests that match the provided regex patterns, eg. '/^.*\\.(css)'.",
          }),
        ),
        rejectResourceTypes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Union([Type.Literal("document")]),
              Type.Union([Type.Literal("stylesheet")]),
              Type.Union([Type.Literal("image")]),
              Type.Union([Type.Literal("media")]),
              Type.Union([Type.Literal("font")]),
              Type.Union([Type.Literal("script")]),
              Type.Union([Type.Literal("texttrack")]),
              Type.Union([Type.Literal("xhr")]),
              Type.Union([Type.Literal("fetch")]),
              Type.Union([Type.Literal("prefetch")]),
              Type.Union([Type.Literal("eventsource")]),
              Type.Union([Type.Literal("websocket")]),
              Type.Union([Type.Literal("manifest")]),
              Type.Union([Type.Literal("signedexchange")]),
              Type.Union([Type.Literal("ping")]),
              Type.Union([Type.Literal("cspviolationreport")]),
              Type.Union([Type.Literal("preflight")]),
              Type.Union([Type.Literal("other")]),
            ]),
            {
              description: "Block undesired requests that match the provided resource types, eg. 'image' or 'script'.",
            },
          ),
        ),
        response_format: Type.Optional(
          Type.Object({
            json_schema: Type.Optional(
              Type.Union([
                Type.Record(
                  Type.String(),
                  Type.Union([Type.String(), Type.Number(), Type.Boolean(), Type.Unknown(), Type.Array(Type.String())]),
                ),
                Type.Null(),
              ]),
            ),
            type: Type.String(),
          }),
        ),
        setExtraHTTPHeaders: Type.Optional(Type.Record(Type.String(), Type.String())),
        setJavaScriptEnabled: Type.Optional(Type.Boolean()),
        url: Type.Optional(
          Type.String({ description: "URL to navigate to, eg. `https://example.com`.", format: "uri" }),
        ),
        userAgent: Type.Optional(
          Type.String({
            default:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
          }),
        ),
        viewport: Type.Optional(
          Type.Object(
            {
              deviceScaleFactor: Type.Optional(Type.Number()),
              hasTouch: Type.Optional(Type.Boolean()),
              height: Type.Number(),
              isLandscape: Type.Optional(Type.Boolean()),
              isMobile: Type.Optional(Type.Boolean()),
              width: Type.Number(),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.page.setviewport)." },
          ),
        ),
        waitForSelector: Type.Optional(
          Type.Object(
            {
              hidden: Type.Optional(Type.Union([Type.Literal(true)])),
              selector: Type.String(),
              timeout: Type.Optional(Type.Number({ maximum: 60000 })),
              visible: Type.Optional(Type.Union([Type.Literal(true)])),
            },
            {
              description:
                "Wait for the selector to appear in page. Check [options](https://pptr.dev/api/puppeteer.page.waitforselector).",
            },
          ),
        ),
        waitForTimeout: Type.Optional(
          Type.Number({ description: "Waits for a specified timeout before continuing.", maximum: 60000 }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          result: Type.Record(Type.String(), Type.Union([Type.Unknown(), Type.Null()])),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        422,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        500,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .summary("Get json.")
      .description(
        "Gets json from a webpage from a provided URL or HTML. Pass `prompt` or `schema` in the body. Control page loading with `gotoOptions` and `waitFor*` options.",
      )
      .operationId("brapi-post_Json")
      .tag("brapi")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Browser Rendering Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.brapi.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/links", {
      query: Type.Object({
        cacheTTL: Type.Optional(
          Type.Number({ description: "Cache TTL default is 5s. Set to 0 to disable.", default: 5, maximum: 86400 }),
        ),
      }),
      body: Type.Object({
        actionTimeout: Type.Optional(
          Type.Number({
            description:
              "The maximum duration allowed for the browser action to complete after the page has loaded (such as taking screenshots, extracting content, or generating PDFs). If this time limit is exceeded, the action stops and returns a timeout error.",
            maximum: 300000,
          }),
        ),
        addScriptTag: Type.Optional(
          Type.Array(
            Type.Object({
              content: Type.Optional(Type.String()),
              id: Type.Optional(Type.String()),
              type: Type.Optional(Type.String()),
              url: Type.Optional(Type.String()),
            }),
            { description: "Adds a `<script>` tag into the page with the desired URL or content." },
          ),
        ),
        addStyleTag: Type.Optional(
          Type.Array(
            Type.Object({
              content: Type.Optional(Type.String()),
              url: Type.Optional(Type.String()),
            }),
            {
              description:
                'Adds a `<link rel="stylesheet">` tag into the page with the desired URL or a `<style type="text/css">` tag with the content.',
            },
          ),
        ),
        allowRequestPattern: Type.Optional(
          Type.Array(Type.String(), {
            description: "Only allow requests that match the provided regex patterns, eg. '/^.*\\.(css)'.",
          }),
        ),
        allowResourceTypes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Union([Type.Literal("document")]),
              Type.Union([Type.Literal("stylesheet")]),
              Type.Union([Type.Literal("image")]),
              Type.Union([Type.Literal("media")]),
              Type.Union([Type.Literal("font")]),
              Type.Union([Type.Literal("script")]),
              Type.Union([Type.Literal("texttrack")]),
              Type.Union([Type.Literal("xhr")]),
              Type.Union([Type.Literal("fetch")]),
              Type.Union([Type.Literal("prefetch")]),
              Type.Union([Type.Literal("eventsource")]),
              Type.Union([Type.Literal("websocket")]),
              Type.Union([Type.Literal("manifest")]),
              Type.Union([Type.Literal("signedexchange")]),
              Type.Union([Type.Literal("ping")]),
              Type.Union([Type.Literal("cspviolationreport")]),
              Type.Union([Type.Literal("preflight")]),
              Type.Union([Type.Literal("other")]),
            ]),
            { description: "Only allow requests that match the provided resource types, eg. 'image' or 'script'." },
          ),
        ),
        authenticate: Type.Optional(
          Type.Object(
            {
              password: Type.String({ minLength: 1, "x-sensitive": true }),
              username: Type.String({ minLength: 1 }),
            },
            { description: "Provide credentials for HTTP authentication." },
          ),
        ),
        bestAttempt: Type.Optional(
          Type.Boolean({ description: "Attempt to proceed when 'awaited' events fail or timeout." }),
        ),
        cookies: Type.Optional(
          Type.Array(
            Type.Object({
              domain: Type.Optional(Type.String()),
              expires: Type.Optional(Type.Number()),
              httpOnly: Type.Optional(Type.Boolean()),
              name: Type.String(),
              partitionKey: Type.Optional(Type.String()),
              path: Type.Optional(Type.String()),
              priority: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Low")]),
                  Type.Union([Type.Literal("Medium")]),
                  Type.Union([Type.Literal("High")]),
                ]),
              ),
              sameParty: Type.Optional(Type.Boolean()),
              sameSite: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Strict")]),
                  Type.Union([Type.Literal("Lax")]),
                  Type.Union([Type.Literal("None")]),
                ]),
              ),
              secure: Type.Optional(Type.Boolean()),
              sourcePort: Type.Optional(Type.Number()),
              sourceScheme: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Unset")]),
                  Type.Union([Type.Literal("NonSecure")]),
                  Type.Union([Type.Literal("Secure")]),
                ]),
              ),
              url: Type.Optional(Type.String()),
              value: Type.String(),
            }),
            { description: "Check [options](https://pptr.dev/api/puppeteer.page.setcookie)." },
          ),
        ),
        emulateMediaType: Type.Optional(Type.String()),
        excludeExternalLinks: Type.Optional(Type.Boolean({ default: false })),
        gotoOptions: Type.Optional(
          Type.Object(
            {
              referer: Type.Optional(Type.String()),
              referrerPolicy: Type.Optional(Type.String()),
              timeout: Type.Optional(Type.Number({ default: 30000, maximum: 60000 })),
              waitUntil: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("load")]),
                  Type.Union([Type.Literal("domcontentloaded")]),
                  Type.Union([Type.Literal("networkidle0")]),
                  Type.Union([Type.Literal("networkidle2")]),
                  Type.Array(
                    Type.Union([
                      Type.Union([Type.Literal("load")]),
                      Type.Union([Type.Literal("domcontentloaded")]),
                      Type.Union([Type.Literal("networkidle0")]),
                      Type.Union([Type.Literal("networkidle2")]),
                    ]),
                  ),
                ]),
              ),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.gotooptions)." },
          ),
        ),
        html: Type.Optional(
          Type.String({
            description:
              "Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.",
            minLength: 1,
          }),
        ),
        rejectRequestPattern: Type.Optional(
          Type.Array(Type.String(), {
            description: "Block undesired requests that match the provided regex patterns, eg. '/^.*\\.(css)'.",
          }),
        ),
        rejectResourceTypes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Union([Type.Literal("document")]),
              Type.Union([Type.Literal("stylesheet")]),
              Type.Union([Type.Literal("image")]),
              Type.Union([Type.Literal("media")]),
              Type.Union([Type.Literal("font")]),
              Type.Union([Type.Literal("script")]),
              Type.Union([Type.Literal("texttrack")]),
              Type.Union([Type.Literal("xhr")]),
              Type.Union([Type.Literal("fetch")]),
              Type.Union([Type.Literal("prefetch")]),
              Type.Union([Type.Literal("eventsource")]),
              Type.Union([Type.Literal("websocket")]),
              Type.Union([Type.Literal("manifest")]),
              Type.Union([Type.Literal("signedexchange")]),
              Type.Union([Type.Literal("ping")]),
              Type.Union([Type.Literal("cspviolationreport")]),
              Type.Union([Type.Literal("preflight")]),
              Type.Union([Type.Literal("other")]),
            ]),
            {
              description: "Block undesired requests that match the provided resource types, eg. 'image' or 'script'.",
            },
          ),
        ),
        setExtraHTTPHeaders: Type.Optional(Type.Record(Type.String(), Type.String())),
        setJavaScriptEnabled: Type.Optional(Type.Boolean()),
        url: Type.Optional(
          Type.String({ description: "URL to navigate to, eg. `https://example.com`.", format: "uri" }),
        ),
        userAgent: Type.Optional(
          Type.String({
            default:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
          }),
        ),
        viewport: Type.Optional(
          Type.Object(
            {
              deviceScaleFactor: Type.Optional(Type.Number()),
              hasTouch: Type.Optional(Type.Boolean()),
              height: Type.Number(),
              isLandscape: Type.Optional(Type.Boolean()),
              isMobile: Type.Optional(Type.Boolean()),
              width: Type.Number(),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.page.setviewport)." },
          ),
        ),
        visibleLinksOnly: Type.Optional(Type.Boolean({ default: false })),
        waitForSelector: Type.Optional(
          Type.Object(
            {
              hidden: Type.Optional(Type.Union([Type.Literal(true)])),
              selector: Type.String(),
              timeout: Type.Optional(Type.Number({ maximum: 60000 })),
              visible: Type.Optional(Type.Union([Type.Literal(true)])),
            },
            {
              description:
                "Wait for the selector to appear in page. Check [options](https://pptr.dev/api/puppeteer.page.waitforselector).",
            },
          ),
        ),
        waitForTimeout: Type.Optional(
          Type.Number({ description: "Waits for a specified timeout before continuing.", maximum: 60000 }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          result: Type.Array(Type.String()),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        422,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        500,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .summary("Get Links.")
      .description("Get links from a web page.")
      .operationId("brapi-post_Links")
      .tag("brapi")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Browser Rendering Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.brapi.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/markdown", {
      query: Type.Object({
        cacheTTL: Type.Optional(
          Type.Number({ description: "Cache TTL default is 5s. Set to 0 to disable.", default: 5, maximum: 86400 }),
        ),
      }),
      body: Type.Object({
        actionTimeout: Type.Optional(
          Type.Number({
            description:
              "The maximum duration allowed for the browser action to complete after the page has loaded (such as taking screenshots, extracting content, or generating PDFs). If this time limit is exceeded, the action stops and returns a timeout error.",
            maximum: 300000,
          }),
        ),
        addScriptTag: Type.Optional(
          Type.Array(
            Type.Object({
              content: Type.Optional(Type.String()),
              id: Type.Optional(Type.String()),
              type: Type.Optional(Type.String()),
              url: Type.Optional(Type.String()),
            }),
            { description: "Adds a `<script>` tag into the page with the desired URL or content." },
          ),
        ),
        addStyleTag: Type.Optional(
          Type.Array(
            Type.Object({
              content: Type.Optional(Type.String()),
              url: Type.Optional(Type.String()),
            }),
            {
              description:
                'Adds a `<link rel="stylesheet">` tag into the page with the desired URL or a `<style type="text/css">` tag with the content.',
            },
          ),
        ),
        allowRequestPattern: Type.Optional(
          Type.Array(Type.String(), {
            description: "Only allow requests that match the provided regex patterns, eg. '/^.*\\.(css)'.",
          }),
        ),
        allowResourceTypes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Union([Type.Literal("document")]),
              Type.Union([Type.Literal("stylesheet")]),
              Type.Union([Type.Literal("image")]),
              Type.Union([Type.Literal("media")]),
              Type.Union([Type.Literal("font")]),
              Type.Union([Type.Literal("script")]),
              Type.Union([Type.Literal("texttrack")]),
              Type.Union([Type.Literal("xhr")]),
              Type.Union([Type.Literal("fetch")]),
              Type.Union([Type.Literal("prefetch")]),
              Type.Union([Type.Literal("eventsource")]),
              Type.Union([Type.Literal("websocket")]),
              Type.Union([Type.Literal("manifest")]),
              Type.Union([Type.Literal("signedexchange")]),
              Type.Union([Type.Literal("ping")]),
              Type.Union([Type.Literal("cspviolationreport")]),
              Type.Union([Type.Literal("preflight")]),
              Type.Union([Type.Literal("other")]),
            ]),
            { description: "Only allow requests that match the provided resource types, eg. 'image' or 'script'." },
          ),
        ),
        authenticate: Type.Optional(
          Type.Object(
            {
              password: Type.String({ minLength: 1, "x-sensitive": true }),
              username: Type.String({ minLength: 1 }),
            },
            { description: "Provide credentials for HTTP authentication." },
          ),
        ),
        bestAttempt: Type.Optional(
          Type.Boolean({ description: "Attempt to proceed when 'awaited' events fail or timeout." }),
        ),
        cookies: Type.Optional(
          Type.Array(
            Type.Object({
              domain: Type.Optional(Type.String()),
              expires: Type.Optional(Type.Number()),
              httpOnly: Type.Optional(Type.Boolean()),
              name: Type.String(),
              partitionKey: Type.Optional(Type.String()),
              path: Type.Optional(Type.String()),
              priority: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Low")]),
                  Type.Union([Type.Literal("Medium")]),
                  Type.Union([Type.Literal("High")]),
                ]),
              ),
              sameParty: Type.Optional(Type.Boolean()),
              sameSite: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Strict")]),
                  Type.Union([Type.Literal("Lax")]),
                  Type.Union([Type.Literal("None")]),
                ]),
              ),
              secure: Type.Optional(Type.Boolean()),
              sourcePort: Type.Optional(Type.Number()),
              sourceScheme: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Unset")]),
                  Type.Union([Type.Literal("NonSecure")]),
                  Type.Union([Type.Literal("Secure")]),
                ]),
              ),
              url: Type.Optional(Type.String()),
              value: Type.String(),
            }),
            { description: "Check [options](https://pptr.dev/api/puppeteer.page.setcookie)." },
          ),
        ),
        emulateMediaType: Type.Optional(Type.String()),
        gotoOptions: Type.Optional(
          Type.Object(
            {
              referer: Type.Optional(Type.String()),
              referrerPolicy: Type.Optional(Type.String()),
              timeout: Type.Optional(Type.Number({ default: 30000, maximum: 60000 })),
              waitUntil: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("load")]),
                  Type.Union([Type.Literal("domcontentloaded")]),
                  Type.Union([Type.Literal("networkidle0")]),
                  Type.Union([Type.Literal("networkidle2")]),
                  Type.Array(
                    Type.Union([
                      Type.Union([Type.Literal("load")]),
                      Type.Union([Type.Literal("domcontentloaded")]),
                      Type.Union([Type.Literal("networkidle0")]),
                      Type.Union([Type.Literal("networkidle2")]),
                    ]),
                  ),
                ]),
              ),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.gotooptions)." },
          ),
        ),
        html: Type.Optional(
          Type.String({
            description:
              "Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.",
            minLength: 1,
          }),
        ),
        rejectRequestPattern: Type.Optional(
          Type.Array(Type.String(), {
            description: "Block undesired requests that match the provided regex patterns, eg. '/^.*\\.(css)'.",
          }),
        ),
        rejectResourceTypes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Union([Type.Literal("document")]),
              Type.Union([Type.Literal("stylesheet")]),
              Type.Union([Type.Literal("image")]),
              Type.Union([Type.Literal("media")]),
              Type.Union([Type.Literal("font")]),
              Type.Union([Type.Literal("script")]),
              Type.Union([Type.Literal("texttrack")]),
              Type.Union([Type.Literal("xhr")]),
              Type.Union([Type.Literal("fetch")]),
              Type.Union([Type.Literal("prefetch")]),
              Type.Union([Type.Literal("eventsource")]),
              Type.Union([Type.Literal("websocket")]),
              Type.Union([Type.Literal("manifest")]),
              Type.Union([Type.Literal("signedexchange")]),
              Type.Union([Type.Literal("ping")]),
              Type.Union([Type.Literal("cspviolationreport")]),
              Type.Union([Type.Literal("preflight")]),
              Type.Union([Type.Literal("other")]),
            ]),
            {
              description: "Block undesired requests that match the provided resource types, eg. 'image' or 'script'.",
            },
          ),
        ),
        setExtraHTTPHeaders: Type.Optional(Type.Record(Type.String(), Type.String())),
        setJavaScriptEnabled: Type.Optional(Type.Boolean()),
        url: Type.Optional(
          Type.String({ description: "URL to navigate to, eg. `https://example.com`.", format: "uri" }),
        ),
        userAgent: Type.Optional(
          Type.String({
            default:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
          }),
        ),
        viewport: Type.Optional(
          Type.Object(
            {
              deviceScaleFactor: Type.Optional(Type.Number()),
              hasTouch: Type.Optional(Type.Boolean()),
              height: Type.Number(),
              isLandscape: Type.Optional(Type.Boolean()),
              isMobile: Type.Optional(Type.Boolean()),
              width: Type.Number(),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.page.setviewport)." },
          ),
        ),
        waitForSelector: Type.Optional(
          Type.Object(
            {
              hidden: Type.Optional(Type.Union([Type.Literal(true)])),
              selector: Type.String(),
              timeout: Type.Optional(Type.Number({ maximum: 60000 })),
              visible: Type.Optional(Type.Union([Type.Literal(true)])),
            },
            {
              description:
                "Wait for the selector to appear in page. Check [options](https://pptr.dev/api/puppeteer.page.waitforselector).",
            },
          ),
        ),
        waitForTimeout: Type.Optional(
          Type.Number({ description: "Waits for a specified timeout before continuing.", maximum: 60000 }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          result: Type.Optional(Type.String({ description: "Markdown" })),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        422,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        500,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .summary("Get markdown.")
      .description(
        "Gets markdown of a webpage from provided URL or HTML. Control page loading with `gotoOptions` and `waitFor*` options.",
      )
      .operationId("brapi-post_Markdown")
      .tag("brapi")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Browser Rendering Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.brapi.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/pdf", {
      query: Type.Object({
        cacheTTL: Type.Optional(
          Type.Number({ description: "Cache TTL default is 5s. Set to 0 to disable.", default: 5, maximum: 86400 }),
        ),
      }),
      body: Type.Object({
        actionTimeout: Type.Optional(
          Type.Number({
            description:
              "The maximum duration allowed for the browser action to complete after the page has loaded (such as taking screenshots, extracting content, or generating PDFs). If this time limit is exceeded, the action stops and returns a timeout error.",
            maximum: 300000,
          }),
        ),
        addScriptTag: Type.Optional(
          Type.Array(
            Type.Object({
              content: Type.Optional(Type.String()),
              id: Type.Optional(Type.String()),
              type: Type.Optional(Type.String()),
              url: Type.Optional(Type.String()),
            }),
            { description: "Adds a `<script>` tag into the page with the desired URL or content." },
          ),
        ),
        addStyleTag: Type.Optional(
          Type.Array(
            Type.Object({
              content: Type.Optional(Type.String()),
              url: Type.Optional(Type.String()),
            }),
            {
              description:
                'Adds a `<link rel="stylesheet">` tag into the page with the desired URL or a `<style type="text/css">` tag with the content.',
            },
          ),
        ),
        allowRequestPattern: Type.Optional(
          Type.Array(Type.String(), {
            description: "Only allow requests that match the provided regex patterns, eg. '/^.*\\.(css)'.",
          }),
        ),
        allowResourceTypes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Union([Type.Literal("document")]),
              Type.Union([Type.Literal("stylesheet")]),
              Type.Union([Type.Literal("image")]),
              Type.Union([Type.Literal("media")]),
              Type.Union([Type.Literal("font")]),
              Type.Union([Type.Literal("script")]),
              Type.Union([Type.Literal("texttrack")]),
              Type.Union([Type.Literal("xhr")]),
              Type.Union([Type.Literal("fetch")]),
              Type.Union([Type.Literal("prefetch")]),
              Type.Union([Type.Literal("eventsource")]),
              Type.Union([Type.Literal("websocket")]),
              Type.Union([Type.Literal("manifest")]),
              Type.Union([Type.Literal("signedexchange")]),
              Type.Union([Type.Literal("ping")]),
              Type.Union([Type.Literal("cspviolationreport")]),
              Type.Union([Type.Literal("preflight")]),
              Type.Union([Type.Literal("other")]),
            ]),
            { description: "Only allow requests that match the provided resource types, eg. 'image' or 'script'." },
          ),
        ),
        authenticate: Type.Optional(
          Type.Object(
            {
              password: Type.String({ minLength: 1, "x-sensitive": true }),
              username: Type.String({ minLength: 1 }),
            },
            { description: "Provide credentials for HTTP authentication." },
          ),
        ),
        bestAttempt: Type.Optional(
          Type.Boolean({ description: "Attempt to proceed when 'awaited' events fail or timeout." }),
        ),
        cookies: Type.Optional(
          Type.Array(
            Type.Object({
              domain: Type.Optional(Type.String()),
              expires: Type.Optional(Type.Number()),
              httpOnly: Type.Optional(Type.Boolean()),
              name: Type.String(),
              partitionKey: Type.Optional(Type.String()),
              path: Type.Optional(Type.String()),
              priority: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Low")]),
                  Type.Union([Type.Literal("Medium")]),
                  Type.Union([Type.Literal("High")]),
                ]),
              ),
              sameParty: Type.Optional(Type.Boolean()),
              sameSite: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Strict")]),
                  Type.Union([Type.Literal("Lax")]),
                  Type.Union([Type.Literal("None")]),
                ]),
              ),
              secure: Type.Optional(Type.Boolean()),
              sourcePort: Type.Optional(Type.Number()),
              sourceScheme: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Unset")]),
                  Type.Union([Type.Literal("NonSecure")]),
                  Type.Union([Type.Literal("Secure")]),
                ]),
              ),
              url: Type.Optional(Type.String()),
              value: Type.String(),
            }),
            { description: "Check [options](https://pptr.dev/api/puppeteer.page.setcookie)." },
          ),
        ),
        emulateMediaType: Type.Optional(Type.String()),
        gotoOptions: Type.Optional(
          Type.Object(
            {
              referer: Type.Optional(Type.String()),
              referrerPolicy: Type.Optional(Type.String()),
              timeout: Type.Optional(Type.Number({ default: 30000, maximum: 60000 })),
              waitUntil: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("load")]),
                  Type.Union([Type.Literal("domcontentloaded")]),
                  Type.Union([Type.Literal("networkidle0")]),
                  Type.Union([Type.Literal("networkidle2")]),
                  Type.Array(
                    Type.Union([
                      Type.Union([Type.Literal("load")]),
                      Type.Union([Type.Literal("domcontentloaded")]),
                      Type.Union([Type.Literal("networkidle0")]),
                      Type.Union([Type.Literal("networkidle2")]),
                    ]),
                  ),
                ]),
              ),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.gotooptions)." },
          ),
        ),
        html: Type.Optional(
          Type.String({
            description:
              "Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.",
            minLength: 1,
          }),
        ),
        pdfOptions: Type.Optional(
          Type.Object(
            {
              displayHeaderFooter: Type.Optional(
                Type.Boolean({ description: "Whether to show the header and footer.", default: false }),
              ),
              footerTemplate: Type.Optional(Type.String({ description: "HTML template for the print footer." })),
              format: Type.Optional(
                Type.Union(
                  [
                    Type.Literal("letter"),
                    Type.Literal("legal"),
                    Type.Literal("tabloid"),
                    Type.Literal("ledger"),
                    Type.Literal("a0"),
                    Type.Literal("a1"),
                    Type.Literal("a2"),
                    Type.Literal("a3"),
                    Type.Literal("a4"),
                    Type.Literal("a5"),
                    Type.Literal("a6"),
                  ],
                  { description: "Paper format. Takes priority over width and height if set." },
                ),
              ),
              headerTemplate: Type.Optional(Type.String({ description: "HTML template for the print header." })),
              height: Type.Optional(
                Type.Union([Type.String(), Type.Number()], {
                  description: "Sets the height of paper. Can be a number or string with unit.",
                }),
              ),
              landscape: Type.Optional(
                Type.Boolean({ description: "Whether to print in landscape orientation.", default: false }),
              ),
              margin: Type.Optional(
                Type.Object(
                  {
                    bottom: Type.Optional(Type.Union([Type.String(), Type.Number()])),
                    left: Type.Optional(Type.Union([Type.String(), Type.Number()])),
                    right: Type.Optional(Type.Union([Type.String(), Type.Number()])),
                    top: Type.Optional(Type.Union([Type.String(), Type.Number()])),
                  },
                  { description: "Set the PDF margins. Useful when setting header and footer." },
                ),
              ),
              omitBackground: Type.Optional(
                Type.Boolean({
                  description: "Hides default white background and allows generating pdfs with transparency.",
                  default: false,
                }),
              ),
              outline: Type.Optional(Type.Boolean({ description: "Generate document outline.", default: false })),
              pageRanges: Type.Optional(Type.String({ description: "Paper ranges to print, e.g. '1-5, 8, 11-13'." })),
              preferCSSPageSize: Type.Optional(
                Type.Boolean({
                  description: "Give CSS @page size priority over other size declarations.",
                  default: false,
                }),
              ),
              printBackground: Type.Optional(
                Type.Boolean({ description: "Set to true to print background graphics.", default: false }),
              ),
              scale: Type.Optional(
                Type.Number({
                  description: "Scales the rendering of the web page. Amount must be between 0.1 and 2.",
                  default: 1,
                  minimum: 0.1,
                  maximum: 2,
                }),
              ),
              tagged: Type.Optional(Type.Boolean({ description: "Generate tagged (accessible) PDF.", default: true })),
              timeout: Type.Optional(Type.Number({ description: "Timeout in milliseconds.", default: 30000 })),
              width: Type.Optional(
                Type.Union([Type.String(), Type.Number()], {
                  description: "Sets the width of paper. Can be a number or string with unit.",
                }),
              ),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.pdfoptions)." },
          ),
        ),
        rejectRequestPattern: Type.Optional(
          Type.Array(Type.String(), {
            description: "Block undesired requests that match the provided regex patterns, eg. '/^.*\\.(css)'.",
          }),
        ),
        rejectResourceTypes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Union([Type.Literal("document")]),
              Type.Union([Type.Literal("stylesheet")]),
              Type.Union([Type.Literal("image")]),
              Type.Union([Type.Literal("media")]),
              Type.Union([Type.Literal("font")]),
              Type.Union([Type.Literal("script")]),
              Type.Union([Type.Literal("texttrack")]),
              Type.Union([Type.Literal("xhr")]),
              Type.Union([Type.Literal("fetch")]),
              Type.Union([Type.Literal("prefetch")]),
              Type.Union([Type.Literal("eventsource")]),
              Type.Union([Type.Literal("websocket")]),
              Type.Union([Type.Literal("manifest")]),
              Type.Union([Type.Literal("signedexchange")]),
              Type.Union([Type.Literal("ping")]),
              Type.Union([Type.Literal("cspviolationreport")]),
              Type.Union([Type.Literal("preflight")]),
              Type.Union([Type.Literal("other")]),
            ]),
            {
              description: "Block undesired requests that match the provided resource types, eg. 'image' or 'script'.",
            },
          ),
        ),
        setExtraHTTPHeaders: Type.Optional(Type.Record(Type.String(), Type.String())),
        setJavaScriptEnabled: Type.Optional(Type.Boolean()),
        url: Type.Optional(
          Type.String({ description: "URL to navigate to, eg. `https://example.com`.", format: "uri" }),
        ),
        userAgent: Type.Optional(
          Type.String({
            default:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
          }),
        ),
        viewport: Type.Optional(
          Type.Object(
            {
              deviceScaleFactor: Type.Optional(Type.Number()),
              hasTouch: Type.Optional(Type.Boolean()),
              height: Type.Number(),
              isLandscape: Type.Optional(Type.Boolean()),
              isMobile: Type.Optional(Type.Boolean()),
              width: Type.Number(),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.page.setviewport)." },
          ),
        ),
        waitForSelector: Type.Optional(
          Type.Object(
            {
              hidden: Type.Optional(Type.Union([Type.Literal(true)])),
              selector: Type.String(),
              timeout: Type.Optional(Type.Number({ maximum: 60000 })),
              visible: Type.Optional(Type.Union([Type.Literal(true)])),
            },
            {
              description:
                "Wait for the selector to appear in page. Check [options](https://pptr.dev/api/puppeteer.page.waitforselector).",
            },
          ),
        ),
        waitForTimeout: Type.Optional(
          Type.Number({ description: "Waits for a specified timeout before continuing.", maximum: 60000 }),
        ),
      }),
    })
      .error(
        400,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        422,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        500,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .summary("Get PDF.")
      .description(
        "Fetches rendered PDF from provided URL or HTML. Check available options like `gotoOptions` and `waitFor*` to control page load behaviour.",
      )
      .operationId("brapi-post_Pdf")
      .tag("brapi")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Browser Rendering Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.brapi.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/scrape", {
      query: Type.Object({
        cacheTTL: Type.Optional(
          Type.Number({ description: "Cache TTL default is 5s. Set to 0 to disable.", default: 5, maximum: 86400 }),
        ),
      }),
      body: Type.Object({
        actionTimeout: Type.Optional(
          Type.Number({
            description:
              "The maximum duration allowed for the browser action to complete after the page has loaded (such as taking screenshots, extracting content, or generating PDFs). If this time limit is exceeded, the action stops and returns a timeout error.",
            maximum: 300000,
          }),
        ),
        addScriptTag: Type.Optional(
          Type.Array(
            Type.Object({
              content: Type.Optional(Type.String()),
              id: Type.Optional(Type.String()),
              type: Type.Optional(Type.String()),
              url: Type.Optional(Type.String()),
            }),
            { description: "Adds a `<script>` tag into the page with the desired URL or content." },
          ),
        ),
        addStyleTag: Type.Optional(
          Type.Array(
            Type.Object({
              content: Type.Optional(Type.String()),
              url: Type.Optional(Type.String()),
            }),
            {
              description:
                'Adds a `<link rel="stylesheet">` tag into the page with the desired URL or a `<style type="text/css">` tag with the content.',
            },
          ),
        ),
        allowRequestPattern: Type.Optional(
          Type.Array(Type.String(), {
            description: "Only allow requests that match the provided regex patterns, eg. '/^.*\\.(css)'.",
          }),
        ),
        allowResourceTypes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Union([Type.Literal("document")]),
              Type.Union([Type.Literal("stylesheet")]),
              Type.Union([Type.Literal("image")]),
              Type.Union([Type.Literal("media")]),
              Type.Union([Type.Literal("font")]),
              Type.Union([Type.Literal("script")]),
              Type.Union([Type.Literal("texttrack")]),
              Type.Union([Type.Literal("xhr")]),
              Type.Union([Type.Literal("fetch")]),
              Type.Union([Type.Literal("prefetch")]),
              Type.Union([Type.Literal("eventsource")]),
              Type.Union([Type.Literal("websocket")]),
              Type.Union([Type.Literal("manifest")]),
              Type.Union([Type.Literal("signedexchange")]),
              Type.Union([Type.Literal("ping")]),
              Type.Union([Type.Literal("cspviolationreport")]),
              Type.Union([Type.Literal("preflight")]),
              Type.Union([Type.Literal("other")]),
            ]),
            { description: "Only allow requests that match the provided resource types, eg. 'image' or 'script'." },
          ),
        ),
        authenticate: Type.Optional(
          Type.Object(
            {
              password: Type.String({ minLength: 1, "x-sensitive": true }),
              username: Type.String({ minLength: 1 }),
            },
            { description: "Provide credentials for HTTP authentication." },
          ),
        ),
        bestAttempt: Type.Optional(
          Type.Boolean({ description: "Attempt to proceed when 'awaited' events fail or timeout." }),
        ),
        cookies: Type.Optional(
          Type.Array(
            Type.Object({
              domain: Type.Optional(Type.String()),
              expires: Type.Optional(Type.Number()),
              httpOnly: Type.Optional(Type.Boolean()),
              name: Type.String(),
              partitionKey: Type.Optional(Type.String()),
              path: Type.Optional(Type.String()),
              priority: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Low")]),
                  Type.Union([Type.Literal("Medium")]),
                  Type.Union([Type.Literal("High")]),
                ]),
              ),
              sameParty: Type.Optional(Type.Boolean()),
              sameSite: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Strict")]),
                  Type.Union([Type.Literal("Lax")]),
                  Type.Union([Type.Literal("None")]),
                ]),
              ),
              secure: Type.Optional(Type.Boolean()),
              sourcePort: Type.Optional(Type.Number()),
              sourceScheme: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Unset")]),
                  Type.Union([Type.Literal("NonSecure")]),
                  Type.Union([Type.Literal("Secure")]),
                ]),
              ),
              url: Type.Optional(Type.String()),
              value: Type.String(),
            }),
            { description: "Check [options](https://pptr.dev/api/puppeteer.page.setcookie)." },
          ),
        ),
        elements: Type.Array(
          Type.Object({
            selector: Type.String(),
          }),
          { minItems: 1 },
        ),
        emulateMediaType: Type.Optional(Type.String()),
        gotoOptions: Type.Optional(
          Type.Object(
            {
              referer: Type.Optional(Type.String()),
              referrerPolicy: Type.Optional(Type.String()),
              timeout: Type.Optional(Type.Number({ default: 30000, maximum: 60000 })),
              waitUntil: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("load")]),
                  Type.Union([Type.Literal("domcontentloaded")]),
                  Type.Union([Type.Literal("networkidle0")]),
                  Type.Union([Type.Literal("networkidle2")]),
                  Type.Array(
                    Type.Union([
                      Type.Union([Type.Literal("load")]),
                      Type.Union([Type.Literal("domcontentloaded")]),
                      Type.Union([Type.Literal("networkidle0")]),
                      Type.Union([Type.Literal("networkidle2")]),
                    ]),
                  ),
                ]),
              ),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.gotooptions)." },
          ),
        ),
        html: Type.Optional(
          Type.String({
            description:
              "Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.",
            minLength: 1,
          }),
        ),
        rejectRequestPattern: Type.Optional(
          Type.Array(Type.String(), {
            description: "Block undesired requests that match the provided regex patterns, eg. '/^.*\\.(css)'.",
          }),
        ),
        rejectResourceTypes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Union([Type.Literal("document")]),
              Type.Union([Type.Literal("stylesheet")]),
              Type.Union([Type.Literal("image")]),
              Type.Union([Type.Literal("media")]),
              Type.Union([Type.Literal("font")]),
              Type.Union([Type.Literal("script")]),
              Type.Union([Type.Literal("texttrack")]),
              Type.Union([Type.Literal("xhr")]),
              Type.Union([Type.Literal("fetch")]),
              Type.Union([Type.Literal("prefetch")]),
              Type.Union([Type.Literal("eventsource")]),
              Type.Union([Type.Literal("websocket")]),
              Type.Union([Type.Literal("manifest")]),
              Type.Union([Type.Literal("signedexchange")]),
              Type.Union([Type.Literal("ping")]),
              Type.Union([Type.Literal("cspviolationreport")]),
              Type.Union([Type.Literal("preflight")]),
              Type.Union([Type.Literal("other")]),
            ]),
            {
              description: "Block undesired requests that match the provided resource types, eg. 'image' or 'script'.",
            },
          ),
        ),
        setExtraHTTPHeaders: Type.Optional(Type.Record(Type.String(), Type.String())),
        setJavaScriptEnabled: Type.Optional(Type.Boolean()),
        url: Type.Optional(
          Type.String({ description: "URL to navigate to, eg. `https://example.com`.", format: "uri" }),
        ),
        userAgent: Type.Optional(
          Type.String({
            default:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
          }),
        ),
        viewport: Type.Optional(
          Type.Object(
            {
              deviceScaleFactor: Type.Optional(Type.Number()),
              hasTouch: Type.Optional(Type.Boolean()),
              height: Type.Number(),
              isLandscape: Type.Optional(Type.Boolean()),
              isMobile: Type.Optional(Type.Boolean()),
              width: Type.Number(),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.page.setviewport)." },
          ),
        ),
        waitForSelector: Type.Optional(
          Type.Object(
            {
              hidden: Type.Optional(Type.Union([Type.Literal(true)])),
              selector: Type.String(),
              timeout: Type.Optional(Type.Number({ maximum: 60000 })),
              visible: Type.Optional(Type.Union([Type.Literal(true)])),
            },
            {
              description:
                "Wait for the selector to appear in page. Check [options](https://pptr.dev/api/puppeteer.page.waitforselector).",
            },
          ),
        ),
        waitForTimeout: Type.Optional(
          Type.Number({ description: "Waits for a specified timeout before continuing.", maximum: 60000 }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          result: Type.Array(
            Type.Object({
              results: Type.Object({
                attributes: Type.Array(
                  Type.Object({
                    name: Type.String({ description: "Attribute name" }),
                    value: Type.String({ description: "Attribute value" }),
                  }),
                ),
                height: Type.Number({ description: "Element height" }),
                html: Type.String({ description: "Html content" }),
                left: Type.Number({ description: "Element left" }),
                text: Type.String({ description: "Text content" }),
                top: Type.Number({ description: "Element top" }),
                width: Type.Number({ description: "Element width" }),
              }),
              selector: Type.String({ description: "Selector" }),
            }),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        422,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        500,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .summary("Scrape elements.")
      .description("Get meta attributes like height, width, text and others of selected elements.")
      .operationId("brapi-post_Scrape")
      .tag("brapi")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Browser Rendering Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.brapi.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/screenshot", {
      query: Type.Object({
        cacheTTL: Type.Optional(
          Type.Number({ description: "Cache TTL default is 5s. Set to 0 to disable.", default: 5, maximum: 86400 }),
        ),
      }),
      body: Type.Object({
        actionTimeout: Type.Optional(
          Type.Number({
            description:
              "The maximum duration allowed for the browser action to complete after the page has loaded (such as taking screenshots, extracting content, or generating PDFs). If this time limit is exceeded, the action stops and returns a timeout error.",
            maximum: 300000,
          }),
        ),
        addScriptTag: Type.Optional(
          Type.Array(
            Type.Object({
              content: Type.Optional(Type.String()),
              id: Type.Optional(Type.String()),
              type: Type.Optional(Type.String()),
              url: Type.Optional(Type.String()),
            }),
            { description: "Adds a `<script>` tag into the page with the desired URL or content." },
          ),
        ),
        addStyleTag: Type.Optional(
          Type.Array(
            Type.Object({
              content: Type.Optional(Type.String()),
              url: Type.Optional(Type.String()),
            }),
            {
              description:
                'Adds a `<link rel="stylesheet">` tag into the page with the desired URL or a `<style type="text/css">` tag with the content.',
            },
          ),
        ),
        allowRequestPattern: Type.Optional(
          Type.Array(Type.String(), {
            description: "Only allow requests that match the provided regex patterns, eg. '/^.*\\.(css)'.",
          }),
        ),
        allowResourceTypes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Union([Type.Literal("document")]),
              Type.Union([Type.Literal("stylesheet")]),
              Type.Union([Type.Literal("image")]),
              Type.Union([Type.Literal("media")]),
              Type.Union([Type.Literal("font")]),
              Type.Union([Type.Literal("script")]),
              Type.Union([Type.Literal("texttrack")]),
              Type.Union([Type.Literal("xhr")]),
              Type.Union([Type.Literal("fetch")]),
              Type.Union([Type.Literal("prefetch")]),
              Type.Union([Type.Literal("eventsource")]),
              Type.Union([Type.Literal("websocket")]),
              Type.Union([Type.Literal("manifest")]),
              Type.Union([Type.Literal("signedexchange")]),
              Type.Union([Type.Literal("ping")]),
              Type.Union([Type.Literal("cspviolationreport")]),
              Type.Union([Type.Literal("preflight")]),
              Type.Union([Type.Literal("other")]),
            ]),
            { description: "Only allow requests that match the provided resource types, eg. 'image' or 'script'." },
          ),
        ),
        authenticate: Type.Optional(
          Type.Object(
            {
              password: Type.String({ minLength: 1, "x-sensitive": true }),
              username: Type.String({ minLength: 1 }),
            },
            { description: "Provide credentials for HTTP authentication." },
          ),
        ),
        bestAttempt: Type.Optional(
          Type.Boolean({ description: "Attempt to proceed when 'awaited' events fail or timeout." }),
        ),
        cookies: Type.Optional(
          Type.Array(
            Type.Object({
              domain: Type.Optional(Type.String()),
              expires: Type.Optional(Type.Number()),
              httpOnly: Type.Optional(Type.Boolean()),
              name: Type.String(),
              partitionKey: Type.Optional(Type.String()),
              path: Type.Optional(Type.String()),
              priority: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Low")]),
                  Type.Union([Type.Literal("Medium")]),
                  Type.Union([Type.Literal("High")]),
                ]),
              ),
              sameParty: Type.Optional(Type.Boolean()),
              sameSite: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Strict")]),
                  Type.Union([Type.Literal("Lax")]),
                  Type.Union([Type.Literal("None")]),
                ]),
              ),
              secure: Type.Optional(Type.Boolean()),
              sourcePort: Type.Optional(Type.Number()),
              sourceScheme: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Unset")]),
                  Type.Union([Type.Literal("NonSecure")]),
                  Type.Union([Type.Literal("Secure")]),
                ]),
              ),
              url: Type.Optional(Type.String()),
              value: Type.String(),
            }),
            { description: "Check [options](https://pptr.dev/api/puppeteer.page.setcookie)." },
          ),
        ),
        emulateMediaType: Type.Optional(Type.String()),
        gotoOptions: Type.Optional(
          Type.Object(
            {
              referer: Type.Optional(Type.String()),
              referrerPolicy: Type.Optional(Type.String()),
              timeout: Type.Optional(Type.Number({ default: 30000, maximum: 60000 })),
              waitUntil: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("load")]),
                  Type.Union([Type.Literal("domcontentloaded")]),
                  Type.Union([Type.Literal("networkidle0")]),
                  Type.Union([Type.Literal("networkidle2")]),
                  Type.Array(
                    Type.Union([
                      Type.Union([Type.Literal("load")]),
                      Type.Union([Type.Literal("domcontentloaded")]),
                      Type.Union([Type.Literal("networkidle0")]),
                      Type.Union([Type.Literal("networkidle2")]),
                    ]),
                  ),
                ]),
              ),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.gotooptions)." },
          ),
        ),
        html: Type.Optional(
          Type.String({
            description:
              "Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.",
            minLength: 1,
          }),
        ),
        rejectRequestPattern: Type.Optional(
          Type.Array(Type.String(), {
            description: "Block undesired requests that match the provided regex patterns, eg. '/^.*\\.(css)'.",
          }),
        ),
        rejectResourceTypes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Union([Type.Literal("document")]),
              Type.Union([Type.Literal("stylesheet")]),
              Type.Union([Type.Literal("image")]),
              Type.Union([Type.Literal("media")]),
              Type.Union([Type.Literal("font")]),
              Type.Union([Type.Literal("script")]),
              Type.Union([Type.Literal("texttrack")]),
              Type.Union([Type.Literal("xhr")]),
              Type.Union([Type.Literal("fetch")]),
              Type.Union([Type.Literal("prefetch")]),
              Type.Union([Type.Literal("eventsource")]),
              Type.Union([Type.Literal("websocket")]),
              Type.Union([Type.Literal("manifest")]),
              Type.Union([Type.Literal("signedexchange")]),
              Type.Union([Type.Literal("ping")]),
              Type.Union([Type.Literal("cspviolationreport")]),
              Type.Union([Type.Literal("preflight")]),
              Type.Union([Type.Literal("other")]),
            ]),
            {
              description: "Block undesired requests that match the provided resource types, eg. 'image' or 'script'.",
            },
          ),
        ),
        screenshotOptions: Type.Optional(
          Type.Object(
            {
              captureBeyondViewport: Type.Optional(Type.Boolean()),
              clip: Type.Optional(
                Type.Object({
                  height: Type.Number(),
                  scale: Type.Optional(Type.Number()),
                  width: Type.Number(),
                  x: Type.Number(),
                  y: Type.Number(),
                }),
              ),
              encoding: Type.Optional(
                Type.Union([Type.Union([Type.Literal("binary")]), Type.Union([Type.Literal("base64")])]),
              ),
              fromSurface: Type.Optional(Type.Boolean()),
              fullPage: Type.Optional(Type.Boolean()),
              omitBackground: Type.Optional(Type.Boolean()),
              optimizeForSpeed: Type.Optional(Type.Boolean()),
              quality: Type.Optional(Type.Number()),
              type: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("png")]),
                  Type.Union([Type.Literal("jpeg")]),
                  Type.Union([Type.Literal("webp")]),
                ]),
              ),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.screenshotoptions)." },
          ),
        ),
        scrollPage: Type.Optional(Type.Boolean()),
        selector: Type.Optional(Type.String()),
        setExtraHTTPHeaders: Type.Optional(Type.Record(Type.String(), Type.String())),
        setJavaScriptEnabled: Type.Optional(Type.Boolean()),
        url: Type.Optional(
          Type.String({ description: "URL to navigate to, eg. `https://example.com`.", format: "uri" }),
        ),
        userAgent: Type.Optional(
          Type.String({
            default:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
          }),
        ),
        viewport: Type.Optional(
          Type.Object(
            {
              deviceScaleFactor: Type.Optional(Type.Number()),
              hasTouch: Type.Optional(Type.Boolean()),
              height: Type.Number(),
              isLandscape: Type.Optional(Type.Boolean()),
              isMobile: Type.Optional(Type.Boolean()),
              width: Type.Number(),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.page.setviewport)." },
          ),
        ),
        waitForSelector: Type.Optional(
          Type.Object(
            {
              hidden: Type.Optional(Type.Union([Type.Literal(true)])),
              selector: Type.String(),
              timeout: Type.Optional(Type.Number({ maximum: 60000 })),
              visible: Type.Optional(Type.Union([Type.Literal(true)])),
            },
            {
              description:
                "Wait for the selector to appear in page. Check [options](https://pptr.dev/api/puppeteer.page.waitforselector).",
            },
          ),
        ),
        waitForTimeout: Type.Optional(
          Type.Number({ description: "Waits for a specified timeout before continuing.", maximum: 60000 }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        422,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        500,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .summary("Get screenshot.")
      .description(
        "Takes a screenshot of a webpage from provided URL or HTML. Control page loading with `gotoOptions` and `waitFor*` options. Customize screenshots with `viewport`, `fullPage`, `clip` and others.",
      )
      .operationId("brapi-post_Screenshot")
      .tag("brapi")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Browser Rendering Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.brapi.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })

    g.post("/snapshot", {
      query: Type.Object({
        cacheTTL: Type.Optional(
          Type.Number({ description: "Cache TTL default is 5s. Set to 0 to disable.", default: 5, maximum: 86400 }),
        ),
      }),
      body: Type.Object({
        actionTimeout: Type.Optional(
          Type.Number({
            description:
              "The maximum duration allowed for the browser action to complete after the page has loaded (such as taking screenshots, extracting content, or generating PDFs). If this time limit is exceeded, the action stops and returns a timeout error.",
            maximum: 300000,
          }),
        ),
        addScriptTag: Type.Optional(
          Type.Array(
            Type.Object({
              content: Type.Optional(Type.String()),
              id: Type.Optional(Type.String()),
              type: Type.Optional(Type.String()),
              url: Type.Optional(Type.String()),
            }),
            { description: "Adds a `<script>` tag into the page with the desired URL or content." },
          ),
        ),
        addStyleTag: Type.Optional(
          Type.Array(
            Type.Object({
              content: Type.Optional(Type.String()),
              url: Type.Optional(Type.String()),
            }),
            {
              description:
                'Adds a `<link rel="stylesheet">` tag into the page with the desired URL or a `<style type="text/css">` tag with the content.',
            },
          ),
        ),
        allowRequestPattern: Type.Optional(
          Type.Array(Type.String(), {
            description: "Only allow requests that match the provided regex patterns, eg. '/^.*\\.(css)'.",
          }),
        ),
        allowResourceTypes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Union([Type.Literal("document")]),
              Type.Union([Type.Literal("stylesheet")]),
              Type.Union([Type.Literal("image")]),
              Type.Union([Type.Literal("media")]),
              Type.Union([Type.Literal("font")]),
              Type.Union([Type.Literal("script")]),
              Type.Union([Type.Literal("texttrack")]),
              Type.Union([Type.Literal("xhr")]),
              Type.Union([Type.Literal("fetch")]),
              Type.Union([Type.Literal("prefetch")]),
              Type.Union([Type.Literal("eventsource")]),
              Type.Union([Type.Literal("websocket")]),
              Type.Union([Type.Literal("manifest")]),
              Type.Union([Type.Literal("signedexchange")]),
              Type.Union([Type.Literal("ping")]),
              Type.Union([Type.Literal("cspviolationreport")]),
              Type.Union([Type.Literal("preflight")]),
              Type.Union([Type.Literal("other")]),
            ]),
            { description: "Only allow requests that match the provided resource types, eg. 'image' or 'script'." },
          ),
        ),
        authenticate: Type.Optional(
          Type.Object(
            {
              password: Type.String({ minLength: 1, "x-sensitive": true }),
              username: Type.String({ minLength: 1 }),
            },
            { description: "Provide credentials for HTTP authentication." },
          ),
        ),
        bestAttempt: Type.Optional(
          Type.Boolean({ description: "Attempt to proceed when 'awaited' events fail or timeout." }),
        ),
        cookies: Type.Optional(
          Type.Array(
            Type.Object({
              domain: Type.Optional(Type.String()),
              expires: Type.Optional(Type.Number()),
              httpOnly: Type.Optional(Type.Boolean()),
              name: Type.String(),
              partitionKey: Type.Optional(Type.String()),
              path: Type.Optional(Type.String()),
              priority: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Low")]),
                  Type.Union([Type.Literal("Medium")]),
                  Type.Union([Type.Literal("High")]),
                ]),
              ),
              sameParty: Type.Optional(Type.Boolean()),
              sameSite: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Strict")]),
                  Type.Union([Type.Literal("Lax")]),
                  Type.Union([Type.Literal("None")]),
                ]),
              ),
              secure: Type.Optional(Type.Boolean()),
              sourcePort: Type.Optional(Type.Number()),
              sourceScheme: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("Unset")]),
                  Type.Union([Type.Literal("NonSecure")]),
                  Type.Union([Type.Literal("Secure")]),
                ]),
              ),
              url: Type.Optional(Type.String()),
              value: Type.String(),
            }),
            { description: "Check [options](https://pptr.dev/api/puppeteer.page.setcookie)." },
          ),
        ),
        emulateMediaType: Type.Optional(Type.String()),
        gotoOptions: Type.Optional(
          Type.Object(
            {
              referer: Type.Optional(Type.String()),
              referrerPolicy: Type.Optional(Type.String()),
              timeout: Type.Optional(Type.Number({ default: 30000, maximum: 60000 })),
              waitUntil: Type.Optional(
                Type.Union([
                  Type.Union([Type.Literal("load")]),
                  Type.Union([Type.Literal("domcontentloaded")]),
                  Type.Union([Type.Literal("networkidle0")]),
                  Type.Union([Type.Literal("networkidle2")]),
                  Type.Array(
                    Type.Union([
                      Type.Union([Type.Literal("load")]),
                      Type.Union([Type.Literal("domcontentloaded")]),
                      Type.Union([Type.Literal("networkidle0")]),
                      Type.Union([Type.Literal("networkidle2")]),
                    ]),
                  ),
                ]),
              ),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.gotooptions)." },
          ),
        ),
        html: Type.Optional(
          Type.String({
            description:
              "Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.",
            minLength: 1,
          }),
        ),
        rejectRequestPattern: Type.Optional(
          Type.Array(Type.String(), {
            description: "Block undesired requests that match the provided regex patterns, eg. '/^.*\\.(css)'.",
          }),
        ),
        rejectResourceTypes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Union([Type.Literal("document")]),
              Type.Union([Type.Literal("stylesheet")]),
              Type.Union([Type.Literal("image")]),
              Type.Union([Type.Literal("media")]),
              Type.Union([Type.Literal("font")]),
              Type.Union([Type.Literal("script")]),
              Type.Union([Type.Literal("texttrack")]),
              Type.Union([Type.Literal("xhr")]),
              Type.Union([Type.Literal("fetch")]),
              Type.Union([Type.Literal("prefetch")]),
              Type.Union([Type.Literal("eventsource")]),
              Type.Union([Type.Literal("websocket")]),
              Type.Union([Type.Literal("manifest")]),
              Type.Union([Type.Literal("signedexchange")]),
              Type.Union([Type.Literal("ping")]),
              Type.Union([Type.Literal("cspviolationreport")]),
              Type.Union([Type.Literal("preflight")]),
              Type.Union([Type.Literal("other")]),
            ]),
            {
              description: "Block undesired requests that match the provided resource types, eg. 'image' or 'script'.",
            },
          ),
        ),
        screenshotOptions: Type.Optional(
          Type.Object({
            captureBeyondViewport: Type.Optional(Type.Boolean()),
            clip: Type.Optional(
              Type.Object({
                height: Type.Number(),
                scale: Type.Optional(Type.Number()),
                width: Type.Number(),
                x: Type.Number(),
                y: Type.Number(),
              }),
            ),
            fromSurface: Type.Optional(Type.Boolean()),
            fullPage: Type.Optional(Type.Boolean()),
            omitBackground: Type.Optional(Type.Boolean()),
            optimizeForSpeed: Type.Optional(Type.Boolean()),
            quality: Type.Optional(Type.Number()),
            type: Type.Optional(
              Type.Union([
                Type.Union([Type.Literal("png")]),
                Type.Union([Type.Literal("jpeg")]),
                Type.Union([Type.Literal("webp")]),
              ]),
            ),
          }),
        ),
        setExtraHTTPHeaders: Type.Optional(Type.Record(Type.String(), Type.String())),
        setJavaScriptEnabled: Type.Optional(Type.Boolean()),
        url: Type.Optional(
          Type.String({ description: "URL to navigate to, eg. `https://example.com`.", format: "uri" }),
        ),
        userAgent: Type.Optional(
          Type.String({
            default:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
          }),
        ),
        viewport: Type.Optional(
          Type.Object(
            {
              deviceScaleFactor: Type.Optional(Type.Number()),
              hasTouch: Type.Optional(Type.Boolean()),
              height: Type.Number(),
              isLandscape: Type.Optional(Type.Boolean()),
              isMobile: Type.Optional(Type.Boolean()),
              width: Type.Number(),
            },
            { description: "Check [options](https://pptr.dev/api/puppeteer.page.setviewport)." },
          ),
        ),
        waitForSelector: Type.Optional(
          Type.Object(
            {
              hidden: Type.Optional(Type.Union([Type.Literal(true)])),
              selector: Type.String(),
              timeout: Type.Optional(Type.Number({ maximum: 60000 })),
              visible: Type.Optional(Type.Union([Type.Literal(true)])),
            },
            {
              description:
                "Wait for the selector to appear in page. Check [options](https://pptr.dev/api/puppeteer.page.waitforselector).",
            },
          ),
        ),
        waitForTimeout: Type.Optional(
          Type.Number({ description: "Waits for a specified timeout before continuing.", maximum: 60000 }),
        ),
      }),
    })
      .response(
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          result: Type.Optional(
            Type.Object({
              content: Type.String({ description: "HTML content" }),
              screenshot: Type.String({ description: "Base64 encoded image" }),
            }),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        400,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        422,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .error(
        500,
        Type.Object({
          errors: Type.Optional(
            Type.Array(
              Type.Object({
                code: Type.Number({ description: "Error code" }),
                message: Type.String({ description: "Error Message" }),
              }),
            ),
          ),
          status: Type.Boolean({ description: "Response status" }),
        }),
      )
      .summary("Get HTML content and screenshot.")
      .description(
        "Returns the page's HTML content and screenshot. Control page loading with `gotoOptions` and `waitFor*` options. Customize screenshots with `viewport`, `fullPage`, `clip` and others.",
      )
      .operationId("brapi-post_Snapshot")
      .tag("brapi")
      .security({ api_token: [] })
      .security({ api_email: [], api_key: [] })
      .extension("x-api-token-group", ["Browser Rendering Write"])
      .extension("x-cfPermissionsRequired", { enum: ["com.cloudflare.api.account.brapi.read"] })
      .extension("x-cfPlanAvailability", { business: true, enterprise: true, free: true, pro: true })
  })
}
